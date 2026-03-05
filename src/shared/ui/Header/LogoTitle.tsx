import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/LOGOBLACK.png";

export function LogoTitle(): ReactElement {
  return (
    <Link to="/" className="group flex min-w-0 items-center gap-2 sm:gap-3 md:gap-4">
      <span className="shrink-0">
        <img
          src={logo}
          alt="Pfad des Paradoxons"
          className="h-9 sm:h-10 md:h-14 w-auto drop-shadow-md brightness-0 invert transition-transform duration-300 group-hover:scale-105"
        />
      </span>
      <h1
        className="text-[1.15rem] sm:text-3xl md:text-[2.1rem] leading-[0.95] sm:leading-none font-bold text-[#f2eeff]"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        <span className="block sm:inline">Pfad des</span>
        <span className="block sm:inline sm:ml-1">Paradoxons</span>
      </h1>
    </Link>
  );
}
