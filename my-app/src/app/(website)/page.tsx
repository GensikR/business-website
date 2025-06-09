import Services from "@/components/services/Services";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Team from "@/components/about/Team";
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

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />
      
    </div>
  );
}

