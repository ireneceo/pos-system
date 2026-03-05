"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9309],{2488:(e,n,t)=>{t.d(n,{DO:()=>p,Jt:()=>x,Qn:()=>c});t(9950);var i=t(4752),r=t(4414);const a=i.Ay.div`
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
`,c=e=>{let{children:n,className:t,style:i,...o}=e;return(0,r.jsx)(a,{className:t,style:i,...o,children:n})},p=e=>{let{placeholder:n="Search...",value:t,onChange:i,style:a,...d}=e;return(0,r.jsxs)(s,{style:a,children:[(0,r.jsx)(o,{placeholder:n,value:t,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:t?"36px":"16px"},...d}),t&&(0,r.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:n,...t}=e;return(0,r.jsx)(d,{...t,children:n})}},2597:(e,n,t)=>{t.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});t(9950);var i=t(4752),r=t(4414);const a=i.Ay.div`
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
`,l=e=>{let{children:n,className:t,style:i}=e;return(0,r.jsx)(a,{className:t,style:i,children:n})},d=e=>{let{active:n,onClick:t,children:i,className:a}=e;return(0,r.jsx)(o,{active:n,onClick:t,className:a,children:i})},c=e=>{let{count:n,variant:t="default",showZero:i=!1}=e;return 0!==n||i?(0,r.jsx)(s,{variant:t,children:n}):null}},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var i=t(4752),r=t(9610),a=t(4414);const o=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=i.Ay.button`
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
`,x=e=>{let{isOpen:n,title:t,message:i,onConfirm:x,onCancel:u,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return n?(0,a.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,a.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(l,{children:t}),(0,a.jsx)(d,{children:i})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:u,children:g}),(0,a.jsx)(p,{variant:"primary",type:m,onClick:x,children:h})]})]})}):null}},9309:(e,n,t)=>{t.r(n),t.d(n,{default:()=>be});var i=t(9950),r=t(4752),a=t(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[n,t,i]=e.split("-").map(Number);return new Date(n,t-1,i)},d=(e,n)=>e.getFullYear()===n.getFullYear()&&e.getMonth()===n.getMonth()&&e.getDate()===n.getDate(),c=(e,n)=>new Date(e,n).toLocaleDateString("en-US",{month:"long",year:"numeric"}),p=r.Ay.div`
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
`,x=r.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,u=r.Ay.button`
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
`,h=r.Ay.div`
  display: flex;
  gap: 32px;
`,g=r.Ay.div`
  width: 252px;
