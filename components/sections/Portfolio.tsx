"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Play, ExternalLink, X, Maximize2, ZoomIn } from "lucide-react";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;
const tabs = ["Vidéos Pub", "Vidéos UGC", "Landing Pages"] as const;
type Tab = (typeof tabs)[number];

export interface PortfolioProps {
  videoUrls?: (string | null)[];
  ugcUrls?: (string | null)[];
  landingUrls?: (string | null)[];
}

type Lightbox = { url: string; label: string; type: "video" | "image" };

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

function LandingPageMockup({
  imageUrl, title, index, onOpen,
}: {
  imageUrl: string | null;
  title: string;
  index: number;
  onOpen: (item: Lightbox) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.07, duration: 0.5, ease: EASE }}
      whileHover={{ y: -5, transition: { duration: 0.2, ease: "easeOut" } }}
      className="relative rounded-2xl overflow-hidden group bg-white"
      style={{
        border: "1px solid #ede9fe", height: 260,
        boxShadow: "0 2px 12px rgba(109,40,217,0.08)",
        cursor: imageUrl ? "pointer" : "default",
      }}
      onClick={() => {
        if (imageUrl) onOpen({ url: imageUrl, label: title, type: "image" });
      }}
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
      {imageUrl && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          style={{ background: "rgba(109,40,217,0.48)" }}>
          <ZoomIn className="w-9 h-9 text-white drop-shadow-md" />
        </div>
      )}
    </motion.div>
  );
}

export function Portfolio({ videoUrls = [], ugcUrls = [], landingUrls = [] }: PortfolioProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Vidéos Pub");
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);

  const filledVideos = VIDEO_HOOKS
    .map((label, i) => ({ label, url: videoUrls[i] ?? null }))
    .filter((item): item is { label: string; url: string } => !!item.url);
  const filledUgc = ["Vidéo UGC 1", "Vidéo UGC 2", "Vidéo UGC 3", "Vidéo UGC 4"]
    .map((label, i) => ({ label, url: ugcUrls[i] ?? null }))
    .filter((item): item is { label: string; url: string } => !!item.url);
  const filledLandings = LANDING_TITLES
    .map((title, i) => ({ title, url: landingUrls[i] ?? null }))
    .filter((item): item is { title: string; url: string } => !!item.url);

  const availableTabs = tabs.filter((tab) =>
    (tab === "Vidéos Pub" && filledVideos.length > 0) ||
    (tab === "Vidéos UGC" && filledUgc.length > 0) ||
    (tab === "Landing Pages" && filledLandings.length > 0)
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
            <h2 className="text-4xl md:text-5xl font-black text-gray-900" style={{ fontFamily: "Arial Black, sans-serif" }}>
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
            {currentTab === "Landing Pages" && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {filledLandings.map((item, i) => (
                  <LandingPageMockup key={i} imageUrl={item.url} title={item.title} index={i} onOpen={setLightbox} />
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
              {lightbox.type === "video" ? (
                /* ── Video player (phone shape) ── */
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
                    autoPlay
                    playsInline
                    style={{ width: "100%", maxHeight: "78vh", objectFit: "contain", display: "block", background: "#000" }}
                  />
                </div>
              ) : (
                /* ── Landing page — scrollable full-height image ── */
                <div style={{
                  width: "min(500px, 92vw)",
                  maxHeight: "86vh",
                  overflowY: "auto",
                  borderRadius: 20,
                  border: "2px solid #7c3aed",
                  boxShadow: "0 0 60px rgba(124,58,237,0.35)",
                  background: "#fff",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#7c3aed transparent",
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={lightbox.url}
                    alt={lightbox.label}
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </div>
              )}

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
