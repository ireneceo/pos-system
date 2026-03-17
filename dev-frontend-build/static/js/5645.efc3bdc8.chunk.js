"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5645],{512:(e,t,n)=>{n.d(t,{x:()=>D,A:()=>R});var i=n(9950),r=n(4752),o=n(4414);const a=["Su","Mo","Tu","We","Th","Fr","Sa"],s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),p=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),x=r.Ay.div`
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
`,c=r.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,h=r.Ay.div`
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
`,g=r.Ay.button`
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
`,u=r.Ay.div``,m=r.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,y=r.Ay.button`
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
`,v=r.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,f=r.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,j=r.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,b=r.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,w=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,F=r.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,A=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,k=r.Ay.div`
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
`,$=e=>{let{startDate:t,endDate:n,onRangeSelect:r,onClose:$,isOpen:S}=e;const D=new Date,[C,B]=(0,i.useState)(D.getMonth()),[T,z]=(0,i.useState)(D.getFullYear()),[M,R]=(0,i.useState)(null),[L,I]=(0,i.useState)(null),[Y,N]=(0,i.useState)(null),[O,P]=(0,i.useState)("start"),_=(0,i.useRef)(null);(0,i.useEffect)(()=>{t&&R(d(t)),n&&I(d(n))},[t,n]),(0,i.useEffect)(()=>{S&&P("start")},[S]),(0,i.useEffect)(()=>{const e=e=>{_.current&&!_.current.contains(e.target)&&$()};return S&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[S,$]);const H=(0,i.useCallback)(()=>{0===C?(B(11),z(e=>e-1)):B(e=>e-1)},[C]),V=(0,i.useCallback)(()=>{11===C?(B(0),z(e=>e+1)):B(e=>e+1)},[C]),W=(e,t)=>{const n=((e,t)=>new Date(e,t+1,0).getDate())(e,t),i=((e,t)=>new Date(e,t,1).getDay())(e,t),d=[];for(let r=0;r<i;r++)d.push(null);for(let r=1;r<=n;r++)d.push(new Date(e,t,r));return(0,o.jsxs)(j,{children:[(0,o.jsx)(b,{children:p(e,t)}),(0,o.jsx)(w,{children:a.map(e=>(0,o.jsx)(F,{children:e},e))}),(0,o.jsx)(A,{children:d.map((e,t)=>{if(!e)return(0,o.jsx)(k,{},`e-${t}`);const{isStart:n,isEnd:i,isInRange:a,isHoverEnd:d}=(e=>{const t=M&&l(e,M),n=L&&l(e,L),i="end"===O&&Y?Y:L;let r=!1;if(M&&i){const[t,n]=M<=i?[M,i]:[i,M];r=((e,t,n)=>{const i=e.getTime();return i>t.getTime()&&i<n.getTime()})(e,t,n)}return{isStart:t,isEnd:n,isInRange:r,isHoverEnd:"end"===O&&Y&&l(e,Y)}})(e),p=l(e,D);return(0,o.jsx)(E,{$isStart:!!n,$isEnd:!!i,$isInRange:a,$isHoverEnd:!!d,$isToday:p,onClick:()=>(e=>{if("start"===O)R(e),I(null),P("end");else{let t=M,n=e;n<t&&([t,n]=[n,t]),R(t),I(n),P("start"),r(s(t),s(n)),setTimeout($,200)}})(e),onMouseEnter:()=>N(e),onMouseLeave:()=>N(null),children:e.getDate()},e.getTime())})})]})},q=11===C?0:C+1,U=11===C?T+1:T,Z=e=>{const t=new Date;let n;const i=t;switch(e){case"this_week":n=new Date(t),n.setDate(t.getDate()-t.getDay());break;case"this_month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":n=new Date(t.getFullYear(),0,1);break;default:return}R(n),I(i),P("start"),r(s(n),s(i)),setTimeout($,150)};return S?(0,o.jsx)(x,{ref:_,children:(0,o.jsxs)(c,{children:[(0,o.jsxs)(h,{children:[(0,o.jsx)(g,{onClick:()=>Z("this_week"),children:"This Week"}),(0,o.jsx)(g,{onClick:()=>Z("this_month"),children:"This Month"}),(0,o.jsx)(g,{onClick:()=>Z("this_year"),children:"This Year"})]}),(0,o.jsxs)(u,{children:[(0,o.jsxs)(m,{children:[(0,o.jsx)(y,{onClick:H,"aria-label":"Previous month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,o.jsx)(y,{onClick:V,"aria-label":"Next month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,o.jsxs)(v,{children:[W(T,C),(0,o.jsx)(f,{children:W(U,q)})]})]})]})}):null},S=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,D=(e,t)=>{const n=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[n,i,r]=t.split("-").map(Number);return new Date(n,i-1,r)}catch{return new Date}})(t);let i=new Date(n);const r=new Date(n);switch(e){case"today":break;case"week":i.setDate(n.getDate()-6);break;case"month":i.setDate(n.getDate()-29);break;case"year":i.setDate(n.getDate()-364);break;case"all":i=new Date(2020,0,1)}return{start:S(i),end:S(r)}},C=r.Ay.div`
  margin-bottom: 24px;
