"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7625],{251:(e,i,r)=>{r.d(i,{_W:()=>n,jr:()=>a,zQ:()=>o});const n=[{value:"kg",label:"kg (kilogram)",category:"weight",baseUnit:"g",multiplier:1e3},{value:"g",label:"g (gram)",category:"weight",baseUnit:"g",multiplier:1},{value:"mg",label:"mg (milligram)",category:"weight",baseUnit:"g",multiplier:.001},{value:"L",label:"L (liter)",category:"volume",baseUnit:"ml",multiplier:1e3},{value:"ml",label:"ml (milliliter)",category:"volume",baseUnit:"ml",multiplier:1},{value:"piece",label:"piece",category:"count",baseUnit:"piece",multiplier:1},{value:"pack",label:"pack",category:"count",baseUnit:"pack",multiplier:1},{value:"box",label:"box",category:"count",baseUnit:"box",multiplier:1},{value:"can",label:"can",category:"count",baseUnit:"can",multiplier:1},{value:"bottle",label:"bottle",category:"count",baseUnit:"bottle",multiplier:1},{value:"bag",label:"bag",category:"count",baseUnit:"bag",multiplier:1},{value:"portion",label:"portion",category:"serving",baseUnit:"portion",multiplier:1},{value:"serving",label:"serving",category:"serving",baseUnit:"serving",multiplier:1},{value:"tbsp",label:"tbsp (tablespoon)",category:"cooking",baseUnit:"ml",multiplier:15},{value:"tsp",label:"tsp (teaspoon)",category:"cooking",baseUnit:"ml",multiplier:5},{value:"cup",label:"cup",category:"cooking",baseUnit:"ml",multiplier:240}],t=(n.map(e=>e.value),n.filter(e=>"weight"===e.category),n.filter(e=>"volume"===e.category),n.filter(e=>"count"===e.category),n.filter(e=>"serving"===e.category),n.filter(e=>"cooking"===e.category),e=>n.find(i=>i.value===e)),a=(e,i,r,n)=>{if(i===n)return e*r;const a=((e,i,r)=>{if(i===r)return e;const n=t(i),a=t(r);return n&&a?n.baseUnit!==a.baseUnit?null:e*n.multiplier/a.multiplier:null})(r,n,i);return null===a?(console.warn(`Cannot convert ${n} to ${i}`),null):e*a},o=(e,i,r)=>i<=0?{cost:e,unit:r}:{cost:e/i,unit:r}},2653:(e,i,r)=>{r.d(i,{M:()=>a});var n=r(9950),t=r(4492);function a(e){const[i,r]=(0,t.ok)(),a=(0,n.useCallback)(()=>i.get("tab")||e,[i,e]),[o,s]=(0,n.useState)(a());return[o,(0,n.useCallback)(e=>{s(e),r({tab:e})},[r])]}},3705:(e,i,r)=>{r.d(i,{cc:()=>t});var n=r(4752);const t=n.Ay.button`
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
`;n.Ay.select`
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
`,n.Ay.input`
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
`,n.Ay.div`
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
`},4021:(e,i,r)=>{r.d(i,{i1:()=>s});var n=r(9950),t=r(1367),a=r(6038),o=r(9955);const s=()=>{const{user:e}=(0,t.As)(),[i,r]=(0,n.useState)("RM"),[s]=(0,n.useState)(Object.keys(a.DL)),[l,d]=(0,n.useState)(!0),[c,p]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const i=window.location.pathname.split("/"),n=i.indexOf("restaurant");let t=n>=0?i[n+1]:null;if(!t&&null!==e&&void 0!==e&&e.restaurant_id&&(t=e.restaurant_id.toString()),!t)return r("RM"),void d(!1);try{const e=(0,o.c4)(),i=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){var a;const e=await i.json(),n=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";r(n)}else r("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),r("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:i,supportedCurrencies:s,loading:l,error:c}}},7617:(e,i,r)=>{r.d(i,{A:()=>x});r(9950);var n=r(7119),t=r(4752),a=r(9610),o=r(4414);const s=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,l=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=t.Ay.button`
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
`,x=e=>{let{isOpen:i,title:r,message:t,onConfirm:x,onCancel:g,confirmText:h="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return i?n.createPortal((0,o.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&g()},style:{zIndex:1100},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(l,{children:[(0,o.jsx)(d,{children:r}),(0,o.jsx)(c,{children:t})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:g,children:m}),(0,o.jsx)(u,{variant:"primary",type:y,onClick:x,children:h})]})]})}),document.body):null}},7625:(e,i,r)=>{r.r(i),r.d(i,{default:()=>li});var n=r(9950),t=r(4752),a=r(4492),o=r(8409),s=r(2597),l=r(2653),d=r(1367),c=r(2853),p=r(3705),u=r(2488),x=r(4877),g=r(9194),h=r(7617),m=r(4021),y=r(6038),v=r(251),b=r(5030),f=r(9955),j=r(4414);const F=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,A=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>!1!==e.isActive?1:.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,_=t.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,w=t.Ay.div`
  flex: 1;
  min-width: 0;
`,C=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,k=t.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,B=t.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  background: #FEF3C7;
  color: #92400E;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`,E=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,z=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,$=t.Ay.div``,S=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,R=t.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,I=t.Ay.div`
  flex: 1;
  min-height: 12px;
`,D=t.Ay.div`
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,T=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,M=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,U=t.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,N=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  padding: 10px;
  background: #FAFAFA;
  border-radius: 8px;
  font-size: 12px;
  color: #6B7280;
`,P=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,O=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
  padding: 8px;
  background: #FFFBEB;
  border-radius: 6px;
  border-left: 3px solid #F59E0B;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
`,q=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`,Y=t.Ay.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`,L=t.Ay.div`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,Q=t.Ay.div`
  font-size: 80px;
  line-height: 1;
`,W=t.Ay.div`
  flex: 1;
`,G=t.Ay.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,Z=t.Ay.span`
  display: inline-block;
  padding: 6px 12px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
`,V=t.Ay.p`
  font-size: 15px;
  color: #6B7280;
  margin: 16px 0 0 0;
  line-height: 1.6;
`,H=t.Ay.div`
  padding: 0;
  margin-bottom: 8px;
`,J=t.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`,K=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,X=t.Ay.div`
  text-align: center;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,ee=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,ie=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,re=t.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`,ne=t.Ay.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #E6EBF1;
  }

  th {
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
  }

  td {
    font-size: 14px;
    color: #374151;
  }

  /* Subtotal column right-align */
  th:last-child, td:last-child {
    text-align: right;
  }

  tr:last-child td {
    border-bottom: none;
  }
`,te=t.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  margin-top: 12px;
  border-top: 1px solid #E5E7EB;
  font-weight: 600;

  span:first-child {
    color: #6B7280;
  }

  span:last-child {
    color: #635BFF;
    font-size: 16px;
  }
