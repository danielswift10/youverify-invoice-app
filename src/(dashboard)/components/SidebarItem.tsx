import type { ISideBarData } from "../types";
import { Link } from "react-router-dom";
import { cn } from "../../utils";

export default function SidebarItem({
  icon: Icon,
  route,
  title,
}: ISideBarData) {
  const pathname = location.pathname;
  const isActive = pathname === route;
  return (
    <li>
      <Link
        to={route}
        className={cn(
          "flex items-center border-transparent rounded-[3.2rem] tracking-wider hover:bg-grey-700 transition-all  duration-300 ease-in-out gap-[.8rem] text-[1.4rem] py-[1.4rem] px-[1.6rem] text-grey-500",
          {
            "border-8 hover:bg-white border-[#F8F8FB] bg-white": isActive,
          }
        )}
      >
        <Icon />
        {title}
      </Link>
    </li>
  );
}
