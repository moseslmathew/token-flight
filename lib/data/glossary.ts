export interface GlossaryTerm {
  id: string;
  term: string;
  category: 'LLMs & NLP' | 'Neural Nets' | 'Agents & Tools' | 'Training & Hardware' | 'Safety & Alignment';
  definition: string;
  simpleAnalogy: string;
  formulaOrCode?: string;
  relatedTerms: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'attention-mechanism',
    term: 'Attention Mechanism',
    category: 'LLMs & NLP',
    definition: 'A mechanism in neural networks that allows the model to dynamically compute weights for different tokens in an input sequence based on their contextual relevance.',
    simpleAnalogy: 'Like a highlighter when reading a long document—drawing your eye directly to key related words regardless of how far apart they are.',
    formulaOrCode: 'Attention(Q, K, V) = Softmax((Q * K^T) / sqrt(d_k)) * V',
    relatedTerms: ['Transformers', 'Self-Attention', 'Multi-Head Attention', 'Query Key Value'],
  },
  {
    id: 'embeddings',
    term: 'Vector Embeddings',
    category: 'LLMs & NLP',
    definition: 'High-dimensional numerical array representations of text, images, or audio where semantically similar items are positioned close together in vector space.',
    simpleAnalogy: 'A 3D coordinate system for concepts. "King" - "Man" + "Woman" results in a vector point very close to "Queen".',
    formulaOrCode: 'cosine_similarity(A, B) = (A · B) / (||A|| * ||B||)',
    relatedTerms: ['Vector DB', 'Cosine Similarity', 'RAG', 'Latent Space'],
  },
  {
    id: 'temperature',
    term: 'Temperature (Sampling)',
    category: 'LLMs & NLP',
    definition: 'A hyperparameter that controls the randomness/creativity of token selection during text generation. Lower values (e.g. 0.1) make outputs deterministic, higher (e.g. 0.8) increase variety.',
    simpleAnalogy: 'A volume knob for creativity. Low temp = cautious librarian; High temp = brainstorming poet.',
    formulaOrCode: 'P(token_i) = exp(logit_i / T) / sum(exp(logit_j / T))',
    relatedTerms: ['Top-P', 'Top-K', 'Logits', 'Greedy Search'],
  },
  {
    id: 'react-pattern',
    term: 'ReAct Pattern (Reason + Act)',
    category: 'Agents & Tools',
    definition: 'An agent prompting paradigm where the LLM explicitly generates a Thought step followed by an Action step, then receives an Observation before repeating.',
    simpleAnalogy: 'Like a detective solving a case: "I think I should check the footprint (Thought) -> Search DB (Action) -> Footprint matches suspect A (Observation)".',
    relatedTerms: ['AI Agent', 'Tool Calling', 'Chain of Thought', 'Planning'],
  },
  {
    id: 'rag',
    term: 'RAG (Retrieval-Augmented Generation)',
    category: 'LLMs & NLP',
    definition: 'An architecture that retrieves relevant document chunks from a knowledge base using vector search and appends them to the prompt context before generating an answer.',
    simpleAnalogy: 'Taking an open-book exam: looking up the exact chapter in a textbook right before writing down your answer.',
    relatedTerms: ['Embeddings', 'Vector Search', 'Chunking', 'Context Window'],
  },
  {
    id: 'lora',
    term: 'LoRA (Low-Rank Adaptation)',
    category: 'Training & Hardware',
    definition: 'A Parameter-Efficient Fine-Tuning (PEFT) technique that freezes pretrained model weights and injects low-rank trainable decomposition matrices into attention layers.',
    simpleAnalogy: 'Modifying a book by putting transparent sticky notes with minor corrections over pages instead of reprinting the entire book.',
    formulaOrCode: 'W_new = W_frozen + (A * B) * (alpha / r)',
    relatedTerms: ['PEFT', 'Fine-Tuning', 'Quantization', 'QLoRA'],
  },
  {
    id: 'rlhf',
    term: 'RLHF (Reinforcement Learning from Human Feedback)',
    category: 'Safety & Alignment',
    definition: 'A technique that uses human preference rankings to train a reward model, which is then used to optimize the LLM via policy gradient algorithms like PPO or DPO.',
    simpleAnalogy: 'Training a dog with treats: rewarding desirable behaviors (helpful, safe responses) and withholding rewards for unwanted ones.',
    relatedTerms: ['DPO', 'Reward Model', 'PPO', 'Alignment'],
  },
  {
    id: 'backpropagation',
    term: 'Backpropagation',
    category: 'Neural Nets',
    definition: 'The fundamental algorithm for training neural networks. It calculates the gradient of the loss function with respect to each weight using the calculus chain rule.',
    simpleAnalogy: 'Tracing a culinary mistake back through the recipe steps to adjust ingredient proportions for next time.',
    formulaOrCode: 'dL/dw = (dL/dy) * (dy/dz) * (dz/dw)',
    relatedTerms: ['Gradient Descent', 'Loss Function', 'Chain Rule', 'Weights & Biases'],
  },
  {
    id: 'quantization',
    term: 'Quantization (INT8 / INT4)',
    category: 'Training & Hardware',
    definition: 'Converting high-precision floating point model weights (e.g. FP16/FP32) into lower-bit representations (e.g. INT8 or INT4) to reduce RAM/VRAM footprint.',
    simpleAnalogy: 'Compressing a 4K video to 1080p—saving vast storage while keeping 95% of the visual quality.',
    relatedTerms: ['GGUF', 'AWQ', 'VRAM', 'VLLM'],
  },
  {
    id: 'context-window',
    term: 'Context Window',
    category: 'LLMs & NLP',
    definition: 'The maximum number of tokens (words/subwords) a model can process in a single interaction (including system prompt, history, and generated output).',
    simpleAnalogy: 'The size of an LLM\'s short-term working memory workbench.',
    relatedTerms: ['Tokens', 'Attention', 'RAG', 'KV Cache'],
  },
];
