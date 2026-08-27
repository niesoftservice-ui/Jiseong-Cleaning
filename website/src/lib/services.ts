/**
 * 서비스 데이터 — 페이지·카드·폼 선택지가 모두 이 배열을 쓴다.
 *
 * 품목 목록의 출처는 Document/품목-단가표.md 다.
 *
 * ⚠️ 문구 작성 기준은 lib/faq.ts 상단 주석과 같다.
 *    전단지에 인쇄된 내용은 쓸 수 있고, 결정사항.md 의 ⛔ 항목(정산 방식·
 *    최소 물량·수거배송비·서비스 지역·다지점·보상 기준)은 단정하지 않는다.
 *    명세서·설계서의 기능(검수 후 금액 확정, 단계별 이력)은 앞으로 만들 시스템의
 *    설계일 뿐 현재 운영 방식이 아니므로 여기에 약속으로 적지 않는다.
 */

export type Service = {
  slug: string;
  /** 내비게이션·카드에 쓰는 짧은 이름 */
  short: string;
  /** 페이지 제목 */
  title: string;
  /** 카드 한 줄 요약 */
  summary: string;
  /** 페이지 리드 문단 */
  lede: string;
  icon: "linen" | "kitchen" | "contract";
  /** 이 서비스를 주로 쓰는 업종 */
  forWhom: string[];
  /** 이 서비스의 차별점. 형용사 대신 공정·조건으로 쓴다 */
  points: { title: string; body: string }[];
  priceNote: string;
};

export const services: Service[] = [
  {
    slug: "linen",
    short: "사업장 세탁물",
    title: "사업장 세탁물 정기 관리",
    summary: "약속한 날짜에 수거하고 세탁·살균을 거쳐 배송합니다.",
    lede: "사업장 세탁물은 품목과 물량이 일정합니다. 사업장 규모, 품목과 물량에 따라 주기적으로 관리해드립니다.",
    icon: "linen",
    forWhom: ["호텔", "모텔", "펜션", "사우나 세탁물", "헬스 세탁물"],
    points: [
      {
        title: "정기 수거 · 배송",
        body: "약속한 날짜와 주기에 맞춰 정기적으로 수거하고 배송합니다.",
      },
      {
        title: "세탁 · 살균 · 건조",
        body: "전문 설비로 세탁하고 살균과 건조까지 거칩니다. 형광증백제·표백제 등 유해성분은 넣지 않습니다.",
      },
      {
        title: "물량에 맞춘 상담",
        body: "사업장마다 물량 차이가 큽니다. 현재 물량을 알려주시면 맞는 방식으로 안내해 드립니다.",
      },
    ],
    priceNote:
      "단가는 품목 · 물량 · 수거 주기에 따라 달라집니다. 물량을 알려주시면 상담해 드립니다.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** 이용 절차 — 순서가 정보이므로 번호를 쓴다 */
export const processSteps = [
  {
    title: "상담",
    body: "사업장 · 품목 · 물량 상담",
  },
  {
    title: "수거",
    body: "약속된 날짜와 시간에 방문 수거",
  },
  {
    title: "세탁",
    body: "전문 설비로 세탁 · 살균 · 건조",
  },
  {
    title: "배송",
    body: "검수 후 배송",
  },
] as const;

/** 홈 「왜 지성크리닝인가」 */
export const reasons = [
  {
    icon: "clock",
    title: "사업장 주기에 맞춘 정기 세탁",
    body: "주 1회부터 3회 이상까지 사업장 운영에 맞춰 상담해 정합니다.",
  },
  {
    icon: "shield",
    title: "세탁 · 살균 공정",
    body: "전문 설비로 세탁과 살균을 거치고, 형광증백제·표백제는 쓰지 않습니다.",
  },
  {
    icon: "doc",
    title: "세탁일지 · 위생관리 기록",
    body: "원하실 경우 세탁일지와 위생관리 기록을 제공합니다.",
  },
  {
    icon: "truck",
    title: "수거 · 배송 전문",
    body: "정해진 일정에 맞춰 사업장을 방문해 수거하고 배송합니다.",
  },
  {
    icon: "coin",
    title: "세탁물 관리 부담 절감",
    body: "세탁 인력·설비·공간을 사업장에서 유지하지 않아도 됩니다.",
  },
  {
    icon: "building",
    title: "(주)지성이엔지가 운영",
    body: "도로 안전 장비를 제조하는 법인의 세탁 사업 부문입니다. 계약과 정산이 법인 기준으로 처리됩니다.",
  },
] as const;

/** 견적 폼 품목 선택지 — 단가표 분류를 압축한 것 */
export const inquiryIndustryOptions = [
  "숙박시설",
  "사우나",
  "헬스장",
  "기타",
] as const;

