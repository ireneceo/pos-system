"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6866],{6866:(e,n,r)=>{r.r(n),r.d(n,{default:()=>R});var t=r(8819),o=r(9950),i=r(4752),a=r(3832),s=r(4728),d=r(1721),l=r(9610),c=r(4414);const p=i.Ay.div`
  display: grid;
  gap: 24px;
`,x=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${t.w.colors.border};
  overflow: hidden;
`,u=i.Ay.div`
  background: #F8FAFC;
  border-bottom: 1px solid ${t.w.colors.border};
  padding: 20px 24px;
`,g=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${t.w.colors.secondary};
  text-transform: capitalize;
  margin: 0;
`,h=i.Ay.div`
  padding: 0;
  display: grid;
  gap: 0;
`,m=i.Ay.div`
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
`,y=i.Ay.div``,f=i.Ay.div`
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
`,j=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,F=i.Ay.input`
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
`,C=i.Ay.div`
  padding: 8px 12px;
  background: #F8FAFC;
  border-radius: 6px;
  font-size: 14px;
  color: #6B7280;
  min-width: 200px;
`,A=i.Ay.div`
  display: flex;
  gap: 8px;

  @media (max-width: 1024px) {
    justify-content: flex-start;
  }
`,k=i.Ay.button`
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?`\n    background: ${t.w.colors.primary};\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n\n    &:disabled {\n      background: #CBD5E1;\n      border-color: #CBD5E1;\n      cursor: not-allowed;\n    }\n  `:"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,w=i.Ay.span`
  background: #FEF3C7;
  color: #D97706;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 8px;
`,S=i.Ay.div`
  position: relative;
  margin-bottom: 16px;
`,B=i.Ay.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`,E=i.Ay.label`
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
`,R=()=>{const[e,n]=(0,o.useState)([]),[r,t]=(0,o.useState)({}),[i,R]=(0,o.useState)(new Set),[D,I]=(0,o.useState)(!1),[$,M]=(0,o.useState)(!1),[U,L]=(0,o.useState)(null);(0,o.useEffect)(()=>{n([])},[]);const N=e.reduce((e,n)=>{const r=n.category;return e[r]||(e[r]=[]),e[r].push(n),e},{}),q=(n,o)=>{const i=e.find(e=>e.id===n);if(i&&i.value!==o)t({...r,[n]:o}),R(e=>new Set(e).add(n));else{const e={...r};delete e[n],t(e),R(e=>{const r=new Set(e);return r.delete(n),r})}},J=e=>{const n=void 0!==r[e.id]?r[e.id]:e.value;return e.isEditable?"boolean"===e.dataType?(0,c.jsxs)(d.mM,{value:n,onChange:n=>q(e.id,n.target.value),children:[(0,c.jsx)("option",{value:"true",children:"True"}),(0,c.jsx)("option",{value:"false",children:"False"})]}):(0,c.jsx)(F,{type:"number"===e.dataType?"number":"email"===e.dataType?"email":"text",dataType:e.dataType,value:n,onChange:n=>q(e.id,n.target.value)}):(0,c.jsx)(C,{children:e.value})};return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(a.mc,{children:[(0,c.jsxs)(a.Y9,{children:[(0,c.jsx)(a.hE,{children:"System Configuration"}),(0,c.jsxs)(a.ex,{children:[(0,c.jsx)(s.SC,{variant:"secondary",onClick:()=>{const n={timestamp:(new Date).toISOString(),version:"2.1.4",configs:e.reduce((e,n)=>(e[n.key]={value:n.value,dataType:n.dataType,category:n.category},e),{})},r=JSON.stringify(n,null,2),t=new Blob([r],{type:"application/json"}),o=URL.createObjectURL(t),i=document.createElement("a");i.href=o,i.download=`system-config-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(o)},children:"Export Config"}),(0,c.jsx)(s.SC,{variant:"secondary",onClick:()=>{I(!0)},children:"Import Config"}),(0,c.jsx)(s.SC,{variant:"primary",onClick:()=>{M(!0)},children:"Restart System"})]})]}),(0,c.jsxs)(a.UC,{children:[(0,c.jsx)(p,{children:Object.entries(N).map(o=>{let[a,s]=o;return(0,c.jsxs)(x,{children:[(0,c.jsx)(u,{children:(0,c.jsx)(g,{children:a.replace("_"," ")})}),(0,c.jsx)(h,{children:s.map(o=>(0,c.jsxs)(m,{children:[(0,c.jsxs)(y,{children:[(0,c.jsxs)(f,{children:[o.displayName,o.requiresRestart&&(0,c.jsx)(w,{children:"Requires Restart"})]}),(0,c.jsx)(b,{children:o.description}),(0,c.jsx)(v,{children:o.key})]}),(0,c.jsx)(j,{children:J(o)}),(0,c.jsx)(A,{children:o.isEditable&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(k,{variant:"primary",onClick:()=>(o=>{const i=r[o];if(void 0!==i){n(e.map(e=>e.id===o?{...e,value:i,updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedBy:"System Admin"}:e));const a={...r};delete a[o],t(a),R(e=>{const n=new Set(e);return n.delete(o),n})}})(o.id),disabled:!i.has(o.id),children:"Save"}),i.has(o.id)&&(0,c.jsx)(k,{onClick:()=>(e=>{const n={...r};delete n[e],t(n),R(n=>{const r=new Set(n);return r.delete(e),r})})(o.id),children:"Reset"})]})})]},o.id))})]},a)})}),D&&(0,c.jsxs)(l.aF,{isOpen:D,onClose:()=>I(!1),title:"Import Configuration",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>I(!1),children:"Cancel"}),(0,c.jsx)(l.yl,{onClick:()=>{if(!U)return;const r=new FileReader;r.onload=r=>{try{var t;const o=JSON.parse(null===(t=r.target)||void 0===t?void 0:t.result);if(o.configs){const r=e.map(e=>{const n=o.configs[e.key];return n&&e.isEditable?{...e,value:n.value,updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedBy:"Config Import"}:e});n(r),alert("Configuration imported successfully!")}}catch(o){alert("Error parsing configuration file. Please check the file format.")}},r.readAsText(U),I(!1),L(null)},disabled:!U,children:"Import Configuration"})]}),children:[(0,c.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280"},children:"Select a configuration file to import. Only editable settings will be updated."}),(0,c.jsxs)(S,{children:[(0,c.jsx)(B,{type:"file",accept:".json",onChange:e=>{var n;const r=null===(n=e.target.files)||void 0===n?void 0:n[0];r&&L(r)},id:"config-file"}),(0,c.jsx)(E,{htmlFor:"config-file",children:U?U.name:"Choose Configuration File"})]}),U&&(0,c.jsxs)(T,{children:["Selected: ",U.name," (",(U.size/1024).toFixed(1)," KB)"]})]}),$&&(0,c.jsxs)(l.aF,{isOpen:$,onClose:()=>M(!1),title:"Restart System",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>M(!1),children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"danger",onClick:()=>{alert("System restart initiated. This may take a few minutes..."),M(!1),setTimeout(()=>{alert("System restart completed successfully!")},3e3)},children:"Restart System"})]}),children:[(0,c.jsx)(z,{children:"\u26a0\ufe0f"}),(0,c.jsx)(O,{children:(0,c.jsx)("strong",{children:"Are you sure you want to restart the system?"})}),(0,c.jsx)("p",{style:{color:"#6B7280",marginBottom:"0"},children:"This will temporarily interrupt service for all users. The system will be back online in a few minutes."})]})]})]})})}}}]);