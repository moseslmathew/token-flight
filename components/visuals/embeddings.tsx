'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  VisualFrame,
  PlayButton,
  ReplayButton,
  Connector,
  useReducedMotion,
  useTicker,
  useVisualVisible,
  clamp,
} from './primitives';

/* ────────────────────────────────────────────────────────────
   Palette carried over from the source animation so the article
   and the video read as the same piece of work.
   ──────────────────────────────────────────────────────────── */

const CORAL = '#d97757';
const CORAL_DEEP = '#bc5b3b';
const SLATE = '#6b89a7';
const PLATE = '#2a2823';

/** Positive values lean coral, negative lean slate; alpha tracks magnitude. */
const cellColor = (v: number, k = 0.62) => {
  const a = Math.min(1, Math.abs(v) / 1.2) * k;
  return v >= 0 ? `rgba(217,119,87,${a.toFixed(3)})` : `rgba(107,137,167,${a.toFixed(3)})`;
};

const fmtNum = (v: number) => (v < 0 ? '−' : '') + Math.abs(v).toFixed(2);

/** The 12 leading values of the "cat" vector, straight from the animation. */
const VEC = [0.82, -0.41, 0.13, 1.07, -0.66, 0.29, -1.12, 0.54, 0.08, 0.91, -0.27, 0.36];

/**
 * Deterministic pseudo-random in [0,1).
 * Integer-only on purpose: a Math.sin-based hash drifts in its last bits
 * between Node and the browser, which desynchronises SSR and hydration.
 */
