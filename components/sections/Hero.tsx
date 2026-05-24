"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Zap, Play, Layout } from "lucide-react";

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

const WHATSAPP_NUMBER = "21656614879";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour Growtion! Je suis intéressé(e) par vos services créatifs."
);

const services = [
  { icon: <Play className="w-5 h-5" />, label: "VIDÉOS PUBLICITAIRES", color: "#7C3AED" },
  { icon: <Zap className="w-5 h-5" />, label: "VIDÉOS UGC", color: "#9333EA" },
  { icon: <Layout className="w-5 h-5" />, label: "LANDING PAGE", color: "#7C3AED" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: "linear-gradient(135deg, #0D0B2B 0%, #1a0a3d 50%, #0D0B2B 100%)" }}
    >
      {/* Background decorative blobs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #9333EA, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-16">
        {/* Left — service cards */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex gap-4 justify-center md:justify-start"
        >
          {services.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="flex flex-col items-center justify-between rounded-3xl p-4 text-center cursor-default"
              style={{
                background: s.color,
                width: "120px",
                height: "200px",
                boxShadow: `0 8px 32px rgba(124,58,237,0.4)`,
              }}
            >
              {/* PLACEHOLDER: Replace with actual person/service image */}
              <div
                className="w-full flex-1 rounded-2xl mb-3 flex items-center justify-center opacity-60"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                {s.icon}
              </div>
              <span className="text-white font-black text-xs leading-tight tracking-wide">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Right — headline + CTA */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          {/* Logo */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-end"
          >
            <Image src="/logo.svg" alt="Growtion" width={80} height={80} className="opacity-90" />
          </motion.div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white"
            style={{ fontFamily: "Arial Black, Impact, sans-serif" }}
          >
            DES CRÉATIVES QUI{" "}
            <span style={{ color: "#F5B800" }}>TRANSFORMENT</span> LE SCROLL EN{" "}
            <span className="gradient-text">ACHAT</span>
          </h1>

          {/* Divider lines */}
          <div className="flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ width: 0 }}
                animate={{ width: `${100 - i * 15}%` }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                className="h-0.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.3)" }}
              />
            ))}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-3 text-white">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-green-400 transition-colors group"
            >
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-400 transition-colors">
                <MessageCircle className="w-5 h-5 fill-white text-white" />
              </div>
              <span className="font-bold text-lg">+216 56 614 879</span>
            </a>
            <a
              href="https://instagram.com/growtion7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-purple-400 transition-colors"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(45deg, #f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
                <InstagramIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg italic">growtion7</span>
            </a>
            <a
              href="https://facebook.com/growtion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-blue-400 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <FacebookIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg italic">growtion</span>
            </a>
          </div>

          {/* Main CTA */}
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(124,58,237,0.8)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 text-white font-black text-lg px-8 py-4 rounded-2xl self-start"
            style={{ background: "linear-gradient(135deg, #7C3AED, #9333EA)" }}
          >
            <MessageCircle className="w-6 h-6" />
            BOOSTER MES VENTES
          </motion.a>
        </motion.div>
      </div>

      {/* Tagline bottom */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase opacity-60">
          Sell Smart · Grow Faster
        </p>
      </div>
    </section>
  );
}
