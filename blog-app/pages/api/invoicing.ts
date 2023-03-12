import EventEmitter from 'events';
import {
  authenticatedLndGrpc,
  AuthenticatedLnd,
  createInvoice,
  getWalletInfo,
  getInvoice,
  subscribeToInvoice,
} from 'lightning';

export class InvoiceService extends EventEmitter {
  private lnd: AuthenticatedLnd = authenticatedLndGrpc({
    cert: process.env.LN_CERT,
    macaroon: process.env.LN_MACAROON,
    socket: process.env.LN_SOCKET,
  }).lnd;

  constructor() {
    super();
    getWalletInfo({ lnd: this.lnd }, () => {
      this.emit('connected');
    });
  }

  async createInvoice(amount: number, description?: string) {
    const { request, id } = await createInvoice({
      lnd: this.lnd,
      tokens: amount,
      description,
    });
    return { request, id };
  }

  async getInvoice(id: string) {
    return getInvoice({ lnd: this.lnd, id });
  }

  async subscribeToInvoice(id: string) {
    return subscribeToInvoice({ lnd: this.lnd, id });
  }
}

export default new InvoiceService();
