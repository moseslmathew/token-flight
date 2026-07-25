'use client';

import React, { useState } from 'react';
import { AI_QUIZ_QUESTIONS } from '@/lib/data/quizzes';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

export default function QuizSection() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = AI_QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === currentQ.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentIdx < AI_QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((c) => c + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowExplanation(false);
    setIsCompleted(false);
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 my-10 border border-slate-800 shadow-xl">
      <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
        <Award className="w-4 h-4" />
        Knowledge Check
      </div>
      <h3 className="text-2xl font-bold text-white mb-6">Test Your AI Understanding</h3>

      {!isCompleted ? (
        <div className="space-y-6">
          {/* Question Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
            <span>Question {currentIdx + 1} of {AI_QUIZ_QUESTIONS.length}</span>
            <span className="text-cyan-400 font-bold">Current Score: {score}</span>
          </div>

          <h4 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
            {currentQ.question}
          </h4>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              let btnStyle = 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700';

              if (selectedOption !== null) {
                if (idx === currentQ.correctAnswer) {
                  btnStyle = 'border-emerald-500/80 bg-emerald-950/60 text-emerald-300 font-semibold';
                } else if (idx === selectedOption) {
                  btnStyle = 'border-rose-500/80 bg-rose-950/60 text-rose-300';
                } else {
                  btnStyle = 'border-slate-900 bg-slate-950 text-slate-600 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <span>{option}</span>
                  {selectedOption !== null && idx === currentQ.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {selectedOption !== null && idx === selectedOption && idx !== currentQ.correctAnswer && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 space-y-2 animate-in fade-in">
              <strong className="text-cyan-400 block">Explanation:</strong>
              <p>{currentQ.explanation}</p>

              <div className="pt-3 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  {currentIdx < AI_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="text-center py-8 space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-500 mx-auto flex items-center justify-center shadow-lg">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold text-white">Quiz Completed!</h4>
            <p className="text-slate-400 text-sm">
              You scored <strong className="text-cyan-400 text-lg">{score}</strong> out of {AI_QUIZ_QUESTIONS.length}
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 font-semibold rounded-xl text-xs flex items-center gap-2 mx-auto transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Quiz Again
          </button>
        </div>
      )}
    </div>
  );
}
