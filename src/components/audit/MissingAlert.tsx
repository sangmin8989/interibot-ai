import { AlertTriangle } from "lucide-react";

export default function MissingAlert({ processes }: { processes: string[] }) {
  if (processes.length === 0) return null;

  return (
    <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
      <div className="flex items-center gap-2 text-red-800">
        <AlertTriangle className="h-5 w-5" />
        <span className="font-semibold">누락 공정 발견</span>
      </div>
      <p className="mt-2 text-sm text-red-700">
        올수리 기준 필수 공정 중 아래 항목이 견적서에 포함되어 있지 않습니다.
        시공사에 확인이 필요합니다.
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {processes.map((p) => (
          <span
            key={p}
            className="rounded-md bg-red-100 px-2 py-1 text-sm font-medium text-red-800"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
