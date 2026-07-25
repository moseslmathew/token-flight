'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { AnimSection, Anim } from '@/components/ScrollAnim';

/* ─── Floating Numbers Background ─── */
function FloatingNumbers() {
  const nums = [
    { v: '0.66', x: 8, y: 6, d: 12 },
    { v: '-0.66', x: 38, y: 4, d: 18 },
    { v: '-0.51', x: 14, y: 11, d: 15 },
    { v: '-0.92', x: 22, y: 16, d: 20 },
    { v: '0.65', x: 18, y: 20, d: 13 },
    { v: '1.12', x: 72, y: 10, d: 16 },
    { v: '-1.11', x: 76, y: 15, d: 22 },
    { v: '-0.06', x: 55, y: 14, d: 14 },
    { v: '0.99', x: 42, y: 18, d: 17 },
    { v: '-0.10', x: 50, y: 22, d: 19 },
    { v: '0.80', x: 60, y: 30, d: 21 },
    { v: '0.11', x: 20, y: 36, d: 11 },
    { v: '-0.59', x: 32, y: 40, d: 23 },
    { v: '0.29', x: 85, y: 44, d: 16 },
    { v: '-0.45', x: 48, y: 35, d: 18 },
    { v: '0.63', x: 90, y: 5, d: 14 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {nums.map((n, i) => (
        <span
          key={i}
          className="absolute text-slate-300/50 font-mono text-sm"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            animation: `floatNum ${n.d}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          {n.v}
        </span>
      ))}
    </div>
  );
}

/* ─── Main Article ─── */
export default function EmbeddingsArticle() {
  const tokens = ['The', 'cat', 'sat', 'quiet', 'ly', '.'];
  const tokenMap = [
    { word: 'The', id: 464 },
    { word: 'cat', id: 2543, highlight: true },
    { word: 'sat', id: 7826 },
    { word: 'quiet', id: 5810 },
    { word: 'ly', id: 306 },
    { word: '.', id: 13 },
  ];
  const vocab = [
    { id: 13, token: '.' },
    { id: 306, token: 'ly' },
    { id: 464, token: 'The' },
    { id: 2543, token: 'cat' },
    { id: 5810, token: 'quiet' },
    { id: 7826, token: 'sat' },
  ];
  const matrixPattern = [
    [1,0,1,0,0,1,1,0,1,0,0,1],
    [0,1,1,0,1,1,0,0,1,0,1,0],
    [1,0,0,1,0,1,0,1,1,0,0,1],
    [0,1,0,1,1,0,1,0,0,1,1,0],
    [1,1,0,0,1,0,0,1,0,1,0,1],
    [0,0,1,1,0,1,1,0,1,0,1,0],
    [1,0,1,0,0,0,1,1,0,1,0,1],
    [0,1,0,0,1,1,0,1,1,0,1,0],
    [1,0,0,1,1,0,1,0,0,1,0,1],
    [0,1,1,0,0,1,0,1,1,0,0,1],
  ];
  const vectorValues = [0.82, -0.41, 0.13, 1.07, -0.66, 0.29, -1.12, 0.54, 0.08, 0.91, -0.27, 0.36];
  const clusterWords = [
    { word: 'cat', x: 62, y: 42, color: '#dc2626', bold: true },
    { word: 'kitten', x: 70, y: 35, color: '#dc2626' },
    { word: 'dog', x: 55, y: 50, color: '#dc2626' },
    { word: 'piano', x: 28, y: 22, color: '#6366f1' },
    { word: 'violin', x: 20, y: 30, color: '#6366f1' },
    { word: 'guitar', x: 32, y: 33, color: '#6366f1' },
    { word: 'truck', x: 22, y: 70, color: '#0891b2' },
    { word: 'car', x: 28, y: 76, color: '#0891b2' },
    { word: 'bicycle', x: 35, y: 68, color: '#0891b2' },
    { word: 'king', x: 75, y: 70, color: '#d97706' },
    { word: 'queen', x: 82, y: 65, color: '#d97706' },
    { word: 'prince', x: 78, y: 78, color: '#d97706' },
  ];
  const similarityPairs = [
    { a: 'cat', b: 'kitten', score: 0.92, color: '#16a34a' },
    { a: 'cat', b: 'dog', score: 0.83, color: '#65a30d' },
    { a: 'cat', b: 'car', score: 0.21, color: '#dc2626' },
    { a: 'king', b: 'queen', score: 0.87, color: '#16a34a' },
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
            <FloatingNumbers />
            <div className="relative z-10 text-center px-6">
              <Anim show={show}>
                <div className="flex items-center justify-center gap-3 text-xs text-slate-500 mb-6">
                  <span className="font-semibold px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">LLMs</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />15 min read</span>
                  <span>•</span>
                  <span>July 2026</span>
                </div>
              </Anim>
              <Anim show={show} delay={0.15}>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                  How AI Turns Words<br />Into Numbers
                </h1>
              </Anim>
              <Anim show={show} delay={0.3}>
                <div className="w-12 h-0.5 bg-red-400 mx-auto mb-4" />
                <p className="text-sm tracking-[0.3em] uppercase text-slate-500 font-medium">From Words to Vectors</p>
              </Anim>
            </div>
          </>
        )}
      </AnimSection>

      {/* Intro */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-12">
        <p className="text-slate-700 leading-relaxed">
          Every time you chat with an AI — ask it a question, tell it to write code, or have it
          summarize an article — something remarkable happens behind the scenes. Your words,
          sentences, and paragraphs are transformed into long lists of numbers called
          <strong> vector embeddings</strong>. These numbers aren&apos;t random: they capture
          the <em>meaning</em> of your words in a way that lets the machine reason about language
          with mathematical precision. This article walks you through every step of that journey,
          with no math prerequisites.
        </p>
      </div>

      <div className="divide-y divide-slate-100">

        {/* ═══ 01 — The Big Picture ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">01 — THE BIG PICTURE</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">
                  Before the model can read anything, text must become numbers
                </h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
                  When you type a message to ChatGPT, Claude, or any AI, it doesn&apos;t see letters and words
                  the way you do. It sees <em>numbers</em>. The entire magic of modern AI rests on a simple
                  but powerful idea: convert human language into lists of numbers that capture meaning.
                </p>
              </Anim>

              <Anim show={show} delay={0.2}>
                <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
                  <div className="text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-2">
                      <span className="text-2xl sm:text-3xl">📝</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">your text</span>
                  </div>
                  <svg width="40" height="20" className="text-slate-300 shrink-0"><line x1="0" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="2" /><polygon points="30,5 40,10 30,15" fill="currentColor" /></svg>
                  <div className="text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-2">
                      <div className="space-y-1">
                        <div className="w-10 h-1.5 rounded bg-red-300/70" />
                        <div className="w-10 h-1.5 rounded bg-blue-300/70" />
                        <div className="w-10 h-1.5 rounded bg-red-200/70" />
                      </div>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">embedding layer</span>
                  </div>
                  <svg width="40" height="20" className="text-slate-300 shrink-0"><line x1="0" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="2" /><polygon points="30,5 40,10 30,15" fill="currentColor" /></svg>
                  <div className="text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mb-2" style={{ background: '#1e1e1e' }}>
                      <span className="text-white font-bold text-lg tracking-wide">LLM</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">the model</span>
                  </div>
                </div>
              </Anim>

              <Anim show={show} delay={0.4}>
                <div className="callout-box mt-12">
                  <strong className="text-indigo-800">Think of it like this:</strong> You speak English (or any language).
                  The AI speaks &quot;numbers.&quot; Embeddings are the translator that sits between you and the AI,
                  converting your words into a language the machine can understand — and remarkably, this
                  translation preserves the <em>meaning</em> of what you said.
                </div>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 02 — Tokenization ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">02 — TOKENIZATION</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Step 1: Breaking text into pieces</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-6 leading-relaxed">
                  The first thing the AI does is split your sentence into small chunks called <strong>tokens</strong>.
                  A token isn&apos;t always a full word — it can be part of a word, a punctuation mark, or even a single character.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 mb-8 border border-slate-200">
                  <p className="text-center text-slate-500 text-sm mb-6 font-medium">&quot;The cat sat quietly.&quot;</p>
                  <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                    {tokens.map((t, i) => (
                      <div key={t} className="text-center" style={{ opacity: show ? 1 : 0, transform: show ? 'scale(1)' : 'scale(0.7)', transition: `all 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.4 + i * 0.12}s` }}>
                        <div className="bg-white border-2 border-slate-800 rounded-lg px-4 py-3 sm:px-5 sm:py-4 font-serif text-lg sm:text-xl font-bold text-slate-900 shadow-sm">{t}</div>
                        <span className="text-[10px] text-slate-400 mt-1 block tracking-widest uppercase">token</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.35}>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  Notice something interesting? The word <strong>&quot;quietly&quot;</strong> got split into
                  two tokens: <code className="code-inline">quiet</code> and <code className="code-inline">ly</code>.
                  This is by design. The AI learns that <code className="code-inline">ly</code> is a common suffix
                  that turns adjectives into adverbs. Instead of memorizing every adverb separately,
                  it reuses this pattern — just like you do when you encounter a new word like &quot;gracefully&quot;
                  and instantly understand it means &quot;in a graceful way.&quot;
                </p>
              </Anim>
              <Anim show={show} delay={0.45}>
                <div className="callout-box mt-8">
                  <strong className="text-indigo-800">Why not just use whole words?</strong> There are millions of
                  possible words (including names, slang, technical terms, typos). Tokens let the AI work with
                  a manageable vocabulary (typically ~50,000–100,000 tokens) while still handling any text you throw at it.
                </div>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 03 — Token IDs ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">03 — TOKEN IDs</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Step 2: Every token gets a number</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  The AI has a fixed dictionary — a vocabulary table — where every known token is assigned a
                  unique integer ID. Think of it like a massive phone book: you look up a name and get back a number.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8">
                  <div className="flex items-start justify-center gap-3 sm:gap-4 flex-wrap mb-8">
                    {tokenMap.map((t, i) => (
                      <div key={t.word} className="text-center" style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.5s ease ${0.3 + i * 0.1}s` }}>
                        <div className="bg-white border-2 border-slate-800 rounded-lg px-3 py-2 sm:px-4 sm:py-3 font-serif text-base sm:text-lg font-bold text-slate-900 mb-2">{t.word}</div>
                        <div className={`rounded-md px-3 py-1.5 text-xs sm:text-sm font-mono font-bold ${t.highlight ? 'bg-red-500 text-white' : 'bg-slate-800 text-white'}`} style={{ opacity: show ? 1 : 0, transform: show ? 'scale(1)' : 'scale(0.5)', transition: `all 0.4s cubic-bezier(0.34,1.56,0.64,1) ${0.7 + i * 0.1}s` }}>{t.id}</div>
                      </div>
                    ))}
                  </div>
                  <div className="max-w-xs mx-auto bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 1s' }}>
                    <div className="flex justify-between px-4 py-2 bg-slate-100 border-b border-slate-200">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Vocabulary</span>
                      <span className="text-[10px] text-slate-400">6 / 50,257</span>
                    </div>
                    {vocab.map((v) => (
                      <div key={v.id} className={`flex justify-between px-4 py-1.5 text-xs font-mono border-b border-slate-100 last:border-0 ${v.id === 2543 ? 'bg-red-50 text-red-700 font-bold' : 'text-slate-600'}`}>
                        <span>{v.id}</span><span>{v.token}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.4}>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  GPT-4&apos;s vocabulary has about <strong>100,000 tokens</strong>. Claude uses a similar-sized
                  vocabulary. These IDs are just addresses — they tell the model <em>which</em> token we&apos;re
                  talking about, but they say nothing about what the token <em>means</em>. The number 2543
                  for &quot;cat&quot; is arbitrary — it could have been 99 or 50,000. That&apos;s where the next step comes in.
                </p>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 04 — Embedding Lookup ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">04 — EMBEDDING LOOKUP</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Step 3: Looking up the token&apos;s vector</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-4 leading-relaxed">
                  Inside the AI, there&apos;s a giant table called the <strong>embedding matrix</strong>.
                  It has one row for every token in the vocabulary. When the model receives
                  token ID <code className="code-inline">2543</code> (for &quot;cat&quot;), it simply
                  goes to row 2543 and pulls out the corresponding list of numbers.
                </p>
              </Anim>
              <Anim show={show} delay={0.1}>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="font-serif text-lg font-bold text-slate-700">&quot;cat&quot;</span>
                  <span className="text-slate-400">→</span>
                  <span className="bg-red-500 text-white font-mono text-sm font-bold px-3 py-1 rounded-md">2543</span>
                </div>
              </Anim>
              <Anim show={show} delay={0.2}>
                <div className="overflow-x-auto pb-4">
                  <div className="min-w-[500px] max-w-2xl mx-auto">
                    {matrixPattern.map((cells, ri) => (
                      <div key={ri} className="flex items-center gap-1 mb-1" style={{ opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(-20px)', transition: `all 0.4s ease ${0.4 + ri * 0.06}s` }}>
                        <span className={`w-12 text-right text-xs font-mono mr-2 ${ri === 3 ? 'text-red-600 font-bold' : 'text-slate-400'}`}>{2505 + ri}</span>
                        {cells.map((c, ci) => (
                          <div key={ci} className={`w-8 h-6 sm:w-10 sm:h-7 rounded-sm ${ri === 3 ? (c ? 'bg-red-400/80' : 'bg-blue-400/80') : (c ? 'bg-red-200/60' : 'bg-blue-200/60')}`} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-center text-sm text-slate-500 italic mb-8">One row for every token in the vocabulary</p>
              </Anim>
              <Anim show={show} delay={0.4}>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  This lookup is instant — no computation needed. The embedding matrix is like a warehouse of
                  pre-packed boxes. Each box (row) contains a vector — a specific list of numbers — that
                  represents what that token &quot;means.&quot; During training, the model learns what numbers to put in each box.
                </p>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 05 — The Vector ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">05 — THE VECTOR</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">A list of numbers that captures meaning</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  What you pull out of the embedding matrix is called a <strong>vector</strong> —
                  just a fancy word for an ordered list of numbers. For the word &quot;cat,&quot;
                  it might look something like this:
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-4">
                  {vectorValues.map((v, i) => (
                    <div key={i} style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0) rotateX(0deg)' : 'translateY(20px) rotateX(90deg)', transition: `all 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.3 + i * 0.08}s` }}>
                      <div className={`w-12 sm:w-14 h-16 sm:h-20 rounded-lg border-2 flex flex-col items-center justify-center gap-1 ${v > 0 ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
                        <span className="text-xs sm:text-sm font-mono font-bold text-slate-800">{v.toFixed(2)}</span>
                        <div className={`w-6 h-0.5 rounded ${v > 0 ? 'bg-red-400' : 'bg-blue-400'}`} />
                      </div>
                    </div>
                  ))}
                  <div className="w-12 sm:w-14 h-16 sm:h-20 rounded-lg border-2 border-slate-200 bg-white flex items-center justify-center" style={{ opacity: show ? 1 : 0, transition: 'opacity 0.5s ease 1.3s' }}>
                    <span className="text-slate-400 font-bold">…</span>
                  </div>
                </div>
                <p className="text-center text-sm font-mono text-slate-500 mb-8">768 dimensions</p>
              </Anim>
              <Anim show={show} delay={0.45}>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto mb-6">
                  Real AI models use vectors with <strong>768</strong>, <strong>1,536</strong>, or even
                  <strong> 12,288</strong> numbers. Each number is a <em>dimension</em>.
                  Think of it like a fingerprint — no two words have the same combination of values, and
                  similar words have similar fingerprints.
                </p>
              </Anim>
              <Anim show={show} delay={0.55}>
                <div className="callout-box">
                  <strong className="text-indigo-800">An analogy:</strong> Imagine describing a person using
                  a fixed set of scales: height, weight, age, friendliness, intelligence, humor... A
                  768-dimension vector is like rating a word on 768 different &quot;meaning scales.&quot;
                  Words that are similar on many scales end up with similar vectors.
                </div>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 06 — Learned Values ═══ */}
        <LearnedValuesSection />

        {/* ═══ 07 — Dimensions ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">07 — DIMENSIONS</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Each position captures a different aspect of meaning</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  Every slot in the vector is a <strong>dimension</strong>. You can think of each
                  dimension as measuring a different quality — though unlike human-labeled qualities,
                  these are abstract patterns the model discovers on its own.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8">
                  <p className="text-center text-sm font-mono text-slate-500 mb-6">— POSITIONS = DIMENSIONS —</p>
                  <div className="flex items-start justify-center gap-1.5 sm:gap-2 flex-wrap">
                    {vectorValues.map((v, i) => (
                      <div key={i} className="text-center" style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(15px)', transition: `all 0.4s ease ${0.3 + i * 0.07}s` }}>
                        <div className={`w-11 h-12 sm:h-14 rounded-lg flex items-center justify-center text-xs sm:text-sm font-mono font-bold ${v > 0 ? 'bg-red-100/80 text-red-800' : 'bg-blue-100/80 text-blue-800'}`}>{v.toFixed(2)}</div>
                        <span className="text-[10px] font-mono text-red-500 mt-1 block">{i + 1}</span>
                      </div>
                    ))}
                    <div className="text-center">
                      <div className="w-11 h-12 sm:h-14 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 font-bold">…</div>
                      <span className="text-[10px] font-mono text-red-500 mt-1 block bg-red-50 rounded px-1">768</span>
                    </div>
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.35}>
                <div className="max-w-2xl mx-auto space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    Imagine dimension 1 loosely captures <em>&quot;is it alive?&quot;</em>, dimension 2
                    captures <em>&quot;is it big or small?&quot;</em>, dimension 3 captures
                    <em> &quot;is it abstract or concrete?&quot;</em>, and so on for hundreds of dimensions.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    In reality, these dimensions don&apos;t map to simple human concepts — they represent
                    complex, interwoven patterns of language. But the key idea holds: <strong>more dimensions = more nuance</strong>.
                    With 768 numbers, the model can distinguish incredibly subtle differences between words.
                  </p>
                </div>
              </Anim>
              <Anim show={show} delay={0.45}>
                <div className="callout-box mt-8">
                  <strong className="text-indigo-800">Why so many dimensions?</strong> Consider how many qualities
                  describe a word. Is &quot;cat&quot; a noun? Living? Small? Furry? A pet? A predator?
                  Independent? The answer to hundreds of such questions — simultaneously — is what a
                  768-dimension vector captures.
                </div>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 08 — Meaning as Geometry ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">08 — MEANING AS GEOMETRY</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Similar words land near each other</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  Here&apos;s where the magic happens. Because similar words have similar vectors,
                  when you plot them in space, <strong>they cluster together by meaning</strong>.
                  Animals near animals. Instruments near instruments. Vehicles near vehicles.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-6 mb-8">
                  <div className="relative w-full" style={{ paddingBottom: '65%' }}>
                    {clusterWords.map((w, i) => (
                      <div key={w.word} className="absolute flex items-center gap-1.5" style={{ left: `${w.x}%`, top: `${w.y}%`, opacity: show ? 1 : 0, transform: show ? 'scale(1)' : 'scale(0)', transition: `all 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.4 + i * 0.1}s` }}>
                        <div className={`rounded-full ${w.bold ? 'w-3.5 h-3.5' : 'w-2.5 h-2.5'}`} style={{ backgroundColor: w.color }} />
                        <span className={`text-slate-700 ${w.bold ? 'font-bold text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>{w.word}</span>
                      </div>
                    ))}
                    {[
                      { label: 'Animals', x: 58, y: 30, bg: '#fef2f2' },
                      { label: 'Instruments', x: 15, y: 16, bg: '#eef2ff' },
                      { label: 'Vehicles', x: 18, y: 62, bg: '#ecfeff' },
                      { label: 'Royalty', x: 72, y: 58, bg: '#fffbeb' },
                    ].map((c, i) => (
                      <div key={c.label} className="absolute" style={{ left: `${c.x}%`, top: `${c.y}%`, opacity: show ? 0.7 : 0, transition: `opacity 1s ease ${1.5 + i * 0.15}s` }}>
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 px-2 py-0.5 rounded-full" style={{ backgroundColor: c.bg }}>{c.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.4}>
                <p className="text-center text-sm text-slate-500 italic mb-8">by the end of training, every word has its own vector — its own position in meaning-space</p>
                <div className="max-w-2xl mx-auto space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    This isn&apos;t a human-designed map — the model discovered these clusters entirely from
                    reading text. &quot;Cat&quot; and &quot;kitten&quot; appear in similar sentences, so their
                    vectors ended up pointing in similar directions.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    The distance between two words in this space tells you <strong>how related they are</strong>.
                    &quot;Cat&quot; and &quot;kitten&quot; are close. &quot;Cat&quot; and &quot;piano&quot; are far apart.
                    This geometric relationship is measured using something called <strong>cosine similarity</strong>.
                  </p>
                </div>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 09 — Cosine Similarity ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">09 — COSINE SIMILARITY</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Measuring how similar two words are</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  <strong>Cosine similarity</strong> measures the angle between two vectors. A score of
                  <strong> 1.0</strong> means the words point in exactly the same direction (identical meaning).
                  A score near <strong>0</strong> means they&apos;re unrelated.
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="max-w-md mx-auto space-y-3 mb-10">
                  {similarityPairs.map((p, i) => (
                    <div key={`${p.a}-${p.b}`} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3" style={{ opacity: show ? 1 : 0, transform: show ? 'translateX(0)' : 'translateX(-30px)', transition: `all 0.5s ease ${0.3 + i * 0.12}s` }}>
                      <span className="text-sm font-semibold text-slate-700 w-28">{p.a} ↔ {p.b}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: show ? `${p.score * 100}%` : '0%', backgroundColor: p.color, transitionDelay: `${0.6 + i * 0.15}s` }} />
                      </div>
                      <span className="text-sm font-mono font-bold w-10 text-right" style={{ color: p.color }}>{p.score}</span>
                    </div>
                  ))}
                </div>
              </Anim>
              <Anim show={show} delay={0.4}>
                <div className="bg-slate-900 rounded-2xl p-6 max-w-lg mx-auto mb-8">
                  <p className="text-slate-400 text-xs font-mono mb-2">python</p>
                  <pre className="text-sm font-mono text-indigo-300 overflow-x-auto"><code>{`import numpy as np

def cosine_similarity(vec1, vec2):
    dot = np.dot(vec1, vec2)
    return dot / (
        np.linalg.norm(vec1) *
        np.linalg.norm(vec2)
    )`}</code></pre>
                </div>
              </Anim>
              <Anim show={show} delay={0.5}>
                <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  This is how search engines, recommendation systems, and chatbots find relevant content —
                  they compute the cosine similarity between your query&apos;s embedding and the embeddings
                  of every item in their database, then return the closest matches.
                </p>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 10 — Vector Arithmetic ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <p className="section-label">10 — VECTOR ARITHMETIC</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Math with meaning</h2>
                <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                  One of the most astonishing properties of embeddings: you can do <em>arithmetic</em> on
                  word vectors and get meaningful results. The most famous example:
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200 mb-8">
                  <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap text-xl sm:text-2xl font-bold">
                    {[
                      { text: 'King', d: 0.3 },
                      { text: '−', d: 0.5, isOp: true },
                      { text: 'Man', d: 0.6 },
                      { text: '+', d: 0.8, isOp: true },
                      { text: 'Woman', d: 0.9 },
                      { text: '=', d: 1.1, isOp: true },
                      { text: 'Queen', d: 1.3, isResult: true },
                    ].map((item, i) => (
                      <span key={i} className={item.isOp ? 'text-slate-400 text-lg' : item.isResult ? 'text-indigo-600 underline decoration-indigo-300 decoration-2 underline-offset-4' : 'text-slate-800'} style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(15px)', transition: `all 0.4s ease ${item.d}s` }}>
                        {item.text}
                      </span>
                    ))}
                  </div>
                </div>
              </Anim>
              <Anim show={show} delay={0.45}>
                <div className="max-w-2xl mx-auto space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    This works because &quot;King&quot; and &quot;Man&quot; share a &quot;maleness&quot;
                    direction in the vector space. When you subtract &quot;Man,&quot; you remove that direction,
                    leaving behind the concept of &quot;royalty.&quot; Adding &quot;Woman&quot; gives you royalty + femaleness = Queen.
                  </p>
                  <p className="text-slate-600 leading-relaxed">Other examples that work:</p>
                  <ul className="text-slate-600 space-y-2 ml-4">
                    <li className="flex items-start gap-2"><span className="text-indigo-400 mt-1">•</span><span><strong>Paris − France + Italy = Rome</strong> (capitals)</span></li>
                    <li className="flex items-start gap-2"><span className="text-indigo-400 mt-1">•</span><span><strong>Walking − Walk + Swim = Swimming</strong> (tense)</span></li>
                    <li className="flex items-start gap-2"><span className="text-indigo-400 mt-1">•</span><span><strong>Bigger − Big + Small = Smaller</strong> (comparatives)</span></li>
                  </ul>
                </div>
              </Anim>
            </>
          )}
        </AnimSection>

        {/* ═══ 11 — Full Pipeline ═══ */}
        <AnimSection className="py-20">
          {(show) => (
            <>
              <Anim show={show}>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-2">
                  That&apos;s a word embedding<span className="text-red-500">.</span>
                </h2>
                <p className="text-slate-600 text-center max-w-xl mx-auto mb-12 leading-relaxed">
                  The complete journey from human language to machine understanding:
                </p>
              </Anim>
              <Anim show={show} delay={0.15}>
                <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                  {[
                    { label: 'word', content: '"cat"', cls: 'italic font-serif text-lg' },
                    { label: 'token', content: 'cat', cls: 'border-2 border-slate-800 px-3 py-1 rounded-lg bg-white font-serif font-bold' },
                    { label: 'token ID', content: '2543', cls: 'bg-slate-800 text-white px-3 py-1 rounded-md font-mono font-bold' },
                    { label: 'vector', content: '[ 0.82  -0.41  … ]', cls: 'font-mono text-sm bg-slate-100 px-3 py-1 rounded-lg' },
                    { label: 'meaning-space', content: '●', cls: 'text-red-500 text-2xl' },
                  ].map((s, i, arr) => (
                    <React.Fragment key={s.label}>
                      <div className="text-center" style={{ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.5s ease ${0.3 + i * 0.2}s` }}>
                        <div className={`text-slate-800 mb-1 ${s.cls}`}>{s.content}</div>
                        <span className="text-[10px] text-slate-400 tracking-widest uppercase font-mono">{s.label}</span>
                      </div>
                      {i < arr.length - 1 && <span className="text-slate-300 text-sm" style={{ opacity: show ? 1 : 0, transition: `opacity 0.3s ease ${0.5 + i * 0.2}s` }}>→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </Anim>
              <Anim show={show} delay={0.7}>
                <div className="mt-16 max-w-2xl mx-auto">
                  <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-3">Summary</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex gap-2"><span className="text-indigo-500 font-bold">1.</span><span><strong>Tokenization</strong> — Your text is split into small chunks (tokens)</span></li>
                      <li className="flex gap-2"><span className="text-indigo-500 font-bold">2.</span><span><strong>Token IDs</strong> — Each token is mapped to a unique integer from a vocabulary table</span></li>
                      <li className="flex gap-2"><span className="text-indigo-500 font-bold">3.</span><span><strong>Embedding Lookup</strong> — The ID is used to fetch a vector from the embedding matrix</span></li>
                      <li className="flex gap-2"><span className="text-indigo-500 font-bold">4.</span><span><strong>The Vector</strong> — A list of hundreds of numbers, learned during training, that encodes meaning</span></li>
                      <li className="flex gap-2"><span className="text-indigo-500 font-bold">5.</span><span><strong>Geometric Meaning</strong> — Similar words have similar vectors, forming clusters in meaning-space</span></li>
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

/* ─── Learned Values (needs its own state for the sentence cycling) ─── */
function LearnedValuesSection() {
  const sentences = [
    'the cat sat quietly on the warm carpet',
    'a small kitten purrs softly in the sun',
    'dogs and puppies love to play outside',
    'the quiet library hums at noon',
    'birds sing in the garden every morning',
  ];
  const [activeIdx, setActiveIdx] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show) return;
    const id = setInterval(() => setActiveIdx((p) => (p + 1) % sentences.length), 2000);
    return () => clearInterval(id);
  }, [show, sentences.length]);

  return (
    <AnimSection className="py-20" onShow={() => setShow(true)}>
      {(show) => {
        return (
          <>
            <Anim show={show}>
              <p className="section-label">06 — LEARNED VALUES</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-4">Nobody writes these numbers by hand</h2>
              <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
                The values in each vector aren&apos;t designed by humans — they&apos;re
                <strong> learned during training</strong>. The model reads billions of sentences and gradually
                adjusts each word&apos;s vector so that words appearing in similar contexts end up
                with similar numbers.
              </p>
            </Anim>
            <Anim show={show} delay={0.15}>
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 mb-8">
                <div className="space-y-3 mb-6">
                  {sentences.map((s, i) => (
                    <p key={s} className="text-center italic transition-all duration-700 text-sm sm:text-base" style={{ opacity: i === activeIdx ? 1 : 0.25, transform: i === activeIdx ? 'scale(1.05)' : 'scale(1)', color: i === activeIdx ? '#334155' : '#94a3b8' }}>
                      {s}
                    </p>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  {[0.23, 0.51, -0.21, -0.54, -0.16, 1.02, -1.02, 0.28, -0.77, 0.48, -1.08, -0.63].map((v, i) => (
                    <div key={i} className={`w-11 sm:w-12 h-8 sm:h-9 rounded text-[10px] sm:text-xs font-mono font-bold flex items-center justify-center ${v > 0 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`} style={{ opacity: show ? 1 : 0, transition: `opacity 0.3s ease ${0.4 + i * 0.05}s` }}>
                      {v.toFixed(2)}
                    </div>
                  ))}
                  <div className="w-11 sm:w-12 h-8 sm:h-9 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-400 text-xs font-bold">…</div>
                </div>
                <p className="text-center text-xs text-slate-500 mt-4 tracking-widest uppercase">Training…</p>
                <p className="text-center text-sm text-slate-500 italic mt-1">every word is read in its context</p>
              </div>
            </Anim>
            <Anim show={show} delay={0.35}>
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                This is the core insight: <strong>meaning comes from context</strong>. The word &quot;bank&quot;
                in &quot;river bank&quot; versus &quot;bank account&quot; will develop different nuances
                in its embedding because it appears alongside different words. The model discovers
                these patterns entirely on its own, from raw text — no one tells it what &quot;cat&quot; means.
              </p>
            </Anim>
          </>
        );
      }}
    </AnimSection>
  );
}
