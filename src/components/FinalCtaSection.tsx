"use client";

import { motion } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";
import type { FinalCtaContent } from "@/content/landing/types";
import { useTrackSectionView } from "@/hooks/use-track-section-view";

interface FinalCtaSectionProps {
  content: FinalCtaContent;
}

const FinalCtaSection = ({ content }: FinalCtaSectionProps) => {
  useTrackSectionView("final-cta");

  return (
    <section id="final-cta" className="pitchdeck-section relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="pitchdeck-orb absolute -right-72 -top-56 h-[760px] w-[760px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45 }}
          className="pitchdeck-card rounded-3xl border border-primary/35 p-8 text-center shadow-lg shadow-primary/10 md:p-12"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">{content.eyebrow}</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">{content.title}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground md:text-lg">{content.body}</p>
          <div className="mx-auto mb-4 flex max-w-md justify-center">
            <WaitlistForm source="final_cta_waitlist" />
          </div>
          <p className="text-xs text-muted-foreground/85">{content.reassurance}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
