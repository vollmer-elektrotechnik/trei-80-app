'use client';

import React, { useState, useEffect } from 'react';
import { Question } from '@/types/quiz';

interface QuizCardProps {
  question: Question;
  onNext: (isCorrect: boolean) => void;
}

export default function QuizCard({ question, onNext }: QuizCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setSelectedIndex(null);
    setIsSubmitted(false);
  }, [question]);

  if (!question) return null;

  const handleOptionClick = (index: number) => {
    if (isSubmitted) return;
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex === null) return;
    setIsSubmitted(true);
  };

  const handleContinue = () => {
    if (selectedIndex === null) return;
    const isCorrect = selectedIndex === question.correctAnswer;
    onNext(isCorrect);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between h-full overflow-hidden">
      
      {/* 1. KOPFBEREICH: Kategorie, Norm & Frage */}
      <div className="shrink-0 space-y-2">
        <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>{question.category}</span>
          {question.normReference && (
            <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-mono">
              {question.normReference}
            </span>
          )}
        </div>

        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
          {question.title}
        </h2>
      </div>

      {/* 2. MITTELBEREICH: Antworten + Erklärungsbox (scrollbar nur falls extrem kleiner Bildschirm) */}
      <div className="flex-1 my-2 overflow-y-auto space-y-1.5 pr-0.5 min-h-0">
        {question.options.map((option, idx) => {
          let btnStyle = "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 hover:border-amber-400";

          if (selectedIndex === idx) {
            btnStyle = "border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 font-medium";
          }

          if (isSubmitted) {
            if (idx === question.correctAnswer) {
              btnStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold";
            } else if (idx === selectedIndex && selectedIndex !== question.correctAnswer) {
              btnStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-semibold";
            } else {
              btnStyle = "border-slate-200 dark:border-slate-800 opacity-40";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={isSubmitted}
              className={`w-full text-left py-2 px-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2 ${btnStyle}`}
            >
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-slate-200/80 dark:bg-slate-700 flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 leading-tight">{option}</span>
            </button>
          );
        })}

        {/* ERKLÄRUNG: Erscheint direkt unter den Optionen, schiebt sie leicht zusammen */}
        {isSubmitted && (
          <div className={`mt-2 p-2.5 rounded-xl border text-xs space-y-1 transition-all ${
            selectedIndex === question.correctAnswer
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/50 text-rose-900 dark:text-rose-200'
          }`}>
            <div className="font-extrabold flex items-center justify-between text-[11px]">
              <span>{selectedIndex === question.correctAnswer ? '✅ Richtig!' : '❌ Falsch!'}</span>
              {question.normReference && (
                <span className="opacity-80 font-mono text-[10px]">{question.normReference}</span>
              )}
            </div>
            <p className="leading-snug text-[11px] sm:text-xs opacity-95 pt-1 border-t border-current/10">
              {question.explanation}
            </p>
          </div>
        )}
      </div>

      {/* 3. FUSSBEREICH: IMMER SICHTBARER BUTTON */}
      <div className="shrink-0 pt-1">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedIndex === null}
            className="w-full py-2.5 sm:py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/10 cursor-pointer disabled:cursor-not-allowed"
          >
            Antwort prüfen
          </button>
        ) : (
          <button
            onClick={handleContinue}
            className="w-full py-2.5 sm:py-3 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
          >
            Nächste Frage →
          </button>
        )}
      </div>

    </div>
  );
}