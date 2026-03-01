"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7121],{1840:(e,i,t)=>{t.d(i,{ff:()=>o});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const r="";n();async function o(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${r}${e}`,n=localStorage.getItem("auth_token"),o={credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...i.headers},...i},s=await fetch(t,o);if(!s.ok){const e=await s.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${s.status}`)}return s.json()}},7121:(e,i,t)=>{t.r(i),t.d(i,{default:()=>Di});var n=t(9950),r=t(4752),o=t(4492),s=t(2674),a=t(1367),d=t(8819),l=t(3705),c=t(2488),p=t(9610),x=t(4877),g=t(9194),u=t(4021),h=t(6038),m=t(1840),y=t(251),f=t(4414);const j=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,v=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${d.w.colors.border};
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>!1!==e.isActive?1:.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: ${d.w.colors.primary};
  }
`,b=r.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,k=r.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,_=r.Ay.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`,F=r.Ay.div`
  flex: 1;
  min-width: 0;
`,w=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${d.w.colors.secondary};
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
  color: ${d.w.colors.text.muted};
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,E=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,S=r.Ay.div``,$=r.Ay.div`
  font-size: 11px;
  color: ${d.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,z=r.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,B=r.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,I=r.Ay.div`
  font-size: 12px;
  color: ${d.w.colors.text.muted};
  margin-bottom: 8px;
`,R=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,L=r.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,D=r.Ay.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: ${d.w.colors.text.muted};
  margin: 8px 0;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
`,T=r.Ay.div`
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
`,N=r.Ay.div`
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
`,q=r.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,P=r.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return`\n          background: ${d.w.colors.primary};\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        `;case"danger":return`\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: ${d.w.colors.status.errorLightAlt};\n            transform: translateY(-1px);\n          }\n        `;default:return`\n          background: #F6F9FC;\n          border: 1px solid ${d.w.colors.border};\n          color: ${d.w.colors.text.muted};\n          &:hover {\n            border-color: ${d.w.colors.primary};\n            color: ${d.w.colors.primary};\n            background: #F4F3FF;\n            transform: translateY(-1px);\n          }\n        `}}}
`,O=r.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,U=r.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${d.w.colors.secondary};
  margin-bottom: 8px;
`,M=r.Ay.p`
  font-size: 14px;
  color: ${d.w.colors.text.muted};
  margin-bottom: 24px;
`,Q=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,Y=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${d.w.colors.secondary};
  margin: 8px 0;
`,Z=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,J=r.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  padding: 8px 0;
  margin-bottom: 8px;
  border-bottom: 1px solid ${d.w.colors.borderLight};

  span {
    font-size: 13px;
    font-weight: 600;
    color: ${d.w.colors.text.muted};
  }

  @media (max-width: 768px) {
    display: none;
  }
`,W=r.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,H=r.Ay.button`
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid ${d.w.colors.dangerBorder};
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
`,X=r.Ay.button`
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
`,V=r.Ay.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${d.w.colors.borderLight};
`,K=r.Ay.div`
  font-size: 14px;
  color: ${d.w.colors.text.muted};
  font-weight: 600;
`,G=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: ${d.w.colors.secondary};
`,ee=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,ie=(r.Ay.div`
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
  color: ${d.w.colors.text.muted};
  margin-bottom: 4px;
  font-weight: 500;
`,r.Ay.div`
  font-size: 14px;
  color: ${d.w.colors.text.dark};
  line-height: 1.6;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  white-space: pre-wrap;
`,r.Ay.div`
  border: 1px solid ${d.w.colors.borderLight};
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
`),te=r.Ay.button`
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
    border-color: ${d.w.colors.primary};
    transform: scale(1.1);
  }
`,ne=r.Ay.div`
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
`,re=r.Ay.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`,oe=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`,se=r.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${d.w.colors.secondary};
  margin: 0;
`,ae=r.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${d.w.colors.text.muted};
  cursor: pointer;
  padding: 4px;
  line-height: 1;

  &:hover {
    color: ${d.w.colors.secondary};
  }
`,de=r.Ay.div`
  padding: 24px;
`,le=r.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,ce=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,pe=r.Ay.span`
  font-size: 20px;
`,xe=r.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,ge=r.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: ${d.w.colors.secondary};
`,ue=r.Ay.div`
  margin-bottom: 24px;
