import MoneyIcon from "../../../assets/icons/MoneyIcon";
import ProfileUserIcon from "../../../assets/icons/ProfileUserIcon";
import SettingsIcon from "../../../assets/icons/SettingsIcon";
import { InvoiceActionsCard } from "./InvoiceActionsCard";

export default function InvoiceActions() {
  return (
    <div className="space-y-[2.4rem]">
      <h3 className="text-[2rem] font-medium">Invoice Actions</h3>
      <div className="grid grid-cols-3 gap-[3.2rem]">
        <InvoiceActionsCard
          title="Create New Invoice"
          subtitle="Create new invoices easily"
          icon={<MoneyIcon />}
        />
        <InvoiceActionsCard
          title="Change Invoice settings"
          subtitle="Customise your invoices"
          icon={<SettingsIcon size="large" />}
        />
        <InvoiceActionsCard
          title="Manage Customer list"
          subtitle="Add and remove customers"
          icon={<ProfileUserIcon size="large" />}
        />
      </div>
    </div>
  );
}
