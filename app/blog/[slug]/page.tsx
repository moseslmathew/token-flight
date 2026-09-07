import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Clock3,
} from "lucide-react";
import ArticleVisual from "@/components/ArticleVisual";
import ReadingProgress from "@/components/ReadingProgress";
import { ARTICLES } from "@/lib/data/articles";
import styles from "./article.module.css";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

function renderBodyWithLinks(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  if (!linkRegex.test(text)) return text;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  linkRegex.lastIndex = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <Link key={match.index} href={match[2]} className={styles.inlineLink}>
        {match[1]}
      </Link>,
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default async function ArticleDetail({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((item) => item.slug === slug);

  if (!article) notFound();

  const relatedArticles = ARTICLES.filter((item) => item.id !== article.id).slice(0, 2);

  return (
    <>
      <ReadingProgress />
      <article className={styles.page}>
        <div className={styles.container}>
          <Link href="/learn" className={styles.backLink}>
            <ArrowLeft size={14} aria-hidden="true" />
            The learning room
          </Link>

          <header className={styles.hero}>
            <div>
              <div className={styles.kicker}>
                <span>{article.category}</span>
                <span>{article.difficulty}</span>
              </div>
              <h1>{article.title}</h1>
              <p className={styles.excerpt}>{article.excerpt}</p>
            </div>

            <aside className={styles.guideNote} aria-label="Guide details">
              <p className={styles.eyebrow}>A TokenFlight guide</p>
              <div className={styles.guideStat}>
                <BookOpen size={18} strokeWidth={1.5} aria-hidden="true" />
                <span>
                  <strong>Made to build intuition</strong>
                  <small>Clear ideas, then the deeper how</small>
                </span>
              </div>
              {article.readTime && (
                <div className={styles.guideStat}>
                  <Clock3 size={18} strokeWidth={1.5} aria-hidden="true" />
                  <span>
                    <strong>{article.readTime}</strong>
                    <small>Read at your own pace</small>
                  </span>
                </div>
              )}
              <div className={styles.pipeline} aria-label="Generative AI pipeline">
                <span>Prompt</span><i>→</i>
                <span>Neural brain</span><i>→</i>
                <span>Concept layer</span><i>→</i>
                <span>Output</span>
              </div>
            </aside>
          </header>

          <div className={styles.byline}>
            <span>Written by <strong>{article.author.name}</strong></span>
            <span>Published {article.publishedAt}</span>
          </div>

          <section className={styles.intro} aria-label="Introduction">
            <p className={styles.eyebrow}>Start with the intuition</p>
            <p>{article.content.intro}</p>
          </section>

          <div className={styles.articleBody}>
            {article.content.sections.map((section, index) => (
              <section key={section.heading} className={styles.section}>
                <div className={styles.sectionCopy}>
                  <span className={styles.sectionNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2>{section.heading.replace(/^\d+\.\s*/, "")}</h2>
                    <p>{renderBodyWithLinks(section.body)}</p>
                  </div>
                </div>

                {section.visual && (
                  <div className={styles.visual}>
                    <ArticleVisual id={section.visual} />
                  </div>
                )}

                {section.codeSnippet && (
                  <figure className={styles.codeBlock}>
                    <figcaption>{section.codeSnippet.language}</figcaption>
                    <pre><code>{section.codeSnippet.code}</code></pre>
                  </figure>
                )}

                {section.keyTakeaway && (
                  <aside className={styles.takeaway}>
                    <span>Keep this idea</span>
                    <p>{section.keyTakeaway}</p>
                  </aside>
                )}
              </section>
            ))}
          </div>

          <section className={styles.summary} aria-label="Article summary">
            <p className={styles.eyebrow}>In summary</p>
            <p>{article.content.summary}</p>
          </section>

          {relatedArticles.length > 0 && (
            <section className={styles.related} aria-labelledby="further-reading">
              <div className={styles.relatedHeading}>
                <div>
                  <p className={styles.eyebrow}>Keep following the idea</p>
                  <h2 id="further-reading">Your next <em>lightbulb moment.</em></h2>
                </div>
                <Link href="/learn">
                  View all guides <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
              <div className={styles.relatedGrid}>
                {relatedArticles.map((related) => (
                  <article key={related.id} className={styles.relatedCard}>
                    <Link href={`/blog/${related.slug}`}>
                      <div className={styles.relatedMeta}>
                        <span>{related.category}</span>
                        <span>{related.difficulty}</span>
                      </div>
                      <h3>{related.title}</h3>
                      <p>{related.excerpt}</p>
                      <span className={styles.readGuide}>
                        Read guide <ArrowUpRight size={15} aria-hidden="true" />
                      </span>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
