import React from "react";

interface InvoiceActionsCardProps {
  title: string;
  subtitle: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}
export const InvoiceActionsCard = ({
  title,
  subtitle,
  onClick,
  icon,
}: InvoiceActionsCardProps) => {
  return (
    <article
      onClick={onClick}
      className="rounded-[2.4rem] bg-white py-[3.2rem] px-16 space-y-[1.6rem] group hover:bg-primary-100"
    >
      {icon}
      <hgroup>
        <h4 className="text-grey-600 font-medium text-[2.2rem] group-hover:text-white">
          {title}
        </h4>
        <p className="text-grey-500 text-[1.4rem] group-hover:text-white">
          {subtitle}
        </p>
      </hgroup>
    </article>
  );
};
