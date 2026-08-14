'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import QuizCard from '@/components/QuizCard';
import CategoryCard from '@/components/CategoryCard';
import { Category, Question } from '@/types/quiz';
import { supabase } from '@/utils/supabaseClient';

const CATEGORIES_CONFIG: { id: Category; title: string; desc: string; icon: string }[] = [
  {
    id: 'VDE-AR-N 4100',
    title: 'VDE-AR-N 4100',
    desc: 'Anwendungsregel Zählerplätze, Vorzählersicherung & SPD-Kombiableiter',
    icon: '⚡',
  },
  {
    id: 'TAB',
    title: 'TAB & Netzanschluss',
    desc: 'Technische Anschlussbedingungen der Netzbetreiber & Leistungsgrenzen',
    icon: '📋',
  },
  {
    id: 'NAV',
    title: 'NAV Verordnung',
    desc: 'Niederspannungsanschlussverordnung, § 13 Installateurverzeichnis',
    icon: '⚖️',
  },
  {
    id: 'DIN VDE 0100-600',
    title: 'Prüfen nach VDE 0100-600',
    desc: 'Erstprüfung, Messverfahren (R_ISO, Z_S, RCD) & Grenzwertbeurteilung',
    icon: '🔌',
  },
  {
    id: 'Berechnungen',
    title: 'Elektrotechnische Berechnungen',
    desc: 'Spannungsfall, Schleifenimpedanz, Kurzschlussstrom & Leitungsbemessung',
    icon: '📐',
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category | 'ALL' | null>(null);
  
  // Zustände für Supabase-Daten
  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [userProgressMap, setUserProgressMap] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // SCHRITT 4: Daten beim Laden aus Supabase abrufen
  useEffect(() => {
    async function fetchDatabaseData() {
      setLoading(true);

      // 1. Alle aktiven Fragen aus Supabase holen
      const { data: dbQuestions, error: qError } = await supabase
        .from('questions')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });

      if (qError) {
        console.error('Fehler beim Laden der Fragen:', qError);
      } else if (dbQuestions) {
        setQuestionsData(dbQuestions as Question[]);
      }

      // 2. Angemeldeten Nutzer prüfen
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // 3. Fortschritt für diesen Nutzer laden
        const { data: dbProgress, error: pError } = await supabase
          .from('user_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id);

        if (pError) {
          console.error('Fehler beim Laden des Fortschritts:', pError);
        } else if (dbProgress) {
          // Map erstellen: { 'q1': true, 'q2': false }
          const progressMap: Record<string, boolean> = {};
          dbProgress.forEach(p => {
            progressMap[p.question_id] = p.is_correct;
          });
          setUserProgressMap(progressMap);
        }
      }

      setLoading(false);
    }

    fetchDatabaseData();
  }, []);

  const handleSelectCategory = (cat: Category | 'ALL') => {
    const filtered = cat === 'ALL' 
      ? questionsData 
      : questionsData.filter(q => q.category === cat);
    
    if (filtered.length === 0) {
      alert('Für dieses Themenfeld sind aktuell noch keine Fragen eingetragen.');
      return;
    }

    setCurrentQuestions(filtered);
    setCurrentIndex(0);
    setActiveCategory(cat);
  };

  // Nächste Frage & Fortschritt in Supabase speichern (Schritt 5 Vorschau)
  const handleNextQuestion = async (isCorrect: boolean) => {
    const currentQ = currentQuestions[currentIndex];

    // Lokalen State sofort aktualisieren (für schnelle UI)
    const updatedMap = { ...userProgressMap, [currentQ.id]: isCorrect };
    setUserProgressMap(updatedMap);

    // In Supabase speichern
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('user_progress')
        .upsert(
          {
            user_id: user.id,
            question_id: currentQ.id,
            is_correct: isCorrect,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,question_id' }
        );
    }

    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      alert('🎉 Themenfeld abgeschlossen!');
      setActiveCategory(null);
    }
  };

  const totalQuestionsCount = questionsData.length;
  const totalCorrect = Object.values(userProgressMap).filter(Boolean).length;
  const totalAnswered = Object.keys(userProgressMap).length;
  const totalPercent = totalQuestionsCount > 0 ? Math.round((totalCorrect / totalQuestionsCount) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-500 font-bold">
        ⚡ Lade Fragen aus der Datenbank...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16 font-sans">
      
      {/* Top Mobile Bar / Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            onClick={() => setActiveCategory(null)}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-white font-extrabold shadow-md shadow-amber-500/20 text-lg">
              ⚡
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-tight leading-tight">TREI 80 Trainer</h1>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Fahrschul-Modus</p>
            </div>
          </Link>

          {/* Mini-Fortschritt oben rechts */}
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{totalCorrect}/{totalQuestionsCount} Richtig</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </header>

      {/* Hauptinhalt */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
        
        {!activeCategory ? (
          <div className="space-y-8">
            
            {/* HERO CARD */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-3 border border-white/10">
                    Prüfungssimulation TREI 80
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">VDE, TAB & NAV Trainer</h2>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-sm">
                    Lerne alle relevanten Normen & Vorschriften für die Eintragung ins Installateurverzeichnis.
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 w-full sm:w-auto justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-black text-amber-400">{totalPercent}%</div>
                    <div className="text-[10px] text-slate-300 font-bold uppercase tracking-wider mt-0.5">Gesamtstatus</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleSelectCategory('ALL')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>🎲</span> Gemischte Prüfung starten
                </button>
              </div>
            </div>

            {/* THEMENFELDER RASTER */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Themenbereiche</h3>
                <span className="text-xs font-semibold text-slate-400">{CATEGORIES_CONFIG.length} Module</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {CATEGORIES_CONFIG.map((cat) => {
                  const categoryQuestions = questionsData.filter(q => q.category === cat.id);
                  const answeredInCat = categoryQuestions.filter(q => userProgressMap[q.id] !== undefined).length;
                  const correctInCat = categoryQuestions.filter(q => userProgressMap[q.id] === true).length;

                  return (
                    <CategoryCard
                      key={cat.id}
                      category={cat.id}
                      title={cat.title}
                      description={cat.desc}
                      icon={cat.icon}
                      totalQuestions={categoryQuestions.length}
                      answeredCount={answeredInCat}
                      correctCount={correctInCat}
                      onSelect={handleSelectCategory}
                    />
                  );
                })}
              </div>
            </section>

            {/* Reset */}
            {totalAnswered > 0 && (
              <div className="pt-6 text-center">
                <button 
                  onClick={async () => {
                    if (confirm('Möchtest du deinen Lernfortschritt wirklich zurücksetzen?')) {
                      const { data: { user } } = await supabase.auth.getUser();
                      if (user) {
                        await supabase.from('user_progress').delete().eq('user_id', user.id);
                      }
                      setUserProgressMap({});
                    }
                  }}
                  className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  🗑️ Fortschritt zurücksetzen
                </button>
              </div>
            )}

          </div>
        ) : (
          /* QUIZ-MODUS */
          <div className="max-w-xl mx-auto h-[calc(100dvh-5rem)] flex flex-col justify-between pb-2 space-y-2">
            {/* Top Header */}
            <div className="flex items-center justify-between shrink-0">
              <button 
                onClick={() => setActiveCategory(null)}
                className="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                ← Beenden
              </button>
              <div className="text-xs font-extrabold text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-2.5 py-0.5 rounded-md">
                Frage {currentIndex + 1} / {currentQuestions.length}
              </div>
            </div>

            {/* Karte nimmt genau den restlichen Platz ein */}
            <div className="flex-1 min-h-0">
              <QuizCard
                question={currentQuestions[currentIndex]}
                onNext={handleNextQuestion}
              />
            </div>
          </div>
        )}

      </main>
    </div>
  );
}