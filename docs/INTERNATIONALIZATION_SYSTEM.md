# Internationalization (i18n) System Design

> **문서 버전:** 1.0
> **작성일:** 2026-04-08
> **규모:** 중 (기능 변경 없음, 전체 UI 텍스트 래핑 + 번역)
> **범위:** Option A — UI 텍스트만 번역 (사용자 입력 데이터는 원본 유지)

---

## 1. 개요

### 1.1 목적
PurpleHere POS 전체 UI와 이메일을 4개 언어로 제공한다.

| 코드 | 언어 | 대상 사용자 |
|------|------|------------|
| `en` | English | 기본 (fallback) |
| `ko` | 한국어 | 한국인 식당 사장, 직원 |
| `zh` | 中文 (简体) | 중국계 사업가, 직원 |
| `ms` | Bahasa Melayu | 말레이계/인도네시아 직원 |

### 1.2 핵심 원칙

1. **UI 텍스트만 번역** — 메뉴 이름, 카테고리명 등 사용자가 입력한 데이터는 원본 그대로 표시
2. **영어가 원본(source of truth)** — 다른 언어는 영어 키 기준으로 번역
3. **용어집(Glossary) 기반 번역** — 모든 번역은 확정된 용어집을 따름
4. **검증 자동화** — 누락, 불일치, 용어집 위반을 빌드 시 자동 감지
5. **하드코딩 텍스트 = 버그** — 새 코드에 하드코딩 영어 문자열은 허용하지 않음

### 1.3 번역 범위

| 대상 | 포함 여부 | 비고 |
|------|:---------:|------|
| POS 관리 화면 (Dashboard, Orders, Menu 등) | O | 전체 |
| POS Terminal / Kitchen Display / Checkout | O | 직원이 가장 많이 사용 |
| Brand/Foodcourt General 화면 | O | 전체 |
| Owner 화면 | O | 전체 |
| System Admin 화면 | O | 전체 |
| Login / Signup / Profile | O | 전체 |
| Landing 페이지 (Home, Features, Pricing 등) | O | 마케팅 텍스트 포함 |
| 이메일 템플릿 | O | 수신자 언어 설정에 따라 |
| 사용자 입력 데이터 (메뉴명, 레스토랑명 등) | X | 원본 유지 |
| API 에러 메시지 (백엔드) | X | 프론트에서 번역 키로 매핑 |

---

## 2. 기술 아키텍처

### 2.1 프레임워크

```
react-i18next (프론트엔드)
  └── i18next (코어 엔진)
       ├── i18next-http-backend (번역 파일 lazy loading)
       └── i18next-browser-languagedetector (초기 언어 감지)

date-fns/locale (날짜 포맷 로컬라이즈 — 이미 설치됨)
```

### 2.2 동작 흐름

```
[유저 로그인]
     │
     ▼
[서버] User.preferred_language 반환 (예: 'zh')
     │
     ▼
[프론트] i18next.changeLanguage('zh')
     │
     ▼
[i18next] locales/zh/ 번역 파일 로드
     │
     ▼
[렌더링] t('orders.title') → "订单管理"
     │
     ▼
[언어 변경 시] 설정 → API로 저장 → i18next 즉시 전환 (새로고침 없음)
```

### 2.3 언어 결정 우선순위

```
1. User.preferred_language (DB 저장값)
2. 브라우저 언어 (navigator.language) — 로그인 전 or 첫 방문
3. 'en' (fallback)
```

### 2.4 비로그인 화면 (Landing, Login, Signup)

- 브라우저 언어 자동 감지 → 지원 언어면 적용, 아니면 영어
- 헤더/푸터에 언어 선택 드롭다운 제공
- 선택값은 localStorage에 저장 → 로그인 후 DB로 동기화

---

## 3. 번역 파일 구조

### 3.1 디렉토리 레이아웃

