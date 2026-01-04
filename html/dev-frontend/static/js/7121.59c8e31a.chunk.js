"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7121],{1840:(e,i,t)=>{t.d(i,{ff:()=>a});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const r="";n();async function a(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${r}${e}`,n=localStorage.getItem("auth_token"),a={credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...i.headers},...i},o=await fetch(t,a);if(!o.ok){const e=await o.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${o.status}`)}return o.json()}},2488:(e,i,t)=>{t.d(i,{DO:()=>c,Jt:()=>l,Qn:()=>d});t(9950);var n=t(4752),r=t(4414);const a=n.Ay.div`
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
`,o=n.Ay.input`
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
`,s=n.Ay.select`
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
`,d=e=>{let{children:i,className:t,style:n,...o}=e;return(0,r.jsx)(a,{className:t,style:n,...o,children:i})},c=e=>{let{placeholder:i="Search...",...t}=e;return(0,r.jsx)(o,{placeholder:i,...t})},l=e=>{let{children:i,...t}=e;return(0,r.jsx)(s,{...t,children:i})}},4021:(e,i,t)=>{t.d(i,{i1:()=>o});var n=t(9950),r=t(1367),a=t(6038);const o=()=>{const{user:e}=(0,r.As)(),[i,t]=(0,n.useState)("RM"),[o,s]=(0,n.useState)(Object.keys(a.DL)),[d,c]=(0,n.useState)(!0),[l,p]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const i=window.location.pathname.split("/"),n=i.indexOf("restaurant");let r=n>=0?i[n+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){var a;const e=await i.json(),n=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";t(n)}else t("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),t("RM")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:i,supportedCurrencies:o,loading:d,error:l}}},7121:(e,i,t)=>{t.r(i),t.d(i,{default:()=>Te});var n=t(9950),r=t(4752),a=t(4492),o=t(3310),s=t(7492),d=t(1367),c=t(2488),l=t(9610),p=t(4021),x=t(6038),u=t(1840),h=t(4414);const g=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,m=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,y=r.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,j=r.Ay.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`,v=r.Ay.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
`,f=r.Ay.div`
  flex: 1;
  min-width: 0;
`,b=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,k=r.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`,F=r.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  background: ${e=>e.hasRecipe?"#ECFDF5":"#FEF3C7"};
  color: ${e=>e.hasRecipe?"#059669":"#D97706"};
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`,w=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,C=r.Ay.div``,_=r.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,A=r.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,E=r.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>e.profit>=60?"#ECFDF5":e.profit>=40?"#FEF3C7":"#FEE2E2"};
  color: ${e=>e.profit>=60?"#059669":e.profit>=40?"#D97706":"#DC2626"};
`,S=r.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,z=r.Ay.button`
  flex: 1;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border: 1px solid #635BFF;\n    &:hover {\n      background: #4F46E5;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: #F6F9FC;\n    border: 1px solid #E6EBF1;\n    color: #6B7280;\n    &:hover {\n      border-color: #635BFF;\n      color: #635BFF;\n      background: #F4F3FF;\n      transform: translateY(-1px);\n    }\n  "}
`,B=r.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,$=r.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,R=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,L=r.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,P=r.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  margin: 16px 0;
`,D=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    border-bottom: none;
  }
`,M=r.Ay.div`
  flex: 1;
`,N=r.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 80px;
  gap: 12px;
  padding: 16px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`,O=r.Ay.div`
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,T=r.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;

  &:last-child {
    border-top: 1px solid #E5E7EB;
    margin-top: 8px;
    padding-top: 16px;
    font-weight: 600;
  }
