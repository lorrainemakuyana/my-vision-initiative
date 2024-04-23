import clsxm from "@/lib/utils/clsxm";
import { ImSpinner6 } from "react-icons/im";
import { FaPencil } from "react-icons/fa6";

export type ButtonProps = {
  color?: "purple" | "white";
  text: string;
  classes?: string;
  variant?: "get-started" | "default" | "share";
  onClick: () => any;
  outline?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
};

function Button({
  color = "purple",
  text,
  onClick,
  classes,
  variant,
  outline,
  disabled,
  isLoading,
}: ButtonProps) {
  const getClasses = () => {
    if (disabled) return "bg-gray-500 text-white border border-gray-500";

    switch (color) {
      case "purple":
        return "bg-purple text-white border border-purple";
      case "white":
        return "bg-white text-purple border border-white";
      default:
        return "bg-purple text-white border border-purple";
    }
  };

  const getOutlineClasses = () => {
    if (disabled) return "border-gray-500 text-gray-500 border";

    switch (color) {
      case "white":
        return "border border-white text-white hover:text-white hover:bg-purple";
      case "purple":
        return "border border-purple text-purple hover:text-white hover:bg-purple";
      default:
        return "border border-purple text-purple hover:text-white hover:bg-purple";
    }
  };

  return (
    <button
      disabled={disabled || isLoading}
      onClick={onClick}
      className={clsxm(
        outline ? getOutlineClasses() : getClasses(),
        "font-lato inline-flex flex-row items-center space-x-5 px-4 py-1.5 text-center text-sm font-normal tracking-wider",
        "relative transform justify-center rounded-md transition-transform hover:scale-105 disabled:cursor-not-allowed",
        classes,
      )}
    >
      {text}
      {variant == "get-started" && (
        <svg
          className="ml-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
      {isLoading && (
        <div
          className={clsxm(
            "absolute left-0 top-0 h-full w-full bg-white bg-opacity-5 backdrop-blur",
            "flex items-center justify-center",
          )}
        >
          <ImSpinner6 className="h-4 w-4 animate-spin" />
        </div>
      )}
    </button>
  );
}

export default Button;
