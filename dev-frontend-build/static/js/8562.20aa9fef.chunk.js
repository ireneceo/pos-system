"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8562],{2653:(e,n,t)=>{t.d(n,{M:()=>a});var r=t(9950),i=t(4492);function a(e){const[n,t]=(0,i.ok)(),a=(0,r.useCallback)(()=>n.get("tab")||e,[n,e]),[o,s]=(0,r.useState)(a());return[o,(0,r.useCallback)(e=>{s(e),t({tab:e})},[t])]}},3705:(e,n,t)=>{t.d(n,{cc:()=>i});var r=t(4752);const i=r.Ay.button`
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
`;r.Ay.select`
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
`,r.Ay.input`
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
`,r.Ay.div`
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
`},4021:(e,n,t)=>{t.d(n,{i1:()=>s});var r=t(9950),i=t(1367),a=t(6038),o=t(9955);const s=()=>{const{user:e}=(0,i.As)(),[n,t]=(0,r.useState)("RM"),[s]=(0,r.useState)(Object.keys(a.DL)),[d,l]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let i=r>=0?n[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return t("RM"),void l(!1);try{const e=(0,o.c4)(),n=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var a;const e=await n.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";t(r)}else t("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),t("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:d,error:c}}},7617:(e,n,t)=>{t.d(n,{A:()=>g});t(9950);var r=t(7119),i=t(4752),a=t(9610),o=t(4414);const s=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=i.Ay.button`
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
`,g=e=>{let{isOpen:n,title:t,message:i,onConfirm:g,onCancel:x,confirmText:h="Confirm",cancelText:y="Cancel",type:m="warning"}=e;return n?r.createPortal((0,o.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&x()},style:{zIndex:1100},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(d,{children:[(0,o.jsx)(l,{children:t}),(0,o.jsx)(c,{children:i})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:x,children:y}),(0,o.jsx)(u,{variant:"primary",type:m,onClick:g,children:h})]})]})}),document.body):null}},8562:(e,n,t)=>{t.r(n),t.d(n,{default:()=>_e});var r=t(9950),i=t(4752),a=t(4492),o=t(8409),s=t(2597),d=t(2653),l=t(1367),c=t(2853),p=t(3705),u=t(2488),g=t(9610),x=t(7617),h=t(9194),y=t(4021),m=t(6038),v=t(5030),b=t(9955),f=t(4414);const j=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,F=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>e.isActive?1:.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,k=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,A=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,_=i.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,C=i.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  background: #FEF3C7;
  color: #92400E;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`,w=i.Ay.div`
  margin-top: 8px;
  padding: 10px 12px;
  background: #F0F7FF;
  border-radius: 8px;
  border: 1px solid #DBEAFE;
`,B=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
`,E=i.Ay.span`
  font-size: 12px;
  color: ${e=>"brand"===e.type?"#6B7280":"my"===e.type?"#2563EB":"#059669"};
  font-weight: ${e=>"applied"===e.type?600:400};
`,$=i.Ay.span`
  font-size: 13px;
  font-weight: ${e=>"applied"===e.type?700:"my"===e.type?600:400};
  color: ${e=>"brand"===e.type?"#9CA3AF":"my"===e.type?"#2563EB":"#059669"};
  text-decoration: none;
`,S=i.Ay.button`
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
`,z=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,I=i.Ay.input`
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
`,R=i.Ay.button`
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
`,D=i.Ay.button`
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
`,T=i.Ay.button`
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
`,N=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-top: 12px;
`,M=i.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`,O=i.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
  cursor: pointer;
`,P=i.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
`,U=i.Ay.span`
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

  ${P}:checked + & {
    background-color: #635BFF;
  }

  ${P}:checked + &:before {
    transform: translateX(22px);
  }
`,q=i.Ay.div`
  margin: 12px 0;
  flex: 1;