```
dev-frontend/src/
└── locales/
    ├── en/
    │   ├── common.json          # 공통 (버튼, 상태, 액션, 빈 상태)
    │   ├── auth.json             # 로그인, 회원가입, 비밀번호
    │   ├── dashboard.json        # 대시보드
    │   ├── orders.json           # 주문 관리
    │   ├── menu.json             # 메뉴 관리
    │   ├── inventory.json        # 재고 관리
    │   ├── invoices.json         # 인보이스
    │   ├── staff.json            # 직원 관리
    │   ├── customers.json        # 고객 관리
    │   ├── pos.json              # POS Terminal
    │   ├── kitchen.json          # Kitchen Display
    │   ├── settings.json         # 설정
    │   ├── reports.json          # 리포트, 통계
    │   ├── brand.json            # Brand General 화면
    │   ├── foodcourt.json        # Foodcourt General 화면
    │   ├── owner.json            # Owner 화면
    │   ├── admin.json            # System Admin 화면
    │   ├── landing.json          # Landing 페이지
    │   ├── plans.json            # 구독 플랜
    │   ├── notifications.json    # 알림, 공지
    │   ├── floorplan.json        # 배치도
    │   ├── recipes.json          # 레시피
    │   ├── suppliers.json        # 공급업체
    │   ├── email.json            # 이메일 템플릿 (백엔드에서도 참조)
    │   └── validation.json       # 에러/검증 메시지
    ├── ko/
    │   └── (동일 구조)
    ├── zh/
    │   └── (동일 구조)
    └── ms/
        └── (동일 구조)
```

### 3.2 Namespace 분리 이유

- **Lazy loading**: POS Terminal 사용 시 admin.json을 로드할 필요 없음
- **유지보수**: 주문 관련 번역은 orders.json만 보면 됨
- **충돌 방지**: 같은 키 이름이 다른 맥락에서 다른 번역 가능

### 3.3 키 네이밍 규칙

```
{namespace}.{section}.{element}

예시:
orders.list.title          → "Order Management"
orders.list.empty          → "No orders found"
orders.detail.status       → "Order Status"
orders.action.cancel       → "Cancel Order"
common.button.save         → "Save"
common.button.cancel       → "Cancel"
common.status.active       → "Active"
common.empty.default       → "No data available"
validation.required        → "This field is required"
validation.email.invalid   → "Please enter a valid email address"
```

**규칙:**
- camelCase 사용 (`orderStatus` X → `order_status` X → `orderStatus` O)
- 3단계 이하 유지: `namespace.section.key` (깊은 중첩 금지)
- 동적 값은 interpolation: `t('orders.total', { count: 5 })` → "5 orders"
- 복수형: `t('orders.item', { count })` → i18next가 자동 처리

### 3.4 JSON 파일 구조 예시

```json
// en/common.json
{
  "button": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "close": "Close",
    "confirm": "Confirm",
    "submit": "Submit",
    "back": "Back",
    "next": "Next",
    "search": "Search",
    "filter": "Filter",
    "export": "Export",
    "import": "Import",
    "refresh": "Refresh",
    "create": "Create",
    "update": "Update",
    "apply": "Apply",
    "reset": "Reset",
    "viewAll": "View All",
    "loadMore": "Load More"
  },
  "status": {
    "active": "Active",
    "inactive": "Inactive",
    "pending": "Pending",
    "completed": "Completed",
    "cancelled": "Cancelled",
    "expired": "Expired",
    "draft": "Draft",
    "processing": "Processing",
    "paid": "Paid",
    "unpaid": "Unpaid",
    "overdue": "Overdue",
    "loading": "Loading...",
    "saving": "Saving...",
    "deleting": "Deleting..."
  },
  "empty": {
    "default": "No data available",
    "search": "No results found",
    "filter": "No items match the selected filters"
  },
  "confirm": {
    "delete": "Are you sure you want to delete this?",
    "cancel": "Are you sure you want to cancel?",
    "unsavedChanges": "You have unsaved changes. Are you sure you want to leave?"
  },
  "label": {
    "name": "Name",
    "email": "Email",
    "phone": "Phone",
    "address": "Address",
    "date": "Date",
    "time": "Time",
    "amount": "Amount",
    "total": "Total",
    "subtotal": "Subtotal",
    "tax": "Tax",
    "discount": "Discount",
    "quantity": "Quantity",
    "price": "Price",
    "description": "Description",
    "notes": "Notes",
    "status": "Status",
    "actions": "Actions",
    "type": "Type",
    "category": "Category",
    "all": "All",
    "none": "None"
  },
  "time": {
    "today": "Today",
    "yesterday": "Yesterday",
    "thisWeek": "This Week",
    "thisMonth": "This Month",
    "lastMonth": "Last Month",
    "custom": "Custom Range"
  },
  "pagination": {
    "showing": "Showing {{from}}-{{to}} of {{total}}",
    "rowsPerPage": "Rows per page",
    "page": "Page {{current}} of {{total}}"
  }
}
```

