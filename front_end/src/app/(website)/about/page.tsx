import UniversalHeader from "@/components/UniversalHeader";
import Head from "next/head";
import Story from "@/components/about/Story";
import Values from "@/components/about/Values";
import Team from "@/components/about/Team";
import Mission from "@/components/about/Mission";

export default function AboutPage() {
  return (
    <div>
    {/* Head Section */}
    <UniversalHeader
      title="About Mauri Remodeling"
      subtitle="Craftsmanship Rooted in Integrity & Experience"
      description="Founded with a passion for quality and customer satisfaction, Mauri Remodeling is led by a skilled Argentine craftsman with years of hands-on experience. We treat every home like our own — with care, respect, and attention to detail."
    />

    {/*Story Section */}
    <Story />

    {/* Values Section */}
    <Values />

    {/* Team Section */}
    <Team />

    {/* Mission Section */}
    <Mission />

    </div>
  );
}
