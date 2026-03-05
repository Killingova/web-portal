import { Home, Info, Hash, Mail, type LucideIcon } from "lucide-react";

export interface NavLink {
  name: string;
  path: string;
  icon: LucideIcon;
}

export const navLinks: NavLink[] = [
  { name: "Start",       path: "/",           icon: Home },
  { name: "Über",        path: "/ueber",       icon: Info },
  { name: "Numerologie", path: "/numerologie", icon: Hash },
  { name: "Kontakt",     path: "/kontakt",     icon: Mail },
];
