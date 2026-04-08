#!/usr/bin/env node
/**
 * Batch translate all untranslated keys in ko/zh/ms JSON files.
 * Uses a comprehensive dictionary + pattern-based translation.
 */

const fs = require('fs');
const path = require('path');

const LOCALES = path.join(__dirname, '..', 'public', 'locales');

// ─── Comprehensive Korean Dictionary ───
const KO_DICT = {
  // A
  'About': '소개', 'Account': '계정', 'Account Management': '계정 관리',
  'Actions': '작업', 'Active': '활성', 'Active Restaurants': '활성 레스토랑',
  'Activity': '활동', 'Activity History': '활동 기록', 'Add': '추가',
  'Add Manager': '매니저 추가', 'Add New': '새로 추가', 'Add Staff': '직원 추가',
  'Address': '주소', 'Admin': '관리자', 'Admin Management': '관리자 관리',
  'All': '전체', 'All Categories': '전체 카테고리', 'All Priorities': '전체 우선순위',
  'All Priority': '전체 우선순위', 'All Senders': '전체 발신자', 'All Status': '전체 상태',
  'Amount': '금액', 'Amount Due': '결제 금액', 'Analytics': '분석',
  'Annual': '연간', 'Apply': '적용', 'Approved': '승인됨', 'Area': '지역',
  'Are you sure?': '정말 진행하시겠습니까?', 'Attachments': '첨부파일',
  'Available Accounts': '사용 가능한 계정', 'Average': '평균', 'Avg Revenue / Store': '매장당 평균 매출',
  // B
  'Back': '뒤로', 'Back to Home': '홈으로 돌아가기', 'Backup': '백업',
  'Backup & Restore': '백업 및 복원', 'Basic': '기본', 'Basic Information': '기본 정보',
  'Billing': '결제', 'Billing Cycle': '결제 주기', 'Blog': '블로그',
  'Brand': '브랜드', 'Brand General': '브랜드 총괄', 'Brand Manager': '브랜드 매니저',
  'Brand Manager Dashboard': '브랜드 매니저 대시보드', 'Brand Plans': '브랜드 플랜',
  'Brand Products': '브랜드 상품', 'Brand Recipes': '브랜드 레시피',
  'Brand Subscriptions': '브랜드 구독', 'Brand Summary': '브랜드 요약',
  'Brands': '브랜드', 'Bug Report': '버그 리포트', 'By Brand': '브랜드별',
  // C
  'Cancel': '취소', 'Cancelled': '취소됨', 'Categories': '카테고리',
  'Category': '카테고리', 'Change History': '변경 이력', 'Choose a brand...': '브랜드 선택...',
  'City': '도시', 'Close': '닫기', 'Closed': '닫힘', 'Closing Time': '영업 종료',
  'Company Info': '회사 정보', 'Company Information': '회사 정보',
  'Company Logo': '회사 로고', 'Company Name': '회사명', 'Company Settings': '회사 설정',
  'Completed': '완료', 'Confirm': '확인', 'Confirm Password': '비밀번호 확인',
  'Contact': '연락처', 'Contact Information': '연락처 정보',
  'Contact Inquiries': '연락 문의', 'Content': '콘텐츠', 'Content Management': '콘텐츠 관리',
  'Country': '국가', 'Coupon': '쿠폰', 'Coupons': '쿠폰', 'Create': '생성',
  'Created': '생성일', 'Currency': '통화', 'Current': '현재',
  'Customer': '고객', 'Customer Display': '고객 디스플레이', 'Customers': '고객',
  // D
  'Daily': '일간', 'Daily Settlement': '일일 정산', 'Dashboard': '대시보드',
  'Data': '데이터', 'Date': '날짜', 'Default': '기본값', 'Delete': '삭제',
  'Deleting...': '삭제 중...', 'Delivery': '배달', 'Demo': '데모',
  'Demo Accounts': '데모 계정', 'Description': '설명', 'Details': '상세',
  'Dine-in': '매장식사', 'Discount': '할인', 'Done': '완료', 'Download': '다운로드',
  'Draft': '초안', 'Due Date': '결제 기한',
  // E
  'Edit': '수정', 'Email': '이메일', 'Email or Username': '이메일 또는 사용자명',
  'Enabled': '활성화', 'Disabled': '비활성화', 'End Date': '종료일',
  'Enterprise': '엔터프라이즈', 'Error': '오류', 'Expired': '만료',
  'Export': '내보내기', 'Export CSV': 'CSV 내보내기',
  // F
  'FAQ': 'FAQ', 'Feature Request': '기능 요청', 'Features': '기능',
  'Filter': '필터', 'Floor Plan': '배치도', 'Foodcourt': '푸드코트',
  'Foodcourt General': '푸드코트 총괄', 'Foodcourt Manager': '푸드코트 매니저',
  'Foodcourt Plans': '푸드코트 플랜', 'Foodcourt Subscriptions': '푸드코트 구독',
  'Forgot your password?': '비밀번호를 잊으셨나요?', 'Free': '무료',
  'From': '시작', 'Full Name': '전체 이름',
  // G
  'General': '일반', 'Generate': '생성', 'Get Started': '시작하기',
  'Grand Total': '최종 합계', 'Growth': '성장', 'Guide': '가이드',
  // H
  'Hardware': '하드웨어', 'Hardware Quotes': '하드웨어 견적',
  'Help': '도움말', 'High': '높음', 'History': '이력', 'Home': '홈',
  // I
  'ID': 'ID', 'Image': '이미지', 'Import': '가져오기', 'Important': '중요',
  'In Progress': '진행중', 'Inactive': '비활성', 'Ingredients': '식자재',
  'Inquiry': '문의', 'Inquiry Management': '문의 관리', 'Inventory': '재고',
  'Invoice': '인보이스', 'Invoice Management': '인보이스 관리',
  'Invoice Number': '인보이스 번호', 'Invoice Settings': '인보이스 설정',
  'Invoices': '인보이스', 'Item': '항목', 'Items': '항목',
  // J-K
  'Joined': '가입일', 'Kitchen Display': '주방 디스플레이',
  // L
  'Language': '언어', 'Last Month': '지난 달', 'Last Updated': '마지막 업데이트',
  'Live Orders': '실시간 주문', 'Loading...': '불러오는 중...',
  'Loading dashboard...': '대시보드 로딩 중...', 'Loading notices...': '공지 불러오는 중...',
  'Login': '로그인', 'Logout': '로그아웃', 'Low': '낮음',
  // M
  'Management': '관리', 'Manager': '매니저', 'Managers': '매니저',
  'Medium': '중간', 'Membership': '멤버십', 'Menu': '메뉴',
  'Menu Access': '메뉴 접근 권한', 'Menu Management': '메뉴 관리',
  'Message': '메시지', 'Method': '방법', 'Mobile Order': '모바일 주문',
  'Monthly': '월간', 'Monthly Revenue': '월간 매출',
  // N
  'Name': '이름', 'New': '신규', 'New Inquiry': '새 문의', 'New Order': '새 주문',
  'Next': '다음', 'No': '아니오', 'No data available': '데이터가 없습니다',
  'No inquiries yet': '문의가 없습니다', 'No notices found': '공지가 없습니다',
  'No results found': '검색 결과가 없습니다', 'No tickets yet': '티켓이 없습니다',
  'No permissions': '권한 없음', 'None': '없음', 'Normal': '보통',
  'Notes': '메모', 'Notices': '공지', 'Notifications': '알림',
  // O
  'OK': '확인', 'Open': '열림', 'Open Tickets': '열린 티켓',
  'Opening Time': '영업 시작', 'Operation': '운영', 'Operation Inquiry': '운영 문의',
  'Operation Settings': '운영 설정', 'Options': '옵션', 'Order': '주문',
  'Order History': '주문 내역', 'Orders': '주문', 'Other': '기타',
  'Overview': '개요', 'Overdue': '연체', 'Owner': '오너',
  // P
  'POS': 'POS', 'POS Terminal': 'POS 터미널', 'Package': '패키지',
  'Packages': '패키지', 'Page': '페이지', 'Paid': '결제완료',
  'Password': '비밀번호', 'Payment': '결제', 'Payment History': '결제 내역',
  'Payment Method': '결제 수단', 'Payment Methods': '결제 수단',
  'Payment Settings': '결제 설정', 'Pending': '대기중',
  'Performance': '실적', 'Performance analytics': '실적 분석',
  'Period': '기간', 'Permissions': '권한', 'Phone': '전화번호',
  'Plan': '플랜', 'Plans': '플랜', 'Postal Code': '우편번호',
  'Previous': '이전', 'Price': '가격', 'Price List': '가격표',
  'Pricing': '가격', 'Print': '인쇄', 'Priority': '우선순위',
  'Product': '상품', 'Product Recipes': '상품 레시피', 'Products': '상품',
  'Professional': '프로페셔널', 'Profile': '프로필', 'Promotions': '프로모션',
  'Purchase Orders': '발주',
  // Q-R
  'QR Code': 'QR 코드', 'Quantity': '수량', 'Quick Actions': '빠른 작업',
  'Quick Login': '빠른 로그인', 'Read Status': '읽음 상태',
  'Recipes': '레시피', 'Registration No.': '사업자등록번호',
  'Rejected': '거절됨', 'Remove': '제거', 'Rent': '임대료',
  'Rent Management': '임대 관리', 'Report': '리포트', 'Reports': '리포트',
  'Required': '필수', 'Reset': '초기화', 'Reset Password': '비밀번호 재설정',
  'Resolved': '해결됨', 'Restaurant': '레스토랑', 'Restaurant Admin': '레스토랑 관리자',
  'Restaurant Admins': '레스토랑 관리자', 'Restaurant Management': '레스토랑 관리',
  'Restaurant Owner': '레스토랑 오너', 'Restaurant Performance': '레스토랑 실적',
  'Restaurants': '레스토랑', 'Restore': '복원', 'Revenue': '매출',
  'Role': '역할', 'Rows per page': '페이지당 행 수',
  // S
  'Sales': '매출', 'Sales Report': '매출 리포트', 'Save': '저장',
  'Saving...': '저장 중...', 'Schedule': '스케줄', 'Search': '검색',
  'Search...': '검색...', 'Security': '보안', 'Select': '선택',
  'Select Restaurants': '레스토랑 선택', 'Select target...': '대상 선택...',
  'Send': '보내기', 'Sent': '발송됨', 'Settings': '설정',
  'Setup Quote': '설치 견적', 'Show': '보기', 'Sign In': '로그인',
  'Sign Up': '회원가입', 'Signing in...': '로그인 중...',
  'Site Settings': '사이트 설정', 'Staff': '직원', 'Start Date': '시작일',
  'State': '주/도', 'Status': '상태', 'Stock': '재고',
  'Store Settings': '매장 설정', 'Street Address': '도로명 주소',
  'Subject': '제목', 'Submit': '제출', 'Subscription': '구독',
  'Subscription Plans': '구독 플랜', 'Subscriptions': '구독',
  'Subtotal': '소계', 'Summary': '요약', 'Supplier': '공급업체',
  'Suppliers': '공급업체', 'Support': '지원', 'Support Tickets': '지원 티켓',
  'Suspended': '정지', 'System': '시스템', 'System Admin': '시스템 관리자',
  'System Config': '시스템 구성', 'System Inquiry': '시스템 문의',
  'System Logs': '시스템 로그', 'System Products': '시스템 상품',
  'System Settings': '시스템 설정',
  // T
  'Table': '테이블', 'Tables': '테이블', 'Takeaway': '포장',
  'Tax': '세금', 'Tax No. (SST/GST)': '세금 번호 (SST/GST)',
  'Team': '팀', 'Technical': '기술', 'Technical Issue': '기술 문제',
  'Tenant': '입점자', 'Tenant Support': '입점자 지원', 'Test': '테스트',
  'Test Accounts': '테스트 계정', 'This Month': '이번 달', 'This Week': '이번 주',
  'Ticket': '티켓', 'Ticket Number': '티켓 번호', 'Time': '시간',
  'Timezone': '시간대', 'Title': '제목', 'To': '종료',
  'Today': '오늘', "Today's Orders": '오늘 주문', "Today's Revenue": '오늘 매출',
  "Today's Total Orders": '오늘 총 주문', 'Total': '합계',
  'Total Inquiries': '전체 문의', 'Total Managers': '전체 매니저',
  'Total Orders': '전체 주문', 'Total Received': '전체 수신',
  'Total Restaurants': '전체 레스토랑', 'Total Revenue': '전체 매출',
  'Total Sent': '전체 발신', 'Total Tickets': '전체 티켓',
  'Trade Name': '상호명', 'Transaction': '거래', 'Trial': '체험판',
  'Try Demo': '데모 체험', 'Type': '유형',
  // U-Z
  'Unit': '단위', 'Unknown': '알 수 없음', 'Unpaid': '미결제',
  'Unread': '안 읽음', 'Update': '업데이트', 'Update Manager': '매니저 수정',
  'Upload': '업로드', 'Urgent': '긴급', 'URL': 'URL',
  'Username': '사용자명', 'Users': '사용자', 'Value': '값',
  'View': '보기', 'View All': '전체 보기', 'View Details': '상세 보기',
  'Website': '웹사이트', 'Week': '주', 'Weekly': '주간',
  'Welcome': '환영합니다', 'Year': '년', 'Yearly': '연간', 'Yes': '예',
};

