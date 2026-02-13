"use client";

import { motion } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";
import NetVisualization from "@/components/NetVisualization";
import { useTrackSectionView } from "@/hooks/use-track-section-view";

const HeroSection = () => {
  useTrackSectionView("top");

  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-14">
      <div className="absolute inset-0">
        <NetVisualization />
      </div>

      <div className="absolute left-1/2 top-[38%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[160px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pt-32 pb-20 text-center lg:pt-40">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl"
        >
          AI, <span className="gradient-text">Under Your Command</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-xl"
        >
          Byeori prevents blind fixes with an analysis-first loop: hypothesis, guided fix, and independent resolution
          tracking. Keep speed without context debt.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56, duration: 0.6 }}
          className="flex flex-col items-center gap-3"
          id="waitlist"
        >
          <WaitlistForm source="hero_waitlist" />
          <p className="text-xs text-muted-foreground/70">
            Early access includes the v5 Learning Mode and mastery dashboard.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
