import { motion } from "framer-motion";
import { RefreshCw, Layers, BrainCircuit } from "lucide-react";

const risks = [
  {
    icon: RefreshCw,
    title: "Unconscious Loops",
    description: 'Breaking the cycle of repetitive "Fix this" prompts without understanding the root cause.',
    iconBg: "bg-risk-high/10",
    iconColor: "text-risk-high",
  },
  {
    icon: Layers,
    title: "Context Fragmentation",
    description: "Eliminating the knowledge gap between fragmented AI conversations and your local project.",
    iconBg: "bg-risk-medium/10",
    iconColor: "text-risk-medium",
  },
  {
    icon: BrainCircuit,
    title: "Technical Atrophy",
    description: "Ensuring you maintain deep code comprehension and ownership in the AI-native era.",
    iconBg: "bg-risk-low/10",
    iconColor: "text-risk-low",
  },
];

const ProblemSection = () => (
  <section id="problem" className="relative py-32">
    <div className="glow-line mx-auto mb-20 w-full max-w-md" />
    <div className="mx-auto max-w-6xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-16 max-w-2xl"
      >
        <p className="mb-3 font-mono text-sm text-primary">THE PROBLEM</p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          The Risk of AI Autopilot
        </h2>
        <p className="text-lg text-muted-foreground">
          Traditional AI tools prioritize speed over comprehension, leading to{" "}
          <span className="text-foreground font-medium">"Blind Delegation."</span>
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {risks.map((risk, i) => (
          <motion.div
            key={risk.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group rounded-xl border border-border/60 bg-card p-6 transition-colors duration-200 hover:border-border"
          >
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${risk.iconBg}`}>
              <risk.icon className={`h-5 w-5 ${risk.iconColor}`} />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">{risk.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{risk.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
