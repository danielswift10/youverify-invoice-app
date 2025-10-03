/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import type {
  FullInvoice,
  IInvoiceOverviewCard,
  InvoiceActivities,
  InvoiceGroup,
  InvoiceReminderSettings,
} from "../pages/dashboard/invoice/types";

const API_BASE = "/api";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
}

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

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
};

// Recent Invoice Activities API
export const recentInvoiceActivitiesApi = {
  getAll: async () => {
    const { data } = await axiosInstance.get<ApiResponse<InvoiceActivities[]>>(
      "/recent-activities"
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
};

export { axiosInstance };

export const api = {
  invoices: invoiceApi,
  recentInvoices: recentInvoicesApi,
  recentInvoiceActivities: recentInvoiceActivitiesApi,
  overview: overviewApi,
  reminders: remindersApi,
};
