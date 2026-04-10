"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2370],{2370:(e,n,i)=>{i.r(n),i.d(n,{default:()=>H});var t=i(9950),r=i(4752),o=i(2853),d=i(8930),a=i(9610),l=i(5030),s=i(9955),p=i(4414);const c=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,x=r.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,u=r.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,g=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,h=r.Ay.div`
  display: flex;
  gap: 12px;
`,m=r.Ay.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  ${e=>{switch(e.variant){case"danger":return"\n          background: #EF4444;\n          color: white;\n          &:hover {\n            background: #DC2626;\n          }\n        ";case"secondary":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E5E7EB;\n          &:hover {\n            background: #F9FAFB;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n          &:hover {\n            background: #5246ED;\n          }\n        "}}}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,y=r.Ay.div`
  display: grid;
  gap: 16px;
  padding: 24px 0;
`,f=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,j=r.Ay.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 16px;
`,b=r.Ay.div`
  flex: 1;
`,v=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,k=r.Ay.div`
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 8px;
`,F=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  
  ${e=>{switch(e.type){case"required":return"\n          background: #FEE2E2;\n          color: #DC2626;\n        ";case"optional":return"\n          background: #E0F2FE;\n          color: #0369A1;\n        ";case"single":default:return"\n          background: #F3F4F6;\n          color: #6B7280;\n        ";case"multiple":return"\n          background: #ECFDF5;\n          color: #059669;\n        "}}}
`,A=r.Ay.div`
  display: flex;
  gap: 8px;
`,w=r.Ay.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: #6B7280;
  }
`,C=r.Ay.div`
  display: grid;
  gap: 8px;
`,E=r.Ay.div`
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 8px 12px;
  background: #F9FAFB;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
`,B=r.Ay.div`
  flex: 1;
`,_=r.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,q=r.Ay.span`
  font-size: 13px;
  color: #6B7280;
  margin-left: 8px;
`,z=r.Ay.div`
  margin-bottom: 20px;
`,M=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,S=r.Ay.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,O=r.Ay.div`
  display: flex;
  gap: 16px;
`,D=r.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
`,G=r.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
`,P=r.Ay.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
`,L=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,R=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,$=r.Ay.div`
  margin-top: 16px;
