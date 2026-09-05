<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI Educational Content & Visualizer Pattern
When explaining any AI / GenAI / LLM concept:
1. **Intuition & Mental Model First**: Focus on how the concept works intuitively and universally. Avoid heavy math or forcing explanations into the 4 sub-models (VAEs/GANs) unless requested.
2. **Dedicated Standalone Modules**: Create new concepts as their own standalone topic card in `lib/data/articles.ts` and the `/learn` page.
3. **Pipeline Context**: Always show where the concept sits in the general generative pipeline (Prompt → Neural Brain → Concept Layer → Output).
4. **Interactive Playgrounds**: Every visualizer should have relatable prompt scenarios, intuitive control sliders (e.g. Creativity Dial), and live action buttons to observe the mechanism in action.
