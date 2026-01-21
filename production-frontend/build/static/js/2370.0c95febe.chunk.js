"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2370],{2370:(e,n,i)=>{i.r(n),i.d(n,{default:()=>T});var r=i(9950),o=i(4752),t=i(3310),d=i(8930),l=i(9610),s=i(4414);const a=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,p=o.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,c=o.Ay.div`
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
`,x=o.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,h=o.Ay.div`
  display: flex;
  gap: 12px;
`,u=o.Ay.button`
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
`,g=o.Ay.div`
  display: grid;
  gap: 16px;
  padding: 24px 0;
`,m=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,y=o.Ay.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 16px;
`,b=o.Ay.div`
  flex: 1;
`,j=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,f=o.Ay.div`
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 8px;
`,v=o.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  
  ${e=>{switch(e.type){case"required":return"\n          background: #FEE2E2;\n          color: #DC2626;\n        ";case"optional":return"\n          background: #E0F2FE;\n          color: #0369A1;\n        ";case"single":default:return"\n          background: #F3F4F6;\n          color: #6B7280;\n        ";case"multiple":return"\n          background: #ECFDF5;\n          color: #059669;\n        "}}}
`,k=o.Ay.div`
  display: flex;
  gap: 8px;
`,A=o.Ay.button`
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
`,F=o.Ay.div`
  display: grid;
  gap: 8px;
`,w=o.Ay.div`
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 8px 12px;
  background: #F9FAFB;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
`,C=o.Ay.div`
  flex: 1;
`,E=o.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,B=o.Ay.span`
  font-size: 13px;
  color: #6B7280;
  margin-left: 8px;
`,z=o.Ay.div`
  margin-bottom: 20px;
`,S=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,O=o.Ay.input`
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
`,q=o.Ay.div`
  display: flex;
  gap: 16px;
`,M=o.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
`,D=o.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
`,G=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  margin: 24px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,L=o.Ay.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
`,R=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,W=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,$=o.Ay.div`
  margin-top: 16px;
`,H=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;
  
  &:last-child {
    border-bottom: none;
  }
