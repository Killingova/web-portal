import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string | null;
  children: React.ReactNode;
}

export function FormField({ id, label, required, hint, error, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#260101] mb-1">
        {label}
        {required ? <sup className="text-red-500 ml-1">*</sup> : null}
      </label>
      {children}
      {hint ? <p className="mt-1 text-xs text-[#260101]/70">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
