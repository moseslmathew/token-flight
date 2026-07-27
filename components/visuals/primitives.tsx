'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

/* ────────────────────────────────────────────────────────────
   Shared hooks and chrome for in-article animated explainers.
   ──────────────────────────────────────────────────────────── */

export function useReducedMotion() {
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

export function useInView<T extends HTMLElement>() {
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

export function useTicker(playing: boolean, interval: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setTick((t) => t + 1), interval);
    return () => clearInterval(id);
  }, [playing, interval]);
  return tick;
}

/** Elapsed seconds since mount/reset, for continuously timed scenes. */
export function useClock(playing: boolean, resetKey: number = 0) {
  const [t, setT] = useState(0);
  useEffect(() => {
    setT(0);
  }, [resetKey]);
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((prev) => prev + dt);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [playing, resetKey]);
  return t;
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export const easeInOutCubic = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

export const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

/** Tween a value between `start` and `end` seconds on a clock. */
export function tween(
  t: number,
  start: number,
  end: number,
  from = 0,
  to = 1,
  ease: (p: number) => number = easeInOutCubic,
) {
  if (end <= start) return t >= end ? to : from;
  return from + (to - from) * ease(clamp((t - start) / (end - start), 0, 1));
}

export function VisualFrame({
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

const controlClass =
  'flex shrink-0 items-center gap-1.5 rounded-lg border border-rule bg-surface px-2.5 py-1 text-[11px] font-semibold text-ink-muted transition-colors hover:border-accent/45 hover:text-accent';

export function PlayButton({ playing, onClick }: { playing: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className={controlClass}>
      {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
      {playing ? 'Pause' : 'Play'}
    </button>
  );
}

export function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className={controlClass}>
      <RotateCcw className="h-3 w-3" />
      Replay
    </button>
  );
}

/** Vertical animated connector between stacked stages. */
export function Connector({ active }: { active: boolean }) {
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
