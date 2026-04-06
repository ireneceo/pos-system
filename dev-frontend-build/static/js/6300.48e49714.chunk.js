"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6300],{1840:(e,i,t)=>{t.d(i,{ff:()=>o});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const r="";n();async function o(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${r}${e}`,n=localStorage.getItem("auth_token"),o={credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...i.headers},...i},s=await fetch(t,o);if(!s.ok){const e=await s.json().catch(()=>({message:"Network error"}));throw new Error(e.message||e.error||`HTTP error! status: ${s.status}`)}return s.json()}},6300:(e,i,t)=>{t.r(i),t.d(i,{default:()=>ni});var n=t(9950),r=t(8409),o=t(2597),s=t(2653),d=t(1367),a=t(4752),l=t(2853),c=t(3705),p=t(2488),x=t(9610),g=t(4877),u=t(9194),h=t(4021),m=t(6038),y=t(1840),j=t(251),f=t(7617),v=t(4414);const b=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,F=a.Ay.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,_=a.Ay.div`
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
`,A=a.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,w=(a.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,a.Ay.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`,a.Ay.div`
  flex: 1;
  min-width: 0;
`),k=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,C=a.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`,E=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,z=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,B=a.Ay.div``,S=a.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,R=a.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,I=a.Ay.div`
  flex: 1;
  min-height: 12px;
`,D=a.Ay.div`
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,P=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,T=a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,$=a.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,L=a.Ay.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #6B7280;
  margin: 8px 0;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
