"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6152],{2488:(e,r,i)=>{i.d(r,{DO:()=>l,Jt:()=>c,Qn:()=>d});i(9950);var n=i(4752),t=i(4414);const a=n.Ay.div`
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
`,d=e=>{let{children:r,className:i,style:n,...o}=e;return(0,t.jsx)(a,{className:i,style:n,...o,children:r})},l=e=>{let{placeholder:r="Search...",...i}=e;return(0,t.jsx)(o,{placeholder:r,...i})},c=e=>{let{children:r,...i}=e;return(0,t.jsx)(s,{...i,children:r})}},3705:(e,r,i)=>{i.d(r,{cc:()=>t});var n=i(4752);const t=n.Ay.button`
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
`},4021:(e,r,i)=>{i.d(r,{i1:()=>o});var n=i(9950),t=i(1367),a=i(6038);const o=()=>{const{user:e}=(0,t.As)(),[r,i]=(0,n.useState)("RM"),[o,s]=(0,n.useState)(Object.keys(a.DL)),[d,l]=(0,n.useState)(!0),[c,p]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),n=r.indexOf("restaurant");let t=n>=0?r[n+1]:null;if(!t&&null!==e&&void 0!==e&&e.restaurant_id&&(t=e.restaurant_id.toString()),!t)return i("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var a;const e=await r.json(),n=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";i(n)}else i("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),i("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:o,loading:d,error:c}}},6152:(e,r,i)=>{i.r(r),i.d(r,{default:()=>Y});var n=i(9950),t=i(4752),a=i(3705),o=i(6649),s=i(2488),d=i(1367),l=i(9610),c=i(4021),p=i(6038),x=i(4414);const u=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,g=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>e.isActive?1:.6};
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,h=t.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,m=t.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,v=t.Ay.div`
  flex: 1;
  min-width: 0;
`,y=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,b=t.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,j=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,w=t.Ay.div``,F=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,k=t.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,_=t.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,A=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,C=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,E=t.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,B=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  padding: 10px;
  background: #FAFAFA;
  border-radius: 8px;
  font-size: 12px;
  color: #6B7280;
`,S=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,R=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
  padding: 8px;
  background: #FFFBEB;
  border-radius: 6px;
  border-left: 3px solid #F59E0B;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,z=t.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,I=t.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F8FAFC;\n          border: 1px solid #E2E8F0;\n          color: #475569;\n          &:hover {\n            background: #F1F5F9;\n            transform: translateY(-1px);\n          }\n        "}}}
`,$=t.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,D=(t.Ay.div`
  font-size: 64px;
  margin-bottom: 16px;
