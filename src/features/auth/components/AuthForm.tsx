import type { FormEvent, ReactNode } from "react";
import { Button } from "../../../shared/ui/Button";

interface AuthFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  submitLabel: string;
  loading?: boolean;
  error?: string | null;
}

export function AuthForm({ onSubmit, children, submitLabel, loading = false, error }: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}

      {error && (
        <p className="text-sm text-red-300 bg-red-900/30 border border-red-500/30 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <Button type="submit" disabled={loading} className="w-full py-2.5 mt-2">
        {loading ? "Bitte warten…" : submitLabel}
      </Button>
    </form>
  );
}
