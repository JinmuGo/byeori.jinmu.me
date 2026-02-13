"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTrackSectionView } from "@/hooks/use-track-section-view";
import { trackLandingEvent } from "@/lib/analytics";

const faqItems = [
  {
    id: "privacy",
    question: "Does Byeori send my code to the cloud?",
    answer: "Byeori is local-first. Core context operations run locally, so you can keep sensitive code and reasoning data on-device.",
  },
  {
    id: "workflow",
    question: "Will this break my AI agent workflow?",
    answer: "No. Byeori is designed to sit on top of existing AI agent workflows and add context recovery plus analysis-first guardrails.",
  },
  {
    id: "strictness",
    question: "Is learning mode always forced?",
    answer: "No. Adaptive mode can recommend learning support, but production mode remains available when you need low-friction execution.",
  },
];

const FaqSection = () => {
  useTrackSectionView("faq");

  return (
    <section id="faq" className="relative py-32">
      <div className="glow-line mx-auto mb-20 w-full max-w-md" />
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 font-mono text-sm text-primary">FAQ</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Common launch questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Direct answers to the risks most teams ask about before trying Byeori.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-border/60 bg-card px-6"
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
            {faqItems.map((item) => (
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
