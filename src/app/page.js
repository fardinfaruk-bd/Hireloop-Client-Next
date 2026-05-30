import HeroSection from "@/components/Banner";
import StatsSection from "@/components/StatsSection";
import { div } from "motion/react-client";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
    </div>
  );
}
