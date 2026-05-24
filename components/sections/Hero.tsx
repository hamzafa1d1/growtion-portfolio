"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Play, Zap, Layout, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "21656614879";
const WA_MSG = encodeURIComponent("Bonjour Growtion! Je suis intéressé(e) par vos services créatifs.");
const EASE = [0.22, 1, 0.36, 1] as const;

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12.002 1C5.926 1 1 5.925 1 12c0 1.969.512 3.817 1.409 5.428L1 23l5.728-1.386A11.005 11.005 0 0 0 12.002 23C18.077 23 23 18.075 23 12S18.077 1 12.002 1zm0 20.17A9.16 9.16 0 0 1 7.4 19.85l-.33-.195-3.4.823.854-3.307-.214-.341A9.143 9.143 0 0 1 2.83 12c0-5.062 4.12-9.17 9.172-9.17 5.053 0 9.172 4.108 9.172 9.17 0 5.063-4.12 9.17-9.172 9.17z"/>
    </svg>
  );
}

const services = [
  { icon: <Play className="w-6 h-6 text-white" />, label: "VIDÉOS PUB", tag: "Publicité" },
  { icon: <Zap className="w-6 h-6 text-white" />,  label: "UGC", tag: "Influence" },
  { icon: <Layout className="w-6 h-6 text-white" />, label: "LANDING PAGE", tag: "Conversion" },
];

