"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import ProjectType from "@/components/estimate/sections/ProjectType";
// import Size from "@/components/estimate/sections/Size";
// import Materials from "@/components/estimate/sections/Materials";
import Results from "@/components/estimate/sections/Result";
import { estimateOptions } from "@/lib/estimators/estimate_config";

import { ServiceId } from "@/types";

type Service = {
  id: ServiceId;
  name: string;
  emoji: string;
};

const services: Service[] = [
  { id: "bathroom", name: "Bathroom Remodel", emoji: "🛁" },
  { id: "kitchen", name: "Kitchen Remodel", emoji: "🍳" },
  { id: "livingRoom", name: "Living Room Remodel", emoji: "🛋️" },
  { id: "patio", name: "Patio Remodel", emoji: "🌿" },
  { id: "bedroom", name: "Bedroom Remodel", emoji: "🛏️" },
  { id: "custom", name: "Custom Project", emoji: "🛠️" },
];

export default function EstimatorHome() {
  const [selectedService, setSelectedService] = useState<ServiceId | null>(null);

  return ( 
    <div></div>
  );
}
