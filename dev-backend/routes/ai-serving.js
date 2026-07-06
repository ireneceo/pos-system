/**
 * routes/ai-serving.js — AI 카메라 서빙 (Track B / B1) 엔드포인트 7개.
 *
 * 설계: docs/AI_FOOD_RECOGNITION_DESIGN.md §B-2.
 * 게이팅 3단: authenticateToken + checkRestaurantAccess + requireRestaurantModule('ai_serving').
 * 원본 사진 무보존: recognize 는 multer memoryStorage 만, 디스크 쓰기 코드 없음(결정 #1).
 * 서빙 전이는 이 라우터가 안 함 — 프론트가 기존 PATCH /orders/:id/items 호출.
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const { Op } = require('sequelize');

const { authenticateToken, checkRestaurantAccess, requireRole } = require('../middleware/auth');
const { requireRestaurantModule } = require('../middleware/requireModule');
const { Order, Product, MenuReferencePhoto, RecognitionLog } = require('../models');
const ai = require('../services/ai');

const gate = requireRestaurantModule('ai_serving', 'restaurantId');
const common = [authenticateToken, checkRestaurantAccess, gate];

// recognize 는 memoryStorage(디스크 기록 없음). 레퍼런스 업로드는 아래 별도(디스크 저장).
const uploadMem = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^image\/(jpe?g|png)$/i.test(file.mimetype)) cb(null, true);
    else cb(new Error('jpeg/png only'));
  },
});

const recognizeLimiter = rateLimit({
  windowMs: 60 * 1000, max: 30,
  keyGenerator: (req) => `${req.user?.id || req.ip}:${req.params.restaurantId}`,
  message: { success: false, message: 'Too many recognitions, slow down' },
});

// 레퍼런스 사진 저장 위치 (same-origin, base64 DB 인라인 금지 [[reference_image_storage_rule]])
const REF_DIR = path.join('/var/www/uploads/reference-photos');
const REF_THUMB_DIR = path.join(REF_DIR, 'thumbnails');
function ensureRefDirs() { for (const d of [REF_DIR, REF_THUMB_DIR]) { try { fs.mkdirSync(d, { recursive: true }); } catch { /* exists */ } } }

// ───────────────────────── 헬퍼 ─────────────────────────

const nowMin = (iso) => { const ms = Date.now() - new Date(iso).getTime(); return isNaN(ms) ? 0 : Math.max(0, Math.floor(ms / 60000)); };
const optList = (x) => (Array.isArray(x?.options) ? x.options : []).map(o => typeof o === 'string' ? o : (o?.name || '')).filter(Boolean);

/** ready 상태 주문 품목을 후보로 추출 (§5-④). set_components[ci]↔set_items[ci] 동일 인덱스 규칙. */
async function getReadyCandidates(restaurantId) {
  const orders = await Order.findAll({
    where: {
      restaurant_id: restaurantId,
      status: { [Op.in]: ['pending', 'preparing', 'ready'] },
      [Op.or]: [{ is_deleted: false }, { is_deleted: null }],
    },
    order: [['createdAt', 'ASC']],
    limit: 60,
  });
  const cands = [];
  for (const o of orders) {
    const items = Array.isArray(o.order_items) ? o.order_items : [];
    const table = o.table_number != null ? String(o.table_number) : (o.order_type || '');
    const orderTime = o.order_date || o.createdAt;
    const ageMin = nowMin(orderTime);
    items.forEach((it, i) => {
      const comps = (Array.isArray(it.set_components) && it.set_components.length) ? it.set_components
        : (it.is_set_menu && Array.isArray(it.set_items) && it.set_items.length ? it.set_items : null);
      if (comps) {
        const setItems = Array.isArray(it.set_items) ? it.set_items : [];
        comps.forEach((c, ci) => {
          const st = String(c.status ?? setItems[ci]?.status ?? it.status ?? '');
          if (st === 'ready') cands.push({
            product_id: c.product_id ?? null, order_id: o.id, item_index: i, comp_index: ci,
            name: c.name || 'Item', table, ageMin, options: optList(c), setName: it.name || null,
          });
        });
      } else if (String(it.status || '') === 'ready') {
        cands.push({
          product_id: it.product_id ?? it.menuItem?.id ?? null, order_id: o.id, item_index: i, comp_index: null,
          name: it.menuItem?.name || it.name || 'Item', table, ageMin, options: optList(it), setName: null,
        });
      }
    });
  }
  return cands;
}

