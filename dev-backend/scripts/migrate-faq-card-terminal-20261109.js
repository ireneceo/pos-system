#!/usr/bin/env node
/**
 * FAQ 2문항 추가 — 카드단말기(GHL) 연동 · «계산대 세 가지» (2026-11-09)
 * 설계: .claude/fable-design-20261109-ghl-terminal-promo.md §3-6
 * 데이터: scripts/data/faq-content-20261109-card-terminal.json (en·ko·zh·ms)
 *
 * 방식은 migrate-faq-refresh-20261011.js 의 ②③ 그대로:
 *   영어 줄 = slug, 번역 줄 = `${slug}-${lang}`, 같은 translation_group_id 로 잇는다.
 * 성질: 한 번만 내용을 쓴다 — system_settings 'faq_card_terminal_20261109' 표지가 있으면 건너뜀
 *       (관리자가 나중에 고친 글을 배포마다 덮지 않게). 기존 FAQ 무접촉.
 * 운영 반영: 배포 때 이 마이그 + 콘텐츠 동기화(slug+language).
 */
require('dotenv/config');
const path = require('path');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const TAG = '[faq-card-terminal-20261109]';
const MARK = 'faq_card_terminal_20261109';
const DATA = require(path.join(__dirname, 'data', 'faq-content-20261109-card-terminal.json'));
const LANGS = ['ko', 'zh', 'ms'];
const q = (sql, replacements = {}, type = QueryTypes.SELECT, transaction) => sequelize.query(sql, { replacements, type, transaction });

async function main() {
  const t = await sequelize.transaction();
  try {
    const [done] = await q('SELECT id FROM system_settings WHERE setting_key = :k', { k: MARK }, QueryTypes.SELECT, t);
    if (done) {
      await t.commit();
      console.log(`${TAG} 이미 적용됨(표지 있음) — 건너뜀`);
      return;
    }
    let created = 0, updated = 0, skipped = 0;
    for (const e of DATA.entries) {
      const [cat] = await q("SELECT id FROM content_categories WHERE slug = :s AND type = 'faq'", { s: e.category_slug }, QueryTypes.SELECT, t);
      if (!cat) { console.log(`${TAG} 분류 없음 ${e.category_slug} — ${e.slug} 건너뜀`); skipped++; continue; }
      const [en] = await q("SELECT id, translation_group_id g FROM contents WHERE type = 'faq' AND language = 'en' AND slug = :s", { s: e.slug }, QueryTypes.SELECT, t);
      let group = en && en.g;
      if (!group) {
        const [m] = await q('SELECT COALESCE(MAX(translation_group_id), 0) + 1 g FROM contents', {}, QueryTypes.SELECT, t);
        group = m.g;
      }
      const rows = [['en', e.slug, e.tr.en], ...LANGS.map(l => [l, `${e.slug}-${l}`, e.tr[l]])];
      for (const [lang, slug, tr] of rows) {
        if (!tr || !tr.title || !tr.content) continue;
        const [cur] = await q("SELECT id FROM contents WHERE type = 'faq' AND slug = :s AND language = :l", { s: slug, l: lang }, QueryTypes.SELECT, t);
        const v = { title: tr.title, content: tr.content, slug, cat: cat.id, so: e.sort_order || 0, lang, g: group };
        if (cur) {
          await q(`UPDATE contents SET title = :title, content = :content, category_id = :cat, sort_order = :so,
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
             VALUES (:k, :v, 'Card terminal FAQ added once (migrate-faq-card-terminal-20261109)', NOW(), NOW())`,
      { k: MARK, v: JSON.stringify({ applied_at: new Date().toISOString(), created, updated }) }, QueryTypes.INSERT, t);
    await t.commit();
    console.log(`${TAG} 바꿈 ${updated} · 새로 ${created} · 건너뜀 ${skipped}`);
  } catch (err) {
    await t.rollback();
    throw err;
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error(`${TAG} 실패:`, e.message); process.exit(1); });
