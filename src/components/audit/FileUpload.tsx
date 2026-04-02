"use client";

import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";

/* Hermès: form as ritual. Each input earns its space. */

interface Props {
  onUploadComplete: (data: { estimateFile: File; floorplanFile?: File; apartmentName?: string; areaPy?: number; region?: string }) => void;
  isLoading?: boolean;
}

export default function FileUpload({ onUploadComplete, isLoading }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [floorplan, setFloorplan] = useState<File | null>(null);
  const [areaPy, setAreaPy] = useState("");
  const [apartment, setApartment] = useState("");
  const [region, setRegion] = useState("");
  const [drag, setDrag] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const fpRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-10">
      {/* Main upload */}
      <div>
        <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/25">견적서</p>
        <div
          onClick={() => ref.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) setFile(f); }}
          className={`mt-4 cursor-pointer border py-16 text-center transition-all duration-500 ${
            drag ? "border-[#C9A96E]/30 bg-[#C9A96E]/[0.02]" : file ? "border-[#1A1A1A]/10" : "border-[#1A1A1A]/[0.06] hover:border-[#1A1A1A]/10"
          }`}
        >
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <span className="text-[13px] text-[#1A1A1A]/60">{file.name}</span>
              <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="text-[#1A1A1A]/20 hover:text-[#1A1A1A]/40">
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-5 w-5 text-[#1A1A1A]/15" />
              <p className="mt-3 text-[13px] text-[#1A1A1A]/30">클릭 또는 드래그</p>
              <p className="mt-1 text-[10px] text-[#1A1A1A]/15">JPG · PNG · PDF · XLSX</p>
            </>
          )}
        </div>
        <input ref={ref} type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf,.xlsx" onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])} />
      </div>

      {/* Floorplan */}
      <div>
        <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/25">도면 <span className="text-[#1A1A1A]/10">(선택)</span></p>
        <div
          onClick={() => fpRef.current?.click()}
          className="mt-4 cursor-pointer border border-[#1A1A1A]/[0.04] py-8 text-center transition hover:border-[#1A1A1A]/[0.08]"
        >
          {floorplan ? (
            <div className="flex items-center justify-center gap-3">
              <span className="text-[12px] text-[#1A1A1A]/40">{floorplan.name}</span>
              <button onClick={(e) => { e.stopPropagation(); setFloorplan(null); }}><X className="h-3 w-3 text-[#1A1A1A]/15" /></button>
            </div>
          ) : (
            <p className="text-[11px] text-[#1A1A1A]/15">도면이 있으면 정밀 분석이 가능합니다</p>
          )}
        </div>
        <input ref={fpRef} type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => e.target.files?.[0] && setFloorplan(e.target.files[0])} />
      </div>

      {/* Info */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "평수", value: areaPy, set: setAreaPy, placeholder: "32", type: "number" as const },
          { label: "아파트명", value: apartment, set: setApartment, placeholder: "래미안", type: "text" as const },
          { label: "지역", value: region, set: setRegion, placeholder: "서울", type: "text" as const },
        ].map((f) => (
          <div key={f.label}>
            <p className="text-[10px] tracking-[0.3em] text-[#1A1A1A]/25">{f.label}</p>
            <input
              type={f.type}
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              placeholder={f.placeholder}
              className="mt-3 w-full border-b border-[#1A1A1A]/[0.06] bg-transparent pb-2 text-[14px] text-[#1A1A1A] outline-none transition-colors focus:border-[#1A1A1A]/20"
            />
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={() => file && onUploadComplete({ estimateFile: file, floorplanFile: floorplan || undefined, apartmentName: apartment || undefined, areaPy: areaPy ? Number(areaPy) : undefined, region: region || undefined })}
        disabled={!file || isLoading}
        className="w-full border-b border-[#1A1A1A] pb-1 text-center text-[13px] font-medium text-[#1A1A1A] transition-all duration-500 hover:border-[#C9A96E] hover:text-[#C9A96E] disabled:border-[#1A1A1A]/10 disabled:text-[#1A1A1A]/20"
      >
        {isLoading ? "분석 중..." : "분석하기"}
      </button>
    </div>
  );
}
