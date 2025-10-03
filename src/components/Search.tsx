import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import SearchIcon from "../assets/icons/SearchIcon";
import { cn } from "../utils";

interface SearchProps {
  placeholder: string;
  className?: string;
}

export default function Search({ placeholder, className }: SearchProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [text, setText] = useState<string>("");
  const debouncedValue = useDebounce(text, 500);

  useEffect(() => {
    if (!debouncedValue) {
      navigate(pathname);
    } else {
      navigate(`${pathname}?search=${debouncedValue}`);
    }
  }, [debouncedValue, navigate, pathname]);

  return (
    <div
      className={cn(
        "w-full flex flex-row-reverse gap-2 h-full items-center px-[2.4rem] py-[.8rem] self-stretch rounded-[3rem] border border-grey-100",
        className
      )}
    >
      <span className="shrink-0">
        <SearchIcon />
      </span>
      <input
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="w-full outline-none bg-transparent text-grey-600 text-[1.4rem] font-normal leading-4"
      />
    </div>
  );
}
