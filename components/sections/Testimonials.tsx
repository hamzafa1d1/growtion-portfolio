"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// PLACEHOLDER: Replace src with your actual testimonial screenshots
// Drop them in public/testimonials/review-1.jpg through review-5.jpg
const testimonials = [
  {
    id: 1,
    src: "/testimonials/review-1.jpg",
    name: "Client e-commerce",
    result: "13,752 DT en une semaine",
    platform: "WhatsApp",
  },
  {
    id: 2,
    src: "/testimonials/review-2.jpg",
    name: "ccnverty.shop",
    result: "643,761 DT en un mois",
    platform: "Shopify",
  },
  {
    id: 3,
    src: "/testimonials/review-3.jpg",
    name: "Client Facebook Ads",
    result: "558 achats — 463.94 $US",
    platform: "Facebook Ads",
  },
  {
    id: 4,
    src: "/testimonials/review-4.jpg",
    name: "yassine_alouii",
    result: "Agency la mieux en Tunisie",
    platform: "Instagram",
  },
  {
    id: 5,
    src: "/testimonials/review-5.jpg",
    name: "converty.shop",
    result: "Plusieurs commandes le matin",
    platform: "Converty",
  },
];

export function Testimonials() {
  return (
    <section
      id="avis"
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, #0a0820 0%, #0D0B2B 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-purple-400 text-sm font-bold tracking-widest uppercase mb-3">
            Ce que disent nos clients
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            AVIS <span className="gradient-text">CLIENTS</span>
          </h2>
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg, #7C3AED, #F5B800)" }}
          />
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "rgba(20,17,50,0.9)",
                border: "1px solid rgba(124,58,237,0.2)",
                minHeight: "280px",
              }}
            >
              {/* PLACEHOLDER: Your testimonial screenshot */}
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-3 p-5"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(124,58,237,0.15), rgba(13,11,43,0.95))",
                  minHeight: "280px",
                }}
              >
                <Quote className="w-8 h-8 text-purple-500 opacity-60" />
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-black"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #9333EA)" }}
                >
                  {t.id}
                </div>
                <p className="text-white font-bold text-sm text-center">{t.name}</p>
                <p className="text-yellow-400 text-xs font-bold text-center">{t.result}</p>
                <p className="text-gray-500 text-xs">{t.platform}</p>
                <p className="text-gray-600 text-xs text-center mt-1">
                  📸 public/testimonials/<br />review-{t.id}.jpg
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof banner */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center rounded-3xl py-10 px-6"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(147,51,234,0.1))",
            border: "1px solid rgba(124,58,237,0.3)",
          }}
        >
          <p className="text-white text-xl md:text-2xl font-black leading-relaxed">
            Vous allez bénéficier de l&apos;expérience de plus de{" "}
            <span style={{ color: "#F5B800" }}>200 clients</span>
            <br />
            avec près de{" "}
            <span style={{ color: "#F5B800" }}>1000 créations réalisées</span>
          </p>
          <p className="text-purple-300 text-base mt-3 font-semibold">
            On met tout en œuvre pour scaler votre e-commerce et booster vos ventes
          </p>
        </motion.div>
      </div>
    </section>
  );
}
