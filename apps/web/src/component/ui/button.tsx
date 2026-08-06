import { ButtonHTMLAttributes } from "react";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition"
    >
      {children}
    </button>
  );
}