// lib/getService.ts

export type Service = {
    slug: string;
    title: string;
    description: string;
    images: string[];
  };
  
  const services: Service[] = [
    {
      slug: "kitchen-bath-remodeling",
      title: "Kitchen & Bathroom Remodeling",
      description: "Transform your kitchen and bathroom into modern, functional spaces tailored to your needs.",
      images: ["/images/services/kitchen-bath-remodeling.png"],
    },
    {
      slug: "cabinet-creation",
      title: "Cabinet Creation",
      description: "Custom-built cabinets that suit your style and maximize your storage space.",
      images: ["/images/services/cabinet-creation.png"],
    },
    {
      slug: "custom-furniture",
      title: "Custom Furniture",
      description: "Bespoke furniture pieces designed to match your vision and lifestyle.",
      images: ["/images/services/custom-furniture.png"],
    },
    {
      slug: "floor-walls",
      title: "Floor & Wall Remodeling",
      description: "Upgrade your floors and walls to enhance the aesthetics and functionality of your space.",
      images: ["/images/services/floors-walls.png"],
    },
    {
      slug: "kitchen-bath-remodeling-2",
      title: "Kitchen & Bathroom Remodeling",
      description: "Transform your kitchen and bathroom into modern, functional spaces tailored to your needs.",
      images: ["/images/services/kitchen-bath-remodeling.png"],
    },
    {
      slug: "cabinet-creation-2",
      title: "Cabinet Creation",
      description: "Custom-built cabinets that suit your style and maximize your storage space.",
      images: ["/images/services/cabinet-creation.png"],
    },
  ];
  
  export function getService(slug: string): Service | undefined {
    return services.find((service) => service.slug === slug);
  }
  
  export function getAllServiceSlugs(): string[] {
    return services.map((service) => service.slug);
  }
  