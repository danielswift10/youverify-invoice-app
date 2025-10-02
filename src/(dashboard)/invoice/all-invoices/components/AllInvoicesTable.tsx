import { allInvoicesData } from "../../../../utils/data";
import invoice_snapshot from "../../../../assets/images/invoice.png";
import { cn, formatAmount } from "../../../../utils";
import type { Invoices } from "../../types";
import { setModalType } from "../../../../store";
import Search from "../../../../components/Search";
import CalendarIcon from "../../../../assets/icons/CalendarIcon";
import ChevronDownIcon from "../../../../assets/icons/ChevronDownIcon";

const statusPill: Record<Invoices["status"], string> = {
  PAID: "bg-success-50 border-success-200 text-success-300",
  OVERDUE: "bg-danger-50 border-danger-200 text-danger-100",
  DRAFT: "bg-grey-50 border-grey-800 text-grey-600",
  UNPAID: "bg-success-50 border-success-200 text-success-300",
  "PENDING PAYMENT": "bg-warning-50 border-warning-300 text-warning-200",
};

export default function AllInvoicesTable() {
  return (
    <div className="bg-white rounded-[4rem] p-[3.2rem] space-y-[2.4rem]">
      <div className="grid grid-cols-[1fr_.6fr_.4fr] items-center gap-[1.6rem] w-[60%]">
        <Search placeholder="Search Invoice with name or Transaction ID" />
        <button className="flex items-center justify-between px-[2rem] py-[1.6rem] border border-grey-200 rounded-[3.2rem] text-[1.2rem] text-grey-600 hover:bg-grey-50 transition-colors">
          <span>SORT BY DATE</span>
          <CalendarIcon />
        </button>
        <button className="flex items-center justify-between px-[2rem] py-[1.6rem] border border-grey-200 rounded-[3.2rem] text-[1.2rem] text-grey-600 hover:bg-grey-50 transition-colors">
          <span>STATUS</span>
          <ChevronDownIcon size="large" />
        </button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-[1.2rem] text-grey-500 font-medium text-left">
              INVOICE ID
            </th>
            <th className="text-[1.2rem] text-grey-500 font-medium text-left">
              DATE CREATED
            </th>
            <th className="text-[1.2rem] text-grey-500 font-medium text-left">
              CUSTOMER
            </th>
            <th className="text-[1.2rem] text-grey-500 font-medium text-left">
              STATUS
            </th>
            <th className="text-[1.2rem] text-grey-500 font-medium text-left">
              AMOUNT
            </th>
          </tr>
        </thead>
        <tbody>
          {allInvoicesData.map((group, groupIndex) => (
            <tbody key={groupIndex} className="">
              <tr>
                <td colSpan={10} className="px-[3.2rem] py-[2.4rem] bg-grey-25">
                  <h3 className="text-[1.2rem] font-semibold text-black uppercase tracking-wide">
                    {group.date}
                  </h3>
                </td>
              </tr>

              {group.invoices.map((invoice, invoiceIndex) => (
                <tr
                  key={invoiceIndex}
                  className="hover:bg-grey-50 transition-colors"
                  onClick={() => setModalType("INVOICE_MODAL")}
                >
                  <td className="px-[3.2rem] py-[2.4rem]">
                    <div className="flex items-center gap-[1.6rem]">
                      <figure className="overflow-hidden">
                        <img
                          src={invoice_snapshot}
                          alt="invoice_snapshot"
                          className="size-full object-cover"
                        />
                      </figure>
                      <span className="text-[1.4rem] font-semibold text-grey-600">
                        {invoice.invoiceId}
                      </span>
                    </div>
                  </td>

                  <td className="px-[3.2rem] py-[2.4rem] align-top">
                    <div className="text-[1.4rem] font-semibold text-grey-600">
                      {invoice.dateCreated}
                    </div>
                    <div className="text-[1.2rem] text-grey-400 mt-[.4rem]">
                      {invoice.time}
                    </div>
                  </td>

                  <td className="px-[3.2rem] py-[2.4rem] text-[1.4rem] text-grey-600 align-top">
                    {invoice.customer}
                  </td>

                  <td className="px-[3.2rem] py-[2.4rem] text-right align-top">
                    <span
                      className={cn(
                        "inline-block py-[.75rem] px-[2rem] border rounded-[2.4rem] text-[1rem] font-semibold uppercase",
                        statusPill[invoice.status]
                      )}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-[3.2rem] py-[2.4rem] text-[1.4rem] font-semibold text-grey-600 text-right align-top">
                    ${formatAmount(invoice.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </tbody>
      </table>
    </div>
  );
}