`,I=e=>{let{onCountChange:i}=e;const{user:t}=(0,d.As)(),{defaultCurrency:r}=(0,p.i1)(),[a,o]=(0,n.useState)("RM"),[I,U]=(0,n.useState)(!0),[q,Q]=(0,n.useState)([]),[W,J]=(0,n.useState)([]),[Z,H]=(0,n.useState)(""),[Y,X]=(0,n.useState)("all"),[V,K]=(0,n.useState)("all"),[G,ee]=(0,n.useState)(!1),[ie,te]=(0,n.useState)(null),[ne,re]=(0,n.useState)([]),[ae,oe]=(0,n.useState)([]),[se,de]=(0,n.useState)(!1),[ce,le]=(0,n.useState)(""),[pe,xe]=(0,n.useState)(""),[ue,he]=(0,n.useState)(""),ge=null===t||void 0===t?void 0:t.brand_id;(0,n.useEffect)(()=>{r&&o(r)},[r]);const me=(0,n.useCallback)(async()=>{if(ge)try{U(!0);const[e,t]=await Promise.all([(0,u.ff)("/api/brand-products"),(0,u.ff)("/api/brand-product-categories")]);if(e.success){const t=(e.data||[]).map(e=>{var i,t;return{id:e.id,name:e.name,sku:e.sku,unit_price:e.unit_price||0,category:e.category,image_url:e.image_url,has_recipe:!!e.recipe_id,recipe_id:e.recipe_id||null,recipe_name:(null===(i=e.recipe)||void 0===i?void 0:i.name)||null,ingredient_cost:(null===(t=e.recipe)||void 0===t?void 0:t.total_ingredient_cost)||0,profit_margin:e.recipe&&e.unit_price>0?((e.unit_price-(e.recipe.total_ingredient_cost||0))/e.unit_price*100).toFixed(1):null}});Q(t),null===i||void 0===i||i(t.length)}t.success&&J(t.data||[])}catch(e){console.error("Failed to fetch products:",e)}finally{U(!1)}},[ge,i]);(0,n.useEffect)(()=>{me()},[me]);const ye=async e=>{te(e),await(async()=>{try{const e=await(0,u.ff)("/api/product-ingredients");e.success&&re(e.data||[])}catch(e){console.error("Failed to fetch ingredients:",e)}})(),e.has_recipe?await(async e=>{try{var i;const t=await(0,u.ff)(`/api/brand-products/${e}/recipe`);t.success&&null!==(i=t.data)&&void 0!==i&&i.recipe?oe(t.data.recipe.ingredients||[]):oe([])}catch(t){console.error("Failed to fetch product recipe:",t),oe([])}})(e.id):oe([]),ee(!0)},je=()=>ae.reduce((e,i)=>e+(i.total_cost||0),0),ve=q.filter(e=>{var i;const t=e.name.toLowerCase().includes(Z.toLowerCase())||(null===(i=e.sku)||void 0===i?void 0:i.toLowerCase().includes(Z.toLowerCase())),n="all"===Y||"with"===Y&&e.has_recipe||"without"===Y&&!e.has_recipe,r="all"===V||e.category&&e.category.id.toString()===V;return t&&n&&r});return I?(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(L,{children:"Manage recipes for your brand products. Add ingredients to calculate costs and profit margins."}),(0,h.jsxs)(c.Qn,{children:[(0,h.jsx)(c.DO,{type:"text",placeholder:"Search products...",value:Z,onChange:e=>H(e.target.value)}),(0,h.jsxs)(c.Jt,{value:Y,onChange:e=>X(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Products"}),(0,h.jsx)("option",{value:"with",children:"With Recipe"}),(0,h.jsx)("option",{value:"without",children:"Without Recipe"})]}),(0,h.jsxs)(c.Jt,{value:V,onChange:e=>K(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),W.map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))]})]}),0===ve.length?(0,h.jsxs)(B,{children:[(0,h.jsx)($,{children:"No products found"}),(0,h.jsx)(R,{children:"Add products in the Brand Products page first, then come back to add recipes."})]}):(0,h.jsx)(g,{children:ve.map(e=>{var i,t;return(0,h.jsxs)(m,{hasRecipe:e.has_recipe,onClick:()=>ye(e),children:[(0,h.jsxs)(y,{children:[e.image_url?(0,h.jsx)(j,{src:e.image_url,alt:e.name}):(0,h.jsx)(v,{children:(null===(i=e.category)||void 0===i?void 0:i.emoji)||"\ud83d\udce6"}),(0,h.jsxs)(f,{children:[(0,h.jsx)(b,{children:e.name}),(0,h.jsxs)("div",{children:[(0,h.jsx)(k,{children:(null===(t=e.category)||void 0===t?void 0:t.name)||"No Category"}),(0,h.jsx)(F,{hasRecipe:e.has_recipe,children:e.has_recipe?"Recipe Set":"No Recipe"})]})]})]}),(0,h.jsxs)(w,{children:[(0,h.jsxs)(C,{children:[(0,h.jsx)(_,{children:"Selling Price"}),(0,h.jsx)(A,{children:(0,x.vv)(e.unit_price,a)})]}),(0,h.jsxs)(C,{children:[(0,h.jsx)(_,{children:"Ingredient Cost"}),(0,h.jsx)(A,{children:e.has_recipe?(0,x.vv)(e.ingredient_cost,a):"-"})]})]}),e.profit_margin&&(0,h.jsxs)("div",{style:{textAlign:"center"},children:[(0,h.jsx)(_,{children:"Profit Margin"}),(0,h.jsxs)(E,{profit:parseFloat(e.profit_margin),children:[e.profit_margin,"%"]})]}),(0,h.jsx)(S,{children:(0,h.jsx)(z,{variant:"primary",onClick:i=>{i.stopPropagation(),ye(e)},children:e.has_recipe?"Edit Recipe":"Add Recipe"})})]},e.id)})}),(0,h.jsx)(l.aF,{isOpen:G,onClose:()=>ee(!1),title:`Recipe: ${(null===ie||void 0===ie?void 0:ie.name)||""}`,size:"large",children:ie&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(L,{children:"Add ingredients required to make this product. Costs are calculated automatically."}),(0,h.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,h.jsx)("strong",{children:"Product Price:"})," ",(0,x.vv)(ie.unit_price,a)]}),ae.length>0&&(0,h.jsx)(P,{children:ae.map((e,i)=>(0,h.jsxs)(D,{children:[(0,h.jsxs)(M,{children:[(0,h.jsx)("div",{style:{fontWeight:600},children:e.ingredient_name}),(0,h.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[e.quantity," ",e.unit," x ",(0,x.vv)(e.unit_cost||0,a)]})]}),(0,h.jsx)("div",{style:{fontWeight:600,marginRight:"16px"},children:(0,x.vv)(e.total_cost||0,a)}),(0,h.jsx)(s.$n,{variant:"danger",onClick:()=>(e=>{oe(ae.filter((i,t)=>t!==e))})(i),style:{padding:"4px 8px",fontSize:"12px"},children:"Remove"})]},i))}),(0,h.jsxs)(N,{children:[(0,h.jsxs)(l.FX,{value:ce,onChange:e=>{le(e.target.value);const i=ne.find(i=>i.id===parseInt(e.target.value));i&&he(i.unit)},children:[(0,h.jsx)("option",{value:"",children:"Select Ingredient"}),ne.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.name," (",(0,x.vv)(e.unit_cost,a),"/",e.unit,")"]},e.id))]}),(0,h.jsx)(l.ZQ,{type:"number",step:"0.01",min:"0",placeholder:"Quantity",value:pe,onChange:e=>xe(e.target.value)}),(0,h.jsx)(l.ZQ,{type:"text",placeholder:"Unit",value:ue,onChange:e=>he(e.target.value)}),(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>{if(!ce||!pe||!ue)return;const e=ne.find(e=>e.id===parseInt(ce));if(!e)return;const i=parseFloat(pe),t={ingredient_id:e.id,ingredient_name:e.name,quantity:i,unit:ue,unit_cost:e.unit_cost,total_cost:e.unit_cost*i};oe([...ae,t]),le(""),xe(""),he("")},children:"Add"})]}),(0,h.jsxs)(O,{children:[(0,h.jsxs)(T,{children:[(0,h.jsx)("span",{children:"Total Ingredient Cost:"}),(0,h.jsx)("span",{children:(0,x.vv)(je(),a)})]}),(0,h.jsxs)(T,{children:[(0,h.jsx)("span",{children:"Product Price:"}),(0,h.jsx)("span",{children:(0,x.vv)(ie.unit_price,a)})]}),(0,h.jsxs)(T,{children:[(0,h.jsx)("span",{children:"Profit Margin:"}),(0,h.jsx)("span",{children:ie.unit_price>0?`${((ie.unit_price-je())/ie.unit_price*100).toFixed(1)}%`:"0%"})]})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"24px"},children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>ee(!1),children:"Cancel"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(ie)try{if(de(!0),ie.has_recipe&&ie.recipe_id){const e=await(0,u.ff)(`/api/brand-products/${ie.id}/recipe/ingredients`,{method:"PUT",body:JSON.stringify({ingredients:ae.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity,unit:e.unit,notes:e.notes}))})});e.success?(alert("Recipe updated successfully"),ee(!1),me()):alert(e.message||"Failed to update recipe")}else{const e=await(0,u.ff)(`/api/brand-products/${ie.id}/recipe`,{method:"POST",body:JSON.stringify({name:`${ie.name} Recipe`,ingredients:ae.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity,unit:e.unit,notes:e.notes}))})});e.success?(alert("Recipe created successfully"),ee(!1),me()):alert(e.message||"Failed to create recipe")}}catch(e){console.error("Failed to save recipe:",e),alert("Failed to save recipe")}finally{de(!1)}},disabled:se,children:se?"Saving...":"Save Recipe"})]})]})})]})},U=r.Ay.div`
  padding: 0;
