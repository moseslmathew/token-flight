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
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? 'bg-paper/85 backdrop-blur-md border-b border-rule'
          : 'bg-paper border-b border-transparent'
      }`}
    >
      <div className="measure-wide flex h-[4.5rem] items-center justify-between gap-6 px-4 sm:px-6">
        {/* Wordmark */}
        <Link href="/" className="group flex items-baseline gap-px shrink-0">
          <span className="text-[1.375rem] font-semibold tracking-tight text-ink-strong">
            Token
          </span>
          <span className="text-[1.375rem] font-semibold tracking-tight text-accent transition-colors duration-200 group-hover:text-accent">
            Flight
          </span>
        </Link>

        {/* Primary navigation */}
        <nav className="flex items-center gap-5 sm:gap-7 shrink-0">
          {NAV_LINKS.map((link) => {
            const active = link.match(pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                aria-current={active ? 'page' : undefined}
                className={`link-underline pb-0.5 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-200 ${
                  active ? 'text-ink-strong' : 'text-ink-muted hover:text-ink-strong'
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
