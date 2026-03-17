"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2044],{512:(e,r,t)=>{t.d(r,{x:()=>$,A:()=>I});var n=t(9950),s=t(4752),i=t(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],d=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[r,t,n]=e.split("-").map(Number);return new Date(r,t-1,n)},a=(e,r)=>e.getFullYear()===r.getFullYear()&&e.getMonth()===r.getMonth()&&e.getDate()===r.getDate(),c=(e,r)=>new Date(e,r).toLocaleDateString("en-US",{month:"long",year:"numeric"}),h=s.Ay.div`
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
`,p=s.Ay.div`
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
`,u=s.Ay.button`
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
`,f=s.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,b=s.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,F=s.Ay.div`
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
`,A=s.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,S=s.Ay.div`
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
`,C=e=>{let{startDate:r,endDate:t,onRangeSelect:s,onClose:C,isOpen:E}=e;const $=new Date,[B,D]=(0,n.useState)($.getMonth()),[M,O]=(0,n.useState)($.getFullYear()),[T,I]=(0,n.useState)(null),[R,z]=(0,n.useState)(null),[P,_]=(0,n.useState)(null),[L,N]=(0,n.useState)("start"),W=(0,n.useRef)(null);(0,n.useEffect)(()=>{r&&I(l(r)),t&&z(l(t))},[r,t]),(0,n.useEffect)(()=>{E&&N("start")},[E]),(0,n.useEffect)(()=>{const e=e=>{W.current&&!W.current.contains(e.target)&&C()};return E&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[E,C]);const H=(0,n.useCallback)(()=>{0===B?(D(11),O(e=>e-1)):D(e=>e-1)},[B]),V=(0,n.useCallback)(()=>{11===B?(D(0),O(e=>e+1)):D(e=>e+1)},[B]),Y=(e,r)=>{const t=((e,r)=>new Date(e,r+1,0).getDate())(e,r),n=((e,r)=>new Date(e,r,1).getDay())(e,r),l=[];for(let s=0;s<n;s++)l.push(null);for(let s=1;s<=t;s++)l.push(new Date(e,r,s));return(0,i.jsxs)(f,{children:[(0,i.jsx)(b,{children:c(e,r)}),(0,i.jsx)(F,{children:o.map(e=>(0,i.jsx)(k,{children:e},e))}),(0,i.jsx)(w,{children:l.map((e,r)=>{if(!e)return(0,i.jsx)(A,{},`e-${r}`);const{isStart:t,isEnd:n,isInRange:o,isHoverEnd:l}=(e=>{const r=T&&a(e,T),t=R&&a(e,R),n="end"===L&&P?P:R;let s=!1;if(T&&n){const[r,t]=T<=n?[T,n]:[n,T];s=((e,r,t)=>{const n=e.getTime();return n>r.getTime()&&n<t.getTime()})(e,r,t)}return{isStart:r,isEnd:t,isInRange:s,isHoverEnd:"end"===L&&P&&a(e,P)}})(e),c=a(e,$);return(0,i.jsx)(S,{$isStart:!!t,$isEnd:!!n,$isInRange:o,$isHoverEnd:!!l,$isToday:c,onClick:()=>(e=>{if("start"===L)I(e),z(null),N("end");else{let r=T,t=e;t<r&&([r,t]=[t,r]),I(r),z(t),N("start"),s(d(r),d(t)),setTimeout(C,200)}})(e),onMouseEnter:()=>_(e),onMouseLeave:()=>_(null),children:e.getDate()},e.getTime())})})]})},U=11===B?0:B+1,q=11===B?M+1:M,K=e=>{const r=new Date;let t;const n=r;switch(e){case"this_week":t=new Date(r),t.setDate(r.getDate()-r.getDay());break;case"this_month":t=new Date(r.getFullYear(),r.getMonth(),1);break;case"this_year":t=new Date(r.getFullYear(),0,1);break;default:return}I(t),z(n),N("start"),s(d(t),d(n)),setTimeout(C,150)};return E?(0,i.jsx)(h,{ref:W,children:(0,i.jsxs)(x,{children:[(0,i.jsxs)(p,{children:[(0,i.jsx)(u,{onClick:()=>K("this_week"),children:"This Week"}),(0,i.jsx)(u,{onClick:()=>K("this_month"),children:"This Month"}),(0,i.jsx)(u,{onClick:()=>K("this_year"),children:"This Year"})]}),(0,i.jsxs)(g,{children:[(0,i.jsxs)(m,{children:[(0,i.jsx)(v,{onClick:H,"aria-label":"Previous month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,i.jsx)(v,{onClick:V,"aria-label":"Next month",children:(0,i.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,i.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,i.jsxs)(j,{children:[Y(M,B),(0,i.jsx)(y,{children:Y(q,U)})]})]})]})}):null},E=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,$=(e,r)=>{const t=(e=>{if(!e)return new Date;try{const r=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[t,n,s]=r.split("-").map(Number);return new Date(t,n-1,s)}catch{return new Date}})(r);let n=new Date(t);const s=new Date(t);switch(e){case"today":break;case"week":n.setDate(t.getDate()-6);break;case"month":n.setDate(t.getDate()-29);break;case"year":n.setDate(t.getDate()-364);break;case"all":n=new Date(2020,0,1)}return{start:E(n),end:E(s)}},B=s.Ay.div`
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
`,T=s.Ay.button`
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
`,I=e=>{let{activePeriod:r,dateRange:t,isCustomDateRange:s,onPeriodChange:o,onCalendarRangeSelect:d,includeToday:l=!1,children:a}=e;const[c,h]=(0,n.useState)(!1),x=l?["today","week","month","year","all"]:["week","month","year","all"],p={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,i.jsx)(B,{children:(0,i.jsxs)(D,{children:[x.map(e=>(0,i.jsx)(M,{active:r===e&&!s,onClick:()=>o(e),children:p[e]},e)),(0,i.jsxs)(O,{children:[(0,i.jsxs)(T,{active:s,onClick:()=>h(!c),children:[(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,i.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,i.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,i.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),t.start&&t.end?`${t.start} ~ ${t.end}`:"Custom Range"]}),(0,i.jsx)(C,{isOpen:c,startDate:t.start,endDate:t.end,onRangeSelect:(e,r)=>{d(e,r),h(!1)},onClose:()=>h(!1)})]}),a]})})}},2044:(e,r,t)=>{t.r(r),t.d(r,{default:()=>Ae});var n=t(9950),s=t(4752),i=t(8409),o=t(2597),d=t(2653),l=t(1367),a=t(9018),c=t(6038);const h=e=>{if(null===e||void 0===e)return"";const r=String(e);return r.includes(",")||r.includes('"')||r.includes("\n")||r.includes("\r")?`"${r.replace(/"/g,'""')}"`:r},x=e=>e.map(h).join(",");var p=t(1095),u=t(2847),g=t(3245),m=t(158),v=t(3440),j=t(2174),y=t(4915),f=t(7621),b=t(5297),F=t(2528),k=t(294),w=t(3588),A=t(8012),S=t(512),C=t(7119),E=t(8285),$=t(4414);const B={dine_in:"Dine In","dine-in":"Dine In",takeaway:"Takeaway",pickup:"Pickup",delivery:"Delivery"},D={visa:"Visa",master:"Mastercard",amex:"Amex",other:"Other"},M=s.Ay.div`
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
`,O=s.Ay.div`
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
`,T=s.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;

  @media print {
    display: none;
  }
`,I=s.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,R=s.Ay.button`
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
`,z=s.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  flex-wrap: wrap;

  @media print {
    display: none;
  }
`,P=s.Ay.button`
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
`,_=s.Ay.input`
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
`,L=s.Ay.div`
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  justify-content: flex-end;

  @media print {
    display: none;
  }
`,N=s.Ay.button`
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
`,W=s.Ay.div`
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
`,H=s.Ay.div`
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 2px solid #1F2937;
`,V=s.Ay.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 4px;

  @media print {
    font-size: 14px;
  }
`,Y=s.Ay.div`
  font-size: 11px;
  color: #4B5563;
  line-height: 1.4;

  @media print {
    font-size: 10px;
    color: #1F2937;
  }
`,U=s.Ay.div`
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
`,q=s.Ay.div`
  margin-bottom: 12px;
`,K=s.Ay.div`
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px dashed #9CA3AF;

  @media print {
    font-size: 11px;
  }
`,G=s.Ay.div`
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
`,Z=s.Ay.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 8px;
`,J=s.Ay.span`
  text-align: right;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`,Q=s.Ay.span`
  text-align: right;
  white-space: nowrap;
  min-width: 36px;
  color: #6B7280;

  @media print {
    color: #1F2937;
  }
