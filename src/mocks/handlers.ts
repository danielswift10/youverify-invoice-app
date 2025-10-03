/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse, delay } from 'msw';
import {
  invoiceOverviewStatsData,
  invoiceRemindersData,
  invoiceItemsData,
  invoiceActivityData,
  allInvoicesData,
  recentInvoiceActivitiesData,
  recentInvoicesData,
} from '../utils/data';
import type { InvoiceReminderSettings } from '../(dashboard)/invoice/types';

// In-memory data store
let invoices = [...allInvoicesData];
let recentInvoiceActivities = [...recentInvoiceActivitiesData];
let recentInvoices = [...recentInvoicesData]
let invoiceActivities = [...invoiceActivityData];
let invoiceItems = [...invoiceItemsData];
let reminders = [...invoiceRemindersData];
let overviewStats = [...invoiceOverviewStatsData];

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

// API Base URL
const baseURL = '/api';

export const handlers = [
  // Get all invoices with optional filters
  http.get(`${baseURL}/invoices`, async ({ request }) => {
    await delay(500);
    
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const dateFrom = url.searchParams.get('dateFrom');
    const dateTo = url.searchParams.get('dateTo');
    
    let filteredInvoices = [...invoices];
    
    if (status) {
      filteredInvoices = filteredInvoices.map(group => ({
        ...group,
        invoices: group.invoices.filter(inv => inv.status === status)
      })).filter(group => group.invoices.length > 0);
    }
    
    // Ensure every invoice has an ID for modal rendering
    const invoicesWithIds = filteredInvoices.map(group => ({
      ...group,
      invoices: group.invoices.map(inv => ({
        ...inv,
        id: inv.invoiceId || inv.id || generateId()
      }))
    }));
    
    return HttpResponse.json({
      success: true,
      data: invoicesWithIds,
      total: invoicesWithIds.reduce((acc, group) => acc + group.invoices.length, 0)
    });
  }),

  // Get single invoice by ID (Full detailed invoice for modal)
  http.get(`${baseURL}/invoices/:id`, async ({ params }) => {
    await delay(300);
    
    const { id } = params;
    
    for (const group of invoices) {
      const invoice = group.invoices.find(inv => 
        (inv.invoiceId && inv.invoiceId === id) || 
        (inv.id && inv.id === id)
      );
      
      if (invoice) {
        const invoiceNumber = invoice.invoiceId || invoice.id || `INV-${generateId()}`;
        const itemsSubtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
        const discountPercentage = 2.5;
        const discountAmount = itemsSubtotal * (discountPercentage / 100);
        const totalAmount = itemsSubtotal - discountAmount;
        
        const fullInvoice = {
          id: invoice.invoiceId || invoice.id || generateId(),
          invoiceNumber: invoiceNumber,
          status: invoice.status || 'PENDING PAYMENT',
          details: {
            invoiceNumber: invoiceNumber.replace(/[^0-9]/g, '') || '1023902390',
            issueDate: invoice.dateCreated || 'March 30th, 2023',
            dueDate: invoice.dueDate || 'May 19th, 2023',
            currency: 'USD',
            currencySymbol: '$',
          },
          sender: {
            name: 'Fabulous Enterprise',
            logo: '/assets/images/enterprise-logo.png',
            phone: '+386 989 271 3115',
            address: '1331 Hart Ridge Road 48436 Gaines, MI',
            email: 'info@fabulousenterprise.co',
          },
          customer: {
            name: invoice.customer || 'Olaniyi Ojo Adewale',
            phone: '+386 989 271 3115',
            email: 'olaniyi@email.com',
            address: '123 Customer Street, Lagos, Nigeria',
          },
          items: invoiceItems.map(item => ({
            ...item,
            id: generateId()
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
            accountName: 'Fabulous Enterprise LLC',
            accountNumber: '1234567890',
            achRoutingNo: '110000000',
            bankName: 'JP Morgan Chase Bank',
            bankAddress: '270 Park Avenue, New York, NY 10017',
            swiftCode: 'CHASUS33',
          },
          note: 'Thank you for your patronage',
          activities: invoiceActivities.map((activity, index) => ({
            ...activity,
            id: `activity-${index}`,
            timestamp: activity.timestamp || 'Just now'
          })),
        };
        
        return HttpResponse.json({
          success: true,
          data: fullInvoice
        });
      }
    }
    
    return HttpResponse.json(
      { success: false, error: 'Invoice not found' },
      { status: 404 }
    );
  }),

  // Create new invoice
  http.post(`${baseURL}/invoices`, async ({ request }) => {
    await delay(800);
    
    const body = await request.json() as any;
    
    const newInvoice = {
      invoiceId: generateId(),
      dateCreated: new Date().toLocaleDateString('en-US', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }),
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      }),
      customer: body.customer || 'New Customer',
      amount: body.amount || 0,
      status: body.status || 'DRAFT',
      dueDate: body.dueDate || new Date().toISOString(),
      ...body
    };
    
    // Add to the first group (TODAY)
    if (invoices.length > 0) {
      invoices[0].invoices.unshift(newInvoice);
    } else {
      invoices.unshift({
        date: `TODAY - ${new Date().toLocaleDateString('en-US', { 
          day: 'numeric',
          month: 'long',
          year: 'numeric' 
        }).toUpperCase()}`,
        invoices: [newInvoice]
      });
    }
    
    // Log activity
    const newActivity = {
      user: 'You',
      timestamp: 'Just now',
      type: 'created' as const,
      invoiceNumber: newInvoice.invoiceId,
      clientName: newInvoice.customer
    };
    recentInvoiceActivities.unshift(newActivity);
    
    return HttpResponse.json({
      success: true,
      data: newInvoice,
      message: 'Invoice created successfully'
    }, { status: 201 });
  }),

  // Update invoice
  http.put(`${baseURL}/invoices/:id`, async ({ params, request }) => {
    await delay(600);
    
    const { id } = params;
    const updates = await request.json() as any;
    
    for (const group of invoices) {
      const index = group.invoices.findIndex(inv => inv.invoiceId === id || inv.id === id);
      if (index !== -1) {
        group.invoices[index] = { ...group.invoices[index], ...updates };
        
        // Log activity
        const newActivity = {
          user: 'You',
          timestamp: 'Just now',
          type: 'updated' as any,
          invoiceNumber: group.invoices[index].invoiceId || group.invoices[index].id,
          clientName: group.invoices[index].customer || 'Unknown'
        };
        recentInvoiceActivities.unshift(newActivity);
        
        return HttpResponse.json({
          success: true,
          data: group.invoices[index],
          message: 'Invoice updated successfully'
        });
      }
    }
    
    return HttpResponse.json(
      { success: false, error: 'Invoice not found' },
      { status: 404 }
    );
  }),

  // Update invoice status
  http.patch(`${baseURL}/invoices/:id/status`, async ({ params, request }) => {
    await delay(400);
    
    const { id } = params;
    const { status } = await request.json() as any;
    
    for (const group of invoices) {
      const index = group.invoices.findIndex(inv => inv.invoiceId === id || inv.id === id);
      if (index !== -1) {
        group.invoices[index].status = status;
        
        return HttpResponse.json({
          success: true,
          data: group.invoices[index],
          message: 'Invoice status updated'
        });
      }
    }
    
    return HttpResponse.json(
      { success: false, error: 'Invoice not found' },
      { status: 404 }
    );
  }),

  // Delete invoice
  http.delete(`${baseURL}/invoices/:id`, async ({ params }) => {
    await delay(500);
    
    const { id } = params;
    
    for (const group of invoices) {
      const index = group.invoices.findIndex(inv => inv.invoiceId === id || inv.id === id);
      if (index !== -1) {
        group.invoices.splice(index, 1);
        return HttpResponse.json({
          success: true,
          message: 'Invoice deleted successfully'
        });
      }
    }
    
    return HttpResponse.json(
      { success: false, error: 'Invoice not found' },
      { status: 404 }
    );
  }),

  // Get invoice items
  http.get(`${baseURL}/invoices/:id/items`, async ({ params }) => {
    await delay(300);
    
    return HttpResponse.json({
      success: true,
      data: invoiceItems
    });
  }),

  // Add invoice item
  http.post(`${baseURL}/invoices/:id/items`, async ({ request }) => {
    await delay(400);
    
    const body = await request.json() as any;
    const newItem = {
      id: generateId(),
      ...body,
      total: (body.quantity || 0) * (body.price || 0)
    };
    
    invoiceItems.push(newItem);
    
    return HttpResponse.json({
      success: true,
      data: newItem,
      message: 'Item added successfully'
    }, { status: 201 });
  }),

  // Update invoice item
  http.put(`${baseURL}/invoices/:id/items/:itemId`, async ({ params, request }) => {
    await delay(400);
    
    const { itemId } = params;
    const updates = await request.json() as any;
    
    const index = invoiceItems.findIndex((item: any) => item.id === itemId);
    if (index !== -1) {
      invoiceItems[index] = { 
        ...invoiceItems[index], 
        ...updates,
        total: (updates.quantity || invoiceItems[index].quantity) * 
               (updates.price || invoiceItems[index].price)
      };
      
      return HttpResponse.json({
        success: true,
        data: invoiceItems[index],
        message: 'Item updated successfully'
      });
    }
    
    return HttpResponse.json(
      { success: false, error: 'Item not found' },
      { status: 404 }
    );
  }),

  // Delete invoice item
  http.delete(`${baseURL}/invoices/:id/items/:itemId`, async ({ params }) => {
    await delay(300);
    
    const { itemId } = params;
    const index = invoiceItems.findIndex((item: any) => item.id === itemId);
    
    if (index !== -1) {
      invoiceItems.splice(index, 1);
      return HttpResponse.json({
        success: true,
        message: 'Item deleted successfully'
      });
    }
    
    return HttpResponse.json(
      { success: false, error: 'Item not found' },
      { status: 404 }
    );
  }),

  // Get all recent invoices activities
  http.get(`${baseURL}/recent-activities`, async () => {
    await delay(300);
    
    return HttpResponse.json({
      success: true,
      data: recentInvoiceActivities
    });
  }),

  // Get all recent invoices
  http.get(`${baseURL}/recent-invoices`, async () => {
    await delay(300);
    
    return HttpResponse.json({
      success: true,
      data: recentInvoices
    });
  }),

  // Get invoice activities
  http.get(`${baseURL}/invoices/:id/activities`, async () => {
    await delay(300);
    
    return HttpResponse.json({
      success: true,
      data: invoiceActivities
    });
  }),

  // Create activity
  http.post(`${baseURL}/activities`, async ({ request }) => {
    await delay(200);
    
    const body = await request.json() as any;
    const newActivity = {
      ...body,
      timestamp: 'Just now'
    };
    
    recentInvoiceActivities.unshift(newActivity);
    
    return HttpResponse.json({
      success: true,
      data: newActivity
    }, { status: 201 });
  }),

  // Get overview stats
  http.get(`${baseURL}/overview/stats`, async () => {
    await delay(400);
    
    return HttpResponse.json({
      success: true,
      data: overviewStats
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
    
    const body = await request.json() as any;
    reminders = body;
    
    return HttpResponse.json({
      success: true,
      data: reminders,
      message: 'Reminders updated successfully'
    });
  }),

  // Search invoices
  http.get(`${baseURL}/invoices/search`, async ({ request }) => {
    await delay(400);
    
    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.toLowerCase() || '';
    
    const results = invoices.map(group => ({
      ...group,
      invoices: group.invoices.filter(inv => 
        (inv.invoiceId?.toLowerCase().includes(query) || inv.id?.toLowerCase().includes(query)) ||
        inv.customer?.toLowerCase().includes(query) ||
        inv.status?.toLowerCase().includes(query)
      )
    })).filter(group => group.invoices.length > 0);
    
    return HttpResponse.json({
      success: true,
      data: results,
      total: results.reduce((acc, group) => acc + group.invoices.length, 0)
    });
  }),
];