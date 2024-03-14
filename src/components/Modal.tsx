import { ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

type Props = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  className?: string;
};

export const Modal = ({ isOpen, onClose, children, className }: Props) => {
  const modalRootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    modalRootRef.current = document.getElementById("root");
  }, []);

  if (!isOpen || !modalRootRef.current) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 w-full h-full bg-black bg-opacity-20 z-2"
        onClick={onClose}
      ></div>
      <div
        className={
          className ??
          "bg-white p-4 rounded-lg shadow-lg z-3 relative w-1/3 flex flex-col"
        }
      >
        <div className="w-full flex flex-col ">
          <div className="min-w-fit md:w-full flex flex-col items-center mb-4">
            {children}
          </div>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 "
            onClick={onClose}
          >
            Let's start a new game!
          </button>
        </div>
      </div>
    </div>,
    modalRootRef.current
  );
};
