import Story from "@/app/(website)/components/about/Story";
import Values from "@/app/(website)/components/about/Values";
import Team from "@/app/(website)/components/about/Team";
import Mission from "@/app/(website)/components/about/Mission";

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
