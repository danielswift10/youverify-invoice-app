import React from "react";
import login_mockup from "../../assets/images/login-mockup.png"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen grid grid-cols-[1.5fr_1fr] place-items-center">
      {children}
      <div className="h-screen w-full bg-primary-100 flex items-center">
        <img
        src={login_mockup}
        alt="login_mockup"
        className=""
        />
      </div>
    </section>
  );
}
