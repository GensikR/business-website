import FeaturedWork from "@/app/(website)/components/portfolio/FeaturedWork"; 
import Scheduler from "@/app/(website)/components/scheduler/Scheduler";
import Gallery from "@/app/(website)/components/portfolio/Gallery";

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
