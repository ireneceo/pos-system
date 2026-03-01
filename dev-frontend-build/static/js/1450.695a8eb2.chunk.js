"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1450],{1450:(e,r,n)=>{n.r(r),n.d(r,{default:()=>S});var o=n(8819),t=n(9950),a=n(4752),i=n(2674),s=n(3705),d=n(7617),l=n(4414);const c=a.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,x=a.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${o.w.colors.border};
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
`,p=a.Ay.div`
  padding: 32px;
  background: ${o.w.colors.background};
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${o.w.colors.secondary};
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=a.Ay.p`
  font-size: 16px;
  color: ${o.w.colors.text.muted};
  margin: 8px 0 0;
`,g=a.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${o.w.colors.border};
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,m=a.Ay.input`
  padding: 10px 16px;
  border: 1px solid ${o.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  min-width: 300px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: 0 0 0 3px ${o.w.colors.primaryLight};
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`,w=a.Ay.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,j=a.Ay.div`
  display: flex;
  gap: 12px;
`,b=a.Ay.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid ${o.w.colors.border};
  overflow-x: auto;
`,y=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,v=a.Ay.th`
  text-align: left;
  padding: 16px 12px;
  border-bottom: 2px solid ${o.w.colors.border};
  font-weight: 600;
  color: ${o.w.colors.text.dark};
  font-size: 14px;
  white-space: nowrap;
`,f=a.Ay.tr`
  &:hover {
    background: #F9FAFB;
  }
`,$=a.Ay.td`
  padding: 16px 12px;
  border-bottom: 1px solid ${o.w.colors.surfaceMuted};
  font-size: 14px;
  color: ${o.w.colors.text.dark};
  white-space: nowrap;
