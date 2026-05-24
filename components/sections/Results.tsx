"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const step = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const campaigns = [
  { purchases: 113, costPerPurchase: "$0.42", amountSpent: "$47.84",  reach: 54810,  impressions: 73395,  roas: "44.72", clicks: 2349  },
  { purchases: 147, costPerPurchase: "$1.08", amountSpent: "$158.59", reach: 94677,  impressions: 154569, roas: "12.35", clicks: 3711  },
  { purchases: 45,  costPerPurchase: "$0.83", amountSpent: "$37.19",  reach: 21214,  impressions: 25833,  roas: "17.53", clicks: 786   },
  { purchases: 59,  costPerPurchase: "$1.71", amountSpent: "$100.61", reach: 109480, impressions: 133536, roas: "16.85", clicks: 3029  },
  { purchases: 37,  costPerPurchase: "$0.73", amountSpent: "$26.99",  reach: 14788,  impressions: 17592,  roas: "20.00", clicks: 442   },
  { purchases: 83,  costPerPurchase: "$1.22", amountSpent: "$101.56", reach: 52054,  impressions: 75565,  roas: "10.45", clicks: 2094  },
  { purchases: 54,  costPerPurchase: "$0.93", amountSpent: "$50.04",  reach: 50762,  impressions: 57182,  roas: "15.78", clicks: 1423  },
];

const globalStats = [
  { label: "Clients satisfaits", value: 200, suffix: "+" },
  { label: "Créations réalisées", value: 1000, suffix: "+" },
  { label: "ROAS record", value: 44, suffix: "x" },
  { label: "Pays servis", value: 3, suffix: "" },
];

export function Results() {
  return (
    <section id="resultats" className="section-white py-24 px-6"
      style={{ borderBottom: "1px solid #ede9fe" }}>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-purple-600 text-sm font-bold tracking-widest uppercase mb-3">Chiffres réels de nos campagnes</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900" style={{ fontFamily: "Arial Black, sans-serif" }}>
            NOS <span className="gradient-text">RÉSULTATS</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-purple-600" />
        </motion.div>

        {/* Global stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {globalStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
              className="text-center bg-white rounded-2xl p-6"
              style={{ border: "1px solid #ede9fe", boxShadow: "0 2px 12px rgba(109,40,217,0.07)" }}
            >
              <div className="text-4xl font-black text-purple-600 mb-1">
                <AnimatedNumber target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Campaign cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {campaigns.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
              className="bg-white rounded-2xl p-5 flex flex-col gap-3"
              style={{ border: "1px solid #ede9fe", boxShadow: "0 2px 10px rgba(109,40,217,0.06)" }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-2xl font-black text-gray-900">{c.purchases}</span>
                  <p className="text-gray-400 text-xs">Purchases</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-700">{c.costPerPurchase}</span>
                  <p className="text-gray-400 text-xs">Cost/Purchase</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-700">{c.amountSpent}</span>
                  <p className="text-gray-400 text-xs">Spent</p>
                </div>
              </div>
              <div className="h-px bg-purple-100" />
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-sm font-bold text-gray-800">{c.reach.toLocaleString()}</span><p className="text-gray-400 text-xs">Reach</p></div>
                <div><span className="text-sm font-bold text-gray-800">{c.impressions.toLocaleString()}</span><p className="text-gray-400 text-xs">Impressions</p></div>
                <div><span className="text-base font-black text-purple-600">{c.roas}x</span><p className="text-gray-400 text-xs">ROAS</p></div>
                <div><span className="text-sm font-bold text-gray-800">{c.clicks.toLocaleString()}</span><p className="text-gray-400 text-xs">Clicks</p></div>
              </div>
            </motion.div>
          ))}

          {/* Record card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
            whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
            className="rounded-2xl p-5 flex flex-col justify-center items-center text-center gap-2"
            style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", boxShadow: "0 8px 30px rgba(109,40,217,0.35)" }}
          >
            <div className="text-5xl font-black text-white">44x</div>
            <div className="text-purple-200 font-bold text-sm">ROAS Record</div>
            <div className="text-white/60 text-xs">Meilleur résultat obtenu pour un client e-commerce</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
