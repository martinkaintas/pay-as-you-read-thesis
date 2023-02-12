declare namespace NodeJS {
  export interface ProcessEnv {
    LN_CERT: string;
    LN_MACAROON: string;
    LN_SOCKET: string;
  }
}
