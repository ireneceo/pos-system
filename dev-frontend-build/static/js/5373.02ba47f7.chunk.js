"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5373],{512:(e,t,i)=>{i.d(t,{x:()=>D,A:()=>Y});var n=i(9950),r=i(4752),a=i(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],d=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,s=e=>{if(!e)return null;const[t,i,n]=e.split("-").map(Number);return new Date(t,i-1,n)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),x=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),p=r.Ay.div`
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
`,w=r.Ay.button`
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
`,b=r.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,F=r.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,f=r.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,y=r.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,k=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,v=r.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,j=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,E=r.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,$=r.Ay.div`
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
`,A=e=>{let{startDate:t,endDate:i,onRangeSelect:r,onClose:A,isOpen:C}=e;const D=new Date,[B,S]=(0,n.useState)(D.getMonth()),[z,T]=(0,n.useState)(D.getFullYear()),[R,Y]=(0,n.useState)(null),[L,M]=(0,n.useState)(null),[W,I]=(0,n.useState)(null),[N,_]=(0,n.useState)("start"),H=(0,n.useRef)(null);(0,n.useEffect)(()=>{t&&Y(s(t)),i&&M(s(i))},[t,i]),(0,n.useEffect)(()=>{C&&_("start")},[C]),(0,n.useEffect)(()=>{const e=e=>{H.current&&!H.current.contains(e.target)&&A()};return C&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[C,A]);const U=(0,n.useCallback)(()=>{0===B?(S(11),T(e=>e-1)):S(e=>e-1)},[B]),O=(0,n.useCallback)(()=>{11===B?(S(0),T(e=>e+1)):S(e=>e+1)},[B]),P=(e,t)=>{const i=((e,t)=>new Date(e,t+1,0).getDate())(e,t),n=((e,t)=>new Date(e,t,1).getDay())(e,t),s=[];for(let r=0;r<n;r++)s.push(null);for(let r=1;r<=i;r++)s.push(new Date(e,t,r));return(0,a.jsxs)(f,{children:[(0,a.jsx)(y,{children:x(e,t)}),(0,a.jsx)(k,{children:o.map(e=>(0,a.jsx)(v,{children:e},e))}),(0,a.jsx)(j,{children:s.map((e,t)=>{if(!e)return(0,a.jsx)(E,{},`e-${t}`);const{isStart:i,isEnd:n,isInRange:o,isHoverEnd:s}=(e=>{const t=R&&l(e,R),i=L&&l(e,L),n="end"===N&&W?W:L;let r=!1;if(R&&n){const[t,i]=R<=n?[R,n]:[n,R];r=((e,t,i)=>{const n=e.getTime();return n>t.getTime()&&n<i.getTime()})(e,t,i)}return{isStart:t,isEnd:i,isInRange:r,isHoverEnd:"end"===N&&W&&l(e,W)}})(e),x=l(e,D);return(0,a.jsx)($,{$isStart:!!i,$isEnd:!!n,$isInRange:o,$isHoverEnd:!!s,$isToday:x,onClick:()=>(e=>{if("start"===N)Y(e),M(null),_("end");else{let t=R,i=e;i<t&&([t,i]=[i,t]),Y(t),M(i),_("start"),r(d(t),d(i)),setTimeout(A,200)}})(e),onMouseEnter:()=>I(e),onMouseLeave:()=>I(null),children:e.getDate()},e.getTime())})})]})},J=11===B?0:B+1,Q=11===B?z+1:z,Z=e=>{const t=new Date;let i;const n=t;switch(e){case"this_week":i=new Date(t),i.setDate(t.getDate()-t.getDay());break;case"this_month":i=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":i=new Date(t.getFullYear(),0,1);break;default:return}Y(i),M(n),_("start"),r(d(i),d(n)),setTimeout(A,150)};return C?(0,a.jsx)(p,{ref:H,children:(0,a.jsxs)(c,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(g,{onClick:()=>Z("this_week"),children:"This Week"}),(0,a.jsx)(g,{onClick:()=>Z("this_month"),children:"This Month"}),(0,a.jsx)(g,{onClick:()=>Z("this_year"),children:"This Year"})]}),(0,a.jsxs)(u,{children:[(0,a.jsxs)(m,{children:[(0,a.jsx)(w,{onClick:U,"aria-label":"Previous month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,a.jsx)(w,{onClick:O,"aria-label":"Next month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,a.jsxs)(b,{children:[P(z,B),(0,a.jsx)(F,{children:P(Q,J)})]})]})]})}):null},C=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,D=e=>{const t=new Date;let i=new Date;const n=new Date;switch(e){case"today":break;case"week":i.setDate(t.getDate()-6);break;case"month":i.setDate(t.getDate()-29);break;case"year":i.setDate(t.getDate()-364);break;case"all":i=new Date(2020,0,1)}return{start:C(i),end:C(n)}},B=r.Ay.div`
  margin-bottom: 24px;
