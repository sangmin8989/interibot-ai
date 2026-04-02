"use client";

import Link from "next/link";
import type { StyleMatchResult } from "@/lib/data/style-mapping";
import type { ProcessRecommendation } from "@/lib/data/process-weights";

interface Props {
  radarData: { axis: string; value: number }[];
  styleDetails: { primary: StyleMatchResult; secondary?: StyleMatchResult };
  processes: ProcessRecommendation[];
  spacePriority: { space: string; score: number }[];
}

/* ── Paris Edition ── */

function HeroSVG() {
  return (
    <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 left-0 right-0 h-[260px]">
      <defs>
        <linearGradient id="iv-flr" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3a2e24"/><stop offset="100%" stopColor="#2a2018"/></linearGradient>
        <linearGradient id="iv-wl" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1e1e2e"/><stop offset="100%" stopColor="#161622"/></linearGradient>
        <linearGradient id="iv-lamp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D4764B" stopOpacity="0.6"/><stop offset="100%" stopColor="#D4764B" stopOpacity="0"/></linearGradient>
      </defs>
      <rect x="20" y="40" width="380" height="190" rx="2" fill="url(#iv-wl)" opacity="0.7"/>
      <g opacity="0.15"><rect x="25" y="45" width="370" height="3" rx="1" fill="#4a4a5a"/><rect x="25" y="222" width="370" height="3" rx="1" fill="#4a4a5a"/></g>
      <path d="M20,230 L400,230 L400,260 L20,260 Z" fill="url(#iv-flr)" opacity="0.8"/>
      <g opacity="0.1" stroke="#5a4a3a" strokeWidth="0.5">
        {[20,60,100,140,180,220,260,300,340,380].map(x => <line key={x} x1={x} y1="230" x2={x+40} y2="260"/>)}
      </g>
      {/* Window */}
      <rect x="155" y="65" width="110" height="150" rx="1" fill="none" stroke="#3a3a50" strokeWidth="0.5"/>
      <line x1="210" y1="65" x2="210" y2="215" stroke="#3a3a50" strokeWidth="0.3"/>
      <line x1="155" y1="140" x2="265" y2="140" stroke="#3a3a50" strokeWidth="0.3"/>
      <circle cx="204" cy="143" r="2.5" fill="#5a5a6a"/><circle cx="216" cy="143" r="2.5" fill="#5a5a6a"/>
      {/* Sofa */}
      <path d="M45,180 Q45,165 60,165 L130,165 Q145,165 145,180 L145,228 L45,228 Z" fill="#1e1e2a" stroke="#D4764B" strokeWidth="0.6" opacity="0.9"/>
      <rect x="55" y="172" width="35" height="25" rx="2" fill="#2a2a3a"/>
      <rect x="98" y="178" width="35" height="12" rx="2" fill="#2a2a3a"/>
      <rect x="50" y="158" width="90" height="7" rx="3" fill="#D4764B" opacity="0.2"/>
      {/* TV */}
      <rect x="280" y="140" width="95" height="88" rx="2" fill="#1e1e2a" stroke="#3a3a50" strokeWidth="0.5"/>
      <rect x="285" y="145" width="85" height="55" rx="1" fill="#161622"/>
      <ellipse cx="327" cy="172" rx="12" ry="12" fill="none" stroke="#D4764B" strokeWidth="0.5" opacity="0.4"/>
      <ellipse cx="327" cy="172" rx="5" ry="5" fill="#D4764B" opacity="0.15"/>
      {/* Plant */}
      <ellipse cx="335" cy="90" rx="25" ry="35" fill="#1a3a2a" opacity="0.7"/>
      <ellipse cx="330" cy="85" rx="16" ry="24" fill="#2a5a3a" opacity="0.5"/>
      <rect x="333" y="118" width="4" height="22" rx="2" fill="#3a2e24"/>
      {/* Lamps */}
      <line x1="90" y1="50" x2="90" y2="90" stroke="#3a3a4a" strokeWidth="0.5"/>
      <path d="M70,90 Q90,82 110,90" fill="none" stroke="#D4764B" strokeWidth="0.8" opacity="0.7"/>
      <ellipse cx="90" cy="95" rx="25" ry="40" fill="url(#iv-lamp)" opacity="0.5"/>
      <circle cx="90" cy="90" r="2" fill="#D4764B" opacity="0.9"/>
      <line x1="330" y1="50" x2="330" y2="80" stroke="#3a3a4a" strokeWidth="0.5"/>
      <circle cx="330" cy="83" r="8" fill="none" stroke="#D4764B" strokeWidth="0.5" opacity="0.5"/>
      <circle cx="330" cy="83" r="2" fill="#D4764B" opacity="0.6"/>
      {/* Orbs */}
      <circle cx="60" cy="70" r="1.5" fill="#D4764B" style={{ animation: "iv-floatOrb 5s ease infinite" }}/>
      <circle cx="370" cy="60" r="1" fill="#c9956e" style={{ animation: "iv-floatOrb 4s ease 1s infinite" }}/>
      <circle cx="200" cy="50" r="1.2" fill="#D4764B" style={{ animation: "iv-floatOrb 6s ease 2s infinite" }}/>
    </svg>
  );
}

