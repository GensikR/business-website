import UniversalHeader from "@/components/UniversalHeader";
import FeaturedWork from "@/components/portfolio/FeaturedWork"; 

export default function PortfolioPage() {
  return (
    <div>
      {/* Universal Header Component */}
    <UniversalHeader
      title="Our Work Speaks for Itself"
      subtitle="Browse Our Completed Remodeling Projects"
      description="From cozy bathroom updates to full-home renovations, see how we've helped clients turn their ideas into beautiful spaces. Your dream home could be next!"
    />

    {/* Featured Work Section */}
    <FeaturedWork />

    </div>
  );
}
