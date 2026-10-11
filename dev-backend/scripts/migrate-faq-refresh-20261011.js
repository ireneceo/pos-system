/**
 * FAQ 정리 — 중복 제거 + 주소 이름(slug) + 낡은 답변 교체 + 한국어·중국어·말레이어 (2026-10-11)
 *
 * 왜: 운영 FAQ 27문항이 15번씩 겹쳐 251줄로 보였다. FAQ 줄에 slug 가 비어 있어, 배포 때 콘텐츠 동기화
 *     (scripts/sync-contents-to-prod.js — slug+language 로 «이미 있는 글» 을 찾는다)가 같은 글을 못 알아보고
 *     최근 90일 발행분을 배포마다 새로 넣었다. 답변도 «카드 결제 준비 중»·«오프라인 준비 중»·«체험은 문의로» 처럼 낡았다.
 *
 * 하는 일 (데이터 = scripts/data/faq-content-20261011.json):
 *   ① 같은 언어·같은 제목의 FAQ 가 여러 줄이면 가장 오래된 줄(id 최소)만 남기고 지운다 — 이 파일에 있는 질문만
 *   ② 각 질문 영어 줄을 slug 또는 옛 제목으로 찾아 새 내용·slug·분류·순서로 바꾼다(없으면 만든다)
 *   ③ ko·zh·ms 줄을 (slug-언어, 언어) 로 만들거나 바꾸고 같은 번역 묶음 번호로 잇는다
 *
 * 성질: 한 번만 내용을 덮는다 — system_settings 'faq_refresh_20261011' 표지가 있으면 ②③ 은 건너뛴다
 *       (배포마다 돌아도 관리자가 나중에 고친 FAQ 를 다시 덮지 않게). ① 중복 제거는 매번(멱등, 두 번째 0건).
 * 되돌리기: 배포 전 DB 덤프(db_predeploy_*) 의 contents 표.
 */
require('dotenv/config');
const path = require('path');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const TAG = '[faq-refresh-20261011]';
const MARK = 'faq_refresh_20261011';
const DATA = require(path.join(__dirname, 'data', 'faq-content-20261011.json'));
const LANGS = ['ko', 'zh', 'ms'];
const q = (sql, replacements = {}, type = QueryTypes.SELECT, transaction) => sequelize.query(sql, { replacements, type, transaction });

async function main() {
  const t = await sequelize.transaction();
  try {
    // ① 중복 제거 — 이 파일의 질문(옛 제목·새 제목) 만
    const titles = [...new Set(DATA.entries.flatMap(e => [e.legacy_title_en, ...Object.values(e.tr).map(x => x.title)]))];
    const dups = await q(`SELECT c.id FROM contents c
        JOIN contents k ON k.type = 'faq' AND k.language = c.language AND k.title = c.title AND k.id < c.id
       WHERE c.type = 'faq' AND c.title IN (:titles)`, { titles }, QueryTypes.SELECT, t);
    const dupIds = [...new Set(dups.map(r => r.id))];
    if (dupIds.length) await q('DELETE FROM contents WHERE id IN (:ids)', { ids: dupIds }, QueryTypes.DELETE, t);
    console.log(`${TAG} ① 중복 FAQ 삭제 ${dupIds.length}줄`);

    const [done] = await q('SELECT id FROM system_settings WHERE setting_key = :k', { k: MARK }, QueryTypes.SELECT, t);
    if (done) {
      await t.commit();
      console.log(`${TAG} ②③ 이미 적용됨(표지 있음) — 건너뜀`);
      return;
    }

    let created = 0, updated = 0, skipped = 0;
    for (const e of DATA.entries) {
      const [cat] = await q("SELECT id FROM content_categories WHERE slug = :s AND type = 'faq'", { s: e.category_slug }, QueryTypes.SELECT, t);
      if (!cat) { console.log(`${TAG} 분류 없음 ${e.category_slug} — ${e.slug} 건너뜀`); skipped++; continue; }

      // ② 영어 줄
      let [en] = await q("SELECT id, translation_group_id g, published_at FROM contents WHERE type = 'faq' AND language = 'en' AND slug = :s", { s: e.slug }, QueryTypes.SELECT, t);
      if (!en) [en] = await q("SELECT id, translation_group_id g, published_at FROM contents WHERE type = 'faq' AND language = 'en' AND title IN (:ts) ORDER BY id LIMIT 1",
        { ts: [e.legacy_title_en, e.tr.en.title] }, QueryTypes.SELECT, t);
      let group = en && en.g;
      if (!group) {
        const [m] = await q('SELECT COALESCE(MAX(translation_group_id), 0) + 1 g FROM contents', {}, QueryTypes.SELECT, t);
        group = m.g;
      }
      const rows = [['en', e.slug, e.tr.en], ...LANGS.map(l => [l, `${e.slug}-${l}`, e.tr[l]])];
      for (const [lang, slug, tr] of rows) {
        if (!tr || !tr.title || !tr.content) continue;
        const [cur] = lang === 'en' && en ? [{ id: en.id }]
          : await q("SELECT id FROM contents WHERE slug = :s AND language = :l", { s: slug, l: lang }, QueryTypes.SELECT, t);
        const v = { title: tr.title, content: tr.content, slug, cat: cat.id, so: e.sort_order || 0, lang, g: group };
        if (cur) {
          await q(`UPDATE contents SET title = :title, content = :content, slug = :slug, category_id = :cat, sort_order = :so,
                     status = 'published', translation_group_id = :g, published_at = COALESCE(published_at, NOW()), updated_at = NOW()
                    WHERE id = :id`, { ...v, id: cur.id }, QueryTypes.UPDATE, t);
          updated++;
        } else {
          await q(`INSERT INTO contents (category_id, type, title, slug, content, status, sort_order, language, translation_group_id, published_at, created_at, updated_at)
                   VALUES (:cat, 'faq', :title, :slug, :content, 'published', :so, :lang, :g, NOW(), NOW(), NOW())`, v, QueryTypes.INSERT, t);
          created++;
        }
      }
    }
    await q(`INSERT INTO system_settings (setting_key, setting_value, description, created_at, updated_at)
             VALUES (:k, :v, 'FAQ refresh applied once (migrate-faq-refresh-20261011)', NOW(), NOW())`,
      { k: MARK, v: JSON.stringify({ applied_at: new Date().toISOString(), created, updated }) }, QueryTypes.INSERT, t);
    await t.commit();
    console.log(`${TAG} ②③ 바꿈 ${updated} · 새로 ${created} · 건너뜀 ${skipped}`);
  } catch (err) {
    await t.rollback();
    throw err;
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error(`${TAG} 실패:`, e.message); process.exit(1); });
