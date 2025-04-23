import UniversalHeader from "@/components/UniversalHeader";
import Services from "@/components/services/Services"; // Import the Services component
import EstimatorHome from "@/components/estimate/EstimatorHome"; // Import the EstimatorHome component
import Scheduler from "@/components/scheduler/Scheduler";

export default function ServicesPage() {
  return (
    <div>

    {/* Services Section */}
    <Services />

    {/* Estimator Section */}
    <EstimatorHome />

    {/* Scheduler Section */}
    <Scheduler />


    </div>
  );
}
