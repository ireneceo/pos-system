"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2370],{2370:(e,o,r)=>{r.r(o),r.d(o,{default:()=>N});var i=r(8819),n=r(9950),t=r(4752),s=r(8930),l=r(9610),d=r(4414);const a=t.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: ${i.w.colors.background};
  min-height: 100vh;
`,p=t.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,c=t.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${i.w.colors.border};
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
`,x=t.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${i.w.colors.secondary};
  margin: 0;
`,h=t.Ay.div`
  display: flex;
  gap: 12px;
`,u=t.Ay.button`
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
  
  ${e=>{switch(e.variant){case"danger":return`\n          background: #EF4444;\n          color: white;\n          &:hover {\n            background: ${i.w.colors.danger};\n          }\n        `;case"secondary":return`\n          background: white;\n          color: ${i.w.colors.text.muted};\n          border: 1px solid ${i.w.colors.borderLight};\n          &:hover {\n            background: #F9FAFB;\n          }\n        `;default:return`\n          background: ${i.w.colors.primary};\n          color: white;\n          &:hover {\n            background: #5246ED;\n          }\n        `}}}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,g=t.Ay.div`
  display: grid;
  gap: 16px;
  padding: 24px 0;
`,m=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,y=t.Ay.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 16px;
`,b=t.Ay.div`
  flex: 1;
`,j=t.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,f=t.Ay.div`
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: ${i.w.colors.text.muted};
  margin-bottom: 8px;
`,w=t.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  
  ${e=>{switch(e.type){case"required":return`\n          background: ${i.w.colors.status.errorLightAlt};\n          color: ${i.w.colors.danger};\n        `;case"optional":return"\n          background: #E0F2FE;\n          color: #0369A1;\n        ";case"single":default:return`\n          background: ${i.w.colors.surfaceMuted};\n          color: ${i.w.colors.text.muted};\n        `;case"multiple":return`\n          background: ${i.w.colors.status.successLight};\n          color: ${i.w.colors.status.successAlt};\n        `}}}
`,v=t.Ay.div`
  display: flex;
  gap: 8px;
`,k=t.Ay.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid ${i.w.colors.borderLight};
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
    color: ${i.w.colors.text.muted};
  }
`,A=t.Ay.div`
  display: grid;
  gap: 8px;
`,$=t.Ay.div`
  display: flex;
  justify-content: between;
  align-items: center;
  padding: 8px 12px;
  background: #F9FAFB;
  border-radius: 6px;
  border: 1px solid ${i.w.colors.borderLight};
`,C=t.Ay.div`
  flex: 1;
`,F=t.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,z=t.Ay.span`
  font-size: 13px;
  color: ${i.w.colors.text.muted};
  margin-left: 8px;
`,M=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${i.w.colors.text.dark};
  margin-bottom: 8px;
`,S=t.Ay.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid ${i.w.colors.borderLight};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }
`,L=t.Ay.div`
  display: flex;
  gap: 16px;
`,O=t.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: ${i.w.colors.text.dark};
`,q=t.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: ${i.w.colors.primary};
`,E=t.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  margin: 24px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,G=t.Ay.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
`,B=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,D=t.Ay.p`
  font-size: 14px;
  color: ${i.w.colors.text.muted};
  margin: 0 0 24px 0;
`,R=t.Ay.div`
  margin-top: 16px;
`,W=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid ${i.w.colors.surfaceMuted};
  
  &:last-child {
    border-bottom: none;
  }
