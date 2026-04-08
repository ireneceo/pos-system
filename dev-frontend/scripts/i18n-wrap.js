#!/usr/bin/env node
/**
 * i18n Auto-Wrapper Script
 *
 * Scans TSX files and wraps hardcoded English text with t() calls.
 * Generates translation keys and updates JSON files for all 4 languages.
 *
 * Usage: node scripts/i18n-wrap.js <directory>
 * Example: node scripts/i18n-wrap.js src/pages/Login
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'public', 'locales');
const LANGUAGES = ['en', 'ko', 'zh', 'ms'];

// Load existing translations
function loadJSON(filePath) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch { return {}; }
}

// Korean translations for common UI patterns
const KO = {
  // Common page elements
  'Loading...': '불러오는 중...',
  'Save': '저장', 'Cancel': '취소', 'Delete': '삭제', 'Edit': '수정',
  'Add': '추가', 'Close': '닫기', 'Confirm': '확인', 'Submit': '제출',
  'Search': '검색', 'Filter': '필터', 'Export': '내보내기', 'Import': '가져오기',
  'Back': '뒤로', 'Next': '다음', 'Create': '생성', 'Update': '업데이트',
  'Yes': '예', 'No': '아니오', 'OK': '확인', 'Reset': '초기화',
  'Actions': '작업', 'Status': '상태', 'Name': '이름', 'Email': '이메일',
  'Phone': '전화번호', 'Address': '주소', 'Date': '날짜', 'Description': '설명',
  'Notes': '메모', 'Type': '유형', 'Category': '카테고리', 'Price': '가격',
  'Total': '합계', 'Subtotal': '소계', 'Tax': '세금', 'Discount': '할인',
  'Quantity': '수량', 'Amount': '금액',
  'Active': '활성', 'Inactive': '비활성', 'Pending': '대기중',
  'Paid': '결제완료', 'Unpaid': '미결제', 'Overdue': '연체',
  'All': '전체', 'None': '없음',
  'No data available': '데이터가 없습니다',
  'No results found': '검색 결과가 없습니다',
  'Are you sure?': '정말 진행하시겠습니까?',
  'Saving...': '저장 중...', 'Deleting...': '삭제 중...',
  'Select': '선택', 'Upload': '업로드', 'Download': '다운로드',
  'Print': '인쇄', 'Copy': '복사', 'Send': '보내기',
  'Password': '비밀번호', 'Username': '사용자명',
  'Sign In': '로그인', 'Sign Up': '회원가입', 'Sign Out': '로그아웃',
  'Forgot your password?': '비밀번호를 잊으셨나요?',
  'Remember me': '자동 로그인',
  'or': '또는', 'and': '그리고',
  'Required': '필수', 'Optional': '선택',
  'Settings': '설정', 'Profile': '프로필', 'Dashboard': '대시보드',
  'Notifications': '알림', 'Help': '도움말',
  'Today': '오늘', 'Yesterday': '어제', 'This Week': '이번 주', 'This Month': '이번 달',
  'Revenue': '매출', 'Orders': '주문', 'Customers': '고객',
  'Menu': '메뉴', 'Inventory': '재고', 'Recipes': '레시피',
  'Staff': '직원', 'Invoices': '인보이스',
  'Image': '이미지', 'Role': '역할', 'Created': '생성일',
};

const ZH = {
  'Loading...': '加载中...',
  'Save': '保存', 'Cancel': '取消', 'Delete': '删除', 'Edit': '编辑',
  'Add': '添加', 'Close': '关闭', 'Confirm': '确认', 'Submit': '提交',
  'Search': '搜索', 'Filter': '筛选', 'Export': '导出', 'Import': '导入',
  'Back': '返回', 'Next': '下一步', 'Create': '创建', 'Update': '更新',
  'Yes': '是', 'No': '否', 'OK': '确定', 'Reset': '重置',
  'Actions': '操作', 'Status': '状态', 'Name': '名称', 'Email': '邮箱',
  'Phone': '电话', 'Address': '地址', 'Date': '日期', 'Description': '描述',
  'Notes': '备注', 'Type': '类型', 'Category': '分类', 'Price': '价格',
  'Total': '总计', 'Subtotal': '小计', 'Tax': '税费', 'Discount': '折扣',
  'Quantity': '数量', 'Amount': '金额',
  'Active': '已启用', 'Inactive': '已停用', 'Pending': '待处理',
  'Paid': '已支付', 'Unpaid': '未支付', 'Overdue': '逾期',
  'All': '全部', 'None': '无',
  'No data available': '暂无数据',
  'No results found': '未找到结果',
  'Are you sure?': '确定要继续吗？',
  'Saving...': '保存中...', 'Deleting...': '删除中...',
  'Select': '选择', 'Upload': '上传', 'Download': '下载',
  'Print': '打印', 'Copy': '复制', 'Send': '发送',
  'Password': '密码', 'Username': '用户名',
  'Sign In': '登录', 'Sign Up': '注册', 'Sign Out': '退出',
  'Forgot your password?': '忘记密码？',
  'Remember me': '记住我',
  'or': '或', 'and': '和',
  'Required': '必填', 'Optional': '可选',
  'Settings': '设置', 'Profile': '个人资料', 'Dashboard': '仪表盘',
  'Notifications': '通知', 'Help': '帮助',
  'Today': '今天', 'Yesterday': '昨天', 'This Week': '本周', 'This Month': '本月',
  'Revenue': '收入', 'Orders': '订单', 'Customers': '顾客',
  'Menu': '菜单', 'Inventory': '库存', 'Recipes': '食谱',
  'Staff': '员工', 'Invoices': '发票',
  'Image': '图片', 'Role': '角色', 'Created': '创建时间',
};

const MS = {
  'Loading...': 'Memuatkan...',
  'Save': 'Simpan', 'Cancel': 'Batal', 'Delete': 'Padam', 'Edit': 'Sunting',
  'Add': 'Tambah', 'Close': 'Tutup', 'Confirm': 'Sahkan', 'Submit': 'Hantar',
  'Search': 'Carian', 'Filter': 'Tapis', 'Export': 'Eksport', 'Import': 'Import',
  'Back': 'Kembali', 'Next': 'Seterusnya', 'Create': 'Cipta', 'Update': 'Kemas Kini',
  'Yes': 'Ya', 'No': 'Tidak', 'OK': 'OK', 'Reset': 'Set Semula',
  'Actions': 'Tindakan', 'Status': 'Status', 'Name': 'Nama', 'Email': 'E-mel',
  'Phone': 'Telefon', 'Address': 'Alamat', 'Date': 'Tarikh', 'Description': 'Keterangan',
  'Notes': 'Nota', 'Type': 'Jenis', 'Category': 'Kategori', 'Price': 'Harga',
  'Total': 'Jumlah', 'Subtotal': 'Jumlah Kecil', 'Tax': 'Cukai', 'Discount': 'Diskaun',
  'Quantity': 'Kuantiti', 'Amount': 'Amaun',
  'Active': 'Aktif', 'Inactive': 'Tidak Aktif', 'Pending': 'Menunggu',
  'Paid': 'Telah Dibayar', 'Unpaid': 'Belum Dibayar', 'Overdue': 'Tertunggak',
  'All': 'Semua', 'None': 'Tiada',
  'No data available': 'Tiada data',
  'No results found': 'Tiada hasil ditemui',
  'Are you sure?': 'Adakah anda pasti?',
  'Saving...': 'Menyimpan...', 'Deleting...': 'Memadamkan...',
  'Select': 'Pilih', 'Upload': 'Muat Naik', 'Download': 'Muat Turun',
  'Print': 'Cetak', 'Copy': 'Salin', 'Send': 'Hantar',
  'Password': 'Kata Laluan', 'Username': 'Nama Pengguna',
  'Sign In': 'Log Masuk', 'Sign Up': 'Daftar', 'Sign Out': 'Log Keluar',
  'Forgot your password?': 'Lupa kata laluan?',
  'Remember me': 'Ingat saya',
  'or': 'atau', 'and': 'dan',
  'Required': 'Wajib', 'Optional': 'Pilihan',
  'Settings': 'Tetapan', 'Profile': 'Profil', 'Dashboard': 'Papan Pemuka',
  'Notifications': 'Pemberitahuan', 'Help': 'Bantuan',
  'Today': 'Hari Ini', 'Yesterday': 'Semalam', 'This Week': 'Minggu Ini', 'This Month': 'Bulan Ini',
  'Revenue': 'Hasil', 'Orders': 'Pesanan', 'Customers': 'Pelanggan',
  'Menu': 'Menu', 'Inventory': 'Inventori', 'Recipes': 'Resipi',
  'Staff': 'Kakitangan', 'Invoices': 'Invois',
  'Image': 'Gambar', 'Role': 'Peranan', 'Created': 'Dicipta',
};

function toKey(text) {
  return text
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .split(/\s+/)
    .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

function getNamespace(filePath) {
  const dir = path.basename(path.dirname(filePath)).toLowerCase();
  const nsMap = {
    'login': 'auth', 'admin': 'admin', 'dashboard': 'dashboard',
    'brandgeneral': 'brand', 'foodcourtgeneral': 'foodcourt',
    'manager': 'admin', 'owner': 'owner', 'restaurant': 'settings',
    'menumanagement': 'menu', 'categorymanagement': 'menu',
    'optionmanagement': 'menu', 'liveorders': 'orders',
    'posterminal': 'pos', 'kitchendisplay': 'kitchen',
    'settings': 'settings', 'staff': 'staff', 'customers': 'customers',
    'invoicesettings': 'invoices', 'suppliers': 'suppliers',
    'floorplan': 'floorplan', 'recipes': 'recipes', 'recipemanagement': 'recipes',
    'inventory': 'inventory', 'brandinventory': 'inventory',
    'ingredients': 'inventory', 'reports': 'reports', 'sales': 'reports',
    'profile': 'settings', 'companyinformation': 'settings',
    'companyprofile': 'settings', 'notificationsettings': 'notifications',
    'promotions': 'menu', 'landing': 'landing', 'basic': 'dashboard',
    'brandproductmanagement': 'brand', 'brandproductrecipe': 'brand',
    'productrecipe': 'recipes', 'tablemanagement': 'settings',
    'activityhistory': 'admin', 'checkoutdisplay': 'pos',
    'customerdisplay': 'pos', 'billprint': 'pos',
  };
  return nsMap[dir] || 'common';
}

// Process a single TSX file
function processFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  const ns = getNamespace(filePath);
  const pageName = path.basename(filePath, '.tsx');
  const translations = { en: {}, ko: {}, zh: {}, ms: {} };
  let replacements = 0;

  // Skip files that already have useTranslation
  // (but we still want to process them for remaining hardcoded text)

  // Pattern 1: >Text</tag>  (JSX text content)
  code = code.replace(/>([A-Z][A-Za-z0-9 &/,.'!?()-]+)</g, (match, text) => {
    const trimmed = text.trim();
    if (trimmed.length < 2 || trimmed.length > 80) return match;
    if (/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(trimmed) && trimmed.includes('.')) return match; // Looks like a name
    if (/^\d/.test(trimmed)) return match; // Starts with number
    if (trimmed.includes('{') || trimmed.includes('$')) return match; // Has interpolation

    const key = toKey(trimmed);
    if (!key || key.length < 2) return match;

    const fullKey = `${pageName.charAt(0).toLowerCase() + pageName.slice(1)}.${key}`;
    translations.en[fullKey] = trimmed;
    translations.ko[fullKey] = KO[trimmed] || trimmed;
    translations.zh[fullKey] = ZH[trimmed] || trimmed;
    translations.ms[fullKey] = MS[trimmed] || trimmed;
    replacements++;
    return `>{t('${ns}:${fullKey}')}<`;
  });

  if (replacements === 0) return { replacements: 0 };

  // Add useTranslation import if not present
  if (!code.includes('useTranslation')) {
    // Add import after last import
    const lastImport = code.lastIndexOf('\nimport ');
    if (lastImport >= 0) {
      const endOfLine = code.indexOf('\n', lastImport + 1);
      code = code.slice(0, endOfLine + 1) +
        "import { useTranslation } from 'react-i18next';\n" +
        code.slice(endOfLine + 1);
    }
  }

  // Add const { t } = useTranslation() if not present
  if (!code.includes('const { t }') && !code.includes('} = useTranslation')) {
    // Find the first useState or useEffect or useNavigate or return (
    const hookPattern = /const \{ .+ \} = use\w+\(/;
    const match = code.match(hookPattern);
    if (match) {
      const idx = code.indexOf(match[0]);
      code = code.slice(0, idx) + `const { t } = useTranslation('${ns}');\n  ` + code.slice(idx);
    } else {
      // Find "return (" and add before it
      const retIdx = code.indexOf('  return (');
      if (retIdx >= 0) {
        code = code.slice(0, retIdx) + `  const { t } = useTranslation('${ns}');\n\n` + code.slice(retIdx);
      }
    }
  }

  // Save modified TSX
  fs.writeFileSync(filePath, code, 'utf8');

  // Merge translations into namespace JSON files
  for (const lang of LANGUAGES) {
    const jsonPath = path.join(LOCALES_DIR, lang, `${ns}.json`);
    const existing = loadJSON(jsonPath);
    const merged = { ...existing, ...translations[lang] };
    fs.writeFileSync(jsonPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
  }

  return { replacements, ns, translations: Object.keys(translations.en).length };
}

// Main
const targetDir = process.argv[2];
if (!targetDir) {
  console.log('Usage: node scripts/i18n-wrap.js <directory>');
  console.log('Example: node scripts/i18n-wrap.js src/pages/Login');
  process.exit(1);
}

const fullPath = path.resolve(targetDir);
if (!fs.existsSync(fullPath)) {
  console.error('Directory not found:', fullPath);
  process.exit(1);
}

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith('.tsx')) files.push(p);
  }
}
walk(fullPath);

let total = 0;
for (const f of files) {
  const result = processFile(f);
  if (result.replacements > 0) {
    console.log(`${path.relative(process.cwd(), f)}: ${result.replacements} strings → ${result.ns}.json`);
    total += result.replacements;
  }
}
console.log(`\nTotal: ${total} strings wrapped in ${files.length} files`);
