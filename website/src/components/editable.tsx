import type { ReactNode } from "react";
import { copy } from "@/lib/copy";

/**
 * 관리자 편집 대상 문구를 감싼다.
 *
 * 평소에는 그냥 글자다. /admin/copy 에서만 EditorShell 이
 * data-copy-key 를 찾아 눌러서 고칠 수 있게 바꾼다.
 *
 * children 을 주면 그 글자를, 안 주면 lib/copy.ts 의 기본값을 쓴다.
 */
export function Editable({
  k,
  className = "",
  children,
}: {
  k: string;
  className?: string;
  children?: ReactNode;
}) {
  const fallback = (copy as Record<string, string>)[k];
  return (
    <span data-copy-key={k} className={className}>
      {children ?? fallback ?? ""}
    </span>
  );
}
