"use client";
import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const WHATSAPP_NUMBER = "21656614879";

const plans = [
  {
    category: "Vidéos Publicitaires",
    featured: false,
    packages: [
      { label: "1 vidéo + 1 hook gratuit", price: 79 },
      { label: "3 vidéos + 3 hooks gratuits", price: 199 },
      { label: "5 vidéos + 5 hooks gratuits", price: 299 },
    ],
    features: ["Script optimisé", "Hook accrocheur", "Montage pro", "Révisions incluses"],
    msg: "Bonjour! Je suis intéressé(e) par vos Vidéos Publicitaires.",
  },
  {
    category: "Vidéos UGC",
    featured: true,
    packages: [
      { label: "1 vidéo UGC", price: 199 },
      { label: "2 vidéos UGC", price: 350 },
    ],
    features: ["Créateur authentique", "Casting inclus", "Haute conversion", "Format Reels/TikTok"],
    msg: "Bonjour! Je suis intéressé(e) par vos Vidéos UGC.",
  },
  {
    category: "Landing Page",
    featured: false,
    packages: [{ label: "1 page complète", price: 49 }],
    features: ["Design persuasif", "Copywriting inclus", "Mobile-first", "Livraison rapide"],
    msg: "Bonjour! Je suis intéressé(e) par votre service Landing Page.",
  },
];

export function Pricing() {
  return (
    <section id="tarifs" className="section-purple py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-purple-200 text-sm font-bold tracking-widest uppercase mb-3">Transparent &amp; simple</p>
          <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "Arial Black, sans-serif" }}>
            NOS TARIFS
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-white/40" />
          <p className="text-purple-200 text-sm mt-3">Prix en DT (Dinar Tunisien)</p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.category}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.55, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
              className="relative rounded-3xl overflow-hidden flex flex-col"
              style={{
                background: plan.featured ? "white" : "rgba(255,255,255,0.1)",
                border: plan.featured ? "2px solid white" : "1px solid rgba(255,255,255,0.2)",
                boxShadow: plan.featured ? "0 16px 48px rgba(0,0,0,0.25)" : "none",
              }}
            >
              {plan.featured && (
                <div className="bg-purple-600 text-white text-center py-2 text-xs font-black tracking-wide">
                  ⭐ LE PLUS POPULAIRE
                </div>
              )}

              {/* Category header */}
              <div className="px-7 pt-7 pb-5"
                style={{ borderBottom: plan.featured ? "1px solid #ede9fe" : "1px solid rgba(255,255,255,0.15)" }}>
                <h3 className={`text-xl font-black ${plan.featured ? "text-gray-900" : "text-white"}`}>
                  {plan.category}
                </h3>
              </div>

              {/* Packages */}
              <div className="px-7 py-5 flex flex-col gap-3 flex-1">
                {plan.packages.map((pkg) => (
                  <div key={pkg.label} className="rounded-2xl p-4 flex items-baseline justify-between gap-3"
                    style={{ background: plan.featured ? "#f5f3ff" : "rgba(255,255,255,0.1)" }}>
                    <p className={`text-sm leading-tight flex-1 ${plan.featured ? "text-gray-700" : "text-white/90"}`}>{pkg.label}</p>
                    <div className="flex items-baseline gap-0.5 flex-shrink-0">
                      <span className={`text-3xl font-black ${plan.featured ? "text-purple-600" : "text-white"}`}>{pkg.price}</span>
                      <span className={`text-sm ${plan.featured ? "text-gray-400" : "text-white/50"}`}>DT</span>
                    </div>
                  </div>
                ))}

                <ul className="flex flex-col gap-2 mt-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.featured ? "text-purple-600" : "text-purple-300"}`} />
                      <span className={plan.featured ? "text-gray-600" : "text-white/80"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(plan.msg)}`}
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-sm mt-auto transition-all"
                  style={plan.featured
                    ? { background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "white", boxShadow: "0 4px 16px rgba(109,40,217,0.3)" }
                    : { background: "white", color: "#7c3aed" }}
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
