"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7283],{512:(e,t,n)=>{n.d(t,{x:()=>E,A:()=>I});var i=n(9950),a=n(4752),r=n(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)},d=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),c=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),p=a.Ay.div`
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
`,x=a.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,u=a.Ay.div`
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
`,h=a.Ay.button`
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
`,m=a.Ay.div``,g=a.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,y=a.Ay.button`
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
`,v=a.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,f=a.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,j=a.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,b=a.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,F=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,w=a.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,C=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,k=a.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,B=a.Ay.div`
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
`,S=e=>{let{startDate:t,endDate:n,onRangeSelect:a,onClose:S,isOpen:A}=e;const E=new Date,[D,N]=(0,i.useState)(E.getMonth()),[T,$]=(0,i.useState)(E.getFullYear()),[z,I]=(0,i.useState)(null),[_,M]=(0,i.useState)(null),[R,P]=(0,i.useState)(null),[L,W]=(0,i.useState)("start"),O=(0,i.useRef)(null);(0,i.useEffect)(()=>{t&&I(l(t)),n&&M(l(n))},[t,n]),(0,i.useEffect)(()=>{A&&W("start")},[A]),(0,i.useEffect)(()=>{const e=e=>{O.current&&!O.current.contains(e.target)&&S()};return A&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[A,S]);const Y=(0,i.useCallback)(()=>{0===D?(N(11),$(e=>e-1)):N(e=>e-1)},[D]),H=(0,i.useCallback)(()=>{11===D?(N(0),$(e=>e+1)):N(e=>e+1)},[D]),U=(e,t)=>{const n=((e,t)=>new Date(e,t+1,0).getDate())(e,t),i=((e,t)=>new Date(e,t,1).getDay())(e,t),l=[];for(let a=0;a<i;a++)l.push(null);for(let a=1;a<=n;a++)l.push(new Date(e,t,a));return(0,r.jsxs)(j,{children:[(0,r.jsx)(b,{children:c(e,t)}),(0,r.jsx)(F,{children:o.map(e=>(0,r.jsx)(w,{children:e},e))}),(0,r.jsx)(C,{children:l.map((e,t)=>{if(!e)return(0,r.jsx)(k,{},`e-${t}`);const{isStart:n,isEnd:i,isInRange:o,isHoverEnd:l}=(e=>{const t=z&&d(e,z),n=_&&d(e,_),i="end"===L&&R?R:_;let a=!1;if(z&&i){const[t,n]=z<=i?[z,i]:[i,z];a=((e,t,n)=>{const i=e.getTime();return i>t.getTime()&&i<n.getTime()})(e,t,n)}return{isStart:t,isEnd:n,isInRange:a,isHoverEnd:"end"===L&&R&&d(e,R)}})(e),c=d(e,E);return(0,r.jsx)(B,{$isStart:!!n,$isEnd:!!i,$isInRange:o,$isHoverEnd:!!l,$isToday:c,onClick:()=>(e=>{if("start"===L)I(e),M(null),W("end");else{let t=z,n=e;n<t&&([t,n]=[n,t]),I(t),M(n),W("start"),a(s(t),s(n)),setTimeout(S,200)}})(e),onMouseEnter:()=>P(e),onMouseLeave:()=>P(null),children:e.getDate()},e.getTime())})})]})},V=11===D?0:D+1,G=11===D?T+1:T,q=e=>{const t=new Date;let n;const i=t;switch(e){case"this_week":n=new Date(t),n.setDate(t.getDate()-t.getDay());break;case"this_month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":n=new Date(t.getFullYear(),0,1);break;default:return}I(n),M(i),W("start"),a(s(n),s(i)),setTimeout(S,150)};return A?(0,r.jsx)(p,{ref:O,children:(0,r.jsxs)(x,{children:[(0,r.jsxs)(u,{children:[(0,r.jsx)(h,{onClick:()=>q("this_week"),children:"This Week"}),(0,r.jsx)(h,{onClick:()=>q("this_month"),children:"This Month"}),(0,r.jsx)(h,{onClick:()=>q("this_year"),children:"This Year"})]}),(0,r.jsxs)(m,{children:[(0,r.jsxs)(g,{children:[(0,r.jsx)(y,{onClick:Y,"aria-label":"Previous month",children:(0,r.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,r.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,r.jsx)(y,{onClick:H,"aria-label":"Next month",children:(0,r.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,r.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,r.jsxs)(v,{children:[U(T,D),(0,r.jsx)(f,{children:U(G,V)})]})]})]})}):null},A=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,E=(e,t)=>{const n=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[n,i,a]=t.split("-").map(Number);return new Date(n,i-1,a)}catch{return new Date}})(t);let i=new Date(n);const a=new Date(n);switch(e){case"today":break;case"yesterday":i.setDate(n.getDate()-1),a.setDate(n.getDate()-1);break;case"week":i.setDate(n.getDate()-6);break;case"month":i.setDate(n.getDate()-29);break;case"year":i.setDate(n.getDate()-364);break;case"all":i=new Date(2020,0,1)}return{start:A(i),end:A(a)}},D=a.Ay.div`
  margin-bottom: 24px;
`,N=a.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,T=a.Ay.button`
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
`,$=a.Ay.div`
  position: relative;
  display: inline-block;
`,z=a.Ay.button`
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
`,I=e=>{let{activePeriod:t,dateRange:n,isCustomDateRange:a,onPeriodChange:o,onCalendarRangeSelect:s,includeToday:l=!1,children:d}=e;const[c,p]=(0,i.useState)(!1),x=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],u={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,r.jsx)(D,{children:(0,r.jsxs)(N,{children:[x.map(e=>(0,r.jsx)(T,{active:t===e&&!a,onClick:()=>o(e),children:u[e]},e)),(0,r.jsxs)($,{children:[(0,r.jsxs)(z,{active:a,onClick:()=>p(!c),children:[(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,r.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,r.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,r.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),n.start&&n.end?`${n.start} ~ ${n.end}`:"Custom Range"]}),(0,r.jsx)(S,{isOpen:c,startDate:n.start,endDate:n.end,onRangeSelect:(e,t)=>{s(e,t),p(!1)},onClose:()=>p(!1)})]}),d]})})}},2488:(e,t,n)=>{n.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});n(9950);var i=n(4752),a=n(4414);const r=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,o=i.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,s=i.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,l=i.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,d=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,c=e=>{let{children:t,className:n,style:i,...o}=e;return(0,a.jsx)(r,{className:n,style:i,...o,children:t})},p=e=>{let{placeholder:t="Search...",value:n,onChange:i,style:r,...d}=e;return(0,a.jsxs)(s,{style:r,children:[(0,a.jsx)(o,{placeholder:t,value:n,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:n?"36px":"16px"},...d}),n&&(0,a.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,a.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...n}=e;return(0,a.jsx)(d,{...n,children:t})}},2597:(e,t,n)=>{n.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});n(9950);var i=n(4752),a=n(4414);const r=i.Ay.div`
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
`,o=i.Ay.button`
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
`,s=i.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:n,style:i}=e;return(0,a.jsx)(r,{className:n,style:i,children:t})},d=e=>{let{active:t,onClick:n,children:i,className:r}=e;return(0,a.jsx)(o,{active:t,onClick:n,className:r,children:i})},c=e=>{let{count:t,variant:n="default",showZero:i=!1}=e;return 0!==t||i?(0,a.jsx)(s,{variant:n,children:t}):null}},7283:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Q});var i=n(9950),a=n(4752),r=n(512),o=n(2853),s=n(4492),l=n(6038),d=n(9018),c=n(4728),p=n(7617),x=n(8409),u=n(2488),h=n(2597),m=n(5612),g=n(1052),y=n.n(g),v=n(4414);const f=(0,a.Ay)(c.SC)``,j=a.Ay.div``,b=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,F=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,w=a.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,C=a.Ay.span`
  display: inline-block;
  background: #F59E0B;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
  margin-left: 4px;
`,k=a.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6B7280;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`,B=(0,a.Ay)(c.Wh)`
  white-space: normal;
  line-height: 1.3;
`,S=a.Ay.button`
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"success"===e.variant?"\n    background: #10B981;\n    color: white;\n    border-color: #10B981;\n\n    &:hover {\n      background: #059669;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"email"===e.variant?"\n    background: #F3F4F6;\n    color: #6B7280;\n    border-color: #E5E7EB;\n    padding: 5px;\n\n    &:hover {\n      background: #E5E7EB;\n      color: #374151;\n    }\n  ":"cancel"===e.variant?"\n    background: #F6F9FC;\n    color: #6B7C93;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #E6EBF1;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      border-color: #635BFF;\n      color: #635BFF;\n      background: #F4F3FF;\n    }\n  "}
`,A=a.Ay.button`
  padding: 6px;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,E=a.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,D=a.Ay.div`
  display: grid;
  gap: 12px;
`,N=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${e=>!1!==e.isActive?1:.6};

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,T=a.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: #635BFF;
  flex-shrink: 0;
`,$=a.Ay.div`
  flex: 1;
`,z=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`,I=a.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,_=a.Ay.div`
  display: flex;
  gap: 8px;
