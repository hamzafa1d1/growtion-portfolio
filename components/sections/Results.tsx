"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { TrendingUp } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface ResultsProps {
  screenshotUrls?: string[];
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.93 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export function Results({ screenshotUrls = [] }: ResultsProps) {
  const filled = screenshotUrls.filter((url): url is string => !!url);

  if (filled.length === 0) return null;

  return (
    <section
      id="resultats"
      className="section-white py-24 px-6"
      style={{ borderBottom: "1px solid #ede9fe" }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-purple-600 text-sm font-bold tracking-widest uppercase mb-3">
            Chiffres réels, clients réels
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-gray-900"
            style={{ fontFamily: "var(--font-display), 'Arial Black', Impact, sans-serif" }}
          >
            NOS <span className="gradient-text">RÉSULTATS</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-purple-600" />
          <p className="text-gray-500 text-sm mt-4">
            Screenshots de nos campagnes les plus performantes
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {filled.map((url, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 24px 60px rgba(109,40,217,0.22)",
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="group relative overflow-hidden rounded-3xl bg-white cursor-pointer"
              style={{
                border: "1px solid #ede9fe",
                boxShadow: "0 4px 20px rgba(109,40,217,0.08)",
                aspectRatio: "4/3",
              }}
            >
              <Image
                src={url}
                alt={`Résultat campagne ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "#22c55e" }}
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white text-sm font-bold">Campagne #{i + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
