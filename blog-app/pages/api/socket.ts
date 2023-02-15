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

  res.end();
  invoiceService.on('connected', async () =>
    io.emit('invoice', await invoiceService.createInvoice(1000, 'YEAAAAH BUDDY')),
  );
};

export default SocketHandler;
