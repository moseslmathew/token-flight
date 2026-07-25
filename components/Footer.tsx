'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/80 text-slate-500 text-xs mt-auto py-7">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2">
          <span className="font-semibold text-slate-800">© {new Date().getFullYear()} TokenFlight.</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="text-slate-500">First-Principles AI & Token Engineering</span>
        </div>

        <div className="text-[10px] font-extrabold tracking-[0.14em] text-slate-400 uppercase">
          From Tokens to Intelligence
        </div>
      </div>
    </footer>
  );
}
