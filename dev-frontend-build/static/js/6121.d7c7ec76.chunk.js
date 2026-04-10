"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6121],{512:(e,t,a)=>{a.d(t,{x:()=>$,A:()=>M});var n=a(9950),r=a(4752),i=a(5030),o=a(4414);const s=["Su","Mo","Tu","We","Th","Fr","Sa"],d=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[t,a,n]=e.split("-").map(Number);return new Date(t,a-1,n)},c=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),p=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),x=r.Ay.div`
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
`,h=r.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,g=r.Ay.div`
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
`,u=r.Ay.button`
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
`,m=r.Ay.div``,y=r.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,b=r.Ay.button`
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
`,f=r.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,F=r.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,w=r.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,v=r.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,j=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,k=r.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,S=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,A=r.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,E=r.Ay.div`
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
`,D=e=>{let{startDate:t,endDate:a,onRangeSelect:r,onClose:D,isOpen:C}=e;const{t:$}=(0,i.Bd)("common"),B=new Date,[z,R]=(0,n.useState)(B.getMonth()),[O,T]=(0,n.useState)(B.getFullYear()),[M,P]=(0,n.useState)(null),[Y,I]=(0,n.useState)(null),[L,W]=(0,n.useState)(null),[_,U]=(0,n.useState)("start"),H=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&P(l(t)),a&&I(l(a))},[t,a]),(0,n.useEffect)(()=>{C&&U("start")},[C]),(0,n.useEffect)(()=>{const e=e=>{H.current&&!H.current.contains(e.target)&&D()};return C&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[C,D]);const V=(0,n.useCallback)(()=>{0===z?(R(11),T(e=>e-1)):R(e=>e-1)},[z]),N=(0,n.useCallback)(()=>{11===z?(R(0),T(e=>e+1)):R(e=>e+1)},[z]),J=(e,t)=>{const a=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),i=[];for(let r=0;r<n;r++)i.push(null);for(let r=1;r<=a;r++)i.push(new Date(e,t,r));return(0,o.jsxs)(w,{children:[(0,o.jsx)(v,{children:p(e,t)}),(0,o.jsx)(j,{children:s.map(e=>(0,o.jsx)(k,{children:e},e))}),(0,o.jsx)(S,{children:i.map((e,t)=>{if(!e)return(0,o.jsx)(A,{},`e-${t}`);const{isStart:a,isEnd:n,isInRange:i,isHoverEnd:s}=(e=>{const t=M&&c(e,M),a=Y&&c(e,Y),n="end"===_&&L?L:Y;let r=!1;if(M&&n){const[t,a]=M<=n?[M,n]:[n,M];r=((e,t,a)=>{const n=e.getTime();return n>t.getTime()&&n<a.getTime()})(e,t,a)}return{isStart:t,isEnd:a,isInRange:r,isHoverEnd:"end"===_&&L&&c(e,L)}})(e),l=c(e,B);return(0,o.jsx)(E,{$isStart:!!a,$isEnd:!!n,$isInRange:i,$isHoverEnd:!!s,$isToday:l,onClick:()=>(e=>{if("start"===_)P(e),I(null),U("end");else{let t=M,a=e;a<t&&([t,a]=[a,t]),P(t),I(a),U("start"),r(d(t),d(a)),setTimeout(D,200)}})(e),onMouseEnter:()=>W(e),onMouseLeave:()=>W(null),children:e.getDate()},e.getTime())})})]})},Z=11===z?0:z+1,q=11===z?O+1:O,G=e=>{const t=new Date;let a;const n=t;switch(e){case"this_week":a=new Date(t),a.setDate(t.getDate()-t.getDay());break;case"this_month":a=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":a=new Date(t.getFullYear(),0,1);break;default:return}P(a),I(n),U("start"),r(d(a),d(n)),setTimeout(D,150)};return C?(0,o.jsx)(x,{ref:H,children:(0,o.jsxs)(h,{children:[(0,o.jsxs)(g,{children:[(0,o.jsx)(u,{onClick:()=>G("this_week"),children:"This Week"}),(0,o.jsx)(u,{onClick:()=>G("this_month"),children:"This Month"}),(0,o.jsx)(u,{onClick:()=>G("this_year"),children:"This Year"})]}),(0,o.jsxs)(m,{children:[(0,o.jsxs)(y,{children:[(0,o.jsx)(b,{onClick:V,"aria-label":"Previous month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,o.jsx)(b,{onClick:N,"aria-label":"Next month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,o.jsxs)(f,{children:[J(O,z),(0,o.jsx)(F,{children:J(q,Z)})]})]})]})}):null},C=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,$=(e,t)=>{const a=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[a,n,r]=t.split("-").map(Number);return new Date(a,n-1,r)}catch{return new Date}})(t);let n=new Date(a);const r=new Date(a);switch(e){case"today":break;case"yesterday":n.setDate(a.getDate()-1),r.setDate(a.getDate()-1);break;case"week":n.setDate(a.getDate()-6);break;case"month":n.setDate(a.getDate()-29);break;case"year":n.setDate(a.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:C(n),end:C(r)}},B=r.Ay.div`
  margin-bottom: 24px;
