"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2495],{1840:(e,t,n)=>{n.d(t,{ff:()=>o});function r(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",r()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const i="";r();async function o(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=`${i}${e}`,r=localStorage.getItem("auth_token"),o={credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{},...t.headers},...t},a=await fetch(n,o);if(!a.ok){const e=await a.json().catch(()=>({message:"Network error"}));throw new Error(e.message||e.error||`HTTP error! status: ${a.status}`)}return a.json()}},2488:(e,t,n)=>{n.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});n(9950);var r=n(4752),i=n(4414);const o=r.Ay.div`
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
`,a=r.Ay.input`
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
`,s=r.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

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
`,d=r.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,l=r.Ay.select`
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
`,c=e=>{let{children:t,className:n,style:r,...a}=e;return(0,i.jsx)(o,{className:n,style:r,...a,children:t})},p=e=>{let{placeholder:t="Search...",value:n,onChange:r,style:o,...l}=e;return(0,i.jsxs)(s,{style:o,children:[(0,i.jsx)(a,{placeholder:t,value:n,onChange:r,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:n?"36px":"16px"},...l}),n&&(0,i.jsx)(d,{type:"button",onClick:()=>null===r||void 0===r?void 0:r({target:{value:""}}),"aria-label":"Clear search",children:(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,i.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...n}=e;return(0,i.jsx)(l,{...n,children:t})}},2495:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ce});var r=n(9950),i=n(4752),o=n(4492),a=n(8409),s=n(2597),d=n(2653),l=n(1367),c=n(2853),p=n(3705),x=n(2488),u=n(9610),g=n(7617),h=n(1840),m=n(4021),y=n(6038),b=n(4414);const f=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,v=i.Ay.div`
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
`,j=i.Ay.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
`,k=i.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,F=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,w=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,C=i.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,_=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-top: 12px;
`,A=i.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`,E=i.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
`,B=i.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
`,S=i.Ay.span`
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

  ${B}:checked + & {
    background-color: #635BFF;
  }

  ${B}:checked + &:before {
    transform: translateX(22px);
  }
`,z=i.Ay.div`
  margin: 12px 0;
  flex: 1;
`,I=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,$=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,D=i.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,R=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,N=i.Ay.button`
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
`,T=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,L=i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,O=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,U=(i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,i.Ay.div`
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
`),M=i.Ay.div`
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`,q=i.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"out"===e.status?"#FEE2E2":"low"===e.status?"#FEF3C7":"#ECFDF5"};
  color: ${e=>"out"===e.status?"#DC2626":"low"===e.status?"#D97706":"#059669"};
