import RecentActivities from "./RecentActivities";
import RecentInvoices from "./RecentInvoices";

export default function RecentInvoiceAndActivities() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_.9fr] xl:grid-cols-[2fr_43.1rem] gap-[1.6rem] xl:gap-[3.2rem]">
      <RecentInvoices />
      <RecentActivities />
    </div>
  );
}
