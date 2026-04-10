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
`},4021:(e,r,n)=>{n.d(r,{i1:()=>s});var i=n(9950),t=n(1367),o=n(6038),a=n(9955);const s=()=>{const{user:e}=(0,t.As)(),[r,n]=(0,i.useState)("RM"),[s]=(0,i.useState)(Object.keys(o.DL)),[l,d]=(0,i.useState)(!0),[c,p]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),i=r.indexOf("restaurant");let t=i>=0?r[i+1]:null;if(!t&&null!==e&&void 0!==e&&e.restaurant_id&&(t=e.restaurant_id.toString()),!t)return n("RM"),void d(!1);try{const e=(0,a.c4)(),r=await fetch(`/api/restaurants/${t}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var o;const e=await r.json(),i=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"MYR";n(i)}else n("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),n("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:s,loading:l,error:c}}},6152:(e,r,n)=>{n.r(r),n.d(r,{default:()=>W});var i=n(9950),t=n(4752),o=n(2853),a=n(3705),s=n(8409),l=n(2488),d=n(1367),c=n(9610),p=n(4021),u=n(6038),x=n(7617),g=n(5030),h=n(9955),m=n(4414);const v=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,y=t.Ay.div`
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
`,b=t.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,f=t.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,j=t.Ay.div`
  flex: 1;
  min-width: 0;
`,F=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,C=t.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,w=t.Ay.p`
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
`,A=t.Ay.div``,_=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,E=t.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,B=t.Ay.div`
  flex: 1;
  min-height: 12px;
`,R=t.Ay.div`
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,S=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,z=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,I=t.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,$=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  padding: 10px;
  background: #FAFAFA;
  border-radius: 8px;
  font-size: 12px;
  color: #6B7280;
`,D=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,M=t.Ay.div`
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
`,T=t.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,Y=t.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F8FAFC;\n          border: 1px solid #E2E8F0;\n          color: #475569;\n          &:hover {\n            background: #F1F5F9;\n            transform: translateY(-1px);\n          }\n        "}}}
`,q=t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,O=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,Q=t.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,P=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,N=t.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr 40px;
  gap: 8px;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,L=t.Ay.button`
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
`,Z=t.Ay.button`
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
`,G=t.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,J=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,U=t.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`,H=t.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,W=()=>{const{t:e}=(0,g.Bd)("recipes"),{user:r}=(0,d.As)(),{defaultCurrency:n,supportedCurrencies:t}=(0,p.i1)(),[W,V]=(0,i.useState)(""),[X,K]=(0,i.useState)([]),[ee,re]=(0,i.useState)([]),[ne,ie]=(0,i.useState)(!0),[te,oe]=(0,i.useState)(""),[ae,se]=(0,i.useState)("all"),[le,de]=(0,i.useState)(null),[ce,pe]=(0,i.useState)(!1),[ue,xe]=(0,i.useState)(!0),[ge,he]=(0,i.useState)({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),[me,ve]=(0,i.useState)([]),[ye,be]=(0,i.useState)(!1),[fe,je]=(0,i.useState)(null),[Fe,Ce]=(0,i.useState)(!1),[we,ke]=(0,i.useState)(null),[Ae,_e]=(0,i.useState)(null),[Ee,Be]=(0,i.useState)(!1),[Re,Se]=(0,i.useState)(null),[ze,Ie]=(0,i.useState)(null);(0,i.useEffect)(()=>{n&&!W&&V(n)},[n,W]),(0,i.useEffect)(()=>{(async()=>{if("Brand General"===(null===r||void 0===r?void 0:r.role)||"Brand Manager"===(null===r||void 0===r?void 0:r.role))try{const e=await fetch("/api/brands"),n=await e.json();if(n.success&&n.data.length>0){const e=n.data.find(e=>e.owner_id===r.id);e&&je(e.id)}}catch(e){console.error("Failed to fetch user brand:",e)}})()},[r]),(0,i.useEffect)(()=>{"Brand General"===(null===r||void 0===r?void 0:r.role)||"Brand Manager"===(null===r||void 0===r?void 0:r.role)?fe&&(De(),$e()):"Restaurant Admin"===(null===r||void 0===r?void 0:r.role)&&(De(),$e())},[r,fe]);const $e=async()=>{try{let e="";if("Brand General"===(null===r||void 0===r?void 0:r.role)||"Brand Manager"===(null===r||void 0===r?void 0:r.role)?fe&&(e=`/api/brands/${fe}/ingredients`):"Restaurant Admin"===(null===r||void 0===r?void 0:r.role)&&r.restaurant_id&&(e=`/api/restaurants/${r.restaurant_id}/ingredients`),!e)return;const n=await fetch(e),i=await n.json();i.success&&re(i.data)}catch(e){console.error("Failed to fetch ingredients:",e)}},De=async()=>{try{ie(!0);let o="";if("Brand General"===(null===r||void 0===r?void 0:r.role)||"Brand Manager"===(null===r||void 0===r?void 0:r.role)?fe&&(o=`/api/brands/${fe}/recipes`):"Restaurant Admin"===(null===r||void 0===r?void 0:r.role)&&r.restaurant_id&&(o=`/api/restaurants/${r.restaurant_id}/recipes`),!o)return void ie(!1);const a=await fetch(o),s=await a.json();var e,n,i,t;if(s.success)if(Array.isArray(s.data))console.log("=== RECIPES API RESPONSE ==="),console.log("First recipe:",s.data[0]),console.log("prep_time:",null===(e=s.data[0])||void 0===e?void 0:e.prep_time),console.log("cook_time:",null===(n=s.data[0])||void 0===n?void 0:n.cook_time),console.log("instructions:",null===(i=s.data[0])||void 0===i?void 0:i.instructions),console.log("recipeIngredients:",null===(t=s.data[0])||void 0===t?void 0:t.recipeIngredients),K(s.data),xe(!0);else K([...s.data.brand_recipes,...s.data.own_recipes]),xe("brand"!==s.data.recipe_manager_type)}catch(o){console.error("Failed to fetch recipes:",o)}finally{ie(!1)}},Me=function(e){let r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];var n,i,t,o;(Oe(null),be(r),e)?(de(e),he({name:e.name,description:e.description||"",category:e.category,emoji:e.emoji||"",image:e.image||"",prep_time:(null===(n=e.prep_time)||void 0===n?void 0:n.toString())||"",cook_time:(null===(i=e.cook_time)||void 0===i?void 0:i.toString())||"",instructions:e.instructions||"",suggested_price:(null===(t=e.suggested_price)||void 0===t?void 0:t.toString())||""}),ve((null===(o=e.recipeIngredients)||void 0===o?void 0:o.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""})))||[])):(de(null),he({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),ve([]));pe(!0)},Te=()=>{pe(!1),de(null),be(!1),he({name:"",description:"",category:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),ve([])},Ye=e=>{null!==r&&void 0!==r&&r.restaurant_id?(Ie(null),Se(e),Be(!0)):Ie("Restaurant ID is required to register menu")},[qe,Oe]=(0,i.useState)(null),Qe=(e,r,n)=>{const i=[...me];i[e]={...i[e],[r]:n},ve(i)},Pe=X.filter(e=>{const r=e.name.toLowerCase().includes(te.toLowerCase()),n="all"===ae||e.category===ae;return r&&n}),Ne=["all",...Array.from(new Set(X.map(e=>e.category)))],Le=X.filter(e=>e.is_active).length,Ze=X.reduce((e,r)=>e+Number(r.total_ingredient_cost||0),0),Ge=X.length>0?Ze/X.length:0;return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(s.mc,{children:[(0,m.jsxs)(s.Y9,{children:[(0,m.jsx)(s.hE,{children:"Recipes"}),(0,m.jsx)(s.ex,{children:ue&&(0,m.jsx)(a.cc,{variant:"primary",onClick:()=>Me(null),children:"New Recipe"})})]}),(0,m.jsxs)(s.MD,{children:[(0,m.jsxs)(s.hI,{children:[(0,m.jsx)(s.v0,{children:"Total Recipes"}),(0,m.jsx)(s.Os,{children:X.length}),(0,m.jsxs)(s.d1,{children:[Le," active"]})]}),(0,m.jsxs)(s.hI,{children:[(0,m.jsx)(s.v0,{children:"Average Cost"}),(0,m.jsx)(s.Os,{children:(0,u.vv)(Ge,W||"MYR")}),(0,m.jsx)(s.d1,{children:"per recipe"})]}),(0,m.jsxs)(s.hI,{children:[(0,m.jsx)(s.v0,{children:"Total Value"}),(0,m.jsx)(s.Os,{children:(0,u.vv)(Ze,W||"MYR")}),(0,m.jsx)(s.d1,{children:"all recipes"})]})]}),(0,m.jsxs)(l.Qn,{children:[(0,m.jsx)(l.DO,{type:"text",placeholder:"Search recipes...",value:te,onChange:e=>oe(e.target.value)}),(0,m.jsx)(l.Jt,{value:ae,onChange:e=>se(e.target.value),children:Ne.map(e=>(0,m.jsx)("option",{value:e,children:"all"===e?"All Categories":e},e))}),(0,m.jsx)(l.Jt,{value:W,onChange:e=>V(e.target.value),style:{minWidth:"140px"},children:t.map(e=>(0,m.jsxs)("option",{value:e,children:[(0,u.Qn)(e)," ",e]},e))})]}),(0,m.jsxs)(s.UC,{children:[Ae&&(0,m.jsxs)("div",{style:{padding:"12px 16px",marginBottom:"16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[Ae,(0,m.jsx)("button",{onClick:()=>_e(null),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"18px"},children:"\xd7"})]}),ze&&(0,m.jsxs)("div",{style:{padding:"12px 16px",marginBottom:"16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[ze,(0,m.jsx)("button",{onClick:()=>Ie(null),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"18px"},children:"\xd7"})]}),ne?(0,m.jsx)(o.pp,{children:(0,m.jsx)(q,{children:"Loading..."})}):0===Pe.length?(0,m.jsxs)(o.pp,{children:[(0,m.jsx)(q,{children:"No recipes found"}),(0,m.jsx)(O,{children:te||"all"!==ae?"Try adjusting your filters":ue?"Create your first recipe to get started":"Brand recipes will appear here when available"}),!te&&"all"===ae&&ue&&(0,m.jsx)(a.cc,{variant:"primary",onClick:()=>Me(null),children:"Create First Recipe"})]}):(0,m.jsx)(v,{children:Pe.map(e=>{var n;return(0,m.jsxs)(y,{isActive:e.is_active,onClick:()=>Me(e,!0),children:[(0,m.jsxs)(b,{children:[e.emoji&&(0,m.jsx)(f,{children:e.emoji}),(0,m.jsxs)(j,{children:[(0,m.jsx)(F,{children:e.name}),(0,m.jsxs)("div",{style:{display:"flex",gap:"6px",alignItems:"center",flexWrap:"wrap"},children:[(0,m.jsx)(C,{children:e.category}),e.from_brand&&(0,m.jsx)(C,{style:{background:"#FEF3C7",color:"#D97706"},children:"Brand"})]})]})]}),e.description&&(0,m.jsx)(w,{children:e.description}),(0,m.jsxs)(k,{children:[(0,m.jsxs)(A,{children:[(0,m.jsx)(_,{children:"Cost"}),(0,m.jsx)(E,{children:(0,u.vv)(e.total_ingredient_cost||0,W||"MYR")})]}),(0,m.jsxs)(A,{children:[(0,m.jsx)(_,{children:"Suggested"}),(0,m.jsx)(E,{children:(0,u.vv)(e.suggested_price||0,W||"MYR")})]})]}),(e.prep_time||e.cook_time)&&(0,m.jsxs)($,{children:[e.prep_time&&(0,m.jsxs)(D,{children:[(0,m.jsx)("span",{children:"Prep:"}),(0,m.jsxs)("strong",{children:[e.prep_time," min"]})]}),e.cook_time&&(0,m.jsxs)(D,{children:[(0,m.jsx)("span",{children:"Cook:"}),(0,m.jsxs)("strong",{children:[e.cook_time," min"]})]}),e.prep_time&&e.cook_time&&(0,m.jsxs)(D,{children:[(0,m.jsx)("span",{children:"Total:"}),(0,m.jsxs)("strong",{children:[e.prep_time+e.cook_time," min"]})]})]}),e.instructions&&(0,m.jsx)(M,{children:e.instructions}),(0,m.jsx)(B,{}),(0,m.jsxs)(R,{children:[(0,m.jsxs)(S,{children:[(null===(n=e.recipeIngredients)||void 0===n?void 0:n.length)||0," ingredients"]}),e.recipeIngredients&&e.recipeIngredients.length>0&&(0,m.jsxs)(z,{children:[e.recipeIngredients.slice(0,5).map((e,r)=>{var n;return(0,m.jsx)(I,{children:(null===(n=e.ingredient)||void 0===n?void 0:n.name)||`Ingredient #${e.ingredient_id}`},r)}),e.recipeIngredients.length>5&&(0,m.jsxs)(I,{style:{background:"#E0E7FF",color:"#4F46E5"},children:["+",e.recipeIngredients.length-5," more"]})]})]}),(0,m.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[!1!==e.editable&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(Y,{variant:"primary",onClick:()=>Me(e,!1),children:"Edit"}),(0,m.jsx)(Y,{variant:"danger",onClick:()=>{return r=e.id,_e(null),ke(r),void Ce(!0);var r},children:"Delete"})]}),(null===r||void 0===r?void 0:r.restaurant_id)&&(0,m.jsx)(Y,{variant:"primary",onClick:()=>Ye(e),style:{background:"#10B981"},children:"+ Menu"})]})]},e.id)})})]})]}),(0,m.jsx)(c.aF,{isOpen:ce,onClose:Te,title:ye?"Recipe Details":le?"Edit Recipe":"New Recipe",size:"large",children:(0,m.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Oe(null),ge.name&&ge.category)try{let e="";const n=le?"PUT":"POST";"Brand General"===(null===r||void 0===r?void 0:r.role)||"Brand Manager"===(null===r||void 0===r?void 0:r.role)?e=le?`/api/brands/${fe}/recipes/${le.id}`:`/api/brands/${fe}/recipes`:"Restaurant Admin"===(null===r||void 0===r?void 0:r.role)&&(e=le?`/api/restaurants/${r.restaurant_id}/recipes/${le.id}`:`/api/restaurants/${r.restaurant_id}/recipes`);const i=await fetch(e,{method:n,headers:{"Content-Type":"application/json"},body:JSON.stringify({name:ge.name,description:ge.description,category:ge.category,emoji:ge.emoji,image:ge.image,prep_time:ge.prep_time?parseInt(ge.prep_time):null,cook_time:ge.cook_time?parseInt(ge.cook_time):null,instructions:ge.instructions||null,suggested_price:parseFloat(ge.suggested_price)||0,ingredients:me.map(e=>({ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,notes:e.notes}))})}),t=await i.json();t.success?(Te(),De()):Oe(t.error||"Failed to save recipe")}catch(n){console.error("Failed to save recipe:",n),Oe("Failed to save recipe")}else Oe("Recipe name and category are required")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,m.jsxs)(c.fh,{children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Recipe Name ",!ye&&"*"]}),(0,m.jsx)(c.ZQ,{type:"text",value:ge.name,onChange:e=>he({...ge,name:e.target.value}),placeholder:"e.g., Nasi Lemak Special",required:!ye,disabled:ye})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Category ",!ye&&"*"]}),(0,m.jsx)(c.ZQ,{type:"text",value:ge.category,onChange:e=>he({...ge,category:e.target.value}),placeholder:"e.g., Main Dish",required:!ye,disabled:ye})]})]}),(0,m.jsxs)(c.fh,{children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Emoji"}),(0,m.jsx)(c.ZQ,{type:"text",value:ge.emoji,onChange:e=>he({...ge,emoji:e.target.value}),placeholder:"\ud83c\udf5b",maxLength:4,disabled:ye})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsxs)(c.lR,{children:["Suggested Price (",(0,u.Qn)(W||"MYR"),")"]}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",value:ge.suggested_price,onChange:e=>he({...ge,suggested_price:e.target.value}),placeholder:"0.00",disabled:ye})]})]}),(0,m.jsxs)(c.fh,{children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Prep Time (minutes)"}),(0,m.jsx)(c.ZQ,{type:"number",value:ge.prep_time,onChange:e=>he({...ge,prep_time:e.target.value}),placeholder:"e.g., 15",disabled:ye})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Cook Time (minutes)"}),(0,m.jsx)(c.ZQ,{type:"number",value:ge.cook_time,onChange:e=>he({...ge,cook_time:e.target.value}),placeholder:"e.g., 30",disabled:ye})]})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Description"}),(0,m.jsx)(c.Lz,{value:ge.description,onChange:e=>he({...ge,description:e.target.value}),placeholder:"Brief description of the recipe...",disabled:ye})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Cooking Instructions"}),(0,m.jsx)(c.Lz,{value:ge.instructions,onChange:e=>he({...ge,instructions:e.target.value}),placeholder:"Step-by-step cooking instructions...",disabled:ye,style:{minHeight:"100px"}})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)(Q,{children:"Ingredients"}),(0,m.jsx)(P,{children:me.map((e,r)=>(0,m.jsxs)(N,{children:[(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Ingredient"}),(0,m.jsxs)(c.FX,{value:e.ingredient_id,onChange:e=>Qe(r,"ingredient_id",parseInt(e.target.value)),required:!ye,disabled:ye,children:[(0,m.jsx)("option",{value:0,children:"Select ingredient..."}),ee.map(e=>(0,m.jsxs)("option",{value:e.id,children:[e.name," (",(0,u.vv)(e.unit_cost,W||"MYR"),"/",e.unit,")"]},e.id))]})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Quantity"}),(0,m.jsx)(c.ZQ,{type:"number",step:"0.01",value:e.quantity,onChange:e=>Qe(r,"quantity",e.target.value),placeholder:"0",required:!ye,disabled:ye})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Unit"}),(0,m.jsx)(c.ZQ,{type:"text",value:e.unit,onChange:e=>Qe(r,"unit",e.target.value),placeholder:"kg/g/ml",required:!ye,disabled:ye})]}),(0,m.jsxs)(c.gE,{children:[(0,m.jsx)(c.lR,{children:"Notes"}),(0,m.jsx)(c.ZQ,{type:"text",value:e.notes,onChange:e=>Qe(r,"notes",e.target.value),placeholder:"Optional",disabled:ye})]}),!ye&&(0,m.jsx)(L,{type:"button",onClick:()=>(e=>{ve(me.filter((r,n)=>n!==e))})(r),children:"\xd7"})]},r))}),!ye&&(0,m.jsx)(Z,{type:"button",onClick:()=>{ve([...me,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),me.length>0&&(0,m.jsxs)(G,{children:[(0,m.jsx)(J,{children:"Total Ingredient Cost"}),(0,m.jsx)(U,{children:(0,u.vv)(me.reduce((e,r)=>{const n=ee.find(e=>e.id===r.ingredient_id);return n&&r.quantity?e+parseFloat(r.quantity)*parseFloat(n.unit_cost.toString()):e},0),W||"MYR")})]})]}),qe&&(0,m.jsx)("div",{style:{padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:qe}),(0,m.jsxs)(H,{children:[(0,m.jsx)(c.yl,{type:"button",variant:"secondary",onClick:Te,children:ye?"Close":"Cancel"}),!ye&&(0,m.jsx)(c.yl,{type:"submit",variant:"primary",children:le?"Update Recipe":"Create Recipe"}),ye&&(null===r||void 0===r?void 0:r.restaurant_id)&&le&&(0,m.jsx)(c.yl,{type:"button",variant:"primary",onClick:()=>{Te(),Ye(le)},style:{background:"#10B981"},children:"+ Register as Menu"})]})]})}),(0,m.jsx)(x.A,{isOpen:Fe,title:"Delete Recipe",message:"Are you sure you want to delete this recipe?",onConfirm:async()=>{if(we){Ce(!1);try{let e="";"Brand General"===(null===r||void 0===r?void 0:r.role)||"Brand Manager"===(null===r||void 0===r?void 0:r.role)?e=`/api/brands/${fe}/recipes/${we}`:"Restaurant Admin"===(null===r||void 0===r?void 0:r.role)&&(e=`/api/restaurants/${null===r||void 0===r?void 0:r.restaurant_id}/recipes/${we}`);const n=(0,h.c4)(),i=await fetch(e,{method:"DELETE",headers:n?{Authorization:`Bearer ${n}`}:{}});(await i.json()).success&&De()}catch(e){console.error("Failed to delete recipe:",e),_e("Failed to delete recipe")}finally{ke(null)}}},onCancel:()=>{Ce(!1),ke(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"}),(0,m.jsx)(x.A,{isOpen:Ee,title:"Register as Menu Item",message:`Register "${null===Re||void 0===Re?void 0:Re.name}" as a menu item?`,onConfirm:async()=>{if(Re&&null!==r&&void 0!==r&&r.restaurant_id){Be(!1);try{const e=await fetch("/api/menu/product",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:Re.name,description:Re.description||"",price:Re.suggested_price||0,category:Re.category,emoji:Re.emoji||"",restaurant_id:r.restaurant_id,recipe_id:Re.id})}),n=await e.json();n.success||Ie(n.error||"Failed to register menu item")}catch(e){console.error("Failed to register menu:",e),Ie("Failed to register menu item")}finally{Se(null)}}},onCancel:()=>{Be(!1),Se(null)},confirmText:"Register",cancelText:"Cancel",type:"info"})]})}},7617:(e,r,n)=>{n.d(r,{A:()=>x});n(9950);var i=n(7119),t=n(4752),o=n(9610),a=n(4414);const s=t.Ay.div`
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