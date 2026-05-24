"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "21656614879";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour Growtion! Je suis intéressé(e) par vos services."
);

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
      style={{
        background: "rgba(13, 11, 43, 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(124,58,237,0.2)",
      }}
    >
      {/* Logo */}
      <a href="#hero" className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Growtion Logo" width={36} height={36} />
        <span
          className="text-xl font-black tracking-widest text-white"
          style={{ fontFamily: "Arial Black, sans-serif" }}
        >
          GROWTION
        </span>
      </a>

      {/* Nav links — hidden on mobile */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
        <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>
        <a href="#resultats" className="hover:text-purple-400 transition-colors">Résultats</a>
        <a href="#portfolio" className="hover:text-purple-400 transition-colors">Portfolio</a>
        <a href="#tarifs" className="hover:text-purple-400 transition-colors">Tarifs</a>
      </nav>

      {/* CTA */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:block">Nous contacter</span>
      </motion.a>
    </motion.header>
  );
}
