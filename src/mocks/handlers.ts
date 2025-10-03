/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse, delay } from "msw";
import enterprise_logo from "../assets/images/enterprise-logo.png";
import {
  invoiceOverviewStatsData,
  invoiceRemindersData,
  invoiceItemsData,
  invoiceActivityData,
  allInvoicesData,
  recentInvoiceActivitiesData,
  recentInvoicesData,
} from "../utils/data";
import type { InvoiceReminderSettings } from "../pages/dashboard/invoice/types";

const invoices = [...allInvoicesData];
const recentInvoiceActivities = [...recentInvoiceActivitiesData];
const recentInvoices = [...recentInvoicesData];
const invoiceActivities = [...invoiceActivityData];
const invoiceItems = [...invoiceItemsData];
let reminders = [...invoiceRemindersData];
const overviewStats = [...invoiceOverviewStatsData];

const generateId = () => Math.random().toString(36).substring(2, 15);

const baseURL = "/api";

export const handlers = [
  // Get all invoices
  http.get(`${baseURL}/invoices`, async () => {
    await delay(500);

    const filteredInvoices = [...invoices];

    const invoicesWithIds = filteredInvoices.map((group) => ({
      ...group,
      invoices: group.invoices.map((inv) => ({
        ...inv,
        id: inv.invoiceId || inv.id || generateId(),
      })),
    }));

    return HttpResponse.json({
      success: true,
      data: invoicesWithIds,
    });
  }),

  // Get invoice
  http.get(`${baseURL}/invoices/:id`, async ({ params }) => {
    await delay(300);

    const { id } = params;

    for (const group of invoices) {
      const invoice = group.invoices.find(
        (inv) =>
          (inv.invoiceId && inv.invoiceId === id) || (inv.id && inv.id === id)
      );

      if (invoice) {
        const invoiceNumber =
          invoice.invoiceId || invoice.id || `INV-${generateId()}`;
        const itemsSubtotal = invoiceItems.reduce(
          (sum, item) => sum + item.total,
          0
        );
        const discountPercentage = 2.5;
        const discountAmount = itemsSubtotal * (discountPercentage / 100);
        const totalAmount = itemsSubtotal - discountAmount;

        const fullInvoice = {
          id: invoice.invoiceId || invoice.id || generateId(),
          invoiceNumber: invoiceNumber,
          status: invoice.status || "PENDING PAYMENT",
          details: {
            invoiceNumber: invoiceNumber.replace(/[^0-9]/g, "") || "1023902390",
            issueDate: invoice.dateCreated || "March 30th, 2023",
            dueDate: invoice.dueDate || "May 19th, 2023",
            currency: "USD",
            currencySymbol: "$",
          },
          sender: {
            name: "Fabulous Enterprise",
            logo: enterprise_logo,
            phone: "+386 989 271 3115",
            address: "1331 Hart Ridge Road 48436 Gaines, MI",
            email: "info@fabulousenterprise.co",
          },
          customer: {
            name: invoice.customer || "Olaniyi Ojo Adewale",
            phone: "+386 989 271 3115",
            email: "olaniyi@email.com",
            address: "123 Customer Street, Lagos, Nigeria",
          },
          items: invoiceItems.map((item) => ({
            ...item,
            id: generateId(),
          })),
          financials: {
            subtotal: itemsSubtotal,
            discount: discountAmount,
            discountPercentage: discountPercentage,
            tax: 0,
            taxPercentage: 0,
            total: invoice.amount || totalAmount,
          },
          paymentInformation: {
            accountName: "Fabulous Enterprise LLC",
            accountNumber: "1234567890",
            achRoutingNo: "110000000",
            bankName: "JP Morgan Chase Bank",
            bankAddress: "270 Park Avenue, New York, NY 10017",
            swiftCode: "CHASUS33",
          },
          note: "Thank you for your patronage",
          activities: invoiceActivities.map((activity, index) => ({
            ...activity,
            id: `activity-${index}`,
            timestamp: activity.timestamp || "Just now",
          })),
        };

        return HttpResponse.json({
          success: true,
          data: fullInvoice,
        });
      }
    }

    return HttpResponse.json(
      { success: false, error: "Invoice not found" },
      { status: 404 }
    );
  }),

  // Create new invoice
  http.post(`${baseURL}/invoices`, async ({ request }) => {
    await delay(800);

    const body = (await request.json()) as any;

    const newInvoice = {
      invoiceId: generateId(),
      dateCreated: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
      customer: body.customer || "New Customer",
      amount: body.amount || 0,
      status: body.status || "DRAFT",
      dueDate: body.dueDate || new Date().toISOString(),
      ...body,
    };

    if (invoices.length > 0) {
      invoices[0].invoices.unshift(newInvoice);
    } else {
      invoices.unshift({
        date: `TODAY - ${new Date()
          .toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
          .toUpperCase()}`,
        invoices: [newInvoice],
      });
    }

    const newActivity = {
      user: "You",
      timestamp: "Just now",
      type: "created" as const,
      invoiceNumber: newInvoice.invoiceId,
      clientName: newInvoice.customer,
    };
    recentInvoiceActivities.unshift(newActivity);

    return HttpResponse.json(
      {
        success: true,
        data: newInvoice,
        message: "Invoice created successfully",
      },
      { status: 201 }
    );
  }),

  // Get all recent invoices activities
  http.get(`${baseURL}/recent-activities`, async () => {
    await delay(300);

    return HttpResponse.json({
      success: true,
      data: recentInvoiceActivities,
    });
  }),

  // Get all recent invoices
  http.get(`${baseURL}/recent-invoices`, async () => {
    await delay(300);

    return HttpResponse.json({
      success: true,
      data: recentInvoices,
    });
  }),

  // Get invoice activities
  http.get(`${baseURL}/invoices/:id/activities`, async () => {
    await delay(300);

    return HttpResponse.json({
      success: true,
      data: invoiceActivities,
    });
  }),

  // Create activity
  http.post(`${baseURL}/activities`, async ({ request }) => {
    await delay(200);

    const body = (await request.json()) as any;
    const newActivity = {
      ...body,
      timestamp: "Just now",
    };

    recentInvoiceActivities.unshift(newActivity);

    return HttpResponse.json(
      {
        success: true,
        data: newActivity,
      },
      { status: 201 }
    );
  }),

  // Get overview stats
  http.get(`${baseURL}/overview/stats`, async () => {
    await delay(400);

    return HttpResponse.json({
      success: true,
      data: overviewStats,
    });
  }),

  // Get reminders
  http.get(`${baseURL}/invoices/:id/reminders`, async ({ params }) => {
    await delay(200);

    const { id } = params;

    const response: InvoiceReminderSettings = {
      invoiceId: id as string,
      reminders,
      autoSend: false,
    };

    return HttpResponse.json({
      success: true,
      data: response,
    });
  }),

  // Update reminders
  http.put(`${baseURL}/reminders`, async ({ request }) => {
    await delay(300);

    const body = (await request.json()) as any;
    reminders = body;

    return HttpResponse.json({
      success: true,
      data: reminders,
      message: "Reminders updated successfully",
    });
  }),

  // Search invoices
  http.get(`${baseURL}/invoices/search`, async ({ request }) => {
    await delay(400);

    const url = new URL(request.url);
    const query = url.searchParams.get("q")?.toLowerCase() || "";

    const results = invoices
      .map((group) => ({
        ...group,
        invoices: group.invoices.filter(
          (inv) =>
            inv.invoiceId?.toLowerCase().includes(query) ||
            inv.id?.toLowerCase().includes(query) ||
            inv.customer?.toLowerCase().includes(query) ||
            inv.status?.toLowerCase().includes(query)
        ),
      }))
      .filter((group) => group.invoices.length > 0);

    return HttpResponse.json({
      success: true,
      data: results,
      total: results.reduce((acc, group) => acc + group.invoices.length, 0),
    });
  }),
];
