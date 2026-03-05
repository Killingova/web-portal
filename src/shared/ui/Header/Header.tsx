import type { ReactElement, ReactNode } from "react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { LogoTitle } from "./LogoTitle";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps): ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 px-3 pt-3 md:px-6 md:pt-4"
    >
      <div
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-500 ${
          isScrolled
            ? "border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl"
            : "border-white/5 bg-transparent shadow-none backdrop-blur-sm"
        }`}
      >
        <div className="relative flex items-center justify-between gap-2 sm:gap-3 px-3 py-2.5 md:px-6 md:py-3">
          <LogoTitle />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLinks />
          </nav>

          {/* Optionale Auth-Aktionen (Login/Logout etc.) */}
          {children && (
            <div className="hidden md:flex items-center gap-2">
              {children}
            </div>
          )}

          {/* Mobile Burger */}
          <button
            className="md:hidden inline-flex h-11 w-11 md:h-9 md:w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 backdrop-blur-sm text-[#f2eeff] transition-colors hover:bg-white/15 hover:text-white"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Menü öffnen oder schließen"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <MobileMenu menuOpen={menuOpen} closeMenu={closeMenu} />
        </div>
      </div>
    </motion.header>
  );
}
