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
    slug: 'google-deepmind-demis-hassabis-chair-alphabet-chief-scientist',
    title: 'Google Names Demis Hassabis Chair of DeepMind and Chief Scientist of Alphabet to Lead AGI Strategy',
    excerpt: 'Google announces leadership transition elevating Demis Hassabis to Chair of Google DeepMind and Chief Scientist of Alphabet to direct long-term AGI research.',
    category: 'Industry & Policy',
    publishedAt: 'August 8, 2026',
    source: 'Alphabet & Google DeepMind',
    sourceUrl: 'https://blog.google/technology/ai',
    featured: true,
    content: {
      whatChanged: 'Google announced a leadership reorganization elevating Demis Hassabis to Chair of Google DeepMind and Chief Scientist of Alphabet to oversee long-term AGI strategy and frontier science initiatives across the entire organization.',
      whyItMatters: 'Unifies Alphabet\'s consolidated compute infrastructure, quantum labs, and frontier foundation model architecture under a single scientific leadership charter.',
      futureImpact: 'Accelerates the convergence of foundation model capabilities with autonomous scientific discovery and unified multimodality across Google\'s global infrastructure.',
      technicalHighlights: [
        'Demis Hassabis appointed Chair of DeepMind and Chief Scientist of Alphabet',
        'Unified oversight of Alphabet\'s compute infrastructure, quantum labs, and AGI roadmaps',
        'Strategic charter focused on automated scientific discovery and frontier model scaling',
      ],
    },
  },
  {
    id: 'news-2',
    slug: 'meta-muse-code-app-spark-1-2-autonomous-developer-suite',
    title: 'Meta Launches "Muse Code" App Powered by Muse Spark 1.2 for Multi-File Autonomous Engineering',
    excerpt: 'Meta introduces Muse Code, an AI development environment powered by Muse Spark 1.2 capable of whole-repository refactoring and autonomous test generation.',
    category: 'Model Releases',
    publishedAt: 'August 8, 2026',
    source: 'Meta AI Engineering',
    sourceUrl: 'https://ai.meta.com/blog',
    featured: false,
    content: {
      whatChanged: 'Meta launched "Muse Code," a standalone developer application powered by its latest Muse Spark 1.2 architecture capable of multi-file repository refactoring, automated bug resolution, and live test synthesis.',
      whyItMatters: 'Competes directly with GitHub Copilot Workspace and Claude Code, expanding Meta\'s commercial developer tool footprint with dedicated enterprise coding agents.',
      futureImpact: 'Accelerates developer adoption of multi-turn autonomous coding agents that operate across complex multi-service repositories.',
      technicalHighlights: [
        'Standalone Muse Code developer environment powered by Muse Spark 1.2',
        'Native multi-file repository refactoring and automated test synthesis',
        'Support for local codebase indexing and low-latency agentic loop execution',
      ],
    },
  },
  {
    id: 'news-3',
    slug: 'trajdebug-framework-agent-trajectory-error-tracing',
    title: 'TRAJDEBUG Framework Unveiled for Tracing Failure Cascades in Long-Horizon Agent Trajectories',
    excerpt: 'AI researchers release TRAJDEBUG, an open-source framework to diagnose tool hallucination and error propagation across 100+ step agent workflows.',
    category: 'Research & Architecture',
    publishedAt: 'August 7, 2026',
    source: 'AI Evaluation & Alignment Consortium',
    sourceUrl: 'https://arxiv.org/abs/2608.02400',
    featured: false,
    content: {
      whatChanged: 'AI researchers published TRAJDEBUG, an open-source evaluation and telemetry framework that traces error lifecycles, cascading hallucination, and tool failure points across complex 100+ step autonomous agent trajectories.',
      whyItMatters: 'Solves a critical observability bottleneck for enterprise production agents, enabling teams to pinpoint the exact failure step in multi-turn reasoning loops.',
      futureImpact: 'Establishes trajectory-level debugging and error telemetry as an industry-standard monitoring layer for enterprise agent deployments.',
      technicalHighlights: [
        'Open-source telemetry framework for multi-step agent trajectory debugging',
        'Automated detection of cascading hallucinations and tool-calling errors',
        'Compatible with standard agent runtime frameworks and enterprise logs',
      ],
    },
  },
  {
    id: 'news-4',
    slug: 'taiwan-ai-infrastructure-exports-surge-33-percent',
    title: 'Taiwan AI Infrastructure Exports Surge 32.9% YoY Driven by Hyperscaler Supercomputing Demand',
    excerpt: 'Official trade data reveals a 32.9% year-over-year surge in semiconductor and server exports fueled by global demand for AI supercomputing clusters.',
    category: 'Hardware & Compute',
    publishedAt: 'August 7, 2026',
    source: 'Ministry of Finance & Global Trade',
    sourceUrl: 'https://www.mof.gov.tw',
    featured: false,
    content: {
      whatChanged: 'Official trade data showed a 32.9% year-over-year surge in Taiwan\'s high-performance computing hardware and semiconductor exports, driven by aggressive server rack procurement from global cloud hyperscalers.',
      whyItMatters: 'Confirms that hyperscaler capital expenditures are actively translating into record physical shipments of liquid-cooled GPU clusters and advanced packaging hardware.',
      futureImpact: 'Reinforces the long-term hardware supercycle powering next-generation frontier model training clusters through 2027 and 2028.',
      technicalHighlights: [
        '32.9% year-over-year growth in high-performance computing hardware exports',
        'Record shipment volume for liquid-cooled AI server racks and advanced substrates',
        'Sustained global demand for next-generation frontier training infrastructure',
      ],
    },
  },
];
