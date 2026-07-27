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

/* Three-part analysis, set as ruled columns rather than filled boxes */
function Analysis({ item, dense = false }: { item: AINewsItem; dense?: boolean }) {
  const parts = [
    { label: 'What changed', body: item.content.whatChanged, rule: 'border-accent' },
    { label: 'Why it matters', body: item.content.whyItMatters, rule: 'border-cool' },
    { label: 'Future impact', body: item.content.futureImpact, rule: 'border-ink-faint/50' },
  ];

  return (
    <div className={dense ? 'grid gap-6 lg:grid-cols-3' : 'space-y-7'}>
      {parts.map((part) => (
        <div key={part.label} className={`border-l-2 pl-4 sm:pl-5 ${part.rule}`}>
          <span className="eyebrow block text-ink-muted">{part.label}</span>
          <p
            className={`mt-2 leading-relaxed text-ink ${
              dense ? 'text-[1rem]' : 'text-[1.0625rem]'
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
    <div className="measure-wide px-4 pb-8 pt-6 sm:px-6 sm:pt-10">
      {/* Masthead */}
      <header className="animate-rise-in space-y-3">
        <h1 className="text-h1 font-semibold text-ink-strong">Latest AI news</h1>
        <p className="text-lede text-ink-muted">
          Frontier model releases, research and infrastructure — each one read closely and reduced
          to what changed, why it matters, and where it leads.
        </p>
      </header>

      {/* Category filter */}
      <div className="mt-12 flex items-center justify-between gap-6 border-b border-rule">
        <div className="no-scrollbar filter-rail flex min-w-0 w-full items-center gap-6 overflow-x-auto py-3.5 pr-10 sm:gap-7 lg:pr-0">
          {activeCategories.map((cat) => {
            const isSelected = cat === 'All' ? isAllSelected : selectedCategory === cat;
            const count =
              cat === 'All'
                ? AI_NEWS_ITEMS.length
                : AI_NEWS_ITEMS.filter((n) => n.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'All' ? null : isSelected ? null : cat)}
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

        <span className="hidden shrink-0 text-meta text-ink-faint lg:block">
          {filteredNews.length} reports
        </span>
      </div>

      {/* Featured report */}
      {isAllSelected && featuredNews && (
        <article id={featuredNews.slug} className="scroll-mt-28 border-b border-rule py-14">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="eyebrow text-accent">Featured report</span>
              <span className="text-ink-faint">·</span>
              <span className="eyebrow text-ink-faint">{featuredNews.category}</span>
              <span className="text-ink-faint">·</span>
              <span className="text-meta text-ink-faint">{featuredNews.publishedAt}</span>
              <span className="text-ink-faint">·</span>
              <span className="text-meta text-ink-muted">{featuredNews.source}</span>
            </div>

            <h2 className="text-display font-semibold text-ink-strong">
              {featuredNews.title}
            </h2>

            <p className="text-lede text-ink-muted">{featuredNews.excerpt}</p>
          </div>

          <div className="mt-10">
            <Analysis item={featuredNews} />
          </div>

          {featuredNews.content.technicalHighlights && (
            <div className="mt-10 border-t border-rule-soft pt-7">
              <span className="eyebrow block text-ink-faint">Technical highlights</span>
              <ul className="mt-4 space-y-2.5">
                {featuredNews.content.technicalHighlights.map((highlight, idx) => (
                  <li key={idx} className="flex gap-3 text-[1.0625rem] text-ink">
                    <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={featuredNews.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-meta font-medium text-accent transition-colors hover:text-accent-deep"
            >
              Read the original report
              <ExternalLink className="h-3.5 w-3.5" />
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
      <div className="divide-y divide-rule">
        {feedNews.map((item) => (
          <article key={item.id} id={item.slug} className="scroll-mt-28 py-12">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="eyebrow text-accent">{item.category}</span>
              <span className="text-ink-faint">·</span>
              <span className="text-meta text-ink-faint">{item.publishedAt}</span>
            </div>

            <h2 className="mt-4 text-h2 font-semibold text-ink-strong">
              {item.title}
            </h2>

            <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-muted">
              {item.excerpt}
            </p>

            <div className="mt-8">
              <Analysis item={item} dense />
            </div>

            {item.content.technicalHighlights && (
              <div className="mt-7 flex flex-wrap gap-2">
                {item.content.technicalHighlights.map((highlight, hIdx) => (
                  <span
                    key={hIdx}
                    className="rounded-full border border-rule px-3 py-1 text-meta text-ink-muted"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-meta font-medium text-accent transition-colors hover:text-accent-deep"
              >
                {item.source}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <ShareButton title={item.title} text={item.excerpt} slug={item.slug} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
