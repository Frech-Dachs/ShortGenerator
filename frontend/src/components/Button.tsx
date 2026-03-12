import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-brand-400/70 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-brand-500 text-white shadow-lg shadow-brand-600/20 hover:-translate-y-0.5 hover:bg-brand-400",
        variant === "secondary" &&
          "border border-white/10 bg-white/10 text-white hover:border-white/20 hover:bg-white/15",
        variant === "ghost" && "text-white/70 hover:bg-white/5 hover:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
