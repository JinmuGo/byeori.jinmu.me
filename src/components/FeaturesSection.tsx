import { motion } from "framer-motion";
import { ShieldCheck, Search, ArrowLeftRight, Compass, Clock } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Smart Review Gate",
    tag: "THE GATEKEEPER",
    description: "A cognitive speed-bump that forces deliberate review for high-impact AI changes. Risk-classified from silent pass to blocking modal.",
  },
  {
    icon: Search,
    title: "Root Cause Radar",
    tag: "THE TEACHER",
    description: "Identifies structural mismatches — like Schema vs. API drift — to stop mindless debugging cycles before they start.",
  },
  {
    icon: ArrowLeftRight,
    title: "Concept Bridge",
    tag: "THE EXPANDER",
    description: "A round-trip workflow that captures insights from Web AI and injects them as knowledge assets back into your IDE.",
  },
  {
    icon: Compass,
    title: "Conceptual Compass",
    tag: "THE NAVIGATOR",
    description: "Visualizes data flow and tracks the origin of every code block through dependency mapping. Never lose context again.",
  },
  {
    icon: Clock,
    title: "Context Re-boarding",
    tag: "THE RESTORER",
    description: "A 60-second morning briefing that restores your mental state and intent from the previous session. Pick up exactly where you left off.",
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
          The 5 Core Guardians
        </h2>
        <p className="text-lg text-muted-foreground">
          Five integrated systems that keep you as the commander, not the passenger.
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
