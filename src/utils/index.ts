import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import type { Invoices } from "../(dashboard)/invoice/types";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export function formatCurrency(amount: number) {
  const fixed = amount.toFixed(2);
  const [intPart, cents] = fixed.split(".");
  const nf = new Intl.NumberFormat("en-US");
  return { int: nf.format(Number(intPart)), cents };
}

export function formatAmount(amount: number) {
  return new Intl.NumberFormat().format(amount);
}

export const statusPill: Record<Invoices["status"], string> = {
  PAID: "bg-success-50 border-success-200 text-success-300",
  OVERDUE: "bg-danger-50 border-danger-200 text-danger-100",
  DRAFT: "bg-grey-50 border-grey-800 text-grey-600",
  UNPAID: "bg-success-50 border-success-200 text-success-300",
  "PENDING PAYMENT": "bg-warning-50 border-warning-300 text-warning-200",
};

export const getStatusPillClasses = (status: Invoices["status"]): string => {
  return statusPill[status];
};
