"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6152],{3705:(e,r,n)=>{n.d(r,{cc:()=>t});var i=n(4752);const t=i.Ay.button`
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
`;i.Ay.select`
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
`,i.Ay.input`
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
`,i.Ay.div`
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
`},4021:(e,r,n)=>{n.d(r,{i1:()=>a});var i=n(9950),t=n(1367),o=n(6038);const a=()=>{const{user:e}=(0,t.As)(),[r,n]=(0,i.useState)("RM"),[a]=(0,i.useState)(Object.keys(o.DL)),[s,l]=(0,i.useState)(!0),[d,c]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),i=r.indexOf("restaurant");let t=i>=0?r[i+1]:null;if(!t&&null!==e&&void 0!==e&&e.restaurant_id&&(t=e.restaurant_id.toString()),!t)return n("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var o;const e=await r.json(),i=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"MYR";n(i)}else n("MYR")}catch(a){console.error("Failed to fetch restaurant currency:",a),c("Failed to load currency settings"),n("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:a,loading:s,error:d}}},6152:(e,r,n)=>{n.r(r),n.d(r,{default:()=>H});var i=n(9950),t=n(4752),o=n(2853),a=n(3705),s=n(8409),l=n(2488),d=n(1367),c=n(9610),p=n(4021),u=n(6038),x=n(7617),g=n(5030),h=n(4414);const m=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,v=t.Ay.div`
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
`,y=t.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,b=t.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,f=t.Ay.div`
  flex: 1;
  min-width: 0;
`,j=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,F=t.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,C=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,k=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,w=t.Ay.div``,A=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,_=t.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,E=t.Ay.div`
  flex: 1;
  min-height: 12px;
`,B=t.Ay.div`
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,S=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,R=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,z=t.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,I=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  padding: 10px;
  background: #FAFAFA;
  border-radius: 8px;
  font-size: 12px;
  color: #6B7280;