`,S=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,z=r.Ay.button`
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
`,T=r.Ay.div`
  position: relative;
  display: inline-block;
`,R=r.Ay.button`
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
`,Y=e=>{let{activePeriod:t,dateRange:i,isCustomDateRange:r,onPeriodChange:o,onCalendarRangeSelect:d,includeToday:s=!1,children:l}=e;const[x,p]=(0,n.useState)(!1),c=s?["today","week","month","year","all"]:["week","month","year","all"],h={today:"Today",week:"Week",month:"Month",year:"Year",all:"All"};return(0,a.jsx)(B,{children:(0,a.jsxs)(S,{children:[c.map(e=>(0,a.jsx)(z,{active:t===e&&!r,onClick:()=>o(e),children:h[e]},e)),(0,a.jsxs)(T,{children:[(0,a.jsxs)(R,{active:r,onClick:()=>p(!x),children:[(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,a.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,a.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,a.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),i.start&&i.end?`${i.start} ~ ${i.end}`:"Custom Range"]}),(0,a.jsx)(A,{isOpen:x,startDate:i.start,endDate:i.end,onRangeSelect:(e,t)=>{d(e,t),p(!1)},onClose:()=>p(!1)})]}),l]})})}},2488:(e,t,i)=>{i.d(t,{DO:()=>p,Jt:()=>c,Qn:()=>x});i(9950);var n=i(4752),r=i(4414);const a=n.Ay.div`
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
`,o=n.Ay.input`
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
`,d=n.Ay.div`
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
`,s=n.Ay.button`
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
`,l=n.Ay.select`
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
`,x=e=>{let{children:t,className:i,style:n,...o}=e;return(0,r.jsx)(a,{className:i,style:n,...o,children:t})},p=e=>{let{placeholder:t="Search...",value:i,onChange:n,style:a,...l}=e;return(0,r.jsxs)(d,{style:a,children:[(0,r.jsx)(o,{placeholder:t,value:i,onChange:n,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:i?"36px":"16px"},...l}),i&&(0,r.jsx)(s,{type:"button",onClick:()=>null===n||void 0===n?void 0:n({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},c=e=>{let{children:t,...i}=e;return(0,r.jsx)(l,{...i,children:t})}},2597:(e,t,i)=>{i.d(t,{Ex:()=>x,oz:()=>l,tU:()=>s});i(9950);var n=i(4752),r=i(4414);const a=n.Ay.div`
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
`,s=e=>{let{children:t,className:i,style:n}=e;return(0,r.jsx)(a,{className:i,style:n,children:t})},l=e=>{let{active:t,onClick:i,children:n,className:a}=e;return(0,r.jsx)(o,{active:t,onClick:i,className:a,children:n})},x=e=>{let{count:t,variant:i="default",showZero:n=!1}=e;return 0!==t||n?(0,r.jsx)(d,{variant:i,children:t}):null}}}]);