// Chinese dictionary (comprehensive)
const ZH_DICT = {
  'About': '关于', 'Account': '账户', 'Account Management': '账户管理',
  'Actions': '操作', 'Active': '已启用', 'Active Restaurants': '活跃餐厅',
  'Activity': '活动', 'Activity History': '活动记录', 'Add': '添加',
  'Add Manager': '添加经理', 'Add New': '新增', 'Add Staff': '添加员工',
  'Address': '地址', 'Admin': '管理员', 'Admin Management': '管理员管理',
  'All': '全部', 'All Categories': '全部分类', 'All Priorities': '全部优先级',
  'All Priority': '全部优先级', 'All Senders': '全部发送者', 'All Status': '全部状态',
  'Amount': '金额', 'Amount Due': '应付金额', 'Analytics': '数据分析',
  'Annual': '年度', 'Apply': '应用', 'Approved': '已批准', 'Area': '区域',
  'Are you sure?': '确定要继续吗？', 'Attachments': '附件',
  'Available Accounts': '可用账户', 'Average': '平均', 'Avg Revenue / Store': '每店平均收入',
  'Back': '返回', 'Back to Home': '返回首页', 'Backup': '备份',
  'Backup & Restore': '备份与恢复', 'Basic': '基础', 'Basic Information': '基本信息',
  'Billing': '账单', 'Billing Cycle': '计费周期', 'Blog': '博客',
  'Brand': '品牌', 'Brand General': '品牌总管', 'Brand Manager': '品牌经理',
  'Brand Manager Dashboard': '品牌经理仪表盘', 'Brand Plans': '品牌套餐',
  'Brand Products': '品牌产品', 'Brand Recipes': '品牌食谱',
  'Brand Subscriptions': '品牌订阅', 'Brand Summary': '品牌概况',
  'Brands': '品牌', 'Bug Report': '错误报告', 'By Brand': '按品牌',
  'Cancel': '取消', 'Cancelled': '已取消', 'Categories': '分类',
  'Category': '分类', 'Change History': '变更记录', 'Choose a brand...': '选择品牌...',
  'City': '城市', 'Close': '关闭', 'Closed': '已关闭', 'Closing Time': '关门时间',
  'Company Info': '公司信息', 'Company Information': '公司信息',
  'Company Logo': '公司标志', 'Company Name': '公司名称', 'Company Settings': '公司设置',
  'Completed': '已完成', 'Confirm': '确认', 'Confirm Password': '确认密码',
  'Contact': '联系', 'Contact Information': '联系信息',
  'Contact Inquiries': '联系咨询', 'Content': '内容', 'Content Management': '内容管理',
  'Country': '国家', 'Coupon': '优惠券', 'Coupons': '优惠券', 'Create': '创建',
  'Created': '创建时间', 'Currency': '货币', 'Current': '当前',
  'Customer': '顾客', 'Customer Display': '顾客显示屏', 'Customers': '顾客',
  'Daily': '每日', 'Daily Settlement': '日结算', 'Dashboard': '仪表盘',
  'Data': '数据', 'Date': '日期', 'Default': '默认', 'Delete': '删除',
  'Deleting...': '删除中...', 'Delivery': '配送', 'Demo': '演示',
  'Demo Accounts': '演示账户', 'Description': '描述', 'Details': '详情',
  'Dine-in': '堂食', 'Discount': '折扣', 'Done': '完成', 'Download': '下载',
  'Draft': '草稿', 'Due Date': '到期日',
  'Edit': '编辑', 'Email': '邮箱', 'Email or Username': '邮箱或用户名',
  'Enabled': '已启用', 'Disabled': '已禁用', 'End Date': '结束日期',
  'Enterprise': '企业版', 'Error': '错误', 'Expired': '已过期',
  'Export': '导出', 'Export CSV': '导出CSV',
  'FAQ': '常见问题', 'Feature Request': '功能请求', 'Features': '功能',
  'Filter': '筛选', 'Floor Plan': '平面图', 'Foodcourt': '美食广场',
  'Foodcourt General': '美食广场总管', 'Foodcourt Manager': '美食广场经理',
  'Foodcourt Plans': '美食广场套餐', 'Foodcourt Subscriptions': '美食广场订阅',
  'Forgot your password?': '忘记密码？', 'Free': '免费',
  'From': '开始', 'Full Name': '全名',
  'General': '通用', 'Generate': '生成', 'Get Started': '开始使用',
  'Grand Total': '总计', 'Growth': '增长', 'Guide': '指南',
  'Hardware': '硬件', 'Hardware Quotes': '硬件报价',
  'Help': '帮助', 'High': '高', 'History': '历史', 'Home': '首页',
  'ID': 'ID', 'Image': '图片', 'Import': '导入', 'Important': '重要',
  'In Progress': '进行中', 'Inactive': '已停用', 'Ingredients': '食材',
  'Inquiry': '咨询', 'Inquiry Management': '咨询管理', 'Inventory': '库存',
  'Invoice': '发票', 'Invoice Management': '发票管理',
  'Invoice Number': '发票编号', 'Invoice Settings': '发票设置',
  'Invoices': '发票', 'Item': '项目', 'Items': '项目',
  'Joined': '加入时间', 'Kitchen Display': '厨房显示',
  'Language': '语言', 'Last Month': '上月', 'Last Updated': '最后更新',
  'Live Orders': '实时订单', 'Loading...': '加载中...',
  'Loading dashboard...': '仪表盘加载中...', 'Loading notices...': '公告加载中...',
  'Login': '登录', 'Logout': '退出', 'Low': '低',
  'Management': '管理', 'Manager': '经理', 'Managers': '经理',
  'Medium': '中', 'Membership': '会员', 'Menu': '菜单',
  'Menu Access': '菜单权限', 'Menu Management': '菜单管理',
  'Message': '消息', 'Method': '方式', 'Mobile Order': '移动点餐',
  'Monthly': '月度', 'Monthly Revenue': '月度收入',
  'Name': '名称', 'New': '新建', 'New Inquiry': '新咨询', 'New Order': '新订单',
  'Next': '下一步', 'No': '否', 'No data available': '暂无数据',
  'No inquiries yet': '暂无咨询', 'No notices found': '暂无公告',
  'No results found': '未找到结果', 'No tickets yet': '暂无工单',
  'No permissions': '无权限', 'None': '无', 'Normal': '普通',
  'Notes': '备注', 'Notices': '公告', 'Notifications': '通知',
  'OK': '确定', 'Open': '打开', 'Open Tickets': '打开的工单',
  'Opening Time': '营业开始', 'Operation': '运营', 'Operation Inquiry': '运营咨询',
  'Operation Settings': '运营设置', 'Options': '选项', 'Order': '订单',
  'Order History': '订单记录', 'Orders': '订单', 'Other': '其他',
  'Overview': '概览', 'Overdue': '逾期', 'Owner': '业主',
  'POS': 'POS', 'POS Terminal': 'POS终端', 'Package': '套餐',
  'Packages': '套餐', 'Page': '页面', 'Paid': '已支付',
  'Password': '密码', 'Payment': '付款', 'Payment History': '付款记录',
  'Payment Method': '付款方式', 'Payment Methods': '付款方式',
  'Payment Settings': '支付设置', 'Pending': '待处理',
  'Performance': '业绩', 'Performance analytics': '业绩分析',
  'Period': '期间', 'Permissions': '权限', 'Phone': '电话',
  'Plan': '套餐', 'Plans': '套餐', 'Postal Code': '邮政编码',
  'Previous': '上一步', 'Price': '价格', 'Price List': '价格表',
  'Pricing': '定价', 'Print': '打印', 'Priority': '优先级',
  'Product': '产品', 'Product Recipes': '产品食谱', 'Products': '产品',
  'Professional': '专业版', 'Profile': '个人资料', 'Promotions': '促销',
  'Purchase Orders': '采购订单',
  'QR Code': '二维码', 'Quantity': '数量', 'Quick Actions': '快捷操作',
  'Quick Login': '快速登录', 'Read Status': '阅读状态',
  'Recipes': '食谱', 'Registration No.': '注册号',
  'Rejected': '已拒绝', 'Remove': '移除', 'Rent': '租金',
  'Rent Management': '租金管理', 'Report': '报告', 'Reports': '报告',
  'Required': '必填', 'Reset': '重置', 'Reset Password': '重置密码',
  'Resolved': '已解决', 'Restaurant': '餐厅', 'Restaurant Admin': '餐厅管理员',
  'Restaurant Admins': '餐厅管理员', 'Restaurant Management': '餐厅管理',
  'Restaurant Owner': '餐厅业主', 'Restaurant Performance': '餐厅业绩',
  'Restaurants': '餐厅', 'Restore': '恢复', 'Revenue': '收入',
  'Role': '角色', 'Rows per page': '每页行数',
  'Sales': '销售', 'Sales Report': '销售报告', 'Save': '保存',
  'Saving...': '保存中...', 'Schedule': '计划', 'Search': '搜索',
  'Search...': '搜索...', 'Security': '安全', 'Select': '选择',
  'Select Restaurants': '选择餐厅', 'Select target...': '选择目标...',
  'Send': '发送', 'Sent': '已发送', 'Settings': '设置',
  'Setup Quote': '安装报价', 'Show': '显示', 'Sign In': '登录',
  'Sign Up': '注册', 'Signing in...': '登录中...',
  'Site Settings': '网站设置', 'Staff': '员工', 'Start Date': '开始日期',
  'State': '州', 'Status': '状态', 'Stock': '库存',
  'Store Settings': '店铺设置', 'Street Address': '街道地址',
  'Subject': '主题', 'Submit': '提交', 'Subscription': '订阅',
  'Subscription Plans': '订阅套餐', 'Subscriptions': '订阅',
  'Subtotal': '小计', 'Summary': '摘要', 'Supplier': '供应商',
  'Suppliers': '供应商', 'Support': '支持', 'Support Tickets': '支持工单',
  'Suspended': '已暂停', 'System': '系统', 'System Admin': '系统管理员',
  'System Config': '系统配置', 'System Inquiry': '系统咨询',
  'System Logs': '系统日志', 'System Products': '系统产品',
  'System Settings': '系统设置',
  'Table': '桌号', 'Tables': '桌号', 'Takeaway': '外卖',
  'Tax': '税费', 'Tax No. (SST/GST)': '税号 (SST/GST)',
  'Team': '团队', 'Technical': '技术', 'Technical Issue': '技术问题',
  'Tenant': '租户', 'Tenant Support': '租户支持', 'Test': '测试',
  'Test Accounts': '测试账户', 'This Month': '本月', 'This Week': '本周',
  'Ticket': '工单', 'Ticket Number': '工单编号', 'Time': '时间',
  'Timezone': '时区', 'Title': '标题', 'To': '结束',
  'Today': '今天', "Today's Orders": '今日订单', "Today's Revenue": '今日收入',
  "Today's Total Orders": '今日总订单', 'Total': '总计',
  'Total Inquiries': '总咨询', 'Total Managers': '总经理数',
  'Total Orders': '总订单', 'Total Received': '总接收',
  'Total Restaurants': '总餐厅数', 'Total Revenue': '总收入',
  'Total Sent': '总发送', 'Total Tickets': '总工单',
  'Trade Name': '商号', 'Transaction': '交易', 'Trial': '试用',
  'Try Demo': '试用演示', 'Type': '类型',
  'Unit': '单位', 'Unknown': '未知', 'Unpaid': '未支付',
  'Unread': '未读', 'Update': '更新', 'Update Manager': '更新经理',
  'Upload': '上传', 'Urgent': '紧急', 'URL': 'URL',
  'Username': '用户名', 'Users': '用户', 'Value': '值',
  'View': '查看', 'View All': '查看全部', 'View Details': '查看详情',
  'Website': '网站', 'Week': '周', 'Weekly': '每周',
  'Welcome': '欢迎', 'Year': '年', 'Yearly': '每年', 'Yes': '是',
};

