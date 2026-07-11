"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;
const WHATSAPP_NUMBER = "21656614879";
const WA_MSG = encodeURIComponent("Bonjour Growtion! Je veux booster mes ventes avec vos créatives.");

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CTA() {
  return (
    <section className="section-light py-24 px-6 relative overflow-hidden"
      style={{ borderTop: "1px solid #ede9fe" }}>

      {/* Decorative blurred circle */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-30 pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, #a855f6, transparent)" }} />

      <div className="max-w-4xl mx-auto relative text-center flex flex-col items-center gap-8">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, ease: EASE }}
          className="animate-float"
        >
          <Image src="/logo.svg" alt="Growtion" width={72} height={72} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="text-purple-600 text-sm font-bold tracking-widest uppercase mb-4">Prêt à passer à l&apos;action?</p>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight" style={{ fontFamily: "var(--font-display), 'Arial Black', Impact, sans-serif" }}>
            TRANSFORME TON{" "}
            <span className="gradient-text">E-COMMERCE</span>
            <br />DÈS AUJOURD&apos;HUI
          </h2>
          <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
            Rejoins plus de 200 clients qui ont scalé leur business avec Growtion. Des créatives qui convertissent.
          </p>
        </motion.div>

        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MSG}`}
          target="_blank" rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
          whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}
          style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)", boxShadow: "0 8px 32px rgba(22,163,74,0.35)" }}
          className="flex items-center gap-3 text-white font-black text-xl px-10 py-5 rounded-2xl animate-pulse-purple"
        >
          <MessageCircle className="w-7 h-7 fill-white" />
          CONTACTER SUR WHATSAPP
          <ArrowRight className="w-6 h-6" />
        </motion.a>

        <p className="text-gray-500 text-sm font-medium">+216 56 614 879</p>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.35, duration: 0.5 }}
          className="flex gap-6 items-center"
        >
          <a href="https://www.instagram.com/growtion_creatives/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors">
            <InstagramIcon className="w-5 h-5" />
            <span className="text-sm font-semibold">growtion_creatives</span>
          </a>
        </motion.div>

        {/* Footer */}
        <div className="w-full pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid #ede9fe" }}>
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Growtion" width={22} height={22} />
            <span className="text-gray-500 text-sm font-black tracking-widest">GROWTION</span>
          </div>
          <p className="text-gray-500 text-xs">Sell Smart · Grow Faster · © 2025 Growtion. Tous droits réservés.</p>
        </div>
      </div>
    </section>
  );
}
