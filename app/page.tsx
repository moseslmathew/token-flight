import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Compass,
  Layers3,
  Newspaper,
  PenTool,
  Sparkles,
  Workflow,
} from "lucide-react";
import styles from "./products.module.css";

const perspectives = [
  {
    number: "01",
    icon: Compass,
    title: "The purpose.",
    description:
      "What does it actually help you do? Start with the problem, not the feature list.",
  },
  {
    number: "02",
    icon: Workflow,
    title: "The fit.",
    description:
      "Who is it for, and where does it belong in the way you already work?",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "The difference.",
    description:
      "What makes it worth your attention? A clear view of the value beyond the hype.",
  },
];

export default function ProductHomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.masthead}>
          <span className={styles.eyebrow}>The TokenFlight collection</span>
          <span className={styles.status}>
            <span /> Product stories coming soon
          </span>
        </div>

        <section className={styles.hero} aria-labelledby="products-title">
          <div className={styles.heroCopy}>
            <p className={styles.heroKicker}>AI products, made practical</p>
            <h1 id="products-title">
              Less noise.
              <br />
              <em>More useful AI.</em>
            </h1>
            <p className={styles.intro}>
              A thoughtful home for AI products that matter in the real world.
              What they help you do, who they are for, and why they deserve your
              attention.
            </p>
            <div className={styles.actions}>
              <Link href="/news" className={styles.primaryLink}>
                Explore the AI briefing{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <a href="#our-perspective" className={styles.textLink}>
                Our perspective <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>
            <div className={styles.heroFootnote}>
              <span className={styles.smallMark}>TF</span>
              <span>Products first. Technology in context.</span>
            </div>
          </div>

          <div
            className={styles.cover}
            aria-label="Our focus: AI for creating, working, and learning"
          >
            <div className={styles.coverTop}>
              <span>The everyday potential of AI</span>
              <Layers3 size={20} aria-hidden="true" />
            </div>
            <p className={styles.coverTitle}>
              Big ideas.
              <br />
              <em>Everyday impact.</em>
            </p>
            <div className={styles.orbitArt} aria-hidden="true">
              <div className={styles.orbitOuter} />
              <div className={styles.orbitInner} />
              <div className={styles.orbitCore}>
                <Sparkles size={38} strokeWidth={1.1} />
              </div>
              <span className={styles.orbitDot} />
              <div className={styles.createChip}>
                <PenTool size={17} />
                Create
              </div>
              <div className={styles.workChip}>
                <Workflow size={17} />
                Work
              </div>
              <div className={styles.learnChip}>
                <BookOpen size={17} />
                Learn
              </div>
            </div>
            <div className={styles.coverBottom}>
              <span>A more human lens on technology</span>
              <span>TF / PRODUCTS</span>
            </div>
          </div>
        </section>

        <section
          id="our-perspective"
          className={styles.perspective}
          aria-labelledby="perspective-title"
        >
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>Our perspective</p>
              <h2 id="perspective-title">
                Good tools. <em>Clear perspective.</em>
              </h2>
            </div>
            <p>
              Less about the technology itself. <br />
              More about what it makes possible.
            </p>
          </div>
          <div className={styles.perspectiveGrid}>
            {perspectives.map(({ number, icon: Icon, title, description }) => (
              <article key={number} className={styles.perspectiveCard}>
                <div className={styles.cardTop}>
                  <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                  <span>{number}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.explore} aria-labelledby="explore-title">
          <div className={styles.exploreIntro}>
            <p className={styles.eyebrow}>In the meantime</p>
            <h2 id="explore-title">
              Follow your <br />
              <em>curiosity.</em>
            </h2>
            <p>
              The news and ideas behind <br />a fast-moving world.
            </p>
          </div>
          <Link href="/news" className={styles.exploreCard}>
            <div className={styles.exploreTop}>
              <Newspaper size={23} strokeWidth={1.5} aria-hidden="true" />
              <ArrowUpRight size={21} aria-hidden="true" />
            </div>
            <span className={styles.eyebrow}>The briefing</span>
            <h3>Know what’s next.</h3>
            <p>
              The AI stories that matter, with context to help you see the
              bigger picture.
            </p>
            <span className={styles.exploreCta}>
              Read the news <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
          <Link href="/learn" className={styles.exploreCard}>
            <div className={styles.exploreTop}>
              <BookOpen size={23} strokeWidth={1.5} aria-hidden="true" />
              <ArrowUpRight size={21} aria-hidden="true" />
            </div>
            <span className={styles.eyebrow}>The learning room</span>
            <h3>Make it click.</h3>
            <p>
              Explore the ideas behind AI through clear explanations and
              interactive guides.
            </p>
            <span className={styles.exploreCta}>
              Explore the guides <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        </section>
      </div>
    </div>
  );
}