`,T=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;
  
  &:last-child {
    border-bottom: none;
  }
`,W=r.Ay.button`
  background: #FEE2E2;
  color: #DC2626;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #FECACA;
  }
`,H=()=>{const{t:e}=(0,l.Bd)("menu"),{optionGroups:n,addOptionGroup:i,updateOptionGroup:r,deleteOptionGroup:H}=(0,d.b)(),[I,N]=(0,t.useState)(!1),[U,V]=(0,t.useState)(!1),[Y,Q]=(0,t.useState)(null),[J,K]=(0,t.useState)(null),[X,Z]=(0,t.useState)({name:"",required:!1,multiple:!1,options:[]}),[ee,ne]=(0,t.useState)({id:"",name:"",price:0,ingredient_id:null,ingredient_quantity:1}),[ie,te]=(0,t.useState)([]);t.useEffect(()=>{(async()=>{try{const e=(0,s.c4)(),n=window.location.pathname.split("/"),i=n.indexOf("restaurant"),t=i>=0?n[i+1]:null;if(!t)return;const r=await fetch(`/api/restaurants/${t}/ingredients`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();te((e.success?e.data:e)||[])}}catch(e){console.error("Failed to fetch ingredients:",e)}})()},[]);const re=e=>{e?(K(e),Z({name:e.name,required:e.required,multiple:e.multiple,options:[...e.options]})):(K(null),Z({name:"",required:!1,multiple:!1,options:[]})),N(!0)},oe=()=>{N(!1),K(null),Z({name:"",required:!1,multiple:!1,options:[]}),ne({id:"",name:"",price:0,ingredient_id:null,ingredient_quantity:1})};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(c,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(g,{children:e("menu:optionManagementPage.options")}),(0,p.jsx)(h,{children:(0,p.jsxs)(m,{onClick:()=>re(),children:[(0,p.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:(0,p.jsx)("path",{d:"M8 3V13M3 8H13",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})}),"Add Option Group"]})})]}),(0,p.jsx)(x,{children:0===n.length?(0,p.jsxs)(o.pp,{children:[(0,p.jsx)(P,{children:"\u2699\ufe0f"}),(0,p.jsx)(L,{children:e("menu:optionManagementPage.noOptionGroupsYet")}),(0,p.jsx)(R,{children:"Create your first option group to add customizable options to your menu items"}),(0,p.jsx)(m,{onClick:()=>re(),children:"Create Option Group"})]}):(0,p.jsx)(y,{children:n.map(e=>(0,p.jsxs)(f,{children:[(0,p.jsxs)(j,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(v,{children:e.name}),(0,p.jsxs)(k,{children:[(0,p.jsx)(F,{type:e.required?"required":"optional",children:e.required?"Required":"Optional"}),(0,p.jsx)(F,{type:e.multiple?"multiple":"single",children:e.multiple?"Multiple Selection":"Single Selection"}),(0,p.jsxs)("span",{children:[e.options.length," options"]})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(w,{onClick:()=>re(e),children:(0,p.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,p.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,p.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,p.jsx)(w,{onClick:()=>{return n=e.id,Q(n),void V(!0);var n},children:(0,p.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,p.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,p.jsx)(C,{children:e.options.map(e=>(0,p.jsx)(E,{children:(0,p.jsxs)(B,{children:[(0,p.jsx)(_,{children:e.name}),e.price>0&&(0,p.jsxs)(q,{children:["+RM ",e.price.toFixed(2)]})]})},e.id))})]},e.id))})}),(0,p.jsxs)(a.aF,{isOpen:I,onClose:oe,title:J?"Edit Option Group":"New Option Group",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(a.yl,{variant:"secondary",onClick:oe,children:"Cancel"}),(0,p.jsx)(a.yl,{variant:"primary",onClick:()=>{if(X.name.trim()&&0!==X.options.length){if(J)r(J.id,{...X,id:J.id});else{const e={id:`group-${Date.now()}`,...X};i(e)}oe()}},disabled:!X.name.trim()||0===X.options.length,children:J?"Update":"Create"})]}),children:[(0,p.jsxs)(z,{children:[(0,p.jsx)(M,{children:e("menu:optionManagementPage.groupName")}),(0,p.jsx)(S,{type:"text",value:X.name,onChange:e=>Z({...X,name:e.target.value}),placeholder:"e.g., Size, Spice Level, Extra Toppings",autoFocus:!0})]}),(0,p.jsxs)(z,{children:[(0,p.jsx)(M,{children:e("menu:optionManagementPage.selectionType")}),(0,p.jsxs)(O,{children:[(0,p.jsxs)(D,{children:[(0,p.jsx)(G,{type:"checkbox",checked:X.required,onChange:e=>Z({...X,required:e.target.checked})}),"Required"]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(G,{type:"checkbox",checked:X.multiple,onChange:e=>Z({...X,multiple:e.target.checked})}),"Multiple Selection"]})]})]}),(0,p.jsxs)(z,{children:[(0,p.jsx)(M,{children:e("menu:optionManagementPage.addOption")}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"4px"},children:[(0,p.jsx)(S,{type:"text",value:ee.name,onChange:e=>ne({...ee,name:e.target.value}),placeholder:"Option name",style:{flex:2}}),(0,p.jsx)(S,{type:"number",value:ee.price,onChange:e=>ne({...ee,price:parseFloat(e.target.value)||0}),placeholder:"Price",step:"0.50",min:"0",style:{flex:1}}),(0,p.jsx)(m,{variant:"secondary",onClick:()=>{if(!ee.name.trim())return;const e=ee.ingredient_id?ie.find(e=>e.id===ee.ingredient_id):null,n={id:`opt-${Date.now()}`,name:ee.name,price:ee.price,ingredient_id:ee.ingredient_id||null,ingredient_quantity:ee.ingredient_quantity||1,ingredient_name:(null===e||void 0===e?void 0:e.name)||void 0,ingredient_unit:(null===e||void 0===e?void 0:e.unit)||void 0};Z({...X,options:[...X.options,n]}),ne({id:"",name:"",price:0,ingredient_id:null,ingredient_quantity:1})},disabled:!ee.name.trim(),children:"Add"})]}),(0,p.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"8px"},children:[(0,p.jsxs)("select",{value:ee.ingredient_id||"",onChange:e=>ne({...ee,ingredient_id:e.target.value?Number(e.target.value):null}),style:{flex:2,padding:"8px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"13px",color:ee.ingredient_id?"#0A2540":"#9CA3AF"},children:[(0,p.jsx)("option",{value:"",children:e("menu:optionManagementPage.linkedIngredientOptional")}),ie.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.name," (",e.unit,")"]},e.id))]}),ee.ingredient_id&&(0,p.jsx)(S,{type:"number",value:ee.ingredient_quantity||1,onChange:e=>ne({...ee,ingredient_quantity:parseFloat(e.target.value)||1}),placeholder:"Qty",step:"0.01",min:"0.01",style:{flex:1}})]}),(0,p.jsx)($,{children:X.options.map(e=>(0,p.jsxs)(T,{children:[(0,p.jsxs)("div",{style:{flex:1},children:[(0,p.jsx)("strong",{children:e.name}),e.price>0&&(0,p.jsxs)("span",{children:[" (+RM ",e.price.toFixed(2),")"]}),e.ingredient_name&&(0,p.jsxs)("span",{style:{fontSize:"11px",color:"#6B7280",marginLeft:"8px"},children:["\u2192 ",e.ingredient_name," ",e.ingredient_quantity,e.ingredient_unit]})]}),(0,p.jsx)(W,{onClick:()=>{return n=e.id,void Z({...X,options:X.options.filter(e=>e.id!==n)});var n},children:"\xd7"})]},e.id))})]})]}),(0,p.jsx)(a.aF,{isOpen:U,onClose:()=>V(!1),title:"Delete Option Group",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(a.yl,{variant:"secondary",onClick:()=>V(!1),children:"Cancel"}),(0,p.jsx)(a.yl,{variant:"danger",onClick:()=>{Y&&(H(Y),V(!1),Q(null))},children:"Delete"})]}),children:(0,p.jsx)("p",{children:e("menu:optionManagementPage.areYouSureYouWantToDeleteThisOptionGroupThisActionCannotBeUndone")})})]})})}}}]);