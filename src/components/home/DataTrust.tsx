export default function DataTrust() {
  const stats = [
    { value: "12만건", label: "시장 데이터" },
    { value: "450건", label: "시공 사례" },
    { value: "출처 기반", label: "객관적 판단" },
  ];

  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 md:flex-row md:justify-center md:gap-16">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-bold text-orange">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
