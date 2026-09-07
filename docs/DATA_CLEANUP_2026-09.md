# 데이터 정리 2026-09 — 오염값·중복

> 실측 2026-09-07 (운영 `purple_production_db`, 읽기 전용) · Fable 판정 · Irene 승인.
> 실측 도구 `dev-backend/scripts/survey-dirty-data.js` (SELECT 전용, 쓰기 0줄)
> 정리 도구 `dev-backend/scripts/migrate-dedupe-2026-09.js` (기본 미리보기, `--apply` 로만 쓰기)
>
> **이 문서는 1주제 = "2026-09 데이터 정리" 다.** 다른 주제를 여기 붙이지 않는다.

---

## 1. 우리가 정리하는 것 (Irene 판단 불필요 — 시스템 결함이 만든 중복)

기계가 한다. 운영 적용은 `/배포` 지시 때 **채번 코드 배포 → 백업 → 미리보기 대조 → `--apply`** 순서로만.

| 무엇 | 운영 건수 | 처분 | 근거 |
|---|---|---|---|
| 공급업체 매핑 완전중복 | 36줄 | 비대표 쪽 삭제 | 2026-08-28 일회성 스크립트 잔재. 36줄 전부 발주 참조 0. 발주가 쓴 4줄은 전부 살아남는 대표 쪽 |
| 같은 이름 재료 두 줄 | 8쌍 중 **7쌍** | 살아있는 줄로 참조를 옮기고 빈 줄 삭제 | 2026-09-04 "레시피는 옛 줄·발주는 새 줄" 갈림과 같은 자리 |
| 〃 K-Gochujang Sauce | **1쌍 정지** | 손대지 않음 | 지는 줄 #1 에 재고 이력(거래 8·배치 4). 정지 조건 ③ 발동 |
| 재료 코드 중복 | 2쌍 | 나중 줄에 새 번호(ING-059·060) | 채번이 건수 기반이던 결함. 2026-09-06 원자 카운터로 수정됨 |
| 재고아이템 코드 중복 | 14쌍 | 나중 줄에 새 번호(PI-327~340) | 〃 |

**병합 정지 조건** (하나라도 걸리면 그 쌍은 손대지 않고 보고):
① 지는 줄에 매장재고 수량 ≠ 0 ② 지는 줄만 출처(`source_*`)를 가짐 ③ 지는 줄에 재고 이력(거래·배치)
④ 지는 줄에 **0 이 아닌 원가 행**(`ingredient_costs`·`restaurant_ingredient_costs`) — 합산·선택은 사람 몫이다.

### 🔴 이 작업에서 배운 것 — 목록의 근거는 컬럼 이름이 아니라 FK 실측이다
재료 참조 테이블 목록을 **모델 grep(컬럼 이름 `ingredient_id`)** 으로 만들었더니, 실제로는
`product_ingredients`(재고아이템)를 가리키는 컬럼 둘이 섞여 들어왔다:
`product_recipe_ingredients.ingredient_id` · `brand_product_option_ingredients.ingredient_id`.
그대로 돌렸으면 재료 병합이 **브랜드 프로덕트레시피 4줄**(운영 실측)을 엉뚱한 재고아이템으로 덮어썼고,
줄 수·고아 가드는 전부 통과했을 것이다. 근거는 `information_schema.KEY_COLUMN_USAGE` 다.
같은 이유로 내가 앞서 보고한 "운영에 프로덕트레시피 고아 48줄"은 **잘못된 조인이 만든 허수**였다.

### 적용 전 실측 결과 (2026-09-07, 운영 읽기 전용)
| 확인 | 결과 |
|---|---|
| 같은 레시피가 살릴 줄·지는 줄을 둘 다 쓰는가(유니크 충돌) | **0건** |
| 같은 옵션이 둘 다 쓰는가 | **0건** |
| 같은 판매자상품 매핑이 양쪽에 있는가 | **0건** |
| 같은 매장 재고 행이 양쪽에 있는가 | 7건 — 지는 쪽은 **이동이 아니라 삭제**라 충돌 없음 |
| 지는 줄 재고 껍데기에 `min_stock` 등 설정값 | **0건** |
| 매핑 중복 36조합의 대표 표시 | 전부 정상(대표 1개씩) |
| `ingredients.owner_type` NULL | **0건** → 미리보기 번호 = 실제 배정 번호 |

