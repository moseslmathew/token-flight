'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { AnimSection, Anim } from '@/components/ScrollAnim';

/* ─── Floating Token Chips Background ─── */
function FloatingTokens() {
  const chips = [
    { v: 'the', x: 6, y: 8, d: 14 },
    { v: 'in', x: 30, y: 5, d: 18 },
    { v: 'th', x: 16, y: 16, d: 15 },
    { v: 'ain', x: 46, y: 10, d: 20 },
    { v: 'a', x: 62, y: 6, d: 13 },
    { v: 'main', x: 78, y: 12, d: 19 },
    { v: 't', x: 88, y: 22, d: 16 },
    { v: 'un', x: 10, y: 32, d: 17 },
    { v: 'believ', x: 36, y: 26, d: 22 },
    { v: 'able', x: 58, y: 30, d: 15 },
    { v: 'r', x: 22, y: 40, d: 12 },
    { v: 'e', x: 70, y: 40, d: 18 },
    { v: 'rain', x: 84, y: 36, d: 21 },
    { v: 'h', x: 4, y: 44, d: 14 },
    { v: 'again', x: 48, y: 44, d: 20 },
    { v: 'n', x: 92, y: 6, d: 16 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {chips.map((c, i) => (
        <span
          key={i}
          className="absolute font-mono text-xs sm:text-sm text-slate-300/60 bg-white/40 border border-slate-200/60 rounded px-1.5 py-0.5"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            animation: `floatNum ${c.d}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.6}s`,
          }}
        >
          {c.v}
        </span>
      ))}
    </div>
  );
}

/* ─── Small building blocks reused across sections ─── */
function CharChip({
  children,
  tone = 'default',
  show = true,
  delay = 0,
}: {
  children: React.ReactNode;
  tone?: 'default' | 'merged' | 'merged2' | 'faded';
  show?: boolean;
  delay?: number;
}) {
  const toneClasses: Record<string, string> = {
    default: 'bg-white border-slate-800 text-slate-900',
    merged: 'bg-indigo-500 border-indigo-600 text-white',
    merged2: 'bg-red-500 border-red-600 text-white',
    faded: 'bg-slate-100 border-slate-200 text-slate-400',
  };
  return (
    <span
      className={`inline-flex items-center justify-center border-2 rounded-md px-2 py-1 sm:px-2.5 sm:py-1.5 font-mono text-xs sm:text-sm font-bold ${toneClasses[tone]}`}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'scale(1)' : 'scale(0.6)',
        transition: `all 0.4s cubic-bezier(0.34,1.56,0.64,1) ${delay}s`,
      }}
    >
      {children}
    </span>
  );
}

function WordCountBadge({ count }: { count: number }) {
  return (
    <span className="text-[10px] font-mono text-slate-400 mr-2 w-5 inline-block text-right">
      ×{count}
    </span>
  );
}

