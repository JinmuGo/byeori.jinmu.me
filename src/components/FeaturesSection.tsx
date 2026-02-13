"use client";

import { motion } from "framer-motion";
import { useTrackSectionView } from "@/hooks/use-track-section-view";

interface CoreLoopCard {
  title: string;
  tag: string;
  description: string;
  outcome: string;
}

const coreLoopCards: CoreLoopCard[] = [
  {
    title: "Adaptive Mode",
    tag: "STEP 1",
    description:
      "Automatically recommends Production or Learning mode and intervention level based on your current signals.",
    outcome: "You get the right level of guidance for the current task, not generic hand-holding.",
  },
  {
    title: "Debugging Tutor Gate",
    tag: "STEP 2",
    description:
      "Guided fixes stay locked until you submit your own hypothesis and reasoning.",
    outcome: "You stop skipping understanding and build repeatable debugging habits.",
  },
  {
    title: "Cognitive Check",
    tag: "STEP 3",
    description:
      "Short concept checks score comprehension per topic and feed mastery metrics.",
    outcome: "You can see whether understanding is improving, not just commit count.",
  },
  {
    title: "Query Efficiency Dashboard",
    tag: "STEP 4",
    description:
      "Tracks time-to-context, independent fix rate, mastery score, and query efficiency over time.",
    outcome: "You can prove workflow quality gains instead of relying on gut feeling.",
  },
];

const FeaturesSection = () => {
  useTrackSectionView("features");

  return (
    <section id="features" className="relative py-32">
      <div className="glow-line mx-auto mb-20 w-full max-w-md" />
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-3xl"
        >
          <p className="mb-3 font-mono text-sm text-primary">V5 CORE LOOP</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Analyze first. Fix with context. Measure what improved.
          </h2>
          <p className="text-lg text-muted-foreground">
            Byeori turns AI coding from a one-shot generator into a feedback loop that compounds developer understanding.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {coreLoopCards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group rounded-xl border border-border/60 bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:glow-primary"
            >
              <div className="mb-4 flex items-center gap-2.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {card.tag}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
              <div className="rounded-md border border-border/60 bg-background/60 px-3 py-2 text-xs text-foreground/90">
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
