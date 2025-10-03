import { cn, formatAmount, statusPill } from "../../../../utils";
import type { InvoiceGroup } from "../types";
import { RecentInvoiceItemSkeleton } from "./RecentInvoiceItemSkeleton";

interface RecentInvoiceItemProps {
  data: InvoiceGroup[];
  loading: boolean;
}
export default function RecentInvoiceItem({
  data,
  loading,
}: RecentInvoiceItemProps) {
  if (loading) {
    return <RecentInvoiceItemSkeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-[4rem] text-grey-500">
        No recent invoices
      </div>
    );
  }
  return (
    <div>
      {data?.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-[.8rem]">
          <h3 className="text-[1.2rem] leading-[1.6rem] text-black font-semibold tracking-wide">
            {group.date}
          </h3>
          {group.invoices.map((invoice, invoiceIndex) => (
            <div
              key={invoiceIndex}
              className="py-[1.6rem] xl:px-[2.4rem] flex items-center justify-between"
            >
              <div>
                <div className="text-grey-600 font-semibold text-[1.2rem] md:text-[1.4rem]">
                  Invoice - <br />
                  {invoice.id}
                </div>
              </div>

              <div className="px-[1.6rem] space-y-[.4rem]">
                <div className="uppercase text-[1rem] text-grey-400 leading-8">
                  Due Date
                </div>
                <div className="text-grey-500 font-semibold text-[1.2rem] md:text-[1.4rem]">
                  {invoice.dueDate}
                </div>
              </div>

              <div className="text-right space-y-[1.2rem]">
                <div className="font-semibold text-[1.2rem] md:text-[1.6rem] text-grey-600">
                  ${formatAmount(invoice.amount)}
                </div>
                <span
                  className={cn(
                    "inline-block py-[.5rem] md:py-[.75rem] px-[1.2rem] w-max text-center lg:px-[2.4rem] border rounded-[2.4rem] text-[1rem] font-semibold",
                    statusPill[invoice.status]
                  )}
                >
                  {invoice.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
