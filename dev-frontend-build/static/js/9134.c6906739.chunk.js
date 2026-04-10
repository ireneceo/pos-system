"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9134],{2653:(e,t,i)=>{i.d(t,{M:()=>o});var n=i(9950),r=i(4492);function o(e){const[t,i]=(0,r.ok)(),o=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,n.useState)(o());return[a,(0,n.useCallback)(e=>{s(e),i({tab:e})},[i])]}},3705:(e,t,i)=>{i.d(t,{cc:()=>r});var n=i(4752);const r=n.Ay.button`
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
`},7617:(e,t,i)=>{i.d(t,{A:()=>x});i(9950);var n=i(7119),r=i(4752),o=i(9610),a=i(4414);const s=r.Ay.div`
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
`,x=e=>{let{isOpen:t,title:i,message:r,onConfirm:x,onCancel:h,confirmText:g="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return t?n.createPortal((0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(d,{children:[(0,a.jsx)(l,{children:i}),(0,a.jsx)(c,{children:r})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(u,{variant:"secondary",onClick:h,children:m}),(0,a.jsx)(u,{variant:"primary",type:y,onClick:x,children:g})]})]})}),document.body):null}},9134:(e,t,i)=>{i.r(t),i.d(t,{default:()=>De});var n=i(9950),r=i(8409),o=i(2597),a=i(2653),s=i(1367),d=i(4752),l=i(2853),c=i(3705),p=i(2488),u=i(9610),x=i(4877),h=i(7617),g=i(9194),m=i(5030),y=i(9955),b=i(4414);const j=d.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,v=d.Ay.div`
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
`,f=d.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`,_=d.Ay.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${e=>e.src?`url(${e.src}) center/cover`:"#F3F4F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 28px;
`,C=d.Ay.div`
  flex: 1;
  min-width: 0;
`,F=d.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,k=d.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,A=d.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,w=d.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,E=d.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,B=d.Ay.span`
  color: #6B7280;
`,S=d.Ay.span`
  color: #0A2540;
  font-weight: 500;
`,z=d.Ay.span`
  color: #059669;
  font-weight: 600;
  font-size: 16px;
`,$=d.Ay.div`
  flex: 1;
  min-height: 12px;
`,q=d.Ay.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,D=d.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${e=>"danger"===e.variant?"#FEE2E2":"#E6EBF1"};
  background: ${e=>"danger"===e.variant?"#FEF2F2":"#F9FAFB"};
  color: ${e=>"danger"===e.variant?"#DC2626":"#374151"};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>"danger"===e.variant?"#FEE2E2":"#F3F4F6"};
    border-color: ${e=>"danger"===e.variant?"#FECACA":"#D1D5DB"};
  }
`,R=d.Ay.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,P=d.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 20px 0;
`,T=d.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`,M=d.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: ${e=>e.color||"#E5E7EB"};
  color: #374151;
  border-radius: 4px;
  font-size: 11px;
`,L=(0,d.Ay)(M)`
  background: #DBEAFE;
  color: #1E40AF;
`,O=(0,d.Ay)(M)`
  background: #E5E7EB;
  color: #374151;
`,N=d.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #667eea;
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 6px;
`,I=d.Ay.div`
  font-size: 11px;
  color: #667eea;
  margin-top: 4px;
  line-height: 1.4;
`,U=d.Ay.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
  background: #F9FAFB;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #F3F4F6; border-color: #D1D5DB; }
`,G=d.Ay.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${e=>e.isActive?"#D1FAE5":"#FEE2E2"};
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${e=>e.isActive?"#D1FAE5":"#FEE2E2"};
  }
`,Q=d.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
`,W=d.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`,Z=d.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    border-color: #635BFF;
  }

  input:checked + span {
    color: #635BFF;
    font-weight: 500;
  }
