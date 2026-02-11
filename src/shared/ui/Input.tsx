import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={
        "w-full mt-1 px-4 py-2 border border-[#A67C7C] rounded-md " +
        "focus:outline-none focus:ring-2 focus:ring-[#8C5A67] bg-white " +
        (props.className || "")
      }
    />
  );
}
