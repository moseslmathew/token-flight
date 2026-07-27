'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Sparkles, ChevronRight } from 'lucide-react';

/* ────────────────────────────────────────────────────────────
   Shared hooks & chrome
   ──────────────────────────────────────────────────────────── */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return reduced;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

function useTicker(playing: boolean, interval: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setTick((t) => t + 1), interval);
    return () => clearInterval(id);
  }, [playing, interval]);
  return tick;
}

function VisualFrame({
  label,
  action,
  caption,
  children,
}: {
  label: string;
  action?: React.ReactNode;
  caption?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-rule bg-surface">
      <figcaption className="flex items-center justify-between gap-3 border-b border-rule-soft bg-paper-deep/50 px-4 py-3 sm:px-5">
        <span className="eyebrow flex min-w-0 items-center gap-2 text-ember">
          <Sparkles className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{label}</span>
        </span>
        {action}
      </figcaption>
      <div className="p-4 sm:p-6">{children}</div>
      {caption && (
        <p className="-mt-1 px-4 pb-5 font-serif text-[0.9375rem] leading-relaxed text-ink-muted sm:px-6">
          {caption}
        </p>
      )}
    </figure>
  );
}

function PlayButton({ playing, onClick }: { playing: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface border border-rule text-[11px] font-semibold text-ink-muted hover:text-accent hover:border-accent/45 transition-colors shrink-0"
    >
      {playing ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
      {playing ? 'Pause' : 'Play'}
    </button>
  );
}

/* Vertical animated connector between stages */
function Connector({ active }: { active: boolean }) {
  return (
    <div className="flex justify-center py-1">
      <svg width="4" height="24" viewBox="0 0 4 24" aria-hidden="true">
        <line
          x1="2"
          y1="0"
          x2="2"
          y2="24"
          strokeWidth="2"
          strokeLinecap="round"
          stroke={active ? '#4c449b' : '#e6ded1'}
          className={active ? 'moe-flow' : ''}
          style={{ transition: 'stroke 0.4s ease' }}
        />
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   1. Dense vs. Sparse — how much of the model wakes up
   ──────────────────────────────────────────────────────────── */

const DVS_TOKENS = ['The', 'cat', 'sat', 'on', 'the', 'mat'];

function DenseVsSparse() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const tick = useTicker(playing && !reduced, 1600);
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    setFlash(true);
    const id = setTimeout(() => setFlash(false), 900);
    return () => clearTimeout(id);
  }, [tick]);

  const token = DVS_TOKENS[tick % DVS_TOKENS.length];
  const chosen = useMemo(() => {
    const a = (tick * 5 + 3) % 12;
    let b = (tick * 7 + 8) % 12;
    if (b === a) b = (b + 5) % 12;
    return [a, b];
  }, [tick]);

  const cell = (on: boolean) =>
    `aspect-square rounded-lg border flex items-center justify-center text-[9px] font-bold transition-all duration-500 ${
      on
        ? 'bg-accent border-accent text-paper shadow-md shadow-accent/25 scale-105'
        : 'bg-paper-deep/60 border-rule text-ink-faint/55 scale-100'
    }`;

  const Panel = ({
    title,
    sub,
    isOn,
    pct,
    tone,
  }: {
    title: string;
    sub: string;
    isOn: (i: number) => boolean;
    pct: number;
    tone: 'rose' | 'emerald';
  }) => (
    <div className="flex-1 rounded-xl border border-rule bg-paper-deep/45 p-3.5 space-y-3">
      <div>
        <div className="text-xs font-bold text-ink-strong">{title}</div>
        <div className="text-[11px] text-ink-muted">{sub}</div>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={cell(isOn(i))}
            style={{ transitionDelay: `${(i % 4) * 30}ms` }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] font-semibold">
          <span className="text-ink-muted uppercase tracking-wider">Work done</span>
          <span className={tone === 'rose' ? 'text-ember' : 'text-sage'}>{pct}%</span>
        </div>
        <div className="h-2 rounded-full bg-rule overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              tone === 'rose' ? 'bg-ember' : 'bg-sage'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <VisualFrame
      label="One token, two very different bills"
      action={<PlayButton playing={playing} onClick={() => setPlaying((p) => !p)} />}
      caption="Both models hold the same amount of knowledge. The dense one re-reads all of it for every single token; the MoE one wakes up two blocks and leaves the other ten asleep."
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-[11px] text-ink-muted font-medium">Now processing</span>
        <span
          key={tick}
          className="moe-pop px-2.5 py-1 rounded-lg bg-ink-strong text-white font-mono text-xs shadow-xs"
        >
          &ldquo;{token}&rdquo;
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Panel
          title="Dense model"
          sub="Every block runs, every time"
          isOn={() => flash}
          pct={100}
          tone="rose"
        />
        <Panel
          title="Mixture-of-Experts model"
          sub="Only the 2 chosen blocks run"
          isOn={(i) => flash && chosen.includes(i)}
          pct={17}
          tone="emerald"
        />
      </div>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   2. The Router — scoring, picking top-2, blending
   ──────────────────────────────────────────────────────────── */

const ROUTER_EXPERTS = [
  { name: 'Expert 1', tendency: 'drifted toward code-like tokens', color: '#6366f1', bg: 'bg-indigo-50', text: 'text-indigo-700', bar: 'bg-indigo-500' },
  { name: 'Expert 2', tendency: 'drifted toward punctuation & structure', color: '#8b5cf6', bg: 'bg-violet-50', text: 'text-violet-700', bar: 'bg-violet-500' },
  { name: 'Expert 3', tendency: 'drifted toward digits & quantities', color: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-700', bar: 'bg-emerald-500' },
  { name: 'Expert 4', tendency: 'drifted toward non-English fragments', color: '#f59e0b', bg: 'bg-amber-50', text: 'text-amber-700', bar: 'bg-amber-500' },
];

const ROUTER_TOKENS = [
  { text: 'def', hint: 'the start of a Python function', scores: [0.62, 0.23, 0.1, 0.05] },
  { text: '1997', hint: 'a four-digit year', scores: [0.08, 0.14, 0.66, 0.12] },
  { text: '?', hint: 'a question mark', scores: [0.11, 0.58, 0.09, 0.22] },
  { text: 'München', hint: 'a German city name', scores: [0.06, 0.12, 0.19, 0.63] },
];

const ROUTER_STEPS = [
  'A token arrives, carrying everything the model has understood about it so far.',
  'The router — a tiny neural network — gives every expert a score for this one token.',
  'Only the top 2 scores survive. The other experts are switched off entirely.',
  'The 2 chosen experts do their work. Zero computation happens inside the skipped ones.',
  'Their two answers are blended, weighted by how confident the router was.',
];

function RouterFlow() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const [tokenIdx, setTokenIdx] = useState(0);

  useEffect(() => {
    if (!playing || reduced) return;
    const id = setTimeout(
      () => {
        if (step < ROUTER_STEPS.length - 1) {
          setStep(step + 1);
        } else {
          setTokenIdx((tokenIdx + 1) % ROUTER_TOKENS.length);
          setStep(0);
        }
      },
      step === ROUTER_STEPS.length - 1 ? 2600 : 1700,
    );
    return () => clearTimeout(id);
  }, [playing, reduced, step, tokenIdx]);

  const token = ROUTER_TOKENS[tokenIdx];
  const ranked = useMemo(
    () =>
      token.scores
        .map((s, i) => ({ s, i }))
        .sort((a, b) => b.s - a.s)
        .slice(0, 2),
    [token],
  );
  const topIdx = ranked.map((r) => r.i);
  const sumTop = ranked.reduce((acc, r) => acc + r.s, 0);
  const weights = new Map(ranked.map((r) => [r.i, r.s / sumTop]));

  const showScores = step >= 1;
  const showPick = step >= 2;
  const showWork = step >= 3;
  const showOut = step >= 4;

  return (
    <VisualFrame
      label="Inside one MoE layer, step by step"
      action={<PlayButton playing={playing} onClick={() => setPlaying((p) => !p)} />}
      caption="The router is trained alongside everything else — nobody hand-wrote the rule that sends “def” to Expert 1. Those tendencies emerged on their own."
    >
      {/* Stepper */}
      <div className="grid grid-cols-5 gap-1.5 mb-4">
        {ROUTER_STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPlaying(false);
              setStep(i);
            }}
            aria-label={`Step ${i + 1}`}
            className={`h-1.5 rounded-full transition-colors duration-200 ${
              i === step ? 'bg-accent' : i < step ? 'bg-accent/35' : 'bg-rule'
            }`}
          />
        ))}
      </div>

      {/* Stage 1: the token */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span
          key={token.text}
          className="moe-pop px-3 py-1.5 rounded-lg bg-ink-strong text-white font-mono text-sm shadow-sm"
        >
          &ldquo;{token.text}&rdquo;
        </span>
        <span className="text-[11px] text-ink-muted">{token.hint}</span>
      </div>

      <Connector active={step >= 1} />

      {/* Stage 2: the router */}
      <div
        className={`rounded-xl border px-4 py-3 text-center transition-all duration-500 ${
          step >= 1 && !showPick
            ? 'border-accent/45 bg-accent-soft'
            : 'border-rule bg-paper-deep/60'
        }`}
      >
        <div className="text-xs font-bold text-ink-strong">Router (the gating network)</div>
        <div className="text-[11px] text-ink-muted">
          {showScores ? 'Scored all 4 experts in one tiny matrix multiply' : 'Waiting for a token…'}
        </div>
      </div>

      <Connector active={step >= 2} />

      {/* Stage 3: the experts */}
      <div className="space-y-2">
        {ROUTER_EXPERTS.map((ex, i) => {
          const score = token.scores[i];
          const picked = topIdx.includes(i);
          const dimmed = showPick && !picked;
          return (
            <div
              key={ex.name}
              className={`rounded-xl border px-3 py-2.5 ${
                showPick && picked ? `${ex.bg} border-transparent` : 'bg-surface border-rule'
              } ${dimmed ? 'opacity-45' : 'opacity-100'}`}
              style={{
                boxShadow: showPick && picked ? `0 0 0 2px ${ex.color}` : '0 0 0 0 transparent',
                transition:
                  'box-shadow 0.2s ease, opacity 0.35s ease, background-color 0.35s ease, border-color 0.2s ease',
              }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-500"
                  style={{
                    backgroundColor: ex.color,
                    transform: showWork && picked ? 'scale(1.5)' : 'scale(1)',
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-ink-strong">{ex.name}</span>
                    <span className="text-[10px] text-ink-faint truncate hidden sm:inline">
                      {ex.tendency}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-paper-deep overflow-hidden">
                    <div
                      className={`h-full rounded-full ${ex.bar} transition-all duration-700 ease-out`}
                      style={{ width: showScores ? `${score * 100}%` : '0%' }}
                    />
                  </div>
                </div>
                <div className="w-24 text-right shrink-0">
                  <div
                    className={`text-xs font-mono font-bold transition-colors ${
                      showScores ? ex.text : 'text-ink-faint/55'
                    }`}
                  >
                    {showScores ? score.toFixed(2) : '—'}
                  </div>
                  <div className="text-[10px] font-semibold">
                    {showPick ? (
                      picked ? (
                        <span className="text-sage">
                          {showWork ? 'running…' : 'selected'}
                        </span>
                      ) : (
                        <span className="text-ink-faint">skipped · 0 cost</span>
                      )
                    ) : (
                      <span className="text-ink-faint/55">idle</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Connector active={showOut} />

      {/* Stage 4: the blended output */}
      <div
        className={`rounded-xl border px-4 py-3 transition-colors duration-300 ${
          showOut ? 'border-sage/45 bg-sage-soft' : 'border-rule bg-paper-deep/60'
        }`}
      >
        <div className="text-xs font-bold text-ink-strong mb-1">Layer output</div>
        {showOut ? (
          <div className="font-mono text-[11px] sm:text-xs text-ink break-words">
            {ranked.map((r, n) => (
              <span key={r.i}>
                {n > 0 && <span className="text-ink-faint"> + </span>}
                <span className="font-bold" style={{ color: ROUTER_EXPERTS[r.i].color }}>
                  {weights.get(r.i)!.toFixed(2)} × {ROUTER_EXPERTS[r.i].name}
                </span>
              </span>
            ))}
          </div>
        ) : (
          <div className="text-[11px] text-ink-faint">Waiting for the chosen experts…</div>
        )}
      </div>

      {/* Narration */}
      <div className="mt-4 flex items-start gap-2 rounded-xl bg-ink-strong px-4 py-3 text-white">
        <span className="mt-0.5 shrink-0 text-[10px] font-bold uppercase tracking-wider text-paper/50">
          {step + 1}/{ROUTER_STEPS.length}
        </span>
        <p className="text-xs leading-relaxed text-paper">{ROUTER_STEPS[step]}</p>
      </div>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   3. Top-K routing — the sparsity dial
   ──────────────────────────────────────────────────────────── */

const EXPERT_COUNTS = [8, 16, 32, 64, 128];

function TopKGrid() {
  const reduced = useReducedMotion();
  const [total, setTotal] = useState(64);
  const [k, setK] = useState(2);
  const [playing, setPlaying] = useState(true);
  const tick = useTicker(playing && !reduced, 1100);

  const active = useMemo(() => {
    const picks = new Set<number>();
    let seed = tick * 9301 + 49297;
    while (picks.size < Math.min(k, total)) {
      seed = (seed * 9301 + 49297) % 233280;
      picks.add(seed % total);
    }
    return picks;
  }, [tick, k, total]);

  const share = (Math.min(k, total) / total) * 100;

  return (
    <VisualFrame
      label="The sparsity dial — pick how many experts answer"
      action={<PlayButton playing={playing} onClick={() => setPlaying((p) => !p)} />}
      caption="Every square is an expert sitting in memory. The lit ones are the only squares that cost you anything on this token."
    >
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider">
            Experts
          </span>
          <div className="flex gap-1">
            {EXPERT_COUNTS.map((n) => (
              <button
                key={n}
                onClick={() => setTotal(n)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  total === n
                    ? 'bg-ink-strong text-white'
                    : 'bg-surface text-ink-muted border border-rule hover:text-ink-strong'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider">
            Top-K = {k}
          </span>
          <input
            type="range"
            min={1}
            max={8}
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            className="w-28 accent-[#4c449b] cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-paper-deep/60 border border-rule min-h-[92px] content-start">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-[4px] transition-all duration-300 ${
              active.has(i)
                ? 'bg-accent scale-125 shadow-sm shadow-accent/35'
                : 'bg-rule scale-100'
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="rounded-xl border border-rule bg-surface p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
            Stored
          </div>
          <div className="text-lg font-extrabold text-ink-strong leading-tight">{total}</div>
          <div className="text-[10px] text-ink-muted">experts in memory</div>
        </div>
        <div className="rounded-xl border border-rule bg-surface p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
            Used
          </div>
          <div className="text-lg font-extrabold text-accent leading-tight">
            {Math.min(k, total)}
          </div>
          <div className="text-[10px] text-ink-muted">per token, per layer</div>
        </div>
        <div className="rounded-xl border border-sage/30 bg-sage-soft p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-sage">
            You pay
          </div>
          <div className="text-lg font-extrabold text-sage leading-tight">
            {share < 10 ? share.toFixed(1) : share.toFixed(0)}%
          </div>
          <div className="text-[10px] text-sage/80">of the expert compute</div>
        </div>
      </div>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   4. Context decides the expert — the "bank" demo
   ──────────────────────────────────────────────────────────── */

const STREAM_EXPERTS = ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b'];

const SENTENCES: { words: string[]; route: number[] }[] = [
  {
    words: ['She', 'sat', 'by', 'the', 'river', 'bank', 'at', 'dusk'],
    route: [1, 0, 1, 1, 2, 2, 1, 3],
  },
  {
    words: ['She', 'moved', 'her', 'savings', 'to', 'a', 'new', 'bank'],
    route: [1, 0, 1, 3, 1, 1, 0, 0],
  },
];

function ContextRouting() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const flat = useMemo(
    () => SENTENCES.flatMap((s, si) => s.words.map((_, wi) => ({ si, wi }))),
    [],
  );
  const tick = useTicker(playing && !reduced, 620);
  const pos = flat[tick % flat.length];
  const visitedUpTo = tick % flat.length;
  const activeExpert = SENTENCES[pos.si].route[pos.wi];

  return (
    <VisualFrame
      label="Same word, different expert"
      action={<PlayButton playing={playing} onClick={() => setPlaying((p) => !p)} />}
      caption="The router never sees the bare word. It sees a vector that already absorbed the surrounding sentence — so “bank” by a river and “bank” with savings take different routes."
    >
      <div className="space-y-3">
        {SENTENCES.map((s, si) => (
          <div key={si} className="rounded-xl border border-rule bg-paper-deep/45 p-3">
            <div className="flex flex-wrap gap-1.5">
              {s.words.map((w, wi) => {
                const flatIdx = flat.findIndex((f) => f.si === si && f.wi === wi);
                const isCurrent = pos.si === si && pos.wi === wi;
                const visited = flatIdx <= visitedUpTo;
                const color = STREAM_EXPERTS[s.route[wi]];
                const isBank = w === 'bank';
                return (
                  <span
                    key={wi}
                    className={`px-2 py-1 rounded-lg text-xs font-medium border-b-2 transition-all duration-300 ${
                      isCurrent
                        ? 'text-white shadow-sm scale-110'
                        : visited
                        ? 'bg-surface text-ink'
                        : 'bg-surface text-ink-faint border-b-rule'
                    } ${isBank ? 'font-extrabold' : ''}`}
                    style={{
                      backgroundColor: isCurrent ? color : undefined,
                      borderBottomColor: visited ? color : undefined,
                    }}
                  >
                    {w}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="text-[11px] font-semibold text-ink-muted uppercase tracking-wider mr-1">
          Experts
        </span>
        {STREAM_EXPERTS.map((c, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all duration-300"
            style={{
              borderColor: activeExpert === i ? c : '#e6ded1',
              backgroundColor: activeExpert === i ? `${c}14` : '#fff',
              color: activeExpert === i ? c : '#94a3b8',
              transform: activeExpert === i ? 'scale(1.06)' : 'scale(1)',
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
            {String.fromCharCode(65 + i)}
          </span>
        ))}
      </div>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   5. Load balancing — the crowded-doctor problem
   ──────────────────────────────────────────────────────────── */

const COLLAPSE = [43, 26, 14, 8, 4, 3, 1, 1];
const BALANCED = [13, 12, 13, 12, 13, 12, 13, 12];

function LoadBalance() {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<'collapse' | 'balanced'>('collapse');
  const base = mode === 'collapse' ? COLLAPSE : BALANCED;
  const [vals, setVals] = useState(base);

  useEffect(() => {
    setVals(base);
    if (reduced) return;
    const id = setInterval(() => {
      setVals(base.map((v) => Math.max(0.4, v + (Math.random() - 0.5) * (v > 5 ? 2.4 : 0.8))));
    }, 1100);
    return () => clearInterval(id);
  }, [mode, reduced]); // eslint-disable-line react-hooks/exhaustive-deps

  const max = Math.max(...vals);
  const idle = vals.filter((v) => v < 3).length;
  const busiest = Math.max(...vals);

  return (
    <VisualFrame
      label="What happens when everyone picks the same expert"
      action={
        <div className="flex gap-1 shrink-0">
          {(['collapse', 'balanced'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                mode === m
                  ? 'bg-ink-strong text-white'
                  : 'bg-surface text-ink-muted border border-rule hover:text-ink-strong'
              }`}
            >
              {m === 'collapse' ? 'No balancing' : 'With balancing'}
            </button>
          ))}
        </div>
      }
      caption="The balancing nudge is deliberately gentle. Push too hard and you force tokens to experts that are wrong for them — you traded quality for tidy bar charts."
    >
      <div className="flex items-end gap-2 h-40 px-1">
        {vals.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
            <span
              className={`text-[10px] font-bold transition-colors ${
                v < 3 ? 'text-ink-faint/55' : v > 25 ? 'text-ember' : 'text-ink-muted'
              }`}
            >
              {v.toFixed(0)}%
            </span>
            <div
              className={`w-full rounded-t-md transition-all duration-700 ease-out ${
                mode === 'collapse'
                  ? v > 25
                    ? 'bg-ember'
                    : v < 3
                    ? 'bg-rule'
                    : 'bg-ink-faint/45'
                  : 'bg-sage'
              }`}
              style={{ height: `${(v / max) * 100}%` }}
            />
            <span className="text-[9px] font-semibold text-ink-faint">E{i + 1}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <div
          className={`rounded-xl border p-3 transition-colors ${
            mode === 'collapse' ? 'border-ember/30 bg-ember-soft' : 'border-rule bg-surface'
          }`}
        >
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
            Busiest expert
          </div>
          <div
            className={`text-lg font-extrabold leading-tight ${
              mode === 'collapse' ? 'text-ember' : 'text-ink-strong'
            }`}
          >
            {busiest.toFixed(0)}% of tokens
          </div>
          <div className="text-[10px] text-ink-muted">
            {mode === 'collapse'
              ? 'Overflows its buffer — extra tokens get dropped'
              : 'Comfortably inside its capacity'}
          </div>
        </div>
        <div
          className={`rounded-xl border p-3 transition-colors ${
            mode === 'collapse' ? 'border-rule bg-paper-deep/60' : 'border-sage/30 bg-sage-soft'
          }`}
        >
          <div className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint">
            Barely-used experts
          </div>
          <div
            className={`text-lg font-extrabold leading-tight ${
              mode === 'collapse' ? 'text-ink-strong' : 'text-sage'
            }`}
          >
            {idle} of 8
          </div>
          <div className="text-[10px] text-ink-muted">
            {mode === 'collapse'
              ? 'Paid for in memory, never trained, never useful'
              : 'Everyone gets enough tokens to learn from'}
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   6. Memory vs compute — the real trade
   ──────────────────────────────────────────────────────────── */

const COMPARE = [
  { name: 'Dense 13B', memory: 13, compute: 13, note: 'Fast and small — but only knows 13B worth.' },
  { name: 'Dense 47B', memory: 47, compute: 47, note: 'Smarter, and every token costs 47B of maths.' },
  {
    name: 'MoE 8×7B (top-2)',
    memory: 47,
    compute: 13,
    note: 'Stores 47B of knowledge, spends 13B per token.',
    star: true,
  },
];

function MemoryVsCompute() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [run, setRun] = useState(0);
  const show = inView;
  const max = 47;

  return (
    <VisualFrame
      label="What you pay in memory vs. what you pay per token"
      action={
        <button
          onClick={() => setRun((r) => r + 1)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface border border-rule text-[11px] font-semibold text-ink-muted hover:text-accent hover:border-accent/45 transition-colors shrink-0"
        >
          <RotateCcw className="w-3 h-3" />
          Replay
        </button>
      }
      caption="Numbers follow Mixtral 8×7B: roughly 46.7B parameters stored, roughly 12.9B active per token. Rounded here for readability."
    >
      <div ref={ref} key={run} className="space-y-4">
        {COMPARE.map((m, i) => (
          <div key={m.name} className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`text-xs font-bold ${m.star ? 'text-accent' : 'text-ink-strong'}`}
              >
                {m.name}
                {m.star && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded bg-accent-soft text-accent text-[9px] uppercase tracking-wider align-middle">
                    best of both
                  </span>
                )}
              </span>
              <span className="text-[10px] text-ink-faint hidden sm:block">{m.note}</span>
            </div>

            {(
              [
                { label: 'Memory to store', v: m.memory, cls: 'bg-ink-faint', txt: 'text-ink-muted' },
                { label: 'Compute per token', v: m.compute, cls: 'bg-accent', txt: 'text-accent' },
              ] as const
            ).map((bar, bi) => (
              <div key={bar.label} className="flex items-center gap-2">
                <span className="w-24 sm:w-32 text-[10px] font-medium text-ink-faint shrink-0">
                  {bar.label}
                </span>
                <div className="flex-1 h-4 rounded-md bg-paper-deep overflow-hidden">
                  <div
                    className={`h-full rounded-md ${bar.cls}`}
                    style={{
                      width: show ? `${(bar.v / max) * 100}%` : '0%',
                      transition: `width 1s cubic-bezier(0.22,1,0.36,1) ${i * 0.15 + bi * 0.08}s`,
                    }}
                  />
                </div>
                <span className={`w-12 text-right text-[11px] font-mono font-bold ${bar.txt}`}>
                  {bar.v}B
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-accent/25 bg-accent-soft px-3.5 py-3">
        <ChevronRight className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <p className="text-xs text-accent-deep leading-relaxed">
          MoE does not shrink the model. It buys you the <strong>answers</strong> of a big model at
          the <strong>speed and price</strong> of a small one — provided you can afford to keep the
          big model in memory.
        </p>
      </div>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   Registry
   ──────────────────────────────────────────────────────────── */

const VISUALS: Record<string, React.ComponentType> = {
  'moe-dense-vs-sparse': DenseVsSparse,
  'moe-router': RouterFlow,
  'moe-topk': TopKGrid,
  'moe-context-routing': ContextRouting,
  'moe-load-balance': LoadBalance,
  'moe-memory-compute': MemoryVsCompute,
};

export default function ArticleVisual({ id }: { id: string }) {
  const Component = VISUALS[id];
  if (!Component) return null;
  return <Component />;
}
