"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6866],{6866:(e,n,t)=>{t.r(n),t.d(n,{default:()=>D});var r=t(9950),i=t(4752),o=t(3832),a=t(4728),s=t(1721),d=t(9610),l=t(5030),c=t(4414);const p=i.Ay.div`
  display: grid;
  gap: 24px;
`,x=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,u=i.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
`,g=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin: 0;
`,m=i.Ay.div`
  padding: 0;
  display: grid;
  gap: 0;
`,y=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 20px;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    background: #FAFBFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px 20px;
  }
`,h=i.Ay.div``,f=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,b=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  line-height: 1.4;
`,v=i.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  font-family: 'Monaco', 'Menlo', monospace;
  margin-top: 4px;
`,F=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,C=i.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  min-width: 200px;
  font-family: ${e=>"json"===e.dataType?"'Monaco', 'Menlo', monospace":"inherit"};

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F3F4F6;
    cursor: not-allowed;
  }
`,j=i.Ay.div`
  padding: 8px 12px;
  background: #F8FAFC;
  border-radius: 6px;
  font-size: 14px;
  color: #6B7280;
  min-width: 200px;
`,k=i.Ay.div`
  display: flex;
  gap: 8px;

  @media (max-width: 1024px) {
    justify-content: flex-start;
  }
