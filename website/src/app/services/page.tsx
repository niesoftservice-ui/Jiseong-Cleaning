import type { Metadata } from "next";
import { Editable } from "@/components/editable";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Card, Chip, Container, IconBubble, Section } from "@/components/ui";
import { services } from "@/lib/services";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "서비스",
  description:
    "호텔·모텔·펜션·사우나·헬스장 세탁물 정기 관리. 운영 방식을 안내합니다.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={<Editable k="services.eyebrow">서 비 스</Editable>}
        title={<Editable k="services.title">사업장 규모, 품목과 물량에 따라 주기적으로 관리해드립니다</Editable>}
      />

      <Section tone="white">
        <Container>
          <ul className="grid gap-6 lg:grid-cols-3">
            {services.map((service, i) => {
              const Glyph = Icon[service.icon];
              return (
                <Reveal key={service.slug} as="li" delay={i * 70}>
                  <Card className="flex h-full flex-col p-7">
                    <IconBubble className="mb-5">
                      <Glyph className="size-6" />
                    </IconBubble>

                    <h2 className="text-[1.1875rem] text-navy">{service.title}</h2>
                    <p className="mt-2.5 text-sm leading-[1.75] text-ink-2">
                      {service.summary}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {service.forWhom.map((w) => (
                        <li key={w}>
                          <Chip className="text-xs">{w}</Chip>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold text-brand hover:text-brand-hover"
                    >
                      자세히 보기
                      <Icon.chevronRight className="size-4" />
                    </Link>
                  </Card>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

    </>
  );
}
