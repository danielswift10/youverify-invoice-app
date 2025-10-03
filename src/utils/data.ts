import GettingStarted from "../pages/dashboard/getting-started/GettingStarted";
import Overview from "../pages/dashboard/overview/Overview";
import Accounts from "../pages/dashboard/accounts/Accounts";
import Invoice from "../pages/dashboard/invoice/Invoice";
import BeneficiaryManagement from "../pages/dashboard/beneficiary-management/BeneficiaryManagement";
import HelpCenter from "../pages/dashboard/help-center/HelpCenter";
import Settings from "../pages/dashboard/settings/Settings";
import type { ISideBarData } from "../pages/dashboard/types";
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
  InvoiceReminder,
} from "../pages/dashboard/invoice/types";
import AllInovices from "../pages/dashboard/invoice/all-invoices/AllInovices";
import InvoiceInterface from "../pages/dashboard/invoice/components/InvoiceInterface";

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

export const recentInvoicesData: InvoiceGroup[] = [
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
        status: "PARTIAL PAYMENT",
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

export const recentInvoiceActivitiesData: InvoiceActivities[] = [
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
        invoiceId: "INV-001-2023",
        dateCreated: "23 Sept, 2023",
        time: "18:03:23",
        customer: "Olaniyi Oluwadare Johnson",
        amount: 1311750.12,
        status: "PAID",
      },
      {
        invoiceId: "INV-002-2023",
        dateCreated: "23 Sept, 2023",
        time: "17:45:10",
        customer: "Adebayo Michael Thompson",
        amount: 856420.5,
        status: "PENDING PAYMENT",
      },
      {
        invoiceId: "INV-003-2023",
        dateCreated: "23 Sept, 2023",
        time: "16:20:05",
        customer: "Chidinma Grace Okafor",
        amount: 2145600.0,
        status: "PAID",
      },
    ],
  },
  {
    date: "8TH DECEMBER, 2022",
    invoices: [
      {
        invoiceId: "INV-004-2022",
        dateCreated: "8 Dec, 2022",
        time: "14:30:45",
        customer: "Babatunde Samuel Adeleke",
        amount: 654320.75,
        status: "OVERDUE",
      },
      {
        invoiceId: "INV-005-2022",
        dateCreated: "8 Dec, 2022",
        time: "13:15:22",
        customer: "Funmilayo Janet Ajayi",
        amount: 1987500.0,
        status: "PAID",
      },
      {
        invoiceId: "INV-006-2022",
        dateCreated: "8 Dec, 2022",
        time: "11:50:30",
        customer: "Chukwuemeka Peter Okonkwo",
        amount: 432100.25,
        status: "DRAFT",
      },
      {
        invoiceId: "INV-007-2022",
        dateCreated: "8 Dec, 2022",
        time: "10:25:15",
        customer: "Aisha Fatima Ibrahim",
        amount: 1567890.5,
        status: "PAID",
      },
      {
        invoiceId: "INV-008-2022",
        dateCreated: "8 Dec, 2022",
        time: "09:40:55",
        customer: "Olufemi David Adeyemi",
        amount: 2345670.0,
        status: "UNPAID",
      },
      {
        invoiceId: "INV-009-2022",
        dateCreated: "8 Dec, 2022",
        time: "08:55:40",
        customer: "Ngozi Patricia Nwosu",
        amount: 876540.8,
        status: "PAID",
      },
      {
        invoiceId: "INV-010-2022",
        dateCreated: "8 Dec, 2022",
        time: "08:10:20",
        customer: "Yusuf Mohammed Bello",
        amount: 1234567.9,
        status: "PENDING PAYMENT",
      },
    ],
  },
];

export const invoiceRemindersData: InvoiceReminder[] = [
  {
    id: "reminder-14",
    text: "14 days before due date",
    daysBeforeDue: 14,
    completed: true,
  },
  {
    id: "reminder-7",
    text: "7 days before due date",
    daysBeforeDue: 7,
    completed: true,
  },
  {
    id: "reminder-3",
    text: "3 days before due date",
    daysBeforeDue: 3,
    completed: false,
  },
  {
    id: "reminder-1",
    text: "24 hrs before due date",
    daysBeforeDue: 1,
    completed: false,
  },
  {
    id: "reminder-0",
    text: "On the due date",
    daysBeforeDue: -1,
    completed: false,
  },
];
