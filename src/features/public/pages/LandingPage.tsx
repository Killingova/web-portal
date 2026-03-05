import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../../shared/ui/Header";
import { Footer } from "../../../shared/ui/Footer";
import { HeroBereich } from "../components/HeroBereich";

export function LandingPage(): ReactElement {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f2eeff] flex flex-col">
      {/* Header liegt über dem Hero */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <Header>
          <Link
            className="px-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm text-sm font-semibold text-[#ddd2f5] hover:bg-white/15 transition-all duration-200"
            to="/login"
          >
            Anmelden
          </Link>
          <Link
            className="px-4 py-2 rounded-lg border border-[#9b7fe8]/40 bg-[#6f52cc]/60 backdrop-blur-sm text-white text-sm font-semibold hover:bg-[#6f52cc]/80 transition-all duration-200"
            to="/register"
          >
            Registrieren
          </Link>
        </Header>
      </div>

      {/* Hero — voller Viewport */}
      <HeroBereich />

      {/* Content-Bereich unterhalb des Hero */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-16 pb-16">
        <section className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-5">
            <p className="uppercase text-xs tracking-[0.2em] text-[#9b7fe8]">Deine Plattform</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#f2eeff]">
              Struktur trifft Intuition
            </h2>
            <p className="text-[#b9adcf] max-w-xl">
              Legungen, Numerologie, Reflexion — systematisch gespeichert und jederzeit abrufbar.
              Dein persönlicher Entwicklungsweg mit Verlauf, Tiefe und Datensouveränität.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                className="px-5 py-3 rounded-lg border border-[#9b7fe8]/40 bg-[#6f52cc]/60 backdrop-blur-sm text-white font-semibold hover:bg-[#6f52cc]/80 transition-all duration-200"
                to="/register"
              >
                Jetzt starten
              </Link>
              <Link
                className="px-5 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm text-[#ddd2f5] font-semibold hover:bg-white/15 transition-all duration-200"
                to="/login"
              >
                Bereits Kunde
              </Link>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-3">
            <h3 className="text-xl font-semibold text-[#f2eeff]">Was dich erwartet</h3>
            <ul className="text-sm space-y-2 text-[#b9adcf]">
              <li>✦ Tarot-Legungen mit Verlaufsspeicherung</li>
              <li>✦ Numerologie und Persönlichkeitsanalyse</li>
              <li>✦ Chakra, Lebensbaum, Keltisches Kreuz und mehr</li>
              <li>✦ Sichere Tenant-Isolation — deine Daten gehören dir</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
