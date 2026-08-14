import Link from "next/link";

export default function InfoPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-gray-800">
      
      {/* Header */}
      <div className="border-b pb-4">
        <Link href="/" className="text-blue-600 hover:underline text-sm font-medium">
          ← Zurück zum Quiz
        </Link>
        <h1 className="text-3xl font-bold mt-2 text-slate-900">
          TREI-Sachkundenachweis (80-Stunden-Lehrgang)
        </h1>
        <p className="text-gray-600 mt-1">
          Wichtige Informationen zur Eintragsprüfung für das Installateurverzeichnis der Netzbetreiber.
        </p>
      </div>

      {/* Inhalt des TREI-Scheins */}
      <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 border-b pb-2">
          Was beinhaltet der TREI 80 Lehrgang?
        </h2>
        <p>
          Der Sachkundenachweis für den Anschluss von elektrischen Anlagen an das Niederspannungsnetz (TREI) richtet sich an Elektrotechniker, Ingenieure und Meister, die sich selbstständig machen oder als verantwortliche Fachkraft die Eintragung ins Installateurverzeichnis anstreben.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-2">1. Rechtliche Grundlagen & NAV</h3>
            <ul className="text-sm space-y-1 text-gray-600 list-disc list-inside">
              <li>Niederspannungsanschlussverordnung (NAV)</li>
              <li>Ablauf des Anmeldeverfahrens beim VNB</li>
              <li>Installateurverträge & Grundversorger</li>
              <li>Betreiberverantwortung & DGUV Vorschrift 3</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-2">2. Technische Regeln & TAB</h3>
            <ul className="text-sm space-y-1 text-gray-600 list-disc list-inside">
              <li>VDE-AR-N 4100 (TAR Niederspannung)</li>
              <li>Zählerplatzanlagen & Wandlermessungen</li>
              <li>Anmeldung von PV-Anlagen, Ladeinfrastruktur & Wärmepumpen</li>
              <li>Netzformen (TN-C, TN-S, TT) & Erdung</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Literaturtipps */}
      <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 border-b pb-2">
          Empfohlene Literatur & Normen
        </h2>
        <p className="text-sm text-gray-600">
          Diese Fachliteratur ist ideal für die Vorbereitung auf die schriftliche und mündliche/praktische Eintragsprüfung:
        </p>

        <div className="space-y-3">
          <div className="p-3 border rounded-lg hover:border-blue-300 transition">
            <h3 className="font-bold text-gray-900">VDE Schriftenreihe Band 45</h3>
            <p className="text-sm text-gray-600">
              „Elektroinstallationspraxis nach den VDE-Bestimmungen und den Technischen Anschlussbedingungen (TAB)“
            </p>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded mt-1 inline-block">Standardwerk für TREI</span>
          </div>

          <div className="p-3 border rounded-lg hover:border-blue-300 transition">
            <h3 className="font-bold text-gray-900">Kiefer – Elektro-Installationstechnik</h3>
            <p className="text-sm text-gray-600">
              Umfassendes Nachschlagewerk für Planung, Errichtung und Prüfung von Niederspannungsanlagen (Auflage aktualisiert nach DIN VDE 0100-600).
            </p>
          </div>

          <div className="p-3 border rounded-lg hover:border-blue-300 transition">
            <h3 className="font-bold text-gray-900">VDE-AR-N 4100 (Anwendungsregel)</h3>
            <p className="text-sm text-gray-600">
              Technische Regeln für den Anschluss von Kundenanlagen an das Niederspannungsnetz und deren Betrieb (TAR Niederspannung).
            </p>
          </div>
        </div>
      </section>

      {/* Navigations-Link in der Hauptseite */}
      <div className="text-center pt-4">
        <Link href="/" className="inline-block bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition">
          Jetzt mit dem Fragen-Quiz starten
        </Link>
      </div>

    </div>
  );
}