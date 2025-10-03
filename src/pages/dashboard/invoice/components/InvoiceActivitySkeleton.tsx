interface InvoiceActivitySkeletonProps {
  count?: number;
  showVerticalLine?: boolean;
}

export const InvoiceActivitySkeleton = ({
  count = 3,
  showVerticalLine = false,
}: InvoiceActivitySkeletonProps) => {
  return (
    <div className="space-y-[2.4rem]">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex gap-[1.6rem] relative">
          {showVerticalLine && index !== count - 1 && (
            <div
              className="absolute left-[2.4rem] top-[4.8rem] w-[0.1rem] bg-grey-100 z-0"
              style={{ height: "calc(100% + 2.4rem)" }}
            />
          )}

          <div className="w-[4.8rem] h-[4.8rem] shrink-0 rounded-full bg-grey-200 animate-pulse" />

          <div className="space-y-[.4rem] w-full">
            <div className="h-[2.4rem] w-[16rem] bg-grey-200 rounded animate-pulse" />

            <div className="h-[1.8rem] w-[12rem] bg-grey-200 rounded animate-pulse" />

            <div className="bg-grey-50 rounded-[1.6rem] p-[1.6rem] space-y-[.8rem]">
              <div className="h-[1.6rem] w-full bg-grey-200 rounded animate-pulse" />
              <div className="h-[1.6rem] w-[70%] bg-grey-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
