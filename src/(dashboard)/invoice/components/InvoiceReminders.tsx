import { useState } from "react";
import type { InvoiceReminder, InvoiceReminders, InvoiceReminderSettings } from "../types";
import CheckMarkIcon from "../../../assets/icons/CheckMarkIcon";
import { cn } from "../../../utils";

interface InvoiceRemindersProps {
  data: InvoiceReminderSettings
}
export default function InvoiceReminders({data} : InvoiceRemindersProps) {
  const {reminders: remindersData} = data
  const [reminders, setReminders] =
    useState<InvoiceReminder[]>(remindersData);

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
    <div className="border border-grey-100 rounded-[1.6rem] md:rounded-[2.4rem] py-[1.5rem] px-[1rem] md:p-[2.4rem] flex flex-col xl:flex-row items-start xl:items-center gap-[1.6rem] md:gap-[2.4rem] w-full xl:w-max">
      <span className="text-[1.2rem] font-semibold text-grey-400">
        REMINDERS
      </span>
      <div className="flex items-center gap-[1.2rem] flex-wrap w-full">
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
            <span className="text-[1.2rem] md:text-[1.4rem] max-w-[14rem] font-medium">{reminder.text}</span>
            {reminder.completed && <CheckMarkIcon />}
          </button>
        ))}
      </div>
    </div>
  );
}
