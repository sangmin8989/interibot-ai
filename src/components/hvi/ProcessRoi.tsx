"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { processName: string; roi: number; amount: number }[];
}

export default function ProcessRoi({ data }: Props) {
  const chartData = data.slice(0, 10).map((d) => ({
    name: d.processName.replace("공사", ""),
    ROI: d.roi,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} layout="vertical" margin={{ left: 60 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
        />
        <YAxis type="category" dataKey="name" width={55} tick={{ fontSize: 12 }} />
        <Tooltip
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any) => [`${value}%`, "ROI"]}
          labelFormatter={(label) => `${label}공사`}
        />
        <Bar
          dataKey="ROI"
          fill="hsl(var(--orange))"
          radius={[0, 4, 4, 0]}
          barSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
