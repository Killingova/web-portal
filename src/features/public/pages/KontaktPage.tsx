import type { ReactElement } from "react";
import { useState } from "react";
export function KontaktPage(): ReactElement {
  const [name, setName] = useState("");
  const [adresse, setAdresse] = useState("");
  const [nachricht, setNachricht] = useState("");

  function handleSubmit(): void {
    const subject = encodeURIComponent("Kontaktanfrage von Pfad des Paradoxons");
    const body = encodeURIComponent(
      `Nachricht:\n${nachricht}\n\nName: ${name}\nAdresse / Rückrufnummer: ${adresse}`
    );
    window.location.href = `mailto:kontakt@pfad-des-paradoxons.de?subject=${subject}&body=${body}`;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-[#f2eeff]">
      <div className="rounded-2xl bg-gradient-to-b from-[#141c2f] to-[#0d1117] border border-[#4c3d79] p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#e4c070]">Kontakt</h1>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>Wenn du Fragen, Anregungen oder Feedback hast, freue ich mich, von dir zu hören.</p>
          <p>
            Du kannst mir gerne eine Nachricht hinterlassen. Falls du eine Rückmeldung möchtest,
            gib bitte deine E-Mail oder Telefonnummer an.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Dein Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-[#4c3d79] bg-[#1c2540] px-4 py-3 text-[#f2eeff] placeholder-[#b9adcf] focus:outline-none focus:border-[#6f52cc]"
          />
          <input
            type="text"
            placeholder="E-Mail oder Rückrufnummer"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            className="w-full rounded-lg border border-[#4c3d79] bg-[#1c2540] px-4 py-3 text-[#f2eeff] placeholder-[#b9adcf] focus:outline-none focus:border-[#6f52cc]"
          />
          <textarea
            placeholder="Deine Nachricht"
            value={nachricht}
            onChange={(e) => setNachricht(e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-[#4c3d79] bg-[#1c2540] px-4 py-3 text-[#f2eeff] placeholder-[#b9adcf] focus:outline-none focus:border-[#6f52cc] resize-none"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#6f52cc] text-white px-6 py-3 rounded-lg hover:bg-[#8a6de0] transition font-semibold"
          >
            Nachricht senden
          </button>
        </div>
      </div>
    </div>
  );
}
