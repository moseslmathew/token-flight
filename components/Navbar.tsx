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
          ? 'bg-paper/90 backdrop-blur-md border-b border-rule shadow-xs'
          : 'bg-paper/70 backdrop-blur-sm border-b border-rule/60'
      }`}
    >
      <div className="measure-wide flex h-14 items-center justify-between gap-6 px-4 sm:px-6">
        {/* Wordmark */}
        <Link href="/" className="group flex items-baseline gap-px shrink-0">
          <span className="text-[1.25rem] font-bold tracking-tight text-ink-strong">
            Token
          </span>
          <span className="text-[1.25rem] font-bold tracking-tight text-accent transition-colors duration-200 group-hover:text-accent-deep">
            Flight
          </span>
        </Link>

        {/* Primary navigation */}
        <nav className="flex items-center gap-1 sm:gap-2 rounded-full bg-card/80 p-1 border border-rule/80">
          {NAV_LINKS.map((link) => {
            const active = link.match(pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-full px-4 py-1 text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  active
                    ? 'bg-paper text-ink-strong shadow-xs font-semibold'
                    : 'text-ink-muted hover:text-ink-strong'
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
