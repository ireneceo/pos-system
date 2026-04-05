"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8562],{2488:(e,t,n)=>{n.d(t,{DO:()=>p,Jt:()=>u,Qn:()=>c});n(9950);var i=n(4752),r=n(4414);const a=i.Ay.div`
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
`,d=i.Ay.button`
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
`,l=i.Ay.select`
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
`,c=e=>{let{children:t,className:n,style:i,...o}=e;return(0,r.jsx)(a,{className:n,style:i,...o,children:t})},p=e=>{let{placeholder:t="Search...",value:n,onChange:i,style:a,...l}=e;return(0,r.jsxs)(s,{style:a,children:[(0,r.jsx)(o,{placeholder:t,value:n,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:n?"36px":"16px"},...l}),n&&(0,r.jsx)(d,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},u=e=>{let{children:t,...n}=e;return(0,r.jsx)(l,{...n,children:t})}},2597:(e,t,n)=>{n.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});n(9950);var i=n(4752),r=n(4414);const a=i.Ay.div`
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
`,d=e=>{let{children:t,className:n,style:i}=e;return(0,r.jsx)(a,{className:n,style:i,children:t})},l=e=>{let{active:t,onClick:n,children:i,className:a}=e;return(0,r.jsx)(o,{active:t,onClick:n,className:a,children:i})},c=e=>{let{count:t,variant:n="default",showZero:i=!1}=e;return 0!==t||i?(0,r.jsx)(s,{variant:n,children:t}):null}},2653:(e,t,n)=>{n.d(t,{M:()=>a});var i=n(9950),r=n(4492);function a(e){const[t,n]=(0,r.ok)(),a=(0,i.useCallback)(()=>t.get("tab")||e,[t,e]),[o,s]=(0,i.useState)(a());return[o,(0,i.useCallback)(e=>{s(e),n({tab:e})},[n])]}},3705:(e,t,n)=>{n.d(t,{cc:()=>r});var i=n(4752);const r=i.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #EF4444;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;i.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,i.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,i.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${e=>e.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4021:(e,t,n)=>{n.d(t,{i1:()=>o});var i=n(9950),r=n(1367),a=n(6038);const o=()=>{const{user:e}=(0,r.As)(),[t,n]=(0,i.useState)("RM"),[o]=(0,i.useState)(Object.keys(a.DL)),[s,d]=(0,i.useState)(!0),[l,c]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),i=t.indexOf("restaurant");let r=i>=0?t[i+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),i=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";n(i)}else n("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),n("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:s,error:l}}},7617:(e,t,n)=>{n.d(t,{A:()=>x});n(9950);var i=n(7119),r=n(4752),a=n(9610),o=n(4414);const s=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=r.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=r.Ay.button`
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
`,x=e=>{let{isOpen:t,title:n,message:r,onConfirm:x,onCancel:g,confirmText:h="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return t?i.createPortal((0,o.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&g()},style:{zIndex:1100},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(d,{children:[(0,o.jsx)(l,{children:n}),(0,o.jsx)(c,{children:r})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:g,children:m}),(0,o.jsx)(u,{variant:"primary",type:y,onClick:x,children:h})]})]})}),document.body):null}},8562:(e,t,n)=>{n.r(t),n.d(t,{default:()=>we});var i=n(9950),r=n(4752),a=n(4492),o=n(8409),s=n(2597),d=n(2653),l=n(1367),c=n(2853),p=n(3705),u=n(2488),x=n(9610),g=n(7617),h=n(9194),m=n(4021),y=n(6038),b=n(4414);const v=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: stretch;
`,f=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>e.isActive?1:.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,j=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,F=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,w=r.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,k=r.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  background: #FEF3C7;
  color: #92400E;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`,A=r.Ay.div`
  margin-top: 8px;
  padding: 10px 12px;
  background: #F0F7FF;
  border-radius: 8px;
  border: 1px solid #DBEAFE;
`,C=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
`,B=r.Ay.span`
  font-size: 12px;
  color: ${e=>"brand"===e.type?"#6B7280":"my"===e.type?"#2563EB":"#059669"};
  font-weight: ${e=>"applied"===e.type?600:400};
`,_=r.Ay.span`
  font-size: 13px;
  font-weight: ${e=>"applied"===e.type?700:"my"===e.type?600:400};
  color: ${e=>"brand"===e.type?"#9CA3AF":"my"===e.type?"#2563EB":"#059669"};
  text-decoration: none;
`,E=r.Ay.button`
  padding: 4px 10px;
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 4px;
  color: #2563EB;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #DBEAFE;
  }
`,$=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,S=r.Ay.input`
  width: 100px;
  padding: 4px 8px;
  border: 1px solid #BFDBFE;
  border-radius: 4px;
  font-size: 13px;
  text-align: right;

  &:focus {
    outline: none;
    border-color: #2563EB;
  }
`,z=r.Ay.button`
  padding: 4px 8px;
  background: #2563EB;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    background: #1D4ED8;
  }
`,I=r.Ay.button`
  padding: 4px 8px;
  background: #F3F4F6;
  color: #6B7280;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    background: #E5E7EB;
  }
`,D=r.Ay.button`
  padding: 2px 6px;
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 11px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #EF4444;
  }
`,R=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-top: 12px;
`,N=r.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`,T=r.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
  cursor: pointer;
`,M=r.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`,O=r.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E6EBF1;
  transition: 0.3s;
  border-radius: 22px;
  pointer-events: none;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  ${M}:checked + & {
    background-color: #635BFF;
  }

  ${M}:checked + &:before {
    transform: translateX(22px);
  }
`,L=r.Ay.div`
  margin: 12px 0;