`,W=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,L=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,Y=i.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,G=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,Q=i.Ay.button`
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
`,Z=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,J=i.Ay.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
`,V=i.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,X=i.Ay.div`
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
`,H=i.Ay.div`
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`,K=i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,ee=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,ne=(i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,e=>{var n,t,i,a;let{brandId:o,restaurantId:s,onCountChange:d,categoryRefreshKey:ne}=e;const{t:te}=(0,v.Bd)("recipes"),{user:re}=(0,l.As)(),{defaultCurrency:ie}=(0,y.i1)(),[ae,oe]=(0,r.useState)("RM"),se=s||(null===re||void 0===re?void 0:re.restaurant_id)||(null===re||void 0===re?void 0:re.restaurantId);(0,r.useEffect)(()=>{ie&&oe(ie)},[ie]);const[de,le]=(0,r.useState)([]),[ce,pe]=(0,r.useState)([]),[ue,ge]=(0,r.useState)(!0),[xe,he]=(0,r.useState)(""),[ye,me]=(0,r.useState)("all"),[ve,be]=(0,r.useState)(()=>"image"===localStorage.getItem("ingredientsViewMode")?"image":"compact"),[fe,je]=(0,r.useState)(null),[Fe,ke]=(0,r.useState)(!1),[Ae,_e]=(0,r.useState)({recipes:[],products:[]}),[Ce,we]=(0,r.useState)(null),[Be,Ee]=(0,r.useState)(!1),[$e,Se]=(0,r.useState)({code:"",name:"",image_url:"",ingredient_category_id:"",unit:"",base_quantity:"1",unit_cost:"",supplier_id:"",min_stock:"0",track_stock:!0}),[ze,Ie]=(0,r.useState)([]),[Re,De]=(0,r.useState)({isOpen:!1,ingredientId:null,ingredientName:""}),[Te,Ne]=(0,r.useState)(null),[Me,Oe]=(0,r.useState)(""),[Pe,Ue]=(0,r.useState)(""),[qe,We]=(0,r.useState)(!1),Le="Restaurant Admin"===(null===re||void 0===re?void 0:re.role),Ye=e=>Le&&"brand"===e.owner_type,Ge=(0,r.useCallback)(()=>(0,b.c4)(),[]);(0,r.useEffect)(()=>{(async()=>{if(!o&&!se)return;ge(!0);const e=Ge(),n="Brand General"===(null===re||void 0===re?void 0:re.role)||"Brand Manager"===(null===re||void 0===re?void 0:re.role);try{var t,r,i;const s=[];let d="",l="",c="";n&&o?(d=`/api/brands/${o}/ingredients`,l=`/api/brands/${o}/ingredient-categories`,c=`/api/brands/${o}/suppliers`):Le&&se&&(d=`/api/restaurants/${se}/ingredients`,l=`/api/restaurants/${se}/ingredient-categories`,c=`/api/restaurants/${se}/all-suppliers`),d&&(s.push(fetch(d,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(l,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(c,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())),Le&&se&&s.push(fetch(`/api/restaurants/${se}/brand-ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())));const p=await Promise.all(s);if(null!==(t=p[0])&&void 0!==t&&t.success){var a;let e=Array.isArray(p[0].data)?p[0].data:[];Le&&null!==(a=p[3])&&void 0!==a&&a.success&&Array.isArray(p[3].data)&&(e=[...p[3].data,...e]),le(e)}if(null!==(r=p[1])&&void 0!==r&&r.success)if(Array.isArray(p[1].data))pe(p[1].data.filter(e=>e.is_active));else{const e=[...p[1].data.own_categories||[],...p[1].data.brand_categories||[]].filter(e=>e.is_active);pe(e)}if(null!==(i=p[2])&&void 0!==i&&i.success)if(Array.isArray(p[2].data))Ie(p[2].data.filter(e=>e.is_active));else{const e=[...p[2].data.brand_suppliers||[],...p[2].data.own_suppliers||[]].filter(e=>e.is_active);Ie(e)}}catch(s){console.error("Failed to fetch data:",s)}finally{ge(!1)}})()},[o,se,null===re||void 0===re?void 0:re.role,Ge,Le]),(0,r.useEffect)(()=>{ne&&(o||se)&&Qe()},[ne]);const Qe=async()=>{try{let e="";if("Brand General"===(null===re||void 0===re?void 0:re.role)||"Brand Manager"===(null===re||void 0===re?void 0:re.role)?o&&(e=`/api/brands/${o}/ingredient-categories`):"Restaurant Admin"===(null===re||void 0===re?void 0:re.role)&&se&&(e=`/api/restaurants/${se}/ingredient-categories`),!e)return;const n=Ge(),t=await fetch(e,{headers:{Authorization:`Bearer ${n}`}}),r=await t.json();if(r.success)if(Array.isArray(r.data))pe(r.data.filter(e=>e.is_active));else{const e=[...r.data.own_categories||[],...r.data.brand_categories||[]].filter(e=>e.is_active);pe(e)}}catch(e){console.error("Failed to fetch ingredient categories:",e)}},Ze=async e=>{if(se&&Me){We(!0);try{const n=Ge(),t=await fetch(`/api/restaurants/${se}/ingredient-costs/${e}`,{method:"PUT",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({unit_cost:parseFloat(Me),notes:Pe||null})});(await t.json()).success&&(le(n=>n.map(n=>n.id===e?{...n,restaurant_cost:parseFloat(Me),effective_cost:parseFloat(Me),cost_notes:Pe||null}:n)),Ne(null))}catch(n){console.error("Failed to save my cost:",n)}finally{We(!1)}}},Je=e=>{var n,t,r;e?(we(e),Se({code:e.code||"",name:e.name,image_url:e.image_url||"",ingredient_category_id:(null===(n=e.ingredient_category_id)||void 0===n?void 0:n.toString())||"",unit:e.unit,base_quantity:(null===(t=e.base_quantity)||void 0===t?void 0:t.toString())||"1",unit_cost:e.unit_cost.toString(),supplier_id:e.supplier_id||"",min_stock:(null===(r=e.min_stock)||void 0===r?void 0:r.toString())||"0",track_stock:e.track_stock||!1})):(we(null),Se({code:"",name:"",image_url:"",ingredient_category_id:"",unit:"",base_quantity:"1",unit_cost:"",supplier_id:"",min_stock:"0",track_stock:!0}));Ee(!0)},Ve=()=>{Ee(!1),we(null),Se({code:"",name:"",image_url:"",ingredient_category_id:"",unit:"",base_quantity:"1",unit_cost:"",supplier_id:"",min_stock:"0",track_stock:!0})},Xe=de.filter(e=>{var n;const t=e.name.toLowerCase().includes(xe.toLowerCase()),r="all"===ye||(null===(n=e.ingredient_category_id)||void 0===n?void 0:n.toString())===ye;return t&&r}),He=[{id:"all",name:"All Categories"},...ce.map(e=>({id:e.id.toString(),name:e.name}))];return(0,r.useEffect)(()=>{d(de.length)},[de.length,d]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,f.jsxs)(u.Qn,{style:{marginBottom:0,flex:1},children:[(0,f.jsx)(u.DO,{type:"text",placeholder:"Search ingredients...",value:xe,onChange:e=>he(e.target.value)}),(0,f.jsx)(u.Jt,{value:ye,onChange:e=>me(e.target.value),children:He.map(e=>(0,f.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,f.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[(0,f.jsxs)("div",{style:{display:"flex",background:"#F3F4F6",borderRadius:"6px",padding:"2px"},children:[(0,f.jsx)("button",{onClick:()=>{be("compact"),localStorage.setItem("ingredientsViewMode","compact")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"compact"===ve?"white":"transparent",color:"compact"===ve?"#0A2540":"#6B7C93",boxShadow:"compact"===ve?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Compact"}),(0,f.jsx)("button",{onClick:()=>{be("image"),localStorage.setItem("ingredientsViewMode","image")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"image"===ve?"white":"transparent",color:"image"===ve?"#0A2540":"#6B7C93",boxShadow:"image"===ve?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Image"})]}),(0,f.jsx)(p.cc,{variant:"primary",onClick:()=>Je(null),children:"New Ingredient"})]})]}),ue?(0,f.jsx)(c.pp,{children:(0,f.jsx)(K,{children:"Loading..."})}):0===Xe.length?(0,f.jsxs)(c.pp,{children:[(0,f.jsx)(K,{children:"No ingredients found"}),(0,f.jsx)(ee,{children:xe||"all"!==ye?"Try adjusting your filters":"Create your first ingredient to get started"}),!xe&&"all"===ye&&(0,f.jsx)(p.cc,{variant:"primary",onClick:()=>Je(null),children:"Create First Ingredient"})]}):(0,f.jsx)(j,{children:Xe.map(e=>{var n,t,r,i,a;return(0,f.jsxs)(F,{isActive:e.is_active,onClick:()=>{je(e),ke(!0),_e({recipes:[],products:[]});const n=(0,b.c4)();fetch(`/api/restaurants/${se}/ingredients/${e.id}/usage`,{headers:{Authorization:`Bearer ${n}`}}).then(e=>e.json()).then(e=>{e.success&&_e(e.data)}).catch(()=>{})},children:["image"===ve&&e.image_url&&(0,f.jsx)(J,{children:(0,f.jsx)(V,{src:e.image_url,alt:e.name})}),(0,f.jsx)(k,{children:(0,f.jsxs)("div",{children:[(0,f.jsx)(A,{children:e.name}),(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexWrap:"wrap"},children:[Le&&"brand"===e.owner_type&&(0,f.jsx)(C,{children:"Brand"}),(0,f.jsxs)(_,{children:[null===(n=e.ingredientCategory)||void 0===n?void 0:n.emoji," ",(null===(t=e.ingredientCategory)||void 0===t?void 0:t.name)||"Uncategorized"]})]})]})}),(0,f.jsxs)(q,{children:[Le&&"brand"===e.owner_type?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(w,{children:[(0,f.jsxs)(B,{children:[(0,f.jsx)(E,{type:"brand",children:"Brand Cost"}),(0,f.jsxs)($,{type:"brand",children:[(0,m.vv)(Number(e.unit_cost),ae),"/",e.unit]})]}),Te===e.id?(0,f.jsx)("div",{style:{marginTop:6},children:(0,f.jsxs)(B,{children:[(0,f.jsx)(E,{type:"my",children:"My Cost"}),(0,f.jsxs)(z,{children:[(0,f.jsx)(I,{type:"number",step:"0.01",min:"0",value:Me,onChange:e=>Oe(e.target.value),autoFocus:!0,onKeyDown:n=>{"Enter"===n.key&&Ze(e.id),"Escape"===n.key&&Ne(null)}}),(0,f.jsx)(R,{onClick:()=>Ze(e.id),disabled:qe,children:qe?"...":"Save"}),(0,f.jsx)(D,{onClick:()=>Ne(null),children:"\u2715"})]})]})}):null!==e.restaurant_cost&&void 0!==e.restaurant_cost?(0,f.jsxs)(B,{style:{marginTop:4},children:[(0,f.jsxs)(E,{type:"my",children:["My Cost",(0,f.jsx)(S,{style:{marginLeft:6,padding:"2px 6px",fontSize:"10px"},onClick:n=>{n.stopPropagation(),Ne(e.id),Oe(String(e.restaurant_cost)),Ue(e.cost_notes||"")},children:"Edit"}),(0,f.jsx)(T,{onClick:n=>{n.stopPropagation(),(async e=>{if(se)try{const n=Ge(),t=await fetch(`/api/restaurants/${se}/ingredient-costs/${e.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}});(await t.json()).success&&le(n=>n.map(n=>n.id===e.id?{...n,restaurant_cost:null,effective_cost:n.unit_cost,cost_notes:null}:n))}catch(n){console.error("Failed to reset my cost:",n)}})(e)},children:"Reset"})]}),(0,f.jsxs)($,{type:"my",children:[(0,m.vv)(Number(e.restaurant_cost),ae),"/",e.unit]})]}):(0,f.jsxs)(B,{style:{marginTop:4},children:[(0,f.jsx)(E,{type:"my",children:"My Cost"}),(0,f.jsx)(S,{onClick:n=>{n.stopPropagation(),Ne(e.id),Oe(""),Ue("")},children:"Set Cost"})]}),(0,f.jsxs)(B,{style:{marginTop:6,borderTop:"1px solid #DBEAFE",paddingTop:6},children:[(0,f.jsx)(E,{type:"applied",children:"Applied"}),(0,f.jsxs)($,{type:"applied",children:[(0,m.vv)(Number(null!==(r=e.effective_cost)&&void 0!==r?r:e.unit_cost),ae),"/",e.unit," ",null!==e.restaurant_cost&&void 0!==e.restaurant_cost?"\u2713":""]})]})]}),e.cost_notes&&(0,f.jsx)(W,{children:(0,f.jsx)(L,{style:{fontSize:"11px",color:"#9CA3AF",fontStyle:"italic"},children:e.cost_notes})})]}):(0,f.jsxs)(W,{children:[(0,f.jsx)(L,{children:"Unit Cost"}),(0,f.jsx)(Y,{children:(0,m.vv)(Number(e.unit_cost),ae)})]}),(0,f.jsxs)(W,{children:[(0,f.jsx)(L,{children:"Base Qty / Unit"}),(0,f.jsxs)(Y,{children:[Number(e.base_quantity||1)," ",e.unit]})]}),((null===(i=e.supplier)||void 0===i?void 0:i.name)||e.supplier_name)&&(0,f.jsxs)(W,{children:[(0,f.jsx)(L,{children:"Supplier"}),(0,f.jsx)(Y,{children:(null===(a=e.supplier)||void 0===a?void 0:a.name)||e.supplier_name})]}),e.code&&(0,f.jsxs)(W,{children:[(0,f.jsx)(L,{children:"Code"}),(0,f.jsx)(Y,{children:e.code})]})]}),Le&&(0,f.jsxs)(N,{children:[(0,f.jsx)(M,{children:"Track in Inventory"}),(0,f.jsxs)(O,{children:[(0,f.jsx)(P,{type:"checkbox",checked:e.track_stock||!1,onChange:n=>{n.stopPropagation(),(async(e,n)=>{try{let t="";"Brand General"===(null===re||void 0===re?void 0:re.role)||"Brand Manager"===(null===re||void 0===re?void 0:re.role)?t=`/api/brands/${o}/ingredients/${e.id}`:"Restaurant Admin"===(null===re||void 0===re?void 0:re.role)&&(t=`/api/restaurants/${se}/ingredients/${e.id}`);const r=(0,b.c4)(),i=await fetch(t,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({code:e.code,name:e.name,image_url:e.image_url,ingredient_category_id:e.ingredient_category_id,unit:e.unit,base_quantity:e.base_quantity,unit_cost:e.unit_cost,supplier_id:e.supplier_id,supplier_name:e.supplier_name,min_stock:e.min_stock,is_active:e.is_active,track_stock:n})}),a=await i.json();a.success?le(t=>t.map(t=>t.id===e.id?{...t,track_stock:n}:t)):alert(a.error||"Failed to update track stock")}catch(t){console.error("Failed to toggle track stock:",t)}})(e,n.target.checked)}}),(0,f.jsx)(U,{})]})]}),!Ye(e)&&(0,f.jsxs)(G,{children:[(0,f.jsx)(Q,{variant:"secondary",onClick:n=>{n.stopPropagation(),Je(e)},children:"Edit"}),(0,f.jsx)(Q,{variant:"danger",onClick:n=>{n.stopPropagation(),(e=>{De({isOpen:!0,ingredientId:e.id,ingredientName:e.name})})(e)},children:"Delete"})]})]},e.id)})}),(0,f.jsx)(g.aF,{isOpen:Be,onClose:Ve,title:Ce?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,f.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),$e.name&&$e.ingredient_category_id&&$e.unit&&$e.unit_cost)try{var n;let e="";const t=Ce?"PUT":"POST";"Brand General"===(null===re||void 0===re?void 0:re.role)||"Brand Manager"===(null===re||void 0===re?void 0:re.role)?e=Ce?`/api/brands/${o}/ingredients/${Ce.id}`:`/api/brands/${o}/ingredients`:"Restaurant Admin"===(null===re||void 0===re?void 0:re.role)&&(e=Ce?`/api/restaurants/${se}/ingredients/${Ce.id}`:`/api/restaurants/${se}/ingredients`);const r=(0,b.c4)(),i=await fetch(e,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({code:$e.code,name:$e.name,image_url:$e.image_url||null,ingredient_category_id:$e.ingredient_category_id?parseInt($e.ingredient_category_id):null,unit:$e.unit,supplier_id:$e.supplier_id?Number($e.supplier_id):null,supplier_name:$e.supplier_id&&(null===(n=ze.find(e=>e.id===Number($e.supplier_id)))||void 0===n?void 0:n.name)||"",base_quantity:parseFloat($e.base_quantity)||1,unit_cost:parseFloat($e.unit_cost),min_stock:parseInt($e.min_stock)||0,track_stock:$e.track_stock})}),a=await i.json();a.success?(Ve(),(async()=>{try{const e=Ge();if("Brand General"===(null===re||void 0===re?void 0:re.role)||"Brand Manager"===(null===re||void 0===re?void 0:re.role)){if(o){const n=await fetch(`/api/brands/${o}/ingredients`,{headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success&&le(t.data)}}else if("Restaurant Admin"===(null===re||void 0===re?void 0:re.role)&&se){const[n,t]=await Promise.all([fetch(`/api/restaurants/${se}/ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(`/api/restaurants/${se}/brand-ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())]);let r=[];t.success&&Array.isArray(t.data)&&(r=[...t.data]),n.success&&Array.isArray(n.data)&&(r=[...r,...n.data]),le(r)}}catch(e){console.error("Failed to fetch ingredients:",e)}})()):alert(a.error||"\uc7ac\ub8cc \uc800\uc7a5 \uc2e4\ud328")}catch(t){console.error("Failed to save ingredient:",t)}else alert("Please fill in all required fields")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Image"}),(0,f.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{var n;const t=null===(n=e.target.files)||void 0===n?void 0:n[0];if(t){const e=new FileReader;e.onloadend=()=>{Se({...$e,image_url:e.result})},e.readAsDataURL(t)}},style:{display:"none"},id:"ingredient-image-upload"}),(0,f.jsx)(X,{onClick:()=>{var e;return null===(e=document.getElementById("ingredient-image-upload"))||void 0===e?void 0:e.click()},children:$e.image_url?(0,f.jsx)("img",{src:$e.image_url,alt:"Ingredient"}):(0,f.jsx)(H,{children:"Click to upload image"})})]}),(0,f.jsxs)(g.fh,{children:[(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Ingredient Name *"}),(0,f.jsx)(g.ZQ,{type:"text",value:$e.name,onChange:e=>Se({...$e,name:e.target.value}),placeholder:"e.g., Rice",required:!0})]}),(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Code"}),(0,f.jsx)(g.ZQ,{type:"text",value:$e.code,onChange:e=>Se({...$e,code:e.target.value}),placeholder:"ING-001"})]})]}),(0,f.jsxs)(g.fh,{children:[(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Category *"}),(0,f.jsxs)(g.FX,{value:$e.ingredient_category_id,onChange:e=>Se({...$e,ingredient_category_id:e.target.value}),required:!0,children:[(0,f.jsx)("option",{value:"",children:"Select category..."}),ce.map(e=>(0,f.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Supplier"}),(0,f.jsx)(h.A,{options:ze.map(e=>({value:e.id,label:e.name,subLabel:"brand"===e.owner_type?"Brand":void 0})),value:$e.supplier_id||null,onChange:e=>Se({...$e,supplier_id:e||""}),placeholder:"Select supplier...",noOptionsMessage:"No suppliers found"})]})]}),(0,f.jsxs)(g.fh,{children:[(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Base Quantity *"}),(0,f.jsx)(g.ZQ,{type:"number",step:"0.01",min:"0.01",value:$e.base_quantity,onChange:e=>Se({...$e,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Unit *"}),(0,f.jsxs)(g.FX,{value:$e.unit,onChange:e=>Se({...$e,unit:e.target.value}),required:!0,children:[(0,f.jsx)("option",{value:"",children:"Select unit..."}),(0,f.jsx)("option",{value:"kg",children:"kg"}),(0,f.jsx)("option",{value:"g",children:"g"}),(0,f.jsx)("option",{value:"L",children:"L"}),(0,f.jsx)("option",{value:"ml",children:"ml"}),(0,f.jsx)("option",{value:"piece",children:"piece"}),(0,f.jsx)("option",{value:"pack",children:"pack"}),(0,f.jsx)("option",{value:"can",children:"can"}),(0,f.jsx)("option",{value:"bottle",children:"bottle"})]})]})]}),(0,f.jsxs)(g.fh,{children:[(0,f.jsxs)(g.gE,{children:[(0,f.jsxs)(g.lR,{children:["Unit Cost (",ae,") *"]}),(0,f.jsx)(g.ZQ,{type:"number",step:"0.01",value:$e.unit_cost,onChange:e=>Se({...$e,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]}),(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Minimum Stock"}),(0,f.jsx)(g.ZQ,{type:"number",value:$e.min_stock,onChange:e=>Se({...$e,min_stock:e.target.value}),placeholder:"0"})]})]}),(0,f.jsxs)(Z,{children:[(0,f.jsx)(g.yl,{type:"button",variant:"secondary",onClick:Ve,children:"Cancel"}),(0,f.jsx)(g.yl,{type:"submit",variant:"primary",children:Ce?"Update Ingredient":"Create Ingredient"})]})]})}),(0,f.jsx)(x.A,{isOpen:Re.isOpen,title:"Delete Ingredient",message:`Are you sure you want to delete "${Re.ingredientName}"? This action cannot be undone.`,onConfirm:async()=>{if(Re.ingredientId)try{let e="";"Brand General"===(null===re||void 0===re?void 0:re.role)||"Brand Manager"===(null===re||void 0===re?void 0:re.role)?e=`/api/brands/${o}/ingredients/${Re.ingredientId}`:"Restaurant Admin"===(null===re||void 0===re?void 0:re.role)&&(e=`/api/restaurants/${se}/ingredients/${Re.ingredientId}`);const n=Ge(),t=await fetch(e,{method:"DELETE",headers:{Authorization:`Bearer ${n}`}}),r=await t.json();r.success?le(e=>e.filter(e=>e.id!==Re.ingredientId)):console.error("Delete failed:",r.error)}catch(e){console.error("Failed to delete ingredient:",e)}finally{De({isOpen:!1,ingredientId:null,ingredientName:""})}},onCancel:()=>{De({isOpen:!1,ingredientId:null,ingredientName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"}),Fe&&fe&&(0,f.jsxs)(g.aF,{isOpen:Fe,onClose:()=>ke(!1),title:fe.name,size:"medium",children:[fe.image_url&&(0,f.jsx)("div",{style:{width:"100%",aspectRatio:"300/180",borderRadius:"8px",overflow:"hidden",marginBottom:"16px",background:"#F6F9FC"},children:(0,f.jsx)("img",{src:fe.image_url,alt:fe.name,style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"12px",flexWrap:"wrap"},children:[Le&&"brand"===fe.owner_type&&(0,f.jsx)("span",{style:{fontSize:"11px",fontWeight:600,color:"#92400E",background:"#FEF3C7",padding:"3px 8px",borderRadius:"4px"},children:"Brand"}),(0,f.jsxs)("span",{style:{fontSize:"11px",fontWeight:600,color:"#635BFF",background:"#F0F4FF",padding:"3px 8px",borderRadius:"4px"},children:[null===(n=fe.ingredientCategory)||void 0===n?void 0:n.emoji," ",(null===(t=fe.ingredientCategory)||void 0===t?void 0:t.name)||"Uncategorized"]}),fe.track_stock&&(0,f.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#059669",background:"#ECFDF5",padding:"3px 8px",borderRadius:"4px"},children:"Tracking"}),fe.code&&(0,f.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#6B7280",background:"#F3F4F6",padding:"3px 8px",borderRadius:"4px"},children:fe.code})]}),(0,f.jsx)("div",{style:{marginBottom:"16px"},children:Le&&"brand"===fe.owner_type&&null!=fe.restaurant_cost?(0,f.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#9CA3AF"},children:["Brand Cost: ",(0,f.jsxs)("span",{style:{textDecoration:"line-through"},children:[(0,m.vv)(Number(fe.unit_cost),ae),"/",fe.unit]})]}),(0,f.jsxs)("div",{style:{fontSize:"16px",fontWeight:600,color:"#2563EB"},children:["My Cost: ",(0,m.vv)(Number(fe.restaurant_cost),ae),"/",fe.unit]})]}):(0,f.jsxs)("div",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540"},children:["Unit Cost: ",(0,m.vv)(Number(fe.unit_cost),ae)," / ",fe.unit]})}),(0,f.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px",marginBottom:"16px"},children:[(0,f.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,f.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Base Qty"}),(0,f.jsxs)("div",{style:{fontSize:"14px",fontWeight:600},children:[Number(fe.base_quantity||1)," ",fe.unit]})]}),(0,f.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,f.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Current Stock"}),(0,f.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:fe.track_stock&&Number(fe.current_stock||0)<=Number(fe.min_stock||0)?"#EF4444":"#0A2540"},children:fe.track_stock?`${Number(fe.current_stock||0).toFixed(1)} ${fe.unit}`:"-"})]}),(0,f.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,f.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Min Stock"}),(0,f.jsx)("div",{style:{fontSize:"14px",fontWeight:600},children:fe.track_stock?`${Number(fe.min_stock||0)} ${fe.unit}`:"-"})]})]}),((null===(i=fe.supplier)||void 0===i?void 0:i.name)||fe.supplier_name)&&(0,f.jsxs)("div",{style:{marginBottom:"16px",fontSize:"13px",color:"#6B7280"},children:["Supplier: ",(0,f.jsx)("span",{style:{color:"#0A2540",fontWeight:500},children:(null===(a=fe.supplier)||void 0===a?void 0:a.name)||fe.supplier_name})]}),(0,f.jsxs)("div",{style:{padding:"12px",background:"#F0F4FF",borderRadius:"8px",border:"1px solid #DBEAFE",marginBottom:"16px"},children:[(0,f.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#1E40AF",marginBottom:"8px"},children:"Used In"}),0===Ae.recipes.length&&0===Ae.products.length?(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Not linked to any recipe or menu yet."}):(0,f.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[Ae.recipes.map(e=>(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#1E40AF"},children:[(0,f.jsx)("span",{style:{fontSize:"11px",background:"#EFF6FF",padding:"1px 6px",borderRadius:"3px",marginRight:"6px"},children:"Recipe"}),e.name]},"r"+e.id)),Ae.products.map(e=>(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#059669"},children:[(0,f.jsx)("span",{style:{fontSize:"11px",background:"#ECFDF5",padding:"1px 6px",borderRadius:"3px",marginRight:"6px"},children:"Menu"}),e.name]},"p"+e.id))]})]}),Ye(fe)&&(0,f.jsx)("div",{style:{padding:"10px 12px",background:"#FEF3C7",borderRadius:"6px",fontSize:"12px",color:"#92400E",textAlign:"center"},children:"Managed by Brand. You can set My Cost from the ingredient list."})]})]})}),te=i.Ay.div`
  padding: 24px 0;
`,re=i.Ay.div`
  display: grid;
  gap: 12px;
`,ie=i.Ay.div`
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
`,ae=i.Ay.div`
  flex: 1;
`,oe=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,se=i.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,de=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,le=i.Ay.div`
  display: flex;
  gap: 8px;
`,ce=i.Ay.button`
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
`,pe=i.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ue=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,ge=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,xe=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,he=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  margin-left: 8px;
`,ye=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,me=i.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,ve=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,be=i.Ay.button`
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
`,fe=i.Ay.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #FFFBEB;
  border-radius: 12px;
  border: 1px solid #FDE68A;
`,je=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #92400E;
  font-weight: 500;
`,Fe=e=>{let{brandId:n,restaurantId:t,onCountChange:i,onCategoryChange:a}=e;const{t:s}=(0,v.Bd)("recipes"),{user:d}=(0,l.As)(),u=t||(null===d||void 0===d?void 0:d.restaurant_id)||(null===d||void 0===d?void 0:d.restaurantId),[h,y]=(0,r.useState)([]),[m,j]=(0,r.useState)([]),[F,k]=(0,r.useState)(!0),[A,_]=(0,r.useState)(!1),[C,w]=(0,r.useState)(null),[B,E]=(0,r.useState)(!1),[$,S]=(0,r.useState)(null),[z,I]=(0,r.useState)({name:"",emoji:"",description:""}),R="Restaurant Admin"===(null===d||void 0===d?void 0:d.role),D="Brand General"===(null===d||void 0===d?void 0:d.role)||"Brand Manager"===(null===d||void 0===d?void 0:d.role),T=(0,r.useCallback)(()=>(0,b.c4)(),[]);(0,r.useEffect)(()=>{(async()=>{k(!0);const e=T();try{if(D&&n){const t=await fetch(`/api/brands/${n}/ingredient-categories`,{headers:{Authorization:`Bearer ${e}`}}),r=await t.json();r.success&&(y(r.data),i(r.data.length))}else if(R&&u){const n=await fetch(`/api/restaurants/${u}/ingredient-categories`,{headers:{Authorization:`Bearer ${e}`}}),a=await n.json();var t,r;if(a.success)y(a.data.own_categories||[]),j(a.data.brand_categories||[]),i(((null===(t=a.data.own_categories)||void 0===t?void 0:t.length)||0)+((null===(r=a.data.brand_categories)||void 0===r?void 0:r.length)||0))}}catch(a){console.error("Failed to fetch data:",a)}finally{k(!1)}})()},[n,u,D,R,T,i]);const N=async()=>{try{const r=T();if(D&&n){const e=await fetch(`/api/brands/${n}/ingredient-categories`,{headers:{Authorization:`Bearer ${r}`}}),t=await e.json();t.success&&(y(t.data),i(t.data.length))}else if(R&&u){const n=await fetch(`/api/restaurants/${u}/ingredient-categories`,{headers:{Authorization:`Bearer ${r}`}}),a=await n.json();var e,t;if(a.success)y(a.data.own_categories||[]),j(a.data.brand_categories||[]),i(((null===(e=a.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(t=a.data.brand_categories)||void 0===t?void 0:t.length)||0))}}catch(r){console.error("Failed to fetch categories:",r)}},M=e=>{e?(w(e),I({name:e.name,emoji:e.emoji||"",description:e.description||""})):(w(null),I({name:"",emoji:"",description:""})),_(!0)},O=()=>{_(!1),w(null),I({name:"",emoji:"",description:""})},P=async e=>{if(e.preventDefault(),z.name.trim())try{const e=(0,b.c4)();let t="";const r=C?"PUT":"POST";if(D&&n?t=C?`/api/brands/${n}/ingredient-categories/${C.id}`:`/api/brands/${n}/ingredient-categories`:R&&u&&(t=C?`/api/restaurants/${u}/ingredient-categories/${C.id}`:`/api/restaurants/${u}/ingredient-categories`),!t)return;const i=await fetch(t,{method:r,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:z.name.trim(),emoji:z.emoji||null,description:z.description.trim()||null})}),o=await i.json();o.success?(O(),N(),null===a||void 0===a||a()):alert(o.error||"Failed to save")}catch(t){console.error("Failed to save category:",t),alert("Failed to save")}},U=async(e,t)=>{const r="up"===t?e-1:e+1;if(r<0||r>=h.length)return;const i=[...h];[i[e],i[r]]=[i[r],i[e]];const a=i.map((e,n)=>({id:e.id,display_order:n}));try{const e=(0,b.c4)();let t="";if(D&&n?t=`/api/brands/${n}/ingredient-categories/reorder`:R&&u&&(t=`/api/restaurants/${u}/ingredient-categories/reorder`),!t)return;await fetch(t,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:a})}),N()}catch(o){console.error("Failed to reorder:",o)}},q=function(e,n,t){let r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,f.jsxs)(ie,{isActive:e.is_active,readOnly:r,children:[!r&&(0,f.jsx)(o.Xd,{onMoveUp:()=>U(n,"up"),onMoveDown:()=>U(n,"down"),disableUp:0===n,disableDown:n===t.length-1}),e.emoji&&(0,f.jsx)(me,{children:e.emoji}),(0,f.jsxs)(ae,{children:[(0,f.jsxs)(oe,{children:[e.name,r&&(0,f.jsx)(he,{children:s("recipes:ingredientCategoriesTab.brand")})]}),(0,f.jsxs)(se,{children:[(0,f.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),!r&&(0,f.jsx)(ye,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,f.jsx)(de,{children:e.description})]}),!r&&(0,f.jsxs)(le,{children:[(0,f.jsx)(ce,{onClick:()=>M(e),title:"Edit",children:(0,f.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,f.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,f.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,f.jsx)(ce,{onClick:()=>(e=>{S(e),E(!0)})(e),title:"Delete",children:(0,f.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,f.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return F?(0,f.jsx)(te,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:s("recipes:ingredientCategoriesTab.loading")})}):(0,f.jsxs)(te,{children:[(0,f.jsxs)(ge,{children:[(0,f.jsx)(xe,{children:s("recipes:ingredientCategoriesTab.ingredientCategories")}),(0,f.jsx)(p.cc,{variant:"primary",onClick:()=>M(),children:"Add Category"})]}),R&&m.length>0&&(0,f.jsxs)(fe,{children:[(0,f.jsx)(je,{children:"Brand Categories (Read Only)"}),(0,f.jsx)(re,{children:m.map((e,n)=>q(e,n,m,!0))})]}),0===h.length?(0,f.jsxs)(c.pp,{children:[(0,f.jsx)(pe,{children:s("recipes:ingredientCategoriesTab.noIngredientCategoriesYet")}),(0,f.jsx)(ue,{children:"Create categories to organize your ingredients"}),(0,f.jsx)(p.cc,{variant:"primary",onClick:()=>M(),children:"Add Category"})]}):(0,f.jsx)(re,{children:h.map((e,n)=>{return q(e,n,h,(t=e,R&&"brand"===t.owner_type));var t})}),(0,f.jsx)(g.aF,{isOpen:A,onClose:O,title:(C?"Edit":"New")+" Ingredient Category",size:"medium",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(g.yl,{variant:"secondary",onClick:O,children:s("recipes:ingredientCategoriesTab.cancel")}),(0,f.jsx)(g.yl,{variant:"primary",onClick:P,disabled:!z.name.trim(),children:C?"Update":"Create"})]}),children:(0,f.jsxs)("form",{onSubmit:P,children:[(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Category Name *"}),(0,f.jsx)(g.ZQ,{type:"text",value:z.name,onChange:e=>I({...z,name:e.target.value}),placeholder:"e.g., Vegetables",autoFocus:!0,required:!0})]}),(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:s("recipes:ingredientCategoriesTab.icon")}),(0,f.jsx)(ve,{children:["\ud83e\udd6c","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83c\udf36\ufe0f","\ud83e\udd52","\ud83c\udf3d","\ud83e\udd66","\ud83c\udf56","\ud83e\udd69","\ud83c\udf57","\ud83e\udd53","\ud83c\udf64","\ud83e\udd90","\ud83e\udd91","\ud83d\udc1f","\ud83e\udd9e","\ud83e\udd80","\ud83e\udd5b","\ud83e\uddc0","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf76","\ud83e\uddc2","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf6f","\ud83c\udf3e","\ud83c\udf5a","\ud83c\udf5e","\ud83e\udd56","\ud83e\udd50","\ud83e\uddc1","\ud83c\udf70","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf6b","\ud83c\udf4b","\ud83c\udf4a","\ud83c\udf4e","\ud83c\udf50","\ud83c\udf4c","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83c\udf51","\ud83e\udd6d","\ud83e\uddca","\ud83d\udca7","\ud83e\uded9","\ud83c\udf7e","\ud83e\udd6b","\ud83e\uddf4","\ud83c\udf75","\u2615","\ud83e\uddc3","\ud83e\udd64"].map(e=>(0,f.jsx)(be,{selected:z.emoji===e,onClick:()=>I({...z,emoji:e}),type:"button",children:e},e))})]}),(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:s("recipes:ingredientCategoriesTab.description")}),(0,f.jsx)(g.Lz,{value:z.description,onChange:e=>I({...z,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,f.jsx)(x.A,{isOpen:B,onCancel:()=>{E(!1),S(null)},onConfirm:async()=>{if($)try{const e=(0,b.c4)();let t="";if(D&&n?t=`/api/brands/${n}/ingredient-categories/${$.id}`:R&&u&&(t=`/api/restaurants/${u}/ingredient-categories/${$.id}`),!t)return;const r=await fetch(t,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await r.json();i.success?(E(!1),S(null),N(),null===a||void 0===a||a()):alert(i.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:$?`Are you sure you want to delete "${$.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},ke=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,Ae=i.Ay.select`
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
`,_e=()=>{const{t:e}=(0,v.Bd)("recipes"),{user:n}=(0,l.As)(),{restaurantId:t}=(0,a.g)(),[i,c]=(0,a.ok)(),[p,u]=(0,d.M)("ingredients"),[g,x]=(0,r.useState)(0),[h,y]=(0,r.useState)(0),[m,j]=(0,r.useState)([]),[F,k]=(0,r.useState)(!0),[A,_]=(0,r.useState)(0),C=i.get("brandId"),w=C?Number(C):m.length>0?m[0].id:null;(0,r.useEffect)(()=>{n&&"Brand General"===n.role?B():k(!1)},[n]);const B=async()=>{try{const e=(0,b.c4)(),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();j(e),e.length>0&&!C&&c({tab:p,brandId:String(e[0].id)})}}catch(e){console.error("Error fetching brands:",e)}finally{k(!1)}},E=e=>{u(e),w&&c(n=>(n.set("tab",e),n.set("brandId",String(w)),n))};return F?(0,f.jsxs)(o.mc,{children:[(0,f.jsx)(o.Y9,{children:(0,f.jsx)(o.hE,{children:e("recipes:ingredientsPage.ingredients")})}),(0,f.jsx)(o.UC,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:e("recipes:ingredientsPage.loading")})})]}):(0,f.jsxs)(o.mc,{children:[(0,f.jsxs)(o.Y9,{children:[(0,f.jsx)(o.hE,{children:e("recipes:ingredientsPage.ingredients")}),"Brand General"===(null===n||void 0===n?void 0:n.role)&&m.length>0&&(0,f.jsx)(ke,{children:(0,f.jsx)(Ae,{value:w||"",onChange:e=>{return n=Number(e.target.value),void c({tab:p,brandId:String(n)});var n},children:m.map(e=>(0,f.jsx)("option",{value:e.id,children:e.name},e.id))})})]}),(0,f.jsxs)(o.UC,{children:[(0,f.jsxs)(s.tU,{children:[(0,f.jsxs)(s.oz,{active:"ingredients"===p,onClick:()=>E("ingredients"),children:["Ingredients ",(0,f.jsx)(s.Ex,{count:g,showZero:!0})]}),(0,f.jsxs)(s.oz,{active:"ingredient-categories"===p,onClick:()=>E("ingredient-categories"),children:["Categories ",(0,f.jsx)(s.Ex,{count:h,showZero:!0})]})]}),(w||"Brand General"!==(null===n||void 0===n?void 0:n.role))&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{style:{display:"ingredients"===p?"block":"none"},children:(0,f.jsx)(ne,{brandId:w,restaurantId:t?Number(t):null,onCountChange:x,categoryRefreshKey:A})}),(0,f.jsx)("div",{style:{display:"ingredient-categories"===p?"block":"none"},children:(0,f.jsx)(Fe,{brandId:w,restaurantId:t?Number(t):null,onCountChange:y,onCategoryChange:()=>_(e=>e+1)})})]})]})]})}}}]);