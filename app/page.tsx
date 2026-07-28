'use client';

import React, { useState, useCallback } from 'react';
import { AI_NEWS_ITEMS, AINewsItem } from '@/lib/data/news';
import {
  ExternalLink,
  Share2,
  Check,
  Link2,
  Twitter,
  Linkedin,
  Mail,
} from 'lucide-react';

function ShareButton({ title, text, slug }: { title: string; text: string; slug: string }) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const getShareUrl = useCallback(() => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/#${slug}`;
    }
    return '';
  }, [slug]);

  const handleShareClick = useCallback(async () => {
    const url = getShareUrl();
    // Launch device native share sheet directly on mobile phones like native apps
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
      }
    }
    // Fallback for desktop or non-native share browsers
    setShowMenu((v) => !v);
  }, [title, text, getShareUrl]);

  const handleCopyLink = useCallback(async () => {
    const url = getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [getShareUrl]);

  const shareToTwitter = useCallback(() => {
    const url = getShareUrl();
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setShowMenu(false);
  }, [title, getShareUrl]);

  const shareToLinkedIn = useCallback(() => {
    const url = getShareUrl();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setShowMenu(false);
  }, [getShareUrl]);

  const shareViaEmail = useCallback(() => {
    const url = getShareUrl();
    window.open(
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
      '_self'
    );
    setShowMenu(false);
  }, [title, text, getShareUrl]);

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShareClick}
        className="inline-flex cursor-pointer items-center gap-1.5 text-meta font-medium text-ink-muted transition-colors hover:text-accent"
        aria-label={`Share ${title}`}
      >
        <Share2 className="h-3.5 w-3.5" />
        <span>Share</span>
      </button>

      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-ink-strong/25 backdrop-blur-[1px] sm:bg-transparent sm:backdrop-blur-none"
            onClick={() => setShowMenu(false)}
          />

          {/* Desktop dropdown */}
          <div className="animate-share-menu-in absolute bottom-full right-0 z-50 mb-2 hidden w-56 overflow-hidden rounded-xl border border-rule bg-surface shadow-xl sm:block">
            <div className="space-y-0.5 p-1.5">
              <button
                onClick={handleCopyLink}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-meta text-ink transition-colors hover:bg-accent-soft hover:text-accent-deep"
              >
                <span className="flex items-center gap-2.5">
                  <Link2 className="h-3.5 w-3.5 text-ink-faint" />
                  Copy link
                </span>
                {copied && <Check className="h-3.5 w-3.5 text-accent" />}
              </button>
              <div className="my-0.5 border-t border-rule-soft" />
              <button
                onClick={shareToTwitter}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-meta text-ink transition-colors hover:bg-paper-deep"
              >
                <Twitter className="h-3.5 w-3.5 text-ink-faint" />
                Share on X / Twitter
              </button>
              <button
                onClick={shareToLinkedIn}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-meta text-ink transition-colors hover:bg-paper-deep"
              >
                <Linkedin className="h-3.5 w-3.5 text-ink-faint" />
                Share on LinkedIn
              </button>
              <button
                onClick={shareViaEmail}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-meta text-ink transition-colors hover:bg-paper-deep"
              >
                <Mail className="h-3.5 w-3.5 text-ink-faint" />
                Share via email
              </button>
            </div>
          </div>

          {/* Mobile bottom sheet */}
          <div className="animate-slide-up fixed inset-x-0 bottom-0 z-50 space-y-4 rounded-t-3xl border-t border-rule bg-surface p-5 shadow-2xl sm:hidden">
            <div className="mx-auto h-1 w-10 rounded-full bg-rule" />

            <div className="space-y-1 text-center">
              <h3 className="text-h3 font-semibold text-ink-strong">Share report</h3>
              <p className="line-clamp-1 text-meta text-ink-muted">{title}</p>
            </div>

            <div className="grid grid-cols-4 gap-3 pb-1 pt-2">
              {[
                {
                  onClick: handleCopyLink,
                  icon: copied ? <Check className="h-5 w-5 text-accent" /> : <Link2 className="h-5 w-5" />,
                  label: copied ? 'Copied' : 'Copy link',
                },
                { onClick: shareToTwitter, icon: <Twitter className="h-5 w-5" />, label: 'X / Twitter' },
                { onClick: shareToLinkedIn, icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn' },
                { onClick: shareViaEmail, icon: <Mail className="h-5 w-5" />, label: 'Email' },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className="flex cursor-pointer flex-col items-center gap-1.5 rounded-xl p-2 transition-colors hover:bg-paper-deep"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper-deep text-ink">
                    {action.icon}
                  </span>
                  <span className="text-[0.6875rem] text-ink-muted">{action.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowMenu(false)}
              className="w-full cursor-pointer rounded-xl bg-paper-deep py-3 text-meta font-medium text-ink transition-colors hover:bg-rule"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* Three-part analysis, set as distinct cards for optimal editorial visual hierarchy */
function Analysis({ item, dense = false }: { item: AINewsItem; dense?: boolean }) {
  const parts = [
    {
      label: 'What changed',
      body: item.content.whatChanged,
      containerStyle: 'bg-slate-50/80 border-slate-200/80 text-slate-800',
      labelStyle: 'text-slate-500',
    },
    {
      label: 'Why it matters',
      body: item.content.whyItMatters,
      containerStyle: 'bg-emerald-50/70 border-emerald-200/70 text-emerald-950',
      labelStyle: 'text-emerald-700',
    },
    {
      label: 'Future impact',
      body: item.content.futureImpact,
      containerStyle: 'bg-surface border-slate-200 text-slate-700',
      labelStyle: 'text-slate-500',
    },
  ];

  return (
    <div className={dense ? 'grid gap-3.5 lg:grid-cols-3' : 'grid gap-4 sm:grid-cols-3'}>
      {parts.map((part) => (
        <div
          key={part.label}
          className={`rounded-xl border p-4.5 sm:p-5 transition-colors ${part.containerStyle}`}
        >
          <span className={`eyebrow block text-[0.6875rem] font-bold tracking-wider mb-2 ${part.labelStyle}`}>
            {part.label}
          </span>
          <p
            className={`leading-relaxed ${
              dense ? 'text-[0.9375rem]' : 'text-[1rem]'
            }`}
          >
            {part.body}
          </p>
        </div>
      ))}
    </div>
  );
}

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

  const activeCategories = categories.filter((cat) => {
    if (cat === 'All') return true;
    return AI_NEWS_ITEMS.some((n) => n.category === cat);
  });

  const filteredNews =
    selectedCategory && selectedCategory !== 'All'
      ? AI_NEWS_ITEMS.filter((item) => item.category === selectedCategory)
      : AI_NEWS_ITEMS;

  const featuredNews = AI_NEWS_ITEMS.find((n) => n.featured) || AI_NEWS_ITEMS[0];

  const isAllSelected = !selectedCategory || selectedCategory === 'All';
  const feedNews = isAllSelected
    ? filteredNews.filter((item) => item.id !== featuredNews?.id)
    : filteredNews;

  return (
    <div className="ambient-glow min-h-screen pb-16">
      <div className="measure-wide px-4 pt-8 sm:px-6 sm:pt-12">
        {/* Masthead */}
        <header className="animate-rise-in space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 text-xs font-semibold text-emerald-800 shadow-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
            AI Engineering & Model Intelligence
          </div>
          <h1 className="text-display font-extrabold tracking-tight text-ink-strong">
            Latest AI News & Benchmarks
          </h1>
          <p className="text-lede text-ink-muted leading-relaxed">
            Frontier model releases, architectural breakthroughs, and compute infrastructure — reduced to what changed, why it matters, and where it leads.
          </p>
        </header>

        {/* Category filter */}
        <div className="mt-10 border-b border-rule pb-1">
          <div className="no-scrollbar filter-rail flex items-center gap-2.5 overflow-x-auto py-2">
            {activeCategories.map((cat) => {
              const isSelected = cat === 'All' ? isAllSelected : selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === 'All' ? null : isSelected ? null : cat)}
                  aria-pressed={isSelected}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
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

        {/* Featured report */}
        {isAllSelected && featuredNews && (
          <article
            id={featuredNews.slug}
            className="scroll-mt-28 mt-10 rounded-2xl bg-surface border border-rule p-6 sm:p-10 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_30px_-4px_rgba(15,23,42,0.08)] transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-accent text-white px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider">
                  Featured Report
                </span>
                <span className="rounded-md bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider">
                  {featuredNews.category}
                </span>
                <span className="text-meta text-ink-faint ml-1 font-medium">{featuredNews.publishedAt}</span>
                <span className="text-meta text-ink-faint">·</span>
                <span className="text-meta text-ink-muted font-medium">{featuredNews.source}</span>
              </div>

              <h2 className="text-[1.875rem] sm:text-[2.25rem] font-bold tracking-tight text-ink-strong leading-snug">
                {featuredNews.title}
              </h2>

              <p className="text-lede text-ink-muted leading-relaxed">{featuredNews.excerpt}</p>
            </div>

            <div className="mt-8">
              <Analysis item={featuredNews} />
            </div>

            {featuredNews.content.technicalHighlights && (
              <div className="mt-8 border-t border-rule-soft pt-6">
                <span className="eyebrow block text-ink-muted mb-3 font-semibold">Technical Highlights</span>
                <div className="flex flex-wrap gap-2">
                  {featuredNews.content.technicalHighlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 px-3 py-1 text-xs font-semibold"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-rule-soft pt-6">
              <a
                href={featuredNews.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-deep"
              >
                Read the original release
                <ExternalLink className="h-4 w-4" />
              </a>
              <ShareButton
                title={featuredNews.title}
                text={featuredNews.excerpt}
                slug={featuredNews.slug}
              />
            </div>
          </article>
        )}

        {/* Feed */}
        <div className="mt-8 space-y-6">
          {feedNews.map((item) => (
            <article
              key={item.id}
              id={item.slug}
              className="scroll-mt-28 rounded-2xl bg-surface border border-rule p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-meta text-ink-faint ml-1 font-medium">{item.publishedAt}</span>
              </div>

              <h2 className="mt-3.5 text-h2 font-bold tracking-tight text-ink-strong">
                {item.title}
              </h2>

              <p className="mt-2.5 text-[1.0625rem] leading-relaxed text-ink-muted">
                {item.excerpt}
              </p>

              <div className="mt-7">
                <Analysis item={item} dense />
              </div>

              {item.content.technicalHighlights && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.content.technicalHighlights.map((highlight, hIdx) => (
                    <span
                      key={hIdx}
                      className="rounded-full bg-slate-100/80 text-slate-700 border border-slate-200 px-3 py-1 text-xs font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-rule-soft pt-5">
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-deep"
                >
                  Source: {item.source}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <ShareButton title={item.title} text={item.excerpt} slug={item.slug} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
