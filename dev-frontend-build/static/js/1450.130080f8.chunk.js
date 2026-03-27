"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1450],{1450:(e,n,r)=>{r.r(n),r.d(n,{default:()=>F});var t=r(9950),o=r(4752),a=r(8409),i=r(3705),d=r(7617),s=r(4414);const l=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
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
`,x=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=o.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,u=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,g=o.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 300px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`,m=o.Ay.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,b=o.Ay.div`
  display: flex;
  gap: 12px;
`,j=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  overflow-x: auto;
`,v=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,y=o.Ay.th`
  text-align: left;
  padding: 16px 12px;
  border-bottom: 2px solid #E6EBF1;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  white-space: nowrap;
`,w=o.Ay.tr`
  &:hover {
    background: #F9FAFB;
  }
`,f=o.Ay.td`
  padding: 16px 12px;
  border-bottom: 1px solid #F3F4F6;
  font-size: 14px;
  color: #374151;
  white-space: nowrap;
`,E=o.Ay.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"paid":return"background: #DCFCE7; color: #166534;";case"pending":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #374151;"}}}
`,A=o.Ay.div`
  display: flex;
  gap: 8px;
`,C=o.Ay.button`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #EBF8FF;\n          border-color: #2563EB;\n          color: #2563EB;\n          &:hover { background: #DBEAFE; }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border-color: #DC2626;\n          color: #DC2626;\n          &:hover { background: #FECACA; }\n        ";default:return"\n          background: #F3F4F6;\n          border-color: #9CA3AF;\n          color: #374151;\n          &:hover { background: #E5E7EB; }\n        "}}}
`,F=()=>{const[e,n]=(0,t.useState)(""),[r,o]=(0,t.useState)([]),[F,k]=(0,t.useState)({totalStores:0,paidStores:0,pendingStores:0,overdueStores:0,totalRevenue:0}),[B,S]=(0,t.useState)(!1),[D,R]=(0,t.useState)(!1),[z,$]=(0,t.useState)(null),[N,O]=(0,t.useState)(!1),[I,M]=(0,t.useState)({storeName:"",owner:"",rentAmount:"",area:"",phone:"",contractEndDate:""});(0,t.useEffect)(()=>{(async()=>{try{o([]),k({totalStores:0,paidStores:0,pendingStores:0,overdueStores:0,totalRevenue:0})}catch(e){console.error("Error fetching rent data:",e)}})()},[]);const T=e=>{switch(e){case"paid":return"Paid";case"pending":return"Pending";case"overdue":return"Overdue";default:return e}},P=()=>{O(!1),$(null),M({storeName:"",owner:"",rentAmount:"",area:"",phone:"",contractEndDate:""}),S(!0)},q=r.filter(n=>n.storeName.toLowerCase().includes(e.toLowerCase())||n.owner.toLowerCase().includes(e.toLowerCase()));return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(l,{children:[(0,s.jsxs)(c,{children:[(0,s.jsxs)("div",{children:[(0,s.jsx)(p,{children:"Rent Management"}),(0,s.jsx)(h,{children:"Foodcourt tenant rent status and payment management"})]}),(0,s.jsxs)(b,{children:[(0,s.jsx)(i.cc,{variant:"outline",children:"Export Report"}),(0,s.jsx)(i.cc,{variant:"primary",onClick:P,children:"Set Rent"})]})]}),(0,s.jsxs)(x,{children:[(0,s.jsxs)(a.MD,{children:[(0,s.jsxs)(a.hI,{children:[(0,s.jsx)(a.Os,{children:F.totalStores}),(0,s.jsx)(a.v0,{children:"Total Tenants"}),(0,s.jsx)(a.E_,{trend:"up",children:"All active spaces"})]}),(0,s.jsxs)(a.hI,{children:[(0,s.jsx)(a.Os,{children:F.paidStores}),(0,s.jsx)(a.v0,{children:"Paid"}),(0,s.jsxs)(a.E_,{trend:"up",children:[Math.round(F.paidStores/F.totalStores*100),"% payment rate"]})]}),(0,s.jsxs)(a.hI,{children:[(0,s.jsx)(a.Os,{children:F.pendingStores}),(0,s.jsx)(a.v0,{children:"Pending"}),(0,s.jsx)(a.E_,{trend:"down",children:"Awaiting payment"})]}),(0,s.jsxs)(a.hI,{children:[(0,s.jsx)(a.Os,{children:F.overdueStores}),(0,s.jsx)(a.v0,{children:"Overdue"}),(0,s.jsx)(a.E_,{trend:F.overdueStores>0?"down":"up",children:"Requires attention"})]}),(0,s.jsxs)(a.hI,{children:[(0,s.jsxs)(a.Os,{children:["RM ",(F.totalRevenue/1e6).toFixed(0),"M"]}),(0,s.jsx)(a.v0,{children:"This Month Revenue"}),(0,s.jsx)(a.E_,{trend:"up",children:"+5% vs last month"})]})]}),(0,s.jsxs)(u,{children:[(0,s.jsx)(g,{type:"text",placeholder:"Search by business name or owner name...",value:e,onChange:e=>n(e.target.value)}),(0,s.jsxs)(m,{children:[(0,s.jsx)(i.cc,{variant:"primary",onClick:P,children:"Set Rent"}),(0,s.jsx)(i.cc,{variant:"outline",children:"Send Bulk Invoices"})]})]}),(0,s.jsx)(j,{children:(0,s.jsxs)(v,{children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)(y,{children:"Business Name"}),(0,s.jsx)(y,{children:"Owner"}),(0,s.jsx)(y,{children:"Contact"}),(0,s.jsx)(y,{children:"Area"}),(0,s.jsx)(y,{children:"Monthly Rent"}),(0,s.jsx)(y,{children:"Due Date"}),(0,s.jsx)(y,{children:"Status"}),(0,s.jsx)(y,{children:"Payment Date"}),(0,s.jsx)(y,{children:"Contract End"}),(0,s.jsx)(y,{children:"Actions"})]})}),(0,s.jsx)("tbody",{children:q.map(e=>(0,s.jsxs)(w,{children:[(0,s.jsx)(f,{children:(0,s.jsx)("strong",{children:e.storeName})}),(0,s.jsx)(f,{children:e.owner}),(0,s.jsx)(f,{children:e.phone}),(0,s.jsx)(f,{children:e.area}),(0,s.jsx)(f,{children:(0,s.jsxs)("strong",{children:["RM ",e.rentAmount.toLocaleString()]})}),(0,s.jsx)(f,{children:e.dueDate}),(0,s.jsx)(f,{children:(0,s.jsx)(E,{status:e.status,children:T(e.status)})}),(0,s.jsx)(f,{children:e.paymentDate||"-"}),(0,s.jsx)(f,{children:e.contractEndDate}),(0,s.jsx)(f,{children:(0,s.jsxs)(A,{children:[(0,s.jsx)(C,{variant:"primary",onClick:()=>{return n=e,O(!0),$(n),M({storeName:n.storeName,owner:n.owner,rentAmount:n.rentAmount.toString(),area:n.area,phone:n.phone,contractEndDate:n.contractEndDate}),void S(!0);var n},children:"Edit"}),"paid"!==e.status&&(0,s.jsx)(C,{variant:"danger",onClick:()=>($(e),void R(!0)),children:"Remind"})]})})]},e.id))})]})}),(0,s.jsx)(a.zf,{isOpen:B,onClose:()=>S(!1),title:N?"Edit Rent Information":"Set New Rent",children:(0,s.jsxs)("form",{onSubmit:e=>{if(e.preventDefault(),N&&z)o(e=>e.map(e=>e.id===z.id?{...e,...I,rentAmount:parseInt(I.rentAmount)}:e));else{const e={id:(r.length+1).toString(),...I,rentAmount:parseInt(I.rentAmount),dueDate:"2024-01-15",status:"pending",paymentDate:null};o(n=>[...n,e])}S(!1)},children:[(0,s.jsxs)(a.gE,{children:[(0,s.jsx)(a.lR,{children:"Business Name"}),(0,s.jsx)(a.ZQ,{type:"text",value:I.storeName,onChange:e=>M(n=>({...n,storeName:e.target.value})),required:!0})]}),(0,s.jsxs)(a.gE,{children:[(0,s.jsx)(a.lR,{children:"Owner Name"}),(0,s.jsx)(a.ZQ,{type:"text",value:I.owner,onChange:e=>M(n=>({...n,owner:e.target.value})),required:!0})]}),(0,s.jsxs)(a.gE,{children:[(0,s.jsx)(a.lR,{children:"Contact"}),(0,s.jsx)(a.ZQ,{type:"text",value:I.phone,onChange:e=>M(n=>({...n,phone:e.target.value})),required:!0})]}),(0,s.jsxs)(a.gE,{children:[(0,s.jsx)(a.lR,{children:"Area"}),(0,s.jsx)(a.ZQ,{type:"text",value:I.area,onChange:e=>M(n=>({...n,area:e.target.value})),placeholder:"e.g. 45\u33a1",required:!0})]}),(0,s.jsxs)(a.gE,{children:[(0,s.jsx)(a.lR,{children:"Monthly Rent (RM)"}),(0,s.jsx)(a.ZQ,{type:"number",value:I.rentAmount,onChange:e=>M(n=>({...n,rentAmount:e.target.value})),required:!0})]}),(0,s.jsxs)(a.gE,{children:[(0,s.jsx)(a.lR,{children:"Contract End Date"}),(0,s.jsx)(a.ZQ,{type:"date",value:I.contractEndDate,onChange:e=>M(n=>({...n,contractEndDate:e.target.value})),required:!0})]}),(0,s.jsxs)("div",{style:{display:"flex",gap:"12px",marginTop:"24px"},children:[(0,s.jsx)(a.$n,{type:"button",variant:"secondary",onClick:()=>S(!1),children:"Cancel"}),(0,s.jsx)(a.$n,{type:"submit",children:N?"Update":"Add"})]})]})}),(0,s.jsx)(d.A,{isOpen:D,title:"Payment Reminder",message:`Send payment reminder to '${null===z||void 0===z?void 0:z.storeName}'?`,onConfirm:()=>{console.log(`Sending reminder to ${null===z||void 0===z?void 0:z.storeName}`),R(!1)},onCancel:()=>R(!1),confirmText:"Send",cancelText:"Cancel",type:"warning"})]})]})})}},3705:(e,n,r)=>{r.d(n,{cc:()=>o});var t=r(4752);const o=t.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #EF4444;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;t.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,t.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,t.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${e=>e.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},7617:(e,n,r)=>{r.d(n,{A:()=>h});r(9950);var t=r(7119),o=r(4752),a=r(9610),i=r(4414);const d=o.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,s=o.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=o.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,x=o.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=o.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,h=e=>{let{isOpen:n,title:r,message:o,onConfirm:h,onCancel:u,confirmText:g="Confirm",cancelText:m="Cancel",type:b="warning"}=e;return n?t.createPortal((0,i.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&u()},style:{zIndex:1100},children:(0,i.jsxs)(d,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(s,{children:[(0,i.jsx)(l,{children:r}),(0,i.jsx)(c,{children:o})]}),(0,i.jsxs)(x,{children:[(0,i.jsx)(p,{variant:"secondary",onClick:u,children:m}),(0,i.jsx)(p,{variant:"primary",type:b,onClick:h,children:g})]})]})}),document.body):null}}}]);