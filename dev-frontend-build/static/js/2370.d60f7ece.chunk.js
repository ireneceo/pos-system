"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2370],{2370:(e,n,i)=>{i.r(n),i.d(n,{default:()=>W});var t=i(9950),r=i(4752),o=i(2853),a=i(8930),d=i(9610),l=i(5030),s=i(4414);const p=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,c=r.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,x=r.Ay.div`
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
`,u=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,g=r.Ay.div`
  display: flex;
  gap: 12px;
`,h=r.Ay.button`
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
`,m=r.Ay.div`
  display: grid;
  gap: 16px;
  padding: 24px 0;
`,y=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,f=r.Ay.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 16px;
`,j=r.Ay.div`
  flex: 1;
`,b=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,v=r.Ay.div`
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 8px;
`,k=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  
  ${e=>{switch(e.type){case"required":return"\n          background: #FEE2E2;\n          color: #DC2626;\n        ";case"optional":return"\n          background: #E0F2FE;\n          color: #0369A1;\n        ";case"single":default:return"\n          background: #F3F4F6;\n          color: #6B7280;\n        ";case"multiple":return"\n          background: #ECFDF5;\n          color: #059669;\n        "}}}
`,F=r.Ay.div`
  display: flex;
  gap: 8px;
`,A=r.Ay.button`
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
`,w=r.Ay.div`
  display: grid;
  gap: 8px;
`,C=r.Ay.div`
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 8px 12px;
  background: #F9FAFB;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
`,E=r.Ay.div`
  flex: 1;
`,B=r.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,_=r.Ay.span`
  font-size: 13px;
  color: #6B7280;
  margin-left: 8px;
`,q=r.Ay.div`
  margin-bottom: 20px;
`,z=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,M=r.Ay.input`
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
`,S=r.Ay.div`
  display: flex;
  gap: 16px;
`,O=r.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
`,D=r.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
`,G=r.Ay.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
`,P=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,L=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,R=r.Ay.div`
  margin-top: 16px;
`,$=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;
  
  &:last-child {
    border-bottom: none;
  }
