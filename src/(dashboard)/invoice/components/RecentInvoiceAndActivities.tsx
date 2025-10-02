import RecentActivities from "./RecentActivities";
import RecentInvoices from "./RecentInvoices";

export default function RecentInvoiceAndActivities() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_43.1rem] gap-[3.2rem]">
      <RecentInvoices />
      <RecentActivities />
    </div>
  );
}
