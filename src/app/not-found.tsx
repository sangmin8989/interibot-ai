import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-muted-foreground">페이지를 찾을 수 없습니다.</p>
      <Link href="/">
        <Button>홈으로 돌아가기</Button>
      </Link>
    </div>
  );
}
