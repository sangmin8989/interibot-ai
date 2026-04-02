import HeroSection from "@/components/layout/HeroSection";
import PainPoints from "@/components/home/PainPoints";
import FeatureShowcase from "@/components/home/FeatureShowcase";
import DataTrust from "@/components/home/DataTrust";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PainPoints />
      <FeatureShowcase />
      <DataTrust />
      <FinalCTA />
    </>
  );
}
