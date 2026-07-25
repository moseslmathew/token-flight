'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Terminal, Zap } from 'lucide-react';

export default function InteractiveVisualizer() {
  const [activeTab, setActiveTab] = useState<'tokenizer' | 'neural' | 'agent'>('tokenizer');

  // 1. Tokenizer State
  const [sampleText, setSampleText] = useState('Artificial Intelligence and Large Language Models are reshaping software engineering.');
  const tokens = sampleText.split(/(\s+|[.,!?;:]+)/).filter(Boolean);

  // 2. Neural Net State
  const [inputNodes, setInputNodes] = useState(3);
  const [hiddenNodes, setHiddenNodes] = useState(4);
  const [activation, setActivation] = useState<'ReLU' | 'GELU' | 'Sigmoid'>('GELU');
  const [activePulse, setActivePulse] = useState(false);

  // 3. Agent Execution State
  const [agentStep, setAgentStep] = useState(0);

  const agentSteps = [
    {
      title: 'User Input / Goal Received',
      role: 'User',
      type: 'input',
      content: 'Goal: "What is the current stock price of NVIDIA and calculate 15% capital gain taxes on 100 shares?"',
      detail: 'The agent system receives the raw prompt and initializes context memory.',
    },
    {
      title: 'Thought & Planning Step',
      role: 'LLM Reasoner',
      type: 'thought',
      content: 'Thought: "I need to perform two steps: 1) Retrieve NVDA live price via StockAPI, 2) Calculate profit taxes using Python math."',
      detail: 'LLM generates explicit reasoning chain before invoking any tool.',
    },
    {
      title: 'Action: Tool Dispatch',
      role: 'Tool Execution',
      type: 'action',
      content: 'Call Tool: stock_api.fetch_price(symbol="NVDA")',
      detail: 'Model generates JSON tool payload matching registered schema.',
    },
    {
      title: 'Observation Received',
      role: 'System Observation',
      type: 'observation',
      content: 'Observation: {"symbol": "NVDA", "price": 135.50, "currency": "USD"}',
      detail: 'External environment executes tool and returns structured JSON observation.',
    },
    {
      title: 'Final Synthesis Answer',
      role: 'Agent Output',
      type: 'final',
      content: 'Final Answer: 100 shares at $135.50 = $13,550 total value. 15% tax on this position is $2,032.50.',
      detail: 'Agent synthesizes observation back to the user with full explanation.',
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 my-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
            Hands-On Interactive Learning
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Interactive AI Concept Sandbox</h2>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('tokenizer')}
            className={`px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'tokenizer'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Tokenizer
          </button>
          <button
            onClick={() => setActiveTab('neural')}
            className={`px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'neural'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Neural Net Layer
          </button>
          <button
            onClick={() => setActiveTab('agent')}
            className={`px-3.5 py-2 rounded-lg transition-all ${
              activeTab === 'agent'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Agent Simulator
          </button>
        </div>
      </div>

      {/* TAB 1: TOKENIZER SANDBOX */}
      {activeTab === 'tokenizer' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Type or Edit Sample Text:
            </label>
            <textarea
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Live Subword Token Representation ({tokens.length} tokens):
              </span>
              <span className="text-xs text-cyan-400 font-mono">~{(tokens.length * 1.3).toFixed(0)} Estimated LLM Tokens</span>
            </div>

            <div className="flex flex-wrap gap-2 p-4 bg-slate-950 border border-slate-800 rounded-xl min-h-[100px] items-center">
              {tokens.map((token, index) => {
                const colors = [
                  'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
                  'bg-purple-500/20 text-purple-300 border-purple-500/40',
                  'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
                  'bg-amber-500/20 text-amber-300 border-amber-500/40',
                  'bg-rose-500/20 text-rose-300 border-rose-500/40',
                ];
                const colorClass = colors[index % colors.length];
                const pseudoId = 1000 + (token.charCodeAt(0) * 17) % 8999;
                return (
                  <span
                    key={index}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-mono flex flex-col items-center group relative cursor-pointer ${colorClass}`}
                  >
                    <span>{token === ' ' ? '␣' : token}</span>
                    <span className="text-[9px] opacity-60 font-sans">ID: {pseudoId}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className="p-4 bg-cyan-950/40 border border-cyan-800/60 rounded-xl text-xs text-slate-300 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-cyan-300 block mb-1">Key Takeaway:</strong>
              LLMs do not read words or letters directly. Text is converted into integer token IDs using Byte-Pair Encoding (BPE). Each token is then looked up in an Embedding matrix to retrieve a high-dimensional vector.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NEURAL NET PLAYGROUND */}
      {activeTab === 'neural' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Input Layer Neurons ({inputNodes})</label>
              <input
                type="range"
                min="2"
                max="5"
                value={inputNodes}
                onChange={(e) => setInputNodes(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Hidden Layer Neurons ({hiddenNodes})</label>
              <input
                type="range"
                min="2"
                max="6"
                value={hiddenNodes}
                onChange={(e) => setHiddenNodes(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Activation Function</label>
              <select
                value={activation}
                onChange={(e) => setActivation(e.target.value as 'GELU' | 'ReLU' | 'Sigmoid')}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-xs text-white focus:outline-none"
              >
                <option value="GELU">GELU (Gaussian Error Linear Unit)</option>
                <option value="ReLU">ReLU (Rectified Linear Unit)</option>
                <option value="Sigmoid">Sigmoid Function</option>
              </select>
            </div>
          </div>

          {/* SVG Network Visualizer */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative flex flex-col items-center">
            <button
              onClick={() => {
                setActivePulse(true);
                setTimeout(() => setActivePulse(false), 1200);
              }}
              className="absolute top-4 right-4 px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              Simulate Forward Pass
            </button>

            <svg className="w-full h-64 max-w-xl" viewBox="0 0 400 200">
              {/* Connections Input -> Hidden */}
              {Array.from({ length: inputNodes }).map((_, i) => {
                const y1 = 40 + i * (120 / (inputNodes - 1 || 1));
                return Array.from({ length: hiddenNodes }).map((_, h) => {
                  const y2 = 30 + h * (140 / (hiddenNodes - 1 || 1));
                  return (
                    <line
                      key={`i${i}-h${h}`}
                      x1="80"
                      y1={y1}
                      x2="200"
                      y2={y2}
                      stroke={activePulse ? '#38bdf8' : '#334155'}
                      strokeWidth={activePulse ? '2' : '1'}
                      className="transition-all duration-500"
                    />
                  );
                });
              })}

              {/* Connections Hidden -> Output */}
              {Array.from({ length: hiddenNodes }).map((_, h) => {
                const y1 = 30 + h * (140 / (hiddenNodes - 1 || 1));
                return [75, 125].map((y2, o) => (
                  <line
                    key={`h${h}-o${o}`}
                    x1="200"
                    y1={y1}
                    x2="320"
                    y2={y2}
                    stroke={activePulse ? '#c084fc' : '#334155'}
                    strokeWidth={activePulse ? '2' : '1'}
                    className="transition-all duration-500"
                  />
                ));
              })}

              {/* Input Nodes */}
              {Array.from({ length: inputNodes }).map((_, i) => {
                const y = 40 + i * (120 / (inputNodes - 1 || 1));
                return (
                  <g key={`in-${i}`}>
                    <circle cx="80" cy={y} r="14" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <text x="80" y={y + 4} textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">x{i+1}</text>
                  </g>
                );
              })}

              {/* Hidden Nodes */}
              {Array.from({ length: hiddenNodes }).map((_, h) => {
                const y = 30 + h * (140 / (hiddenNodes - 1 || 1));
                return (
                  <g key={`hid-${h}`}>
                    <circle cx="200" cy={y} r="14" fill="#0f172a" stroke="#c084fc" strokeWidth="2" />
                    <text x="200" y={y + 4} textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="bold">h{h+1}</text>
                  </g>
                );
              })}

              {/* Output Nodes */}
              {[75, 125].map((y, o) => (
                <g key={`out-${o}`}>
                  <circle cx="320" cy={y} r="14" fill="#0f172a" stroke="#34d399" strokeWidth="2" />
                  <text x="320" y={y + 4} textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">y{o+1}</text>
                </g>
              ))}
            </svg>

            <div className="text-center text-xs text-slate-400 mt-2">
              Forward Pass Computation: <span className="text-cyan-400 font-mono">y = {activation}(W2 * {activation}(W1 * X + b1) + b2)</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AGENT SIMULATOR */}
      {activeTab === 'agent' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Step {agentStep + 1} of {agentSteps.length}: {agentSteps[agentStep].title}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={agentStep === 0}
                onClick={() => setAgentStep((s) => Math.max(0, s - 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-colors"
              >
                Previous Step
              </button>
              <button
                disabled={agentStep === agentSteps.length - 1}
                onClick={() => setAgentStep((s) => Math.min(agentSteps.length - 1, s + 1))}
                className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs disabled:opacity-40 hover:bg-cyan-400 transition-colors flex items-center gap-1"
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Stepper Bar */}
          <div className="grid grid-cols-5 gap-2">
            {agentSteps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setAgentStep(idx)}
                className={`h-2 rounded-full cursor-pointer transition-all ${
                  idx === agentStep
                    ? 'bg-cyan-400 shadow-sm shadow-cyan-400/50'
                    : idx < agentStep
                    ? 'bg-indigo-500'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>

          {/* Active Step Console Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 font-mono text-xs leading-relaxed space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                [{agentSteps[agentStep].role}]
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">{agentSteps[agentStep].type}</span>
            </div>

            <p className="text-slate-200 text-sm whitespace-pre-wrap">{agentSteps[agentStep].content}</p>

            <div className="pt-3 border-t border-slate-900 text-slate-400 font-sans text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{agentSteps[agentStep].detail}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
