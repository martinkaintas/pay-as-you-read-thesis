import { EmittedEventPayload as ClientEmittedPayload } from '@client';
import { Socket } from 'socket.io';

declare namespace NodeJS {
  export interface ProcessEnv {
    LN_CERT: string;
    LN_MACAROON: string;
    LN_SOCKET: string;
    CORS_ORIGIN: string;
  }
}

export interface EmittedEventPayload {
  unavailable: undefined;
  'post-not-found': undefined;
  invoice: string;
  paragraph: string;
  'end-of-post': undefined;
}

export interface SubscribedEventPayload extends ClientEmittedPayload {
  connect: undefined;
  disconnect: undefined;
  connection: Socket;
}

export type SubscribedEvents = keyof SubscribedEventPayload;
