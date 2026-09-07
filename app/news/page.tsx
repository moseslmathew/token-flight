"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  Clock3,
  ExternalLink,
  Link2,
  Search,
  Share2,
  X,
} from "lucide-react";
import {
  AI_NEWS_ITEMS,
  NEWS_LAST_CHECKED,
  AINewsCategory,
  AINewsItem,
  matchesNewsCategory,
} from "@/lib/data/news";
import styles from "./news.module.css";

const TOPICS: { label: string; value: AINewsCategory | null }[] = [
  { label: "All stories", value: null },
  { label: "Models", value: "Model Releases" },
  { label: "Cybersecurity", value: "Cybersecurity" },
  { label: "Research", value: "Research & Architecture" },
];
const SAVED_KEY = "tokenflight.saved-news";
const labels: Record<AINewsCategory, string> = {
  "Model Releases": "Models",
  Cybersecurity: "Cybersecurity",
  "Research & Architecture": "Research",
  "Open Source": "Open source",
  "Hardware & Compute": "Infrastructure",
  "Industry & Policy": "Industry",
};
const tones: Record<AINewsCategory, string> = {
  "Model Releases": "green",
  Cybersecurity: "orange",
  "Research & Architecture": "blue",
  "Open Source": "purple",
  "Hardware & Compute": "sand",
  "Industry & Policy": "slate",
};
function minutes(item: AINewsItem) {
  return Math.max(
    1,
    Math.ceil(
      [item.excerpt, ...Object.values(item.content).flat()]
        .join(" ")
        .split(/\s+/).length / 200,
    ),
  );
}
function Headline({ title }: { title: string }) {
  return (
    <>
      {title.split(/(\S*-\S*)/g).map((part, index) =>
        part.includes("-") ? (
          <span className={styles.keepTogether} key={index}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}
function StoryMeta({ item }: { item: AINewsItem }) {
  return (
    <div className={styles.meta}>
      <span className={styles.category} data-tone={tones[item.category]}>
        {labels[item.category]}
      </span>
      <span>{item.publishedAt.replace("September", "Sep")}</span>
      <span className={styles.readTime}>
        <Clock3 size={12} aria-hidden="true" />
        {minutes(item)} min
      </span>
    </div>
  );
}
function SaveButton({
  item,
  saved,
  onSave,
}: {
  item: AINewsItem;
  saved: boolean;
  onSave: (id: string) => void;
}) {
  return (
    <button
      className={styles.iconButton}
      aria-label={`${saved ? "Unsave" : "Save"} ${item.title}`}
      aria-pressed={saved}
      onClick={() => onSave(item.id)}
      title={saved ? "Remove from saved stories" : "Save for later"}
    >
      <Bookmark
        size={18}
        fill={saved ? "currentColor" : "none"}
        aria-hidden="true"
      />
    </button>
  );
}
function ShareStory({ item }: { item: AINewsItem }) {
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("");
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    setUrl(`${window.location.origin}/news#${item.slug}`);
  }, [item.slug]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Link copied");
    } catch {
      setMessage("Copy the address from your browser to share this story.");
    }
    if (menu.current) menu.current.open = false;
  }
  return (
    <div className={styles.shareWrap}>
      <details ref={menu} className={styles.share}>
        <summary>
          <Share2 size={16} aria-hidden="true" />
          Share
        </summary>
        <div className={styles.shareMenu}>
          <button onClick={copy}>
            <Link2 size={15} aria-hidden="true" />
            Copy link
          </button>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${encodeURIComponent(url)}`}
          >
            Share on X <ArrowUpRight size={14} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          >
            Share on LinkedIn <ArrowUpRight size={14} />
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(item.title)}&body=${encodeURIComponent(`${item.excerpt}\n\n${url}`)}`}
          >
            Share by email <ArrowUpRight size={14} />
          </a>
        </div>
      </details>
      <span role="status" className={styles.shareStatus}>
        {message}
      </span>
    </div>
  );
}

