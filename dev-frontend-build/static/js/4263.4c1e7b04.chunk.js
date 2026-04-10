"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4263],{512:(e,r,t)=>{t.d(r,{x:()=>E,A:()=>T});var s=t(9950),n=t(4752),o=t(5030),i=t(4414);const a=["Su","Mo","Tu","We","Th","Fr","Sa"],d=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[r,t,s]=e.split("-").map(Number);return new Date(r,t-1,s)},c=(e,r)=>e.getFullYear()===r.getFullYear()&&e.getMonth()===r.getMonth()&&e.getDate()===r.getDate(),p=(e,r)=>new Date(e,r).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=n.Ay.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 1000;
  background: #FFFFFF;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  padding: 20px 24px;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
    padding: 20px 16px;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.2s ease-out;

    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  }
`,x=n.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,u=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #E6EBF1;
  min-width: 120px;

  @media (max-width: 768px) {
    flex-direction: row;
    border-right: none;
    border-bottom: 1px solid #E6EBF1;
    padding-right: 0;
    margin-right: 0;
    padding-bottom: 12px;
    margin-bottom: 16px;
    min-width: 0;
    gap: 4px;
  }
`,g=n.Ay.button`
  padding: 8px 12px;
  text-align: left;
  background: transparent;
  color: #374151;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.12s;
  white-space: nowrap;

  &:hover {
    background: #F3F4F6;
  }

  @media (max-width: 768px) {
    flex: 1;
    text-align: center;
    padding: 8px 10px;
    background: #F6F9FC;
    border-radius: 8px;
  }
`,j=n.Ay.div``,v=n.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,m=n.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #6B7280;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #F3F4F6;
  }
