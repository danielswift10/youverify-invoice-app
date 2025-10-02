/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import EyeIcon from "../assets/icons/EyeIcon";
import { cn } from "../utils";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  properties?: any;
  errors?: any;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  required?: boolean;
  autoComplete?: boolean;
}

export default function Input({
  label,
  name,
  placeholder,
  type = "text",
  maxLength,
  properties,
  errors,
  disabled,
  required = false,
  className,
  defaultValue,
  autoComplete = true,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    if (type === "password") {
      setShowPassword((show) => !show);
      setInputType(inputType === "text" ? "password" : "text");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {label && (
        <label htmlFor={name} className="font-medium text-black leading-3">
          {label}
        </label>
      )}

      <div className="relative left-0">
        <input
          className={cn(
            "w-full rounded-[2rem] border border-[#dfe2e7] bg-white shadow-base outline-grey-200 outline-offset-2 py-[1.6rem] px-[2rem] text-black placeholder:text-[1.4rem] placeholder:text-grey-400",
            className
          )}
          type={inputType}
          name={name}
          id={name}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          autoComplete={autoComplete.toString()}
          defaultValue={defaultValue}
          {...properties}
          required={required}
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute top-[40%] right-8 outline-grey-300"
            onClick={togglePasswordVisibility}
          >
            {!showPassword ? <EyeIcon type="open" /> : <EyeIcon />}
          </button>
        )}
      </div>

      {errors && (
        <span className="text-[1.4rem] font-medium text-danger-100 leading-3">
          {errors?.message}
        </span>
      )}
    </div>
  );
}
