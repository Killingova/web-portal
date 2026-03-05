import type { ReactElement, ReactNode } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

const sections = [
  {
    id: "intro",
    title: "Bewusstseinstheorie",
    color: "from-[#111826] to-[#2a1f44]",
    body: (
      <>
        <p className="mb-4 text-lg text-[#f2eeff]">
          In einer Welt voller Gegensätze und Unsicherheiten suchen immer mehr Menschen nach Wegen,
          tiefere Harmonie und Klarheit zu finden. Der <b>„Pfad des Paradoxons"</b> bietet eine
          bahnbrechende Antwort: ein Modell, das moderne Physik, systemische Ansätze und spirituelles
          Denken vereint – und das Bewusstsein als <i>aktiven</i> Gestalter der Realität beschreibt.
        </p>
        <p className="text-base text-[#f2eeff]">
          Bewusstsein formt, lenkt und wandelt Energiefelder. Es beeinflusst persönliche Entwicklung{" "}
          <i>und</i> kollektives Erleben. Damit verbindet der Pfad individuelle Transformation und
          kosmische Kohärenz in einem Rahmen.
        </p>
      </>
    ),
  },
  {
    id: "felder",
    title: "Die sieben Felder",
    color: "from-[#171f33] to-[#2a2145]",
    body: (
      <div className="space-y-4">
        {[
          { name: "Oben (Kosmos)",     desc: "Archetypische Weisheit, höchste Schwingung. Inspiration & spirituelle Führung.",      qp: "Wellenfelder höherer Ordnung, Superpositionseffekte." },
          { name: "Unten (Erde)",      desc: "Tiefe & Schatten, kollektives Unbewusstes. Fundament & Herkunft.",                    qp: "Gravitation, Massebildung, kollektives Gedächtnis." },
          { name: "Links (Westen)",    desc: "Emotion & Heilung vergangener Erfahrungen.",                                          qp: "Informationsflüsse, Interferenzmuster." },
          { name: "Rechts (Osten)",    desc: "Mut, Handlung, kreative Expansion.",                                                  qp: "Energieimpuls, Kausalitätsvektoren." },
          { name: "Vorne (Mond/Nord)", desc: "Intuition & Resonanz, jenseits des Verstands.",                                       qp: "Quantenverschränkung, Rezeptivität." },
          { name: "Hinten (Sonne/Süd)",desc: "Ausdruck innerer Frequenz – Manifestation.",                                          qp: "Photonenfeld, Eigenfrequenz." },
          { name: "Zentrum (Herzraum)",desc: "Bewusster Beobachter – Kollaps der Wellenfunktion.",                                  qp: "Entscheidung & Wahrnehmung als Schöpfungsakt." },
        ].map((f) => (
          <div key={f.name} className="rounded-xl bg-[#1a2031]/85 p-4">
            <h4 className="font-semibold text-[#f2eeff]">{f.name}</h4>
            <p className="text-sm mb-1 text-[#f2eeff]">{f.desc}</p>
            <p className="text-xs italic text-[#b9adcf]">Quanten-Parallele: {f.qp}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "transformation",
    title: "Schlüssel zur Transformation",
    color: "from-[#1c243a] to-[#2b3554]",
    body: (
      <ul className="list-disc space-y-4 pl-5 text-[#f2eeff]">
        <li><b>Selbstbewusstsein</b>: Stabilität im Zentrum, Beobachten ohne Urteil.<br /><span className="italic text-sm">Blockaden: Ich-Verlust, Ego-Fixierung.</span></li>
        <li><b>Willensfreiheit</b>: Energie frei zwischen Feldern bewegen, Verantwortung übernehmen.<br /><span className="italic text-sm">Blockaden: Schuldgefühle, Machtkämpfe.</span></li>
        <li><b>Reflexion</b>: Erfahrung integrieren, Mitgefühl üben.<br /><span className="italic text-sm">Blockaden: Mentale Starre, endlose Selbstkritik.</span></li>
      </ul>
    ),
  },
  {
    id: "materie",
    title: "Dunkle Materie",
    color: "from-[#241d3f] to-[#342a57]",
    body: (
      <p className="text-[#f2eeff]">
        Verliert Bewusstsein seine Kohärenz, entstehen Blockaden: eine Art <i>schwarze energetische
        Materie</i>. Sie verzerrt die Realität – ist jedoch zugleich gespeicherte Kraft. Durch
        bewusste Arbeit wird dieses Potenzial reaktiviert: Die Energie fließt, neue Realität entsteht.
      </p>
    ),
  },
  {
    id: "kohaerenz",
    title: "Transformation durch Kohärenz",
    color: "from-[#2a223d] to-[#3a3153]",
    body: (
      <p className="text-[#f2eeff]">
        Wenn die inneren Baustellen mit den sieben Feldern harmonieren, entfaltet sich Selbst-{" "}
        <i>und</i> Kollektiv-Wachstum fast mühelos. Der Mensch wird Feldwandler: Er erkennt
        Blockaden, balanciert Präsenz und gestaltet Wirklichkeit bewusst.
      </p>
    ),
  },
  {
    id: "schluss",
    title: "Eine neue Sicht auf das Leben",
    color: "from-[#2a1f44] to-[#131a2b]",
    body: (
      <p className="text-[#f2eeff]">
        Der Pfad des Paradoxons liefert keine einfachen Antworten, sondern lädt ein, das Leben als{" "}
        <b>kreativen, dynamischen Prozess</b> zu begreifen. Jede Entscheidung beeinflusst das
        kollektive Bewusstseinsfeld. Herausforderungen werden zu Chancen, Paradoxien zu Portalen –
        für individuelle Freiheit und kosmische Verbundenheit.
      </p>
    ),
  },
];

interface SectionProps {
  open: boolean;
  toggle: () => void;
  title: string;
  body: ReactNode;
  color: string;
}

function Section({ open, toggle, title, body, color }: SectionProps): ReactElement {
  return (
    <motion.section
      initial={false}
      animate={{ height: open ? "auto" : 64 }}
      className={`rounded-2xl bg-gradient-to-r ${color} overflow-hidden shadow-lg`}
    >
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between p-4 md:p-6 backdrop-blur-sm"
      >
        <h2 className="text-xl font-bold text-[#f2eeff] md:text-2xl">{title}</h2>
        {open ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-6 md:px-6 md:pb-8"
          >
            {body}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export function UeberPage(): ReactElement {
  const [openId, setOpenId] = useState<string | null>("intro");

  return (
    <main className="min-h-screen bg-[#0d1117] px-4 py-8 md:px-12 md:py-16 space-y-6 pb-16">
      {sections.map(({ id, title, body, color }) => (
        <Section
          key={id}
          title={title}
          body={body}
          color={color}
          open={openId === id}
          toggle={() => setOpenId(openId === id ? null : id)}
        />
      ))}
    </main>
  );
}
