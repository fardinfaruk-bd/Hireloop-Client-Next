import HeroSection from "@/components/Banner";
import FeaturedJobsSection from "@/components/FeaturedJobsSection";
import StatsSection from "@/components/StatsSection";
import { div } from "motion/react-client";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <FeaturedJobsSection />
    </div>
  );
}
