"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8844],{1840:(e,i,t)=>{t.d(i,{ff:()=>s});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const r="";n();async function s(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${r}${e}`,n=localStorage.getItem("auth_token"),s={credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...i.headers},...i},a=await fetch(t,s);if(!a.ok){const e=await a.json().catch(()=>({message:"Network error"}));throw new Error(e.message||e.error||`HTTP error! status: ${a.status}`)}return a.json()}},4021:(e,i,t)=>{t.d(i,{i1:()=>a});var n=t(9950),r=t(1367),s=t(6038);const a=()=>{const{user:e}=(0,r.As)(),[i,t]=(0,n.useState)("RM"),[a]=(0,n.useState)(Object.keys(s.DL)),[c,o]=(0,n.useState)(!0),[l,d]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const i=window.location.pathname.split("/"),n=i.indexOf("restaurant");let r=n>=0?i[n+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void o(!1);try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){var s;const e=await i.json(),n=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"MYR";t(n)}else t("MYR")}catch(a){console.error("Failed to fetch restaurant currency:",a),d("Failed to load currency settings"),t("MYR")}finally{o(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:i,supportedCurrencies:a,loading:c,error:l}}},8844:(e,i,t)=>{t.r(i),t.d(i,{default:()=>k});var n=t(9950),r=t(4492),s=t(4752),a=t(8409),c=t(2488),o=t(1367),l=t(9610),d=t(4021),p=t(6038),u=t(1840),h=t(5030),x=t(4414);const g=s.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,f=s.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>e.hasRecipe?"#ECFDF5":"#FEF3C7"};
  color: ${e=>e.hasRecipe?"#059669":"#D97706"};
