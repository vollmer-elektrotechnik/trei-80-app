'use client';

import React from 'react';
import { Category } from '@/types/quiz';

interface CategoryCardProps {
  category: Category;
  title: string;
  description: string;
  icon: string;
  totalQuestions: number;
  correctCount: number;
  answeredCount: number;
  onSelect: (category: Category | 'ALL') => void;
}

export default function CategoryCard({
  category,
  title,
  description,
  icon,
  totalQuestions,
  correctCount,
  answeredCount,
  onSelect,
}: CategoryCardProps) {
  const percent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const isMastered = percent >= 80 && answeredCount === totalQuestions;

  return (
    <div 
      onClick={() => onSelect(category)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Status-Glow an der Seite */}
      <div 
        className={`absolute top-0 left-0 w-2 h-full transition-colors ${
          isMastered 
            ? 'bg-emerald-500' 
            : answeredCount > 0 
            ? 'bg-amber-500' 
            : 'bg-slate-300 dark:bg-slate-700'
        }`}
      />

      <div>
        {/* Top Header mit Icon & Status Badge */}
        <div className="flex items-center justify-between mb-4 pl-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
            isMastered 
              ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' 
              : answeredCount > 0 
              ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
              : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
          }`}>
            {answeredCount === 0 ? 'Bereit' : `${answeredCount}/${totalQuestions} Fragen`}
          </span>
        </div>

        {/* Titel & Beschreibung */}
        <div className="pl-2">
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-amber-400 transition-colors">
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
            {description}
          </p>
        </div>
      </div>

      {/* Fortschrittsanzeige */}
      <div className="pl-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="font-medium text-slate-400">Fortschritt</span>
          <span className="font-extrabold text-slate-700 dark:text-slate-200">
            {percent}%
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              isMastered 
                ? 'bg-emerald-500' 
                : 'bg-gradient-to-r from-blue-500 to-amber-500'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}