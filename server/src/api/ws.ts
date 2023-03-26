import { Server, Socket } from 'socket.io';
import EventEmitter from 'events';
import { GetInvoiceResult } from 'lightning';
import invoiceService from '@app/services/invoicing';
import { get } from '@app/db';
import { splitTextIntoParagraphs } from '@app/services/content';

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

  registerEvents(): void {
    if (!invoiceService.connected) {
      this.socket.emit('unavailable', 'service unavailable');
      this.socket.disconnect();
      return;
    }
    this.socket.on('buyParagraph', (postId) =>
      this.handleNextParagraphRequest(postId),
    );
    this.socket.on('disconnect', () => console.log('socket disconnected'));
  }

  handlePostSubscription = (postId: string): ContentSubscription => {
    let contentSubscription = this.contentSubscription.get(postId);
    if (!contentSubscription) {
      const post = get(postId);
      if (!post) {
        this.socket.emit('not found', 'post not found');
        throw new Error(`post ${postId} not found`);
      }
      contentSubscription = {
        postId,
        paragraphs: splitTextIntoParagraphs(post.content),
        currentParagraph: 0,
      };
      this.contentSubscription.set(postId, contentSubscription);
      console.log(`client wants to subscribe to post ${postId}`);
    }

    return contentSubscription;
  };

  handleNextParagraphRequest = async (postId: string): Promise<void> => {
    let contentSubscription: ContentSubscription;
    try {
      contentSubscription = this.handlePostSubscription(postId);
    } catch (e) {
      console.warn(e);
      return;
    }
    console.log(`client wants to buy next paragraph of post ${postId}`);
    if (invoiceService.connected) {
      const { request, id } = await invoiceService.createInvoice(
        100,
        `next paragraph of post ${postId}`,
      );
      this.socket.emit('invoice', request);
      this.subscribeToInvoice(id, contentSubscription);
    } else {
      console.log('not connected');
    }
  };

  subscribeToInvoice = async (
    id: string,
    contentSubscription: ContentSubscription,
  ): Promise<void> => {
    const invoiceSubscription = await invoiceService.subscribeToInvoice(id);
    invoiceSubscription.on('invoice_updated', (invoice) =>
      this.handleInvoiceUpdate(invoice, contentSubscription),
    );
  };

  handleInvoiceUpdate = async (
    invoice: GetInvoiceResult,
    contentSubscription: ContentSubscription,
  ): Promise<void> => {
    if (invoice.is_confirmed) {
      const { paragraphs, currentParagraph,postId } = contentSubscription;
      console.log(`post: ${postId} - paid for paragraph index ${currentParagraph}/${paragraphs.length - 1}`);

      if (currentParagraph < paragraphs.length) {
        this.socket.emit('paragraph', paragraphs[currentParagraph]);
        contentSubscription.currentParagraph += 1;

        if (currentParagraph === paragraphs.length-1) {
          this.socket.emit('end-of-post');
          this.contentSubscription.delete(contentSubscription.postId);
        }
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
