---
name: latest-ai-news-fetcher
description: Search for, curate, and format the most important AI model news, frontier releases, benchmarks, open-weights updates, and research papers from the past 24 hours into structured news reports.
---

# Latest AI News Fetcher Skill

This skill guides the agent on how to research, synthesize, and structure the latest 24-hour AI model news, research papers, frontier releases, open-weights updates, and benchmark comparisons.

## When to Trigger

Trigger this skill whenever the user requests:
- "Search for the latest AI news"
- "Update latest news tab"
- "Fetch AI model releases from the past 24 hours"
- "Summarize new benchmarks or AI research breakthroughs"
- "Add recent open-source AI news to TokenFlight"

## Workflow Steps

### Step 1: Research via Web Search

Execute targeted web searches using the `search_web` tool for the past 24 hours covering:
- Frontier lab model releases (OpenAI, Anthropic, Google DeepMind, Meta AI, DeepSeek, Mistral)
- Open-weight model policy statements and community releases
- Benchmark performance reports (SWE-bench, HumanEval, ARC-AGI, test-time compute scaling)
- Hardware & compute developments (NVIDIA Blackwell, cluster interconnects, low-precision quantization)

**Sample Queries:**
- `latest AI model news releases benchmarks open source research past 24 hours`
- `DeepSeek Claude Gemini Llama OpenAI model release news July 2026`

### Step 2: Categorization & 6-Point Filter

Extract news into 6 core technical criteria:
1. **New Model Releases**: Version launches, parameter variants, distilled Flash/Lite tiers.
2. **Major Model Updates**: Extended context lengths, multimodal support, continuous reasoning.
3. **Benchmarks & Comparisons**: Performance scores, latency (TTFT), token cost efficiency.
4. **Research Breakthroughs**: Key papers, architectural innovations (MLA, MoE, attention mechanisms).
5. **Industry & Policy Announcements**: Open-weight coalition statements, safety evaluations.
6. **Technical Advancements**: Quantization (FP4/FP8), KV-cache optimizations, synthetic data training.

### Step 3: Structure Data into `AINewsItem` Interface

Format each news item into the authoritative TypeScript data schema (`lib/data/news.ts`):

```typescript
export interface AINewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Model Releases' | 'Research & Architecture' | 'Open Source' | 'Hardware & Compute' | 'Industry & Policy';
  readTime: string;
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

### Step 4: Editorial Quality Rules

- **What Changed**: Concise, factual summary of the launch, paper, or policy update.
- **Why It Matters**: Technical breakdown of the architectural, efficiency, or open-source implications.
- **Future Impact**: Strategic projection for developers, researchers, and enterprise AI engineering.
- **Outbound Source Link**: Always include `sourceUrl` with verified external URL.
- **Color Coding**: Render breakdown cards in cohesive light colors (Slate for What Changed, Indigo for Why It Matters, Emerald for Future Impact).

### Step 5: Verification & Build Test

- Write updated news items to `lib/data/news.ts`.
- Run `npm run build` to verify type safety and static page generation.