`,q=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,Q=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,W=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,J=r.Ay.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
`,Z=r.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 18px;
`,H=r.Ay.div``,Y=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`,X=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,V=r.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>e.active?"#ECFDF5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,K=r.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"out"===e.status?"#FEE2E2":"low"===e.status?"#FEF3C7":"#ECFDF5"};
  color: ${e=>"out"===e.status?"#DC2626":"low"===e.status?"#D97706":"#059669"};
`,G=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,ee=e=>{let{onCountChange:i,categoryRefreshKey:t}=e;const{defaultCurrency:r}=(0,p.i1)(),[a,o]=(0,n.useState)("RM"),[d,g]=(0,n.useState)([]),[m,y]=(0,n.useState)([]),[j,v]=(0,n.useState)(!0),[f,b]=(0,n.useState)(""),[k,F]=(0,n.useState)("all"),[w,C]=(0,n.useState)(!1),[_,A]=(0,n.useState)(null),[E,S]=(0,n.useState)(!1),[z,B]=(0,n.useState)({name:"",category_id:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0});(0,n.useEffect)(()=>{r&&o(r)},[r]);const $=(0,n.useCallback)(async()=>{try{v(!0);const[t,n]=await Promise.all([(0,u.ff)("/api/product-ingredients"),(0,u.ff)("/api/product-ingredient-categories")]);var e;if(t.success)g(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0);n.success&&y(n.data||[])}catch(t){console.error("Failed to fetch data:",t)}finally{v(!1)}},[i]);(0,n.useEffect)(()=>{$()},[$,t]);const R=e=>{var i;e?(A(e),B({name:e.name,category_id:(null===(i=e.category_id)||void 0===i?void 0:i.toString())||"",unit:e.unit,base_quantity:e.base_quantity.toString(),unit_cost:e.unit_cost.toString(),supplier_name:e.supplier_name||"",min_stock:e.min_stock.toString(),min_order:e.min_order.toString(),current_stock:e.current_stock.toString(),track_stock:e.track_stock})):(A(null),B({name:"",category_id:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0}));C(!0)},L=e=>e.track_stock?e.current_stock<=0?"out":e.current_stock<=e.min_stock?"low":"normal":"normal",P=d.filter(e=>{var i;const t=e.name.toLowerCase().includes(f.toLowerCase())||e.code.toLowerCase().includes(f.toLowerCase()),n="all"===k||(null===(i=e.category_id)||void 0===i?void 0:i.toString())===k;return t&&n});return j?(0,h.jsx)(U,{children:"Loading..."}):(0,h.jsxs)(U,{children:[(0,h.jsxs)(q,{children:[(0,h.jsxs)(Q,{children:["Ingredients (",d.length,")"]}),(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>R(),children:"Add Ingredient"})]}),(0,h.jsxs)(c.Qn,{children:[(0,h.jsx)(c.DO,{type:"text",placeholder:"Search ingredients...",value:f,onChange:e=>b(e.target.value)}),(0,h.jsxs)(c.Jt,{value:k,onChange:e=>F(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),m.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),0===P.length?(0,h.jsxs)(s.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No ingredients found"}),(0,h.jsx)("div",{style:{fontSize:"14px",marginBottom:"16px"},children:"Add ingredients to use in your product recipes"}),(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>R(),children:"Add First Ingredient"})]}):(0,h.jsxs)(s.XI,{children:[(0,h.jsxs)(s.A0,{columns:"2fr 1fr 1fr 1fr 1fr 120px",children:[(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Category"}),(0,h.jsx)("span",{children:"Unit Cost"}),(0,h.jsx)("span",{children:"Stock"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Actions"})]}),P.map(e=>{var i,t;return(0,h.jsxs)(s.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 120px",children:[(0,h.jsxs)(s.Np,{children:[(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Ingredient"}),(0,h.jsxs)(W,{children:[e.image_url?(0,h.jsx)(J,{src:e.image_url,alt:e.name}):(0,h.jsx)(Z,{children:(null===(i=e.category)||void 0===i?void 0:i.emoji)||"\ud83d\udce6"}),(0,h.jsxs)(H,{children:[(0,h.jsx)(Y,{children:e.name}),(0,h.jsx)(X,{children:e.code})]})]})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Category"}),(0,h.jsx)("span",{children:(null===(t=e.category)||void 0===t?void 0:t.name)||"-"})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Unit Cost"}),(0,h.jsxs)("span",{children:[(0,x.vv)(e.unit_cost,a),"/",e.unit]})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Stock"}),e.track_stock?(0,h.jsxs)(K,{status:L(e),children:[e.current_stock," ",e.unit]}):(0,h.jsx)("span",{style:{color:"#9CA3AF"},children:"Not tracked"})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Status"}),(0,h.jsx)(V,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]})]}),(0,h.jsxs)(s.wr,{children:[(0,h.jsx)(s.$n,{variant:"secondary",onClick:()=>R(e),style:{padding:"6px 12px",fontSize:"12px"},children:"Edit"}),(0,h.jsx)(s.$n,{variant:"danger",onClick:()=>(async e=>{if(confirm(`Are you sure you want to delete "${e.name}"?`))try{const i=await(0,u.ff)(`/api/product-ingredients/${e.id}`,{method:"DELETE"});i.success?$():alert(i.error||"Failed to delete ingredient")}catch(i){console.error("Failed to delete ingredient:",i),alert("Failed to delete ingredient")}})(e),style:{padding:"6px 12px",fontSize:"12px"},children:"Delete"})]})]},e.id)})]}),(0,h.jsxs)(l.aF,{isOpen:w,onClose:()=>C(!1),title:_?"Edit Ingredient":"Add Ingredient",size:"large",children:[(0,h.jsxs)(G,{children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Name *"}),(0,h.jsx)(l.ZQ,{value:z.name,onChange:e=>B({...z,name:e.target.value}),placeholder:"e.g., Chicken Breast"})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Category"}),(0,h.jsxs)(l.FX,{value:z.category_id,onChange:e=>B({...z,category_id:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"Select Category"}),m.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]})]}),(0,h.jsxs)(G,{children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Unit *"}),(0,h.jsx)(l.ZQ,{value:z.unit,onChange:e=>B({...z,unit:e.target.value}),placeholder:"e.g., kg, pcs, ml"})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsxs)(l.lR,{children:["Unit Cost (",a,")"]}),(0,h.jsx)(l.ZQ,{type:"number",step:"0.01",min:"0",value:z.unit_cost,onChange:e=>B({...z,unit_cost:e.target.value})})]})]}),(0,h.jsxs)(G,{children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Supplier"}),(0,h.jsx)(l.ZQ,{value:z.supplier_name,onChange:e=>B({...z,supplier_name:e.target.value}),placeholder:"Supplier name"})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Track Stock"}),(0,h.jsxs)(l.FX,{value:z.track_stock?"yes":"no",onChange:e=>B({...z,track_stock:"yes"===e.target.value}),children:[(0,h.jsx)("option",{value:"yes",children:"Yes"}),(0,h.jsx)("option",{value:"no",children:"No"})]})]})]}),z.track_stock&&(0,h.jsxs)(G,{children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Current Stock"}),(0,h.jsx)(l.ZQ,{type:"number",step:"0.01",min:"0",value:z.current_stock,onChange:e=>B({...z,current_stock:e.target.value})})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Min Stock (Alert)"}),(0,h.jsx)(l.ZQ,{type:"number",step:"0.01",min:"0",value:z.min_stock,onChange:e=>B({...z,min_stock:e.target.value})})]})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"24px"},children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>C(!1),children:"Cancel"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(z.name.trim()&&z.unit.trim())try{S(!0);const e=_?`/api/product-ingredients/${_.id}`:"/api/product-ingredients",i=_?"PUT":"POST",t=await(0,u.ff)(e,{method:i,body:JSON.stringify({name:z.name,category_id:z.category_id?parseInt(z.category_id):null,unit:z.unit,base_quantity:parseFloat(z.base_quantity)||1,unit_cost:parseFloat(z.unit_cost)||0,supplier_name:z.supplier_name||null,min_stock:parseFloat(z.min_stock)||0,min_order:parseFloat(z.min_order)||0,current_stock:parseFloat(z.current_stock)||0,track_stock:z.track_stock})});t.success?(C(!1),$()):alert(t.error||"Failed to save ingredient")}catch(e){console.error("Failed to save ingredient:",e),alert("Failed to save ingredient")}finally{S(!1)}else alert("Name and Unit are required")},disabled:E,children:E?"Saving...":"Save"})]})]})]})},ie=r.Ay.div`
  padding: 0;
