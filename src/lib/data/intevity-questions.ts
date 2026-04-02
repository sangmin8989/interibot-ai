// 성향분석 15축 질문 데이터
// 기존 interibot_v16cs T01~T15 구조 참고, 2026 트렌드 반영 업그레이드
// GPT 호출 없이 순수 rule-based 스코어링

export interface QuestionOption {
  label: string;
  score: number;
}

export interface IntevityQuestion {
  id: string;
  axis: string;
  emoji: string;
  question: string;
  options: QuestionOption[];
}

export const questions: IntevityQuestion[] = [
  {
    id: "T01",
    axis: "공간감각",
    emoji: "🏠",
    question: "집에 들어왔을 때 가장 먼저 눈이 가는 곳은?",
    options: [
      { label: "거실 — 가족이 함께하는 넓은 공간", score: 80 },
      { label: "주방 — 요리하고 대화하는 핵심 공간", score: 65 },
      { label: "침실 — 하루를 마무리하는 나만의 공간", score: 40 },
      { label: "서재 — 집중하고 영감을 얻는 공간", score: 25 },
    ],
  },
  {
    id: "T02",
    axis: "시각민감도",
    emoji: "👁️",
    question: "벽에 작은 스크래치가 생기면?",
    options: [
      { label: "바로 눈에 띄어서 신경 쓰여", score: 90 },
      { label: "가끔 보이긴 하는데 참을 수 있어", score: 55 },
      { label: "살다 보면 그런 거지, 신경 안 써", score: 20 },
    ],
  },
  {
    id: "T03",
    axis: "청각민감도",
    emoji: "🔇",
    question: "윗집이나 옆집 소리, 어느 정도까지 괜찮아?",
    options: [
      { label: "아주 작은 소리도 거슬려 — 방음 필수", score: 90 },
      { label: "생활 소음 정도는 OK", score: 55 },
      { label: "거의 신경 안 쓰는 편", score: 20 },
    ],
  },
  {
    id: "T04",
    axis: "청소성향",
    emoji: "🧹",
    question: "청소는 보통 어떻게 하세요?",
    options: [
      { label: "매일 로봇청소기 + 주 2회 물걸레", score: 85 },
      { label: "주 2~3회 가볍게 청소", score: 55 },
      { label: "필요할 때 한 번에 몰아서", score: 25 },
    ],
  },
  {
    id: "T05",
    axis: "정리정돈습관",
    emoji: "📦",
    question: "집에 물건이 많은 편이세요?",
    options: [
      { label: "많은 편 — 안 보이게 다 넣고 싶어", score: 90 },
      { label: "적당 — 자주 쓰는 건 꺼내두는 편", score: 55 },
      { label: "미니멀 — 물건이 적고 오픈형 좋아", score: 25 },
    ],
  },
  {
    id: "T06",
    axis: "가족구성",
    emoji: "👨‍👩‍👧‍👦",
    question: "함께 사는 가족은?",
    options: [
      { label: "어린 자녀가 있어요 (초등 이하)", score: 90 },
      { label: "자녀가 있어요 (중학생 이상)", score: 70 },
      { label: "부부 또는 커플", score: 50 },
      { label: "혼자 살아요", score: 30 },
    ],
  },
  {
    id: "T07",
    axis: "건강요소",
    emoji: "🌿",
    question: "알레르기나 아토피 등 민감한 분이 계세요?",
    options: [
      { label: "네, 친환경 자재가 꼭 필요해요", score: 90 },
      { label: "심하진 않지만 가능하면 좋은 자재로", score: 55 },
      { label: "특별히 없어요", score: 20 },
    ],
  },
  {
    id: "T08",
    axis: "예산감각",
    emoji: "💰",
    question: "인테리어 예산에 대한 생각은?",
    options: [
      { label: "가성비 — 꼭 필요한 데만 집중 투자", score: 30 },
      { label: "균형 — 적정 수준에서 만족", score: 55 },
      { label: "품질 우선 — 좋은 건 투자할 가치 있어", score: 85 },
    ],
  },
  {
    id: "T09",
    axis: "색감취향",
    emoji: "🎨",
    question: "끌리는 공간 분위기는?",
    options: [
      { label: "화이트/그레이 — 깔끔한 무채색", score: 25 },
      { label: "우드톤 — 따뜻하고 편안한 자연 느낌", score: 55 },
      { label: "다크톤 — 묵직하고 세련된 분위기", score: 75 },
      { label: "컬러 포인트 — 나만의 개성 있는 공간", score: 90 },
    ],
  },
  {
    id: "T10",
    axis: "조명취향",
    emoji: "💡",
    question: "선호하는 조명 분위기는?",
    options: [
      { label: "밝고 환하게 — 전체 조명 위주", score: 25 },
      { label: "은은한 간접 조명 위주", score: 65 },
      { label: "공간마다 다르게 — 레이어드 조명", score: 90 },
    ],
  },
  {
    id: "T11",
    axis: "집사용목적",
    emoji: "🏡",
    question: "이 집에서 얼마나 오래 살 계획이에요?",
    options: [
      { label: "5년 이상 — 오래 살 집이에요", score: 90 },
      { label: "3~5년 — 중기 계획", score: 65 },
      { label: "3년 이내 — 매매/이사 예정", score: 30 },
    ],
  },
  {
    id: "T12",
    axis: "불편요소",
    emoji: "😤",
    question: "지금 집에서 가장 불편한 점은?",
    options: [
      { label: "수납 부족 — 물건 정리가 안 돼", score: 75 },
      { label: "노후 마감 — 벽지/바닥이 많이 낡았어", score: 55 },
      { label: "주방/욕실 — 오래돼서 기능이 떨어져", score: 70 },
      { label: "단열/방음 — 춥거나 시끄러워", score: 90 },
    ],
  },
  {
    id: "T13",
    axis: "활동동선",
    emoji: "🚶",
    question: "집에서 가장 많이 시간을 보내는 곳은?",
    options: [
      { label: "거실 — 대부분 거실에서 생활", score: 80 },
      { label: "각자 방 — 개인 공간이 중요", score: 40 },
      { label: "주방/다이닝 — 먹고 대화하는 게 중심", score: 65 },
    ],
  },
  {
    id: "T14",
    axis: "수면패턴",
    emoji: "😴",
    question: "수면 환경에 대해 어떻게 생각하세요?",
    options: [
      { label: "매우 중요 — 침실 환경이 수면에 큰 영향", score: 90 },
      { label: "기본만 갖춰지면 괜찮아", score: 50 },
      { label: "어디서든 잘 자는 편이에요", score: 20 },
    ],
  },
  {
    id: "T15",
    axis: "취미·라이프스타일",
    emoji: "🎮",
    question: "집에서 주로 뭘 하며 시간을 보내세요?",
    options: [
      { label: "영화/음악 — 홈시어터 감성", score: 80 },
      { label: "요리/베이킹 — 주방이 놀이터", score: 60 },
      { label: "운동/요가 — 홈트 공간이 필요", score: 70 },
      { label: "독서/작업 — 조용하고 집중되는 공간", score: 40 },
    ],
  },
];
