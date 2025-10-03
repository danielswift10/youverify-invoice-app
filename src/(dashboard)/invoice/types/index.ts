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

export interface InvoiceReminder {
  id: string;
  text: string;
  daysBeforeDue: number; // -1 for "on due date", 0+ for days before
  completed: boolean;
  sentAt?: string; // When the reminder was actually sent
}

export interface InvoiceReminderSettings {
  invoiceId: string;
  reminders: InvoiceReminder[];
  autoSend: boolean; // Auto-send reminders?
}

export interface InvoiceItem {
  // id?: string;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  total: number;
}

export interface PaymentInformation {
  accountName: string;
  accountNumber: string;
  achRoutingNo: string;
  bankName: string;
  bankAddress: string;
  swiftCode?: string;
}

export interface InvoiceDetails {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  currencySymbol: string;
}

export interface InvoiceSender {
  name: string;
  logo: string;
  phone: string;
  address: string;
  email: string;
}

export interface InvoiceCustomer {
  name: string;
  phone: string;
  email: string;
  address?: string;
}

export interface InvoiceFinancials {
  subtotal: number;
  discount: number;
  discountPercentage: number;
  tax?: number;
  taxPercentage?: number;
  total: number;
}

export interface FullInvoice {
  id: string;
  invoiceNumber: string;
  status: TStatus
  details: InvoiceDetails;
  sender: InvoiceSender;
  customer: InvoiceCustomer;
  items: InvoiceItem[];
  financials: InvoiceFinancials;
  paymentInformation: PaymentInformation;
  note?: string;
  activities: InvoiceActivities[];
}