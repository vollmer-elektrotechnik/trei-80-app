import { Question } from '@/types/quiz';

export const QUESTIONS_DATA: Question[] = [
  {
    id: 'q1',
    category: 'NAV',
    title: 'Wer darf Arbeiten an elektrischen Anlagen nach § 13 NAV (Niederspannungsanschlussverordnung) durchführen?',
    options: [
      'Jeder ausgebildete Elektroniker ohne Einschränkung',
      'Nur in das Installateurverzeichnis eines Netzbetreibers eingetragene Installateurbetriebe',
      'Ausschließlich Meister des Elektrotechniker-Handwerks',
      'Jede Elektrofachkraft (EFK) mit schriftlicher Beauftragung'
    ],
    correctAnswer: 1,
    explanation: 'Nach § 13 NAV dürfen Arbeiten an der elektrischen Anlage (außer Instandhaltung hinter der Messeinrichtung) nur durch den Netzbetreiber oder ein in dessen Installateurverzeichnis eingetragenes Installationsunternehmen ausgeführt werden.',
    normReference: 'NAV § 13 Abs. 2'
  },
  {
    id: 'q2',
    category: 'DIN VDE 0100-600',
    title: 'Welcher Grenzwert gilt für den Isolationswiderstand einer Neuanlage mit einer Nennspannung bis 500 V nach DIN VDE 0100-600?',
    options: [
      'Mindestens 0,5 MΩ',
      'Mindestens 1,0 MΩ',
      'Mindestens 2,0 MΩ',
      'Mindestens 10,0 MΩ'
    ],
    correctAnswer: 1,
    explanation: 'Für Messungen mit einer Prüfspannung von 500 V DC muss der Isolationswiderstand nach DIN VDE 0100-600 mindestens 1,0 MΩ betragen.',
    normReference: 'DIN VDE 0100-600 Tabelle 6.1'
  },
  {
    id: 'q3',
    category: 'VDE-AR-N 4100',
    title: 'Welche maximale Dauerstrombelastung gilt für einen Zählerplatz mit Standard-Verdrahtung (10 mm²) im Dauerbetrieb (z.B. Ladeeinrichtung/Wärmepumpe)?',
    options: [
      '32 A',
      '44 A',
      '63 A',
      '50 A'
    ],
    correctAnswer: 1,
    explanation: 'Im Dauerbetrieb (z. B. PV-Einspeisung, Ladeeinrichtung) beträgt die maximale Bemessungsstromstärke bei 10 mm² Zählerverdrahtung 44 A (Belastungsanforderung Dauerbetrieb nach VDE-AR-N 4100).',
    normReference: 'VDE-AR-N 4100 Abschnitt 4.4'
  },
  {
    id: 'q4',
    category: 'TAB',
    title: 'Ab welcher Leistung muss eine Ladeeinrichtung für Elektrofahrzeuge beim Netzbetreiber angemeldet bzw. von ihm genehmigt werden?',
    options: [
      'Anmeldung ab > 3,7 kVA, Genehmigung ab > 12 kVA',
      'Anmeldung ab > 4,6 kVA, Genehmigung ab > 11 kVA',
      'Anmeldung ab > 3,7 kVA, Genehmigung ab > 11 kVA',
      'Anmeldung ab > 11 kVA, Genehmigung ab > 22 kVA'
    ],
    correctAnswer: 0,
    explanation: 'Ladeeinrichtungen sind ab einer Leistung > 3,7 kVA beim Netzbetreiber anzumelden. Übersteigt die Gesamtleistung 12 kVA, ist zusätzlich die vorherige Zustimmung/Genehmigung erforderlich.',
    normReference: 'VDE-AR-N 4100 / TAB'
  },
  {
    id: 'q5',
    category: 'Berechnungen',
    title: 'Wie berechnet sich der maximale Spannungsfall ΔU in einem Drehstromsystem bei symmetrischer Belastung?',
    options: [
      'ΔU = (2 · l · P) / (γ · A · U)',
      'ΔU = (√3 · l · I · cos φ) / (γ · A)',
      'ΔU = (l · I) / (γ · A)',
      'ΔU = (√2 · l · I) / (γ · A)'
    ],
    correctAnswer: 1,
    explanation: 'Der Spannungsfall für Drehstrom berechnet sich mit dem Faktor √3: ΔU = (√3 · l · I · cos φ) / (γ · A).',
    normReference: 'DIN VDE 0100-520 Beiblatt 2'
  }
];