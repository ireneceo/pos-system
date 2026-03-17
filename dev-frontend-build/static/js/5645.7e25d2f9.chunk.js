"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5645],{512:(e,t,n)=>{n.d(t,{x:()=>$,A:()=>L});var i=n(9950),r=n(4752),o=n(4414);const a=["Su","Mo","Tu","We","Th","Fr","Sa"],s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),x=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),p=r.Ay.div`
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
`,g=r.Ay.div``,m=r.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,v=r.Ay.button`
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
`,y=r.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,j=r.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,f=r.Ay.div`
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
`,C=e=>{let{startDate:t,endDate:n,onRangeSelect:r,onClose:C,isOpen:D}=e;const $=new Date,[S,T]=(0,i.useState)($.getMonth()),[B,z]=(0,i.useState)($.getFullYear()),[M,L]=(0,i.useState)(null),[O,R]=(0,i.useState)(null),[I,Y]=(0,i.useState)(null),[N,_]=(0,i.useState)("start"),P=(0,i.useRef)(null);(0,i.useEffect)(()=>{t&&L(d(t)),n&&R(d(n))},[t,n]),(0,i.useEffect)(()=>{D&&_("start")},[D]),(0,i.useEffect)(()=>{const e=e=>{P.current&&!P.current.contains(e.target)&&C()};return D&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[D,C]);const V=(0,i.useCallback)(()=>{0===S?(T(11),z(e=>e-1)):T(e=>e-1)},[S]),H=(0,i.useCallback)(()=>{11===S?(T(0),z(e=>e+1)):T(e=>e+1)},[S]),q=(e,t)=>{const n=((e,t)=>new Date(e,t+1,0).getDate())(e,t),i=((e,t)=>new Date(e,t,1).getDay())(e,t),d=[];for(let r=0;r<i;r++)d.push(null);for(let r=1;r<=n;r++)d.push(new Date(e,t,r));return(0,o.jsxs)(f,{children:[(0,o.jsx)(b,{children:x(e,t)}),(0,o.jsx)(w,{children:a.map(e=>(0,o.jsx)(F,{children:e},e))}),(0,o.jsx)(A,{children:d.map((e,t)=>{if(!e)return(0,o.jsx)(k,{},`e-${t}`);const{isStart:n,isEnd:i,isInRange:a,isHoverEnd:d}=(e=>{const t=M&&l(e,M),n=O&&l(e,O),i="end"===N&&I?I:O;let r=!1;if(M&&i){const[t,n]=M<=i?[M,i]:[i,M];r=((e,t,n)=>{const i=e.getTime();return i>t.getTime()&&i<n.getTime()})(e,t,n)}return{isStart:t,isEnd:n,isInRange:r,isHoverEnd:"end"===N&&I&&l(e,I)}})(e),x=l(e,$);return(0,o.jsx)(E,{$isStart:!!n,$isEnd:!!i,$isInRange:a,$isHoverEnd:!!d,$isToday:x,onClick:()=>(e=>{if("start"===N)L(e),R(null),_("end");else{let t=M,n=e;n<t&&([t,n]=[n,t]),L(t),R(n),_("start"),r(s(t),s(n)),setTimeout(C,200)}})(e),onMouseEnter:()=>Y(e),onMouseLeave:()=>Y(null),children:e.getDate()},e.getTime())})})]})},W=11===S?0:S+1,U=11===S?B+1:B,Z=e=>{const t=new Date;let n;const i=t;switch(e){case"this_week":n=new Date(t),n.setDate(t.getDate()-t.getDay());break;case"this_month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":n=new Date(t.getFullYear(),0,1);break;default:return}L(n),R(i),_("start"),r(s(n),s(i)),setTimeout(C,150)};return D?(0,o.jsx)(p,{ref:P,children:(0,o.jsxs)(c,{children:[(0,o.jsxs)(h,{children:[(0,o.jsx)(u,{onClick:()=>Z("this_week"),children:"This Week"}),(0,o.jsx)(u,{onClick:()=>Z("this_month"),children:"This Month"}),(0,o.jsx)(u,{onClick:()=>Z("this_year"),children:"This Year"})]}),(0,o.jsxs)(g,{children:[(0,o.jsxs)(m,{children:[(0,o.jsx)(v,{onClick:V,"aria-label":"Previous month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,o.jsx)(v,{onClick:H,"aria-label":"Next month",children:(0,o.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,o.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,o.jsxs)(y,{children:[q(B,S),(0,o.jsx)(j,{children:q(U,W)})]})]})]})}):null},D=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,$=(e,t)=>{const n=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[n,i,r]=t.split("-").map(Number);return new Date(n,i-1,r)}catch{return new Date}})(t);let i=new Date(n);const r=new Date(n);switch(e){case"today":break;case"week":i.setDate(n.getDate()-6);break;case"month":i.setDate(n.getDate()-29);break;case"year":i.setDate(n.getDate()-364);break;case"all":i=new Date(2020,0,1)}return{start:D(i),end:D(r)}},S=r.Ay.div`
  margin-bottom: 24px;
