import type { Metadata } from "next";
import { Editable } from "@/components/editable";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Card, Container, Section, SectionHead } from "@/components/ui";
import { businessInfo, certification, SAMPLE_CONTENT } from "@/lib/sample";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "회사소개",
  description:
    "지성크리닝은 (주)지성이엔지가 운영하는 세탁 사업 부문이며 장애인 표준사업장으로 운영됩니다. 소재지와 연락처를 안내합니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={<Editable k="about.eyebrow">회 사 소 개</Editable>}
        title={<Editable k="about.title">(주)지성이엔지 지성크리닝</Editable>}
        lede={<Editable k="about.lede">우수조달업체 (주)지성이엔지에서 운영하는 세탁 사업 부문입니다.</Editable>}
      />

      {/* ═══════════════ 개요 ═══════════════ */}
      <Section tone="white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
            <Reveal>
              <SectionHead
                eyebrow={<Editable k="about.overview.eyebrow">사 업 개 요</Editable>}
                title={<Editable k="about.overview.title">사업장 세탁물을 관리해드리겠습니다</Editable>}
                lede={<Editable k="about.overview.lede">「안전한 시공 및 점검으로 신뢰받는 기업」 (주)지성이엔지 파트너 지성크리닝입니다.</Editable>}
              />
            </Reveal>

            <Reveal delay={100}>
              <Card className="p-7">
                <h2 className="text-[0.6875rem] font-bold tracking-[0.16em] text-faint">
                  사 업 자 정 보
                </h2>
                <dl className="mt-5 grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 gap-y-3.5 text-[0.9375rem]">
                  <dt className="text-[0.8125rem] font-bold text-muted">상호</dt>
                  <dd className="m-0 text-ink-2">{site.name}</dd>

                  <dt className="text-[0.8125rem] font-bold text-muted">운영</dt>
                  <dd className="m-0 text-ink-2">{site.parent}</dd>

                  {businessInfo.representative && (
                    <>
                      <dt className="text-[0.8125rem] font-bold text-muted">대표자</dt>
                      <dd className="m-0 text-ink-2">{businessInfo.representative}</dd>
                    </>
                  )}

                  {businessInfo.registrationNumber && (
                    <>
                      <dt className="text-[0.8125rem] font-bold text-muted">
                        사업자번호
                      </dt>
                      <dd className="m-0 text-ink-2" data-numeric>
                        {businessInfo.registrationNumber}
                      </dd>
                    </>
                  )}

                  <dt className="text-[0.8125rem] font-bold text-muted">소재지</dt>
                  <dd className="m-0 text-ink-2">{site.address}</dd>

                  <dt className="text-[0.8125rem] font-bold text-muted">대표전화</dt>
                  <dd className="m-0">
                    <a href={site.telHref} className="font-bold text-brand" data-numeric>
                      {site.tel}
                    </a>
                  </dd>

                  {businessInfo.fax && (
                    <>
                      <dt className="text-[0.8125rem] font-bold text-muted">팩스</dt>
                      <dd className="m-0 text-ink-2" data-numeric>
                        {businessInfo.fax}
                      </dd>
                    </>
                  )}

                  <dt className="text-[0.8125rem] font-bold text-muted">취급</dt>
                  <dd className="m-0 text-ink-2">
                    숙박시설 세탁물 · 월세탁 정기 계약
                  </dd>
                </dl>

                {SAMPLE_CONTENT && (
                  <p className="mt-4 rounded-brand bg-warn-bg px-3.5 py-2.5 text-[0.75rem] leading-[1.6] font-semibold text-warn">
                    대표자 · 사업자번호 · 팩스는 확인 전 임시값입니다.
                  </p>
                )}

                <p className="mt-5 border-t border-line pt-5 text-[0.8125rem] leading-[1.8] text-muted">
                  모회사 본사
                  <br />
                  {site.parentAddress}
                  <br />
                  <a
                    href={site.parentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-brand"
                  >
                    jiseong.co.kr
                  </a>
                </p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ═══════════════ 장애인 표준사업장 ═══════════════ */}
      <Section tone="navy" id="standard-workplace">
        <Container>
          <div className="flex flex-wrap items-start gap-8 lg:gap-14">
            <Reveal className="min-w-0 flex-1 basis-[26rem]">
              <SectionHead
                tone="dark"
                eyebrow={<Editable k="about.social.eyebrow">사 회 적 가 치</Editable>}
                title={<Editable k="about.social.title">장애인 표준사업장으로 운영합니다</Editable>}
                lede={<Editable k="about.social.lede">지성크리닝은 장애인에게 안정적인 일자리를 제공하고 사회적 가치를 실현하기 위해 장애인 표준사업장으로 운영되고 있습니다.</Editable>}
              />
              {/*
                전단지에 인쇄된 문장(위 lede)만 쓴다.
                회사의 입장이나 방침을 덧붙이지 않는다 — 대표·팀장이 정할 영역이다.
              */}
            </Reveal>

            <Reveal delay={100} className="shrink-0">
              <div className="inline-flex items-center gap-3.5 rounded-brand bg-white/10 px-6 py-5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.22)]">
                <Icon.seal className="size-8 shrink-0 text-[#6FD6FF]" />
                <span>
                  <strong className="block text-[1.0625rem] font-extrabold tracking-[-0.02em] text-white">
                    장애인 표준사업장
                  </strong>
                  {certification ? (
                    <span className="mt-1 block text-[0.8125rem] leading-[1.6] text-[#A6C5E8]">
                      {certification.issuer}
                      <br />
                      <span data-numeric>
                        {certification.number} · {certification.date}
                      </span>
                      <span className="mt-1 block text-[0.6875rem] text-[#C08A4A]">
                        인증번호 · 인증일은 확인 전 임시값
                      </span>
                    </span>
                  ) : (
                    <span className="mt-0.5 block text-[0.8125rem] text-[#A6C5E8]">
                      인증기관 · 인증번호 확인 후 표기
                    </span>
                  )}
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

    </>
  );
}
