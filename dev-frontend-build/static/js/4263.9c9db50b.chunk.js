"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4263],{512:(e,r,t)=>{t.d(r,{x:()=>E,A:()=>R});var n=t(9950),s=t(4752),o=t(4414);const i=["Su","Mo","Tu","We","Th","Fr","Sa"],a=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[r,t,n]=e.split("-").map(Number);return new Date(r,t-1,n)},d=(e,r)=>e.getFullYear()===r.getFullYear()&&e.getMonth()===r.getMonth()&&e.getDate()===r.getDate(),c=(e,r)=>new Date(e,r).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=s.Ay.div`
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
`,x=s.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,u=s.Ay.div`
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
`,p=s.Ay.button`
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
`,g=s.Ay.div``,m=s.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,v=s.Ay.button`
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
`,j=s.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,y=s.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,F=s.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,f=s.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,b=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,k=s.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,w=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,S=s.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,A=s.Ay.div`
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
`,C=e=>{let{startDate:r,endDate:t,onRangeSelect:s,onClose:C,isOpen:$}=e;const E=new Date,[B,D]=(0,n.useState)(E.getMonth()),[M,O]=(0,n.useState)(E.getFullYear()),[I,R]=(0,n.useState)(null),[T,_]=(0,n.useState)(null),[z,P]=(0,n.useState)(null),[L,N]=(0,n.useState)("start"),W=(0,n.useRef)(null);(0,n.useEffect)(()=>{r&&R(l(r)),t&&_(l(t))},[r,t]),(0,n.useEffect)(()=>{$&&N("start")},[$]),(0,n.useEffect)(()=>{const e=e=>{W.current&&!W.current.contains(e.target)&&C()};return $&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[$,C]);const H=(0,n.useCallback)(()=>{0===B?(D(11),O(e=>e-1)):D(e=>e-1)},[B]),U=(0,n.useCallback)(()=>{11===B?(D(0),O(e=>e+1)):D(e=>e+1)},[B]),Y=(e,r)=>{const t=((e,r)=>new Date(e,r+1,0).getDate())(e,r),n=((e,r)=>new Date(e,r,1).getDay())(e,r),l=[];for(let s=0;s<n;s++)l.push(null);for(let s=1;s<=t;s++)l.push(new Date(e,r,s));return(0,o.jsxs)(F,{children:[(0,o.jsx)(f,{children:c(e,r)}),(0,o.jsx)(b,{children:i.map(e=>(0,o.jsx)(k,{children:e},e))}),(0,o.jsx)(w,{children:l.map((e,r)=>{if(!e)return(0,o.jsx)(S,{},`e-${r}`);const{isStart:t,isEnd:n,isInRange:i,isHoverEnd:l}=(e=>{const r=I&&d(e,I),t=T&&d(e,T),n="end"===L&&z?z:T;let s=!1;if(I&&n){const[r,t]=I<=n?[I,n]:[n,I];s=((e,r,t)=>{const n=e.getTime();return n>r.getTime()&&n<t.getTime()})(e,r,t)}return{isStart:r,isEnd:t,isInRange:s,isHoverEnd:"end"===L&&z&&d(e,z)}})(e),c=d(e,E);return(0,o.jsx)(A,{$isStart:!!t,$isEnd:!!n,$isInRange:i,$isHoverEnd:!!l,$isToday:c,onClick:()=>(e=>{if("start"===L)R(e),_(null),N("end");else{let r=I,t=e;t<r&&([r,t]=[t,r]),R(r),_(t),N("start"),s(a(r),a(t)),setTimeout(C,200)}})(e),onMouseEnter:()=>P(e),onMouseLeave:()=>P(null),children:e.getDate()},e.getTime())})})]})},K=11===B?0:B+1,V=11===B?M+1:M,q=e=>{const r=new Date;let t;const n=r;switch(e){case"this_week":t=new Date(r),t.setDate(r.getDate()-r.getDay());break;case"this_month":t=new Date(r.getFullYear(),r.getMonth(),1);break;case"this_year":t=new Date(r.getFullYear(),0,1);break;default:return}R(t),_(n),N("start"),s(a(t),a(n)),setTimeout(C,150)};return $?(0,o.jsx)(h,{ref:W,children:(0,o.jsxs)(x,{children:[(0,o.jsxs)(u,{children:[(0,o.jsx)(p,{onClick:()=>q("this_week"),children:"This Week"}),(0,o.jsx)(p,{onClick:()=>q("this_month"),children:"This Month"}),(0,o.jsx)(p,{onClick:()=>q("this_year"),children:"This Year"})]}),(0,o.jsxs)(g,{children:[(0,o.jsxs)(m,{children:[(0,o.jsx)(v,{onClick:H,"aria-label":"Previous month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,o.jsx)(v,{onClick:U,"aria-label":"Next month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,o.jsxs)(j,{children:[Y(M,B),(0,o.jsx)(y,{children:Y(V,K)})]})]})]})}):null},$=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,E=e=>{const r=new Date;let t=new Date;const n=new Date;switch(e){case"today":break;case"week":t.setDate(r.getDate()-6);break;case"month":t.setDate(r.getDate()-29);break;case"year":t.setDate(r.getDate()-364);break;case"all":t=new Date(2020,0,1)}return{start:$(t),end:$(n)}},B=s.Ay.div`
  margin-bottom: 24px;