`,T=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,B=r.Ay.button`
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
`,L=e=>{let{activePeriod:t,dateRange:n,isCustomDateRange:r,onPeriodChange:a,onCalendarRangeSelect:s,includeToday:d=!1,children:l}=e;const[x,p]=(0,i.useState)(!1),c=d?["today","week","month","year","all"]:["week","month","year","all"],h={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,o.jsx)(S,{children:(0,o.jsxs)(T,{children:[c.map(e=>(0,o.jsx)(B,{active:t===e&&!r,onClick:()=>a(e),children:h[e]},e)),(0,o.jsxs)(z,{children:[(0,o.jsxs)(M,{active:r,onClick:()=>p(!x),children:[(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,o.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,o.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,o.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),n.start&&n.end?`${n.start} ~ ${n.end}`:"Custom Range"]}),(0,o.jsx)(C,{isOpen:x,startDate:n.start,endDate:n.end,onRangeSelect:(e,t)=>{s(e,t),p(!1)},onClose:()=>p(!1)})]}),l]})})}},3577:(e,t,n)=>{n.d(t,{A:()=>_});var i=n(9950),r=n(7119),o=n(4752),a=n(1367),s=n(9018),d=n(6038),l=n(8285),x=n(4414);const p={dine_in:"Dine In","dine-in":"Dine In",takeaway:"Takeaway",pickup:"Pickup",delivery:"Delivery"},c={pos:"POS",mobile:"Mobile Order"},h={visa:"Visa",master:"Mastercard",amex:"Amex",other:"Other"},u=o.Ay.div`
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
`,m=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;

  @media print {
    display: none;
  }
`,v=o.Ay.h2`
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
`,j=o.Ay.div`
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
`,b=o.Ay.input`
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
`,w=o.Ay.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  justify-content: flex-end;

  @media print {
    display: none;
  }
`,F=o.Ay.button`
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
`,A=o.Ay.div`
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
`,k=o.Ay.div`
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 2px solid #1F2937;
`,E=o.Ay.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 4px;

  @media print {
    font-size: 14px;
  }
`,C=o.Ay.div`
  font-size: 11px;
  color: #4B5563;
  line-height: 1.4;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`,D=o.Ay.div`
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
`,$=o.Ay.div`
  margin-bottom: 12px;
`,S=o.Ay.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 11px;
  }
`,T=o.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: ${e=>e.total?"8px 0 4px 0":"2px 0"};
  font-weight: ${e=>e.bold||e.total?700:400};
  font-size: ${e=>e.total?"14px":"12px"};
  border-top: ${e=>e.total?"2px solid #1F2937":"none"};
  margin-top: ${e=>e.total?"8px":"0"};
  padding-left: ${e=>e.indent?"16px":"0"};
  color: ${e=>e.negative?"#DC2626":"inherit"};

  @media print {
    font-size: ${e=>e.total?"13px":"11px"};
    padding-left: ${e=>e.indent?"12px":"0"};
  }
`,B=o.Ay.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 8px;
`,z=o.Ay.span`
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`,M=o.Ay.span`
  text-align: right;
  white-space: nowrap;
  min-width: 36px;
  color: #6B7280;

  @media print {
    color: #1F2937;
  }