### 병합 쓰기 경로 증명 (dev 픽스처, 2026-09-07)
dev 에는 병합될 쌍이 없어 리허설이 UPDATE/DELETE 를 한 줄도 타지 않았다. 그래서 데모매장(38)에
픽스처를 만들어 실행했다: `recipe_ingredients` 1줄 이동 · `ingredient_seller_products` 1줄 이동 ·
`restaurant_ingredient_stocks` 1줄 삭제 확인. 이어서 지는 줄에 원가 7.77 을 주입하니
**정지 조건 ④가 발동**했고, 원가를 지우니 병합으로 복귀했다(양방향 반증). 픽스처 잔재 0.

**되돌릴 수 없는 것을 지키는 가드** (하나라도 어긋나면 트랜잭션 롤백):
레시피 줄 수 불변 · 프로덕트레시피 줄 수 불변 · **레시피 고아가 늘지 않음**(절대값 0 이 아니라 증분 — 운영에는 이미 고아 48줄이 있고 우리가 만든 것이 아니다) · 재번호 후 코드 중복 0.

### 재발 감시 (배포 게이트, fail-closed)
`scripts/inspection/suites/ingredient-unification.js` 에 3건 추가. 고장주입 **3/3 반증 완료**.
- `ING-UNI-022` 같은 대상↔같은 판매자상품 매핑 중복 0
- `ING-UNI-023` 재료·재고아이템 코드 중복 0 (같은 소유 안)
- `ING-UNI-024` 발주 환산값이 불가능한 값 0 (10만 이상·0 이하)

---

## 2. 사람이 채워야 하는 것 — 매장만 아는 값

아래는 **지우면 안 되는 것**이다. 값이 비어 있거나 틀린 것이라 화면에서 고쳐야 한다.

### 환산값 판별 기준 (실측으로 확인)
`환산값`은 "공급업체 1단위 = 우리 취급단위 몇 개"다. **`기준양`과 같으면 정상**이다.
- 정상 예: 고추장 14kg → `환산값 14000`, `기준양 14000 g` (kg당 RM 9.86) · 식초 18L → `18000 ml` (L당 RM 5.83)
- 오염: 참깨 `250000` 인데 기준양은 `500 g` (kg당 RM 0.16 — 불가능) · 조갯살 `250000` 인데 기준양은 `1 pack`

### A. 발주 환산값이 불가능한 값 — 고쳐야 하는 것
| 매핑id | 품목 | 매장 | 현재값 | 단가 | 취급단위 | 기준양 |
|---|---|---|---|---|---|---|
| 199 | Roasted Sesame Seed (볶은참깨오뚜기(팩)500g) | (브랜드 공용) | 250000.0000 | 39.00 | g | 500.00 |
| 1028 | Cockle Meat(Blood Clam) 300 / 500 Pcs (조갯살) | with MIN Cafe | 250000.0000 | 0.00 | pack | 1.00 |
| 1029 | Cockle Meat(Blood Clam) 300 / 500 Pcs (조갯살) | with MIN Cafe | 250000.0000 | 10.00 | pack | 1.00 |
| 1030 | Cockle Meat(Blood Clam) 300 / 500 Pcs (조갯살) | with MIN Cafe | 250000.0000 | 10.00 | pack | 1.00 |