/** 상품별 활성 레퍼런스 임베딩 Map<product_id, number[][]> (현재 모델만). */
async function getRefsByProduct(restaurantId, model) {
  const rows = await MenuReferencePhoto.findAll({
    where: { restaurant_id: restaurantId, is_active: true, embedding_model: model, embedding: { [Op.ne]: null } },
    attributes: ['product_id', 'embedding'],
  });
  const map = new Map();
  for (const r of rows) {
    const emb = r.embedding;
    if (!Array.isArray(emb)) continue;
    if (!map.has(r.product_id)) map.set(r.product_id, []);
    map.get(r.product_id).push(emb);
  }
  return map;
}

// 매장당 시드 in-flight 뮤텍스 (중복 시드 방지, §B-2 콜드스타트).
const _seeding = new Set();
async function seedFromProductImages(restaurantId, provider) {
  if (_seeding.has(restaurantId)) return { seeding: true };
  _seeding.add(restaurantId);
  try {
    const products = await Product.findAll({
      where: { restaurant_id: restaurantId, is_active: true, image: { [Op.ne]: null } },
      attributes: ['id', 'image', 'image_thumbnail'],
    });
    let created = 0;
    for (const p of products) {
      if (!p.image || !String(p.image).startsWith('/uploads/')) continue; // 로컬 파일만 시드(레거시 base64 스킵)
      const imageUrl = p.image;
      const existing = await MenuReferencePhoto.findOne({ where: { product_id: p.id, image_url: imageUrl } });
      if (existing && existing.embedding_model === provider.model && existing.embedding) continue;
      // 파일 경로 → 임베딩
      const filePath = path.join('/var/www', imageUrl.replace(/^\//, '').replace(/^var\/www\//, ''));
      let vec = null;
      try { const buf = fs.readFileSync(filePath); vec = await provider.embedImage(buf); } catch { vec = null; }
      if (existing) {
        await existing.update({ embedding: vec, embedding_model: provider.model, embedding_dim: vec ? vec.length : null, is_active: true });
      } else {
        await MenuReferencePhoto.create({
          restaurant_id: restaurantId, product_id: p.id, image_url: imageUrl,
          thumbnail_url: p.image_thumbnail || null, source: 'menu_image',
          embedding: vec, embedding_model: provider.model, embedding_dim: vec ? vec.length : null, is_active: true,
        });
      }
      if (vec) created++;
    }
    return { created };
  } finally { _seeding.delete(restaurantId); }
}

const fail = (res, code, msg) => res.status(code).json({ success: false, message: msg });

// ───────────────────────── 1. recognize ─────────────────────────
router.post('/:restaurantId/recognize', ...common, recognizeLimiter, uploadMem.single('photo'), async (req, res) => {
  const t0 = Date.now();
  const restaurantId = parseInt(req.params.restaurantId, 10);
  const provider = ai.getProvider();
  try {
    const candidates = await getReadyCandidates(restaurantId);
    if (candidates.length === 0) {
      return res.json({ success: true, data: { mode: 'no_candidates', candidates: [], provider: provider.name } });
    }
    const refs = await getRefsByProduct(restaurantId, provider.model);
    // 콜드스타트: 활성 레퍼런스 0 → fallback + 백그라운드 시드 킥오프.
    if (refs.size === 0) {
      seedFromProductImages(restaurantId, provider).catch(() => {});
      return res.json({ success: true, data: { mode: 'fallback', seeding: true, candidates: manualList(candidates), provider: provider.name } });
    }
    if (!req.file || !req.file.buffer) return fail(res, 400, 'photo required');
    let queryVec;
    try { queryVec = await Promise.race([provider.embedImage(req.file.buffer), timeout(3000)]); }
    catch { return res.json({ success: true, data: { mode: 'fallback', candidates: manualList(candidates), provider: provider.name } }); }

    const ranked = ai.rankCandidates(queryVec, candidates, refs);
    const { mode, topConfidence } = ai.decideMode(ranked, provider.maxMode);
    const top = ranked[0];
    const out = ranked.slice(0, 5).map(shapeCandidate);

    const log = await RecognitionLog.create({
      restaurant_id: restaurantId, staff_user_id: req.user?.id || null,
      candidates: out, top_product_id: top?.product_id ?? null,
      top_confidence: topConfidence, mode, provider: provider.name, latency_ms: Date.now() - t0,
    });
    return res.json({ success: true, data: { log_id: log.id, mode, top_confidence: topConfidence, candidates: out, provider: provider.name } });
  } catch (e) {
    console.error('[ai-serving] recognize error:', e.message);
    return fail(res, 500, 'recognition failed');
  }
});

const shapeCandidate = (r) => ({
  product_id: r.product_id, order_id: r.order_id, item_index: r.item_index, comp_index: r.comp_index,
  name: r.name, table: r.table, options: r.options, set_name: r.setName || null, age_min: r.ageMin,
  img_score: r.img_score, fused_score: r.fused_score, confidence: r.fused_score,
});
const manualList = (cands) => cands.map(c => ({ ...shapeCandidate({ ...c, img_score: null, fused_score: null }) }));
const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms));

