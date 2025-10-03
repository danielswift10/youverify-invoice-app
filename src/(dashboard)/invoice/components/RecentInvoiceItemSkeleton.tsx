interface RecentInvoiceItemSkeletonProps {
  groupCount?: number;
  invoicesPerGroup?: number;
}

export const RecentInvoiceItemSkeleton = ({
  groupCount = 2,
  invoicesPerGroup = 3,
}: RecentInvoiceItemSkeletonProps) => {
  return (
    <div>
      {Array.from({ length: groupCount }).map((_, groupIndex) => (
        <div key={groupIndex} className="space-y-[.8rem]">
          <div className="h-[1.6rem] w-[12rem] bg-grey-200 rounded animate-pulse" />

          {Array.from({ length: invoicesPerGroup }).map((_, invoiceIndex) => (
            <div
              key={invoiceIndex}
              className="py-[1.6rem] px-[2.4rem] flex items-center justify-between"
            >
              <div className="space-y-[.4rem]">
                <div className="h-[1.8rem] w-[8rem] bg-grey-200 rounded animate-pulse" />
                <div className="h-[1.8rem] w-[10rem] bg-grey-200 rounded animate-pulse" />
              </div>

              <div className="px-[1.6rem] space-y-[.4rem]">
                <div className="h-[1.2rem] w-[6rem] bg-grey-200 rounded animate-pulse" />
                <div className="h-[1.8rem] w-[8rem] bg-grey-200 rounded animate-pulse" />
              </div>

              <div className="text-right space-y-[1.2rem]">
                <div className="h-[2rem] w-[10rem] bg-grey-200 rounded animate-pulse ml-auto" />
                <div className="h-[3rem] w-[8rem] bg-grey-200 rounded-[2.4rem] animate-pulse ml-auto" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
