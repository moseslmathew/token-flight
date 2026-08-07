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
    slug: 'stanford-evo-2-synthetic-bacteriophages-science',
    title: 'Stanford Researchers Use Evo 2 AI Model to Design Viable Synthetic Bacteriophages in Science Milestone',
    excerpt: 'Stanford University researchers publish a breakthrough in Science using the Evo 2 genomic model to design functioning synthetic bacteriophages that kill drug-resistant bacteria.',
    category: 'Research & Architecture',
    publishedAt: 'August 7, 2026',
    source: 'Stanford University & Science',
    sourceUrl: 'https://www.science.org/journal/science',
    featured: true,
    content: {
      whatChanged: 'Researchers at Stanford University published a landmark paper in Science demonstrating that the Evo 2 genomic foundation model designed novel, fully functional synthetic bacteriophages capable of targeting and eradicating antibiotic-resistant E. coli in lab tests.',
      whyItMatters: 'Marks the first time generative AI has successfully engineered viable, functional biological organisms from scratch, unlocking a new frontier in combating antimicrobial superbug resistance.',
      futureImpact: 'Catalyzes the growth of generative synthetic biology while creating urgent demand for standardized biosecurity screening protocols across commercial DNA synthesis platforms.',
      technicalHighlights: [
        'Genomic foundation model Evo 2 used for end-to-end synthetic organism design',
        'Successful in vitro eradication of antibiotic-resistant E. coli strains',
        'Call for international biosecurity standards in generative DNA synthesis',
      ],
    },
  },
  {
    id: 'news-2',
    slug: 'alibaba-qwen-3-8-max-frontier-agent-model-preview',
    title: 'Alibaba Cloud Previews Qwen 3.8-Max Flagship Model for Autonomous Enterprise Agents',
    excerpt: 'Alibaba Cloud unveils preview access to Qwen 3.8-Max, a multi-trillion parameter model optimized for complex agentic workflows and long-horizon tool execution.',
    category: 'Model Releases',
    publishedAt: 'August 7, 2026',
    source: 'Alibaba Cloud Intelligence',
    sourceUrl: 'https://www.alibabacloud.com/product/qwen',
    featured: false,
    content: {
      whatChanged: 'Alibaba Cloud rolled out preview developer access to Qwen 3.8-Max, its latest flagship foundation model engineered specifically for multi-step autonomous planning, enterprise system administration, and long-horizon code synthesis.',
      whyItMatters: 'Positions Qwen 3.8-Max as a top-tier global competitor to GPT-5.6 Sol and Claude Opus 5, giving enterprise developers an alternative API backend for heavy agentic workloads.',
      futureImpact: 'Accelerates competition across frontier model APIs in Asia and international markets, driving down inference costs for autonomous developer pipelines.',
      technicalHighlights: [
        'Multi-trillion parameter architecture optimized for autonomous tool orchestration',
        'State-of-the-art results on SWE-bench Pro and Toolathlon agent benchmarks',
        'High-concurrency enterprise endpoints with dedicated low-latency routing',
      ],
    },
  },
  {
    id: 'news-3',
    slug: 'google-deepmind-weathernext-nature-cyclone-forecasting',
    title: 'Google DeepMind Publishes WeatherNext in Nature for High-Accuracy Extreme Cyclone Forecasting',
    excerpt: 'Google DeepMind releases WeatherNext, a deep generative meteorological model delivering multi-day lead-time accuracy in forecasting destructive tropical cyclones.',
    category: 'Research & Architecture',
    publishedAt: 'August 6, 2026',
    source: 'Google DeepMind & Nature',
    sourceUrl: 'https://deepmind.google/discover/blog',
    featured: false,
    content: {
      whatChanged: 'Google DeepMind published research in Nature detailing WeatherNext, an AI meteorological model that achieves state-of-the-art trajectory and intensity forecasting for tropical cyclones with a 3-day lead-time advantage.',
      whyItMatters: 'Outperforms traditional physics-based numerical weather prediction systems (such as ECMWF) at a fraction of the computational runtime, providing earlier warnings for coastal disaster management.',
      futureImpact: 'Establishes neural weather models as the operational standard for national meteorological agencies, significantly improving global disaster response and evacuation logistics.',
      technicalHighlights: [
        'State-of-the-art cyclone trajectory and intensity forecasting published in Nature',
        '3-day lead-time accuracy advantage over traditional numerical simulations',
        'Sub-minute global inference on standard Google TPU hardware clusters',
      ],
    },
  },
  {
    id: 'news-4',
    slug: 'darpa-venom-ai-autonomous-f16-combat-flight',
    title: 'DARPA Completes First Autonomous F-16 Combat Flight Powered by VENOM Autonomy Kit',
    excerpt: 'DARPA successfully flies a real-world F-16 fighter jet fully controlled by an onboard neural network using the VENOM autonomy system.',
    category: 'Hardware & Compute',
    publishedAt: 'August 6, 2026',
    source: 'DARPA Defense Press',
    sourceUrl: 'https://www.darpa.mil/news',
    featured: false,
    content: {
      whatChanged: 'DARPA successfully executed the first real-world flight of an F-16 fighter jet piloted entirely by an onboard real-time neural network using the VENOM autonomy package without human pilot intervention.',
      whyItMatters: 'Proves that deep reinforcement learning models can safely execute complex dynamic flight maneuvers and tactical navigation in high-speed aerospace environments in real time.',
      futureImpact: 'Accelerates the defense sector\'s transition toward uncrewed collaborative combat aircraft (CCA) fleets and real-time autonomous aerospace defense.',
      technicalHighlights: [
        'Full real-world tactical flight of an F-16 controlled by an onboard neural network',
        'Real-time low-latency neural inference using the VENOM autonomy architecture',
        'Zero human intervention required during high-G flight execution and navigation',
      ],
    },
  },
];
