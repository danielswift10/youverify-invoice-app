import InvoiceHeader from "./InvoiceHeader";
import InvoiceOverview from "./InvoiceOverview";
import InvoiceActions from "./InvoiceActions";
import RecentInvoiceAndActivities from "./RecentInvoiceAndActivities";
import CreateInvoiceModal from "../all-invoices/CreateInvoiceModal";
import { useStore } from "@nanostores/react";
import { $modalType } from "../../../../store";

export default function InvoiceInterface() {
  const modalType = useStore($modalType);
  return (
    <>
      <InvoiceHeader />
      <InvoiceOverview />
      <InvoiceActions />
      <RecentInvoiceAndActivities />
      <CreateInvoiceModal isOpen={modalType === "CREATE_INVOICE_MODAL"} />
    </>
  );
}
