import React from "react";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-[30rem_2.5fr] overflow-hidden">
      <Sidebar />
      <div className="overflow-y-auto bg-background h-screen px-16 pb-[2.2rem] space-y-16">
        {children}
      </div>
    </section>
  );
}
