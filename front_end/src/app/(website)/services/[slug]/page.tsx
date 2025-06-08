// No "use client"
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/getService";
import FeaturedWork from "@/components/portfolio/FeaturedWork";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.link,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.link === params.slug);

  if (!service) return notFound();

  return (
    <main className="min-h-screen bg-white py-16 px-6 md:px-20">
      {/* Hero Image */}
      <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-lg mb-12">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover rounded-2xl"
        />
      </div>

      {/* Service Info */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">{service.title}</h1>
        <p className="text-lg text-gray-700 mb-8">{service.description}</p>
        <div className="prose prose-lg text-gray-800">
          {service.details.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex gap-6">
          <Link
            href="/consultation"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Get a Free Estimate
          </Link>
          <Link
            href="/"
            className="text-blue-700 hover:underline text-base font-medium"
          >
            ← Back to Services
          </Link>
        </div>
        <FeaturedWork />
      </div>
    </main>
  );
}