```json
// ko/common.json
{
  "button": {
    "save": "저장",
    "cancel": "취소",
    "delete": "삭제",
    "edit": "수정",
    "add": "추가",
    "close": "닫기",
    "confirm": "확인",
    "submit": "제출",
    "back": "뒤로",
    "next": "다음",
    "search": "검색",
    "filter": "필터",
    "export": "내보내기",
    "import": "가져오기",
    "refresh": "새로고침",
    "create": "생성",
    "update": "업데이트",
    "apply": "적용",
    "reset": "초기화",
    "viewAll": "전체 보기",
    "loadMore": "더 보기"
  }
}
```

---

## 4. 용어집 (Glossary) — 번역 품질의 핵심

### 4.1 용어집 파일

```
dev-frontend/src/locales/glossary.json
```

이 파일은 **모든 번역의 기준**이다. 번역 파일 작성 시 반드시 이 용어집을 따라야 하며, 검증 스크립트가 위반을 자동 감지한다.

### 4.2 용어집 구조

```json
{
  "_meta": {
    "description": "Official translation glossary. All translations MUST use these terms.",
    "lastUpdated": "2026-04-08"
  },
  "terms": {
    "Dashboard": {
      "ko": "대시보드",
      "zh": "仪表盘",
      "ms": "Papan Pemuka"
    },
    "Order": {
      "ko": "주문",
      "zh": "订单",
      "ms": "Pesanan"
    },
    "Invoice": {
      "ko": "인보이스",
      "zh": "发票",
      "ms": "Invois"
    },
    "Menu": {
      "ko": "메뉴",
      "zh": "菜单",
      "ms": "Menu"
    },
    "Restaurant": {
      "ko": "레스토랑",
      "zh": "餐厅",
      "ms": "Restoran"
    },
    "Customer": {
      "ko": "고객",
      "zh": "顾客",
      "ms": "Pelanggan"
    },
    "Staff": {
      "ko": "직원",
      "zh": "员工",
      "ms": "Kakitangan"
    },
    "Inventory": {
      "ko": "재고",
      "zh": "库存",
      "ms": "Inventori"
    },
    "Recipe": {
      "ko": "레시피",
      "zh": "食谱",
      "ms": "Resipi"
    },
    "Ingredient": {
      "ko": "식자재",
      "zh": "食材",
      "ms": "Bahan"
    },
    "Supplier": {
      "ko": "공급업체",
      "zh": "供应商",
      "ms": "Pembekal"
    },
    "Category": {
      "ko": "카테고리",
      "zh": "分类",
      "ms": "Kategori"
    },
    "Subscription": {
      "ko": "구독",
      "zh": "订阅",
      "ms": "Langganan"
    },
    "Plan": {
      "ko": "플랜",
      "zh": "套餐",
      "ms": "Pelan"
    },
    "Brand": {
      "ko": "브랜드",
      "zh": "品牌",
      "ms": "Jenama"
    },
    "Foodcourt": {
      "ko": "푸드코트",
      "zh": "美食广场",
      "ms": "Medan Selera"
    },
    "Floor Plan": {
      "ko": "배치도",
      "zh": "平面图",
      "ms": "Pelan Lantai"
    },
    "Kitchen": {
      "ko": "주방",
      "zh": "厨房",
      "ms": "Dapur"
    },
    "Table": {
      "ko": "테이블",
      "zh": "桌号",
      "ms": "Meja"
    },
    "Checkout": {
      "ko": "결제",
      "zh": "结账",
      "ms": "Pembayaran"
    },
    "Payment": {
      "ko": "결제",
      "zh": "付款",
      "ms": "Pembayaran"
    },
    "Discount": {
      "ko": "할인",
      "zh": "折扣",
      "ms": "Diskaun"
    },
    "Tax": {
      "ko": "세금",
      "zh": "税费",
      "ms": "Cukai"
    },
    "Report": {
      "ko": "리포트",
      "zh": "报告",
      "ms": "Laporan"
    },
    "Settings": {
      "ko": "설정",
      "zh": "设置",
      "ms": "Tetapan"
    },
    "Profile": {
      "ko": "프로필",
      "zh": "个人资料",
      "ms": "Profil"
    },
    "Notification": {
      "ko": "알림",
      "zh": "通知",
      "ms": "Pemberitahuan"
    },
    "Notice": {
      "ko": "공지",
      "zh": "公告",
      "ms": "Notis"
    },
    "Comment": {
      "ko": "댓글",
      "zh": "评论",
      "ms": "Komen"
    },
    "Save": {
      "ko": "저장",
      "zh": "保存",
      "ms": "Simpan"
    },
    "Delete": {
      "ko": "삭제",
      "zh": "删除",
      "ms": "Padam"
    },
    "Edit": {
      "ko": "수정",
      "zh": "编辑",
      "ms": "Sunting"
    },
    "Cancel": {
      "ko": "취소",
      "zh": "取消",
      "ms": "Batal"
    },
    "Confirm": {
      "ko": "확인",
      "zh": "确认",
      "ms": "Sahkan"
    },
    "Search": {
      "ko": "검색",
      "zh": "搜索",
      "ms": "Carian"
    },
    "Filter": {
      "ko": "필터",
      "zh": "筛选",
      "ms": "Tapis"
    },
    "Active": {
      "ko": "활성",
      "zh": "已启用",
      "ms": "Aktif"
    },
    "Inactive": {
      "ko": "비활성",
      "zh": "已停用",
      "ms": "Tidak Aktif"
    },
    "Pending": {
      "ko": "대기중",
      "zh": "待处理",
      "ms": "Menunggu"
    },
    "Completed": {
      "ko": "완료",
      "zh": "已完成",
      "ms": "Selesai"
    },
    "Cancelled": {
      "ko": "취소됨",
      "zh": "已取消",
      "ms": "Dibatalkan"
    },
    "Paid": {
      "ko": "결제완료",
      "zh": "已支付",
      "ms": "Telah Dibayar"
    },
    "Unpaid": {
      "ko": "미결제",
      "zh": "未支付",
      "ms": "Belum Dibayar"
    },
    "Overdue": {
      "ko": "연체",
      "zh": "逾期",
      "ms": "Tertunggak"
    },
    "Total": {
      "ko": "합계",
      "zh": "总计",
      "ms": "Jumlah"
    },
    "Subtotal": {
      "ko": "소계",
      "zh": "小计",
      "ms": "Jumlah Kecil"
    },
    "Quantity": {
      "ko": "수량",
      "zh": "数量",
      "ms": "Kuantiti"
    },
    "Price": {
      "ko": "가격",
      "zh": "价格",
      "ms": "Harga"
    },
    "Amount": {
      "ko": "금액",
      "zh": "金额",
      "ms": "Amaun"
    },
    "Owner": {
      "ko": "오너",
      "zh": "业主",
      "ms": "Pemilik"
    },
    "Manager": {
      "ko": "매니저",
      "zh": "经理",
      "ms": "Pengurus"
    },
    "Coupon": {
      "ko": "쿠폰",
      "zh": "优惠券",
      "ms": "Kupon"
    },
    "Promotion": {
      "ko": "프로모션",
      "zh": "促销",
      "ms": "Promosi"
    },
    "Dine-in": {
      "ko": "매장식사",
      "zh": "堂食",
      "ms": "Makan Di Sini"
    },
    "Takeaway": {
      "ko": "포장",
      "zh": "外卖",
      "ms": "Bungkus"
    },
    "Preparing": {
      "ko": "준비중",
      "zh": "准备中",
      "ms": "Sedang Disediakan"
    },
    "Ready": {
      "ko": "준비완료",
      "zh": "已准备好",
      "ms": "Sedia"
    },
    "Served": {
      "ko": "서빙완료",
      "zh": "已上菜",
      "ms": "Telah Dihidang"
    }
  }
}
```

