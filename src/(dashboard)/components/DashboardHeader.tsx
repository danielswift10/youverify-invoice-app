import { Helmet } from "react-helmet-async";
import { useState, useRef } from "react";
import BellIcon from "../../assets/icons/BellIcon";
import ChevronDownIcon from "../../assets/icons/ChevronDownIcon";
import { useAuth } from "../../hooks/useAuth";
import useOutsideClick from "../../hooks/useOutsideClick";
import { cn } from "../../utils";

export default function DashboardHeader({ title }: { title: string }) {
  const { userData, getInitials, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: dropdownRef as React.RefObject<HTMLElement>,
    callbackHandler: () => setShowDropdown(false),
  });

  const handleLogout = async () => {
    setShowDropdown(false);
    await logout();
  };

  return (
    <>
      <Helmet>
        <title>{title} | Youverify</title>
      </Helmet>
      <div
        className="sticky top-0 w-full z-30 bg-background flex items-center justify-between h-[10rem] border-b border-b-primary-300"
      >
        <h2 className="font-semibold text-[2rem] md:text-[2.8rem] text-grey-600 uppercase tracking-wide">
          {title}
        </h2>
        <div className="flex items-center gap-[1rem] md:gap-[2.4rem]">
          <button className="flex items-center justify-center rounded-full bg-white p-6">
            <BellIcon />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="rounded-[4rem] p-4 bg-white flex items-center hover:bg-gray-50 transition-colors"
            >
              {userData?.photoURL ? (
                <img
                  src={userData.photoURL}
                  alt={`${userData.firstName} ${userData.lastName}`}
                  className="w-[3.2rem] h-[3.2rem] rounded-full object-cover"
                />
              ) : (
                <div className="bg-primary-100 w-[3.2rem] h-[3.2rem] flex items-center justify-center text-[1.4rem] font-bold rounded-full text-white">
                  {getInitials()}
                </div>
              )}
              <span className="p-[.8rem]">
                <ChevronDownIcon />
              </span>
            </button>

            <div
              className={cn(
                "absolute right-0 mt-2 w-[20rem] bg-white rounded-[1.6rem] shadow-lg border border-grey-200 py-2 z-50 overflow-hidden opacity-0 invisible translate-x-full transition-all duration-500",
                {
                  "opacity-100 translate-x-0 visible": showDropdown,
                }
              )}
            >
              <div className="px-8 py-3 border-b border-grey-200">
                <p className="text-[1.4rem] tracking-wider capitalize font-semibold text-black">
                  {userData?.firstName} {userData?.lastName}
                </p>
                <p className="text-[1.2rem] text-grey-400 truncate">
                  {userData?.email}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowDropdown(false);
                }}
                className="w-full text-left px-8 py-3 text-[1.4rem] text-black hover:bg-grey-50 transition-colors"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-8 py-3 text-[1.4rem] text-danger-100 hover:bg-danger-50 transition-colors border-t border-grey-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
