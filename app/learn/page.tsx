'use client';

import React, { useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import { ARTICLES } from '@/lib/data/articles';

const CATEGORIES = ['LLMs', 'Machine Learning'] as const;

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('LLMs');

  const filteredArticles = ARTICLES.filter((a) => a.category === selectedCategory);

  const activeCategories = CATEGORIES.filter((cat) =>
    ARTICLES.some((a) => a.category === cat)
  );

  return (
    <div className="ambient-glow min-h-screen pb-16">
      <div className="measure-wide px-4 pt-8 sm:px-6 sm:pt-12">
        {/* Masthead */}
        <header className="animate-rise-in space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-xs">
            First-Principles Engineering Guides
          </div>
          <h1 className="text-display font-extrabold tracking-tight text-ink-strong">
            Understand AI From Scratch
          </h1>
          <p className="text-lede text-ink-muted leading-relaxed">
            In-depth technical notes, visual architectural breakdowns, and code implementations — written to be read slowly.
          </p>
        </header>

        {/* Category filter */}
        <div className="mt-10 border-b border-rule pb-1">
          <div className="no-scrollbar filter-rail flex items-center justify-center gap-2.5 overflow-x-auto py-2">
            {activeCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={isSelected}
                  className={`shrink-0 rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-accent text-white shadow-xs'
                      : 'bg-surface text-ink-muted border border-rule hover:border-slate-300 hover:text-ink-strong'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Index listing */}
        <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
