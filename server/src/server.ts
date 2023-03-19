import './utils/environment'
import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import { registerSocketEvents } from '@app/api/ws';


const app = express();
const server = http.createServer(app);
const io = new Server(server);
registerSocketEvents(io);

server.listen(3000, () => {
  console.log('listening on *:3000');
});
