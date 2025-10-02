import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import InvoiceReminders from "./InvoiceReminders";
import enterpriseLogo from "../../../assets/images/enterprise-logo.png";
import { invoiceActivityData, invoiceItemsData } from "../../../utils/data";
import { cn, formatAmount } from "../../../utils";
import InvoiceActivity from "./InvoiceActivity";
import { useRef, useState } from "react";
import Menu from "../../../components/Menu";
import useOutsideClick from "../../../hooks/useOutsideClick";

interface InvoiceModalProps {
  isOpen: boolean;
}
export default function InvoiceModal({ isOpen }: InvoiceModalProps) {
  const subtotal = 6697200.0;
  const discount = 167430.0;
  const total = 6529770.0;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const actionContainerRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: actionContainerRef as React.RefObject<HTMLElement>,
    callbackHandler: () => setIsMenuOpen(false),
  });

  const handleToggle = () => {
    setIsMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  return (
    <Modal
      isOpen={isOpen}
      className="space-y-[3.2rem] overflow-y-auto overflow-x-hidden no-scrollbar h-[84rem]"
    >
      <div className="flex items-start justify-between  bg-white">
        <div className="space-y-[2.4rem]">
          <hgroup>
            <h1 className="text-[3.2rem] font-semibold">
              Invoice - 1023494 - 2304{" "}
            </h1>
            <p className="text-grey-500">
              View the details and activity of this invoice
            </p>
          </hgroup>
          <span className="inline-block bg-primary-50 border border-primary-200 text-primary-100 uppercase py-4 px-[1.6rem] rounded-[2.4rem] w-max font-medium tracking-wide">
            Partial Payment
          </span>
        </div>
        <div className="grid grid-cols-[1fr_.9fr_.1fr] items-center justify-center gap-[2.4rem]">
          <Button variation="secondary" className="uppercase py-8 px-[4.75rem]">
            Download as PDF
          </Button>
          <Button className="uppercase py-8 px-[5.5rem]">Send Invoice</Button>
          <div className="relative" ref={actionContainerRef}>
            <Button
              onClick={handleToggle}
              variation="tertiary"
              className="uppercase py-8 px-[2.4rem]"
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

      <InvoiceReminders />

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-[5.5rem]">
        <div className="rounded-[4rem] p-[3.2rem] border border-grey-100 space-y-[2.4rem]">
          <div className="bg-pink-50 rounded-[4rem] p-[3.2rem] space-y-[3.2rem]">
            <div className="flex items-start justify-between">
              <div className="space-y-[1.6rem]">
                <p className="text-[1.2rem] font-semibold text-grey-500 tracking-wide">
                  SENDER
                </p>
                <div className="flex items-start gap-[1.6rem]">
                  <figure className="overflow-hidden bg-white rounded-[1.6rem] p-4 w-24 h-24">
                    <img
                      src={enterpriseLogo}
                      alt="enterprise_logo"
                      className="size-full object-cover"
                    />
                  </figure>
                  <div className="space-y-[.2rem]">
                    <h3 className="font-semibold text-black">
                      Fabulous Enterprise
                    </h3>
                    <p className="text-[1.2rem] text-grey-500">
                      +386 989 271 3115
                    </p>
                    <p className="text-[1.2rem] text-grey-500">
                      1331 Hart Ridge Road 48436 Gaines, MI
                    </p>
                    <p className="text-[1.2rem] text-grey-500">
                      info@fabulousenterprise.co
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-[1.6rem]">
                <p className="text-[1.2rem] font-semibold text-grey-500">
                  CUSTOMER
                </p>
                <div className="space-y-[.2rem]">
                  <h3 className="font-semibold text-black">
                    Olaniyi Ojo Adewale
                  </h3>
                  <p className="text-[1.2rem] text-grey-500">
                    +386 989 271 3115
                  </p>
                  <p className="text-[1.2rem] text-grey-500">
                    info@fabulousenterprise.co
                  </p>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="space-y-[.8rem]">
              <p className="text-[1.2rem] font-semibold text-grey-500">
                INVOICE DETAILS
              </p>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-grey-400 text-[1rem] text-left font-medium leading-8 tracking-wide">
                      INVOICE NO
                    </th>
                    <th className="text-grey-400 text-[1rem] text-left font-medium leading-8 tracking-wide">
                      ISSUE DATE
                    </th>
                    <th className="text-grey-400 text-[1rem] text-left font-medium leading-8 tracking-wide">
                      DUE DATE
                    </th>
                    <th className="text-grey-400 text-[1rem] text-left font-medium leading-8 tracking-wide">
                      BILLING CURRENCY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-[1.2rem] text-black leading-8 font-semibold">
                      1023902390
                    </td>
                    <td className="text-[1.2rem] text-black leading-8 font-semibold">
                      March 30th, 2023
                    </td>
                    <td className="text-[1.2rem] text-black leading-8 font-semibold">
                      May 19th, 2023
                    </td>
                    <td className="text-[1.2rem] text-black leading-8 font-semibold">
                      USD ($)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Items table */}
          <div className="space-y-[2.4rem]">
            <h3 className="text-[2rem] font-semibold text-black">Items</h3>
            <div className="space-y-6">
              {invoiceItemsData.map((item, idx) => (
                <div key={idx} className="pb-[1.6rem]">
                  <table className="table-auto w-full gap-4 items-start">
                    <tbody>
                      <tr className="grid grid-cols-[1.2fr_.5fr_1fr_1fr]">
                        <td className="text-black font-medium">
                          {item.name}
                          {item.description && (
                            <span className="inline-block w-full text-[1.3rem] text-grey-400">
                              {item.description}
                            </span>
                          )}
                        </td>
                        <td className="text-right text-black">
                          {item.quantity}
                        </td>
                        <td className="text-right text-black">
                          ${formatAmount(item.price)}
                        </td>
                        <td className="text-right text-black">
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
              <div className="w-[60%]">
                <div className="flex justify-between items-center">
                  <span className="text-[1.4rem] text-grey-30">SUBTOTAL</span>
                  <span className="font-medium text-grey-600 text-[2rem]">
                    ${formatAmount(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[1.4rem] text-grey-30">
                    DISCOUNT (2.5%)
                  </span>
                  <span className="font-medium text-grey-600 text-[2rem]">
                    ${formatAmount(discount)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-[2.5rem]">
                  <span className="text-[1.8rem] font-semibold text-grey-600">
                    TOTAL AMOUNT DUE
                  </span>
                  <span className="text-[2.5rem] font-semibold text-grey-600">
                    ${formatAmount(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-grey-100 rounded-[2.4rem] py-[1.6rem] px-[2.4rem] space-y-[.8rem]">
            <h3 className="text-[1.2rem] font-semibold text-grey-500">
              PAYMENT INFORMATION
            </h3>
            <div className="grid grid-cols-4 gap-y-[.8rem] gap-x-[5.2rem]">
              <div>
                <p className="text-[1rem] text-grey-400 tracking-wider">
                  ACCOUNT NAME
                </p>
                <p className="text-[1.2rem] font-semibold text-black">
                  1023902390
                </p>
              </div>
              <div>
                <p className="text-[1rem] text-grey-400 tracking-wider">
                  ACCOUNT NUMBER
                </p>
                <p className="text-[1.2rem] font-semibold text-black">
                  March 30th, 2023
                </p>
              </div>
              <div>
                <p className="text-[1rem] text-grey-400 tracking-wider">
                  ACH ROUTING NO
                </p>
                <p className="text-[1.2rem] font-semibold text-black">
                  May 19th, 2023
                </p>
              </div>
              <div>
                <p className="text-[1rem] text-grey-400 tracking-wider">
                  BANK NAME
                </p>
                <p className="text-[1.2rem] font-semibold text-black">
                  USD ($)
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <div>
                <p className="text-[1rem] text-grey-400 tracking-wider">
                  BANK ADDRESS
                </p>
                <p className="text-[1.2rem] font-semibold text-black">
                  1023902390
                </p>
              </div>
              <div>
                <p className="text-[1rem] text-grey-400 tracking-wider">
                  ACCOUNT NUMBER
                </p>
                <p className="text-[1.2rem] font-semibold text-black">
                  March 30th, 2023
                </p>
              </div>
            </div>
          </div>

          <div className="bg-grey-50 rounded-[2.4rem] pt-[1.6rem] pb-[4.2rem] px-[2.4rem]">
            <h3 className="text-[1.4rem] font-semibold text-grey-30">NOTE</h3>
            <p className="text-grey-400">Thank you for your patronage</p>
          </div>
        </div>

        <div>
          <InvoiceActivity data={invoiceActivityData} showVerticalLine />
        </div>
      </div>
    </Modal>
  );
}
