import { Badge } from "@/components/ui/badge";
import type { Verdict } from "@/types";

const verdictConfig: Record<Verdict, { className: string; label: string }> = {
  PASS: { className: "bg-green-100 text-green-800", label: "PASS" },
  WARN: { className: "bg-yellow-100 text-yellow-800", label: "WARN" },
  BLOCK: { className: "bg-red-100 text-red-800", label: "BLOCK" },
};

export default function RiskBadge({ verdict }: { verdict: Verdict }) {
  const config = verdictConfig[verdict];
  return (
    <Badge variant="secondary" className={config.className}>
      {config.label}
    </Badge>
  );
}
