import UniversalHeader from "@/components/UniversalHeader";
import Contact from "@/components/contact/Contact";

export default function ContactPage() {
  return (

    <div>

      {/* Universal Header Component */}
    <UniversalHeader
      title="Get in Touch with Us"
      subtitle="Schedule a Free Estimate or Ask a Question"
      description="We're here to help with any questions about your remodeling project. Reach out via phone, email, or our contact form — and we'll get back to you promptly."
    />

    {/* Contact Form Section */}
    <Contact />

    </div>
  );
}
