import HeroSection from "@/components/layout/HeroSection";
import PainPoints from "@/components/home/PainPoints";
import HorizontalFeatures from "@/components/home/HorizontalFeatures";
import DataTrust from "@/components/home/DataTrust";
import MarqueeBand from "@/components/home/MarqueeBand";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeBand />
      <PainPoints />
      <HorizontalFeatures />
      <DataTrust />
      <FinalCTA />
    </>
  );
}
