"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 250 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 250 });
  const isTouchRef = useRef(false);

  useEffect(() => {
    // Don't show custom cursor on touch devices
    const checkTouch = () => { isTouchRef.current = true; };
    window.addEventListener("touchstart", checkTouch, { once: true });

    const move = (e: MouseEvent) => {
      if (isTouchRef.current) return;
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setHovered(true);
      }
    };
    const handleOut = () => setHovered(false);
    const handleLeave = () => setHidden(true);
    const handleEnter = () => setHidden(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    window.addEventListener("mouseout", handleOut, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full border border-[#C9A96E]/30 md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 48 : 28,
          height: hovered ? 48 : 28,
          opacity: hidden ? 0 : 1,
          borderColor: hovered ? "rgba(201,169,110,0.5)" : "rgba(201,169,110,0.3)",
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full bg-[#C9A96E] md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 6 : 4,
          height: hovered ? 6 : 4,
          opacity: hidden ? 0 : 0.7,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
