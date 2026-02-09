"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RiskDemo = () => {
  const [reviewed, setReviewed] = useState(false);

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
            See It In Action
          </h2>
          <p className="text-lg text-muted-foreground">
            Click "Approve" to simulate a Smart Review Gate clearing a high-risk change.
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
            className={`overflow-hidden rounded-xl border transition-colors duration-500 ${
              reviewed ? "border-risk-low/40 shadow-lg shadow-risk-low/5" : "border-risk-high/40 shadow-lg shadow-risk-high/5"
            } bg-card`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="flex items-center gap-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={reviewed ? "safe" : "blocked"}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium ${
                      reviewed ? "bg-risk-low/10 text-risk-low" : "bg-risk-high/10 text-risk-high"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${reviewed ? "bg-risk-low" : "bg-risk-high animate-pulse"}`} />
                    {reviewed ? "Safe — Approved" : "High Risk — Blocking"}
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="font-mono text-xs text-muted-foreground">db-migration.sql</span>
            </div>

            {/* Code */}
            <div className="p-5">
              <div className="space-y-1 font-mono text-sm">
                <DemoLine num={1} text="ALTER TABLE users" />
                <DemoLine
                  num={2}
                  text="  DROP COLUMN email_verified;"
                  highlight={reviewed ? "green" : "red"}
                />
                <DemoLine num={3} text="-- Removes email verification flag" muted />
              </div>

              {/* Decision note */}
              <AnimatePresence>
                {!reviewed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 rounded-lg border border-risk-high/20 bg-risk-high/5 px-4 py-3"
                  >
                    <p className="mb-1 text-xs font-medium text-risk-high">Decision Note</p>
                    <p className="text-xs text-muted-foreground">
                      This migration will permanently remove the <code className="rounded bg-surface px-1 py-0.5 text-foreground">email_verified</code> column from the users table, affecting all authentication flows.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="mt-5 flex items-center justify-end gap-3">
                {reviewed ? (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setReviewed(false)}
                    className="rounded-md border border-border px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Reset Demo
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setReviewed(true)}
                    className="rounded-md bg-primary px-5 py-2 font-mono text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    ✓ Approve Change
                  </motion.button>
                )}
              </div>
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
