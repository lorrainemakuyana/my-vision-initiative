import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  color: "magenta" | "purple";
  outline?: boolean;
  className?: string;
}

export default function Button({
  text,
  onClick,
  color,
  outline = false,
  className = "",
}: ButtonProps) {
  const getButtonStyles = () => {
    const baseStyles =
      "px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";

    if (outline) {
      // Outline styles
      if (color == "magenta") {
        return `${baseStyles} border-2 border-magenta text-magenta bg-transparent hover:bg-magenta hover:text-white focus:ring-magenta`;
      } else {
        return `${baseStyles} border-2 border-purple text-purple bg-transparent hover:bg-purple hover:text-white focus:ring-purple`;
      }
    } else {
      // Filled styles
      if (color === "magenta") {
        return `${baseStyles} bg-magenta text-white hover:bg-magenta/90 hover:shadow-lg focus:ring-magenta`;
      } else {
        return `${baseStyles} bg-purple text-white hover:bg-purple/90 hover:shadow-lg focus:ring-purple`;
      }
    }
  };

  return (
    <button onClick={onClick} className={`${getButtonStyles()}  ${className}`}>
      {text}
    </button>
  );
}
