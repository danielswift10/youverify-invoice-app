import invoice_snapshot from "../../../../assets/images/invoice.png";
import { cn, formatAmount, statusPill } from "../../../../utils";
import { $modalType, setModalType } from "../../../../store";
import Search from "../../../../components/Search";
import CalendarIcon from "../../../../assets/icons/CalendarIcon";
import ChevronDownIcon from "../../../../assets/icons/ChevronDownIcon";
import { useGetInvoices } from "../../store";
import { AllInvoicesTableSkeleton } from "./AllInvoicesTableSkeleton";
import InvoiceModal from "./InvoiceModal";
import { useStore } from "@nanostores/react";
import { useState } from "react";

export default function AllInvoicesTable() {
  const modalType = useStore($modalType);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null
  );
  const { invoicesData, invoicesDataLoading } = useGetInvoices();
  const handleViewInvoice = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
    setModalType("INVOICE_MODAL");
  };

  return (
    <div className="bg-white rounded-[2rem] p-[1.4rem] md:p-[2.4rem] space-y-[1.6rem]">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_.6fr_.4fr] items-center w-full xl:w-[60%]">
        <Search placeholder="Search Invoice with name or Transaction ID" />
        <button className="h-full flex items-center justify-between px-[1.6rem] py-[1rem] border border-grey-200 rounded-[3.2rem] text-[1.2rem] text-grey-600 hover:bg-grey-50 transition-colors">
          SORT BY DATE
          <span className="shrink-0">
            <CalendarIcon />
          </span>
        </button>
        <button className="h-full flex items-center justify-between px-[1.6rem] py-[1rem] border border-grey-200 rounded-[3.2rem] text-[1.2rem] text-grey-600 hover:bg-grey-50 transition-colors">
          <span>STATUS</span>
          <ChevronDownIcon size="large" />
        </button>
      </div>

      {invoicesDataLoading ? (
        <AllInvoicesTableSkeleton />
      ) : !invoicesData || invoicesData.length === 0 ? (
        <div className="text-center py-[6rem] text-grey-500">
          <p className="text-[1.6rem]">No invoices found</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 md:hidden">
            {invoicesData.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                <div className="py-2 bg-grey-25 px-4 rounded-[1rem]">
                  <h3 className="text-[1.2rem] font-semibold text-black uppercase tracking-wide">
                    {group.date}
                  </h3>
                </div>

                {group.invoices.map((invoice, invoiceIndex) => (
                  <button
                    key={invoiceIndex}
                    onClick={() => handleViewInvoice(invoice.invoiceId!)}
                    className="w-full text-left bg-white border border-grey-100 rounded-[1.6rem] p-3 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={invoice_snapshot}
                          alt="invoice_snapshot"
                          className="w-[3.6rem] h-[3.6rem] rounded-md object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-[1.4rem] font-semibold text-grey-600 truncate">
                            {invoice.invoiceId}
                          </div>
                          <div className="text-[1.2rem] text-grey-400 truncate">
                            {invoice.customer}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={cn(
                            "inline-block py-[.4rem] px-[1rem] text-center border rounded-[2rem] text-[1rem] font-semibold uppercase",
                            statusPill[invoice.status]
                          )}
                        >
                          {invoice.status}
                        </span>
                        <div className="text-[1.4rem] font-semibold text-grey-600">
                          ${formatAmount(invoice.amount)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[1.2rem] text-grey-400 mt-2">
                      <div>
                        <div>{invoice.dateCreated}</div>
                        <div className="mt-1">{invoice.time}</div>
                      </div>
                      <div className="text-right text-[1.2rem] text-grey-400">
                        View invoice
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="table-auto w-full min-w-[60rem]">
              <thead>
                <tr>
                  <th className="text-[1.2rem] text-grey-500 tracking-wider font-medium text-left py-4">
                    INVOICE ID
                  </th>
                  <th className="text-[1.2rem] text-grey-500 tracking-wider font-medium text-left py-4">
                    DATE CREATED
                  </th>
                  <th className="text-[1.2rem] text-grey-500 tracking-wider font-medium text-left py-4">
                    CUSTOMER
                  </th>
                  <th className="text-[1.2rem] text-grey-500 tracking-wider font-medium text-left py-4">
                    STATUS
                  </th>
                  <th className="text-[1.2rem] text-grey-500 tracking-wider font-medium text-center py-4">
                    AMOUNT
                  </th>
                </tr>
              </thead>
              {invoicesData?.map((group, groupIndex) => (
                <tbody key={groupIndex}>
                  <tr>
                    <td colSpan={10} className="py-[1.6rem] bg-grey-25 px-4">
                      <h3 className="text-[1.2rem] font-semibold text-black uppercase tracking-wide">
                        {group.date}
                      </h3>
                    </td>
                  </tr>

                  {group.invoices.map((invoice, invoiceIndex) => (
                    <tr
                      key={invoiceIndex}
                      className="hover:bg-grey-50 cursor-pointer transition-colors"
                      onClick={() => handleViewInvoice(invoice.invoiceId!)}
                    >
                      <td className="pl-[1.6rem] py-[1.6rem] rounded-l-[2.4rem] align-top">
                        <div className="flex items-center gap-[1.6rem]">
                          <figure className="overflow-hidden w-[4.2rem] h-[4.2rem] rounded-md flex-shrink-0">
                            <img
                              src={invoice_snapshot}
                              alt="invoice_snapshot"
                              className="w-full h-full object-cover"
                            />
                          </figure>
                          <span className="text-[1.4rem] font-semibold text-grey-600 truncate">
                            {invoice.invoiceId}
                          </span>
                        </div>
                      </td>

                      <td className="py-[1.6rem] align-top">
                        <div className="text-[1.4rem] font-semibold text-grey-600">
                          {invoice.dateCreated}
                        </div>
                        <div className="text-[1.4rem] text-grey-400 mt-[.4rem]">
                          {invoice.time}
                        </div>
                      </td>

                      <td className="py-[1.6rem] text-[1.4rem] text-grey-600 align-top">
                        {invoice.customer}
                      </td>

                      <td className="py-[1.6rem] align-top">
                        <span
                          className={cn(
                            "inline-block py-[.75rem] px-[2rem] border text-center rounded-[2.4rem] text-[1rem] font-semibold uppercase",
                            statusPill[invoice.status]
                          )}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-[1.6rem] text-[1.4rem] pr-[1.6rem] rounded-r-[2.4rem] font-semibold text-grey-600 text-center align-top">
                        ${formatAmount(invoice.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </>
      )}
      <InvoiceModal
        invoiceId={selectedInvoiceId!}
        isOpen={modalType === "INVOICE_MODAL"}
      />
    </div>
  );
}
