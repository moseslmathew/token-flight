import React from 'react';
import { ARTICLES } from '@/lib/data/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import { ArrowLeft, Clock } from 'lucide-react';

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Top Back Link */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Learn
      </Link>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="font-semibold px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span>•</span>
          <span>{article.publishedAt}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-slate-600 text-base leading-relaxed">
          {article.excerpt}
        </p>

        <div className="text-xs text-slate-500 pt-2 font-medium">
          Written by {article.author.name}
        </div>
      </header>



      {/* Article Body */}
      <div className="space-y-8 text-slate-800 text-sm sm:text-base leading-relaxed">
        <p className="text-slate-700 bg-slate-100/80 p-5 rounded-xl border border-slate-200">
          {article.content.intro}
        </p>

        {article.content.sections.map((sec, idx) => (
          <div key={idx} className="space-y-3 pt-2">
            <h2 className="text-xl font-bold text-slate-900">{sec.heading}</h2>
            <p className="whitespace-pre-line text-slate-700">{sec.body}</p>

            {sec.codeSnippet && (
              <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden my-4 border border-slate-800">
                <div className="px-4 py-2 bg-slate-800 text-slate-400 text-xs font-mono">
                  {sec.codeSnippet.language}
                </div>
                <pre className="p-4 text-xs font-mono text-indigo-300 overflow-x-auto">
                  <code>{sec.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {sec.keyTakeaway && (
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900">
                <strong className="block mb-1 text-indigo-700">Key Takeaway:</strong>
                {sec.keyTakeaway}
              </div>
            )}
          </div>
        ))}

        {/* Summary Box */}
        <div className="p-5 bg-slate-100 border border-slate-200 rounded-xl space-y-2 mt-8">
          <h3 className="text-base font-bold text-slate-900">Summary</h3>
          <p className="text-slate-700 text-xs sm:text-sm">{article.content.summary}</p>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="pt-10 border-t border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <ArticleCard key={rel.id} article={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
