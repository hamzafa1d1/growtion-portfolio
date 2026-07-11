"use client";
import { MotionConfig } from "framer-motion";

/**
 * Makes all framer-motion animations honor the OS "reduce motion" setting.
 * With reducedMotion="user", transform/layout animations are disabled for those
 * users (opacity fades are kept), complementing the CSS rule in globals.css that
 * neutralizes plain CSS keyframe animations.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
