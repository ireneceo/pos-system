"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8844],{1840:(e,i,t)=>{t.d(i,{ff:()=>a});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const r="";n();async function a(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${r}${e}`,n=localStorage.getItem("auth_token"),a={credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...i.headers},...i},s=await fetch(t,a);if(!s.ok){const e=await s.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${s.status}`)}return s.json()}},2488:(e,i,t)=>{t.d(i,{DO:()=>p,Jt:()=>x,Qn:()=>l});t(9950);var n=t(4752),r=t(4414);const a=n.Ay.div`
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
`,s=n.Ay.input`
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
`,o=n.Ay.div`
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
`,d=n.Ay.button`
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
`,c=n.Ay.select`
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
`,l=e=>{let{children:i,className:t,style:n,...s}=e;return(0,r.jsx)(a,{className:t,style:n,...s,children:i})},p=e=>{let{placeholder:i="Search...",value:t,onChange:n,style:a,...c}=e;return(0,r.jsxs)(o,{style:a,children:[(0,r.jsx)(s,{placeholder:i,value:t,onChange:n,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:t?"36px":"16px"},...c}),t&&(0,r.jsx)(d,{type:"button",onClick:()=>null===n||void 0===n?void 0:n({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:i,...t}=e;return(0,r.jsx)(c,{...t,children:i})}},4021:(e,i,t)=>{t.d(i,{i1:()=>s});var n=t(9950),r=t(1367),a=t(6038);const s=()=>{const{user:e}=(0,r.As)(),[i,t]=(0,n.useState)("RM"),[s]=(0,n.useState)(Object.keys(a.DL)),[o,d]=(0,n.useState)(!0),[c,l]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const i=window.location.pathname.split("/"),n=i.indexOf("restaurant");let r=n>=0?i[n+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){var a;const e=await i.json(),n=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";t(n)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),l("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:i,supportedCurrencies:s,loading:o,error:c}}},8844:(e,i,t)=>{t.r(i),t.d(i,{default:()=>S});var n=t(9950),r=t(4492),a=t(4752),s=t(8409),o=t(2488),d=t(1367),c=t(9610),l=t(4021),p=t(6038),x=t(1840),h=t(4414);const u=a.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,g=a.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>e.hasRecipe?"#ECFDF5":"#FEF3C7"};
  color: ${e=>e.hasRecipe?"#059669":"#D97706"};
`,m=a.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>e.profit>=60?"#ECFDF5":e.profit>=40?"#FEF3C7":"#FEE2E2"};
  color: ${e=>e.profit>=60?"#059669":e.profit>=40?"#D97706":"#DC2626"};
`,f=a.Ay.div``,y=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,j=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,v=a.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  margin: 16px 0;
`,w=a.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    border-bottom: none;
  }
`,b=a.Ay.div`
  flex: 1;
