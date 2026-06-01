import HeroSection from "@/components/Banner";
import CTASection from "@/components/CTASection";
import FeaturedJobsSection from "@/components/FeaturedJobsSection";
import FeaturesSection from "@/components/FeaturedSection";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturedJobsSection />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}
