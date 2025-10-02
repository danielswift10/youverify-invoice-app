import { $modalType } from "../../../store";
import { useStore } from "@nanostores/react";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceOverview from "./InvoiceOverview";
import InvoiceActions from "./InvoiceActions";
import RecentInvoiceAndActivities from "./RecentInvoiceAndActivities";
import RecentInvoiceModal from "./InvoiceModal";

export default function InvoiceInterface() {
  const modalType = useStore($modalType);
  return (
    <>
      <InvoiceHeader />
      <InvoiceOverview />
      <InvoiceActions />
      <RecentInvoiceAndActivities />
      <RecentInvoiceModal isOpen={modalType === "RECENT_INVOICE_MODAL"} />
    </>
  );
}
