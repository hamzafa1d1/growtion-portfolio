"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Play, X, Maximize2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface FilmingVideosProps {
  videoUrls?: (string | null)[];
}

type Lightbox = { url: string; index: number };

function isVideo(url: string) {
  return /\.(mp4|webm|mov)$/i.test(url.split("?")[0]);
}

function VideoCard({
  url,
  index,
  onOpen,
}: {
  url: string | null;
  index: number;
  onOpen: (item: Lightbox) => void;
}) {
  const hasVideo = !!url && isVideo(url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: EASE }}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
      className="relative rounded-2xl overflow-hidden group"
      style={{
        aspectRatio: "9/16",
        background: "linear-gradient(160deg, #1a1040, #0d0b2b)",
        border: hasVideo ? "1px solid rgba(124,58,237,0.5)" : "2px dashed rgba(124,58,237,0.25)",
        cursor: hasVideo ? "pointer" : "default",
        boxShadow: hasVideo ? "0 8px 32px rgba(109,40,217,0.25)" : "none",
      }}
      onClick={() => hasVideo && onOpen({ url: url!, index })}
    >
      {hasVideo ? (
        <>
          <video
            src={url!}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlay on hover */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(124,58,237,0.9)" }}>
                <Maximize2 className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}>
            <Play className="w-5 h-5 text-purple-400 ml-0.5" />
          </div>
          <p className="text-purple-400/50 text-xs text-center font-medium">Vidéo {index + 1}</p>
        </div>
      )}
    </motion.div>
  );
}

export function FilmingVideos({ videoUrls = [] }: FilmingVideosProps) {
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);

  // Pad to 6 slots
  const slots: (string | null)[] = Array.from({ length: 6 }, (_, i) => videoUrls[i] ?? null);
  const hasAny = slots.some(Boolean);

  if (!hasAny) return null;

  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0b2b 0%, #100d30 100%)" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5 tracking-widest uppercase"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.35)",
              color: "#a855f7",
            }}
          >
            <span>🎬</span>
            Tournage & Production
          </div>

          <h2
            className="text-4xl md:text-5xl font-black leading-tight mb-4"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Nos Vidéos de Tournage
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Des productions authentiques, filmées et montées pour captiver votre audience dès la première seconde.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {slots.map((url, i) => (
            <VideoCard key={i} url={url} index={i} onOpen={setLightbox} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative rounded-2xl overflow-hidden"
              style={{ maxHeight: "90vh", maxWidth: "min(400px, 90vw)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={lightbox.url}
                autoPlay
                controls
                loop
                playsInline
                className="w-full h-full object-contain"
                style={{ maxHeight: "85vh" }}
              />
            </motion.div>

            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
