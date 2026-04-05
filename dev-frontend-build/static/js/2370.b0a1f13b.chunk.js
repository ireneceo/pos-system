"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2370],{2370:(e,n,i)=>{i.r(n),i.d(n,{default:()=>W});var t=i(9950),r=i(4752),o=i(2853),d=i(8930),l=i(9610),a=i(4414);const s=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,p=r.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,c=r.Ay.div`
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
`,x=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,u=r.Ay.div`
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
`,g=r.Ay.div`
  display: grid;
  gap: 16px;
  padding: 24px 0;
`,m=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,y=r.Ay.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 16px;
`,f=r.Ay.div`
  flex: 1;
`,b=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,j=r.Ay.div`
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 8px;
`,v=r.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  
  ${e=>{switch(e.type){case"required":return"\n          background: #FEE2E2;\n          color: #DC2626;\n        ";case"optional":return"\n          background: #E0F2FE;\n          color: #0369A1;\n        ";case"single":default:return"\n          background: #F3F4F6;\n          color: #6B7280;\n        ";case"multiple":return"\n          background: #ECFDF5;\n          color: #059669;\n        "}}}
`,k=r.Ay.div`
  display: flex;
  gap: 8px;
`,F=r.Ay.button`
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
`,A=r.Ay.div`
  display: grid;
  gap: 8px;
`,w=r.Ay.div`
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 8px 12px;
  background: #F9FAFB;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
`,C=r.Ay.div`
  flex: 1;
`,E=r.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,B=r.Ay.span`
  font-size: 13px;
  color: #6B7280;
  margin-left: 8px;
`,_=r.Ay.div`
  margin-bottom: 20px;