`,L=o.Ay.div`
  border-bottom: ${e=>"double"===e.style_type?"3px double #1F2937":"solid"===e.style_type?"1px solid #9CA3AF":"1px dashed #9CA3AF"};
  margin: 8px 0;
`,O=o.Ay.div`
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
`,R=o.Ay.div`
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
`,Y=e=>(new Date).toLocaleDateString("en-CA",{timeZone:e}),N=e=>{const[t,n,i]=e.split("-");return`${parseInt(i)} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(n)-1]} ${t}`},_=e=>{var t,n;let{isOpen:o,onClose:_}=e;const{user:P}=(0,a.As)(),{storeSettings:V,operationSettings:H,paymentSettings:q}=(0,s.Pj)(),W=H.timeZone||"Asia/Kuala_Lumpur",U=H.currency,[Z,G]=(0,i.useState)(Y(W)),[J,K]=(0,i.useState)(null),[Q,X]=(0,i.useState)(!1),ee=(0,i.useCallback)(async e=>{if(null===P||void 0===P||!P.restaurantId)return;const t=localStorage.getItem("auth_token");if(t){X(!0);try{const n=await fetch(`/api/dashboard/restaurant/${P.restaurantId}/reports-summary?startDate=${e}&endDate=${e}`,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&K(e.data)}}catch(n){console.error("Error fetching settlement data:",n)}finally{X(!1)}}},[null===P||void 0===P?void 0:P.restaurantId]);(0,i.useEffect)(()=>{o&&ee(Z)},[o,Z,ee]);const te=e=>{G(e)};if(!o)return null;const ne=Y(W),ie=(e=>{const t=new Date;return t.setDate(t.getDate()-1),t.toLocaleDateString("en-CA",{timeZone:e})})(W),re=null===J||void 0===J?void 0:J.settlement,oe=(null===J||void 0===J||null===(t=J.summary)||void 0===t?void 0:t.totalOrders)||0,ae=(null===J||void 0===J||null===(n=J.summary)||void 0===n?void 0:n.averageOrderValue)||0,se=((null===J||void 0===J?void 0:J.paymentMethodSales)||[]).filter(e=>e.orders>0&&"staffMeal"!==e.method).sort((e,t)=>t.revenue-e.revenue),de=((null===J||void 0===J?void 0:J.cardTypeSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),le=((null===J||void 0===J?void 0:J.orderTypeSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),xe=((null===J||void 0===J?void 0:J.sourceSales)||[]).filter(e=>e.orders>0).sort((e,t)=>t.revenue-e.revenue),pe=((null===J||void 0===J?void 0:J.categorySales)||[]).filter(e=>e.revenue>0).sort((e,t)=>t.revenue-e.revenue),ce=((null===J||void 0===J?void 0:J.menuSales)||[]).filter(e=>e.quantity>0).sort((e,t)=>t.quantity-e.quantity).slice(0,10),he=(null===J||void 0===J?void 0:J.staffMeal)||{revenue:0,orders:0},ue=se.reduce((e,t)=>e+t.revenue,0),ge=(new Date).toLocaleString("en-GB",{timeZone:W,day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return r.createPortal((0,x.jsxs)(u,{onClick:e=>{e.target===e.currentTarget&&_()},children:[(0,x.jsxs)(g,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(m,{className:"no-print",children:[(0,x.jsx)(v,{children:"Daily Settlement Report"}),(0,x.jsx)(y,{onClick:_,children:"\xd7"})]}),(0,x.jsxs)(j,{className:"no-print",children:[(0,x.jsx)(f,{active:Z===ne,onClick:()=>te(ne),children:"Today"}),(0,x.jsx)(f,{active:Z===ie,onClick:()=>te(ie),children:"Yesterday"}),(0,x.jsx)(b,{type:"date",value:Z,max:ne,onChange:e=>te(e.target.value)})]}),Q?(0,x.jsx)(R,{children:"Loading settlement data..."}):J&&0!==oe?(0,x.jsxs)(A,{"data-print-bill":!0,children:[(0,x.jsxs)(k,{children:[(0,x.jsx)(E,{children:V.name}),(0,x.jsxs)(C,{children:[V.address&&(0,x.jsx)("div",{children:V.address}),(V.city||V.state)&&(0,x.jsx)("div",{children:[V.city,V.state,V.postalCode].filter(Boolean).join(", ")}),V.phone&&(0,x.jsxs)("div",{children:["Tel: ",V.phone]}),V.businessRegistration&&(0,x.jsxs)("div",{children:["Reg No: ",V.businessRegistration]})]})]}),(0,x.jsx)(D,{children:"DAILY SETTLEMENT"}),(0,x.jsxs)($,{children:[(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"Date:"}),(0,x.jsx)(z,{children:N(Z)})]}),(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"Printed:"}),(0,x.jsx)(z,{children:ge})]})]}),(0,x.jsx)(L,{style_type:"double"}),(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"SALES SUMMARY"}),(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"Gross Sales"}),(0,x.jsx)(z,{children:(0,d.vv)((null===re||void 0===re?void 0:re.grossSales)||0,U)})]}),((null===re||void 0===re?void 0:re.totalDiscount)||0)>0&&(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"(-) Discount"}),(0,x.jsx)(z,{children:(0,d.vv)(re.totalDiscount,U)})]}),((null===re||void 0===re?void 0:re.totalCouponDiscount)||0)>0&&(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"(-) Coupon Discount"}),(0,x.jsx)(z,{children:(0,d.vv)(re.totalCouponDiscount,U)})]}),((null===re||void 0===re?void 0:re.totalPointDiscount)||0)>0&&(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"(-) Point Discount"}),(0,x.jsx)(z,{children:(0,d.vv)(re.totalPointDiscount,U)})]}),((null===re||void 0===re?void 0:re.totalTakeawayCharge)||0)>0&&(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"(+) Takeaway Charge"}),(0,x.jsx)(z,{children:(0,d.vv)(re.totalTakeawayCharge,U)})]}),((null===re||void 0===re?void 0:re.totalDeliveryFee)||0)>0&&(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"(+) Delivery Fee"}),(0,x.jsx)(z,{children:(0,d.vv)(re.totalDeliveryFee,U)})]}),((null===re||void 0===re?void 0:re.totalServiceCharge)||0)>0&&(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"(+) Service Charge"}),(0,x.jsx)(z,{children:(0,d.vv)(re.totalServiceCharge,U)})]}),((null===re||void 0===re?void 0:re.totalTax)||0)>0&&(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"(+) Tax"}),(0,x.jsx)(z,{children:(0,d.vv)(re.totalTax,U)})]}),(0,x.jsxs)(T,{total:!0,children:[(0,x.jsx)(B,{children:"NET SALES"}),(0,x.jsx)(z,{children:(0,d.vv)((null===re||void 0===re?void 0:re.netSales)||0,U)})]}),(0,x.jsx)(L,{style_type:"dashed"}),(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"Total Orders"}),(0,x.jsx)(z,{children:oe})]}),(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"Avg Order Value"}),(0,x.jsx)(z,{children:(0,d.vv)(ae,U)})]}),((null===re||void 0===re?void 0:re.cancelledOrders)||0)>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(L,{style_type:"dashed"}),(0,x.jsxs)(T,{negative:!0,children:[(0,x.jsx)(B,{children:"Cancelled Orders"}),(0,x.jsx)(M,{children:re.cancelledOrders}),(0,x.jsx)(z,{children:(0,d.vv)(re.cancelledAmount,U)})]})]}),((null===re||void 0===re?void 0:re.outstandingOrders)||0)>0&&(0,x.jsxs)(T,{negative:!0,children:[(0,x.jsx)(B,{children:"Outstanding Orders"}),(0,x.jsx)(M,{children:re.outstandingOrders}),(0,x.jsx)(z,{children:(0,d.vv)(re.outstandingAmount,U)})]})]}),(0,x.jsx)(L,{style_type:"double"}),se.length>0&&(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"PAYMENT SETTLEMENT"}),se.map(e=>(0,x.jsxs)(i.Fragment,{children:[(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:(0,l._M)(e.method,q||void 0)}),(0,x.jsxs)(M,{children:["x",e.orders]}),(0,x.jsx)(z,{children:(0,d.vv)(e.revenue,U)})]}),"card"===e.method&&de.length>0&&de.map((e,t)=>(0,x.jsxs)(T,{indent:!0,children:[(0,x.jsxs)(B,{children:[t<de.length-1?"\u251c":"\u2514"," ",h[e.type]||e.type]}),(0,x.jsxs)(M,{children:["x",e.orders]}),(0,x.jsx)(z,{children:(0,d.vv)(e.revenue,U)})]},e.type))]},e.method)),(0,x.jsxs)(T,{total:!0,children:[(0,x.jsx)(B,{children:"TOTAL COLLECTED"}),(0,x.jsx)(z,{children:(0,d.vv)(ue,U)})]})]}),(0,x.jsx)(L,{}),xe.length>0&&(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"ORDER SOURCE"}),xe.map(e=>(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:c[e.source]||e.source}),(0,x.jsxs)(M,{children:["x",e.orders]}),(0,x.jsx)(z,{children:(0,d.vv)(e.revenue,U)})]},e.source))]}),(0,x.jsx)(L,{}),le.length>0&&(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"ORDER TYPE"}),le.map(e=>(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:p[e.type]||e.type}),(0,x.jsxs)(M,{children:["x",e.orders]}),(0,x.jsx)(z,{children:(0,d.vv)(e.revenue,U)})]},e.type))]}),(0,x.jsx)(L,{}),pe.length>0&&(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"SALES BY CATEGORY"}),pe.map(e=>(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:e.category}),(0,x.jsxs)(M,{children:[e.quantity,"qty"]}),(0,x.jsx)(z,{children:(0,d.vv)(e.revenue,U)})]},e.category)),(0,x.jsxs)(T,{bold:!0,children:[(0,x.jsx)(B,{children:"Total"}),(0,x.jsxs)(M,{children:[pe.reduce((e,t)=>e+t.quantity,0),"qty"]}),(0,x.jsx)(z,{children:(0,d.vv)(pe.reduce((e,t)=>e+t.revenue,0),U)})]})]}),ce.length>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(L,{style_type:"dashed"}),(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"TOP SELLING ITEMS"}),ce.map((e,t)=>(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:e.name}),(0,x.jsxs)(M,{children:["x",e.quantity]}),(0,x.jsx)(z,{children:(0,d.vv)(e.revenue,U)})]},`${e.name}-${t}`))]})]}),he.orders>0&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(L,{}),(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"STAFF MEALS (NON-REVENUE)"}),(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"Staff Meal Orders"}),(0,x.jsx)(z,{children:he.orders})]}),(0,x.jsxs)(T,{children:[(0,x.jsx)(B,{children:"Staff Meal Value"}),(0,x.jsx)(z,{children:(0,d.vv)(he.revenue,U)})]})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)("div",{children:"--- End of Daily Settlement ---"}),(0,x.jsx)("div",{children:V.name})]})]}):(0,x.jsxs)(I,{children:["No sales data for ",N(Z)]}),!Q&&J&&oe>0&&(0,x.jsxs)(w,{className:"no-print",children:[(0,x.jsx)(F,{onClick:_,children:"Close"}),(0,x.jsxs)(F,{primary:!0,onClick:()=>{window.print()},children:[(0,x.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,x.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Print"]})]})]}),(0,x.jsx)("style",{children:"\n        @media print {\n          @page {\n            size: 80mm auto;\n            margin: 0mm;\n          }\n\n          body {\n            margin: 0;\n            padding: 0;\n            background: white;\n          }\n\n          body > *:not([data-print-bill]) {\n            display: none !important;\n          }\n\n          .no-print {\n            display: none !important;\n          }\n\n          [data-print-bill] {\n            display: block !important;\n            width: 80mm !important;\n            max-width: 80mm !important;\n            margin: 0 !important;\n            padding: 5mm !important;\n            background: white !important;\n          }\n\n          [data-print-bill] button {\n            display: none !important;\n          }\n        }\n      "})]}),document.body)}},8012:(e,t,n)=>{n.d(t,{Ay:()=>d});n(9950);var i=n(4752),r=n(4414);const o=i.Ay.div`
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