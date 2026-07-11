"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "21656614879";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour Growtion! Je suis intéressé(e) par vos services."
);

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white rounded-full w-14 h-14 sm:w-auto sm:h-auto sm:px-5 sm:py-3.5"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      style={{ boxShadow: "0 8px 30px rgba(34,197,94,0.45)" }}
    >
      <MessageCircle className="w-6 h-6 sm:w-5 sm:h-5 fill-white" />
      <span className="font-bold text-sm hidden sm:block">WhatsApp</span>
    </motion.a>
  );
}