/* ─── Main Article ─── */
export default function BpeArticle() {
  const corpusWords = [
    { word: 'the', count: 2 },
    { word: 'train', count: 1 },
    { word: 'came', count: 1 },
    { word: 'in', count: 1 },
    { word: 'rain', count: 1 },
    { word: 'again', count: 1 },
  ];

  const splitWords = [
    { word: 'the', count: 2, chars: ['t', 'h', 'e'] },
    { word: 'train', count: 1, chars: ['t', 'r', 'a', 'i', 'n'] },
    { word: 'came', count: 1, chars: ['c', 'a', 'm', 'e'] },
    { word: 'in', count: 1, chars: ['i', 'n'] },
    { word: 'rain', count: 1, chars: ['r', 'a', 'i', 'n'] },
    { word: 'again', count: 1, chars: ['a', 'g', 'a', 'i', 'n'] },
  ];

  const pairCounts = [
    { pair: 'i · n', count: 4 },
    { pair: 'a · i', count: 3 },
    { pair: 't · h', count: 2 },
    { pair: 'h · e', count: 2 },
    { pair: 'r · a', count: 2 },
    { pair: 'c · a', count: 1 },
  ];

  const afterMerge1 = [
    { word: 'the', count: 2, tokens: [{ t: 't', m: false }, { t: 'h', m: false }, { t: 'e', m: false }] },
    { word: 'train', count: 1, tokens: [{ t: 't', m: false }, { t: 'r', m: false }, { t: 'a', m: false }, { t: 'in', m: true }] },
    { word: 'came', count: 1, tokens: [{ t: 'c', m: false }, { t: 'a', m: false }, { t: 'm', m: false }, { t: 'e', m: false }] },
    { word: 'in', count: 1, tokens: [{ t: 'in', m: true }] },
    { word: 'rain', count: 1, tokens: [{ t: 'r', m: false }, { t: 'a', m: false }, { t: 'in', m: true }] },
    { word: 'again', count: 1, tokens: [{ t: 'a', m: false }, { t: 'g', m: false }, { t: 'a', m: false }, { t: 'in', m: true }] },
  ];

  const afterMerge2 = [
    { word: 'the', tokens: [{ t: 't' }, { t: 'h' }, { t: 'e' }] },
    { word: 'train', tokens: [{ t: 't' }, { t: 'r' }, { t: 'ain', m2: true }] },
    { word: 'came', tokens: [{ t: 'c' }, { t: 'a' }, { t: 'm' }, { t: 'e' }] },
    { word: 'in', tokens: [{ t: 'in' }] },
    { word: 'rain', tokens: [{ t: 'r' }, { t: 'ain', m2: true }] },
    { word: 'again', tokens: [{ t: 'a' }, { t: 'g' }, { t: 'ain', m2: true }] },
  ];

  const mergeRules = [
    { n: 1, a: 'i', b: 'n', out: 'in' },
    { n: 2, a: 'a', b: 'in', out: 'ain' },
    { n: 3, a: 't', b: 'h', out: 'th' },
    { n: 4, a: 'th', b: 'e', out: 'the' },
  ];

  const finalVocab = [
    { id: 0, tok: 'a' }, { id: 1, tok: 'c' }, { id: 2, tok: 'e' }, { id: 3, tok: 'g' },
    { id: 4, tok: 'h' }, { id: 5, tok: 'i' }, { id: 6, tok: 'm' }, { id: 7, tok: 'n' },
    { id: 8, tok: 'r' }, { id: 9, tok: 't' }, { id: 10, tok: 'in' }, { id: 11, tok: 'ain' },
    { id: 12, tok: 'th' }, { id: 13, tok: 'the' },
  ];

  const finalTokenization = [
    { word: 'the', tokens: ['the'] },
    { word: 'train', tokens: ['t', 'r', 'ain'] },
    { word: 'came', tokens: ['c', 'a', 'm', 'e'] },
    { word: 'in', tokens: ['in'] },
    { word: 'rain', tokens: ['r', 'ain'] },
    { word: 'again', tokens: ['a', 'g', 'ain'] },
  ];

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/learn"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all articles
      </Link>

      {/* ═══ Hero ═══ */}
      <AnimSection className="relative mt-8 mb-12 py-16 sm:py-24 overflow-hidden rounded-3xl bg-[#faf9f5]" rootMargin="0px">
        {(show) => (
          <>
            <FloatingTokens />
            <div className="relative z-10 text-center px-6">
              <Anim show={show}>
                <div className="flex items-center justify-center gap-3 text-xs text-slate-500 mb-6">
                  <span className="font-semibold px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">LLMs</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />12 min read</span>
                  <span>•</span>
                  <span>July 2026</span>
                </div>
              </Anim>
              <Anim show={show} delay={0.15}>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                  How an LLM Gets<br />Its Vocabulary
                </h1>
              </Anim>
              <Anim show={show} delay={0.3}>
                <div className="w-12 h-0.5 bg-red-400 mx-auto mb-4" />
                <p className="text-sm tracking-[0.3em] uppercase text-slate-500 font-medium">BPE From Scratch</p>
              </Anim>
            </div>
          </>
        )}
      </AnimSection>

      {/* Intro */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-12">
        <p className="text-slate-700 leading-relaxed mb-4">
          Language models don&apos;t read letters, and they don&apos;t read whole words either —
          they read <strong>tokens</strong>. Take the word &quot;unbelievable.&quot; A model doesn&apos;t
          see 12 letters. It sees three chunks:
        </p>
        <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
          <CharChip tone="merged">un</CharChip>
          <CharChip tone="merged">believ</CharChip>
          <CharChip tone="merged">able</CharChip>
        </div>
        <p className="text-slate-700 leading-relaxed">
          Those three chunks come from an algorithm called <strong>Byte Pair Encoding (BPE)</strong>.
          This article builds a tokenizer from scratch, by hand, using a corpus of just six words —
          so you can follow every single step — and ends with the exact same algorithm that powers
          <strong> tiktoken</strong>, the tokenizer behind GPT-4.
        </p>
      </div>

      <div className="divide-y divide-slate-100">

        {/* ═══ 01 — A Brief History ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">01 — A BRIEF HISTORY</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Born for compression, not language</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  BPE existed for twenty years before language models ever found a use for it.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="relative">
                  <div className="hidden sm:block absolute top-5 left-[8%] right-[8%] h-px bg-slate-200" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {[
                      { year: '1994', label: 'DATA COMPRESSION', color: 'bg-indigo-500', body: 'Philip Gage invents BPE to shrink files: replace the most frequent byte pair with a new byte.' },
                      { year: '2016', label: 'MACHINE TRANSLATION', color: 'bg-emerald-500', body: "Sennrich et al. reuse it for translation — subwords solve the rare-word problem." },
                      { year: '2019', label: 'GPT-2', color: 'bg-amber-500', body: 'OpenAI trains GPT-2 with byte-level BPE — any text, any language, no unknowns.' },
                    ].map((e, i) => (
                      <div key={e.year} className="text-center flex flex-col" style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.5s ease ${0.3 + i * 0.15}s` }}>
                        <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${e.color}`} />
                        <div className="font-mono text-sm font-bold text-slate-800 mb-1">{e.year}</div>
                        <div className="bg-white border border-slate-200 rounded-xl p-4 text-left flex-1">
                          <p className="text-[10px] font-semibold tracking-widest text-slate-400 mb-1">{e.label}</p>
                          <p className="text-sm text-slate-600 leading-snug">{e.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.5}>
                <div className="callout-box mt-10">
                  <strong className="text-indigo-800">Why this matters:</strong> BPE wasn&apos;t designed for
                  language at all — it was a data-compression trick. Its genius is that the same simple
                  idea (merge what repeats) turned out to be exactly what tokenizers needed: a way to
                  build a vocabulary automatically, from data, with no linguist required.
                </div>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 02 — The Setup ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">02 — THE SETUP</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Split into words, count each one</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  Word counts are all BPE needs to start. We&apos;ll use a tiny six-word corpus so you
                  can follow every merge by hand:
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8">
                  <p className="text-center font-serif text-lg sm:text-xl text-slate-800 mb-8">
                    &quot;the train came in the rain again&quot;
                  </p>
                  <div className="max-w-xs mx-auto space-y-2">
                    {corpusWords.map((w, i) => (
                      <div key={w.word} className="flex items-center justify-between" style={{ opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(-15px)', transition: `all 0.4s ease ${0.3 + i * 0.08}s` }}>
                        <span className="font-mono text-sm text-slate-800">{w.word}</span>
                        <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 rounded px-2 py-0.5">×{w.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.4}>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  Real tokenizers do this over billions of pages of text. But the algorithm is identical
                  whether the corpus has six words or six billion — so we can watch every step happen
                  by hand and trust it scales.
                </p>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 03 — Step 1: Split ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">03 — STEP 1 · SPLIT</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Split every word into characters</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  Each character becomes a starting entry in the vocabulary — the thing BPE exists to build.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8">
                  <div className="space-y-3 mb-8">
                    {splitWords.map((w, wi) => (
                      <div key={w.word} className="flex items-center flex-wrap gap-1.5" style={{ opacity: show ? 1 : 0, transition: `opacity 0.4s ease ${0.3 + wi * 0.1}s` }}>
                        <WordCountBadge count={w.count} />
                        {w.chars.map((c, ci) => (
                          <CharChip key={ci} show={show} delay={0.35 + wi * 0.1 + ci * 0.04}>{c}</CharChip>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-200 pt-4 text-center">
                    <p className="text-[10px] font-semibold tracking-widest text-slate-400 mb-2">STARTING VOCABULARY</p>
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      {['a', 'c', 'e', 'g', 'h', 'i', 'm', 'n', 'r', 't'].map((c, i) => (
                        <CharChip key={c} tone="faded" show={show} delay={1 + i * 0.05}>{c}</CharChip>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">10 tokens — one per character</p>
                  </div>
                </div>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 04 — Step 2: Count ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">04 — STEP 2 · COUNT</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Count every adjacent pair</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  A word seen twice adds 2 to each of its pairs. Sum every neighboring character pair
                  across the whole corpus:
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8">
                  <div className="max-w-md mx-auto space-y-2.5">
                    {pairCounts.map((p, i) => (
                      <div key={p.pair} className="flex items-center gap-3" style={{ opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(-20px)', transition: `all 0.4s ease ${0.3 + i * 0.1}s` }}>
                        <span className="font-mono text-sm text-slate-700 w-14">{p.pair}</span>
                        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${i === 0 ? 'bg-indigo-500' : 'bg-slate-400'}`}
                            style={{ width: show ? `${(p.count / 4) * 100}%` : '0%', transition: `width 0.8s ease ${0.5 + i * 0.1}s` }}
                          />
                        </div>
                        <span className={`text-sm font-mono font-bold w-4 ${i === 0 ? 'text-indigo-600' : 'text-slate-500'}`}>{p.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.5}>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  The pair <code className="code-inline">i · n</code> wins with a count of 4 — it shows
                  up in &quot;tra<strong>in</strong>,&quot; &quot;<strong>in</strong>&quot; itself,
                  &quot;ra<strong>in</strong>,&quot; and &quot;aga<strong>in</strong>.&quot;
                  That makes it the first pair to merge.
                </p>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 05 — Step 3: Merge ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">05 — STEP 3 · MERGE</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Merge the winner — the vocabulary grows</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  Every <code className="code-inline">i n</code> becomes a single token{' '}
                  <code className="code-inline">in</code> — everywhere it appears.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8">
                  <div className="space-y-3 mb-6">
                    {afterMerge1.map((w, wi) => (
                      <div key={w.word} className="flex items-center flex-wrap gap-1.5">
                        <WordCountBadge count={w.count} />
                        {w.tokens.map((t, ti) => (
                          <CharChip key={ti} tone={t.m ? 'merged' : 'default'} show={show} delay={0.3 + wi * 0.08 + ti * 0.05}>{t.t}</CharChip>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-200 pt-4 text-center">
                    <p className="text-[10px] font-semibold tracking-widest text-slate-400 mb-2">VOCABULARY</p>
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      {['a', 'c', 'e', 'g', 'h', 'i', 'm', 'n', 'r', 't'].map((c) => (
                        <CharChip key={c} tone="faded">{c}</CharChip>
                      ))}
                      <CharChip tone="merged">in</CharChip>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">11 tokens</p>
                  </div>
                </div>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 06 — Step 4: Repeat ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">06 — STEP 4 · REPEAT</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Recount, merge, repeat</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-6 leading-relaxed">
                  Every merge adds exactly one new vocabulary entry. Merged tokens now count as single
                  units, so we recount pairs from scratch.
                </p>
              </Anim>
              <Anim show={show} delay={0.1}>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="text-xs text-slate-500">recount → top pair:</span>
                  <span className="font-mono text-sm font-bold bg-red-500 text-white px-2.5 py-1 rounded-md">a + in</span>
                  <span className="text-xs font-mono text-slate-500">×3</span>
                </div>
              </Anim>
              <Anim show={show} delay={0.2}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8">
                  <div className="space-y-3 mb-6">
                    {afterMerge2.map((w, wi) => (
                      <div key={w.word} className="flex items-center flex-wrap gap-1.5">
                        {w.tokens.map((t, ti) => (
                          <CharChip key={ti} tone={t.m2 ? 'merged2' : 'default'} show={show} delay={0.3 + wi * 0.08 + ti * 0.05}>{t.t}</CharChip>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6 border-t border-slate-200 pt-4">
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest text-slate-400 mb-2">MERGE RULES</p>
                      <div className="space-y-1.5">
                        {mergeRules.map((r) => (
                          <div key={r.n} className="flex items-center gap-2 text-xs font-mono">
                            <span className="text-slate-400 w-3">{r.n}</span>
                            <span className="text-slate-600">{r.a} + {r.b} →</span>
                            <span className={`px-1.5 py-0.5 rounded font-bold text-white ${r.n <= 2 ? 'bg-red-500' : 'bg-slate-400'}`}>{r.out}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-end items-start sm:items-end">
                      <p className="text-[10px] font-semibold tracking-widest text-slate-400 mb-1">VOCABULARY</p>
                      <p className="text-xl font-mono font-bold text-slate-800">12 tokens</p>
                    </div>
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.5}>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  Two more rounds happen the same way: <code className="code-inline">t + h → th</code>{' '}
                  (from &quot;the&quot; appearing twice), then{' '}
                  <code className="code-inline">th + e → the</code>. Each round: count pairs, merge the
                  winner, add one token. That&apos;s the entire algorithm — repeated until you decide
                  to stop.
                </p>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 07 — The Result ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">07 — THE RESULT</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">The vocabulary BPE built</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  The characters it started with, plus every merge it learned.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8 text-center">
                  <p className="text-[10px] font-semibold tracking-widest text-slate-400 mb-3">10 CHARACTERS</p>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap mb-8">
                    {['a', 'c', 'e', 'g', 'h', 'i', 'm', 'n', 'r', 't'].map((c, i) => (
                      <CharChip key={c} tone="faded" show={show} delay={0.3 + i * 0.04}>{c}</CharChip>
                    ))}
                  </div>
                  <p className="text-[10px] font-semibold tracking-widest text-slate-400 mb-3">+ 4 LEARNED MERGES</p>
                  <div className="flex items-center justify-center gap-1.5 flex-wrap mb-8">
                    {['in', 'ain', 'th', 'the'].map((c, i) => (
                      <CharChip key={c} tone="merged" show={show} delay={0.8 + i * 0.1}>{c}</CharChip>
                    ))}
                  </div>
                  <div className="border-t border-slate-200 pt-6">
                    <p className="text-2xl font-mono font-extrabold text-slate-900">14 tokens</p>
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.4}>
                <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
                  <p className="text-[10px] font-semibold tracking-widest text-slate-400 mb-3 text-center">
                    OUR CORPUS, FULLY TOKENIZED
                  </p>
                  <div className="space-y-2 max-w-xs mx-auto">
                    {finalTokenization.map((w, i) => (
                      <div
                        key={w.word}
                        className="flex items-center justify-between gap-3"
                        style={{ opacity: show ? 1 : 0, transition: `opacity 0.4s ease ${0.5 + i * 0.08}s` }}
                      >
                        <span className="font-mono text-xs text-slate-500 w-14">{w.word}</span>
                        <div className="flex items-center gap-1 flex-wrap justify-end">
                          {w.tokens.map((t, ti) => (
                            <CharChip key={ti} tone={t.length > 1 ? 'merged' : 'faded'}>{t}</CharChip>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.55}>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  A real tokenizer runs this same loop tens of thousands of times over a huge corpus.
                  Our toy version stopped after 4 merges — a production tokenizer might stop after
                  100,000, giving it a vocabulary big enough to represent almost any word as one or
                  two tokens.
                </p>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 08 — Tokenizing a new word ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">08 — USING THE RULES</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">
                  Tokenize a new word: &quot;main&quot;
                </h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  It never appeared in the corpus. Apply the merge rules, in the order they were learned.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8">
                  <div className="grid sm:grid-cols-2 gap-8 items-center">
                    <div>
                      <p className="text-[10px] font-semibold tracking-widest text-slate-400 mb-2">MERGE RULES</p>
                      <div className="space-y-1.5">
                        {mergeRules.map((r, i) => (
                          <div key={r.n} className="flex items-center gap-2 text-xs font-mono" style={{ opacity: show ? 1 : 0, transition: `opacity 0.3s ease ${0.3 + i * 0.1}s` }}>
                            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${r.n === 1 || r.n === 2 ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-500'}`}>{r.n}</span>
                            <span className="text-slate-600">{r.a} + {r.b} → <span className="text-slate-800 font-bold">{r.out}</span></span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-3">
                        {['m', 'a', 'i', 'n'].map((c, i) => (
                          <CharChip key={i} tone="faded" show={show} delay={0.2 + i * 0.05}>{c}</CharChip>
                        ))}
                      </div>
                      <p className="text-slate-400 text-xs mb-3">↓ apply rule 1 (i+n→in), then rule 2 (a+in→ain)</p>
                      <div className="flex items-center justify-center gap-1.5">
                        <CharChip tone="faded" show={show} delay={0.9}>m</CharChip>
                        <CharChip tone="merged2" show={show} delay={1.05}>ain</CharChip>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">2 tokens</p>
                    </div>
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.4}>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  This is the whole point: the model never needs to have seen &quot;main&quot; before.
                  It applies its learned merge rules to any new text, character by character, and
                  always produces <em>some</em> valid tokenization — never an error.
                </p>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 09 — From tokens to numbers ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">09 — LOOK UP</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">From tokens to numbers</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  The vocabulary is a lookup table: every token has an ID. The model only ever sees IDs.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 max-w-sm mx-auto mb-6">
                    {finalVocab.map((v, i) => (
                      <div
                        key={v.tok}
                        className={`flex justify-between text-xs font-mono px-2 py-1 rounded ${v.tok === 'in' || v.tok === 'ain' ? 'bg-red-50 text-red-700 font-bold' : v.tok === 'th' || v.tok === 'the' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-600'}`}
                        style={{ opacity: show ? 1 : 0, transition: `opacity 0.3s ease ${0.3 + i * 0.04}s` }}
                      >
                        <span>{v.tok}</span>
                        <span>→ {v.id}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center border-t border-slate-200 pt-4">
                    <p className="text-xs text-slate-500 mb-1">our toy tokenizer · 14 entries</p>
                    <p className="text-xs text-slate-400">GPT-4&apos;s tokenizer: ~100,000 entries</p>
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.4}>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  &quot;main&quot; → <code className="code-inline">m</code> (id 6),{' '}
                  <code className="code-inline">ain</code> (id 11) → the model receives the sequence{' '}
                  <code className="code-inline">[6, 11]</code>. Two integers — that&apos;s all an LLM
                  ever actually sees of your text.
                </p>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 10 — The Typo Test ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">10 — EDGE CASE</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">
                  What about a typo — &quot;teh&quot;?
                </h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  A misspelling the tokenizer has never seen before.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8">
                  <div className="grid grid-cols-2 gap-8 text-center">
                    <div>
                      <p className="text-xs text-slate-500 mb-2">&quot;the&quot;</p>
                      <div className="flex items-center justify-center">
                        <CharChip tone="merged">the</CharChip>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">1 token</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-2">&quot;teh&quot;</p>
                      <div className="flex items-center justify-center gap-1.5">
                        <CharChip tone="faded">t</CharChip>
                        <CharChip tone="faded">e</CharChip>
                        <CharChip tone="faded">h</CharChip>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">3 tokens</p>
                    </div>
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.4}>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  None of the four merge rules match — <code className="code-inline">t · h</code> isn&apos;t
                  adjacent (the <code className="code-inline">e</code> sits between them), so it falls
                  back to three separate characters. It&apos;s slower to represent and slightly &quot;more
                  surprising&quot; to the model — but it never breaks. This is what &quot;no
                  out-of-vocabulary errors&quot; actually means in practice.
                </p>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 11 — tiktoken in production ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">11 — IN THE REAL WORLD</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">tiktoken — BPE in production</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  The same three moves you just did by hand, shipped as a real library.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8 space-y-5">
                  {[
                    { label: 'Open source', body: 'A fast BPE tokenizer library, released by OpenAI — written in Rust, used from Python.' },
                    { label: 'Battle-tested', body: 'The tokenizer behind GPT-3.5 and GPT-4 — one of the most widely used tokenizers anywhere.' },
                    { label: 'Same algorithm', body: "GPT-4's vocabulary (cl100k_base) has ~100,000 tokens — built exactly the way you just watched: trained on massive amounts of web text, merging the most frequent pair ~100,000 times." },
                    { label: 'Why it matters', body: 'Models bill and limit by token — tiktoken is the standard way to count them before you send a prompt.' },
                  ].map((row, i) => (
                    <div key={row.label} className="grid grid-cols-[110px_1fr] sm:grid-cols-[140px_1fr] gap-3" style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(10px)', transition: `all 0.4s ease ${0.3 + i * 0.12}s` }}>
                      <span className="text-xs font-semibold text-indigo-600 pt-0.5">{row.label}</span>
                      <p className="text-sm text-slate-600 leading-relaxed">{row.body}</p>
                    </div>
                  ))}
                </div>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 12 — Three lines of Python ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">12 — TRY IT YOURSELF</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Three lines of Python</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  Encode text into the exact token IDs GPT-4 sees — and decode them right back.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-900 rounded-2xl p-6 max-w-lg mx-auto mb-8">
                  <p className="text-slate-400 text-xs font-mono mb-2">python</p>
                  <pre className="text-sm font-mono text-indigo-300 overflow-x-auto"><code>{`>>> import tiktoken
>>> enc = tiktoken.encoding_for_model("gpt-4")
>>> enc.encode("tiktoken is great!")
[83, 1609, 5963, 374, 2294, 0]`}</code></pre>
                </div>
              </Anim>
              <Anim show={show} delay={0.35}>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  <code className="code-inline">pip install tiktoken</code> and try it yourself.
                  The merge rules were learned once, at OpenAI, over billions of pages of text
                  (imagine our four-rule example, repeated roughly 100,000 times). That training
                  happens exactly once; then the frozen rule-set ships in the library and encodes
                  every prompt you send, instantly.
                </p>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ Recap ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-2">
                  Three moves, repeated<span className="text-red-500">.</span>
                </h2>
                <p className="text-slate-600 text-center max-w-xl mx-auto mb-12 leading-relaxed">
                  From one six-word sentence to GPT-4&apos;s 100,000-token vocabulary — it&apos;s the
                  same loop, run at different scale.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="max-w-md mx-auto space-y-3">
                  {[
                    'Split text into characters',
                    'Count adjacent pairs — merge the most frequent',
                    'Repeat: the merges become the vocabulary',
                  ].map((step, i) => (
                    <div key={step} className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3" style={{ opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(-15px)', transition: `all 0.5s ease ${0.3 + i * 0.15}s` }}>
                      <span className="w-6 h-6 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-sm text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
              </Anim>
              <Anim show={show} delay={0.7}>
                <div className="mt-16 max-w-2xl mx-auto">
                  <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-3">Summary</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex gap-2"><span className="text-indigo-500 font-bold">1.</span><span><strong>Split</strong> — every word starts as individual characters</span></li>
                      <li className="flex gap-2"><span className="text-indigo-500 font-bold">2.</span><span><strong>Count</strong> — tally every adjacent pair across the corpus</span></li>
                      <li className="flex gap-2"><span className="text-indigo-500 font-bold">3.</span><span><strong>Merge</strong> — combine the most frequent pair into one new token</span></li>
                      <li className="flex gap-2"><span className="text-indigo-500 font-bold">4.</span><span><strong>Repeat</strong> — until you reach your target vocabulary size (~100,000 for GPT-4)</span></li>
                      <li className="flex gap-2"><span className="text-indigo-500 font-bold">5.</span><span><strong>Apply</strong> — the frozen rules tokenize any new text, never failing on unseen words</span></li>
                    </ul>
                  </div>
                </div>
              </Anim>
            </>
          )}
        </AnimSection>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 text-xs text-slate-500">
        <p>Written by AI Engineering Team • July 2026</p>
      </div>
    </article>
  );
}