const socials = [
  {
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`,
    label: "+216 56 614 879",
    icon: <WhatsAppIcon />,
    bg: "#25D366",
    hover: "hover:text-green-600",
  },
  {
    href: "https://instagram.com/growtion7",
    label: "growtion7",
    icon: <InstagramIcon />,
    bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
    hover: "hover:text-pink-600",
  },
  {
    href: "https://facebook.com/growtion",
    label: "growtion",
    icon: <FacebookIcon />,
    bg: "#1877f2",
    hover: "hover:text-blue-600",
  },
];

export function Hero() {
  return (
    <section id="hero" className="section-white relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-2/3 h-full"
          style={{ background: "linear-gradient(130deg, transparent 50%, #f5f3ff 100%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: "#a855f6" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full grid md:grid-cols-[1fr_1.1fr] gap-16 items-center py-20">

        {/* ── LEFT: visual cards ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-6"
        >
          {/* Logo + badge */}
          <div className="flex items-center gap-3">
            <div className="animate-float">
              <Image src="/logo.svg" alt="Growtion" width={52} height={52} />
            </div>
            <div>
              <p className="font-black text-gray-900 text-xl tracking-widest" style={{ fontFamily: "Arial Black, sans-serif" }}>GROWTION</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-600 text-xs font-bold">Disponible · Tunisie</span>
              </div>
            </div>
          </div>

          {/* Service cards — staggered Masonry layout */}
          <div className="grid grid-cols-[1.3fr_1fr] gap-3">
            {/* Tall left card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.65, ease: EASE }}
              whileHover={{ y: -8, rotate: -1, transition: { duration: 0.2, ease: "easeOut" } }}
              className="row-span-2 rounded-3xl p-5 flex flex-col justify-between"
              style={{
                background: "linear-gradient(160deg, #8b5cf6 0%, #6d28d9 100%)",
                minHeight: 280,
                boxShadow: "0 12px 32px rgba(109,40,217,0.28)",
                rotate: "-1.5deg",
              }}
            >
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.2)" }}>
                {services[0].icon}
              </div>
              <div>
                <p className="text-purple-200 text-xs font-bold mb-1">{services[0].tag}</p>
                <p className="text-white font-black text-xl leading-tight" style={{ fontFamily: "Arial Black, sans-serif" }}>
                  {services[0].label}
                </p>
              </div>
            </motion.div>

            {/* Top-right card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.65, ease: EASE }}
              whileHover={{ y: -6, rotate: 1, transition: { duration: 0.2, ease: "easeOut" } }}
              className="rounded-3xl p-5 flex flex-col justify-between"
              style={{
                background: "linear-gradient(160deg, #7c3aed 0%, #5b21b6 100%)",
                minHeight: 132,
                boxShadow: "0 8px 24px rgba(109,40,217,0.2)",
                rotate: "2deg",
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.2)" }}>
                {services[1].icon}
              </div>
              <div>
                <p className="text-purple-200 text-xs font-bold mb-0.5">{services[1].tag}</p>
                <p className="text-white font-black text-base leading-tight">{services[1].label}</p>
              </div>
            </motion.div>

            {/* Bottom-right card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.65, ease: EASE }}
              whileHover={{ y: -6, rotate: 1, transition: { duration: 0.2, ease: "easeOut" } }}
              className="rounded-3xl p-5 flex flex-col justify-between"
              style={{
                background: "linear-gradient(160deg, #a855f6 0%, #7c3aed 100%)",
                minHeight: 132,
                boxShadow: "0 8px 24px rgba(168,85,246,0.22)",
                rotate: "1deg",
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.2)" }}>
                {services[2].icon}
              </div>
              <div>
                <p className="text-purple-200 text-xs font-bold mb-0.5">{services[2].tag}</p>
                <p className="text-white font-black text-base leading-tight">{services[2].label}</p>
              </div>
            </motion.div>
          </div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
            className="flex items-center gap-4 px-4 py-3 rounded-2xl"
            style={{ background: "#f5f3ff", border: "1px solid #ede9fe" }}
          >
            <div className="text-center">
              <p className="text-purple-700 font-black text-lg leading-none">200+</p>
              <p className="text-gray-400 text-xs mt-0.5">Clients</p>
            </div>
            <div className="w-px h-8 bg-purple-200" />
            <div className="text-center">
              <p className="text-purple-700 font-black text-lg leading-none">1000+</p>
              <p className="text-gray-400 text-xs mt-0.5">Créations</p>
            </div>
            <div className="w-px h-8 bg-purple-200" />
            <div className="text-center">
              <p className="text-purple-700 font-black text-lg leading-none">44x</p>
              <p className="text-gray-400 text-xs mt-0.5">ROAS record</p>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: headline + CTA ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="flex flex-col gap-8"
        >
          {/* Headline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: EASE }}
              className="text-purple-500 font-bold text-sm tracking-[0.2em] uppercase mb-4"
            >
              Sell Smart · Grow Faster
            </motion.p>
            <h1 className="font-black leading-[1.08] text-gray-900"
              style={{ fontFamily: "Arial Black, Impact, sans-serif", fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>
              DES CRÉATIVES QUI{" "}
              <span className="gradient-text">TRANSFORMENT</span>
              <br />LE SCROLL EN{" "}
              <span style={{ color: "#7c3aed" }}>ACHAT</span>
            </h1>
            <p className="text-gray-500 text-base mt-5 leading-relaxed max-w-md">
              Vidéos publicitaires, UGC et landing pages qui convertissent — livrées vite, conçues pour scaler.
            </p>
          </div>

          {/* Primary CTA */}
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`}
            target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 text-white font-black text-xl px-9 py-5 rounded-2xl self-start animate-pulse-purple"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
              boxShadow: "0 8px 28px rgba(109,40,217,0.35)",
            }}
          >
            <MessageCircle className="w-6 h-6" />
            BOOSTER MES VENTES
            <ArrowRight className="w-5 h-5" />
          </motion.a>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-purple-100" />
            <span className="text-gray-300 text-xs font-semibold">nous suivre</span>
            <div className="flex-1 h-px bg-purple-100" />
          </div>

          {/* Social links — compact single row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
            className="flex flex-wrap gap-3"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 ${s.hover} transition-all hover:shadow-md`}
                style={{ background: "#f5f3ff", border: "1px solid #ede9fe" }}
              >
                <span
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: s.bg }}
                >
                  {s.icon}
                </span>
                {s.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
