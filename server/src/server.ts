import './utils/environment';
import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import { registerSocketEvents } from '@app/api/ws';
import router from '@app/api/rest';
import cors from 'cors';

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

const app = express();
app.use(cors(corsOptions));
app.use(router);

const server = http.createServer(app);
const io = new Server(server, { cors: corsOptions });
registerSocketEvents(io);

server.listen(3000, () => {
  console.log('listening on *:3000');
});
