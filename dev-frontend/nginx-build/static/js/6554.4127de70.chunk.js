"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6554],{6554:(e,i,n)=>{n.r(i),n.d(i,{default:()=>q});var t=n(9950),o=n(4752),s=n(3310),r=n(7492),d=n(4414);const a=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
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
`,l=o.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,p=o.Ay.div`
  display: flex;
  gap: 12px;
`,u=o.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  
  ${e=>e.primary?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: white;\n    color: #6B7C93;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F6F9FC;\n      border-color: #C7D2FE;\n    }\n  "}
`,x=o.Ay.main`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=o.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,g=o.Ay.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,j=o.Ay.div`
  text-align: center;
  padding: 48px 0;
  color: #6B7C93;
`,m=o.Ay.p`
  font-size: 14px;
  margin-bottom: 24px;
`,v=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,y=o.Ay.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,b=o.Ay.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`,f=o.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  
  ${e=>{switch(e.status){case"active":return"\n          background: #ECFDF5;\n          color: #059669;\n        ";case"inactive":return"\n          background: #F3F4F6;\n          color: #6B7C93;\n        ";case"expired":return"\n          background: #FEF2F2;\n          color: #DC2626;\n        "}}}
`,C=o.Ay.div`
  display: flex;
  gap: 8px;
`,A=o.Ay.button`
  padding: 4px 8px;
  font-size: 12px;
  color: #6B7C93;
  background: none;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    background: #F6F9FC;
    color: #0A2540;
    border-color: #C7D2FE;
  }
