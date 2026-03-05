"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9309],{2488:(e,t,n)=>{n.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});n(9950);var i=n(4752),r=n(4414);const a=i.Ay.div`
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
`,c=e=>{let{children:t,className:n,style:i,...o}=e;return(0,r.jsx)(a,{className:n,style:i,...o,children:t})},p=e=>{let{placeholder:t="Search...",value:n,onChange:i,style:a,...d}=e;return(0,r.jsxs)(s,{style:a,children:[(0,r.jsx)(o,{placeholder:t,value:n,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:n?"36px":"16px"},...d}),n&&(0,r.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...n}=e;return(0,r.jsx)(d,{...n,children:t})}},2597:(e,t,n)=>{n.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});n(9950);var i=n(4752),r=n(4414);const a=i.Ay.div`
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
`,l=e=>{let{children:t,className:n,style:i}=e;return(0,r.jsx)(a,{className:n,style:i,children:t})},d=e=>{let{active:t,onClick:n,children:i,className:a}=e;return(0,r.jsx)(o,{active:t,onClick:n,className:a,children:i})},c=e=>{let{count:t,variant:n="default",showZero:i=!1}=e;return 0!==t||i?(0,r.jsx)(s,{variant:n,children:t}):null}},7617:(e,t,n)=>{n.d(t,{A:()=>x});n(9950);var i=n(4752),r=n(9610),a=n(4414);const o=i.Ay.div`
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
`,x=e=>{let{isOpen:t,title:n,message:i,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return t?(0,a.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,a.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(l,{children:n}),(0,a.jsx)(d,{children:i})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:h,children:g}),(0,a.jsx)(p,{variant:"primary",type:m,onClick:x,children:u})]})]})}):null}},9309:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Be});var i=n(9950),r=n(4752),a=n(4414);const o=["Su","Mo","Tu","We","Th","Fr","Sa"],s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)},d=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),c=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),p=r.Ay.div`
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
`,x=r.Ay.div`
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
`,k=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,C=r.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,S=r.Ay.div`
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
`,B=e=>{let{startDate:t,endDate:n,onRangeSelect:r,onClose:B,isOpen:A}=e;const E=new Date,[D,N]=(0,i.useState)(E.getMonth()),[T,$]=(0,i.useState)(E.getFullYear()),[z,I]=(0,i.useState)(null),[_,P]=(0,i.useState)(null),[M,L]=(0,i.useState)(null),[W,R]=(0,i.useState)("start"),U=(0,i.useRef)(null);(0,i.useEffect)(()=>{t&&I(l(t)),n&&P(l(n))},[t,n]),(0,i.useEffect)(()=>{A&&R("start")},[A]),(0,i.useEffect)(()=>{const e=e=>{U.current&&!U.current.contains(e.target)&&B()};return A&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[A,B]);const H=(0,i.useCallback)(()=>{0===D?(N(11),$(e=>e-1)):N(e=>e-1)},[D]),O=(0,i.useCallback)(()=>{11===D?(N(0),$(e=>e+1)):N(e=>e+1)},[D]),Y=(e,t)=>{const n=((e,t)=>new Date(e,t+1,0).getDate())(e,t),i=((e,t)=>new Date(e,t,1).getDay())(e,t),l=[];for(let r=0;r<i;r++)l.push(null);for(let r=1;r<=n;r++)l.push(new Date(e,t,r));return(0,a.jsxs)(f,{children:[(0,a.jsx)(b,{children:c(e,t)}),(0,a.jsx)(w,{children:o.map(e=>(0,a.jsx)(F,{children:e},e))}),(0,a.jsx)(k,{children:l.map((e,t)=>{if(!e)return(0,a.jsx)(C,{},`e-${t}`);const{isStart:n,isEnd:i,isInRange:o,isHoverEnd:l}=(e=>{const t=z&&d(e,z),n=_&&d(e,_),i="end"===W&&M?M:_;let r=!1;if(z&&i){const[t,n]=z<=i?[z,i]:[i,z];r=((e,t,n)=>{const i=e.getTime();return i>t.getTime()&&i<n.getTime()})(e,t,n)}return{isStart:t,isEnd:n,isInRange:r,isHoverEnd:"end"===W&&M&&d(e,M)}})(e),c=d(e,E);return(0,a.jsx)(S,{$isStart:!!n,$isEnd:!!i,$isInRange:o,$isHoverEnd:!!l,$isToday:c,onClick:()=>(e=>{if("start"===W)I(e),P(null),R("end");else{let t=z,n=e;n<t&&([t,n]=[n,t]),I(t),P(n),R("start"),r(s(t),s(n)),setTimeout(B,200)}})(e),onMouseEnter:()=>L(e),onMouseLeave:()=>L(null),children:e.getDate()},e.getTime())})})]})},V=11===D?0:D+1,q=11===D?T+1:T,G=e=>{const t=new Date;let n;const i=t;switch(e){case"this_week":n=new Date(t),n.setDate(t.getDate()-t.getDay());break;case"this_month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":n=new Date(t.getFullYear(),0,1);break;default:return}I(n),P(i),R("start"),r(s(n),s(i)),setTimeout(B,150)};return A?(0,a.jsx)(p,{ref:U,children:(0,a.jsxs)(x,{children:[(0,a.jsxs)(h,{children:[(0,a.jsx)(u,{onClick:()=>G("this_week"),children:"This Week"}),(0,a.jsx)(u,{onClick:()=>G("this_month"),children:"This Month"}),(0,a.jsx)(u,{onClick:()=>G("this_year"),children:"This Year"})]}),(0,a.jsxs)(g,{children:[(0,a.jsxs)(m,{children:[(0,a.jsx)(y,{onClick:H,"aria-label":"Previous month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,a.jsx)(y,{onClick:O,"aria-label":"Next month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,a.jsxs)(v,{children:[Y(T,D),(0,a.jsx)(j,{children:Y(q,V)})]})]})]})}):null};var A=n(2853),E=n(4492),D=n(6038),N=n(9018),T=n(4728),$=n(7617),z=n(8409),I=n(2488),_=n(2597),P=n(5612),M=n(1052),L=n.n(M);const W=(0,r.Ay)(T.SC)``,R=r.Ay.div``,U=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,H=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,O=r.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,Y=(0,r.Ay)(T.Wh)`
  white-space: normal;
  line-height: 1.3;
`,V=r.Ay.button`
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
`,q=r.Ay.button`
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
`,G=r.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,J=r.Ay.div`
  display: grid;
  gap: 12px;
`,Q=r.Ay.div`
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
`,K=r.Ay.div`
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
`,Z=r.Ay.div`
  flex: 1;
`,X=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`,ee=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,te=r.Ay.div`
  display: flex;
  gap: 8px;
`,ne=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ie=r.Ay.button`
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
`,re=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,ae=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,oe=r.Ay.div`
  margin-bottom: 24px;
`,se=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,le=r.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 12px;

  @media (max-width: 768px) {
    gap: 6px;
    margin-top: 10px;
  }
`,de=r.Ay.button`
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
`,ce=r.Ay.div`
  position: relative;
  display: inline-block;
