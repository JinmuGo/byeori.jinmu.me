"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackLandingEvent } from "@/lib/analytics";
import { useTrackSectionView } from "@/hooks/use-track-section-view";

interface DemoStep {
  label: string;
  lockedMessage: string;
}

const demoSteps: DemoStep[] = [
  {
    label: "Submit hypothesis",
    lockedMessage: "Guided fix locked until you submit your own hypothesis.",
  },
  {
    label: "Review rationale",
    lockedMessage: "Why this code path fails is shown before any patch is suggested.",
  },
  {
    label: "Request guided fix",
    lockedMessage: "Guided fix unlocks only after analysis evidence is present.",
  },
];

const RiskDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);
  useTrackSectionView("demo");

  const statusText = useMemo(() => demoSteps[activeStep]?.lockedMessage, [activeStep]);

  const openOverlay = (source: string) => {
    setOverlayOpen(true);
    trackLandingEvent("landing_demo_interacted", {
      source,
      value: "overlay_open",
    });
  };

  return (
    <section id="demo" className="relative py-32">
      <div className="glow-line mx-auto mb-20 w-full max-w-md" />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-3 font-mono text-sm text-primary">INTERACTIVE CORE LOOP</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Before: blind patching.
            <span className="block text-muted-foreground">After: analysis-first fixes with evidence.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            This is the behavior shift for AI agent users: no fix suggestion until your own reasoning is captured.
          </p>
        </motion.div>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-risk-medium/40 bg-card p-5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-risk-medium">Before</p>
            <p className="text-sm text-muted-foreground">"Patch this now" leads to fast output and low confidence on revisit.</p>
          </div>
          <div className="rounded-xl border border-risk-low/40 bg-card p-5">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-risk-low">After</p>
            <p className="text-sm text-muted-foreground">Hypothesis first, guided fix second, independent resolution tracked as a metric.</p>
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
            className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card shadow-lg shadow-primary/5 transition-all duration-500"
            onMouseEnter={() => openOverlay("demo_card_hover")}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
              <div className="flex h-6 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 text-xs font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Learning mode active
              </div>
              <span className="font-mono text-xs text-muted-foreground">debug_tutor_session.ts</span>
            </div>

            <div className="relative p-5">
              <div className="mb-4 space-y-1 font-mono text-sm">
                <DemoLine num={18} text="const hypothesis = await collectUserHypothesis();" highlight={activeStep === 0 ? "green" : undefined} />
                <DemoLine num={19} text="if (!hypothesis) return lockGuidedFix();" highlight={activeStep === 0 ? "green" : undefined} />
                <DemoLine num={20} text="const rationale = await explainFailureContext();" highlight={activeStep === 1 ? "green" : undefined} />
                <DemoLine num={21} text="const guidedFix = await requestGuidedFix(rationale);" highlight={activeStep === 2 ? "green" : undefined} />
                <DemoLine num={22} text="await recordIndependentFixEvent(sessionId);" highlight={activeStep === 2 ? "green" : undefined} />
              </div>

              <div className="mb-4 grid gap-2 sm:grid-cols-3">
                {demoSteps.map((step, index) => (
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
                Try analysis-first gate preview
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
  highlight?: "green";
}) => {
  const bg = highlight === "green"
    ? "bg-risk-low/5 border-l-2 border-risk-low/40"
    : "border-l-2 border-transparent";

  return (
    <div className={`flex items-center rounded-sm px-2 py-0.5 transition-colors duration-500 ${bg}`}>
      <span className="w-6 shrink-0 text-right text-xs text-muted-foreground/50">{num}</span>
      <span className="ml-4 text-muted-foreground">{text}</span>
    </div>
  );
};

export default RiskDemo;