const srand = (a: number, b: number) => {
  let h = (Math.imul(a | 0, 374761393) + Math.imul(b | 0, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};

/** Keep SVG coordinates stable across the SSR/client boundary. */
const round2 = (n: number) => Math.round(n * 100) / 100;

const SENTENCE = 'The cat sat quietly.';

const TOKENS = [
  { text: 'The', id: 464 },
  { text: 'cat', id: 2543, hero: true },
  { text: 'sat', id: 7826 },
  { text: 'quiet', id: 5810, fromSplit: true },
  { text: 'ly', id: 306, fromSplit: true },
  { text: '.', id: 13 },
];

const PRE_SPLIT = ['The', 'cat', 'sat', 'quietly', '.'];

/* ────────────────────────────────────────────────────────────
   1. The big picture — embedding happens before the model
   ──────────────────────────────────────────────────────────── */

const PIPELINE_CAPTIONS = [
  'Your sentence is still just text.',
  'It reaches the embedding layer.',
  'It leaves as a list of numbers.',
  'Only now can the model read it.',
];

function Pipeline() {
  const reduced = useReducedMotion();
  const visible = useVisualVisible();
  const [playing, setPlaying] = useState(true);
  const tick = useTicker(playing && visible && !reduced, 1500);
  const phase = tick % 4;

  const Station = ({
    active,
    children,
    label,
  }: {
    active: boolean;
    children: React.ReactNode;
    label: string;
  }) => (
    <div className="flex flex-1 flex-col items-center gap-2">
      <div
        className="flex min-h-[4.5rem] w-full items-center justify-center rounded-xl border px-3 py-3 text-center transition-all duration-500"
        style={{
          borderColor: active ? CORAL : '#e6ded1',
          backgroundColor: active ? 'rgba(217,119,87,0.07)' : '#fff',
          boxShadow: active ? `0 0 0 5px rgba(217,119,87,0.10)` : 'none',
        }}
      >
        {children}
      </div>
      <span className="text-[11px] tracking-wide text-ink-faint">{label}</span>
    </div>
  );

  const Arrow = ({ lit }: { lit: boolean }) => (
    <div className="flex shrink-0 items-center px-1 sm:px-2" aria-hidden="true">
      <svg width="26" height="10" viewBox="0 0 26 10">
        <line
          x1="0"
          y1="5"
          x2="19"
          y2="5"
          strokeWidth="2"
          strokeLinecap="round"
          stroke={lit ? CORAL : '#e6ded1'}
          className={lit ? 'moe-flow' : ''}
          style={{ transition: 'stroke 0.4s ease' }}
        />
        <path d="M18 1.5 L24 5 L18 8.5 Z" fill={lit ? CORAL : '#e6ded1'} style={{ transition: 'fill 0.4s ease' }} />
      </svg>
    </div>
  );

  return (
    <VisualFrame
      label="The big picture"
      action={<PlayButton playing={playing} onClick={() => setPlaying((p) => !p)} />}
      caption="Embedding is not part of the model's reasoning — it happens before it. By the time the model sees your sentence, there are no words left in it."
    >
      <div className="flex items-start">
        <Station active={phase === 0} label="your text">
          <span className="font-serif text-[0.9375rem] font-semibold text-ink-strong sm:text-base">
            The cat sat quietly.
          </span>
        </Station>

        <Arrow lit={phase === 1} />

        <Station active={phase === 1} label="embedding layer">
          <span className="flex flex-col gap-1.5">
            {[0.9, -0.5, 0.3].map((v, i) => (
              <span
                key={i}
                className="block h-2.5 w-12 rounded-sm transition-colors duration-500 sm:w-16"
                style={{ backgroundColor: cellColor(v) }}
              />
            ))}
          </span>
        </Station>

        <Arrow lit={phase === 2} />

        <Station active={phase === 2 || phase === 3} label="the model">
          <span
            className="flex w-full items-center justify-center rounded-lg px-2 py-3 font-serif text-lg font-semibold tracking-wide transition-all duration-500"
            style={{
              backgroundColor: PLATE,
              color: '#f6f1e4',
              boxShadow: phase === 3 ? `0 0 0 5px rgba(217,119,87,0.18)` : 'none',
            }}
          >
            LLM
          </span>
        </Station>
      </div>

      <p className="mt-5 text-center font-serif text-[0.9375rem] text-ink transition-opacity duration-300">
        {PIPELINE_CAPTIONS[phase]}
      </p>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   2. Tokenization — the sentence breaks into pieces
   ──────────────────────────────────────────────────────────── */

const TOKENIZE_STEPS = [
  'It starts with a sentence — still plain text.',
  'The sentence is broken into pieces called tokens.',
  '“quietly” is not in the vocabulary, so it splits into “quiet” + “ly”.',
  'Every piece — even the full stop — gets a number.',
];

function Tokenize() {
  const reduced = useReducedMotion();
  const visible = useVisualVisible();
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);

  // Type the sentence out during step 0, then hold.
  useEffect(() => {
    if (step !== 0) {
      setTyped(SENTENCE.length);
      return;
    }
    if (reduced) {
      setTyped(SENTENCE.length);
      return;
    }
    // Hold at zero until the reader arrives, so they see it typed out.
    setTyped(0);
    if (!visible) return;
    const id = setInterval(() => {
      setTyped((n) => {
        if (n >= SENTENCE.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 55);
    return () => clearInterval(id);
  }, [step, reduced, visible]);

  useEffect(() => {
    if (!playing || reduced || !visible) return;
    const hold = step === 0 ? 3200 : step === TOKENIZE_STEPS.length - 1 ? 3600 : 2600;
    const id = setTimeout(() => setStep((s) => (s + 1) % TOKENIZE_STEPS.length), hold);
    return () => clearTimeout(id);
  }, [playing, reduced, visible, step]);

  const chips = step >= 2 ? TOKENS : PRE_SPLIT.map((t) => ({ text: t, id: 0, hero: t === 'cat' }));

  return (
    <VisualFrame
      label="Step one · tokenization"
      action={<PlayButton playing={playing} onClick={() => setPlaying((p) => !p)} />}
      caption="Tokens are mostly subword pieces. That is why a model can handle a word it has never seen — it rebuilds it from parts it does know."
    >
      <div className="grid grid-cols-4 gap-1.5">
        {TOKENIZE_STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPlaying(false);
              setStep(i);
            }}
            aria-label={`Step ${i + 1}`}
            className="h-1.5 rounded-full transition-colors duration-200"
            style={{ backgroundColor: i === step ? CORAL : i < step ? 'rgba(217,119,87,0.35)' : '#e6ded1' }}
          />
        ))}
      </div>

      {/* The raw sentence */}
      <div className="mt-6 flex min-h-[3rem] items-center justify-center">
        <span
          className="rounded-xl border px-4 py-2.5 font-serif text-base font-semibold text-ink-strong transition-opacity duration-500 sm:text-lg"
          style={{
            borderColor: '#e6ded1',
            backgroundColor: '#fff',
            opacity: step === 0 ? 1 : 0.35,
          }}
        >
          {SENTENCE.slice(0, typed)}
          {step === 0 && typed < SENTENCE.length && (
            <span className="ml-px inline-block h-[1.1em] w-[2px] translate-y-[0.15em] bg-ember align-middle" />
          )}
        </span>
      </div>

      <Connector active={step >= 1} />

      {/* Tokens */}
      <div className="flex min-h-[5.5rem] flex-wrap items-start justify-center gap-2 sm:gap-2.5">
        {chips.map((tk, i) => {
          const visible = step >= 1;
          const isSplit = step >= 2 && 'fromSplit' in tk && tk.fromSplit;
          return (
            <span
              key={`${tk.text}-${i}`}
              className="flex flex-col items-center gap-1.5 transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <span
                className="rounded-lg border px-2.5 py-1.5 font-serif text-[0.9375rem] font-semibold sm:text-base"
                style={{
                  borderColor: isSplit ? CORAL : tk.hero ? CORAL : '#e6ded1',
                  backgroundColor: tk.hero ? 'rgba(217,119,87,0.10)' : '#fff',
                  color: '#22201b',
                }}
              >
                {tk.text}
              </span>
              <span
                className="font-mono text-[11px] tabular-nums transition-opacity duration-500"
                style={{
                  opacity: step >= 3 && tk.id ? 1 : 0,
                  color: tk.hero ? CORAL_DEEP : '#7a7263',
                  fontWeight: tk.hero ? 600 : 400,
                }}
              >
                {tk.id || ''}
              </span>
            </span>
          );
        })}
      </div>

      <p className="mt-5 min-h-[3rem] text-center font-serif text-[0.9375rem] text-ink">
        {TOKENIZE_STEPS[step]}
      </p>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   3. The vocabulary — one numbered list, fixed before training
   ──────────────────────────────────────────────────────────── */

const VOCAB_REAL: Record<number, string> = {
  13: '.', 306: 'ly', 464: 'The',
  2536: 'carpet', 2537: 'carriage', 2538: 'carrot', 2539: 'carry', 2540: 'cars',
  2541: 'cart', 2542: 'castle', 2543: 'cat', 2544: 'catch', 2545: 'cattle',
  2546: 'caught', 2547: 'cause', 2548: 'cave', 2549: 'ceiling', 2550: 'cell',
  5810: 'quiet', 7826: 'sat',
};

const SYL = ['al','an','ba','be','bo','ca','co','da','de','en','er','es','fa','go','in','it','la','le','lo','ma','me','mi','na','ne','no','on','or','pa','ra','re','ro','sa','se','ta','te','ti','un','ur','ve','wa'];

function vocabWord(r: number) {
  if (VOCAB_REAL[r] != null) return VOCAB_REAL[r];
  if (r < 15) return '!"#$%&\'()*+,-./'.charAt(r);
  if (r < 95) return String.fromCharCode(97 + ((r - 15) % 26));
  const n = 2 + Math.floor(srand(r, 7) * 2);
  let w = '';
  for (let i = 0; i < n; i++) w += SYL[Math.floor(srand(r, 13 + i) * SYL.length)];
  return w;
}

const VOCAB_SIZE = 50257;
const ROW_PITCH = 40;
const VISIBLE_ROWS = 7;

function Vocabulary() {
  const reduced = useReducedMotion();
  const visible = useVisualVisible();
  const [run, setRun] = useState(0);
  const [center, setCenter] = useState(6);

  useEffect(() => {
    if (reduced) {
      setCenter(2543);
      return;
    }
    setCenter(6);
    if (!visible) return;
    // Slow crawl through the early entries, then a jump to "cat".
    const crawl = setInterval(() => setCenter((c) => c + 1), 420);
    const leap = setTimeout(() => {
      clearInterval(crawl);
      setCenter(2543);
    }, 3600);
    return () => {
      clearInterval(crawl);
      clearTimeout(leap);
    };
  }, [run, reduced, visible]);

  const settled = center === 2543;
  const rows: number[] = [];
  for (let r = center - 3; r <= center + 3; r++) if (r >= 0) rows.push(r);

  const thumbTop = clamp(center / VOCAB_SIZE, 0, 1) * (VISIBLE_ROWS * ROW_PITCH - 34);

  return (
    <VisualFrame
      label="Step two · the vocabulary"
      action={<ReplayButton onClick={() => setRun((r) => r + 1)} />}
      caption="The list is decided before training starts and never changes. A token's ID carries no meaning at all — it is simply a position in this list."
    >
      <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-rule bg-surface">
        <div className="flex items-baseline justify-between border-b border-rule-soft px-4 py-2.5">
          <span className="eyebrow text-ink-muted">Vocabulary</span>
          <span
            className="font-mono text-xs tabular-nums transition-colors duration-300"
            style={{ color: settled ? CORAL_DEEP : '#7a7263', fontWeight: settled ? 600 : 400 }}
          >
            {center.toLocaleString('en-US')} / 50,257
          </span>
        </div>

        <div className="relative" style={{ height: VISIBLE_ROWS * ROW_PITCH }}>
          {rows.map((r) => {
            const hero = settled && r === 2543;
            const y = (VISIBLE_ROWS * ROW_PITCH) / 2 + (r - center) * ROW_PITCH - ROW_PITCH / 2;
            return (
              <div
                key={r}
                className="absolute inset-x-2 flex items-center justify-between rounded-lg px-3 transition-all duration-500"
                style={{
                  top: y,
                  height: ROW_PITCH,
                  backgroundColor: hero ? 'rgba(217,119,87,0.13)' : 'transparent',
                }}
              >
                <span
                  className="font-mono text-xs tabular-nums"
                  style={{ color: hero ? CORAL_DEEP : '#7a7263', fontWeight: hero ? 600 : 400 }}
                >
                  {r}
                </span>
                <span
                  className="font-serif text-[0.9375rem]"
                  style={{ color: hero ? '#15130f' : '#635b4d', fontWeight: hero ? 600 : 400 }}
                >
                  {vocabWord(r)}
                </span>
              </div>
            );
          })}

          {/* edge fades */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-7 bg-gradient-to-b from-surface to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-surface to-transparent" />

          {/* scroll thumb */}
          <div className="absolute right-1.5 top-0 h-full w-1.5 rounded-full bg-rule-soft" />
          <div
            className="absolute right-1.5 w-1.5 rounded-full transition-all duration-700"
            style={{ top: thumbTop, height: 34, backgroundColor: settled ? CORAL : '#c9c0ae' }}
          />
        </div>
      </div>

      <p className="mt-5 text-center font-serif text-[0.9375rem] text-ink">
        {settled ? (
          <>
            <span className="font-semibold">&ldquo;cat&rdquo;</span> lives at position{' '}
            <span className="font-mono font-semibold" style={{ color: CORAL_DEEP }}>2543</span>.
          </>
        ) : (
          'One numbered list of every token the model knows…'
        )}
      </p>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   4. The lookup — one row per token, lifted out as a vector
   ──────────────────────────────────────────────────────────── */

const LOOKUP_STEPS = [
  'The token ID is not the meaning. It is an address.',
  'The embedding matrix holds one row for every token in the vocabulary.',
  'Go to row 2543 — the row belonging to “cat”.',
  'Lift that row out. This is the embedding.',
  'Each position holds one value: coral for positive, slate for negative.',
];

const MATRIX_ROWS = [2538, 2539, 2540, 2541, 2542, 2543, 2544, 2545, 2546];
const MATRIX_COLS = 12;

function Lookup() {
  const reduced = useReducedMotion();
  const visible = useVisualVisible();
  const [playing, setPlaying] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!playing || reduced || !visible) return;
    const id = setTimeout(
      () => setStep((s) => (s + 1) % LOOKUP_STEPS.length),
      step === LOOKUP_STEPS.length - 1 ? 4200 : 2800,
    );
    return () => clearTimeout(id);
  }, [playing, reduced, visible, step]);

  const showMatrix = step >= 1 && step <= 2;
  const highlight = step >= 2;
  const showVector = step >= 3;
  const showNumbers = step >= 4;

  const cellVal = (r: number, c: number) =>
    r === 2543 ? VEC[c] : (srand(r, c) * 2 - 1) * 1.18;

  return (
    <VisualFrame
      label="Step three · the embedding lookup"
      action={<PlayButton playing={playing} onClick={() => setPlaying((p) => !p)} />}
      caption="No arithmetic happens here. The embedding layer is a lookup table — the model simply fetches the row that was learned for that token."
    >
      <div className="grid grid-cols-5 gap-1.5">
        {LOOKUP_STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPlaying(false);
              setStep(i);
            }}
            aria-label={`Step ${i + 1}`}
            className="h-1.5 rounded-full transition-colors duration-200"
            style={{ backgroundColor: i === step ? CORAL : i < step ? 'rgba(217,119,87,0.35)' : '#e6ded1' }}
          />
        ))}
      </div>

      {/* cat → 2543 */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <span className="font-serif text-lg font-semibold italic text-ink-strong">&ldquo;cat&rdquo;</span>
        <span className="text-ink-faint">→</span>
        <span
          className="rounded-lg px-3 py-1 font-mono text-sm font-medium tabular-nums text-[#f6f1e4]"
          style={{ backgroundColor: CORAL }}
        >
          2543
        </span>
      </div>

      {/* Matrix window */}
      <div
        className="relative mt-5 overflow-hidden transition-all duration-700"
        style={{ height: showMatrix ? 236 : 0, opacity: showMatrix ? 1 : 0 }}
      >
        <div className="overflow-x-auto">
          <div className="min-w-[19rem] space-y-1">
            {MATRIX_ROWS.map((r) => {
              const isHero = r === 2543;
              return (
                <div
                  key={r}
                  className="flex items-center gap-2 rounded-md px-1 py-0.5 transition-all duration-500"
                  style={{
                    backgroundColor: isHero && highlight ? 'rgba(217,119,87,0.10)' : 'transparent',
                    boxShadow: isHero && highlight ? `0 0 0 1.5px ${CORAL}` : 'none',
                  }}
                >
                  <span
                    className="w-12 shrink-0 text-right font-mono text-[11px] tabular-nums"
                    style={{ color: isHero && highlight ? CORAL_DEEP : '#9c9384', fontWeight: isHero && highlight ? 600 : 400 }}
                  >
                    {r}
                  </span>
                  <span className="flex flex-1 gap-1">
                    {Array.from({ length: MATRIX_COLS }).map((_, c) => (
                      <span
                        key={c}
                        className="h-5 flex-1 rounded-[3px]"
                        style={{ backgroundColor: cellColor(cellVal(r, c)) }}
                      />
                    ))}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-surface to-transparent" />
      </div>

      {/* Extracted vector */}
      <div
        className="overflow-hidden transition-all duration-700"
        style={{ maxHeight: showVector ? 300 : 0, opacity: showVector ? 1 : 0 }}
      >
        <div className="pt-4">
          <div className="mb-2 text-center">
            <span className="font-mono text-[11px] font-semibold" style={{ color: CORAL_DEEP }}>
              row 2543
            </span>
          </div>
          <div className="overflow-x-auto pb-1">
            <div className="flex min-w-[20rem] gap-1.5">
              {VEC.map((v, i) => (
                <div
                  key={i}
                  className="flex flex-1 flex-col items-center justify-center rounded-lg border transition-all duration-500"
                  style={{
                    borderColor: '#e6ded1',
                    backgroundColor: showNumbers ? '#fff' : cellColor(v),
                    height: showNumbers ? 74 : 34,
                    transitionDelay: `${i * 35}ms`,
                  }}
                >
                  {showNumbers && (
                    <>
                      <span className="font-mono text-[11px] font-semibold tabular-nums text-ink-strong sm:text-xs">
                        {fmtNum(v)}
                      </span>
                      <span className="relative mt-1.5 block h-1.5 w-[80%]">
                        <span className="absolute left-1/2 top-0 h-1.5 w-px -translate-x-1/2 bg-rule" />
                        <span
                          className="absolute top-0 h-1.5 rounded-full transition-all duration-700"
                          style={{
                            left: '50%',
                            width: `${(Math.abs(v) / 1.2) * 45}%`,
                            transform: v >= 0 ? 'none' : 'translateX(-100%)',
                            backgroundColor: v >= 0 ? CORAL : SLATE,
                          }}
                        />
                      </span>
                    </>
                  )}
                </div>
              ))}
              <div
                className="flex w-8 shrink-0 items-center justify-center font-mono text-ink-faint transition-all duration-500"
                style={{ height: showNumbers ? 74 : 34 }}
              >
                …
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 min-h-[3rem] text-center font-serif text-[0.9375rem] text-ink">
        {LOOKUP_STEPS[step]}
      </p>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   5. Dimensions — "768 dimensions" just means 768 values
   ──────────────────────────────────────────────────────────── */

const DIM_MODELS = [
  { name: 'this example', dims: 768, color: CORAL },
  { name: 'GPT-3', dims: 12288, color: SLATE },
];

function Dimensions() {
  const visible = useVisualVisible();
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => setShown(true), 200);
    return () => clearTimeout(id);
  }, [visible]);

  return (
    <VisualFrame
      label="What “768 dimensions” actually means"
      caption="A dimension is just a slot. Nobody can tell you what slot 400 “means” — the model was never asked to make any single slot interpretable."
    >
      <div className="space-y-4">
        {DIM_MODELS.map((m, i) => (
          <div key={m.name} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-right text-meta text-ink-muted sm:w-32">{m.name}</span>
            <span className="h-4 flex-1 overflow-hidden rounded-full bg-paper-deep">
              <span
                className="block h-full rounded-full"
                style={{
                  width: shown ? `${(m.dims / 12288) * 100}%` : '0%',
                  backgroundColor: m.color,
                  transition: `width 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 0.2}s`,
                }}
              />
            </span>
            <span className="w-24 shrink-0 font-mono text-[11px] font-semibold tabular-nums text-ink-strong sm:text-xs">
              {m.dims.toLocaleString('en-US')}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 border-l-2 pl-4 font-serif text-[0.9375rem] leading-relaxed text-ink" style={{ borderColor: CORAL }}>
        Every token in the vocabulary gets a row this wide. That is why the embedding table alone runs to
        tens of millions of numbers before the model has learned anything else.
      </p>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   6. The fingerprint — the whole pattern, not any one number
   ──────────────────────────────────────────────────────────── */

function cosine(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

/**
 * The strip shows 12 cells, but similarity is computed over the full 768 —
 * otherwise "change one value" would look catastrophic purely because the
 * demo vector is short.
 */
const FULL_DIMS = 768;
const FULL_VEC = Array.from({ length: FULL_DIMS }, (_, i) =>
  i < VEC.length ? VEC[i] : (srand(i, 3) * 2 - 1) * 1.1,
);

function Fingerprint() {
  const [mode, setMode] = useState<'one' | 'all'>('one');
  const [amount, setAmount] = useState(60);

  const changed = useMemo(() => {
    const k = amount / 100;
    if (mode === 'one') {
      return FULL_VEC.map((v, i) => (i === 6 ? v + k * 2.4 : v));
    }
    return FULL_VEC.map((v, i) => v + (srand(i, 91) * 2 - 1) * k * 1.6);
  }, [mode, amount]);

  const sim = cosine(FULL_VEC, changed);

  const verdict =
    sim > 0.97
      ? { text: 'Still unmistakably “cat”.', tone: CORAL_DEEP }
      : sim > 0.85
      ? { text: 'Drifting, but still recognisable.', tone: CORAL_DEEP }
      : sim > 0.6
      ? { text: 'This is closer to some other word now.', tone: SLATE }
      : { text: 'Not “cat” any more.', tone: SLATE };

  return (
    <VisualFrame
      label="The fingerprint"
      action={
        <div className="flex shrink-0 gap-1">
          {(['one', 'all'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all"
              style={
                mode === m
                  ? { backgroundColor: PLATE, color: '#f6f1e4' }
                  : { backgroundColor: '#fff', color: '#635b4d', border: '1px solid #e6ded1' }
              }
            >
              {m === 'one' ? 'One value' : 'Whole pattern'}
            </button>
          ))}
        </div>
      }
      caption="Meaning is spread across the entire vector. Nudge one slot and the word survives; disturb the pattern as a whole and it stops being “cat”."
    >
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
          Disturb
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="flex-1 cursor-pointer accent-[#d97757]"
          aria-label="How much to disturb the vector"
        />
        <span className="w-10 shrink-0 text-right font-mono text-[11px] tabular-nums text-ink-muted">
          {amount}%
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {[
          { label: 'learned “cat”', values: FULL_VEC },
          { label: 'after your change', values: changed },
        ].map((row) => (
          <div key={row.label}>
            <span className="mb-1.5 block text-[11px] text-ink-faint">{row.label}</span>
            <div className="flex items-center gap-1">
              {row.values.slice(0, 12).map((v, i) => (
                <span
                  key={i}
                  className="h-9 flex-1 rounded-[4px] transition-colors duration-200"
                  style={{ backgroundColor: cellColor(v) }}
                />
              ))}
              <span className="w-6 shrink-0 text-center font-mono text-ink-faint">…</span>
            </div>
          </div>
        ))}
        <p className="text-[11px] text-ink-faint">
          Showing the first 12 cells; the similarity below is measured across all 768.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-rule-soft pt-4">
        <span className="font-serif text-[0.9375rem] font-semibold" style={{ color: verdict.tone }}>
          {verdict.text}
        </span>
        <span className="font-mono text-xs tabular-nums text-ink-muted">
          similarity {sim.toFixed(3)}
        </span>
      </div>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   7. Meaning as geometry — similar words land near each other
   ──────────────────────────────────────────────────────────── */

const SPACE_POINTS = [
  { w: 'cat', x: 1148, y: 468, hero: true },
  { w: 'kitten', x: 1262, y: 372, hero: true },
  { w: 'dog', x: 1006, y: 540, near: true },
  { w: 'puppy', x: 1092, y: 636, near: true },
  { w: 'tiger', x: 1336, y: 514, near: true },
  { w: 'car', x: 478, y: 758 },
  { w: 'truck', x: 384, y: 664 },
  { w: 'piano', x: 562, y: 252 },
  { w: 'violin', x: 452, y: 344 },
];

function SemanticSpace() {
  const reduced = useReducedMotion();
  const visible = useVisualVisible();
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reduced) {
      setProgress(100);
      return;
    }
    if (!playing || !visible) return;
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setPlaying(false);
          return 100;
        }
        return p + 1.4;
      });
    }, 24);
    return () => clearInterval(id);
  }, [playing, reduced, visible]);

  const p = clamp(progress / 100, 0, 1);

  // Before training, every word sits at an arbitrary spot; training moves it.
  const positions = SPACE_POINTS.map((pt, i) => {
    const sx = 380 + srand(i, 17) * 980;
    const sy = 220 + srand(i, 29) * 600;
    return {
      ...pt,
      cx: round2(sx + (pt.x - sx) * p),
      cy: round2(sy + (pt.y - sy) * p),
    };
  });

  return (
    <VisualFrame
      label="Meaning as geometry"
      action={
        <ReplayButton
          onClick={() => {
            setProgress(0);
            setPlaying(true);
          }}
        />
      }
      caption="Nobody placed these words. Cat and kitten drifted together because they kept turning up in the same kinds of sentences — meaning is a by-product of position."
    >
      <div className="overflow-hidden rounded-xl border border-rule bg-paper-deep/30">
        <svg viewBox="300 180 1120 660" className="w-full" role="img" aria-label="Words positioned in embedding space">
          {/* neighbourhood ring around cat */}
          <circle
            cx={SPACE_POINTS[0].x}
            cy={SPACE_POINTS[0].y}
            r={210}
            fill="none"
            stroke={CORAL}
            strokeWidth={2}
            strokeDasharray="8 10"
            opacity={p > 0.85 ? (p - 0.85) / 0.15 * 0.5 : 0}
          />

          {positions.map((pt, i) => (
            <g key={pt.w}>
              <circle
                cx={pt.cx}
                cy={pt.cy}
                r={pt.hero ? 15 : 11}
                fill={pt.hero ? CORAL : pt.near ? CORAL : SLATE}
                opacity={pt.hero ? 1 : 0.75}
              />
              <text
                x={pt.cx}
                y={pt.cy - 26}
                textAnchor="middle"
                fontSize={pt.hero ? 30 : 26}
                fontWeight={pt.hero ? 600 : 400}
                fill={pt.hero ? '#15130f' : '#635b4d'}
                style={{ fontFamily: 'var(--font-newsreader), Georgia, serif' }}
                opacity={0.35 + 0.65 * clamp((p - i * 0.03) * 1.6, 0, 1)}
              >
                {pt.w}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
          Training
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(progress)}
          onChange={(e) => {
            setPlaying(false);
            setProgress(Number(e.target.value));
          }}
          className="flex-1 cursor-pointer accent-[#d97757]"
          aria-label="Training progress"
        />
        <span className="w-10 shrink-0 text-right font-mono text-[11px] tabular-nums text-ink-muted">
          {Math.round(progress)}%
        </span>
      </div>

      <p className="mt-4 text-center font-serif text-[0.9375rem] text-ink">
        {p < 0.25
          ? 'Before training, the vectors are random. Position means nothing.'
          : p < 0.8
          ? 'As the model reads, words that share contexts drift toward each other…'
          : 'Cat, kitten, dog, puppy, tiger — neighbours. Car, piano, violin — elsewhere.'}
      </p>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   8. Recap — the whole chain in one line
   ──────────────────────────────────────────────────────────── */

const RECAP = [
  { label: 'word', el: <span className="font-serif text-xl font-semibold italic text-ink-strong">&ldquo;cat&rdquo;</span> },
  { label: 'token', el: <span className="rounded-lg border border-rule bg-surface px-2.5 py-1 font-serif text-base font-semibold text-ink-strong">cat</span> },
  { label: 'token ID', el: <span className="rounded-lg px-2.5 py-1 font-mono text-sm tabular-nums text-[#f6f1e4]" style={{ backgroundColor: PLATE }}>2543</span> },
  { label: 'vector', el: <span className="font-mono text-xs tabular-nums text-ink-strong">[ 0.82 &minus;0.41 … ]</span> },
  { label: 'a point in meaning-space', el: <span className="block h-4 w-4 rounded-full" style={{ backgroundColor: CORAL, boxShadow: '0 0 0 6px rgba(217,119,87,0.16)' }} /> },
];

function Recap() {
  const reduced = useReducedMotion();
  const visible = useVisualVisible();
  const [base, setBase] = useState(0);
  const tick = useTicker(visible && !reduced, 700);
  // Replay rebases the counter; without this the sequence never restarts.
  const shown = reduced ? RECAP.length : Math.min(RECAP.length, tick - base + 1);

  return (
    <VisualFrame
      label="That’s a word embedding"
      action={<ReplayButton onClick={() => setBase(tick)} />}
      caption="Five steps, and only the first two involve anything you would recognise as language."
    >
      <div className="flex flex-wrap items-start justify-center gap-x-3 gap-y-5">
        {RECAP.map((item, i) => (
          <React.Fragment key={item.label}>
            {i > 0 && (
              <span
                className="self-center pt-1 text-lg text-ink-faint transition-opacity duration-500"
                style={{ opacity: shown > i ? 1 : 0 }}
                aria-hidden="true"
              >
                →
              </span>
            )}
            <span
              className="flex min-w-0 flex-col items-center gap-2 transition-all duration-500"
              style={{
                opacity: shown > i ? 1 : 0,
                transform: shown > i ? 'translateY(0)' : 'translateY(8px)',
              }}
            >
              <span className="flex min-h-[2.25rem] items-center">{item.el}</span>
              <span className="max-w-[7rem] text-center text-[11px] leading-tight text-ink-faint">
                {item.label}
              </span>
            </span>
          </React.Fragment>
        ))}
      </div>
    </VisualFrame>
  );
}

/* ──────────────────────────────────────────────────────────── */

export const EMBEDDING_VISUALS: Record<string, React.ComponentType> = {
  'emb-pipeline': Pipeline,
  'emb-tokenize': Tokenize,
  'emb-vocabulary': Vocabulary,
  'emb-lookup': Lookup,
  'emb-dimensions': Dimensions,
  'emb-fingerprint': Fingerprint,
  'emb-space': SemanticSpace,
  'emb-recap': Recap,
};
