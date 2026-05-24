import { Navbar } from "@/components/ui/Navbar";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Results } from "@/components/sections/Results";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <FloatingWhatsApp />
      <main>
        <Hero />
        <Services />
        <Results />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
    </>
  );
}
