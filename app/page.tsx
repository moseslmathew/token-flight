import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ProductHomePage() {
  return (
    <div className="product-home min-h-[calc(100vh-4rem)] overflow-hidden">
      <section className="measure-wide px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
          <div className="animate-rise-in max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/15 bg-accent-soft/70 px-3 py-1.5 text-xs font-semibold text-accent-deep">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              AI products, made practical
            </div>

            <h1 className="text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ink-strong">
              AI that matters in the real world.
            </h1>

            <p className="mt-7 max-w-2xl text-[clamp(1.125rem,2vw,1.375rem)] leading-relaxed text-ink-muted">
              A new home for thoughtful AI products — what they help you do,
              who they are for, and why they deserve your attention.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <span className="rounded-full bg-ink-strong px-5 py-3 text-sm font-semibold text-white shadow-sm">
                Product stories coming soon
              </span>
              <Link
                href="/news"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent-deep"
              >
                Explore the latest AI news
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="product-note border-l border-rule pl-6 lg:mb-2" aria-label="Editorial direction">
            <p className="eyebrow text-accent">Our new focus</p>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Less about the technology itself. More about the products changing
              how people create, work, learn, and live.
            </p>
          </aside>
        </div>
      </section>

      <div className="measure-wide px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="h-px bg-gradient-to-r from-transparent via-rule to-transparent" />
      </div>
    </div>
  );
}
