"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqContent } from "@/content/landing/types";
import { useTrackSectionView } from "@/hooks/use-track-section-view";
import { trackLandingEvent } from "@/lib/analytics";

interface FaqSectionProps {
  content: FaqContent;
}

const FaqSection = ({ content }: FaqSectionProps) => {
  useTrackSectionView("faq");

  return (
    <section id="faq" className="pitchdeck-section relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="pitchdeck-orb absolute -left-64 -bottom-80 h-[760px] w-[760px] opacity-75" />
      </div>

      <div className="glow-line mx-auto mb-20 w-full max-w-md" />
      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 font-mono text-sm text-primary">{content.eyebrow}</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">{content.title}</h2>
          <p className="text-lg text-muted-foreground">{content.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.45 }}
          className="pitchdeck-card rounded-xl border border-border/60 px-6"
        >
          <Accordion
            type="single"
            collapsible
            onValueChange={(value) => {
              if (!value) return;
              trackLandingEvent("landing_demo_interacted", {
                source: "faq_open",
                value,
              });
            }}
          >
            {content.items.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-border/60">
                <AccordionTrigger className="text-left text-foreground hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
