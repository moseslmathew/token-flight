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
    slug: 'openai-launches-gpt-5-6-sol-terra-luna',
    title: 'OpenAI Launches GPT-5.6 Family (Sol, Terra, Luna) with Autonomous Tool Execution',
    excerpt: 'OpenAI unveils GPT-5.6 led by the flagship Sol model alongside Terra and Luna tiers, featuring native multi-step reasoning, continuous test-time compute scaling, and deep IDE integrations.',
    category: 'Model Releases',
    readTime: '5 min read',
    publishedAt: 'July 25, 2026',
    source: 'OpenAI Research',
    sourceUrl: 'https://openai.com/news',
    featured: true,
    content: {
      whatChanged: 'OpenAI officially released the GPT-5.6 model family featuring three tiered architectures: Sol (flagship reasoning workhorse), Terra (general professional tasks), and Luna (low-latency cost-optimized API tier). The Sol variant introduces native continuous test-time compute scaling and autonomous multi-turn tool execution.',
      whyItMatters: 'GPT-5.6 Sol shifts the paradigm from simple chat interfaces to long-horizon agentic workflows, setting new benchmarks on SWE-bench Verified and complex mathematical logic while reducing API latency via speculative execution.',
      futureImpact: 'Empowers developers and enterprise applications to build self-correcting agent loops, multi-agent coding pipelines, and real-time voice and vision workflows with higher reliability.',
      technicalHighlights: [
        'Flagship Sol, mid-tier Terra, and fast Luna architectures',
        'Native continuous test-time compute scaling for hard reasoning tasks',
        'Autonomous multi-turn code debugging and sandbox execution',
        'Sub-100ms response latencies for Luna speculative decoding',
      ],
    },
  },
  {
    id: 'news-2',
    slug: 'future-of-life-institute-2026-ai-safety-index',
    title: 'Future of Life Institute Releases Summer 2026 AI Safety Index Evaluating Frontier Labs',
    excerpt: 'FLI evaluates 9 leading AI laboratories on safety commitments, governance, and redline pause policies, awarding Anthropic the top grade (C+) amid industry-wide shifts.',
    category: 'Industry & Policy',
    readTime: '4 min read',
    publishedAt: 'July 25, 2026',
    source: 'Future of Life Institute',
    sourceUrl: 'https://futureoflife.org',
    featured: false,
    content: {
      whatChanged: 'The Future of Life Institute published its comprehensive Summer 2026 AI Safety Index evaluating 9 major labs including OpenAI, Anthropic, Google DeepMind, Meta, xAI, and DeepSeek. Anthropic earned the highest score (C+), followed by OpenAI and Google (C).',
      whyItMatters: 'The report highlights how frontier developers are adjusting their commitment frameworks, transitioning from absolute safety redlines toward competitor-contingent safety policies and third-party red-teaming requirements.',
      futureImpact: 'Accelerates global regulatory discussions around mandatory pre-release sandbox evaluations, standardized cyber-risk audits, and international oversight frameworks.',
      technicalHighlights: [
        'Evaluated 9 frontier labs across safety commitments and cyber-resilience',
        'Anthropic received highest safety score (C+), OpenAI and DeepMind (C)',
        'Identified industry transition toward competitor-contingent pause conditions',
      ],
    },
  },
  {
    id: 'news-3',
    slug: 'xai-releases-grok-4-5-1-5t-v9',
    title: 'xAI Releases Grok 4.5 Built on 1.5 Trillion Parameter V9 Foundation Architecture',
    excerpt: 'xAI debuts Grok 4.5 featuring 1.5T parameter V9 foundation model weights, enhanced math reasoning, and native integration into developer toolchains.',
    category: 'Model Releases',
    readTime: '4 min read',
    publishedAt: 'July 24, 2026',
    source: 'xAI Tech Blog',
    sourceUrl: 'https://x.ai/blog',
    featured: false,
    content: {
      whatChanged: 'xAI launched Grok 4.5, trained on their 1.5-trillion-parameter V9 foundation architecture. The release highlights massive parameter efficiency, ultra-fast token output rates, and specialized code synthesis pipelines.',
      whyItMatters: 'Grok 4.5 targets high-throughput agent execution, offering Opus-grade code completion and math reasoning at significantly lower inference token costs across developer environments.',
      futureImpact: 'Intensifies market competition in coding assistant integrations and multi-modal tool use across real-time streaming platforms.',
      technicalHighlights: [
        '1.5 Trillion parameter V9 foundation architecture',
        'Native integration into developer IDEs and coding agents',
        'Optimized token output speeds for multi-turn code synthesis',
      ],
    },
  },
  {
    id: 'news-4',
    slug: 'minimax-m3-open-weight-sparse-attention',
    title: 'MiniMax Launches M3: 1M Context Open-Weight Model with Sparse Attention',
    excerpt: 'Shanghai-based MiniMax releases M3, a frontier open-weights multimodal model featuring a 1-Million-token context window powered by MiniMax Sparse Attention (MSA).',
    category: 'Open Source',
    readTime: '4 min read',
    publishedAt: 'July 24, 2026',
    source: 'MiniMax AI Research',
    sourceUrl: 'https://github.com/MiniMax-AI',
    featured: false,
    content: {
      whatChanged: 'MiniMax introduced M3, an open-weight multimodal model supporting text, image, and video reasoning over a 1M token context window using MiniMax Sparse Attention (MSA).',
      whyItMatters: 'MSA compresses attention calculation complexity, enabling long-context inference on standard enterprise GPU nodes without memory bandwidth saturation.',
      futureImpact: 'Expands the frontier open-weight ecosystem for localized enterprise deployment, full-codebase analysis, and long-video understanding.',
      technicalHighlights: [
        '1 Million token context window with 99.7% retrieval accuracy',
        'MiniMax Sparse Attention (MSA) architecture for reduced memory footprint',
        'Native multimodal reasoning spanning text, code, images, and video',
      ],
    },
  },
  {
    id: 'news-5',
    slug: 'anthropic-claude-fable-5-voice-mode',
    title: 'Anthropic Unveils Claude Fable 5 & Next-Gen Multi-Tool Connectors',
    excerpt: 'Anthropic updates the Claude ecosystem with Fable 5 model capabilities, enhanced voice mode across Opus and Sonnet, and native workspace integration connectors.',
    category: 'Research & Architecture',
    readTime: '4 min read',
    publishedAt: 'July 23, 2026',
    source: 'Anthropic News',
    sourceUrl: 'https://www.anthropic.com/news',
    featured: false,
    content: {
      whatChanged: 'Anthropic expanded its model portfolio with Claude Fable 5 alongside low-latency Claude Voice Mode support across Opus, Sonnet, and Haiku models, featuring direct tool execution in workspace apps.',
      whyItMatters: 'Provides real-time conversational voice interaction coupled with structured workspace connectors (Slack, Gmail, GitHub), allowing agents to perform tasks conversationally.',
      futureImpact: 'Establishes a foundation for natural voice-driven enterprise workflows where AI assistants execute multi-step operations in real-time.',
      technicalHighlights: [
        'Claude Fable 5 architecture with refined long-horizon planning',
        'Low-latency full-duplex Claude Voice Mode for Opus and Sonnet',
        'Direct integration connectors for enterprise workspace platforms',
      ],
    },
  },
  {
    id: 'news-6',
    slug: 'us-doe-genesis-mission-ai-supercomputing',
    title: 'US Dept of Energy & AI Labs Launch "Genesis Mission" for Scientific Computing',
    excerpt: 'The US Department of Energy partners with leading AI laboratories to dedicate supercomputing infrastructure and frontier AI models to accelerate scientific discovery.',
    category: 'Hardware & Compute',
    readTime: '4 min read',
    publishedAt: 'July 23, 2026',
    source: 'US Department of Energy',
    sourceUrl: 'https://www.energy.gov',
    featured: false,
    content: {
      whatChanged: 'The US Department of Energy launched the Genesis Mission initiative, connecting exascale supercomputing infrastructure at national laboratories with frontier AI model APIs to accelerate scientific discovery in materials science, nuclear fusion, and genomics.',
      whyItMatters: 'Combines government-class supercomputers with private-sector frontier AI reasoning models to solve complex physics simulations, automated molecular design, and climate modeling.',
      futureImpact: 'Paves the way for autonomous AI-driven scientific laboratories capable of proposing hypotheses, designing experiments, and analyzing supercomputing results.',
      technicalHighlights: [
        'Joint exascale supercomputing and frontier AI model access',
        'Targeted applications in materials science, fusion energy, and genomics',
        'Secure high-throughput API endpoints for national lab researchers',
      ],
    },
  },
];
