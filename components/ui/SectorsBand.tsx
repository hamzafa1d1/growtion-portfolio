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

export function SectorsBand() {
  return (
    <section className="section-white py-12 px-0" style={{ borderBottom: "1px solid #ede9fe" }}>
      {/* Heading */}
      <p
        className="text-center text-xs font-bold tracking-[0.25em] uppercase mb-8"
        style={{ color: "#a78bfa" }}
      >
        Secteurs que nous avons propulsés
      </p>

      {/* Track with edge fades */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #ffffff, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #ffffff, transparent)" }}
        />

        <motion.div
          className="flex items-center"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {ITEMS.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mx-5 flex-shrink-0"
              style={{
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid #ede9fe",
                background: "#faf9ff",
              }}
            >
              <span
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{ width: 32, height: 32, background: "#ede9fe" }}
              >
                <s.Icon style={{ width: 15, height: 15, color: "#7c3aed", strokeWidth: 2 }} />
              </span>
              <span
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  letterSpacing: "0.04em",
                  color: "#4c1d95",
                  whiteSpace: "nowrap",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

