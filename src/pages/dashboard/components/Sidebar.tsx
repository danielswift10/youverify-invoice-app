import { useRef } from "react";
import Logo from "../../../assets/icons/Logo";
import SidebarItems from "./SidebarItems";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { cn } from "../../../utils";
import MenuIcon from "../../../assets/icons/MenuIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";
import { $openSidebar, setOpenSidebar } from "../../../store";
import { useStore } from "@nanostores/react";

export default function Sidebar() {
  const openSidebar = useStore($openSidebar);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: drawerRef as React.RefObject<HTMLElement>,
    callbackHandler: () => setOpenSidebar(false),
  });

  return (
    <>
      <div className="lg:hidden sticky top-0 left-0 right-0 z-50 bg-white border-b border-grey-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpenSidebar(true)}
            className="p-2 rounded-md hover:bg-grey-50 transition"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
      <div
        className={cn(
          "fixed inset-0 z-40  transition-opacity duration-200",
          openSidebar
            ? "pointer-events-auto opacity-60 bg-black/90"
            : "pointer-events-none opacity-0"
        )}
        onClick={() => setOpenSidebar(false)}
      />

      <aside
        ref={drawerRef}
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[80%] max-w-sm bg-white shadow-xl transform transition-transform duration-300",
          openSidebar ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-4 py-4 flex items-center justify-between border-b border-grey-100">
          <div>
            <Logo />
          </div>

          <button
            onClick={() => setOpenSidebar(false)}
            className="p-2 rounded-md hover:bg-grey-50 transition"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="px-4 py-6 overflow-y-auto h-full">
          <SidebarItems />
        </div>
      </aside>

      <div className="px-[2.4rem] hidden lg:block bg-white py-[4rem] space-y-[4rem] h-screen sticky top-0">
        <Logo />
        <SidebarItems />
      </div>
    </>
  );
}
