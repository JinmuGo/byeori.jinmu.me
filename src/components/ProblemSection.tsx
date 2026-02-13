"use client";

import { motion } from "framer-motion";
import { useTrackSectionView } from "@/hooks/use-track-section-view";

const risks = [
  {
    title: "Velocity Without Memory",
    description:
      "You ship quickly as an AI agent user, but code intent disappears right after the chat closes.",
    borderColor: "border-l-risk-high",
  },
  {
    title: "Fix Anxiety",
    description:
      "Three days later, a small change feels risky because the original rationale is gone.",
    borderColor: "border-l-risk-medium",
  },
  {
    title: "Architectural Drift",
    description:
      "AI iterations slowly violate initial constraints while nobody notices until too late.",
    borderColor: "border-l-risk-low",
  },
];

const ProblemSection = () => {
  useTrackSectionView("problem");

  return (
    <section id="problem" className="relative py-32">
      <div className="glow-line mx-auto mb-20 w-full max-w-md" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-3xl"
        >
          <p className="mb-3 font-mono text-sm text-primary">WHY NOW</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            AI productivity is compounding.
            <span className="block text-muted-foreground">Understanding debt is compounding faster.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Teams are not blocked by generation speed anymore. They are blocked by low confidence when they revisit AI-generated code.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {risks.map((risk, i) => (
            <motion.article
              key={risk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`group rounded-xl border border-border/60 bg-card p-6 transition-colors duration-200 hover:border-border border-l-4 ${risk.borderColor}`}
            >
              <h3 className="mb-2 text-lg font-semibold text-foreground">{risk.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{risk.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
