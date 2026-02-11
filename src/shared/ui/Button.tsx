import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={
        "px-4 py-2 rounded-md bg-[#8C5A67] text-white text-sm font-medium " +
        "hover:bg-[#A67C7C] disabled:opacity-60 transition " +
        (rest.className || "")
      }
    >
      {children}
    </button>
  );
}
