// src/features/auth/components/AuthForm.tsx
import React, { FormEvent } from "react";
import { Button } from "../../../shared/ui/Button";

interface AuthFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  submitLabel: string;
  loading?: boolean;
  error?: string | null;
}

export function AuthForm({
  onSubmit,
  children,
  submitLabel,
  loading = false,
  error,
}: AuthFormProps) {
  const isDisabled = loading;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {children}

      {error && (
        <p className="text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
          {error}
        </p>
      )}

      <div className="pt-2">
        <Button type="submit" disabled={isDisabled} className="w-full">
          {loading ? "Bitte warten..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
