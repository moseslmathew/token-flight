import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/data/articles';
import { ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  /** `row` is the editorial index listing; `compact` is the related-reading tile. */
  variant?: 'row' | 'compact';
}

export default function ArticleCard({ article, variant = 'row' }: ArticleCardProps) {
  if (variant === 'compact') {
    return (
      <article className="paper-card group p-6 rounded-2xl bg-surface border border-rule shadow-xs hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200">
        <Link href={`/blog/${article.slug}`} className="block space-y-3">
          <div className="flex items-center justify-between text-xs text-ink-muted">
            <span className="font-semibold text-accent">{article.category}</span>
            <span>{article.publishedAt}</span>
          </div>

          <h3 className="text-h3 font-bold text-ink-strong transition-colors duration-200 group-hover:text-accent">
            {article.title}
          </h3>
          <p className="text-meta leading-relaxed text-ink-muted line-clamp-2">
            {article.excerpt}
          </p>
          <span className="inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-accent">
            Read guide
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </Link>
      </article>
    );
  }

  return (
    <article className="paper-card group rounded-2xl bg-surface border border-rule p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200">
      <Link
        href={`/blog/${article.slug}`}
        className="block space-y-4"
      >
        {/* Meta Header */}
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="font-semibold text-accent">{article.category}</span>
            <span>·</span>
            <span>{article.difficulty}</span>
          </div>
          <span>{article.publishedAt}</span>
        </div>

        {/* Body */}
        <div className="space-y-2.5">
          <h3 className="text-[1.375rem] font-bold text-ink-strong transition-colors duration-200 group-hover:text-accent leading-snug">
            {article.title}
          </h3>
          <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-rule-soft">
            <span className="text-xs text-slate-500 font-medium">By {article.author.name}</span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              Explore breakdown
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
