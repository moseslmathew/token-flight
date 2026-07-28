export interface AINewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Model Releases' | 'Research & Architecture' | 'Open Source' | 'Hardware & Compute' | 'Industry & Policy';
  readTime?: string;
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
    slug: 'moonshot-kimi-k3-2-8t-open-weights-global-launch',
    title: 'Moonshot AI Drops Kimi K3: 2.8T Parameter Open-Weights Titan Reclaims #1 Open Source Benchmark Rank',
    excerpt: 'Moonshot AI releases full open weights for Kimi K3, a 2.8T MoE giant with 104B active parameters per token, 1M context window, and Kimi Delta Attention for 6x faster long-context inference.',
    category: 'Open Source',
    publishedAt: 'July 28, 2026',
    source: 'Moonshot AI',
    sourceUrl: 'https://www.moonshot.cn',
    featured: true,
    content: {
      whatChanged: 'Moonshot AI officially published full open weights for Kimi K3 on July 28, 2026. The 2.8-Trillion parameter Mixture-of-Experts (MoE) architecture activates 104B parameters per token and features a 1-million-token context window with Kimi Delta Attention (KDA).',
      whyItMatters: 'Kimi K3 becomes the largest open-weights model in history, outperforming closed proprietary systems on LMSYS Design Arena and code generation benchmarks while offering sub-100ms TTFT latency.',
      futureImpact: 'Significantly closes the performance gap between US and Chinese frontier models, setting a new open-weights baseline for multi-step agentic execution and enterprise code generation.',
      technicalHighlights: [
        '2.8 Trillion total parameters (104B active per token via MoE)',
        '1 Million token context window with 100% Needle-In-A-Haystack retrieval',
        'Kimi Delta Attention (KDA) reduces long-context inference cost by up to 6x',
        '#1 position on LMSYS Design Arena & Frontend Coding benchmarks',
      ],
    },
  },
  {
    id: 'news-2',
    slug: 'nvidia-250b-backstop-openai-ohio-gigawatt-cluster',
    title: 'NVIDIA Negotiates $250B Financial Backstop for OpenAI\'s 10-Gigawatt Ohio Data Center Cluster',
    excerpt: 'NVIDIA is in advanced talks to provide a landmark $250 billion financial backstop to help OpenAI lease a massive 10-gigawatt AI supercomputing data center facility in Ohio.',
    category: 'Hardware & Compute',
    publishedAt: 'July 28, 2026',
    source: 'NVIDIA & OpenAI',
    sourceUrl: 'https://nvidianews.nvidia.com',
    featured: false,
    content: {
      whatChanged: 'Reports confirmed NVIDIA is negotiating a historic $250 billion financial guarantee to support OpenAI in securing lease financing for a 10-gigawatt supercomputing data center in Ohio. The cluster will host over 1.5 million Blackwell Ultra GPUs.',
      whyItMatters: 'Illustrates the shift toward hyperscale AI infrastructure deployments that exceed the traditional balance sheets of individual software labs, requiring hardware vendors to co-sign massive capital commitments.',
      futureImpact: 'Secures long-term compute dominance for next-generation reasoning architectures (GPT-6 series) and accelerates the expansion of multi-gigawatt sovereign AI facilities worldwide.',
      technicalHighlights: [
        '$250 Billion financial backstop from NVIDIA for data center leasing',
        '10-Gigawatt power capacity target for Ohio supercomputing cluster',
        'Designed to house over 1.5 million Blackwell Ultra GPU compute nodes',
        'Direct liquid cooling and optical interconnect scaling across clusters',
      ],
    },
  },
  {
    id: 'news-3',
    slug: 'anthropic-claude-opus-5-effort-dial',
    title: 'Claude Opus 5 Effort Dial Shakes Up Inference Economics with Low/Medium/High Reasoning Tiers',
    excerpt: 'Anthropic\'s Claude Opus 5 introduces a request-level effort dial, enabling developers to scale test-time compute dynamically at 50% lower cost than Fable 5.',
    category: 'Model Releases',
    publishedAt: 'July 28, 2026',
    source: 'Anthropic',
    sourceUrl: 'https://www.anthropic.com/news',
    featured: false,
    content: {
      whatChanged: 'Anthropic expanded rollouts for Claude Opus 5, showcasing its configurable "effort dial" (low/medium/high) that lets developers control internal chain-of-thought depth per request. Priced at 50% less than Claude Fable 5, it delivers top-tier agentic coding performance.',
      whyItMatters: 'Introduces variable compute allocation per API request rather than static per-token pricing, allowing engineering teams to route simple lookups cheaply while dedicating maximum reasoning to hard debugging tasks.',
      futureImpact: 'Establishes test-time compute allocation as a standard API primitive across commercial LLM providers, optimizing enterprise inference budgets at scale.',
      technicalHighlights: [
        'Configurable effort dial: Low, Medium, High test-time reasoning',
        '50% lower cost than flagship Claude Fable 5 with near-frontier capability',
        'Frontier performance on SWE-bench and autonomous computer-use tasks',
        '1M token context window with native multi-turn agent planning',
      ],
    },
  },
  {
    id: 'news-4',
    slug: 'google-deepmind-gemini-3-6-flash-agentic-efficiency',
    title: 'Google DeepMind Ships Gemini 3.6 Flash & 3.5 Flash-Lite for High-Throughput Agentic Loops',
    excerpt: 'Google DeepMind releases Gemini 3.6 Flash and 3.5 Flash-Lite, cutting token usage by 40% and offering sub-100ms first-token latency for automated tool-calling.',
    category: 'Model Releases',
    publishedAt: 'July 28, 2026',
    source: 'Google DeepMind',
    sourceUrl: 'https://deepmind.google/news',
    featured: false,
    content: {
      whatChanged: 'Google DeepMind launched Gemini 3.6 Flash alongside 3.5 Flash-Lite, targeting high-frequency autonomous agent workflows. Flash 3.6 reduces token usage by 40% while maintaining competitive benchmark accuracy across complex tool-use tasks.',
      whyItMatters: 'As agentic systems make dozens of sequential tool calls per task, token efficiency directly controls API operating costs. Gemini 3.6 Flash makes high-frequency autonomous loops economically viable.',
      futureImpact: 'Establishes a new efficiency benchmark for cloud AI agents, competing directly with DeepSeek V4 Flash in high-throughput enterprise developer pipelines.',
      technicalHighlights: [
        '40% reduction in token usage compared to previous Flash generation',
        'Sub-100ms TTFT (Time-To-First-Token) for real-time agent execution',
        'Flash-Lite variant optimized for edge and mobile application layers',
        'State-of-the-art accuracy on function calling and structured data extraction',
      ],
    },
  },
  {
    id: 'news-5',
    slug: 'deepseek-v4-api-migration-finalized',
    title: 'DeepSeek V4 API Migration Finalized: Legacy Endpoints Officially Decommissioned',
    excerpt: 'DeepSeek completes API consolidation to deepseek-v4-flash and deepseek-v4-pro, establishing versioned enterprise endpoint standards for global developers.',
    category: 'Industry & Policy',
    publishedAt: 'July 28, 2026',
    source: 'DeepSeek',
    sourceUrl: 'https://api-docs.deepseek.com',
    featured: false,
    content: {
      whatChanged: 'DeepSeek completed the retirement of legacy endpoints `deepseek-chat` and `deepseek-reasoner`. Developers must now route requests through `deepseek-v4-flash` (for fast reasoning with thinking mode) and `deepseek-v4-pro` (for deep instruction execution).',
      whyItMatters: 'Consolidates DeepSeek\'s developer infrastructure around its V4 architecture, requiring development teams to audit their endpoint routing to balance speed and inference cost.',
      futureImpact: 'Accelerates the transition toward standardized, versioned API architectures across open-weight model providers globally.',
      technicalHighlights: [
        'Legacy `deepseek-chat` and `deepseek-reasoner` endpoints retired',
        '`deepseek-v4-flash` recommended for fast reasoning and general chat',
        '`deepseek-v4-pro` designated for heavy multi-step instruction tasks',
        'Native thinking mode toggle for configurable test-time compute',
      ],
    },
  },
  {
    id: 'news-6',
    slug: 'white-house-30-day-ai-safety-review-framework',
    title: 'White House Enforces 30-Day Mandatory Safety Review Framework for Frontier AI Deployments',
    excerpt: 'The White House publishes mandatory 30-day pre-release review guidelines requiring third-party red-teaming and cyber-risk reports from top frontier AI labs.',
    category: 'Industry & Policy',
    publishedAt: 'July 28, 2026',
    source: 'The White House',
    sourceUrl: 'https://www.whitehouse.gov/ai',
    featured: false,
    content: {
      whatChanged: 'The White House finalized a binding 30-day pre-release review policy requiring major frontier labs (OpenAI, Anthropic, Google DeepMind, Meta, DeepSeek) to submit red-teaming and safety evaluation reports prior to commercial deployment.',
      whyItMatters: 'Establishes the first federal pre-deployment oversight process for models built with frontier-level compute budgets, creating a formal regulatory window before commercial launches.',
      futureImpact: 'Creates a global regulatory template for AI safety governance, influencing European Union AI Act enforcement and international evaluation standards.',
      technicalHighlights: [
        'Mandatory 30-day pre-deployment evaluation window for frontier labs',
        'Applies to models exceeding federal compute training thresholds',
        'Requires third-party red-teaming for CBRN and autonomous cyber-risk',
        'Standardizes pre-release transparency reporting across commercial vendors',
      ],
    },
  },
];
