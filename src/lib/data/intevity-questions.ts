// 인테비티 7탭 플로우 질문 데이터
// 기존 15문항 고정 설문 → 7탭 인터랙티브 플로우로 전환
// 설계서 V2 섹션 1 기반

// ── 탭 타입 정의 ──

export type TabType =
  | "swipe"
  | "card-select"
  | "slider"
  | "multi-select"
  | "image-grid";

export interface TabStep {
  id: number;
  title: string;
  subtitle?: string;
  type: TabType;
  data: MbtiData | CardSelectData | SliderData | MultiSelectData | ImageGridData;
}

// ── 탭1: MBTI 스와이프 ──

export interface MbtiPair {
  dimension: string; // E/I, S/N, T/F, J/P
  left: { label: string; value: string; image?: string };
  right: { label: string; value: string; image?: string };
}

export interface MbtiData {
  pairs: MbtiPair[];
}

// ── 탭2, 탭6: 카드 선택 ──

export interface CardOption {
  id: string;
  label: string;
  subtitle?: string;
  description?: string;
  emoji?: string;
  image?: string;
}

export interface CardSelectData {
  options: CardOption[];
  layout: "horizontal" | "vertical";
}

// ── 탭3: 슬라이더 ──

export interface SliderData {
  min: number;
  max: number;
  defaultValue: number;
  unit: string;
  label: string;
  hapticThreshold?: number;
}

// ── 탭4: 멀티 선택 ──

export interface MultiSelectOption {
  id: string;
  label: string;
  emoji: string;
}

export interface MultiSelectData {
  options: MultiSelectOption[];
  minSelect: number;
  maxSelect?: number;
}

// ── 탭5, 탭7: 이미지 그리드 ──

export interface ImageGridOption {
  id: string;
  label?: string;
  image: string;
}

export interface ImageGridData {
  options: ImageGridOption[];
  maxSelect: number;
  showLabel: boolean;
}

// ── 7탭 데이터 ──

