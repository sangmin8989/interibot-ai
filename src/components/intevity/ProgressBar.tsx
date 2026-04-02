"use client";

export default function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-gray-500">
          {current} / {total}
        </span>
        <span className="font-medium text-orange-500">{percent}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
