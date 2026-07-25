'use client';

import React, { useState } from 'react';
import { AI_NEWS_ITEMS } from '@/lib/data/news';
import {
  Clock,
  Zap,
  Cpu,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Layers,
} from 'lucide-react';

export default function LatestAINewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    'All',
    'Model Releases',
    'Research & Architecture',
    'Open Source',
    'Hardware & Compute',
    'Industry & Policy',
  ];

  const filteredNews = selectedCategory && selectedCategory !== 'All'
    ? AI_NEWS_ITEMS.filter((item) => item.category === selectedCategory)
    : AI_NEWS_ITEMS;

  const featuredNews = AI_NEWS_ITEMS.find((n) => n.featured) || AI_NEWS_ITEMS[0];

  const isAllSelected = !selectedCategory || selectedCategory === 'All';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Mobile-Optimized Single-Row Touch Carousel Category Filter Bar */}
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full shrink-0">
          {categories.map((cat) => {
            const isSelected = cat === 'All' ? isAllSelected : selectedCategory === cat;
            const count = cat === 'All' ? AI_NEWS_ITEMS.length : AI_NEWS_ITEMS.filter((n) => n.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'All' ? null : isSelected ? null : cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
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

        <div className="hidden sm:block text-xs text-slate-500 font-medium shrink-0">
          Showing {filteredNews.length} Reports
        </div>
      </div>

      {/* Featured Breaking Report Card */}
      {isAllSelected && featuredNews && (
        <article className="modern-glass-card p-5 sm:p-8 space-y-5 sm:space-y-6 border border-indigo-200/90 shadow-md">
          {/* Header Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-200/70 pb-3.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded bg-indigo-600 text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">
                Featured Report
              </span>
              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold text-[11px] sm:text-xs">
                {featuredNews.category}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] sm:text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {featuredNews.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {featuredNews.readTime}
              </span>
            </div>
          </div>

          {/* Title & Lead Summary */}
          <div className="space-y-2.5">
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {featuredNews.title}
            </h2>
            <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
              {featuredNews.excerpt}
            </p>
          </div>

          {/* 3-Card Technical Analysis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                What Changed
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {featuredNews.content.whatChanged}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200/80 space-y-1.5">
              <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-700" />
                Why It Matters
              </h4>
              <p className="text-xs text-indigo-950 leading-relaxed">
                {featuredNews.content.whyItMatters}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-700" />
                Future Impact
              </h4>
              <p className="text-xs text-emerald-950 leading-relaxed">
                {featuredNews.content.futureImpact}
              </p>
            </div>
          </div>

          {/* Technical Highlights */}
          {featuredNews.content.technicalHighlights && (
            <div className="pt-2 border-t border-slate-200/80 space-y-2">
              <span className="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Technical Highlights & Benchmarks:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {featuredNews.content.technicalHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Source Link Bar */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <span className="text-slate-500 font-medium">Published by {featuredNews.source}</span>
            <a
              href={featuredNews.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold transition-colors border border-indigo-200 shadow-2xs"
            >
              <span>Read Original Report</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </article>
      )}

      {/* News Feed Cards Layout */}
      <div className="space-y-5 sm:space-y-6">
        {filteredNews.map((item) => (
          <article
            key={item.id}
            className="modern-glass-card p-5 sm:p-7 space-y-4 sm:space-y-5 transition-all duration-200 hover:border-indigo-300 shadow-xs"
          >
            {/* Header Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-semibold px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">• {item.publishedAt}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {item.readTime}
                </span>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold transition-colors"
                >
                  <span>{item.source}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Title & Excerpt */}
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                {item.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.excerpt}</p>
            </div>

            {/* 3-Section Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1">
                <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block flex items-center gap-1">
                  <Zap className="w-3 h-3 text-indigo-600" />
                  What Changed
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">{item.content.whatChanged}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-indigo-50/60 border border-indigo-200/70 space-y-1">
                <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider block flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-indigo-700" />
                  Why It Matters
                </span>
                <p className="text-xs text-indigo-950 leading-relaxed">{item.content.whyItMatters}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200/70 space-y-1">
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block flex items-center gap-1">
                  <Layers className="w-3 h-3 text-emerald-700" />
                  Future Impact
                </span>
                <p className="text-xs text-emerald-950 leading-relaxed">{item.content.futureImpact}</p>
              </div>
            </div>

            {/* Technical Highlights Tags */}
            {item.content.technicalHighlights && (
              <div className="pt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                {item.content.technicalHighlights.map((highlight, hIdx) => (
                  <span
                    key={hIdx}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
