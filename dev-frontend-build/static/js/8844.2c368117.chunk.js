"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8844],{1840:(e,i,t)=>{t.d(i,{ff:()=>a});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const r="";n();async function a(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${r}${e}`,n=localStorage.getItem("auth_token"),a={credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...i.headers},...i},s=await fetch(t,a);if(!s.ok){const e=await s.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${s.status}`)}return s.json()}},2488:(e,i,t)=>{t.d(i,{DO:()=>l,Jt:()=>p,Qn:()=>c});var n=t(8819),r=(t(9950),t(4752)),a=t(4414);const s=r.Ay.div`
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
`,o=r.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${n.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
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
`,d=r.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
  }

  &:disabled {
    background: ${n.w.colors.surfaceHover};
    color: ${n.w.colors.text.muted};
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
`,c=e=>{let{children:i,className:t,style:n,...r}=e;return(0,a.jsx)(s,{className:t,style:n,...r,children:i})},l=e=>{let{placeholder:i="Search...",...t}=e;return(0,a.jsx)(o,{placeholder:i,...t})},p=e=>{let{children:i,...t}=e;return(0,a.jsx)(d,{...t,children:i})}},4021:(e,i,t)=>{t.d(i,{i1:()=>s});var n=t(9950),r=t(1367),a=t(6038);const s=()=>{const{user:e}=(0,r.As)(),[i,t]=(0,n.useState)("RM"),[s,o]=(0,n.useState)(Object.keys(a.DL)),[d,c]=(0,n.useState)(!0),[l,p]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const i=window.location.pathname.split("/"),n=i.indexOf("restaurant");let r=n>=0?i[n+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){var a;const e=await i.json(),n=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";t(n)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),t("RM")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:i,supportedCurrencies:s,loading:d,error:l}}},8844:(e,i,t)=>{t.r(i),t.d(i,{default:()=>$});var n=t(8819),r=t(9950),a=t(4492),s=t(4752),o=t(2674),d=t(2488),c=t(1367),l=t(9610),p=t(4021),x=t(6038),u=t(1840),h=t(4414);const g=s.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,m=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>e.hasRecipe?"#ECFDF5":"#FEF3C7"};
  color: ${e=>e.hasRecipe?"#059669":"#D97706"};
`,f=s.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>e.profit>=60?"#ECFDF5":e.profit>=40?"#FEF3C7":"#FEE2E2"};
  color: ${e=>e.profit>=60?"#059669":e.profit>=40?"#D97706":"#DC2626"};
`,y=s.Ay.div``,j=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,v=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,w=s.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid ${n.w.colors.borderLight};
  border-radius: 8px;
  margin: 16px 0;
`,b=s.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${n.w.colors.borderLight};

  &:last-child {
    border-bottom: none;
  }
`,k=s.Ay.div`
  flex: 1;