`,Y=e=>{let{brands:t,onCountChange:i,categoryRefreshKey:r,optionRefreshKey:o}=e;const{t:a}=(0,m.Bd)("brand"),[s,d]=(0,n.useState)([]),[M,Y]=(0,n.useState)([]),[H,J]=(0,n.useState)([]),[K,V]=(0,n.useState)([]),[X,ee]=(0,n.useState)(!0),[te,ie]=(0,n.useState)(""),[ne,re]=(0,n.useState)("all"),[oe,ae]=(0,n.useState)("all"),[se,de]=(0,n.useState)(!1),[le,ce]=(0,n.useState)(null),[pe,ue]=(0,n.useState)(!1),[xe,he]=(0,n.useState)(null),[ge,me]=(0,n.useState)({name:"",description:"",sku:"",unit:"",base_quantity:"1",unit_price:"",min_order_quantity:"1",category_id:"",image_url:"",emoji:"",is_active:!0,is_set_menu:!1,set_items:[],set_display_order:"0",product_recipe_id:null,brand_ids:[],option_group_ids:[]}),[ye,be]=(0,n.useState)(""),[je,ve]=(0,n.useState)(null),[fe,_e]=(0,n.useState)(!1),[Ce,Fe]=(0,n.useState)([]),[ke,Ae]=(0,n.useState)([]),we=(0,n.useCallback)(()=>(0,y.c4)(),[]),Ee=(0,n.useCallback)(async()=>{try{const e=we(),t=await fetch("/api/brand-products",{headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success&&(d(n.data),i(n.data.length))}catch(e){console.error("Failed to fetch products:",e)}},[we,i]),Be=(0,n.useCallback)(async()=>{try{const e=we(),t=await fetch("/api/brand-product-categories",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&Y(i.data)}catch(e){console.error("Failed to fetch categories:",e)}},[we]),Se=(0,n.useCallback)(async()=>{try{const e=we(),t=await fetch("/api/brand-product-option-groups",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&J(i.data)}catch(e){console.error("Failed to fetch option groups:",e)}},[we]),ze=(0,n.useCallback)(async()=>{try{const e=we(),t=await fetch("/api/product-recipes",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&V(i.data||[])}catch(e){console.error("Failed to fetch product recipes:",e)}},[we]);(0,n.useEffect)(()=>{(async()=>{ee(!0),await Promise.all([Ee(),Be(),Se(),ze()]);try{const e=(0,y.c4)(),t=await fetch("/api/product-ingredients",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();Ae((e.data||e||[]).map(e=>({id:e.id,name:e.name,unit:e.unit,unit_cost:Number(e.unit_cost||0)})))}}catch(e){console.error("Failed to fetch product ingredients:",e)}ee(!1)})()},[Ee,Be,Se,ze]),(0,n.useEffect)(()=>{void 0!==r&&Be()},[r,Be]),(0,n.useEffect)(()=>{void 0!==o&&Se()},[o,Se]);const $e=e=>{var t,i,n,r,o,a,s;if(e)if(ce(e),me({name:e.name,description:e.description||"",sku:e.sku||"",unit:e.unit||"",base_quantity:(e.base_quantity||1).toString(),unit_price:e.unit_price.toString(),min_order_quantity:e.min_order_quantity.toString(),category_id:(null===(t=e.category_id)||void 0===t?void 0:t.toString())||"",image_url:e.image_url||"",emoji:e.emoji||"",is_active:e.is_active,is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[],set_display_order:(e.set_display_order||0).toString(),product_recipe_id:e.product_recipe_id&&null!==(i=e.productRecipe)&&void 0!==i&&null!==(n=i.name)&&void 0!==n&&n.endsWith("(auto)")?null:e.product_recipe_id||null,brand_ids:(null===(r=e.brands)||void 0===r?void 0:r.map(e=>e.id))||[],option_group_ids:(null===(o=e.optionGroups)||void 0===o?void 0:o.map(e=>e.id))||[]}),e.product_recipe_id&&null!==(a=e.productRecipe)&&void 0!==a&&null!==(s=a.name)&&void 0!==s&&s.endsWith("(auto)")){const t=(0,y.c4)();fetch(`/api/product-recipes/${e.product_recipe_id}`,{headers:{Authorization:`Bearer ${t}`}}).then(e=>e.json()).then(e=>{const t=e.data||e,i=(null===t||void 0===t?void 0:t.recipeIngredients)||(null===t||void 0===t?void 0:t.ProductRecipeIngredients)||[];Fe(i.map(e=>{var t,i,n;return{ingredient_id:e.ingredient_id,name:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"",quantity:parseFloat(e.quantity),unit:e.unit||(null===(i=e.ingredient)||void 0===i?void 0:i.unit)||"",unit_cost:parseFloat((null===(n=e.ingredient)||void 0===n?void 0:n.unit_cost)||0)}}))}).catch(()=>Fe([]))}else Fe([]);else ce(null),me({name:"",description:"",sku:"",unit:"",base_quantity:"1",unit_price:"",min_order_quantity:"1",category_id:M.length>0?M[0].id.toString():"",image_url:"",emoji:"",is_active:!0,is_set_menu:!1,set_items:[],set_display_order:"0",product_recipe_id:null,brand_ids:[],option_group_ids:[]}),Fe([]);be(""),de(!0)},qe=()=>{de(!1),ce(null),ve(null)},De=(e,t)=>{me(i=>({...i,set_items:i.set_items.map(i=>{if(i.productId===e){const e=Math.max(1,i.quantity+t);return{...i,quantity:e}}return i})}))},Re=s.filter(e=>{var t,i;const n=e.name.toLowerCase().includes(te.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(te.toLowerCase()),r="all"===ne||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===ne,o="all"===oe||(null===(i=e.brands)||void 0===i?void 0:i.some(e=>e.id.toString()===oe));return n&&r&&o});return X?(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading products..."}):(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,b.jsxs)(p.Qn,{style:{marginBottom:0},children:[(0,b.jsx)(p.DO,{type:"text",placeholder:"Search products...",value:te,onChange:e=>ie(e.target.value)}),(0,b.jsxs)(p.Jt,{value:ne,onChange:e=>re(e.target.value),children:[(0,b.jsx)("option",{value:"all",children:"All Categories"}),M.map(e=>(0,b.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]}),(0,b.jsxs)(p.Jt,{value:oe,onChange:e=>ae(e.target.value),children:[(0,b.jsx)("option",{value:"all",children:"All Brands"}),t.map(e=>(0,b.jsx)("option",{value:e.id.toString(),children:e.name},e.id))]})]}),(0,b.jsx)(c.cc,{onClick:()=>$e(),style:{flexShrink:0},children:"Add Product"})]}),0===Re.length?(0,b.jsxs)(l.pp,{children:[(0,b.jsx)(R,{children:te||"all"!==ne||"all"!==oe?"No products found":"No products yet"}),(0,b.jsx)(P,{children:te||"all"!==ne||"all"!==oe?"Try adjusting your search or filter criteria.":"Start by adding your first product."}),!te&&"all"===ne&&"all"===oe&&(0,b.jsx)(c.cc,{onClick:()=>$e(),children:"Add Product"})]}):(0,b.jsx)(j,{children:Re.map(e=>(0,b.jsxs)(v,{isActive:e.is_active,onClick:()=>$e(e),children:[(0,b.jsxs)(f,{children:[(0,b.jsx)(_,{src:e.image_url,children:!e.image_url&&(e.emoji||"\ud83d\udce6")}),(0,b.jsxs)(C,{children:[(0,b.jsxs)(F,{children:[e.name,e.is_set_menu&&(0,b.jsx)(N,{children:"SET"})]}),e.sku&&(0,b.jsxs)(k,{children:["SKU: ",e.sku]}),e.category&&(0,b.jsxs)(A,{children:[e.category.emoji," ",e.category.name]}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,b.jsxs)(I,{children:["Set: ",e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")]})]})]}),(0,b.jsxs)(w,{children:[(0,b.jsxs)(E,{children:[(0,b.jsx)(B,{children:"Unit Price"}),(0,b.jsxs)(z,{children:["RM ",(Number(e.unit_price)||0).toFixed(2)]})]}),e.unit&&(0,b.jsxs)(E,{children:[(0,b.jsx)(B,{children:"Unit"}),(0,b.jsx)(S,{children:e.unit})]}),(0,b.jsxs)(E,{children:[(0,b.jsx)(B,{children:"Min Order"}),(0,b.jsx)(S,{children:e.min_order_quantity})]})]}),e.brands&&e.brands.length>0&&(0,b.jsx)(T,{children:e.brands.map(e=>(0,b.jsx)(L,{children:e.name},e.id))}),e.optionGroups&&e.optionGroups.length>0&&(0,b.jsx)(T,{children:e.optionGroups.map(e=>(0,b.jsx)(O,{children:e.name},e.id))}),(0,b.jsx)($,{}),(0,b.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,b.jsx)(D,{onClick:()=>$e(e),children:"Edit"}),(0,b.jsx)(U,{onClick:t=>(async(e,t)=>{t.stopPropagation();try{const t=we(),i=await fetch(`/api/brand-products/${e.id}/copy`,{method:"POST",headers:{Authorization:`Bearer ${t}`}}),n=await i.json();n.success?Ee():alert(n.error||n.message||"Failed to copy product")}catch(i){console.error("Failed to copy product:",i)}})(e,t),children:"Copy"}),(0,b.jsx)(G,{isActive:e.is_active,onClick:t=>(async(e,t)=>{t.stopPropagation();try{const t=we(),i=await fetch(`/api/brand-products/${e.id}/toggle-active`,{method:"PUT",headers:{Authorization:`Bearer ${t}`}});(await i.json()).success&&Ee()}catch(i){console.error("Failed to toggle product:",i)}})(e,t),children:e.is_active?"Active":"Inactive"}),(0,b.jsx)(D,{variant:"danger",onClick:t=>((e,t)=>{t.stopPropagation(),he(e),ue(!0)})(e,t),children:"Delete"})]})]},e.id))}),se&&(0,b.jsx)(u.aF,{isOpen:se,onClose:qe,title:le?"Edit Product":"Add Product",maxWidth:"700px",children:(0,b.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),!fe)if(ve(null),ge.name.trim())if(ge.unit){_e(!0);try{const e=we(),t=le?"PUT":"POST",i=le?`/api/brand-products/${le.id}`:"/api/brand-products",n=await fetch(i,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:ge.name.trim(),description:ge.description.trim()||null,sku:ge.sku.trim()||null,unit:ge.unit||null,base_quantity:parseFloat(ge.base_quantity)||1,unit_price:parseFloat(ge.unit_price)||0,min_order_quantity:parseInt(ge.min_order_quantity)||1,category_id:ge.category_id?parseInt(ge.category_id):null,image_url:ge.image_url||null,emoji:ge.emoji||null,is_active:ge.is_active,is_set_menu:ge.is_set_menu,set_items:ge.is_set_menu?ge.set_items:null,set_display_order:parseInt(ge.set_display_order)||0,product_recipe_id:ge.product_recipe_id,brand_ids:ge.brand_ids,option_group_ids:ge.option_group_ids,directIngredients:ge.product_recipe_id?void 0:Ce})}),r=await n.json();r.success?(qe(),Ee()):ve(r.error||"Failed to save product")}catch(t){console.error("Failed to save product:",t),ve("Failed to save product. Please try again.")}finally{_e(!1)}}else ve("Unit is required");else ve("Product name is required")},children:[(0,b.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Name *"}),(0,b.jsx)(u.ZQ,{type:"text",value:ge.name,onChange:e=>me({...ge,name:e.target.value}),placeholder:"Product name",required:!0})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"SKU"}),(0,b.jsx)(u.ZQ,{type:"text",value:ge.sku,onChange:e=>me({...ge,sku:e.target.value}),placeholder:"Product code"})]})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Category"}),(0,b.jsxs)(u.FX,{value:ge.category_id,onChange:e=>me({...ge,category_id:e.target.value}),children:[(0,b.jsx)("option",{value:"",children:"No category"}),M.map(e=>(0,b.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Description"}),(0,b.jsx)(u.Lz,{value:ge.description,onChange:e=>me({...ge,description:e.target.value}),placeholder:"Product description",rows:2})]}),(0,b.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Unit Price (RM) *"}),(0,b.jsx)(u.ZQ,{type:"number",step:"0.01",min:"0",value:ge.unit_price,onChange:e=>me({...ge,unit_price:e.target.value}),placeholder:"0.00",required:!0})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Base Qty *"}),(0,b.jsx)(u.ZQ,{type:"number",step:"0.01",min:"0.01",value:ge.base_quantity,onChange:e=>me({...ge,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Unit *"}),(0,b.jsxs)(u.FX,{value:ge.unit,onChange:e=>me({...ge,unit:e.target.value}),required:!0,children:[(0,b.jsx)("option",{value:"",children:"Select unit"}),[{value:"kg",label:"kg"},{value:"g",label:"g"},{value:"L",label:"L"},{value:"ml",label:"ml"},{value:"piece",label:"piece"},{value:"pack",label:"pack"},{value:"can",label:"can"},{value:"bottle",label:"bottle"}].map(e=>(0,b.jsx)("option",{value:e.value,children:e.label},e.value))]})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Min Order Qty"}),(0,b.jsx)(u.ZQ,{type:"number",min:"1",value:ge.min_order_quantity,onChange:e=>me({...ge,min_order_quantity:e.target.value})})]})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Product Image"}),(0,b.jsx)(x.A,{value:ge.image_url,onChange:e=>me({...ge,image_url:e||""}),label:"",helpText:"Upload a product image (max 2MB)"})]}),(0,b.jsx)(u.gE,{children:(0,b.jsxs)(Q,{children:[(0,b.jsx)("input",{type:"checkbox",checked:ge.is_set_menu,onChange:e=>me({...ge,is_set_menu:e.target.checked,set_items:e.target.checked?ge.set_items:[]})}),"Set Menu (bundle multiple products)"]})}),ge.is_set_menu&&(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Set Items *"}),ge.set_items.length>0&&(0,b.jsx)("div",{style:{marginBottom:"12px"},children:ge.set_items.map(e=>(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 12px",background:"#F9FAFB",borderRadius:"6px",marginBottom:"4px"},children:[(0,b.jsx)("span",{style:{flex:1,fontSize:"14px"},children:e.name}),(0,b.jsx)("button",{type:"button",onClick:()=>De(e.productId,-1),style:{width:"28px",height:"28px",border:"1px solid #D1D5DB",borderRadius:"4px",background:"white",cursor:"pointer"},children:"-"}),(0,b.jsx)("span",{style:{minWidth:"24px",textAlign:"center",fontWeight:600},children:e.quantity}),(0,b.jsx)("button",{type:"button",onClick:()=>De(e.productId,1),style:{width:"28px",height:"28px",border:"1px solid #D1D5DB",borderRadius:"4px",background:"white",cursor:"pointer"},children:"+"}),(0,b.jsx)("button",{type:"button",onClick:()=>{return t=e.productId,void me(e=>({...e,set_items:e.set_items.filter(e=>e.productId!==t)}));var t},style:{color:"#DC2626",background:"none",border:"none",cursor:"pointer",fontSize:"16px"},children:"x"})]},e.productId))}),(0,b.jsx)(u.ZQ,{type:"text",placeholder:"Search products to add...",value:ye,onChange:e=>be(e.target.value),style:{marginBottom:"8px"}}),(0,b.jsx)("div",{style:{maxHeight:"200px",overflowY:"auto",background:"#F9FAFB",borderRadius:"8px",padding:"8px"},children:s.filter(e=>!e.is_set_menu&&(!le||e.id!==le.id)).filter(e=>!ye||e.name.toLowerCase().includes(ye.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(ye.toLowerCase())).map(e=>(0,b.jsxs)("div",{onClick:()=>(e=>{const t=s.find(t=>t.id===e);if(!t||t.is_set_menu)return;const i=ge.set_items.find(t=>t.productId===e);me(i?t=>({...t,set_items:t.set_items.map(t=>t.productId===e?{...t,quantity:t.quantity+1}:t)}):i=>({...i,set_items:[...i.set_items,{productId:e,name:t.name,quantity:1}]}))})(e.id),style:{padding:"8px 12px",cursor:"pointer",borderRadius:"6px",marginBottom:"2px",background:ge.set_items.some(t=>t.productId===e.id)?"#EEF2FF":"white",border:"1px solid #E5E7EB",fontSize:"13px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,b.jsxs)("span",{children:[e.emoji||"\ud83d\udce6"," ",e.sku?`${e.sku} `:"",e.name]}),(0,b.jsxs)("span",{style:{color:"#6B7280"},children:["RM ",(Number(e.unit_price)||0).toFixed(2)]})]},e.id))})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Linked Brands"}),(0,b.jsx)(W,{children:t.map(e=>(0,b.jsxs)(Z,{children:[(0,b.jsx)("input",{type:"checkbox",checked:ge.brand_ids.includes(e.id),onChange:()=>{return t=e.id,void me(e=>({...e,brand_ids:e.brand_ids.includes(t)?e.brand_ids.filter(e=>e!==t):[...e.brand_ids,t]}));var t}}),(0,b.jsx)("span",{children:e.name})]},e.id))})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Option Groups"}),H.length>0?(0,b.jsx)(W,{children:H.map(e=>(0,b.jsxs)(Z,{children:[(0,b.jsx)("input",{type:"checkbox",checked:ge.option_group_ids.includes(e.id),onChange:()=>{return t=e.id,void me(e=>({...e,option_group_ids:e.option_group_ids.includes(t)?e.option_group_ids.filter(e=>e!==t):[...e.option_group_ids,t]}));var t}}),(0,b.jsxs)("span",{children:[e.name," ",e.is_required?"(Required)":""]})]},e.id))}):(0,b.jsx)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px",color:"#6B7280",fontSize:"13px"},children:"No option groups available. Create option groups in the Options tab first."})]}),0===Ce.length&&(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Linked Product Recipe"}),(0,b.jsx)(g.A,{options:K.filter(e=>{var t;return!(null!==(t=e.name)&&void 0!==t&&t.endsWith("(auto)"))}).map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:ge.product_recipe_id,onChange:e=>me({...ge,product_recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No product recipes found"})]}),!ge.product_recipe_id&&(0,b.jsxs)(u.gE,{children:[(0,b.jsxs)(u.lR,{children:["Ingredients (direct) ",Ce.length>0&&(0,b.jsxs)("span",{style:{fontSize:"11px",color:"#6B7280",fontWeight:400},children:["Cost: RM ",Ce.reduce((e,t)=>e+t.unit_cost*t.quantity,0).toFixed(2)]})]}),Ce.map((e,t)=>(0,b.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",marginBottom:"6px",fontSize:"13px",background:"#F9FAFB",padding:"8px 12px",borderRadius:"6px"},children:[(0,b.jsx)("span",{style:{flex:1},children:e.name}),(0,b.jsx)("input",{type:"number",value:e.quantity,min:"0.01",step:"0.01",style:{width:"60px",textAlign:"center",border:"1px solid #E6EBF1",borderRadius:"4px",padding:"2px 4px",fontSize:"13px"},onChange:e=>Fe(i=>i.map((i,n)=>n===t?{...i,quantity:parseFloat(e.target.value)||0}:i))}),(0,b.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",width:"30px"},children:e.unit}),(0,b.jsxs)("span",{style:{width:"70px",textAlign:"right",color:"#6B7280",fontSize:"12px"},children:["RM ",(e.unit_cost*e.quantity).toFixed(2)]}),(0,b.jsx)("button",{type:"button",onClick:()=>Fe(e=>e.filter((e,i)=>i!==t)),style:{background:"none",border:"none",color:"#EF4444",cursor:"pointer",fontSize:"16px",padding:"0 4px"},children:"x"})]},t)),(0,b.jsx)(g.A,{options:ke.filter(e=>!Ce.some(t=>t.ingredient_id===e.id)).map(e=>({value:e.id,label:e.name,subLabel:`${e.unit} / RM ${Number(e.unit_cost||0).toFixed(2)}`})),value:null,onChange:e=>{if(e){const t=ke.find(t=>t.id===e);t&&Fe(e=>[...e,{ingredient_id:t.id,name:t.name,quantity:1,unit:t.unit,unit_cost:Number(t.unit_cost||0)}])}},placeholder:"+ Add ingredient...",allowClear:!1,noOptionsMessage:"No ingredients available"})]}),(0,b.jsx)(u.gE,{style:{marginBottom:0},children:(0,b.jsxs)(Q,{children:[(0,b.jsx)("input",{type:"checkbox",checked:ge.is_active,onChange:e=>me({...ge,is_active:e.target.checked})}),"Active"]})}),(0,b.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,b.jsx)(u.yl,{type:"button",onClick:qe,disabled:fe,children:"Cancel"}),(0,b.jsx)(u.yl,{type:"submit",variant:"primary",disabled:fe,children:fe?"Saving...":le?"Update":"Create"})]}),je&&(0,b.jsx)("div",{style:{marginTop:"16px",padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:je})]})}),(0,b.jsx)(h.A,{isOpen:pe,onCancel:()=>{ue(!1),he(null)},onConfirm:async()=>{if(xe)try{const e=we(),t=await fetch(`/api/brand-products/${xe.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success?(ue(!1),he(null),Ee()):alert(i.error||"Failed to delete product")}catch(e){console.error("Failed to delete product:",e),alert("Failed to delete product")}},title:"Delete Product",message:`Are you sure you want to delete "${null===xe||void 0===xe?void 0:xe.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},H=d.Ay.div`
  margin-top: 24px;
