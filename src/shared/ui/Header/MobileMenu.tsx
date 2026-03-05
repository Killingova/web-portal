import type { ReactElement } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLinks } from "./NavLinks";

interface MobileMenuProps {
  menuOpen: boolean;
  closeMenu: () => void;
}

export function MobileMenu({ menuOpen, closeMenu }: MobileMenuProps): ReactElement {
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="md:hidden absolute left-0 right-0 top-full mt-2 z-40"
        >
          <div className="rounded-xl border border-white/10 bg-white/5 p-2 shadow-xl backdrop-blur-xl">
            <div className="flex flex-col gap-1">
              <NavLinks onLinkClick={closeMenu} isMobile />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
