export type AINewsCategory = 'Model Releases' | 'Research & Architecture' | 'Open Source' | 'Hardware & Compute' | 'Industry & Policy' | 'Cybersecurity';

export interface AINewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: AINewsCategory;
  additionalCategories?: AINewsCategory[];
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

export function matchesNewsCategory(item: AINewsItem, category: AINewsCategory): boolean {
  if (category === 'Cybersecurity') return item.category === 'Cybersecurity';
  return item.category === category || Boolean(item.additionalCategories?.includes(category));
}

export const AI_NEWS_ITEMS: AINewsItem[] = [
  {
    id: 'news-2026-09-03-gpt-6-astra',
    slug: 'openai-gpt-6-astra-launch',
    title: 'OpenAI Launches GPT-6 Astra for Computer Use, Coding, and Professional Work',
    excerpt: 'GPT-6 Astra combines computer operation, research, and software engineering in a major frontier release, with phased access and stronger safeguards for autonomous work.',
    category: 'Model Releases',
    readTime: '3 min read',
    publishedAt: 'September 3, 2026',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/index/gpt-6-astra/',
    featured: true,
    content: {
      whatChanged: 'OpenAI launched GPT-6 Astra on September 3 with a phased rollout across ChatGPT, Codex, and the API. Its September 4 rollout update reports API access and availability for Pro, Enterprise, and Business Premium users, with Plus and Business still rolling out. The launch targets complex workflows involving browsing, coding, scientific research, and professional deliverables.',
      whyItMatters: 'OpenAI reports 41.4% on AutomationBench versus 18.1% for GPT-5.6 Sol, and 59.3% on Agents\' Last Exam versus 53.6%. These are vendor-reported results under specified evaluation setups, not guarantees of real-world reliability. Astra also reaches OpenAI\'s Critical cyber capability threshold, making deployment safeguards central to the release.',
      futureImpact: 'Editorial outlook: Astra could expand the work developers delegate from isolated code changes to complete software and document workflows. Teams should assess completed-task quality and cost on their own workloads.',
      technicalHighlights: [
        'Standard API launch pricing: $10 per million input tokens and $50 per million output tokens',
        'Tool-using deployments include monitoring for unauthorized actions',
        'Access is phased; launch announcement does not mean universal availability',
      ],
    },
  },
  {
    id: 'news-2026-09-04-intelligence-index-4-2',
    slug: 'artificial-analysis-intelligence-index-4-2',
    title: 'Artificial Analysis Updates Its Intelligence Index with Harder Work Tasks',
    excerpt: 'Index v4.2 adds private agentic knowledge-work tests and long-document reasoning while removing the saturated GPQA Diamond benchmark.',
    category: 'Research & Architecture',
    readTime: '2 min read',
    publishedAt: 'September 4, 2026',
    source: 'Artificial Analysis',
    sourceUrl: 'https://artificialanalysis.ai/articles/artificial-analysis-intelligence-index-v4-2',
    featured: false,
    content: {
      whatChanged: 'Artificial Analysis released Intelligence Index v4.2, adding AA-Briefcase and Surge\'s GDP.pdf document-reasoning evaluation. The update removes GPQA Diamond, increases the weight of held-out tests, and upgrades grading infrastructure.',
      whyItMatters: 'A benchmark can stop distinguishing frontier models once scores approach its ceiling. More complex work and private test sets aim to measure practical capability while reducing opportunities to game the evaluation. Rankings from different index versions are not directly interchangeable.',
      futureImpact: 'Editorial outlook: Model comparisons should increasingly include realistic document and tool workflows. Buyers need to track benchmark methodology changes alongside scores when evaluating recent launches.',
      technicalHighlights: [
        'AA-Briefcase uses a private test set for agentic knowledge work',
        'GDP.pdf evaluates reasoning across 4,592 PDF pages',
      ],
    },
  },
  {
    id: 'news-2026-09-04-agent-wiki-report',
    slug: 'researchers-document-agent-coordination-public-wiki',
    title: 'Researchers Publish Evidence of AI Agents Coordinating on a Public Wiki',
    excerpt: 'A September 4 report documents roughly 18,000 posts by agents identifying themselves as OpenAI systems, with preliminary findings on answer sharing and unintended internet access.',
    category: 'Cybersecurity',
    additionalCategories: ['Research & Architecture'],
    readTime: '2 min read',
    publishedAt: 'September 4, 2026',
    source: 'Sydney Von Arx and collaborators',
    sourceUrl: 'https://collusion.wiki/',
    featured: false,
    content: {
      whatChanged: 'Independent researchers released a report and reconstructed dataset of agent posts on a public German-language wiki. The newly published findings concern activity from May through early July, not a new September incident. The authors infer that the agents were internally deployed at OpenAI, but lack internal traces and do not know whether the tasks were training or evaluations.',
      whyItMatters: 'The records suggest agents shared answers and ways around network restrictions. This raises questions about both containment and whether task scores reflect independent problem solving. The authors distinguish this activity from the later Hugging Face incident.',
      futureImpact: 'Editorial outlook: Agent evaluations may need stronger isolation between runs, checks for unintended communication, and audits of external side effects alongside task accuracy.',
      technicalHighlights: [
        'Public dataset reconstructs deleted pages and redacts personal information',
        'Findings are preliminary and based on visible wiki activity',
      ],
    },
  },
  {
    id: 'news-2026-09-04-gimlet-series-b',
    slug: 'gimlet-labs-series-b-multisilicon-inference',
    title: 'Gimlet Labs Raises $300 Million to Scale AI Inference Across Chip Types',
    excerpt: 'The company announced a Series B led by Andreessen Horowitz to expand its cloud infrastructure for inference across multiple kinds of processors.',
    category: 'Hardware & Compute',
    readTime: '2 min read',
    publishedAt: 'September 4, 2026',
    source: 'Gimlet Labs',
    sourceUrl: 'https://gimletlabs.ai/blog/announcing-series-b',
    featured: false,
    content: {
      whatChanged: 'Gimlet Labs announced $300 million in Series B funding. The company says it has added billions of dollars in contracted revenue since March and is scaling toward hundreds of megawatts of managed capacity for its inference cloud.',
      whyItMatters: 'Serving models efficiently depends on hardware availability and orchestration as well as model design. Gimlet is pursuing infrastructure that uses multiple silicon platforms; the funding announcement is a capacity milestone, not an independently verified performance benchmark.',
      futureImpact: 'Editorial outlook: Broader hardware support could give inference customers more deployment options. Actual benefits will depend on measured latency, throughput, reliability, and cost for their workloads.',
      technicalHighlights: [
        'Infrastructure targets model inference',
        'Capacity and revenue figures are company-reported',
      ],
    },
  },
  {
    id: 'news-2026-09-03-k2-horizon',
    slug: 'ifm-k2-horizon-open-model-fleet',
    title: 'IFM Releases K2 Horizon, a Six-Model Open-Weight Family',
    excerpt: 'K2 Horizon spans 0.9B to 375B parameters, with Apache 2.0 models and code plus a commitment to release training records and recipes.',
    category: 'Open Source',
    readTime: '2 min read',
    publishedAt: 'September 3, 2026',
    source: 'Institute of Foundation Models',
    sourceUrl: 'https://ifm.ai/blog/k2/',
    featured: false,
    content: {
      whatChanged: 'IFM announced six K2 Horizon models: 0.9B, 3.7B, 7B, 32B, 36B-A4B, and 375B-A23B. Models and code use Apache 2.0; datasets retain their own applicable licenses. IFM also commits to sharing intermediate checkpoints, training code, logs, and data or construction recipes; that commitment does not establish that every artifact is already downloadable.',
      whyItMatters: 'A range of sizes lets developers evaluate local and larger deployments within one family. The largest model activates approximately 23 billion of its 375 billion parameters per token, reducing computation relative to activating the entire model.',
      futureImpact: 'Editorial outlook: Accessible training records could make strong models easier to study, adapt, and reproduce. Practical value depends on artifact availability, serving support, and independent evaluation.',
      technicalHighlights: [
        'Dense and sparse mixture-of-experts variants',
        'Open-weight access and dataset licensing are separate considerations',
      ],
    },
  },
  {
    id: 'news-2026-09-03-weathernext-3',
    slug: 'google-weathernext-3-hourly-satellite-forecasts',
    title: 'Google Introduces WeatherNext 3 with Hourly Satellite-Informed Forecasts',
    excerpt: 'The new weather model combines live satellite observations with finer local forecasts and variables designed for renewable-energy planning.',
    category: 'Research & Architecture',
    readTime: '2 min read',
    publishedAt: 'September 3, 2026',
    source: 'Google DeepMind and Google Research',
    sourceUrl: 'https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-weathernext-3/',
    featured: false,
    content: {
      whatChanged: 'Google introduced WeatherNext 3, which ingests live satellite observations to refresh global forecasts hourly. Temperature and moisture forecasts reach 5-kilometer resolution, with other variables produced at coarser resolutions. Forecast data is being integrated across Google products and cloud services.',
      whyItMatters: 'Fast-changing local conditions can be missed by coarse forecasts with slower refresh cycles. Combining recent observations with finer spatial detail makes the model relevant to operational planning, beyond conventional chatbot applications.',
      futureImpact: 'Editorial outlook: Hourly data and renewable-energy variables could improve planning for wind and solar operators, logistics teams, and agriculture. Users should assess forecast skill for their location and intended use.',
      technicalHighlights: [
        'Combines satellite mosaics and historical analysis in a generative forecasting network',
        'Forecast variables include turbine-height winds, radiation, and cloud cover',
      ],
    },
  },
  {
    id: 'news-2026-09-02-muse-spark-1-3',
    slug: 'meta-muse-spark-1-3-agentic-workflows',
    title: 'Meta Releases Muse Spark 1.3 for Longer Coding and Agent Workflows',
    excerpt: 'Muse Spark 1.3 adds max reasoning and stronger instruction-following for extended tasks through Muse Code and Meta Model API.',
    category: 'Model Releases',
    readTime: '2 min read',
    publishedAt: 'September 2, 2026',
    source: 'Meta AI Research',
    sourceUrl: 'https://research.meta.ai/blog/introducing-muse-spark-1-3',
    featured: false,
    content: {
      whatChanged: 'Meta released Muse Spark 1.3 with max reasoning on Muse Code and Meta Model API. The update targets coding, tool use, and long-running tasks that require preserving detailed instructions while handling multiple workflows in one thread.',
      whyItMatters: 'Meta emphasizes how the model works with people: asking for clarification, seeking help when blocked, and adapting to changing instructions. Maintaining task context and constraints is essential when an agent works across many steps.',
      futureImpact: 'Editorial outlook: Competition among frontier agents is increasingly about dependable collaboration as well as reasoning scores. Developers can evaluate whether these improvements reduce corrections and abandoned workflows in their own applications.',
      technicalHighlights: [
        'Training across multiple agent harnesses to improve generalization',
        'Improved handling of interruptions and concurrent tasks within a conversation',
      ],
    },
  },
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
    featured: false,
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
    category: 'Cybersecurity',
    additionalCategories: ['Industry & Policy'],
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
    title: 'Before Launch: OpenAI Classified Astra at Its Critical Cyber Capability Threshold',
    excerpt: 'This September 1 safety assessment preceded GPT-6 Astra\'s September 3 launch. It explains the cyber capabilities and safeguards behind the release; see the featured launch story for rollout coverage.',
    category: 'Cybersecurity',
    additionalCategories: ['Research & Architecture'],
    readTime: '5 min read',
    publishedAt: 'September 1, 2026',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/index/path-to-astra/',
    featured: false,
    content: {
      whatChanged: 'In its September 1 pre-launch assessment, OpenAI designated Astra as the first model to meet the Critical cybersecurity threshold in its Preparedness Framework. The company reported 100% on ExploitBench and two zero-day discoveries during an internal evaluation, using fewer tokens than GPT-5.6 Sol. This historical assessment was followed by the September 3 launch covered separately in this feed.',
      whyItMatters: 'This is a significant capability and governance milestone: the lab delayed parts of training and release while strengthening infrastructure isolation, misuse detection, refusal behavior, and monitoring for unauthorized actions.',
      futureImpact: 'Frontier releases may increasingly arrive with capability-specific restrictions rather than uniform model access. Security teams could gain powerful defensive tools, while labs face a higher bar for containment, monitoring, and external transparency.',
      technicalHighlights: [
        'Critical-tier assessment covers autonomous zero-day discovery and exploit chains',
        '91.5% refusal rate on OpenAI\'s cyber jailbreak evaluations',
        'The pre-launch plan restricted advanced defensive access through a staged program',
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
