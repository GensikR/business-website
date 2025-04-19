// app/services/[slug]/page.tsx

import { getService, getAllServiceSlugs } from "@/lib/getService";
import UniversalHeader from "@/components/UniversalHeader";
import ServiceInfo from "@/components/services/ServiceInfo";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

// ✅ Static generation setup
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ✅ Optional SEO metadata
export function generateMetadata({ params }: Props) {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: `${service.title} | Home Remodeling`,
    description: service.description,
  };
}

// ✅ Page component
export default function ServicePage({ params }: Props) {
  const service = getService(params.slug);

  if (!service) {
    notFound(); // Show 404 if slug is invalid
  }

  return (
    <div>
      <UniversalHeader
        title="Home Remodeling Blog"
        subtitle="Your Guide to Home Renovation and Design"
        description="From cozy bathroom updates to full-home renovations, see how we've helped clients turn their ideas into beautiful spaces. Your dream home could be next!"
      />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <ServiceInfo service={service} />
      </div>

      <section className="bg-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Featured Work</h2>
          <p className="text-gray-700">
            Stay tuned — we’ll be showcasing standout remodeling projects for our {service.title} service soon!
          </p>
        </div>
      </section>
    </div>
  );
}
