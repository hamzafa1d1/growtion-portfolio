"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, ArrowRight } from "lucide-react";

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
  "Bonjour Growtion! Je veux booster mes ventes avec vos créatives."
);

export function CTA() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0D0B2B 0%, #1a0a3d 100%)" }}
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }}
      />

      <div className="max-w-4xl mx-auto relative text-center flex flex-col items-center gap-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200 }}
          animate={{ y: [0, -10, 0] }}
          className="animate-float"
        >
          <Image src="/logo.svg" alt="Growtion" width={80} height={80} />
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 text-sm font-bold tracking-widest uppercase mb-4">
            Prêt à passer à l&apos;action?
          </p>
          <h2
            className="text-4xl md:text-6xl font-black text-white leading-tight"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            TRANSFORME TON{" "}
            <span className="gradient-text">E-COMMERCE</span>
            <br />
            DÈS AUJOURD&apos;HUI
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            Rejoins plus de 200 clients qui ont scalé leur business avec Growtion.
            Des créatives qui convertissent — garanti.
          </p>
        </motion.div>

        {/* Main CTA button */}
        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.07, boxShadow: "0 0 60px rgba(34,197,94,0.6)" }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 text-white font-black text-xl px-10 py-5 rounded-2xl"
          style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)" }}
        >
          <MessageCircle className="w-7 h-7 fill-white" />
          CONTACTER SUR WHATSAPP
          <ArrowRight className="w-6 h-6" />
        </motion.a>

        <p className="text-gray-600 text-sm">+216 56 614 879</p>

        {/* Social links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex gap-6 items-center"
        >
          <a
            href="https://instagram.com/growtion7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <InstagramIcon className="w-5 h-5" />
            <span className="text-sm font-semibold">growtion7</span>
          </a>
          <div className="w-1 h-1 rounded-full bg-gray-600" />
          <a
            href="https://facebook.com/growtion"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <FacebookIcon className="w-5 h-5" />
            <span className="text-sm font-semibold">growtion</span>
          </a>
        </motion.div>

        {/* Footer */}
        <div className="border-t border-purple-900/30 w-full pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Growtion" width={24} height={24} />
            <span className="text-gray-500 text-sm font-bold tracking-widest">GROWTION</span>
          </div>
          <p className="text-gray-600 text-xs">
            Sell Smart · Grow Faster · © 2025 Growtion. Tous droits réservés.
          </p>
        </div>
      </div>
    </section>
  );
}
