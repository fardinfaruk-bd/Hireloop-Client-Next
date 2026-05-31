import HeroSection from "@/components/Banner";
import FeaturedJobsSection from "@/components/FeaturedJobsSection";
import FeaturesSection from "@/components/FeaturedSection";
import StatsSection from "@/components/StatsSection";


export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturedJobsSection />
      <FeaturesSection />
    </div>
  );
}
