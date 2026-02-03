"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6866],{6866:(e,n,t)=>{t.r(n),t.d(n,{default:()=>R});var r=t(9950),i=t(4752),o=t(3310),a=t(3832),d=t(4728),s=t(1721),l=t(9610),c=t(4414);const p=i.Ay.div`
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

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n\n    &:disabled {\n      background: #CBD5E1;\n      border-color: #CBD5E1;\n      cursor: not-allowed;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
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
`,R=()=>{const[e,n]=(0,r.useState)([]),[t,i]=(0,r.useState)({}),[R,D]=(0,r.useState)(new Set),[I,M]=(0,r.useState)(!1),[U,L]=(0,r.useState)(!1),[N,$]=(0,r.useState)(null);(0,r.useEffect)(()=>{n([])},[]);const q=e.reduce((e,n)=>{const t=n.category;return e[t]||(e[t]=[]),e[t].push(n),e},{}),J=(n,r)=>{const o=e.find(e=>e.id===n);if(o&&o.value!==r)i({...t,[n]:r}),D(e=>new Set(e).add(n));else{const e={...t};delete e[n],i(e),D(e=>{const t=new Set(e);return t.delete(n),t})}},K=e=>{const n=void 0!==t[e.id]?t[e.id]:e.value;return e.isEditable?"boolean"===e.dataType?(0,c.jsxs)(s.mM,{value:n,onChange:n=>J(e.id,n.target.value),children:[(0,c.jsx)("option",{value:"true",children:"True"}),(0,c.jsx)("option",{value:"false",children:"False"})]}):(0,c.jsx)(F,{type:"number"===e.dataType?"number":"email"===e.dataType?"email":"text",dataType:e.dataType,value:n,onChange:n=>J(e.id,n.target.value)}):(0,c.jsx)(C,{children:e.value})};return(0,c.jsx)(o.A,{children:(0,c.jsxs)(a.mc,{children:[(0,c.jsxs)(a.Y9,{children:[(0,c.jsx)(a.hE,{children:"System Configuration"}),(0,c.jsxs)(a.ex,{children:[(0,c.jsx)(d.SC,{variant:"secondary",onClick:()=>{const n={timestamp:(new Date).toISOString(),version:"2.1.4",configs:e.reduce((e,n)=>(e[n.key]={value:n.value,dataType:n.dataType,category:n.category},e),{})},t=JSON.stringify(n,null,2),r=new Blob([t],{type:"application/json"}),i=URL.createObjectURL(r),o=document.createElement("a");o.href=i,o.download=`system-config-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},children:"Export Config"}),(0,c.jsx)(d.SC,{variant:"secondary",onClick:()=>{M(!0)},children:"Import Config"}),(0,c.jsx)(d.SC,{variant:"primary",onClick:()=>{L(!0)},children:"Restart System"})]})]}),(0,c.jsxs)(a.UC,{children:[(0,c.jsx)(p,{children:Object.entries(q).map(r=>{let[o,a]=r;return(0,c.jsxs)(x,{children:[(0,c.jsx)(u,{children:(0,c.jsx)(g,{children:o.replace("_"," ")})}),(0,c.jsx)(h,{children:a.map(r=>(0,c.jsxs)(m,{children:[(0,c.jsxs)(y,{children:[(0,c.jsxs)(f,{children:[r.displayName,r.requiresRestart&&(0,c.jsx)(w,{children:"Requires Restart"})]}),(0,c.jsx)(b,{children:r.description}),(0,c.jsx)(v,{children:r.key})]}),(0,c.jsx)(j,{children:K(r)}),(0,c.jsx)(A,{children:r.isEditable&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(k,{variant:"primary",onClick:()=>(r=>{const o=t[r];if(void 0!==o){n(e.map(e=>e.id===r?{...e,value:o,updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedBy:"System Admin"}:e));const a={...t};delete a[r],i(a),D(e=>{const n=new Set(e);return n.delete(r),n})}})(r.id),disabled:!R.has(r.id),children:"Save"}),R.has(r.id)&&(0,c.jsx)(k,{onClick:()=>(e=>{const n={...t};delete n[e],i(n),D(n=>{const t=new Set(n);return t.delete(e),t})})(r.id),children:"Reset"})]})})]},r.id))})]},o)})}),I&&(0,c.jsxs)(l.aF,{isOpen:I,onClose:()=>M(!1),title:"Import Configuration",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>M(!1),children:"Cancel"}),(0,c.jsx)(l.yl,{onClick:()=>{if(!N)return;const t=new FileReader;t.onload=t=>{try{var r;const i=JSON.parse(null===(r=t.target)||void 0===r?void 0:r.result);if(i.configs){const t=e.map(e=>{const n=i.configs[e.key];return n&&e.isEditable?{...e,value:n.value,updatedAt:(new Date).toISOString().replace("T"," ").slice(0,19),updatedBy:"Config Import"}:e});n(t),alert("Configuration imported successfully!")}}catch(i){alert("Error parsing configuration file. Please check the file format.")}},t.readAsText(N),M(!1),$(null)},disabled:!N,children:"Import Configuration"})]}),children:[(0,c.jsx)("p",{style:{marginBottom:"20px",color:"#6B7280"},children:"Select a configuration file to import. Only editable settings will be updated."}),(0,c.jsxs)(S,{children:[(0,c.jsx)(B,{type:"file",accept:".json",onChange:e=>{var n;const t=null===(n=e.target.files)||void 0===n?void 0:n[0];t&&$(t)},id:"config-file"}),(0,c.jsx)(E,{htmlFor:"config-file",children:N?N.name:"Choose Configuration File"})]}),N&&(0,c.jsxs)(T,{children:["Selected: ",N.name," (",(N.size/1024).toFixed(1)," KB)"]})]}),U&&(0,c.jsxs)(l.aF,{isOpen:U,onClose:()=>L(!1),title:"Restart System",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>L(!1),children:"Cancel"}),(0,c.jsx)(l.yl,{variant:"danger",onClick:()=>{alert("System restart initiated. This may take a few minutes..."),L(!1),setTimeout(()=>{alert("System restart completed successfully!")},3e3)},children:"Restart System"})]}),children:[(0,c.jsx)(z,{children:"\u26a0\ufe0f"}),(0,c.jsx)(O,{children:(0,c.jsx)("strong",{children:"Are you sure you want to restart the system?"})}),(0,c.jsx)("p",{style:{color:"#6B7280",marginBottom:"0"},children:"This will temporarily interrupt service for all users. The system will be back online in a few minutes."})]})]})]})})}}}]);