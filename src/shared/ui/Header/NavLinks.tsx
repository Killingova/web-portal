import type { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "./menuData";

const base = "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200";
const desktop = "text-[#ddd2f5] hover:text-white hover:bg-[#6f52cc]/35";
const mobile = "w-full justify-start text-[#efe8ff] hover:text-white hover:bg-[#6f52cc]/30";
const active = "bg-[#6f52cc]/55 text-white shadow-[0_8px_20px_rgba(0,0,0,0.25)]";

interface NavLinksProps {
  onLinkClick?: () => void;
  isMobile?: boolean;
}

export function NavLinks({ onLinkClick = () => {}, isMobile = false }: NavLinksProps): ReactElement {
  return (
    <>
      {navLinks.map(({ name, path, icon: Icon }) => (
        <NavLink
          key={name}
          to={path}
          end={path === "/"}
          className={({ isActive }) =>
            [base, isMobile ? mobile : desktop, isActive ? active : ""].join(" ")
          }
          onClick={onLinkClick}
        >
          <Icon size={18} />
          <span>{name}</span>
        </NavLink>
      ))}
    </>
  );
}