`,J=d.Ay.div`
  display: grid;
  gap: 12px;
`,K=d.Ay.div`
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
`,V=d.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,X=d.Ay.div`
  flex: 1;
`,ee=d.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,te=d.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,ie=d.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,ne=d.Ay.div`
  display: flex;
  gap: 8px;
`,re=d.Ay.button`
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
`,oe=d.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ae=d.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,se=d.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,de=d.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,le=d.Ay.button`
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
`,ce=e=>{let{onCountChange:t,onCategoryChange:i}=e;const{t:o}=(0,m.Bd)("brand"),[a,s]=(0,n.useState)([]),[d,p]=(0,n.useState)(!0),[x,g]=(0,n.useState)(!1),[j,v]=(0,n.useState)(null),[f,_]=(0,n.useState)(!1),[C,F]=(0,n.useState)(null),[k,A]=(0,n.useState)({name:"",emoji:"",description:""}),w=(0,n.useCallback)(()=>(0,y.c4)(),[]),E=(0,n.useCallback)(async()=>{try{const e=w(),i=await fetch("/api/brand-product-categories",{headers:{Authorization:`Bearer ${e}`}}),n=await i.json();n.success&&(s(n.data),t(n.data.length))}catch(e){console.error("Failed to fetch categories:",e)}finally{p(!1)}},[w,t]);(0,n.useEffect)(()=>{p(!0),E()},[E]);const B=e=>{e?(v(e),A({name:e.name,emoji:e.emoji||"",description:e.description||""})):(v(null),A({name:"",emoji:"",description:""})),g(!0)},S=()=>{g(!1),v(null),A({name:"",emoji:"",description:""})},z=async(e,t)=>{try{const i=w(),n=await fetch(`/api/brand-product-categories/${e}/reorder`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({direction:t})}),r=await n.json();r.success?E():alert(r.error||"Failed to reorder")}catch(i){console.error("Failed to reorder category:",i)}};return d?(0,b.jsx)(H,{children:(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading categories..."})}):(0,b.jsxs)(H,{children:[(0,b.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"16px"},children:(0,b.jsx)(c.cc,{onClick:()=>B(),children:"Add Category"})}),0===a.length?(0,b.jsxs)(l.pp,{children:[(0,b.jsx)(oe,{children:"No categories yet"}),(0,b.jsx)(ae,{children:"Create your first product category to organize your products."}),(0,b.jsx)(c.cc,{onClick:()=>B(),children:"Add Category"})]}):(0,b.jsx)(J,{children:a.map((e,t)=>(0,b.jsxs)(K,{isActive:e.is_active,children:[(0,b.jsx)(r.Xd,{onMoveUp:()=>z(e.id,"up"),onMoveDown:()=>z(e.id,"down"),disableUp:0===t,disableDown:t===a.length-1}),(0,b.jsx)(V,{children:e.emoji||"\ud83d\udce6"}),(0,b.jsxs)(X,{children:[(0,b.jsx)(ee,{children:e.name}),(0,b.jsxs)(te,{children:[(0,b.jsxs)("span",{children:[e.product_count||0," products"]}),(0,b.jsx)(se,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,b.jsx)(ie,{children:e.description})]}),(0,b.jsxs)(ne,{children:[(0,b.jsx)(re,{onClick:()=>B(e),title:"Edit",children:(0,b.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,b.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"}),(0,b.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,b.jsx)(re,{onClick:()=>(e=>{F(e),_(!0)})(e),title:"Delete",children:(0,b.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,b.jsx)("path",{d:"M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"}),(0,b.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),(0,b.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17"})]})})]})]},e.id))}),x&&(0,b.jsx)(u.aF,{isOpen:x,onClose:S,title:j?"Edit Category":"Add Category",children:(0,b.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),k.name.trim())try{const e=w(),t=j?"PUT":"POST",n=j?`/api/brand-product-categories/${j.id}`:"/api/brand-product-categories",r=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:k.name.trim(),emoji:k.emoji||null,description:k.description.trim()||null})}),o=await r.json();o.success?(S(),E(),null===i||void 0===i||i()):alert(o.error||"Failed to save")}catch(t){console.error("Failed to save category:",t),alert("Failed to save")}},children:[(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Name *"}),(0,b.jsx)(u.ZQ,{type:"text",value:k.name,onChange:e=>A({...k,name:e.target.value}),placeholder:"Category name",required:!0})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Emoji"}),(0,b.jsx)(de,{children:["\ud83d\udce6","\ud83e\udd6b","\ud83e\uddc2","\ud83c\udf3e","\ud83e\udd5b","\ud83e\uddc8","\ud83e\udd5a","\ud83c\udf56","\ud83e\udd69","\ud83c\udf57","\ud83d\udc1f","\ud83e\udd90","\ud83e\udd91","\ud83e\udd6c","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83c\udf36\ufe0f","\ud83c\udf4b","\ud83c\udf4a","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd65","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf6f","\ud83e\uded2","\ud83e\uddca","\ud83c\udf76","\ud83e\uded9","\ud83e\uddf4","\ud83e\uddc3","\ud83c\udf75","\u2615","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd64","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf6b","\ud83c\udf6c","\ud83c\udf6d","\ud83e\uddc7","\ud83e\udd50","\ud83c\udf5e"].map(e=>(0,b.jsx)(le,{type:"button",selected:k.emoji===e,onClick:()=>A({...k,emoji:e}),children:e},e))})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Description"}),(0,b.jsx)(u.Lz,{value:k.description,onChange:e=>A({...k,description:e.target.value}),placeholder:"Category description (optional)",rows:3})]}),(0,b.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,b.jsx)(u.yl,{type:"button",onClick:S,children:"Cancel"}),(0,b.jsx)(u.yl,{type:"submit",variant:"primary",children:j?"Update":"Create"})]})]})}),(0,b.jsx)(h.A,{isOpen:f,onCancel:()=>{_(!1),F(null)},onConfirm:async()=>{if(C)try{const e=w(),t=await fetch(`/api/brand-product-categories/${C.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success?(_(!1),F(null),E(),null===i||void 0===i||i()):alert(n.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:`Are you sure you want to delete "${null===C||void 0===C?void 0:C.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},pe=d.Ay.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  ${e=>{switch(e.variant){case"danger":return"\n          background: #EF4444;\n          color: white;\n          &:hover { background: #EF4444; }\n        ";case"secondary":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E5E7EB;\n          &:hover { background: #F9FAFB; }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n          &:hover { background: #5246ED; }\n        "}}}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ue=d.Ay.div`
  display: grid;
  gap: 16px;
`,xe=d.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,he=d.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,ge=d.Ay.div`
  flex: 1;
`,me=d.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ye=d.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,be=d.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>"required"===e.type?"\n    background: #FEE2E2;\n    color: #DC2626;\n  ":"\n    background: #E0F2FE;\n    color: #0369A1;\n  "}
`,je=d.Ay.div`
  display: flex;
  gap: 8px;
`,ve=d.Ay.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }

  svg {
    width: 16px;
    height: 16px;
    color: #6B7280;
  }
`,fe=d.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,_e=d.Ay.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`,Ce=d.Ay.span`
  margin-left: 6px;
  color: #6B7280;
  font-size: 12px;
`,Fe=d.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ke=d.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,Ae=d.Ay.div`
  margin-bottom: 20px;
`,we=d.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,Ee=d.Ay.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Be=d.Ay.div`
  display: flex;
  gap: 16px;
`,Se=d.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
`,ze=d.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,$e=d.Ay.button`
  background: #FEE2E2;
  color: #DC2626;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #FECACA;
  }
