"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RiskDemo = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section id="demo" className="relative py-32">
      <div className="glow-line mx-auto mb-20 w-full max-w-md" />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 font-mono text-sm text-primary">INTERACTIVE DEMO</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Recover Lost Context
          </h2>
          <p className="text-lg text-muted-foreground">
            Hover over the highlighted code to see exactly how and why it was created.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <div
            className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card shadow-lg shadow-primary/5 transition-all duration-500"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-6 items-center gap-1.5 rounded-full bg-primary/10 px-2.5 text-xs font-medium text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Context Layer Active
                </div>
              </div>
              <span className="font-mono text-xs text-muted-foreground">auth-utils.ts</span>
            </div>

            {/* Code */}
            <div className="relative p-5">
              <div className="space-y-1 font-mono text-sm">
                <DemoLine num={42} text="export async function validateToken(token: string) {" />
                <DemoLine
                  num={43}
                  text="  const { data, error } = await supabase.auth.getUser(token);"
                  highlight={hovered ? "green" : undefined}
                />
                <DemoLine
                  num={44}
                  text="  if (error || !data.user) throw new Error('Invalid token');"
                  highlight={hovered ? "green" : undefined}
                />
                <DemoLine num={45} text="  return data.user;" />
                <DemoLine num={46} text="}" />
              </div>

              {/* Overlay Tooltip */}
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute top-1/2 left-1/2 z-20 w-80 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-primary/30 bg-background/95 p-4 shadow-2xl backdrop-blur-md"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Origin Session</span>
                      <span className="text-[10px] text-muted-foreground">Feb 8, 2026</span>
                    </div>
                    <p className="mb-3 text-xs leading-relaxed text-foreground">
                      "I need to implement a secure token validation using the Supabase Auth helper. Make sure to handle both errors and missing user data."
                    </p>
                    <div className="flex items-center justify-between border-t border-border pt-3">
                      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="flex h-4 w-4 items-center justify-center rounded bg-primary/10 text-[9px] text-primary">C</span>
                        Claude 3.5 • Cursor
                      </div>
                      <button className="text-[10px] font-semibold text-primary hover:underline">
                        Read Full Chat →
                      </button>
                    </div>
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

const DemoLine = ({ num, text, highlight, muted }: { num: number; text: string; highlight?: "red" | "green"; muted?: boolean }) => {
  const bg = highlight === "red"
    ? "bg-risk-high/5 border-l-2 border-risk-high/40"
    : highlight === "green"
    ? "bg-risk-low/5 border-l-2 border-risk-low/40"
    : "border-l-2 border-transparent";

  return (
    <div className={`flex items-center rounded-sm px-2 py-0.5 transition-colors duration-500 ${bg}`}>
      <span className="w-6 shrink-0 text-right text-xs text-muted-foreground/50">{num}</span>
      <span className={`ml-4 ${muted ? "text-muted-foreground/50 italic" : "text-muted-foreground"}`}>{text}</span>
    </div>
  );
};

export default RiskDemo;
