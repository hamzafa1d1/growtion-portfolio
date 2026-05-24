"use client";
import { motion } from "framer-motion";
import { Play, Zap, Layout, ArrowRight, Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const WHATSAPP_NUMBER = "21656614879";

const services = [
  {
    icon: <Play className="w-8 h-8" />,
    title: "Vidéos Publicitaires",
    description: "Des vidéos ads percutantes qui capturent l'attention en moins de 3 secondes. Conçues pour convertir sur Facebook, TikTok et Instagram.",
    features: ["Hook accrocheur", "Script optimisé", "Montage pro", "Version multiformat"],
    accentColor: "#7c3aed",
    msg: "Bonjour! Je suis intéressé(e) par vos Vidéos Publicitaires.",
    featured: false,
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Vidéos UGC",
    description: "Du contenu authentique créé par de vrais créateurs. Le format qui convertit le mieux — ressemble à des avis organiques.",
    features: ["Authenticité 100%", "Casting créateurs", "Plusieurs angles", "Haute conversion"],
    accentColor: "#6d28d9",
    msg: "Bonjour! Je suis intéressé(e) par vos Vidéos UGC.",
    featured: true,
  },
  {
    icon: <Layout className="w-8 h-8" />,
    title: "Landing Pages",
    description: "Des pages de vente optimisées qui guident le visiteur vers l'achat. Design persuasif, copywriting émotionnel.",
    features: ["Design persuasif", "Copywriting inclus", "Mobile-first", "Livraison rapide"],
    accentColor: "#7c3aed",
    msg: "Bonjour! Je suis intéressé(e) par votre service Landing Page.",
    featured: false,
  },
];

export function Services() {
  return (
    <section id="services" className="section-light py-24 px-6"
      style={{ borderTop: "1px solid #ede9fe", borderBottom: "1px solid #ede9fe" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-16"
        >
          <p className="text-purple-600 text-sm font-bold tracking-widest uppercase mb-3">Ce qu&apos;on fait pour vous</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900" style={{ fontFamily: "Arial Black, sans-serif" }}>
            NOS <span className="gradient-text">SERVICES</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-purple-600" />
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.55, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
              className="relative bg-white rounded-3xl p-8 flex flex-col gap-5"
              style={{
                border: s.featured ? `2px solid #7c3aed` : "1px solid #ede9fe",
                boxShadow: s.featured
                  ? "0 12px 40px rgba(109,40,217,0.18)"
                  : "0 2px 12px rgba(109,40,217,0.07)",
              }}
            >
              {s.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black bg-purple-600 text-white whitespace-nowrap">
                  ⭐ LE PLUS POPULAIRE
                </div>
              )}

              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                style={{ background: `linear-gradient(135deg, ${s.accentColor}, #a855f7)` }}>
                {s.icon}
              </div>

              <h3 className="text-xl font-black text-gray-900">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>

              <ul className="flex flex-col gap-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(s.msg)}`}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="flex items-center gap-2 font-bold text-sm mt-auto pt-2 text-purple-600 hover:text-purple-700"
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
