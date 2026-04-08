"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7625],{251:(e,i,r)=>{r.d(i,{_W:()=>t,jr:()=>a,zQ:()=>o});const t=[{value:"kg",label:"kg (kilogram)",category:"weight",baseUnit:"g",multiplier:1e3},{value:"g",label:"g (gram)",category:"weight",baseUnit:"g",multiplier:1},{value:"mg",label:"mg (milligram)",category:"weight",baseUnit:"g",multiplier:.001},{value:"L",label:"L (liter)",category:"volume",baseUnit:"ml",multiplier:1e3},{value:"ml",label:"ml (milliliter)",category:"volume",baseUnit:"ml",multiplier:1},{value:"piece",label:"piece",category:"count",baseUnit:"piece",multiplier:1},{value:"pack",label:"pack",category:"count",baseUnit:"pack",multiplier:1},{value:"box",label:"box",category:"count",baseUnit:"box",multiplier:1},{value:"can",label:"can",category:"count",baseUnit:"can",multiplier:1},{value:"bottle",label:"bottle",category:"count",baseUnit:"bottle",multiplier:1},{value:"bag",label:"bag",category:"count",baseUnit:"bag",multiplier:1},{value:"portion",label:"portion",category:"serving",baseUnit:"portion",multiplier:1},{value:"serving",label:"serving",category:"serving",baseUnit:"serving",multiplier:1},{value:"tbsp",label:"tbsp (tablespoon)",category:"cooking",baseUnit:"ml",multiplier:15},{value:"tsp",label:"tsp (teaspoon)",category:"cooking",baseUnit:"ml",multiplier:5},{value:"cup",label:"cup",category:"cooking",baseUnit:"ml",multiplier:240}],n=(t.map(e=>e.value),t.filter(e=>"weight"===e.category),t.filter(e=>"volume"===e.category),t.filter(e=>"count"===e.category),t.filter(e=>"serving"===e.category),t.filter(e=>"cooking"===e.category),e=>t.find(i=>i.value===e)),a=(e,i,r,t)=>{if(i===t)return e*r;const a=((e,i,r)=>{if(i===r)return e;const t=n(i),a=n(r);return t&&a?t.baseUnit!==a.baseUnit?null:e*t.multiplier/a.multiplier:null})(r,t,i);return null===a?(console.warn(`Cannot convert ${t} to ${i}`),null):e*a},o=(e,i,r)=>i<=0?{cost:e,unit:r}:{cost:e/i,unit:r}},2653:(e,i,r)=>{r.d(i,{M:()=>a});var t=r(9950),n=r(4492);function a(e){const[i,r]=(0,n.ok)(),a=(0,t.useCallback)(()=>i.get("tab")||e,[i,e]),[o,s]=(0,t.useState)(a());return[o,(0,t.useCallback)(e=>{s(e),r({tab:e})},[r])]}},3705:(e,i,r)=>{r.d(i,{cc:()=>n});var t=r(4752);const n=t.Ay.button`
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
`;t.Ay.select`
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
`,t.Ay.input`
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
`,t.Ay.div`
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
`},4021:(e,i,r)=>{r.d(i,{i1:()=>o});var t=r(9950),n=r(1367),a=r(6038);const o=()=>{const{user:e}=(0,n.As)(),[i,r]=(0,t.useState)("RM"),[o]=(0,t.useState)(Object.keys(a.DL)),[s,l]=(0,t.useState)(!0),[d,c]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const i=window.location.pathname.split("/"),t=i.indexOf("restaurant");let n=t>=0?i[t+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return r("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){var a;const e=await i.json(),t=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";r(t)}else r("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),r("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:i,supportedCurrencies:o,loading:s,error:d}}},7617:(e,i,r)=>{r.d(i,{A:()=>x});r(9950);var t=r(7119),n=r(4752),a=r(9610),o=r(4414);const s=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,l=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=n.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=n.Ay.button`
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
`,x=e=>{let{isOpen:i,title:r,message:n,onConfirm:x,onCancel:g,confirmText:h="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return i?t.createPortal((0,o.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&g()},style:{zIndex:1100},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(l,{children:[(0,o.jsx)(d,{children:r}),(0,o.jsx)(c,{children:n})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:g,children:m}),(0,o.jsx)(u,{variant:"primary",type:y,onClick:x,children:h})]})]})}),document.body):null}},7625:(e,i,r)=>{r.r(i),r.d(i,{default:()=>si});var t=r(9950),n=r(4752),a=r(4492),o=r(8409),s=r(2597),l=r(2653),d=r(1367),c=r(2853),p=r(3705),u=r(2488),x=r(4877),g=r(9194),h=r(7617),m=r(4021),y=r(6038),v=r(251),b=r(5030),f=r(4414);const j=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,F=n.Ay.div`
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
`,A=n.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,_=n.Ay.div`
  flex: 1;
  min-width: 0;
`,w=n.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,C=n.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,k=n.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  background: #FEF3C7;
  color: #92400E;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`,B=n.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,E=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,z=n.Ay.div``,S=n.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,$=n.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,I=n.Ay.div`
  flex: 1;
  min-height: 12px;
`,R=n.Ay.div`
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,D=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,T=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,M=n.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,U=n.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  padding: 10px;
  background: #FAFAFA;
  border-radius: 8px;
  font-size: 12px;
  color: #6B7280;
`,N=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,P=n.Ay.div`
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
`,O=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`,q=n.Ay.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`,Y=n.Ay.div`
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
`,L=n.Ay.div`
  font-size: 80px;
  line-height: 1;
`,Q=n.Ay.div`
  flex: 1;
`,W=n.Ay.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,G=n.Ay.span`
  display: inline-block;
  padding: 6px 12px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
`,Z=n.Ay.p`
  font-size: 15px;
  color: #6B7280;
  margin: 16px 0 0 0;
  line-height: 1.6;
`,V=n.Ay.div`
  padding: 0;
  margin-bottom: 8px;
`,H=n.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`,J=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,K=n.Ay.div`
  text-align: center;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,X=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,ee=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,ie=n.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`,re=n.Ay.table`
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
`,te=n.Ay.div`
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
`,ne=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,ae=n.Ay.button`
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
`,oe=n.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,se=n.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,le=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,de=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,ce=n.Ay.div`
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
`,pe=n.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,ue=n.Ay.button`
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
`,xe=n.Ay.button`
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
`,ge=n.Ay.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E5E7EB;
`,he=n.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,me=n.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,ye=n.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,ve=n.Ay.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`,be=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`,fe=n.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
`,je=n.Ay.button`
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
`,Fe=n.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Ae=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,_e=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,we=n.Ay.span`
  font-size: 20px;
`,Ce=n.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,ke=n.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,Be=n.Ay.div`
  margin-bottom: 24px;