`,t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`),q=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,M=t.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,T=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,O=t.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr 40px;
  gap: 8px;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Q=t.Ay.button`
  background: #FEE2E2;
  color: #DC2626;
  border: none;
  border-radius: 6px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
  line-height: 1;

  &:hover {
    background: #FCA5A5;
  }
`,N=t.Ay.button`
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

  &:hover {
    background: #E0E7FF;
  }
`,U=t.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,P=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,L=t.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`,Z=t.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,Y=()=>{const{user:e}=(0,d.As)(),{defaultCurrency:r,supportedCurrencies:i}=(0,c.i1)(),[t,Y]=(0,n.useState)(""),[G,J]=(0,n.useState)([]),[W,H]=(0,n.useState)([]),[V,X]=(0,n.useState)(!0),[K,ee]=(0,n.useState)(""),[re,ie]=(0,n.useState)("all"),[ne,te]=(0,n.useState)(null),[ae,oe]=(0,n.useState)(!1),[se,de]=(0,n.useState)(!0),[le,ce]=(0,n.useState)({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),[pe,xe]=(0,n.useState)([]),[ue,ge]=(0,n.useState)(!1),[he,me]=(0,n.useState)(null);(0,n.useEffect)(()=>{r&&!t&&Y(r)},[r,t]),(0,n.useEffect)(()=>{(async()=>{if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role))try{const r=await fetch("/api/brands"),i=await r.json();if(i.success&&i.data.length>0){const r=i.data.find(r=>r.owner_id===e.id);r&&me(r.id)}}catch(r){console.error("Failed to fetch user brand:",r)}})()},[e]),(0,n.useEffect)(()=>{"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?he&&(ye(),ve()):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(ye(),ve())},[e,he]);const ve=async()=>{try{let r="";if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?he&&(r=`/api/brands/${he}/ingredients`):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&e.restaurant_id&&(r=`/api/restaurants/${e.restaurant_id}/ingredients`),!r)return;const i=await fetch(r),n=await i.json();n.success&&H(n.data)}catch(r){console.error("Failed to fetch ingredients:",r)}},ye=async()=>{try{X(!0);let a="";if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?he&&(a=`/api/brands/${he}/recipes`):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&e.restaurant_id&&(a=`/api/restaurants/${e.restaurant_id}/recipes`),!a)return void X(!1);const o=await fetch(a),s=await o.json();var r,i,n,t;if(s.success)if(Array.isArray(s.data))console.log("=== RECIPES API RESPONSE ==="),console.log("First recipe:",s.data[0]),console.log("prep_time:",null===(r=s.data[0])||void 0===r?void 0:r.prep_time),console.log("cook_time:",null===(i=s.data[0])||void 0===i?void 0:i.cook_time),console.log("instructions:",null===(n=s.data[0])||void 0===n?void 0:n.instructions),console.log("recipeIngredients:",null===(t=s.data[0])||void 0===t?void 0:t.recipeIngredients),J(s.data),de(!0);else J([...s.data.brand_recipes,...s.data.own_recipes]),de("brand"!==s.data.recipe_manager_type)}catch(a){console.error("Failed to fetch recipes:",a)}finally{X(!1)}},be=function(e){var r,i,n,t;(ge(arguments.length>1&&void 0!==arguments[1]&&arguments[1]),e)?(te(e),ce({name:e.name,description:e.description||"",category:e.category,emoji:e.emoji||"",image:e.image||"",prep_time:(null===(r=e.prep_time)||void 0===r?void 0:r.toString())||"",cook_time:(null===(i=e.cook_time)||void 0===i?void 0:i.toString())||"",instructions:e.instructions||"",suggested_price:(null===(n=e.suggested_price)||void 0===n?void 0:n.toString())||""}),xe((null===(t=e.recipeIngredients)||void 0===t?void 0:t.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""})))||[])):(te(null),ce({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),xe([]));oe(!0)},fe=()=>{oe(!1),te(null),ge(!1),ce({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),xe([])},je=async r=>{if(null===e||void 0===e||!e.restaurant_id)return void alert("Restaurant ID is required to register menu");const i=`"${r.name}" \ub808\uc2dc\ud53c\ub97c \uba54\ub274\ub85c \ub4f1\ub85d\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?\n\n\uac00\uaca9: ${(0,p.vv)(r.suggested_price||0,t||"USD")}`;if(window.confirm(i))try{const i=await fetch("/api/menu/product",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r.name,description:r.description||"",price:r.suggested_price||0,category:r.category,emoji:r.emoji||"\ud83c\udf7d\ufe0f",restaurant_id:e.restaurant_id,recipe_id:r.id})}),n=await i.json();n.success?alert(`"${r.name}" \uba54\ub274\uac00 \ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4!`):alert(n.error||"\uba54\ub274 \ub4f1\ub85d \uc2e4\ud328")}catch(n){console.error("Failed to register menu:",n),alert("\uba54\ub274 \ub4f1\ub85d \uc2e4\ud328")}},we=(e,r,i)=>{const n=[...pe];n[e]={...n[e],[r]:i},xe(n)},Fe=G.filter(e=>{const r=e.name.toLowerCase().includes(K.toLowerCase()),i="all"===re||e.category===re;return r&&i}),ke=["all",...Array.from(new Set(G.map(e=>e.category)))],_e=G.filter(e=>e.is_active).length,Ae=G.reduce((e,r)=>e+Number(r.total_ingredient_cost||0),0),Ce=G.length>0?Ae/G.length:0;return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(o.mc,{children:[(0,x.jsxs)(o.Y9,{children:[(0,x.jsx)(o.hE,{children:"Recipes"}),(0,x.jsx)(o.ex,{children:se&&(0,x.jsx)(a.cc,{variant:"primary",onClick:()=>be(null),children:"New Recipe"})})]}),(0,x.jsxs)(o.MD,{children:[(0,x.jsxs)(o.hI,{children:[(0,x.jsx)(o.v0,{children:"Total Recipes"}),(0,x.jsx)(o.Os,{children:G.length}),(0,x.jsxs)(o.d1,{children:[_e," active"]})]}),(0,x.jsxs)(o.hI,{children:[(0,x.jsx)(o.v0,{children:"Average Cost"}),(0,x.jsx)(o.Os,{children:(0,p.vv)(Ce,t||"USD")}),(0,x.jsx)(o.d1,{children:"per recipe"})]}),(0,x.jsxs)(o.hI,{children:[(0,x.jsx)(o.v0,{children:"Total Value"}),(0,x.jsx)(o.Os,{children:(0,p.vv)(Ae,t||"USD")}),(0,x.jsx)(o.d1,{children:"all recipes"})]})]}),(0,x.jsxs)(s.Qn,{children:[(0,x.jsx)(s.DO,{type:"text",placeholder:"Search recipes...",value:K,onChange:e=>ee(e.target.value)}),(0,x.jsx)(s.Jt,{value:re,onChange:e=>ie(e.target.value),children:ke.map(e=>(0,x.jsx)("option",{value:e,children:"all"===e?"All Categories":e},e))}),(0,x.jsx)(s.Jt,{value:t,onChange:e=>Y(e.target.value),style:{minWidth:"140px"},children:i.map(e=>(0,x.jsxs)("option",{value:e,children:[(0,p.Qn)(e)," ",e]},e))})]}),(0,x.jsx)(o.UC,{children:V?(0,x.jsx)($,{children:(0,x.jsx)(D,{children:"Loading..."})}):0===Fe.length?(0,x.jsxs)($,{children:[(0,x.jsx)(D,{children:"No recipes found"}),(0,x.jsx)(q,{children:K||"all"!==re?"Try adjusting your filters":se?"Create your first recipe to get started":"Brand recipes will appear here when available"}),!K&&"all"===re&&se&&(0,x.jsx)(a.cc,{variant:"primary",onClick:()=>be(null),children:"Create First Recipe"})]}):(0,x.jsx)(u,{children:Fe.map(r=>{var i;return(0,x.jsxs)(g,{isActive:r.is_active,onClick:()=>be(r,!0),children:[(0,x.jsxs)(h,{children:[r.emoji&&(0,x.jsx)(m,{children:r.emoji}),(0,x.jsxs)(v,{children:[(0,x.jsx)(y,{children:r.name}),(0,x.jsxs)("div",{style:{display:"flex",gap:"6px",alignItems:"center",flexWrap:"wrap"},children:[(0,x.jsx)(b,{children:r.category}),r.from_brand&&(0,x.jsx)(b,{style:{background:"#FEF3C7",color:"#D97706"},children:"Brand"})]})]})]}),r.description&&(0,x.jsx)(f,{children:r.description}),(0,x.jsxs)(j,{children:[(0,x.jsxs)(w,{children:[(0,x.jsx)(F,{children:"Cost"}),(0,x.jsx)(k,{children:(0,p.vv)(r.total_ingredient_cost||0,t||"USD")})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(F,{children:"Suggested"}),(0,x.jsx)(k,{children:(0,p.vv)(r.suggested_price||0,t||"USD")})]})]}),(r.prep_time||r.cook_time)&&(0,x.jsxs)(B,{children:[r.prep_time&&(0,x.jsxs)(S,{children:[(0,x.jsx)("span",{children:"Prep:"}),(0,x.jsxs)("strong",{children:[r.prep_time," min"]})]}),r.cook_time&&(0,x.jsxs)(S,{children:[(0,x.jsx)("span",{children:"Cook:"}),(0,x.jsxs)("strong",{children:[r.cook_time," min"]})]}),r.prep_time&&r.cook_time&&(0,x.jsxs)(S,{children:[(0,x.jsx)("span",{children:"Total:"}),(0,x.jsxs)("strong",{children:[r.prep_time+r.cook_time," min"]})]})]}),r.instructions&&(0,x.jsx)(R,{children:r.instructions}),(0,x.jsxs)(_,{children:[(0,x.jsxs)(A,{children:[(null===(i=r.recipeIngredients)||void 0===i?void 0:i.length)||0," ingredients"]}),r.recipeIngredients&&r.recipeIngredients.length>0&&(0,x.jsxs)(C,{children:[r.recipeIngredients.slice(0,5).map((e,r)=>{var i;return(0,x.jsx)(E,{children:(null===(i=e.ingredient)||void 0===i?void 0:i.name)||`Ingredient #${e.ingredient_id}`},r)}),r.recipeIngredients.length>5&&(0,x.jsxs)(E,{style:{background:"#E0E7FF",color:"#4F46E5"},children:["+",r.recipeIngredients.length-5," more"]})]})]}),(0,x.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[!1!==r.editable&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(I,{variant:"primary",onClick:()=>be(r,!1),children:"Edit"}),(0,x.jsx)(I,{variant:"danger",onClick:()=>(async r=>{if(window.confirm("\uc815\ub9d0 \uc774 \ub808\uc2dc\ud53c\ub97c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?"))try{let i="";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?i=`/api/brands/${he}/recipes/${r}`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(i=`/api/restaurants/${null===e||void 0===e?void 0:e.restaurant_id}/recipes/${r}`);const n=await fetch(i,{method:"DELETE"});(await n.json()).success&&(alert("\ub808\uc2dc\ud53c\uac00 \uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4"),ye())}catch(i){console.error("Failed to delete recipe:",i),alert("\ub808\uc2dc\ud53c \uc0ad\uc81c \uc2e4\ud328")}})(r.id),children:"Delete"})]}),(null===e||void 0===e?void 0:e.restaurant_id)&&(0,x.jsx)(I,{variant:"primary",onClick:()=>je(r),style:{background:"#10B981"},children:"+ Menu"})]})]},r.id)})})})]}),(0,x.jsx)(l.aF,{isOpen:ae,onClose:fe,title:ue?"Recipe Details":ne?"Edit Recipe":"New Recipe",size:"large",children:(0,x.jsxs)("form",{onSubmit:async r=>{if(r.preventDefault(),le.name&&le.category)try{let r="";const i=ne?"PUT":"POST";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?r=ne?`/api/brands/${he}/recipes/${ne.id}`:`/api/brands/${he}/recipes`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(r=ne?`/api/restaurants/${e.restaurant_id}/recipes/${ne.id}`:`/api/restaurants/${e.restaurant_id}/recipes`);const n=await fetch(r,{method:i,headers:{"Content-Type":"application/json"},body:JSON.stringify({name:le.name,description:le.description,category:le.category,emoji:le.emoji,image:le.image,prep_time:le.prep_time?parseInt(le.prep_time):null,cook_time:le.cook_time?parseInt(le.cook_time):null,instructions:le.instructions||null,suggested_price:parseFloat(le.suggested_price)||0,ingredients:pe.map(e=>({ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,notes:e.notes}))})}),t=await n.json();t.success?(alert(ne?"\ub808\uc2dc\ud53c\uac00 \uc218\uc815\ub418\uc5c8\uc2b5\ub2c8\ub2e4":"\ub808\uc2dc\ud53c\uac00 \uc0dd\uc131\ub418\uc5c8\uc2b5\ub2c8\ub2e4"),fe(),ye()):alert(t.error||"\ub808\uc2dc\ud53c \uc800\uc7a5 \uc2e4\ud328")}catch(i){console.error("Failed to save recipe:",i),alert("\ub808\uc2dc\ud53c \uc800\uc7a5 \uc2e4\ud328")}else alert("\ub808\uc2dc\ud53c \uc774\ub984\uacfc \uce74\ud14c\uace0\ub9ac\ub294 \ud544\uc218\uc785\ub2c8\ub2e4")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,x.jsxs)(l.fh,{children:[(0,x.jsxs)(l.gE,{children:[(0,x.jsxs)(l.lR,{children:["Recipe Name ",!ue&&"*"]}),(0,x.jsx)(l.ZQ,{type:"text",value:le.name,onChange:e=>ce({...le,name:e.target.value}),placeholder:"e.g., Nasi Lemak Special",required:!ue,disabled:ue})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsxs)(l.lR,{children:["Category ",!ue&&"*"]}),(0,x.jsx)(l.ZQ,{type:"text",value:le.category,onChange:e=>ce({...le,category:e.target.value}),placeholder:"e.g., Main Dish",required:!ue,disabled:ue})]})]}),(0,x.jsxs)(l.fh,{children:[(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Emoji"}),(0,x.jsx)(l.ZQ,{type:"text",value:le.emoji,onChange:e=>ce({...le,emoji:e.target.value}),placeholder:"\ud83c\udf5b",maxLength:4,disabled:ue})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsxs)(l.lR,{children:["Suggested Price (",(0,p.Qn)(t||"USD"),")"]}),(0,x.jsx)(l.ZQ,{type:"number",step:"0.01",value:le.suggested_price,onChange:e=>ce({...le,suggested_price:e.target.value}),placeholder:"0.00",disabled:ue})]})]}),(0,x.jsxs)(l.fh,{children:[(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Prep Time (minutes)"}),(0,x.jsx)(l.ZQ,{type:"number",value:le.prep_time,onChange:e=>ce({...le,prep_time:e.target.value}),placeholder:"e.g., 15",disabled:ue})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Cook Time (minutes)"}),(0,x.jsx)(l.ZQ,{type:"number",value:le.cook_time,onChange:e=>ce({...le,cook_time:e.target.value}),placeholder:"e.g., 30",disabled:ue})]})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Description"}),(0,x.jsx)(l.Lz,{value:le.description,onChange:e=>ce({...le,description:e.target.value}),placeholder:"Brief description of the recipe...",disabled:ue})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Cooking Instructions"}),(0,x.jsx)(l.Lz,{value:le.instructions,onChange:e=>ce({...le,instructions:e.target.value}),placeholder:"Step-by-step cooking instructions...",disabled:ue,style:{minHeight:"100px"}})]}),(0,x.jsxs)("div",{children:[(0,x.jsx)(M,{children:"Ingredients"}),(0,x.jsx)(T,{children:pe.map((e,r)=>(0,x.jsxs)(O,{children:[(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Ingredient"}),(0,x.jsxs)(l.FX,{value:e.ingredient_id,onChange:e=>we(r,"ingredient_id",parseInt(e.target.value)),required:!ue,disabled:ue,children:[(0,x.jsx)("option",{value:0,children:"Select ingredient..."}),W.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.name," (",(0,p.vv)(e.unit_cost,t||"USD"),"/",e.unit,")"]},e.id))]})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Quantity"}),(0,x.jsx)(l.ZQ,{type:"number",step:"0.01",value:e.quantity,onChange:e=>we(r,"quantity",e.target.value),placeholder:"0",required:!ue,disabled:ue})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Unit"}),(0,x.jsx)(l.ZQ,{type:"text",value:e.unit,onChange:e=>we(r,"unit",e.target.value),placeholder:"kg/g/ml",required:!ue,disabled:ue})]}),(0,x.jsxs)(l.gE,{children:[(0,x.jsx)(l.lR,{children:"Notes"}),(0,x.jsx)(l.ZQ,{type:"text",value:e.notes,onChange:e=>we(r,"notes",e.target.value),placeholder:"Optional",disabled:ue})]}),!ue&&(0,x.jsx)(Q,{type:"button",onClick:()=>(e=>{xe(pe.filter((r,i)=>i!==e))})(r),children:"\xd7"})]},r))}),!ue&&(0,x.jsx)(N,{type:"button",onClick:()=>{xe([...pe,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),pe.length>0&&(0,x.jsxs)(U,{children:[(0,x.jsx)(P,{children:"Total Ingredient Cost"}),(0,x.jsx)(L,{children:(0,p.vv)(pe.reduce((e,r)=>{const i=W.find(e=>e.id===r.ingredient_id);return i&&r.quantity?e+parseFloat(r.quantity)*parseFloat(i.unit_cost.toString()):e},0),t||"USD")})]})]}),(0,x.jsxs)(Z,{children:[(0,x.jsx)(l.yl,{type:"button",variant:"secondary",onClick:fe,children:ue?"Close":"Cancel"}),!ue&&(0,x.jsx)(l.yl,{type:"submit",variant:"primary",children:ne?"Update Recipe":"Create Recipe"}),ue&&(null===e||void 0===e?void 0:e.restaurant_id)&&ne&&(0,x.jsx)(l.yl,{type:"button",variant:"primary",onClick:()=>{fe(),je(ne)},style:{background:"#10B981"},children:"+ Register as Menu"})]})]})})]})}}}]);