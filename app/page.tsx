import { Navbar } from "@/components/ui/Navbar";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Results } from "@/components/sections/Results";
import { Portfolio } from "@/components/sections/Portfolio";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { getAssets } from "@/lib/assets";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function Home() {
  const assets = await getAssets();

  return (
    <>
      <Navbar />
      <FloatingWhatsApp />
      <main>
        <Hero />
        <Services />
        <Results screenshotUrls={assets["results-screenshot"]} />
        <Portfolio
          videoUrls={assets["portfolio-video"]}
          ugcUrls={assets["portfolio-ugc"]}
          landingUrls={assets["portfolio-landing"]}
        />
        <Testimonials reviewUrls={assets["testimonials-review"]} />
        <Pricing />
        <CTA />
      </main>
    </>
  );
}
