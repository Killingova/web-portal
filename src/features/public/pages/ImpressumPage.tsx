import type { ReactElement } from "react";
export function ImpressumPage(): ReactElement {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-[#f2eeff]">
      <div className="rounded-2xl bg-gradient-to-b from-[#141c2f] to-[#0d1117] border border-[#4c3d79] p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#e4c070]">Impressum</h1>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            <strong>Angaben gemäß § 5 TMG:</strong><br />
            Kristin Zhivkova<br />
            Berner Koppel 8<br />
            22159 Hamburg, Deutschland
          </p>
          <p>
            <strong>Kontakt:</strong><br />
            E-Mail:{" "}
            <a href="mailto:kontakt@pfad-des-paradoxons.de" className="text-[#e2bf73] underline">
              kontakt@pfad-des-paradoxons.de
            </a><br />
            Telefon: +49 151 19495232
          </p>
          <p>
            <strong>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</strong><br />
            Kristin Zhivkova
          </p>
          <p>
            Dieses Projekt ist ein rein privates, nicht-kommerzielles Angebot. Es werden keine Produkte
            oder Dienstleistungen verkauft. Keine kommerzielle Nutzung oder Werbung.
          </p>
          <p>
            <strong>Haftung für Inhalte:</strong><br />
            Ich bemühe mich, alle Inhalte auf dieser Seite sorgfältig zu prüfen und aktuell zu halten.
            Dennoch kann ich keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität übernehmen.
            Nach §§ 8 bis 10 TMG bin ich nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
            Tätigkeit hinweisen.
          </p>
          <p>
            <strong>Haftung für Links:</strong><br />
            Diese Webseite kann Links zu externen Webseiten Dritter enthalten, auf deren Inhalte ich
            keinen Einfluss habe. Für diese Inhalte wird daher keine Haftung übernommen.
          </p>
          <p>
            <strong>Urheberrecht:</strong><br />
            Alle durch mich erstellten Inhalte unterliegen dem deutschen Urheberrecht. Eine
            Vervielfältigung oder Verbreitung ist nur mit schriftlicher Zustimmung gestattet.
            Inhalte Dritter sind als solche gekennzeichnet.
          </p>
        </div>
      </div>
    </div>
  );
}