export default function NewsPage() {
  const [topic, setTopic] = useState<AINewsCategory | null>(null);
  const [query, setQuery] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [activeStory, setActiveStory] = useState<AINewsItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const readerTitle = useRef<HTMLHeadingElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    try {
      const value: unknown = JSON.parse(
        localStorage.getItem(SAVED_KEY) || "[]",
      );
      if (Array.isArray(value))
        setSaved(
          value.filter(
            (id): id is string =>
              typeof id === "string" &&
              AI_NEWS_ITEMS.some((item) => item.id === id),
          ),
        );
    } catch {
      /* Reading works even if browser storage is unavailable. */
    }
    function syncHash() {
      let slug = "";
      try {
        slug = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        /* Ignore malformed links. */
      }
      setActiveStory(AI_NEWS_ITEMS.find((item) => item.slug === slug) || null);
    }
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);
  useEffect(() => {
    const reader = dialog.current;
    if (!reader) return;
    if (!activeStory) {
      if (reader.open) reader.close();
      return;
    }
    if (!reader.open) reader.showModal();
    reader.scrollTop = 0;
    readerTitle.current?.focus({ preventScroll: true });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeStory]);
  function openStory(item: AINewsItem) {
    if (!activeStory)
      returnFocus.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
    window.history.pushState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#${item.slug}`,
    );
    setActiveStory(item);
  }
  function closeStory() {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
    setActiveStory(null);
    dialog.current?.close();
    returnFocus.current?.focus({ preventScroll: true });
  }
  function toggleSaved(id: string) {
    const next = saved.includes(id)
      ? saved.filter((value) => value !== id)
      : [...saved, id];
    setSaved(next);
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      setNotice(
        next.includes(id)
          ? "Story saved for later on this browser."
          : "Story removed from saved stories.",
      );
    } catch {
      setNotice(
        "Saved for this visit. Your browser could not store it for later.",
      );
    }
  }
  const lead = AI_NEWS_ITEMS.find((item) => item.featured) || AI_NEWS_ITEMS[0];
  const briefing = AI_NEWS_ITEMS.filter((item) => item.id !== lead?.id).slice(
    0,
    3,
  );
  const normalizedQuery = query.trim().toLowerCase();
  const results = AI_NEWS_ITEMS.filter(
    (item) =>
      (!topic || matchesNewsCategory(item, topic)) &&
      (!savedOnly || saved.includes(item.id)) &&
      (!normalizedQuery ||
        [
          item.title,
          item.excerpt,
          item.source,
          item.category,
          ...Object.values(item.content).flat(),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)),
  );
  const showLead = !topic && !normalizedQuery && !savedOnly;
  const feed = showLead
    ? results.filter((item) => item.id !== lead?.id)
    : results;
  const lastCheckedDate = new Date(
    NEWS_LAST_CHECKED + "T00:00:00Z",
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const nextStories = activeStory
    ? AI_NEWS_ITEMS.filter((item) => item.id !== activeStory.id)
        .sort(
          (a, b) =>
            Number(matchesNewsCategory(b, activeStory.category)) -
            Number(matchesNewsCategory(a, activeStory.category)),
        )
        .slice(0, 2)
    : [];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.masthead}>
          <div>
            <div className={styles.kicker}>
              <span />
              THE TOKENFLIGHT BRIEFING
            </div>
            <h1>
              Stay ahead.
              <br className={styles.mobileBreak} /> <em>Go deeper.</em>
            </h1>
            <p>
              The AI developments worth your attention. The context that makes
              them matter.
            </p>
          </div>
          <div className={styles.edition}>
            <span>LAST CHECKED</span>
            <strong><time dateTime={NEWS_LAST_CHECKED}>{lastCheckedDate}</time></strong>
            <span>
              {AI_NEWS_ITEMS.length} curated stories · Original sources linked
            </span>
          </div>
        </header>
        <section className={styles.tools} aria-label="Browse news">
          <div className={styles.tabs} role="group" aria-label="News topics">
            {TOPICS.map((tab) => (
              <button
                key={tab.label}
                aria-pressed={topic === tab.value}
                onClick={() => setTopic(tab.value)}
                className={topic === tab.value ? styles.activeTab : ""}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className={styles.utilities}>
            <label className={styles.search}>
              <Search size={17} aria-hidden="true" />
              <input
                aria-label="Search stories"
                placeholder="Search stories"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <button
              className={styles.savedFilter}
              aria-pressed={savedOnly}
              onClick={() => setSavedOnly(!savedOnly)}
            >
              <Bookmark
                size={16}
                fill={savedOnly ? "currentColor" : "none"}
                aria-hidden="true"
              />
              Saved <span>{saved.length}</span>
            </button>
          </div>
        </section>
        {showLead && lead && (
          <section
            className={styles.topStories}
            aria-label="Editor's selection"
          >
            <article className={styles.lead}>
              <div className={styles.leadTop}>
                <span className={styles.leadLabel}>
                  <span />
                  THE BIG STORY
                </span>
                <SaveButton
                  item={lead}
                  saved={saved.includes(lead.id)}
                  onSave={toggleSaved}
                />
              </div>
              <div className={styles.leadBody}>
                <span className={styles.leadSource}>
                  {lead.source}
                  <span>/</span>
                  {labels[lead.category]}
                </span>
                <h2>
                  <button onClick={() => openStory(lead)}>
                    <Headline title={lead.title} />
                  </button>
                </h2>
                <p>{lead.excerpt}</p>
                <button
                  className={styles.leadCta}
                  onClick={() => openStory(lead)}
                >
                  Read the briefing{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </div>
              <div className={styles.leadBottom}>
                <span>{lead.publishedAt}</span>
                <span>
                  <Clock3 size={13} aria-hidden="true" />
                  {minutes(lead)} min read
                </span>
                <span className={styles.leadCaption}>
                  Ideas. Capabilities. What comes next.
                </span>
              </div>
              <div className={styles.orbit} aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </article>
            <aside className={styles.briefing}>
              <div className={styles.briefingHead}>
                <span className={styles.kicker}>ALSO ON THE RADAR</span>
                <ArrowDown size={17} aria-hidden="true" />
              </div>
              <h2>
                A few minutes.
                <br />A wider perspective.
              </h2>
              <ol>
                {briefing.map((item, index) => (
                  <li key={item.id}>
                    <span className={styles.number}>0{index + 1}</span>
                    <div>
                      <span className={styles.radarCategory}>
                        {labels[item.category]}
                      </span>
                      <button onClick={() => openStory(item)}>
                        {item.title}
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
              <a href="#stories" className={styles.radarLink}>
                Explore all stories <ArrowDown size={15} aria-hidden="true" />
              </a>
            </aside>
          </section>
        )}
        <section
          id="stories"
          className={styles.feed}
          aria-labelledby="stories-heading"
        >
          <div className={styles.feedHeading}>
            <div>
              <span className={styles.kicker}>
                {savedOnly ? "YOUR READING LIST" : "WORTH A CLOSER LOOK"}
              </span>
              <h2 id="stories-heading">
                {savedOnly
                  ? "Saved for later"
                  : normalizedQuery
                    ? "Search results"
                    : topic
                      ? labels[topic]
                      : "The latest, in perspective"}
                <span className={styles.resultCount} aria-live="polite">
                  {feed.length} {feed.length === 1 ? "story" : "stories"}
                </span>
              </h2>
            </div>
            <span className={styles.feedHint}>
              {savedOnly
                ? "Saved on this browser"
                : "A quick read. A clearer picture."}
            </span>
          </div>
          {feed.length ? (
            <div className={styles.storyGrid}>
              {feed.map((item) => (
                <article key={item.id} className={styles.story}>
                  <div className={styles.storyTop}>
                    <StoryMeta item={item} />
                    <SaveButton
                      item={item}
                      saved={saved.includes(item.id)}
                      onSave={toggleSaved}
                    />
                  </div>
                  <h3>
                    <button onClick={() => openStory(item)}>
                      <Headline title={item.title} />
                    </button>
                  </h3>
                  <p>{item.excerpt}</p>
                  <div className={styles.storyBottom}>
                    <span className={styles.source}>
                      <span aria-hidden="true">{item.source.charAt(0)}</span>
                      {item.source}
                    </span>
                    <button
                      onClick={() => openStory(item)}
                      aria-label={`Read ${item.title}`}
                    >
                      Read story <ArrowUpRight size={17} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              {savedOnly ? (
                <Bookmark size={28} aria-hidden="true" />
              ) : (
                <Search size={28} aria-hidden="true" />
              )}
              <h3>
                {savedOnly && !saved.length
                  ? "Keep a good story for later."
                  : "No stories found."}
              </h3>
              <p>
                {savedOnly && !saved.length
                  ? "Use the bookmark beside any headline to build your reading list."
                  : "Try a different search or browse all topics."}
              </p>
              <button
                className={styles.solidButton}
                onClick={() => {
                  setQuery("");
                  setTopic(null);
                  setSavedOnly(false);
                }}
              >
                Browse all stories <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          )}
          <div className={styles.endNote}>
            <span className={styles.endMark}>TF</span>
            <p>
              Stay curious. Stay informed.
              <br />
              <span>
                You’re reading a curated selection, with every story linked to
                its source.
              </span>
            </p>
            <a href="#main">Back to top ↑</a>
          </div>
        </section>
      </div>
      <div role="status" className={styles.srOnly}>
        {notice}
      </div>
      <dialog
        ref={dialog}
        className={styles.reader}
        aria-labelledby="reader-title"
        onCancel={(event) => {
          event.preventDefault();
          closeStory();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeStory();
        }}
      >
        {activeStory && (
          <div className={styles.readerInner}>
            <div className={styles.readerToolbar}>
              <span>THE TOKENFLIGHT BRIEFING</span>
              <div>
                <SaveButton
                  item={activeStory}
                  saved={saved.includes(activeStory.id)}
                  onSave={toggleSaved}
                />
                <button
                  className={styles.iconButton}
                  onClick={closeStory}
                  aria-label="Close story"
                >
                  <X size={21} />
                </button>
              </div>
            </div>
            <div className={styles.readerContent}>
              <StoryMeta item={activeStory} />
              <h2 id="reader-title" ref={readerTitle} tabIndex={-1}>
                <Headline title={activeStory.title} />
              </h2>
              <p className={styles.readerExcerpt}>{activeStory.excerpt}</p>
              <div className={styles.readerByline}>
                <span>Source · {activeStory.source}</span>
                <ShareStory key={activeStory.id} item={activeStory} />
              </div>
              <div className={styles.analysis}>
                {[
                  {
                    label: "What happened",
                    body: activeStory.content.whatChanged,
                  },
                  {
                    label: "Why it matters",
                    body: activeStory.content.whyItMatters,
                  },
                  {
                    label: "What comes next",
                    body: activeStory.content.futureImpact,
                  },
                ].map((part, index) => (
                  <section
                    key={part.label}
                    className={index === 1 ? styles.whyMatters : ""}
                  >
                    <span className={styles.sectionNumber}>0{index + 1}</span>
                    <div>
                      <h3>{part.label}</h3>
                      <p>{part.body}</p>
                    </div>
                  </section>
                ))}
              </div>
              {!!activeStory.content.technicalHighlights?.length && (
                <section className={styles.highlights}>
                  <h3>The details to know</h3>
                  <ul>
                    {activeStory.content.technicalHighlights.map((point) => (
                      <li key={point}>
                        <Check size={15} aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <a
                className={styles.sourceLink}
                href={activeStory.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  GO TO THE SOURCE
                  <strong>Read the original at {activeStory.source}</strong>
                </span>
                <ExternalLink size={19} aria-hidden="true" />
              </a>
              <section className={styles.readNext}>
                <span className={styles.kicker}>KEEP EXPLORING</span>
                <h3>Next on your reading list</h3>
                {nextStories.map((item) => (
                  <button key={item.id} onClick={() => openStory(item)}>
                    <span>
                      <small>
                        {labels[item.category]} · {minutes(item)} min read
                      </small>
                      {item.title}
                    </span>
                    <ArrowRight size={20} aria-hidden="true" />
                  </button>
                ))}
              </section>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
