import UniversalHeader from "@/components/UniversalHeader";
import Head from "next/head";
import Story from "@/components/about/Story";
import Values from "@/components/about/Values";
import Team from "@/components/about/Team";
import Mission from "@/components/about/Mission";

export default function AboutPage() {
  return (
    <div>

    {/* Team Section */}
    <Team />

    {/*Story Section */}
    <Story />

    {/* Values Section */}
    <Values />

    {/* Mission Section */}
    <Mission />

    </div>
  );
}
