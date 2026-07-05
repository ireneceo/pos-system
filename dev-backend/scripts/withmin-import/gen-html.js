const fs = require('fs');
const path = require('path');
const { stats, buckets, data, issues } = JSON.parse(fs.readFileSync(path.join(__dirname, 'preview-data.json'), 'utf8'));

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const BUCKET_LABEL = { BG_SOLD: '판매품목', REST_ONLY: '전용', BG_EXT: '공유' };

const tile = (n, label, sub) => `<div class="tile"><div class="tile-n">${n}</div><div class="tile-l">${label}</div>${sub ? `<div class="tile-s">${sub}</div>` : ''}</div>`;

const supChips = (arr) => arr.sort((a, b) => b[1].n - a[1].n).map(([s, v]) => `<span class="chip"><span class="chip-name">${esc(s)}</span><span class="chip-n">${v.n}</span></span>`).join('');

const rowHtml = (d, i) => {
  const srcs = d.sources.map(s => `<span class="src src-${s.bucket}">${esc(s.sup)}<span class="src-item">${esc(s.item)}</span>${s.code ? `<span class="src-code">${esc(s.code)}</span>` : ''}${s.price ? `<span class="src-price">RM${Number(s.price).toFixed(2)}</span>` : '<span class="src-price src-none">—</span>'}</span>`).join('');
  const sset = [...new Set(d.sources.map(s => s.bucket))].join(' ');
  return `<tr class="row" data-level="${d.level}" data-buckets="${sset}" data-name="${esc(d.name).toLowerCase()}">
    <td class="c-idx">${i + 1}</td>
    <td class="c-name">${esc(d.name)}${d.flag ? `<span class="flag">${esc(d.flag)}</span>` : ''}</td>
    <td class="c-lvl"><span class="lvl lvl-${d.level}">${d.level === 'BG' ? 'BG 공유' : 'with MIN 전용'}</span></td>
    <td class="c-unit">${esc(d.unit)}</td>
    <td class="c-src">${srcs}</td>
  </tr>`;
};

