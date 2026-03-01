"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6152],{2488:(e,r,i)=>{i.d(r,{DO:()=>c,Jt:()=>p,Qn:()=>l});var t=i(8819),n=(i(9950),i(4752)),o=i(4414);const a=n.Ay.div`
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
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${t.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: 0 0 0 3px ${t.w.colors.primaryLight};
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
`,d=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: 0 0 0 3px ${t.w.colors.primaryLight};
  }

  &:disabled {
    background: ${t.w.colors.surfaceHover};
    color: ${t.w.colors.text.muted};
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
`,l=e=>{let{children:r,className:i,style:t,...n}=e;return(0,o.jsx)(a,{className:i,style:t,...n,children:r})},c=e=>{let{placeholder:r="Search...",...i}=e;return(0,o.jsx)(s,{placeholder:r,...i})},p=e=>{let{children:r,...i}=e;return(0,o.jsx)(d,{...i,children:r})}},3705:(e,r,i)=>{i.d(r,{cc:()=>o.$n});var t=i(8819),n=i(4752),o=i(8829);n.Ay.select`
  padding: ${t.w.components.form.inputPadding};
  border: 1px solid ${t.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${t.w.typography.fontSize.sm};
  background: ${t.w.colors.surface};
  color: ${t.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: ${t.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${t.w.colors.borderHover};
  }
`,n.Ay.input`
  padding: ${t.w.components.form.inputPadding};
  border: 1px solid ${t.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${t.w.typography.fontSize.sm};
  background: ${t.w.colors.surface};
  color: ${t.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: ${t.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${t.w.colors.borderHover};
  }
`,n.Ay.div`
  background: ${t.w.colors.surface};
  border-radius: ${t.w.borderRadius.md};
  border: 1px solid ${t.w.colors.borderLight};
  padding: ${t.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${t.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${t.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${t.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4021:(e,r,i)=>{i.d(r,{i1:()=>a});var t=i(9950),n=i(1367),o=i(6038);const a=()=>{const{user:e}=(0,n.As)(),[r,i]=(0,t.useState)("RM"),[a,s]=(0,t.useState)(Object.keys(o.DL)),[d,l]=(0,t.useState)(!0),[c,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),t=r.indexOf("restaurant");let n=t>=0?r[t+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return i("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var o;const e=await r.json(),t=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";i(t)}else i("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),p("Failed to load currency settings"),i("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:a,loading:d,error:c}}},6152:(e,r,i)=>{i.r(r),i.d(r,{default:()=>H});var t=i(8819),n=i(9950),o=i(4752),a=i(3705),s=i(2674),d=i(2488),l=i(1367),c=i(9610),p=i(4021),x=i(6038),u=i(4414);const g=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,h=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${t.w.colors.border};
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>e.isActive?1:.6};
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: ${t.w.colors.primary};
  }
`,m=o.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,v=o.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,y=o.Ay.div`
  flex: 1;
  min-width: 0;
`,f=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${t.w.colors.secondary};
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,j=o.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=o.Ay.p`
  font-size: 14px;
  color: ${t.w.colors.text.muted};
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,w=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,_=o.Ay.div``,k=o.Ay.div`
  font-size: 11px;
  color: ${t.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,$=o.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,F=o.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,A=o.Ay.div`
  font-size: 12px;
  color: ${t.w.colors.text.muted};
  margin-bottom: 8px;
`,C=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,S=o.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,E=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  padding: 10px;
  background: #FAFAFA;
  border-radius: 8px;
  font-size: 12px;
  color: ${t.w.colors.text.muted};
`,R=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,z=o.Ay.div`
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
`,B=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,I=o.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return`\n          background: ${t.w.colors.primary};\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        `;case"danger":return`\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: ${t.w.colors.status.errorLightAlt};\n            transform: translateY(-1px);\n          }\n        `;default:return`\n          background: ${t.w.colors.surfaceHover};\n          border: 1px solid #E2E8F0;\n          color: #475569;\n          &:hover {\n            background: #F1F5F9;\n            transform: translateY(-1px);\n          }\n        `}}}
`,D=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,L=(o.Ay.div`
  font-size: 64px;
  margin-bottom: 16px;
`,o.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${t.w.colors.secondary};
  margin-bottom: 8px;
`),q=o.Ay.p`
  font-size: 14px;
  color: ${t.w.colors.text.muted};
  margin-bottom: 24px;
`,M=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,T=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,O=o.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr 40px;
  gap: 8px;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,Q=o.Ay.button`
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
`,N=o.Ay.button`
  background: #F0F4FF;
  color: ${t.w.colors.primary};
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
`,P=o.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,U=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,Z=o.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`,G=o.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,H=()=>{const{user:e}=(0,l.As)(),{defaultCurrency:r,supportedCurrencies:i}=(0,p.i1)(),[t,o]=(0,n.useState)(""),[H,J]=(0,n.useState)([]),[Y,W]=(0,n.useState)([]),[V,X]=(0,n.useState)(!0),[K,ee]=(0,n.useState)(""),[re,ie]=(0,n.useState)("all"),[te,ne]=(0,n.useState)(null),[oe,ae]=(0,n.useState)(!1),[se,de]=(0,n.useState)(!0),[le,ce]=(0,n.useState)({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),[pe,xe]=(0,n.useState)([]),[ue,ge]=(0,n.useState)(!1),[he,me]=(0,n.useState)(null);(0,n.useEffect)(()=>{r&&!t&&o(r)},[r,t]),(0,n.useEffect)(()=>{(async()=>{if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role))try{const r=await fetch("/api/brands"),i=await r.json();if(i.success&&i.data.length>0){const r=i.data.find(r=>r.owner_id===e.id);r&&me(r.id)}}catch(r){console.error("Failed to fetch user brand:",r)}})()},[e]),(0,n.useEffect)(()=>{"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?he&&(ye(),ve()):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(ye(),ve())},[e,he]);const ve=async()=>{try{let r="";if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?he&&(r=`/api/brands/${he}/ingredients`):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&e.restaurant_id&&(r=`/api/restaurants/${e.restaurant_id}/ingredients`),!r)return;const i=await fetch(r),t=await i.json();t.success&&W(t.data)}catch(r){console.error("Failed to fetch ingredients:",r)}},ye=async()=>{try{X(!0);let o="";if("Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?he&&(o=`/api/brands/${he}/recipes`):"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&e.restaurant_id&&(o=`/api/restaurants/${e.restaurant_id}/recipes`),!o)return void X(!1);const a=await fetch(o),s=await a.json();var r,i,t,n;if(s.success)if(Array.isArray(s.data))console.log("=== RECIPES API RESPONSE ==="),console.log("First recipe:",s.data[0]),console.log("prep_time:",null===(r=s.data[0])||void 0===r?void 0:r.prep_time),console.log("cook_time:",null===(i=s.data[0])||void 0===i?void 0:i.cook_time),console.log("instructions:",null===(t=s.data[0])||void 0===t?void 0:t.instructions),console.log("recipeIngredients:",null===(n=s.data[0])||void 0===n?void 0:n.recipeIngredients),J(s.data),de(!0);else J([...s.data.brand_recipes,...s.data.own_recipes]),de("brand"!==s.data.recipe_manager_type)}catch(o){console.error("Failed to fetch recipes:",o)}finally{X(!1)}},fe=function(e){var r,i,t,n;(ge(arguments.length>1&&void 0!==arguments[1]&&arguments[1]),e)?(ne(e),ce({name:e.name,description:e.description||"",category:e.category,emoji:e.emoji||"",image:e.image||"",prep_time:(null===(r=e.prep_time)||void 0===r?void 0:r.toString())||"",cook_time:(null===(i=e.cook_time)||void 0===i?void 0:i.toString())||"",instructions:e.instructions||"",suggested_price:(null===(t=e.suggested_price)||void 0===t?void 0:t.toString())||""}),xe((null===(n=e.recipeIngredients)||void 0===n?void 0:n.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""})))||[])):(ne(null),ce({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),xe([]));ae(!0)},je=()=>{ae(!1),ne(null),ge(!1),ce({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),xe([])},be=async r=>{if(null===e||void 0===e||!e.restaurant_id)return void alert("Restaurant ID is required to register menu");const i=`"${r.name}" \ub808\uc2dc\ud53c\ub97c \uba54\ub274\ub85c \ub4f1\ub85d\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?\n\n\uac00\uaca9: ${(0,x.vv)(r.suggested_price||0,t||"USD")}`;if(window.confirm(i))try{const i=await fetch("/api/menu/product",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r.name,description:r.description||"",price:r.suggested_price||0,category:r.category,emoji:r.emoji||"\ud83c\udf7d\ufe0f",restaurant_id:e.restaurant_id,recipe_id:r.id})}),t=await i.json();t.success?alert(`"${r.name}" \uba54\ub274\uac00 \ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4!`):alert(t.error||"\uba54\ub274 \ub4f1\ub85d \uc2e4\ud328")}catch(n){console.error("Failed to register menu:",n),alert("\uba54\ub274 \ub4f1\ub85d \uc2e4\ud328")}},we=(e,r,i)=>{const t=[...pe];t[e]={...t[e],[r]:i},xe(t)},_e=H.filter(e=>{const r=e.name.toLowerCase().includes(K.toLowerCase()),i="all"===re||e.category===re;return r&&i}),ke=["all",...Array.from(new Set(H.map(e=>e.category)))],$e=H.filter(e=>e.is_active).length,Fe=H.reduce((e,r)=>e+Number(r.total_ingredient_cost||0),0),Ae=H.length>0?Fe/H.length:0;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(s.mc,{children:[(0,u.jsxs)(s.Y9,{children:[(0,u.jsx)(s.hE,{children:"Recipes"}),(0,u.jsx)(s.ex,{children:se&&(0,u.jsx)(a.cc,{variant:"primary",onClick:()=>fe(null),children:"New Recipe"})})]}),(0,u.jsxs)(s.MD,{children:[(0,u.jsxs)(s.hI,{children:[(0,u.jsx)(s.v0,{children:"Total Recipes"}),(0,u.jsx)(s.Os,{children:H.length}),(0,u.jsxs)(s.d1,{children:[$e," active"]})]}),(0,u.jsxs)(s.hI,{children:[(0,u.jsx)(s.v0,{children:"Average Cost"}),(0,u.jsx)(s.Os,{children:(0,x.vv)(Ae,t||"USD")}),(0,u.jsx)(s.d1,{children:"per recipe"})]}),(0,u.jsxs)(s.hI,{children:[(0,u.jsx)(s.v0,{children:"Total Value"}),(0,u.jsx)(s.Os,{children:(0,x.vv)(Fe,t||"USD")}),(0,u.jsx)(s.d1,{children:"all recipes"})]})]}),(0,u.jsxs)(d.Qn,{children:[(0,u.jsx)(d.DO,{type:"text",placeholder:"Search recipes...",value:K,onChange:e=>ee(e.target.value)}),(0,u.jsx)(d.Jt,{value:re,onChange:e=>ie(e.target.value),children:ke.map(e=>(0,u.jsx)("option",{value:e,children:"all"===e?"All Categories":e},e))}),(0,u.jsx)(d.Jt,{value:t,onChange:e=>o(e.target.value),style:{minWidth:"140px"},children:i.map(e=>(0,u.jsxs)("option",{value:e,children:[(0,x.Qn)(e)," ",e]},e))})]}),(0,u.jsx)(s.UC,{children:V?(0,u.jsx)(D,{children:(0,u.jsx)(L,{children:"Loading..."})}):0===_e.length?(0,u.jsxs)(D,{children:[(0,u.jsx)(L,{children:"No recipes found"}),(0,u.jsx)(q,{children:K||"all"!==re?"Try adjusting your filters":se?"Create your first recipe to get started":"Brand recipes will appear here when available"}),!K&&"all"===re&&se&&(0,u.jsx)(a.cc,{variant:"primary",onClick:()=>fe(null),children:"Create First Recipe"})]}):(0,u.jsx)(g,{children:_e.map(r=>{var i;return(0,u.jsxs)(h,{isActive:r.is_active,onClick:()=>fe(r,!0),children:[(0,u.jsxs)(m,{children:[r.emoji&&(0,u.jsx)(v,{children:r.emoji}),(0,u.jsxs)(y,{children:[(0,u.jsx)(f,{children:r.name}),(0,u.jsxs)("div",{style:{display:"flex",gap:"6px",alignItems:"center",flexWrap:"wrap"},children:[(0,u.jsx)(j,{children:r.category}),r.from_brand&&(0,u.jsx)(j,{style:{background:"#FEF3C7",color:"#D97706"},children:"Brand"})]})]})]}),r.description&&(0,u.jsx)(b,{children:r.description}),(0,u.jsxs)(w,{children:[(0,u.jsxs)(_,{children:[(0,u.jsx)(k,{children:"Cost"}),(0,u.jsx)($,{children:(0,x.vv)(r.total_ingredient_cost||0,t||"USD")})]}),(0,u.jsxs)(_,{children:[(0,u.jsx)(k,{children:"Suggested"}),(0,u.jsx)($,{children:(0,x.vv)(r.suggested_price||0,t||"USD")})]})]}),(r.prep_time||r.cook_time)&&(0,u.jsxs)(E,{children:[r.prep_time&&(0,u.jsxs)(R,{children:[(0,u.jsx)("span",{children:"Prep:"}),(0,u.jsxs)("strong",{children:[r.prep_time," min"]})]}),r.cook_time&&(0,u.jsxs)(R,{children:[(0,u.jsx)("span",{children:"Cook:"}),(0,u.jsxs)("strong",{children:[r.cook_time," min"]})]}),r.prep_time&&r.cook_time&&(0,u.jsxs)(R,{children:[(0,u.jsx)("span",{children:"Total:"}),(0,u.jsxs)("strong",{children:[r.prep_time+r.cook_time," min"]})]})]}),r.instructions&&(0,u.jsx)(z,{children:r.instructions}),(0,u.jsxs)(F,{children:[(0,u.jsxs)(A,{children:[(null===(i=r.recipeIngredients)||void 0===i?void 0:i.length)||0," ingredients"]}),r.recipeIngredients&&r.recipeIngredients.length>0&&(0,u.jsxs)(C,{children:[r.recipeIngredients.slice(0,5).map((e,r)=>{var i;return(0,u.jsx)(S,{children:(null===(i=e.ingredient)||void 0===i?void 0:i.name)||`Ingredient #${e.ingredient_id}`},r)}),r.recipeIngredients.length>5&&(0,u.jsxs)(S,{style:{background:"#E0E7FF",color:"#4F46E5"},children:["+",r.recipeIngredients.length-5," more"]})]})]}),(0,u.jsxs)(B,{onClick:e=>e.stopPropagation(),children:[!1!==r.editable&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(I,{variant:"primary",onClick:()=>fe(r,!1),children:"Edit"}),(0,u.jsx)(I,{variant:"danger",onClick:()=>(async r=>{if(window.confirm("\uc815\ub9d0 \uc774 \ub808\uc2dc\ud53c\ub97c \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?"))try{let i="";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?i=`/api/brands/${he}/recipes/${r}`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(i=`/api/restaurants/${null===e||void 0===e?void 0:e.restaurant_id}/recipes/${r}`);const t=await fetch(i,{method:"DELETE"});(await t.json()).success&&(alert("\ub808\uc2dc\ud53c\uac00 \uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4"),ye())}catch(i){console.error("Failed to delete recipe:",i),alert("\ub808\uc2dc\ud53c \uc0ad\uc81c \uc2e4\ud328")}})(r.id),children:"Delete"})]}),(null===e||void 0===e?void 0:e.restaurant_id)&&(0,u.jsx)(I,{variant:"primary",onClick:()=>be(r),style:{background:"#10B981"},children:"+ Menu"})]})]},r.id)})})})]}),(0,u.jsx)(c.aF,{isOpen:oe,onClose:je,title:ue?"Recipe Details":te?"Edit Recipe":"New Recipe",size:"large",children:(0,u.jsxs)("form",{onSubmit:async r=>{if(r.preventDefault(),le.name&&le.category)try{let r="";const i=te?"PUT":"POST";"Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role)?r=te?`/api/brands/${he}/recipes/${te.id}`:`/api/brands/${he}/recipes`:"Restaurant Admin"===(null===e||void 0===e?void 0:e.role)&&(r=te?`/api/restaurants/${e.restaurant_id}/recipes/${te.id}`:`/api/restaurants/${e.restaurant_id}/recipes`);const t=await fetch(r,{method:i,headers:{"Content-Type":"application/json"},body:JSON.stringify({name:le.name,description:le.description,category:le.category,emoji:le.emoji,image:le.image,prep_time:le.prep_time?parseInt(le.prep_time):null,cook_time:le.cook_time?parseInt(le.cook_time):null,instructions:le.instructions||null,suggested_price:parseFloat(le.suggested_price)||0,ingredients:pe.map(e=>({ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,notes:e.notes}))})}),n=await t.json();n.success?(alert(te?"\ub808\uc2dc\ud53c\uac00 \uc218\uc815\ub418\uc5c8\uc2b5\ub2c8\ub2e4":"\ub808\uc2dc\ud53c\uac00 \uc0dd\uc131\ub418\uc5c8\uc2b5\ub2c8\ub2e4"),je(),ye()):alert(n.error||"\ub808\uc2dc\ud53c \uc800\uc7a5 \uc2e4\ud328")}catch(i){console.error("Failed to save recipe:",i),alert("\ub808\uc2dc\ud53c \uc800\uc7a5 \uc2e4\ud328")}else alert("\ub808\uc2dc\ud53c \uc774\ub984\uacfc \uce74\ud14c\uace0\ub9ac\ub294 \ud544\uc218\uc785\ub2c8\ub2e4")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsxs)(c.lR,{children:["Recipe Name ",!ue&&"*"]}),(0,u.jsx)(c.ZQ,{type:"text",value:le.name,onChange:e=>ce({...le,name:e.target.value}),placeholder:"e.g., Nasi Lemak Special",required:!ue,disabled:ue})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsxs)(c.lR,{children:["Category ",!ue&&"*"]}),(0,u.jsx)(c.ZQ,{type:"text",value:le.category,onChange:e=>ce({...le,category:e.target.value}),placeholder:"e.g., Main Dish",required:!ue,disabled:ue})]})]}),(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Emoji"}),(0,u.jsx)(c.ZQ,{type:"text",value:le.emoji,onChange:e=>ce({...le,emoji:e.target.value}),placeholder:"\ud83c\udf5b",maxLength:4,disabled:ue})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsxs)(c.lR,{children:["Suggested Price (",(0,x.Qn)(t||"USD"),")"]}),(0,u.jsx)(c.ZQ,{type:"number",step:"0.01",value:le.suggested_price,onChange:e=>ce({...le,suggested_price:e.target.value}),placeholder:"0.00",disabled:ue})]})]}),(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Prep Time (minutes)"}),(0,u.jsx)(c.ZQ,{type:"number",value:le.prep_time,onChange:e=>ce({...le,prep_time:e.target.value}),placeholder:"e.g., 15",disabled:ue})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Cook Time (minutes)"}),(0,u.jsx)(c.ZQ,{type:"number",value:le.cook_time,onChange:e=>ce({...le,cook_time:e.target.value}),placeholder:"e.g., 30",disabled:ue})]})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Description"}),(0,u.jsx)(c.Lz,{value:le.description,onChange:e=>ce({...le,description:e.target.value}),placeholder:"Brief description of the recipe...",disabled:ue})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Cooking Instructions"}),(0,u.jsx)(c.Lz,{value:le.instructions,onChange:e=>ce({...le,instructions:e.target.value}),placeholder:"Step-by-step cooking instructions...",disabled:ue,style:{minHeight:"100px"}})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(M,{children:"Ingredients"}),(0,u.jsx)(T,{children:pe.map((e,r)=>(0,u.jsxs)(O,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Ingredient"}),(0,u.jsxs)(c.FX,{value:e.ingredient_id,onChange:e=>we(r,"ingredient_id",parseInt(e.target.value)),required:!ue,disabled:ue,children:[(0,u.jsx)("option",{value:0,children:"Select ingredient..."}),Y.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.name," (",(0,x.vv)(e.unit_cost,t||"USD"),"/",e.unit,")"]},e.id))]})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Quantity"}),(0,u.jsx)(c.ZQ,{type:"number",step:"0.01",value:e.quantity,onChange:e=>we(r,"quantity",e.target.value),placeholder:"0",required:!ue,disabled:ue})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Unit"}),(0,u.jsx)(c.ZQ,{type:"text",value:e.unit,onChange:e=>we(r,"unit",e.target.value),placeholder:"kg/g/ml",required:!ue,disabled:ue})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Notes"}),(0,u.jsx)(c.ZQ,{type:"text",value:e.notes,onChange:e=>we(r,"notes",e.target.value),placeholder:"Optional",disabled:ue})]}),!ue&&(0,u.jsx)(Q,{type:"button",onClick:()=>(e=>{xe(pe.filter((r,i)=>i!==e))})(r),children:"\xd7"})]},r))}),!ue&&(0,u.jsx)(N,{type:"button",onClick:()=>{xe([...pe,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),pe.length>0&&(0,u.jsxs)(P,{children:[(0,u.jsx)(U,{children:"Total Ingredient Cost"}),(0,u.jsx)(Z,{children:(0,x.vv)(pe.reduce((e,r)=>{const i=Y.find(e=>e.id===r.ingredient_id);return i&&r.quantity?e+parseFloat(r.quantity)*parseFloat(i.unit_cost.toString()):e},0),t||"USD")})]})]}),(0,u.jsxs)(G,{children:[(0,u.jsx)(c.yl,{type:"button",variant:"secondary",onClick:je,children:ue?"Close":"Cancel"}),!ue&&(0,u.jsx)(c.yl,{type:"submit",variant:"primary",children:te?"Update Recipe":"Create Recipe"}),ue&&(null===e||void 0===e?void 0:e.restaurant_id)&&te&&(0,u.jsx)(c.yl,{type:"button",variant:"primary",onClick:()=>{je(),be(te)},style:{background:"#10B981"},children:"+ Register as Menu"})]})]})})]})}}}]);