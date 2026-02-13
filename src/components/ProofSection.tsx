"use client";

import { motion } from "framer-motion";
import { useTrackSectionView } from "@/hooks/use-track-section-view";

const proofCards = [
  {
    metric: "Independent Fix Rate",
    detail: "Track how often developers resolve issues without immediate AI patching.",
  },
  {
    metric: "Quiz Mastery Score",
    detail: "Measure concept understanding with short checks across key debugging topics.",
  },
  {
    metric: "Query Efficiency",
    detail: "Observe whether context retrieval becomes faster and more targeted over time.",
  },
];

const proofPoints = [
  "Metrics are collected from day one of onboarding.",
  "Learning mode and production mode both remain available.",
  "Error handling and settings controls are part of launch scope.",
];

const ProofSection = () => {
  useTrackSectionView("proof");

  return (
    <section id="proof" className="relative py-32">
      <div className="glow-line mx-auto mb-20 w-full max-w-md" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-3xl"
        >
          <p className="mb-3 font-mono text-sm text-primary">PROOF</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Built to be measurable, not hand-wavy.
          </h2>
          <p className="text-lg text-muted-foreground">
            Byeori does not stop at UX claims. It tracks whether your team is actually getting better at AI-assisted development.
          </p>
        </motion.div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {proofCards.map((card, index) => (
            <motion.article
              key={card.metric}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="rounded-xl border border-border/60 bg-card p-6"
            >
              <p className="mb-3 text-base font-semibold text-foreground">{card.metric}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{card.detail}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-border/60 bg-card p-6"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-primary">Launch confidence</p>
          <ul className="grid gap-3 md:grid-cols-3">
            {proofPoints.map((point) => (
              <li key={point} className="rounded-md border border-border/60 bg-background/50 px-4 py-3 text-sm text-muted-foreground">
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ProofSection;
