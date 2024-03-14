import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const StepWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 p-6 rounded-2xl bg-gray-800">
      {children}
    </div>
  );
};
