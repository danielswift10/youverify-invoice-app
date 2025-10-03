import type { JSX } from "react";

export interface ISidebarLink {
  size?: "small" | "large";
}

export interface ISideBarData {
  title: string;
  icon: ({ size }: ISidebarLink) => JSX.Element;
  route: string;
}
