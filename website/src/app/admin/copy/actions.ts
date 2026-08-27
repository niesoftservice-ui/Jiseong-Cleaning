"use server";

import { revalidatePath } from "next/cache";
import { saveDraft } from "@/lib/copy-drafts";

export type SaveResult = { ok: boolean; message: string };

/**
 * 편집 화면에서 고친 문구를 수정안으로 저장한다.
 * 사이트에는 반영하지 않는다 — 회의에서 확정한 뒤 개발자가 옮긴다(2차 회의).
 */
export async function saveCopyDraft(input: {
  title: string;
  note: string;
  values: Record<string, string>;
}): Promise<SaveResult> {
  const values: Record<string, string> = {};
  for (const [k, v] of Object.entries(input.values)) {
    const t = v.trim();
    if (t) values[k] = t;
  }
  if (Object.keys(values).length === 0) {
    return { ok: false, message: "바뀐 문구가 없습니다." };
  }

  try {
    const id = await saveDraft({
      title: input.title.trim(),
      note: input.note.trim(),
      values,
    });
    revalidatePath("/admin/copy");
    return {
      ok: true,
      message: `${input.title.trim() || `수정안 ${id}`} 으로 저장했습니다. 사이트에는 반영되지 않습니다.`,
    };
  } catch {
    return { ok: false, message: "저장하지 못했습니다. 잠시 후 다시 시도해 주세요." };
  }
}
