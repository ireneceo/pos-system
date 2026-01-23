"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1566],{1566:(e,r,n)=>{n.r(r),n.d(r,{default:()=>q});var i=n(9950),o=n(4752),t=n(3310),a=n(2674),s=n(4414);const l=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
`,d=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  opacity: ${e=>e.isActive?1:.6};
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,c=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,p=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,x=o.Ay.span`
  font-size: 12px;
  color: #6B7280;
  font-family: monospace;
  background: #F3F4F6;
  padding: 2px 6px;
  border-radius: 4px;
`,u=o.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,h=o.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.variant){case"category":return"\n          background: #DBEAFE;\n          color: #1E40AF;\n        ";case"target":return"\n          background: #FEF3C7;\n          color: #92400E;\n        ";case"status":return`\n          background: ${"Active"===e.children?"#ECFDF5":"#FEF2F2"};\n          color: ${"Active"===e.children?"#059669":"#DC2626"};\n        `;default:return"\n          background: #F3F4F6;\n          color: #374151;\n        "}}}
`,g=o.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
  line-height: 1.5;
`,v=o.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,y=o.Ay.div`
  flex: 1;
`,j=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,b=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,m=o.Ay.div`
  margin-bottom: 16px;
`,f=o.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 4px;
  font-size: 12px;
  margin: 0 4px 4px 0;
`,_=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
`,A=o.Ay.button`
  flex: 1;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,F=o.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,w=o.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,C=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,E=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,k=o.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;

  &:hover {
    color: #374151;
  }
