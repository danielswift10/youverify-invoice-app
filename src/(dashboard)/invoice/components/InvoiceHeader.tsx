import Button from "../../../components/Button";

export default function InvoiceHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-0">
      <h2 className="text-[2.5rem] md:text-[3.2rem] font-medium">Invoice</h2>
      <div className="grid grid-cols-[.6fr_.4fr] md:grid-cols-2 gap-[1.6rem] md:gap-[3.2rem]">
        <Button variation="tertiary" className="uppercase text-[1.4rem]">
          See what's new
        </Button>
        <Button className="uppercase text-[1.4rem]">Create</Button>
      </div>
    </div>
  );
}
