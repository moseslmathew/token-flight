'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Latest AI News', match: (p: string) => p === '/' },
  {
    href: '/learn',
    label: 'Learn',
    match: (p: string) => p.startsWith('/learn') || p.startsWith('/blog'),
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-xl border-b border-rule shadow-sm'
          : 'bg-paper/70 backdrop-blur-md border-b border-rule/50'
      }`}
    >
      <div className="measure-wide flex h-16 items-center justify-between gap-6 px-4 sm:px-6">
        {/* Wordmark */}
        <Link href="/" className="group flex items-center gap-1.5 shrink-0">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white font-mono text-xs font-bold shadow-xs transition-transform duration-200 group-hover:scale-105">
            TF
          </span>
          <span className="text-[1.25rem] font-bold tracking-tight text-ink-strong">
            Token<span className="text-accent transition-colors duration-200 group-hover:text-accent-deep">Flight</span>
          </span>
        </Link>

        {/* Primary navigation */}
        <nav className="flex items-center gap-1 rounded-full bg-paper-deep/90 p-1 border border-rule/80 shadow-xs">
          {NAV_LINKS.map((link) => {
            const active = link.match(pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  active
                    ? 'bg-surface text-accent shadow-xs border border-rule/60'
                    : 'text-ink-muted hover:text-ink-strong hover:bg-surface/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
