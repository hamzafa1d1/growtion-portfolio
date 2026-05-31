"use client";
import { motion } from "framer-motion";
import {
  Sparkles, Zap, Shirt, Dumbbell, Watch, Smartphone, Leaf, Home, FlaskConical, Gem,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SECTORS: { label: string; Icon: LucideIcon }[] = [
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

const ROW_A = [...SECTORS, ...SECTORS];
const ROW_B = [...[...SECTORS].reverse(), ...[...SECTORS].reverse()];

const BG = "#fafaf9";

function Pill({ label, Icon }: { label: string; Icon: LucideIcon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="flex items-center gap-2.5 flex-shrink-0 cursor-default select-none"
      style={{
        padding: "9px 20px 9px 9px",
        borderRadius: 999,
        border: "1px solid #e5e7eb",
        background: "#ffffff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <span
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{ width: 34, height: 34, background: "#7c3aed" }}
      >
        <Icon style={{ width: 15, height: 15, color: "#ffffff" }} strokeWidth={2.5} />
      </span>
      <span style={{
        fontWeight: 600,
        fontSize: "0.875rem",
        letterSpacing: "0.01em",
        color: "#111827",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
    </motion.div>
  );
}

export function SectorsBand() {
  return (
    <>
      <style>{`
        @keyframes marquee-l {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-r {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .sb-l { animation: marquee-l 30s linear infinite; }
        .sb-r { animation: marquee-r 36s linear infinite; }
        .sb-row:hover .sb-l,
        .sb-row:hover .sb-r {
          animation-play-state: paused;
        }
      `}</style>

      <section style={{ padding: "72px 0 64px", background: BG, borderBottom: "1px solid #ede9fe" }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: "center",
            marginBottom: "52px",
            fontSize: "10.5px",
            fontWeight: 700,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "#a78bfa",
          }}
        >
          Secteurs que nous avons propulsés
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: "relative", overflow: "hidden" }}
        >
          {/* Edge fades */}
          <div
            className="absolute inset-y-0 left-0 z-10 pointer-events-none"
            style={{ width: 160, background: `linear-gradient(to right, ${BG} 15%, transparent)` }}
          />
          <div
            className="absolute inset-y-0 right-0 z-10 pointer-events-none"
            style={{ width: 160, background: `linear-gradient(to left, ${BG} 15%, transparent)` }}
          />

          {/* Row 1 — scrolls left */}
          <div className="sb-row" style={{ paddingBottom: 12 }}>
            <div className="sb-l flex items-center" style={{ width: "max-content", gap: 12 }}>
              {ROW_A.map((s, i) => <Pill key={i} label={s.label} Icon={s.Icon} />)}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="sb-row" style={{ paddingTop: 4 }}>
            <div className="sb-r flex items-center" style={{ width: "max-content", gap: 12 }}>
              {ROW_B.map((s, i) => <Pill key={i} label={s.label} Icon={s.Icon} />)}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
