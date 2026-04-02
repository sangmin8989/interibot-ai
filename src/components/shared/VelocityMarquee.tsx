"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function VelocityMarquee({
  children,
  baseVelocity = 1,
  className = "",
}: {
  children: string;
  baseVelocity?: number;
  className?: string;
}) {
  const [velocity, setVelocity] = useState(0);
  const { scrollY } = useScroll();
  const prevScroll = useRef(0);
  const xRef = useRef(0);
  const animRef = useRef<number>(0);
  const innerRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - prevScroll.current;
    prevScroll.current = latest;
    setVelocity(delta);
  });

  useEffect(() => {
    const speed = baseVelocity + Math.abs(velocity) * 0.08;
    const direction = velocity >= 0 ? -1 : 1;

    function animate() {
      xRef.current += speed * direction * 0.5;
      if (innerRef.current) {
        const w = innerRef.current.scrollWidth / 2;
        if (Math.abs(xRef.current) >= w) xRef.current = 0;
        innerRef.current.style.transform = `translateX(${xRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [velocity, baseVelocity]);

  const text = `${children}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`;

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="flex w-max whitespace-nowrap will-change-transform">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
