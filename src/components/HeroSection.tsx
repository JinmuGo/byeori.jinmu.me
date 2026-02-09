"use client";

import { motion } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-14">
      <div className="absolute inset-0 net-bg opacity-40" />
      <div className="absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[140px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pt-32 pb-20 text-center lg:pt-40">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl"
        >
          The AI <span className="gradient-text">Supervision</span> OS.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Reclaim your agency over complex codebases. Byeori is a cognitive safety layer that prevents blind delegation,
          ensuring you remain the primary architect of your project.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <WaitlistForm />
          <p className="text-xs text-muted-foreground/60">
            Get release notifications. No spam, just the important news.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          className="mt-20 w-full max-w-4xl"
        >
          <div className="overflow-hidden rounded-xl border border-risk-high/40 bg-card shadow-2xl shadow-risk-high/5">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-risk-high/80" />
                <div className="h-3 w-3 rounded-full bg-risk-medium/80" />
                <div className="h-3 w-3 rounded-full bg-risk-low/80" />
              </div>
              <span className="ml-4 font-mono text-xs text-muted-foreground">auth.ts — Smart Review Gate</span>
            </div>
            <div className="relative p-6">
              <div className="mb-4 flex items-center gap-3 rounded-lg border border-risk-high/30 bg-risk-high/5 px-4 py-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-risk-high/20 text-xs text-risk-high">⚠</span>
                <div>
                  <p className="text-sm font-medium text-risk-high">High Risk Change Blocked</p>
                  <p className="text-xs text-muted-foreground">This change modifies authentication logic in auth.ts</p>
                </div>
              </div>
              <div className="space-y-1 font-mono text-sm">
                <CodeLine num={42} text="export async function validateToken(token: string) {" />
                <CodeLine num={43} text="  const decoded = jwt.verify(token, SECRET_KEY);" highlight="red" />
                <CodeLine num={44} text="  // WARNING: Removes signature validation" highlight="red" />
                <CodeLine num={45} text="  return decoded as UserPayload;" />
                <CodeLine num={46} text="}" />
              </div>
              <div className="mt-4 flex items-center justify-end gap-3">
                <button className="rounded-md border border-border px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
                  Dismiss
                </button>
                <button className="rounded-md bg-risk-high/20 px-4 py-1.5 font-mono text-xs text-risk-high transition-colors hover:bg-risk-high/30">
                  Review & Approve
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CodeLine = ({ num, text, highlight }: { num: number; text: string; highlight?: "red" | "green" }) => {
  const bgClass = highlight === "red"
    ? "bg-risk-high/5 border-l-2 border-risk-high/40"
    : highlight === "green"
    ? "bg-risk-low/5 border-l-2 border-risk-low/40"
    : "border-l-2 border-transparent";
  return (
    <div className={`flex items-center rounded-sm px-2 py-0.5 ${bgClass}`}>
      <span className="w-8 shrink-0 text-right text-xs text-muted-foreground/50">{num}</span>
      <span className="ml-4 text-muted-foreground">{text}</span>
    </div>
  );
};

export default HeroSection;
