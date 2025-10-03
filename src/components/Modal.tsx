import { useEffect, useRef } from "react";
import { cn } from "../utils";
import { setModalType } from "../store";
import CloseIcon from "../assets/icons/CloseIcon";

interface ModalProps {
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
}

export default function Modal({ className, children, isOpen }: ModalProps) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClose = () => {
      setModalType("CLOSE_MODAL");
    };

    const closeOnEscapeKey = (e: { key: string }) =>
      e.key === "Escape" ? handleClose?.() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, []);

  return (
    <section id="modal">
      <aside
        className={cn(
          "bg-black/25 space-y-[.8rem] opacity-0 pointer-events-none fixed inset-0 z-50 grid place-content-center transition-all duration-300 ease-linear px-0 sm:px-0",
          {
            "opacity-100 pointer-events-auto": isOpen,
          }
        )}
        ref={modalRef}
      >
        <div className="w-full flex justify-end">
          <button
            onClick={() => setModalType("CLOSE_MODAL")}
            className="w-12 md:w-24 h-12 md:h-24 bg-white rounded-full flex items-center justify-center"
          >
            <CloseIcon />
          </button>
        </div>
        <section
          className={cn(
            "bg-white translate-x-full p-6 lg:p-16 w-full xl:w-[133.4rem] rounded-[3rem] lg:rounded-[4rem] transition-all ease-linear duration-300 delay-100 mx-auto",
            {
              "translate-x-0": isOpen,
            },
            className
          )}
          role="dialog"
        >
          {children}
        </section>
      </aside>
    </section>
  );
}
