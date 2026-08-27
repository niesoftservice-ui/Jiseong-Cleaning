import type { Metadata } from "next";
import Link from "next/link";
import AboutPage from "@/app/about/page";
import HomePage from "@/app/page";
import QuotePage from "@/app/quote/page";
import ServicesPage from "@/app/services/page";
import { Card, Container, Section } from "@/components/ui";
import { listDrafts } from "@/lib/copy-drafts";
import { EditorShell } from "./editor-shell";

export const metadata: Metadata = {
  title: "문구 편집",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const TABS = [
  { key: "home", label: "홈" },
  { key: "about", label: "회사소개" },
  { key: "services", label: "서비스" },
  { key: "quote", label: "견적 문의" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function fmt(iso: string) {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default async function AdminCopyPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const active: TabKey = (TABS.find((t) => t.key === tab)?.key ?? "home") as TabKey;
  const drafts = await listDrafts();

  return (
    <>
      {/* 어느 탭을 고칠지 고른다 */}
      <div className="border-b border-line bg-paper px-4 py-3">
        <div className="mx-auto flex max-w-[75rem] flex-wrap items-center gap-2">
          <span className="mr-2 text-[0.75rem] font-bold tracking-[0.12em] text-faint">
            편 집 할 탭
          </span>
          {TABS.map((t) => (
            <Link
              key={t.key}
              href={`/admin/copy?tab=${t.key}`}
              className={`rounded-brand px-3.5 py-2 text-sm font-bold ${
                t.key === active
                  ? "bg-navy text-white"
                  : "bg-white text-ink-2 hover:text-navy"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>

      {/* 실제 화면을 그대로 띄우고 그 위에서 문구만 고친다 */}
      <EditorShell>
        {active === "home" && <HomePage />}
        {active === "about" && <AboutPage />}
        {active === "services" && <ServicesPage />}
        {active === "quote" && <QuotePage />}
      </EditorShell>

      {/* 저장된 안 */}
      <Section tone="paper">
        <Container>
          <h2 className="text-[1.25rem] text-navy">
            저장된 수정안 <span data-numeric>{drafts.length}</span>건
          </h2>
          <p className="mt-2 text-sm text-muted">
            회의에서 확정한 안을 개발자가 사이트에 반영합니다.
          </p>

          {drafts.length === 0 ? (
            <Card className="mt-6 p-6 text-sm text-muted">
              아직 저장된 수정안이 없습니다.
            </Card>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {drafts.map((d, i) => (
                <li key={d.id}>
                  <Card className="h-full p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-[1rem] text-navy">
                        {d.title || `수정안 ${drafts.length - i}`}
                      </h3>
                      <span className="text-[0.78rem] text-muted" data-numeric>
                        {fmt(d.createdAt)}
                      </span>
                    </div>
                    {d.note && (
                      <p className="mt-1.5 text-[0.8125rem] text-ink-2">{d.note}</p>
                    )}
                    <dl className="mt-4 flex flex-col gap-3">
                      {Object.entries(d.values).map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-[0.75rem] font-bold text-faint">{k}</dt>
                          <dd className="m-0 mt-1 text-[0.875rem] leading-[1.7] text-ink-2">
                            {v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </>
  );
}