`,pe=r.Ay.button`
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
`,xe=r.Ay.div`
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
`,he=r.Ay.div`
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
`,ue=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,ge=r.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,me=r.Ay.button`
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
`,ye=r.Ay.div`
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
`,ve=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  flex-shrink: 0;
`,je=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,fe=r.Ay.div`
  margin-bottom: 20px;
`,be=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,we=r.Ay.input`
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
`,Fe=r.Ay.textarea`
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
`,ke=r.Ay.select`
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
`,Ce=r.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,Se=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,Be=()=>{const{operationSettings:e}=(0,N.Pj)(),[t,n]=(0,E.ok)(),[r,o]=(0,i.useState)([]),[s,l]=(0,i.useState)(""),[d,c]=(0,i.useState)("month"),[p,x]=(0,i.useState)(!1),[h,u]=(0,i.useState)(!1),[g,m]=(0,i.useState)(()=>{const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1),n=new Date(e.getFullYear(),e.getMonth()+1,0),i=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:i(t),end:i(n)}}),[y,v]=(0,i.useState)(!1),[j,f]=(0,i.useState)(!1),[b,w]=(0,i.useState)(!1),[F,k]=(0,i.useState)(!1),[C,S]=(0,i.useState)(!1),[T,M]=(0,i.useState)(!1),[Be,Ae]=(0,i.useState)(!1),[Ee,De]=(0,i.useState)(!1),[Ne,Te]=(0,i.useState)(!1),[$e,ze]=(0,i.useState)(""),[Ie,_e]=(0,i.useState)(null),[Pe,Me]=(0,i.useState)(!1),[Le,We]=(0,i.useState)(""),Re=t.get("tab")||"invoices",Ue=e=>{n({tab:e})},[He,Oe]=(0,i.useState)(!1),[Ye,Ve]=(0,i.useState)(null),[qe,Ge]=(0,i.useState)({name:"",code:"",description:""}),[Je,Qe]=(0,i.useState)(!1),[Ke,Ze]=(0,i.useState)(!1),[Xe,et]=(0,i.useState)(null),[tt,nt]=(0,i.useState)(null),[it,rt]=(0,i.useState)(null),[at,ot]=(0,i.useState)(""),[st,lt]=(0,i.useState)(""),[dt,ct]=(0,i.useState)({managers:[],restaurants:[]}),[pt,xt]=(0,i.useState)(!1),[ht,ut]=(0,i.useState)(null),[gt,mt]=(0,i.useState)([]),[yt,vt]=(0,i.useState)([]),[jt,ft]=(0,i.useState)({managers:[],restaurants:[]}),[bt,wt]=(0,i.useState)(""),[Ft,kt]=(0,i.useState)(!1),[Ct,St]=(0,i.useState)(null),[Bt,At]=(0,i.useState)(null),[,Et]=(0,i.useState)({}),[,Dt]=(0,i.useState)([]),[Nt,Tt]=(0,i.useState)([]),[$t,zt]=(0,i.useState)({}),[,It]=(0,i.useState)({enabled:!1,rate:0,name:"Tax"}),[_t,Pt]=(0,i.useState)("issueDate"),[Mt,Lt]=(0,i.useState)("desc"),[Wt,Rt]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),Ut=e=>{c(e),x(!1),u(!1);const t=new Date;let n=new Date,i=new Date;const a=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"today":break;case"week":n.setDate(t.getDate()-6);break;case"month":n.setDate(t.getDate()-29);break;case"year":n.setDate(t.getDate()-364);break;case"all":if(r.length>0){const e=r.reduce((e,t)=>{const n=t.issueDate||t.dueDate;return n<e?n:e},r[0].issueDate||r[0].dueDate);n=new Date(e)}else n=new Date(t.getFullYear(),0,1)}m({start:a(n),end:a(i)})},Ht=async()=>{try{const e=localStorage.getItem("auth_token");if(console.log("\ud83d\udd10 [INVOICES] Token present:",!!e),console.log("\ud83d\udd10 [INVOICES] Token first 50 chars:",e?e.substring(0,50)+"...":"NULL"),!e)return console.error("\u274c [INVOICES] No auth token found in localStorage"),void o([]);const t=await fetch("/api/invoices",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(console.log("\ud83d\udce1 [INVOICES] API response status:",t.status),t.ok){const e=await t.json();console.log("\u2705 [INVOICES] Fetched invoices count:",e.length),console.log("\ud83d\udccb [INVOICES] First 3 invoices:",e.slice(0,3).map(e=>({id:e.id,invoiceNumber:e.invoiceNumber}))),o(e)}else{const e=await t.text();console.error("\u274c [INVOICES] Failed to fetch invoices:",t.status,e),o([])}}catch(e){console.error("\u274c [INVOICES] Error fetching invoices:",e),o([])}},Ot=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/invoices/categories/all",{headers:e?{Authorization:`Bearer ${e}`}:{}});if(t.ok){const e=await t.json();e.success&&e.data&&Tt(e.data)}}catch(e){console.error("Error fetching invoice categories:",e)}},[]),Yt=e=>{e?(Ve(e),Ge({name:e.name,code:e.code,description:e.description||""})):(Ve(null),Ge({name:"",code:"",description:""})),Oe(!0)},Vt=()=>{Oe(!1),Ve(null),Ge({name:"",code:"",description:""})};(0,i.useEffect)(()=>{Ht(),Qt(),Kt(),en(),Jt(),Ot(),(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/admin/payment-settings",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();if(e.additionalCharges){Array.isArray(e.additionalCharges)?zt({}):zt(e.additionalCharges);const t=(Array.isArray(e.additionalCharges)?e.additionalCharges:Object.values(e.additionalCharges).flat()).find(e=>null===e||void 0===e?void 0:e.enabled);t&&It({enabled:t.enabled,rate:parseFloat(t.rate)||0,name:t.name||"Tax"})}}}catch(e){console.error("Error fetching payment settings:",e)}})()},[]);const qt=e=>{const t=(0,D.Wh)(e);return $t[t]||$t[e]||[]},Gt=qt(Wt.currency),Jt=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const t=await e.json();t.success&&t.currencies&&Et(t.currencies)}const t=await fetch("/api/currencies/supported");if(t.ok){const e=await t.json();if(e.success&&e.data){const t=e.data.map(e=>e.code);Dt(t)}}}catch(e){console.error("Error fetching currency config:",e)}},Qt=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`,"Content-Type":"application/json"},[t,n]=await Promise.all([fetch("/api/users?role=Brand General",{headers:e}),fetch("/api/users?role=Foodcourt General",{headers:e})]);let i=[];if(t.ok){const e=await t.json(),n=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Brand General"}));i=[...i,...n]}if(n.ok){const e=await n.json(),t=(e.success?e.data:e).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Foodcourt General"}));i=[...i,...t]}console.log("Fetched managers (General only):",i.length),mt(i)}catch(e){console.error("Error fetching managers:",e),mt([])}},Kt=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();console.log("Fetched restaurants:",e);const n=e.map(e=>{var t,n;return{id:e.id.toString(),name:e.name,admin_id:(null===(t=e.admin_id)||void 0===t?void 0:t.toString())||(null===(n=e.managerId)||void 0===n?void 0:n.toString())||"",status:e.status,address:e.address||"",phone:e.phone||"",email:e.email||"",currency:e.currency||"USD"}});vt(n),console.log("Transformed restaurants:",n)}else console.error("Failed to fetch restaurants"),vt([])}catch(e){console.error("Error fetching restaurants:",e),vt([])}},Zt=(e,t)=>{if(ut({type:e,data:t}),lt("manager"===e?t.fullName:t.name),xt(!1),"manager"===e){const e=t;rt({...it,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=t,n=gt.find(t=>t.id===e.admin_id);rt({...it,managerId:(null===n||void 0===n?void 0:n.id)||"",managerName:(null===n||void 0===n?void 0:n.fullName)||"",companyName:(null===n||void 0===n?void 0:n.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},Xt=async(e,t)=>{St({type:e,data:t}),kt(!1),wt("manager"===e?t.fullName:t.name);const n=localStorage.getItem("auth_token");let i="USD";if("manager"===e){const e=t;try{const t=await fetch(`/api/users/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){const e=await t.json(),o=e.success?e.data:e;if(o.brand_id){const e=await fetch(`/api/brands/${o.brand_id}/payment-settings`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){var r;const t=await e.json(),n=t.data||t,a=null===(r=n.payment_settings)||void 0===r?void 0:r.defaultCurrency,o=n.supported_currencies;a?i=a:o&&o.length>0&&(i=o[0]),console.log("Brand currency:",i,"defaultCurrency:",a,"supported:",o)}}else if(o.foodcourt_id){const e=await fetch(`/api/foodcourts/${o.foodcourt_id}/payment-settings`,{headers:{Authorization:`Bearer ${n}`}});if(e.ok){var a;const t=await e.json(),n=t.data||t,r=null===(a=n.payment_settings)||void 0===a?void 0:a.defaultCurrency,o=n.supported_currencies;r?i=r:o&&o.length>0&&(i=o[0]),console.log("Foodcourt currency:",i,"defaultCurrency:",r,"supported:",o)}}}}catch(o){console.error("Error fetching manager currency:",o)}Rt({...Wt,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:"",currency:i})}else{const e=t,r=gt.find(t=>t.id===e.admin_id);try{const t=await fetch(`/api/restaurants/${e.id}`,{headers:{Authorization:`Bearer ${n}`}});if(t.ok){i=(await t.json()).currency||"USD"}}catch(o){console.error("Error fetching restaurant currency:",o)}Rt({...Wt,restaurantId:e.id,restaurantName:e.name,managerId:e.admin_id,managerName:r?r.fullName:"",companyName:e.name,currency:i})}},en=async()=>{try{const t=await fetch("/api/admin/settings");if(t.ok){const e=await t.json();At(e)}else{const t=localStorage.getItem("adminSettings");let n="";if(t)try{const e=JSON.parse(t);n=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.warn("Company settings not found in API response"),At({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:n})}}catch(t){console.error("Error fetching company settings:",t);const n=localStorage.getItem("adminSettings");let i="";if(n)try{const e=JSON.parse(n);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}console.error("Failed to load company settings from API"),At({companyName:"",address:"",city:"",state:"",postalCode:"",country:"",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",companyLogo:i})}},tn=e=>{if(!Bt)return"";return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${Bt.companyLogo?`<img src="${Bt.companyLogo}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name">${Bt.companyName||"Company Name"}</div>\n                <div class="company-details">\n                    ${Bt.address?`${Bt.address}<br>`:""}\n                    ${[Bt.city,Bt.state,Bt.postalCode].filter(Boolean).join(", ")}${Bt.city||Bt.state||Bt.postalCode?"<br>":""}\n                    ${Bt.country?`${Bt.country}<br>`:""}\n                    ${Bt.phone?`Tel: ${Bt.phone}<br>`:""}\n                    ${Bt.email?`Email: ${Bt.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${e.customerName||e.managerName||"Customer"}</div>\n                ${e.customerAddress?`<div class="customer-details">${e.customerAddress}</div>`:""}\n                ${e.restaurantName?`<div class="customer-details">Restaurant: ${e.restaurantName}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${vn(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${vn(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${vn(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items.map(t=>`\n                    <tr>\n                        <td>${t.description}</td>\n                        <td class="text-center">${t.quantity}</td>\n                        <td class="text-right">${(0,D.vv)(t.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,D.vv)(t.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join("")}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,D.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${(e.additionalCharges||[]).map(t=>`\n                <div class="summary-row tax">\n                    <span>${t.name} (${t.rate}%):</span>\n                    <span>${(0,D.vv)(t.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,D.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${Bt.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${Bt.bankName}<br>\n                <strong>Account Name:</strong> ${Bt.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${Bt.bankAccount||"-"}\n                ${Bt.swiftCode?`<br><strong>SWIFT Code:</strong> ${Bt.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${Bt.taxNumber||Bt.registrationNumber?`\n        <div class="registration-info">\n            ${Bt.registrationNumber?`Reg No: ${Bt.registrationNumber}`:""}\n            ${Bt.registrationNumber&&Bt.taxNumber?" | ":""}\n            ${Bt.taxNumber?`Tax No: ${Bt.taxNumber}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},nn=async e=>{if(!Bt)return We("Company settings not loaded. Please try again."),void Me(!0);try{var t;const n=tn(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const r=i.contentDocument||(null===(t=i.contentWindow)||void 0===t?void 0:t.document);if(!r)throw document.body.removeChild(i),new Error("Could not access iframe document");r.open(),r.write(n),r.close(),await new Promise(async e=>{try{var t;null!==(t=r.fonts)&&void 0!==t&&t.ready&&await r.fonts.ready}catch{}const n=r.querySelectorAll("img");await Promise.all(Array.from(n).map(e=>e.complete?Promise.resolve():new Promise(t=>{e.onload=t,e.onerror=t}))),setTimeout(e,100)});const a=await L()(r.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const o=a.toDataURL("image/png"),s=new P.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=a.height*l/a.width;s.addImage(o,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(n){console.error("Error generating PDF:",n),We("Failed to generate PDF. Please try again."),Me(!0)}},rn=e=>{if(!Bt)return We("Company settings not loaded. Please try again."),void Me(!0);const t=tn(e),n=window.open("","_blank","width=800,height=600");n&&(n.document.write(t),n.document.close(),setTimeout(()=>{n.print()},250))},an=async e=>{_e(e);let t="";if("restaurant"===e.payerType&&e.restaurantId){const n=yt.find(t=>t.id===e.restaurantId);null!==n&&void 0!==n&&n.email&&(t=n.email)}else if("foodcourt_manager"===e.payerType||"brand_manager"===e.payerType){const n=gt.find(t=>t.id===e.managerId);null!==n&&void 0!==n&&n.email&&(t=n.email)}if(!t&&e.managerId){const n=gt.find(t=>t.id===e.managerId);null!==n&&void 0!==n&&n.email&&(t=n.email)}ze(t),Te(!0)},on=()=>{Rt({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:"",currency:"",discountType:"none",discountValue:"",discountReason:""}),St(null),wt(""),kt(!1)},sn=e=>{if("pending_payment"!==e.status)return!1;const t=new Date;return new Date(e.dueDate)<t},ln=e=>sn(e)?"overdue":e.status,dn=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},cn=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},pn=r.filter(e=>{const t=s.toLowerCase(),n=dn(e.status).toLowerCase(),i="automatic"===e.type?"auto automatic":"manual",r=(e.planType||"").toLowerCase(),a=(e.categoryDisplayName||"").toLowerCase(),o=(e.customerName||e.restaurantName||"").toLowerCase(),l=cn(e.payerType||"restaurant").toLowerCase(),d=!s||e.companyName.toLowerCase().includes(t)||e.invoiceNumber.toLowerCase().includes(t)||e.managerName.toLowerCase().includes(t)||n.includes(t)||i.includes(t)||r.includes(t)||a.includes(t)||o.includes(t)||l.includes(t)||(e.billingPeriod||"").toLowerCase().includes(t);let c=!0;if(g.start&&g.end){const t=new Date(e.issueDate),n=new Date(g.start),i=new Date(g.end);n.setHours(0,0,0,0),i.setHours(23,59,59,999),c=t>=n&&t<=i}return d&&c}).sort((e,t)=>{let n=0;switch(_t){case"invoiceNumber":n=e.invoiceNumber.localeCompare(t.invoiceNumber);break;case"companyName":n=e.companyName.localeCompare(t.companyName);break;case"issueDate":default:n=new Date(e.issueDate).getTime()-new Date(t.issueDate).getTime();break;case"dueDate":n=new Date(e.dueDate).getTime()-new Date(t.dueDate).getTime();break;case"amount":n=e.total-t.total;break;case"status":n=(e.status||"").localeCompare(t.status||"")}return"desc"===Mt?-n:n}),xn=e=>{_t===e?Lt("asc"===Mt?"desc":"asc"):(Pt(e),Lt("dueDate"===e||"amount"===e?"desc":"asc"))},hn=e=>_t!==e?"":"asc"===Mt?" \u25b2":" \u25bc",un=r.length,gn=r.filter(e=>"paid"===e.status).length,mn=r.filter(e=>sn(e)).length,yn=r.filter(e=>"paid"===e.status).reduce((e,t)=>e+t.total,0),vn=e=>new Date(e).toLocaleDateString("en-MY"),jn=e=>{nt(e),f(!0)},fn=e=>{var t,n;if(nt(e),rt({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(t=e.items)||void 0===t||null===(n=t[0])||void 0===n?void 0:n.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",items:e.items}),e.restaurantId){const t=yt.find(t=>t.id===e.restaurantId);t&&(ut({type:"restaurant",data:t}),lt(t.name))}else if(e.managerId){const t=gt.find(t=>t.id===e.managerId);t&&(ut({type:"manager",data:t}),lt(t.fullName))}ot(""),w(!0)},bn=e=>{nt(e),De(!0)};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(z.mc,{children:[(0,a.jsxs)(z.Y9,{children:[(0,a.jsx)(z.hE,{children:"Invoices"}),(0,a.jsx)(z.ex,{})]}),(0,a.jsxs)(z.UC,{children:[(0,a.jsxs)(z.MD,{children:[(0,a.jsxs)(z.hI,{color:"#059669",children:[(0,a.jsx)(z.Os,{children:un}),(0,a.jsx)(z.v0,{children:"Total Invoices"}),(0,a.jsx)(z.d1,{children:"All invoice records"})]}),(0,a.jsxs)(z.hI,{color:"#2563EB",children:[(0,a.jsx)(z.Os,{children:gn}),(0,a.jsx)(z.v0,{children:"Paid Invoices"}),(0,a.jsxs)(z.d1,{children:[un>0?Math.round(gn/un*100):0,"% completed"]})]}),(0,a.jsxs)(z.hI,{color:"#DC2626",children:[(0,a.jsx)(z.Os,{children:mn}),(0,a.jsx)(z.v0,{children:"Overdue Invoices"}),(0,a.jsx)(z.d1,{children:"Requires attention"})]}),(0,a.jsxs)(z.hI,{color:"#7C3AED",children:[(0,a.jsx)(z.Os,{children:(0,D.vv)(yn)}),(0,a.jsx)(z.v0,{children:"Total Revenue"}),(0,a.jsx)(z.d1,{children:"From paid invoices"})]})]}),(0,a.jsxs)(_.tU,{children:[(0,a.jsx)(_.oz,{active:"invoices"===Re,onClick:()=>Ue("invoices"),children:"Invoices"}),(0,a.jsxs)(_.oz,{active:"payment_submitted"===Re,onClick:()=>Ue("payment_submitted"),children:["Payment Submitted",(0,a.jsx)(_.Ex,{count:r.filter(e=>"payment_submitted"===e.status).length,variant:"danger"})]}),(0,a.jsx)(_.oz,{active:"categories"===Re,onClick:()=>Ue("categories"),children:"Invoice Categories"})]}),"invoices"===Re&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(oe,{children:[(0,a.jsxs)(se,{children:[(0,a.jsx)(I.DO,{placeholder:"Search invoices...",value:s,onChange:e=>l(e.target.value)}),(0,a.jsx)("div",{style:{marginLeft:"auto"},children:(0,a.jsx)(W,{variant:"primary",onClick:()=>{on(),v(!0)},children:"Create Invoice"})})]}),(0,a.jsxs)(le,{children:[(0,a.jsx)(de,{active:"week"===d&&!p,onClick:()=>Ut("week"),children:"Week"}),(0,a.jsx)(de,{active:"month"===d&&!p,onClick:()=>Ut("month"),children:"Month"}),(0,a.jsx)(de,{active:"year"===d&&!p,onClick:()=>Ut("year"),children:"Year"}),(0,a.jsx)(de,{active:"all"===d&&!p,onClick:()=>Ut("all"),children:"All"}),(0,a.jsxs)(ce,{children:[(0,a.jsxs)(pe,{active:p,onClick:()=>u(!h),children:[(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,a.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,a.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,a.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),g.start&&g.end?`${g.start} ~ ${g.end}`:"Custom Range"]}),(0,a.jsx)(B,{isOpen:h,startDate:g.start,endDate:g.end,onRangeSelect:(e,t)=>{x(!0),c("all"),m({start:e,end:t})},onClose:()=>u(!1)})]})]})]}),(0,a.jsxs)(z.an,{children:[(0,a.jsxs)(z.bQ,{children:[(0,a.jsx)(z.B_,{children:(0,a.jsxs)("tr",{children:[(0,a.jsxs)(z.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>xn("invoiceNumber"),children:["Invoice",hn("invoiceNumber")]}),(0,a.jsxs)(z.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>xn("companyName"),children:["Customer",hn("companyName")]}),(0,a.jsx)(z.gU,{align:"center",children:"Period"}),(0,a.jsx)(z.gU,{align:"center",children:"Issued"}),(0,a.jsxs)(z.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>xn("dueDate"),children:["Due",hn("dueDate")]}),(0,a.jsxs)(z.gU,{align:"center",style:{cursor:"pointer"},onClick:()=>xn("status"),children:["Status",hn("status")]}),(0,a.jsxs)(z.gU,{align:"right",style:{cursor:"pointer"},onClick:()=>xn("amount"),children:["Amount",hn("amount")]}),(0,a.jsx)(z.gU,{align:"right",children:"Total"}),(0,a.jsx)(z.gU,{isActions:!0,children:"Actions"})]})}),(0,a.jsx)("tbody",{children:pn.map(e=>(0,a.jsxs)(z.J2,{children:[(0,a.jsx)(z.Bv,{"data-label":"Invoice",children:(0,a.jsxs)(R,{children:[(0,a.jsxs)(U,{children:[e.invoiceNumber,"automatic"===e.type&&(0,a.jsx)(O,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,a.jsx)(H,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,a.jsx)(z.Bv,{"data-label":"Customer",children:(0,a.jsxs)(R,{children:[(0,a.jsx)(U,{children:e.customerName||e.restaurantName||"Unknown"}),(0,a.jsx)(H,{children:cn(e.payerType||"restaurant")})]})}),(0,a.jsx)(z.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,a.jsx)(z.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:vn(e.issueDate)}),(0,a.jsx)(z.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:vn(e.dueDate)}),(0,a.jsxs)(z.Bv,{"data-label":"Status",align:"center",children:[(0,a.jsx)(Y,{status:ln(e),children:dn(ln(e))}),e.isModified&&(0,a.jsx)("span",{style:{display:"inline-block",marginLeft:"4px",padding:"2px 6px",fontSize:"10px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px",verticalAlign:"middle"},children:"Modified"})]}),(0,a.jsx)(z.Bv,{"data-label":"Amount",align:"right",children:(0,a.jsx)(z.DM,{children:(0,D.vv)(e.amount,e.currency||"USD")})}),(0,a.jsx)(z.Bv,{"data-label":"Total",align:"right",children:(0,a.jsx)(z.DM,{highlight:!0,children:0===e.total?(0,a.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,D.vv)(e.total,e.currency||"USD")})}),(0,a.jsx)(z.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,a.jsxs)(z.wr,{children:[(0,a.jsx)(V,{variant:"primary",onClick:()=>jn(e),children:"View"}),"draft"===e.status&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(V,{onClick:()=>fn(e),children:"Edit"}),(0,a.jsx)(V,{variant:"success",onClick:()=>(e=>{nt(e),S(!0)})(e),title:"Send Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("line",{x1:"22",y1:"2",x2:"11",y2:"13"}),(0,a.jsx)("polygon",{points:"22,2 15,22 11,13 2,9 22,2"})]})}),(0,a.jsx)(q,{onClick:()=>bn(e),title:"Delete Invoice",children:(0,a.jsx)(G,{children:"\xd7"})})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(V,{onClick:()=>fn(e),children:"Edit"}),(0,a.jsx)(V,{onClick:()=>nn(e),title:"Download PDF",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,a.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,a.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,a.jsx)(V,{onClick:()=>rn(e),title:"Print Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,a.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,a.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,a.jsx)(V,{variant:"email",onClick:()=>an(e),title:"Send Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,a.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,a.jsx)(q,{onClick:()=>bn(e),title:"Delete Invoice",children:(0,a.jsx)(G,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,a.jsxs)(a.Fragment,{children:[e.hasPaymentInfo&&(0,a.jsx)(V,{variant:"primary",onClick:()=>(e=>{nt(e),k(!0)})(e),children:"Confirm"}),(0,a.jsx)(V,{onClick:()=>nn(e),title:"Download PDF",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,a.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,a.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,a.jsx)(V,{onClick:()=>rn(e),title:"Print Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,a.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,a.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,a.jsx)(V,{variant:"email",onClick:()=>an(e),title:"Resend Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,a.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(V,{onClick:()=>fn(e),children:"Edit"}),(0,a.jsx)(V,{onClick:()=>nn(e),title:"Download PDF",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,a.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,a.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,a.jsx)(V,{onClick:()=>rn(e),title:"Print Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,a.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,a.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})}),(0,a.jsx)(V,{variant:"email",onClick:()=>an(e),title:"Resend Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,a.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,a.jsx)(q,{onClick:()=>bn(e),title:"Delete Invoice",children:(0,a.jsx)(G,{children:"\xd7"})})]}),"paid"===e.status&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(V,{onClick:()=>nn(e),title:"Download PDF",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,a.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,a.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,a.jsx)(V,{onClick:()=>rn(e),title:"Print Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,a.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,a.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]}),"cancelled"===e.status&&(0,a.jsx)(V,{onClick:()=>nn(e),title:"Download Invoice",children:(0,a.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,a.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,a.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})})]},e.id))})]}),0===pn.length&&(0,a.jsxs)(z.ys,{children:[(0,a.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,a.jsx)("div",{style:{fontSize:"14px"},children:0===r.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]})]}),"payment_submitted"===Re&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,a.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"Payment Confirmation Required"}),(0,a.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:0},children:"These invoices have payment submitted and are waiting for your confirmation."})]}),(0,a.jsxs)(z.an,{children:[(0,a.jsxs)(z.bQ,{children:[(0,a.jsx)(z.B_,{children:(0,a.jsxs)("tr",{children:[(0,a.jsx)(z.gU,{align:"center",children:"Invoice"}),(0,a.jsx)(z.gU,{align:"center",children:"Customer"}),(0,a.jsx)(z.gU,{align:"center",children:"Payment Method"}),(0,a.jsx)(z.gU,{align:"center",children:"Submitted Date"}),(0,a.jsx)(z.gU,{align:"right",children:"Amount"}),(0,a.jsx)(z.gU,{isActions:!0,children:"Actions"})]})}),(0,a.jsx)("tbody",{children:r.filter(e=>"payment_submitted"===e.status).map(e=>(0,a.jsxs)(z.J2,{children:[(0,a.jsx)(z.Bv,{"data-label":"Invoice",children:(0,a.jsxs)(R,{children:[(0,a.jsx)(U,{children:e.invoiceNumber}),(0,a.jsx)(H,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,a.jsx)(z.Bv,{"data-label":"Customer",children:(0,a.jsxs)(R,{children:[(0,a.jsx)(U,{children:e.customerName||e.restaurantName||"Unknown"}),(0,a.jsx)(H,{children:e.companyName})]})}),(0,a.jsx)(z.Bv,{"data-label":"Payment Method",align:"center",children:e.paymentMethod||"-"}),(0,a.jsx)(z.Bv,{"data-label":"Submitted",align:"center",children:e.paidDate?vn(e.paidDate):"-"}),(0,a.jsx)(z.Bv,{"data-label":"Amount",align:"right",children:(0,a.jsx)(z.DM,{highlight:!0,children:0===e.total?(0,a.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,D.vv)(e.total,e.currency||"USD")})}),(0,a.jsx)(z.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,a.jsxs)(z.wr,{children:[(0,a.jsx)(V,{onClick:()=>jn(e),children:"View"}),(0,a.jsx)(V,{variant:"primary",onClick:()=>{nt(e),k(!0)},children:"Confirm Payment"})]})})]},e.id))})]}),0===r.filter(e=>"payment_submitted"===e.status).length&&(0,a.jsxs)(z.ys,{children:[(0,a.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#1F2937",marginBottom:"8px"},children:"No Pending Confirmations"}),(0,a.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"There are no invoices waiting for payment confirmation."})]})]})]}),"categories"===Re&&(0,a.jsxs)("div",{style:{padding:"24px 0"},children:[(0,a.jsxs)(re,{children:[(0,a.jsxs)("div",{children:[(0,a.jsx)(ae,{children:"Invoice Categories"}),(0,a.jsx)("p",{style:{color:"#6B7280",fontSize:"14px",margin:"8px 0 0 0"},children:"Manage invoice categories for organizing different types of charges."})]}),(0,a.jsx)(W,{variant:"primary",onClick:()=>Yt(),children:"Add Category"})]}),0===Nt.length?(0,a.jsxs)(A.pp,{children:[(0,a.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#1F2937",margin:"0 0 8px 0"},children:"No categories yet"}),(0,a.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",margin:"0 0 16px 0"},children:"Create your first invoice category to get started."}),(0,a.jsx)(W,{variant:"primary",onClick:()=>Yt(),children:"Add Category"})]}):(0,a.jsx)(J,{children:Nt.map(e=>(0,a.jsxs)(Q,{isActive:e.is_active,children:[(0,a.jsx)(K,{children:e.name.charAt(0).toUpperCase()}),(0,a.jsxs)(Z,{children:[(0,a.jsxs)(X,{children:[e.name,(0,a.jsx)(ne,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),(0,a.jsxs)(ee,{children:[(0,a.jsxs)("span",{children:["Code: ",(0,a.jsx)("strong",{children:e.code})]}),e.description&&(0,a.jsx)("span",{children:e.description})]})]}),(0,a.jsxs)(te,{children:[(0,a.jsx)(ie,{onClick:()=>(async e=>{try{const t=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/categories/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({is_active:!e.is_active})});(await n.json()).success&&Ot()}catch(t){console.error("Failed to toggle category:",t)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.is_active?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,a.jsx)("circle",{cx:"12",cy:"12",r:"3"})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"}),(0,a.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]})})}),(0,a.jsx)(ie,{onClick:()=>Yt(e),title:"Edit Category",children:(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),(0,a.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,a.jsx)(ie,{onClick:()=>(e=>{et(e),Ze(!0)})(e),title:"Delete Category",children:(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("polyline",{points:"3,6 5,6 21,6"}),(0,a.jsx)("path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})]})})]})]},e.id))})]}),He&&(0,a.jsx)(xe,{onClick:Vt,children:(0,a.jsxs)(he,{onClick:e=>e.stopPropagation(),style:{maxWidth:"500px"},children:[(0,a.jsxs)(ue,{children:[(0,a.jsx)(ge,{children:Ye?"Edit Category":"Add Category"}),(0,a.jsx)(me,{onClick:Vt,children:"\xd7"})]}),(0,a.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),qe.name.trim()&&qe.code.trim())try{Qe(!0);const e=localStorage.getItem("auth_token"),t=Ye?`/api/invoices/categories/${Ye.id}`:"/api/invoices/categories",n=Ye?"PUT":"POST",i=await fetch(t,{method:n,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:qe.name.trim(),code:qe.code.trim().toLowerCase().replace(/\s+/g,"_"),description:qe.description.trim()||null})}),r=await i.json();r.success?(Vt(),Ot()):alert(r.error||"Failed to save category")}catch(t){console.error("Failed to save category:",t),alert("Failed to save category")}finally{Qe(!1)}},children:[(0,a.jsxs)(ye,{children:[(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Name *"}),(0,a.jsx)(we,{value:qe.name,onChange:e=>Ge({...qe,name:e.target.value}),placeholder:"e.g., Hardware",required:!0})]}),(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Code *"}),(0,a.jsx)(we,{value:qe.code,onChange:e=>Ge({...qe,code:e.target.value}),placeholder:"e.g., hardware",required:!0,disabled:null===Ye||void 0===Ye?void 0:Ye.is_system}),(0,a.jsx)("small",{style:{color:"#6B7280",fontSize:"12px"},children:"Unique identifier used in the system. Use lowercase letters and underscores."})]}),(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Description"}),(0,a.jsx)(Fe,{value:qe.description,onChange:e=>Ge({...qe,description:e.target.value}),placeholder:"Brief description of this category",rows:3})]})]}),(0,a.jsxs)(ve,{children:[(0,a.jsx)(W,{variant:"secondary",type:"button",onClick:Vt,children:"Cancel"}),(0,a.jsx)(W,{variant:"primary",type:"submit",disabled:Je||!qe.name||!qe.code,children:Je?"Saving...":Ye?"Update":"Create"})]})]})]})}),(0,a.jsx)($.A,{isOpen:Ke,onCancel:()=>Ze(!1),onConfirm:async()=>{if(Xe)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/categories/${Xe.id}?force=true`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success?(Ze(!1),et(null),Ot()):alert(n.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:`Are you sure you want to delete "${null===Xe||void 0===Xe?void 0:Xe.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"}),y&&(0,a.jsx)(xe,{onClick:e=>{e.target===e.currentTarget&&(v(!1),on())},children:(0,a.jsxs)(he,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(ue,{children:[(0,a.jsx)(ge,{children:"Create Invoice"}),(0,a.jsx)(me,{onClick:()=>{v(!1),on()},children:"\xd7"})]}),(0,a.jsxs)(ye,{children:[(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Search Manager or Restaurant *"}),(0,a.jsxs)("div",{style:{position:"relative"},children:[(0,a.jsx)(we,{type:"text",value:bt,onChange:e=>(e=>{if(wt(e),kt(!0),e.length<2)return void ft({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",gt),console.log("Available restaurants:",yt);const t=gt.filter(t=>t.fullName&&t.fullName.toLowerCase().includes(e.toLowerCase())||t.companyName&&t.companyName.toLowerCase().includes(e.toLowerCase())),n=yt.filter(t=>t.name&&t.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",t),console.log("Filtered restaurants:",n),ft({managers:t.slice(0,5),restaurants:n.slice(0,5)})})(e.target.value),onFocus:()=>kt(!0),onBlur:()=>setTimeout(()=>kt(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),Ft&&(jt.managers.length>0||jt.restaurants.length>0)&&(0,a.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[jt.managers.length>0&&(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),jt.managers.map(e=>(0,a.jsxs)("div",{onClick:()=>Xt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,a.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,a.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),jt.restaurants.length>0&&(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),jt.restaurants.map(e=>{const t=gt.find(t=>t.id===e.admin_id);return(0,a.jsxs)("div",{onClick:()=>Xt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,a.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,a.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===t||void 0===t?void 0:t.fullName)||"Unknown"]})]},e.id)})]})]})]}),Ct&&(0,a.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===Ct.type?Ct.data.fullName:Ct.data.name}),(0,a.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===Ct.type?`${Ct.data.companyName} \u2022 Manager`:`${Ct.data.address||"No address"} \u2022 Restaurant`})]}),(0,a.jsx)("button",{onClick:()=>{St(null),wt("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,a.jsxs)(je,{children:[(0,a.jsxs)(fe,{children:[(0,a.jsxs)(be,{children:["Amount",Wt.currency?` (${Wt.currency})`:""," *"]}),(0,a.jsx)(we,{type:"number",step:Wt.currency&&0===(0,D.e_)(Wt.currency)?"1":"0.01",min:"0",value:Wt.amount,onChange:e=>{const t=parseFloat(e.target.value)||0,n=parseFloat(Wt.discountValue)||0,i="percentage"===Wt.discountType?t*(n/100):"fixed"===Wt.discountType?n:0,r=Math.max(0,t-i),a=Gt.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+r*t.rate/100,0),o=r+a;Rt({...Wt,amount:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},onBlur:e=>{if(e.target.value&&Wt.currency){const t=(0,D.e_)(Wt.currency),n=parseFloat(e.target.value)||0,i=n.toFixed(t),r=parseFloat(Wt.discountValue)||0,a="percentage"===Wt.discountType?n*(r/100):"fixed"===Wt.discountType?r:0,o=Math.max(0,n-a),s=Gt.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+o*t.rate/100,0),l=o+s;Rt({...Wt,amount:i,tax:s.toFixed(t),total:l.toFixed(t)})}},placeholder:Wt.currency&&0===(0,D.e_)(Wt.currency)?"0":"0.00",required:!0,disabled:!Ct}),!Ct&&(0,a.jsx)("span",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px",display:"block"},children:"Select a manager or restaurant first"})]}),(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Due Date *"}),(0,a.jsx)(we,{type:"date",value:Wt.dueDate,onChange:e=>Rt({...Wt,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,a.jsxs)(je,{children:[(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Discount"}),(0,a.jsxs)(ke,{value:Wt.discountType,onChange:e=>{const t=e.target.value,n=parseFloat(Wt.amount)||0,i="none"===t?0:parseFloat(Wt.discountValue)||0,r="percentage"===t?n*(i/100):"fixed"===t?i:0,a=Math.max(0,n-r),o=Gt.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+a*t.rate/100,0),s=a+o;Rt({...Wt,discountType:t,discountValue:"none"===t?"":Wt.discountValue,tax:o.toFixed(2),total:s.toFixed(2)})},children:[(0,a.jsx)("option",{value:"none",children:"No Discount"}),(0,a.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,a.jsx)("option",{value:"fixed",children:"Fixed Amount"})]})]}),"none"!==Wt.discountType&&(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"percentage"===Wt.discountType?"Discount (%)":"Discount Amount"}),(0,a.jsx)(we,{type:"number",step:"0.01",min:"0",max:"percentage"===Wt.discountType?"100":void 0,value:Wt.discountValue,onChange:e=>{const t=parseFloat(Wt.amount)||0,n=parseFloat(e.target.value)||0,i="percentage"===Wt.discountType?t*(n/100):n,r=Math.max(0,t-i),a=Gt.filter(e=>e.enabled&&e.rate>0).reduce((e,t)=>e+r*t.rate/100,0),o=r+a;Rt({...Wt,discountValue:e.target.value,tax:a.toFixed(2),total:o.toFixed(2)})},placeholder:"0"})]}),"none"!==Wt.discountType&&(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Discount Reason"}),(0,a.jsx)(we,{type:"text",value:Wt.discountReason,onChange:e=>Rt({...Wt,discountReason:e.target.value}),placeholder:"e.g. Loyalty discount"})]})]}),(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Invoice Category"}),(0,a.jsx)(ke,{value:Wt.invoiceCategory||"service",onChange:e=>Rt({...Wt,invoiceCategory:e.target.value}),children:Nt.length>0?Nt.filter(e=>"subscription"!==e.code).map(e=>(0,a.jsx)("option",{value:e.code,children:e.name},e.id)):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("option",{value:"service",children:"Service"}),(0,a.jsx)("option",{value:"consulting",children:"Consulting"}),(0,a.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(Wt.invoiceCategory||"service")&&(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Item/Description"}),(0,a.jsx)(Fe,{value:"others"===Wt.invoiceCategory?Wt.customDescription||"":Wt.serviceDescription||"",onChange:e=>{"others"===Wt.invoiceCategory?Rt({...Wt,customDescription:e.target.value}):Rt({...Wt,serviceDescription:e.target.value})},placeholder:`Enter ${Wt.invoiceCategory||"service"} description...`,rows:2})]}),(0,a.jsxs)(Ce,{children:[(0,a.jsxs)(Se,{children:[(0,a.jsx)("span",{children:"Subtotal:"}),(0,a.jsx)("span",{children:Wt.currency?(0,D.vv)(parseFloat(Wt.amount||"0"),Wt.currency):"-"})]}),"none"!==Wt.discountType&&parseFloat(Wt.discountValue||"0")>0&&(()=>{const e=parseFloat(Wt.amount||"0"),t=parseFloat(Wt.discountValue||"0"),n="percentage"===Wt.discountType?e*(t/100):t;return(0,a.jsxs)(Se,{children:[(0,a.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===Wt.discountType?` (${t}%)`:"",":"]}),(0,a.jsxs)("span",{style:{color:"#15803D"},children:["-",Wt.currency?(0,D.vv)(n,Wt.currency):"-"]})]})})(),Gt.filter(e=>e.enabled&&e.name&&e.rate>0).map((e,t)=>{const n=parseFloat(Wt.amount||"0"),i=parseFloat(Wt.discountValue||"0"),r="percentage"===Wt.discountType?n*(i/100):"fixed"===Wt.discountType?i:0,o=Math.max(0,n-r)*(e.rate/100);return(0,a.jsxs)(Se,{children:[(0,a.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,a.jsx)("span",{children:Wt.currency?(0,D.vv)(o,Wt.currency):"-"})]},t)}),(0,a.jsxs)(Se,{highlight:!0,children:[(0,a.jsx)("span",{children:"Total:"}),(0,a.jsx)("span",{children:(0,a.jsx)("strong",{children:Wt.currency?(0,D.vv)(parseFloat(Wt.total||"0"),Wt.currency):"-"})})]})]})]}),(0,a.jsxs)(ve,{children:[(0,a.jsx)(W,{variant:"secondary",onClick:()=>{v(!1),on()},children:"Cancel"}),(0,a.jsx)(W,{variant:"primary",onClick:async()=>{if(Ct&&Wt.amount&&Wt.dueDate)try{const e=parseFloat(Wt.amount),t=parseFloat(Wt.discountValue)||0,n="percentage"===Wt.discountType?e*(t/100):"fixed"===Wt.discountType?t:0,i=Math.max(0,e-n),r=Gt.filter(e=>e.enabled&&e.name&&e.rate>0).map(e=>({name:e.name,rate:e.rate,amount:Math.round(i*e.rate/100*100)/100})),a=r.reduce((e,t)=>e+t.amount,0),o=i+a;let s="";s="others"===Wt.invoiceCategory?Wt.customDescription||"":Wt.serviceDescription||"";let l="",d="",c="";if("restaurant"===Ct.type){const e=Ct.data;l=e.name,c=e.name;const t=[];e.address&&t.push(e.address),e.phone&&t.push(`Phone: ${e.phone}`),e.email&&t.push(`Email: ${e.email}`),d=t.join("\n")}else if("manager"===Ct.type){const e=Ct.data;l=e.fullName,c=e.companyName||e.fullName;const t=[];e.companyName&&t.push(e.companyName),e.email&&t.push(`Email: ${e.email}`),d=t.join("\n")}let p="restaurant";if("manager"===Ct.type){const e=Ct.data;"Brand General"===e.role||"Brand Manager"===e.role?p="brand_manager":"Foodcourt General"!==e.role&&"Foodcourt Manager"!==e.role||(p="foodcourt_manager")}const x={restaurant_id:"restaurant"===Ct.type?Ct.data.id:null,payer_type:p,payer_id:"manager"===Ct.type?Ct.data.id:null,type:"manual",billing_period_start:null,billing_period_end:null,due_date:new Date(Wt.dueDate).toISOString(),total_amount:o,subtotal_before_discount:n>0?e:null,discount_type:"none"!==Wt.discountType?Wt.discountType:null,discount_value:n>0?t:null,discount_amount:n>0?n:null,discount_reason:Wt.discountReason||null,currency:Wt.currency||"USD",status:"draft",notes:`${c}\n${l}\n${d}\n\n${s}`,issued_by:1,issued_at:(new Date).toISOString(),issuer_type:"system_admin",invoice_category:Wt.invoiceCategory||"service",additional_charges:r},h=[{item_type:Wt.invoiceCategory,description:s,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:0,tax_amount:0,total_amount:e}],u=localStorage.getItem("auth_token"),g=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({invoice_data:x,items:h})});if(g.ok)await Ht(),v(!1),on();else{const e=await g.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!Ct||!Wt.amount||!Wt.dueDate,children:"Create Invoice"})]})]})}),j&&tt&&(0,a.jsx)(xe,{onClick:()=>f(!1),children:(0,a.jsxs)(he,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,a.jsxs)(ue,{children:[(0,a.jsx)(ge,{children:"Invoice Details"}),(0,a.jsx)(me,{onClick:()=>f(!1),children:"\xd7"})]}),(0,a.jsxs)(ye,{children:[(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,a.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===Bt||void 0===Bt?void 0:Bt.companyLogo)&&(0,a.jsx)("img",{src:Bt.companyLogo,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,a.jsx)("div",{style:{fontSize:null!==Bt&&void 0!==Bt&&Bt.companyLogo?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===Bt||void 0===Bt?void 0:Bt.companyName)||"Company Name"}),(0,a.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===Bt||void 0===Bt?void 0:Bt.address)&&(0,a.jsx)("div",{children:Bt.address}),((null===Bt||void 0===Bt?void 0:Bt.city)||(null===Bt||void 0===Bt?void 0:Bt.state)||(null===Bt||void 0===Bt?void 0:Bt.postalCode))&&(0,a.jsx)("div",{children:[null===Bt||void 0===Bt?void 0:Bt.city,null===Bt||void 0===Bt?void 0:Bt.state,null===Bt||void 0===Bt?void 0:Bt.postalCode].filter(Boolean).join(", ")}),(null===Bt||void 0===Bt?void 0:Bt.country)&&(0,a.jsx)("div",{children:Bt.country}),(null===Bt||void 0===Bt?void 0:Bt.phone)&&(0,a.jsxs)("div",{children:["Tel: ",Bt.phone]}),(null===Bt||void 0===Bt?void 0:Bt.email)&&(0,a.jsxs)("div",{children:["Email: ",Bt.email]})]})]}),(0,a.jsxs)("div",{style:{textAlign:"right"},children:[(0,a.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,a.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:tt.invoiceNumber}),(0,a.jsx)(Y,{status:tt.status,style:{marginTop:"8px"},children:dn(tt.status)}),tt.isModified&&(0,a.jsx)("span",{style:{display:"inline-block",marginTop:"4px",padding:"2px 8px",fontSize:"11px",fontWeight:600,color:"#B45309",background:"#FEF3C7",borderRadius:"4px"},children:"Modified"})]})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,a.jsxs)("div",{style:{flex:1},children:[(0,a.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,a.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:tt.customerName}),tt.customerAddress&&(0,a.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:tt.customerAddress}),"restaurant"===tt.payerType&&tt.restaurantName&&"Unknown Restaurant"!==tt.restaurantName&&(0,a.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Restaurant: ",tt.restaurantName]}),tt.companyName&&tt.companyName!==tt.customerName&&(0,a.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:["Company: ",tt.companyName]})]}),(0,a.jsxs)("div",{style:{textAlign:"right"},children:[(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,a.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:tt.billingPeriod||"-"})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,a.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:vn(tt.issueDate)})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,a.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:vn(tt.dueDate)})]}),tt.paidDate&&(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,a.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:vn(tt.paidDate)})]})]})]}),(0,a.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,a.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,a.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,a.jsx)("thead",{children:(0,a.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,a.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,a.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,a.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,a.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,a.jsx)("tbody",{children:tt.items.map((e,t)=>(0,a.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,a.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,a.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,a.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,D.vv)(e.unitPrice,tt.currency||"MYR")}),(0,a.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,D.vv)(e.total,tt.currency||"MYR")})]},t))})]})]}),(0,a.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,a.jsx)("div",{style:{width:"280px"},children:(0,a.jsxs)(Ce,{children:[(0,a.jsxs)(Se,{children:[(0,a.jsx)("span",{children:"Subtotal:"}),(0,a.jsx)("span",{children:(0,D.vv)(tt.subtotalBeforeDiscount||tt.amount,tt.currency||"MYR")})]}),tt.discountType&&"none"!==tt.discountType&&tt.discountAmount>0&&(0,a.jsxs)(Se,{children:[(0,a.jsxs)("span",{style:{color:"#15803D"},children:["Discount","percentage"===tt.discountType?` (${tt.discountValue}%)`:"",":"]}),(0,a.jsxs)("span",{style:{color:"#15803D"},children:["-",(0,D.vv)(tt.discountAmount,tt.currency||"MYR")]})]}),(tt.additionalCharges||[]).map((e,t)=>(0,a.jsxs)(Se,{children:[(0,a.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,a.jsx)("span",{children:(0,D.vv)(e.amount,tt.currency||"MYR")})]},t)),(0,a.jsxs)(Se,{highlight:!0,children:[(0,a.jsx)("span",{children:"Total:"}),(0,a.jsx)("span",{children:(0,a.jsx)("strong",{children:(0,D.vv)(tt.total,tt.currency||"MYR")})})]})]})})}),(null===Bt||void 0===Bt?void 0:Bt.bankName)&&(0,a.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,a.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,a.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"Bank:"})," ",Bt.bankName]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"Account Name:"})," ",Bt.bankAccountName]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("strong",{children:"Account Number:"})," ",Bt.bankAccount]})]})]}),((null===Bt||void 0===Bt?void 0:Bt.taxNumber)||(null===Bt||void 0===Bt?void 0:Bt.registrationNumber))&&(0,a.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===Bt||void 0===Bt?void 0:Bt.registrationNumber)&&(0,a.jsxs)("span",{children:["Reg No: ",Bt.registrationNumber]}),(null===Bt||void 0===Bt?void 0:Bt.registrationNumber)&&(null===Bt||void 0===Bt?void 0:Bt.taxNumber)&&(0,a.jsx)("span",{children:" | "}),(null===Bt||void 0===Bt?void 0:Bt.taxNumber)&&(0,a.jsxs)("span",{children:["Tax No: ",Bt.taxNumber]})]}),tt.isModified&&tt.modificationHistory&&tt.modificationHistory.length>0&&(0,a.jsxs)("div",{style:{marginTop:"20px",padding:"16px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,a.jsx)("div",{style:{fontSize:"13px",fontWeight:600,color:"#92400E",marginBottom:"12px"},children:"Modification History"}),tt.modificationHistory.map((e,t)=>(0,a.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:t<tt.modificationHistory.length-1?"10px":"0",paddingBottom:t<tt.modificationHistory.length-1?"10px":"0",borderBottom:t<tt.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,a.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,a.jsxs)("div",{style:{marginTop:"3px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,a.jsx)("div",{style:{marginTop:"3px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[t,n]=e;return(0,a.jsxs)("div",{children:[t,": ",String(n.from)," \u2192 ",String(n.to)]},t)})})]},t))]})]})]})}),F&&tt&&(0,a.jsx)(xe,{onClick:()=>k(!1),children:(0,a.jsxs)(he,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,a.jsxs)(ue,{children:[(0,a.jsxs)(ge,{children:["Confirm Payment - ",tt.invoiceNumber]}),(0,a.jsx)(me,{onClick:()=>k(!1),children:"\xd7"})]}),(0,a.jsxs)(ye,{children:[(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Invoice Summary"}),(0,a.jsxs)(Ce,{children:[(0,a.jsxs)(Se,{children:[(0,a.jsx)("span",{children:"Customer:"}),(0,a.jsx)("span",{children:tt.customerName||tt.managerName})]}),(0,a.jsxs)(Se,{children:[(0,a.jsx)("span",{children:"Company:"}),(0,a.jsx)("span",{children:tt.companyName})]}),(0,a.jsxs)(Se,{children:[(0,a.jsx)("span",{children:"Invoice Number:"}),(0,a.jsx)("span",{children:tt.invoiceNumber})]}),(0,a.jsxs)(Se,{children:[(0,a.jsx)("span",{children:"Due Date:"}),(0,a.jsx)("span",{children:vn(tt.dueDate)})]}),(0,a.jsxs)(Se,{highlight:!0,children:[(0,a.jsx)("span",{children:(0,a.jsx)("strong",{children:"Payment Amount:"})}),(0,a.jsx)("span",{children:(0,a.jsx)("strong",{children:(0,D.vv)(tt.total,tt.currency||"USD")})})]})]})]}),tt.hasPaymentInfo&&(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Customer's Payment Information"}),(0,a.jsxs)("div",{style:{background:"#EFF6FF",border:"1px solid #3B82F6",borderRadius:"8px",padding:"16px"},children:[(0,a.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,a.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,a.jsx)("strong",{children:"Payment Method:"})," ","bank_transfer"===tt.paymentMethod?"Bank Transfer":"qr_payment"===tt.paymentMethod?"QR Payment":"stripe"===tt.paymentMethod?"Stripe":"paypal"===tt.paymentMethod?"PayPal":tt.paymentMethod||"Not specified"]}),tt.transactionId&&(0,a.jsxs)("p",{style:{margin:"0 0 8px 0"},children:[(0,a.jsx)("strong",{children:"Transaction ID:"})," ",tt.transactionId]})]}),tt.receiptUrl&&(0,a.jsxs)("div",{style:{marginTop:"12px"},children:[(0,a.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",fontSize:"14px"},children:"Payment Receipt:"}),(0,a.jsxs)("div",{style:{textAlign:"center",background:"white",padding:"12px",borderRadius:"8px"},children:[(0,a.jsx)("img",{src:tt.receiptUrl,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"300px",borderRadius:"8px",cursor:"pointer"},onClick:()=>window.open(tt.receiptUrl,"_blank")}),(0,a.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"12px",color:"#6B7280"},children:"Click image to view full size"})]})]})]})]}),(0,a.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,a.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,a.jsx)("strong",{children:"Confirm Payment Receipt"}),(0,a.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".']})}),(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Status Change"}),(0,a.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["Payment Submitted \u2192 Paid",(0,a.jsx)("br",{}),"Paid Date: ",(new Date).toLocaleDateString("en-MY")]})]})]}),(0,a.jsxs)(ve,{children:[(0,a.jsx)(W,{variant:"secondary",onClick:()=>k(!1),children:"Cancel"}),(0,a.jsx)(W,{variant:"primary",onClick:async()=>{if(tt)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${tt.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(t.ok)await Ht(),k(!1),nt(null);else{const e=await t.json();alert(`Failed to update payment status: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),b&&tt&&it&&(0,a.jsx)(xe,{onClick:()=>w(!1),children:(0,a.jsxs)(he,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(ue,{children:[(0,a.jsxs)(ge,{children:["Edit Invoice - ",tt.invoiceNumber]}),(0,a.jsx)(me,{onClick:()=>w(!1),children:"\xd7"})]}),(0,a.jsxs)(ye,{children:[(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Search Manager or Restaurant *"}),(0,a.jsxs)("div",{style:{position:"relative"},children:[(0,a.jsx)(we,{type:"text",value:st,onChange:e=>(e=>{if(lt(e),xt(!0),e.length<2)return void ct({managers:[],restaurants:[]});const t=gt.filter(t=>t.fullName&&t.fullName.toLowerCase().includes(e.toLowerCase())||t.companyName&&t.companyName.toLowerCase().includes(e.toLowerCase())),n=yt.filter(t=>t.name&&t.name.toLowerCase().includes(e.toLowerCase()));ct({managers:t.slice(0,5),restaurants:n.slice(0,5)})})(e.target.value),onFocus:()=>xt(!0),onBlur:()=>setTimeout(()=>xt(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),pt&&(dt.managers.length>0||dt.restaurants.length>0)&&(0,a.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[dt.managers.length>0&&(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),dt.managers.map(e=>(0,a.jsxs)("div",{onClick:()=>Zt("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,a.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,a.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),dt.restaurants.length>0&&(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),dt.restaurants.map(e=>{const t=gt.find(t=>t.id===e.admin_id);return(0,a.jsxs)("div",{onClick:()=>Zt("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,a.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,a.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[t?`Manager: ${t.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),ht&&(0,a.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===ht.type?ht.data.fullName:ht.data.name}),(0,a.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===ht.type?`${ht.data.companyName} \u2022 Manager`:`${ht.data.address||"No address"} \u2022 Restaurant`})]}),(0,a.jsx)("button",{onClick:()=>{ut(null),lt("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,a.jsxs)(je,{children:[(0,a.jsxs)(fe,{children:[(0,a.jsxs)(be,{children:["Amount (",e.currency||"RM",")"]}),(0,a.jsx)(we,{type:"number",value:it.amount,onChange:e=>{const t=parseFloat(e.target.value)||0,n=qt(it.currency||"").filter(e=>e.enabled&&e.rate>0).reduce((e,n)=>e+t*n.rate/100,0),i=t+n;rt({...it,amount:e.target.value,tax:n.toFixed(2),total:i.toFixed(2)})}})]}),(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Due Date"}),(0,a.jsx)(we,{type:"date",value:it.dueDate,onChange:e=>rt({...it,dueDate:e.target.value})})]})]}),(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Status"}),(0,a.jsxs)(ke,{value:it.status,onChange:e=>rt({...it,status:e.target.value}),children:[(0,a.jsx)("option",{value:"draft",children:"Draft"}),(0,a.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,a.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,a.jsx)("option",{value:"paid",children:"Paid"}),(0,a.jsx)("option",{value:"overdue",children:"Overdue"}),(0,a.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Invoice Category"}),(0,a.jsx)(ke,{value:it.invoiceCategory||"service",onChange:e=>rt({...it,invoiceCategory:e.target.value}),children:Nt.length>0?Nt.filter(e=>"subscription"!==e.code).map(e=>(0,a.jsx)("option",{value:e.code,children:e.name},e.id)):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("option",{value:"service",children:"Service"}),(0,a.jsx)("option",{value:"consulting",children:"Consulting"}),(0,a.jsx)("option",{value:"others",children:"Others"})]})})]}),"subscription"!==(it.invoiceCategory||"service")&&(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Item/Description"}),(0,a.jsx)(Fe,{value:"others"===it.invoiceCategory?it.customDescription||"":it.serviceDescription||"",onChange:e=>{"others"===it.invoiceCategory?rt({...it,customDescription:e.target.value}):rt({...it,serviceDescription:e.target.value})},placeholder:`Enter ${it.invoiceCategory||"service"} description...`,rows:2})]}),(0,a.jsxs)(Ce,{children:[(0,a.jsxs)(Se,{children:[(0,a.jsx)("span",{children:"Subtotal:"}),(0,a.jsx)("span",{children:it.currency?(0,D.vv)(parseFloat(it.amount||"0"),it.currency):"-"})]}),qt(it.currency||"").filter(e=>e.enabled&&e.name&&e.rate>0).map((e,t)=>{const n=parseFloat(it.amount||"0")*e.rate/100;return(0,a.jsxs)(Se,{children:[(0,a.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,a.jsx)("span",{children:it.currency?(0,D.vv)(n,it.currency):"-"})]},t)}),(0,a.jsxs)(Se,{highlight:!0,children:[(0,a.jsx)("span",{children:"Total:"}),(0,a.jsx)("span",{children:(0,a.jsx)("strong",{children:it.currency?(0,D.vv)(parseFloat(it.total||"0"),it.currency):"-"})})]})]}),(0,a.jsxs)(fe,{style:{marginTop:"16px"},children:[(0,a.jsxs)(be,{children:["Modification Reason ","automatic"===(null===tt||void 0===tt?void 0:tt.type)&&(0,a.jsx)("span",{style:{color:"#EF4444"},children:"*"})]}),(0,a.jsx)(Fe,{value:at,onChange:e=>ot(e.target.value),placeholder:"Enter reason for modification...",rows:2})]}),(null===tt||void 0===tt?void 0:tt.modificationHistory)&&tt.modificationHistory.length>0&&(0,a.jsxs)("div",{style:{marginTop:"16px",padding:"12px",background:"#FEF3C7",borderRadius:"8px",border:"1px solid #FDE68A"},children:[(0,a.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#92400E",marginBottom:"8px"},children:"Modification History"}),tt.modificationHistory.map((e,t)=>(0,a.jsxs)("div",{style:{fontSize:"12px",color:"#78350F",marginBottom:t<tt.modificationHistory.length-1?"8px":"0",paddingBottom:t<tt.modificationHistory.length-1?"8px":"0",borderBottom:t<tt.modificationHistory.length-1?"1px solid #FDE68A":"none"},children:[(0,a.jsxs)("div",{style:{fontWeight:500},children:[new Date(e.modified_at).toLocaleString()," - ",e.modified_by_name]}),e.reason&&(0,a.jsxs)("div",{style:{marginTop:"2px"},children:["Reason: ",e.reason]}),Object.keys(e.changes).length>0&&(0,a.jsx)("div",{style:{marginTop:"2px",color:"#92400E"},children:Object.entries(e.changes).map(e=>{let[t,n]=e;return(0,a.jsxs)("span",{style:{marginRight:"8px"},children:[t,": ",String(n.from)," \u2192 ",String(n.to)]},t)})})]},t))]})]}),(0,a.jsxs)(ve,{children:[(0,a.jsx)(W,{variant:"secondary",onClick:()=>w(!1),children:"Cancel"}),(0,a.jsx)(W,{variant:"primary",onClick:async()=>{if(tt&&it){if("automatic"===tt.type&&!at.trim())return We("Please enter a reason for modifying this invoice."),void Me(!0);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${tt.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({amount:parseFloat(it.amount),tax:parseFloat(it.tax),total:parseFloat(it.total),dueDate:it.dueDate,status:it.status,payerType:it.payerType,payerId:it.payerId,items:it.items,modificationReason:at.trim()||void 0})});if(t.ok){const e={...tt,amount:parseFloat(it.amount),tax:parseFloat(it.tax),total:parseFloat(it.total),dueDate:it.dueDate,status:it.status,payerType:it.payerType,payerId:it.payerId,items:it.items};o(r.map(t=>t.id===tt.id?e:t)),w(!1),nt(null),rt(null),We("Invoice updated successfully!"),Me(!0)}else{const e=await t.json();We(`Failed to update invoice: ${e.error||"Unknown error"}`),Me(!0)}}catch(e){console.error("Error updating invoice:",e),We("Error updating invoice. Please try again."),Me(!0)}}},children:"Save Changes"})]})]})}),C&&tt&&(0,a.jsx)(xe,{onClick:()=>S(!1),children:(0,a.jsxs)(he,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(ue,{children:[(0,a.jsx)(ge,{children:"Send Invoice"}),(0,a.jsx)(me,{onClick:()=>S(!1),children:"\xd7"})]}),(0,a.jsx)(ye,{children:(0,a.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,a.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice"}),(0,a.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,a.jsx)("strong",{children:tt.invoiceNumber})," to ",(0,a.jsx)("strong",{children:tt.managerName||tt.customerName}),"?"]}),(0,a.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,a.jsx)("span",{style:{fontWeight:"500"},children:tt.invoiceNumber})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Recipient:"}),(0,a.jsx)("span",{style:{fontWeight:"500"},children:tt.managerName||tt.customerName})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,a.jsx)("span",{style:{fontWeight:"500"},children:tt.customerName})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,a.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,D.vv)(tt.total,tt.currency||"USD")})]})]})]})}),(0,a.jsxs)(ve,{children:[(0,a.jsx)(W,{variant:"secondary",onClick:()=>S(!1),children:"Cancel"}),(0,a.jsx)(W,{variant:"success",onClick:async()=>{if(tt)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${tt.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"pending_payment"})});if(t.ok)await Ht(),S(!1),nt(null);else{const e=await t.json();alert(`Failed to send invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Confirm"})]})]})}),T&&tt&&(0,a.jsx)(xe,{onClick:()=>M(!1),children:(0,a.jsxs)(he,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(ue,{children:[(0,a.jsx)(ge,{children:"Resend Invoice"}),(0,a.jsx)(me,{onClick:()=>M(!1),children:"\xd7"})]}),(0,a.jsx)(ye,{children:(0,a.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,a.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,a.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,a.jsx)("strong",{children:tt.invoiceNumber})," to ",(0,a.jsx)("strong",{children:tt.managerName}),"?"]}),(0,a.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,a.jsxs)(ve,{children:[(0,a.jsx)(W,{variant:"secondary",onClick:()=>M(!1),children:"Cancel"}),(0,a.jsx)(W,{variant:"primary",onClick:()=>{tt&&(M(!1),nt(null))},children:"Resend Invoice"})]})]})}),Be&&tt&&(0,a.jsx)(xe,{onClick:()=>Ae(!1),children:(0,a.jsxs)(he,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(ue,{children:[(0,a.jsx)(ge,{children:"Cancel Invoice"}),(0,a.jsx)(me,{onClick:()=>Ae(!1),children:"\xd7"})]}),(0,a.jsx)(ye,{children:(0,a.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,a.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,a.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,a.jsx)("strong",{children:tt.invoiceNumber}),"?"]}),(0,a.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,a.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,a.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,a.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,a.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,a.jsx)("span",{style:{fontWeight:"500"},children:tt.invoiceNumber})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,a.jsx)("span",{style:{fontWeight:"500"},children:tt.managerName})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,a.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,a.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,D.vv)(tt.total,tt.currency||"USD")})]})]})]})}),(0,a.jsxs)(ve,{children:[(0,a.jsx)(W,{variant:"secondary",onClick:()=>Ae(!1),children:"Keep Invoice"}),(0,a.jsx)(W,{variant:"primary",onClick:async()=>{if(tt)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${tt.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({status:"cancelled"})});if(t.ok)await Ht(),Ae(!1),nt(null);else{const e=await t.json();alert(`Failed to cancel invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),Ee&&tt&&(0,a.jsx)(xe,{onClick:()=>De(!1),children:(0,a.jsxs)(he,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(ue,{children:[(0,a.jsx)(ge,{children:"Delete Invoice"}),(0,a.jsx)(me,{onClick:()=>De(!1),children:"\xd7"})]}),(0,a.jsx)(ye,{children:(0,a.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,a.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,a.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,a.jsxs)("strong",{children:["#",tt.invoiceNumber]}),"?",(0,a.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,a.jsxs)(ve,{children:[(0,a.jsx)(W,{variant:"secondary",onClick:()=>De(!1),children:"Keep Invoice"}),(0,a.jsx)(W,{variant:"primary",onClick:async()=>{if(tt)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${tt.id}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`}});if(t.ok)await Ht(),De(!1),nt(null);else{const e=await t.json();alert(`Failed to delete invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),Ne&&Ie&&(0,a.jsx)(xe,{onClick:()=>Te(!1),children:(0,a.jsxs)(he,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(ue,{children:[(0,a.jsx)(ge,{children:"Send Invoice via Email"}),(0,a.jsx)(me,{onClick:()=>Te(!1),children:"\xd7"})]}),(0,a.jsxs)(ye,{children:[(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Invoice"}),(0,a.jsxs)("div",{style:{padding:"12px",background:"#F8FAFC",borderRadius:"6px",marginBottom:"16px"},children:[(0,a.jsx)("div",{style:{fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:Ie.invoiceNumber}),(0,a.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:Ie.customerName}),(0,a.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginTop:"8px"},children:(0,D.vv)(Ie.total,Ie.currency||"MYR")})]})]}),(0,a.jsxs)(fe,{children:[(0,a.jsx)(be,{children:"Recipient Email *"}),(0,a.jsx)(we,{type:"email",value:$e,onChange:e=>ze(e.target.value),placeholder:"Enter recipient email address",required:!0,style:{maxWidth:"100%"}}),(0,a.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:$e?(0,a.jsxs)(a.Fragment,{children:["Default email for ","restaurant"===Ie.payerType?"Restaurant":"foodcourt_manager"===Ie.payerType?"Foodcourt Manager":"brand_manager"===Ie.payerType?"Brand Manager":"Customer"]}):(0,a.jsxs)(a.Fragment,{children:["Enter the ","restaurant"===Ie.payerType?"restaurant":"foodcourt_manager"===Ie.payerType?"foodcourt manager":"brand_manager"===Ie.payerType?"brand manager":"customer"," email address"]})})]}),(0,a.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px"},children:(0,a.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:"The invoice will be sent to the recipient email address using the system email settings."})})]}),(0,a.jsxs)(ve,{children:[(0,a.jsx)(W,{variant:"secondary",onClick:()=>{Te(!1),_e(null),ze("")},children:"Cancel"}),(0,a.jsx)(W,{variant:"primary",onClick:async()=>{if(!Ie||!$e)return We("Please enter a valid email address."),void Me(!0);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${Ie.id}/send-email`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({recipientEmail:$e})});if(t.ok)We(`Invoice sent successfully to ${$e}`),Te(!1),_e(null),ze("");else{const e=await t.json();We(e.error||"Failed to send invoice email.")}Me(!0)}catch(e){console.error("Error sending invoice email:",e),We("Failed to send invoice email. Please try again."),Me(!0)}},disabled:!$e||!$e.includes("@"),children:"Send Email"})]})]})}),Pe&&(0,a.jsx)(xe,{onClick:()=>Me(!1),children:(0,a.jsxs)(he,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(ue,{children:[(0,a.jsx)(ge,{children:"Success"}),(0,a.jsx)(me,{onClick:()=>Me(!1),children:"\xd7"})]}),(0,a.jsx)(ye,{children:(0,a.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,a.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:Le})})}),(0,a.jsx)(ve,{children:(0,a.jsx)(W,{variant:"primary",onClick:()=>Me(!1),children:"OK"})})]})})]})]})})}}}]);