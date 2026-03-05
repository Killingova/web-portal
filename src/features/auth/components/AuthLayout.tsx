import type { ReactNode } from "react";
import wallpaper from "../../../assets/logo/wallpaperR.png";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Hintergrund */}
      <img
        src={wallpaper}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#0d1117]/75 backdrop-blur-sm" />

      {/* Glass Card */}
      <section className="relative z-10 w-full max-w-md sm:max-w-lg mx-4 p-6 sm:p-8
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-2xl shadow-2xl shadow-black/40">

        <header className="mb-6 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f2eeff]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-[#b9adcf]">{subtitle}</p>
          )}
        </header>

        <main>{children}</main>

        {footer && (
          <footer className="mt-6 pt-4 border-t border-white/10 text-sm text-center text-[#b9adcf]">
            {footer}
          </footer>
        )}
      </section>
    </div>
  );
}
