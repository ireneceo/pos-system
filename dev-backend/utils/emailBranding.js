/**
 * Entity email branding helper
 *
 * 이메일 헤더/푸터에 표시할 브랜딩 정보(로고, 이름, 색상, 웹사이트, 회사명)를 반환.
 * emailLayout(body, branding) 에 그대로 전달 가능.
 *
 * 로고 처리 규칙:
 * - logo_url 이 /uploads/... 로컬 파일이면 → CID 첨부 방식 (cid:entity-logo-xxx)
 *   이유: Gmail 등 이메일 클라이언트의 이미지 프록시가 외부 URL(dev 서브도메인 등)을 가져오지 못하는 경우가 있어,
 *         파일 바이너리를 첨부로 보내야 확실히 렌더됨. PurpleHere 기본 로고도 동일 방식.
 * - logo_url 이 외부 http(s) URL이면 → 그대로 사용 (best-effort)
 * - logo_url 없거나 파일 존재 안함 → null (호출부/템플릿이 텍스트 이름으로 fallback)
 *
 * 호출부 책임:
 *   const branding = await getEntityBranding('restaurant', id);
 *   mailOptions.html = emailLayout(body, branding);
 *   mailOptions.attachments = [...(mailOptions.attachments || []), ...(branding?.logoAttachment || [])];
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Restaurant = require('../models/Restaurant');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');

// 이메일 헤더 로고 타겟: height 40px 고정, max-width 280px cap
const LOGO_TARGET_HEIGHT = 40;
const LOGO_MAX_WIDTH = 280;

function platformBaseUrl() {
  return process.env.FRONTEND_URL
    || (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');
}

/**
 * 상대 경로(/uploads/...)를 절대 URL로, 이미 절대면 그대로
 */
function toAbsoluteUrl(url) {
  if (!url || typeof url !== 'string') return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return platformBaseUrl() + url;
  return null;
}

/**
 * logo_url 을 CID 첨부 형태로 변환.
 *
 * **이미 리사이즈된 바이너리를 첨부** → 이메일 클라이언트는 원본 크기로 그대로 렌더
 * → HTML/CSS width·height 조작 불필요 → 어떤 렌더러에서도 고정 크기 보장.
 *
 * 규칙:
 * - 타겟 height 40px, max width 280px
 * - fit: 'inside' withoutEnlargement → 원본 작으면 그대로, 크면 축소, aspect ratio 유지
 * - JPEG/PNG 판별: 투명도 있는 파일은 PNG 유지, 외엔 JPEG (용량 절감)
 *
 * @returns {{ logoUrl, logoAttachment, logoWidth, logoHeight } | null}
 */
async function resolveLogoAsCid(logoUrlDbValue, entityType, entityId) {
  if (!logoUrlDbValue || typeof logoUrlDbValue !== 'string') return null;

  // 외부 URL: 리사이즈 불가 → 첨부 없이 URL만 사용 (best effort)
  if (logoUrlDbValue.startsWith('http://') || logoUrlDbValue.startsWith('https://')) {
    return { logoUrl: logoUrlDbValue, logoAttachment: null, logoWidth: null, logoHeight: LOGO_TARGET_HEIGHT };
  }

  if (!logoUrlDbValue.startsWith('/uploads/')) return null;
  const filePath = path.join('/var/www', logoUrlDbValue);
  try {
    if (!fs.existsSync(filePath)) return null;
  } catch {
    return null;
  }

  try {
    const meta = await sharp(filePath).metadata();
    const hasAlpha = !!meta.hasAlpha;
    const outExt = hasAlpha ? 'png' : 'jpg';

    // 리사이즈: height 40 고정, max-width 280, aspect ratio 유지
    const resizeOpts = {
      width: LOGO_MAX_WIDTH,
      height: LOGO_TARGET_HEIGHT,
      fit: 'inside',
      withoutEnlargement: false
    };

    let pipeline = sharp(filePath).resize(resizeOpts);
    if (hasAlpha) {
      pipeline = pipeline.png({ quality: 90 });
    } else {
      pipeline = pipeline.jpeg({ quality: 88 });
    }
    const buffer = await pipeline.toBuffer();

    // 최종 실제 크기 확인
    const finalMeta = await sharp(buffer).metadata();

    const cid = `entity-logo-${entityType}-${entityId}`;
    const contentType = hasAlpha ? 'image/png' : 'image/jpeg';
    return {
      logoUrl: `cid:${cid}`,
      logoAttachment: [{
        filename: `logo.${outExt}`,
        content: buffer,
        contentType,
        cid,
        contentDisposition: 'inline',
        encoding: 'base64'
      }],
      logoWidth: finalMeta.width,
      logoHeight: finalMeta.height
    };
  } catch (e) {
    console.warn('resolveLogoAsCid: sharp resize failed for', filePath, e.message);
    return null;
  }
}

async function buildBranding(entityType, entityId, fields) {
  const { name, logo_url, website, company_name, color } = fields;
  const logoResolved = await resolveLogoAsCid(logo_url, entityType, entityId);
  return {
    name,
    logoUrl: logoResolved?.logoUrl || null,
    logoAttachment: logoResolved?.logoAttachment || null,
    logoWidth: logoResolved?.logoWidth || null,
    logoHeight: logoResolved?.logoHeight || null,
    website: website || null,
    companyName: company_name || name,
    color
  };
}

/**
 * @param {'restaurant'|'brand'|'foodcourt'} entityType
 * @param {number} entityId
 * @returns {Promise<{name,logoUrl,logoAttachment,website,companyName,color}|null>}
 */
async function getEntityBranding(entityType, entityId) {
  if (!entityType || !entityId) return null;

  try {
    if (entityType === 'restaurant') {
      const r = await Restaurant.findByPk(entityId);
      if (!r) return null;
      return await buildBranding('restaurant', entityId, {
        name: r.name,
        logo_url: r.logo_url,
        website: r.website,
        company_name: r.name,
        color: '#635BFF'
      });
    }

    if (entityType === 'brand') {
      const b = await Brand.findByPk(entityId);
      if (!b) return null;
      return await buildBranding('brand', entityId, {
        name: b.name,
        logo_url: b.logo_url,
        website: b.website,
        company_name: b.company_name || b.name,
        color: '#635BFF'
      });
    }

    if (entityType === 'foodcourt') {
      const f = await Foodcourt.findByPk(entityId);
      if (!f) return null;
      return await buildBranding('foodcourt', entityId, {
        name: f.name,
        logo_url: f.logo_url,
        website: f.website,
        company_name: f.company_name || f.name,
        color: '#059669'
      });
    }

    return null;
  } catch (e) {
    console.error('getEntityBranding error:', e.message);
    return null;
  }
}

module.exports = {
  getEntityBranding,
  toAbsoluteUrl
};