`,W=e=>{let{onCountChange:t,categoryRefreshKey:n}=e;const{defaultCurrency:i}=(0,m.i1)(),[o,a]=(0,r.useState)("RM"),[s,d]=(0,r.useState)([]),[l,W]=(0,r.useState)([]),[P,Y]=(0,r.useState)(!0),[Q,Z]=(0,r.useState)(""),[J,V]=(0,r.useState)("all"),[H,X]=(0,r.useState)(!1),[K,G]=(0,r.useState)(null),[ee,te]=(0,r.useState)(!1),[ne,re]=(0,r.useState)(()=>"image"===localStorage.getItem("brandIngredientsViewMode")?"image":"compact"),[ie,oe]=(0,r.useState)(null),[ae,se]=(0,r.useState)(!1),[de,le]=(0,r.useState)({recipes:[],products:[]}),[ce,pe]=(0,r.useState)({isOpen:!1,ingredientId:null,ingredientName:""}),[xe,ue]=(0,r.useState)({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0});(0,r.useEffect)(()=>{i&&a(i)},[i]);const ge=(0,r.useCallback)(async()=>{try{Y(!0);const[n,r]=await Promise.all([(0,h.ff)("/api/product-ingredients"),(0,h.ff)("/api/product-ingredient-categories")]);var e;if(n.success)d(n.data||[]),null===t||void 0===t||t((null===(e=n.data)||void 0===e?void 0:e.length)||0);r.success&&W(r.data||[])}catch(n){console.error("Failed to fetch data:",n)}finally{Y(!1)}},[t]);(0,r.useEffect)(()=>{ge()},[ge,n]);const he=e=>{var t;e?(G(e),ue({name:e.name,category_id:(null===(t=e.category_id)||void 0===t?void 0:t.toString())||"",image_url:e.image_url||"",unit:e.unit,base_quantity:e.base_quantity.toString(),unit_cost:e.unit_cost.toString(),supplier_name:e.supplier_name||"",min_stock:e.min_stock.toString(),min_order:e.min_order.toString(),current_stock:e.current_stock.toString(),track_stock:e.track_stock})):(G(null),ue({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0}));X(!0)},me=()=>{X(!1),G(null),ue({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0})},ye=e=>e.track_stock?e.current_stock<=0?"out":e.current_stock<=e.min_stock?"low":"normal":"normal",be=s.filter(e=>{var t;const n=e.name.toLowerCase().includes(Q.toLowerCase())||e.code.toLowerCase().includes(Q.toLowerCase()),r="all"===J||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===J;return n&&r}),fe=[{id:"all",name:"All Categories"},...l.map(e=>({id:e.id.toString(),name:e.name}))];return P?(0,b.jsx)(c.pp,{children:(0,b.jsx)(L,{children:"Loading..."})}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,b.jsxs)(x.Qn,{style:{marginBottom:0,flex:1},children:[(0,b.jsx)(x.DO,{type:"text",placeholder:"Search ingredients...",value:Q,onChange:e=>Z(e.target.value)}),(0,b.jsx)(x.Jt,{value:J,onChange:e=>V(e.target.value),children:fe.map(e=>(0,b.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,b.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[(0,b.jsxs)("div",{style:{display:"flex",background:"#F3F4F6",borderRadius:"6px",padding:"2px"},children:[(0,b.jsx)("button",{onClick:()=>{re("compact"),localStorage.setItem("brandIngredientsViewMode","compact")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"compact"===ne?"white":"transparent",color:"compact"===ne?"#0A2540":"#6B7C93",boxShadow:"compact"===ne?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Compact"}),(0,b.jsx)("button",{onClick:()=>{re("image"),localStorage.setItem("brandIngredientsViewMode","image")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"image"===ne?"white":"transparent",color:"image"===ne?"#0A2540":"#6B7C93",boxShadow:"image"===ne?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Image"})]}),(0,b.jsx)(p.cc,{variant:"primary",onClick:()=>he(),children:"New Ingredient"})]})]}),0===be.length?(0,b.jsxs)(c.pp,{children:[(0,b.jsx)(L,{children:"No ingredients found"}),(0,b.jsx)(O,{children:Q||"all"!==J?"Try adjusting your filters":"Add ingredients to use in your product recipes"}),!Q&&"all"===J&&(0,b.jsx)(p.cc,{variant:"primary",onClick:()=>he(),children:"Create First Ingredient"})]}):(0,b.jsx)(f,{children:be.map(e=>{var t,n;return(0,b.jsxs)(v,{isActive:e.is_active,onClick:()=>{oe(e),se(!0),le({recipes:[],products:[]});const t=localStorage.getItem("auth_token");fetch(`/api/product-ingredients/${e.id}/usage`,{headers:{Authorization:`Bearer ${t}`}}).then(e=>e.json()).then(e=>{e.success&&le(e.data)}).catch(()=>{})},children:["image"===ne&&e.image_url&&(0,b.jsx)(j,{children:(0,b.jsx)(k,{src:e.image_url,alt:e.name})}),(0,b.jsx)(F,{children:(0,b.jsxs)("div",{children:[(0,b.jsx)(w,{children:e.name}),(0,b.jsxs)(C,{children:[null===(t=e.category)||void 0===t?void 0:t.emoji," ",(null===(n=e.category)||void 0===n?void 0:n.name)||"Uncategorized"]})]})}),(0,b.jsxs)(z,{children:[(0,b.jsxs)(I,{children:[(0,b.jsx)($,{children:"Unit Cost"}),(0,b.jsx)(D,{children:(0,y.vv)(Number(e.unit_cost),o)})]}),(0,b.jsxs)(I,{children:[(0,b.jsx)($,{children:"Base Qty / Unit"}),(0,b.jsxs)(D,{children:[Number(e.base_quantity||1)," ",e.unit]})]}),e.supplier_name&&(0,b.jsxs)(I,{children:[(0,b.jsx)($,{children:"Supplier"}),(0,b.jsx)(D,{children:e.supplier_name})]}),e.code&&(0,b.jsxs)(I,{children:[(0,b.jsx)($,{children:"Code"}),(0,b.jsx)(D,{children:e.code})]}),e.track_stock&&(0,b.jsxs)(I,{children:[(0,b.jsx)($,{children:"Stock"}),(0,b.jsxs)(q,{status:ye(e),children:[e.current_stock," ",e.unit]})]})]}),(0,b.jsxs)(_,{children:[(0,b.jsx)(A,{children:"Track in Inventory"}),(0,b.jsxs)(E,{children:[(0,b.jsx)(B,{type:"checkbox",checked:e.track_stock||!1,onChange:t=>{t.stopPropagation(),(async(e,t)=>{try{const n=await(0,h.ff)(`/api/product-ingredients/${e.id}`,{method:"PUT",body:JSON.stringify({name:e.name,category_id:e.category_id,image_url:e.image_url,unit:e.unit,base_quantity:e.base_quantity,unit_cost:e.unit_cost,supplier_name:e.supplier_name,min_stock:e.min_stock,min_order:e.min_order,current_stock:e.current_stock,is_active:e.is_active,track_stock:t})});n.success?d(n=>n.map(n=>n.id===e.id?{...n,track_stock:t}:n)):alert(n.error||"Failed to update track stock")}catch(n){console.error("Failed to toggle track stock:",n)}})(e,t.target.checked)}}),(0,b.jsx)(S,{})]})]}),(0,b.jsxs)(R,{children:[(0,b.jsx)(N,{variant:"secondary",onClick:t=>{t.stopPropagation(),he(e)},children:"Edit"}),(0,b.jsx)(N,{variant:"danger",onClick:t=>{t.stopPropagation(),(e=>{pe({isOpen:!0,ingredientId:e.id,ingredientName:e.name})})(e)},children:"Delete"})]})]},e.id)})}),(0,b.jsx)(u.aF,{isOpen:H,onClose:me,title:K?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,b.jsxs)("form",{onSubmit:e=>{e.preventDefault(),(async()=>{if(xe.name.trim()&&xe.unit.trim())try{te(!0);const e=K?`/api/product-ingredients/${K.id}`:"/api/product-ingredients",t=K?"PUT":"POST",n=await(0,h.ff)(e,{method:t,body:JSON.stringify({name:xe.name,category_id:xe.category_id?parseInt(xe.category_id):null,image_url:xe.image_url||null,unit:xe.unit,base_quantity:parseFloat(xe.base_quantity)||1,unit_cost:parseFloat(xe.unit_cost)||0,supplier_name:xe.supplier_name||null,min_stock:parseFloat(xe.min_stock)||0,min_order:parseFloat(xe.min_order)||0,current_stock:parseFloat(xe.current_stock)||0,track_stock:xe.track_stock})});n.success?(me(),ge()):alert(n.error||"Failed to save ingredient")}catch(e){console.error("Failed to save ingredient:",e),alert("Failed to save ingredient")}finally{te(!1)}else alert("Name and Unit are required")})()},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Image"}),(0,b.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(n){const e=new FileReader;e.onloadend=()=>{ue({...xe,image_url:e.result})},e.readAsDataURL(n)}},style:{display:"none"},id:"ingredient-image-upload"}),(0,b.jsx)(U,{onClick:()=>{var e;return null===(e=document.getElementById("ingredient-image-upload"))||void 0===e?void 0:e.click()},children:xe.image_url?(0,b.jsx)("img",{src:xe.image_url,alt:"Ingredient"}):(0,b.jsx)(M,{children:"Click to upload image"})})]}),(0,b.jsxs)(u.fh,{children:[(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Ingredient Name *"}),(0,b.jsx)(u.ZQ,{type:"text",value:xe.name,onChange:e=>ue({...xe,name:e.target.value}),placeholder:"e.g., Chicken Breast",required:!0})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Category"}),(0,b.jsxs)(u.FX,{value:xe.category_id,onChange:e=>ue({...xe,category_id:e.target.value}),children:[(0,b.jsx)("option",{value:"",children:"Select category..."}),l.map(e=>(0,b.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]})]}),(0,b.jsxs)(u.fh,{children:[(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Base Quantity *"}),(0,b.jsx)(u.ZQ,{type:"number",step:"0.01",min:"0.01",value:xe.base_quantity,onChange:e=>ue({...xe,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Unit *"}),(0,b.jsxs)(u.FX,{value:xe.unit,onChange:e=>ue({...xe,unit:e.target.value}),required:!0,children:[(0,b.jsx)("option",{value:"",children:"Select unit..."}),(0,b.jsx)("option",{value:"kg",children:"kg"}),(0,b.jsx)("option",{value:"g",children:"g"}),(0,b.jsx)("option",{value:"L",children:"L"}),(0,b.jsx)("option",{value:"ml",children:"ml"}),(0,b.jsx)("option",{value:"piece",children:"piece"}),(0,b.jsx)("option",{value:"pack",children:"pack"}),(0,b.jsx)("option",{value:"can",children:"can"}),(0,b.jsx)("option",{value:"bottle",children:"bottle"})]})]})]}),(0,b.jsxs)(u.fh,{children:[(0,b.jsxs)(u.gE,{children:[(0,b.jsxs)(u.lR,{children:["Unit Cost (",o,") *"]}),(0,b.jsx)(u.ZQ,{type:"number",step:"0.01",min:"0",value:xe.unit_cost,onChange:e=>ue({...xe,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Supplier"}),(0,b.jsx)(u.ZQ,{type:"text",value:xe.supplier_name,onChange:e=>ue({...xe,supplier_name:e.target.value}),placeholder:"Supplier name"})]})]}),(0,b.jsxs)(T,{children:[(0,b.jsx)(u.yl,{type:"button",variant:"secondary",onClick:me,children:"Cancel"}),(0,b.jsx)(u.yl,{type:"submit",variant:"primary",disabled:ee,children:ee?"Saving...":K?"Update Ingredient":"Create Ingredient"})]})]})}),(0,b.jsx)(g.A,{isOpen:ce.isOpen,title:"Delete Ingredient",message:`Are you sure you want to delete "${ce.ingredientName}"? This action cannot be undone.`,onConfirm:async()=>{if(ce.ingredientId)try{const e=await(0,h.ff)(`/api/product-ingredients/${ce.ingredientId}`,{method:"DELETE"});e.success?ge():alert(e.error||"Failed to delete ingredient")}catch(e){console.error("Failed to delete ingredient:",e),alert("Failed to delete ingredient")}finally{pe({isOpen:!1,ingredientId:null,ingredientName:""})}},onCancel:()=>{pe({isOpen:!1,ingredientId:null,ingredientName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"}),ae&&ie&&(0,b.jsxs)(u.aF,{isOpen:ae,onClose:()=>se(!1),title:ie.name,size:"medium",children:[ie.image_url&&(0,b.jsx)("div",{style:{width:"100%",aspectRatio:"300/180",borderRadius:"8px",overflow:"hidden",marginBottom:"16px",background:"#F6F9FC"},children:(0,b.jsx)("img",{src:ie.image_url,alt:ie.name,style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"12px",flexWrap:"wrap"},children:[(0,b.jsx)("span",{style:{fontSize:"11px",fontWeight:600,color:"#635BFF",background:"#F0F4FF",padding:"3px 8px",borderRadius:"4px"},children:ie.category_name||"Uncategorized"}),ie.track_stock&&(0,b.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#059669",background:"#ECFDF5",padding:"3px 8px",borderRadius:"4px"},children:"Tracking"})]}),(0,b.jsxs)("div",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"16px"},children:["Unit Cost: ",Number(ie.unit_cost).toFixed(2)," / ",ie.unit]}),(0,b.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px",marginBottom:"16px"},children:[(0,b.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,b.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Base Qty"}),(0,b.jsxs)("div",{style:{fontSize:"14px",fontWeight:600},children:[Number(ie.base_quantity||1)," ",ie.unit]})]}),(0,b.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,b.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Current Stock"}),(0,b.jsx)("div",{style:{fontSize:"14px",fontWeight:600},children:ie.track_stock?`${Number(ie.current_stock||0).toFixed(1)} ${ie.unit}`:"-"})]}),(0,b.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,b.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Min Stock"}),(0,b.jsx)("div",{style:{fontSize:"14px",fontWeight:600},children:ie.track_stock?`${Number(ie.min_stock||0)} ${ie.unit}`:"-"})]})]}),ie.supplier_name&&(0,b.jsxs)("div",{style:{marginBottom:"16px",fontSize:"13px",color:"#6B7280"},children:["Supplier: ",(0,b.jsx)("span",{style:{color:"#0A2540",fontWeight:500},children:ie.supplier_name})]}),(0,b.jsxs)("div",{style:{padding:"12px",background:"#F0F4FF",borderRadius:"8px",border:"1px solid #DBEAFE",marginBottom:"16px"},children:[(0,b.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#1E40AF",marginBottom:"8px"},children:"Used In"}),0===de.recipes.length&&0===de.products.length?(0,b.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Not linked to any recipe or product yet."}):(0,b.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[de.recipes.map(e=>(0,b.jsxs)("div",{style:{fontSize:"13px",color:"#1E40AF"},children:[(0,b.jsx)("span",{style:{fontSize:"11px",background:"#EFF6FF",padding:"1px 6px",borderRadius:"3px",marginRight:"6px"},children:"Recipe"}),e.name]},"r"+e.id)),de.products.map(e=>(0,b.jsxs)("div",{style:{fontSize:"13px",color:"#059669"},children:[(0,b.jsx)("span",{style:{fontSize:"11px",background:"#ECFDF5",padding:"1px 6px",borderRadius:"3px",marginRight:"6px"},children:"Product"}),e.name]},"p"+e.id))]})]})]})]})},P=i.Ay.div`
  padding: 24px 0;
