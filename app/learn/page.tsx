"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  Clock3,
  Layers3,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { ARTICLES, type Article } from "@/lib/data/articles";
import styles from "./learn.module.css";

const TOPICS = [
  {
    name: "Generative AI",
    icon: Sparkles,
    description: "Explore how AI creates.",
    note: "From probability to diffusion",
    className: styles.generative,
  },
  {
    name: "LLMs",
    icon: Layers3,
    description: "Look inside language models.",
    note: "Tokens, embeddings & transformers",
    className: styles.language,
  },
  {
    name: "Machine Learning",
    icon: Brain,
    description: "Build your foundations.",
    note: "The ideas behind learning from data",
    className: styles.machine,
  },
] as const;
const activeTopics = TOPICS.filter((topic) =>
  ARTICLES.some((article) => article.category === topic.name),
);
const featured =
  ARTICLES.find(
    (article) => article.featured && article.difficulty === "Beginner",
  ) ?? ARTICLES[0];
const visualGuideCount = ARTICLES.filter((article) =>
  article.content.sections.some((section) => section.visual),
).length;
const levels = (["Beginner", "Intermediate", "Advanced"] as const).filter(
  (level) => ARTICLES.some((article) => article.difficulty === level),
);

export default function LearnPage() {
  const [category, setCategory] = useState<string>("All guides");
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<string>("All levels");
  const filteredArticles = ARTICLES.filter((article) => {
    const searchable = [
      article.title,
      article.excerpt,
      article.category,
      ...article.tags,
    ]
      .join(" ")
      .toLowerCase();
    return (
      (category === "All guides" || article.category === category) &&
      (level === "All levels" || article.difficulty === level) &&
      searchable.includes(query.trim().toLowerCase())
    );
  });
  const hasFilters =
    category !== "All guides" || level !== "All levels" || query !== "";
  function resetFilters() {
    setCategory("All guides");
    setLevel("All levels");
    setQuery("");
  }

  function browseTopic(topic: Article["category"]) {
    setCategory(topic);
    setLevel("All levels");
    setQuery("");
    document.getElementById("guide-library")?.focus({ preventScroll: true });
    document
      .getElementById("guide-library")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.masthead}>
          <div>
            <p className={styles.eyebrow}>The TokenFlight learning room</p>
            <h1>
              Big ideas. <em>Made clear.</em>
            </h1>
            <p className={styles.lede}>
              Build your understanding of AI, one idea at a time.
              <br className={styles.desktopBreak} /> Thoughtful explanations,
              visual breakdowns, and room to experiment.
            </p>
          </div>
          <div className={styles.libraryNote}>
            <BookOpen size={21} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <strong>{ARTICLES.length} in-depth guides</strong>
              <span>
                {visualGuideCount} with interactive visuals · At your own pace
              </span>
            </div>
          </div>
        </header>

        <section className={styles.spotlight} aria-label="Start exploring">
          {featured && (
            <Link href={`/blog/${featured.slug}`} className={styles.featured}>
              <div className={styles.featureTop}>
                <span className={styles.featureLabel}>
                  <span /> A good place to start
                </span>
                <ArrowUpRight size={21} aria-hidden="true" />
              </div>
              <div className={styles.featureBody}>
                <div>
                  <div className={styles.featureMeta}>
                    <span>{featured.category}</span>
                    <span>{featured.difficulty}</span>
                  </div>
                  <h2>{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                </div>
                <div className={styles.bookArt} aria-hidden="true">
                  <div className={styles.bookSpine} />
                  <div className={styles.bookFace}>
                    <span>
                      THE IDEAS
                      <br />
                      BEHIND AI
                    </span>
                    <div className={styles.bookSymbol}>
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <em>
                      A little curiosity.
                      <br />A new perspective.
                    </em>
                    <span>TokenFlight / Learn</span>
                  </div>
                </div>
              </div>
              <div className={styles.featureBottom}>
                <span>
                  Start reading <ArrowRight size={16} aria-hidden="true" />
                </span>
                {featured.readTime && (
                  <span>
                    <Clock3 size={13} aria-hidden="true" />
                    {featured.readTime}
                  </span>
                )}
              </div>
            </Link>
          )}
          <aside
            className={styles.startingPoints}
            aria-labelledby="starting-title"
          >
            <p className={styles.eyebrow}>Choose your direction</p>
            <h2 id="starting-title">
              What makes you
              <br />
              <em>curious?</em>
            </h2>
            <div className={styles.topicList}>
              {activeTopics.map(
                ({ name, icon: Icon, description, note, className }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => browseTopic(name)}
                    className={styles.topicButton}
                    aria-label={`Browse ${name} guides`}
                  >
                    <span className={`${styles.topicIcon} ${className}`}>
                      <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{description}</strong>
                      <small>{note}</small>
                    </span>
                    <ArrowDown size={15} aria-hidden="true" />
                  </button>
                ),
              )}
            </div>
            <p className={styles.startingNote}>
              Start with an intuition. Stay for the details.
            </p>
          </aside>
        </section>

        <section className={styles.library} aria-labelledby="guide-library">
          <div className={styles.libraryHeading}>
            <div>
              <p className={styles.eyebrow}>Follow the idea</p>
              <h2 id="guide-library" tabIndex={-1}>
                Your next <em>lightbulb moment.</em>
              </h2>
            </div>
            <span
              aria-live="polite"
              aria-atomic="true"
              className={styles.resultCount}
            >
              {filteredArticles.length}{" "}
              {filteredArticles.length === 1 ? "guide" : "guides"} to explore
            </span>
          </div>
          <div className={styles.tools}>
            <div
              className={styles.tabs}
              role="group"
              aria-label="Filter guides by topic"
            >
              {["All guides", ...activeTopics.map((topic) => topic.name)].map(
                (topic) => (
                  <button
                    type="button"
                    key={topic}
                    aria-pressed={category === topic}
                    onClick={() => setCategory(topic)}
                  >
                    {topic}
                    <span>
                      {topic === "All guides"
                        ? ARTICLES.length
                        : ARTICLES.filter(
                            (article) => article.category === topic,
                          ).length}
                    </span>
                  </button>
                ),
              )}
            </div>
            <div className={styles.search}>
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                aria-label="Search guides"
                placeholder="Find an idea…"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                >
                  <X size={15} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
          <div className={styles.filterRow}>
            <p>Go from the first “why” to the deeper “how”.</p>
            <div className={styles.levelFilter}>
              <SlidersHorizontal size={13} aria-hidden="true" />
              <label htmlFor="guide-level">Level</label>
              <select
                id="guide-level"
                value={level}
                onChange={(event) => setLevel(event.target.value)}
              >
                <option>All levels</option>
                {levels.map((difficulty) => (
                  <option key={difficulty}>{difficulty}</option>
                ))}
              </select>
              {hasFilters && (
                <button type="button" onClick={resetFilters}>
                  Reset filters
                </button>
              )}
            </div>
          </div>
          {filteredArticles.length > 0 ? (
            <div className={styles.guideGrid}>
              {filteredArticles.map((article) => {
                const topic = TOPICS.find(
                  (item) => item.name === article.category,
                )!;
                const Icon = topic.icon;
                const hasVisual = article.content.sections.some(
                  (section) => section.visual,
                );
                return (
                  <article key={article.id} className={styles.guideCard}>
                    <Link href={`/blog/${article.slug}`}>
                      <div className={styles.cardTop}>
                        <span
                          className={`${styles.topicIcon} ${topic.className}`}
                        >
                          <Icon
                            size={19}
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </span>
                        <span className={styles.difficulty}>
                          {article.difficulty}
                        </span>
                      </div>
                      <p className={styles.cardCategory}>{article.category}</p>
                      <h3>{article.title}</h3>
                      <p className={styles.excerpt}>{article.excerpt}</p>
                      <div className={styles.cardDetails}>
                        {hasVisual ? (
                          <span>
                            <Layers3 size={12} aria-hidden="true" />
                            Interactive visuals
                          </span>
                        ) : (
                          <span>
                            <BookOpen size={12} aria-hidden="true" />
                            Technical guide
                          </span>
                        )}
                        {article.readTime && <span>{article.readTime}</span>}
                      </div>
                      <div className={styles.cardBottom}>
                        <span>Explore the guide</span>
                        <ArrowUpRight size={17} aria-hidden="true" />
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={styles.empty}>
              <Search size={28} strokeWidth={1.3} aria-hidden="true" />
              <h3>No guides found.</h3>
              <p>Try another idea or broaden your topic and level filters.</p>
              <button type="button" onClick={resetFilters}>
                Show all guides <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          )}
        </section>

        <div className={styles.closingNote}>
          <span className={styles.noteIcon}>
            <BookOpen size={20} strokeWidth={1.4} aria-hidden="true" />
          </span>
          <p>
            You don’t have to learn it all at once.
            <br />
            <em>Just follow the next question.</em>
          </p>
          <Link href="/news">
            See the ideas in the news{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
