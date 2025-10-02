import { sidebarItemsData } from "../../utils/data";
import SidebarItem from "./SidebarItem";

export default function SidebarItems() {
  return (
    <ul className="space-y-[1.2rem]">
      {sidebarItemsData.map((sidebarItem, index) => (
        <SidebarItem key={index} {...sidebarItem} />
      ))}
    </ul>
  );
}
