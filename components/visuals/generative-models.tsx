'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  VisualFrame,
  PlayButton,
  useReducedMotion,
  useVisualVisible,
} from './primitives';
import {
  Layers,
  Network,
  Cpu,
  Waves,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────────
   1. Core Generative AI Models Taxonomy (Elevated Diagram)
   ──────────────────────────────────────────────────────────── */

const CORE_MODELS = [
  {
    id: 'vae',
    slug: 'vae-variational-autoencoders-deep-dive',
    name: 'Variational Autoencoders',
    shortName: 'VAEs',
    icon: Network,
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accentColor: '#6366f1',
    activeBorder: 'border-indigo-500',
    tagline: 'Smooth Latent Space Reconstruction',
    coreMechanism: 'Encodes high-dimensional data into continuous probability distributions (mean μ & variance σ), regularizing latent space for smooth interpolation.',
    mathForm: 'L = E[log p(x|z)] - D_KL(q(z|x) || p(z))',
    bestFor: 'Disentangled representations, latent vector arithmetic, compression, fast single-pass sampling',
    generationFlow: ['Input (x)', 'Encoder q(z|x)', 'Latent (μ, σ)', 'Sample z ~ N(μ, σ²)', 'Decoder p(x|z)', 'Output (x̂)'],
  },
  {
    id: 'gan',
    slug: 'gan-generative-adversarial-networks-deep-dive',
    name: 'Generative Adversarial Networks',
    shortName: 'GANs',
    icon: ShieldCheck,
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    accentColor: '#f43f5e',
    activeBorder: 'border-rose-500',
    tagline: 'Minimax Game Between Generator & Critic',
    coreMechanism: 'Two competing networks in a zero-sum game: Generator creates synthetic data from noise while Discriminator learns to detect impostors.',
    mathForm: 'min_G max_D V(D, G) = E[log D(x)] + E[log(1 - D(G(z)))]',
    bestFor: 'Ultra-sharp image rendering, real-time 1-step inference, neural style transfer, face synthesis',
    generationFlow: ['Noise (z)', 'Generator G(z)', 'Fake Candidate', 'Discriminator D(x)', 'Loss Gradient Update', 'High-Fidelity Output'],
  },
  {
    id: 'transformer',
    slug: 'transformers-autoregressive-models-deep-dive',
    name: 'Transformer-Based Models',
    shortName: 'Transformers',
    icon: Cpu,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentColor: '#059669',
    activeBorder: 'border-emerald-500',
    tagline: 'Autoregressive Next-Token Prediction',
    coreMechanism: 'Uses self-attention over sequence context to iteratively estimate the probability distribution of the next element in a sequence.',
    mathForm: 'P(x) = ∏ P(x_t | x_1, x_2, ..., x_{t-1})',
    bestFor: 'Natural language (LLMs), code generation, multi-step reasoning, sequential data synthesis',
    generationFlow: ['Prompt Context', 'Self-Attention (Q, K, V)', 'Logits Projection', 'Softmax Probability', 'Sample Next Token', 'Iterate Loop'],
  },
  {
    id: 'diffusion',
    slug: 'diffusion-models-deep-dive',
    name: 'Diffusion Models',
    shortName: 'Diffusion',
    icon: Waves,
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    accentColor: '#0891b2',
    activeBorder: 'border-cyan-500',
    tagline: 'Iterative Denoising from Pure Chaos',
    coreMechanism: 'Corrupts images into pure Gaussian noise during training, then trains a neural network to step-by-step reverse the noise into crisp realism.',
    mathForm: 'x_{t-1} = 1/√α_t (x_t - (1-α_t)/√(1-ᾱ_t) ε_θ(x_t, t)) + σ_t z',
    bestFor: 'Photorealistic image generation, video synthesis (Sora/FLUX), audio synthesis, 3D asset creation',
    generationFlow: ['Pure Gaussian Noise (x_T)', 'Predict Noise ε_θ', 'Subtract Residual', 'Step t -> t-1', 'Iterate N Steps', 'Crisp Sample (x_0)'],
  },
];

export function CoreGenAITaxonomyVisual() {
  const [selectedId, setSelectedId] = useState<string>('vae');
  const selectedModel = CORE_MODELS.find((m) => m.id === selectedId) || CORE_MODELS[0];

  return (
    <VisualFrame
      label="Taxonomy of Core Generative AI Architectures"
      caption="All four architectures stand on the dual pillars of Deep Neural Networks and Probabilistic Modeling — but differ completely in how they formulate and sample from data distributions."
    >
      <div className="space-y-6">
        {/* Foundation Banner */}
        <div className="rounded-xl border border-rule bg-paper-deep/60 p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-strong text-white">
                <Layers className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-ink-strong uppercase tracking-wider">
                  The Two Unifying Pillars
                </h4>
                <p className="text-[11px] text-ink-muted">
                  Every modern generative model bridges these two mathematical foundations:
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="rounded-full bg-surface border border-rule px-3 py-1 text-xs font-semibold text-ink-strong shadow-xs">
                🧠 Deep Learning Architectures
              </span>
              <span className="text-ink-faint font-bold">+</span>
              <span className="rounded-full bg-surface border border-rule px-3 py-1 text-xs font-semibold text-accent shadow-xs">
                🎲 Probabilistic Modeling
              </span>
            </div>
          </div>
        </div>

        {/* 4 Models Selector Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CORE_MODELS.map((model) => {
            const Icon = model.icon;
            const isSelected = model.id === selectedId;

            return (
              <button
                key={model.id}
                onClick={() => setSelectedId(model.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${model.activeBorder} bg-surface shadow-md ring-2 ring-accent/15 -translate-y-0.5`
                    : 'border-rule bg-surface hover:border-slate-300 hover:bg-paper/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className="p-2 rounded-lg transition-transform duration-200"
                      style={{
                        backgroundColor: `${model.accentColor}15`,
                        color: model.accentColor,
                        transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${model.badgeColor}`}>
                      {model.shortName}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-ink-strong leading-snug">
                    {model.name}
                  </h4>
                  <p className="text-[11px] text-ink-muted mt-1 leading-relaxed line-clamp-2">
                    {model.tagline}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-rule-soft flex items-center justify-between text-[10px] font-semibold">
                  <span style={{ color: isSelected ? model.accentColor : '#64748b' }}>
                    {isSelected ? 'Viewing mechanism' : 'Click to inspect'}
                  </span>
                  <ArrowRight
                    className="h-3 w-3 transition-transform duration-200"
                    style={{
                      transform: isSelected ? 'translateX(2px)' : 'none',
                      color: isSelected ? model.accentColor : '#94a3b8',
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="rounded-2xl border border-rule bg-surface p-5 sm:p-6 shadow-xs animate-rise-in">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-rule-soft">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: selectedModel.accentColor }}
                />
                <h3 className="text-sm sm:text-base font-bold text-ink-strong">
                  {selectedModel.name} ({selectedModel.shortName})
                </h3>
              </div>
              <p className="text-xs text-ink-muted">{selectedModel.coreMechanism}</p>
            </div>

            <div className="shrink-0 rounded-lg bg-paper-deep px-3 py-1.5 border border-rule font-mono text-[11px] text-ink-strong">
              <span className="text-ink-faint mr-1.5 font-sans font-semibold text-[10px] uppercase">Objective:</span>
              <code>{selectedModel.mathForm}</code>
            </div>
          </div>

          {/* Pipeline Flow Steps */}
          <div className="mt-5">
            <span className="eyebrow block text-ink-faint text-[10px] mb-3">
              Generation Pipeline Flow
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {selectedModel.generationFlow.map((step, idx) => (
                <div
                  key={step}
                  className="relative rounded-xl border border-rule bg-paper-deep/60 p-2.5 text-center flex flex-col justify-center items-center"
                >
                  <span className="text-[9px] font-bold font-mono text-ink-faint mb-1">
                    0{idx + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-ink-strong leading-tight">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Suited For & Direct Link */}
          <div className="mt-5 pt-4 border-t border-rule-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink-muted shrink-0">
                Primary Use Cases:
              </span>
              <span className="font-medium text-ink-strong bg-accent-soft text-accent-deep px-3 py-1 rounded-full border border-accent/20 text-[11px]">
                {selectedModel.bestFor}
              </span>
            </div>

            <Link
              href={`/blog/${selectedModel.slug}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-ink-strong text-white hover:bg-black font-semibold text-xs transition-all shadow-xs cursor-pointer group"
            >
              <span>Explore {selectedModel.shortName} Deep-Dive</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   2. Interactive Diffusion Denoising Step Simulator
   ──────────────────────────────────────────────────────────── */

export function DiffusionProcessVisual() {
  const reduced = useReducedMotion();
  const visible = useVisualVisible();
  const [step, setStep] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(true);
  const maxSteps = 5;

  useEffect(() => {
    if (!playing || reduced || !visible) return;
    const interval = setInterval(() => {
      setStep((s) => (s >= maxSteps ? 0 : s + 1));
    }, 1400);
    return () => clearInterval(interval);
  }, [playing, reduced, visible]);

  const stepLabels = [
    { t: 't = T (1000)', noisePct: 100, label: 'Pure Gaussian Noise', desc: 'Complete randomness N(0, I). No intelligible structure.' },
    { t: 't = 750', noisePct: 75, label: 'Coarse Outlines', desc: 'Model detects high-level energy gradients and global composition.' },
    { t: 't = 500', noisePct: 50, label: 'Structural Geometry', desc: 'Shapes, silhouettes, and foreground-background separation crystallize.' },
    { t: 't = 250', noisePct: 25, label: 'Textures & Surfaces', desc: 'Lighting, shading, surface materials, and mid-frequency features emerge.' },
    { t: 't = 50', noisePct: 10, label: 'Fine Detail Polish', desc: 'Micro-details, sharp edges, and high-frequency pixel clarity resolved.' },
    { t: 't = 0', noisePct: 0, label: 'Clean Sample (x₀)', desc: 'Final generated artifact ready for display. Noise residual is zero.' },
  ];

  const current = stepLabels[step];

  return (
    <VisualFrame
      label="The Reverse Diffusion Denoising Process"
      action={<PlayButton playing={playing} onClick={() => setPlaying((p) => !p)} />}
      caption="Diffusion turns generation into a step-by-step calculus problem: instead of creating a complex image in a single leap, the network only learns to subtract a tiny sliver of noise at each step."
    >
      <div className="space-y-4">
        {/* Step progress bar */}
        <div className="flex items-center justify-between gap-1.5">
          {stepLabels.map((s, idx) => (
            <button
              key={s.t}
              onClick={() => {
                setPlaying(false);
                setStep(idx);
              }}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                idx === step
                  ? 'bg-accent text-white shadow-xs'
                  : idx < step
                  ? 'bg-accent-soft text-accent border border-accent/20'
                  : 'bg-paper-deep text-ink-faint border border-rule'
              }`}
            >
              {idx === 0 ? 'Start' : idx === stepLabels.length - 1 ? 'End' : `Step ${idx}`}
            </button>
          ))}
        </div>

        {/* Visual canvas representation */}
        <div className="rounded-xl border border-rule bg-slate-950 p-5 text-white flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
          {/* Simulated noise particles overlay */}
          <div
            className="absolute inset-0 bg-repeat opacity-40 transition-opacity duration-500 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
              backgroundSize: '8px 8px',
              opacity: current.noisePct / 100,
            }}
          />

          <div className="relative z-10 text-center space-y-2">
            <span className="font-mono text-xs text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
              Timestep: {current.t}
            </span>
            <h4 className="text-base font-extrabold text-white">{current.label}</h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              {current.desc}
            </p>
          </div>

          <div className="w-full max-w-xs mt-4">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
              <span>Noise ratio: {current.noisePct}%</span>
              <span>Signal clarity: {100 - current.noisePct}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500 rounded-full"
                style={{ width: `${100 - current.noisePct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   3. Architectural Comparison Matrix
   ──────────────────────────────────────────────────────────── */

const COMPARISON_DATA = [
  {
    model: 'VAEs',
    samplingSpeed: '⚡ Fast (1 step)',
    sampleQuality: '🔸 Moderate (Smooth/Blurry)',
    trainingStability: '🟢 High (Stable MLE)',
    diversity: '🟢 Excellent (Continuous Latent)',
  },
  {
    model: 'GANs',
    samplingSpeed: '⚡ Fast (1 step)',
    sampleQuality: '🟢 High (Sharp & Crisp)',
    trainingStability: '🔴 Fragile (Mode Collapse)',
    diversity: '🔸 Variable (Mode Drops)',
  },
  {
    model: 'Transformers',
    samplingSpeed: '🔸 Moderate (O(N) tokens)',
    sampleQuality: '🟢 Exceptional (Coherent)',
    trainingStability: '🟢 High (Standard Cross-Entropy)',
    diversity: '🟢 High (Temperature Controlled)',
  },
  {
    model: 'Diffusion',
    samplingSpeed: '🔴 Slow (20-100 iterative steps)',
    sampleQuality: '🟢 State-of-the-art Photorealism',
    trainingStability: '🟢 High (Score Matching)',
    diversity: '🟢 Outstanding (Full Coverage)',
  },
];

export function GenerativeModelComparisonVisual() {
  return (
    <VisualFrame
      label="Generative Architecture Trade-off Matrix"
      caption="There is no single optimal model for every domain. Engineering choices balance sample speed, fidelity, diversity, and computational stability."
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-rule bg-paper-deep/50 text-[11px] font-bold text-ink-strong uppercase tracking-wider">
              <th className="py-2.5 px-3">Architecture</th>
              <th className="py-2.5 px-3">Inference Speed</th>
              <th className="py-2.5 px-3">Sample Quality</th>
              <th className="py-2.5 px-3">Training Stability</th>
              <th className="py-2.5 px-3">Mode Diversity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rule font-medium text-ink">
            {COMPARISON_DATA.map((row) => (
              <tr key={row.model} className="hover:bg-paper-deep/30 transition-colors">
                <td className="py-3 px-3 font-bold text-ink-strong">{row.model}</td>
                <td className="py-3 px-3">{row.samplingSpeed}</td>
                <td className="py-3 px-3">{row.sampleQuality}</td>
                <td className="py-3 px-3">{row.trainingStability}</td>
                <td className="py-3 px-3">{row.diversity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </VisualFrame>
  );
}

/* ────────────────────────────────────────────────────────────
   4. The Probability Engine in Generative AI (Intuitive Explorer)
   ──────────────────────────────────────────────────────────── */

interface ScenarioChoice {
  word: string;
  emoji: string;
  baseWeight: number; // raw likelihood score
  description: string;
  tag: 'Expected' | 'Creative' | 'Surprising';
}

interface Scenario {
  id: string;
  prompt: string;
  choices: ScenarioChoice[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'magician',
    prompt: 'The magician reached deep into the black top hat and pulled out a...',
    choices: [
      { word: 'rabbit', emoji: '🐰', baseWeight: 60, description: 'The classic expected magic trope', tag: 'Expected' },
      { word: 'white dove', emoji: '🕊️', baseWeight: 22, description: 'A common, graceful magic trick', tag: 'Expected' },
      { word: 'silk scarf', emoji: '🧣', baseWeight: 11, description: 'A colorful theatrical prop', tag: 'Creative' },
      { word: 'golden pocket watch', emoji: '⏱️', baseWeight: 5, description: 'An intriguing, story-rich prop', tag: 'Creative' },
      { word: 'baby dinosaur', emoji: '🦖', baseWeight: 2, description: 'Wildly unexpected and fantastical', tag: 'Surprising' },
    ],
  },
  {
    id: 'robot',
    prompt: 'The futuristic robot stared at the morning sunrise and felt...',
    choices: [
      { word: 'curiosity', emoji: '🤔', baseWeight: 50, description: 'Logical inquiry into natural beauty', tag: 'Expected' },
      { word: 'peace', emoji: '🧘', baseWeight: 25, description: 'Poetic, gentle synthetic emotion', tag: 'Expected' },
      { word: 'nostalgia', emoji: '💭', baseWeight: 14, description: 'Yearning for a past it never lived', tag: 'Creative' },
      { word: 'solar recharging', emoji: '🔋', baseWeight: 8, description: 'Literal pragmatic interpretation', tag: 'Creative' },
      { word: 'existential dread', emoji: '⚡', baseWeight: 3, description: 'Deep philosophical sci-fi twist', tag: 'Surprising' },
    ],
  },
  {
    id: 'cafe',
    prompt: 'On a rainy Tuesday afternoon, she sat at the corner cafe and ordered a...',
    choices: [
      { word: 'hot cappuccino', emoji: '☕', baseWeight: 55, description: 'Standard, highly frequent cafe drink', tag: 'Expected' },
      { word: 'chamomile tea', emoji: '🍵', baseWeight: 24, description: 'Cozy comfort choice for rainy days', tag: 'Expected' },
      { word: 'slice of lemon pie', emoji: '🍋', baseWeight: 12, description: 'Sweet companion to the rain', tag: 'Creative' },
      { word: 'glass of warm milk', emoji: '🥛', baseWeight: 6, description: 'Uncommon, nostalgic comfort order', tag: 'Creative' },
      { word: 'mystery cocktail', emoji: '🍸', baseWeight: 3, description: 'Unexpected daytime indulgence', tag: 'Surprising' },
    ],
  },
];

export function ProbabilityInGenAIVisual() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('magician');
  const [randomness, setRandomness] = useState<number>(50); // 0 (Strict) to 100 (Wild)
  const [sampledChoice, setSampledChoice] = useState<ScenarioChoice | null>(null);
  const [generationCount, setGenerationCount] = useState<number>(0);
  const [historyCounts, setHistoryCounts] = useState<Record<string, number>>({});
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'playground' | 'pipeline'>('playground');

  const currentScenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  // Calculate adjusted probabilities based on randomness slider (0 = 100% greedy, 100 = flattened)
  const calculateProbabilities = () => {
    const raw = currentScenario.choices;
    if (randomness === 0) {
      // 100% deterministic (greedy)
      return raw.map((c, i) => ({ ...c, probability: i === 0 ? 100 : 0 }));
    }

    // Temperature-like exponent scaling
    // randomness = 50 -> exponent ~ 1.0; randomness = 10 -> exponent ~ 3.5; randomness = 100 -> exponent ~ 0.3
    const exponent = Math.max(0.15, 3.5 - (randomness / 100) * 3.2);
    const scaledWeights = raw.map((c) => Math.pow(c.baseWeight, exponent));
    const totalWeight = scaledWeights.reduce((a, b) => a + b, 0);

    return raw.map((c, i) => ({
      ...c,
      probability: Math.round((scaledWeights[i] / totalWeight) * 100),
    }));
  };

  const currentChoices = calculateProbabilities();

  const handleGenerate = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    setTimeout(() => {
      // Stochastic selection based on probabilities
      const rand = Math.random() * 100;
      let cumulative = 0;
      let chosen = currentChoices[0];

      for (const item of currentChoices) {
        cumulative += item.probability;
        if (rand <= cumulative) {
          chosen = item;
          break;
        }
      }

      setSampledChoice(chosen);
      setGenerationCount((c) => c + 1);
      setHistoryCounts((prev) => ({
        ...prev,
        [chosen.word]: (prev[chosen.word] || 0) + 1,
      }));
      setIsSpinning(false);
    }, 250);
  };

  const handleReset = () => {
    setSampledChoice(null);
    setGenerationCount(0);
    setHistoryCounts({});
  };

  return (
    <VisualFrame
      label="Interactive Simulation: How Probability Drives Gen AI"
      caption="Generative AI is not a search engine retrieving one fixed answer. It calculates a spectrum of likely options and uses probability to pick the next step — giving you variety and creativity."
    >
      <div className="space-y-5">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-rule pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('playground')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'playground'
                  ? 'bg-accent text-white shadow-xs'
                  : 'bg-paper-deep text-ink-muted hover:text-ink-strong border border-rule'
              }`}
            >
              🎲 The Possibility Playground
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'pipeline'
                  ? 'bg-accent text-white shadow-xs'
                  : 'bg-paper-deep text-ink-muted hover:text-ink-strong border border-rule'
              }`}
            >
              🔄 Where Probability Fits in AI
            </button>
          </div>

          <span className="text-[11px] font-semibold text-ink-faint hidden sm:inline">
            One prompt → Multiple possibilities
          </span>
        </div>

        {activeTab === 'playground' ? (
          <div className="space-y-4">
            {/* Scenario Picker */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                Select a Prompt Scenario:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SCENARIOS.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setSelectedScenarioId(sc.id);
                      handleReset();
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedScenarioId === sc.id
                        ? 'border-accent bg-accent-soft/40 ring-1 ring-accent text-ink-strong'
                        : 'border-rule bg-surface text-ink-muted hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold line-clamp-1">{sc.choices[0].emoji} {sc.id.toUpperCase()}</div>
                    <div className="text-[11px] text-ink-muted line-clamp-1 mt-0.5">&ldquo;{sc.prompt}&rdquo;</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Display Banner */}
            <div className="rounded-xl border border-rule bg-paper-deep/70 p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
                Current Input Prompt
              </span>
              <p className="text-sm sm:text-base font-semibold text-ink-strong mt-1 leading-relaxed">
                &ldquo;{currentScenario.prompt}{' '}
                <span className="inline-block px-2 py-0.5 rounded bg-accent-soft text-accent font-bold border border-accent/25 animate-pulse">
                  {sampledChoice ? `${sampledChoice.emoji} ${sampledChoice.word}` : '[ What comes next? ]'}
                </span>
                &rdquo;
              </p>
            </div>

            {/* The Creativity Dial */}
            <div className="rounded-xl border border-rule bg-surface p-4 space-y-2.5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h4 className="text-xs font-bold text-ink-strong flex items-center gap-1.5">
                    <span>🎛️ The AI Creativity Dial</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-paper-deep border border-rule">
                      {randomness === 0 ? '0% (Strict / Robotic)' : randomness < 40 ? `${randomness}% (Predictable)` : randomness <= 70 ? `${randomness}% (Balanced & Creative)` : `${randomness}% (Wild & Unpredictable)`}
                    </span>
                  </h4>
                  <p className="text-[11px] text-ink-muted mt-0.5">
                    {randomness === 0
                      ? 'The AI is forced to pick only the #1 most common choice every single time.'
                      : randomness <= 50
                      ? 'The AI stays mostly grounded and coherent, but allows natural variation.'
                      : 'The AI spreads probability to rare and surprising ideas, boosting imagination.'}
                  </p>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={randomness}
                onChange={(e) => setRandomness(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-paper-deep rounded-lg"
              />

              <div className="flex justify-between text-[10px] font-semibold text-ink-faint">
                <span>🔒 0% (Always same word)</span>
                <span>⚖️ 50% (Natural balance)</span>
                <span>✨ 100% (High variety)</span>
              </div>
            </div>

            {/* Probability Bars List */}
            <div className="rounded-xl border border-rule bg-surface p-4 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-ink-strong border-b border-rule-soft pb-2">
                <span>AI&apos;s Next Word Candidates</span>
                <span>Probability of Being Chosen</span>
              </div>

              <div className="space-y-2">
                {currentChoices.map((c) => {
                  const isSelected = sampledChoice?.word === c.word;
                  const rollCount = historyCounts[c.word] || 0;

                  return (
                    <div
                      key={c.word}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-accent bg-accent-soft/40 shadow-xs ring-2 ring-accent/20 scale-[1.01]'
                          : 'border-rule bg-paper-deep/50 hover:bg-paper-deep'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{c.emoji}</span>
                          <span className="font-bold text-ink-strong text-sm">
                            {c.word}
                          </span>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                            c.tag === 'Expected'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : c.tag === 'Creative'
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {c.tag}
                          </span>
                          <span className="text-[10px] text-ink-muted hidden md:inline">
                            — {c.description}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {rollCount > 0 && (
                            <span className="text-[10px] font-mono font-bold text-accent bg-accent-soft px-1.5 py-0.5 rounded">
                              Picked {rollCount}x
                            </span>
                          )}
                          <span className="font-mono font-bold text-ink-strong text-xs w-10 text-right">
                            {c.probability}%
                          </span>
                        </div>
                      </div>

                      {/* Bar visual */}
                      <div className="h-2 rounded-full bg-rule overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            c.tag === 'Expected'
                              ? 'bg-accent'
                              : c.tag === 'Creative'
                              ? 'bg-indigo-500'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${c.probability}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Trigger */}
              <div className="pt-3 border-t border-rule-soft flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleGenerate}
                    disabled={isSpinning}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-accent text-white font-bold text-xs shadow-md shadow-accent/25 hover:bg-accent-deep transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    <span>🎲 Roll the Dice & Generate</span>
                  </button>
                  {generationCount > 0 && (
                    <button
                      onClick={handleReset}
                      className="px-3 py-2.5 rounded-xl border border-rule text-xs font-semibold text-ink-muted hover:text-ink-strong hover:bg-paper-deep transition-colors cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div className="text-xs text-ink-muted text-center sm:text-right">
                  {generationCount === 0 ? (
                    <span>Click <strong>Generate</strong> multiple times to see probability in action!</span>
                  ) : (
                    <span>
                      Generated <strong>{generationCount}</strong> times across this prompt.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Pipeline Visual Tab */
          <div className="space-y-4">
            <div className="rounded-xl border border-rule bg-paper-deep/60 p-4 space-y-2">
              <h4 className="text-xs font-bold text-ink-strong uppercase tracking-wider">
                The 4-Step Generative AI Pipeline
              </h4>
              <p className="text-xs text-ink-muted">
                Here is exactly where probability fits when you send a prompt to any generative AI:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Step 1 */}
              <div className="rounded-xl border border-rule bg-surface p-4 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-ink-faint">STEP 01</span>
                    <span className="text-base">📝</span>
                  </div>
                  <h5 className="text-xs font-bold text-ink-strong mt-1">User Prompt</h5>
                  <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                    You give the AI a beginning (text, image sketch, or audio snippet).
                  </p>
                </div>
                <div className="text-[10px] font-semibold text-ink-faint bg-paper-deep p-2 rounded-lg border border-rule">
                  Input: &ldquo;The magician pulled out a...&rdquo;
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-xl border border-rule bg-surface p-4 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-ink-faint">STEP 02</span>
                    <span className="text-base">🧠</span>
                  </div>
                  <h5 className="text-xs font-bold text-ink-strong mt-1">Neural Brain</h5>
                  <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                    The neural network scans all context and scores every known word in its vocabulary.
                  </p>
                </div>
                <div className="text-[10px] font-semibold text-ink-faint bg-paper-deep p-2 rounded-lg border border-rule">
                  Scores 50,000+ possible next pieces
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-xl border-2 border-accent bg-accent-soft/30 p-4 space-y-2 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-accent">STEP 03 (CORE)</span>
                    <span className="text-base">📊</span>
                  </div>
                  <h5 className="text-xs font-bold text-ink-strong mt-1">The Probability Layer</h5>
                  <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                    Turns raw scores into a percentage chance for each choice. Shaped by your creativity dial.
                  </p>
                </div>
                <div className="text-[10px] font-semibold text-accent-deep bg-surface p-2 rounded-lg border border-accent/25">
                  Rabbit: 60% | Dove: 22% | Dino: 2%
                </div>
              </div>

              {/* Step 4 */}
              <div className="rounded-xl border border-rule bg-surface p-4 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-ink-faint">STEP 04</span>
                    <span className="text-base">🎲</span>
                  </div>
                  <h5 className="text-xs font-bold text-ink-strong mt-1">The Sampling Act</h5>
                  <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                    The model rolls a weighted die to select the winner and appends it to your text!
                  </p>
                </div>
                <div className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                  Output chosen: &ldquo;rabbit&rdquo; (Next step repeats)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </VisualFrame>
  );
}

export const GENERATIVE_MODELS_VISUALS = {
  'core-genai-taxonomy': CoreGenAITaxonomyVisual,
  'diffusion-process': DiffusionProcessVisual,
  'genai-tradeoff-matrix': GenerativeModelComparisonVisual,
  'probability-in-genai': ProbabilityInGenAIVisual,
};
