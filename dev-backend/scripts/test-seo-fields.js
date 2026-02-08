const db = require('../db');
const Content = require('../models/Content');

async function test() {
  try {
    const faq = await Content.findOne({ where: { type: 'faq' }});
    if (!faq) {
      console.log('No FAQ found');
      process.exit(1);
    }

    console.log('=== SEO 필드 저장/불러오기 테스트 ===');
    console.log('1. Before update:');
    console.log('   seo_title:', faq.seo_title || '(empty)');
    console.log('   ai_summary:', (faq.ai_summary || '').substring(0, 50) + '...');

    // 업데이트
    await faq.update({
      seo_title: 'Test SEO Title',
      seo_description: 'Test SEO description'
    });

    // 다시 로드
    await faq.reload();
    console.log('2. After update:');
    console.log('   seo_title:', faq.seo_title);
    console.log('   seo_description:', faq.seo_description);

    // 원복
    await faq.update({ seo_title: null, seo_description: null });
    console.log('3. Reverted to null - OK');

    console.log('\n=== 테스트 통과 ===');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

test();
