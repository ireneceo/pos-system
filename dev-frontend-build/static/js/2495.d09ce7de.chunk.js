"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2495],{1840:(e,t,n)=>{n.d(t,{ff:()=>a});function r(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",r()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const i="";r();var o=n(9955);async function a(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=`${i}${e}`,r=(0,o.c4)(),a={credentials:"include",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer ${r}`}:{},...t.headers},...t},s=await fetch(n,a);if(!s.ok){const e=await s.json().catch(()=>({message:"Network error"}));throw new Error(e.message||e.error||`HTTP error! status: ${s.status}`)}return s.json()}},2495:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ue});var r=n(9950),i=n(4752),o=n(4492),a=n(8409),s=n(2597),d=n(2653),l=n(1367),c=n(2853),p=n(3705),u=n(2488),x=n(9610),g=n(7617),h=n(1840),m=n(4021),y=n(6038),b=n(5030),f=n(9955),v=n(4414);const j=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,F=i.Ay.div`
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
`,C=i.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,w=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,_=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=i.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,E=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-top: 12px;
`,B=i.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`,S=i.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
`,z=i.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
`,I=i.Ay.span`
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

  ${z}:checked + & {
    background-color: #635BFF;
  }

  ${z}:checked + &:before {
    transform: translateX(22px);
  }
`,$=i.Ay.div`
  margin: 12px 0;
  flex: 1;
`,R=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,D=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,T=i.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,N=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,O=i.Ay.button`
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
`,U=i.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,L=i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,M=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,P=(i.Ay.div`
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
`),q=i.Ay.div`
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`,Y=i.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"out"===e.status?"#FEE2E2":"low"===e.status?"#FEF3C7":"#ECFDF5"};
  color: ${e=>"out"===e.status?"#DC2626":"low"===e.status?"#D97706":"#059669"};
`,W=e=>{let{onCountChange:t,categoryRefreshKey:n}=e;const{t:i}=(0,b.Bd)("brand"),{defaultCurrency:o}=(0,m.i1)(),[a,s]=(0,r.useState)("RM"),[d,l]=(0,r.useState)([]),[W,Q]=(0,r.useState)([]),[Z,J]=(0,r.useState)(!0),[V,H]=(0,r.useState)(""),[X,K]=(0,r.useState)("all"),[G,ee]=(0,r.useState)(!1),[te,ne]=(0,r.useState)(null),[re,ie]=(0,r.useState)(!1),[oe,ae]=(0,r.useState)(()=>"image"===localStorage.getItem("brandIngredientsViewMode")?"image":"compact"),[se,de]=(0,r.useState)(null),[le,ce]=(0,r.useState)(!1),[pe,ue]=(0,r.useState)({recipes:[],products:[]}),[xe,ge]=(0,r.useState)({isOpen:!1,ingredientId:null,ingredientName:""}),[he,me]=(0,r.useState)({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0});(0,r.useEffect)(()=>{o&&s(o)},[o]);const ye=(0,r.useCallback)(async()=>{try{J(!0);const[n,r]=await Promise.all([(0,h.ff)("/api/product-ingredients"),(0,h.ff)("/api/product-ingredient-categories")]);var e;if(n.success)l(n.data||[]),null===t||void 0===t||t((null===(e=n.data)||void 0===e?void 0:e.length)||0);r.success&&Q(r.data||[])}catch(n){console.error("Failed to fetch data:",n)}finally{J(!1)}},[t]);(0,r.useEffect)(()=>{ye()},[ye,n]);const be=e=>{var t;e?(ne(e),me({name:e.name,category_id:(null===(t=e.category_id)||void 0===t?void 0:t.toString())||"",image_url:e.image_url||"",unit:e.unit,base_quantity:e.base_quantity.toString(),unit_cost:e.unit_cost.toString(),supplier_name:e.supplier_name||"",min_stock:e.min_stock.toString(),min_order:e.min_order.toString(),current_stock:e.current_stock.toString(),track_stock:e.track_stock})):(ne(null),me({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0}));ee(!0)},fe=()=>{ee(!1),ne(null),me({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0})},ve=e=>e.track_stock?e.current_stock<=0?"out":e.current_stock<=e.min_stock?"low":"normal":"normal",je=d.filter(e=>{var t;const n=e.name.toLowerCase().includes(V.toLowerCase())||e.code.toLowerCase().includes(V.toLowerCase()),r="all"===X||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===X;return n&&r}),Fe=[{id:"all",name:"All Categories"},...W.map(e=>({id:e.id.toString(),name:e.name}))];return Z?(0,v.jsx)(c.pp,{children:(0,v.jsx)(L,{children:"Loading..."})}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,v.jsxs)(u.Qn,{style:{marginBottom:0,flex:1},children:[(0,v.jsx)(u.DO,{type:"text",placeholder:"Search ingredients...",value:V,onChange:e=>H(e.target.value)}),(0,v.jsx)(u.Jt,{value:X,onChange:e=>K(e.target.value),children:Fe.map(e=>(0,v.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,v.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexShrink:0},children:[(0,v.jsxs)("div",{style:{display:"flex",background:"#F3F4F6",borderRadius:"6px",padding:"2px"},children:[(0,v.jsx)("button",{onClick:()=>{ae("compact"),localStorage.setItem("brandIngredientsViewMode","compact")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"compact"===oe?"white":"transparent",color:"compact"===oe?"#0A2540":"#6B7C93",boxShadow:"compact"===oe?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Compact"}),(0,v.jsx)("button",{onClick:()=>{ae("image"),localStorage.setItem("brandIngredientsViewMode","image")},style:{padding:"5px 14px",border:"none",borderRadius:"5px",fontSize:"12px",fontWeight:600,cursor:"pointer",transition:"all 0.15s",background:"image"===oe?"white":"transparent",color:"image"===oe?"#0A2540":"#6B7C93",boxShadow:"image"===oe?"0 1px 2px rgba(0,0,0,0.08)":"none"},children:"Image"})]}),(0,v.jsx)(p.cc,{variant:"primary",onClick:()=>be(),children:"New Ingredient"})]})]}),0===je.length?(0,v.jsxs)(c.pp,{children:[(0,v.jsx)(L,{children:"No ingredients found"}),(0,v.jsx)(M,{children:V||"all"!==X?"Try adjusting your filters":"Add ingredients to use in your product recipes"}),!V&&"all"===X&&(0,v.jsx)(p.cc,{variant:"primary",onClick:()=>be(),children:"Create First Ingredient"})]}):(0,v.jsx)(j,{children:je.map(e=>{var t,n;return(0,v.jsxs)(F,{isActive:e.is_active,onClick:()=>{de(e),ce(!0),ue({recipes:[],products:[]});const t=(0,f.c4)();fetch(`/api/product-ingredients/${e.id}/usage`,{headers:{Authorization:`Bearer ${t}`}}).then(e=>e.json()).then(e=>{e.success&&ue(e.data)}).catch(()=>{})},children:["image"===oe&&e.image_url&&(0,v.jsx)(k,{children:(0,v.jsx)(C,{src:e.image_url,alt:e.name})}),(0,v.jsx)(w,{children:(0,v.jsxs)("div",{children:[(0,v.jsx)(_,{children:e.name}),(0,v.jsxs)(A,{children:[null===(t=e.category)||void 0===t?void 0:t.emoji," ",(null===(n=e.category)||void 0===n?void 0:n.name)||"Uncategorized"]})]})}),(0,v.jsxs)($,{children:[(0,v.jsxs)(R,{children:[(0,v.jsx)(D,{children:"Unit Cost"}),(0,v.jsx)(T,{children:(0,y.vv)(Number(e.unit_cost),a)})]}),(0,v.jsxs)(R,{children:[(0,v.jsx)(D,{children:"Base Qty / Unit"}),(0,v.jsxs)(T,{children:[Number(e.base_quantity||1)," ",e.unit]})]}),e.supplier_name&&(0,v.jsxs)(R,{children:[(0,v.jsx)(D,{children:"Supplier"}),(0,v.jsx)(T,{children:e.supplier_name})]}),e.code&&(0,v.jsxs)(R,{children:[(0,v.jsx)(D,{children:"Code"}),(0,v.jsx)(T,{children:e.code})]}),e.track_stock&&(0,v.jsxs)(R,{children:[(0,v.jsx)(D,{children:"Stock"}),(0,v.jsxs)(Y,{status:ve(e),children:[e.current_stock," ",e.unit]})]})]}),(0,v.jsxs)(E,{children:[(0,v.jsx)(B,{children:"Track in Inventory"}),(0,v.jsxs)(S,{children:[(0,v.jsx)(z,{type:"checkbox",checked:e.track_stock||!1,onChange:t=>{t.stopPropagation(),(async(e,t)=>{try{const n=await(0,h.ff)(`/api/product-ingredients/${e.id}`,{method:"PUT",body:JSON.stringify({name:e.name,category_id:e.category_id,image_url:e.image_url,unit:e.unit,base_quantity:e.base_quantity,unit_cost:e.unit_cost,supplier_name:e.supplier_name,min_stock:e.min_stock,min_order:e.min_order,current_stock:e.current_stock,is_active:e.is_active,track_stock:t})});n.success?l(n=>n.map(n=>n.id===e.id?{...n,track_stock:t}:n)):alert(n.error||"Failed to update track stock")}catch(n){console.error("Failed to toggle track stock:",n)}})(e,t.target.checked)}}),(0,v.jsx)(I,{})]})]}),(0,v.jsxs)(N,{children:[(0,v.jsx)(O,{variant:"secondary",onClick:t=>{t.stopPropagation(),be(e)},children:"Edit"}),(0,v.jsx)(O,{variant:"danger",onClick:t=>{t.stopPropagation(),(e=>{ge({isOpen:!0,ingredientId:e.id,ingredientName:e.name})})(e)},children:"Delete"})]})]},e.id)})}),(0,v.jsx)(x.aF,{isOpen:G,onClose:fe,title:te?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,v.jsxs)("form",{onSubmit:e=>{e.preventDefault(),(async()=>{if(he.name.trim()&&he.unit.trim())try{ie(!0);const e=te?`/api/product-ingredients/${te.id}`:"/api/product-ingredients",t=te?"PUT":"POST",n=await(0,h.ff)(e,{method:t,body:JSON.stringify({name:he.name,category_id:he.category_id?parseInt(he.category_id):null,image_url:he.image_url||null,unit:he.unit,base_quantity:parseFloat(he.base_quantity)||1,unit_cost:parseFloat(he.unit_cost)||0,supplier_name:he.supplier_name||null,min_stock:parseFloat(he.min_stock)||0,min_order:parseFloat(he.min_order)||0,current_stock:parseFloat(he.current_stock)||0,track_stock:he.track_stock})});n.success?(fe(),ye()):alert(n.error||"Failed to save ingredient")}catch(e){console.error("Failed to save ingredient:",e),alert("Failed to save ingredient")}finally{ie(!1)}else alert("Name and Unit are required")})()},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Image"}),(0,v.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(n){const e=new FileReader;e.onloadend=()=>{me({...he,image_url:e.result})},e.readAsDataURL(n)}},style:{display:"none"},id:"ingredient-image-upload"}),(0,v.jsx)(P,{onClick:()=>{var e;return null===(e=document.getElementById("ingredient-image-upload"))||void 0===e?void 0:e.click()},children:he.image_url?(0,v.jsx)("img",{src:he.image_url,alt:"Ingredient"}):(0,v.jsx)(q,{children:"Click to upload image"})})]}),(0,v.jsxs)(x.fh,{children:[(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Ingredient Name *"}),(0,v.jsx)(x.ZQ,{type:"text",value:he.name,onChange:e=>me({...he,name:e.target.value}),placeholder:"e.g., Chicken Breast",required:!0})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Category"}),(0,v.jsxs)(x.FX,{value:he.category_id,onChange:e=>me({...he,category_id:e.target.value}),children:[(0,v.jsx)("option",{value:"",children:"Select category..."}),W.map(e=>(0,v.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]})]}),(0,v.jsxs)(x.fh,{children:[(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Base Quantity *"}),(0,v.jsx)(x.ZQ,{type:"number",step:"0.01",min:"0.01",value:he.base_quantity,onChange:e=>me({...he,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Unit *"}),(0,v.jsxs)(x.FX,{value:he.unit,onChange:e=>me({...he,unit:e.target.value}),required:!0,children:[(0,v.jsx)("option",{value:"",children:"Select unit..."}),(0,v.jsx)("option",{value:"kg",children:"kg"}),(0,v.jsx)("option",{value:"g",children:"g"}),(0,v.jsx)("option",{value:"L",children:"L"}),(0,v.jsx)("option",{value:"ml",children:"ml"}),(0,v.jsx)("option",{value:"piece",children:"piece"}),(0,v.jsx)("option",{value:"pack",children:"pack"}),(0,v.jsx)("option",{value:"can",children:"can"}),(0,v.jsx)("option",{value:"bottle",children:"bottle"})]})]})]}),(0,v.jsxs)(x.fh,{children:[(0,v.jsxs)(x.gE,{children:[(0,v.jsxs)(x.lR,{children:["Unit Cost (",a,") *"]}),(0,v.jsx)(x.ZQ,{type:"number",step:"0.01",min:"0",value:he.unit_cost,onChange:e=>me({...he,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Supplier"}),(0,v.jsx)(x.ZQ,{type:"text",value:he.supplier_name,onChange:e=>me({...he,supplier_name:e.target.value}),placeholder:"Supplier name"})]})]}),(0,v.jsxs)(U,{children:[(0,v.jsx)(x.yl,{type:"button",variant:"secondary",onClick:fe,children:"Cancel"}),(0,v.jsx)(x.yl,{type:"submit",variant:"primary",disabled:re,children:re?"Saving...":te?"Update Ingredient":"Create Ingredient"})]})]})}),(0,v.jsx)(g.A,{isOpen:xe.isOpen,title:"Delete Ingredient",message:`Are you sure you want to delete "${xe.ingredientName}"? This action cannot be undone.`,onConfirm:async()=>{if(xe.ingredientId)try{const e=await(0,h.ff)(`/api/product-ingredients/${xe.ingredientId}`,{method:"DELETE"});e.success?ye():alert(e.error||"Failed to delete ingredient")}catch(e){console.error("Failed to delete ingredient:",e),alert("Failed to delete ingredient")}finally{ge({isOpen:!1,ingredientId:null,ingredientName:""})}},onCancel:()=>{ge({isOpen:!1,ingredientId:null,ingredientName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"}),le&&se&&(0,v.jsxs)(x.aF,{isOpen:le,onClose:()=>ce(!1),title:se.name,size:"medium",children:[se.image_url&&(0,v.jsx)("div",{style:{width:"100%",aspectRatio:"300/180",borderRadius:"8px",overflow:"hidden",marginBottom:"16px",background:"#F6F9FC"},children:(0,v.jsx)("img",{src:se.image_url,alt:se.name,style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,v.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"12px",flexWrap:"wrap"},children:[(0,v.jsx)("span",{style:{fontSize:"11px",fontWeight:600,color:"#635BFF",background:"#F0F4FF",padding:"3px 8px",borderRadius:"4px"},children:se.category_name||"Uncategorized"}),se.track_stock&&(0,v.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#059669",background:"#ECFDF5",padding:"3px 8px",borderRadius:"4px"},children:"Tracking"})]}),(0,v.jsxs)("div",{style:{fontSize:"16px",fontWeight:600,color:"#0A2540",marginBottom:"16px"},children:["Unit Cost: ",Number(se.unit_cost).toFixed(2)," / ",se.unit]}),(0,v.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px",marginBottom:"16px"},children:[(0,v.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,v.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Base Qty"}),(0,v.jsxs)("div",{style:{fontSize:"14px",fontWeight:600},children:[Number(se.base_quantity||1)," ",se.unit]})]}),(0,v.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,v.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Current Stock"}),(0,v.jsx)("div",{style:{fontSize:"14px",fontWeight:600},children:se.track_stock?`${Number(se.current_stock||0).toFixed(1)} ${se.unit}`:"-"})]}),(0,v.jsxs)("div",{style:{padding:"10px",background:"#F9FAFB",borderRadius:"8px",textAlign:"center"},children:[(0,v.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginBottom:"3px"},children:"Min Stock"}),(0,v.jsx)("div",{style:{fontSize:"14px",fontWeight:600},children:se.track_stock?`${Number(se.min_stock||0)} ${se.unit}`:"-"})]})]}),se.supplier_name&&(0,v.jsxs)("div",{style:{marginBottom:"16px",fontSize:"13px",color:"#6B7280"},children:["Supplier: ",(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:500},children:se.supplier_name})]}),(0,v.jsxs)("div",{style:{padding:"12px",background:"#F0F4FF",borderRadius:"8px",border:"1px solid #DBEAFE",marginBottom:"16px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:600,color:"#1E40AF",marginBottom:"8px"},children:"Used In"}),0===pe.recipes.length&&0===pe.products.length?(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"Not linked to any recipe or product yet."}):(0,v.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"4px"},children:[pe.recipes.map(e=>(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#1E40AF"},children:[(0,v.jsx)("span",{style:{fontSize:"11px",background:"#EFF6FF",padding:"1px 6px",borderRadius:"3px",marginRight:"6px"},children:"Recipe"}),e.name]},"r"+e.id)),pe.products.map(e=>(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#059669"},children:[(0,v.jsx)("span",{style:{fontSize:"11px",background:"#ECFDF5",padding:"1px 6px",borderRadius:"3px",marginRight:"6px"},children:"Product"}),e.name]},"p"+e.id))]})]})]})]})},Q=i.Ay.div`
  padding: 24px 0;
`,Z=i.Ay.div`
  display: grid;
  gap: 12px;
`,J=i.Ay.div`
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
`,V=i.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,H=i.Ay.div`
  flex: 1;
`,X=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,K=i.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,G=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,ee=i.Ay.div`
  display: flex;
  gap: 8px;
`,te=i.Ay.button`
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
`,ne=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,re=i.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ie=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,oe=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,ae=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,se=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,de=i.Ay.button`
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
`,le=e=>{let{onCountChange:t,onCategoryChange:n}=e;const{t:i}=(0,b.Bd)("brand"),[o,s]=(0,r.useState)([]),[d,l]=(0,r.useState)(!0),[u,m]=(0,r.useState)(!1),[y,f]=(0,r.useState)(null),[j,F]=(0,r.useState)(!1),[k,C]=(0,r.useState)(!1),[w,_]=(0,r.useState)(null),[A,E]=(0,r.useState)({name:"",emoji:"",description:""}),B=(0,r.useCallback)(async()=>{try{l(!0);const n=await(0,h.ff)("/api/product-ingredient-categories");var e;if(n.success)s(n.data||[]),null===t||void 0===t||t((null===(e=n.data)||void 0===e?void 0:e.length)||0)}catch(n){console.error("Failed to fetch categories:",n)}finally{l(!1)}},[t]);(0,r.useEffect)(()=>{B()},[B]);const S=e=>{e?(f(e),E({name:e.name,emoji:e.emoji||"",description:e.description||""})):(f(null),E({name:"",emoji:"",description:""})),m(!0)},z=()=>{m(!1),f(null),E({name:"",emoji:"",description:""})},I=async e=>{if(e.preventDefault(),A.name.trim())try{F(!0);const e=y?`/api/product-ingredient-categories/${y.id}`:"/api/product-ingredient-categories",t=y?"PUT":"POST",r=await(0,h.ff)(e,{method:t,body:JSON.stringify({name:A.name.trim(),emoji:A.emoji||null,description:A.description.trim()||null})});r.success?(z(),B(),null===n||void 0===n||n()):alert(r.error||"Failed to save category")}catch(t){console.error("Failed to save category:",t),alert("Failed to save category")}finally{F(!1)}},$=async(e,t)=>{const n="up"===t?e-1:e+1;if(n<0||n>=o.length)return;const r=[...o];[r[e],r[n]]=[r[n],r[e]];const i=r.map((e,t)=>({id:e.id,display_order:t}));try{await(0,h.ff)("/api/product-ingredient-categories/reorder",{method:"PUT",body:JSON.stringify({orders:i})}),B()}catch(a){console.error("Failed to reorder:",a)}};return d?(0,v.jsx)(Q,{children:(0,v.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:i("brand:productIngredientCategoriesTab.loading")})}):(0,v.jsxs)(Q,{children:[(0,v.jsxs)(oe,{children:[(0,v.jsx)(ae,{children:i("brand:productIngredientCategoriesTab.ingredientCategories")}),(0,v.jsx)(p.cc,{variant:"primary",onClick:()=>S(),children:"Add Category"})]}),0===o.length?(0,v.jsxs)(c.pp,{children:[(0,v.jsx)(re,{children:i("brand:productIngredientCategoriesTab.noCategoriesYet")}),(0,v.jsx)(ie,{children:i("brand:productIngredientCategoriesTab.createCategoriesToOrganizeYourIngredients")}),(0,v.jsx)(p.cc,{variant:"primary",onClick:()=>S(),children:"Add First Category"})]}):(0,v.jsx)(Z,{children:o.map((e,t)=>(0,v.jsxs)(J,{isActive:e.is_active,children:[(0,v.jsx)(a.Xd,{onMoveUp:()=>$(t,"up"),onMoveDown:()=>$(t,"down"),disableUp:0===t,disableDown:t===o.length-1}),e.emoji&&(0,v.jsx)(V,{children:e.emoji}),(0,v.jsxs)(H,{children:[(0,v.jsx)(X,{children:e.name}),(0,v.jsxs)(K,{children:[(0,v.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),(0,v.jsx)(ne,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,v.jsx)(G,{children:e.description})]}),(0,v.jsxs)(ee,{children:[(0,v.jsx)(te,{onClick:()=>S(e),title:"Edit",children:(0,v.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,v.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,v.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,v.jsx)(te,{onClick:()=>(async e=>{try{(await(0,h.ff)(`/api/product-ingredient-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&B()}catch(t){console.error("Failed to toggle category:",t)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,v.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,v.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,v.jsx)(te,{onClick:()=>(e=>{_(e),C(!0)})(e),title:"Delete",disabled:(e.ingredient_count||0)>0,children:(0,v.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,v.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,v.jsx)(x.aF,{isOpen:u,onClose:z,title:(y?"Edit":"New")+" Ingredient Category",size:"medium",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(x.yl,{variant:"secondary",onClick:z,children:i("brand:productIngredientCategoriesTab.cancel")}),(0,v.jsx)(x.yl,{variant:"primary",onClick:I,disabled:!A.name.trim()||j,children:j?"Saving...":y?"Update":"Create"})]}),children:(0,v.jsxs)("form",{onSubmit:I,children:[(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:"Category Name *"}),(0,v.jsx)(x.ZQ,{type:"text",value:A.name,onChange:e=>E({...A,name:e.target.value}),placeholder:"e.g., Proteins",autoFocus:!0,required:!0})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:i("brand:productIngredientCategoriesTab.icon")}),(0,v.jsx)(se,{children:["\ud83e\udd69","\ud83c\udf56","\ud83e\udd53","\ud83c\udf57","\ud83e\udd90","\ud83e\udd9e","\ud83e\udd80","\ud83d\udc1f","\ud83e\udd5a","\ud83e\uddc0","\ud83e\udd6c","\ud83e\udd66","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83e\udd52","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83c\udf4e","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd5d","\ud83c\udf4c","\ud83e\udd6d","\ud83c\udf4d","\ud83e\uddc8","\ud83e\udd5b","\ud83e\uddc2","\ud83c\udf6f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5a","\ud83c\udf5d","\ud83e\udd6b","\ud83e\uddca","\ud83d\udca7","\ud83c\udf76","\ud83e\uded7","\ud83e\uddf4","\ud83e\uddf9","\ud83e\uddfd","\ud83d\udce6","\ud83c\udff7\ufe0f","\ud83d\udd16"].map(e=>(0,v.jsx)(de,{selected:A.emoji===e,onClick:()=>E({...A,emoji:e}),type:"button",children:e},e))})]}),(0,v.jsxs)(x.gE,{children:[(0,v.jsx)(x.lR,{children:i("brand:productIngredientCategoriesTab.description")}),(0,v.jsx)(x.Lz,{value:A.description,onChange:e=>E({...A,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,v.jsx)(g.A,{isOpen:k,onCancel:()=>{C(!1),_(null)},onConfirm:async()=>{if(w)try{const e=await(0,h.ff)(`/api/product-ingredient-categories/${w.id}`,{method:"DELETE"});e.success?(C(!1),_(null),B(),null===n||void 0===n||n()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:w?`Are you sure you want to delete "${w.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},ce=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,pe=i.Ay.select`
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
`,ue=()=>{const{t:e}=(0,b.Bd)("brand"),{user:t}=(0,l.As)(),[n,i]=(0,o.ok)(),[c,p]=(0,d.M)("ingredients"),[u,x]=(0,r.useState)(0),[g,h]=(0,r.useState)(0),[m,y]=(0,r.useState)([]),[j,F]=(0,r.useState)(!0),[k,C]=(0,r.useState)(0),w=n.get("brandId"),_=w?Number(w):m.length>0?m[0].id:null;(0,r.useEffect)(()=>{(async()=>{try{const e=(0,f.c4)(),t=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();y(e),e.length>0&&!w&&i({tab:c,brandId:String(e[0].id)})}}catch(e){console.error("Error fetching brands:",e)}finally{F(!1)}})()},[]);const A=e=>{p(e),_&&i(t=>(t.set("tab",e),t.set("brandId",String(_)),t))};return j?(0,v.jsxs)(a.mc,{children:[(0,v.jsx)(a.Y9,{children:(0,v.jsx)(a.hE,{children:e("brand:brandIngredientsPage.ingredients")})}),(0,v.jsx)(a.UC,{children:(0,v.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:e("brand:brandIngredientsPage.loading")})})]}):(0,v.jsxs)(a.mc,{children:[(0,v.jsxs)(a.Y9,{children:[(0,v.jsx)(a.hE,{children:e("brand:brandIngredientsPage.ingredients")}),m.length>0&&(0,v.jsx)(ce,{children:(0,v.jsx)(pe,{value:_||"",onChange:e=>i({tab:c,brandId:e.target.value}),children:m.map(e=>(0,v.jsx)("option",{value:e.id,children:e.name},e.id))})})]}),(0,v.jsxs)(a.UC,{children:[(0,v.jsxs)(s.tU,{children:[(0,v.jsxs)(s.oz,{active:"ingredients"===c,onClick:()=>A("ingredients"),children:["Ingredients ",(0,v.jsx)(s.Ex,{count:u,showZero:!0})]}),(0,v.jsxs)(s.oz,{active:"ingredient-categories"===c,onClick:()=>A("ingredient-categories"),children:["Categories ",(0,v.jsx)(s.Ex,{count:g,showZero:!0})]})]}),_&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("div",{style:{display:"ingredients"===c?"block":"none"},children:(0,v.jsx)(W,{brandId:_,onCountChange:x,categoryRefreshKey:k})}),(0,v.jsx)("div",{style:{display:"ingredient-categories"===c?"block":"none"},children:(0,v.jsx)(le,{brandId:_,onCountChange:h,onCategoryChange:()=>C(e=>e+1)})})]})]})]})}},2653:(e,t,n)=>{n.d(t,{M:()=>o});var r=n(9950),i=n(4492);function o(e){const[t,n]=(0,i.ok)(),o=(0,r.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,r.useState)(o());return[a,(0,r.useCallback)(e=>{s(e),n({tab:e})},[n])]}},3705:(e,t,n)=>{n.d(t,{cc:()=>i});var r=n(4752);const i=r.Ay.button`
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
`},4021:(e,t,n)=>{n.d(t,{i1:()=>s});var r=n(9950),i=n(1367),o=n(6038),a=n(9955);const s=()=>{const{user:e}=(0,i.As)(),[t,n]=(0,r.useState)("RM"),[s]=(0,r.useState)(Object.keys(o.DL)),[d,l]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return n("RM"),void l(!1);try{const e=(0,a.c4)(),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"MYR";n(r)}else n("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),n("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:d,error:c}}},7617:(e,t,n)=>{n.d(t,{A:()=>x});n(9950);var r=n(7119),i=n(4752),o=n(9610),a=n(4414);const s=i.Ay.div`
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
`,x=e=>{let{isOpen:t,title:n,message:i,onConfirm:x,onCancel:g,confirmText:h="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return t?r.createPortal((0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&g()},style:{zIndex:1100},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(d,{children:[(0,a.jsx)(l,{children:n}),(0,a.jsx)(c,{children:i})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(u,{variant:"secondary",onClick:g,children:m}),(0,a.jsx)(u,{variant:"primary",type:y,onClick:x,children:h})]})]})}),document.body):null}}}]);