`,X=s.Ay.div`
  border-bottom: ${e=>"double"===e.style_type?"3px double #1F2937":"solid"===e.style_type?"1px solid #9CA3AF":"1px dashed #9CA3AF"};
  margin: 8px 0;
`,ee=s.Ay.div`
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
`,re=s.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,te=s.Ay.div`
  text-align: center;
  padding: 60px 24px;
  color: #6B7C93;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`,ne=e=>(new Date).toLocaleDateString("en-CA",{timeZone:e}),se=e=>{const[r,t,n]=e.split("-");return`${parseInt(n)} ${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][parseInt(t)-1]} ${r}`},ie=e=>0===e?"12AM":12===e?"12PM":e>12?e-12+"PM":`${e}AM`,oe=e=>{var r,t;let{isOpen:s,onClose:i}=e;const{user:o}=(0,l.As)(),{storeSettings:d,operationSettings:h}=(0,a.Pj)(),x=h.timeZone||"Asia/Kuala_Lumpur",p=h.currency,[u,g]=(0,n.useState)(ne(x)),[m,v]=(0,n.useState)(null),[j,y]=(0,n.useState)(!1),f=(0,n.useCallback)(async e=>{if(null===o||void 0===o||!o.restaurantId)return;const r=localStorage.getItem("auth_token");if(r){y(!0);try{const t=await fetch(`/api/dashboard/restaurant/${o.restaurantId}/reports-summary?startDate=${e}&endDate=${e}`,{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();e.success&&v(e.data)}}catch(t){console.error("Error fetching settlement data:",t)}finally{y(!1)}}},[null===o||void 0===o?void 0:o.restaurantId]);(0,n.useEffect)(()=>{s&&f(u)},[s,u,f]);const b=e=>{g(e)};if(!s)return null;const F=ne(x),k=(e=>{const r=new Date;return r.setDate(r.getDate()-1),r.toLocaleDateString("en-CA",{timeZone:e})})(x),w=(null===m||void 0===m||null===(r=m.summary)||void 0===r?void 0:r.totalRevenue)||0,A=(null===m||void 0===m||null===(t=m.summary)||void 0===t?void 0:t.totalOrders)||0,S=A>0?w/A:0,oe=((null===m||void 0===m?void 0:m.paymentMethodSales)||[]).filter(e=>e.orders>0).sort((e,r)=>r.revenue-e.revenue),de=((null===m||void 0===m?void 0:m.cardTypeSales)||[]).filter(e=>e.orders>0).sort((e,r)=>r.revenue-e.revenue),le=((null===m||void 0===m?void 0:m.orderTypeSales)||[]).filter(e=>e.orders>0).sort((e,r)=>r.revenue-e.revenue),ae=((null===m||void 0===m?void 0:m.categorySales)||[]).filter(e=>e.revenue>0).sort((e,r)=>r.revenue-e.revenue),ce=((null===m||void 0===m?void 0:m.menuSales)||[]).filter(e=>e.quantity>0).sort((e,r)=>r.quantity-e.quantity).slice(0,15),he=((null===m||void 0===m?void 0:m.hourlySales)||[]).filter(e=>e.orders>0).sort((e,r)=>e.hour-r.hour),xe=(null===m||void 0===m?void 0:m.staffMeal)||{revenue:0,orders:0},pe=w,ue=(new Date).toLocaleString("en-GB",{timeZone:x,day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0});return C.createPortal((0,$.jsxs)(M,{onClick:e=>{e.target===e.currentTarget&&i()},children:[(0,$.jsxs)(O,{onClick:e=>e.stopPropagation(),children:[(0,$.jsxs)(T,{className:"no-print",children:[(0,$.jsx)(I,{children:"Daily Settlement Report"}),(0,$.jsx)(R,{onClick:i,children:"\xd7"})]}),(0,$.jsxs)(z,{className:"no-print",children:[(0,$.jsx)(P,{active:u===F,onClick:()=>b(F),children:"Today"}),(0,$.jsx)(P,{active:u===k,onClick:()=>b(k),children:"Yesterday"}),(0,$.jsx)(_,{type:"date",value:u,max:F,onChange:e=>b(e.target.value)})]}),j?(0,$.jsx)(re,{children:"Loading settlement data..."}):m&&0!==A?(0,$.jsxs)(W,{"data-print-bill":!0,children:[(0,$.jsxs)(H,{children:[(0,$.jsx)(V,{children:d.name}),(0,$.jsxs)(Y,{children:[d.address&&(0,$.jsx)("div",{children:d.address}),(d.city||d.state)&&(0,$.jsx)("div",{children:[d.city,d.state,d.postalCode].filter(Boolean).join(", ")}),d.phone&&(0,$.jsxs)("div",{children:["Tel: ",d.phone]}),d.businessRegistration&&(0,$.jsxs)("div",{children:["Reg No: ",d.businessRegistration]})]})]}),(0,$.jsx)(U,{children:"DAILY SETTLEMENT"}),(0,$.jsxs)(q,{children:[(0,$.jsxs)(G,{children:[(0,$.jsx)(Z,{children:"Date:"}),(0,$.jsx)(J,{children:se(u)})]}),(0,$.jsxs)(G,{children:[(0,$.jsx)(Z,{children:"Printed:"}),(0,$.jsx)(J,{children:ue})]})]}),(0,$.jsx)(X,{style_type:"double"}),(0,$.jsxs)(q,{children:[(0,$.jsx)(K,{children:"SALES SUMMARY"}),(0,$.jsxs)(G,{children:[(0,$.jsx)(Z,{children:"Total Orders"}),(0,$.jsx)(J,{children:A})]}),(0,$.jsxs)(G,{children:[(0,$.jsx)(Z,{children:"Avg Order Value"}),(0,$.jsx)(J,{children:(0,c.vv)(S,p)})]}),(0,$.jsxs)(G,{total:!0,children:[(0,$.jsx)(Z,{children:"TOTAL REVENUE"}),(0,$.jsx)(J,{children:(0,c.vv)(pe,p)})]})]}),(0,$.jsx)(X,{}),oe.length>0&&(0,$.jsxs)(q,{children:[(0,$.jsx)(K,{children:"PAYMENT METHODS"}),oe.map(e=>(0,$.jsxs)(G,{children:[(0,$.jsx)(Z,{children:(0,E._M)(e.method)}),(0,$.jsxs)(Q,{children:["x",e.orders]}),(0,$.jsx)(J,{children:(0,c.vv)(e.revenue,p)})]},e.method))]}),de.length>0&&(0,$.jsxs)(q,{children:[(0,$.jsx)(K,{children:"CARD BREAKDOWN"}),de.map(e=>(0,$.jsxs)(G,{children:[(0,$.jsx)(Z,{children:D[e.type]||e.type}),(0,$.jsxs)(Q,{children:["x",e.orders]}),(0,$.jsx)(J,{children:(0,c.vv)(e.revenue,p)})]},e.type))]}),(0,$.jsx)(X,{}),le.length>0&&(0,$.jsxs)(q,{children:[(0,$.jsx)(K,{children:"ORDER TYPES"}),le.map(e=>(0,$.jsxs)(G,{children:[(0,$.jsx)(Z,{children:B[e.type]||e.type}),(0,$.jsxs)(Q,{children:["x",e.orders]}),(0,$.jsx)(J,{children:(0,c.vv)(e.revenue,p)})]},e.type))]}),(0,$.jsx)(X,{}),ae.length>0&&(0,$.jsxs)(q,{children:[(0,$.jsx)(K,{children:"SALES BY CATEGORY"}),ae.map(e=>(0,$.jsxs)(G,{children:[(0,$.jsx)(Z,{children:e.category}),(0,$.jsxs)(Q,{children:[e.quantity,"qty"]}),(0,$.jsx)(J,{children:(0,c.vv)(e.revenue,p)})]},e.category)),(0,$.jsxs)(G,{bold:!0,children:[(0,$.jsx)(Z,{children:"Total"}),(0,$.jsxs)(Q,{children:[ae.reduce((e,r)=>e+r.quantity,0),"qty"]}),(0,$.jsx)(J,{children:(0,c.vv)(ae.reduce((e,r)=>e+r.revenue,0),p)})]})]}),(0,$.jsx)(X,{}),ce.length>0&&(0,$.jsxs)(q,{children:[(0,$.jsx)(K,{children:"TOP SELLING ITEMS"}),ce.map((e,r)=>(0,$.jsxs)(G,{children:[(0,$.jsx)(Z,{children:e.name}),(0,$.jsxs)(Q,{children:["x",e.quantity]}),(0,$.jsx)(J,{children:(0,c.vv)(e.revenue,p)})]},`${e.name}-${r}`))]}),(0,$.jsx)(X,{}),he.length>0&&(0,$.jsxs)(q,{children:[(0,$.jsx)(K,{children:"HOURLY BREAKDOWN"}),he.map(e=>(0,$.jsxs)(G,{children:[(0,$.jsxs)(Z,{children:[ie(e.hour)," - ",ie(e.hour+1)]}),(0,$.jsxs)(Q,{children:["x",e.orders]}),(0,$.jsx)(J,{children:(0,c.vv)(e.revenue,p)})]},e.hour))]}),xe.orders>0&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(X,{}),(0,$.jsxs)(q,{children:[(0,$.jsx)(K,{children:"STAFF MEALS (EXCLUDED FROM REVENUE)"}),(0,$.jsxs)(G,{children:[(0,$.jsx)(Z,{children:"Staff Meal Orders"}),(0,$.jsx)(J,{children:xe.orders})]}),(0,$.jsxs)(G,{children:[(0,$.jsx)(Z,{children:"Staff Meal Value"}),(0,$.jsx)(J,{children:(0,c.vv)(xe.revenue,p)})]})]})]}),(0,$.jsx)(X,{style_type:"double"}),(0,$.jsxs)(G,{total:!0,children:[(0,$.jsx)(Z,{children:"NET SALES"}),(0,$.jsx)(J,{children:(0,c.vv)(pe,p)})]}),(0,$.jsxs)(G,{children:[(0,$.jsx)(Z,{children:"Total Transactions"}),(0,$.jsx)(J,{children:A})]}),(0,$.jsxs)(ee,{children:[(0,$.jsx)("div",{children:"--- End of Daily Settlement ---"}),(0,$.jsx)("div",{children:d.name})]})]}):(0,$.jsxs)(te,{children:["No sales data for ",se(u)]}),!j&&m&&A>0&&(0,$.jsxs)(L,{className:"no-print",children:[(0,$.jsx)(N,{onClick:i,children:"Close"}),(0,$.jsxs)(N,{primary:!0,onClick:()=>{window.print()},children:[(0,$.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,$.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Print"]})]})]}),(0,$.jsx)("style",{children:"\n        @media print {\n          @page {\n            size: 80mm auto;\n            margin: 0mm;\n          }\n\n          body {\n            margin: 0;\n            padding: 0;\n            background: white;\n          }\n\n          body > *:not([data-print-bill]) {\n            display: none !important;\n          }\n\n          .no-print {\n            display: none !important;\n          }\n\n          [data-print-bill] {\n            display: block !important;\n            width: 80mm !important;\n            max-width: 80mm !important;\n            margin: 0 !important;\n            padding: 5mm !important;\n            background: white !important;\n          }\n\n          [data-print-bill] button {\n            display: none !important;\n          }\n        }\n      "})]}),document.body)},de=s.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,le=s.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,ae=i.MD,ce=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,he=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,xe=s.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,pe=s.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`,ue=s.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,ge=s.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,me=s.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,ve=s.Ay.div`
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
`,je=s.Ay.tr`
  background: ${e=>0===e.level?"#FAFBFC":1===e.level?"#FFFFFF":"#F8FAFC"};
  cursor: ${e=>e.clickable?"pointer":"default"};
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.clickable?"#F6F9FC":"inherit"};
  }
