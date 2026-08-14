export type Category = 
  | 'VDE-AR-N 4100 & TAB'
  | 'NAV & Recht'
  | 'DIN VDE 0100-600'
  | 'Berechnungen'
  // Optionale Abwärtskompatibilität, falls noch alte Fragen in der DB liegen:
  | 'VDE-AR-N 4100'
  | 'TAB'
  | 'NAV';

export interface Question {
  id: string;
  category: Category;
  title: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  normReference?: string;
}

export interface UserStats {
  answeredCount: number;
  correctCount: number;
  streakDays: number;
  wrongQuestionIds: string[];
}