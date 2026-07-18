"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Play, X, Maximize2 } from "lucide-react";
import Image from "next/image";
import { isVideoAsset } from "@/lib/media";

const EASE = [0.22, 1, 0.36, 1] as const;
const tabs = ["Vidéos Pub", "Vidéos UGC"] as const;
type Tab = (typeof tabs)[number];

export interface PortfolioProps {
  videoUrls?: string[];
  ugcUrls?: string[];
}

type Lightbox = { url: string; label: string; type: "video" | "image" };

const isVideo = isVideoAsset;

function PhoneMockup({
  imageUrl, label, index, onOpen,
}: {
  imageUrl: string | null;
  label: string;
  index: number;
  onOpen: (item: Lightbox) => void;
}) {
  const hasMedia = !!imageUrl;
  const mediaType = imageUrl && isVideo(imageUrl) ? "video" : "image";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.5, ease: EASE }}
      whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
      className="flex flex-col items-center"
    >
      <div
        className="relative overflow-hidden bg-white group"
        style={{
          width: 150, height: 280, borderRadius: 26,
          border: "3px solid #7c3aed",
          boxShadow: "0 8px 24px rgba(109,40,217,0.2)",
          cursor: hasMedia ? "pointer" : "default",
        }}
        onClick={() => {
          if (hasMedia) onOpen({ url: imageUrl!, label, type: mediaType });
        }}
      >
        {imageUrl ? (
          isVideo(imageUrl) ? (
            <>
              {/* First frame only — no autoplay. */}
              <video
                src={`${imageUrl}#t=0.1`}
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ background: "rgba(124,58,237,0.9)" }}>
                  <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
                </div>
              </div>
            </>
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
        {/* Expand hint on hover */}
        {hasMedia && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-end p-2"
            style={{ background: "rgba(0,0,0,0.32)" }}>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Portfolio({ videoUrls = [], ugcUrls = [] }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Vidéos Pub");
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);

  const filledVideos = videoUrls
    .filter((url): url is string => !!url)
    .map((url, i) => ({ url, label: `Vidéo Pub ${i + 1}` }));
  const filledUgc = ugcUrls
    .filter((url): url is string => !!url)
    .map((url, i) => ({ url, label: `Vidéo UGC ${i + 1}` }));

  const availableTabs = tabs.filter((tab) =>
    (tab === "Vidéos Pub" && filledVideos.length > 0) ||
    (tab === "Vidéos UGC" && filledUgc.length > 0)
  );

  const currentTab = availableTabs.includes(activeTab) ? activeTab : availableTabs[0];

  const closeLightbox = useCallback(() => setLightbox(null), []);

  // Escape key + body scroll lock
  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox]);

  // Sync active tab from URL hash (e.g. hero cards linking to #portfolio-ugc)
  useEffect(() => {
    function syncFromHash() {
      if (window.location.hash === "#portfolio-ugc") {
        setActiveTab("Vidéos UGC");
        document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (window.location.hash === "#portfolio") {
        setActiveTab("Vidéos Pub");
      }
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  if (availableTabs.length === 0) return null;

  return (
    <>
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
            <h2 className="text-4xl md:text-5xl font-black text-gray-900" style={{ fontFamily: "var(--font-display), 'Arial Black', Impact, sans-serif" }}>
              NOTRE <span className="gradient-text">PORTFOLIO</span>
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-purple-600" />
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {availableTabs.map((tab) => (
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

          <motion.div key={currentTab} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: EASE }}>
            {currentTab === "Vidéos Pub" && (
              <div className="flex flex-wrap justify-center gap-6">
                {filledVideos.map((item, i) => (
                  <PhoneMockup key={i} imageUrl={item.url} label={item.label} index={i} onOpen={setLightbox} />
                ))}
              </div>
            )}
            {currentTab === "Vidéos UGC" && (
              <div className="flex flex-wrap justify-center gap-6">
                {filledUgc.map((item, i) => (
                  <PhoneMockup key={i} imageUrl={item.url} label={item.label} index={i} onOpen={setLightbox} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
            onClick={closeLightbox}
          >
            {/* Content card — stop propagation so clicking inside doesn't close */}
            <motion.div
              key="lightbox-content"
              initial={{ scale: 0.88, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.88, y: 16, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Video player (phone shape) ── */}
              <div style={{
                width: "min(360px, 88vw)",
                borderRadius: 36,
                border: "3px solid #7c3aed",
                overflow: "hidden",
                boxShadow: "0 0 60px rgba(124,58,237,0.4)",
                background: "#000",
              }}>
                <video
                  src={lightbox.url}
                  controls
                  playsInline
                  style={{ width: "100%", maxHeight: "78vh", objectFit: "contain", display: "block", background: "#000" }}
                />
              </div>

              {/* Label */}
              <p className="mt-3 text-white/50 text-xs font-medium">{lightbox.label}</p>
            </motion.div>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 flex items-center justify-center rounded-full transition-colors"
              style={{ width: 40, height: 40, background: "rgba(255,255,255,0.12)", color: "white" }}
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