// Malay dictionary
const MS_DICT = {
  'About': 'Tentang', 'Account': 'Akaun', 'Account Management': 'Pengurusan Akaun',
  'Actions': 'Tindakan', 'Active': 'Aktif', 'Active Restaurants': 'Restoran Aktif',
  'Activity': 'Aktiviti', 'Activity History': 'Sejarah Aktiviti', 'Add': 'Tambah',
  'Add Manager': 'Tambah Pengurus', 'Add New': 'Tambah Baharu', 'Add Staff': 'Tambah Kakitangan',
  'Address': 'Alamat', 'Admin': 'Pentadbir', 'Admin Management': 'Pengurusan Pentadbir',
  'All': 'Semua', 'All Categories': 'Semua Kategori', 'All Priorities': 'Semua Keutamaan',
  'All Priority': 'Semua Keutamaan', 'All Senders': 'Semua Penghantar', 'All Status': 'Semua Status',
  'Amount': 'Amaun', 'Amount Due': 'Jumlah Perlu Dibayar', 'Analytics': 'Analitik',
  'Annual': 'Tahunan', 'Apply': 'Guna', 'Approved': 'Diluluskan', 'Area': 'Kawasan',
  'Are you sure?': 'Adakah anda pasti?', 'Attachments': 'Lampiran',
  'Available Accounts': 'Akaun Tersedia', 'Average': 'Purata', 'Avg Revenue / Store': 'Purata Hasil / Kedai',
  'Back': 'Kembali', 'Back to Home': 'Kembali ke Laman Utama', 'Backup': 'Sandaran',
  'Backup & Restore': 'Sandaran & Pemulihan', 'Basic': 'Asas', 'Basic Information': 'Maklumat Asas',
  'Billing': 'Bil', 'Billing Cycle': 'Kitaran Bil', 'Blog': 'Blog',
  'Brand': 'Jenama', 'Brand General': 'Ketua Jenama', 'Brand Manager': 'Pengurus Jenama',
  'Brand Manager Dashboard': 'Papan Pemuka Pengurus Jenama', 'Brand Plans': 'Pelan Jenama',
  'Brand Products': 'Produk Jenama', 'Brand Recipes': 'Resipi Jenama',
  'Brand Subscriptions': 'Langganan Jenama', 'Brand Summary': 'Ringkasan Jenama',
  'Brands': 'Jenama', 'Bug Report': 'Laporan Pepijat', 'By Brand': 'Mengikut Jenama',
  'Cancel': 'Batal', 'Cancelled': 'Dibatalkan', 'Categories': 'Kategori',
  'Category': 'Kategori', 'Change History': 'Sejarah Perubahan', 'Choose a brand...': 'Pilih jenama...',
  'City': 'Bandar', 'Close': 'Tutup', 'Closed': 'Ditutup', 'Closing Time': 'Waktu Tutup',
  'Company Info': 'Maklumat Syarikat', 'Company Information': 'Maklumat Syarikat',
  'Company Logo': 'Logo Syarikat', 'Company Name': 'Nama Syarikat', 'Company Settings': 'Tetapan Syarikat',
  'Completed': 'Selesai', 'Confirm': 'Sahkan', 'Confirm Password': 'Sahkan Kata Laluan',
  'Contact': 'Hubungi', 'Contact Information': 'Maklumat Hubungan',
  'Contact Inquiries': 'Pertanyaan Hubungan', 'Content': 'Kandungan', 'Content Management': 'Pengurusan Kandungan',
  'Country': 'Negara', 'Coupon': 'Kupon', 'Coupons': 'Kupon', 'Create': 'Cipta',
  'Created': 'Dicipta', 'Currency': 'Mata Wang', 'Current': 'Semasa',
  'Customer': 'Pelanggan', 'Customer Display': 'Paparan Pelanggan', 'Customers': 'Pelanggan',
  'Daily': 'Harian', 'Daily Settlement': 'Penyelesaian Harian', 'Dashboard': 'Papan Pemuka',
  'Data': 'Data', 'Date': 'Tarikh', 'Default': 'Lalai', 'Delete': 'Padam',
  'Deleting...': 'Memadamkan...', 'Delivery': 'Penghantaran', 'Demo': 'Demo',
  'Demo Accounts': 'Akaun Demo', 'Description': 'Keterangan', 'Details': 'Butiran',
  'Dine-in': 'Makan Di Sini', 'Discount': 'Diskaun', 'Done': 'Selesai', 'Download': 'Muat Turun',
  'Draft': 'Draf', 'Due Date': 'Tarikh Akhir',
  'Edit': 'Sunting', 'Email': 'E-mel', 'Email or Username': 'E-mel atau Nama Pengguna',
  'Enabled': 'Diaktifkan', 'Disabled': 'Dinyahaktifkan', 'End Date': 'Tarikh Tamat',
  'Enterprise': 'Perusahaan', 'Error': 'Ralat', 'Expired': 'Tamat Tempoh',
  'Export': 'Eksport', 'Export CSV': 'Eksport CSV',
  'FAQ': 'Soalan Lazim', 'Feature Request': 'Permintaan Ciri', 'Features': 'Ciri-ciri',
  'Filter': 'Tapis', 'Floor Plan': 'Pelan Lantai', 'Foodcourt': 'Medan Selera',
  'Foodcourt General': 'Ketua Medan Selera', 'Foodcourt Manager': 'Pengurus Medan Selera',
  'Foodcourt Plans': 'Pelan Medan Selera', 'Foodcourt Subscriptions': 'Langganan Medan Selera',
  'Forgot your password?': 'Lupa kata laluan?', 'Free': 'Percuma',
  'From': 'Dari', 'Full Name': 'Nama Penuh',
  'General': 'Umum', 'Generate': 'Jana', 'Get Started': 'Mulakan',
  'Grand Total': 'Jumlah Keseluruhan', 'Growth': 'Pertumbuhan', 'Guide': 'Panduan',
  'Hardware': 'Perkakasan', 'Hardware Quotes': 'Sebut Harga Perkakasan',
  'Help': 'Bantuan', 'High': 'Tinggi', 'History': 'Sejarah', 'Home': 'Laman Utama',
  'ID': 'ID', 'Image': 'Gambar', 'Import': 'Import', 'Important': 'Penting',
  'In Progress': 'Sedang Berjalan', 'Inactive': 'Tidak Aktif', 'Ingredients': 'Bahan',
  'Inquiry': 'Pertanyaan', 'Inquiry Management': 'Pengurusan Pertanyaan', 'Inventory': 'Inventori',
  'Invoice': 'Invois', 'Invoice Management': 'Pengurusan Invois',
  'Invoice Number': 'Nombor Invois', 'Invoice Settings': 'Tetapan Invois',
  'Invoices': 'Invois', 'Item': 'Item', 'Items': 'Item',
  'Joined': 'Sertai', 'Kitchen Display': 'Paparan Dapur',
  'Language': 'Bahasa', 'Last Month': 'Bulan Lepas', 'Last Updated': 'Kemas Kini Terakhir',
  'Live Orders': 'Pesanan Langsung', 'Loading...': 'Memuatkan...',
  'Loading dashboard...': 'Memuatkan papan pemuka...', 'Loading notices...': 'Memuatkan notis...',
  'Login': 'Log Masuk', 'Logout': 'Log Keluar', 'Low': 'Rendah',
  'Management': 'Pengurusan', 'Manager': 'Pengurus', 'Managers': 'Pengurus',
  'Medium': 'Sederhana', 'Membership': 'Keahlian', 'Menu': 'Menu',
  'Menu Access': 'Akses Menu', 'Menu Management': 'Pengurusan Menu',
  'Message': 'Mesej', 'Method': 'Kaedah', 'Mobile Order': 'Pesanan Mudah Alih',
  'Monthly': 'Bulanan', 'Monthly Revenue': 'Hasil Bulanan',
  'Name': 'Nama', 'New': 'Baharu', 'New Inquiry': 'Pertanyaan Baharu', 'New Order': 'Pesanan Baharu',
  'Next': 'Seterusnya', 'No': 'Tidak', 'No data available': 'Tiada data',
  'No inquiries yet': 'Belum ada pertanyaan', 'No notices found': 'Tiada notis ditemui',
  'No results found': 'Tiada hasil ditemui', 'No tickets yet': 'Belum ada tiket',
  'No permissions': 'Tiada kebenaran', 'None': 'Tiada', 'Normal': 'Biasa',
  'Notes': 'Nota', 'Notices': 'Notis', 'Notifications': 'Pemberitahuan',
  'OK': 'OK', 'Open': 'Buka', 'Open Tickets': 'Tiket Terbuka',
  'Opening Time': 'Waktu Buka', 'Operation': 'Operasi', 'Operation Inquiry': 'Pertanyaan Operasi',
  'Operation Settings': 'Tetapan Operasi', 'Options': 'Pilihan', 'Order': 'Pesanan',
  'Order History': 'Sejarah Pesanan', 'Orders': 'Pesanan', 'Other': 'Lain-lain',
  'Overview': 'Gambaran', 'Overdue': 'Tertunggak', 'Owner': 'Pemilik',
  'POS': 'POS', 'POS Terminal': 'Terminal POS', 'Package': 'Pakej',
  'Packages': 'Pakej', 'Page': 'Halaman', 'Paid': 'Telah Dibayar',
  'Password': 'Kata Laluan', 'Payment': 'Pembayaran', 'Payment History': 'Sejarah Pembayaran',
  'Payment Method': 'Kaedah Pembayaran', 'Payment Methods': 'Kaedah Pembayaran',
  'Payment Settings': 'Tetapan Pembayaran', 'Pending': 'Menunggu',
  'Performance': 'Prestasi', 'Performance analytics': 'Analitik prestasi',
  'Period': 'Tempoh', 'Permissions': 'Kebenaran', 'Phone': 'Telefon',
  'Plan': 'Pelan', 'Plans': 'Pelan', 'Postal Code': 'Poskod',
  'Previous': 'Sebelumnya', 'Price': 'Harga', 'Price List': 'Senarai Harga',
  'Pricing': 'Harga', 'Print': 'Cetak', 'Priority': 'Keutamaan',
  'Product': 'Produk', 'Product Recipes': 'Resipi Produk', 'Products': 'Produk',
  'Professional': 'Profesional', 'Profile': 'Profil', 'Promotions': 'Promosi',
  'Purchase Orders': 'Pesanan Belian',
  'QR Code': 'Kod QR', 'Quantity': 'Kuantiti', 'Quick Actions': 'Tindakan Pantas',
  'Quick Login': 'Log Masuk Pantas', 'Read Status': 'Status Baca',
  'Recipes': 'Resipi', 'Registration No.': 'No. Pendaftaran',
  'Rejected': 'Ditolak', 'Remove': 'Buang', 'Rent': 'Sewa',
  'Rent Management': 'Pengurusan Sewa', 'Report': 'Laporan', 'Reports': 'Laporan',
  'Required': 'Wajib', 'Reset': 'Set Semula', 'Reset Password': 'Set Semula Kata Laluan',
  'Resolved': 'Diselesaikan', 'Restaurant': 'Restoran', 'Restaurant Admin': 'Pentadbir Restoran',
  'Restaurant Admins': 'Pentadbir Restoran', 'Restaurant Management': 'Pengurusan Restoran',
  'Restaurant Owner': 'Pemilik Restoran', 'Restaurant Performance': 'Prestasi Restoran',
  'Restaurants': 'Restoran', 'Restore': 'Pulihkan', 'Revenue': 'Hasil',
  'Role': 'Peranan', 'Rows per page': 'Baris setiap halaman',
  'Sales': 'Jualan', 'Sales Report': 'Laporan Jualan', 'Save': 'Simpan',
  'Saving...': 'Menyimpan...', 'Schedule': 'Jadual', 'Search': 'Carian',
  'Search...': 'Carian...', 'Security': 'Keselamatan', 'Select': 'Pilih',
  'Select Restaurants': 'Pilih Restoran', 'Select target...': 'Pilih sasaran...',
  'Send': 'Hantar', 'Sent': 'Dihantar', 'Settings': 'Tetapan',
  'Setup Quote': 'Sebut Harga Pemasangan', 'Show': 'Tunjuk', 'Sign In': 'Log Masuk',
  'Sign Up': 'Daftar', 'Signing in...': 'Sedang log masuk...',
  'Site Settings': 'Tetapan Laman', 'Staff': 'Kakitangan', 'Start Date': 'Tarikh Mula',
  'State': 'Negeri', 'Status': 'Status', 'Stock': 'Stok',
  'Store Settings': 'Tetapan Kedai', 'Street Address': 'Alamat Jalan',
  'Subject': 'Subjek', 'Submit': 'Hantar', 'Subscription': 'Langganan',
  'Subscription Plans': 'Pelan Langganan', 'Subscriptions': 'Langganan',
  'Subtotal': 'Jumlah Kecil', 'Summary': 'Ringkasan', 'Supplier': 'Pembekal',
  'Suppliers': 'Pembekal', 'Support': 'Sokongan', 'Support Tickets': 'Tiket Sokongan',
  'Suspended': 'Digantung', 'System': 'Sistem', 'System Admin': 'Pentadbir Sistem',
  'System Config': 'Konfigurasi Sistem', 'System Inquiry': 'Pertanyaan Sistem',
  'System Logs': 'Log Sistem', 'System Products': 'Produk Sistem',
  'System Settings': 'Tetapan Sistem',
  'Table': 'Meja', 'Tables': 'Meja', 'Takeaway': 'Bungkus',
  'Tax': 'Cukai', 'Tax No. (SST/GST)': 'No. Cukai (SST/GST)',
  'Team': 'Pasukan', 'Technical': 'Teknikal', 'Technical Issue': 'Isu Teknikal',
  'Tenant': 'Penyewa', 'Tenant Support': 'Sokongan Penyewa', 'Test': 'Ujian',
  'Test Accounts': 'Akaun Ujian', 'This Month': 'Bulan Ini', 'This Week': 'Minggu Ini',
  'Ticket': 'Tiket', 'Ticket Number': 'Nombor Tiket', 'Time': 'Masa',
  'Timezone': 'Zon Masa', 'Title': 'Tajuk', 'To': 'Hingga',
  'Today': 'Hari Ini', "Today's Orders": 'Pesanan Hari Ini', "Today's Revenue": 'Hasil Hari Ini',
  "Today's Total Orders": 'Jumlah Pesanan Hari Ini', 'Total': 'Jumlah',
  'Total Inquiries': 'Jumlah Pertanyaan', 'Total Managers': 'Jumlah Pengurus',
  'Total Orders': 'Jumlah Pesanan', 'Total Received': 'Jumlah Diterima',
  'Total Restaurants': 'Jumlah Restoran', 'Total Revenue': 'Jumlah Hasil',
  'Total Sent': 'Jumlah Dihantar', 'Total Tickets': 'Jumlah Tiket',
  'Trade Name': 'Nama Dagangan', 'Transaction': 'Transaksi', 'Trial': 'Percubaan',
  'Try Demo': 'Cuba Demo', 'Type': 'Jenis',
  'Unit': 'Unit', 'Unknown': 'Tidak Diketahui', 'Unpaid': 'Belum Dibayar',
  'Unread': 'Belum Dibaca', 'Update': 'Kemas Kini', 'Update Manager': 'Kemas Kini Pengurus',
  'Upload': 'Muat Naik', 'Urgent': 'Segera', 'URL': 'URL',
  'Username': 'Nama Pengguna', 'Users': 'Pengguna', 'Value': 'Nilai',
  'View': 'Lihat', 'View All': 'Lihat Semua', 'View Details': 'Lihat Butiran',
  'Website': 'Laman Web', 'Week': 'Minggu', 'Weekly': 'Mingguan',
  'Welcome': 'Selamat Datang', 'Year': 'Tahun', 'Yearly': 'Tahunan', 'Yes': 'Ya',
};

