"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8844],{1840:(e,i,t)=>{t.d(i,{ff:()=>a});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const r="";n();async function a(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${r}${e}`,n=localStorage.getItem("auth_token"),a={credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...i.headers},...i},s=await fetch(t,a);if(!s.ok){const e=await s.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${s.status}`)}return s.json()}},2488:(e,i,t)=>{t.d(i,{DO:()=>c,Jt:()=>l,Qn:()=>d});t(9950);var n=t(4752),r=t(4414);const a=n.Ay.div`
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
`,o=n.Ay.select`
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
`,d=e=>{let{children:i,className:t,style:n,...s}=e;return(0,r.jsx)(a,{className:t,style:n,...s,children:i})},c=e=>{let{placeholder:i="Search...",...t}=e;return(0,r.jsx)(s,{placeholder:i,...t})},l=e=>{let{children:i,...t}=e;return(0,r.jsx)(o,{...t,children:i})}},4021:(e,i,t)=>{t.d(i,{i1:()=>s});var n=t(9950),r=t(1367),a=t(6038);const s=()=>{const{user:e}=(0,r.As)(),[i,t]=(0,n.useState)("RM"),[s,o]=(0,n.useState)(Object.keys(a.DL)),[d,c]=(0,n.useState)(!0),[l,p]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const i=window.location.pathname.split("/"),n=i.indexOf("restaurant");let r=n>=0?i[n+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void c(!1);try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){var a;const e=await i.json(),n=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";t(n)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),t("RM")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:i,supportedCurrencies:s,loading:d,error:l}}},8844:(e,i,t)=>{t.r(i),t.d(i,{default:()=>A});var n=t(9950),r=t(4492),a=t(4752),s=t(3310),o=t(7492),d=t(2488),c=t(1367),l=t(9610),p=t(4021),x=t(6038),u=t(1840),h=t(4414);const g=a.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`,f=a.Ay.span`
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
`,j=a.Ay.div``,y=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,v=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,w=a.Ay.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  margin: 16px 0;
`,b=a.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    border-bottom: none;
  }
`,F=a.Ay.div`
  flex: 1;
`,C=a.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 80px;
  gap: 12px;
  padding: 16px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-top: 16px;
