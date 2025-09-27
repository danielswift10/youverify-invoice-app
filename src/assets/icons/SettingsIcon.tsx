export interface IconProps {
  size?: "small" | "large";
}
export default function SettingsIcon({ size = "small" }: IconProps) {
  return size === "small" ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 9.10998V14.88C3 17 3 17 5 18.35L10.5 21.53C11.33 22.01 12.68 22.01 13.5 21.53L19 18.35C21 17 21 17 21 14.89V9.10998C21 6.99998 21 6.99999 19 5.64999L13.5 2.46999C12.68 1.98999 11.33 1.98999 10.5 2.46999L5 5.64999C3 6.99999 3 6.99998 3 9.10998Z"
        stroke="#697598"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.34"
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke="#697598"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 30.3667V49.6C10 56.6667 10 56.6667 16.6667 61.1667L35 71.7667C37.7667 73.3667 42.2667 73.3667 45 71.7667L63.3333 61.1667C70 56.6667 70 56.6667 70 49.6333V30.3667C70 23.3333 70 23.3333 63.3333 18.8333L45 8.23333C42.2667 6.63333 37.7667 6.63333 35 8.23333L16.6667 18.8333C10 23.3333 10 23.3333 10 30.3667Z"
        stroke="#373B47"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.34"
        d="M40 50C45.5228 50 50 45.5228 50 40C50 34.4772 45.5228 30 40 30C34.4772 30 30 34.4772 30 40C30 45.5228 34.4772 50 40 50Z"
        stroke="#373B47"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
