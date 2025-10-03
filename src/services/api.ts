/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import type {
  FullInvoice,
  IInvoiceOverviewCard,
  InvoiceActivities,
  InvoiceGroup,
  InvoiceItem,
  InvoiceReminders,
  InvoiceReminderSettings,
} from "../(dashboard)/invoice/types";

const API_BASE = "/api";

// Generic API response type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
}

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<any>>) => {
    console.error("API Error:", error);

    const errorMessage =
      error.response?.data?.error || error.message || "Unknown error occurred";

    return Promise.resolve({
      data: {
        success: false,
        error: errorMessage,
      },
    });
  }
);

// Invoice API
export const invoiceApi = {
  getAll: async (filters?: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    const { data } = await axiosInstance.get<ApiResponse<InvoiceGroup[]>>(
      "/invoices",
      {
        params: filters,
      }
    );
    return data;
  },

  getById: async (id: string) => {
    const { data } = await axiosInstance.get<ApiResponse<FullInvoice>>(
      `/invoices/${id}`
    );
    return data;
  },

  create: async (invoice: any) => {
    const { data } = await axiosInstance.post<ApiResponse<any>>(
      "/invoices",
      invoice
    );
    return data;
  },

  update: async (id: string, updates: any) => {
    const { data } = await axiosInstance.put<ApiResponse<any>>(
      `/invoices/${id}`,
      updates
    );
    return data;
  },

  updateStatus: async (id: string, status: string) => {
    const { data } = await axiosInstance.patch<ApiResponse<any>>(
      `/invoices/${id}/status`,
      { status }
    );
    return data;
  },

  delete: async (id: string) => {
    const { data } = await axiosInstance.delete<ApiResponse<any>>(
      `/invoices/${id}`
    );
    return data;
  },

  search: async (query: string) => {
    const { data } = await axiosInstance.get<ApiResponse<InvoiceGroup[]>>(
      "/invoices/search",
      {
        params: { q: query },
      }
    );
    return data;
  },
};

// Invoice Items API
export const invoiceItemsApi = {
  getAll: async (invoiceId: string) => {
    const { data } = await axiosInstance.get<ApiResponse<InvoiceItem[]>>(
      `/invoices/${invoiceId}/items`
    );
    return data;
  },

  create: async (invoiceId: string, item: Partial<InvoiceItem>) => {
    const { data } = await axiosInstance.post<ApiResponse<InvoiceItem>>(
      `/invoices/${invoiceId}/items`,
      item
    );
    return data;
  },

  update: async (
    invoiceId: string,
    itemId: string,
    updates: Partial<InvoiceItem>
  ) => {
    const { data } = await axiosInstance.put<ApiResponse<InvoiceItem>>(
      `/invoices/${invoiceId}/items/${itemId}`,
      updates
    );
    return data;
  },

  delete: async (invoiceId: string, itemId: string) => {
    const { data } = await axiosInstance.delete<ApiResponse<any>>(
      `/invoices/${invoiceId}/items/${itemId}`
    );
    return data;
  },
};

// Activities API
export const recentInvoiceActivitiesApi = {
  getAll: async () => {
    const { data } = await axiosInstance.get<ApiResponse<InvoiceActivities[]>>(
      "/recent-activities"
    );
    return data;
  },

  getByInvoice: async (invoiceId: string) => {
    const { data } = await axiosInstance.get<ApiResponse<InvoiceActivities[]>>(
      `/invoices/${invoiceId}/activities`
    );
    return data;
  },

  create: async (activity: Partial<InvoiceActivities>) => {
    const { data } = await axiosInstance.post<ApiResponse<InvoiceActivities>>(
      "/activities",
      activity
    );
    return data;
  },
};

//Recent Invoices
export const recentInvoicesApi = {
  getAll: async () => {
    const { data } = await axiosInstance.get<ApiResponse<InvoiceGroup[]>>(
      "/recent-invoices"
    );
    return data;
  },
};

// Overview API
export const overviewApi = {
  getStats: async () => {
    const { data } = await axiosInstance.get<
      ApiResponse<IInvoiceOverviewCard[]>
    >("/overview/stats");
    return data;
  },
};

// Reminders API
export const remindersApi = {
  getByInvoice: async (id: string) => {
    const { data } = await axiosInstance.get<
      ApiResponse<InvoiceReminderSettings>
    >(`/invoices/${id}/reminders`);
    return data;
  },

  update: async (reminders: InvoiceReminders[]) => {
    const { data } = await axiosInstance.put<ApiResponse<InvoiceReminders[]>>(
      "/reminders",
      reminders
    );
    return data;
  },
};

// Export axios instance for direct use if needed
export { axiosInstance };

// Export all APIs
export const api = {
  invoices: invoiceApi,
  items: invoiceItemsApi,
  recentInvoices: recentInvoicesApi,
  recentInvoiceActivities: recentInvoiceActivitiesApi,
  overview: overviewApi,
  reminders: remindersApi,
};
