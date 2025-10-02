import GettingStarted from "../(dashboard)/getting-started/GettingStarted";
import Overview from "../(dashboard)/overview/Overview";
import Accounts from "../(dashboard)/accounts/Accounts";
import Invoice from "../(dashboard)/invoice/Invoice";
import BeneficiaryManagement from "../(dashboard)/beneficiary-management/BeneficiaryManagement";
import HelpCenter from "../(dashboard)/help-center/HelpCenter";
import Settings from "../(dashboard)/settings/Settings";
import type { ISideBarData } from "../(dashboard)/types";
import HomeIcon from "../assets/icons/HomeIcon";
import CategoryIcon from "../assets/icons/CategoryIcon";
import ReceiptItemIcon from "../assets/icons/ReceiptItemIcon";
import ProfileUserIcon from "../assets/icons/ProfileUserIcon";
import MessageQuestionIcon from "../assets/icons/MessageQuestionIcon";
import SettingsIcon from "../assets/icons/SettingsIcon";
import type {
  IInvoiceOverviewCard,
  InvoiceActivities,
  InvoiceGroup,
  InvoiceItem,
  InvoiceReminders,
} from "../(dashboard)/invoice/types";
import AllInovices from "../(dashboard)/invoice/all-invoices/AllInovices";
import InvoiceInterface from "../(dashboard)/invoice/components/InvoiceInterface";

interface IRoutes {
  path: string;
  element: React.ComponentType;
  children?: IRoutes[];
}

export const routesData: IRoutes[] = [
  {
    path: "",
    element: GettingStarted,
  },
  {
    path: "overview",
    element: Overview,
  },
  {
    path: "accounts",
    element: Accounts,
  },
  {
    path: "invoice",
    element: Invoice,
    children: [
      {
        path: "",
        element: InvoiceInterface,
      },
      {
        path: "all-invoices",
        element: AllInovices,
      },
    ],
  },
  {
    path: "beneficiary-management",
    element: BeneficiaryManagement,
  },
  {
    path: "help-center",
    element: HelpCenter,
  },
  {
    path: "settings",
    element: Settings,
  },
];

export const sidebarItemsData: ISideBarData[] = [
  {
    title: "Getting Started",
    icon: HomeIcon,
    route: "/",
  },
  {
    title: "Overview",
    icon: CategoryIcon,
    route: "/overview",
  },
  {
    title: "Accounts",
    icon: HomeIcon,
    route: "/accounts",
  },
  {
    title: "Invoice",
    icon: ReceiptItemIcon,
    route: "/invoice",
  },
  {
    title: "Beneficiary Management",
    icon: ProfileUserIcon,
    route: "/beneficiary-management",
  },
  {
    title: "Help Center",
    icon: MessageQuestionIcon,
    route: "/help-center",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    route: "/settings",
  },
];

// Invoice
export const invoiceOverviewStatsData: IInvoiceOverviewCard[] = [
  {
    title: "Total Paid",
    amount: 4120102.76,
    count: 1289,
    status: "PAID",
  },
  {
    title: "Total Overdue",
    amount: 23000.13,
    count: 13,
    status: "OVERDUE",
  },
  {
    title: "Total Draft",
    amount: 12200.0,
    count: 8,
    status: "DRAFT",
  },
  {
    title: "Total Unpaid",
    amount: 87102.0,
    count: 6,
    status: "UNPAID",
  },
];

export const invoiceGroups: InvoiceGroup[] = [
  {
    date: "TODAY - 27TH NOVEMBER, 2022",
    invoices: [
      {
        id: "1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: 1311750.12,
        status: "PAID",
      },
      {
        id: "1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: 1311750.12,
        status: "OVERDUE",
      },
    ],
  },
  {
    date: "8TH DECEMBER, 2022",
    invoices: [
      {
        id: "1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: 1311750.12,
        status: "DRAFT",
      },
      {
        id: "1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: 1311750.12,
        status: "PENDING PAYMENT",
      },
      {
        id: "1023494 - 2304",
        dueDate: "May 19th, 2023",
        amount: 1311750.12,
        status: "PAID",
      },
    ],
  },
];

export const invoiceActivitiesData: InvoiceActivities[] = [
  {
    title: "Invoice Creation",
    type: "created",
    timestamp: "Yesterday, 12:05 PM",
    invoiceNumber: "00239434",
    clientName: "Olaniyi Ojo Adewale",
  },
  {
    title: "Invoice Creation",
    type: "created",
    timestamp: "Yesterday, 12:05 PM",
    invoiceNumber: "00239434",
    clientName: "Olaniyi Ojo Adewale",
  },
  {
    title: "Invoice Creation",
    type: "created",
    timestamp: "Yesterday, 12:05 PM",
    invoiceNumber: "00239434",
    clientName: "Olaniyi Ojo Adewale",
  },
  {
    title: "Invoice Creation",
    type: "created",
    timestamp: "Yesterday, 12:05 PM",
    invoiceNumber: "00239434",
    clientName: "Olaniyi Ojo Adewale",
  },
];

