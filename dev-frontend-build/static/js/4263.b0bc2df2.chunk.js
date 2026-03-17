"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4263],{512:(e,r,t)=>{t.d(r,{x:()=>E,A:()=>T});var n=t(9950),s=t(4752),i=t(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],l=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,a=e=>{if(!e)return null;const[r,t,n]=e.split("-").map(Number);return new Date(r,t-1,n)},d=(e,r)=>e.getFullYear()===r.getFullYear()&&e.getMonth()===r.getMonth()&&e.getDate()===r.getDate(),c=(e,r)=>new Date(e,r).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=s.Ay.div`
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
`,A=e=>{let{startDate:r,endDate:t,onRangeSelect:s,onClose:A,isOpen:$}=e;const E=new Date,[B,M]=(0,n.useState)(E.getMonth()),[D,O]=(0,n.useState)(E.getFullYear()),[I,T]=(0,n.useState)(null),[R,P]=(0,n.useState)(null),[z,_]=(0,n.useState)(null),[L,W]=(0,n.useState)("start"),N=(0,n.useRef)(null);(0,n.useEffect)(()=>{r&&T(a(r)),t&&P(a(t))},[r,t]),(0,n.useEffect)(()=>{$&&W("start")},[$]),(0,n.useEffect)(()=>{const e=e=>{N.current&&!N.current.contains(e.target)&&A()};return $&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[$,A]);const H=(0,n.useCallback)(()=>{0===B?(M(11),O(e=>e-1)):M(e=>e-1)},[B]),U=(0,n.useCallback)(()=>{11===B?(M(0),O(e=>e+1)):M(e=>e+1)},[B]),V=(e,r)=>{const t=((e,r)=>new Date(e,r+1,0).getDate())(e,r),n=((e,r)=>new Date(e,r,1).getDay())(e,r),a=[];for(let s=0;s<n;s++)a.push(null);for(let s=1;s<=t;s++)a.push(new Date(e,r,s));return(0,i.jsxs)(f,{children:[(0,i.jsx)(F,{children:c(e,r)}),(0,i.jsx)(b,{children:o.map(e=>(0,i.jsx)(k,{children:e},e))}),(0,i.jsx)(w,{children:a.map((e,r)=>{if(!e)return(0,i.jsx)(S,{},`e-${r}`);const{isStart:t,isEnd:n,isInRange:o,isHoverEnd:a}=(e=>{const r=I&&d(e,I),t=R&&d(e,R),n="end"===L&&z?z:R;let s=!1;if(I&&n){const[r,t]=I<=n?[I,n]:[n,I];s=((e,r,t)=>{const n=e.getTime();return n>r.getTime()&&n<t.getTime()})(e,r,t)}return{isStart:r,isEnd:t,isInRange:s,isHoverEnd:"end"===L&&z&&d(e,z)}})(e),c=d(e,E);return(0,i.jsx)(C,{$isStart:!!t,$isEnd:!!n,$isInRange:o,$isHoverEnd:!!a,$isToday:c,onClick:()=>(e=>{if("start"===L)T(e),P(null),W("end");else{let r=I,t=e;t<r&&([r,t]=[t,r]),T(r),P(t),W("start"),s(l(r),l(t)),setTimeout(A,200)}})(e),onMouseEnter:()=>_(e),onMouseLeave:()=>_(null),children:e.getDate()},e.getTime())})})]})},Y=11===B?0:B+1,q=11===B?D+1:D,K=e=>{const r=new Date;let t;const n=r;switch(e){case"this_week":t=new Date(r),t.setDate(r.getDate()-r.getDay());break;case"this_month":t=new Date(r.getFullYear(),r.getMonth(),1);break;case"this_year":t=new Date(r.getFullYear(),0,1);break;default:return}T(t),P(n),W("start"),s(l(t),l(n)),setTimeout(A,150)};return $?(0,i.jsx)(h,{ref:N,children:(0,i.jsxs)(x,{children:[(0,i.jsxs)(u,{children:[(0,i.jsx)(p,{onClick:()=>K("this_week"),children:"This Week"}),(0,i.jsx)(p,{onClick:()=>K("this_month"),children:"This Month"}),(0,i.jsx)(p,{onClick:()=>K("this_year"),children:"This Year"})]}),(0,i.jsxs)(g,{children:[(0,i.jsxs)(v,{children:[(0,i.jsx)(m,{onClick:H,"aria-label":"Previous month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,i.jsx)(m,{onClick:U,"aria-label":"Next month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,i.jsxs)(j,{children:[V(D,B),(0,i.jsx)(y,{children:V(q,Y)})]})]})]})}):null},$=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,E=(e,r)=>{const t=(e=>{if(!e)return new Date;try{const r=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[t,n,s]=r.split("-").map(Number);return new Date(t,n-1,s)}catch{return new Date}})(r);let n=new Date(t);const s=new Date(t);switch(e){case"today":break;case"week":n.setDate(t.getDate()-6);break;case"month":n.setDate(t.getDate()-29);break;case"year":n.setDate(t.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:$(n),end:$(s)}},B=s.Ay.div`
  margin-bottom: 24px;
