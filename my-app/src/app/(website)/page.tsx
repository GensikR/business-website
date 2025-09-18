import Services from "@/components/services/Services";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Team from "@/components/about/Team";
import Scheduler from "@/components/scheduler/Scheduler";
import FeaturedWork from "@/components/portfolio/FeaturedWork"; 
import Gallery from "@/components/portfolio/Gallery";
import ComponentContainer from "@/components/layout/ComponentContainer";

export default function HomePage() {
  return (
    <div>
      {/* Gallery */}
      <Gallery/>

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

