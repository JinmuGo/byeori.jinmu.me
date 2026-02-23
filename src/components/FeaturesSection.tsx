"use client";

import { motion } from "framer-motion";
import type { FeaturesContent } from "@/content/landing/types";
import { useTrackSectionView } from "@/hooks/use-track-section-view";

interface FeaturesSectionProps {
  content: FeaturesContent;
}

const FeaturesSection = ({ content }: FeaturesSectionProps) => {
  useTrackSectionView("features");

  return (
    <section id="features" className="pitchdeck-section relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="pitchdeck-orb absolute -right-64 -top-56 h-[700px] w-[700px]" />
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

        <div className="grid gap-5 md:grid-cols-3">
          {content.cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-90px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="pitchdeck-card rounded-2xl border border-border/70 p-6"
            >
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary/85">{card.tag}</p>
              <h3 className="mb-3 text-xl font-semibold text-foreground">{card.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
              <div className="rounded-lg border border-primary/20 bg-background/40 px-3 py-2 text-xs text-foreground/90">
                {card.outcome}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
