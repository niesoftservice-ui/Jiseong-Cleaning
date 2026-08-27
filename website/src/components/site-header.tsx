"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLockup } from "./brand-mark";
import { Icon } from "./icons";
import { Container } from "./ui";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Esc 로도 닫힌다 — 열린 메뉴가 화면을 덮으므로 탈출 경로가 있어야 한다
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 메뉴가 열린 동안 배경 스크롤을 막는다
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md backdrop-saturate-150 transition-shadow duration-200 ${
        scrolled ? "shadow-[0_1px_0_var(--color-line),0_4px_16px_-8px_rgb(20_48_110/0.16)]" : "shadow-[0_1px_0_var(--color-line)]"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center gap-6 lg:h-[4.75rem]">
          <Link
            href="/"
            className="shrink-0 rounded-brand"
            aria-label={`${site.name} 홈`}
          >
            <BrandLockup />
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="주 메뉴">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-brand px-3.5 py-2 text-[0.9375rem] font-semibold transition-colors duration-150 ${
                  isActive(item.href)
                    ? "bg-tint text-navy"
                    : "text-ink-2 hover:bg-tint hover:text-navy"
                }`}
              >
                <span data-copy-key={`nav.${item.href}`}>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-0">
            {/*
              번호 표시.
              PC 는 눌러도 아무 일이 없어야 한다는 요청(2차 회의)에 따라 링크를 걸지 않고,
              전화가 실제로 걸리는 화면 폭에서만 tel: 링크로 바꾼다.
            */}
            <a
              href={site.telHref}
              className="rounded-brand leading-tight md:block lg:hidden"
            >
              <span className="block text-[0.65rem] font-bold tracking-[0.1em] text-muted">
                전화 문의
              </span>
              <span
                className="block text-[1.1875rem] font-extrabold tracking-[-0.02em] text-navy"
                data-numeric
              >
                {site.tel}
              </span>
            </a>
            <span className="hidden rounded-brand leading-tight lg:block">
              <span
                className="block text-[0.65rem] font-bold tracking-[0.1em] text-muted"
                data-copy-key="header.telLabel"
              >
                전화 문의
              </span>
              <span
                className="block text-[1.1875rem] font-extrabold tracking-[-0.02em] text-navy"
                data-numeric
                data-copy-key="site.tel"
              >
                {site.tel}
              </span>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
              className="rounded-brand p-2 text-navy lg:hidden"
            >
              {open ? <Icon.close className="size-6" /> : <Icon.menu className="size-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* 모바일 메뉴 */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <Container>
          <nav className="py-2" aria-label="모바일 메뉴">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block border-b border-line py-3.5 text-base font-semibold last:border-b-0 ${
                      isActive(item.href) ? "text-brand" : "text-ink-2"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
}
