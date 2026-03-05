import type { ReactElement } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok, FaTelegram, FaEnvelope } from "react-icons/fa6";

export function Footer(): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
      className={`fixed bottom-0 left-0 w-full transition-all duration-500 ease-in-out
        ${isOpen ? "h-64 bg-gradient-to-t from-[#111826] to-[#2a1f44]" : "h-10 bg-transparent backdrop-blur-sm"}
        border-t border-[#57468f] shadow-xl z-50 cursor-pointer`}
    >
      <div className="max-w-6xl mx-auto flex flex-col justify-center h-full px-6">

        {/* Sichtbare Leiste */}
        <div className="flex justify-between items-center text-sm text-[#b9adcf] h-10">
          <p className="drop-shadow-md">
            © {year} Pfad des Paradoxons | Kristin Zhivkova
          </p>
          <div className="hidden md:flex space-x-4">
            <Link to="/impressum" className="hover:underline">Impressum</Link>
            <Link to="/datenschutz" className="hover:underline">Datenschutz</Link>
            <Link to="/kontakt" className="hover:underline">Kontakt</Link>
          </div>
        </div>

        {/* Aufgeklappter Bereich */}
        {isOpen && (
          <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-6 text-[#f2eeff] transition-opacity duration-300 opacity-100">
            <p className="text-center text-sm max-w-md">
              Spielerische Reise durch Paradoxien, Mystik & Psychologie. Entdecke innere Welten voller Symbole & Zahlen.
            </p>

            <div className="flex flex-col items-center gap-2 md:flex-row md:gap-5">
              <div className="flex space-x-5 text-2xl">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-[#dcb764] transition transform hover:scale-110"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="hover:text-[#dcb764] transition transform hover:scale-110"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaTiktok />
                </a>
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="hover:text-[#dcb764] transition transform hover:scale-110"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaTelegram />
                </a>
                <a
                  href="mailto:kontakt@pfad-des-paradoxons.de"
                  aria-label="E-Mail"
                  className="hover:text-[#dcb764] transition transform hover:scale-110"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaEnvelope />
                </a>
              </div>

              {/* Footer-Links mobil */}
              <div className="flex md:hidden space-x-4 mt-2 text-sm">
                <Link to="/impressum" className="hover:underline" onClick={(e) => e.stopPropagation()}>Impressum</Link>
                <Link to="/datenschutz" className="hover:underline" onClick={(e) => e.stopPropagation()}>Datenschutz</Link>
                <Link to="/kontakt" className="hover:underline" onClick={(e) => e.stopPropagation()}>Kontakt</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
