import Button from "../../../components/Button";
import { invoiceGroups } from "../../../utils/data";
import { cn, formatAmount } from "../../../utils";
import type { Invoices } from "../types";

const statusPill: Record<Invoices["status"], string> = {
  PAID: "bg-success-50 border-success-200 text-success-300",
  OVERDUE: "bg-danger-50 border-danger-200 text-danger-100",
  DRAFT: "bg-grey-50 border-grey-800 text-grey-600",
  UNPAID: "bg-success-50 border-success-200 text-success-300",
  "PENDING PAYMENT": "bg-warning-50 border-warning-300 text-warning-200",
};

export default function RecentInvoices() {
  return (
    <div className="bg-white rounded-[4rem] p-[3.2rem] space-y-[2.4rem]">
      <div className="grid grid-cols-[1fr_32.2rem] justify-between items-center ">
        <h2 className="text-[2rem] font-semibold text-black">
          Recent Invoices
        </h2>
        <Button
          variation="secondary"
          className="py-[2.2rem]"
          href="all-invoices"
        >
          VIEW ALL INVOICES
        </Button>
      </div>
      {invoiceGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-[.8rem]">
          <h3 className="text-[1.2rem] leading-[1.6rem] text-black font-semibold tracking-wide">
            {group.date}
          </h3>
          {group.invoices.map((invoice, invoiceIndex) => (
            <div
              key={invoiceIndex}
              className="py-[1.6rem] px-[2.4rem] flex items-center justify-between"
            >
              <div>
                <div className="text-grey-600 font-semibold text-[1.4rem]">
                  Invoice - <br />
                  {invoice.id}
                </div>
              </div>

              <div className="px-[1.6rem] space-y-[.4rem]">
                <div className="uppercase text-[1rem] text-grey-400 leading-8">
                  Due Date
                </div>
                <div className="text-grey-500 font-semibold text-[1.4rem]">
                  {invoice.dueDate}
                </div>
              </div>

              <div className="text-right space-y-[1.2rem]">
                <div className="font-semibold text-grey-600">
                  ${formatAmount(invoice.amount)}
                </div>
                <span
                  className={cn(
                    "inline-block py-[.75rem] px-[2.4rem] border rounded-[2.4rem] text-[1rem] font-semibold",
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
