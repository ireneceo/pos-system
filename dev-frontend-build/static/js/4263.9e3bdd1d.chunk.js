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
`,T=e=>{let{activePeriod:r,dateRange:t,isCustomDateRange:n,onPeriodChange:a,onCalendarRangeSelect:d,includeToday:l=!1,children:c}=e;const{t:p}=(0,o.Bd)("common"),[h,x]=(0,s.useState)(!1),u=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],g={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,i.jsx)(B,{children:(0,i.jsxs)(D,{children:[u.map(e=>(0,i.jsx)(M,{active:r===e&&!n,onClick:()=>a(e),children:g[e]},e)),(0,i.jsxs)(O,{children:[(0,i.jsxs)(I,{active:n,onClick:()=>x(!h),children:[(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,i.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,i.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,i.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),t.start&&t.end?`${t.start} ~ ${t.end}`:"Custom Range"]}),(0,i.jsx)(P,{isOpen:h,startDate:t.start,endDate:t.end,onRangeSelect:(e,r)=>{d(e,r),x(!1)},onClose:()=>x(!1)})]}),c]})})}},2653:(e,r,t)=>{t.d(r,{M:()=>o});var s=t(9950),n=t(4492);function o(e){const[r,t]=(0,n.ok)(),o=(0,s.useCallback)(()=>r.get("tab")||e,[r,e]),[i,a]=(0,s.useState)(o());return[i,(0,s.useCallback)(e=>{a(e),t({tab:e})},[t])]}},4263:(e,r,t)=>{t.r(r),t.d(r,{default:()=>J});var s=t(9950),n=t(4752),o=t(8409),i=t(2597),a=t(2653),d=t(1367),l=t(9018),c=t(6038),p=t(8285);const h=e=>{if(null===e||void 0===e)return"";const r=String(e);return r.includes(",")||r.includes('"')||r.includes("\n")||r.includes("\r")?`"${r.replace(/"/g,'""')}"`:r},x=e=>e.map(h).join(",");var u=t(1095),g=t(2847),j=t(3245),v=t(158),m=t(3440),y=t(2174),f=t(4915),F=t(7621),b=t(5297),k=t(7766),S=t(294),w=t(3588),C=t(8012),A=t(512),P=t(3577),$=t(5030),E=t(9955),B=t(4414);const D=n.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,M=n.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,O=o.MD,I=n.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,T=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,R=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,z=n.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,_=n.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,L=n.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,W=n.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,N=n.Ay.div`
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
`,H=n.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,U=n.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,V=n.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,Y=n.Ay.button`
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
`,K=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,q=n.Ay.div`
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
`,G=["#635BFF","#6FCF97","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],J=()=>{var e,r,t,n,J,Z;const{t:Q}=(0,$.Bd)("reports"),{user:X}=(0,d.As)(),{operationSettings:ee,paymentSettings:re}=(0,l.Pj)(),[te,se]=(0,a.M)("sales"),[ne,oe]=(0,s.useState)("month"),[ie,ae]=(0,s.useState)(()=>(0,A.x)("month")),[de,le]=(0,s.useState)(!1),[,ce]=(0,s.useState)([]),[pe,he]=(0,s.useState)(!0),[xe,ue]=(0,s.useState)(!1),[ge,je]=(0,s.useState)(null),[ve,me]=(0,s.useState)([]),[,ye]=(0,s.useState)([]),[,fe]=(0,s.useState)([]),[Fe,be]=(0,s.useState)(null),[ke,Se]=(0,s.useState)(!1),[we,Ce]=(0,s.useState)("all"),[Ae,Pe]=(0,s.useState)(new Set),[$e,Ee]=(0,s.useState)(new Set),Be=(0,s.useMemo)(()=>{if(null===Fe||void 0===Fe||!Fe.dailySales||0===Fe.dailySales.length)return[];const e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];if("today"===ne)return Fe.hourlySales?Fe.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{date:12===r?"12PM":r>12?r-12+"PM":0===r?"12AM":`${r}AM`,sales:Math.round(e.revenue)}}):[];if("week"===ne)return Fe.dailySales.map(r=>{const t=new Date(r.date);return{date:e[t.getDay()],sales:Math.round(r.revenue)}});if("month"===ne)return Fe.dailySales.map(e=>{const[,r,t]=e.date.split("-");return{date:`${r}/${t}`,sales:Math.round(e.revenue)}});{const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r={};return Fe.dailySales.forEach(t=>{const s=parseInt(t.date.split("-")[1])-1,n=e[s];r[n]=(r[n]||0)+t.revenue}),e.map(e=>({date:e,sales:Math.round(r[e]||0)}))}},[Fe,ne]),De=(0,s.useMemo)(()=>{var e;return(null===Fe||void 0===Fe||null===(e=Fe.summary)||void 0===e?void 0:e.totalRevenue)||0},[Fe]),Me=(0,s.useMemo)(()=>{var e;return(null===Fe||void 0===Fe||null===(e=Fe.summary)||void 0===e?void 0:e.totalOrders)||0},[Fe]),Oe=(0,s.useMemo)(()=>{if(null===Fe||void 0===Fe||!Fe.categorySales||0===Fe.categorySales.length)return[{name:"No Data",value:100,sales:0}];const e=Fe.categorySales.reduce((e,r)=>e+r.revenue,0);return Fe.categorySales.map(r=>({name:r.category,value:e>0?Math.round(r.revenue/e*100):0,sales:Math.round(r.revenue)}))},[Fe]),Ie=(0,s.useMemo)(()=>{var e;if(null===Fe||void 0===Fe||!Fe.menuSales||0===Fe.menuSales.length)return[];const r=(null===(e=Fe.menuSales[0])||void 0===e?void 0:e.quantity)||1;return Fe.menuSales.map(e=>({name:e.name,category:e.category,price:e.quantity>0?e.revenue/e.quantity:0,orders:e.quantity,revenue:Math.round(e.revenue),performance:Math.round(e.quantity/r*100)}))},[Fe]),Te=(0,s.useMemo)(()=>null!==Fe&&void 0!==Fe&&Fe.hourlySales?Fe.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{hour:0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`,orders:e.orders}}):[],[Fe]),Re=(0,s.useMemo)(()=>ve.map(e=>({...e,period_orders:e.total_orders||0,period_spent:e.total_spent||0})).sort((e,r)=>r.period_spent-e.period_spent),[ve]),ze=(0,s.useMemo)(()=>{if(null===Fe||void 0===Fe||!Fe.hourlySales)return{completionRate:0,avgPrepTime:0,peakHour:"N/A",peakHourOrders:0,totalOrdersInPeak:0};let e=12,r=0;Fe.hourlySales.forEach(t=>{t.orders>r&&(r=t.orders,e=t.hour)});return{completionRate:100,avgPrepTime:0,peakHour:(e=>{const r=(e+1)%24,t=e=>0===e?"12AM":12===e?"12PM":e>12?e-12+"PM":`${e}AM`;return`${t(e)}-${t(r)}`})(e),peakHourOrders:r,totalOrdersInPeak:r}},[Fe]),_e=(0,s.useCallback)(async()=>{if(null===X||void 0===X||!X.restaurantId)return console.log("\u274c No restaurant ID found"),void he(!1);try{const e=(0,E.c4)();if(!e)return console.error("\u274c No auth token found"),void he(!1);const[r,t,s]=await Promise.all([fetch(`/api/dashboard/restaurant/${X.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/customers/${X.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/menu?restaurantId=${X.restaurantId}&excludeImage=true`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})]);if(r.ok){const e=await r.json();je(e.data||e)}if(t.ok){const e=await t.json();e.success&&Array.isArray(e.data)&&me(e.data)}if(s.ok){const e=await s.json();e.success&&e.data&&(e.data.items&&ye(e.data.items),e.data.categories&&fe(e.data.categories))}}catch(e){console.error("\u274c Error fetching static data:",e)}finally{he(!1)}},[null===X||void 0===X?void 0:X.restaurantId]),Le=(0,s.useCallback)(async()=>{if(null===X||void 0===X||!X.restaurantId)return;const e=(0,E.c4)();if(e){ue(!0);try{const r=new URLSearchParams({startDate:ie.start,endDate:ie.end}),t=await fetch(`/api/dashboard/restaurant/${X.restaurantId}/reports-summary?${r.toString()}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();e.success&&(be(e.data),ce([]))}}catch(r){console.error("\u274c Error fetching reports summary:",r)}finally{ue(!1)}}},[null===X||void 0===X?void 0:X.restaurantId,ie.start,ie.end]);(0,s.useEffect)(()=>{_e()},[_e]),(0,s.useEffect)(()=>{Le()},[Le]);const We=(0,s.useMemo)(()=>{var e;if(null===Fe||void 0===Fe||!Fe.hourlySales)return[];const r=(null===(e=Fe.summary)||void 0===e?void 0:e.totalOrders)||1;return Fe.hourlySales.filter(e=>e.orders>0).map(e=>{const t=e.hour;return{time:`${t.toString().padStart(2,"0")}:00-${((t+1)%24).toString().padStart(2,"0")}:00`,orders:e.orders,revenue:Math.round(e.revenue),efficiency:Math.min(100,Math.round(e.orders/(r/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[Fe]),Ne=e=>(0,p._M)(e,re||void 0),He={visa:"Visa",master:"Mastercard",amex:"Amex",other:"Other"},Ue=(0,s.useMemo)(()=>null!==Fe&&void 0!==Fe&&Fe.paymentMethodSales?Fe.paymentMethodSales.sort((e,r)=>r.revenue-e.revenue):[],[Fe]),Ve=(0,s.useMemo)(()=>null!==Fe&&void 0!==Fe&&Fe.cardTypeSales?"all"===we?Fe.cardTypeSales:Fe.cardTypeSales.filter(e=>e.type===we):[],[Fe,we]),Ye=(0,s.useMemo)(()=>null!==Fe&&void 0!==Fe&&Fe.cardTypeSales?Fe.cardTypeSales.map(e=>e.type):[],[Fe]),Ke=(0,s.useMemo)(()=>(null===Fe||void 0===Fe?void 0:Fe.staffMeal)||{revenue:0,orders:0},[Fe]),qe=(0,s.useMemo)(()=>Ue.reduce((e,r)=>e+r.revenue,0),[Ue]),Ge=(0,s.useMemo)(()=>{if(null===Fe||void 0===Fe||!Fe.dailySales||0===Fe.dailySales.length)return{};const e={};return Fe.dailySales.forEach(r=>{const[t,s]=r.date.split("-"),n=`${t}-${s}`,o=r.date;e[t]||(e[t]={year:t,revenue:0,orders:0,months:{}}),e[t].months[n]||(e[t].months[n]={month:n,revenue:0,orders:0,days:{}}),e[t].months[n].days[o]||(e[t].months[n].days[o]={day:o,revenue:0,orders:0});const i=r.revenue,a=r.orders;e[t].revenue+=i,e[t].orders+=a,e[t].months[n].revenue+=i,e[t].months[n].orders+=a,e[t].months[n].days[o].revenue+=i,e[t].months[n].days[o].orders+=a}),e},[Fe]),Je=()=>{const e=new Date(ie.start),r=new Date(ie.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(()=>{const e=Je()})();s.useEffect(()=>{const e=Je();if(e<=31){const e=new Set(Object.keys(Ge)),r=new Set;Object.keys(Ge).forEach(e=>{Object.keys(Ge[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),Pe(e),Ee(r)}else if(e<=365){const e=new Set(Object.keys(Ge));Pe(e),Ee(new Set)}else Pe(new Set),Ee(new Set)},[ie.start,ie.end,Me]);const Ze=e=>{oe(e),le(!1),ae((0,A.x)(e,ee.timeZone))},Qe=(e,r)=>{le(!0),oe("all"),ae({start:e,end:r})},Xe=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e.toFixed(r)},er=(0,s.useCallback)(()=>{const e=["Date,Revenue"];return Be.forEach(r=>{e.push(`${h(r.date)},${Xe(r.sales)}`)}),e.join("\n")},[Be]),rr=(0,s.useCallback)(()=>{const e=["Date,Revenue,Orders,Avg_Order_Value"];return Object.keys(Ge).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=Ge[r];Object.keys(t.months).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const s=t.months[r];Object.keys(s.days).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=s.days[r],n=t.orders>0?t.revenue/t.orders:0;e.push(`${r},${Xe(t.revenue)},${t.orders},${Xe(n)}`)})})}),e.join("\n")},[Ge]),tr=(0,s.useCallback)(()=>{const e=["Rank,Item_Name,Category,Unit_Price,Qty_Sold,Revenue"];return Ie.forEach((r,t)=>{e.push(x([t+1,r.name,r.category,Xe(r.price),r.orders,Xe(r.revenue)]))}),e.join("\n")},[Ie]),sr=(0,s.useCallback)(()=>{const e=["Rank,Name,Phone,Type,Total_Orders,Total_Spent,Points,Tier"];return[...Re].sort((e,r)=>(r.period_spent||0)-(e.period_spent||0)).forEach((r,t)=>{var s,n,o;e.push(x([t+1,(null===(s=r.customer)||void 0===s?void 0:s.name)||"Guest",(null===(n=r.customer)||void 0===n?void 0:n.phone)||"-","member"===(null===(o=r.customer)||void 0===o?void 0:o.type)?"Member":"Guest",r.period_orders||0,Xe(r.period_spent||0),r.points||0,r.loyalty_tier||"Bronze"]))}),e.join("\n")},[Re]),nr=(0,s.useCallback)(()=>{const e=["Time_Slot,Orders,Revenue"];return We.forEach(r=>{e.push(x([r.time,r.orders,Xe(r.revenue)]))}),e.join("\n")},[We]),or=(0,s.useCallback)(()=>{const e=["Payment_Method,Orders,Revenue,Percentage"];return Ue.forEach(r=>{const t=qe>0?(r.revenue/qe*100).toFixed(1):"0.0";e.push(x([Ne(r.method),r.orders,Xe(r.revenue),`${t}%`]))}),Ve.length>0&&(e.push(""),e.push("Card_Type,Orders,Revenue"),Ve.forEach(r=>{e.push(x([He[r.type]||r.type,r.orders,Xe(r.revenue)]))})),Ke.orders>0&&(e.push(""),e.push("Staff_Meal,Orders,Amount"),e.push(x(["Staff Meal (Excluded from revenue)",Ke.orders,Xe(Ke.revenue)]))),e.join("\n")},[Ue,Ve,Ke,qe]),ir=(0,s.useCallback)(()=>{let e;switch(te){case"sales":default:e=er();break;case"details":e=rr();break;case"menu":e=tr();break;case"customers":e=sr();break;case"operations":e=nr();break;case"payment":e=or()}var r,t,s,n,o,i;((e,r)=>{const t=new Blob(["\ufeff"+e],{type:"text/csv;charset=utf-8;"}),s=URL.createObjectURL(t),n=document.createElement("a");n.setAttribute("href",s),n.setAttribute("download",r),n.style.visibility="hidden",n.style.position="absolute",n.style.left="-9999px",document.body.appendChild(n),n.click(),setTimeout(()=>{URL.revokeObjectURL(s),document.body.removeChild(n)},150)})(e,(r=`purplepos_${(null===X||void 0===X?void 0:X.restaurantId)||"report"}`,t=te,s=ne,n=de,o=ie.start,i=ie.end,`${r}_${t}_${n?`${o}_${i}`:s}_${(new Date).toISOString().split("T")[0]}.csv`))},[te,ne,de,ie,null===X||void 0===X?void 0:X.restaurantId,er,rr,tr,sr,nr,or]),ar=()=>(0,B.jsxs)(A.A,{activePeriod:ne,dateRange:ie,isCustomDateRange:de,onPeriodChange:Ze,onCalendarRangeSelect:Qe,children:[(0,B.jsxs)("button",{onClick:ir,style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",background:"#F6F9FC",color:"#0A2540",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"14px",marginLeft:"auto"},children:[(0,B.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,B.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]}),(0,B.jsxs)("button",{onClick:()=>Se(!0),style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",background:"#F6F9FC",color:"#0A2540",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"14px"},children:[(0,B.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,B.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Daily Settlement"]})]});return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsxs)(D,{children:[(0,B.jsx)(C.Ay,{title:"Reports"}),(0,B.jsxs)(M,{children:[(0,B.jsxs)(i.tU,{children:[(0,B.jsx)(i.oz,{active:"sales"===te,onClick:()=>se("sales"),children:"Sales Report"}),(0,B.jsx)(i.oz,{active:"details"===te,onClick:()=>se("details"),children:"Sales Details"}),(0,B.jsx)(i.oz,{active:"payment"===te,onClick:()=>se("payment"),children:"Payment Analysis"}),(0,B.jsx)(i.oz,{active:"menu"===te,onClick:()=>se("menu"),children:"Menu Analysis"}),(0,B.jsx)(i.oz,{active:"customers"===te,onClick:()=>se("customers"),children:"Customer Insights"}),(0,B.jsx)(i.oz,{active:"operations"===te,onClick:()=>se("operations"),children:"Operations"})]}),(0,B.jsxs)("div",{style:{display:"sales"===te?"block":"none"},children:[(0,B.jsx)(ar,{}),pe||xe?(0,B.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:Q("reports:reportsPage.loading")}):0===Me?(0,B.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,B.jsxs)("div",{children:[(0,B.jsxs)(O,{children:[(0,B.jsxs)(o.hI,{color:"#059669",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.totalRevenue")}),(0,B.jsx)(o.Os,{children:(0,c.vv)(De,ee.currency)}),(0,B.jsxs)(o.d1,{children:[Me," orders in selected period"]})]}),(0,B.jsxs)(o.hI,{color:"#2563EB",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.totalOrders")}),(0,B.jsx)(o.Os,{children:Me.toLocaleString()}),(0,B.jsx)(o.d1,{children:Q("reports:reportsPage.forSelectedPeriod")})]}),(0,B.jsxs)(o.hI,{color:"#DC2626",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.averageOrderValue")}),(0,B.jsx)(o.Os,{children:(0,c.vv)(Me>0?De/Me:0,ee.currency)}),(0,B.jsx)(o.d1,{children:Q("reports:reportsPage.perOrder")})]}),(0,B.jsxs)(o.hI,{color:"#7C3AED",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.completedOrders")}),(0,B.jsx)(o.Os,{children:Me}),(0,B.jsx)(o.d1,{children:"100% completion rate"})]})]}),(0,B.jsxs)(I,{children:[(0,B.jsxs)(T,{children:[(0,B.jsx)(R,{children:Q("reports:reportsPage.revenueTrend")}),(0,B.jsx)(u.u,{width:"100%",height:300,children:(0,B.jsxs)(g.b,{data:Be,margin:{top:5,right:20,left:0,bottom:5},children:[(0,B.jsx)(j.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,B.jsx)(v.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,B.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,B.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,B.jsx)(f.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,B.jsxs)(T,{children:[(0,B.jsx)(R,{children:Q("reports:reportsPage.salesByCategory")}),(0,B.jsx)(u.u,{width:"100%",height:300,children:(0,B.jsxs)(F.r,{children:[(0,B.jsx)(b.F,{data:Oe,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Oe.map((e,r)=>(0,B.jsx)(k.f,{fill:G[r%G.length]},`cell-${r}`))}),(0,B.jsx)(y.m,{formatter:e=>`${e}%`})]})})]})]}),(0,B.jsxs)(T,{children:[(0,B.jsx)(R,{children:Q("reports:reportsPage.hourlyOrdersDistribution")}),(0,B.jsx)(u.u,{width:"100%",height:250,children:(0,B.jsxs)(S.E,{data:Te,margin:{top:5,right:20,left:0,bottom:5},children:[(0,B.jsx)(j.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,B.jsx)(v.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,B.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,B.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,B.jsx)(w.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,B.jsxs)("div",{style:{display:"details"===te?"block":"none"},children:[(0,B.jsx)(ar,{}),pe||xe?(0,B.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:Q("reports:reportsPage.loading")}):0===Me?(0,B.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,B.jsxs)("div",{children:[(0,B.jsxs)(O,{children:[(0,B.jsxs)(o.hI,{color:"#059669",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.totalRevenue")}),(0,B.jsx)(o.Os,{children:(0,c.vv)(De,ee.currency)}),(0,B.jsxs)(o.d1,{children:[Me," orders in selected period"]})]}),(0,B.jsxs)(o.hI,{color:"#2563EB",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.totalOrders")}),(0,B.jsx)(o.Os,{children:Me.toLocaleString()}),(0,B.jsxs)(o.d1,{children:[Me," completed"]})]}),(0,B.jsxs)(o.hI,{color:"#DC2626",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.averageOrderValue")}),(0,B.jsx)(o.Os,{children:(0,c.vv)(Me>0?De/Me:0,ee.currency)}),(0,B.jsx)(o.d1,{children:Q("reports:reportsPage.perOrderAverage")})]}),(0,B.jsxs)(o.hI,{color:"#7C3AED",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.period")}),(0,B.jsx)(o.Os,{children:de?Je():"today"===ne?"1":"week"===ne?"7":"month"===ne?"30":"year"===ne?"365":Je()}),(0,B.jsx)(o.d1,{children:de?`${ie.start} to ${ie.end}`:"today"===ne?"Day":"Days"})]})]}),(0,B.jsxs)(z,{children:[(0,B.jsxs)(R,{children:["Detailed Sales Breakdown (",de?`${ie.start} to ${ie.end}`:ne,")"]}),(0,B.jsxs)(_,{children:[(0,B.jsx)("thead",{children:(0,B.jsxs)("tr",{children:[(0,B.jsx)(L,{style:{width:"40%"},children:Q("reports:reportsPage.period")}),(0,B.jsx)(L,{style:{textAlign:"right"},children:Q("reports:reportsPage.revenue")}),(0,B.jsx)(L,{style:{textAlign:"right"},children:Q("reports:reportsPage.orders")}),(0,B.jsx)(L,{style:{textAlign:"right"},children:Q("reports:reportsPage.avgOrderValue")})]})}),(0,B.jsx)("tbody",{children:Object.keys(Ge).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=Ge[e],t=Ae.has(e);return(0,B.jsxs)(s.Fragment,{children:[(0,B.jsxs)(H,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(Ae);if(r.has(e)){var t;r.delete(e);const s=new Set($e);Object.keys((null===(t=Ge[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{s.delete(`${e}-${r}`)}),Ee(s)}else r.add(e);Pe(r)})(e),children:[(0,B.jsxs)(U,{level:0,bold:!0,children:[(0,B.jsx)(V,{expanded:t,children:"\u25b6"}),e]}),(0,B.jsx)(U,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue,ee.currency)}),(0,B.jsx)(U,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,B.jsx)(U,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,ee.currency)})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const n=r.months[t],o=`${e}-${t}`,i=$e.has(o),a=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,B.jsxs)(s.Fragment,{children:[(0,B.jsxs)(H,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set($e);r.has(e)?r.delete(e):r.add(e),Ee(r)})(o),children:[(0,B.jsxs)(U,{level:1,bold:!0,children:[(0,B.jsx)(V,{expanded:i,children:"\u25b6"}),a]}),(0,B.jsx)(U,{level:1,style:{textAlign:"right"},children:(0,c.vv)(n.revenue,ee.currency)}),(0,B.jsx)(U,{level:1,style:{textAlign:"right"},children:n.orders}),(0,B.jsx)(U,{level:1,style:{textAlign:"right"},children:(0,c.vv)(n.revenue/n.orders,ee.currency)})]}),i&&Object.keys(n.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=n.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,B.jsxs)(H,{level:2,children:[(0,B.jsx)(U,{level:2,children:t}),(0,B.jsx)(U,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(r.revenue,ee.currency)}),(0,B.jsx)(U,{level:2,style:{textAlign:"right"},children:r.orders}),(0,B.jsx)(U,{level:2,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,ee.currency)})]},e)})]},o)})]},e)})})]})]})]})]}),(0,B.jsxs)("div",{style:{display:"menu"===te?"block":"none"},children:[(0,B.jsx)(ar,{}),(0,B.jsxs)(O,{children:[(0,B.jsxs)(o.hI,{color:"#F59E0B",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.bestSeller")}),(0,B.jsx)(o.Os,{children:(null===(e=Ie[0])||void 0===e?void 0:e.name)||"N/A"}),(0,B.jsxs)(o.d1,{children:[(null===(r=Ie[0])||void 0===r?void 0:r.orders)||0," sold in selected period"]})]}),(0,B.jsxs)(o.hI,{color:"#10B981",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.menuItems")}),(0,B.jsx)(o.Os,{children:Ie.length}),(0,B.jsx)(o.d1,{children:Q("reports:reportsPage.itemsWithSales")})]}),(0,B.jsxs)(o.hI,{color:"#3B82F6",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.itemsSold")}),(0,B.jsx)(o.Os,{children:Ie.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,B.jsx)(o.d1,{children:Q("reports:reportsPage.totalQuantitySold")})]}),(0,B.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.totalRevenue")}),(0,B.jsx)(o.Os,{children:(0,c.vv)(Ie.reduce((e,r)=>e+r.revenue,0),ee.currency)}),(0,B.jsx)(o.d1,{children:Q("reports:reportsPage.forSelectedPeriod")})]})]}),(0,B.jsxs)(z,{children:[(0,B.jsxs)(R,{children:["Complete Menu Performance Ranking (",de?`${ie.start} to ${ie.end}`:ne,")"]}),(0,B.jsxs)(_,{children:[(0,B.jsx)("thead",{children:(0,B.jsxs)("tr",{children:[(0,B.jsx)(L,{children:Q("reports:reportsPage.rank")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.menuItem")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.category")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.price")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.qtySold")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.revenue")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.performance")})]})}),(0,B.jsx)("tbody",{children:Ie.map((e,r)=>{var t;const s=(null===(t=Ie[0])||void 0===t?void 0:t.orders)||1;return(0,B.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,B.jsxs)(W,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#6FCF97":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,B.jsx)(W,{style:{fontWeight:600},children:e.name}),(0,B.jsx)(W,{children:(0,B.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,B.jsx)(W,{children:(0,c.vv)(e.price,ee.currency)}),(0,B.jsx)(W,{children:e.orders.toLocaleString()}),(0,B.jsx)(W,{children:(0,c.vv)(e.revenue,ee.currency)}),(0,B.jsx)(W,{children:(0,B.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,B.jsx)(N,{percentage:e.orders/s*100}),(0,B.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/s*100),"%"]})]})})]},r)})})]})]})]}),(0,B.jsxs)("div",{style:{display:"customers"===te?"block":"none"},children:[(0,B.jsx)(ar,{}),pe||xe?(0,B.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:Q("reports:reportsPage.loadingCustomerData")}):0===Re.length?(0,B.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No customers with orders in the selected period"}):(0,B.jsxs)("div",{children:[(0,B.jsxs)(O,{children:[(0,B.jsxs)(o.hI,{color:"#635BFF",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.activeCustomers")}),(0,B.jsx)(o.Os,{children:Re.length.toLocaleString()}),(0,B.jsxs)(o.d1,{children:[Re.filter(e=>{var r;return"member"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," members, ",Re.filter(e=>{var r;return"guest"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," guests"]})]}),(0,B.jsxs)(o.hI,{color:"#6FCF97",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.repeatCustomers")}),(0,B.jsx)(o.Os,{children:Re.filter(e=>e.period_orders>1).length}),(0,B.jsxs)(o.d1,{children:[Re.length>0?Math.round(Re.filter(e=>e.period_orders>1).length/Re.length*100):0,"% ordered multiple times"]})]}),(0,B.jsxs)(o.hI,{color:"#FFB800",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.averageSpent")}),(0,B.jsx)(o.Os,{children:(0,c.vv)(Re.length>0?Re.reduce((e,r)=>e+(r.period_spent||0),0)/Re.length:0,ee.currency)}),(0,B.jsx)(o.d1,{children:Q("reports:reportsPage.perCustomerInPeriod")})]}),(0,B.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.periodRevenue")}),(0,B.jsx)(o.Os,{children:(0,c.vv)(Re.reduce((e,r)=>e+(r.period_spent||0),0),ee.currency)}),(0,B.jsxs)(o.d1,{children:["From ",Re.length," customers"]})]})]}),(0,B.jsxs)(z,{children:[(0,B.jsxs)(R,{children:["Top Customers (",de?`${ie.start} to ${ie.end}`:ne,")"]}),(0,B.jsxs)(_,{children:[(0,B.jsx)("thead",{children:(0,B.jsxs)("tr",{children:[(0,B.jsx)(L,{children:Q("reports:reportsPage.rank")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.name")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.phone")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.type")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.periodOrders")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.periodSpent")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.totalPoints")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.tier")})]})}),(0,B.jsx)("tbody",{children:Re.slice(0,20).map((e,r)=>{var t,s,n,o,i,a;return(0,B.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,B.jsxs)(W,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#6FCF97":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,B.jsx)(W,{style:{fontWeight:600},children:(null===(s=e.customer)||void 0===s?void 0:s.name)||"Guest"}),(0,B.jsx)(W,{children:(null===(n=e.customer)||void 0===n?void 0:n.phone)||"-"}),(0,B.jsx)(W,{children:(0,B.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"member"===(null===(o=e.customer)||void 0===o?void 0:o.type)?"#E0F2FE":"#F3F4F6",color:"member"===(null===(i=e.customer)||void 0===i?void 0:i.type)?"#0369A1":"#6B7280"},children:"member"===(null===(a=e.customer)||void 0===a?void 0:a.type)?"Member":"Guest"})}),(0,B.jsx)(W,{children:e.period_orders||0}),(0,B.jsx)(W,{children:(0,c.vv)(e.period_spent||0,ee.currency)}),(0,B.jsx)(W,{children:e.points||0}),(0,B.jsx)(W,{children:(0,B.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"VIP"===e.loyalty_tier?"#FEF3C7":"Gold"===e.loyalty_tier?"#FEF9C3":"Silver"===e.loyalty_tier?"#F3F4F6":"#E5E7EB",color:"VIP"===e.loyalty_tier?"#92400E":"Gold"===e.loyalty_tier?"#854D0E":"#6B7280"},children:e.loyalty_tier||"Bronze"})})]},(null===(t=e.customer)||void 0===t?void 0:t.id)||r)})})]})]})]})]}),(0,B.jsxs)("div",{style:{display:"operations"===te?"block":"none"},children:[(0,B.jsx)(ar,{}),pe||xe?(0,B.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:Q("reports:reportsPage.loadingOperationsData")}):0===Me?(0,B.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,B.jsxs)("div",{children:[(0,B.jsxs)(O,{children:[(0,B.jsxs)(o.hI,{color:"#10B981",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.completedOrders")}),(0,B.jsx)(o.Os,{children:Me.toLocaleString()}),(0,B.jsxs)(o.d1,{children:[ze.completionRate,"% fulfillment rate"]})]}),(0,B.jsxs)(o.hI,{color:"#F59E0B",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.avgPrepTime")}),(0,B.jsx)(o.Os,{children:ze.avgPrepTime>0?`${ze.avgPrepTime} min`:"N/A"}),(0,B.jsx)(o.d1,{children:ze.avgPrepTime>0?"Order to served":"No timing data"})]}),(0,B.jsxs)(o.hI,{color:"#EF4444",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.peakHour")}),(0,B.jsx)(o.Os,{children:ze.peakHour}),(0,B.jsxs)(o.d1,{children:[ze.peakHourOrders," orders in this slot"]})]}),(0,B.jsxs)(o.hI,{color:"#6366F1",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.ordersPerDay")}),(0,B.jsx)(o.Os,{children:(()=>{const e=Math.max(1,Math.ceil((new Date(ie.end).getTime()-new Date(ie.start).getTime())/864e5)+1);return Math.round(Me/e)})()}),(0,B.jsx)(o.d1,{children:Q("reports:reportsPage.averageDailyOrders")})]})]}),(0,B.jsxs)(z,{children:[(0,B.jsxs)(R,{children:["Peak Hours Performance (",de?`${ie.start} to ${ie.end}`:ne,")"]}),(0,B.jsxs)(_,{children:[(0,B.jsx)("thead",{children:(0,B.jsxs)("tr",{children:[(0,B.jsx)(L,{children:Q("reports:reportsPage.timeSlot")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.orders")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.revenue")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.share")})]})}),(0,B.jsx)("tbody",{children:0===We.length?(0,B.jsx)("tr",{children:(0,B.jsx)(W,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No peak hours data available"})}):We.map((e,r)=>(0,B.jsxs)("tr",{style:{backgroundColor:0===r?"#FEF3C7":"transparent"},children:[(0,B.jsxs)(W,{style:{fontWeight:600},children:[0===r&&"\ud83d\udd25 ",e.time]}),(0,B.jsx)(W,{children:e.orders}),(0,B.jsx)(W,{children:(0,c.vv)(e.revenue,ee.currency)}),(0,B.jsx)(W,{children:(0,B.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,B.jsx)(N,{percentage:Me>0?e.orders/Me*100:0}),(0,B.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[Me>0?Math.round(e.orders/Me*100):0,"%"]})]})})]},r))})]})]}),(0,B.jsxs)(T,{style:{marginTop:"24px"},children:[(0,B.jsx)(R,{children:Q("reports:reportsPage.hourlyOrderDistribution")}),(0,B.jsx)(u.u,{width:"100%",height:250,children:(0,B.jsxs)(S.E,{data:Te,margin:{top:5,right:20,left:0,bottom:5},children:[(0,B.jsx)(j.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,B.jsx)(v.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,B.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,B.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,B.jsx)(w.y,{dataKey:"orders",fill:"#6366F1",radius:[4,4,0,0]})]})})]})]})]}),(0,B.jsxs)("div",{style:{display:"payment"===te?"block":"none"},children:[(0,B.jsx)(ar,{}),pe||xe?(0,B.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:Q("reports:reportsPage.loadingPaymentData")}):0===Me?(0,B.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,B.jsxs)("div",{children:[Ke.orders>0&&(0,B.jsxs)(q,{children:[(0,B.jsxs)("div",{children:[(0,B.jsx)("div",{style:{fontWeight:600,color:"#9A3412",marginBottom:"4px"},children:"Staff Meal (Excluded from Revenue)"}),(0,B.jsx)("div",{style:{fontSize:"13px",color:"#C2410C"},children:"These orders are not included in the revenue figures below"})]}),(0,B.jsxs)("div",{style:{display:"flex",gap:"24px",alignItems:"center"},children:[(0,B.jsxs)("div",{style:{textAlign:"center"},children:[(0,B.jsx)("div",{style:{fontSize:"20px",fontWeight:700,color:"#9A3412"},children:Ke.orders}),(0,B.jsx)("div",{style:{fontSize:"11px",color:"#C2410C"},children:Q("reports:reportsPage.orders")})]}),(0,B.jsxs)("div",{style:{textAlign:"center"},children:[(0,B.jsx)("div",{style:{fontSize:"20px",fontWeight:700,color:"#9A3412"},children:(0,c.vv)(Ke.revenue,ee.currency)}),(0,B.jsx)("div",{style:{fontSize:"11px",color:"#C2410C"},children:Q("reports:reportsPage.amount")})]})]})]}),(0,B.jsxs)(O,{children:[(0,B.jsxs)(o.hI,{color:"#059669",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.totalRevenue")}),(0,B.jsx)(o.Os,{children:(0,c.vv)(qe,ee.currency)}),(0,B.jsxs)(o.d1,{children:[Ue.reduce((e,r)=>e+r.orders,0)," orders"]})]}),(0,B.jsxs)(o.hI,{color:"#2563EB",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.paymentMethodsUsed")}),(0,B.jsx)(o.Os,{children:Ue.length}),(0,B.jsx)(o.d1,{children:Q("reports:reportsPage.activeMethodsInPeriod")})]}),(0,B.jsxs)(o.hI,{color:"#7C3AED",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.cardPayments")}),(0,B.jsx)(o.Os,{children:(0,c.vv)((null===(t=Ue.find(e=>"card"===e.method))||void 0===t?void 0:t.revenue)||0,ee.currency)}),(0,B.jsxs)(o.d1,{children:[(null===(n=Ue.find(e=>"card"===e.method))||void 0===n?void 0:n.orders)||0," orders"]})]}),(0,B.jsxs)(o.hI,{color:"#DC2626",children:[(0,B.jsx)(o.v0,{children:Q("reports:reportsPage.cashPayments")}),(0,B.jsx)(o.Os,{children:(0,c.vv)((null===(J=Ue.find(e=>"cash"===e.method))||void 0===J?void 0:J.revenue)||0,ee.currency)}),(0,B.jsxs)(o.d1,{children:[(null===(Z=Ue.find(e=>"cash"===e.method))||void 0===Z?void 0:Z.orders)||0," orders"]})]})]}),(0,B.jsxs)(I,{children:[(0,B.jsxs)(z,{children:[(0,B.jsx)(R,{children:Q("reports:reportsPage.paymentMethodsBreakdown")}),(0,B.jsxs)(_,{children:[(0,B.jsx)("thead",{children:(0,B.jsxs)("tr",{children:[(0,B.jsx)(L,{children:Q("reports:reportsPage.paymentMethod")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.orders")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.revenue")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.share")})]})}),(0,B.jsx)("tbody",{children:0===Ue.length?(0,B.jsx)("tr",{children:(0,B.jsx)(W,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No payment data available"})}):Ue.map((e,r)=>{const t=qe>0?e.revenue/qe*100:0;return(0,B.jsxs)("tr",{style:{backgroundColor:0===r?"#F0F9FF":"transparent"},children:[(0,B.jsx)(W,{style:{fontWeight:600},children:Ne(e.method)}),(0,B.jsx)(W,{children:e.orders}),(0,B.jsx)(W,{style:{fontWeight:500},children:(0,c.vv)(e.revenue,ee.currency)}),(0,B.jsx)(W,{children:(0,B.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,B.jsx)(N,{percentage:t}),(0,B.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[t.toFixed(1),"%"]})]})})]},e.method)})})]})]}),(0,B.jsxs)(T,{children:[(0,B.jsx)(R,{children:Q("reports:reportsPage.paymentDistribution")}),(0,B.jsx)(u.u,{width:"100%",height:300,children:(0,B.jsxs)(F.r,{children:[(0,B.jsx)(b.F,{data:Ue.map(e=>({name:Ne(e.method),value:Math.round(e.revenue)})),cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Ue.map((e,r)=>(0,B.jsx)(k.f,{fill:G[r%G.length]},`cell-${r}`))}),(0,B.jsx)(y.m,{formatter:e=>(0,c.vv)(Number(e),ee.currency)})]})})]})]}),(null===Fe||void 0===Fe?void 0:Fe.cardTypeSales)&&Fe.cardTypeSales.length>0&&(0,B.jsxs)(z,{style:{marginTop:"24px"},children:[(0,B.jsx)(R,{children:Q("reports:reportsPage.cardTypeBreakdown")}),(0,B.jsxs)(K,{children:[(0,B.jsx)(Y,{active:"all"===we,onClick:()=>Ce("all"),children:"All"}),["visa","master","amex","other"].map(e=>Ye.includes(e)&&(0,B.jsx)(Y,{active:we===e,onClick:()=>Ce(e),children:He[e]||e},e))]}),(0,B.jsxs)(_,{children:[(0,B.jsx)("thead",{children:(0,B.jsxs)("tr",{children:[(0,B.jsx)(L,{children:Q("reports:reportsPage.cardType")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.orders")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.revenue")}),(0,B.jsx)(L,{children:Q("reports:reportsPage.shareOfCardPayments")})]})}),(0,B.jsx)("tbody",{children:0===Ve.length?(0,B.jsx)("tr",{children:(0,B.jsx)(W,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No card type data for selected filter"})}):Ve.map((e,r)=>{const t=Fe.cardTypeSales.reduce((e,r)=>e+r.revenue,0),s=t>0?e.revenue/t*100:0;return(0,B.jsxs)("tr",{style:{backgroundColor:0===r?"#F5F3FF":"transparent"},children:[(0,B.jsx)(W,{style:{fontWeight:600},children:He[e.type]||e.type}),(0,B.jsx)(W,{children:e.orders}),(0,B.jsx)(W,{style:{fontWeight:500},children:(0,c.vv)(e.revenue,ee.currency)}),(0,B.jsx)(W,{children:(0,B.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,B.jsx)(N,{percentage:s}),(0,B.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[s.toFixed(1),"%"]})]})})]},e.type)})})]})]})]})]})]})]}),(0,B.jsx)(P.A,{isOpen:ke,onClose:()=>Se(!1)})]})}}}]);