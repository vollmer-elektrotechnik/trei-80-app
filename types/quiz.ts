export type Category = 'VDE-AR-N 4100' | 'TAB' | 'NAV' | 'DIN VDE 0100-600' | 'Berechnungen';

export interface Question {
  id: string;
  category: Category;
  title: string;          // Die konkrete Fragestellung
  options: string[];       // 4 Antwortmöglichkeiten
  correctAnswer: number;  // Index der richtigen Antwort (0-3)
  explanation: string;   // Detaillierte Erklärung mit Normenbezug
  normReference?: string;// z.B. "VDE-AR-N 4100 Abschnitt 4.4"
}

export interface UserStats {
  answeredCount: number;
  correctCount: number;
  streakDays: number;
  wrongQuestionIds: string[];
}