`,A=i.Ay.button`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n\n    &:disabled {\n      background: #CBD5E1;\n      border-color: #CBD5E1;\n      cursor: not-allowed;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,S=i.Ay.span`
  background: #FEF3C7;
  color: #D97706;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
`,w=i.Ay.div`
  position: relative;
  margin-bottom: 16px;
`,E=i.Ay.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`,B=i.Ay.label`
  display: block;
  padding: 12px 16px;
  border: 2px dashed #CBD5E1;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  color: #6B7280;
  background: #F8FAFC;

  &:hover {
    border-color: #635BFF;
    background: #F0F0FF;
    color: #635BFF;
  }
`,T=i.Ay.div`
  font-size: 14px;
  color: #059669;
  background: #ECFDF5;
  padding: 8px 12px;
  border-radius: 6px;
  border-left: 3px solid #10B981;
`,z=i.Ay.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`,O=i.Ay.div`
  font-size: 18px;
  color: #DC2626;
  text-align: center;
  margin-bottom: 16px;
`,D=()=>{const{t:e}=(0,l.Bd)("admin"),[n,t]=(0,r.useState)([]),[i,D]=(0,r.useState)({}),[R,P]=(0,r.useState)(new Set),[I,M]=(0,r.useState)(!1),[U,L]=(0,r.useState)(!1),[N,Y]=(0,r.useState)(null);(0,r.useEffect)(()=>{t([])},[]);const $=n.reduce((e,n)=>{const t=n.category;return e[t]||(e[t]=[]),e[t].push(n),e},{}),q=(e,t)=>{const r=n.find(n=>n.id===e);if(r&&r.value!==t)D({...i,[e]:t}),P(n=>new Set(n).add(e));else{const n={...i};delete n[e],D(n),P(n=>{const t=new Set(n);return t.delete(e),t})}},J=n=>{const t=void 0!==i[n.id]?i[n.id]:n.value;return n.isEditable?"boolean"===n.dataType?(0,c.jsxs)(s.mM,{value:t,onChange:e=>q(n.id,e.target.value),children:[(0,c.jsx)("option",{value:"true",children:e("admin:systemConfigPage.true")}),(0,c.jsx)("option",{value:"false",children:e("admin:systemConfigPage.false")})]}):(0,c.jsx)(C,{type:"number"===n.dataType?"number":"email"===n.dataType?"email":"text",dataType:n.dataType,value:t,onChange:e=>q(n.id,e.target.value)}):(0,c.jsx)(j,{children:n.value})};return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(o.mc,{children:[(0,c.jsxs)(o.Y9,{children:[(0,c.jsx)(o.hE,{children:e("admin:systemConfigPage.systemConfiguration")}),(0,c.jsxs)(o.ex,{children:[(0,c.jsx)(a.SC,{variant:"secondary",onClick:()=>{const e={timestamp:(new Date).toISOString(),version:"2.1.4",configs:n.reduce((e,n)=>(e[n.key]={value:n.value,dataType:n.dataType,category:n.category},e),{})},t=JSON.stringify(e,null,2),r=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(r),o=document.createElement("a");o.href=i,o.download=`system-config-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},children:e("admin:systemConfigPage.exportConfig")}),(0,c.jsx)(a.SC,{variant:"secondary",onClick:()=>{M(!0)},children:e("admin:systemConfigPage.importConfig")}),(0,c.jsx)(a.SC,{variant:"primary",onClick:()=>{L(!0)},children:e("admin:systemConfigPage.restartSystem")})]})]}),(0,c.jsxs)(o.UC,{children:[(0,c.jsx)(p,{children:Object.entries($).map(r=>{let[o,a]=r;return(0,c.jsxs)(x,{children:[(0,c.jsx)(u,{children:(0,c.jsx)(g,{children:o.replace("_"," ")})}),(0,c.jsx)(m,{children:a.map(r=>(0,c.jsxs)(y,{children:[(0,c.jsxs)(h,{children:[(0,c.jsxs)(f,{children:[r.displayName,r.requiresRestart&&(0,c.jsx)(S,{children:e("admin:systemConfigPage.requiresRestart")})]}),(0,c.jsx)(b,{children:r.description}),(0,c.jsx)(v,{children:r.key})]}),(0,c.jsx)(F,{children:J(r)}),(0,c.jsx)(k,{children:r.isEditable&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(A,{variant:"primary",onClick:()=>(e=>{const r=i[e];if(void 0!==r){t(n.map(n=>n.id===e?{...n,value:r,updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedBy:"System Admin"}:n));const o={...i};delete o[e],D(o),P(n=>{const t=new Set(n);return t.delete(e),t})}})(r.id),disabled:!R.has(r.id),children:"Save"}),R.has(r.id)&&(0,c.jsx)(A,{onClick:()=>(e=>{const n={...i};delete n[e],D(n),P(n=>{const t=new Set(n);return t.delete(e),t})})(r.id),children:"Reset"})]})})]},r.id))})]},o)})}),I&&(0,c.jsxs)(d.aF,{isOpen:I,onClose:()=>M(!1),title:"Import Configuration",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(d.yl,{variant:"secondary",onClick:()=>M(!1),children:"Cancel"}),(0,c.jsx)(d.yl,{onClick:()=>{if(!N)return;const e=new FileReader;e.onload=e=>{try{var r;const i=JSON.parse(null===(r=e.target)||void 0===r?void 0:r.result);if(i.configs){const e=n.map(e=>{const n=i.configs[e.key];return n&&e.isEditable?{...e,value:n.value,updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedBy:"Config Import"}:e});t(e),alert("Configuration imported successfully!")}}catch(i){alert("Error parsing configuration file. Please check the file format.")}},e.readAsText(N),M(!1),Y(null)},disabled:!N,children:"Import Configuration"})]}),children:[(0,c.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280"},children:"Select a configuration file to import. Only editable settings will be updated."}),(0,c.jsxs)(w,{children:[(0,c.jsx)(E,{type:"file",accept:".json",onChange:e=>{var n;const t=null===(n=e.target.files)||void 0===n?void 0:n[0];t&&Y(t)},id:"config-file"}),(0,c.jsx)(B,{htmlFor:"config-file",children:N?N.name:"Choose Configuration File"})]}),N&&(0,c.jsxs)(T,{children:["Selected: ",N.name," (",(N.size/1024).toFixed(1)," KB)"]})]}),U&&(0,c.jsxs)(d.aF,{isOpen:U,onClose:()=>L(!1),title:"Restart System",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(d.yl,{variant:"secondary",onClick:()=>L(!1),children:"Cancel"}),(0,c.jsx)(d.yl,{variant:"secondary",onClick:()=>{alert("System restart initiated. This may take a few minutes..."),L(!1),setTimeout(()=>{alert("System restart completed successfully!")},3e3)},style:{background:"#FEF2F2",color:"#EF4444",borderColor:"#EF4444"},children:"Restart System"})]}),children:[(0,c.jsx)(z,{children:"\u26a0\ufe0f"}),(0,c.jsx)(O,{children:(0,c.jsx)("strong",{children:e("admin:systemConfigPage.areYouSureYouWantToRestartTheSystem")})}),(0,c.jsx)("p",{style:{color:"#6B7280",marginBottom:"0"},children:"This will temporarily interrupt service for all users. The system will be back online in a few minutes."})]})]})]})})}}}]);