`,ae=t.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,oe=t.Ay.button`
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
`,se=t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,le=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,de=t.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,ce=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,pe=t.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  padding: 8px 0;
  margin-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;

  span {
    font-size: 13px;
    font-weight: 600;
    color: #6B7280;
  }

  @media (max-width: 768px) {
    display: none;
  }
`,ue=t.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,xe=t.Ay.button`
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  width: 38px;
  height: 38px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    background: #FCA5A5;
  }
`,ge=t.Ay.button`
  background: #F0F4FF;
  color: #635BFF;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  margin-bottom: 16px;

  &:hover {
    background: #E0E7FF;
  }
`,he=t.Ay.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E5E7EB;
`,me=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,ye=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,ve=t.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,be=t.Ay.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`,fe=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`,je=t.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
`,Fe=t.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;

  &:hover {
    color: #5A51E6;
  }
`,Ae=t.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,_e=t.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,we=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,Ce=t.Ay.span`
  font-size: 20px;
`,ke=t.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,Be=t.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,Ee=t.Ay.div`
  margin-bottom: 24px;
`,ze=t.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`,$e=t.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,Se=t.Ay.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,Re=t.Ay.span`
  font-size: 15px;
  color: #0A2540;
`,Ie=t.Ay.span`
  font-size: 15px;
  font-weight: 600;
  color: #635BFF;
`,De=t.Ay.p`
  font-size: 15px;
  color: #4B5563;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
`,Te=t.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`,Me=e=>{var i,r;let{brandId:t,restaurantId:a,onCountChange:s,categoryRefreshKey:l}=e;const{t:Me}=(0,b.Bd)("recipes"),{user:Ue}=(0,d.As)(),{defaultCurrency:Ne}=(0,m.i1)(),[Pe,Oe]=(0,n.useState)("RM"),qe=a||(null===Ue||void 0===Ue?void 0:Ue.restaurant_id)||(null===Ue||void 0===Ue?void 0:Ue.restaurantId),[Ye,Le]=(0,n.useState)([]),[Qe,We]=(0,n.useState)([]),[Ge,Ze]=(0,n.useState)([]),[Ve,He]=(0,n.useState)(!0);(0,n.useEffect)(()=>{Ne&&Oe(Ne)},[Ne]);const[Je,Ke]=(0,n.useState)(()=>new URLSearchParams(window.location.search).get("search")||""),[Xe,ei]=(0,n.useState)("all"),[ii,ri]=(0,n.useState)(()=>"image"===localStorage.getItem("recipesViewMode")?"image":"compact"),[ni,ti]=(0,n.useState)({}),[ai,oi]=(0,n.useState)(null),[si,li]=(0,n.useState)(!1),[di,ci]=(0,n.useState)({name:"",description:"",category:"",recipe_category_id:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),[pi,ui]=(0,n.useState)([]),[xi,gi]=(0,n.useState)(""),[hi,mi]=(0,n.useState)([]),[yi,vi]=(0,n.useState)({isOpen:!1,recipeId:null,recipeName:""}),[bi,fi]=(0,n.useState)(null),[ji,Fi]=(0,n.useState)(!1),[Ai,_i]=(0,n.useState)(!1),[wi,Ci]=(0,n.useState)(null),ki="Restaurant Admin"===(null===Ue||void 0===Ue?void 0:Ue.role),Bi=e=>ki&&"brand"===e.owner_type,Ei=ki&&"brand"===(null===ai||void 0===ai?void 0:ai.owner_type),zi=(0,n.useCallback)(()=>(0,f.c4)(),[]);(0,n.useEffect)(()=>{(async()=>{if(!t&&!qe)return;He(!0);const e=zi(),i="Brand General"===(null===Ue||void 0===Ue?void 0:Ue.role)||"Brand Manager"===(null===Ue||void 0===Ue?void 0:Ue.role);try{var r,n,a;const d=[];let c="",p="",u="";i&&t?(c=`/api/brands/${t}/recipes`,p=`/api/brands/${t}/ingredients`,u=`/api/brands/${t}/recipe-categories`):ki&&qe&&(c=`/api/restaurants/${qe}/recipes`,p=`/api/restaurants/${qe}/ingredients`,u=`/api/restaurants/${qe}/recipe-categories`),c&&(d.push(fetch(c,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(p,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(u,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())),ki&&qe&&d.push(fetch(`/api/restaurants/${qe}/brand-recipes`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(`/api/restaurants/${qe}/brand-ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())));const x=await Promise.all(d);if(null!==(r=x[0])&&void 0!==r&&r.success){var o;let e=Array.isArray(x[0].data)?x[0].data:[];ki&&null!==(o=x[3])&&void 0!==o&&o.success&&Array.isArray(x[3].data)&&(e=[...x[3].data,...e]),Le(e)}if(null!==(n=x[1])&&void 0!==n&&n.success){var s;let e=Array.isArray(x[1].data)?x[1].data:[];ki&&null!==(s=x[4])&&void 0!==s&&s.success&&Array.isArray(x[4].data)&&(e=[...x[4].data,...e]),We(e)}if(null!==(a=x[2])&&void 0!==a&&a.success)if(Array.isArray(x[2].data))Ze(x[2].data.filter(e=>e.is_active));else{const e=[...x[2].data.own_categories||[],...x[2].data.brand_categories||[]].filter(e=>e.is_active);Ze(e)}if(ki&&qe)try{const i=await fetch(`/api/menu?restaurant_id=${qe}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json(),r=e.data||e||[],n={};(Array.isArray(r)?r:[]).forEach(e=>{e.recipe_id&&(n[e.recipe_id]||(n[e.recipe_id]=[]),n[e.recipe_id].push(e.name))}),ti(n)}}catch(l){}}catch(d){console.error("Failed to fetch data:",d)}finally{He(!1)}})()},[t,qe,null===Ue||void 0===Ue?void 0:Ue.role,zi,ki]),(0,n.useEffect)(()=>{l&&(t||qe)&&$i()},[l]);const $i=async()=>{try{let e="";if("Brand General"===(null===Ue||void 0===Ue?void 0:Ue.role)||"Brand Manager"===(null===Ue||void 0===Ue?void 0:Ue.role)?t&&(e=`/api/brands/${t}/recipe-categories`):"Restaurant Admin"===(null===Ue||void 0===Ue?void 0:Ue.role)&&qe&&(e=`/api/restaurants/${qe}/recipe-categories`),!e)return;const i=(0,f.c4)(),r=await fetch(e,{headers:{Authorization:`Bearer ${i}`}}),n=await r.json();if(n.success)if(Array.isArray(n.data))Ze(n.data.filter(e=>e.is_active));else{const e=[...n.data.own_categories||[],...n.data.brand_categories||[]].filter(e=>e.is_active);Ze(e)}}catch(e){console.error("Failed to fetch recipe categories:",e)}},Si=function(e){let i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];var r,n,t,a,o,s;(fi(null),Fi(i),e)?(oi(e),ci({name:e.name,description:e.description||"",category:e.category,recipe_category_id:(null===(r=e.recipe_category_id)||void 0===r?void 0:r.toString())||"",image:e.image||"",yield_amount:(null===(n=e.yield_amount)||void 0===n?void 0:n.toString())||"1",yield_unit:e.yield_unit||"portion",prep_time:(null===(t=e.prep_time)||void 0===t?void 0:t.toString())||"",cook_time:(null===(a=e.cook_time)||void 0===a?void 0:a.toString())||"",instructions:e.instructions||"",instructions_summary:e.instructions_summary||"",instructions_detail:e.instructions_detail||"",suggested_price:(null===(o=e.suggested_price)||void 0===o?void 0:o.toString())||""}),ui(e.category?e.category.split(",").map(e=>e.trim()):[]),mi((null===(s=e.recipeIngredients)||void 0===s?void 0:s.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""})))||[])):(oi(null),ci({name:"",description:"",category:"",recipe_category_id:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),ui([]),mi([]));li(!0)},Ri=()=>{li(!1),oi(null),Fi(!1),fi(null),ci({name:"",description:"",category:"",recipe_category_id:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),mi([]),ui([]),gi("")},Ii=(e,i,r)=>{const n=[...hi];if("ingredient_id"===i){const t=Qe.find(e=>e.id===r);n[e]=t?{...n[e],ingredient_id:r,unit:t.unit}:{...n[e],[i]:r}}else n[e]={...n[e],[i]:r};mi(n)},Di=()=>hi.reduce((e,i)=>{const r=Qe.find(e=>e.id===i.ingredient_id);if(r&&i.quantity){var n;const t=null!==(n=r.effective_cost)&&void 0!==n?n:r.unit_cost,a=r.base_quantity||1,o=parseFloat(t.toString())/a;return e+parseFloat(i.quantity)*o}return e},0),Ti=Ye.filter(e=>{var i;const r=e.name.toLowerCase().includes(Je.toLowerCase()),n="all"===Xe||(null===(i=e.recipe_category_id)||void 0===i?void 0:i.toString())===Xe||e.category===Xe;return r&&n}),Mi=[{id:"all",name:"All Categories"},...Ge.map(e=>({id:e.id.toString(),name:e.name}))];return(0,n.useEffect)(()=>{s(Ye.length)},[Ye.length,s]),(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,j.jsxs)(u.Qn,{style:{marginBottom:0,flex:1},children:[(0,j.jsx)(u.DO,{type:"text",placeholder:"Search recipes...",value:Je,onChange:e=>Ke(e.target.value)}),(0,j.jsx)(u.Jt,{value:Xe,onChange:e=>ei(e.target.value),children:Mi.map(e=>(0,j.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,j.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[(0,j.jsxs)("div",{style:{display:"flex",background:"#F3F4F6",borderRadius:"6px",padding:"2px"},children:[(0,j.jsx)("button",{onClick:()=>{ri("compact"),localStorage.setItem("recipesViewMode","compact")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"compact"===ii?"white":"transparent",color:"compact"===ii?"#0A2540":"#6B7C93",boxShadow:"compact"===ii?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Compact"}),(0,j.jsx)("button",{onClick:()=>{ri("image"),localStorage.setItem("recipesViewMode","image")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"image"===ii?"white":"transparent",color:"image"===ii?"#0A2540":"#6B7C93",boxShadow:"image"===ii?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Image"})]}),(0,j.jsx)(p.cc,{variant:"primary",onClick:()=>Si(null),children:"New Recipe"})]})]}),Ve?(0,j.jsx)(c.pp,{children:(0,j.jsx)(se,{children:"Loading..."})}):0===Ti.length?(0,j.jsxs)(c.pp,{children:[(0,j.jsx)(se,{children:"No recipes found"}),(0,j.jsx)(le,{children:Je||"all"!==Xe?"Try adjusting your filters":"Create your first recipe to get started"}),!Je&&"all"===Xe&&(0,j.jsx)(p.cc,{variant:"primary",onClick:()=>Si(null),children:"Create First Recipe"})]}):(0,j.jsx)(F,{children:Ti.map(e=>{var i,r,n;return(0,j.jsxs)(A,{isActive:e.is_active,onClick:()=>Si(e,!0),children:["image"===ii&&e.image&&(0,j.jsx)("div",{style:{width:"100%",aspectRatio:"16 / 9",borderRadius:"8px 8px 0 0",overflow:"hidden"},children:(0,j.jsx)("img",{src:e.image,alt:e.name,style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,j.jsx)(_,{children:(0,j.jsxs)(w,{children:[(0,j.jsxs)(C,{children:[e.name,ki&&"brand"===e.owner_type&&(0,j.jsx)(B,{children:"Brand"})]}),(0,j.jsxs)(k,{children:[null===(i=e.recipeCategory)||void 0===i?void 0:i.emoji," ",(null===(r=e.recipeCategory)||void 0===r?void 0:r.name)||e.category||"Uncategorized"]})]})}),e.description&&(0,j.jsx)(E,{children:e.description}),(0,j.jsxs)(z,{children:[ki&&"brand"===e.owner_type&&null!==e.restaurant_ingredient_cost?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)($,{children:[(0,j.jsx)(S,{style:{color:"#6B7280"},children:"Brand Cost"}),(0,j.jsx)(R,{style:{color:"#6B7280",textDecoration:"line-through",fontSize:"13px"},children:(0,y.vv)(Number(e.total_ingredient_cost||0),Pe)})]}),(0,j.jsxs)($,{children:[(0,j.jsx)(S,{style:{color:"#2563EB"},children:"My Cost"}),(0,j.jsx)(R,{style:{color:"#2563EB",fontWeight:700},children:(0,y.vv)(Number(e.effective_ingredient_cost||0),Pe)})]})]}):(0,j.jsxs)($,{children:[(0,j.jsx)(S,{children:"Cost"}),(0,j.jsx)(R,{children:(0,y.vv)(Number(ki&&"brand"===e.owner_type?e.effective_ingredient_cost||e.total_ingredient_cost||0:e.total_ingredient_cost||0),Pe)})]}),(0,j.jsxs)($,{children:[(0,j.jsx)(S,{children:"Suggested"}),(0,j.jsx)(R,{children:(0,y.vv)(Number(e.suggested_price||0),Pe)})]})]}),(e.prep_time||e.cook_time)&&(0,j.jsxs)(N,{children:[e.prep_time&&(0,j.jsxs)(P,{children:[(0,j.jsx)("span",{children:"Prep:"}),(0,j.jsxs)("strong",{children:[e.prep_time," min"]})]}),e.cook_time&&(0,j.jsxs)(P,{children:[(0,j.jsx)("span",{children:"Cook:"}),(0,j.jsxs)("strong",{children:[e.cook_time," min"]})]})]}),e.instructions_summary&&(0,j.jsx)(O,{children:e.instructions_summary}),(0,j.jsx)(I,{}),(0,j.jsxs)(D,{children:[(0,j.jsxs)(T,{children:[(null===(n=e.recipeIngredients)||void 0===n?void 0:n.length)||0," ingredients"]}),e.recipeIngredients&&e.recipeIngredients.length>0&&(0,j.jsxs)(M,{children:[e.recipeIngredients.slice(0,5).map((e,i)=>{var r;return(0,j.jsx)(U,{children:(null===(r=e.ingredient)||void 0===r?void 0:r.name)||`Ingredient #${e.ingredient_id}`},i)}),e.recipeIngredients.length>5&&(0,j.jsxs)(U,{style:{background:"#E0E7FF",color:"#4F46E5"},children:["+",e.recipeIngredients.length-5," more"]})]})]}),ni[e.id]&&ni[e.id].length>0&&(0,j.jsx)("div",{style:{marginTop:"8px",display:"flex",gap:"4px",flexWrap:"wrap"},children:ni[e.id].map((e,i)=>(0,j.jsx)("span",{style:{fontSize:"11px",background:"#ECFDF5",color:"#059669",padding:"2px 8px",borderRadius:"4px",fontWeight:500},children:e},i))}),(0,j.jsxs)(ae,{onClick:e=>e.stopPropagation(),children:[(0,j.jsx)(oe,{variant:"secondary",onClick:()=>(e=>{Ci(e),_i(!0)})(e),children:"Recipe"}),!Bi(e)&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(oe,{variant:"primary",onClick:()=>Si(e,!1),children:"Edit"}),(0,j.jsx)(oe,{variant:"danger",onClick:()=>(e=>{vi({isOpen:!0,recipeId:e.id,recipeName:e.name})})(e),children:"Delete"})]})]})]},e.id)})}),(0,j.jsx)(o.aF,{isOpen:si,onClose:Ri,title:ji?"Recipe Details":ai?"Edit Recipe":"New Recipe",size:ji?"large":"medium",children:ji&&ai?(0,j.jsxs)(q,{children:[(0,j.jsxs)(Y,{children:[(0,j.jsx)(L,{children:di.image?(0,j.jsx)("img",{src:di.image,alt:di.name}):(0,j.jsx)(Q,{children:ai.emoji||"\ud83c\udf7d\ufe0f"})}),(0,j.jsxs)(W,{children:[(0,j.jsx)(G,{children:di.name}),(0,j.jsxs)(Z,{children:[null===(i=ai.recipeCategory)||void 0===i?void 0:i.emoji," ",(null===(r=ai.recipeCategory)||void 0===r?void 0:r.name)||di.category||"Uncategorized"]}),di.description&&(0,j.jsx)(V,{children:di.description})]})]}),(0,j.jsxs)(H,{children:[(0,j.jsx)(J,{children:"Cost & Time"}),(0,j.jsxs)(K,{children:[ki&&"brand"===ai.owner_type&&null!==ai.restaurant_ingredient_cost?(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(X,{children:[(0,j.jsx)(ee,{style:{color:"#6B7280"},children:"Brand Cost"}),(0,j.jsx)(ie,{style:{color:"#6B7280",textDecoration:"line-through",fontSize:"14px"},children:(0,y.vv)(Number(ai.total_ingredient_cost||0),Pe)})]}),(0,j.jsxs)(X,{children:[(0,j.jsx)(ee,{style:{color:"#2563EB"},children:"My Cost"}),(0,j.jsx)(ie,{style:{color:"#2563EB",fontWeight:700},children:(0,y.vv)(Number(ai.effective_ingredient_cost||0),Pe)})]})]}):(0,j.jsxs)(X,{children:[(0,j.jsx)(ee,{children:"Ingredient Cost"}),(0,j.jsx)(ie,{children:(0,y.vv)(Number(ki&&"brand"===ai.owner_type?ai.effective_ingredient_cost||ai.total_ingredient_cost||0:ai.total_ingredient_cost||0),Pe)})]}),(0,j.jsxs)(X,{children:[(0,j.jsx)(ee,{children:"Suggested Price"}),(0,j.jsx)(ie,{children:(0,y.vv)(Number(di.suggested_price||0),Pe)})]}),di.prep_time&&(0,j.jsxs)(X,{children:[(0,j.jsx)(ee,{children:"Prep Time"}),(0,j.jsxs)(ie,{children:[di.prep_time," min"]})]}),di.cook_time&&(0,j.jsxs)(X,{children:[(0,j.jsx)(ee,{children:"Cook Time"}),(0,j.jsxs)(ie,{children:[di.cook_time," min"]})]})]})]}),hi.length>0&&(0,j.jsxs)(H,{children:[(0,j.jsxs)(J,{children:["Ingredients (",hi.length,")"]}),(0,j.jsxs)(ne,{children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("th",{children:"Ingredient"}),(0,j.jsx)("th",{children:"Quantity"}),(0,j.jsx)("th",{children:"Unit Cost"}),Ei&&(0,j.jsx)("th",{children:"My Cost"}),(0,j.jsx)("th",{children:"Subtotal"})]})}),(0,j.jsx)("tbody",{children:hi.map((e,i)=>{var r,n;const t=Qe.find(i=>i.id===e.ingredient_id),a=(null===t||void 0===t?void 0:t.base_quantity)||1,o=((null===t||void 0===t?void 0:t.unit_cost)||0)/a,s=(null!==(r=null!==(n=null===t||void 0===t?void 0:t.effective_cost)&&void 0!==n?n:null===t||void 0===t?void 0:t.unit_cost)&&void 0!==r?r:0)/a,l=parseFloat(e.quantity)*s,d=null!==(null===t||void 0===t?void 0:t.restaurant_cost)&&void 0!==(null===t||void 0===t?void 0:t.restaurant_cost);return(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{children:(0,j.jsx)("strong",{children:(null===t||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`})}),(0,j.jsxs)("td",{children:[Number(e.quantity).toFixed(2)," ",e.unit]}),(0,j.jsxs)("td",{style:Ei&&d?{color:"#6B7280",textDecoration:"line-through"}:{},children:[(0,y.Qn)(Pe)," ",o.toFixed(2),"/",null===t||void 0===t?void 0:t.unit]}),Ei&&(0,j.jsx)("td",{style:d?{color:"#2563EB",fontWeight:600}:{color:"#9CA3AF"},children:d?`${(0,y.Qn)(Pe)} ${s.toFixed(2)}/${null===t||void 0===t?void 0:t.unit}`:"-"}),(0,j.jsx)("td",{children:(0,y.vv)(l,Pe)})]},i)})})]}),(0,j.jsxs)(te,{children:[(0,j.jsx)("span",{children:"Total Ingredient Cost"}),(0,j.jsx)("span",{children:(0,y.vv)(Di(),Pe)})]})]}),(di.instructions_summary||di.instructions)&&(0,j.jsxs)(H,{children:[(0,j.jsx)(J,{children:"Recipe Summary"}),(0,j.jsx)(re,{children:di.instructions_summary||di.instructions})]}),di.instructions_detail&&(0,j.jsxs)(H,{children:[(0,j.jsx)(J,{children:"Detailed Instructions"}),(0,j.jsx)(re,{children:di.instructions_detail})]}),ai&&ni[ai.id]&&ni[ai.id].length>0&&(0,j.jsxs)(H,{children:[(0,j.jsxs)(J,{children:["Connected Menus (",ni[ai.id].length,")"]}),(0,j.jsx)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:ni[ai.id].map((e,i)=>(0,j.jsx)("span",{style:{fontSize:"13px",background:"#ECFDF5",color:"#059669",padding:"4px 12px",borderRadius:"6px",fontWeight:500},children:e},i))})]}),(0,j.jsxs)(ve,{children:[(0,j.jsx)(o.yl,{type:"button",variant:"secondary",onClick:Ri,children:"Close"}),!Bi(ai)&&(0,j.jsx)(o.yl,{type:"button",variant:"primary",onClick:()=>Fi(!1),children:"Edit"})]})]}):(0,j.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),fi(null),di.name)if(!di.yield_amount||parseFloat(di.yield_amount)<=0)fi("Yield amount must be greater than 0");else try{let e="";const i=ai?"PUT":"POST";"Brand General"===(null===Ue||void 0===Ue?void 0:Ue.role)||"Brand Manager"===(null===Ue||void 0===Ue?void 0:Ue.role)?e=ai?`/api/brands/${t}/recipes/${ai.id}`:`/api/brands/${t}/recipes`:"Restaurant Admin"===(null===Ue||void 0===Ue?void 0:Ue.role)&&(e=ai?`/api/restaurants/${qe}/recipes/${ai.id}`:`/api/restaurants/${qe}/recipes`);const r=(0,f.c4)(),n=await fetch(e,{method:i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({...di,category:pi.length>0?pi.join(", "):"",recipe_category_id:di.recipe_category_id?parseInt(di.recipe_category_id):null,yield_amount:parseFloat(di.yield_amount)||1,yield_unit:di.yield_unit||"portion",suggested_price:parseFloat(di.suggested_price)||0,ingredients:hi.map(e=>{const i=Qe.find(i=>i.id===e.ingredient_id),r=i&&(0,v.jr)(i.unit_cost/(i.base_quantity||1),i.unit,parseFloat(e.quantity),e.unit)||0;return{ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,cost:r,notes:e.notes}})})}),a=await n.json();a.success?(Ri(),(async()=>{try{He(!0);const e=(0,f.c4)();if("Brand General"===(null===Ue||void 0===Ue?void 0:Ue.role)||"Brand Manager"===(null===Ue||void 0===Ue?void 0:Ue.role)){if(t){const i=await fetch(`/api/brands/${t}/recipes`,{headers:{Authorization:`Bearer ${e}`}}),r=await i.json();r.success&&Le(r.data)}}else if("Restaurant Admin"===(null===Ue||void 0===Ue?void 0:Ue.role)&&qe){const[i,r]=await Promise.all([fetch(`/api/restaurants/${qe}/recipes`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(`/api/restaurants/${qe}/brand-recipes`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())]);let n=[];r.success&&Array.isArray(r.data)&&(n=[...r.data]),i.success&&Array.isArray(i.data)&&(n=[...n,...i.data]),Le(n)}}catch(e){console.error("Failed to fetch recipes:",e)}finally{He(!1)}})()):fi(a.error||"Failed to save recipe")}catch(i){console.error("Failed to save recipe:",i),fi("Failed to save recipe")}else fi("Recipe name is required")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,j.jsxs)(o.gE,{children:[(0,j.jsx)(o.lR,{children:"Recipe Name *"}),(0,j.jsx)(o.ZQ,{type:"text",value:di.name,onChange:e=>ci({...di,name:e.target.value}),placeholder:"e.g., Nasi Lemak Special",required:!0})]}),(0,j.jsxs)(o.gE,{children:[(0,j.jsx)(o.lR,{children:"Category"}),(0,j.jsxs)(o.FX,{value:di.recipe_category_id,onChange:e=>ci({...di,recipe_category_id:e.target.value}),children:[(0,j.jsx)("option",{value:"",children:"Select category..."}),Ge.map(e=>(0,j.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,j.jsxs)(o.gE,{children:[(0,j.jsx)(o.lR,{children:"Recipe Image"}),(0,j.jsx)(x.A,{value:di.image,onChange:e=>ci({...di,image:e}),label:"Drop recipe image here or click to upload"})]}),(0,j.jsxs)(o.gE,{children:[(0,j.jsx)(o.lR,{children:"Tags (Press Enter to add)"}),(0,j.jsx)(Ae,{type:"text",value:xi,onChange:e=>gi(e.target.value),onKeyDown:e=>{"Enter"===e.key&&xi.trim()&&(e.preventDefault(),pi.includes(xi.trim())||ui([...pi,xi.trim()]),gi(""))},placeholder:"e.g., Main Dish, Spicy, Popular"}),pi.length>0&&(0,j.jsx)(fe,{children:pi.map(e=>(0,j.jsxs)(je,{children:[e,(0,j.jsx)(Fe,{type:"button",onClick:()=>{return i=e,void ui(pi.filter(e=>e!==i));var i},children:"\xd7"})]},e))})]}),(0,j.jsxs)(o.gE,{children:[(0,j.jsxs)(o.lR,{children:["Suggested Price (",Pe,")"]}),(0,j.jsx)(o.ZQ,{type:"number",step:"0.01",value:di.suggested_price,onChange:e=>ci({...di,suggested_price:e.target.value}),placeholder:"0.00"})]}),(0,j.jsxs)(o.gE,{children:[(0,j.jsx)(o.lR,{children:"Description"}),(0,j.jsx)(o.Lz,{value:di.description,onChange:e=>ci({...di,description:e.target.value}),placeholder:"Brief description of the recipe..."})]}),(0,j.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,j.jsxs)(o.gE,{children:[(0,j.jsx)(o.lR,{children:"Prep Time (minutes)"}),(0,j.jsx)(o.ZQ,{type:"number",value:di.prep_time,onChange:e=>ci({...di,prep_time:e.target.value}),placeholder:"e.g., 15"})]}),(0,j.jsxs)(o.gE,{children:[(0,j.jsx)(o.lR,{children:"Cook Time (minutes)"}),(0,j.jsx)(o.ZQ,{type:"number",value:di.cook_time,onChange:e=>ci({...di,cook_time:e.target.value}),placeholder:"e.g., 30"})]})]}),(0,j.jsxs)(o.gE,{children:[(0,j.jsx)(o.lR,{children:"Recipe Summary"}),(0,j.jsx)(o.Lz,{value:di.instructions_summary,onChange:e=>ci({...di,instructions_summary:e.target.value}),placeholder:"Brief summary for list display (e.g., Pan-fried chicken with garlic sauce)",rows:2})]}),(0,j.jsxs)(o.gE,{children:[(0,j.jsx)(o.lR,{children:"Detailed Instructions"}),(0,j.jsx)(o.Lz,{value:di.instructions_detail,onChange:e=>ci({...di,instructions_detail:e.target.value}),placeholder:"Step-by-step cooking instructions...\n1. Prepare ingredients...\n2. Heat the pan...\n3. ...",rows:8})]}),(0,j.jsxs)("div",{children:[(0,j.jsx)(de,{children:"Yield (Production Amount)"}),(0,j.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,j.jsxs)(o.gE,{children:[(0,j.jsx)(o.lR,{children:"Yield Amount *"}),(0,j.jsx)(o.ZQ,{type:"number",step:"0.01",min:"0.01",value:di.yield_amount,onChange:e=>ci({...di,yield_amount:e.target.value}),placeholder:"e.g., 10",required:!0})]}),(0,j.jsxs)(o.gE,{children:[(0,j.jsx)(o.lR,{children:"Yield Unit *"}),(0,j.jsx)(o.FX,{value:di.yield_unit,onChange:e=>ci({...di,yield_unit:e.target.value}),children:v._W.map(e=>(0,j.jsx)("option",{value:e.value,children:e.label},e.value))})]})]})]}),(0,j.jsxs)("div",{children:[(0,j.jsx)(de,{children:"Ingredients"}),hi.length>0&&(0,j.jsxs)(pe,{children:[(0,j.jsx)("span",{children:"Ingredient"}),(0,j.jsx)("span",{children:"Quantity"}),(0,j.jsx)("span",{children:"Unit"}),(0,j.jsx)("span",{children:"Notes"}),(0,j.jsx)("span",{})]}),(0,j.jsx)(ce,{children:hi.map((e,i)=>(0,j.jsxs)(ue,{children:[(0,j.jsx)(g.A,{options:Qe.map(e=>{const i=Number(e.unit_cost)/(e.base_quantity||1);return{value:e.id,label:e.name,subLabel:`${(0,y.Qn)(Pe)} ${i.toFixed(2)}/${e.unit}`}}),value:e.ingredient_id||null,onChange:e=>Ii(i,"ingredient_id",e),placeholder:"Search ingredient..."}),(0,j.jsx)(o.ZQ,{type:"number",step:"0.01",value:e.quantity,onChange:e=>Ii(i,"quantity",e.target.value),placeholder:"0",required:!0}),(0,j.jsx)(o.ZQ,{value:e.unit,disabled:!0,style:{background:"#F3F4F6",color:"#6B7280"}}),(0,j.jsx)(o.ZQ,{type:"text",value:e.notes,onChange:e=>Ii(i,"notes",e.target.value),placeholder:"Optional"}),(0,j.jsx)(xe,{type:"button",onClick:()=>(e=>{mi(hi.filter((i,r)=>r!==e))})(i),children:"\xd7"})]},i))}),(0,j.jsx)(ge,{type:"button",onClick:()=>{mi([...hi,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),hi.length>0&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(he,{children:[(0,j.jsx)(me,{children:"Total Ingredient Cost"}),(0,j.jsx)(ye,{children:(0,y.vv)(Di(),Pe)})]}),(0,j.jsxs)(he,{style:{marginTop:"8px"},children:[(0,j.jsxs)(me,{children:["Cost per ",di.yield_unit]}),(0,j.jsx)(ye,{children:(0,y.vv)((0,v.zQ)(Di(),parseFloat(di.yield_amount)||1,di.yield_unit).cost,Pe)})]})]})]}),bi&&(0,j.jsx)(be,{children:bi}),(0,j.jsxs)(ve,{children:[(0,j.jsx)(o.yl,{type:"button",variant:"secondary",onClick:Ri,children:"Cancel"}),(0,j.jsx)(o.yl,{type:"submit",variant:"primary",children:ai?"Update Recipe":"Create Recipe"})]})]})}),(0,j.jsx)(h.A,{isOpen:yi.isOpen,title:"Delete Recipe",message:`Are you sure you want to delete "${yi.recipeName}"? This action cannot be undone.`,onConfirm:async()=>{if(yi.recipeId)try{const e=zi();let i="";"Brand General"===(null===Ue||void 0===Ue?void 0:Ue.role)||"Brand Manager"===(null===Ue||void 0===Ue?void 0:Ue.role)?i=`/api/brands/${t}/recipes/${yi.recipeId}`:"Restaurant Admin"===(null===Ue||void 0===Ue?void 0:Ue.role)&&(i=`/api/restaurants/${qe}/recipes/${yi.recipeId}`);const r=await fetch(i,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),n=await r.json();n.success?Le(e=>e.filter(e=>e.id!==yi.recipeId)):console.error("Delete failed:",n.error)}catch(e){console.error("Failed to delete recipe:",e)}finally{vi({isOpen:!1,recipeId:null,recipeName:""})}},onCancel:()=>{vi({isOpen:!1,recipeId:null,recipeName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"}),(0,j.jsxs)(o.aF,{isOpen:Ai&&!!wi,onClose:()=>{_i(!1),Ci(null)},title:(null===wi||void 0===wi?void 0:wi.name)||"Recipe",size:"medium",children:[((null===wi||void 0===wi?void 0:wi.prep_time)||(null===wi||void 0===wi?void 0:wi.cook_time))&&(0,j.jsxs)(_e,{children:[(null===wi||void 0===wi?void 0:wi.prep_time)&&(0,j.jsxs)(we,{children:[(0,j.jsx)(Ce,{children:"\u23f1"}),(0,j.jsx)(ke,{children:"Prep:"}),(0,j.jsxs)(Be,{children:[wi.prep_time," min"]})]}),(null===wi||void 0===wi?void 0:wi.cook_time)&&(0,j.jsxs)(we,{children:[(0,j.jsx)(Ce,{children:"\ud83d\udd25"}),(0,j.jsx)(ke,{children:"Cook:"}),(0,j.jsxs)(Be,{children:[wi.cook_time," min"]})]})]}),(null===wi||void 0===wi?void 0:wi.recipeIngredients)&&wi.recipeIngredients.length>0&&(0,j.jsxs)(Ee,{children:[(0,j.jsx)(ze,{children:"Ingredients"}),(0,j.jsx)($e,{children:wi.recipeIngredients.map((e,i)=>{const r=Qe.find(i=>i.id===e.ingredient_id);return(0,j.jsxs)(Se,{children:[(0,j.jsx)(Re,{children:(null===r||void 0===r?void 0:r.name)||`Ingredient #${e.ingredient_id}`}),(0,j.jsxs)(Ie,{children:[Number(e.quantity).toFixed(2)," ",e.unit]})]},i)})})]}),((null===wi||void 0===wi?void 0:wi.instructions_summary)||(null===wi||void 0===wi?void 0:wi.instructions))&&(0,j.jsxs)(Ee,{children:[(0,j.jsx)(ze,{children:"Summary"}),(0,j.jsx)(De,{children:(null===wi||void 0===wi?void 0:wi.instructions_summary)||(null===wi||void 0===wi?void 0:wi.instructions)})]}),(null===wi||void 0===wi?void 0:wi.instructions_detail)&&(0,j.jsxs)(Ee,{children:[(0,j.jsx)(ze,{children:"Detailed Instructions"}),(0,j.jsx)(Te,{children:wi.instructions_detail})]}),wi&&ni[wi.id]&&ni[wi.id].length>0&&(0,j.jsxs)(Ee,{children:[(0,j.jsx)(ze,{children:"Connected Menus"}),(0,j.jsx)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:ni[wi.id].map((e,i)=>(0,j.jsx)("span",{style:{fontSize:"13px",background:"#ECFDF5",color:"#059669",padding:"4px 12px",borderRadius:"6px",fontWeight:500},children:e},i))})]})]})]})};var Ue=r(9610);const Ne=t.Ay.div`
  padding: 24px 0;
`,Pe=t.Ay.div`
  display: grid;
  gap: 12px;
`,Oe=t.Ay.div`
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
`,qe=t.Ay.div`
  flex: 1;
`,Ye=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Le=t.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,Qe=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,We=t.Ay.div`
  display: flex;
  gap: 8px;
`,Ge=t.Ay.button`
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
`,Ze=t.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Ve=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,He=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,Je=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,Ke=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  margin-left: 8px;
`,Xe=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ei=t.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,ii=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,ri=t.Ay.button`
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
`,ni=t.Ay.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #FFFBEB;
  border-radius: 12px;
  border: 1px solid #FDE68A;
`,ti=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #92400E;
  font-weight: 500;
`,ai=e=>{let{brandId:i,restaurantId:r,onCountChange:t,onCategoryChange:a}=e;const{t:s}=(0,b.Bd)("recipes"),{user:l}=(0,d.As)(),u=r||(null===l||void 0===l?void 0:l.restaurant_id)||(null===l||void 0===l?void 0:l.restaurantId),[x,g]=(0,n.useState)([]),[m,y]=(0,n.useState)([]),[v,F]=(0,n.useState)(!0),[A,_]=(0,n.useState)(!1),[w,C]=(0,n.useState)(null),[k,B]=(0,n.useState)(!1),[E,z]=(0,n.useState)(null),[$,S]=(0,n.useState)({name:"",emoji:"",description:""}),R="Restaurant Admin"===(null===l||void 0===l?void 0:l.role),I="Brand General"===(null===l||void 0===l?void 0:l.role)||"Brand Manager"===(null===l||void 0===l?void 0:l.role),D=(0,n.useCallback)(()=>(0,f.c4)(),[]);(0,n.useEffect)(()=>{(async()=>{F(!0);const e=D();try{if(I&&i){const r=await fetch(`/api/brands/${i}/recipe-categories`,{headers:{Authorization:`Bearer ${e}`}}),n=await r.json();n.success&&(g(n.data),t(n.data.length))}else if(R&&u){const i=await fetch(`/api/restaurants/${u}/recipe-categories`,{headers:{Authorization:`Bearer ${e}`}}),a=await i.json();var r,n;if(a.success)g(a.data.own_categories||[]),y(a.data.brand_categories||[]),t(((null===(r=a.data.own_categories)||void 0===r?void 0:r.length)||0)+((null===(n=a.data.brand_categories)||void 0===n?void 0:n.length)||0))}}catch(a){console.error("Failed to fetch data:",a)}finally{F(!1)}})()},[i,u,I,R,D,t]);const T=async()=>{try{const n=D();if(I&&i){const e=await fetch(`/api/brands/${i}/recipe-categories`,{headers:{Authorization:`Bearer ${n}`}}),r=await e.json();r.success&&(g(r.data),t(r.data.length))}else if(R&&u){const i=await fetch(`/api/restaurants/${u}/recipe-categories`,{headers:{Authorization:`Bearer ${n}`}}),a=await i.json();var e,r;if(a.success)g(a.data.own_categories||[]),y(a.data.brand_categories||[]),t(((null===(e=a.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(r=a.data.brand_categories)||void 0===r?void 0:r.length)||0))}}catch(n){console.error("Failed to fetch categories:",n)}},M=e=>{e?(C(e),S({name:e.name,emoji:e.emoji||"",description:e.description||""})):(C(null),S({name:"",emoji:"",description:""})),_(!0)},U=()=>{_(!1),C(null),S({name:"",emoji:"",description:""})},N=async e=>{if(e.preventDefault(),$.name.trim())try{const e=(0,f.c4)();let r="";const n=w?"PUT":"POST";if(I&&i?r=w?`/api/brands/${i}/recipe-categories/${w.id}`:`/api/brands/${i}/recipe-categories`:R&&u&&(r=w?`/api/restaurants/${u}/recipe-categories/${w.id}`:`/api/restaurants/${u}/recipe-categories`),!r)return;const t=await fetch(r,{method:n,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:$.name.trim(),emoji:$.emoji||null,description:$.description.trim()||null})}),o=await t.json();o.success?(U(),T(),null===a||void 0===a||a()):alert(o.error||"Failed to save")}catch(r){console.error("Failed to save category:",r),alert("Failed to save")}},P=async(e,r)=>{const n="up"===r?e-1:e+1;if(n<0||n>=x.length)return;const t=[...x];[t[e],t[n]]=[t[n],t[e]];const a=t.map((e,i)=>({id:e.id,display_order:i}));try{const e=(0,f.c4)();let r="";if(I&&i?r=`/api/brands/${i}/recipe-categories/reorder`:R&&u&&(r=`/api/restaurants/${u}/recipe-categories/reorder`),!r)return;await fetch(r,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:a})}),T()}catch(o){console.error("Failed to reorder:",o)}},O=function(e,i,r){let n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,j.jsxs)(Oe,{isActive:e.is_active,readOnly:n,children:[!n&&(0,j.jsx)(o.Xd,{onMoveUp:()=>P(i,"up"),onMoveDown:()=>P(i,"down"),disableUp:0===i,disableDown:i===r.length-1}),e.emoji&&(0,j.jsx)(ei,{children:e.emoji}),(0,j.jsxs)(qe,{children:[(0,j.jsxs)(Ye,{children:[e.name,n&&(0,j.jsx)(Ke,{children:s("recipes:recipeCategoriesTab.brand")})]}),(0,j.jsxs)(Le,{children:[(0,j.jsxs)("span",{children:[e.recipe_count||0," recipes"]}),!n&&(0,j.jsx)(Xe,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,j.jsx)(Qe,{children:e.description})]}),!n&&(0,j.jsxs)(We,{children:[(0,j.jsx)(Ge,{onClick:()=>M(e),title:"Edit",children:(0,j.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,j.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,j.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,j.jsx)(Ge,{onClick:()=>(e=>{z(e),B(!0)})(e),title:"Delete",children:(0,j.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,j.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return v?(0,j.jsx)(Ne,{children:(0,j.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:s("recipes:recipeCategoriesTab.loading")})}):(0,j.jsxs)(Ne,{children:[(0,j.jsxs)(He,{children:[(0,j.jsx)(Je,{children:s("recipes:recipeCategoriesTab.recipeCategories")}),(0,j.jsx)(p.cc,{variant:"primary",onClick:()=>M(),children:"Add Category"})]}),R&&m.length>0&&(0,j.jsxs)(ni,{children:[(0,j.jsx)(ti,{children:"Brand Categories (Read Only)"}),(0,j.jsx)(Pe,{children:m.map((e,i)=>O(e,i,m,!0))})]}),0===x.length?(0,j.jsxs)(c.pp,{children:[(0,j.jsx)(Ze,{children:s("recipes:recipeCategoriesTab.noRecipeCategoriesYet")}),(0,j.jsx)(Ve,{children:"Create categories to organize your recipes"}),(0,j.jsx)(p.cc,{variant:"primary",onClick:()=>M(),children:"Add Category"})]}):(0,j.jsx)(Pe,{children:x.map((e,i)=>{return O(e,i,x,(r=e,R&&"brand"===r.owner_type));var r})}),(0,j.jsx)(Ue.aF,{isOpen:A,onClose:U,title:(w?"Edit":"New")+" Recipe Category",size:"medium",footer:(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(Ue.yl,{variant:"secondary",onClick:U,children:s("recipes:recipeCategoriesTab.cancel")}),(0,j.jsx)(Ue.yl,{variant:"primary",onClick:N,disabled:!$.name.trim(),children:w?"Update":"Create"})]}),children:(0,j.jsxs)("form",{onSubmit:N,children:[(0,j.jsxs)(Ue.gE,{children:[(0,j.jsx)(Ue.lR,{children:"Category Name *"}),(0,j.jsx)(Ue.ZQ,{type:"text",value:$.name,onChange:e=>S({...$,name:e.target.value}),placeholder:"e.g., Main Dishes",autoFocus:!0,required:!0})]}),(0,j.jsxs)(Ue.gE,{children:[(0,j.jsx)(Ue.lR,{children:s("recipes:recipeCategoriesTab.icon")}),(0,j.jsx)(ii,{children:["\ud83c\udf54","\ud83c\udf55","\ud83c\udf57","\ud83e\udd57","\ud83c\udf5c","\ud83c\udf5d","\ud83c\udf64","\ud83e\udd58","\ud83c\udf5b","\ud83c\udf72","\u2615","\ud83e\udd64","\ud83e\uddc3","\ud83c\udf75","\ud83e\uddcb","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd43","\ud83c\udf79","\ud83c\udf78","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf68","\ud83c\udf67","\ud83c\udf66","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6b","\ud83e\udd50","\ud83e\udd56","\ud83c\udf5e","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf71","\ud83c\udf59","\ud83c\udf58","\ud83c\udf63","\ud83c\udf65","\ud83c\udf61","\ud83c\udf62","\ud83c\udf60","\ud83e\udd5f","\ud83e\udd60","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf5f","\ud83e\uded3","\ud83e\udd53","\ud83e\uddc6"].map(e=>(0,j.jsx)(ri,{selected:$.emoji===e,onClick:()=>S({...$,emoji:e}),type:"button",children:e},e))})]}),(0,j.jsxs)(Ue.gE,{children:[(0,j.jsx)(Ue.lR,{children:s("recipes:recipeCategoriesTab.description")}),(0,j.jsx)(Ue.Lz,{value:$.description,onChange:e=>S({...$,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,j.jsx)(h.A,{isOpen:k,onCancel:()=>{B(!1),z(null)},onConfirm:async()=>{if(E)try{const e=(0,f.c4)();let r="";if(I&&i?r=`/api/brands/${i}/recipe-categories/${E.id}`:R&&u&&(r=`/api/restaurants/${u}/recipe-categories/${E.id}`),!r)return;const n=await fetch(r,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(B(!1),z(null),T(),null===a||void 0===a||a()):alert(t.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:E?`Are you sure you want to delete "${E.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},oi=t.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,si=t.Ay.select`
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
`,li=()=>{const{t:e}=(0,b.Bd)("recipes"),{user:i}=(0,d.As)(),{restaurantId:r}=(0,a.g)(),[t,c]=(0,a.ok)(),[p,u]=(0,l.M)("recipes"),[x,g]=(0,n.useState)(0),[h,m]=(0,n.useState)(0),[y,v]=(0,n.useState)([]),[F,A]=(0,n.useState)(!0),[_,w]=(0,n.useState)(0),C=t.get("brandId"),k=C?Number(C):y.length>0?y[0].id:null;(0,n.useEffect)(()=>{i&&"Brand General"===i.role?B():A(!1)},[i]);const B=async()=>{try{const e=(0,f.c4)(),i=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();v(e),e.length>0&&!C&&c({tab:p,brandId:String(e[0].id)})}}catch(e){console.error("Error fetching brands:",e)}finally{A(!1)}},E=e=>{u(e),k&&c(i=>(i.set("tab",e),i.set("brandId",String(k)),i))};return F?(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(o.mc,{children:[(0,j.jsx)(o.Y9,{children:(0,j.jsx)(o.hE,{children:"Brand General"===(null===i||void 0===i?void 0:i.role)||"Brand Manager"===(null===i||void 0===i?void 0:i.role)?"Brand Recipes":"Recipes"})}),(0,j.jsx)(o.UC,{children:(0,j.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})}):"Brand General"===(null===i||void 0===i?void 0:i.role)&&0===y.length?(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(o.mc,{children:[(0,j.jsx)(o.Y9,{children:(0,j.jsx)(o.hE,{children:"Brand General"===(null===i||void 0===i?void 0:i.role)||"Brand Manager"===(null===i||void 0===i?void 0:i.role)?"Brand Recipes":"Recipes"})}),(0,j.jsx)(o.UC,{children:(0,j.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No brands found. Please create a brand first."})})]})}):(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(o.mc,{children:[(0,j.jsxs)(o.Y9,{children:[(0,j.jsx)(o.hE,{children:e("recipes:recipeManagementPage.recipes")}),"Brand General"===(null===i||void 0===i?void 0:i.role)&&y.length>0&&(0,j.jsx)(oi,{children:(0,j.jsx)(si,{value:k||"",onChange:e=>{return i=Number(e.target.value),void c({tab:p,brandId:String(i)});var i},children:y.map(e=>(0,j.jsx)("option",{value:e.id,children:e.name},e.id))})})]}),(0,j.jsxs)(o.UC,{children:[(0,j.jsxs)(s.tU,{children:[(0,j.jsxs)(s.oz,{active:"recipes"===p,onClick:()=>E("recipes"),children:["Recipes ",(0,j.jsx)(s.Ex,{count:x,showZero:!0})]}),(0,j.jsxs)(s.oz,{active:"recipe-categories"===p,onClick:()=>E("recipe-categories"),children:["Recipe Categories ",(0,j.jsx)(s.Ex,{count:h,showZero:!0})]})]}),(k||"Brand General"!==(null===i||void 0===i?void 0:i.role))&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("div",{style:{display:"recipes"===p?"block":"none"},children:(0,j.jsx)(Me,{brandId:k,restaurantId:r?Number(r):null,onCountChange:g,categoryRefreshKey:_})}),(0,j.jsx)("div",{style:{display:"recipe-categories"===p?"block":"none"},children:(0,j.jsx)(ai,{brandId:k,restaurantId:r?Number(r):null,onCountChange:m,onCategoryChange:()=>w(e=>e+1)})})]})]})]})})}}}]);