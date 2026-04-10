export const MATERIALS: Record<
  string,
  Array<{
    name: string;
    brand: string;
    description: string;
    imageUrl: string;
    link: string;
  }>
> = {
  modern: [
    {
      name: "하이그로시 화이트 싱크대 상판",
      brand: "LG Z:IN",
      description:
        "매끈한 유광 마감으로 모던 주방의 핵심. 스크래치 방지 코팅으로 관리가 편리합니다.",
      imageUrl: "/intevity/materials/modern-0.jpg",
      link: "",
    },
    {
      name: "매트 그레이 광폭 마루",
      brand: "한샘",
      description:
        "8mm 두께의 광폭 마루로 넓은 공간감을 연출합니다. 생활 스크래치에 강한 표면 처리.",
      imageUrl: "/intevity/materials/modern-1.jpg",
      link: "",
    },
    {
      name: "스마트 LED 매입 다운라이트",
      brand: "필립스",
      description:
        "색온도 조절과 디밍 기능을 갖춘 매입등. 앱으로 장면별 조명 설정이 가능합니다.",
      imageUrl: "/intevity/materials/modern-2.jpg",
      link: "",
    },
  ],
  minimal: [
    {
      name: "순백 무광 도어 시스템",
      brand: "한샘",
      description:
        "핸들리스 푸시 오픈 방식으로 깔끔한 라인을 유지합니다. 지문 방지 코팅 적용.",
      imageUrl: "/intevity/materials/minimal-0.jpg",
      link: "",
    },
    {
      name: "화이트 오크 헤링본 마루",
      brand: "LG Z:IN",
      description:
        "미니멀 공간에 은은한 따뜻함을 더하는 헤링본 패턴. E0 등급 친환경 자재.",
      imageUrl: "/intevity/materials/minimal-1.jpg",
      link: "",
    },
    {
      name: "빌트인 매립형 수납장",
      brand: "현대리바트",
      description:
        "벽면과 일체감을 주는 매립형 설계. 내부 칸막이 조절로 맞춤 수납이 가능합니다.",
      imageUrl: "/intevity/materials/minimal-2.jpg",
      link: "",
    },
  ],
  scandinavian: [
    {
      name: "자작나무 원목 사이드 테이블",
      brand: "이케아",
      description:
        "밝은 자작나무 톤이 공간에 따뜻함을 더합니다. 가볍고 이동이 편리한 디자인.",
      imageUrl: "/intevity/materials/scandinavian-0.jpg",
      link: "",
    },
    {
      name: "내추럴 린넨 커튼",
      brand: "한샘",
      description:
        "자연광을 부드럽게 필터링하는 린넨 소재. 세탁 후에도 형태가 유지됩니다.",
      imageUrl: "/intevity/materials/scandinavian-1.jpg",
      link: "",
    },
    {
      name: "웜화이트 벽지 (코튼 텍스처)",
      brand: "LG Z:IN",
      description:
        "미세한 코튼 질감으로 포근한 분위기를 연출합니다. 통기성이 좋아 결로 방지에 효과적.",
      imageUrl: "/intevity/materials/scandinavian-2.jpg",
      link: "",
    },
  ],
  natural: [
    {
      name: "애쉬 원목 거실장",
      brand: "현대리바트",
      description:
        "자연 그대로의 나뭇결을 살린 애쉬 원목. 오일 마감으로 따뜻한 촉감을 느낄 수 있습니다.",
      imageUrl: "/intevity/materials/natural-0.jpg",
      link: "",
    },
    {
      name: "테라코타 타일 (300x300)",
      brand: "삼화타일",
      description:
        "흙의 질감을 담은 핸드메이드 느낌의 타일. 현관이나 베란다에 자연스러운 포인트를 줍니다.",
      imageUrl: "/intevity/materials/natural-1.jpg",
      link: "",
    },
    {
      name: "황마 러그 (내추럴 위빙)",
      brand: "이케아",
      description:
        "천연 황마 소재로 바닥에 자연의 온기를 더합니다. 먼지가 적어 관리가 편합니다.",
      imageUrl: "/intevity/materials/natural-2.jpg",
      link: "",
    },
  ],
  japandi: [
    {
      name: "월넛 무광 식탁",
      brand: "한샘",
      description:
        "절제된 형태에 월넛의 깊은 색감을 담았습니다. 낮은 높이로 일본식 비례감을 살렸습니다.",
      imageUrl: "/intevity/materials/japandi-0.jpg",
      link: "",
    },
    {
      name: "규조토 벽 마감재",
      brand: "LG Z:IN",
      description:
        "습도 조절과 탈취 기능을 갖춘 천연 소재. 은은한 텍스처로 공간에 깊이를 더합니다.",
      imageUrl: "/intevity/materials/japandi-1.jpg",
      link: "",
    },
    {
      name: "대나무 블라인드",
      brand: "현대리바트",
      description:
        "자연 채광을 부드럽게 조절하는 대나무 소재. 동양적 미감과 실용성을 겸비합니다.",
      imageUrl: "/intevity/materials/japandi-2.jpg",
      link: "",
    },
  ],
  industrial: [
    {
      name: "마이크로 시멘트 바닥재",
      brand: "LG Z:IN",
      description:
        "콘크리트 질감을 그대로 재현한 바닥재. 별도 양생 없이 시공이 가능합니다.",
      imageUrl: "/intevity/materials/industrial-0.jpg",
      link: "",
    },
    {
      name: "블랙 스틸 선반 유닛",
      brand: "이케아",
      description:
        "무도장 스틸 프레임에 원목 선반을 조합한 오픈 수납. 높이 조절이 자유롭습니다.",
      imageUrl: "/intevity/materials/industrial-1.jpg",
      link: "",
    },
    {
      name: "에디슨 빈티지 펜던트 조명",
      brand: "한샘",
      description:
        "따뜻한 필라멘트 전구와 메탈 갓의 조합. 공간에 빈티지한 무드를 완성합니다.",
      imageUrl: "/intevity/materials/industrial-2.jpg",
      link: "",
    },
  ],
  classic: [
    {
      name: "대리석 패턴 포세린 타일",
      brand: "삼화타일",
      description:
        "천연 대리석의 결을 재현한 고급 포세린. 관리가 쉬우면서도 클래식한 격조를 냅니다.",
      imageUrl: "/intevity/materials/classic-0.jpg",
      link: "",
    },
    {
      name: "웨인스코팅 몰딩 세트",
      brand: "LG Z:IN",
      description:
        "하부 벽면에 품격을 더하는 웨인스코팅 몰딩. DIY 설치가 가능한 접착식 타입.",
      imageUrl: "/intevity/materials/classic-1.jpg",
      link: "",
    },
    {
      name: "벨벳 커튼 (딥 네이비)",
      brand: "현대리바트",
      description:
        "무거운 드레이프가 만드는 우아한 실루엣. 차광률 99%로 수면 환경도 완벽합니다.",
      imageUrl: "/intevity/materials/classic-2.jpg",
      link: "",
    },
  ],
  retro: [
    {
      name: "테라조 패턴 장판",
      brand: "LG Z:IN",
      description:
        "70년대 감성의 테라조 패턴을 현대적으로 재해석. 시공이 간편하고 관리가 쉽습니다.",
      imageUrl: "/intevity/materials/retro-0.jpg",
      link: "",
    },
    {
      name: "라탄 원형 거울",
      brand: "한샘",
      description:
        "수작업 라탄 프레임이 빈티지한 매력을 더합니다. 현관이나 드레스룸에 포인트로 활용.",
      imageUrl: "/intevity/materials/retro-1.jpg",
      link: "",
    },
    {
      name: "레트로 패턴 타일 (200x200)",
      brand: "삼화타일",
      description:
        "기하학 패턴의 복고풍 타일. 주방 백스플래시나 현관에 포인트로 사용하기 좋습니다.",
      imageUrl: "/intevity/materials/retro-2.jpg",
      link: "",
    },
  ],
  romantic: [
    {
      name: "로즈 핑크 실크 벽지",
      brand: "LG Z:IN",
      description:
        "은은한 광택의 실크 질감 벽지. 자연광에 따라 미묘하게 색이 변하는 로맨틱한 소재.",
      imageUrl: "/intevity/materials/romantic-0.jpg",
      link: "",
    },
    {
      name: "아치형 전신 거울",
      brand: "현대리바트",
      description:
        "부드러운 아치 라인이 공간에 우아함을 더합니다. 골드 프레임으로 포인트 효과.",
      imageUrl: "/intevity/materials/romantic-1.jpg",
      link: "",
    },
    {
      name: "쉬어 레이스 커튼",
      brand: "한샘",
      description:
        "빛을 투과하며 부드러운 그림자를 만드는 레이스 커튼. 이중 커튼으로 활용하면 효과적.",
      imageUrl: "/intevity/materials/romantic-2.jpg",
      link: "",
    },
  ],
  french: [
    {
      name: "헤링본 오크 마루 (내추럴 스모크)",
      brand: "LG Z:IN",
      description:
        "스모크 처리로 깊이감을 더한 오크 헤링본. 프렌치 무드의 기본이 되는 바닥재.",
      imageUrl: "/intevity/materials/french-0.jpg",
      link: "",
    },
    {
      name: "브라스 손잡이 세트",
      brand: "한샘",
      description:
        "세월이 묻을수록 멋스러워지는 브라스 소재. 문과 가구에 통일감 있게 적용 가능.",
      imageUrl: "/intevity/materials/french-1.jpg",
      link: "",
    },
    {
      name: "리넨 화이트 몰딩 (크라운형)",
      brand: "현대리바트",
      description:
        "천장과 벽의 경계를 우아하게 마감하는 크라운 몰딩. 공간에 파리지엔 무드를 더합니다.",
      imageUrl: "/intevity/materials/french-2.jpg",
      link: "",
    },
  ],
  contemporary: [
    {
      name: "울트라 슬림 포세린 (1200x600)",
      brand: "삼화타일",
      description:
        "6mm 초박형 대형 타일로 이음새를 최소화합니다. 모던하면서도 트렌디한 공간 연출.",
      imageUrl: "/intevity/materials/contemporary-0.jpg",
      link: "",
    },
    {
      name: "무광 블랙 시스템 수전",
      brand: "한샘",
      description:
        "매트 블랙 마감의 미니멀 수전. 주방과 욕실 어디에나 어울리는 컨템포러리 디자인.",
      imageUrl: "/intevity/materials/contemporary-1.jpg",
      link: "",
    },
    {
      name: "컬러 포인트 월 페인트 (저VOC)",
      brand: "벤자민무어",
      description:
        "트렌드 컬러를 안전하게 적용할 수 있는 저VOC 페인트. 2,000가지 이상의 컬러 선택 가능.",
      imageUrl: "/intevity/materials/contemporary-2.jpg",
      link: "",
    },
  ],
};
