"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";

const ACCEPTED = {
  estimate: ".jpg,.jpeg,.png,.pdf,.xlsx",
  floorplan: ".jpg,.jpeg,.png,.pdf",
};

interface Props {
  onUploadComplete: (data: {
    estimateFile: File;
    floorplanFile?: File;
    apartmentName?: string;
    areaPy?: number;
    region?: string;
  }) => void;
  isLoading?: boolean;
}

export default function FileUpload({ onUploadComplete, isLoading }: Props) {
  const [estimateFile, setEstimateFile] = useState<File | null>(null);
  const [floorplanFile, setFloorplanFile] = useState<File | null>(null);
  const [apartmentName, setApartmentName] = useState("");
  const [areaPy, setAreaPy] = useState("");
  const [region, setRegion] = useState("");
  const [dragOver, setDragOver] = useState<string | null>(null);
  const estimateRef = useRef<HTMLInputElement>(null);
  const floorplanRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent, type: "estimate" | "floorplan") => {
      e.preventDefault();
      setDragOver(null);
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if (type === "estimate") setEstimateFile(file);
      else setFloorplanFile(file);
    },
    []
  );

  const handleSubmit = () => {
    if (!estimateFile) return;
    onUploadComplete({
      estimateFile,
      floorplanFile: floorplanFile || undefined,
      apartmentName: apartmentName || undefined,
      areaPy: areaPy ? Number(areaPy) : undefined,
      region: region || undefined,
    });
  };

  return (
    <div className="space-y-8">
      {/* Estimate upload */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-800">
          견적서 업로드 <span className="text-red-500">*</span>
        </label>
        <div
          onClick={() => estimateRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver("estimate"); }}
          onDragLeave={() => setDragOver(null)}
          onDrop={(e) => handleDrop(e, "estimate")}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
            dragOver === "estimate"
              ? "border-orange-400 bg-orange-50"
              : estimateFile
              ? "border-orange-300 bg-orange-50/50"
              : "border-gray-300 hover:border-orange-300"
          }`}
        >
          {estimateFile ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="h-6 w-6 text-orange-500" />
              <span className="font-medium text-gray-800">{estimateFile.name}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setEstimateFile(null); }}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-3 text-sm font-medium text-gray-600">
                클릭 또는 드래그하여 견적서를 업로드하세요
              </p>
              <p className="mt-1 text-xs text-gray-400">JPG, PNG, PDF, XLSX 지원</p>
            </>
          )}
        </div>
        <input
          ref={estimateRef}
          type="file"
          className="hidden"
          accept={ACCEPTED.estimate}
          onChange={(e) => e.target.files?.[0] && setEstimateFile(e.target.files[0])}
        />
      </div>

      {/* Floorplan upload */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-800">
          도면 업로드 <span className="text-xs font-normal text-gray-400">(선택)</span>
        </label>
        <div
          onClick={() => floorplanRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver("floorplan"); }}
          onDragLeave={() => setDragOver(null)}
          onDrop={(e) => handleDrop(e, "floorplan")}
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
            dragOver === "floorplan"
              ? "border-orange-400 bg-orange-50"
              : floorplanFile
              ? "border-orange-300 bg-orange-50/50"
              : "border-gray-200 hover:border-orange-300"
          }`}
        >
          {floorplanFile ? (
            <div className="flex items-center justify-center gap-3">
              <ImageIcon className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-800">{floorplanFile.name}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setFloorplanFile(null); }}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <ImageIcon className="mx-auto h-7 w-7 text-gray-300" />
              <p className="mt-2 text-xs text-gray-400">
                도면이 있으면 더 정확한 분석이 가능합니다
              </p>
            </>
          )}
        </div>
        <input
          ref={floorplanRef}
          type="file"
          className="hidden"
          accept={ACCEPTED.floorplan}
          onChange={(e) => e.target.files?.[0] && setFloorplanFile(e.target.files[0])}
        />
      </div>

      {/* Apartment info */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-800">평수</label>
          <input
            type="number"
            placeholder="예: 32"
            value={areaPy}
            onChange={(e) => setAreaPy(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-800">
            아파트명 <span className="text-xs font-normal text-gray-400">(선택)</span>
          </label>
          <input
            type="text"
            placeholder="예: 래미안"
            value={apartmentName}
            onChange={(e) => setApartmentName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-800">
            지역 <span className="text-xs font-normal text-gray-400">(선택)</span>
          </label>
          <input
            type="text"
            placeholder="예: 서울 강남"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm transition focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!estimateFile || isLoading}
        className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
      >
        {isLoading ? "분석 중..." : "견적서 분석 시작"}
      </button>
    </div>
  );
}
