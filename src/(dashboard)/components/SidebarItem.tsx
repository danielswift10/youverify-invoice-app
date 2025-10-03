import type { ISideBarData } from "../types";
import {
  Link,
  matchPath,
  useLocation,
  useResolvedPath,
} from "react-router-dom";
import { cn } from "../../utils";
import { setOpenSidebar } from "../../store";

export default function SidebarItem({
  icon: Icon,
  route,
  title,
}: ISideBarData) {
  const location = useLocation();
  const resolved = useResolvedPath(route);

  const endMatch = resolved.pathname === "/";

  const isActive = Boolean(
    matchPath({ path: resolved.pathname, end: endMatch }, location.pathname)
  );

  return (
    <li>
      <Link
        onClick={() => setOpenSidebar(false)}
        to={route}
        className={cn(
          "flex items-center border-transparent rounded-[3.2rem] tracking-wider hover:bg-grey-700 transition-all  duration-300 ease-in-out gap-[.8rem] text-[1.4rem] py-[1.4rem] px-[1.6rem] text-grey-500",
          {
            "border-8 hover:bg-white border-[#F8F8FB] bg-white": isActive,
          }
        )}
      >
        <span className="shrink-0"><Icon /></span>
        {title}
      </Link>
    </li>
  );
}