`,y=n.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,f=n.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,F=n.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,b=n.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,k=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,S=n.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,w=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,C=n.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,A=n.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.12s, color 0.12s;
  position: relative;
  user-select: none;

  color: ${e=>e.$isStart||e.$isEnd?"#FFFFFF":e.$isInRange?"#635BFF":"#374151"};
  background: ${e=>e.$isStart||e.$isEnd?"#635BFF":e.$isInRange?"#F0EEFF":"transparent"};
  font-weight: ${e=>e.$isStart||e.$isEnd||e.$isToday?700:400};

  ${e=>e.$isToday&&!e.$isStart&&!e.$isEnd&&"\n    &::after {\n      content: '';\n      position: absolute;\n      bottom: 4px;\n      width: 4px;\n      height: 4px;\n      border-radius: 50%;\n      background: #635BFF;\n    }\n  "}

  ${e=>e.$isHoverEnd&&!e.$isStart&&!e.$isEnd&&"\n    background: #E8E5FF;\n    color: #635BFF;\n  "}

  &:hover {
    ${e=>!e.$isStart&&!e.$isEnd&&`\n      background: ${e.$isInRange?"#E8E5FF":"#F3F4F6"};\n    `}
  }
`,P=e=>{let{startDate:r,endDate:t,onRangeSelect:n,onClose:P,isOpen:$}=e;const{t:E}=(0,o.Bd)("common"),B=new Date,[D,M]=(0,s.useState)(B.getMonth()),[O,I]=(0,s.useState)(B.getFullYear()),[T,R]=(0,s.useState)(null),[z,_]=(0,s.useState)(null),[L,W]=(0,s.useState)(null),[N,H]=(0,s.useState)("start"),U=(0,s.useRef)(null);(0,s.useEffect)(()=>{r&&R(l(r)),t&&_(l(t))},[r,t]),(0,s.useEffect)(()=>{$&&H("start")},[$]),(0,s.useEffect)(()=>{const e=e=>{U.current&&!U.current.contains(e.target)&&P()};return $&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[$,P]);const V=(0,s.useCallback)(()=>{0===D?(M(11),I(e=>e-1)):M(e=>e-1)},[D]),Y=(0,s.useCallback)(()=>{11===D?(M(0),I(e=>e+1)):M(e=>e+1)},[D]),K=(e,r)=>{const t=((e,r)=>new Date(e,r+1,0).getDate())(e,r),s=((e,r)=>new Date(e,r,1).getDay())(e,r),o=[];for(let n=0;n<s;n++)o.push(null);for(let n=1;n<=t;n++)o.push(new Date(e,r,n));return(0,i.jsxs)(F,{children:[(0,i.jsx)(b,{children:p(e,r)}),(0,i.jsx)(k,{children:a.map(e=>(0,i.jsx)(S,{children:e},e))}),(0,i.jsx)(w,{children:o.map((e,r)=>{if(!e)return(0,i.jsx)(C,{},`e-${r}`);const{isStart:t,isEnd:s,isInRange:o,isHoverEnd:a}=(e=>{const r=T&&c(e,T),t=z&&c(e,z),s="end"===N&&L?L:z;let n=!1;if(T&&s){const[r,t]=T<=s?[T,s]:[s,T];n=((e,r,t)=>{const s=e.getTime();return s>r.getTime()&&s<t.getTime()})(e,r,t)}return{isStart:r,isEnd:t,isInRange:n,isHoverEnd:"end"===N&&L&&c(e,L)}})(e),l=c(e,B);return(0,i.jsx)(A,{$isStart:!!t,$isEnd:!!s,$isInRange:o,$isHoverEnd:!!a,$isToday:l,onClick:()=>(e=>{if("start"===N)R(e),_(null),H("end");else{let r=T,t=e;t<r&&([r,t]=[t,r]),R(r),_(t),H("start"),n(d(r),d(t)),setTimeout(P,200)}})(e),onMouseEnter:()=>W(e),onMouseLeave:()=>W(null),children:e.getDate()},e.getTime())})})]})},q=11===D?0:D+1,G=11===D?O+1:O,J=e=>{const r=new Date;let t;const s=r;switch(e){case"this_week":t=new Date(r),t.setDate(r.getDate()-r.getDay());break;case"this_month":t=new Date(r.getFullYear(),r.getMonth(),1);break;case"this_year":t=new Date(r.getFullYear(),0,1);break;default:return}R(t),_(s),H("start"),n(d(t),d(s)),setTimeout(P,150)};return $?(0,i.jsx)(h,{ref:U,children:(0,i.jsxs)(x,{children:[(0,i.jsxs)(u,{children:[(0,i.jsx)(g,{onClick:()=>J("this_week"),children:"This Week"}),(0,i.jsx)(g,{onClick:()=>J("this_month"),children:"This Month"}),(0,i.jsx)(g,{onClick:()=>J("this_year"),children:"This Year"})]}),(0,i.jsxs)(j,{children:[(0,i.jsxs)(v,{children:[(0,i.jsx)(m,{onClick:V,"aria-label":"Previous month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,i.jsx)(m,{onClick:Y,"aria-label":"Next month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,i.jsxs)(y,{children:[K(O,D),(0,i.jsx)(f,{children:K(G,q)})]})]})]})}):null},$=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,E=(e,r)=>{const t=(e=>{if(!e)return new Date;try{const r=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[t,s,n]=r.split("-").map(Number);return new Date(t,s-1,n)}catch{return new Date}})(r);let s=new Date(t);const n=new Date(t);switch(e){case"today":break;case"yesterday":s.setDate(t.getDate()-1),n.setDate(t.getDate()-1);break;case"week":s.setDate(t.getDate()-6);break;case"month":s.setDate(t.getDate()-29);break;case"year":s.setDate(t.getDate()-364);break;case"all":s=new Date(2020,0,1)}return{start:$(s),end:$(n)}},B=n.Ay.div`
  margin-bottom: 24px;
`,D=n.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,M=n.Ay.button`
  padding: 8px 16px;
  background: ${e=>e.active?"#635BFF":"#FFFFFF"};
  color: ${e=>e.active?"#FFFFFF":"#6B7C93"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#5A51E6":"#F8FAFC"};
    border-color: ${e=>e.active?"#5A51E6":"#CBD5E1"};
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`,O=n.Ay.div`
  position: relative;
  display: inline-block;
`,I=n.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: ${e=>e.active?"#F0EEFF":"#FFFFFF"};
  color: ${e=>e.active?"#635BFF":"#374151"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: #635BFF;
    background: #F8F7FF;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
    gap: 6px;
  }
`,T=e=>{let{activePeriod:r,dateRange:t,isCustomDateRange:n,onPeriodChange:a,onCalendarRangeSelect:d,includeToday:l=!1,children:c}=e;const{t:p}=(0,o.Bd)("common"),[h,x]=(0,s.useState)(!1),u=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],g={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,i.jsx)(B,{children:(0,i.jsxs)(D,{children:[u.map(e=>(0,i.jsx)(M,{active:r===e&&!n,onClick:()=>a(e),children:g[e]},e)),(0,i.jsxs)(O,{children:[(0,i.jsxs)(I,{active:n,onClick:()=>x(!h),children:[(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,i.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,i.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,i.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),t.start&&t.end?`${t.start} ~ ${t.end}`:"Custom Range"]}),(0,i.jsx)(P,{isOpen:h,startDate:t.start,endDate:t.end,onRangeSelect:(e,r)=>{d(e,r),x(!1)},onClose:()=>x(!1)})]}),c]})})}},2653:(e,r,t)=>{t.d(r,{M:()=>o});var s=t(9950),n=t(4492);function o(e){const[r,t]=(0,n.ok)(),o=(0,s.useCallback)(()=>r.get("tab")||e,[r,e]),[i,a]=(0,s.useState)(o());return[i,(0,s.useCallback)(e=>{a(e),t({tab:e})},[t])]}},4263:(e,r,t)=>{t.r(r),t.d(r,{default:()=>G});var s=t(9950),n=t(4752),o=t(8409),i=t(2597),a=t(2653),d=t(1367),l=t(9018),c=t(6038),p=t(8285);const h=e=>{if(null===e||void 0===e)return"";const r=String(e);return r.includes(",")||r.includes('"')||r.includes("\n")||r.includes("\r")?`"${r.replace(/"/g,'""')}"`:r},x=e=>e.map(h).join(",");var u=t(1095),g=t(2847),j=t(3245),v=t(158),m=t(3440),y=t(2174),f=t(4915),F=t(7621),b=t(5297),k=t(7766),S=t(294),w=t(3588),C=t(8012),A=t(512),P=t(3577),$=t(5030),E=t(4414);const B=n.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,D=n.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,M=o.MD,O=n.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,I=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,T=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,R=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,z=n.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,_=n.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,L=n.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,W=n.Ay.div`
  width: 100%;
  height: 4px;
  background: #F3F4F6;
  border-radius: 2px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${e=>e.percentage}%;
    background: #635BFF;
    transition: width 0.3s ease;
  }
`,N=n.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,H=n.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,U=n.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,V=n.Ay.button`
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#6B7C93"};

  &:hover {
    border-color: #635BFF;
    color: ${e=>e.active?"white":"#635BFF"};
  }
`,Y=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,K=n.Ay.div`
  background: #FFF7ED;
  border: 1px solid #FDBA74;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`,q=["#635BFF","#6FCF97","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],G=()=>{var e,r,t,n,G,J;const{t:Z}=(0,$.Bd)("reports"),{user:Q}=(0,d.As)(),{operationSettings:X,paymentSettings:ee}=(0,l.Pj)(),[re,te]=(0,a.M)("sales"),[se,ne]=(0,s.useState)("month"),[oe,ie]=(0,s.useState)(()=>(0,A.x)("month")),[ae,de]=(0,s.useState)(!1),[,le]=(0,s.useState)([]),[ce,pe]=(0,s.useState)(!0),[he,xe]=(0,s.useState)(!1),[ue,ge]=(0,s.useState)(null),[je,ve]=(0,s.useState)([]),[,me]=(0,s.useState)([]),[,ye]=(0,s.useState)([]),[fe,Fe]=(0,s.useState)(null),[be,ke]=(0,s.useState)(!1),[Se,we]=(0,s.useState)("all"),[Ce,Ae]=(0,s.useState)(new Set),[Pe,$e]=(0,s.useState)(new Set),Ee=(0,s.useMemo)(()=>{if(null===fe||void 0===fe||!fe.dailySales||0===fe.dailySales.length)return[];const e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];if("today"===se)return fe.hourlySales?fe.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{date:12===r?"12PM":r>12?r-12+"PM":0===r?"12AM":`${r}AM`,sales:Math.round(e.revenue)}}):[];if("week"===se)return fe.dailySales.map(r=>{const t=new Date(r.date);return{date:e[t.getDay()],sales:Math.round(r.revenue)}});if("month"===se)return fe.dailySales.map(e=>{const[,r,t]=e.date.split("-");return{date:`${r}/${t}`,sales:Math.round(e.revenue)}});{const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r={};return fe.dailySales.forEach(t=>{const s=parseInt(t.date.split("-")[1])-1,n=e[s];r[n]=(r[n]||0)+t.revenue}),e.map(e=>({date:e,sales:Math.round(r[e]||0)}))}},[fe,se]),Be=(0,s.useMemo)(()=>{var e;return(null===fe||void 0===fe||null===(e=fe.summary)||void 0===e?void 0:e.totalRevenue)||0},[fe]),De=(0,s.useMemo)(()=>{var e;return(null===fe||void 0===fe||null===(e=fe.summary)||void 0===e?void 0:e.totalOrders)||0},[fe]),Me=(0,s.useMemo)(()=>{if(null===fe||void 0===fe||!fe.categorySales||0===fe.categorySales.length)return[{name:"No Data",value:100,sales:0}];const e=fe.categorySales.reduce((e,r)=>e+r.revenue,0);return fe.categorySales.map(r=>({name:r.category,value:e>0?Math.round(r.revenue/e*100):0,sales:Math.round(r.revenue)}))},[fe]),Oe=(0,s.useMemo)(()=>{var e;if(null===fe||void 0===fe||!fe.menuSales||0===fe.menuSales.length)return[];const r=(null===(e=fe.menuSales[0])||void 0===e?void 0:e.quantity)||1;return fe.menuSales.map(e=>({name:e.name,category:e.category,price:e.quantity>0?e.revenue/e.quantity:0,orders:e.quantity,revenue:Math.round(e.revenue),performance:Math.round(e.quantity/r*100)}))},[fe]),Ie=(0,s.useMemo)(()=>null!==fe&&void 0!==fe&&fe.hourlySales?fe.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{hour:0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`,orders:e.orders}}):[],[fe]),Te=(0,s.useMemo)(()=>je.map(e=>({...e,period_orders:e.total_orders||0,period_spent:e.total_spent||0})).sort((e,r)=>r.period_spent-e.period_spent),[je]),Re=(0,s.useMemo)(()=>{if(null===fe||void 0===fe||!fe.hourlySales)return{completionRate:0,avgPrepTime:0,peakHour:"N/A",peakHourOrders:0,totalOrdersInPeak:0};let e=12,r=0;fe.hourlySales.forEach(t=>{t.orders>r&&(r=t.orders,e=t.hour)});return{completionRate:100,avgPrepTime:0,peakHour:(e=>{const r=(e+1)%24,t=e=>0===e?"12AM":12===e?"12PM":e>12?e-12+"PM":`${e}AM`;return`${t(e)}-${t(r)}`})(e),peakHourOrders:r,totalOrdersInPeak:r}},[fe]),ze=(0,s.useCallback)(async()=>{if(null===Q||void 0===Q||!Q.restaurantId)return console.log("\u274c No restaurant ID found"),void pe(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void pe(!1);const[r,t,s]=await Promise.all([fetch(`/api/dashboard/restaurant/${Q.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/customers/${Q.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/menu?restaurantId=${Q.restaurantId}&excludeImage=true`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})]);if(r.ok){const e=await r.json();ge(e.data||e)}if(t.ok){const e=await t.json();e.success&&Array.isArray(e.data)&&ve(e.data)}if(s.ok){const e=await s.json();e.success&&e.data&&(e.data.items&&me(e.data.items),e.data.categories&&ye(e.data.categories))}}catch(e){console.error("\u274c Error fetching static data:",e)}finally{pe(!1)}},[null===Q||void 0===Q?void 0:Q.restaurantId]),_e=(0,s.useCallback)(async()=>{if(null===Q||void 0===Q||!Q.restaurantId)return;const e=localStorage.getItem("auth_token");if(e){xe(!0);try{const r=new URLSearchParams({startDate:oe.start,endDate:oe.end}),t=await fetch(`/api/dashboard/restaurant/${Q.restaurantId}/reports-summary?${r.toString()}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();e.success&&(Fe(e.data),le([]))}}catch(r){console.error("\u274c Error fetching reports summary:",r)}finally{xe(!1)}}},[null===Q||void 0===Q?void 0:Q.restaurantId,oe.start,oe.end]);(0,s.useEffect)(()=>{ze()},[ze]),(0,s.useEffect)(()=>{_e()},[_e]);const Le=(0,s.useMemo)(()=>{var e;if(null===fe||void 0===fe||!fe.hourlySales)return[];const r=(null===(e=fe.summary)||void 0===e?void 0:e.totalOrders)||1;return fe.hourlySales.filter(e=>e.orders>0).map(e=>{const t=e.hour;return{time:`${t.toString().padStart(2,"0")}:00-${((t+1)%24).toString().padStart(2,"0")}:00`,orders:e.orders,revenue:Math.round(e.revenue),efficiency:Math.min(100,Math.round(e.orders/(r/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[fe]),We=e=>(0,p._M)(e,ee||void 0),Ne={visa:"Visa",master:"Mastercard",amex:"Amex",other:"Other"},He=(0,s.useMemo)(()=>null!==fe&&void 0!==fe&&fe.paymentMethodSales?fe.paymentMethodSales.sort((e,r)=>r.revenue-e.revenue):[],[fe]),Ue=(0,s.useMemo)(()=>null!==fe&&void 0!==fe&&fe.cardTypeSales?"all"===Se?fe.cardTypeSales:fe.cardTypeSales.filter(e=>e.type===Se):[],[fe,Se]),Ve=(0,s.useMemo)(()=>null!==fe&&void 0!==fe&&fe.cardTypeSales?fe.cardTypeSales.map(e=>e.type):[],[fe]),Ye=(0,s.useMemo)(()=>(null===fe||void 0===fe?void 0:fe.staffMeal)||{revenue:0,orders:0},[fe]),Ke=(0,s.useMemo)(()=>He.reduce((e,r)=>e+r.revenue,0),[He]),qe=(0,s.useMemo)(()=>{if(null===fe||void 0===fe||!fe.dailySales||0===fe.dailySales.length)return{};const e={};return fe.dailySales.forEach(r=>{const[t,s]=r.date.split("-"),n=`${t}-${s}`,o=r.date;e[t]||(e[t]={year:t,revenue:0,orders:0,months:{}}),e[t].months[n]||(e[t].months[n]={month:n,revenue:0,orders:0,days:{}}),e[t].months[n].days[o]||(e[t].months[n].days[o]={day:o,revenue:0,orders:0});const i=r.revenue,a=r.orders;e[t].revenue+=i,e[t].orders+=a,e[t].months[n].revenue+=i,e[t].months[n].orders+=a,e[t].months[n].days[o].revenue+=i,e[t].months[n].days[o].orders+=a}),e},[fe]),Ge=()=>{const e=new Date(oe.start),r=new Date(oe.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(()=>{const e=Ge()})();s.useEffect(()=>{const e=Ge();if(e<=31){const e=new Set(Object.keys(qe)),r=new Set;Object.keys(qe).forEach(e=>{Object.keys(qe[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),Ae(e),$e(r)}else if(e<=365){const e=new Set(Object.keys(qe));Ae(e),$e(new Set)}else Ae(new Set),$e(new Set)},[oe.start,oe.end,De]);const Je=e=>{ne(e),de(!1),ie((0,A.x)(e,X.timeZone))},Ze=(e,r)=>{de(!0),ne("all"),ie({start:e,end:r})},Qe=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e.toFixed(r)},Xe=(0,s.useCallback)(()=>{const e=["Date,Revenue"];return Ee.forEach(r=>{e.push(`${h(r.date)},${Qe(r.sales)}`)}),e.join("\n")},[Ee]),er=(0,s.useCallback)(()=>{const e=["Date,Revenue,Orders,Avg_Order_Value"];return Object.keys(qe).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=qe[r];Object.keys(t.months).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const s=t.months[r];Object.keys(s.days).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=s.days[r],n=t.orders>0?t.revenue/t.orders:0;e.push(`${r},${Qe(t.revenue)},${t.orders},${Qe(n)}`)})})}),e.join("\n")},[qe]),rr=(0,s.useCallback)(()=>{const e=["Rank,Item_Name,Category,Unit_Price,Qty_Sold,Revenue"];return Oe.forEach((r,t)=>{e.push(x([t+1,r.name,r.category,Qe(r.price),r.orders,Qe(r.revenue)]))}),e.join("\n")},[Oe]),tr=(0,s.useCallback)(()=>{const e=["Rank,Name,Phone,Type,Total_Orders,Total_Spent,Points,Tier"];return[...Te].sort((e,r)=>(r.period_spent||0)-(e.period_spent||0)).forEach((r,t)=>{var s,n,o;e.push(x([t+1,(null===(s=r.customer)||void 0===s?void 0:s.name)||"Guest",(null===(n=r.customer)||void 0===n?void 0:n.phone)||"-","member"===(null===(o=r.customer)||void 0===o?void 0:o.type)?"Member":"Guest",r.period_orders||0,Qe(r.period_spent||0),r.points||0,r.loyalty_tier||"Bronze"]))}),e.join("\n")},[Te]),sr=(0,s.useCallback)(()=>{const e=["Time_Slot,Orders,Revenue"];return Le.forEach(r=>{e.push(x([r.time,r.orders,Qe(r.revenue)]))}),e.join("\n")},[Le]),nr=(0,s.useCallback)(()=>{const e=["Payment_Method,Orders,Revenue,Percentage"];return He.forEach(r=>{const t=Ke>0?(r.revenue/Ke*100).toFixed(1):"0.0";e.push(x([We(r.method),r.orders,Qe(r.revenue),`${t}%`]))}),Ue.length>0&&(e.push(""),e.push("Card_Type,Orders,Revenue"),Ue.forEach(r=>{e.push(x([Ne[r.type]||r.type,r.orders,Qe(r.revenue)]))})),Ye.orders>0&&(e.push(""),e.push("Staff_Meal,Orders,Amount"),e.push(x(["Staff Meal (Excluded from revenue)",Ye.orders,Qe(Ye.revenue)]))),e.join("\n")},[He,Ue,Ye,Ke]),or=(0,s.useCallback)(()=>{let e;switch(re){case"sales":default:e=Xe();break;case"details":e=er();break;case"menu":e=rr();break;case"customers":e=tr();break;case"operations":e=sr();break;case"payment":e=nr()}var r,t,s,n,o,i;((e,r)=>{const t=new Blob(["\ufeff"+e],{type:"text/csv;charset=utf-8;"}),s=URL.createObjectURL(t),n=document.createElement("a");n.setAttribute("href",s),n.setAttribute("download",r),n.style.visibility="hidden",n.style.position="absolute",n.style.left="-9999px",document.body.appendChild(n),n.click(),setTimeout(()=>{URL.revokeObjectURL(s),document.body.removeChild(n)},150)})(e,(r=`purplepos_${(null===Q||void 0===Q?void 0:Q.restaurantId)||"report"}`,t=re,s=se,n=ae,o=oe.start,i=oe.end,`${r}_${t}_${n?`${o}_${i}`:s}_${(new Date).toISOString().split("T")[0]}.csv`))},[re,se,ae,oe,null===Q||void 0===Q?void 0:Q.restaurantId,Xe,er,rr,tr,sr,nr]),ir=()=>(0,E.jsxs)(A.A,{activePeriod:se,dateRange:oe,isCustomDateRange:ae,onPeriodChange:Je,onCalendarRangeSelect:Ze,children:[(0,E.jsxs)("button",{onClick:or,style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",background:"#F6F9FC",color:"#0A2540",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"14px",marginLeft:"auto"},children:[(0,E.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,E.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]}),(0,E.jsxs)("button",{onClick:()=>ke(!0),style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",background:"#F6F9FC",color:"#0A2540",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"14px"},children:[(0,E.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,E.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Daily Settlement"]})]});return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(B,{children:[(0,E.jsx)(C.Ay,{title:"Reports"}),(0,E.jsxs)(D,{children:[(0,E.jsxs)(i.tU,{children:[(0,E.jsx)(i.oz,{active:"sales"===re,onClick:()=>te("sales"),children:"Sales Report"}),(0,E.jsx)(i.oz,{active:"details"===re,onClick:()=>te("details"),children:"Sales Details"}),(0,E.jsx)(i.oz,{active:"payment"===re,onClick:()=>te("payment"),children:"Payment Analysis"}),(0,E.jsx)(i.oz,{active:"menu"===re,onClick:()=>te("menu"),children:"Menu Analysis"}),(0,E.jsx)(i.oz,{active:"customers"===re,onClick:()=>te("customers"),children:"Customer Insights"}),(0,E.jsx)(i.oz,{active:"operations"===re,onClick:()=>te("operations"),children:"Operations"})]}),(0,E.jsxs)("div",{style:{display:"sales"===re?"block":"none"},children:[(0,E.jsx)(ir,{}),ce||he?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:Z("reports:reportsPage.loading")}):0===De?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,E.jsxs)("div",{children:[(0,E.jsxs)(M,{children:[(0,E.jsxs)(o.hI,{color:"#059669",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.totalRevenue")}),(0,E.jsx)(o.Os,{children:(0,c.vv)(Be,X.currency)}),(0,E.jsxs)(o.d1,{children:[De," orders in selected period"]})]}),(0,E.jsxs)(o.hI,{color:"#2563EB",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.totalOrders")}),(0,E.jsx)(o.Os,{children:De.toLocaleString()}),(0,E.jsx)(o.d1,{children:Z("reports:reportsPage.forSelectedPeriod")})]}),(0,E.jsxs)(o.hI,{color:"#DC2626",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.averageOrderValue")}),(0,E.jsx)(o.Os,{children:(0,c.vv)(De>0?Be/De:0,X.currency)}),(0,E.jsx)(o.d1,{children:Z("reports:reportsPage.perOrder")})]}),(0,E.jsxs)(o.hI,{color:"#7C3AED",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.completedOrders")}),(0,E.jsx)(o.Os,{children:De}),(0,E.jsx)(o.d1,{children:"100% completion rate"})]})]}),(0,E.jsxs)(O,{children:[(0,E.jsxs)(I,{children:[(0,E.jsx)(T,{children:Z("reports:reportsPage.revenueTrend")}),(0,E.jsx)(u.u,{width:"100%",height:300,children:(0,E.jsxs)(g.b,{data:Ee,margin:{top:5,right:20,left:0,bottom:5},children:[(0,E.jsx)(j.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,E.jsx)(v.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,E.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,E.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,E.jsx)(f.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,E.jsxs)(I,{children:[(0,E.jsx)(T,{children:Z("reports:reportsPage.salesByCategory")}),(0,E.jsx)(u.u,{width:"100%",height:300,children:(0,E.jsxs)(F.r,{children:[(0,E.jsx)(b.F,{data:Me,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Me.map((e,r)=>(0,E.jsx)(k.f,{fill:q[r%q.length]},`cell-${r}`))}),(0,E.jsx)(y.m,{formatter:e=>`${e}%`})]})})]})]}),(0,E.jsxs)(I,{children:[(0,E.jsx)(T,{children:Z("reports:reportsPage.hourlyOrdersDistribution")}),(0,E.jsx)(u.u,{width:"100%",height:250,children:(0,E.jsxs)(S.E,{data:Ie,margin:{top:5,right:20,left:0,bottom:5},children:[(0,E.jsx)(j.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,E.jsx)(v.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,E.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,E.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,E.jsx)(w.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,E.jsxs)("div",{style:{display:"details"===re?"block":"none"},children:[(0,E.jsx)(ir,{}),ce||he?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:Z("reports:reportsPage.loading")}):0===De?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,E.jsxs)("div",{children:[(0,E.jsxs)(M,{children:[(0,E.jsxs)(o.hI,{color:"#059669",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.totalRevenue")}),(0,E.jsx)(o.Os,{children:(0,c.vv)(Be,X.currency)}),(0,E.jsxs)(o.d1,{children:[De," orders in selected period"]})]}),(0,E.jsxs)(o.hI,{color:"#2563EB",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.totalOrders")}),(0,E.jsx)(o.Os,{children:De.toLocaleString()}),(0,E.jsxs)(o.d1,{children:[De," completed"]})]}),(0,E.jsxs)(o.hI,{color:"#DC2626",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.averageOrderValue")}),(0,E.jsx)(o.Os,{children:(0,c.vv)(De>0?Be/De:0,X.currency)}),(0,E.jsx)(o.d1,{children:Z("reports:reportsPage.perOrderAverage")})]}),(0,E.jsxs)(o.hI,{color:"#7C3AED",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.period")}),(0,E.jsx)(o.Os,{children:ae?Ge():"today"===se?"1":"week"===se?"7":"month"===se?"30":"year"===se?"365":Ge()}),(0,E.jsx)(o.d1,{children:ae?`${oe.start} to ${oe.end}`:"today"===se?"Day":"Days"})]})]}),(0,E.jsxs)(R,{children:[(0,E.jsxs)(T,{children:["Detailed Sales Breakdown (",ae?`${oe.start} to ${oe.end}`:se,")"]}),(0,E.jsxs)(z,{children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)(_,{style:{width:"40%"},children:Z("reports:reportsPage.period")}),(0,E.jsx)(_,{style:{textAlign:"right"},children:Z("reports:reportsPage.revenue")}),(0,E.jsx)(_,{style:{textAlign:"right"},children:Z("reports:reportsPage.orders")}),(0,E.jsx)(_,{style:{textAlign:"right"},children:Z("reports:reportsPage.avgOrderValue")})]})}),(0,E.jsx)("tbody",{children:Object.keys(qe).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=qe[e],t=Ce.has(e);return(0,E.jsxs)(s.Fragment,{children:[(0,E.jsxs)(N,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(Ce);if(r.has(e)){var t;r.delete(e);const s=new Set(Pe);Object.keys((null===(t=qe[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{s.delete(`${e}-${r}`)}),$e(s)}else r.add(e);Ae(r)})(e),children:[(0,E.jsxs)(H,{level:0,bold:!0,children:[(0,E.jsx)(U,{expanded:t,children:"\u25b6"}),e]}),(0,E.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue,X.currency)}),(0,E.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,E.jsx)(H,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,X.currency)})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const n=r.months[t],o=`${e}-${t}`,i=Pe.has(o),a=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,E.jsxs)(s.Fragment,{children:[(0,E.jsxs)(N,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set(Pe);r.has(e)?r.delete(e):r.add(e),$e(r)})(o),children:[(0,E.jsxs)(H,{level:1,bold:!0,children:[(0,E.jsx)(U,{expanded:i,children:"\u25b6"}),a]}),(0,E.jsx)(H,{level:1,style:{textAlign:"right"},children:(0,c.vv)(n.revenue,X.currency)}),(0,E.jsx)(H,{level:1,style:{textAlign:"right"},children:n.orders}),(0,E.jsx)(H,{level:1,style:{textAlign:"right"},children:(0,c.vv)(n.revenue/n.orders,X.currency)})]}),i&&Object.keys(n.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=n.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,E.jsxs)(N,{level:2,children:[(0,E.jsx)(H,{level:2,children:t}),(0,E.jsx)(H,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(r.revenue,X.currency)}),(0,E.jsx)(H,{level:2,style:{textAlign:"right"},children:r.orders}),(0,E.jsx)(H,{level:2,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,X.currency)})]},e)})]},o)})]},e)})})]})]})]})]}),(0,E.jsxs)("div",{style:{display:"menu"===re?"block":"none"},children:[(0,E.jsx)(ir,{}),(0,E.jsxs)(M,{children:[(0,E.jsxs)(o.hI,{color:"#F59E0B",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.bestSeller")}),(0,E.jsx)(o.Os,{children:(null===(e=Oe[0])||void 0===e?void 0:e.name)||"N/A"}),(0,E.jsxs)(o.d1,{children:[(null===(r=Oe[0])||void 0===r?void 0:r.orders)||0," sold in selected period"]})]}),(0,E.jsxs)(o.hI,{color:"#10B981",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.menuItems")}),(0,E.jsx)(o.Os,{children:Oe.length}),(0,E.jsx)(o.d1,{children:Z("reports:reportsPage.itemsWithSales")})]}),(0,E.jsxs)(o.hI,{color:"#3B82F6",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.itemsSold")}),(0,E.jsx)(o.Os,{children:Oe.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,E.jsx)(o.d1,{children:Z("reports:reportsPage.totalQuantitySold")})]}),(0,E.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.totalRevenue")}),(0,E.jsx)(o.Os,{children:(0,c.vv)(Oe.reduce((e,r)=>e+r.revenue,0),X.currency)}),(0,E.jsx)(o.d1,{children:Z("reports:reportsPage.forSelectedPeriod")})]})]}),(0,E.jsxs)(R,{children:[(0,E.jsxs)(T,{children:["Complete Menu Performance Ranking (",ae?`${oe.start} to ${oe.end}`:se,")"]}),(0,E.jsxs)(z,{children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)(_,{children:Z("reports:reportsPage.rank")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.menuItem")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.category")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.price")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.qtySold")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.revenue")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.performance")})]})}),(0,E.jsx)("tbody",{children:Oe.map((e,r)=>{var t;const s=(null===(t=Oe[0])||void 0===t?void 0:t.orders)||1;return(0,E.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,E.jsxs)(L,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#6FCF97":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,E.jsx)(L,{style:{fontWeight:600},children:e.name}),(0,E.jsx)(L,{children:(0,E.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,E.jsx)(L,{children:(0,c.vv)(e.price,X.currency)}),(0,E.jsx)(L,{children:e.orders.toLocaleString()}),(0,E.jsx)(L,{children:(0,c.vv)(e.revenue,X.currency)}),(0,E.jsx)(L,{children:(0,E.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,E.jsx)(W,{percentage:e.orders/s*100}),(0,E.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/s*100),"%"]})]})})]},r)})})]})]})]}),(0,E.jsxs)("div",{style:{display:"customers"===re?"block":"none"},children:[(0,E.jsx)(ir,{}),ce||he?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:Z("reports:reportsPage.loadingCustomerData")}):0===Te.length?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No customers with orders in the selected period"}):(0,E.jsxs)("div",{children:[(0,E.jsxs)(M,{children:[(0,E.jsxs)(o.hI,{color:"#635BFF",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.activeCustomers")}),(0,E.jsx)(o.Os,{children:Te.length.toLocaleString()}),(0,E.jsxs)(o.d1,{children:[Te.filter(e=>{var r;return"member"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," members, ",Te.filter(e=>{var r;return"guest"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," guests"]})]}),(0,E.jsxs)(o.hI,{color:"#6FCF97",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.repeatCustomers")}),(0,E.jsx)(o.Os,{children:Te.filter(e=>e.period_orders>1).length}),(0,E.jsxs)(o.d1,{children:[Te.length>0?Math.round(Te.filter(e=>e.period_orders>1).length/Te.length*100):0,"% ordered multiple times"]})]}),(0,E.jsxs)(o.hI,{color:"#FFB800",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.averageSpent")}),(0,E.jsx)(o.Os,{children:(0,c.vv)(Te.length>0?Te.reduce((e,r)=>e+(r.period_spent||0),0)/Te.length:0,X.currency)}),(0,E.jsx)(o.d1,{children:Z("reports:reportsPage.perCustomerInPeriod")})]}),(0,E.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.periodRevenue")}),(0,E.jsx)(o.Os,{children:(0,c.vv)(Te.reduce((e,r)=>e+(r.period_spent||0),0),X.currency)}),(0,E.jsxs)(o.d1,{children:["From ",Te.length," customers"]})]})]}),(0,E.jsxs)(R,{children:[(0,E.jsxs)(T,{children:["Top Customers (",ae?`${oe.start} to ${oe.end}`:se,")"]}),(0,E.jsxs)(z,{children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)(_,{children:Z("reports:reportsPage.rank")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.name")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.phone")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.type")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.periodOrders")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.periodSpent")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.totalPoints")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.tier")})]})}),(0,E.jsx)("tbody",{children:Te.slice(0,20).map((e,r)=>{var t,s,n,o,i,a;return(0,E.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,E.jsxs)(L,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#6FCF97":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,E.jsx)(L,{style:{fontWeight:600},children:(null===(s=e.customer)||void 0===s?void 0:s.name)||"Guest"}),(0,E.jsx)(L,{children:(null===(n=e.customer)||void 0===n?void 0:n.phone)||"-"}),(0,E.jsx)(L,{children:(0,E.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"member"===(null===(o=e.customer)||void 0===o?void 0:o.type)?"#E0F2FE":"#F3F4F6",color:"member"===(null===(i=e.customer)||void 0===i?void 0:i.type)?"#0369A1":"#6B7280"},children:"member"===(null===(a=e.customer)||void 0===a?void 0:a.type)?"Member":"Guest"})}),(0,E.jsx)(L,{children:e.period_orders||0}),(0,E.jsx)(L,{children:(0,c.vv)(e.period_spent||0,X.currency)}),(0,E.jsx)(L,{children:e.points||0}),(0,E.jsx)(L,{children:(0,E.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"VIP"===e.loyalty_tier?"#FEF3C7":"Gold"===e.loyalty_tier?"#FEF9C3":"Silver"===e.loyalty_tier?"#F3F4F6":"#E5E7EB",color:"VIP"===e.loyalty_tier?"#92400E":"Gold"===e.loyalty_tier?"#854D0E":"#6B7280"},children:e.loyalty_tier||"Bronze"})})]},(null===(t=e.customer)||void 0===t?void 0:t.id)||r)})})]})]})]})]}),(0,E.jsxs)("div",{style:{display:"operations"===re?"block":"none"},children:[(0,E.jsx)(ir,{}),ce||he?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:Z("reports:reportsPage.loadingOperationsData")}):0===De?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,E.jsxs)("div",{children:[(0,E.jsxs)(M,{children:[(0,E.jsxs)(o.hI,{color:"#10B981",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.completedOrders")}),(0,E.jsx)(o.Os,{children:De.toLocaleString()}),(0,E.jsxs)(o.d1,{children:[Re.completionRate,"% fulfillment rate"]})]}),(0,E.jsxs)(o.hI,{color:"#F59E0B",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.avgPrepTime")}),(0,E.jsx)(o.Os,{children:Re.avgPrepTime>0?`${Re.avgPrepTime} min`:"N/A"}),(0,E.jsx)(o.d1,{children:Re.avgPrepTime>0?"Order to served":"No timing data"})]}),(0,E.jsxs)(o.hI,{color:"#EF4444",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.peakHour")}),(0,E.jsx)(o.Os,{children:Re.peakHour}),(0,E.jsxs)(o.d1,{children:[Re.peakHourOrders," orders in this slot"]})]}),(0,E.jsxs)(o.hI,{color:"#6366F1",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.ordersPerDay")}),(0,E.jsx)(o.Os,{children:(()=>{const e=Math.max(1,Math.ceil((new Date(oe.end).getTime()-new Date(oe.start).getTime())/864e5)+1);return Math.round(De/e)})()}),(0,E.jsx)(o.d1,{children:Z("reports:reportsPage.averageDailyOrders")})]})]}),(0,E.jsxs)(R,{children:[(0,E.jsxs)(T,{children:["Peak Hours Performance (",ae?`${oe.start} to ${oe.end}`:se,")"]}),(0,E.jsxs)(z,{children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)(_,{children:Z("reports:reportsPage.timeSlot")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.orders")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.revenue")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.share")})]})}),(0,E.jsx)("tbody",{children:0===Le.length?(0,E.jsx)("tr",{children:(0,E.jsx)(L,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No peak hours data available"})}):Le.map((e,r)=>(0,E.jsxs)("tr",{style:{backgroundColor:0===r?"#FEF3C7":"transparent"},children:[(0,E.jsxs)(L,{style:{fontWeight:600},children:[0===r&&"\ud83d\udd25 ",e.time]}),(0,E.jsx)(L,{children:e.orders}),(0,E.jsx)(L,{children:(0,c.vv)(e.revenue,X.currency)}),(0,E.jsx)(L,{children:(0,E.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,E.jsx)(W,{percentage:De>0?e.orders/De*100:0}),(0,E.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[De>0?Math.round(e.orders/De*100):0,"%"]})]})})]},r))})]})]}),(0,E.jsxs)(I,{style:{marginTop:"24px"},children:[(0,E.jsx)(T,{children:Z("reports:reportsPage.hourlyOrderDistribution")}),(0,E.jsx)(u.u,{width:"100%",height:250,children:(0,E.jsxs)(S.E,{data:Ie,margin:{top:5,right:20,left:0,bottom:5},children:[(0,E.jsx)(j.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,E.jsx)(v.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,E.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,E.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,E.jsx)(w.y,{dataKey:"orders",fill:"#6366F1",radius:[4,4,0,0]})]})})]})]})]}),(0,E.jsxs)("div",{style:{display:"payment"===re?"block":"none"},children:[(0,E.jsx)(ir,{}),ce||he?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:Z("reports:reportsPage.loadingPaymentData")}):0===De?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,E.jsxs)("div",{children:[Ye.orders>0&&(0,E.jsxs)(K,{children:[(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{style:{fontWeight:600,color:"#9A3412",marginBottom:"4px"},children:"Staff Meal (Excluded from Revenue)"}),(0,E.jsx)("div",{style:{fontSize:"13px",color:"#C2410C"},children:"These orders are not included in the revenue figures below"})]}),(0,E.jsxs)("div",{style:{display:"flex",gap:"24px",alignItems:"center"},children:[(0,E.jsxs)("div",{style:{textAlign:"center"},children:[(0,E.jsx)("div",{style:{fontSize:"20px",fontWeight:700,color:"#9A3412"},children:Ye.orders}),(0,E.jsx)("div",{style:{fontSize:"11px",color:"#C2410C"},children:Z("reports:reportsPage.orders")})]}),(0,E.jsxs)("div",{style:{textAlign:"center"},children:[(0,E.jsx)("div",{style:{fontSize:"20px",fontWeight:700,color:"#9A3412"},children:(0,c.vv)(Ye.revenue,X.currency)}),(0,E.jsx)("div",{style:{fontSize:"11px",color:"#C2410C"},children:Z("reports:reportsPage.amount")})]})]})]}),(0,E.jsxs)(M,{children:[(0,E.jsxs)(o.hI,{color:"#059669",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.totalRevenue")}),(0,E.jsx)(o.Os,{children:(0,c.vv)(Ke,X.currency)}),(0,E.jsxs)(o.d1,{children:[He.reduce((e,r)=>e+r.orders,0)," orders"]})]}),(0,E.jsxs)(o.hI,{color:"#2563EB",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.paymentMethodsUsed")}),(0,E.jsx)(o.Os,{children:He.length}),(0,E.jsx)(o.d1,{children:Z("reports:reportsPage.activeMethodsInPeriod")})]}),(0,E.jsxs)(o.hI,{color:"#7C3AED",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.cardPayments")}),(0,E.jsx)(o.Os,{children:(0,c.vv)((null===(t=He.find(e=>"card"===e.method))||void 0===t?void 0:t.revenue)||0,X.currency)}),(0,E.jsxs)(o.d1,{children:[(null===(n=He.find(e=>"card"===e.method))||void 0===n?void 0:n.orders)||0," orders"]})]}),(0,E.jsxs)(o.hI,{color:"#DC2626",children:[(0,E.jsx)(o.v0,{children:Z("reports:reportsPage.cashPayments")}),(0,E.jsx)(o.Os,{children:(0,c.vv)((null===(G=He.find(e=>"cash"===e.method))||void 0===G?void 0:G.revenue)||0,X.currency)}),(0,E.jsxs)(o.d1,{children:[(null===(J=He.find(e=>"cash"===e.method))||void 0===J?void 0:J.orders)||0," orders"]})]})]}),(0,E.jsxs)(O,{children:[(0,E.jsxs)(R,{children:[(0,E.jsx)(T,{children:Z("reports:reportsPage.paymentMethodsBreakdown")}),(0,E.jsxs)(z,{children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)(_,{children:Z("reports:reportsPage.paymentMethod")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.orders")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.revenue")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.share")})]})}),(0,E.jsx)("tbody",{children:0===He.length?(0,E.jsx)("tr",{children:(0,E.jsx)(L,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No payment data available"})}):He.map((e,r)=>{const t=Ke>0?e.revenue/Ke*100:0;return(0,E.jsxs)("tr",{style:{backgroundColor:0===r?"#F0F9FF":"transparent"},children:[(0,E.jsx)(L,{style:{fontWeight:600},children:We(e.method)}),(0,E.jsx)(L,{children:e.orders}),(0,E.jsx)(L,{style:{fontWeight:500},children:(0,c.vv)(e.revenue,X.currency)}),(0,E.jsx)(L,{children:(0,E.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,E.jsx)(W,{percentage:t}),(0,E.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[t.toFixed(1),"%"]})]})})]},e.method)})})]})]}),(0,E.jsxs)(I,{children:[(0,E.jsx)(T,{children:Z("reports:reportsPage.paymentDistribution")}),(0,E.jsx)(u.u,{width:"100%",height:300,children:(0,E.jsxs)(F.r,{children:[(0,E.jsx)(b.F,{data:He.map(e=>({name:We(e.method),value:Math.round(e.revenue)})),cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:He.map((e,r)=>(0,E.jsx)(k.f,{fill:q[r%q.length]},`cell-${r}`))}),(0,E.jsx)(y.m,{formatter:e=>(0,c.vv)(Number(e),X.currency)})]})})]})]}),(null===fe||void 0===fe?void 0:fe.cardTypeSales)&&fe.cardTypeSales.length>0&&(0,E.jsxs)(R,{style:{marginTop:"24px"},children:[(0,E.jsx)(T,{children:Z("reports:reportsPage.cardTypeBreakdown")}),(0,E.jsxs)(Y,{children:[(0,E.jsx)(V,{active:"all"===Se,onClick:()=>we("all"),children:"All"}),["visa","master","amex","other"].map(e=>Ve.includes(e)&&(0,E.jsx)(V,{active:Se===e,onClick:()=>we(e),children:Ne[e]||e},e))]}),(0,E.jsxs)(z,{children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)(_,{children:Z("reports:reportsPage.cardType")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.orders")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.revenue")}),(0,E.jsx)(_,{children:Z("reports:reportsPage.shareOfCardPayments")})]})}),(0,E.jsx)("tbody",{children:0===Ue.length?(0,E.jsx)("tr",{children:(0,E.jsx)(L,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No card type data for selected filter"})}):Ue.map((e,r)=>{const t=fe.cardTypeSales.reduce((e,r)=>e+r.revenue,0),s=t>0?e.revenue/t*100:0;return(0,E.jsxs)("tr",{style:{backgroundColor:0===r?"#F5F3FF":"transparent"},children:[(0,E.jsx)(L,{style:{fontWeight:600},children:Ne[e.type]||e.type}),(0,E.jsx)(L,{children:e.orders}),(0,E.jsx)(L,{style:{fontWeight:500},children:(0,c.vv)(e.revenue,X.currency)}),(0,E.jsx)(L,{children:(0,E.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,E.jsx)(W,{percentage:s}),(0,E.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s.toFixed(1),"%"]})]})})]},e.type)})})]})]})]})]})]})]}),(0,E.jsx)(P.A,{isOpen:be,onClose:()=>ke(!1)})]})}}}]);