import {
  EmittedEventPayload,
  SubscribedEventPayload,
} from '@app/index';
import { Server, Socket } from 'socket.io';
import { Invoice } from 'alby-tools';
import invoiceService from '@app/services/invoicing';
import { get } from '@app/db';
import { splitTextIntoParagraphs } from '@app/services/content';
import { getParagraphText } from '@app/utils/helper';

const socketSubscriptions = new Map<string, SocketSubscription>();

interface ContentSubscription {
  postId: string;
  paragraphs: string[];
  currentParagraph: number;
}

class SocketSubscription {
  private socket: Socket;
  private contentSubscription = new Map<string, ContentSubscription>();

  constructor(socket: Socket) {
    this.socket = socket;
    this.registerEvents();
  }

  emit = <T extends keyof EmittedEventPayload>(
    ...[name, payload]: EmittedEventPayload[T] extends undefined
      ? [T]
      : [T, EmittedEventPayload[T]]
  ): void => {
    this.socket.emit(name, payload);
  };

  on = <T extends keyof SubscribedEventPayload>(
    name: T,
    callback: (payload: SubscribedEventPayload[T]) => void,
  ): void => {
    this.socket.on(name satisfies string, callback);
  };

  registerEvents(): void {
    if (!invoiceService.connected) {
      this.emit('unavailable');
      this.socket.disconnect();
      return;
    }
    this.on('buyParagraph', ([postId, paragraphIdx]) =>
      this.handleNextParagraphRequest(postId, paragraphIdx),
    );
    this.on('disconnect', () => {
      this.socket.disconnect(true);
      console.log('socket disconnected');
    });
  }

  handlePostSubscription = (postId: string, paragraphIdx?: number): ContentSubscription => {
    let contentSubscription = this.contentSubscription.get(postId);
    if (!contentSubscription) {
      const post = get(postId);
      if (!post) {
        this.emit('post-not-found');
        throw new Error(`post ${postId} not found`);
      }
      contentSubscription = {
        postId,
        paragraphs: splitTextIntoParagraphs(post.content),
        currentParagraph: paragraphIdx || 0,
      };
      this.contentSubscription.set(postId, contentSubscription);
      console.log(`client wants to ${paragraphIdx ? 'continue reading' : 'subscribe to'} post ${postId}`);
    }

    return contentSubscription;
  };

  handleNextParagraphRequest = async (postId: string, paragraphIdx?: number): Promise<void> => {
    let contentSubscription: ContentSubscription;
    try {
      contentSubscription = this.handlePostSubscription(postId, paragraphIdx);
    } catch (e) {
      console.warn(e);
      return;
    }
    console.log(`client wants to buy ${getParagraphText(paragraphIdx)}of post ${postId}`);
    if (invoiceService.connected) {
      const invoice = await invoiceService.createInvoice(
        100,
        `${getParagraphText(paragraphIdx)} of post ${postId}`,
      );
      this.emit('invoice', invoice.paymentRequest);
      this.subscribeToInvoice(invoice, contentSubscription);
    } else {
      console.log('not connected');
    }
  };

  subscribeToInvoice = async (
    invoice: Invoice,
    contentSubscription: ContentSubscription,
  ): Promise<void> => {
    const invoiceSubscription = await invoiceService.subscribeToInvoice(invoice);
    invoiceSubscription.on('invoice_paid', () =>
      this.handleInvoicePaid(contentSubscription),
    );
  };

  handleInvoicePaid = async (
    contentSubscription: ContentSubscription,
  ): Promise<void> => {
    const { paragraphs, currentParagraph, postId } = contentSubscription;
    console.log(
      `post: ${postId} - paid for paragraph index ${currentParagraph}/${paragraphs.length - 1
      }`,
    );

    if (currentParagraph < paragraphs.length) {
      this.emit('paragraph', paragraphs[currentParagraph]);
      contentSubscription.currentParagraph += 1;

      if (currentParagraph === paragraphs.length - 1) {
        this.emit('end-of-post');
        this.contentSubscription.delete(contentSubscription.postId);
      }
    }
  };
}

export function registerSocketEvents(io: Server): void {
  io.on('disconnect', (socket: Socket) => {
    console.log('socket disconnected', socket.id);
    socketSubscriptions.delete(socket.id);
  });
  io.on('connection', (socket: Socket) => {
    console.log('socket connected', socket.id);
    const socketService = new SocketSubscription(socket);
    socketSubscriptions.set(socket.id, socketService);
  });
  console.log('ready to accept subscriptions');
}
