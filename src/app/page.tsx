import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import FeaturesSection from "@/components/FeaturesSection";
import RiskDemo from "@/components/RiskDemo";
import ProofSection from "@/components/ProofSection";
import FaqSection from "@/components/FaqSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import Footer from "@/components/Footer";
import { landingContentV2 } from "@/content/landing/v2";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection content={landingContentV2.hero} />
        <ProblemSection content={landingContentV2.problem} />
        <FeaturesSection content={landingContentV2.features} />
        <RiskDemo content={landingContentV2.riskDemo} />
        <ProofSection content={landingContentV2.proof} />
        <FaqSection content={landingContentV2.faq} />
        <FinalCtaSection content={landingContentV2.finalCta} />
      </main>
      <Footer />
    </div>
  );
}
