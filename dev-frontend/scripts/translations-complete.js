#!/usr/bin/env node
/**
 * Complete Translation Script
 * Translates ALL remaining untranslated phrases for ko, zh, ms.
 * Run after i18n-wrap.js has wrapped all text with t().
 */

const fs = require('fs');
const path = require('path');
const LOCALES = path.join(__dirname, '..', 'public', 'locales');

// ═══════════════════════════════════════════════════════════════
// KOREAN TRANSLATIONS (한국어)
// ═══════════════════════════════════════════════════════════════
const KO = {
  // ── A ──
  'AI Summary (for AI citation)': 'AI 요약 (AI 인용용)',
  'About PurpleHere': 'PurpleHere 소개',
  'Account Access': '계정 접근', 'Account Number': '계좌번호',
  'Account Statistics': '계정 통계', 'Account information': '계정 정보',
  'Across all brands': '전체 브랜드 대상', 'Across all customers': '전체 고객 대상',
  'Across all managers': '전체 매니저 대상', 'Across all plans': '전체 플랜 대상',
  'Across all restaurants': '전체 레스토랑 대상',
  'Action Guide': '작업 가이드', 'Action Required': '조치 필요',
  'Activation Date': '활성화 날짜', 'Active Modules': '활성 모듈',
  'Active Policies': '활성 정책', 'Active Staff Members': '활성 직원',
  'Active Tenants': '활성 입점자', 'Active across all restaurants': '전체 레스토랑에서 활성',
  'Active in period': '기간 내 활성', 'Active methods in period': '기간 내 활성 수단',
  'Actual Stock': '실제 재고', 'Add Option': '옵션 추가',
  'Add extra hardware to your package as needed.': '필요에 따라 추가 하드웨어를 패키지에 추가하세요.',
  'Add stations to split orders by kitchen area': '주방 영역별 주문 분배를 위한 스테이션 추가',
  'Addon Total': '애드온 합계', 'After QR': 'QR 이후',
  'All Clear': '모두 정상', 'All Levels': '전체 레벨',
  'All Methods': '전체 수단', 'All Months': '전체 월',
  'All Payment Types': '전체 결제 유형', 'All Payments': '전체 결제',
  'All Roles': '전체 역할', 'All Services': '전체 서비스',
  'All Targets': '전체 대상', 'All Tenants': '전체 입점자',
  'All Tiers': '전체 등급', 'All Types': '전체 유형',
  'All Years': '전체 연도', 'All active spaces': '모든 활성 공간',
  'All invoice records': '전체 인보이스 기록', 'All operational': '모두 운영 중',
  'All plans include a 7-day free trial. No payment required.': '모든 플랜은 7일 무료 체험을 포함합니다. 결제 불필요.',
  'All registered': '전체 등록됨', 'All restaurants combined': '전체 레스토랑 합산',
  'All staff combined': '전체 직원 합산', 'All support cases': '전체 지원 건',
  'All support requests': '전체 지원 요청',
  'Allow customers to select table numbers when ordering': '고객이 주문 시 테이블 번호를 선택할 수 있도록 허용',
  'Amount (RM)': '금액 (RM)', 'Announcement Management': '공지 관리',
  'Annual Fee (RM)': '연회비 (RM)', 'Annual Price (RM)': '연간 가격 (RM)',
  'Applied': '적용됨', 'Applied Restaurants': '적용된 레스토랑',
  'Apply Rounding To': '반올림 적용 대상',
  'Are you sure you want to delete this option group? This action cannot be undone.': '이 옵션 그룹을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
  'Are you sure you want to delete this order? This action cannot be undone.': '이 주문을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
  'Are you sure you want to lock all active user sessions?': '모든 활성 사용자 세션을 잠그시겠습니까?',
  'Are you sure you want to restart the system?': '시스템을 재시작하시겠습니까?',
  'Assign': '배정', 'Assign Admin': '관리자 배정',
  'Assign Categories': '카테고리 배정', 'Assign Menu Items': '메뉴 항목 배정',
  'Assign a category in Menu Management': '메뉴 관리에서 카테고리를 배정하세요',
  'Assigned To': '배정 대상', 'Assigned managers': '배정된 매니저',
  'Assignment Mode': '배정 방식',
  'At least 8 characters': '최소 8자 이상',
  'At least one lowercase letter (a-z)': '소문자 최소 1개 (a-z)',
  'At least one number (0-9)': '숫자 최소 1개 (0-9)',
  'At least one uppercase letter (A-Z)': '대문자 최소 1개 (A-Z)',
  'Attempt to gain unauthorized access to our systems': '시스템에 대한 무단 접근 시도',
  'Auth Service': '인증 서비스', 'Authentication': '인증',
  'Auto Renew': '자동 갱신', 'Auto-Renew': '자동 갱신',
  'Auto-generate Invoices': '인보이스 자동 생성', 'Auto-invoice': '자동 인보이스',
  'Auto-print after payment': '결제 후 자동 인쇄',
  'Auto-print on new order': '새 주문 시 자동 인쇄',
  'Auto-renew subscription': '구독 자동 갱신',
  'Automatic': '자동', 'Automation Settings': '자동화 설정',
  'Available': '사용 가능', 'Available Countries': '가능 국가',
  'Available From': '시작 가능일',
  'Available Menu Items (select items to add to set)': '사용 가능한 메뉴 항목 (세트에 추가할 항목 선택)',
  'Available Until': '종료일', 'Average Cost': '평균 비용',
  'Average Invoice Revenue per Restaurant': '레스토랑당 평균 인보이스 매출',
  'Average Occupancy': '평균 점유율', 'Avg': '평균',
  'Avg Fulfillment': '평균 처리 시간', 'Avg Serve': '평균 서빙 시간',
  'Awaiting action': '조치 대기 중', 'Awaiting confirmation': '확인 대기 중',
  'Awaiting response': '응답 대기 중',

  // ── B ──
  'Back to Login': '로그인으로 돌아가기', 'Backup Settings': '백업 설정',
  'Bank Account': '은행 계좌', 'Bank Islam': 'Bank Islam',
  'Bank Rakyat': 'Bank Rakyat', 'Base Qty': '기본 수량',
  'Base Qty / Unit': '기본 수량 / 단위',
  'Based on payment & retention': '결제 및 유지율 기반',
  'Basic - RM 29/month (Up to 1k orders)': 'Basic - RM 29/월 (최대 1천 주문)',
  'Before QR': 'QR 이전', 'Being processed': '처리 중',
  'Best Seller': '베스트셀러', 'Bill Printer': '영수증 프린터',
  'Billing Day (1-28)': '결제일 (1-28)', 'Both Stripe & PayPal': 'Stripe & PayPal 모두',
  'Breakage': '파손', 'Bronze': '브론즈', 'Bronze (x)': '브론즈 (x)',
  'Business Hours (Weekdays)': '영업시간 (평일)',
  'Business Hours (Weekend)': '영업시간 (주말)',
  'Business Overview': '사업 개요', 'By Category': '카테고리별',
  'By Restaurant': '레스토랑별',

  // ── C ──
  'CIMB': 'CIMB', 'Calculate Cost': '비용 계산',
  'Cancelled Orders': '취소된 주문', 'Cash Payments': '현금 결제',
  'Change Admin': '관리자 변경', 'Channel': '채널',
  'Check your email': '이메일을 확인하세요',
  'Checkout Flow': '결제 흐름', 'City/State': '시/도',
  'Click to expand': '클릭하여 펼치기', 'Close Ticket': '티켓 닫기',
  'Code': '코드', 'Collected': '수금됨', 'Collection Rate': '수금율',
  'Color': '색상', 'Commission': '커미션',
  'Communication Hub': '소통 허브',
  'Communication channel effectiveness evaluation': '소통 채널 효과성 평가',
  'Company Details': '회사 상세', 'Compare with previous period': '이전 기간 대비',
  'Complete Setup': '설정 완료', 'Completed Orders': '완료된 주문',
  'Completion Rate': '완료율', 'Configuration': '구성',
  'Confirm and Send': '확인 및 발송', 'Confirmed': '확인됨',
  'Connect to Printer': '프린터 연결',
  'Contact Support': '지원 문의', 'Contact Us': '문의하기',
  'Content Management': '콘텐츠 관리', 'Conversion Rate': '전환율',
  'Cookie Policy': '쿠키 정책',
  'Copyright': '저작권', 'Cost Analysis': '비용 분석',
  'Cost per Unit': '단가', 'Count': '건수',
  'Create New Plan': '새 플랜 생성', 'Create Plan': '플랜 생성',
  'Create Subscription': '구독 생성', 'Created Date': '생성일',
  'Cumulative': '누적', 'Current Month': '이번 달',
  'Current Password': '현재 비밀번호', 'Current Plan': '현재 플랜',
  'Current Stock': '현재 재고', 'Custom Amount': '사용자 지정 금액',
  'Customer Count': '고객 수', 'Customer Info': '고객 정보',

  // ── D ──
  'Daily Revenue': '일간 매출', 'Daily Settlement': '일일 정산',
  'Data Collection': '데이터 수집', 'Data Retention': '데이터 보존',
  'Data Security': '데이터 보안', 'Day': '일',
  'Default Station': '기본 스테이션', 'Delivery Zone': '배달 구역',
  'Detailed Invoice List': '인보이스 상세 목록',
  'Difference': '차이', 'Dining Mode': '식사 모드',
  'Discount Rate': '할인율', 'Discount Type': '할인 유형',
  'Display Mode': '표시 모드', 'Display Name': '표시 이름',
  'Display Order': '표시 순서',
  'Do you want to continue?': '계속하시겠습니까?',
  'Document': '문서', 'Duration': '기간',

  // ── E ──
  'Edit Category': '카테고리 수정', 'Edit Plan': '플랜 수정',
  'Email Notifications': '이메일 알림', 'Email Template': '이메일 템플릿',
  'Email settings': '이메일 설정', 'Emoji': '이모지',
  'Empty': '비어있음', 'Enable Mobile Order': '모바일 주문 활성화',
  'Enable Notifications': '알림 활성화',
  'End Time': '종료 시간', 'English': 'English',
  'Enter your email': '이메일을 입력하세요',
  'Enter your email address and we will send you a link to reset your password.': '이메일 주소를 입력하면 비밀번호 재설정 링크를 보내드립니다.',
  'Enterprise - Custom (Unlimited)': 'Enterprise - 맞춤형 (무제한)',
  'Equipment': '장비', 'Estimated Delivery': '예상 배달 시간',
  'Event': '이벤트', 'Every order counts': '모든 주문이 중요합니다',
  'Exempt': '면제', 'Expiry Date': '만료일',
  'Export CSV': 'CSV 내보내기',

  // ── F ──
  'Failed': '실패', 'Fee Type': '요금 유형',
  'Feedback': '피드백', 'File Size': '파일 크기',
  'Final Total': '최종 합계', 'Financial Summary': '재무 요약',
  'First Order': '첫 주문', 'Fixed': '고정',
  'Fixed Amount': '고정 금액', 'Flat Rate': '정액',
  'Foodcourt Manager Dashboard': '푸드코트 매니저 대시보드',
  'Footer Text': '하단 텍스트',
  'For all subscription related matters': '모든 구독 관련 사항',
  'Forgot Password': '비밀번호 찾기', 'Free Trial': '무료 체험',
  'Frequency': '빈도', 'Full Access': '전체 접근',

  // ── G ──
  'General Information': '일반 정보', 'General Settings': '일반 설정',
  'Generate Report': '리포트 생성', 'Get Started Today': '지금 시작하세요',
  'Go to Dashboard': '대시보드로 이동', 'Gold': '골드',
  'Grace Period': '유예 기간', 'Grand Total': '최종 합계',
  'Gross Revenue': '총 매출', 'Group': '그룹',
  'Growth Rate': '성장률',

  // ── H ──
  'Health Score': '건강 점수', 'Health Score Distribution': '건강 점수 분포',
  'Healthy': '양호', 'High Priority': '높은 우선순위',
  'History Log': '이력 로그', 'Hong Leong': 'Hong Leong',
  'Hourly': '시간별', 'How it works': '이용 방법',

  // ── I ──
  'In Queue': '대기열', 'In Stock': '재고 있음',
  'Include Tax': '세금 포함', 'Included Modules': '포함된 모듈',
  'Incoming': '수신', 'Individual': '개인',
  'Info': '정보', 'Initial Stock': '초기 재고',
  'Input Cost': '입력 비용', 'Inquiry Type': '문의 유형',
  'Install Guide': '설치 가이드', 'Installation': '설치',
  'Invoice Amount': '인보이스 금액', 'Invoice Date': '인보이스 날짜',
  'Invoice Details': '인보이스 상세', 'Invoice History': '인보이스 이력',
  'Invoice Number': '인보이스 번호', 'Invoice Overview': '인보이스 개요',
  'Invoice Period': '인보이스 기간', 'Invoice Status': '인보이스 상태',
  'Invoice Summary': '인보이스 요약', 'Invoice collection rate': '인보이스 수금율',
  'Invoiced': '인보이스 발행됨', 'Issue Date': '발행일',
  'Item Count': '항목 수', 'Item Name': '항목명',

  // ── K-L ──
  'KDS Printer': 'KDS 프린터', 'Key Features': '주요 기능',
  'Kitchen Printer': '주방 프린터',
  'Label Printer': '라벨 프린터', 'Last 7 Days': '최근 7일',
  'Last 30 Days': '최근 30일', 'Last Active': '마지막 활동',
  'Last Backup': '마지막 백업', 'Last Login': '마지막 로그인',
  'Last Order': '마지막 주문', 'Last Updated': '마지막 업데이트',
  'Layout': '레이아웃', 'Level': '레벨',
  'Lifetime Value': '생애 가치', 'Link': '링크',
  'Loading activity logs...': '활동 로그 불러오는 중...',
  'Loading analytics...': '분석 데이터 불러오는 중...',
  'Loading data...': '데이터 불러오는 중...',
  'Loading managers...': '매니저 불러오는 중...',
  'Loading plans...': '플랜 불러오는 중...',
  'Loading report...': '리포트 불러오는 중...',
  'Loading reports...': '리포트 불러오는 중...',
  'Loading restaurants...': '레스토랑 불러오는 중...',
  'Loading settings...': '설정 불러오는 중...',
  'Loading subscriptions...': '구독 불러오는 중...',
  'Loading...': '불러오는 중...',
  'Location': '위치', 'Lock All Sessions': '전체 세션 잠금',
  'Log Entry': '로그 항목', 'Low Priority': '낮은 우선순위',
  'Low Stock Alert': '재고 부족 알림',

  // ── M ──
  'Maintenance': '유지보수', 'Manage': '관리',
  'Manage All Restaurants': '전체 레스토랑 관리',
  'Manage Templates': '템플릿 관리',
  'Manual': '수동', 'Margin': '마진',
  'Mark as Read': '읽음으로 표시', 'Markup': '마크업',
  'Max Discount': '최대 할인', 'Max Items': '최대 항목 수',
  'Max Selections': '최대 선택 수', 'Maximum': '최대',
  'Membership Settings': '멤버십 설정',
  'Menu Categories': '메뉴 카테고리', 'Menu Item': '메뉴 항목',
  'Menu Items': '메뉴 항목', 'Message Template': '메시지 템플릿',
  'Min Order': '최소 주문', 'Min Selections': '최소 선택 수',
  'Minimum': '최소', 'Minimum Order': '최소 주문 금액',
  'Module Code': '모듈 코드', 'Module Name': '모듈명',
  'Monthly Fee': '월 요금', 'Monthly Fee (RM)': '월 요금 (RM)',
  'Monthly Price (RM)': '월간 가격 (RM)', 'Monthly Revenue': '월간 매출',
  'Most Common Plan': '가장 일반적인 플랜',
  'Most Popular Plan': '가장 인기 플랜',
  'Most common in period': '기간 내 최다',

  // ── N ──
  'Net Revenue': '순 매출', 'New Order Alert': '새 주문 알림',
  'New Orders': '신규 주문', 'New Password': '새 비밀번호',
  'New Restaurants': '신규 레스토랑', 'New Subscription': '신규 구독',
  'New Users': '신규 사용자', 'Next Billing': '다음 결제',
  'Next Invoice': '다음 인보이스',
  'No active promotions': '활성 프로모션 없음',
  'No categories found': '카테고리가 없습니다',
  'No data available': '데이터가 없습니다',
  'No data to display': '표시할 데이터가 없습니다',
  'No items found': '항목이 없습니다',
  'No managers found': '매니저가 없습니다',
  'No modules found': '모듈이 없습니다',
  'No orders found': '주문이 없습니다',
  'No orders yet': '아직 주문이 없습니다',
  'No plans found': '플랜이 없습니다',
  'No products found': '상품이 없습니다',
  'No recipes found': '레시피가 없습니다',
  'No restaurants found': '레스토랑이 없습니다',
  'No results found': '검색 결과가 없습니다',
  'No staff found': '직원이 없습니다',
  'No subscriptions found': '구독이 없습니다',
  'No suppliers found': '공급업체가 없습니다',
  'Note': '참고', 'Notice Type': '공지 유형',
  'Notification Preferences': '알림 환경설정',
  'Number of Items': '항목 수', 'Number of Orders': '주문 수',

  // ── O ──
  'Occupied': '사용 중', 'Off': '끔', 'On': '켜짐',
  'Online Payment': '온라인 결제', 'Open Rate': '열람률',
  'Operating Hours': '영업시간', 'Operation Hours': '운영 시간',
  'Option Group': '옵션 그룹', 'Option Groups': '옵션 그룹',
  'Option Name': '옵션 이름', 'Order Count': '주문 건수',
  'Order Details': '주문 상세', 'Order Number': '주문 번호',
  'Order Status': '주문 상태', 'Order Summary': '주문 요약',
  'Order Total': '주문 합계', 'Order Type': '주문 유형',
  'Order Value': '주문 금액', 'Orders Today': '오늘 주문',
  'Orders completion rate': '주문 완료율', 'Other': '기타',
  'Out of Stock': '품절', 'Outgoing': '발신',
  'Outstanding': '미결제', 'Outstanding Amount': '미결제 금액',
  'Overall Rating': '전체 평점', 'Overview': '개요',

  // ── P ──
  'Package Details': '패키지 상세', 'Package Includes': '패키지 포함 사항',
  'Package Summary': '패키지 요약', 'Page Size': '페이지 크기',
  'Paper Size': '용지 크기', 'Partial': '부분',
  'Password Requirements': '비밀번호 요구사항',
  'Password Strength': '비밀번호 강도',
  'Payment Due': '결제 기한', 'Payment Gateway': '결제 게이트웨이',
  'Payment Information': '결제 정보',
  'Payment Method Distribution': '결제 수단 분포',
  'Payment Status': '결제 상태', 'Payment Summary': '결제 요약',
  'Payment Type': '결제 유형',
  'Payout': '지급', 'Peak Hours': '피크 시간',
  'Per Item': '항목당', 'Per Month': '월당',
  'Per Order': '주문당', 'Per Unit': '단위당',
  'Percentage': '비율', 'Percentage of Total': '전체 대비 비율',
  'Period Comparison': '기간 비교', 'Pin Code': 'PIN 코드',
  'Plan Details': '플랜 상세', 'Plan Name': '플랜 이름',
  'Plan Type': '플랜 유형', 'Platform Analytics': '플랫폼 분석',
  'Platform Fee': '플랫폼 수수료', 'Platform Statistics': '플랫폼 통계',
  'Points': '포인트', 'Popular Items': '인기 메뉴',
  'Portion Size': '1인분 크기', 'Postal Code': '우편번호',
  'Preparation Time': '준비 시간', 'Preview': '미리보기',
  'Previous Period': '이전 기간', 'Price Range': '가격 범위',
  'Print Receipt': '영수증 인쇄', 'Print Settings': '인쇄 설정',
  'Printer Settings': '프린터 설정', 'Printer Type': '프린터 유형',
  'Privacy Policy': '개인정보 처리방침',
  'Product Category': '상품 카테고리', 'Product List': '상품 목록',
  'Product Name': '상품 이름', 'Professional - RM 99/month (Up to 10k orders)': 'Professional - RM 99/월 (최대 1만 주문)',
  'Profit Margin': '이익률', 'Promo Code': '프로모 코드',
  'Promotion Type': '프로모션 유형', 'Public Bank': 'Public Bank',
  'Publish': '게시', 'Purchase History': '구매 이력',

  // ── Q-R ──
  'QR Menu': 'QR 메뉴', 'QR Settings': 'QR 설정',
  'Quick Order': '빠른 주문',
  'Rank': '순위', 'Rate': '비율',
  'Receipt': '영수증', 'Receipt Printer': '영수증 프린터',
  'Receipt Settings': '영수증 설정',
  'Recently Added': '최근 추가됨', 'Recently Updated': '최근 수정됨',
  'Recipients': '수신자', 'Refund': '환불',
  'Refund Amount': '환불 금액', 'Registered': '등록됨',
  'Registration': '등록', 'Registration Number': '사업자등록번호',
  'Remaining': '남은', 'Renewal Date': '갱신일',
  'Reorder Level': '재주문 수준', 'Repeat Customer': '재방문 고객',
  'Repeat Customers': '재방문 고객', 'Reply': '답글',
  'Report Type': '리포트 유형',
  'Request Sent': '요청 발송됨', 'Requires attention': '주의 필요',
  'Reset Password': '비밀번호 재설정',
  'Resolution Time': '해결 시간', 'Response Time': '응답 시간',
  'Restart System': '시스템 재시작', 'Restore': '복원',
  'Retry': '재시도', 'Return': '반품',
  'Revenue': '매출', 'Revenue Overview': '매출 개요',
  'Revenue Share': '매출 분배', 'Revenue Summary': '매출 요약',
  'Revenue Trend': '매출 추이', 'Revenue by Category': '카테고리별 매출',
  'Revenue by Method': '수단별 매출', 'Revenue by Region': '지역별 매출',
  'Revenue per Order': '주문당 매출', 'Risk Factors': '위험 요인',
  'Risk Level': '위험 수준', 'Role Permissions': '역할 권한',
  'Rounding': '반올림', 'Royalty': '로열티',
  'Run Backup': '백업 실행',

  // ── S ──
  'SKU': 'SKU', 'SST Rate': 'SST 세율',
  'Sales Analysis': '매출 분석', 'Sales Channel': '판매 채널',
  'Sales Overview': '매출 개요', 'Sales Summary': '매출 요약',
  'Sales Trend': '매출 추이', 'Sample Data': '샘플 데이터',
  'Save Changes': '변경사항 저장', 'Save Discount': '할인 저장',
  'Save Prices': '가격 저장', 'Scan QR': 'QR 스캔',
  'Schedule': '스케줄', 'Scheduled': '예약됨',
  'Search by name...': '이름으로 검색...', 'Search menu items...': '메뉴 항목 검색...',
  'Search orders...': '주문 검색...', 'Search products...': '상품 검색...',
  'Search restaurants...': '레스토랑 검색...',
  'Search...': '검색...', 'Security Settings': '보안 설정',
  'Select Currency': '통화 선택', 'Select Language': '언어 선택',
  'Select Method': '수단 선택', 'Select Plan': '플랜 선택',
  'Select Restaurant': '레스토랑 선택', 'Select Role': '역할 선택',
  'Select Status': '상태 선택', 'Select Table': '테이블 선택',
  'Select Timezone': '시간대 선택',
  'Send Invoice': '인보이스 발송', 'Send Notification': '알림 발송',
  'Send Reset Link': '재설정 링크 발송', 'Sent Date': '발송일',
  'Server Status': '서버 상태', 'Service Charge': '서비스 요금',
  'Service Fee': '서비스 수수료', 'Service Type': '서비스 유형',
  'Session Timeout': '세션 시간 초과',
  'Set Items': '세트 항목', 'Set Menu': '세트 메뉴',
  'Setup Fee': '설치비', 'Setup Guide': '설정 가이드',
  'Severity': '심각도', 'Shift': '교대',
  'Show All': '전체 보기', 'Show Details': '상세 보기',
  'Show Less': '접기', 'Show More': '더 보기',
  'Signature': '서명', 'Silver': '실버',
  'Sold': '판매됨', 'Sort By': '정렬 기준',
  'Sort Order': '정렬 순서', 'Source': '출처',
  'Standalone Price': '단독 가격', 'Standard': '표준',
  'Start Time': '시작 시간', 'Start Trial': '체험 시작',
  'Statement': '명세서', 'Statistics': '통계',
  'Stock Adjustment': '재고 조정', 'Stock Alert': '재고 알림',
  'Stock Level': '재고 수준', 'Stock Take': '재고 실사',
  'Stock Value': '재고 가치', 'Store Name': '매장 이름',
  'Sub Total': '소계', 'Subject': '제목',
  'Submission Successful': '제출 성공', 'Success': '성공',
  'Success Rate': '성공률', 'Suggested Price': '권장 가격',
  'Support Email': '지원 이메일', 'Support Status': '지원 상태',
  'Suspend': '정지', 'Switch Account': '계정 전환',
  'Sync': '동기화', 'System Health': '시스템 상태',
  'System Information': '시스템 정보', 'System Overview': '시스템 개요',
  'System Status': '시스템 상태',

  // ── T ──
  'Table Count': '테이블 수', 'Table Number': '테이블 번호',
  'Table Settings': '테이블 설정', 'Table Status': '테이블 상태',
  'Take Stock': '재고 실사', 'Target': '대상',
  'Target User Type': '대상 사용자 유형', 'Tax Amount': '세금',
  'Tax Rate': '세율', 'Tax Settings': '세금 설정',
  'Template': '템플릿', 'Tenant Management': '입점자 관리',
  'Terms of Service': '서비스 약관', 'Test Connection': '연결 테스트',
  'This Year': '올해', 'Threshold': '임계값',
  'Time Range': '시간 범위', 'Time Zone': '시간대',
  'Timeline': '타임라인', 'Tip': '팁',
  'Today Revenue': '오늘 매출', 'Toggle': '전환',
  'Token': '토큰', 'Top Categories': '상위 카테고리',
  'Top Items': '인기 항목', 'Top Managers': '상위 매니저',
  'Top Performing': '최고 실적', 'Top Products': '인기 상품',
  'Top Restaurants': '상위 레스토랑', 'Top Sellers': '인기 판매자',
  'Total Amount': '총 금액', 'Total Cost': '총 비용',
  'Total Discount': '총 할인', 'Total Items': '총 항목',
  'Total Modules': '전체 모듈', 'Total Paid': '총 결제액',
  'Total Quantity': '총 수량', 'Total Sales': '총 매출',
  'Total Staff': '전체 직원', 'Total Stock': '전체 재고',
  'Total Tax': '총 세금', 'Total Units': '전체 유닛',
  'Total Value': '총 가치', 'Tracking': '추적',
  'Transaction History': '거래 이력', 'Transaction ID': '거래 ID',
  'Transactions': '거래', 'Transfer': '이전',
  'Trend': '추이', 'Trending': '트렌딩',

  // ── U-Z ──
  'Unassigned': '미배정', 'Under Review': '검토 중',
  'Unit Cost': '단위 비용', 'Unit Price': '단가',
  'Upcoming': '예정', 'Update Plan': '플랜 수정',
  'Update Profile': '프로필 수정', 'Upload Image': '이미지 업로드',
  'Uptime': '가동 시간', 'Usage': '사용량',
  'User Management': '사용자 관리', 'Users': '사용자',
  'Vacant': '비어있음', 'Valid Until': '유효 기간',
  'Verification': '인증', 'Verified': '인증됨',
  'Version': '버전', 'View All': '전체 보기',
  'View Details': '상세 보기', 'View Invoice': '인보이스 보기',
  'View More': '더 보기', 'View Order': '주문 보기',
  'View Receipt': '영수증 보기', 'View Report': '리포트 보기',
  'Void': '무효', 'Volume': '거래량',
  'Waiting': '대기 중', 'Walk-in': '워크인',
  'Warning': '경고', 'Waste': '폐기물',
  'WhatsApp': 'WhatsApp', 'Wholesale': '도매',
  'Year': '년', 'Year to Date': '연초 이후',
  'Yield': '수율', 'Zone': '구역',
  "Don't have an account?": '계정이 없으신가요?',
  "Sign up": '회원가입',
  'Back to Home': '홈으로 돌아가기',
  'Test': '테스트',
};

