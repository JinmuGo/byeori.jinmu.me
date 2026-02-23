import type { LandingPageContent } from "@/content/landing/types";

export const landingContentV2: LandingPageContent = {
  version: "pitchdeck-v2-medium",
  hero: {
    eyebrow: "Master the Core, Control the Flow",
    headline: "Stop Hiding Behind AI,",
    highlightedPhrase: "Keep The Human Edge.",
    body: "Most new developers adopt AI in their first week. But heavy delegation correlates with weaker debugging depth. Byeori adds intentional friction inside your IDE so you can ship fast and still explain every technical decision under interview pressure.",
    disclaimer: "Join the early cohort to build speed with explainable ownership.",
  },
  problem: {
    eyebrow: "WHY NOW",
    title: "Senior-looking output can hide junior-level understanding.",
    description:
      "AI velocity is no longer the bottleneck. Interview-readiness and technical ownership are.",
    stats: [
      {
        value: 80,
        suffix: "%",
        label: "New developers adopt AI in week 1",
        copy: "AI-powered coding starts early, before durable debugging habits are formed.",
      },
      {
        value: 17,
        suffix: "%",
        label: "Concept and debugging drop",
        copy: "Heavy AI reliance is linked to lower conceptual understanding and independent problem solving.",
      },
      {
        value: 24,
        suffix: "%",
        label: "Retained understanding",
        copy: "When debugging is fully delegated, only a small fraction of core reasoning is retained.",
      },
    ],
    source: "Source: GitHub Octoverse 2025 + recent learning-retention studies",
    ctaLabel: "Sound familiar? Get early access",
  },
  features: {
    eyebrow: "THREE-PHASE LEARNING SYSTEM",
    title: "Keep AI speed. Recover human depth.",
    description:
      "Byeori operationalizes technical agency with a phased loop inspired by the pitchdeck narrative.",
    cards: [
      {
        title: "Phase 1 · Strategic Setup",
        tag: "ALIGN",
        description:
          "Capture user goals and generate a dynamic roadmap that aligns output speed with long-term skill growth.",
        outcome: "You know what to learn before writing another prompt.",
      },
      {
        title: "Phase 2 · Intelligent Daily Loop",
        tag: "PRACTICE",
        description:
          "Pre-coding alignment, active Socratic coding, and post-coding capture run in every development cycle.",
        outcome: "Understanding compounds while projects still ship.",
      },
      {
        title: "Phase 3 · Verified Mastery",
        tag: "PROVE",
        description:
          "Competency reporting turns invisible reasoning into explainable ownership for interviews and hiring.",
        outcome: "You can explain your architecture, not just present a demo.",
      },
    ],
  },
  riskDemo: {
    eyebrow: "BEHAVIOR SHIFT DEMO",
    title: "From blind patching to evidence-based fixes",
    description:
      "This simulation shows how Byeori gates guided fixes until your own hypothesis and rationale are present.",
    beforeLabel: "Before",
    beforeCopy: "Ask for a patch, apply it quickly, forget the design logic by the next day.",
    afterLabel: "After",
    afterCopy: "State your reasoning first, unlock guidance second, and retain explainable context.",
    steps: [
      {
        label: "Submit hypothesis",
        lockedMessage: "Guided fix stays locked until your own hypothesis is recorded.",
      },
      {
        label: "Review rationale",
        lockedMessage: "Root-cause context is surfaced before patch suggestions are shown.",
      },
      {
        label: "Request guided fix",
        lockedMessage: "Guidance unlocks only after reasoning evidence is complete.",
      },
    ],
    gateLabel: "Try analysis-first gate preview",
  },
  proof: {
    eyebrow: "MEASURABLE OUTCOMES",
    title: "Track understanding, not just output.",
    description:
      "Byeori is positioned where AI-powered velocity and technical agency can coexist.",
    cards: [
      {
        metric: "Independent Fix Rate",
        detail: "How often users resolve issues without immediately delegating the entire fix to AI.",
      },
      {
        metric: "Concept Mastery Score",
        detail: "Short checks confirm whether users can explain root causes and trade-offs.",
      },
      {
        metric: "Query Quality Index",
        detail: "Measure whether prompts become more targeted, contextual, and technically grounded.",
      },
    ],
    pointsLabel: "Early launch confidence",
    points: [
      "Collected from day-one onboarding sessions.",
      "Works with existing AI coding workflows.",
      "Designed for interview-defensible project storytelling.",
    ],
    founderNote:
      "I built Byeori after facing the same crisis of unexplainable code as a junior builder.",
    founderName: "Jinmu Go · Founder",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions before joining the cohort",
    description:
      "Direct answers to the concerns that most often block waitlist conversion.",
    items: [
      {
        id: "speed",
        question: "Will this slow me down?",
        answer:
          "It adds lightweight checkpoints, not heavyweight blockers. You keep shipping while building durable understanding.",
      },
      {
        id: "anti-ai",
        question: "Is Byeori anti-AI?",
        answer:
          "No. Byeori is pro-AI and anti-dependency. It keeps AI productivity while forcing reasoning ownership.",
      },
      {
        id: "workflow",
        question: "Do I need to replace my current tools?",
        answer:
          "No. Byeori layers on top of existing AI workflows and IDE habits without replacing your stack.",
      },
      {
        id: "privacy",
        question: "Does Byeori send my code to the cloud?",
        answer:
          "Core context operations are local-first, so sensitive code reasoning can remain on-device.",
      },
    ],
  },
  finalCta: {
    eyebrow: "EARLY ACCESS",
    title: "Build fast. Explain faster.",
    body: "Join the waitlist to keep AI velocity while proving your technical depth in real interview scenarios.",
    reassurance: "No spam. Cohort invites only.",
  },
};