`,q=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,z=r.Ay.input`
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
`,M=r.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
`,D=r.Ay.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
`,G=r.Ay.h3`
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
`,N=r.Ay.button`
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
`,W=()=>{const{optionGroups:e,addOptionGroup:n,updateOptionGroup:i,deleteOptionGroup:r}=(0,d.b)(),[W,H]=(0,t.useState)(!1),[I,T]=(0,t.useState)(!1),[V,U]=(0,t.useState)(null),[P,Q]=(0,t.useState)(null),[J,K]=(0,t.useState)({name:"",required:!1,multiple:!1,options:[]}),[X,Y]=(0,t.useState)({id:"",name:"",price:0,ingredient_id:null,ingredient_quantity:1}),[Z,ee]=(0,t.useState)([]);t.useEffect(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=window.location.pathname.split("/"),i=n.indexOf("restaurant"),t=i>=0?n[i+1]:null;if(!t)return;const r=await fetch(`/api/restaurants/${t}/ingredients`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();ee((e.success?e.data:e)||[])}}catch(e){console.error("Failed to fetch ingredients:",e)}})()},[]);const ne=e=>{e?(Q(e),K({name:e.name,required:e.required,multiple:e.multiple,options:[...e.options]})):(Q(null),K({name:"",required:!1,multiple:!1,options:[]})),H(!0)},ie=()=>{H(!1),Q(null),K({name:"",required:!1,multiple:!1,options:[]}),Y({id:"",name:"",price:0,ingredient_id:null,ingredient_quantity:1})};return(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)(s,{children:[(0,a.jsxs)(c,{children:[(0,a.jsx)(x,{children:"Options"}),(0,a.jsx)(u,{children:(0,a.jsxs)(h,{onClick:()=>ne(),children:[(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:(0,a.jsx)("path",{d:"M8 3V13M3 8H13",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})}),"Add Option Group"]})})]}),(0,a.jsx)(p,{children:0===e.length?(0,a.jsxs)(o.pp,{children:[(0,a.jsx)(D,{children:"\u2699\ufe0f"}),(0,a.jsx)(G,{children:"No option groups yet"}),(0,a.jsx)(L,{children:"Create your first option group to add customizable options to your menu items"}),(0,a.jsx)(h,{onClick:()=>ne(),children:"Create Option Group"})]}):(0,a.jsx)(g,{children:e.map(e=>(0,a.jsxs)(m,{children:[(0,a.jsxs)(y,{children:[(0,a.jsxs)(f,{children:[(0,a.jsx)(b,{children:e.name}),(0,a.jsxs)(j,{children:[(0,a.jsx)(v,{type:e.required?"required":"optional",children:e.required?"Required":"Optional"}),(0,a.jsx)(v,{type:e.multiple?"multiple":"single",children:e.multiple?"Multiple Selection":"Single Selection"}),(0,a.jsxs)("span",{children:[e.options.length," options"]})]})]}),(0,a.jsxs)(k,{children:[(0,a.jsx)(F,{onClick:()=>ne(e),children:(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,a.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,a.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,a.jsx)(F,{onClick:()=>{return n=e.id,U(n),void T(!0);var n},children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,a.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,a.jsx)(A,{children:e.options.map(e=>(0,a.jsx)(w,{children:(0,a.jsxs)(C,{children:[(0,a.jsx)(E,{children:e.name}),e.price>0&&(0,a.jsxs)(B,{children:["+RM ",e.price.toFixed(2)]})]})},e.id))})]},e.id))})}),(0,a.jsxs)(l.aF,{isOpen:W,onClose:ie,title:P?"Edit Option Group":"New Option Group",footer:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.yl,{variant:"secondary",onClick:ie,children:"Cancel"}),(0,a.jsx)(l.yl,{variant:"primary",onClick:()=>{if(J.name.trim()&&0!==J.options.length){if(P)i(P.id,{...J,id:P.id});else{const e={id:`group-${Date.now()}`,...J};n(e)}ie()}},disabled:!J.name.trim()||0===J.options.length,children:P?"Update":"Create"})]}),children:[(0,a.jsxs)(_,{children:[(0,a.jsx)(q,{children:"Group Name"}),(0,a.jsx)(z,{type:"text",value:J.name,onChange:e=>K({...J,name:e.target.value}),placeholder:"e.g., Size, Spice Level, Extra Toppings",autoFocus:!0})]}),(0,a.jsxs)(_,{children:[(0,a.jsx)(q,{children:"Selection Type"}),(0,a.jsxs)(S,{children:[(0,a.jsxs)(O,{children:[(0,a.jsx)(M,{type:"checkbox",checked:J.required,onChange:e=>K({...J,required:e.target.checked})}),"Required"]}),(0,a.jsxs)(O,{children:[(0,a.jsx)(M,{type:"checkbox",checked:J.multiple,onChange:e=>K({...J,multiple:e.target.checked})}),"Multiple Selection"]})]})]}),(0,a.jsxs)(_,{children:[(0,a.jsx)(q,{children:"Add Option"}),(0,a.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"4px"},children:[(0,a.jsx)(z,{type:"text",value:X.name,onChange:e=>Y({...X,name:e.target.value}),placeholder:"Option name",style:{flex:2}}),(0,a.jsx)(z,{type:"number",value:X.price,onChange:e=>Y({...X,price:parseFloat(e.target.value)||0}),placeholder:"Price",step:"0.50",min:"0",style:{flex:1}}),(0,a.jsx)(h,{variant:"secondary",onClick:()=>{if(!X.name.trim())return;const e=X.ingredient_id?Z.find(e=>e.id===X.ingredient_id):null,n={id:`opt-${Date.now()}`,name:X.name,price:X.price,ingredient_id:X.ingredient_id||null,ingredient_quantity:X.ingredient_quantity||1,ingredient_name:(null===e||void 0===e?void 0:e.name)||void 0,ingredient_unit:(null===e||void 0===e?void 0:e.unit)||void 0};K({...J,options:[...J.options,n]}),Y({id:"",name:"",price:0,ingredient_id:null,ingredient_quantity:1})},disabled:!X.name.trim(),children:"Add"})]}),(0,a.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"8px"},children:[(0,a.jsxs)("select",{value:X.ingredient_id||"",onChange:e=>Y({...X,ingredient_id:e.target.value?Number(e.target.value):null}),style:{flex:2,padding:"8px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"13px",color:X.ingredient_id?"#0A2540":"#9CA3AF"},children:[(0,a.jsx)("option",{value:"",children:"Linked ingredient (optional)"}),Z.map(e=>(0,a.jsxs)("option",{value:e.id,children:[e.name," (",e.unit,")"]},e.id))]}),X.ingredient_id&&(0,a.jsx)(z,{type:"number",value:X.ingredient_quantity||1,onChange:e=>Y({...X,ingredient_quantity:parseFloat(e.target.value)||1}),placeholder:"Qty",step:"0.01",min:"0.01",style:{flex:1}})]}),(0,a.jsx)(R,{children:J.options.map(e=>(0,a.jsxs)($,{children:[(0,a.jsxs)("div",{style:{flex:1},children:[(0,a.jsx)("strong",{children:e.name}),e.price>0&&(0,a.jsxs)("span",{children:[" (+RM ",e.price.toFixed(2),")"]}),e.ingredient_name&&(0,a.jsxs)("span",{style:{fontSize:"11px",color:"#6B7280",marginLeft:"8px"},children:["\u2192 ",e.ingredient_name," ",e.ingredient_quantity,e.ingredient_unit]})]}),(0,a.jsx)(N,{onClick:()=>{return n=e.id,void K({...J,options:J.options.filter(e=>e.id!==n)});var n},children:"\xd7"})]},e.id))})]})]}),(0,a.jsx)(l.aF,{isOpen:I,onClose:()=>T(!1),title:"Delete Option Group",footer:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.yl,{variant:"secondary",onClick:()=>T(!1),children:"Cancel"}),(0,a.jsx)(l.yl,{variant:"danger",onClick:()=>{V&&(r(V),T(!1),U(null))},children:"Delete"})]}),children:(0,a.jsx)("p",{children:"Are you sure you want to delete this option group? This action cannot be undone."})})]})})}}}]);