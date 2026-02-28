"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7121],{1840:(e,i,t)=>{t.d(i,{ff:()=>o});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const r="";n();async function o(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${r}${e}`,n=localStorage.getItem("auth_token"),o={credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...i.headers},...i},s=await fetch(t,o);if(!s.ok){const e=await s.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${s.status}`)}return s.json()}},7121:(e,i,t)=>{t.r(i),t.d(i,{default:()=>$i});var n=t(9950),r=t(4752),o=t(4492),s=t(2674),a=t(1367),d=t(3705),l=t(2488),c=t(9610),p=t(4877),x=t(9194),g=t(4021),u=t(6038),h=t(1840),m=t(251),y=t(4414);const f=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,j=r.Ay.div`
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
`,b=r.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,F=r.Ay.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`,_=r.Ay.div`
  flex: 1;
  min-width: 0;
`,k=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,A=r.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`,C=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,w=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,E=r.Ay.div``,B=r.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,S=r.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,z=r.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,I=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,R=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,D=r.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,$=r.Ay.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #6B7280;
  margin: 8px 0;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
`,L=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    color: #9CA3AF;
  }

  strong {
    color: #374151;
    font-weight: 600;
  }
`,T=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin: 8px 0;
  padding: 8px;
  background: #FEFCE8;
  border-radius: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,N=r.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,q=r.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F6F9FC;\n          border: 1px solid #E6EBF1;\n          color: #6B7280;\n          &:hover {\n            border-color: #635BFF;\n            color: #635BFF;\n            background: #F4F3FF;\n            transform: translateY(-1px);\n          }\n        "}}}
`,P=r.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,O=r.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,U=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,M=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,Q=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
`,Y=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Z=r.Ay.div`
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
`,J=r.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,W=r.Ay.button`
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
`,H=r.Ay.button`
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
`,X=r.Ay.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E5E7EB;
`,V=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,K=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,G=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,ee=(r.Ay.div`
  font-size: 14px;
  color: #0A2540;
  padding: 8px 0;
  min-height: 20px;
`,r.Ay.div`
  margin-bottom: 20px;
`,r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`,r.Ay.div``,r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  font-weight: 500;
`,r.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  white-space: pre-wrap;
`,r.Ay.div`
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
`,r.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 8px;
  padding: 10px 12px;
  background: #F3F4F6;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
`,r.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid #E5E7EB;
  font-size: 14px;
  color: #374151;

  &:first-of-type {
    border-top: none;
  }
`,r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 6px;
  max-height: 160px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: #FAFBFC;
`),ie=r.Ay.button`
  width: 36px;
  height: 36px;
  font-size: 20px;
  background: ${e=>e.selected?"#635BFF":"white"};
  border: 1px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.selected?"#635BFF":"#F0F0FF"};
    border-color: #635BFF;
    transform: scale(1.1);
  }
`,te=r.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`,ne=r.Ay.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`,re=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`,oe=r.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,se=r.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  line-height: 1;

  &:hover {
    color: #0A2540;
  }
`,ae=r.Ay.div`
  padding: 24px;
`,de=r.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,le=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ce=r.Ay.span`
  font-size: 20px;
`,pe=r.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,xe=r.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,ge=r.Ay.div`
  margin-bottom: 24px;
`,ue=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`,he=r.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,me=r.Ay.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,ye=r.Ay.span`
  font-size: 15px;
  color: #0A2540;
`,fe=r.Ay.span`
  font-size: 15px;
  font-weight: 600;
  color: #635BFF;
`,je=r.Ay.p`
  font-size: 15px;
  color: #4B5563;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
