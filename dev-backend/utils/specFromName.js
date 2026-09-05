/**
 * utils/specFromName.js — 아이템 이름에서 규격(취급 기준숫자 + 취급단위)을 읽는다.
 *
 * 왜 있나 (2026-09-05 Irene 지시):
 *   > "기준양은 기존 상품명에 들어있는 경우가 많으니 그걸 가져다 사용해줘. / 아이템 이름에"
 *   `Mozzarella Cheese 2kg` 처럼 규격이 **이름 문자열에만** 있고 숫자로는 어디에도 없는
 *   아이템이 브랜드 31건 · 매장 59건 있다. 그것을 다섯 칸(docs/TRADE_STRUCTURE.md §2-2)의
 *   **취급 기준숫자·취급단위**로 옮긴다.
 *
 * ⛔ 확실한 것만 읽는다 — 애매하면 null 을 돌려 **사람이 정하게** 한다.
 *   실측으로 확인된 위험(운영 2026-09-05):
 *     `260~280g`(범위) · `300 / 500 Pcs`(둘) · `9OZ / 270ML`(컵 용량이지 팩당 수 아님)
 *     · `1,000pcs`(천단위 쉼표) · `550ml 1박스`(용량 + 포장, 둘 다 잡힘)
 *   `박스·봉·개` 는 **수량이 아니라 포장 이름**이라 규격으로 세지 않는다.
 *
 * 단위 정규화: kg → g ×1000 · L → ml ×1000 (재고 칸이 DECIMAL(_,2) 라 kg 로 두면 10 g 아래가 잘린다).
 *   값은 같다 — 2 kg 와 2000 g 은 같은 양이다.
 *
 * @returns {{quantity:number, unit:string, raw:string} | null}
 */

// 취급단위 ENUM 8값 중 규격으로 인정하는 것 + 그 표기들
const TOKEN = /(\d+(?:\.\d+)?)\s*(kg|kgs|g|gr|grams?|l|litres?|liters?|ml|pcs|pc|ea|piece|pieces)\b/gi;

// 규격으로 읽으면 안 되는 형태 — 하나라도 걸리면 통째로 포기한다
const AMBIGUOUS = [
  /\d\s*[~\-–]\s*\d/,                                   // 260~280g · 300-500
  /\d[^\/]{0,6}\/\s*\d/,                                 // 300 / 500 Pcs · 9OZ / 270ML (사이에 단위가 껴도 잡는다)
  /\d,\d{3}/,                                           // 1,000pcs
  /\d\s*oz\b/i,                                         // 9OZ — OZ 는 우리 ENUM 에 없다 (숫자 뒤라 \b 가 안 선다)
  // 포장 이름 + 숫자 = 규격이 아니라 "몇 포장" 이다. 규격 토큰과 함께 오면 어느 쪽인지 모른다.
  //   예: `미네럴워터 550ml 1박스` — 550ml 는 병 용량, 박스당 병 수는 적혀 있지 않다.
  //   ⚠ 한글 뒤에는 `\b` 가 서지 않는다(JS 의 \b 는 ASCII 기준) — 한글은 경계 없이, 영문만 \b 를 건다.
  /\d+\s*(박스|박|봉지|봉|팩|통|들이)/,
  /\d+\s*(set|sets|box|boxes|ctn|carton|pkt|pkts)\b/i,
];

const NORMALIZE = {
  kg: { unit: 'g', mul: 1000 }, kgs: { unit: 'g', mul: 1000 },
  g: { unit: 'g', mul: 1 }, gr: { unit: 'g', mul: 1 }, gram: { unit: 'g', mul: 1 }, grams: { unit: 'g', mul: 1 },
  l: { unit: 'ml', mul: 1000 }, litre: { unit: 'ml', mul: 1000 }, litres: { unit: 'ml', mul: 1000 },
  liter: { unit: 'ml', mul: 1000 }, liters: { unit: 'ml', mul: 1000 },
  ml: { unit: 'ml', mul: 1 },
  pcs: { unit: 'piece', mul: 1 }, pc: { unit: 'piece', mul: 1 }, ea: { unit: 'piece', mul: 1 },
  piece: { unit: 'piece', mul: 1 }, pieces: { unit: 'piece', mul: 1 },
};

// 용기 이름 + 용량 = **그 그릇이 담는 양**이지 한 포장에 든 양이 아니다.
//   실측(운영 2026-09-05): `(SC-450) 450ML Round Container`, `9OZ / 270ML Double Wall Paper Cup`.
//   앞것은 슬래시가 없어 AMBIGUOUS 를 빠져나간다 — 그래서 용기 낱말로 따로 막는다.
//   부피(ml)일 때만 적용한다. `(50PCS/PKT)` 처럼 **개수**가 적힌 것은 진짜 팩당 수량이라 통과시킨다.
const VESSEL = /(container|cup|bowl|tray|jar|tub|lid|용기|컵|그릇|뚜껑)/i;

function specFromName(name) {
  if (!name || typeof name !== 'string') return null;
  if (AMBIGUOUS.some((re) => re.test(name))) return null;

  TOKEN.lastIndex = 0;
  const hits = [...name.matchAll(TOKEN)];
  if (hits.length !== 1) return null;   // 0개면 없는 것, 2개 이상이면 어느 쪽인지 모른다

  const [raw, numStr, unitRaw] = hits[0];
  const n = parseFloat(numStr);
  if (!Number.isFinite(n) || n <= 0) return null;

  const norm = NORMALIZE[unitRaw.toLowerCase()];
  if (!norm) return null;

  // 용기 + 부피 → 용량 표기다. 사람이 정한다.
  if (norm.unit === 'ml' && VESSEL.test(name)) return null;

  const quantity = Math.round(n * norm.mul * 100) / 100;
  return { quantity, unit: norm.unit, raw: raw.trim() };
}

module.exports = { specFromName, AMBIGUOUS, NORMALIZE, VESSEL };
