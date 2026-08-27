import { BrandMark } from "@/components/brand-mark";
import { Editable } from "@/components/editable";
import { HighlightStrip } from "@/components/highlight-strip";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import {
  Badge,
  ButtonAnchor,
  ButtonLink,
  Card,
  Chip,
  Container,
  IconBubble,
  PhoneAction,
  Section,
  SectionHead,
} from "@/components/ui";
import { processSteps, services } from "@/lib/services";
import { site, trustPoints } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* ═══════════════ 히어로 ═══════════════ */}
      <section className="relative overflow-hidden bg-[linear-gradient(150deg,#0E2450_0%,#14306E_42%,#1B4FA8_100%)] text-white">
        {/* 시안 글로우 — 장식이므로 클릭을 막는다 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[8%] -top-[22%] aspect-square w-[min(46rem,72vw)] bg-[radial-gradient(circle_at_50%_50%,rgb(0_174_239/0.30)_0%,rgb(0_174_239/0)_62%)]"
        />
        {/* 심볼 워터마크 */}
        <BrandMark
          tone="glow"
          className="pointer-events-none absolute -right-[26%] top-1/2 w-[min(38rem,90vw)] -translate-y-1/2 opacity-[0.13] sm:-right-[6%] sm:opacity-[0.16]"
        />

        <Container className="relative">
          {/* 히어로 진입은 CSS 애니메이션이다 — JS 가 실패해도 내용이 보인다 */}
          <div className="hero-enter max-w-[42rem] py-16 sm:py-20 lg:py-28">
            <p className="mb-5 inline-flex items-center gap-2.5 text-[0.78rem] font-bold tracking-[0.13em] text-pale">
              <span className="h-0.5 w-6 rounded-full bg-ci-cyan" aria-hidden="true" />
              <Editable k="hero.eyebrow" />
            </p>

            <h1 className="text-[2.125rem] leading-[1.22] tracking-[-0.04em] sm:text-[2.75rem] lg:text-[3.375rem]">
              <Editable k="hero.title.1" />
              <br />
              <Editable k="hero.title.2" />{" "}
              <em className="not-italic text-[#6FD6FF]">
                <Editable k="hero.title.3" />
              </em>
            </h1>

            <p className="mt-5 max-w-[33em] text-base leading-[1.85] text-[#C8DBF2] sm:text-[1.0625rem]">
              <Editable k="hero.lede" />
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/quote" variant="onNavy" size="lg">
                <Editable k="hero.cta" />
                <Icon.arrowRight className="size-4" />
              </ButtonLink>
              <PhoneAction
                tel={site.tel}
                telHref={site.telHref}
                variant="onNavyGhost"
                size="lg"
              >
                <Icon.phone className="size-[1.0625rem]" />
              </PhoneAction>
            </div>

            <ul className="mt-9 flex flex-wrap gap-2.5">
              {trustPoints.map((point) => (
                <li key={point}>
                  <Badge tone="onNavy" className="py-2">
                    <Icon.check className="size-3.5 text-[#6FD6FF]" />
                    {point}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ═══════════════ 서비스 ═══════════════ */}
      <Section tone="white" id="services">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow={<Editable k="service.eyebrow" />}
              title={<Editable k="service.title" />}
            />
          </Reveal>

          <ul className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Glyph = Icon[service.icon];
              return (
                <Reveal key={service.slug} as="li" delay={i * 70}>
                  <Card className="group flex h-full flex-col p-7 transition-all duration-200 ease-brand hover:-translate-y-0.5 hover:border-pale hover:shadow-raised">
                    <IconBubble className="mb-5">
                      <Glyph className="size-6" />
                    </IconBubble>

                    <h3 className="text-[1.1875rem] text-navy">{service.title}</h3>
                    <p className="mt-2.5 text-sm leading-[1.75] text-ink-2">
                      {service.summary}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {service.forWhom.slice(0, 4).map((w) => (
                        <li key={w}>
                          <Chip className="text-xs">{w}</Chip>
                        </li>
                      ))}
                    </ul>

                  </Card>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* ═══════════════ 이용 절차 ═══════════════ */}
      <Section tone="tint" id="process">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow={<Editable k="process.eyebrow" />}
              title={<Editable k="process.title" />}
            />
          </Reveal>

          {/* 순서가 정보이므로 번호를 쓴다 */}
          <ol className="relative mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* 데스크톱 연결선 */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[3.4rem] hidden h-px bg-[linear-gradient(90deg,transparent,var(--color-pale)_12%,var(--color-pale)_88%,transparent)] lg:block"
            />
            {processSteps.map((step, i) => (
              <Reveal key={step.title} as="li" delay={i * 70} className="relative">
                <Card className="h-full p-6">
                  <span
                    className="mb-4 flex size-9 items-center justify-center rounded-full bg-navy text-sm font-extrabold text-white"
                    data-numeric
                  >
                    {i + 1}
                  </span>
                  <h3 className="text-[1.0625rem] text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-[1.7] text-muted">{step.body}</p>
                </Card>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <HighlightStrip />

      {/* ═══════════════ 마무리 CTA ═══════════════ */}
      <Section tone="paper">
        <Container>
          <Reveal>
            <Card className="overflow-hidden p-8 text-center sm:p-12">
              <SectionHead
                align="center"
                eyebrow={<Editable k="cta.eyebrow" />}
                title={<Editable k="cta.title" />}
                className="mx-auto"
              />
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/quote" size="lg">
                  바로 문의하기
                  <Icon.arrowRight className="size-4" />
                </ButtonLink>
                <PhoneAction
                  tel={site.tel}
                  telHref={site.telHref}
                  variant="ghost"
                  size="lg"
                >
                  <Icon.phone className="size-[1.0625rem]" />
                </PhoneAction>
                <ButtonAnchor href={site.smsHref} variant="ghost" size="lg">
                  <Icon.message className="size-[1.0625rem]" />
                  문자 보내기
                </ButtonAnchor>
              </div>
              <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted">
                <Icon.pin className="size-4 text-sky" />
                {site.address}
              </p>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
