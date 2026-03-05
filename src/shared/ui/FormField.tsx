import type { ReactNode } from "react";
interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string | null;
  children: ReactNode;
}

export function FormField({ id, label, required, hint, error, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[#b9adcf] mb-1">
        {label}
        {required ? <sup className="text-[#e2bf73] ml-1">*</sup> : null}
      </label>
      {children}
      {hint ? <p className="mt-1 text-xs text-[#b9adcf]/60">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}