function LatticeSVG() {
  return (
    <svg viewBox="0 0 420 320" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full opacity-[0.08]">
      <g stroke="#D4764B" strokeWidth="0.8" fill="none" opacity="0.6">
        <path d="M0,320 Q105,200 210,80 Q315,200 420,320" style={{ strokeDasharray: 1200, animation: "iv-drawPath 3s ease both" }}/>
        <path d="M40,320 Q145,220 210,120 Q275,220 380,320" style={{ strokeDasharray: 1200, animation: "iv-drawPath 3s ease .2s both" }}/>
        <path d="M80,320 Q170,240 210,160 Q250,240 340,320" style={{ strokeDasharray: 1200, animation: "iv-drawPath 3s ease .4s both" }}/>
        <path d="M120,320 Q180,260 210,200 Q240,260 300,320" style={{ strokeDasharray: 1200, animation: "iv-drawPath 3s ease .6s both" }}/>
        <line x1="0" y1="280" x2="420" y2="280" opacity="0.3"/>
        <line x1="30" y1="240" x2="390" y2="240" opacity="0.2"/>
        <line x1="70" y1="200" x2="350" y2="200" opacity="0.15"/>
      </g>
    </svg>
  );
}

function RadarSVG({ data }: { data: { axis: string; value: number }[] }) {
  // Pentagon radar — 5 axes
  const labels = data.map(d => d.axis);
  const values = data.map(d => d.value / 100);
  const cx = 105, cy = 97, r = 75;
  const angles = values.map((_, i) => (Math.PI * 2 * i) / 5 - Math.PI / 2);
  const polyPts = (scale: number) => angles.map((a, i) => {
    const v = scale;
    return `${cx + Math.cos(a) * r * v},${cy + Math.sin(a) * r * v}`;
  }).join(" ");
  const dataPts = angles.map((a, i) => ({
    x: cx + Math.cos(a) * r * values[i],
    y: cy + Math.sin(a) * r * values[i],
  }));
  const dataPolyPts = dataPts.map(p => `${p.x},${p.y}`).join(" ");
  const labelPos = angles.map(a => ({
    x: cx + Math.cos(a) * (r + 16),
    y: cy + Math.sin(a) * (r + 16),
  }));

  return (
    <svg width="210" height="195" viewBox="0 0 210 195" xmlns="http://www.w3.org/2000/svg">
      <g>
        {[1, 0.66, 0.33].map(s => (
          <polygon key={s} points={polyPts(s)} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.3"/>
        ))}
        {angles.map((a, i) => (
          <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r} stroke="rgba(0,0,0,0.06)" strokeWidth="0.3"/>
        ))}
        <polygon
          points={dataPolyPts}
          fill="#D4764B" fillOpacity="0.1"
          stroke="#D4764B" strokeWidth="1.2" strokeLinejoin="round"
          style={{ strokeDasharray: 600, animation: "iv-drawPath 2s ease .8s both" }}
        />
        {dataPts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#D4764B"
            style={{ animation: `iv-starPop .3s ease ${1.5 + i * 0.15}s both` }}
          />
        ))}
        {labelPos.map((p, i) => (
          <text key={i} x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fill="#6b6b6b" fontFamily="var(--font-sans)">
            {labels[i]}
          </text>
        ))}
      </g>
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span className="text-[13px] tracking-[2px]">
      <span className="text-[#D4764B]">{"★".repeat(count)}</span>
      <span className="text-black/10">{"☆".repeat(5 - count)}</span>
    </span>
  );
}

