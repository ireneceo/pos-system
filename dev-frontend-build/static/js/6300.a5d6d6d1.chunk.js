"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6300],{251:(e,i,t)=>{t.d(i,{_W:()=>n,jr:()=>o,zQ:()=>a});const n=[{value:"kg",label:"kg (kilogram)",category:"weight",baseUnit:"g",multiplier:1e3},{value:"g",label:"g (gram)",category:"weight",baseUnit:"g",multiplier:1},{value:"mg",label:"mg (milligram)",category:"weight",baseUnit:"g",multiplier:.001},{value:"L",label:"L (liter)",category:"volume",baseUnit:"ml",multiplier:1e3},{value:"ml",label:"ml (milliliter)",category:"volume",baseUnit:"ml",multiplier:1},{value:"piece",label:"piece",category:"count",baseUnit:"piece",multiplier:1},{value:"pack",label:"pack",category:"count",baseUnit:"pack",multiplier:1},{value:"box",label:"box",category:"count",baseUnit:"box",multiplier:1},{value:"can",label:"can",category:"count",baseUnit:"can",multiplier:1},{value:"bottle",label:"bottle",category:"count",baseUnit:"bottle",multiplier:1},{value:"bag",label:"bag",category:"count",baseUnit:"bag",multiplier:1},{value:"portion",label:"portion",category:"serving",baseUnit:"portion",multiplier:1},{value:"serving",label:"serving",category:"serving",baseUnit:"serving",multiplier:1},{value:"tbsp",label:"tbsp (tablespoon)",category:"cooking",baseUnit:"ml",multiplier:15},{value:"tsp",label:"tsp (teaspoon)",category:"cooking",baseUnit:"ml",multiplier:5},{value:"cup",label:"cup",category:"cooking",baseUnit:"ml",multiplier:240}],r=(n.map(e=>e.value),n.filter(e=>"weight"===e.category),n.filter(e=>"volume"===e.category),n.filter(e=>"count"===e.category),n.filter(e=>"serving"===e.category),n.filter(e=>"cooking"===e.category),e=>n.find(i=>i.value===e)),o=(e,i,t,n)=>{if(i===n)return e*t;const o=((e,i,t)=>{if(i===t)return e;const n=r(i),o=r(t);return n&&o?n.baseUnit!==o.baseUnit?null:e*n.multiplier/o.multiplier:null})(t,n,i);return null===o?(console.warn(`Cannot convert ${n} to ${i}`),null):e*o},a=(e,i,t)=>i<=0?{cost:e,unit:t}:{cost:e/i,unit:t}},1840:(e,i,t)=>{t.d(i,{ff:()=>o});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const r="";n();async function o(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${r}${e}`,n=localStorage.getItem("auth_token"),o={credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...i.headers},...i},a=await fetch(t,o);if(!a.ok){const e=await a.json().catch(()=>({message:"Network error"}));throw new Error(e.message||e.error||`HTTP error! status: ${a.status}`)}return a.json()}},2653:(e,i,t)=>{t.d(i,{M:()=>o});var n=t(9950),r=t(4492);function o(e){const[i,t]=(0,r.ok)(),o=(0,n.useCallback)(()=>i.get("tab")||e,[i,e]),[a,s]=(0,n.useState)(o());return[a,(0,n.useCallback)(e=>{s(e),t({tab:e})},[t])]}},3705:(e,i,t)=>{t.d(i,{cc:()=>r});var n=t(4752);const r=n.Ay.button`
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
`},4021:(e,i,t)=>{t.d(i,{i1:()=>a});var n=t(9950),r=t(1367),o=t(6038);const a=()=>{const{user:e}=(0,r.As)(),[i,t]=(0,n.useState)("RM"),[a]=(0,n.useState)(Object.keys(o.DL)),[s,l]=(0,n.useState)(!0),[d,c]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const i=window.location.pathname.split("/"),n=i.indexOf("restaurant");let r=n>=0?i[n+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){var o;const e=await i.json(),n=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"MYR";t(n)}else t("MYR")}catch(a){console.error("Failed to fetch restaurant currency:",a),c("Failed to load currency settings"),t("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:i,supportedCurrencies:a,loading:s,error:d}}},6300:(e,i,t)=>{t.r(i),t.d(i,{default:()=>ri});var n=t(9950),r=t(8409),o=t(2597),a=t(2653),s=t(1367),l=t(4752),d=t(2853),c=t(3705),p=t(2488),x=t(9610),u=t(4877),g=t(9194),h=t(4021),m=t(6038),y=t(1840),f=t(251),b=t(7617),v=t(5030),j=t(4414);const F=l.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,w=l.Ay.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,A=l.Ay.div`
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
`,C=l.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,k=(l.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,l.Ay.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`,l.Ay.div`
  flex: 1;
  min-width: 0;
`),_=l.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,E=l.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`,B=l.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,z=l.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,S=l.Ay.div``,R=l.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,I=l.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,T=l.Ay.div`
  flex: 1;
  min-height: 12px;
`,$=l.Ay.div`
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,D=l.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,P=l.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,U=l.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,L=l.Ay.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #6B7280;
  margin: 8px 0;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
`,M=l.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    color: #9CA3AF;
  }

  strong {
    color: #374151;
    font-weight: 600;
  }
`,Y=l.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin: 8px 0;
  padding: 8px;
  background: #FEFCE8;
  border-radius: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,q=l.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,N=l.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F6F9FC;\n          border: 1px solid #E6EBF1;\n          color: #6B7280;\n          &:hover {\n            border-color: #635BFF;\n            color: #635BFF;\n            background: #F4F3FF;\n            transform: translateY(-1px);\n          }\n        "}}}