`,Ee=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`,ze=n.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,Se=n.Ay.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,$e=n.Ay.span`
  font-size: 15px;
  color: #0A2540;
`,Ie=n.Ay.span`
  font-size: 15px;
  font-weight: 600;
  color: #635BFF;
`,Re=n.Ay.p`
  font-size: 15px;
  color: #4B5563;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
`,De=n.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`,Te=e=>{var i,r;let{brandId:n,restaurantId:a,onCountChange:s,categoryRefreshKey:l}=e;const{t:Te}=(0,b.Bd)("recipes"),{user:Me}=(0,d.As)(),{defaultCurrency:Ue}=(0,m.i1)(),[Ne,Pe]=(0,t.useState)("RM"),Oe=a||(null===Me||void 0===Me?void 0:Me.restaurant_id)||(null===Me||void 0===Me?void 0:Me.restaurantId),[qe,Ye]=(0,t.useState)([]),[Le,Qe]=(0,t.useState)([]),[We,Ge]=(0,t.useState)([]),[Ze,Ve]=(0,t.useState)(!0);(0,t.useEffect)(()=>{Ue&&Pe(Ue)},[Ue]);const[He,Je]=(0,t.useState)(()=>new URLSearchParams(window.location.search).get("search")||""),[Ke,Xe]=(0,t.useState)("all"),[ei,ii]=(0,t.useState)(()=>"image"===localStorage.getItem("recipesViewMode")?"image":"compact"),[ri,ti]=(0,t.useState)({}),[ni,ai]=(0,t.useState)(null),[oi,si]=(0,t.useState)(!1),[li,di]=(0,t.useState)({name:"",description:"",category:"",recipe_category_id:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),[ci,pi]=(0,t.useState)([]),[ui,xi]=(0,t.useState)(""),[gi,hi]=(0,t.useState)([]),[mi,yi]=(0,t.useState)({isOpen:!1,recipeId:null,recipeName:""}),[vi,bi]=(0,t.useState)(null),[fi,ji]=(0,t.useState)(!1),[Fi,Ai]=(0,t.useState)(!1),[_i,wi]=(0,t.useState)(null),Ci="Restaurant Admin"===(null===Me||void 0===Me?void 0:Me.role),ki=e=>Ci&&"brand"===e.owner_type,Bi=Ci&&"brand"===(null===ni||void 0===ni?void 0:ni.owner_type),Ei=(0,t.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,t.useEffect)(()=>{(async()=>{if(!n&&!Oe)return;Ve(!0);const e=Ei(),i="Brand General"===(null===Me||void 0===Me?void 0:Me.role)||"Brand Manager"===(null===Me||void 0===Me?void 0:Me.role);try{var r,t,a;const d=[];let c="",p="",u="";i&&n?(c=`/api/brands/${n}/recipes`,p=`/api/brands/${n}/ingredients`,u=`/api/brands/${n}/recipe-categories`):Ci&&Oe&&(c=`/api/restaurants/${Oe}/recipes`,p=`/api/restaurants/${Oe}/ingredients`,u=`/api/restaurants/${Oe}/recipe-categories`),c&&(d.push(fetch(c,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(p,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(u,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())),Ci&&Oe&&d.push(fetch(`/api/restaurants/${Oe}/brand-recipes`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(`/api/restaurants/${Oe}/brand-ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())));const x=await Promise.all(d);if(null!==(r=x[0])&&void 0!==r&&r.success){var o;let e=Array.isArray(x[0].data)?x[0].data:[];Ci&&null!==(o=x[3])&&void 0!==o&&o.success&&Array.isArray(x[3].data)&&(e=[...x[3].data,...e]),Ye(e)}if(null!==(t=x[1])&&void 0!==t&&t.success){var s;let e=Array.isArray(x[1].data)?x[1].data:[];Ci&&null!==(s=x[4])&&void 0!==s&&s.success&&Array.isArray(x[4].data)&&(e=[...x[4].data,...e]),Qe(e)}if(null!==(a=x[2])&&void 0!==a&&a.success)if(Array.isArray(x[2].data))Ge(x[2].data.filter(e=>e.is_active));else{const e=[...x[2].data.own_categories||[],...x[2].data.brand_categories||[]].filter(e=>e.is_active);Ge(e)}if(Ci&&Oe)try{const i=await fetch(`/api/menu?restaurant_id=${Oe}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json(),r=e.data||e||[],t={};(Array.isArray(r)?r:[]).forEach(e=>{e.recipe_id&&(t[e.recipe_id]||(t[e.recipe_id]=[]),t[e.recipe_id].push(e.name))}),ti(t)}}catch(l){}}catch(d){console.error("Failed to fetch data:",d)}finally{Ve(!1)}})()},[n,Oe,null===Me||void 0===Me?void 0:Me.role,Ei,Ci]),(0,t.useEffect)(()=>{l&&(n||Oe)&&zi()},[l]);const zi=async()=>{try{let e="";if("Brand General"===(null===Me||void 0===Me?void 0:Me.role)||"Brand Manager"===(null===Me||void 0===Me?void 0:Me.role)?n&&(e=`/api/brands/${n}/recipe-categories`):"Restaurant Admin"===(null===Me||void 0===Me?void 0:Me.role)&&Oe&&(e=`/api/restaurants/${Oe}/recipe-categories`),!e)return;const i=localStorage.getItem("auth_token"),r=await fetch(e,{headers:{Authorization:`Bearer ${i}`}}),t=await r.json();if(t.success)if(Array.isArray(t.data))Ge(t.data.filter(e=>e.is_active));else{const e=[...t.data.own_categories||[],...t.data.brand_categories||[]].filter(e=>e.is_active);Ge(e)}}catch(e){console.error("Failed to fetch recipe categories:",e)}},Si=function(e){let i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];var r,t,n,a,o,s;(bi(null),ji(i),e)?(ai(e),di({name:e.name,description:e.description||"",category:e.category,recipe_category_id:(null===(r=e.recipe_category_id)||void 0===r?void 0:r.toString())||"",image:e.image||"",yield_amount:(null===(t=e.yield_amount)||void 0===t?void 0:t.toString())||"1",yield_unit:e.yield_unit||"portion",prep_time:(null===(n=e.prep_time)||void 0===n?void 0:n.toString())||"",cook_time:(null===(a=e.cook_time)||void 0===a?void 0:a.toString())||"",instructions:e.instructions||"",instructions_summary:e.instructions_summary||"",instructions_detail:e.instructions_detail||"",suggested_price:(null===(o=e.suggested_price)||void 0===o?void 0:o.toString())||""}),pi(e.category?e.category.split(",").map(e=>e.trim()):[]),hi((null===(s=e.recipeIngredients)||void 0===s?void 0:s.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""})))||[])):(ai(null),di({name:"",description:"",category:"",recipe_category_id:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),pi([]),hi([]));si(!0)},$i=()=>{si(!1),ai(null),ji(!1),bi(null),di({name:"",description:"",category:"",recipe_category_id:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),hi([]),pi([]),xi("")},Ii=(e,i,r)=>{const t=[...gi];if("ingredient_id"===i){const n=Le.find(e=>e.id===r);t[e]=n?{...t[e],ingredient_id:r,unit:n.unit}:{...t[e],[i]:r}}else t[e]={...t[e],[i]:r};hi(t)},Ri=()=>gi.reduce((e,i)=>{const r=Le.find(e=>e.id===i.ingredient_id);if(r&&i.quantity){var t;const n=null!==(t=r.effective_cost)&&void 0!==t?t:r.unit_cost,a=r.base_quantity||1,o=parseFloat(n.toString())/a;return e+parseFloat(i.quantity)*o}return e},0),Di=qe.filter(e=>{var i;const r=e.name.toLowerCase().includes(He.toLowerCase()),t="all"===Ke||(null===(i=e.recipe_category_id)||void 0===i?void 0:i.toString())===Ke||e.category===Ke;return r&&t}),Ti=[{id:"all",name:"All Categories"},...We.map(e=>({id:e.id.toString(),name:e.name}))];return(0,t.useEffect)(()=>{s(qe.length)},[qe.length,s]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,f.jsxs)(u.Qn,{style:{marginBottom:0,flex:1},children:[(0,f.jsx)(u.DO,{type:"text",placeholder:"Search recipes...",value:He,onChange:e=>Je(e.target.value)}),(0,f.jsx)(u.Jt,{value:Ke,onChange:e=>Xe(e.target.value),children:Ti.map(e=>(0,f.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,f.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[(0,f.jsxs)("div",{style:{display:"flex",background:"#F3F4F6",borderRadius:"6px",padding:"2px"},children:[(0,f.jsx)("button",{onClick:()=>{ii("compact"),localStorage.setItem("recipesViewMode","compact")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"compact"===ei?"white":"transparent",color:"compact"===ei?"#0A2540":"#6B7C93",boxShadow:"compact"===ei?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Compact"}),(0,f.jsx)("button",{onClick:()=>{ii("image"),localStorage.setItem("recipesViewMode","image")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"image"===ei?"white":"transparent",color:"image"===ei?"#0A2540":"#6B7C93",boxShadow:"image"===ei?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Image"})]}),(0,f.jsx)(p.cc,{variant:"primary",onClick:()=>Si(null),children:"New Recipe"})]})]}),Ze?(0,f.jsx)(c.pp,{children:(0,f.jsx)(oe,{children:"Loading..."})}):0===Di.length?(0,f.jsxs)(c.pp,{children:[(0,f.jsx)(oe,{children:"No recipes found"}),(0,f.jsx)(se,{children:He||"all"!==Ke?"Try adjusting your filters":"Create your first recipe to get started"}),!He&&"all"===Ke&&(0,f.jsx)(p.cc,{variant:"primary",onClick:()=>Si(null),children:"Create First Recipe"})]}):(0,f.jsx)(j,{children:Di.map(e=>{var i,r,t;return(0,f.jsxs)(F,{isActive:e.is_active,onClick:()=>Si(e,!0),children:["image"===ei&&e.image&&(0,f.jsx)("div",{style:{width:"100%",aspectRatio:"16 / 9",borderRadius:"8px 8px 0 0",overflow:"hidden"},children:(0,f.jsx)("img",{src:e.image,alt:e.name,style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,f.jsx)(A,{children:(0,f.jsxs)(_,{children:[(0,f.jsxs)(w,{children:[e.name,Ci&&"brand"===e.owner_type&&(0,f.jsx)(k,{children:"Brand"})]}),(0,f.jsxs)(C,{children:[null===(i=e.recipeCategory)||void 0===i?void 0:i.emoji," ",(null===(r=e.recipeCategory)||void 0===r?void 0:r.name)||e.category||"Uncategorized"]})]})}),e.description&&(0,f.jsx)(B,{children:e.description}),(0,f.jsxs)(E,{children:[Ci&&"brand"===e.owner_type&&null!==e.restaurant_ingredient_cost?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(z,{children:[(0,f.jsx)(S,{style:{color:"#6B7280"},children:"Brand Cost"}),(0,f.jsx)($,{style:{color:"#6B7280",textDecoration:"line-through",fontSize:"13px"},children:(0,y.vv)(Number(e.total_ingredient_cost||0),Ne)})]}),(0,f.jsxs)(z,{children:[(0,f.jsx)(S,{style:{color:"#2563EB"},children:"My Cost"}),(0,f.jsx)($,{style:{color:"#2563EB",fontWeight:700},children:(0,y.vv)(Number(e.effective_ingredient_cost||0),Ne)})]})]}):(0,f.jsxs)(z,{children:[(0,f.jsx)(S,{children:"Cost"}),(0,f.jsx)($,{children:(0,y.vv)(Number(Ci&&"brand"===e.owner_type?e.effective_ingredient_cost||e.total_ingredient_cost||0:e.total_ingredient_cost||0),Ne)})]}),(0,f.jsxs)(z,{children:[(0,f.jsx)(S,{children:"Suggested"}),(0,f.jsx)($,{children:(0,y.vv)(Number(e.suggested_price||0),Ne)})]})]}),(e.prep_time||e.cook_time)&&(0,f.jsxs)(U,{children:[e.prep_time&&(0,f.jsxs)(N,{children:[(0,f.jsx)("span",{children:"Prep:"}),(0,f.jsxs)("strong",{children:[e.prep_time," min"]})]}),e.cook_time&&(0,f.jsxs)(N,{children:[(0,f.jsx)("span",{children:"Cook:"}),(0,f.jsxs)("strong",{children:[e.cook_time," min"]})]})]}),e.instructions_summary&&(0,f.jsx)(P,{children:e.instructions_summary}),(0,f.jsx)(I,{}),(0,f.jsxs)(R,{children:[(0,f.jsxs)(D,{children:[(null===(t=e.recipeIngredients)||void 0===t?void 0:t.length)||0," ingredients"]}),e.recipeIngredients&&e.recipeIngredients.length>0&&(0,f.jsxs)(T,{children:[e.recipeIngredients.slice(0,5).map((e,i)=>{var r;return(0,f.jsx)(M,{children:(null===(r=e.ingredient)||void 0===r?void 0:r.name)||`Ingredient #${e.ingredient_id}`},i)}),e.recipeIngredients.length>5&&(0,f.jsxs)(M,{style:{background:"#E0E7FF",color:"#4F46E5"},children:["+",e.recipeIngredients.length-5," more"]})]})]}),ri[e.id]&&ri[e.id].length>0&&(0,f.jsx)("div",{style:{marginTop:"8px",display:"flex",gap:"4px",flexWrap:"wrap"},children:ri[e.id].map((e,i)=>(0,f.jsx)("span",{style:{fontSize:"11px",background:"#ECFDF5",color:"#059669",padding:"2px 8px",borderRadius:"4px",fontWeight:500},children:e},i))}),(0,f.jsxs)(ne,{onClick:e=>e.stopPropagation(),children:[(0,f.jsx)(ae,{variant:"secondary",onClick:()=>(e=>{wi(e),Ai(!0)})(e),children:"Recipe"}),!ki(e)&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(ae,{variant:"primary",onClick:()=>Si(e,!1),children:"Edit"}),(0,f.jsx)(ae,{variant:"danger",onClick:()=>(e=>{yi({isOpen:!0,recipeId:e.id,recipeName:e.name})})(e),children:"Delete"})]})]})]},e.id)})}),(0,f.jsx)(o.aF,{isOpen:oi,onClose:$i,title:fi?"Recipe Details":ni?"Edit Recipe":"New Recipe",size:fi?"large":"medium",children:fi&&ni?(0,f.jsxs)(O,{children:[(0,f.jsxs)(q,{children:[(0,f.jsx)(Y,{children:li.image?(0,f.jsx)("img",{src:li.image,alt:li.name}):(0,f.jsx)(L,{children:ni.emoji||"\ud83c\udf7d\ufe0f"})}),(0,f.jsxs)(Q,{children:[(0,f.jsx)(W,{children:li.name}),(0,f.jsxs)(G,{children:[null===(i=ni.recipeCategory)||void 0===i?void 0:i.emoji," ",(null===(r=ni.recipeCategory)||void 0===r?void 0:r.name)||li.category||"Uncategorized"]}),li.description&&(0,f.jsx)(Z,{children:li.description})]})]}),(0,f.jsxs)(V,{children:[(0,f.jsx)(H,{children:"Cost & Time"}),(0,f.jsxs)(J,{children:[Ci&&"brand"===ni.owner_type&&null!==ni.restaurant_ingredient_cost?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(K,{children:[(0,f.jsx)(X,{style:{color:"#6B7280"},children:"Brand Cost"}),(0,f.jsx)(ee,{style:{color:"#6B7280",textDecoration:"line-through",fontSize:"14px"},children:(0,y.vv)(Number(ni.total_ingredient_cost||0),Ne)})]}),(0,f.jsxs)(K,{children:[(0,f.jsx)(X,{style:{color:"#2563EB"},children:"My Cost"}),(0,f.jsx)(ee,{style:{color:"#2563EB",fontWeight:700},children:(0,y.vv)(Number(ni.effective_ingredient_cost||0),Ne)})]})]}):(0,f.jsxs)(K,{children:[(0,f.jsx)(X,{children:"Ingredient Cost"}),(0,f.jsx)(ee,{children:(0,y.vv)(Number(Ci&&"brand"===ni.owner_type?ni.effective_ingredient_cost||ni.total_ingredient_cost||0:ni.total_ingredient_cost||0),Ne)})]}),(0,f.jsxs)(K,{children:[(0,f.jsx)(X,{children:"Suggested Price"}),(0,f.jsx)(ee,{children:(0,y.vv)(Number(li.suggested_price||0),Ne)})]}),li.prep_time&&(0,f.jsxs)(K,{children:[(0,f.jsx)(X,{children:"Prep Time"}),(0,f.jsxs)(ee,{children:[li.prep_time," min"]})]}),li.cook_time&&(0,f.jsxs)(K,{children:[(0,f.jsx)(X,{children:"Cook Time"}),(0,f.jsxs)(ee,{children:[li.cook_time," min"]})]})]})]}),gi.length>0&&(0,f.jsxs)(V,{children:[(0,f.jsxs)(H,{children:["Ingredients (",gi.length,")"]}),(0,f.jsxs)(re,{children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)("th",{children:"Ingredient"}),(0,f.jsx)("th",{children:"Quantity"}),(0,f.jsx)("th",{children:"Unit Cost"}),Bi&&(0,f.jsx)("th",{children:"My Cost"}),(0,f.jsx)("th",{children:"Subtotal"})]})}),(0,f.jsx)("tbody",{children:gi.map((e,i)=>{var r,t;const n=Le.find(i=>i.id===e.ingredient_id),a=(null===n||void 0===n?void 0:n.base_quantity)||1,o=((null===n||void 0===n?void 0:n.unit_cost)||0)/a,s=(null!==(r=null!==(t=null===n||void 0===n?void 0:n.effective_cost)&&void 0!==t?t:null===n||void 0===n?void 0:n.unit_cost)&&void 0!==r?r:0)/a,l=parseFloat(e.quantity)*s,d=null!==(null===n||void 0===n?void 0:n.restaurant_cost)&&void 0!==(null===n||void 0===n?void 0:n.restaurant_cost);return(0,f.jsxs)("tr",{children:[(0,f.jsx)("td",{children:(0,f.jsx)("strong",{children:(null===n||void 0===n?void 0:n.name)||`Ingredient #${e.ingredient_id}`})}),(0,f.jsxs)("td",{children:[Number(e.quantity).toFixed(2)," ",e.unit]}),(0,f.jsxs)("td",{style:Bi&&d?{color:"#6B7280",textDecoration:"line-through"}:{},children:[(0,y.Qn)(Ne)," ",o.toFixed(2),"/",null===n||void 0===n?void 0:n.unit]}),Bi&&(0,f.jsx)("td",{style:d?{color:"#2563EB",fontWeight:600}:{color:"#9CA3AF"},children:d?`${(0,y.Qn)(Ne)} ${s.toFixed(2)}/${null===n||void 0===n?void 0:n.unit}`:"-"}),(0,f.jsx)("td",{children:(0,y.vv)(l,Ne)})]},i)})})]}),(0,f.jsxs)(te,{children:[(0,f.jsx)("span",{children:"Total Ingredient Cost"}),(0,f.jsx)("span",{children:(0,y.vv)(Ri(),Ne)})]})]}),(li.instructions_summary||li.instructions)&&(0,f.jsxs)(V,{children:[(0,f.jsx)(H,{children:"Recipe Summary"}),(0,f.jsx)(ie,{children:li.instructions_summary||li.instructions})]}),li.instructions_detail&&(0,f.jsxs)(V,{children:[(0,f.jsx)(H,{children:"Detailed Instructions"}),(0,f.jsx)(ie,{children:li.instructions_detail})]}),ni&&ri[ni.id]&&ri[ni.id].length>0&&(0,f.jsxs)(V,{children:[(0,f.jsxs)(H,{children:["Connected Menus (",ri[ni.id].length,")"]}),(0,f.jsx)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:ri[ni.id].map((e,i)=>(0,f.jsx)("span",{style:{fontSize:"13px",background:"#ECFDF5",color:"#059669",padding:"4px 12px",borderRadius:"6px",fontWeight:500},children:e},i))})]}),(0,f.jsxs)(ye,{children:[(0,f.jsx)(o.yl,{type:"button",variant:"secondary",onClick:$i,children:"Close"}),!ki(ni)&&(0,f.jsx)(o.yl,{type:"button",variant:"primary",onClick:()=>ji(!1),children:"Edit"})]})]}):(0,f.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),bi(null),li.name)if(!li.yield_amount||parseFloat(li.yield_amount)<=0)bi("Yield amount must be greater than 0");else try{let e="";const i=ni?"PUT":"POST";"Brand General"===(null===Me||void 0===Me?void 0:Me.role)||"Brand Manager"===(null===Me||void 0===Me?void 0:Me.role)?e=ni?`/api/brands/${n}/recipes/${ni.id}`:`/api/brands/${n}/recipes`:"Restaurant Admin"===(null===Me||void 0===Me?void 0:Me.role)&&(e=ni?`/api/restaurants/${Oe}/recipes/${ni.id}`:`/api/restaurants/${Oe}/recipes`);const r=localStorage.getItem("auth_token"),t=await fetch(e,{method:i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({...li,category:ci.length>0?ci.join(", "):"",recipe_category_id:li.recipe_category_id?parseInt(li.recipe_category_id):null,yield_amount:parseFloat(li.yield_amount)||1,yield_unit:li.yield_unit||"portion",suggested_price:parseFloat(li.suggested_price)||0,ingredients:gi.map(e=>{const i=Le.find(i=>i.id===e.ingredient_id),r=i&&(0,v.jr)(i.unit_cost/(i.base_quantity||1),i.unit,parseFloat(e.quantity),e.unit)||0;return{ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,cost:r,notes:e.notes}})})}),a=await t.json();a.success?($i(),(async()=>{try{Ve(!0);const e=localStorage.getItem("auth_token");if("Brand General"===(null===Me||void 0===Me?void 0:Me.role)||"Brand Manager"===(null===Me||void 0===Me?void 0:Me.role)){if(n){const i=await fetch(`/api/brands/${n}/recipes`,{headers:{Authorization:`Bearer ${e}`}}),r=await i.json();r.success&&Ye(r.data)}}else if("Restaurant Admin"===(null===Me||void 0===Me?void 0:Me.role)&&Oe){const[i,r]=await Promise.all([fetch(`/api/restaurants/${Oe}/recipes`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(`/api/restaurants/${Oe}/brand-recipes`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())]);let t=[];r.success&&Array.isArray(r.data)&&(t=[...r.data]),i.success&&Array.isArray(i.data)&&(t=[...t,...i.data]),Ye(t)}}catch(e){console.error("Failed to fetch recipes:",e)}finally{Ve(!1)}})()):bi(a.error||"Failed to save recipe")}catch(i){console.error("Failed to save recipe:",i),bi("Failed to save recipe")}else bi("Recipe name is required")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Recipe Name *"}),(0,f.jsx)(o.ZQ,{type:"text",value:li.name,onChange:e=>di({...li,name:e.target.value}),placeholder:"e.g., Nasi Lemak Special",required:!0})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Category"}),(0,f.jsxs)(o.FX,{value:li.recipe_category_id,onChange:e=>di({...li,recipe_category_id:e.target.value}),children:[(0,f.jsx)("option",{value:"",children:"Select category..."}),We.map(e=>(0,f.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Recipe Image"}),(0,f.jsx)(x.A,{value:li.image,onChange:e=>di({...li,image:e}),label:"Drop recipe image here or click to upload"})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Tags (Press Enter to add)"}),(0,f.jsx)(Fe,{type:"text",value:ui,onChange:e=>xi(e.target.value),onKeyDown:e=>{"Enter"===e.key&&ui.trim()&&(e.preventDefault(),ci.includes(ui.trim())||pi([...ci,ui.trim()]),xi(""))},placeholder:"e.g., Main Dish, Spicy, Popular"}),ci.length>0&&(0,f.jsx)(be,{children:ci.map(e=>(0,f.jsxs)(fe,{children:[e,(0,f.jsx)(je,{type:"button",onClick:()=>{return i=e,void pi(ci.filter(e=>e!==i));var i},children:"\xd7"})]},e))})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsxs)(o.lR,{children:["Suggested Price (",Ne,")"]}),(0,f.jsx)(o.ZQ,{type:"number",step:"0.01",value:li.suggested_price,onChange:e=>di({...li,suggested_price:e.target.value}),placeholder:"0.00"})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Description"}),(0,f.jsx)(o.Lz,{value:li.description,onChange:e=>di({...li,description:e.target.value}),placeholder:"Brief description of the recipe..."})]}),(0,f.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Prep Time (minutes)"}),(0,f.jsx)(o.ZQ,{type:"number",value:li.prep_time,onChange:e=>di({...li,prep_time:e.target.value}),placeholder:"e.g., 15"})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Cook Time (minutes)"}),(0,f.jsx)(o.ZQ,{type:"number",value:li.cook_time,onChange:e=>di({...li,cook_time:e.target.value}),placeholder:"e.g., 30"})]})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Recipe Summary"}),(0,f.jsx)(o.Lz,{value:li.instructions_summary,onChange:e=>di({...li,instructions_summary:e.target.value}),placeholder:"Brief summary for list display (e.g., Pan-fried chicken with garlic sauce)",rows:2})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Detailed Instructions"}),(0,f.jsx)(o.Lz,{value:li.instructions_detail,onChange:e=>di({...li,instructions_detail:e.target.value}),placeholder:"Step-by-step cooking instructions...\n1. Prepare ingredients...\n2. Heat the pan...\n3. ...",rows:8})]}),(0,f.jsxs)("div",{children:[(0,f.jsx)(le,{children:"Yield (Production Amount)"}),(0,f.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Yield Amount *"}),(0,f.jsx)(o.ZQ,{type:"number",step:"0.01",min:"0.01",value:li.yield_amount,onChange:e=>di({...li,yield_amount:e.target.value}),placeholder:"e.g., 10",required:!0})]}),(0,f.jsxs)(o.gE,{children:[(0,f.jsx)(o.lR,{children:"Yield Unit *"}),(0,f.jsx)(o.FX,{value:li.yield_unit,onChange:e=>di({...li,yield_unit:e.target.value}),children:v._W.map(e=>(0,f.jsx)("option",{value:e.value,children:e.label},e.value))})]})]})]}),(0,f.jsxs)("div",{children:[(0,f.jsx)(le,{children:"Ingredients"}),gi.length>0&&(0,f.jsxs)(ce,{children:[(0,f.jsx)("span",{children:"Ingredient"}),(0,f.jsx)("span",{children:"Quantity"}),(0,f.jsx)("span",{children:"Unit"}),(0,f.jsx)("span",{children:"Notes"}),(0,f.jsx)("span",{})]}),(0,f.jsx)(de,{children:gi.map((e,i)=>(0,f.jsxs)(pe,{children:[(0,f.jsx)(g.A,{options:Le.map(e=>{const i=Number(e.unit_cost)/(e.base_quantity||1);return{value:e.id,label:e.name,subLabel:`${(0,y.Qn)(Ne)} ${i.toFixed(2)}/${e.unit}`}}),value:e.ingredient_id||null,onChange:e=>Ii(i,"ingredient_id",e),placeholder:"Search ingredient..."}),(0,f.jsx)(o.ZQ,{type:"number",step:"0.01",value:e.quantity,onChange:e=>Ii(i,"quantity",e.target.value),placeholder:"0",required:!0}),(0,f.jsx)(o.ZQ,{value:e.unit,disabled:!0,style:{background:"#F3F4F6",color:"#6B7280"}}),(0,f.jsx)(o.ZQ,{type:"text",value:e.notes,onChange:e=>Ii(i,"notes",e.target.value),placeholder:"Optional"}),(0,f.jsx)(ue,{type:"button",onClick:()=>(e=>{hi(gi.filter((i,r)=>r!==e))})(i),children:"\xd7"})]},i))}),(0,f.jsx)(xe,{type:"button",onClick:()=>{hi([...gi,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),gi.length>0&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(ge,{children:[(0,f.jsx)(he,{children:"Total Ingredient Cost"}),(0,f.jsx)(me,{children:(0,y.vv)(Ri(),Ne)})]}),(0,f.jsxs)(ge,{style:{marginTop:"8px"},children:[(0,f.jsxs)(he,{children:["Cost per ",li.yield_unit]}),(0,f.jsx)(me,{children:(0,y.vv)((0,v.zQ)(Ri(),parseFloat(li.yield_amount)||1,li.yield_unit).cost,Ne)})]})]})]}),vi&&(0,f.jsx)(ve,{children:vi}),(0,f.jsxs)(ye,{children:[(0,f.jsx)(o.yl,{type:"button",variant:"secondary",onClick:$i,children:"Cancel"}),(0,f.jsx)(o.yl,{type:"submit",variant:"primary",children:ni?"Update Recipe":"Create Recipe"})]})]})}),(0,f.jsx)(h.A,{isOpen:mi.isOpen,title:"Delete Recipe",message:`Are you sure you want to delete "${mi.recipeName}"? This action cannot be undone.`,onConfirm:async()=>{if(mi.recipeId)try{const e=Ei();let i="";"Brand General"===(null===Me||void 0===Me?void 0:Me.role)||"Brand Manager"===(null===Me||void 0===Me?void 0:Me.role)?i=`/api/brands/${n}/recipes/${mi.recipeId}`:"Restaurant Admin"===(null===Me||void 0===Me?void 0:Me.role)&&(i=`/api/restaurants/${Oe}/recipes/${mi.recipeId}`);const r=await fetch(i,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await r.json();t.success?Ye(e=>e.filter(e=>e.id!==mi.recipeId)):console.error("Delete failed:",t.error)}catch(e){console.error("Failed to delete recipe:",e)}finally{yi({isOpen:!1,recipeId:null,recipeName:""})}},onCancel:()=>{yi({isOpen:!1,recipeId:null,recipeName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"}),(0,f.jsxs)(o.aF,{isOpen:Fi&&!!_i,onClose:()=>{Ai(!1),wi(null)},title:(null===_i||void 0===_i?void 0:_i.name)||"Recipe",size:"medium",children:[((null===_i||void 0===_i?void 0:_i.prep_time)||(null===_i||void 0===_i?void 0:_i.cook_time))&&(0,f.jsxs)(Ae,{children:[(null===_i||void 0===_i?void 0:_i.prep_time)&&(0,f.jsxs)(_e,{children:[(0,f.jsx)(we,{children:"\u23f1"}),(0,f.jsx)(Ce,{children:"Prep:"}),(0,f.jsxs)(ke,{children:[_i.prep_time," min"]})]}),(null===_i||void 0===_i?void 0:_i.cook_time)&&(0,f.jsxs)(_e,{children:[(0,f.jsx)(we,{children:"\ud83d\udd25"}),(0,f.jsx)(Ce,{children:"Cook:"}),(0,f.jsxs)(ke,{children:[_i.cook_time," min"]})]})]}),(null===_i||void 0===_i?void 0:_i.recipeIngredients)&&_i.recipeIngredients.length>0&&(0,f.jsxs)(Be,{children:[(0,f.jsx)(Ee,{children:"Ingredients"}),(0,f.jsx)(ze,{children:_i.recipeIngredients.map((e,i)=>{const r=Le.find(i=>i.id===e.ingredient_id);return(0,f.jsxs)(Se,{children:[(0,f.jsx)($e,{children:(null===r||void 0===r?void 0:r.name)||`Ingredient #${e.ingredient_id}`}),(0,f.jsxs)(Ie,{children:[Number(e.quantity).toFixed(2)," ",e.unit]})]},i)})})]}),((null===_i||void 0===_i?void 0:_i.instructions_summary)||(null===_i||void 0===_i?void 0:_i.instructions))&&(0,f.jsxs)(Be,{children:[(0,f.jsx)(Ee,{children:"Summary"}),(0,f.jsx)(Re,{children:(null===_i||void 0===_i?void 0:_i.instructions_summary)||(null===_i||void 0===_i?void 0:_i.instructions)})]}),(null===_i||void 0===_i?void 0:_i.instructions_detail)&&(0,f.jsxs)(Be,{children:[(0,f.jsx)(Ee,{children:"Detailed Instructions"}),(0,f.jsx)(De,{children:_i.instructions_detail})]}),_i&&ri[_i.id]&&ri[_i.id].length>0&&(0,f.jsxs)(Be,{children:[(0,f.jsx)(Ee,{children:"Connected Menus"}),(0,f.jsx)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:ri[_i.id].map((e,i)=>(0,f.jsx)("span",{style:{fontSize:"13px",background:"#ECFDF5",color:"#059669",padding:"4px 12px",borderRadius:"6px",fontWeight:500},children:e},i))})]})]})]})};var Me=r(9610);const Ue=n.Ay.div`
  padding: 24px 0;
`,Ne=n.Ay.div`
  display: grid;
  gap: 12px;
`,Pe=n.Ay.div`
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
`,Oe=n.Ay.div`
  flex: 1;
`,qe=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Ye=n.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,Le=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,Qe=n.Ay.div`
  display: flex;
  gap: 8px;
`,We=n.Ay.button`
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
`,Ge=n.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Ze=n.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,Ve=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,He=n.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,Je=n.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  margin-left: 8px;
`,Ke=n.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,Xe=n.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,ei=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,ii=n.Ay.button`
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
`,ri=n.Ay.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #FFFBEB;
  border-radius: 12px;
  border: 1px solid #FDE68A;
`,ti=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #92400E;
  font-weight: 500;
`,ni=e=>{let{brandId:i,restaurantId:r,onCountChange:n,onCategoryChange:a}=e;const{t:s}=(0,b.Bd)("recipes"),{user:l}=(0,d.As)(),u=r||(null===l||void 0===l?void 0:l.restaurant_id)||(null===l||void 0===l?void 0:l.restaurantId),[x,g]=(0,t.useState)([]),[m,y]=(0,t.useState)([]),[v,j]=(0,t.useState)(!0),[F,A]=(0,t.useState)(!1),[_,w]=(0,t.useState)(null),[C,k]=(0,t.useState)(!1),[B,E]=(0,t.useState)(null),[z,S]=(0,t.useState)({name:"",emoji:"",description:""}),$="Restaurant Admin"===(null===l||void 0===l?void 0:l.role),I="Brand General"===(null===l||void 0===l?void 0:l.role)||"Brand Manager"===(null===l||void 0===l?void 0:l.role),R=(0,t.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,t.useEffect)(()=>{(async()=>{j(!0);const e=R();try{if(I&&i){const r=await fetch(`/api/brands/${i}/recipe-categories`,{headers:{Authorization:`Bearer ${e}`}}),t=await r.json();t.success&&(g(t.data),n(t.data.length))}else if($&&u){const i=await fetch(`/api/restaurants/${u}/recipe-categories`,{headers:{Authorization:`Bearer ${e}`}}),a=await i.json();var r,t;if(a.success)g(a.data.own_categories||[]),y(a.data.brand_categories||[]),n(((null===(r=a.data.own_categories)||void 0===r?void 0:r.length)||0)+((null===(t=a.data.brand_categories)||void 0===t?void 0:t.length)||0))}}catch(a){console.error("Failed to fetch data:",a)}finally{j(!1)}})()},[i,u,I,$,R,n]);const D=async()=>{try{const t=R();if(I&&i){const e=await fetch(`/api/brands/${i}/recipe-categories`,{headers:{Authorization:`Bearer ${t}`}}),r=await e.json();r.success&&(g(r.data),n(r.data.length))}else if($&&u){const i=await fetch(`/api/restaurants/${u}/recipe-categories`,{headers:{Authorization:`Bearer ${t}`}}),a=await i.json();var e,r;if(a.success)g(a.data.own_categories||[]),y(a.data.brand_categories||[]),n(((null===(e=a.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(r=a.data.brand_categories)||void 0===r?void 0:r.length)||0))}}catch(t){console.error("Failed to fetch categories:",t)}},T=e=>{e?(w(e),S({name:e.name,emoji:e.emoji||"",description:e.description||""})):(w(null),S({name:"",emoji:"",description:""})),A(!0)},M=()=>{A(!1),w(null),S({name:"",emoji:"",description:""})},U=async e=>{if(e.preventDefault(),z.name.trim())try{const e=localStorage.getItem("auth_token");let r="";const t=_?"PUT":"POST";if(I&&i?r=_?`/api/brands/${i}/recipe-categories/${_.id}`:`/api/brands/${i}/recipe-categories`:$&&u&&(r=_?`/api/restaurants/${u}/recipe-categories/${_.id}`:`/api/restaurants/${u}/recipe-categories`),!r)return;const n=await fetch(r,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:z.name.trim(),emoji:z.emoji||null,description:z.description.trim()||null})}),o=await n.json();o.success?(M(),D(),null===a||void 0===a||a()):alert(o.error||"Failed to save")}catch(r){console.error("Failed to save category:",r),alert("Failed to save")}},N=async(e,r)=>{const t="up"===r?e-1:e+1;if(t<0||t>=x.length)return;const n=[...x];[n[e],n[t]]=[n[t],n[e]];const a=n.map((e,i)=>({id:e.id,display_order:i}));try{const e=localStorage.getItem("auth_token");let r="";if(I&&i?r=`/api/brands/${i}/recipe-categories/reorder`:$&&u&&(r=`/api/restaurants/${u}/recipe-categories/reorder`),!r)return;await fetch(r,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:a})}),D()}catch(o){console.error("Failed to reorder:",o)}},P=function(e,i,r){let t=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,f.jsxs)(Pe,{isActive:e.is_active,readOnly:t,children:[!t&&(0,f.jsx)(o.Xd,{onMoveUp:()=>N(i,"up"),onMoveDown:()=>N(i,"down"),disableUp:0===i,disableDown:i===r.length-1}),e.emoji&&(0,f.jsx)(Xe,{children:e.emoji}),(0,f.jsxs)(Oe,{children:[(0,f.jsxs)(qe,{children:[e.name,t&&(0,f.jsx)(Je,{children:s("recipes:recipeCategoriesTab.brand")})]}),(0,f.jsxs)(Ye,{children:[(0,f.jsxs)("span",{children:[e.recipe_count||0," recipes"]}),!t&&(0,f.jsx)(Ke,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,f.jsx)(Le,{children:e.description})]}),!t&&(0,f.jsxs)(Qe,{children:[(0,f.jsx)(We,{onClick:()=>T(e),title:"Edit",children:(0,f.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,f.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,f.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,f.jsx)(We,{onClick:()=>(e=>{E(e),k(!0)})(e),title:"Delete",children:(0,f.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,f.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return v?(0,f.jsx)(Ue,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:s("recipes:recipeCategoriesTab.loading")})}):(0,f.jsxs)(Ue,{children:[(0,f.jsxs)(Ve,{children:[(0,f.jsx)(He,{children:s("recipes:recipeCategoriesTab.recipeCategories")}),(0,f.jsx)(p.cc,{variant:"primary",onClick:()=>T(),children:"Add Category"})]}),$&&m.length>0&&(0,f.jsxs)(ri,{children:[(0,f.jsx)(ti,{children:"Brand Categories (Read Only)"}),(0,f.jsx)(Ne,{children:m.map((e,i)=>P(e,i,m,!0))})]}),0===x.length?(0,f.jsxs)(c.pp,{children:[(0,f.jsx)(Ge,{children:s("recipes:recipeCategoriesTab.noRecipeCategoriesYet")}),(0,f.jsx)(Ze,{children:"Create categories to organize your recipes"}),(0,f.jsx)(p.cc,{variant:"primary",onClick:()=>T(),children:"Add Category"})]}):(0,f.jsx)(Ne,{children:x.map((e,i)=>{return P(e,i,x,(r=e,$&&"brand"===r.owner_type));var r})}),(0,f.jsx)(Me.aF,{isOpen:F,onClose:M,title:(_?"Edit":"New")+" Recipe Category",size:"medium",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(Me.yl,{variant:"secondary",onClick:M,children:s("recipes:recipeCategoriesTab.cancel")}),(0,f.jsx)(Me.yl,{variant:"primary",onClick:U,disabled:!z.name.trim(),children:_?"Update":"Create"})]}),children:(0,f.jsxs)("form",{onSubmit:U,children:[(0,f.jsxs)(Me.gE,{children:[(0,f.jsx)(Me.lR,{children:"Category Name *"}),(0,f.jsx)(Me.ZQ,{type:"text",value:z.name,onChange:e=>S({...z,name:e.target.value}),placeholder:"e.g., Main Dishes",autoFocus:!0,required:!0})]}),(0,f.jsxs)(Me.gE,{children:[(0,f.jsx)(Me.lR,{children:s("recipes:recipeCategoriesTab.icon")}),(0,f.jsx)(ei,{children:["\ud83c\udf54","\ud83c\udf55","\ud83c\udf57","\ud83e\udd57","\ud83c\udf5c","\ud83c\udf5d","\ud83c\udf64","\ud83e\udd58","\ud83c\udf5b","\ud83c\udf72","\u2615","\ud83e\udd64","\ud83e\uddc3","\ud83c\udf75","\ud83e\uddcb","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd43","\ud83c\udf79","\ud83c\udf78","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf68","\ud83c\udf67","\ud83c\udf66","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6b","\ud83e\udd50","\ud83e\udd56","\ud83c\udf5e","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf71","\ud83c\udf59","\ud83c\udf58","\ud83c\udf63","\ud83c\udf65","\ud83c\udf61","\ud83c\udf62","\ud83c\udf60","\ud83e\udd5f","\ud83e\udd60","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf5f","\ud83e\uded3","\ud83e\udd53","\ud83e\uddc6"].map(e=>(0,f.jsx)(ii,{selected:z.emoji===e,onClick:()=>S({...z,emoji:e}),type:"button",children:e},e))})]}),(0,f.jsxs)(Me.gE,{children:[(0,f.jsx)(Me.lR,{children:s("recipes:recipeCategoriesTab.description")}),(0,f.jsx)(Me.Lz,{value:z.description,onChange:e=>S({...z,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,f.jsx)(h.A,{isOpen:C,onCancel:()=>{k(!1),E(null)},onConfirm:async()=>{if(B)try{const e=localStorage.getItem("auth_token");let r="";if(I&&i?r=`/api/brands/${i}/recipe-categories/${B.id}`:$&&u&&(r=`/api/restaurants/${u}/recipe-categories/${B.id}`),!r)return;const t=await fetch(r,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success?(k(!1),E(null),D(),null===a||void 0===a||a()):alert(n.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:B?`Are you sure you want to delete "${B.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},ai=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,oi=n.Ay.select`
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
`,si=()=>{const{t:e}=(0,b.Bd)("recipes"),{user:i}=(0,d.As)(),{restaurantId:r}=(0,a.g)(),[n,c]=(0,a.ok)(),[p,u]=(0,l.M)("recipes"),[x,g]=(0,t.useState)(0),[h,m]=(0,t.useState)(0),[y,v]=(0,t.useState)([]),[j,F]=(0,t.useState)(!0),[A,_]=(0,t.useState)(0),w=n.get("brandId"),C=w?Number(w):y.length>0?y[0].id:null;(0,t.useEffect)(()=>{i&&"Brand General"===i.role?k():F(!1)},[i]);const k=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();v(e),e.length>0&&!w&&c({tab:p,brandId:String(e[0].id)})}}catch(e){console.error("Error fetching brands:",e)}finally{F(!1)}},B=e=>{u(e),C&&c(i=>(i.set("tab",e),i.set("brandId",String(C)),i))};return j?(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(o.mc,{children:[(0,f.jsx)(o.Y9,{children:(0,f.jsx)(o.hE,{children:"Brand General"===(null===i||void 0===i?void 0:i.role)||"Brand Manager"===(null===i||void 0===i?void 0:i.role)?"Brand Recipes":"Recipes"})}),(0,f.jsx)(o.UC,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})}):"Brand General"===(null===i||void 0===i?void 0:i.role)&&0===y.length?(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(o.mc,{children:[(0,f.jsx)(o.Y9,{children:(0,f.jsx)(o.hE,{children:"Brand General"===(null===i||void 0===i?void 0:i.role)||"Brand Manager"===(null===i||void 0===i?void 0:i.role)?"Brand Recipes":"Recipes"})}),(0,f.jsx)(o.UC,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No brands found. Please create a brand first."})})]})}):(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(o.mc,{children:[(0,f.jsxs)(o.Y9,{children:[(0,f.jsx)(o.hE,{children:e("recipes:recipeManagementPage.recipes")}),"Brand General"===(null===i||void 0===i?void 0:i.role)&&y.length>0&&(0,f.jsx)(ai,{children:(0,f.jsx)(oi,{value:C||"",onChange:e=>{return i=Number(e.target.value),void c({tab:p,brandId:String(i)});var i},children:y.map(e=>(0,f.jsx)("option",{value:e.id,children:e.name},e.id))})})]}),(0,f.jsxs)(o.UC,{children:[(0,f.jsxs)(s.tU,{children:[(0,f.jsxs)(s.oz,{active:"recipes"===p,onClick:()=>B("recipes"),children:["Recipes ",(0,f.jsx)(s.Ex,{count:x,showZero:!0})]}),(0,f.jsxs)(s.oz,{active:"recipe-categories"===p,onClick:()=>B("recipe-categories"),children:["Recipe Categories ",(0,f.jsx)(s.Ex,{count:h,showZero:!0})]})]}),(C||"Brand General"!==(null===i||void 0===i?void 0:i.role))&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{style:{display:"recipes"===p?"block":"none"},children:(0,f.jsx)(Te,{brandId:C,restaurantId:r?Number(r):null,onCountChange:g,categoryRefreshKey:A})}),(0,f.jsx)("div",{style:{display:"recipe-categories"===p?"block":"none"},children:(0,f.jsx)(ni,{brandId:C,restaurantId:r?Number(r):null,onCountChange:m,onCategoryChange:()=>_(e=>e+1)})})]})]})]})})}}}]);