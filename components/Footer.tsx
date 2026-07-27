import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="measure-wide flex flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div className="space-y-2">
          <Link href="/" className="flex items-baseline gap-px">
            <span className="text-lg font-semibold tracking-tight text-ink-strong">
              Token
            </span>
            <span className="text-lg font-semibold tracking-tight text-accent">
              Flight
            </span>
          </Link>
          <p className="max-w-sm text-meta text-ink-muted">
            First-principles notes on language models — written to be understood, not skimmed.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <nav className="flex items-center gap-5 text-meta text-ink-muted">
            <Link href="/" className="transition-colors hover:text-ink-strong">
              Latest AI News
            </Link>
            <Link href="/learn" className="transition-colors hover:text-ink-strong">
              Learn
            </Link>
          </nav>
          <p className="text-meta text-ink-faint">
            © {new Date().getFullYear()} TokenFlight
          </p>
        </div>
      </div>
    </footer>
  );
}