`,qe=e=>{let{onCountChange:t}=e;const{t:i}=(0,m.Bd)("brand"),[r,o]=(0,n.useState)([]),[a,s]=(0,n.useState)(!0),[d,x]=(0,n.useState)(""),[h,g]=(0,n.useState)(!1),[j,v]=(0,n.useState)(!1),[f,_]=(0,n.useState)(null),[C,F]=(0,n.useState)(null),[k,A]=(0,n.useState)({name:"",is_required:!1,options:[]}),[w,E]=(0,n.useState)({name:"",price_adjustment:0,ingredient_id:null,ingredient_quantity:1}),[B,S]=(0,n.useState)([]),z=(0,n.useCallback)(async()=>{try{const e=(0,y.c4)(),i=await fetch("/api/brand-product-option-groups",{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&(o(e.data),t(e.data.length))}}catch(e){console.error("Error fetching option groups:",e)}finally{s(!1)}},[t]);(0,n.useEffect)(()=>{z();const e=(0,y.c4)();fetch("/api/product-ingredients",{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()).then(e=>S((e.data||e||[]).map(e=>({id:e.id,name:e.name,unit:e.unit,unit_cost:Number(e.unit_cost||0)})))).catch(()=>{})},[z]);const $=e=>{e?(_(e),A({name:e.name,is_required:e.is_required,options:e.options.map(e=>({...e}))})):(_(null),A({name:"",is_required:!1,options:[]})),g(!0)},q=()=>{g(!1),_(null),A({name:"",is_required:!1,options:[]}),E({name:"",price_adjustment:0})},D=r.filter(e=>e.name.toLowerCase().includes(d.toLowerCase()));return a?(0,b.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7280"},children:"Loading..."}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,b.jsx)(p.Qn,{style:{marginBottom:0},children:(0,b.jsx)(p.DO,{type:"text",placeholder:"Search option groups...",value:d,onChange:e=>x(e.target.value)})}),(0,b.jsx)(c.cc,{onClick:()=>$(),style:{flexShrink:0},children:"Add Option Group"})]}),0===D.length?(0,b.jsxs)(l.pp,{children:[(0,b.jsx)(Fe,{children:"No option groups yet"}),(0,b.jsx)(ke,{children:"Create option groups to add customizable options to your products"}),(0,b.jsx)(pe,{onClick:()=>$(),children:"Add Option Group"})]}):(0,b.jsx)(ue,{children:D.map(e=>(0,b.jsxs)(xe,{children:[(0,b.jsxs)(he,{children:[(0,b.jsxs)(ge,{children:[(0,b.jsx)(me,{children:e.name}),(0,b.jsxs)(ye,{children:[(0,b.jsx)(be,{type:e.is_required?"required":"optional",children:e.is_required?"Required":"Optional"}),(0,b.jsxs)("span",{style:{fontSize:"13px",color:"#6B7280"},children:[e.options.length," options"]})]})]}),(0,b.jsxs)(je,{children:[(0,b.jsx)(ve,{onClick:()=>$(e),children:(0,b.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,b.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,b.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,b.jsx)(ve,{onClick:()=>{return t=e.id,F(t),void v(!0);var t},children:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,b.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,b.jsx)(fe,{children:e.options.map((e,t)=>(0,b.jsxs)(_e,{children:[e.name,0!==e.price_adjustment&&(0,b.jsxs)(Ce,{children:[Number(e.price_adjustment)>0?"+":"","RM ",(Number(e.price_adjustment)||0).toFixed(2)]})]},t))})]},e.id))}),(0,b.jsxs)(u.aF,{isOpen:h,onClose:q,title:f?"Edit Option Group":"New Option Group",children:[(0,b.jsxs)(Ae,{children:[(0,b.jsx)(we,{children:"Group Name"}),(0,b.jsx)(Ee,{type:"text",value:k.name,onChange:e=>A({...k,name:e.target.value}),placeholder:"e.g., Size, Grade, Packaging"})]}),(0,b.jsx)(Ae,{children:(0,b.jsx)(Be,{children:(0,b.jsxs)(Se,{children:[(0,b.jsx)("input",{type:"checkbox",checked:k.is_required,onChange:e=>A({...k,is_required:e.target.checked})}),"Required Selection"]})})}),(0,b.jsxs)(Ae,{children:[(0,b.jsx)(we,{children:"Options"}),(0,b.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"12px"},children:[(0,b.jsx)(Ee,{type:"text",value:w.name,onChange:e=>E({...w,name:e.target.value}),placeholder:"Option name",style:{flex:2}}),(0,b.jsx)(Ee,{type:"number",value:w.price_adjustment,onChange:e=>E({...w,price_adjustment:parseFloat(e.target.value)||0}),placeholder:"Price adj.",step:"0.50",style:{flex:1}}),(0,b.jsx)(pe,{type:"button",variant:"secondary",onClick:()=>{if(!w.name.trim())return;const e=isNaN(w.price_adjustment)?0:w.price_adjustment,t=w.ingredient_id?B.find(e=>e.id===w.ingredient_id):null;A(i=>({...i,options:[...i.options,{name:w.name.trim(),price_adjustment:e,ingredient_id:w.ingredient_id||null,ingredient_quantity:w.ingredient_quantity||1,ingredient_name:(null===t||void 0===t?void 0:t.name)||null,ingredient_unit:(null===t||void 0===t?void 0:t.unit)||null}]})),E({name:"",price_adjustment:0,ingredient_id:null,ingredient_quantity:1})},disabled:!w.name.trim(),children:"Add"})]}),(0,b.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"12px"},children:[(0,b.jsxs)("select",{value:w.ingredient_id||"",onChange:e=>E({...w,ingredient_id:e.target.value?Number(e.target.value):null}),style:{flex:2,padding:"8px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"13px",color:w.ingredient_id?"#0A2540":"#9CA3AF"},children:[(0,b.jsx)("option",{value:"",children:"Linked ingredient (optional)"}),B.map(e=>(0,b.jsxs)("option",{value:e.id,children:[e.name," (",e.unit,")"]},e.id))]}),w.ingredient_id&&(0,b.jsx)(Ee,{type:"number",value:w.ingredient_quantity||1,onChange:e=>E({...w,ingredient_quantity:parseFloat(e.target.value)||1}),placeholder:"Qty",step:"0.01",min:"0.01",style:{flex:1}})]}),k.options.map((e,t)=>(0,b.jsxs)(ze,{children:[(0,b.jsxs)("div",{style:{flex:1},children:[(0,b.jsx)("strong",{children:e.name}),0!==e.price_adjustment&&(0,b.jsxs)("span",{style:{marginLeft:"8px",color:"#6B7280"},children:["(",Number(e.price_adjustment)>0?"+":"","RM ",(Number(e.price_adjustment)||0).toFixed(2),")"]}),e.ingredient_name&&(0,b.jsxs)("span",{style:{fontSize:"11px",color:"#6B7280",marginLeft:"8px"},children:["\u2192 ",e.ingredient_name," ",e.ingredient_quantity,e.ingredient_unit]})]}),(0,b.jsx)($e,{onClick:()=>{return e=t,void A(t=>({...t,options:t.options.filter((t,i)=>i!==e)}));var e},children:"x"})]},t))]}),(0,b.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,b.jsx)(pe,{type:"button",variant:"secondary",onClick:q,children:"Cancel"}),(0,b.jsx)(pe,{type:"button",onClick:async()=>{if(k.name.trim()&&0!==k.options.length)try{const e=(0,y.c4)(),t=f?`/api/brand-product-option-groups/${f.id}`:"/api/brand-product-option-groups",i=f?"PUT":"POST";(await fetch(t,{method:i,headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:k.name,is_required:k.is_required,options:k.options})})).ok&&(z(),q())}catch(e){console.error("Error saving option group:",e)}},disabled:!k.name.trim()||0===k.options.length,children:f?"Update":"Create"})]})]}),(0,b.jsxs)(u.aF,{isOpen:j,onClose:()=>v(!1),title:"Delete Option Group",children:[(0,b.jsx)("p",{children:"Are you sure you want to delete this option group? This action cannot be undone."}),(0,b.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,b.jsx)(pe,{type:"button",variant:"secondary",onClick:()=>v(!1),children:"Cancel"}),(0,b.jsx)(pe,{type:"button",variant:"danger",onClick:async()=>{if(C)try{const e=(0,y.c4)(),t=await fetch(`/api/brand-product-option-groups/${C}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(t.ok)z();else{const e=await t.json();alert(e.error||"Failed to delete option group")}}catch(e){console.error("Error deleting option group:",e)}finally{v(!1),F(null)}},children:"Delete"})]})]})]})},De=()=>{const{t:e}=(0,m.Bd)("brand"),{user:t}=(0,s.As)(),[i,d]=(0,a.M)("products"),[l,c]=(0,n.useState)(0),[p,u]=(0,n.useState)(0),[x,h]=(0,n.useState)(0),[g,j]=(0,n.useState)([]),[v,f]=(0,n.useState)(!0),[_,C]=(0,n.useState)(0),[F]=(0,n.useState)(0);(0,n.useEffect)(()=>{!t||"Brand General"!==t.role&&"Brand Manager"!==t.role?f(!1):k()},[t]);const k=async()=>{try{const e=(0,y.c4)(),t=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();j(e)}}catch(e){console.error("Error fetching brands:",e)}finally{f(!1)}};return v?(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)(r.mc,{children:[(0,b.jsx)(r.Y9,{children:(0,b.jsx)(r.hE,{children:e("brand:brandProductManagementPage.productManagement")})}),(0,b.jsx)(r.UC,{children:(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})}):(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)(r.mc,{children:[(0,b.jsx)(r.Y9,{children:(0,b.jsx)(r.hE,{children:e("brand:brandProductManagementPage.productManagement")})}),(0,b.jsxs)(r.UC,{children:[(0,b.jsxs)(o.tU,{children:[(0,b.jsxs)(o.oz,{active:"products"===i,onClick:()=>d("products"),children:["Products",(0,b.jsx)(o.Ex,{count:l,showZero:!0})]}),(0,b.jsxs)(o.oz,{active:"categories"===i,onClick:()=>d("categories"),children:["Categories",(0,b.jsx)(o.Ex,{count:p,showZero:!0})]}),(0,b.jsxs)(o.oz,{active:"options"===i,onClick:()=>d("options"),children:["Options",(0,b.jsx)(o.Ex,{count:x,showZero:!0})]})]}),(0,b.jsx)("div",{style:{display:"products"===i?"block":"none"},children:(0,b.jsx)(Y,{brands:g,onCountChange:c,categoryRefreshKey:_,optionRefreshKey:F})}),(0,b.jsx)("div",{style:{display:"categories"===i?"block":"none"},children:(0,b.jsx)(ce,{onCountChange:u,onCategoryChange:()=>C(e=>e+1)})}),(0,b.jsx)("div",{style:{display:"options"===i?"block":"none"},children:(0,b.jsx)(qe,{onCountChange:h})})]})]})})}}}]);