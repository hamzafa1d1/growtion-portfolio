"use client";
import { motion } from "framer-motion";
import { Play, Zap, Clapperboard, Check, ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    icon: <Play className="w-8 h-8" />,
    title: "Vidéos Publicitaires",
    description: "Des vidéos ads percutantes qui capturent l'attention en moins de 3 secondes. Conçues pour convertir sur Facebook, TikTok et Instagram.",
    features: ["Hook accrocheur", "Script optimisé", "Montage pro", "Version multiformat"],
    accentColor: "#7c3aed",
    gradientEnd: "#a855f7",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Vidéos UGC",
    description: "Du contenu authentique créé par de vrais créateurs. Le format qui convertit le mieux — ressemble à des avis organiques.",
    features: ["Authenticité 100%", "Casting créateurs", "Plusieurs angles", "Haute conversion"],
    accentColor: "#6d28d9",
    gradientEnd: "#8b5cf6",
  },
  {
    icon: <Clapperboard className="w-8 h-8" />,
    title: "Tournage",
    description: "Tournage professionnel on-location ou en studio. Des productions de haute qualité qui donnent une image premium à votre marque.",
    features: ["Tournage professionnel", "Éclairage & cadrage", "Direction créative", "Montage inclus"],
    accentColor: "#5b21b6",
    gradientEnd: "#7c3aed",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASE } },
};

export function Services() {
  return (
    <section
      id="services"
      className="section-light py-24 px-6"
      style={{ borderTop: "1px solid #ede9fe", borderBottom: "1px solid #ede9fe" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-purple-600 text-sm font-bold tracking-widest uppercase mb-3">
            Ce qu&apos;on fait pour vous
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-gray-900"
            style={{ fontFamily: "var(--font-display), 'Arial Black', Impact, sans-serif" }}
          >
            NOS <span className="gradient-text">SERVICES</span>
          </h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-purple-600" />
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: `0 28px 60px rgba(109,40,217,0.2)`,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="relative bg-white rounded-3xl p-8 flex flex-col gap-5 group overflow-hidden"
              style={{
                border: "1px solid #ede9fe",
                boxShadow: "0 2px 12px rgba(109,40,217,0.07)",
              }}
            >
              {/* Accent top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl"
                style={{
                  background: `linear-gradient(90deg, ${s.accentColor}, ${s.gradientEnd})`,
                }}
              />

              {/* Arrow badge — slides in on hover */}
              <div className="absolute top-6 right-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "#f3eeff" }}
                >
                  <ArrowUpRight className="w-4 h-4 text-purple-600" />
                </div>
              </div>

              {/* Icon badge with spring hover */}
              <motion.div
                whileHover={{
                  scale: 1.12,
                  rotate: 8,
                  transition: { type: "spring", stiffness: 400, damping: 15 },
                }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white self-start"
                style={{
                  background: `linear-gradient(135deg, ${s.accentColor}, ${s.gradientEnd})`,
                }}
              >
                {s.icon}
              </motion.div>

              <h3 className="text-xl font-black text-gray-900">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{s.description}</p>

              <ul className="flex flex-col gap-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
