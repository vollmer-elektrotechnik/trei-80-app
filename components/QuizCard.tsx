'use client';

import React, { useState } from 'react';
import { Question } from '@/types/quiz';

interface QuizCardProps {
  question: Question;
  onNext: (isCorrect: boolean) => void;
}

export default function QuizCard({ question, onNext }: QuizCardProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null) return;
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedIdx === question.correctAnswer;
    setIsSubmitted(false);
    setSelectedIdx(null);
    onNext(isCorrect);
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-slate-100">
      {/* Meta-Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
          {question.category}
        </span>
        {question.normReference && (
          <span className="text-xs text-slate-400 font-mono">
            {question.normReference}
          </span>
        )}
      </div>

      {/* Frage */}
      <h2 className="text-lg font-medium text-slate-100 mb-6 leading-relaxed">
        {question.title}
      </h2>

      {/* Antwortoptionen */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          let btnStyle = "border-slate-800 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:border-slate-700";

          if (selectedIdx === idx) {
            btnStyle = "border-amber-500 bg-amber-500/10 text-amber-200";
          }

          if (isSubmitted) {
            if (idx === question.correctAnswer) {
              btnStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-medium";
            } else if (selectedIdx === idx) {
              btnStyle = "border-rose-500 bg-rose-500/20 text-rose-300";
            } else {
              btnStyle = "opacity-40 border-slate-800 bg-slate-900";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all text-sm flex items-center justify-between ${btnStyle}`}
            >
              <span>{option}</span>
              {isSubmitted && idx === question.correctAnswer && (
                <span className="text-emerald-400 font-bold ml-2">✓</span>
              )}
              {isSubmitted && selectedIdx === idx && idx !== question.correctAnswer && (
                <span className="text-rose-400 font-bold ml-2">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Erklärung nach Abgabe */}
      {isSubmitted && (
        <div className="mb-6 p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-sm text-slate-300 leading-relaxed animate-fadeIn">
          <p className="font-semibold text-amber-400 mb-1">💡 Erklärung & Normenbezug:</p>
          <p>{question.explanation}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedIdx === null}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Antwort prüfen
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-semibold text-sm transition-all"
          >
            Nächste Frage →
          </button>
        )}
      </div>
    </div>
  );
}