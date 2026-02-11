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
          AI, <span className="gradient-text">Under Your Command</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Reclaim mastery over AI-generated code. Byeori is a native <span className="text-foreground">macOS Application</span> that provides the IDE-native Context Layer for modern architects.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <WaitlistForm />
          <p className="text-xs text-muted-foreground/60">
            Get early access to The Lens (MVP v1.0).
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
          className="mt-20 w-full max-w-4xl"
        >
          <div className="group overflow-hidden rounded-xl border border-primary/20 bg-card shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-border" />
                <div className="h-3 w-3 rounded-full bg-border" />
                <div className="h-3 w-3 rounded-full bg-border" />
              </div>
              <span className="ml-4 font-mono text-xs text-muted-foreground">payment-utils.ts — The "Why" Overlay</span>
            </div>
            <div className="relative p-6">
              <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-lg border border-primary/30 bg-background/95 p-4 shadow-xl backdrop-blur-sm">
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Source Trace</span>
                    <span className="text-[10px] text-muted-foreground">3 days ago</span>
                  </div>
                  <p className="mb-3 text-sm font-medium text-foreground">
                    "Optimize payment processing speed for slow networks"
                  </p>
                  <div className="flex items-center gap-2 border-t border-border pt-2 text-[11px] text-muted-foreground">
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-primary/10 text-[10px] text-primary">C</span>
                    Claude 3.5 Sonnet • Cursor Session #142
                  </div>
                  <button className="mt-3 w-full rounded bg-primary/10 py-1 text-[10px] font-medium text-primary hover:bg-primary/20 transition-colors">
                    Jump to Original Conversation →
                  </button>
                </div>
              </div>

              <div className="space-y-1 font-mono text-sm blur-[1px] transition-all group-hover:blur-0">
                <CodeLine num={84} text="export async function processPayment(data: PaymentData) {" />
                <CodeLine num={85} text="  const retryStrategy = new ExponentialBackoff({" />
                <CodeLine num={86} text="    maxRetries: 3," highlight="green" />
                <CodeLine num={87} text="    baseDelay: 100" highlight="green" />
                <CodeLine num={88} text="  });" />
                <CodeLine num={89} text="  return await retryStrategy.execute(() => api.charge(data));" />
                <CodeLine num={90} text="}" />
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
