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
    slug: 'anthropic-releases-claude-opus-5',
    title: 'Anthropic Unveils Claude Opus 5: Frontier Multimodal & Advanced Agent Reasoning',
    excerpt: 'Anthropic debuts Claude Opus 5, introducing breakthroughs in extended multi-step planning, native computer-use primitives, and state-of-the-art software engineering benchmarks.',
    category: 'Model Releases',
    readTime: '5 min read',
    publishedAt: 'July 25, 2026',
    source: 'Anthropic Research',
    sourceUrl: 'https://www.anthropic.com/news',
    featured: true,
    content: {
      whatChanged: 'Anthropic has officially launched Claude Opus 5, featuring advanced reasoning capabilities, continuous test-time compute scaling, and enhanced browser and desktop UI automation. Opus 5 sets new record evaluation scores on SWE-bench Verified and HumanEval.',
      whyItMatters: 'Opus 5 transitions LLM capabilities from single-turn response generation to long-horizon agent execution. It integrates native self-verification loops, allowing the model to debug its own code iterations before delivering final outputs.',
      futureImpact: 'Redefines enterprise AI workflows by enabling autonomous end-to-end software development, complex data pipeline refactoring, and multi-modal tool orchestration with minimal human supervision.',
      technicalHighlights: [
        'State-of-the-art SWE-bench Verified score',
        'Native continuous test-time compute scaling',
        '1M+ token context window with 99.8% Needle-In-A-Haystack retrieval',
        'Fine-grained UI coordinate resolution for autonomous agent control',
      ],
    },
  },
  {
    id: 'news-2',
    slug: 'open-weights-ai-coalition-statement',
    title: '25 Tech Leaders Launch "Open Weights & AI Leadership" Coalition Statement',
    excerpt: 'NVIDIA, Meta, Microsoft, Hugging Face, IBM, and Y Combinator join forces to advocate for open-source AI model development and open-weight accessibility.',
    category: 'Industry & Policy',
    readTime: '4 min read',
    publishedAt: 'July 24, 2026',
    source: 'NVIDIA Newsroom',
    sourceUrl: 'https://nvidianews.nvidia.com',
    featured: false,
    content: {
      whatChanged: 'A landmark coalition of 25 tech titans released a joint policy letter urging global lawmakers to protect open-weight model architectures. Led by NVIDIA and Meta, the group emphasizes that transparent model parameters drive cybersecurity, academic research, and national competitiveness.',
      whyItMatters: 'Open weights allow researchers, startups, and enterprises to run models locally on custom hardware, audit security vulnerabilities, and fine-tune models on proprietary domain datasets without vendor lock-in.',
      futureImpact: 'Ensures open-source models remain a cornerstone of AI research, preventing monopolistic API gatekeeping and accelerating global community-driven optimization.',
      technicalHighlights: [
        'Backed by NVIDIA, Meta, Microsoft, Hugging Face, and IBM',
        'Advocates for open model parameter weights and transparent safety evaluations',
        'Focuses on local on-premise deployment and custom quantization research',
      ],
    },
  },
  {
    id: 'news-3',
    slug: 'google-launches-gemini-36-flash-trio',
    title: 'Google Releases Gemini 3.6 Flash: Low-Latency Workhorse Models for Agent Loops',
    excerpt: 'Google introduces the Gemini 3.6 Flash model family, optimized for ultra-fast token generation speed, high-volume API throughput, and cost-efficient agentic workflows.',
    category: 'Model Releases',
    readTime: '4 min read',
    publishedAt: 'July 21, 2026',
    source: 'Google DeepMind Blog',
    sourceUrl: 'https://deepmind.google/news',
    featured: false,
    content: {
      whatChanged: 'Google launched Gemini 3.6 Flash alongside 3.5 Flash-Lite and 3.5 Flash Cyber. The models target high-frequency agentic loops where latency and token economics are critical.',
      whyItMatters: 'Instead of chasing raw parameter size, Gemini 3.6 Flash optimizes speculative decoding and distillation techniques to achieve sub-50ms time-to-first-token (TTFT) while maintaining strong reasoning performance.',
      futureImpact: 'Accelerates real-time AI applications such as voice agents, automated log monitoring, and high-frequency code completion assistants at a fraction of traditional API costs.',
      technicalHighlights: [
        'Sub-50ms Time-To-First-Token (TTFT) latency',
        'Optimized for structured JSON output generation and tool calling',
        '70% reduction in token pricing compared to previous Flash generations',
      ],
    },
  },
  {
    id: 'news-4',
    slug: 'deepseek-v4-moe-open-architecture',
    title: 'DeepSeek Previews V4 MoE Architecture with Multi-Head Latent Attention',
    excerpt: 'DeepSeek reveals technical details of its next-generation open-weights Mixture-of-Experts architecture featuring specialized routing and low-precision FP4 KV caching.',
    category: 'Open Source',
    readTime: '5 min read',
    publishedAt: 'July 24, 2026',
    source: 'DeepSeek Research',
    sourceUrl: 'https://github.com/deepseek-ai',
    featured: false,
    content: {
      whatChanged: 'DeepSeek unveiled architectural papers for DeepSeek V4, utilizing Multi-Head Latent Attention (MLA) and DeepSeekMoE fine-grained expert routing to drastically shrink memory overhead during inference.',
      whyItMatters: 'MLA compresses the Key-Value (KV) cache into low-dimensional latent spaces, allowing consumer GPUs to serve massive context windows without memory bandwidth bottlenecks.',
      futureImpact: 'Democratizes high-throughput serving of frontier MoE models on standard server clusters, influencing open-source inference frameworks like vLLM and Ollama.',
      technicalHighlights: [
        'Multi-Head Latent Attention (MLA) for KV cache compression',
        'Fine-grained expert allocation (256 experts with dynamic top-k routing)',
        'FP4 quantization support for ultra-low memory footprint',
      ],
    },
  },
  {
    id: 'news-5',
    slug: 'moonshot-ai-kimi-k3-2-8t-moe',
    title: 'Moonshot AI Releases Kimi K3: 2.8 Trillion Parameter Open MoE Model',
    excerpt: 'Moonshot AI announces Kimi K3, a 2.8T parameter model boasting 2M token context retrieval and specialized mathematical reasoning kernels.',
    category: 'Research & Architecture',
    readTime: '4 min read',
    publishedAt: 'July 22, 2026',
    source: 'Moonshot AI Tech',
    sourceUrl: 'https://www.moonshot.cn',
    featured: false,
    content: {
      whatChanged: 'Kimi K3 scales Mixture-of-Experts parameter count to 2.8 Trillion total parameters while activating only 160B parameters per token. It achieves top scores on multi-step math and coding benchmarks.',
      whyItMatters: 'Demonstrates that ultra-large MoE architectures can achieve linear scaling efficiency when paired with optimized inter-node interconnects and sparse routing matrices.',
      futureImpact: 'Sets a new benchmark for open long-context retrieval, enabling researchers to process entire codebases and books in a single inference call.',
      technicalHighlights: [
        '2.8 Trillion total parameters (160B active per token)',
        '2 Million token context window with 100% retrieval accuracy',
        'Specialized CUDA kernels for sparse tensor matrix operations',
      ],
    },
  },
  {
    id: 'news-6',
    slug: 'nvidia-kaist-agentic-ai-research-center',
    title: 'NVIDIA and KAIST Launch $300M Joint Agentic AI Research Institute',
    excerpt: 'NVIDIA partners with KAIST to fund next-generation research into industrial agentic AI, physical simulation, and GPU cluster interconnects.',
    category: 'Hardware & Compute',
    readTime: '3 min read',
    publishedAt: 'July 25, 2026',
    source: 'NVIDIA Press Release',
    sourceUrl: 'https://nvidianews.nvidia.com',
    featured: false,
    content: {
      whatChanged: 'NVIDIA and KAIST announced a $300 Million, 5-year partnership to build a state-of-the-art research facility dedicated to agentic AI, robotics simulation, and hardware-software co-design.',
      whyItMatters: 'Focuses on bridging synthetic data generation, physical world simulation (Omniverse), and hardware accelerator design for autonomous systems.',
      futureImpact: 'Will produce next-generation open research in autonomous agent safety, distributed multi-GPU training, and real-time physical simulation.',
      technicalHighlights: [
        '$300 Million 5-year research grant',
        'Focus on hardware-software co-design for agentic AI clusters',
        'Integration with NVIDIA NVLink 5 and Blackwell supercomputers',
      ],
    },
  },
];