export default function ProfileResult({ radarData, styleDetails, processes, spacePriority }: Props) {
  // Map priorities to stars (1-5)
  const maxScore = Math.max(...spacePriority.map(s => s.score), 1);
  const priorities = spacePriority.slice(0, 6).map(sp => ({
    ...sp,
    stars: Math.max(1, Math.round((sp.score / maxScore) * 5)),
    pct: Math.round((sp.score / maxScore) * 100),
  }));

  const dotColor = (i: number) => i < 2 ? "#D4764B" : i < 4 ? "#c9956e" : "#e8b896";

  return (
    <div className="mx-auto max-w-[420px]">
      <div className="overflow-hidden rounded-2xl border-[0.5px] border-black/10 bg-white">

        {/* ── Hero ── */}
        <div className="relative h-[320px] overflow-hidden bg-[#0f0f1a]">
          <LatticeSVG />
          <HeroSVG />

          {/* Glows */}
          <div className="pointer-events-none absolute right-[60px] top-[30px] h-[120px] w-[120px] rounded-full bg-[#D4764B] opacity-[0.15] blur-[40px]" style={{ animation: "iv-glowPulse 4s ease infinite" }} />
          <div className="pointer-events-none absolute left-[40px] top-[80px] h-[120px] w-[120px] rounded-full bg-[#c9956e] opacity-[0.1] blur-[40px]" style={{ animation: "iv-glowPulse 4s ease 1.5s infinite" }} />
          <div className="pointer-events-none absolute bottom-[60px] left-1/2 h-[120px] w-[120px] rounded-full bg-[#D4764B] opacity-[0.08] blur-[40px]" style={{ animation: "iv-glowPulse 5s ease 0.8s infinite" }} />

          {/* Badge */}
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border-[0.5px] border-[#D4764B]/20 bg-[#D4764B]/[0.12] px-3 py-1.5 backdrop-blur-lg" style={{ animation: "iv-fadeUp .6s ease both" }}>
            <svg width="12" height="12" viewBox="0 0 12 12"><polygon points="6,0 7.5,4 12,4.5 8.5,7.5 9.5,12 6,9.5 2.5,12 3.5,7.5 0,4.5 4.5,4" fill="#D4764B"/></svg>
            <span className="text-[10px] font-medium uppercase tracking-[1.5px] text-[#e8a87c]">intevity</span>
          </div>

          {/* Title */}
          <div className="absolute bottom-5 left-5 right-5" style={{ animation: "iv-fadeUp .8s ease .2s both" }}>
            <p className="mb-1 text-[11px] font-medium uppercase tracking-[2px] text-[#D4764B]/80">your style</p>
            <h2 className="font-serif text-[28px] font-medium leading-[1.2] text-white">{styleDetails.primary.style}</h2>
            <p className="mt-1.5 text-[13px] leading-[1.5] text-white/55">{styleDetails.primary.description}</p>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-5">

          {/* Tags */}
          <div className="mb-5 flex flex-wrap gap-1.5" style={{ animation: "iv-fadeUp .6s ease .4s both" }}>
            {styleDetails.primary.keywords.map(kw => (
              <span key={kw} className="rounded-full border-[0.5px] border-black/10 bg-[#f5f5f4] px-3 py-1 text-[11px] text-[#6b6b6b]">
                {kw}
              </span>
            ))}
          </div>

          {/* Radar */}
          <div style={{ animation: "iv-fadeUp .6s ease .5s both" }}>
            <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[1.5px] text-[#9a9a9a]">your space DNA</p>
            <div className="flex justify-center">
              <RadarSVG data={radarData} />
            </div>
          </div>

          {/* Priorities */}
          <div style={{ animation: "iv-fadeUp .6s ease .6s both" }}>
            <p className="mb-3.5 text-[11px] font-medium uppercase tracking-[1.5px] text-[#9a9a9a]">priority</p>
            <div className="mb-6">
              {priorities.map((sp, i) => (
                <div key={sp.space} className="flex items-center border-b border-black/[0.06] py-2.5 last:border-none">
                  <div className="mr-3 h-2 w-2 shrink-0 rounded-full" style={{ background: dotColor(i) }} />
                  <span className="flex-1 text-[13px] text-[#1a1a1a]">{sp.space}</span>
                  <Stars count={sp.stars} />
                  <div className="relative ml-3 h-[3px] w-20 overflow-hidden rounded-sm bg-black/[0.06]">
                    <div
                      className="h-full rounded-sm bg-gradient-to-r from-[#c9956e] to-[#D4764B]"
                      style={{ "--tw": `${sp.pct}%`, animation: `iv-revealBar 1.2s ease ${0.8 + i * 0.1}s both` } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended processes */}
          <div className="relative mb-5 overflow-hidden rounded-xl bg-[#f5f5f4] p-5 text-center" style={{ animation: "iv-fadeUp .6s ease .7s both" }}>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#D4764B]/[0.03] to-transparent" style={{ backgroundSize: "200% 100%", animation: "iv-shimmer 3s ease infinite" }} />
            <p className="mb-2 text-[11px] uppercase tracking-[1px] text-[#9a9a9a]">recommended</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {processes.slice(0, 8).map(p => (
                <span key={p.process} className={`rounded-full px-3 py-1 text-[11px] ${
                  p.priority === "필수"
                    ? "bg-[#D4764B] text-white"
                    : p.priority === "권장"
                    ? "border-[0.5px] border-[#D4764B]/20 text-[#D4764B]"
                    : "border-[0.5px] border-black/10 text-[#9a9a9a]"
                }`}>
                  {p.process}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mb-3 flex gap-2" style={{ animation: "iv-fadeUp .6s ease .8s both" }}>
            <Link
              href="/audit"
              className="flex-1 rounded-[10px] bg-[#D4764B] px-4 py-3.5 text-center text-[13px] font-medium tracking-[0.3px] text-white transition-all hover:bg-[#c06a42] active:scale-[0.97]"
            >
              견적서 분석 ↗
            </Link>
            <Link
              href="/hvi"
              className="flex-1 rounded-[10px] border-[0.5px] border-black/10 px-4 py-3.5 text-center text-[13px] font-medium tracking-[0.3px] text-[#1a1a1a] transition-all hover:border-black/20 active:scale-[0.97]"
            >
              집값 분석 ↗
            </Link>
          </div>

          <p className="pb-1 text-center text-[10px] tracking-[0.5px] text-[#9a9a9a]">
            interibot AI · paris edition
          </p>
        </div>
      </div>
    </div>
  );
}