### 4.3 용어집 운용 규칙

1. **용어집에 있는 단어는 반드시 용어집의 번역을 사용** — 예외 없음
2. **새 도메인 용어 추가 시 용어집부터 업데이트** → 번역 파일 작성
3. **용어집 변경 시 기존 번역 파일도 일괄 반영** (검증 스크립트가 불일치 감지)
4. **문맥에 따른 예외**: "Cancel"이 주문 취소와 모달 닫기에서 다를 수 있음 → 용어집에 별도 항목으로 등록

---

## 5. 품질 검증 시스템

### 5.1 검증 스크립트 (verify-translations.js)

```
dev-frontend/scripts/verify-translations.js
```

**실행 시점:** 빌드 전 자동 실행 (package.json scripts에 등록)

```json
{
  "scripts": {
    "i18n:verify": "node scripts/verify-translations.js",
    "build:dev": "npm run i18n:verify && react-scripts build && bash deploy-dev.sh"
  }
}
```

### 5.2 검증 항목 (7단계)

| # | 검증 | 설명 | 실패 시 |
|---|------|------|---------|
| 1 | **키 동기화** | en에 있는 키가 ko/zh/ms에 모두 존재하는지 | ERROR — 빌드 중단 |
| 2 | **빈 값 검출** | 번역값이 빈 문자열("")인 항목 | ERROR — 빌드 중단 |
| 3 | **용어집 준수** | 번역값에 사용된 핵심 용어가 glossary.json과 일치하는지 | WARNING — 리포트 출력 |
| 4 | **Interpolation 일치** | `{{variable}}` 플레이스홀더가 모든 언어에 동일하게 존재하는지 | ERROR — 빌드 중단 |
| 5 | **중복 값 검출** | 같은 namespace 내 동일한 번역값이 다른 키에 있는지 (통합 후보) | INFO — 리포트 출력 |
| 6 | **하드코딩 감지** | TSX 파일에서 i18n 래핑 없는 영어 텍스트 패턴 감지 | WARNING — 리포트 출력 |
| 7 | **미사용 키 검출** | 번역 파일에 있지만 코드에서 참조하지 않는 키 | INFO — 리포트 출력 |

