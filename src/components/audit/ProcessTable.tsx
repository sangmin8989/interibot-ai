import type { AuditItem } from "@/types";
import RiskBadge from "./RiskBadge";

function formatWon(amount: number) {
  return `${Math.round(amount / 10000).toLocaleString()}만원`;
}

export default function ProcessTable({ items }: { items: AuditItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="pb-2 pr-2 font-medium">공정</th>
            <th className="pb-2 pr-2 text-right font-medium">내 견적</th>
            <th className="pb-2 pr-2 text-right font-medium">P25</th>
            <th className="pb-2 pr-2 text-right font-medium">P50</th>
            <th className="pb-2 pr-2 text-right font-medium">P75</th>
            <th className="pb-2 text-right font-medium">판정</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.processName} className="border-b last:border-0">
              <td className="py-2 pr-2 font-medium">{item.processName}</td>
              <td className="py-2 pr-2 text-right">{formatWon(item.userAmount)}</td>
              <td className="py-2 pr-2 text-right text-muted-foreground">
                {formatWon(item.p25)}
              </td>
              <td className="py-2 pr-2 text-right text-muted-foreground">
                {formatWon(item.p50)}
              </td>
              <td className="py-2 pr-2 text-right text-muted-foreground">
                {formatWon(item.p75)}
              </td>
              <td className="py-2 text-right">
                <RiskBadge verdict={item.verdict} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