export const tabs: TabStep[] = [
  // 탭1: MBTI — 4단계 양자택일 카드 스와이프
  {
    id: 1,
    title: "당신의 취향 DNA",
    subtitle: "끌리는 쪽을 골라주세요",
    type: "swipe",
    data: {
      pairs: [
        {
          dimension: "EI",
          left: {
            label: "조용한 나만의 공간",
            value: "I",
            image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80",
          },
          right: {
            label: "사람이 모이는 거실",
            value: "E",
            image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
          },
        },
        {
          dimension: "SN",
          left: {
            label: "정돈된 실용적 공간",
            value: "S",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
          },
          right: {
            label: "감각적인 분위기",
            value: "N",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
          },
        },
        {
          dimension: "TF",
          left: {
            label: "효율적인 구조",
            value: "T",
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
          },
          right: {
            label: "따뜻한 감성",
            value: "F",
            image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
          },
        },
        {
          dimension: "JP",
          left: {
            label: "계획된 일상",
            value: "J",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
          },
          right: {
            label: "자유로운 흐름",
            value: "P",
            image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80",
          },
        },
      ],
    } satisfies MbtiData,
  },

  // 탭2: 혈액형 — 4개 카드 중 1개 선택
  {
    id: 2,
    title: "혈액형이 말하는 당신",
    type: "card-select",
    data: {
      options: [
        {
          id: "A",
          label: "A형",
          subtitle: "꼼꼼한 큐레이터",
        },
        {
          id: "B",
          label: "B형",
          subtitle: "자유로운 탐험가",
        },
        {
          id: "O",
          label: "O형",
          subtitle: "실용적인 리더",
        },
        {
          id: "AB",
          label: "AB형",
          subtitle: "감각적인 예술가",
        },
      ],
      layout: "horizontal",
    } satisfies CardSelectData,
  },

  // 탭3: 아파트 평수 — 골든 햅틱 다이얼 슬라이더
  {
    id: 3,
    title: "얼마의 공간에 가치를 담으시겠습니까?",
    type: "slider",
    data: {
      min: 15,
      max: 55,
      defaultValue: 32,
      unit: "평",
      label: "평",
      hapticThreshold: 40,
    } satisfies SliderData,
  },

  // 탭4: 가족 구성 — 멀티 선택
  {
    id: 4,
    title: "함께 사는 가족을 알려주세요",
    type: "multi-select",
    data: {
      options: [
        { id: "alone", label: "혼자", emoji: "👤" },
        { id: "spouse", label: "배우자", emoji: "👫" },
        { id: "child", label: "자녀", emoji: "👶" },
        { id: "pet", label: "반려동물", emoji: "🐕" },
        { id: "parent", label: "부모님", emoji: "👴" },
      ],
      minSelect: 1,
    } satisfies MultiSelectData,
  },

  // 탭5: 가장 불편한 점 — 2x2 이미지 그리드 (최대 2개)
  {
    id: 5,
    title: "지금 집에서 가장 불편한 점은?",
    subtitle: "최대 2개까지 선택할 수 있어요",
    type: "image-grid",
    data: {
      options: [
        {
          id: "storage",
          label: "수납 부족",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
        },
        {
          id: "noise",
          label: "소음 문제",
          image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&q=80",
        },
        {
          id: "lighting",
          label: "조명 어두움",
          image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
        },
        {
          id: "flow",
          label: "동선 불편",
          image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
        },
      ],
      maxSelect: 2,
      showLabel: true,
    } satisfies ImageGridData,
  },

  // 탭6: 예산 — 가치 프레이밍 3단계 카드
  {
    id: 6,
    title: "어떤 가치를 추구하세요?",
    type: "card-select",
    data: {
      options: [
        {
          id: "smart",
          emoji: "🌱",
          label: "스마트한 가치 투자",
          subtitle: "1,500만 ~ 3,000만원",
          description: "꼭 필요한 것에 현명하게",
        },
        {
          id: "balanced",
          emoji: "⚖️",
          label: "균형 잡힌 라이프 업그레이드",
          subtitle: "3,000만 ~ 5,000만원",
          description: "일상이 달라지는 경험",
        },
        {
          id: "premium",
          emoji: "✨",
          label: "프리미엄 라이프스타일 완성",
          subtitle: "5,000만원 이상",
          description: "타협 없는 나만의 공간",
        },
      ],
      layout: "vertical",
    } satisfies CardSelectData,
  },

  // 탭7: 끌리는 분위기 — 2x2 이미지 (텍스트 없음, 1개 선택)
  {
    id: 7,
    title: "어떤 공간에서 가장 편안하세요?",
    type: "image-grid",
    data: {
      options: [
        {
          id: "mood-modern",
          image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=600&q=80",
        },
        {
          id: "mood-natural",
          image: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&q=80",
        },
        {
          id: "mood-classic",
          image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=600&q=80",
        },
        {
          id: "mood-japandi",
          image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80",
        },
      ],
      maxSelect: 1,
      showLabel: false,
    } satisfies ImageGridData,
  },
];

// ── 기존 15문항 데이터 (deprecated — 보존) ──