`,M=s.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,D=s.Ay.button`
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
`,T=e=>{let{activePeriod:r,dateRange:t,isCustomDateRange:s,onPeriodChange:o,onCalendarRangeSelect:l,includeToday:a=!1,children:d}=e;const[c,h]=(0,n.useState)(!1),x=a?["today","week","month","year","all"]:["week","month","year","all"],u={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,i.jsx)(B,{children:(0,i.jsxs)(M,{children:[x.map(e=>(0,i.jsx)(D,{active:r===e&&!s,onClick:()=>o(e),children:u[e]},e)),(0,i.jsxs)(O,{children:[(0,i.jsxs)(I,{active:s,onClick:()=>h(!c),children:[(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,i.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,i.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,i.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),t.start&&t.end?`${t.start} ~ ${t.end}`:"Custom Range"]}),(0,i.jsx)(A,{isOpen:c,startDate:t.start,endDate:t.end,onRangeSelect:(e,r)=>{l(e,r),h(!1)},onClose:()=>h(!1)})]}),d]})})}},2597:(e,r,t)=>{t.d(r,{Ex:()=>c,oz:()=>d,tU:()=>a});t(9950);var n=t(4752),s=t(4414);const i=n.Ay.div`
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
`,a=e=>{let{children:r,className:t,style:n}=e;return(0,s.jsx)(i,{className:t,style:n,children:r})},d=e=>{let{active:r,onClick:t,children:n,className:i}=e;return(0,s.jsx)(o,{active:r,onClick:t,className:i,children:n})},c=e=>{let{count:r,variant:t="default",showZero:n=!1}=e;return 0!==r||n?(0,s.jsx)(l,{variant:t,children:r}):null}},2653:(e,r,t)=>{t.d(r,{M:()=>i});var n=t(9950),s=t(4492);function i(e){const[r,t]=(0,s.ok)(),i=(0,n.useCallback)(()=>r.get("tab")||e,[r,e]),[o,l]=(0,n.useState)(i());return[o,(0,n.useCallback)(e=>{l(e),t({tab:e})},[t])]}},4263:(e,r,t)=>{t.r(r),t.d(r,{default:()=>K});var n=t(9950),s=t(4752),i=t(8409),o=t(2597),l=t(2653),a=t(1367),d=t(9018),c=t(6038),h=t(8285);const x=e=>{if(null===e||void 0===e)return"";const r=String(e);return r.includes(",")||r.includes('"')||r.includes("\n")||r.includes("\r")?`"${r.replace(/"/g,'""')}"`:r},u=e=>e.map(x).join(",");var p=t(1095),g=t(2847),v=t(3245),m=t(158),j=t(3440),y=t(2174),f=t(4915),F=t(7621),b=t(5297),k=t(2528),w=t(294),S=t(3588),C=t(8012),A=t(512),$=t(3577),E=t(4414);const B=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,M=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,D=i.MD,O=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,I=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,T=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,R=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,P=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,z=s.Ay.th`
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
`,L=s.Ay.div`
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
`,W=s.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,N=s.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,H=s.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,U=s.Ay.button`
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
`,V=s.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,Y=s.Ay.div`
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
`,q=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],K=()=>{var e,r,t,s,K,G;const{user:Z}=(0,a.As)(),{operationSettings:J,paymentSettings:Q}=(0,d.Pj)(),[X,ee]=(0,l.M)("sales"),[re,te]=(0,n.useState)("month"),[ne,se]=(0,n.useState)(()=>(0,A.x)("month")),[ie,oe]=(0,n.useState)(!1),[,le]=(0,n.useState)([]),[ae,de]=(0,n.useState)(!0),[ce,he]=(0,n.useState)(!1),[xe,ue]=(0,n.useState)(null),[pe,ge]=(0,n.useState)([]),[,ve]=(0,n.useState)([]),[,me]=(0,n.useState)([]),[je,ye]=(0,n.useState)(null),[fe,Fe]=(0,n.useState)(!1),[be,ke]=(0,n.useState)("all"),[we,Se]=(0,n.useState)(new Set),[Ce,Ae]=(0,n.useState)(new Set),$e=(0,n.useMemo)(()=>{if(null===je||void 0===je||!je.dailySales||0===je.dailySales.length)return[];const e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];if("today"===re)return je.hourlySales?je.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{date:12===r?"12PM":r>12?r-12+"PM":0===r?"12AM":`${r}AM`,sales:Math.round(e.revenue)}}):[];if("week"===re)return je.dailySales.map(r=>{const t=new Date(r.date);return{date:e[t.getDay()],sales:Math.round(r.revenue)}});if("month"===re)return je.dailySales.map(e=>{const[,r,t]=e.date.split("-");return{date:`${r}/${t}`,sales:Math.round(e.revenue)}});{const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r={};return je.dailySales.forEach(t=>{const n=parseInt(t.date.split("-")[1])-1,s=e[n];r[s]=(r[s]||0)+t.revenue}),e.map(e=>({date:e,sales:Math.round(r[e]||0)}))}},[je,re]),Ee=(0,n.useMemo)(()=>{var e;return(null===je||void 0===je||null===(e=je.summary)||void 0===e?void 0:e.totalRevenue)||0},[je]),Be=(0,n.useMemo)(()=>{var e;return(null===je||void 0===je||null===(e=je.summary)||void 0===e?void 0:e.totalOrders)||0},[je]),Me=(0,n.useMemo)(()=>{if(null===je||void 0===je||!je.categorySales||0===je.categorySales.length)return[{name:"No Data",value:100,sales:0}];const e=je.categorySales.reduce((e,r)=>e+r.revenue,0);return je.categorySales.map(r=>({name:r.category,value:e>0?Math.round(r.revenue/e*100):0,sales:Math.round(r.revenue)}))},[je]),De=(0,n.useMemo)(()=>{var e;if(null===je||void 0===je||!je.menuSales||0===je.menuSales.length)return[];const r=(null===(e=je.menuSales[0])||void 0===e?void 0:e.quantity)||1;return je.menuSales.map(e=>({name:e.name,category:e.category,price:e.quantity>0?e.revenue/e.quantity:0,orders:e.quantity,revenue:Math.round(e.revenue),performance:Math.round(e.quantity/r*100)}))},[je]),Oe=(0,n.useMemo)(()=>null!==je&&void 0!==je&&je.hourlySales?je.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{hour:0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`,orders:e.orders}}):[],[je]),Ie=(0,n.useMemo)(()=>pe.map(e=>({...e,period_orders:e.total_orders||0,period_spent:e.total_spent||0})).sort((e,r)=>r.period_spent-e.period_spent),[pe]),Te=(0,n.useMemo)(()=>{if(null===je||void 0===je||!je.hourlySales)return{completionRate:0,avgPrepTime:0,peakHour:"N/A",peakHourOrders:0,totalOrdersInPeak:0};let e=12,r=0;je.hourlySales.forEach(t=>{t.orders>r&&(r=t.orders,e=t.hour)});return{completionRate:100,avgPrepTime:0,peakHour:(e=>{const r=(e+1)%24,t=e=>0===e?"12AM":12===e?"12PM":e>12?e-12+"PM":`${e}AM`;return`${t(e)}-${t(r)}`})(e),peakHourOrders:r,totalOrdersInPeak:r}},[je]),Re=(0,n.useCallback)(async()=>{if(null===Z||void 0===Z||!Z.restaurantId)return console.log("\u274c No restaurant ID found"),void de(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void de(!1);const[r,t,n]=await Promise.all([fetch(`/api/dashboard/restaurant/${Z.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/customers/${Z.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/menu?restaurantId=${Z.restaurantId}&excludeImage=true`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})]);if(r.ok){const e=await r.json();ue(e.data||e)}if(t.ok){const e=await t.json();e.success&&Array.isArray(e.data)&&ge(e.data)}if(n.ok){const e=await n.json();e.success&&e.data&&(e.data.items&&ve(e.data.items),e.data.categories&&me(e.data.categories))}}catch(e){console.error("\u274c Error fetching static data:",e)}finally{de(!1)}},[null===Z||void 0===Z?void 0:Z.restaurantId]),Pe=(0,n.useCallback)(async()=>{if(null===Z||void 0===Z||!Z.restaurantId)return;const e=localStorage.getItem("auth_token");if(e){he(!0);try{const r=new URLSearchParams({startDate:ne.start,endDate:ne.end}),t=await fetch(`/api/dashboard/restaurant/${Z.restaurantId}/reports-summary?${r.toString()}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();e.success&&(ye(e.data),le([]))}}catch(r){console.error("\u274c Error fetching reports summary:",r)}finally{he(!1)}}},[null===Z||void 0===Z?void 0:Z.restaurantId,ne.start,ne.end]);(0,n.useEffect)(()=>{Re()},[Re]),(0,n.useEffect)(()=>{Pe()},[Pe]);const ze=(0,n.useMemo)(()=>{var e;if(null===je||void 0===je||!je.hourlySales)return[];const r=(null===(e=je.summary)||void 0===e?void 0:e.totalOrders)||1;return je.hourlySales.filter(e=>e.orders>0).map(e=>{const t=e.hour;return{time:`${t.toString().padStart(2,"0")}:00-${((t+1)%24).toString().padStart(2,"0")}:00`,orders:e.orders,revenue:Math.round(e.revenue),efficiency:Math.min(100,Math.round(e.orders/(r/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[je]),_e=e=>(0,h._M)(e,Q||void 0),Le={visa:"Visa",master:"Mastercard",amex:"Amex",other:"Other"},We=(0,n.useMemo)(()=>null!==je&&void 0!==je&&je.paymentMethodSales?je.paymentMethodSales.sort((e,r)=>r.revenue-e.revenue):[],[je]),Ne=(0,n.useMemo)(()=>null!==je&&void 0!==je&&je.cardTypeSales?"all"===be?je.cardTypeSales:je.cardTypeSales.filter(e=>e.type===be):[],[je,be]),He=(0,n.useMemo)(()=>null!==je&&void 0!==je&&je.cardTypeSales?je.cardTypeSales.map(e=>e.type):[],[je]),Ue=(0,n.useMemo)(()=>(null===je||void 0===je?void 0:je.staffMeal)||{revenue:0,orders:0},[je]),Ve=(0,n.useMemo)(()=>We.reduce((e,r)=>e+r.revenue,0),[We]),Ye=(0,n.useMemo)(()=>{if(null===je||void 0===je||!je.dailySales||0===je.dailySales.length)return{};const e={};return je.dailySales.forEach(r=>{const[t,n]=r.date.split("-"),s=`${t}-${n}`,i=r.date;e[t]||(e[t]={year:t,revenue:0,orders:0,months:{}}),e[t].months[s]||(e[t].months[s]={month:s,revenue:0,orders:0,days:{}}),e[t].months[s].days[i]||(e[t].months[s].days[i]={day:i,revenue:0,orders:0});const o=r.revenue,l=r.orders;e[t].revenue+=o,e[t].orders+=l,e[t].months[s].revenue+=o,e[t].months[s].orders+=l,e[t].months[s].days[i].revenue+=o,e[t].months[s].days[i].orders+=l}),e},[je]),qe=()=>{const e=new Date(ne.start),r=new Date(ne.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(()=>{const e=qe()})();n.useEffect(()=>{const e=qe();if(e<=31){const e=new Set(Object.keys(Ye)),r=new Set;Object.keys(Ye).forEach(e=>{Object.keys(Ye[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),Se(e),Ae(r)}else if(e<=365){const e=new Set(Object.keys(Ye));Se(e),Ae(new Set)}else Se(new Set),Ae(new Set)},[ne.start,ne.end,Be]);const Ke=e=>{te(e),oe(!1),se((0,A.x)(e,J.timeZone))},Ge=(e,r)=>{oe(!0),te("all"),se({start:e,end:r})},Ze=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e.toFixed(r)},Je=(0,n.useCallback)(()=>{const e=["Date,Revenue"];return $e.forEach(r=>{e.push(`${x(r.date)},${Ze(r.sales)}`)}),e.join("\n")},[$e]),Qe=(0,n.useCallback)(()=>{const e=["Date,Revenue,Orders,Avg_Order_Value"];return Object.keys(Ye).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=Ye[r];Object.keys(t.months).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const n=t.months[r];Object.keys(n.days).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=n.days[r],s=t.orders>0?t.revenue/t.orders:0;e.push(`${r},${Ze(t.revenue)},${t.orders},${Ze(s)}`)})})}),e.join("\n")},[Ye]),Xe=(0,n.useCallback)(()=>{const e=["Rank,Item_Name,Category,Unit_Price,Qty_Sold,Revenue"];return De.forEach((r,t)=>{e.push(u([t+1,r.name,r.category,Ze(r.price),r.orders,Ze(r.revenue)]))}),e.join("\n")},[De]),er=(0,n.useCallback)(()=>{const e=["Rank,Name,Phone,Type,Total_Orders,Total_Spent,Points,Tier"];return[...Ie].sort((e,r)=>(r.period_spent||0)-(e.period_spent||0)).forEach((r,t)=>{var n,s,i;e.push(u([t+1,(null===(n=r.customer)||void 0===n?void 0:n.name)||"Guest",(null===(s=r.customer)||void 0===s?void 0:s.phone)||"-","member"===(null===(i=r.customer)||void 0===i?void 0:i.type)?"Member":"Guest",r.period_orders||0,Ze(r.period_spent||0),r.points||0,r.loyalty_tier||"Bronze"]))}),e.join("\n")},[Ie]),rr=(0,n.useCallback)(()=>{const e=["Time_Slot,Orders,Revenue"];return ze.forEach(r=>{e.push(u([r.time,r.orders,Ze(r.revenue)]))}),e.join("\n")},[ze]),tr=(0,n.useCallback)(()=>{const e=["Payment_Method,Orders,Revenue,Percentage"];return We.forEach(r=>{const t=Ve>0?(r.revenue/Ve*100).toFixed(1):"0.0";e.push(u([_e(r.method),r.orders,Ze(r.revenue),`${t}%`]))}),Ne.length>0&&(e.push(""),e.push("Card_Type,Orders,Revenue"),Ne.forEach(r=>{e.push(u([Le[r.type]||r.type,r.orders,Ze(r.revenue)]))})),Ue.orders>0&&(e.push(""),e.push("Staff_Meal,Orders,Amount"),e.push(u(["Staff Meal (Excluded from revenue)",Ue.orders,Ze(Ue.revenue)]))),e.join("\n")},[We,Ne,Ue,Ve]),nr=(0,n.useCallback)(()=>{let e;switch(X){case"sales":default:e=Je();break;case"details":e=Qe();break;case"menu":e=Xe();break;case"customers":e=er();break;case"operations":e=rr();break;case"payment":e=tr()}var r,t,n,s,i,o;((e,r)=>{const t=new Blob(["\ufeff"+e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(t),s=document.createElement("a");s.setAttribute("href",n),s.setAttribute("download",r),s.style.visibility="hidden",s.style.position="absolute",s.style.left="-9999px",document.body.appendChild(s),s.click(),setTimeout(()=>{URL.revokeObjectURL(n),document.body.removeChild(s)},150)})(e,(r=`purplepos_${(null===Z||void 0===Z?void 0:Z.restaurantId)||"report"}`,t=X,n=re,s=ie,i=ne.start,o=ne.end,`${r}_${t}_${s?`${i}_${o}`:n}_${(new Date).toISOString().split("T")[0]}.csv`))},[X,re,ie,ne,null===Z||void 0===Z?void 0:Z.restaurantId,Je,Qe,Xe,er,rr,tr]),sr=()=>(0,E.jsxs)(A.A,{activePeriod:re,dateRange:ne,isCustomDateRange:ie,onPeriodChange:Ke,onCalendarRangeSelect:Ge,children:[(0,E.jsxs)("button",{onClick:nr,style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",background:"#F6F9FC",color:"#0A2540",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"14px",marginLeft:"auto"},children:[(0,E.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,E.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]}),(0,E.jsxs)("button",{onClick:()=>Fe(!0),style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",background:"#F6F9FC",color:"#0A2540",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"14px"},children:[(0,E.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,E.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Daily Settlement"]})]});return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(B,{children:[(0,E.jsx)(C.Ay,{title:"Reports"}),(0,E.jsxs)(M,{children:[(0,E.jsxs)(o.tU,{children:[(0,E.jsx)(o.oz,{active:"sales"===X,onClick:()=>ee("sales"),children:"Sales Report"}),(0,E.jsx)(o.oz,{active:"details"===X,onClick:()=>ee("details"),children:"Sales Details"}),(0,E.jsx)(o.oz,{active:"payment"===X,onClick:()=>ee("payment"),children:"Payment Analysis"}),(0,E.jsx)(o.oz,{active:"menu"===X,onClick:()=>ee("menu"),children:"Menu Analysis"}),(0,E.jsx)(o.oz,{active:"customers"===X,onClick:()=>ee("customers"),children:"Customer Insights"}),(0,E.jsx)(o.oz,{active:"operations"===X,onClick:()=>ee("operations"),children:"Operations"})]}),(0,E.jsxs)("div",{style:{display:"sales"===X?"block":"none"},children:[(0,E.jsx)(sr,{}),ae||ce?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Be?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,E.jsxs)("div",{children:[(0,E.jsxs)(D,{children:[(0,E.jsxs)(i.hI,{color:"#059669",children:[(0,E.jsx)(i.v0,{children:"Total Revenue"}),(0,E.jsx)(i.Os,{children:(0,c.vv)(Ee,J.currency)}),(0,E.jsxs)(i.d1,{children:[Be," orders in selected period"]})]}),(0,E.jsxs)(i.hI,{color:"#2563EB",children:[(0,E.jsx)(i.v0,{children:"Total Orders"}),(0,E.jsx)(i.Os,{children:Be.toLocaleString()}),(0,E.jsx)(i.d1,{children:"For selected period"})]}),(0,E.jsxs)(i.hI,{color:"#DC2626",children:[(0,E.jsx)(i.v0,{children:"Average Order Value"}),(0,E.jsx)(i.Os,{children:(0,c.vv)(Be>0?Ee/Be:0,J.currency)}),(0,E.jsx)(i.d1,{children:"Per order"})]}),(0,E.jsxs)(i.hI,{color:"#7C3AED",children:[(0,E.jsx)(i.v0,{children:"Completed Orders"}),(0,E.jsx)(i.Os,{children:Be}),(0,E.jsx)(i.d1,{children:"100% completion rate"})]})]}),(0,E.jsxs)(O,{children:[(0,E.jsxs)(I,{children:[(0,E.jsx)(T,{children:"Revenue Trend"}),(0,E.jsx)(p.u,{width:"100%",height:300,children:(0,E.jsxs)(g.b,{data:$e,margin:{top:5,right:20,left:0,bottom:5},children:[(0,E.jsx)(v.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,E.jsx)(m.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,E.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,E.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,E.jsx)(f.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,E.jsxs)(I,{children:[(0,E.jsx)(T,{children:"Sales by Category"}),(0,E.jsx)(p.u,{width:"100%",height:300,children:(0,E.jsxs)(F.r,{children:[(0,E.jsx)(b.F,{data:Me,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:Me.map((e,r)=>(0,E.jsx)(k.f,{fill:q[r%q.length]},`cell-${r}`))}),(0,E.jsx)(y.m,{formatter:e=>`${e}%`})]})})]})]}),(0,E.jsxs)(I,{children:[(0,E.jsx)(T,{children:"Hourly Orders Distribution"}),(0,E.jsx)(p.u,{width:"100%",height:250,children:(0,E.jsxs)(w.E,{data:Oe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,E.jsx)(v.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,E.jsx)(m.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,E.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,E.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,E.jsx)(S.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,E.jsxs)("div",{style:{display:"details"===X?"block":"none"},children:[(0,E.jsx)(sr,{}),ae||ce?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Be?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,E.jsxs)("div",{children:[(0,E.jsxs)(D,{children:[(0,E.jsxs)(i.hI,{color:"#059669",children:[(0,E.jsx)(i.v0,{children:"Total Revenue"}),(0,E.jsx)(i.Os,{children:(0,c.vv)(Ee,J.currency)}),(0,E.jsxs)(i.d1,{children:[Be," orders in selected period"]})]}),(0,E.jsxs)(i.hI,{color:"#2563EB",children:[(0,E.jsx)(i.v0,{children:"Total Orders"}),(0,E.jsx)(i.Os,{children:Be.toLocaleString()}),(0,E.jsxs)(i.d1,{children:[Be," completed"]})]}),(0,E.jsxs)(i.hI,{color:"#DC2626",children:[(0,E.jsx)(i.v0,{children:"Average Order Value"}),(0,E.jsx)(i.Os,{children:(0,c.vv)(Be>0?Ee/Be:0,J.currency)}),(0,E.jsx)(i.d1,{children:"Per order average"})]}),(0,E.jsxs)(i.hI,{color:"#7C3AED",children:[(0,E.jsx)(i.v0,{children:"Period"}),(0,E.jsx)(i.Os,{children:ie?qe():"today"===re?"1":"week"===re?"7":"month"===re?"30":"year"===re?"365":qe()}),(0,E.jsx)(i.d1,{children:ie?`${ne.start} to ${ne.end}`:"today"===re?"Day":"Days"})]})]}),(0,E.jsxs)(R,{children:[(0,E.jsxs)(T,{children:["Detailed Sales Breakdown (",ie?`${ne.start} to ${ne.end}`:re,")"]}),(0,E.jsxs)(P,{children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)(z,{style:{width:"40%"},children:"Period"}),(0,E.jsx)(z,{style:{textAlign:"right"},children:"Revenue"}),(0,E.jsx)(z,{style:{textAlign:"right"},children:"Orders"}),(0,E.jsx)(z,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,E.jsx)("tbody",{children:Object.keys(Ye).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=Ye[e],t=we.has(e);return(0,E.jsxs)(n.Fragment,{children:[(0,E.jsxs)(W,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(we);if(r.has(e)){var t;r.delete(e);const n=new Set(Ce);Object.keys((null===(t=Ye[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{n.delete(`${e}-${r}`)}),Ae(n)}else r.add(e);Se(r)})(e),children:[(0,E.jsxs)(N,{level:0,bold:!0,children:[(0,E.jsx)(H,{expanded:t,children:"\u25b6"}),e]}),(0,E.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue,J.currency)}),(0,E.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,E.jsx)(N,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,J.currency)})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const s=r.months[t],i=`${e}-${t}`,o=Ce.has(i),l=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,E.jsxs)(n.Fragment,{children:[(0,E.jsxs)(W,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set(Ce);r.has(e)?r.delete(e):r.add(e),Ae(r)})(i),children:[(0,E.jsxs)(N,{level:1,bold:!0,children:[(0,E.jsx)(H,{expanded:o,children:"\u25b6"}),l]}),(0,E.jsx)(N,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue,J.currency)}),(0,E.jsx)(N,{level:1,style:{textAlign:"right"},children:s.orders}),(0,E.jsx)(N,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue/s.orders,J.currency)})]}),o&&Object.keys(s.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=s.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,E.jsxs)(W,{level:2,children:[(0,E.jsx)(N,{level:2,children:t}),(0,E.jsx)(N,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(r.revenue,J.currency)}),(0,E.jsx)(N,{level:2,style:{textAlign:"right"},children:r.orders}),(0,E.jsx)(N,{level:2,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,J.currency)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,E.jsxs)("div",{style:{display:"menu"===X?"block":"none"},children:[(0,E.jsx)(sr,{}),(0,E.jsxs)(D,{children:[(0,E.jsxs)(i.hI,{color:"#F59E0B",children:[(0,E.jsx)(i.v0,{children:"Best Seller"}),(0,E.jsx)(i.Os,{children:(null===(e=De[0])||void 0===e?void 0:e.name)||"N/A"}),(0,E.jsxs)(i.d1,{children:[(null===(r=De[0])||void 0===r?void 0:r.orders)||0," sold in selected period"]})]}),(0,E.jsxs)(i.hI,{color:"#10B981",children:[(0,E.jsx)(i.v0,{children:"Menu Items"}),(0,E.jsx)(i.Os,{children:De.length}),(0,E.jsx)(i.d1,{children:"Items with sales"})]}),(0,E.jsxs)(i.hI,{color:"#3B82F6",children:[(0,E.jsx)(i.v0,{children:"Items Sold"}),(0,E.jsx)(i.Os,{children:De.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,E.jsx)(i.d1,{children:"Total quantity sold"})]}),(0,E.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,E.jsx)(i.v0,{children:"Total Revenue"}),(0,E.jsx)(i.Os,{children:(0,c.vv)(De.reduce((e,r)=>e+r.revenue,0),J.currency)}),(0,E.jsx)(i.d1,{children:"For selected period"})]})]}),(0,E.jsxs)(R,{children:[(0,E.jsxs)(T,{children:["Complete Menu Performance Ranking (",ie?`${ne.start} to ${ne.end}`:re,")"]}),(0,E.jsxs)(P,{children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)(z,{children:"Rank"}),(0,E.jsx)(z,{children:"Menu Item"}),(0,E.jsx)(z,{children:"Category"}),(0,E.jsx)(z,{children:"Price"}),(0,E.jsx)(z,{children:"Qty Sold"}),(0,E.jsx)(z,{children:"Revenue"}),(0,E.jsx)(z,{children:"Performance"})]})}),(0,E.jsx)("tbody",{children:De.map((e,r)=>{var t;const n=(null===(t=De[0])||void 0===t?void 0:t.orders)||1;return(0,E.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,E.jsxs)(_,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,E.jsx)(_,{style:{fontWeight:600},children:e.name}),(0,E.jsx)(_,{children:(0,E.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,E.jsx)(_,{children:(0,c.vv)(e.price,J.currency)}),(0,E.jsx)(_,{children:e.orders.toLocaleString()}),(0,E.jsx)(_,{children:(0,c.vv)(e.revenue,J.currency)}),(0,E.jsx)(_,{children:(0,E.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,E.jsx)(L,{percentage:e.orders/n*100}),(0,E.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},r)})})]})]})]}),(0,E.jsxs)("div",{style:{display:"customers"===X?"block":"none"},children:[(0,E.jsx)(sr,{}),ae||ce?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading customer data..."}):0===Ie.length?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No customers with orders in the selected period"}):(0,E.jsxs)("div",{children:[(0,E.jsxs)(D,{children:[(0,E.jsxs)(i.hI,{color:"#635BFF",children:[(0,E.jsx)(i.v0,{children:"Active Customers"}),(0,E.jsx)(i.Os,{children:Ie.length.toLocaleString()}),(0,E.jsxs)(i.d1,{children:[Ie.filter(e=>{var r;return"member"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," members, ",Ie.filter(e=>{var r;return"guest"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," guests"]})]}),(0,E.jsxs)(i.hI,{color:"#00D924",children:[(0,E.jsx)(i.v0,{children:"Repeat Customers"}),(0,E.jsx)(i.Os,{children:Ie.filter(e=>e.period_orders>1).length}),(0,E.jsxs)(i.d1,{children:[Ie.length>0?Math.round(Ie.filter(e=>e.period_orders>1).length/Ie.length*100):0,"% ordered multiple times"]})]}),(0,E.jsxs)(i.hI,{color:"#FFB800",children:[(0,E.jsx)(i.v0,{children:"Average Spent"}),(0,E.jsx)(i.Os,{children:(0,c.vv)(Ie.length>0?Ie.reduce((e,r)=>e+(r.period_spent||0),0)/Ie.length:0,J.currency)}),(0,E.jsx)(i.d1,{children:"Per customer in period"})]}),(0,E.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,E.jsx)(i.v0,{children:"Period Revenue"}),(0,E.jsx)(i.Os,{children:(0,c.vv)(Ie.reduce((e,r)=>e+(r.period_spent||0),0),J.currency)}),(0,E.jsxs)(i.d1,{children:["From ",Ie.length," customers"]})]})]}),(0,E.jsxs)(R,{children:[(0,E.jsxs)(T,{children:["Top Customers (",ie?`${ne.start} to ${ne.end}`:re,")"]}),(0,E.jsxs)(P,{children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)(z,{children:"Rank"}),(0,E.jsx)(z,{children:"Name"}),(0,E.jsx)(z,{children:"Phone"}),(0,E.jsx)(z,{children:"Type"}),(0,E.jsx)(z,{children:"Period Orders"}),(0,E.jsx)(z,{children:"Period Spent"}),(0,E.jsx)(z,{children:"Total Points"}),(0,E.jsx)(z,{children:"Tier"})]})}),(0,E.jsx)("tbody",{children:Ie.slice(0,20).map((e,r)=>{var t,n,s,i,o,l;return(0,E.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,E.jsxs)(_,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,E.jsx)(_,{style:{fontWeight:600},children:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Guest"}),(0,E.jsx)(_,{children:(null===(s=e.customer)||void 0===s?void 0:s.phone)||"-"}),(0,E.jsx)(_,{children:(0,E.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"member"===(null===(i=e.customer)||void 0===i?void 0:i.type)?"#E0F2FE":"#F3F4F6",color:"member"===(null===(o=e.customer)||void 0===o?void 0:o.type)?"#0369A1":"#6B7280"},children:"member"===(null===(l=e.customer)||void 0===l?void 0:l.type)?"Member":"Guest"})}),(0,E.jsx)(_,{children:e.period_orders||0}),(0,E.jsx)(_,{children:(0,c.vv)(e.period_spent||0,J.currency)}),(0,E.jsx)(_,{children:e.points||0}),(0,E.jsx)(_,{children:(0,E.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"VIP"===e.loyalty_tier?"#FEF3C7":"Gold"===e.loyalty_tier?"#FEF9C3":"Silver"===e.loyalty_tier?"#F3F4F6":"#E5E7EB",color:"VIP"===e.loyalty_tier?"#92400E":"Gold"===e.loyalty_tier?"#854D0E":"#6B7280"},children:e.loyalty_tier||"Bronze"})})]},(null===(t=e.customer)||void 0===t?void 0:t.id)||r)})})]})]})]})]}),(0,E.jsxs)("div",{style:{display:"operations"===X?"block":"none"},children:[(0,E.jsx)(sr,{}),ae||ce?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading operations data..."}):0===Be?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,E.jsxs)("div",{children:[(0,E.jsxs)(D,{children:[(0,E.jsxs)(i.hI,{color:"#10B981",children:[(0,E.jsx)(i.v0,{children:"Completed Orders"}),(0,E.jsx)(i.Os,{children:Be.toLocaleString()}),(0,E.jsxs)(i.d1,{children:[Te.completionRate,"% fulfillment rate"]})]}),(0,E.jsxs)(i.hI,{color:"#F59E0B",children:[(0,E.jsx)(i.v0,{children:"Avg. Prep Time"}),(0,E.jsx)(i.Os,{children:Te.avgPrepTime>0?`${Te.avgPrepTime} min`:"N/A"}),(0,E.jsx)(i.d1,{children:Te.avgPrepTime>0?"Order to served":"No timing data"})]}),(0,E.jsxs)(i.hI,{color:"#EF4444",children:[(0,E.jsx)(i.v0,{children:"Peak Hour"}),(0,E.jsx)(i.Os,{children:Te.peakHour}),(0,E.jsxs)(i.d1,{children:[Te.peakHourOrders," orders in this slot"]})]}),(0,E.jsxs)(i.hI,{color:"#6366F1",children:[(0,E.jsx)(i.v0,{children:"Orders per Day"}),(0,E.jsx)(i.Os,{children:(()=>{const e=Math.max(1,Math.ceil((new Date(ne.end).getTime()-new Date(ne.start).getTime())/864e5)+1);return Math.round(Be/e)})()}),(0,E.jsx)(i.d1,{children:"Average daily orders"})]})]}),(0,E.jsxs)(R,{children:[(0,E.jsxs)(T,{children:["Peak Hours Performance (",ie?`${ne.start} to ${ne.end}`:re,")"]}),(0,E.jsxs)(P,{children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)(z,{children:"Time Slot"}),(0,E.jsx)(z,{children:"Orders"}),(0,E.jsx)(z,{children:"Revenue"}),(0,E.jsx)(z,{children:"Share"})]})}),(0,E.jsx)("tbody",{children:0===ze.length?(0,E.jsx)("tr",{children:(0,E.jsx)(_,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No peak hours data available"})}):ze.map((e,r)=>(0,E.jsxs)("tr",{style:{backgroundColor:0===r?"#FEF3C7":"transparent"},children:[(0,E.jsxs)(_,{style:{fontWeight:600},children:[0===r&&"\ud83d\udd25 ",e.time]}),(0,E.jsx)(_,{children:e.orders}),(0,E.jsx)(_,{children:(0,c.vv)(e.revenue,J.currency)}),(0,E.jsx)(_,{children:(0,E.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,E.jsx)(L,{percentage:Be>0?e.orders/Be*100:0}),(0,E.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[Be>0?Math.round(e.orders/Be*100):0,"%"]})]})})]},r))})]})]}),(0,E.jsxs)(I,{style:{marginTop:"24px"},children:[(0,E.jsx)(T,{children:"Hourly Order Distribution"}),(0,E.jsx)(p.u,{width:"100%",height:250,children:(0,E.jsxs)(w.E,{data:Oe,margin:{top:5,right:20,left:0,bottom:5},children:[(0,E.jsx)(v.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,E.jsx)(m.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,E.jsx)(j.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,E.jsx)(y.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,E.jsx)(S.y,{dataKey:"orders",fill:"#6366F1",radius:[4,4,0,0]})]})})]})]})]}),(0,E.jsxs)("div",{style:{display:"payment"===X?"block":"none"},children:[(0,E.jsx)(sr,{}),ae||ce?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading payment data..."}):0===Be?(0,E.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,E.jsxs)("div",{children:[Ue.orders>0&&(0,E.jsxs)(Y,{children:[(0,E.jsxs)("div",{children:[(0,E.jsx)("div",{style:{fontWeight:600,color:"#9A3412",marginBottom:"4px"},children:"Staff Meal (Excluded from Revenue)"}),(0,E.jsx)("div",{style:{fontSize:"13px",color:"#C2410C"},children:"These orders are not included in the revenue figures below"})]}),(0,E.jsxs)("div",{style:{display:"flex",gap:"24px",alignItems:"center"},children:[(0,E.jsxs)("div",{style:{textAlign:"center"},children:[(0,E.jsx)("div",{style:{fontSize:"20px",fontWeight:700,color:"#9A3412"},children:Ue.orders}),(0,E.jsx)("div",{style:{fontSize:"11px",color:"#C2410C"},children:"Orders"})]}),(0,E.jsxs)("div",{style:{textAlign:"center"},children:[(0,E.jsx)("div",{style:{fontSize:"20px",fontWeight:700,color:"#9A3412"},children:(0,c.vv)(Ue.revenue,J.currency)}),(0,E.jsx)("div",{style:{fontSize:"11px",color:"#C2410C"},children:"Amount"})]})]})]}),(0,E.jsxs)(D,{children:[(0,E.jsxs)(i.hI,{color:"#059669",children:[(0,E.jsx)(i.v0,{children:"Total Revenue"}),(0,E.jsx)(i.Os,{children:(0,c.vv)(Ve,J.currency)}),(0,E.jsxs)(i.d1,{children:[We.reduce((e,r)=>e+r.orders,0)," orders"]})]}),(0,E.jsxs)(i.hI,{color:"#2563EB",children:[(0,E.jsx)(i.v0,{children:"Payment Methods Used"}),(0,E.jsx)(i.Os,{children:We.length}),(0,E.jsx)(i.d1,{children:"Active methods in period"})]}),(0,E.jsxs)(i.hI,{color:"#7C3AED",children:[(0,E.jsx)(i.v0,{children:"Card Payments"}),(0,E.jsx)(i.Os,{children:(0,c.vv)((null===(t=We.find(e=>"card"===e.method))||void 0===t?void 0:t.revenue)||0,J.currency)}),(0,E.jsxs)(i.d1,{children:[(null===(s=We.find(e=>"card"===e.method))||void 0===s?void 0:s.orders)||0," orders"]})]}),(0,E.jsxs)(i.hI,{color:"#DC2626",children:[(0,E.jsx)(i.v0,{children:"Cash Payments"}),(0,E.jsx)(i.Os,{children:(0,c.vv)((null===(K=We.find(e=>"cash"===e.method))||void 0===K?void 0:K.revenue)||0,J.currency)}),(0,E.jsxs)(i.d1,{children:[(null===(G=We.find(e=>"cash"===e.method))||void 0===G?void 0:G.orders)||0," orders"]})]})]}),(0,E.jsxs)(O,{children:[(0,E.jsxs)(R,{children:[(0,E.jsx)(T,{children:"Payment Methods Breakdown"}),(0,E.jsxs)(P,{children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)(z,{children:"Payment Method"}),(0,E.jsx)(z,{children:"Orders"}),(0,E.jsx)(z,{children:"Revenue"}),(0,E.jsx)(z,{children:"Share"})]})}),(0,E.jsx)("tbody",{children:0===We.length?(0,E.jsx)("tr",{children:(0,E.jsx)(_,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No payment data available"})}):We.map((e,r)=>{const t=Ve>0?e.revenue/Ve*100:0;return(0,E.jsxs)("tr",{style:{backgroundColor:0===r?"#F0F9FF":"transparent"},children:[(0,E.jsx)(_,{style:{fontWeight:600},children:_e(e.method)}),(0,E.jsx)(_,{children:e.orders}),(0,E.jsx)(_,{style:{fontWeight:500},children:(0,c.vv)(e.revenue,J.currency)}),(0,E.jsx)(_,{children:(0,E.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,E.jsx)(L,{percentage:t}),(0,E.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[t.toFixed(1),"%"]})]})})]},e.method)})})]})]}),(0,E.jsxs)(I,{children:[(0,E.jsx)(T,{children:"Payment Distribution"}),(0,E.jsx)(p.u,{width:"100%",height:300,children:(0,E.jsxs)(F.r,{children:[(0,E.jsx)(b.F,{data:We.map(e=>({name:_e(e.method),value:Math.round(e.revenue)})),cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:We.map((e,r)=>(0,E.jsx)(k.f,{fill:q[r%q.length]},`cell-${r}`))}),(0,E.jsx)(y.m,{formatter:e=>(0,c.vv)(Number(e),J.currency)})]})})]})]}),(null===je||void 0===je?void 0:je.cardTypeSales)&&je.cardTypeSales.length>0&&(0,E.jsxs)(R,{style:{marginTop:"24px"},children:[(0,E.jsx)(T,{children:"Card Type Breakdown"}),(0,E.jsxs)(V,{children:[(0,E.jsx)(U,{active:"all"===be,onClick:()=>ke("all"),children:"All"}),["visa","master","amex","other"].map(e=>He.includes(e)&&(0,E.jsx)(U,{active:be===e,onClick:()=>ke(e),children:Le[e]||e},e))]}),(0,E.jsxs)(P,{children:[(0,E.jsx)("thead",{children:(0,E.jsxs)("tr",{children:[(0,E.jsx)(z,{children:"Card Type"}),(0,E.jsx)(z,{children:"Orders"}),(0,E.jsx)(z,{children:"Revenue"}),(0,E.jsx)(z,{children:"Share of Card Payments"})]})}),(0,E.jsx)("tbody",{children:0===Ne.length?(0,E.jsx)("tr",{children:(0,E.jsx)(_,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No card type data for selected filter"})}):Ne.map((e,r)=>{const t=je.cardTypeSales.reduce((e,r)=>e+r.revenue,0),n=t>0?e.revenue/t*100:0;return(0,E.jsxs)("tr",{style:{backgroundColor:0===r?"#F5F3FF":"transparent"},children:[(0,E.jsx)(_,{style:{fontWeight:600},children:Le[e.type]||e.type}),(0,E.jsx)(_,{children:e.orders}),(0,E.jsx)(_,{style:{fontWeight:500},children:(0,c.vv)(e.revenue,J.currency)}),(0,E.jsx)(_,{children:(0,E.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,E.jsx)(L,{percentage:n}),(0,E.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[n.toFixed(1),"%"]})]})})]},e.type)})})]})]})]})]})]})]}),(0,E.jsx)($.A,{isOpen:fe,onClose:()=>Fe(!1)})]})}},8012:(e,r,t)=>{t.d(r,{Ay:()=>a});t(9950);var n=t(4752),s=t(4414);const i=n.Ay.div`
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
`,a=e=>{let{title:r,children:t}=e;return(0,s.jsxs)(i,{children:[(0,s.jsx)(o,{children:r}),t&&(0,s.jsx)(l,{children:t})]})}},8285:(e,r,t)=>{t.d(r,{MA:()=>g,_M:()=>u});const n="cash",s="card",i="ewallet",o="bank_transfer",l="qr",a="counter",d="online",c="fpx",h="staffMeal",x={[n]:"Cash",[s]:"Credit/Debit Card",[i]:"E-Wallet",[o]:"Bank Transfer",[l]:"QR Payment",[a]:"Pay at Counter",[d]:"Online Payment",[c]:"FPX Online Banking",[h]:"Staff Meal"};function u(e,r){if(r){const t=r[{cash:"cash",card:"card",ewallet:"ewallet",bank_transfer:"bankTransfer",qr:"qr",counter:"payAtCounter",online:"online",fpx:"fpx",staffMeal:"staffMeal",staff_meal:"staffMeal"}[e]||e]||r[e];if(null!==t&&void 0!==t&&t.label)return t.label}return x[e]||e}const p={visa:"Visa",master:"Master",amex:"Amex",other:"Other"};function g(e,r,t){if(!e)return"N/A";if("card"===e&&r){return`${u("card",t)}(${p[r]||r})`}return u(e,t)}}}]);