const html = `<title>With MIN 공급망 임포트 — 검토 프리뷰</title>
<style>
:root{
  --bg:#fafafc; --panel:#ffffff; --ink:#1a1922; --ink-soft:#5b5966; --line:#e7e6ee;
  --accent:#635BFF; --accent-soft:#efeeff; --bg-shared:#4f46e5; --bg-shared-bg:#eef0ff;
  --rest:#b45309; --rest-bg:#fdf3e6; --sold:#0f766e; --sold-bg:#e6f6f3; --warn:#dc2626; --warn-bg:#fdeceb;
  --mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
  --sans:system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",sans-serif;
}
@media (prefers-color-scheme:dark){:root{
  --bg:#131218; --panel:#1c1b23; --ink:#ecebf2; --ink-soft:#a3a1b0; --line:#2c2b36;
  --accent:#8b84ff; --accent-soft:#26243a; --bg-shared:#a5a0ff; --bg-shared-bg:#242244;
  --rest:#e0a355; --rest-bg:#332614; --sold:#5fd6c6; --sold-bg:#13322e; --warn:#f2726b; --warn-bg:#33191a;
}}
:root[data-theme="dark"]{--bg:#131218;--panel:#1c1b23;--ink:#ecebf2;--ink-soft:#a3a1b0;--line:#2c2b36;--accent:#8b84ff;--accent-soft:#26243a;--bg-shared:#a5a0ff;--bg-shared-bg:#242244;--rest:#e0a355;--rest-bg:#332614;--sold:#5fd6c6;--sold-bg:#13322e;--warn:#f2726b;--warn-bg:#33191a;}
:root[data-theme="light"]{--bg:#fafafc;--panel:#ffffff;--ink:#1a1922;--ink-soft:#5b5966;--line:#e7e6ee;--accent:#635BFF;--accent-soft:#efeeff;--bg-shared:#4f46e5;--bg-shared-bg:#eef0ff;--rest:#b45309;--rest-bg:#fdf3e6;--sold:#0f766e;--sold-bg:#e6f6f3;--warn:#dc2626;--warn-bg:#fdeceb;}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);line-height:1.5;-webkit-font-smoothing:antialiased}
.wrap{max-width:1120px;margin:0 auto;padding:32px 24px 80px}
header h1{font-size:26px;font-weight:700;letter-spacing:-.02em;margin:0 0 4px;text-wrap:balance}
header p{color:var(--ink-soft);margin:0 0 24px;font-size:14px}
.eyebrow{font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--accent);margin-bottom:10px}
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;margin-bottom:28px}
.tile{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 16px}
.tile-n{font-size:24px;font-weight:700;font-variant-numeric:tabular-nums;font-family:var(--mono)}
.tile-l{font-size:12px;color:var(--ink-soft);margin-top:2px}
.tile-s{font-size:11px;color:var(--ink-soft);margin-top:4px;opacity:.8}
section{margin-bottom:28px}
h2{font-size:14px;font-weight:700;margin:0 0 12px;letter-spacing:-.01em}
.bucket{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-bottom:10px}
.bucket-head{font-size:12px;font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:8px}
.dot{width:8px;height:8px;border-radius:50%}
.dot-sold{background:var(--sold)}.dot-rest{background:var(--rest)}.dot-ext{background:var(--bg-shared)}
.chips{display:flex;flex-wrap:wrap;gap:6px}
.chip{display:inline-flex;align-items:center;gap:6px;background:var(--bg);border:1px solid var(--line);border-radius:999px;padding:3px 4px 3px 10px;font-size:12px}
.chip-n{font-family:var(--mono);font-size:11px;background:var(--accent-soft);color:var(--accent);border-radius:999px;padding:1px 7px;font-variant-numeric:tabular-nums}
.callout{background:var(--warn-bg);border:1px solid color-mix(in srgb,var(--warn) 30%,transparent);border-radius:12px;padding:14px 16px;font-size:13px}
.callout b{color:var(--warn)}
.callout ul{margin:8px 0 0;padding-left:18px}
.bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;position:sticky;top:0;background:var(--bg);padding:12px 0;z-index:5;border-bottom:1px solid var(--line)}
.bar input{flex:1;min-width:180px;background:var(--panel);border:1px solid var(--line);border-radius:9px;padding:9px 12px;color:var(--ink);font-size:14px;font-family:var(--sans)}
.bar input:focus{outline:2px solid var(--accent);outline-offset:1px}
.seg{display:inline-flex;border:1px solid var(--line);border-radius:9px;overflow:hidden}
.seg button{background:var(--panel);border:0;color:var(--ink-soft);padding:8px 12px;font-size:13px;cursor:pointer;font-family:var(--sans)}
.seg button[aria-pressed="true"]{background:var(--accent);color:#fff}
.count{font-size:12px;color:var(--ink-soft);font-family:var(--mono)}
.tbl-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:12px;margin-top:12px}
table{border-collapse:collapse;width:100%;font-size:13px;min-width:760px}
th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-soft);font-weight:700;padding:10px 12px;border-bottom:1px solid var(--line);position:sticky;top:57px;background:var(--panel)}
td{padding:9px 12px;border-bottom:1px solid var(--line);vertical-align:top}
tr.row:hover td{background:var(--accent-soft)}
.c-idx{color:var(--ink-soft);font-family:var(--mono);font-size:11px;text-align:right;width:38px}
.c-name{font-weight:600;max-width:280px}
.flag{display:block;font-size:11px;font-weight:600;color:var(--warn);margin-top:2px}
.lvl{display:inline-block;font-size:11px;font-weight:700;padding:2px 8px;border-radius:999px;white-space:nowrap}
.lvl-BG{background:var(--bg-shared-bg);color:var(--bg-shared)}
.lvl-RESTAURANT{background:var(--rest-bg);color:var(--rest)}
.c-unit{font-family:var(--mono);font-size:12px;color:var(--ink-soft)}
.c-src{max-width:440px}
.src{display:block;padding:2px 0;font-size:12px}
.src-item{color:var(--ink-soft);margin-left:6px}
.src-code{font-family:var(--mono);font-size:10px;color:var(--ink-soft);background:var(--bg);border:1px solid var(--line);border-radius:4px;padding:0 5px;margin-left:6px}
.src-price{font-family:var(--mono);font-size:11px;margin-left:6px;color:var(--sold);font-variant-numeric:tabular-nums}
.src-none{color:var(--ink-soft)}
.src::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:7px;vertical-align:middle}
.src-BG_SOLD::before{background:var(--sold)}.src-REST_ONLY::before{background:var(--rest)}.src-BG_EXT::before{background:var(--bg-shared)}
.hidden{display:none}
</style>

<div class="wrap">
<header>
  <div class="eyebrow">운영 쓰기 전 검토 · 쓰기 0</div>
  <h1>With MIN 공급망 임포트 프리뷰</h1>
  <p>gitconsulting(BG) · with MIN Cafe — 원본 ${stats.rows}행에서 파생된 재고 ${stats.stocks}개, 공급업체 ${stats.suppliers}곳. 이름·분류를 확인하고 승인하시면 dev 실행 → 운영 백업 → 운영 반영으로 진행합니다.</p>
</header>

<div class="tiles">
  ${tile(stats.stocks, '재고 항목', `BG 공유 ${stats.bgStock} · 전용 ${stats.restStock}`)}
  ${tile(stats.suppliers, '공급업체', '3개 버킷')}
  ${tile(stats.brandProducts, '판매품목(BrandProduct)', 'UGS · Tourmanium')}
  ${tile(stats.rows, '셀러소스 연결', `가격없음 ${stats.noPrice}`)}
</div>

<section>
  <h2>공급업체 분류</h2>
  <div class="bucket"><div class="bucket-head"><span class="dot dot-sold"></span>판매품목 — GITconsulting이 파는 상품(BrandProduct, 전 브랜드 공유)</div><div class="chips">${supChips(buckets.BG_SOLD)}</div></div>
  <div class="bucket"><div class="bucket-head"><span class="dot dot-rest"></span>with MIN 전용 외부공급업체 — RA(withmin1) 등록, 브랜드 공유 안 함</div><div class="chips">${supChips(buckets.REST_ONLY)}</div></div>
  <div class="bucket"><div class="bucket-head"><span class="dot dot-ext"></span>BG 외부공급업체 — 브랜드 레벨 등록, 전 브랜드 공유</div><div class="chips">${supChips(buckets.BG_EXT)}</div></div>
</section>

${issues.length ? `<section><div class="callout"><b>확인 필요 ${issues.length + 1}건</b> — 소스 데이터 이슈(임포트는 진행되며 값만 비어있음):<ul><li>가격 없음 ${stats.noPrice}행 → RM0으로 넣고 나중에 채움</li><li>‘Apple Cinnamon Jam (포장PE봉투…)’ 등 한글칸/품명 불일치 행 = 원본 표 밀림 의심 → 눈으로 확인</li></ul></div></section>` : ''}

<section>
  <h2>재고 항목 · 셀러소스</h2>
  <div class="bar">
    <input id="q" type="search" placeholder="재고 이름 검색…" aria-label="검색">
    <div class="seg" id="lvl">
      <button data-v="all" aria-pressed="true">전체</button>
      <button data-v="BG" aria-pressed="false">BG 공유</button>
      <button data-v="RESTAURANT" aria-pressed="false">전용</button>
    </div>
    <span class="count" id="count"></span>
  </div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>#</th><th>재고 이름 (영문 + 한글)</th><th>레벨</th><th>단위</th><th>셀러소스 (공급업체 · 품명 · 가격)</th></tr></thead>
      <tbody id="tb">${data.map(rowHtml).join('')}</tbody>
    </table>
  </div>
</section>
</div>

<script>
(function(){
  var q=document.getElementById('q'),tb=document.getElementById('tb'),count=document.getElementById('count');
  var rows=[].slice.call(tb.querySelectorAll('.row')),lvl='all';
  function apply(){
    var term=(q.value||'').trim().toLowerCase(),shown=0;
    rows.forEach(function(r){
      var okL=lvl==='all'||r.getAttribute('data-level')===lvl;
      var okQ=!term||r.getAttribute('data-name').indexOf(term)>-1;
      var vis=okL&&okQ; r.classList.toggle('hidden',!vis); if(vis)shown++;
    });
    count.textContent=shown+' / '+rows.length;
  }
  q.addEventListener('input',apply);
  document.getElementById('lvl').addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b)return;
    lvl=b.getAttribute('data-v');
    [].forEach.call(this.querySelectorAll('button'),function(x){x.setAttribute('aria-pressed',x===b);});
    apply();
  });
  apply();
})();
</script>`;

fs.writeFileSync(path.join(__dirname, 'PREVIEW.html'), html);
console.log('PREVIEW.html', html.length, 'bytes');
