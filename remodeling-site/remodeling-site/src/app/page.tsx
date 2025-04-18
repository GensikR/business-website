import UniversalHeader from "@/components/UniversalHeader";
import Services from "@/components/services/Services";
import OurImpact from "@/components/home/OurImpact";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <div>

    {/* Header Section */}
    <UniversalHeader
      title="Transform Your Home with Mauri Remodeling"
      subtitle="Quality craftsmanship, honest pricing, and stunning results."
      description="Whether you're updating a single room or tackling a full home remodel, we bring expertise and care to every project. Explore our work, schedule a free consultation, and take the first step toward your dream home."
    />

    {/* Services Section */}
    <Services/>

    {/* Our Impact Section */}
    <OurImpact />

    {/* Why Choose Us Section */}
    <WhyUs />

    {/*Testimonials Section */}
    <Testimonials />

    {/* FAQ Section */}
    <FAQ />

    </div>
  );
}
