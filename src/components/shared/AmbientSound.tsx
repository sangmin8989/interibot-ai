"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function AmbientSound() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => { ctxRef.current?.close(); };
  }, []);

  const toggle = () => {
    if (!ctxRef.current) {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.connect(ctx.destination);

      // Soft brown noise — organic, warm
      const bufferSize = 2 * ctx.sampleRate;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (last + 0.02 * white) / 1.02;
        last = data[i];
        data[i] *= 3.5;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      // Bandpass for warmth
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 200;
      filter.Q.value = 0.5;

      source.connect(filter);
      filter.connect(gain);
      source.start();

      ctxRef.current = ctx;
      gainRef.current = gain;
    }

    const gain = gainRef.current!;
    if (on) {
      gain.gain.linearRampToValueAtTime(0, ctxRef.current!.currentTime + 0.5);
    } else {
      ctxRef.current!.resume();
      gain.gain.linearRampToValueAtTime(0.03, ctxRef.current!.currentTime + 0.5);
    }
    setOn(!on);
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-[100] hidden h-8 w-8 items-center justify-center rounded-full border border-black/[0.06] bg-white/80 backdrop-blur-md transition-all hover:border-[#C9A96E]/30 md:flex"
      title={on ? "사운드 끄기" : "앰비언트 사운드"}
    >
      <motion.div
        animate={{ scale: on ? [1, 1.2, 1] : 1 }}
        transition={{ repeat: on ? Infinity : 0, duration: 2 }}
        className="flex items-center justify-center"
      >
        {on ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/25">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        )}
      </motion.div>
    </button>
  );
}
