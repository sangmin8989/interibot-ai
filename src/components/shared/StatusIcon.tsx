import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import type { Verdict } from "@/types";

const icons: Record<Verdict, { icon: typeof CheckCircle; className: string }> = {
  PASS: { icon: CheckCircle, className: "text-green-600" },
  WARN: { icon: AlertTriangle, className: "text-yellow-600" },
  BLOCK: { icon: XCircle, className: "text-red-600" },
};

export default function StatusIcon({
  verdict,
  size = 20,
}: {
  verdict: Verdict;
  size?: number;
}) {
  const { icon: Icon, className } = icons[verdict];
  return <Icon className={className} size={size} />;
}
