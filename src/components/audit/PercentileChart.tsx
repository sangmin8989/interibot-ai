"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { AuditItem } from "@/types";

export default function PercentileChart({ items }: { items: AuditItem[] }) {
  const data = items.map((item) => ({
    name: item.processName.replace("공사", ""),
    percentile: item.percentile,
    fill:
      item.verdict === "PASS"
        ? "#22c55e"
        : item.verdict === "WARN"
        ? "#eab308"
        : "#ef4444",
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ left: 60 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
        <YAxis type="category" dataKey="name" width={55} tick={{ fontSize: 12 }} />
        <Tooltip
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any) => [`${value}%`, "백분위"]}
          labelFormatter={(label) => `${label}공사`}
        />
        <ReferenceLine x={25} stroke="#22c55e" strokeDasharray="3 3" label="P25" />
        <ReferenceLine x={75} stroke="#eab308" strokeDasharray="3 3" label="P75" />
        <Bar dataKey="percentile" radius={[0, 4, 4, 0]} barSize={20}>
          {data.map((entry, index) => (
            <rect key={index} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