// ───────────────────────── 2. ready-items (직접 고르기/fallback) ─────────────────────────
router.get('/:restaurantId/ready-items', ...common, async (req, res) => {
  try {
    const cands = await getReadyCandidates(parseInt(req.params.restaurantId, 10));
    return res.json({ success: true, data: manualList(cands) });
  } catch (e) { return fail(res, 500, 'failed to load ready items'); }
});

// ───────────────────────── 3. outcome (결정 기록) ─────────────────────────
router.post('/:restaurantId/logs/:logId/outcome', ...common, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const log = await RecognitionLog.findByPk(parseInt(req.params.logId, 10));
    if (!log || log.restaurant_id !== restaurantId) return fail(res, 404, 'log not found');
    const { decision, chosen_order_id, chosen_item_index, chosen_product_id } = req.body || {};
    const valid = ['auto_confirmed', 'recommend_confirmed', 'picked_other', 'manual', 'reshoot', 'abandoned'];
    if (decision && !valid.includes(decision)) return fail(res, 400, 'invalid decision');
    const wasTop1 = (chosen_product_id != null && log.top_product_id != null) ? (chosen_product_id === log.top_product_id) : null;
    await log.update({
      decision: decision || null, chosen_order_id: chosen_order_id ?? null,
      chosen_item_index: chosen_item_index ?? null, chosen_product_id: chosen_product_id ?? null,
      was_top1_correct: wasTop1,
    });
    return res.json({ success: true, data: { id: log.id } });
  } catch (e) { return fail(res, 500, 'failed to record outcome'); }
});

// ───────────────────────── 4. reference-photos 목록 ─────────────────────────
router.get('/:restaurantId/reference-photos', ...common, async (req, res) => {
  try {
    const where = { restaurant_id: parseInt(req.params.restaurantId, 10), is_active: true };
    if (req.query.product_id) where.product_id = parseInt(req.query.product_id, 10);
    const rows = await MenuReferencePhoto.findAll({
      where, attributes: ['id', 'product_id', 'image_url', 'thumbnail_url', 'source', 'embedding_model', 'created_at'],
      order: [['created_at', 'DESC']], limit: 200,
    });
    return res.json({ success: true, data: rows });
  } catch (e) { return fail(res, 500, 'failed to load reference photos'); }
});