### B. 공급업체 단가가 0 인 매핑 — 단가를 넣어야 원가가 산다
| 매핑id | 품목 | 매장 | 공급업체 |
|---|---|---|---|
| 419 | 12OZ Double Wall Paper Cup Kraft (갈색 큰 종이컵 12OZ) | (브랜드 공용) | UGS |
| 417 | 9OZ / 270ML Double Wall Paper Cup Kraft (갈색 종이컵 작은 넙적 9OZ) | (브랜드 공용) | UGS |
| 223 | Anchovi Sauce (멸치액젓 하선정) | (브랜드 공용) | New Seoul Mart |
| 18 | Black Sugar Syrup (흑설탕시럽) | (브랜드 공용) | AIM coffee |
| 246 | Clam Meat(Lala Meat)_200g | (브랜드 공용) | Nikudo |
| 435 | Dish Wash Lime Ppt / x / ctn (유리창 세제) | (브랜드 공용) | UGS |
| 239 | Dried seaweed sheet for KImbob (김밥용 김) | (브랜드 공용) | New Seoul Mart |
| 167 | Garlic Powder Golden Chef (마늘파우더) | (브랜드 공용) | LSH |
| 117 | Gud Sandwich Slice Cheese (슬라이스치즈) | (브랜드 공용) | Lee's Fandbee Frozen |
| 410 | Hdpe Plastic Glove / M (투명비닐장갑 M) | (브랜드 공용) | UGS |
| 444 | Ice Cream Tub Cup 160Z 97mm(D) White x20pkts (흰색 빙수컵 종이 뚜껑) | (브랜드 공용) | UGS |
| 173 | Icing Sugar Prai (아이스설탕가루) | (브랜드 공용) | LSH |
| 241 | Kimbob Burdock (김밥 우엉 대용량) | (브랜드 공용) | New Seoul Mart |
| 187 | Margarine (마가린(버터밥용)) | (브랜드 공용) | LSH |
| 168 | Onion Powder Golden Chef (양파파우더) | (브랜드 공용) | LSH |
| 433 | Oven Cleaner High Grade Colorless / 10Liters (오븐 세제 대형 (주방기구)) | (브랜드 공용) | UGS |
| 439 | Paper Bag Twisted Handle 270mm×210mm×140mm (트위스트손잡이 종이백) | (브랜드 공용) | UGS |
| 420 | Paper Cold Cup 80mm x 117mm White x 20pkts (갈색 흰 종이 음료컵(아이스용)) | (브랜드 공용) | UGS |
| 445 | Paper Ice Cream Tub Cup 160Z / 95mm x 101mm White x20pkts (흰색 종이 빙수컵) | (브랜드 공용) | UGS |
| 413 | Paperbowlldi 10MM Transparent x 20pkts (갈색 빙수컵 플라스틱 뚜껑) | (브랜드 공용) | UGS |
| 396 | Plastic Perforated Roll Bag (비닐 롤백) | (브랜드 공용) | UGS |
| 186 | Potato Starch All day (감자전분) | (브랜드 공용) | LSH |
| 184 | Prawn Cracker_Jumbo (새우스낵) | (브랜드 공용) | LSH |
| 422 | Reclosable Lid Black (검정 종이컵 뚜껑 큰) | (브랜드 공용) | UGS |
| 416 | Single Wall Paper Bowl Plain Kraft (갈색 종이 밥그릇(S)) | (브랜드 공용) | UGS |
| 394 | Thermal Roll 80MM X 60MM X 12MM (L) (영수증 페이퍼롤) | (브랜드 공용) | UGS |
| 158 | Tofu (순두부(튜브)) | (브랜드 공용) | LSH |
| 188 | Tomato Sauce All day (토마토 소스) | (브랜드 공용) | LSH |
| 170 | Tomato Sauce Maggi (케찹) | (브랜드 공용) | LSH |
| 224 | Udon Sauce (청수 우동다시1.8L) | (브랜드 공용) | New Seoul Mart |
| 1215 | 120Z I 95mm x 107mm I Transparent x20pkts; 1,000pcs (플라스틱 음료컵(아이스용)) | with MIN Cafe |  |
| 1217 | 2OZ PP Round Sauce Container With Hinged Lid (플라스틱 소스통(M)) | with MIN Cafe |  |
| 448 | 3-PLY Natural Jute Twisted Twine Rustic Crafty String Roll / 100M / Natural Brown (갈색 천끈) | with MIN Cafe |  |
| 1139 | Anchovi Sauce (멸치액젓 하선정 2.5kg) | with MIN Cafe | New Seoul Mart |
| 854 | Anchovi Sauce (멸치액젓 하선정) | with MIN Cafe | New Seoul Mart |
| 51 | Apple Cinnamon Jam (포장PE봉투6*9cm) | with MIN Cafe | Direct |
| 863 | Black Sugar Syrup (흑설탕시럽) | with MIN Cafe | AIM coffee |
| 1223 | BT Paper Two Compartment Lunch Box Kraft (M) (도시락박스(반반/샌드위치)) | with MIN Cafe |  |
| 54 | Chocolate Powder (초코릿 가루) | with MIN Cafe | Direct |
| 1028 | Cockle Meat(Blood Clam) 300 / 500 Pcs (조갯살) | with MIN Cafe | Nikudo |
| 1186 | Dish Wash Lime Ppt / x / ctn (유리창 세제) | with MIN Cafe |  |
| 1225 | Disposablevinylglove Powder Free / Semi-Transparent / M (실리콘장갑 (M / 친환경)) | with MIN Cafe |  |
| 1226 | Double Wall Paper Bowl Kraft (갈색 빙수컵 종이) | with MIN Cafe |  |
| 48 | Dried Black Barry (Like small raisin) (블랙베리) | with MIN Cafe | Direct |
| 55 | Dried Raisin (건포도sunmaid) | with MIN Cafe | Direct |
| 1021 | Dried seaweed sheet for KImbob (김밥용 김) | with MIN Cafe | New Seoul Mart |
| 1020 | Dried seaweed sheet for KImbob (김밥용김_100매) | with MIN Cafe | New Seoul Mart |
| 959 | Garlic Powder Golden Chef (마늘파우더) | with MIN Cafe | LSH |
| 917 | Gud Sandwich Slice Cheese (슬라이스치즈) | with MIN Cafe | Lee's Fandbee Frozen |
| 1163 | Hdpe Plastic Glove / M (투명비닐장갑 M) | with MIN Cafe |  |
| 1227 | Hdpe Plastic Glove / M (투명비닐장갑 M) | with MIN Cafe |  |
| 1195 | Ice Cream Tub Cup 160Z 97mm(D) White x20pkts (흰색 빙수컵 종이 뚜껑) | with MIN Cafe |  |
| 1228 | Ice Cream Tub Cup 160Z 97mm(D) White x20pkts (흰색 빙수컵 종이 뚜껑) | with MIN Cafe |  |
| 964 | Icing Sugar Prai (아이스설탕가루) | with MIN Cafe | LSH |
| 1023 | Kimbob Burdock (김밥 우엉 대용량) | with MIN Cafe | New Seoul Mart |
| 364 | Lime Cordial (라임쥬스) | with MIN Cafe | Village Grocer |
| 365 | Makgeolli Strawberry (딸기막걸리) | with MIN Cafe | Village Grocer |
| 978 | Margarine (마가린(버터밥용)) | with MIN Cafe | LSH |
| 1232 | NO 8 Flower Cases Cup Cake Paper Liner 41MM X 23MM (종이받침 (곶감용)) | with MIN Cafe |  |
| 960 | Onion Powder Golden Chef (양파파우더) | with MIN Cafe | LSH |
| 1184 | Oven Cleaner High Grade Colorless / 10Liters (오븐 세제 대형 (주방기구)) | with MIN Cafe |  |
| 1233 | Paper Bag Twisted Handle 270mm×210mm×140mm (트위스트손잡이 종이백) | with MIN Cafe |  |
| 1190 | Paper Bag Twisted Handle 270mm×210mm×140mm (트위스트손잡이 종이백) | with MIN Cafe |  |
| 1234 | Paper Cold Cup 80mm x 117mm White x 20pkts (갈색 흰 종이 음료컵(아이스용)) | with MIN Cafe |  |
| 1172 | Paper Cold Cup 80mm x 117mm White x 20pkts (갈색 흰 종이 음료컵(아이스용)) | with MIN Cafe |  |
| 1196 | Paper Ice Cream Tub Cup 160Z / 95mm x 101mm White x20pkts (흰색 종이 빙수컵) | with MIN Cafe |  |
| 1235 | Paper Ice Cream Tub Cup 160Z / 95mm x 101mm White x20pkts (흰색 종이 빙수컵) | with MIN Cafe |  |
| 1166 | Paperbowlldi 10MM Transparent x 20pkts (갈색 빙수컵 플라스틱 뚜껑) | with MIN Cafe |  |
| 1236 | Paperbowlldi 10MM Transparent x 20pkts (갈색 빙수컵 플라스틱 뚜껑) | with MIN Cafe |  |
| 1237 | Pck 2 Cup Drinks Egg Tray (컵받침 / 2컵용) | with MIN Cafe |  |
| 1238 | Pck Dcut #D BR Brown (구멍 손잡이 종이백) | with MIN Cafe |  |
| 1241 | PE Singlet Bag 18'' X 20'' (비닐봉투(L)) | with MIN Cafe |  |
| 53 | Peanuts (Almond) Crumbs (땅콩(아몬드)가루) | with MIN Cafe | Direct |
| 1243 | Plastic Perforated Roll Bag (비닐 롤백) | with MIN Cafe |  |
| 1149 | Plastic Perforated Roll Bag (비닐 롤백) | with MIN Cafe |  |
| 977 | Potato Starch All day (감자전분) | with MIN Cafe | LSH |
| 975 | Prawn Cracker_Jumbo (새우스낵) | with MIN Cafe | LSH |
| 1174 | Reclosable Lid Black (검정 종이컵 뚜껑 큰) | with MIN Cafe |  |
| 1247 | Reclosable Lid Black (검정 종이컵 뚜껑 큰) | with MIN Cafe |  |
| 363 | Shrimp (새우) | with MIN Cafe | Village Grocer |
| 1248 | Single Wall Paper Bowl Plain Kraft (갈색 종이 밥그릇(L)) | with MIN Cafe |  |
| 49 | Snow Powder | with MIN Cafe | Direct |
| 1252 | Sun Paper Bag Twisted Handle Brown 28CM X 15CM X 30CM (손잡이 종이백) | with MIN Cafe |  |
| 446 | Take Away Cup Leak Proof Paper 120MM (깔개 및 컵 덮개) | with MIN Cafe |  |
| 1147 | Thermal Roll 80MM X 60MM X 12MM (L) (영수증 페이퍼롤) | with MIN Cafe |  |
| 1253 | Thermal Roll 80MM X 60MM X 12MM (L) (영수증 페이퍼롤) | with MIN Cafe |  |
| 1254 | TK 1000 (A1000) Clear Rectangular Container With Lid (소스판매용 사각 플라스틱통) | with MIN Cafe |  |
| 951 | Tofu (순두부(튜브)) | with MIN Cafe | LSH |
| 979 | Tomato Sauce All day (토마토 소스) | with MIN Cafe | LSH |
| 962 | Tomato Sauce Maggi (케찹) | with MIN Cafe | LSH |
| 1007 | Udon Sauce (청수 우동다시1.8L) | with MIN Cafe | New Seoul Mart |
| 366 | Vanilla Syrup (바닐라시럽) | with MIN Cafe | Village Grocer |
| 1255 | Zip Lock Bag 6" X 9" (냉장고용 플라스틱 봉투) | with MIN Cafe |  |

