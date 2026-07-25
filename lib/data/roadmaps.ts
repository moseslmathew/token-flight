export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  articleSlug?: string;
}

export interface Roadmap {
  id: string;
  slug: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  iconName: string;
  estimatedTime: string;
  steps: RoadmapStep[];
}

export const ROADMAPS: Roadmap[] = [
  {
    id: 'ai-foundations',
    slug: 'ai-foundations',
    title: 'AI & Machine Learning Foundations',
    level: 'Beginner',
    description: 'Master the core concepts of artificial intelligence, linear algebra intuition, neural networks, and deep learning basics.',
    iconName: 'Brain',
    estimatedTime: '4 Weeks',
    steps: [
      {
        id: 'f-1',
        title: '1. What is AI vs ML vs Deep Learning?',
        description: 'Understand the hierarchy of intelligent systems and rule-based software vs data-driven statistical learning.',
        duration: '3 Days',
        topics: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning'],
        articleSlug: 'understanding-neural-networks-perceptrons-to-backprop',
      },
      {
        id: 'f-2',
        title: '2. Math & Matrix Intuition for AI',
        description: 'Vectors, matrices, dot products, vector spaces, and loss functions simplified.',
        duration: '5 Days',
        topics: ['Vectors & Matrices', 'Dot Product', 'Loss Functions', 'Gradient Descent'],
      },
      {
        id: 'f-3',
        title: '3. Neural Networks & Backpropagation',
        description: 'Build a perceptron and multi-layer network from scratch to understand activation functions and weight updates.',
        duration: '1 Week',
        topics: ['Perceptrons', 'ReLU & GELU', 'Forward Pass', 'Backpropagation'],
        articleSlug: 'understanding-neural-networks-perceptrons-to-backprop',
      },
      {
        id: 'f-4',
        title: '4. Natural Language Processing (NLP) Evolution',
        description: 'From Bag-of-Words and TF-IDF to Word2Vec embeddings and recurrent networks.',
        duration: '1 Week',
        topics: ['Tokenization', 'Embeddings', 'Cosine Similarity'],
      },
    ],
  },
  {
    id: 'llm-engineering',
    slug: 'llm-engineering',
    title: 'Generative AI & LLM Specialist Track',
    level: 'Intermediate',
    description: 'Dive deep into Transformers, attention mechanisms, fine-tuning, RAG pipelines, and production deployment.',
    iconName: 'Cpu',
    estimatedTime: '6 Weeks',
    steps: [
      {
        id: 'l-1',
        title: '1. The Transformer Architecture',
        description: 'Deep dive into Self-Attention, Multi-Head Attention, Positional Encodings, and Q/K/V matrices.',
        duration: '1 Week',
        topics: ['Self-Attention', 'Q K V Matrices', 'Multi-Head Attention'],
        articleSlug: 'demystifying-attention-mechanism-transformers',
      },
      {
        id: 'l-2',
        title: '2. Advanced Prompt Engineering & Chain-of-Thought',
        description: 'Master Few-Shot, CoT, ReAct, and structured JSON output techniques.',
        duration: '4 Days',
        topics: ['Few-Shot', 'Chain of Thought', 'System Prompts', 'Structured Output'],
        articleSlug: 'prompt-engineering-masterclass-chain-of-thought',
      },
      {
        id: 'l-3',
        title: '3. RAG & Vector Database Engineering',
        description: 'Build robust retrieval systems using chunking strategies, embeddings, and vector similarity search.',
        duration: '1.5 Weeks',
        topics: ['Vector Databases', 'Chunking Strategies', 'Hybrid Search', 'RERANKING'],
        articleSlug: 'rag-vs-long-context-windows-deep-dive',
      },
      {
        id: 'l-4',
        title: '4. Parameter-Efficient Fine-Tuning (LoRA/QLoRA)',
        description: 'Adapt open-weights models like Llama or Mistral to domain-specific datasets using low-rank matrices.',
        duration: '2 Weeks',
        topics: ['LoRA', 'QLoRA', 'Dataset Preparation', 'PEFT'],
        articleSlug: 'fine-tuning-llms-lora-low-rank-adaptation',
      },
    ],
  },
  {
    id: 'ai-agents-architect',
    slug: 'ai-agents-architect',
    title: 'Autonomous AI Agents & System Architecture',
    level: 'Advanced',
    description: 'Design multi-agent systems, tool execution environments, agentic workflows, and self-reflecting execution loops.',
    iconName: 'Bot',
    estimatedTime: '5 Weeks',
    steps: [
      {
        id: 'a-1',
        title: '1. ReAct & Function Calling Mechanics',
        description: 'Understand how LLMs parse tool schemas, output structured function arguments, and handle execution outputs.',
        duration: '1 Week',
        topics: ['Function Calling', 'JSON Schema', 'Tool Registration'],
        articleSlug: 'building-autonomous-ai-agents-guide',
      },
      {
        id: 'a-2',
        title: '2. Multi-Agent Systems & Orchestration',
        description: 'Hierarchical agent execution, router agents, critic/reviewer patterns, and parallel tool dispatch.',
        duration: '1.5 Weeks',
        topics: ['Orchestration', 'Multi-Agent', 'Agent Hand-offs', 'State Management'],
      },
      {
        id: 'a-3',
        title: '3. Agent Evaluation & Safety Guardrails',
        description: 'Evaluating tool execution reliability, preventing infinite loops, and securing agent sandboxes.',
        duration: '1 Week',
        topics: ['Agent Eval', 'Guardrails', 'Sandboxing', 'Human-in-the-Loop'],
      },
    ],
  },
];