`,m=r.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,y=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 36px);
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
  grid-template-columns: repeat(7, 36px);
`,f=r.Ay.div`
  width: 36px;
  height: 36px;
`,b=r.Ay.div`
  width: 36px;
  height: 36px;
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
`,F=e=>{let{startDate:n,endDate:t,onRangeSelect:r,onClose:F,isOpen:w}=e;const C=new Date,[k,S]=(0,i.useState)(C.getMonth()),[B,A]=(0,i.useState)(C.getFullYear()),[E,D]=(0,i.useState)(null),[N,T]=(0,i.useState)(null),[$,I]=(0,i.useState)(null),[z,_]=(0,i.useState)("start"),P=(0,i.useRef)(null);(0,i.useEffect)(()=>{n&&D(l(n)),t&&T(l(t))},[n,t]),(0,i.useEffect)(()=>{w&&_("start")},[w]),(0,i.useEffect)(()=>{const e=e=>{P.current&&!P.current.contains(e.target)&&F()};return w&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[w,F]);const M=(0,i.useCallback)(()=>{0===k?(S(11),A(e=>e-1)):S(e=>e-1)},[k]),L=(0,i.useCallback)(()=>{11===k?(S(0),A(e=>e+1)):S(e=>e+1)},[k]),W=(e,n)=>{const t=((e,n)=>new Date(e,n+1,0).getDate())(e,n),i=((e,n)=>new Date(e,n,1).getDay())(e,n),l=[];for(let r=0;r<i;r++)l.push(null);for(let r=1;r<=t;r++)l.push(new Date(e,n,r));return(0,a.jsxs)(g,{children:[(0,a.jsx)(m,{children:c(e,n)}),(0,a.jsx)(y,{children:o.map(e=>(0,a.jsx)(v,{children:e},e))}),(0,a.jsx)(j,{children:l.map((e,n)=>{if(!e)return(0,a.jsx)(f,{},`e-${n}`);const{isStart:t,isEnd:i,isInRange:o,isHoverEnd:l}=(e=>{const n=E&&d(e,E),t=N&&d(e,N),i="end"===z&&$?$:N;let r=!1;if(E&&i){const[n,t]=E<=i?[E,i]:[i,E];r=((e,n,t)=>{const i=e.getTime();return i>n.getTime()&&i<t.getTime()})(e,n,t)}return{isStart:n,isEnd:t,isInRange:r,isHoverEnd:"end"===z&&$&&d(e,$)}})(e),c=d(e,C);return(0,a.jsx)(b,{$isStart:!!t,$isEnd:!!i,$isInRange:o,$isHoverEnd:!!l,$isToday:c,onClick:()=>(e=>{if("start"===z)D(e),T(null),_("end");else{let n=E,t=e;t<n&&([n,t]=[t,n]),D(n),T(t),_("start"),r(s(n),s(t)),setTimeout(F,200)}})(e),onMouseEnter:()=>I(e),onMouseLeave:()=>I(null),children:e.getDate()},e.getTime())})})]})},R=11===k?0:k+1,U=11===k?B+1:B;return w?(0,a.jsxs)(p,{ref:P,children:[(0,a.jsxs)(x,{children:[(0,a.jsx)(u,{onClick:M,"aria-label":"Previous month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,a.jsx)(u,{onClick:L,"aria-label":"Next month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,a.jsxs)(h,{children:[W(B,k),W(U,R)]})]}):null};var w=t(2853),C=t(4492),k=t(6038),S=t(9018),B=t(4728),A=t(7617),E=t(8409),D=t(2488),N=t(2597),T=t(5612),$=t(1052),I=t.n($);const z=(0,r.Ay)(B.SC)``,_=r.Ay.div``,P=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,M=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,L=r.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,W=(0,r.Ay)(B.Wh)`
  white-space: normal;
  line-height: 1.3;
`,R=r.Ay.button`
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
`,U=r.Ay.button`
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
`,H=r.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,O=r.Ay.div`
  display: grid;
  gap: 12px;
`,Y=r.Ay.div`
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
`,V=r.Ay.div`
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
`,q=r.Ay.div`
  flex: 1;
`,G=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`,J=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,Q=r.Ay.div`
  display: flex;
  gap: 8px;
`,K=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,Z=r.Ay.button`
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
`,X=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,ee=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,ne=r.Ay.div`
  margin-bottom: 24px;
`,te=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`,ie=r.Ay.button`
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
`,re=r.Ay.div`
  position: relative;
  display: inline-block;
`,ae=r.Ay.button`
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
`,oe=r.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,se=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 640px) {
    width: 95%;
    max-width: none;
  }
`,le=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,de=r.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,ce=r.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #F3F4F6;
    color: #374151;
  }
`,pe=r.Ay.div`
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
`,xe=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  flex-shrink: 0;
`,ue=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,he=r.Ay.div`
  margin-bottom: 20px;
`,ge=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,me=r.Ay.input`
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
`,ye=r.Ay.textarea`
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
`,ve=r.Ay.select`
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
`,je=r.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,fe=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,be=()=>{const{operationSettings:e}=(0,S.Pj)(),[n,t]=(0,C.ok)(),[r,o]=(0,i.useState)([]),[s,l]=(0,i.useState)(""),[d,c]=(0,i.useState)("month"),[p,x]=(0,i.useState)(!1),[u,h]=(0,i.useState)(!1),[g,m]=(0,i.useState)(()=>{const e=new Date,n=new Date(e.getFullYear(),e.getMonth(),1),t=new Date(e.getFullYear(),e.getMonth()+1,0),i=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:i(n),end:i(t)}}),[y,v]=(0,i.useState)(!1),[j,f]=(0,i.useState)(!1),[b,B]=(0,i.useState)(!1),[$,be]=(0,i.useState)(!1),[Fe,we]=(0,i.useState)(!1),[Ce,ke]=(0,i.useState)(!1),[Se,Be]=(0,i.useState)(!1),[Ae,Ee]=(0,i.useState)(!1),[De,Ne]=(0,i.useState)(!1),[Te,$e]=(0,i.useState)(""),[Ie,ze]=(0,i.useState)(null),[_e,Pe]=(0,i.useState)(!1),[Me,Le]=(0,i.useState)(""),We=n.get("tab")||"invoices",Re=e=>{t({tab:e})},[Ue,He]=(0,i.useState)(!1),[Oe,Ye]=(0,i.useState)(null),[Ve,qe]=(0,i.useState)({name:"",code:"",description:""}),[Ge,Je]=(0,i.useState)(!1),[Qe,Ke]=(0,i.useState)(!1),[Ze,Xe]=(0,i.useState)(null),[en,nn]=(0,i.useState)(null),[tn,rn]=(0,i.useState)(null),[an,on]=(0,i.useState)(""),[sn,ln]=(0,i.useState)(""),[dn,cn]=(0,i.useState)({managers:[],restaurants:[]}),[pn,xn]=(0,i.useState)(!1),[un,hn]=(0,i.useState)(null),[gn,mn]=(0,i.useState)([]),[yn,vn]=(0,i.useState)([]),[jn,fn]=(0,i.useState)({managers:[],restaurants:[]}),[bn,Fn]=(0,i.useState)(""),[wn,Cn]=(0,i.useState)(!1),[kn,Sn]=(0,i.useState)(null),[Bn,An]=(0,i.useState)(null),[,En]=(0,i.useState)({}),[,Dn]=(0,i.useState)([]),[Nn,Tn]=(0,i.useState)([]),[$n,In]=(0,i.useState)({}),[,zn]=(0,i.useState)({enabled:!1,rate:0,name:"Tax"}),[_n,Pn]=(0,i.useState)("issueDate"),[Mn,Ln]=(0,i.useState)("desc"),[Wn,Rn]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),Un=e=>{c(e),x(!1),h(!1);const n=new Date;let t=new Date,i=new Date;const a=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"today":break;case"week":t.setDate(n.getDate()-n.getDay());break;case"month":t=new Date(n.getFullYear(),n.getMonth(),1),i=new Date(n.getFullYear(),n.getMonth()+1,0);break;case"year":t=new Date(n.getFullYear(),0,1),i=new Date(n.getFullYear(),11,31);break;case"all":if(r.length>0){const e=r.reduce((e,n)=>{const t=n.issueDate||n.dueDate;return t<e?t:e},r[0].issueDate||r[0].dueDate);t=new Date(e)}else t=new Date(n.getFullYear(),0,1)}m({start:a(t),end:a(i)})},Hn=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void o([]);const n=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",n.status),n.ok){const e=await n.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),o(e)}else{const e=await n.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",n.status,e),o([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),o([])}},On=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(n.ok){const e=await n.json();e.success&&e.data&&Tn(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),Yn=e=>{e?(Ye(e),qe({name:e.name,code:e.code,description:e.description||""})):(Ye(null),qe({name:"",code:"",description:""})),He(!0)},Vn=()=>{He(!1),Ye(null),qe({name:"",code:"",description:""})};(0,i.useEffect)(()=>{Hn(),Qn(),Kn(),et(),Jn(),On(),(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/admin/payment-settings",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();if(e.additionalCharges){Array.isArray(e.additionalCharges)?In({}):In(e.additionalCharges);const n=(Array.isArray(e.additionalCharges)?e.additionalCharges:Object.values(e.additionalCharges).flat()).find(e=>null===e||void 0===e?void 0:e.enabled);n&&zn({enabled:n.enabled,rate:parseFloat(n.rate)||0,name:n.name||"Tax"})}}}catch(e){console.error("Error fetching payment settings:",e)}})()},[]);const qn=e=>{const n=(0,k.Wh)(e);return $n[n]||$n[e]||[]},Gn=qn(Wn.currency),Jn=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&En(n.currencies)}const n=await fetch("/api/currencies/supported");if(n.ok){const e=await n.json();if(e.success&&e.data){const n=e.data.map(e=>e.code);Dn(n)}}}catch(e){console.error("Error fetching currency config:",e)}},Qn=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[n,t]=await Promise.all([fetch("/api/users?role=Brand General",{headers:e}),fetch("/api/users?role=Foodcourt General",{headers:e})]);let i=[];if(n.ok){const e=await n.json(),t=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand General"}));i=[...i,...t]}if(t.ok){const e=await t.json(),n=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt General"}));i=[...i,...n]}console.log("Fetched managers (General only):",i.length),mn(i)}catch(e){console.error("Error fetching managers:",e),mn([])}},Kn=async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();console.log("Fetched restaurants:",e);const t=e.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,admin_id:(null===(n=e.admin_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||"",phone:e.phone||"",email:e.email||"",currency:e.currency||"USD"}});vn(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),vn([])}catch(e){console.error("Error fetching restaurants:",e),vn([])}},Zn=(e,n)=>{if(hn({type:e,data:n}),ln("manager"===e?n.fullName:n.name),xn(!1),"manager"===e){const e=n;rn({...tn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=gn.find(n=>n.id===e.admin_id);rn({...tn,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},Xn=async(e,n)=>{Sn({type:e,data:n}),Cn(!1),Fn("manager"===e?n.fullName:n.name);const t=localStorage.getItem("auth_token");let i="USD";if("manager"===e){const e=n;try{const n=await fetch(`/api/users/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){const e=await n.json(),o=e.success?e.data:e;if(o.brand_id){const e=await fetch(`/api/brands/${o.brand_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var r;const n=await e.json(),t=n.data||n,a=null===(r=t.payment_settings)||void 0===r?void 0:r.defaultCurrency,o=t.supported_currencies;a?i=a:o&&o.length>0&&(i=o[0]),console.log("Brand currency:",i,"defaultCurrency:",a,"supported:",o)}}else if(o.foodcourt_id){const e=await fetch(`/api/foodcourts/${o.foodcourt_id}/payment-settings`,{headers:{Authorization:`Bearer ${t}`}});if(e.ok){var a;const n=await e.json(),t=n.data||n,r=null===(a=t.payment_settings)||void 0===a?void 0:a.defaultCurrency,o=t.supported_currencies;r?i=r:o&&o.length>0&&(i=o[0]),console.log("Foodcourt currency:",i,"defaultCurrency:",r,"supported:",o)}}}}catch(o){console.error("Error fetching manager currency:",o)}Rn({...Wn,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:"",currency:i})}else{const e=n,r=gn.find(n=>n.id===e.admin_id);try{const n=await fetch(`/api/restaurants/${e.id}`,{headers:{Authorization:`Bearer ${t}`}});if(n.ok){i=(await n.json()).currency||"USD"}}catch(o){console.error("Error fetching restaurant currency:",o)}Rn({...Wn,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:r?r.fullName:"",companyName:e.name,currency:i})}},et=async()=>{try{const n=await fetch("/api/admin/settings");if(n.ok){const e=await n.json();An(e)}else{const n=localStorage.getItem("adminSettings");let t="";if(n)try{const e=JSON.parse(n);t=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),An({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:t})}}catch(n){console.error("Error fetching company settings:",n);const t=localStorage.getItem("adminSettings");let i="";if(t)try{const e=JSON.parse(t);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),An({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},nt=e=>{if(!Bn)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${Bn.companyLogo?`<img src="${Bn.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${Bn.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${Bn.address?`${Bn.address}<br>`:""}\n                    ${[Bn.city,Bn.state,Bn.postalCode].filter(Boolean).join(", ")}${Bn.city||Bn.state||Bn.postalCode?"<br>":""}\n                    ${Bn.country?`${Bn.country}<br>`:""}\n                    ${Bn.phone?`Tel: ${Bn.phone}<br>`:""}\n                    ${Bn.email?`Email: ${Bn.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${yt(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${yt(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${yt(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,k.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,k.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,k.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${(e.additionalCharges||[]).map(n=>`\n                <div class="summary-row tax">\n                    <span>${n.name} (${n.rate}%):</span>\n                    <span>${(0,k.vv)(n.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,k.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${Bn.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${Bn.bankName}<br>\n                <strong>Account Name:</strong> ${Bn.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${Bn.bankAccount||"-"}\n                ${Bn.swiftCode?`<br><strong>SWIFT Code:</strong> ${Bn.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${Bn.taxNumber||Bn.registrationNumber?`\n        <div class="registration-info">\n            ${Bn.registrationNumber?`Reg No: ${Bn.registrationNumber}`:""}\n            ${Bn.registrationNumber&&Bn.taxNumber?" | ":""}\n            ${Bn.taxNumber?`Tax No: ${Bn.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},tt=async e=>{if(!Bn)return Le("Company settings not loaded. Please try again."),void Pe(!0);try{var n;const t=nt(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const r=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!r)throw document.body.removeChild(i),new Error("Could not access iframe document");r.open(),r.write(t),r.close(),await new Promise(async e=>{try{var n;null!==(n=r.fonts)&&void 0!==n&&n.ready&&await r.fonts.ready}catch{}const t=r.querySelectorAll("img");await Promise.all(Array.from(t).map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=n,e.onerror=n}))),setTimeout(e,100)});const a=await I()(r.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=a.toDataURL("image/png"),s=new T.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=a.height*l/a.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t),Le("Failed to generate PDF. Please try again."),Pe(!0)}},it=e=>{if(!Bn)return Le("Company settings not loaded. Please try again."),void Pe(!0);const n=nt(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},rt=async e=>{ze(e);let n="";if("restaurant"===e.payerType&&e.restaurantId){const t=yn.find(n=>n.id===e.restaurantId);null!==t&&void 0!==t&&t.email&&(n=t.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const t=gn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}if(!n&&e.managerId){const t=gn.find(n=>n.id===e.managerId);null!==t&&void 0!==t&&t.email&&(n=t.email)}$e(n),Ne(!0)},at=()=>{Rn({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),Sn(null),Fn(""),Cn(!1)},ot=e=>{if("pending_payment"!==e.status)return!1;const n=new Date;return new Date(e.dueDate)<n},st=e=>ot(e)?"overdue":e.status,lt=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},dt=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},ct=r.filter(e=>{const n=s.toLowerCase(),t=lt(e.status).toLowerCase(),i="automatic"===e.type?"auto automatic":"manual",r=(e.planType||"").toLowerCase(),a=(e.categoryDisplayName||"").toLowerCase(),o=(e.customerName||e.restaurantName||"").toLowerCase(),l=dt(e.payerType||"restaurant").toLowerCase(),d=!s||e.companyName.toLowerCase().includes(n)||e.invoiceNumber.toLowerCase().includes(n)||e.managerName.toLowerCase().includes(n)||t.includes(n)||i.includes(n)||r.includes(n)||a.includes(n)||o.includes(n)||l.includes(n)||(e.billingPeriod||"").toLowerCase().includes(n);let c=!0;if(g.start&&g.end){const n=new Date(e.issueDate),t=new Date(g.start),i=new Date(g.end);t.setHours(0,0,0,0),i.setHours(23,59,59,999),c=n>=t&&n<=i}return d&&c}).sort((e,n)=>{let t=0;switch(_n){case"invoiceNumber":t=e.invoiceNumber.localeCompare(n.invoiceNumber);break;case"companyName":t=e.companyName.localeCompare(n.companyName);break;case"issueDate":default:t=new Date(e.issueDate).getTime()-new Date(n.issueDate).getTime();break;case"dueDate":t=new Date(e.dueDate).getTime()-new Date(n.dueDate).getTime();break;case"amount":t=e.total-n.total;break;case"status":t=(e.status||"").localeCompare(n.status||"")}return"desc"===Mn?-t:t}),pt=e=>{_n===e?Ln("asc"===Mn?"desc":"asc"):(Pn(e),Ln("dueDate"===e||"amount"===e?"desc":"asc"))},xt=e=>_n!==e?"":"asc"===Mn?" \u25b2":" \u25bc",ut=r.length,ht=r.filter(e=>"paid"===e.status).length,gt=r.filter(e=>ot(e)).length,mt=r.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),yt=e=>new Date(e).toLocaleDateString("en-MY"),vt=e=>{nn(e),f(!0)},jt=e=>{var n,t;if(nn(e),rn({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(n=e.items)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",items:e.items}),e.restaurantId){const n=yn.find(n=>n.id===e.restaurantId);n&&(hn({type:"restaurant",data:n}),ln(n.name))}else if(e.managerId){const n=gn.find(n=>n.id===e.managerId);n&&(hn({type:"manager",data:n}),ln(n.fullName))}on(""),B(!0)},ft=e=>{nn(e),Ee(!0)};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(E.mc,{children:[(0,a.jsxs)(E.Y9,{children:[(0,a.jsx)(E.hE,{children:"Invoices"}),(0,a.jsx)(E.ex,{})]}),(0,a.jsxs)(E.UC,{children:[(0,a.jsxs)(E.MD,{children:[(0,a.jsxs)(E.hI,{color:"#059669",children:[(0,a.jsx)(E.Os,{children:ut}),(0,a.jsx)(E.v0,{children:"Total Invoices"}),(0,a.jsx)(E.d1,{children:"All invoice records"})]}),(0,a.jsxs)(E.hI,{color:"#2563EB",children:[(0,a.jsx)(E.Os,{children:ht}),(0,a.jsx)(E.v0,{children:"Paid Invoices"}),(0,a.jsxs)(E.d1,{children:[ut>0?Math.round(ht/ut*100):0,"% completed"]})]}),(0,a.jsxs)(E.hI,{color:"#DC2626",children:[(0,a.jsx)(E.Os,{children:gt}),(0,a.jsx)(E.v0,{children:"Overdue Invoices"}),(0,a.jsx)(E.d1,{children:"Requires attention"})]}),(0,a.jsxs)(E.hI,{color:"#7C3AED",children:[(0,a.jsx)(E.Os,{children:(0,k.vv)(mt)}),(0,a.jsx)(E.v0,{children:"Total Revenue"}),(0,a.jsx)(E.d1,{children:"From paid invoices"})]})]}),(0,a.jsxs)(N.tU,{children:[(0,a.jsx)(N.oz,{active:"invoices"===We,onClick:()=>Re("invoices"),children:"Invoices"}),(0,a.jsxs)(N.oz,{active:"payment_submitted"===We,onClick:()=>Re("payment_submitted"),children:["Payment Submitted",(0,a.jsx)(N.Ex,{count:r.filter(e=>"payment_submitted"===e.status).length,variant:"danger"})]}),(0,a.jsx)(N.oz,{active:"categories"===We,onClick:()=>Re("categories"),children:"Invoice Categories"})]}),"invoices"===We&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(ne,{children:(0,a.jsxs)(te,{children:[(0,a.jsx)(D.DO,{placeholder:"Search invoices... (status, type, customer, etc.)",value:s,onChange:e=>l(e.target.value),style:{minWidth:"280px",maxWidth:"350px"}}),(0,a.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",marginLeft:"16px"},children:[(0,a.jsx)(ie,{active:"week"===d&&!p,onClick:()=>Un("week"),children:"Week"}),(0,a.jsx)(ie,{active:"month"===d&&!p,onClick:()=>Un("month"),children:"Month"}),(0,a.jsx)(ie,{active:"year"===d&&!p,onClick:()=>Un("year"),children:"Year"}),(0,a.jsx)(ie,{active:"all"===d&&!p,onClick:()=>Un("all"),children:"All"}),(0,a.jsxs)(re,{children:[(0,a.jsxs)(ae,{active:p,onClick:()=>h(!u),children:[(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,a.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,a.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,a.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),g.start&&g.end?`${g.start} ~ ${g.end}`:"Custom Range"]}),(0,a.jsx)(F,{isOpen:u,startDate:g.start,endDate:g.end,onRangeSelect:(e,n)=>{x(!0),c("all"),m({start:e,end:n})},onClose:()=>h(!1)})]})]}),(0,a.jsx)("div",{style:{marginLeft:"auto"},children:(0,a.jsx)(z,{variant:"primary",onClick:()=>{at(),v(!0)},children:"Create Invoice"})})]})}),(0,a.jsxs)(E.an,{children:[(0,a.jsxs)(E.bQ,{children:[(0,a.jsx)(E.B_,{children:(0,a.jsxs)("tr",{children:[(0,a.jsxs)(E.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>pt("invoiceNumber"),children:["Invoice",xt("invoiceNumber")]}),(0,a.jsxs)(E.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>pt("companyName"),children:["Customer",xt("companyName")]}),(0,a.jsx)(E.gU,{align:"center",children:"Period"}),(0,a.jsx)(E.gU,{align:"center",children:"Issued"}),(0,a.jsxs)(E.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>pt("dueDate"),children:["Due",xt("dueDate")]}),(0,a.jsxs)(E.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>pt("status"),children:["Status",xt("status")]}),(0,a.jsxs)(E.gU,{align:"right",style:{cursor:"pointer"},onClick:()=>pt("amount"),children:["Amount",xt("amount")]}),(0,a.jsx)(E.gU,{align:"right",children:"Total"}),(0,a.jsx)(E.gU,{isActions:!0,children:"Actions"})]})}),(0,a.jsx)("tbody",{children:ct.map(e=>(0,a.jsxs)(E.J2,{children:[(0,a.jsx)(E.Bv,{"data-label":"Invoice",children:(0,a.jsxs)(_,{children:[(0,a.jsxs)(P,{children:[e.invoiceNumber,"automatic"===e.type&&(0,a.jsx)(L,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,a.jsx)(M,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,a.jsx)(E.Bv,{"data-label":"Customer",children:(0,a.jsxs)(_,{children:[(0,a.jsx)(P,{children:e.customerName||e.restaurantName||"Unknown"}),(0,a.jsx)(M,{children:dt(e.payerType||"restaurant")})]})}),(0,a.jsx)(E.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,a.jsx)(E.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:yt(e.issueDate)}),(0,a.jsx)(E.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:yt(e.dueDate)}),(0,a.jsxs)(E.Bv,{"data-label":"Status",align:"center",children:[(0,a.jsx)(W,{status:st(e),children:lt(st(e))}),e.isModified&&(0,a.jsx)("span",{style:{display:"inline-block",marginLeft:"4px",padding:"2px 6px",fontSize:"10px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px",verticalAlign:"middle"},children:"Modified"})]}),(0,a.jsx)(E.Bv,{"data-label":"Amount",align:"right",children:(0,a.jsx)(E.DM,{children:(0,k.vv)(e.amount,e.currency||"USD")})}),(0,a.jsx)(E.Bv,{"data-label":"Total",align:"right",children:(0,a.jsx)(E.DM,{highlight:!0,children:0===e.total?(0,a.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,k.vv)(e.total,e.currency||"USD")})}),(0,a.jsx)(E.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,a.jsxs)(E.wr,{children:[(0,a.jsx)(R,{variant:"primary",onClick:()=>vt(e),children:"View"}),"draft"===e.status&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(R,{onClick:()=>jt(e),children:"Edit"}),(0,a.jsx)(R,{variant:"success",onClick:()=>(e=>{nn(e),we(!0)})(e),title:"Send Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,a.jsx)("polygon",{points:"22,2 15,22 11,13 2,9 22,2"})]})}),(0,a.jsx)(U,{onClick:()=>ft(e),title:"Delete Invoice",children:(0,a.jsx)(H,{children:"\xd7"})})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(R,{onClick:()=>jt(e),children:"Edit"}),(0,a.jsx)(R,{onClick:()=>tt(e),title:"Download PDF",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,a.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,a.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,a.jsx)(R,{onClick:()=>it(e),title:"Print Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,a.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,a.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,a.jsx)(R,{variant:"email",onClick:()=>rt(e),title:"Send Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,a.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,a.jsx)(U,{onClick:()=>ft(e),title:"Delete Invoice",children:(0,a.jsx)(H,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,a.jsxs)(a.Fragment,{children:[e.hasPaymentInfo&&(0,a.jsx)(R,{variant:"primary",onClick:()=>(e=>{nn(e),be(!0)})(e),children:"Confirm"}),(0,a.jsx)(R,{onClick:()=>tt(e),title:"Download PDF",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,a.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,a.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,a.jsx)(R,{onClick:()=>it(e),title:"Print Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,a.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,a.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,a.jsx)(R,{variant:"email",onClick:()=>rt(e),title:"Resend Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,a.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(R,{onClick:()=>jt(e),children:"Edit"}),(0,a.jsx)(R,{onClick:()=>tt(e),title:"Download PDF",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,a.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,a.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,a.jsx)(R,{onClick:()=>it(e),title:"Print Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,a.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,a.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,a.jsx)(R,{variant:"email",onClick:()=>rt(e),title:"Resend Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,a.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,a.jsx)(U,{onClick:()=>ft(e),title:"Delete Invoice",children:(0,a.jsx)(H,{children:"\xd7"})})]}),"paid"===e.status&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(R,{onClick:()=>tt(e),title:"Download PDF",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,a.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,a.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,a.jsx)(R,{onClick:()=>it(e),title:"Print Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,a.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,a.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,a.jsx)(R,{onClick:()=>tt(e),title:"Download Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,a.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,a.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})})]},e.id))})]}),0===ct.length&&(0,a.jsxs)(E.ys,{children:[(0,a.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,a.jsx)("div",{style:{fontSize:"14px"},children:0===r.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"payment_submitted"===We&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,a.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"Payment Confirmation Required"}),(0,a.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:0},children:"These invoices have payment submitted and are waiting for your confirmation."})]}),(0,a.jsxs)(E.an,{children:[(0,a.jsxs)(E.bQ,{children:[(0,a.jsx)(E.B_,{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)(E.gU,{align:"center",children:"Invoice"}),(0,a.jsx)(E.gU,{align:"center",children:"Customer"}),(0,a.jsx)(E.gU,{align:"center",children:"Payment Method"}),(0,a.jsx)(E.gU,{align:"center",children:"Submitted Date"}),(0,a.jsx)(E.gU,{align:"right",children:"Amount"}),(0,a.jsx)(E.gU,{isActions:!0,children:"Actions"})]})}),(0,a.jsx)("tbody",{children:r.filter(e=>"payment_submitted"===e.status).map(e=>(0,a.jsxs)(E.J2,{children:[(0,a.jsx)(E.Bv,{"data-label":"Invoice",children:(0,a.jsxs)(_,{children:[(0,a.jsx)(P,{children:e.invoiceNumber}),(0,a.jsx)(M,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,a.jsx)(E.Bv,{"data-label":"Customer",children:(0,a.jsxs)(_,{children:[(0,a.jsx)(P,{children:e.customerName||e.restaurantName||"Unknown"}),(0,a.jsx)(M,{children:e.companyName})]})}),(0,a.jsx)(E.Bv,{"data-label":"Payment Method",align:"center",children:e.paymentMethod||"-"}),(0,a.jsx)(E.Bv,{"data-label":"Submitted",align:"center",children:e.paidDate?yt(e.paidDate):"-"}),(0,a.jsx)(E.Bv,{"data-label":"Amount",align:"right",children:(0,a.jsx)(E.DM,{highlight:!0,children:0===e.total?(0,a.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,k.vv)(e.total,e.currency||"USD")})}),(0,a.jsx)(E.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,a.jsxs)(E.wr,{children:[(0,a.jsx)(R,{onClick:()=>vt(e),children:"View"}),(0,a.jsx)(R,{variant:"primary",onClick:()=>{nn(e),be(!0)},children:"Confirm Payment"})]})})]},e.id))})]}),0===r.filter(e=>"payment_submitted"===e.status).length&&(0,a.jsxs)(E.ys,{children:[(0,a.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",marginBottom:"8px"},children:"No Pending Confirmations"}),(0,a.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"There are no invoices waiting for payment confirmation."})]})]})]}),"categories"===We&&(0,a.jsxs)("div",{style:{padding:"24px 0"},children:[(0,a.jsxs)(X,{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(ee,{children:"Invoice Categories"}),(0,a.jsx)("p",{style:{color:"#6B7280",fontSize:"14px",margin:"8px 0 0 0"},children:"Manage invoice categories for organizing different types of charges."})]}),(0,a.jsx)(z,{variant:"primary",onClick:()=>Yn(),children:"Add Category"})]}),0===Nn.length?(0,a.jsxs)(w.pp,{children:[(0,a.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"No categories yet"}),(0,a.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:"0 0 16px 0"},children:"Create your first invoice category to get started."}),(0,a.jsx)(z,{variant:"primary",onClick:()=>Yn(),children:"Add Category"})]}):(0,a.jsx)(O,{children:Nn.map(e=>(0,a.jsxs)(Y,{isActive:e.is_active,children:[(0,a.jsx)(V,{children:e.name.charAt(0).toUpperCase()}),(0,a.jsxs)(q,{children:[(0,a.jsxs)(G,{children:[e.name,(0,a.jsx)(K,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,a.jsxs)(J,{children:[(0,a.jsxs)("span",{children:["Code: ",(0,a.jsx)("strong",{children:e.code})]}),e.description&&(0,a.jsx)("span",{children:e.description})]})]}),(0,a.jsxs)(Q,{children:[(0,a.jsx)(Z,{onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/categories/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({is_active:!e.is_active})});(await t.json()).success&&On()}catch(n){console.error("Failed to toggle category:",n)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.is_active?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,a.jsx)("circle",{cx:"12",cy:"12",r:"3"})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),(0,a.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})})}),(0,a.jsx)(Z,{onClick:()=>Yn(e),title:"Edit Category",children:(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,a.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,a.jsx)(Z,{onClick:()=>(e=>{Xe(e),Ke(!0)})(e),title:"Delete Category",children:(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("polyline",{points:"3,6 5,6 21,6"}),(0,a.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]})})]})]},e.id))})]}),Ue&&(0,a.jsx)(oe,{onClick:Vn,children:(0,a.jsxs)(se,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,a.jsxs)(le,{children:[(0,a.jsx)(de,{children:Oe?"Edit Category":"Add Category"}),(0,a.jsx)(ce,{onClick:Vn,children:"\xd7"})]}),(0,a.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Ve.name.trim()&&Ve.code.trim())try{Je(!0);const e=localStorage.getItem("auth_token"),n=Oe?`/api/invoices/categories/${Oe.id}`:"/api/invoices/categories",t=Oe?"PUT":"POST",i=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:Ve.name.trim(),code:Ve.code.trim().toLowerCase().replace(/\s+/g,"_"),description:Ve.description.trim()||null})}),r=await i.json();r.success?(Vn(),On()):alert(r.error||"Failed to save category")}catch(n){console.error("Failed to save category:",n),alert("Failed to save category")}finally{Je(!1)}},children:[(0,a.jsxs)(pe,{children:[(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Name *"}),(0,a.jsx)(me,{value:Ve.name,onChange:e=>qe({...Ve,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Code *"}),(0,a.jsx)(me,{value:Ve.code,onChange:e=>qe({...Ve,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===Oe||void 0===Oe?void 0:Oe.is_system}),(0,a.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Description"}),(0,a.jsx)(ye,{value:Ve.description,onChange:e=>qe({...Ve,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,a.jsxs)(xe,{children:[(0,a.jsx)(z,{variant:"secondary",type:"button",onClick:Vn,children:"Cancel"}),(0,a.jsx)(z,{variant:"primary",type:"submit",disabled:Ge||!Ve.name||!Ve.code,children:Ge?"Saving...":Oe?"Update":"Create"})]})]})]})}),(0,a.jsx)(A.A,{isOpen:Qe,onCancel:()=>Ke(!1),onConfirm:async()=>{if(Ze)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${Ze.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(Ke(!1),Xe(null),On()):alert(t.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===Ze||void 0===Ze?void 0:Ze.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),y&&(0,a.jsx)(oe,{onClick:e=>{e.target===e.currentTarget&&(v(!1),at())},children:(0,a.jsxs)(se,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(le,{children:[(0,a.jsx)(de,{children:"Create Invoice"}),(0,a.jsx)(ce,{onClick:()=>{v(!1),at()},children:"\xd7"})]}),(0,a.jsxs)(pe,{children:[(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Search Manager or Restaurant *"}),(0,a.jsxs)("div",{style:{position:"relative"},children:[(0,a.jsx)(me,{type:"text",value:bn,onChange:e=>(e=>{if(Fn(e),Cn(!0),e.length<2)return void fn({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",gn),console.log("Available restaurants:",yn);const n=gn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=yn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",n),console.log("Filtered restaurants:",t),fn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>Cn(!0),onBlur:()=>setTimeout(()=>Cn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),wn&&(jn.managers.length>0||jn.restaurants.length>0)&&(0,a.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[jn.managers.length>0&&(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),jn.managers.map(e=>(0,a.jsxs)("div",{onClick:()=>Xn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,a.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,a.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),jn.restaurants.length>0&&(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),jn.restaurants.map(e=>{const n=gn.find(n=>n.id===e.admin_id);return(0,a.jsxs)("div",{onClick:()=>Xn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,a.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,a.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),kn&&(0,a.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===kn.type?kn.data.fullName:kn.data.name}),(0,a.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===kn.type?`${kn.data.companyName} \u2022 Manager`:`${kn.data.address||"No address"} \u2022 Restaurant`})]}),(0,a.jsx)("button",{onClick:()=>{Sn(null),Fn("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,a.jsxs)(ue,{children:[(0,a.jsxs)(he,{children:[(0,a.jsxs)(ge,{children:["Amount",Wn.currency?` (${Wn.currency})`:""," *"]}),(0,a.jsx)(me,{type:"number",step:Wn.currency&&0===(0,k.e_)(Wn.currency)?"1":"0.01",min:"0",value:Wn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=parseFloat(Wn.discountValue)||0,i="percentage"===Wn.discountType?n*(t/100):"fixed"===Wn.discountType?t:0,r=Math.max(0,n-i),a=Gn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+r*n.rate/100,0),o=r+a;Rn({...Wn,amount:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},onBlur:e=>{if(e.target.value&&Wn.currency){const n=(0,k.e_)(Wn.currency),t=parseFloat(e.target.value)||0,i=t.toFixed(n),r=parseFloat(Wn.discountValue)||0,a="percentage"===Wn.discountType?t*(r/100):"fixed"===Wn.discountType?r:0,o=Math.max(0,t-a),s=Gn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+o*n.rate/100,0),l=o+s;Rn({...Wn,amount:i,tax:s.toFixed(n),total:l.toFixed(n)})}},placeholder:Wn.currency&&0===(0,k.e_)(Wn.currency)?"0":"0.00",required:!0,disabled:!kn}),!kn&&(0,a.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px",display:"block"},children:"Select a manager or restaurant first"})]}),(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Due Date *"}),(0,a.jsx)(me,{type:"date",value:Wn.dueDate,onChange:e=>Rn({...Wn,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,a.jsxs)(ue,{children:[(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Discount"}),(0,a.jsxs)(ve,{value:Wn.discountType,onChange:e=>{const n=e.target.value,t=parseFloat(Wn.amount)||0,i="none"===n?0:parseFloat(Wn.discountValue)||0,r="percentage"===n?t*(i/100):"fixed"===n?i:0,a=Math.max(0,t-r),o=Gn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+a*n.rate/100,0),s=a+o;Rn({...Wn,discountType:n,discountValue:"none"===n?"":Wn.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,a.jsx)("option",{value:"none",children:"No Discount"}),(0,a.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,a.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==Wn.discountType&&(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"percentage"===Wn.discountType?"Discount (%)":"Discount Amount"}),(0,a.jsx)(me,{type:"number",step:"0.01",min:"0",max:"percentage"===Wn.discountType?"100":void 0,value:Wn.discountValue,onChange:e=>{const n=parseFloat(Wn.amount)||0,t=parseFloat(e.target.value)||0,i="percentage"===Wn.discountType?n*(t/100):t,r=Math.max(0,n-i),a=Gn.filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+r*n.rate/100,0),o=r+a;Rn({...Wn,discountValue:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==Wn.discountType&&(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Discount Reason"}),(0,a.jsx)(me,{type:"text",value:Wn.discountReason,onChange:e=>Rn({...Wn,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Invoice Category"}),(0,a.jsx)(ve,{value:Wn.invoiceCategory||"service",onChange:e=>Rn({...Wn,invoiceCategory:e.target.value}),children:Nn.length>0?Nn.filter(e=>"subscription"!==e.code).map(e=>(0,a.jsx)("option",{value:e.code,children:e.name},e.id)):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("option",{value:"service",children:"Service"}),(0,a.jsx)("option",{value:"consulting",children:"Consulting"}),(0,a.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Wn.invoiceCategory||"service")&&(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Item/Description"}),(0,a.jsx)(ye,{value:"others"===Wn.invoiceCategory?Wn.customDescription||"":Wn.serviceDescription||"",onChange:e=>{"others"===Wn.invoiceCategory?Rn({...Wn,customDescription:e.target.value}):Rn({...Wn,serviceDescription:e.target.value})},placeholder:`Enter ${Wn.invoiceCategory||"service"} description...`,rows:2})]}),(0,a.jsxs)(je,{children:[(0,a.jsxs)(fe,{children:[(0,a.jsx)("span",{children:"Subtotal:"}),(0,a.jsx)("span",{children:Wn.currency?(0,k.vv)(parseFloat(Wn.amount||"0"),Wn.currency):"-"})]}),"none"!==Wn.discountType&&parseFloat(Wn.discountValue||"0")>0&&(()=>{const e=parseFloat(Wn.amount||"0"),n=parseFloat(Wn.discountValue||"0"),t="percentage"===Wn.discountType?e*(n/100):n;return(0,a.jsxs)(fe,{children:[(0,a.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Wn.discountType?` (${n}%)`:"",":"]}),(0,a.jsxs)("span",{style:{color:"#15803D"},children:["-",Wn.currency?(0,k.vv)(t,Wn.currency):"-"]})]})})(),Gn.filter(e=>e.enabled&&e.name&&e.rate>0).map((e,n)=>{const t=parseFloat(Wn.amount||"0"),i=parseFloat(Wn.discountValue||"0"),r="percentage"===Wn.discountType?t*(i/100):"fixed"===Wn.discountType?i:0,o=Math.max(0,t-r)*(e.rate/100);return(0,a.jsxs)(fe,{children:[(0,a.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,a.jsx)("span",{children:Wn.currency?(0,k.vv)(o,Wn.currency):"-"})]},n)}),(0,a.jsxs)(fe,{highlight:!0,children:[(0,a.jsx)("span",{children:"Total:"}),(0,a.jsx)("span",{children:(0,a.jsx)("strong",{children:Wn.currency?(0,k.vv)(parseFloat(Wn.total||"0"),Wn.currency):"-"})})]})]})]}),(0,a.jsxs)(xe,{children:[(0,a.jsx)(z,{variant:"secondary",onClick:()=>{v(!1),at()},children:"Cancel"}),(0,a.jsx)(z,{variant:"primary",onClick:async()=>{if(kn&&Wn.amount&&Wn.dueDate)try{const e=parseFloat(Wn.amount),n=parseFloat(Wn.discountValue)||0,t="percentage"===Wn.discountType?e*(n/100):"fixed"===Wn.discountType?n:0,i=Math.max(0,e-t),r=Gn.filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(i*e.rate/100*100)/100})),a=r.reduce((e,n)=>e+n.amount,0),o=i+a;let s="";s="others"===Wn.invoiceCategory?Wn.customDescription||"":Wn.serviceDescription||"";let l="",d="",c="";if("restaurant"===kn.type){const e=kn.data;l=e.name,c=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),d=n.join("\n")}else if("manager"===kn.type){const e=kn.data;l=e.fullName,c=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),d=n.join("\n")}let p="restaurant";if("manager"===kn.type){const e=kn.data;"Brand General"===e.role||"Brand Manager"===e.role?p="brand_manager":"Foodcourt General"!==e.role&&"Foodcourt Manager"!==e.role||(p="foodcourt_manager")}const x={restaurant_id:"restaurant"===kn.type?kn.data.id:null,payer_type:p,payer_id:"manager"===kn.type?kn.data.id:null,type:"manual",billing_period_start:null,billing_period_end:null,due_date:new Date(Wn.dueDate).toISOString(),total_amount:o,subtotal_before_discount:t>0?e:null,discount_type:"none"!==Wn.discountType?Wn.discountType:null,discount_value:t>0?n:null,discount_amount:t>0?t:null,discount_reason:Wn.discountReason||null,currency:Wn.currency||"USD",status:"draft",notes:`${c}\n${l}\n${d}\n\n${s}`,issued_by:1,issued_at:(new Date).toISOString(),issuer_type:"system_admin",invoice_category:Wn.invoiceCategory||"service",additional_charges:r},u=[{item_type:Wn.invoiceCategory,description:s,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:0,tax_amount:0,total_amount:e}],h=localStorage.getItem("auth_token"),g=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({invoice_data:x,items:u})});if(g.ok)await Hn(),v(!1),at();else{const e=await g.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!kn||!Wn.amount||!Wn.dueDate,children:"Create Invoice"})]})]})}),j&&en&&(0,a.jsx)(oe,{onClick:()=>f(!1),children:(0,a.jsxs)(se,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,a.jsxs)(le,{children:[(0,a.jsx)(de,{children:"Invoice Details"}),(0,a.jsx)(ce,{onClick:()=>f(!1),children:"\xd7"})]}),(0,a.jsxs)(pe,{children:[(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,a.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===Bn||void 0===Bn?void 0:Bn.companyLogo)&&(0,a.jsx)("img",{src:Bn.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,a.jsx)("div",{style:{fontSize:null!==Bn&&void 0!==Bn&&Bn.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===Bn||void 0===Bn?void 0:Bn.companyName)||"Company Name"}),(0,a.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===Bn||void 0===Bn?void 0:Bn.address)&&(0,a.jsx)("div",{children:Bn.address}),((null===Bn||void 0===Bn?void 0:Bn.city)||(null===Bn||void 0===Bn?void 0:Bn.state)||(null===Bn||void 0===Bn?void 0:Bn.postalCode))&&(0,a.jsx)("div",{children:[null===Bn||void 0===Bn?void 0:Bn.city,null===Bn||void 0===Bn?void 0:Bn.state,null===Bn||void 0===Bn?void 0:Bn.postalCode].filter(Boolean).join(", ")}),(null===Bn||void 0===Bn?void 0:Bn.country)&&(0,a.jsx)("div",{children:Bn.country}),(null===Bn||void 0===Bn?void 0:Bn.phone)&&(0,a.jsxs)("div",{children:["Tel: ",Bn.phone]}),(null===Bn||void 0===Bn?void 0:Bn.email)&&(0,a.jsxs)("div",{children:["Email: ",Bn.email]})]})]}),(0,a.jsxs)("div",{style:{textAlign:"right"},children:[(0,a.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,a.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:en.invoiceNumber}),(0,a.jsx)(W,{status:en.status,style:{marginTop:"8px"},children:lt(en.status)}),en.isModified&&(0,a.jsx)("span",{style:{display:"inline-block",marginTop:"4px",padding:"2px 8px",fontSize:"11px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px"},children:"Modified"})]})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,a.jsxs)("div",{style:{flex:1},children:[(0,a.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,a.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:en.customerName}),en.customerAddress&&(0,a.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:en.customerAddress}),"restaurant"===en.payerType&&en.restaurantName&&"Unknown Restaurant"!==en.restaurantName&&(0,a.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",en.restaurantName]}),en.companyName&&en.companyName!==en.customerName&&(0,a.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Company: ",en.companyName]})]}),(0,a.jsxs)("div",{style:{textAlign:"right"},children:[(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,a.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:en.billingPeriod||"-"})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,a.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:yt(en.issueDate)})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,a.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:yt(en.dueDate)})]}),en.paidDate&&(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,a.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:yt(en.paidDate)})]})]})]}),(0,a.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,a.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,a.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,a.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,a.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,a.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,a.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,a.jsx)("tbody",{children:en.items.map((e,n)=>(0,a.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,a.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,a.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,a.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,k.vv)(e.unitPrice,en.currency||"MYR")}),(0,a.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,k.vv)(e.total,en.currency||"MYR")})]},n))})]})]}),(0,a.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,a.jsx)("div",{style:{width:"280px"},children:(0,a.jsxs)(je,{children:[(0,a.jsxs)(fe,{children:[(0,a.jsx)("span",{children:"Subtotal:"}),(0,a.jsx)("span",{children:(0,k.vv)(en.subtotalBeforeDiscount||en.amount,en.currency||"MYR")})]}),en.discountType&&"none"!==en.discountType&&en.discountAmount>0&&(0,a.jsxs)(fe,{children:[(0,a.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===en.discountType?` (${en.discountValue}%)`:"",":"]}),(0,a.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,k.vv)(en.discountAmount,en.currency||"MYR")]})]}),(en.additionalCharges||[]).map((e,n)=>(0,a.jsxs)(fe,{children:[(0,a.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,a.jsx)("span",{children:(0,k.vv)(e.amount,en.currency||"MYR")})]},n)),(0,a.jsxs)(fe,{highlight:!0,children:[(0,a.jsx)("span",{children:"Total:"}),(0,a.jsx)("span",{children:(0,a.jsx)("strong",{children:(0,k.vv)(en.total,en.currency||"MYR")})})]})]})})}),(null===Bn||void 0===Bn?void 0:Bn.bankName)&&(0,a.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,a.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,a.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"Bank:"})," ",Bn.bankName]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"Account Name:"})," ",Bn.bankAccountName]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"Account Number:"})," ",Bn.bankAccount]})]})]}),((null===Bn||void 0===Bn?void 0:Bn.taxNumber)||(null===Bn||void 0===Bn?void 0:Bn.registrationNumber))&&(0,a.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===Bn||void 0===Bn?void 0:Bn.registrationNumber)&&(0,a.jsxs)("span",{children:["Reg No: ",Bn.registrationNumber]}),(null===Bn||void 0===Bn?void 0:Bn.registrationNumber)&&(null===Bn||void 0===Bn?void 0:Bn.taxNumber)&&(0,a.jsx)("span",{children:" | "}),(null===Bn||void 0===Bn?void 0:Bn.taxNumber)&&(0,a.jsxs)("span",{children:["Tax No: ",Bn.taxNumber]})]}),en.isModified&&en.modificationHistory&&en.modificationHistory.length>0&&(0,a.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,a.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#92400E",marginBottom:"12px"},children:"Modification History"}),en.modificationHistory.map((e,n)=>(0,a.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:n<en.modificationHistory.length-1?"10px":"0",paddingBottom:n<en.modificationHistory.length-1?"10px":"0",borderBottom:n<en.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,a.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,a.jsxs)("div",{style:{marginTop:"3px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,a.jsx)("div",{style:{marginTop:"3px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[n,t]=e;return(0,a.jsxs)("div",{children:[n,": ",String(t.from)," \u2192 ",String(t.to)]},n)})})]},n))]})]})]})}),$&&en&&(0,a.jsx)(oe,{onClick:()=>be(!1),children:(0,a.jsxs)(se,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,a.jsxs)(le,{children:[(0,a.jsxs)(de,{children:["Confirm Payment - ",en.invoiceNumber]}),(0,a.jsx)(ce,{onClick:()=>be(!1),children:"\xd7"})]}),(0,a.jsxs)(pe,{children:[(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Invoice Summary"}),(0,a.jsxs)(je,{children:[(0,a.jsxs)(fe,{children:[(0,a.jsx)("span",{children:"Customer:"}),(0,a.jsx)("span",{children:en.customerName||en.managerName})]}),(0,a.jsxs)(fe,{children:[(0,a.jsx)("span",{children:"Company:"}),(0,a.jsx)("span",{children:en.companyName})]}),(0,a.jsxs)(fe,{children:[(0,a.jsx)("span",{children:"Invoice Number:"}),(0,a.jsx)("span",{children:en.invoiceNumber})]}),(0,a.jsxs)(fe,{children:[(0,a.jsx)("span",{children:"Due Date:"}),(0,a.jsx)("span",{children:yt(en.dueDate)})]}),(0,a.jsxs)(fe,{highlight:!0,children:[(0,a.jsx)("span",{children:(0,a.jsx)("strong",{children:"Payment Amount:"})}),(0,a.jsx)("span",{children:(0,a.jsx)("strong",{children:(0,k.vv)(en.total,en.currency||"USD")})})]})]})]}),en.hasPaymentInfo&&(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Customer's Payment Information"}),(0,a.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,a.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,a.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,a.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===en.paymentMethod?"Bank Transfer":"qr_payment"===en.paymentMethod?"QR Payment":"stripe"===en.paymentMethod?"Stripe":"paypal"===en.paymentMethod?"PayPal":en.paymentMethod||"Not specified"]}),en.transactionId&&(0,a.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,a.jsx)("strong",{children:"Transaction ID:"})," ",en.transactionId]})]}),en.receiptUrl&&(0,a.jsxs)("div",{style:{marginTop:"12px"},children:[(0,a.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,a.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,a.jsx)("img",{src:en.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(en.receiptUrl,"_blank")}),(0,a.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,a.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,a.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,a.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,a.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Status Change"}),(0,a.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,a.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,a.jsxs)(xe,{children:[(0,a.jsx)(z,{variant:"secondary",onClick:()=>be(!1),children:"Cancel"}),(0,a.jsx)(z,{variant:"primary",onClick:async()=>{if(en)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${en.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(n.ok)await Hn(),be(!1),nn(null);else{const e=await n.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),b&&en&&tn&&(0,a.jsx)(oe,{onClick:()=>B(!1),children:(0,a.jsxs)(se,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(le,{children:[(0,a.jsxs)(de,{children:["Edit Invoice - ",en.invoiceNumber]}),(0,a.jsx)(ce,{onClick:()=>B(!1),children:"\xd7"})]}),(0,a.jsxs)(pe,{children:[(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Search Manager or Restaurant *"}),(0,a.jsxs)("div",{style:{position:"relative"},children:[(0,a.jsx)(me,{type:"text",value:sn,onChange:e=>(e=>{if(ln(e),xn(!0),e.length<2)return void cn({managers:[],restaurants:[]});const n=gn.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=yn.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));cn({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>xn(!0),onBlur:()=>setTimeout(()=>xn(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),pn&&(dn.managers.length>0||dn.restaurants.length>0)&&(0,a.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[dn.managers.length>0&&(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),dn.managers.map(e=>(0,a.jsxs)("div",{onClick:()=>Zn("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,a.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,a.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),dn.restaurants.length>0&&(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),dn.restaurants.map(e=>{const n=gn.find(n=>n.id===e.admin_id);return(0,a.jsxs)("div",{onClick:()=>Zn("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,a.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,a.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),un&&(0,a.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===un.type?un.data.fullName:un.data.name}),(0,a.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===un.type?`${un.data.companyName} \u2022 Manager`:`${un.data.address||"No address"} \u2022 Restaurant`})]}),(0,a.jsx)("button",{onClick:()=>{hn(null),ln("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,a.jsxs)(ue,{children:[(0,a.jsxs)(he,{children:[(0,a.jsxs)(ge,{children:["Amount (",e.currency||"RM",")"]}),(0,a.jsx)(me,{type:"number",value:tn.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=qn(tn.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+n*t.rate/100,0),i=n+t;rn({...tn,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})}})]}),(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Due Date"}),(0,a.jsx)(me,{type:"date",value:tn.dueDate,onChange:e=>rn({...tn,dueDate:e.target.value})})]})]}),(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Status"}),(0,a.jsxs)(ve,{value:tn.status,onChange:e=>rn({...tn,status:e.target.value}),children:[(0,a.jsx)("option",{value:"draft",children:"Draft"}),(0,a.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,a.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,a.jsx)("option",{value:"paid",children:"Paid"}),(0,a.jsx)("option",{value:"overdue",children:"Overdue"}),(0,a.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Invoice Category"}),(0,a.jsx)(ve,{value:tn.invoiceCategory||"service",onChange:e=>rn({...tn,invoiceCategory:e.target.value}),children:Nn.length>0?Nn.filter(e=>"subscription"!==e.code).map(e=>(0,a.jsx)("option",{value:e.code,children:e.name},e.id)):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("option",{value:"service",children:"Service"}),(0,a.jsx)("option",{value:"consulting",children:"Consulting"}),(0,a.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(tn.invoiceCategory||"service")&&(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Item/Description"}),(0,a.jsx)(ye,{value:"others"===tn.invoiceCategory?tn.customDescription||"":tn.serviceDescription||"",onChange:e=>{"others"===tn.invoiceCategory?rn({...tn,customDescription:e.target.value}):rn({...tn,serviceDescription:e.target.value})},placeholder:`Enter ${tn.invoiceCategory||"service"} description...`,rows:2})]}),(0,a.jsxs)(je,{children:[(0,a.jsxs)(fe,{children:[(0,a.jsx)("span",{children:"Subtotal:"}),(0,a.jsx)("span",{children:tn.currency?(0,k.vv)(parseFloat(tn.amount||"0"),tn.currency):"-"})]}),qn(tn.currency||"").filter(e=>e.enabled&&e.name&&e.rate>0).map((e,n)=>{const t=parseFloat(tn.amount||"0")*e.rate/100;return(0,a.jsxs)(fe,{children:[(0,a.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,a.jsx)("span",{children:tn.currency?(0,k.vv)(t,tn.currency):"-"})]},n)}),(0,a.jsxs)(fe,{highlight:!0,children:[(0,a.jsx)("span",{children:"Total:"}),(0,a.jsx)("span",{children:(0,a.jsx)("strong",{children:tn.currency?(0,k.vv)(parseFloat(tn.total||"0"),tn.currency):"-"})})]})]}),(0,a.jsxs)(he,{style:{marginTop:"16px"},children:[(0,a.jsxs)(ge,{children:["Modification Reason ","automatic"===(null===en||void 0===en?void 0:en.type)&&(0,a.jsx)("span",{style:{color:"#EF4444"},children:"*"})]}),(0,a.jsx)(ye,{value:an,onChange:e=>on(e.target.value),placeholder:"Enter reason for modification...",rows:2})]}),(null===en||void 0===en?void 0:en.modificationHistory)&&en.modificationHistory.length>0&&(0,a.jsxs)("div",{style:{marginTop:"16px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,a.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#92400E",marginBottom:"8px"},children:"Modification History"}),en.modificationHistory.map((e,n)=>(0,a.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:n<en.modificationHistory.length-1?"8px":"0",paddingBottom:n<en.modificationHistory.length-1?"8px":"0",borderBottom:n<en.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,a.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,a.jsxs)("div",{style:{marginTop:"2px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,a.jsx)("div",{style:{marginTop:"2px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[n,t]=e;return(0,a.jsxs)("span",{style:{marginRight:"8px"},children:[n,": ",String(t.from)," \u2192 ",String(t.to)]},n)})})]},n))]})]}),(0,a.jsxs)(xe,{children:[(0,a.jsx)(z,{variant:"secondary",onClick:()=>B(!1),children:"Cancel"}),(0,a.jsx)(z,{variant:"primary",onClick:async()=>{if(en&&tn){if("automatic"===en.type&&!an.trim())return Le("Please enter a reason for modifying this invoice."),void Pe(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${en.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(tn.amount),tax:parseFloat(tn.tax),total:parseFloat(tn.total),dueDate:tn.dueDate,status:tn.status,payerType:tn.payerType,payerId:tn.payerId,items:tn.items,modificationReason:an.trim()||void 0})});if(n.ok){const e={...en,amount:parseFloat(tn.amount),tax:parseFloat(tn.tax),total:parseFloat(tn.total),dueDate:tn.dueDate,status:tn.status,payerType:tn.payerType,payerId:tn.payerId,items:tn.items};o(r.map(n=>n.id===en.id?e:n)),B(!1),nn(null),rn(null),Le("Invoice updated successfully!"),Pe(!0)}else{const e=await n.json();Le(`Failed to update invoice: ${e.error||"Unknown error"}`),Pe(!0)}}catch(e){console.error("Error updating invoice:",e),Le("Error updating invoice. Please try again."),Pe(!0)}}},children:"Save Changes"})]})]})}),Fe&&en&&(0,a.jsx)(oe,{onClick:()=>we(!1),children:(0,a.jsxs)(se,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(le,{children:[(0,a.jsx)(de,{children:"Send Invoice"}),(0,a.jsx)(ce,{onClick:()=>we(!1),children:"\xd7"})]}),(0,a.jsx)(pe,{children:(0,a.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,a.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice"}),(0,a.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,a.jsx)("strong",{children:en.invoiceNumber})," to ",(0,a.jsx)("strong",{children:en.managerName||en.customerName}),"?"]}),(0,a.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,a.jsx)("span",{style:{fontWeight:"500"},children:en.invoiceNumber})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Recipient:"}),(0,a.jsx)("span",{style:{fontWeight:"500"},children:en.managerName||en.customerName})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,a.jsx)("span",{style:{fontWeight:"500"},children:en.customerName})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,a.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,k.vv)(en.total,en.currency||"USD")})]})]})]})}),(0,a.jsxs)(xe,{children:[(0,a.jsx)(z,{variant:"secondary",onClick:()=>we(!1),children:"Cancel"}),(0,a.jsx)(z,{variant:"success",onClick:async()=>{if(en)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${en.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(n.ok)await Hn(),we(!1),nn(null);else{const e=await n.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Confirm"})]})]})}),Ce&&en&&(0,a.jsx)(oe,{onClick:()=>ke(!1),children:(0,a.jsxs)(se,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(le,{children:[(0,a.jsx)(de,{children:"Resend Invoice"}),(0,a.jsx)(ce,{onClick:()=>ke(!1),children:"\xd7"})]}),(0,a.jsx)(pe,{children:(0,a.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,a.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,a.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,a.jsx)("strong",{children:en.invoiceNumber})," to ",(0,a.jsx)("strong",{children:en.managerName}),"?"]}),(0,a.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,a.jsxs)(xe,{children:[(0,a.jsx)(z,{variant:"secondary",onClick:()=>ke(!1),children:"Cancel"}),(0,a.jsx)(z,{variant:"primary",onClick:()=>{en&&(ke(!1),nn(null))},children:"Resend Invoice"})]})]})}),Se&&en&&(0,a.jsx)(oe,{onClick:()=>Be(!1),children:(0,a.jsxs)(se,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(le,{children:[(0,a.jsx)(de,{children:"Cancel Invoice"}),(0,a.jsx)(ce,{onClick:()=>Be(!1),children:"\xd7"})]}),(0,a.jsx)(pe,{children:(0,a.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,a.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,a.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,a.jsx)("strong",{children:en.invoiceNumber}),"?"]}),(0,a.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,a.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,a.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,a.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,a.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,a.jsx)("span",{style:{fontWeight:"500"},children:en.invoiceNumber})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,a.jsx)("span",{style:{fontWeight:"500"},children:en.managerName})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,a.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,k.vv)(en.total,en.currency||"USD")})]})]})]})}),(0,a.jsxs)(xe,{children:[(0,a.jsx)(z,{variant:"secondary",onClick:()=>Be(!1),children:"Keep Invoice"}),(0,a.jsx)(z,{variant:"primary",onClick:async()=>{if(en)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${en.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(n.ok)await Hn(),Be(!1),nn(null);else{const e=await n.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),Ae&&en&&(0,a.jsx)(oe,{onClick:()=>Ee(!1),children:(0,a.jsxs)(se,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(le,{children:[(0,a.jsx)(de,{children:"Delete Invoice"}),(0,a.jsx)(ce,{onClick:()=>Ee(!1),children:"\xd7"})]}),(0,a.jsx)(pe,{children:(0,a.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,a.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,a.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,a.jsxs)("strong",{children:["#",en.invoiceNumber]}),"?",(0,a.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,a.jsxs)(xe,{children:[(0,a.jsx)(z,{variant:"secondary",onClick:()=>Ee(!1),children:"Keep Invoice"}),(0,a.jsx)(z,{variant:"primary",onClick:async()=>{if(en)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${en.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(n.ok)await Hn(),Ee(!1),nn(null);else{const e=await n.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),De&&Ie&&(0,a.jsx)(oe,{onClick:()=>Ne(!1),children:(0,a.jsxs)(se,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(le,{children:[(0,a.jsx)(de,{children:"Send Invoice via Email"}),(0,a.jsx)(ce,{onClick:()=>Ne(!1),children:"\xd7"})]}),(0,a.jsxs)(pe,{children:[(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Invoice"}),(0,a.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,a.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:Ie.invoiceNumber}),(0,a.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:Ie.customerName}),(0,a.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,k.vv)(Ie.total,Ie.currency||"MYR")})]})]}),(0,a.jsxs)(he,{children:[(0,a.jsx)(ge,{children:"Recipient Email *"}),(0,a.jsx)(me,{type:"email",value:Te,onChange:e=>$e(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,a.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:Te?(0,a.jsxs)(a.Fragment,{children:["Default email for ","restaurant"===Ie.payerType?"Restaurant":"foodcourt_manager"===Ie.payerType?"Foodcourt Manager":"brand_manager"===Ie.payerType?"Brand Manager":"Customer"]}):(0,a.jsxs)(a.Fragment,{children:["Enter the ","restaurant"===Ie.payerType?"restaurant":"foodcourt_manager"===Ie.payerType?"foodcourt manager":"brand_manager"===Ie.payerType?"brand manager":"customer"," email address"]})})]}),(0,a.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,a.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,a.jsxs)(xe,{children:[(0,a.jsx)(z,{variant:"secondary",onClick:()=>{Ne(!1),ze(null),$e("")},children:"Cancel"}),(0,a.jsx)(z,{variant:"primary",onClick:async()=>{if(!Ie||!Te)return Le("Please enter a valid email address."),void Pe(!0);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${Ie.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:Te})});if(n.ok)Le(`Invoice sent successfully to ${Te}`),Ne(!1),ze(null),$e("");else{const e=await n.json();Le(e.error||"Failed to send invoice email.")}Pe(!0)}catch(e){console.error("Error sending invoice email:",e),Le("Failed to send invoice email. Please try again."),Pe(!0)}},disabled:!Te||!Te.includes("@"),children:"Send Email"})]})]})}),_e&&(0,a.jsx)(oe,{onClick:()=>Pe(!1),children:(0,a.jsxs)(se,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(le,{children:[(0,a.jsx)(de,{children:"Success"}),(0,a.jsx)(ce,{onClick:()=>Pe(!1),children:"\xd7"})]}),(0,a.jsx)(pe,{children:(0,a.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,a.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:Me})})}),(0,a.jsx)(xe,{children:(0,a.jsx)(z,{variant:"primary",onClick:()=>Pe(!1),children:"OK"})})]})})]})]})})}}}]);