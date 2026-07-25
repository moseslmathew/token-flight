import React from 'react';

export default function Hero() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            AI Research & Engineering
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Understanding Artificial Intelligence from First Principles
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal pt-1">
            In-depth technical notes, visual architectural breakdowns, and code implementations covering Large Language Models, Neural Networks, RAG, and Machine Learning.
          </p>
        </div>
      </div>
    </div>
  );
}
