"use client";
import { motion } from "framer-motion";
import { Check, MessageCircle, Zap } from "lucide-react";

const WHATSAPP_NUMBER = "21656614879";

const plans = [
  {
    category: "Vidéos Publicitaires",
    color: "#7C3AED",
    featured: false,
    packages: [
      { label: "1 vidéo + 1 hook gratuit", price: 79 },
      { label: "3 vidéos + 3 hooks gratuits", price: 199 },
      { label: "5 vidéos + 5 hooks gratuits", price: 299 },
    ],
    features: ["Script optimisé", "Hook accrocheur", "Montage pro", "Révisions incluses"],
    whatsappMsg: "Bonjour! Je suis intéressé(e) par vos Vidéos Publicitaires.",
  },
  {
    category: "Vidéos UGC",
    color: "#9333EA",
    featured: true,
    packages: [
      { label: "1 vidéo UGC", price: 199 },
      { label: "2 vidéos UGC", price: 350 },
    ],
    features: ["Créateur authentique", "Casting inclus", "Haute conversion", "Format Reels/TikTok"],
    whatsappMsg: "Bonjour! Je suis intéressé(e) par vos Vidéos UGC.",
  },
  {
    category: "Landing Page",
    color: "#4a00e0",
    featured: false,
    packages: [{ label: "1 page complète", price: 49 }],
    features: ["Design persuasif", "Copywriting inclus", "Mobile-first", "Livraison rapide"],
    whatsappMsg: "Bonjour! Je suis intéressé(e) par votre service Landing Page.",
  },
];

export function Pricing() {
  return (
    <section
      id="tarifs"
      className="py-24 px-6"
      style={{ background: "#0D0B2B" }}
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
            Transparent & simple
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            NOS <span className="gradient-text">TARIFS</span>
          </h2>
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg, #7C3AED, #F5B800)" }}
          />
          {/* Arrow indicator */}
          <div className="flex justify-end max-w-5xl mx-auto mt-4 pr-4">
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-gray-500 text-sm flex items-center gap-1"
            >
              <Zap className="w-4 h-4 text-yellow-400" /> Prix en DT
            </motion.div>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.category}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl overflow-hidden"
            >
              {plan.featured && (
                <div
                  className="absolute top-0 left-0 right-0 text-center py-2 text-xs font-black"
                  style={{ background: "#F5B800", color: "#0D0B2B" }}
                >
                  ⭐ LE PLUS POPULAIRE
                </div>
              )}

              {/* Category header */}
              <div
                className="px-6 pt-8 pb-5 text-center"
                style={{
                  paddingTop: plan.featured ? "2.5rem" : "1.5rem",
                  background: plan.featured
                    ? `linear-gradient(135deg, ${plan.color}, #9333EA)`
                    : `rgba(124,58,237,0.08)`,
                  border: `1px solid ${plan.featured ? "transparent" : "rgba(124,58,237,0.3)"}`,
                  borderBottom: "none",
                  borderRadius: "24px 24px 0 0",
                }}
              >
                <h3
                  className="text-xl font-black text-white px-4 py-2 rounded-full inline-block"
                  style={{
                    background: plan.featured ? "rgba(255,255,255,0.2)" : `rgba(124,58,237,0.3)`,
                  }}
                >
                  {plan.category}
                </h3>
              </div>

              {/* Packages */}
              <div
                className="px-6 py-6 flex flex-col gap-4"
                style={{
                  background: plan.featured
                    ? `linear-gradient(180deg, ${plan.color}cc, ${plan.color}99)`
                    : "rgba(20,17,50,0.95)",
                  border: `1px solid ${plan.featured ? "transparent" : "rgba(124,58,237,0.3)"}`,
                  borderTop: "none",
                  borderRadius: "0 0 24px 24px",
                }}
              >
                {plan.packages.map((pkg) => (
                  <div
                    key={pkg.label}
                    className="rounded-2xl p-4 flex items-baseline justify-between gap-3"
                    style={{
                      background: plan.featured ? "rgba(255,255,255,0.15)" : "rgba(124,58,237,0.1)",
                    }}
                  >
                    <p className="text-white text-sm leading-tight flex-1">{pkg.label}</p>
                    <div className="flex items-baseline gap-0.5 flex-shrink-0">
                      <span
                        className="text-3xl font-black"
                        style={{ color: plan.featured ? "#F5B800" : "#ffffff" }}
                      >
                        {pkg.price}
                      </span>
                      <span className="text-white/60 text-sm">DT</span>
                    </div>
                  </div>
                ))}

                {/* Features */}
                <ul className="flex flex-col gap-2 mt-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: plan.featured ? "#F5B800" : "#a855f7" }}
                      />
                      <span className="text-gray-200">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(plan.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-sm mt-2 transition-all"
                  style={
                    plan.featured
                      ? { background: "#F5B800", color: "#0D0B2B" }
                      : { background: "#7C3AED", color: "white" }
                  }
                >
                  <MessageCircle className="w-4 h-4" />
                  Commander sur WhatsApp
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