`,H=t.Ay.button`
  background: ${i.w.colors.status.errorLightAlt};
  color: ${i.w.colors.danger};
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
`,N=()=>{const{optionGroups:e,addOptionGroup:o,updateOptionGroup:r,deleteOptionGroup:i}=(0,s.b)(),[t,N]=(0,n.useState)(!1),[T,V]=(0,n.useState)(!1),[I,U]=(0,n.useState)(null),[P,J]=(0,n.useState)(null),[K,Q]=(0,n.useState)({name:"",required:!1,multiple:!1,options:[]}),[X,Y]=(0,n.useState)({name:"",price:0}),Z=e=>{e?(J(e),Q({name:e.name,required:e.required,multiple:e.multiple,options:[...e.options]})):(J(null),Q({name:"",required:!1,multiple:!1,options:[]})),N(!0)},_=()=>{N(!1),J(null),Q({name:"",required:!1,multiple:!1,options:[]}),Y({name:"",price:0})};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(a,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(x,{children:"Options"}),(0,d.jsx)(h,{children:(0,d.jsxs)(u,{onClick:()=>Z(),children:[(0,d.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",children:(0,d.jsx)("path",{d:"M8 3V13M3 8H13",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})}),"Add Option Group"]})})]}),(0,d.jsx)(p,{children:0===e.length?(0,d.jsxs)(E,{children:[(0,d.jsx)(G,{children:"\u2699\ufe0f"}),(0,d.jsx)(B,{children:"No option groups yet"}),(0,d.jsx)(D,{children:"Create your first option group to add customizable options to your menu items"}),(0,d.jsx)(u,{onClick:()=>Z(),children:"Create Option Group"})]}):(0,d.jsx)(g,{children:e.map(e=>(0,d.jsxs)(m,{children:[(0,d.jsxs)(y,{children:[(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:e.name}),(0,d.jsxs)(f,{children:[(0,d.jsx)(w,{type:e.required?"required":"optional",children:e.required?"Required":"Optional"}),(0,d.jsx)(w,{type:e.multiple?"multiple":"single",children:e.multiple?"Multiple Selection":"Single Selection"}),(0,d.jsxs)("span",{children:[e.options.length," options"]})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(k,{onClick:()=>Z(e),children:(0,d.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,d.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,d.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,d.jsx)(k,{onClick:()=>{return o=e.id,U(o),void V(!0);var o},children:(0,d.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,d.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,d.jsx)(A,{children:e.options.map(e=>(0,d.jsx)($,{children:(0,d.jsxs)(C,{children:[(0,d.jsx)(F,{children:e.name}),e.price>0&&(0,d.jsxs)(z,{children:["+RM ",e.price.toFixed(2)]})]})},e.id))})]},e.id))})}),(0,d.jsxs)(l.aF,{isOpen:t,onClose:_,title:P?"Edit Option Group":"New Option Group",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.yl,{variant:"secondary",onClick:_,children:"Cancel"}),(0,d.jsx)(l.yl,{variant:"primary",onClick:()=>{if(K.name.trim()&&0!==K.options.length){if(P)r(P.id,{...K,id:P.id});else{const e={id:`group-${Date.now()}`,...K};o(e)}_()}},disabled:!K.name.trim()||0===K.options.length,children:P?"Update":"Create"})]}),children:[(0,d.jsxs)(l.gE,{children:[(0,d.jsx)(M,{children:"Group Name"}),(0,d.jsx)(S,{type:"text",value:K.name,onChange:e=>Q({...K,name:e.target.value}),placeholder:"e.g., Size, Spice Level, Extra Toppings",autoFocus:!0})]}),(0,d.jsxs)(l.gE,{children:[(0,d.jsx)(M,{children:"Selection Type"}),(0,d.jsxs)(L,{children:[(0,d.jsxs)(O,{children:[(0,d.jsx)(q,{type:"checkbox",checked:K.required,onChange:e=>Q({...K,required:e.target.checked})}),"Required"]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(q,{type:"checkbox",checked:K.multiple,onChange:e=>Q({...K,multiple:e.target.checked})}),"Multiple Selection"]})]})]}),(0,d.jsxs)(l.gE,{children:[(0,d.jsx)(M,{children:"Add Option"}),(0,d.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"8px"},children:[(0,d.jsx)(S,{type:"text",value:X.name,onChange:e=>Y({...X,name:e.target.value}),placeholder:"Option name",style:{flex:2}}),(0,d.jsx)(S,{type:"number",value:X.price,onChange:e=>Y({...X,price:parseFloat(e.target.value)||0}),placeholder:"Price",step:"0.50",min:"0",style:{flex:1}}),(0,d.jsx)(u,{variant:"secondary",onClick:()=>{if(!X.name.trim())return;const e={id:`opt-${Date.now()}`,name:X.name,price:X.price};Q({...K,options:[...K.options,e]}),Y({name:"",price:0})},disabled:!X.name.trim(),children:"Add"})]}),(0,d.jsx)(R,{children:K.options.map(e=>(0,d.jsxs)(W,{children:[(0,d.jsxs)("div",{style:{flex:1},children:[(0,d.jsx)("strong",{children:e.name}),e.price>0&&(0,d.jsxs)("span",{children:[" (+RM ",e.price.toFixed(2),")"]})]}),(0,d.jsx)(H,{onClick:()=>{return o=e.id,void Q({...K,options:K.options.filter(e=>e.id!==o)});var o},children:"\xd7"})]},e.id))})]})]}),(0,d.jsx)(l.aF,{isOpen:T,onClose:()=>V(!1),title:"Delete Option Group",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.yl,{variant:"secondary",onClick:()=>V(!1),children:"Cancel"}),(0,d.jsx)(l.yl,{variant:"danger",onClick:()=>{I&&(i(I),V(!1),U(null))},children:"Delete"})]}),children:(0,d.jsx)("p",{children:"Are you sure you want to delete this option group? This action cannot be undone."})})]})})}}}]);