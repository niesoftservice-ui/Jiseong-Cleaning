import Link from "next/link";
import { Icon } from "./icons";

/**
 * 화면 오른쪽 아래에 계속 붙어 있는 문의 버튼.
 *
 * 2차 회의 요청: 아래로 스크롤한 뒤 다시 위로 올라가 버튼을 찾는 수고를 없앤다.
 * 데스크톱에서만 띄운다 — 모바일은 하단 고정 바(MobileCtaBar)가 같은 일을 한다.
 */
export function FloatingCta() {
  return (
    <Link
      href="/quote"
      className="fixed bottom-7 right-7 z-50 hidden items-center gap-2 rounded-full bg-brand px-6 py-4 text-[0.9375rem] font-bold text-white shadow-raised transition-all duration-150 hover:-translate-y-0.5 hover:bg-brand-hover lg:inline-flex"
    >
      <Icon.message className="size-[1.0625rem]" />
      바로 문의하기
    </Link>
  );
}
