import type { InputHTMLAttributes } from "react";
type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={
        "w-full mt-1 px-4 py-2.5 rounded-lg " +
        "bg-white/5 border border-[#4c3d79]/70 " +
        "text-[#f2eeff] placeholder-[#b9adcf]/60 " +
        "backdrop-blur-sm " +
        "focus:outline-none focus:border-[#6f52cc] focus:ring-1 focus:ring-[#6f52cc]/50 " +
        "transition-colors duration-200 " +
        (props.className || "")
      }
    />
  );
}
