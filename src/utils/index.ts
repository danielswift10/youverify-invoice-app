import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

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

