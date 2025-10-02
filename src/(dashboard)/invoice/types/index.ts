export type TStatus =
  | "PAID"
  | "OVERDUE"
  | "DRAFT"
  | "UNPAID"
  | "PENDING PAYMENT";
export interface IInvoiceOverviewCard {
  title: string;
  amount: number;
  count: number;
  status: TStatus;
}

export interface Invoices {
  id?: string;
  invoiceId?: string
  dateCreated?: string;
  dueDate?: string;
  time?: string;
  customer?: string
  amount: number;
  status: TStatus;
}

export interface InvoiceActivities {
  title?: string
  user?: string
  type: 'created' | 'sent' | 'payment_partial' | 'payment_full';
  timestamp: string;
  invoiceNumber?: string;
  clientName?: string;
  amount?: number
}

export interface InvoiceGroup {
  date: string;
  invoices: Invoices[];
}

export interface InvoiceReminders {
  text: string;
  completed: boolean;
}

export interface InvoiceItem {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  total: number;
}
