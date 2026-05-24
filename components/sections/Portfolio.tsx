"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";

const tabs = ["Vidéos Pub", "Vidéos UGC", "Landing Pages"] as const;
type Tab = (typeof tabs)[number];

// PLACEHOLDER: Replace these with real thumbnails in public/portfolio/
const videoPlaceholders = [
  { id: 1, src: "/portfolio/video-1.jpg", hook: "CAP CUT هذا PRO" },
  { id: 2, src: "/portfolio/video-2.jpg", hook: "ترجع للدار بلا طاقة" },
  { id: 3, src: "/portfolio/video-3.jpg", hook: "كل تفاصيل تحضير روحك" },
  { id: 4, src: "/portfolio/video-4.jpg", hook: "الحماس اختفى — المشكلة ليست أنت" },
];

const ugcPlaceholders = [
  { id: 1, src: "/portfolio/ugc-1.jpg", hook: "Vidéo UGC 1" },
  { id: 2, src: "/portfolio/ugc-2.jpg", hook: "Vidéo UGC 2" },
  { id: 3, src: "/portfolio/ugc-3.jpg", hook: "Vidéo UGC 3" },
  { id: 4, src: "/portfolio/ugc-4.jpg", hook: "Vidéo UGC 4" },
];

const landingPlaceholders = [
  { id: 1, src: "/portfolio/landing-1.jpg", title: "Massage Gun" },
  { id: 2, src: "/portfolio/landing-2.jpg", title: "Sac Magnétique" },
  { id: 3, src: "/portfolio/landing-3.jpg", title: "Équipement Fitness" },
  { id: 4, src: "/portfolio/landing-4.jpg", title: "Table de Massage" },
  { id: 5, src: "/portfolio/landing-5.jpg", title: "Coussin Orthopédique" },
  { id: 6, src: "/portfolio/landing-6.jpg", title: "Appareil Sport" },
];

function PhoneMockup({ src, label, index }: { src: string; label: string; index: number }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="relative flex flex-col items-center"
    >
      {/* Phone frame */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "160px",
          height: "300px",
          borderRadius: "28px",
          border: "3px solid #3b82f6",
          boxShadow: "0 0 20px rgba(59,130,246,0.4), inset 0 0 10px rgba(0,0,0,0.3)",
          background: "rgba(20,17,50,0.9)",
        }}
      >
        {/* PLACEHOLDER: Drop your video thumbnail/screenshot here */}
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-2 p-3"
          style={{ background: "linear-gradient(180deg, rgba(124,58,237,0.3), rgba(13,11,43,0.9))" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(124,58,237,0.5)", border: "2px solid rgba(255,255,255,0.3)" }}
          >
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
          <p className="text-white text-xs text-center font-bold leading-tight px-2">{label}</p>
          <p className="text-purple-400 text-xs text-center opacity-60">
            📸 Remplacer avec<br />votre thumbnail
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function LandingPageMockup({ src, title, index }: { src: string; title: string; index: number }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        border: "1px solid rgba(124,58,237,0.3)",
        background: "rgba(20,17,50,0.9)",
        height: "280px",
      }}
    >
      {/* PLACEHOLDER: Drop your landing page screenshot here (public/portfolio/landing-X.jpg) */}
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3"
        style={{ background: "linear-gradient(180deg, rgba(74,0,224,0.3), rgba(13,11,43,0.95))" }}
      >
        <ExternalLink className="w-8 h-8 text-purple-400" />
        <p className="text-white font-bold text-sm">{title}</p>
        <p className="text-gray-500 text-xs text-center px-4">
          📸 Remplacer avec votre screenshot<br />(public/portfolio/landing-{index + 1}.jpg)
        </p>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        style={{ background: "rgba(124,58,237,0.5)" }}
      >
        <ExternalLink className="w-8 h-8 text-white" />
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>("Vidéos Pub");

  return (
    <section
      id="portfolio"
      className="py-24 px-6"
      style={{ background: "linear-gradient(180deg, #0D0B2B 0%, #0a0820 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-purple-400 text-sm font-bold tracking-widest uppercase mb-3">
            Nos créations
          </p>
          <h2
            className="text-4xl md:text-5xl font-black text-white"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            NOTRE <span className="gradient-text">PORTFOLIO</span>
          </h2>
          <div
            className="mx-auto mt-4 h-1 w-20 rounded-full"
            style={{ background: "linear-gradient(90deg, #7C3AED, #F5B800)" }}
          />
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2.5 rounded-full font-bold text-sm transition-all"
              style={
                activeTab === tab
                  ? {
                      background: "linear-gradient(135deg, #7C3AED, #9333EA)",
                      color: "white",
                      boxShadow: "0 0 20px rgba(124,58,237,0.5)",
                    }
                  : {
                      background: "rgba(124,58,237,0.1)",
                      color: "#a855f7",
                      border: "1px solid rgba(124,58,237,0.3)",
                    }
              }
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === "Vidéos Pub" && (
            <div className="flex flex-wrap justify-center gap-6">
              {videoPlaceholders.map((v, i) => (
                <PhoneMockup key={v.id} src={v.src} label={v.hook} index={i} />
              ))}
            </div>
          )}
          {activeTab === "Vidéos UGC" && (
            <div className="flex flex-wrap justify-center gap-6">
              {ugcPlaceholders.map((v, i) => (
                <PhoneMockup key={v.id} src={v.src} label={v.hook} index={i} />
              ))}
            </div>
          )}
          {activeTab === "Landing Pages" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {landingPlaceholders.map((l, i) => (
                <LandingPageMockup key={l.id} src={l.src} title={l.title} index={i} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Note */}
        <p className="text-center text-gray-600 text-xs mt-8">
          💡 Ajoutez vos images dans <code className="text-purple-400">public/portfolio/</code>
        </p>
      </div>
    </section>
  );
}
