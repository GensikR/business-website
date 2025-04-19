// components/ServiceInfo.tsx

import Image from "next/image";
import { Service } from "@/lib/getService";

type Props = {
  service: Service;
};

export default function ServiceInfo({ service }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <p className="text-gray-700 mb-6">{service.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {service.images.map((src, index) => (
          <div key={index} className="relative w-full h-64">
            <Image
              src={src}
              alt={`${service.title} image ${index + 1}`}
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
