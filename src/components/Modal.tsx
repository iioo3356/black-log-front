import clsx from "clsx";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-[16px]"
      onClick={onClose}
    >
      <div
        className={clsx(
          "w-full max-w-lg rounded-[8px] bg-stone-100 p-[16px]",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          {title && (
            <div className="text-[16px] font-medium text-stone-700">
              {title}
            </div>
          )}
          <button
            className="text-stone-500 hover:text-stone-700"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-[12px]">{children}</div>
      </div>
    </div>,
    document.body,
  );
};
