import { GetInvoiceResult } from 'lightning';
import { Socket } from 'Socket.IO-client';
import invoiceService from './invoicing';
import { Server } from 'Socket.IO';
import EventEmitter from 'events';

const socketClients = new Map<string, SocketService>();

class SocketService {
  private client: Socket;
  private io: Server;
  private invoiceListeners = new Map<string, EventEmitter>();

  constructor(client: Socket, io: Server) {
    this.client = client;
    this.io = io;
    this.registerEvents();
  }

  registerEvents() {
    this.client.on('buyParagraph', (data) => this.handleNextParagraphRequest(data));
    this.client.on('disconnect', () => console.log('Client disconnected'));
  }
  handleNextParagraphRequest = async (data: { postId: string; index: number }) => {
    console.log(`client wants to buy next paragraph ${data.index} of post ${data.postId}`);
    const { request, id } = await invoiceService.createInvoice(
      100,
      `paragraph ${data.index.toString()} of post ${data.postId}`,
    );
    // todo: after migrating nodeJS, use client instead of io
    this.io.emit('invoice', request);
    this.subscribeToInvoice(id);
  };

  subscribeToInvoice = async (id: string) => {
    const invoiceSubscription = await invoiceService.subscribeToInvoice(id);
    this.invoiceListeners.set(id, invoiceSubscription);
    invoiceSubscription.on('invoice_updated', this.handleInvoiceUpdate);
  };

  handleInvoiceUpdate = async (invoice: GetInvoiceResult) => {
    if (invoice.is_confirmed) {
      console.log('invoice paid');
      this.invoiceListeners.get(invoice.id).removeAllListeners();
      this.invoiceListeners.delete(invoice.id);
    }
  };
}

const SocketHandler = (_req: Request, res) => {
  let io = res.socket.server.io;
  if (io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    io = new Server(res.socket.server);
    res.socket.server.io = io;
  }
  io.on('connection', (socket: Socket) => {
    console.log('Client connected', socket.id);
    const socketService = new SocketService(socket, io);
    socketClients.set(socket.id, socketService);
  });
  io.on('disconnect', (socket: Socket) => {
    console.log('Client disconnected', socket.id);
    socketClients.delete(socket.id);
  });
  res.end();
};

export default SocketHandler;