export const invoiceRemindersData: InvoiceReminders[] = [
  { text: "14 days before due date", completed: true },
  { text: "7 days before due date", completed: true },
  { text: "3 days before due date", completed: false },
  { text: "24 hrs before due date", completed: false },
  { text: "On the due date", completed: false },
];

export const invoiceItemsData: InvoiceItem[] = [
  {
    name: "Email Marketing",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
    quantity: 10,
    price: 1500,
    total: 15000.0,
  },
  {
    name: "Video looping effect",
    quantity: 6,
    price: 1110500,
    total: 6663000.0,
  },
  {
    name: "Graphic design for emails",
    description: "Tait voluptatem accusantium",
    quantity: 7,
    price: 2750,
    total: 19250.0,
  },
  {
    name: "Video looping effect",
    quantity: 6,
    price: 1110500,
    total: 6663000.0,
  },
];

export const invoiceActivityData: InvoiceActivities[] = [
  {
    user: "You",
    timestamp: "Today, 12:20 PM",
    type: "created",
    invoiceNumber: "00239434",
    clientName: "Olaniyi Ojo Adewale",
  },
  {
    user: "You",
    timestamp: "Today, 12:20 PM",
    type: "sent",
    invoiceNumber: "00239434",
    clientName: "Olaniyi Ojo Adewale",
  },
  {
    user: "Payment Confirmed",
    timestamp: "Today, 12:20 PM",
    type: "payment_partial",
    amount: 503000.0,
  },
  {
    user: "Payment Confirmed",
    timestamp: "Today, 12:20 PM",
    type: "payment_full",
    amount: 6000000.0,
  },
  {
    user: "You",
    timestamp: "Today, 12:20 PM",
    type: "sent",
    invoiceNumber: "00239434",
    clientName: "Olaniyi Ojo Adewale",
  },
];


export const allInvoicesData: InvoiceGroup[] = [
  {
    date: "TODAY - 27TH MARCH, 2023",
    invoices: [
      {
        invoiceId: "Fecd7dsa9a57.....",
        dateCreated: "23 Sept, 2023",
        time: "18:03:23",
        customer: "Olaniyi Oluwadare Johnson",
        amount: 1311750.12,
        status: "PAID",
      },
      {
        invoiceId: "Fecd7dsa9a57.....",
        dateCreated: "23 Sept, 2023",
        time: "18:03:23",
        customer: "Olaniyi Oluwadare Johnson",
        amount: 1311750.12,
        status: "PAID",
      },
      {
        invoiceId: "Fecd7dsa9a57.....",
        dateCreated: "23 Sept, 2023",
        time: "18:03:23",
        customer: "Olaniyi Oluwadare Johnson",
        amount: 1311750.12,
        status: "PAID",
      },
    ],
  },
  {
    date: "8TH DECEMBER, 2022",
    invoices: [
      {
        invoiceId: "Fecd7dsa9a57.....",
        dateCreated: "23 Sept, 2023",
        time: "18:03:23",
        customer: "Olaniyi Oluwadare Johnson",
        amount: 1311750.12,
        status: "PAID",
      },
      {
        invoiceId: "Fecd7dsa9a57.....",
        dateCreated: "23 Sept, 2023",
        time: "18:03:23",
        customer: "Olaniyi Oluwadare Johnson",
        amount: 1311750.12,
        status: "PAID",
      },
      {
        invoiceId: "Fecd7dsa9a57.....",
        dateCreated: "23 Sept, 2023",
        time: "18:03:23",
        customer: "Olaniyi Oluwadare Johnson",
        amount: 1311750.12,
        status: "PAID",
      },
      {
        invoiceId: "Fecd7dsa9a57.....",
        dateCreated: "23 Sept, 2023",
        time: "18:03:23",
        customer: "Olaniyi Oluwadare Johnson",
        amount: 1311750.12,
        status: "PAID",
      },
      {
        invoiceId: "Fecd7dsa9a57.....",
        dateCreated: "23 Sept, 2023",
        time: "18:03:23",
        customer: "Olaniyi Oluwadare Johnson",
        amount: 1311750.12,
        status: "PAID",
      },
      {
        invoiceId: "Fecd7dsa9a57.....",
        dateCreated: "23 Sept, 2023",
        time: "18:03:23",
        customer: "Olaniyi Oluwadare Johnson",
        amount: 1311750.12,
        status: "PAID",
      },
      {
        invoiceId: "Fecd7dsa9a57.....",
        dateCreated: "23 Sept, 2023",
        time: "18:03:23",
        customer: "Olaniyi Oluwadare Johnson",
        amount: 1311750.12,
        status: "PAID",
      },
    ],
  },
];