`,ye=s.Ay.td`
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #F3F4F6;
  font-size: 13px;
  color: ${e=>e.bold?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.bold?600:400};
  padding-left: ${e=>e.level?16+24*e.level+"px":"16px"};
`,fe=s.Ay.span`
  display: inline-block;
  margin-right: 8px;
  transition: transform 0.2s;
  transform: ${e=>e.expanded?"rotate(90deg)":"rotate(0deg)"};
  color: #6B7280;
`,be=s.Ay.button`
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
`,Fe=s.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,ke=s.Ay.div`
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
`,we=["#635BFF","#00D924","#FF6B6B","#FFB800","#0EA5E9","#8B5CF6"],Ae=()=>{var e,r,t,s,C,E;const{user:B}=(0,l.As)(),{operationSettings:D}=(0,a.Pj)(),[M,O]=(0,d.M)("sales"),[T,I]=(0,n.useState)("month"),[R,z]=(0,n.useState)(()=>(0,S.x)("month")),[P,_]=(0,n.useState)(!1),[,L]=(0,n.useState)([]),[N,W]=(0,n.useState)(!0),[H,V]=(0,n.useState)(!1),[Y,U]=(0,n.useState)(null),[q,K]=(0,n.useState)([]),[,G]=(0,n.useState)([]),[,Z]=(0,n.useState)([]),[J,Q]=(0,n.useState)(null),[X,ee]=(0,n.useState)(!1),[re,te]=(0,n.useState)("all"),[ne,se]=(0,n.useState)(new Set),[ie,Ae]=(0,n.useState)(new Set),Se=(0,n.useMemo)(()=>{if(null===J||void 0===J||!J.dailySales||0===J.dailySales.length)return[];const e=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];if("today"===T)return J.hourlySales?J.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{date:12===r?"12PM":r>12?r-12+"PM":0===r?"12AM":`${r}AM`,sales:Math.round(e.revenue)}}):[];if("week"===T)return J.dailySales.map(r=>{const t=new Date(r.date);return{date:e[t.getDay()],sales:Math.round(r.revenue)}});if("month"===T)return J.dailySales.map(e=>{const[,r,t]=e.date.split("-");return{date:`${r}/${t}`,sales:Math.round(e.revenue)}});{const e=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],r={};return J.dailySales.forEach(t=>{const n=parseInt(t.date.split("-")[1])-1,s=e[n];r[s]=(r[s]||0)+t.revenue}),e.map(e=>({date:e,sales:Math.round(r[e]||0)}))}},[J,T]),Ce=(0,n.useMemo)(()=>{var e;return(null===J||void 0===J||null===(e=J.summary)||void 0===e?void 0:e.totalRevenue)||0},[J]),Ee=(0,n.useMemo)(()=>{var e;return(null===J||void 0===J||null===(e=J.summary)||void 0===e?void 0:e.totalOrders)||0},[J]),$e=(0,n.useMemo)(()=>{if(null===J||void 0===J||!J.categorySales||0===J.categorySales.length)return[{name:"No Data",value:100,sales:0}];const e=J.categorySales.reduce((e,r)=>e+r.revenue,0);return J.categorySales.map(r=>({name:r.category,value:e>0?Math.round(r.revenue/e*100):0,sales:Math.round(r.revenue)}))},[J]),Be=(0,n.useMemo)(()=>{var e;if(null===J||void 0===J||!J.menuSales||0===J.menuSales.length)return[];const r=(null===(e=J.menuSales[0])||void 0===e?void 0:e.quantity)||1;return J.menuSales.map(e=>({name:e.name,category:e.category,price:e.quantity>0?e.revenue/e.quantity:0,orders:e.quantity,revenue:Math.round(e.revenue),performance:Math.round(e.quantity/r*100)}))},[J]),De=(0,n.useMemo)(()=>null!==J&&void 0!==J&&J.hourlySales?J.hourlySales.filter(e=>e.orders>0).map(e=>{const r=e.hour;return{hour:0===r?"12AM":12===r?"12PM":r>12?r-12+"PM":`${r}AM`,orders:e.orders}}):[],[J]),Me=(0,n.useMemo)(()=>q.map(e=>({...e,period_orders:e.total_orders||0,period_spent:e.total_spent||0})).sort((e,r)=>r.period_spent-e.period_spent),[q]),Oe=(0,n.useMemo)(()=>{if(null===J||void 0===J||!J.hourlySales)return{completionRate:0,avgPrepTime:0,peakHour:"N/A",peakHourOrders:0,totalOrdersInPeak:0};let e=12,r=0;J.hourlySales.forEach(t=>{t.orders>r&&(r=t.orders,e=t.hour)});return{completionRate:100,avgPrepTime:0,peakHour:(e=>{const r=(e+1)%24,t=e=>0===e?"12AM":12===e?"12PM":e>12?e-12+"PM":`${e}AM`;return`${t(e)}-${t(r)}`})(e),peakHourOrders:r,totalOrdersInPeak:r}},[J]),Te=(0,n.useCallback)(async()=>{if(null===B||void 0===B||!B.restaurantId)return console.log("\u274c No restaurant ID found"),void W(!1);try{const e=localStorage.getItem("auth_token");if(!e)return console.error("\u274c No auth token found"),void W(!1);const[r,t,n]=await Promise.all([fetch(`/api/dashboard/restaurant/${B.restaurantId}/stats`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/customers/${B.restaurantId}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),fetch(`/api/menu?restaurantId=${B.restaurantId}&excludeImage=true`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}})]);if(r.ok){const e=await r.json();U(e.data||e)}if(t.ok){const e=await t.json();e.success&&Array.isArray(e.data)&&K(e.data)}if(n.ok){const e=await n.json();e.success&&e.data&&(e.data.items&&G(e.data.items),e.data.categories&&Z(e.data.categories))}}catch(e){console.error("\u274c Error fetching static data:",e)}finally{W(!1)}},[null===B||void 0===B?void 0:B.restaurantId]),Ie=(0,n.useCallback)(async()=>{if(null===B||void 0===B||!B.restaurantId)return;const e=localStorage.getItem("auth_token");if(e){V(!0);try{const r=new URLSearchParams({startDate:R.start,endDate:R.end}),t=await fetch(`/api/dashboard/restaurant/${B.restaurantId}/reports-summary?${r.toString()}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();e.success&&(Q(e.data),L([]))}}catch(r){console.error("\u274c Error fetching reports summary:",r)}finally{V(!1)}}},[null===B||void 0===B?void 0:B.restaurantId,R.start,R.end]);(0,n.useEffect)(()=>{Te()},[Te]),(0,n.useEffect)(()=>{Ie()},[Ie]);const Re=(0,n.useMemo)(()=>{var e;if(null===J||void 0===J||!J.hourlySales)return[];const r=(null===(e=J.summary)||void 0===e?void 0:e.totalOrders)||1;return J.hourlySales.filter(e=>e.orders>0).map(e=>{const t=e.hour;return{time:`${t.toString().padStart(2,"0")}:00-${((t+1)%24).toString().padStart(2,"0")}:00`,orders:e.orders,revenue:Math.round(e.revenue),efficiency:Math.min(100,Math.round(e.orders/(r/24)*100))}}).sort((e,r)=>r.orders-e.orders).slice(0,5)},[J]),ze={cash:"Cash",card:"Credit/Debit Card",ewallet:"E-Wallet",bank_transfer:"Bank Transfer",qr:"QR Payment",counter:"Pay at Counter",online:"Online Payment",fpx:"FPX Online Banking",points:"Points"},Pe={visa:"Visa",master:"Mastercard",amex:"Amex",other:"Other"},_e=(0,n.useMemo)(()=>null!==J&&void 0!==J&&J.paymentMethodSales?J.paymentMethodSales.sort((e,r)=>r.revenue-e.revenue):[],[J]),Le=(0,n.useMemo)(()=>null!==J&&void 0!==J&&J.cardTypeSales?"all"===re?J.cardTypeSales:J.cardTypeSales.filter(e=>e.type===re):[],[J,re]),Ne=(0,n.useMemo)(()=>null!==J&&void 0!==J&&J.cardTypeSales?J.cardTypeSales.map(e=>e.type):[],[J]),We=(0,n.useMemo)(()=>(null===J||void 0===J?void 0:J.staffMeal)||{revenue:0,orders:0},[J]),He=(0,n.useMemo)(()=>_e.reduce((e,r)=>e+r.revenue,0),[_e]),Ve=(0,n.useMemo)(()=>{if(null===J||void 0===J||!J.dailySales||0===J.dailySales.length)return{};const e={};return J.dailySales.forEach(r=>{const[t,n]=r.date.split("-"),s=`${t}-${n}`,i=r.date;e[t]||(e[t]={year:t,revenue:0,orders:0,months:{}}),e[t].months[s]||(e[t].months[s]={month:s,revenue:0,orders:0,days:{}}),e[t].months[s].days[i]||(e[t].months[s].days[i]={day:i,revenue:0,orders:0});const o=r.revenue,d=r.orders;e[t].revenue+=o,e[t].orders+=d,e[t].months[s].revenue+=o,e[t].months[s].orders+=d,e[t].months[s].days[i].revenue+=o,e[t].months[s].days[i].orders+=d}),e},[J]),Ye=()=>{const e=new Date(R.start),r=new Date(R.end);return Math.ceil((r.getTime()-e.getTime())/864e5)};(()=>{const e=Ye()})();n.useEffect(()=>{const e=Ye();if(e<=31){const e=new Set(Object.keys(Ve)),r=new Set;Object.keys(Ve).forEach(e=>{Object.keys(Ve[e].months).forEach(t=>{r.add(`${e}-${t}`)})}),se(e),Ae(r)}else if(e<=365){const e=new Set(Object.keys(Ve));se(e),Ae(new Set)}else se(new Set),Ae(new Set)},[R.start,R.end,Ee]);const Ue=e=>{I(e),_(!1),z((0,S.x)(e,D.timeZone))},qe=(e,r)=>{_(!0),I("all"),z({start:e,end:r})},Ke=function(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return e.toFixed(r)},Ge=(0,n.useCallback)(()=>{const e=["Date,Revenue"];return Se.forEach(r=>{e.push(`${h(r.date)},${Ke(r.sales)}`)}),e.join("\n")},[Se]),Ze=(0,n.useCallback)(()=>{const e=["Date,Revenue,Orders,Avg_Order_Value"];return Object.keys(Ve).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=Ve[r];Object.keys(t.months).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const n=t.months[r];Object.keys(n.days).sort((e,r)=>r.localeCompare(e)).forEach(r=>{const t=n.days[r],s=t.orders>0?t.revenue/t.orders:0;e.push(`${r},${Ke(t.revenue)},${t.orders},${Ke(s)}`)})})}),e.join("\n")},[Ve]),Je=(0,n.useCallback)(()=>{const e=["Rank,Item_Name,Category,Unit_Price,Qty_Sold,Revenue"];return Be.forEach((r,t)=>{e.push(x([t+1,r.name,r.category,Ke(r.price),r.orders,Ke(r.revenue)]))}),e.join("\n")},[Be]),Qe=(0,n.useCallback)(()=>{const e=["Rank,Name,Phone,Type,Total_Orders,Total_Spent,Points,Tier"];return[...Me].sort((e,r)=>(r.period_spent||0)-(e.period_spent||0)).forEach((r,t)=>{var n,s,i;e.push(x([t+1,(null===(n=r.customer)||void 0===n?void 0:n.name)||"Guest",(null===(s=r.customer)||void 0===s?void 0:s.phone)||"-","member"===(null===(i=r.customer)||void 0===i?void 0:i.type)?"Member":"Guest",r.period_orders||0,Ke(r.period_spent||0),r.points||0,r.loyalty_tier||"Bronze"]))}),e.join("\n")},[Me]),Xe=(0,n.useCallback)(()=>{const e=["Time_Slot,Orders,Revenue"];return Re.forEach(r=>{e.push(x([r.time,r.orders,Ke(r.revenue)]))}),e.join("\n")},[Re]),er=(0,n.useCallback)(()=>{const e=["Payment_Method,Orders,Revenue,Percentage"];return _e.forEach(r=>{const t=He>0?(r.revenue/He*100).toFixed(1):"0.0";e.push(x([ze[r.method]||r.method,r.orders,Ke(r.revenue),`${t}%`]))}),Le.length>0&&(e.push(""),e.push("Card_Type,Orders,Revenue"),Le.forEach(r=>{e.push(x([Pe[r.type]||r.type,r.orders,Ke(r.revenue)]))})),We.orders>0&&(e.push(""),e.push("Staff_Meal,Orders,Amount"),e.push(x(["Staff Meal (Excluded from revenue)",We.orders,Ke(We.revenue)]))),e.join("\n")},[_e,Le,We,He]),rr=(0,n.useCallback)(()=>{let e;switch(M){case"sales":default:e=Ge();break;case"details":e=Ze();break;case"menu":e=Je();break;case"customers":e=Qe();break;case"operations":e=Xe();break;case"payment":e=er()}var r,t,n,s,i,o;((e,r)=>{const t=new Blob(["\ufeff"+e],{type:"text/csv;charset=utf-8;"}),n=URL.createObjectURL(t),s=document.createElement("a");s.setAttribute("href",n),s.setAttribute("download",r),s.style.visibility="hidden",s.style.position="absolute",s.style.left="-9999px",document.body.appendChild(s),s.click(),setTimeout(()=>{URL.revokeObjectURL(n),document.body.removeChild(s)},150)})(e,(r=`purplepos_${(null===B||void 0===B?void 0:B.restaurantId)||"report"}`,t=M,n=T,s=P,i=R.start,o=R.end,`${r}_${t}_${s?`${i}_${o}`:n}_${(new Date).toISOString().split("T")[0]}.csv`))},[M,T,P,R,null===B||void 0===B?void 0:B.restaurantId,Ge,Ze,Je,Qe,Xe,er]),tr=()=>(0,$.jsx)(S.A,{activePeriod:T,dateRange:R,isCustomDateRange:P,onPeriodChange:Ue,onCalendarRangeSelect:qe,children:(0,$.jsxs)("div",{style:{display:"flex",gap:"8px",marginLeft:"auto"},children:[(0,$.jsxs)("button",{onClick:()=>ee(!0),style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",background:"#F6F9FC",color:"#0A2540",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"14px"},children:[(0,$.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,$.jsx)("path",{d:"M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Daily Settlement"]}),(0,$.jsxs)("button",{onClick:rr,style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 16px",background:"#F6F9FC",color:"#0A2540",border:"1px solid #E6EBF1",borderRadius:"6px",cursor:"pointer",fontSize:"14px"},children:[(0,$.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:{width:"16px",height:"16px"},children:(0,$.jsx)("path",{d:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Download"]})]})});return(0,$.jsxs)($.Fragment,{children:[(0,$.jsxs)(de,{children:[(0,$.jsx)(A.Ay,{title:"Reports"}),(0,$.jsxs)(le,{children:[(0,$.jsxs)(o.tU,{children:[(0,$.jsx)(o.oz,{active:"sales"===M,onClick:()=>O("sales"),children:"Sales Report"}),(0,$.jsx)(o.oz,{active:"details"===M,onClick:()=>O("details"),children:"Sales Details"}),(0,$.jsx)(o.oz,{active:"payment"===M,onClick:()=>O("payment"),children:"Payment Analysis"}),(0,$.jsx)(o.oz,{active:"menu"===M,onClick:()=>O("menu"),children:"Menu Analysis"}),(0,$.jsx)(o.oz,{active:"customers"===M,onClick:()=>O("customers"),children:"Customer Insights"}),(0,$.jsx)(o.oz,{active:"operations"===M,onClick:()=>O("operations"),children:"Operations"})]}),(0,$.jsxs)("div",{style:{display:"sales"===M?"block":"none"},children:[(0,$.jsx)(tr,{}),N||H?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Ee?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,$.jsxs)("div",{children:[(0,$.jsxs)(ae,{children:[(0,$.jsxs)(i.hI,{color:"#059669",children:[(0,$.jsx)(i.v0,{children:"Total Revenue"}),(0,$.jsx)(i.Os,{children:(0,c.vv)(Ce,D.currency)}),(0,$.jsxs)(i.d1,{children:[Ee," orders in selected period"]})]}),(0,$.jsxs)(i.hI,{color:"#2563EB",children:[(0,$.jsx)(i.v0,{children:"Total Orders"}),(0,$.jsx)(i.Os,{children:Ee.toLocaleString()}),(0,$.jsx)(i.d1,{children:"For selected period"})]}),(0,$.jsxs)(i.hI,{color:"#DC2626",children:[(0,$.jsx)(i.v0,{children:"Average Order Value"}),(0,$.jsx)(i.Os,{children:(0,c.vv)(Ee>0?Ce/Ee:0,D.currency)}),(0,$.jsx)(i.d1,{children:"Per order"})]}),(0,$.jsxs)(i.hI,{color:"#7C3AED",children:[(0,$.jsx)(i.v0,{children:"Completed Orders"}),(0,$.jsx)(i.Os,{children:Ee}),(0,$.jsx)(i.d1,{children:"100% completion rate"})]})]}),(0,$.jsxs)(ce,{children:[(0,$.jsxs)(he,{children:[(0,$.jsx)(xe,{children:"Revenue Trend"}),(0,$.jsx)(p.u,{width:"100%",height:300,children:(0,$.jsxs)(u.b,{data:Se,margin:{top:5,right:20,left:0,bottom:5},children:[(0,$.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,$.jsx)(m.W,{dataKey:"date",stroke:"#6B7C93",fontSize:12}),(0,$.jsx)(v.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,$.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,$.jsx)(y.N,{type:"monotone",dataKey:"sales",stroke:"#635BFF",strokeWidth:2,dot:{fill:"#635BFF",r:4}})]})})]}),(0,$.jsxs)(he,{children:[(0,$.jsx)(xe,{children:"Sales by Category"}),(0,$.jsx)(p.u,{width:"100%",height:300,children:(0,$.jsxs)(f.r,{children:[(0,$.jsx)(b.F,{data:$e,cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:$e.map((e,r)=>(0,$.jsx)(F.f,{fill:we[r%we.length]},`cell-${r}`))}),(0,$.jsx)(j.m,{formatter:e=>`${e}%`})]})})]})]}),(0,$.jsxs)(he,{children:[(0,$.jsx)(xe,{children:"Hourly Orders Distribution"}),(0,$.jsx)(p.u,{width:"100%",height:250,children:(0,$.jsxs)(k.E,{data:De,margin:{top:5,right:20,left:0,bottom:5},children:[(0,$.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,$.jsx)(m.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,$.jsx)(v.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,$.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,$.jsx)(w.y,{dataKey:"orders",fill:"#635BFF",radius:[4,4,0,0]})]})})]})]})]}),(0,$.jsxs)("div",{style:{display:"details"===M?"block":"none"},children:[(0,$.jsx)(tr,{}),N||H?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading..."}):0===Ee?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,$.jsxs)("div",{children:[(0,$.jsxs)(ae,{children:[(0,$.jsxs)(i.hI,{color:"#059669",children:[(0,$.jsx)(i.v0,{children:"Total Revenue"}),(0,$.jsx)(i.Os,{children:(0,c.vv)(Ce,D.currency)}),(0,$.jsxs)(i.d1,{children:[Ee," orders in selected period"]})]}),(0,$.jsxs)(i.hI,{color:"#2563EB",children:[(0,$.jsx)(i.v0,{children:"Total Orders"}),(0,$.jsx)(i.Os,{children:Ee.toLocaleString()}),(0,$.jsxs)(i.d1,{children:[Ee," completed"]})]}),(0,$.jsxs)(i.hI,{color:"#DC2626",children:[(0,$.jsx)(i.v0,{children:"Average Order Value"}),(0,$.jsx)(i.Os,{children:(0,c.vv)(Ee>0?Ce/Ee:0,D.currency)}),(0,$.jsx)(i.d1,{children:"Per order average"})]}),(0,$.jsxs)(i.hI,{color:"#7C3AED",children:[(0,$.jsx)(i.v0,{children:"Period"}),(0,$.jsx)(i.Os,{children:P?Ye():"today"===T?"1":"week"===T?"7":"month"===T?"30":"year"===T?"365":Ye()}),(0,$.jsx)(i.d1,{children:P?`${R.start} to ${R.end}`:"today"===T?"Day":"Days"})]})]}),(0,$.jsxs)(pe,{children:[(0,$.jsxs)(xe,{children:["Detailed Sales Breakdown (",P?`${R.start} to ${R.end}`:T,")"]}),(0,$.jsxs)(ue,{children:[(0,$.jsx)("thead",{children:(0,$.jsxs)("tr",{children:[(0,$.jsx)(ge,{style:{width:"40%"},children:"Period"}),(0,$.jsx)(ge,{style:{textAlign:"right"},children:"Revenue"}),(0,$.jsx)(ge,{style:{textAlign:"right"},children:"Orders"}),(0,$.jsx)(ge,{style:{textAlign:"right"},children:"Avg Order Value"})]})}),(0,$.jsx)("tbody",{children:Object.keys(Ve).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=Ve[e],t=ne.has(e);return(0,$.jsxs)(n.Fragment,{children:[(0,$.jsxs)(je,{level:0,clickable:!0,onClick:()=>(e=>{const r=new Set(ne);if(r.has(e)){var t;r.delete(e);const n=new Set(ie);Object.keys((null===(t=Ve[e])||void 0===t?void 0:t.months)||{}).forEach(r=>{n.delete(`${e}-${r}`)}),Ae(n)}else r.add(e);se(r)})(e),children:[(0,$.jsxs)(ye,{level:0,bold:!0,children:[(0,$.jsx)(fe,{expanded:t,children:"\u25b6"}),e]}),(0,$.jsx)(ye,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue,D.currency)}),(0,$.jsx)(ye,{level:0,bold:!0,style:{textAlign:"right"},children:r.orders}),(0,$.jsx)(ye,{level:0,bold:!0,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,D.currency)})]}),t&&Object.keys(r.months).sort((e,r)=>r.localeCompare(e)).map(t=>{const s=r.months[t],i=`${e}-${t}`,o=ie.has(i),d=new Date(t+"-01").toLocaleString("en-US",{year:"numeric",month:"long"});return(0,$.jsxs)(n.Fragment,{children:[(0,$.jsxs)(je,{level:1,clickable:!0,onClick:()=>(e=>{const r=new Set(ie);r.has(e)?r.delete(e):r.add(e),Ae(r)})(i),children:[(0,$.jsxs)(ye,{level:1,bold:!0,children:[(0,$.jsx)(fe,{expanded:o,children:"\u25b6"}),d]}),(0,$.jsx)(ye,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue,D.currency)}),(0,$.jsx)(ye,{level:1,style:{textAlign:"right"},children:s.orders}),(0,$.jsx)(ye,{level:1,style:{textAlign:"right"},children:(0,c.vv)(s.revenue/s.orders,D.currency)})]}),o&&Object.keys(s.days).sort((e,r)=>r.localeCompare(e)).map(e=>{const r=s.days[e],t=new Date(e).toLocaleString("en-US",{weekday:"short",year:"numeric",month:"short",day:"numeric"});return(0,$.jsxs)(je,{level:2,children:[(0,$.jsx)(ye,{level:2,children:t}),(0,$.jsx)(ye,{level:2,style:{textAlign:"right",color:"#059669",fontWeight:500},children:(0,c.vv)(r.revenue,D.currency)}),(0,$.jsx)(ye,{level:2,style:{textAlign:"right"},children:r.orders}),(0,$.jsx)(ye,{level:2,style:{textAlign:"right"},children:(0,c.vv)(r.revenue/r.orders,D.currency)})]},e)})]},i)})]},e)})})]})]})]})]}),(0,$.jsxs)("div",{style:{display:"menu"===M?"block":"none"},children:[(0,$.jsx)(tr,{}),(0,$.jsxs)(ae,{children:[(0,$.jsxs)(i.hI,{color:"#F59E0B",children:[(0,$.jsx)(i.v0,{children:"Best Seller"}),(0,$.jsx)(i.Os,{children:(null===(e=Be[0])||void 0===e?void 0:e.name)||"N/A"}),(0,$.jsxs)(i.d1,{children:[(null===(r=Be[0])||void 0===r?void 0:r.orders)||0," sold in selected period"]})]}),(0,$.jsxs)(i.hI,{color:"#10B981",children:[(0,$.jsx)(i.v0,{children:"Menu Items"}),(0,$.jsx)(i.Os,{children:Be.length}),(0,$.jsx)(i.d1,{children:"Items with sales"})]}),(0,$.jsxs)(i.hI,{color:"#3B82F6",children:[(0,$.jsx)(i.v0,{children:"Items Sold"}),(0,$.jsx)(i.Os,{children:Be.reduce((e,r)=>e+r.orders,0).toLocaleString()}),(0,$.jsx)(i.d1,{children:"Total quantity sold"})]}),(0,$.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,$.jsx)(i.v0,{children:"Total Revenue"}),(0,$.jsx)(i.Os,{children:(0,c.vv)(Be.reduce((e,r)=>e+r.revenue,0),D.currency)}),(0,$.jsx)(i.d1,{children:"For selected period"})]})]}),(0,$.jsxs)(pe,{children:[(0,$.jsxs)(xe,{children:["Complete Menu Performance Ranking (",P?`${R.start} to ${R.end}`:T,")"]}),(0,$.jsxs)(ue,{children:[(0,$.jsx)("thead",{children:(0,$.jsxs)("tr",{children:[(0,$.jsx)(ge,{children:"Rank"}),(0,$.jsx)(ge,{children:"Menu Item"}),(0,$.jsx)(ge,{children:"Category"}),(0,$.jsx)(ge,{children:"Price"}),(0,$.jsx)(ge,{children:"Qty Sold"}),(0,$.jsx)(ge,{children:"Revenue"}),(0,$.jsx)(ge,{children:"Performance"})]})}),(0,$.jsx)("tbody",{children:Be.map((e,r)=>{var t;const n=(null===(t=Be[0])||void 0===t?void 0:t.orders)||1;return(0,$.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,$.jsxs)(me,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,$.jsx)(me,{style:{fontWeight:600},children:e.name}),(0,$.jsx)(me,{children:(0,$.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"#F3F4F6",color:"#6B7280"},children:e.category})}),(0,$.jsx)(me,{children:(0,c.vv)(e.price,D.currency)}),(0,$.jsx)(me,{children:e.orders.toLocaleString()}),(0,$.jsx)(me,{children:(0,c.vv)(e.revenue,D.currency)}),(0,$.jsx)(me,{children:(0,$.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,$.jsx)(ve,{percentage:e.orders/n*100}),(0,$.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[Math.round(e.orders/n*100),"%"]})]})})]},r)})})]})]})]}),(0,$.jsxs)("div",{style:{display:"customers"===M?"block":"none"},children:[(0,$.jsx)(tr,{}),N||H?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading customer data..."}):0===Me.length?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No customers with orders in the selected period"}):(0,$.jsxs)("div",{children:[(0,$.jsxs)(ae,{children:[(0,$.jsxs)(i.hI,{color:"#635BFF",children:[(0,$.jsx)(i.v0,{children:"Active Customers"}),(0,$.jsx)(i.Os,{children:Me.length.toLocaleString()}),(0,$.jsxs)(i.d1,{children:[Me.filter(e=>{var r;return"member"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," members, ",Me.filter(e=>{var r;return"guest"===(null===(r=e.customer)||void 0===r?void 0:r.type)}).length," guests"]})]}),(0,$.jsxs)(i.hI,{color:"#00D924",children:[(0,$.jsx)(i.v0,{children:"Repeat Customers"}),(0,$.jsx)(i.Os,{children:Me.filter(e=>e.period_orders>1).length}),(0,$.jsxs)(i.d1,{children:[Me.length>0?Math.round(Me.filter(e=>e.period_orders>1).length/Me.length*100):0,"% ordered multiple times"]})]}),(0,$.jsxs)(i.hI,{color:"#FFB800",children:[(0,$.jsx)(i.v0,{children:"Average Spent"}),(0,$.jsx)(i.Os,{children:(0,c.vv)(Me.length>0?Me.reduce((e,r)=>e+(r.period_spent||0),0)/Me.length:0,D.currency)}),(0,$.jsx)(i.d1,{children:"Per customer in period"})]}),(0,$.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,$.jsx)(i.v0,{children:"Period Revenue"}),(0,$.jsx)(i.Os,{children:(0,c.vv)(Me.reduce((e,r)=>e+(r.period_spent||0),0),D.currency)}),(0,$.jsxs)(i.d1,{children:["From ",Me.length," customers"]})]})]}),(0,$.jsxs)(pe,{children:[(0,$.jsxs)(xe,{children:["Top Customers (",P?`${R.start} to ${R.end}`:T,")"]}),(0,$.jsxs)(ue,{children:[(0,$.jsx)("thead",{children:(0,$.jsxs)("tr",{children:[(0,$.jsx)(ge,{children:"Rank"}),(0,$.jsx)(ge,{children:"Name"}),(0,$.jsx)(ge,{children:"Phone"}),(0,$.jsx)(ge,{children:"Type"}),(0,$.jsx)(ge,{children:"Period Orders"}),(0,$.jsx)(ge,{children:"Period Spent"}),(0,$.jsx)(ge,{children:"Total Points"}),(0,$.jsx)(ge,{children:"Tier"})]})}),(0,$.jsx)("tbody",{children:Me.slice(0,20).map((e,r)=>{var t,n,s,i,o,d;return(0,$.jsxs)("tr",{style:{backgroundColor:r<3?0===r?"#FFF9E6":1===r?"#F0F9FF":"#F0FDF4":"transparent"},children:[(0,$.jsxs)(me,{style:{fontWeight:600,color:r<3?0===r?"#FFB800":1===r?"#0EA5E9":"#00D924":"#0A2540"},children:["#",r+1,0===r&&" \ud83e\udd47",1===r&&" \ud83e\udd48",2===r&&" \ud83e\udd49"]}),(0,$.jsx)(me,{style:{fontWeight:600},children:(null===(n=e.customer)||void 0===n?void 0:n.name)||"Guest"}),(0,$.jsx)(me,{children:(null===(s=e.customer)||void 0===s?void 0:s.phone)||"-"}),(0,$.jsx)(me,{children:(0,$.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"member"===(null===(i=e.customer)||void 0===i?void 0:i.type)?"#E0F2FE":"#F3F4F6",color:"member"===(null===(o=e.customer)||void 0===o?void 0:o.type)?"#0369A1":"#6B7280"},children:"member"===(null===(d=e.customer)||void 0===d?void 0:d.type)?"Member":"Guest"})}),(0,$.jsx)(me,{children:e.period_orders||0}),(0,$.jsx)(me,{children:(0,c.vv)(e.period_spent||0,D.currency)}),(0,$.jsx)(me,{children:e.points||0}),(0,$.jsx)(me,{children:(0,$.jsx)("span",{style:{padding:"2px 6px",borderRadius:"4px",fontSize:"11px",backgroundColor:"VIP"===e.loyalty_tier?"#FEF3C7":"Gold"===e.loyalty_tier?"#FEF9C3":"Silver"===e.loyalty_tier?"#F3F4F6":"#E5E7EB",color:"VIP"===e.loyalty_tier?"#92400E":"Gold"===e.loyalty_tier?"#854D0E":"#6B7280"},children:e.loyalty_tier||"Bronze"})})]},(null===(t=e.customer)||void 0===t?void 0:t.id)||r)})})]})]})]})]}),(0,$.jsxs)("div",{style:{display:"operations"===M?"block":"none"},children:[(0,$.jsx)(tr,{}),N||H?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading operations data..."}):0===Ee?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,$.jsxs)("div",{children:[(0,$.jsxs)(ae,{children:[(0,$.jsxs)(i.hI,{color:"#10B981",children:[(0,$.jsx)(i.v0,{children:"Completed Orders"}),(0,$.jsx)(i.Os,{children:Ee.toLocaleString()}),(0,$.jsxs)(i.d1,{children:[Oe.completionRate,"% fulfillment rate"]})]}),(0,$.jsxs)(i.hI,{color:"#F59E0B",children:[(0,$.jsx)(i.v0,{children:"Avg. Prep Time"}),(0,$.jsx)(i.Os,{children:Oe.avgPrepTime>0?`${Oe.avgPrepTime} min`:"N/A"}),(0,$.jsx)(i.d1,{children:Oe.avgPrepTime>0?"Order to served":"No timing data"})]}),(0,$.jsxs)(i.hI,{color:"#EF4444",children:[(0,$.jsx)(i.v0,{children:"Peak Hour"}),(0,$.jsx)(i.Os,{children:Oe.peakHour}),(0,$.jsxs)(i.d1,{children:[Oe.peakHourOrders," orders in this slot"]})]}),(0,$.jsxs)(i.hI,{color:"#6366F1",children:[(0,$.jsx)(i.v0,{children:"Orders per Day"}),(0,$.jsx)(i.Os,{children:(()=>{const e=Math.max(1,Math.ceil((new Date(R.end).getTime()-new Date(R.start).getTime())/864e5)+1);return Math.round(Ee/e)})()}),(0,$.jsx)(i.d1,{children:"Average daily orders"})]})]}),(0,$.jsxs)(pe,{children:[(0,$.jsxs)(xe,{children:["Peak Hours Performance (",P?`${R.start} to ${R.end}`:T,")"]}),(0,$.jsxs)(ue,{children:[(0,$.jsx)("thead",{children:(0,$.jsxs)("tr",{children:[(0,$.jsx)(ge,{children:"Time Slot"}),(0,$.jsx)(ge,{children:"Orders"}),(0,$.jsx)(ge,{children:"Revenue"}),(0,$.jsx)(ge,{children:"Share"})]})}),(0,$.jsx)("tbody",{children:0===Re.length?(0,$.jsx)("tr",{children:(0,$.jsx)(me,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No peak hours data available"})}):Re.map((e,r)=>(0,$.jsxs)("tr",{style:{backgroundColor:0===r?"#FEF3C7":"transparent"},children:[(0,$.jsxs)(me,{style:{fontWeight:600},children:[0===r&&"\ud83d\udd25 ",e.time]}),(0,$.jsx)(me,{children:e.orders}),(0,$.jsx)(me,{children:(0,c.vv)(e.revenue,D.currency)}),(0,$.jsx)(me,{children:(0,$.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,$.jsx)(ve,{percentage:Ee>0?e.orders/Ee*100:0}),(0,$.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93"},children:[Ee>0?Math.round(e.orders/Ee*100):0,"%"]})]})})]},r))})]})]}),(0,$.jsxs)(he,{style:{marginTop:"24px"},children:[(0,$.jsx)(xe,{children:"Hourly Order Distribution"}),(0,$.jsx)(p.u,{width:"100%",height:250,children:(0,$.jsxs)(k.E,{data:De,margin:{top:5,right:20,left:0,bottom:5},children:[(0,$.jsx)(g.d,{strokeDasharray:"3 3",stroke:"#F6F9FC"}),(0,$.jsx)(m.W,{dataKey:"hour",stroke:"#6B7C93",fontSize:12}),(0,$.jsx)(v.h,{stroke:"#6B7C93",fontSize:12,width:60}),(0,$.jsx)(j.m,{contentStyle:{background:"white",border:"1px solid #E6EBF1",borderRadius:"6px"}}),(0,$.jsx)(w.y,{dataKey:"orders",fill:"#6366F1",radius:[4,4,0,0]})]})})]})]})]}),(0,$.jsxs)("div",{style:{display:"payment"===M?"block":"none"},children:[(0,$.jsx)(tr,{}),N||H?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px"},children:"Loading payment data..."}):0===Ee?(0,$.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"No order data available for the selected period"}):(0,$.jsxs)("div",{children:[We.orders>0&&(0,$.jsxs)(ke,{children:[(0,$.jsxs)("div",{children:[(0,$.jsx)("div",{style:{fontWeight:600,color:"#9A3412",marginBottom:"4px"},children:"Staff Meal (Excluded from Revenue)"}),(0,$.jsx)("div",{style:{fontSize:"13px",color:"#C2410C"},children:"These orders are not included in the revenue figures below"})]}),(0,$.jsxs)("div",{style:{display:"flex",gap:"24px",alignItems:"center"},children:[(0,$.jsxs)("div",{style:{textAlign:"center"},children:[(0,$.jsx)("div",{style:{fontSize:"20px",fontWeight:700,color:"#9A3412"},children:We.orders}),(0,$.jsx)("div",{style:{fontSize:"11px",color:"#C2410C"},children:"Orders"})]}),(0,$.jsxs)("div",{style:{textAlign:"center"},children:[(0,$.jsx)("div",{style:{fontSize:"20px",fontWeight:700,color:"#9A3412"},children:(0,c.vv)(We.revenue,D.currency)}),(0,$.jsx)("div",{style:{fontSize:"11px",color:"#C2410C"},children:"Amount"})]})]})]}),(0,$.jsxs)(ae,{children:[(0,$.jsxs)(i.hI,{color:"#059669",children:[(0,$.jsx)(i.v0,{children:"Total Revenue"}),(0,$.jsx)(i.Os,{children:(0,c.vv)(He,D.currency)}),(0,$.jsxs)(i.d1,{children:[_e.reduce((e,r)=>e+r.orders,0)," orders"]})]}),(0,$.jsxs)(i.hI,{color:"#2563EB",children:[(0,$.jsx)(i.v0,{children:"Payment Methods Used"}),(0,$.jsx)(i.Os,{children:_e.length}),(0,$.jsx)(i.d1,{children:"Active methods in period"})]}),(0,$.jsxs)(i.hI,{color:"#7C3AED",children:[(0,$.jsx)(i.v0,{children:"Card Payments"}),(0,$.jsx)(i.Os,{children:(0,c.vv)((null===(t=_e.find(e=>"card"===e.method))||void 0===t?void 0:t.revenue)||0,D.currency)}),(0,$.jsxs)(i.d1,{children:[(null===(s=_e.find(e=>"card"===e.method))||void 0===s?void 0:s.orders)||0," orders"]})]}),(0,$.jsxs)(i.hI,{color:"#DC2626",children:[(0,$.jsx)(i.v0,{children:"Cash Payments"}),(0,$.jsx)(i.Os,{children:(0,c.vv)((null===(C=_e.find(e=>"cash"===e.method))||void 0===C?void 0:C.revenue)||0,D.currency)}),(0,$.jsxs)(i.d1,{children:[(null===(E=_e.find(e=>"cash"===e.method))||void 0===E?void 0:E.orders)||0," orders"]})]})]}),(0,$.jsxs)(ce,{children:[(0,$.jsxs)(pe,{children:[(0,$.jsx)(xe,{children:"Payment Methods Breakdown"}),(0,$.jsxs)(ue,{children:[(0,$.jsx)("thead",{children:(0,$.jsxs)("tr",{children:[(0,$.jsx)(ge,{children:"Payment Method"}),(0,$.jsx)(ge,{children:"Orders"}),(0,$.jsx)(ge,{children:"Revenue"}),(0,$.jsx)(ge,{children:"Share"})]})}),(0,$.jsx)("tbody",{children:0===_e.length?(0,$.jsx)("tr",{children:(0,$.jsx)(me,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No payment data available"})}):_e.map((e,r)=>{const t=He>0?e.revenue/He*100:0;return(0,$.jsxs)("tr",{style:{backgroundColor:0===r?"#F0F9FF":"transparent"},children:[(0,$.jsx)(me,{style:{fontWeight:600},children:ze[e.method]||e.method}),(0,$.jsx)(me,{children:e.orders}),(0,$.jsx)(me,{style:{fontWeight:500},children:(0,c.vv)(e.revenue,D.currency)}),(0,$.jsx)(me,{children:(0,$.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,$.jsx)(ve,{percentage:t}),(0,$.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[t.toFixed(1),"%"]})]})})]},e.method)})})]})]}),(0,$.jsxs)(he,{children:[(0,$.jsx)(xe,{children:"Payment Distribution"}),(0,$.jsx)(p.u,{width:"100%",height:300,children:(0,$.jsxs)(f.r,{children:[(0,$.jsx)(b.F,{data:_e.map(e=>({name:ze[e.method]||e.method,value:Math.round(e.revenue)})),cx:"50%",cy:"50%",labelLine:!0,label:e=>{let{name:r,percent:t}=e;return`${r} ${(100*t).toFixed(0)}%`},outerRadius:70,fill:"#8884d8",dataKey:"value",children:_e.map((e,r)=>(0,$.jsx)(F.f,{fill:we[r%we.length]},`cell-${r}`))}),(0,$.jsx)(j.m,{formatter:e=>(0,c.vv)(Number(e),D.currency)})]})})]})]}),(null===J||void 0===J?void 0:J.cardTypeSales)&&J.cardTypeSales.length>0&&(0,$.jsxs)(pe,{style:{marginTop:"24px"},children:[(0,$.jsx)(xe,{children:"Card Type Breakdown"}),(0,$.jsxs)(Fe,{children:[(0,$.jsx)(be,{active:"all"===re,onClick:()=>te("all"),children:"All"}),["visa","master","amex","other"].map(e=>Ne.includes(e)&&(0,$.jsx)(be,{active:re===e,onClick:()=>te(e),children:Pe[e]||e},e))]}),(0,$.jsxs)(ue,{children:[(0,$.jsx)("thead",{children:(0,$.jsxs)("tr",{children:[(0,$.jsx)(ge,{children:"Card Type"}),(0,$.jsx)(ge,{children:"Orders"}),(0,$.jsx)(ge,{children:"Revenue"}),(0,$.jsx)(ge,{children:"Share of Card Payments"})]})}),(0,$.jsx)("tbody",{children:0===Le.length?(0,$.jsx)("tr",{children:(0,$.jsx)(me,{colSpan:4,style:{textAlign:"center",color:"#6B7C93"},children:"No card type data for selected filter"})}):Le.map((e,r)=>{const t=J.cardTypeSales.reduce((e,r)=>e+r.revenue,0),n=t>0?e.revenue/t*100:0;return(0,$.jsxs)("tr",{style:{backgroundColor:0===r?"#F5F3FF":"transparent"},children:[(0,$.jsx)(me,{style:{fontWeight:600},children:Pe[e.type]||e.type}),(0,$.jsx)(me,{children:e.orders}),(0,$.jsx)(me,{style:{fontWeight:500},children:(0,c.vv)(e.revenue,D.currency)}),(0,$.jsx)(me,{children:(0,$.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,$.jsx)(ve,{percentage:n}),(0,$.jsxs)("span",{style:{fontSize:"12px",color:"#6B7C93",minWidth:"40px"},children:[n.toFixed(1),"%"]})]})})]},e.type)})})]})]})]})]})]})]}),(0,$.jsx)(oe,{isOpen:X,onClose:()=>ee(!1)})]})}},2597:(e,r,t)=>{t.d(r,{Ex:()=>c,oz:()=>a,tU:()=>l});t(9950);var n=t(4752),s=t(4414);const i=n.Ay.div`
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
`,d=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:r,className:t,style:n}=e;return(0,s.jsx)(i,{className:t,style:n,children:r})},a=e=>{let{active:r,onClick:t,children:n,className:i}=e;return(0,s.jsx)(o,{active:r,onClick:t,className:i,children:n})},c=e=>{let{count:r,variant:t="default",showZero:n=!1}=e;return 0!==r||n?(0,s.jsx)(d,{variant:t,children:r}):null}},2653:(e,r,t)=>{t.d(r,{M:()=>i});var n=t(9950),s=t(4492);function i(e){const[r,t]=(0,s.ok)(),i=(0,n.useCallback)(()=>r.get("tab")||e,[r,e]),[o,d]=(0,n.useState)(i());return[o,(0,n.useCallback)(e=>{d(e),t({tab:e})},[t])]}},8012:(e,r,t)=>{t.d(r,{Ay:()=>l});t(9950);var n=t(4752),s=t(4414);const i=n.Ay.div`
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
`,d=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,l=e=>{let{title:r,children:t}=e;return(0,s.jsxs)(i,{children:[(0,s.jsx)(o,{children:r}),t&&(0,s.jsx)(d,{children:t})]})}},8285:(e,r,t)=>{t.d(r,{MA:()=>g,_M:()=>p});const n="cash",s="card",i="ewallet",o="bank_transfer",d="qr",l="counter",a="online",c="fpx",h="staffMeal",x={[n]:"Cash",[s]:"Credit/Debit Card",[i]:"E-Wallet",[o]:"Bank Transfer",[d]:"QR Payment",[l]:"Pay at Counter",[a]:"Online Payment",[c]:"FPX Online Banking",[h]:"Staff Meal"};function p(e){return x[e]||e}const u={visa:"Visa",master:"Master",amex:"Amex",other:"Other"};function g(e,r){return e?"card"===e&&r?`Card(${u[r]||r})`:p(e):"N/A"}}}]);