import { Question } from '@/types/quiz';

export const QUESTIONS_DATA: Question[] = [
  {
    id: 'trei-4100-01',
    category: 'VDE-AR-N 4100',
    title: 'Wie hoch darf der maximale Spannungsfall von der Hauptleitungsklemme bis zum Zählerplatz sein?',
    options: [
      '0,5 %',
      '1,0 %',
      '2,0 %',
      '3,0 %'
    ],
    correctAnswer: 0,
    explanation: 'Nach VDE-AR-N 4100 (Abschnitt 4.4) darf der maximale Spannungsfall im Hauptstromversorgungssystem zwischen der Hauptleitungsklemme und dem Zählerplatz 0,5 % nicht überschreiten.',
    normReference: 'VDE-AR-N 4100:2019-04, Abs. 4.4'
  },
  {
    id: 'trei-4100-02',
    category: 'VDE-AR-N 4100',
    title: 'Welcher Überspannungsschutz (SPD) muss im Hauptstromversorgungssystem vor dem Zählerplatz installiert werden?',
    options: [
      'Typ 3 (Feinschutz)',
      'Typ 2 (Mittelschutz)',
      'Typ 1 / Kombi-Ableiter (Grob- / Kombischutz)',
      'Kein SPD im Ungezählten Bereich zulässig'
    ],
    correctAnswer: 2,
    explanation: 'Im Hauptstromversorgungssystem (vor dem Zähler) ist nach VDE-AR-N 4100 zwingend ein leckstromfreier Kombi-Ableiter (Typ 1 + Typ 2) auf Sammelschienensystemen vorzusehen.',
    normReference: 'VDE-AR-N 4100:2019-04, Abs. 6.1'
  },
  {
    id: 'trei-tab-01',
    category: 'TAB',
    title: 'Ab welcher Dauerstrombelastung / Nennleistung muss ein Zählerplatz für eine Wandlermessung vorgesehen werden?',
    options: [
      'Ab > 32 A (ca. 22 kW)',
      'Ab > 63 A (ca. 44 kVA)',
      'Ab > 80 A (ca. 55 kVA)',
      'Ab > 100 A (ca. 69 kVA)'
    ],
    correctAnswer: 1,
    explanation: 'Zählerplätze mit Direktmessung sind in der Regel bis 63 A ausgelegt. Bei Dauerbetrieb oder Betriebsströmen > 63 A ist eine Wandlermessung erforderlich.',
    normReference: 'VDE-AR-N 4100 / TAB, Abs. 7.1'
  }
];