// ───────────────────────── 5. reference-photos 업로드 (RA) ─────────────────────────
router.post('/:restaurantId/reference-photos', authenticateToken, checkRestaurantAccess, gate,
  requireRole('Restaurant Admin', 'System Admin'), uploadMem.single('photo'), async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const productId = parseInt(req.body.product_id, 10);
    if (!productId) return fail(res, 400, 'product_id required');
    if (!req.file?.buffer) return fail(res, 400, 'photo required');
    const product = await Product.findByPk(productId);
    if (!product || Number(product.restaurant_id) !== restaurantId) return fail(res, 404, 'product not found');

    ensureRefDirs();
    const stamp = `${productId}-${req.user.id}-${Date.now()}`;  // Date.now OK (런타임 파일명)
    const fname = `ref-${stamp}.jpg`;
    const tname = `ref-${stamp}.jpg`;
    const full = path.join(REF_DIR, fname);
    const thumb = path.join(REF_THUMB_DIR, tname);
    await sharp(req.file.buffer).rotate().resize(1024, 1024, { fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 85 }).toFile(full);
    await sharp(req.file.buffer).rotate().resize(300, 300, { fit: 'cover' }).jpeg({ quality: 80 }).toFile(thumb);
    const imageUrl = `/uploads/reference-photos/${fname}`;
    const thumbnailUrl = `/uploads/reference-photos/thumbnails/${tname}`;

    const provider = ai.getProvider();
    let vec = null; try { vec = await provider.embedImage(req.file.buffer); } catch { vec = null; }
    const row = await MenuReferencePhoto.create({
      restaurant_id: restaurantId, product_id: productId, image_url: imageUrl, thumbnail_url: thumbnailUrl,
      source: 'staff_upload', embedding: vec, embedding_model: provider.model, embedding_dim: vec ? vec.length : null,
      is_active: true, created_by: req.user.id,
    });
    return res.status(201).json({ success: true, data: { id: row.id, image_url: imageUrl, thumbnail_url: thumbnailUrl } });
  } catch (e) {
    console.error('[ai-serving] ref upload error:', e.message);
    return fail(res, 500, 'upload failed');
  }
});

// ───────────────────────── 6. reference-photos 삭제 (RA, staff_upload 만) ─────────────────────────
router.delete('/:restaurantId/reference-photos/:id', authenticateToken, checkRestaurantAccess, gate,
  requireRole('Restaurant Admin', 'System Admin'), async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const row = await MenuReferencePhoto.findByPk(parseInt(req.params.id, 10));
    if (!row || row.restaurant_id !== restaurantId) return fail(res, 404, 'not found');
    if (row.source !== 'staff_upload') return fail(res, 400, 'menu_image refs are managed by reconcile, not deletable here');
    await row.update({ is_active: false });
    return res.json({ success: true, data: { id: row.id } });
  } catch (e) { return fail(res, 500, 'delete failed'); }
});

// ───────────────────────── 7. refresh-embeddings (시드 리컨실, 멱등) ─────────────────────────
router.post('/:restaurantId/refresh-embeddings', authenticateToken, checkRestaurantAccess, gate,
  requireRole('Restaurant Admin', 'System Admin'), async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const provider = ai.getProvider();
    // ② image_url ≠ 현재 Product.image 인 menu_image 행 비활성(이미지 교체 자연 반영)
    const seeds = await MenuReferencePhoto.findAll({ where: { restaurant_id: restaurantId, source: 'menu_image', is_active: true } });
    const products = await Product.findAll({ where: { restaurant_id: restaurantId }, attributes: ['id', 'image'] });
    const curImg = new Map(products.map(p => [p.id, p.image]));
    for (const s of seeds) { if (curImg.get(s.product_id) !== s.image_url) await s.update({ is_active: false }); }
    // ①③ 시드 + 재임베딩
    const result = await seedFromProductImages(restaurantId, provider);
    return res.json({ success: true, data: { ...result, model: provider.model } });
  } catch (e) { return fail(res, 500, 'refresh failed'); }
});

module.exports = router;
