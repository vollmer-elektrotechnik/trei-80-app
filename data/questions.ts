export interface Question {
  id: number;
  category: "DGUV" | "NAV_Niederspannung" | "Messungen_VDE" | "Netzformen" | "Anmeldung_TAB";
  question: string;
  options: string[];
  correctAnswer: number; // Index der richtigen Option (0-3)
  explanation: string;   // Erklärung für den Lerneffekt
  normRef?: string;      // Normenreferenz (z.B. "DIN VDE 0100-600")
}

export const TREI_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "NAV_Niederspannung",
    question: "Wer darf Arbeiten an elektrischen Anlagen nach § 13 NAV (Niederspannungsanschlussverordnung) durchführen?",
    options: [
      "Jeder ausgebildete Elektroniker ohne Einschränkung",
      "Nur in das Installateurverzeichnis eines Netzbetreibers eingetragene Installateurbetriebe",
      "Ausschließlich Meister des Elektrotechniker-Handwerks",
      "Jede Elektrofachkraft (EFK) mit schriftlicher Beauftragung"
    ],
    correctAnswer: 1,
    explanation: "Gegenstand des § 13 NAV ist, dass Arbeiten an der elektrischen Anlage (außer Instandhaltung hinter der Messeinrichtung) nur durch den Netzbetreiber oder ein in dessen Installateurverzeichnis eingetragenes Installationsunternehmen ausgeführt werden dürfen.",
    normRef: "NAV § 13 Abs. 2"
  },
  {
    id: 2,
    category: "Messungen_VDE",
    question: "Welcher Grenzwert gilt für den Isolationswiderstand einer Neuanlage mit einer Nennspannung bis 500 V nach DIN VDE 0100-600?",
    options: [
      "Mindestens 0,5 MΩ",
      "Mindestens 1,0 MΩ",
      "Mindestens 2,0 MΩ",
      "Mindestens 10,0 MΩ"
    ],
    correctAnswer: 1,
    explanation: "Für Messungen bei einer Erprobungsspannung von 500 V DC muss der Isolationswiderstand nach aktueller DIN VDE 0100-600 mindestens 1,0 MΩ betragen (früher 0,5 MΩ).",
    normRef: "DIN VDE 0100-600 Tabelle 6.1"
  },
  {
    id: 3,
    category: "DGUV",
    question: "Nach welchen 5 Sicherheitsregeln wird vor Beginn von Arbeiten an elektrischen Anlagen im freigeschalteten Zustand vorgegangen?",
    options: [
      "Freischalten, Gegen Wiedereinschalten sichern, Spannungsfreiheit feststellen, Erdung anbringen, Absperren",
      "Freischalten, Absperren, Messen, Erdung anbringen, Reinigen",
      "Freischalten, Gegen Wiedereinschalten sichern, Spannungsfreiheit feststellen, Erden und Kurzschließen, Benachbarte unter Spannung stehende Teile abdecken oder abschranken",
      "Sicherung herausdrehen, Messen, Abschranken, Erden, Arbeiten"
    ],
    correctAnswer: 2,
    explanation: "Die 5 Sicherheitsregeln nach DIN VDE 0105-100 lauten in exakter Reihenfolge: 1. Freischalten, 2. Gegen Wiedereinschalten sichern, 3. Spannungsfreiheit feststellen (allepolig), 4. Erden und Kurzschließen, 5. Benachbarte unter Spannung stehende Teile abdecken oder abschranken.",
    normRef: "DIN VDE 0105-100 / DGUV Vorschrift 3"
  }
];