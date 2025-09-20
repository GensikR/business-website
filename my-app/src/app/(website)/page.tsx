import Services from "@/app/(website)/components/services/Services";
import Testimonials from "@/app/(website)/components/home/Testimonials";
import FAQ from "@/app/(website)/components/home/FAQ";
import Team from "@/app/(website)/components/about/Team";
import Scheduler from "@/app/(website)/components/scheduler/Scheduler";
import FeaturedWork from "@/app/(website)/components/portfolio/FeaturedWork"; 
import Gallery from "@/app/(website)/components/portfolio/Gallery";

export default function HomePage() 
{
  return (
    <div>
      {/*TODO REFACTOR Gallery */}
      <Gallery/>

      {/*TODO REFACTOR  Team Section */}
      <Team />
  
      {/*TODO REFACTOR  Services Section */}
      <Services />
      
      {/*TODO REFACTOR  Featured Work Section */}
      <FeaturedWork />
      
      {/*TODO REFACTOR Scheduler Section */}
      <div id="scheduler">
        <Scheduler />
      </div>

      {/*TODO REFACTOR  Testimonials Section */}
      <Testimonials />

      {/*TODO REFACTOR FAQ Section */}
      <FAQ />
      </div>
  );
}

