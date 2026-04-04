"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7283],{512:(e,n,t)=>{t.d(n,{x:()=>E,A:()=>$});var i=t(9950),a=t(4752),r=t(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[n,t,i]=e.split("-").map(Number);return new Date(n,t-1,i)},d=(e,n)=>e.getFullYear()===n.getFullYear()&&e.getMonth()===n.getMonth()&&e.getDate()===n.getDate(),c=(e,n)=>new Date(e,n).toLocaleDateString("en-US",{month:"long",year:"numeric"}),p=a.Ay.div`
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
`,j=a.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,f=a.Ay.div`
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
`,S=e=>{let{startDate:n,endDate:t,onRangeSelect:a,onClose:S,isOpen:A}=e;const E=new Date,[D,N]=(0,i.useState)(E.getMonth()),[T,z]=(0,i.useState)(E.getFullYear()),[I,$]=(0,i.useState)(null),[_,M]=(0,i.useState)(null),[R,P]=(0,i.useState)(null),[L,W]=(0,i.useState)("start"),O=(0,i.useRef)(null);(0,i.useEffect)(()=>{n&&$(l(n)),t&&M(l(t))},[n,t]),(0,i.useEffect)(()=>{A&&W("start")},[A]),(0,i.useEffect)(()=>{const e=e=>{O.current&&!O.current.contains(e.target)&&S()};return A&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[A,S]);const Y=(0,i.useCallback)(()=>{0===D?(N(11),z(e=>e-1)):N(e=>e-1)},[D]),H=(0,i.useCallback)(()=>{11===D?(N(0),z(e=>e+1)):N(e=>e+1)},[D]),U=(e,n)=>{const t=((e,n)=>new Date(e,n+1,0).getDate())(e,n),i=((e,n)=>new Date(e,n,1).getDay())(e,n),l=[];for(let a=0;a<i;a++)l.push(null);for(let a=1;a<=t;a++)l.push(new Date(e,n,a));return(0,r.jsxs)(f,{children:[(0,r.jsx)(b,{children:c(e,n)}),(0,r.jsx)(F,{children:o.map(e=>(0,r.jsx)(w,{children:e},e))}),(0,r.jsx)(C,{children:l.map((e,n)=>{if(!e)return(0,r.jsx)(k,{},`e-${n}`);const{isStart:t,isEnd:i,isInRange:o,isHoverEnd:l}=(e=>{const n=I&&d(e,I),t=_&&d(e,_),i="end"===L&&R?R:_;let a=!1;if(I&&i){const[n,t]=I<=i?[I,i]:[i,I];a=((e,n,t)=>{const i=e.getTime();return i>n.getTime()&&i<t.getTime()})(e,n,t)}return{isStart:n,isEnd:t,isInRange:a,isHoverEnd:"end"===L&&R&&d(e,R)}})(e),c=d(e,E);return(0,r.jsx)(B,{$isStart:!!t,$isEnd:!!i,$isInRange:o,$isHoverEnd:!!l,$isToday:c,onClick:()=>(e=>{if("start"===L)$(e),M(null),W("end");else{let n=I,t=e;t<n&&([n,t]=[t,n]),$(n),M(t),W("start"),a(s(n),s(t)),setTimeout(S,200)}})(e),onMouseEnter:()=>P(e),onMouseLeave:()=>P(null),children:e.getDate()},e.getTime())})})]})},V=11===D?0:D+1,G=11===D?T+1:T,q=e=>{const n=new Date;let t;const i=n;switch(e){case"this_week":t=new Date(n),t.setDate(n.getDate()-n.getDay());break;case"this_month":t=new Date(n.getFullYear(),n.getMonth(),1);break;case"this_year":t=new Date(n.getFullYear(),0,1);break;default:return}$(t),M(i),W("start"),a(s(t),s(i)),setTimeout(S,150)};return A?(0,r.jsx)(p,{ref:O,children:(0,r.jsxs)(x,{children:[(0,r.jsxs)(u,{children:[(0,r.jsx)(h,{onClick:()=>q("this_week"),children:"This Week"}),(0,r.jsx)(h,{onClick:()=>q("this_month"),children:"This Month"}),(0,r.jsx)(h,{onClick:()=>q("this_year"),children:"This Year"})]}),(0,r.jsxs)(m,{children:[(0,r.jsxs)(g,{children:[(0,r.jsx)(y,{onClick:Y,"aria-label":"Previous month",children:(0,r.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,r.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,r.jsx)(y,{onClick:H,"aria-label":"Next month",children:(0,r.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,r.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,r.jsxs)(v,{children:[U(T,D),(0,r.jsx)(j,{children:U(G,V)})]})]})]})}):null},A=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,E=(e,n)=>{const t=(e=>{if(!e)return new Date;try{const n=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[t,i,a]=n.split("-").map(Number);return new Date(t,i-1,a)}catch{return new Date}})(n);let i=new Date(t);const a=new Date(t);switch(e){case"today":break;case"yesterday":i.setDate(t.getDate()-1),a.setDate(t.getDate()-1);break;case"week":i.setDate(t.getDate()-6);break;case"month":i.setDate(t.getDate()-29);break;case"year":i.setDate(t.getDate()-364);break;case"all":i=new Date(2020,0,1)}return{start:A(i),end:A(a)}},D=a.Ay.div`
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
`,z=a.Ay.div`
  position: relative;
  display: inline-block;
`,I=a.Ay.button`
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
`,$=e=>{let{activePeriod:n,dateRange:t,isCustomDateRange:a,onPeriodChange:o,onCalendarRangeSelect:s,includeToday:l=!1,children:d}=e;const[c,p]=(0,i.useState)(!1),x=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],u={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,r.jsx)(D,{children:(0,r.jsxs)(N,{children:[x.map(e=>(0,r.jsx)(T,{active:n===e&&!a,onClick:()=>o(e),children:u[e]},e)),(0,r.jsxs)(z,{children:[(0,r.jsxs)(I,{active:a,onClick:()=>p(!c),children:[(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,r.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,r.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,r.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),t.start&&t.end?`${t.start} ~ ${t.end}`:"Custom Range"]}),(0,r.jsx)(S,{isOpen:c,startDate:t.start,endDate:t.end,onRangeSelect:(e,n)=>{s(e,n),p(!1)},onClose:()=>p(!1)})]}),d]})})}},2488:(e,n,t)=>{t.d(n,{DO:()=>p,Jt:()=>x,Qn:()=>c});t(9950);var i=t(4752),a=t(4414);const r=i.Ay.div`
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
`,c=e=>{let{children:n,className:t,style:i,...o}=e;return(0,a.jsx)(r,{className:t,style:i,...o,children:n})},p=e=>{let{placeholder:n="Search...",value:t,onChange:i,style:r,...d}=e;return(0,a.jsxs)(s,{style:r,children:[(0,a.jsx)(o,{placeholder:n,value:t,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:t?"36px":"16px"},...d}),t&&(0,a.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,a.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:n,...t}=e;return(0,a.jsx)(d,{...t,children:n})}},2597:(e,n,t)=>{t.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});t(9950);var i=t(4752),a=t(4414);const r=i.Ay.div`
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
`,l=e=>{let{children:n,className:t,style:i}=e;return(0,a.jsx)(r,{className:t,style:i,children:n})},d=e=>{let{active:n,onClick:t,children:i,className:r}=e;return(0,a.jsx)(o,{active:n,onClick:t,className:r,children:i})},c=e=>{let{count:n,variant:t="default",showZero:i=!1}=e;return 0!==n||i?(0,a.jsx)(s,{variant:t,children:n}):null}},7283:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Q});var i=t(9950),a=t(4752),r=t(512),o=t(2853),s=t(4492),l=t(6038),d=t(9018),c=t(4728),p=t(7617),x=t(8409),u=t(2488),h=t(2597),m=t(5612),g=t(1052),y=t.n(g),v=t(4414);const j=(0,a.Ay)(c.SC)``,f=a.Ay.div``,b=a.Ay.div`
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
`,z=a.Ay.div`
  flex: 1;
