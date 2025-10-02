import { Helmet } from "react-helmet-async";
import BellIcon from "../../assets/icons/BellIcon";
import ChevronDownIcon from "../../assets/icons/ChevronDownIcon";

export default function DashboardHeader({ title }: { title: string }) {
  return (
    <>
      <Helmet>
        <title>{title} | Youverify</title>
      </Helmet>
      <div className="flex bg-background items-center justify-between h-[10rem] fixed w-[78%] border-b border-b-primary-300">
        <h2 className="font-medium text-[2.8rem] text-grey-600 uppercase tracking-wide">
          {title}
        </h2>
        <div className="flex items-center gap-[2.4rem]">
          <button className="flex items-center justify-center rounded-full bg-white p-8">
            <BellIcon />
          </button>
          <button className="rounded-[4rem] p-4 bg-white flex items-center">
            <div className="bg-primary-100 p-4 text-[1.4rem] font-bold rounded-full text-white">
              KO
            </div>
            <span className="p-[.8rem]">
              <ChevronDownIcon />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
