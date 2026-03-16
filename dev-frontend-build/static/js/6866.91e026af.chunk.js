"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6866],{6866:(e,n,t)=>{t.r(n),t.d(n,{default:()=>O});var r=t(9950),o=t(4752),i=t(3832),a=t(4728),d=t(1721),s=t(9610),l=t(4414);const c=o.Ay.div`
  display: grid;
  gap: 24px;
`,p=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,x=o.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  padding: 20px 24px;
`,u=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin: 0;
`,g=o.Ay.div`
  padding: 0;
  display: grid;
  gap: 0;
`,h=o.Ay.div`
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
`,m=o.Ay.div``,y=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,f=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
  line-height: 1.4;
`,b=o.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  font-family: 'Monaco', 'Menlo', monospace;
  margin-top: 4px;
`,v=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,F=o.Ay.input`
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
`,j=o.Ay.div`
  padding: 8px 12px;
  background: #F8FAFC;
  border-radius: 6px;
  font-size: 14px;
  color: #6B7280;
  min-width: 200px;
`,C=o.Ay.div`
  display: flex;
  gap: 8px;

  @media (max-width: 1024px) {
    justify-content: flex-start;
  }
`,A=o.Ay.button`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n\n    &:disabled {\n      background: #CBD5E1;\n      border-color: #CBD5E1;\n      cursor: not-allowed;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,k=o.Ay.span`
  background: #FEF3C7;
  color: #D97706;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
`,w=o.Ay.div`
  position: relative;
  margin-bottom: 16px;
`,S=o.Ay.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`,E=o.Ay.label`
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
`,B=o.Ay.div`
  font-size: 14px;
  color: #059669;
  background: #ECFDF5;
  padding: 8px 12px;
  border-radius: 6px;
  border-left: 3px solid #10B981;
`,T=o.Ay.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
`,z=o.Ay.div`
  font-size: 18px;
  color: #DC2626;
  text-align: center;
  margin-bottom: 16px;
`,O=()=>{const[e,n]=(0,r.useState)([]),[t,o]=(0,r.useState)({}),[O,R]=(0,r.useState)(new Set),[D,I]=(0,r.useState)(!1),[M,U]=(0,r.useState)(!1),[L,N]=(0,r.useState)(null);(0,r.useEffect)(()=>{n([])},[]);const $=e.reduce((e,n)=>{const t=n.category;return e[t]||(e[t]=[]),e[t].push(n),e},{}),q=(n,r)=>{const i=e.find(e=>e.id===n);if(i&&i.value!==r)o({...t,[n]:r}),R(e=>new Set(e).add(n));else{const e={...t};delete e[n],o(e),R(e=>{const t=new Set(e);return t.delete(n),t})}},J=e=>{const n=void 0!==t[e.id]?t[e.id]:e.value;return e.isEditable?"boolean"===e.dataType?(0,l.jsxs)(d.mM,{value:n,onChange:n=>q(e.id,n.target.value),children:[(0,l.jsx)("option",{value:"true",children:"True"}),(0,l.jsx)("option",{value:"false",children:"False"})]}):(0,l.jsx)(F,{type:"number"===e.dataType?"number":"email"===e.dataType?"email":"text",dataType:e.dataType,value:n,onChange:n=>q(e.id,n.target.value)}):(0,l.jsx)(j,{children:e.value})};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(i.mc,{children:[(0,l.jsxs)(i.Y9,{children:[(0,l.jsx)(i.hE,{children:"System Configuration"}),(0,l.jsxs)(i.ex,{children:[(0,l.jsx)(a.SC,{variant:"secondary",onClick:()=>{const n={timestamp:(new Date).toISOString(),version:"2.1.4",configs:e.reduce((e,n)=>(e[n.key]={value:n.value,dataType:n.dataType,category:n.category},e),{})},t=JSON.stringify(n,null,2),r=new Blob([t],{type:"application/json"}),o=URL.createObjectURL(r),i=document.createElement("a");i.href=o,i.download=`system-config-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(o)},children:"Export Config"}),(0,l.jsx)(a.SC,{variant:"secondary",onClick:()=>{I(!0)},children:"Import Config"}),(0,l.jsx)(a.SC,{variant:"primary",onClick:()=>{U(!0)},children:"Restart System"})]})]}),(0,l.jsxs)(i.UC,{children:[(0,l.jsx)(c,{children:Object.entries($).map(r=>{let[i,a]=r;return(0,l.jsxs)(p,{children:[(0,l.jsx)(x,{children:(0,l.jsx)(u,{children:i.replace("_"," ")})}),(0,l.jsx)(g,{children:a.map(r=>(0,l.jsxs)(h,{children:[(0,l.jsxs)(m,{children:[(0,l.jsxs)(y,{children:[r.displayName,r.requiresRestart&&(0,l.jsx)(k,{children:"Requires Restart"})]}),(0,l.jsx)(f,{children:r.description}),(0,l.jsx)(b,{children:r.key})]}),(0,l.jsx)(v,{children:J(r)}),(0,l.jsx)(C,{children:r.isEditable&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(A,{variant:"primary",onClick:()=>(r=>{const i=t[r];if(void 0!==i){n(e.map(e=>e.id===r?{...e,value:i,updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedBy:"System Admin"}:e));const a={...t};delete a[r],o(a),R(e=>{const n=new Set(e);return n.delete(r),n})}})(r.id),disabled:!O.has(r.id),children:"Save"}),O.has(r.id)&&(0,l.jsx)(A,{onClick:()=>(e=>{const n={...t};delete n[e],o(n),R(n=>{const t=new Set(n);return t.delete(e),t})})(r.id),children:"Reset"})]})})]},r.id))})]},i)})}),D&&(0,l.jsxs)(s.aF,{isOpen:D,onClose:()=>I(!1),title:"Import Configuration",footer:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.yl,{variant:"secondary",onClick:()=>I(!1),children:"Cancel"}),(0,l.jsx)(s.yl,{onClick:()=>{if(!L)return;const t=new FileReader;t.onload=t=>{try{var r;const o=JSON.parse(null===(r=t.target)||void 0===r?void 0:r.result);if(o.configs){const t=e.map(e=>{const n=o.configs[e.key];return n&&e.isEditable?{...e,value:n.value,updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedBy:"Config Import"}:e});n(t),alert("Configuration imported successfully!")}}catch(o){alert("Error parsing configuration file. Please check the file format.")}},t.readAsText(L),I(!1),N(null)},disabled:!L,children:"Import Configuration"})]}),children:[(0,l.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280"},children:"Select a configuration file to import. Only editable settings will be updated."}),(0,l.jsxs)(w,{children:[(0,l.jsx)(S,{type:"file",accept:".json",onChange:e=>{var n;const t=null===(n=e.target.files)||void 0===n?void 0:n[0];t&&N(t)},id:"config-file"}),(0,l.jsx)(E,{htmlFor:"config-file",children:L?L.name:"Choose Configuration File"})]}),L&&(0,l.jsxs)(B,{children:["Selected: ",L.name," (",(L.size/1024).toFixed(1)," KB)"]})]}),M&&(0,l.jsxs)(s.aF,{isOpen:M,onClose:()=>U(!1),title:"Restart System",footer:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.yl,{variant:"secondary",onClick:()=>U(!1),children:"Cancel"}),(0,l.jsx)(s.yl,{variant:"secondary",onClick:()=>{alert("System restart initiated. This may take a few minutes..."),U(!1),setTimeout(()=>{alert("System restart completed successfully!")},3e3)},style:{background:"#FEF2F2",color:"#EF4444",borderColor:"#EF4444"},children:"Restart System"})]}),children:[(0,l.jsx)(T,{children:"\u26a0\ufe0f"}),(0,l.jsx)(z,{children:(0,l.jsx)("strong",{children:"Are you sure you want to restart the system?"})}),(0,l.jsx)("p",{style:{color:"#6B7280",marginBottom:"0"},children:"This will temporarily interrupt service for all users. The system will be back online in a few minutes."})]})]})]})})}}}]);