`,Q=l.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,O=l.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,W=(l.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,l.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
`),Z=l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,H=l.Ay.div`
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
`,V=l.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,J=l.Ay.button`
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

  &:hover {
    background: #FCA5A5;
  }
`,X=l.Ay.button`
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
`,K=l.Ay.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E5E7EB;
`,G=l.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,ee=l.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,ie=l.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,te=l.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 6px;
  max-height: 160px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: #FAFBFC;
`,ne=l.Ay.button`
  width: 36px;
  height: 36px;
  font-size: 20px;
  background: ${e=>e.selected?"#635BFF":"white"};
  border: 1px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.selected?"#635BFF":"#F0F0FF"};
    border-color: #635BFF;
    transform: scale(1.1);
  }
`,re=l.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  padding: 40px 0;
  z-index: 1000;
`,oe=l.Ay.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  margin: auto 0;
`,ae=l.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`,se=l.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,le=l.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  line-height: 1;

  &:hover {
    color: #0A2540;
  }
`,de=l.Ay.div`
  padding: 24px;
`,ce=l.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,pe=l.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,xe=l.Ay.span`
  font-size: 20px;
`,ue=l.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,ge=l.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,he=l.Ay.div`
  margin-bottom: 24px;
`,me=l.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`,ye=l.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,fe=l.Ay.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,be=l.Ay.span`
  font-size: 15px;
  color: #0A2540;
`,ve=l.Ay.span`
  font-size: 15px;
  font-weight: 600;
  color: #635BFF;
`,je=l.Ay.p`
  font-size: 15px;
  color: #4B5563;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
`,Fe=l.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`,we=l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`,Ae=l.Ay.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`,Ce=l.Ay.div`
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
`,ke=(l.Ay.div`
  font-size: 80px;
  line-height: 1;
`,l.Ay.div`
  flex: 1;
`),_e=l.Ay.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,Ee=l.Ay.span`
  display: inline-block;
  padding: 6px 12px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
`,Be=l.Ay.p`
  font-size: 15px;
  color: #6B7280;
  margin: 16px 0 0 0;
  line-height: 1.6;
`,ze=l.Ay.div`
  padding: 0;
  margin-bottom: 8px;
`,Se=l.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`,Re=l.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,Ie=l.Ay.div`
  text-align: center;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,Te=l.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,$e=l.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,De=l.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`,Pe=l.Ay.table`
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

  th:last-child, td:last-child {
    text-align: right;
  }

  tr:last-child td {
    border-bottom: none;
  }
