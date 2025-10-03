export const InvoiceOverviewCardSkeleton = () => {
  return (
    <article className="bg-white rounded-[2.4rem] py-[3.2rem] px-16 space-y-[1.6rem] animate-pulse">
      <div className="w-[2.4rem] h-[2.4rem] bg-grey-200 rounded" />

      <div className="space-y-[.8rem]">
        <div className="flex items-center gap-[.8rem]">
          <div className="h-[1.6rem] w-[12rem] bg-grey-200 rounded" />
          <div className="h-[4.1rem] w-[6rem] bg-grey-200 rounded-[2.4rem]" />
        </div>

        <div className="h-[3.2rem] w-[16rem] bg-grey-200 rounded" />
      </div>
    </article>
  );
};
