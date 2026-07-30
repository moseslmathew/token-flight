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
    slug: 'nvidia-openai-250b-supercomputer-grid-ohio',
    title: 'NVIDIA and OpenAI Finalize $250B Financial Guarantee for 10-Gigawatt AI Data Center Cluster',
    excerpt: 'NVIDIA and OpenAI enter negotiations for a $250 billion financial backstop to fund a 10-gigawatt AI supercomputing cluster in Ohio for next-generation frontier training.',
    category: 'Hardware & Compute',
    publishedAt: 'July 30, 2026',
    source: 'NVIDIA & OpenAI Financial Disclosure',
    sourceUrl: 'https://nvidianews.nvidia.com',
    featured: true,
    content: {
      whatChanged: 'NVIDIA and OpenAI finalized negotiations for a $250 billion financial backstop to underwrite a 10-gigawatt AI supercomputing data center cluster in Ohio, designed to house next-generation Blackwell and Rubin GPU racks.',
      whyItMatters: 'Demonstrates that training post-GPT-5 frontier models requires power and financial commitments scaling to national grid proportions, shifting compute bottlenecks from chip production to regional energy infrastructure.',
      futureImpact: 'Establishes multi-gigawatt clusters as the mandatory hardware baseline for frontier AI labs and forces cloud providers to secure direct nuclear and clean-energy PPAs.',
      technicalHighlights: [
        '10-Gigawatt dedicated power allocation for Ohio supercomputing cluster',
        '$250 Billion financial backstop underwritten by NVIDIA infrastructure fund',
        'Optimized for next-generation Blackwell Ultra and Rubin GPU architectures',
      ],
    },
  },
  {
    id: 'news-2',
    slug: 'industry-shifts-gdpval-humanity-last-exam-benchmarks',
    title: 'AI Research Shift: GDPval & Humanity\'s Last Exam Replace Saturated MMLU for Frontier Models',
    excerpt: 'AI research labs adopt GDPval (testing 44 professional occupations) and Humanity\'s Last Exam following MMLU saturation across frontier models.',
    category: 'Research & Architecture',
    publishedAt: 'July 30, 2026',
    source: 'AI Evaluation & Alignment Consortium',
    sourceUrl: 'https://arxiv.org/abs/2607.14020',
    featured: false,
    content: {
      whatChanged: 'Frontier AI labs have officially retired MMLU as a primary evaluation metric, standardizing on GDPval (which tests 44 professional occupations) and Humanity\'s Last Exam to benchmark real-world reasoning and self-correction.',
      whyItMatters: 'MMLU scores reached saturation (>92%) across top models, failing to differentiate model capabilities. GDPval measures actual economic utility and complex task completion across professional domains.',
      futureImpact: 'Forces model development toward dynamic multi-step self-correction and multi-tool orchestration rather than static multiple-choice memorization.',
      technicalHighlights: [
        'MMLU retired as primary metric due to frontier model saturation (>92%)',
        'GDPval evaluates model performance across 44 professional occupations',
        'Emphasis on test-time compute scaling and dynamic reasoning self-correction',
      ],
    },
  },
  {
    id: 'news-3',
    slug: 'black-forest-labs-flux-3-multimodal-weights-release',
    title: 'Black Forest Labs Ships FLUX 3 Open-Weights Capable of Generating 20-Second 4K Video',
    excerpt: 'Black Forest Labs releases open weights for FLUX 3, enabling open-source generation of synchronized 20-second 4K audio-video clips from text prompts.',
    category: 'Open Source',
    publishedAt: 'July 29, 2026',
    source: 'Black Forest Labs',
    sourceUrl: 'https://blackforestlabs.ai',
    featured: false,
    content: {
      whatChanged: 'Black Forest Labs released open weights for FLUX 3, a multimodal generative architecture capable of synthesizing 20-second 4K video clips with synchronized stereo audio directly from natural language prompts.',
      whyItMatters: 'Closes the capability gap between open-source generative media models and closed proprietary video synthesis engines like Sora and Runway Gen-4.',
      futureImpact: 'Accelerates local video generation pipelines and enables indie developers to integrate high-quality video synthesis into local creative applications.',
      technicalHighlights: [
        'Open weights release for 20-second 4K audio-video synthesis',
        'Native temporal attention mechanism for zero-flicker frame consistency',
        'Synchronized stereo audio generation joint with video diffusion',
      ],
    },
  },
  {
    id: 'news-4',
    slug: 'threatlocker-raises-190m-ai-agent-exploit-defense',
    title: 'ThreatLocker Raises $190M Series F to Protect Enterprise Infrastructure Against AI Agent Exploits',
    excerpt: 'Cybersecurity firm ThreatLocker secures $190M in Series F funding to defend corporate networks against autonomous AI agent zero-day exploits.',
    category: 'Industry & Policy',
    publishedAt: 'July 29, 2026',
    source: 'ThreatLocker & Cybersecurity News',
    sourceUrl: 'https://www.threatlocker.com/news',
    featured: false,
    content: {
      whatChanged: 'Cybersecurity leader ThreatLocker closed a $190 million Series F financing round specifically targeted at developing zero-trust endpoint protection against autonomous AI agent vulnerabilities and machine-generated exploits.',
      whyItMatters: 'Reflects growing enterprise anxiety following recent high-profile incidents where autonomous reasoning agents breached sandboxed environments during automated red-teaming.',
      futureImpact: 'Drives widespread adoption of strict zero-trust default-deny policies for enterprise agentic execution environments.',
      technicalHighlights: [
        '$190 Million Series F funding dedicated to AI agent threat defense',
        'Zero-trust application control for autonomous AI execution environments',
        'Real-time behavioral blocking for machine-generated zero-day exploits',
      ],
    },
  },
];
