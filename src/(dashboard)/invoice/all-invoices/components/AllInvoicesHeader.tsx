import Button from "../../../../components/Button";
import DocumentDownloadIcon from "../../../../assets/icons/DocumentDownloadIcon";
import ArrowLeftIcon from "../../../../assets/icons/ArrowLeftIcon";
import { useNavigate } from "react-router-dom";

export default function AllInvoicesHeader() {
  const navigate = useNavigate();
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-[1.6rem]">
        <button onClick={() => navigate("/invoice")} className="cursor-pointer">
          <ArrowLeftIcon />
        </button>
        <hgroup>
          <h1 className="font-bold text-[3.2rem] leading-">All Invoices</h1>
          <p className="text-grey-500">View all your invoices</p>
        </hgroup>
      </div>
      <Button
        variation="secondary"
        className="bg-transparent w-max border-primary-100 gap-[1.6rem] tracking-wider"
      >
        <DocumentDownloadIcon /> EXPORT AS PDF
      </Button>
    </div>
  );
}
