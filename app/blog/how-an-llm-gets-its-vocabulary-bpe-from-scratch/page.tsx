import BpeArticle from './BpeArticle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How an LLM Gets Its Vocabulary — BPE from Scratch — PiOrbit',
  description:
    'An animated, step-by-step walkthrough of Byte Pair Encoding: split into characters, count adjacent pairs, merge the most frequent, repeat — the same three moves that build tiktoken, the tokenizer behind GPT-4.',
};

export default function Page() {
  return <BpeArticle />;
}
