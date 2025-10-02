import { useStore } from "@nanostores/react";
import InvoiceModal from "../components/InvoiceModal";
import AllInvoicesHeader from "./components/AllInvoicesHeader";
import AllInvoicesTable from "./components/AllInvoicesTable";
import { $modalType } from "../../../store";

export default function AllInovices() {
  const modalType = useStore($modalType);
  return (
    <div className="mt-52 space-y-16">
      <AllInvoicesHeader />
      <AllInvoicesTable />
      <InvoiceModal isOpen={modalType === "INVOICE_MODAL"} />
    </div>
  );
}
