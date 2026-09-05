# AI Concept Visualizer & Educational Pattern Rules

Always follow these pedagogical and architectural design standards for all AI/ML/GenAI educational modules, explanations, and visualizers:

## 1. Intuition-First & Model-Agnostic Core
- **Concept Over Sub-Architectures**: Never force an explanation into specific niche architectures (e.g. VAEs, GANs, DiT) unless explicitly requested. Explain how the concept universally fits into the generative AI pipeline.
- **Mental Models Over Raw Math**: Explain *why* a mechanism exists using intuitive contrasts (e.g., deterministic calculators vs. possibility engines; weighted dice rolls vs. rigid lookup) before or instead of heavy equations.
- **Relatable Real-World Analogies**: Anchor abstract concepts in everyday examples (e.g., autocomplete, magician props, creativity dials).

## 2. Dedicated Standalone Topic Modules
- When adding a new concept, create it as its own clean, standalone article/card on the Learn page unless the user explicitly asks to embed it as a sub-section inside an existing page.
- Every module must clearly answer:
  1. What problem are we solving?
  2. What is the fundamental intuition?
  3. Where does it sit in the general AI pipeline?
  4. How do users/engineers control it (e.g. dials, parameters)?
  5. Why does it matter today (hallucinations, reasoning, creativity)?

## 3. Interactive Visualizer Standards
- **Scenario Pickers**: Include multiple relatable prompts/scenarios to demonstrate variety.
- **Intuitive Control Dials**: Use clear sliders (e.g. Creativity / Randomness, Temperature, Probability Thresholds) with plain-English labels and dynamic feedback.
- **Live Action Buttons**: Provide buttons like "🎲 Roll the Dice & Generate" or "Step Forward" so the user directly observes the mechanism in action across multiple trials.
- **4-Step Pipeline Architecture**: Visually show the sequence: Input/Prompt → Neural Brain → The Concept Layer → Final Output.
