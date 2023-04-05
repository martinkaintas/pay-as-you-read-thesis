import { SubscribedEvents} from './vite-env';
import io from 'Socket.IO-client';
import { EmittedEventPayload } from '.';

const socket = io(import.meta.env.VITE_WS_URL);

const on = <T extends SubscribedEvents>(event: T, callback: (...args: any[]) => void) => {
  return socket.on(event, callback as any);
};

const off = <T extends SubscribedEvents>(event: T, callback: (...args: any[]) => void) => {
  return socket.off(event, callback as any);
};

const emit = <T extends keyof EmittedEventPayload>(event: T, payload: EmittedEventPayload[T]) => {
  return socket.emit(event, payload);
};

export default {
  on,
  off,
  emit,
};