`,D=s.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,M=s.Ay.button`
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
`,O=s.Ay.div`
  position: relative;
  display: inline-block;
`,I=s.Ay.button`
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
`,R=e=>{let{activePeriod:r,dateRange:t,isCustomDateRange:s,onPeriodChange:i,onCalendarRangeSelect:a,includeToday:l=!1,children:d}=e;const[c,h]=(0,n.useState)(!1),x=l?["today","week","month","year","all"]:["week","month","year","all"],u={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,o.jsx)(B,{children:(0,o.jsxs)(D,{children:[x.map(e=>(0,o.jsx)(M,{active:r===e&&!s,onClick:()=>i(e),children:u[e]},e)),(0,o.jsxs)(O,{children:[(0,o.jsxs)(I,{active:s,onClick:()=>h(!c),children:[(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,o.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,o.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,o.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),s&&t.start&&t.end?`${t.start} ~ ${t.end}`:"Custom Range"]}),(0,o.jsx)(C,{isOpen:c,startDate:t.start,endDate:t.end,onRangeSelect:(e,r)=>{a(e,r),h(!1)},onClose:()=>h(!1)})]}),d]})})}},2597:(e,r,t)=>{t.d(r,{Ex:()=>c,oz:()=>d,tU:()=>l});t(9950);var n=t(4752),s=t(4414);const o=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,i=n.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,a=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:r,className:t,style:n}=e;return(0,s.jsx)(o,{className:t,style:n,children:r})},d=e=>{let{active:r,onClick:t,children:n,className:o}=e;return(0,s.jsx)(i,{active:r,onClick:t,className:o,children:n})},c=e=>{let{count:r,variant:t="default",showZero:n=!1}=e;return 0!==r||n?(0,s.jsx)(a,{variant:t,children:r}):null}},2653:(e,r,t)=>{t.d(r,{M:()=>o});var n=t(9950),s=t(4492);function o(e){const[r,t]=(0,s.ok)(),o=(0,n.useCallback)(()=>r.get("tab")||e,[r,e]),[i,a]=(0,n.useState)(o());return[i,(0,n.useCallback)(e=>{a(e),t({tab:e})},[t])]}},4263:(e,r,t)=>{t.r(r),t.d(r,{default:()=>H});var n=t(9950),s=t(4752),o=t(8409),i=t(2597),a=t(2653),l=t(1367),d=t(9018),c=t(6038);const h=e=>{if(null===e||void 0===e)return"";const r=String(e);return r.includes(",")||r.includes('"')||r.includes("\n")||r.includes("\r")?`"${r.replace(/"/g,'""')}"`:r},x=e=>e.map(h).join(",");var u=t(1095),p=t(2847),g=t(3245),m=t(158),v=t(3440),j=t(2174),y=t(4915),F=t(7621),f=t(5297),b=t(2528),k=t(294),w=t(3588),S=t(8012),A=t(512),C=t(4414);const $=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,E=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,B=o.MD,D=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,M=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,O=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,I=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,R=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,T=s.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,_=s.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,z=s.Ay.div`
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
`,P=s.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,L=s.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,N=s.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,W=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],H=()=>{var e,r;const{user:t}=(0,l.As)(),{operationSettings:s}=(0,d.Pj)(),[H,U]=(0,a.M)("sales"),[Y,K]=(0,n.useState)("month"),[V,q]=(0,n.useState)(()=>(0,A.x)("month")),[G,J]=(0,n.useState)(!1),[,Q]=(0,n.useState)([]),[Z,X]=(0,n.useState)(!0),[ee,re]=(0,n.useState)(!1),[te,ne]=(0,n.useState)(null),[se,oe]=(0,n.useState)([]),[,ie]=(0,n.useState)([]),[,ae]=(0,n.useState)([]),[le,de]=(0,n.useState)(null),[ce,he]=(0,n.useState)(new Set),[xe,ue]=(0,n.useState)(new Set),pe=(0,n.useMemo)(()=>{if(null===le||void 0===le||!le.dailySales||0===le.dailySales.length)return[];const e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];if("today"===Y)return le.hourlySales?le.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{date:12===r?"12PM":r>12?r-12+"PM":0===r?"12AM":`${r}AM`,sales:Math.round(e.revenue)}}):[];if("week"===Y)return le.dailySales.map(r=>{const t=new Date(r.date);return{date:e[t.getDay()],sales:Math.round(r.revenue)}});if("month"===Y)return le.dailySales.map(e=>{const[,r,t]=e.date.split("-");return{date:`${r}/${t}`,sales:Math.round(e.revenue)}});{const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r={};return le.dailySales.forEach(t=>{const n=parseInt(t.date.split("-")[1])-1,s=e[n];r[s]=(r[s]||0)+t.revenue}),e.map(e=>({date:e,sales:Math.round(r[e]||0)}))}},[le,Y]),ge=(0,n.useMemo)(()=>{var e;return(null===le||void 0===le||null===(e=le.summary)||void 0===e?void 0:e.totalRevenue)||0},[le]),me=(0,n.useMemo)(()=>{var e;return(null===le||void 0===le||null===(e=le.summary)||void 0===e?void 0:e.totalOrders)||0},[le]),ve=(0,n.useMemo)(()=>{if(null===le||void 0===le||!le.categorySales||0===le.categorySales.length)return[{name:"No Data",value:100,sales:0}];const e=le.categorySales.reduce((e,r)=>e+r.revenue,0);return le.categorySales.map(r=>({name:r.category,value:e>0?Math.round(r.revenue/e*100):0,sales:Math.round(r.revenue)}))},[le]),je=(0,n.useMemo)(()=>{var e;if(null===le||void 0===le||!le.menuSales||0===le.menuSales.length)return[];const r=(null===(e=le.menuSales[0])||void 0===e?void 0:e.quantity)||1;return le.menuSales.map(e=>({name:e.name,category:e.category,price:e.quantity>0?e.revenue/e.quantity:0,orders:e.quantity,revenue:Math.round(e.revenue),performance:Math.round(e.quantity/r*100)}))},[le]),ye=(0,n.useMemo)(()=>null!==le&&void 0!==le&&le.hourlySales?le.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{hour:0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`,orders:e.orders}}):[],[le]),Fe=(0,n.useMemo)(()=>se.map(e=>({...e,period_orders:e.total_orders||0,period_spent:e.total_spent||0})).sort((e,r)=>r.period_spent-e.period_spent),[se]),fe=(0,n.useMemo)(()=>{if(null===le||void 0===le||!le.hourlySales)return{completionRate:0,avgPrepTime:0,peakHour:"N/A",peakHourOrders:0,totalOrdersInPeak:0};let e=12,r=0;le.hourlySales.forEach(t=>{t.orders>r&&(r=t.orders,e=t.hour)});return{completionRate:100,avgPrepTime:0,peakHour:(e=>{const r=(e+1)%24,t=e=>0===e?"12AM":12===e?"12PM":e>12?e-12+"PM":`${e}AM`;return`${t(e)}-${t(r)}`})(e),peakHourOrders:r,totalOrdersInPeak:r}},[le]),be=(0,n.useCallback)(async()=>{if(null===t||void 0===t||!t.restaurantId)return console.log("\u274c No restaurant ID found"),void X(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void X(!1);const[r,n,s]=await Promise.all([fetch(`/api/dashboard/restaurant/${t.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/customers/${t.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/menu?restaurantId=${t.restaurantId}&excludeImage=true`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})]);if(r.ok){const e=await r.json();ne(e.data||e)}if(n.ok){const e=await n.json();e.success&&Array.isArray(e.data)&&oe(e.data)}if(s.ok){const e=await s.json();e.success&&e.data&&(e.data.items&&ie(e.data.items),e.data.categories&&ae(e.data.categories))}}catch(e){console.error("\u274c Error fetching static data:",e)}finally{X(!1)}},[null===t||void 0===t?void 0:t.restaurantId]),ke=(0,n.useCallback)(async()=>{if(null===t||void 0===t||!t.restaurantId)return;const e=localStorage.getItem("auth_token");if(e){re(!0);try{const r=new URLSearchParams({startDate:V.start,endDate:V.end}),n=await fetch(`/api/dashboard/restaurant/${t.restaurantId}/reports-summary?${r.toString()}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&(de(e.data),Q([]))}}catch(r){console.error("\u274c Error fetching reports summary:",r)}finally{re(!1)}}},[null===t||void 0===t?void 0:t.restaurantId,V.start,V.end]);(0,n.useEffect)(()=>{be()},[be]),(0,n.useEffect)(()=>{ke()},[ke]);const we=(0,n.useMemo)(()=>{var e;if(null===le||void 0===le||!le.hourlySales)return[];const r=(null===(e=le.summary)||void 0===e?void 0:e.totalOrders)||1;return le.hourlySales.filter(e=>e.orders>0).map(e=>{const t=e.hour;return{time:`${t.toString().padStart(2,"0")}:00-${((t+1)%24).toString().padStart(2,"0")}:00`,orders:e.orders,revenue:Math.round(e.revenue),efficiency:Math.min(100,Math.round(e.orders/(r/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[le]),Se=(0,n.useMemo)(()=>{if(null===le||void 0===le||!le.dailySales||0===le.dailySales.length)return{};const e={};return le.dailySales.forEach(r=>{const[t,n]=r.date.split("-"),s=`${t}-${n}`,o=r.date;e[t]||(e[t]={year:t,revenue:0,orders:0,months:{}}),e[t].months[s]||(e[t].months[s]={month:s,revenue:0,orders:0,days:{}}),e[t].months[s].days[o]||(e[t].months[s].days[o]={day:o,revenue:0,orders:0});const i=r.revenue,a=r.orders;e[t].revenue+=i,e[t].orders+=a,e[t].months[s].revenue+=i,e[t].months[s].orders+=a,e[t].months[s].days[o].revenue+=i,e[t].months[s].days[o].orders+=a}),e},[le]),Ae=()=>{const e=new Date(V.start),r=new Date(V.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(()=>{const e=Ae()})();n.useEffect(()=>{const e=Ae();if(e<=31){const e=new Set(Object.keys(Se)),r=new Set;Object.keys(Se).forEach(e=>{Object.keys(Se[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),he(e),ue(r)}else if(e<=365){const e=new Set(Object.keys(Se));he(e),ue(new Set)}else he(new Set),ue(new Set)},[V.start,V.end,me]);const Ce=e=>{K(e),J(!1),q((0,A.x)(e))},$e=(e,r)=>{J(!0),K("all"),q({start:e,end:r})},Ee=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e.toFixed(r)},Be=(0,n.useCallback)(()=>{const e=["Date,Revenue"];return pe.forEach(r=>{e.push(`${h(r.date)},${Ee(r.sales)}`)}),e.join("\n")},[pe]),De=(0,n.useCallback)(()=>{const e=["Date,Revenue,Orders,Avg_Order_Value"];return Object.keys(Se).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=Se[r];Object.keys(t.months).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const n=t.months[r];Object.keys(n.days).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=n.days[r],s=t.orders>0?t.revenue/t.orders:0;e.push(`${r},${Ee(t.revenue)},${t.orders},${Ee(s)}`)})})}),e.join("\n")},[Se]),Me=(0,n.useCallback)(()=>{const e=["Rank,Item_Name,Category,Unit_Price,Qty_Sold,Revenue"];return je.forEach((r,t)=>{e.push(x([t+1,r.name,r.category,Ee(r.price),r.orders,Ee(r.revenue)]))}),e.join("\n")},[je]),Oe=(0,n.useCallback)(()=>{const e=["Rank,Name,Phone,Type,Total_Orders,Total_Spent,Points,Tier"];return[...Fe].sort((e,r)=>(r.period_spent||0)-(e.period_spent||0)).forEach((r,t)=>{var n,s,o;e.push(x([t+1,(null===(n=r.customer)||void 0===n?void 0:n.name)||"Guest",(null===(s=r.customer)||void 0===s?void 0:s.phone)||"-","member"===(null===(o=r.customer)||void 0===o?void 0:o.type)?"Member":"Guest",r.period_orders||0,Ee(r.period_spent||0),r.points||0,r.loyalty_tier||"Bronze"]))}),e.join("\n")},[Fe]),Ie=(0,n.useCallback)(()=>{const e=["Time_Slot,Orders,Revenue"];return we.forEach(r=>{e.push(x([r.time,r.orders,Ee(r.revenue)]))}),e.join("\n")},[we]),Re=(0,n.useCallback)(()=>{let e;switch(H){case"sales":default:e=Be();break;case"details":e=De();break;case"menu":e=Me();break;case"customers":e=Oe();break;case"operations":e=Ie()}var r,n,s,o,i,a;((e,r)=>{const t=new Blob(["\ufeff"+e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(t),s=document.createElement("a");s.setAttribute("href",n),s.setAttribute("download",r),s.style.visibility="hidden",s.style.position="absolute",s.style.left="-9999px",document.body.appendChild(s),s.click(),setTimeout(()=>{URL.revokeObjectURL(n),document.body.removeChild(s)},150)})(e,(r=`purplepos_${(null===t||void 0===t?void 0:t.restaurantId)||"report"}`,n=H,s=Y,o=G,i=V.start,a=V.end,`${r}_${n}_${o?`${i}_${a}`:s}_${(new Date).toISOString().split("T")[0]}.csv`))},[H,Y,G,V,null===t||void 0===t?void 0:t.restaurantId,Be,De,Me,Oe,Ie]),Te=()=>(0,C.jsx)(A.A,{activePeriod:Y,dateRange:V,isCustomDateRange:G,onPeriodChange:Ce,onCalendarRangeSelect:$e,children:(0,C.jsxs)("button",{onClick:Re,style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",background:"#F6F9FC",color:"#0A2540",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"14px",marginLeft:"auto"},children:[(0,C.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,C.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})});return(0,C.jsx)(C.Fragment,{children:(0,C.jsxs)($,{children:[(0,C.jsx)(S.Ay,{title:"Reports"}),(0,C.jsxs)(E,{children:[(0,C.jsxs)(i.tU,{children:[(0,C.jsx)(i.oz,{active:"sales"===H,onClick:()=>U("sales"),children:"Sales Report"}),(0,C.jsx)(i.oz,{active:"details"===H,onClick:()=>U("details"),children:"Sales Details"}),(0,C.jsx)(i.oz,{active:"menu"===H,onClick:()=>U("menu"),children:"Menu Analysis"}),(0,C.jsx)(i.oz,{active:"customers"===H,onClick:()=>U("customers"),children:"Customer Insights"}),(0,C.jsx)(i.oz,{active:"operations"===H,onClick:()=>U("operations"),children:"Operations"})]}),(0,C.jsxs)("div",{style:{display:"sales"===H?"block":"none"},children:[(0,C.jsx)(Te,{}),Z||ee?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===me?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,C.jsxs)("div",{children:[(0,C.jsxs)(B,{children:[(0,C.jsxs)(o.hI,{color:"#059669",children:[(0,C.jsx)(o.v0,{children:"Total Revenue"}),(0,C.jsx)(o.Os,{children:(0,c.vv)(ge,s.currency)}),(0,C.jsxs)(o.d1,{children:[me," orders in selected period"]})]}),(0,C.jsxs)(o.hI,{color:"#2563EB",children:[(0,C.jsx)(o.v0,{children:"Total Orders"}),(0,C.jsx)(o.Os,{children:me.toLocaleString()}),(0,C.jsx)(o.d1,{children:"For selected period"})]}),(0,C.jsxs)(o.hI,{color:"#DC2626",children:[(0,C.jsx)(o.v0,{children:"Average Order Value"}),(0,C.jsx)(o.Os,{children:(0,c.vv)(me>0?ge/me:0,s.currency)}),(0,C.jsx)(o.d1,{children:"Per order"})]}),(0,C.jsxs)(o.hI,{color:"#7C3AED",children:[(0,C.jsx)(o.v0,{children:"Completed Orders"}),(0,C.jsx)(o.Os,{children:me}),(0,C.jsx)(o.d1,{children:"100% completion rate"})]})]}),(0,C.jsxs)(D,{children:[(0,C.jsxs)(M,{children:[(0,C.jsx)(O,{children:"Revenue Trend"}),(0,C.jsx)(u.u,{width:"100%",height:300,children:(0,C.jsxs)(p.b,{data:pe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,C.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,C.jsx)(m.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,C.jsx)(v.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,C.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,C.jsx)(y.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,C.jsxs)(M,{children:[(0,C.jsx)(O,{children:"Sales by Category"}),(0,C.jsx)(u.u,{width:"100%",height:300,children:(0,C.jsxs)(F.r,{children:[(0,C.jsx)(f.F,{data:ve,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:ve.map((e,r)=>(0,C.jsx)(b.f,{fill:W[r%W.length]},`cell-${r}`))}),(0,C.jsx)(j.m,{formatter:e=>`${e}%`})]})})]})]}),(0,C.jsxs)(M,{children:[(0,C.jsx)(O,{children:"Hourly Orders Distribution"}),(0,C.jsx)(u.u,{width:"100%",height:250,children:(0,C.jsxs)(k.E,{data:ye,margin:{top:5,right:20,left:0,bottom:5},children:[(0,C.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,C.jsx)(m.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,C.jsx)(v.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,C.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,C.jsx)(w.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,C.jsxs)("div",{style:{display:"details"===H?"block":"none"},children:[(0,C.jsx)(Te,{}),Z||ee?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===me?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,C.jsxs)("div",{children:[(0,C.jsxs)(B,{children:[(0,C.jsxs)(o.hI,{color:"#059669",children:[(0,C.jsx)(o.v0,{children:"Total Revenue"}),(0,C.jsx)(o.Os,{children:(0,c.vv)(ge,s.currency)}),(0,C.jsxs)(o.d1,{children:[me," orders in selected period"]})]}),(0,C.jsxs)(o.hI,{color:"#2563EB",children:[(0,C.jsx)(o.v0,{children:"Total Orders"}),(0,C.jsx)(o.Os,{children:me.toLocaleString()}),(0,C.jsxs)(o.d1,{children:[me," completed"]})]}),(0,C.jsxs)(o.hI,{color:"#DC2626",children:[(0,C.jsx)(o.v0,{children:"Average Order Value"}),(0,C.jsx)(o.Os,{children:(0,c.vv)(me>0?ge/me:0,s.currency)}),(0,C.jsx)(o.d1,{children:"Per order average"})]}),(0,C.jsxs)(o.hI,{color:"#7C3AED",children:[(0,C.jsx)(o.v0,{children:"Period"}),(0,C.jsx)(o.Os,{children:G?Ae():"today"===Y?"1":"week"===Y?"7":"month"===Y?"30":"year"===Y?"365":Ae()}),(0,C.jsx)(o.d1,{children:G?`${V.start} to ${V.end}`:"today"===Y?"Day":"Days"})]})]}),(0,C.jsxs)(I,{children:[(0,C.jsxs)(O,{children:["Detailed Sales Breakdown (",G?`${V.start} to ${V.end}`:Y,")"]}),(0,C.jsxs)(R,{children:[(0,C.jsx)("thead",{children:(0,C.jsxs)("tr",{children:[(0,C.jsx)(T,{style:{width:"40%"},children:"Period"}),(0,C.jsx)(T,{style:{textAlign:"right"},children:"Revenue"}),(0,C.jsx)(T,{style:{textAlign:"right"},children:"Orders"}),(0,C.jsx)(T,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,C.jsx)("tbody",{children:Object.keys(Se).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=Se[e],t=ce.has(e);return(0,C.jsxs)(n.Fragment,{children:[(0,C.jsxs)(P,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(ce);if(r.has(e)){var t;r.delete(e);const n=new Set(xe);Object.keys((null===(t=Se[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{n.delete(`${e}-${r}`)}),ue(n)}else r.add(e);he(r)})(e),children:[(0,C.jsxs)(L,{level:0,bold:!0,children:[(0,C.jsx)(N,{expanded:t,children:"\u25b6"}),e]}),(0,C.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue,s.currency)}),(0,C.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,C.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,s.currency)})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const o=r.months[t],i=`${e}-${t}`,a=xe.has(i),l=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,C.jsxs)(n.Fragment,{children:[(0,C.jsxs)(P,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set(xe);r.has(e)?r.delete(e):r.add(e),ue(r)})(i),children:[(0,C.jsxs)(L,{level:1,bold:!0,children:[(0,C.jsx)(N,{expanded:a,children:"\u25b6"}),l]}),(0,C.jsx)(L,{level:1,style:{textAlign:"right"},children:(0,c.vv)(o.revenue,s.currency)}),(0,C.jsx)(L,{level:1,style:{textAlign:"right"},children:o.orders}),(0,C.jsx)(L,{level:1,style:{textAlign:"right"},children:(0,c.vv)(o.revenue/o.orders,s.currency)})]}),a&&Object.keys(o.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=o.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,C.jsxs)(P,{level:2,children:[(0,C.jsx)(L,{level:2,children:t}),(0,C.jsx)(L,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(r.revenue,s.currency)}),(0,C.jsx)(L,{level:2,style:{textAlign:"right"},children:r.orders}),(0,C.jsx)(L,{level:2,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,s.currency)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,C.jsxs)("div",{style:{display:"menu"===H?"block":"none"},children:[(0,C.jsx)(Te,{}),(0,C.jsxs)(B,{children:[(0,C.jsxs)(o.hI,{color:"#F59E0B",children:[(0,C.jsx)(o.v0,{children:"Best Seller"}),(0,C.jsx)(o.Os,{children:(null===(e=je[0])||void 0===e?void 0:e.name)||"N/A"}),(0,C.jsxs)(o.d1,{children:[(null===(r=je[0])||void 0===r?void 0:r.orders)||0," sold in selected period"]})]}),(0,C.jsxs)(o.hI,{color:"#10B981",children:[(0,C.jsx)(o.v0,{children:"Menu Items"}),(0,C.jsx)(o.Os,{children:je.length}),(0,C.jsx)(o.d1,{children:"Items with sales"})]}),(0,C.jsxs)(o.hI,{color:"#3B82F6",children:[(0,C.jsx)(o.v0,{children:"Items Sold"}),(0,C.jsx)(o.Os,{children:je.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,C.jsx)(o.d1,{children:"Total quantity sold"})]}),(0,C.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,C.jsx)(o.v0,{children:"Total Revenue"}),(0,C.jsx)(o.Os,{children:(0,c.vv)(je.reduce((e,r)=>e+r.revenue,0),s.currency)}),(0,C.jsx)(o.d1,{children:"For selected period"})]})]}),(0,C.jsxs)(I,{children:[(0,C.jsxs)(O,{children:["Complete Menu Performance Ranking (",G?`${V.start} to ${V.end}`:Y,")"]}),(0,C.jsxs)(R,{children:[(0,C.jsx)("thead",{children:(0,C.jsxs)("tr",{children:[(0,C.jsx)(T,{children:"Rank"}),(0,C.jsx)(T,{children:"Menu Item"}),(0,C.jsx)(T,{children:"Category"}),(0,C.jsx)(T,{children:"Price"}),(0,C.jsx)(T,{children:"Qty Sold"}),(0,C.jsx)(T,{children:"Revenue"}),(0,C.jsx)(T,{children:"Performance"})]})}),(0,C.jsx)("tbody",{children:je.map((e,r)=>{var t;const n=(null===(t=je[0])||void 0===t?void 0:t.orders)||1;return(0,C.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,C.jsxs)(_,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,C.jsx)(_,{style:{fontWeight:600},children:e.name}),(0,C.jsx)(_,{children:(0,C.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,C.jsx)(_,{children:(0,c.vv)(e.price,s.currency)}),(0,C.jsx)(_,{children:e.orders.toLocaleString()}),(0,C.jsx)(_,{children:(0,c.vv)(e.revenue,s.currency)}),(0,C.jsx)(_,{children:(0,C.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,C.jsx)(z,{percentage:e.orders/n*100}),(0,C.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},r)})})]})]})]}),(0,C.jsxs)("div",{style:{display:"customers"===H?"block":"none"},children:[(0,C.jsx)(Te,{}),Z||ee?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading customer data..."}):0===Fe.length?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No customers with orders in the selected period"}):(0,C.jsxs)("div",{children:[(0,C.jsxs)(B,{children:[(0,C.jsxs)(o.hI,{color:"#635BFF",children:[(0,C.jsx)(o.v0,{children:"Active Customers"}),(0,C.jsx)(o.Os,{children:Fe.length.toLocaleString()}),(0,C.jsxs)(o.d1,{children:[Fe.filter(e=>{var r;return"member"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," members, ",Fe.filter(e=>{var r;return"guest"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," guests"]})]}),(0,C.jsxs)(o.hI,{color:"#00D924",children:[(0,C.jsx)(o.v0,{children:"Repeat Customers"}),(0,C.jsx)(o.Os,{children:Fe.filter(e=>e.period_orders>1).length}),(0,C.jsxs)(o.d1,{children:[Fe.length>0?Math.round(Fe.filter(e=>e.period_orders>1).length/Fe.length*100):0,"% ordered multiple times"]})]}),(0,C.jsxs)(o.hI,{color:"#FFB800",children:[(0,C.jsx)(o.v0,{children:"Average Spent"}),(0,C.jsx)(o.Os,{children:(0,c.vv)(Fe.length>0?Fe.reduce((e,r)=>e+(r.period_spent||0),0)/Fe.length:0,s.currency)}),(0,C.jsx)(o.d1,{children:"Per customer in period"})]}),(0,C.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,C.jsx)(o.v0,{children:"Period Revenue"}),(0,C.jsx)(o.Os,{children:(0,c.vv)(Fe.reduce((e,r)=>e+(r.period_spent||0),0),s.currency)}),(0,C.jsxs)(o.d1,{children:["From ",Fe.length," customers"]})]})]}),(0,C.jsxs)(I,{children:[(0,C.jsxs)(O,{children:["Top Customers (",G?`${V.start} to ${V.end}`:Y,")"]}),(0,C.jsxs)(R,{children:[(0,C.jsx)("thead",{children:(0,C.jsxs)("tr",{children:[(0,C.jsx)(T,{children:"Rank"}),(0,C.jsx)(T,{children:"Name"}),(0,C.jsx)(T,{children:"Phone"}),(0,C.jsx)(T,{children:"Type"}),(0,C.jsx)(T,{children:"Period Orders"}),(0,C.jsx)(T,{children:"Period Spent"}),(0,C.jsx)(T,{children:"Total Points"}),(0,C.jsx)(T,{children:"Tier"})]})}),(0,C.jsx)("tbody",{children:Fe.slice(0,20).map((e,r)=>{var t,n,o,i,a,l;return(0,C.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,C.jsxs)(_,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,C.jsx)(_,{style:{fontWeight:600},children:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Guest"}),(0,C.jsx)(_,{children:(null===(o=e.customer)||void 0===o?void 0:o.phone)||"-"}),(0,C.jsx)(_,{children:(0,C.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"member"===(null===(i=e.customer)||void 0===i?void 0:i.type)?"#E0F2FE":"#F3F4F6",color:"member"===(null===(a=e.customer)||void 0===a?void 0:a.type)?"#0369A1":"#6B7280"},children:"member"===(null===(l=e.customer)||void 0===l?void 0:l.type)?"Member":"Guest"})}),(0,C.jsx)(_,{children:e.period_orders||0}),(0,C.jsx)(_,{children:(0,c.vv)(e.period_spent||0,s.currency)}),(0,C.jsx)(_,{children:e.points||0}),(0,C.jsx)(_,{children:(0,C.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"VIP"===e.loyalty_tier?"#FEF3C7":"Gold"===e.loyalty_tier?"#FEF9C3":"Silver"===e.loyalty_tier?"#F3F4F6":"#E5E7EB",color:"VIP"===e.loyalty_tier?"#92400E":"Gold"===e.loyalty_tier?"#854D0E":"#6B7280"},children:e.loyalty_tier||"Bronze"})})]},(null===(t=e.customer)||void 0===t?void 0:t.id)||r)})})]})]})]})]}),(0,C.jsxs)("div",{style:{display:"operations"===H?"block":"none"},children:[(0,C.jsx)(Te,{}),Z||ee?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading operations data..."}):0===me?(0,C.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,C.jsxs)("div",{children:[(0,C.jsxs)(B,{children:[(0,C.jsxs)(o.hI,{color:"#10B981",children:[(0,C.jsx)(o.v0,{children:"Completed Orders"}),(0,C.jsx)(o.Os,{children:me.toLocaleString()}),(0,C.jsxs)(o.d1,{children:[fe.completionRate,"% fulfillment rate"]})]}),(0,C.jsxs)(o.hI,{color:"#F59E0B",children:[(0,C.jsx)(o.v0,{children:"Avg. Prep Time"}),(0,C.jsx)(o.Os,{children:fe.avgPrepTime>0?`${fe.avgPrepTime} min`:"N/A"}),(0,C.jsx)(o.d1,{children:fe.avgPrepTime>0?"Order to served":"No timing data"})]}),(0,C.jsxs)(o.hI,{color:"#EF4444",children:[(0,C.jsx)(o.v0,{children:"Peak Hour"}),(0,C.jsx)(o.Os,{children:fe.peakHour}),(0,C.jsxs)(o.d1,{children:[fe.peakHourOrders," orders in this slot"]})]}),(0,C.jsxs)(o.hI,{color:"#6366F1",children:[(0,C.jsx)(o.v0,{children:"Orders per Day"}),(0,C.jsx)(o.Os,{children:(()=>{const e=Math.max(1,Math.ceil((new Date(V.end).getTime()-new Date(V.start).getTime())/864e5)+1);return Math.round(me/e)})()}),(0,C.jsx)(o.d1,{children:"Average daily orders"})]})]}),(0,C.jsxs)(I,{children:[(0,C.jsxs)(O,{children:["Peak Hours Performance (",G?`${V.start} to ${V.end}`:Y,")"]}),(0,C.jsxs)(R,{children:[(0,C.jsx)("thead",{children:(0,C.jsxs)("tr",{children:[(0,C.jsx)(T,{children:"Time Slot"}),(0,C.jsx)(T,{children:"Orders"}),(0,C.jsx)(T,{children:"Revenue"}),(0,C.jsx)(T,{children:"Share"})]})}),(0,C.jsx)("tbody",{children:0===we.length?(0,C.jsx)("tr",{children:(0,C.jsx)(_,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No peak hours data available"})}):we.map((e,r)=>(0,C.jsxs)("tr",{style:{backgroundColor:0===r?"#FEF3C7":"transparent"},children:[(0,C.jsxs)(_,{style:{fontWeight:600},children:[0===r&&"\ud83d\udd25 ",e.time]}),(0,C.jsx)(_,{children:e.orders}),(0,C.jsx)(_,{children:(0,c.vv)(e.revenue,s.currency)}),(0,C.jsx)(_,{children:(0,C.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,C.jsx)(z,{percentage:me>0?e.orders/me*100:0}),(0,C.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[me>0?Math.round(e.orders/me*100):0,"%"]})]})})]},r))})]})]}),(0,C.jsxs)(M,{style:{marginTop:"24px"},children:[(0,C.jsx)(O,{children:"Hourly Order Distribution"}),(0,C.jsx)(u.u,{width:"100%",height:250,children:(0,C.jsxs)(k.E,{data:ye,margin:{top:5,right:20,left:0,bottom:5},children:[(0,C.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,C.jsx)(m.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,C.jsx)(v.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,C.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,C.jsx)(w.y,{dataKey:"orders",fill:"#6366F1",radius:[4,4,0,0]})]})})]})]})]})]})]})})}},8012:(e,r,t)=>{t.d(r,{Ay:()=>l});t(9950);var n=t(4752),s=t(4414);const o=n.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px 16px;
    height: auto;
    min-height: 48px;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`,i=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,a=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,l=e=>{let{title:r,children:t}=e;return(0,s.jsxs)(o,{children:[(0,s.jsx)(i,{children:r}),t&&(0,s.jsx)(a,{children:t})]})}}}]);