### 5.3 검증 출력 예시

```
=== i18n Verification Report ===

[PASS] Key Sync: 4 languages, 1,247 keys each
[PASS] No empty values
[PASS] Interpolation variables match across all languages

[WARN] Glossary violations (3):
  ko/orders.json → "detail.cancelOrder": "주문 캔슬" (expected: "주문 취소")
  zh/menu.json → "list.title": "菜谱管理" (expected: "菜单管理")
  ms/common.json → "button.delete": "Hapus" (expected: "Padam")

[WARN] Possible hardcoded text (2 files):
  src/pages/Reports/SalesReport.tsx:42 → "Total Revenue"
  src/components/Common/Footer.tsx:15 → "All rights reserved"

[INFO] Duplicate values in ko/common.json:
  "button.confirm" and "confirm.ok" both translate to "확인"

[INFO] Unused keys (1):
  common.button.archive (not referenced in any .tsx file)

✅ Verification passed (0 errors, 5 warnings, 2 info)
```

### 5.4 하드코딩 감지 규칙 (ESLint 연동)

```
eslint-plugin-i18next
```

**감지 대상:**
- JSX 내 영어 문자열 리터럴 (2단어 이상)
- placeholder, title, aria-label 등 속성의 하드코딩 텍스트
- 에러 메시지 문자열

**예외 (감지 제외):**
- className, style, src, href 등 비텍스트 속성
- console.log, console.error (디버그용)
- 숫자, 날짜 포맷 문자열
- 테스트 파일 (*.test.tsx)
- import/export 문

---

## 6. 개발 워크플로우 규칙

### 6.1 새 기능 개발 시 번역 적용 절차

```
1. 기능에 필요한 텍스트 목록 작성
2. 새 도메인 용어가 있으면 glossary.json에 먼저 추가
3. 해당 namespace의 en/*.json에 키 추가
4. ko, zh, ms 번역 파일에도 동일 키 추가 (용어집 기반)
5. 컴포넌트에서 t('namespace:key') 사용
6. npm run i18n:verify 실행하여 검증
7. 빌드
```

### 6.2 코드 패턴

