import UniversalHeader from "@/components/UniversalHeader";
import FeaturedWork from "@/components/portfolio/FeaturedWork"; 
import EstimatorHome from "@/components/estimate/EstimatorHome";
import Scheduler from "@/components/Scheduler";

export default function PortfolioPage() {
  return (
    <div>
    {/* Seletected Service Featured Work */}
    <FeaturedWork />

    {/* Estimator Home */}
    <EstimatorHome />

    {/* Scheduler */}
    <Scheduler />

    </div>
  );
}
