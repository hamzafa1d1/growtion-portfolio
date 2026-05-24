"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;
const tabs = ["Vidéos Pub", "Vidéos UGC", "Landing Pages"] as const;
type Tab = (typeof tabs)[number];

export interface PortfolioProps {
  videoUrls?: (string | null)[];
  ugcUrls?: (string | null)[];
  landingUrls?: (string | null)[];
}

const VIDEO_HOOKS = [
  "CAP CUT هذا PRO",
  "ترجع للدار بلا طاقة",
  "كل تفاصيل تحضير روحك",
  "الحماس اختفى — المشكلة ليست أنت",
];
const LANDING_TITLES = ["Massage Gun", "Sac Magnétique", "Équipement Fitness", "Table de Massage", "Coussin Orthopédique", "Appareil Sport"];

function isVideo(url: string) {
  return /\.(mp4|webm|mov)$/i.test(url.split("?")[0]);
}

function PhoneMockup({ imageUrl, label, index }: { imageUrl: string | null; label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.5, ease: EASE }}
      whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
      className="flex flex-col items-center"
    >
      <div className="relative overflow-hidden bg-white"
        style={{
          width: 150, height: 280, borderRadius: 26,
          border: "3px solid #7c3aed",
          boxShadow: "0 8px 24px rgba(109,40,217,0.2)",
        }}>
        {imageUrl ? (
          isVideo(imageUrl) ? (
            <video
              src={imageUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image src={imageUrl} alt={label} fill className="object-cover" sizes="150px" />
          )
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-3"
            style={{ background: "linear-gradient(160deg, #f5f3ff, #ede9fe)" }}>
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-purple-600">
              <Play className="w-5 h-5 text-white ml-0.5" />
            </div>
            <p className="text-purple-800 text-xs text-center font-bold leading-tight px-2">{label}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function LandingPageMockup({ imageUrl, title, index }: { imageUrl: string | null; title: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.07, duration: 0.5, ease: EASE }}
      whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer bg-white"
      style={{ border: "1px solid #ede9fe", height: 260, boxShadow: "0 2px 12px rgba(109,40,217,0.08)" }}
    >
      {imageUrl ? (
        <Image src={imageUrl} alt={title} fill className="object-cover" sizes="400px" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3"
          style={{ background: "linear-gradient(160deg, #f5f3ff, #ede9fe)" }}>
          <ExternalLink className="w-7 h-7 text-purple-600" />
          <p className="text-purple-800 font-bold text-sm">{title}</p>
        </div>
      )}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
        style={{ background: "rgba(109,40,217,0.5)" }}>
        <ExternalLink className="w-8 h-8 text-white" />
      </div>
    </motion.div>
  );
}

export function Portfolio({ videoUrls = [], ugcUrls = [], landingUrls = [] }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Vidéos Pub");

  return (
    <section id="portfolio" className="section-light py-24 px-6"
      style={{ borderTop: "1px solid #ede9fe", borderBottom: "1px solid #ede9fe" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-10"
        >
          <p className="text-purple-600 text-sm font-bold tracking-widest uppercase mb-3">Nos créations</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900" style={{ fontFamily: "Arial Black, sans-serif" }}>
            NOTRE <span className="gradient-text">PORTFOLIO</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-purple-600" />
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <motion.button
              key={tab} onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="px-6 py-2.5 rounded-full font-bold text-sm transition-all"
              style={activeTab === tab
                ? { background: "#7c3aed", color: "white", boxShadow: "0 4px 16px rgba(109,40,217,0.3)" }
                : { background: "white", color: "#7c3aed", border: "1px solid #c4b5fd" }}
            >{tab}</motion.button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
          {activeTab === "Vidéos Pub" && (
            <div className="flex flex-wrap justify-center gap-6">
              {VIDEO_HOOKS.map((hook, i) => <PhoneMockup key={i} imageUrl={videoUrls[i] ?? null} label={hook} index={i} />)}
            </div>
          )}
          {activeTab === "Vidéos UGC" && (
            <div className="flex flex-wrap justify-center gap-6">
              {["Vidéo UGC 1","Vidéo UGC 2","Vidéo UGC 3","Vidéo UGC 4"].map((label, i) =>
                <PhoneMockup key={i} imageUrl={ugcUrls[i] ?? null} label={label} index={i} />)}
            </div>
          )}
          {activeTab === "Landing Pages" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {LANDING_TITLES.map((title, i) => <LandingPageMockup key={i} imageUrl={landingUrls[i] ?? null} title={title} index={i} />)}
            </div>
          )}
        </motion.div>


      </div>
    </section>
  );
}