```tsx
// ✅ 올바른 패턴
import { useTranslation } from 'react-i18next';

function OrderList() {
  const { t } = useTranslation('orders');

  return (
    <div>
      <h1>{t('list.title')}</h1>
      <Button>{t('common:button.save')}</Button>
      <p>{t('list.empty')}</p>
      <span>{t('list.showing', { count: orders.length })}</span>
    </div>
  );
}

// ❌ 금지 패턴
function OrderList() {
  return (
    <div>
      <h1>Order Management</h1>           {/* 하드코딩 */}
      <Button>Save</Button>               {/* 하드코딩 */}
      <p>No orders found</p>              {/* 하드코딩 */}
    </div>
  );
}
```

### 6.3 공통 컴포넌트 번역 패턴

```tsx
// ConfirmDialog — 기본값을 t()로 변경
function ConfirmDialog({
  confirmText,    // 외부에서 주입 시 그대로 사용
  cancelText,
  message,
  ...props
}) {
  const { t } = useTranslation('common');

  return (
    <Dialog>
      <p>{message}</p>
      <Button>{cancelText || t('button.cancel')}</Button>
      <Button>{confirmText || t('button.confirm')}</Button>
    </Dialog>
  );
}
```

### 6.4 날짜/시간 로컬라이즈

```tsx
import { format } from 'date-fns';
import { ko, zhCN, ms, enUS } from 'date-fns/locale';

const localeMap = { en: enUS, ko, zh: zhCN, ms };

function formatDate(date: Date, lang: string) {
  return format(date, 'PPP', { locale: localeMap[lang] || enUS });
}

// en: "April 8, 2026"
// ko: "2026년 4월 8일"
// zh: "2026年4月8日"
// ms: "8 April 2026"
```

### 6.5 숫자/통화 로컬라이즈

```tsx
function formatCurrency(amount: number, currency: string, lang: string) {
  return new Intl.NumberFormat(lang === 'zh' ? 'zh-CN' : lang, {
    style: 'currency',
    currency: currency  // 'MYR', 'KRW' 등 — 레스토랑 설정에서
  }).format(amount);
}

// en: "RM 1,234.56"
// ko: "RM 1,234.56"
// zh: "RM 1,234.56"
// ms: "RM 1,234.56"
```

---

## 7. 이메일 템플릿 다국어

### 7.1 구조

```
dev-backend/locales/
├── en/
│   └── email.json
├── ko/
│   └── email.json
├── zh/
│   └── email.json
└── ms/
    └── email.json
```

### 7.2 백엔드 i18n 설정

```javascript
// dev-backend/utils/i18n.js
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');

i18next.use(Backend).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['email'],
  backend: {
    loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json')
  }
});

function getEmailText(lang, key, params = {}) {
  return i18next.getFixedT(lang)(key, params);
}

module.exports = { getEmailText };
```

### 7.3 이메일 발송 시 언어 적용

```javascript
// 기존 코드
function noticeReceivedEmail(notice, authorName) {
  return {
    subject: `New Notice: ${notice.title}`,
    html: wrapTemplate('New Notice', body)
  };
}

// 변경 후
function noticeReceivedEmail(notice, authorName, lang = 'en') {
  const t = (key, params) => getEmailText(lang, key, params);

  return {
    subject: t('email:notice.subject', { title: notice.title }),
    html: wrapTemplate(t('email:notice.heading'), body)
  };
}
```

### 7.4 이메일 발송 호출부 변경

```javascript
// 수신자의 preferred_language 조회 → 이메일 함수에 전달
const recipient = await User.findByPk(userId);
const lang = recipient?.preferred_language || 'en';

const email = noticeReceivedEmail(notice, authorName, lang);
await sendEmail(email);
```

### 7.5 이메일 공통 텍스트

```json
// en/email.json
{
  "footer": {
    "automated": "This is an automated message from {{company}}.",
    "managePreferences": "Manage notification preferences",
    "unsubscribe": "Unsubscribe"
  },
  "notice": {
    "subject": "New Notice: {{title}}",
    "heading": "New Notice",
    "body": "A new notice has been posted.",
    "postedBy": "Posted by",
    "priority": "Priority",
    "date": "Date",
    "viewButton": "View Notice"
  },
  "invoice": {
    "subject": "Invoice {{number}} — {{restaurant}}",
    "heading": "New Invoice",
    "dueDate": "Due Date",
    "amount": "Amount Due",
    "viewButton": "View Invoice"
  },
  "welcome": {
    "subject": "Welcome to {{platform}}",
    "heading": "Welcome!",
    "body": "Your account has been created successfully."
  }
}
```

