import CategoryIcon from "../../../../assets/icons/CategoryIcon";
import { cn, formatAmount, formatCurrency } from "../../../../utils";
import type { IInvoiceOverviewCard } from "../types";

const badgeColor: Record<IInvoiceOverviewCard["status"], string> = {
  PAID: "bg-success-100 text-grey-600",
  OVERDUE: "bg-pink-200",
  DRAFT: "bg-grey-200",
  UNPAID: "bg-warning-100",
  "PENDING PAYMENT": "bg-warning-50",
  "PARTIAL PAYMENT": "bg-primary-50",
};

export const InvoiceOverviewCard = ({
  title,
  amount,
  count,
  status,
}: IInvoiceOverviewCard) => {
  return (
    <article className="bg-white rounded-[2.4rem]  flex flex-col md:items-center justify-center py-[2rem] xl:py-[3.2rem] px-8 xl:px-16 space-y-[1.6rem]">
      <div className="">
        <CategoryIcon />
        <div className="space-y-[.8rem]">
          <div className="flex items-center gap-[.8rem]">
            <h3 className="text-grey-500 text-[1.2rem] font-semibold xl:leading-8 uppercase">
              {title}
            </h3>
            <span
              className={cn(
                "text-grey-600 font-semibold h-[4.1rem] text-[1.4rem] xl:text-[1.6rem] flex items-center justify-center px-[1.6rem] rounded-[2.4rem]",
                badgeColor[status]
              )}
            >
              {String(formatAmount(count).padStart(2, "0"))}
            </span>
          </div>
          <div className="text-[2.2rem] md:text-[2.4rem] xl:text-[2.8rem] text-black font-semibold">
            ${formatCurrency(amount).int}.
            <span className="text-[1.4rem] text-grey-500">
              {formatCurrency(amount).cents}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
