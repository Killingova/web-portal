import type { ReactElement } from "react";
export function DatenschutzPage(): ReactElement {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-[#f2eeff]">
      <div className="rounded-2xl bg-gradient-to-b from-[#141c2f] to-[#0d1117] border border-[#4c3d79] p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#e4c070]">Datenschutz</h1>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            <strong>Datenschutzerklärung</strong><br />
            Der Schutz Ihrer persönlichen Daten ist mir ein besonderes Anliegen. In dieser
            Datenschutzerklärung informiere ich Sie darüber, welche Daten auf dieser Webseite
            erhoben, verarbeitet und genutzt werden.
          </p>
          <p>
            <strong>Erhebung und Verarbeitung personenbezogener Daten:</strong><br />
            Bei jedem Zugriff auf diese Webseite werden automatisch Daten wie die IP-Adresse,
            Browsertyp, Betriebssystem und Zugriffszeiten erhoben. Diese Daten dienen
            ausschließlich der Fehlerdiagnose und Verbesserung der Seite.
          </p>
          <p>
            <strong>Cookies:</strong><br />
            Diese Seite verwendet keine Cookies, die personenbezogene Daten speichern. Sollten
            Cookies zum Einsatz kommen, werde ich Sie darüber in einer aktualisierten Erklärung
            informieren.
          </p>
          <p>
            <strong>Externe Links:</strong><br />
            Diese Webseite enthält Links zu externen Webseiten. Für den Inhalt und die
            Datenschutzpraktiken dieser Seiten bin ich nicht verantwortlich.
          </p>
          <p>
            <strong>Kontaktaufnahme:</strong><br />
            Wenn Sie mir per E-Mail schreiben, werden Ihre Angaben aus der E-Mail inklusive aller
            darin enthaltenen Daten gespeichert, um Ihre Anfrage bearbeiten zu können. Diese Daten
            werden nicht an Dritte weitergegeben.
          </p>
          <p>
            <strong>Rechte der betroffenen Personen:</strong><br />
            Sie haben das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten sowie
            das Recht auf Berichtigung, Löschung und Sperrung dieser Daten. Bitte kontaktieren Sie
            mich dazu unter:{" "}
            <a href="mailto:kontakt@pfad-des-paradoxons.de" className="text-[#e2bf73] underline">
              kontakt@pfad-des-paradoxons.de
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
