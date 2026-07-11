"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Menu, X } from "lucide-react";

const WHATSAPP_NUMBER = "21656614879";
const WHATSAPP_MESSAGE = encodeURIComponent("Bonjour Growtion! Je suis intéressé(e) par vos services.");

const NAV_LINKS = [
  { id: "services", label: "Services" },
  { id: "resultats", label: "Résultats" },
  { id: "portfolio", label: "Portfolio" },
  { id: "tarifs", label: "Tarifs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-40 bg-white"
      style={{ borderBottom: "1px solid #ede9fe", boxShadow: "0 1px 12px rgba(109,40,217,0.06)" }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        <a href="#hero" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/logo.svg" alt="Growtion" width={32} height={32} />
          <span className="text-xl font-black tracking-widest text-gray-900" style={{ fontFamily: "var(--font-display), 'Arial Black', Impact, sans-serif" }}>
            GROWTION
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="hover:text-purple-600 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:block">Nous contacter</span>
          </motion.a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-purple-700"
            style={{ background: "#f5f3ff", border: "1px solid #ede9fe" }}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-white"
            style={{ borderTop: "1px solid #ede9fe" }}
          >
            <ul className="flex flex-col px-6 py-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-bold text-gray-700 hover:text-purple-600 transition-colors"
                    style={{ borderBottom: "1px solid #f5f3ff" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
