"use client";

import { motion } from "framer-motion";
import type { ProofContent } from "@/content/landing/types";
import { useTrackSectionView } from "@/hooks/use-track-section-view";

interface ProofSectionProps {
  content: ProofContent;
}

const ProofSection = ({ content }: ProofSectionProps) => {
  useTrackSectionView("proof");

  return (
    <section id="proof" className="pitchdeck-section relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="pitchdeck-orb absolute -right-56 top-20 h-[700px] w-[700px] opacity-80" />
      </div>

      <div className="glow-line mx-auto mb-20 w-full max-w-md" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-3xl"
        >
          <p className="mb-3 font-mono text-sm text-primary">{content.eyebrow}</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">{content.title}</h2>
          <p className="text-lg text-muted-foreground">{content.description}</p>
        </motion.div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {content.cards.map((card, index) => (
            <motion.article
              key={card.metric}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="pitchdeck-card rounded-xl border border-border/60 p-6"
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
          transition={{ duration: 0.45 }}
          className="mb-8 rounded-xl border border-border/60 bg-card/70 p-6"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-primary">{content.pointsLabel}</p>
          <ul className="grid gap-3 md:grid-cols-3">
            {content.points.map((point) => (
              <li
                key={point}
                className="rounded-md border border-border/60 bg-background/50 px-4 py-3 text-sm text-muted-foreground"
              >
                {point}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.45 }}
          className="pitchdeck-card rounded-2xl border border-primary/25 px-6 py-7"
        >
          <p className="text-xl font-semibold leading-relaxed text-foreground md:text-2xl">“{content.founderNote}”</p>
          <footer className="mt-4 text-sm text-muted-foreground">{content.founderName}</footer>
        </motion.blockquote>
      </div>
    </section>
  );
};

export default ProofSection;
