'use strict';
/**
 * 이름 비슷함 판정 — 단일 소스 (2026-10-11 Fable 판정 `fable-verdict-20261011-similar-name-guard.md` §3)
 *
 * Irene 2026-10-11: «이름 만들 때 같은 거 비슷한거 만들어서 또 등록하고 그러면 알려주는 거 하면 안돼?
 *   앞 이름부터 겹치는 거 말고 전체적으로 겹친다고 판단되는 거 보여주고 이걸로 선택할래? 물어보는 형국.
 *   이거 있는데 그래도 만들거면 만들어. 라는 형태.»
 *
 * 규칙은 전부 **결정적이고 설명 가능**하다 — 점수·임계치·n-gram 유사도는 쓰지 않는다
 * (브랜드 상품 중복 판별의 원칙: «차단에 쓰면 왜 걸렸는지 설명 못 한다»). 이 판정은 **묻기 전용**이다.
 *   R1 정규화 이름 완전일치 · R2 괄호 뺀 변형 키 일치 · R3 낱말 묶음이 같다(어순·규격·군더더기 무시)
 *   · R4 한쪽 낱말이 다른 쪽에 전부 들어 있다(작은 쪽이 2낱말 이상, 또는 1낱말이면 5글자 이상)
 *   · R3/R4 에서 5글자 이상 낱말은 한 글자 차이(거리 1 · 자리바꿈 포함)를 같은 낱말로 본다.
 * 못 잡는 것(정직하게): 두 글자 차이(Carlos↔Calose) · 낱말이 다른 같은 물건(Sunflower Oil↔Cooking Oil) — 사람 몫.
 * ⛔ 규칙·군더더기 목록을 바꾸면 health-check «이름 비슷함 규칙 표» 를 다시 반증할 것.
 */

/** 이름 정규화 — 대소문자·공백·구두점 차이를 흡수(괄호 안은 **남긴다**). */
function normalizeName(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9가-힣]/g, '');
}

/** 변형 키 — 괄호 구간을 제거한 뒤 정규화. "같은 물건인데 설명만 다른" 경우를 묶는다. */
function variantKey(s) {
  return normalizeName(String(s || '').replace(/[(（][^)）]*[)）]/g, ' '));
}

/**
 * 느슨한 키 — 변형 키에서 **숫자+단위 토큰까지 제거**. 브랜드 상품 «제안 전용»(차단 금지 — 850CC/780CC 는 다른 상품).
 */
function loosePlusKey(s) {
  const withoutParen = String(s || '').replace(/[(（][^)）]*[)）]/g, ' ');
  const withoutSpec = withoutParen.replace(
    /\b\d+(?:\.\d+)?\s*(?:ml|cc|oz|kg|g|mm|cm|l|pcs|pkt|ply|sets?|rolls?)?\b/gi,
    ' '
  );
  return normalizeName(withoutSpec);
}

/** 비교에서 빼는 군더더기 낱말 — 늘리면 규칙 표 반증을 다시 돌린다 */
const FILLER = new Set(['the', 'and', 'for', 'of', 'with', 'in', 'pack', 'pkt', 'pkts', 'pcs', 'piece', 'pieces',
  'bottle', 'btl', 'ctn', 'box', 'set', 'sets', 'roll', 'rolls']);
const SPEC = /^\d+(?:\.\d+)?[a-z]*$/;   // 1kg · 500g · 12oz · 50pcs · 2ply · 150g · 1000
const SPEC_X = /^x\d+[a-z]*$/;          // x20pkts

/** 낱말 묶음 — 괄호 제거 → 소문자 → 구두점을 공백으로 → 규격·군더더기 제거 → 1글자 낱말은 뒤 낱말에 붙임(K-Kimchi → kkimchi) */
function tokenSet(name) {
  const raw = String(name || '').replace(/[(（][^)）]*[)）]/g, ' ').toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, ' ').trim().split(/\s+/).filter(Boolean);
  const kept = raw.filter((w) => !SPEC.test(w) && !SPEC_X.test(w) && !FILLER.has(w));
  const out = [];
  for (let i = 0; i < kept.length; i++) {
    const w = kept[i];
    if (w.length === 1) {
      // 접두어(«K-Soy» 의 k)는 뒤 낱말과 한 낱말로 — 뒤가 없으면 버린다
      if (i + 1 < kept.length) { kept[i + 1] = w + kept[i + 1]; }
      continue;
    }
    out.push(w);
  }
  return [...new Set(out)];
}

