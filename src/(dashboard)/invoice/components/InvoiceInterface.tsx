import InvoiceHeader from "./InvoiceHeader";
import InvoiceOverview from "./InvoiceOverview";
import InvoiceActions from "./InvoiceActions";
import RecentInvoiceAndActivities from "./RecentInvoiceAndActivities";

export default function InvoiceInterface() {
  return (
    <>
      <InvoiceHeader />
      <InvoiceOverview />
      <InvoiceActions />
      <RecentInvoiceAndActivities />
    </>
  );
}