`,N=o.Ay.button`
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
`,T=()=>{const{optionGroups:e,addOptionGroup:n,updateOptionGroup:i,deleteOptionGroup:o}=(0,d.b)(),[T,V]=(0,r.useState)(!1),[I,U]=(0,r.useState)(!1),[P,J]=(0,r.useState)(null),[K,Q]=(0,r.useState)(null),[X,Y]=(0,r.useState)({name:"",required:!1,multiple:!1,options:[]}),[Z,_]=(0,r.useState)({name:"",price:0}),ee=e=>{e?(Q(e),Y({name:e.name,required:e.required,multiple:e.multiple,options:[...e.options]})):(Q(null),Y({name:"",required:!1,multiple:!1,options:[]})),V(!0)},ne=()=>{V(!1),Q(null),Y({name:"",required:!1,multiple:!1,options:[]}),_({name:"",price:0})};return(0,s.jsx)(t.A,{children:(0,s.jsxs)(a,{children:[(0,s.jsxs)(c,{children:[(0,s.jsx)(x,{children:"Options"}),(0,s.jsx)(h,{children:(0,s.jsxs)(u,{onClick:()=>ee(),children:[(0,s.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:(0,s.jsx)("path",{d:"M8 3V13M3 8H13",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})}),"Add Option Group"]})})]}),(0,s.jsx)(p,{children:0===e.length?(0,s.jsxs)(G,{children:[(0,s.jsx)(L,{children:"\u2699\ufe0f"}),(0,s.jsx)(R,{children:"No option groups yet"}),(0,s.jsx)(W,{children:"Create your first option group to add customizable options to your menu items"}),(0,s.jsx)(u,{onClick:()=>ee(),children:"Create Option Group"})]}):(0,s.jsx)(g,{children:e.map(e=>(0,s.jsxs)(m,{children:[(0,s.jsxs)(y,{children:[(0,s.jsxs)(b,{children:[(0,s.jsx)(j,{children:e.name}),(0,s.jsxs)(f,{children:[(0,s.jsx)(v,{type:e.required?"required":"optional",children:e.required?"Required":"Optional"}),(0,s.jsx)(v,{type:e.multiple?"multiple":"single",children:e.multiple?"Multiple Selection":"Single Selection"}),(0,s.jsxs)("span",{children:[e.options.length," options"]})]})]}),(0,s.jsxs)(k,{children:[(0,s.jsx)(A,{onClick:()=>ee(e),children:(0,s.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,s.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,s.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,s.jsx)(A,{onClick:()=>{return n=e.id,J(n),void U(!0);var n},children:(0,s.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,s.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,s.jsx)(F,{children:e.options.map(e=>(0,s.jsx)(w,{children:(0,s.jsxs)(C,{children:[(0,s.jsx)(E,{children:e.name}),e.price>0&&(0,s.jsxs)(B,{children:["+RM ",e.price.toFixed(2)]})]})},e.id))})]},e.id))})}),(0,s.jsxs)(l.aF,{isOpen:T,onClose:ne,title:K?"Edit Option Group":"New Option Group",footer:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l.yl,{variant:"secondary",onClick:ne,children:"Cancel"}),(0,s.jsx)(l.yl,{variant:"primary",onClick:()=>{if(X.name.trim()&&0!==X.options.length){if(K)i(K.id,{...X,id:K.id});else{const e={id:`group-${Date.now()}`,...X};n(e)}ne()}},disabled:!X.name.trim()||0===X.options.length,children:K?"Update":"Create"})]}),children:[(0,s.jsxs)(z,{children:[(0,s.jsx)(S,{children:"Group Name"}),(0,s.jsx)(O,{type:"text",value:X.name,onChange:e=>Y({...X,name:e.target.value}),placeholder:"e.g., Size, Spice Level, Extra Toppings",autoFocus:!0})]}),(0,s.jsxs)(z,{children:[(0,s.jsx)(S,{children:"Selection Type"}),(0,s.jsxs)(q,{children:[(0,s.jsxs)(M,{children:[(0,s.jsx)(D,{type:"checkbox",checked:X.required,onChange:e=>Y({...X,required:e.target.checked})}),"Required"]}),(0,s.jsxs)(M,{children:[(0,s.jsx)(D,{type:"checkbox",checked:X.multiple,onChange:e=>Y({...X,multiple:e.target.checked})}),"Multiple Selection"]})]})]}),(0,s.jsxs)(z,{children:[(0,s.jsx)(S,{children:"Add Option"}),(0,s.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"8px"},children:[(0,s.jsx)(O,{type:"text",value:Z.name,onChange:e=>_({...Z,name:e.target.value}),placeholder:"Option name",style:{flex:2}}),(0,s.jsx)(O,{type:"number",value:Z.price,onChange:e=>_({...Z,price:parseFloat(e.target.value)||0}),placeholder:"Price",step:"0.50",min:"0",style:{flex:1}}),(0,s.jsx)(u,{variant:"secondary",onClick:()=>{if(!Z.name.trim())return;const e={id:`opt-${Date.now()}`,name:Z.name,price:Z.price};Y({...X,options:[...X.options,e]}),_({name:"",price:0})},disabled:!Z.name.trim(),children:"Add"})]}),(0,s.jsx)($,{children:X.options.map(e=>(0,s.jsxs)(H,{children:[(0,s.jsxs)("div",{style:{flex:1},children:[(0,s.jsx)("strong",{children:e.name}),e.price>0&&(0,s.jsxs)("span",{children:[" (+RM ",e.price.toFixed(2),")"]})]}),(0,s.jsx)(N,{onClick:()=>{return n=e.id,void Y({...X,options:X.options.filter(e=>e.id!==n)});var n},children:"\xd7"})]},e.id))})]})]}),(0,s.jsx)(l.aF,{isOpen:I,onClose:()=>U(!1),title:"Delete Option Group",footer:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l.yl,{variant:"secondary",onClick:()=>U(!1),children:"Cancel"}),(0,s.jsx)(l.yl,{variant:"danger",onClick:()=>{P&&(o(P),U(!1),J(null))},children:"Delete"})]}),children:(0,s.jsx)("p",{children:"Are you sure you want to delete this option group? This action cannot be undone."})})]})})}}}]);