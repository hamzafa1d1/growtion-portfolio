"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const campaigns = [
  {
    purchases: 113,
    costPerPurchase: "$0.42",
    amountSpent: "$47.84",
    reach: 54810,
    impressions: 73395,
    roas: "44.72",
    cpc: "$0.0244",
    clicks: 2349,
  },
  {
    purchases: 147,
    costPerPurchase: "$1.08",
    amountSpent: "$158.59",
    reach: 94677,
    impressions: 154569,
    roas: "12.35",
    cpc: "$0.0602",
    clicks: 3711,
  },
  {
    purchases: 45,
    costPerPurchase: "$0.83",
    amountSpent: "$37.19",
    reach: 21214,
    impressions: 25833,
    roas: "17.53",
    cpc: "$0.0631",
    clicks: 786,
  },
  {
    purchases: 59,
    costPerPurchase: "$1.71",
    amountSpent: "$100.61",
    reach: 109480,
    impressions: 133536,
    roas: "16.85",
    cpc: "$0.0591",
    clicks: 3029,
  },
  {
    purchases: 37,
    costPerPurchase: "$0.73",
    amountSpent: "$26.99",
    reach: 14788,
    impressions: 17592,
    roas: "20.00",
    cpc: "$0.0838",
    clicks: 442,
  },
  {
    purchases: 83,
    costPerPurchase: "$1.22",
    amountSpent: "$101.56",
    reach: 52054,
    impressions: 75565,
    roas: "10.45",
    cpc: "$0.0651",
    clicks: 2094,
  },
  {
    purchases: 54,
    costPerPurchase: "$0.93",
    amountSpent: "$50.04",
    reach: 50762,
    impressions: 57182,
    roas: "15.78",
    cpc: "$0.0663",
    clicks: 1423,
  },
];

const globalStats = [
  { label: "Clients satisfaits", value: 200, suffix: "+" },
  { label: "Créations réalisées", value: 1000, suffix: "+" },
  { label: "ROAS moyen", value: 20, suffix: "x" },
  { label: "Pays servis", value: 3, suffix: "" },
];

export function Results() {
  return (
    <section
      id="resultats"
      className="py-24 px-6"
      style={{ background: "#0D0B2B" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div
            className="inline-block px-6 py-3 rounded-2xl mb-4 text-4xl font-black"
            style={{ background: "#F5B800", color: "#0D0B2B" }}
          >
            RÉSULTATS
          </div>
          <p className="text-gray-400 text-base">Chiffres réels de nos campagnes clients</p>
        </motion.div>

        {/* Global stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {globalStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(147,51,234,0.1))",
                border: "1px solid rgba(124,58,237,0.3)",
              }}
            >
              <div
                className="text-4xl font-black mb-1"
                style={{ color: "#F5B800" }}
              >
                <AnimatedNumber target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Campaign cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {campaigns.map((c, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{
                background: "rgba(20,17,50,0.9)",
                border: "1px solid rgba(124,58,237,0.2)",
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className="text-2xl font-black"
                    style={{ color: "#ffffff" }}
                  >
                    {c.purchases}
                  </span>
                  <p className="text-gray-500 text-xs">Website purchases</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-300">{c.costPerPurchase}</span>
                  <p className="text-gray-500 text-xs">Cost/Purchase</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-300">{c.amountSpent}</span>
                  <p className="text-gray-500 text-xs">Spent</p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-purple-900" />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2">
                <Stat label="Reach" value={c.reach.toLocaleString()} />
                <Stat label="Impressions" value={c.impressions.toLocaleString()} />
                <Stat
                  label="Purchase ROAS"
                  value={c.roas}
                  highlight
                />
                <Stat label="CPC" value={c.cpc} />
              </div>
            </motion.div>
          ))}

          {/* Social proof card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="rounded-2xl p-5 flex flex-col justify-center items-center text-center gap-3"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #9333EA)",
              boxShadow: "0 10px 40px rgba(124,58,237,0.4)",
            }}
          >
            <div className="text-5xl font-black text-white">44x</div>
            <div className="text-yellow-300 font-bold text-sm">ROAS Record</div>
            <div className="text-white/70 text-xs">Meilleur résultat obtenu pour un client e-commerce</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <span
        className="text-sm font-bold"
        style={{ color: highlight ? "#F5B800" : "#e2e8f0" }}
      >
        {value}
      </span>
      <p className="text-gray-500 text-xs">{label}</p>
    </div>
  );
}
