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
`,x=e=>{let{isOpen:t,title:i,message:r,onConfirm:x,onCancel:h,confirmText:g="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return t?n.createPortal((0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(d,{children:[(0,a.jsx)(l,{children:i}),(0,a.jsx)(c,{children:r})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(u,{variant:"secondary",onClick:h,children:m}),(0,a.jsx)(u,{variant:"primary",type:y,onClick:x,children:g})]})]})}),document.body):null}},9134:(e,t,i)=>{i.r(t),i.d(t,{default:()=>qe});var n=i(9950),r=i(8409),o=i(2597),a=i(2653),s=i(1367),d=i(4752),l=i(2853),c=i(3705),p=i(2488),u=i(9610),x=i(4877),h=i(7617),g=i(9194),m=i(5030),y=i(4414);const b=d.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,j=d.Ay.div`
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
`,v=d.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`,f=d.Ay.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${e=>e.src?`url(${e.src}) center/cover`:"#F3F4F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 28px;
`,_=d.Ay.div`
  flex: 1;
  min-width: 0;
`,C=d.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,F=d.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,k=d.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,A=d.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,w=d.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,E=d.Ay.span`
  color: #6B7280;
`,B=d.Ay.span`
  color: #0A2540;
  font-weight: 500;
`,S=d.Ay.span`
  color: #059669;
  font-weight: 600;
  font-size: 16px;
`,z=d.Ay.div`
  flex: 1;
  min-height: 12px;
`,$=d.Ay.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,q=d.Ay.button`
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
`,D=d.Ay.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,R=d.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 20px 0;
`,P=d.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`,I=d.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: ${e=>e.color||"#E5E7EB"};
  color: #374151;
  border-radius: 4px;
  font-size: 11px;
`,T=(0,d.Ay)(I)`
  background: #DBEAFE;
  color: #1E40AF;
`,M=(0,d.Ay)(I)`
  background: #E5E7EB;
  color: #374151;
`,L=d.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #667eea;
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 6px;
`,O=d.Ay.div`
  font-size: 11px;
  color: #667eea;
  margin-top: 4px;
  line-height: 1.4;
`,N=d.Ay.button`
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
`,U=d.Ay.button`
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
`,G=d.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
`,Q=d.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`,W=d.Ay.label`
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
`,Z=e=>{let{brands:t,onCountChange:i,categoryRefreshKey:r,optionRefreshKey:o}=e;const{t:a}=(0,m.Bd)("brand"),[s,d]=(0,n.useState)([]),[I,Z]=(0,n.useState)([]),[Y,H]=(0,n.useState)([]),[J,K]=(0,n.useState)([]),[V,X]=(0,n.useState)(!0),[ee,te]=(0,n.useState)(""),[ie,ne]=(0,n.useState)("all"),[re,oe]=(0,n.useState)("all"),[ae,se]=(0,n.useState)(!1),[de,le]=(0,n.useState)(null),[ce,pe]=(0,n.useState)(!1),[ue,xe]=(0,n.useState)(null),[he,ge]=(0,n.useState)({name:"",description:"",sku:"",unit:"",base_quantity:"1",unit_price:"",min_order_quantity:"1",category_id:"",image_url:"",emoji:"",is_active:!0,is_set_menu:!1,set_items:[],set_display_order:"0",product_recipe_id:null,brand_ids:[],option_group_ids:[]}),[me,ye]=(0,n.useState)(""),[be,je]=(0,n.useState)(null),[ve,fe]=(0,n.useState)(!1),[_e,Ce]=(0,n.useState)([]),[Fe,ke]=(0,n.useState)([]),Ae=(0,n.useCallback)(()=>localStorage.getItem("auth_token"),[]),we=(0,n.useCallback)(async()=>{try{const e=Ae(),t=await fetch("/api/brand-products",{headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success&&(d(n.data),i(n.data.length))}catch(e){console.error("Failed to fetch products:",e)}},[Ae,i]),Ee=(0,n.useCallback)(async()=>{try{const e=Ae(),t=await fetch("/api/brand-product-categories",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&Z(i.data)}catch(e){console.error("Failed to fetch categories:",e)}},[Ae]),Be=(0,n.useCallback)(async()=>{try{const e=Ae(),t=await fetch("/api/brand-product-option-groups",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&H(i.data)}catch(e){console.error("Failed to fetch option groups:",e)}},[Ae]),Se=(0,n.useCallback)(async()=>{try{const e=Ae(),t=await fetch("/api/product-recipes",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&K(i.data||[])}catch(e){console.error("Failed to fetch product recipes:",e)}},[Ae]);(0,n.useEffect)(()=>{(async()=>{X(!0),await Promise.all([we(),Ee(),Be(),Se()]);try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/product-ingredients",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();ke((e.data||e||[]).map(e=>({id:e.id,name:e.name,unit:e.unit,unit_cost:Number(e.unit_cost||0)})))}}catch(e){console.error("Failed to fetch product ingredients:",e)}X(!1)})()},[we,Ee,Be,Se]),(0,n.useEffect)(()=>{void 0!==r&&Ee()},[r,Ee]),(0,n.useEffect)(()=>{void 0!==o&&Be()},[o,Be]);const ze=e=>{var t,i,n,r,o,a,s;if(e)if(le(e),ge({name:e.name,description:e.description||"",sku:e.sku||"",unit:e.unit||"",base_quantity:(e.base_quantity||1).toString(),unit_price:e.unit_price.toString(),min_order_quantity:e.min_order_quantity.toString(),category_id:(null===(t=e.category_id)||void 0===t?void 0:t.toString())||"",image_url:e.image_url||"",emoji:e.emoji||"",is_active:e.is_active,is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[],set_display_order:(e.set_display_order||0).toString(),product_recipe_id:e.product_recipe_id&&null!==(i=e.productRecipe)&&void 0!==i&&null!==(n=i.name)&&void 0!==n&&n.endsWith("(auto)")?null:e.product_recipe_id||null,brand_ids:(null===(r=e.brands)||void 0===r?void 0:r.map(e=>e.id))||[],option_group_ids:(null===(o=e.optionGroups)||void 0===o?void 0:o.map(e=>e.id))||[]}),e.product_recipe_id&&null!==(a=e.productRecipe)&&void 0!==a&&null!==(s=a.name)&&void 0!==s&&s.endsWith("(auto)")){const t=localStorage.getItem("auth_token");fetch(`/api/product-recipes/${e.product_recipe_id}`,{headers:{Authorization:`Bearer ${t}`}}).then(e=>e.json()).then(e=>{const t=e.data||e,i=(null===t||void 0===t?void 0:t.recipeIngredients)||(null===t||void 0===t?void 0:t.ProductRecipeIngredients)||[];Ce(i.map(e=>{var t,i,n;return{ingredient_id:e.ingredient_id,name:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"",quantity:parseFloat(e.quantity),unit:e.unit||(null===(i=e.ingredient)||void 0===i?void 0:i.unit)||"",unit_cost:parseFloat((null===(n=e.ingredient)||void 0===n?void 0:n.unit_cost)||0)}}))}).catch(()=>Ce([]))}else Ce([]);else le(null),ge({name:"",description:"",sku:"",unit:"",base_quantity:"1",unit_price:"",min_order_quantity:"1",category_id:I.length>0?I[0].id.toString():"",image_url:"",emoji:"",is_active:!0,is_set_menu:!1,set_items:[],set_display_order:"0",product_recipe_id:null,brand_ids:[],option_group_ids:[]}),Ce([]);ye(""),se(!0)},$e=()=>{se(!1),le(null),je(null)},qe=(e,t)=>{ge(i=>({...i,set_items:i.set_items.map(i=>{if(i.productId===e){const e=Math.max(1,i.quantity+t);return{...i,quantity:e}}return i})}))},De=s.filter(e=>{var t,i;const n=e.name.toLowerCase().includes(ee.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(ee.toLowerCase()),r="all"===ie||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===ie,o="all"===re||(null===(i=e.brands)||void 0===i?void 0:i.some(e=>e.id.toString()===re));return n&&r&&o});return V?(0,y.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading products..."}):(0,y.jsxs)("div",{children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,y.jsxs)(p.Qn,{style:{marginBottom:0},children:[(0,y.jsx)(p.DO,{type:"text",placeholder:"Search products...",value:ee,onChange:e=>te(e.target.value)}),(0,y.jsxs)(p.Jt,{value:ie,onChange:e=>ne(e.target.value),children:[(0,y.jsx)("option",{value:"all",children:"All Categories"}),I.map(e=>(0,y.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]}),(0,y.jsxs)(p.Jt,{value:re,onChange:e=>oe(e.target.value),children:[(0,y.jsx)("option",{value:"all",children:"All Brands"}),t.map(e=>(0,y.jsx)("option",{value:e.id.toString(),children:e.name},e.id))]})]}),(0,y.jsx)(c.cc,{onClick:()=>ze(),style:{flexShrink:0},children:"Add Product"})]}),0===De.length?(0,y.jsxs)(l.pp,{children:[(0,y.jsx)(D,{children:ee||"all"!==ie||"all"!==re?"No products found":"No products yet"}),(0,y.jsx)(R,{children:ee||"all"!==ie||"all"!==re?"Try adjusting your search or filter criteria.":"Start by adding your first product."}),!ee&&"all"===ie&&"all"===re&&(0,y.jsx)(c.cc,{onClick:()=>ze(),children:"Add Product"})]}):(0,y.jsx)(b,{children:De.map(e=>(0,y.jsxs)(j,{isActive:e.is_active,onClick:()=>ze(e),children:[(0,y.jsxs)(v,{children:[(0,y.jsx)(f,{src:e.image_url,children:!e.image_url&&(e.emoji||"\ud83d\udce6")}),(0,y.jsxs)(_,{children:[(0,y.jsxs)(C,{children:[e.name,e.is_set_menu&&(0,y.jsx)(L,{children:"SET"})]}),e.sku&&(0,y.jsxs)(F,{children:["SKU: ",e.sku]}),e.category&&(0,y.jsxs)(k,{children:[e.category.emoji," ",e.category.name]}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,y.jsxs)(O,{children:["Set: ",e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")]})]})]}),(0,y.jsxs)(A,{children:[(0,y.jsxs)(w,{children:[(0,y.jsx)(E,{children:"Unit Price"}),(0,y.jsxs)(S,{children:["RM ",(Number(e.unit_price)||0).toFixed(2)]})]}),e.unit&&(0,y.jsxs)(w,{children:[(0,y.jsx)(E,{children:"Unit"}),(0,y.jsx)(B,{children:e.unit})]}),(0,y.jsxs)(w,{children:[(0,y.jsx)(E,{children:"Min Order"}),(0,y.jsx)(B,{children:e.min_order_quantity})]})]}),e.brands&&e.brands.length>0&&(0,y.jsx)(P,{children:e.brands.map(e=>(0,y.jsx)(T,{children:e.name},e.id))}),e.optionGroups&&e.optionGroups.length>0&&(0,y.jsx)(P,{children:e.optionGroups.map(e=>(0,y.jsx)(M,{children:e.name},e.id))}),(0,y.jsx)(z,{}),(0,y.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,y.jsx)(q,{onClick:()=>ze(e),children:"Edit"}),(0,y.jsx)(N,{onClick:t=>(async(e,t)=>{t.stopPropagation();try{const t=Ae(),i=await fetch(`/api/brand-products/${e.id}/copy`,{method:"POST",headers:{Authorization:`Bearer ${t}`}}),n=await i.json();n.success?we():alert(n.error||n.message||"Failed to copy product")}catch(i){console.error("Failed to copy product:",i)}})(e,t),children:"Copy"}),(0,y.jsx)(U,{isActive:e.is_active,onClick:t=>(async(e,t)=>{t.stopPropagation();try{const t=Ae(),i=await fetch(`/api/brand-products/${e.id}/toggle-active`,{method:"PUT",headers:{Authorization:`Bearer ${t}`}});(await i.json()).success&&we()}catch(i){console.error("Failed to toggle product:",i)}})(e,t),children:e.is_active?"Active":"Inactive"}),(0,y.jsx)(q,{variant:"danger",onClick:t=>((e,t)=>{t.stopPropagation(),xe(e),pe(!0)})(e,t),children:"Delete"})]})]},e.id))}),ae&&(0,y.jsx)(u.aF,{isOpen:ae,onClose:$e,title:de?"Edit Product":"Add Product",maxWidth:"700px",children:(0,y.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),!ve)if(je(null),he.name.trim())if(he.unit){fe(!0);try{const e=Ae(),t=de?"PUT":"POST",i=de?`/api/brand-products/${de.id}`:"/api/brand-products",n=await fetch(i,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:he.name.trim(),description:he.description.trim()||null,sku:he.sku.trim()||null,unit:he.unit||null,base_quantity:parseFloat(he.base_quantity)||1,unit_price:parseFloat(he.unit_price)||0,min_order_quantity:parseInt(he.min_order_quantity)||1,category_id:he.category_id?parseInt(he.category_id):null,image_url:he.image_url||null,emoji:he.emoji||null,is_active:he.is_active,is_set_menu:he.is_set_menu,set_items:he.is_set_menu?he.set_items:null,set_display_order:parseInt(he.set_display_order)||0,product_recipe_id:he.product_recipe_id,brand_ids:he.brand_ids,option_group_ids:he.option_group_ids,directIngredients:he.product_recipe_id?void 0:_e})}),r=await n.json();r.success?($e(),we()):je(r.error||"Failed to save product")}catch(t){console.error("Failed to save product:",t),je("Failed to save product. Please try again.")}finally{fe(!1)}}else je("Unit is required");else je("Product name is required")},children:[(0,y.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Name *"}),(0,y.jsx)(u.ZQ,{type:"text",value:he.name,onChange:e=>ge({...he,name:e.target.value}),placeholder:"Product name",required:!0})]}),(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"SKU"}),(0,y.jsx)(u.ZQ,{type:"text",value:he.sku,onChange:e=>ge({...he,sku:e.target.value}),placeholder:"Product code"})]})]}),(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Category"}),(0,y.jsxs)(u.FX,{value:he.category_id,onChange:e=>ge({...he,category_id:e.target.value}),children:[(0,y.jsx)("option",{value:"",children:"No category"}),I.map(e=>(0,y.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]})]}),(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Description"}),(0,y.jsx)(u.Lz,{value:he.description,onChange:e=>ge({...he,description:e.target.value}),placeholder:"Product description",rows:2})]}),(0,y.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Unit Price (RM) *"}),(0,y.jsx)(u.ZQ,{type:"number",step:"0.01",min:"0",value:he.unit_price,onChange:e=>ge({...he,unit_price:e.target.value}),placeholder:"0.00",required:!0})]}),(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Base Qty *"}),(0,y.jsx)(u.ZQ,{type:"number",step:"0.01",min:"0.01",value:he.base_quantity,onChange:e=>ge({...he,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Unit *"}),(0,y.jsxs)(u.FX,{value:he.unit,onChange:e=>ge({...he,unit:e.target.value}),required:!0,children:[(0,y.jsx)("option",{value:"",children:"Select unit"}),[{value:"kg",label:"kg"},{value:"g",label:"g"},{value:"L",label:"L"},{value:"ml",label:"ml"},{value:"piece",label:"piece"},{value:"pack",label:"pack"},{value:"can",label:"can"},{value:"bottle",label:"bottle"}].map(e=>(0,y.jsx)("option",{value:e.value,children:e.label},e.value))]})]}),(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Min Order Qty"}),(0,y.jsx)(u.ZQ,{type:"number",min:"1",value:he.min_order_quantity,onChange:e=>ge({...he,min_order_quantity:e.target.value})})]})]}),(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Product Image"}),(0,y.jsx)(x.A,{value:he.image_url,onChange:e=>ge({...he,image_url:e||""}),label:"",helpText:"Upload a product image (max 2MB)"})]}),(0,y.jsx)(u.gE,{children:(0,y.jsxs)(G,{children:[(0,y.jsx)("input",{type:"checkbox",checked:he.is_set_menu,onChange:e=>ge({...he,is_set_menu:e.target.checked,set_items:e.target.checked?he.set_items:[]})}),"Set Menu (bundle multiple products)"]})}),he.is_set_menu&&(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Set Items *"}),he.set_items.length>0&&(0,y.jsx)("div",{style:{marginBottom:"12px"},children:he.set_items.map(e=>(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 12px",background:"#F9FAFB",borderRadius:"6px",marginBottom:"4px"},children:[(0,y.jsx)("span",{style:{flex:1,fontSize:"14px"},children:e.name}),(0,y.jsx)("button",{type:"button",onClick:()=>qe(e.productId,-1),style:{width:"28px",height:"28px",border:"1px solid #D1D5DB",borderRadius:"4px",background:"white",cursor:"pointer"},children:"-"}),(0,y.jsx)("span",{style:{minWidth:"24px",textAlign:"center",fontWeight:600},children:e.quantity}),(0,y.jsx)("button",{type:"button",onClick:()=>qe(e.productId,1),style:{width:"28px",height:"28px",border:"1px solid #D1D5DB",borderRadius:"4px",background:"white",cursor:"pointer"},children:"+"}),(0,y.jsx)("button",{type:"button",onClick:()=>{return t=e.productId,void ge(e=>({...e,set_items:e.set_items.filter(e=>e.productId!==t)}));var t},style:{color:"#DC2626",background:"none",border:"none",cursor:"pointer",fontSize:"16px"},children:"x"})]},e.productId))}),(0,y.jsx)(u.ZQ,{type:"text",placeholder:"Search products to add...",value:me,onChange:e=>ye(e.target.value),style:{marginBottom:"8px"}}),(0,y.jsx)("div",{style:{maxHeight:"200px",overflowY:"auto",background:"#F9FAFB",borderRadius:"8px",padding:"8px"},children:s.filter(e=>!e.is_set_menu&&(!de||e.id!==de.id)).filter(e=>!me||e.name.toLowerCase().includes(me.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(me.toLowerCase())).map(e=>(0,y.jsxs)("div",{onClick:()=>(e=>{const t=s.find(t=>t.id===e);if(!t||t.is_set_menu)return;const i=he.set_items.find(t=>t.productId===e);ge(i?t=>({...t,set_items:t.set_items.map(t=>t.productId===e?{...t,quantity:t.quantity+1}:t)}):i=>({...i,set_items:[...i.set_items,{productId:e,name:t.name,quantity:1}]}))})(e.id),style:{padding:"8px 12px",cursor:"pointer",borderRadius:"6px",marginBottom:"2px",background:he.set_items.some(t=>t.productId===e.id)?"#EEF2FF":"white",border:"1px solid #E5E7EB",fontSize:"13px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,y.jsxs)("span",{children:[e.emoji||"\ud83d\udce6"," ",e.sku?`${e.sku} `:"",e.name]}),(0,y.jsxs)("span",{style:{color:"#6B7280"},children:["RM ",(Number(e.unit_price)||0).toFixed(2)]})]},e.id))})]}),(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Linked Brands"}),(0,y.jsx)(Q,{children:t.map(e=>(0,y.jsxs)(W,{children:[(0,y.jsx)("input",{type:"checkbox",checked:he.brand_ids.includes(e.id),onChange:()=>{return t=e.id,void ge(e=>({...e,brand_ids:e.brand_ids.includes(t)?e.brand_ids.filter(e=>e!==t):[...e.brand_ids,t]}));var t}}),(0,y.jsx)("span",{children:e.name})]},e.id))})]}),(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Option Groups"}),Y.length>0?(0,y.jsx)(Q,{children:Y.map(e=>(0,y.jsxs)(W,{children:[(0,y.jsx)("input",{type:"checkbox",checked:he.option_group_ids.includes(e.id),onChange:()=>{return t=e.id,void ge(e=>({...e,option_group_ids:e.option_group_ids.includes(t)?e.option_group_ids.filter(e=>e!==t):[...e.option_group_ids,t]}));var t}}),(0,y.jsxs)("span",{children:[e.name," ",e.is_required?"(Required)":""]})]},e.id))}):(0,y.jsx)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px",color:"#6B7280",fontSize:"13px"},children:"No option groups available. Create option groups in the Options tab first."})]}),0===_e.length&&(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Linked Product Recipe"}),(0,y.jsx)(g.A,{options:J.filter(e=>{var t;return!(null!==(t=e.name)&&void 0!==t&&t.endsWith("(auto)"))}).map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:he.product_recipe_id,onChange:e=>ge({...he,product_recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No product recipes found"})]}),!he.product_recipe_id&&(0,y.jsxs)(u.gE,{children:[(0,y.jsxs)(u.lR,{children:["Ingredients (direct) ",_e.length>0&&(0,y.jsxs)("span",{style:{fontSize:"11px",color:"#6B7280",fontWeight:400},children:["Cost: RM ",_e.reduce((e,t)=>e+t.unit_cost*t.quantity,0).toFixed(2)]})]}),_e.map((e,t)=>(0,y.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",marginBottom:"6px",fontSize:"13px",background:"#F9FAFB",padding:"8px 12px",borderRadius:"6px"},children:[(0,y.jsx)("span",{style:{flex:1},children:e.name}),(0,y.jsx)("input",{type:"number",value:e.quantity,min:"0.01",step:"0.01",style:{width:"60px",textAlign:"center",border:"1px solid #E6EBF1",borderRadius:"4px",padding:"2px 4px",fontSize:"13px"},onChange:e=>Ce(i=>i.map((i,n)=>n===t?{...i,quantity:parseFloat(e.target.value)||0}:i))}),(0,y.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",width:"30px"},children:e.unit}),(0,y.jsxs)("span",{style:{width:"70px",textAlign:"right",color:"#6B7280",fontSize:"12px"},children:["RM ",(e.unit_cost*e.quantity).toFixed(2)]}),(0,y.jsx)("button",{type:"button",onClick:()=>Ce(e=>e.filter((e,i)=>i!==t)),style:{background:"none",border:"none",color:"#EF4444",cursor:"pointer",fontSize:"16px",padding:"0 4px"},children:"x"})]},t)),(0,y.jsx)(g.A,{options:Fe.filter(e=>!_e.some(t=>t.ingredient_id===e.id)).map(e=>({value:e.id,label:e.name,subLabel:`${e.unit} / RM ${Number(e.unit_cost||0).toFixed(2)}`})),value:null,onChange:e=>{if(e){const t=Fe.find(t=>t.id===e);t&&Ce(e=>[...e,{ingredient_id:t.id,name:t.name,quantity:1,unit:t.unit,unit_cost:Number(t.unit_cost||0)}])}},placeholder:"+ Add ingredient...",allowClear:!1,noOptionsMessage:"No ingredients available"})]}),(0,y.jsx)(u.gE,{style:{marginBottom:0},children:(0,y.jsxs)(G,{children:[(0,y.jsx)("input",{type:"checkbox",checked:he.is_active,onChange:e=>ge({...he,is_active:e.target.checked})}),"Active"]})}),(0,y.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,y.jsx)(u.yl,{type:"button",onClick:$e,disabled:ve,children:"Cancel"}),(0,y.jsx)(u.yl,{type:"submit",variant:"primary",disabled:ve,children:ve?"Saving...":de?"Update":"Create"})]}),be&&(0,y.jsx)("div",{style:{marginTop:"16px",padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:be})]})}),(0,y.jsx)(h.A,{isOpen:ce,onCancel:()=>{pe(!1),xe(null)},onConfirm:async()=>{if(ue)try{const e=Ae(),t=await fetch(`/api/brand-products/${ue.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success?(pe(!1),xe(null),we()):alert(i.error||"Failed to delete product")}catch(e){console.error("Failed to delete product:",e),alert("Failed to delete product")}},title:"Delete Product",message:`Are you sure you want to delete "${null===ue||void 0===ue?void 0:ue.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},Y=d.Ay.div`
  margin-top: 24px;
