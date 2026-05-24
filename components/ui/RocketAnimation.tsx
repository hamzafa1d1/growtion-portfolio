"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function RocketAnimation() {
  const { scrollYProgress } = useScroll();

  // Spring-smooth so movement feels physical, not mechanical
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 20, restDelta: 0.001 });

  const y       = useTransform(smooth, [0, 1], ["84vh", "-18vh"]);
  const wobbleX = useTransform(smooth, [0, 0.25, 0.5, 0.75, 1], [0, 5, -4, 5, -3]);
  const opacity = useTransform(smooth, [0, 0.04, 0.93, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-5 z-[5] pointer-events-none select-none hidden xl:flex flex-col items-center"
      style={{ top: 0, y, x: wobbleX, opacity }}
    >
      {/* Smoke trail — grows bigger further from the rocket */}
      <div className="flex flex-col items-center gap-2 mb-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: 5 + i * 3,
              height: 5 + i * 3,
              background: `rgba(139, 92, 246, ${0.22 - i * 0.04})`,
            }}
            animate={{
              scale:   [1, 1.7, 1],
              opacity: [0.22 - i * 0.04, 0.05, 0.22 - i * 0.04],
            }}
            transition={{
              duration: 1.1 + i * 0.18,
              repeat: Infinity,
              delay: i * 0.13,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Rocket SVG */}
      <svg width="46" height="88" viewBox="0 0 46 88" fill="none">
        <defs>
          <linearGradient id="rk-body" x1="23" y1="2" x2="23" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#f5f3ff"/>
            <stop offset="100%" stopColor="#ddd6fe"/>
          </linearGradient>
          <linearGradient id="rk-flame" x1="23" y1="71" x2="23" y2="92" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#fde68a"/>
            <stop offset="35%"  stopColor="#f97316"/>
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Outer flame — flickers */}
        <motion.ellipse cx="23" cy="80" rx="7" ry="10" fill="url(#rk-flame)"
          animate={{ ry: [8, 13, 9, 12, 8], rx: [7, 5, 8, 5, 7] }}
          transition={{ duration: 0.38, repeat: Infinity, ease: "linear" }} />
        {/* Inner bright core */}
        <motion.ellipse cx="23" cy="76" rx="3.5" ry="5.5" fill="#fef9c3"
          animate={{ ry: [4, 7, 4.5, 6, 4] }}
          transition={{ duration: 0.26, repeat: Infinity, ease: "linear" }} />

        {/* Body */}
        <path d="M23 3C29 3 39 20 39 50L23 58L7 50C7 20 17 3 23 3Z"
          fill="url(#rk-body)" stroke="#7c3aed" strokeWidth="1.5"/>

        {/* Highlight sheen */}
        <path d="M23 3C27 3 35 17 37 35C32 24 14 24 9 35C11 17 19 3 23 3Z"
          fill="#7c3aed" opacity="0.08"/>

        {/* Porthole */}
        <circle cx="23" cy="32" r="8"  fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5"/>
        <circle cx="23" cy="32" r="5"  fill="#7c3aed" opacity="0.55"/>
        <circle cx="21" cy="30" r="2"  fill="white"   opacity="0.65"/>

        {/* Fins */}
        <path d="M7 48L0 68L14 58Z"   fill="#7c3aed" opacity="0.82"/>
        <path d="M39 48L46 68L32 58Z" fill="#7c3aed" opacity="0.82"/>

        {/* Engine nozzle */}
        <rect x="16" y="57" width="14" height="8" rx="3" fill="#5b21b6"/>
      </svg>
    </motion.div>
  );
}
