"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { BarChart3 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface ResultsProps {
  screenshotUrls?: (string | null)[];
}

export function Results({ screenshotUrls = [] }: ResultsProps) {
  const slots = Array.from({ length: 6 }, (_, i) => screenshotUrls[i] ?? null);
  const filled = slots.filter(Boolean).length;

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
          {slots.map((url, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.55, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
              className="group relative overflow-hidden rounded-3xl bg-white"
              style={{
                border: url ? "1px solid #ede9fe" : "2px dashed #ddd6fe",
                boxShadow: url ? "0 4px 20px rgba(109,40,217,0.1)" : "none",
                aspectRatio: "4/3",
              }}
            >
              {url ? (
                <>
                  <Image
                    src={url}
                    alt={`Résultat campagne ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 select-none">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #ede9fe, #ddd6fe)" }}>
                    <BarChart3 className="w-7 h-7 text-purple-500" />
                  </div>
                  <p className="text-gray-400 text-sm font-semibold">Résultat {i + 1}</p>
                  <p className="text-gray-300 text-xs">Screenshot à venir</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom note — only when no uploads yet */}
        {filled === 0 && (
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center text-gray-300 text-xs mt-8"
          >
            Géré depuis le{" "}
            <a href="/admin/dashboard" className="text-purple-400 hover:text-purple-600 transition-colors font-semibold">
              panel admin
            </a>
          </motion.p>
        )}
      </div>
    </section>
  );
}
