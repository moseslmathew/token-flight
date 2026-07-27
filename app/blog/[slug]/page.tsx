import React from 'react';
import { ARTICLES } from '@/lib/data/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import ArticleVisual from '@/components/ArticleVisual';
import ReadingProgress from '@/components/ReadingProgress';
import { ArrowLeft } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetail({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <>
      <ReadingProgress />

      <article className="measure-wide px-4 pt-10 sm:px-6 sm:pt-14">
        {/* Back */}
        <div className="measure">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-meta font-medium text-ink-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Learn
          </Link>
        </div>

        {/* Title block */}
        <header className="measure animate-rise-in mt-10 space-y-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="eyebrow text-accent">{article.category}</span>
            <span className="text-ink-faint">·</span>
            <span className="eyebrow text-ink-faint">{article.difficulty}</span>
          </div>

          <h1 className="text-h1 font-semibold text-ink-strong">{article.title}</h1>

          <p className="text-lede text-ink-muted">{article.excerpt}</p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-rule pt-5 text-meta text-ink-faint">
            <span className="text-ink-muted">{article.author.name}</span>
            <span>·</span>
            <span>{article.publishedAt}</span>
          </div>
        </header>

        {/* Lead */}
        <div className="measure mt-12">
          <p className="text-lede text-ink-strong">{article.content.intro}</p>
        </div>

        {/* Sections */}
        {article.content.sections.map((sec, idx) => (
          <section key={idx} className="mt-16">
            <div className="measure space-y-5">
              <h2 className="text-h2 font-semibold text-ink-strong">{sec.heading}</h2>
              <p className="whitespace-pre-line text-body text-ink">{sec.body}</p>
            </div>

            {sec.visual && (
              <div className="measure mt-10">
                <ArticleVisual id={sec.visual} />
              </div>
            )}

            {sec.codeSnippet && (
              <figure className="measure mt-10 overflow-hidden rounded-xl bg-code-bg">
                <figcaption className="flex items-center justify-between border-b border-white/8 px-5 py-2.5">
                  <span className="eyebrow text-code-faint">{sec.codeSnippet.language}</span>
                </figcaption>
                <pre className="overflow-x-auto px-5 py-5 font-mono text-[0.8125rem] leading-[1.75] text-code-ink">
                  <code>{sec.codeSnippet.code}</code>
                </pre>
              </figure>
            )}

            {sec.keyTakeaway && (
              <aside className="measure mt-10 border-l-2 border-accent pl-5 sm:pl-6">
                <span className="eyebrow block text-accent">Key takeaway</span>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">
                  {sec.keyTakeaway}
                </p>
              </aside>
            )}
          </section>
        ))}

        {/* Closing summary */}
        <div className="measure mt-20 border-t border-rule pt-10">
          <span className="eyebrow block text-ink-faint">In summary</span>
          <p className="mt-3 text-lede text-ink-strong">{article.content.summary}</p>
        </div>
      </article>

      {/* Related reading */}
      {relatedArticles.length > 0 && (
        <section className="measure-wide mt-24 px-4 sm:px-6">
          <h2 className="eyebrow border-t border-rule pt-10 text-ink-faint">Keep reading</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedArticles.map((rel) => (
              <ArticleCard key={rel.id} article={rel} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
