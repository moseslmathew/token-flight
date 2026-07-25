export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'LLMs' | 'Machine Learning';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  featured?: boolean;
  content: {
    intro: string;
    sections: {
      heading: string;
      body: string;
      codeSnippet?: {
        language: string;
        code: string;
      };
      keyTakeaway?: string;
    }[];
    summary: string;
  };
}

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'how-an-llm-gets-its-vocabulary-bpe-from-scratch',
    title: 'How an LLM Gets Its Vocabulary — BPE from Scratch',
    excerpt: 'A visual, step-by-step breakdown of how Large Language Models use Byte Pair Encoding (BPE) to build vocabulary and tokenize text.',
    category: 'LLMs',
    difficulty: 'Intermediate',
    readTime: '7 min read',
    publishedAt: 'July 2026',
    author: {
      name: 'AI Engineering Team',
      role: 'Research & Technical Writing',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    tags: ['BPE', 'Tokenization', 'LLMs', 'Python', 'tiktoken'],
    featured: true,
    content: {
      intro: 'Before an LLM like GPT-4 or Claude can process a prompt, text must be converted into numerical tokens. Byte Pair Encoding (BPE) is the industry standard subword tokenization algorithm that creates this vocabulary.',
      sections: [
        {
          heading: '1. Build Time vs. Runtime Tokenization',
          body: 'Tokenization has two distinct phases:\n\n- Build Time: The model scans massive corpora of text, counts adjacent character pairs, and iteratively merges the most frequent pairs to build a fixed vocabulary rule-set.\n- Runtime: When you type a prompt, those pre-computed rules convert your raw text string into token IDs in milliseconds.',
          keyTakeaway: 'Build time creates the frozen token vocabulary rules; runtime applies them to incoming text.',
        },
        {
          heading: '2. The BPE Merge Algorithm Step-by-Step',
          body: 'BPE starts with individual characters as base tokens. It iteratively finds the most frequent pair of adjacent tokens and creates a new merged token until reaching the target vocabulary size (e.g. 100,000 tokens in GPT-4).',
          codeSnippet: {
            language: 'python',
            code: `def get_stats(ids):
    counts = {}
    for pair in zip(ids, ids[1:]):
        counts[pair] = counts.get(pair, 0) + 1
    return counts

def merge(ids, pair, idx):
    newids = []
    i = 0
    while i < len(ids):
        if i < len(ids) - 1 and ids[i] == pair[0] and ids[i+1] == pair[1]:
            newids.append(idx)
            i += 2
        else:
            newids.append(ids[i])
            i += 1
    return newids`,
          },
        },
        {
          heading: '3. Handling Typos and Subword Efficiency',
          body: 'Because BPE falls back to raw bytes or individual characters for unseen words, typos like "teh" or rare technical terms can still be represented without throwing out-of-vocabulary errors.',
        },
      ],
      summary: 'Byte Pair Encoding balances vocabulary size and sequence length. Implementing BPE from scratch demystifies how models see words as numbers.',
    },
  },
  {
    id: '2',
    slug: 'how-ai-turns-words-into-numbers-embeddings',
    title: 'How AI Turns Words Into Numbers: Vector Embeddings Explained',
    excerpt: 'Discover how dense vector embeddings map words and concepts into high-dimensional geometric space where similarity equals distance.',
    category: 'LLMs',
    difficulty: 'Beginner',
    readTime: '4 min read',
    publishedAt: 'July 2026',
    author: {
      name: 'AI Engineering Team',
      role: 'Research & Technical Writing',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    tags: ['Embeddings', 'Vector Space', 'Cosine Similarity', 'NLP'],
    featured: false,
    content: {
      intro: 'Token IDs are integers, but integers carry no semantic meaning. Vector embeddings solve this by transforming tokens into dense vectors in 1,536+ dimensions.',
      sections: [
        {
          heading: '1. Geometric Semantic Relationships',
          body: 'In an embedding space, words with similar meanings (e.g. "king" and "queen", or "cat" and "kitten") are positioned close to each other. Vector arithmetic like King - Man + Woman = Queen actually holds true geometrically.',
          keyTakeaway: 'Embeddings capture semantic nuance by placing related concepts near each other in multi-dimensional space.',
        },
        {
          heading: '2. Measuring Similarity with Cosine Distance',
          body: 'Cosine similarity measures the angle between two vectors regardless of magnitude. A cosine score of 1.0 means identical directional meaning.',
          codeSnippet: {
            language: 'python',
            code: `import numpy as np

def cosine_similarity(vec1, vec2):
    dot_product = np.dot(vec1, vec2)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)
    return dot_product / (norm_vec1 * norm_vec2)`,
          },
        },
      ],
      summary: 'Embeddings are the fundamental language of neural networks, bridging discrete text and continuous mathematical spaces.',
    },
  },
  {
    id: '3',
    slug: 'how-machine-learning-actually-works-part-1',
    title: 'How Machine Learning Actually Works | Technical Guide (Part 1)',
    excerpt: 'An intuitive conceptual breakdown of inputs, features, weights, biases, predictions, and automated learning loops.',
    category: 'Machine Learning',
    difficulty: 'Beginner',
    readTime: '10 min read',
    publishedAt: 'June 2026',
    author: {
      name: 'AI Engineering Team',
      role: 'Research & Technical Writing',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    tags: ['Machine Learning', 'Supervised Learning', 'Weights', 'Loss Function'],
    featured: true,
    content: {
      intro: 'Traditional software relies on explicit human-written rules (`if/else`). Machine learning flips this paradigm: you provide data and expected outcomes, and the algorithm learns the underlying rules.',
      sections: [
        {
          heading: '1. Data, Features, and Target Labels',
          body: 'Every machine learning problem breaks down into:\n\n- Features (X): The input variables (e.g. house size, location, bedrooms).\n- Target (y): The value we want to predict (e.g. house price).\n- Model Weights (W): Parameters adjusted iteratively to minimize prediction error.',
        },
        {
          heading: '2. The Training Loop in 4 Steps',
          body: '1. Predict: Model makes initial guess using current weights.\n2. Calculate Loss: Compute difference between guess and real label.\n3. Compute Gradient: Determine which weights caused the error.\n4. Update: Adjust weights slightly in the right direction.',
        },
      ],
      summary: 'Machine learning is parameter optimization over historical data to predict future unseen outcomes.',
    },
  },
  {
    id: '4',
    slug: 'the-math-behind-ai-part-2',
    title: 'The Math Behind AI | Technical Guide (Part 2)',
    excerpt: 'Demystifying the core linear algebra and calculus principles powering modern artificial intelligence models.',
    category: 'Machine Learning',
    difficulty: 'Beginner',
    readTime: '6 min read',
    publishedAt: 'June 2026',
    author: {
      name: 'AI Engineering Team',
      role: 'Research & Technical Writing',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    tags: ['Math', 'Linear Algebra', 'Gradient Descent', 'Loss Function'],
    featured: false,
    content: {
      intro: 'Behind complex AI architectures like LLMs and Computer Vision systems lies surprisingly accessible mathematics: dot products, partial derivatives, and gradient descent.',
      sections: [
        {
          heading: '1. Vectors and Matrix Operations',
          body: 'A vector is an ordered list of numbers. Matrix multiplication combines inputs and weights across neural network layers.',
        },
        {
          heading: '2. Gradient Descent & Loss Functions',
          body: 'Gradient descent is like navigating down a foggy mountain toward the lowest point (minimal loss). Derivatives tell the algorithm which slope leads downhill.',
          codeSnippet: {
            language: 'python',
            code: `# Single-parameter gradient descent step
weight = weight - learning_rate * gradient`,
          },
        },
      ],
      summary: 'Understanding matrix dot products and gradient descent builds strong intuition for deep learning.',
    },
  },
  {
    id: '5',
    slug: 'linear-regression-in-python-part-3',
    title: 'Linear Regression in Python | Technical Guide (Part 3)',
    excerpt: 'Build a complete linear regression model from scratch in Python to predict continuous numerical values.',
    category: 'Machine Learning',
    difficulty: 'Intermediate',
    readTime: '12 min read',
    publishedAt: 'June 2026',
    author: {
      name: 'AI Engineering Team',
      role: 'Research & Technical Writing',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    },
    tags: ['Linear Regression', 'Python', 'Scikit-Learn', 'Cost Function'],
    featured: false,
    content: {
      intro: 'Linear Regression is the fundamental baseline model of machine learning. It fits a straight line (`y = mx + b`) to data points.',
      sections: [
        {
          heading: '1. Mean Squared Error (MSE) Cost Function',
          body: 'MSE measures average squared difference between predictions and actual values:\n\nMSE = (1/n) * sum((y_pred - y_true)^2)',
          codeSnippet: {
            language: 'python',
            code: `import numpy as np

def compute_cost(X, y, w, b):
    m = len(y)
    predictions = X * w + b
    cost = (1 / (2 * m)) * np.sum((predictions - y) ** 2)
    return cost`,
          },
        },
      ],
      summary: 'Mastering single-variable linear regression provides the foundation for multi-variable models and neural networks.',
    },
  },
];
