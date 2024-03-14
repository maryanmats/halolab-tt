interface Props {
  className?: string;
  label: string;
  disable?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button = ({
  className = "",
  label,
  disable = false,
  onClick,
  type,
}: Props) => {
  return (
    <button
      className={getStyles(className, disable)}
      disabled={disable}
      onClick={onClick}
      type={type ?? "button"}
    >
      {label}
    </button>
  );
};

const getStyles = (className: string, disable: boolean) => {
  if (className) {
    return className;
  }

  return `w-40 font-bold bg-sky-500 rounded-xl p-2 uppercase text-gray-100 transition duration-300 hover:bg-sky-700 ${
    disable ? "disabled:opacity-25 pointer-events-none" : ""
  }`;
};