`,q=a.Ay.div`
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
`,N=a.Ay.div`
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
`,M=a.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,Q=a.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F6F9FC;\n          border: 1px solid #E6EBF1;\n          color: #6B7280;\n          &:hover {\n            border-color: #635BFF;\n            color: #635BFF;\n            background: #F4F3FF;\n            transform: translateY(-1px);\n          }\n        "}}}
`,U=a.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,W=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,O=(a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,a.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
`),Y=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Z=a.Ay.div`
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
`,V=a.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,H=a.Ay.button`
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
`,J=a.Ay.button`
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
`,X=a.Ay.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E5E7EB;
`,K=a.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,G=a.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,ee=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,ie=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 6px;
  max-height: 160px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: #FAFBFC;
`,te=a.Ay.button`
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
`,ne=a.Ay.div`
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
`,re=a.Ay.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  margin: auto 0;
`,oe=a.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`,se=a.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,de=a.Ay.button`
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
`,ae=a.Ay.div`
  padding: 24px;
`,le=a.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,ce=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,pe=a.Ay.span`
  font-size: 20px;
`,xe=a.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,ge=a.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,ue=a.Ay.div`
  margin-bottom: 24px;
`,he=a.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`,me=a.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,ye=a.Ay.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,je=a.Ay.span`
  font-size: 15px;
  color: #0A2540;
`,fe=a.Ay.span`
  font-size: 15px;
  font-weight: 600;
  color: #635BFF;
`,ve=a.Ay.p`
  font-size: 15px;
  color: #4B5563;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
`,be=a.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`,Fe=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`,_e=a.Ay.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`,Ae=a.Ay.div`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,we=(a.Ay.div`
  font-size: 80px;
  line-height: 1;
`,a.Ay.div`
  flex: 1;
`),ke=a.Ay.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,Ce=a.Ay.span`
  display: inline-block;
  padding: 6px 12px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
`,Ee=a.Ay.p`
  font-size: 15px;
  color: #6B7280;
  margin: 16px 0 0 0;
  line-height: 1.6;
`,ze=a.Ay.div`
  padding: 0;
  margin-bottom: 8px;
`,Be=a.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`,Se=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,Re=a.Ay.div`
  text-align: center;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,Ie=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,De=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,Pe=a.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`,Te=a.Ay.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #E6EBF1;
  }

  th {
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
  }

  td {
    font-size: 14px;
    color: #374151;
  }

  th:last-child, td:last-child {
    text-align: right;
  }

  tr:last-child td {
    border-bottom: none;
  }
`,$e=a.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  margin-top: 12px;
  border-top: 1px solid #E5E7EB;
  font-weight: 600;

  span:first-child {
    color: #6B7280;
  }

  span:last-child {
    color: #635BFF;
    font-size: 16px;
  }
`,Le=e=>{var i,t,r;let{onCountChange:o,categoryRefreshKey:s}=e;const{user:a}=(0,d.As)(),{defaultCurrency:Le}=(0,h.i1)(),[qe,Ne]=(0,n.useState)("RM"),[Me,Qe]=(0,n.useState)([]),[Ue,We]=(0,n.useState)([]),[Oe,Ye]=(0,n.useState)([]),[Ze,Ve]=(0,n.useState)(!0),[He,Je]=(0,n.useState)(""),[Xe,Ke]=(0,n.useState)("all"),[Ge,ei]=(0,n.useState)({}),[ii,ti]=(0,n.useState)(()=>"image"===localStorage.getItem("brandProductRecipesViewMode")?"image":"compact"),[ni,ri]=(0,n.useState)(!1),[oi,si]=(0,n.useState)(null),[di,ai]=(0,n.useState)(!1),[li,ci]=(0,n.useState)(!1),[pi,xi]=(0,n.useState)(null),[gi,ui]=(0,n.useState)({name:"",description:"",category_id:"",emoji:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),[hi,mi]=(0,n.useState)(null),[yi,ji]=(0,n.useState)([]),[fi,vi]=(0,n.useState)(!1),[bi,Fi]=(0,n.useState)(!1),[_i,Ai]=(0,n.useState)(null),wi=null===a||void 0===a?void 0:a.brand_id;(0,n.useEffect)(()=>{Le&&Ne(Le)},[Le]);const ki=(0,n.useCallback)(async()=>{if(wi)try{Ve(!0);const[t,n,r]=await Promise.all([(0,y.ff)("/api/product-recipes"),(0,y.ff)("/api/product-ingredients"),(0,y.ff)("/api/product-recipe-categories")]);var e;if(t.success)Qe(t.data||[]),null===o||void 0===o||o((null===(e=t.data)||void 0===e?void 0:e.length)||0);n.success&&We((n.data||[]).filter(e=>e.is_active)),r.success&&Ye(r.data||[]);try{const e=await(0,y.ff)("/api/brand-products"),i=e.data||e||[],t={};(Array.isArray(i)?i:[]).forEach(e=>{e.product_recipe_id&&(t[e.product_recipe_id]||(t[e.product_recipe_id]=[]),t[e.product_recipe_id].push(e.name))}),ei(t)}catch(i){}}catch(t){console.error("Failed to fetch data:",t)}finally{Ve(!1)}},[wi,o]);(0,n.useEffect)(()=>{ki()},[ki]),(0,n.useEffect)(()=>{s&&Ci()},[s]);const Ci=async()=>{try{const e=await(0,y.ff)("/api/product-recipe-categories");e.success&&Ye(e.data||[])}catch(e){console.error("Failed to fetch categories:",e)}},Ei=function(e){var i,t,n,r,o;(vi(arguments.length>1&&void 0!==arguments[1]&&arguments[1]),mi(null),e)?(si(e),ui({name:e.name,description:e.description||"",category_id:(null===(i=e.category_id)||void 0===i?void 0:i.toString())||"",emoji:e.emoji||"",image:e.image||"",yield_amount:(null===(t=e.yield_amount)||void 0===t?void 0:t.toString())||"1",yield_unit:e.yield_unit||"portion",prep_time:(null===(n=e.prep_time)||void 0===n?void 0:n.toString())||"",cook_time:(null===(r=e.cook_time)||void 0===r?void 0:r.toString())||"",instructions_summary:e.instructions_summary||"",instructions_detail:e.instructions_detail||"",suggested_price:(null===(o=e.suggested_price)||void 0===o?void 0:o.toString())||""}),e.recipeIngredients?ji(e.recipeIngredients.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""}))):ji([])):(si(null),ui({name:"",description:"",category_id:"",emoji:"",image:"",yield_amount:"1",yield_unit:"portion",prep_time:"",cook_time:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),ji([]));ri(!0)},zi=()=>{ci(!1),xi(null)},Bi=(e,i,t)=>{const n=[...yi];if(n[e]={...n[e],[i]:t},"ingredient_id"===i){const i=Ue.find(e=>e.id===t);i&&(n[e].unit=i.unit)}ji(n)},Si=()=>yi.reduce((e,i)=>{const t=Ue.find(e=>e.id===i.ingredient_id);if(t&&i.quantity){const n=t.base_quantity||1;return e+t.unit_cost/n*parseFloat(i.quantity)}return e},0),Ri=Me.filter(e=>{var i,t;const n=e.name.toLowerCase().includes(He.toLowerCase())||(null===(i=e.code)||void 0===i?void 0:i.toLowerCase().includes(He.toLowerCase())),r="all"===Xe||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===Xe;return n&&r});return Ze?(0,v.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,v.jsxs)(p.Qn,{style:{marginBottom:0,flex:1},children:[(0,v.jsx)(p.DO,{type:"text",placeholder:"Search recipes...",value:He,onChange:e=>Je(e.target.value)}),(0,v.jsxs)(p.Jt,{value:Xe,onChange:e=>Ke(e.target.value),children:[(0,v.jsx)("option",{value:"all",children:"All Categories"}),Oe.map(e=>(0,v.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,v.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[(0,v.jsxs)("div",{style:{display:"flex",background:"#F3F4F6",borderRadius:"6px",padding:"2px"},children:[(0,v.jsx)("button",{onClick:()=>{ti("compact"),localStorage.setItem("brandProductRecipesViewMode","compact")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"compact"===ii?"white":"transparent",color:"compact"===ii?"#0A2540":"#6B7C93",boxShadow:"compact"===ii?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Compact"}),(0,v.jsx)("button",{onClick:()=>{ti("image"),localStorage.setItem("brandProductRecipesViewMode","image")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"image"===ii?"white":"transparent",color:"image"===ii?"#0A2540":"#6B7C93",boxShadow:"image"===ii?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Image"})]}),(0,v.jsx)(c.cc,{variant:"primary",onClick:()=>Ei(),children:"Add Recipe"})]})]}),0===Ri.length?(0,v.jsxs)(l.pp,{children:[(0,v.jsx)(U,{children:"No recipes found"}),(0,v.jsx)(W,{children:"Create product recipes to track ingredient costs and manage production."}),(0,v.jsx)(c.cc,{variant:"primary",onClick:()=>Ei(),children:"Add First Recipe"})]}):(0,v.jsx)(b,{children:Ri.map(e=>{var i;return(0,v.jsxs)(_,{isActive:e.is_active,onClick:()=>Ei(e,!0),children:["image"===ii&&e.image&&(0,v.jsx)(F,{children:(0,v.jsx)("img",{src:e.image,alt:e.name})}),(0,v.jsx)(A,{children:(0,v.jsxs)(w,{children:[(0,v.jsx)(k,{children:e.name}),(0,v.jsx)(C,{children:(null===(i=e.category)||void 0===i?void 0:i.name)||"Uncategorized"})]})}),e.description&&(0,v.jsx)(E,{children:e.description}),(0,v.jsxs)(z,{children:[(0,v.jsxs)(B,{children:[(0,v.jsx)(S,{children:"Ingredient Cost"}),(0,v.jsx)(R,{children:(0,m.vv)(e.total_ingredient_cost||0,qe)})]}),(0,v.jsxs)(B,{children:[(0,v.jsx)(S,{children:"Suggested Price"}),(0,v.jsx)(R,{children:e.suggested_price?(0,m.vv)(e.suggested_price,qe):"-"})]})]}),(e.prep_time||e.cook_time)&&(0,v.jsxs)(L,{children:[e.prep_time&&(0,v.jsxs)(q,{children:[(0,v.jsx)("span",{children:"Prep:"}),(0,v.jsxs)("strong",{children:[e.prep_time," min"]})]}),e.cook_time&&(0,v.jsxs)(q,{children:[(0,v.jsx)("span",{children:"Cook:"}),(0,v.jsxs)("strong",{children:[e.cook_time," min"]})]}),e.prep_time&&e.cook_time&&(0,v.jsxs)(q,{children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsxs)("strong",{children:[e.prep_time+e.cook_time," min"]})]})]}),e.instructions_summary&&(0,v.jsx)(N,{children:e.instructions_summary}),(0,v.jsx)(I,{}),e.recipeIngredients&&e.recipeIngredients.length>0&&(0,v.jsxs)(D,{children:[(0,v.jsxs)(P,{children:[e.recipeIngredients.length," ingredient",e.recipeIngredients.length>1?"s":""]}),(0,v.jsxs)(T,{children:[e.recipeIngredients.slice(0,4).map((e,i)=>{var t;return(0,v.jsx)($,{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`},i)}),e.recipeIngredients.length>4&&(0,v.jsxs)($,{children:["+",e.recipeIngredients.length-4," more"]})]})]}),Ge[e.id]&&Ge[e.id].length>0&&(0,v.jsx)("div",{style:{marginTop:"8px",display:"flex",gap:"4px",flexWrap:"wrap"},children:Ge[e.id].map((e,i)=>(0,v.jsx)("span",{style:{fontSize:"11px",background:"#ECFDF5",color:"#059669",padding:"2px 8px",borderRadius:"4px",fontWeight:500},children:e},i))}),(0,v.jsxs)(M,{onClick:e=>e.stopPropagation(),children:[(0,v.jsx)(Q,{onClick:()=>(e=>{xi(e),ci(!0)})(e),children:"Recipe"}),(0,v.jsx)(Q,{variant:"primary",onClick:()=>Ei(e),children:"Edit"}),(0,v.jsx)(Q,{variant:"danger",onClick:()=>(e=>{Ai(e),Fi(!0)})(e),children:"Delete"})]})]},e.id)})}),(0,v.jsx)(x.aF,{isOpen:ni,onClose:()=>ri(!1),title:fi?"Recipe Details":oi?"Edit Recipe":"Add Recipe",size:"large",children:fi&&oi?(0,v.jsxs)(Fe,{children:[(0,v.jsxs)(_e,{children:[gi.image&&(0,v.jsx)(Ae,{children:(0,v.jsx)("img",{src:gi.image,alt:gi.name})}),(0,v.jsxs)(we,{children:[(0,v.jsx)(ke,{children:gi.name}),(0,v.jsxs)(Ce,{children:[null===(i=oi.category)||void 0===i?void 0:i.emoji," ",(null===(t=oi.category)||void 0===t?void 0:t.name)||"Uncategorized"]}),gi.description&&(0,v.jsx)(Ee,{children:gi.description})]})]}),(0,v.jsxs)(ze,{children:[(0,v.jsx)(Be,{children:"Cost & Time"}),(0,v.jsxs)(Se,{children:[(0,v.jsxs)(Re,{children:[(0,v.jsx)(Ie,{children:"Ingredient Cost"}),(0,v.jsx)(De,{children:(0,m.vv)(Number(oi.total_ingredient_cost||0),qe)})]}),(0,v.jsxs)(Re,{children:[(0,v.jsx)(Ie,{children:"Suggested Price"}),(0,v.jsx)(De,{children:(0,m.vv)(Number(gi.suggested_price||0),qe)})]}),gi.prep_time&&(0,v.jsxs)(Re,{children:[(0,v.jsx)(Ie,{children:"Prep Time"}),(0,v.jsxs)(De,{children:[gi.prep_time," min"]})]}),gi.cook_time&&(0,v.jsxs)(Re,{children:[(0,v.jsx)(Ie,{children:"Cook Time"}),(0,v.jsxs)(De,{children:[gi.cook_time," min"]})]})]})]}),gi.yield_amount&&"1"!==gi.yield_amount&&(0,v.jsxs)(ze,{children:[(0,v.jsx)(Be,{children:"Yield"}),(0,v.jsxs)("div",{style:{fontSize:"15px",color:"#374151"},children:[gi.yield_amount," ",(null===(r=j._W.find(e=>e.value===gi.yield_unit))||void 0===r?void 0:r.label)||gi.yield_unit,(0,v.jsxs)("span",{style:{marginLeft:"16px",color:"#6B7280",fontSize:"13px"},children:["(Cost per ",gi.yield_unit,": ",(0,m.vv)((0,j.zQ)(Si(),parseFloat(gi.yield_amount)||1,gi.yield_unit).cost,qe),")"]})]})]}),yi.length>0&&(0,v.jsxs)(ze,{children:[(0,v.jsxs)(Be,{children:["Ingredients (",yi.length,")"]}),(0,v.jsxs)(Te,{children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{children:[(0,v.jsx)("th",{children:"Ingredient"}),(0,v.jsx)("th",{children:"Quantity"}),(0,v.jsx)("th",{children:"Unit Cost"}),(0,v.jsx)("th",{children:"Subtotal"})]})}),(0,v.jsx)("tbody",{children:yi.map((e,i)=>{const t=Ue.find(i=>i.id===e.ingredient_id),n=(null===t||void 0===t?void 0:t.base_quantity)||1,r=((null===t||void 0===t?void 0:t.unit_cost)||0)/n,o=parseFloat(e.quantity)*r;return(0,v.jsxs)("tr",{children:[(0,v.jsx)("td",{children:(0,v.jsx)("strong",{children:(null===t||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`})}),(0,v.jsxs)("td",{children:[Number(e.quantity).toFixed(2)," ",e.unit]}),(0,v.jsxs)("td",{children:[(0,m.Qn)(qe)," ",r.toFixed(2),"/",null===t||void 0===t?void 0:t.unit]}),(0,v.jsx)("td",{children:(0,m.vv)(o,qe)})]},i)})})]}),(0,v.jsxs)($e,{children:[(0,v.jsx)("span",{children:"Total Ingredient Cost"}),(0,v.jsx)("span",{children:(0,m.vv)(Si(),qe)})]})]}),gi.instructions_summary&&(0,v.jsxs)(ze,{children:[(0,v.jsx)(Be,{children:"Recipe Summary"}),(0,v.jsx)(Pe,{children:gi.instructions_summary})]}),gi.instructions_detail&&(0,v.jsxs)(ze,{children:[(0,v.jsx)(Be,{children:"Detailed Instructions"}),(0,v.jsx)(Pe,{children:gi.instructions_detail})]}),Ge[oi.id]&&Ge[oi.id].length>0&&(0,v.jsxs)(ze,{children:[(0,v.jsxs)(Be,{children:["Connected Products (",Ge[oi.id].length,")"]}),(0,v.jsx)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:Ge[oi.id].map((e,i)=>(0,v.jsx)("span",{style:{fontSize:"13px",background:"#ECFDF5",color:"#059669",padding:"4px 12px",borderRadius:"6px",fontWeight:500},children:e},i))})]}),(0,v.jsxs)(ee,{children:[(0,v.jsx)(x.yl,{type:"button",variant:"secondary",onClick:()=>ri(!1),children:"Close"}),(0,v.jsx)(x.yl,{type:"button",variant:"primary",onClick:()=>vi(!1),children:"Edit"})]})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Recipe Name *"}),(0,v.jsx)(x.ZQ,{value:gi.name,onChange:e=>ui({...gi,name:e.target.value}),placeholder:"e.g., Grilled Chicken"})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Category"}),(0,v.jsxs)(x.FX,{value:gi.category_id,onChange:e=>ui({...gi,category_id:e.target.value}),children:[(0,v.jsx)("option",{value:"",children:"Select Category"}),Oe.map(e=>(0,v.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Emoji Icon"}),(0,v.jsx)(ie,{children:["\ud83c\udf56","\ud83c\udf72","\ud83c\udf5a","\ud83e\udd53","\ud83c\udf5c","\ud83c\udf57","\ud83e\udd5f","\ud83e\udd58","\ud83c\udf63","\ud83c\udf64","\ud83c\udf54","\ud83c\udf5f","\ud83c\udf5d","\ud83e\udd57","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf55","\ud83c\udf5e","\ud83e\udd50","\ud83e\udd56","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83e\udd69","\ud83c\udf59","\ud83c\udf58","\ud83c\udf65","\ud83c\udf62","\ud83c\udf60","\ud83e\udd60","\ud83e\uddc6","\u2615","\ud83c\udf75","\ud83e\udd64","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd5b","\ud83e\uddc3","\ud83e\uddcb","\ud83c\udf79","\ud83c\udf78","\ud83c\udf76","\ud83e\udd43","\ud83c\udf7e","\ud83e\uddc9","\ud83e\uded6","\ud83c\udf7c","\ud83e\uddca","\ud83c\udf70","\ud83c\udf68","\ud83c\udf61","\ud83c\udf6e","\ud83c\udf69","\ud83c\udf6a","\ud83e\uddc1","\ud83c\udf6b","\ud83c\udf6c","\ud83e\udd67","\ud83c\udf6d","\ud83c\udf6f","\ud83e\udd6e","\ud83c\udf66","\ud83c\udf67","\ud83c\udf82","\ud83e\udd5c","\ud83c\udf30","\ud83e\udd65","\ud83c\udf53","\ud83c\udf47","\ud83c\udf48","\ud83c\udf49","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf4c","\ud83c\udf4d","\ud83e\udd6d","\ud83c\udf4e","\ud83c\udf4f","\ud83c\udf50","\ud83c\udf51","\ud83c\udf52","\ud83e\udd5d","\ud83c\udf45","\ud83e\udd51","\ud83c\udf36\ufe0f","\ud83e\udd52","\ud83e\udd6c","\ud83e\udd66","\ud83e\uddc4","\ud83e\uddc5","\ud83c\udf3d","\ud83e\udd55","\ud83e\udd54","\ud83c\udf44","\ud83d\udccb"].map(e=>(0,v.jsx)(te,{type:"button",selected:gi.emoji===e,onClick:()=>ui({...gi,emoji:e}),children:e},e))})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Recipe Image"}),(0,v.jsx)(g.A,{value:gi.image,onChange:e=>ui({...gi,image:e}),label:"Drop recipe image here or click to upload"})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Description"}),(0,v.jsx)(x.Lz,{value:gi.description,onChange:e=>ui({...gi,description:e.target.value}),placeholder:"Brief description of the recipe",rows:2})]}),(0,v.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px"},children:[(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Prep Time (min)"}),(0,v.jsx)(x.ZQ,{type:"number",min:"0",value:gi.prep_time,onChange:e=>ui({...gi,prep_time:e.target.value})})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Cook Time (min)"}),(0,v.jsx)(x.ZQ,{type:"number",min:"0",value:gi.cook_time,onChange:e=>ui({...gi,cook_time:e.target.value})})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsxs)(x.lR,{children:["Suggested Price (",qe,")"]}),(0,v.jsx)(x.ZQ,{type:"number",step:"0.01",min:"0",value:gi.suggested_price,onChange:e=>ui({...gi,suggested_price:e.target.value})})]})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Recipe Summary"}),(0,v.jsx)(x.Lz,{value:gi.instructions_summary,onChange:e=>ui({...gi,instructions_summary:e.target.value}),placeholder:"Brief summary for list display (e.g., Pan-fried chicken with garlic sauce)",rows:2})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Detailed Instructions"}),(0,v.jsx)(x.Lz,{value:gi.instructions_detail,onChange:e=>ui({...gi,instructions_detail:e.target.value}),placeholder:"Step-by-step cooking instructions...\n1. Prepare ingredients...\n2. Heat the pan...\n3. ...",rows:6})]}),(0,v.jsx)(O,{children:"Yield (Production Amount)"}),(0,v.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"16px"},children:[(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Yield Amount *"}),(0,v.jsx)(x.ZQ,{type:"number",step:"0.01",min:"0.01",value:gi.yield_amount,onChange:e=>ui({...gi,yield_amount:e.target.value}),placeholder:"e.g., 10"})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Yield Unit *"}),(0,v.jsx)(x.FX,{value:gi.yield_unit,onChange:e=>ui({...gi,yield_unit:e.target.value}),children:j._W.map(e=>(0,v.jsx)("option",{value:e.value,children:e.label},e.value))})]})]}),(0,v.jsx)(O,{children:"Ingredients"}),(0,v.jsx)(J,{onClick:()=>{ji([...yi,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),yi.length>0&&(0,v.jsxs)(Y,{children:[(0,v.jsxs)(Z,{children:[(0,v.jsx)("span",{children:"Ingredient"}),(0,v.jsx)("span",{children:"Quantity"}),(0,v.jsx)("span",{children:"Unit"}),(0,v.jsx)("span",{children:"Notes"}),(0,v.jsx)("span",{})]}),yi.map((e,i)=>(0,v.jsxs)(V,{children:[(0,v.jsx)(u.A,{options:Ue.map(e=>{const i=e.unit_cost/(e.base_quantity||1);return{value:e.id,label:e.name,subLabel:`${(0,m.Qn)(qe)} ${i.toFixed(2)}/${e.unit}`}}),value:e.ingredient_id||null,onChange:e=>Bi(i,"ingredient_id",e),placeholder:"Search ingredient..."}),(0,v.jsx)(x.ZQ,{type:"number",step:"0.01",min:"0",placeholder:"Qty",value:e.quantity,onChange:e=>Bi(i,"quantity",e.target.value)}),(0,v.jsx)(x.ZQ,{value:e.unit,disabled:!0,style:{background:"#F3F4F6",color:"#6B7280"}}),(0,v.jsx)(x.ZQ,{value:e.notes,onChange:e=>Bi(i,"notes",e.target.value),placeholder:"Notes"}),(0,v.jsx)(H,{onClick:()=>(e=>{ji(yi.filter((i,t)=>t!==e))})(i),children:"\xd7"})]},i))]}),(0,v.jsxs)(X,{children:[(0,v.jsx)(K,{children:"Total Ingredient Cost"}),(0,v.jsx)(G,{children:(0,m.vv)(Si(),qe)})]}),(0,v.jsxs)(X,{style:{marginTop:"8px"},children:[(0,v.jsxs)(K,{children:["Cost per ",gi.yield_unit]}),(0,v.jsx)(G,{children:(0,m.vv)((0,j.zQ)(Si(),parseFloat(gi.yield_amount)||1,gi.yield_unit).cost,qe)})]}),hi&&(0,v.jsx)(x.IM,{children:hi}),(0,v.jsxs)(ee,{children:[(0,v.jsx)(x.yl,{variant:"secondary",onClick:()=>ri(!1),children:"Cancel"}),(0,v.jsx)(x.yl,{variant:"primary",onClick:async()=>{if(mi(null),gi.name.trim())if(!gi.yield_amount||parseFloat(gi.yield_amount)<=0)mi("Yield amount must be greater than 0");else try{ai(!0);const e={name:gi.name,description:gi.description||null,category_id:gi.category_id?parseInt(gi.category_id):null,emoji:gi.emoji||null,image:gi.image||null,yield_amount:parseFloat(gi.yield_amount)||1,yield_unit:gi.yield_unit||"portion",prep_time:gi.prep_time?parseInt(gi.prep_time):null,cook_time:gi.cook_time?parseInt(gi.cook_time):null,instructions_summary:gi.instructions_summary||null,instructions_detail:gi.instructions_detail||null,suggested_price:gi.suggested_price?parseFloat(gi.suggested_price):null,ingredients:yi.filter(e=>e.ingredient_id&&e.quantity).map(e=>{const i=Ue.find(i=>i.id===e.ingredient_id),t=i&&(0,j.jr)(i.unit_cost/(i.base_quantity||1),i.unit,parseFloat(e.quantity),e.unit)||0;return{ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,cost:t,notes:e.notes||null}})},i=oi?`/api/product-recipes/${oi.id}`:"/api/product-recipes",t=oi?"PUT":"POST",n=await(0,y.ff)(i,{method:t,body:JSON.stringify(e)});n.success?(ri(!1),mi(null),ki()):mi(n.error||"Failed to save recipe")}catch(e){console.error("Failed to save recipe:",e),mi("Failed to save recipe")}finally{ai(!1)}else mi("Recipe name is required")},disabled:di,children:di?"Saving...":"Save Recipe"})]})]})}),li&&pi&&(0,v.jsx)(ne,{onClick:zi,children:(0,v.jsxs)(re,{onClick:e=>e.stopPropagation(),children:[(0,v.jsxs)(oe,{children:[(0,v.jsx)(se,{children:pi.name}),(0,v.jsx)(de,{onClick:zi,children:"\xd7"})]}),(0,v.jsxs)(ae,{children:[(pi.prep_time||pi.cook_time)&&(0,v.jsxs)(le,{children:[pi.prep_time&&(0,v.jsxs)(ce,{children:[(0,v.jsx)(pe,{children:"\u23f1"}),(0,v.jsx)(xe,{children:"Prep:"}),(0,v.jsxs)(ge,{children:[pi.prep_time," min"]})]}),pi.cook_time&&(0,v.jsxs)(ce,{children:[(0,v.jsx)(pe,{children:"\ud83d\udd25"}),(0,v.jsx)(xe,{children:"Cook:"}),(0,v.jsxs)(ge,{children:[pi.cook_time," min"]})]})]}),pi.recipeIngredients&&pi.recipeIngredients.length>0&&(0,v.jsxs)(ue,{children:[(0,v.jsx)(he,{children:"Ingredients"}),(0,v.jsx)(me,{children:pi.recipeIngredients.map((e,i)=>{var t;return(0,v.jsxs)(ye,{children:[(0,v.jsx)(je,{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`}),(0,v.jsxs)(fe,{children:[Number(e.quantity).toFixed(2)," ",e.unit]})]},i)})})]}),pi.instructions_summary&&(0,v.jsxs)(ue,{children:[(0,v.jsx)(he,{children:"Summary"}),(0,v.jsx)(ve,{children:pi.instructions_summary})]}),pi.instructions_detail&&(0,v.jsxs)(ue,{children:[(0,v.jsx)(he,{children:"Detailed Instructions"}),(0,v.jsx)(be,{children:pi.instructions_detail})]}),Ge[pi.id]&&Ge[pi.id].length>0&&(0,v.jsxs)(ue,{children:[(0,v.jsx)(he,{children:"Connected Products"}),(0,v.jsx)("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:Ge[pi.id].map((e,i)=>(0,v.jsx)("span",{style:{fontSize:"13px",background:"#ECFDF5",color:"#059669",padding:"4px 12px",borderRadius:"6px",fontWeight:500},children:e},i))})]})]})]})}),(0,v.jsx)(f.A,{isOpen:bi,title:"Delete Recipe",message:`Delete "${null===_i||void 0===_i?void 0:_i.name}"? This action cannot be undone.`,onConfirm:async()=>{if(_i){Fi(!1);try{const e=await(0,y.ff)(`/api/product-recipes/${_i.id}`,{method:"DELETE"});e.success?ki():console.error("Failed to delete recipe:",e.error)}catch(e){console.error("Failed to delete recipe:",e)}Ai(null)}},onCancel:()=>{Fi(!1),Ai(null)},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},qe=a.Ay.div`
  padding: 24px 0;
`,Ne=a.Ay.div`
  display: grid;
  gap: 12px;
`,Me=a.Ay.div`
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
`,Qe=a.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,Ue=a.Ay.div`
  flex: 1;
`,We=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Oe=a.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,Ye=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,Ze=a.Ay.div`
  display: flex;
  gap: 8px;
`,Ve=a.Ay.button`
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
`,He=a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,Je=a.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Xe=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,Ke=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,Ge=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,ei=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,ii=a.Ay.button`
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
`,ti=e=>{let{onCountChange:i,onCategoryChange:t}=e;const[o,s]=(0,n.useState)([]),[d,a]=(0,n.useState)(!0),[p,g]=(0,n.useState)(!1),[u,h]=(0,n.useState)(null),[m,j]=(0,n.useState)(!1),[b,F]=(0,n.useState)(!1),[_,A]=(0,n.useState)(null),[w,k]=(0,n.useState)({name:"",emoji:"",description:""}),C=(0,n.useCallback)(async()=>{try{a(!0);const t=await(0,y.ff)("/api/product-recipe-categories");var e;if(t.success)s(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{a(!1)}},[i]);(0,n.useEffect)(()=>{C()},[C]);const E=e=>{e?(h(e),k({name:e.name,emoji:e.emoji||"",description:e.description||""})):(h(null),k({name:"",emoji:"",description:""})),g(!0)},z=()=>{g(!1),h(null),k({name:"",emoji:"",description:""})},B=async e=>{if(e.preventDefault(),w.name.trim())try{j(!0);const e=u?`/api/product-recipe-categories/${u.id}`:"/api/product-recipe-categories",i=u?"PUT":"POST",n=await(0,y.ff)(e,{method:i,body:JSON.stringify({name:w.name.trim(),emoji:w.emoji||null,description:w.description.trim()||null})});n.success?(z(),C(),null===t||void 0===t||t()):alert(n.error||"Failed to save category")}catch(i){console.error("Failed to save category:",i),alert("Failed to save category")}finally{j(!1)}},S=async(e,i)=>{const t="up"===i?e-1:e+1;if(t<0||t>=o.length)return;const n=[...o];[n[e],n[t]]=[n[t],n[e]];const r=n.map((e,i)=>({id:e.id,display_order:i}));try{await(0,y.ff)("/api/product-recipe-categories/reorder",{method:"PUT",body:JSON.stringify({orders:r})}),C()}catch(s){console.error("Failed to reorder:",s)}};return d?(0,v.jsx)(qe,{children:(0,v.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,v.jsxs)(qe,{children:[(0,v.jsxs)(Ke,{children:[(0,v.jsx)(Ge,{children:"Recipe Categories"}),(0,v.jsx)(c.cc,{variant:"primary",onClick:()=>E(),children:"Add Category"})]}),0===o.length?(0,v.jsxs)(l.pp,{children:[(0,v.jsx)(Je,{children:"No categories yet"}),(0,v.jsx)(Xe,{children:"Create categories to organize your product recipes"}),(0,v.jsx)(c.cc,{variant:"primary",onClick:()=>E(),children:"Add First Category"})]}):(0,v.jsx)(Ne,{children:o.map((e,i)=>(0,v.jsxs)(Me,{isActive:e.is_active,children:[(0,v.jsx)(r.Xd,{onMoveUp:()=>S(i,"up"),onMoveDown:()=>S(i,"down"),disableUp:0===i,disableDown:i===o.length-1}),e.emoji&&(0,v.jsx)(Qe,{children:e.emoji}),(0,v.jsxs)(Ue,{children:[(0,v.jsx)(We,{children:e.name}),(0,v.jsxs)(Oe,{children:[(0,v.jsxs)("span",{children:[e.recipe_count||0," recipes"]}),(0,v.jsx)(He,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,v.jsx)(Ye,{children:e.description})]}),(0,v.jsxs)(Ze,{children:[(0,v.jsx)(Ve,{onClick:()=>E(e),title:"Edit",children:(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,v.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,v.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,v.jsx)(Ve,{onClick:()=>(async e=>{try{(await(0,y.ff)(`/api/product-recipe-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&C()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,v.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,v.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,v.jsx)(Ve,{onClick:()=>(e=>{A(e),F(!0)})(e),title:"Delete",disabled:(e.recipe_count||0)>0,children:(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,v.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,v.jsx)(x.aF,{isOpen:p,onClose:z,title:(u?"Edit":"New")+" Recipe Category",size:"medium",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(x.yl,{variant:"secondary",onClick:z,children:"Cancel"}),(0,v.jsx)(x.yl,{variant:"primary",onClick:B,disabled:!w.name.trim()||m,children:m?"Saving...":u?"Update":"Create"})]}),children:(0,v.jsxs)("form",{onSubmit:B,children:[(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Category Name *"}),(0,v.jsx)(x.ZQ,{type:"text",value:w.name,onChange:e=>k({...w,name:e.target.value}),placeholder:"e.g., Main Dishes",autoFocus:!0,required:!0})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Icon"}),(0,v.jsx)(ei,{children:["\ud83c\udf54","\ud83c\udf55","\ud83c\udf57","\ud83e\udd57","\ud83c\udf5c","\ud83c\udf5d","\ud83c\udf64","\ud83e\udd58","\ud83c\udf5b","\ud83c\udf72","\u2615","\ud83e\udd64","\ud83e\uddc3","\ud83c\udf75","\ud83e\uddcb","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd43","\ud83c\udf79","\ud83c\udf78","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf68","\ud83c\udf67","\ud83c\udf66","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6b","\ud83e\udd50","\ud83e\udd56","\ud83c\udf5e","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf71","\ud83c\udf59","\ud83c\udf58","\ud83c\udf63","\ud83c\udf65","\ud83c\udf61","\ud83c\udf62","\ud83c\udf60","\ud83e\udd5f","\ud83e\udd60","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf5f","\ud83e\uded3","\ud83e\udd53","\ud83e\uddc6"].map(e=>(0,v.jsx)(ii,{selected:w.emoji===e,onClick:()=>k({...w,emoji:e}),type:"button",children:e},e))})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Description"}),(0,v.jsx)(x.Lz,{value:w.description,onChange:e=>k({...w,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,v.jsx)(f.A,{isOpen:b,onCancel:()=>{F(!1),A(null)},onConfirm:async()=>{if(_)try{const e=await(0,y.ff)(`/api/product-recipe-categories/${_.id}`,{method:"DELETE"});e.success?(F(!1),A(null),C(),null===t||void 0===t||t()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:_?`Are you sure you want to delete "${_.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},ni=()=>{const{user:e}=(0,d.As)(),[i,t]=(0,s.M)("recipes"),[a,l]=(0,n.useState)(0),[c,p]=(0,n.useState)(0),[x,g]=(0,n.useState)(0);return(null===e||void 0===e?void 0:e.brand_id)?(0,v.jsxs)(r.mc,{children:[(0,v.jsx)(r.Y9,{children:(0,v.jsx)(r.hE,{children:"Product Recipes"})}),(0,v.jsxs)(r.UC,{children:[(0,v.jsxs)(o.tU,{children:[(0,v.jsxs)(o.oz,{active:"recipes"===i,onClick:()=>t("recipes"),children:["Recipes ",(0,v.jsx)(o.Ex,{count:a,showZero:!0})]}),(0,v.jsxs)(o.oz,{active:"recipe-categories"===i,onClick:()=>t("recipe-categories"),children:["Recipe Categories ",(0,v.jsx)(o.Ex,{count:c,showZero:!0})]})]}),(0,v.jsx)("div",{style:{display:"recipes"===i?"block":"none"},children:(0,v.jsx)(Le,{onCountChange:l,categoryRefreshKey:x})}),(0,v.jsx)("div",{style:{display:"recipe-categories"===i?"block":"none"},children:(0,v.jsx)(ti,{onCountChange:p,onCategoryChange:()=>g(e=>e+1)})})]})]}):(0,v.jsxs)(r.mc,{children:[(0,v.jsx)(r.Y9,{children:(0,v.jsx)(r.hE,{children:"Product Recipes"})}),(0,v.jsx)(r.UC,{children:(0,v.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Brand not found. Please log in with a brand account."})})]})}}}]);