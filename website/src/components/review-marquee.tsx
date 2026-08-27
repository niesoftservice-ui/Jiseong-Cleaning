import { Card } from "./ui";
import { reviewsArePlaceholder, sampleReviews } from "@/lib/highlights";

/**
 * 옆으로 계속 흐르는 후기 띠.
 *
 * 같은 목록을 두 벌 이어 붙이고 절반만큼 움직이면 끊김 없이 반복된다.
 * 마우스를 올리면 멈춘다. 「동작 줄이기」를 켠 사용자에게는 애니메이션을 끄고
 * 손으로 밀 수 있는 가로 스크롤로 바뀐다(globals.css).
 */
export function ReviewMarquee() {
  const items = [...sampleReviews, ...sampleReviews];

  return (
    <div className="review-marquee relative mt-9 overflow-hidden">
      {/* 양쪽 끝을 흐리게 해서 잘린 느낌을 없앤다 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-[linear-gradient(90deg,var(--color-paper),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-[linear-gradient(270deg,var(--color-paper),transparent)]"
      />

      <ul className="review-marquee-track flex w-max gap-4">
        {items.map((r, i) => {
          // 뒤쪽 한 벌은 이어 붙이기용 복제다 — 편집 대상으로 잡지 않는다
          const first = i < sampleReviews.length;
          return (
          <li
            key={`${r.who}-${i}`}
            className="w-[19rem] shrink-0"
            aria-hidden={!first}
          >
            <Card className="flex h-full flex-col p-7">
              {reviewsArePlaceholder && (
                <span className="mb-3 inline-flex w-fit rounded-sm bg-warn-bg px-2 py-0.5 text-[0.6875rem] font-bold text-warn">
                  예시
                </span>
              )}
              <p className="text-[0.9375rem] leading-[1.8] text-ink-2">
                &ldquo;
                <span data-copy-key={first ? `review.${i}.body` : undefined}>
                  {r.body}
                </span>
                &rdquo;
              </p>
              <p className="mt-auto pt-5 text-[0.8125rem] font-bold text-muted">
                <span data-copy-key={first ? `review.${i}.who` : undefined}>
                  {r.who}
                </span>
              </p>
            </Card>
          </li>
          );
        })}
      </ul>
    </div>
  );
}
