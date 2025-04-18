import UniversalHeader from "@/components/UniversalHeader";
import Blog from "@/components/Blog";

export default function PortfolioPage() {
  return (
    <div>
      {/* Universal Header Component */}
    <UniversalHeader
      title="This Will Be a Remodeling Blog"
      subtitle="Browse Our Completed Remodeling Projects"
      description="From cozy bathroom updates to full-home renovations, see how we've helped clients turn their ideas into beautiful spaces. Your dream home could be next!"
    />

    {/* Blog Section */}
    <Blog />

    </div>
  );
}
