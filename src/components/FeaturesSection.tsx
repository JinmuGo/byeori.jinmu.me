"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Search, ArrowLeftRight, Compass, Clock } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: 'The "Why" Overlay',
    tag: "THE TRACE",
    description: "Hover over any code block to see the original AI conversation that birthed it. Never wonder 'why' again.",
  },
  {
    icon: ArrowLeftRight,
    title: "Concept Capture",
    tag: "THE BRIDGE",
    description: "Chrome extension to capture deep architectural decisions from Web AI (Claude/GPT) and inject them into your IDE vault.",
  },
  {
    icon: Search,
    title: "Semantic Navigation",
    tag: "THE INTENT",
    description: "Find code by architectural intent, not just text. 'Where is the session logic?' — Navigate instantly via vector search.",
  },
  {
    icon: Compass,
    title: "Conceptual Compass",
    tag: "THE NAVIGATOR",
    description: "A mental map of your system's core philosophy. Understand how everything fits together at a glance.",
  },
  {
    icon: Clock,
    title: "Context Re-boarding",
    tag: "THE RESTORER",
    description: "Restore your mental state in 60 seconds. A morning briefing on the 'intent' behind yesterday's AI iterations.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="relative py-32">
    <div className="glow-line mx-auto mb-20 w-full max-w-md" />
    <div className="mx-auto max-w-6xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-16 max-w-2xl"
      >
        <p className="mb-3 font-mono text-sm text-primary">CORE FEATURES</p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          The Lens (MVP 1.0)
        </h2>
        <p className="text-lg text-muted-foreground">
          Three core systems to restore your vision and control in an AI-native codebase.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={`group rounded-xl border border-border/60 bg-card p-6 transition-all duration-200 hover:border-primary/30 hover:glow-primary ${
              i >= 3 ? "lg:col-span-1" : ""
            }`}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                {feature.tag}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
