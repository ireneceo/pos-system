"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2495],{1840:(e,t,n)=>{n.d(t,{ff:()=>o});function r(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",r()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const i="";r();async function o(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=`${i}${e}`,r=localStorage.getItem("auth_token"),o={credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{},...t.headers},...t},a=await fetch(n,o);if(!a.ok){const e=await a.json().catch(()=>({message:"Network error"}));throw new Error(e.message||e.error||`HTTP error! status: ${a.status}`)}return a.json()}},2495:(e,t,n)=>{n.r(t),n.d(t,{default:()=>pe});var r=n(9950),i=n(4752),o=n(4492),a=n(8409),s=n(2597),d=n(2653),l=n(1367),c=n(2853),p=n(3705),u=n(2488),g=n(9610),x=n(7617),h=n(1840),m=n(4021),y=n(6038),b=n(5030),f=n(4414);const v=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,j=i.Ay.div`
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
`,k=i.Ay.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
`,F=i.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,C=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,w=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,_=i.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,A=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-top: 12px;
`,E=i.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`,B=i.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
`,S=i.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
`,z=i.Ay.span`
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

  ${S}:checked + & {
    background-color: #635BFF;
  }

  ${S}:checked + &:before {
    transform: translateX(22px);
  }
`,I=i.Ay.div`
  margin: 12px 0;
  flex: 1;
`,$=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,R=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,D=i.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,T=i.Ay.div`
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
`,O=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,U=i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,L=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,M=(i.Ay.div`
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
`),P=i.Ay.div`
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
`,Y=e=>{let{onCountChange:t,categoryRefreshKey:n}=e;const{t:i}=(0,b.Bd)("brand"),{defaultCurrency:o}=(0,m.i1)(),[a,s]=(0,r.useState)("RM"),[d,l]=(0,r.useState)([]),[Y,W]=(0,r.useState)([]),[Q,Z]=(0,r.useState)(!0),[J,V]=(0,r.useState)(""),[H,X]=(0,r.useState)("all"),[K,G]=(0,r.useState)(!1),[ee,te]=(0,r.useState)(null),[ne,re]=(0,r.useState)(!1),[ie,oe]=(0,r.useState)(()=>"image"===localStorage.getItem("brandIngredientsViewMode")?"image":"compact"),[ae,se]=(0,r.useState)(null),[de,le]=(0,r.useState)(!1),[ce,pe]=(0,r.useState)({recipes:[],products:[]}),[ue,ge]=(0,r.useState)({isOpen:!1,ingredientId:null,ingredientName:""}),[xe,he]=(0,r.useState)({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0});(0,r.useEffect)(()=>{o&&s(o)},[o]);const me=(0,r.useCallback)(async()=>{try{Z(!0);const[n,r]=await Promise.all([(0,h.ff)("/api/product-ingredients"),(0,h.ff)("/api/product-ingredient-categories")]);var e;if(n.success)l(n.data||[]),null===t||void 0===t||t((null===(e=n.data)||void 0===e?void 0:e.length)||0);r.success&&W(r.data||[])}catch(n){console.error("Failed to fetch data:",n)}finally{Z(!1)}},[t]);(0,r.useEffect)(()=>{me()},[me,n]);const ye=e=>{var t;e?(te(e),he({name:e.name,category_id:(null===(t=e.category_id)||void 0===t?void 0:t.toString())||"",image_url:e.image_url||"",unit:e.unit,base_quantity:e.base_quantity.toString(),unit_cost:e.unit_cost.toString(),supplier_name:e.supplier_name||"",min_stock:e.min_stock.toString(),min_order:e.min_order.toString(),current_stock:e.current_stock.toString(),track_stock:e.track_stock})):(te(null),he({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0}));G(!0)},be=()=>{G(!1),te(null),he({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0})},fe=e=>e.track_stock?e.current_stock<=0?"out":e.current_stock<=e.min_stock?"low":"normal":"normal",ve=d.filter(e=>{var t;const n=e.name.toLowerCase().includes(J.toLowerCase())||e.code.toLowerCase().includes(J.toLowerCase()),r="all"===H||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===H;return n&&r}),je=[{id:"all",name:"All Categories"},...Y.map(e=>({id:e.id.toString(),name:e.name}))];return Q?(0,f.jsx)(c.pp,{children:(0,f.jsx)(U,{children:"Loading..."})}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,f.jsxs)(u.Qn,{style:{marginBottom:0,flex:1},children:[(0,f.jsx)(u.DO,{type:"text",placeholder:"Search ingredients...",value:J,onChange:e=>V(e.target.value)}),(0,f.jsx)(u.Jt,{value:H,onChange:e=>X(e.target.value),children:je.map(e=>(0,f.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,f.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[(0,f.jsxs)("div",{style:{display:"flex",background:"#F3F4F6",borderRadius:"6px",padding:"2px"},children:[(0,f.jsx)("button",{onClick:()=>{oe("compact"),localStorage.setItem("brandIngredientsViewMode","compact")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"compact"===ie?"white":"transparent",color:"compact"===ie?"#0A2540":"#6B7C93",boxShadow:"compact"===ie?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Compact"}),(0,f.jsx)("button",{onClick:()=>{oe("image"),localStorage.setItem("brandIngredientsViewMode","image")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"image"===ie?"white":"transparent",color:"image"===ie?"#0A2540":"#6B7C93",boxShadow:"image"===ie?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Image"})]}),(0,f.jsx)(p.cc,{variant:"primary",onClick:()=>ye(),children:"New Ingredient"})]})]}),0===ve.length?(0,f.jsxs)(c.pp,{children:[(0,f.jsx)(U,{children:"No ingredients found"}),(0,f.jsx)(L,{children:J||"all"!==H?"Try adjusting your filters":"Add ingredients to use in your product recipes"}),!J&&"all"===H&&(0,f.jsx)(p.cc,{variant:"primary",onClick:()=>ye(),children:"Create First Ingredient"})]}):(0,f.jsx)(v,{children:ve.map(e=>{var t,n;return(0,f.jsxs)(j,{isActive:e.is_active,onClick:()=>{se(e),le(!0),pe({recipes:[],products:[]});const t=localStorage.getItem("auth_token");fetch(`/api/product-ingredients/${e.id}/usage`,{headers:{Authorization:`Bearer ${t}`}}).then(e=>e.json()).then(e=>{e.success&&pe(e.data)}).catch(()=>{})},children:["image"===ie&&e.image_url&&(0,f.jsx)(k,{children:(0,f.jsx)(F,{src:e.image_url,alt:e.name})}),(0,f.jsx)(C,{children:(0,f.jsxs)("div",{children:[(0,f.jsx)(w,{children:e.name}),(0,f.jsxs)(_,{children:[null===(t=e.category)||void 0===t?void 0:t.emoji," ",(null===(n=e.category)||void 0===n?void 0:n.name)||"Uncategorized"]})]})}),(0,f.jsxs)(I,{children:[(0,f.jsxs)($,{children:[(0,f.jsx)(R,{children:"Unit Cost"}),(0,f.jsx)(D,{children:(0,y.vv)(Number(e.unit_cost),a)})]}),(0,f.jsxs)($,{children:[(0,f.jsx)(R,{children:"Base Qty / Unit"}),(0,f.jsxs)(D,{children:[Number(e.base_quantity||1)," ",e.unit]})]}),e.supplier_name&&(0,f.jsxs)($,{children:[(0,f.jsx)(R,{children:"Supplier"}),(0,f.jsx)(D,{children:e.supplier_name})]}),e.code&&(0,f.jsxs)($,{children:[(0,f.jsx)(R,{children:"Code"}),(0,f.jsx)(D,{children:e.code})]}),e.track_stock&&(0,f.jsxs)($,{children:[(0,f.jsx)(R,{children:"Stock"}),(0,f.jsxs)(q,{status:fe(e),children:[e.current_stock," ",e.unit]})]})]}),(0,f.jsxs)(A,{children:[(0,f.jsx)(E,{children:"Track in Inventory"}),(0,f.jsxs)(B,{children:[(0,f.jsx)(S,{type:"checkbox",checked:e.track_stock||!1,onChange:t=>{t.stopPropagation(),(async(e,t)=>{try{const n=await(0,h.ff)(`/api/product-ingredients/${e.id}`,{method:"PUT",body:JSON.stringify({name:e.name,category_id:e.category_id,image_url:e.image_url,unit:e.unit,base_quantity:e.base_quantity,unit_cost:e.unit_cost,supplier_name:e.supplier_name,min_stock:e.min_stock,min_order:e.min_order,current_stock:e.current_stock,is_active:e.is_active,track_stock:t})});n.success?l(n=>n.map(n=>n.id===e.id?{...n,track_stock:t}:n)):alert(n.error||"Failed to update track stock")}catch(n){console.error("Failed to toggle track stock:",n)}})(e,t.target.checked)}}),(0,f.jsx)(z,{})]})]}),(0,f.jsxs)(T,{children:[(0,f.jsx)(N,{variant:"secondary",onClick:t=>{t.stopPropagation(),ye(e)},children:"Edit"}),(0,f.jsx)(N,{variant:"danger",onClick:t=>{t.stopPropagation(),(e=>{ge({isOpen:!0,ingredientId:e.id,ingredientName:e.name})})(e)},children:"Delete"})]})]},e.id)})}),(0,f.jsx)(g.aF,{isOpen:K,onClose:be,title:ee?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,f.jsxs)("form",{onSubmit:e=>{e.preventDefault(),(async()=>{if(xe.name.trim()&&xe.unit.trim())try{re(!0);const e=ee?`/api/product-ingredients/${ee.id}`:"/api/product-ingredients",t=ee?"PUT":"POST",n=await(0,h.ff)(e,{method:t,body:JSON.stringify({name:xe.name,category_id:xe.category_id?parseInt(xe.category_id):null,image_url:xe.image_url||null,unit:xe.unit,base_quantity:parseFloat(xe.base_quantity)||1,unit_cost:parseFloat(xe.unit_cost)||0,supplier_name:xe.supplier_name||null,min_stock:parseFloat(xe.min_stock)||0,min_order:parseFloat(xe.min_order)||0,current_stock:parseFloat(xe.current_stock)||0,track_stock:xe.track_stock})});n.success?(be(),me()):alert(n.error||"Failed to save ingredient")}catch(e){console.error("Failed to save ingredient:",e),alert("Failed to save ingredient")}finally{re(!1)}else alert("Name and Unit are required")})()},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Image"}),(0,f.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(n){const e=new FileReader;e.onloadend=()=>{he({...xe,image_url:e.result})},e.readAsDataURL(n)}},style:{display:"none"},id:"ingredient-image-upload"}),(0,f.jsx)(M,{onClick:()=>{var e;return null===(e=document.getElementById("ingredient-image-upload"))||void 0===e?void 0:e.click()},children:xe.image_url?(0,f.jsx)("img",{src:xe.image_url,alt:"Ingredient"}):(0,f.jsx)(P,{children:"Click to upload image"})})]}),(0,f.jsxs)(g.fh,{children:[(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Ingredient Name *"}),(0,f.jsx)(g.ZQ,{type:"text",value:xe.name,onChange:e=>he({...xe,name:e.target.value}),placeholder:"e.g., Chicken Breast",required:!0})]}),(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Category"}),(0,f.jsxs)(g.FX,{value:xe.category_id,onChange:e=>he({...xe,category_id:e.target.value}),children:[(0,f.jsx)("option",{value:"",children:"Select category..."}),Y.map(e=>(0,f.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]})]}),(0,f.jsxs)(g.fh,{children:[(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Base Quantity *"}),(0,f.jsx)(g.ZQ,{type:"number",step:"0.01",min:"0.01",value:xe.base_quantity,onChange:e=>he({...xe,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Unit *"}),(0,f.jsxs)(g.FX,{value:xe.unit,onChange:e=>he({...xe,unit:e.target.value}),required:!0,children:[(0,f.jsx)("option",{value:"",children:"Select unit..."}),(0,f.jsx)("option",{value:"kg",children:"kg"}),(0,f.jsx)("option",{value:"g",children:"g"}),(0,f.jsx)("option",{value:"L",children:"L"}),(0,f.jsx)("option",{value:"ml",children:"ml"}),(0,f.jsx)("option",{value:"piece",children:"piece"}),(0,f.jsx)("option",{value:"pack",children:"pack"}),(0,f.jsx)("option",{value:"can",children:"can"}),(0,f.jsx)("option",{value:"bottle",children:"bottle"})]})]})]}),(0,f.jsxs)(g.fh,{children:[(0,f.jsxs)(g.gE,{children:[(0,f.jsxs)(g.lR,{children:["Unit Cost (",a,") *"]}),(0,f.jsx)(g.ZQ,{type:"number",step:"0.01",min:"0",value:xe.unit_cost,onChange:e=>he({...xe,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]}),(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Supplier"}),(0,f.jsx)(g.ZQ,{type:"text",value:xe.supplier_name,onChange:e=>he({...xe,supplier_name:e.target.value}),placeholder:"Supplier name"})]})]}),(0,f.jsxs)(O,{children:[(0,f.jsx)(g.yl,{type:"button",variant:"secondary",onClick:be,children:"Cancel"}),(0,f.jsx)(g.yl,{type:"submit",variant:"primary",disabled:ne,children:ne?"Saving...":ee?"Update Ingredient":"Create Ingredient"})]})]})}),(0,f.jsx)(x.A,{isOpen:ue.isOpen,title:"Delete Ingredient",message:`Are you sure you want to delete "${ue.ingredientName}"? This action cannot be undone.`,onConfirm:async()=>{if(ue.ingredientId)try{const e=await(0,h.ff)(`/api/product-ingredients/${ue.ingredientId}`,{method:"DELETE"});e.success?me():alert(e.error||"Failed to delete ingredient")}catch(e){console.error("Failed to delete ingredient:",e),alert("Failed to delete ingredient")}finally{ge({isOpen:!1,ingredientId:null,ingredientName:""})}},onCancel:()=>{ge({isOpen:!1,ingredientId:null,ingredientName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"}),de&&ae&&(0,f.jsxs)(g.aF,{isOpen:de,onClose:()=>le(!1),title:ae.name,size:"medium",children:[ae.image_url&&(0,f.jsx)("div",{style:{width:"100%",aspectRatio:"300/180",borderRadius:"8px",overflow:"hidden",marginBottom:"16px",background:"#F6F9FC"},children:(0,f.jsx)("img",{src:ae.image_url,alt:ae.name,style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,f.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"12px",flexWrap:"wrap"},children:[(0,f.jsx)("span",{style:{fontSize:"11px",fontWeight:600,color:"#635BFF",background:"#F0F4FF",padding:"3px 8px",borderRadius:"4px"},children:ae.category_name||"Uncategorized"}),ae.track_stock&&(0,f.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#059669",background:"#ECFDF5",padding:"3px 8px",borderRadius:"4px"},children:"Tracking"})]}),(0,f.jsxs)("div",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"16px"},children:["Unit Cost: ",Number(ae.unit_cost).toFixed(2)," / ",ae.unit]}),(0,f.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px",marginBottom:"16px"},children:[(0,f.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,f.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Base Qty"}),(0,f.jsxs)("div",{style:{fontSize:"14px",fontWeight:600},children:[Number(ae.base_quantity||1)," ",ae.unit]})]}),(0,f.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,f.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Current Stock"}),(0,f.jsx)("div",{style:{fontSize:"14px",fontWeight:600},children:ae.track_stock?`${Number(ae.current_stock||0).toFixed(1)} ${ae.unit}`:"-"})]}),(0,f.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,f.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Min Stock"}),(0,f.jsx)("div",{style:{fontSize:"14px",fontWeight:600},children:ae.track_stock?`${Number(ae.min_stock||0)} ${ae.unit}`:"-"})]})]}),ae.supplier_name&&(0,f.jsxs)("div",{style:{marginBottom:"16px",fontSize:"13px",color:"#6B7280"},children:["Supplier: ",(0,f.jsx)("span",{style:{color:"#0A2540",fontWeight:500},children:ae.supplier_name})]}),(0,f.jsxs)("div",{style:{padding:"12px",background:"#F0F4FF",borderRadius:"8px",border:"1px solid #DBEAFE",marginBottom:"16px"},children:[(0,f.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#1E40AF",marginBottom:"8px"},children:"Used In"}),0===ce.recipes.length&&0===ce.products.length?(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Not linked to any recipe or product yet."}):(0,f.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[ce.recipes.map(e=>(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#1E40AF"},children:[(0,f.jsx)("span",{style:{fontSize:"11px",background:"#EFF6FF",padding:"1px 6px",borderRadius:"3px",marginRight:"6px"},children:"Recipe"}),e.name]},"r"+e.id)),ce.products.map(e=>(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#059669"},children:[(0,f.jsx)("span",{style:{fontSize:"11px",background:"#ECFDF5",padding:"1px 6px",borderRadius:"3px",marginRight:"6px"},children:"Product"}),e.name]},"p"+e.id))]})]})]})]})},W=i.Ay.div`
  padding: 24px 0;
`,Q=i.Ay.div`
  display: grid;
  gap: 12px;
`,Z=i.Ay.div`
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
`,J=i.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,V=i.Ay.div`
  flex: 1;
`,H=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,X=i.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,K=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,G=i.Ay.div`
  display: flex;
  gap: 8px;
`,ee=i.Ay.button`
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
`,te=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ne=i.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,re=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,ie=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,oe=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,ae=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,se=i.Ay.button`
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
`,de=e=>{let{onCountChange:t,onCategoryChange:n}=e;const{t:i}=(0,b.Bd)("brand"),[o,s]=(0,r.useState)([]),[d,l]=(0,r.useState)(!0),[u,m]=(0,r.useState)(!1),[y,v]=(0,r.useState)(null),[j,k]=(0,r.useState)(!1),[F,C]=(0,r.useState)(!1),[w,_]=(0,r.useState)(null),[A,E]=(0,r.useState)({name:"",emoji:"",description:""}),B=(0,r.useCallback)(async()=>{try{l(!0);const n=await(0,h.ff)("/api/product-ingredient-categories");var e;if(n.success)s(n.data||[]),null===t||void 0===t||t((null===(e=n.data)||void 0===e?void 0:e.length)||0)}catch(n){console.error("Failed to fetch categories:",n)}finally{l(!1)}},[t]);(0,r.useEffect)(()=>{B()},[B]);const S=e=>{e?(v(e),E({name:e.name,emoji:e.emoji||"",description:e.description||""})):(v(null),E({name:"",emoji:"",description:""})),m(!0)},z=()=>{m(!1),v(null),E({name:"",emoji:"",description:""})},I=async e=>{if(e.preventDefault(),A.name.trim())try{k(!0);const e=y?`/api/product-ingredient-categories/${y.id}`:"/api/product-ingredient-categories",t=y?"PUT":"POST",r=await(0,h.ff)(e,{method:t,body:JSON.stringify({name:A.name.trim(),emoji:A.emoji||null,description:A.description.trim()||null})});r.success?(z(),B(),null===n||void 0===n||n()):alert(r.error||"Failed to save category")}catch(t){console.error("Failed to save category:",t),alert("Failed to save category")}finally{k(!1)}},$=async(e,t)=>{const n="up"===t?e-1:e+1;if(n<0||n>=o.length)return;const r=[...o];[r[e],r[n]]=[r[n],r[e]];const i=r.map((e,t)=>({id:e.id,display_order:t}));try{await(0,h.ff)("/api/product-ingredient-categories/reorder",{method:"PUT",body:JSON.stringify({orders:i})}),B()}catch(a){console.error("Failed to reorder:",a)}};return d?(0,f.jsx)(W,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:i("brand:productIngredientCategoriesTab.loading")})}):(0,f.jsxs)(W,{children:[(0,f.jsxs)(ie,{children:[(0,f.jsx)(oe,{children:i("brand:productIngredientCategoriesTab.ingredientCategories")}),(0,f.jsx)(p.cc,{variant:"primary",onClick:()=>S(),children:"Add Category"})]}),0===o.length?(0,f.jsxs)(c.pp,{children:[(0,f.jsx)(ne,{children:i("brand:productIngredientCategoriesTab.noCategoriesYet")}),(0,f.jsx)(re,{children:i("brand:productIngredientCategoriesTab.createCategoriesToOrganizeYourIngredients")}),(0,f.jsx)(p.cc,{variant:"primary",onClick:()=>S(),children:"Add First Category"})]}):(0,f.jsx)(Q,{children:o.map((e,t)=>(0,f.jsxs)(Z,{isActive:e.is_active,children:[(0,f.jsx)(a.Xd,{onMoveUp:()=>$(t,"up"),onMoveDown:()=>$(t,"down"),disableUp:0===t,disableDown:t===o.length-1}),e.emoji&&(0,f.jsx)(J,{children:e.emoji}),(0,f.jsxs)(V,{children:[(0,f.jsx)(H,{children:e.name}),(0,f.jsxs)(X,{children:[(0,f.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),(0,f.jsx)(te,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,f.jsx)(K,{children:e.description})]}),(0,f.jsxs)(G,{children:[(0,f.jsx)(ee,{onClick:()=>S(e),title:"Edit",children:(0,f.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,f.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,f.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,f.jsx)(ee,{onClick:()=>(async e=>{try{(await(0,h.ff)(`/api/product-ingredient-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&B()}catch(t){console.error("Failed to toggle category:",t)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,f.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,f.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,f.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,f.jsx)(ee,{onClick:()=>(e=>{_(e),C(!0)})(e),title:"Delete",disabled:(e.ingredient_count||0)>0,children:(0,f.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,f.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,f.jsx)(g.aF,{isOpen:u,onClose:z,title:(y?"Edit":"New")+" Ingredient Category",size:"medium",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(g.yl,{variant:"secondary",onClick:z,children:i("brand:productIngredientCategoriesTab.cancel")}),(0,f.jsx)(g.yl,{variant:"primary",onClick:I,disabled:!A.name.trim()||j,children:j?"Saving...":y?"Update":"Create"})]}),children:(0,f.jsxs)("form",{onSubmit:I,children:[(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:"Category Name *"}),(0,f.jsx)(g.ZQ,{type:"text",value:A.name,onChange:e=>E({...A,name:e.target.value}),placeholder:"e.g., Proteins",autoFocus:!0,required:!0})]}),(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:i("brand:productIngredientCategoriesTab.icon")}),(0,f.jsx)(ae,{children:["\ud83e\udd69","\ud83c\udf56","\ud83e\udd53","\ud83c\udf57","\ud83e\udd90","\ud83e\udd9e","\ud83e\udd80","\ud83d\udc1f","\ud83e\udd5a","\ud83e\uddc0","\ud83e\udd6c","\ud83e\udd66","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83e\udd52","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83c\udf4e","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd5d","\ud83c\udf4c","\ud83e\udd6d","\ud83c\udf4d","\ud83e\uddc8","\ud83e\udd5b","\ud83e\uddc2","\ud83c\udf6f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5a","\ud83c\udf5d","\ud83e\udd6b","\ud83e\uddca","\ud83d\udca7","\ud83c\udf76","\ud83e\uded7","\ud83e\uddf4","\ud83e\uddf9","\ud83e\uddfd","\ud83d\udce6","\ud83c\udff7\ufe0f","\ud83d\udd16"].map(e=>(0,f.jsx)(se,{selected:A.emoji===e,onClick:()=>E({...A,emoji:e}),type:"button",children:e},e))})]}),(0,f.jsxs)(g.gE,{children:[(0,f.jsx)(g.lR,{children:i("brand:productIngredientCategoriesTab.description")}),(0,f.jsx)(g.Lz,{value:A.description,onChange:e=>E({...A,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,f.jsx)(x.A,{isOpen:F,onCancel:()=>{C(!1),_(null)},onConfirm:async()=>{if(w)try{const e=await(0,h.ff)(`/api/product-ingredient-categories/${w.id}`,{method:"DELETE"});e.success?(C(!1),_(null),B(),null===n||void 0===n||n()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:w?`Are you sure you want to delete "${w.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},le=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,ce=i.Ay.select`
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
`,pe=()=>{const{t:e}=(0,b.Bd)("brand"),{user:t}=(0,l.As)(),[n,i]=(0,o.ok)(),[c,p]=(0,d.M)("ingredients"),[u,g]=(0,r.useState)(0),[x,h]=(0,r.useState)(0),[m,y]=(0,r.useState)([]),[v,j]=(0,r.useState)(!0),[k,F]=(0,r.useState)(0),C=n.get("brandId"),w=C?Number(C):m.length>0?m[0].id:null;(0,r.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();y(e),e.length>0&&!C&&i({tab:c,brandId:String(e[0].id)})}}catch(e){console.error("Error fetching brands:",e)}finally{j(!1)}})()},[]);const _=e=>{p(e),w&&i(t=>(t.set("tab",e),t.set("brandId",String(w)),t))};return v?(0,f.jsxs)(a.mc,{children:[(0,f.jsx)(a.Y9,{children:(0,f.jsx)(a.hE,{children:e("brand:brandIngredientsPage.ingredients")})}),(0,f.jsx)(a.UC,{children:(0,f.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:e("brand:brandIngredientsPage.loading")})})]}):(0,f.jsxs)(a.mc,{children:[(0,f.jsxs)(a.Y9,{children:[(0,f.jsx)(a.hE,{children:e("brand:brandIngredientsPage.ingredients")}),m.length>0&&(0,f.jsx)(le,{children:(0,f.jsx)(ce,{value:w||"",onChange:e=>i({tab:c,brandId:e.target.value}),children:m.map(e=>(0,f.jsx)("option",{value:e.id,children:e.name},e.id))})})]}),(0,f.jsxs)(a.UC,{children:[(0,f.jsxs)(s.tU,{children:[(0,f.jsxs)(s.oz,{active:"ingredients"===c,onClick:()=>_("ingredients"),children:["Ingredients ",(0,f.jsx)(s.Ex,{count:u,showZero:!0})]}),(0,f.jsxs)(s.oz,{active:"ingredient-categories"===c,onClick:()=>_("ingredient-categories"),children:["Categories ",(0,f.jsx)(s.Ex,{count:x,showZero:!0})]})]}),w&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("div",{style:{display:"ingredients"===c?"block":"none"},children:(0,f.jsx)(Y,{brandId:w,onCountChange:g,categoryRefreshKey:k})}),(0,f.jsx)("div",{style:{display:"ingredient-categories"===c?"block":"none"},children:(0,f.jsx)(de,{brandId:w,onCountChange:h,onCategoryChange:()=>F(e=>e+1)})})]})]})]})}},2653:(e,t,n)=>{n.d(t,{M:()=>o});var r=n(9950),i=n(4492);function o(e){const[t,n]=(0,i.ok)(),o=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,r.useState)(o());return[a,(0,r.useCallback)(e=>{s(e),n({tab:e})},[n])]}},3705:(e,t,n)=>{n.d(t,{cc:()=>i});var r=n(4752);const i=r.Ay.button`
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
`},4021:(e,t,n)=>{n.d(t,{i1:()=>a});var r=n(9950),i=n(1367),o=n(6038);const a=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[a]=(0,r.useState)(Object.keys(o.DL)),[s,d]=(0,r.useState)(!0),[l,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"MYR";n(r)}else n("MYR")}catch(a){console.error("Failed to fetch restaurant currency:",a),c("Failed to load currency settings"),n("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:a,loading:s,error:l}}},7617:(e,t,n)=>{n.d(t,{A:()=>g});n(9950);var r=n(7119),i=n(4752),o=n(9610),a=n(4414);const s=i.Ay.div`
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
`,u=i.Ay.button`
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
`,g=e=>{let{isOpen:t,title:n,message:i,onConfirm:g,onCancel:x,confirmText:h="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return t?r.createPortal((0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&x()},style:{zIndex:1100},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(d,{children:[(0,a.jsx)(l,{children:n}),(0,a.jsx)(c,{children:i})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(u,{variant:"secondary",onClick:x,children:m}),(0,a.jsx)(u,{variant:"primary",type:y,onClick:g,children:h})]})]})}),document.body):null}}}]);