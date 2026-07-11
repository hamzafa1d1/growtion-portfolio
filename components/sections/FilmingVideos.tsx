"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Maximize2, X } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface FilmingVideosProps {
  videoUrls?: (string | null)[];
}

type Lightbox = { url: string; index: number };

function PhoneMockup({
  url,
  index,
  onOpen,
}: {
  url: string;
  index: number;
  onOpen: (item: Lightbox) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: EASE }}
      whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
      className="flex flex-col items-center"
    >
      <div
        className="relative overflow-hidden bg-white group cursor-pointer"
        style={{
          width: 150,
          height: 280,
          borderRadius: 26,
          border: "3px solid #7c3aed",
          boxShadow: "0 8px 24px rgba(109,40,217,0.2)",
        }}
        onClick={() => onOpen({ url, index })}
      >
        <video
          src={url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-end p-2"
          style={{ background: "rgba(0,0,0,0.32)" }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
            <Maximize2 className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FilmingVideos({ videoUrls = [] }: FilmingVideosProps) {
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const filled = Array.from({ length: 6 }, (_, i) => videoUrls[i] ?? null).filter(
    (url): url is string => !!url
  );

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

  if (filled.length === 0) return null;

  return (
    <>
      <section
        id="tournage"
        className="section-light py-24 px-6"
        style={{ borderTop: "1px solid #ede9fe", borderBottom: "1px solid #ede9fe" }}
      >
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center mb-10"
          >
            <p className="text-purple-600 text-sm font-bold tracking-widest uppercase mb-3">
              Tournage & Production
            </p>
            <h2
              className="text-4xl md:text-5xl font-black text-gray-900"
              style={{ fontFamily: "var(--font-display), 'Arial Black', Impact, sans-serif" }}
            >
              VIDÉOS DE <span className="gradient-text">TOURNAGE</span>
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-purple-600" />
          </motion.div>

          {/* Phone grid */}
          <div className="flex flex-wrap justify-center gap-6">
            {filled.map((url, i) => (
              <PhoneMockup key={i} url={url} index={i} onOpen={setLightbox} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="filming-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
            onClick={closeLightbox}
          >
            <motion.div
              key="filming-lightbox-content"
              initial={{ scale: 0.88, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.88, y: 16, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  width: "min(360px, 88vw)",
                  borderRadius: 36,
                  border: "3px solid #7c3aed",
                  overflow: "hidden",
                  boxShadow: "0 0 60px rgba(124,58,237,0.4)",
                  background: "#000",
                }}
              >
                <video
                  src={lightbox.url}
                  autoPlay
                  controls
                  loop
                  playsInline
                  style={{ width: "100%", display: "block", maxHeight: "80vh" }}
                />
              </div>
            </motion.div>

            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
