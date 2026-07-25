'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Newspaper, Send } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const isNewsActive = pathname === '/';
  const isLearnActive = pathname.startsWith('/learn') || pathname.startsWith('/blog');

  return (
    <header className="sticky top-0 z-50 modern-glass-nav">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Send className="w-4 h-4 transform -rotate-12 translate-x-[-1px] translate-y-[1px]" />
          </div>
          <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900">
            Token<span className="text-indigo-600">Flight</span>
          </span>
        </Link>

        {/* Primary Navigation Links */}
        <nav className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <Link
            href="/"
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              isNewsActive
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <Newspaper className="w-4 h-4 text-indigo-600" />
            <span>Latest AI News</span>
          </Link>

          <Link
            href="/learn"
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
              isLearnActive
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Learn</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
