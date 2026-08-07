import { ButtonHTMLAttributes } from "react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export default function Button({
  children,
  variant = "default",
  ...props
}: Props) {
  const baseClasses = "rounded-xl font-semibold py-3 px-4 transition-all duration-200 shadow-sm";

  const defaultClasses = `
    bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700
    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none
  `;

  const outlineClasses = `
    border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500
    focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none
  `;

  return (
    <button
      {...props}
      className={`${baseClasses} ${variant === "outline" ? outlineClasses : defaultClasses}`}
    >
      {children}
    </button>
  );
}