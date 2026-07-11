"use client";
import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";
import { DEFAULT_PRICING, type PricingConfig } from "@/lib/pricing";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
};

export function Pricing({ config }: { config?: PricingConfig }) {
  const { eyebrow, title, currencyLabel, currencyNote, whatsappNumber, plans } =
    config ?? DEFAULT_PRICING;

  return (
    <section id="tarifs" className="section-purple py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-purple-200 text-sm font-bold tracking-widest uppercase mb-3">
            {eyebrow}
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "var(--font-display), 'Arial Black', Impact, sans-serif" }}
          >
            {title}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-white/40" />
          <p className="text-purple-200 text-sm mt-3">{currencyNote}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {plans.map((plan, planIdx) => (
            <motion.div
              key={`${plan.category}-${planIdx}`}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 32px 70px rgba(0,0,0,0.45)",
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="relative rounded-3xl overflow-hidden flex flex-col"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Category header */}
              <div
                className="px-7 pt-7 pb-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
              >
                <h3 className="text-xl font-black text-white">{plan.category}</h3>
              </div>

              <div className="px-7 py-5 flex flex-col gap-3 flex-1">
                {/* Package tiles */}
                {plan.packages.map((pkg, pkgIdx) => (
                  <motion.div
                    key={`${pkg.label}-${pkgIdx}`}
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      transition: { duration: 0.15 },
                    }}
                    className="rounded-2xl p-4 flex items-baseline justify-between gap-3 cursor-default"
                    style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  >
                    <p className="text-sm leading-tight flex-1 text-white/90">{pkg.label}</p>
                    <div className="flex items-baseline gap-0.5 flex-shrink-0">
                      <span className="text-3xl font-black text-white">{pkg.price}</span>
                      <span className="text-sm text-white/50">{currencyLabel}</span>
                    </div>
                  </motion.div>
                ))}

                <ul className="flex flex-col gap-2 mt-2">
                  {plan.features.map((f, fIdx) => (
                    <li key={`${f}-${fIdx}`} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 flex-shrink-0 text-purple-300" />
                      <span className="text-white/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(plan.msg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-sm mt-auto"
                  style={{ background: "white", color: "#7c3aed" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Commander sur WhatsApp
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