`,A=a.Ay.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${e=>{switch(e.status){case"paid":return"background: #DCFCE7; color: #166534;";case"pending":return"background: ${t.colors.status.warningLightAlt}; color: #92400E;";case"overdue":return"background: ${t.colors.status.errorLightAlt}; color: #991B1B;";default:return"background: ${t.colors.surfaceMuted}; color: ${t.colors.text.dark};"}}}
`,C=a.Ay.div`
  display: flex;
  gap: 8px;
`,k=a.Ay.button`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #EBF8FF;\n          border-color: #2563EB;\n          color: #2563EB;\n          &:hover { background: #DBEAFE; }\n        ";case"danger":return`\n          background: ${o.w.colors.dangerLight};\n          border-color: ${o.w.colors.danger};\n          color: ${o.w.colors.danger};\n          &:hover { background: #FECACA; }\n        `;default:return`\n          background: ${o.w.colors.surfaceMuted};\n          border-color: ${o.w.colors.text.placeholder};\n          color: ${o.w.colors.text.dark};\n          &:hover { background: ${o.w.colors.borderLight}; }\n        `}}}
`,S=()=>{const[e,r]=(0,t.useState)(""),[n,o]=(0,t.useState)([]),[a,S]=(0,t.useState)({totalStores:0,paidStores:0,pendingStores:0,overdueStores:0,totalRevenue:0}),[E,R]=(0,t.useState)(!1),[D,F]=(0,t.useState)(!1),[B,z]=(0,t.useState)(null),[L,N]=(0,t.useState)(!1),[M,O]=(0,t.useState)({storeName:"",owner:"",rentAmount:"",area:"",phone:"",contractEndDate:""});(0,t.useEffect)(()=>{(async()=>{try{o([]),S({totalStores:0,paidStores:0,pendingStores:0,overdueStores:0,totalRevenue:0})}catch(e){console.error("Error fetching rent data:",e)}})()},[]);const I=e=>{switch(e){case"paid":return"Paid";case"pending":return"Pending";case"overdue":return"Overdue";default:return e}},P=()=>{N(!1),z(null),O({storeName:"",owner:"",rentAmount:"",area:"",phone:"",contractEndDate:""}),R(!0)},T=n.filter(r=>r.storeName.toLowerCase().includes(e.toLowerCase())||r.owner.toLowerCase().includes(e.toLowerCase()));return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(c,{children:[(0,l.jsxs)(x,{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)(h,{children:"Rent Management"}),(0,l.jsx)(u,{children:"Foodcourt tenant rent status and payment management"})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(s.cc,{variant:"outline",children:"Export Report"}),(0,l.jsx)(s.cc,{variant:"primary",onClick:P,children:"Set Rent"})]})]}),(0,l.jsxs)(p,{children:[(0,l.jsxs)(i.MD,{children:[(0,l.jsxs)(i.hI,{children:[(0,l.jsx)(i.Os,{children:a.totalStores}),(0,l.jsx)(i.v0,{children:"Total Tenants"}),(0,l.jsx)(i.E_,{trend:"up",children:"All active spaces"})]}),(0,l.jsxs)(i.hI,{children:[(0,l.jsx)(i.Os,{children:a.paidStores}),(0,l.jsx)(i.v0,{children:"Paid"}),(0,l.jsxs)(i.E_,{trend:"up",children:[Math.round(a.paidStores/a.totalStores*100),"% payment rate"]})]}),(0,l.jsxs)(i.hI,{children:[(0,l.jsx)(i.Os,{children:a.pendingStores}),(0,l.jsx)(i.v0,{children:"Pending"}),(0,l.jsx)(i.E_,{trend:"down",children:"Awaiting payment"})]}),(0,l.jsxs)(i.hI,{children:[(0,l.jsx)(i.Os,{children:a.overdueStores}),(0,l.jsx)(i.v0,{children:"Overdue"}),(0,l.jsx)(i.E_,{trend:a.overdueStores>0?"down":"up",children:"Requires attention"})]}),(0,l.jsxs)(i.hI,{children:[(0,l.jsxs)(i.Os,{children:["RM ",(a.totalRevenue/1e6).toFixed(0),"M"]}),(0,l.jsx)(i.v0,{children:"This Month Revenue"}),(0,l.jsx)(i.E_,{trend:"up",children:"+5% vs last month"})]})]}),(0,l.jsxs)(g,{children:[(0,l.jsx)(m,{type:"text",placeholder:"Search by business name or owner name...",value:e,onChange:e=>r(e.target.value)}),(0,l.jsxs)(w,{children:[(0,l.jsx)(s.cc,{variant:"primary",onClick:P,children:"Set Rent"}),(0,l.jsx)(s.cc,{variant:"outline",children:"Send Bulk Invoices"})]})]}),(0,l.jsx)(b,{children:(0,l.jsxs)(y,{children:[(0,l.jsx)("thead",{children:(0,l.jsxs)("tr",{children:[(0,l.jsx)(v,{children:"Business Name"}),(0,l.jsx)(v,{children:"Owner"}),(0,l.jsx)(v,{children:"Contact"}),(0,l.jsx)(v,{children:"Area"}),(0,l.jsx)(v,{children:"Monthly Rent"}),(0,l.jsx)(v,{children:"Due Date"}),(0,l.jsx)(v,{children:"Status"}),(0,l.jsx)(v,{children:"Payment Date"}),(0,l.jsx)(v,{children:"Contract End"}),(0,l.jsx)(v,{children:"Actions"})]})}),(0,l.jsx)("tbody",{children:T.map(e=>(0,l.jsxs)(f,{children:[(0,l.jsx)($,{children:(0,l.jsx)("strong",{children:e.storeName})}),(0,l.jsx)($,{children:e.owner}),(0,l.jsx)($,{children:e.phone}),(0,l.jsx)($,{children:e.area}),(0,l.jsx)($,{children:(0,l.jsxs)("strong",{children:["RM ",e.rentAmount.toLocaleString()]})}),(0,l.jsx)($,{children:e.dueDate}),(0,l.jsx)($,{children:(0,l.jsx)(A,{status:e.status,children:I(e.status)})}),(0,l.jsx)($,{children:e.paymentDate||"-"}),(0,l.jsx)($,{children:e.contractEndDate}),(0,l.jsx)($,{children:(0,l.jsxs)(C,{children:[(0,l.jsx)(k,{variant:"primary",onClick:()=>{return r=e,N(!0),z(r),O({storeName:r.storeName,owner:r.owner,rentAmount:r.rentAmount.toString(),area:r.area,phone:r.phone,contractEndDate:r.contractEndDate}),void R(!0);var r},children:"Edit"}),"paid"!==e.status&&(0,l.jsx)(k,{variant:"danger",onClick:()=>(z(e),void F(!0)),children:"Remind"})]})})]},e.id))})]})}),(0,l.jsx)(i.zf,{isOpen:E,onClose:()=>R(!1),title:L?"Edit Rent Information":"Set New Rent",children:(0,l.jsxs)("form",{onSubmit:e=>{if(e.preventDefault(),L&&B)o(e=>e.map(e=>e.id===B.id?{...e,...M,rentAmount:parseInt(M.rentAmount)}:e));else{const e={id:(n.length+1).toString(),...M,rentAmount:parseInt(M.rentAmount),dueDate:"2024-01-15",status:"pending",paymentDate:null};o(r=>[...r,e])}R(!1)},children:[(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Business Name"}),(0,l.jsx)(i.ZQ,{type:"text",value:M.storeName,onChange:e=>O(r=>({...r,storeName:e.target.value})),required:!0})]}),(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Owner Name"}),(0,l.jsx)(i.ZQ,{type:"text",value:M.owner,onChange:e=>O(r=>({...r,owner:e.target.value})),required:!0})]}),(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Contact"}),(0,l.jsx)(i.ZQ,{type:"text",value:M.phone,onChange:e=>O(r=>({...r,phone:e.target.value})),required:!0})]}),(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Area"}),(0,l.jsx)(i.ZQ,{type:"text",value:M.area,onChange:e=>O(r=>({...r,area:e.target.value})),placeholder:"e.g. 45\u33a1",required:!0})]}),(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Monthly Rent (RM)"}),(0,l.jsx)(i.ZQ,{type:"number",value:M.rentAmount,onChange:e=>O(r=>({...r,rentAmount:e.target.value})),required:!0})]}),(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Contract End Date"}),(0,l.jsx)(i.ZQ,{type:"date",value:M.contractEndDate,onChange:e=>O(r=>({...r,contractEndDate:e.target.value})),required:!0})]}),(0,l.jsxs)("div",{style:{display:"flex",gap:"12px",marginTop:"24px"},children:[(0,l.jsx)(i.$n,{type:"button",variant:"secondary",onClick:()=>R(!1),children:"Cancel"}),(0,l.jsx)(i.$n,{type:"submit",children:L?"Update":"Add"})]})]})}),(0,l.jsx)(d.A,{isOpen:D,title:"Payment Reminder",message:`Send payment reminder to '${null===B||void 0===B?void 0:B.storeName}'?`,onConfirm:()=>{console.log(`Sending reminder to ${null===B||void 0===B?void 0:B.storeName}`),F(!1)},onCancel:()=>F(!1),confirmText:"Send",cancelText:"Cancel",type:"warning"})]})]})})}},3705:(e,r,n)=>{n.d(r,{cc:()=>a.$n});var o=n(8819),t=n(4752),a=n(8829);t.Ay.select`
  padding: ${o.w.components.form.inputPadding};
  border: 1px solid ${o.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${o.w.typography.fontSize.sm};
  background: ${o.w.colors.surface};
  color: ${o.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: ${o.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${o.w.colors.borderHover};
  }
`,t.Ay.input`
  padding: ${o.w.components.form.inputPadding};
  border: 1px solid ${o.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${o.w.typography.fontSize.sm};
  background: ${o.w.colors.surface};
  color: ${o.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: ${o.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${o.w.colors.borderHover};
  }
`,t.Ay.div`
  background: ${o.w.colors.surface};
  border-radius: ${o.w.borderRadius.md};
  border: 1px solid ${o.w.colors.borderLight};
  padding: ${o.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${o.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${o.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${o.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},7617:(e,r,n)=>{n.d(r,{A:()=>h});var o=n(8819),t=(n(9950),n(4752)),a=n(9610),i=n(4414);const s=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,d=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid ${o.w.colors.border};
`,l=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,x=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=t.Ay.button`
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
`,h=e=>{let{isOpen:r,title:n,message:o,onConfirm:t,onCancel:h,confirmText:u="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return r?(0,i.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,i.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(d,{children:[(0,i.jsx)(l,{children:n}),(0,i.jsx)(c,{children:o})]}),(0,i.jsxs)(x,{children:[(0,i.jsx)(p,{variant:"secondary",onClick:h,children:g}),(0,i.jsx)(p,{variant:"primary",type:m,onClick:t,children:u})]})]})}):null}}}]);