`,M=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,R=a.Ay.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
    transform: translateY(-1px);

    svg {
      color: #635BFF;
    }
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
    transition: color 0.15s;
  }
`,P=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,L=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,W=a.Ay.div`
  margin-left: auto;

  @media (max-width: 600px) {
    margin-left: 0;
    width: 100%;
    order: 99;

    button {
      width: 100%;
    }
  }
`,O=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,Y=a.Ay.div`
  margin-bottom: 20px;
`,H=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,U=a.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,V=a.Ay.textarea`
  width: 100%;
  max-width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,G=a.Ay.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,q=a.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,J=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,Q=()=>{const{operationSettings:e}=(0,d.Pj)(),[t,n]=(0,s.ok)(),[a,c]=(0,i.useState)([]),[g,Q]=(0,i.useState)(""),[K,Z]=(0,i.useState)("month"),[X,ee]=(0,i.useState)(!1),[te,ne]=(0,i.useState)(()=>(0,r.x)("month")),[ie,ae]=(0,i.useState)(!1),[re,oe]=(0,i.useState)(!1),[se,le]=(0,i.useState)(!1),[de,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(!1),[ue,he]=(0,i.useState)(!1),[me,ge]=(0,i.useState)(!1),[ye,ve]=(0,i.useState)(!1),[fe,je]=(0,i.useState)(!1),[be,Fe]=(0,i.useState)(""),[we,Ce]=(0,i.useState)(null),[ke,Be]=(0,i.useState)(!1),[Se,Ae]=(0,i.useState)(""),Ee=t.get("tab")||"invoices",De=e=>{n({tab:e})},[Ne,Te]=(0,i.useState)(!1),[$e,ze]=(0,i.useState)(null),[Ie,_e]=(0,i.useState)({name:"",code:"",description:""}),[Me,Re]=(0,i.useState)(!1),[Pe,Le]=(0,i.useState)(!1),[We,Oe]=(0,i.useState)(null),[Ye,He]=(0,i.useState)(null),[Ue,Ve]=(0,i.useState)(null),[Ge,qe]=(0,i.useState)(""),[Je,Qe]=(0,i.useState)(null),[Ke,Ze]=(0,i.useState)(""),[Xe,et]=(0,i.useState)({managers:[],restaurants:[]}),[tt,nt]=(0,i.useState)(!1),[it,at]=(0,i.useState)(null),[rt,ot]=(0,i.useState)([]),[st,lt]=(0,i.useState)([]),[dt,ct]=(0,i.useState)({managers:[],restaurants:[]}),[pt,xt]=(0,i.useState)(""),[ut,ht]=(0,i.useState)(!1),[mt,gt]=(0,i.useState)(null),[yt,vt]=(0,i.useState)(null),[,ft]=(0,i.useState)({}),[,jt]=(0,i.useState)([]),[bt,Ft]=(0,i.useState)([]),[wt,Ct]=(0,i.useState)({}),[,kt]=(0,i.useState)({enabled:!1,rate:0,name:"Tax"}),[Bt,St]=(0,i.useState)(null),[At,Et]=(0,i.useState)(!1),[Dt,Nt]=(0,i.useState)(!1),[Tt,$t]=(0,i.useState)("issueDate"),[zt,It]=(0,i.useState)("desc"),[_t,Mt]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),Rt=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void c([]);const t=await fetch("/api/invoices"+(At?"?includeDemo=true":""),{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",t.status),t.ok){const e=await t.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),c(e)}else{const e=await t.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",t.status,e),c([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),c([])}},Pt=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(t.ok){const e=await t.json();e.success&&e.data&&Ft(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),Lt=e=>{e?(ze(e),_e({name:e.name,code:e.code,description:e.description||""})):(ze(null),_e({name:"",code:"",description:""})),Te(!0)},Wt=()=>{Te(!1),ze(null),_e({name:"",code:"",description:""})};(0,i.useEffect)(()=>{Rt(),Ut(),Vt(),Qt(),Ht(),Pt(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/admin/payment-settings",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();if(e.additionalCharges){Array.isArray(e.additionalCharges)?Ct({}):Ct(e.additionalCharges);const t=(Array.isArray(e.additionalCharges)?e.additionalCharges:Object.values(e.additionalCharges).flat()).find(e=>null===e||void 0===e?void 0:e.enabled);t&&kt({enabled:t.enabled,rate:parseFloat(t.rate)||0,name:t.name||"Tax"})}}}catch(e){console.error("Error fetching payment settings:",e)}})()},[At]);const Ot=e=>{const t=(0,l.Wh)(e);return wt[t]||wt[e]||[]},Yt=Ot(_t.currency),Ht=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const t=await e.json();t.success&&t.currencies&&ft(t.currencies)}const t=await fetch("/api/currencies/supported");if(t.ok){const e=await t.json();if(e.success&&e.data){const t=e.data.map(e=>e.code);jt(t)}}}catch(e){console.error("Error fetching currency config:",e)}},Ut=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[t,n]=await Promise.all([fetch("/api/users?role=Brand General",{headers:e}),fetch("/api/users?role=Foodcourt General",{headers:e})]);let i=[];if(t.ok){const e=await t.json(),n=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand General"}));i=[...i,...n]}if(n.ok){const e=await n.json(),t=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt General"}));i=[...i,...t]}console.log("Fetched managers (General only):",i.length),ot(i)}catch(e){console.error("Error fetching managers:",e),ot([])}},Vt=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();console.log("Fetched restaurants:",e);const n=e.map(e=>{var t,n;return{id:e.id.toString(),name:e.name,admin_id:(null===(t=e.admin_id)||void 0===t?void 0:t.toString())||(null===(n=e.managerId)||void 0===n?void 0:n.toString())||"",status:e.status,address:e.address||"",phone:e.phone||"",email:e.email||"",currency:e.currency||"MYR"}});lt(n),console.log("Transformed restaurants:",n)}else console.error("Failed to fetch restaurants"),lt([])}catch(e){console.error("Error fetching restaurants:",e),lt([])}},Gt=(e,t)=>{if(at({type:e,data:t}),Ze("manager"===e?t.fullName:t.name),nt(!1),"manager"===e){const e=t;Ve({...Ue,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=t,n=rt.find(t=>t.id===e.admin_id);Ve({...Ue,managerId:(null===n||void 0===n?void 0:n.id)||"",managerName:(null===n||void 0===n?void 0:n.fullName)||"",companyName:(null===n||void 0===n?void 0:n.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},qt=async e=>{try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/admin/payment-settings/available/${e}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const t=await n.json();if(!t.methods||0===t.methods.length)return void St(`No payment methods configured for ${(0,l.Qn)(e)}. Please set up payment methods in Payment Settings before sending this invoice.`)}}catch(t){console.error("Error checking payment methods:",t)}St(null)},Jt=async(e,t)=>{gt({type:e,data:t}),ht(!1),xt("manager"===e?t.fullName:t.name),St(null);const n=localStorage.getItem("auth_token");let i="USD";if("manager"===e){const e=t;try{const t=await fetch(`/api/users/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){const e=await t.json(),o=e.success?e.data:e;if(o.brand_id){const e=await fetch(`/api/brands/${o.brand_id}/payment-settings`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){var a;const t=await e.json(),n=t.data||t,r=null===(a=n.payment_settings)||void 0===a?void 0:a.defaultCurrency,o=n.supported_currencies;r?i=r:o&&o.length>0&&(i=o[0]),console.log("Brand currency:",i,"defaultCurrency:",r,"supported:",o)}}else if(o.foodcourt_id){const e=await fetch(`/api/foodcourts/${o.foodcourt_id}/payment-settings`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){var r;const t=await e.json(),n=t.data||t,a=null===(r=n.payment_settings)||void 0===r?void 0:r.defaultCurrency,o=n.supported_currencies;a?i=a:o&&o.length>0&&(i=o[0]),console.log("Foodcourt currency:",i,"defaultCurrency:",a,"supported:",o)}}}}catch(o){console.error("Error fetching manager currency:",o)}Mt({..._t,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:"",currency:i}),await qt(i)}else{const e=t,a=rt.find(t=>t.id===e.admin_id);try{const t=await fetch(`/api/restaurants/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){i=(await t.json()).currency||"MYR"}}catch(o){console.error("Error fetching restaurant currency:",o)}Mt({..._t,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:a?a.fullName:"",companyName:e.name,currency:i}),await qt(i)}},Qt=async()=>{try{const t=await fetch("/api/admin/settings");if(t.ok){const e=await t.json();vt(e)}else{const t=localStorage.getItem("adminSettings");let n="";if(t)try{const e=JSON.parse(t);n=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),vt({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:n})}}catch(t){console.error("Error fetching company settings:",t);const n=localStorage.getItem("adminSettings");let i="";if(n)try{const e=JSON.parse(n);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),vt({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},Kt=e=>{if(!yt)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${yt.companyLogo?`<img src="${yt.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${yt.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${yt.address?`${yt.address}<br>`:""}\n                    ${[yt.city,yt.state,yt.postalCode].filter(Boolean).join(", ")}${yt.city||yt.state||yt.postalCode?"<br>":""}\n                    ${yt.country?`${yt.country}<br>`:""}\n                    ${yt.phone?`Tel: ${yt.phone}<br>`:""}\n                    ${yt.email?`Email: ${yt.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${hn(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${hn(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${hn(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(t=>`\n                    <tr>\n                        <td>${t.description}</td>\n                        <td class="text-center">${t.quantity}</td>\n                        <td class="text-right">${(0,l.vv)(t.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,l.vv)(t.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,l.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${e.discountType&&"none"!==e.discountType&&e.discountAmount>0?`\n                <div class="summary-row tax" style="color: #15803D;">\n                    <span>Discount${"percentage"===e.discountType?` (${e.discountValue}%)`:""}:</span>\n                    <span>-${(0,l.vv)(e.discountAmount,e.currency||"MYR")}</span>\n                </div>\n                `:""}\n                ${(e.additionalCharges||[]).map(t=>`\n                <div class="summary-row tax">\n                    <span>${t.name} (${t.rate}%):</span>\n                    <span>${(0,l.vv)(t.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,l.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${yt.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${yt.bankName}<br>\n                <strong>Account Name:</strong> ${yt.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${yt.bankAccount||"-"}\n                ${yt.swiftCode?`<br><strong>SWIFT Code:</strong> ${yt.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${yt.taxNumber||yt.registrationNumber?`\n        <div class="registration-info">\n            ${yt.registrationNumber?`Reg No: ${yt.registrationNumber}`:""}\n            ${yt.registrationNumber&&yt.taxNumber?" | ":""}\n            ${yt.taxNumber?`Tax No: ${yt.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},Zt=async e=>{if(!yt)return Ae("Company settings not loaded. Please try again."),void Be(!0);try{var t;const n=Kt(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const a=i.contentDocument||(null===(t=i.contentWindow)||void 0===t?void 0:t.document);if(!a)throw document.body.removeChild(i),new Error("Could not access iframe document");a.open(),a.write(n),a.close(),await new Promise(async e=>{try{var t;null!==(t=a.fonts)&&void 0!==t&&t.ready&&await a.fonts.ready}catch{}const n=a.querySelectorAll("img");await Promise.all(Array.from(n).map(e=>e.complete?Promise.resolve():new Promise(t=>{e.onload=t,e.onerror=t}))),setTimeout(e,100)});const r=await y()(a.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=r.toDataURL("image/png"),s=new m.default({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=r.height*l/r.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(n){console.error("Error generating PDF:",n),Ae("Failed to generate PDF. Please try again."),Be(!0)}},Xt=e=>{if(!yt)return Ae("Company settings not loaded. Please try again."),void Be(!0);const t=Kt(e),n=window.open("","_blank","width=800,height=600");n&&(n.document.write(t),n.document.close(),setTimeout(()=>{n.print()},250))},en=async e=>{Ce(e);let t="";if("restaurant"===e.payerType&&e.restaurantId){const n=st.find(t=>t.id===e.restaurantId);null!==n&&void 0!==n&&n.email&&(t=n.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const n=rt.find(t=>t.id===e.managerId);null!==n&&void 0!==n&&n.email&&(t=n.email)}if(!t&&e.managerId){const n=rt.find(t=>t.id===e.managerId);null!==n&&void 0!==n&&n.email&&(t=n.email)}Fe(t),je(!0)},tn=()=>{Mt({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),gt(null),xt(""),ht(!1)},nn=e=>{if("pending_payment"!==e.status)return!1;const t=new Date;return new Date(e.dueDate)<t},an=e=>nn(e)?"overdue":e.status,rn=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},on=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},sn=a.filter(e=>{const t=g.toLowerCase(),n=rn(e.status).toLowerCase(),i="automatic"===e.type?"auto automatic":"manual",a=(e.planType||"").toLowerCase(),r=(e.categoryDisplayName||"").toLowerCase(),o=(e.customerName||e.restaurantName||"").toLowerCase(),s=on(e.payerType||"restaurant").toLowerCase(),l=!g||(e.companyName||"").toLowerCase().includes(t)||(e.invoiceNumber||"").toLowerCase().includes(t)||(e.managerName||"").toLowerCase().includes(t)||n.includes(t)||i.includes(t)||a.includes(t)||r.includes(t)||o.includes(t)||s.includes(t)||(e.billingPeriod||"").toLowerCase().includes(t);let d=!0;if(te.start&&te.end){const t=new Date(e.issueDate),n=new Date(te.start),i=new Date(te.end);n.setHours(0,0,0,0),i.setHours(23,59,59,999),d=t>=n&&t<=i}return l&&d}).sort((e,t)=>{let n=0;switch(Tt){case"invoiceNumber":n=e.invoiceNumber.localeCompare(t.invoiceNumber);break;case"companyName":n=(e.companyName||"").localeCompare(t.companyName||"");break;case"issueDate":default:n=new Date(e.issueDate).getTime()-new Date(t.issueDate).getTime();break;case"dueDate":n=new Date(e.dueDate).getTime()-new Date(t.dueDate).getTime();break;case"amount":n=e.total-t.total;break;case"status":n=(e.status||"").localeCompare(t.status||"")}return"desc"===zt?-n:n}),ln=e=>{Tt===e?It("asc"===zt?"desc":"asc"):($t(e),It("dueDate"===e||"amount"===e?"desc":"asc"))},dn=e=>Tt!==e?"":"asc"===zt?" \u25b2":" \u25bc",cn=a.length,pn=a.filter(e=>"paid"===e.status).length,xn=a.filter(e=>nn(e)).length,un=a.filter(e=>"paid"===e.status).reduce((e,t)=>e+t.total,0),hn=e=>new Date(e).toLocaleDateString("en-MY"),mn=e=>{He(e),oe(!0)},gn=t=>{var n,i;if(He(t),Ve({managerId:t.managerId,managerName:t.managerName,companyName:t.companyName||"",restaurantId:t.restaurantId||"",restaurantName:t.restaurantName||"",amount:(t.subtotalBeforeDiscount||t.amount).toString(),tax:t.tax.toString(),total:t.total.toString(),dueDate:t.dueDate?t.dueDate.split("T")[0]:"",status:t.status,planType:t.planType,billingCycle:"monthly",description:(null===(n=t.items)||void 0===n||null===(i=n[0])||void 0===i?void 0:i.description)||"",payerType:t.payerType||"restaurant",payerId:t.payerId||"",items:t.items,currency:t.currency||e.currency||"MYR",discountType:t.discountType||"none",discountValue:t.discountValue?t.discountValue.toString():"",discountReason:t.discountReason||"",invoiceCategory:t.invoiceCategory||"service",customDescription:t.customDescription||"",serviceDescription:t.serviceDescription||""}),t.restaurantId){const e=st.find(e=>e.id===t.restaurantId);e&&(at({type:"restaurant",data:e}),Ze(e.name))}else if(t.managerId){const e=rt.find(e=>e.id===t.managerId);e&&(at({type:"manager",data:e}),Ze(e.fullName))}qe(""),Qe(null),le(!0)},yn=e=>{He(e),ce(!0)},vn=e=>{He(e),ve(!0)};return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(x.mc,{children:[(0,v.jsxs)(x.Y9,{children:[(0,v.jsx)(x.hE,{children:"Invoices"}),(0,v.jsx)(x.ex,{children:(0,v.jsx)(f,{variant:"secondary",onClick:async()=>{Nt(!0);try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/invoices/generate-missing-bulk",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),n=await t.json();n.success&&(Ae(n.message),Be(!0),n.totalGenerated>0&&Rt())}catch(e){console.error("Error generating missing invoices:",e)}finally{Nt(!1)}},disabled:Dt,style:{opacity:Dt?.6:1},children:Dt?"Generating...":"Generate Missing Invoices"})})]}),(0,v.jsxs)(x.UC,{children:[(0,v.jsxs)(x.MD,{children:[(0,v.jsxs)(x.hI,{color:"#059669",children:[(0,v.jsx)(x.Os,{children:cn}),(0,v.jsx)(x.v0,{children:"Total Invoices"}),(0,v.jsx)(x.d1,{children:"All invoice records"})]}),(0,v.jsxs)(x.hI,{color:"#2563EB",children:[(0,v.jsx)(x.Os,{children:pn}),(0,v.jsx)(x.v0,{children:"Paid Invoices"}),(0,v.jsxs)(x.d1,{children:[cn>0?Math.round(pn/cn*100):0,"% completed"]})]}),(0,v.jsxs)(x.hI,{color:"#DC2626",children:[(0,v.jsx)(x.Os,{children:xn}),(0,v.jsx)(x.v0,{children:"Overdue Invoices"}),(0,v.jsx)(x.d1,{children:"Requires attention"})]}),(0,v.jsxs)(x.hI,{color:"#7C3AED",children:[(0,v.jsx)(x.Os,{children:(0,l.vv)(un)}),(0,v.jsx)(x.v0,{children:"Total Revenue"}),(0,v.jsx)(x.d1,{children:"From paid invoices"})]})]}),(0,v.jsxs)(h.tU,{children:[(0,v.jsx)(h.oz,{active:"invoices"===Ee,onClick:()=>De("invoices"),children:"Invoices"}),(0,v.jsxs)(h.oz,{active:"payment_submitted"===Ee,onClick:()=>De("payment_submitted"),children:["Payment Submitted",(0,v.jsx)(h.Ex,{count:a.filter(e=>"payment_submitted"===e.status).length,variant:"danger"})]}),(0,v.jsx)(h.oz,{active:"categories"===Ee,onClick:()=>De("categories"),children:"Invoice Categories"})]}),"invoices"===Ee&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(r.A,{activePeriod:K,dateRange:te,isCustomDateRange:X,onPeriodChange:e=>{Z(e),ee(!1),ne((0,r.x)(e))},onCalendarRangeSelect:(e,t)=>{ee(!0),Z("all"),ne({start:e,end:t})},children:[(0,v.jsx)(u.DO,{placeholder:"Search invoices...",value:g,onChange:e=>Q(e.target.value)}),(0,v.jsxs)(k,{children:[(0,v.jsx)("input",{type:"checkbox",checked:At,onChange:e=>Et(e.target.checked)}),"Include Demo"]}),(0,v.jsx)(W,{children:(0,v.jsx)(f,{variant:"primary",onClick:()=>{tn(),ae(!0)},children:"Create Invoice"})})]}),(0,v.jsxs)(x.an,{children:[(0,v.jsxs)(x.bQ,{children:[(0,v.jsx)(x.B_,{children:(0,v.jsxs)("tr",{children:[(0,v.jsxs)(x.gU,{align:"left",style:{cursor:"pointer"},onClick:()=>ln("invoiceNumber"),children:["Invoice",dn("invoiceNumber")]}),(0,v.jsxs)(x.gU,{align:"left",style:{cursor:"pointer"},onClick:()=>ln("companyName"),children:["Customer",dn("companyName")]}),(0,v.jsx)(x.gU,{align:"center",children:"Period"}),(0,v.jsx)(x.gU,{align:"center",children:"Issued"}),(0,v.jsxs)(x.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>ln("dueDate"),children:["Due",dn("dueDate")]}),(0,v.jsxs)(x.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>ln("status"),children:["Status",dn("status")]}),(0,v.jsxs)(x.gU,{align:"right",style:{cursor:"pointer"},onClick:()=>ln("amount"),children:["Amount",dn("amount")]}),(0,v.jsx)(x.gU,{align:"right",children:"Total"}),(0,v.jsx)(x.gU,{isActions:!0,children:"Actions"})]})}),(0,v.jsx)("tbody",{children:sn.map(e=>(0,v.jsxs)(x.J2,{children:[(0,v.jsx)(x.Bv,{"data-label":"Invoice",align:"left",children:(0,v.jsxs)(j,{children:[(0,v.jsxs)(b,{children:[e.invoiceNumber,"automatic"===e.type&&(0,v.jsx)(w,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,v.jsx)(F,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,v.jsx)(x.Bv,{"data-label":"Customer",align:"left",children:(0,v.jsxs)(j,{children:[(0,v.jsxs)(b,{children:[e.customerName||e.restaurantName||"Unknown",e.isDemo&&(0,v.jsx)(C,{children:"DEMO"})]}),(0,v.jsx)(F,{children:on(e.payerType||"restaurant")})]})}),(0,v.jsx)(x.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,v.jsx)(x.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:hn(e.issueDate)}),(0,v.jsx)(x.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:hn(e.dueDate)}),(0,v.jsxs)(x.Bv,{"data-label":"Status",align:"center",children:[(0,v.jsx)(B,{status:an(e),children:rn(an(e))}),e.isModified&&(0,v.jsx)("span",{style:{display:"inline-block",marginLeft:"4px",padding:"2px 6px",fontSize:"10px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px",verticalAlign:"middle"},children:"Modified"})]}),(0,v.jsx)(x.Bv,{"data-label":"Amount",align:"right",children:(0,v.jsx)(x.DM,{children:(0,l.vv)(e.amount,e.currency||"MYR")})}),(0,v.jsx)(x.Bv,{"data-label":"Total",align:"right",children:(0,v.jsx)(x.DM,{highlight:!0,children:0===Number(e.total)?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"MYR")})}),(0,v.jsx)(x.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,v.jsxs)(x.wr,{children:[(0,v.jsx)(S,{variant:"primary",onClick:()=>mn(e),children:"View"}),"draft"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(S,{onClick:()=>gn(e),children:"Edit"}),(0,v.jsx)(S,{variant:"success",onClick:()=>(e=>{He(e),xe(!0)})(e),title:"Send Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,v.jsx)("polygon",{points:"22,2 15,22 11,13 2,9 22,2"})]})}),(0,v.jsx)(A,{onClick:()=>vn(e),title:"Delete Invoice",children:(0,v.jsx)(E,{children:"\xd7"})})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(S,{onClick:()=>gn(e),children:"Edit"}),0===Number(e.total)&&(0,v.jsx)(S,{variant:"primary",onClick:()=>yn(e),children:"Mark Paid"}),(0,v.jsx)(S,{onClick:()=>Zt(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(S,{onClick:()=>Xt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(S,{variant:"email",onClick:()=>en(e),title:"Send Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,v.jsx)(A,{onClick:()=>vn(e),title:"Delete Invoice",children:(0,v.jsx)(E,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,v.jsxs)(v.Fragment,{children:[e.hasPaymentInfo&&(0,v.jsx)(S,{variant:"primary",onClick:()=>yn(e),children:"Confirm"}),(0,v.jsx)(S,{onClick:()=>Zt(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(S,{onClick:()=>Xt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(S,{variant:"email",onClick:()=>en(e),title:"Resend Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(S,{onClick:()=>gn(e),children:"Edit"}),0===Number(e.total)&&(0,v.jsx)(S,{variant:"primary",onClick:()=>yn(e),children:"Mark Paid"}),(0,v.jsx)(S,{onClick:()=>Zt(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(S,{onClick:()=>Xt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(S,{variant:"email",onClick:()=>en(e),title:"Resend Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,v.jsx)(A,{onClick:()=>vn(e),title:"Delete Invoice",children:(0,v.jsx)(E,{children:"\xd7"})})]}),"paid"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(S,{onClick:()=>Zt(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(S,{onClick:()=>Xt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,v.jsx)(S,{onClick:()=>Zt(e),title:"Download Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})})]},e.id))})]}),0===sn.length&&(0,v.jsxs)(x.ys,{children:[(0,v.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,v.jsx)("div",{style:{fontSize:"14px"},children:0===a.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"payment_submitted"===Ee&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"Payment Confirmation Required"}),(0,v.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:0},children:"These invoices have payment submitted and are waiting for your confirmation."})]}),(0,v.jsxs)(x.an,{children:[(0,v.jsxs)(x.bQ,{children:[(0,v.jsx)(x.B_,{children:(0,v.jsxs)("tr",{children:[(0,v.jsx)(x.gU,{align:"left",children:"Invoice"}),(0,v.jsx)(x.gU,{align:"left",children:"Customer"}),(0,v.jsx)(x.gU,{align:"center",children:"Payment Method"}),(0,v.jsx)(x.gU,{align:"center",children:"Submitted Date"}),(0,v.jsx)(x.gU,{align:"right",children:"Amount"}),(0,v.jsx)(x.gU,{isActions:!0,children:"Actions"})]})}),(0,v.jsx)("tbody",{children:a.filter(e=>"payment_submitted"===e.status).map(e=>(0,v.jsxs)(x.J2,{children:[(0,v.jsx)(x.Bv,{"data-label":"Invoice",align:"left",children:(0,v.jsxs)(j,{children:[(0,v.jsx)(b,{children:e.invoiceNumber}),(0,v.jsx)(F,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,v.jsx)(x.Bv,{"data-label":"Customer",align:"left",children:(0,v.jsxs)(j,{children:[(0,v.jsx)(b,{children:e.customerName||e.restaurantName||"Unknown"}),(0,v.jsx)(F,{children:e.companyName})]})}),(0,v.jsx)(x.Bv,{"data-label":"Payment Method",align:"center",children:e.paymentMethod||"-"}),(0,v.jsx)(x.Bv,{"data-label":"Submitted",align:"center",children:e.paidDate?hn(e.paidDate):"-"}),(0,v.jsx)(x.Bv,{"data-label":"Amount",align:"right",children:(0,v.jsx)(x.DM,{highlight:!0,children:0===Number(e.total)?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"MYR")})}),(0,v.jsx)(x.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,v.jsxs)(x.wr,{children:[(0,v.jsx)(S,{onClick:()=>mn(e),children:"View"}),(0,v.jsx)(S,{variant:"primary",onClick:()=>{He(e),ce(!0)},children:"Confirm Payment"})]})})]},e.id))})]}),0===a.filter(e=>"payment_submitted"===e.status).length&&(0,v.jsxs)(x.ys,{children:[(0,v.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",marginBottom:"8px"},children:"No Pending Confirmations"}),(0,v.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"There are no invoices waiting for payment confirmation."})]})]})]}),"categories"===Ee&&(0,v.jsxs)("div",{style:{padding:"24px 0"},children:[(0,v.jsxs)(P,{children:[(0,v.jsxs)("div",{children:[(0,v.jsx)(L,{children:"Invoice Categories"}),(0,v.jsx)("p",{style:{color:"#6B7280",fontSize:"14px",margin:"8px 0 0 0"},children:"Manage invoice categories for organizing different types of charges."})]}),(0,v.jsx)(f,{variant:"primary",onClick:()=>Lt(),children:"Add Category"})]}),0===bt.length?(0,v.jsxs)(o.pp,{children:[(0,v.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"No categories yet"}),(0,v.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:"0 0 16px 0"},children:"Create your first invoice category to get started."}),(0,v.jsx)(f,{variant:"primary",onClick:()=>Lt(),children:"Add Category"})]}):(0,v.jsx)(D,{children:bt.map(e=>(0,v.jsxs)(N,{isActive:e.is_active,children:[(0,v.jsx)(T,{children:e.name.charAt(0).toUpperCase()}),(0,v.jsxs)($,{children:[(0,v.jsxs)(z,{children:[e.name,(0,v.jsx)(M,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,v.jsxs)(I,{children:[(0,v.jsxs)("span",{children:["Code: ",(0,v.jsx)("strong",{children:e.code})]}),e.description&&(0,v.jsx)("span",{children:e.description})]})]}),(0,v.jsxs)(_,{children:[(0,v.jsx)(R,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({is_active:!e.is_active})});(await n.json()).success&&Pt()}catch(t){console.error("Failed to toggle category:",t)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.is_active?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,v.jsx)("circle",{cx:"12",cy:"12",r:"3"})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),(0,v.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})})}),(0,v.jsx)(R,{onClick:()=>Lt(e),title:"Edit Category",children:(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,v.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,v.jsx)(R,{onClick:()=>(e=>{Oe(e),Le(!0)})(e),title:"Delete Category",children:(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"3,6 5,6 21,6"}),(0,v.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]})})]})]},e.id))})]}),Ne&&(0,v.jsxs)(x.aF,{isOpen:!0,onClose:Wt,title:$e?"Edit Category":"Add Category",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(f,{variant:"secondary",type:"button",onClick:Wt,children:"Cancel"}),(0,v.jsxs)(f,{variant:"primary",type:"submit",disabled:Me||!Ie.name||!Ie.code,children:[" ",Me?"Saving...":$e?"Update":"Create"," "]})]}),children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Name *"}),(0,v.jsx)(U,{value:Ie.name,onChange:e=>_e({...Ie,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Code *"}),(0,v.jsx)(U,{value:Ie.code,onChange:e=>_e({...Ie,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===$e||void 0===$e?void 0:$e.is_system}),(0,v.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Description"}),(0,v.jsx)(V,{value:Ie.description,onChange:e=>_e({...Ie,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,v.jsx)(p.A,{isOpen:Pe,onCancel:()=>Le(!1),onConfirm:async()=>{if(We)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/categories/${We.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success?(Le(!1),Oe(null),Pt()):alert(n.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===We||void 0===We?void 0:We.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),ie&&(0,v.jsxs)(x.aF,{isOpen:!0,onClose:()=>{ae(!1),tn()},title:"Create Invoice",footer:(0,v.jsxs)(v.Fragment,{children:[Bt&&(0,v.jsxs)("div",{style:{padding:"10px 16px",background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",fontSize:"13px",color:"#92400E",marginBottom:"12px"},children:[" ",Bt," "]})," ",(0,v.jsx)(f,{variant:"secondary",onClick:()=>{ae(!1),tn()},children:" Cancel "}),(0,v.jsx)(f,{variant:"primary",onClick:async()=>{if(mt&&_t.amount&&_t.dueDate)try{const e=parseFloat(_t.amount),t=parseFloat(_t.discountValue)||0,n="percentage"===_t.discountType?e*(t/100):"fixed"===_t.discountType?t:0,i=Math.max(0,e-n),a=Yt.filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(i*e.rate/100*100)/100})),r=a.reduce((e,t)=>e+t.amount,0),o=i+r;let s="";s="others"===_t.invoiceCategory?_t.customDescription||"":_t.serviceDescription||"";let l="",d="",c="";if("restaurant"===mt.type){const e=mt.data;l=e.name,c=e.name;const t=[];e.address&&t.push(e.address),e.phone&&t.push(`Phone: ${e.phone}`),e.email&&t.push(`Email: ${e.email}`),d=t.join("\n")}else if("manager"===mt.type){const e=mt.data;l=e.fullName,c=e.companyName||e.fullName;const t=[];e.companyName&&t.push(e.companyName),e.email&&t.push(`Email: ${e.email}`),d=t.join("\n")}let p="restaurant";if("manager"===mt.type){const e=mt.data;"Brand General"===e.role||"Brand Manager"===e.role?p="brand_manager":"Foodcourt General"!==e.role&&"Foodcourt Manager"!==e.role||(p="foodcourt_manager")}const x={restaurant_id:"restaurant"===mt.type?mt.data.id:null,payer_type:p,payer_id:"manager"===mt.type?mt.data.id:null,type:"manual",billing_period_start:null,billing_period_end:null,due_date:new Date(_t.dueDate).toISOString(),total_amount:o,subtotal_before_discount:n>0?e:null,discount_type:"none"!==_t.discountType?_t.discountType:null,discount_value:n>0?t:null,discount_amount:n>0?n:null,discount_reason:_t.discountReason||null,currency:_t.currency||"MYR",status:"draft",notes:`${c}\n${l}\n${d}\n\n${s}`,issued_by:1,issued_at:(new Date).toISOString(),issuer_type:"system_admin",invoice_category:_t.invoiceCategory||"service",additional_charges:a},u=[{item_type:_t.invoiceCategory,description:s,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:0,tax_amount:0,total_amount:e}],h=localStorage.getItem("auth_token"),m=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({invoice_data:x,items:u})});if(m.ok)await Rt(),ae(!1),tn();else{const e=await m.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!mt||!_t.amount||!_t.dueDate,children:" Create Invoice "})]}),children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Search Manager or Restaurant *"}),(0,v.jsxs)("div",{style:{position:"relative"},children:[(0,v.jsx)(U,{type:"text",value:pt,onChange:e=>(e=>{if(xt(e),ht(!0),e.length<2)return void ct({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",rt),console.log("Available restaurants:",st);const t=rt.filter(t=>t.fullName&&t.fullName.toLowerCase().includes(e.toLowerCase())||t.companyName&&t.companyName.toLowerCase().includes(e.toLowerCase())),n=st.filter(t=>t.name&&t.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",t),console.log("Filtered restaurants:",n),ct({managers:t.slice(0,5),restaurants:n.slice(0,5)})})(e.target.value),onFocus:()=>ht(!0),onBlur:()=>setTimeout(()=>ht(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),ut&&(dt.managers.length>0||dt.restaurants.length>0)&&(0,v.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[dt.managers.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),dt.managers.map(e=>(0,v.jsxs)("div",{onClick:()=>Jt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),dt.restaurants.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),dt.restaurants.map(e=>{const t=rt.find(t=>t.id===e.admin_id);return(0,v.jsxs)("div",{onClick:()=>Jt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===t||void 0===t?void 0:t.fullName)||"Unknown"]})]},e.id)})]})]})]}),mt&&(0,v.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===mt.type?mt.data.fullName:mt.data.name}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===mt.type?`${mt.data.companyName} \u2022 Manager`:`${mt.data.address||"No address"} \u2022 Restaurant`})]}),(0,v.jsx)("button",{onClick:()=>{gt(null),xt("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,v.jsxs)(O,{children:[(0,v.jsxs)(Y,{children:[(0,v.jsxs)(H,{children:["Amount",_t.currency?` (${(0,l.Qn)(_t.currency)})`:""," *"]}),(0,v.jsx)(U,{type:"number",step:_t.currency&&0===(0,l.e_)(_t.currency)?"1":"0.01",min:"0",value:_t.amount,onChange:e=>{const t=parseFloat(e.target.value)||0,n=parseFloat(_t.discountValue)||0,i="percentage"===_t.discountType?t*(n/100):"fixed"===_t.discountType?n:0,a=Math.max(0,t-i),r=Yt.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+a*t.rate/100,0),o=a+r;Mt({..._t,amount:e.target.value,tax:r.toFixed(2),total:o.toFixed(2)})},onBlur:e=>{if(e.target.value&&_t.currency){const t=(0,l.e_)(_t.currency),n=parseFloat(e.target.value)||0,i=n.toFixed(t),a=parseFloat(_t.discountValue)||0,r="percentage"===_t.discountType?n*(a/100):"fixed"===_t.discountType?a:0,o=Math.max(0,n-r),s=Yt.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+o*t.rate/100,0),d=o+s;Mt({..._t,amount:i,tax:s.toFixed(t),total:d.toFixed(t)})}},placeholder:_t.currency&&0===(0,l.e_)(_t.currency)?"0":"0.00",required:!0,disabled:!mt}),!mt&&(0,v.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px",display:"block"},children:"Select a manager or restaurant first"})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Due Date *"}),(0,v.jsx)(U,{type:"date",value:_t.dueDate,onChange:e=>Mt({..._t,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,v.jsxs)(O,{children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Discount"}),(0,v.jsxs)(G,{value:_t.discountType,onChange:e=>{const t=e.target.value,n=parseFloat(_t.amount)||0,i="none"===t?0:parseFloat(_t.discountValue)||0,a="percentage"===t?n*(i/100):"fixed"===t?i:0,r=Math.max(0,n-a),o=Yt.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+r*t.rate/100,0),s=r+o;Mt({..._t,discountType:t,discountValue:"none"===t?"":_t.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,v.jsx)("option",{value:"none",children:"No Discount"}),(0,v.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,v.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==_t.discountType&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"percentage"===_t.discountType?"Discount (%)":"Discount Amount"}),(0,v.jsx)(U,{type:"number",step:"0.01",min:"0",max:"percentage"===_t.discountType?"100":void 0,value:_t.discountValue,onChange:e=>{const t=parseFloat(_t.amount)||0,n=parseFloat(e.target.value)||0,i="percentage"===_t.discountType?t*(n/100):n,a=Math.max(0,t-i),r=Yt.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+a*t.rate/100,0),o=a+r;Mt({..._t,discountValue:e.target.value,tax:r.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==_t.discountType&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Discount Reason"}),(0,v.jsx)(U,{type:"text",value:_t.discountReason,onChange:e=>Mt({..._t,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Invoice Category"}),(0,v.jsx)(G,{value:_t.invoiceCategory||"service",onChange:e=>Mt({..._t,invoiceCategory:e.target.value}),children:bt.length>0?bt.filter(e=>"subscription"!==e.code).map(e=>(0,v.jsx)("option",{value:e.code,children:e.name},e.id)):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("option",{value:"service",children:"Service"}),(0,v.jsx)("option",{value:"consulting",children:"Consulting"}),(0,v.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(_t.invoiceCategory||"service")&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Item/Description"}),(0,v.jsx)(V,{value:"others"===_t.invoiceCategory?_t.customDescription||"":_t.serviceDescription||"",onChange:e=>{"others"===_t.invoiceCategory?Mt({..._t,customDescription:e.target.value}):Mt({..._t,serviceDescription:e.target.value})},placeholder:`Enter ${_t.invoiceCategory||"service"} description...`,rows:2})]}),(0,v.jsxs)(q,{children:[(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:_t.currency?(0,l.vv)(parseFloat(_t.amount||"0"),_t.currency):"-"})]}),"none"!==_t.discountType&&parseFloat(_t.discountValue||"0")>0&&(()=>{const e=parseFloat(_t.amount||"0"),t=parseFloat(_t.discountValue||"0"),n="percentage"===_t.discountType?e*(t/100):t;return(0,v.jsxs)(J,{children:[(0,v.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===_t.discountType?` (${t}%)`:"",":"]}),(0,v.jsxs)("span",{style:{color:"#15803D"},children:["-",_t.currency?(0,l.vv)(n,_t.currency):"-"]})]})})(),Yt.filter(e=>e.enabled&&e.name&&e.rate>0).map((e,t)=>{const n=parseFloat(_t.amount||"0"),i=parseFloat(_t.discountValue||"0"),a="percentage"===_t.discountType?n*(i/100):"fixed"===_t.discountType?i:0,r=Math.max(0,n-a)*(e.rate/100);return(0,v.jsxs)(J,{children:[(0,v.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,v.jsx)("span",{children:_t.currency?(0,l.vv)(r,_t.currency):"-"})]},t)}),(0,v.jsxs)(J,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:_t.currency?(0,l.vv)(parseFloat(_t.total||"0"),_t.currency):"-"})})]})]})]}),re&&Ye&&(0,v.jsxs)(x.aF,{isOpen:!0,onClose:()=>oe(!1),title:"Invoice Details",size:"large",footer:(0,v.jsx)(v.Fragment,{children:(0,v.jsx)(f,{variant:"secondary",onClick:()=>oe(!1),children:"Close"})}),children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===yt||void 0===yt?void 0:yt.companyLogo)&&(0,v.jsx)("img",{src:yt.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,v.jsx)("div",{style:{fontSize:null!==yt&&void 0!==yt&&yt.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===yt||void 0===yt?void 0:yt.companyName)||"Company Name"}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===yt||void 0===yt?void 0:yt.address)&&(0,v.jsx)("div",{children:yt.address}),((null===yt||void 0===yt?void 0:yt.city)||(null===yt||void 0===yt?void 0:yt.state)||(null===yt||void 0===yt?void 0:yt.postalCode))&&(0,v.jsx)("div",{children:[null===yt||void 0===yt?void 0:yt.city,null===yt||void 0===yt?void 0:yt.state,null===yt||void 0===yt?void 0:yt.postalCode].filter(Boolean).join(", ")}),(null===yt||void 0===yt?void 0:yt.country)&&(0,v.jsx)("div",{children:yt.country}),(null===yt||void 0===yt?void 0:yt.phone)&&(0,v.jsxs)("div",{children:["Tel: ",yt.phone]}),(null===yt||void 0===yt?void 0:yt.email)&&(0,v.jsxs)("div",{children:["Email: ",yt.email]})]})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,v.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Ye.invoiceNumber}),(0,v.jsx)(B,{status:Ye.status,style:{marginTop:"8px"},children:rn(Ye.status)}),Ye.isModified&&(0,v.jsx)("span",{style:{display:"inline-block",marginTop:"4px",padding:"2px 8px",fontSize:"11px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px"},children:"Modified"})]})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,v.jsxs)("div",{style:{flex:1},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,v.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:Ye.customerName}),Ye.customerAddress&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:Ye.customerAddress}),"restaurant"===Ye.payerType&&Ye.restaurantName&&"Unknown Restaurant"!==Ye.restaurantName&&(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",Ye.restaurantName]}),Ye.companyName&&Ye.companyName!==Ye.customerName&&(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Company: ",Ye.companyName]})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ye.billingPeriod||"-"})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:hn(Ye.issueDate)})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:hn(Ye.dueDate)})]}),Ye.paidDate&&(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:hn(Ye.paidDate)})]})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,v.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,v.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,v.jsx)("tbody",{children:Ye.items.map((e,t)=>(0,v.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,l.vv)(e.unitPrice,Ye.currency||"MYR")}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,l.vv)(e.total,Ye.currency||"MYR")})]},t))})]})]}),(0,v.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,v.jsx)("div",{style:{width:"280px"},children:(0,v.jsxs)(q,{children:[(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:(0,l.vv)(Ye.subtotalBeforeDiscount||Ye.amount,Ye.currency||"MYR")})]}),Ye.discountType&&"none"!==Ye.discountType&&Ye.discountAmount>0&&(0,v.jsxs)(J,{children:[(0,v.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Ye.discountType?` (${Ye.discountValue}%)`:"",":"]}),(0,v.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,l.vv)(Ye.discountAmount,Ye.currency||"MYR")]})]}),(Ye.additionalCharges||[]).map((e,t)=>(0,v.jsxs)(J,{children:[(0,v.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,v.jsx)("span",{children:(0,l.vv)(e.amount,Ye.currency||"MYR")})]},t)),0===(Ye.additionalCharges||[]).length&&Ye.tax>0&&(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Tax:"}),(0,v.jsx)("span",{children:(0,l.vv)(Ye.tax,Ye.currency||"MYR")})]}),(0,v.jsxs)(J,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:(0,l.vv)(Ye.total,Ye.currency||"MYR")})})]})]})})}),(null===yt||void 0===yt?void 0:yt.bankName)&&(0,v.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Bank:"})," ",yt.bankName]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Name:"})," ",yt.bankAccountName]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Number:"})," ",yt.bankAccount]})]})]}),((null===yt||void 0===yt?void 0:yt.taxNumber)||(null===yt||void 0===yt?void 0:yt.registrationNumber))&&(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===yt||void 0===yt?void 0:yt.registrationNumber)&&(0,v.jsxs)("span",{children:["Reg No: ",yt.registrationNumber]}),(null===yt||void 0===yt?void 0:yt.registrationNumber)&&(null===yt||void 0===yt?void 0:yt.taxNumber)&&(0,v.jsx)("span",{children:" | "}),(null===yt||void 0===yt?void 0:yt.taxNumber)&&(0,v.jsxs)("span",{children:["Tax No: ",yt.taxNumber]})]}),Ye.isModified&&Ye.modificationHistory&&Ye.modificationHistory.length>0&&(0,v.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,v.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#92400E",marginBottom:"12px"},children:"Modification History"}),Ye.modificationHistory.map((e,t)=>(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:t<Ye.modificationHistory.length-1?"10px":"0",paddingBottom:t<Ye.modificationHistory.length-1?"10px":"0",borderBottom:t<Ye.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,v.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,v.jsxs)("div",{style:{marginTop:"3px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,v.jsx)("div",{style:{marginTop:"3px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[t,n]=e;return(0,v.jsxs)("div",{children:[t,": ",String(n.from)," \u2192 ",String(n.to)]},t)})})]},t))]})]}),de&&Ye&&(0,v.jsxs)(x.aF,{isOpen:!0,onClose:()=>ce(!1),title:`Confirm Payment - ${Ye.invoiceNumber}`,footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(f,{variant:"secondary",onClick:()=>ce(!1),children:" Cancel "}),(0,v.jsx)(f,{variant:"primary",onClick:async()=>{if(Ye)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${Ye.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(t.ok)await Rt(),ce(!1),He(null),window.dispatchEvent(new Event("refreshBadgeCounts"));else{const e=await t.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:" Confirm Payment Received "})]}),children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Invoice Summary"}),(0,v.jsxs)(q,{children:[(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Customer:"}),(0,v.jsx)("span",{children:Ye.customerName||Ye.managerName})]}),(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Company:"}),(0,v.jsx)("span",{children:Ye.companyName})]}),(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Invoice Number:"}),(0,v.jsx)("span",{children:Ye.invoiceNumber})]}),(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Due Date:"}),(0,v.jsx)("span",{children:hn(Ye.dueDate)})]}),(0,v.jsxs)(J,{highlight:!0,children:[(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:"Payment Amount:"})}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:(0,l.vv)(Ye.total,Ye.currency||"MYR")})})]})]})]}),Ye.hasPaymentInfo&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Customer's Payment Information"}),(0,v.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,v.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,v.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,v.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===Ye.paymentMethod?"Bank Transfer":"qr_payment"===Ye.paymentMethod?"QR Payment":"stripe"===Ye.paymentMethod?"Stripe":"paypal"===Ye.paymentMethod?"PayPal":Ye.paymentMethod||"Not specified"]}),Ye.transactionId&&(0,v.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,v.jsx)("strong",{children:"Transaction ID:"})," ",Ye.transactionId]})]}),Ye.receiptUrl&&(0,v.jsxs)("div",{style:{marginTop:"12px"},children:[(0,v.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,v.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,v.jsx)("img",{src:Ye.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(Ye.receiptUrl,"_blank")}),(0,v.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,v.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,v.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,v.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,v.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Status Change"}),(0,v.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,v.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),se&&Ye&&Ue&&(0,v.jsxs)(x.aF,{isOpen:!0,onClose:()=>le(!1),title:`Edit Invoice - ${Ye.invoiceNumber}`,footer:(0,v.jsxs)(v.Fragment,{children:[Je&&(0,v.jsxs)("div",{style:{width:"100%",padding:"10px 14px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"6px",color:"#DC2626",fontSize:"13px"},children:[" ",Je," "]})," ",(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[(0,v.jsx)(f,{variant:"secondary",onClick:()=>le(!1),children:" Cancel "}),(0,v.jsx)(f,{variant:"primary",onClick:async()=>{if(Ye&&Ue)if(Qe(null),"automatic"!==Ye.type||Ge.trim())try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${Ye.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(Ue.amount),tax:parseFloat(Ue.tax),total:parseFloat(Ue.total),dueDate:Ue.dueDate,payerType:Ue.payerType,payerId:Ue.payerId,items:Ue.items,discountType:"none"!==Ue.discountType?Ue.discountType:null,discountValue:"none"!==Ue.discountType?parseFloat(Ue.discountValue)||0:null,discountAmount:(()=>{const e=parseFloat(Ue.amount)||0,t=parseFloat(Ue.discountValue)||0;return"percentage"===Ue.discountType?e*(t/100):"fixed"===Ue.discountType?t:null})(),discountReason:Ue.discountReason||null,subtotal:"none"!==Ue.discountType?parseFloat(Ue.amount)||0:null,additionalCharges:(()=>{const e=parseFloat(Ue.amount)||0,t=parseFloat(Ue.discountValue)||0,n="percentage"===Ue.discountType?e*(t/100):"fixed"===Ue.discountType?t:0,i=Math.max(0,e-n);return Ot(Ue.currency||"").filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(i*e.rate/100*100)/100}))})(),invoiceCategory:Ue.invoiceCategory,customDescription:Ue.customDescription,serviceDescription:Ue.serviceDescription,modificationReason:Ge.trim()||void 0})});if(t.ok){const e={...Ye,amount:parseFloat(Ue.amount),tax:parseFloat(Ue.tax),total:parseFloat(Ue.total),dueDate:Ue.dueDate,status:Ue.status,payerType:Ue.payerType,payerId:Ue.payerId,items:Ue.items};c(a.map(t=>t.id===Ye.id?e:t)),le(!1),He(null),Ve(null),await Rt()}else{const e=await t.json();Qe(e.error||"Failed to update invoice")}}catch(e){console.error("Error updating invoice:",e),Qe("Error updating invoice. Please try again.")}else Qe("Please enter a reason for modifying this invoice.")},children:" Save Changes "})]})]}),children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Search Manager or Restaurant *"}),(0,v.jsxs)("div",{style:{position:"relative"},children:[(0,v.jsx)(U,{type:"text",value:Ke,onChange:e=>(e=>{if(Ze(e),nt(!0),e.length<2)return void et({managers:[],restaurants:[]});const t=rt.filter(t=>t.fullName&&t.fullName.toLowerCase().includes(e.toLowerCase())||t.companyName&&t.companyName.toLowerCase().includes(e.toLowerCase())),n=st.filter(t=>t.name&&t.name.toLowerCase().includes(e.toLowerCase()));et({managers:t.slice(0,5),restaurants:n.slice(0,5)})})(e.target.value),onFocus:()=>nt(!0),onBlur:()=>setTimeout(()=>nt(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),tt&&(Xe.managers.length>0||Xe.restaurants.length>0)&&(0,v.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[Xe.managers.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),Xe.managers.map(e=>(0,v.jsxs)("div",{onClick:()=>Gt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),Xe.restaurants.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),Xe.restaurants.map(e=>{const t=rt.find(t=>t.id===e.admin_id);return(0,v.jsxs)("div",{onClick:()=>Gt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[t?`Manager: ${t.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),it&&(0,v.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===it.type?it.data.fullName:it.data.name}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===it.type?`${it.data.companyName} \u2022 Manager`:`${it.data.address||"No address"} \u2022 Restaurant`})]}),(0,v.jsx)("button",{onClick:()=>{at(null),Ze("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,v.jsxs)(O,{children:[(0,v.jsxs)(Y,{children:[(0,v.jsxs)(H,{children:["Amount (",Ue.currency||e.currency||"MYR",")"]}),(0,v.jsx)(U,{type:"number",value:Ue.amount,onChange:e=>{const t=parseFloat(e.target.value)||0,n=parseFloat(Ue.discountValue)||0,i="percentage"===Ue.discountType?t*(n/100):"fixed"===Ue.discountType?n:0,a=Math.max(0,t-i),r=Ot(Ue.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+a*t.rate/100,0),o=a+r;Ve({...Ue,amount:e.target.value,tax:r.toFixed(2),total:o.toFixed(2)})}})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Due Date"}),(0,v.jsx)(U,{type:"date",value:Ue.dueDate,onChange:e=>Ve({...Ue,dueDate:e.target.value})})]})]}),(0,v.jsxs)(O,{children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Discount"}),(0,v.jsxs)(G,{value:Ue.discountType,onChange:e=>{const t=e.target.value,n=parseFloat(Ue.amount)||0,i="none"===t?0:parseFloat(Ue.discountValue)||0,a="percentage"===t?n*(i/100):"fixed"===t?i:0,r=Math.max(0,n-a),o=Ot(Ue.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+r*t.rate/100,0),s=r+o;Ve({...Ue,discountType:t,discountValue:"none"===t?"":Ue.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,v.jsx)("option",{value:"none",children:"No Discount"}),(0,v.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,v.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==Ue.discountType&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"percentage"===Ue.discountType?"Discount (%)":"Discount Amount"}),(0,v.jsx)(U,{type:"number",step:"0.01",min:"0",max:"percentage"===Ue.discountType?"100":void 0,value:Ue.discountValue,onChange:e=>{const t=parseFloat(Ue.amount)||0,n=parseFloat(e.target.value)||0,i="percentage"===Ue.discountType?t*(n/100):n,a=Math.max(0,t-i),r=Ot(Ue.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+a*t.rate/100,0),o=a+r;Ve({...Ue,discountValue:e.target.value,tax:r.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==Ue.discountType&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Discount Reason"}),(0,v.jsx)(U,{type:"text",value:Ue.discountReason,onChange:e=>Ve({...Ue,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Invoice Category"}),(0,v.jsx)(G,{value:Ue.invoiceCategory||"service",onChange:e=>Ve({...Ue,invoiceCategory:e.target.value}),children:bt.length>0?bt.filter(e=>"subscription"!==e.code).map(e=>(0,v.jsx)("option",{value:e.code,children:e.name},e.id)):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("option",{value:"service",children:"Service"}),(0,v.jsx)("option",{value:"consulting",children:"Consulting"}),(0,v.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Ue.invoiceCategory||"service")&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Item/Description"}),(0,v.jsx)(V,{value:"others"===Ue.invoiceCategory?Ue.customDescription||"":Ue.serviceDescription||"",onChange:e=>{"others"===Ue.invoiceCategory?Ve({...Ue,customDescription:e.target.value}):Ve({...Ue,serviceDescription:e.target.value})},placeholder:`Enter ${Ue.invoiceCategory||"service"} description...`,rows:2})]}),(0,v.jsxs)(q,{children:[(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:Ue.currency?(0,l.vv)(parseFloat(Ue.amount||"0"),Ue.currency):"-"})]}),"none"!==Ue.discountType&&parseFloat(Ue.discountValue||"0")>0&&(()=>{const e=parseFloat(Ue.amount||"0"),t=parseFloat(Ue.discountValue||"0"),n="percentage"===Ue.discountType?e*(t/100):t;return(0,v.jsxs)(J,{children:[(0,v.jsxs)("span",{style:{color:"#DC2626"},children:["Discount (","percentage"===Ue.discountType?`${t}%`:"Fixed","):"]}),(0,v.jsxs)("span",{style:{color:"#DC2626"},children:["-",Ue.currency?(0,l.vv)(n,Ue.currency):n.toFixed(2)]})]})})(),Ot(Ue.currency||"").filter(e=>e.enabled&&e.name&&e.rate>0).map((e,t)=>{const n=parseFloat(Ue.amount||"0"),i=parseFloat(Ue.discountValue||"0"),a="percentage"===Ue.discountType?n*(i/100):"fixed"===Ue.discountType?i:0,r=Math.max(0,n-a)*e.rate/100;return(0,v.jsxs)(J,{children:[(0,v.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,v.jsx)("span",{children:Ue.currency?(0,l.vv)(r,Ue.currency):"-"})]},t)}),(0,v.jsxs)(J,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:Ue.currency?(0,l.vv)(parseFloat(Ue.total||"0"),Ue.currency):"-"})})]})]}),(0,v.jsxs)(Y,{style:{marginTop:"16px"},children:[(0,v.jsxs)(H,{children:["Modification Reason ","automatic"===(null===Ye||void 0===Ye?void 0:Ye.type)&&(0,v.jsx)("span",{style:{color:"#EF4444"},children:"*"})]}),(0,v.jsx)(V,{value:Ge,onChange:e=>qe(e.target.value),placeholder:"Enter reason for modification...",rows:2})]}),(null===Ye||void 0===Ye?void 0:Ye.modificationHistory)&&Ye.modificationHistory.length>0&&(0,v.jsxs)("div",{style:{marginTop:"16px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#92400E",marginBottom:"8px"},children:"Modification History"}),Ye.modificationHistory.map((e,t)=>(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:t<Ye.modificationHistory.length-1?"8px":"0",paddingBottom:t<Ye.modificationHistory.length-1?"8px":"0",borderBottom:t<Ye.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,v.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,v.jsxs)("div",{style:{marginTop:"2px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,v.jsx)("div",{style:{marginTop:"2px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[t,n]=e;return(0,v.jsxs)("span",{style:{marginRight:"8px"},children:[t,": ",String(n.from)," \u2192 ",String(n.to)]},t)})})]},t))]})]}),pe&&Ye&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:()=>xe(!1),title:"Send Invoice",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(f,{variant:"secondary",onClick:()=>xe(!1),children:" Cancel "}),(0,v.jsx)(f,{variant:"success",onClick:async()=>{if(Ye)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${Ye.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(t.ok)await Rt(),xe(!1),He(null);else{const e=await t.json();Ae(`Failed to send invoice: ${e.error||"Unknown error"}`),Be(!0)}}catch(e){console.error("Error sending invoice:",e),Ae("Error sending invoice. Please try again."),Be(!0)}},children:" Confirm "})]}),children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,v.jsx)("strong",{children:Ye.invoiceNumber})," to ",(0,v.jsx)("strong",{children:Ye.managerName||Ye.customerName}),"?"]}),(0,v.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:Ye.invoiceNumber})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Recipient:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:Ye.managerName||Ye.customerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:Ye.customerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,v.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,l.vv)(Ye.total,Ye.currency||"MYR")})]})]})]})}),ue&&Ye&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:()=>he(!1),title:"Resend Invoice",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(f,{variant:"secondary",onClick:()=>he(!1),children:" Cancel "}),(0,v.jsx)(f,{variant:"primary",onClick:()=>{Ye&&(he(!1),He(null))},children:" Resend Invoice "})]}),children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,v.jsx)("strong",{children:Ye.invoiceNumber})," to ",(0,v.jsx)("strong",{children:Ye.managerName}),"?"]}),(0,v.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),me&&Ye&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:()=>ge(!1),title:"Cancel Invoice",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(f,{variant:"secondary",onClick:()=>ge(!1),children:" Keep Invoice "}),(0,v.jsx)(f,{variant:"primary",onClick:async()=>{if(Ye)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${Ye.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(t.ok)await Rt(),ge(!1),He(null),window.dispatchEvent(new Event("refreshBadgeCounts"));else{const e=await t.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#EF4444",borderColor:"#EF4444"},children:" Cancel Invoice "})]}),children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,v.jsx)("strong",{children:Ye.invoiceNumber}),"?"]}),(0,v.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,v.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,v.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,v.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,v.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:Ye.invoiceNumber})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:Ye.managerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,v.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,l.vv)(Ye.total,Ye.currency||"MYR")})]})]})]})}),ye&&Ye&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:()=>ve(!1),title:"Delete Invoice",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(f,{variant:"secondary",onClick:()=>ve(!1),children:" Keep Invoice "}),(0,v.jsx)(f,{variant:"primary",onClick:async()=>{if(Ye)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${Ye.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(t.ok)await Rt(),ve(!1),He(null),window.dispatchEvent(new Event("refreshBadgeCounts"));else{const e=await t.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#EF4444",borderColor:"#EF4444"},children:" Delete Invoice "})]}),children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,v.jsxs)("strong",{children:["#",Ye.invoiceNumber]}),"?",(0,v.jsx)("br",{}),"This action cannot be undone."]})]})}),fe&&we&&(0,v.jsxs)(x.aF,{isOpen:!0,onClose:()=>je(!1),title:"Send Invoice via Email",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(f,{variant:"secondary",onClick:()=>{je(!1),Ce(null),Fe("")},children:" Cancel "}),(0,v.jsx)(f,{variant:"primary",onClick:async()=>{if(!we||!be)return Ae("Please enter a valid email address."),void Be(!0);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${we.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:be})});if(t.ok)Ae(`Invoice sent successfully to ${be}`),je(!1),Ce(null),Fe("");else{const e=await t.json();Ae(e.error||"Failed to send invoice email.")}Be(!0)}catch(e){console.error("Error sending invoice email:",e),Ae("Failed to send invoice email. Please try again."),Be(!0)}},disabled:!be||!be.includes("@"),children:" Send Email "})]}),children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Invoice"}),(0,v.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,v.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:we.invoiceNumber}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:we.customerName}),(0,v.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,l.vv)(we.total,we.currency||"MYR")})]})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Recipient Email *"}),(0,v.jsx)(U,{type:"email",value:be,onChange:e=>Fe(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,v.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:be?(0,v.jsxs)(v.Fragment,{children:["Default email for ","restaurant"===we.payerType?"Restaurant":"foodcourt_manager"===we.payerType?"Foodcourt Manager":"brand_manager"===we.payerType?"Brand Manager":"Customer"]}):(0,v.jsxs)(v.Fragment,{children:["Enter the ","restaurant"===we.payerType?"restaurant":"foodcourt_manager"===we.payerType?"foodcourt manager":"brand_manager"===we.payerType?"brand manager":"customer"," email address"]})})]}),(0,v.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,v.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),ke&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:()=>Be(!1),title:"Success",footer:(0,v.jsx)(v.Fragment,{children:(0,v.jsx)(f,{variant:"primary",onClick:()=>Be(!1),children:" OK "})}),children:(0,v.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,v.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:Se})})})]})]})})}},7617:(e,t,n)=>{n.d(t,{A:()=>u});n(9950);var i=n(7119),a=n(4752),r=n(9610),o=n(4414);const s=a.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,l=a.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=a.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=a.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=a.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=a.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,u=e=>{let{isOpen:t,title:n,message:a,onConfirm:u,onCancel:h,confirmText:m="Confirm",cancelText:g="Cancel",type:y="warning"}=e;return t?i.createPortal((0,o.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(l,{children:[(0,o.jsx)(d,{children:n}),(0,o.jsx)(c,{children:a})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{variant:"secondary",onClick:h,children:g}),(0,o.jsx)(x,{variant:"primary",type:y,onClick:u,children:m})]})]})}),document.body):null}}}]);