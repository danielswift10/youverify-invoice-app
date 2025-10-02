import { useState } from "react";
import { invoiceRemindersData } from "../../../utils/data";
import type { InvoiceReminders } from "../types";
import CheckMarkIcon from "../../../assets/icons/CheckMarkIcon";
import { cn } from "../../../utils";

export default function InvoiceReminders() {
  const [reminders, setReminders] =
    useState<InvoiceReminders[]>(invoiceRemindersData);

  const toggleReminder = (id: number) => {
    setReminders((prevReminders) =>
      prevReminders.map((reminder, index) =>
        index === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  return (
    <div className="border border-grey-100 rounded-[2.4rem] p-[2.4rem] flex items-center gap-[2.4rem] w-max">
      <span className="text-[1.2rem] font-semibold text-grey-400">
        REMINDERS
      </span>
      <div className="flex items-center gap-[1.2rem]">
        {reminders.map((reminder, index) => (
          <button
            key={index}
            onClick={() => toggleReminder(index)}
            className={cn(
              "flex items-center gap-4 hover:bg-grey-50 border border-grey-100 px-[1.6rem] py-[1.2rem] rounded-[2.4rem] transition-all duration-200 ",
              {
                "border-none bg-success-50 text-grey-600 hover:bg-success-50":
                  reminder.completed,
              }
            )}
          >
            <span className="text-[1.4rem] font-medium">{reminder.text}</span>
            {reminder.completed && <CheckMarkIcon />}
          </button>
        ))}
      </div>
    </div>
  );
}