`,Y=i.Ay.div`
  display: grid;
  gap: 12px;
`,Q=i.Ay.div`
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
`,Z=i.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,J=i.Ay.div`
  flex: 1;
`,V=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,H=i.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,X=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,K=i.Ay.div`
  display: flex;
  gap: 8px;
`,G=i.Ay.button`
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
`,ee=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,te=i.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ne=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,re=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,ie=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,oe=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,ae=i.Ay.button`
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
`,se=e=>{let{onCountChange:t,onCategoryChange:n}=e;const[i,o]=(0,r.useState)([]),[s,d]=(0,r.useState)(!0),[l,x]=(0,r.useState)(!1),[m,y]=(0,r.useState)(null),[f,v]=(0,r.useState)(!1),[j,k]=(0,r.useState)(!1),[F,w]=(0,r.useState)(null),[C,_]=(0,r.useState)({name:"",emoji:"",description:""}),A=(0,r.useCallback)(async()=>{try{d(!0);const n=await(0,h.ff)("/api/product-ingredient-categories");var e;if(n.success)o(n.data||[]),null===t||void 0===t||t((null===(e=n.data)||void 0===e?void 0:e.length)||0)}catch(n){console.error("Failed to fetch categories:",n)}finally{d(!1)}},[t]);(0,r.useEffect)(()=>{A()},[A]);const E=e=>{e?(y(e),_({name:e.name,emoji:e.emoji||"",description:e.description||""})):(y(null),_({name:"",emoji:"",description:""})),x(!0)},B=()=>{x(!1),y(null),_({name:"",emoji:"",description:""})},S=async e=>{if(e.preventDefault(),C.name.trim())try{v(!0);const e=m?`/api/product-ingredient-categories/${m.id}`:"/api/product-ingredient-categories",t=m?"PUT":"POST",r=await(0,h.ff)(e,{method:t,body:JSON.stringify({name:C.name.trim(),emoji:C.emoji||null,description:C.description.trim()||null})});r.success?(B(),A(),null===n||void 0===n||n()):alert(r.error||"Failed to save category")}catch(t){console.error("Failed to save category:",t),alert("Failed to save category")}finally{v(!1)}},z=async(e,t)=>{const n="up"===t?e-1:e+1;if(n<0||n>=i.length)return;const r=[...i];[r[e],r[n]]=[r[n],r[e]];const o=r.map((e,t)=>({id:e.id,display_order:t}));try{await(0,h.ff)("/api/product-ingredient-categories/reorder",{method:"PUT",body:JSON.stringify({orders:o})}),A()}catch(a){console.error("Failed to reorder:",a)}};return s?(0,b.jsx)(P,{children:(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,b.jsxs)(P,{children:[(0,b.jsxs)(re,{children:[(0,b.jsx)(ie,{children:"Ingredient Categories"}),(0,b.jsx)(p.cc,{variant:"primary",onClick:()=>E(),children:"Add Category"})]}),0===i.length?(0,b.jsxs)(c.pp,{children:[(0,b.jsx)(te,{children:"No categories yet"}),(0,b.jsx)(ne,{children:"Create categories to organize your ingredients"}),(0,b.jsx)(p.cc,{variant:"primary",onClick:()=>E(),children:"Add First Category"})]}):(0,b.jsx)(Y,{children:i.map((e,t)=>(0,b.jsxs)(Q,{isActive:e.is_active,children:[(0,b.jsx)(a.Xd,{onMoveUp:()=>z(t,"up"),onMoveDown:()=>z(t,"down"),disableUp:0===t,disableDown:t===i.length-1}),e.emoji&&(0,b.jsx)(Z,{children:e.emoji}),(0,b.jsxs)(J,{children:[(0,b.jsx)(V,{children:e.name}),(0,b.jsxs)(H,{children:[(0,b.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),(0,b.jsx)(ee,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,b.jsx)(X,{children:e.description})]}),(0,b.jsxs)(K,{children:[(0,b.jsx)(G,{onClick:()=>E(e),title:"Edit",children:(0,b.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,b.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,b.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,b.jsx)(G,{onClick:()=>(async e=>{try{(await(0,h.ff)(`/api/product-ingredient-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&A()}catch(t){console.error("Failed to toggle category:",t)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,b.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,b.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,b.jsx)(G,{onClick:()=>(e=>{w(e),k(!0)})(e),title:"Delete",disabled:(e.ingredient_count||0)>0,children:(0,b.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,b.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,b.jsx)(u.aF,{isOpen:l,onClose:B,title:(m?"Edit":"New")+" Ingredient Category",size:"medium",footer:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(u.yl,{variant:"secondary",onClick:B,children:"Cancel"}),(0,b.jsx)(u.yl,{variant:"primary",onClick:S,disabled:!C.name.trim()||f,children:f?"Saving...":m?"Update":"Create"})]}),children:(0,b.jsxs)("form",{onSubmit:S,children:[(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Category Name *"}),(0,b.jsx)(u.ZQ,{type:"text",value:C.name,onChange:e=>_({...C,name:e.target.value}),placeholder:"e.g., Proteins",autoFocus:!0,required:!0})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Icon"}),(0,b.jsx)(oe,{children:["\ud83e\udd69","\ud83c\udf56","\ud83e\udd53","\ud83c\udf57","\ud83e\udd90","\ud83e\udd9e","\ud83e\udd80","\ud83d\udc1f","\ud83e\udd5a","\ud83e\uddc0","\ud83e\udd6c","\ud83e\udd66","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83e\udd52","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83c\udf4e","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd5d","\ud83c\udf4c","\ud83e\udd6d","\ud83c\udf4d","\ud83e\uddc8","\ud83e\udd5b","\ud83e\uddc2","\ud83c\udf6f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5a","\ud83c\udf5d","\ud83e\udd6b","\ud83e\uddca","\ud83d\udca7","\ud83c\udf76","\ud83e\uded7","\ud83e\uddf4","\ud83e\uddf9","\ud83e\uddfd","\ud83d\udce6","\ud83c\udff7\ufe0f","\ud83d\udd16"].map(e=>(0,b.jsx)(ae,{selected:C.emoji===e,onClick:()=>_({...C,emoji:e}),type:"button",children:e},e))})]}),(0,b.jsxs)(u.gE,{children:[(0,b.jsx)(u.lR,{children:"Description"}),(0,b.jsx)(u.Lz,{value:C.description,onChange:e=>_({...C,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,b.jsx)(g.A,{isOpen:j,onCancel:()=>{k(!1),w(null)},onConfirm:async()=>{if(F)try{const e=await(0,h.ff)(`/api/product-ingredient-categories/${F.id}`,{method:"DELETE"});e.success?(k(!1),w(null),A(),null===n||void 0===n||n()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:F?`Are you sure you want to delete "${F.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},de=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,le=i.Ay.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  cursor: pointer;
  min-width: 200px;

  &:hover { border-color: #CBD5E1; }
  &:focus { outline: none; border-color: #635BFF; }
`,ce=()=>{const{user:e}=(0,l.As)(),[t,n]=(0,o.ok)(),[i,c]=(0,d.M)("ingredients"),[p,x]=(0,r.useState)(0),[u,g]=(0,r.useState)(0),[h,m]=(0,r.useState)([]),[y,f]=(0,r.useState)(!0),[v,j]=(0,r.useState)(0),k=t.get("brandId"),F=k?Number(k):h.length>0?h[0].id:null;(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();m(e),e.length>0&&!k&&n({tab:i,brandId:String(e[0].id)})}}catch(e){console.error("Error fetching brands:",e)}finally{f(!1)}})()},[]);const w=e=>{c(e),F&&n(t=>(t.set("tab",e),t.set("brandId",String(F)),t))};return y?(0,b.jsxs)(a.mc,{children:[(0,b.jsx)(a.Y9,{children:(0,b.jsx)(a.hE,{children:"Ingredients"})}),(0,b.jsx)(a.UC,{children:(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]}):(0,b.jsxs)(a.mc,{children:[(0,b.jsxs)(a.Y9,{children:[(0,b.jsx)(a.hE,{children:"Ingredients"}),h.length>0&&(0,b.jsx)(de,{children:(0,b.jsx)(le,{value:F||"",onChange:e=>n({tab:i,brandId:e.target.value}),children:h.map(e=>(0,b.jsx)("option",{value:e.id,children:e.name},e.id))})})]}),(0,b.jsxs)(a.UC,{children:[(0,b.jsxs)(s.tU,{children:[(0,b.jsxs)(s.oz,{active:"ingredients"===i,onClick:()=>w("ingredients"),children:["Ingredients ",(0,b.jsx)(s.Ex,{count:p,showZero:!0})]}),(0,b.jsxs)(s.oz,{active:"ingredient-categories"===i,onClick:()=>w("ingredient-categories"),children:["Categories ",(0,b.jsx)(s.Ex,{count:u,showZero:!0})]})]}),F&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{style:{display:"ingredients"===i?"block":"none"},children:(0,b.jsx)(W,{brandId:F,onCountChange:x,categoryRefreshKey:v})}),(0,b.jsx)("div",{style:{display:"ingredient-categories"===i?"block":"none"},children:(0,b.jsx)(se,{brandId:F,onCountChange:g,onCategoryChange:()=>j(e=>e+1)})})]})]})]})}},2597:(e,t,n)=>{n.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});n(9950);var r=n(4752),i=n(4414);const o=r.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,a=r.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,s=r.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:t,className:n,style:r}=e;return(0,i.jsx)(o,{className:n,style:r,children:t})},l=e=>{let{active:t,onClick:n,children:r,className:o}=e;return(0,i.jsx)(a,{active:t,onClick:n,className:o,children:r})},c=e=>{let{count:t,variant:n="default",showZero:r=!1}=e;return 0!==t||r?(0,i.jsx)(s,{variant:n,children:t}):null}},2653:(e,t,n)=>{n.d(t,{M:()=>o});var r=n(9950),i=n(4492);function o(e){const[t,n]=(0,i.ok)(),o=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,r.useState)(o());return[a,(0,r.useCallback)(e=>{s(e),n({tab:e})},[n])]}},3705:(e,t,n)=>{n.d(t,{cc:()=>i});var r=n(4752);const i=r.Ay.button`
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
`;r.Ay.select`
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
`,r.Ay.input`
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
`,r.Ay.div`
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
`},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var r=n(9950),i=n(1367),o=n(6038);const a=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[a]=(0,r.useState)(Object.keys(o.DL)),[s,d]=(0,r.useState)(!0),[l,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"MYR";n(r)}else n("MYR")}catch(a){console.error("Failed to fetch restaurant currency:",a),c("Failed to load currency settings"),n("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:s,error:l}}},7617:(e,t,n)=>{n.d(t,{A:()=>u});n(9950);var r=n(7119),i=n(4752),o=n(9610),a=n(4414);const s=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=i.Ay.button`
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
`,u=e=>{let{isOpen:t,title:n,message:i,onConfirm:u,onCancel:g,confirmText:h="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return t?r.createPortal((0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&g()},style:{zIndex:1100},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(d,{children:[(0,a.jsx)(l,{children:n}),(0,a.jsx)(c,{children:i})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(x,{variant:"secondary",onClick:g,children:m}),(0,a.jsx)(x,{variant:"primary",type:y,onClick:u,children:h})]})]})}),document.body):null}}}]);