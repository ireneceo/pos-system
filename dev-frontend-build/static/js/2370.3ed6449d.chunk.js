"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2370],{2370:(e,n,i)=>{i.r(n),i.d(n,{default:()=>N});var o=i(9950),r=i(4752),t=i(2853),s=i(8930),l=i(9610),d=i(4414);const a=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,p=r.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,c=r.Ay.div`
  position: sticky;
  top: 0;
  z-index: 100;
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
`,h=r.Ay.div`
  display: flex;
  gap: 12px;
`,u=r.Ay.button`
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
`,b=r.Ay.div`
  flex: 1;
`,j=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,f=r.Ay.div`
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
`,z=r.Ay.div`
  margin-bottom: 20px;
`,S=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,O=r.Ay.input`
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
`,q=r.Ay.div`
  display: flex;
  gap: 16px;
`,M=r.Ay.label`
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
`,L=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,R=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,W=r.Ay.div`
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
`,H=r.Ay.button`
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
`,N=()=>{const{optionGroups:e,addOptionGroup:n,updateOptionGroup:i,deleteOptionGroup:r}=(0,s.b)(),[N,T]=(0,o.useState)(!1),[V,I]=(0,o.useState)(!1),[U,P]=(0,o.useState)(null),[J,K]=(0,o.useState)(null),[Q,X]=(0,o.useState)({name:"",required:!1,multiple:!1,options:[]}),[Y,Z]=(0,o.useState)({name:"",price:0}),_=e=>{e?(K(e),X({name:e.name,required:e.required,multiple:e.multiple,options:[...e.options]})):(K(null),X({name:"",required:!1,multiple:!1,options:[]})),T(!0)},ee=()=>{T(!1),K(null),X({name:"",required:!1,multiple:!1,options:[]}),Z({name:"",price:0})};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(a,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(x,{children:"Options"}),(0,d.jsx)(h,{children:(0,d.jsxs)(u,{onClick:()=>_(),children:[(0,d.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:(0,d.jsx)("path",{d:"M8 3V13M3 8H13",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})}),"Add Option Group"]})})]}),(0,d.jsx)(p,{children:0===e.length?(0,d.jsxs)(t.pp,{children:[(0,d.jsx)(G,{children:"\u2699\ufe0f"}),(0,d.jsx)(L,{children:"No option groups yet"}),(0,d.jsx)(R,{children:"Create your first option group to add customizable options to your menu items"}),(0,d.jsx)(u,{onClick:()=>_(),children:"Create Option Group"})]}):(0,d.jsx)(g,{children:e.map(e=>(0,d.jsxs)(m,{children:[(0,d.jsxs)(y,{children:[(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:e.name}),(0,d.jsxs)(f,{children:[(0,d.jsx)(v,{type:e.required?"required":"optional",children:e.required?"Required":"Optional"}),(0,d.jsx)(v,{type:e.multiple?"multiple":"single",children:e.multiple?"Multiple Selection":"Single Selection"}),(0,d.jsxs)("span",{children:[e.options.length," options"]})]})]}),(0,d.jsxs)(k,{children:[(0,d.jsx)(F,{onClick:()=>_(e),children:(0,d.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,d.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,d.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,d.jsx)(F,{onClick:()=>{return n=e.id,P(n),void I(!0);var n},children:(0,d.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,d.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,d.jsx)(A,{children:e.options.map(e=>(0,d.jsx)(w,{children:(0,d.jsxs)(C,{children:[(0,d.jsx)(E,{children:e.name}),e.price>0&&(0,d.jsxs)(B,{children:["+RM ",e.price.toFixed(2)]})]})},e.id))})]},e.id))})}),(0,d.jsxs)(l.aF,{isOpen:N,onClose:ee,title:J?"Edit Option Group":"New Option Group",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.yl,{variant:"secondary",onClick:ee,children:"Cancel"}),(0,d.jsx)(l.yl,{variant:"primary",onClick:()=>{if(Q.name.trim()&&0!==Q.options.length){if(J)i(J.id,{...Q,id:J.id});else{const e={id:`group-${Date.now()}`,...Q};n(e)}ee()}},disabled:!Q.name.trim()||0===Q.options.length,children:J?"Update":"Create"})]}),children:[(0,d.jsxs)(z,{children:[(0,d.jsx)(S,{children:"Group Name"}),(0,d.jsx)(O,{type:"text",value:Q.name,onChange:e=>X({...Q,name:e.target.value}),placeholder:"e.g., Size, Spice Level, Extra Toppings",autoFocus:!0})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(S,{children:"Selection Type"}),(0,d.jsxs)(q,{children:[(0,d.jsxs)(M,{children:[(0,d.jsx)(D,{type:"checkbox",checked:Q.required,onChange:e=>X({...Q,required:e.target.checked})}),"Required"]}),(0,d.jsxs)(M,{children:[(0,d.jsx)(D,{type:"checkbox",checked:Q.multiple,onChange:e=>X({...Q,multiple:e.target.checked})}),"Multiple Selection"]})]})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(S,{children:"Add Option"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"8px"},children:[(0,d.jsx)(O,{type:"text",value:Y.name,onChange:e=>Z({...Y,name:e.target.value}),placeholder:"Option name",style:{flex:2}}),(0,d.jsx)(O,{type:"number",value:Y.price,onChange:e=>Z({...Y,price:parseFloat(e.target.value)||0}),placeholder:"Price",step:"0.50",min:"0",style:{flex:1}}),(0,d.jsx)(u,{variant:"secondary",onClick:()=>{if(!Y.name.trim())return;const e={id:`opt-${Date.now()}`,name:Y.name,price:Y.price};X({...Q,options:[...Q.options,e]}),Z({name:"",price:0})},disabled:!Y.name.trim(),children:"Add"})]}),(0,d.jsx)(W,{children:Q.options.map(e=>(0,d.jsxs)($,{children:[(0,d.jsxs)("div",{style:{flex:1},children:[(0,d.jsx)("strong",{children:e.name}),e.price>0&&(0,d.jsxs)("span",{children:[" (+RM ",e.price.toFixed(2),")"]})]}),(0,d.jsx)(H,{onClick:()=>{return n=e.id,void X({...Q,options:Q.options.filter(e=>e.id!==n)});var n},children:"\xd7"})]},e.id))})]})]}),(0,d.jsx)(l.aF,{isOpen:V,onClose:()=>I(!1),title:"Delete Option Group",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.yl,{variant:"secondary",onClick:()=>I(!1),children:"Cancel"}),(0,d.jsx)(l.yl,{variant:"danger",onClick:()=>{U&&(r(U),I(!1),P(null))},children:"Delete"})]}),children:(0,d.jsx)("p",{children:"Are you sure you want to delete this option group? This action cannot be undone."})})]})})}}}]);