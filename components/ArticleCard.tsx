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
      <article className="paper-card group p-5">
        <Link href={`/blog/${article.slug}`} className="block space-y-2.5">
          <span className="eyebrow block text-accent">{article.category}</span>
          <h3 className="text-h3 font-semibold text-ink-strong transition-colors duration-200 group-hover:text-accent">
            {article.title}
          </h3>
          <p className="text-meta leading-relaxed text-ink-muted line-clamp-2">
            {article.excerpt}
          </p>
          <span className="flex items-center gap-1.5 pt-1 text-meta font-medium text-accent">
            Read
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </Link>
      </article>
    );
  }

  return (
    <article className="group">
      <Link
        href={`/blog/${article.slug}`}
        className="grid gap-x-8 gap-y-3 py-9 sm:grid-cols-[8.5rem_1fr]"
      >
        {/* Meta rail */}
        <div className="flex flex-row items-center gap-3 sm:flex-col sm:items-start sm:gap-1.5 sm:pt-1.5">
          <span className="eyebrow text-accent">{article.category}</span>
          <span className="text-meta text-ink-faint">{article.readTime}</span>
          <span className="hidden text-meta text-ink-faint sm:block">{article.publishedAt}</span>
        </div>

        {/* Body */}
        <div className="space-y-2.5">
          <h3 className="text-h2 font-semibold text-ink-strong transition-colors duration-200 group-hover:text-accent">
            {article.title}
          </h3>
          <p className="max-w-[46rem] text-[1.0625rem] leading-relaxed text-ink-muted">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1">
            <span className="rounded-full border border-rule px-2.5 py-0.5 text-meta text-ink-muted">
              {article.difficulty}
            </span>
            <span className="flex items-center gap-1.5 text-meta font-medium text-accent">
              Read the guide
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
