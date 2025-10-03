import Button from "../../../../components/Button";
import { useGetRecentInvoices } from "../store";
import type { InvoiceGroup } from "../types";
import RecentInvoiceItem from "./RecentInvoiceItem";

export default function RecentInvoices() {
  const { recentInvoicesData, recentInvoicesDataLoading } =
    useGetRecentInvoices();
  return (
    <div className="bg-white rounded-[2rem] lg:rounded-[4rem] p-[2rem] xl:p-[3.2rem] space-y-[2.4rem]">
      <div className="flex  lg:grid-cols-[1fr_32.2rem] justify-between items-center ">
        <h2 className="lg:text-[2rem] font-semibold text-black">
          Recent Invoices
        </h2>
        <Button
          variation="secondary"
          className="py-[1.2rem] xl:py-[2.2rem] px-[1.6rem] md:px-[1.6rem] md:py-[1.2rem] lg:py-[1.2rem] xl:px-[5rem] w-max text-[1.2rem]"
          href="all-invoices"
        >
          VIEW ALL INVOICES
        </Button>
      </div>
      <RecentInvoiceItem
        data={recentInvoicesData as InvoiceGroup[]}
        loading={recentInvoicesDataLoading}
      />
    </div>
  );
}
