import FeaturedWork from "@/components/portfolio/FeaturedWork"; 
import Scheduler from "@/components/scheduler/Scheduler";
import Gallery from "@/components/portfolio/Gallery";

export default function PortfolioPage() {
  return (
    <div>

    <Gallery/>

    {/* Seletected Service Featured Work */}
    <FeaturedWork />


    {/* Scheduler */}
    <Scheduler />

    </div>
  );
}
