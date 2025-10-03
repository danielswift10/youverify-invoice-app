/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "../utils";

interface TextAreaProps {
  label?: string;
  name?: string;
  properties?: any;
  errors?: any;
  placeholder?: string;
  defaultValue?: string;
  maxLength?: number;
  rowCount?: number;
  disabled?: boolean;
  required?: boolean;
}

export default function Textarea({
  label,
  name,
  placeholder,
  maxLength,
  properties,
  errors,
  defaultValue,
  disabled,
  rowCount,
}: TextAreaProps) {
  return (
    <div className="w-full flex flex-col gap-5">
      {label && (
        <label
          htmlFor={name}
          className="font-medium tracking-wider text-black leading-3"
        >
          {label}
        </label>
      )}

      <textarea
        className={cn(
          "w-full rounded-[2rem] border border-[#dfe2e7] bg-white shadow-base tracking-wider outline-grey-200 outline-offset-2 py-[1.6rem] px-[2rem] text-black placeholder:text-[1.4rem] placeholder:text-grey-400"
        )}
        name={name}
        id={name}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
        rows={rowCount}
        {...properties}
      />

      {errors && (
        <span className="text-[1.4rem] font-medium text-danger-100 leading-3">
          {errors?.message}
        </span>
      )}
    </div>
  );
}