`,ve=r.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`,be=e=>{let{onCountChange:i,categoryRefreshKey:t}=e;const{user:r}=(0,a.As)(),{defaultCurrency:o}=(0,g.i1)(),[s,be]=(0,n.useState)("RM"),[Fe,_e]=(0,n.useState)([]),[ke,Ae]=(0,n.useState)([]),[Ce,we]=(0,n.useState)([]),[Ee,Be]=(0,n.useState)(!0),[Se,ze]=(0,n.useState)(""),[Ie,Re]=(0,n.useState)("all"),[De,$e]=(0,n.useState)(!1),[Le,Te]=(0,n.useState)(null),[Ne,qe]=(0,n.useState)(!1),[Pe,Oe]=(0,n.useState)(!1),[Ue,Me]=(0,n.useState)(null),[Qe,Ye]=(0,n.useState)({name:"",description:"",category_id:"",emoji:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),[Ze,Je]=(0,n.useState)(null),[We,He]=(0,n.useState)([]),[Xe,Ve]=(0,n.useState)(!1),Ke=null===r||void 0===r?void 0:r.brand_id;(0,n.useEffect)(()=>{o&&be(o)},[o]);const Ge=(0,n.useCallback)(async()=>{if(Ke)try{Be(!0);const[t,n,r]=await Promise.all([(0,h.ff)("/api/product-recipes"),(0,h.ff)("/api/product-ingredients"),(0,h.ff)("/api/product-recipe-categories")]);var e;if(t.success)_e(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0);n.success&&Ae((n.data||[]).filter(e=>e.is_active)),r.success&&we(r.data||[])}catch(t){console.error("Failed to fetch data:",t)}finally{Be(!1)}},[Ke,i]);(0,n.useEffect)(()=>{Ge()},[Ge]),(0,n.useEffect)(()=>{t&&ei()},[t]);const ei=async()=>{try{const e=await(0,h.ff)("/api/product-recipe-categories");e.success&&we(e.data||[])}catch(e){console.error("Failed to fetch categories:",e)}},ii=function(e){var i,t,n,r,o;(Ve(arguments.length>1&&void 0!==arguments[1]&&arguments[1]),Je(null),e)?(Te(e),Ye({name:e.name,description:e.description||"",category_id:(null===(i=e.category_id)||void 0===i?void 0:i.toString())||"",emoji:e.emoji||"",image:e.image||"",yield_amount:(null===(t=e.yield_amount)||void 0===t?void 0:t.toString())||"1",yield_unit:e.yield_unit||"portion",prep_time:(null===(n=e.prep_time)||void 0===n?void 0:n.toString())||"",cook_time:(null===(r=e.cook_time)||void 0===r?void 0:r.toString())||"",instructions_summary:e.instructions_summary||"",instructions_detail:e.instructions_detail||"",suggested_price:(null===(o=e.suggested_price)||void 0===o?void 0:o.toString())||""}),e.recipeIngredients?He(e.recipeIngredients.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""}))):He([])):(Te(null),Ye({name:"",description:"",category_id:"",emoji:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),He([]));$e(!0)},ti=()=>{Oe(!1),Me(null)},ni=(e,i,t)=>{const n=[...We];if(n[e]={...n[e],[i]:t},"ingredient_id"===i){const i=ke.find(e=>e.id===t);i&&(n[e].unit=i.unit)}He(n)},ri=()=>We.reduce((e,i)=>{const t=ke.find(e=>e.id===i.ingredient_id);if(t&&i.quantity){const n=t.base_quantity||1;return e+t.unit_cost/n*parseFloat(i.quantity)}return e},0),oi=Fe.filter(e=>{var i,t;const n=e.name.toLowerCase().includes(Se.toLowerCase())||(null===(i=e.code)||void 0===i?void 0:i.toLowerCase().includes(Se.toLowerCase())),r="all"===Ie||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===Ie;return n&&r});return Ee?(0,y.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(M,{children:[(0,y.jsx)("div",{children:(0,y.jsxs)(Q,{children:["Product Recipes (",Fe.length,")"]})}),(0,y.jsx)(d.cc,{variant:"primary",onClick:()=>ii(),children:"Add Recipe"})]}),(0,y.jsxs)(l.Qn,{children:[(0,y.jsx)(l.DO,{type:"text",placeholder:"Search recipes...",value:Se,onChange:e=>ze(e.target.value)}),(0,y.jsxs)(l.Jt,{value:Ie,onChange:e=>Re(e.target.value),children:[(0,y.jsx)("option",{value:"all",children:"All Categories"}),Ce.map(e=>(0,y.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),0===oi.length?(0,y.jsxs)(P,{children:[(0,y.jsx)(O,{children:"No recipes found"}),(0,y.jsx)(U,{children:"Create product recipes to track ingredient costs and manage production."}),(0,y.jsx)(d.cc,{variant:"primary",onClick:()=>ii(),children:"Add First Recipe"})]}):(0,y.jsx)(f,{children:oi.map(e=>{var i,t;return(0,y.jsxs)(j,{isActive:e.is_active,onClick:()=>ii(e,!0),children:[(0,y.jsxs)(v,{children:[e.image_url?(0,y.jsx)(F,{src:e.image_url,alt:e.name}):(0,y.jsx)(b,{children:e.emoji||(null===(i=e.category)||void 0===i?void 0:i.emoji)||"\ud83d\udccb"}),(0,y.jsxs)(_,{children:[(0,y.jsx)(k,{children:e.name}),(0,y.jsx)(A,{children:(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized"})]})]}),e.description&&(0,y.jsx)(C,{children:e.description}),(0,y.jsxs)(w,{children:[(0,y.jsxs)(E,{children:[(0,y.jsx)(B,{children:"Ingredient Cost"}),(0,y.jsx)(S,{children:(0,u.vv)(e.total_ingredient_cost||0,s)})]}),(0,y.jsxs)(E,{children:[(0,y.jsx)(B,{children:"Suggested Price"}),(0,y.jsx)(S,{children:e.suggested_price?(0,u.vv)(e.suggested_price,s):"-"})]})]}),(e.prep_time||e.cook_time)&&(0,y.jsxs)($,{children:[e.prep_time&&(0,y.jsxs)(L,{children:[(0,y.jsx)("span",{children:"Prep:"}),(0,y.jsxs)("strong",{children:[e.prep_time," min"]})]}),e.cook_time&&(0,y.jsxs)(L,{children:[(0,y.jsx)("span",{children:"Cook:"}),(0,y.jsxs)("strong",{children:[e.cook_time," min"]})]}),e.prep_time&&e.cook_time&&(0,y.jsxs)(L,{children:[(0,y.jsx)("span",{children:"Total:"}),(0,y.jsxs)("strong",{children:[e.prep_time+e.cook_time," min"]})]})]}),e.instructions_summary&&(0,y.jsx)(T,{children:e.instructions_summary}),e.recipeIngredients&&e.recipeIngredients.length>0&&(0,y.jsxs)(z,{children:[(0,y.jsxs)(I,{children:[e.recipeIngredients.length," ingredient",e.recipeIngredients.length>1?"s":""]}),(0,y.jsxs)(R,{children:[e.recipeIngredients.slice(0,4).map((e,i)=>{var t;return(0,y.jsx)(D,{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`},i)}),e.recipeIngredients.length>4&&(0,y.jsxs)(D,{children:["+",e.recipeIngredients.length-4," more"]})]})]}),(0,y.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,y.jsx)(q,{onClick:()=>(e=>{Me(e),Oe(!0)})(e),children:"Recipe"}),(0,y.jsx)(q,{variant:"primary",onClick:()=>ii(e),children:"Edit"}),(0,y.jsx)(q,{variant:"danger",onClick:()=>(async e=>{if(window.confirm(`Delete "${e.name}"? This action cannot be undone.`))try{const i=await(0,h.ff)(`/api/product-recipes/${e.id}`,{method:"DELETE"});i.success?Ge():console.error("Failed to delete recipe:",i.error)}catch(i){console.error("Failed to delete recipe:",i)}})(e),children:"Delete"})]})]},e.id)})}),(0,y.jsxs)(c.aF,{isOpen:De,onClose:()=>$e(!1),title:Xe?"Recipe Details":Le?"Edit Recipe":"Add Recipe",size:"large",children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsxs)(c.lR,{children:["Recipe Name ",!Xe&&"*"]}),(0,y.jsx)(c.ZQ,{value:Qe.name,onChange:e=>Ye({...Qe,name:e.target.value}),placeholder:"e.g., Grilled Chicken",disabled:Xe})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Category"}),(0,y.jsxs)(c.FX,{value:Qe.category_id,onChange:e=>Ye({...Qe,category_id:e.target.value}),disabled:Xe,children:[(0,y.jsx)("option",{value:"",children:"Select Category"}),Ce.map(e=>(0,y.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),!Xe&&(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Emoji Icon"}),(0,y.jsx)(ee,{children:["\ud83c\udf56","\ud83c\udf72","\ud83c\udf5a","\ud83e\udd53","\ud83c\udf5c","\ud83c\udf57","\ud83e\udd5f","\ud83e\udd58","\ud83c\udf63","\ud83c\udf64","\ud83c\udf54","\ud83c\udf5f","\ud83c\udf5d","\ud83e\udd57","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf55","\ud83c\udf5e","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83e\udd69","\ud83c\udf59","\ud83c\udf58","\ud83c\udf65","\ud83c\udf62","\ud83c\udf60","\ud83e\udd60","\ud83e\uddc6","\u2615","\ud83c\udf75","\ud83e\udd64","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd5b","\ud83e\uddc3","\ud83e\uddcb","\ud83c\udf79","\ud83c\udf78","\ud83c\udf76","\ud83e\udd43","\ud83c\udf7e","\ud83e\uddc9","\ud83e\uded6","\ud83c\udf7c","\ud83e\uddca","\ud83c\udf70","\ud83c\udf68","\ud83c\udf61","\ud83c\udf6e","\ud83c\udf69","\ud83c\udf6a","\ud83e\uddc1","\ud83c\udf6b","\ud83c\udf6c","\ud83e\udd67","\ud83c\udf6d","\ud83c\udf6f","\ud83e\udd6e","\ud83c\udf66","\ud83c\udf67","\ud83c\udf82","\ud83e\udd5c","\ud83c\udf30","\ud83e\udd65","\ud83c\udf53","\ud83c\udf47","\ud83c\udf48","\ud83c\udf49","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf4c","\ud83c\udf4d","\ud83e\udd6d","\ud83c\udf4e","\ud83c\udf4f","\ud83c\udf50","\ud83c\udf51","\ud83c\udf52","\ud83e\udd5d","\ud83c\udf45","\ud83e\udd51","\ud83c\udf36\ufe0f","\ud83e\udd52","\ud83e\udd6c","\ud83e\udd66","\ud83e\uddc4","\ud83e\uddc5","\ud83c\udf3d","\ud83e\udd55","\ud83e\udd54","\ud83c\udf44","\ud83d\udccb"].map(e=>(0,y.jsx)(ie,{type:"button",selected:Qe.emoji===e,onClick:()=>Ye({...Qe,emoji:e}),children:e},e))})]}),!Xe&&(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Recipe Image"}),(0,y.jsx)(p.A,{value:Qe.image,onChange:e=>Ye({...Qe,image:e}),label:"Drop recipe image here or click to upload"})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Description"}),(0,y.jsx)(c.Lz,{value:Qe.description,onChange:e=>Ye({...Qe,description:e.target.value}),placeholder:"Brief description of the recipe",rows:2,disabled:Xe})]}),(0,y.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px"},children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Prep Time (min)"}),(0,y.jsx)(c.ZQ,{type:"number",min:"0",value:Qe.prep_time,onChange:e=>Ye({...Qe,prep_time:e.target.value}),disabled:Xe})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Cook Time (min)"}),(0,y.jsx)(c.ZQ,{type:"number",min:"0",value:Qe.cook_time,onChange:e=>Ye({...Qe,cook_time:e.target.value}),disabled:Xe})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsxs)(c.lR,{children:["Suggested Price (",s,")"]}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:Qe.suggested_price,onChange:e=>Ye({...Qe,suggested_price:e.target.value}),disabled:Xe})]})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Recipe Summary"}),(0,y.jsx)(c.Lz,{value:Qe.instructions_summary,onChange:e=>Ye({...Qe,instructions_summary:e.target.value}),placeholder:"Brief summary for list display (e.g., Pan-fried chicken with garlic sauce)",rows:2,disabled:Xe})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Detailed Instructions"}),(0,y.jsx)(c.Lz,{value:Qe.instructions_detail,onChange:e=>Ye({...Qe,instructions_detail:e.target.value}),placeholder:"Step-by-step cooking instructions...\n1. Prepare ingredients...\n2. Heat the pan...\n3. ...",rows:6,disabled:Xe})]}),(0,y.jsx)(Q,{children:"Yield (Production Amount)"}),(0,y.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"16px"},children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Yield Amount *"}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0.01",value:Qe.yield_amount,onChange:e=>Ye({...Qe,yield_amount:e.target.value}),placeholder:"e.g., 10",disabled:Xe})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Yield Unit *"}),(0,y.jsx)(c.FX,{value:Qe.yield_unit,onChange:e=>Ye({...Qe,yield_unit:e.target.value}),disabled:Xe,children:m._W.map(e=>(0,y.jsx)("option",{value:e.value,children:e.label},e.value))})]})]}),(0,y.jsx)(Q,{children:"Ingredients"}),!Xe&&(0,y.jsx)(H,{onClick:()=>{He([...We,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),We.length>0&&(0,y.jsxs)(Y,{children:[(0,y.jsxs)(Z,{children:[(0,y.jsx)("span",{children:"Ingredient"}),(0,y.jsx)("span",{children:"Quantity"}),(0,y.jsx)("span",{children:"Unit"}),(0,y.jsx)("span",{children:"Notes"}),!Xe&&(0,y.jsx)("span",{})]}),We.map((e,i)=>{const t=ke.find(i=>i.id===e.ingredient_id);return(0,y.jsxs)(J,{style:Xe?{gridTemplateColumns:"3fr 1fr 0.7fr 2fr"}:void 0,children:[Xe?(0,y.jsx)(c.ZQ,{value:(null===t||void 0===t?void 0:t.name)||"",disabled:!0}):(0,y.jsx)(x.A,{options:ke.map(e=>{const i=e.unit_cost/(e.base_quantity||1);return{value:e.id,label:e.name,subLabel:`${(0,u.Qn)(s)} ${i.toFixed(2)}/${e.unit}`}}),value:e.ingredient_id||null,onChange:e=>ni(i,"ingredient_id",e),placeholder:"Search ingredient...",disabled:Xe}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",placeholder:"Qty",value:e.quantity,onChange:e=>ni(i,"quantity",e.target.value),disabled:Xe}),(0,y.jsx)(c.ZQ,{value:e.unit,disabled:!0,style:{background:"#F3F4F6",color:"#6B7280"}}),(0,y.jsx)(c.ZQ,{value:e.notes,onChange:e=>ni(i,"notes",e.target.value),placeholder:"Notes",disabled:Xe}),!Xe&&(0,y.jsx)(W,{onClick:()=>(e=>{He(We.filter((i,t)=>t!==e))})(i),children:"\xd7"})]},i)})]}),(0,y.jsxs)(X,{children:[(0,y.jsx)(V,{children:"Total Ingredient Cost"}),(0,y.jsx)(K,{children:(0,u.vv)(ri(),s)})]}),(0,y.jsxs)(X,{style:{marginTop:"8px"},children:[(0,y.jsxs)(V,{children:["Cost per ",Qe.yield_unit]}),(0,y.jsx)(K,{children:(0,u.vv)((0,m.zQ)(ri(),parseFloat(Qe.yield_amount)||1,Qe.yield_unit).cost,s)})]}),Ze&&(0,y.jsx)(c.IM,{children:Ze}),(0,y.jsxs)(G,{children:[(0,y.jsx)(c.yl,{variant:"secondary",onClick:()=>$e(!1),children:Xe?"Close":"Cancel"}),!Xe&&(0,y.jsx)(c.yl,{variant:"primary",onClick:async()=>{if(Je(null),Qe.name.trim())if(!Qe.yield_amount||parseFloat(Qe.yield_amount)<=0)Je("Yield amount must be greater than 0");else try{qe(!0);const e={name:Qe.name,description:Qe.description||null,category_id:Qe.category_id?parseInt(Qe.category_id):null,emoji:Qe.emoji||null,image:Qe.image||null,yield_amount:parseFloat(Qe.yield_amount)||1,yield_unit:Qe.yield_unit||"portion",prep_time:Qe.prep_time?parseInt(Qe.prep_time):null,cook_time:Qe.cook_time?parseInt(Qe.cook_time):null,instructions_summary:Qe.instructions_summary||null,instructions_detail:Qe.instructions_detail||null,suggested_price:Qe.suggested_price?parseFloat(Qe.suggested_price):null,ingredients:We.filter(e=>e.ingredient_id&&e.quantity).map(e=>{const i=ke.find(i=>i.id===e.ingredient_id),t=i&&(0,m.jr)(i.unit_cost/(i.base_quantity||1),i.unit,parseFloat(e.quantity),e.unit)||0;return{ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,cost:t,notes:e.notes||null}})},i=Le?`/api/product-recipes/${Le.id}`:"/api/product-recipes",t=Le?"PUT":"POST",n=await(0,h.ff)(i,{method:t,body:JSON.stringify(e)});n.success?($e(!1),Je(null),Ge()):Je(n.error||"Failed to save recipe")}catch(e){console.error("Failed to save recipe:",e),Je("Failed to save recipe")}finally{qe(!1)}else Je("Recipe name is required")},disabled:Ne,children:Ne?"Saving...":"Save Recipe"})]})]}),Pe&&Ue&&(0,y.jsx)(te,{onClick:ti,children:(0,y.jsxs)(ne,{onClick:e=>e.stopPropagation(),children:[(0,y.jsxs)(re,{children:[(0,y.jsx)(oe,{children:Ue.name}),(0,y.jsx)(se,{onClick:ti,children:"\xd7"})]}),(0,y.jsxs)(ae,{children:[(Ue.prep_time||Ue.cook_time)&&(0,y.jsxs)(de,{children:[Ue.prep_time&&(0,y.jsxs)(le,{children:[(0,y.jsx)(ce,{children:"\u23f1"}),(0,y.jsx)(pe,{children:"Prep:"}),(0,y.jsxs)(xe,{children:[Ue.prep_time," min"]})]}),Ue.cook_time&&(0,y.jsxs)(le,{children:[(0,y.jsx)(ce,{children:"\ud83d\udd25"}),(0,y.jsx)(pe,{children:"Cook:"}),(0,y.jsxs)(xe,{children:[Ue.cook_time," min"]})]})]}),Ue.recipeIngredients&&Ue.recipeIngredients.length>0&&(0,y.jsxs)(ge,{children:[(0,y.jsx)(ue,{children:"Ingredients"}),(0,y.jsx)(he,{children:Ue.recipeIngredients.map((e,i)=>{var t;return(0,y.jsxs)(me,{children:[(0,y.jsx)(ye,{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`}),(0,y.jsxs)(fe,{children:[Number(e.quantity).toFixed(2)," ",e.unit]})]},i)})})]}),Ue.instructions_summary&&(0,y.jsxs)(ge,{children:[(0,y.jsx)(ue,{children:"Summary"}),(0,y.jsx)(je,{children:Ue.instructions_summary})]}),Ue.instructions_detail&&(0,y.jsxs)(ge,{children:[(0,y.jsx)(ue,{children:"Detailed Instructions"}),(0,y.jsx)(ve,{children:Ue.instructions_detail})]})]})]})})]})};var Fe=t(7617);const _e=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,ke=r.Ay.div`
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
`,Ae=r.Ay.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
`,Ce=r.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,we=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,Ee=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,Be=r.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Se=(r.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  background: #D1FAE5;
  color: #065F46;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`,r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-top: 12px;
`),ze=r.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`,Ie=r.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
`,Re=r.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
`,De=r.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E6EBF1;
  transition: 0.3s;
  border-radius: 22px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  ${Re}:checked + & {
    background-color: #635BFF;
  }

  ${Re}:checked + &:before {
    transform: translateX(22px);
  }
`,$e=r.Ay.div`
  margin: 12px 0;
`,Le=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,Te=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,Ne=r.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,qe=r.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,Pe=r.Ay.button`
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
`,Oe=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,Ue=r.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,Me=r.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,Qe=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,Ye=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,Ze=r.Ay.div`
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
`,Je=r.Ay.div`
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`,We=r.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"out"===e.status?"#FEE2E2":"low"===e.status?"#FEF3C7":"#ECFDF5"};
  color: ${e=>"out"===e.status?"#DC2626":"low"===e.status?"#D97706":"#059669"};
`,He=e=>{let{onCountChange:i,categoryRefreshKey:t}=e;const{defaultCurrency:r}=(0,g.i1)(),[o,s]=(0,n.useState)("RM"),[a,p]=(0,n.useState)([]),[x,m]=(0,n.useState)([]),[f,j]=(0,n.useState)(!0),[v,b]=(0,n.useState)(""),[F,_]=(0,n.useState)("all"),[k,A]=(0,n.useState)(!1),[C,w]=(0,n.useState)(null),[E,B]=(0,n.useState)(!1),[S,z]=(0,n.useState)({isOpen:!1,ingredientId:null,ingredientName:""}),[I,R]=(0,n.useState)({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0});(0,n.useEffect)(()=>{r&&s(r)},[r]);const D=(0,n.useCallback)(async()=>{try{j(!0);const[t,n]=await Promise.all([(0,h.ff)("/api/product-ingredients"),(0,h.ff)("/api/product-ingredient-categories")]);var e;if(t.success)p(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0);n.success&&m(n.data||[])}catch(t){console.error("Failed to fetch data:",t)}finally{j(!1)}},[i]);(0,n.useEffect)(()=>{D()},[D,t]);const $=e=>{var i;e?(w(e),R({name:e.name,category_id:(null===(i=e.category_id)||void 0===i?void 0:i.toString())||"",image_url:e.image_url||"",unit:e.unit,base_quantity:e.base_quantity.toString(),unit_cost:e.unit_cost.toString(),supplier_name:e.supplier_name||"",min_stock:e.min_stock.toString(),min_order:e.min_order.toString(),current_stock:e.current_stock.toString(),track_stock:e.track_stock})):(w(null),R({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0}));A(!0)},L=()=>{A(!1),w(null),R({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0})},T=e=>e.track_stock?e.current_stock<=0?"out":e.current_stock<=e.min_stock?"low":"normal":"normal",N=a.filter(e=>{var i;const t=e.name.toLowerCase().includes(v.toLowerCase())||e.code.toLowerCase().includes(v.toLowerCase()),n="all"===F||(null===(i=e.category_id)||void 0===i?void 0:i.toString())===F;return t&&n}),q=[{id:"all",name:"All Categories"},...x.map(e=>({id:e.id.toString(),name:e.name}))];return f?(0,y.jsx)(Ue,{children:(0,y.jsx)(Me,{children:"Loading..."})}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(Ye,{children:[(0,y.jsxs)(l.Qn,{style:{marginBottom:0,flex:1},children:[(0,y.jsx)(l.DO,{type:"text",placeholder:"Search ingredients...",value:v,onChange:e=>b(e.target.value)}),(0,y.jsx)(l.Jt,{value:F,onChange:e=>_(e.target.value),children:q.map(e=>(0,y.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,y.jsx)(d.cc,{variant:"primary",onClick:()=>$(),style:{whiteSpace:"nowrap"},children:"New Ingredient"})]}),0===N.length?(0,y.jsxs)(Ue,{children:[(0,y.jsx)(Me,{children:"No ingredients found"}),(0,y.jsx)(Qe,{children:v||"all"!==F?"Try adjusting your filters":"Add ingredients to use in your product recipes"}),!v&&"all"===F&&(0,y.jsx)(d.cc,{variant:"primary",onClick:()=>$(),children:"Create First Ingredient"})]}):(0,y.jsx)(_e,{children:N.map(e=>{var i,t;return(0,y.jsxs)(ke,{isActive:e.is_active,children:[e.image_url&&(0,y.jsx)(Ae,{children:(0,y.jsx)(Ce,{src:e.image_url,alt:e.name})}),(0,y.jsx)(we,{children:(0,y.jsxs)("div",{children:[(0,y.jsx)(Ee,{children:e.name}),(0,y.jsxs)(Be,{children:[null===(i=e.category)||void 0===i?void 0:i.emoji," ",(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized"]})]})}),(0,y.jsxs)($e,{children:[(0,y.jsxs)(Le,{children:[(0,y.jsx)(Te,{children:"Unit Cost"}),(0,y.jsx)(Ne,{children:(0,u.vv)(Number(e.unit_cost),o)})]}),(0,y.jsxs)(Le,{children:[(0,y.jsx)(Te,{children:"Base Qty / Unit"}),(0,y.jsxs)(Ne,{children:[Number(e.base_quantity||1)," ",e.unit]})]}),e.supplier_name&&(0,y.jsxs)(Le,{children:[(0,y.jsx)(Te,{children:"Supplier"}),(0,y.jsx)(Ne,{children:e.supplier_name})]}),e.code&&(0,y.jsxs)(Le,{children:[(0,y.jsx)(Te,{children:"Code"}),(0,y.jsx)(Ne,{children:e.code})]}),e.track_stock&&(0,y.jsxs)(Le,{children:[(0,y.jsx)(Te,{children:"Stock"}),(0,y.jsxs)(We,{status:T(e),children:[e.current_stock," ",e.unit]})]})]}),(0,y.jsxs)(Se,{children:[(0,y.jsx)(ze,{children:"Track in Inventory"}),(0,y.jsxs)(Ie,{children:[(0,y.jsx)(Re,{type:"checkbox",checked:e.track_stock||!1,onChange:i=>{i.stopPropagation(),(async(e,i)=>{try{const t=await(0,h.ff)(`/api/product-ingredients/${e.id}`,{method:"PUT",body:JSON.stringify({name:e.name,category_id:e.category_id,image_url:e.image_url,unit:e.unit,base_quantity:e.base_quantity,unit_cost:e.unit_cost,supplier_name:e.supplier_name,min_stock:e.min_stock,min_order:e.min_order,current_stock:e.current_stock,is_active:e.is_active,track_stock:i})});t.success?p(t=>t.map(t=>t.id===e.id?{...t,track_stock:i}:t)):alert(t.error||"Failed to update track stock")}catch(t){console.error("Failed to toggle track stock:",t)}})(e,i.target.checked)}}),(0,y.jsx)(De,{})]})]}),(0,y.jsxs)(qe,{children:[(0,y.jsx)(Pe,{variant:"secondary",onClick:()=>$(e),children:"Edit"}),(0,y.jsx)(Pe,{variant:"danger",onClick:()=>(e=>{z({isOpen:!0,ingredientId:e.id,ingredientName:e.name})})(e),children:"Delete"})]})]},e.id)})}),(0,y.jsx)(c.aF,{isOpen:k,onClose:L,title:C?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,y.jsxs)("form",{onSubmit:e=>{e.preventDefault(),(async()=>{if(I.name.trim()&&I.unit.trim())try{B(!0);const e=C?`/api/product-ingredients/${C.id}`:"/api/product-ingredients",i=C?"PUT":"POST",t=await(0,h.ff)(e,{method:i,body:JSON.stringify({name:I.name,category_id:I.category_id?parseInt(I.category_id):null,image_url:I.image_url||null,unit:I.unit,base_quantity:parseFloat(I.base_quantity)||1,unit_cost:parseFloat(I.unit_cost)||0,supplier_name:I.supplier_name||null,min_stock:parseFloat(I.min_stock)||0,min_order:parseFloat(I.min_order)||0,current_stock:parseFloat(I.current_stock)||0,track_stock:I.track_stock})});t.success?(L(),D()):alert(t.error||"Failed to save ingredient")}catch(e){console.error("Failed to save ingredient:",e),alert("Failed to save ingredient")}finally{B(!1)}else alert("Name and Unit are required")})()},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Image"}),(0,y.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{var i;const t=null===(i=e.target.files)||void 0===i?void 0:i[0];if(t){const e=new FileReader;e.onloadend=()=>{R({...I,image_url:e.result})},e.readAsDataURL(t)}},style:{display:"none"},id:"ingredient-image-upload"}),(0,y.jsx)(Ze,{onClick:()=>{var e;return null===(e=document.getElementById("ingredient-image-upload"))||void 0===e?void 0:e.click()},children:I.image_url?(0,y.jsx)("img",{src:I.image_url,alt:"Ingredient"}):(0,y.jsx)(Je,{children:"Click to upload image"})})]}),(0,y.jsxs)(c.fh,{children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Ingredient Name *"}),(0,y.jsx)(c.ZQ,{type:"text",value:I.name,onChange:e=>R({...I,name:e.target.value}),placeholder:"e.g., Chicken Breast",required:!0})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Category"}),(0,y.jsxs)(c.FX,{value:I.category_id,onChange:e=>R({...I,category_id:e.target.value}),children:[(0,y.jsx)("option",{value:"",children:"Select category..."}),x.map(e=>(0,y.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]})]}),(0,y.jsxs)(c.fh,{children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Base Quantity *"}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0.01",value:I.base_quantity,onChange:e=>R({...I,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Unit *"}),(0,y.jsxs)(c.FX,{value:I.unit,onChange:e=>R({...I,unit:e.target.value}),required:!0,children:[(0,y.jsx)("option",{value:"",children:"Select unit..."}),(0,y.jsx)("option",{value:"kg",children:"kg"}),(0,y.jsx)("option",{value:"g",children:"g"}),(0,y.jsx)("option",{value:"L",children:"L"}),(0,y.jsx)("option",{value:"ml",children:"ml"}),(0,y.jsx)("option",{value:"piece",children:"piece"}),(0,y.jsx)("option",{value:"pack",children:"pack"}),(0,y.jsx)("option",{value:"can",children:"can"}),(0,y.jsx)("option",{value:"bottle",children:"bottle"})]})]})]}),(0,y.jsxs)(c.fh,{children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsxs)(c.lR,{children:["Unit Cost (",o,") *"]}),(0,y.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:I.unit_cost,onChange:e=>R({...I,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Supplier"}),(0,y.jsx)(c.ZQ,{type:"text",value:I.supplier_name,onChange:e=>R({...I,supplier_name:e.target.value}),placeholder:"Supplier name"})]})]}),(0,y.jsxs)(Oe,{children:[(0,y.jsx)(c.yl,{type:"button",variant:"secondary",onClick:L,children:"Cancel"}),(0,y.jsx)(c.yl,{type:"submit",variant:"primary",disabled:E,children:E?"Saving...":C?"Update Ingredient":"Create Ingredient"})]})]})}),(0,y.jsx)(Fe.A,{isOpen:S.isOpen,title:"Delete Ingredient",message:`Are you sure you want to delete "${S.ingredientName}"? This action cannot be undone.`,onConfirm:async()=>{if(S.ingredientId)try{const e=await(0,h.ff)(`/api/product-ingredients/${S.ingredientId}`,{method:"DELETE"});e.success?D():alert(e.error||"Failed to delete ingredient")}catch(e){console.error("Failed to delete ingredient:",e),alert("Failed to delete ingredient")}finally{z({isOpen:!1,ingredientId:null,ingredientName:""})}},onCancel:()=>{z({isOpen:!1,ingredientId:null,ingredientName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},Xe=r.Ay.div`
  padding: 24px 0;
`,Ve=r.Ay.div`
  display: grid;
  gap: 12px;
`,Ke=r.Ay.div`
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
`,Ge=r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,ei=r.Ay.div`
  flex: 1;
`,ii=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,ti=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,ni=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,ri=r.Ay.div`
  display: flex;
  gap: 8px;
`,oi=r.Ay.button`
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
`,si=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ai=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,di=r.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,li=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,ci=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,pi=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,xi=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,gi=r.Ay.button`
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
`,ui=e=>{let{onCountChange:i,onCategoryChange:t}=e;const[r,o]=(0,n.useState)([]),[a,l]=(0,n.useState)(!0),[p,x]=(0,n.useState)(!1),[g,u]=(0,n.useState)(null),[m,f]=(0,n.useState)(!1),[j,v]=(0,n.useState)(!1),[b,F]=(0,n.useState)(null),[_,k]=(0,n.useState)({name:"",emoji:"",description:""}),A=(0,n.useCallback)(async()=>{try{l(!0);const t=await(0,h.ff)("/api/product-recipe-categories");var e;if(t.success)o(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{l(!1)}},[i]);(0,n.useEffect)(()=>{A()},[A]);const C=e=>{e?(u(e),k({name:e.name,emoji:e.emoji||"",description:e.description||""})):(u(null),k({name:"",emoji:"",description:""})),x(!0)},w=()=>{x(!1),u(null),k({name:"",emoji:"",description:""})},E=async e=>{if(e.preventDefault(),_.name.trim())try{f(!0);const e=g?`/api/product-recipe-categories/${g.id}`:"/api/product-recipe-categories",i=g?"PUT":"POST",n=await(0,h.ff)(e,{method:i,body:JSON.stringify({name:_.name.trim(),emoji:_.emoji||null,description:_.description.trim()||null})});n.success?(w(),A(),null===t||void 0===t||t()):alert(n.error||"Failed to save category")}catch(i){console.error("Failed to save category:",i),alert("Failed to save category")}finally{f(!1)}},B=async(e,i)=>{const t="up"===i?e-1:e+1;if(t<0||t>=r.length)return;const n=[...r];[n[e],n[t]]=[n[t],n[e]];const o=n.map((e,i)=>({id:e.id,display_order:i}));try{await(0,h.ff)("/api/product-recipe-categories/reorder",{method:"PUT",body:JSON.stringify({orders:o})}),A()}catch(s){console.error("Failed to reorder:",s)}};return a?(0,y.jsx)(Xe,{children:(0,y.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,y.jsxs)(Xe,{children:[(0,y.jsxs)(ci,{children:[(0,y.jsx)(pi,{children:"Recipe Categories"}),(0,y.jsx)(d.cc,{variant:"primary",onClick:()=>C(),children:"Add Category"})]}),0===r.length?(0,y.jsxs)(ai,{children:[(0,y.jsx)(di,{children:"No categories yet"}),(0,y.jsx)(li,{children:"Create categories to organize your product recipes"}),(0,y.jsx)(d.cc,{variant:"primary",onClick:()=>C(),children:"Add First Category"})]}):(0,y.jsx)(Ve,{children:r.map((e,i)=>(0,y.jsxs)(Ke,{isActive:e.is_active,children:[(0,y.jsx)(s.Xd,{onMoveUp:()=>B(i,"up"),onMoveDown:()=>B(i,"down"),disableUp:0===i,disableDown:i===r.length-1}),e.emoji&&(0,y.jsx)(Ge,{children:e.emoji}),(0,y.jsxs)(ei,{children:[(0,y.jsx)(ii,{children:e.name}),(0,y.jsxs)(ti,{children:[(0,y.jsxs)("span",{children:[e.recipe_count||0," recipes"]}),(0,y.jsx)(si,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,y.jsx)(ni,{children:e.description})]}),(0,y.jsxs)(ri,{children:[(0,y.jsx)(oi,{onClick:()=>C(e),title:"Edit",children:(0,y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,y.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,y.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,y.jsx)(oi,{onClick:()=>(async e=>{try{(await(0,h.ff)(`/api/product-recipe-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&A()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,y.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,y.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,y.jsx)(oi,{onClick:()=>(e=>{F(e),v(!0)})(e),title:"Delete",disabled:(e.recipe_count||0)>0,children:(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,y.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,y.jsx)(c.aF,{isOpen:p,onClose:w,title:(g?"Edit":"New")+" Recipe Category",size:"medium",footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(c.yl,{variant:"secondary",onClick:w,children:"Cancel"}),(0,y.jsx)(c.yl,{variant:"primary",onClick:E,disabled:!_.name.trim()||m,children:m?"Saving...":g?"Update":"Create"})]}),children:(0,y.jsxs)("form",{onSubmit:E,children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Category Name *"}),(0,y.jsx)(c.ZQ,{type:"text",value:_.name,onChange:e=>k({..._,name:e.target.value}),placeholder:"e.g., Main Dishes",autoFocus:!0,required:!0})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Icon"}),(0,y.jsx)(xi,{children:["\ud83c\udf54","\ud83c\udf55","\ud83c\udf57","\ud83e\udd57","\ud83c\udf5c","\ud83c\udf5d","\ud83c\udf64","\ud83e\udd58","\ud83c\udf5b","\ud83c\udf72","\u2615","\ud83e\udd64","\ud83e\uddc3","\ud83c\udf75","\ud83e\uddcb","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd43","\ud83c\udf79","\ud83c\udf78","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf68","\ud83c\udf67","\ud83c\udf66","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6b","\ud83e\udd50","\ud83e\udd56","\ud83c\udf5e","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf71","\ud83c\udf59","\ud83c\udf58","\ud83c\udf63","\ud83c\udf65","\ud83c\udf61","\ud83c\udf62","\ud83c\udf60","\ud83e\udd5f","\ud83e\udd60","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf5f","\ud83e\uded3","\ud83e\udd53","\ud83e\uddc6"].map(e=>(0,y.jsx)(gi,{selected:_.emoji===e,onClick:()=>k({..._,emoji:e}),type:"button",children:e},e))})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Description"}),(0,y.jsx)(c.Lz,{value:_.description,onChange:e=>k({..._,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,y.jsx)(Fe.A,{isOpen:j,onCancel:()=>{v(!1),F(null)},onConfirm:async()=>{if(b)try{const e=await(0,h.ff)(`/api/product-recipe-categories/${b.id}`,{method:"DELETE"});e.success?(v(!1),F(null),A(),null===t||void 0===t||t()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:b?`Are you sure you want to delete "${b.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},hi=r.Ay.div`
  padding: 24px 0;
`,mi=r.Ay.div`
  display: grid;
  gap: 12px;
`,yi=r.Ay.div`
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
`,fi=r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,ji=r.Ay.div`
  flex: 1;
`,vi=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,bi=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,Fi=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,_i=r.Ay.div`
  display: flex;
  gap: 8px;
`,ki=r.Ay.button`
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
`,Ai=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,Ci=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,wi=r.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Ei=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,Bi=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,Si=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,zi=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,Ii=r.Ay.button`
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
`,Ri=e=>{let{onCountChange:i,onCategoryChange:t}=e;const[r,o]=(0,n.useState)([]),[a,l]=(0,n.useState)(!0),[p,x]=(0,n.useState)(!1),[g,u]=(0,n.useState)(null),[m,f]=(0,n.useState)(!1),[j,v]=(0,n.useState)(!1),[b,F]=(0,n.useState)(null),[_,k]=(0,n.useState)({name:"",emoji:"",description:""}),A=(0,n.useCallback)(async()=>{try{l(!0);const t=await(0,h.ff)("/api/product-ingredient-categories");var e;if(t.success)o(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{l(!1)}},[i]);(0,n.useEffect)(()=>{A()},[A]);const C=e=>{e?(u(e),k({name:e.name,emoji:e.emoji||"",description:e.description||""})):(u(null),k({name:"",emoji:"",description:""})),x(!0)},w=()=>{x(!1),u(null),k({name:"",emoji:"",description:""})},E=async e=>{if(e.preventDefault(),_.name.trim())try{f(!0);const e=g?`/api/product-ingredient-categories/${g.id}`:"/api/product-ingredient-categories",i=g?"PUT":"POST",n=await(0,h.ff)(e,{method:i,body:JSON.stringify({name:_.name.trim(),emoji:_.emoji||null,description:_.description.trim()||null})});n.success?(w(),A(),null===t||void 0===t||t()):alert(n.error||"Failed to save category")}catch(i){console.error("Failed to save category:",i),alert("Failed to save category")}finally{f(!1)}},B=async(e,i)=>{const t="up"===i?e-1:e+1;if(t<0||t>=r.length)return;const n=[...r];[n[e],n[t]]=[n[t],n[e]];const o=n.map((e,i)=>({id:e.id,display_order:i}));try{await(0,h.ff)("/api/product-ingredient-categories/reorder",{method:"PUT",body:JSON.stringify({orders:o})}),A()}catch(s){console.error("Failed to reorder:",s)}};return a?(0,y.jsx)(hi,{children:(0,y.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,y.jsxs)(hi,{children:[(0,y.jsxs)(Bi,{children:[(0,y.jsx)(Si,{children:"Ingredient Categories"}),(0,y.jsx)(d.cc,{variant:"primary",onClick:()=>C(),children:"Add Category"})]}),0===r.length?(0,y.jsxs)(Ci,{children:[(0,y.jsx)(wi,{children:"No categories yet"}),(0,y.jsx)(Ei,{children:"Create categories to organize your ingredients"}),(0,y.jsx)(d.cc,{variant:"primary",onClick:()=>C(),children:"Add First Category"})]}):(0,y.jsx)(mi,{children:r.map((e,i)=>(0,y.jsxs)(yi,{isActive:e.is_active,children:[(0,y.jsx)(s.Xd,{onMoveUp:()=>B(i,"up"),onMoveDown:()=>B(i,"down"),disableUp:0===i,disableDown:i===r.length-1}),e.emoji&&(0,y.jsx)(fi,{children:e.emoji}),(0,y.jsxs)(ji,{children:[(0,y.jsx)(vi,{children:e.name}),(0,y.jsxs)(bi,{children:[(0,y.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),(0,y.jsx)(Ai,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,y.jsx)(Fi,{children:e.description})]}),(0,y.jsxs)(_i,{children:[(0,y.jsx)(ki,{onClick:()=>C(e),title:"Edit",children:(0,y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,y.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,y.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,y.jsx)(ki,{onClick:()=>(async e=>{try{(await(0,h.ff)(`/api/product-ingredient-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&A()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,y.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,y.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,y.jsx)(ki,{onClick:()=>(e=>{F(e),v(!0)})(e),title:"Delete",disabled:(e.ingredient_count||0)>0,children:(0,y.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,y.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,y.jsx)(c.aF,{isOpen:p,onClose:w,title:(g?"Edit":"New")+" Ingredient Category",size:"medium",footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(c.yl,{variant:"secondary",onClick:w,children:"Cancel"}),(0,y.jsx)(c.yl,{variant:"primary",onClick:E,disabled:!_.name.trim()||m,children:m?"Saving...":g?"Update":"Create"})]}),children:(0,y.jsxs)("form",{onSubmit:E,children:[(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Category Name *"}),(0,y.jsx)(c.ZQ,{type:"text",value:_.name,onChange:e=>k({..._,name:e.target.value}),placeholder:"e.g., Proteins",autoFocus:!0,required:!0})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Icon"}),(0,y.jsx)(zi,{children:["\ud83e\udd69","\ud83c\udf56","\ud83e\udd53","\ud83c\udf57","\ud83e\udd90","\ud83e\udd9e","\ud83e\udd80","\ud83d\udc1f","\ud83e\udd5a","\ud83e\uddc0","\ud83e\udd6c","\ud83e\udd66","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83e\udd52","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83c\udf4e","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd5d","\ud83c\udf4c","\ud83e\udd6d","\ud83c\udf4d","\ud83e\uddc8","\ud83e\udd5b","\ud83e\uddc2","\ud83c\udf6f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5a","\ud83c\udf5d","\ud83e\udd6b","\ud83e\uddca","\ud83d\udca7","\ud83c\udf76","\ud83e\uded7","\ud83e\uddf4","\ud83e\uddf9","\ud83e\uddfd","\ud83d\udce6","\ud83c\udff7\ufe0f","\ud83d\udd16"].map(e=>(0,y.jsx)(Ii,{selected:_.emoji===e,onClick:()=>k({..._,emoji:e}),type:"button",children:e},e))})]}),(0,y.jsxs)(c.gE,{children:[(0,y.jsx)(c.lR,{children:"Description"}),(0,y.jsx)(c.Lz,{value:_.description,onChange:e=>k({..._,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,y.jsx)(Fe.A,{isOpen:j,onCancel:()=>{v(!1),F(null)},onConfirm:async()=>{if(b)try{const e=await(0,h.ff)(`/api/product-ingredient-categories/${b.id}`,{method:"DELETE"});e.success?(v(!1),F(null),A(),null===t||void 0===t||t()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:b?`Are you sure you want to delete "${b.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},Di=r.Ay.span`
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
`,$i=()=>{const{user:e}=(0,a.As)(),[i,t]=(0,o.ok)(),[r,d]=(0,n.useState)(0),[l,c]=(0,n.useState)(0),[p,x]=(0,n.useState)(0),[g,u]=(0,n.useState)(0),[h,m]=(0,n.useState)(0),[f,j]=(0,n.useState)(0),v=i.get("tab")||"recipes",b=null===e||void 0===e?void 0:e.brand_id,F=e=>{t({tab:e})};return b?(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(s.mc,{children:[(0,y.jsx)(s.Y9,{children:(0,y.jsx)(s.hE,{children:"Product Recipes"})}),(0,y.jsxs)(s.UC,{children:[(0,y.jsxs)(s.j,{children:[(0,y.jsxs)(s.oz,{active:"recipes"===v,onClick:()=>F("recipes"),children:["Recipes",(0,y.jsx)(Di,{children:r})]}),(0,y.jsxs)(s.oz,{active:"ingredients"===v,onClick:()=>F("ingredients"),children:["Ingredients",(0,y.jsx)(Di,{children:l})]}),(0,y.jsxs)(s.oz,{active:"recipe-categories"===v,onClick:()=>F("recipe-categories"),children:["Recipe Categories",(0,y.jsx)(Di,{children:p})]}),(0,y.jsxs)(s.oz,{active:"ingredient-categories"===v,onClick:()=>F("ingredient-categories"),children:["Ingredient Categories",(0,y.jsx)(Di,{children:g})]})]}),(0,y.jsx)("div",{style:{display:"recipes"===v?"block":"none"},children:(0,y.jsx)(be,{onCountChange:d,categoryRefreshKey:f})}),(0,y.jsx)("div",{style:{display:"ingredients"===v?"block":"none"},children:(0,y.jsx)(He,{onCountChange:c,categoryRefreshKey:h})}),(0,y.jsx)("div",{style:{display:"recipe-categories"===v?"block":"none"},children:(0,y.jsx)(ui,{onCountChange:x,onCategoryChange:()=>j(e=>e+1)})}),(0,y.jsx)("div",{style:{display:"ingredient-categories"===v?"block":"none"},children:(0,y.jsx)(Ri,{onCountChange:u,onCategoryChange:()=>m(e=>e+1)})})]})]})}):(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(s.mc,{children:[(0,y.jsx)(s.Y9,{children:(0,y.jsx)(s.hE,{children:"Product Recipes"})}),(0,y.jsx)(s.UC,{children:(0,y.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Brand not found. Please log in with a brand account."})})]})})}}}]);