`,T=r.Ay.button`
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
`,W=()=>{const{t:e}=(0,l.Bd)("menu"),{optionGroups:n,addOptionGroup:i,updateOptionGroup:r,deleteOptionGroup:W}=(0,a.b)(),[I,H]=(0,t.useState)(!1),[N,U]=(0,t.useState)(!1),[V,Y]=(0,t.useState)(null),[Q,J]=(0,t.useState)(null),[K,X]=(0,t.useState)({name:"",required:!1,multiple:!1,options:[]}),[Z,ee]=(0,t.useState)({id:"",name:"",price:0,ingredient_id:null,ingredient_quantity:1}),[ne,ie]=(0,t.useState)([]);t.useEffect(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=window.location.pathname.split("/"),i=n.indexOf("restaurant"),t=i>=0?n[i+1]:null;if(!t)return;const r=await fetch(`/api/restaurants/${t}/ingredients`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();ie((e.success?e.data:e)||[])}}catch(e){console.error("Failed to fetch ingredients:",e)}})()},[]);const te=e=>{e?(J(e),X({name:e.name,required:e.required,multiple:e.multiple,options:[...e.options]})):(J(null),X({name:"",required:!1,multiple:!1,options:[]})),H(!0)},re=()=>{H(!1),J(null),X({name:"",required:!1,multiple:!1,options:[]}),ee({id:"",name:"",price:0,ingredient_id:null,ingredient_quantity:1})};return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(p,{children:[(0,s.jsxs)(x,{children:[(0,s.jsx)(u,{children:e("menu:optionManagementPage.options")}),(0,s.jsx)(g,{children:(0,s.jsxs)(h,{onClick:()=>te(),children:[(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:(0,s.jsx)("path",{d:"M8 3V13M3 8H13",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})}),"Add Option Group"]})})]}),(0,s.jsx)(c,{children:0===n.length?(0,s.jsxs)(o.pp,{children:[(0,s.jsx)(G,{children:"\u2699\ufe0f"}),(0,s.jsx)(P,{children:e("menu:optionManagementPage.noOptionGroupsYet")}),(0,s.jsx)(L,{children:"Create your first option group to add customizable options to your menu items"}),(0,s.jsx)(h,{onClick:()=>te(),children:"Create Option Group"})]}):(0,s.jsx)(m,{children:n.map(e=>(0,s.jsxs)(y,{children:[(0,s.jsxs)(f,{children:[(0,s.jsxs)(j,{children:[(0,s.jsx)(b,{children:e.name}),(0,s.jsxs)(v,{children:[(0,s.jsx)(k,{type:e.required?"required":"optional",children:e.required?"Required":"Optional"}),(0,s.jsx)(k,{type:e.multiple?"multiple":"single",children:e.multiple?"Multiple Selection":"Single Selection"}),(0,s.jsxs)("span",{children:[e.options.length," options"]})]})]}),(0,s.jsxs)(F,{children:[(0,s.jsx)(A,{onClick:()=>te(e),children:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,s.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,s.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,s.jsx)(A,{onClick:()=>{return n=e.id,Y(n),void U(!0);var n},children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,s.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,s.jsx)(w,{children:e.options.map(e=>(0,s.jsx)(C,{children:(0,s.jsxs)(E,{children:[(0,s.jsx)(B,{children:e.name}),e.price>0&&(0,s.jsxs)(_,{children:["+RM ",e.price.toFixed(2)]})]})},e.id))})]},e.id))})}),(0,s.jsxs)(d.aF,{isOpen:I,onClose:re,title:Q?"Edit Option Group":"New Option Group",footer:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(d.yl,{variant:"secondary",onClick:re,children:"Cancel"}),(0,s.jsx)(d.yl,{variant:"primary",onClick:()=>{if(K.name.trim()&&0!==K.options.length){if(Q)r(Q.id,{...K,id:Q.id});else{const e={id:`group-${Date.now()}`,...K};i(e)}re()}},disabled:!K.name.trim()||0===K.options.length,children:Q?"Update":"Create"})]}),children:[(0,s.jsxs)(q,{children:[(0,s.jsx)(z,{children:e("menu:optionManagementPage.groupName")}),(0,s.jsx)(M,{type:"text",value:K.name,onChange:e=>X({...K,name:e.target.value}),placeholder:"e.g., Size, Spice Level, Extra Toppings",autoFocus:!0})]}),(0,s.jsxs)(q,{children:[(0,s.jsx)(z,{children:e("menu:optionManagementPage.selectionType")}),(0,s.jsxs)(S,{children:[(0,s.jsxs)(O,{children:[(0,s.jsx)(D,{type:"checkbox",checked:K.required,onChange:e=>X({...K,required:e.target.checked})}),"Required"]}),(0,s.jsxs)(O,{children:[(0,s.jsx)(D,{type:"checkbox",checked:K.multiple,onChange:e=>X({...K,multiple:e.target.checked})}),"Multiple Selection"]})]})]}),(0,s.jsxs)(q,{children:[(0,s.jsx)(z,{children:e("menu:optionManagementPage.addOption")}),(0,s.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"4px"},children:[(0,s.jsx)(M,{type:"text",value:Z.name,onChange:e=>ee({...Z,name:e.target.value}),placeholder:"Option name",style:{flex:2}}),(0,s.jsx)(M,{type:"number",value:Z.price,onChange:e=>ee({...Z,price:parseFloat(e.target.value)||0}),placeholder:"Price",step:"0.50",min:"0",style:{flex:1}}),(0,s.jsx)(h,{variant:"secondary",onClick:()=>{if(!Z.name.trim())return;const e=Z.ingredient_id?ne.find(e=>e.id===Z.ingredient_id):null,n={id:`opt-${Date.now()}`,name:Z.name,price:Z.price,ingredient_id:Z.ingredient_id||null,ingredient_quantity:Z.ingredient_quantity||1,ingredient_name:(null===e||void 0===e?void 0:e.name)||void 0,ingredient_unit:(null===e||void 0===e?void 0:e.unit)||void 0};X({...K,options:[...K.options,n]}),ee({id:"",name:"",price:0,ingredient_id:null,ingredient_quantity:1})},disabled:!Z.name.trim(),children:"Add"})]}),(0,s.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"8px"},children:[(0,s.jsxs)("select",{value:Z.ingredient_id||"",onChange:e=>ee({...Z,ingredient_id:e.target.value?Number(e.target.value):null}),style:{flex:2,padding:"8px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"13px",color:Z.ingredient_id?"#0A2540":"#9CA3AF"},children:[(0,s.jsx)("option",{value:"",children:e("menu:optionManagementPage.linkedIngredientOptional")}),ne.map(e=>(0,s.jsxs)("option",{value:e.id,children:[e.name," (",e.unit,")"]},e.id))]}),Z.ingredient_id&&(0,s.jsx)(M,{type:"number",value:Z.ingredient_quantity||1,onChange:e=>ee({...Z,ingredient_quantity:parseFloat(e.target.value)||1}),placeholder:"Qty",step:"0.01",min:"0.01",style:{flex:1}})]}),(0,s.jsx)(R,{children:K.options.map(e=>(0,s.jsxs)($,{children:[(0,s.jsxs)("div",{style:{flex:1},children:[(0,s.jsx)("strong",{children:e.name}),e.price>0&&(0,s.jsxs)("span",{children:[" (+RM ",e.price.toFixed(2),")"]}),e.ingredient_name&&(0,s.jsxs)("span",{style:{fontSize:"11px",color:"#6B7280",marginLeft:"8px"},children:["\u2192 ",e.ingredient_name," ",e.ingredient_quantity,e.ingredient_unit]})]}),(0,s.jsx)(T,{onClick:()=>{return n=e.id,void X({...K,options:K.options.filter(e=>e.id!==n)});var n},children:"\xd7"})]},e.id))})]})]}),(0,s.jsx)(d.aF,{isOpen:N,onClose:()=>U(!1),title:"Delete Option Group",footer:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(d.yl,{variant:"secondary",onClick:()=>U(!1),children:"Cancel"}),(0,s.jsx)(d.yl,{variant:"danger",onClick:()=>{V&&(W(V),U(!1),Y(null))},children:"Delete"})]}),children:(0,s.jsx)("p",{children:e("menu:optionManagementPage.areYouSureYouWantToDeleteThisOptionGroupThisActionCannotBeUndone")})})]})})}}}]);