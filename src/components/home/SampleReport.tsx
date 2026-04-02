import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SampleReport() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h2 className="mb-2 text-center text-2xl font-bold">
        견적서 올리면 이런 걸 알 수 있어요
      </h2>
      <p className="mb-8 text-center text-muted-foreground">
        실제 감사 리포트 미리보기
      </p>
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg">감사 리포트 예시</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-medium">목공사</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">820만원</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                PASS
              </Badge>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-medium">타일공사</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">650만원</span>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                WARN
              </Badge>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <span className="font-medium">전기공사</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">380만원</span>
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                BLOCK
              </Badge>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            * 박목수 66건 기준 | 시장 450건 기준
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
