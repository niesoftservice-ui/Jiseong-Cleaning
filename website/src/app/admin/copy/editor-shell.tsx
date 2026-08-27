"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { saveCopyDraft } from "./actions";

/**
 * 실제 홈 화면을 그대로 감싸고, 문구만 눌러서 고칠 수 있게 만든다.
 *
 * 화면을 다시 그리지 않고 data-copy-key 가 붙은 요소에 contentEditable 을 켠다.
 * 저장할 때 그 요소들의 글자를 모아 원문과 다른 것만 수정안으로 보낸다.
 */
export function EditorShell({ children }: { children: ReactNode }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const originals = useRef<Map<string, string>>(new Map());
  const [on, setOn] = useState(true);
  const [changed, setChanged] = useState(0);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  /*
    헤더와 푸터는 레이아웃에 있어 이 컴포넌트 바깥이다.
    그래서 편집 대상은 화면 전체에서 찾되, 편집 막대 자신만 뺀다.
  */
  const nodes = useCallback(
    () =>
      Array.from(
        document.querySelectorAll<HTMLElement>("[data-copy-key]"),
      ).filter((el) => !el.closest("[data-editor-bar]")),
    [],
  );

  // 원문 기억
  useEffect(() => {
    for (const el of nodes()) {
      const k = el.dataset.copyKey!;
      if (!originals.current.has(k)) {
        originals.current.set(k, (el.textContent ?? "").trim());
      }
    }
  }, [nodes]);

  // 편집 켜고 끄기
  useEffect(() => {
    const els = nodes();
    for (const el of els) {
      el.contentEditable = on ? "plaintext-only" : "inherit";
      el.spellcheck = false;
      el.classList.toggle("copy-editable", on);
    }
    if (!on) return;

    const onInput = () => {
      let n = 0;
      for (const el of nodes()) {
        const k = el.dataset.copyKey!;
        const now = (el.textContent ?? "").trim();
        const was = originals.current.get(k) ?? "";
        const diff = now !== was;
        el.classList.toggle("copy-changed", diff);
        if (diff) n += 1;
      }
      setChanged(n);
    };

    for (const el of els) el.addEventListener("input", onInput);

    /*
      편집 대상이 링크·버튼 안에 있으면 글자를 누르는 순간 페이지가 넘어간다.
      캡처 단계에서 먼저 잡아 이동만 막는다 — 커서는 그대로 놓인다.
    */
    const block = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-copy-key]")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("click", block, true);
    document.addEventListener("submit", block, true);
    // 링크 안 글자는 드래그로 잡히면 편집이 막힌다
    for (const el of els) el.setAttribute("draggable", "false");

    document.body.classList.add("copy-editing");

    return () => {
      for (const el of els) el.removeEventListener("input", onInput);
      document.removeEventListener("click", block, true);
      document.removeEventListener("submit", block, true);
      document.body.classList.remove("copy-editing");
    };
  }, [on, nodes]);

  async function save() {
    const values: Record<string, string> = {};
    for (const el of nodes()) {
      const k = el.dataset.copyKey!;
      const now = (el.textContent ?? "").trim();
      if (now !== (originals.current.get(k) ?? "")) values[k] = now;
    }
    setSaving(true);
    const res = await saveCopyDraft({ title, note, values });
    setSaving(false);
    setMsg({ ok: res.ok, text: res.message });
    if (res.ok) {
      // 저장했으면 이번 값을 기준으로 삼는다
      for (const el of nodes()) {
        originals.current.set(el.dataset.copyKey!, (el.textContent ?? "").trim());
        el.classList.remove("copy-changed");
      }
      setChanged(0);
      setTitle("");
      setNote("");
    }
  }

  function reset() {
    for (const el of nodes()) {
      el.textContent = originals.current.get(el.dataset.copyKey!) ?? "";
      el.classList.remove("copy-changed");
    }
    setChanged(0);
  }

  return (
    <>
      <style>{`
        .copy-editable {
          outline: 1.5px dashed rgb(37 99 235 / 0.45);
          outline-offset: 3px;
          border-radius: 3px;
          cursor: text;
        }
        .copy-editable:hover { background: rgb(37 99 235 / 0.08); }
        .copy-editable:focus { outline: 2px solid rgb(37 99 235); background: rgb(37 99 235 / 0.10); }
        .copy-changed { background: rgb(250 204 21 / 0.28); }

        /* 편집 중에는 후기 띠를 세운다 — 흐르면 글자를 누를 수 없다 */
        .copy-editing .review-marquee-track { animation: none !important; }
        .copy-editing .review-marquee { overflow-x: auto; }
        .copy-editing .review-marquee-track > [aria-hidden="true"] { display: none; }
      `}</style>

      {/* 편집 막대 */}
      <div
        data-editor-bar
        className="sticky top-0 z-[60] border-b border-line bg-navy px-4 py-3 text-white"
      >
        <div className="mx-auto flex max-w-[75rem] flex-wrap items-center gap-3">
          <strong className="text-sm font-extrabold">문구 편집</strong>
          <span className="text-[0.8125rem] text-[#A6C5E8]">
            점선 부분을 눌러 고치세요. 사이트에는 반영되지 않습니다.
          </span>

          <label className="ml-auto flex items-center gap-2 text-[0.8125rem]">
            <input
              type="checkbox"
              checked={on}
              onChange={(e) => setOn(e.target.checked)}
              className="size-4 accent-white"
            />
            편집 켜기
          </label>

          <span className="rounded-sm bg-white/15 px-2 py-1 text-[0.75rem] font-bold">
            바뀐 문구 {changed}개
          </span>
        </div>

        <div className="mx-auto mt-3 flex max-w-[75rem] flex-wrap items-center gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="안 이름 (예: 1안 · 문구 다듬기)"
            className="min-w-[13rem] flex-1 rounded-brand border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-[#93B4DA] focus:outline-none"
          />
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="메모 (왜 이렇게 고쳤는지)"
            className="min-w-[13rem] flex-1 rounded-brand border border-white/25 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-[#93B4DA] focus:outline-none"
          />
          <button
            type="button"
            onClick={reset}
            disabled={changed === 0}
            className="rounded-brand border border-white/25 px-4 py-2 text-sm font-bold disabled:opacity-40"
          >
            되돌리기
          </button>
          <button
            type="button"
            onClick={save}
            disabled={changed === 0 || saving}
            className="rounded-brand bg-white px-5 py-2 text-sm font-extrabold text-navy disabled:opacity-40"
          >
            {saving ? "저장하는 중…" : "수정안 저장"}
          </button>
        </div>

        {msg && (
          <div className="mx-auto mt-3 max-w-[75rem]">
            <p
              className={`rounded-brand px-3.5 py-2.5 text-sm font-semibold ${
                msg.ok ? "bg-white/15 text-white" : "bg-danger/20 text-white"
              }`}
            >
              {msg.text}
            </p>
          </div>
        )}
      </div>

      {/* 실제 홈 화면 */}
      <div ref={areaRef}>{children}</div>
    </>
  );
}
