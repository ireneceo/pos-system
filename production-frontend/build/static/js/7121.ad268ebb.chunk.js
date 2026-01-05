"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7121],{1840:(e,i,t)=>{t.d(i,{ff:()=>o});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const r="";n();async function o(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${r}${e}`,n=localStorage.getItem("auth_token"),o={credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...i.headers},...i},a=await fetch(t,o);if(!a.ok){const e=await a.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${a.status}`)}return a.json()}},2488:(e,i,t)=>{t.d(i,{DO:()=>l,Jt:()=>c,Qn:()=>d});t(9950);var n=t(4752),r=t(4414);const o=n.Ay.div`
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
`,a=n.Ay.input`
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
`,d=e=>{let{children:i,className:t,style:n,...a}=e;return(0,r.jsx)(o,{className:t,style:n,...a,children:i})},l=e=>{let{placeholder:i="Search...",...t}=e;return(0,r.jsx)(a,{placeholder:i,...t})},c=e=>{let{children:i,...t}=e;return(0,r.jsx)(s,{...t,children:i})}},3705:(e,i,t)=>{t.d(i,{cc:()=>r});var n=t(4752);const r=n.Ay.button`
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
`},4021:(e,i,t)=>{t.d(i,{i1:()=>a});var n=t(9950),r=t(1367),o=t(6038);const a=()=>{const{user:e}=(0,r.As)(),[i,t]=(0,n.useState)("RM"),[a,s]=(0,n.useState)(Object.keys(o.DL)),[d,l]=(0,n.useState)(!0),[c,p]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const i=window.location.pathname.split("/"),n=i.indexOf("restaurant");let r=n>=0?i[n+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){var o;const e=await i.json(),n=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";t(n)}else t("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),p("Failed to load currency settings"),t("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:i,supportedCurrencies:a,loading:d,error:c}}},7121:(e,i,t)=>{t.r(i),t.d(i,{default:()=>oi});var n=t(9950),r=t(4752),o=t(4492),a=t(3310),s=t(7492),d=t(1367),l=t(3705),c=t(2488),p=t(9610),x=t(4021),g=t(6038),u=t(1840),h=t(4414);const m=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,y=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>!1!==e.isActive?1:.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,v=r.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,f=r.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,j=r.Ay.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`,b=r.Ay.div`
  flex: 1;
  min-width: 0;
`,F=r.Ay.h3`
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
`,w=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,C=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,A=r.Ay.div``,_=r.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,E=r.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,B=r.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,S=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,z=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,I=r.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,R=r.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,D=r.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F6F9FC;\n          border: 1px solid #E6EBF1;\n          color: #6B7280;\n          &:hover {\n            border-color: #635BFF;\n            color: #635BFF;\n            background: #F4F3FF;\n            transform: translateY(-1px);\n          }\n        "}}}
`,$=r.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,L=r.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,T=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,N=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,O=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
`,M=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,q=r.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  padding: 8px 0;
  margin-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;

  span {
    font-size: 13px;
    font-weight: 600;
    color: #6B7280;
  }

  @media (max-width: 768px) {
    display: none;
  }
`,P=r.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,U=r.Ay.button`
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  width: 38px;
  height: 38px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #FCA5A5;
  }
`,Q=r.Ay.button`
  background: #F0F4FF;
  color: #635BFF;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  margin-bottom: 16px;

  &:hover {
    background: #E0E7FF;
  }
