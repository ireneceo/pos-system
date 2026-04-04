"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7121],{1840:(e,i,t)=>{t.d(i,{ff:()=>o});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const r="";n();async function o(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${r}${e}`,n=localStorage.getItem("auth_token"),o={credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...i.headers},...i},s=await fetch(t,o);if(!s.ok){const e=await s.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${s.status}`)}return s.json()}},7121:(e,i,t)=>{t.r(i),t.d(i,{default:()=>zi});var n=t(9950),r=t(8409),o=t(2597),s=t(2653),a=t(1367),l=t(4752),d=t(2853),c=t(3705),p=t(2488),u=t(9610),x=t(4877),g=t(9194),h=t(4021),m=t(6038),y=t(1840),j=t(251),f=t(7617),v=t(4414);const b=l.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,F=l.Ay.div`
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
`,_=l.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,k=l.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,C=l.Ay.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`,A=l.Ay.div`
  flex: 1;
  min-width: 0;
`,w=l.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,E=l.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`,S=l.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,B=l.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,z=l.Ay.div``,I=l.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,R=l.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,D=l.Ay.div`
  flex: 1;
  min-height: 12px;
`,$=l.Ay.div`
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,L=l.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,T=l.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,N=l.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,q=l.Ay.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #6B7280;
  margin: 8px 0;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
