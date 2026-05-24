"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Play, Zap, Layout } from "lucide-react";

const WHATSAPP_NUMBER = "21656614879";
const WA_MSG = encodeURIComponent("Bonjour Growtion! Je suis intéressé(e) par vos services créatifs.");

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;

const services = [
  { icon: <Play className="w-5 h-5" />, label: "VIDÉOS\nPUBLICITAIRES" },
  { icon: <Zap className="w-5 h-5" />,  label: "VIDÉOS\nUGC" },
  { icon: <Layout className="w-5 h-5" />, label: "LANDING\nPAGE" },
];

export function Hero() {
  return (
    <section id="hero" className="section-white relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Subtle purple tint top-right */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{ background: "linear-gradient(135deg, transparent 40%, #f5f3ff 100%)" }} />

      <div className="relative max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-20">

        {/* LEFT — service cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex gap-4 justify-center md:justify-start"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: EASE }}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
              className="flex flex-col items-center justify-between rounded-3xl p-4 text-center"
              style={{
                background: "linear-gradient(160deg, #7c3aed, #6d28d9)",
                width: 118, height: 210,
                boxShadow: "0 8px 24px rgba(109,40,217,0.25)",
              }}
            >
              {/* PLACEHOLDER: Replace with actual person/service image */}
              <div className="w-full flex-1 rounded-2xl mb-3 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)" }}>
                {s.icon}
              </div>
              <span className="text-white font-black text-xs leading-tight tracking-wide whitespace-pre-line">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* RIGHT — headline + CTA */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="flex flex-col gap-7"
        >
          <div className="flex justify-end">
            <div className="animate-float">
              <Image src="/logo.svg" alt="Growtion" width={72} height={72} />
            </div>
          </div>

          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
              className="text-purple-600 font-bold text-sm tracking-widest uppercase mb-3"
            >
              Sell Smart · Grow Faster
            </motion.p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900"
              style={{ fontFamily: "Arial Black, Impact, sans-serif" }}>
              DES CRÉATIVES QUI{" "}
              <span className="gradient-text">TRANSFORMENT</span>
              {" "}LE SCROLL EN{" "}
              <span style={{ color: "#7c3aed" }}>ACHAT</span>
            </h1>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-purple-100" />

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-400 transition-colors shadow-sm">
                <MessageCircle className="w-5 h-5 fill-white text-white" />
              </div>
              <span className="font-bold text-gray-800 text-base group-hover:text-green-600 transition-colors">+216 56 614 879</span>
            </a>
            <a href="https://instagram.com/growtion7" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
                style={{ background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
                <InstagramIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-800 italic text-base group-hover:text-pink-600 transition-colors">growtion7</span>
            </a>
            <a href="https://facebook.com/growtion" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-sm">
                <FacebookIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-800 italic text-base group-hover:text-blue-600 transition-colors">growtion</span>
            </a>
          </div>

          {/* CTA */}
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="inline-flex items-center gap-3 text-white font-black text-lg px-8 py-4 rounded-2xl self-start animate-pulse-purple"
            style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", boxShadow: "0 4px 20px rgba(109,40,217,0.3)" }}
          >
            <MessageCircle className="w-6 h-6" />
            BOOSTER MES VENTES
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
