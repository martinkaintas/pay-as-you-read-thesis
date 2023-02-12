import EventEmitter from 'events';
import {
  subscribeToPayments,
  authenticatedLndGrpc,
  AuthenticatedLnd,
  createInvoice,
  getWalletInfo,
} from 'lightning';

export class InvoiceService extends EventEmitter {
  private lnd: AuthenticatedLnd = authenticatedLndGrpc({
    cert: process.env.LN_CERT,
    macaroon: process.env.LN_MACAROON,
    socket: process.env.LN_SOCKET,
  }).lnd;

  paymentListener = subscribeToPayments({ lnd: this.lnd });

  constructor() {
    super();
    getWalletInfo({ lnd: this.lnd }, () => {
      this.emit('connected');
    });
  }

  async createInvoice(amount: number, description?: string) {
    const { request } = await createInvoice({
      lnd: this.lnd,
      tokens: amount,
      description,
    });
    return request;
  }
}

export default new InvoiceService();
