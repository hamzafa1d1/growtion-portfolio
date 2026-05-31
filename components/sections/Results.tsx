"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface ResultsProps {
  screenshotUrls?: (string | null)[];
}

export function Results({ screenshotUrls = [] }: ResultsProps) {
  const filled = Array.from({ length: 6 }, (_, i) => screenshotUrls[i] ?? null).filter((url): url is string => !!url);

  if (filled.length === 0) return null;

  return (
    <section id="resultats" className="section-white py-24 px-6"
      style={{ borderBottom: "1px solid #ede9fe" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-purple-600 text-sm font-bold tracking-widest uppercase mb-3">Chiffres réels, clients réels</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900" style={{ fontFamily: "Arial Black, sans-serif" }}>
            NOS <span className="gradient-text">RÉSULTATS</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-purple-600" />
          <p className="text-gray-400 text-sm mt-4">Screenshots de nos campagnes les plus performantes</p>
        </motion.div>

        {/* Screenshot grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filled.map((url, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.55, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
              className="group relative overflow-hidden rounded-3xl bg-white"
              style={{ border: "1px solid #ede9fe", boxShadow: "0 4px 20px rgba(109,40,217,0.1)", aspectRatio: "4/3" }}
            >
              <Image
                src={url}
                alt={`Résultat campagne ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
