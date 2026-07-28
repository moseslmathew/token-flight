'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/lib/data/articles';

const CATEGORIES = ['LLMs', 'Machine Learning'] as const;

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('LLMs');

  const filteredArticles = ARTICLES.filter((a) => a.category === selectedCategory);

  const activeCategories = CATEGORIES.filter((cat) =>
    ARTICLES.some((a) => a.category === cat)
  );

  return (
    <div className="measure-wide px-4 pb-12 pt-8 sm:px-6 sm:pt-12">
      {/* Masthead */}
      <header className="animate-rise-in space-y-4 text-center">
        <h1 className="text-display font-bold tracking-tight text-ink-strong">
          Understanding artificial intelligence from first principles
        </h1>
        <p className="text-lede text-ink-muted mx-auto max-w-2xl">
          In-depth technical notes, visual architectural breakdowns, and code implementations —
          written to be read slowly.
        </p>
      </header>

      {/* Category filter */}
      <div className="mt-12 border-b border-rule">
        <div className="no-scrollbar filter-rail flex items-center justify-center gap-7 overflow-x-auto py-3.5">
          {activeCategories.map((cat) => {
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
      </div>

      {/* Index listing */}
      <div className="mt-8 space-y-6">
        {filteredArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block rounded-2xl bg-surface p-6 shadow-sm border border-rule sm:p-8 transition-all hover:shadow-md hover:border-accent-ring focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="rounded-full bg-paper-deep text-ink-muted border border-rule px-2.5 py-0.5 text-[0.6875rem] font-medium uppercase tracking-wider">{article.category}</span>
              <span className="text-meta text-ink-faint ml-1">{article.readTime}</span>
            </div>
            
            <h2 className="text-[1.375rem] font-semibold text-ink-strong group-hover:text-accent transition-colors">
              {article.title}
            </h2>
            <p className="mt-2 text-[1.0625rem] text-ink-muted">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
