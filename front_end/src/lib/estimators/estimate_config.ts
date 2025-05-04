import { AllServiceOptions } from "@/types";

export const estimateOptions: AllServiceOptions = {
  bathroom: {
    projectTypes: [
      { id: "showerUpgrade", name: "Shower Upgrade" },
      { id: "fullRemodel", name: "Full Remodel" },
    ],
    sizes: ["small", "medium", "large"],
    materials: [
      { id: "tile", name: "Ceramic Tile" },
      { id: "glass", name: "Glass Enclosure" },
      { id: "premium", name: "Premium Package" },
      { id: "basic", name: "Basic Fixtures" },
    ],
  },

  kitchen: {
    projectTypes: [
      { id: "cabinets", name: "Cabinet Replacement" },
      { id: "fullRemodel", name: "Full Kitchen Remodel" },
    ],
    sizes: ["small", "medium", "large"],
    materials: [
      { id: "oak", name: "Oak Wood" },
      { id: "laminate", name: "Laminate" },
      { id: "granite", name: "Granite Countertops" },
      { id: "quartz", name: "Quartz Countertops" },
    ],
  },

  livingRoom: {
    projectTypes: [{ id: "flooring", name: "Flooring Upgrade" }],
    sizes: ["small", "medium", "large"],
    materials: [
      { id: "wood", name: "Hardwood" },
      { id: "vinyl", name: "Luxury Vinyl" },
    ],
  },

  patio: {
    projectTypes: [{ id: "deck", name: "Deck Installation" }],
    sizes: ["small", "medium", "large"],
    materials: [
      { id: "composite", name: "Composite Wood" },
      { id: "natural", name: "Natural Wood" },
    ],
  },

  bedroom: {
    projectTypes: [{ id: "closet", name: "Closet Expansion" }],
    sizes: ["small", "medium", "large"],
    materials: [
      { id: "mirrorDoors", name: "Mirror Doors" },
      { id: "woodShelves", name: "Wooden Shelves" },
    ],
  },

  custom: {
    projectTypes: [{ id: "customDesign", name: "Custom Design" }],
    sizes: ["small", "medium", "large"],
    materials: [],
  },
};
