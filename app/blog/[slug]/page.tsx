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

      <article className="ambient-glow min-h-screen pb-16">
        <div className="measure-wide px-4 pt-6 sm:px-6 sm:pt-10">
          {/* Back */}
          <div className="measure">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full bg-surface border border-rule px-3.5 py-1.5 text-xs font-semibold text-ink-muted shadow-xs transition-all hover:border-slate-300 hover:text-accent"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Learn
            </Link>
          </div>

          {/* Title block */}
          <header className="measure animate-rise-in mt-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="rounded-md bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wider">
                {article.difficulty}
              </span>
            </div>

            <h1 className="text-[2.25rem] sm:text-[2.85rem] font-extrabold tracking-tight text-ink-strong leading-tight">
              {article.title}
            </h1>

            <p className="text-lede text-ink-muted leading-relaxed font-normal">{article.excerpt}</p>

            <div className="flex flex-wrap items-center gap-3 border-t border-rule/80 pt-5 text-sm text-slate-500 font-medium">
              <span className="text-slate-900 font-semibold">{article.author.name}</span>
              <span>·</span>
              <span>Published {article.publishedAt}</span>
            </div>
          </header>

          {/* Lead */}
          <div className="measure mt-10 rounded-2xl bg-surface border border-rule p-6 sm:p-8 shadow-xs">
            <p className="text-lede font-medium text-ink-strong leading-relaxed">{article.content.intro}</p>
          </div>

          {/* Sections */}
          {article.content.sections.map((sec, idx) => (
            <section key={idx} className="mt-14">
              <div className="measure space-y-4">
                <h2 className="text-h2 font-bold tracking-tight text-ink-strong">{sec.heading}</h2>
                <p className="whitespace-pre-line text-body text-ink leading-relaxed">{sec.body}</p>
              </div>

              {sec.visual && (
                <div className="measure mt-8">
                  <ArticleVisual id={sec.visual} />
                </div>
              )}

              {sec.codeSnippet && (
                <figure className="measure mt-8 overflow-hidden rounded-2xl bg-code-bg border border-slate-800 shadow-md">
                  <figcaption className="flex items-center justify-between border-b border-slate-800 bg-code-surface px-5 py-3">
                    <span className="eyebrow text-code-faint font-mono text-xs">{sec.codeSnippet.language}</span>
                  </figcaption>
                  <pre className="overflow-x-auto p-5 font-mono text-[0.85rem] leading-[1.7] text-code-ink">
                    <code>{sec.codeSnippet.code}</code>
                  </pre>
                </figure>
              )}

              {sec.keyTakeaway && (
                <aside className="measure mt-8 rounded-r-2xl border-l-4 border-accent bg-emerald-50/70 p-5 sm:p-6 shadow-xs">
                  <span className="eyebrow block text-accent font-bold mb-1">Key Takeaway</span>
                  <p className="text-[1.0625rem] font-medium leading-relaxed text-emerald-950">
                    {sec.keyTakeaway}
                  </p>
                </aside>
              )}
            </section>
          ))}

          {/* Closing summary */}
          <div className="measure mt-16 rounded-2xl bg-slate-900 text-white p-6 sm:p-8 shadow-md">
            <span className="eyebrow block text-blue-400 font-bold mb-2">In Summary</span>
            <p className="text-lede font-medium text-slate-100 leading-relaxed">{article.content.summary}</p>
          </div>
        </div>

        {/* Related reading */}
        {relatedArticles.length > 0 && (
          <section className="measure-wide mt-20 px-4 sm:px-6">
            <div className="border-t border-rule pt-10">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">Further Reading</h2>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {relatedArticles.map((rel) => (
                  <ArticleCard key={rel.id} article={rel} variant="compact" />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
