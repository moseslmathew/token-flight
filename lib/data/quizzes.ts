export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const AI_QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'In the Transformer Attention formula Attention(Q, K, V) = softmax((Q * K^T) / sqrt(d_k)) * V, why are scores divided by sqrt(d_k)?',
    options: [
      'To convert scores to floating point integers.',
      'To prevent gradients from vanishing during softmax when key dimensions are large.',
      'To reduce the number of trainable parameters in the model.',
      'To force the attention matrix to become symmetric.',
    ],
    correctAnswer: 1,
    explanation: 'Dividing by sqrt(d_k) scales down large dot-product magnitudes, preventing softmax from pushing values into regions with extremely small gradients.',
  },
  {
    id: 2,
    question: 'What does the ReAct framework in AI Agent engineering stand for?',
    options: [
      'Reactive Activation Network',
      'Reasoning and Acting',
      'Recurrent Action Controller',
      'Real-time Activity Tracker',
    ],
    correctAnswer: 1,
    explanation: 'ReAct combines Reason (internal thinking/planning) and Act (executing actions/tools) in an iterative loop.',
  },
  {
    id: 3,
    question: 'Which PEFT (Parameter-Efficient Fine-Tuning) method decomposes weight updates into low-rank matrices A and B?',
    options: ['RAG', 'LoRA', 'DPO', 'RLHF'],
    correctAnswer: 1,
    explanation: 'LoRA (Low-Rank Adaptation) freezes original model weights and trains small rank-decomposition matrices A and B.',
  },
  {
    id: 4,
    question: 'What happens when you set the LLM Sampling Temperature to 0.0?',
    options: [
      'The model generates completely random gibberish.',
      'The model uses Greedy Decoding, always picking the single token with highest probability.',
      'The model shuts down to prevent context window overflow.',
      'The model quadruples its output speed.',
    ],
    correctAnswer: 1,
    explanation: 'Temperature 0 results in greedy decoding, always picking the top logit token, making responses deterministic.',
  },
  {
    id: 5,
    question: 'What is the primary advantage of Retrieval-Augmented Generation (RAG)?',
    options: [
      'It changes the underlying neural weights of the LLM.',
      'It grounds responses in external private or up-to-date data without full model retraining.',
      'It eliminates the need for any context window limit.',
      'It automatically writes Python code for GPU optimization.',
    ],
    correctAnswer: 1,
    explanation: 'RAG retrieves relevant knowledge chunks at runtime and supplies them in context, grounding the LLM in accurate data.',
  },
];
