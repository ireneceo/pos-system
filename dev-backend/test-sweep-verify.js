// 검증: 12 페이지 sweep 코드 정합성 + 빌드된 chunk 안 검증
const fs = require('fs');

(() => {
  let pass = 0, fail = 0;
  const ok = (m) => { console.log(`  ✓ ${m}`); pass++; };
  const ng = (m) => { console.log(`  ✗ ${m}`); fail++; };

  // === 1. 12 페이지 모두 SortDropdown import + 사용 ===
  console.log('=== 1. 12 sweep pages have SortDropdown import + use ===');
  const FE = '/var/www/dev-frontend';
  const pages = [
    'pages/MenuManagement/MenuManagementPage.tsx',
    'pages/BrandGeneral/BrandMenusPage.tsx',
    'pages/BrandProductManagement/BrandProductsTab.tsx',
    'pages/BrandProductManagement/BrandProductOptionsTab.tsx',
    'pages/BrandProductRecipe/ProductRecipesTab.tsx',
    'pages/BrandProductRecipe/ProductIngredientsTab.tsx',
    'pages/FoodcourtGeneral/FoodcourtProductsTab.tsx',
    'pages/Admin/SystemProductManagementPage.tsx',
    'pages/Supplier/SupplierProductsTab.tsx',
    'pages/RecipeManagement/RecipesTab.tsx',
    'pages/RecipeManagement/IngredientsTab.tsx',
    'pages/Ingredients/IngredientsPage.tsx'
  ];
  pages.forEach(p => {
    const src = fs.readFileSync(`${FE}/src/${p}`, 'utf-8');
    const has_import = /import\s+SortDropdown,\s*\{\s*SortKey,\s*sortItems\s*\}\s*from\s*'.*SortDropdown'/.test(src);
    const has_state = /const\s+\[sortKey,\s*setSortKey\]\s*=\s*useState<SortKey>\(['"]newest['"]\)/.test(src);
    const has_render = /<SortDropdown\s+value=\{sortKey\}\s+onChange=\{setSortKey\}/.test(src);
    const has_sort_call = /sortItems\(/.test(src);
    if (has_import && has_state && has_render && has_sort_call) {
      ok(`${p.split('/').pop()}: import + state + render + sortItems all present`);
    } else {
      ng(`${p.split('/').pop()}: import=${has_import} state=${has_state} render=${has_render} call=${has_sort_call}`);
    }
  });

  // === 2. RecipesTab 안전 재적용 — 4 곳 모두 검출 ===
  console.log('\n=== 2. RecipesTab — was reverted then re-applied safely ===');
  const recipe = fs.readFileSync(`${FE}/src/pages/RecipeManagement/RecipesTab.tsx`, 'utf-8');
  const lines = recipe.split('\n');
  const importLine = lines.findIndex(l => /import SortDropdown/.test(l));
  const stateLine = lines.findIndex(l => /\[sortKey,\s*setSortKey\]/.test(l));
  const sortCallLine = lines.findIndex(l => /filteredRecipes\s*=\s*sortItems/.test(l));
  const renderLine = lines.findIndex(l => /<SortDropdown\s+value=\{sortKey\}/.test(l));
  importLine > 0 ? ok(`import line ${importLine + 1}`) : ng(`import missing`);
  stateLine > 0 ? ok(`useState sortKey line ${stateLine + 1}`) : ng(`state missing`);
  sortCallLine > 0 ? ok(`sortItems wrap line ${sortCallLine + 1}`) : ng(`sortItems missing`);
  renderLine > 0 ? ok(`SortDropdown render line ${renderLine + 1}`) : ng(`render missing`);

  // === 3. SortDropdown component file integrity ===
  console.log('\n=== 3. SortDropdown utility integrity ===');
  const sd = fs.readFileSync(`${FE}/src/components/Common/SortDropdown.tsx`, 'utf-8');
  /export type SortKey/.test(sd) ? ok(`exports SortKey type`) : ng(`SortKey missing`);
  /export function sortItems/.test(sd) ? ok(`exports sortItems function`) : ng(`sortItems missing`);
  /case 'newest':/.test(sd) ? ok(`handles 'newest' case`) : ng(`newest missing`);
  /case 'category':/.test(sd) ? ok(`handles 'category' case`) : ng(`category missing`);

  // === 4. Bundle has sort strings ===
  console.log('\n=== 4. Built bundle has sort UI strings ===');
  const idx = fs.readFileSync(`${FE}-build/index.html`, 'utf-8');
  const m = idx.match(/main\.([a-f0-9]+)\.js/);
  const mainJs = fs.readFileSync(`${FE}-build/static/js/main.${m[1]}.js`, 'utf-8');
  /sort\.newest/.test(mainJs) || /Newest first/.test(mainJs)
    ? ok(`main.js contains sort.newest key or 'Newest first' string`)
    : ng(`main.js missing sort i18n key`);

  // search chunks for at least one page with Newest first label
  const chunks = fs.readdirSync(`${FE}-build/static/js/`).filter(f => f.endsWith('.chunk.js'));
  const withSort = chunks.filter(c => {
    try { return fs.readFileSync(`${FE}-build/static/js/${c}`, 'utf-8').includes('Newest first'); }
    catch { return false; }
  });
  withSort.length >= 5 ? ok(`${withSort.length} chunks contain 'Newest first' (sweep across many pages)`) : ng(`only ${withSort.length} chunks — sweep incomplete?`);

  // === 5. i18n 4 langs sort keys ===
  console.log('\n=== 5. i18n 4 langs sort keys ===');
  for (const lang of ['en','ko','zh','ms']) {
    const j = JSON.parse(fs.readFileSync(`${FE}/public/locales/${lang}/common.json`, 'utf-8'));
    const k = ['sort.newest','sort.oldest','sort.nameAsc','sort.nameDesc','sort.priceAsc','sort.priceDesc','sort.category','sort.ariaLabel'];
    const missing = k.filter(x => !(x in j));
    missing.length === 0 ? ok(`${lang}: all 8 sort keys present`) : ng(`${lang}: missing ${missing.join(',')}`);
  }

  // === 6. No orphan SortDropdown JSX without state (the previous bug) ===
  console.log('\n=== 6. No "<SortDropdown value={sortKey}" without sortKey state ===');
  pages.forEach(p => {
    const src = fs.readFileSync(`${FE}/src/${p}`, 'utf-8');
    const renderCount = (src.match(/<SortDropdown\s+value=\{sortKey\}/g) || []).length;
    const stateCount = (src.match(/\[sortKey,\s*setSortKey\]/g) || []).length;
    renderCount > 0 && stateCount === 0 ? ng(`${p.split('/').pop()}: orphan render — would ReferenceError`) : (renderCount > 0 ? ok(`${p.split('/').pop()}: render+state paired`) : null);
  });

  console.log(`\nResult: ${pass} pass, ${fail} fail`);
  process.exit(fail === 0 ? 0 : 1);
})();