`,U=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,q=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,P=r.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,W=r.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,Y=r.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F6F9FC;\n          border: 1px solid #E6EBF1;\n          color: #6B7280;\n          &:hover {\n            border-color: #635BFF;\n            color: #635BFF;\n            background: #F4F3FF;\n            transform: translateY(-1px);\n          }\n        "}}}

  &:active {
    transform: translateY(0);
  }
`,G=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,Q=r.Ay.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
`,Z=r.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,J=r.Ay.div`
  width: 100%;
  height: 150px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  background: #F9FAFB;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,H=r.Ay.div`
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`,K=r.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,X=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,V=(r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,e=>{var t,n,r,a,o;let{brandId:s,restaurantId:d,onCountChange:V,categoryRefreshKey:ee}=e;const{user:te}=(0,l.As)(),{defaultCurrency:ne}=(0,m.i1)(),[ie,re]=(0,i.useState)("RM"),ae=d||(null===te||void 0===te?void 0:te.restaurant_id)||(null===te||void 0===te?void 0:te.restaurantId);(0,i.useEffect)(()=>{ne&&re(ne)},[ne]);const[oe,se]=(0,i.useState)([]),[de,le]=(0,i.useState)([]),[ce,pe]=(0,i.useState)(!0),[ue,xe]=(0,i.useState)(""),[ge,he]=(0,i.useState)("all"),[me,ye]=(0,i.useState)("compact"),[be,ve]=(0,i.useState)(null),[fe,je]=(0,i.useState)(!1),[Fe,we]=(0,i.useState)({recipes:[],products:[]}),[ke,Ae]=(0,i.useState)(null),[Ce,Be]=(0,i.useState)(!1),[_e,Ee]=(0,i.useState)({code:"",name:"",image_url:"",ingredient_category_id:"",unit:"",base_quantity:"1",unit_cost:"",supplier_id:"",min_stock:"0",track_stock:!0}),[$e,Se]=(0,i.useState)([]),[ze,Ie]=(0,i.useState)({isOpen:!1,ingredientId:null,ingredientName:""}),[De,Re]=(0,i.useState)(null),[Ne,Te]=(0,i.useState)(""),[Me,Oe]=(0,i.useState)(""),[Le,Ue]=(0,i.useState)(!1),qe="Restaurant Admin"===(null===te||void 0===te?void 0:te.role),Pe=e=>qe&&"brand"===e.owner_type,We=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,i.useEffect)(()=>{(async()=>{if(!s&&!ae)return;pe(!0);const e=We(),t="Brand General"===(null===te||void 0===te?void 0:te.role)||"Brand Manager"===(null===te||void 0===te?void 0:te.role);try{var n,i,r;const o=[];let d="",l="",c="";t&&s?(d=`/api/brands/${s}/ingredients`,l=`/api/brands/${s}/ingredient-categories`,c=`/api/brands/${s}/suppliers`):qe&&ae&&(d=`/api/restaurants/${ae}/ingredients`,l=`/api/restaurants/${ae}/ingredient-categories`,c=`/api/restaurants/${ae}/all-suppliers`),d&&(o.push(fetch(d,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(l,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(c,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())),qe&&ae&&o.push(fetch(`/api/restaurants/${ae}/brand-ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())));const p=await Promise.all(o);if(null!==(n=p[0])&&void 0!==n&&n.success){var a;let e=Array.isArray(p[0].data)?p[0].data:[];qe&&null!==(a=p[3])&&void 0!==a&&a.success&&Array.isArray(p[3].data)&&(e=[...p[3].data,...e]),se(e)}if(null!==(i=p[1])&&void 0!==i&&i.success)if(Array.isArray(p[1].data))le(p[1].data.filter(e=>e.is_active));else{const e=[...p[1].data.own_categories||[],...p[1].data.brand_categories||[]].filter(e=>e.is_active);le(e)}if(null!==(r=p[2])&&void 0!==r&&r.success)if(Array.isArray(p[2].data))Se(p[2].data.filter(e=>e.is_active));else{const e=[...p[2].data.brand_suppliers||[],...p[2].data.own_suppliers||[]].filter(e=>e.is_active);Se(e)}}catch(o){console.error("Failed to fetch data:",o)}finally{pe(!1)}})()},[s,ae,null===te||void 0===te?void 0:te.role,We,qe]),(0,i.useEffect)(()=>{ee&&(s||ae)&&Ye()},[ee]);const Ye=async()=>{try{let e="";if("Brand General"===(null===te||void 0===te?void 0:te.role)||"Brand Manager"===(null===te||void 0===te?void 0:te.role)?s&&(e=`/api/brands/${s}/ingredient-categories`):"Restaurant Admin"===(null===te||void 0===te?void 0:te.role)&&ae&&(e=`/api/restaurants/${ae}/ingredient-categories`),!e)return;const t=We(),n=await fetch(e,{headers:{Authorization:`Bearer ${t}`}}),i=await n.json();if(i.success)if(Array.isArray(i.data))le(i.data.filter(e=>e.is_active));else{const e=[...i.data.own_categories||[],...i.data.brand_categories||[]].filter(e=>e.is_active);le(e)}}catch(e){console.error("Failed to fetch ingredient categories:",e)}},Ge=async e=>{if(ae&&Ne){Ue(!0);try{const t=We(),n=await fetch(`/api/restaurants/${ae}/ingredient-costs/${e}`,{method:"PUT",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify({unit_cost:parseFloat(Ne),notes:Me||null})});(await n.json()).success&&(se(t=>t.map(t=>t.id===e?{...t,restaurant_cost:parseFloat(Ne),effective_cost:parseFloat(Ne),cost_notes:Me||null}:t)),Re(null))}catch(t){console.error("Failed to save my cost:",t)}finally{Ue(!1)}}},Qe=e=>{Ie({isOpen:!0,ingredientId:e.id,ingredientName:e.name})},Ze=e=>{var t,n,i;e?(Ae(e),Ee({code:e.code||"",name:e.name,image_url:e.image_url||"",ingredient_category_id:(null===(t=e.ingredient_category_id)||void 0===t?void 0:t.toString())||"",unit:e.unit,base_quantity:(null===(n=e.base_quantity)||void 0===n?void 0:n.toString())||"1",unit_cost:e.unit_cost.toString(),supplier_id:e.supplier_id||"",min_stock:(null===(i=e.min_stock)||void 0===i?void 0:i.toString())||"0",track_stock:e.track_stock||!1})):(Ae(null),Ee({code:"",name:"",image_url:"",ingredient_category_id:"",unit:"",base_quantity:"1",unit_cost:"",supplier_id:"",min_stock:"0",track_stock:!0}));Be(!0)},Je=()=>{Be(!1),Ae(null),Ee({code:"",name:"",image_url:"",ingredient_category_id:"",unit:"",base_quantity:"1",unit_cost:"",supplier_id:"",min_stock:"0",track_stock:!0})},He=oe.filter(e=>{var t;const n=e.name.toLowerCase().includes(ue.toLowerCase()),i="all"===ge||(null===(t=e.ingredient_category_id)||void 0===t?void 0:t.toString())===ge;return n&&i}),Ke=[{id:"all",name:"All Categories"},...de.map(e=>({id:e.id.toString(),name:e.name}))];return(0,i.useEffect)(()=>{V(oe.length)},[oe.length,V]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,b.jsxs)(u.Qn,{style:{marginBottom:0,flex:1},children:[(0,b.jsx)(u.DO,{type:"text",placeholder:"Search ingredients...",value:ue,onChange:e=>xe(e.target.value)}),(0,b.jsx)(u.Jt,{value:ge,onChange:e=>he(e.target.value),children:Ke.map(e=>(0,b.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,b.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[(0,b.jsxs)("div",{style:{display:"flex",background:"#F3F4F6",borderRadius:"6px",padding:"2px"},children:[(0,b.jsx)("button",{onClick:()=>ye("compact"),style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"compact"===me?"white":"transparent",color:"compact"===me?"#0A2540":"#6B7C93",boxShadow:"compact"===me?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Compact"}),(0,b.jsx)("button",{onClick:()=>ye("image"),style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"image"===me?"white":"transparent",color:"image"===me?"#0A2540":"#6B7C93",boxShadow:"image"===me?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Image"})]}),(0,b.jsx)(p.cc,{variant:"primary",onClick:()=>Ze(null),children:"New Ingredient"})]})]}),ce?(0,b.jsx)(c.pp,{children:(0,b.jsx)(K,{children:"Loading..."})}):0===He.length?(0,b.jsxs)(c.pp,{children:[(0,b.jsx)(K,{children:"No ingredients found"}),(0,b.jsx)(X,{children:ue||"all"!==ge?"Try adjusting your filters":"Create your first ingredient to get started"}),!ue&&"all"===ge&&(0,b.jsx)(p.cc,{variant:"primary",onClick:()=>Ze(null),children:"Create First Ingredient"})]}):(0,b.jsx)(v,{children:He.map(e=>{var t,n,i,r,a;return(0,b.jsxs)(f,{isActive:e.is_active,onClick:()=>{ve(e),je(!0),we({recipes:[],products:[]});const t=localStorage.getItem("auth_token");fetch(`/api/restaurants/${ae}/ingredients/${e.id}/usage`,{headers:{Authorization:`Bearer ${t}`}}).then(e=>e.json()).then(e=>{e.success&&we(e.data)}).catch(()=>{})},children:["image"===me&&e.image_url&&(0,b.jsx)(Q,{children:(0,b.jsx)(Z,{src:e.image_url,alt:e.name})}),(0,b.jsx)(j,{children:(0,b.jsxs)("div",{children:[(0,b.jsxs)(F,{children:[e.name,qe&&"brand"===e.owner_type&&(0,b.jsx)(k,{children:"Brand"})]}),(0,b.jsxs)(w,{children:[null===(t=e.ingredientCategory)||void 0===t?void 0:t.emoji," ",(null===(n=e.ingredientCategory)||void 0===n?void 0:n.name)||"Uncategorized"]})]})}),(0,b.jsxs)(L,{children:[qe&&"brand"===e.owner_type?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(A,{children:[(0,b.jsxs)(C,{children:[(0,b.jsx)(B,{type:"brand",children:"Brand Cost"}),(0,b.jsxs)(_,{type:"brand",children:[(0,y.vv)(Number(e.unit_cost),ie),"/",e.unit]})]}),De===e.id?(0,b.jsx)("div",{style:{marginTop:6},children:(0,b.jsxs)(C,{children:[(0,b.jsx)(B,{type:"my",children:"My Cost"}),(0,b.jsxs)($,{children:[(0,b.jsx)(S,{type:"number",step:"0.01",min:"0",value:Ne,onChange:e=>Te(e.target.value),autoFocus:!0,onKeyDown:t=>{"Enter"===t.key&&Ge(e.id),"Escape"===t.key&&Re(null)}}),(0,b.jsx)(z,{onClick:()=>Ge(e.id),disabled:Le,children:Le?"...":"Save"}),(0,b.jsx)(I,{onClick:()=>Re(null),children:"\u2715"})]})]})}):null!==e.restaurant_cost&&void 0!==e.restaurant_cost?(0,b.jsxs)(C,{style:{marginTop:4},children:[(0,b.jsxs)(B,{type:"my",children:["My Cost",(0,b.jsx)(E,{style:{marginLeft:6,padding:"2px 6px",fontSize:"10px"},onClick:t=>{t.stopPropagation(),Re(e.id),Te(String(e.restaurant_cost)),Oe(e.cost_notes||"")},children:"Edit"}),(0,b.jsx)(D,{onClick:t=>{t.stopPropagation(),(async e=>{if(ae)try{const t=We(),n=await fetch(`/api/restaurants/${ae}/ingredient-costs/${e.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}});(await n.json()).success&&se(t=>t.map(t=>t.id===e.id?{...t,restaurant_cost:null,effective_cost:t.unit_cost,cost_notes:null}:t))}catch(t){console.error("Failed to reset my cost:",t)}})(e)},children:"Reset"})]}),(0,b.jsxs)(_,{type:"my",children:[(0,y.vv)(Number(e.restaurant_cost),ie),"/",e.unit]})]}):(0,b.jsxs)(C,{style:{marginTop:4},children:[(0,b.jsx)(B,{type:"my",children:"My Cost"}),(0,b.jsx)(E,{onClick:t=>{t.stopPropagation(),Re(e.id),Te(""),Oe("")},children:"Set Cost"})]}),(0,b.jsxs)(C,{style:{marginTop:6,borderTop:"1px solid #DBEAFE",paddingTop:6},children:[(0,b.jsx)(B,{type:"applied",children:"Applied"}),(0,b.jsxs)(_,{type:"applied",children:[(0,y.vv)(Number(null!==(i=e.effective_cost)&&void 0!==i?i:e.unit_cost),ie),"/",e.unit," ",null!==e.restaurant_cost&&void 0!==e.restaurant_cost?"\u2713":""]})]})]}),e.cost_notes&&(0,b.jsx)(U,{children:(0,b.jsx)(q,{style:{fontSize:"11px",color:"#9CA3AF",fontStyle:"italic"},children:e.cost_notes})})]}):(0,b.jsxs)(U,{children:[(0,b.jsx)(q,{children:"Unit Cost"}),(0,b.jsx)(P,{children:(0,y.vv)(Number(e.unit_cost),ie)})]}),(0,b.jsxs)(U,{children:[(0,b.jsx)(q,{children:"Base Qty / Unit"}),(0,b.jsxs)(P,{children:[Number(e.base_quantity||1)," ",e.unit]})]}),((null===(r=e.supplier)||void 0===r?void 0:r.name)||e.supplier_name)&&(0,b.jsxs)(U,{children:[(0,b.jsx)(q,{children:"Supplier"}),(0,b.jsx)(P,{children:(null===(a=e.supplier)||void 0===a?void 0:a.name)||e.supplier_name})]}),e.code&&(0,b.jsxs)(U,{children:[(0,b.jsx)(q,{children:"Code"}),(0,b.jsx)(P,{children:e.code})]})]}),(0,b.jsx)("div",{style:{marginTop:"auto"}}),qe&&(0,b.jsxs)(R,{children:[(0,b.jsx)(N,{children:"Track in Inventory"}),(0,b.jsxs)(T,{children:[(0,b.jsx)(M,{type:"checkbox",checked:e.track_stock||!1,onChange:t=>{t.stopPropagation(),(async(e,t)=>{try{let n="";"Brand General"===(null===te||void 0===te?void 0:te.role)||"Brand Manager"===(null===te||void 0===te?void 0:te.role)?n=`/api/brands/${s}/ingredients/${e.id}`:"Restaurant Admin"===(null===te||void 0===te?void 0:te.role)&&(n=`/api/restaurants/${ae}/ingredients/${e.id}`);const i=localStorage.getItem("auth_token"),r=await fetch(n,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({code:e.code,name:e.name,image_url:e.image_url,ingredient_category_id:e.ingredient_category_id,unit:e.unit,base_quantity:e.base_quantity,unit_cost:e.unit_cost,supplier_id:e.supplier_id,supplier_name:e.supplier_name,min_stock:e.min_stock,is_active:e.is_active,track_stock:t})}),a=await r.json();a.success?se(n=>n.map(n=>n.id===e.id?{...n,track_stock:t}:n)):alert(a.error||"Failed to update track stock")}catch(n){console.error("Failed to toggle track stock:",n)}})(e,t.target.checked)}}),(0,b.jsx)(O,{})]})]}),!Pe(e)&&(0,b.jsxs)(W,{children:[(0,b.jsx)(Y,{variant:"secondary",onClick:t=>{t.stopPropagation(),Ze(e)},children:"Edit"}),(0,b.jsx)(Y,{variant:"danger",onClick:t=>{t.stopPropagation(),Qe(e)},children:"Delete"})]})]},e.id)})}),(0,b.jsx)(x.aF,{isOpen:Ce,onClose:Je,title:ke?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,b.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),_e.name&&_e.ingredient_category_id&&_e.unit&&_e.unit_cost)try{var t;let e="";const n=ke?"PUT":"POST";"Brand General"===(null===te||void 0===te?void 0:te.role)||"Brand Manager"===(null===te||void 0===te?void 0:te.role)?e=ke?`/api/brands/${s}/ingredients/${ke.id}`:`/api/brands/${s}/ingredients`:"Restaurant Admin"===(null===te||void 0===te?void 0:te.role)&&(e=ke?`/api/restaurants/${ae}/ingredients/${ke.id}`:`/api/restaurants/${ae}/ingredients`);const i=localStorage.getItem("auth_token"),r=await fetch(e,{method:n,headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({code:_e.code,name:_e.name,image_url:_e.image_url||null,ingredient_category_id:_e.ingredient_category_id?parseInt(_e.ingredient_category_id):null,unit:_e.unit,supplier_id:_e.supplier_id?Number(_e.supplier_id):null,supplier_name:_e.supplier_id&&(null===(t=$e.find(e=>e.id===Number(_e.supplier_id)))||void 0===t?void 0:t.name)||"",base_quantity:parseFloat(_e.base_quantity)||1,unit_cost:parseFloat(_e.unit_cost),min_stock:parseInt(_e.min_stock)||0,track_stock:_e.track_stock})}),a=await r.json();a.success?(Je(),(async()=>{try{const e=We();if("Brand General"===(null===te||void 0===te?void 0:te.role)||"Brand Manager"===(null===te||void 0===te?void 0:te.role)){if(s){const t=await fetch(`/api/brands/${s}/ingredients`,{headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success&&se(n.data)}}else if("Restaurant Admin"===(null===te||void 0===te?void 0:te.role)&&ae){const[t,n]=await Promise.all([fetch(`/api/restaurants/${ae}/ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(`/api/restaurants/${ae}/brand-ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())]);let i=[];n.success&&Array.isArray(n.data)&&(i=[...n.data]),t.success&&Array.isArray(t.data)&&(i=[...i,...t.data]),se(i)}}catch(e){console.error("Failed to fetch ingredients:",e)}})()):alert(a.error||"\uc7ac\ub8cc \uc800\uc7a5 \uc2e4\ud328")}catch(n){console.error("Failed to save ingredient:",n)}else alert("Please fill in all required fields")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,b.jsxs)(x.gE,{children:[(0,b.jsx)(x.lR,{children:"Image"}),(0,b.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(n){const e=new FileReader;e.onloadend=()=>{Ee({..._e,image_url:e.result})},e.readAsDataURL(n)}},style:{display:"none"},id:"ingredient-image-upload"}),(0,b.jsx)(J,{onClick:()=>{var e;return null===(e=document.getElementById("ingredient-image-upload"))||void 0===e?void 0:e.click()},children:_e.image_url?(0,b.jsx)("img",{src:_e.image_url,alt:"Ingredient"}):(0,b.jsx)(H,{children:"Click to upload image"})})]}),(0,b.jsxs)(x.fh,{children:[(0,b.jsxs)(x.gE,{children:[(0,b.jsx)(x.lR,{children:"Ingredient Name *"}),(0,b.jsx)(x.ZQ,{type:"text",value:_e.name,onChange:e=>Ee({..._e,name:e.target.value}),placeholder:"e.g., Rice",required:!0})]}),(0,b.jsxs)(x.gE,{children:[(0,b.jsx)(x.lR,{children:"Code"}),(0,b.jsx)(x.ZQ,{type:"text",value:_e.code,onChange:e=>Ee({..._e,code:e.target.value}),placeholder:"ING-001"})]})]}),(0,b.jsxs)(x.fh,{children:[(0,b.jsxs)(x.gE,{children:[(0,b.jsx)(x.lR,{children:"Category *"}),(0,b.jsxs)(x.FX,{value:_e.ingredient_category_id,onChange:e=>Ee({..._e,ingredient_category_id:e.target.value}),required:!0,children:[(0,b.jsx)("option",{value:"",children:"Select category..."}),de.map(e=>(0,b.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,b.jsxs)(x.gE,{children:[(0,b.jsx)(x.lR,{children:"Supplier"}),(0,b.jsx)(h.A,{options:$e.map(e=>({value:e.id,label:e.name,subLabel:"brand"===e.owner_type?"Brand":void 0})),value:_e.supplier_id||null,onChange:e=>Ee({..._e,supplier_id:e||""}),placeholder:"Select supplier...",noOptionsMessage:"No suppliers found"})]})]}),(0,b.jsxs)(x.fh,{children:[(0,b.jsxs)(x.gE,{children:[(0,b.jsx)(x.lR,{children:"Base Quantity *"}),(0,b.jsx)(x.ZQ,{type:"number",step:"0.01",min:"0.01",value:_e.base_quantity,onChange:e=>Ee({..._e,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,b.jsxs)(x.gE,{children:[(0,b.jsx)(x.lR,{children:"Unit *"}),(0,b.jsxs)(x.FX,{value:_e.unit,onChange:e=>Ee({..._e,unit:e.target.value}),required:!0,children:[(0,b.jsx)("option",{value:"",children:"Select unit..."}),(0,b.jsx)("option",{value:"kg",children:"kg"}),(0,b.jsx)("option",{value:"g",children:"g"}),(0,b.jsx)("option",{value:"L",children:"L"}),(0,b.jsx)("option",{value:"ml",children:"ml"}),(0,b.jsx)("option",{value:"piece",children:"piece"}),(0,b.jsx)("option",{value:"pack",children:"pack"}),(0,b.jsx)("option",{value:"can",children:"can"}),(0,b.jsx)("option",{value:"bottle",children:"bottle"})]})]})]}),(0,b.jsxs)(x.fh,{children:[(0,b.jsxs)(x.gE,{children:[(0,b.jsxs)(x.lR,{children:["Unit Cost (",ie,") *"]}),(0,b.jsx)(x.ZQ,{type:"number",step:"0.01",value:_e.unit_cost,onChange:e=>Ee({..._e,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]}),(0,b.jsxs)(x.gE,{children:[(0,b.jsx)(x.lR,{children:"Minimum Stock"}),(0,b.jsx)(x.ZQ,{type:"number",value:_e.min_stock,onChange:e=>Ee({..._e,min_stock:e.target.value}),placeholder:"0"})]})]}),(0,b.jsxs)(G,{children:[(0,b.jsx)(x.yl,{type:"button",variant:"secondary",onClick:Je,children:"Cancel"}),(0,b.jsx)(x.yl,{type:"submit",variant:"primary",children:ke?"Update Ingredient":"Create Ingredient"})]})]})}),(0,b.jsx)(g.A,{isOpen:ze.isOpen,title:"Delete Ingredient",message:`Are you sure you want to delete "${ze.ingredientName}"? This action cannot be undone.`,onConfirm:async()=>{if(ze.ingredientId)try{let e="";"Brand General"===(null===te||void 0===te?void 0:te.role)||"Brand Manager"===(null===te||void 0===te?void 0:te.role)?e=`/api/brands/${s}/ingredients/${ze.ingredientId}`:"Restaurant Admin"===(null===te||void 0===te?void 0:te.role)&&(e=`/api/restaurants/${ae}/ingredients/${ze.ingredientId}`);const t=We(),n=await fetch(e,{method:"DELETE",headers:{Authorization:`Bearer ${t}`}}),i=await n.json();i.success?se(e=>e.filter(e=>e.id!==ze.ingredientId)):console.error("Delete failed:",i.error)}catch(e){console.error("Failed to delete ingredient:",e)}finally{Ie({isOpen:!1,ingredientId:null,ingredientName:""})}},onCancel:()=>{Ie({isOpen:!1,ingredientId:null,ingredientName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"}),fe&&be&&(0,b.jsxs)(x.aF,{isOpen:fe,onClose:()=>je(!1),title:be.name,size:"medium",children:[be.image_url&&(0,b.jsx)("div",{style:{marginBottom:"16px",borderRadius:"8px",overflow:"hidden"},children:(0,b.jsx)("img",{src:be.image_url,alt:be.name,style:{width:"100%",maxHeight:"200px",objectFit:"cover"}})}),(0,b.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"16px"},children:[(0,b.jsxs)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,b.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"4px"},children:"Category"}),(0,b.jsxs)("div",{style:{fontSize:"14px",fontWeight:500},children:[null===(t=be.ingredientCategory)||void 0===t?void 0:t.emoji," ",(null===(n=be.ingredientCategory)||void 0===n?void 0:n.name)||"Uncategorized"]})]}),(0,b.jsxs)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,b.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"4px"},children:"Unit Cost"}),(0,b.jsxs)("div",{style:{fontSize:"14px",fontWeight:600},children:[(0,y.vv)(Number(null!==(r=be.effective_cost)&&void 0!==r?r:be.unit_cost),ie)," / ",be.unit]})]}),(0,b.jsxs)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,b.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"4px"},children:"Base Quantity"}),(0,b.jsxs)("div",{style:{fontSize:"14px",fontWeight:500},children:[Number(be.base_quantity||1)," ",be.unit]})]}),(0,b.jsxs)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,b.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"4px"},children:"Stock"}),(0,b.jsx)("div",{style:{fontSize:"14px",fontWeight:500},children:be.track_stock?`${Number(be.current_stock||0).toFixed(1)} ${be.unit}`:"Not tracked"})]})]}),((null===(a=be.supplier)||void 0===a?void 0:a.name)||be.supplier_name)&&(0,b.jsxs)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px",marginBottom:"12px"},children:[(0,b.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"4px"},children:"Supplier"}),(0,b.jsx)("div",{style:{fontSize:"14px",fontWeight:500},children:(null===(o=be.supplier)||void 0===o?void 0:o.name)||be.supplier_name})]}),be.code&&(0,b.jsxs)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px",marginBottom:"12px"},children:[(0,b.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"4px"},children:"Code"}),(0,b.jsx)("div",{style:{fontSize:"14px",fontWeight:500},children:be.code})]}),(0,b.jsxs)("div",{style:{padding:"12px",background:"#F0F4FF",borderRadius:"8px",border:"1px solid #DBEAFE",marginBottom:"16px"},children:[(0,b.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#1E40AF",marginBottom:"8px"},children:"Used In"}),0===Fe.recipes.length&&0===Fe.products.length?(0,b.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Not linked to any recipe or menu yet."}):(0,b.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[Fe.recipes.map(e=>(0,b.jsxs)("div",{style:{fontSize:"13px",color:"#1E40AF"},children:[(0,b.jsx)("span",{style:{fontSize:"11px",background:"#EFF6FF",padding:"1px 6px",borderRadius:"3px",marginRight:"6px"},children:"Recipe"}),e.name]},"r"+e.id)),Fe.products.map(e=>(0,b.jsxs)("div",{style:{fontSize:"13px",color:"#059669"},children:[(0,b.jsx)("span",{style:{fontSize:"11px",background:"#ECFDF5",padding:"1px 6px",borderRadius:"3px",marginRight:"6px"},children:"Menu"}),e.name]},"p"+e.id))]})]}),!Pe(be)&&(0,b.jsxs)("div",{style:{display:"flex",gap:"8px",justifyContent:"flex-end"},children:[(0,b.jsx)(x.yl,{variant:"secondary",onClick:()=>{je(!1),Ze(be)},children:"Edit"}),(0,b.jsx)(x.yl,{variant:"danger",onClick:()=>{je(!1),Qe(be)},children:"Delete"})]})]})]})}),ee=r.Ay.div`
  padding: 24px 0;
`,te=r.Ay.div`
  display: grid;
  gap: 12px;
`,ne=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${e=>!1!==e.isActive?1:.6};
  ${e=>e.readOnly&&"\n    background: #F9FAFB;\n    border: 1px dashed #D1D5DB;\n  "}

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,ie=r.Ay.div`
  flex: 1;
`,re=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,ae=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,oe=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,se=r.Ay.div`
  display: flex;
  gap: 8px;
`,de=r.Ay.button`
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
    transition: color 0.15s;
  }
`,le=r.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ce=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,pe=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,ue=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,xe=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  margin-left: 8px;
`,ge=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,he=r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,me=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,ye=r.Ay.button`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: ${e=>e.selected?"#E5E7EB":"white"};
  border: 1px solid ${e=>e.selected?"#9CA3AF":"#E5E7EB"};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${e=>e.selected?"#E5E7EB":"#F3F4F6"};
  }
`,be=r.Ay.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #FFFBEB;
  border-radius: 12px;
  border: 1px solid #FDE68A;
`,ve=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #92400E;
  font-weight: 500;
`,fe=e=>{let{brandId:t,restaurantId:n,onCountChange:r,onCategoryChange:a}=e;const{user:s}=(0,l.As)(),d=n||(null===s||void 0===s?void 0:s.restaurant_id)||(null===s||void 0===s?void 0:s.restaurantId),[u,h]=(0,i.useState)([]),[m,y]=(0,i.useState)([]),[v,f]=(0,i.useState)(!0),[j,F]=(0,i.useState)(!1),[w,k]=(0,i.useState)(null),[A,C]=(0,i.useState)(!1),[B,_]=(0,i.useState)(null),[E,$]=(0,i.useState)({name:"",emoji:"",description:""}),S="Restaurant Admin"===(null===s||void 0===s?void 0:s.role),z="Brand General"===(null===s||void 0===s?void 0:s.role)||"Brand Manager"===(null===s||void 0===s?void 0:s.role),I=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,i.useEffect)(()=>{(async()=>{f(!0);const e=I();try{if(z&&t){const n=await fetch(`/api/brands/${t}/ingredient-categories`,{headers:{Authorization:`Bearer ${e}`}}),i=await n.json();i.success&&(h(i.data),r(i.data.length))}else if(S&&d){const t=await fetch(`/api/restaurants/${d}/ingredient-categories`,{headers:{Authorization:`Bearer ${e}`}}),a=await t.json();var n,i;if(a.success)h(a.data.own_categories||[]),y(a.data.brand_categories||[]),r(((null===(n=a.data.own_categories)||void 0===n?void 0:n.length)||0)+((null===(i=a.data.brand_categories)||void 0===i?void 0:i.length)||0))}}catch(a){console.error("Failed to fetch data:",a)}finally{f(!1)}})()},[t,d,z,S,I,r]);const D=async()=>{try{const i=I();if(z&&t){const e=await fetch(`/api/brands/${t}/ingredient-categories`,{headers:{Authorization:`Bearer ${i}`}}),n=await e.json();n.success&&(h(n.data),r(n.data.length))}else if(S&&d){const t=await fetch(`/api/restaurants/${d}/ingredient-categories`,{headers:{Authorization:`Bearer ${i}`}}),a=await t.json();var e,n;if(a.success)h(a.data.own_categories||[]),y(a.data.brand_categories||[]),r(((null===(e=a.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(n=a.data.brand_categories)||void 0===n?void 0:n.length)||0))}}catch(i){console.error("Failed to fetch categories:",i)}},R=e=>{e?(k(e),$({name:e.name,emoji:e.emoji||"",description:e.description||""})):(k(null),$({name:"",emoji:"",description:""})),F(!0)},N=()=>{F(!1),k(null),$({name:"",emoji:"",description:""})},T=async e=>{if(e.preventDefault(),E.name.trim())try{const e=localStorage.getItem("auth_token");let n="";const i=w?"PUT":"POST";if(z&&t?n=w?`/api/brands/${t}/ingredient-categories/${w.id}`:`/api/brands/${t}/ingredient-categories`:S&&d&&(n=w?`/api/restaurants/${d}/ingredient-categories/${w.id}`:`/api/restaurants/${d}/ingredient-categories`),!n)return;const r=await fetch(n,{method:i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:E.name.trim(),emoji:E.emoji||null,description:E.description.trim()||null})}),o=await r.json();o.success?(N(),D(),null===a||void 0===a||a()):alert(o.error||"Failed to save")}catch(n){console.error("Failed to save category:",n),alert("Failed to save")}},M=async(e,n)=>{const i="up"===n?e-1:e+1;if(i<0||i>=u.length)return;const r=[...u];[r[e],r[i]]=[r[i],r[e]];const a=r.map((e,t)=>({id:e.id,display_order:t}));try{const e=localStorage.getItem("auth_token");let n="";if(z&&t?n=`/api/brands/${t}/ingredient-categories/reorder`:S&&d&&(n=`/api/restaurants/${d}/ingredient-categories/reorder`),!n)return;await fetch(n,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:a})}),D()}catch(o){console.error("Failed to reorder:",o)}},O=function(e,t,n){let i=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,b.jsxs)(ne,{isActive:e.is_active,readOnly:i,children:[!i&&(0,b.jsx)(o.Xd,{onMoveUp:()=>M(t,"up"),onMoveDown:()=>M(t,"down"),disableUp:0===t,disableDown:t===n.length-1}),e.emoji&&(0,b.jsx)(he,{children:e.emoji}),(0,b.jsxs)(ie,{children:[(0,b.jsxs)(re,{children:[e.name,i&&(0,b.jsx)(xe,{children:"Brand"})]}),(0,b.jsxs)(ae,{children:[(0,b.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),!i&&(0,b.jsx)(ge,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,b.jsx)(oe,{children:e.description})]}),!i&&(0,b.jsxs)(se,{children:[(0,b.jsx)(de,{onClick:()=>R(e),title:"Edit",children:(0,b.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,b.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,b.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,b.jsx)(de,{onClick:()=>(e=>{_(e),C(!0)})(e),title:"Delete",children:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,b.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return v?(0,b.jsx)(ee,{children:(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,b.jsxs)(ee,{children:[(0,b.jsxs)(pe,{children:[(0,b.jsx)(ue,{children:"Ingredient Categories"}),(0,b.jsx)(p.cc,{variant:"primary",onClick:()=>R(),children:"Add Category"})]}),S&&m.length>0&&(0,b.jsxs)(be,{children:[(0,b.jsx)(ve,{children:"Brand Categories (Read Only)"}),(0,b.jsx)(te,{children:m.map((e,t)=>O(e,t,m,!0))})]}),0===u.length?(0,b.jsxs)(c.pp,{children:[(0,b.jsx)(le,{children:"No ingredient categories yet"}),(0,b.jsx)(ce,{children:"Create categories to organize your ingredients"}),(0,b.jsx)(p.cc,{variant:"primary",onClick:()=>R(),children:"Add Category"})]}):(0,b.jsx)(te,{children:u.map((e,t)=>{return O(e,t,u,(n=e,S&&"brand"===n.owner_type));var n})}),(0,b.jsx)(x.aF,{isOpen:j,onClose:N,title:(w?"Edit":"New")+" Ingredient Category",size:"medium",footer:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(x.yl,{variant:"secondary",onClick:N,children:"Cancel"}),(0,b.jsx)(x.yl,{variant:"primary",onClick:T,disabled:!E.name.trim(),children:w?"Update":"Create"})]}),children:(0,b.jsxs)("form",{onSubmit:T,children:[(0,b.jsxs)(x.gE,{children:[(0,b.jsx)(x.lR,{children:"Category Name *"}),(0,b.jsx)(x.ZQ,{type:"text",value:E.name,onChange:e=>$({...E,name:e.target.value}),placeholder:"e.g., Vegetables",autoFocus:!0,required:!0})]}),(0,b.jsxs)(x.gE,{children:[(0,b.jsx)(x.lR,{children:"Icon"}),(0,b.jsx)(me,{children:["\ud83e\udd6c","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83c\udf36\ufe0f","\ud83e\udd52","\ud83c\udf3d","\ud83e\udd66","\ud83c\udf56","\ud83e\udd69","\ud83c\udf57","\ud83e\udd53","\ud83c\udf64","\ud83e\udd90","\ud83e\udd91","\ud83d\udc1f","\ud83e\udd9e","\ud83e\udd80","\ud83e\udd5b","\ud83e\uddc0","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf76","\ud83e\uddc2","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf6f","\ud83c\udf3e","\ud83c\udf5a","\ud83c\udf5e","\ud83e\udd56","\ud83e\udd50","\ud83e\uddc1","\ud83c\udf70","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf6b","\ud83c\udf4b","\ud83c\udf4a","\ud83c\udf4e","\ud83c\udf50","\ud83c\udf4c","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83c\udf51","\ud83e\udd6d","\ud83e\uddca","\ud83d\udca7","\ud83e\uded9","\ud83c\udf7e","\ud83e\udd6b","\ud83e\uddf4","\ud83c\udf75","\u2615","\ud83e\uddc3","\ud83e\udd64"].map(e=>(0,b.jsx)(ye,{selected:E.emoji===e,onClick:()=>$({...E,emoji:e}),type:"button",children:e},e))})]}),(0,b.jsxs)(x.gE,{children:[(0,b.jsx)(x.lR,{children:"Description"}),(0,b.jsx)(x.Lz,{value:E.description,onChange:e=>$({...E,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,b.jsx)(g.A,{isOpen:A,onCancel:()=>{C(!1),_(null)},onConfirm:async()=>{if(B)try{const e=localStorage.getItem("auth_token");let n="";if(z&&t?n=`/api/brands/${t}/ingredient-categories/${B.id}`:S&&d&&(n=`/api/restaurants/${d}/ingredient-categories/${B.id}`),!n)return;const i=await fetch(n,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),r=await i.json();r.success?(C(!1),_(null),D(),null===a||void 0===a||a()):alert(r.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:B?`Are you sure you want to delete "${B.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},je=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,Fe=r.Ay.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  cursor: pointer;
  min-width: 200px;

  &:hover {
    border-color: #CBD5E1;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,we=()=>{const{user:e}=(0,l.As)(),{restaurantId:t}=(0,a.g)(),[n,r]=(0,a.ok)(),[c,p]=(0,d.M)("ingredients"),[u,x]=(0,i.useState)(0),[g,h]=(0,i.useState)(0),[m,y]=(0,i.useState)([]),[v,f]=(0,i.useState)(!0),[j,F]=(0,i.useState)(0),w=n.get("brandId"),k=w?Number(w):m.length>0?m[0].id:null;(0,i.useEffect)(()=>{e&&"Brand General"===e.role?A():f(!1)},[e]);const A=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();y(e),e.length>0&&!w&&r({tab:c,brandId:String(e[0].id)})}}catch(e){console.error("Error fetching brands:",e)}finally{f(!1)}},C=e=>{p(e),k&&r(t=>(t.set("tab",e),t.set("brandId",String(k)),t))};return v?(0,b.jsxs)(o.mc,{children:[(0,b.jsx)(o.Y9,{children:(0,b.jsx)(o.hE,{children:"Ingredients"})}),(0,b.jsx)(o.UC,{children:(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]}):(0,b.jsxs)(o.mc,{children:[(0,b.jsxs)(o.Y9,{children:[(0,b.jsx)(o.hE,{children:"Ingredients"}),"Brand General"===(null===e||void 0===e?void 0:e.role)&&m.length>0&&(0,b.jsx)(je,{children:(0,b.jsx)(Fe,{value:k||"",onChange:e=>{return t=Number(e.target.value),void r({tab:c,brandId:String(t)});var t},children:m.map(e=>(0,b.jsx)("option",{value:e.id,children:e.name},e.id))})})]}),(0,b.jsxs)(o.UC,{children:[(0,b.jsxs)(s.tU,{children:[(0,b.jsxs)(s.oz,{active:"ingredients"===c,onClick:()=>C("ingredients"),children:["Ingredients ",(0,b.jsx)(s.Ex,{count:u,showZero:!0})]}),(0,b.jsxs)(s.oz,{active:"ingredient-categories"===c,onClick:()=>C("ingredient-categories"),children:["Categories ",(0,b.jsx)(s.Ex,{count:g,showZero:!0})]})]}),(k||"Brand General"!==(null===e||void 0===e?void 0:e.role))&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{style:{display:"ingredients"===c?"block":"none"},children:(0,b.jsx)(V,{brandId:k,restaurantId:t?Number(t):null,onCountChange:x,categoryRefreshKey:j})}),(0,b.jsx)("div",{style:{display:"ingredient-categories"===c?"block":"none"},children:(0,b.jsx)(fe,{brandId:k,restaurantId:t?Number(t):null,onCountChange:h,onCategoryChange:()=>F(e=>e+1)})})]})]})]})}},9194:(e,t,n)=>{n.d(t,{A:()=>m});var i=n(9950),r=n(4752),a=n(4414);const o=r.Ay.div`
  position: relative;
  width: 100%;
`,s=r.Ay.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid ${e=>e.isOpen?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  background: ${e=>e.disabled?"#F9FAFB":"white"};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  transition: all 0.2s;

  &:hover {
    border-color: ${e=>e.disabled?"#E6EBF1":"#635BFF"};
  }

  ${e=>e.isOpen&&"\n    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);\n  "}
`,d=r.Ay.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: ${e=>e.disabled?"#9CA3AF":"#0A2540"};
  cursor: ${e=>e.disabled?"not-allowed":"text"};

  &::placeholder {
    color: #9CA3AF;
  }
`,l=r.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: #E5E7EB;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 8px;
  transition: background 0.2s;

  &:hover {
    background: #D1D5DB;
  }

  svg {
    width: 12px;
    height: 12px;
    color: #6B7280;
  }
`,c=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  transform: ${e=>e.isOpen?"rotate(180deg)":"rotate(0deg)"};

  svg {
    width: 16px;
    height: 16px;
    color: #6B7280;
  }
`,p=r.Ay.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 240px;
  overflow-y: auto;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: ${e=>e.isOpen?"block":"none"};
`,u=r.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.isSelected?"#F0F4FF":e.isHighlighted?"#F9FAFB":"white"};
  color: ${e=>e.isSelected?"#635BFF":"#0A2540"};
  font-weight: ${e=>e.isSelected?"500":"400"};
  transition: background 0.15s;

  &:hover {
    background: ${e=>e.isSelected?"#F0F4FF":"#F9FAFB"};
  }
`,x=r.Ay.div`
  font-size: 14px;
`,g=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,h=r.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,m=e=>{let{options:t,value:n,onChange:r,placeholder:m="Select...",disabled:y=!1,allowClear:b=!0,noOptionsMessage:v="No options found"}=e;const[f,j]=(0,i.useState)(!1),[F,w]=(0,i.useState)(""),[k,A]=(0,i.useState)(-1),C=(0,i.useRef)(null),B=(0,i.useRef)(null),_=t.find(e=>e.value===n),E=t.filter(e=>e.label.toLowerCase().includes(F.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(F.toLowerCase()));(0,i.useEffect)(()=>{const e=e=>{C.current&&!C.current.contains(e.target)&&(j(!1),w(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,i.useEffect)(()=>{f||(w(""),A(-1))},[f]);const $=e=>{r(e.value),j(!1),w("")},S=f?F:(null===_||void 0===_?void 0:_.label)||"";return(0,a.jsxs)(o,{ref:C,children:[(0,a.jsxs)(s,{isOpen:f,disabled:y,onClick:()=>{var e;y||(j(!0),null===(e=B.current)||void 0===e||e.focus())},children:[(0,a.jsx)(d,{ref:B,type:"text",value:S,onChange:e=>{w(e.target.value),A(0),f||j(!0)},onKeyDown:e=>{if(!y)switch(e.key){case"ArrowDown":e.preventDefault(),f?A(e=>e<E.length-1?e+1:e):j(!0);break;case"ArrowUp":e.preventDefault(),A(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),f&&k>=0&&E[k]?$(E[k]):f||j(!0);break;case"Escape":j(!1),w("")}},placeholder:m,disabled:y}),b&&n&&!y&&(0,a.jsx)(l,{onClick:e=>{e.stopPropagation(),r(null),w("")},type:"button",children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,a.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,a.jsx)(c,{isOpen:f,children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,a.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,a.jsx)(p,{isOpen:f,children:E.length>0?E.map((e,t)=>(0,a.jsxs)(u,{isSelected:e.value===n,isHighlighted:t===k,onClick:()=>$(e),onMouseEnter:()=>A(t),children:[(0,a.jsx)(x,{children:e.label}),e.subLabel&&(0,a.jsx)(g,{children:e.subLabel})]},e.value)):(0,a.jsx)(h,{children:v})})]})}}}]);