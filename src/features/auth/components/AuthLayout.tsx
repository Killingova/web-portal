// src/features/auth/components/AuthLayout.tsx
import React from "react";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#260101]">
      <section className="w-full max-w-md sm:max-w-lg p-6 sm:p-8 bg-[#DCDEF2] rounded-xl shadow-lg border border-[#A67C7C]">
        <header className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#260101]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-[#260101]/80">{subtitle}</p>
          )}
        </header>

        <main>{children}</main>

        {footer && (
          <footer className="mt-6 pt-4 border-t border-[#A67C7C]/40 text-sm text-center text-[#260101]/80">
            {footer}
          </footer>
        )}
      </section>
    </div>
  );
}
