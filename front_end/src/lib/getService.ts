import { Service } from "@/types/index";

export const services: Service[] = [
  {
    title: "Kitchen & Bathroom Remodeling",
    description: "Transform your kitchen and bathroom into modern, functional spaces tailored to your needs.",
    details: `We specialize in turning outdated kitchens and bathrooms into beautiful, functional spaces that elevate your daily living. Our kitchen remodeling includes custom cabinetry, countertops, backsplashes, lighting, and modern appliances. In bathrooms, we offer luxurious showers, soaking tubs, vanities, and smart storage solutions. From layout redesigns to plumbing and tilework, we manage every detail with precision and care. Whether you're looking for a contemporary refresh or a complete renovation, we bring your vision to life with premium craftsmanship and materials.`,
    images: ["/images/services/kitchen-bath-remodeling.png"],
    link: "/services/kitchen-bath-remodeling",
  },
  {
    title: "Custom Furniture",
    description: "Custom-built furniture pieces designed to match your vision and lifestyle.",
    details: `Our custom furniture service blends functionality with craftsmanship to deliver one-of-a-kind pieces tailored to your space. From built-in bookshelves and entertainment centers to statement dining tables and vanities, we work with you to design furniture that matches your aesthetic and fulfills your practical needs. All furniture is constructed using high-quality woods and finishes, and we offer design consultations to ensure the final product complements your existing décor while adding elegance and utility.`,
    images: ["/images/services/custom-furniture.png"],
    link: "/services/custom-furniture",
  },
  {
    title: "Floor & Wall Remodeling",
    description: "Upgrade your floors and walls to enhance the aesthetics and functionality of your space.",
    details: `We offer expert remodeling for all types of flooring and walls, transforming your interiors with durable materials and refined finishes. Choose from luxury vinyl, hardwood, ceramic tile, or laminate flooring, installed with precision for long-lasting beauty. Wall upgrades include drywall replacement, accent walls, wainscoting, decorative molding, stonework, and professional paint. Whether you're aiming for a bold transformation or a subtle refresh, our remodeling solutions add value, texture, and character to every room.`,
    images: ["/images/services/floors-walls.png"],
    link: "/services/floors-walls",
  },
  {
    title: "Outdoor Living Spaces",
    description: "Create beautiful outdoor spaces for relaxation and entertainment.",
    details: `We turn your backyard into an extension of your home, creating outdoor spaces that are both functional and stunning. From decks and pergolas to patios, kitchens, and fire pits, we design and build with purpose and quality. Our services include landscaping integration, lighting installation, weatherproofing, and the use of premium materials that stand up to the elements. Whether you're dreaming of a cozy gathering spot or a high-end entertainment zone, we’ll bring it to life with style and durability.`,
    images: ["/images/services/patio-decks.png"],
    link: "/services/outdoor-living-spaces",
  },
  {
    title: "Home Office Solutions",
    description: "Design and build a productive home office tailored to your work style.",
    details: `With more people working from home, a dedicated and well-designed office is essential. We create ergonomic, visually appealing workspaces that maximize comfort and productivity. From built-in desks and custom cabinetry to soundproofing and lighting, every detail is planned to suit your needs. We’ll help you create a space where focus, comfort, and style intersect—whether you need a quiet study, a dual-use room, or a corporate-style executive office.`,
    images: ["/images/services/cabinet-creation.png"],
    link: "/services/home-office-solutions",
  },
  {
    title: "Interior Design & Decor",
    description: "Comprehensive interior design services to elevate your home's aesthetics.",
    details: `Our interior design and decor services bring harmony, style, and personality to your home. We offer space planning, color consultation, furniture selection, lighting design, textiles, artwork, and more. We work closely with you to understand your vision and lifestyle, creating balanced interiors that feel both functional and inspired. Whether it's a single room refresh or a full home transformation, our designers will guide you through every step with creativity and care.`,
    images: ["/images/services/cabinet-creation.png"],
    link: "/services/interior-design-decor",
  },
];

export const getService = (link: string) => {
  const service = services.find((service) => service.link === link);
  if (!service) {
    throw new Error("Service not found");
  }
  return service;
};