`,k=a.Ay.div`
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,S=a.Ay.div`
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
`,A=()=>{const{user:e}=(0,c.As)(),{restaurantId:i}=(0,r.g)(),{defaultCurrency:t}=(0,p.i1)(),[a,A]=(0,n.useState)("RM"),[_,E]=(0,n.useState)(!0),[R,$]=(0,n.useState)([]),[P,z]=(0,n.useState)(""),[B,M]=(0,n.useState)("all"),[N,I]=(0,n.useState)("all"),[O,D]=(0,n.useState)([]),[L,T]=(0,n.useState)(!1),[U,q]=(0,n.useState)(!1),[J,W]=(0,n.useState)(null),[Q,H]=(0,n.useState)([]),[X,Z]=(0,n.useState)(""),[V,Y]=(0,n.useState)([]),[G,K]=(0,n.useState)([]),[ee,ie]=(0,n.useState)(""),[te,ne]=(0,n.useState)(""),[re,ae]=(0,n.useState)(""),[se,oe]=(0,n.useState)(!1),de=i?parseInt(i,10):null===e||void 0===e?void 0:e.restaurant_id;(0,n.useEffect)(()=>{t&&A(t)},[t]);const ce=(0,n.useCallback)(async()=>{if(de)try{E(!0);const e=await(0,u.ff)(`/api/restaurants/${de}/products/recipe-status`);if(e.success){$(e.data||[]);const i=[];e.data.forEach(e=>{e.category&&!i.includes(e.category)&&i.push(e.category)}),D(i)}}catch(e){console.error("Failed to fetch products:",e)}finally{E(!1)}},[de]);(0,n.useEffect)(()=>{ce()},[ce]);const le=async e=>{W(e),await(async()=>{try{const e=await(0,u.ff)(`/api/restaurants/${de}/ingredients`);e.success&&Y(e.data||[])}catch(e){console.error("Failed to fetch ingredients:",e)}})(),e.has_recipe?await(async e=>{try{const i=await(0,u.ff)(`/api/restaurants/${de}/products/${e}/recipe`);i.success&&i.data.recipe?K(i.data.recipe.ingredients||[]):K([])}catch(i){console.error("Failed to fetch product recipe:",i),K([])}})(e.id):K([]),T(!0)},pe=async e=>{var i;W(e),Z((null===(i=e.recipe_id)||void 0===i?void 0:i.toString())||""),await(async()=>{try{const e=await(0,u.ff)(`/api/restaurants/${de}/recipes/available`);e.success&&H(e.data||[])}catch(e){console.error("Failed to fetch recipes:",e)}})(),q(!0)},xe=()=>G.reduce((e,i)=>e+(i.total_cost||0),0),ue=R.filter(e=>{var i;const t=e.name.toLowerCase().includes(P.toLowerCase())||(null===(i=e.code)||void 0===i?void 0:i.toLowerCase().includes(P.toLowerCase())),n="all"===B||"with"===B&&e.has_recipe||"without"===B&&!e.has_recipe,r="all"===N||e.category===N;return t&&n&&r});return de?(0,h.jsxs)(s.A,{children:[(0,h.jsxs)(o.mc,{children:[(0,h.jsxs)(o.Y9,{children:[(0,h.jsx)(o.hE,{children:"Product Recipes"}),(0,h.jsx)(o.ex,{children:(0,h.jsx)(o.$n,{variant:"secondary",onClick:()=>window.location.href=`/restaurant/${de}/recipe-management`,children:"Manage Recipes"})})]}),(0,h.jsxs)(o.UC,{children:[(0,h.jsx)(g,{children:"Link recipes to your menu items to track ingredient costs and manage inventory deduction when products are sold."}),(0,h.jsxs)(d.Qn,{children:[(0,h.jsx)(d.DO,{type:"text",placeholder:"Search products...",value:P,onChange:e=>z(e.target.value)}),(0,h.jsxs)(d.Jt,{value:B,onChange:e=>M(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Products"}),(0,h.jsx)("option",{value:"with",children:"With Recipe"}),(0,h.jsx)("option",{value:"without",children:"Without Recipe"})]}),(0,h.jsxs)(d.Jt,{value:N,onChange:e=>I(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),O.map(e=>(0,h.jsx)("option",{value:e,children:e},e))]})]}),_?(0,h.jsx)(o.pp,{children:"Loading..."}):0===ue.length?(0,h.jsxs)(o.pp,{children:[(0,h.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No products found"}),(0,h.jsx)("div",{style:{fontSize:"14px"},children:"Add products in the Menu page first."})]}):(0,h.jsxs)(o.XI,{children:[(0,h.jsxs)(o.A0,{columns:"2fr 1fr 1fr 1fr 1fr 150px",children:[(0,h.jsx)("span",{children:"Product"}),(0,h.jsx)("span",{children:"Price"}),(0,h.jsx)("span",{children:"Recipe Status"}),(0,h.jsx)("span",{children:"Ingredient Cost"}),(0,h.jsx)("span",{children:"Profit Margin"}),(0,h.jsx)("span",{children:"Actions"})]}),ue.map(e=>(0,h.jsxs)(o.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 150px",children:[(0,h.jsxs)(o.Np,{children:[(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Product"}),(0,h.jsxs)(j,{children:[(0,h.jsx)(y,{children:e.name}),(0,h.jsxs)(v,{children:[e.category," ",e.code&&`- ${e.code}`]})]})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Price"}),(0,h.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:(0,x.vv)(e.price,a)})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Recipe Status"}),(0,h.jsx)(f,{hasRecipe:e.has_recipe,children:e.has_recipe?"Linked":"No Recipe"})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Ingredient Cost"}),(0,h.jsx)("div",{style:{color:e.has_recipe?"#0A2540":"#9CA3AF"},children:e.has_recipe?(0,x.vv)(e.ingredient_cost,a):"-"})]}),(0,h.jsxs)(o.Uj,{children:[(0,h.jsx)(o.PM,{children:"Profit Margin"}),e.profit_margin?(0,h.jsxs)(m,{profit:parseFloat(e.profit_margin),children:[e.profit_margin,"%"]}):(0,h.jsx)("span",{style:{color:"#9CA3AF"},children:"-"})]})]}),(0,h.jsxs)(o.wr,{children:[(0,h.jsx)(o.$n,{variant:"primary",onClick:()=>le(e),style:{padding:"6px 12px",fontSize:"12px"},children:e.has_recipe?"Edit":"Create"}),(0,h.jsx)(o.$n,{variant:"secondary",onClick:()=>pe(e),style:{padding:"6px 12px",fontSize:"12px"},children:"Link"})]})]},e.id))]})]})]}),(0,h.jsx)(l.aF,{isOpen:L,onClose:()=>T(!1),title:`Recipe: ${(null===J||void 0===J?void 0:J.name)||""}`,size:"large",children:J&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(g,{children:"Add ingredients required to make this product. Costs are calculated automatically."}),(0,h.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,h.jsx)("strong",{children:"Product Price:"})," ",(0,x.vv)(J.price,a)]}),G.length>0&&(0,h.jsx)(w,{children:G.map((e,i)=>(0,h.jsxs)(b,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)("div",{style:{fontWeight:600},children:e.ingredient_name}),(0,h.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[e.quantity," ",e.unit," x ",(0,x.vv)(e.unit_cost||0,a)]})]}),(0,h.jsx)("div",{style:{fontWeight:600,marginRight:"16px"},children:(0,x.vv)(e.total_cost||0,a)}),(0,h.jsx)(o.$n,{variant:"danger",onClick:()=>(e=>{K(G.filter((i,t)=>t!==e))})(i),style:{padding:"4px 8px",fontSize:"12px"},children:"Remove"})]},i))}),(0,h.jsxs)(C,{children:[(0,h.jsxs)(l.FX,{value:ee,onChange:e=>{ie(e.target.value);const i=V.find(i=>i.id===parseInt(e.target.value));i&&ae(i.unit)},children:[(0,h.jsx)("option",{value:"",children:"Select Ingredient"}),V.map(e=>{const i=e.unit_cost/(e.base_quantity||1);return(0,h.jsxs)("option",{value:e.id,children:[e.name," (",(0,x.vv)(i,a),"/",e.unit,")"]},e.id)})]}),(0,h.jsx)(l.ZQ,{type:"number",step:"0.01",min:"0",placeholder:"Quantity",value:te,onChange:e=>ne(e.target.value)}),(0,h.jsx)(l.ZQ,{type:"text",placeholder:"Unit",value:re,onChange:e=>ae(e.target.value)}),(0,h.jsx)(o.$n,{variant:"primary",onClick:()=>{if(!ee||!te||!re)return;const e=V.find(e=>e.id===parseInt(ee));if(!e)return;const i=parseFloat(te),t=e.base_quantity||1,n=e.unit_cost/t,r={ingredient_id:e.id,ingredient_name:e.name,quantity:i,unit:re,unit_cost:n,total_cost:n*i};K([...G,r]),ie(""),ne(""),ae("")},children:"Add"})]}),(0,h.jsxs)(k,{children:[(0,h.jsxs)(S,{children:[(0,h.jsx)("span",{children:"Total Ingredient Cost:"}),(0,h.jsx)("span",{children:(0,x.vv)(xe(),a)})]}),(0,h.jsxs)(S,{children:[(0,h.jsx)("span",{children:"Product Price:"}),(0,h.jsx)("span",{children:(0,x.vv)(J.price,a)})]}),(0,h.jsxs)(S,{children:[(0,h.jsx)("span",{children:"Profit Margin:"}),(0,h.jsx)("span",{children:J.price>0?`${((J.price-xe())/J.price*100).toFixed(1)}%`:"0%"})]})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"24px"},children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>T(!1),children:"Cancel"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(J)try{if(oe(!0),J.has_recipe&&J.recipe_id){const e=await(0,u.ff)(`/api/restaurants/${de}/products/${J.id}/recipe/ingredients`,{method:"PUT",body:JSON.stringify({ingredients:G.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity,unit:e.unit,notes:e.notes}))})});e.success?(alert("Recipe updated successfully"),T(!1),ce()):alert(e.message||"Failed to update recipe")}else{const e=await(0,u.ff)(`/api/restaurants/${de}/products/${J.id}/recipe`,{method:"POST",body:JSON.stringify({name:`${J.name} Recipe`,ingredients:G.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity,unit:e.unit,notes:e.notes}))})});e.success?(alert("Recipe created and linked successfully"),T(!1),ce()):alert(e.message||"Failed to create recipe")}}catch(e){console.error("Failed to save recipe:",e),alert("Failed to save recipe")}finally{oe(!1)}},disabled:se,children:se?"Saving...":"Save Recipe"})]})]})}),(0,h.jsx)(l.aF,{isOpen:U,onClose:()=>q(!1),title:`Link Recipe: ${(null===J||void 0===J?void 0:J.name)||""}`,size:"medium",children:J&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(g,{children:'Select an existing recipe to link to this product, or choose "No Recipe" to remove the current link.'}),(0,h.jsxs)(l.gE,{children:[(0,h.jsx)(l.lR,{children:"Select Recipe"}),(0,h.jsxs)(l.FX,{value:X,onChange:e=>Z(e.target.value),children:[(0,h.jsx)("option",{value:"",children:"No Recipe"}),Q.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.name," ","brand"===e.owner_type?"(Brand)":""," - ",(0,x.vv)(e.total_ingredient_cost,a)]},e.id))]})]}),(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"24px"},children:[(0,h.jsx)(l.yl,{variant:"secondary",onClick:()=>q(!1),children:"Cancel"}),(0,h.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(J)try{oe(!0);const e=await(0,u.ff)(`/api/restaurants/${de}/products/${J.id}/recipe`,{method:"PUT",body:JSON.stringify({recipe_id:X?parseInt(X):null})});e.success?(alert(X?"Recipe linked successfully":"Recipe unlinked successfully"),q(!1),ce()):alert(e.message||"Failed to update recipe link")}catch(e){console.error("Failed to link recipe:",e),alert("Failed to update recipe link")}finally{oe(!1)}},disabled:se,children:se?"Saving...":"Save"})]})]})})]}):(0,h.jsx)(s.A,{children:(0,h.jsx)(o.mc,{children:(0,h.jsx)(o.pp,{children:(0,h.jsx)("p",{children:"Restaurant not found. Please log in with a restaurant account."})})})})}}}]);