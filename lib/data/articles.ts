export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'LLMs' | 'Machine Learning';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime?: string;
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
    excerpt: 'Build a tokenizer by hand from a single sentence: split into characters, count adjacent pairs, merge the most frequent, repeat. By the end you will know exactly why "main" is two tokens and the typo "teh" is three.',
    category: 'LLMs',
    difficulty: 'Intermediate',
    readTime: '9 min read',
    publishedAt: 'July 2026',
    author: {
      name: 'AI Engineering Team',
      role: 'Research & Technical Writing',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    tags: ['BPE', 'Tokenization', 'LLMs', 'Python', 'tiktoken'],
    featured: true,
    content: {
      intro: 'Take the word "unbelievable". A language model does not see letters, and it does not see the whole word either. It sees three pieces — un, believe, able. Those pieces are called tokens, and no human chose them. They were learned by an algorithm called Byte Pair Encoding, which you can follow all the way through by hand.',
      sections: [
        {
          heading: '1. An Algorithm With a Surprising Past',
          body: 'Byte Pair Encoding was not invented for language at all.\n\nIn 1994 Philip Gage published it as a file compression trick: find the most common pair of bytes, replace it with a single unused byte, and repeat. That was the entire idea.\n\nIn 2016, machine translation researchers borrowed it for a completely different problem — rare words. If you can break unfamiliar words into familiar fragments, your model never has to admit it has never seen something. In 2019 OpenAI trained GPT-2 with it, and today it is the standard behind GPT-4, Llama, and most models you use.',
          visual: 'bpe-history',
        },
        {
          heading: '2. The Setup: One Sentence',
          body: 'To watch the algorithm work, the training data needs to be small enough to follow by eye. So: one sentence.\n\n"The train came in the rain again."\n\nThe first thing BPE does is split that into words and count each one. "The" appears twice; everything else appears once.\n\nThat is genuinely all it needs — a table of words and how often they occur. Real tokenizers do exactly this, just over billions of sentences instead of one.',
        },
        {
          heading: '3. Split, Count, Merge — the Whole Loop',
          body: 'From here the algorithm does the same three things over and over.\n\nStep one: split every word into individual characters. Each distinct character becomes a starting entry in the vocabulary — ten of them for our sentence.\n\nStep two: count every pair of neighbouring characters, weighted by how often the word appears. In our sentence, i followed by n wins with a count of four: it turns up in train, in, rain and again.\n\nStep three: the winner gets merged. Every i next to n fuses into a single new token, in — in all four words at once. That merge is saved as rule number one, and the vocabulary grows to eleven.\n\nStep four is simply: repeat.',
          visual: 'bpe-train',
          keyTakeaway: 'Split, count, merge, repeat. Everything else about tokenization is detail on top of these three moves.',
        },
        {
          heading: '4. What You End Up With',
          body: 'After four rounds the vocabulary contains fourteen tokens: the ten characters it started with, plus the four merges it learned — in, ain, th, and the.\n\nNotice the last one. Nobody told the algorithm that "the" is an English word. It merged t with h because that pair was frequent, then merged th with e for the same reason. A whole word fell out of pure frequency counting.\n\nThe rules matter as much as the tokens. The vocabulary tells you which pieces exist; the ordered list of merges tells you how to rebuild any word from them. Big models run this identical loop, just until the vocabulary reaches about 100,000 entries.',
        },
        {
          heading: '5. A Word It Has Never Seen',
          body: 'Here is the test that matters. Take "main" — a word that appears nowhere in our training sentence.\n\nSplit it into characters: m, a, i, n. Now apply the learned rules in the order they were learned. Rule one, i + n, matches — we get m, a, in. Rule two, a + in, matches — we get m, ain. Rules three and four find nothing.\n\n"main" is two tokens, both of which the vocabulary already knows, from a word the algorithm never saw during training.\n\nNow try the typo. "the" is a single token, but "teh" matches no rule at all — there is no t beside an h — so it falls back to three separate characters: t, e, h. It still works. That is the safety net: because every character is in the vocabulary, nothing is ever out-of-vocabulary, and tokenization never fails.',
          visual: 'bpe-encode',
          keyTakeaway: 'Common words collapse to one token; unfamiliar ones decompose into pieces; broken ones fall all the way back to characters. Nothing is ever unknown.',
        },
        {
          heading: '6. From Tokens to Numbers',
          body: 'The model still cannot use "m" and "ain" — it needs numbers.\n\nThis is where the vocabulary does its second job. It is also a lookup table: every token sits at a position, and that position is its ID. In our fourteen-token vocabulary, m is token 6 and ain is token 11. So "main" becomes the pair 6, 11.\n\nText in, numbers out. From this point on, the model only ever sees the numbers.\n\nGPT-4 does exactly this, with a table that scrolls on for 100,000 entries. Same idea, same lookup — just a much longer list.',
        },
        {
          heading: '7. Build Time and Run Time',
          body: 'It helps to see the whole thing as two halves that happen at completely different moments.\n\nThe top half — build time — happened once, at OpenAI. Billions of pages of text, count, merge, repeat about 100,000 times. The finished vocabulary and its merge rules were then frozen and shipped inside a library.\n\nThe bottom half — run time — happens on your machine, every single time you type. Your text runs through those saved rules, becomes tokens, flips into IDs, and heads for the model.\n\nTrained once. Used on every prompt. Nothing is being learned while you type; the rules were settled long ago.',
          visual: 'bpe-pipeline',
          keyTakeaway: 'Build time creates the frozen vocabulary and merge rules; run time only applies them. That is why tokenizing a prompt takes microseconds.',
        },
        {
          heading: '8. Three Lines of Python',
          body: 'In production this ships as tiktoken — open source, written in Rust, released by OpenAI, and the tokenizer behind GPT-4. Its 100,000-token vocabulary was built exactly the way you just watched, only on massive amounts of web text.\n\nUsing it takes three lines.\n\nTwo details are worth noticing in the output. Even the word "tiktoken" gets split into pieces the vocabulary already knows — t, ik, token. And the spaces are not separate tokens; they live inside the tokens themselves, which is how decoding glues the sentence back together perfectly.',
          codeSnippet: {
            language: 'python',
            code: `import tiktoken

enc = tiktoken.encoding_for_model("gpt-4")

ids = enc.encode("tiktoken is great")
enc.decode(ids)                      # 'tiktoken is great' — exactly what went in

# Look at the pieces themselves, spaces and all
[enc.decode([i]) for i in ids]
# ['t', 'ik', 'token', ' is', ' great']`,
          },
        },
        {
          heading: '9. The Whole Story',
          body: 'From one sentence to GPT-4, it is the same three moves repeated: split, count, merge.\n\nSplit the text into the smallest pieces you have. Count which pieces sit next to each other most often. Merge the winner into a new piece, and write down the rule. Do it again, a hundred thousand times.\n\nWhat comes out is a vocabulary that can spell anything — real words, invented words, typos, code, other languages — without ever encountering something it has no representation for.',
        },
      ],
      summary: 'Byte Pair Encoding builds a vocabulary by repeatedly merging the most frequent adjacent pair. The result is a set of subword tokens plus an ordered list of merge rules that can reconstruct any string. Common words become single tokens, unfamiliar words decompose into known fragments, and anything else falls back to characters — so a tokenizer never fails and nothing is ever out-of-vocabulary.',
    },
  },
  {
    id: '2',
    slug: 'how-ai-turns-words-into-numbers-embeddings',
    title: 'How AI Turns Words Into Numbers: Vector Embeddings Explained',
    excerpt: 'Follow one word — "cat" — all the way from a sentence you typed to a point in meaning-space, through tokenization, the vocabulary, the lookup table, and 768 learned numbers.',
    category: 'LLMs',
    difficulty: 'Beginner',
    readTime: '8 min read',
    publishedAt: 'July 2026',
    author: {
      name: 'AI Engineering Team',
      role: 'Research & Technical Writing',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    tags: ['Embeddings', 'Vector Space', 'Tokenization', 'Cosine Similarity', 'NLP'],
    featured: false,
    content: {
      intro: 'A language model cannot read. Not in the way you are reading this. Before it can do anything at all with your sentence, every word has to be turned into numbers — and that conversion happens before the model proper even gets involved. This is the story of one word, "cat", travelling from a sentence you typed to a point in a space of meaning.',
      sections: [
        {
          heading: '1. The Big Picture: This Happens Before the Model',
          body: 'People usually picture a language model as one enormous thing that takes in words and gives back words. That is not quite the shape of it.\n\nThere are really three stations. Your text arrives as text. It passes through an embedding layer, which converts it into numbers. Only then does it reach the model — the part that does the actual reasoning.\n\nThe important consequence: by the time the model is thinking about your sentence, there are no words left in it. There is only a long list of numbers. Everything the model will ever do with "cat" depends on the numbers that layer handed over.',
          visual: 'emb-pipeline',
          keyTakeaway: 'Embedding is not part of the model’s reasoning. It is the doorway that turns language into something the reasoning can run on.',
        },
        {
          heading: '2. It Starts With a Sentence',
          body: 'Take a short one: "The cat sat quietly."\n\nThe first thing that happens is that the sentence is chopped into pieces called tokens. Tokens are not quite words. Sometimes a token is a whole word, sometimes it is a fragment, and punctuation counts too — the full stop at the end is its own token.\n\nWatch what happens to "quietly". It does not survive as one piece. It gets split into "quiet" and "ly", because "quietly" is not one of the pieces the model keeps on file, but both of those fragments are.\n\nThis is why models cope with words they have never seen. They are not looking words up whole; they are rebuilding them from a fixed set of parts.',
          visual: 'emb-tokenize',
        },
        {
          heading: '3. Where Those Numbers Come From',
          body: 'Each token comes out of that step with a number attached. "cat" gets 2543. Where does 2543 come from?\n\nFrom the vocabulary — a single numbered list of every token the model knows. In this example the list runs to 50,257 entries. It is decided before training begins and never changes afterwards.\n\nAnd that is the whole story of the ID. It is not a measurement, a score, or a category. A token’s ID is simply its position in the list. "cat" is entry number 2543, the way a word is on a particular page of a dictionary. The number says nothing whatsoever about what a cat is.',
          visual: 'emb-vocabulary',
          keyTakeaway: 'A token ID carries no meaning. It is an address, not a description — 2543 is just where "cat" sits on the shelf.',
        },
        {
          heading: '4. The Lookup: One Row for Every Token',
          body: 'So if the ID means nothing, where does the meaning come from?\n\nFrom a very large table called the embedding matrix. It has one row for every single token in the vocabulary — 50,257 rows in our example. Each row is a list of numbers belonging to that one token.\n\nThe embedding layer does something almost disappointingly simple with it. It takes the ID, goes to that row, and lifts the row out. No arithmetic, no reasoning. It is a lookup, in the most literal sense — the same operation as finding page 2543.\n\nThe row it hands back is the embedding. That list of numbers is what the model will actually think with.',
          visual: 'emb-lookup',
        },
        {
          heading: '5. Nobody Writes These Numbers by Hand',
          body: 'It is worth pausing on where the values in that row came from, because the answer surprises people.\n\nNobody chose them. No linguist sat down and decided that position four of "cat" should be 1.07. When the model is first created, the entire embedding matrix is filled with random noise — every word is meaningless, and every word is meaningless in a different way.\n\nThe numbers are learned. As the model reads its way through an enormous amount of text, it repeatedly tries to predict what comes next, gets it wrong, and nudges the numbers slightly. Every nudge is tiny. There are billions of them.\n\nWhat emerges at the end is not a definition of "cat" that a human wrote. It is a summary of how the word "cat" behaves — which words it appears beside, which it never appears beside, which sentences it turns up in.',
          keyTakeaway: 'The embedding of a word is not a definition. It is a compressed record of the company that word keeps.',
        },
        {
          heading: '6. What “768 Dimensions” Actually Means',
          body: 'You will constantly see embeddings described as being "768-dimensional" or "1,536-dimensional", and it sounds like it should be difficult. It is not.\n\nEach value in the row sits at a fixed position, and those positions are the dimensions. "768 dimensions" simply means the row is 768 numbers long. That is the entire idea.\n\nHow long the row is depends on the model. Our example uses 768. GPT-3 used 12,288. Bigger rows give the model more room to record fine distinctions, and cost more memory and compute for every token processed.\n\nOne thing that is not true, however tempting it is: the individual positions do not have human meanings. Position 12 is not "how animal-like this is". Nobody ever asked the model to make any single slot interpretable, and it didn’t.',
          visual: 'emb-dimensions',
        },
        {
          heading: '7. The Fingerprint: No Single Number Means “Cat”',
          body: 'If no individual position means anything, then where exactly does the meaning live?\n\nIn the pattern. Meaning is spread across the entire vector, the way a fingerprint is not located in any one ridge. You cannot point at one value and say "that is the cat part".\n\nYou can test this. Change a single number, even substantially, and the vector is still recognisably "cat" — it still lands in the same neighbourhood as before. Disturb the whole pattern by the same total amount, and it stops being "cat" at all. It becomes something else, or nothing.\n\nThat is what people mean when they call an embedding a fingerprint for a word.',
          visual: 'emb-fingerprint',
          keyTakeaway: 'No single number defines a word. Change the pattern enough and it stops being that word — which is exactly what makes the whole vector the unit of meaning.',
        },
        {
          heading: '8. Meaning as Geometry',
          body: 'Here is the part that makes all of it worthwhile.\n\nWords that get used in similar ways end up being nudged in similar directions during training. Similar patterns mean the vectors end up close together. So the space fills up with structure that nobody designed.\n\n"Cat" and "kitten" land near each other. So do "dog", "puppy" and "tiger". Meanwhile "car" and "truck" are somewhere else entirely, and "piano" and "violin" are off in their own corner. No human sorted them. They arranged themselves, purely from the company they kept in the training text.\n\nOnce meaning is geometry, similarity becomes measurable. You can ask how close two words are with straightforward arithmetic — usually cosine similarity, which compares the direction two vectors point in and ignores how long they are.',
          visual: 'emb-space',
          codeSnippet: {
            language: 'python',
            code: `import numpy as np

def cosine_similarity(vec1, vec2):
    dot_product = np.dot(vec1, vec2)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)
    return dot_product / (norm_vec1 * norm_vec2)

# 1.0 = same direction, 0 = unrelated, -1 = opposite
cosine_similarity(cat_vector, kitten_vector)   # ~0.87
cosine_similarity(cat_vector, piano_vector)    # ~0.11`,
          },
          keyTakeaway: 'Similar meaning becomes nearby vectors. That single property is what makes search, recommendation, clustering and retrieval-augmented generation possible.',
        },
        {
          heading: '9. The Whole Chain, End to End',
          body: 'Five steps, and only the first two involve anything you would recognise as language.\n\nA word becomes a token. The token becomes an ID — its position in a fixed list. The ID becomes a row lifted out of a learned table. That row is a vector of a few hundred numbers. And that vector is a point in a space where distance means similarity.\n\nThat is a word embedding. Everything else a language model does is built on top of it.',
          visual: 'emb-recap',
        },
      ],
      summary: 'An embedding is the bridge between language and mathematics. A token ID is only an address; the meaning lives in a learned row of numbers, spread across the whole pattern rather than any single value. Because words used in similar ways end up with similar patterns, the resulting space has a geometry where distance means similarity — and that one property underpins semantic search, recommendation, clustering, and RAG.',
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