`,Ue=l.Ay.div`
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
`,Le=e=>{var i,t,r;let{onCountChange:o,categoryRefreshKey:a}=e;const{t:l}=(0,v.Bd)("brand"),{user:Le}=(0,s.As)(),{defaultCurrency:Me}=(0,h.i1)(),[Ye,qe]=(0,n.useState)("RM"),[Ne,Qe]=(0,n.useState)([]),[Oe,We]=(0,n.useState)([]),[Ze,He]=(0,n.useState)([]),[Ve,Je]=(0,n.useState)(!0),[Xe,Ke]=(0,n.useState)(""),[Ge,ei]=(0,n.useState)("all"),[ii,ti]=(0,n.useState)({}),[ni,ri]=(0,n.useState)(()=>"image"===localStorage.getItem("brandProductRecipesViewMode")?"image":"compact"),[oi,ai]=(0,n.useState)(!1),[si,li]=(0,n.useState)(null),[di,ci]=(0,n.useState)(!1),[pi,xi]=(0,n.useState)(!1),[ui,gi]=(0,n.useState)(null),[hi,mi]=(0,n.useState)({name:"",description:"",category_id:"",emoji:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),[yi,fi]=(0,n.useState)(null),[bi,vi]=(0,n.useState)([]),[ji,Fi]=(0,n.useState)(!1),[wi,Ai]=(0,n.useState)(!1),[Ci,ki]=(0,n.useState)(null),_i=null===Le||void 0===Le?void 0:Le.brand_id;(0,n.useEffect)(()=>{Me&&qe(Me)},[Me]);const Ei=(0,n.useCallback)(async()=>{if(_i)try{Je(!0);const[t,n,r]=await Promise.all([(0,y.ff)("/api/product-recipes"),(0,y.ff)("/api/product-ingredients"),(0,y.ff)("/api/product-recipe-categories")]);var e;if(t.success)Qe(t.data||[]),null===o||void 0===o||o((null===(e=t.data)||void 0===e?void 0:e.length)||0);n.success&&We((n.data||[]).filter(e=>e.is_active)),r.success&&He(r.data||[]);try{const e=await(0,y.ff)("/api/brand-products"),i=e.data||e||[],t={};(Array.isArray(i)?i:[]).forEach(e=>{e.product_recipe_id&&(t[e.product_recipe_id]||(t[e.product_recipe_id]=[]),t[e.product_recipe_id].push(e.name))}),ti(t)}catch(i){}}catch(t){console.error("Failed to fetch data:",t)}finally{Je(!1)}},[_i,o]);(0,n.useEffect)(()=>{Ei()},[Ei]),(0,n.useEffect)(()=>{a&&Bi()},[a]);const Bi=async()=>{try{const e=await(0,y.ff)("/api/product-recipe-categories");e.success&&He(e.data||[])}catch(e){console.error("Failed to fetch categories:",e)}},zi=function(e){var i,t,n,r,o;(Fi(arguments.length>1&&void 0!==arguments[1]&&arguments[1]),fi(null),e)?(li(e),mi({name:e.name,description:e.description||"",category_id:(null===(i=e.category_id)||void 0===i?void 0:i.toString())||"",emoji:e.emoji||"",image:e.image||"",yield_amount:(null===(t=e.yield_amount)||void 0===t?void 0:t.toString())||"1",yield_unit:e.yield_unit||"portion",prep_time:(null===(n=e.prep_time)||void 0===n?void 0:n.toString())||"",cook_time:(null===(r=e.cook_time)||void 0===r?void 0:r.toString())||"",instructions_summary:e.instructions_summary||"",instructions_detail:e.instructions_detail||"",suggested_price:(null===(o=e.suggested_price)||void 0===o?void 0:o.toString())||""}),e.recipeIngredients?vi(e.recipeIngredients.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""}))):vi([])):(li(null),mi({name:"",description:"",category_id:"",emoji:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),vi([]));ai(!0)},Si=()=>{xi(!1),gi(null)},Ri=(e,i,t)=>{const n=[...bi];if(n[e]={...n[e],[i]:t},"ingredient_id"===i){const i=Oe.find(e=>e.id===t);i&&(n[e].unit=i.unit)}vi(n)},Ii=()=>bi.reduce((e,i)=>{const t=Oe.find(e=>e.id===i.ingredient_id);if(t&&i.quantity){const n=t.base_quantity||1;return e+t.unit_cost/n*parseFloat(i.quantity)}return e},0),Ti=Ne.filter(e=>{var i,t;const n=e.name.toLowerCase().includes(Xe.toLowerCase())||(null===(i=e.code)||void 0===i?void 0:i.toLowerCase().includes(Xe.toLowerCase())),r="all"===Ge||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===Ge;return n&&r});return Ve?(0,j.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,j.jsxs)(p.Qn,{style:{marginBottom:0,flex:1},children:[(0,j.jsx)(p.DO,{type:"text",placeholder:"Search recipes...",value:Xe,onChange:e=>Ke(e.target.value)}),(0,j.jsxs)(p.Jt,{value:Ge,onChange:e=>ei(e.target.value),children:[(0,j.jsx)("option",{value:"all",children:"All Categories"}),Ze.map(e=>(0,j.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,j.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[(0,j.jsxs)("div",{style:{display:"flex",background:"#F3F4F6",borderRadius:"6px",padding:"2px"},children:[(0,j.jsx)("button",{onClick:()=>{ri("compact"),localStorage.setItem("brandProductRecipesViewMode","compact")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"compact"===ni?"white":"transparent",color:"compact"===ni?"#0A2540":"#6B7C93",boxShadow:"compact"===ni?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Compact"}),(0,j.jsx)("button",{onClick:()=>{ri("image"),localStorage.setItem("brandProductRecipesViewMode","image")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"image"===ni?"white":"transparent",color:"image"===ni?"#0A2540":"#6B7C93",boxShadow:"image"===ni?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Image"})]}),(0,j.jsx)(c.cc,{variant:"primary",onClick:()=>zi(),children:"Add Recipe"})]})]}),0===Ti.length?(0,j.jsxs)(d.pp,{children:[(0,j.jsx)(Q,{children:"No recipes found"}),(0,j.jsx)(O,{children:"Create product recipes to track ingredient costs and manage production."}),(0,j.jsx)(c.cc,{variant:"primary",onClick:()=>zi(),children:"Add First Recipe"})]}):(0,j.jsx)(F,{children:Ti.map(e=>{var i;return(0,j.jsxs)(A,{isActive:e.is_active,onClick:()=>zi(e,!0),children:["image"===ni&&e.image&&(0,j.jsx)(w,{children:(0,j.jsx)("img",{src:e.image,alt:e.name})}),(0,j.jsx)(C,{children:(0,j.jsxs)(k,{children:[(0,j.jsx)(_,{children:e.name}),(0,j.jsx)(E,{children:(null===(i=e.category)||void 0===i?void 0:i.name)||"Uncategorized"})]})}),e.description&&(0,j.jsx)(B,{children:e.description}),(0,j.jsxs)(z,{children:[(0,j.jsxs)(S,{children:[(0,j.jsx)(R,{children:"Ingredient Cost"}),(0,j.jsx)(I,{children:(0,m.vv)(e.total_ingredient_cost||0,Ye)})]}),(0,j.jsxs)(S,{children:[(0,j.jsx)(R,{children:"Suggested Price"}),(0,j.jsx)(I,{children:e.suggested_price?(0,m.vv)(e.suggested_price,Ye):"-"})]})]}),(e.prep_time||e.cook_time)&&(0,j.jsxs)(L,{children:[e.prep_time&&(0,j.jsxs)(M,{children:[(0,j.jsx)("span",{children:"Prep:"}),(0,j.jsxs)("strong",{children:[e.prep_time," min"]})]}),e.cook_time&&(0,j.jsxs)(M,{children:[(0,j.jsx)("span",{children:"Cook:"}),(0,j.jsxs)("strong",{children:[e.cook_time," min"]})]}),e.prep_time&&e.cook_time&&(0,j.jsxs)(M,{children:[(0,j.jsx)("span",{children:"Total:"}),(0,j.jsxs)("strong",{children:[e.prep_time+e.cook_time," min"]})]})]}),e.instructions_summary&&(0,j.jsx)(Y,{children:e.instructions_summary}),(0,j.jsx)(T,{}),e.recipeIngredients&&e.recipeIngredients.length>0&&(0,j.jsxs)($,{children:[(0,j.jsxs)(D,{children:[e.recipeIngredients.length," ingredient",e.recipeIngredients.length>1?"s":""]}),(0,j.jsxs)(P,{children:[e.recipeIngredients.slice(0,4).map((e,i)=>{var t;return(0,j.jsx)(U,{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`},i)}),e.recipeIngredients.length>4&&(0,j.jsxs)(U,{children:["+",e.recipeIngredients.length-4," more"]})]})]}),ii[e.id]&&ii[e.id].length>0&&(0,j.jsx)("div",{style:{marginTop:"8px",display:"flex",gap:"4px",flexWrap:"wrap"},children:ii[e.id].map((e,i)=>(0,j.jsx)("span",{style:{fontSize:"11px",background:"#ECFDF5",color:"#059669",padding:"2px 8px",borderRadius:"4px",fontWeight:500},children:e},i))}),(0,j.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,j.jsx)(N,{onClick:()=>(e=>{gi(e),xi(!0)})(e),children:"Recipe"}),(0,j.jsx)(N,{variant:"primary",onClick:()=>zi(e),children:"Edit"}),(0,j.jsx)(N,{variant:"danger",onClick:()=>(e=>{ki(e),Ai(!0)})(e),children:"Delete"})]})]},e.id)})}),(0,j.jsx)(x.aF,{isOpen:oi,onClose:()=>ai(!1),title:ji?"Recipe Details":si?"Edit Recipe":"Add Recipe",size:"large",children:ji&&si?(0,j.jsxs)(we,{children:[(0,j.jsxs)(Ae,{children:[hi.image&&(0,j.jsx)(Ce,{children:(0,j.jsx)("img",{src:hi.image,alt:hi.name})}),(0,j.jsxs)(ke,{children:[(0,j.jsx)(_e,{children:hi.name}),(0,j.jsxs)(Ee,{children:[null===(i=si.category)||void 0===i?void 0:i.emoji," ",(null===(t=si.category)||void 0===t?void 0:t.name)||"Uncategorized"]}),hi.description&&(0,j.jsx)(Be,{children:hi.description})]})]}),(0,j.jsxs)(ze,{children:[(0,j.jsx)(Se,{children:"Cost & Time"}),(0,j.jsxs)(Re,{children:[(0,j.jsxs)(Ie,{children:[(0,j.jsx)(Te,{children:"Ingredient Cost"}),(0,j.jsx)($e,{children:(0,m.vv)(Number(si.total_ingredient_cost||0),Ye)})]}),(0,j.jsxs)(Ie,{children:[(0,j.jsx)(Te,{children:"Suggested Price"}),(0,j.jsx)($e,{children:(0,m.vv)(Number(hi.suggested_price||0),Ye)})]}),hi.prep_time&&(0,j.jsxs)(Ie,{children:[(0,j.jsx)(Te,{children:"Prep Time"}),(0,j.jsxs)($e,{children:[hi.prep_time," min"]})]}),hi.cook_time&&(0,j.jsxs)(Ie,{children:[(0,j.jsx)(Te,{children:"Cook Time"}),(0,j.jsxs)($e,{children:[hi.cook_time," min"]})]})]})]}),hi.yield_amount&&"1"!==hi.yield_amount&&(0,j.jsxs)(ze,{children:[(0,j.jsx)(Se,{children:"Yield"}),(0,j.jsxs)("div",{style:{fontSize:"15px",color:"#374151"},children:[hi.yield_amount," ",(null===(r=f._W.find(e=>e.value===hi.yield_unit))||void 0===r?void 0:r.label)||hi.yield_unit,(0,j.jsxs)("span",{style:{marginLeft:"16px",color:"#6B7280",fontSize:"13px"},children:["(Cost per ",hi.yield_unit,": ",(0,m.vv)((0,f.zQ)(Ii(),parseFloat(hi.yield_amount)||1,hi.yield_unit).cost,Ye),")"]})]})]}),bi.length>0&&(0,j.jsxs)(ze,{children:[(0,j.jsxs)(Se,{children:["Ingredients (",bi.length,")"]}),(0,j.jsxs)(Pe,{children:[(0,j.jsx)("thead",{children:(0,j.jsxs)("tr",{children:[(0,j.jsx)("th",{children:"Ingredient"}),(0,j.jsx)("th",{children:"Quantity"}),(0,j.jsx)("th",{children:"Unit Cost"}),(0,j.jsx)("th",{children:"Subtotal"})]})}),(0,j.jsx)("tbody",{children:bi.map((e,i)=>{const t=Oe.find(i=>i.id===e.ingredient_id),n=(null===t||void 0===t?void 0:t.base_quantity)||1,r=((null===t||void 0===t?void 0:t.unit_cost)||0)/n,o=parseFloat(e.quantity)*r;return(0,j.jsxs)("tr",{children:[(0,j.jsx)("td",{children:(0,j.jsx)("strong",{children:(null===t||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`})}),(0,j.jsxs)("td",{children:[Number(e.quantity).toFixed(2)," ",e.unit]}),(0,j.jsxs)("td",{children:[(0,m.Qn)(Ye)," ",r.toFixed(2),"/",null===t||void 0===t?void 0:t.unit]}),(0,j.jsx)("td",{children:(0,m.vv)(o,Ye)})]},i)})})]}),(0,j.jsxs)(Ue,{children:[(0,j.jsx)("span",{children:"Total Ingredient Cost"}),(0,j.jsx)("span",{children:(0,m.vv)(Ii(),Ye)})]})]}),hi.instructions_summary&&(0,j.jsxs)(ze,{children:[(0,j.jsx)(Se,{children:"Recipe Summary"}),(0,j.jsx)(De,{children:hi.instructions_summary})]}),hi.instructions_detail&&(0,j.jsxs)(ze,{children:[(0,j.jsx)(Se,{children:"Detailed Instructions"}),(0,j.jsx)(De,{children:hi.instructions_detail})]}),ii[si.id]&&ii[si.id].length>0&&(0,j.jsxs)(ze,{children:[(0,j.jsxs)(Se,{children:["Connected Products (",ii[si.id].length,")"]}),(0,j.jsx)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:ii[si.id].map((e,i)=>(0,j.jsx)("span",{style:{fontSize:"13px",background:"#ECFDF5",color:"#059669",padding:"4px 12px",borderRadius:"6px",fontWeight:500},children:e},i))})]}),(0,j.jsxs)(ie,{children:[(0,j.jsx)(x.yl,{type:"button",variant:"secondary",onClick:()=>ai(!1),children:"Close"}),(0,j.jsx)(x.yl,{type:"button",variant:"primary",onClick:()=>Fi(!1),children:"Edit"})]})]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:"Recipe Name *"}),(0,j.jsx)(x.ZQ,{value:hi.name,onChange:e=>mi({...hi,name:e.target.value}),placeholder:"e.g., Grilled Chicken"})]}),(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:"Category"}),(0,j.jsxs)(x.FX,{value:hi.category_id,onChange:e=>mi({...hi,category_id:e.target.value}),children:[(0,j.jsx)("option",{value:"",children:"Select Category"}),Ze.map(e=>(0,j.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:"Emoji Icon"}),(0,j.jsx)(te,{children:["\ud83c\udf56","\ud83c\udf72","\ud83c\udf5a","\ud83e\udd53","\ud83c\udf5c","\ud83c\udf57","\ud83e\udd5f","\ud83e\udd58","\ud83c\udf63","\ud83c\udf64","\ud83c\udf54","\ud83c\udf5f","\ud83c\udf5d","\ud83e\udd57","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf55","\ud83c\udf5e","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83e\udd69","\ud83c\udf59","\ud83c\udf58","\ud83c\udf65","\ud83c\udf62","\ud83c\udf60","\ud83e\udd60","\ud83e\uddc6","\u2615","\ud83c\udf75","\ud83e\udd64","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd5b","\ud83e\uddc3","\ud83e\uddcb","\ud83c\udf79","\ud83c\udf78","\ud83c\udf76","\ud83e\udd43","\ud83c\udf7e","\ud83e\uddc9","\ud83e\uded6","\ud83c\udf7c","\ud83e\uddca","\ud83c\udf70","\ud83c\udf68","\ud83c\udf61","\ud83c\udf6e","\ud83c\udf69","\ud83c\udf6a","\ud83e\uddc1","\ud83c\udf6b","\ud83c\udf6c","\ud83e\udd67","\ud83c\udf6d","\ud83c\udf6f","\ud83e\udd6e","\ud83c\udf66","\ud83c\udf67","\ud83c\udf82","\ud83e\udd5c","\ud83c\udf30","\ud83e\udd65","\ud83c\udf53","\ud83c\udf47","\ud83c\udf48","\ud83c\udf49","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf4c","\ud83c\udf4d","\ud83e\udd6d","\ud83c\udf4e","\ud83c\udf4f","\ud83c\udf50","\ud83c\udf51","\ud83c\udf52","\ud83e\udd5d","\ud83c\udf45","\ud83e\udd51","\ud83c\udf36\ufe0f","\ud83e\udd52","\ud83e\udd6c","\ud83e\udd66","\ud83e\uddc4","\ud83e\uddc5","\ud83c\udf3d","\ud83e\udd55","\ud83e\udd54","\ud83c\udf44","\ud83d\udccb"].map(e=>(0,j.jsx)(ne,{type:"button",selected:hi.emoji===e,onClick:()=>mi({...hi,emoji:e}),children:e},e))})]}),(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:"Recipe Image"}),(0,j.jsx)(u.A,{value:hi.image,onChange:e=>mi({...hi,image:e}),label:"Drop recipe image here or click to upload"})]}),(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:"Description"}),(0,j.jsx)(x.Lz,{value:hi.description,onChange:e=>mi({...hi,description:e.target.value}),placeholder:"Brief description of the recipe",rows:2})]}),(0,j.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px"},children:[(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:"Prep Time (min)"}),(0,j.jsx)(x.ZQ,{type:"number",min:"0",value:hi.prep_time,onChange:e=>mi({...hi,prep_time:e.target.value})})]}),(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:"Cook Time (min)"}),(0,j.jsx)(x.ZQ,{type:"number",min:"0",value:hi.cook_time,onChange:e=>mi({...hi,cook_time:e.target.value})})]}),(0,j.jsxs)(x.gE,{children:[(0,j.jsxs)(x.lR,{children:["Suggested Price (",Ye,")"]}),(0,j.jsx)(x.ZQ,{type:"number",step:"0.01",min:"0",value:hi.suggested_price,onChange:e=>mi({...hi,suggested_price:e.target.value})})]})]}),(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:"Recipe Summary"}),(0,j.jsx)(x.Lz,{value:hi.instructions_summary,onChange:e=>mi({...hi,instructions_summary:e.target.value}),placeholder:"Brief summary for list display (e.g., Pan-fried chicken with garlic sauce)",rows:2})]}),(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:"Detailed Instructions"}),(0,j.jsx)(x.Lz,{value:hi.instructions_detail,onChange:e=>mi({...hi,instructions_detail:e.target.value}),placeholder:"Step-by-step cooking instructions...\n1. Prepare ingredients...\n2. Heat the pan...\n3. ...",rows:6})]}),(0,j.jsx)(W,{children:"Yield (Production Amount)"}),(0,j.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"16px"},children:[(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:"Yield Amount *"}),(0,j.jsx)(x.ZQ,{type:"number",step:"0.01",min:"0.01",value:hi.yield_amount,onChange:e=>mi({...hi,yield_amount:e.target.value}),placeholder:"e.g., 10"})]}),(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:"Yield Unit *"}),(0,j.jsx)(x.FX,{value:hi.yield_unit,onChange:e=>mi({...hi,yield_unit:e.target.value}),children:f._W.map(e=>(0,j.jsx)("option",{value:e.value,children:e.label},e.value))})]})]}),(0,j.jsx)(W,{children:"Ingredients"}),(0,j.jsx)(X,{onClick:()=>{vi([...bi,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),bi.length>0&&(0,j.jsxs)(Z,{children:[(0,j.jsxs)(H,{children:[(0,j.jsx)("span",{children:"Ingredient"}),(0,j.jsx)("span",{children:"Quantity"}),(0,j.jsx)("span",{children:"Unit"}),(0,j.jsx)("span",{children:"Notes"}),(0,j.jsx)("span",{})]}),bi.map((e,i)=>(0,j.jsxs)(V,{children:[(0,j.jsx)(g.A,{options:Oe.map(e=>{const i=e.unit_cost/(e.base_quantity||1);return{value:e.id,label:e.name,subLabel:`${(0,m.Qn)(Ye)} ${i.toFixed(2)}/${e.unit}`}}),value:e.ingredient_id||null,onChange:e=>Ri(i,"ingredient_id",e),placeholder:"Search ingredient..."}),(0,j.jsx)(x.ZQ,{type:"number",step:"0.01",min:"0",placeholder:"Qty",value:e.quantity,onChange:e=>Ri(i,"quantity",e.target.value)}),(0,j.jsx)(x.ZQ,{value:e.unit,disabled:!0,style:{background:"#F3F4F6",color:"#6B7280"}}),(0,j.jsx)(x.ZQ,{value:e.notes,onChange:e=>Ri(i,"notes",e.target.value),placeholder:"Notes"}),(0,j.jsx)(J,{onClick:()=>(e=>{vi(bi.filter((i,t)=>t!==e))})(i),children:"\xd7"})]},i))]}),(0,j.jsxs)(K,{children:[(0,j.jsx)(G,{children:"Total Ingredient Cost"}),(0,j.jsx)(ee,{children:(0,m.vv)(Ii(),Ye)})]}),(0,j.jsxs)(K,{style:{marginTop:"8px"},children:[(0,j.jsxs)(G,{children:["Cost per ",hi.yield_unit]}),(0,j.jsx)(ee,{children:(0,m.vv)((0,f.zQ)(Ii(),parseFloat(hi.yield_amount)||1,hi.yield_unit).cost,Ye)})]}),yi&&(0,j.jsx)(x.IM,{children:yi}),(0,j.jsxs)(ie,{children:[(0,j.jsx)(x.yl,{variant:"secondary",onClick:()=>ai(!1),children:"Cancel"}),(0,j.jsx)(x.yl,{variant:"primary",onClick:async()=>{if(fi(null),hi.name.trim())if(!hi.yield_amount||parseFloat(hi.yield_amount)<=0)fi("Yield amount must be greater than 0");else try{ci(!0);const e={name:hi.name,description:hi.description||null,category_id:hi.category_id?parseInt(hi.category_id):null,emoji:hi.emoji||null,image:hi.image||null,yield_amount:parseFloat(hi.yield_amount)||1,yield_unit:hi.yield_unit||"portion",prep_time:hi.prep_time?parseInt(hi.prep_time):null,cook_time:hi.cook_time?parseInt(hi.cook_time):null,instructions_summary:hi.instructions_summary||null,instructions_detail:hi.instructions_detail||null,suggested_price:hi.suggested_price?parseFloat(hi.suggested_price):null,ingredients:bi.filter(e=>e.ingredient_id&&e.quantity).map(e=>{const i=Oe.find(i=>i.id===e.ingredient_id),t=i&&(0,f.jr)(i.unit_cost/(i.base_quantity||1),i.unit,parseFloat(e.quantity),e.unit)||0;return{ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,cost:t,notes:e.notes||null}})},i=si?`/api/product-recipes/${si.id}`:"/api/product-recipes",t=si?"PUT":"POST",n=await(0,y.ff)(i,{method:t,body:JSON.stringify(e)});n.success?(ai(!1),fi(null),Ei()):fi(n.error||"Failed to save recipe")}catch(e){console.error("Failed to save recipe:",e),fi("Failed to save recipe")}finally{ci(!1)}else fi("Recipe name is required")},disabled:di,children:di?"Saving...":"Save Recipe"})]})]})}),pi&&ui&&(0,j.jsx)(re,{onClick:Si,children:(0,j.jsxs)(oe,{onClick:e=>e.stopPropagation(),children:[(0,j.jsxs)(ae,{children:[(0,j.jsx)(se,{children:ui.name}),(0,j.jsx)(le,{onClick:Si,children:"\xd7"})]}),(0,j.jsxs)(de,{children:[(ui.prep_time||ui.cook_time)&&(0,j.jsxs)(ce,{children:[ui.prep_time&&(0,j.jsxs)(pe,{children:[(0,j.jsx)(xe,{children:"\u23f1"}),(0,j.jsx)(ue,{children:"Prep:"}),(0,j.jsxs)(ge,{children:[ui.prep_time," min"]})]}),ui.cook_time&&(0,j.jsxs)(pe,{children:[(0,j.jsx)(xe,{children:"\ud83d\udd25"}),(0,j.jsx)(ue,{children:"Cook:"}),(0,j.jsxs)(ge,{children:[ui.cook_time," min"]})]})]}),ui.recipeIngredients&&ui.recipeIngredients.length>0&&(0,j.jsxs)(he,{children:[(0,j.jsx)(me,{children:"Ingredients"}),(0,j.jsx)(ye,{children:ui.recipeIngredients.map((e,i)=>{var t;return(0,j.jsxs)(fe,{children:[(0,j.jsx)(be,{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`}),(0,j.jsxs)(ve,{children:[Number(e.quantity).toFixed(2)," ",e.unit]})]},i)})})]}),ui.instructions_summary&&(0,j.jsxs)(he,{children:[(0,j.jsx)(me,{children:"Summary"}),(0,j.jsx)(je,{children:ui.instructions_summary})]}),ui.instructions_detail&&(0,j.jsxs)(he,{children:[(0,j.jsx)(me,{children:"Detailed Instructions"}),(0,j.jsx)(Fe,{children:ui.instructions_detail})]}),ii[ui.id]&&ii[ui.id].length>0&&(0,j.jsxs)(he,{children:[(0,j.jsx)(me,{children:"Connected Products"}),(0,j.jsx)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:ii[ui.id].map((e,i)=>(0,j.jsx)("span",{style:{fontSize:"13px",background:"#ECFDF5",color:"#059669",padding:"4px 12px",borderRadius:"6px",fontWeight:500},children:e},i))})]})]})]})}),(0,j.jsx)(b.A,{isOpen:wi,title:"Delete Recipe",message:`Delete "${null===Ci||void 0===Ci?void 0:Ci.name}"? This action cannot be undone.`,onConfirm:async()=>{if(Ci){Ai(!1);try{const e=await(0,y.ff)(`/api/product-recipes/${Ci.id}`,{method:"DELETE"});e.success?Ei():console.error("Failed to delete recipe:",e.error)}catch(e){console.error("Failed to delete recipe:",e)}ki(null)}},onCancel:()=>{Ai(!1),ki(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},Me=l.Ay.div`
  padding: 24px 0;
`,Ye=l.Ay.div`
  display: grid;
  gap: 12px;
`,qe=l.Ay.div`
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
`,Ne=l.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,Qe=l.Ay.div`
  flex: 1;
`,Oe=l.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,We=l.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,Ze=l.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,He=l.Ay.div`
  display: flex;
  gap: 8px;
`,Ve=l.Ay.button`
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
`,Je=l.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,Xe=l.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Ke=l.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,Ge=l.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,ei=l.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,ii=l.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,ti=l.Ay.button`
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
`,ni=e=>{let{onCountChange:i,onCategoryChange:t}=e;const{t:o}=(0,v.Bd)("brand"),[a,s]=(0,n.useState)([]),[l,p]=(0,n.useState)(!0),[u,g]=(0,n.useState)(!1),[h,m]=(0,n.useState)(null),[f,F]=(0,n.useState)(!1),[w,A]=(0,n.useState)(!1),[C,k]=(0,n.useState)(null),[_,E]=(0,n.useState)({name:"",emoji:"",description:""}),B=(0,n.useCallback)(async()=>{try{p(!0);const t=await(0,y.ff)("/api/product-recipe-categories");var e;if(t.success)s(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{p(!1)}},[i]);(0,n.useEffect)(()=>{B()},[B]);const z=e=>{e?(m(e),E({name:e.name,emoji:e.emoji||"",description:e.description||""})):(m(null),E({name:"",emoji:"",description:""})),g(!0)},S=()=>{g(!1),m(null),E({name:"",emoji:"",description:""})},R=async e=>{if(e.preventDefault(),_.name.trim())try{F(!0);const e=h?`/api/product-recipe-categories/${h.id}`:"/api/product-recipe-categories",i=h?"PUT":"POST",n=await(0,y.ff)(e,{method:i,body:JSON.stringify({name:_.name.trim(),emoji:_.emoji||null,description:_.description.trim()||null})});n.success?(S(),B(),null===t||void 0===t||t()):alert(n.error||"Failed to save category")}catch(i){console.error("Failed to save category:",i),alert("Failed to save category")}finally{F(!1)}},I=async(e,i)=>{const t="up"===i?e-1:e+1;if(t<0||t>=a.length)return;const n=[...a];[n[e],n[t]]=[n[t],n[e]];const r=n.map((e,i)=>({id:e.id,display_order:i}));try{await(0,y.ff)("/api/product-recipe-categories/reorder",{method:"PUT",body:JSON.stringify({orders:r})}),B()}catch(o){console.error("Failed to reorder:",o)}};return l?(0,j.jsx)(Me,{children:(0,j.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:o("brand:productRecipeCategoriesTab.loading")})}):(0,j.jsxs)(Me,{children:[(0,j.jsxs)(Ge,{children:[(0,j.jsx)(ei,{children:o("brand:productRecipeCategoriesTab.recipeCategories")}),(0,j.jsx)(c.cc,{variant:"primary",onClick:()=>z(),children:"Add Category"})]}),0===a.length?(0,j.jsxs)(d.pp,{children:[(0,j.jsx)(Xe,{children:o("brand:productRecipeCategoriesTab.noCategoriesYet")}),(0,j.jsx)(Ke,{children:o("brand:productRecipeCategoriesTab.createCategoriesToOrganizeYourProductRecipes")}),(0,j.jsx)(c.cc,{variant:"primary",onClick:()=>z(),children:"Add First Category"})]}):(0,j.jsx)(Ye,{children:a.map((e,i)=>(0,j.jsxs)(qe,{isActive:e.is_active,children:[(0,j.jsx)(r.Xd,{onMoveUp:()=>I(i,"up"),onMoveDown:()=>I(i,"down"),disableUp:0===i,disableDown:i===a.length-1}),e.emoji&&(0,j.jsx)(Ne,{children:e.emoji}),(0,j.jsxs)(Qe,{children:[(0,j.jsx)(Oe,{children:e.name}),(0,j.jsxs)(We,{children:[(0,j.jsxs)("span",{children:[e.recipe_count||0," recipes"]}),(0,j.jsx)(Je,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,j.jsx)(Ze,{children:e.description})]}),(0,j.jsxs)(He,{children:[(0,j.jsx)(Ve,{onClick:()=>z(e),title:"Edit",children:(0,j.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,j.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,j.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,j.jsx)(Ve,{onClick:()=>(async e=>{try{(await(0,y.ff)(`/api/product-recipe-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&B()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,j.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,j.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,j.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,j.jsx)(Ve,{onClick:()=>(e=>{k(e),A(!0)})(e),title:"Delete",disabled:(e.recipe_count||0)>0,children:(0,j.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,j.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,j.jsx)(x.aF,{isOpen:u,onClose:S,title:(h?"Edit":"New")+" Recipe Category",size:"medium",footer:(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(x.yl,{variant:"secondary",onClick:S,children:o("brand:productRecipeCategoriesTab.cancel")}),(0,j.jsx)(x.yl,{variant:"primary",onClick:R,disabled:!_.name.trim()||f,children:f?"Saving...":h?"Update":"Create"})]}),children:(0,j.jsxs)("form",{onSubmit:R,children:[(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:"Category Name *"}),(0,j.jsx)(x.ZQ,{type:"text",value:_.name,onChange:e=>E({..._,name:e.target.value}),placeholder:"e.g., Main Dishes",autoFocus:!0,required:!0})]}),(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:o("brand:productRecipeCategoriesTab.icon")}),(0,j.jsx)(ii,{children:["\ud83c\udf54","\ud83c\udf55","\ud83c\udf57","\ud83e\udd57","\ud83c\udf5c","\ud83c\udf5d","\ud83c\udf64","\ud83e\udd58","\ud83c\udf5b","\ud83c\udf72","\u2615","\ud83e\udd64","\ud83e\uddc3","\ud83c\udf75","\ud83e\uddcb","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd43","\ud83c\udf79","\ud83c\udf78","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf68","\ud83c\udf67","\ud83c\udf66","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6b","\ud83e\udd50","\ud83e\udd56","\ud83c\udf5e","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf71","\ud83c\udf59","\ud83c\udf58","\ud83c\udf63","\ud83c\udf65","\ud83c\udf61","\ud83c\udf62","\ud83c\udf60","\ud83e\udd5f","\ud83e\udd60","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf5f","\ud83e\uded3","\ud83e\udd53","\ud83e\uddc6"].map(e=>(0,j.jsx)(ti,{selected:_.emoji===e,onClick:()=>E({..._,emoji:e}),type:"button",children:e},e))})]}),(0,j.jsxs)(x.gE,{children:[(0,j.jsx)(x.lR,{children:o("brand:productRecipeCategoriesTab.description")}),(0,j.jsx)(x.Lz,{value:_.description,onChange:e=>E({..._,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,j.jsx)(b.A,{isOpen:w,onCancel:()=>{A(!1),k(null)},onConfirm:async()=>{if(C)try{const e=await(0,y.ff)(`/api/product-recipe-categories/${C.id}`,{method:"DELETE"});e.success?(A(!1),k(null),B(),null===t||void 0===t||t()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:C?`Are you sure you want to delete "${C.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},ri=()=>{const{t:e}=(0,v.Bd)("brand"),{user:i}=(0,s.As)(),[t,l]=(0,a.M)("recipes"),[d,c]=(0,n.useState)(0),[p,x]=(0,n.useState)(0),[u,g]=(0,n.useState)(0);return(null===i||void 0===i?void 0:i.brand_id)?(0,j.jsxs)(r.mc,{children:[(0,j.jsx)(r.Y9,{children:(0,j.jsx)(r.hE,{children:e("brand:brandProductRecipePage.productRecipes")})}),(0,j.jsxs)(r.UC,{children:[(0,j.jsxs)(o.tU,{children:[(0,j.jsxs)(o.oz,{active:"recipes"===t,onClick:()=>l("recipes"),children:["Recipes ",(0,j.jsx)(o.Ex,{count:d,showZero:!0})]}),(0,j.jsxs)(o.oz,{active:"recipe-categories"===t,onClick:()=>l("recipe-categories"),children:["Recipe Categories ",(0,j.jsx)(o.Ex,{count:p,showZero:!0})]})]}),(0,j.jsx)("div",{style:{display:"recipes"===t?"block":"none"},children:(0,j.jsx)(Le,{onCountChange:c,categoryRefreshKey:u})}),(0,j.jsx)("div",{style:{display:"recipe-categories"===t?"block":"none"},children:(0,j.jsx)(ni,{onCountChange:x,onCategoryChange:()=>g(e=>e+1)})})]})]}):(0,j.jsxs)(r.mc,{children:[(0,j.jsx)(r.Y9,{children:(0,j.jsx)(r.hE,{children:e("brand:brandProductRecipePage.productRecipes")})}),(0,j.jsx)(r.UC,{children:(0,j.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Brand not found. Please log in with a brand account."})})]})}},7617:(e,i,t)=>{t.d(i,{A:()=>u});t(9950);var n=t(7119),r=t(4752),o=t(9610),a=t(4414);const s=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,l=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=r.Ay.h2`
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
`,x=r.Ay.button`
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
`,u=e=>{let{isOpen:i,title:t,message:r,onConfirm:u,onCancel:g,confirmText:h="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return i?n.createPortal((0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&g()},style:{zIndex:1100},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(d,{children:t}),(0,a.jsx)(c,{children:r})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(x,{variant:"secondary",onClick:g,children:m}),(0,a.jsx)(x,{variant:"primary",type:y,onClick:u,children:h})]})]})}),document.body):null}}}]);