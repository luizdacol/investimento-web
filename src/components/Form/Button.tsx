import { MouseEvent, ReactNode } from "react";

type ButtonProps = {
  buttonType: "button" | "submit";
  children: ReactNode;
  handleOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

function Button({ buttonType, children, handleOnClick }: ButtonProps) {
  return (
    <button
      className="bg-emerald-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm mr-4"
      type={buttonType}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
}

export default Button;