`,P=l.Ay.div`
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
`,O=l.Ay.div`
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
`,U=l.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,M=l.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F6F9FC;\n          border: 1px solid #E6EBF1;\n          color: #6B7280;\n          &:hover {\n            border-color: #635BFF;\n            color: #635BFF;\n            background: #F4F3FF;\n            transform: translateY(-1px);\n          }\n        "}}}
`,Q=l.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,Y=l.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,Z=(l.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,l.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
`),J=l.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,W=l.Ay.div`
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
`,H=l.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,X=l.Ay.button`
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
`,V=l.Ay.button`
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
`,K=l.Ay.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E5E7EB;
`,G=l.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,ee=l.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,ie=l.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,te=l.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 6px;
  max-height: 160px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: #FAFBFC;
`,ne=l.Ay.button`
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
`,re=l.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  padding: 40px 0;
  z-index: 1000;
`,oe=l.Ay.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  margin: auto 0;
`,se=l.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`,ae=l.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,le=l.Ay.button`
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
`,de=l.Ay.div`
  padding: 24px;
`,ce=l.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,pe=l.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,ue=l.Ay.span`
  font-size: 20px;
`,xe=l.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,ge=l.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,he=l.Ay.div`
  margin-bottom: 24px;
`,me=l.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`,ye=l.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,je=l.Ay.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,fe=l.Ay.span`
  font-size: 15px;
  color: #0A2540;
`,ve=l.Ay.span`
  font-size: 15px;
  font-weight: 600;
  color: #635BFF;
`,be=l.Ay.p`
  font-size: 15px;
  color: #4B5563;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
`,Fe=l.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`,_e=e=>{let{onCountChange:i,categoryRefreshKey:t}=e;const{user:r}=(0,a.As)(),{defaultCurrency:o}=(0,h.i1)(),[s,l]=(0,n.useState)("RM"),[_e,ke]=(0,n.useState)([]),[Ce,Ae]=(0,n.useState)([]),[we,Ee]=(0,n.useState)([]),[Se,Be]=(0,n.useState)(!0),[ze,Ie]=(0,n.useState)(""),[Re,De]=(0,n.useState)("all"),[$e,Le]=(0,n.useState)(!1),[Te,Ne]=(0,n.useState)(null),[qe,Pe]=(0,n.useState)(!1),[Oe,Ue]=(0,n.useState)(!1),[Me,Qe]=(0,n.useState)(null),[Ye,Ze]=(0,n.useState)({name:"",description:"",category_id:"",emoji:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),[Je,We]=(0,n.useState)(null),[He,Xe]=(0,n.useState)([]),[Ve,Ke]=(0,n.useState)(!1),[Ge,ei]=(0,n.useState)(!1),[ii,ti]=(0,n.useState)(null),ni=null===r||void 0===r?void 0:r.brand_id;(0,n.useEffect)(()=>{o&&l(o)},[o]);const ri=(0,n.useCallback)(async()=>{if(ni)try{Be(!0);const[t,n,r]=await Promise.all([(0,y.ff)("/api/product-recipes"),(0,y.ff)("/api/product-ingredients"),(0,y.ff)("/api/product-recipe-categories")]);var e;if(t.success)ke(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0);n.success&&Ae((n.data||[]).filter(e=>e.is_active)),r.success&&Ee(r.data||[])}catch(t){console.error("Failed to fetch data:",t)}finally{Be(!1)}},[ni,i]);(0,n.useEffect)(()=>{ri()},[ri]),(0,n.useEffect)(()=>{t&&oi()},[t]);const oi=async()=>{try{const e=await(0,y.ff)("/api/product-recipe-categories");e.success&&Ee(e.data||[])}catch(e){console.error("Failed to fetch categories:",e)}},si=function(e){var i,t,n,r,o;(Ke(arguments.length>1&&void 0!==arguments[1]&&arguments[1]),We(null),e)?(Ne(e),Ze({name:e.name,description:e.description||"",category_id:(null===(i=e.category_id)||void 0===i?void 0:i.toString())||"",emoji:e.emoji||"",image:e.image||"",yield_amount:(null===(t=e.yield_amount)||void 0===t?void 0:t.toString())||"1",yield_unit:e.yield_unit||"portion",prep_time:(null===(n=e.prep_time)||void 0===n?void 0:n.toString())||"",cook_time:(null===(r=e.cook_time)||void 0===r?void 0:r.toString())||"",instructions_summary:e.instructions_summary||"",instructions_detail:e.instructions_detail||"",suggested_price:(null===(o=e.suggested_price)||void 0===o?void 0:o.toString())||""}),e.recipeIngredients?Xe(e.recipeIngredients.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""}))):Xe([])):(Ne(null),Ze({name:"",description:"",category_id:"",emoji:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),Xe([]));Le(!0)},ai=()=>{Ue(!1),Qe(null)},li=(e,i,t)=>{const n=[...He];if(n[e]={...n[e],[i]:t},"ingredient_id"===i){const i=Ce.find(e=>e.id===t);i&&(n[e].unit=i.unit)}Xe(n)},di=()=>He.reduce((e,i)=>{const t=Ce.find(e=>e.id===i.ingredient_id);if(t&&i.quantity){const n=t.base_quantity||1;return e+t.unit_cost/n*parseFloat(i.quantity)}return e},0),ci=_e.filter(e=>{var i,t;const n=e.name.toLowerCase().includes(ze.toLowerCase())||(null===(i=e.code)||void 0===i?void 0:i.toLowerCase().includes(ze.toLowerCase())),r="all"===Re||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===Re;return n&&r});return Se?(0,v.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,v.jsxs)(p.Qn,{style:{marginBottom:0,flex:1},children:[(0,v.jsx)(p.DO,{type:"text",placeholder:"Search recipes...",value:ze,onChange:e=>Ie(e.target.value)}),(0,v.jsxs)(p.Jt,{value:Re,onChange:e=>De(e.target.value),children:[(0,v.jsx)("option",{value:"all",children:"All Categories"}),we.map(e=>(0,v.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,v.jsx)(c.cc,{variant:"primary",onClick:()=>si(),style:{flexShrink:0},children:"Add Recipe"})]}),0===ci.length?(0,v.jsxs)(d.pp,{children:[(0,v.jsx)(Q,{children:"No recipes found"}),(0,v.jsx)(Y,{children:"Create product recipes to track ingredient costs and manage production."}),(0,v.jsx)(c.cc,{variant:"primary",onClick:()=>si(),children:"Add First Recipe"})]}):(0,v.jsx)(b,{children:ci.map(e=>{var i,t;return(0,v.jsxs)(F,{isActive:e.is_active,onClick:()=>si(e,!0),children:[(0,v.jsxs)(_,{children:[e.image_url?(0,v.jsx)(C,{src:e.image_url,alt:e.name}):(0,v.jsx)(k,{children:e.emoji||(null===(i=e.category)||void 0===i?void 0:i.emoji)||"\ud83d\udccb"}),(0,v.jsxs)(A,{children:[(0,v.jsx)(w,{children:e.name}),(0,v.jsx)(E,{children:(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized"})]})]}),e.description&&(0,v.jsx)(S,{children:e.description}),(0,v.jsxs)(B,{children:[(0,v.jsxs)(z,{children:[(0,v.jsx)(I,{children:"Ingredient Cost"}),(0,v.jsx)(R,{children:(0,m.vv)(e.total_ingredient_cost||0,s)})]}),(0,v.jsxs)(z,{children:[(0,v.jsx)(I,{children:"Suggested Price"}),(0,v.jsx)(R,{children:e.suggested_price?(0,m.vv)(e.suggested_price,s):"-"})]})]}),(e.prep_time||e.cook_time)&&(0,v.jsxs)(q,{children:[e.prep_time&&(0,v.jsxs)(P,{children:[(0,v.jsx)("span",{children:"Prep:"}),(0,v.jsxs)("strong",{children:[e.prep_time," min"]})]}),e.cook_time&&(0,v.jsxs)(P,{children:[(0,v.jsx)("span",{children:"Cook:"}),(0,v.jsxs)("strong",{children:[e.cook_time," min"]})]}),e.prep_time&&e.cook_time&&(0,v.jsxs)(P,{children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsxs)("strong",{children:[e.prep_time+e.cook_time," min"]})]})]}),e.instructions_summary&&(0,v.jsx)(O,{children:e.instructions_summary}),(0,v.jsx)(D,{}),e.recipeIngredients&&e.recipeIngredients.length>0&&(0,v.jsxs)($,{children:[(0,v.jsxs)(L,{children:[e.recipeIngredients.length," ingredient",e.recipeIngredients.length>1?"s":""]}),(0,v.jsxs)(T,{children:[e.recipeIngredients.slice(0,4).map((e,i)=>{var t;return(0,v.jsx)(N,{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`},i)}),e.recipeIngredients.length>4&&(0,v.jsxs)(N,{children:["+",e.recipeIngredients.length-4," more"]})]})]}),(0,v.jsxs)(U,{onClick:e=>e.stopPropagation(),children:[(0,v.jsx)(M,{onClick:()=>(e=>{Qe(e),Ue(!0)})(e),children:"Recipe"}),(0,v.jsx)(M,{variant:"primary",onClick:()=>si(e),children:"Edit"}),(0,v.jsx)(M,{variant:"danger",onClick:()=>(e=>{ti(e),ei(!0)})(e),children:"Delete"})]})]},e.id)})}),(0,v.jsxs)(u.aF,{isOpen:$e,onClose:()=>Le(!1),title:Ve?"Recipe Details":Te?"Edit Recipe":"Add Recipe",size:"large",children:[(0,v.jsxs)(u.gE,{children:[(0,v.jsxs)(u.lR,{children:["Recipe Name ",!Ve&&"*"]}),(0,v.jsx)(u.ZQ,{value:Ye.name,onChange:e=>Ze({...Ye,name:e.target.value}),placeholder:"e.g., Grilled Chicken",disabled:Ve})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Category"}),(0,v.jsxs)(u.FX,{value:Ye.category_id,onChange:e=>Ze({...Ye,category_id:e.target.value}),disabled:Ve,children:[(0,v.jsx)("option",{value:"",children:"Select Category"}),we.map(e=>(0,v.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),!Ve&&(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Emoji Icon"}),(0,v.jsx)(te,{children:["\ud83c\udf56","\ud83c\udf72","\ud83c\udf5a","\ud83e\udd53","\ud83c\udf5c","\ud83c\udf57","\ud83e\udd5f","\ud83e\udd58","\ud83c\udf63","\ud83c\udf64","\ud83c\udf54","\ud83c\udf5f","\ud83c\udf5d","\ud83e\udd57","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf55","\ud83c\udf5e","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83e\udd69","\ud83c\udf59","\ud83c\udf58","\ud83c\udf65","\ud83c\udf62","\ud83c\udf60","\ud83e\udd60","\ud83e\uddc6","\u2615","\ud83c\udf75","\ud83e\udd64","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd5b","\ud83e\uddc3","\ud83e\uddcb","\ud83c\udf79","\ud83c\udf78","\ud83c\udf76","\ud83e\udd43","\ud83c\udf7e","\ud83e\uddc9","\ud83e\uded6","\ud83c\udf7c","\ud83e\uddca","\ud83c\udf70","\ud83c\udf68","\ud83c\udf61","\ud83c\udf6e","\ud83c\udf69","\ud83c\udf6a","\ud83e\uddc1","\ud83c\udf6b","\ud83c\udf6c","\ud83e\udd67","\ud83c\udf6d","\ud83c\udf6f","\ud83e\udd6e","\ud83c\udf66","\ud83c\udf67","\ud83c\udf82","\ud83e\udd5c","\ud83c\udf30","\ud83e\udd65","\ud83c\udf53","\ud83c\udf47","\ud83c\udf48","\ud83c\udf49","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf4c","\ud83c\udf4d","\ud83e\udd6d","\ud83c\udf4e","\ud83c\udf4f","\ud83c\udf50","\ud83c\udf51","\ud83c\udf52","\ud83e\udd5d","\ud83c\udf45","\ud83e\udd51","\ud83c\udf36\ufe0f","\ud83e\udd52","\ud83e\udd6c","\ud83e\udd66","\ud83e\uddc4","\ud83e\uddc5","\ud83c\udf3d","\ud83e\udd55","\ud83e\udd54","\ud83c\udf44","\ud83d\udccb"].map(e=>(0,v.jsx)(ne,{type:"button",selected:Ye.emoji===e,onClick:()=>Ze({...Ye,emoji:e}),children:e},e))})]}),!Ve&&(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Recipe Image"}),(0,v.jsx)(x.A,{value:Ye.image,onChange:e=>Ze({...Ye,image:e}),label:"Drop recipe image here or click to upload"})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Description"}),(0,v.jsx)(u.Lz,{value:Ye.description,onChange:e=>Ze({...Ye,description:e.target.value}),placeholder:"Brief description of the recipe",rows:2,disabled:Ve})]}),(0,v.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px"},children:[(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Prep Time (min)"}),(0,v.jsx)(u.ZQ,{type:"number",min:"0",value:Ye.prep_time,onChange:e=>Ze({...Ye,prep_time:e.target.value}),disabled:Ve})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Cook Time (min)"}),(0,v.jsx)(u.ZQ,{type:"number",min:"0",value:Ye.cook_time,onChange:e=>Ze({...Ye,cook_time:e.target.value}),disabled:Ve})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsxs)(u.lR,{children:["Suggested Price (",s,")"]}),(0,v.jsx)(u.ZQ,{type:"number",step:"0.01",min:"0",value:Ye.suggested_price,onChange:e=>Ze({...Ye,suggested_price:e.target.value}),disabled:Ve})]})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Recipe Summary"}),(0,v.jsx)(u.Lz,{value:Ye.instructions_summary,onChange:e=>Ze({...Ye,instructions_summary:e.target.value}),placeholder:"Brief summary for list display (e.g., Pan-fried chicken with garlic sauce)",rows:2,disabled:Ve})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Detailed Instructions"}),(0,v.jsx)(u.Lz,{value:Ye.instructions_detail,onChange:e=>Ze({...Ye,instructions_detail:e.target.value}),placeholder:"Step-by-step cooking instructions...\n1. Prepare ingredients...\n2. Heat the pan...\n3. ...",rows:6,disabled:Ve})]}),(0,v.jsx)(Z,{children:"Yield (Production Amount)"}),(0,v.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"16px"},children:[(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Yield Amount *"}),(0,v.jsx)(u.ZQ,{type:"number",step:"0.01",min:"0.01",value:Ye.yield_amount,onChange:e=>Ze({...Ye,yield_amount:e.target.value}),placeholder:"e.g., 10",disabled:Ve})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Yield Unit *"}),(0,v.jsx)(u.FX,{value:Ye.yield_unit,onChange:e=>Ze({...Ye,yield_unit:e.target.value}),disabled:Ve,children:j._W.map(e=>(0,v.jsx)("option",{value:e.value,children:e.label},e.value))})]})]}),(0,v.jsx)(Z,{children:"Ingredients"}),!Ve&&(0,v.jsx)(V,{onClick:()=>{Xe([...He,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),He.length>0&&(0,v.jsxs)(J,{children:[(0,v.jsxs)(W,{children:[(0,v.jsx)("span",{children:"Ingredient"}),(0,v.jsx)("span",{children:"Quantity"}),(0,v.jsx)("span",{children:"Unit"}),(0,v.jsx)("span",{children:"Notes"}),!Ve&&(0,v.jsx)("span",{})]}),He.map((e,i)=>{const t=Ce.find(i=>i.id===e.ingredient_id);return(0,v.jsxs)(H,{style:Ve?{gridTemplateColumns:"3fr 1fr 0.7fr 2fr"}:void 0,children:[Ve?(0,v.jsx)(u.ZQ,{value:(null===t||void 0===t?void 0:t.name)||"",disabled:!0}):(0,v.jsx)(g.A,{options:Ce.map(e=>{const i=e.unit_cost/(e.base_quantity||1);return{value:e.id,label:e.name,subLabel:`${(0,m.Qn)(s)} ${i.toFixed(2)}/${e.unit}`}}),value:e.ingredient_id||null,onChange:e=>li(i,"ingredient_id",e),placeholder:"Search ingredient...",disabled:Ve}),(0,v.jsx)(u.ZQ,{type:"number",step:"0.01",min:"0",placeholder:"Qty",value:e.quantity,onChange:e=>li(i,"quantity",e.target.value),disabled:Ve}),(0,v.jsx)(u.ZQ,{value:e.unit,disabled:!0,style:{background:"#F3F4F6",color:"#6B7280"}}),(0,v.jsx)(u.ZQ,{value:e.notes,onChange:e=>li(i,"notes",e.target.value),placeholder:"Notes",disabled:Ve}),!Ve&&(0,v.jsx)(X,{onClick:()=>(e=>{Xe(He.filter((i,t)=>t!==e))})(i),children:"\xd7"})]},i)})]}),(0,v.jsxs)(K,{children:[(0,v.jsx)(G,{children:"Total Ingredient Cost"}),(0,v.jsx)(ee,{children:(0,m.vv)(di(),s)})]}),(0,v.jsxs)(K,{style:{marginTop:"8px"},children:[(0,v.jsxs)(G,{children:["Cost per ",Ye.yield_unit]}),(0,v.jsx)(ee,{children:(0,m.vv)((0,j.zQ)(di(),parseFloat(Ye.yield_amount)||1,Ye.yield_unit).cost,s)})]}),Je&&(0,v.jsx)(u.IM,{children:Je}),(0,v.jsxs)(ie,{children:[(0,v.jsx)(u.yl,{variant:"secondary",onClick:()=>Le(!1),children:Ve?"Close":"Cancel"}),!Ve&&(0,v.jsx)(u.yl,{variant:"primary",onClick:async()=>{if(We(null),Ye.name.trim())if(!Ye.yield_amount||parseFloat(Ye.yield_amount)<=0)We("Yield amount must be greater than 0");else try{Pe(!0);const e={name:Ye.name,description:Ye.description||null,category_id:Ye.category_id?parseInt(Ye.category_id):null,emoji:Ye.emoji||null,image:Ye.image||null,yield_amount:parseFloat(Ye.yield_amount)||1,yield_unit:Ye.yield_unit||"portion",prep_time:Ye.prep_time?parseInt(Ye.prep_time):null,cook_time:Ye.cook_time?parseInt(Ye.cook_time):null,instructions_summary:Ye.instructions_summary||null,instructions_detail:Ye.instructions_detail||null,suggested_price:Ye.suggested_price?parseFloat(Ye.suggested_price):null,ingredients:He.filter(e=>e.ingredient_id&&e.quantity).map(e=>{const i=Ce.find(i=>i.id===e.ingredient_id),t=i&&(0,j.jr)(i.unit_cost/(i.base_quantity||1),i.unit,parseFloat(e.quantity),e.unit)||0;return{ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,cost:t,notes:e.notes||null}})},i=Te?`/api/product-recipes/${Te.id}`:"/api/product-recipes",t=Te?"PUT":"POST",n=await(0,y.ff)(i,{method:t,body:JSON.stringify(e)});n.success?(Le(!1),We(null),ri()):We(n.error||"Failed to save recipe")}catch(e){console.error("Failed to save recipe:",e),We("Failed to save recipe")}finally{Pe(!1)}else We("Recipe name is required")},disabled:qe,children:qe?"Saving...":"Save Recipe"})]})]}),Oe&&Me&&(0,v.jsx)(re,{onClick:ai,children:(0,v.jsxs)(oe,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(se,{children:[(0,v.jsx)(ae,{children:Me.name}),(0,v.jsx)(le,{onClick:ai,children:"\xd7"})]}),(0,v.jsxs)(de,{children:[(Me.prep_time||Me.cook_time)&&(0,v.jsxs)(ce,{children:[Me.prep_time&&(0,v.jsxs)(pe,{children:[(0,v.jsx)(ue,{children:"\u23f1"}),(0,v.jsx)(xe,{children:"Prep:"}),(0,v.jsxs)(ge,{children:[Me.prep_time," min"]})]}),Me.cook_time&&(0,v.jsxs)(pe,{children:[(0,v.jsx)(ue,{children:"\ud83d\udd25"}),(0,v.jsx)(xe,{children:"Cook:"}),(0,v.jsxs)(ge,{children:[Me.cook_time," min"]})]})]}),Me.recipeIngredients&&Me.recipeIngredients.length>0&&(0,v.jsxs)(he,{children:[(0,v.jsx)(me,{children:"Ingredients"}),(0,v.jsx)(ye,{children:Me.recipeIngredients.map((e,i)=>{var t;return(0,v.jsxs)(je,{children:[(0,v.jsx)(fe,{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`}),(0,v.jsxs)(ve,{children:[Number(e.quantity).toFixed(2)," ",e.unit]})]},i)})})]}),Me.instructions_summary&&(0,v.jsxs)(he,{children:[(0,v.jsx)(me,{children:"Summary"}),(0,v.jsx)(be,{children:Me.instructions_summary})]}),Me.instructions_detail&&(0,v.jsxs)(he,{children:[(0,v.jsx)(me,{children:"Detailed Instructions"}),(0,v.jsx)(Fe,{children:Me.instructions_detail})]})]})]})}),(0,v.jsx)(f.A,{isOpen:Ge,title:"Delete Recipe",message:`Delete "${null===ii||void 0===ii?void 0:ii.name}"? This action cannot be undone.`,onConfirm:async()=>{if(ii){ei(!1);try{const e=await(0,y.ff)(`/api/product-recipes/${ii.id}`,{method:"DELETE"});e.success?ri():console.error("Failed to delete recipe:",e.error)}catch(e){console.error("Failed to delete recipe:",e)}ti(null)}},onCancel:()=>{ei(!1),ti(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},ke=l.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,Ce=l.Ay.div`
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
`,Ae=l.Ay.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
`,we=l.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,Ee=l.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,Se=l.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,Be=l.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,ze=l.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-top: 12px;
`,Ie=l.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`,Re=l.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
`,De=l.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
`,$e=l.Ay.span`
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

  ${De}:checked + & {
    background-color: #635BFF;
  }

  ${De}:checked + &:before {
    transform: translateX(22px);
  }
`,Le=l.Ay.div`
  margin: 12px 0;
`,Te=l.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,Ne=l.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,qe=l.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,Pe=l.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,Oe=l.Ay.button`
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
`,Ue=l.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,Me=l.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,Qe=l.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,Ye=(l.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,l.Ay.div`
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
`),Ze=l.Ay.div`
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`,Je=l.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"out"===e.status?"#FEE2E2":"low"===e.status?"#FEF3C7":"#ECFDF5"};
  color: ${e=>"out"===e.status?"#DC2626":"low"===e.status?"#D97706":"#059669"};
`,We=e=>{let{onCountChange:i,categoryRefreshKey:t}=e;const{defaultCurrency:r}=(0,h.i1)(),[o,s]=(0,n.useState)("RM"),[a,l]=(0,n.useState)([]),[x,g]=(0,n.useState)([]),[j,b]=(0,n.useState)(!0),[F,_]=(0,n.useState)(""),[k,C]=(0,n.useState)("all"),[A,w]=(0,n.useState)(!1),[E,S]=(0,n.useState)(null),[B,z]=(0,n.useState)(!1),[I,R]=(0,n.useState)({isOpen:!1,ingredientId:null,ingredientName:""}),[D,$]=(0,n.useState)({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0});(0,n.useEffect)(()=>{r&&s(r)},[r]);const L=(0,n.useCallback)(async()=>{try{b(!0);const[t,n]=await Promise.all([(0,y.ff)("/api/product-ingredients"),(0,y.ff)("/api/product-ingredient-categories")]);var e;if(t.success)l(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0);n.success&&g(n.data||[])}catch(t){console.error("Failed to fetch data:",t)}finally{b(!1)}},[i]);(0,n.useEffect)(()=>{L()},[L,t]);const T=e=>{var i;e?(S(e),$({name:e.name,category_id:(null===(i=e.category_id)||void 0===i?void 0:i.toString())||"",image_url:e.image_url||"",unit:e.unit,base_quantity:e.base_quantity.toString(),unit_cost:e.unit_cost.toString(),supplier_name:e.supplier_name||"",min_stock:e.min_stock.toString(),min_order:e.min_order.toString(),current_stock:e.current_stock.toString(),track_stock:e.track_stock})):(S(null),$({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0}));w(!0)},N=()=>{w(!1),S(null),$({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0})},q=e=>e.track_stock?e.current_stock<=0?"out":e.current_stock<=e.min_stock?"low":"normal":"normal",P=a.filter(e=>{var i;const t=e.name.toLowerCase().includes(F.toLowerCase())||e.code.toLowerCase().includes(F.toLowerCase()),n="all"===k||(null===(i=e.category_id)||void 0===i?void 0:i.toString())===k;return t&&n}),O=[{id:"all",name:"All Categories"},...x.map(e=>({id:e.id.toString(),name:e.name}))];return j?(0,v.jsx)(d.pp,{children:(0,v.jsx)(Me,{children:"Loading..."})}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,v.jsxs)(p.Qn,{style:{marginBottom:0,flex:1},children:[(0,v.jsx)(p.DO,{type:"text",placeholder:"Search ingredients...",value:F,onChange:e=>_(e.target.value)}),(0,v.jsx)(p.Jt,{value:k,onChange:e=>C(e.target.value),children:O.map(e=>(0,v.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,v.jsx)(c.cc,{variant:"primary",onClick:()=>T(),style:{flexShrink:0},children:"New Ingredient"})]}),0===P.length?(0,v.jsxs)(d.pp,{children:[(0,v.jsx)(Me,{children:"No ingredients found"}),(0,v.jsx)(Qe,{children:F||"all"!==k?"Try adjusting your filters":"Add ingredients to use in your product recipes"}),!F&&"all"===k&&(0,v.jsx)(c.cc,{variant:"primary",onClick:()=>T(),children:"Create First Ingredient"})]}):(0,v.jsx)(ke,{children:P.map(e=>{var i,t;return(0,v.jsxs)(Ce,{isActive:e.is_active,children:[e.image_url&&(0,v.jsx)(Ae,{children:(0,v.jsx)(we,{src:e.image_url,alt:e.name})}),(0,v.jsx)(Ee,{children:(0,v.jsxs)("div",{children:[(0,v.jsx)(Se,{children:e.name}),(0,v.jsxs)(Be,{children:[null===(i=e.category)||void 0===i?void 0:i.emoji," ",(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized"]})]})}),(0,v.jsxs)(Le,{children:[(0,v.jsxs)(Te,{children:[(0,v.jsx)(Ne,{children:"Unit Cost"}),(0,v.jsx)(qe,{children:(0,m.vv)(Number(e.unit_cost),o)})]}),(0,v.jsxs)(Te,{children:[(0,v.jsx)(Ne,{children:"Base Qty / Unit"}),(0,v.jsxs)(qe,{children:[Number(e.base_quantity||1)," ",e.unit]})]}),e.supplier_name&&(0,v.jsxs)(Te,{children:[(0,v.jsx)(Ne,{children:"Supplier"}),(0,v.jsx)(qe,{children:e.supplier_name})]}),e.code&&(0,v.jsxs)(Te,{children:[(0,v.jsx)(Ne,{children:"Code"}),(0,v.jsx)(qe,{children:e.code})]}),e.track_stock&&(0,v.jsxs)(Te,{children:[(0,v.jsx)(Ne,{children:"Stock"}),(0,v.jsxs)(Je,{status:q(e),children:[e.current_stock," ",e.unit]})]})]}),(0,v.jsxs)(ze,{children:[(0,v.jsx)(Ie,{children:"Track in Inventory"}),(0,v.jsxs)(Re,{children:[(0,v.jsx)(De,{type:"checkbox",checked:e.track_stock||!1,onChange:i=>{i.stopPropagation(),(async(e,i)=>{try{const t=await(0,y.ff)(`/api/product-ingredients/${e.id}`,{method:"PUT",body:JSON.stringify({name:e.name,category_id:e.category_id,image_url:e.image_url,unit:e.unit,base_quantity:e.base_quantity,unit_cost:e.unit_cost,supplier_name:e.supplier_name,min_stock:e.min_stock,min_order:e.min_order,current_stock:e.current_stock,is_active:e.is_active,track_stock:i})});t.success?l(t=>t.map(t=>t.id===e.id?{...t,track_stock:i}:t)):alert(t.error||"Failed to update track stock")}catch(t){console.error("Failed to toggle track stock:",t)}})(e,i.target.checked)}}),(0,v.jsx)($e,{})]})]}),(0,v.jsxs)(Pe,{children:[(0,v.jsx)(Oe,{variant:"secondary",onClick:()=>T(e),children:"Edit"}),(0,v.jsx)(Oe,{variant:"danger",onClick:()=>(e=>{R({isOpen:!0,ingredientId:e.id,ingredientName:e.name})})(e),children:"Delete"})]})]},e.id)})}),(0,v.jsx)(u.aF,{isOpen:A,onClose:N,title:E?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,v.jsxs)("form",{onSubmit:e=>{e.preventDefault(),(async()=>{if(D.name.trim()&&D.unit.trim())try{z(!0);const e=E?`/api/product-ingredients/${E.id}`:"/api/product-ingredients",i=E?"PUT":"POST",t=await(0,y.ff)(e,{method:i,body:JSON.stringify({name:D.name,category_id:D.category_id?parseInt(D.category_id):null,image_url:D.image_url||null,unit:D.unit,base_quantity:parseFloat(D.base_quantity)||1,unit_cost:parseFloat(D.unit_cost)||0,supplier_name:D.supplier_name||null,min_stock:parseFloat(D.min_stock)||0,min_order:parseFloat(D.min_order)||0,current_stock:parseFloat(D.current_stock)||0,track_stock:D.track_stock})});t.success?(N(),L()):alert(t.error||"Failed to save ingredient")}catch(e){console.error("Failed to save ingredient:",e),alert("Failed to save ingredient")}finally{z(!1)}else alert("Name and Unit are required")})()},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Image"}),(0,v.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{var i;const t=null===(i=e.target.files)||void 0===i?void 0:i[0];if(t){const e=new FileReader;e.onloadend=()=>{$({...D,image_url:e.result})},e.readAsDataURL(t)}},style:{display:"none"},id:"ingredient-image-upload"}),(0,v.jsx)(Ye,{onClick:()=>{var e;return null===(e=document.getElementById("ingredient-image-upload"))||void 0===e?void 0:e.click()},children:D.image_url?(0,v.jsx)("img",{src:D.image_url,alt:"Ingredient"}):(0,v.jsx)(Ze,{children:"Click to upload image"})})]}),(0,v.jsxs)(u.fh,{children:[(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Ingredient Name *"}),(0,v.jsx)(u.ZQ,{type:"text",value:D.name,onChange:e=>$({...D,name:e.target.value}),placeholder:"e.g., Chicken Breast",required:!0})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Category"}),(0,v.jsxs)(u.FX,{value:D.category_id,onChange:e=>$({...D,category_id:e.target.value}),children:[(0,v.jsx)("option",{value:"",children:"Select category..."}),x.map(e=>(0,v.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]})]}),(0,v.jsxs)(u.fh,{children:[(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Base Quantity *"}),(0,v.jsx)(u.ZQ,{type:"number",step:"0.01",min:"0.01",value:D.base_quantity,onChange:e=>$({...D,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Unit *"}),(0,v.jsxs)(u.FX,{value:D.unit,onChange:e=>$({...D,unit:e.target.value}),required:!0,children:[(0,v.jsx)("option",{value:"",children:"Select unit..."}),(0,v.jsx)("option",{value:"kg",children:"kg"}),(0,v.jsx)("option",{value:"g",children:"g"}),(0,v.jsx)("option",{value:"L",children:"L"}),(0,v.jsx)("option",{value:"ml",children:"ml"}),(0,v.jsx)("option",{value:"piece",children:"piece"}),(0,v.jsx)("option",{value:"pack",children:"pack"}),(0,v.jsx)("option",{value:"can",children:"can"}),(0,v.jsx)("option",{value:"bottle",children:"bottle"})]})]})]}),(0,v.jsxs)(u.fh,{children:[(0,v.jsxs)(u.gE,{children:[(0,v.jsxs)(u.lR,{children:["Unit Cost (",o,") *"]}),(0,v.jsx)(u.ZQ,{type:"number",step:"0.01",min:"0",value:D.unit_cost,onChange:e=>$({...D,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Supplier"}),(0,v.jsx)(u.ZQ,{type:"text",value:D.supplier_name,onChange:e=>$({...D,supplier_name:e.target.value}),placeholder:"Supplier name"})]})]}),(0,v.jsxs)(Ue,{children:[(0,v.jsx)(u.yl,{type:"button",variant:"secondary",onClick:N,children:"Cancel"}),(0,v.jsx)(u.yl,{type:"submit",variant:"primary",disabled:B,children:B?"Saving...":E?"Update Ingredient":"Create Ingredient"})]})]})}),(0,v.jsx)(f.A,{isOpen:I.isOpen,title:"Delete Ingredient",message:`Are you sure you want to delete "${I.ingredientName}"? This action cannot be undone.`,onConfirm:async()=>{if(I.ingredientId)try{const e=await(0,y.ff)(`/api/product-ingredients/${I.ingredientId}`,{method:"DELETE"});e.success?L():alert(e.error||"Failed to delete ingredient")}catch(e){console.error("Failed to delete ingredient:",e),alert("Failed to delete ingredient")}finally{R({isOpen:!1,ingredientId:null,ingredientName:""})}},onCancel:()=>{R({isOpen:!1,ingredientId:null,ingredientName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},He=l.Ay.div`
  padding: 24px 0;
`,Xe=l.Ay.div`
  display: grid;
  gap: 12px;
`,Ve=l.Ay.div`
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
`,Ke=l.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,Ge=l.Ay.div`
  flex: 1;
`,ei=l.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,ii=l.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,ti=l.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,ni=l.Ay.div`
  display: flex;
  gap: 8px;
`,ri=l.Ay.button`
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
`,oi=l.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,si=l.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ai=l.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,li=l.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,di=l.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,ci=l.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,pi=l.Ay.button`
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
`,ui=e=>{let{onCountChange:i,onCategoryChange:t}=e;const[o,s]=(0,n.useState)([]),[a,l]=(0,n.useState)(!0),[p,x]=(0,n.useState)(!1),[g,h]=(0,n.useState)(null),[m,j]=(0,n.useState)(!1),[b,F]=(0,n.useState)(!1),[_,k]=(0,n.useState)(null),[C,A]=(0,n.useState)({name:"",emoji:"",description:""}),w=(0,n.useCallback)(async()=>{try{l(!0);const t=await(0,y.ff)("/api/product-recipe-categories");var e;if(t.success)s(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{l(!1)}},[i]);(0,n.useEffect)(()=>{w()},[w]);const E=e=>{e?(h(e),A({name:e.name,emoji:e.emoji||"",description:e.description||""})):(h(null),A({name:"",emoji:"",description:""})),x(!0)},S=()=>{x(!1),h(null),A({name:"",emoji:"",description:""})},B=async e=>{if(e.preventDefault(),C.name.trim())try{j(!0);const e=g?`/api/product-recipe-categories/${g.id}`:"/api/product-recipe-categories",i=g?"PUT":"POST",n=await(0,y.ff)(e,{method:i,body:JSON.stringify({name:C.name.trim(),emoji:C.emoji||null,description:C.description.trim()||null})});n.success?(S(),w(),null===t||void 0===t||t()):alert(n.error||"Failed to save category")}catch(i){console.error("Failed to save category:",i),alert("Failed to save category")}finally{j(!1)}},z=async(e,i)=>{const t="up"===i?e-1:e+1;if(t<0||t>=o.length)return;const n=[...o];[n[e],n[t]]=[n[t],n[e]];const r=n.map((e,i)=>({id:e.id,display_order:i}));try{await(0,y.ff)("/api/product-recipe-categories/reorder",{method:"PUT",body:JSON.stringify({orders:r})}),w()}catch(s){console.error("Failed to reorder:",s)}};return a?(0,v.jsx)(He,{children:(0,v.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,v.jsxs)(He,{children:[(0,v.jsxs)(li,{children:[(0,v.jsx)(di,{children:"Recipe Categories"}),(0,v.jsx)(c.cc,{variant:"primary",onClick:()=>E(),children:"Add Category"})]}),0===o.length?(0,v.jsxs)(d.pp,{children:[(0,v.jsx)(si,{children:"No categories yet"}),(0,v.jsx)(ai,{children:"Create categories to organize your product recipes"}),(0,v.jsx)(c.cc,{variant:"primary",onClick:()=>E(),children:"Add First Category"})]}):(0,v.jsx)(Xe,{children:o.map((e,i)=>(0,v.jsxs)(Ve,{isActive:e.is_active,children:[(0,v.jsx)(r.Xd,{onMoveUp:()=>z(i,"up"),onMoveDown:()=>z(i,"down"),disableUp:0===i,disableDown:i===o.length-1}),e.emoji&&(0,v.jsx)(Ke,{children:e.emoji}),(0,v.jsxs)(Ge,{children:[(0,v.jsx)(ei,{children:e.name}),(0,v.jsxs)(ii,{children:[(0,v.jsxs)("span",{children:[e.recipe_count||0," recipes"]}),(0,v.jsx)(oi,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,v.jsx)(ti,{children:e.description})]}),(0,v.jsxs)(ni,{children:[(0,v.jsx)(ri,{onClick:()=>E(e),title:"Edit",children:(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,v.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,v.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,v.jsx)(ri,{onClick:()=>(async e=>{try{(await(0,y.ff)(`/api/product-recipe-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&w()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,v.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,v.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,v.jsx)(ri,{onClick:()=>(e=>{k(e),F(!0)})(e),title:"Delete",disabled:(e.recipe_count||0)>0,children:(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,v.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,v.jsx)(u.aF,{isOpen:p,onClose:S,title:(g?"Edit":"New")+" Recipe Category",size:"medium",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(u.yl,{variant:"secondary",onClick:S,children:"Cancel"}),(0,v.jsx)(u.yl,{variant:"primary",onClick:B,disabled:!C.name.trim()||m,children:m?"Saving...":g?"Update":"Create"})]}),children:(0,v.jsxs)("form",{onSubmit:B,children:[(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Category Name *"}),(0,v.jsx)(u.ZQ,{type:"text",value:C.name,onChange:e=>A({...C,name:e.target.value}),placeholder:"e.g., Main Dishes",autoFocus:!0,required:!0})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Icon"}),(0,v.jsx)(ci,{children:["\ud83c\udf54","\ud83c\udf55","\ud83c\udf57","\ud83e\udd57","\ud83c\udf5c","\ud83c\udf5d","\ud83c\udf64","\ud83e\udd58","\ud83c\udf5b","\ud83c\udf72","\u2615","\ud83e\udd64","\ud83e\uddc3","\ud83c\udf75","\ud83e\uddcb","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd43","\ud83c\udf79","\ud83c\udf78","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf68","\ud83c\udf67","\ud83c\udf66","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6b","\ud83e\udd50","\ud83e\udd56","\ud83c\udf5e","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf71","\ud83c\udf59","\ud83c\udf58","\ud83c\udf63","\ud83c\udf65","\ud83c\udf61","\ud83c\udf62","\ud83c\udf60","\ud83e\udd5f","\ud83e\udd60","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf5f","\ud83e\uded3","\ud83e\udd53","\ud83e\uddc6"].map(e=>(0,v.jsx)(pi,{selected:C.emoji===e,onClick:()=>A({...C,emoji:e}),type:"button",children:e},e))})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Description"}),(0,v.jsx)(u.Lz,{value:C.description,onChange:e=>A({...C,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,v.jsx)(f.A,{isOpen:b,onCancel:()=>{F(!1),k(null)},onConfirm:async()=>{if(_)try{const e=await(0,y.ff)(`/api/product-recipe-categories/${_.id}`,{method:"DELETE"});e.success?(F(!1),k(null),w(),null===t||void 0===t||t()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:_?`Are you sure you want to delete "${_.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},xi=l.Ay.div`
  padding: 24px 0;
`,gi=l.Ay.div`
  display: grid;
  gap: 12px;
`,hi=l.Ay.div`
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
`,mi=l.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,yi=l.Ay.div`
  flex: 1;
`,ji=l.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,fi=l.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,vi=l.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,bi=l.Ay.div`
  display: flex;
  gap: 8px;
`,Fi=l.Ay.button`
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
`,_i=l.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ki=l.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Ci=l.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,Ai=l.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,wi=l.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,Ei=l.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,Si=l.Ay.button`
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
`,Bi=e=>{let{onCountChange:i,onCategoryChange:t}=e;const[o,s]=(0,n.useState)([]),[a,l]=(0,n.useState)(!0),[p,x]=(0,n.useState)(!1),[g,h]=(0,n.useState)(null),[m,j]=(0,n.useState)(!1),[b,F]=(0,n.useState)(!1),[_,k]=(0,n.useState)(null),[C,A]=(0,n.useState)({name:"",emoji:"",description:""}),w=(0,n.useCallback)(async()=>{try{l(!0);const t=await(0,y.ff)("/api/product-ingredient-categories");var e;if(t.success)s(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{l(!1)}},[i]);(0,n.useEffect)(()=>{w()},[w]);const E=e=>{e?(h(e),A({name:e.name,emoji:e.emoji||"",description:e.description||""})):(h(null),A({name:"",emoji:"",description:""})),x(!0)},S=()=>{x(!1),h(null),A({name:"",emoji:"",description:""})},B=async e=>{if(e.preventDefault(),C.name.trim())try{j(!0);const e=g?`/api/product-ingredient-categories/${g.id}`:"/api/product-ingredient-categories",i=g?"PUT":"POST",n=await(0,y.ff)(e,{method:i,body:JSON.stringify({name:C.name.trim(),emoji:C.emoji||null,description:C.description.trim()||null})});n.success?(S(),w(),null===t||void 0===t||t()):alert(n.error||"Failed to save category")}catch(i){console.error("Failed to save category:",i),alert("Failed to save category")}finally{j(!1)}},z=async(e,i)=>{const t="up"===i?e-1:e+1;if(t<0||t>=o.length)return;const n=[...o];[n[e],n[t]]=[n[t],n[e]];const r=n.map((e,i)=>({id:e.id,display_order:i}));try{await(0,y.ff)("/api/product-ingredient-categories/reorder",{method:"PUT",body:JSON.stringify({orders:r})}),w()}catch(s){console.error("Failed to reorder:",s)}};return a?(0,v.jsx)(xi,{children:(0,v.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,v.jsxs)(xi,{children:[(0,v.jsxs)(Ai,{children:[(0,v.jsx)(wi,{children:"Ingredient Categories"}),(0,v.jsx)(c.cc,{variant:"primary",onClick:()=>E(),children:"Add Category"})]}),0===o.length?(0,v.jsxs)(d.pp,{children:[(0,v.jsx)(ki,{children:"No categories yet"}),(0,v.jsx)(Ci,{children:"Create categories to organize your ingredients"}),(0,v.jsx)(c.cc,{variant:"primary",onClick:()=>E(),children:"Add First Category"})]}):(0,v.jsx)(gi,{children:o.map((e,i)=>(0,v.jsxs)(hi,{isActive:e.is_active,children:[(0,v.jsx)(r.Xd,{onMoveUp:()=>z(i,"up"),onMoveDown:()=>z(i,"down"),disableUp:0===i,disableDown:i===o.length-1}),e.emoji&&(0,v.jsx)(mi,{children:e.emoji}),(0,v.jsxs)(yi,{children:[(0,v.jsx)(ji,{children:e.name}),(0,v.jsxs)(fi,{children:[(0,v.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),(0,v.jsx)(_i,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,v.jsx)(vi,{children:e.description})]}),(0,v.jsxs)(bi,{children:[(0,v.jsx)(Fi,{onClick:()=>E(e),title:"Edit",children:(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,v.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,v.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,v.jsx)(Fi,{onClick:()=>(async e=>{try{(await(0,y.ff)(`/api/product-ingredient-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&w()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,v.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,v.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,v.jsx)(Fi,{onClick:()=>(e=>{k(e),F(!0)})(e),title:"Delete",disabled:(e.ingredient_count||0)>0,children:(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,v.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,v.jsx)(u.aF,{isOpen:p,onClose:S,title:(g?"Edit":"New")+" Ingredient Category",size:"medium",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(u.yl,{variant:"secondary",onClick:S,children:"Cancel"}),(0,v.jsx)(u.yl,{variant:"primary",onClick:B,disabled:!C.name.trim()||m,children:m?"Saving...":g?"Update":"Create"})]}),children:(0,v.jsxs)("form",{onSubmit:B,children:[(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Category Name *"}),(0,v.jsx)(u.ZQ,{type:"text",value:C.name,onChange:e=>A({...C,name:e.target.value}),placeholder:"e.g., Proteins",autoFocus:!0,required:!0})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Icon"}),(0,v.jsx)(Ei,{children:["\ud83e\udd69","\ud83c\udf56","\ud83e\udd53","\ud83c\udf57","\ud83e\udd90","\ud83e\udd9e","\ud83e\udd80","\ud83d\udc1f","\ud83e\udd5a","\ud83e\uddc0","\ud83e\udd6c","\ud83e\udd66","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83e\udd52","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83c\udf4e","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd5d","\ud83c\udf4c","\ud83e\udd6d","\ud83c\udf4d","\ud83e\uddc8","\ud83e\udd5b","\ud83e\uddc2","\ud83c\udf6f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5a","\ud83c\udf5d","\ud83e\udd6b","\ud83e\uddca","\ud83d\udca7","\ud83c\udf76","\ud83e\uded7","\ud83e\uddf4","\ud83e\uddf9","\ud83e\uddfd","\ud83d\udce6","\ud83c\udff7\ufe0f","\ud83d\udd16"].map(e=>(0,v.jsx)(Si,{selected:C.emoji===e,onClick:()=>A({...C,emoji:e}),type:"button",children:e},e))})]}),(0,v.jsxs)(u.gE,{children:[(0,v.jsx)(u.lR,{children:"Description"}),(0,v.jsx)(u.Lz,{value:C.description,onChange:e=>A({...C,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,v.jsx)(f.A,{isOpen:b,onCancel:()=>{F(!1),k(null)},onConfirm:async()=>{if(_)try{const e=await(0,y.ff)(`/api/product-ingredient-categories/${_.id}`,{method:"DELETE"});e.success?(F(!1),k(null),w(),null===t||void 0===t||t()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:_?`Are you sure you want to delete "${_.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},zi=()=>{const{user:e}=(0,a.As)(),[i,t]=(0,s.M)("recipes"),[l,d]=(0,n.useState)(0),[c,p]=(0,n.useState)(0),[u,x]=(0,n.useState)(0),[g,h]=(0,n.useState)(0),[m,y]=(0,n.useState)(0),[j,f]=(0,n.useState)(0);return(null===e||void 0===e?void 0:e.brand_id)?(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(r.mc,{children:[(0,v.jsx)(r.Y9,{children:(0,v.jsx)(r.hE,{children:"Product Recipes"})}),(0,v.jsxs)(r.UC,{children:[(0,v.jsxs)(o.tU,{children:[(0,v.jsxs)(o.oz,{active:"recipes"===i,onClick:()=>t("recipes"),children:["Recipes",(0,v.jsx)(o.Ex,{count:l,showZero:!0})]}),(0,v.jsxs)(o.oz,{active:"ingredients"===i,onClick:()=>t("ingredients"),children:["Ingredients",(0,v.jsx)(o.Ex,{count:c,showZero:!0})]}),(0,v.jsxs)(o.oz,{active:"recipe-categories"===i,onClick:()=>t("recipe-categories"),children:["Recipe Categories",(0,v.jsx)(o.Ex,{count:u,showZero:!0})]}),(0,v.jsxs)(o.oz,{active:"ingredient-categories"===i,onClick:()=>t("ingredient-categories"),children:["Ingredient Categories",(0,v.jsx)(o.Ex,{count:g,showZero:!0})]})]}),(0,v.jsx)("div",{style:{display:"recipes"===i?"block":"none"},children:(0,v.jsx)(_e,{onCountChange:d,categoryRefreshKey:j})}),(0,v.jsx)("div",{style:{display:"ingredients"===i?"block":"none"},children:(0,v.jsx)(We,{onCountChange:p,categoryRefreshKey:m})}),(0,v.jsx)("div",{style:{display:"recipe-categories"===i?"block":"none"},children:(0,v.jsx)(ui,{onCountChange:x,onCategoryChange:()=>f(e=>e+1)})}),(0,v.jsx)("div",{style:{display:"ingredient-categories"===i?"block":"none"},children:(0,v.jsx)(Bi,{onCountChange:h,onCategoryChange:()=>y(e=>e+1)})})]})]})}):(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(r.mc,{children:[(0,v.jsx)(r.Y9,{children:(0,v.jsx)(r.hE,{children:"Product Recipes"})}),(0,v.jsx)(r.UC,{children:(0,v.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Brand not found. Please log in with a brand account."})})]})})}}}]);