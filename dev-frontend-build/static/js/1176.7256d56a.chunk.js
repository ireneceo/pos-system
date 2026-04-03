"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1176],{1176:(e,t,i)=>{i.r(t),i.d(t,{default:()=>ie});var r=i(9950),n=i(4752),o=i(8409),s=i(2597),a=i(2653),d=i(2853),l=i(3705),c=i(2488),p=i(9610),x=i(4877),u=i(7617),h=i(4414);const g=[{code:"MY",name:"Malaysia",currency:"MYR"},{code:"SG",name:"Singapore",currency:"SGD"},{code:"KR",name:"South Korea",currency:"KRW"},{code:"JP",name:"Japan",currency:"JPY"},{code:"TH",name:"Thailand",currency:"THB"},{code:"US",name:"United States",currency:"USD"},{code:"GB",name:"United Kingdom",currency:"GBP"},{code:"AU",name:"Australia",currency:"AUD"}],m=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,y=n.Ay.div`
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
`,f=n.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`,b=n.Ay.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${e=>e.src?`url(${e.src}) center/cover`:"#F3F4F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 28px;
`,v=n.Ay.div`
  flex: 1;
  min-width: 0;
`,j=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,_=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,w=n.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,F=n.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,C=n.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,k=n.Ay.span`
  color: #6B7280;
`,A=n.Ay.span`
  color: #059669;
  font-weight: 600;
  font-size: 16px;
`,B=n.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,E=n.Ay.button`
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
`,S=n.Ay.button`
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
`,z=n.Ay.button`
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
`,D=n.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #667eea;
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 6px;
`,$=n.Ay.div`
  font-size: 11px;
  color: #667eea;
  margin-top: 4px;
  line-height: 1.4;
`,I=n.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
`,R=n.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`,T=n.Ay.label`
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
`,P=n.Ay.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,U=n.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 20px 0;
`,L=n.Ay.div`
  margin-top: 24px;
`,q=n.Ay.div`
  display: grid;
  gap: 12px;
`,N=n.Ay.div`
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
`,M=n.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,O=n.Ay.div`
  flex: 1;
`,W=n.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Y=n.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,Z=n.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,Q=n.Ay.div`
  display: flex;
  gap: 8px;
`,J=n.Ay.button`
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
`,G=n.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,H=n.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,K=n.Ay.button`
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
`,X=n.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 20px 0 12px 0;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
`,V=n.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #FEF3C7;
  color: #D97706;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 6px;
`,ee=e=>{let{onCountChange:t,categoryRefreshKey:i}=e;const[n,o]=(0,r.useState)([]),[s,a]=(0,r.useState)([]),[L,q]=(0,r.useState)([]),[N,M]=(0,r.useState)(!0),[O,W]=(0,r.useState)(""),[Y,Z]=(0,r.useState)("all"),[Q,J]=(0,r.useState)(!1),[G,H]=(0,r.useState)(null),[K,ee]=(0,r.useState)(!1),[te,ie]=(0,r.useState)(null),[re,ne]=(0,r.useState)({name:"",description:"",sku:"",category_id:"",image_url:"",emoji:"",is_active:!0,is_set:!1,set_group:"",set_tier:"",set_use_case:"",set_setup_items:"",is_recommended:!1,set_items:[],addons:[],prices:{},shipping_countries:[],shipping_settings:{}}),[oe,se]=(0,r.useState)(""),[ae,de]=(0,r.useState)(""),[le,ce]=(0,r.useState)(null),[pe,xe]=(0,r.useState)(!1),ue=(0,r.useCallback)(()=>localStorage.getItem("auth_token"),[]),he=(0,r.useCallback)(async()=>{try{const e=ue(),i=await fetch("/api/system-products",{headers:{Authorization:`Bearer ${e}`}}),r=await i.json();r.success&&(o(r.data),t(r.data.length))}catch(e){console.error("Failed to fetch system products:",e)}},[ue,t]),ge=(0,r.useCallback)(async()=>{try{const e=ue(),t=await fetch("/api/system-product-categories",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&a(i.data)}catch(e){console.error("Failed to fetch categories:",e)}},[ue]),me=(0,r.useCallback)(async()=>{try{const e=ue(),t=await fetch("/api/currencies/supported",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&q(i.data||[])}catch(e){console.error("Failed to fetch currencies:",e)}},[ue]);(0,r.useEffect)(()=>{(async()=>{M(!0),await Promise.all([he(),ge(),me()]),M(!1)})()},[he,ge,me]),(0,r.useEffect)(()=>{i>0&&ge()},[i,ge]);const ye=e=>{if(!e.prices||0===e.prices.length)return"N/A";const t=e.prices.find(e=>e.is_active);if(t)return`${t.currency} ${Number(t.price).toFixed(2)}`;const i=e.prices[0];return`${i.currency} ${Number(i.price).toFixed(2)}`},fe=e=>{const t={};return e.forEach(e=>{t[e.currency]={price:e.price.toString(),is_active:e.is_active}}),t},be=e=>{const t={};return e?(Array.isArray(e)?e.forEach(e=>{t[e.country_code]={shipping_fee:(e.shipping_fee||0).toString(),free_shipping_threshold:(e.free_shipping_threshold||0).toString(),estimated_days:e.estimated_days||""}}):"object"===typeof e&&Object.entries(e).forEach(e=>{let[i,r]=e;t[i]={shipping_fee:(r.delivery_fee||r.shipping_fee||0).toString(),free_shipping_threshold:(r.free_delivery_threshold||r.free_shipping_threshold||0).toString(),estimated_days:r.estimated_days||""}}),t):t},ve=e=>{if(e){var t;H(e),ne({name:e.name,description:e.description||"",sku:e.sku||"",category_id:(null===(t=e.category_id)||void 0===t?void 0:t.toString())||"",image_url:e.image_url||"",emoji:e.emoji||"",is_active:e.is_active,is_set:e.is_set||!1,set_group:e.set_group||"",set_tier:e.set_tier||"",set_use_case:e.set_use_case||"",set_setup_items:(e.set_setup_items||[]).join("\n"),is_recommended:e.is_recommended||!1,set_items:e.set_items||[],addons:(e.addons||[]).map(e=>{var t;return{productId:e.addon_product_id||e.productId,name:(null===(t=e.addonProduct)||void 0===t?void 0:t.name)||e.name||"",addon_label:e.addon_label||"",max_quantity:e.max_quantity||0,is_inquiry_only:e.is_inquiry_only||!1}}),prices:fe(e.prices||[]),shipping_countries:e.shipping_countries||[],shipping_settings:be(e.shipping_settings)})}else{H(null);const e={name:"",description:"",sku:"",category_id:"",image_url:"",emoji:"",is_active:!0,is_set:!1,set_group:"",set_tier:"",set_use_case:"",set_setup_items:"",is_recommended:!1,set_items:[],addons:[],prices:{},shipping_countries:[],shipping_settings:{}};s.length>0&&(e.category_id=s[0].id.toString()),ne(e)}se(""),de(""),ce(null),J(!0)},je=()=>{J(!1),H(null),ce(null)},_e=(e,t)=>{ne(i=>({...i,set_items:i.set_items.map(i=>i.productId===e?{...i,quantity:Math.max(1,i.quantity+t)}:i)}))},we=(e,t,i)=>{ne(r=>({...r,addons:r.addons.map(r=>r.productId===e?{...r,[t]:i}:r)}))},Fe=(e,t,i)=>{ne(r=>({...r,prices:{...r.prices,[e]:{...r.prices[e]||{price:"",is_active:!0},[t]:i}}}))},Ce=(e,t,i)=>{ne(r=>({...r,shipping_settings:{...r.shipping_settings,[e]:{...r.shipping_settings[e]||{shipping_fee:"0",free_shipping_threshold:"0",estimated_days:""},[t]:i}}}))},ke=n.filter(e=>{var t;const i=e.name.toLowerCase().includes(O.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(O.toLowerCase()),r="all"===Y||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===Y;return i&&r});return N?(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading products..."}):(0,h.jsxs)("div",{children:[(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,h.jsxs)(c.Qn,{style:{marginBottom:0},children:[(0,h.jsx)(c.DO,{type:"text",placeholder:"Search products...",value:O,onChange:e=>W(e.target.value)}),(0,h.jsxs)(c.Jt,{value:Y,onChange:e=>Z(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),s.map(e=>(0,h.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]})]}),(0,h.jsx)(l.cc,{onClick:()=>ve(),style:{flexShrink:0},children:"Add Product"})]}),0===ke.length?(0,h.jsxs)(d.pp,{children:[(0,h.jsx)(P,{children:O||"all"!==Y?"No products found":"No products yet"}),(0,h.jsx)(U,{children:O||"all"!==Y?"Try adjusting your search or filter criteria.":"Start by adding your first system product."}),!O&&"all"===Y&&(0,h.jsx)(l.cc,{onClick:()=>ve(),children:"Add Product"})]}):(0,h.jsx)(m,{children:ke.map(e=>(0,h.jsxs)(y,{isActive:e.is_active,onClick:()=>ve(e),children:[(0,h.jsxs)(f,{children:[(0,h.jsx)(b,{src:e.image_url,children:!e.image_url&&(e.emoji||"\ud83d\udce6")}),(0,h.jsxs)(v,{children:[(0,h.jsxs)(j,{children:[e.name,e.is_set&&(0,h.jsx)(D,{children:"SET"}),e.is_recommended&&(0,h.jsx)(V,{children:"Recommended"})]}),e.sku&&(0,h.jsxs)(_,{children:["SKU: ",e.sku]}),e.category&&(0,h.jsxs)(w,{children:[e.category.emoji," ",e.category.name]}),e.is_set&&e.set_items&&e.set_items.length>0&&(0,h.jsxs)($,{children:["Set: ",e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")]})]})]}),(0,h.jsxs)(F,{children:[(0,h.jsxs)(C,{children:[(0,h.jsx)(k,{children:"Price"}),(0,h.jsx)(A,{children:ye(e)})]}),e.is_set&&e.set_group&&(0,h.jsxs)(C,{children:[(0,h.jsx)(k,{children:"Group"}),(0,h.jsx)("span",{style:{color:"#0A2540",fontWeight:500},children:e.set_group})]}),e.is_set&&e.set_tier&&(0,h.jsxs)(C,{children:[(0,h.jsx)(k,{children:"Tier"}),(0,h.jsx)("span",{style:{color:"#0A2540",fontWeight:500},children:e.set_tier})]}),e.shipping_countries&&e.shipping_countries.length>0&&(0,h.jsxs)(C,{children:[(0,h.jsx)(k,{children:"Ships to"}),(0,h.jsx)("span",{style:{color:"#0A2540",fontWeight:500},children:e.shipping_countries.map(e=>{const t=g.find(t=>t.code===e);return t?t.code:e}).join(", ")})]})]}),(0,h.jsxs)(B,{onClick:e=>e.stopPropagation(),children:[(0,h.jsx)(E,{onClick:()=>ve(e),children:"Edit"}),(0,h.jsx)(S,{onClick:t=>(async(e,t)=>{t.stopPropagation();try{const t=ue(),i=await fetch(`/api/system-products/${e.id}/copy`,{method:"POST",headers:{Authorization:`Bearer ${t}`}}),r=await i.json();r.success?he():alert(r.message||r.error||"Failed to copy product")}catch(i){console.error("Failed to copy product:",i)}})(e,t),children:"Copy"}),(0,h.jsx)(z,{isActive:e.is_active,onClick:t=>(async(e,t)=>{t.stopPropagation();try{const t=ue(),i=await fetch(`/api/system-products/${e.id}/toggle-active`,{method:"PUT",headers:{Authorization:`Bearer ${t}`}});(await i.json()).success&&he()}catch(i){console.error("Failed to toggle product:",i)}})(e,t),children:e.is_active?"Active":"Inactive"}),(0,h.jsx)(E,{variant:"danger",onClick:t=>((e,t)=>{t.stopPropagation(),ie(e),ee(!0)})(e,t),children:"Delete"})]})]},e.id))}),Q&&(0,h.jsx)(p.aF,{isOpen:Q,onClose:je,title:G?"Edit System Product":"Add System Product",maxWidth:"750px",children:(0,h.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),!pe)if(ce(null),re.name.trim()){xe(!0);try{const e=ue(),t=G?"PUT":"POST",i=G?`/api/system-products/${G.id}`:"/api/system-products",r=[];Object.entries(re.prices).forEach(e=>{let[t,i]=e;const n=parseFloat(i.price);!isNaN(n)&&n>=0&&r.push({currency:t,price:n,is_active:i.is_active})});const n=[];re.shipping_countries.forEach(e=>{const t=re.shipping_settings[e];n.push({country_code:e,shipping_fee:parseFloat((null===t||void 0===t?void 0:t.shipping_fee)||"0")||0,free_shipping_threshold:parseFloat((null===t||void 0===t?void 0:t.free_shipping_threshold)||"0")||0,estimated_days:(null===t||void 0===t?void 0:t.estimated_days)||""})});const o=re.set_setup_items.split("\n").map(e=>e.trim()).filter(e=>e.length>0),s=await fetch(i,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:re.name.trim(),description:re.description.trim()||null,sku:re.sku.trim()||null,category_id:re.category_id?parseInt(re.category_id):null,image_url:re.image_url||null,emoji:re.emoji||null,is_active:re.is_active,is_set:re.is_set,set_group:re.is_set&&re.set_group||null,set_tier:re.is_set&&re.set_tier||null,set_use_case:re.is_set&&re.set_use_case.trim()||null,set_setup_items:re.is_set&&o.length>0?o:null,is_recommended:!!re.is_set&&re.is_recommended,set_items:re.is_set?re.set_items:null,addons:re.is_set?re.addons.map(e=>({addon_product_id:e.productId,addon_label:e.addon_label,max_quantity:e.max_quantity,is_inquiry_only:e.is_inquiry_only})):null,prices:r,shipping_countries:re.shipping_countries.length>0?re.shipping_countries:null,shipping_settings:n.length>0?n:null})}),a=await s.json();a.success?(je(),he()):ce(a.message||a.error||"Failed to save product")}catch(t){console.error("Failed to save product:",t),ce("Failed to save product. Please try again.")}finally{xe(!1)}}else ce("Product name is required")},children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Name *"}),(0,h.jsx)(p.ZQ,{type:"text",value:re.name,onChange:e=>ne({...re,name:e.target.value}),placeholder:"Product name",required:!0})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"SKU"}),(0,h.jsx)(p.ZQ,{type:"text",value:re.sku,onChange:e=>ne({...re,sku:e.target.value}),placeholder:"Auto-generated if empty"})]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Category"}),(0,h.jsxs)(p.FX,{value:re.category_id,onChange:e=>ne({...re,category_id:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"No category"}),s.map(e=>(0,h.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)(p.Lz,{value:re.description,onChange:e=>ne({...re,description:e.target.value}),placeholder:"Product description",rows:2})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Product Image"}),(0,h.jsx)(x.A,{value:re.image_url,onChange:e=>ne({...re,image_url:e||""}),label:"",helpText:"Upload a product image (max 2MB)"})]}),(0,h.jsx)(X,{children:"Pricing"}),L.length>0?(0,h.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",gap:"12px"},children:L.map(e=>{const t=re.prices[e.code]||{price:"",is_active:!0};return(0,h.jsxs)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px"},children:[(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[(0,h.jsxs)("span",{style:{fontWeight:600,fontSize:"13px",color:"#0A2540"},children:[e.code," (",e.symbol,")"]}),(0,h.jsxs)(I,{children:[(0,h.jsx)("input",{type:"checkbox",checked:t.is_active,onChange:t=>Fe(e.code,"is_active",t.target.checked)}),"Active"]})]}),(0,h.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",value:t.price,onChange:t=>Fe(e.code,"price",t.target.value),placeholder:"0.00"})]},e.code)})}):(0,h.jsx)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px",color:"#6B7280",fontSize:"13px"},children:"No supported currencies found. Configure currencies first."}),(0,h.jsx)(X,{children:"Set Configuration"}),(0,h.jsx)(p.gE,{children:(0,h.jsxs)(I,{children:[(0,h.jsx)("input",{type:"checkbox",checked:re.is_set,onChange:e=>ne({...re,is_set:e.target.checked,set_items:e.target.checked?re.set_items:[],addons:e.target.checked?re.addons:[]})}),"Set Product (bundle multiple products)"]})}),re.is_set&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Set Group"}),(0,h.jsxs)(p.FX,{value:re.set_group,onChange:e=>ne({...re,set_group:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"Select group"}),(0,h.jsx)("option",{value:"tablet",children:"Tablet"}),(0,h.jsx)("option",{value:"monitor",children:"Monitor"}),(0,h.jsx)("option",{value:"custom",children:"Custom"})]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Set Tier"}),(0,h.jsxs)(p.FX,{value:re.set_tier,onChange:e=>ne({...re,set_tier:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"Select tier"}),(0,h.jsx)("option",{value:"standard",children:"Standard"}),(0,h.jsx)("option",{value:"hybrid",children:"Hybrid"}),(0,h.jsx)("option",{value:"premium",children:"Premium"}),(0,h.jsx)("option",{value:"custom",children:"Custom"})]})]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Use Case"}),(0,h.jsx)(p.ZQ,{type:"text",value:re.set_use_case,onChange:e=>ne({...re,set_use_case:e.target.value}),placeholder:"e.g., Small cafe, Food truck, Full restaurant"})]}),(0,h.jsx)(p.gE,{children:(0,h.jsxs)(I,{children:[(0,h.jsx)("input",{type:"checkbox",checked:re.is_recommended,onChange:e=>ne({...re,is_recommended:e.target.checked})}),"Recommended Set"]})}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Setup Items (one per line)"}),(0,h.jsx)(p.Lz,{value:re.set_setup_items,onChange:e=>ne({...re,set_setup_items:e.target.value}),placeholder:"POS app installation\nMenu setup\nStaff training",rows:3})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Set Items"}),re.set_items.length>0&&(0,h.jsx)("div",{style:{marginBottom:"12px"},children:re.set_items.map(e=>(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 12px",background:"#F9FAFB",borderRadius:"6px",marginBottom:"4px"},children:[(0,h.jsx)("span",{style:{flex:1,fontSize:"14px"},children:e.name}),(0,h.jsx)("input",{type:"text",placeholder:"Role label",value:e.role_label,onChange:t=>{return i=e.productId,r=t.target.value,void ne(e=>({...e,set_items:e.set_items.map(e=>e.productId===i?{...e,role_label:r}:e)}));var i,r},style:{width:"120px",padding:"4px 8px",border:"1px solid #D1D5DB",borderRadius:"4px",fontSize:"12px"}}),(0,h.jsx)("button",{type:"button",onClick:()=>_e(e.productId,-1),style:{width:"28px",height:"28px",border:"1px solid #D1D5DB",borderRadius:"4px",background:"white",cursor:"pointer"},children:"-"}),(0,h.jsx)("span",{style:{minWidth:"24px",textAlign:"center",fontWeight:600},children:e.quantity}),(0,h.jsx)("button",{type:"button",onClick:()=>_e(e.productId,1),style:{width:"28px",height:"28px",border:"1px solid #D1D5DB",borderRadius:"4px",background:"white",cursor:"pointer"},children:"+"}),(0,h.jsx)("button",{type:"button",onClick:()=>{return t=e.productId,void ne(e=>({...e,set_items:e.set_items.filter(e=>e.productId!==t)}));var t},style:{color:"#DC2626",background:"none",border:"none",cursor:"pointer",fontSize:"16px"},children:"x"})]},e.productId))}),(0,h.jsx)(p.ZQ,{type:"text",placeholder:"Search products to add...",value:oe,onChange:e=>se(e.target.value),style:{marginBottom:"8px"}}),(0,h.jsx)("div",{style:{maxHeight:"200px",overflowY:"auto",background:"#F9FAFB",borderRadius:"8px",padding:"8px"},children:n.filter(e=>!e.is_set&&(!G||e.id!==G.id)).filter(e=>!oe||e.name.toLowerCase().includes(oe.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(oe.toLowerCase())).map(e=>(0,h.jsxs)("div",{onClick:()=>(e=>{const t=n.find(t=>t.id===e);if(!t||t.is_set)return;const i=re.set_items.find(t=>t.productId===e);ne(i?t=>({...t,set_items:t.set_items.map(t=>t.productId===e?{...t,quantity:t.quantity+1}:t)}):i=>({...i,set_items:[...i.set_items,{productId:e,name:t.name,quantity:1,role_label:""}]}))})(e.id),style:{padding:"8px 12px",cursor:"pointer",borderRadius:"6px",marginBottom:"2px",background:re.set_items.some(t=>t.productId===e.id)?"#EEF2FF":"white",border:"1px solid #E5E7EB",fontSize:"13px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)("span",{children:[e.emoji||"\ud83d\udce6"," ",e.sku?`${e.sku} `:"",e.name]}),(0,h.jsx)("span",{style:{color:"#6B7280"},children:ye(e)})]},e.id))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Addons"}),re.addons.length>0&&(0,h.jsx)("div",{style:{marginBottom:"12px"},children:re.addons.map(e=>(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 12px",background:"#F9FAFB",borderRadius:"6px",marginBottom:"4px",flexWrap:"wrap"},children:[(0,h.jsx)("span",{style:{flex:1,fontSize:"14px",minWidth:"120px"},children:e.name}),(0,h.jsx)("input",{type:"text",placeholder:"Addon label",value:e.addon_label,onChange:t=>we(e.productId,"addon_label",t.target.value),style:{width:"120px",padding:"4px 8px",border:"1px solid #D1D5DB",borderRadius:"4px",fontSize:"12px"}}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"4px"},children:[(0,h.jsx)("span",{style:{fontSize:"12px",color:"#6B7280"},children:"Max:"}),(0,h.jsx)("input",{type:"number",min:"1",value:e.max_quantity,onChange:t=>we(e.productId,"max_quantity",parseInt(t.target.value)||1),style:{width:"50px",padding:"4px 6px",border:"1px solid #D1D5DB",borderRadius:"4px",fontSize:"12px"}})]}),(0,h.jsxs)(I,{style:{fontSize:"12px"},children:[(0,h.jsx)("input",{type:"checkbox",checked:e.is_inquiry_only,onChange:t=>we(e.productId,"is_inquiry_only",t.target.checked)}),"Inquiry only"]}),(0,h.jsx)("button",{type:"button",onClick:()=>{return t=e.productId,void ne(e=>({...e,addons:e.addons.filter(e=>e.productId!==t)}));var t},style:{color:"#DC2626",background:"none",border:"none",cursor:"pointer",fontSize:"16px"},children:"x"})]},e.productId))}),(0,h.jsx)(p.ZQ,{type:"text",placeholder:"Search products to add as addon...",value:ae,onChange:e=>de(e.target.value),style:{marginBottom:"8px"}}),(0,h.jsx)("div",{style:{maxHeight:"200px",overflowY:"auto",background:"#F9FAFB",borderRadius:"8px",padding:"8px"},children:n.filter(e=>!e.is_set&&(!G||e.id!==G.id)).filter(e=>!ae||e.name.toLowerCase().includes(ae.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(ae.toLowerCase())).filter(e=>!re.addons.some(t=>t.productId===e.id)).map(e=>(0,h.jsxs)("div",{onClick:()=>(e=>{const t=n.find(t=>t.id===e);if(!t)return;re.addons.find(t=>t.productId===e)||ne(i=>({...i,addons:[...i.addons,{productId:e,name:t.name,addon_label:"",max_quantity:1,is_inquiry_only:!1}]}))})(e.id),style:{padding:"8px 12px",cursor:"pointer",borderRadius:"6px",marginBottom:"2px",background:"white",border:"1px solid #E5E7EB",fontSize:"13px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,h.jsxs)("span",{children:[e.emoji||"\ud83d\udce6"," ",e.sku?`${e.sku} `:"",e.name]}),(0,h.jsx)("span",{style:{color:"#6B7280"},children:ye(e)})]},e.id))})]})]}),(0,h.jsx)(X,{children:"Shipping"}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Available Countries"}),(0,h.jsx)(R,{children:g.map(e=>(0,h.jsxs)(T,{children:[(0,h.jsx)("input",{type:"checkbox",checked:re.shipping_countries.includes(e.code),onChange:()=>{return t=e.code,void ne(e=>{const i=e.shipping_countries.includes(t)?e.shipping_countries.filter(e=>e!==t):[...e.shipping_countries,t];return{...e,shipping_countries:i}});var t}}),(0,h.jsxs)("span",{children:[e.name," (",e.currency,")"]})]},e.code))})]}),re.shipping_countries.length>0&&(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Shipping Settings per Country"}),re.shipping_countries.map(e=>{const t=g.find(t=>t.code===e),i=re.shipping_settings[e]||{shipping_fee:"0",free_shipping_threshold:"0",estimated_days:""};return(0,h.jsxs)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px",marginBottom:"8px"},children:[(0,h.jsx)("div",{style:{fontWeight:600,fontSize:"13px",color:"#0A2540",marginBottom:"8px"},children:(null===t||void 0===t?void 0:t.name)||e}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:["Shipping Fee (",null===t||void 0===t?void 0:t.currency,")"]}),(0,h.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",value:i.shipping_fee,onChange:t=>Ce(e,"shipping_fee",t.target.value)})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Free Shipping Threshold"}),(0,h.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",value:i.free_shipping_threshold,onChange:t=>Ce(e,"free_shipping_threshold",t.target.value)})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"4px"},children:"Estimated Days"}),(0,h.jsx)(p.ZQ,{type:"text",value:i.estimated_days,onChange:t=>Ce(e,"estimated_days",t.target.value),placeholder:"e.g., 3-5"})]})]})]},e)})]}),(0,h.jsx)(p.gE,{style:{marginBottom:0,marginTop:"16px"},children:(0,h.jsxs)(I,{children:[(0,h.jsx)("input",{type:"checkbox",checked:re.is_active,onChange:e=>ne({...re,is_active:e.target.checked})}),"Active"]})}),(0,h.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,h.jsx)(p.yl,{type:"button",onClick:je,disabled:pe,children:"Cancel"}),(0,h.jsx)(p.yl,{type:"submit",variant:"primary",disabled:pe,children:pe?"Saving...":G?"Update":"Create"})]}),le&&(0,h.jsx)("div",{style:{marginTop:"16px",padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:le})]})}),(0,h.jsx)(u.A,{isOpen:K,onCancel:()=>{ee(!1),ie(null)},onConfirm:async()=>{if(te)try{const e=ue(),t=await fetch(`/api/system-products/${te.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success?(ee(!1),ie(null),he()):alert(i.message||i.error||"Failed to delete product")}catch(e){console.error("Failed to delete product:",e),alert("Failed to delete product")}},title:"Delete Product",message:`Are you sure you want to delete "${null===te||void 0===te?void 0:te.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},te=e=>{let{onCountChange:t,onCategoryChange:i}=e;const[n,s]=(0,r.useState)([]),[a,c]=(0,r.useState)(!0),[x,g]=(0,r.useState)(!1),[m,y]=(0,r.useState)(null),[f,b]=(0,r.useState)(!1),[v,j]=(0,r.useState)(null),[_,w]=(0,r.useState)({name:"",emoji:"",description:""}),F=(0,r.useCallback)(()=>localStorage.getItem("auth_token"),[]),C=(0,r.useCallback)(async()=>{try{const e=F(),i=await fetch("/api/system-product-categories",{headers:{Authorization:`Bearer ${e}`}}),r=await i.json();r.success&&(s(r.data),t(r.data.length))}catch(e){console.error("Failed to fetch categories:",e)}finally{c(!1)}},[F,t]);(0,r.useEffect)(()=>{c(!0),C()},[C]);const k=e=>{e?(y(e),w({name:e.name,emoji:e.emoji||"",description:e.description||""})):(y(null),w({name:"",emoji:"",description:""})),g(!0)},A=()=>{g(!1),y(null),w({name:"",emoji:"",description:""})},B=async(e,t)=>{try{const i=F(),r=await fetch(`/api/system-product-categories/${e}/reorder`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({direction:t})}),n=await r.json();n.success?C():alert(n.message||n.error||"Failed to reorder")}catch(i){console.error("Failed to reorder category:",i)}};return a?(0,h.jsx)(L,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading categories..."})}):(0,h.jsxs)(L,{children:[(0,h.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"16px"},children:(0,h.jsx)(l.cc,{onClick:()=>k(),children:"Add Category"})}),0===n.length?(0,h.jsxs)(d.pp,{children:[(0,h.jsx)(P,{children:"No categories yet"}),(0,h.jsx)(U,{children:"Create your first product category to organize your system products."}),(0,h.jsx)(l.cc,{onClick:()=>k(),children:"Add Category"})]}):(0,h.jsx)(q,{children:n.map((e,t)=>(0,h.jsxs)(N,{isActive:e.is_active,children:[(0,h.jsx)(o.Xd,{onMoveUp:()=>B(e.id,"up"),onMoveDown:()=>B(e.id,"down"),disableUp:0===t,disableDown:t===n.length-1}),(0,h.jsx)(M,{children:e.emoji||"\ud83d\udce6"}),(0,h.jsxs)(O,{children:[(0,h.jsx)(W,{children:e.name}),(0,h.jsxs)(Y,{children:[(0,h.jsxs)("span",{children:[e.product_count||0," products"]}),(0,h.jsx)(G,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,h.jsx)(Z,{children:e.description})]}),(0,h.jsxs)(Q,{children:[(0,h.jsx)(J,{onClick:()=>k(e),title:"Edit",children:(0,h.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,h.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"}),(0,h.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,h.jsx)(J,{onClick:()=>(e=>{j(e),b(!0)})(e),title:"Delete",children:(0,h.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,h.jsx)("path",{d:"M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"}),(0,h.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),(0,h.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17"})]})})]})]},e.id))}),x&&(0,h.jsx)(p.aF,{isOpen:x,onClose:A,title:m?"Edit Category":"Add Category",children:(0,h.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),_.name.trim())try{const e=F(),t=m?"PUT":"POST",r=m?`/api/system-product-categories/${m.id}`:"/api/system-product-categories",n=await fetch(r,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:_.name.trim(),emoji:_.emoji||null,description:_.description.trim()||null})}),o=await n.json();o.success?(A(),C(),null===i||void 0===i||i()):alert(o.message||o.error||"Failed to save")}catch(t){console.error("Failed to save category:",t),alert("Failed to save")}},children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Name *"}),(0,h.jsx)(p.ZQ,{type:"text",value:_.name,onChange:e=>w({..._,name:e.target.value}),placeholder:"Category name",required:!0})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Emoji"}),(0,h.jsx)(H,{children:["\ud83d\udce6","\ud83d\udcbb","\ud83d\udda8\ufe0f","\ud83d\udcf1","\ud83d\udda5\ufe0f","\u2328\ufe0f","\ud83d\uddb1\ufe0f","\ud83d\udd0c","\ud83d\udd0b","\ud83d\udcf7","\ud83c\udfa7","\ud83d\udd0a","\ud83d\udcfa","\ud83d\udcbd","\ud83d\udcbe","\ud83d\udcbf","\ud83d\udcc0","\ud83e\uddee","\ud83d\udcde","\ud83d\udcdf","\ud83d\udce0","\ud83d\udce1","\ud83d\udd27","\ud83d\udd29","\u2699\ufe0f","\ud83d\udee0\ufe0f","\ud83d\udddc\ufe0f","\ud83c\udf10","\ud83d\udd17","\ud83d\udcc8","\ud83d\udcca","\ud83d\udcc1","\ud83d\udcc2","\ud83d\udcc4","\ud83d\udccb","\ud83d\udccc","\ud83d\udcce","\ud83d\udccf","\ud83d\udcd0","\u2702\ufe0f","\ud83d\udcb3","\ud83c\udff7\ufe0f","\ud83d\uded2","\ud83d\udef5","\ud83d\ude9a","\ud83c\udfe2","\ud83c\udfed","\ud83c\udfea","\u26a1","\ud83d\udd0d"].map(e=>(0,h.jsx)(K,{type:"button",selected:_.emoji===e,onClick:()=>w({..._,emoji:e}),children:e},e))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)(p.Lz,{value:_.description,onChange:e=>w({..._,description:e.target.value}),placeholder:"Category description (optional)",rows:3})]}),(0,h.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,h.jsx)(p.yl,{type:"button",onClick:A,children:"Cancel"}),(0,h.jsx)(p.yl,{type:"submit",variant:"primary",children:m?"Update":"Create"})]})]})}),(0,h.jsx)(u.A,{isOpen:f,onCancel:()=>{b(!1),j(null)},onConfirm:async()=>{if(v)try{const e=F(),t=await fetch(`/api/system-product-categories/${v.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),r=await t.json();r.success?(b(!1),j(null),C(),null===i||void 0===i||i()):alert(r.message||r.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:`Are you sure you want to delete "${null===v||void 0===v?void 0:v.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},ie=()=>{const[e,t]=(0,a.M)("products"),[i,n]=(0,r.useState)(0),[d,l]=(0,r.useState)(0),[c,p]=(0,r.useState)(0);return(0,h.jsxs)(o.mc,{children:[(0,h.jsx)(o.Y9,{children:(0,h.jsx)(o.hE,{children:"System Product Management"})}),(0,h.jsxs)(o.UC,{children:[(0,h.jsxs)(s.tU,{children:[(0,h.jsxs)(s.oz,{active:"products"===e,onClick:()=>t("products"),children:["Products",(0,h.jsx)(s.Ex,{count:i,showZero:!0})]}),(0,h.jsxs)(s.oz,{active:"categories"===e,onClick:()=>t("categories"),children:["Categories",(0,h.jsx)(s.Ex,{count:d,showZero:!0})]})]}),(0,h.jsx)("div",{style:{display:"products"===e?"block":"none"},children:(0,h.jsx)(ee,{onCountChange:n,categoryRefreshKey:c})}),(0,h.jsx)("div",{style:{display:"categories"===e?"block":"none"},children:(0,h.jsx)(te,{onCountChange:l,onCategoryChange:()=>p(e=>e+1)})})]})]})}},2488:(e,t,i)=>{i.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});i(9950);var r=i(4752),n=i(4414);const o=r.Ay.div`
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
`,s=r.Ay.input`
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
`,a=r.Ay.div`
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
`,d=r.Ay.button`
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
`,l=r.Ay.select`
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
`,c=e=>{let{children:t,className:i,style:r,...s}=e;return(0,n.jsx)(o,{className:i,style:r,...s,children:t})},p=e=>{let{placeholder:t="Search...",value:i,onChange:r,style:o,...l}=e;return(0,n.jsxs)(a,{style:o,children:[(0,n.jsx)(s,{placeholder:t,value:i,onChange:r,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:i?"36px":"16px"},...l}),i&&(0,n.jsx)(d,{type:"button",onClick:()=>null===r||void 0===r?void 0:r({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...i}=e;return(0,n.jsx)(l,{...i,children:t})}},2597:(e,t,i)=>{i.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});i(9950);var r=i(4752),n=i(4414);const o=r.Ay.div`
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
`,s=r.Ay.button`
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
`,a=r.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:t,className:i,style:r}=e;return(0,n.jsx)(o,{className:i,style:r,children:t})},l=e=>{let{active:t,onClick:i,children:r,className:o}=e;return(0,n.jsx)(s,{active:t,onClick:i,className:o,children:r})},c=e=>{let{count:t,variant:i="default",showZero:r=!1}=e;return 0!==t||r?(0,n.jsx)(a,{variant:i,children:t}):null}},2653:(e,t,i)=>{i.d(t,{M:()=>o});var r=i(9950),n=i(4492);function o(e){const[t,i]=(0,n.ok)(),o=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[s,a]=(0,r.useState)(o());return[s,(0,r.useCallback)(e=>{a(e),i({tab:e})},[i])]}},3705:(e,t,i)=>{i.d(t,{cc:()=>n});var r=i(4752);const n=r.Ay.button`
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
`},4877:(e,t,i)=>{i.d(t,{A:()=>v});var r=i(9950),n=i(4752),o=i(4414);const s=n.Ay.div`
  margin-bottom: 16px;
`,a=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,d=n.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,l=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,c=n.Ay.div`
  width: ${e=>e.hasImage?"150px":"100%"};
  height: 150px;
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: ${e=>e.isUploading?"wait":"pointer"};
  transition: all 0.2s;
  overflow: hidden;
  position: relative;
  opacity: ${e=>e.isUploading?.7:1};

  &:hover {
    border-color: ${e=>e.hasImage?"#CBD5E1":"#635BFF"};
    background: ${e=>e.hasImage?"#F8FAFC":"rgba(99, 91, 255, 0.03)"};
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`,p=n.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,x=n.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,u=n.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,h=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=n.Ay.label`
  padding: 8px 16px;
  border: 1px solid #635BFF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: ${e=>e.disabled?"wait":"pointer"};
  transition: all 0.2s;
  display: inline-block;
  text-align: center;
  opacity: ${e=>e.disabled?.5:1};

  &:hover {
    background: ${e=>e.disabled?"transparent":"#635BFF"};
    color: ${e=>e.disabled?"#635BFF":"white"};
  }

  input {
    display: none;
  }
`,m=n.Ay.button`
  padding: 8px 16px;
  border: 1px solid #DC2626;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #DC2626;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`,y=n.Ay.input`
  display: none;
`,f=n.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,b=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",v=e=>{let{value:t,onChange:i,label:n="Logo Upload",helpText:v="Upload an image for your logo",maxSize:j=2,previewSize:_=150,showRemoveButton:w=!0,changeButtonText:F="Change Image",removeButtonText:C="Remove Image",imageAltText:k="Uploaded"}=e;const[A,B]=(0,r.useState)(!1),[E,S]=(0,r.useState)(!1),z=(0,r.useRef)(null),D=(0,r.useRef)(null),$=async e=>{try{const t=localStorage.getItem("auth_token"),i=await fetch(`${b()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),r=await i.json();return r.success?r.data.original:(console.error("Image upload failed:",r.message),null)}catch(t){return console.error("Image upload error:",t),null}},I=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*j*1024)return void alert(`Image size should be less than ${j}MB`);if(S(!0),"image/svg+xml"===e.type){const t=new FileReader;return t.onload=async e=>{var t;const r=null===(t=e.target)||void 0===t?void 0:t.result,n=await $(r);S(!1),n?i(n):alert("Failed to upload image. Please try again.")},void t.readAsDataURL(e)}const t=new FileReader;t.onload=async t=>{var r;const n=new Image;n.onload=async()=>{const t=document.createElement("canvas"),r=t.getContext("2d");if(!r)return void S(!1);const o=1200;let s=n.width,a=n.height;(s>o||a>o)&&(s>a?(a=a/s*o,s=o):(s=s/a*o,a=o)),t.width=s,t.height=a,r.drawImage(n,0,0,s,a);const d="image/png"===e.type?t.toDataURL("image/png"):t.toDataURL("image/jpeg",.85),l=await $(d);S(!1),l?i(l):alert("Failed to upload image. Please try again.")},n.src=null===(r=t.target)||void 0===r?void 0:r.result},t.readAsDataURL(e)},R=e=>{if(E)return;const t=e.target.files;t&&t.length>0&&I(t[0]),e.target.value=""};return(0,o.jsxs)(s,{children:[n&&(0,o.jsx)(a,{children:n}),v&&(0,o.jsx)(d,{children:v}),(0,o.jsxs)(l,{children:[(0,o.jsx)(c,{ref:D,isDragging:A,hasImage:!!t,isUploading:E,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),E||B(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===D.current&&B(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),B(!1),E)return;const t=e.dataTransfer.files;t&&t.length>0&&I(t[0])},onClick:()=>{var e;t||E||(null===(e=z.current)||void 0===e||e.click())},children:E?(0,o.jsxs)(p,{children:[(0,o.jsx)(f,{}),(0,o.jsx)(x,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,o.jsx)("img",{src:(T=t,T?T.startsWith("http")?T:T.startsWith("/uploads/")?`${b()}${T}`:T:""),alt:k}):(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{children:A?"Drop image here":"Drag & drop or click to upload"}),(0,o.jsxs)(u,{children:["PNG, JPG, GIF up to ",j,"MB"]})]})}),t&&!E&&(0,o.jsxs)(h,{children:[(0,o.jsxs)(g,{disabled:E,children:[F,(0,o.jsx)("input",{ref:z,type:"file",accept:"image/*",onChange:R,disabled:E})]}),w&&(0,o.jsx)(m,{onClick:()=>{i("")},disabled:E,children:C})]})]}),!t&&!E&&(0,o.jsx)(y,{ref:z,type:"file",accept:"image/*",onChange:R})]});var T}},7617:(e,t,i)=>{i.d(t,{A:()=>u});i(9950);var r=i(7119),n=i(4752),o=i(9610),s=i(4414);const a=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=n.Ay.h2`
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
`,x=n.Ay.button`
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
`,u=e=>{let{isOpen:t,title:i,message:n,onConfirm:u,onCancel:h,confirmText:g="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return t?r.createPortal((0,s.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,s.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(l,{children:i}),(0,s.jsx)(c,{children:n})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(x,{variant:"secondary",onClick:h,children:m}),(0,s.jsx)(x,{variant:"primary",type:y,onClick:u,children:g})]})]})}),document.body):null}}}]);