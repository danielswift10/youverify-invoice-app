import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/api";
import type { FullInvoice, InvoiceActivities, InvoiceGroup } from "../types";

const INVOICE_QUERY_KEY = "invoices";
export function useGetInvoices() {
  const { data: invoicesData, isLoading: invoicesDataLoading } = useQuery({
    queryKey: [INVOICE_QUERY_KEY],
    queryFn: async () => {
      const response = await api.invoices.getAll();

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch invoices");
      }

      return response.data;
    },
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { invoicesData, invoicesDataLoading };
}

export function useGetInvoice(invoiceId: string) {
  const { data: invoiceData, isLoading: invoiceDataLoading } = useQuery({
    queryKey: [INVOICE_QUERY_KEY, invoiceId],
    queryFn: async () => {
      const response = await api.invoices.getById(invoiceId);

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch invoices");
      }

      return response.data as FullInvoice;
    },
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { invoiceData, invoiceDataLoading };
}

export function useGetInvoiceOverviewStats() {
  const { data: invoiceOverviewStats, isLoading: invoiceOverviewStatsLoading } =
    useQuery({
      queryKey: [INVOICE_QUERY_KEY, "overview-stats"],
      queryFn: async () => {
        const response = await api.overview.getStats();

        if (!response.success || !response.data) {
          throw new Error(response.error || "Failed to fetch invoices");
        }

        return response.data;
      },
      enabled: true,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });

  return { invoiceOverviewStats, invoiceOverviewStatsLoading };
}

export function useGetRecentInvoiceActivities() {
  const {
    data: recentInvoiceActivitiesData,
    isLoading: recentInvoiceActivitiesDataLoading,
  } = useQuery({
    queryKey: [INVOICE_QUERY_KEY, "recent-invoice-activities"],
    queryFn: async () => {
      const response = await api.recentInvoiceActivities.getAll();

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch invoices");
      }

      return response.data as InvoiceActivities[];
    },
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { recentInvoiceActivitiesData, recentInvoiceActivitiesDataLoading };
}

export function useGetRecentInvoices() {
  const { data: recentInvoicesData, isLoading: recentInvoicesDataLoading } =
    useQuery({
      queryKey: [INVOICE_QUERY_KEY, "recent-invoice"],
      queryFn: async () => {
        const response = await api.recentInvoices.getAll();

        if (!response.success || !response.data) {
          throw new Error(response.error || "Failed to fetch invoices");
        }

        return response.data as InvoiceGroup[];
      },
      enabled: true,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });

  return { recentInvoicesData, recentInvoicesDataLoading };
}

export function useGetInvoiceReminders(invoiceId: string) {
  const { data: reminderSettingsData, isLoading: reminderSettingsDataLoading } =
    useQuery({
      queryKey: [INVOICE_QUERY_KEY, "invoice-reminders", invoiceId],
      queryFn: async () => {
        const response = await api.reminders.getByInvoice(invoiceId);

        if (!response.success || !response.data) {
          throw new Error(response.error || "Failed to fetch invoices");
        }

        return response.data;
      },
      enabled: true,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    });

  return { reminderSettingsData, reminderSettingsDataLoading };
}
