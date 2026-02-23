"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { RiskDemoContent } from "@/content/landing/types";
import { useTrackSectionView } from "@/hooks/use-track-section-view";
import { trackLandingEvent } from "@/lib/analytics";

interface RiskDemoProps {
  content: RiskDemoContent;
}

const RiskDemo = ({ content }: RiskDemoProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useTrackSectionView("demo");

  const statusText = useMemo(
    () => content.steps[activeStep]?.lockedMessage ?? "",
    [activeStep, content.steps],
  );

  const openOverlay = (source: string) => {
    setOverlayOpen(true);
    trackLandingEvent("landing_demo_interacted", {
      source,
      value: "overlay_open",
    });
  };

  return (
    <section id="demo" className="pitchdeck-section relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="pitchdeck-orb absolute -left-72 -top-44 h-[760px] w-[760px] opacity-85" />
      </div>

      <div className="glow-line mx-auto mb-20 w-full max-w-md" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-3 font-mono text-sm text-primary">{content.eyebrow}</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">{content.title}</h2>
          <p className="text-lg text-muted-foreground">{content.description}</p>
        </motion.div>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="pitchdeck-card rounded-xl border border-primary/15 p-5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-primary/75">{content.beforeLabel}</p>
            <p className="text-sm text-muted-foreground">{content.beforeCopy}</p>
          </div>
          <div className="pitchdeck-card rounded-xl border border-primary/30 p-5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-primary">{content.afterLabel}</p>
            <p className="text-sm text-muted-foreground">{content.afterCopy}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <div
            className="pitchdeck-card group relative overflow-hidden rounded-2xl border border-primary/25 shadow-lg shadow-primary/5 transition-all duration-500"
            onMouseEnter={() => openOverlay("demo_card_hover")}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
              <div className="flex h-6 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 text-xs font-medium text-primary">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                Intentional friction active
              </div>
              <span className="font-mono text-xs text-muted-foreground">interview_guardrail.ts</span>
            </div>

            <div className="relative p-5">
              <div className="mb-4 space-y-1 font-mono text-sm">
                <DemoLine num={18} text="const hypothesis = await collectUserHypothesis();" highlight={activeStep === 0} />
                <DemoLine num={19} text="if (!hypothesis) return lockGuidedFix();" highlight={activeStep === 0} />
                <DemoLine num={20} text="const rationale = await explainFailureContext();" highlight={activeStep === 1} />
                <DemoLine num={21} text="const guidedFix = await requestGuidedFix(rationale);" highlight={activeStep === 2} />
                <DemoLine num={22} text="await recordIndependentFixEvent(sessionId);" highlight={activeStep === 2} />
              </div>

              <div className="mb-4 grid gap-2 sm:grid-cols-3">
                {content.steps.map((step, index) => (
                  <button
                    key={step.label}
                    type="button"
                    onClick={() => {
                      setActiveStep(index);
                      openOverlay("demo_step_click");
                    }}
                    className={`rounded-md border px-3 py-2 text-left text-xs transition-colors ${
                      activeStep === index
                        ? "border-primary/50 bg-primary/10 text-foreground"
                        : "border-border/70 bg-background/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => openOverlay("demo_try_gate")}
                className="text-xs font-semibold text-primary hover:underline"
              >
                {content.gateLabel}
              </button>

              <AnimatePresence>
                {overlayOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute inset-x-4 bottom-4 z-20 rounded-lg border border-primary/30 bg-background/95 p-4 shadow-2xl backdrop-blur-md"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Gate status</span>
                      <button
                        type="button"
                        onClick={() => setOverlayOpen(false)}
                        className="text-[10px] text-muted-foreground hover:text-foreground"
                      >
                        Close
                      </button>
                    </div>
                    <p className="text-xs leading-relaxed text-foreground">{statusText}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const DemoLine = ({
  num,
  text,
  highlight,
}: {
  num: number;
  text: string;
  highlight: boolean;
}) => {
  const bg = highlight
    ? "bg-primary/6 border-l-2 border-primary/40"
    : "border-l-2 border-transparent";

  return (
    <div className={`flex items-center rounded-sm px-2 py-0.5 transition-colors duration-500 ${bg}`}>
      <span className="w-6 shrink-0 text-right text-xs text-muted-foreground/50">{num}</span>
      <span className="ml-4 text-muted-foreground">{text}</span>
    </div>
  );
};

export default RiskDemo;