`,I=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`,$=a.Ay.div`
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
`,Q=()=>{const{operationSettings:e}=(0,d.Pj)(),[n,t]=(0,s.ok)(),[a,c]=(0,i.useState)([]),[g,Q]=(0,i.useState)(""),[K,Z]=(0,i.useState)("month"),[X,ee]=(0,i.useState)(!1),[ne,te]=(0,i.useState)(()=>(0,r.x)("month")),[ie,ae]=(0,i.useState)(!1),[re,oe]=(0,i.useState)(!1),[se,le]=(0,i.useState)(!1),[de,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(!1),[ue,he]=(0,i.useState)(!1),[me,ge]=(0,i.useState)(!1),[ye,ve]=(0,i.useState)(!1),[je,fe]=(0,i.useState)(!1),[be,Fe]=(0,i.useState)(""),[we,Ce]=(0,i.useState)(null),[ke,Be]=(0,i.useState)(!1),[Se,Ae]=(0,i.useState)(""),Ee=n.get("tab")||"invoices",De=e=>{t({tab:e})},[Ne,Te]=(0,i.useState)(!1),[ze,Ie]=(0,i.useState)(null),[$e,_e]=(0,i.useState)({name:"",code:"",description:""}),[Me,Re]=(0,i.useState)(!1),[Pe,Le]=(0,i.useState)(!1),[We,Oe]=(0,i.useState)(null),[Ye,He]=(0,i.useState)(null),[Ue,Ve]=(0,i.useState)(null),[Ge,qe]=(0,i.useState)(""),[Je,Qe]=(0,i.useState)(null),[Ke,Ze]=(0,i.useState)(""),[Xe,en]=(0,i.useState)({managers:[],restaurants:[]}),[nn,tn]=(0,i.useState)(!1),[an,rn]=(0,i.useState)(null),[on,sn]=(0,i.useState)([]),[ln,dn]=(0,i.useState)([]),[cn,pn]=(0,i.useState)({managers:[],restaurants:[]}),[xn,un]=(0,i.useState)(""),[hn,mn]=(0,i.useState)(!1),[gn,yn]=(0,i.useState)(null),[vn,jn]=(0,i.useState)("member"),[fn,bn]=(0,i.useState)({name:"",email:"",phone:"",company:"",address:"",tax_id:""}),[Fn,wn]=(0,i.useState)(!1),[Cn,kn]=(0,i.useState)(""),[Bn,Sn]=(0,i.useState)({managers:[],restaurants:[]}),[An,En]=(0,i.useState)(!1),[Dn,Nn]=(0,i.useState)(null),[,Tn]=(0,i.useState)({}),[,zn]=(0,i.useState)([]),[In,$n]=(0,i.useState)([]),[_n,Mn]=(0,i.useState)({}),[,Rn]=(0,i.useState)({enabled:!1,rate:0,name:"Tax"}),[Pn,Ln]=(0,i.useState)(null),[Wn,On]=(0,i.useState)(!1),[Yn,Hn]=(0,i.useState)(!1),[Un,Vn]=(0,i.useState)("issueDate"),[Gn,qn]=(0,i.useState)("desc"),[Jn,Qn]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),Kn=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void c([]);const n=await fetch("/api/invoices"+(Wn?"?includeDemo=true":""),{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),c(e)}else{const e=await n.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",n.status,e),c([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),c([])}},Zn=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(n.ok){const e=await n.json();e.success&&e.data&&$n(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),Xn=e=>{e?(Ie(e),_e({name:e.name,code:e.code,description:e.description||""})):(Ie(null),_e({name:"",code:"",description:""})),Te(!0)},et=()=>{Te(!1),Ie(null),_e({name:"",code:"",description:""})};(0,i.useEffect)(()=>{Kn(),at(),rt(),dt(),it(),Zn(),(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/admin/payment-settings",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();if(e.additionalCharges){Array.isArray(e.additionalCharges)?Mn({}):Mn(e.additionalCharges);const n=(Array.isArray(e.additionalCharges)?e.additionalCharges:Object.values(e.additionalCharges).flat()).find(e=>null===e||void 0===e?void 0:e.enabled);n&&Rn({enabled:n.enabled,rate:parseFloat(n.rate)||0,name:n.name||"Tax"})}}}catch(e){console.error("Error fetching payment settings:",e)}})()},[Wn]);const nt=e=>{const n=(0,l.Wh)(e);return _n[n]||_n[e]||[]},tt=nt(Jn.currency),it=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&Tn(n.currencies)}const n=await fetch("/api/currencies/supported");if(n.ok){const e=await n.json();if(e.success&&e.data){const n=e.data.map(e=>e.code);zn(n)}}}catch(e){console.error("Error fetching currency config:",e)}},at=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[n,t]=await Promise.all([fetch("/api/users?role=Brand General",{headers:e}),fetch("/api/users?role=Foodcourt General",{headers:e})]);let i=[];if(n.ok){const e=await n.json(),t=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand General"}));i=[...i,...t]}if(t.ok){const e=await t.json(),n=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt General"}));i=[...i,...n]}console.log("Fetched managers (General only):",i.length),sn(i)}catch(e){console.error("Error fetching managers:",e),sn([])}},rt=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();console.log("Fetched restaurants:",e);const t=e.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,admin_id:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||"",phone:e.phone||"",email:e.email||"",currency:e.currency||"MYR"}});dn(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),dn([])}catch(e){console.error("Error fetching restaurants:",e),dn([])}},ot=(e,n)=>{if(rn({type:e,data:n}),Ze("manager"===e?n.fullName:n.name),tn(!1),"manager"===e){const e=n;Ve({...Ue,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=on.find(n=>n.id===e.admin_id);Ve({...Ue,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},st=async e=>{try{const n=localStorage.getItem("auth_token"),t=await fetch(`/api/admin/payment-settings/available/${e}`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){const n=await t.json();if(!n.methods||0===n.methods.length)return void Ln(`No payment methods configured for ${(0,l.Qn)(e)}. Please set up payment methods in Payment Settings before sending this invoice.`)}}catch(n){console.error("Error checking payment methods:",n)}Ln(null)},lt=async(e,n)=>{yn({type:e,data:n}),mn(!1),un("manager"===e?n.fullName:n.name),Ln(null);const t=localStorage.getItem("auth_token");let i="USD";if("manager"===e){const e=n;try{const n=await fetch(`/api/users/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json(),o=e.success?e.data:e;if(o.brand_id){const e=await fetch(`/api/brands/${o.brand_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var a;const n=await e.json(),t=n.data||n,r=null===(a=t.payment_settings)||void 0===a?void 0:a.defaultCurrency,o=t.supported_currencies;r?i=r:o&&o.length>0&&(i=o[0]),console.log("Brand currency:",i,"defaultCurrency:",r,"supported:",o)}}else if(o.foodcourt_id){const e=await fetch(`/api/foodcourts/${o.foodcourt_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var r;const n=await e.json(),t=n.data||n,a=null===(r=t.payment_settings)||void 0===r?void 0:r.defaultCurrency,o=t.supported_currencies;a?i=a:o&&o.length>0&&(i=o[0]),console.log("Foodcourt currency:",i,"defaultCurrency:",a,"supported:",o)}}}}catch(o){console.error("Error fetching manager currency:",o)}Qn({...Jn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:"",currency:i}),await st(i)}else{const e=n,a=on.find(n=>n.id===e.admin_id);try{const n=await fetch(`/api/restaurants/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){i=(await n.json()).currency||"MYR"}}catch(o){console.error("Error fetching restaurant currency:",o)}Qn({...Jn,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:a?a.fullName:"",companyName:e.name,currency:i}),await st(i)}},dt=async()=>{try{const n=await fetch("/api/admin/settings");if(n.ok){const e=await n.json();Nn(e)}else{const n=localStorage.getItem("adminSettings");let t="";if(n)try{const e=JSON.parse(n);t=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),Nn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:t})}}catch(n){console.error("Error fetching company settings:",n);const t=localStorage.getItem("adminSettings");let i="";if(t)try{const e=JSON.parse(t);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),Nn({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},ct=e=>{if(!Dn)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${Dn.companyLogo?`<img src="${Dn.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${Dn.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${Dn.address?`${Dn.address}<br>`:""}\n                    ${[Dn.city,Dn.state,Dn.postalCode].filter(Boolean).join(", ")}${Dn.city||Dn.state||Dn.postalCode?"<br>":""}\n                    ${Dn.country?`${Dn.country}<br>`:""}\n                    ${Dn.phone?`Tel: ${Dn.phone}<br>`:""}\n                    ${Dn.email?`Email: ${Dn.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${Bt(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${Bt(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${Bt(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,l.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,l.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,l.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${e.discountType&&"none"!==e.discountType&&e.discountAmount>0?`\n                <div class="summary-row tax" style="color: #15803D;">\n                    <span>Discount${"percentage"===e.discountType?` (${e.discountValue}%)`:""}:</span>\n                    <span>-${(0,l.vv)(e.discountAmount,e.currency||"MYR")}</span>\n                </div>\n                `:""}\n                ${(e.additionalCharges||[]).map(n=>`\n                <div class="summary-row tax">\n                    <span>${n.name} (${n.rate}%):</span>\n                    <span>${(0,l.vv)(n.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,l.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${Dn.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${Dn.bankName}<br>\n                <strong>Account Name:</strong> ${Dn.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${Dn.bankAccount||"-"}\n                ${Dn.swiftCode?`<br><strong>SWIFT Code:</strong> ${Dn.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${Dn.taxNumber||Dn.registrationNumber?`\n        <div class="registration-info">\n            ${Dn.registrationNumber?`Reg No: ${Dn.registrationNumber}`:""}\n            ${Dn.registrationNumber&&Dn.taxNumber?" | ":""}\n            ${Dn.taxNumber?`Tax No: ${Dn.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},pt=async e=>{if(!Dn)return Ae("Company settings not loaded. Please try again."),void Be(!0);try{var n;const t=ct(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const a=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!a)throw document.body.removeChild(i),new Error("Could not access iframe document");a.open(),a.write(t),a.close(),await new Promise(async e=>{try{var n;null!==(n=a.fonts)&&void 0!==n&&n.ready&&await a.fonts.ready}catch{}const t=a.querySelectorAll("img");await Promise.all(Array.from(t).map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=n,e.onerror=n}))),setTimeout(e,100)});const r=await y()(a.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=r.toDataURL("image/png"),s=new m.default({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=r.height*l/r.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t),Ae("Failed to generate PDF. Please try again."),Be(!0)}},xt=e=>{if(!Dn)return Ae("Company settings not loaded. Please try again."),void Be(!0);const n=ct(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},ut=async e=>{Ce(e);let n="";if("restaurant"===e.payerType&&e.restaurantId){const t=ln.find(n=>n.id===e.restaurantId);null!==t&&void 0!==t&&t.email&&(n=t.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const t=on.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}if(!n&&e.managerId){const t=on.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}Fe(n),fe(!0)},ht=()=>{Qn({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),yn(null),un(""),mn(!1),jn("member"),bn({name:"",email:"",phone:"",company:"",address:"",tax_id:""})},mt=e=>{if("pending_payment"!==e.status)return!1;const n=new Date;return new Date(e.dueDate)<n},gt=e=>mt(e)?"overdue":e.status,yt=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},vt=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General";case"external":return"Non-Member"}},jt=a.filter(e=>{const n=g.toLowerCase(),t=yt(e.status).toLowerCase(),i="automatic"===e.type?"auto automatic":"manual",a=(e.planType||"").toLowerCase(),r=(e.categoryDisplayName||"").toLowerCase(),o=(e.customerName||e.restaurantName||"").toLowerCase(),s=vt(e.payerType||"restaurant").toLowerCase(),l=!g||(e.companyName||"").toLowerCase().includes(n)||(e.invoiceNumber||"").toLowerCase().includes(n)||(e.managerName||"").toLowerCase().includes(n)||t.includes(n)||i.includes(n)||a.includes(n)||r.includes(n)||o.includes(n)||s.includes(n)||(e.billingPeriod||"").toLowerCase().includes(n);let d=!0;if(ne.start&&ne.end){const n=new Date(e.issueDate),t=new Date(ne.start),i=new Date(ne.end);t.setHours(0,0,0,0),i.setHours(23,59,59,999),d=n>=t&&n<=i}return l&&d}).sort((e,n)=>{let t=0;switch(Un){case"invoiceNumber":t=e.invoiceNumber.localeCompare(n.invoiceNumber);break;case"companyName":t=(e.companyName||"").localeCompare(n.companyName||"");break;case"issueDate":default:t=new Date(e.issueDate).getTime()-new Date(n.issueDate).getTime();break;case"dueDate":t=new Date(e.dueDate).getTime()-new Date(n.dueDate).getTime();break;case"amount":t=e.total-n.total;break;case"status":t=(e.status||"").localeCompare(n.status||"")}return"desc"===Gn?-t:t}),ft=e=>{Un===e?qn("asc"===Gn?"desc":"asc"):(Vn(e),qn("dueDate"===e||"amount"===e?"desc":"asc"))},bt=e=>Un!==e?"":"asc"===Gn?" \u25b2":" \u25bc",Ft=a.length,wt=a.filter(e=>"paid"===e.status).length,Ct=a.filter(e=>mt(e)).length,kt=a.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),Bt=e=>new Date(e).toLocaleDateString("en-MY"),St=async(e,n)=>{if(Ye)try{const t=localStorage.getItem("auth_token"),i={};if("restaurant"===e)i.restaurant_id=n.id,i.payer_type="restaurant";else{i.payer_id=n.id;const e=n;"Brand General"===e.role||"Brand Manager"===e.role?i.payer_type="brand_manager":"Foodcourt General"===e.role||"Foodcourt Manager"===e.role?i.payer_type="foodcourt_manager":i.payer_type="restaurant"}const a=await fetch(`/api/invoices/${Ye.id}/link-account`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(i)});if(a.ok)await Kn(),wn(!1),oe(!1),Ae("Invoice linked to member account successfully."),Be(!0);else{const e=await a.json();alert(`Failed to link account: ${e.message||"Unknown error"}`)}}catch(t){console.error("Error linking account:",t),alert("Error linking account. Please try again.")}},At=e=>{He(e),oe(!0)},Et=n=>{var t,i;if(He(n),Ve({managerId:n.managerId,managerName:n.managerName,companyName:n.companyName||"",restaurantId:n.restaurantId||"",restaurantName:n.restaurantName||"",amount:(n.subtotalBeforeDiscount||n.amount).toString(),tax:n.tax.toString(),total:n.total.toString(),dueDate:n.dueDate?n.dueDate.split("T")[0]:"",status:n.status,planType:n.planType,billingCycle:"monthly",description:(null===(t=n.items)||void 0===t||null===(i=t[0])||void 0===i?void 0:i.description)||"",payerType:n.payerType||"restaurant",payerId:n.payerId||"",items:n.items,currency:n.currency||e.currency||"MYR",discountType:n.discountType||"none",discountValue:n.discountValue?n.discountValue.toString():"",discountReason:n.discountReason||"",invoiceCategory:n.invoiceCategory||"service",customDescription:n.customDescription||"",serviceDescription:n.serviceDescription||""}),n.restaurantId){const e=ln.find(e=>e.id===n.restaurantId);e&&(rn({type:"restaurant",data:e}),Ze(e.name))}else if(n.managerId){const e=on.find(e=>e.id===n.managerId);e&&(rn({type:"manager",data:e}),Ze(e.fullName))}qe(""),Qe(null),le(!0)},Dt=e=>{He(e),ce(!0)},Nt=e=>{He(e),ve(!0)};return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(x.mc,{children:[(0,v.jsxs)(x.Y9,{children:[(0,v.jsx)(x.hE,{children:"Invoices"}),(0,v.jsx)(x.ex,{children:(0,v.jsx)(j,{variant:"secondary",onClick:async()=>{Hn(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/generate-missing-bulk",{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}),t=await n.json();t.success&&(Ae(t.message),Be(!0),t.totalGenerated>0&&Kn())}catch(e){console.error("Error generating missing invoices:",e)}finally{Hn(!1)}},disabled:Yn,style:{opacity:Yn?.6:1},children:Yn?"Generating...":"Generate Missing Invoices"})})]}),(0,v.jsxs)(x.UC,{children:[(0,v.jsxs)(x.MD,{children:[(0,v.jsxs)(x.hI,{color:"#059669",children:[(0,v.jsx)(x.Os,{children:Ft}),(0,v.jsx)(x.v0,{children:"Total Invoices"}),(0,v.jsx)(x.d1,{children:"All invoice records"})]}),(0,v.jsxs)(x.hI,{color:"#2563EB",children:[(0,v.jsx)(x.Os,{children:wt}),(0,v.jsx)(x.v0,{children:"Paid Invoices"}),(0,v.jsxs)(x.d1,{children:[Ft>0?Math.round(wt/Ft*100):0,"% completed"]})]}),(0,v.jsxs)(x.hI,{color:"#DC2626",children:[(0,v.jsx)(x.Os,{children:Ct}),(0,v.jsx)(x.v0,{children:"Overdue Invoices"}),(0,v.jsx)(x.d1,{children:"Requires attention"})]}),(0,v.jsxs)(x.hI,{color:"#7C3AED",children:[(0,v.jsx)(x.Os,{children:(0,l.vv)(kt)}),(0,v.jsx)(x.v0,{children:"Total Revenue"}),(0,v.jsx)(x.d1,{children:"From paid invoices"})]})]}),(0,v.jsxs)(h.tU,{children:[(0,v.jsx)(h.oz,{active:"invoices"===Ee,onClick:()=>De("invoices"),children:"Invoices"}),(0,v.jsxs)(h.oz,{active:"payment_submitted"===Ee,onClick:()=>De("payment_submitted"),children:["Payment Submitted",(0,v.jsx)(h.Ex,{count:a.filter(e=>"payment_submitted"===e.status).length,variant:"danger"})]}),(0,v.jsx)(h.oz,{active:"categories"===Ee,onClick:()=>De("categories"),children:"Invoice Categories"})]}),"invoices"===Ee&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(r.A,{activePeriod:K,dateRange:ne,isCustomDateRange:X,onPeriodChange:e=>{Z(e),ee(!1),te((0,r.x)(e))},onCalendarRangeSelect:(e,n)=>{ee(!0),Z("all"),te({start:e,end:n})},children:[(0,v.jsx)(u.DO,{placeholder:"Search invoices...",value:g,onChange:e=>Q(e.target.value)}),(0,v.jsxs)(k,{children:[(0,v.jsx)("input",{type:"checkbox",checked:Wn,onChange:e=>On(e.target.checked)}),"Include Demo"]}),(0,v.jsx)(W,{children:(0,v.jsx)(j,{variant:"primary",onClick:()=>{ht(),ae(!0)},children:"Create Invoice"})})]}),(0,v.jsxs)(x.an,{children:[(0,v.jsxs)(x.bQ,{children:[(0,v.jsx)(x.B_,{children:(0,v.jsxs)("tr",{children:[(0,v.jsxs)(x.gU,{align:"left",style:{cursor:"pointer"},onClick:()=>ft("invoiceNumber"),children:["Invoice",bt("invoiceNumber")]}),(0,v.jsxs)(x.gU,{align:"left",style:{cursor:"pointer"},onClick:()=>ft("companyName"),children:["Customer",bt("companyName")]}),(0,v.jsx)(x.gU,{align:"center",children:"Period"}),(0,v.jsx)(x.gU,{align:"center",children:"Issued"}),(0,v.jsxs)(x.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>ft("dueDate"),children:["Due",bt("dueDate")]}),(0,v.jsxs)(x.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>ft("status"),children:["Status",bt("status")]}),(0,v.jsxs)(x.gU,{align:"right",style:{cursor:"pointer"},onClick:()=>ft("amount"),children:["Amount",bt("amount")]}),(0,v.jsx)(x.gU,{align:"right",children:"Total"}),(0,v.jsx)(x.gU,{isActions:!0,children:"Actions"})]})}),(0,v.jsx)("tbody",{children:jt.map(e=>(0,v.jsxs)(x.J2,{children:[(0,v.jsx)(x.Bv,{"data-label":"Invoice",align:"left",children:(0,v.jsxs)(f,{children:[(0,v.jsxs)(b,{children:[e.invoiceNumber,"automatic"===e.type&&(0,v.jsx)(w,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,v.jsx)(F,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,v.jsx)(x.Bv,{"data-label":"Customer",align:"left",children:(0,v.jsxs)(f,{children:[(0,v.jsxs)(b,{children:[e.externalPayerName||e.customerName||e.restaurantName||"Unknown",e.isDemo&&(0,v.jsx)(C,{children:"DEMO"}),"external"===e.payerType&&(0,v.jsx)("span",{style:{marginLeft:"6px",padding:"2px 6px",fontSize:"10px",fontWeight:600,color:"#7C3AED",background:"#EDE9FE",borderRadius:"4px",verticalAlign:"middle"},children:"Non-Member"})]}),(0,v.jsx)(F,{children:vt(e.payerType||"restaurant")})]})}),(0,v.jsx)(x.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,v.jsx)(x.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:Bt(e.issueDate)}),(0,v.jsx)(x.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:Bt(e.dueDate)}),(0,v.jsxs)(x.Bv,{"data-label":"Status",align:"center",children:[(0,v.jsx)(B,{status:gt(e),children:yt(gt(e))}),e.isModified&&(0,v.jsx)("span",{style:{display:"inline-block",marginLeft:"4px",padding:"2px 6px",fontSize:"10px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px",verticalAlign:"middle"},children:"Modified"})]}),(0,v.jsx)(x.Bv,{"data-label":"Amount",align:"right",children:(0,v.jsx)(x.DM,{children:(0,l.vv)(e.amount,e.currency||"MYR")})}),(0,v.jsx)(x.Bv,{"data-label":"Total",align:"right",children:(0,v.jsx)(x.DM,{highlight:!0,children:0===Number(e.total)?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"MYR")})}),(0,v.jsx)(x.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,v.jsxs)(x.wr,{children:[(0,v.jsx)(S,{variant:"primary",onClick:()=>At(e),children:"View"}),"draft"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(S,{onClick:()=>Et(e),children:"Edit"}),(0,v.jsx)(S,{variant:"success",onClick:()=>(e=>{He(e),xe(!0)})(e),title:"Send Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,v.jsx)("polygon",{points:"22,2 15,22 11,13 2,9 22,2"})]})}),(0,v.jsx)(A,{onClick:()=>Nt(e),title:"Delete Invoice",children:(0,v.jsx)(E,{children:"\xd7"})})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(S,{onClick:()=>Et(e),children:"Edit"}),0===Number(e.total)&&(0,v.jsx)(S,{variant:"primary",onClick:()=>Dt(e),children:"Mark Paid"}),(0,v.jsx)(S,{onClick:()=>pt(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(S,{onClick:()=>xt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(S,{variant:"email",onClick:()=>ut(e),title:"Send Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,v.jsx)(A,{onClick:()=>Nt(e),title:"Delete Invoice",children:(0,v.jsx)(E,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,v.jsxs)(v.Fragment,{children:[e.hasPaymentInfo&&(0,v.jsx)(S,{variant:"primary",onClick:()=>Dt(e),children:"Confirm"}),(0,v.jsx)(S,{onClick:()=>pt(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(S,{onClick:()=>xt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(S,{variant:"email",onClick:()=>ut(e),title:"Resend Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(S,{onClick:()=>Et(e),children:"Edit"}),0===Number(e.total)&&(0,v.jsx)(S,{variant:"primary",onClick:()=>Dt(e),children:"Mark Paid"}),(0,v.jsx)(S,{onClick:()=>pt(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(S,{onClick:()=>xt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,v.jsx)(S,{variant:"email",onClick:()=>ut(e),title:"Resend Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,v.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,v.jsx)(A,{onClick:()=>Nt(e),title:"Delete Invoice",children:(0,v.jsx)(E,{children:"\xd7"})})]}),"paid"===e.status&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(S,{onClick:()=>pt(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(S,{onClick:()=>xt(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,v.jsx)(S,{onClick:()=>pt(e),title:"Download Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})})]},e.id))})]}),0===jt.length&&(0,v.jsxs)(x.ys,{children:[(0,v.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,v.jsx)("div",{style:{fontSize:"14px"},children:0===a.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"payment_submitted"===Ee&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"Payment Confirmation Required"}),(0,v.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:0},children:"These invoices have payment submitted and are waiting for your confirmation."})]}),(0,v.jsxs)(x.an,{children:[(0,v.jsxs)(x.bQ,{children:[(0,v.jsx)(x.B_,{children:(0,v.jsxs)("tr",{children:[(0,v.jsx)(x.gU,{align:"left",children:"Invoice"}),(0,v.jsx)(x.gU,{align:"left",children:"Customer"}),(0,v.jsx)(x.gU,{align:"center",children:"Payment Method"}),(0,v.jsx)(x.gU,{align:"center",children:"Submitted Date"}),(0,v.jsx)(x.gU,{align:"right",children:"Amount"}),(0,v.jsx)(x.gU,{isActions:!0,children:"Actions"})]})}),(0,v.jsx)("tbody",{children:a.filter(e=>"payment_submitted"===e.status).map(e=>(0,v.jsxs)(x.J2,{children:[(0,v.jsx)(x.Bv,{"data-label":"Invoice",align:"left",children:(0,v.jsxs)(f,{children:[(0,v.jsx)(b,{children:e.invoiceNumber}),(0,v.jsx)(F,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,v.jsx)(x.Bv,{"data-label":"Customer",align:"left",children:(0,v.jsxs)(f,{children:[(0,v.jsxs)(b,{children:[e.externalPayerName||e.customerName||e.restaurantName||"Unknown","external"===e.payerType&&(0,v.jsx)("span",{style:{marginLeft:"6px",padding:"2px 6px",fontSize:"10px",fontWeight:600,color:"#7C3AED",background:"#EDE9FE",borderRadius:"4px",verticalAlign:"middle"},children:"Non-Member"})]}),(0,v.jsx)(F,{children:e.companyName})]})}),(0,v.jsx)(x.Bv,{"data-label":"Payment Method",align:"center",children:e.paymentMethod||"-"}),(0,v.jsx)(x.Bv,{"data-label":"Submitted",align:"center",children:e.paidDate?Bt(e.paidDate):"-"}),(0,v.jsx)(x.Bv,{"data-label":"Amount",align:"right",children:(0,v.jsx)(x.DM,{highlight:!0,children:0===Number(e.total)?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,l.vv)(e.total,e.currency||"MYR")})}),(0,v.jsx)(x.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,v.jsxs)(x.wr,{children:[(0,v.jsx)(S,{onClick:()=>At(e),children:"View"}),(0,v.jsx)(S,{variant:"primary",onClick:()=>{He(e),ce(!0)},children:"Confirm Payment"})]})})]},e.id))})]}),0===a.filter(e=>"payment_submitted"===e.status).length&&(0,v.jsxs)(x.ys,{children:[(0,v.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",marginBottom:"8px"},children:"No Pending Confirmations"}),(0,v.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"There are no invoices waiting for payment confirmation."})]})]})]}),"categories"===Ee&&(0,v.jsxs)("div",{style:{padding:"24px 0"},children:[(0,v.jsxs)(P,{children:[(0,v.jsxs)("div",{children:[(0,v.jsx)(L,{children:"Invoice Categories"}),(0,v.jsx)("p",{style:{color:"#6B7280",fontSize:"14px",margin:"8px 0 0 0"},children:"Manage invoice categories for organizing different types of charges."})]}),(0,v.jsx)(j,{variant:"primary",onClick:()=>Xn(),children:"Add Category"})]}),0===In.length?(0,v.jsxs)(o.pp,{children:[(0,v.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"No categories yet"}),(0,v.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:"0 0 16px 0"},children:"Create your first invoice category to get started."}),(0,v.jsx)(j,{variant:"primary",onClick:()=>Xn(),children:"Add Category"})]}):(0,v.jsx)(D,{children:In.map(e=>(0,v.jsxs)(N,{isActive:e.is_active,children:[(0,v.jsx)(T,{children:e.name.charAt(0).toUpperCase()}),(0,v.jsxs)(z,{children:[(0,v.jsxs)(I,{children:[e.name,(0,v.jsx)(M,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,v.jsxs)($,{children:[(0,v.jsxs)("span",{children:["Code: ",(0,v.jsx)("strong",{children:e.code})]}),e.description&&(0,v.jsx)("span",{children:e.description})]})]}),(0,v.jsxs)(_,{children:[(0,v.jsx)(R,{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/categories/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({is_active:!e.is_active})});(await t.json()).success&&Zn()}catch(n){console.error("Failed to toggle category:",n)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.is_active?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,v.jsx)("circle",{cx:"12",cy:"12",r:"3"})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),(0,v.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})})}),(0,v.jsx)(R,{onClick:()=>Xn(e),title:"Edit Category",children:(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,v.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,v.jsx)(R,{onClick:()=>(e=>{Oe(e),Le(!0)})(e),title:"Delete Category",children:(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"3,6 5,6 21,6"}),(0,v.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]})})]})]},e.id))})]}),Ne&&(0,v.jsxs)(x.aF,{isOpen:!0,onClose:et,title:ze?"Edit Category":"Add Category",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(j,{variant:"secondary",type:"button",onClick:et,children:"Cancel"}),(0,v.jsxs)(j,{variant:"primary",type:"submit",disabled:Me||!$e.name||!$e.code,children:[" ",Me?"Saving...":ze?"Update":"Create"," "]})]}),children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Name *"}),(0,v.jsx)(U,{value:$e.name,onChange:e=>_e({...$e,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Code *"}),(0,v.jsx)(U,{value:$e.code,onChange:e=>_e({...$e,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===ze||void 0===ze?void 0:ze.is_system}),(0,v.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Description"}),(0,v.jsx)(V,{value:$e.description,onChange:e=>_e({...$e,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,v.jsx)(p.A,{isOpen:Pe,onCancel:()=>Le(!1),onConfirm:async()=>{if(We)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${We.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(Le(!1),Oe(null),Zn()):alert(t.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===We||void 0===We?void 0:We.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),ie&&(0,v.jsxs)(x.aF,{isOpen:!0,onClose:()=>{ae(!1),ht()},title:"Create Invoice",footer:(0,v.jsxs)(v.Fragment,{children:[Pn&&(0,v.jsxs)("div",{style:{padding:"10px 16px",background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",fontSize:"13px",color:"#92400E",marginBottom:"12px"},children:[" ",Pn," "]})," ",(0,v.jsx)(j,{variant:"secondary",onClick:()=>{ae(!1),ht()},children:" Cancel "}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if("member"!==vn||gn&&Jn.amount&&Jn.dueDate)if("external"!==vn||fn.name&&fn.email&&Jn.amount&&Jn.dueDate)try{const e=parseFloat(Jn.amount),n=parseFloat(Jn.discountValue)||0,t="percentage"===Jn.discountType?e*(n/100):"fixed"===Jn.discountType?n:0,i=Math.max(0,e-t),a=tt.filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(i*e.rate/100*100)/100})),r=a.reduce((e,n)=>e+n.amount,0),o=i+r;let s="";s="others"===Jn.invoiceCategory?Jn.customDescription||"":Jn.serviceDescription||"";let l="",d="",c="";if("external"===vn){l=fn.name,c=fn.company||fn.name;const e=[];fn.address&&e.push(fn.address),fn.phone&&e.push(`Phone: ${fn.phone}`),fn.email&&e.push(`Email: ${fn.email}`),d=e.join("\n")}else if("restaurant"===(null===gn||void 0===gn?void 0:gn.type)){const e=gn.data;l=e.name,c=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),d=n.join("\n")}else if("manager"===(null===gn||void 0===gn?void 0:gn.type)){const e=gn.data;l=e.fullName,c=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),d=n.join("\n")}let p="restaurant";if("external"===vn)p="external";else if("manager"===(null===gn||void 0===gn?void 0:gn.type)){const e=gn.data;"Brand General"===e.role||"Brand Manager"===e.role?p="brand_manager":"Foodcourt General"!==e.role&&"Foodcourt Manager"!==e.role||(p="foodcourt_manager")}const x={restaurant_id:"external"===vn?null:"restaurant"===(null===gn||void 0===gn?void 0:gn.type)?gn.data.id:null,payer_type:p,payer_id:"external"===vn?null:"manager"===(null===gn||void 0===gn?void 0:gn.type)?gn.data.id:null,type:"manual",billing_period_start:null,billing_period_end:null,due_date:new Date(Jn.dueDate).toISOString(),total_amount:o,subtotal_before_discount:t>0?e:null,discount_type:"none"!==Jn.discountType?Jn.discountType:null,discount_value:t>0?n:null,discount_amount:t>0?t:null,discount_reason:Jn.discountReason||null,currency:Jn.currency||"MYR",status:"draft",notes:`${c}\n${l}\n${d}\n\n${s}`,issued_by:1,issued_at:(new Date).toISOString(),issuer_type:"system_admin",invoice_category:Jn.invoiceCategory||"service",additional_charges:a};"external"===vn&&(x.external_payer_name=fn.name,x.external_payer_email=fn.email,x.external_payer_phone=fn.phone||null,x.external_payer_company=fn.company||null,x.external_payer_address=fn.address||null,x.external_payer_tax_id=fn.tax_id||null);const u=[{item_type:Jn.invoiceCategory,description:s,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:0,tax_amount:0,total_amount:e}],h=localStorage.getItem("auth_token"),m=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({invoice_data:x,items:u})});if(m.ok)await Kn(),ae(!1),ht();else{const e=await m.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please fill in name, email, amount, and due date.");else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:"member"===vn?!gn||!Jn.amount||!Jn.dueDate:!fn.name||!fn.email||!Jn.amount||!Jn.dueDate,children:" Create Invoice "})]}),children:[(0,v.jsxs)(Y,{children:[(0,v.jsxs)("div",{style:{display:"flex",gap:"12px",marginBottom:"16px"},children:[(0,v.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 16px",border:"1px solid "+("member"===vn?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:"member"===vn?"#F0F0FF":"white",flex:1},children:[(0,v.jsx)("input",{type:"radio",name:"payerMode",value:"member",checked:"member"===vn,onChange:()=>{jn("member"),bn({name:"",email:"",phone:"",company:"",address:"",tax_id:""})}}),"Existing Member"]}),(0,v.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 16px",border:"1px solid "+("external"===vn?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:"external"===vn?"#F0F0FF":"white",flex:1},children:[(0,v.jsx)("input",{type:"radio",name:"payerMode",value:"external",checked:"external"===vn,onChange:()=>{jn("external"),yn(null),un("")}}),"Non-Member"]})]}),"member"===vn?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(H,{children:"Search Manager or Restaurant *"}),(0,v.jsxs)("div",{style:{position:"relative"},children:[(0,v.jsx)(U,{type:"text",value:xn,onChange:e=>(e=>{if(un(e),mn(!0),e.length<2)return void pn({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",on),console.log("Available restaurants:",ln);const n=on.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=ln.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",n),console.log("Filtered restaurants:",t),pn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>mn(!0),onBlur:()=>setTimeout(()=>mn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),hn&&(cn.managers.length>0||cn.restaurants.length>0)&&(0,v.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[cn.managers.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),cn.managers.map(e=>(0,v.jsxs)("div",{onClick:()=>lt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),cn.restaurants.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),cn.restaurants.map(e=>{const n=on.find(n=>n.id===e.admin_id);return(0,v.jsxs)("div",{onClick:()=>lt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),gn&&(0,v.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===gn.type?gn.data.fullName:gn.data.name}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===gn.type?`${gn.data.companyName} \u2022 Manager`:`${gn.data.address||"No address"} \u2022 Restaurant`})]}),(0,v.jsx)("button",{onClick:()=>{yn(null),un("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(H,{children:"Non-Member Details"}),(0,v.jsxs)(O,{children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Name *"}),(0,v.jsx)(U,{type:"text",value:fn.name,onChange:e=>bn({...fn,name:e.target.value}),placeholder:"Full name",required:!0})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Email *"}),(0,v.jsx)(U,{type:"email",value:fn.email,onChange:e=>bn({...fn,email:e.target.value}),placeholder:"Email address",required:!0})]})]}),(0,v.jsxs)(O,{children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Phone"}),(0,v.jsx)(U,{type:"text",value:fn.phone,onChange:e=>bn({...fn,phone:e.target.value}),placeholder:"Phone number"})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Company"}),(0,v.jsx)(U,{type:"text",value:fn.company,onChange:e=>bn({...fn,company:e.target.value}),placeholder:"Company name"})]})]}),(0,v.jsxs)(O,{children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Address"}),(0,v.jsx)(U,{type:"text",value:fn.address,onChange:e=>bn({...fn,address:e.target.value}),placeholder:"Address"})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Tax ID"}),(0,v.jsx)(U,{type:"text",value:fn.tax_id,onChange:e=>bn({...fn,tax_id:e.target.value}),placeholder:"Tax ID"})]})]})]})]}),(0,v.jsxs)(O,{children:[(0,v.jsxs)(Y,{children:[(0,v.jsxs)(H,{children:["Amount",Jn.currency?` (${(0,l.Qn)(Jn.currency)})`:""," *"]}),(0,v.jsx)(U,{type:"number",step:Jn.currency&&0===(0,l.e_)(Jn.currency)?"1":"0.01",min:"0",value:Jn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=parseFloat(Jn.discountValue)||0,i="percentage"===Jn.discountType?n*(t/100):"fixed"===Jn.discountType?t:0,a=Math.max(0,n-i),r=tt.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+a*n.rate/100,0),o=a+r;Qn({...Jn,amount:e.target.value,tax:r.toFixed(2),total:o.toFixed(2)})},onBlur:e=>{if(e.target.value&&Jn.currency){const n=(0,l.e_)(Jn.currency),t=parseFloat(e.target.value)||0,i=t.toFixed(n),a=parseFloat(Jn.discountValue)||0,r="percentage"===Jn.discountType?t*(a/100):"fixed"===Jn.discountType?a:0,o=Math.max(0,t-r),s=tt.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+o*n.rate/100,0),d=o+s;Qn({...Jn,amount:i,tax:s.toFixed(n),total:d.toFixed(n)})}},placeholder:Jn.currency&&0===(0,l.e_)(Jn.currency)?"0":"0.00",required:!0,disabled:"member"===vn&&!gn}),"member"===vn&&!gn&&(0,v.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px",display:"block"},children:"Select a manager or restaurant first"})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Due Date *"}),(0,v.jsx)(U,{type:"date",value:Jn.dueDate,onChange:e=>Qn({...Jn,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,v.jsxs)(O,{children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Discount"}),(0,v.jsxs)(G,{value:Jn.discountType,onChange:e=>{const n=e.target.value,t=parseFloat(Jn.amount)||0,i="none"===n?0:parseFloat(Jn.discountValue)||0,a="percentage"===n?t*(i/100):"fixed"===n?i:0,r=Math.max(0,t-a),o=tt.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+r*n.rate/100,0),s=r+o;Qn({...Jn,discountType:n,discountValue:"none"===n?"":Jn.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,v.jsx)("option",{value:"none",children:"No Discount"}),(0,v.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,v.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==Jn.discountType&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"percentage"===Jn.discountType?"Discount (%)":"Discount Amount"}),(0,v.jsx)(U,{type:"number",step:"0.01",min:"0",max:"percentage"===Jn.discountType?"100":void 0,value:Jn.discountValue,onChange:e=>{const n=parseFloat(Jn.amount)||0,t=parseFloat(e.target.value)||0,i="percentage"===Jn.discountType?n*(t/100):t,a=Math.max(0,n-i),r=tt.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+a*n.rate/100,0),o=a+r;Qn({...Jn,discountValue:e.target.value,tax:r.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==Jn.discountType&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Discount Reason"}),(0,v.jsx)(U,{type:"text",value:Jn.discountReason,onChange:e=>Qn({...Jn,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Invoice Category"}),(0,v.jsx)(G,{value:Jn.invoiceCategory||"service",onChange:e=>Qn({...Jn,invoiceCategory:e.target.value}),children:In.length>0?In.filter(e=>"subscription"!==e.code).map(e=>(0,v.jsx)("option",{value:e.code,children:e.name},e.id)):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("option",{value:"service",children:"Service"}),(0,v.jsx)("option",{value:"consulting",children:"Consulting"}),(0,v.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Jn.invoiceCategory||"service")&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Item/Description"}),(0,v.jsx)(V,{value:"others"===Jn.invoiceCategory?Jn.customDescription||"":Jn.serviceDescription||"",onChange:e=>{"others"===Jn.invoiceCategory?Qn({...Jn,customDescription:e.target.value}):Qn({...Jn,serviceDescription:e.target.value})},placeholder:`Enter ${Jn.invoiceCategory||"service"} description...`,rows:2})]}),(0,v.jsxs)(q,{children:[(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:Jn.currency?(0,l.vv)(parseFloat(Jn.amount||"0"),Jn.currency):"-"})]}),"none"!==Jn.discountType&&parseFloat(Jn.discountValue||"0")>0&&(()=>{const e=parseFloat(Jn.amount||"0"),n=parseFloat(Jn.discountValue||"0"),t="percentage"===Jn.discountType?e*(n/100):n;return(0,v.jsxs)(J,{children:[(0,v.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Jn.discountType?` (${n}%)`:"",":"]}),(0,v.jsxs)("span",{style:{color:"#15803D"},children:["-",Jn.currency?(0,l.vv)(t,Jn.currency):"-"]})]})})(),tt.filter(e=>e.enabled&&e.name&&e.rate>0).map((e,n)=>{const t=parseFloat(Jn.amount||"0"),i=parseFloat(Jn.discountValue||"0"),a="percentage"===Jn.discountType?t*(i/100):"fixed"===Jn.discountType?i:0,r=Math.max(0,t-a)*(e.rate/100);return(0,v.jsxs)(J,{children:[(0,v.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,v.jsx)("span",{children:Jn.currency?(0,l.vv)(r,Jn.currency):"-"})]},n)}),(0,v.jsxs)(J,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:Jn.currency?(0,l.vv)(parseFloat(Jn.total||"0"),Jn.currency):"-"})})]})]})]}),re&&Ye&&(0,v.jsxs)(x.aF,{isOpen:!0,onClose:()=>oe(!1),title:"Invoice Details",size:"large",footer:(0,v.jsx)(v.Fragment,{children:(0,v.jsx)(j,{variant:"secondary",onClick:()=>oe(!1),children:"Close"})}),children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===Dn||void 0===Dn?void 0:Dn.companyLogo)&&(0,v.jsx)("img",{src:Dn.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,v.jsx)("div",{style:{fontSize:null!==Dn&&void 0!==Dn&&Dn.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===Dn||void 0===Dn?void 0:Dn.companyName)||"Company Name"}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===Dn||void 0===Dn?void 0:Dn.address)&&(0,v.jsx)("div",{children:Dn.address}),((null===Dn||void 0===Dn?void 0:Dn.city)||(null===Dn||void 0===Dn?void 0:Dn.state)||(null===Dn||void 0===Dn?void 0:Dn.postalCode))&&(0,v.jsx)("div",{children:[null===Dn||void 0===Dn?void 0:Dn.city,null===Dn||void 0===Dn?void 0:Dn.state,null===Dn||void 0===Dn?void 0:Dn.postalCode].filter(Boolean).join(", ")}),(null===Dn||void 0===Dn?void 0:Dn.country)&&(0,v.jsx)("div",{children:Dn.country}),(null===Dn||void 0===Dn?void 0:Dn.phone)&&(0,v.jsxs)("div",{children:["Tel: ",Dn.phone]}),(null===Dn||void 0===Dn?void 0:Dn.email)&&(0,v.jsxs)("div",{children:["Email: ",Dn.email]})]})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,v.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:Ye.invoiceNumber}),(0,v.jsx)(B,{status:Ye.status,style:{marginTop:"8px"},children:yt(Ye.status)}),Ye.isModified&&(0,v.jsx)("span",{style:{display:"inline-block",marginTop:"4px",padding:"2px 8px",fontSize:"11px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px"},children:"Modified"})]})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,v.jsxs)("div",{style:{flex:1},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),"external"===Ye.payerType?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,v.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:Ye.externalPayerName||Ye.customerName}),(0,v.jsx)("span",{style:{padding:"2px 8px",fontSize:"11px",fontWeight:600,color:"#7C3AED",background:"#EDE9FE",borderRadius:"4px"},children:"Non-Member"})]}),Ye.externalPayerCompany&&(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Company: ",Ye.externalPayerCompany]}),Ye.externalPayerEmail&&(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Email: ",Ye.externalPayerEmail]}),Ye.externalPayerPhone&&(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Phone: ",Ye.externalPayerPhone]}),Ye.externalPayerAddress&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:Ye.externalPayerAddress}),Ye.externalPayerTaxId&&(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Tax ID: ",Ye.externalPayerTaxId]}),(0,v.jsx)("button",{onClick:()=>{wn(!0),kn(""),Sn({managers:[],restaurants:[]})},style:{marginTop:"10px",padding:"6px 14px",fontSize:"12px",fontWeight:600,color:"#635BFF",background:"#F0F0FF",border:"1px solid #635BFF",borderRadius:"6px",cursor:"pointer"},children:"Link to Member Account"})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:Ye.customerName}),Ye.customerAddress&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:Ye.customerAddress}),"restaurant"===Ye.payerType&&Ye.restaurantName&&"Unknown Restaurant"!==Ye.restaurantName&&(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",Ye.restaurantName]}),Ye.companyName&&Ye.companyName!==Ye.customerName&&(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Company: ",Ye.companyName]})]})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ye.billingPeriod||"-"})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Bt(Ye.issueDate)})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Bt(Ye.dueDate)})]}),Ye.paidDate&&(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Bt(Ye.paidDate)})]})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,v.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,v.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,v.jsx)("tbody",{children:Ye.items.map((e,n)=>(0,v.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,l.vv)(e.unitPrice,Ye.currency||"MYR")}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,l.vv)(e.total,Ye.currency||"MYR")})]},n))})]})]}),(0,v.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,v.jsx)("div",{style:{width:"280px"},children:(0,v.jsxs)(q,{children:[(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:(0,l.vv)(Ye.subtotalBeforeDiscount||Ye.amount,Ye.currency||"MYR")})]}),Ye.discountType&&"none"!==Ye.discountType&&Ye.discountAmount>0&&(0,v.jsxs)(J,{children:[(0,v.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Ye.discountType?` (${Ye.discountValue}%)`:"",":"]}),(0,v.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,l.vv)(Ye.discountAmount,Ye.currency||"MYR")]})]}),(Ye.additionalCharges||[]).map((e,n)=>(0,v.jsxs)(J,{children:[(0,v.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,v.jsx)("span",{children:(0,l.vv)(e.amount,Ye.currency||"MYR")})]},n)),0===(Ye.additionalCharges||[]).length&&Ye.tax>0&&(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Tax:"}),(0,v.jsx)("span",{children:(0,l.vv)(Ye.tax,Ye.currency||"MYR")})]}),(0,v.jsxs)(J,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:(0,l.vv)(Ye.total,Ye.currency||"MYR")})})]})]})})}),(null===Dn||void 0===Dn?void 0:Dn.bankName)&&(0,v.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Bank:"})," ",Dn.bankName]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Name:"})," ",Dn.bankAccountName]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Number:"})," ",Dn.bankAccount]})]})]}),((null===Dn||void 0===Dn?void 0:Dn.taxNumber)||(null===Dn||void 0===Dn?void 0:Dn.registrationNumber))&&(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===Dn||void 0===Dn?void 0:Dn.registrationNumber)&&(0,v.jsxs)("span",{children:["Reg No: ",Dn.registrationNumber]}),(null===Dn||void 0===Dn?void 0:Dn.registrationNumber)&&(null===Dn||void 0===Dn?void 0:Dn.taxNumber)&&(0,v.jsx)("span",{children:" | "}),(null===Dn||void 0===Dn?void 0:Dn.taxNumber)&&(0,v.jsxs)("span",{children:["Tax No: ",Dn.taxNumber]})]}),Ye.isModified&&Ye.modificationHistory&&Ye.modificationHistory.length>0&&(0,v.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,v.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#92400E",marginBottom:"12px"},children:"Modification History"}),Ye.modificationHistory.map((e,n)=>(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:n<Ye.modificationHistory.length-1?"10px":"0",paddingBottom:n<Ye.modificationHistory.length-1?"10px":"0",borderBottom:n<Ye.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,v.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,v.jsxs)("div",{style:{marginTop:"3px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,v.jsx)("div",{style:{marginTop:"3px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[n,t]=e;return(0,v.jsxs)("div",{children:[n,": ",String(t.from)," \u2192 ",String(t.to)]},n)})})]},n))]})]}),Fn&&Ye&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:()=>wn(!1),title:"Link to Member Account",footer:(0,v.jsx)(j,{variant:"secondary",onClick:()=>wn(!1),children:"Cancel"}),children:(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Search Member *"}),(0,v.jsxs)("div",{style:{position:"relative"},children:[(0,v.jsx)(U,{type:"text",value:Cn,onChange:e=>(e=>{if(kn(e),!e.trim())return void Sn({managers:[],restaurants:[]});const n=e.toLowerCase(),t=on.filter(e=>e.fullName.toLowerCase().includes(n)||e.companyName&&e.companyName.toLowerCase().includes(n)||e.email.toLowerCase().includes(n)).slice(0,5),i=ln.filter(e=>e.name.toLowerCase().includes(n)||e.address&&e.address.toLowerCase().includes(n)).slice(0,5);Sn({managers:t,restaurants:i})})(e.target.value),onFocus:()=>En(!0),onBlur:()=>setTimeout(()=>En(!1),200),placeholder:"Type to search for managers or restaurants"}),An&&(Bn.managers.length>0||Bn.restaurants.length>0)&&(0,v.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0,0,0,0.1)"},children:[Bn.managers.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),Bn.managers.map(e=>(0,v.jsxs)("div",{onClick:()=>St("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[e.companyName||e.email," - ",e.role]})]},e.id))]}),Bn.restaurants.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),Bn.restaurants.map(e=>(0,v.jsxs)("div",{onClick:()=>St("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.address||"No address"})]},e.id))]})]})]}),(0,v.jsx)("div",{style:{marginTop:"12px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",fontSize:"13px",color:"#92400E"},children:"This will convert the non-member invoice to a member invoice and link it to the selected account."})]})}),de&&Ye&&(0,v.jsxs)(x.aF,{isOpen:!0,onClose:()=>ce(!1),title:`Confirm Payment - ${Ye.invoiceNumber}`,footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>ce(!1),children:" Cancel "}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(Ye)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ye.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(n.ok)await Kn(),ce(!1),He(null),window.dispatchEvent(new Event("refreshBadgeCounts"));else{const e=await n.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:" Confirm Payment Received "})]}),children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Invoice Summary"}),(0,v.jsxs)(q,{children:[(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Customer:"}),(0,v.jsx)("span",{children:Ye.customerName||Ye.managerName})]}),(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Company:"}),(0,v.jsx)("span",{children:Ye.companyName})]}),(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Invoice Number:"}),(0,v.jsx)("span",{children:Ye.invoiceNumber})]}),(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Due Date:"}),(0,v.jsx)("span",{children:Bt(Ye.dueDate)})]}),(0,v.jsxs)(J,{highlight:!0,children:[(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:"Payment Amount:"})}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:(0,l.vv)(Ye.total,Ye.currency||"MYR")})})]})]})]}),Ye.hasPaymentInfo&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Customer's Payment Information"}),(0,v.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,v.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,v.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,v.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===Ye.paymentMethod?"Bank Transfer":"qr_payment"===Ye.paymentMethod?"QR Payment":"stripe"===Ye.paymentMethod?"Stripe":"paypal"===Ye.paymentMethod?"PayPal":Ye.paymentMethod||"Not specified"]}),Ye.transactionId&&(0,v.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,v.jsx)("strong",{children:"Transaction ID:"})," ",Ye.transactionId]})]}),Ye.receiptUrl&&(0,v.jsxs)("div",{style:{marginTop:"12px"},children:[(0,v.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,v.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,v.jsx)("img",{src:Ye.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(Ye.receiptUrl,"_blank")}),(0,v.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,v.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,v.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,v.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,v.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Status Change"}),(0,v.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,v.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),se&&Ye&&Ue&&(0,v.jsxs)(x.aF,{isOpen:!0,onClose:()=>le(!1),title:`Edit Invoice - ${Ye.invoiceNumber}`,footer:(0,v.jsxs)(v.Fragment,{children:[Je&&(0,v.jsxs)("div",{style:{width:"100%",padding:"10px 14px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"6px",color:"#DC2626",fontSize:"13px"},children:[" ",Je," "]})," ",(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",width:"100%"},children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>le(!1),children:" Cancel "}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(Ye&&Ue)if(Qe(null),"automatic"!==Ye.type||Ge.trim())try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ye.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(Ue.amount),tax:parseFloat(Ue.tax),total:parseFloat(Ue.total),dueDate:Ue.dueDate,payerType:Ue.payerType,payerId:Ue.payerId,items:Ue.items,discountType:"none"!==Ue.discountType?Ue.discountType:null,discountValue:"none"!==Ue.discountType?parseFloat(Ue.discountValue)||0:null,discountAmount:(()=>{const e=parseFloat(Ue.amount)||0,n=parseFloat(Ue.discountValue)||0;return"percentage"===Ue.discountType?e*(n/100):"fixed"===Ue.discountType?n:null})(),discountReason:Ue.discountReason||null,subtotal:"none"!==Ue.discountType?parseFloat(Ue.amount)||0:null,additionalCharges:(()=>{const e=parseFloat(Ue.amount)||0,n=parseFloat(Ue.discountValue)||0,t="percentage"===Ue.discountType?e*(n/100):"fixed"===Ue.discountType?n:0,i=Math.max(0,e-t);return nt(Ue.currency||"").filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(i*e.rate/100*100)/100}))})(),invoiceCategory:Ue.invoiceCategory,customDescription:Ue.customDescription,serviceDescription:Ue.serviceDescription,modificationReason:Ge.trim()||void 0})});if(n.ok){const e={...Ye,amount:parseFloat(Ue.amount),tax:parseFloat(Ue.tax),total:parseFloat(Ue.total),dueDate:Ue.dueDate,status:Ue.status,payerType:Ue.payerType,payerId:Ue.payerId,items:Ue.items};c(a.map(n=>n.id===Ye.id?e:n)),le(!1),He(null),Ve(null),await Kn()}else{const e=await n.json();Qe(e.error||"Failed to update invoice")}}catch(e){console.error("Error updating invoice:",e),Qe("Error updating invoice. Please try again.")}else Qe("Please enter a reason for modifying this invoice.")},children:" Save Changes "})]})]}),children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Search Manager or Restaurant *"}),(0,v.jsxs)("div",{style:{position:"relative"},children:[(0,v.jsx)(U,{type:"text",value:Ke,onChange:e=>(e=>{if(Ze(e),tn(!0),e.length<2)return void en({managers:[],restaurants:[]});const n=on.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=ln.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));en({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>tn(!0),onBlur:()=>setTimeout(()=>tn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),nn&&(Xe.managers.length>0||Xe.restaurants.length>0)&&(0,v.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[Xe.managers.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),Xe.managers.map(e=>(0,v.jsxs)("div",{onClick:()=>ot("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),Xe.restaurants.length>0&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),Xe.restaurants.map(e=>{const n=on.find(n=>n.id===e.admin_id);return(0,v.jsxs)("div",{onClick:()=>ot("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),an&&(0,v.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===an.type?an.data.fullName:an.data.name}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===an.type?`${an.data.companyName} \u2022 Manager`:`${an.data.address||"No address"} \u2022 Restaurant`})]}),(0,v.jsx)("button",{onClick:()=>{rn(null),Ze("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,v.jsxs)(O,{children:[(0,v.jsxs)(Y,{children:[(0,v.jsxs)(H,{children:["Amount (",Ue.currency||e.currency||"MYR",")"]}),(0,v.jsx)(U,{type:"number",value:Ue.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=parseFloat(Ue.discountValue)||0,i="percentage"===Ue.discountType?n*(t/100):"fixed"===Ue.discountType?t:0,a=Math.max(0,n-i),r=nt(Ue.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+a*n.rate/100,0),o=a+r;Ve({...Ue,amount:e.target.value,tax:r.toFixed(2),total:o.toFixed(2)})}})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Due Date"}),(0,v.jsx)(U,{type:"date",value:Ue.dueDate,onChange:e=>Ve({...Ue,dueDate:e.target.value})})]})]}),(0,v.jsxs)(O,{children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Discount"}),(0,v.jsxs)(G,{value:Ue.discountType,onChange:e=>{const n=e.target.value,t=parseFloat(Ue.amount)||0,i="none"===n?0:parseFloat(Ue.discountValue)||0,a="percentage"===n?t*(i/100):"fixed"===n?i:0,r=Math.max(0,t-a),o=nt(Ue.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+r*n.rate/100,0),s=r+o;Ve({...Ue,discountType:n,discountValue:"none"===n?"":Ue.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,v.jsx)("option",{value:"none",children:"No Discount"}),(0,v.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,v.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==Ue.discountType&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"percentage"===Ue.discountType?"Discount (%)":"Discount Amount"}),(0,v.jsx)(U,{type:"number",step:"0.01",min:"0",max:"percentage"===Ue.discountType?"100":void 0,value:Ue.discountValue,onChange:e=>{const n=parseFloat(Ue.amount)||0,t=parseFloat(e.target.value)||0,i="percentage"===Ue.discountType?n*(t/100):t,a=Math.max(0,n-i),r=nt(Ue.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+a*n.rate/100,0),o=a+r;Ve({...Ue,discountValue:e.target.value,tax:r.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==Ue.discountType&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Discount Reason"}),(0,v.jsx)(U,{type:"text",value:Ue.discountReason,onChange:e=>Ve({...Ue,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Invoice Category"}),(0,v.jsx)(G,{value:Ue.invoiceCategory||"service",onChange:e=>Ve({...Ue,invoiceCategory:e.target.value}),children:In.length>0?In.filter(e=>"subscription"!==e.code).map(e=>(0,v.jsx)("option",{value:e.code,children:e.name},e.id)):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("option",{value:"service",children:"Service"}),(0,v.jsx)("option",{value:"consulting",children:"Consulting"}),(0,v.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Ue.invoiceCategory||"service")&&(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Item/Description"}),(0,v.jsx)(V,{value:"others"===Ue.invoiceCategory?Ue.customDescription||"":Ue.serviceDescription||"",onChange:e=>{"others"===Ue.invoiceCategory?Ve({...Ue,customDescription:e.target.value}):Ve({...Ue,serviceDescription:e.target.value})},placeholder:`Enter ${Ue.invoiceCategory||"service"} description...`,rows:2})]}),(0,v.jsxs)(q,{children:[(0,v.jsxs)(J,{children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:Ue.currency?(0,l.vv)(parseFloat(Ue.amount||"0"),Ue.currency):"-"})]}),"none"!==Ue.discountType&&parseFloat(Ue.discountValue||"0")>0&&(()=>{const e=parseFloat(Ue.amount||"0"),n=parseFloat(Ue.discountValue||"0"),t="percentage"===Ue.discountType?e*(n/100):n;return(0,v.jsxs)(J,{children:[(0,v.jsxs)("span",{style:{color:"#DC2626"},children:["Discount (","percentage"===Ue.discountType?`${n}%`:"Fixed","):"]}),(0,v.jsxs)("span",{style:{color:"#DC2626"},children:["-",Ue.currency?(0,l.vv)(t,Ue.currency):t.toFixed(2)]})]})})(),nt(Ue.currency||"").filter(e=>e.enabled&&e.name&&e.rate>0).map((e,n)=>{const t=parseFloat(Ue.amount||"0"),i=parseFloat(Ue.discountValue||"0"),a="percentage"===Ue.discountType?t*(i/100):"fixed"===Ue.discountType?i:0,r=Math.max(0,t-a)*e.rate/100;return(0,v.jsxs)(J,{children:[(0,v.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,v.jsx)("span",{children:Ue.currency?(0,l.vv)(r,Ue.currency):"-"})]},n)}),(0,v.jsxs)(J,{highlight:!0,children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,v.jsx)("strong",{children:Ue.currency?(0,l.vv)(parseFloat(Ue.total||"0"),Ue.currency):"-"})})]})]}),(0,v.jsxs)(Y,{style:{marginTop:"16px"},children:[(0,v.jsxs)(H,{children:["Modification Reason ","automatic"===(null===Ye||void 0===Ye?void 0:Ye.type)&&(0,v.jsx)("span",{style:{color:"#EF4444"},children:"*"})]}),(0,v.jsx)(V,{value:Ge,onChange:e=>qe(e.target.value),placeholder:"Enter reason for modification...",rows:2})]}),(null===Ye||void 0===Ye?void 0:Ye.modificationHistory)&&Ye.modificationHistory.length>0&&(0,v.jsxs)("div",{style:{marginTop:"16px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#92400E",marginBottom:"8px"},children:"Modification History"}),Ye.modificationHistory.map((e,n)=>(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:n<Ye.modificationHistory.length-1?"8px":"0",paddingBottom:n<Ye.modificationHistory.length-1?"8px":"0",borderBottom:n<Ye.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,v.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,v.jsxs)("div",{style:{marginTop:"2px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,v.jsx)("div",{style:{marginTop:"2px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[n,t]=e;return(0,v.jsxs)("span",{style:{marginRight:"8px"},children:[n,": ",String(t.from)," \u2192 ",String(t.to)]},n)})})]},n))]})]}),pe&&Ye&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:()=>xe(!1),title:"Send Invoice",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>xe(!1),children:" Cancel "}),(0,v.jsx)(j,{variant:"success",onClick:async()=>{if(Ye)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ye.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(n.ok)await Kn(),xe(!1),He(null);else{const e=await n.json();Ae(`Failed to send invoice: ${e.error||"Unknown error"}`),Be(!0)}}catch(e){console.error("Error sending invoice:",e),Ae("Error sending invoice. Please try again."),Be(!0)}},children:" Confirm "})]}),children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,v.jsx)("strong",{children:Ye.invoiceNumber})," to ",(0,v.jsx)("strong",{children:Ye.managerName||Ye.customerName}),"?"]}),(0,v.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:Ye.invoiceNumber})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Recipient:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:Ye.managerName||Ye.customerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:Ye.customerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,v.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,l.vv)(Ye.total,Ye.currency||"MYR")})]})]})]})}),ue&&Ye&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:()=>he(!1),title:"Resend Invoice",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>he(!1),children:" Cancel "}),(0,v.jsx)(j,{variant:"primary",onClick:()=>{Ye&&(he(!1),He(null))},children:" Resend Invoice "})]}),children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,v.jsx)("strong",{children:Ye.invoiceNumber})," to ",(0,v.jsx)("strong",{children:Ye.managerName}),"?"]}),(0,v.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),me&&Ye&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:()=>ge(!1),title:"Cancel Invoice",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>ge(!1),children:" Keep Invoice "}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(Ye)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ye.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(n.ok)await Kn(),ge(!1),He(null),window.dispatchEvent(new Event("refreshBadgeCounts"));else{const e=await n.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#EF4444",borderColor:"#EF4444"},children:" Cancel Invoice "})]}),children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,v.jsx)("strong",{children:Ye.invoiceNumber}),"?"]}),(0,v.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,v.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,v.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,v.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,v.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:Ye.invoiceNumber})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,v.jsx)("span",{style:{fontWeight:"500"},children:Ye.managerName})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,v.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,l.vv)(Ye.total,Ye.currency||"MYR")})]})]})]})}),ye&&Ye&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:()=>ve(!1),title:"Delete Invoice",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>ve(!1),children:" Keep Invoice "}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(Ye)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ye.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok)await Kn(),ve(!1),He(null),window.dispatchEvent(new Event("refreshBadgeCounts"));else{const e=await n.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#EF4444",borderColor:"#EF4444"},children:" Delete Invoice "})]}),children:(0,v.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,v.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,v.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,v.jsxs)("strong",{children:["#",Ye.invoiceNumber]}),"?",(0,v.jsx)("br",{}),"This action cannot be undone."]})]})}),je&&we&&(0,v.jsxs)(x.aF,{isOpen:!0,onClose:()=>fe(!1),title:"Send Invoice via Email",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(j,{variant:"secondary",onClick:()=>{fe(!1),Ce(null),Fe("")},children:" Cancel "}),(0,v.jsx)(j,{variant:"primary",onClick:async()=>{if(!we||!be)return Ae("Please enter a valid email address."),void Be(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${we.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:be})});if(n.ok)Ae(`Invoice sent successfully to ${be}`),fe(!1),Ce(null),Fe("");else{const e=await n.json();Ae(e.error||"Failed to send invoice email.")}Be(!0)}catch(e){console.error("Error sending invoice email:",e),Ae("Failed to send invoice email. Please try again."),Be(!0)}},disabled:!be||!be.includes("@"),children:" Send Email "})]}),children:[(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Invoice"}),(0,v.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,v.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:we.invoiceNumber}),(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:we.customerName}),(0,v.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,l.vv)(we.total,we.currency||"MYR")})]})]}),(0,v.jsxs)(Y,{children:[(0,v.jsx)(H,{children:"Recipient Email *"}),(0,v.jsx)(U,{type:"email",value:be,onChange:e=>Fe(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,v.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:be?(0,v.jsxs)(v.Fragment,{children:["Default email for ","restaurant"===we.payerType?"Restaurant":"foodcourt_manager"===we.payerType?"Foodcourt Manager":"brand_manager"===we.payerType?"Brand Manager":"Customer"]}):(0,v.jsxs)(v.Fragment,{children:["Enter the ","restaurant"===we.payerType?"restaurant":"foodcourt_manager"===we.payerType?"foodcourt manager":"brand_manager"===we.payerType?"brand manager":"customer"," email address"]})})]}),(0,v.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,v.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),ke&&(0,v.jsx)(x.aF,{isOpen:!0,onClose:()=>Be(!1),title:"Success",footer:(0,v.jsx)(v.Fragment,{children:(0,v.jsx)(j,{variant:"primary",onClick:()=>Be(!1),children:" OK "})}),children:(0,v.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,v.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:Se})})})]})]})})}},7617:(e,n,t)=>{t.d(n,{A:()=>u});t(9950);var i=t(7119),a=t(4752),r=t(9610),o=t(4414);const s=a.Ay.div`
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
`,u=e=>{let{isOpen:n,title:t,message:a,onConfirm:u,onCancel:h,confirmText:m="Confirm",cancelText:g="Cancel",type:y="warning"}=e;return n?i.createPortal((0,o.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(l,{children:[(0,o.jsx)(d,{children:t}),(0,o.jsx)(c,{children:a})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{variant:"secondary",onClick:h,children:g}),(0,o.jsx)(x,{variant:"primary",type:y,onClick:u,children:m})]})]})}),document.body):null}}}]);