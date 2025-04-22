// Import the pricing configuration JSON
import pricingData from './pricing.json';

// Define the expected structure for the inputs passed to the kitchen estimator
export interface KitchenEstimatorInputs {
  kitchenType: "galley" | "l-shaped" | "u-shaped" | "island" | "peninsula" | "open-concept";
  cabinetWork: "none" | "refinish" | "replace" | "custom";
  countertopWork: "none" | "granite" | "quartz" | "marble" | "laminate";
  appliances: "none" | "basic" | "premium" | "luxury";
  flooring: "none" | "tile" | "hardwood" | "laminate" | "vinyl";
  lighting: "none" | "basic" | "premium" | "luxury";
  luxury: boolean;
  squareFootage: number;
}

// Main function that calculates an estimate based on selected options and square footage
export function kitchenEstimator(inputs: KitchenEstimatorInputs) {
  const {
    kitchenType, // Included for future scaling (e.g., complexity factor), not used in current calc
    cabinetWork,
    countertopWork,
    appliances,
    flooring,
    lighting,
    luxury,
    squareFootage,
  } = inputs;

  // Extract general labor information
  const baseLaborRate = pricingData.labor.hourlyRate;
  const hoursPerSqFt = pricingData.labor.hoursPerSqFt;

  let total = 0; // Initialize total cost

  // Add demolition cost
  total += squareFootage * pricingData.demolition.perSqFt;

  // Add cabinet work cost
  total += squareFootage * (pricingData.cabinets[cabinetWork] || 0);

  // Add countertop cost
  total += squareFootage * (pricingData.countertops[countertopWork] || 0);

  // Add appliances cost
  total += squareFootage * (pricingData.appliances[appliances] || 0);

  // Add flooring cost
  total += squareFootage * (pricingData.flooring[flooring] || 0);

  // Add lighting cost
  total += squareFootage * (pricingData.lighting[lighting] || 0);

  // Add cleaning fee
  total += squareFootage * pricingData.cleaning.perSqFt;

  // Optional flat fee for luxury upgrade package
  if (luxury) {
    total += pricingData.luxuryPackage.flatFee;
  }

  // Calculate labor cost based on square footage and hourly rate
  const estimatedHours = squareFootage * hoursPerSqFt;
  total += estimatedHours * baseLaborRate;

  // Return both total cost and cost breakdown for transparency
  return {
    total: parseFloat(total.toFixed(2)), // rounded for neat display
    breakdown: {
      demolition: squareFootage * pricingData.demolition.perSqFt,
      cabinets: squareFootage * (pricingData.cabinets[cabinetWork] || 0),
      countertops: squareFootage * (pricingData.countertops[countertopWork] || 0),
      appliances: squareFootage * (pricingData.appliances[appliances] || 0),
      flooring: squareFootage * (pricingData.flooring[flooring] || 0),
      lighting: squareFootage * (pricingData.lighting[lighting] || 0),
      cleaning: squareFootage * pricingData.cleaning.perSqFt,
      luxuryFee: luxury ? pricingData.luxuryPackage.flatFee : 0,
      labor: estimatedHours * baseLaborRate,
    }
  };
}
