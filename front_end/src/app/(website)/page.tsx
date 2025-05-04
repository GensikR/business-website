import UniversalHeader from "@/components/UniversalHeader";
import Services from "@/components/services/Services";
import OurImpact from "@/components/home/OurImpact";
import WhyUs from "@/components/home/WhyUs";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Team from "@/components/about/Team";
import EstimatorHome from "@/components/estimate/EstimatorHome";
import Scheduler from "@/components/scheduler/Scheduler";
import FeaturedWork from "@/components/portfolio/FeaturedWork"; 

export default function HomePage() {
  return (
    <div>

    {/* Team Section */}
    <Team/>

    {/* Services Section */}
    <Services/>

    {/* Estimator Section */}
    <EstimatorHome />

    {/* Our Impact Section <OurImpact />*/}

    {/* Featured Work Section */}
    <FeaturedWork />

    {/* Scheduler Section */}
    <Scheduler />

    {/* Why Choose Us Section */}
    <WhyUs />

    {/*Testimonials Section */}
    <Testimonials />

    {/* FAQ Section */}
    <FAQ />

    </div>
  );
}
