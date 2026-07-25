import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/data/articles';
import { Clock, ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="pro-card p-6 flex flex-col justify-between group">
      <div>
        {/* Category & Read Time */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-medium">
          <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
            {article.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2.5 leading-snug">
          <Link href={`/blog/${article.slug}`} className="flex items-start justify-between gap-2">
            <span>{article.title}</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0 mt-0.5" />
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {article.excerpt}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div>By {article.author.name}</div>
        <div>{article.publishedAt}</div>
      </div>
    </article>
  );
}
