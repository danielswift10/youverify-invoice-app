import type { IconProps } from "./SettingsIcon";

export default function ProfileUserIcon({ size = "small" }: IconProps) {
  return size === "small" ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.16006 10.87C9.06006 10.86 8.94006 10.86 8.83006 10.87C6.45006 10.79 4.56006 8.84 4.56006 6.44C4.56006 3.99 6.54006 2 9.00006 2C11.4501 2 13.4401 3.99 13.4401 6.44C13.4301 8.84 11.5401 10.79 9.16006 10.87Z"
        stroke="#697598"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11C16.46 10.99 16.37 10.99 16.28 11"
        stroke="#697598"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.15997 14.56C1.73997 16.18 1.73997 18.82 4.15997 20.43C6.90997 22.27 11.42 22.27 14.17 20.43C16.59 18.81 16.59 16.17 14.17 14.56C11.43 12.73 6.91997 12.73 4.15997 14.56Z"
        stroke="#697598"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M18.3401 20C19.0601 19.85 19.7401 19.56 20.3001 19.13C21.8601 17.96 21.8601 16.03 20.3001 14.86C19.7501 14.44 19.0801 14.16 18.3701 14"
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
        d="M30.5333 36.2334C30.2 36.2 29.8 36.2 29.4333 36.2334C21.5 35.9667 15.2 29.4667 15.2 21.4667C15.2 13.3 21.8 6.66669 30 6.66669C38.1666 6.66669 44.7999 13.3 44.7999 21.4667C44.7666 29.4667 38.4666 35.9667 30.5333 36.2334Z"
        stroke="#373B47"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M54.7001 13.3333C61.1667 13.3333 66.3667 18.5666 66.3667 25C66.3667 31.3 61.3667 36.4333 55.1334 36.6666C54.8667 36.6333 54.5667 36.6333 54.2667 36.6666"
        stroke="#373B47"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8667 48.5333C5.79998 53.9333 5.79998 62.7333 13.8667 68.1C23.0333 74.2333 38.0667 74.2333 47.2333 68.1C55.3 62.7 55.3 53.9 47.2333 48.5333C38.1 42.4333 23.0667 42.4333 13.8667 48.5333Z"
        stroke="#373B47"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M61.1333 66.6667C63.5333 66.1667 65.8 65.2 67.6666 63.7667C72.8666 59.8667 72.8666 53.4334 67.6666 49.5334C65.8333 48.1334 63.6 47.2 61.2333 46.6667"
        stroke="#373B47"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
