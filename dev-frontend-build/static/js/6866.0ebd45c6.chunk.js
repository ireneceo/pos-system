"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6866],{6866:(e,n,t)=>{t.r(n),t.d(n,{default:()=>O});var r=t(9950),i=t(4752),o=t(3832),a=t(4728),d=t(1721),s=t(9610),l=t(4414);const c=i.Ay.div`
  display: grid;
  gap: 24px;
`,p=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,x=i.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
`,u=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin: 0;
`,g=i.Ay.div`
  padding: 0;
  display: grid;
  gap: 0;
`,h=i.Ay.div`
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
`,m=i.Ay.div``,y=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,f=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  line-height: 1.4;
`,b=i.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  font-family: 'Monaco', 'Menlo', monospace;
  margin-top: 4px;
`,v=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,j=i.Ay.input`
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
`,F=i.Ay.div`
  padding: 8px 12px;
  background: #F8FAFC;
  border-radius: 6px;
  font-size: 14px;
  color: #6B7280;
  min-width: 200px;
`,C=i.Ay.div`
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
`,k=i.Ay.span`
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
`,S=i.Ay.input`
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
`,E=i.Ay.div`
  font-size: 14px;
  color: #059669;
  background: #ECFDF5;
  padding: 8px 12px;
  border-radius: 6px;
  border-left: 3px solid #10B981;
`,T=i.Ay.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`,z=i.Ay.div`
  font-size: 18px;
  color: #DC2626;
  text-align: center;
  margin-bottom: 16px;
`,O=()=>{const[e,n]=(0,r.useState)([]),[t,i]=(0,r.useState)({}),[O,R]=(0,r.useState)(new Set),[D,I]=(0,r.useState)(!1),[M,U]=(0,r.useState)(!1),[L,N]=(0,r.useState)(null);(0,r.useEffect)(()=>{n([])},[]);const $=e.reduce((e,n)=>{const t=n.category;return e[t]||(e[t]=[]),e[t].push(n),e},{}),q=(n,r)=>{const o=e.find(e=>e.id===n);if(o&&o.value!==r)i({...t,[n]:r}),R(e=>new Set(e).add(n));else{const e={...t};delete e[n],i(e),R(e=>{const t=new Set(e);return t.delete(n),t})}},J=e=>{const n=void 0!==t[e.id]?t[e.id]:e.value;return e.isEditable?"boolean"===e.dataType?(0,l.jsxs)(d.mM,{value:n,onChange:n=>q(e.id,n.target.value),children:[(0,l.jsx)("option",{value:"true",children:"True"}),(0,l.jsx)("option",{value:"false",children:"False"})]}):(0,l.jsx)(j,{type:"number"===e.dataType?"number":"email"===e.dataType?"email":"text",dataType:e.dataType,value:n,onChange:n=>q(e.id,n.target.value)}):(0,l.jsx)(F,{children:e.value})};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(o.mc,{children:[(0,l.jsxs)(o.Y9,{children:[(0,l.jsx)(o.hE,{children:"System Configuration"}),(0,l.jsxs)(o.ex,{children:[(0,l.jsx)(a.SC,{variant:"secondary",onClick:()=>{const n={timestamp:(new Date).toISOString(),version:"2.1.4",configs:e.reduce((e,n)=>(e[n.key]={value:n.value,dataType:n.dataType,category:n.category},e),{})},t=JSON.stringify(n,null,2),r=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(r),o=document.createElement("a");o.href=i,o.download=`system-config-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},children:"Export Config"}),(0,l.jsx)(a.SC,{variant:"secondary",onClick:()=>{I(!0)},children:"Import Config"}),(0,l.jsx)(a.SC,{variant:"primary",onClick:()=>{U(!0)},children:"Restart System"})]})]}),(0,l.jsxs)(o.UC,{children:[(0,l.jsx)(c,{children:Object.entries($).map(r=>{let[o,a]=r;return(0,l.jsxs)(p,{children:[(0,l.jsx)(x,{children:(0,l.jsx)(u,{children:o.replace("_"," ")})}),(0,l.jsx)(g,{children:a.map(r=>(0,l.jsxs)(h,{children:[(0,l.jsxs)(m,{children:[(0,l.jsxs)(y,{children:[r.displayName,r.requiresRestart&&(0,l.jsx)(k,{children:"Requires Restart"})]}),(0,l.jsx)(f,{children:r.description}),(0,l.jsx)(b,{children:r.key})]}),(0,l.jsx)(v,{children:J(r)}),(0,l.jsx)(C,{children:r.isEditable&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(A,{variant:"primary",onClick:()=>(r=>{const o=t[r];if(void 0!==o){n(e.map(e=>e.id===r?{...e,value:o,updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedBy:"System Admin"}:e));const a={...t};delete a[r],i(a),R(e=>{const n=new Set(e);return n.delete(r),n})}})(r.id),disabled:!O.has(r.id),children:"Save"}),O.has(r.id)&&(0,l.jsx)(A,{onClick:()=>(e=>{const n={...t};delete n[e],i(n),R(n=>{const t=new Set(n);return t.delete(e),t})})(r.id),children:"Reset"})]})})]},r.id))})]},o)})}),D&&(0,l.jsxs)(s.aF,{isOpen:D,onClose:()=>I(!1),title:"Import Configuration",footer:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.yl,{variant:"secondary",onClick:()=>I(!1),children:"Cancel"}),(0,l.jsx)(s.yl,{onClick:()=>{if(!L)return;const t=new FileReader;t.onload=t=>{try{var r;const i=JSON.parse(null===(r=t.target)||void 0===r?void 0:r.result);if(i.configs){const t=e.map(e=>{const n=i.configs[e.key];return n&&e.isEditable?{...e,value:n.value,updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedBy:"Config Import"}:e});n(t),alert("Configuration imported successfully!")}}catch(i){alert("Error parsing configuration file. Please check the file format.")}},t.readAsText(L),I(!1),N(null)},disabled:!L,children:"Import Configuration"})]}),children:[(0,l.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280"},children:"Select a configuration file to import. Only editable settings will be updated."}),(0,l.jsxs)(w,{children:[(0,l.jsx)(S,{type:"file",accept:".json",onChange:e=>{var n;const t=null===(n=e.target.files)||void 0===n?void 0:n[0];t&&N(t)},id:"config-file"}),(0,l.jsx)(B,{htmlFor:"config-file",children:L?L.name:"Choose Configuration File"})]}),L&&(0,l.jsxs)(E,{children:["Selected: ",L.name," (",(L.size/1024).toFixed(1)," KB)"]})]}),M&&(0,l.jsxs)(s.aF,{isOpen:M,onClose:()=>U(!1),title:"Restart System",footer:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.yl,{variant:"secondary",onClick:()=>U(!1),children:"Cancel"}),(0,l.jsx)(s.yl,{variant:"danger",onClick:()=>{alert("System restart initiated. This may take a few minutes..."),U(!1),setTimeout(()=>{alert("System restart completed successfully!")},3e3)},children:"Restart System"})]}),children:[(0,l.jsx)(T,{children:"\u26a0\ufe0f"}),(0,l.jsx)(z,{children:(0,l.jsx)("strong",{children:"Are you sure you want to restart the system?"})}),(0,l.jsx)("p",{style:{color:"#6B7280",marginBottom:"0"},children:"This will temporarily interrupt service for all users. The system will be back online in a few minutes."})]})]})]})})}}}]);