`,H=d.Ay.div`
  display: grid;
  gap: 12px;
`,J=d.Ay.div`
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
`,K=d.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,V=d.Ay.div`
  flex: 1;
`,X=d.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,ee=d.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,te=d.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,ie=d.Ay.div`
  display: flex;
  gap: 8px;
`,ne=d.Ay.button`
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
`,re=d.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,oe=d.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,ae=d.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,se=d.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,de=d.Ay.button`
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
`,le=e=>{let{onCountChange:t,onCategoryChange:i}=e;const{t:o}=(0,m.Bd)("brand"),[a,s]=(0,n.useState)([]),[d,p]=(0,n.useState)(!0),[x,g]=(0,n.useState)(!1),[b,j]=(0,n.useState)(null),[v,f]=(0,n.useState)(!1),[_,C]=(0,n.useState)(null),[F,k]=(0,n.useState)({name:"",emoji:"",description:""}),A=(0,n.useCallback)(()=>localStorage.getItem("auth_token"),[]),w=(0,n.useCallback)(async()=>{try{const e=A(),i=await fetch("/api/brand-product-categories",{headers:{Authorization:`Bearer ${e}`}}),n=await i.json();n.success&&(s(n.data),t(n.data.length))}catch(e){console.error("Failed to fetch categories:",e)}finally{p(!1)}},[A,t]);(0,n.useEffect)(()=>{p(!0),w()},[w]);const E=e=>{e?(j(e),k({name:e.name,emoji:e.emoji||"",description:e.description||""})):(j(null),k({name:"",emoji:"",description:""})),g(!0)},B=()=>{g(!1),j(null),k({name:"",emoji:"",description:""})},S=async(e,t)=>{try{const i=A(),n=await fetch(`/api/brand-product-categories/${e}/reorder`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({direction:t})}),r=await n.json();r.success?w():alert(r.error||"Failed to reorder")}catch(i){console.error("Failed to reorder category:",i)}};return d?(0,y.jsx)(Y,{children:(0,y.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading categories..."})}):(0,y.jsxs)(Y,{children:[(0,y.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"16px"},children:(0,y.jsx)(c.cc,{onClick:()=>E(),children:"Add Category"})}),0===a.length?(0,y.jsxs)(l.pp,{children:[(0,y.jsx)(re,{children:"No categories yet"}),(0,y.jsx)(oe,{children:"Create your first product category to organize your products."}),(0,y.jsx)(c.cc,{onClick:()=>E(),children:"Add Category"})]}):(0,y.jsx)(H,{children:a.map((e,t)=>(0,y.jsxs)(J,{isActive:e.is_active,children:[(0,y.jsx)(r.Xd,{onMoveUp:()=>S(e.id,"up"),onMoveDown:()=>S(e.id,"down"),disableUp:0===t,disableDown:t===a.length-1}),(0,y.jsx)(K,{children:e.emoji||"\ud83d\udce6"}),(0,y.jsxs)(V,{children:[(0,y.jsx)(X,{children:e.name}),(0,y.jsxs)(ee,{children:[(0,y.jsxs)("span",{children:[e.product_count||0," products"]}),(0,y.jsx)(ae,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,y.jsx)(te,{children:e.description})]}),(0,y.jsxs)(ie,{children:[(0,y.jsx)(ne,{onClick:()=>E(e),title:"Edit",children:(0,y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,y.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"}),(0,y.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,y.jsx)(ne,{onClick:()=>(e=>{C(e),f(!0)})(e),title:"Delete",children:(0,y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,y.jsx)("path",{d:"M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"}),(0,y.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),(0,y.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17"})]})})]})]},e.id))}),x&&(0,y.jsx)(u.aF,{isOpen:x,onClose:B,title:b?"Edit Category":"Add Category",children:(0,y.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),F.name.trim())try{const e=A(),t=b?"PUT":"POST",n=b?`/api/brand-product-categories/${b.id}`:"/api/brand-product-categories",r=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:F.name.trim(),emoji:F.emoji||null,description:F.description.trim()||null})}),o=await r.json();o.success?(B(),w(),null===i||void 0===i||i()):alert(o.error||"Failed to save")}catch(t){console.error("Failed to save category:",t),alert("Failed to save")}},children:[(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Name *"}),(0,y.jsx)(u.ZQ,{type:"text",value:F.name,onChange:e=>k({...F,name:e.target.value}),placeholder:"Category name",required:!0})]}),(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Emoji"}),(0,y.jsx)(se,{children:["\ud83d\udce6","\ud83e\udd6b","\ud83e\uddc2","\ud83c\udf3e","\ud83e\udd5b","\ud83e\uddc8","\ud83e\udd5a","\ud83c\udf56","\ud83e\udd69","\ud83c\udf57","\ud83d\udc1f","\ud83e\udd90","\ud83e\udd91","\ud83e\udd6c","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83c\udf36\ufe0f","\ud83c\udf4b","\ud83c\udf4a","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd65","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf6f","\ud83e\uded2","\ud83e\uddca","\ud83c\udf76","\ud83e\uded9","\ud83e\uddf4","\ud83e\uddc3","\ud83c\udf75","\u2615","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd64","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf6b","\ud83c\udf6c","\ud83c\udf6d","\ud83e\uddc7","\ud83e\udd50","\ud83c\udf5e"].map(e=>(0,y.jsx)(de,{type:"button",selected:F.emoji===e,onClick:()=>k({...F,emoji:e}),children:e},e))})]}),(0,y.jsxs)(u.gE,{children:[(0,y.jsx)(u.lR,{children:"Description"}),(0,y.jsx)(u.Lz,{value:F.description,onChange:e=>k({...F,description:e.target.value}),placeholder:"Category description (optional)",rows:3})]}),(0,y.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,y.jsx)(u.yl,{type:"button",onClick:B,children:"Cancel"}),(0,y.jsx)(u.yl,{type:"submit",variant:"primary",children:b?"Update":"Create"})]})]})}),(0,y.jsx)(h.A,{isOpen:v,onCancel:()=>{f(!1),C(null)},onConfirm:async()=>{if(_)try{const e=A(),t=await fetch(`/api/brand-product-categories/${_.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success?(f(!1),C(null),w(),null===i||void 0===i||i()):alert(n.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:`Are you sure you want to delete "${null===_||void 0===_?void 0:_.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},ce=d.Ay.button`
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
`,pe=d.Ay.div`
  display: grid;
  gap: 16px;
`,ue=d.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,xe=d.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,he=d.Ay.div`
  flex: 1;
`,ge=d.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,me=d.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,ye=d.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>"required"===e.type?"\n    background: #FEE2E2;\n    color: #DC2626;\n  ":"\n    background: #E0F2FE;\n    color: #0369A1;\n  "}
`,be=d.Ay.div`
  display: flex;
  gap: 8px;
`,je=d.Ay.button`
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
`,ve=d.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,fe=d.Ay.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`,_e=d.Ay.span`
  margin-left: 6px;
  color: #6B7280;
  font-size: 12px;
`,Ce=d.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Fe=d.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,ke=d.Ay.div`
  margin-bottom: 20px;
`,Ae=d.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,we=d.Ay.input`
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
`,Ee=d.Ay.div`
  display: flex;
  gap: 16px;
`,Be=d.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
`,Se=d.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,ze=d.Ay.button`
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
`,$e=e=>{let{onCountChange:t}=e;const{t:i}=(0,m.Bd)("brand"),[r,o]=(0,n.useState)([]),[a,s]=(0,n.useState)(!0),[d,x]=(0,n.useState)(""),[h,g]=(0,n.useState)(!1),[b,j]=(0,n.useState)(!1),[v,f]=(0,n.useState)(null),[_,C]=(0,n.useState)(null),[F,k]=(0,n.useState)({name:"",is_required:!1,options:[]}),[A,w]=(0,n.useState)({name:"",price_adjustment:0,ingredient_id:null,ingredient_quantity:1}),[E,B]=(0,n.useState)([]),S=(0,n.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch("/api/brand-product-option-groups",{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&(o(e.data),t(e.data.length))}}catch(e){console.error("Error fetching option groups:",e)}finally{s(!1)}},[t]);(0,n.useEffect)(()=>{S();const e=localStorage.getItem("auth_token");fetch("/api/product-ingredients",{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()).then(e=>B((e.data||e||[]).map(e=>({id:e.id,name:e.name,unit:e.unit,unit_cost:Number(e.unit_cost||0)})))).catch(()=>{})},[S]);const z=e=>{e?(f(e),k({name:e.name,is_required:e.is_required,options:e.options.map(e=>({...e}))})):(f(null),k({name:"",is_required:!1,options:[]})),g(!0)},$=()=>{g(!1),f(null),k({name:"",is_required:!1,options:[]}),w({name:"",price_adjustment:0})},q=r.filter(e=>e.name.toLowerCase().includes(d.toLowerCase()));return a?(0,y.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7280"},children:"Loading..."}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,y.jsx)(p.Qn,{style:{marginBottom:0},children:(0,y.jsx)(p.DO,{type:"text",placeholder:"Search option groups...",value:d,onChange:e=>x(e.target.value)})}),(0,y.jsx)(c.cc,{onClick:()=>z(),style:{flexShrink:0},children:"Add Option Group"})]}),0===q.length?(0,y.jsxs)(l.pp,{children:[(0,y.jsx)(Ce,{children:"No option groups yet"}),(0,y.jsx)(Fe,{children:"Create option groups to add customizable options to your products"}),(0,y.jsx)(ce,{onClick:()=>z(),children:"Add Option Group"})]}):(0,y.jsx)(pe,{children:q.map(e=>(0,y.jsxs)(ue,{children:[(0,y.jsxs)(xe,{children:[(0,y.jsxs)(he,{children:[(0,y.jsx)(ge,{children:e.name}),(0,y.jsxs)(me,{children:[(0,y.jsx)(ye,{type:e.is_required?"required":"optional",children:e.is_required?"Required":"Optional"}),(0,y.jsxs)("span",{style:{fontSize:"13px",color:"#6B7280"},children:[e.options.length," options"]})]})]}),(0,y.jsxs)(be,{children:[(0,y.jsx)(je,{onClick:()=>z(e),children:(0,y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,y.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,y.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,y.jsx)(je,{onClick:()=>{return t=e.id,C(t),void j(!0);var t},children:(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,y.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,y.jsx)(ve,{children:e.options.map((e,t)=>(0,y.jsxs)(fe,{children:[e.name,0!==e.price_adjustment&&(0,y.jsxs)(_e,{children:[Number(e.price_adjustment)>0?"+":"","RM ",(Number(e.price_adjustment)||0).toFixed(2)]})]},t))})]},e.id))}),(0,y.jsxs)(u.aF,{isOpen:h,onClose:$,title:v?"Edit Option Group":"New Option Group",children:[(0,y.jsxs)(ke,{children:[(0,y.jsx)(Ae,{children:"Group Name"}),(0,y.jsx)(we,{type:"text",value:F.name,onChange:e=>k({...F,name:e.target.value}),placeholder:"e.g., Size, Grade, Packaging"})]}),(0,y.jsx)(ke,{children:(0,y.jsx)(Ee,{children:(0,y.jsxs)(Be,{children:[(0,y.jsx)("input",{type:"checkbox",checked:F.is_required,onChange:e=>k({...F,is_required:e.target.checked})}),"Required Selection"]})})}),(0,y.jsxs)(ke,{children:[(0,y.jsx)(Ae,{children:"Options"}),(0,y.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"12px"},children:[(0,y.jsx)(we,{type:"text",value:A.name,onChange:e=>w({...A,name:e.target.value}),placeholder:"Option name",style:{flex:2}}),(0,y.jsx)(we,{type:"number",value:A.price_adjustment,onChange:e=>w({...A,price_adjustment:parseFloat(e.target.value)||0}),placeholder:"Price adj.",step:"0.50",style:{flex:1}}),(0,y.jsx)(ce,{type:"button",variant:"secondary",onClick:()=>{if(!A.name.trim())return;const e=isNaN(A.price_adjustment)?0:A.price_adjustment,t=A.ingredient_id?E.find(e=>e.id===A.ingredient_id):null;k(i=>({...i,options:[...i.options,{name:A.name.trim(),price_adjustment:e,ingredient_id:A.ingredient_id||null,ingredient_quantity:A.ingredient_quantity||1,ingredient_name:(null===t||void 0===t?void 0:t.name)||null,ingredient_unit:(null===t||void 0===t?void 0:t.unit)||null}]})),w({name:"",price_adjustment:0,ingredient_id:null,ingredient_quantity:1})},disabled:!A.name.trim(),children:"Add"})]}),(0,y.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"12px"},children:[(0,y.jsxs)("select",{value:A.ingredient_id||"",onChange:e=>w({...A,ingredient_id:e.target.value?Number(e.target.value):null}),style:{flex:2,padding:"8px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"13px",color:A.ingredient_id?"#0A2540":"#9CA3AF"},children:[(0,y.jsx)("option",{value:"",children:"Linked ingredient (optional)"}),E.map(e=>(0,y.jsxs)("option",{value:e.id,children:[e.name," (",e.unit,")"]},e.id))]}),A.ingredient_id&&(0,y.jsx)(we,{type:"number",value:A.ingredient_quantity||1,onChange:e=>w({...A,ingredient_quantity:parseFloat(e.target.value)||1}),placeholder:"Qty",step:"0.01",min:"0.01",style:{flex:1}})]}),F.options.map((e,t)=>(0,y.jsxs)(Se,{children:[(0,y.jsxs)("div",{style:{flex:1},children:[(0,y.jsx)("strong",{children:e.name}),0!==e.price_adjustment&&(0,y.jsxs)("span",{style:{marginLeft:"8px",color:"#6B7280"},children:["(",Number(e.price_adjustment)>0?"+":"","RM ",(Number(e.price_adjustment)||0).toFixed(2),")"]}),e.ingredient_name&&(0,y.jsxs)("span",{style:{fontSize:"11px",color:"#6B7280",marginLeft:"8px"},children:["\u2192 ",e.ingredient_name," ",e.ingredient_quantity,e.ingredient_unit]})]}),(0,y.jsx)(ze,{onClick:()=>{return e=t,void k(t=>({...t,options:t.options.filter((t,i)=>i!==e)}));var e},children:"x"})]},t))]}),(0,y.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,y.jsx)(ce,{type:"button",variant:"secondary",onClick:$,children:"Cancel"}),(0,y.jsx)(ce,{type:"button",onClick:async()=>{if(F.name.trim()&&0!==F.options.length)try{const e=localStorage.getItem("auth_token"),t=v?`/api/brand-product-option-groups/${v.id}`:"/api/brand-product-option-groups",i=v?"PUT":"POST";(await fetch(t,{method:i,headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:F.name,is_required:F.is_required,options:F.options})})).ok&&(S(),$())}catch(e){console.error("Error saving option group:",e)}},disabled:!F.name.trim()||0===F.options.length,children:v?"Update":"Create"})]})]}),(0,y.jsxs)(u.aF,{isOpen:b,onClose:()=>j(!1),title:"Delete Option Group",children:[(0,y.jsx)("p",{children:"Are you sure you want to delete this option group? This action cannot be undone."}),(0,y.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,y.jsx)(ce,{type:"button",variant:"secondary",onClick:()=>j(!1),children:"Cancel"}),(0,y.jsx)(ce,{type:"button",variant:"danger",onClick:async()=>{if(_)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/brand-product-option-groups/${_}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(t.ok)S();else{const e=await t.json();alert(e.error||"Failed to delete option group")}}catch(e){console.error("Error deleting option group:",e)}finally{j(!1),C(null)}},children:"Delete"})]})]})]})},qe=()=>{const{t:e}=(0,m.Bd)("brand"),{user:t}=(0,s.As)(),[i,d]=(0,a.M)("products"),[l,c]=(0,n.useState)(0),[p,u]=(0,n.useState)(0),[x,h]=(0,n.useState)(0),[g,b]=(0,n.useState)([]),[j,v]=(0,n.useState)(!0),[f,_]=(0,n.useState)(0),[C]=(0,n.useState)(0);(0,n.useEffect)(()=>{!t||"Brand General"!==t.role&&"Brand Manager"!==t.role?v(!1):F()},[t]);const F=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();b(e)}}catch(e){console.error("Error fetching brands:",e)}finally{v(!1)}};return j?(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(r.mc,{children:[(0,y.jsx)(r.Y9,{children:(0,y.jsx)(r.hE,{children:e("brand:brandProductManagementPage.productManagement")})}),(0,y.jsx)(r.UC,{children:(0,y.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})}):(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(r.mc,{children:[(0,y.jsx)(r.Y9,{children:(0,y.jsx)(r.hE,{children:e("brand:brandProductManagementPage.productManagement")})}),(0,y.jsxs)(r.UC,{children:[(0,y.jsxs)(o.tU,{children:[(0,y.jsxs)(o.oz,{active:"products"===i,onClick:()=>d("products"),children:["Products",(0,y.jsx)(o.Ex,{count:l,showZero:!0})]}),(0,y.jsxs)(o.oz,{active:"categories"===i,onClick:()=>d("categories"),children:["Categories",(0,y.jsx)(o.Ex,{count:p,showZero:!0})]}),(0,y.jsxs)(o.oz,{active:"options"===i,onClick:()=>d("options"),children:["Options",(0,y.jsx)(o.Ex,{count:x,showZero:!0})]})]}),(0,y.jsx)("div",{style:{display:"products"===i?"block":"none"},children:(0,y.jsx)(Z,{brands:g,onCountChange:c,categoryRefreshKey:f,optionRefreshKey:C})}),(0,y.jsx)("div",{style:{display:"categories"===i?"block":"none"},children:(0,y.jsx)(le,{onCountChange:u,onCategoryChange:()=>_(e=>e+1)})}),(0,y.jsx)("div",{style:{display:"options"===i?"block":"none"},children:(0,y.jsx)($e,{onCountChange:h})})]})]})})}}}]);