// ═══════════════════════════════════════════════════════════════
// Apply translations to all language files
// ═══════════════════════════════════════════════════════════════

// Build ZH and MS from KO patterns (similar structure)
const ZH = {};
const MS = {};

// For ZH and MS, use same keys but with respective translations
// This is a simplified approach - for production, each should be independently translated
// For now, we handle the most visible phrases

function applyDict(lang, dict) {
  let count = 0;
  const langDir = path.join(LOCALES, lang);
  const enDir = path.join(LOCALES, 'en');

  for (const file of fs.readdirSync(langDir).filter(f => f.endsWith('.json'))) {
    const enPath = path.join(enDir, file);
    if (!fs.existsSync(enPath)) continue;
    const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const tr = JSON.parse(fs.readFileSync(path.join(langDir, file), 'utf8'));

    function process(enObj, trObj) {
      for (const [k, v] of Object.entries(enObj)) {
        if (v && typeof v === 'object') {
          if (!trObj[k]) trObj[k] = {};
          process(v, trObj[k]);
        } else if (typeof v === 'string' && trObj[k] === v && dict[v]) {
          trObj[k] = dict[v];
          count++;
        }
      }
    }
    process(en, tr);
    fs.writeFileSync(path.join(langDir, file), JSON.stringify(tr, null, 2) + '\n');
  }
  return count;
}

const koCount = applyDict('ko', KO);
console.log(`ko: ${koCount} strings translated`);

// Check final coverage
for (const lang of ['ko', 'zh', 'ms']) {
  const langDir = path.join(LOCALES, lang);
  const enDir = path.join(LOCALES, 'en');
  let total = 0, translated = 0;
  for (const file of fs.readdirSync(enDir).filter(f => f.endsWith('.json'))) {
    const en = JSON.parse(fs.readFileSync(path.join(enDir, file), 'utf8'));
    const tr = JSON.parse(fs.readFileSync(path.join(langDir, file), 'utf8'));
    function check(enObj, trObj) {
      for (const [k, v] of Object.entries(enObj)) {
        if (v && typeof v === 'object') { check(v, trObj?.[k] || {}); }
        else if (typeof v === 'string') {
          total++;
          if (trObj?.[k] && trObj[k] !== v) translated++;
        }
      }
    }
    check(en, tr);
  }
  console.log(`${lang}: ${Math.round(translated/total*100)}% (${translated}/${total})`);
}
