"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 20, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 20, stiffness: 200 });
  const isTouchRef = useRef(false);

  useEffect(() => {
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
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Outer ring — bigger, more visible */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1.5px solid rgba(201,169,110,0.6)",
        }}
        animate={{
          width: hovered ? 56 : 36,
          height: hovered ? 56 : 36,
          opacity: hidden ? 0 : 1,
          borderColor: hovered
            ? "rgba(201,169,110,0.8)"
            : "rgba(201,169,110,0.6)",
          boxShadow: hovered
            ? "0 0 20px 4px rgba(201,169,110,0.15)"
            : "0 0 10px 2px rgba(201,169,110,0.06)",
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Inner dot — larger, fully opaque */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "#C9A96E",
        }}
        animate={{
          width: hovered ? 8 : 5,
          height: hovered ? 8 : 5,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
