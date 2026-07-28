import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-rule bg-surface/60">
      <div className="measure-wide px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:items-start">
          {/* Brand info */}
          <div className="space-y-3">
            <Link href="/" className="group flex items-center gap-1.5 shrink-0">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-white font-mono text-[0.6875rem] font-bold shadow-xs">
                TF
              </span>
              <span className="text-lg font-bold tracking-tight text-ink-strong">
                Token<span className="text-accent">Flight</span>
              </span>
            </Link>
            <p className="max-w-xs text-xs leading-relaxed text-ink-muted">
              First-principles engineering notes and real-time model dispatch for AI builders and researchers.
            </p>
          </div>

          {/* Nav links */}
          <div className="space-y-2.5 sm:text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</span>
            <nav className="flex flex-col sm:items-center gap-2 text-sm font-medium text-ink-muted">
              <Link href="/" className="transition-colors hover:text-accent">
                Latest AI News
              </Link>
              <Link href="/learn" className="transition-colors hover:text-accent">
                Learn AI Guides
              </Link>
            </nav>
          </div>

          {/* Copyright & Meta */}
          <div className="space-y-2.5 sm:text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Publication</span>
            <p className="text-xs font-medium text-slate-500">
              Curated daily & updated automatically.
            </p>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} TokenFlight Notes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