`,z=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,R=r.Ay.button`
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
`,O=r.Ay.div`
  position: relative;
  display: inline-block;
`,T=r.Ay.button`
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
`,M=e=>{let{activePeriod:t,dateRange:a,isCustomDateRange:r,onPeriodChange:s,onCalendarRangeSelect:d,includeToday:l=!1,children:c}=e;const{t:p}=(0,i.Bd)("common"),[x,h]=(0,n.useState)(!1),g=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],u={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,o.jsx)(B,{children:(0,o.jsxs)(z,{children:[g.map(e=>(0,o.jsx)(R,{active:t===e&&!r,onClick:()=>s(e),children:u[e]},e)),(0,o.jsxs)(O,{children:[(0,o.jsxs)(T,{active:r,onClick:()=>h(!x),children:[(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,o.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,o.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,o.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),a.start&&a.end?`${a.start} ~ ${a.end}`:"Custom Range"]}),(0,o.jsx)(D,{isOpen:x,startDate:a.start,endDate:a.end,onRangeSelect:(e,t)=>{d(e,t),h(!1)},onClose:()=>h(!1)})]}),c]})})}},4021:(e,t,a)=>{a.d(t,{i1:()=>s});var n=a(9950),r=a(1367),i=a(6038),o=a(9955);const s=()=>{const{user:e}=(0,r.As)(),[t,a]=(0,n.useState)("RM"),[s]=(0,n.useState)(Object.keys(i.DL)),[d,l]=(0,n.useState)(!0),[c,p]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let r=n>=0?t[n+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return a("RM"),void l(!1);try{const e=(0,o.c4)(),t=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var i;const e=await t.json(),n=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"MYR";a(n)}else a("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),a("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:d,error:c}}},6121:(e,t,a)=>{a.r(t),a.d(t,{default:()=>T});var n=a(9950),r=a(4752),i=a(4021),o=a(6038),s=a(512),d=a(5030),l=a(4414);const c=r.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,p=r.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,x=r.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=r.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,g=r.Ay.button`
  padding: 12px 20px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #5A51E6;
  }
`,u=r.Ay.div`
  padding: 32px;
`,m=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,b=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=r.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,F=r.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,w=r.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,v=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
`,j=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,k=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`,S=r.Ay.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`,A=r.Ay.thead`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    display: none;
  }

  th {
    padding: 14px 16px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* 정렬 규칙: 숫자/금액은 우측, 액션은 우측 */
  th:nth-child(2), th:nth-child(3), th:nth-child(4), th:nth-child(5), th:nth-child(6) { text-align: right; } /* Sales, Orders, Avg, Week, Month */
  th:nth-child(7) { text-align: right; } /* Action */
`,E=r.Ay.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`,D=r.Ay.td`
  padding: 16px;
  font-size: 14px;
  color: #0A2540;
  vertical-align: middle;

  /* 정렬 규칙: 숫자/금액은 우측, 액션은 우측 */
  &:nth-child(2), &:nth-child(3), &:nth-child(4), &:nth-child(5), &:nth-child(6) { text-align: right; } /* Sales, Orders, Avg, Week, Month */
  &:nth-child(7) { text-align: right; } /* Action */

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
    padding: 0;
    text-align: left !important;

    &:before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    &:last-child {
      flex: 1 1 100%;
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid #F3F4F6;

      &:before {
        display: none;
      }
    }
  }
