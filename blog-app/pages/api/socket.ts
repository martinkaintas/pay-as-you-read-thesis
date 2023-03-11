import invoiceService from './invoicing';
import { Server } from 'Socket.IO';

const SocketHandler = (_req: Request, res) => {
  let io = res.socket.server.io;
  if (io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    io = new Server(res.socket.server);
    res.socket.server.io = io;
  }
  io.on('connection', (socket) => {
    socket.on('buyParagraph', async (data: { postId: string; index: number }) => {
      console.log(`client wants to buy paragraph ${data.index} of post ${data.postId}`);
      io.emit(
        'invoice',
        await invoiceService.createInvoice(
          100,
          `paragraph ${data.index.toString()} of post ${data.postId}`,
        ),
      );
      invoiceService.paymentListener.on('confirmed', (data) => {
        console.log('payment received', data);
      });
      invoiceService.paymentListener.on('paying', (data) => {
        console.log('paying', data);
      });
    });
    socket.on('disconnect', () => console.log('Client disconnected'));
  });

  res.end();
  invoiceService.on('connected', async () => console.log('Connected to LND'));
};

export default SocketHandler;
