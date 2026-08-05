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
    slug: 'tencent-hy3-foundation-model-global-api-rollout',
    title: 'Tencent Expands Hy3 Foundation Model API Globally with Sub-100ms Inference Tiers',
    excerpt: 'Tencent opens global API access for its Hy3 foundation model architecture, featuring a 256K context window and low-latency inference endpoints.',
    category: 'Model Releases',
    publishedAt: 'August 5, 2026',
    source: 'Tencent Cloud AI',
    sourceUrl: 'https://cloud.tencent.com/product/hunyuan',
    featured: true,
    content: {
      whatChanged: 'Tencent officially launched global API access for its Hy3 foundation model architecture, featuring a 256K token context window and sub-100ms first-token generation latency across enterprise endpoints.',
      whyItMatters: 'Provides global developers with a high-throughput, low-latency foundation model alternative for enterprise agentic workflows and multilingual code synthesis.',
      futureImpact: 'Drives international adoption of Asian foundation model APIs, competing directly with DeepSeek V4 and Gemini 3.6 Flash on cost-efficiency.',
      technicalHighlights: [
        'Global API availability for Tencent Hy3 foundation model architecture',
        '256K token context window with 100% Needle-In-A-Haystack retrieval',
        'Sub-100ms first-token latency optimized for high-frequency agentic tool calling',
      ],
    },
  },
  {
    id: 'news-2',
    slug: 'ambiq-open-sources-heliaprofiler-edge-ai-hardware',
    title: 'Ambiq Open-Sources heliaPROFILER for Real-Time Edge AI Hardware Bottleneck Profiling',
    excerpt: 'Edge computing provider Ambiq releases heliaPROFILER, an open-source tool designed to profile memory bandwidth and latency on low-power microcontrollers.',
    category: 'Hardware & Compute',
    publishedAt: 'August 5, 2026',
    source: 'Ambiq Edge AI',
    sourceUrl: 'https://github.com/ambiqmicro/heliaprofiler',
    featured: false,
    content: {
      whatChanged: 'Ambiq open-sourced heliaPROFILER, a hardware profiling tool designed to analyze memory bandwidth, cache misses, and latency bottlenecks for quantized AI models on ultra-low-power microcontrollers.',
      whyItMatters: 'Solves a major engineering bottleneck in profiling and optimizing resource-constrained edge AI models executing directly on embedded hardware.',
      futureImpact: 'Accelerates the deployment of on-device local AI models in wearables, smart IoT sensors, and industrial robotics.',
      technicalHighlights: [
        'Open-source hardware profiling tool for ultra-low-power microcontrollers',
        'Real-time tracking of memory bandwidth, cache utilization, and execution latency',
        'Optimized for profiling INT4/INT8 quantized neural networks on edge hardware',
      ],
    },
  },
  {
    id: 'news-3',
    slug: 'kaist-flow-battery-breakthrough-ai-data-centers',
    title: 'KAIST Breakthrough Accelerates Vanadium Flow Battery Production for 10GW AI Data Centers',
    excerpt: 'KAIST researchers publish a chemical process that speeds up core electrolyte production for vanadium redox flow batteries by 10x to power 24/7 AI clusters.',
    category: 'Hardware & Compute',
    publishedAt: 'August 5, 2026',
    source: 'KAIST & Nature Energy',
    sourceUrl: 'https://news.kaist.ac.kr',
    featured: false,
    content: {
      whatChanged: 'Researchers at KAIST published a 10x chemical synthesis process for manufacturing vanadium redox flow battery (VRFB) electrolytes, a critical step for deploying long-duration grid energy storage.',
      whyItMatters: 'Provides a scalable, long-duration energy storage solution required to backstop 24/7 power supply demands for 10-gigawatt AI supercomputing data centers.',
      futureImpact: 'Solves grid stability bottlenecks for mega data center buildouts, enabling continuous renewable energy backstops for frontier model training runs.',
      technicalHighlights: [
        '10x faster chemical synthesis process for VRFB electrolyte production',
        'Long-duration grid energy storage capability for 24/7 data center power backstops',
        'Direct application for stabilizing renewable microgrids powering 10GW AI clusters',
      ],
    },
  },
  {
    id: 'news-4',
    slug: 'industry-adopts-gdpval-expert-evaluation-suite',
    title: 'AI Industry Standardizes on GDPval & Expert-Driven Suites to Combat Static Test Saturation',
    excerpt: 'Leading AI research labs adopt GDPval and expert-curated evaluation suites as standard benchmarks after static MMLU tests hit saturation.',
    category: 'Research & Architecture',
    publishedAt: 'August 4, 2026',
    source: 'AI Evaluation & Alignment Consortium',
    sourceUrl: 'https://arxiv.org/abs/2608.01200',
    featured: false,
    content: {
      whatChanged: 'Frontier AI labs and enterprise auditors officially standardized on GDPval and expert-curated evaluation suites to measure real-world reasoning after static benchmarks like MMLU reached saturation.',
      whyItMatters: 'Evaluates models on complex multi-turn task completion across 44 professional occupations rather than relying on easily benchmark-gamed multiple-choice questions.',
      futureImpact: 'Forces future model evaluation toward economic utility, multi-tool orchestration reliability, and real-world task execution capability.',
      technicalHighlights: [
        'GDPval adopted as primary benchmark suite across 44 professional occupations',
        'Shift away from static multiple-choice tests toward dynamic task execution',
        'Focus on evaluating multi-turn agent planning and error recovery in production',
      ],
    },
  },
];
