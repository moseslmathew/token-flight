---
name: latest-ai-news-fetcher
description: Update AI news reports with recent model releases, benchmarks, open-weights updates, and research, while retaining still-relevant high-value stories and catching missed major announcements.
---

# Latest AI News Fetcher Skill

Maintain a current, high-value AI news feed. Prioritize the past 24 hours for discovery, but treat that window as a starting point, not an expiry date or an exclusion rule. Retain older news while it remains consequential and accurate.

## When to Trigger

Trigger this skill whenever the user requests:

- "Search for the latest AI news"
- "Update latest news tab"
- "Fetch AI model releases from the past 24 hours"
- "Summarize new benchmarks or AI research breakthroughs"
- "Add recent open-source AI news to TokenFlight"
- "Update cybersecurity news"

## Workflow Steps

### Step 1: Research via Web Search

Read the existing items in `lib/data/news.ts` before searching to identify coverage gaps and stories needing follow-up. Use available web search tools to cover:

- New announcements from the past 24 hours.
- Major announcements since the last verified feed update. If that time is unknown, search at least the past seven days; an item's publication date does not establish when the feed was last checked.
- Older developments that still materially affect model choice, capabilities, access, pricing, deployment, or safety. Expand the search beyond these windows when a significant story is missing or still developing.

Search across these areas:

- Frontier lab model releases (OpenAI, Anthropic, Google DeepMind, Meta AI, DeepSeek, Mistral)
- Open-weight model policy statements and community releases
- Benchmark performance reports (SWE-bench, HumanEval, ARC-AGI, test-time compute scaling)
- Hardware & compute developments (NVIDIA Blackwell, cluster interconnects, low-precision quantization)
- AI-related cybersecurity: vulnerability discoveries, defensive tools, agent containment incidents, cyber capability evaluations, and access or disclosure policies

**Sample Queries:**

- `latest AI model news releases benchmarks open source research past 24 hours`
- `major AI model launches this week OpenAI Anthropic Google DeepSeek`

Verify selected stories against primary sources, including announcement dates and current availability. Distinguish a new event from fresh reporting about an older event. Heavy discussion is a discovery signal, not verification of a claim. If the user explicitly requests a strict date-limited report, honor that scope without deleting older feed entries merely because they fall outside it.

### Step 2: Categorization & 6-Point Filter

Extract news into 6 core technical criteria:

1. **New Model Releases**: Version launches, parameter variants, distilled Flash/Lite tiers.
2. **Major Model Updates**: Extended context lengths, multimodal support, continuous reasoning.
3. **Benchmarks & Comparisons**: Performance scores, latency (TTFT), token cost efficiency.
4. **Research Breakthroughs**: Key papers, architectural innovations (MLA, MoE, attention mechanisms).
5. **Industry & Policy Announcements**: Open-weight coalition statements, safety evaluations.
6. **Technical Advancements**: Quantization (FP4/FP8), KV-cache optimizations, synthetic data training.

### Retention, Follow-ups & Priority

- Merge new findings into the existing feed; do not replace it with only the latest day's results. Retain any story that still offers substantial practical value, foundational context, or an unresolved development, regardless of age.
- Judge value by the significance of the capability, research result, access or cost change, deployment impact, or ongoing policy/safety implications. Recency and popularity alone do not determine value.
- Remove or consolidate stories only when they are redundant, unsupported, fully superseded, or no longer materially useful. Preserve useful historical context and briefly explain material removals in the update summary.
- Check retained stories for changed status. When an anticipated model launches, add or update its launch coverage and mark the earlier preview as historical or link it to the follow-up; do not leave an unqualified "upcoming" claim as the only coverage.
- Keep original publication dates for retained stories. Do not redate them to make the feed appear fresh. For a distinct follow-up, use its actual announcement date and avoid duplicate coverage of the same event.
- Select the featured story by current significance and reader value, then freshness. A major launch from several days ago can outrank a minor announcement from today.

### Step 3: Structure Data into `AINewsItem` Interface

Format each news item into the authoritative TypeScript data schema (`lib/data/news.ts`):

```typescript
export interface AINewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: AINewsCategory;
  additionalCategories?: AINewsCategory[];
  readTime?: string;
  publishedAt: string;
  source: string;
  sourceUrl: string;
  featured?: boolean;
  content: {
    whatChanged: string;
    whyItMatters: string;
    futureImpact: string;
    technicalHighlights?: string[];
  };
}
```

`AINewsCategory` includes `Model Releases`, `Research & Architecture`, `Open Source`, `Hardware & Compute`, `Industry & Policy`, and `Cybersecurity`.

### Cybersecurity Tab

- Assign `category: 'Cybersecurity'` when security is the central story, including cyber incidents, defensive programs, vulnerability research, and model cyber-risk assessments.
- Keep general model launches in `Model Releases`, even when they mention cyber benchmarks, safeguards, or a restricted cyber variant. Do not add `Cybersecurity` as a secondary category. A dedicated security-tool release or substantive security assessment qualifies only when security is the primary subject of the story.
- The Cybersecurity filter matches only `category: 'Cybersecurity'`. Secondary topics must not pull general model announcements into this tab. For example, Astra's general launch belongs in Models; its separate critical cyber-risk assessment belongs in Cybersecurity.
- Review existing stories as well as new additions for this classification. Preserve other relevant topics in `additionalCategories` when changing a primary category.
- Maintain one item per story with a stable ID and slug. The Cybersecurity tab, other topic filters, and their counts use `matchesNewsCategory`; All stories counts each item once. Do not duplicate articles to populate multiple tabs.

### Step 4: Editorial Quality Rules

- **What Changed**: Concise, factual summary of the launch, paper, or policy update.
- **Why It Matters**: Technical breakdown of the architectural, efficiency, or open-source implications.
- **Future Impact**: Strategic projection for developers, researchers, and enterprise AI engineering.
- **Outbound Source Link**: Always include `sourceUrl` with verified external URL.
- **Color Coding**: Render breakdown cards in cohesive light colors (Slate for What Changed, Indigo for Why It Matters, Emerald for Future Impact).

### Step 5: Verification & Build Test

- Write updated news items to `lib/data/news.ts`.
- Before writing, check that major announcements discovered during research are covered, still-valuable existing stories are retained, dates remain honest, and preview/launch status is consistent. Do not omit a consequential story solely because it is older than 24 hours.
- Run `npm run build` to verify type safety and static page generation.
- Verify cybersecurity stories appear in the Cybersecurity filter and any other assigned topic filters, with matching counts and no duplicates in All stories. Keep existing page styles and use the separate production build output so verification does not overwrite live development assets.
