// Ordner im Projekt: /types/database.ts

export type Question = {
  id: string;
  title: string;
  options: string[];
  correct_answer: string;
  order_index: number;
  is_active: boolean;
};

export type UserProgress = {
  id: string;
  user_id: string;
  question_id: string;
  user_answer: string;
  is_correct: boolean;
  updated_at: string;
};