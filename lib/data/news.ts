export interface AINewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Model Releases' | 'Research & Architecture' | 'Open Source' | 'Hardware & Compute' | 'Industry & Policy';
  readTime: string;
  publishedAt: string;
  source: string;
  sourceUrl: string;
  featured?: boolean;
  content: {
    whatChanged: string;
    whyItMatters: string;
    futureImpact: string;
    technicalHighlights?: string[];
  };
}

export const AI_NEWS_ITEMS: AINewsItem[] = [
  {
    id: 'news-1',
    slug: 'moonshot-kimi-k3-design-arena-leaderboard-top',
    title: 'Kimi K3 Open Weights Takes #1 on Design Arena & Frontend Coding Benchmark Leaderboards',
    excerpt: 'Following its 2.8T open-weights drop, Moonshot AI\'s Kimi K3 surges to #1 in UI/UX code generation Elo and Frontend Design Arena, outperforming closed frontier models.',
    category: 'Open Source',
    readTime: '5 min read',
    publishedAt: 'July 27, 2026',
    source: 'Moonshot AI & LMSYS',
    sourceUrl: 'https://www.moonshot.cn',
    featured: true,
    content: {
      whatChanged: 'Following the release of its 2.8 Trillion parameter open weights on July 27, 2026, Moonshot AI\'s Kimi K3 captured the #1 spot on the LMSYS Design Arena and Frontend Coding ELO leaderboards. Kimi Delta Attention (KDA) enables lightning-fast component generation with 2M token context retrieval.',
      whyItMatters: 'Kimi K3 becomes the first open-weights model to claim top rank in frontend engineering and visual code synthesis over proprietary frontier models like Claude Fable 5 and GPT-5.6 Sol.',
      futureImpact: 'Accelerates adoption of open-weight models for automated web application development and AI-assisted design system engineering across global tech stacks.',
      technicalHighlights: [
        '#1 position on Design Arena ELO for React & HTML/CSS synthesis',
        '2.8 Trillion total parameters (160B active per token via MoE)',
        'Kimi Delta Attention (KDA) for sub-100ms first-token generation',
        '2 Million token context window with 100% Needle-In-A-Haystack retrieval',
      ],
    },
  },
  {
    id: 'news-2',
    slug: 'anthropic-claude-opus-5-effort-dial-pricing',
    title: 'Claude Opus 5 Launches as "Value King" with Configurable Effort Dial at Half Fable 5 Price',
    excerpt: 'Anthropic positions Claude Opus 5 as a near-frontier workhorse with a novel low/medium/high effort dial, delivering significant gains in coding and computer-use at 50% lower cost than Fable 5.',
    category: 'Model Releases',
    readTime: '5 min read',
    publishedAt: 'July 27, 2026',
    source: 'Anthropic',
    sourceUrl: 'https://www.anthropic.com/news',
    featured: false,
    content: {
      whatChanged: 'Anthropic launched Claude Opus 5 on July 24 with a novel configurable "effort dial" (low/medium/high) that lets developers control reasoning depth per request. Priced at half the cost of Claude Fable 5, Opus 5 delivers near-frontier performance in coding, multi-turn agent planning, and autonomous computer-use.',
      whyItMatters: 'The effort dial introduces granular cost-performance control absent in competing models. Developers can route trivial queries to "low" effort while reserving "high" for complex multi-step reasoning, optimizing inference budgets dynamically without model switching.',
      futureImpact: 'Establishes a new pricing paradigm for frontier AI: variable compute allocation per request rather than fixed per-token costs. Enterprise adoption of tiered reasoning models could reshape cloud AI billing across the industry.',
      technicalHighlights: [
        'Configurable effort dial: low, medium, and high reasoning depth',
        '50% lower cost than Claude Fable 5 with near-frontier performance',
        'Significant benchmark gains on SWE-bench coding and computer-use tasks',
        '1M token context window with advanced multi-turn agent planning',
      ],
    },
  },
  {
    id: 'news-3',
    slug: 'deepseek-v4-api-migration-deadline',
    title: 'DeepSeek V4 API Migration Complete: Legacy Model Names Officially Retired',
    excerpt: 'DeepSeek retired legacy API model names deepseek-chat and deepseek-reasoner on July 24, requiring developers to migrate to deepseek-v4-flash and deepseek-v4-pro endpoints.',
    category: 'Industry & Policy',
    readTime: '4 min read',
    publishedAt: 'July 27, 2026',
    source: 'DeepSeek',
    sourceUrl: 'https://api-docs.deepseek.com',
    featured: false,
    content: {
      whatChanged: 'DeepSeek officially retired the legacy API model identifiers `deepseek-chat` and `deepseek-reasoner` on July 24, 2026 at 15:59 UTC. Developers must now use `deepseek-v4-flash` for general chat and reasoning (with thinking mode), and `deepseek-v4-pro` for complex instruction-following workloads.',
      whyItMatters: 'The migration consolidates DeepSeek\'s API surface around its V4 architecture, but introduces pricing asymmetry: using deepseek-v4-pro as a drop-in replacement for the old reasoner significantly increases costs. Teams must audit their inference routing to avoid budget overruns.',
      futureImpact: 'Signals maturation of Chinese open-weight model ecosystems toward versioned, enterprise-grade API standards. Developers building on DeepSeek should adopt v4-flash with thinking enabled as the cost-optimal reasoning endpoint.',
      technicalHighlights: [
        'Legacy `deepseek-chat` and `deepseek-reasoner` retired July 24',
        '`deepseek-v4-flash` recommended for both chat and reasoning workloads',
        '`deepseek-v4-pro` reserved for heavy instruction-following tasks',
        'Pricing asymmetry requires careful routing to manage costs',
      ],
    },
  },
  {
    id: 'news-4',
    slug: 'google-deepmind-gemini-3-6-flash-efficiency',
    title: 'Google DeepMind Ships Gemini 3.6 Flash & 3.5 Flash-Lite for Ultra-Efficient Agentic Workflows',
    excerpt: 'Google DeepMind releases Gemini 3.6 Flash and 3.5 Flash-Lite, targeting extreme efficiency with lower latency and reduced token usage for large-scale agentic systems.',
    category: 'Model Releases',
    readTime: '4 min read',
    publishedAt: 'July 26, 2026',
    source: 'Google DeepMind',
    sourceUrl: 'https://deepmind.google/news',
    featured: false,
    content: {
      whatChanged: 'Google DeepMind announced Gemini 3.6 Flash alongside 3.5 Flash-Lite, focusing on extreme inference efficiency. Flash 3.6 reduces token usage by up to 40% while maintaining competitive accuracy across reasoning benchmarks. Flash-Lite targets resource-constrained edge deployments.',
      whyItMatters: 'As agentic workflows scale to hundreds of sequential tool calls, token efficiency directly impacts operational costs. Gemini 3.6 Flash\'s reduced token footprint makes it viable for high-frequency autonomous loops that were previously cost-prohibitive.',
      futureImpact: 'Positions Google\'s Flash tier as the default backbone for high-throughput agentic infrastructure, competing directly with DeepSeek V4 Flash on the cost-efficiency frontier.',
      technicalHighlights: [
        'Up to 40% reduction in token usage vs. previous Flash generation',
        'Sub-100ms TTFT latency for agentic tool-calling workflows',
        'Flash-Lite variant optimized for edge and mobile deployments',
        'Competitive reasoning accuracy despite dramatically reduced compute',
      ],
    },
  },
  {
    id: 'news-5',
    slug: 'white-house-30-day-ai-review-framework',
    title: 'White House Finalizes 30-Day AI Review Framework for Frontier Labs Under Regulatory Oversight',
    excerpt: 'The White House announces a 30-day mandatory review framework requiring frontier AI labs to submit pre-release safety evaluations before commercial deployment.',
    category: 'Industry & Policy',
    readTime: '4 min read',
    publishedAt: 'July 26, 2026',
    source: 'The White House',
    sourceUrl: 'https://www.whitehouse.gov/ai',
    featured: false,
    content: {
      whatChanged: 'The White House is finalizing a 30-day AI review framework that requires major frontier labs (OpenAI, Anthropic, Google DeepMind, Meta, xAI, DeepSeek) to submit comprehensive pre-release safety evaluations before commercial model deployment.',
      whyItMatters: 'Introduces the first binding federal pre-release review requirement for frontier AI systems. Labs must now budget 30 days for government safety review, potentially slowing the release cadence of frontier models while increasing transparency.',
      futureImpact: 'Could establish a global precedent for mandatory pre-deployment AI safety review, influencing EU AI Act enforcement and accelerating international coordination on AI governance standards.',
      technicalHighlights: [
        '30-day mandatory pre-release safety review for frontier models',
        'Applies to labs with compute budgets exceeding defined thresholds',
        'Requires third-party red-teaming and cyber-risk evaluation reports',
        'Aligns with FLI 2026 Safety Index evaluation criteria',
      ],
    },
  },
  {
    id: 'news-6',
    slug: 'meta-muse-spark-1-1-first-paid-model',
    title: 'Meta Launches Muse Spark 1.1 via New Meta Model API — Its First Paid, Closed-Weight Model',
    excerpt: 'Meta breaks from its open-source tradition with Muse Spark 1.1, a proprietary multimodal reasoning model with a 1M token context window, available through its new paid Meta Model API.',
    category: 'Model Releases',
    readTime: '4 min read',
    publishedAt: 'July 26, 2026',
    source: 'Meta AI',
    sourceUrl: 'https://ai.meta.com',
    featured: false,
    content: {
      whatChanged: 'Meta released Muse Spark 1.1 on July 9, 2026 — its first closed-weight, paid model — accessible exclusively through the new Meta Model API. The multimodal reasoning model features a 1M token context window and is optimized for autonomous agent coordination and software development workflows.',
      whyItMatters: 'Marks a significant strategic shift for Meta, which built its AI reputation on open-weight releases like LLaMA. The introduction of a paid API tier signals Meta\'s intent to compete directly with OpenAI and Anthropic in the enterprise AI services market.',
      futureImpact: 'The dual open/closed strategy may become the industry norm: open-weight models for community adoption and brand building, closed premium models for revenue. This could fundamentally alter the open-source AI economics landscape.',
      technicalHighlights: [
        'First closed-weight paid model from Meta',
        '1 Million token context window with native multimodal reasoning',
        'Optimized for autonomous agent coordination and software development',
        'Distributed via new Meta Model API paid tier',
      ],
    },
  },
];
