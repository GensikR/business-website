import UniversalHeader from "@/components/UniversalHeader";
import Services from "@/components/services/Services"; // Import the Services component

export default function ServicesPage() {
  return (
    <div>

    {/* Universal Header Component */}  
    <UniversalHeader
      title="Our Remodeling Services"
      subtitle="From Bathrooms to Patios — We Do It All"
      description="Explore our range of professional remodeling services including kitchens, bathrooms, living rooms, bedrooms, patios, and more. We tailor every project to your vision and budget."
    />

    {/* Services Section */}
    <Services />

    </div>
  );
}
