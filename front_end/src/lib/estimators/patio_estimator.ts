// Import the pricing configuration JSON
import pricingData from './pricing.json';

// Define the expected structure for the inputs passed to the patio estimator
export interface PatioEstimatorInputs {
  patioType: "none" | "basic" | "premium" | "luxury";
  patioFlooringType: "none" | "tile" | "stone" | "pavers";
  patioLightingType: "none" | "basic" | "premium" | "luxury";
  patioFurnitureType: "none" | "basic" | "premium" | "luxury";
  luxury: boolean;
  squareFootage: number;
}

// Main function that calculates an estimate based on selected options and square footage
export function patioEstimator(inputs: PatioEstimatorInputs) {
  const {
    patioType,
    patioFlooringType,
    patioLightingType,
    patioFurnitureType,
    luxury,
    squareFootage,
  } = inputs;

  // Extract general labor information
  const baseLaborRate = pricingData.labor.hourlyRate;
  const hoursPerSqFt = pricingData.labor.hoursPerSqFt;

  let total = 0; // Initialize total cost

  // Add demolition cost
  total += squareFootage * pricingData.demolition.perSqFt;

  // Add patio cost
  total += squareFootage * (pricingData.patio[patioType] || 0);

  // Add patio flooring cost
  total += squareFootage * (pricingData.patioFlooring[patioFlooringType] || 0);

  // Add patio lighting cost
  total += squareFootage * (pricingData.patioLighting[patioLightingType] || 0);

  // Add patio furniture cost
  total += squareFootage * (pricingData.patioFurniture[patioFurnitureType] || 0);

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
      patio: squareFootage * (pricingData.patio[patioType] || 0),
      patioFlooring: squareFootage * (pricingData.patioFlooring[patioFlooringType] || 0),
      patioLighting: squareFootage * (pricingData.patioLighting[patioLightingType] || 0),
      patioFurniture: squareFootage * (pricingData.patioFurniture[patioFurnitureType] || 0),
      cleaning: squareFootage * pricingData.cleaning.perSqFt,
      luxuryFee: luxury ? pricingData.luxuryPackage.flatFee : 0,
      labor: estimatedHours * baseLaborRate,
    }
  };
}
