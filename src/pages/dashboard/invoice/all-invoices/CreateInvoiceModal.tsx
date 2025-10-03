/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";

import type { ICreateInvoiceForm, InvoiceItem } from "../types";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import { api } from "../../../../services/api";
import { setModalType } from "../../../../store";
import toast from "react-hot-toast";
import SpinnerIcon from "../../../../assets/icons/SpinnerIcon";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import Textarea from "../../../../components/Textarea";

interface CreateInvoiceFormProps {
  isOpen: boolean;
}

const DEFAULT_ITEM = () => ({
  id: Date.now().toString(),
  name: "",
  description: "",
  quantity: 1,
  price: 0,
});

export default function CreateInvoiceModal({ isOpen }: CreateInvoiceFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateInvoiceForm>({
    mode: "onSubmit",
    defaultValues: {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      customerAddress: "",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: "",
      status: "DRAFT",
      items: [DEFAULT_ITEM()],
      discountPercentage: 0,
      note: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
    keyName: "fieldId",
  });

  const watchedItems = useWatch({
    control,
    name: "items",
  }) as ICreateInvoiceForm["items"];
  const watchedDiscount = useWatch({
    control,
    name: "discountPercentage",
  }) as number;

  const itemTotals = useMemo(
    () =>
      (watchedItems || []).map((it) => {
        const qty = Number(it?.quantity ?? 0);
        const price = Number(it?.price ?? 0);
        return Math.max(0, qty * price);
      }),
    [watchedItems]
  );

  const subtotal = useMemo(
    () => itemTotals.reduce((s, t) => s + t, 0),
    [itemTotals]
  );

  const discountAmount = useMemo(
    () => (subtotal * (Number(watchedDiscount ?? 0) || 0)) / 100,
    [subtotal, watchedDiscount]
  );

  const total = useMemo(
    () => Math.max(0, subtotal - discountAmount),
    [subtotal, discountAmount]
  );

  const handleAddItem = () => append(DEFAULT_ITEM());

  const handleRemoveItem = (index: number) => {
    if (fields.length > 1) remove(index);
  };

  const onSubmit = async (values: ICreateInvoiceForm) => {
    setLoading(true);

    try {
      const itemsWithTotals: InvoiceItem[] = values.items.map((it) => ({
        id: it.id,
        name: it.name,
        description: it.description || "",
        quantity: Number(it.quantity),
        price: Number(it.price),
        total: Number(
          (Number(it.quantity || 0) * Number(it.price || 0)).toFixed(2)
        ),
      }));
      const invoiceData = {
        amount: Number(total.toFixed(2)),
        status: values.status,
        dueDate: new Date(values.dueDate).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        dateCreated: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        details: {
          issueDate: new Date(values.issueDate).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          dueDate: new Date(values.dueDate).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          currency: "USD",
          currencySymbol: "$",
        },
        sender: {
          name: "Fabulous Enterprise",
          logo: "/assets/images/enterprise-logo.png",
          phone: "+386 989 271 3115",
          address: "1331 Hart Ridge Road 48436 Gaines, MI",
          email: "info@fabulousenterprise.co",
        },
        customer: {
          name: values.customerName,
          phone: values.customerPhone || "",
          email: values.customerEmail,
          address: values.customerAddress || "",
        },
        items: itemsWithTotals,
        financials: {
          subtotal: Number(subtotal.toFixed(2)),
          discount: Number(discountAmount.toFixed(2)),
          discountPercentage: Number(values.discountPercentage || 0),
          tax: 0,
          taxPercentage: 0,
          total: Number(total.toFixed(2)),
        },
        paymentInformation: {
          accountName: "Fabulous Enterprise LLC",
          accountNumber: "1234567890",
          achRoutingNo: "110000000",
          bankName: "JP Morgan Chase Bank",
          bankAddress: "270 Park Avenue, New York, NY 10017",
        },
        note: values.note || "",
      };

      const response = await api.invoices.create(invoiceData);

      if (response.success) {
        toast.success("Invoice created successfully!");
        reset();
        setModalType("CLOSE_MODAL");
      } else {
        throw new Error(response.error || "Failed to create invoice");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      toast.error(message);
      console.error("Error creating invoice:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      className="space-y-[2.4rem] overflow-y-auto overflow-x-hidden no-scrollbar max-h-[90vh] w-[34rem] sm:w-[62rem] xl:w-full"
    >
      <div className="flex items-start justify-between">
        <hgroup>
          <h1 className="text-[2.8rem] md:text-[3.2rem] font-semibold">
            Create New Invoice
          </h1>
          <p className="text-grey-500">
            Fill in the details to create an invoice
          </p>
        </hgroup>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-[3.2rem]">
        <div className="bg-pink-50 rounded-[2rem] md:rounded-[4rem] p-[2rem] md:p-[3.2rem] space-y-[2.4rem]">
          <h2 className="text-[1.8rem] font-semibold">Customer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2rem]">
            <div>
              <Input
                name="customerName"
                label="Customer Name"
                placeholder="Enter customer name"
                properties={{
                  ...register("customerName", {
                    required: "Customer name is required",
                  }),
                }}
                errors={errors?.customerName}
              />
            </div>

            <div>
              <Input
                name="customerEmail"
                label="Email"
                placeholder="abc@xyz.co"
                properties={{
                  ...register("customerEmail", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }),
                }}
                errors={errors?.customerEmail}
              />
            </div>

            <div>
              <Input
                name="customerPhone"
                label="Phone"
                placeholder="+1 234 567 8900"
                properties={{ ...register("customerPhone") }}
              />
            </div>

            <div>
              <Input
                name="customerAddress"
                label="Address"
                placeholder="Customer address"
                properties={{ ...register("customerAddress") }}
              />
            </div>
          </div>
        </div>

        <div className="bg-grey-50 rounded-[2rem] md:rounded-[4rem] p-[2rem] md:p-[3.2rem] space-y-[2.4rem]">
          <h2 className="text-[1.8rem] font-semibold">Invoice Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.6rem]">
            <div>
              <Input
                name="issueDate"
                label="Issue Date"
                type="date"
                properties={{
                  ...register("issueDate", {
                    required: "Issue date is required",
                  }),
                }}
                errors={errors?.issueDate}
              />
            </div>

            <div>
              <Input
                name="dueDate"
                label="Due Date"
                type="date"
                properties={{
                  ...register("dueDate", { required: "Due date is required" }),
                }}
                errors={errors?.dueDate}
              />
            </div>

            <div>
              <Select
                label="Status"
                placeholder="---Select---"
                required
                options={[
                  {
                    name: "Draft",
                    value: "DRAFT",
                  },
                  {
                    name: "Unpaid",
                    value: "UNPAID",
                  },
                  {
                    name: "Pending Payment",
                    value: "PENDING PAYMENT",
                  },
                  {
                    name: "Paid",
                    value: "PAID",
                  },
                  {
                    name: "Overdue",
                    value: "OVERDUE",
                  },
                  {
                    name: "Partial Payment",
                    value: "PARTIAL PAYMENT",
                  },
                ]}
                properties={{
                  ...register("status", {
                    required: "This field is required",
                  }),
                }}
                errors={errors?.status}
              />
            </div>
          </div>
        </div>

        <div className="space-y-[2.4rem]">
          <div className="flex items-center justify-between">
            <h2 className="text-[1.8rem] font-semibold">Invoice Items</h2>
            <Button
              type="button"
              onClick={handleAddItem}
              variation="secondary"
              className="w-max px-10"
            >
              + Add Item
            </Button>
          </div>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-white border border-grey-200 rounded-[1.6rem] p-[2rem] space-y-[1.6rem]"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-[1.4rem]">Item {index + 1}</h3>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="text-danger-100 hover:text-danger-200 text-[1.2rem]"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.6rem]">
                <div className="md:col-span-2">
                  <Input
                    name={`items.${index}.name`}
                    label="Item Name"
                    placeholder="Item name"
                    properties={{
                      ...register(`items.${index}.name` as const, {
                        required: "Item name is required",
                      }),
                    }}
                    errors={errors?.items?.[index]?.name}
                  />
                </div>

                <div className="md:col-span-2">
                  <Input
                    name={`items.${index}.description`}
                    label="Description"
                    placeholder="Item description"
                    properties={{
                      ...register(`items.${index}.description` as const),
                    }}
                  />
                </div>

                <div>
                  <Input
                    name={`items.${index}.quantity`}
                    type="number"
                    label="Quantity"
                    properties={{
                      ...register(`items.${index}.quantity` as const, {
                        valueAsNumber: true,
                        min: {
                          value: 1,
                          message: "Quantity must be at least 1",
                        },
                        required: "Quantity is required",
                      }),
                    }}
                  />
                </div>

                <div>
                  <Input
                    name={`items.${index}.price`}
                    type="number"
                    label="Price ($)"
                    properties={{
                      ...register(`items.${index}.price` as const, {
                        valueAsNumber: true,
                        min: { value: 0, message: "Price must be >= 0" },
                        required: "Price is required",
                      }),
                      min: 0,
                      step: 0.01,
                    }}
                  />
                </div>
              </div>

              <div className="pt-[1.6rem] border-t border-grey-200">
                <p className="text-right text-[1.6rem] font-semibold">
                  Total: ${itemTotals[index]?.toFixed(2) ?? "0.00"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-grey-50 rounded-[2rem] p-[2rem] md:p-[3.2rem] space-y-[2.4rem]">
          <h2 className="text-[1.8rem] font-semibold">Financial Summary</h2>

          <div className="max-w-md">
            <Input
              name="discountPercentage"
              type="number"
              label="Discount (%)"
              properties={{
                ...register("discountPercentage", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Min 0%" },
                  max: { value: 100, message: "Max 100%" },
                }),
                min: 0,
                step: 0.1,
                max: 100,
              }}
            />
          </div>

          <div className="space-y-[1.2rem] pt-[2.4rem] border-t border-grey-200">
            <div className="flex justify-between text-[1.4rem]">
              <span className="text-grey-500">Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[1.4rem]">
              <span className="text-grey-500">
                Discount ({Number(watchedDiscount ?? 0)}%):
              </span>
              <span className="font-medium text-red-500">
                -${discountAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-[2rem] font-bold pt-[1.6rem] border-t border-grey-300">
              <span>Total:</span>
              <span className="text-primary-100">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div>
          <Textarea
            name="note"
            label="Note (Optional)"
            placeholder="Add any additional notes or terms..."
            properties={{ ...register("note") }}
          />
        </div>

        <div className="flex gap-[1.6rem] justify-end pt-[2.4rem] border-t border-grey-200">
          <Button
            type="button"
            onClick={() => {
              reset();
              setModalType("CLOSE_MODAL");
            }}
            variation="secondary"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? <SpinnerIcon /> : "Create Invoice"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
