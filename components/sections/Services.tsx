"use client";
import { motion } from "framer-motion";
import { Play, Zap, Layout, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "21656614879";

const services = [
  {
    icon: <Play className="w-10 h-10" />,
    title: "Vidéos Publicitaires",
    description:
      "Des vidéos ads percutantes qui capturent l'attention en moins de 3 secondes. Conçues pour convertir les spectateurs en acheteurs sur Facebook, TikTok et Instagram.",
    features: ["Hook accrocheur", "Script optimisé", "Montage pro", "Version multiformat"],
    color: "#7C3AED",
    delay: 0,
  },
  {
    icon: <Zap className="w-10 h-10" />,
    title: "Vidéos UGC",
    description:
      "Du contenu authentique créé par de vrais créateurs qui ressemble à des avis organiques. Le format qui convertit le mieux en 2025.",
    features: ["Authenticité 100%", "Casting créateurs", "Plusieurs angles", "Haute conversion"],
    color: "#9333EA",
    delay: 0.15,
    featured: true,
  },
  {
    icon: <Layout className="w-10 h-10" />,
    title: "Landing Pages",
    description:
      "Des pages de vente optimisées qui guident le visiteur vers l'achat. Design persuasif, copywriting émotionnel, CTA irrésistibles.",
    features: ["Design persuasif", "Copywriting émotionnel", "Mobile-first", "Livraison rapide"],
    color: "#4a00e0",
    delay: 0.3,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, #0D0B2B 0%, #10082e 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 text-sm font-bold tracking-widest uppercase mb-3">
            Ce qu&apos;on fait pour vous
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            NOS <span className="gradient-text">SERVICES</span>
          </h2>
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg, #7C3AED, #F5B800)" }}
          />
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <motion.div
              key={s.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: s.delay, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative rounded-3xl p-8 flex flex-col gap-5"
              style={{
                background: s.featured
                  ? `linear-gradient(145deg, ${s.color}, #9333EA)`
                  : "rgba(124,58,237,0.08)",
                border: `1px solid ${s.featured ? "transparent" : "rgba(124,58,237,0.3)"}`,
                boxShadow: s.featured ? `0 20px 60px rgba(124,58,237,0.4)` : "none",
              }}
            >
              {s.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black text-white"
                  style={{ background: "#F5B800", color: "#0D0B2B" }}
                >
                  LE PLUS POPULAIRE
                </div>
              )}

              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                style={{ background: s.featured ? "rgba(255,255,255,0.2)" : s.color }}
              >
                {s.icon}
              </div>

              <h3 className="text-xl font-black text-white">{s.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{s.description}</p>

              <ul className="flex flex-col gap-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-200">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: s.featured ? "#F5B800" : "#a855f7" }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Bonjour! Je suis intéressé(e) par votre service: ${s.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-2 font-bold text-sm mt-auto pt-2"
                style={{ color: s.featured ? "#F5B800" : "#a855f7" }}
              >
                Commander maintenant <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
