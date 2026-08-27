/**
 * 홈 하단 가로 스크롤 카드.
 *
 * 2차 회의에서 "인스타 광고 카드처럼 옆으로 넘어가는" 형태로 요청받은 자리다.
 */
export type Highlight = {
  title: string;
  body: string;
  icon: "phone" | "truck" | "shield";
};

/** 회의에서 예로 든 강점 문구. 사실만 적는다 */
export const highlights: Highlight[] = [
  {
    icon: "phone",
    title: "친절한 상담",
    body: "품목과 물량만 알려주시면 사업장에 맞는 방식으로 안내해 드립니다.",
  },
  {
    icon: "truck",
    title: "빠른 배송",
    body: "약속한 날짜와 시간에 방문해 수거하고, 검수 후 배송합니다.",
  },
  {
    icon: "shield",
    title: "깨끗한 세탁물",
    body: "전문 설비로 세탁하고 살균과 건조까지 거칩니다.",
  },
];

export type Review = { body: string; who: string };

/**
 * ⚠️ 자리 확인용 예시 문구다. 실제 거래처 후기가 아니다.
 *
 * 진짜 후기 원고는 지성크리닝에서 작성해 전달하기로 했다(2차 회의).
 * 그때까지 화면에는 「예시」 표시를 붙여 내보내고, 원고가 오면 이 배열만 갈아 끼운다.
 * 실제 상호나 사람 이름을 쓰지 않는다 — 없는 후기를 있는 것처럼 보이게 하면 안 된다.
 */
export const sampleReviews: Review[] = [
  { body: "수거 날짜가 밀린 적이 없어서 객실 회전 잡기가 편합니다.", who: "OO호텔 · 예시" },
  { body: "수건 상태가 일정해서 손님 응대에 신경 쓸 일이 줄었습니다.", who: "OO사우나 · 예시" },
  { body: "물량이 늘어난 달에도 그대로 맞춰 주셔서 조율할 게 없었습니다.", who: "OO헬스장 · 예시" },
  { body: "가운이 눅눅하게 오는 일이 없어 그대로 내놓을 수 있습니다.", who: "OO펜션 · 예시" },
  { body: "매번 견적을 다시 받지 않아도 되니 일이 줄었습니다.", who: "OO모텔 · 예시" },
];

/** 후기 원고를 받기 전까지 화면에 「예시」 표시를 띄운다 */
export const reviewsArePlaceholder = true;
