import { invoiceOverviewStatsData } from "../../../utils/data";
import { InvoiceOverviewCard } from "./InvoiceOverviewCard";

export default function InvoiceOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[3.2rem]">
      {invoiceOverviewStatsData.map((invoiceOverview, index) => (
        <InvoiceOverviewCard key={index} {...invoiceOverview} />
      ))}
    </div>
  );
}
