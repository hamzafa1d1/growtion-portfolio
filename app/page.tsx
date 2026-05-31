import { Navbar } from "@/components/ui/Navbar";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { SectorsBand } from "@/components/ui/SectorsBand";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Results } from "@/components/sections/Results";
import { Portfolio } from "@/components/sections/Portfolio";
import { FilmingVideos } from "@/components/sections/FilmingVideos";
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
        <SectorsBand />
        <Services />
        <Results screenshotUrls={assets["results-screenshot"]} />
        <Portfolio
          videoUrls={assets["portfolio-video"]}
          ugcUrls={assets["portfolio-ugc"]}
          landingUrls={assets["portfolio-landing"]}
        />
        <FilmingVideos videoUrls={assets["filming-video"]} />
        <Testimonials reviewUrls={assets["testimonials-review"]} />
        <Pricing />
        <CTA />
      </main>
    </>
  );
}
