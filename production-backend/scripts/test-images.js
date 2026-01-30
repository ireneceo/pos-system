/**
 * 이미지 마이그레이션 결과 테스트
 */

require('../config/env-loader')();
const Product = require('../models/Product');

async function test() {
  console.log('=== 이미지 마이그레이션 테스트 ===\n');

  // 1. URL 형식으로 저장된 이미지 확인
  const urlProduct = await Product.findOne({
    where: { id: 14 }
  });
  console.log('[ 마이그레이션된 상품 (ID 14) ]');
  console.log('image:', urlProduct?.image);
  console.log('image_thumbnail:', urlProduct?.image_thumbnail);

  // 2. 기존 JSON 형식 이미지 확인
  const jsonProduct = await Product.findOne({
    where: { id: 4 }
  });
  console.log('\n[ JSON 형식 상품 (ID 4) ]');
  console.log('image 길이:', jsonProduct?.image?.length || 0, 'bytes');
  console.log('image 시작:', jsonProduct?.image?.substring(0, 50));

  // 3. 전체 상품 중 이미지 유형별 개수
  const allProducts = await Product.findAll({
    attributes: ['id', 'image', 'image_thumbnail']
  });

  let urlCount = 0, jsonCount = 0, base64Count = 0, noImage = 0;

  allProducts.forEach(p => {
    if (!p.image) {
      noImage++;
    } else if (p.image.startsWith('/uploads/')) {
      urlCount++;
    } else if (p.image.startsWith('{')) {
      jsonCount++;
    } else if (p.image.startsWith('data:')) {
      base64Count++;
    }
  });

  console.log('\n[ 이미지 유형별 통계 ]');
  console.log('URL 형식:', urlCount);
  console.log('JSON 형식:', jsonCount);
  console.log('Base64 형식:', base64Count);
  console.log('이미지 없음:', noImage);
  console.log('총 상품:', allProducts.length);

  // 4. 이미지 데이터 크기 계산
  let totalSize = 0;
  allProducts.forEach(p => {
    if (p.image) totalSize += p.image.length;
  });
  console.log('\n[ DB 이미지 데이터 총 크기 ]');
  console.log('총:', Math.round(totalSize / 1024), 'KB');

  process.exit(0);
}

test().catch(e => {
  console.error(e);
  process.exit(1);
});
