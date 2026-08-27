/**
 * 화면에 나가는 문구 중 관리자가 고칠 수 있는 것들.
 *
 * 관리자 편집 화면(/admin/copy)이 이 키를 기준으로 원문을 보여주고,
 * 고친 값을 수정안으로 저장한다. 저장해도 이 파일은 바뀌지 않는다 —
 * 회의에서 확정한 뒤 개발자가 옮긴다(2차 회의).
 */
export const copy = {
  "hero.eyebrow": "호텔 · 모텔 · 펜션 · 사우나 · 헬스장 세탁물 전문",
  "hero.title.1": "수거부터 배송까지",
  "hero.title.2": "사업장 세탁물을",
  "hero.title.3": "대신 관리해드립니다",
  "hero.lede":
    "약속한 날짜에 수거하고 세탁·살균을 거쳐 배송합니다. 사업장 규모, 품목과 물량에 따라 주기적으로 관리해드립니다.",
  "hero.cta": "바로 문의하기",

  "service.eyebrow": "서 비 스",
  "service.title": "사업장 규모, 품목과 물량에 따라 주기적으로 관리해드립니다",

  "process.eyebrow": "이 용 절 차",
  "process.title": "첫 상담부터 배송까지",

  "highlight.eyebrow": "지 성 크 리 닝 은",
  "highlight.title": "이렇게 일합니다",

  "review.eyebrow": "후 기",
  "review.title": "거래처에서 이런 말씀을 주십니다",

  "cta.eyebrow": "문 의",
  "cta.title": "바로 문의하기",
} as const;

export type CopyKey = keyof typeof copy;