`,te=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,ne=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,re=r.Ay.div`
  display: grid;
  gap: 12px;
`,ae=r.Ay.div`
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
`,oe=r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,se=r.Ay.div`
  flex: 1;
`,de=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,ce=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,le=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,pe=r.Ay.div`
  display: flex;
  gap: 8px;
`,xe=r.Ay.button`
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
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ue=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,he=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,ge=r.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,me=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,ye=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,je=r.Ay.button`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: ${e=>e.selected?"#E5E7EB":"white"};
  border: 1px solid ${e=>e.selected?"#9CA3AF":"#E5E7EB"};
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${e=>e.selected?"#E5E7EB":"#F3F4F6"};
  }
`,ve=e=>{let{onCountChange:i}=e;const[t,r]=(0,n.useState)([]),[a,o]=(0,n.useState)(!0),[d,c]=(0,n.useState)(!1),[p,x]=(0,n.useState)(null),[g,m]=(0,n.useState)(!1),[y,j]=(0,n.useState)({name:"",emoji:"",description:""}),v=(0,n.useCallback)(async()=>{try{o(!0);const t=await(0,u.ff)("/api/product-recipe-categories");var e;if(t.success)r(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{o(!1)}},[i]);(0,n.useEffect)(()=>{v()},[v]);const f=e=>{e?(x(e),j({name:e.name,emoji:e.emoji||"",description:e.description||""})):(x(null),j({name:"",emoji:"",description:""})),c(!0)};return a?(0,h.jsx)(ie,{children:"Loading..."}):(0,h.jsxs)(ie,{children:[(0,h.jsxs)(te,{children:[(0,h.jsxs)(ne,{children:["Recipe Categories (",t.length,")"]}),(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>f(),children:"Add Category"})]}),0===t.length?(0,h.jsxs)(he,{children:[(0,h.jsx)(ge,{children:"No categories yet"}),(0,h.jsx)(me,{children:"Create categories to organize your product recipes"}),(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>f(),children:"Add First Category"})]}):(0,h.jsx)(re,{children:t.map(e=>(0,h.jsxs)(ae,{isActive:e.is_active,children:[(0,h.jsx)(oe,{children:e.emoji||"\ud83d\udcc1"}),(0,h.jsxs)(se,{children:[(0,h.jsx)(de,{children:e.name}),(0,h.jsxs)(ce,{children:[(0,h.jsxs)("span",{children:[e.recipe_count||0," recipes"]}),(0,h.jsx)(ue,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,h.jsx)(le,{children:e.description})]}),(0,h.jsxs)(pe,{children:[(0,h.jsx)(xe,{onClick:()=>f(e),title:"Edit",children:(0,h.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),(0,h.jsx)(xe,{onClick:()=>(async e=>{try{(await(0,u.ff)(`/api/product-recipe-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&v()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,h.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.is_active?(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"}):(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})})}),(0,h.jsx)(xe,{onClick:()=>(async e=>{if(confirm(`Are you sure you want to delete "${e.name}"?`))try{const i=await(0,u.ff)(`/api/product-recipe-categories/${e.id}`,{method:"DELETE"});i.success?v():alert(i.error||"Failed to delete category")}catch(i){console.error("Failed to delete category:",i),alert("Failed to delete category")}})(e),title:"Delete",disabled:(e.recipe_count||0)>0,children:(0,h.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]},e.id))}),(0,h.jsxs)(l.aF,{isOpen:d,onClose:()=>c(!1),title:p?"Edit Category":"Add Category",size:"medium",children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Name *"}),(0,h.jsx)(l.ZQ,{value:y.name,onChange:e=>j({...y,name:e.target.value}),placeholder:"e.g., Main Dishes"})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Emoji"}),(0,h.jsx)(ye,{children:["\ud83c\udf54","\ud83c\udf55","\ud83c\udf57","\ud83e\udd57","\ud83c\udf5c","\ud83c\udf5d","\ud83c\udf64","\ud83e\udd58","\ud83c\udf5b","\ud83c\udf72","\u2615","\ud83e\udd64","\ud83e\uddc3","\ud83c\udf75","\ud83e\uddcb","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd43","\ud83c\udf79","\ud83c\udf78","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf68","\ud83c\udf67","\ud83c\udf66","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6b","\ud83e\udd50","\ud83e\udd56","\ud83c\udf5e","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf71","\ud83c\udf59","\ud83c\udf58","\ud83c\udf63","\ud83c\udf65","\ud83c\udf61","\ud83c\udf62","\ud83c\udf60","\ud83e\udd5f","\ud83e\udd60","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf5f","\ud83e\uded3","\ud83e\udd53","\ud83e\uddc6"].map(e=>(0,h.jsx)(je,{selected:y.emoji===e,onClick:()=>j({...y,emoji:e}),children:e},e))})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Description"}),(0,h.jsx)(l.Lz,{value:y.description,onChange:e=>j({...y,description:e.target.value}),placeholder:"Optional description",rows:3})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"24px"},children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>c(!1),children:"Cancel"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(y.name.trim())try{m(!0);const e=p?`/api/product-recipe-categories/${p.id}`:"/api/product-recipe-categories",i=p?"PUT":"POST",t=await(0,u.ff)(e,{method:i,body:JSON.stringify(y)});t.success?(c(!1),v()):alert(t.error||"Failed to save category")}catch(e){console.error("Failed to save category:",e),alert("Failed to save category")}finally{m(!1)}else alert("Category name is required")},disabled:g,children:g?"Saving...":"Save"})]})]})]})},fe=r.Ay.div`
  padding: 0;
`,be=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,ke=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,Fe=r.Ay.div`
  display: grid;
  gap: 12px;
`,we=r.Ay.div`
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
`,Ce=r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,_e=r.Ay.div`
  flex: 1;
`,Ae=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Ee=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,Se=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,ze=r.Ay.div`
  display: flex;
  gap: 8px;
`,Be=r.Ay.button`
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
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,$e=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,Re=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,Le=r.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Pe=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,De=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,Me=r.Ay.button`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: ${e=>e.selected?"#E5E7EB":"white"};
  border: 1px solid ${e=>e.selected?"#9CA3AF":"#E5E7EB"};
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${e=>e.selected?"#E5E7EB":"#F3F4F6"};
  }
`,Ne=e=>{let{onCountChange:i}=e;const[t,r]=(0,n.useState)([]),[a,o]=(0,n.useState)(!0),[d,c]=(0,n.useState)(!1),[p,x]=(0,n.useState)(null),[g,m]=(0,n.useState)(!1),[y,j]=(0,n.useState)({name:"",emoji:"",description:""}),v=(0,n.useCallback)(async()=>{try{o(!0);const t=await(0,u.ff)("/api/product-ingredient-categories");var e;if(t.success)r(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{o(!1)}},[i]);(0,n.useEffect)(()=>{v()},[v]);const f=e=>{e?(x(e),j({name:e.name,emoji:e.emoji||"",description:e.description||""})):(x(null),j({name:"",emoji:"",description:""})),c(!0)};return a?(0,h.jsx)(fe,{children:"Loading..."}):(0,h.jsxs)(fe,{children:[(0,h.jsxs)(be,{children:[(0,h.jsxs)(ke,{children:["Ingredient Categories (",t.length,")"]}),(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>f(),children:"Add Category"})]}),0===t.length?(0,h.jsxs)(Re,{children:[(0,h.jsx)(Le,{children:"No categories yet"}),(0,h.jsx)(Pe,{children:"Create categories to organize your ingredients"}),(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>f(),children:"Add First Category"})]}):(0,h.jsx)(Fe,{children:t.map(e=>(0,h.jsxs)(we,{isActive:e.is_active,children:[(0,h.jsx)(Ce,{children:e.emoji||"\ud83d\udcc1"}),(0,h.jsxs)(_e,{children:[(0,h.jsx)(Ae,{children:e.name}),(0,h.jsxs)(Ee,{children:[(0,h.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),(0,h.jsx)($e,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,h.jsx)(Se,{children:e.description})]}),(0,h.jsxs)(ze,{children:[(0,h.jsx)(Be,{onClick:()=>f(e),title:"Edit",children:(0,h.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})})}),(0,h.jsx)(Be,{onClick:()=>(async e=>{try{(await(0,u.ff)(`/api/product-ingredient-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&v()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,h.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.is_active?(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"}):(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})})}),(0,h.jsx)(Be,{onClick:()=>(async e=>{if(confirm(`Are you sure you want to delete "${e.name}"?`))try{const i=await(0,u.ff)(`/api/product-ingredient-categories/${e.id}`,{method:"DELETE"});i.success?v():alert(i.error||"Failed to delete category")}catch(i){console.error("Failed to delete category:",i),alert("Failed to delete category")}})(e),title:"Delete",disabled:(e.ingredient_count||0)>0,children:(0,h.jsx)("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,h.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"})})})]})]},e.id))}),(0,h.jsxs)(l.aF,{isOpen:d,onClose:()=>c(!1),title:p?"Edit Category":"Add Category",size:"medium",children:[(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Name *"}),(0,h.jsx)(l.ZQ,{value:y.name,onChange:e=>j({...y,name:e.target.value}),placeholder:"e.g., Proteins"})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Emoji"}),(0,h.jsx)(De,{children:["\ud83e\udd69","\ud83c\udf56","\ud83e\udd53","\ud83c\udf57","\ud83e\udd90","\ud83e\udd9e","\ud83e\udd80","\ud83d\udc1f","\ud83e\udd5a","\ud83e\uddc0","\ud83e\udd6c","\ud83e\udd66","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83e\udd52","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83c\udf4e","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd5d","\ud83c\udf4c","\ud83e\udd6d","\ud83c\udf4d","\ud83e\uddc8","\ud83e\udd5b","\ud83e\uddc2","\ud83c\udf6f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5a","\ud83c\udf5d","\ud83e\udd6b","\ud83e\uddca","\ud83d\udca7","\ud83c\udf76","\ud83e\uded7","\ud83e\uddf4","\ud83e\uddf9","\ud83e\uddfd","\ud83d\udce6","\ud83c\udff7\ufe0f","\ud83d\udd16"].map(e=>(0,h.jsx)(Me,{selected:y.emoji===e,onClick:()=>j({...y,emoji:e}),children:e},e))})]}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Description"}),(0,h.jsx)(l.Lz,{value:y.description,onChange:e=>j({...y,description:e.target.value}),placeholder:"Optional description",rows:3})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"24px"},children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>c(!1),children:"Cancel"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(y.name.trim())try{m(!0);const e=p?`/api/product-ingredient-categories/${p.id}`:"/api/product-ingredient-categories",i=p?"PUT":"POST",t=await(0,u.ff)(e,{method:i,body:JSON.stringify(y)});t.success?(c(!1),v()):alert(t.error||"Failed to save category")}catch(e){console.error("Failed to save category:",e),alert("Failed to save category")}finally{m(!1)}else alert("Category name is required")},disabled:g,children:g?"Saving...":"Save"})]})]})]})},Oe=r.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  margin-left: 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
`,Te=()=>{const{user:e}=(0,d.As)(),[i,t]=(0,a.ok)(),[r,c]=(0,n.useState)(0),[l,p]=(0,n.useState)(0),[x,u]=(0,n.useState)(0),[g,m]=(0,n.useState)(0),[y,j]=(0,n.useState)(0),v=i.get("tab")||"recipes",f=null===e||void 0===e?void 0:e.brand_id,b=e=>{t({tab:e})};return f?(0,h.jsx)(o.A,{children:(0,h.jsxs)(s.mc,{children:[(0,h.jsx)(s.Y9,{children:(0,h.jsx)(s.hE,{children:"Product Recipes"})}),(0,h.jsxs)(s.UC,{children:[(0,h.jsxs)(s.j,{children:[(0,h.jsxs)(s.oz,{active:"recipes"===v,onClick:()=>b("recipes"),children:["Recipes",(0,h.jsx)(Oe,{children:r})]}),(0,h.jsxs)(s.oz,{active:"ingredients"===v,onClick:()=>b("ingredients"),children:["Ingredients",(0,h.jsx)(Oe,{children:l})]}),(0,h.jsxs)(s.oz,{active:"recipe-categories"===v,onClick:()=>b("recipe-categories"),children:["Recipe Categories",(0,h.jsx)(Oe,{children:x})]}),(0,h.jsxs)(s.oz,{active:"ingredient-categories"===v,onClick:()=>b("ingredient-categories"),children:["Ingredient Categories",(0,h.jsx)(Oe,{children:g})]})]}),(0,h.jsx)("div",{style:{display:"recipes"===v?"block":"none"},children:(0,h.jsx)(I,{onCountChange:c})}),(0,h.jsx)("div",{style:{display:"ingredients"===v?"block":"none"},children:(0,h.jsx)(ee,{onCountChange:p,categoryRefreshKey:y})}),(0,h.jsx)("div",{style:{display:"recipe-categories"===v?"block":"none"},children:(0,h.jsx)(ve,{onCountChange:u})}),(0,h.jsx)("div",{style:{display:"ingredient-categories"===v?"block":"none"},children:(0,h.jsx)(Ne,{onCountChange:m,onCategoryChange:()=>j(e=>e+1)})})]})]})}):(0,h.jsx)(o.A,{children:(0,h.jsxs)(s.mc,{children:[(0,h.jsx)(s.Y9,{children:(0,h.jsx)(s.hE,{children:"Product Recipes"})}),(0,h.jsx)(s.UC,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Brand not found. Please log in with a brand account."})})]})})}}}]);