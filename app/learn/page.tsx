'use client';

import React, { useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import { ARTICLES } from '@/lib/data/articles';
import { BookOpen } from 'lucide-react';

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('LLMs');

  const categories = ['LLMs', 'Machine Learning'];

  const filteredArticles = selectedCategory
    ? ARTICLES.filter((a) => a.category === selectedCategory)
    : ARTICLES;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Compact Hero Header */}
      <div className="space-y-1.5 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Interactive Engineering Guides</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Understanding Artificial Intelligence from First Principles
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          In-depth technical notes, visual architectural breakdowns, and code implementations.
        </p>
      </div>

      {/* Mobile-Optimized Category Filter Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 shrink-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = ARTICLES.filter((a) => a.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-slate-800 text-slate-200' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 font-medium shrink-0">
          {filteredArticles.length} Technical Guides
        </div>
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
