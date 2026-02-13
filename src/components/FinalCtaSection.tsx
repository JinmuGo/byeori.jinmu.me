"use client";

import { motion } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";
import { useTrackSectionView } from "@/hooks/use-track-section-view";

const FinalCtaSection = () => {
  useTrackSectionView("final-cta");

  return (
    <section id="final-cta" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-primary/30 bg-card p-8 text-center shadow-lg shadow-primary/10 md:p-12"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-primary">Early Access</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Replace context debt with measurable learning.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground md:text-lg">
            Join the waitlist to try Byeori with the v5 adaptive mode, debugging tutor gate, and mastery metrics dashboard.
          </p>
          <div className="mx-auto flex max-w-md justify-center">
            <WaitlistForm source="final_cta_waitlist" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
