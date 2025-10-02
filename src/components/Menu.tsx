import { cn } from "../utils";

interface MenuItemProps {
  onClick?: () => void;
  icon?: React.ReactElement;
  children: React.ReactNode;
  className?: string;
}

function Menu({ children }: MenuItemProps) {
  return <div className="relative">{children}</div>;
}

function MenuItem({ onClick, children, className }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "uppercase py-[1.6rem] px-[1.2rem] text-left text-grey-500 text-[1.4rem] font-semibold hover:bg-grey-50 transition-all duration-300 rounded-[1.4rem]",
        className
      )}
    >
      {children}
    </button>
  );
}

Menu.Button = MenuItem;

export default Menu;
