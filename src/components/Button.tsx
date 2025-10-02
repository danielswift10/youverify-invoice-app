import { NavLink } from "react-router-dom";
import { cn } from "../utils";

export type ButtonVariation = "primary" | "secondary" | "tertiary" | "linkGrey";

export interface ButtonProps {
  children: React.ReactNode;
  size?: "small" | "medium";
  variation?: ButtonVariation;
  disabled?: boolean;
  download?: boolean;
  target?: string;
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

function Button({
  children,
  size = "medium",
  variation = "primary",
  disabled,
  target,
  download,
  onClick,
  type = "button",
  href,
  className = "",
}: ButtonProps) {
  const variations = {
    primary:
      "text-white bg-primary-100 hover:bg-primary-200 disabled:bg-primary-200 disabled:cursor-not-allowed rounded-[4rem]",
    secondary:
      "border border-grey-100 text-primary-100  bg-white rounded-[4rem]",
    tertiary: "border border-grey-100 text-grey-500  bg-white rounded-[4rem]",
    linkGrey: "text-grey-600 cursor-pointer hover:underline text-center",
  };

  const sizes = {
    small: "text-[1.4rem] font-semibold leading-3 py-2 px-4 ",
    medium: "text-[1.6rem] font-semibold px-[6.2rem] py-[2.4rem]",
  };

  if (href)
    return (
      <NavLink
        to={href}
        className={cn(
          "w-full flex gap-2 items-center justify-center outline-none font-medium transition-all duration-300",
          sizes[size as keyof typeof sizes],
          variations[variation as keyof typeof variations],
          className
        )}
        target={target}
        download={download}
      >
        {children}
      </NavLink>
    );

  return (
    <button
      className={cn(
        "w-full outline-none font-medium transition-all duration-300 flex items-center justify-center",
        sizes[size as keyof typeof sizes],
        variations[variation as keyof typeof variations],
        className
      )}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