/** 거리 1 이하(삽입·삭제·바꿈·자리바꿈) — 결정적 */
function withinOne(a, b) {
  if (a === b) return true;
  const la = a.length, lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  if (la === lb) {
    const diff = [];
    for (let i = 0; i < la; i++) if (a[i] !== b[i]) diff.push(i);
    if (diff.length === 1) return true;
    return diff.length === 2 && diff[1] === diff[0] + 1 && a[diff[0]] === b[diff[1]] && a[diff[1]] === b[diff[0]];
  }
  const [s, l] = la < lb ? [a, b] : [b, a];
  let i = 0, j = 0, skipped = false;
  while (i < s.length && j < l.length) {
    if (s[i] === l[j]) { i++; j++; continue; }
    if (skipped) return false;
    skipped = true; j++;
  }
  return true;
}

/** 두 낱말이 같은가 — 같거나, 둘 다 5글자 이상이고 한 글자 차이 */
function tokenMatch(a, b) {
  if (a === b) return { same: true, typo: false };
  if (a.length >= 5 && b.length >= 5 && withinOne(a, b)) return { same: true, typo: true };
  return { same: false, typo: false };
}

/** small 의 낱말이 전부 large 에 있는가(오타 허용) — 맞으면 오타 쌍 목록 */
function coveredBy(small, large) {
  const typos = [];
  for (const w of small) {
    let hit = null;
    for (const v of large) {
      const m = tokenMatch(w, v);
      if (m.same) { hit = m.typo ? { a: w, b: v } : true; if (!m.typo) break; }
    }
    if (!hit) return null;
    if (hit !== true) typos.push(hit);
  }
  return typos;
}

/**
 * 두 이름이 비슷한가 — 아니면 null.
 * @returns {{ rule: 'same_name'|'paren_only'|'same_words'|'contains', words: string[], typos: {a:string,b:string}[] } | null}
 */
function compareNames(a, b) {
  if (!a || !b) return null;
  const na = normalizeName(a), nb = normalizeName(b);
  if (na && na === nb) return { rule: 'same_name', words: [], typos: [] };
  const va = variantKey(a), vb = variantKey(b);
  if (va && va === vb) return { rule: 'paren_only', words: [], typos: [] };
  const ta = tokenSet(a), tb = tokenSet(b);
  if (!ta.length || !tb.length) return null;
  if (ta.length === tb.length) {
    const t1 = coveredBy(ta, tb), t2 = t1 && coveredBy(tb, ta);
    if (t1 && t2) return { rule: 'same_words', words: ta, typos: t1 };
  }
  const [small, large] = ta.length <= tb.length ? [ta, tb] : [tb, ta];
  if (small.length >= 2 || (small.length === 1 && small[0].length >= 5)) {
    const t = coveredBy(small, large);
    if (t) return { rule: 'contains', words: small, typos: t };
  }
  return null;
}

/** 사람이 읽는 이유(영어 · 서버 로그·스크립트용 — 화면은 rule/words/typos 로 4언어 문장을 만든다) */
function reasonText(m) {
  if (!m) return '';
  const typo = m.typos.length ? ` (${m.typos.map((t) => `${t.a} ≈ ${t.b}`).join(', ')} — one letter apart)` : '';
  if (m.rule === 'same_name') return 'Same name';
  if (m.rule === 'paren_only') return 'Only the text in brackets differs';
  if (m.rule === 'same_words') return `Same words (order/size differ): ${m.words.join(', ')}${typo}`;
  return `All words of the shorter name are in it: ${m.words.join(', ')}${typo}`;
}

module.exports = { normalizeName, variantKey, loosePlusKey, tokenSet, tokenMatch, compareNames, reasonText, FILLER };
