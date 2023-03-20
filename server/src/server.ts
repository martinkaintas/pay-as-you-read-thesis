import './utils/environment'
import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import { registerSocketEvents } from '@app/api/ws';
import router from '@app/api/rest';


const app = express();
app.use(router)
const server = http.createServer(app);
const io = new Server(server);
registerSocketEvents(io);

server.listen(3000, () => {
  console.log('listening on *:3000');
});
