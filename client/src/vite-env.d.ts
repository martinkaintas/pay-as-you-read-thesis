/// <reference types="vite/client" />
import {
  EmittedEvents as ServerEmittedEvents,
  EmittedEventPayload as ServerEmittedPayload,
} from '@server';
import { Socket } from 'socket.io-client';

interface ImportMetaEnv {
  readonly VITE_WS_URL: string;
  readonly VITE_API_URL: string;
}

export interface SubscribedEventPayload extends ServerEmittedPayload {
  connect: undefined;
  disconnect: undefined;
  connection: Socket;
}

export type SubscribedEvents = keyof SubscribedEventPayload;
