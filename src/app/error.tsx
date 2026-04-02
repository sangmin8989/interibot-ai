"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h2 className="text-2xl font-bold">문제가 발생했습니다</h2>
      <p className="text-center text-muted-foreground">
        {error.message || "예상치 못한 오류가 발생했습니다. 다시 시도해주세요."}
      </p>
      <Button onClick={reset} variant="outline">
        다시 시도
      </Button>
    </div>
  );
}