`,B=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,T=r.Ay.button`
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
`,z=r.Ay.div`
  position: relative;
  display: inline-block;
`,M=r.Ay.button`
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
`,R=e=>{let{activePeriod:t,dateRange:n,isCustomDateRange:r,onPeriodChange:a,onCalendarRangeSelect:s,includeToday:d=!1,children:l}=e;const[p,x]=(0,i.useState)(!1),c=d?["today","week","month","year","all"]:["week","month","year","all"],h={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,o.jsx)(C,{children:(0,o.jsxs)(B,{children:[c.map(e=>(0,o.jsx)(T,{active:t===e&&!r,onClick:()=>a(e),children:h[e]},e)),(0,o.jsxs)(z,{children:[(0,o.jsxs)(M,{active:r,onClick:()=>x(!p),children:[(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,o.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,o.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,o.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),n.start&&n.end?`${n.start} ~ ${n.end}`:"Custom Range"]}),(0,o.jsx)($,{isOpen:p,startDate:n.start,endDate:n.end,onRangeSelect:(e,t)=>{s(e,t),x(!1)},onClose:()=>x(!1)})]}),l]})})}},3577:(e,t,n)=>{n.d(t,{A:()=>P});var i=n(9950),r=n(7119),o=n(4752),a=n(1367),s=n(9018),d=n(6038),l=n(8285),p=n(4414);const x={dine_in:"Dine In","dine-in":"Dine In",takeaway:"Takeaway",pickup:"Pickup",delivery:"Delivery"},c={visa:"Visa",master:"Mastercard",amex:"Amex",other:"Other"},h=o.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding: 40px 20px;
  overflow-y: auto;

  @media print {
    position: static;
    background: none;
    padding: 0;
    overflow: visible;
  }
`,g=o.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 520px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;

  @media print {
    max-width: none;
    border-radius: 0;
    box-shadow: none;
  }
`,u=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;

  @media print {
    display: none;
  }
`,m=o.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,y=o.Ay.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #6B7C93;
  font-size: 20px;
  line-height: 1;

  &:hover {
    color: #0A2540;
  }
`,v=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  flex-wrap: wrap;

  @media print {
    display: none;
  }
`,f=o.Ay.button`
  padding: 6px 16px;
  border-radius: 6px;
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
`,j=o.Ay.input`
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #0A2540;
  margin-left: auto;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,b=o.Ay.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  justify-content: flex-end;

  @media print {
    display: none;
  }
`,w=o.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${e=>e.primary?"#635BFF":"#E6EBF1"};
  background: ${e=>e.primary?"#635BFF":"white"};
  color: ${e=>e.primary?"white":"#0A2540"};

  &:hover {
    background: ${e=>e.primary?"#5A51E6":"#F6F9FC"};
  }
