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
    slug: 'lg-ai-research-k-exaone-2-0-750b-open-weights',
    title: 'LG AI Research Releases K-Exaone 2.0 (750B Parameters) Open Weights on Hugging Face',
    excerpt: 'LG AI Research open-sources K-Exaone 2.0, a 750-billion-parameter MoE model designed for enterprise reasoning and multilingual code synthesis.',
    category: 'Open Source',
    publishedAt: 'August 1, 2026',
    source: 'LG AI Research & Hugging Face',
    sourceUrl: 'https://huggingface.co/LGAI-EXAONE',
    featured: true,
    content: {
      whatChanged: 'LG AI Research released open weights for K-Exaone 2.0 on Hugging Face, a 750-billion-parameter Mixture-of-Experts foundation model optimized for multilingual code synthesis and enterprise reasoning.',
      whyItMatters: 'Provides a powerful self-hostable 750B-class alternative for enterprise organizations seeking to deploy frontier open weights without cloud vendor lock-in.',
      futureImpact: 'Accelerates adoption of high-parameter open-weights models in private enterprise data centers, competing directly with Moonshot\'s Kimi K3.',
      technicalHighlights: [
        '750 Billion parameter Mixture-of-Experts architecture',
        'Open weights availability on Hugging Face for commercial research',
        'Sub-100ms first-token generation latency with 512K context window',
      ],
    },
  },
  {
    id: 'news-2',
    slug: 'google-deepmind-gemini-robotics-2-humanoid-intelligence',
    title: 'Google DeepMind Unveils Gemini Robotics 2 for Whole-Body Humanoid Motor Reasoning',
    excerpt: 'Google DeepMind releases Gemini Robotics 2, providing real-time vision-language-action reasoning for humanoid platforms like Apptronik Apollo 2.',
    category: 'Research & Architecture',
    publishedAt: 'August 1, 2026',
    source: 'Google DeepMind Robotics',
    sourceUrl: 'https://deepmind.google/technologies/robotics',
    featured: false,
    content: {
      whatChanged: 'Google DeepMind announced Gemini Robotics 2, integrating multimodal vision-language-action (VLA) reasoning with whole-body sensorimotor control for humanoid robotics platforms.',
      whyItMatters: 'Bridges high-level task planning with low-latency physical joint control, enabling robots to perform complex assembly and manipulation tasks dynamically.',
      futureImpact: 'Paves the way for general-purpose autonomous humanoid deployment across manufacturing, logistics, and industrial maintenance.',
      technicalHighlights: [
        'Integrated VLA architecture for real-time sensorimotor reasoning',
        'Whole-body joint control optimized for Apptronik Apollo 2 platform',
        'Sub-20ms closed-loop motor control inference latency',
      ],
    },
  },
  {
    id: 'news-3',
    slug: 'eu-ai-act-watermarking-compliance-august-2-mandate',
    title: 'EU AI Act Transparency Provisions Take Effect August 2, Mandating Digital Watermarking',
    excerpt: 'The European Union enforces mandatory digital watermarking and provenance metadata labeling for all commercial generative AI systems entering the EU market on August 2.',
    category: 'Industry & Policy',
    publishedAt: 'July 31, 2026',
    source: 'European Commission AI Office',
    sourceUrl: 'https://ec.europa.eu/ai-act',
    featured: false,
    content: {
      whatChanged: 'The European Union\'s AI Act enforcing mandatory digital watermarking and C2PA metadata labeling for commercial generative AI systems takes effect on August 2, 2026.',
      whyItMatters: 'Establishes the world\'s first legally binding requirement for machine-readable provenance metadata across commercial AI text, image, and video outputs.',
      futureImpact: 'Forces global AI model API providers to integrate cryptographic provenance watermarking directly into inference streaming pipelines.',
      technicalHighlights: [
        'Mandatory C2PA digital watermarking enforcement across EU market',
        'Applies to synthetic text, image, audio, and video generation APIs',
        'Legal compliance required for all commercial model deployments',
      ],
    },
  },
  {
    id: 'news-4',
    slug: 'thomson-reuters-launches-thomson-legal-foundation-model',
    title: 'Thomson Reuters Launches "Thomson" Proprietary AI Model Fine-Tuned on Westlaw Legal Corpus',
    excerpt: 'Thomson Reuters introduces its domain-specific "Thomson" model, trained on authoritative Westlaw legal archives to compete with general frontier models.',
    category: 'Model Releases',
    publishedAt: 'July 31, 2026',
    source: 'Thomson Reuters AI',
    sourceUrl: 'https://www.thomsonreuters.com/news',
    featured: false,
    content: {
      whatChanged: 'Thomson Reuters unveiled its domain-specific "Thomson" foundation model, trained on Westlaw and authoritative legal archives for complex legal analysis and contract synthesis.',
      whyItMatters: 'Demonstrates that specialized domain foundation models trained on proprietary data moats can outperform general-purpose frontier models on specialized professional benchmarks.',
      futureImpact: 'Accelerates enterprise adoption of vertical AI models built on authoritative domain datasets rather than generic web crawl data.',
      technicalHighlights: [
        'Proprietary foundation model fine-tuned on Westlaw legal corpus',
        'Top rank on LegalBench and complex contract evaluation suites',
        'Designed for high-precision enterprise legal workflow automation',
      ],
    },
  },
];
