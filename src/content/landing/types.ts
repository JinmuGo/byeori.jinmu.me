export interface HeroContent {
  eyebrow: string;
  headline: string;
  highlightedPhrase: string;
  body: string;
  disclaimer: string;
}

export interface ProblemStat {
  value: number;
  suffix: string;
  label: string;
  copy: string;
}

export interface ProblemContent {
  eyebrow: string;
  title: string;
  description: string;
  stats: ProblemStat[];
  source: string;
  ctaLabel: string;
}

export interface FeatureCard {
  title: string;
  tag: string;
  description: string;
  outcome: string;
}

export interface FeaturesContent {
  eyebrow: string;
  title: string;
  description: string;
  cards: FeatureCard[];
}

export interface DemoStep {
  label: string;
  lockedMessage: string;
}

export interface RiskDemoContent {
  eyebrow: string;
  title: string;
  description: string;
  beforeLabel: string;
  beforeCopy: string;
  afterLabel: string;
  afterCopy: string;
  steps: DemoStep[];
  gateLabel: string;
}

export interface ProofCard {
  metric: string;
  detail: string;
}

export interface ProofContent {
  eyebrow: string;
  title: string;
  description: string;
  cards: ProofCard[];
  pointsLabel: string;
  points: string[];
  founderNote: string;
  founderName: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  description: string;
  items: FaqItem[];
}

export interface FinalCtaContent {
  eyebrow: string;
  title: string;
  body: string;
  reassurance: string;
}

export interface LandingPageContent {
  version: string;
  hero: HeroContent;
  problem: ProblemContent;
  features: FeaturesContent;
  riskDemo: RiskDemoContent;
  proof: ProofContent;
  faq: FaqContent;
  finalCta: FinalCtaContent;
}
