import { NavLink } from "react-router-dom";
import { cn } from "../utils";

export type ButtonVariation = "primary" | "secondary" | "tertiary";

export interface ButtonProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "xlarge" | "xxlarge";
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
    primary: "text-white bg-primary-100 rounded-[4rem]",
    secondary: "border border-grey-100 text-primary-100  bg-white rounded-[4rem]",
    // secondary:
    //   'shadow-base text-white rounded-[16px] border border-blue-300 bg-blue-200 hover:bg-blue-400 hover:border-blue-400 focus:bg-blue-500 focus:border-blue-500 disabled:bg-blue-50 disabled:border-blue-100 disabled:text-blue-100',

    tertiary: "border border-grey-100 text-grey-500  bg-white rounded-[4rem]",

    linkGreen:
      "shadow-base text-white rounded-[16px] bg-green border border-green",
    // danger:
    //   'shadow-base text-white rounded-md border border-error-400 bg-error-400 hover:bg-error-300 hover:border-error-300 focus:bg-error-500 focus:border-error-500 disabled:bg-error-50 disabled:border-error-100 disabled:text-white',

    linkPurple:
      "shadow-base text-purple bg-white border border-purple rounded-[27px] hover:border-purple ",

    // linkWhite:
    //   'border-0 text-white hover:text-green-300 hover:underline focus:text-green-900 focus:leading-3 disabled:text-green-75 text-center',

    // linkGrey:
    //   'border border-grey-400 lg:border-0 rounded-md text-stone-600 hover:text-[#5b616b] hover:underline focus:text-[#444951] text-center'
  };

  const sizes = {
    small: "text-sm leading-3 py-2 px-4 ",
    medium: "text-[1.6rem] font-semibold px-[6.2rem] py-[2.4rem]",
    large:
      "text-sm leading-3 py-2 px-4 lg:text-base lg:leading-4 lg:py-3 lg:px-7",
    xlarge: "text-sm lg:text-base leading-4 py-2 px-4 lg:py-4 lg:px-8",
    xxlarge: "text-md leading-5 py-6 px-9",
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
        "w-full outline-none font-medium transition-all duration-300 flex items-center justify-center cursor-pointer",
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
