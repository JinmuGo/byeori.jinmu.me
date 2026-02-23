"use client";

import { motion } from "framer-motion";
import type { ProblemContent, ProblemStat } from "@/content/landing/types";
import { useTrackSectionView } from "@/hooks/use-track-section-view";
import { useCountUp } from "@/hooks/use-count-up";
import { trackLandingEvent } from "@/lib/analytics";

interface ProblemSectionProps {
  content: ProblemContent;
}

const StatNumber = ({ value, suffix }: Pick<ProblemStat, "value" | "suffix">) => {
  const { ref, displayValue } = useCountUp(value, { duration: 1500, suffix });

  return (
    <span ref={ref} className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
      {displayValue}
    </span>
  );
};

const ProblemSection = ({ content }: ProblemSectionProps) => {
  useTrackSectionView("problem");

  const handleCtaClick = () => {
    trackLandingEvent("landing_cta_clicked", {
      source: "problem_inline_cta",
      value: "scroll_to_waitlist",
    });
  };

  return (
    <section id="problem" className="pitchdeck-section relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="pitchdeck-orb absolute -right-52 -top-60 h-[620px] w-[620px]" />
        <div className="pitchdeck-orb absolute -left-56 top-28 h-[680px] w-[680px] opacity-80" />
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

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {content.stats.map((stat, index) => (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="pitchdeck-card rounded-2xl border border-border/70 p-6"
            >
              <div className="mb-4">
                <StatNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-primary/85">{stat.label}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{stat.copy}</p>
            </motion.article>
          ))}
        </div>

        <p className="mb-8 text-xs text-muted-foreground/80">{content.source}</p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center"
        >
          <a
            href="#waitlist"
            onClick={handleCtaClick}
            className="inline-flex items-center gap-2 font-mono text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            {content.ctaLabel} <span aria-hidden="true">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
