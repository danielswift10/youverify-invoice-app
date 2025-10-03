import enterpriseLogo from "../../../../assets/images/enterprise-logo.png";
import { useRef, useState } from "react";
import Menu from "../../../../components/Menu";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import { cn, formatAmount, statusPill } from "../../../../utils";
import InvoiceReminders from "../../components/InvoiceReminders";
import InvoiceActivity from "../../components/InvoiceActivity";
import { useGetInvoice, useGetInvoiceReminders } from "../../store";
import type {
  InvoiceActivities,
  InvoiceReminderSettings,
  TStatus,
} from "../../types";
import Loader from "../../../../components/Loader";

interface InvoiceModalProps {
  isOpen: boolean;
  invoiceId: string;
}
export default function InvoiceModal({ isOpen, invoiceId }: InvoiceModalProps) {
  const { invoiceData, invoiceDataLoading } = useGetInvoice(invoiceId);
  const { reminderSettingsData } = useGetInvoiceReminders(invoiceId);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const actionContainerRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: actionContainerRef as React.RefObject<HTMLElement>,
    callbackHandler: () => setIsMenuOpen(false),
  });

  const handleToggle = () => {
    setIsMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  if (invoiceDataLoading) {
    return (
      <Modal
        isOpen={isOpen}
        className="flex items-center justify-center h-[84rem]"
      >
        <Loader />
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      className="space-y-[3.2rem] overflow-y-auto overflow-x-hidden no-scrollbar h-[90vh]"
    >
      <div className="flex flex-col xl:flex-row gap-10 xl:gap-0 items-start justify-between  bg-white">
        <div className="space-y-[1.4rem] md:space-y-[2.4rem]">
          <hgroup>
            <h1 className="text-[2.8rem] md:text-[3.2rem] font-semibold">
              Invoice - {invoiceData?.invoiceNumber}{" "}
            </h1>
            <p className="text-grey-500">
              View the details and activity of this invoice
            </p>
          </hgroup>
          <span
            className={cn(
              "inline-block border uppercase text-[1.2rem] md:text-[1.4rem] py-1 px-[1.6rem] rounded-[2.4rem] w-max font-medium tracking-wide",
              statusPill[invoiceData?.status as TStatus]
            )}
          >
            {invoiceData?.status}
          </span>
        </div>
        <div className="grid grid-cols-[1fr_.9fr_.1fr] items-center justify-center gap-[1rem] md:gap-[2.4rem]">
          <Button
            variation="secondary"
            className="uppercase text-[.95rem] sm:text-[1.2rem] md:text-[1.4rem] py-5 md:py-8 px-[1.2rem] md:px-[4.75rem]"
          >
            Download as PDF
          </Button>
          <Button className="uppercase text-[.95rem] sm:text-[1.2rem] md:text-[1.4rem] py-5 md:py-8 px-[1.2rem] md:px-[5.5rem]">
            Send Invoice
          </Button>
          <div className="relative" ref={actionContainerRef}>
            <Button
              onClick={handleToggle}
              variation="tertiary"
              className="uppercase text-[.95rem] sm:text-[1.2rem] md:text-[1.4rem] py-5 md:py-8 px-[2.4rem]"
            >
              More
            </Button>
            <ul
              className={cn(
                "absolute w-[26rem] mt-3 right-0 flex flex-col bg-white rounded-[2.4rem] border border-grey-100 p-[1.6rem] opacity-0 invisible translate-x-full transition-all duration-500",
                {
                  "opacity-100 translate-x-0 visible": isMenuOpen,
                }
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <Menu.Button>Duplicate invoice</Menu.Button>
              <Menu.Button>get sharable link</Menu.Button>
            </ul>
          </div>
        </div>
      </div>

      <InvoiceReminders
        data={reminderSettingsData as InvoiceReminderSettings}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-[5.5rem]">
        <div className="rounded-[2rem] md:rounded-[4rem] p-[1rem] md:p-[3.2rem] border border-grey-100 space-y-[2.4rem]">
          <div className="bg-pink-50 rounded-[2rem] md:rounded-[4rem] p-[1.4rem] md:p-[3.2rem] space-y-[3.2rem]">
            <div className="flex items-start justify-between">
              <div className="space-y-[1.6rem]">
                <p className="text-[1rem] md:text-[1.2rem] font-semibold text-grey-500 tracking-wide">
                  SENDER
                </p>
                <div className="flex items-start gap-[.8rem] md:gap-[1.6rem]">
                  <figure className="overflow-hidden bg-white rounded-[.8rem] md:rounded-[1.6rem] p-4 w-16 md:w-24 h-16 md:h-24">
                    <img
                      src={invoiceData?.sender.logo || enterpriseLogo}
                      alt="enterprise_logo"
                      className="size-full object-cover"
                    />
                  </figure>
                  <div className="space-y-[.2rem]">
                    <h3 className="font-semibold text-[1rem] md:text-[1.6rem] text-black">
                      {invoiceData?.sender.name}
                    </h3>
                    <p className="text-[1rem] md:text-[1.2rem] text-grey-500">
                      {invoiceData?.sender.phone}
                    </p>
                    <p className="text-[1rem] md:text-[1.2rem] text-grey-500">
                      {invoiceData?.sender.address}
                    </p>
                    <p className="text-[1rem] md:text-[1.2rem] text-grey-500">
                      {invoiceData?.sender.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-[1.6rem]">
                <p className="text-[1rem] md:text-[1.2rem] font-semibold text-grey-500 tracking-wide">
                  CUSTOMER
                </p>
                <div className="space-y-[.2rem]">
                  <h3 className="font-semibold text-[1rem] md:text-[1.6rem] text-black">
                    {invoiceData?.customer.name}
                  </h3>
                  <p className="text-[1rem] md:text-[1.2rem] text-grey-500">
                    {invoiceData?.customer.phone}
                  </p>
                  <p className="text-[1rem] md:text-[1.2rem] text-grey-500">
                    {invoiceData?.customer.email}
                  </p>
                  {invoiceData?.customer.address && (
                    <p className="text-[1rem] md:text-[1.2rem] text-grey-500">
                      {invoiceData?.customer.address}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="space-y-[.8rem]">
              <p className="text-[1rem] md:text-[1.2rem] font-semibold text-grey-500 tracking-wide">
                INVOICE DETAILS
              </p>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-grey-400 text-[.8rem] md:text-[1rem] text-left font-medium leading-8 tracking-wide">
                      INVOICE NO
                    </th>
                    <th className="text-grey-400 text-[.8rem] md:text-[1rem] text-left font-medium leading-8 tracking-wide">
                      ISSUE DATE
                    </th>
                    <th className="text-grey-400 text-[.8rem] md:text-[1rem] text-left font-medium leading-8 tracking-wide">
                      DUE DATE
                    </th>
                    <th className="text-grey-400 text-[.8rem] md:text-[1rem] text-left font-medium leading-8 tracking-wide">
                      BILLING CURRENCY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-[1rem] md:text-[1.2rem] text-black leading-8 font-semibold">
                      {invoiceData?.details.invoiceNumber}
                    </td>
                    <td className="text-[1rem] md:text-[1.2rem] text-black leading-8 font-semibold">
                      {invoiceData?.details.issueDate}
                    </td>
                    <td className="text-[1rem] md:text-[1.2rem] text-black leading-8 font-semibold">
                      {invoiceData?.details.dueDate}
                    </td>
                    <td className="text-[1rem] md:text-[1.2rem] text-black leading-8 font-semibold">
                      {invoiceData?.details.currency} (
                      {invoiceData?.details.currencySymbol})
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Items table */}
          <div className="space-y-[2.4rem]">
            <h3 className="text-[1.8rem] md:text-[2rem] font-semibold text-black">
              Items
            </h3>
            <div className="space-y-6">
              {invoiceData?.items?.map((item, idx) => (
                <div key={idx} className="pb-[1.6rem]">
                  <table className="table-auto w-full gap-4 items-start">
                    <tbody>
                      <tr className="grid grid-cols-[1.2fr_.5fr_1fr_1fr]">
                        <td className="text-black text-[1.4rem] md:text-[1.6rem]  font-medium">
                          {item.name}
                          {item.description && (
                            <span className="inline-block w-full text-[1rem] md:text-[1.3rem] text-grey-400">
                              {item.description}
                            </span>
                          )}
                        </td>
                        <td className="text-right text-[1.4rem] md:text-[1.6rem]  text-black">
                          {item.quantity}
                        </td>
                        <td className="text-right text-[1.4rem] md:text-[1.6rem]  text-black">
                          ${formatAmount(item.price)}
                        </td>
                        <td className="text-right text-[1.4rem] md:text-[1.6rem]  text-black">
                          ${formatAmount(item.total)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-[70%] md:w-[60%]">
                <div className="flex justify-between items-center">
                  <span className="text-[1.2rem] md:text-[1.4rem] text-grey-30">
                    SUBTOTAL
                  </span>
                  <span className="font-medium text-grey-600 text-[1.6rem] md:text-[2rem]">
                    ${formatAmount(invoiceData?.financials.subtotal ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[1.2rem] md:text-[1.4rem] text-grey-30">
                    DISCOUNT ({invoiceData?.financials.discountPercentage}%)
                  </span>
                  <span className="font-medium text-grey-600 text-[1.6rem] md:text-[2rem]">
                    ${formatAmount(invoiceData?.financials.discount ?? 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-[2.5rem]">
                  <span className="text-[1.6rem] md:text-[1.8rem] font-semibold text-grey-600">
                    TOTAL AMOUNT DUE
                  </span>
                  <span className="text-[1.6rem] md:text-[2.5rem] font-semibold text-grey-600">
                    ${formatAmount(invoiceData?.financials.total ?? 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-grey-100 rounded-[2.4rem] py-[1.6rem] px-[1.6rem] md:px-[2.4rem] space-y-[.8rem]">
            <h3 className="text-[1.2rem] font-semibold text-grey-500">
              PAYMENT INFORMATION
            </h3>
            <div className="grid grid-cols-4 gap-y-[.8rem] gap-x-[2rem] md:gap-x-[5.2rem]">
              <div>
                <p className="text-[.8rem] md:text-[1rem] text-grey-400 tracking-wider">
                  ACCOUNT NAME
                </p>
                <p className="text-[1rem] md:text-[1.2rem] font-semibold text-black">
                  {invoiceData?.paymentInformation.accountName}
                </p>
              </div>
              <div>
                <p className="text-[.8rem] md:text-[1rem] text-grey-400 tracking-wider">
                  ACCOUNT NUMBER
                </p>
                <p className="text-[1rem] md:text-[1.2rem] font-semibold text-black">
                  {invoiceData?.paymentInformation.accountNumber}
                </p>
              </div>
              <div>
                <p className="text-[.8rem] md:text-[1rem] text-grey-400 tracking-wider">
                  ACH ROUTING NO
                </p>
                <p className="text-[1rem] md:text-[1.2rem] font-semibold text-black">
                  {invoiceData?.paymentInformation.achRoutingNo}
                </p>
              </div>
              <div>
                <p className="text-[.8rem] md:text-[1rem] text-grey-400 tracking-wider">
                  BANK NAME
                </p>
                <p className="text-[1rem] md:text-[1.2rem] font-semibold text-black">
                  {invoiceData?.paymentInformation.bankName}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-[.8rem] md:text-[1rem] text-grey-400 tracking-wider">
                  BANK ADDRESS
                </p>
                <p className="text-[1rem] md:text-[1.2rem] font-semibold text-black">
                  {invoiceData?.paymentInformation.bankAddress}
                </p>
              </div>
              {/* <div>
                <p className="text-[1rem] text-grey-400 tracking-wider">
                  ACCOUNT NUMBER
                </p>
                <p className="text-[1.2rem] font-semibold text-black">
                  March 30th, 2023
                </p>
              </div> */}
            </div>
          </div>

          <div className="bg-grey-50 rounded-[2.4rem] pt-[1.6rem] pb-[4.2rem] px-[2.4rem]">
            <h3 className="text-[1.4rem] font-semibold text-grey-30">NOTE</h3>
            <p className="text-grey-400">{invoiceData?.note}</p>
          </div>
        </div>

        <div>
          <InvoiceActivity
            data={invoiceData?.activities as InvoiceActivities[]}
            showVerticalLine
          />
        </div>
      </div>
    </Modal>
  );
}
