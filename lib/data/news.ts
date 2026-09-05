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
    slug: 'google-gemini-3-8-flash-cyber-launch',
    title: 'Google Launches Gemini 3.8 Flash and a Cybersecurity Edition for Trusted Defenders',
    excerpt: 'Gemini 3.8 Flash targets complex agentic work at Flash-level speed and pricing, while a restricted Cyber variant focuses on finding and patching software vulnerabilities.',
    category: 'Model Releases',
    readTime: '4 min read',
    publishedAt: 'September 2, 2026',
    source: 'Google',
    sourceUrl: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/',
    featured: true,
    content: {
      whatChanged: 'Google released Gemini 3.8 Flash for general use and Gemini 3.8 Flash Cyber through its limited-access Fairwind Program. The general model keeps the introductory price of $0.75 per million input tokens and $3.75 per million output tokens while adding stronger coding, reasoning, and agent performance.',
      whyItMatters: 'The release pushes higher-end agent capability into a lower-cost model tier. Google reports 54.9% on HLE-Verified, while the Cyber edition reached 47.2% pass@1 on CWE-Bench and produced more correct Chrome vulnerability patches than larger commercial models in internal testing.',
      futureImpact: 'Developers may be able to run longer and more capable agent loops without moving every workload to premium models. Restricted cyber variants also point toward a two-tier market: broad general access paired with vetted access to the most sensitive capabilities.',
      technicalHighlights: [
        'One-million-token input context and 64,000-token text output',
        'Configurable effort levels to balance quality, cost, and latency',
        'Cyber variant emphasizes autonomous vulnerability discovery and verified patching',
      ],
    },
  },
  {
    id: 'news-2',
    slug: 'google-fairwind-program-agentic-cyber-defense',
    title: 'Google Opens Fairwind Program for Agentic Cyber Defense',
    excerpt: 'A new limited-access program combines Gemini 3.8 Flash Cyber with CodeMender so selected governments, infrastructure operators, and software maintainers can find and repair vulnerabilities.',
    category: 'Industry & Policy',
    readTime: '3 min read',
    publishedAt: 'September 2, 2026',
    source: 'Google',
    sourceUrl: 'https://blog.google/innovation-and-ai/technology/safety-security/fairwind-program/',
    featured: false,
    content: {
      whatChanged: 'Google launched Fairwind with more than 650 participating partners. It pairs Gemini 3.8 Flash Cyber with the CodeMender harness to generate and validate patches inside secure cloud environments, with access initially prioritized for trusted defensive organizations.',
      whyItMatters: 'Advanced cyber models can shorten the gap between discovering a flaw and deploying a fix, but the same capabilities carry misuse risk. Fairwind is a concrete attempt to deliver powerful autonomous security tooling through identity checks, operational controls, and staged access.',
      futureImpact: 'Expect frontier labs to create more domain-specific access programs for high-risk capabilities. Enterprise buyers may increasingly evaluate not just model performance, but the governance and audit controls surrounding deployment.',
      technicalHighlights: [
        'Combines vulnerability discovery, verification, patch generation, and validation',
        'Access is restricted to approved defensive teams with operational safeguards',
        'Targets government systems, critical infrastructure, and widely used software',
      ],
    },
  },
  {
    id: 'news-3',
    slug: 'google-gemini-agentic-video-understanding',
    title: 'Gemini Gains Agentic Video Understanding for Cheaper, More Precise Analysis',
    excerpt: 'Gemini can now decide which moments, frame rates, audio segments, and transcripts to inspect instead of processing an entire video at a fixed sampling rate.',
    category: 'Research & Architecture',
    readTime: '3 min read',
    publishedAt: 'September 1, 2026',
    source: 'Google DeepMind',
    sourceUrl: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/',
    featured: false,
    content: {
      whatChanged: 'Google added an agentic video-processing mode to Gemini 3.7 Flash, 3.6 Flash, and 3.5 Flash-Lite. The model can dynamically search and resample selected video segments across frames, audio, and transcripts through an internal tool loop.',
      whyItMatters: 'Static video ingestion spends tokens uniformly, even when only a few seconds matter. Google reports up to 88% lower token use, up to 66% lower analysis cost, and accuracy gains of up to 7% across its tests.',
      futureImpact: 'Long recordings become more practical for search, editing, anomaly detection, and summarization. This pattern—letting a model selectively acquire more evidence—could extend beyond video to large document, audio, and sensor archives.',
      technicalHighlights: [
        'Goal-directed selection of frames, audio, and transcript segments',
        'Supports uploaded video and YouTube through the Gemini API',
        'Available through a single agentic-processing configuration',
      ],
    },
  },
  {
    id: 'news-4',
    slug: 'anthropic-claude-fable-5-1-mythos-5-1',
    title: 'Anthropic Releases Claude Fable 5.1 and Restricted Mythos 5.1',
    excerpt: 'Anthropic\'s newest models focus on long-running coding and knowledge work, with Fable available broadly and the less-restricted Mythos variant reserved for vetted cyber and life-science organizations.',
    category: 'Model Releases',
    readTime: '4 min read',
    publishedAt: 'September 1, 2026',
    source: 'Anthropic',
    sourceUrl: 'https://www.anthropic.com/claude/fable',
    featured: false,
    content: {
      whatChanged: 'Claude Fable 5.1 is now available across Claude products, cloud marketplaces, and the API for $10 per million input tokens and $50 per million output tokens. Claude Mythos 5.1 uses the same underlying model with fewer cyber and biology restrictions, but remains limited to vetted organizations.',
      whyItMatters: 'Anthropic is positioning Fable for hours-long, multi-application work rather than short chat turns. Cache reads are priced 75% below the prior Fable generation, which Anthropic estimates can reduce the cost of highly agentic workloads by roughly 45%.',
      futureImpact: 'Long-horizon agents will increasingly be sold on completed-task economics rather than token price alone. The paired Fable/Mythos release also formalizes capability-based access controls as part of model packaging.',
      technicalHighlights: [
        'Designed for long-running agents, coding, research, and document-heavy workflows',
        'Lower cache-read pricing for repeated context in agent loops',
        'Automatic fallback to safer models for flagged cyber or biology requests',
      ],
    },
  },
  {
    id: 'news-5',
    slug: 'openai-astra-critical-cyber-capability-safeguards',
    title: 'OpenAI Classifies Upcoming Astra at Its Critical Cyber Capability Threshold',
    excerpt: 'OpenAI says its forthcoming Astra model can autonomously find and exploit previously unknown vulnerabilities, prompting stronger safeguards and restricted access to advanced cyber functions.',
    category: 'Research & Architecture',
    readTime: '5 min read',
    publishedAt: 'September 1, 2026',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/index/path-to-astra/',
    featured: false,
    content: {
      whatChanged: 'OpenAI designated Astra as the first model to meet the Critical cybersecurity threshold in its Preparedness Framework. The company says Astra achieved 100% on ExploitBench and discovered two zero-day vulnerabilities during an internal evaluation, while using fewer tokens than GPT-5.6 Sol.',
      whyItMatters: 'This is a significant capability and governance milestone: the lab delayed parts of training and release while strengthening infrastructure isolation, misuse detection, refusal behavior, and monitoring for unauthorized actions.',
      futureImpact: 'Frontier releases may increasingly arrive with capability-specific restrictions rather than uniform model access. Security teams could gain powerful defensive tools, while labs face a higher bar for containment, monitoring, and external transparency.',
      technicalHighlights: [
        'Critical-tier assessment covers autonomous zero-day discovery and exploit chains',
        '91.5% refusal rate on OpenAI\'s cyber jailbreak evaluations',
        'Advanced defensive access will initially be limited through a staged program',
      ],
    },
  },
  {
    id: 'news-6',
    slug: 'openai-chatgpt-healthcare-epic-public-data-connectors',
    title: 'ChatGPT for Healthcare Connects to Epic Records and Nine Public Data Sources',
    excerpt: 'OpenAI introduced an Epic integration and a healthcare data plugin that can work with authorized patient records and official sources such as PubMed, DailyMed, and ClinicalTrials.gov.',
    category: 'Industry & Policy',
    readTime: '4 min read',
    publishedAt: 'September 1, 2026',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/index/chatgpt-connects-health-records-and-healthcare-sources/',
    featured: false,
    content: {
      whatChanged: 'Healthcare organizations can now bring authorized Epic patient context into ChatGPT for Healthcare and install a plugin covering nine official public sources. The system can summarize chart changes, support pre-visit review, and point users back to supporting records.',
      whyItMatters: 'The announcement shifts enterprise AI from a standalone assistant toward a governed layer over operational systems. OpenAI reports that physicians rated 99.1% of responses safe across 4,363 ratings spanning 27 connected-EHR use cases.',
      futureImpact: 'AI assistants may become a common interface across fragmented clinical, research, and administrative data. Adoption will depend on permission controls, auditability, source traceability, and careful human review—not only model quality.',
      technicalHighlights: [
        'Epic integration supports both ChatGPT-side and in-EHR workflows',
        'Plugin includes PubMed, DailyMed, ClinicalTrials.gov, RxNorm, and CMS Coverage',
        'Enterprise controls include role-based access, SSO, and audit logs',
      ],
    },
  },
];