`,Y=r.Ay.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E5E7EB;
`,Z=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,J=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,W=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,H=e=>{let{onCountChange:i,categoryRefreshKey:t}=e;const{user:r}=(0,d.As)(),{defaultCurrency:o}=(0,x.i1)(),[a,s]=(0,n.useState)("RM"),[H,X]=(0,n.useState)([]),[V,K]=(0,n.useState)([]),[G,ee]=(0,n.useState)([]),[ie,te]=(0,n.useState)(!0),[ne,re]=(0,n.useState)(""),[oe,ae]=(0,n.useState)("all"),[se,de]=(0,n.useState)(!1),[le,ce]=(0,n.useState)(null),[pe,xe]=(0,n.useState)(!1),[ge,ue]=(0,n.useState)({name:"",description:"",category_id:"",emoji:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),[he,me]=(0,n.useState)([]),ye=null===r||void 0===r?void 0:r.brand_id;(0,n.useEffect)(()=>{o&&s(o)},[o]);const ve=(0,n.useCallback)(async()=>{if(ye)try{te(!0);const[t,n,r]=await Promise.all([(0,u.ff)("/api/product-recipes"),(0,u.ff)("/api/product-ingredients"),(0,u.ff)("/api/product-recipe-categories")]);var e;if(t.success)X(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0);n.success&&K((n.data||[]).filter(e=>e.is_active)),r.success&&ee(r.data||[])}catch(t){console.error("Failed to fetch data:",t)}finally{te(!1)}},[ye,i]);(0,n.useEffect)(()=>{ve()},[ve]),(0,n.useEffect)(()=>{t&&fe()},[t]);const fe=async()=>{try{const e=await(0,u.ff)("/api/product-recipe-categories");e.success&&ee(e.data||[])}catch(e){console.error("Failed to fetch categories:",e)}},je=e=>{var i,t,n,r;e?(ce(e),ue({name:e.name,description:e.description||"",category_id:(null===(i=e.category_id)||void 0===i?void 0:i.toString())||"",emoji:e.emoji||"",prep_time:(null===(t=e.prep_time)||void 0===t?void 0:t.toString())||"",cook_time:(null===(n=e.cook_time)||void 0===n?void 0:n.toString())||"",instructions:e.instructions||"",suggested_price:(null===(r=e.suggested_price)||void 0===r?void 0:r.toString())||""}),e.recipeIngredients?me(e.recipeIngredients.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""}))):me([])):(ce(null),ue({name:"",description:"",category_id:"",emoji:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),me([]));de(!0)},be=(e,i,t)=>{const n=[...he];if(n[e]={...n[e],[i]:t},"ingredient_id"===i){const i=V.find(e=>e.id===parseInt(t));i&&(n[e].unit=i.unit)}me(n)},Fe=H.filter(e=>{var i,t;const n=e.name.toLowerCase().includes(ne.toLowerCase())||(null===(i=e.code)||void 0===i?void 0:i.toLowerCase().includes(ne.toLowerCase())),r="all"===oe||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===oe;return n&&r});return ie?(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(N,{children:[(0,h.jsx)("div",{children:(0,h.jsxs)(O,{children:["Product Recipes (",H.length,")"]})}),(0,h.jsx)(l.cc,{variant:"primary",onClick:()=>je(),children:"Add Recipe"})]}),(0,h.jsxs)(c.Qn,{children:[(0,h.jsx)(c.DO,{type:"text",placeholder:"Search recipes...",value:ne,onChange:e=>re(e.target.value)}),(0,h.jsxs)(c.Jt,{value:oe,onChange:e=>ae(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),G.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),0===Fe.length?(0,h.jsxs)($,{children:[(0,h.jsx)(L,{children:"No recipes found"}),(0,h.jsx)(T,{children:"Create product recipes to track ingredient costs and manage production."}),(0,h.jsx)(l.cc,{variant:"primary",onClick:()=>je(),children:"Add First Recipe"})]}):(0,h.jsx)(m,{children:Fe.map(e=>{var i,t;return(0,h.jsxs)(y,{isActive:e.is_active,onClick:()=>je(e),children:[(0,h.jsxs)(v,{children:[e.image_url?(0,h.jsx)(j,{src:e.image_url,alt:e.name}):(0,h.jsx)(f,{children:e.emoji||(null===(i=e.category)||void 0===i?void 0:i.emoji)||"\ud83d\udccb"}),(0,h.jsxs)(b,{children:[(0,h.jsx)(F,{children:e.name}),(0,h.jsx)(k,{children:(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized"})]})]}),e.description&&(0,h.jsx)(w,{children:e.description}),(0,h.jsxs)(C,{children:[(0,h.jsxs)(A,{children:[(0,h.jsx)(_,{children:"Ingredient Cost"}),(0,h.jsx)(E,{children:(0,g.vv)(e.total_ingredient_cost||0,a)})]}),(0,h.jsxs)(A,{children:[(0,h.jsx)(_,{children:"Suggested Price"}),(0,h.jsx)(E,{children:e.suggested_price?(0,g.vv)(e.suggested_price,a):"-"})]})]}),e.recipeIngredients&&e.recipeIngredients.length>0&&(0,h.jsxs)(B,{children:[(0,h.jsxs)(S,{children:[e.recipeIngredients.length," ingredient",e.recipeIngredients.length>1?"s":""]}),(0,h.jsxs)(z,{children:[e.recipeIngredients.slice(0,4).map((e,i)=>{var t;return(0,h.jsx)(I,{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`},i)}),e.recipeIngredients.length>4&&(0,h.jsxs)(I,{children:["+",e.recipeIngredients.length-4," more"]})]})]}),(0,h.jsxs)(R,{children:[(0,h.jsx)(D,{variant:"secondary",onClick:i=>{i.stopPropagation(),je(e)},children:"Edit"}),(0,h.jsx)(D,{variant:"danger",onClick:i=>{i.stopPropagation(),(async e=>{if(confirm(`Are you sure you want to delete "${e.name}"?`))try{const i=await(0,u.ff)(`/api/product-recipes/${e.id}`,{method:"DELETE"});i.success?ve():alert(i.error||"Failed to delete recipe")}catch(i){console.error("Failed to delete recipe:",i),alert("Failed to delete recipe")}})(e)},children:"Delete"})]})]},e.id)})}),(0,h.jsxs)(p.aF,{isOpen:se,onClose:()=>de(!1),title:le?"Edit Recipe":"Add Recipe",size:"large",children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Recipe Name *"}),(0,h.jsx)(p.ZQ,{value:ge.name,onChange:e=>ue({...ge,name:e.target.value}),placeholder:"e.g., Grilled Chicken"})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Category"}),(0,h.jsxs)(p.FX,{value:ge.category_id,onChange:e=>ue({...ge,category_id:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"Select Category"}),G.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Emoji"}),(0,h.jsx)(p.ZQ,{value:ge.emoji,onChange:e=>ue({...ge,emoji:e.target.value}),placeholder:"e.g., \ud83c\udf57"})]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)(p.Lz,{value:ge.description,onChange:e=>ue({...ge,description:e.target.value}),placeholder:"Brief description of the recipe",rows:2})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Prep Time (min)"}),(0,h.jsx)(p.ZQ,{type:"number",min:"0",value:ge.prep_time,onChange:e=>ue({...ge,prep_time:e.target.value})})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Cook Time (min)"}),(0,h.jsx)(p.ZQ,{type:"number",min:"0",value:ge.cook_time,onChange:e=>ue({...ge,cook_time:e.target.value})})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsxs)(p.lR,{children:["Suggested Price (",a,")"]}),(0,h.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",value:ge.suggested_price,onChange:e=>ue({...ge,suggested_price:e.target.value})})]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Instructions"}),(0,h.jsx)(p.Lz,{value:ge.instructions,onChange:e=>ue({...ge,instructions:e.target.value}),placeholder:"Step-by-step cooking instructions",rows:4})]}),(0,h.jsx)(O,{children:"Ingredients"}),(0,h.jsx)(Q,{onClick:()=>{me([...he,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"+ Add Ingredient"}),he.length>0&&(0,h.jsxs)(M,{children:[(0,h.jsxs)(q,{children:[(0,h.jsx)("span",{children:"Ingredient"}),(0,h.jsx)("span",{children:"Quantity"}),(0,h.jsx)("span",{children:"Unit"}),(0,h.jsx)("span",{children:"Notes"}),(0,h.jsx)("span",{})]}),he.map((e,i)=>(0,h.jsxs)(P,{children:[(0,h.jsxs)(p.FX,{value:e.ingredient_id||"",onChange:e=>be(i,"ingredient_id",parseInt(e.target.value)),children:[(0,h.jsx)("option",{value:"",children:"Select Ingredient"}),V.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.name," (",(0,g.vv)(e.unit_cost,a),"/",e.unit,")"]},e.id))]}),(0,h.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",placeholder:"Qty",value:e.quantity,onChange:e=>be(i,"quantity",e.target.value)}),(0,h.jsx)(p.ZQ,{value:e.unit,onChange:e=>be(i,"unit",e.target.value),placeholder:"Unit"}),(0,h.jsx)(p.ZQ,{value:e.notes,onChange:e=>be(i,"notes",e.target.value),placeholder:"Notes"}),(0,h.jsx)(U,{onClick:()=>(e=>{me(he.filter((i,t)=>t!==e))})(i),children:"\xd7"})]},i))]}),(0,h.jsxs)(Y,{children:[(0,h.jsx)(Z,{children:"Total Ingredient Cost"}),(0,h.jsx)(J,{children:(0,g.vv)(he.reduce((e,i)=>{const t=V.find(e=>e.id===i.ingredient_id);return t&&i.quantity?e+t.unit_cost*parseFloat(i.quantity):e},0),a)})]}),(0,h.jsxs)(W,{children:[(0,h.jsx)(p.yl,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,h.jsx)(p.yl,{variant:"primary",onClick:async()=>{if(ge.name.trim())try{xe(!0);const e={name:ge.name,description:ge.description||null,category_id:ge.category_id?parseInt(ge.category_id):null,emoji:ge.emoji||null,prep_time:ge.prep_time?parseInt(ge.prep_time):null,cook_time:ge.cook_time?parseInt(ge.cook_time):null,instructions:ge.instructions||null,suggested_price:ge.suggested_price?parseFloat(ge.suggested_price):null,ingredients:he.filter(e=>e.ingredient_id&&e.quantity).map(e=>({ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,notes:e.notes||null}))},i=le?`/api/product-recipes/${le.id}`:"/api/product-recipes",t=le?"PUT":"POST",n=await(0,u.ff)(i,{method:t,body:JSON.stringify(e)});n.success?(de(!1),ve()):alert(n.error||"Failed to save recipe")}catch(e){console.error("Failed to save recipe:",e),alert("Failed to save recipe")}finally{xe(!1)}else alert("Recipe name is required")},disabled:pe,children:pe?"Saving...":"Save Recipe"})]})]})]})};var X=t(7617);const V=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,K=r.Ay.div`
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
`,G=r.Ay.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
`,ee=r.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,ie=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,te=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,ne=r.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,re=r.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  background: #D1FAE5;
  color: #065F46;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`,oe=r.Ay.div`
  margin: 12px 0;
`,ae=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,se=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,de=r.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,le=r.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,ce=r.Ay.button`
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
`,pe=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,xe=r.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,ge=r.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,ue=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,he=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,me=r.Ay.div`
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
`,ye=r.Ay.div`
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`,ve=r.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"out"===e.status?"#FEE2E2":"low"===e.status?"#FEF3C7":"#ECFDF5"};
  color: ${e=>"out"===e.status?"#DC2626":"low"===e.status?"#D97706":"#059669"};
`,fe=e=>{let{onCountChange:i,categoryRefreshKey:t}=e;const{defaultCurrency:r}=(0,x.i1)(),[o,a]=(0,n.useState)("RM"),[s,d]=(0,n.useState)([]),[m,y]=(0,n.useState)([]),[v,f]=(0,n.useState)(!0),[j,b]=(0,n.useState)(""),[F,k]=(0,n.useState)("all"),[w,C]=(0,n.useState)(!1),[A,_]=(0,n.useState)(null),[E,B]=(0,n.useState)(!1),[S,z]=(0,n.useState)({isOpen:!1,ingredientId:null,ingredientName:""}),[I,R]=(0,n.useState)({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0});(0,n.useEffect)(()=>{r&&a(r)},[r]);const D=(0,n.useCallback)(async()=>{try{f(!0);const[t,n]=await Promise.all([(0,u.ff)("/api/product-ingredients"),(0,u.ff)("/api/product-ingredient-categories")]);var e;if(t.success)d(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0);n.success&&y(n.data||[])}catch(t){console.error("Failed to fetch data:",t)}finally{f(!1)}},[i]);(0,n.useEffect)(()=>{D()},[D,t]);const $=e=>{var i;e?(_(e),R({name:e.name,category_id:(null===(i=e.category_id)||void 0===i?void 0:i.toString())||"",image_url:e.image_url||"",unit:e.unit,base_quantity:e.base_quantity.toString(),unit_cost:e.unit_cost.toString(),supplier_name:e.supplier_name||"",min_stock:e.min_stock.toString(),min_order:e.min_order.toString(),current_stock:e.current_stock.toString(),track_stock:e.track_stock})):(_(null),R({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0}));C(!0)},L=()=>{C(!1),_(null),R({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0})},T=e=>e.track_stock?e.current_stock<=0?"out":e.current_stock<=e.min_stock?"low":"normal":"normal",N=s.filter(e=>{var i;const t=e.name.toLowerCase().includes(j.toLowerCase())||e.code.toLowerCase().includes(j.toLowerCase()),n="all"===F||(null===(i=e.category_id)||void 0===i?void 0:i.toString())===F;return t&&n}),O=[{id:"all",name:"All Categories"},...m.map(e=>({id:e.id.toString(),name:e.name}))];return v?(0,h.jsx)(xe,{children:(0,h.jsx)(ge,{children:"Loading..."})}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(he,{children:[(0,h.jsxs)(c.Qn,{style:{marginBottom:0,flex:1},children:[(0,h.jsx)(c.DO,{type:"text",placeholder:"Search ingredients...",value:j,onChange:e=>b(e.target.value)}),(0,h.jsx)(c.Jt,{value:F,onChange:e=>k(e.target.value),children:O.map(e=>(0,h.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,h.jsx)(l.cc,{variant:"primary",onClick:()=>$(),style:{whiteSpace:"nowrap"},children:"+ New Ingredient"})]}),0===N.length?(0,h.jsxs)(xe,{children:[(0,h.jsx)(ge,{children:"No ingredients found"}),(0,h.jsx)(ue,{children:j||"all"!==F?"Try adjusting your filters":"Add ingredients to use in your product recipes"}),!j&&"all"===F&&(0,h.jsx)(l.cc,{variant:"primary",onClick:()=>$(),children:"+ Create First Ingredient"})]}):(0,h.jsx)(V,{children:N.map(e=>{var i,t;return(0,h.jsxs)(K,{isActive:e.is_active,children:[e.image_url&&(0,h.jsx)(G,{children:(0,h.jsx)(ee,{src:e.image_url,alt:e.name})}),(0,h.jsx)(ie,{children:(0,h.jsxs)("div",{children:[(0,h.jsxs)(te,{children:[e.name,e.track_stock&&(0,h.jsx)(re,{children:"Stock"})]}),(0,h.jsxs)(ne,{children:[null===(i=e.category)||void 0===i?void 0:i.emoji," ",(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized"]})]})}),(0,h.jsxs)(oe,{children:[(0,h.jsxs)(ae,{children:[(0,h.jsx)(se,{children:"Unit Cost"}),(0,h.jsx)(de,{children:(0,g.vv)(Number(e.unit_cost),o)})]}),(0,h.jsxs)(ae,{children:[(0,h.jsx)(se,{children:"Base Qty / Unit"}),(0,h.jsxs)(de,{children:[Number(e.base_quantity||1)," ",e.unit]})]}),e.supplier_name&&(0,h.jsxs)(ae,{children:[(0,h.jsx)(se,{children:"Supplier"}),(0,h.jsx)(de,{children:e.supplier_name})]}),e.code&&(0,h.jsxs)(ae,{children:[(0,h.jsx)(se,{children:"Code"}),(0,h.jsx)(de,{children:e.code})]}),e.track_stock&&(0,h.jsxs)(ae,{children:[(0,h.jsx)(se,{children:"Stock"}),(0,h.jsxs)(ve,{status:T(e),children:[e.current_stock," ",e.unit]})]})]}),(0,h.jsxs)(le,{children:[(0,h.jsx)(ce,{variant:"secondary",onClick:()=>$(e),children:"Edit"}),(0,h.jsx)(ce,{variant:"danger",onClick:()=>(e=>{z({isOpen:!0,ingredientId:e.id,ingredientName:e.name})})(e),children:"Delete"})]})]},e.id)})}),(0,h.jsx)(p.aF,{isOpen:w,onClose:L,title:A?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,h.jsxs)("form",{onSubmit:e=>{e.preventDefault(),(async()=>{if(I.name.trim()&&I.unit.trim())try{B(!0);const e=A?`/api/product-ingredients/${A.id}`:"/api/product-ingredients",i=A?"PUT":"POST",t=await(0,u.ff)(e,{method:i,body:JSON.stringify({name:I.name,category_id:I.category_id?parseInt(I.category_id):null,image_url:I.image_url||null,unit:I.unit,base_quantity:parseFloat(I.base_quantity)||1,unit_cost:parseFloat(I.unit_cost)||0,supplier_name:I.supplier_name||null,min_stock:parseFloat(I.min_stock)||0,min_order:parseFloat(I.min_order)||0,current_stock:parseFloat(I.current_stock)||0,track_stock:I.track_stock})});t.success?(L(),D()):alert(t.error||"Failed to save ingredient")}catch(e){console.error("Failed to save ingredient:",e),alert("Failed to save ingredient")}finally{B(!1)}else alert("Name and Unit are required")})()},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Image"}),(0,h.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{var i;const t=null===(i=e.target.files)||void 0===i?void 0:i[0];if(t){const e=new FileReader;e.onloadend=()=>{R({...I,image_url:e.result})},e.readAsDataURL(t)}},style:{display:"none"},id:"ingredient-image-upload"}),(0,h.jsx)(me,{onClick:()=>{var e;return null===(e=document.getElementById("ingredient-image-upload"))||void 0===e?void 0:e.click()},children:I.image_url?(0,h.jsx)("img",{src:I.image_url,alt:"Ingredient"}):(0,h.jsx)(ye,{children:"Click to upload image"})})]}),(0,h.jsxs)(p.fh,{children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Ingredient Name *"}),(0,h.jsx)(p.ZQ,{type:"text",value:I.name,onChange:e=>R({...I,name:e.target.value}),placeholder:"e.g., Chicken Breast",required:!0})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Category"}),(0,h.jsxs)(p.FX,{value:I.category_id,onChange:e=>R({...I,category_id:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"Select category..."}),m.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]})]}),(0,h.jsxs)(p.fh,{children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Base Quantity *"}),(0,h.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0.01",value:I.base_quantity,onChange:e=>R({...I,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Unit *"}),(0,h.jsxs)(p.FX,{value:I.unit,onChange:e=>R({...I,unit:e.target.value}),required:!0,children:[(0,h.jsx)("option",{value:"",children:"Select unit..."}),(0,h.jsx)("option",{value:"kg",children:"kg"}),(0,h.jsx)("option",{value:"g",children:"g"}),(0,h.jsx)("option",{value:"L",children:"L"}),(0,h.jsx)("option",{value:"ml",children:"ml"}),(0,h.jsx)("option",{value:"piece",children:"piece"}),(0,h.jsx)("option",{value:"pack",children:"pack"}),(0,h.jsx)("option",{value:"can",children:"can"}),(0,h.jsx)("option",{value:"bottle",children:"bottle"})]})]})]}),(0,h.jsxs)(p.fh,{children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsxs)(p.lR,{children:["Unit Cost (",o,") *"]}),(0,h.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",value:I.unit_cost,onChange:e=>R({...I,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Supplier"}),(0,h.jsx)(p.ZQ,{type:"text",value:I.supplier_name,onChange:e=>R({...I,supplier_name:e.target.value}),placeholder:"Supplier name"})]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"},children:[(0,h.jsx)("input",{type:"checkbox",checked:I.track_stock,onChange:e=>R({...I,track_stock:e.target.checked}),style:{width:"18px",height:"18px",cursor:"pointer"}}),(0,h.jsx)("span",{style:{fontSize:"14px",color:"#0A2540"},children:"Track in Inventory Stock List"})]}),(0,h.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px",display:"block"},children:"Enable to include this ingredient in inventory stock management"})]}),I.track_stock&&(0,h.jsxs)(p.fh,{children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Current Stock"}),(0,h.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",value:I.current_stock,onChange:e=>R({...I,current_stock:e.target.value})})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Min Stock (Alert)"}),(0,h.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",value:I.min_stock,onChange:e=>R({...I,min_stock:e.target.value})})]})]}),(0,h.jsxs)(pe,{children:[(0,h.jsx)(p.yl,{type:"button",variant:"secondary",onClick:L,children:"Cancel"}),(0,h.jsx)(p.yl,{type:"submit",variant:"primary",disabled:E,children:E?"Saving...":A?"Update Ingredient":"Create Ingredient"})]})]})}),(0,h.jsx)(X.A,{isOpen:S.isOpen,title:"Delete Ingredient",message:`Are you sure you want to delete "${S.ingredientName}"? This action cannot be undone.`,onConfirm:async()=>{if(S.ingredientId)try{const e=await(0,u.ff)(`/api/product-ingredients/${S.ingredientId}`,{method:"DELETE"});e.success?D():alert(e.error||"Failed to delete ingredient")}catch(e){console.error("Failed to delete ingredient:",e),alert("Failed to delete ingredient")}finally{z({isOpen:!1,ingredientId:null,ingredientName:""})}},onCancel:()=>{z({isOpen:!1,ingredientId:null,ingredientName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},je=r.Ay.div`
  padding: 24px 0;
`,be=r.Ay.div`
  display: grid;
  gap: 12px;
`,Fe=r.Ay.div`
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
`,ke=r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,we=r.Ay.div`
  flex: 1;
`,Ce=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Ae=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,_e=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,Ee=r.Ay.div`
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
`,Se=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ze=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,Ie=r.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Re=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,De=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,$e=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,Le=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,Te=r.Ay.button`
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
`,Ne=e=>{let{onCountChange:i,onCategoryChange:t}=e;const[r,o]=(0,n.useState)([]),[a,d]=(0,n.useState)(!0),[c,x]=(0,n.useState)(!1),[g,m]=(0,n.useState)(null),[y,v]=(0,n.useState)(!1),[f,j]=(0,n.useState)(!1),[b,F]=(0,n.useState)(null),[k,w]=(0,n.useState)({name:"",emoji:"",description:""}),C=(0,n.useCallback)(async()=>{try{d(!0);const t=await(0,u.ff)("/api/product-recipe-categories");var e;if(t.success)o(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{d(!1)}},[i]);(0,n.useEffect)(()=>{C()},[C]);const A=e=>{e?(m(e),w({name:e.name,emoji:e.emoji||"",description:e.description||""})):(m(null),w({name:"",emoji:"",description:""})),x(!0)},_=()=>{x(!1),m(null),w({name:"",emoji:"",description:""})},E=async e=>{if(e.preventDefault(),k.name.trim())try{v(!0);const e=g?`/api/product-recipe-categories/${g.id}`:"/api/product-recipe-categories",i=g?"PUT":"POST",n=await(0,u.ff)(e,{method:i,body:JSON.stringify({name:k.name.trim(),emoji:k.emoji||null,description:k.description.trim()||null})});n.success?(_(),C(),null===t||void 0===t||t()):alert(n.error||"Failed to save category")}catch(i){console.error("Failed to save category:",i),alert("Failed to save category")}finally{v(!1)}},B=async(e,i)=>{const t="up"===i?e-1:e+1;if(t<0||t>=r.length)return;const n=[...r];[n[e],n[t]]=[n[t],n[e]];const o=n.map((e,i)=>({id:e.id,display_order:i}));try{await(0,u.ff)("/api/product-recipe-categories/reorder",{method:"PUT",body:JSON.stringify({orders:o})}),C()}catch(a){console.error("Failed to reorder:",a)}};return a?(0,h.jsx)(je,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,h.jsxs)(je,{children:[(0,h.jsxs)(De,{children:[(0,h.jsx)($e,{children:"Recipe Categories"}),(0,h.jsx)(l.cc,{variant:"primary",onClick:()=>A(),children:"Add Category"})]}),0===r.length?(0,h.jsxs)(ze,{children:[(0,h.jsx)(Ie,{children:"No categories yet"}),(0,h.jsx)(Re,{children:"Create categories to organize your product recipes"}),(0,h.jsx)(l.cc,{variant:"primary",onClick:()=>A(),children:"Add First Category"})]}):(0,h.jsx)(be,{children:r.map((e,i)=>(0,h.jsxs)(Fe,{isActive:e.is_active,children:[(0,h.jsx)(s.Xd,{onMoveUp:()=>B(i,"up"),onMoveDown:()=>B(i,"down"),disableUp:0===i,disableDown:i===r.length-1}),e.emoji&&(0,h.jsx)(ke,{children:e.emoji}),(0,h.jsxs)(we,{children:[(0,h.jsx)(Ce,{children:e.name}),(0,h.jsxs)(Ae,{children:[(0,h.jsxs)("span",{children:[e.recipe_count||0," recipes"]}),(0,h.jsx)(Se,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,h.jsx)(_e,{children:e.description})]}),(0,h.jsxs)(Ee,{children:[(0,h.jsx)(Be,{onClick:()=>A(e),title:"Edit",children:(0,h.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,h.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,h.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,h.jsx)(Be,{onClick:()=>(async e=>{try{(await(0,u.ff)(`/api/product-recipe-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&C()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,h.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,h.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,h.jsx)(Be,{onClick:()=>(e=>{F(e),j(!0)})(e),title:"Delete",disabled:(e.recipe_count||0)>0,children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,h.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,h.jsx)(p.aF,{isOpen:c,onClose:_,title:(g?"Edit":"New")+" Recipe Category",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.yl,{variant:"secondary",onClick:_,children:"Cancel"}),(0,h.jsx)(p.yl,{variant:"primary",onClick:E,disabled:!k.name.trim()||y,children:y?"Saving...":g?"Update":"Create"})]}),children:(0,h.jsxs)("form",{onSubmit:E,children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Category Name *"}),(0,h.jsx)(p.ZQ,{type:"text",value:k.name,onChange:e=>w({...k,name:e.target.value}),placeholder:"e.g., Main Dishes",autoFocus:!0,required:!0})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Icon"}),(0,h.jsx)(Le,{children:["\ud83c\udf54","\ud83c\udf55","\ud83c\udf57","\ud83e\udd57","\ud83c\udf5c","\ud83c\udf5d","\ud83c\udf64","\ud83e\udd58","\ud83c\udf5b","\ud83c\udf72","\u2615","\ud83e\udd64","\ud83e\uddc3","\ud83c\udf75","\ud83e\uddcb","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd43","\ud83c\udf79","\ud83c\udf78","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf68","\ud83c\udf67","\ud83c\udf66","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6b","\ud83e\udd50","\ud83e\udd56","\ud83c\udf5e","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf71","\ud83c\udf59","\ud83c\udf58","\ud83c\udf63","\ud83c\udf65","\ud83c\udf61","\ud83c\udf62","\ud83c\udf60","\ud83e\udd5f","\ud83e\udd60","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf5f","\ud83e\uded3","\ud83e\udd53","\ud83e\uddc6"].map(e=>(0,h.jsx)(Te,{selected:k.emoji===e,onClick:()=>w({...k,emoji:e}),type:"button",children:e},e))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)(p.Lz,{value:k.description,onChange:e=>w({...k,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,h.jsx)(X.A,{isOpen:f,onCancel:()=>{j(!1),F(null)},onConfirm:async()=>{if(b)try{const e=await(0,u.ff)(`/api/product-recipe-categories/${b.id}`,{method:"DELETE"});e.success?(j(!1),F(null),C(),null===t||void 0===t||t()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:b?`Are you sure you want to delete "${b.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},Oe=r.Ay.div`
  padding: 24px 0;
`,Me=r.Ay.div`
  display: grid;
  gap: 12px;
`,qe=r.Ay.div`
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
`,Pe=r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,Ue=r.Ay.div`
  flex: 1;
`,Qe=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Ye=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,Ze=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,Je=r.Ay.div`
  display: flex;
  gap: 8px;
`,We=r.Ay.button`
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
`,He=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,Xe=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,Ve=r.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Ke=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,Ge=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,ei=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,ii=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,ti=r.Ay.button`
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
`,ni=e=>{let{onCountChange:i,onCategoryChange:t}=e;const[r,o]=(0,n.useState)([]),[a,d]=(0,n.useState)(!0),[c,x]=(0,n.useState)(!1),[g,m]=(0,n.useState)(null),[y,v]=(0,n.useState)(!1),[f,j]=(0,n.useState)(!1),[b,F]=(0,n.useState)(null),[k,w]=(0,n.useState)({name:"",emoji:"",description:""}),C=(0,n.useCallback)(async()=>{try{d(!0);const t=await(0,u.ff)("/api/product-ingredient-categories");var e;if(t.success)o(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{d(!1)}},[i]);(0,n.useEffect)(()=>{C()},[C]);const A=e=>{e?(m(e),w({name:e.name,emoji:e.emoji||"",description:e.description||""})):(m(null),w({name:"",emoji:"",description:""})),x(!0)},_=()=>{x(!1),m(null),w({name:"",emoji:"",description:""})},E=async e=>{if(e.preventDefault(),k.name.trim())try{v(!0);const e=g?`/api/product-ingredient-categories/${g.id}`:"/api/product-ingredient-categories",i=g?"PUT":"POST",n=await(0,u.ff)(e,{method:i,body:JSON.stringify({name:k.name.trim(),emoji:k.emoji||null,description:k.description.trim()||null})});n.success?(_(),C(),null===t||void 0===t||t()):alert(n.error||"Failed to save category")}catch(i){console.error("Failed to save category:",i),alert("Failed to save category")}finally{v(!1)}},B=async(e,i)=>{const t="up"===i?e-1:e+1;if(t<0||t>=r.length)return;const n=[...r];[n[e],n[t]]=[n[t],n[e]];const o=n.map((e,i)=>({id:e.id,display_order:i}));try{await(0,u.ff)("/api/product-ingredient-categories/reorder",{method:"PUT",body:JSON.stringify({orders:o})}),C()}catch(a){console.error("Failed to reorder:",a)}};return a?(0,h.jsx)(Oe,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,h.jsxs)(Oe,{children:[(0,h.jsxs)(Ge,{children:[(0,h.jsx)(ei,{children:"Ingredient Categories"}),(0,h.jsx)(l.cc,{variant:"primary",onClick:()=>A(),children:"Add Category"})]}),0===r.length?(0,h.jsxs)(Xe,{children:[(0,h.jsx)(Ve,{children:"No categories yet"}),(0,h.jsx)(Ke,{children:"Create categories to organize your ingredients"}),(0,h.jsx)(l.cc,{variant:"primary",onClick:()=>A(),children:"Add First Category"})]}):(0,h.jsx)(Me,{children:r.map((e,i)=>(0,h.jsxs)(qe,{isActive:e.is_active,children:[(0,h.jsx)(s.Xd,{onMoveUp:()=>B(i,"up"),onMoveDown:()=>B(i,"down"),disableUp:0===i,disableDown:i===r.length-1}),e.emoji&&(0,h.jsx)(Pe,{children:e.emoji}),(0,h.jsxs)(Ue,{children:[(0,h.jsx)(Qe,{children:e.name}),(0,h.jsxs)(Ye,{children:[(0,h.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),(0,h.jsx)(He,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,h.jsx)(Ze,{children:e.description})]}),(0,h.jsxs)(Je,{children:[(0,h.jsx)(We,{onClick:()=>A(e),title:"Edit",children:(0,h.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,h.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,h.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,h.jsx)(We,{onClick:()=>(async e=>{try{(await(0,u.ff)(`/api/product-ingredient-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&C()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,h.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,h.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,h.jsx)(We,{onClick:()=>(e=>{F(e),j(!0)})(e),title:"Delete",disabled:(e.ingredient_count||0)>0,children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,h.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,h.jsx)(p.aF,{isOpen:c,onClose:_,title:(g?"Edit":"New")+" Ingredient Category",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(p.yl,{variant:"secondary",onClick:_,children:"Cancel"}),(0,h.jsx)(p.yl,{variant:"primary",onClick:E,disabled:!k.name.trim()||y,children:y?"Saving...":g?"Update":"Create"})]}),children:(0,h.jsxs)("form",{onSubmit:E,children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Category Name *"}),(0,h.jsx)(p.ZQ,{type:"text",value:k.name,onChange:e=>w({...k,name:e.target.value}),placeholder:"e.g., Proteins",autoFocus:!0,required:!0})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Icon"}),(0,h.jsx)(ii,{children:["\ud83e\udd69","\ud83c\udf56","\ud83e\udd53","\ud83c\udf57","\ud83e\udd90","\ud83e\udd9e","\ud83e\udd80","\ud83d\udc1f","\ud83e\udd5a","\ud83e\uddc0","\ud83e\udd6c","\ud83e\udd66","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83e\udd52","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83c\udf4e","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd5d","\ud83c\udf4c","\ud83e\udd6d","\ud83c\udf4d","\ud83e\uddc8","\ud83e\udd5b","\ud83e\uddc2","\ud83c\udf6f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5a","\ud83c\udf5d","\ud83e\udd6b","\ud83e\uddca","\ud83d\udca7","\ud83c\udf76","\ud83e\uded7","\ud83e\uddf4","\ud83e\uddf9","\ud83e\uddfd","\ud83d\udce6","\ud83c\udff7\ufe0f","\ud83d\udd16"].map(e=>(0,h.jsx)(ti,{selected:k.emoji===e,onClick:()=>w({...k,emoji:e}),type:"button",children:e},e))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)(p.Lz,{value:k.description,onChange:e=>w({...k,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,h.jsx)(X.A,{isOpen:f,onCancel:()=>{j(!1),F(null)},onConfirm:async()=>{if(b)try{const e=await(0,u.ff)(`/api/product-ingredient-categories/${b.id}`,{method:"DELETE"});e.success?(j(!1),F(null),C(),null===t||void 0===t||t()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:b?`Are you sure you want to delete "${b.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},ri=r.Ay.span`
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
`,oi=()=>{const{user:e}=(0,d.As)(),[i,t]=(0,o.ok)(),[r,l]=(0,n.useState)(0),[c,p]=(0,n.useState)(0),[x,g]=(0,n.useState)(0),[u,m]=(0,n.useState)(0),[y,v]=(0,n.useState)(0),[f,j]=(0,n.useState)(0),b=i.get("tab")||"recipes",F=null===e||void 0===e?void 0:e.brand_id,k=e=>{t({tab:e})};return F?(0,h.jsx)(a.A,{children:(0,h.jsxs)(s.mc,{children:[(0,h.jsx)(s.Y9,{children:(0,h.jsx)(s.hE,{children:"Product Recipes"})}),(0,h.jsxs)(s.UC,{children:[(0,h.jsxs)(s.j,{children:[(0,h.jsxs)(s.oz,{active:"recipes"===b,onClick:()=>k("recipes"),children:["Recipes",(0,h.jsx)(ri,{children:r})]}),(0,h.jsxs)(s.oz,{active:"ingredients"===b,onClick:()=>k("ingredients"),children:["Ingredients",(0,h.jsx)(ri,{children:c})]}),(0,h.jsxs)(s.oz,{active:"recipe-categories"===b,onClick:()=>k("recipe-categories"),children:["Recipe Categories",(0,h.jsx)(ri,{children:x})]}),(0,h.jsxs)(s.oz,{active:"ingredient-categories"===b,onClick:()=>k("ingredient-categories"),children:["Ingredient Categories",(0,h.jsx)(ri,{children:u})]})]}),(0,h.jsx)("div",{style:{display:"recipes"===b?"block":"none"},children:(0,h.jsx)(H,{onCountChange:l,categoryRefreshKey:f})}),(0,h.jsx)("div",{style:{display:"ingredients"===b?"block":"none"},children:(0,h.jsx)(fe,{onCountChange:p,categoryRefreshKey:y})}),(0,h.jsx)("div",{style:{display:"recipe-categories"===b?"block":"none"},children:(0,h.jsx)(Ne,{onCountChange:g,onCategoryChange:()=>j(e=>e+1)})}),(0,h.jsx)("div",{style:{display:"ingredient-categories"===b?"block":"none"},children:(0,h.jsx)(ni,{onCountChange:m,onCategoryChange:()=>v(e=>e+1)})})]})]})}):(0,h.jsx)(a.A,{children:(0,h.jsxs)(s.mc,{children:[(0,h.jsx)(s.Y9,{children:(0,h.jsx)(s.hE,{children:"Product Recipes"})}),(0,h.jsx)(s.UC,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Brand not found. Please log in with a brand account."})})]})})}},7617:(e,i,t)=>{t.d(i,{A:()=>x});t(9950);var n=t(4752),r=t(9610),o=t(4414);const a=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=n.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=n.Ay.button`
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
`,x=e=>{let{isOpen:i,title:t,message:n,onConfirm:x,onCancel:g,confirmText:u="Confirm",cancelText:h="Cancel",type:m="warning"}=e;return i?(0,o.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&g()},children:(0,o.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(s,{children:[(0,o.jsx)(d,{children:t}),(0,o.jsx)(l,{children:n})]}),(0,o.jsxs)(c,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:g,children:h}),(0,o.jsx)(p,{variant:"primary",type:m,onClick:x,children:u})]})]})}):null}}}]);