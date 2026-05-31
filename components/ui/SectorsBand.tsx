"use client";
import { motion } from "framer-motion";

const SECTORS = [
  { label: "Cosmétiques",   emoji: "💄" },
  { label: "Gadgets",       emoji: "⚡" },
  { label: "Vêtements",     emoji: "👗" },
  { label: "Suppléments",   emoji: "💊" },
  { label: "Fitness",       emoji: "🏋️" },
  { label: "Accessoires",   emoji: "💍" },
  { label: "Électronique",  emoji: "📱" },
  { label: "Bien-être",     emoji: "🌿" },
  { label: "Maison",        emoji: "🏠" },
  { label: "Beauté",        emoji: "✨" },
];

// Duplicate for seamless loop
const ITEMS = [...SECTORS, ...SECTORS];

export function SectorsBand() {
  return (
    <div
      className="w-full overflow-hidden py-3 select-none"
      style={{
        background: "linear-gradient(90deg, #7c3aed, #6d28d9)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 22,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {ITEMS.map((s, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-6 text-white font-bold text-sm tracking-wide"
          >
            <span>{s.emoji}</span>
            <span>{s.label}</span>
            <span className="ml-4 opacity-40 text-lg">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
