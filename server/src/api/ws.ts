import { Server, Socket } from 'socket.io';
import EventEmitter from 'events';
import { GetInvoiceResult } from 'lightning';
import invoiceService from '@app/services/invoicing';

const socketSubscriptions = new Map<string, SocketSubscription>();

class SocketSubscription {
  private socket: Socket;
  private invoiceListeners = new Map<string, EventEmitter>();

  constructor(socket: Socket) {
    this.socket = socket;
    this.registerEvents();
  }

  registerEvents(): void {
    if(!invoiceService.connected) {
      console.log("here")
      this.socket.emit('unavailable', 'service unavailable');
      this.socket.disconnect();
      return;
    }
    this.socket.on('buyParagraph', (postId) =>
      this.handleNextParagraphRequest(postId),
    );
    this.socket.on('disconnect', () => console.log('socket disconnected'));
  }
  handleNextParagraphRequest = async (postId:string): Promise<void> => {
    console.log(
      `socket wants to buy next paragraph of post ${postId}`,
    );
    if(invoiceService.connected) {
    const { request, id } = await invoiceService.createInvoice(
      100,
      `next paragraph of post ${postId}`,
    );
    this.socket.emit('invoice', request);
    this.subscribeToInvoice(id);
    } else {
      console.log("not connected")
    }
  };

  subscribeToInvoice = async (id: string): Promise<void> => {
    const invoiceSubscription = await invoiceService.subscribeToInvoice(id);
    this.invoiceListeners.set(id, invoiceSubscription);
    invoiceSubscription.on('invoice_updated', this.handleInvoiceUpdate);
  };

  handleInvoiceUpdate = async (invoice: GetInvoiceResult): Promise<void> => {
    if (invoice.is_confirmed) {
      console.log('invoice paid');
      this.invoiceListeners.get(invoice.id).removeAllListeners();
      this.invoiceListeners.delete(invoice.id);
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
  console.log("ready to accept subscriptions")
}