`,B=o.Ay.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`,z=o.Ay.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,S=o.Ay.div`
  margin-bottom: 20px;
`,M=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,$=o.Ay.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,D=o.Ay.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,T=o.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,L=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`,O=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    width: 16px;
    height: 16px;
    accent-color: #635BFF;
  }

  label {
    font-size: 14px;
    color: #0A2540;
    cursor: pointer;
  }
`,P=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,R=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
`,N=o.Ay.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,U=o.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,I=o.Ay.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,J=o.Ay.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Y=o.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,q=()=>{const[e,r]=(0,i.useState)([]),[n,o]=(0,i.useState)(!0),[q,G]=(0,i.useState)(!1),[H,K]=(0,i.useState)(null),[Q,V]=(0,i.useState)(""),[W,X]=(0,i.useState)("all"),[Z,ee]=(0,i.useState)("all"),[re,ne]=(0,i.useState)("all"),[ie,oe]=(0,i.useState)({module_code:"",name:"",description:"",category:"basic",target_user_type:"all",base_price_monthly:"",base_price_annual:"",features:"",dependencies:"",is_active:!0,sort_order:"0"});(0,i.useEffect)(()=>{te()},[]);const te=async()=>{try{o(!0);const e=await fetch("/api/addon-modules");if(e.ok){const n=await e.json();r(n)}}catch(e){console.error("Error fetching modules:",e)}finally{o(!1)}},ae=e.filter(e=>{const r=e.name.toLowerCase().includes(Q.toLowerCase())||e.module_code.toLowerCase().includes(Q.toLowerCase())||e.description.toLowerCase().includes(Q.toLowerCase()),n="all"===W||e.category===W,i="all"===Z||e.target_user_type===Z,o="all"===re||"active"===re&&e.is_active||"inactive"===re&&!e.is_active;return r&&n&&i&&o}),se=e.filter(e=>e.is_active).length,le=e.filter(e=>"basic"===e.category).length,de=e.filter(e=>"basic"!==e.category).length,ce=e=>0===e?"Free":`RM ${e.toFixed(2)}`;return(0,s.jsx)(t.A,{children:(0,s.jsxs)(a.mc,{children:[(0,s.jsxs)(a.Y9,{children:[(0,s.jsx)(a.hE,{children:"Addon Modules"}),(0,s.jsx)(a.ex,{children:(0,s.jsx)(a.$n,{variant:"primary",onClick:()=>{K(null),oe({module_code:"",name:"",description:"",category:"basic",target_user_type:"all",base_price_monthly:"",base_price_annual:"",features:"",dependencies:"",is_active:!0,sort_order:"0"}),G(!0)},children:"Create Module"})})]}),(0,s.jsxs)(a.UC,{children:[(0,s.jsxs)(P,{children:[(0,s.jsxs)(R,{children:[(0,s.jsx)(N,{children:e.length}),(0,s.jsx)(U,{children:"Total Modules"})]}),(0,s.jsxs)(R,{children:[(0,s.jsx)(N,{children:se}),(0,s.jsx)(U,{children:"Active Modules"})]}),(0,s.jsxs)(R,{children:[(0,s.jsx)(N,{children:le}),(0,s.jsx)(U,{children:"Basic Modules"})]}),(0,s.jsxs)(R,{children:[(0,s.jsx)(N,{children:de}),(0,s.jsx)(U,{children:"Advanced Modules"})]})]}),(0,s.jsxs)(I,{children:[(0,s.jsx)(Y,{type:"text",placeholder:"Search modules...",value:Q,onChange:e=>V(e.target.value)}),(0,s.jsxs)(J,{value:W,onChange:e=>X(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Categories"}),(0,s.jsx)("option",{value:"basic",children:"Basic"}),(0,s.jsx)("option",{value:"advanced",children:"Advanced"}),(0,s.jsx)("option",{value:"revenue",children:"Revenue"}),(0,s.jsx)("option",{value:"operation",children:"Operation"}),(0,s.jsx)("option",{value:"analytics",children:"Analytics"})]}),(0,s.jsxs)(J,{value:Z,onChange:e=>ee(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Targets"}),(0,s.jsx)("option",{value:"restaurant",children:"Restaurant"}),(0,s.jsx)("option",{value:"brand",children:"Brand"}),(0,s.jsx)("option",{value:"foodcourt",children:"Foodcourt"})]}),(0,s.jsxs)(J,{value:re,onChange:e=>ne(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"active",children:"Active"}),(0,s.jsx)("option",{value:"inactive",children:"Inactive"})]})]}),n?(0,s.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading modules..."}):0===ae.length?(0,s.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:'No modules found. Click "Create Module" to add one.'}):(0,s.jsx)(l,{children:ae.map(e=>(0,s.jsxs)(d,{isActive:e.is_active,children:[(0,s.jsxs)(c,{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(p,{children:e.name}),(0,s.jsx)(x,{children:e.module_code})]}),(0,s.jsxs)(u,{children:[(0,s.jsx)(h,{variant:"category",children:e.category}),(0,s.jsx)(h,{variant:"target",children:e.target_user_type}),(0,s.jsx)(h,{variant:"status",children:e.is_active?"Active":"Inactive"})]})]}),(0,s.jsx)(g,{children:e.description}),(0,s.jsxs)(v,{children:[(0,s.jsxs)(y,{children:[(0,s.jsx)(j,{children:"Monthly"}),(0,s.jsx)(b,{children:ce(e.base_price_monthly)})]}),(0,s.jsxs)(y,{children:[(0,s.jsx)(j,{children:"Annual"}),(0,s.jsx)(b,{children:ce(e.base_price_annual)})]})]}),e.features&&e.features.length>0&&(0,s.jsxs)(m,{children:[e.features.slice(0,3).map((e,r)=>(0,s.jsx)(f,{children:e},r)),e.features.length>3&&(0,s.jsxs)(f,{children:["+",e.features.length-3," more"]})]}),(0,s.jsxs)(_,{children:[(0,s.jsx)(A,{variant:"primary",onClick:()=>(e=>{var r,n,i;K(e),oe({module_code:e.module_code,name:e.name,description:e.description,category:e.category,target_user_type:e.target_user_type,base_price_monthly:(null===(r=e.base_price_monthly)||void 0===r?void 0:r.toString())||"0",base_price_annual:(null===(n=e.base_price_annual)||void 0===n?void 0:n.toString())||"0",features:(e.features||[]).join("\n"),dependencies:(e.dependencies||[]).join(", "),is_active:e.is_active,sort_order:(null===(i=e.sort_order)||void 0===i?void 0:i.toString())||"0"}),G(!0)})(e),children:"Edit"}),(0,s.jsx)(A,{variant:"secondary",onClick:()=>(async e=>{try{(await fetch(`/api/addon-modules/${e.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({is_active:!e.is_active})})).ok&&te()}catch(r){console.error("Error toggling status:",r)}})(e),children:e.is_active?"Deactivate":"Activate"}),(0,s.jsx)(A,{variant:"danger",onClick:()=>(async e=>{if(window.confirm("Are you sure you want to delete this module?"))try{(await fetch(`/api/addon-modules/${e}`,{method:"DELETE"})).ok?(alert("Module deleted successfully!"),te()):alert("Failed to delete module")}catch(r){console.error("Error deleting module:",r),alert("Failed to delete module")}})(e.id),children:"Delete"})]})]},e.id))}),q&&(0,s.jsx)(F,{onClick:()=>G(!1),children:(0,s.jsxs)(w,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(C,{children:[(0,s.jsx)(E,{children:H?"Edit Module":"Create New Module"}),(0,s.jsx)(k,{onClick:()=>G(!1),children:"\xd7"})]}),(0,s.jsxs)(B,{children:[(0,s.jsxs)(L,{children:[(0,s.jsxs)(S,{children:[(0,s.jsx)(M,{children:"Module Code *"}),(0,s.jsx)($,{type:"text",value:ie.module_code,onChange:e=>oe({...ie,module_code:e.target.value.toLowerCase().replace(/\s/g,"_")}),placeholder:"e.g., pos_basic",disabled:!!H})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(M,{children:"Name *"}),(0,s.jsx)($,{type:"text",value:ie.name,onChange:e=>oe({...ie,name:e.target.value}),placeholder:"e.g., POS Basic"})]})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(M,{children:"Description"}),(0,s.jsx)(T,{rows:3,value:ie.description,onChange:e=>oe({...ie,description:e.target.value}),placeholder:"Describe what this module does..."})]}),(0,s.jsxs)(L,{children:[(0,s.jsxs)(S,{children:[(0,s.jsx)(M,{children:"Category"}),(0,s.jsxs)(D,{value:ie.category,onChange:e=>oe({...ie,category:e.target.value}),children:[(0,s.jsx)("option",{value:"basic",children:"Basic"}),(0,s.jsx)("option",{value:"advanced",children:"Advanced"}),(0,s.jsx)("option",{value:"revenue",children:"Revenue"}),(0,s.jsx)("option",{value:"operation",children:"Operation"}),(0,s.jsx)("option",{value:"analytics",children:"Analytics"})]})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(M,{children:"Target User Type"}),(0,s.jsxs)(D,{value:ie.target_user_type,onChange:e=>oe({...ie,target_user_type:e.target.value}),children:[(0,s.jsx)("option",{value:"all",children:"All"}),(0,s.jsx)("option",{value:"restaurant",children:"Restaurant"}),(0,s.jsx)("option",{value:"brand",children:"Brand"}),(0,s.jsx)("option",{value:"foodcourt",children:"Foodcourt"})]})]})]}),(0,s.jsxs)(L,{children:[(0,s.jsxs)(S,{children:[(0,s.jsx)(M,{children:"Monthly Price (RM)"}),(0,s.jsx)($,{type:"number",value:ie.base_price_monthly,onChange:e=>oe({...ie,base_price_monthly:e.target.value}),placeholder:"0.00"})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(M,{children:"Annual Price (RM)"}),(0,s.jsx)($,{type:"number",value:ie.base_price_annual,onChange:e=>oe({...ie,base_price_annual:e.target.value}),placeholder:"0.00"})]})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(M,{children:"Features (one per line)"}),(0,s.jsx)(T,{rows:4,value:ie.features,onChange:e=>oe({...ie,features:e.target.value}),placeholder:"Feature 1\nFeature 2\nFeature 3"})]}),(0,s.jsxs)(L,{children:[(0,s.jsxs)(S,{children:[(0,s.jsx)(M,{children:"Dependencies (comma-separated codes)"}),(0,s.jsx)($,{type:"text",value:ie.dependencies,onChange:e=>oe({...ie,dependencies:e.target.value}),placeholder:"e.g., pos_basic, inventory"})]}),(0,s.jsxs)(S,{children:[(0,s.jsx)(M,{children:"Sort Order"}),(0,s.jsx)($,{type:"number",value:ie.sort_order,onChange:e=>oe({...ie,sort_order:e.target.value}),placeholder:"0"})]})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)("input",{type:"checkbox",id:"is_active",checked:ie.is_active,onChange:e=>oe({...ie,is_active:e.target.checked})}),(0,s.jsx)("label",{htmlFor:"is_active",children:"Active"})]})]}),(0,s.jsxs)(z,{children:[(0,s.jsx)(a.$n,{variant:"secondary",onClick:()=>G(!1),children:"Cancel"}),(0,s.jsx)(a.$n,{variant:"primary",onClick:async()=>{try{const e={module_code:ie.module_code,name:ie.name,description:ie.description,category:ie.category,target_user_type:ie.target_user_type,base_price_monthly:parseFloat(ie.base_price_monthly)||0,base_price_annual:parseFloat(ie.base_price_annual)||0,features:ie.features.split("\n").filter(e=>e.trim()),dependencies:ie.dependencies.split(",").map(e=>e.trim()).filter(e=>e),is_active:ie.is_active,sort_order:parseInt(ie.sort_order)||0},r=H?`/api/addon-modules/${H.id}`:"/api/addon-modules",n=await fetch(r,{method:H?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(n.ok)alert(H?"Module updated successfully!":"Module created successfully!"),G(!1),te();else{const e=await n.json();alert(e.error||"Failed to save module")}}catch(e){console.error("Error saving module:",e),alert("Failed to save module")}},children:H?"Update":"Create"})]})]})})]})]})})}}}]);