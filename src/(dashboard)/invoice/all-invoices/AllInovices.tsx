import AllInvoicesHeader from "./components/AllInvoicesHeader";
import AllInvoicesTable from "./components/AllInvoicesTable";

export default function AllInovices() {
  return (
    <div className="space-y-16">
      <AllInvoicesHeader />
      <AllInvoicesTable />
    </div>
  );
}
