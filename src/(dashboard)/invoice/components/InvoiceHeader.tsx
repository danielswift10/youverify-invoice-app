import Button from "../../../components/Button";

export default function InvoiceHeader() {
  return (
    <div className="flex items-center justify-between mt-52">
      <h2 className="text-[3.2rem] font-medium">Invoice</h2>
      <div className="grid grid-cols-2 gap-[3.2rem]">
        <Button variation="tertiary" className="uppercase">
          See what's new
        </Button>
        <Button className="uppercase">Create</Button>
      </div>
    </div>
  );
}