`,F=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 80px;
  gap: 12px;
  padding: 16px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-top: 16px;
`,C=a.Ay.div`
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,k=a.Ay.div`
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
`,S=()=>{const{user:e}=(0,d.As)(),{restaurantId:i}=(0,r.g)(),{defaultCurrency:t}=(0,l.i1)(),[a,S]=(0,n.useState)("RM"),[A,_]=(0,n.useState)(!0),[E,R]=(0,n.useState)([]),[$,P]=(0,n.useState)(""),[z,B]=(0,n.useState)("all"),[M,N]=(0,n.useState)("all"),[I,L]=(0,n.useState)([]),[O,D]=(0,n.useState)(!1),[T,U]=(0,n.useState)(!1),[q,W]=(0,n.useState)(null),[J,Q]=(0,n.useState)([]),[H,X]=(0,n.useState)(""),[Y,Z]=(0,n.useState)([]),[V,G]=(0,n.useState)([]),[K,ee]=(0,n.useState)(""),[ie,te]=(0,n.useState)(""),[ne,re]=(0,n.useState)(""),[ae,se]=(0,n.useState)(!1),oe=i?parseInt(i,10):null===e||void 0===e?void 0:e.restaurant_id;(0,n.useEffect)(()=>{t&&S(t)},[t]);const de=(0,n.useCallback)(async()=>{if(oe)try{_(!0);const e=await(0,x.ff)(`/api/restaurants/${oe}/products/recipe-status`);if(e.success){R(e.data||[]);const i=[];e.data.forEach(e=>{e.category&&!i.includes(e.category)&&i.push(e.category)}),L(i)}}catch(e){console.error("Failed to fetch products:",e)}finally{_(!1)}},[oe]);(0,n.useEffect)(()=>{de()},[de]);const ce=async e=>{W(e),await(async()=>{try{const e=await(0,x.ff)(`/api/restaurants/${oe}/ingredients`);e.success&&Z(e.data||[])}catch(e){console.error("Failed to fetch ingredients:",e)}})(),e.has_recipe?await(async e=>{try{const i=await(0,x.ff)(`/api/restaurants/${oe}/products/${e}/recipe`);i.success&&i.data.recipe?G(i.data.recipe.ingredients||[]):G([])}catch(i){console.error("Failed to fetch product recipe:",i),G([])}})(e.id):G([]),D(!0)},le=async e=>{var i;W(e),X((null===(i=e.recipe_id)||void 0===i?void 0:i.toString())||""),await(async()=>{try{const e=await(0,x.ff)(`/api/restaurants/${oe}/recipes/available`);e.success&&Q(e.data||[])}catch(e){console.error("Failed to fetch recipes:",e)}})(),U(!0)},pe=()=>V.reduce((e,i)=>e+(i.total_cost||0),0),xe=E.filter(e=>{var i;const t=e.name.toLowerCase().includes($.toLowerCase())||(null===(i=e.code)||void 0===i?void 0:i.toLowerCase().includes($.toLowerCase())),n="all"===z||"with"===z&&e.has_recipe||"without"===z&&!e.has_recipe,r="all"===M||e.category===M;return t&&n&&r});return oe?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(s.mc,{children:[(0,h.jsxs)(s.Y9,{children:[(0,h.jsx)(s.hE,{children:"Product Recipes"}),(0,h.jsx)(s.ex,{children:(0,h.jsx)(s.$n,{variant:"secondary",onClick:()=>window.location.href=`/restaurant/${oe}/recipe-management`,children:"Manage Recipes"})})]}),(0,h.jsxs)(s.UC,{children:[(0,h.jsx)(u,{children:"Link recipes to your menu items to track ingredient costs and manage inventory deduction when products are sold."}),(0,h.jsxs)(o.Qn,{children:[(0,h.jsx)(o.DO,{type:"text",placeholder:"Search products...",value:$,onChange:e=>P(e.target.value)}),(0,h.jsxs)(o.Jt,{value:z,onChange:e=>B(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Products"}),(0,h.jsx)("option",{value:"with",children:"With Recipe"}),(0,h.jsx)("option",{value:"without",children:"Without Recipe"})]}),(0,h.jsxs)(o.Jt,{value:M,onChange:e=>N(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),I.map(e=>(0,h.jsx)("option",{value:e,children:e},e))]})]}),A?(0,h.jsx)(s.pp,{children:"Loading..."}):0===xe.length?(0,h.jsxs)(s.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No products found"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:"Add products in the Menu page first."})]}):(0,h.jsxs)(s.XI,{children:[(0,h.jsxs)(s.A0,{columns:"2fr 1fr 1fr 1fr 1fr 150px",children:[(0,h.jsx)("span",{children:"Product"}),(0,h.jsx)("span",{children:"Price"}),(0,h.jsx)("span",{children:"Recipe Status"}),(0,h.jsx)("span",{children:"Ingredient Cost"}),(0,h.jsx)("span",{children:"Profit Margin"}),(0,h.jsx)("span",{children:"Actions"})]}),xe.map(e=>(0,h.jsxs)(s.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 150px",children:[(0,h.jsxs)(s.Np,{children:[(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Product"}),(0,h.jsxs)(f,{children:[(0,h.jsx)(y,{children:e.name}),(0,h.jsxs)(j,{children:[e.category," ",e.code&&`- ${e.code}`]})]})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Price"}),(0,h.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(0,p.vv)(e.price,a)})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Recipe Status"}),(0,h.jsx)(g,{hasRecipe:e.has_recipe,children:e.has_recipe?"Linked":"No Recipe"})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Ingredient Cost"}),(0,h.jsx)("div",{style:{color:e.has_recipe?"#0A2540":"#9CA3AF"},children:e.has_recipe?(0,p.vv)(e.ingredient_cost,a):"-"})]}),(0,h.jsxs)(s.Uj,{children:[(0,h.jsx)(s.PM,{children:"Profit Margin"}),e.profit_margin?(0,h.jsxs)(m,{profit:parseFloat(e.profit_margin),children:[e.profit_margin,"%"]}):(0,h.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]})]}),(0,h.jsxs)(s.wr,{children:[(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>ce(e),style:{padding:"6px 12px",fontSize:"12px"},children:e.has_recipe?"Edit":"Create"}),(0,h.jsx)(s.$n,{variant:"secondary",onClick:()=>le(e),style:{padding:"6px 12px",fontSize:"12px"},children:"Link"})]})]},e.id))]})]})]}),(0,h.jsx)(c.aF,{isOpen:O,onClose:()=>D(!1),title:`Recipe: ${(null===q||void 0===q?void 0:q.name)||""}`,size:"large",children:q&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(u,{children:"Add ingredients required to make this product. Costs are calculated automatically."}),(0,h.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,h.jsx)("strong",{children:"Product Price:"})," ",(0,p.vv)(q.price,a)]}),V.length>0&&(0,h.jsx)(v,{children:V.map((e,i)=>(0,h.jsxs)(w,{children:[(0,h.jsxs)(b,{children:[(0,h.jsx)("div",{style:{fontWeight:600},children:e.ingredient_name}),(0,h.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[e.quantity," ",e.unit," x ",(0,p.vv)(e.unit_cost||0,a)]})]}),(0,h.jsx)("div",{style:{fontWeight:600,marginRight:"16px"},children:(0,p.vv)(e.total_cost||0,a)}),(0,h.jsx)(s.$n,{variant:"danger",onClick:()=>(e=>{G(V.filter((i,t)=>t!==e))})(i),style:{padding:"4px 8px",fontSize:"12px"},children:"Remove"})]},i))}),(0,h.jsxs)(F,{children:[(0,h.jsxs)(c.FX,{value:K,onChange:e=>{ee(e.target.value);const i=Y.find(i=>i.id===parseInt(e.target.value));i&&re(i.unit)},children:[(0,h.jsx)("option",{value:"",children:"Select Ingredient"}),Y.map(e=>{const i=e.unit_cost/(e.base_quantity||1);return(0,h.jsxs)("option",{value:e.id,children:[e.name," (",(0,p.vv)(i,a),"/",e.unit,")"]},e.id)})]}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",placeholder:"Quantity",value:ie,onChange:e=>te(e.target.value)}),(0,h.jsx)(c.ZQ,{type:"text",placeholder:"Unit",value:ne,onChange:e=>re(e.target.value)}),(0,h.jsx)(s.$n,{variant:"primary",onClick:()=>{if(!K||!ie||!ne)return;const e=Y.find(e=>e.id===parseInt(K));if(!e)return;const i=parseFloat(ie),t=e.base_quantity||1,n=e.unit_cost/t,r={ingredient_id:e.id,ingredient_name:e.name,quantity:i,unit:ne,unit_cost:n,total_cost:n*i};G([...V,r]),ee(""),te(""),re("")},children:"Add"})]}),(0,h.jsxs)(C,{children:[(0,h.jsxs)(k,{children:[(0,h.jsx)("span",{children:"Total Ingredient Cost:"}),(0,h.jsx)("span",{children:(0,p.vv)(pe(),a)})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)("span",{children:"Product Price:"}),(0,h.jsx)("span",{children:(0,p.vv)(q.price,a)})]}),(0,h.jsxs)(k,{children:[(0,h.jsx)("span",{children:"Profit Margin:"}),(0,h.jsx)("span",{children:q.price>0?`${((q.price-pe())/q.price*100).toFixed(1)}%`:"0%"})]})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"24px"},children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>D(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(q)try{if(se(!0),q.has_recipe&&q.recipe_id){const e=await(0,x.ff)(`/api/restaurants/${oe}/products/${q.id}/recipe/ingredients`,{method:"PUT",body:JSON.stringify({ingredients:V.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity,unit:e.unit,notes:e.notes}))})});e.success?(alert("Recipe updated successfully"),D(!1),de()):alert(e.message||"Failed to update recipe")}else{const e=await(0,x.ff)(`/api/restaurants/${oe}/products/${q.id}/recipe`,{method:"POST",body:JSON.stringify({name:`${q.name} Recipe`,ingredients:V.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity,unit:e.unit,notes:e.notes}))})});e.success?(alert("Recipe created and linked successfully"),D(!1),de()):alert(e.message||"Failed to create recipe")}}catch(e){console.error("Failed to save recipe:",e),alert("Failed to save recipe")}finally{se(!1)}},disabled:ae,children:ae?"Saving...":"Save Recipe"})]})]})}),(0,h.jsx)(c.aF,{isOpen:T,onClose:()=>U(!1),title:`Link Recipe: ${(null===q||void 0===q?void 0:q.name)||""}`,size:"medium",children:q&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(u,{children:'Select an existing recipe to link to this product, or choose "No Recipe" to remove the current link.'}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Select Recipe"}),(0,h.jsxs)(c.FX,{value:H,onChange:e=>X(e.target.value),children:[(0,h.jsx)("option",{value:"",children:"No Recipe"}),J.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.name," ","brand"===e.owner_type?"(Brand)":""," - ",(0,p.vv)(e.total_ingredient_cost,a)]},e.id))]})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"24px"},children:[(0,h.jsx)(c.yl,{variant:"secondary",onClick:()=>U(!1),children:"Cancel"}),(0,h.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(q)try{se(!0);const e=await(0,x.ff)(`/api/restaurants/${oe}/products/${q.id}/recipe`,{method:"PUT",body:JSON.stringify({recipe_id:H?parseInt(H):null})});e.success?(alert(H?"Recipe linked successfully":"Recipe unlinked successfully"),U(!1),de()):alert(e.message||"Failed to update recipe link")}catch(e){console.error("Failed to link recipe:",e),alert("Failed to update recipe link")}finally{se(!1)}},disabled:ae,children:ae?"Saving...":"Save"})]})]})})]}):(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(s.mc,{children:(0,h.jsx)(s.pp,{children:(0,h.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})})}}}]);