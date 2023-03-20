import EventEmitter from 'events';
import {
  authenticatedLndGrpc,
  AuthenticatedLnd,
  createInvoice,
  getWalletInfo,
  getInvoice,
  subscribeToInvoice,
  GetInvoiceResult,
} from 'lightning';

export class InvoiceService {
  connected = false;

  private lnd: AuthenticatedLnd = authenticatedLndGrpc({
    cert: process.env.LN_CERT,
    macaroon: process.env.LN_MACAROON,
    socket: process.env.LN_SOCKET,
  }).lnd;

  constructor() {
      getWalletInfo({ lnd: this.lnd }, (err) => {
      if (err) {
        console.error('Error connecting to LND', err);
      }
      this.connected = true;
    });
  }

  async createInvoice(amount: number, description?: string): Promise<{
    request: string;
    id: string;
  }> {
    const { request, id } = await createInvoice({
      lnd: this.lnd,
      tokens: amount,
      description,
    });
    return { request, id };
  }

  async getInvoice(id: string): Promise<GetInvoiceResult> {
    return getInvoice({ lnd: this.lnd, id });
  }

  async subscribeToInvoice(id: string): Promise<EventEmitter> {
    return subscribeToInvoice({ lnd: this.lnd, id });
  }
}

export default new InvoiceService();
