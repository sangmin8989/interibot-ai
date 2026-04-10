// 11개 인테비티 스타일 타입 데이터
// 설계서 V2 섹션 2-1 테이블 기반

export interface IntevityType {
  id: string;
  name: string;
  archetype: string;
  oneLiner: string;
  sigColor: string;
  emoji: string;
}

export const INTEVITY_TYPES: IntevityType[] = [
  {
    id: "modern",
    name: "모던",
    archetype: "차가운 도시의 전략가",
    oneLiner: "한 치의 오차도 허용하지 않는 직선의 미학, 당신의 완벽한 요새",
    sigColor: "#2C2C2A",
    emoji: "🏙️",
  },
  {
    id: "minimal",
    name: "미니멀",
    archetype: "고독한 완벽주의 건축가",
    oneLiner: "비우는 행위조차 예술이 되는, 정제된 영혼의 휴식처",
    sigColor: "#F1EFE8",
    emoji: "🤍",
  },
  {
    id: "scandinavian",
    name: "북유럽",
    archetype: "온기를 수집하는 히게 마스터",
    oneLiner: "당신의 공간에 스며든 부드러운 빛과 나무의 따뜻한 위로",
    sigColor: "#E8D5B7",
    emoji: "🕯️",
  },
  {
    id: "classic",
    name: "클래식",
    archetype: "전통의 가치를 지키는 귀족적 품격",
    oneLiner: "세월이 흘러도 변하지 않는 웅장한 서사의 완성",
    sigColor: "#8B6F4E",
    emoji: "👑",
  },
  {
    id: "natural",
    name: "내추럴",
    archetype: "숲의 숨결을 닮은 자유로운 영혼",
    oneLiner: "인위적인 것을 걷어낸 자리에 피어난 흙과 나무의 안식",
    sigColor: "#7A9E7E",
    emoji: "🌿",
  },
  {
    id: "industrial",
    name: "인더스트리얼",
    archetype: "거친 질감 속에 피어난 예술가",
    oneLiner: "가공되지 않은 날것의 매력을 사랑하는 당신만의 아틀리에",
    sigColor: "#5A5A58",
    emoji: "🔩",
  },
  {
    id: "retro",
    name: "레트로",
    archetype: "시간을 걷는 아날로그 탐험가",
    oneLiner: "오래된 것의 가치를 알아보는 당신의 따스한 시선",
    sigColor: "#C4956A",
    emoji: "📻",
  },
  {
    id: "romantic",
    name: "로맨틱",
    archetype: "꿈결 같은 일상을 그리는 시인",
    oneLiner: "매 순간이 영화가 되는, 부드러운 곡선의 로맨스",
    sigColor: "#E8B4B8",
    emoji: "🌸",
  },
  {
    id: "french",
    name: "프렌치",
    archetype: "파리의 낭만을 큐레이팅하는 뮤즈",
    oneLiner: "화려함 속에 감춰진 무심한 시크함, 당신만의 프렌치 시크",
    sigColor: "#D4C4A8",
    emoji: "🗼",
  },
  {
    id: "contemporary",
    name: "컨템포러리",
    archetype: "트렌드 위를 걷는 감각적인 리더",
    oneLiner: "지금 이 순간 가장 빛나는 가치를 알아보는 당신의 안목",
    sigColor: "#3A506B",
    emoji: "✨",
  },
  {
    id: "japandi",
    name: "재팬디",
    archetype: "젠의 평온을 실천하는 명상가",
    oneLiner: "동양의 명상과 서양의 실용이 만나 완성된 고요한 정원",
    sigColor: "#C5B9A8",
    emoji: "🍵",
  },
];

export const INTEVITY_TYPE_MAP = Object.fromEntries(
  INTEVITY_TYPES.map((t) => [t.id, t])
) as Record<string, IntevityType>;