`,C=s.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 80px;
  gap: 12px;
  padding: 16px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-top: 16px;
`,S=s.Ay.div`
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,F=s.Ay.div`
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
`,$=()=>{const{user:e}=(0,c.As)(),{restaurantId:i}=(0,a.g)(),{defaultCurrency:t}=(0,p.i1)(),[n,s]=(0,r.useState)("RM"),[$,_]=(0,r.useState)(!0),[A,R]=(0,r.useState)([]),[P,E]=(0,r.useState)(""),[z,M]=(0,r.useState)("all"),[L,N]=(0,r.useState)("all"),[I,O]=(0,r.useState)([]),[B,D]=(0,r.useState)(!1),[T,U]=(0,r.useState)(!1),[q,J]=(0,r.useState)(null),[W,Q]=(0,r.useState)([]),[H,X]=(0,r.useState)(""),[Z,V]=(0,r.useState)([]),[Y,G]=(0,r.useState)([]),[K,ee]=(0,r.useState)(""),[ie,te]=(0,r.useState)(""),[ne,re]=(0,r.useState)(""),[ae,se]=(0,r.useState)(!1),oe=i?parseInt(i,10):null===e||void 0===e?void 0:e.restaurant_id;(0,r.useEffect)(()=>{t&&s(t)},[t]);const de=(0,r.useCallback)(async()=>{if(oe)try{_(!0);const e=await(0,u.ff)(`/api/restaurants/${oe}/products/recipe-status`);if(e.success){R(e.data||[]);const i=[];e.data.forEach(e=>{e.category&&!i.includes(e.category)&&i.push(e.category)}),O(i)}}catch(e){console.error("Failed to fetch products:",e)}finally{_(!1)}},[oe]);(0,r.useEffect)(()=>{de()},[de]);const ce=async e=>{J(e),await(async()=>{try{const e=await(0,u.ff)(`/api/restaurants/${oe}/ingredients`);e.success&&V(e.data||[])}catch(e){console.error("Failed to fetch ingredients:",e)}})(),e.has_recipe?await(async e=>{try{const i=await(0,u.ff)(`/api/restaurants/${oe}/products/${e}/recipe`);i.success&&i.data.recipe?G(i.data.recipe.ingredients||[]):G([])}catch(i){console.error("Failed to fetch product recipe:",i),G([])}})(e.id):G([]),D(!0)},le=async e=>{var i;J(e),X((null===(i=e.recipe_id)||void 0===i?void 0:i.toString())||""),await(async()=>{try{const e=await(0,u.ff)(`/api/restaurants/${oe}/recipes/available`);e.success&&Q(e.data||[])}catch(e){console.error("Failed to fetch recipes:",e)}})(),U(!0)},pe=()=>Y.reduce((e,i)=>e+(i.total_cost||0),0),xe=A.filter(e=>{var i;const t=e.name.toLowerCase().includes(P.toLowerCase())||(null===(i=e.code)||void 0===i?void 0:i.toLowerCase().includes(P.toLowerCase())),n="all"===z||"with"===z&&e.has_recipe||"without"===z&&!e.has_recipe,r="all"===L||e.category===L;return t&&n&&r});return oe?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(o.mc,{children:[(0,h.jsxs)(o.Y9,{children:[(0,h.jsx)(o.hE,{children:"Product Recipes"}),(0,h.jsx)(o.ex,{children:(0,h.jsx)(o.$n,{variant:"secondary",onClick:()=>window.location.href=`/restaurant/${oe}/recipe-management`,children:"Manage Recipes"})})]}),(0,h.jsxs)(o.UC,{children:[(0,h.jsx)(g,{children:"Link recipes to your menu items to track ingredient costs and manage inventory deduction when products are sold."}),(0,h.jsxs)(d.Qn,{children:[(0,h.jsx)(d.DO,{type:"text",placeholder:"Search products...",value:P,onChange:e=>E(e.target.value)}),(0,h.jsxs)(d.Jt,{value:z,onChange:e=>M(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Products"}),(0,h.jsx)("option",{value:"with",children:"With Recipe"}),(0,h.jsx)("option",{value:"without",children:"Without Recipe"})]}),(0,h.jsxs)(d.Jt,{value:L,onChange:e=>N(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),I.map(e=>(0,h.jsx)("option",{value:e,children:e},e))]})]}),$?(0,h.jsx)(o.pp,{children:"Loading..."}):0===xe.length?(0,h.jsxs)(o.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No products found"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:"Add products in the Menu page first."})]}):(0,h.jsxs)(o.XI,{children:[(0,h.jsxs)(o.A0,{columns:"2fr 1fr 1fr 1fr 1fr 150px",children:[(0,h.jsx)("span",{children:"Product"}),(0,h.jsx)("span",{children:"Price"}),(0,h.jsx)("span",{children:"Recipe Status"}),(0,h.jsx)("span",{children:"Ingredient Cost"}),(0,h.jsx)("span",{children:"Profit Margin"}),(0,h.jsx)("span",{children:"Actions"})]}),xe.map(e=>(0,h.jsxs)(o.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 150px",children:[(0,h.jsxs)(o.Np,{children:[(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Product"}),(0,h.jsxs)(y,{children:[(0,h.jsx)(j,{children:e.name}),(0,h.jsxs)(v,{children:[e.category," ",e.code&&`- ${e.code}`]})]})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Price"}),(0,h.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(0,x.vv)(e.price,n)})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Recipe Status"}),(0,h.jsx)(m,{hasRecipe:e.has_recipe,children:e.has_recipe?"Linked":"No Recipe"})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Ingredient Cost"}),(0,h.jsx)("div",{style:{color:e.has_recipe?"#0A2540":"#9CA3AF"},children:e.has_recipe?(0,x.vv)(e.ingredient_cost,n):"-"})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Profit Margin"}),e.profit_margin?(0,h.jsxs)(f,{profit:parseFloat(e.profit_margin),children:[e.profit_margin,"%"]}):(0,h.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]})]}),(0,h.jsxs)(o.wr,{children:[(0,h.jsx)(o.$n,{variant:"primary",onClick:()=>ce(e),style:{padding:"6px 12px",fontSize:"12px"},children:e.has_recipe?"Edit":"Create"}),(0,h.jsx)(o.$n,{variant:"secondary",onClick:()=>le(e),style:{padding:"6px 12px",fontSize:"12px"},children:"Link"})]})]},e.id))]})]})]}),(0,h.jsx)(l.aF,{isOpen:B,onClose:()=>D(!1),title:`Recipe: ${(null===q||void 0===q?void 0:q.name)||""}`,size:"large",children:q&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(g,{children:"Add ingredients required to make this product. Costs are calculated automatically."}),(0,h.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,h.jsx)("strong",{children:"Product Price:"})," ",(0,x.vv)(q.price,n)]}),Y.length>0&&(0,h.jsx)(w,{children:Y.map((e,i)=>(0,h.jsxs)(b,{children:[(0,h.jsxs)(k,{children:[(0,h.jsx)("div",{style:{fontWeight:600},children:e.ingredient_name}),(0,h.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[e.quantity," ",e.unit," x ",(0,x.vv)(e.unit_cost||0,n)]})]}),(0,h.jsx)("div",{style:{fontWeight:600,marginRight:"16px"},children:(0,x.vv)(e.total_cost||0,n)}),(0,h.jsx)(o.$n,{variant:"danger",onClick:()=>(e=>{G(Y.filter((i,t)=>t!==e))})(i),style:{padding:"4px 8px",fontSize:"12px"},children:"Remove"})]},i))}),(0,h.jsxs)(C,{children:[(0,h.jsxs)(l.FX,{value:K,onChange:e=>{ee(e.target.value);const i=Z.find(i=>i.id===parseInt(e.target.value));i&&re(i.unit)},children:[(0,h.jsx)("option",{value:"",children:"Select Ingredient"}),Z.map(e=>{const i=e.unit_cost/(e.base_quantity||1);return(0,h.jsxs)("option",{value:e.id,children:[e.name," (",(0,x.vv)(i,n),"/",e.unit,")"]},e.id)})]}),(0,h.jsx)(l.ZQ,{type:"number",step:"0.01",min:"0",placeholder:"Quantity",value:ie,onChange:e=>te(e.target.value)}),(0,h.jsx)(l.ZQ,{type:"text",placeholder:"Unit",value:ne,onChange:e=>re(e.target.value)}),(0,h.jsx)(o.$n,{variant:"primary",onClick:()=>{if(!K||!ie||!ne)return;const e=Z.find(e=>e.id===parseInt(K));if(!e)return;const i=parseFloat(ie),t=e.base_quantity||1,n=e.unit_cost/t,r={ingredient_id:e.id,ingredient_name:e.name,quantity:i,unit:ne,unit_cost:n,total_cost:n*i};G([...Y,r]),ee(""),te(""),re("")},children:"Add"})]}),(0,h.jsxs)(S,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)("span",{children:"Total Ingredient Cost:"}),(0,h.jsx)("span",{children:(0,x.vv)(pe(),n)})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)("span",{children:"Product Price:"}),(0,h.jsx)("span",{children:(0,x.vv)(q.price,n)})]}),(0,h.jsxs)(F,{children:[(0,h.jsx)("span",{children:"Profit Margin:"}),(0,h.jsx)("span",{children:q.price>0?`${((q.price-pe())/q.price*100).toFixed(1)}%`:"0%"})]})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"24px"},children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>D(!1),children:"Cancel"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(q)try{if(se(!0),q.has_recipe&&q.recipe_id){const e=await(0,u.ff)(`/api/restaurants/${oe}/products/${q.id}/recipe/ingredients`,{method:"PUT",body:JSON.stringify({ingredients:Y.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity,unit:e.unit,notes:e.notes}))})});e.success?(alert("Recipe updated successfully"),D(!1),de()):alert(e.message||"Failed to update recipe")}else{const e=await(0,u.ff)(`/api/restaurants/${oe}/products/${q.id}/recipe`,{method:"POST",body:JSON.stringify({name:`${q.name} Recipe`,ingredients:Y.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity,unit:e.unit,notes:e.notes}))})});e.success?(alert("Recipe created and linked successfully"),D(!1),de()):alert(e.message||"Failed to create recipe")}}catch(e){console.error("Failed to save recipe:",e),alert("Failed to save recipe")}finally{se(!1)}},disabled:ae,children:ae?"Saving...":"Save Recipe"})]})]})}),(0,h.jsx)(l.aF,{isOpen:T,onClose:()=>U(!1),title:`Link Recipe: ${(null===q||void 0===q?void 0:q.name)||""}`,size:"medium",children:q&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(g,{children:'Select an existing recipe to link to this product, or choose "No Recipe" to remove the current link.'}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Select Recipe"}),(0,h.jsxs)(l.FX,{value:H,onChange:e=>X(e.target.value),children:[(0,h.jsx)("option",{value:"",children:"No Recipe"}),W.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.name," ","brand"===e.owner_type?"(Brand)":""," - ",(0,x.vv)(e.total_ingredient_cost,n)]},e.id))]})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"24px"},children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>U(!1),children:"Cancel"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(q)try{se(!0);const e=await(0,u.ff)(`/api/restaurants/${oe}/products/${q.id}/recipe`,{method:"PUT",body:JSON.stringify({recipe_id:H?parseInt(H):null})});e.success?(alert(H?"Recipe linked successfully":"Recipe unlinked successfully"),U(!1),de()):alert(e.message||"Failed to update recipe link")}catch(e){console.error("Failed to link recipe:",e),alert("Failed to update recipe link")}finally{se(!1)}},disabled:ae,children:ae?"Saving...":"Save"})]})]})})]}):(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(o.mc,{children:(0,h.jsx)(o.pp,{children:(0,h.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})})}}}]);