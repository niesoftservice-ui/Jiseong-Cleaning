import type { Metadata } from "next";
import { Editable } from "@/components/editable";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { ButtonAnchor, Card, Container, Section } from "@/components/ui";
import { businessHours, SAMPLE_CONTENT } from "@/lib/sample";
import { processSteps } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "견적 · 상담 문의",
  description:
    "업체명과 품목, 주당 물량을 알려주시면 담당자가 확인해 견적을 드립니다. 전화 054-621-5002.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow={<Editable k="quote.eyebrow">견 적 · 상 담 문 의</Editable>}
        title={<Editable k="quote.title">사업장 단위로 계약합니다</Editable>}
        lede={<Editable k="quote.lede">품목과 물량을 알려주시면 사업장에 맞는 방식으로 안내해 드립니다.</Editable>}
      />

      <Section tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12">
            {/* 폼 */}
            <Reveal>
              <QuoteForm />
            </Reveal>

            {/* 연락 정보 */}
            <Reveal delay={100} className="flex flex-col gap-4">
              <div className="rounded-brand bg-navy px-6 py-7 text-white">
                <p className="text-[0.6875rem] font-bold tracking-[0.16em] text-pale">
                  상 담 및 견 적 문 의
                </p>
                {/* PC 는 표시만, 모바일은 눌러서 전화 (2차 회의) */}
                <a
                  href={site.telHref}
                  className="mt-2 block text-[2rem] font-extrabold tracking-[-0.03em] text-white lg:hidden"
                  data-numeric
                >
                  {site.tel}
                </a>
                <span
                  className="mt-2 hidden text-[2rem] font-extrabold tracking-[-0.03em] text-white lg:block"
                  data-numeric
                >
                  {site.tel}
                </span>
                {businessHours ? (
                  <div className="mt-3.5 text-sm leading-[1.75] text-[#A6C5E8]">
                    <p data-numeric>{businessHours.weekday}</p>
                    <p data-numeric>{businessHours.saturday}</p>
                    <p>{businessHours.holiday}</p>
                    <p className="mt-2 text-[0.75rem] text-[#C08A4A]">
                      운영시간은 확인 전 임시값입니다.
                    </p>
                  </div>
                ) : (
                  <p className="mt-3.5 text-sm leading-[1.7] text-[#A6C5E8]">
                    통화가 어려운 시간에는 아래 폼으로 남겨주시면 회신드립니다.
                  </p>
                )}
              </div>

              <Card className="p-6">
                <h2 className="text-[0.6875rem] font-bold tracking-[0.16em] text-faint">
                  사 업 장 정 보
                </h2>
                <dl className="mt-4 grid grid-cols-[4rem_minmax(0,1fr)] gap-x-3.5 gap-y-3 text-[0.875rem]">
                  <dt className="text-[0.78rem] font-bold text-muted">상호</dt>
                  <dd className="m-0 text-ink-2">{site.name}</dd>
                  <dt className="text-[0.78rem] font-bold text-muted">운영</dt>
                  <dd className="m-0 text-ink-2">{site.parent}</dd>
                  <dt className="text-[0.78rem] font-bold text-muted">주소</dt>
                  <dd className="m-0 text-ink-2">{site.address}</dd>
                </dl>
              </Card>

              <Card className="p-6">
                <h2 className="text-[0.6875rem] font-bold tracking-[0.16em] text-faint">
                  접 수 후 진 행
                </h2>
                <ol className="mt-4 flex flex-col gap-3">
                  {processSteps.map((step, i) => (
                    <li key={step.title} className="flex items-center gap-3">
                      <span
                        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-tint text-[0.6875rem] font-extrabold text-navy"
                        data-numeric
                      >
                        {i + 1}
                      </span>
                      <span className="text-[0.875rem] font-semibold text-ink-2">
                        {step.title}
                      </span>
                    </li>
                  ))}
                </ol>
              </Card>

              {/* 임베드 지도는 API 키가 필요하므로, 키 없이 되는 길찾기 링크를 먼저 붙였다 */}
              <Card className="p-6">
                <h2 className="text-[0.6875rem] font-bold tracking-[0.16em] text-faint">
                  찾 아 오 는 길
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] text-ink-2">
                  {site.address}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <ButtonAnchor
                    href={site.mapLinks.naver}
                    target="_blank"
                    rel="noreferrer"
                    variant="ghost"
                    size="sm"
                  >
                    <Icon.pin className="size-4" />
                    네이버 지도
                  </ButtonAnchor>
                  <ButtonAnchor
                    href={site.mapLinks.kakao}
                    target="_blank"
                    rel="noreferrer"
                    variant="ghost"
                    size="sm"
                  >
                    <Icon.pin className="size-4" />
                    카카오맵
                  </ButtonAnchor>
                </div>
                {/* 내부 안내이므로 샘플 모드에서만 보인다 */}
                {SAMPLE_CONTENT && (
                  <p className="mt-4 border-t border-line pt-3.5 text-[0.75rem] leading-[1.6] text-warn">
                    지도 임베드는 도메인 확정 후 API 키를 발급받아 이 자리에 넣습니다.
                  </p>
                )}
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="white" className="!py-14">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-center gap-4 text-[0.9375rem] text-ink-2">
              <Icon.pin className="size-5 shrink-0 text-sky" />
              <span>
                <strong className="font-bold text-navy">{site.address}</strong> ·
              </span>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
