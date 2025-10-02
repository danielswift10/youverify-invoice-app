import type { JSX } from "react";

export interface ISidebarLink {
  size?: "small" | "large";
  color?: "white" | "gray";
  variation?: "empty" | "filled";
}

export interface ISideBarData {
  title: string;
  icon: ({ size }: ISidebarLink) => JSX.Element;
  route: string;
}
