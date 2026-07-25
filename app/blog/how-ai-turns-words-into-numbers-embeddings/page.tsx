import EmbeddingsArticle from './EmbeddingsArticle';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How AI Turns Words Into Numbers: Vector Embeddings Explained — PiOrbit',
  description:
    'A visual, animated deep-dive into how AI converts human language into numbers. Learn about tokens, vectors, dimensions, and meaning-as-geometry.',
};

export default function Page() {
  return <EmbeddingsArticle />;
}
