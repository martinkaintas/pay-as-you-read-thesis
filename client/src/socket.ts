import io from 'Socket.IO-client';

const socket = io(import.meta.env.VITE_WS_URL);

export default socket;
