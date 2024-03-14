import { ReactNode } from "react";

type Props = {
  labelClass?: string;
  label: string;
  children: ReactNode;
};

export const WithInputLabel = ({ labelClass, label, children }: Props) => {
  return (
    <label className={labelClass ?? "flex flex-col my-2 w-full"}>
      <span className="text-sm text-white mb-2">{label}</span>
      {children}
    </label>
  );
};
