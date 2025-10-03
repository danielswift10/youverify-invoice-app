import { cn } from "../utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Option {
  name: string | number;
  value: string | number;
}

interface SelectProps {
  className?: string;
  label?: string;
  options: readonly Option[];
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  name?: string;
  defaultValue?: string;
  properties?: any;
  errors?: any;
}

export default function Select({
  label,
  options,
  disabled,
  placeholder,
  name,
  errors,
  properties,
  defaultValue,
  className,
}: SelectProps) {
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

      <select
        className={cn(
          "w-full rounded-[2rem] border border-[#dfe2e7] bg-white shadow-base tracking-wider outline-grey-200 outline-offset-2 py-[1.6rem] px-[2rem] text-black placeholder:text-[1.4rem] placeholder:text-grey-400",
          className
        )}
        defaultValue={defaultValue}
        name={name}
        id={name}
        disabled={disabled}
        {...properties}
      >
        {!!placeholder && (
          <option className="text-grey-400" value="">
            {placeholder}
          </option>
        )}

        {options.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>

      {!!errors && (
        <span className="text-[1.4rem] font-medium text-danger-100 leading-3">
          {errors?.message}
        </span>
      )}
    </div>
  );
}
