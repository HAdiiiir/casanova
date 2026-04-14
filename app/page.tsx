import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { FeaturedUnits } from "@/components/home/featured-units";
import { ZonesSection } from "@/components/home/zones-section";
import { StatsSection } from "@/components/home/stats-section";
import { MapSection } from "@/components/home/map-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <FeaturedProjects />
      <FeaturedUnits />
      <ZonesSection />
      <MapSection />
      <CTASection />
    </div>
  );
}
