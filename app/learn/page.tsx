'use client';

import React, { useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import { ARTICLES } from '@/lib/data/articles';

const CATEGORIES = ['LLMs', 'Machine Learning'] as const;

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('LLMs');

  const filteredArticles = ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <div className="measure-wide px-4 pb-8 pt-14 sm:px-6 sm:pt-20">
      {/* Masthead */}
      <header className="animate-rise-in space-y-5">
        <span className="eyebrow block text-accent">Interactive Engineering Guides</span>
        <h1 className="text-h1 font-semibold text-ink-strong">
          Understanding artificial intelligence from first principles
        </h1>
        <p className="text-lede text-ink-muted">
          In-depth technical notes, visual architectural breakdowns, and code implementations —
          written to be read slowly.
        </p>
      </header>

      {/* Category filter */}
      <div className="mt-12 flex items-center justify-between gap-6 border-b border-rule">
        <div className="no-scrollbar filter-rail flex min-w-0 w-full items-center gap-7 overflow-x-auto py-3.5 pr-10">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = ARTICLES.filter((a) => a.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={isSelected}
                className={`relative shrink-0 whitespace-nowrap py-1 text-[0.9375rem] font-medium transition-colors duration-200 cursor-pointer ${
                  isSelected ? 'text-ink-strong' : 'text-ink-muted hover:text-ink-strong'
                }`}
              >
                {cat}
                <span className="ml-1.5 text-meta text-ink-faint">{count}</span>
                <span
                  className={`absolute inset-x-0 -bottom-[0.875rem] h-[2px] transition-colors duration-200 ${
                    isSelected ? 'bg-accent' : 'bg-transparent'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <span className="hidden shrink-0 text-meta text-ink-faint sm:block">
          {filteredArticles.length} guides
        </span>
      </div>

      {/* Index listing */}
      <div className="divide-y divide-rule-soft">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
