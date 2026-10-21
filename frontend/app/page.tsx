import CategorySection from "@/components/CategorySection";
import FeaturedCourse from "@/components/FeaturedCourse";
import HeroSection from "@/components/HeroSection";
import TestimonialSection from "@/components/TestimonialSection";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedCourse />
      <CategorySection />
      <TestimonialSection />
    </main>
  );
}
