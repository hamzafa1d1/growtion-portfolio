"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface TestimonialsProps {
  reviewUrls?: (string | null)[];
}

const TESTIMONIAL_DATA = [
  { name: "Client e-commerce",  result: "13,752 DT en une semaine",  platform: "WhatsApp"    },
  { name: "ccnverty.shop",      result: "643,761 DT en un mois",     platform: "Shopify"     },
  { name: "Client Facebook Ads",result: "558 achats — 463.94 $US",   platform: "Facebook Ads"},
  { name: "yassine_alouii",     result: "Agency la mieux en Tunisie",platform: "Instagram"   },
  { name: "converty.shop",      result: "Plusieurs commandes le matin",platform:"Converty"   },
];

export function Testimonials({ reviewUrls = [] }: TestimonialsProps) {
  const filledReviews = TESTIMONIAL_DATA
    .map((t, i) => ({ ...t, url: reviewUrls[i] ?? null }))
    .filter((item): item is typeof TESTIMONIAL_DATA[number] & { url: string } => !!item.url);

  return (
    <section id="avis" className="section-white py-24 px-6"
      style={{ borderBottom: "1px solid #ede9fe" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-purple-600 text-sm font-bold tracking-widest uppercase mb-3">Ce que disent nos clients</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900" style={{ fontFamily: "Arial Black, sans-serif" }}>
            AVIS <span className="gradient-text">CLIENTS</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-purple-600" />
        </motion.div>

        {/* Cards — only rendered when images are uploaded */}
        {filledReviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
            {filledReviews.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
                className="relative rounded-3xl overflow-hidden bg-white"
                style={{ border: "1px solid #ede9fe", minHeight: 270, boxShadow: "0 2px 12px rgba(109,40,217,0.07)" }}
              >
                <div className="relative w-full" style={{ minHeight: 270 }}>
                  <Image src={t.url} alt={t.name} fill className="object-cover" sizes="300px" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
          className="text-center rounded-3xl py-10 px-6"
          style={{ background: "linear-gradient(135deg, #f5f3ff, #ede9fe)", border: "1px solid #c4b5fd" }}
        >
          <p className="text-gray-900 text-xl md:text-2xl font-black leading-relaxed">
            Vous allez bénéficier de l&apos;expérience de plus de{" "}
            <span className="text-purple-600">200 clients</span>
            <br />avec près de{" "}
            <span className="text-purple-600">1000 créations réalisées</span>
          </p>
          <p className="text-gray-500 text-base mt-3 font-semibold">
            On met tout en œuvre pour scaler votre e-commerce et booster vos ventes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
