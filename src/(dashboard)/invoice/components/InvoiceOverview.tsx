import { useGetInvoiceOverviewStats } from "../store";
import { InvoiceOverviewCard } from "./InvoiceOverviewCard";
import { InvoiceOverviewCardSkeleton } from "./InvoiceOverviewCardSkeleton";

export default function InvoiceOverview() {
  const { invoiceOverviewStats, invoiceOverviewStatsLoading } =
    useGetInvoiceOverviewStats();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-[1.6rem] md:gap-[2rem] xl:gap-[3.2rem]">
      {invoiceOverviewStatsLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <InvoiceOverviewCardSkeleton key={index} />
          ))
        : invoiceOverviewStats?.map((invoiceOverview, index) => (
            <InvoiceOverviewCard key={index} {...invoiceOverview} />
          ))}
    </div>
  );
}