### C. 공급업체 단가는 있는데 재료 원가가 0 — 원가가 안 따라간 것
| 재료id | 품목 | 매장 | 매핑단가 |
|---|---|---|---|
| 1066 | Aust Midfield Brisket Pedo (소고기_호주_양지) | with MIN Cafe | 43.00 |
| 926 | Barley Tea Bag (보리차) | with MIN Cafe | 8.00 |
| 202 | Broom / Mop Stick (자루) | with MIN Cafe | 2.00 |
| 996 | Carrot (당근) | with MIN Cafe | 3.80 |
| 909 | Clorox Bleach Porex (클로록스(락스)) | with MIN Cafe | 7.30 |
| 970 | Cockle Meat(Blood Clam) 300 / 500 Pcs (조갯살) | with MIN Cafe | 10.00 |
| 880 | Cyber Fresh Cling Film (VIT 인스턴트 면) | with MIN Cafe | 38.90 |
| 875 | Dishwashing Liquid (주방세제) | with MIN Cafe | 8.40 |
| 1011 | Fancy Ring Note Book | with MIN Cafe | 4.90 |
| 969 | Fire oil (화유 500ml-Sias) | with MIN Cafe | 40.00 |
| 868 | Frozen Squid Ring With Skin (오징어 몸통 링) | with MIN Cafe | 13.00 |
| 838 | Gas Cylinder (14kg) (가스통) | with MIN Cafe | 35.00 |
| 961 | Glass Noodle (당면 14kg) | with MIN Cafe | 150.00 |
| 965 | Glass Noodle (당면 백설햇 1kg) | with MIN Cafe | 150.00 |
| 940 | Honey ginger (꿀생강청 꽃샘) | with MIN Cafe | 32.00 |
| 939 | Hotteok (삼립미니꿀호떡) | with MIN Cafe | 2.40 |
| 950 | Kimchi (K1 할랄김치) | with MIN Cafe | 48.00 |
| 925 | Kimchi (포기김치 10kg) | with MIN Cafe | 48.00 |
| 866 | Lees Chicken Frank 32ea (프랑크소시지(닭)) | with MIN Cafe | 5.50 |
| 1001 | Lemon (레몬) | with MIN Cafe | 1.90 |
| 1010 | Masking Tape 48mm x 40yrds (마스킹테이프) | with MIN Cafe | 3.50 |
| 221 | Microfiber Mop | with MIN Cafe | 9.90 |
| 218 | Mop Head | with MIN Cafe | 8.90 |
| 203 | Paper Clip (클립) | with MIN Cafe | 3.90 |
| 1005 | Red Apple (PinkLady) (홍사과) | with MIN Cafe | 1.50 |
| 927 | Roasted Sesame Seed (볶은참깨오뚜기(팩)500g) | with MIN Cafe | 39.00 |
| 817 | Sliced Beef for Bulgogi (소고기 (불고기용)) | with MIN Cafe | 43.00 |
| 220 | Yeepi Torch Lighter | with MIN Cafe | 3.30 |

