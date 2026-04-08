"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1450],{1450:(e,n,r)=>{r.r(n),r.d(n,{default:()=>B});var t=r(9950),o=r(4752),a=r(8409),i=r(3705),d=r(7617),s=r(5030),l=r(4414);const c=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,x=o.Ay.div`
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
`,p=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=o.Ay.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`,g=o.Ay.div`
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
`,m=o.Ay.input`
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
`,b=o.Ay.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,j=o.Ay.div`
  display: flex;
  gap: 12px;
`,v=o.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  overflow-x: auto;
`,y=o.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,w=o.Ay.th`
  text-align: left;
  padding: 16px 12px;
  border-bottom: 2px solid #E6EBF1;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  white-space: nowrap;
`,f=o.Ay.tr`
  &:hover {
    background: #F9FAFB;
  }
`,E=o.Ay.td`
  padding: 16px 12px;
  border-bottom: 1px solid #F3F4F6;
  font-size: 14px;
  color: #374151;
  white-space: nowrap;
`,A=o.Ay.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"paid":return"background: #DCFCE7; color: #166534;";case"pending":return"background: #FEF3C7; color: #92400E;";case"overdue":return"background: #FEE2E2; color: #991B1B;";default:return"background: #F3F4F6; color: #374151;"}}}
`,C=o.Ay.div`
  display: flex;
  gap: 8px;
`,F=o.Ay.button`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #EBF8FF;\n          border-color: #2563EB;\n          color: #2563EB;\n          &:hover { background: #DBEAFE; }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border-color: #DC2626;\n          color: #DC2626;\n          &:hover { background: #FECACA; }\n        ";default:return"\n          background: #F3F4F6;\n          border-color: #9CA3AF;\n          color: #374151;\n          &:hover { background: #E5E7EB; }\n        "}}}
`,B=()=>{const{t:e}=(0,s.Bd)("common"),[n,r]=(0,t.useState)(""),[o,B]=(0,t.useState)([]),[k,S]=(0,t.useState)({totalStores:0,paidStores:0,pendingStores:0,overdueStores:0,totalRevenue:0}),[D,R]=(0,t.useState)(!1),[z,$]=(0,t.useState)(!1),[N,O]=(0,t.useState)(null),[I,M]=(0,t.useState)(!1),[T,P]=(0,t.useState)({storeName:"",owner:"",rentAmount:"",area:"",phone:"",contractEndDate:""});(0,t.useEffect)(()=>{(async()=>{try{B([]),S({totalStores:0,paidStores:0,pendingStores:0,overdueStores:0,totalRevenue:0})}catch(e){console.error("Error fetching rent data:",e)}})()},[]);const q=e=>{switch(e){case"paid":return"Paid";case"pending":return"Pending";case"overdue":return"Overdue";default:return e}},Q=()=>{M(!1),O(null),P({storeName:"",owner:"",rentAmount:"",area:"",phone:"",contractEndDate:""}),R(!0)},Z=o.filter(e=>e.storeName.toLowerCase().includes(n.toLowerCase())||e.owner.toLowerCase().includes(n.toLowerCase()));return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(c,{children:[(0,l.jsxs)(x,{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(h,{children:"Rent Management"}),(0,l.jsx)(u,{children:"Foodcourt tenant rent status and payment management"})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(i.cc,{variant:"outline",children:"Export Report"}),(0,l.jsx)(i.cc,{variant:"primary",onClick:Q,children:"Set Rent"})]})]}),(0,l.jsxs)(p,{children:[(0,l.jsxs)(a.MD,{children:[(0,l.jsxs)(a.hI,{children:[(0,l.jsx)(a.Os,{children:k.totalStores}),(0,l.jsx)(a.v0,{children:"Total Tenants"}),(0,l.jsx)(a.E_,{trend:"up",children:"All active spaces"})]}),(0,l.jsxs)(a.hI,{children:[(0,l.jsx)(a.Os,{children:k.paidStores}),(0,l.jsx)(a.v0,{children:"Paid"}),(0,l.jsxs)(a.E_,{trend:"up",children:[Math.round(k.paidStores/k.totalStores*100),"% payment rate"]})]}),(0,l.jsxs)(a.hI,{children:[(0,l.jsx)(a.Os,{children:k.pendingStores}),(0,l.jsx)(a.v0,{children:"Pending"}),(0,l.jsx)(a.E_,{trend:"down",children:"Awaiting payment"})]}),(0,l.jsxs)(a.hI,{children:[(0,l.jsx)(a.Os,{children:k.overdueStores}),(0,l.jsx)(a.v0,{children:"Overdue"}),(0,l.jsx)(a.E_,{trend:k.overdueStores>0?"down":"up",children:"Requires attention"})]}),(0,l.jsxs)(a.hI,{children:[(0,l.jsxs)(a.Os,{children:["RM ",(k.totalRevenue/1e6).toFixed(0),"M"]}),(0,l.jsx)(a.v0,{children:"This Month Revenue"}),(0,l.jsx)(a.E_,{trend:"up",children:"+5% vs last month"})]})]}),(0,l.jsxs)(g,{children:[(0,l.jsx)(m,{type:"text",placeholder:"Search by business name or owner name...",value:n,onChange:e=>r(e.target.value)}),(0,l.jsxs)(b,{children:[(0,l.jsx)(i.cc,{variant:"primary",onClick:Q,children:"Set Rent"}),(0,l.jsx)(i.cc,{variant:"outline",children:"Send Bulk Invoices"})]})]}),(0,l.jsx)(v,{children:(0,l.jsxs)(y,{children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)(w,{children:"Business Name"}),(0,l.jsx)(w,{children:"Owner"}),(0,l.jsx)(w,{children:"Contact"}),(0,l.jsx)(w,{children:"Area"}),(0,l.jsx)(w,{children:"Monthly Rent"}),(0,l.jsx)(w,{children:"Due Date"}),(0,l.jsx)(w,{children:"Status"}),(0,l.jsx)(w,{children:"Payment Date"}),(0,l.jsx)(w,{children:"Contract End"}),(0,l.jsx)(w,{children:"Actions"})]})}),(0,l.jsx)("tbody",{children:Z.map(e=>(0,l.jsxs)(f,{children:[(0,l.jsx)(E,{children:(0,l.jsx)("strong",{children:e.storeName})}),(0,l.jsx)(E,{children:e.owner}),(0,l.jsx)(E,{children:e.phone}),(0,l.jsx)(E,{children:e.area}),(0,l.jsx)(E,{children:(0,l.jsxs)("strong",{children:["RM ",e.rentAmount.toLocaleString()]})}),(0,l.jsx)(E,{children:e.dueDate}),(0,l.jsx)(E,{children:(0,l.jsx)(A,{status:e.status,children:q(e.status)})}),(0,l.jsx)(E,{children:e.paymentDate||"-"}),(0,l.jsx)(E,{children:e.contractEndDate}),(0,l.jsx)(E,{children:(0,l.jsxs)(C,{children:[(0,l.jsx)(F,{variant:"primary",onClick:()=>{return n=e,M(!0),O(n),P({storeName:n.storeName,owner:n.owner,rentAmount:n.rentAmount.toString(),area:n.area,phone:n.phone,contractEndDate:n.contractEndDate}),void R(!0);var n},children:"Edit"}),"paid"!==e.status&&(0,l.jsx)(F,{variant:"danger",onClick:()=>(O(e),void $(!0)),children:"Remind"})]})})]},e.id))})]})}),(0,l.jsx)(a.zf,{isOpen:D,onClose:()=>R(!1),title:I?"Edit Rent Information":"Set New Rent",children:(0,l.jsxs)("form",{onSubmit:e=>{if(e.preventDefault(),I&&N)B(e=>e.map(e=>e.id===N.id?{...e,...T,rentAmount:parseInt(T.rentAmount)}:e));else{const e={id:(o.length+1).toString(),...T,rentAmount:parseInt(T.rentAmount),dueDate:"2024-01-15",status:"pending",paymentDate:null};B(n=>[...n,e])}R(!1)},children:[(0,l.jsxs)(a.gE,{children:[(0,l.jsx)(a.lR,{children:"Business Name"}),(0,l.jsx)(a.ZQ,{type:"text",value:T.storeName,onChange:e=>P(n=>({...n,storeName:e.target.value})),required:!0})]}),(0,l.jsxs)(a.gE,{children:[(0,l.jsx)(a.lR,{children:"Owner Name"}),(0,l.jsx)(a.ZQ,{type:"text",value:T.owner,onChange:e=>P(n=>({...n,owner:e.target.value})),required:!0})]}),(0,l.jsxs)(a.gE,{children:[(0,l.jsx)(a.lR,{children:"Contact"}),(0,l.jsx)(a.ZQ,{type:"text",value:T.phone,onChange:e=>P(n=>({...n,phone:e.target.value})),required:!0})]}),(0,l.jsxs)(a.gE,{children:[(0,l.jsx)(a.lR,{children:"Area"}),(0,l.jsx)(a.ZQ,{type:"text",value:T.area,onChange:e=>P(n=>({...n,area:e.target.value})),placeholder:"e.g. 45\u33a1",required:!0})]}),(0,l.jsxs)(a.gE,{children:[(0,l.jsx)(a.lR,{children:"Monthly Rent (RM)"}),(0,l.jsx)(a.ZQ,{type:"number",value:T.rentAmount,onChange:e=>P(n=>({...n,rentAmount:e.target.value})),required:!0})]}),(0,l.jsxs)(a.gE,{children:[(0,l.jsx)(a.lR,{children:"Contract End Date"}),(0,l.jsx)(a.ZQ,{type:"date",value:T.contractEndDate,onChange:e=>P(n=>({...n,contractEndDate:e.target.value})),required:!0})]}),(0,l.jsxs)("div",{style:{display:"flex",gap:"12px",marginTop:"24px"},children:[(0,l.jsx)(a.$n,{type:"button",variant:"secondary",onClick:()=>R(!1),children:"Cancel"}),(0,l.jsx)(a.$n,{type:"submit",children:I?"Update":"Add"})]})]})}),(0,l.jsx)(d.A,{isOpen:z,title:"Payment Reminder",message:`Send payment reminder to '${null===N||void 0===N?void 0:N.storeName}'?`,onConfirm:()=>{console.log(`Sending reminder to ${null===N||void 0===N?void 0:N.storeName}`),$(!1)},onCancel:()=>$(!1),confirmText:"Send",cancelText:"Cancel",type:"warning"})]})]})})}},3705:(e,n,r)=>{r.d(n,{cc:()=>o});var t=r(4752);const o=t.Ay.button`
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