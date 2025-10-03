import avatar from "../../../assets/images/avatar.png";
import { formatAmount } from "../../../utils";
import type { InvoiceActivities } from "../types";
import { InvoiceActivitySkeleton } from "./InvoiceActivitySkeleton";

interface InvoiceActivityProp {
  data: InvoiceActivities[];
  loading?: boolean;
  showVerticalLine?: boolean;
}
export default function InvoiceActivity({
  data,
  loading,
  showVerticalLine = false,
}: InvoiceActivityProp) {
  if (loading) {
    return <InvoiceActivitySkeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-[4rem] text-grey-500">
        No recent activities
      </div>
    );
  }
  return (
    <div className="space-y-[2.4rem]">
      {data?.map((activity, index) => (
        <div key={index} className="flex gap-[1.6rem] relative">
          {showVerticalLine && index !== data.length - 1 && (
            <div
              className="absolute left-[2.4rem] top-[4.8rem] w-[0.1rem] bg-grey-100 z-0"
              style={{ height: "calc(100% + 2.4rem)" }}
            />
          )}
          <figure className="w-[4.8rem] h-[4.8rem] shrink-0 rounded-full overflow-hidden">
            <img src={avatar} alt="avatar" className="size-full object-cover" />
          </figure>
          <div className="space-y-[.4rem] w-full">
            <h3 className="md:text-[1.8rem] font-semibold text-[#000000]">
              {activity.title ?? activity.user ?? ""}
            </h3>
            <p className="text-[1.2rem] md:text-[1.4rem] text-grey-500">{activity.timestamp}</p>
            <div className="bg-grey-50 rounded-[1.6rem] p-[1.6rem]">
              {activity.type === "created" && (
                <p className="text-[1.4rem] text-grey-500">
                  Created invoice{" "}
                  <span className="font-semibold text-black">
                    {activity.invoiceNumber}/{activity.clientName}
                  </span>
                </p>
              )}

              {activity.type === "sent" && (
                <p className="text-[1.4rem] text-grey-500">
                  Sent invoice{" "}
                  <span className="font-semibold text-black">
                    {activity.invoiceNumber}/{activity.clientName} to{" "}
                    {activity.clientName}
                  </span>
                </p>
              )}

              {activity.type === "payment_partial" && (
                <p className="text-[1.4rem] text-grey-500">
                  You manually confirmed a partial payment of{" "}
                  <span className="font-semibold text-black">
                    ${formatAmount(activity.amount ?? 0)}
                  </span>
                </p>
              )}

              {activity.type === "payment_full" && (
                <p className="text-[1.4rem] text-grey-500">
                  You manually confirmed a full payment of{" "}
                  <span className="font-semibold text-black">
                    ${formatAmount(activity.amount ?? 0)}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
