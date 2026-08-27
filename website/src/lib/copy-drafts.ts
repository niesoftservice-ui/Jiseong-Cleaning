/**
 * 문구 수정안 보관소.
 *
 * 2차 회의 요청: 관리자가 문구를 고치되 **사이트에 바로 반영되지 않는다.**
 * 고친 내용을 1안 · 2안 · 3안 형태로 쌓아 두고, 회의에서 확정한 뒤 개발자가 반영한다.
 * 그래서 이 파일은 저장과 조회만 하고, 화면 렌더링에는 전혀 관여하지 않는다.
 *
 * 저장 위치는 문의함(inquiries.ts)과 같은 방식을 쓴다.
 * 로컬은 SQLite, Netlify 는 Blobs.
 */

/** 고칠 수 있는 문구 목록. key 는 실제 화면 위치를 가리킨다 */
export const copyFields = [
  { key: "hero.eyebrow", label: "홈 · 히어로 윗줄" },
  { key: "hero.title", label: "홈 · 히어로 제목" },
  { key: "hero.lede", label: "홈 · 히어로 설명" },
  { key: "service.title", label: "홈 · 서비스 제목" },
  { key: "service.card.title", label: "홈 · 서비스 카드 제목" },
  { key: "service.card.body", label: "홈 · 서비스 카드 설명" },
  { key: "process.title", label: "홈 · 이용 절차 제목" },
  { key: "cta.title", label: "홈 · 문의 제목" },
  { key: "about.title", label: "회사소개 · 제목" },
  { key: "about.lede", label: "회사소개 · 부제" },
  { key: "about.overview.title", label: "회사소개 · 사업 개요 제목" },
  { key: "about.overview.lede", label: "회사소개 · 사업 개요 부제" },
] as const;

export type CopyFieldKey = (typeof copyFields)[number]["key"];

export type CopyDraft = {
  id: number;
  createdAt: string;
  /** 화면에 보일 이름. 비우면 "수정안 N" 으로 채운다 */
  title: string;
  /** 이 안을 만든 이유·메모 */
  note: string;
  /** key -> 고친 문구 */
  values: Record<string, string>;
};

const onNetlify = Boolean(process.env.NETLIFY || process.env.NETLIFY_LOCAL);
const STORE_NAME = "jiseong-cleaning-copy-drafts";
const COUNTER_KEY = "_counter";

/* ═══════════════ SQLite ═══════════════ */

let db: import("node:sqlite").DatabaseSync | null = null;

async function getDb() {
  if (db) return db;
  const { DatabaseSync } = await import("node:sqlite");
  const { mkdirSync } = await import("node:fs");
  const path = await import("node:path");

  const file =
    process.env.COPY_DB_PATH ?? path.join(process.cwd(), ".data", "copy-drafts.db");
  mkdirSync(path.dirname(file), { recursive: true });

  db = new DatabaseSync(file);
  db.exec(`
    CREATE TABLE IF NOT EXISTS copy_drafts (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT    NOT NULL,
      title      TEXT    NOT NULL DEFAULT '',
      note       TEXT    NOT NULL DEFAULT '',
      values_json TEXT   NOT NULL DEFAULT '{}'
    );
    CREATE INDEX IF NOT EXISTS idx_copy_drafts_created_at
      ON copy_drafts (created_at DESC);
  `);
  return db;
}

type Row = {
  id: number;
  created_at: string;
  title: string;
  note: string;
  values_json: string;
};

/* ═══════════════ Netlify Blobs ═══════════════ */

async function getStore() {
  const { getStore } = await import("@netlify/blobs");
  return getStore({ name: STORE_NAME, consistency: "strong" });
}

function blobKey(id: number, createdAt: string) {
  return `${createdAt}__${String(id).padStart(8, "0")}`;
}

/* ═══════════════ 공개 API ═══════════════ */

export async function saveDraft(input: {
  title: string;
  note: string;
  values: Record<string, string>;
}): Promise<number> {
  if (onNetlify) {
    const store = await getStore();
    const current = Number((await store.get(COUNTER_KEY)) ?? 0);
    const id = current + 1;
    const createdAt = new Date().toISOString();
    await store.setJSON(blobKey(id, createdAt), { id, createdAt, ...input });
    await store.set(COUNTER_KEY, String(id));
    return id;
  }

  const conn = await getDb();
  const info = conn
    .prepare(
      `INSERT INTO copy_drafts (created_at, title, note, values_json)
       VALUES (?, ?, ?, ?)`,
    )
    .run(
      new Date().toISOString(),
      input.title,
      input.note,
      JSON.stringify(input.values),
    );
  return Number(info.lastInsertRowid);
}

export async function listDrafts(limit = 50): Promise<CopyDraft[]> {
  if (onNetlify) {
    const store = await getStore();
    const { blobs } = await store.list();
    const keys = blobs
      .map((b) => b.key)
      .filter((k) => k !== COUNTER_KEY)
      .sort()
      .reverse()
      .slice(0, limit);
    const out: CopyDraft[] = [];
    for (const key of keys) {
      const v = (await store.get(key, { type: "json" })) as CopyDraft | null;
      if (v) out.push(v);
    }
    return out;
  }

  const conn = await getDb();
  const rows = conn
    .prepare(
      `SELECT * FROM copy_drafts ORDER BY datetime(created_at) DESC, id DESC LIMIT ?`,
    )
    .all(limit) as unknown as Row[];

  return rows.map((r) => ({
    id: r.id,
    createdAt: r.created_at,
    title: r.title,
    note: r.note,
    values: safeParse(r.values_json),
  }));
}

function safeParse(s: string): Record<string, string> {
  try {
    const v = JSON.parse(s);
    return v && typeof v === "object" ? (v as Record<string, string>) : {};
  } catch {
    return {};
  }
}
