"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "21656614879";
const WHATSAPP_MESSAGE = encodeURIComponent("Bonjour Growtion! Je suis intéressé(e) par vos services.");

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 bg-white"
      style={{ borderBottom: "1px solid #ede9fe", boxShadow: "0 1px 12px rgba(109,40,217,0.06)" }}
    >
      <a href="#hero" className="flex items-center gap-2.5">
        <Image src="/logo.svg" alt="Growtion" width={32} height={32} />
        <span className="text-xl font-black tracking-widest text-gray-900" style={{ fontFamily: "Arial Black, sans-serif" }}>
          GROWTION
        </span>
      </a>

      <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
        {["services","resultats","portfolio","tarifs"].map((id) => (
          <a key={id} href={`#${id}`}
            className="hover:text-purple-600 transition-colors capitalize">
            {id === "resultats" ? "Résultats" : id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </nav>

      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
        target="_blank" rel="noopener noreferrer"
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:block">Nous contacter</span>
      </motion.a>
    </motion.header>
  );
}
