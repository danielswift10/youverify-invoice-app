import Logo from "../../assets/icons/Logo";
import SidebarItems from "./SidebarItems";

export default function Sidebar() {
  return (
   <div className="px-[2.4rem] bg-white py-[4rem] space-y-[4rem]">
    <Logo/>
    <SidebarItems/>
   </div>
  )
}