```json
// ko/email.json
{
  "footer": {
    "automated": "{{company}}에서 발송된 자동 메시지입니다.",
    "managePreferences": "알림 설정 관리",
    "unsubscribe": "수신 거부"
  },
  "notice": {
    "subject": "새 공지: {{title}}",
    "heading": "새 공지",
    "body": "새로운 공지가 등록되었습니다.",
    "postedBy": "작성자",
    "priority": "우선순위",
    "date": "날짜",
    "viewButton": "공지 보기"
  },
  "invoice": {
    "subject": "인보이스 {{number}} — {{restaurant}}",
    "heading": "새 인보이스",
    "dueDate": "결제 기한",
    "amount": "결제 금액",
    "viewButton": "인보이스 보기"
  },
  "welcome": {
    "subject": "{{platform}}에 오신 것을 환영합니다",
    "heading": "환영합니다!",
    "body": "계정이 성공적으로 생성되었습니다."
  }
}
```

---

## 8. DB 변경

### 8.1 User 모델

```javascript
// models/User.js에 추가
preferred_language: {
  type: DataTypes.STRING(5),
  allowNull: false,
  defaultValue: 'en',
  validate: {
    isIn: [['en', 'ko', 'zh', 'ms']]
  }
}
```

### 8.2 API

```javascript
// 언어 변경 API (Profile 또는 Settings에서 호출)
PUT /api/users/language
Body: { "language": "ko" }
Response: { "success": true, "data": { "preferred_language": "ko" } }

// 로그인 응답에 preferred_language 포함 (이미 user 객체 반환하므로 자동)
POST /api/auth/login
Response: { "success": true, "data": { "user": { ..., "preferred_language": "ko" }, "token": "..." } }
```

---

## 9. 프론트엔드 i18n 초기화

### 9.1 설정 파일

```typescript
// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ko', 'zh', 'ms'],

    // Namespace 설정
    ns: ['common', 'auth', 'dashboard', 'orders', 'menu', 'inventory',
         'invoices', 'staff', 'customers', 'pos', 'kitchen', 'settings',
         'reports', 'brand', 'foodcourt', 'owner', 'admin', 'landing',
         'plans', 'notifications', 'floorplan', 'recipes', 'suppliers',
         'validation'],
    defaultNS: 'common',

    // 번역 파일 경로
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // 언어 감지 (로그인 전)
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false,  // React가 XSS 방지
    },

    // Lazy loading: 필요한 namespace만 로드
    partialBundledLanguages: true,
  });

export default i18n;
```

### 9.2 App.tsx 연동

```tsx
// src/App.tsx
import './i18n';  // 앱 진입점에서 한 번만 import
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {/* 기존 앱 구조 그대로 */}
    </Suspense>
  );
}
```

### 9.3 로그인 시 언어 동기화

```tsx
// AuthContext 또는 로그인 성공 핸들러
import i18n from '../i18n';

async function handleLoginSuccess(userData) {
  // 서버에서 받은 언어 설정 적용
  if (userData.preferred_language) {
    await i18n.changeLanguage(userData.preferred_language);
    localStorage.setItem('i18nextLng', userData.preferred_language);
  }
}
```

---

## 10. 언어 선택 UI

### 10.1 위치

| 위치 | 대상 | 형태 |
|------|------|------|
| Login 페이지 상단 | 비로그인 사용자 | 드롭다운 (국기 + 언어명) |
| Landing 헤더 (GNB) | 방문자 | 드롭다운 |
| Profile 페이지 | 로그인 사용자 | AutoSaveField 드롭다운 |
| POS Terminal 상단 | 직원 | 아이콘 드롭다운 (빠른 전환) |

### 10.2 언어 선택 컴포넌트

