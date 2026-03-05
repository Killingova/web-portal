import type { ButtonHTMLAttributes, ReactNode } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
}

export function Button({ children, variant = "primary", ...rest }: ButtonProps) {
  const base = "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-50 ";
  const variants = {
    primary:
      "bg-gradient-to-r from-[#6948cf] to-[#8f77e0] text-white hover:brightness-110 shadow-lg shadow-[#6948cf]/25 ",
    ghost:
      "border border-[#4c3d79] text-[#ddd2f5] hover:bg-[#6f52cc]/20 backdrop-blur-sm ",
  };
  return (
    <button {...rest} className={base + variants[variant] + (rest.className || "")}>
      {children}
    </button>
  );
}
