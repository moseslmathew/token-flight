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
      /** Key of an animated explainer rendered under this section (see components/ArticleVisual.tsx) */
      visual?: string;
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
    id: '6',
    slug: 'what-is-mixture-of-experts-moe-explained-simply',
    title: 'What Is a Mixture of Experts? MoE for LLMs, Explained Simply',
    excerpt: 'Why modern LLMs keep a hundred specialists on staff and wake only two of them for each word — routing, top-K sparsity, load balancing, and the memory bill nobody mentions.',
    category: 'LLMs',
    difficulty: 'Beginner',
    readTime: '9 min read',
    publishedAt: 'July 2026',
    author: {
      name: 'AI Engineering Team',
      role: 'Research & Technical Writing',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    tags: ['Mixture of Experts', 'MoE', 'Routing', 'Sparsity', 'Mixtral', 'Architecture'],
    featured: true,
    content: {
      intro: 'A "Mixture of Experts" model is a large language model that has learned to be lazy in a very deliberate way. It keeps an enormous amount of knowledge on hand, but for every single word it processes it wakes up only a tiny slice of itself. This one trick is why a model can be huge and fast at the same time — and it is behind most of the frontier models you have used this year.',
      sections: [
        {
          heading: '1. The Problem: One Brain That Has To Do Everything',
          body: 'Picture a normal ("dense") language model as a single, extraordinarily well-read person. They know Python, medieval history, tax law, Tamil poetry, and how to write a polite refusal email.\n\nThe catch is how they think. Every time they read one word — just one — they mentally leaf through everything they know before responding. Reading the word "the" costs exactly as much effort as reading a subtle line of code.\n\nThat is literally what happens inside a dense model. Every parameter is multiplied by every token. Doubling the model\'s knowledge doubles the cost of every word, forever. Bigger models are smarter, and bigger models are slower and pricier, and for a long time there was no way to have one without the other.',
          visual: 'moe-dense-vs-sparse',
          keyTakeaway: 'In a dense model, knowledge and cost are welded together. Want more knowledge? You pay for it on every single token.',
        },
        {
          heading: '2. The Big Idea: A Reception Desk and a Corridor of Specialists',
          body: 'Now picture a hospital instead of one over-worked doctor.\n\nYou walk in with a broken wrist. Nobody makes the cardiologist, the dermatologist and the psychiatrist all examine you and then average their opinions. A receptionist glances at your case, sends you down the corridor to orthopaedics, and the other forty specialists carry on with their day. The hospital still contains all that expertise. Your visit just does not pay for it.\n\nThat is a Mixture of Experts. Inside each layer of the model, instead of one big block of computation that every token passes through, there are many parallel blocks — the "experts" — plus a small piece of the network whose only job is to decide who sees this token. That decider is called the router, or gating network.\n\nOne important detail people usually get wrong: the experts do not replace the whole model. In a transformer, attention (the part where words look at each other) stays dense and shared — every token still goes through it. It is the feed-forward block, the part that does the heavy per-token "thinking", that gets split into experts. So a "128-expert model" is really a stack of layers where each layer has 128 alternative feed-forward blocks and picks a couple.',
          keyTakeaway: 'MoE swaps one big thinking block per layer for many small ones, plus a router that decides which ones get to run.',
        },
        {
          heading: '3. Meet the Router: How the Model Decides Who Answers',
          body: 'The router is almost insultingly simple. It is a small matrix that takes the token\'s vector and produces one score per expert. Those scores go through a softmax so they become something like probabilities: 0.62 for Expert 1, 0.23 for Expert 2, and so on.\n\nThen the model keeps the top few and throws the rest away. The chosen experts each produce an answer, and those answers are blended together, weighted by how confident the router was. The skipped experts cost nothing — not "a little", but genuinely nothing. Their weights sit in memory untouched.\n\nWatch it happen one step at a time:',
          visual: 'moe-router',
        },
        {
          heading: '4. Top-K Routing: Why Only 2 Out of 128?',
          body: 'The number of experts allowed to answer is called K, as in "top-K routing". It is the single dial that controls how lazy the model is allowed to be.\n\n- K = 1 is the most extreme. Google\'s Switch Transformer did this, which is how they reached 1.6 trillion parameters back in 2021 without a proportional compute bill.\n- K = 2 became the popular sweet spot. Mixtral 8x7B picks 2 of its 8 experts per layer.\n- K = 8 out of 256 is where models like DeepSeek-V3 landed — many more, much smaller experts, so the routing decision gets finer-grained.\n\nWhy not K = 1 everywhere, since it is cheapest? Because with a single expert the routing decision is brutally all-or-nothing, gradients get noisy, and training becomes unstable. Picking two gives the model a blend to fall back on and something smoother to learn from.\n\nDrag the dial below and watch what fraction of the model you are actually paying for:',
          visual: 'moe-topk',
          codeSnippet: {
            language: 'python',
            code: `import torch
import torch.nn.functional as F

def moe_layer(x, router, experts, k=2):
    # x: one token's vector, shape (d_model,)

    # 1. Score every expert — this is the whole router
    logits = router(x)                       # (num_experts,)
    probs  = F.softmax(logits, dim=-1)

    # 2. Keep only the k best
    weights, idx = torch.topk(probs, k)      # (k,), (k,)
    weights = weights / weights.sum()         # renormalise to sum to 1

    # 3. Run ONLY those k experts. The rest never execute.
    out = torch.zeros_like(x)
    for w, i in zip(weights, idx):
        out += w * experts[i](x)

    return out`,
          },
          keyTakeaway: 'K is the sparsity dial. 2 of 128 experts means you store 128 blocks of knowledge but pay for roughly 1.6% of them per token.',
        },
        {
          heading: '5. What Do the Experts Actually Specialise In?',
          body: 'Here is where almost everyone\'s intuition goes wrong. It is tempting to imagine Expert 3 is "the biology expert" and Expert 7 is "the French expert", like consultants with brass name plates on their doors.\n\nThat is not what researchers find. Nobody assigns experts a subject. They are identical empty blocks at the start of training, and the specialisation that emerges is statistical, not human. Experts drift toward low-level patterns: one gravitates to punctuation and sentence structure, another to digits, another to code-ish token shapes, another to word fragments from non-English scripts. Useful, but not a topic you could put on a business card.\n\nThe second surprise: routing is decided per token, not per prompt or per sentence. A single sentence can be sprayed across a dozen different experts, and the same word can be routed differently depending on what surrounds it — because by the time the router sees the token, attention has already mixed the context into its vector.\n\nThe classic demonstration is a word with two meanings:',
          visual: 'moe-context-routing',
          keyTakeaway: 'Experts are not subject-matter departments. They are statistical neighbourhoods that emerged on their own, and routing is decided fresh for every token.',
        },
        {
          heading: '6. The Traffic Jam Problem: Load Balancing',
          body: 'MoE has an unglamorous failure mode that dominates the engineering effort: the model plays favourites.\n\nEarly in training, one expert gets slightly better by luck. The router notices and sends it more tokens. More tokens means more training signal, which makes it better still, which earns it even more tokens. Meanwhile the neglected experts get almost no data, never improve, and quietly become dead weight — parameters you paid for in memory that contribute nothing. Researchers call this routing collapse.\n\nIt gets worse in practice, because on real hardware each expert lives on a particular GPU and is given a fixed capacity — a maximum number of tokens it will accept per batch. Overflow tokens get dropped, meaning they skip the expert layer entirely and pass through unchanged. So a popular expert does not just hog resources; it actively costs you quality on the tokens it turned away.\n\nThe standard fix is an auxiliary load-balancing loss: a small extra penalty during training that nudges the router toward spreading traffic evenly. Newer models like DeepSeek-V3 go further and adjust a per-expert bias term instead, balancing load without an extra loss term fighting the main objective.\n\nToggle between the two worlds:',
          visual: 'moe-load-balance',
          codeSnippet: {
            language: 'python',
            code: `def load_balancing_loss(probs, expert_idx, num_experts):
    """Penalise routers that funnel everything into one expert."""
    # f: fraction of tokens actually sent to each expert
    f = torch.bincount(expert_idx, minlength=num_experts).float()
    f = f / expert_idx.numel()

    # P: average routing probability given to each expert
    P = probs.mean(dim=0)

    # Minimised when both are flat (1/num_experts each)
    return num_experts * torch.sum(f * P)`,
          },
          keyTakeaway: 'Left alone, routers collapse onto a few favourite experts. Keeping traffic spread out is the hardest part of training an MoE.',
        },
        {
          heading: '7. The Real Trade-off: Cheap Compute, Expensive Memory',
          body: 'MoE is often sold as "a cheaper model". That is only half true, and the missing half matters if you ever plan to run one.\n\nYou still have to load every expert into memory. All of them. The router cannot know in advance which experts the next token will want, so every expert must be sitting there ready. Mixtral 8x7B holds roughly 46.7 billion parameters, and you need GPU memory for all 46.7 billion — but each token only touches about 12.9 billion of them.\n\nSo the honest summary is: MoE trades memory for speed. You buy the answers of a big model at the running cost of a small one, and you pay for it in VRAM.\n\nThere are two more costs worth knowing. Experts are usually spread across GPUs, so every layer involves shuffling tokens between devices over the network — an all-to-all communication step that can eat the savings if your interconnect is slow. And with small batches you can end up loading an expert\'s weights to serve just a handful of tokens, which is a poor use of memory bandwidth. MoE shines at scale; it is often a bad deal on a single consumer GPU.',
          visual: 'moe-memory-compute',
          keyTakeaway: 'MoE does not make the model smaller. It makes each token cheaper. Memory stays big — that is the bill you are trading into.',
        },
        {
          heading: '8. Where You Have Already Met MoE',
          body: 'The idea is not new. Sparsely-gated MoE for neural networks was published by Shazeer and colleagues in 2017, and the underlying "mixture of experts" concept dates back to the early 1990s. What changed is that models got large enough for the trade to be worth making.\n\n- Switch Transformer (Google, 2021) — top-1 routing, up to 1.6T parameters. The proof that extreme sparsity trains at all.\n- Mixtral 8x7B (Mistral, 2023) — 8 experts, top-2, ~46.7B stored and ~12.9B active. The release that made open-weight MoE mainstream.\n- DeepSeek-V3 — 671B total parameters, ~37B active, with 256 fine-grained routed experts plus a shared expert that every token always uses, so common knowledge is not duplicated 256 times.\n- Qwen and several other open-weight families now ship MoE variants alongside dense ones.\n- GPT-4 is widely reported to be an MoE, though this has never been officially confirmed.\n\nWhen you next read that a model has "600B parameters but only 30B active", you now know exactly what that sentence is describing: a corridor of specialists, a receptionist deciding who sees you, and forty other doors that stayed shut.',
        },
      ],
      summary: 'A Mixture of Experts replaces one big feed-forward block per layer with many small ones and a router that picks a handful per token. The result is a model that stores far more knowledge than it spends on any single word. The costs are real but different from what people expect: memory stays large, routing must be kept balanced or it collapses, and the specialists that emerge are statistical patterns rather than subject-matter departments.',
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