`,C=r.Ay.div`
  display: flex;
  flex-direction: column;
`,$=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,B=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,z=r.Ay.div`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`,R=r.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
`,O=r.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }
`,T=()=>{const{t:e}=(0,d.Bd)("admin"),[t,a]=(0,n.useState)("all"),[r,T]=(0,n.useState)("today"),[M,P]=(0,n.useState)(()=>(0,s.x)("today")),[Y,I]=(0,n.useState)(!1),[L,W]=(0,n.useState)([]),{defaultCurrency:_}=(0,i.i1)(),[U,H]=(0,n.useState)("RM");(0,n.useEffect)(()=>{_&&H(_)},[_]);(0,n.useEffect)(()=>{(async()=>{try{const e=await fetch("/api/restaurants");if(!e.ok)return void console.error("Failed to fetch restaurants");const t=await e.json(),a=(t.data||t).map(e=>({id:e.id.toString(),name:e.name,location:e.address||"Unknown",todaySales:0,yesterdaySales:0,weekSales:0,monthSales:0,todayOrders:0,averageOrderValue:0,topItems:[],hourlyData:new Array(12).fill(0)}));W(a)}catch(e){console.error("Error fetching sales data:",e)}})()},[]);const V=L.reduce((e,t)=>({todaySales:e.todaySales+t.todaySales,yesterdaySales:e.yesterdaySales+t.yesterdaySales,weekSales:e.weekSales+t.weekSales,monthSales:e.monthSales+t.monthSales,todayOrders:e.todayOrders+t.todayOrders}),{todaySales:0,yesterdaySales:0,weekSales:0,monthSales:0,todayOrders:0}),N=V.todayOrders>0?V.todaySales/V.todayOrders:0,J=V.yesterdaySales>0?(V.todaySales-V.yesterdaySales)/V.yesterdaySales*100:0;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(c,{children:[(0,l.jsx)(p,{children:(0,l.jsx)(x,{children:e("admin:salesPage.sales")})}),(0,l.jsxs)(u,{children:[(0,l.jsxs)("div",{style:{background:"#FAFBFC",padding:"24px 0",marginBottom:"24px",display:"flex",flexWrap:"wrap",gap:"24px",alignItems:"center"},children:[(0,l.jsxs)(h,{value:t,onChange:e=>a(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:e("admin:salesPage.allRestaurants")}),L.map(e=>(0,l.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]}),(0,l.jsx)(s.A,{activePeriod:r,dateRange:M,isCustomDateRange:Y,onPeriodChange:e=>{T(e),I(!1),P((0,s.x)(e))},onCalendarRangeSelect:(e,t)=>{I(!0),T("all"),P({start:e,end:t})},includeToday:!0}),(0,l.jsxs)(g,{onClick:()=>{const e={date:(new Date).toISOString(),dateRange:M,totalSales:V.todaySales,totalOrders:V.todayOrders,averageOrderValue:N,restaurants:L},t=JSON.stringify(e,null,2),a=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(a),r=document.createElement("a");r.href=n,r.download=`sales-report-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)},style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,l.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,l.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Export Report"]})]}),(0,l.jsxs)(m,{children:[(0,l.jsxs)(y,{color:"#059669",children:[(0,l.jsx)(b,{children:e("admin:salesPage.totalSales")}),(0,l.jsx)(F,{children:(0,o.vv)(V.todaySales,U)}),(0,l.jsxs)(f,{positive:J>0,children:[J>0?"\u2191":"\u2193"," ",Math.abs(J).toFixed(1),"% vs yesterday"]})]}),(0,l.jsxs)(y,{color:"#2563EB",children:[(0,l.jsx)(b,{children:e("admin:salesPage.totalOrders")}),(0,l.jsx)(F,{children:V.todayOrders}),(0,l.jsx)(f,{positive:!0,children:"\u2191 12% vs yesterday"})]}),(0,l.jsxs)(y,{color:"#7C3AED",children:[(0,l.jsx)(b,{children:e("admin:salesPage.averageOrderValue")}),(0,l.jsx)(F,{children:(0,o.vv)(N,U)}),(0,l.jsx)(f,{positive:!0,children:"\u2191 5.3% vs yesterday"})]}),(0,l.jsxs)(y,{color:"#DC2626",children:[(0,l.jsx)(b,{children:e("admin:salesPage.activeRestaurants")}),(0,l.jsx)(F,{children:L.length}),(0,l.jsx)(f,{positive:!0,children:"All operational"})]})]}),(0,l.jsxs)(w,{children:[(0,l.jsxs)(v,{children:[(0,l.jsx)(j,{children:e("admin:salesPage.salesTrendAllRestaurants")}),(0,l.jsx)("div",{style:{height:"300px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"Chart visualization will be implemented"})]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(j,{children:e("admin:salesPage.salesDistribution")}),(0,l.jsx)("div",{style:{height:"300px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"\ud83c\udf70 Distribution chart will be implemented"})]})]}),(0,l.jsxs)(v,{children:[(0,l.jsx)(j,{children:e("admin:salesPage.dailyComparison")}),(0,l.jsx)("div",{style:{height:"250px",display:"flex",alignItems:"center",justifyContent:"center",color:"#6B7280",fontSize:"14px"},children:"Bar chart comparison will be implemented"})]}),(0,l.jsx)(k,{style:{marginTop:"24px"},children:(0,l.jsxs)(S,{children:[(0,l.jsx)(A,{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)("th",{children:e("admin:salesPage.restaurant")}),(0,l.jsx)("th",{children:e("admin:salesPage.todaysSales")}),(0,l.jsx)("th",{children:e("admin:salesPage.orders")}),(0,l.jsx)("th",{children:e("admin:salesPage.avgOrder")}),(0,l.jsx)("th",{children:e("admin:salesPage.weekTotal")}),(0,l.jsx)("th",{children:e("admin:salesPage.monthTotal")}),(0,l.jsx)("th",{children:e("admin:salesPage.action")})]})}),(0,l.jsx)("tbody",{children:L.map(t=>{const a=t.yesterdaySales>0?(t.todaySales-t.yesterdaySales)/t.yesterdaySales*100:0;return(0,l.jsxs)(E,{children:[(0,l.jsx)(D,{"data-label":"Restaurant",children:(0,l.jsxs)(C,{children:[(0,l.jsx)($,{children:t.name}),(0,l.jsx)(B,{children:t.location})]})}),(0,l.jsx)(D,{"data-label":"Today's Sales",children:(0,l.jsxs)(z,{children:[(0,o.vv)(t.todaySales,U),(0,l.jsxs)(R,{positive:a>0,children:[a>0?"\u2191":"\u2193"," ",Math.abs(a).toFixed(1),"%"]})]})}),(0,l.jsx)(D,{"data-label":"Orders",children:(0,l.jsx)(z,{children:t.todayOrders})}),(0,l.jsx)(D,{"data-label":"Avg Order",children:(0,l.jsx)(z,{children:(0,o.vv)(t.averageOrderValue,U)})}),(0,l.jsx)(D,{"data-label":"Week Total",children:(0,l.jsx)(z,{children:(0,o.vv)(t.weekSales,U)})}),(0,l.jsx)(D,{"data-label":"Month Total",children:(0,l.jsx)(z,{children:(0,o.vv)(t.monthSales,U)})}),(0,l.jsx)(D,{"data-label":"",children:(0,l.jsx)(O,{children:e("admin:salesPage.viewDetails")})})]},t.id)})})]})})]})]})})}}}]);