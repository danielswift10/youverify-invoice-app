import React from "react";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[30rem_2.5fr] overflow-hidden">
      <Sidebar />
      <div className="overflow-y-auto overflow-x-hidden bg-background h-screen px-5 lg:px-8 xl:px-16 pb-[2.2rem] space-y-16">
        {children}
      </div>
    </section>
  );
}