`,$=t.Ay.div`
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
`,M=t.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,T=t.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F8FAFC;\n          border: 1px solid #E2E8F0;\n          color: #475569;\n          &:hover {\n            background: #F1F5F9;\n            transform: translateY(-1px);\n          }\n        "}}}
`,Y=t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,q=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,O=t.Ay.h3`
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
`,P=t.Ay.div`
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
`,L=t.Ay.button`
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
`,Z=t.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,G=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,J=t.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`,U=t.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,H=()=>{const{t:e}=(0,g.Bd)("recipes"),{user:r}=(0,d.As)(),{defaultCurrency:n,supportedCurrencies:t}=(0,p.i1)(),[H,W]=(0,i.useState)(""),[V,X]=(0,i.useState)([]),[K,ee]=(0,i.useState)([]),[re,ne]=(0,i.useState)(!0),[ie,te]=(0,i.useState)(""),[oe,ae]=(0,i.useState)("all"),[se,le]=(0,i.useState)(null),[de,ce]=(0,i.useState)(!1),[pe,ue]=(0,i.useState)(!0),[xe,ge]=(0,i.useState)({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),[he,me]=(0,i.useState)([]),[ve,ye]=(0,i.useState)(!1),[be,fe]=(0,i.useState)(null),[je,Fe]=(0,i.useState)(!1),[Ce,ke]=(0,i.useState)(null),[we,Ae]=(0,i.useState)(null),[_e,Ee]=(0,i.useState)(!1),[Be,Se]=(0,i.useState)(null),[Re,ze]=(0,i.useState)(null);(0,i.useEffect)(()=>{n&&!H&&W(n)},[n,H]),(0,i.useEffect)(()=>{(async()=>{if("Brand General"===(null===r||void 0===r?void 0:r.role)||"Brand Manager"===(null===r||void 0===r?void 0:r.role))try{const e=await fetch("/api/brands"),n=await e.json();if(n.success&&n.data.length>0){const e=n.data.find(e=>e.owner_id===r.id);e&&fe(e.id)}}catch(e){console.error("Failed to fetch user brand:",e)}})()},[r]),(0,i.useEffect)(()=>{"Brand General"===(null===r||void 0===r?void 0:r.role)||"Brand Manager"===(null===r||void 0===r?void 0:r.role)?be&&($e(),Ie()):"Restaurant Admin"===(null===r||void 0===r?void 0:r.role)&&($e(),Ie())},[r,be]);const Ie=async()=>{try{let e="";if("Brand General"===(null===r||void 0===r?void 0:r.role)||"Brand Manager"===(null===r||void 0===r?void 0:r.role)?be&&(e=`/api/brands/${be}/ingredients`):"Restaurant Admin"===(null===r||void 0===r?void 0:r.role)&&r.restaurant_id&&(e=`/api/restaurants/${r.restaurant_id}/ingredients`),!e)return;const n=await fetch(e),i=await n.json();i.success&&ee(i.data)}catch(e){console.error("Failed to fetch ingredients:",e)}},$e=async()=>{try{ne(!0);let o="";if("Brand General"===(null===r||void 0===r?void 0:r.role)||"Brand Manager"===(null===r||void 0===r?void 0:r.role)?be&&(o=`/api/brands/${be}/recipes`):"Restaurant Admin"===(null===r||void 0===r?void 0:r.role)&&r.restaurant_id&&(o=`/api/restaurants/${r.restaurant_id}/recipes`),!o)return void ne(!1);const a=await fetch(o),s=await a.json();var e,n,i,t;if(s.success)if(Array.isArray(s.data))console.log("=== RECIPES API RESPONSE ==="),console.log("First recipe:",s.data[0]),console.log("prep_time:",null===(e=s.data[0])||void 0===e?void 0:e.prep_time),console.log("cook_time:",null===(n=s.data[0])||void 0===n?void 0:n.cook_time),console.log("instructions:",null===(i=s.data[0])||void 0===i?void 0:i.instructions),console.log("recipeIngredients:",null===(t=s.data[0])||void 0===t?void 0:t.recipeIngredients),X(s.data),ue(!0);else X([...s.data.brand_recipes,...s.data.own_recipes]),ue("brand"!==s.data.recipe_manager_type)}catch(o){console.error("Failed to fetch recipes:",o)}finally{ne(!1)}},De=function(e){let r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];var n,i,t,o;(qe(null),ye(r),e)?(le(e),ge({name:e.name,description:e.description||"",category:e.category,emoji:e.emoji||"",image:e.image||"",prep_time:(null===(n=e.prep_time)||void 0===n?void 0:n.toString())||"",cook_time:(null===(i=e.cook_time)||void 0===i?void 0:i.toString())||"",instructions:e.instructions||"",suggested_price:(null===(t=e.suggested_price)||void 0===t?void 0:t.toString())||""}),me((null===(o=e.recipeIngredients)||void 0===o?void 0:o.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""})))||[])):(le(null),ge({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),me([]));ce(!0)},Me=()=>{ce(!1),le(null),ye(!1),ge({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),me([])},Te=e=>{null!==r&&void 0!==r&&r.restaurant_id?(ze(null),Se(e),Ee(!0)):ze("Restaurant ID is required to register menu")},[Ye,qe]=(0,i.useState)(null),Oe=(e,r,n)=>{const i=[...he];i[e]={...i[e],[r]:n},me(i)},Qe=V.filter(e=>{const r=e.name.toLowerCase().includes(ie.toLowerCase()),n="all"===oe||e.category===oe;return r&&n}),Pe=["all",...Array.from(new Set(V.map(e=>e.category)))],Ne=V.filter(e=>e.is_active).length,Le=V.reduce((e,r)=>e+Number(r.total_ingredient_cost||0),0),Ze=V.length>0?Le/V.length:0;return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(s.mc,{children:[(0,h.jsxs)(s.Y9,{children:[(0,h.jsx)(s.hE,{children:"Recipes"}),(0,h.jsx)(s.ex,{children:pe&&(0,h.jsx)(a.cc,{variant:"primary",onClick:()=>De(null),children:"New Recipe"})})]}),(0,h.jsxs)(s.MD,{children:[(0,h.jsxs)(s.hI,{children:[(0,h.jsx)(s.v0,{children:"Total Recipes"}),(0,h.jsx)(s.Os,{children:V.length}),(0,h.jsxs)(s.d1,{children:[Ne," active"]})]}),(0,h.jsxs)(s.hI,{children:[(0,h.jsx)(s.v0,{children:"Average Cost"}),(0,h.jsx)(s.Os,{children:(0,u.vv)(Ze,H||"MYR")}),(0,h.jsx)(s.d1,{children:"per recipe"})]}),(0,h.jsxs)(s.hI,{children:[(0,h.jsx)(s.v0,{children:"Total Value"}),(0,h.jsx)(s.Os,{children:(0,u.vv)(Le,H||"MYR")}),(0,h.jsx)(s.d1,{children:"all recipes"})]})]}),(0,h.jsxs)(l.Qn,{children:[(0,h.jsx)(l.DO,{type:"text",placeholder:"Search recipes...",value:ie,onChange:e=>te(e.target.value)}),(0,h.jsx)(l.Jt,{value:oe,onChange:e=>ae(e.target.value),children:Pe.map(e=>(0,h.jsx)("option",{value:e,children:"all"===e?"All Categories":e},e))}),(0,h.jsx)(l.Jt,{value:H,onChange:e=>W(e.target.value),style:{minWidth:"140px"},children:t.map(e=>(0,h.jsxs)("option",{value:e,children:[(0,u.Qn)(e)," ",e]},e))})]}),(0,h.jsxs)(s.UC,{children:[we&&(0,h.jsxs)("div",{style:{padding:"12px 16px",marginBottom:"16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[we,(0,h.jsx)("button",{onClick:()=>Ae(null),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"18px"},children:"\xd7"})]}),Re&&(0,h.jsxs)("div",{style:{padding:"12px 16px",marginBottom:"16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[Re,(0,h.jsx)("button",{onClick:()=>ze(null),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"18px"},children:"\xd7"})]}),re?(0,h.jsx)(o.pp,{children:(0,h.jsx)(Y,{children:"Loading..."})}):0===Qe.length?(0,h.jsxs)(o.pp,{children:[(0,h.jsx)(Y,{children:"No recipes found"}),(0,h.jsx)(q,{children:ie||"all"!==oe?"Try adjusting your filters":pe?"Create your first recipe to get started":"Brand recipes will appear here when available"}),!ie&&"all"===oe&&pe&&(0,h.jsx)(a.cc,{variant:"primary",onClick:()=>De(null),children:"Create First Recipe"})]}):(0,h.jsx)(m,{children:Qe.map(e=>{var n;return(0,h.jsxs)(v,{isActive:e.is_active,onClick:()=>De(e,!0),children:[(0,h.jsxs)(y,{children:[e.emoji&&(0,h.jsx)(b,{children:e.emoji}),(0,h.jsxs)(f,{children:[(0,h.jsx)(j,{children:e.name}),(0,h.jsxs)("div",{style:{display:"flex",gap:"6px",alignItems:"center",flexWrap:"wrap"},children:[(0,h.jsx)(F,{children:e.category}),e.from_brand&&(0,h.jsx)(F,{style:{background:"#FEF3C7",color:"#D97706"},children:"Brand"})]})]})]}),e.description&&(0,h.jsx)(C,{children:e.description}),(0,h.jsxs)(k,{children:[(0,h.jsxs)(w,{children:[(0,h.jsx)(A,{children:"Cost"}),(0,h.jsx)(_,{children:(0,u.vv)(e.total_ingredient_cost||0,H||"MYR")})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(A,{children:"Suggested"}),(0,h.jsx)(_,{children:(0,u.vv)(e.suggested_price||0,H||"MYR")})]})]}),(e.prep_time||e.cook_time)&&(0,h.jsxs)(I,{children:[e.prep_time&&(0,h.jsxs)($,{children:[(0,h.jsx)("span",{children:"Prep:"}),(0,h.jsxs)("strong",{children:[e.prep_time," min"]})]}),e.cook_time&&(0,h.jsxs)($,{children:[(0,h.jsx)("span",{children:"Cook:"}),(0,h.jsxs)("strong",{children:[e.cook_time," min"]})]}),e.prep_time&&e.cook_time&&(0,h.jsxs)($,{children:[(0,h.jsx)("span",{children:"Total:"}),(0,h.jsxs)("strong",{children:[e.prep_time+e.cook_time," min"]})]})]}),e.instructions&&(0,h.jsx)(D,{children:e.instructions}),(0,h.jsx)(E,{}),(0,h.jsxs)(B,{children:[(0,h.jsxs)(S,{children:[(null===(n=e.recipeIngredients)||void 0===n?void 0:n.length)||0," ingredients"]}),e.recipeIngredients&&e.recipeIngredients.length>0&&(0,h.jsxs)(R,{children:[e.recipeIngredients.slice(0,5).map((e,r)=>{var n;return(0,h.jsx)(z,{children:(null===(n=e.ingredient)||void 0===n?void 0:n.name)||`Ingredient #${e.ingredient_id}`},r)}),e.recipeIngredients.length>5&&(0,h.jsxs)(z,{style:{background:"#E0E7FF",color:"#4F46E5"},children:["+",e.recipeIngredients.length-5," more"]})]})]}),(0,h.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[!1!==e.editable&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(T,{variant:"primary",onClick:()=>De(e,!1),children:"Edit"}),(0,h.jsx)(T,{variant:"danger",onClick:()=>{return r=e.id,Ae(null),ke(r),void Fe(!0);var r},children:"Delete"})]}),(null===r||void 0===r?void 0:r.restaurant_id)&&(0,h.jsx)(T,{variant:"primary",onClick:()=>Te(e),style:{background:"#10B981"},children:"+ Menu"})]})]},e.id)})})]})]}),(0,h.jsx)(c.aF,{isOpen:de,onClose:Me,title:ve?"Recipe Details":se?"Edit Recipe":"New Recipe",size:"large",children:(0,h.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),qe(null),xe.name&&xe.category)try{let e="";const n=se?"PUT":"POST";"Brand General"===(null===r||void 0===r?void 0:r.role)||"Brand Manager"===(null===r||void 0===r?void 0:r.role)?e=se?`/api/brands/${be}/recipes/${se.id}`:`/api/brands/${be}/recipes`:"Restaurant Admin"===(null===r||void 0===r?void 0:r.role)&&(e=se?`/api/restaurants/${r.restaurant_id}/recipes/${se.id}`:`/api/restaurants/${r.restaurant_id}/recipes`);const i=await fetch(e,{method:n,headers:{"Content-Type":"application/json"},body:JSON.stringify({name:xe.name,description:xe.description,category:xe.category,emoji:xe.emoji,image:xe.image,prep_time:xe.prep_time?parseInt(xe.prep_time):null,cook_time:xe.cook_time?parseInt(xe.cook_time):null,instructions:xe.instructions||null,suggested_price:parseFloat(xe.suggested_price)||0,ingredients:he.map(e=>({ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,notes:e.notes}))})}),t=await i.json();t.success?(Me(),$e()):qe(t.error||"Failed to save recipe")}catch(n){console.error("Failed to save recipe:",n),qe("Failed to save recipe")}else qe("Recipe name and category are required")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,h.jsxs)(c.fh,{children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Recipe Name ",!ve&&"*"]}),(0,h.jsx)(c.ZQ,{type:"text",value:xe.name,onChange:e=>ge({...xe,name:e.target.value}),placeholder:"e.g., Nasi Lemak Special",required:!ve,disabled:ve})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Category ",!ve&&"*"]}),(0,h.jsx)(c.ZQ,{type:"text",value:xe.category,onChange:e=>ge({...xe,category:e.target.value}),placeholder:"e.g., Main Dish",required:!ve,disabled:ve})]})]}),(0,h.jsxs)(c.fh,{children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Emoji"}),(0,h.jsx)(c.ZQ,{type:"text",value:xe.emoji,onChange:e=>ge({...xe,emoji:e.target.value}),placeholder:"\ud83c\udf5b",maxLength:4,disabled:ve})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsxs)(c.lR,{children:["Suggested Price (",(0,u.Qn)(H||"MYR"),")"]}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",value:xe.suggested_price,onChange:e=>ge({...xe,suggested_price:e.target.value}),placeholder:"0.00",disabled:ve})]})]}),(0,h.jsxs)(c.fh,{children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Prep Time (minutes)"}),(0,h.jsx)(c.ZQ,{type:"number",value:xe.prep_time,onChange:e=>ge({...xe,prep_time:e.target.value}),placeholder:"e.g., 15",disabled:ve})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Cook Time (minutes)"}),(0,h.jsx)(c.ZQ,{type:"number",value:xe.cook_time,onChange:e=>ge({...xe,cook_time:e.target.value}),placeholder:"e.g., 30",disabled:ve})]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Description"}),(0,h.jsx)(c.Lz,{value:xe.description,onChange:e=>ge({...xe,description:e.target.value}),placeholder:"Brief description of the recipe...",disabled:ve})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Cooking Instructions"}),(0,h.jsx)(c.Lz,{value:xe.instructions,onChange:e=>ge({...xe,instructions:e.target.value}),placeholder:"Step-by-step cooking instructions...",disabled:ve,style:{minHeight:"100px"}})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)(O,{children:"Ingredients"}),(0,h.jsx)(Q,{children:he.map((e,r)=>(0,h.jsxs)(P,{children:[(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Ingredient"}),(0,h.jsxs)(c.FX,{value:e.ingredient_id,onChange:e=>Oe(r,"ingredient_id",parseInt(e.target.value)),required:!ve,disabled:ve,children:[(0,h.jsx)("option",{value:0,children:"Select ingredient..."}),K.map(e=>(0,h.jsxs)("option",{value:e.id,children:[e.name," (",(0,u.vv)(e.unit_cost,H||"MYR"),"/",e.unit,")"]},e.id))]})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Quantity"}),(0,h.jsx)(c.ZQ,{type:"number",step:"0.01",value:e.quantity,onChange:e=>Oe(r,"quantity",e.target.value),placeholder:"0",required:!ve,disabled:ve})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Unit"}),(0,h.jsx)(c.ZQ,{type:"text",value:e.unit,onChange:e=>Oe(r,"unit",e.target.value),placeholder:"kg/g/ml",required:!ve,disabled:ve})]}),(0,h.jsxs)(c.gE,{children:[(0,h.jsx)(c.lR,{children:"Notes"}),(0,h.jsx)(c.ZQ,{type:"text",value:e.notes,onChange:e=>Oe(r,"notes",e.target.value),placeholder:"Optional",disabled:ve})]}),!ve&&(0,h.jsx)(N,{type:"button",onClick:()=>(e=>{me(he.filter((r,n)=>n!==e))})(r),children:"\xd7"})]},r))}),!ve&&(0,h.jsx)(L,{type:"button",onClick:()=>{me([...he,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),he.length>0&&(0,h.jsxs)(Z,{children:[(0,h.jsx)(G,{children:"Total Ingredient Cost"}),(0,h.jsx)(J,{children:(0,u.vv)(he.reduce((e,r)=>{const n=K.find(e=>e.id===r.ingredient_id);return n&&r.quantity?e+parseFloat(r.quantity)*parseFloat(n.unit_cost.toString()):e},0),H||"MYR")})]})]}),Ye&&(0,h.jsx)("div",{style:{padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:Ye}),(0,h.jsxs)(U,{children:[(0,h.jsx)(c.yl,{type:"button",variant:"secondary",onClick:Me,children:ve?"Close":"Cancel"}),!ve&&(0,h.jsx)(c.yl,{type:"submit",variant:"primary",children:se?"Update Recipe":"Create Recipe"}),ve&&(null===r||void 0===r?void 0:r.restaurant_id)&&se&&(0,h.jsx)(c.yl,{type:"button",variant:"primary",onClick:()=>{Me(),Te(se)},style:{background:"#10B981"},children:"+ Register as Menu"})]})]})}),(0,h.jsx)(x.A,{isOpen:je,title:"Delete Recipe",message:"Are you sure you want to delete this recipe?",onConfirm:async()=>{if(Ce){Fe(!1);try{let e="";"Brand General"===(null===r||void 0===r?void 0:r.role)||"Brand Manager"===(null===r||void 0===r?void 0:r.role)?e=`/api/brands/${be}/recipes/${Ce}`:"Restaurant Admin"===(null===r||void 0===r?void 0:r.role)&&(e=`/api/restaurants/${null===r||void 0===r?void 0:r.restaurant_id}/recipes/${Ce}`);const n=localStorage.getItem("auth_token"),i=await fetch(e,{method:"DELETE",headers:n?{Authorization:`Bearer ${n}`}:{}});(await i.json()).success&&$e()}catch(e){console.error("Failed to delete recipe:",e),Ae("Failed to delete recipe")}finally{ke(null)}}},onCancel:()=>{Fe(!1),ke(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"}),(0,h.jsx)(x.A,{isOpen:_e,title:"Register as Menu Item",message:`Register "${null===Be||void 0===Be?void 0:Be.name}" as a menu item?`,onConfirm:async()=>{if(Be&&null!==r&&void 0!==r&&r.restaurant_id){Ee(!1);try{const e=await fetch("/api/menu/product",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:Be.name,description:Be.description||"",price:Be.suggested_price||0,category:Be.category,emoji:Be.emoji||"",restaurant_id:r.restaurant_id,recipe_id:Be.id})}),n=await e.json();n.success||ze(n.error||"Failed to register menu item")}catch(e){console.error("Failed to register menu:",e),ze("Failed to register menu item")}finally{Se(null)}}},onCancel:()=>{Ee(!1),Se(null)},confirmText:"Register",cancelText:"Cancel",type:"info"})]})}},7617:(e,r,n)=>{n.d(r,{A:()=>x});n(9950);var i=n(7119),t=n(4752),o=n(9610),a=n(4414);const s=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,l=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=t.Ay.button`
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
`,x=e=>{let{isOpen:r,title:n,message:t,onConfirm:x,onCancel:g,confirmText:h="Confirm",cancelText:m="Cancel",type:v="warning"}=e;return r?i.createPortal((0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&g()},style:{zIndex:1100},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(d,{children:n}),(0,a.jsx)(c,{children:t})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(u,{variant:"secondary",onClick:g,children:m}),(0,a.jsx)(u,{variant:"primary",type:v,onClick:x,children:h})]})]})}),document.body):null}}}]);