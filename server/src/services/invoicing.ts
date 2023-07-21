import { Invoice, LightningAddress } from "alby-tools";
import EventEmitter from "events";

export class InvoiceService {
  connected = false;

  private ln: LightningAddress;


  constructor() {
    this.ln = new LightningAddress(process.env.LN_ADDRESS);
    this.ln.fetch().then(() =>
      this.connected = true
    );
  }

  async createInvoice(amount: number, description?: string): Promise<Invoice> {
    const invoice = await this.ln.requestInvoice({ satoshi: amount, comment: description });
    return invoice;
  }

  async isPaid(invoice: Invoice): Promise<boolean> {
    return await invoice.isPaid();
  }

  async subscribeToInvoice(invoice: Invoice): Promise<EventEmitter> {
    const emitter = new EventEmitter();
    const maxPolls = 100; // 20 seconds
    let pollCount = 0;

    const poll = async () => {
      pollCount++;
      const paid = await invoice.isPaid();
      if (paid) {
        emitter.emit('invoice_paid');
      } else if (pollCount < maxPolls) {
        setTimeout(poll, 200);
      }
    };

    poll();

    return emitter;
  }
}

export default new InvoiceService();
