"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9613],{1840:(e,r,n)=>{n.d(r,{ff:()=>i});function o(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",o()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const t="";o();async function i(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=`${t}${e}`,o=localStorage.getItem("auth_token"),i={credentials:"include",headers:{"Content-Type":"application/json",...o?{Authorization:`Bearer ${o}`}:{},...r.headers},...r},a=await fetch(n,i);if(!a.ok){const e=await a.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${a.status}`)}return a.json()}},2488:(e,r,n)=>{n.d(r,{DO:()=>c,Jt:()=>l,Qn:()=>s});n(9950);var o=n(4752),t=n(4414);const i=o.Ay.div`
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
`,a=o.Ay.input`
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
`,d=o.Ay.select`
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
`,s=e=>{let{children:r,className:n,style:o,...a}=e;return(0,t.jsx)(i,{className:n,style:o,...a,children:r})},c=e=>{let{placeholder:r="Search...",...n}=e;return(0,t.jsx)(a,{placeholder:r,...n})},l=e=>{let{children:r,...n}=e;return(0,t.jsx)(d,{...n,children:r})}},3496:(e,r,n)=>{n.d(r,{A:()=>z});var o=n(9950),t=n(4752),i=n(3705),a=n(9610),d=n(2674),s=n(7617),c=n(1840),l=n(4414);const p=t.Ay.div`
  padding: 24px 0;
`,x=t.Ay.div`
  display: grid;
  gap: 12px;
`,h=t.Ay.div`
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
`,u=t.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,g=t.Ay.div`
  flex: 1;
`,m=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,y=t.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,b=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,f=t.Ay.div`
  display: flex;
  gap: 8px;
`,w=t.Ay.button`
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
`,v=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,j=t.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,F=t.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,C=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,k=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,A=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,E=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,B=t.Ay.button`
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
`,z=e=>{let{onCountChange:r,onCategoryChange:n}=e;const[t,z]=(0,o.useState)([]),[$,S]=(0,o.useState)(!0),[D,_]=(0,o.useState)(!1),[T,M]=(0,o.useState)(null),[L,N]=(0,o.useState)(!1),[O,P]=(0,o.useState)(!1),[R,I]=(0,o.useState)(null),[U,H]=(0,o.useState)({name:"",emoji:"",description:""}),W=(0,o.useCallback)(async()=>{try{S(!0);const n=await(0,c.ff)("/api/product-ingredient-categories");var e;if(n.success)z(n.data||[]),null===r||void 0===r||r((null===(e=n.data)||void 0===e?void 0:e.length)||0)}catch(n){console.error("Failed to fetch categories:",n)}finally{S(!1)}},[r]);(0,o.useEffect)(()=>{W()},[W]);const Y=e=>{e?(M(e),H({name:e.name,emoji:e.emoji||"",description:e.description||""})):(M(null),H({name:"",emoji:"",description:""})),_(!0)},J=()=>{_(!1),M(null),H({name:"",emoji:"",description:""})},V=async e=>{if(e.preventDefault(),U.name.trim())try{N(!0);const e=T?`/api/product-ingredient-categories/${T.id}`:"/api/product-ingredient-categories",r=T?"PUT":"POST",o=await(0,c.ff)(e,{method:r,body:JSON.stringify({name:U.name.trim(),emoji:U.emoji||null,description:U.description.trim()||null})});o.success?(J(),W(),null===n||void 0===n||n()):alert(o.error||"Failed to save category")}catch(r){console.error("Failed to save category:",r),alert("Failed to save category")}finally{N(!1)}},Q=async(e,r)=>{const n="up"===r?e-1:e+1;if(n<0||n>=t.length)return;const o=[...t];[o[e],o[n]]=[o[n],o[e]];const i=o.map((e,r)=>({id:e.id,display_order:r}));try{await(0,c.ff)("/api/product-ingredient-categories/reorder",{method:"PUT",body:JSON.stringify({orders:i})}),W()}catch(a){console.error("Failed to reorder:",a)}};return $?(0,l.jsx)(p,{children:(0,l.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,l.jsxs)(p,{children:[(0,l.jsxs)(k,{children:[(0,l.jsx)(A,{children:"Ingredient Categories"}),(0,l.jsx)(i.cc,{variant:"primary",onClick:()=>Y(),children:"Add Category"})]}),0===t.length?(0,l.jsxs)(j,{children:[(0,l.jsx)(F,{children:"No categories yet"}),(0,l.jsx)(C,{children:"Create categories to organize your ingredients"}),(0,l.jsx)(i.cc,{variant:"primary",onClick:()=>Y(),children:"Add First Category"})]}):(0,l.jsx)(x,{children:t.map((e,r)=>(0,l.jsxs)(h,{isActive:e.is_active,children:[(0,l.jsx)(d.Xd,{onMoveUp:()=>Q(r,"up"),onMoveDown:()=>Q(r,"down"),disableUp:0===r,disableDown:r===t.length-1}),e.emoji&&(0,l.jsx)(u,{children:e.emoji}),(0,l.jsxs)(g,{children:[(0,l.jsx)(m,{children:e.name}),(0,l.jsxs)(y,{children:[(0,l.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),(0,l.jsx)(v,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,l.jsx)(b,{children:e.description})]}),(0,l.jsxs)(f,{children:[(0,l.jsx)(w,{onClick:()=>Y(e),title:"Edit",children:(0,l.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,l.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,l.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,l.jsx)(w,{onClick:()=>(async e=>{try{(await(0,c.ff)(`/api/product-ingredient-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&W()}catch(r){console.error("Failed to toggle category:",r)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,l.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,l.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,l.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,l.jsx)(w,{onClick:()=>(e=>{I(e),P(!0)})(e),title:"Delete",disabled:(e.ingredient_count||0)>0,children:(0,l.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,l.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,l.jsx)(a.aF,{isOpen:D,onClose:J,title:(T?"Edit":"New")+" Ingredient Category",size:"medium",footer:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a.yl,{variant:"secondary",onClick:J,children:"Cancel"}),(0,l.jsx)(a.yl,{variant:"primary",onClick:V,disabled:!U.name.trim()||L,children:L?"Saving...":T?"Update":"Create"})]}),children:(0,l.jsxs)("form",{onSubmit:V,children:[(0,l.jsxs)(a.gE,{children:[(0,l.jsx)(a.lR,{children:"Category Name *"}),(0,l.jsx)(a.ZQ,{type:"text",value:U.name,onChange:e=>H({...U,name:e.target.value}),placeholder:"e.g., Proteins",autoFocus:!0,required:!0})]}),(0,l.jsxs)(a.gE,{children:[(0,l.jsx)(a.lR,{children:"Icon"}),(0,l.jsx)(E,{children:["\ud83e\udd69","\ud83c\udf56","\ud83e\udd53","\ud83c\udf57","\ud83e\udd90","\ud83e\udd9e","\ud83e\udd80","\ud83d\udc1f","\ud83e\udd5a","\ud83e\uddc0","\ud83e\udd6c","\ud83e\udd66","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83e\udd52","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83c\udf4e","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd5d","\ud83c\udf4c","\ud83e\udd6d","\ud83c\udf4d","\ud83e\uddc8","\ud83e\udd5b","\ud83e\uddc2","\ud83c\udf6f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5a","\ud83c\udf5d","\ud83e\udd6b","\ud83e\uddca","\ud83d\udca7","\ud83c\udf76","\ud83e\uded7","\ud83e\uddf4","\ud83e\uddf9","\ud83e\uddfd","\ud83d\udce6","\ud83c\udff7\ufe0f","\ud83d\udd16"].map(e=>(0,l.jsx)(B,{selected:U.emoji===e,onClick:()=>H({...U,emoji:e}),type:"button",children:e},e))})]}),(0,l.jsxs)(a.gE,{children:[(0,l.jsx)(a.lR,{children:"Description"}),(0,l.jsx)(a.Lz,{value:U.description,onChange:e=>H({...U,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,l.jsx)(s.A,{isOpen:O,onCancel:()=>{P(!1),I(null)},onConfirm:async()=>{if(R)try{const e=await(0,c.ff)(`/api/product-ingredient-categories/${R.id}`,{method:"DELETE"});e.success?(P(!1),I(null),W(),null===n||void 0===n||n()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:R?`Are you sure you want to delete "${R.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}},3705:(e,r,n)=>{n.d(r,{cc:()=>t});var o=n(4752);const t=o.Ay.button`
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

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #DC2626;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

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
`;o.Ay.select`
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
`,o.Ay.input`
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
`,o.Ay.div`
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
`},4021:(e,r,n)=>{n.d(r,{i1:()=>a});var o=n(9950),t=n(1367),i=n(6038);const a=()=>{const{user:e}=(0,t.As)(),[r,n]=(0,o.useState)("RM"),[a,d]=(0,o.useState)(Object.keys(i.DL)),[s,c]=(0,o.useState)(!0),[l,p]=(0,o.useState)(null);return(0,o.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),o=r.indexOf("restaurant");let t=o>=0?r[o+1]:null;if(!t&&null!==e&&void 0!==e&&e.restaurant_id&&(t=e.restaurant_id.toString()),!t)return n("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var i;const e=await r.json(),o=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";n(o)}else n("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),p("Failed to load currency settings"),n("RM")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:a,loading:s,error:l}}},7617:(e,r,n)=>{n.d(r,{A:()=>x});n(9950);var o=n(4752),t=n(9610),i=n(4414);const a=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,d=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,s=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=o.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,l=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=o.Ay.button`
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
`,x=e=>{let{isOpen:r,title:n,message:o,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return r?(0,i.jsx)(t.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,i.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(d,{children:[(0,i.jsx)(s,{children:n}),(0,i.jsx)(c,{children:o})]}),(0,i.jsxs)(l,{children:[(0,i.jsx)(p,{variant:"secondary",onClick:h,children:g}),(0,i.jsx)(p,{variant:"primary",type:m,onClick:x,children:u})]})]})}):null}}}]);