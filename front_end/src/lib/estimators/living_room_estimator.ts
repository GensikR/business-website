// Import the pricing configuration JSON
import pricingData from './pricing.json';

// Define the expected structure for the inputs passed to the living room estimator
export interface LivingRoomEstimatorInputs {
  livingRoomType: "none" | "basic" | "premium" | "luxury";
  wallType: "none" | "paint" | "wallpaper" | "paneling";
  flooringType: "none" | "carpet" | "tile" | "hardwood" | "vinyl";
  lightingType: "none" | "basic" | "premium" | "luxury";
  furnitureType: "none" | "basic" | "premium" | "luxury";
  luxury: boolean;
  squareFootage: number;
}

// Main function that calculates an estimate based on selected options and square footage
export function livingRoomEstimator(inputs: LivingRoomEstimatorInputs) {
  const {
    livingRoomType,
    wallType,
    flooringType,
    lightingType,
    furnitureType,
    luxury,
    squareFootage,
  } = inputs;

  // Extract general labor information
  const baseLaborRate = pricingData.labor.hourlyRate;
  const hoursPerSqFt = pricingData.labor.hoursPerSqFt;

  let total = 0; // Initialize total cost

  // Add demolition cost
  total += squareFootage * pricingData.demolition.perSqFt;

  // Add living room cost
  total += squareFootage * (pricingData.livingRoom[livingRoomType] || 0);

  // Add wall cost
  total += squareFootage * (pricingData.walls[wallType] || 0);

  // Add flooring cost
  total += squareFootage * (pricingData.livingRoomFlooring[flooringType] || 0);

  // Add lighting cost
  total += squareFootage * (pricingData.livingRoomLighting[lightingType] || 0);

  // Add furniture cost
  total += squareFootage * (pricingData.livingRoomFurniture[furnitureType] || 0);

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
      livingRoom: squareFootage * (pricingData.livingRoom[livingRoomType] || 0),
      walls: squareFootage * (pricingData.walls[wallType] || 0),
      flooring: squareFootage * (pricingData.livingRoomFlooring[flooringType] || 0),
      lighting: squareFootage * (pricingData.livingRoomLighting[lightingType] || 0),
      furniture: squareFootage * (pricingData.livingRoomFurniture[furnitureType] || 0),
      cleaning: squareFootage * pricingData.cleaning.perSqFt,
      luxuryFee: luxury ? pricingData.luxuryPackage.flatFee : 0,
      labor: estimatedHours * baseLaborRate,
    }
  };
}
