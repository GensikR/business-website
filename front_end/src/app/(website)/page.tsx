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
      <Team />

      {/* Services Section */}
      <Services />


      {/* Featured Work Section */}
      <FeaturedWork />
      {/* Scheduler Section */}
      <div id="scheduler">
        <Scheduler />
      </div>

      {/* Estimator Section */}
      <div id="estimator">
        <EstimatorHome />
      </div>

      {/* Why Choose Us Section */}
      <WhyUs />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />
      
    </div>
  );
}