```tsx
// src/components/Common/LanguageSelector.tsx

const LANGUAGES = [
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'ko', label: '한국어',    flag: '🇰🇷' },
  { code: 'zh', label: '中文',      flag: '🇨🇳' },
  { code: 'ms', label: 'Melayu',   flag: '🇲🇾' },
];

function LanguageSelector({ variant = 'dropdown' }) {
  const { i18n } = useTranslation();
  const { user, updateLanguage } = useAuth();

  const handleChange = async (langCode: string) => {
    await i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);

    // 로그인 상태면 DB에도 저장
    if (user) {
      await updateLanguage(langCode);
    }
  };

  // variant에 따라 dropdown, icon-only 등 렌더링
}
```

### 10.3 디자인

- 현재 언어를 국기 아이콘 + 약어로 표시 (예: 🇰🇷 KO)
- 클릭 시 4개 언어 드롭다운
- POS Terminal에서는 공간 절약을 위해 국기 아이콘만 표시
- 언어 변경 즉시 반영 (페이지 새로고침 없음)

---

## 11. 구현 작업 목록

### 작업 순서

| # | 작업 | 변경 대상 | 비고 |
|---|------|-----------|------|
| 1 | i18n 인프라 세팅 | 프론트엔드 | react-i18next 설치, i18n.ts, App.tsx 연동 |
| 2 | 용어집 + 검증 스크립트 | 프론트엔드 | glossary.json, verify-translations.js |
| 3 | User 모델 + 언어 변경 API | 백엔드 | preferred_language 컬럼, PUT /api/users/language |
| 4 | 영어 번역 파일 (원본) | 프론트엔드 | 전체 UI 텍스트 추출 → en/*.json |
| 5 | 한국어 번역 파일 | 프론트엔드 | ko/*.json (용어집 기반) |
| 6 | 중국어 번역 파일 | 프론트엔드 | zh/*.json (용어집 기반) |
| 7 | 말레이어 번역 파일 | 프론트엔드 | ms/*.json (용어집 기반) |
| 8 | 공통 컴포넌트 t() 래핑 | 프론트엔드 | ConfirmDialog, DataTable, Layout 등 |
| 9 | 페이지 컴포넌트 t() 래핑 | 프론트엔드 | 전체 46개 페이지 디렉토리 |
| 10 | 언어 선택 UI | 프론트엔드 | LanguageSelector, Login, Profile, POS |
| 11 | AuthContext 언어 동기화 | 프론트엔드 | 로그인 시 i18n.changeLanguage 호출 |
| 12 | 이메일 템플릿 다국어 | 백엔드 | locales/*/email.json + 템플릿 함수 수정 |
| 13 | ESLint 하드코딩 감지 | 프론트엔드 | eslint-plugin-i18next 설정 |
| 14 | 검증 + 빌드 | 전체 | i18n:verify → 빌드 → 테스트 |

---

## 12. 추가 개발 시 체크리스트

CLAUDE.md의 "기능 확장 시 필수 체크리스트"에 아래 항목 추가:

### 다국어 (i18n) 연동
- [ ] 새 페이지/컴포넌트에 하드코딩 텍스트가 없는지 확인
- [ ] 새 도메인 용어 → glossary.json에 먼저 추가
- [ ] 해당 namespace의 4개 언어 파일 모두에 키 추가 (en → ko → zh → ms)
- [ ] `npm run i18n:verify` 통과 확인
- [ ] 새 이메일 템플릿 → 백엔드 locales 4개 언어 모두 추가
- [ ] 날짜/통화 표시가 있으면 로컬라이즈 함수 사용 확인

---

## 13. 제약 사항 및 결정

| 항목 | 결정 | 이유 |
|------|------|------|
| RTL (아랍어 등) | 미지원 | 현재 대상 언어에 없음, CSS 레이아웃 변경 불필요 |
| 복수형 처리 | i18next 기본 복수형 사용 | 한국어/중국어는 복수형 변화 없음, 영어/말레이어만 해당 |
| 사용자 데이터 번역 | 안 함 | 메뉴명, 레스토랑명 등은 원본 유지 |
| 백엔드 API 에러 메시지 | 영어 유지 | 프론트에서 에러 코드로 번역 키 매핑 |
| 이미지 내 텍스트 | 번역 안 함 | 이미지는 언어 중립적으로 디자인 |
| PDF (인보이스 등) | 향후 검토 | 현재 PDF 생성 기능이 없으므로 해당 없음 |