`,he=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${d.w.colors.secondary};
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`,me=r.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,ye=r.Ay.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,fe=r.Ay.span`
  font-size: 15px;
  color: #0A2540;
`,je=r.Ay.span`
  font-size: 15px;
  font-weight: 600;
  color: #635BFF;
`,ve=r.Ay.p`
  font-size: 15px;
  color: #4B5563;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
`,be=r.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`,ke=e=>{let{onCountChange:i,categoryRefreshKey:t}=e;const{user:r}=(0,a.As)(),{defaultCurrency:o}=(0,u.i1)(),[s,d]=(0,n.useState)("RM"),[ke,_e]=(0,n.useState)([]),[Fe,we]=(0,n.useState)([]),[Ae,Ce]=(0,n.useState)([]),[Ee,Se]=(0,n.useState)(!0),[$e,ze]=(0,n.useState)(""),[Be,Ie]=(0,n.useState)("all"),[Re,Le]=(0,n.useState)(!1),[De,Te]=(0,n.useState)(null),[Ne,qe]=(0,n.useState)(!1),[Pe,Oe]=(0,n.useState)(!1),[Ue,Me]=(0,n.useState)(null),[Qe,Ye]=(0,n.useState)({name:"",description:"",category_id:"",emoji:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),[Ze,Je]=(0,n.useState)(null),[We,He]=(0,n.useState)([]),[Xe,Ve]=(0,n.useState)(!1),Ke=null===r||void 0===r?void 0:r.brand_id;(0,n.useEffect)(()=>{o&&d(o)},[o]);const Ge=(0,n.useCallback)(async()=>{if(Ke)try{Se(!0);const[t,n,r]=await Promise.all([(0,m.ff)("/api/product-recipes"),(0,m.ff)("/api/product-ingredients"),(0,m.ff)("/api/product-recipe-categories")]);var e;if(t.success)_e(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0);n.success&&we((n.data||[]).filter(e=>e.is_active)),r.success&&Ce(r.data||[])}catch(t){console.error("Failed to fetch data:",t)}finally{Se(!1)}},[Ke,i]);(0,n.useEffect)(()=>{Ge()},[Ge]),(0,n.useEffect)(()=>{t&&ei()},[t]);const ei=async()=>{try{const e=await(0,m.ff)("/api/product-recipe-categories");e.success&&Ce(e.data||[])}catch(e){console.error("Failed to fetch categories:",e)}},ii=function(e){var i,t,n,r,o;(Ve(arguments.length>1&&void 0!==arguments[1]&&arguments[1]),Je(null),e)?(Te(e),Ye({name:e.name,description:e.description||"",category_id:(null===(i=e.category_id)||void 0===i?void 0:i.toString())||"",emoji:e.emoji||"",image:e.image||"",yield_amount:(null===(t=e.yield_amount)||void 0===t?void 0:t.toString())||"1",yield_unit:e.yield_unit||"portion",prep_time:(null===(n=e.prep_time)||void 0===n?void 0:n.toString())||"",cook_time:(null===(r=e.cook_time)||void 0===r?void 0:r.toString())||"",instructions_summary:e.instructions_summary||"",instructions_detail:e.instructions_detail||"",suggested_price:(null===(o=e.suggested_price)||void 0===o?void 0:o.toString())||""}),e.recipeIngredients?He(e.recipeIngredients.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""}))):He([])):(Te(null),Ye({name:"",description:"",category_id:"",emoji:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),He([]));Le(!0)},ti=()=>{Oe(!1),Me(null)},ni=(e,i,t)=>{const n=[...We];if(n[e]={...n[e],[i]:t},"ingredient_id"===i){const i=Fe.find(e=>e.id===t);i&&(n[e].unit=i.unit)}He(n)},ri=()=>We.reduce((e,i)=>{const t=Fe.find(e=>e.id===i.ingredient_id);if(t&&i.quantity){const n=t.base_quantity||1;return e+t.unit_cost/n*parseFloat(i.quantity)}return e},0),oi=ke.filter(e=>{var i,t;const n=e.name.toLowerCase().includes($e.toLowerCase())||(null===(i=e.code)||void 0===i?void 0:i.toLowerCase().includes($e.toLowerCase())),r="all"===Be||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===Be;return n&&r});return Ee?(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(Q,{children:[(0,f.jsx)("div",{children:(0,f.jsxs)(Y,{children:["Product Recipes (",ke.length,")"]})}),(0,f.jsx)(l.cc,{variant:"primary",onClick:()=>ii(),children:"Add Recipe"})]}),(0,f.jsxs)(c.Qn,{children:[(0,f.jsx)(c.DO,{type:"text",placeholder:"Search recipes...",value:$e,onChange:e=>ze(e.target.value)}),(0,f.jsxs)(c.Jt,{value:Be,onChange:e=>Ie(e.target.value),children:[(0,f.jsx)("option",{value:"all",children:"All Categories"}),Ae.map(e=>(0,f.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),0===oi.length?(0,f.jsxs)(O,{children:[(0,f.jsx)(U,{children:"No recipes found"}),(0,f.jsx)(M,{children:"Create product recipes to track ingredient costs and manage production."}),(0,f.jsx)(l.cc,{variant:"primary",onClick:()=>ii(),children:"Add First Recipe"})]}):(0,f.jsx)(j,{children:oi.map(e=>{var i,t;return(0,f.jsxs)(v,{isActive:e.is_active,onClick:()=>ii(e,!0),children:[(0,f.jsxs)(b,{children:[e.image_url?(0,f.jsx)(_,{src:e.image_url,alt:e.name}):(0,f.jsx)(k,{children:e.emoji||(null===(i=e.category)||void 0===i?void 0:i.emoji)||"\ud83d\udccb"}),(0,f.jsxs)(F,{children:[(0,f.jsx)(w,{children:e.name}),(0,f.jsx)(A,{children:(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized"})]})]}),e.description&&(0,f.jsx)(C,{children:e.description}),(0,f.jsxs)(E,{children:[(0,f.jsxs)(S,{children:[(0,f.jsx)($,{children:"Ingredient Cost"}),(0,f.jsx)(z,{children:(0,h.vv)(e.total_ingredient_cost||0,s)})]}),(0,f.jsxs)(S,{children:[(0,f.jsx)($,{children:"Suggested Price"}),(0,f.jsx)(z,{children:e.suggested_price?(0,h.vv)(e.suggested_price,s):"-"})]})]}),(e.prep_time||e.cook_time)&&(0,f.jsxs)(D,{children:[e.prep_time&&(0,f.jsxs)(T,{children:[(0,f.jsx)("span",{children:"Prep:"}),(0,f.jsxs)("strong",{children:[e.prep_time," min"]})]}),e.cook_time&&(0,f.jsxs)(T,{children:[(0,f.jsx)("span",{children:"Cook:"}),(0,f.jsxs)("strong",{children:[e.cook_time," min"]})]}),e.prep_time&&e.cook_time&&(0,f.jsxs)(T,{children:[(0,f.jsx)("span",{children:"Total:"}),(0,f.jsxs)("strong",{children:[e.prep_time+e.cook_time," min"]})]})]}),e.instructions_summary&&(0,f.jsx)(N,{children:e.instructions_summary}),e.recipeIngredients&&e.recipeIngredients.length>0&&(0,f.jsxs)(B,{children:[(0,f.jsxs)(I,{children:[e.recipeIngredients.length," ingredient",e.recipeIngredients.length>1?"s":""]}),(0,f.jsxs)(R,{children:[e.recipeIngredients.slice(0,4).map((e,i)=>{var t;return(0,f.jsx)(L,{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`},i)}),e.recipeIngredients.length>4&&(0,f.jsxs)(L,{children:["+",e.recipeIngredients.length-4," more"]})]})]}),(0,f.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[(0,f.jsx)(P,{onClick:()=>(e=>{Me(e),Oe(!0)})(e),children:"Recipe"}),(0,f.jsx)(P,{variant:"primary",onClick:()=>ii(e),children:"Edit"}),(0,f.jsx)(P,{variant:"danger",onClick:()=>(async e=>{if(window.confirm(`Delete "${e.name}"? This action cannot be undone.`))try{const i=await(0,m.ff)(`/api/product-recipes/${e.id}`,{method:"DELETE"});i.success?Ge():console.error("Failed to delete recipe:",i.error)}catch(i){console.error("Failed to delete recipe:",i)}})(e),children:"Delete"})]})]},e.id)})}),(0,f.jsxs)(p.aF,{isOpen:Re,onClose:()=>Le(!1),title:Xe?"Recipe Details":De?"Edit Recipe":"Add Recipe",size:"large",children:[(0,f.jsxs)(p.gE,{children:[(0,f.jsxs)(p.lR,{children:["Recipe Name ",!Xe&&"*"]}),(0,f.jsx)(p.ZQ,{value:Qe.name,onChange:e=>Ye({...Qe,name:e.target.value}),placeholder:"e.g., Grilled Chicken",disabled:Xe})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Category"}),(0,f.jsxs)(p.FX,{value:Qe.category_id,onChange:e=>Ye({...Qe,category_id:e.target.value}),disabled:Xe,children:[(0,f.jsx)("option",{value:"",children:"Select Category"}),Ae.map(e=>(0,f.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),!Xe&&(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Emoji Icon"}),(0,f.jsx)(ie,{children:["\ud83c\udf56","\ud83c\udf72","\ud83c\udf5a","\ud83e\udd53","\ud83c\udf5c","\ud83c\udf57","\ud83e\udd5f","\ud83e\udd58","\ud83c\udf63","\ud83c\udf64","\ud83c\udf54","\ud83c\udf5f","\ud83c\udf5d","\ud83e\udd57","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf55","\ud83c\udf5e","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83e\udd69","\ud83c\udf59","\ud83c\udf58","\ud83c\udf65","\ud83c\udf62","\ud83c\udf60","\ud83e\udd60","\ud83e\uddc6","\u2615","\ud83c\udf75","\ud83e\udd64","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd5b","\ud83e\uddc3","\ud83e\uddcb","\ud83c\udf79","\ud83c\udf78","\ud83c\udf76","\ud83e\udd43","\ud83c\udf7e","\ud83e\uddc9","\ud83e\uded6","\ud83c\udf7c","\ud83e\uddca","\ud83c\udf70","\ud83c\udf68","\ud83c\udf61","\ud83c\udf6e","\ud83c\udf69","\ud83c\udf6a","\ud83e\uddc1","\ud83c\udf6b","\ud83c\udf6c","\ud83e\udd67","\ud83c\udf6d","\ud83c\udf6f","\ud83e\udd6e","\ud83c\udf66","\ud83c\udf67","\ud83c\udf82","\ud83e\udd5c","\ud83c\udf30","\ud83e\udd65","\ud83c\udf53","\ud83c\udf47","\ud83c\udf48","\ud83c\udf49","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf4c","\ud83c\udf4d","\ud83e\udd6d","\ud83c\udf4e","\ud83c\udf4f","\ud83c\udf50","\ud83c\udf51","\ud83c\udf52","\ud83e\udd5d","\ud83c\udf45","\ud83e\udd51","\ud83c\udf36\ufe0f","\ud83e\udd52","\ud83e\udd6c","\ud83e\udd66","\ud83e\uddc4","\ud83e\uddc5","\ud83c\udf3d","\ud83e\udd55","\ud83e\udd54","\ud83c\udf44","\ud83d\udccb"].map(e=>(0,f.jsx)(te,{type:"button",selected:Qe.emoji===e,onClick:()=>Ye({...Qe,emoji:e}),children:e},e))})]}),!Xe&&(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Recipe Image"}),(0,f.jsx)(x.A,{value:Qe.image,onChange:e=>Ye({...Qe,image:e}),label:"Drop recipe image here or click to upload"})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Description"}),(0,f.jsx)(p.Lz,{value:Qe.description,onChange:e=>Ye({...Qe,description:e.target.value}),placeholder:"Brief description of the recipe",rows:2,disabled:Xe})]}),(0,f.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px"},children:[(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Prep Time (min)"}),(0,f.jsx)(p.ZQ,{type:"number",min:"0",value:Qe.prep_time,onChange:e=>Ye({...Qe,prep_time:e.target.value}),disabled:Xe})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Cook Time (min)"}),(0,f.jsx)(p.ZQ,{type:"number",min:"0",value:Qe.cook_time,onChange:e=>Ye({...Qe,cook_time:e.target.value}),disabled:Xe})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsxs)(p.lR,{children:["Suggested Price (",s,")"]}),(0,f.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",value:Qe.suggested_price,onChange:e=>Ye({...Qe,suggested_price:e.target.value}),disabled:Xe})]})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Recipe Summary"}),(0,f.jsx)(p.Lz,{value:Qe.instructions_summary,onChange:e=>Ye({...Qe,instructions_summary:e.target.value}),placeholder:"Brief summary for list display (e.g., Pan-fried chicken with garlic sauce)",rows:2,disabled:Xe})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Detailed Instructions"}),(0,f.jsx)(p.Lz,{value:Qe.instructions_detail,onChange:e=>Ye({...Qe,instructions_detail:e.target.value}),placeholder:"Step-by-step cooking instructions...\n1. Prepare ingredients...\n2. Heat the pan...\n3. ...",rows:6,disabled:Xe})]}),(0,f.jsx)(Y,{children:"Yield (Production Amount)"}),(0,f.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"16px"},children:[(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Yield Amount *"}),(0,f.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0.01",value:Qe.yield_amount,onChange:e=>Ye({...Qe,yield_amount:e.target.value}),placeholder:"e.g., 10",disabled:Xe})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Yield Unit *"}),(0,f.jsx)(p.FX,{value:Qe.yield_unit,onChange:e=>Ye({...Qe,yield_unit:e.target.value}),disabled:Xe,children:y._W.map(e=>(0,f.jsx)("option",{value:e.value,children:e.label},e.value))})]})]}),(0,f.jsx)(Y,{children:"Ingredients"}),!Xe&&(0,f.jsx)(X,{onClick:()=>{He([...We,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),We.length>0&&(0,f.jsxs)(Z,{children:[(0,f.jsxs)(J,{children:[(0,f.jsx)("span",{children:"Ingredient"}),(0,f.jsx)("span",{children:"Quantity"}),(0,f.jsx)("span",{children:"Unit"}),(0,f.jsx)("span",{children:"Notes"}),!Xe&&(0,f.jsx)("span",{})]}),We.map((e,i)=>{const t=Fe.find(i=>i.id===e.ingredient_id);return(0,f.jsxs)(W,{style:Xe?{gridTemplateColumns:"3fr 1fr 0.7fr 2fr"}:void 0,children:[Xe?(0,f.jsx)(p.ZQ,{value:(null===t||void 0===t?void 0:t.name)||"",disabled:!0}):(0,f.jsx)(g.A,{options:Fe.map(e=>{const i=e.unit_cost/(e.base_quantity||1);return{value:e.id,label:e.name,subLabel:`${(0,h.Qn)(s)} ${i.toFixed(2)}/${e.unit}`}}),value:e.ingredient_id||null,onChange:e=>ni(i,"ingredient_id",e),placeholder:"Search ingredient...",disabled:Xe}),(0,f.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",placeholder:"Qty",value:e.quantity,onChange:e=>ni(i,"quantity",e.target.value),disabled:Xe}),(0,f.jsx)(p.ZQ,{value:e.unit,disabled:!0,style:{background:"#F3F4F6",color:"#6B7280"}}),(0,f.jsx)(p.ZQ,{value:e.notes,onChange:e=>ni(i,"notes",e.target.value),placeholder:"Notes",disabled:Xe}),!Xe&&(0,f.jsx)(H,{onClick:()=>(e=>{He(We.filter((i,t)=>t!==e))})(i),children:"\xd7"})]},i)})]}),(0,f.jsxs)(V,{children:[(0,f.jsx)(K,{children:"Total Ingredient Cost"}),(0,f.jsx)(G,{children:(0,h.vv)(ri(),s)})]}),(0,f.jsxs)(V,{style:{marginTop:"8px"},children:[(0,f.jsxs)(K,{children:["Cost per ",Qe.yield_unit]}),(0,f.jsx)(G,{children:(0,h.vv)((0,y.zQ)(ri(),parseFloat(Qe.yield_amount)||1,Qe.yield_unit).cost,s)})]}),Ze&&(0,f.jsx)(p.IM,{children:Ze}),(0,f.jsxs)(ee,{children:[(0,f.jsx)(p.yl,{variant:"secondary",onClick:()=>Le(!1),children:Xe?"Close":"Cancel"}),!Xe&&(0,f.jsx)(p.yl,{variant:"primary",onClick:async()=>{if(Je(null),Qe.name.trim())if(!Qe.yield_amount||parseFloat(Qe.yield_amount)<=0)Je("Yield amount must be greater than 0");else try{qe(!0);const e={name:Qe.name,description:Qe.description||null,category_id:Qe.category_id?parseInt(Qe.category_id):null,emoji:Qe.emoji||null,image:Qe.image||null,yield_amount:parseFloat(Qe.yield_amount)||1,yield_unit:Qe.yield_unit||"portion",prep_time:Qe.prep_time?parseInt(Qe.prep_time):null,cook_time:Qe.cook_time?parseInt(Qe.cook_time):null,instructions_summary:Qe.instructions_summary||null,instructions_detail:Qe.instructions_detail||null,suggested_price:Qe.suggested_price?parseFloat(Qe.suggested_price):null,ingredients:We.filter(e=>e.ingredient_id&&e.quantity).map(e=>{const i=Fe.find(i=>i.id===e.ingredient_id),t=i&&(0,y.jr)(i.unit_cost/(i.base_quantity||1),i.unit,parseFloat(e.quantity),e.unit)||0;return{ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,cost:t,notes:e.notes||null}})},i=De?`/api/product-recipes/${De.id}`:"/api/product-recipes",t=De?"PUT":"POST",n=await(0,m.ff)(i,{method:t,body:JSON.stringify(e)});n.success?(Le(!1),Je(null),Ge()):Je(n.error||"Failed to save recipe")}catch(e){console.error("Failed to save recipe:",e),Je("Failed to save recipe")}finally{qe(!1)}else Je("Recipe name is required")},disabled:Ne,children:Ne?"Saving...":"Save Recipe"})]})]}),Pe&&Ue&&(0,f.jsx)(ne,{onClick:ti,children:(0,f.jsxs)(re,{onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(oe,{children:[(0,f.jsx)(se,{children:Ue.name}),(0,f.jsx)(ae,{onClick:ti,children:"\xd7"})]}),(0,f.jsxs)(de,{children:[(Ue.prep_time||Ue.cook_time)&&(0,f.jsxs)(le,{children:[Ue.prep_time&&(0,f.jsxs)(ce,{children:[(0,f.jsx)(pe,{children:"\u23f1"}),(0,f.jsx)(xe,{children:"Prep:"}),(0,f.jsxs)(ge,{children:[Ue.prep_time," min"]})]}),Ue.cook_time&&(0,f.jsxs)(ce,{children:[(0,f.jsx)(pe,{children:"\ud83d\udd25"}),(0,f.jsx)(xe,{children:"Cook:"}),(0,f.jsxs)(ge,{children:[Ue.cook_time," min"]})]})]}),Ue.recipeIngredients&&Ue.recipeIngredients.length>0&&(0,f.jsxs)(ue,{children:[(0,f.jsx)(he,{children:"Ingredients"}),(0,f.jsx)(me,{children:Ue.recipeIngredients.map((e,i)=>{var t;return(0,f.jsxs)(ye,{children:[(0,f.jsx)(fe,{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`}),(0,f.jsxs)(je,{children:[Number(e.quantity).toFixed(2)," ",e.unit]})]},i)})})]}),Ue.instructions_summary&&(0,f.jsxs)(ue,{children:[(0,f.jsx)(he,{children:"Summary"}),(0,f.jsx)(ve,{children:Ue.instructions_summary})]}),Ue.instructions_detail&&(0,f.jsxs)(ue,{children:[(0,f.jsx)(he,{children:"Detailed Instructions"}),(0,f.jsx)(be,{children:Ue.instructions_detail})]})]})]})})]})};var _e=t(7617);const Fe=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,we=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${d.w.colors.border};
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>e.isActive?1:.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: ${d.w.colors.primary};
  }
`,Ae=r.Ay.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: ${d.w.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
`,Ce=r.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,Ee=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,Se=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${d.w.colors.secondary};
  margin-bottom: 4px;
`,$e=r.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: ${d.w.colors.primary};
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,ze=(r.Ay.span`
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
`),Be=r.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: ${d.w.colors.secondary};
`,Ie=r.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
`,Re=r.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
`,Le=r.Ay.span`
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
`,De=r.Ay.div`
  margin: 12px 0;
`,Te=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,Ne=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,qe=r.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,Pe=r.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,Oe=r.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return`\n          background: ${d.w.colors.primary};\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        `;case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return`\n          background: #F6F9FC;\n          border: 1px solid #E6EBF1;\n          color: #6B7280;\n          &:hover {\n            border-color: ${d.w.colors.primary};\n            color: #635BFF;\n            background: #F4F3FF;\n            transform: translateY(-1px);\n          }\n        `}}}

  &:active {
    transform: translateY(0);
  }
`,Ue=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,Me=r.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,Qe=r.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,Ye=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,Ze=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,Je=r.Ay.div`
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
`,We=r.Ay.div`
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`,He=r.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"out"===e.status?"#FEE2E2":"low"===e.status?"#FEF3C7":"#ECFDF5"};
  color: ${e=>"out"===e.status?"#DC2626":"low"===e.status?"#D97706":"#059669"};
`,Xe=e=>{let{onCountChange:i,categoryRefreshKey:t}=e;const{defaultCurrency:r}=(0,u.i1)(),[o,s]=(0,n.useState)("RM"),[a,d]=(0,n.useState)([]),[x,g]=(0,n.useState)([]),[y,j]=(0,n.useState)(!0),[v,b]=(0,n.useState)(""),[k,_]=(0,n.useState)("all"),[F,w]=(0,n.useState)(!1),[A,C]=(0,n.useState)(null),[E,S]=(0,n.useState)(!1),[$,z]=(0,n.useState)({isOpen:!1,ingredientId:null,ingredientName:""}),[B,I]=(0,n.useState)({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0});(0,n.useEffect)(()=>{r&&s(r)},[r]);const R=(0,n.useCallback)(async()=>{try{j(!0);const[t,n]=await Promise.all([(0,m.ff)("/api/product-ingredients"),(0,m.ff)("/api/product-ingredient-categories")]);var e;if(t.success)d(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0);n.success&&g(n.data||[])}catch(t){console.error("Failed to fetch data:",t)}finally{j(!1)}},[i]);(0,n.useEffect)(()=>{R()},[R,t]);const L=e=>{var i;e?(C(e),I({name:e.name,category_id:(null===(i=e.category_id)||void 0===i?void 0:i.toString())||"",image_url:e.image_url||"",unit:e.unit,base_quantity:e.base_quantity.toString(),unit_cost:e.unit_cost.toString(),supplier_name:e.supplier_name||"",min_stock:e.min_stock.toString(),min_order:e.min_order.toString(),current_stock:e.current_stock.toString(),track_stock:e.track_stock})):(C(null),I({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0}));w(!0)},D=()=>{w(!1),C(null),I({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0})},T=e=>e.track_stock?e.current_stock<=0?"out":e.current_stock<=e.min_stock?"low":"normal":"normal",N=a.filter(e=>{var i;const t=e.name.toLowerCase().includes(v.toLowerCase())||e.code.toLowerCase().includes(v.toLowerCase()),n="all"===k||(null===(i=e.category_id)||void 0===i?void 0:i.toString())===k;return t&&n}),q=[{id:"all",name:"All Categories"},...x.map(e=>({id:e.id.toString(),name:e.name}))];return y?(0,f.jsx)(Me,{children:(0,f.jsx)(Qe,{children:"Loading..."})}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(Ze,{children:[(0,f.jsxs)(c.Qn,{style:{marginBottom:0,flex:1},children:[(0,f.jsx)(c.DO,{type:"text",placeholder:"Search ingredients...",value:v,onChange:e=>b(e.target.value)}),(0,f.jsx)(c.Jt,{value:k,onChange:e=>_(e.target.value),children:q.map(e=>(0,f.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,f.jsx)(l.cc,{variant:"primary",onClick:()=>L(),style:{whiteSpace:"nowrap"},children:"New Ingredient"})]}),0===N.length?(0,f.jsxs)(Me,{children:[(0,f.jsx)(Qe,{children:"No ingredients found"}),(0,f.jsx)(Ye,{children:v||"all"!==k?"Try adjusting your filters":"Add ingredients to use in your product recipes"}),!v&&"all"===k&&(0,f.jsx)(l.cc,{variant:"primary",onClick:()=>L(),children:"Create First Ingredient"})]}):(0,f.jsx)(Fe,{children:N.map(e=>{var i,t;return(0,f.jsxs)(we,{isActive:e.is_active,children:[e.image_url&&(0,f.jsx)(Ae,{children:(0,f.jsx)(Ce,{src:e.image_url,alt:e.name})}),(0,f.jsx)(Ee,{children:(0,f.jsxs)("div",{children:[(0,f.jsx)(Se,{children:e.name}),(0,f.jsxs)($e,{children:[null===(i=e.category)||void 0===i?void 0:i.emoji," ",(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized"]})]})}),(0,f.jsxs)(De,{children:[(0,f.jsxs)(Te,{children:[(0,f.jsx)(Ne,{children:"Unit Cost"}),(0,f.jsx)(qe,{children:(0,h.vv)(Number(e.unit_cost),o)})]}),(0,f.jsxs)(Te,{children:[(0,f.jsx)(Ne,{children:"Base Qty / Unit"}),(0,f.jsxs)(qe,{children:[Number(e.base_quantity||1)," ",e.unit]})]}),e.supplier_name&&(0,f.jsxs)(Te,{children:[(0,f.jsx)(Ne,{children:"Supplier"}),(0,f.jsx)(qe,{children:e.supplier_name})]}),e.code&&(0,f.jsxs)(Te,{children:[(0,f.jsx)(Ne,{children:"Code"}),(0,f.jsx)(qe,{children:e.code})]}),e.track_stock&&(0,f.jsxs)(Te,{children:[(0,f.jsx)(Ne,{children:"Stock"}),(0,f.jsxs)(He,{status:T(e),children:[e.current_stock," ",e.unit]})]})]}),(0,f.jsxs)(ze,{children:[(0,f.jsx)(Be,{children:"Track in Inventory"}),(0,f.jsxs)(Ie,{children:[(0,f.jsx)(Re,{type:"checkbox",checked:e.track_stock||!1,onChange:i=>{i.stopPropagation(),(async(e,i)=>{try{const t=await(0,m.ff)(`/api/product-ingredients/${e.id}`,{method:"PUT",body:JSON.stringify({name:e.name,category_id:e.category_id,image_url:e.image_url,unit:e.unit,base_quantity:e.base_quantity,unit_cost:e.unit_cost,supplier_name:e.supplier_name,min_stock:e.min_stock,min_order:e.min_order,current_stock:e.current_stock,is_active:e.is_active,track_stock:i})});t.success?d(t=>t.map(t=>t.id===e.id?{...t,track_stock:i}:t)):alert(t.error||"Failed to update track stock")}catch(t){console.error("Failed to toggle track stock:",t)}})(e,i.target.checked)}}),(0,f.jsx)(Le,{})]})]}),(0,f.jsxs)(Pe,{children:[(0,f.jsx)(Oe,{variant:"secondary",onClick:()=>L(e),children:"Edit"}),(0,f.jsx)(Oe,{variant:"danger",onClick:()=>(e=>{z({isOpen:!0,ingredientId:e.id,ingredientName:e.name})})(e),children:"Delete"})]})]},e.id)})}),(0,f.jsx)(p.aF,{isOpen:F,onClose:D,title:A?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,f.jsxs)("form",{onSubmit:e=>{e.preventDefault(),(async()=>{if(B.name.trim()&&B.unit.trim())try{S(!0);const e=A?`/api/product-ingredients/${A.id}`:"/api/product-ingredients",i=A?"PUT":"POST",t=await(0,m.ff)(e,{method:i,body:JSON.stringify({name:B.name,category_id:B.category_id?parseInt(B.category_id):null,image_url:B.image_url||null,unit:B.unit,base_quantity:parseFloat(B.base_quantity)||1,unit_cost:parseFloat(B.unit_cost)||0,supplier_name:B.supplier_name||null,min_stock:parseFloat(B.min_stock)||0,min_order:parseFloat(B.min_order)||0,current_stock:parseFloat(B.current_stock)||0,track_stock:B.track_stock})});t.success?(D(),R()):alert(t.error||"Failed to save ingredient")}catch(e){console.error("Failed to save ingredient:",e),alert("Failed to save ingredient")}finally{S(!1)}else alert("Name and Unit are required")})()},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Image"}),(0,f.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{var i;const t=null===(i=e.target.files)||void 0===i?void 0:i[0];if(t){const e=new FileReader;e.onloadend=()=>{I({...B,image_url:e.result})},e.readAsDataURL(t)}},style:{display:"none"},id:"ingredient-image-upload"}),(0,f.jsx)(Je,{onClick:()=>{var e;return null===(e=document.getElementById("ingredient-image-upload"))||void 0===e?void 0:e.click()},children:B.image_url?(0,f.jsx)("img",{src:B.image_url,alt:"Ingredient"}):(0,f.jsx)(We,{children:"Click to upload image"})})]}),(0,f.jsxs)(p.fh,{children:[(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Ingredient Name *"}),(0,f.jsx)(p.ZQ,{type:"text",value:B.name,onChange:e=>I({...B,name:e.target.value}),placeholder:"e.g., Chicken Breast",required:!0})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Category"}),(0,f.jsxs)(p.FX,{value:B.category_id,onChange:e=>I({...B,category_id:e.target.value}),children:[(0,f.jsx)("option",{value:"",children:"Select category..."}),x.map(e=>(0,f.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]})]}),(0,f.jsxs)(p.fh,{children:[(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Base Quantity *"}),(0,f.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0.01",value:B.base_quantity,onChange:e=>I({...B,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Unit *"}),(0,f.jsxs)(p.FX,{value:B.unit,onChange:e=>I({...B,unit:e.target.value}),required:!0,children:[(0,f.jsx)("option",{value:"",children:"Select unit..."}),(0,f.jsx)("option",{value:"kg",children:"kg"}),(0,f.jsx)("option",{value:"g",children:"g"}),(0,f.jsx)("option",{value:"L",children:"L"}),(0,f.jsx)("option",{value:"ml",children:"ml"}),(0,f.jsx)("option",{value:"piece",children:"piece"}),(0,f.jsx)("option",{value:"pack",children:"pack"}),(0,f.jsx)("option",{value:"can",children:"can"}),(0,f.jsx)("option",{value:"bottle",children:"bottle"})]})]})]}),(0,f.jsxs)(p.fh,{children:[(0,f.jsxs)(p.gE,{children:[(0,f.jsxs)(p.lR,{children:["Unit Cost (",o,") *"]}),(0,f.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",value:B.unit_cost,onChange:e=>I({...B,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Supplier"}),(0,f.jsx)(p.ZQ,{type:"text",value:B.supplier_name,onChange:e=>I({...B,supplier_name:e.target.value}),placeholder:"Supplier name"})]})]}),(0,f.jsxs)(Ue,{children:[(0,f.jsx)(p.yl,{type:"button",variant:"secondary",onClick:D,children:"Cancel"}),(0,f.jsx)(p.yl,{type:"submit",variant:"primary",disabled:E,children:E?"Saving...":A?"Update Ingredient":"Create Ingredient"})]})]})}),(0,f.jsx)(_e.A,{isOpen:$.isOpen,title:"Delete Ingredient",message:`Are you sure you want to delete "${$.ingredientName}"? This action cannot be undone.`,onConfirm:async()=>{if($.ingredientId)try{const e=await(0,m.ff)(`/api/product-ingredients/${$.ingredientId}`,{method:"DELETE"});e.success?R():alert(e.error||"Failed to delete ingredient")}catch(e){console.error("Failed to delete ingredient:",e),alert("Failed to delete ingredient")}finally{z({isOpen:!1,ingredientId:null,ingredientName:""})}},onCancel:()=>{z({isOpen:!1,ingredientId:null,ingredientName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},Ve=r.Ay.div`
  padding: 24px 0;
`,Ke=r.Ay.div`
  display: grid;
  gap: 12px;
`,Ge=r.Ay.div`
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
`,ei=r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,ii=r.Ay.div`
  flex: 1;
`,ti=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,ni=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: ${d.w.colors.text.muted};
`,ri=r.Ay.div`
  font-size: 13px;
  color: ${d.w.colors.text.muted};
  margin-top: 4px;
`,oi=r.Ay.div`
  display: flex;
  gap: 8px;
`,si=r.Ay.button`
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
    border-color: ${d.w.colors.primary};
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
`,ai=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,di=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,li=r.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ci=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,pi=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,xi=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,gi=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,ui=r.Ay.button`
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
`,hi=e=>{let{onCountChange:i,onCategoryChange:t}=e;const[r,o]=(0,n.useState)([]),[a,d]=(0,n.useState)(!0),[c,x]=(0,n.useState)(!1),[g,u]=(0,n.useState)(null),[h,y]=(0,n.useState)(!1),[j,v]=(0,n.useState)(!1),[b,k]=(0,n.useState)(null),[_,F]=(0,n.useState)({name:"",emoji:"",description:""}),w=(0,n.useCallback)(async()=>{try{d(!0);const t=await(0,m.ff)("/api/product-recipe-categories");var e;if(t.success)o(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{d(!1)}},[i]);(0,n.useEffect)(()=>{w()},[w]);const A=e=>{e?(u(e),F({name:e.name,emoji:e.emoji||"",description:e.description||""})):(u(null),F({name:"",emoji:"",description:""})),x(!0)},C=()=>{x(!1),u(null),F({name:"",emoji:"",description:""})},E=async e=>{if(e.preventDefault(),_.name.trim())try{y(!0);const e=g?`/api/product-recipe-categories/${g.id}`:"/api/product-recipe-categories",i=g?"PUT":"POST",n=await(0,m.ff)(e,{method:i,body:JSON.stringify({name:_.name.trim(),emoji:_.emoji||null,description:_.description.trim()||null})});n.success?(C(),w(),null===t||void 0===t||t()):alert(n.error||"Failed to save category")}catch(i){console.error("Failed to save category:",i),alert("Failed to save category")}finally{y(!1)}},S=async(e,i)=>{const t="up"===i?e-1:e+1;if(t<0||t>=r.length)return;const n=[...r];[n[e],n[t]]=[n[t],n[e]];const o=n.map((e,i)=>({id:e.id,display_order:i}));try{await(0,m.ff)("/api/product-recipe-categories/reorder",{method:"PUT",body:JSON.stringify({orders:o})}),w()}catch(s){console.error("Failed to reorder:",s)}};return a?(0,f.jsx)(Ve,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,f.jsxs)(Ve,{children:[(0,f.jsxs)(pi,{children:[(0,f.jsx)(xi,{children:"Recipe Categories"}),(0,f.jsx)(l.cc,{variant:"primary",onClick:()=>A(),children:"Add Category"})]}),0===r.length?(0,f.jsxs)(di,{children:[(0,f.jsx)(li,{children:"No categories yet"}),(0,f.jsx)(ci,{children:"Create categories to organize your product recipes"}),(0,f.jsx)(l.cc,{variant:"primary",onClick:()=>A(),children:"Add First Category"})]}):(0,f.jsx)(Ke,{children:r.map((e,i)=>(0,f.jsxs)(Ge,{isActive:e.is_active,children:[(0,f.jsx)(s.Xd,{onMoveUp:()=>S(i,"up"),onMoveDown:()=>S(i,"down"),disableUp:0===i,disableDown:i===r.length-1}),e.emoji&&(0,f.jsx)(ei,{children:e.emoji}),(0,f.jsxs)(ii,{children:[(0,f.jsx)(ti,{children:e.name}),(0,f.jsxs)(ni,{children:[(0,f.jsxs)("span",{children:[e.recipe_count||0," recipes"]}),(0,f.jsx)(ai,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,f.jsx)(ri,{children:e.description})]}),(0,f.jsxs)(oi,{children:[(0,f.jsx)(si,{onClick:()=>A(e),title:"Edit",children:(0,f.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,f.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,f.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,f.jsx)(si,{onClick:()=>(async e=>{try{(await(0,m.ff)(`/api/product-recipe-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&w()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,f.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,f.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,f.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,f.jsx)(si,{onClick:()=>(e=>{k(e),v(!0)})(e),title:"Delete",disabled:(e.recipe_count||0)>0,children:(0,f.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,f.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,f.jsx)(p.aF,{isOpen:c,onClose:C,title:(g?"Edit":"New")+" Recipe Category",size:"medium",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(p.yl,{variant:"secondary",onClick:C,children:"Cancel"}),(0,f.jsx)(p.yl,{variant:"primary",onClick:E,disabled:!_.name.trim()||h,children:h?"Saving...":g?"Update":"Create"})]}),children:(0,f.jsxs)("form",{onSubmit:E,children:[(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Category Name *"}),(0,f.jsx)(p.ZQ,{type:"text",value:_.name,onChange:e=>F({..._,name:e.target.value}),placeholder:"e.g., Main Dishes",autoFocus:!0,required:!0})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Icon"}),(0,f.jsx)(gi,{children:["\ud83c\udf54","\ud83c\udf55","\ud83c\udf57","\ud83e\udd57","\ud83c\udf5c","\ud83c\udf5d","\ud83c\udf64","\ud83e\udd58","\ud83c\udf5b","\ud83c\udf72","\u2615","\ud83e\udd64","\ud83e\uddc3","\ud83c\udf75","\ud83e\uddcb","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd43","\ud83c\udf79","\ud83c\udf78","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf68","\ud83c\udf67","\ud83c\udf66","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6b","\ud83e\udd50","\ud83e\udd56","\ud83c\udf5e","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf71","\ud83c\udf59","\ud83c\udf58","\ud83c\udf63","\ud83c\udf65","\ud83c\udf61","\ud83c\udf62","\ud83c\udf60","\ud83e\udd5f","\ud83e\udd60","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf5f","\ud83e\uded3","\ud83e\udd53","\ud83e\uddc6"].map(e=>(0,f.jsx)(ui,{selected:_.emoji===e,onClick:()=>F({..._,emoji:e}),type:"button",children:e},e))})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Description"}),(0,f.jsx)(p.Lz,{value:_.description,onChange:e=>F({..._,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,f.jsx)(_e.A,{isOpen:j,onCancel:()=>{v(!1),k(null)},onConfirm:async()=>{if(b)try{const e=await(0,m.ff)(`/api/product-recipe-categories/${b.id}`,{method:"DELETE"});e.success?(v(!1),k(null),w(),null===t||void 0===t||t()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:b?`Are you sure you want to delete "${b.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},mi=r.Ay.div`
  padding: 24px 0;
`,yi=r.Ay.div`
  display: grid;
  gap: 12px;
`,fi=r.Ay.div`
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
`,ji=r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,vi=r.Ay.div`
  flex: 1;
`,bi=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,ki=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: ${d.w.colors.text.muted};
`,_i=r.Ay.div`
  font-size: 13px;
  color: ${d.w.colors.text.muted};
  margin-top: 4px;
`,Fi=r.Ay.div`
  display: flex;
  gap: 8px;
`,wi=r.Ay.button`
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
    border-color: ${d.w.colors.primary};
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
`,Ei=r.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Si=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,$i=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,zi=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,Bi=r.Ay.div`
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
`,Ri=e=>{let{onCountChange:i,onCategoryChange:t}=e;const[r,o]=(0,n.useState)([]),[a,d]=(0,n.useState)(!0),[c,x]=(0,n.useState)(!1),[g,u]=(0,n.useState)(null),[h,y]=(0,n.useState)(!1),[j,v]=(0,n.useState)(!1),[b,k]=(0,n.useState)(null),[_,F]=(0,n.useState)({name:"",emoji:"",description:""}),w=(0,n.useCallback)(async()=>{try{d(!0);const t=await(0,m.ff)("/api/product-ingredient-categories");var e;if(t.success)o(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{d(!1)}},[i]);(0,n.useEffect)(()=>{w()},[w]);const A=e=>{e?(u(e),F({name:e.name,emoji:e.emoji||"",description:e.description||""})):(u(null),F({name:"",emoji:"",description:""})),x(!0)},C=()=>{x(!1),u(null),F({name:"",emoji:"",description:""})},E=async e=>{if(e.preventDefault(),_.name.trim())try{y(!0);const e=g?`/api/product-ingredient-categories/${g.id}`:"/api/product-ingredient-categories",i=g?"PUT":"POST",n=await(0,m.ff)(e,{method:i,body:JSON.stringify({name:_.name.trim(),emoji:_.emoji||null,description:_.description.trim()||null})});n.success?(C(),w(),null===t||void 0===t||t()):alert(n.error||"Failed to save category")}catch(i){console.error("Failed to save category:",i),alert("Failed to save category")}finally{y(!1)}},S=async(e,i)=>{const t="up"===i?e-1:e+1;if(t<0||t>=r.length)return;const n=[...r];[n[e],n[t]]=[n[t],n[e]];const o=n.map((e,i)=>({id:e.id,display_order:i}));try{await(0,m.ff)("/api/product-ingredient-categories/reorder",{method:"PUT",body:JSON.stringify({orders:o})}),w()}catch(s){console.error("Failed to reorder:",s)}};return a?(0,f.jsx)(mi,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,f.jsxs)(mi,{children:[(0,f.jsxs)($i,{children:[(0,f.jsx)(zi,{children:"Ingredient Categories"}),(0,f.jsx)(l.cc,{variant:"primary",onClick:()=>A(),children:"Add Category"})]}),0===r.length?(0,f.jsxs)(Ci,{children:[(0,f.jsx)(Ei,{children:"No categories yet"}),(0,f.jsx)(Si,{children:"Create categories to organize your ingredients"}),(0,f.jsx)(l.cc,{variant:"primary",onClick:()=>A(),children:"Add First Category"})]}):(0,f.jsx)(yi,{children:r.map((e,i)=>(0,f.jsxs)(fi,{isActive:e.is_active,children:[(0,f.jsx)(s.Xd,{onMoveUp:()=>S(i,"up"),onMoveDown:()=>S(i,"down"),disableUp:0===i,disableDown:i===r.length-1}),e.emoji&&(0,f.jsx)(ji,{children:e.emoji}),(0,f.jsxs)(vi,{children:[(0,f.jsx)(bi,{children:e.name}),(0,f.jsxs)(ki,{children:[(0,f.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),(0,f.jsx)(Ai,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,f.jsx)(_i,{children:e.description})]}),(0,f.jsxs)(Fi,{children:[(0,f.jsx)(wi,{onClick:()=>A(e),title:"Edit",children:(0,f.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,f.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,f.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,f.jsx)(wi,{onClick:()=>(async e=>{try{(await(0,m.ff)(`/api/product-ingredient-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&w()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,f.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,f.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,f.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,f.jsx)(wi,{onClick:()=>(e=>{k(e),v(!0)})(e),title:"Delete",disabled:(e.ingredient_count||0)>0,children:(0,f.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,f.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,f.jsx)(p.aF,{isOpen:c,onClose:C,title:(g?"Edit":"New")+" Ingredient Category",size:"medium",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(p.yl,{variant:"secondary",onClick:C,children:"Cancel"}),(0,f.jsx)(p.yl,{variant:"primary",onClick:E,disabled:!_.name.trim()||h,children:h?"Saving...":g?"Update":"Create"})]}),children:(0,f.jsxs)("form",{onSubmit:E,children:[(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Category Name *"}),(0,f.jsx)(p.ZQ,{type:"text",value:_.name,onChange:e=>F({..._,name:e.target.value}),placeholder:"e.g., Proteins",autoFocus:!0,required:!0})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Icon"}),(0,f.jsx)(Bi,{children:["\ud83e\udd69","\ud83c\udf56","\ud83e\udd53","\ud83c\udf57","\ud83e\udd90","\ud83e\udd9e","\ud83e\udd80","\ud83d\udc1f","\ud83e\udd5a","\ud83e\uddc0","\ud83e\udd6c","\ud83e\udd66","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83e\udd52","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83c\udf4e","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd5d","\ud83c\udf4c","\ud83e\udd6d","\ud83c\udf4d","\ud83e\uddc8","\ud83e\udd5b","\ud83e\uddc2","\ud83c\udf6f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5a","\ud83c\udf5d","\ud83e\udd6b","\ud83e\uddca","\ud83d\udca7","\ud83c\udf76","\ud83e\uded7","\ud83e\uddf4","\ud83e\uddf9","\ud83e\uddfd","\ud83d\udce6","\ud83c\udff7\ufe0f","\ud83d\udd16"].map(e=>(0,f.jsx)(Ii,{selected:_.emoji===e,onClick:()=>F({..._,emoji:e}),type:"button",children:e},e))})]}),(0,f.jsxs)(p.gE,{children:[(0,f.jsx)(p.lR,{children:"Description"}),(0,f.jsx)(p.Lz,{value:_.description,onChange:e=>F({..._,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,f.jsx)(_e.A,{isOpen:j,onCancel:()=>{v(!1),k(null)},onConfirm:async()=>{if(b)try{const e=await(0,m.ff)(`/api/product-ingredient-categories/${b.id}`,{method:"DELETE"});e.success?(v(!1),k(null),w(),null===t||void 0===t||t()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:b?`Are you sure you want to delete "${b.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},Li=r.Ay.span`
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
`,Di=()=>{const{user:e}=(0,a.As)(),[i,t]=(0,o.ok)(),[r,d]=(0,n.useState)(0),[l,c]=(0,n.useState)(0),[p,x]=(0,n.useState)(0),[g,u]=(0,n.useState)(0),[h,m]=(0,n.useState)(0),[y,j]=(0,n.useState)(0),v=i.get("tab")||"recipes",b=null===e||void 0===e?void 0:e.brand_id,k=e=>{t({tab:e})};return b?(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(s.mc,{children:[(0,f.jsx)(s.Y9,{children:(0,f.jsx)(s.hE,{children:"Product Recipes"})}),(0,f.jsxs)(s.UC,{children:[(0,f.jsxs)(s.j,{children:[(0,f.jsxs)(s.oz,{active:"recipes"===v,onClick:()=>k("recipes"),children:["Recipes",(0,f.jsx)(Li,{children:r})]}),(0,f.jsxs)(s.oz,{active:"ingredients"===v,onClick:()=>k("ingredients"),children:["Ingredients",(0,f.jsx)(Li,{children:l})]}),(0,f.jsxs)(s.oz,{active:"recipe-categories"===v,onClick:()=>k("recipe-categories"),children:["Recipe Categories",(0,f.jsx)(Li,{children:p})]}),(0,f.jsxs)(s.oz,{active:"ingredient-categories"===v,onClick:()=>k("ingredient-categories"),children:["Ingredient Categories",(0,f.jsx)(Li,{children:g})]})]}),(0,f.jsx)("div",{style:{display:"recipes"===v?"block":"none"},children:(0,f.jsx)(ke,{onCountChange:d,categoryRefreshKey:y})}),(0,f.jsx)("div",{style:{display:"ingredients"===v?"block":"none"},children:(0,f.jsx)(Xe,{onCountChange:c,categoryRefreshKey:h})}),(0,f.jsx)("div",{style:{display:"recipe-categories"===v?"block":"none"},children:(0,f.jsx)(hi,{onCountChange:x,onCategoryChange:()=>j(e=>e+1)})}),(0,f.jsx)("div",{style:{display:"ingredient-categories"===v?"block":"none"},children:(0,f.jsx)(Ri,{onCountChange:u,onCategoryChange:()=>m(e=>e+1)})})]})]})}):(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(s.mc,{children:[(0,f.jsx)(s.Y9,{children:(0,f.jsx)(s.hE,{children:"Product Recipes"})}),(0,f.jsx)(s.UC,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Brand not found. Please log in with a brand account."})})]})})}}}]);