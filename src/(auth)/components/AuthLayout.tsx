import React from "react";
import login_mockup from "../../assets/images/login-mockup.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] place-items-center">
      <div className="flex flex-col gap-[3rem] w-full px-5 sm:w-[44rem]">
        {children}
      </div>
      <figure className="h-screen hidden lg:flex w-full bg-primary-100 items-center">
        <img src={login_mockup} alt="login_mockup" className="" />
      </figure>
    </section>
  );
}
