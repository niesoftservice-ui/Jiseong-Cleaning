import { Editable } from "./editable";
import { ReviewMarquee } from "./review-marquee";
import { Icon } from "./icons";
import { Reveal } from "./reveal";
import { Alert, Card, Container, Section, SectionHead } from "./ui";
import { highlights, reviewsArePlaceholder } from "@/lib/highlights";

/** 가로로 밀어 넘기는 카드 띠. 좁은 화면은 스크롤 스냅, 넓은 화면은 3단 */
const stripClass =
  "-mx-4 mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden";

export function HighlightStrip() {
  return (
    <>
      <Section tone="tint" className="!py-14 sm:!py-16">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow={<Editable k="highlight.eyebrow" />}
              title={<Editable k="highlight.title" />}
            />
          </Reveal>

          <Reveal delay={80}>
            <ul className={stripClass}>
              {highlights.map((h, i) => {
                const Glyph = Icon[h.icon];
                return (
                  <li key={h.title} className="w-[17rem] shrink-0 snap-start sm:w-auto">
                    <Card className="h-full p-7">
                      <Glyph className="size-6 text-sky" />
                      <h3 className="mt-4 text-[1.0625rem] text-navy">
                        <span data-copy-key={`highlight.${i}.title`}>{h.title}</span>
                      </h3>
                      <p className="mt-2 text-sm leading-[1.75] text-ink-2">
                        <span data-copy-key={`highlight.${i}.body`}>{h.body}</span>
                      </p>
                    </Card>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section tone="white" className="!py-14 sm:!py-16">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow={<Editable k="review.eyebrow" />}
              title={<Editable k="review.title" />}
            />
          </Reveal>

          {reviewsArePlaceholder && (
            <Reveal delay={40}>
              <Alert tone="warn" className="mt-5 max-w-3xl">
                아래 후기는 자리와 형태를 보기 위한 예시입니다. 실제 후기가 아니며,
                원고를 받으면 교체합니다.
              </Alert>
            </Reveal>
          )}

          <ReviewMarquee />

        </Container>
      </Section>
    </>
  );
}
