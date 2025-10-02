import Button from "../../../components/Button";
import { invoiceActivitiesData } from "../../../utils/data";
import InvoiceActivity from "./InvoiceActivity";

export default function RecentActivities() {
  return (
    <div className="bg-white rounded-[4rem] p-[3.2rem] space-y-[2.4rem]">
      <div className="grid grid-cols-[1fr_15.2rem] justify-between items-center ">
        <h2 className="text-[2rem] font-semibold text-black">
          Recent Activities
        </h2>
        <Button variation="secondary" className="py-[2.2rem] px-0">
          VIEW ALL
        </Button>
      </div>
      <InvoiceActivity data={invoiceActivitiesData} />
    </div>
  );
}