### D. 판매가가 0 인 활성 상품
| 상품id | 상품 | 매장 | 코드 |
|---|---|---|---|
| 365 | Fried Chicken(HALF) | K-DINE IPC Branch |  |
| 362 | Kimchi Jjigae (S) | K-DINE IPC Branch |  |
| 363 | Kimchi Jjigae(S) | K-DINE IPC Branch |  |
| 377 | Rooh Afza | K-DINE IPC Branch |  |
| 364 | Sundubu Jjigae(S)  | K-DINE IPC Branch |  |
| 604 | Fried Chicken Wing 4pcs for SET | The Fire Korean Restaurant |  |
| 727 | Fried Chicken Wing 4pcs for SET | The Fire Korean Restaurant |  |
| 853 | Fried Chicken Wing 4pcs for SET | The Fire Korean Restaurant |  |
| 214 | Red Bean Bingsu with RM1 for orders over RM100 | with MIN Cafe | DB7 |

### E. 같은 매장에 같은 이름 상품 — 주문 이력 기준

운영 주문 **17,694건 전수**를 훑어 상품 id 별로 센 것이다. 삭제가 아니라 **숨김(비활성)** 이므로 되돌릴 수 있다.

| 매장 | 이름 | 각 줄 (id · 가격 · 코드 · 주문건수 · 최근) | 판단 |
|---|---|---|---|
| K-DINE | Vege Jampong Ramen | #94·#95·#96·#97·#102 전부 RM15.90, **주문 0건** | 5줄 다 안 팔림 → 한 줄만 남기고 숨김 |
| K-DINE | Ramen Tteokbokki | #62 T3 RM16.90 **650건** / #353 Wed RM14.90 **103건** / #352 LW RM4.90 **0건** | 앞 둘은 요일 특가 = 유지, #352 숨김 |
| K-DINE | Gochujang Bibimbap | #39 B1 RM16.90 **716건** / #354 Tues RM14.90 **169건** | **요일 특가 = 둘 다 유지** |
| K-DINE | Jjajang Rice Bowl | #35 M4 RM16.90 **101건** / #100 Mon RM14.90 **83건** | **요일 특가 = 둘 다 유지** |
| K-DINE | Sausage Egg Fried Rice | #49 F1 RM16.90 **164건** / #355 Thurs RM14.90 **51건** | **요일 특가 = 둘 다 유지** |
| K-DINE | KIMCHI | #92 **0건** / #335 **100건** | #92 숨김 |
| K-DINE | Add Ramen | #337 **1건**(2026-03-21) / #338 **71건**(최근) | 둘 다 팔림 — Irene 확인 필요 |
| K-DINE | 2Pax Sundubu(S) | #372 **0건** / #373 **4건** | #372 숨김 |
| Seoul Garden | Bulgogi | #442 a01 **0건** / #445 **0건** / #446 RM20 **35건** | #442·#445 숨김 |
| Seoul Garden | Bulgogi rice | #440 A01 **0건** / #441 A01 **1건** | #440 숨김 |

