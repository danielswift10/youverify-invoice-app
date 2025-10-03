interface AllInvoicesTableSkeletonProps {
  groupCount?: number;
  rowsPerGroup?: number;
}

export const AllInvoicesTableSkeleton = ({
  groupCount = 2,
  rowsPerGroup = 5,
}: AllInvoicesTableSkeletonProps) => {
  return (
    <>
      <div className="flex flex-col gap-4 md:hidden">
        {Array.from({ length: groupCount }).map((_, groupIndex) => (
          <div key={groupIndex} className="space-y-3">
            <div className="py-2 bg-grey-25 px-4 rounded-[1rem]">
              <div className="h-[1.6rem] w-[10rem] bg-grey-200 rounded animate-pulse" />
            </div>

            {Array.from({ length: rowsPerGroup }).map((__, rowIndex) => (
              <div
                key={rowIndex}
                className="w-full bg-white border border-grey-100 rounded-[1.6rem] p-3 flex flex-col gap-2 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-[3.6rem] h-[3.6rem] rounded-md bg-grey-200 animate-pulse flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="h-[1.4rem] w-[12rem] bg-grey-200 rounded animate-pulse mb-2" />
                      <div className="h-[1.1rem] w-[9rem] bg-grey-200 rounded animate-pulse" />
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="h-[2.2rem] w-[6.5rem] bg-grey-200 rounded-[2rem] animate-pulse" />
                    <div className="h-[1.4rem] w-[6rem] bg-grey-200 rounded animate-pulse" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[1.2rem] text-grey-400 mt-2">
                  <div>
                    <div className="h-[1rem] w-[8rem] bg-grey-200 rounded animate-pulse mb-2" />
                    <div className="h-[1rem] w-[6rem] bg-grey-200 rounded animate-pulse" />
                  </div>
                  <div className="h-[1rem] w-[6rem] bg-grey-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-[1.2rem] text-grey-500 tracking-wider font-medium text-left">
                INVOICE ID
              </th>
              <th className="text-[1.2rem] text-grey-500 tracking-wider font-medium text-left">
                DATE CREATED
              </th>
              <th className="text-[1.2rem] text-grey-500 tracking-wider font-medium text-left">
                CUSTOMER
              </th>
              <th className="text-[1.2rem] text-grey-500 tracking-wider font-medium text-left">
                STATUS
              </th>
              <th className="text-[1.2rem] text-grey-500 tracking-wider font-medium text-left">
                AMOUNT
              </th>
            </tr>
          </thead>

          {Array.from({ length: groupCount }).map((_, groupIndex) => (
            <tbody key={groupIndex}>
              <tr>
                <td colSpan={10} className="py-[2.4rem] bg-grey-25">
                  <div className="h-[1.6rem] w-[15rem] bg-grey-200 rounded animate-pulse" />
                </td>
              </tr>

              {Array.from({ length: rowsPerGroup }).map((__, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-grey-50">
                  <td className="pl-[1.6rem] py-[2rem] rounded-l-[2.4rem]">
                    <div className="flex items-center gap-[1.6rem]">
                      <div className="w-[4.8rem] h-[4.8rem] bg-grey-200 rounded animate-pulse" />
                      <div className="h-[1.8rem] w-[12rem] bg-grey-200 rounded animate-pulse" />
                    </div>
                  </td>

                  <td className="py-[2rem] align-top">
                    <div className="space-y-[.4rem]">
                      <div className="h-[1.8rem] w-[10rem] bg-grey-200 rounded animate-pulse" />
                      <div className="h-[1.6rem] w-[8rem] bg-grey-200 rounded animate-pulse" />
                    </div>
                  </td>

                  <td className="py-[2rem] align-top">
                    <div className="h-[1.8rem] w-[14rem] bg-grey-200 rounded animate-pulse" />
                  </td>

                  <td className="py-[2rem] align-top">
                    <div className="h-[3rem] w-[8rem] bg-grey-200 rounded-[2.4rem] animate-pulse" />
                  </td>

                  <td className="py-[2rem] pr-[1.6rem] rounded-r-[2.4rem] align-top">
                    <div className="h-[1.8rem] w-[10rem] bg-grey-200 rounded animate-pulse mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
};
