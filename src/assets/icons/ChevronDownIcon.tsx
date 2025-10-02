import type { IconProps } from "./SettingsIcon";

export default function ChevronDownIcon({ size = "small" }: IconProps) {
  return size === "small" ? (
    <svg
      width="9"
      height="6"
      viewBox="0 0 9 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.8077 5.3075L8.3377 1.7775C8.6277 1.4775 8.6277 1.0075 8.3377 0.7175C8.0477 0.4275 7.5677 0.4275 7.2777 0.7175L4.2777 3.7175L1.2777 0.7175C0.987701 0.4275 0.507701 0.4275 0.217701 0.7175C0.0782212 0.858638 0 1.04907 0 1.2475C0 1.44593 0.0782212 1.63636 0.217701 1.7775L3.7477 5.3075C3.8977 5.4575 4.0877 5.5275 4.2777 5.5275C4.4677 5.5275 4.6577 5.4575 4.8077 5.3075Z"
        fill="#697598"
      />
    </svg>
  ) : (
    <svg
      width="18"
      height="9"
      viewBox="0 0 18 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.92 0.950012L10.4 7.47001C9.63 8.24001 8.37 8.24001 7.6 7.47001L1.08 0.950012"
        stroke="#697598"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
