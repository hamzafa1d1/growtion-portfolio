"use client";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Shirt,
  Dumbbell,
  Watch,
  Smartphone,
  Leaf,
  Home,
  FlaskConical,
  Gem,
} from "lucide-react";

const SECTORS = [
  { label: "Cosmétiques",  Icon: Sparkles },
  { label: "Gadgets",      Icon: Zap },
  { label: "Vêtements",    Icon: Shirt },
  { label: "Suppléments",  Icon: FlaskConical },
  { label: "Fitness",      Icon: Dumbbell },
  { label: "Accessoires",  Icon: Watch },
  { label: "Électronique", Icon: Smartphone },
  { label: "Bien-être",    Icon: Leaf },
  { label: "Maison",       Icon: Home },
  { label: "Bijoux",       Icon: Gem },
];

const ITEMS = [...SECTORS, ...SECTORS, ...SECTORS];

const DIVIDER = (
  <span
    aria-hidden
    style={{
      display: "inline-block",
      width: 5,
      height: 5,
      borderRadius: "50%",
      background: "rgba(124,58,237,0.35)",
      margin: "0 28px",
      verticalAlign: "middle",
      flexShrink: 0,
    }}
  />
);

export function SectorsBand() {
  return (
    <div
      className="w-full overflow-hidden select-none"
      style={{
        background: "#ffffff",
        borderTop: "1px solid #ede9fe",
        borderBottom: "1px solid #ede9fe",
        padding: "14px 0",
      }}
    >
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        style={{ willChange: "transform" }}
      >
        {ITEMS.map((s, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2.5 flex-shrink-0"
            style={{
              padding: "0 4px",
              fontFamily: "Arial Black, Impact, sans-serif",
              fontWeight: 900,
              fontSize: "0.72rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6d28d9",
            }}
          >
            <span
              className="flex-shrink-0 flex items-center justify-center rounded-lg"
              style={{
                width: 28,
                height: 28,
                background: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
              }}
            >
              <s.Icon
                style={{ width: 14, height: 14, color: "#7c3aed", strokeWidth: 2.2 }}
              />
            </span>
            {s.label}
            {DIVIDER}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
