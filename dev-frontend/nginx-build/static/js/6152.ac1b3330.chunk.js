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
`},4021:(e,r,i)=>{i.d(r,{i1:()=>a});var n=i(9950),t=i(1367);i(6038);const a=()=>{const{user:e}=(0,t.As)(),[r,i]=(0,n.useState)("USD"),[a,o]=(0,n.useState)(["USD"]),[s,d]=(0,n.useState)(!0),[l,c]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{if(null===e||void 0===e||!e.brand_id)return i("USD"),o(["USD","MYR","KRW"]),void d(!1);try{const r=localStorage.getItem("token"),n=await fetch(`/api/currencies/brands/${e.brand_id}`,{headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"}});if(n.ok){const e=await n.json();e.success&&e.data&&(i(e.data.default_currency||"USD"),o(e.data.supported_currencies||["USD"]))}else i("USD"),o(["USD","MYR","KRW"])}catch(r){console.error("Failed to fetch brand currency:",r),c("Failed to load currency settings"),i("USD"),o(["USD","MYR","KRW"])}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.brand_id]),{defaultCurrency:r,supportedCurrencies:a,loading:s,error:l}}},6152:(e,r,i)=>{i.r(r),i.d(r,{default:()=>G});var n=i(9950),t=i(4752),a=i(3310),o=i(3705),s=i(7492),d=i(2488),l=i(1367),c=i(9610),p=i(4021),x=i(6038),u=i(4414);const g=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,h=t.Ay.div`
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
`,m=t.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,v=t.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,b=t.Ay.div`
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
`,f=t.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,w=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,F=t.Ay.div``,k=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,_=t.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,A=t.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,C=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,E=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,B=t.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,S=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  padding: 10px;
  background: #FAFAFA;
  border-radius: 8px;
  font-size: 12px;
  color: #6B7280;
`,R=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,D=t.Ay.div`
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
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          &:hover { background: #4F46E5; }\n        ";case"danger":return"\n          background: #FEE2E2;\n          color: #DC2626;\n          &:hover { background: #FCA5A5; }\n        ";default:return"\n          background: #F3F4F6;\n          color: #374151;\n          &:hover { background: #E5E7EB; }\n        "}}}
`,$=t.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,U=(t.Ay.div`
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
`,T=t.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,Q=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,M=t.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr 40px;
  gap: 8px;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,N=t.Ay.button`
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
`,O=t.Ay.button`
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
`,P=t.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Z=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,L=t.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`,Y=t.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,G=()=>{const{user:e}=(0,l.As)(),{defaultCurrency:r,supportedCurrencies:i}=(0,p.i1)(),[t,G]=(0,n.useState)(""),[J,W]=(0,n.useState)([]),[K,V]=(0,n.useState)([]),[H,X]=(0,n.useState)(!0),[ee,re]=(0,n.useState)(""),[ie,ne]=(0,n.useState)("all"),[te,ae]=(0,n.useState)(null),[oe,se]=(0,n.useState)(!1),[de,le]=(0,n.useState)(!0),[ce,pe]=(0,n.useState)({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),[xe,ue]=(0,n.useState)([]),[ge,he]=(0,n.useState)(!1),[me,ve]=(0,n.useState)(null);(0,n.useEffect)(()=>{r&&!t&&G(r)},[r,t]),(0,n.useEffect)(()=>{(async()=>{if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role))try{const r=await fetch("/api/brands"),i=await r.json();if(i.success&&i.data.length>0){const r=i.data.find(r=>r.owner_id===e.id);r&&ve(r.id)}}catch(r){console.error("Failed to fetch user brand:",r)}})()},[e]),(0,n.useEffect)(()=>{"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?me&&(ye(),be()):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(ye(),be())},[e,me]);const be=async()=>{try{let r="";if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?me&&(r=`/api/brands/${me}/ingredients`):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&e.restaurant_id&&(r=`/api/restaurants/${e.restaurant_id}/ingredients`),!r)return;const i=await fetch(r),n=await i.json();n.success&&V(n.data)}catch(r){console.error("Failed to fetch ingredients:",r)}},ye=async()=>{try{X(!0);let a="";if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?me&&(a=`/api/brands/${me}/recipes`):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&e.restaurant_id&&(a=`/api/restaurants/${e.restaurant_id}/recipes`),!a)return void X(!1);const o=await fetch(a),s=await o.json();var r,i,n,t;if(s.success)if(Array.isArray(s.data))console.log("=== RECIPES API RESPONSE ==="),console.log("First recipe:",s.data[0]),console.log("prep_time:",null===(r=s.data[0])||void 0===r?void 0:r.prep_time),console.log("cook_time:",null===(i=s.data[0])||void 0===i?void 0:i.cook_time),console.log("instructions:",null===(n=s.data[0])||void 0===n?void 0:n.instructions),console.log("recipeIngredients:",null===(t=s.data[0])||void 0===t?void 0:t.recipeIngredients),W(s.data),le(!0);else W([...s.data.brand_recipes,...s.data.own_recipes]),le("brand"!==s.data.recipe_manager_type)}catch(a){console.error("Failed to fetch recipes:",a)}finally{X(!1)}},fe=function(e){var r,i,n,t;(he(arguments.length>1&&void 0!==arguments[1]&&arguments[1]),e)?(ae(e),pe({name:e.name,description:e.description||"",category:e.category,emoji:e.emoji||"",image:e.image||"",prep_time:(null===(r=e.prep_time)||void 0===r?void 0:r.toString())||"",cook_time:(null===(i=e.cook_time)||void 0===i?void 0:i.toString())||"",instructions:e.instructions||"",suggested_price:(null===(n=e.suggested_price)||void 0===n?void 0:n.toString())||""}),ue((null===(t=e.recipeIngredients)||void 0===t?void 0:t.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""})))||[])):(ae(null),pe({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),ue([]));se(!0)},je=()=>{se(!1),ae(null),he(!1),pe({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),ue([])},we=async r=>{if(null===e||void 0===e||!e.restaurant_id)return void alert("Restaurant ID is required to register menu");const i=`"${r.name}" \ub808\uc2dc\ud53c\ub97c \uba54\ub274\ub85c \ub4f1\ub85d\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?\n\n\uac00\uaca9: ${(0,x.vv)(r.suggested_price||0,t||"USD")}`;if(window.confirm(i))try{const i=await fetch("/api/menu/product",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r.name,description:r.description||"",price:r.suggested_price||0,category:r.category,emoji:r.emoji||"\ud83c\udf7d\ufe0f",restaurant_id:e.restaurant_id,recipe_id:r.id})}),n=await i.json();n.success?alert(`"${r.name}" \uba54\ub274\uac00 \ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4!`):alert(n.error||"\uba54\ub274 \ub4f1\ub85d \uc2e4\ud328")}catch(n){console.error("Failed to register menu:",n),alert("\uba54\ub274 \ub4f1\ub85d \uc2e4\ud328")}},Fe=(e,r,i)=>{const n=[...xe];n[e]={...n[e],[r]:i},ue(n)},ke=J.filter(e=>{const r=e.name.toLowerCase().includes(ee.toLowerCase()),i="all"===ie||e.category===ie;return r&&i}),_e=["all",...Array.from(new Set(J.map(e=>e.category)))],Ae=J.filter(e=>e.is_active).length,Ce=J.reduce((e,r)=>e+Number(r.total_ingredient_cost||0),0),Ee=J.length>0?Ce/J.length:0;return(0,u.jsxs)(a.A,{children:[(0,u.jsxs)(s.mc,{children:[(0,u.jsxs)(s.Y9,{children:[(0,u.jsx)(s.hE,{children:"Recipes"}),(0,u.jsx)(s.ex,{children:de&&(0,u.jsx)(o.cc,{variant:"primary",onClick:()=>fe(null),children:"+ New Recipe"})})]}),(0,u.jsxs)(s.MD,{children:[(0,u.jsxs)(s.hI,{children:[(0,u.jsx)(s.v0,{children:"Total Recipes"}),(0,u.jsx)(s.Os,{children:J.length}),(0,u.jsxs)(s.d1,{children:[Ae," active"]})]}),(0,u.jsxs)(s.hI,{children:[(0,u.jsx)(s.v0,{children:"Average Cost"}),(0,u.jsx)(s.Os,{children:(0,x.vv)(Ee,t||"USD")}),(0,u.jsx)(s.d1,{children:"per recipe"})]}),(0,u.jsxs)(s.hI,{children:[(0,u.jsx)(s.v0,{children:"Total Value"}),(0,u.jsx)(s.Os,{children:(0,x.vv)(Ce,t||"USD")}),(0,u.jsx)(s.d1,{children:"all recipes"})]})]}),(0,u.jsxs)(d.Qn,{children:[(0,u.jsx)(d.DO,{type:"text",placeholder:"Search recipes...",value:ee,onChange:e=>re(e.target.value)}),(0,u.jsx)(d.Jt,{value:ie,onChange:e=>ne(e.target.value),children:_e.map(e=>(0,u.jsx)("option",{value:e,children:"all"===e?"All Categories":e},e))}),(0,u.jsx)(d.Jt,{value:t,onChange:e=>G(e.target.value),style:{minWidth:"140px"},children:i.map(e=>(0,u.jsxs)("option",{value:e,children:[(0,x.Qn)(e)," ",e]},e))})]}),(0,u.jsx)(s.UC,{children:H?(0,u.jsx)($,{children:(0,u.jsx)(U,{children:"Loading..."})}):0===ke.length?(0,u.jsxs)($,{children:[(0,u.jsx)(U,{children:"No recipes found"}),(0,u.jsx)(q,{children:ee||"all"!==ie?"Try adjusting your filters":de?"Create your first recipe to get started":"Brand recipes will appear here when available"}),!ee&&"all"===ie&&de&&(0,u.jsx)(o.cc,{variant:"primary",onClick:()=>fe(null),children:"+ Create First Recipe"})]}):(0,u.jsx)(g,{children:ke.map(r=>{var i;return(0,u.jsxs)(h,{isActive:r.is_active,children:[(0,u.jsxs)(m,{children:[r.emoji&&(0,u.jsx)(v,{children:r.emoji}),(0,u.jsxs)(b,{children:[(0,u.jsx)(y,{children:r.name}),(0,u.jsxs)("div",{style:{display:"flex",gap:"6px",alignItems:"center",flexWrap:"wrap"},children:[(0,u.jsx)(f,{children:r.category}),r.from_brand&&(0,u.jsx)(f,{style:{background:"#FEF3C7",color:"#D97706"},children:"Brand"})]})]})]}),r.description&&(0,u.jsx)(j,{children:r.description}),(0,u.jsxs)(w,{children:[(0,u.jsxs)(F,{children:[(0,u.jsx)(k,{children:"Cost"}),(0,u.jsx)(_,{children:(0,x.vv)(r.total_ingredient_cost||0,t||"USD")})]}),(0,u.jsxs)(F,{children:[(0,u.jsx)(k,{children:"Suggested"}),(0,u.jsx)(_,{children:(0,x.vv)(r.suggested_price||0,t||"USD")})]})]}),(r.prep_time||r.cook_time)&&(0,u.jsxs)(S,{children:[r.prep_time&&(0,u.jsxs)(R,{children:[(0,u.jsx)("span",{children:"Prep:"}),(0,u.jsxs)("strong",{children:[r.prep_time," min"]})]}),r.cook_time&&(0,u.jsxs)(R,{children:[(0,u.jsx)("span",{children:"Cook:"}),(0,u.jsxs)("strong",{children:[r.cook_time," min"]})]}),r.prep_time&&r.cook_time&&(0,u.jsxs)(R,{children:[(0,u.jsx)("span",{children:"Total:"}),(0,u.jsxs)("strong",{children:[r.prep_time+r.cook_time," min"]})]})]}),r.instructions&&(0,u.jsx)(D,{children:r.instructions}),(0,u.jsxs)(A,{children:[(0,u.jsxs)(C,{children:[(null===(i=r.recipeIngredients)||void 0===i?void 0:i.length)||0," ingredients"]}),r.recipeIngredients&&r.recipeIngredients.length>0&&(0,u.jsxs)(E,{children:[r.recipeIngredients.slice(0,5).map((e,r)=>{var i;return(0,u.jsx)(B,{children:(null===(i=e.ingredient)||void 0===i?void 0:i.name)||`Ingredient #${e.ingredient_id}`},r)}),r.recipeIngredients.length>5&&(0,u.jsxs)(B,{style:{background:"#E0E7FF",color:"#4F46E5"},children:["+",r.recipeIngredients.length-5," more"]})]})]}),(0,u.jsxs)(z,{children:[(0,u.jsx)(I,{variant:"secondary",onClick:()=>fe(r,!0),children:"View"}),!1!==r.editable&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(I,{variant:"primary",onClick:()=>fe(r,!1),children:"Edit"}),(0,u.jsx)(I,{variant:"danger",onClick:()=>(async r=>{if(window.confirm("\uc815\ub9d0 \uc774 \ub808\uc2dc\ud53c\ub97c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?"))try{let i="";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?i=`/api/brands/${me}/recipes/${r}`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(i=`/api/restaurants/${null===e||void 0===e?void 0:e.restaurant_id}/recipes/${r}`);const n=await fetch(i,{method:"DELETE"});(await n.json()).success&&(alert("\ub808\uc2dc\ud53c\uac00 \uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4"),ye())}catch(i){console.error("Failed to delete recipe:",i),alert("\ub808\uc2dc\ud53c \uc0ad\uc81c \uc2e4\ud328")}})(r.id),children:"Delete"})]}),(null===e||void 0===e?void 0:e.restaurant_id)&&(0,u.jsx)(I,{variant:"primary",onClick:()=>we(r),style:{background:"#10B981"},children:"+ Menu"})]})]},r.id)})})})]}),(0,u.jsx)(c.aF,{isOpen:oe,onClose:je,title:ge?"Recipe Details":te?"Edit Recipe":"New Recipe",size:"large",children:(0,u.jsxs)("form",{onSubmit:async r=>{if(r.preventDefault(),ce.name&&ce.category)try{let r="";const i=te?"PUT":"POST";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?r=te?`/api/brands/${me}/recipes/${te.id}`:`/api/brands/${me}/recipes`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(r=te?`/api/restaurants/${e.restaurant_id}/recipes/${te.id}`:`/api/restaurants/${e.restaurant_id}/recipes`);const n=await fetch(r,{method:i,headers:{"Content-Type":"application/json"},body:JSON.stringify({name:ce.name,description:ce.description,category:ce.category,emoji:ce.emoji,image:ce.image,prep_time:ce.prep_time?parseInt(ce.prep_time):null,cook_time:ce.cook_time?parseInt(ce.cook_time):null,instructions:ce.instructions||null,suggested_price:parseFloat(ce.suggested_price)||0,ingredients:xe.map(e=>({ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,notes:e.notes}))})}),t=await n.json();t.success?(alert(te?"\ub808\uc2dc\ud53c\uac00 \uc218\uc815\ub418\uc5c8\uc2b5\ub2c8\ub2e4":"\ub808\uc2dc\ud53c\uac00 \uc0dd\uc131\ub418\uc5c8\uc2b5\ub2c8\ub2e4"),je(),ye()):alert(t.error||"\ub808\uc2dc\ud53c \uc800\uc7a5 \uc2e4\ud328")}catch(i){console.error("Failed to save recipe:",i),alert("\ub808\uc2dc\ud53c \uc800\uc7a5 \uc2e4\ud328")}else alert("\ub808\uc2dc\ud53c \uc774\ub984\uacfc \uce74\ud14c\uace0\ub9ac\ub294 \ud544\uc218\uc785\ub2c8\ub2e4")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsxs)(c.lR,{children:["Recipe Name ",!ge&&"*"]}),(0,u.jsx)(c.ZQ,{type:"text",value:ce.name,onChange:e=>pe({...ce,name:e.target.value}),placeholder:"e.g., Nasi Lemak Special",required:!ge,disabled:ge})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsxs)(c.lR,{children:["Category ",!ge&&"*"]}),(0,u.jsx)(c.ZQ,{type:"text",value:ce.category,onChange:e=>pe({...ce,category:e.target.value}),placeholder:"e.g., Main Dish",required:!ge,disabled:ge})]})]}),(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Emoji"}),(0,u.jsx)(c.ZQ,{type:"text",value:ce.emoji,onChange:e=>pe({...ce,emoji:e.target.value}),placeholder:"\ud83c\udf5b",maxLength:4,disabled:ge})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsxs)(c.lR,{children:["Suggested Price (",(0,x.Qn)(t||"USD"),")"]}),(0,u.jsx)(c.ZQ,{type:"number",step:"0.01",value:ce.suggested_price,onChange:e=>pe({...ce,suggested_price:e.target.value}),placeholder:"0.00",disabled:ge})]})]}),(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Prep Time (minutes)"}),(0,u.jsx)(c.ZQ,{type:"number",value:ce.prep_time,onChange:e=>pe({...ce,prep_time:e.target.value}),placeholder:"e.g., 15",disabled:ge})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Cook Time (minutes)"}),(0,u.jsx)(c.ZQ,{type:"number",value:ce.cook_time,onChange:e=>pe({...ce,cook_time:e.target.value}),placeholder:"e.g., 30",disabled:ge})]})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Description"}),(0,u.jsx)(c.Lz,{value:ce.description,onChange:e=>pe({...ce,description:e.target.value}),placeholder:"Brief description of the recipe...",disabled:ge})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Cooking Instructions"}),(0,u.jsx)(c.Lz,{value:ce.instructions,onChange:e=>pe({...ce,instructions:e.target.value}),placeholder:"Step-by-step cooking instructions...",disabled:ge,style:{minHeight:"100px"}})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(T,{children:"Ingredients"}),(0,u.jsx)(Q,{children:xe.map((e,r)=>(0,u.jsxs)(M,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Ingredient"}),(0,u.jsxs)(c.FX,{value:e.ingredient_id,onChange:e=>Fe(r,"ingredient_id",parseInt(e.target.value)),required:!ge,disabled:ge,children:[(0,u.jsx)("option",{value:0,children:"Select ingredient..."}),K.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.name," (",(0,x.vv)(e.unit_cost,t||"USD"),"/",e.unit,")"]},e.id))]})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Quantity"}),(0,u.jsx)(c.ZQ,{type:"number",step:"0.01",value:e.quantity,onChange:e=>Fe(r,"quantity",e.target.value),placeholder:"0",required:!ge,disabled:ge})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Unit"}),(0,u.jsx)(c.ZQ,{type:"text",value:e.unit,onChange:e=>Fe(r,"unit",e.target.value),placeholder:"kg/g/ml",required:!ge,disabled:ge})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Notes"}),(0,u.jsx)(c.ZQ,{type:"text",value:e.notes,onChange:e=>Fe(r,"notes",e.target.value),placeholder:"Optional",disabled:ge})]}),!ge&&(0,u.jsx)(N,{type:"button",onClick:()=>(e=>{ue(xe.filter((r,i)=>i!==e))})(r),children:"\xd7"})]},r))}),!ge&&(0,u.jsx)(O,{type:"button",onClick:()=>{ue([...xe,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"+ Add Ingredient"}),xe.length>0&&(0,u.jsxs)(P,{children:[(0,u.jsx)(Z,{children:"Total Ingredient Cost"}),(0,u.jsx)(L,{children:(0,x.vv)(xe.reduce((e,r)=>{const i=K.find(e=>e.id===r.ingredient_id);return i&&r.quantity?e+parseFloat(r.quantity)*parseFloat(i.unit_cost.toString()):e},0),t||"USD")})]})]}),(0,u.jsxs)(Y,{children:[(0,u.jsx)(c.yl,{type:"button",variant:"secondary",onClick:je,children:ge?"Close":"Cancel"}),!ge&&(0,u.jsx)(c.yl,{type:"submit",variant:"primary",children:te?"Update Recipe":"Create Recipe"}),ge&&(null===e||void 0===e?void 0:e.restaurant_id)&&te&&(0,u.jsx)(c.yl,{type:"button",variant:"primary",onClick:()=>{je(),we(te)},style:{background:"#10B981"},children:"+ Register as Menu"})]})]})})]})}}}]);