`,F=o.Ay.div`
  padding: 24px;
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: #1F2937;
  max-height: 70vh;
  overflow-y: auto;

  @media print {
    max-height: none;
    overflow: visible;
    padding: 5mm;
    width: 80mm;
    max-width: 80mm;
    font-size: 11px;
  }
`,A=o.Ay.div`
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 2px solid #1F2937;
`,k=o.Ay.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 4px;

  @media print {
    font-size: 14px;
  }
`,E=o.Ay.div`
  font-size: 11px;
  color: #4B5563;
  line-height: 1.4;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`,$=o.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 12px 0;
  padding: 8px 0;
  border-top: 1px dashed #9CA3AF;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 13px;
  }
`,S=o.Ay.div`
  margin-bottom: 12px;
`,D=o.Ay.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 11px;
  }
`,C=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: ${e=>e.total?"8px 0 4px 0":"2px 0"};
  font-weight: ${e=>e.bold||e.total?700:400};
  font-size: ${e=>e.total?"14px":"12px"};
  border-top: ${e=>e.total?"2px solid #1F2937":"none"};
  margin-top: ${e=>e.total?"8px":"0"};

  @media print {
    font-size: ${e=>e.total?"13px":"11px"};
  }
`,B=o.Ay.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 8px;
`,T=o.Ay.span`
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`,z=o.Ay.span`
  text-align: right;
  white-space: nowrap;
  min-width: 36px;
  color: #6B7280;

  @media print {
    color: #1F2937;
  }
`,M=o.Ay.div`
  border-bottom: ${e=>"double"===e.style_type?"3px double #1F2937":"solid"===e.style_type?"1px solid #9CA3AF":"1px dashed #9CA3AF"};
  margin: 8px 0;
`,R=o.Ay.div`
  text-align: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px dashed #9CA3AF;
  font-size: 11px;
  color: #6B7280;
  line-height: 1.6;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`,L=o.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,I=o.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,Y=e=>(new Date).toLocaleDateString("en-CA",{timeZone:e}),N=e=>{const[t,n,i]=e.split("-");return`${parseInt(i)} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(n)-1]} ${t}`},O=e=>0===e?"12AM":12===e?"12PM":e>12?e-12+"PM":`${e}AM`,P=e=>{var t,n;let{isOpen:o,onClose:P}=e;const{user:_}=(0,a.As)(),{storeSettings:H,operationSettings:V,paymentSettings:W}=(0,s.Pj)(),q=V.timeZone||"Asia/Kuala_Lumpur",U=V.currency,[Z,G]=(0,i.useState)(Y(q)),[J,K]=(0,i.useState)(null),[X,Q]=(0,i.useState)(!1),ee=(0,i.useCallback)(async e=>{if(null===_||void 0===_||!_.restaurantId)return;const t=localStorage.getItem("auth_token");if(t){Q(!0);try{const n=await fetch(`/api/dashboard/restaurant/${_.restaurantId}/reports-summary?startDate=${e}&endDate=${e}`,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&K(e.data)}}catch(n){console.error("Error fetching settlement data:",n)}finally{Q(!1)}}},[null===_||void 0===_?void 0:_.restaurantId]);(0,i.useEffect)(()=>{o&&ee(Z)},[o,Z,ee]);const te=e=>{G(e)};if(!o)return null;const ne=Y(q),ie=(e=>{const t=new Date;return t.setDate(t.getDate()-1),t.toLocaleDateString("en-CA",{timeZone:e})})(q),re=(null===J||void 0===J||null===(t=J.summary)||void 0===t?void 0:t.totalRevenue)||0,oe=(null===J||void 0===J||null===(n=J.summary)||void 0===n?void 0:n.totalOrders)||0,ae=oe>0?re/oe:0,se=((null===J||void 0===J?void 0:J.paymentMethodSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),de=((null===J||void 0===J?void 0:J.cardTypeSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),le=((null===J||void 0===J?void 0:J.orderTypeSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),pe=((null===J||void 0===J?void 0:J.categorySales)||[]).filter(e=>e.revenue>0).sort((e,t)=>t.revenue-e.revenue),xe=((null===J||void 0===J?void 0:J.menuSales)||[]).filter(e=>e.quantity>0).sort((e,t)=>t.quantity-e.quantity).slice(0,15),ce=((null===J||void 0===J?void 0:J.hourlySales)||[]).filter(e=>e.orders>0).sort((e,t)=>e.hour-t.hour),he=(null===J||void 0===J?void 0:J.staffMeal)||{revenue:0,orders:0},ge=re,ue=(new Date).toLocaleString("en-GB",{timeZone:q,day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return r.createPortal((0,p.jsxs)(h,{onClick:e=>{e.target===e.currentTarget&&P()},children:[(0,p.jsxs)(g,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(u,{className:"no-print",children:[(0,p.jsx)(m,{children:"Daily Settlement Report"}),(0,p.jsx)(y,{onClick:P,children:"\xd7"})]}),(0,p.jsxs)(v,{className:"no-print",children:[(0,p.jsx)(f,{active:Z===ne,onClick:()=>te(ne),children:"Today"}),(0,p.jsx)(f,{active:Z===ie,onClick:()=>te(ie),children:"Yesterday"}),(0,p.jsx)(j,{type:"date",value:Z,max:ne,onChange:e=>te(e.target.value)})]}),X?(0,p.jsx)(L,{children:"Loading settlement data..."}):J&&0!==oe?(0,p.jsxs)(F,{"data-print-bill":!0,children:[(0,p.jsxs)(A,{children:[(0,p.jsx)(k,{children:H.name}),(0,p.jsxs)(E,{children:[H.address&&(0,p.jsx)("div",{children:H.address}),(H.city||H.state)&&(0,p.jsx)("div",{children:[H.city,H.state,H.postalCode].filter(Boolean).join(", ")}),H.phone&&(0,p.jsxs)("div",{children:["Tel: ",H.phone]}),H.businessRegistration&&(0,p.jsxs)("div",{children:["Reg No: ",H.businessRegistration]})]})]}),(0,p.jsx)($,{children:"DAILY SETTLEMENT"}),(0,p.jsxs)(S,{children:[(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:"Date:"}),(0,p.jsx)(T,{children:N(Z)})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:"Printed:"}),(0,p.jsx)(T,{children:ue})]})]}),(0,p.jsx)(M,{style_type:"double"}),(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"SALES SUMMARY"}),(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:"Total Orders"}),(0,p.jsx)(T,{children:oe})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:"Avg Order Value"}),(0,p.jsx)(T,{children:(0,d.vv)(ae,U)})]}),(0,p.jsxs)(C,{total:!0,children:[(0,p.jsx)(B,{children:"TOTAL REVENUE"}),(0,p.jsx)(T,{children:(0,d.vv)(ge,U)})]})]}),(0,p.jsx)(M,{}),se.length>0&&(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"PAYMENT METHODS"}),se.map(e=>(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:(0,l._M)(e.method,W||void 0)}),(0,p.jsxs)(z,{children:["x",e.orders]}),(0,p.jsx)(T,{children:(0,d.vv)(e.revenue,U)})]},e.method))]}),de.length>0&&(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"CARD BREAKDOWN"}),de.map(e=>(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:c[e.type]||e.type}),(0,p.jsxs)(z,{children:["x",e.orders]}),(0,p.jsx)(T,{children:(0,d.vv)(e.revenue,U)})]},e.type))]}),(0,p.jsx)(M,{}),le.length>0&&(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"ORDER TYPES"}),le.map(e=>(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:x[e.type]||e.type}),(0,p.jsxs)(z,{children:["x",e.orders]}),(0,p.jsx)(T,{children:(0,d.vv)(e.revenue,U)})]},e.type))]}),(0,p.jsx)(M,{}),pe.length>0&&(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"SALES BY CATEGORY"}),pe.map(e=>(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:e.category}),(0,p.jsxs)(z,{children:[e.quantity,"qty"]}),(0,p.jsx)(T,{children:(0,d.vv)(e.revenue,U)})]},e.category)),(0,p.jsxs)(C,{bold:!0,children:[(0,p.jsx)(B,{children:"Total"}),(0,p.jsxs)(z,{children:[pe.reduce((e,t)=>e+t.quantity,0),"qty"]}),(0,p.jsx)(T,{children:(0,d.vv)(pe.reduce((e,t)=>e+t.revenue,0),U)})]})]}),(0,p.jsx)(M,{}),xe.length>0&&(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"TOP SELLING ITEMS"}),xe.map((e,t)=>(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:e.name}),(0,p.jsxs)(z,{children:["x",e.quantity]}),(0,p.jsx)(T,{children:(0,d.vv)(e.revenue,U)})]},`${e.name}-${t}`))]}),(0,p.jsx)(M,{}),ce.length>0&&(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"HOURLY BREAKDOWN"}),ce.map(e=>(0,p.jsxs)(C,{children:[(0,p.jsxs)(B,{children:[O(e.hour)," - ",O(e.hour+1)]}),(0,p.jsxs)(z,{children:["x",e.orders]}),(0,p.jsx)(T,{children:(0,d.vv)(e.revenue,U)})]},e.hour))]}),he.orders>0&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(M,{}),(0,p.jsxs)(S,{children:[(0,p.jsx)(D,{children:"STAFF MEALS (EXCLUDED FROM REVENUE)"}),(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:"Staff Meal Orders"}),(0,p.jsx)(T,{children:he.orders})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:"Staff Meal Value"}),(0,p.jsx)(T,{children:(0,d.vv)(he.revenue,U)})]})]})]}),(0,p.jsx)(M,{style_type:"double"}),(0,p.jsxs)(C,{total:!0,children:[(0,p.jsx)(B,{children:"NET SALES"}),(0,p.jsx)(T,{children:(0,d.vv)(ge,U)})]}),(0,p.jsxs)(C,{children:[(0,p.jsx)(B,{children:"Total Transactions"}),(0,p.jsx)(T,{children:oe})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)("div",{children:"--- End of Daily Settlement ---"}),(0,p.jsx)("div",{children:H.name})]})]}):(0,p.jsxs)(I,{children:["No sales data for ",N(Z)]}),!X&&J&&oe>0&&(0,p.jsxs)(b,{className:"no-print",children:[(0,p.jsx)(w,{onClick:P,children:"Close"}),(0,p.jsxs)(w,{primary:!0,onClick:()=>{window.print()},children:[(0,p.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,p.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Print"]})]})]}),(0,p.jsx)("style",{children:"\n        @media print {\n          @page {\n            size: 80mm auto;\n            margin: 0mm;\n          }\n\n          body {\n            margin: 0;\n            padding: 0;\n            background: white;\n          }\n\n          body > *:not([data-print-bill]) {\n            display: none !important;\n          }\n\n          .no-print {\n            display: none !important;\n          }\n\n          [data-print-bill] {\n            display: block !important;\n            width: 80mm !important;\n            max-width: 80mm !important;\n            margin: 0 !important;\n            padding: 5mm !important;\n            background: white !important;\n          }\n\n          [data-print-bill] button {\n            display: none !important;\n          }\n        }\n      "})]}),document.body)}},8012:(e,t,n)=>{n.d(t,{Ay:()=>d});n(9950);var i=n(4752),r=n(4414);const o=i.Ay.div`
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
`,a=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,s=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,d=e=>{let{title:t,children:n}=e;return(0,r.jsxs)(o,{children:[(0,r.jsx)(a,{children:t}),n&&(0,r.jsx)(s,{children:n})]})}}}]);