export interface ProgressData {
  answered: Record<string, boolean>; // z.B. { 'trei-4100-01': true, 'trei-4100-02': false }
  lastActive: string; // Datum im ISO-Format für Streak-Tracking
}

const STORAGE_KEY = 'trei_80_quiz_progress';

export const getProgress = (): ProgressData => {
  if (typeof window === 'undefined') return { answered: {}, lastActive: '' };
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { answered: {}, lastActive: '' };
  } catch {
    return { answered: {}, lastActive: '' };
  }
};

export const saveAnswer = (questionId: string, isCorrect: boolean): ProgressData => {
  const current = getProgress();
  const updated: ProgressData = {
    ...current,
    answered: {
      ...current.answered,
      [questionId]: isCorrect,
    },
    lastActive: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const resetProgress = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};