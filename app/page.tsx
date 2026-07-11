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
import { getPricing } from "@/lib/pricing";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function Home() {
  const [assets, pricing] = await Promise.all([getAssets(), getPricing()]);
  const urls = (category: keyof typeof assets) => assets[category].map((a) => a.url);

  return (
    <>
      <Navbar />
      <FloatingWhatsApp />
      <main>
        <Hero
          cardMedia={[
            assets["portfolio-video"][0]?.url ?? null,
            assets["portfolio-ugc"][0]?.url ?? null,
            assets["filming-video"][0]?.url ?? null,
          ]}
        />
        <SectorsBand />
        <Services />
        <Results screenshotUrls={urls("results-screenshot")} />
        <Portfolio
          videoUrls={urls("portfolio-video")}
          ugcUrls={urls("portfolio-ugc")}
        />
        <FilmingVideos videoUrls={urls("filming-video")} />
        <Testimonials reviewUrls={urls("testimonials-review")} />
        <Pricing config={pricing} />
        <CTA />
      </main>
    </>
  );
}