`,j=s.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>e.profit>=60?"#ECFDF5":e.profit>=40?"#FEF3C7":"#FEE2E2"};
  color: ${e=>e.profit>=60?"#059669":e.profit>=40?"#D97706":"#DC2626"};
`,y=s.Ay.div``,v=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,m=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,w=s.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  margin: 16px 0;
`,R=s.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    border-bottom: none;
  }
`,C=s.Ay.div`
  flex: 1;
`,F=s.Ay.div`
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
`,_=s.Ay.div`
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
`,k=()=>{const{t:e}=(0,h.Bd)("recipes"),{user:i}=(0,o.As)(),{restaurantId:t}=(0,r.g)(),{defaultCurrency:s}=(0,d.i1)(),[k,b]=(0,n.useState)("RM"),[P,A]=(0,n.useState)(!0),[$,E]=(0,n.useState)([]),[N,M]=(0,n.useState)(""),[z,B]=(0,n.useState)("all"),[I,L]=(0,n.useState)("all"),[O,D]=(0,n.useState)([]),[T,U]=(0,n.useState)(!1),[q,J]=(0,n.useState)(!1),[W,Q]=(0,n.useState)(null),[Y,H]=(0,n.useState)([]),[X,Z]=(0,n.useState)(""),[V,G]=(0,n.useState)([]),[K,ee]=(0,n.useState)([]),[ie,te]=(0,n.useState)(""),[ne,re]=(0,n.useState)(""),[se,ae]=(0,n.useState)(""),[ce,oe]=(0,n.useState)(!1),le=t?parseInt(t,10):null===i||void 0===i?void 0:i.restaurant_id;(0,n.useEffect)(()=>{s&&b(s)},[s]);const de=(0,n.useCallback)(async()=>{if(le)try{A(!0);const e=await(0,u.ff)(`/api/restaurants/${le}/products/recipe-status`);if(e.success){E(e.data||[]);const i=[];e.data.forEach(e=>{e.category&&!i.includes(e.category)&&i.push(e.category)}),D(i)}}catch(e){console.error("Failed to fetch products:",e)}finally{A(!1)}},[le]);(0,n.useEffect)(()=>{de()},[de]);const pe=async e=>{Q(e),await(async()=>{try{const e=await(0,u.ff)(`/api/restaurants/${le}/ingredients`);e.success&&G(e.data||[])}catch(e){console.error("Failed to fetch ingredients:",e)}})(),e.has_recipe?await(async e=>{try{const i=await(0,u.ff)(`/api/restaurants/${le}/products/${e}/recipe`);i.success&&i.data.recipe?ee(i.data.recipe.ingredients||[]):ee([])}catch(i){console.error("Failed to fetch product recipe:",i),ee([])}})(e.id):ee([]),U(!0)},ue=async e=>{var i;Q(e),Z((null===(i=e.recipe_id)||void 0===i?void 0:i.toString())||""),await(async()=>{try{const e=await(0,u.ff)(`/api/restaurants/${le}/recipes/available`);e.success&&H(e.data||[])}catch(e){console.error("Failed to fetch recipes:",e)}})(),J(!0)},he=()=>K.reduce((e,i)=>e+(i.total_cost||0),0),xe=$.filter(e=>{var i;const t=e.name.toLowerCase().includes(N.toLowerCase())||(null===(i=e.code)||void 0===i?void 0:i.toLowerCase().includes(N.toLowerCase())),n="all"===z||"with"===z&&e.has_recipe||"without"===z&&!e.has_recipe,r="all"===I||e.category===I;return t&&n&&r});return le?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(a.mc,{children:[(0,x.jsxs)(a.Y9,{children:[(0,x.jsx)(a.hE,{children:e("recipes:productRecipePage.productRecipes")}),(0,x.jsx)(a.ex,{children:(0,x.jsx)(a.$n,{variant:"secondary",onClick:()=>window.location.href=`/restaurant/${le}/recipe-management`,children:"Manage Recipes"})})]}),(0,x.jsxs)(a.UC,{children:[(0,x.jsx)(g,{children:"Link recipes to your menu items to track ingredient costs and manage inventory deduction when products are sold."}),(0,x.jsxs)(c.Qn,{children:[(0,x.jsx)(c.DO,{type:"text",placeholder:"Search products...",value:N,onChange:e=>M(e.target.value)}),(0,x.jsxs)(c.Jt,{value:z,onChange:e=>B(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("recipes:productRecipePage.allProducts")}),(0,x.jsx)("option",{value:"with",children:e("recipes:productRecipePage.withRecipe")}),(0,x.jsx)("option",{value:"without",children:e("recipes:productRecipePage.withoutRecipe")})]}),(0,x.jsxs)(c.Jt,{value:I,onChange:e=>L(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:e("recipes:productRecipePage.allCategories")}),O.map(e=>(0,x.jsx)("option",{value:e,children:e},e))]})]}),P?(0,x.jsx)(a.pp,{children:e("recipes:productRecipePage.loading")}):0===xe.length?(0,x.jsxs)(a.pp,{children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No products found"}),(0,x.jsx)("div",{style:{fontSize:"14px"},children:"Add products in the Menu page first."})]}):(0,x.jsxs)(a.XI,{children:[(0,x.jsxs)(a.A0,{columns:"2fr 1fr 1fr 1fr 1fr 150px",children:[(0,x.jsx)("span",{className:"col-info",children:e("recipes:productRecipePage.product")}),(0,x.jsx)("span",{className:"col-price",children:e("recipes:productRecipePage.price")}),(0,x.jsx)("span",{children:e("recipes:productRecipePage.recipeStatus")}),(0,x.jsx)("span",{className:"col-cost",children:e("recipes:productRecipePage.ingredientCost")}),(0,x.jsx)("span",{className:"col-money",children:e("recipes:productRecipePage.profitMargin")}),(0,x.jsx)("span",{className:"col-action",children:e("recipes:productRecipePage.actions")})]}),xe.map(i=>(0,x.jsxs)(a.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 150px",children:[(0,x.jsxs)(a.Np,{children:[(0,x.jsxs)(a.Uj,{className:"col-info",children:[(0,x.jsx)(a.PM,{children:e("recipes:productRecipePage.product")}),(0,x.jsxs)(y,{children:[(0,x.jsx)(v,{children:i.name}),(0,x.jsxs)(m,{children:[i.category," ",i.code&&`- ${i.code}`]})]})]}),(0,x.jsxs)(a.Uj,{className:"col-price",children:[(0,x.jsx)(a.PM,{children:e("recipes:productRecipePage.price")}),(0,x.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(0,p.vv)(i.price,k)})]}),(0,x.jsxs)(a.Uj,{children:[(0,x.jsx)(a.PM,{children:e("recipes:productRecipePage.recipeStatus")}),(0,x.jsx)(f,{hasRecipe:i.has_recipe,children:i.has_recipe?"Linked":"No Recipe"})]}),(0,x.jsxs)(a.Uj,{className:"col-cost",children:[(0,x.jsx)(a.PM,{children:e("recipes:productRecipePage.ingredientCost")}),(0,x.jsx)("div",{style:{color:i.has_recipe?"#0A2540":"#9CA3AF"},children:i.has_recipe?(0,p.vv)(i.ingredient_cost,k):"-"})]}),(0,x.jsxs)(a.Uj,{className:"col-money",children:[(0,x.jsx)(a.PM,{children:e("recipes:productRecipePage.profitMargin")}),i.profit_margin?(0,x.jsxs)(j,{profit:parseFloat(i.profit_margin),children:[i.profit_margin,"%"]}):(0,x.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]})]}),(0,x.jsxs)(a.wr,{children:[(0,x.jsx)(a.$n,{variant:"primary",onClick:()=>pe(i),style:{padding:"6px 12px",fontSize:"12px"},children:i.has_recipe?"Edit":"Create"}),(0,x.jsx)(a.$n,{variant:"secondary",onClick:()=>ue(i),style:{padding:"6px 12px",fontSize:"12px"},children:"Link"})]})]},i.id))]})]})]}),(0,x.jsx)(l.aF,{isOpen:T,onClose:()=>U(!1),title:`Recipe: ${(null===W||void 0===W?void 0:W.name)||""}`,size:"large",children:W&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(g,{children:"Add ingredients required to make this product. Costs are calculated automatically."}),(0,x.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,x.jsx)("strong",{children:"Product Price:"})," ",(0,p.vv)(W.price,k)]}),K.length>0&&(0,x.jsx)(w,{children:K.map((e,i)=>(0,x.jsxs)(R,{children:[(0,x.jsxs)(C,{children:[(0,x.jsx)("div",{style:{fontWeight:600},children:e.ingredient_name}),(0,x.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[e.quantity," ",e.unit," x ",(0,p.vv)(e.unit_cost||0,k)]})]}),(0,x.jsx)("div",{style:{fontWeight:600,marginRight:"16px"},children:(0,p.vv)(e.total_cost||0,k)}),(0,x.jsx)(a.$n,{variant:"danger",onClick:()=>(e=>{ee(K.filter((i,t)=>t!==e))})(i),style:{padding:"4px 8px",fontSize:"12px"},children:"Remove"})]},i))}),(0,x.jsxs)(F,{children:[(0,x.jsxs)(l.FX,{value:ie,onChange:e=>{te(e.target.value);const i=V.find(i=>i.id===parseInt(e.target.value));i&&ae(i.unit)},children:[(0,x.jsx)("option",{value:"",children:e("recipes:productRecipePage.selectIngredient")}),V.map(e=>{const i=e.unit_cost/(e.base_quantity||1);return(0,x.jsxs)("option",{value:e.id,children:[e.name," (",(0,p.vv)(i,k),"/",e.unit,")"]},e.id)})]}),(0,x.jsx)(l.ZQ,{type:"number",step:"0.01",min:"0",placeholder:"Quantity",value:ne,onChange:e=>re(e.target.value)}),(0,x.jsx)(l.ZQ,{type:"text",placeholder:"Unit",value:se,onChange:e=>ae(e.target.value)}),(0,x.jsx)(a.$n,{variant:"primary",onClick:()=>{if(!ie||!ne||!se)return;const e=V.find(e=>e.id===parseInt(ie));if(!e)return;const i=parseFloat(ne),t=e.base_quantity||1,n=e.unit_cost/t,r={ingredient_id:e.id,ingredient_name:e.name,quantity:i,unit:se,unit_cost:n,total_cost:n*i};ee([...K,r]),te(""),re(""),ae("")},children:"Add"})]}),(0,x.jsxs)(S,{children:[(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Total Ingredient Cost:"}),(0,x.jsx)("span",{children:(0,p.vv)(he(),k)})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Product Price:"}),(0,x.jsx)("span",{children:(0,p.vv)(W.price,k)})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Profit Margin:"}),(0,x.jsx)("span",{children:W.price>0?`${((W.price-he())/W.price*100).toFixed(1)}%`:"0%"})]})]}),(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"24px"},children:[(0,x.jsx)(l.yl,{variant:"secondary",onClick:()=>U(!1),children:"Cancel"}),(0,x.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(W)try{if(oe(!0),W.has_recipe&&W.recipe_id){const e=await(0,u.ff)(`/api/restaurants/${le}/products/${W.id}/recipe/ingredients`,{method:"PUT",body:JSON.stringify({ingredients:K.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity,unit:e.unit,notes:e.notes}))})});e.success?(alert("Recipe updated successfully"),U(!1),de()):alert(e.message||"Failed to update recipe")}else{const e=await(0,u.ff)(`/api/restaurants/${le}/products/${W.id}/recipe`,{method:"POST",body:JSON.stringify({name:`${W.name} Recipe`,ingredients:K.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity,unit:e.unit,notes:e.notes}))})});e.success?(alert("Recipe created and linked successfully"),U(!1),de()):alert(e.message||"Failed to create recipe")}}catch(e){console.error("Failed to save recipe:",e),alert("Failed to save recipe")}finally{oe(!1)}},disabled:ce,children:ce?"Saving...":"Save Recipe"})]})]})}),(0,x.jsx)(l.aF,{isOpen:q,onClose:()=>J(!1),title:`Link Recipe: ${(null===W||void 0===W?void 0:W.name)||""}`,size:"medium",children:W&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(g,{children:'Select an existing recipe to link to this product, or choose "No Recipe" to remove the current link.'}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:e("recipes:productRecipePage.selectRecipe")}),(0,x.jsxs)(l.FX,{value:X,onChange:e=>Z(e.target.value),children:[(0,x.jsx)("option",{value:"",children:e("recipes:productRecipePage.noRecipe")}),Y.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.name," ","brand"===e.owner_type?"(Brand)":""," - ",(0,p.vv)(e.total_ingredient_cost,k)]},e.id))]})]}),(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"24px"},children:[(0,x.jsx)(l.yl,{variant:"secondary",onClick:()=>J(!1),children:"Cancel"}),(0,x.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(W)try{oe(!0);const e=await(0,u.ff)(`/api/restaurants/${le}/products/${W.id}/recipe`,{method:"PUT",body:JSON.stringify({recipe_id:X?parseInt(X):null})});e.success?(alert(X?"Recipe linked successfully":"Recipe unlinked successfully"),J(!1),de()):alert(e.message||"Failed to update recipe link")}catch(e){console.error("Failed to link recipe:",e),alert("Failed to update recipe link")}finally{oe(!1)}},disabled:ce,children:ce?"Saving...":"Save"})]})]})})]}):(0,x.jsx)(x.Fragment,{children:(0,x.jsx)(a.mc,{children:(0,x.jsx)(a.pp,{children:(0,x.jsx)("p",{children:e("recipes:productRecipePage.restaurantNotFoundPleaseLogInWithARestaurantAccount")})})})})}}}]);