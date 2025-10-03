import Button from "../../../components/Button";
import { useGetRecentInvoiceActivities } from "../store";
import type { InvoiceActivities } from "../types";
import InvoiceActivity from "./InvoiceActivity";

export default function RecentActivities() {
  const { recentInvoiceActivitiesData, recentInvoiceActivitiesDataLoading } =
    useGetRecentInvoiceActivities();
    
  return (
    <div className="bg-white rounded-[2rem] lg:rounded-[4rem] p-[2rem] xl:p-[3.2rem] space-y-[2.4rem]">
      <div className="flex lg:grid-cols-[1fr_32.2rem] justify-between items-center ">
      <h2 className="lg:text-[2rem] font-semibold text-black">
          Recent Activities
        </h2>
        <Button
          variation="secondary"
          className="py-[1.2rem] xl:py-[2.2rem] px-[1.6rem] md:px-[1.6rem] md:py-[1.2rem] lg:px-[2rem] xl:px-[2.4rem] w-max text-[1.2rem]"
          disabled={recentInvoiceActivitiesDataLoading}
        >
          VIEW ALL
        </Button>
      </div>

      <InvoiceActivity
        data={recentInvoiceActivitiesData as InvoiceActivities[]}
        loading={recentInvoiceActivitiesDataLoading}
      />
    </div>
  );
}