`,F=o.Ay.div`
  display: ${e=>e.isOpen?"flex":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,k=o.Ay.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: auto;
  animation: slideUp 0.3s;
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,w=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,E=o.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,D=o.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  
  &:hover {
    background: #F6F9FC;
    color: #0A2540;
  }
`,S=o.Ay.div`
  padding: 24px;
`,U=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,z=o.Ay.div`
  margin-bottom: 20px;
`,B=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,V=o.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,T=o.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,P=o.Ay.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  min-height: 80px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,M=o.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  
  input {
    width: 16px;
    height: 16px;
    accent-color: #635BFF;
  }
`,q=()=>{const[e,i]=(0,t.useState)("coupons"),[n,o]=(0,t.useState)([]),[q,R]=(0,t.useState)([]),[N,$]=(0,t.useState)(!1),[I,Y]=(0,t.useState)(!1),[O,W]=(0,t.useState)(null),[L,G]=(0,t.useState)(null),[H,J]=(0,t.useState)({code:"",name:"",discountType:"percentage",discountValue:"",validUntil:"",limit:"",description:""}),[K,Q]=(0,t.useState)({name:"",discountType:"percentage",discountValue:"",requiresApproval:!1,description:""});t.useEffect(()=>{o([{id:1,code:"SUMMER2025",name:"Summer Special",discount:"10%",validUntil:"2025-08-31",used:45,limit:100,status:"active"},{id:2,code:"NEWUSER",name:"New Customer",discount:"RM 5",validUntil:"2025-12-31",used:120,limit:null,status:"active"}]),R([{id:1,name:"Staff Discount",discount:"20%",requiresApproval:!1,status:"active"},{id:2,name:"VIP Customer",discount:"15%",requiresApproval:!0,status:"active"}])},[]);const X=()=>{W(null),J({code:"",name:"",discountType:"percentage",discountValue:"",validUntil:"",limit:"",description:""}),$(!0)},Z=()=>{G(null),Q({name:"",discountType:"percentage",discountValue:"",requiresApproval:!1,description:""}),Y(!0)};return(0,d.jsx)(s.A,{children:(0,d.jsxs)(a,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(l,{children:"Promotions Management"}),(0,d.jsxs)(p,{children:["coupons"===e&&(0,d.jsx)(u,{primary:!0,onClick:X,children:"Create Coupon"}),"discounts"===e&&(0,d.jsx)(u,{primary:!0,onClick:Z,children:"Add Discount Policy"})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(r.j,{children:[(0,d.jsx)(r.oz,{active:"coupons"===e,onClick:()=>i("coupons"),children:"Coupons (Mobile)"}),(0,d.jsx)(r.oz,{active:"discounts"===e,onClick:()=>i("discounts"),children:"Discount Policies (POS)"})]}),"coupons"===e&&(0,d.jsxs)(h,{children:[(0,d.jsx)(g,{children:"Active Coupons"}),n.length>0?(0,d.jsxs)(v,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)(y,{children:"Code"}),(0,d.jsx)(y,{children:"Name"}),(0,d.jsx)(y,{children:"Discount"}),(0,d.jsx)(y,{children:"Valid Until"}),(0,d.jsx)(y,{children:"Usage"}),(0,d.jsx)(y,{children:"Status"}),(0,d.jsx)(y,{children:"Actions"})]})}),(0,d.jsx)("tbody",{children:n.map(e=>(0,d.jsxs)("tr",{children:[(0,d.jsx)(b,{style:{fontWeight:600},children:e.code}),(0,d.jsx)(b,{children:e.name}),(0,d.jsx)(b,{children:e.discount}),(0,d.jsx)(b,{children:e.validUntil}),(0,d.jsxs)(b,{children:[e.used," / ",e.limit||"\u221e"]}),(0,d.jsx)(b,{children:(0,d.jsx)(f,{status:e.status,children:e.status})}),(0,d.jsx)(b,{children:(0,d.jsxs)(C,{children:[(0,d.jsx)(A,{onClick:()=>(e=>{var i;W(e),J({code:e.code,name:e.name,discountType:e.discount.includes("%")?"percentage":"fixed",discountValue:e.discount.replace(/[%RM\s]/g,""),validUntil:e.validUntil,limit:(null===(i=e.limit)||void 0===i?void 0:i.toString())||"",description:""}),$(!0)})(e),children:"Edit"}),(0,d.jsx)(A,{onClick:()=>{return i=e.id,void o(n.map(e=>e.id===i?{...e,status:"active"===e.status?"inactive":"active"}:e));var i},children:"active"===e.status?"Deactivate":"Activate"})]})})]},e.id))})]}):(0,d.jsxs)(j,{children:[(0,d.jsx)(m,{children:"No coupons created yet"}),(0,d.jsx)(u,{primary:!0,onClick:X,children:"Create Your First Coupon"})]})]}),"discounts"===e&&(0,d.jsxs)(h,{children:[(0,d.jsx)(g,{children:"Discount Policies"}),q.length>0?(0,d.jsxs)(v,{children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)(y,{children:"Policy Name"}),(0,d.jsx)(y,{children:"Discount"}),(0,d.jsx)(y,{children:"Approval Required"}),(0,d.jsx)(y,{children:"Status"}),(0,d.jsx)(y,{children:"Actions"})]})}),(0,d.jsx)("tbody",{children:q.map(e=>(0,d.jsxs)("tr",{children:[(0,d.jsx)(b,{style:{fontWeight:600},children:e.name}),(0,d.jsx)(b,{children:e.discount}),(0,d.jsx)(b,{children:e.requiresApproval?"Yes":"No"}),(0,d.jsx)(b,{children:(0,d.jsx)(f,{status:e.status,children:e.status})}),(0,d.jsx)(b,{children:(0,d.jsxs)(C,{children:[(0,d.jsx)(A,{onClick:()=>{return G(i=e),Q({name:i.name,discountType:i.discount.includes("%")?"percentage":"fixed",discountValue:i.discount.replace(/[%RM\s]/g,""),requiresApproval:i.requiresApproval,description:""}),void Y(!0);var i},children:"Edit"}),(0,d.jsx)(A,{onClick:()=>{return i=e.id,void R(q.map(e=>e.id===i?{...e,status:"active"===e.status?"inactive":"active"}:e));var i},children:"active"===e.status?"Deactivate":"Activate"})]})})]},e.id))})]}):(0,d.jsxs)(j,{children:[(0,d.jsx)(m,{children:"No discount policies created yet"}),(0,d.jsx)(u,{primary:!0,onClick:Z,children:"Create Your First Policy"})]})]})]}),(0,d.jsx)(F,{isOpen:N,children:(0,d.jsxs)(k,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(E,{children:O?"Edit Coupon":"Create New Coupon"}),(0,d.jsx)(D,{onClick:()=>$(!1),children:"\xd7"})]}),(0,d.jsxs)(S,{children:[(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Coupon Code"}),(0,d.jsx)(V,{type:"text",value:H.code,onChange:e=>J({...H,code:e.target.value.toUpperCase()}),placeholder:"e.g., SUMMER2025"})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Coupon Name"}),(0,d.jsx)(V,{type:"text",value:H.name,onChange:e=>J({...H,name:e.target.value}),placeholder:"e.g., Summer Special Discount"})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Discount Type"}),(0,d.jsxs)(T,{value:H.discountType,onChange:e=>J({...H,discountType:e.target.value}),children:[(0,d.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,d.jsx)("option",{value:"fixed",children:"Fixed Amount (RM)"})]})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Discount Value"}),(0,d.jsx)(V,{type:"number",value:H.discountValue,onChange:e=>J({...H,discountValue:e.target.value}),placeholder:"percentage"===H.discountType?"10":"5.00",step:"percentage"===H.discountType?"1":"0.01"})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Valid Until"}),(0,d.jsx)(V,{type:"date",value:H.validUntil,onChange:e=>J({...H,validUntil:e.target.value})})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Usage Limit (optional)"}),(0,d.jsx)(V,{type:"number",value:H.limit,onChange:e=>J({...H,limit:e.target.value}),placeholder:"Leave empty for unlimited use"})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Description (optional)"}),(0,d.jsx)(P,{value:H.description,onChange:e=>J({...H,description:e.target.value}),placeholder:"Describe when and how this coupon can be used..."})]})]}),(0,d.jsxs)(U,{children:[(0,d.jsx)(u,{onClick:()=>$(!1),children:"Cancel"}),(0,d.jsx)(u,{primary:!0,onClick:()=>{const e="percentage"===H.discountType?`${H.discountValue}%`:`RM ${H.discountValue}`,i={id:(null===O||void 0===O?void 0:O.id)||Date.now(),code:H.code,name:H.name,discount:e,validUntil:H.validUntil,used:(null===O||void 0===O?void 0:O.used)||0,limit:H.limit?parseInt(H.limit):null,status:"active"};o(O?n.map(e=>e.id===O.id?i:e):[...n,i]),$(!1)},children:O?"Update Coupon":"Create Coupon"})]})]})}),(0,d.jsx)(F,{isOpen:I,children:(0,d.jsxs)(k,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(E,{children:L?"Edit Discount Policy":"Create New Discount Policy"}),(0,d.jsx)(D,{onClick:()=>Y(!1),children:"\xd7"})]}),(0,d.jsxs)(S,{children:[(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Policy Name"}),(0,d.jsx)(V,{type:"text",value:K.name,onChange:e=>Q({...K,name:e.target.value}),placeholder:"e.g., Staff Discount"})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Discount Type"}),(0,d.jsxs)(T,{value:K.discountType,onChange:e=>Q({...K,discountType:e.target.value}),children:[(0,d.jsx)("option",{value:"percentage",children:"Percentage (%)"}),(0,d.jsx)("option",{value:"fixed",children:"Fixed Amount (RM)"})]})]}),(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Discount Value"}),(0,d.jsx)(V,{type:"number",value:K.discountValue,onChange:e=>Q({...K,discountValue:e.target.value}),placeholder:"percentage"===K.discountType?"20":"10.00",step:"percentage"===K.discountType?"1":"0.01"})]}),(0,d.jsx)(z,{children:(0,d.jsxs)(M,{children:[(0,d.jsx)("input",{type:"checkbox",checked:K.requiresApproval,onChange:e=>Q({...K,requiresApproval:e.target.checked})}),"Requires manager approval"]})}),(0,d.jsxs)(z,{children:[(0,d.jsx)(B,{children:"Description (optional)"}),(0,d.jsx)(P,{value:K.description,onChange:e=>Q({...K,description:e.target.value}),placeholder:"Describe when this discount policy applies..."})]})]}),(0,d.jsxs)(U,{children:[(0,d.jsx)(u,{onClick:()=>Y(!1),children:"Cancel"}),(0,d.jsx)(u,{primary:!0,onClick:()=>{const e="percentage"===K.discountType?`${K.discountValue}%`:`RM ${K.discountValue}`,i={id:(null===L||void 0===L?void 0:L.id)||Date.now(),name:K.name,discount:e,requiresApproval:K.requiresApproval,status:"active"};R(L?q.map(e=>e.id===L.id?i:e):[...q,i]),Y(!1)},children:L?"Update Policy":"Create Policy"})]})]})})]})})}}}]);