**Irene 확인(2026-09-07): 요일 특가는 그대로 유지.** 위 표의 "요일 특가 = 둘 다 유지" 4종은 중복 대상에서 제외한다.

#### 숨김 대상 확정 — **10개** (11개에서 1개 제외)
`95 · 96 · 97 · 102 · 352 · 92 · 337 · 442 · 445 · 440`

제외: **#372 `2Pax Sundubu(S)`** — AI 음식인식 참조사진(`menu_reference_photos#142`)이 걸려 있다.
Irene 조건이 "연결고리 없어서 문제 없으면"이므로 걸린 것은 남긴다.

**연결고리 전수 확인 방법**: 이름을 추측하지 않고 `information_schema.COLUMNS` 에서
`%product_id%`·`%menu_item_id%` 컬럼 **29개를 전부** 뽑아 11개 id 참조를 셌다. 걸린 곳은 둘:
- `menu_reference_photos.product_id` 1건 → **진짜**(위 #372)
- `ingredient_seller_products.seller_product_id` 14건 → **거짓 양성**. 이 컬럼은 공급업체/브랜드 상품 id 이지
  `products.id` 가 아니다(실측: 14건 전부 `seller_type='supplier'`). id 번호대가 겹쳤을 뿐이다.

**Vege Jampong Ramen 5줄 중 남길 것 = #94.** 다섯 줄이 완전히 동일하고(가격·분류·레시피·이미지·순서),
주문 참조도 **다섯 줄 모두 0건**(운영 주문 17,694건 전수)이라 구별 근거가 데이터에 없다 → 최저 id.

숨김 실행: `node scripts/migrate-dedupe-2026-09.js --deactivate 95,96,97,102,352,92,337,442,445,440 --apply`
(삭제가 아니라 `is_active=0` — 되돌릴 수 있다)

### F. 상품 코드(SKU)가 겹치는 것 — 매장이 손으로 친 코드
| 매장 | 코드 | 겹치는상품 |
|---|---|---|
| K-DINE IPC Branch | A9 | #31 ALA CARTE - Beef Doenjang-jjigae / #103 Beef Doenjang Jjigae |
| lua_test | 123 | #438 test / #439 test2 |
| Seoul Garden BBQ | A01 | #440 Bulgogi rice / #441 bulgogi rice / #442 bulgogi / #450 Bulgogi rice bowl |
| with MIN Cafe | DSD12 | #276 Sikhye / #277 Crushed Pear Drink / #278 Coke |
| with MIN Cafe | VE4 | #307 ★Bibimbap / #309 ★Potato Pancake |
| with MIN Cafe | VE5 | #308 ★Tofu Salad Bibimbap / #310 ★Kimchi Pancake |

