"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ACCEPTED_TYPES = {
  estimate: [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
  floorplan: ["image/jpeg", "image/png", "application/pdf"],
};

interface UploadedFile {
  file: File;
  type: "estimate" | "floorplan";
  preview?: string;
}

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
  const [estimateFile, setEstimateFile] = useState<UploadedFile | null>(null);
  const [floorplanFile, setFloorplanFile] = useState<UploadedFile | null>(null);
  const [apartmentName, setApartmentName] = useState("");
  const [areaPy, setAreaPy] = useState("");
  const [region, setRegion] = useState("");
  const estimateRef = useRef<HTMLInputElement>(null);
  const floorplanRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent, type: "estimate" | "floorplan") => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (!file) return;
      if (!ACCEPTED_TYPES[type].includes(file.type)) {
        alert(
          type === "estimate"
            ? "JPG, PNG, PDF, XLSX 파일만 업로드 가능합니다."
            : "JPG, PNG, PDF 파일만 업로드 가능합니다."
        );
        return;
      }
      const uploaded: UploadedFile = { file, type };
      if (type === "estimate") setEstimateFile(uploaded);
      else setFloorplanFile(uploaded);
    },
    []
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "estimate" | "floorplan") => {
      const file = e.target.files?.[0];
      if (!file) return;
      const uploaded: UploadedFile = { file, type };
      if (type === "estimate") setEstimateFile(uploaded);
      else setFloorplanFile(uploaded);
    },
    []
  );

  const handleSubmit = () => {
    if (!estimateFile) return;
    onUploadComplete({
      estimateFile: estimateFile.file,
      floorplanFile: floorplanFile?.file,
      apartmentName: apartmentName || undefined,
      areaPy: areaPy ? Number(areaPy) : undefined,
      region: region || undefined,
    });
  };

  return (
    <div className="space-y-6">
      {/* 견적서 업로드 (필수) */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          견적서 업로드 <span className="text-red-500">*</span>
        </label>
        <Card
          className={`cursor-pointer border-2 border-dashed transition-colors ${
            estimateFile ? "border-orange bg-orange/5" : "hover:border-orange/50"
          }`}
          onClick={() => estimateRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "estimate")}
        >
          <CardContent className="flex flex-col items-center gap-2 py-8">
            {estimateFile ? (
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange" />
                <span className="text-sm font-medium">
                  {estimateFile.file.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEstimateFile(null);
                  }}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  클릭 또는 드래그하여 견적서를 업로드하세요
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG, PDF, XLSX 지원
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <input
          ref={estimateRef}
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.pdf,.xlsx"
          onChange={(e) => handleFileSelect(e, "estimate")}
        />
      </div>

      {/* 도면 업로드 (선택) */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          도면 업로드 <span className="text-muted-foreground">(선택)</span>
        </label>
        <Card
          className={`cursor-pointer border-2 border-dashed transition-colors ${
            floorplanFile ? "border-orange bg-orange/5" : "hover:border-orange/50"
          }`}
          onClick={() => floorplanRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "floorplan")}
        >
          <CardContent className="flex flex-col items-center gap-2 py-6">
            {floorplanFile ? (
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-orange" />
                <span className="text-sm font-medium">
                  {floorplanFile.file.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFloorplanFile(null);
                  }}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <>
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  도면이 있으면 더 정확한 분석이 가능합니다
                </p>
              </>
            )}
          </CardContent>
        </Card>
        <input
          ref={floorplanRef}
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(e) => handleFileSelect(e, "floorplan")}
        />
      </div>

      {/* 아파트 정보 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">평수</label>
          <input
            type="number"
            placeholder="예: 32"
            value={areaPy}
            onChange={(e) => setAreaPy(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            아파트명 <span className="text-muted-foreground text-xs">(선택)</span>
          </label>
          <input
            type="text"
            placeholder="예: 래미안"
            value={apartmentName}
            onChange={(e) => setApartmentName(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            지역 <span className="text-muted-foreground text-xs">(선택)</span>
          </label>
          <input
            type="text"
            placeholder="예: 서울 강남"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!estimateFile || isLoading}
        className="w-full bg-orange text-orange-foreground hover:bg-orange/90"
        size="lg"
      >
        {isLoading ? "분석 중..." : "견적서 분석 시작"}
      </Button>
    </div>
  );
}
