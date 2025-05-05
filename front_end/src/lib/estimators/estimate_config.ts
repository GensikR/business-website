import { ServiceId } from "@/types";

export const getProjectTypes = (serviceId: ServiceId): string[] => 
{
  const projectTypes = {
    kitchen: ["countertops", "cabinets", "fullRemodel"],
    bathroom: ["showerUpgrade", "fullRemodel"],
    livingRoom: ["flooringUpgrade"],
    patio: ["deckInstallation", "patioUpgrade", "patioCover", "fenceInstallation", "fenceCleaning"],
    bedroom: ["closetExpansion", "bedroomUpgrade", "bedroomRemodel"],
    custom: ["customDesign", "customBuild", "customRemodel"],
  };

  return projectTypes[serviceId] || [];
}

export const getSizeOptions = (): string[] =>
{
  const sizeOptions = ["small", "medium", "large"];
  return sizeOptions;
}

export const getMaterialOptions = (serviceId: ServiceId): string[] =>
{
  const materialOptions = {
    kitchen: ["oak", "laminate", "granite", "quartz"],
    bathroom: ["tile", "glass", "premium", "basic"],
    livingRoom: ["wood", "vinyl"],
    patio: ["composite", "natural"],
    bedroom: ["mirrorDoors", "woodShelves"],
    custom: ["customMaterial1", "customMaterial2", "customMaterial3"],
  };

  return materialOptions[serviceId] || [];
}
