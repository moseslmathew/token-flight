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
    slug: 'openai-astra-frontier-model-math-open-problems-lean-proofs',
    title: 'OpenAI Unveils "Astra" Model Solving 10 Open Problems in Mathematics with Machine-Verifiable Lean Proofs',
    excerpt: 'OpenAI announces that its internal next-gen model "Astra" solved 10 open math problems, publishing formal machine-checked Lean proofs on GitHub for $2,000 in compute.',
    category: 'Research & Architecture',
    publishedAt: 'August 2, 2026',
    source: 'OpenAI Research & GitHub',
    sourceUrl: 'https://openai.com/index/astra-mathematics-proofs',
    featured: true,
    content: {
      whatChanged: 'OpenAI disclosed that its internal next-generation model "Astra" solved 10 long-standing open problems in theoretical mathematics and computer science, publishing formal machine-checkable Lean language proofs on GitHub for ~$2,000 in compute.',
      whyItMatters: 'Demonstrates for the first time that test-time compute scaling can produce novel, machine-verifiable mathematical discoveries rather than simply solving past competition benchmarks.',
      futureImpact: 'Establishes automated theorem proving and Lean proof verification as the gold standard for verifying frontier AI scientific contributions.',
      technicalHighlights: [
        'Solved 10 open problems in theoretical computer science and group theory',
        'Machine-checkable proofs published in formal Lean 4 language on GitHub',
        'Total evaluation and proof synthesis achieved for ~$2,000 in compute costs',
      ],
    },
  },
  {
    id: 'news-2',
    slug: 'eu-ai-act-transparency-mandate-takes-effect-august-2',
    title: 'EU AI Act Transparency Mandates Officially Take Effect Today Across All 27 Member States',
    excerpt: 'The European Union\'s AI Act transparency provisions take effect on August 2, enforcing mandatory digital watermarking, C2PA metadata, and AI agent disclosure disclaimers.',
    category: 'Industry & Policy',
    publishedAt: 'August 2, 2026',
    source: 'European Commission AI Office',
    sourceUrl: 'https://ec.europa.eu/ai-act',
    featured: false,
    content: {
      whatChanged: 'The European Union\'s AI Act transparency mandates officially took effect on August 2, 2026 across all 27 EU member states, requiring mandatory digital watermarking and explicit AI interaction disclaimers.',
      whyItMatters: 'Legally binds commercial AI API providers to embed machine-readable C2PA provenance metadata directly into public text, image, audio, and video output streams.',
      futureImpact: 'Forces global AI infrastructure platforms to integrate cryptographic content authentication as a standard feature across all commercial endpoints.',
      technicalHighlights: [
        'Mandatory digital watermarking and C2PA metadata enforcement across EU',
        'Requires explicit disclosures when users interact with synthetic AI agents',
        'Applies to all commercial text, image, audio, and video generation APIs',
      ],
    },
  },
  {
    id: 'news-3',
    slug: 'moonshot-kimi-k3-tops-long-context-retrieval-benchmarks',
    title: 'Moonshot AI\'s 2.8T Kimi K3 Tops Long-Context Source Attribution & Retrieval Benchmarks',
    excerpt: 'Independent evaluations on BenchLM confirm that Moonshot AI\'s open-weights Kimi K3 leads global rankings in 1M-token retrieval accuracy and source attribution.',
    category: 'Open Source',
    publishedAt: 'August 1, 2026',
    source: 'Moonshot AI & BenchLM',
    sourceUrl: 'https://www.moonshot.cn',
    featured: false,
    content: {
      whatChanged: 'Independent evaluation results published on BenchLM confirmed that Moonshot AI\'s open-weights 2.8T parameter model Kimi K3 captured #1 rank in 1M-token context retrieval accuracy and source attribution.',
      whyItMatters: 'Proves that open-weights Mixture-of-Experts architectures can match proprietary closed models in long-context document analysis without cloud vendor data privacy risks.',
      futureImpact: 'Accelerates enterprise deployment of self-hosted open MoE models for large-scale legal, financial, and technical document processing.',
      technicalHighlights: [
        '#1 rank on BenchLM for 1M-token context retrieval and attribution',
        '100% Needle-In-A-Haystack retrieval score across 1M token context windows',
        'Kimi Delta Attention (KDA) for sub-100ms first-token generation latency',
      ],
    },
  },
  {
    id: 'news-4',
    slug: 'anthropic-claude-5-family-surges-to-top-rank-benchlm',
    title: 'Anthropic Claude 5 Family Surges to Top Rank on BenchLM for Multi-Turn Agent Planning',
    excerpt: 'Anthropic\'s Claude 5 model suite secures top positions on BenchLM across multi-turn agent planning, code refactoring, and tool execution benchmarks.',
    category: 'Model Releases',
    publishedAt: 'August 1, 2026',
    source: 'Anthropic & BenchLM',
    sourceUrl: 'https://www.anthropic.com/news',
    featured: false,
    content: {
      whatChanged: 'Anthropic\'s Claude 5 model suite (Mythos, Opus 5, and Fable) secured top positions on the BenchLM leaderboard across multi-turn agent planning and autonomous software engineering benchmarks.',
      whyItMatters: 'Highlights Anthropic\'s competitive advantage in multi-turn reasoning and agentic workflow execution as enterprise AI budgets shift heavily toward autonomous software engineering.',
      futureImpact: 'Drives competitive pressure between Anthropic and OpenAI for enterprise API deployments in automated software development and system administration.',
      technicalHighlights: [
        'Top rank on BenchLM multi-turn agent planning and code refactoring suites',
        'Superior performance on multi-turn tool calling and error recovery tasks',
        'Configurable effort dial optimization for enterprise inference cost control',
      ],
    },
  },
];
