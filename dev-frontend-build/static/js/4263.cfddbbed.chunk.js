"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4263],{512:(e,r,t)=>{t.d(r,{x:()=>E,A:()=>T});var n=t(9950),s=t(4752),i=t(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],l=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[r,t,n]=e.split("-").map(Number);return new Date(r,t-1,n)},a=(e,r)=>e.getFullYear()===r.getFullYear()&&e.getMonth()===r.getMonth()&&e.getDate()===r.getDate(),c=(e,r)=>new Date(e,r).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=s.Ay.div`
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
`,g=s.Ay.div``,v=s.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,m=s.Ay.button`
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
`,f=s.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,F=s.Ay.div`
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
`,C=s.Ay.div`
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
`,A=e=>{let{startDate:r,endDate:t,onRangeSelect:s,onClose:A,isOpen:$}=e;const E=new Date,[B,D]=(0,n.useState)(E.getMonth()),[M,O]=(0,n.useState)(E.getFullYear()),[I,T]=(0,n.useState)(null),[R,P]=(0,n.useState)(null),[z,_]=(0,n.useState)(null),[L,W]=(0,n.useState)("start"),N=(0,n.useRef)(null);(0,n.useEffect)(()=>{r&&T(d(r)),t&&P(d(t))},[r,t]),(0,n.useEffect)(()=>{$&&W("start")},[$]),(0,n.useEffect)(()=>{const e=e=>{N.current&&!N.current.contains(e.target)&&A()};return $&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[$,A]);const H=(0,n.useCallback)(()=>{0===B?(D(11),O(e=>e-1)):D(e=>e-1)},[B]),U=(0,n.useCallback)(()=>{11===B?(D(0),O(e=>e+1)):D(e=>e+1)},[B]),Y=(e,r)=>{const t=((e,r)=>new Date(e,r+1,0).getDate())(e,r),n=((e,r)=>new Date(e,r,1).getDay())(e,r),d=[];for(let s=0;s<n;s++)d.push(null);for(let s=1;s<=t;s++)d.push(new Date(e,r,s));return(0,i.jsxs)(f,{children:[(0,i.jsx)(F,{children:c(e,r)}),(0,i.jsx)(b,{children:o.map(e=>(0,i.jsx)(k,{children:e},e))}),(0,i.jsx)(w,{children:d.map((e,r)=>{if(!e)return(0,i.jsx)(S,{},`e-${r}`);const{isStart:t,isEnd:n,isInRange:o,isHoverEnd:d}=(e=>{const r=I&&a(e,I),t=R&&a(e,R),n="end"===L&&z?z:R;let s=!1;if(I&&n){const[r,t]=I<=n?[I,n]:[n,I];s=((e,r,t)=>{const n=e.getTime();return n>r.getTime()&&n<t.getTime()})(e,r,t)}return{isStart:r,isEnd:t,isInRange:s,isHoverEnd:"end"===L&&z&&a(e,z)}})(e),c=a(e,E);return(0,i.jsx)(C,{$isStart:!!t,$isEnd:!!n,$isInRange:o,$isHoverEnd:!!d,$isToday:c,onClick:()=>(e=>{if("start"===L)T(e),P(null),W("end");else{let r=I,t=e;t<r&&([r,t]=[t,r]),T(r),P(t),W("start"),s(l(r),l(t)),setTimeout(A,200)}})(e),onMouseEnter:()=>_(e),onMouseLeave:()=>_(null),children:e.getDate()},e.getTime())})})]})},K=11===B?0:B+1,V=11===B?M+1:M,q=e=>{const r=new Date;let t;const n=r;switch(e){case"this_week":t=new Date(r),t.setDate(r.getDate()-r.getDay());break;case"this_month":t=new Date(r.getFullYear(),r.getMonth(),1);break;case"this_year":t=new Date(r.getFullYear(),0,1);break;default:return}T(t),P(n),W("start"),s(l(t),l(n)),setTimeout(A,150)};return $?(0,i.jsx)(h,{ref:N,children:(0,i.jsxs)(x,{children:[(0,i.jsxs)(u,{children:[(0,i.jsx)(p,{onClick:()=>q("this_week"),children:"This Week"}),(0,i.jsx)(p,{onClick:()=>q("this_month"),children:"This Month"}),(0,i.jsx)(p,{onClick:()=>q("this_year"),children:"This Year"})]}),(0,i.jsxs)(g,{children:[(0,i.jsxs)(v,{children:[(0,i.jsx)(m,{onClick:H,"aria-label":"Previous month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,i.jsx)(m,{onClick:U,"aria-label":"Next month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,i.jsxs)(j,{children:[Y(M,B),(0,i.jsx)(y,{children:Y(V,K)})]})]})]})}):null},$=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,E=(e,r)=>{const t=(e=>{if(!e)return new Date;try{const r=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[t,n,s]=r.split("-").map(Number);return new Date(t,n-1,s)}catch{return new Date}})(r);let n=new Date(t);const s=new Date(t);switch(e){case"today":break;case"week":n.setDate(t.getDate()-6);break;case"month":n.setDate(t.getDate()-29);break;case"year":n.setDate(t.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:$(n),end:$(s)}},B=s.Ay.div`
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
`,T=e=>{let{activePeriod:r,dateRange:t,isCustomDateRange:s,onPeriodChange:o,onCalendarRangeSelect:l,includeToday:d=!1,children:a}=e;const[c,h]=(0,n.useState)(!1),x=d?["today","week","month","year","all"]:["week","month","year","all"],u={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,i.jsx)(B,{children:(0,i.jsxs)(D,{children:[x.map(e=>(0,i.jsx)(M,{active:r===e&&!s,onClick:()=>o(e),children:u[e]},e)),(0,i.jsxs)(O,{children:[(0,i.jsxs)(I,{active:s,onClick:()=>h(!c),children:[(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,i.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,i.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,i.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),t.start&&t.end?`${t.start} ~ ${t.end}`:"Custom Range"]}),(0,i.jsx)(A,{isOpen:c,startDate:t.start,endDate:t.end,onRangeSelect:(e,r)=>{l(e,r),h(!1)},onClose:()=>h(!1)})]}),a]})})}},2597:(e,r,t)=>{t.d(r,{Ex:()=>c,oz:()=>a,tU:()=>d});t(9950);var n=t(4752),s=t(4414);const i=n.Ay.div`
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
`,o=n.Ay.button`
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
`,l=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:r,className:t,style:n}=e;return(0,s.jsx)(i,{className:t,style:n,children:r})},a=e=>{let{active:r,onClick:t,children:n,className:i}=e;return(0,s.jsx)(o,{active:r,onClick:t,className:i,children:n})},c=e=>{let{count:r,variant:t="default",showZero:n=!1}=e;return 0!==r||n?(0,s.jsx)(l,{variant:t,children:r}):null}},2653:(e,r,t)=>{t.d(r,{M:()=>i});var n=t(9950),s=t(4492);function i(e){const[r,t]=(0,s.ok)(),i=(0,n.useCallback)(()=>r.get("tab")||e,[r,e]),[o,l]=(0,n.useState)(i());return[o,(0,n.useCallback)(e=>{l(e),t({tab:e})},[t])]}},4263:(e,r,t)=>{t.r(r),t.d(r,{default:()=>K});var n=t(9950),s=t(4752),i=t(8409),o=t(2597),l=t(2653),d=t(1367),a=t(9018),c=t(6038);const h=e=>{if(null===e||void 0===e)return"";const r=String(e);return r.includes(",")||r.includes('"')||r.includes("\n")||r.includes("\r")?`"${r.replace(/"/g,'""')}"`:r},x=e=>e.map(h).join(",");var u=t(1095),p=t(2847),g=t(3245),v=t(158),m=t(3440),j=t(2174),y=t(4915),f=t(7621),F=t(5297),b=t(2528),k=t(294),w=t(3588),S=t(8012),C=t(512),A=t(4414);const $=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,E=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,B=i.MD,D=s.Ay.div`
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
`,T=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,R=s.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,P=s.Ay.td`
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
`,_=s.Ay.tr`
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
`,W=s.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,N=s.Ay.button`
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
`,H=s.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,U=s.Ay.div`
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
`,Y=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],K=()=>{var e,r,t,s,K,V;const{user:q}=(0,d.As)(),{operationSettings:G}=(0,a.Pj)(),[J,Q]=(0,l.M)("sales"),[Z,X]=(0,n.useState)("month"),[ee,re]=(0,n.useState)(()=>(0,C.x)("month")),[te,ne]=(0,n.useState)(!1),[,se]=(0,n.useState)([]),[ie,oe]=(0,n.useState)(!0),[le,de]=(0,n.useState)(!1),[ae,ce]=(0,n.useState)(null),[he,xe]=(0,n.useState)([]),[,ue]=(0,n.useState)([]),[,pe]=(0,n.useState)([]),[ge,ve]=(0,n.useState)(null),[me,je]=(0,n.useState)("all"),[ye,fe]=(0,n.useState)(new Set),[Fe,be]=(0,n.useState)(new Set),ke=(0,n.useMemo)(()=>{if(null===ge||void 0===ge||!ge.dailySales||0===ge.dailySales.length)return[];const e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];if("today"===Z)return ge.hourlySales?ge.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{date:12===r?"12PM":r>12?r-12+"PM":0===r?"12AM":`${r}AM`,sales:Math.round(e.revenue)}}):[];if("week"===Z)return ge.dailySales.map(r=>{const t=new Date(r.date);return{date:e[t.getDay()],sales:Math.round(r.revenue)}});if("month"===Z)return ge.dailySales.map(e=>{const[,r,t]=e.date.split("-");return{date:`${r}/${t}`,sales:Math.round(e.revenue)}});{const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r={};return ge.dailySales.forEach(t=>{const n=parseInt(t.date.split("-")[1])-1,s=e[n];r[s]=(r[s]||0)+t.revenue}),e.map(e=>({date:e,sales:Math.round(r[e]||0)}))}},[ge,Z]),we=(0,n.useMemo)(()=>{var e;return(null===ge||void 0===ge||null===(e=ge.summary)||void 0===e?void 0:e.totalRevenue)||0},[ge]),Se=(0,n.useMemo)(()=>{var e;return(null===ge||void 0===ge||null===(e=ge.summary)||void 0===e?void 0:e.totalOrders)||0},[ge]),Ce=(0,n.useMemo)(()=>{if(null===ge||void 0===ge||!ge.categorySales||0===ge.categorySales.length)return[{name:"No Data",value:100,sales:0}];const e=ge.categorySales.reduce((e,r)=>e+r.revenue,0);return ge.categorySales.map(r=>({name:r.category,value:e>0?Math.round(r.revenue/e*100):0,sales:Math.round(r.revenue)}))},[ge]),Ae=(0,n.useMemo)(()=>{var e;if(null===ge||void 0===ge||!ge.menuSales||0===ge.menuSales.length)return[];const r=(null===(e=ge.menuSales[0])||void 0===e?void 0:e.quantity)||1;return ge.menuSales.map(e=>({name:e.name,category:e.category,price:e.quantity>0?e.revenue/e.quantity:0,orders:e.quantity,revenue:Math.round(e.revenue),performance:Math.round(e.quantity/r*100)}))},[ge]),$e=(0,n.useMemo)(()=>null!==ge&&void 0!==ge&&ge.hourlySales?ge.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{hour:0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`,orders:e.orders}}):[],[ge]),Ee=(0,n.useMemo)(()=>he.map(e=>({...e,period_orders:e.total_orders||0,period_spent:e.total_spent||0})).sort((e,r)=>r.period_spent-e.period_spent),[he]),Be=(0,n.useMemo)(()=>{if(null===ge||void 0===ge||!ge.hourlySales)return{completionRate:0,avgPrepTime:0,peakHour:"N/A",peakHourOrders:0,totalOrdersInPeak:0};let e=12,r=0;ge.hourlySales.forEach(t=>{t.orders>r&&(r=t.orders,e=t.hour)});return{completionRate:100,avgPrepTime:0,peakHour:(e=>{const r=(e+1)%24,t=e=>0===e?"12AM":12===e?"12PM":e>12?e-12+"PM":`${e}AM`;return`${t(e)}-${t(r)}`})(e),peakHourOrders:r,totalOrdersInPeak:r}},[ge]),De=(0,n.useCallback)(async()=>{if(null===q||void 0===q||!q.restaurantId)return console.log("\u274c No restaurant ID found"),void oe(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void oe(!1);const[r,t,n]=await Promise.all([fetch(`/api/dashboard/restaurant/${q.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/customers/${q.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/menu?restaurantId=${q.restaurantId}&excludeImage=true`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})]);if(r.ok){const e=await r.json();ce(e.data||e)}if(t.ok){const e=await t.json();e.success&&Array.isArray(e.data)&&xe(e.data)}if(n.ok){const e=await n.json();e.success&&e.data&&(e.data.items&&ue(e.data.items),e.data.categories&&pe(e.data.categories))}}catch(e){console.error("\u274c Error fetching static data:",e)}finally{oe(!1)}},[null===q||void 0===q?void 0:q.restaurantId]),Me=(0,n.useCallback)(async()=>{if(null===q||void 0===q||!q.restaurantId)return;const e=localStorage.getItem("auth_token");if(e){de(!0);try{const r=new URLSearchParams({startDate:ee.start,endDate:ee.end}),t=await fetch(`/api/dashboard/restaurant/${q.restaurantId}/reports-summary?${r.toString()}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();e.success&&(ve(e.data),se([]))}}catch(r){console.error("\u274c Error fetching reports summary:",r)}finally{de(!1)}}},[null===q||void 0===q?void 0:q.restaurantId,ee.start,ee.end]);(0,n.useEffect)(()=>{De()},[De]),(0,n.useEffect)(()=>{Me()},[Me]);const Oe=(0,n.useMemo)(()=>{var e;if(null===ge||void 0===ge||!ge.hourlySales)return[];const r=(null===(e=ge.summary)||void 0===e?void 0:e.totalOrders)||1;return ge.hourlySales.filter(e=>e.orders>0).map(e=>{const t=e.hour;return{time:`${t.toString().padStart(2,"0")}:00-${((t+1)%24).toString().padStart(2,"0")}:00`,orders:e.orders,revenue:Math.round(e.revenue),efficiency:Math.min(100,Math.round(e.orders/(r/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[ge]),Ie={cash:"Cash",card:"Credit/Debit Card",ewallet:"E-Wallet",bank_transfer:"Bank Transfer",qr:"QR Payment",counter:"Pay at Counter",online:"Online Payment",fpx:"FPX Online Banking",points:"Points"},Te={visa:"Visa",master:"Mastercard",amex:"Amex",other:"Other"},Re=(0,n.useMemo)(()=>null!==ge&&void 0!==ge&&ge.paymentMethodSales?ge.paymentMethodSales.sort((e,r)=>r.revenue-e.revenue):[],[ge]),Pe=(0,n.useMemo)(()=>null!==ge&&void 0!==ge&&ge.cardTypeSales?"all"===me?ge.cardTypeSales:ge.cardTypeSales.filter(e=>e.type===me):[],[ge,me]),ze=(0,n.useMemo)(()=>null!==ge&&void 0!==ge&&ge.cardTypeSales?ge.cardTypeSales.map(e=>e.type):[],[ge]),_e=(0,n.useMemo)(()=>(null===ge||void 0===ge?void 0:ge.staffMeal)||{revenue:0,orders:0},[ge]),Le=(0,n.useMemo)(()=>Re.reduce((e,r)=>e+r.revenue,0),[Re]),We=(0,n.useMemo)(()=>{if(null===ge||void 0===ge||!ge.dailySales||0===ge.dailySales.length)return{};const e={};return ge.dailySales.forEach(r=>{const[t,n]=r.date.split("-"),s=`${t}-${n}`,i=r.date;e[t]||(e[t]={year:t,revenue:0,orders:0,months:{}}),e[t].months[s]||(e[t].months[s]={month:s,revenue:0,orders:0,days:{}}),e[t].months[s].days[i]||(e[t].months[s].days[i]={day:i,revenue:0,orders:0});const o=r.revenue,l=r.orders;e[t].revenue+=o,e[t].orders+=l,e[t].months[s].revenue+=o,e[t].months[s].orders+=l,e[t].months[s].days[i].revenue+=o,e[t].months[s].days[i].orders+=l}),e},[ge]),Ne=()=>{const e=new Date(ee.start),r=new Date(ee.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(()=>{const e=Ne()})();n.useEffect(()=>{const e=Ne();if(e<=31){const e=new Set(Object.keys(We)),r=new Set;Object.keys(We).forEach(e=>{Object.keys(We[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),fe(e),be(r)}else if(e<=365){const e=new Set(Object.keys(We));fe(e),be(new Set)}else fe(new Set),be(new Set)},[ee.start,ee.end,Se]);const He=e=>{X(e),ne(!1),re((0,C.x)(e,G.timeZone))},Ue=(e,r)=>{ne(!0),X("all"),re({start:e,end:r})},Ye=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e.toFixed(r)},Ke=(0,n.useCallback)(()=>{const e=["Date,Revenue"];return ke.forEach(r=>{e.push(`${h(r.date)},${Ye(r.sales)}`)}),e.join("\n")},[ke]),Ve=(0,n.useCallback)(()=>{const e=["Date,Revenue,Orders,Avg_Order_Value"];return Object.keys(We).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=We[r];Object.keys(t.months).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const n=t.months[r];Object.keys(n.days).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=n.days[r],s=t.orders>0?t.revenue/t.orders:0;e.push(`${r},${Ye(t.revenue)},${t.orders},${Ye(s)}`)})})}),e.join("\n")},[We]),qe=(0,n.useCallback)(()=>{const e=["Rank,Item_Name,Category,Unit_Price,Qty_Sold,Revenue"];return Ae.forEach((r,t)=>{e.push(x([t+1,r.name,r.category,Ye(r.price),r.orders,Ye(r.revenue)]))}),e.join("\n")},[Ae]),Ge=(0,n.useCallback)(()=>{const e=["Rank,Name,Phone,Type,Total_Orders,Total_Spent,Points,Tier"];return[...Ee].sort((e,r)=>(r.period_spent||0)-(e.period_spent||0)).forEach((r,t)=>{var n,s,i;e.push(x([t+1,(null===(n=r.customer)||void 0===n?void 0:n.name)||"Guest",(null===(s=r.customer)||void 0===s?void 0:s.phone)||"-","member"===(null===(i=r.customer)||void 0===i?void 0:i.type)?"Member":"Guest",r.period_orders||0,Ye(r.period_spent||0),r.points||0,r.loyalty_tier||"Bronze"]))}),e.join("\n")},[Ee]),Je=(0,n.useCallback)(()=>{const e=["Time_Slot,Orders,Revenue"];return Oe.forEach(r=>{e.push(x([r.time,r.orders,Ye(r.revenue)]))}),e.join("\n")},[Oe]),Qe=(0,n.useCallback)(()=>{const e=["Payment_Method,Orders,Revenue,Percentage"];return Re.forEach(r=>{const t=Le>0?(r.revenue/Le*100).toFixed(1):"0.0";e.push(x([Ie[r.method]||r.method,r.orders,Ye(r.revenue),`${t}%`]))}),Pe.length>0&&(e.push(""),e.push("Card_Type,Orders,Revenue"),Pe.forEach(r=>{e.push(x([Te[r.type]||r.type,r.orders,Ye(r.revenue)]))})),_e.orders>0&&(e.push(""),e.push("Staff_Meal,Orders,Amount"),e.push(x(["Staff Meal (Excluded from revenue)",_e.orders,Ye(_e.revenue)]))),e.join("\n")},[Re,Pe,_e,Le]),Ze=(0,n.useCallback)(()=>{let e;switch(J){case"sales":default:e=Ke();break;case"details":e=Ve();break;case"menu":e=qe();break;case"customers":e=Ge();break;case"operations":e=Je();break;case"payment":e=Qe()}var r,t,n,s,i,o;((e,r)=>{const t=new Blob(["\ufeff"+e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(t),s=document.createElement("a");s.setAttribute("href",n),s.setAttribute("download",r),s.style.visibility="hidden",s.style.position="absolute",s.style.left="-9999px",document.body.appendChild(s),s.click(),setTimeout(()=>{URL.revokeObjectURL(n),document.body.removeChild(s)},150)})(e,(r=`purplepos_${(null===q||void 0===q?void 0:q.restaurantId)||"report"}`,t=J,n=Z,s=te,i=ee.start,o=ee.end,`${r}_${t}_${s?`${i}_${o}`:n}_${(new Date).toISOString().split("T")[0]}.csv`))},[J,Z,te,ee,null===q||void 0===q?void 0:q.restaurantId,Ke,Ve,qe,Ge,Je,Qe]),Xe=()=>(0,A.jsx)(C.A,{activePeriod:Z,dateRange:ee,isCustomDateRange:te,onPeriodChange:He,onCalendarRangeSelect:Ue,children:(0,A.jsxs)("button",{onClick:Ze,style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",background:"#F6F9FC",color:"#0A2540",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"14px",marginLeft:"auto"},children:[(0,A.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,A.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})});return(0,A.jsx)(A.Fragment,{children:(0,A.jsxs)($,{children:[(0,A.jsx)(S.Ay,{title:"Reports"}),(0,A.jsxs)(E,{children:[(0,A.jsxs)(o.tU,{children:[(0,A.jsx)(o.oz,{active:"sales"===J,onClick:()=>Q("sales"),children:"Sales Report"}),(0,A.jsx)(o.oz,{active:"details"===J,onClick:()=>Q("details"),children:"Sales Details"}),(0,A.jsx)(o.oz,{active:"menu"===J,onClick:()=>Q("menu"),children:"Menu Analysis"}),(0,A.jsx)(o.oz,{active:"customers"===J,onClick:()=>Q("customers"),children:"Customer Insights"}),(0,A.jsx)(o.oz,{active:"operations"===J,onClick:()=>Q("operations"),children:"Operations"}),(0,A.jsx)(o.oz,{active:"payment"===J,onClick:()=>Q("payment"),children:"Payment Analysis"})]}),(0,A.jsxs)("div",{style:{display:"sales"===J?"block":"none"},children:[(0,A.jsx)(Xe,{}),ie||le?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Se?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,A.jsxs)("div",{children:[(0,A.jsxs)(B,{children:[(0,A.jsxs)(i.hI,{color:"#059669",children:[(0,A.jsx)(i.v0,{children:"Total Revenue"}),(0,A.jsx)(i.Os,{children:(0,c.vv)(we,G.currency)}),(0,A.jsxs)(i.d1,{children:[Se," orders in selected period"]})]}),(0,A.jsxs)(i.hI,{color:"#2563EB",children:[(0,A.jsx)(i.v0,{children:"Total Orders"}),(0,A.jsx)(i.Os,{children:Se.toLocaleString()}),(0,A.jsx)(i.d1,{children:"For selected period"})]}),(0,A.jsxs)(i.hI,{color:"#DC2626",children:[(0,A.jsx)(i.v0,{children:"Average Order Value"}),(0,A.jsx)(i.Os,{children:(0,c.vv)(Se>0?we/Se:0,G.currency)}),(0,A.jsx)(i.d1,{children:"Per order"})]}),(0,A.jsxs)(i.hI,{color:"#7C3AED",children:[(0,A.jsx)(i.v0,{children:"Completed Orders"}),(0,A.jsx)(i.Os,{children:Se}),(0,A.jsx)(i.d1,{children:"100% completion rate"})]})]}),(0,A.jsxs)(D,{children:[(0,A.jsxs)(M,{children:[(0,A.jsx)(O,{children:"Revenue Trend"}),(0,A.jsx)(u.u,{width:"100%",height:300,children:(0,A.jsxs)(p.b,{data:ke,margin:{top:5,right:20,left:0,bottom:5},children:[(0,A.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,A.jsx)(v.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,A.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,A.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,A.jsx)(y.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,A.jsxs)(M,{children:[(0,A.jsx)(O,{children:"Sales by Category"}),(0,A.jsx)(u.u,{width:"100%",height:300,children:(0,A.jsxs)(f.r,{children:[(0,A.jsx)(F.F,{data:Ce,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Ce.map((e,r)=>(0,A.jsx)(b.f,{fill:Y[r%Y.length]},`cell-${r}`))}),(0,A.jsx)(j.m,{formatter:e=>`${e}%`})]})})]})]}),(0,A.jsxs)(M,{children:[(0,A.jsx)(O,{children:"Hourly Orders Distribution"}),(0,A.jsx)(u.u,{width:"100%",height:250,children:(0,A.jsxs)(k.E,{data:$e,margin:{top:5,right:20,left:0,bottom:5},children:[(0,A.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,A.jsx)(v.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,A.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,A.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,A.jsx)(w.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,A.jsxs)("div",{style:{display:"details"===J?"block":"none"},children:[(0,A.jsx)(Xe,{}),ie||le?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Se?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,A.jsxs)("div",{children:[(0,A.jsxs)(B,{children:[(0,A.jsxs)(i.hI,{color:"#059669",children:[(0,A.jsx)(i.v0,{children:"Total Revenue"}),(0,A.jsx)(i.Os,{children:(0,c.vv)(we,G.currency)}),(0,A.jsxs)(i.d1,{children:[Se," orders in selected period"]})]}),(0,A.jsxs)(i.hI,{color:"#2563EB",children:[(0,A.jsx)(i.v0,{children:"Total Orders"}),(0,A.jsx)(i.Os,{children:Se.toLocaleString()}),(0,A.jsxs)(i.d1,{children:[Se," completed"]})]}),(0,A.jsxs)(i.hI,{color:"#DC2626",children:[(0,A.jsx)(i.v0,{children:"Average Order Value"}),(0,A.jsx)(i.Os,{children:(0,c.vv)(Se>0?we/Se:0,G.currency)}),(0,A.jsx)(i.d1,{children:"Per order average"})]}),(0,A.jsxs)(i.hI,{color:"#7C3AED",children:[(0,A.jsx)(i.v0,{children:"Period"}),(0,A.jsx)(i.Os,{children:te?Ne():"today"===Z?"1":"week"===Z?"7":"month"===Z?"30":"year"===Z?"365":Ne()}),(0,A.jsx)(i.d1,{children:te?`${ee.start} to ${ee.end}`:"today"===Z?"Day":"Days"})]})]}),(0,A.jsxs)(I,{children:[(0,A.jsxs)(O,{children:["Detailed Sales Breakdown (",te?`${ee.start} to ${ee.end}`:Z,")"]}),(0,A.jsxs)(T,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(R,{style:{width:"40%"},children:"Period"}),(0,A.jsx)(R,{style:{textAlign:"right"},children:"Revenue"}),(0,A.jsx)(R,{style:{textAlign:"right"},children:"Orders"}),(0,A.jsx)(R,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,A.jsx)("tbody",{children:Object.keys(We).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=We[e],t=ye.has(e);return(0,A.jsxs)(n.Fragment,{children:[(0,A.jsxs)(_,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(ye);if(r.has(e)){var t;r.delete(e);const n=new Set(Fe);Object.keys((null===(t=We[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{n.delete(`${e}-${r}`)}),be(n)}else r.add(e);fe(r)})(e),children:[(0,A.jsxs)(L,{level:0,bold:!0,children:[(0,A.jsx)(W,{expanded:t,children:"\u25b6"}),e]}),(0,A.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue,G.currency)}),(0,A.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,A.jsx)(L,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,G.currency)})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const s=r.months[t],i=`${e}-${t}`,o=Fe.has(i),l=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,A.jsxs)(n.Fragment,{children:[(0,A.jsxs)(_,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set(Fe);r.has(e)?r.delete(e):r.add(e),be(r)})(i),children:[(0,A.jsxs)(L,{level:1,bold:!0,children:[(0,A.jsx)(W,{expanded:o,children:"\u25b6"}),l]}),(0,A.jsx)(L,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue,G.currency)}),(0,A.jsx)(L,{level:1,style:{textAlign:"right"},children:s.orders}),(0,A.jsx)(L,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue/s.orders,G.currency)})]}),o&&Object.keys(s.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=s.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,A.jsxs)(_,{level:2,children:[(0,A.jsx)(L,{level:2,children:t}),(0,A.jsx)(L,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(r.revenue,G.currency)}),(0,A.jsx)(L,{level:2,style:{textAlign:"right"},children:r.orders}),(0,A.jsx)(L,{level:2,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,G.currency)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,A.jsxs)("div",{style:{display:"menu"===J?"block":"none"},children:[(0,A.jsx)(Xe,{}),(0,A.jsxs)(B,{children:[(0,A.jsxs)(i.hI,{color:"#F59E0B",children:[(0,A.jsx)(i.v0,{children:"Best Seller"}),(0,A.jsx)(i.Os,{children:(null===(e=Ae[0])||void 0===e?void 0:e.name)||"N/A"}),(0,A.jsxs)(i.d1,{children:[(null===(r=Ae[0])||void 0===r?void 0:r.orders)||0," sold in selected period"]})]}),(0,A.jsxs)(i.hI,{color:"#10B981",children:[(0,A.jsx)(i.v0,{children:"Menu Items"}),(0,A.jsx)(i.Os,{children:Ae.length}),(0,A.jsx)(i.d1,{children:"Items with sales"})]}),(0,A.jsxs)(i.hI,{color:"#3B82F6",children:[(0,A.jsx)(i.v0,{children:"Items Sold"}),(0,A.jsx)(i.Os,{children:Ae.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,A.jsx)(i.d1,{children:"Total quantity sold"})]}),(0,A.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,A.jsx)(i.v0,{children:"Total Revenue"}),(0,A.jsx)(i.Os,{children:(0,c.vv)(Ae.reduce((e,r)=>e+r.revenue,0),G.currency)}),(0,A.jsx)(i.d1,{children:"For selected period"})]})]}),(0,A.jsxs)(I,{children:[(0,A.jsxs)(O,{children:["Complete Menu Performance Ranking (",te?`${ee.start} to ${ee.end}`:Z,")"]}),(0,A.jsxs)(T,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(R,{children:"Rank"}),(0,A.jsx)(R,{children:"Menu Item"}),(0,A.jsx)(R,{children:"Category"}),(0,A.jsx)(R,{children:"Price"}),(0,A.jsx)(R,{children:"Qty Sold"}),(0,A.jsx)(R,{children:"Revenue"}),(0,A.jsx)(R,{children:"Performance"})]})}),(0,A.jsx)("tbody",{children:Ae.map((e,r)=>{var t;const n=(null===(t=Ae[0])||void 0===t?void 0:t.orders)||1;return(0,A.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,A.jsxs)(P,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,A.jsx)(P,{style:{fontWeight:600},children:e.name}),(0,A.jsx)(P,{children:(0,A.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,A.jsx)(P,{children:(0,c.vv)(e.price,G.currency)}),(0,A.jsx)(P,{children:e.orders.toLocaleString()}),(0,A.jsx)(P,{children:(0,c.vv)(e.revenue,G.currency)}),(0,A.jsx)(P,{children:(0,A.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,A.jsx)(z,{percentage:e.orders/n*100}),(0,A.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},r)})})]})]})]}),(0,A.jsxs)("div",{style:{display:"customers"===J?"block":"none"},children:[(0,A.jsx)(Xe,{}),ie||le?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading customer data..."}):0===Ee.length?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No customers with orders in the selected period"}):(0,A.jsxs)("div",{children:[(0,A.jsxs)(B,{children:[(0,A.jsxs)(i.hI,{color:"#635BFF",children:[(0,A.jsx)(i.v0,{children:"Active Customers"}),(0,A.jsx)(i.Os,{children:Ee.length.toLocaleString()}),(0,A.jsxs)(i.d1,{children:[Ee.filter(e=>{var r;return"member"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," members, ",Ee.filter(e=>{var r;return"guest"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," guests"]})]}),(0,A.jsxs)(i.hI,{color:"#00D924",children:[(0,A.jsx)(i.v0,{children:"Repeat Customers"}),(0,A.jsx)(i.Os,{children:Ee.filter(e=>e.period_orders>1).length}),(0,A.jsxs)(i.d1,{children:[Ee.length>0?Math.round(Ee.filter(e=>e.period_orders>1).length/Ee.length*100):0,"% ordered multiple times"]})]}),(0,A.jsxs)(i.hI,{color:"#FFB800",children:[(0,A.jsx)(i.v0,{children:"Average Spent"}),(0,A.jsx)(i.Os,{children:(0,c.vv)(Ee.length>0?Ee.reduce((e,r)=>e+(r.period_spent||0),0)/Ee.length:0,G.currency)}),(0,A.jsx)(i.d1,{children:"Per customer in period"})]}),(0,A.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,A.jsx)(i.v0,{children:"Period Revenue"}),(0,A.jsx)(i.Os,{children:(0,c.vv)(Ee.reduce((e,r)=>e+(r.period_spent||0),0),G.currency)}),(0,A.jsxs)(i.d1,{children:["From ",Ee.length," customers"]})]})]}),(0,A.jsxs)(I,{children:[(0,A.jsxs)(O,{children:["Top Customers (",te?`${ee.start} to ${ee.end}`:Z,")"]}),(0,A.jsxs)(T,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(R,{children:"Rank"}),(0,A.jsx)(R,{children:"Name"}),(0,A.jsx)(R,{children:"Phone"}),(0,A.jsx)(R,{children:"Type"}),(0,A.jsx)(R,{children:"Period Orders"}),(0,A.jsx)(R,{children:"Period Spent"}),(0,A.jsx)(R,{children:"Total Points"}),(0,A.jsx)(R,{children:"Tier"})]})}),(0,A.jsx)("tbody",{children:Ee.slice(0,20).map((e,r)=>{var t,n,s,i,o,l;return(0,A.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,A.jsxs)(P,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,A.jsx)(P,{style:{fontWeight:600},children:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Guest"}),(0,A.jsx)(P,{children:(null===(s=e.customer)||void 0===s?void 0:s.phone)||"-"}),(0,A.jsx)(P,{children:(0,A.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"member"===(null===(i=e.customer)||void 0===i?void 0:i.type)?"#E0F2FE":"#F3F4F6",color:"member"===(null===(o=e.customer)||void 0===o?void 0:o.type)?"#0369A1":"#6B7280"},children:"member"===(null===(l=e.customer)||void 0===l?void 0:l.type)?"Member":"Guest"})}),(0,A.jsx)(P,{children:e.period_orders||0}),(0,A.jsx)(P,{children:(0,c.vv)(e.period_spent||0,G.currency)}),(0,A.jsx)(P,{children:e.points||0}),(0,A.jsx)(P,{children:(0,A.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"VIP"===e.loyalty_tier?"#FEF3C7":"Gold"===e.loyalty_tier?"#FEF9C3":"Silver"===e.loyalty_tier?"#F3F4F6":"#E5E7EB",color:"VIP"===e.loyalty_tier?"#92400E":"Gold"===e.loyalty_tier?"#854D0E":"#6B7280"},children:e.loyalty_tier||"Bronze"})})]},(null===(t=e.customer)||void 0===t?void 0:t.id)||r)})})]})]})]})]}),(0,A.jsxs)("div",{style:{display:"operations"===J?"block":"none"},children:[(0,A.jsx)(Xe,{}),ie||le?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading operations data..."}):0===Se?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,A.jsxs)("div",{children:[(0,A.jsxs)(B,{children:[(0,A.jsxs)(i.hI,{color:"#10B981",children:[(0,A.jsx)(i.v0,{children:"Completed Orders"}),(0,A.jsx)(i.Os,{children:Se.toLocaleString()}),(0,A.jsxs)(i.d1,{children:[Be.completionRate,"% fulfillment rate"]})]}),(0,A.jsxs)(i.hI,{color:"#F59E0B",children:[(0,A.jsx)(i.v0,{children:"Avg. Prep Time"}),(0,A.jsx)(i.Os,{children:Be.avgPrepTime>0?`${Be.avgPrepTime} min`:"N/A"}),(0,A.jsx)(i.d1,{children:Be.avgPrepTime>0?"Order to served":"No timing data"})]}),(0,A.jsxs)(i.hI,{color:"#EF4444",children:[(0,A.jsx)(i.v0,{children:"Peak Hour"}),(0,A.jsx)(i.Os,{children:Be.peakHour}),(0,A.jsxs)(i.d1,{children:[Be.peakHourOrders," orders in this slot"]})]}),(0,A.jsxs)(i.hI,{color:"#6366F1",children:[(0,A.jsx)(i.v0,{children:"Orders per Day"}),(0,A.jsx)(i.Os,{children:(()=>{const e=Math.max(1,Math.ceil((new Date(ee.end).getTime()-new Date(ee.start).getTime())/864e5)+1);return Math.round(Se/e)})()}),(0,A.jsx)(i.d1,{children:"Average daily orders"})]})]}),(0,A.jsxs)(I,{children:[(0,A.jsxs)(O,{children:["Peak Hours Performance (",te?`${ee.start} to ${ee.end}`:Z,")"]}),(0,A.jsxs)(T,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(R,{children:"Time Slot"}),(0,A.jsx)(R,{children:"Orders"}),(0,A.jsx)(R,{children:"Revenue"}),(0,A.jsx)(R,{children:"Share"})]})}),(0,A.jsx)("tbody",{children:0===Oe.length?(0,A.jsx)("tr",{children:(0,A.jsx)(P,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No peak hours data available"})}):Oe.map((e,r)=>(0,A.jsxs)("tr",{style:{backgroundColor:0===r?"#FEF3C7":"transparent"},children:[(0,A.jsxs)(P,{style:{fontWeight:600},children:[0===r&&"\ud83d\udd25 ",e.time]}),(0,A.jsx)(P,{children:e.orders}),(0,A.jsx)(P,{children:(0,c.vv)(e.revenue,G.currency)}),(0,A.jsx)(P,{children:(0,A.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,A.jsx)(z,{percentage:Se>0?e.orders/Se*100:0}),(0,A.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[Se>0?Math.round(e.orders/Se*100):0,"%"]})]})})]},r))})]})]}),(0,A.jsxs)(M,{style:{marginTop:"24px"},children:[(0,A.jsx)(O,{children:"Hourly Order Distribution"}),(0,A.jsx)(u.u,{width:"100%",height:250,children:(0,A.jsxs)(k.E,{data:$e,margin:{top:5,right:20,left:0,bottom:5},children:[(0,A.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,A.jsx)(v.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,A.jsx)(m.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,A.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,A.jsx)(w.y,{dataKey:"orders",fill:"#6366F1",radius:[4,4,0,0]})]})})]})]})]}),(0,A.jsxs)("div",{style:{display:"payment"===J?"block":"none"},children:[(0,A.jsx)(Xe,{}),ie||le?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading payment data..."}):0===Se?(0,A.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,A.jsxs)("div",{children:[_e.orders>0&&(0,A.jsxs)(U,{children:[(0,A.jsxs)("div",{children:[(0,A.jsx)("div",{style:{fontWeight:600,color:"#9A3412",marginBottom:"4px"},children:"Staff Meal (Excluded from Revenue)"}),(0,A.jsx)("div",{style:{fontSize:"13px",color:"#C2410C"},children:"These orders are not included in the revenue figures below"})]}),(0,A.jsxs)("div",{style:{display:"flex",gap:"24px",alignItems:"center"},children:[(0,A.jsxs)("div",{style:{textAlign:"center"},children:[(0,A.jsx)("div",{style:{fontSize:"20px",fontWeight:700,color:"#9A3412"},children:_e.orders}),(0,A.jsx)("div",{style:{fontSize:"11px",color:"#C2410C"},children:"Orders"})]}),(0,A.jsxs)("div",{style:{textAlign:"center"},children:[(0,A.jsx)("div",{style:{fontSize:"20px",fontWeight:700,color:"#9A3412"},children:(0,c.vv)(_e.revenue,G.currency)}),(0,A.jsx)("div",{style:{fontSize:"11px",color:"#C2410C"},children:"Amount"})]})]})]}),(0,A.jsxs)(B,{children:[(0,A.jsxs)(i.hI,{color:"#059669",children:[(0,A.jsx)(i.v0,{children:"Total Revenue"}),(0,A.jsx)(i.Os,{children:(0,c.vv)(Le,G.currency)}),(0,A.jsxs)(i.d1,{children:[Re.reduce((e,r)=>e+r.orders,0)," orders"]})]}),(0,A.jsxs)(i.hI,{color:"#2563EB",children:[(0,A.jsx)(i.v0,{children:"Payment Methods Used"}),(0,A.jsx)(i.Os,{children:Re.length}),(0,A.jsx)(i.d1,{children:"Active methods in period"})]}),(0,A.jsxs)(i.hI,{color:"#7C3AED",children:[(0,A.jsx)(i.v0,{children:"Card Payments"}),(0,A.jsx)(i.Os,{children:(0,c.vv)((null===(t=Re.find(e=>"card"===e.method))||void 0===t?void 0:t.revenue)||0,G.currency)}),(0,A.jsxs)(i.d1,{children:[(null===(s=Re.find(e=>"card"===e.method))||void 0===s?void 0:s.orders)||0," orders"]})]}),(0,A.jsxs)(i.hI,{color:"#DC2626",children:[(0,A.jsx)(i.v0,{children:"Cash Payments"}),(0,A.jsx)(i.Os,{children:(0,c.vv)((null===(K=Re.find(e=>"cash"===e.method))||void 0===K?void 0:K.revenue)||0,G.currency)}),(0,A.jsxs)(i.d1,{children:[(null===(V=Re.find(e=>"cash"===e.method))||void 0===V?void 0:V.orders)||0," orders"]})]})]}),(0,A.jsxs)(D,{children:[(0,A.jsxs)(I,{children:[(0,A.jsx)(O,{children:"Payment Methods Breakdown"}),(0,A.jsxs)(T,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(R,{children:"Payment Method"}),(0,A.jsx)(R,{children:"Orders"}),(0,A.jsx)(R,{children:"Revenue"}),(0,A.jsx)(R,{children:"Share"})]})}),(0,A.jsx)("tbody",{children:0===Re.length?(0,A.jsx)("tr",{children:(0,A.jsx)(P,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No payment data available"})}):Re.map((e,r)=>{const t=Le>0?e.revenue/Le*100:0;return(0,A.jsxs)("tr",{style:{backgroundColor:0===r?"#F0F9FF":"transparent"},children:[(0,A.jsx)(P,{style:{fontWeight:600},children:Ie[e.method]||e.method}),(0,A.jsx)(P,{children:e.orders}),(0,A.jsx)(P,{style:{fontWeight:500},children:(0,c.vv)(e.revenue,G.currency)}),(0,A.jsx)(P,{children:(0,A.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,A.jsx)(z,{percentage:t}),(0,A.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[t.toFixed(1),"%"]})]})})]},e.method)})})]})]}),(0,A.jsxs)(M,{children:[(0,A.jsx)(O,{children:"Payment Distribution"}),(0,A.jsx)(u.u,{width:"100%",height:300,children:(0,A.jsxs)(f.r,{children:[(0,A.jsx)(F.F,{data:Re.map(e=>({name:Ie[e.method]||e.method,value:Math.round(e.revenue)})),cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Re.map((e,r)=>(0,A.jsx)(b.f,{fill:Y[r%Y.length]},`cell-${r}`))}),(0,A.jsx)(j.m,{formatter:e=>(0,c.vv)(Number(e),G.currency)})]})})]})]}),(null===ge||void 0===ge?void 0:ge.cardTypeSales)&&ge.cardTypeSales.length>0&&(0,A.jsxs)(I,{style:{marginTop:"24px"},children:[(0,A.jsx)(O,{children:"Card Type Breakdown"}),(0,A.jsxs)(H,{children:[(0,A.jsx)(N,{active:"all"===me,onClick:()=>je("all"),children:"All"}),["visa","master","amex","other"].map(e=>ze.includes(e)&&(0,A.jsx)(N,{active:me===e,onClick:()=>je(e),children:Te[e]||e},e))]}),(0,A.jsxs)(T,{children:[(0,A.jsx)("thead",{children:(0,A.jsxs)("tr",{children:[(0,A.jsx)(R,{children:"Card Type"}),(0,A.jsx)(R,{children:"Orders"}),(0,A.jsx)(R,{children:"Revenue"}),(0,A.jsx)(R,{children:"Share of Card Payments"})]})}),(0,A.jsx)("tbody",{children:0===Pe.length?(0,A.jsx)("tr",{children:(0,A.jsx)(P,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No card type data for selected filter"})}):Pe.map((e,r)=>{const t=ge.cardTypeSales.reduce((e,r)=>e+r.revenue,0),n=t>0?e.revenue/t*100:0;return(0,A.jsxs)("tr",{style:{backgroundColor:0===r?"#F5F3FF":"transparent"},children:[(0,A.jsx)(P,{style:{fontWeight:600},children:Te[e.type]||e.type}),(0,A.jsx)(P,{children:e.orders}),(0,A.jsx)(P,{style:{fontWeight:500},children:(0,c.vv)(e.revenue,G.currency)}),(0,A.jsx)(P,{children:(0,A.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,A.jsx)(z,{percentage:n}),(0,A.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[n.toFixed(1),"%"]})]})})]},e.type)})})]})]})]})]})]})]})})}},8012:(e,r,t)=>{t.d(r,{Ay:()=>d});t(9950);var n=t(4752),s=t(4414);const i=n.Ay.div`
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
`,o=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,l=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,d=e=>{let{title:r,children:t}=e;return(0,s.jsxs)(i,{children:[(0,s.jsx)(o,{children:r}),t&&(0,s.jsx)(l,{children:t})]})}}}]);