import Button from "../../../../components/Button";
import DocumentDownloadIcon from "../../../../assets/icons/DocumentDownloadIcon";
import ArrowLeftIcon from "../../../../assets/icons/ArrowLeftIcon";
import { useNavigate } from "react-router-dom";

export default function AllInvoicesHeader() {
  const navigate = useNavigate();
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-[.6rem] md:gap-[1.6rem]">
        <button onClick={() => navigate("/invoice")}>
          <ArrowLeftIcon />
        </button>
        <hgroup>
          <h1 className="font-bold text-[1.8rem] md:text-[2.8rem] lg:text-[3.2rem] leading-">All Invoices</h1>
          <p className="text-[1.4rem] md:text-[1.6rem] text-grey-500">View all your invoices</p>
        </hgroup>
      </div>
      <Button
        variation="secondary"
        className="bg-transparent w-max text-[1.2rem] lg:text-[1.4rem] py-[1rem] md:py-[1.4rem] lg:py-[2.2rem] md:px-[3rem] px-[1.6rem] border-primary-100 gap-[1rem] md:gap-[1.6rem] tracking-wider"
      >
        <DocumentDownloadIcon /> EXPORT AS PDF
      </Button>
    </div>
  );
}
