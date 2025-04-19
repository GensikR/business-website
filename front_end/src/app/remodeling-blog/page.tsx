import UniversalHeader from "@/components/UniversalHeader";
import Blog from "@/components/blog/Blog";

export default function PortfolioPage() {
  return (
    <div>
      {/* Universal Header Component */}
    <UniversalHeader
      title="Home Remodeling Blog"
      subtitle="Your Guide to Home Renovation and Design"
      description="From cozy bathroom updates to full-home renovations, see how we've helped clients turn their ideas into beautiful spaces. Your dream home could be next!"
    />

    {/* Blog Section */}
    <Blog />

    </div>
  );
}
