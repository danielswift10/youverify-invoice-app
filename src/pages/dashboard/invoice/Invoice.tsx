import DashboardHeader from "../components/DashboardHeader";
import { Outlet } from "react-router-dom";

export default function Invoice() {
  return (
    <>
      <DashboardHeader title="Invoice" />
      <Outlet />
    </>
  );
}
