import HeroSection from "@/components/layout/HeroSection";
import FeatureCards from "@/components/home/FeatureCard";
import SampleReport from "@/components/home/SampleReport";
import DataTrust from "@/components/home/DataTrust";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <SampleReport />
      <DataTrust />
    </>
  );
}
