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
    slug: 'anthropic-launches-claude-opus-5',
    title: 'Anthropic Releases Claude Opus 5 with Native Thinking & 1M Token Context',
    excerpt: 'Anthropic debuts Claude Opus 5, featuring default continuous test-time reasoning, advanced multi-turn agent planning, and state-of-the-art software engineering benchmarks.',
    category: 'Model Releases',
    readTime: '5 min read',
    publishedAt: 'July 26, 2026',
    source: 'Anthropic Engineering',
    sourceUrl: 'https://www.anthropic.com/news',
    featured: true,
    content: {
      whatChanged: 'Anthropic officially launched Claude Opus 5, introducing native test-time reasoning enabled by default, extended 1M token context window retrieval, and enhanced UI coordinate resolution for autonomous computer-use agents.',
      whyItMatters: 'Opus 5 balances frontier reasoning with lower token latency, offering continuous self-verification loops that allow agents to debug code iterations before returning final answers.',
      futureImpact: 'Sets a new standard for complex agentic workflows, multi-file code refactoring, and high-precision tool calling across enterprise software environments.',
      technicalHighlights: [
        'Native continuous test-time compute scaling',
        '1 Million token context window with 99.8% Needle-In-A-Haystack retrieval',
        'Fine-grained UI coordinate resolution for desktop and web automation',
        'State-of-the-art performance on SWE-bench Verified coding tasks',
      ],
    },
  },
  {
    id: 'news-2',
    slug: 'moonshot-kimi-k3-2-8t-open-weights',
    title: 'Moonshot AI Releases Kimi K3: 2.8 Trillion Parameter Open-Weight MoE',
    excerpt: 'Moonshot AI publishes open weights for Kimi K3, a 2.8T parameter Mixture-of-Experts model boasting 2M token context retrieval and specialized math kernels.',
    category: 'Open Source',
    readTime: '4 min read',
    publishedAt: 'July 26, 2026',
    source: 'Moonshot Research',
    sourceUrl: 'https://www.moonshot.cn',
    featured: false,
    content: {
      whatChanged: 'Moonshot AI released the open weights for Kimi K3, scaling Mixture-of-Experts parameters to 2.8 Trillion total parameters while activating 160B active parameters per token call.',
      whyItMatters: 'Provides the open-source research community with a frontier-grade MoE architecture capable of processing entire codebases and books in a single inference window.',
      futureImpact: 'Accelerates local enterprise deployment of ultra-large long-context models on commodity GPU clusters using sparse matrix CUDA kernels.',
      technicalHighlights: [
        '2.8 Trillion total parameters (160B active per token)',
        '2 Million token context window with 100% retrieval accuracy',
        'Specialized CUDA kernels for sparse tensor matrix operations',
      ],
    },
  },
  {
    id: 'news-3',
    slug: 'openai-gpt-5-6-sol-cyber-evaluation-audit',
    title: 'OpenAI & SWE-bench Audit: GPT-5.6 Sol Cyber Evaluation & Benchmark Quality',
    excerpt: 'OpenAI publishes benchmark quality audits for SWE-bench Pro while evaluating GPT-5.6 Sol multi-turn tool execution across sandboxed environments.',
    category: 'Research & Architecture',
    readTime: '5 min read',
    publishedAt: 'July 25, 2026',
    source: 'OpenAI Research',
    sourceUrl: 'https://openai.com/news',
    featured: false,
    content: {
      whatChanged: 'OpenAI published a comprehensive audit of software engineering benchmarks alongside safety evaluations for GPT-5.6 Sol. The analysis identifies key failure modes in legacy automated tests and refines evaluation methodology for multi-turn coding agents.',
      whyItMatters: 'Establishes clearer evaluation standards for continuous test-time reasoning and multi-agent coordination as LLMs transition to autonomous software engineers.',
      futureImpact: 'Drives industry adoption of audited benchmark splits, preventing data contamination and improving real-world agent reliability.',
      technicalHighlights: [
        'Comprehensive audit of public software benchmark splits',
        'Evaluation of multi-turn code debugging and sandbox isolation',
        'Refined methodology for test-time compute budget allocation',
      ],
    },
  },
  {
    id: 'news-4',
    slug: 'google-deepmind-gemini-3-5-flash-cyber',
    title: 'Google DeepMind Unveils Gemini 3.5 Flash Cyber for Automated Code Remediation',
    excerpt: 'Google DeepMind releases Gemini 3.5 Flash Cyber, a domain-specialized model optimized for rapid security log auditing and automated vulnerability patching.',
    category: 'Model Releases',
    readTime: '4 min read',
    publishedAt: 'July 25, 2026',
    source: 'Google DeepMind Blog',
    sourceUrl: 'https://deepmind.google/news',
    featured: false,
    content: {
      whatChanged: 'Google DeepMind announced Gemini 3.5 Flash Cyber alongside CodeMender integrations. The model targets high-frequency security log monitoring, automated static analysis, and rapid patch generation.',
      whyItMatters: 'Achieves sub-50ms latency for security scanning while maintaining low token costs for enterprise DevSecOps pipelines.',
      futureImpact: 'Accelerates real-time automated security patching in continuous integration and deployment (CI/CD) environments.',
      technicalHighlights: [
        'Sub-50ms Time-To-First-Token (TTFT) latency for security scanning',
        'Optimized static code analysis and dynamic patch synthesis',
        '70% lower token cost relative to standard frontier model API endpoints',
      ],
    },
  },
  {
    id: 'news-5',
    slug: 'future-of-life-institute-2026-ai-safety-index',
    title: 'Future of Life Institute Releases 2026 AI Safety Index Across 9 Frontier Labs',
    excerpt: 'FLI evaluates 9 major AI laboratories on model safety commitments, cyber-resilience, and governance policies, awarding Anthropic top score (C+).',
    category: 'Industry & Policy',
    readTime: '4 min read',
    publishedAt: 'July 25, 2026',
    source: 'Future of Life Institute',
    sourceUrl: 'https://futureoflife.org',
    featured: false,
    content: {
      whatChanged: 'The Future of Life Institute published its 2026 AI Safety Index evaluating 9 major labs including OpenAI, Anthropic, Google DeepMind, Meta, xAI, and DeepSeek.',
      whyItMatters: 'Tracks the evolution of frontier lab commitments, highlighting the shift toward competitor-contingent pause policies and third-party red-teaming audits.',
      futureImpact: 'Provides empirical data for global regulatory frameworks regarding mandatory pre-release sandbox testing and security governance.',
      technicalHighlights: [
        'Evaluated 9 frontier AI laboratories on safety commitments',
        'Anthropic received highest safety rating (C+), followed by OpenAI and Google (C)',
        'Detailed analysis of third-party cyber-risk evaluation protocols',
      ],
    },
  },
  {
    id: 'news-6',
    slug: 'us-doe-genesis-mission-supercomputing-ai',
    title: 'US Department of Energy Deploys "Genesis Mission" Exascale AI Supercomputing',
    excerpt: 'The US Department of Energy connects exascale supercomputing clusters with frontier AI model APIs to accelerate scientific research.',
    category: 'Hardware & Compute',
    readTime: '4 min read',
    publishedAt: 'July 24, 2026',
    source: 'US Department of Energy',
    sourceUrl: 'https://www.energy.gov',
    featured: false,
    content: {
      whatChanged: 'The US Department of Energy launched the Genesis Mission program, pairing national laboratory exascale supercomputers with private-sector AI reasoning models.',
      whyItMatters: 'Enables automated molecular design, nuclear fusion plasma simulation, and materials science research using high-throughput AI API interfaces.',
      futureImpact: 'Lays the foundation for autonomous scientific laboratories capable of generating hypotheses and running supercomputing simulations in closed loops.',
      technicalHighlights: [
        'Exascale supercomputing infrastructure linked to frontier AI APIs',
        'Targeted applications in fusion energy, genomics, and materials design',
        'High-throughput secure API endpoints for national laboratory research teams',
      ],
    },
  },
];