/*
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
  { id: "T01", axis: "공간감각", emoji: "🏠", question: "집에 들어왔을 때 가장 먼저 눈이 가는 곳은?", options: [{ label: "거실 — 가족이 함께하는 넓은 공간", score: 80 }, { label: "주방 — 요리하고 대화하는 핵심 공간", score: 65 }, { label: "침실 — 하루를 마무리하는 나만의 공간", score: 40 }, { label: "서재 — 집중하고 영감을 얻는 공간", score: 25 }] },
  { id: "T02", axis: "시각민감도", emoji: "👁️", question: "벽에 작은 스크래치가 생기면?", options: [{ label: "바로 눈에 띄어서 신경 쓰여", score: 90 }, { label: "가끔 보이긴 하는데 참을 수 있어", score: 55 }, { label: "살다 보면 그런 거지, 신경 안 써", score: 20 }] },
  { id: "T03", axis: "청각민감도", emoji: "🔇", question: "윗집이나 옆집 소리, 어느 정도까지 괜찮아?", options: [{ label: "아주 작은 소리도 거슬려 — 방음 필수", score: 90 }, { label: "생활 소음 정도는 OK", score: 55 }, { label: "거의 신경 안 쓰는 편", score: 20 }] },
  { id: "T04", axis: "청소성향", emoji: "🧹", question: "청소는 보통 어떻게 하세요?", options: [{ label: "매일 로봇청소기 + 주 2회 물걸레", score: 85 }, { label: "주 2~3회 가볍게 청소", score: 55 }, { label: "필요할 때 한 번에 몰아서", score: 25 }] },
  { id: "T05", axis: "정리정돈습관", emoji: "📦", question: "집에 물건이 많은 편이세요?", options: [{ label: "많은 편 — 안 보이게 다 넣고 싶어", score: 90 }, { label: "적당 — 자주 쓰는 건 꺼내두는 편", score: 55 }, { label: "미니멀 — 물건이 적고 오픈형 좋아", score: 25 }] },
  { id: "T06", axis: "가족구성", emoji: "👨‍👩‍👧‍👦", question: "함께 사는 가족은?", options: [{ label: "어린 자녀가 있어요 (초등 이하)", score: 90 }, { label: "자녀가 있어요 (중학생 이상)", score: 70 }, { label: "부부 또는 커플", score: 50 }, { label: "혼자 살아요", score: 30 }] },
  { id: "T07", axis: "건강요소", emoji: "🌿", question: "알레르기나 아토피 등 민감한 분이 계세요?", options: [{ label: "네, 친환경 자재가 꼭 필요해요", score: 90 }, { label: "심하진 않지만 가능하면 좋은 자재로", score: 55 }, { label: "특별히 없어요", score: 20 }] },
  { id: "T08", axis: "예산감각", emoji: "💰", question: "인테리어 예산에 대한 생각은?", options: [{ label: "가성비 — 꼭 필요한 데만 집중 투자", score: 30 }, { label: "균형 — 적정 수준에서 만족", score: 55 }, { label: "품질 우선 — 좋은 건 투자할 가치 있어", score: 85 }] },
  { id: "T09", axis: "색감취향", emoji: "🎨", question: "끌리는 공간 분위기는?", options: [{ label: "화이트/그레이 — 깔끔한 무채색", score: 25 }, { label: "우드톤 — 따뜻하고 편안한 자연 느낌", score: 55 }, { label: "다크톤 — 묵직하고 세련된 분위기", score: 75 }, { label: "컬러 포인트 — 나만의 개성 있는 공간", score: 90 }] },
  { id: "T10", axis: "조명취향", emoji: "💡", question: "선호하는 조명 분위기는?", options: [{ label: "밝고 환하게 — 전체 조명 위주", score: 25 }, { label: "은은한 간접 조명 위주", score: 65 }, { label: "공간마다 다르게 — 레이어드 조명", score: 90 }] },
  { id: "T11", axis: "집사용목적", emoji: "🏡", question: "이 집에서 얼마나 오래 살 계획이에요?", options: [{ label: "5년 이상 — 오래 살 집이에요", score: 90 }, { label: "3~5년 — 중기 계획", score: 65 }, { label: "3년 이내 — 매매/이사 예정", score: 30 }] },
  { id: "T12", axis: "불편요소", emoji: "😤", question: "지금 집에서 가장 불편한 점은?", options: [{ label: "수납 부족 — 물건 정리가 안 돼", score: 75 }, { label: "노후 마감 — 벽지/바닥이 많이 낡았어", score: 55 }, { label: "주방/욕실 — 오래돼서 기능이 떨어져", score: 70 }, { label: "단열/방음 — 춥거나 시끄러워", score: 90 }] },
  { id: "T13", axis: "활동동선", emoji: "🚶", question: "집에서 가장 많이 시간을 보내는 곳은?", options: [{ label: "거실 — 대부분 거실에서 생활", score: 80 }, { label: "각자 방 — 개인 공간이 중요", score: 40 }, { label: "주방/다이닝 — 먹고 대화하는 게 중심", score: 65 }] },
  { id: "T14", axis: "수면패턴", emoji: "😴", question: "수면 환경에 대해 어떻게 생각하세요?", options: [{ label: "매우 중요 — 침실 환경이 수면에 큰 영향", score: 90 }, { label: "기본만 갖춰지면 괜찮아", score: 50 }, { label: "어디서든 잘 자는 편이에요", score: 20 }] },
  { id: "T15", axis: "취미·라이프스타일", emoji: "🎮", question: "집에서 주로 뭘 하며 시간을 보내세요?", options: [{ label: "영화/음악 — 홈시어터 감성", score: 80 }, { label: "요리/베이킹 — 주방이 놀이터", score: 60 }, { label: "운동/요가 — 홈트 공간이 필요", score: 70 }, { label: "독서/작업 — 조용하고 집중되는 공간", score: 40 }] },
];
*/