function translateValue(enValue, dict) {
  // Exact match
  if (dict[enValue]) return dict[enValue];

  // Try case-insensitive
  for (const [k, v] of Object.entries(dict)) {
    if (k.toLowerCase() === enValue.toLowerCase()) return v;
  }

  // Try word-by-word for multi-word phrases
  const words = enValue.split(/\s+/);
  if (words.length >= 2) {
    const translated = words.map(w => {
      if (dict[w]) return dict[w];
      // Try capitalized form
      const cap = w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
      if (dict[cap]) return dict[cap];
      return w;
    });

    // If at least half the words were translated, use the result
    const translatedCount = translated.filter((w, i) => w !== words[i]).length;
    if (translatedCount >= Math.ceil(words.length / 2)) {
      return translated.join(' ');
    }
  }

  return null; // Couldn't translate
}

function processFile(lang, dict, filePath) {
  const enPath = filePath.replace(`/${lang}/`, '/en/');
  if (!fs.existsSync(enPath)) return 0;

  const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const target = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let translated = 0;

  function processObj(enObj, targetObj) {
    for (const [key, val] of Object.entries(enObj)) {
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        if (!targetObj[key]) targetObj[key] = {};
        processObj(val, targetObj[key]);
      } else if (typeof val === 'string') {
        // Only translate if current value equals English (untranslated)
        if (targetObj[key] === val || targetObj[key] === undefined) {
          const result = translateValue(val, dict);
          if (result && result !== val) {
            targetObj[key] = result;
            translated++;
          }
        }
      }
    }
  }

  processObj(en, target);
  fs.writeFileSync(filePath, JSON.stringify(target, null, 2) + '\n', 'utf8');
  return translated;
}

// Process all files
const langs = [
  { code: 'ko', dict: KO_DICT },
  { code: 'zh', dict: ZH_DICT },
  { code: 'ms', dict: MS_DICT },
];

for (const { code, dict } of langs) {
  let total = 0;
  const dir = path.join(LOCALES, code);
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) {
    const count = processFile(code, dict, path.join(dir, file));
    if (count > 0) total += count;
  }
  console.log(`${code}: ${total} strings translated`);
}
