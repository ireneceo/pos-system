"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4107],{4107:(e,n,t)=>{t.r(n),t.d(n,{default:()=>H});var r=t(9950),a=t(4752),i=t(3310),s=t(1367),o=t(6910),l=t(6038),d=t(4414);const c=a.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,x=a.Ay.div`
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
`,p=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=a.Ay.div`
  display: flex;
  gap: 12px;
`,j=a.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,g=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,m=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,v=a.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,f=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=a.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,y=a.Ay.input`
  flex: 1;
  min-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,F=a.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,w=a.Ay.div``,A=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,C=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,k=a.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"paid":return"#ECFDF5";case"sent":return"#DBEAFE";case"draft":default:return"#F3F4F6";case"overdue":return"#FEE2E2";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"paid":return"#059669";case"sent":return"#1E40AF";case"draft":default:return"#6B7280";case"overdue":case"cancelled":return"#DC2626"}}};
`,D=a.Ay.div`
  font-weight: ${e=>e.highlight?"700":"500"};
  color: ${e=>e.highlight?"#059669":"#374151"};
`,E=a.Ay.div`
  display: flex;
  gap: 8px;
`,S=a.Ay.button`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,I=a.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,B=a.Ay.div`
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 200px;
  gap: 16px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,N=a.Ay.div`
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 200px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,P=a.Ay.div`
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
`,T=a.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
`,R=a.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,M=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,z=a.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: #F3F4F6;
    color: #6B7280;
  }
`,$=a.Ay.div`
  padding: 0 24px 24px 24px;
  max-height: 400px;
  overflow-y: auto;
`,O=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
`,L=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,_=a.Ay.div`
  margin-bottom: 20px;
`,q=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,U=a.Ay.input`
  width: 100%;
  padding: 12px 16px;
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
`,J=a.Ay.select`
  width: 100%;
  padding: 12px 16px;
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
`,W=a.Ay.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,V=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,Y=a.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,G=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  
  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,H=()=>{const{user:e}=(0,s.As)(),[n,t]=(0,r.useState)([]),[a,H]=(0,r.useState)(""),[K,Q]=(0,r.useState)("all"),[X,Z]=(0,r.useState)("all"),[ee,ne]=(0,r.useState)(!1),[te,re]=(0,r.useState)(!1),[ae,ie]=(0,r.useState)(!1),[se,oe]=(0,r.useState)(!1),[le,de]=(0,r.useState)(!1),[ce,xe]=(0,r.useState)(null),[pe,he]=(0,r.useState)(null),[ue,je]=(0,r.useState)({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),[ge,me]=(0,r.useState)({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"});(0,r.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",r=await fetch(`${o.JR}/api/invoices/manager/${n}`);if(r.ok){const e=await r.json();t(e)}else console.error("Failed to fetch invoices from API"),t([])}catch(n){console.error("Failed to fetch invoices:",n),t([])}})()},[e]);const ve=n.filter(e=>{var n;const t=e.restaurantName.toLowerCase().includes(a.toLowerCase())||e.invoiceNumber.toLowerCase().includes(a.toLowerCase())||(null===(n=e.restaurantManager)||void 0===n?void 0:n.toLowerCase().includes(a.toLowerCase()||"")),r="all"===K||e.status===K,i="all"===X||e.issueDate.includes(X);return t&&r&&i}),fe=n.length,be=n.filter(e=>"paid"===e.status).length,ye=n.filter(e=>"overdue"===e.status).length,Fe=n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),we=e=>new Date(e).toLocaleDateString("en-MY"),Ae=e=>{xe(e),je({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),oe(!0)};return(0,d.jsx)(i.A,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(h,{children:"Restaurant Invoice Management"}),(0,d.jsxs)(u,{children:[(0,d.jsx)(j,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalInvoices:n.length,summary:{totalAmount:n.reduce((e,n)=>e+n.total,0),paidInvoices:n.filter(e=>"paid"===e.status).length,overdueInvoices:n.filter(e=>"overdue"===e.status).length,draftInvoices:n.filter(e=>"draft"===e.status).length,paidAmount:n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),outstandingAmount:n.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0)},statusBreakdown:{draft:n.filter(e=>"draft"===e.status).length,sent:n.filter(e=>"sent"===e.status).length,paid:n.filter(e=>"paid"===e.status).length,overdue:n.filter(e=>"overdue"===e.status).length,cancelled:n.filter(e=>"cancelled"===e.status).length},invoices:n.map(e=>({invoiceNumber:e.invoiceNumber,restaurantName:e.restaurantName,restaurantManager:e.restaurantManager,issueDate:e.issueDate,dueDate:e.dueDate,paidDate:e.paidDate||"N/A",status:e.status,amount:e.amount,tax:e.tax,total:e.total,billingPeriod:e.billingPeriod,planType:e.planType}))},t=JSON.stringify(e,null,2),r=new Blob([t],{type:"application/json"}),a=URL.createObjectURL(r),i=document.createElement("a");i.href=a,i.download=`restaurant-invoices-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a)},children:"Export"}),(0,d.jsx)(j,{variant:"primary",onClick:()=>{ne(!0)},children:"Create Invoice"})]})]}),(0,d.jsxs)(p,{children:[(0,d.jsxs)(g,{children:[(0,d.jsxs)(m,{color:"#059669",children:[(0,d.jsx)(v,{children:fe}),(0,d.jsx)(f,{children:"Total Invoices"})]}),(0,d.jsxs)(m,{color:"#2563EB",children:[(0,d.jsx)(v,{children:be}),(0,d.jsx)(f,{children:"Paid Invoices"})]}),(0,d.jsxs)(m,{color:"#DC2626",children:[(0,d.jsx)(v,{children:ye}),(0,d.jsx)(f,{children:"Overdue Invoices"})]}),(0,d.jsxs)(m,{color:"#7C3AED",children:[(0,d.jsx)(v,{children:(0,l.vv)(Fe)}),(0,d.jsx)(f,{children:"Total Revenue"})]})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{type:"text",placeholder:"Search by invoice number, restaurant, or plan type...",value:a,onChange:e=>H(e.target.value)}),(0,d.jsxs)(F,{value:K,onChange:e=>Q(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"draft",children:"Draft"}),(0,d.jsx)("option",{value:"sent",children:"Sent"}),(0,d.jsx)("option",{value:"paid",children:"Paid"}),(0,d.jsx)("option",{value:"overdue",children:"Overdue"}),(0,d.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,d.jsxs)(F,{value:X,onChange:e=>Z(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Months"}),(0,d.jsx)("option",{value:"2025-01",children:"January 2025"}),(0,d.jsx)("option",{value:"2024-12",children:"December 2024"}),(0,d.jsx)("option",{value:"2024-11",children:"November 2024"})]})]}),(0,d.jsxs)(I,{children:[(0,d.jsxs)(B,{children:[(0,d.jsx)("span",{children:"Invoice"}),(0,d.jsx)("span",{children:"Restaurant"}),(0,d.jsx)("span",{children:"Issue Date"}),(0,d.jsx)("span",{children:"Due Date"}),(0,d.jsx)("span",{children:"Status"}),(0,d.jsx)("span",{children:"Amount"}),(0,d.jsx)("span",{children:"Total"}),(0,d.jsx)("span",{children:"Actions"})]}),0===ve.length?(0,d.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,d.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No invoices found"}),(0,d.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or create a new invoice"})]}):ve.map(e=>(0,d.jsxs)(N,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(A,{children:e.invoiceNumber}),(0,d.jsx)(C,{children:e.planType})]}),(0,d.jsxs)(w,{children:[(0,d.jsx)(A,{children:e.restaurantName}),(0,d.jsx)(C,{children:e.restaurantManager})]}),(0,d.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:we(e.issueDate)}),(0,d.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:we(e.dueDate)}),(0,d.jsx)(k,{status:e.status,children:e.status}),(0,d.jsx)(D,{children:(0,l.vv)(e.amount)}),(0,d.jsx)(D,{highlight:!0,children:(0,l.vv)(e.total)}),(0,d.jsxs)(E,{children:[(0,d.jsx)(S,{variant:"primary",onClick:()=>(e=>{xe(e),re(!0)})(e),children:"View"}),"draft"===e.status&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(S,{onClick:()=>(e=>{xe(e),he({amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,items:e.items}),ie(!0)})(e),children:"Edit"}),(0,d.jsx)(S,{onClick:()=>(e=>{window.confirm(`Send invoice ${e.invoiceNumber} to ${e.restaurantName}?`)&&(t(n.map(n=>n.id===e.id?{...n,status:"sent"}:n)),alert(`Invoice ${e.invoiceNumber} has been sent to ${e.restaurantName}`))})(e),children:"Send"})]}),"sent"===e.status&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(S,{variant:"primary",onClick:()=>Ae(e),children:"Pay Now"}),(0,d.jsx)(S,{onClick:()=>(e=>{window.confirm(`Mark invoice ${e.invoiceNumber} as overdue?`)&&(t(n.map(n=>n.id===e.id?{...n,status:"overdue"}:n)),alert(`Invoice ${e.invoiceNumber} marked as overdue`))})(e),children:"Mark Overdue"})]}),"overdue"===e.status&&(0,d.jsx)(S,{variant:"primary",onClick:()=>Ae(e),children:"Pay Now"}),"paid"===e.status&&(0,d.jsx)(S,{onClick:()=>window.print(),children:"Print Receipt"})]})]},e.id))]}),ee&&(0,d.jsx)(P,{onClick:()=>ne(!1),children:(0,d.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(R,{children:[(0,d.jsx)(M,{children:"Create New Invoice"}),(0,d.jsx)(z,{onClick:()=>ne(!1),children:"\xd7"})]}),(0,d.jsxs)($,{children:[(0,d.jsxs)(L,{children:[(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Restaurant Name *"}),(0,d.jsx)(U,{type:"text",value:ge.restaurantName,onChange:e=>me({...ge,restaurantName:e.target.value}),placeholder:"Enter restaurant name",required:!0})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Restaurant Manager"}),(0,d.jsx)(U,{type:"text",value:ge.restaurantManager,onChange:e=>me({...ge,restaurantManager:e.target.value}),placeholder:"Enter manager name"})]})]}),(0,d.jsxs)(L,{children:[(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Amount (RM) *"}),(0,d.jsx)(U,{type:"number",step:"0.01",min:"0",value:ge.amount,onChange:e=>me({...ge,amount:e.target.value}),placeholder:"0.00",required:!0}),(0,d.jsx)(V,{children:"Tax (6%) will be calculated automatically"})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Due Date *"}),(0,d.jsx)(U,{type:"date",value:ge.dueDate,onChange:e=>me({...ge,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,d.jsx)(L,{children:(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Plan Type"}),(0,d.jsxs)(J,{value:ge.planType,onChange:e=>me({...ge,planType:e.target.value}),children:[(0,d.jsx)("option",{value:"Basic Plan",children:"Basic Plan"}),(0,d.jsx)("option",{value:"Professional Plan",children:"Professional Plan"}),(0,d.jsx)("option",{value:"Enterprise Plan",children:"Enterprise Plan"})]})]})}),(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Description"}),(0,d.jsx)(W,{value:ge.description,onChange:e=>me({...ge,description:e.target.value}),placeholder:"Enter invoice description (optional)",rows:3})]}),ge.amount&&(0,d.jsxs)(Y,{children:[(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Subtotal:"}),(0,d.jsxs)("span",{children:["RM ",parseFloat(ge.amount||"0").toFixed(2)]})]}),(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Tax (6%):"}),(0,d.jsxs)("span",{children:["RM ",(.06*parseFloat(ge.amount||"0")).toFixed(2)]})]}),(0,d.jsxs)(G,{highlight:!0,children:[(0,d.jsx)("span",{children:(0,d.jsx)("strong",{children:"Total:"})}),(0,d.jsx)("span",{children:(0,d.jsxs)("strong",{children:["RM ",(1.06*parseFloat(ge.amount||"0")).toFixed(2)]})})]})]})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(j,{variant:"secondary",onClick:()=>ne(!1),children:"Cancel"}),(0,d.jsx)(j,{variant:"primary",onClick:()=>{if(!ge.restaurantName||!ge.amount||!ge.dueDate)return void alert("Please fill in all required fields.");const e=`INV-${(new Date).getFullYear()}-M${String(n.length+1).padStart(3,"0")}`,r=parseFloat(ge.amount),a=.06*r,i=r+a,s={id:`invoice-${Date.now()}`,invoiceNumber:e,restaurantId:ge.restaurantId||`rest-${Date.now()}`,restaurantName:ge.restaurantName,restaurantManager:ge.restaurantManager,issueDate:(new Date).toISOString().split("T")[0],dueDate:ge.dueDate,status:"draft",amount:r,tax:a,total:i,items:[{description:ge.description||`${ge.planType} Subscription`,quantity:1,unitPrice:r,total:r}],billingPeriod:(new Date).toISOString().slice(0,7),planType:ge.planType};t([s,...n]),ne(!1),me({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"}),alert("Invoice created successfully!")},disabled:!ge.restaurantName||!ge.amount||!ge.dueDate,children:"Create Invoice"})]})]})}),te&&ce&&(0,d.jsx)(P,{onClick:()=>re(!1),children:(0,d.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(R,{children:[(0,d.jsxs)(M,{children:["Invoice Details - ",ce.invoiceNumber]}),(0,d.jsx)(z,{onClick:()=>re(!1),children:"\xd7"})]}),(0,d.jsxs)($,{children:[(0,d.jsxs)(L,{children:[(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Invoice Number"}),(0,d.jsx)("div",{children:ce.invoiceNumber})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Status"}),(0,d.jsx)(k,{status:ce.status,children:ce.status})]})]}),(0,d.jsxs)(L,{children:[(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Restaurant"}),(0,d.jsx)("div",{children:ce.restaurantName})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Manager"}),(0,d.jsx)("div",{children:ce.restaurantManager})]})]}),(0,d.jsxs)(L,{children:[(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Issue Date"}),(0,d.jsx)("div",{children:ce.issueDate})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Due Date"}),(0,d.jsx)("div",{children:ce.dueDate})]})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Items"}),ce.items.map((e,n)=>(0,d.jsxs)("div",{style:{padding:"8px",background:"#F8FAFC",borderRadius:"4px",marginBottom:"8px"},children:[e.description," - RM ",e.total.toFixed(2)]},n))]}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Subtotal:"}),(0,d.jsxs)("span",{children:["RM ",ce.amount.toFixed(2)]})]}),(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Tax (6%):"}),(0,d.jsxs)("span",{children:["RM ",ce.tax.toFixed(2)]})]}),(0,d.jsxs)(G,{highlight:!0,children:[(0,d.jsx)("span",{children:"Total:"}),(0,d.jsx)("span",{children:(0,d.jsxs)("strong",{children:["RM ",ce.total.toFixed(2)]})})]})]})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(j,{variant:"secondary",onClick:()=>re(!1),children:"Close"}),(0,d.jsx)(j,{variant:"primary",onClick:()=>window.print(),children:"Print Invoice"})]})]})}),le&&ce&&(0,d.jsx)(P,{onClick:()=>{de(!1),setTimeout(()=>{oe(!0)},100)},children:(0,d.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(R,{children:[(0,d.jsx)(M,{children:"Confirm Payment"}),(0,d.jsx)(z,{onClick:()=>{de(!1),setTimeout(()=>{oe(!0)},100)},children:"\xd7"})]}),(0,d.jsx)($,{children:(0,d.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,d.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"8px",margin:0},children:"Confirm Payment"}),(0,d.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"24px",margin:"8px 0 24px 0"},children:"Are you sure you want to process this payment?"}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Invoice:"}),(0,d.jsx)("span",{children:(0,d.jsx)("strong",{children:ce.invoiceNumber})})]}),(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Restaurant:"}),(0,d.jsx)("span",{children:ce.restaurantName})]}),(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Payment Amount:"}),(0,d.jsxs)("span",{style:{color:"#059669",fontWeight:"600"},children:["RM ",ce.total.toFixed(2)]})]}),(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Payment Date:"}),(0,d.jsx)("span",{children:ue.paymentDate})]}),(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Method:"}),(0,d.jsx)("span",{children:"Bank Transfer"})]})]}),(0,d.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px",fontSize:"13px",color:"#0369A1"},children:"Warning: This action will mark the invoice as PAID and cannot be easily undone."})]})}),(0,d.jsxs)(O,{children:[(0,d.jsx)(j,{variant:"secondary",onClick:()=>{de(!1),setTimeout(()=>{oe(!0)},100)},children:"Cancel"}),(0,d.jsx)(j,{variant:"primary",onClick:async()=>{if(ce)try{const e=await fetch(`${o.JR}/api/invoices/${ce.id}/payment`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({payment_method:ue.paymentMethod,transaction_id:ue.transactionId,payment_date:ue.paymentDate,notes:ue.notes,receipt_url:ue.receiptFile?"uploaded_receipt_url":null})});if(!e.ok)throw new Error("API call failed");{await e.json();const r={...ce,status:"paid",paidDate:ue.paymentDate};t(n.map(e=>e.id===ce.id?r:e))}oe(!1),de(!1),xe(null),je({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null})}catch(e){console.error("Payment processing error:",e),alert("Error processing payment. Please try again.")}},children:"Confirm Payment"})]})]})}),se&&ce&&(0,d.jsx)(P,{onClick:()=>oe(!1),children:(0,d.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(R,{children:[(0,d.jsxs)(M,{children:["Record Payment - ",ce.invoiceNumber]}),(0,d.jsx)(z,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,d.jsxs)($,{children:[(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Invoice Details"}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Restaurant:"}),(0,d.jsx)("span",{children:ce.restaurantName})]}),(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Manager:"}),(0,d.jsx)("span",{children:ce.restaurantManager})]}),(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Due Date:"}),(0,d.jsx)("span",{children:we(ce.dueDate)})]}),(0,d.jsxs)(G,{highlight:!0,children:[(0,d.jsx)("span",{children:(0,d.jsx)("strong",{children:"Amount Due:"})}),(0,d.jsx)("span",{children:(0,d.jsx)("strong",{children:(0,l.vv)(ce.total)})})]})]})]}),(0,d.jsxs)(L,{children:[(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Payment Method"}),(0,d.jsx)("div",{style:{padding:"12px 16px",background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",color:"#374151"},children:"Bank Transfer"})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Payment Date *"}),(0,d.jsx)(U,{type:"date",value:ue.paymentDate,onChange:e=>je({...ue,paymentDate:e.target.value}),required:!0,max:(new Date).toISOString().split("T")[0]})]})]}),(0,d.jsxs)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",margin:"16px 0"},children:[(0,d.jsx)("p",{style:{margin:"0 0 8px 0",color:"#0369A1",fontSize:"14px",fontWeight:"600"},children:"Bank Transfer Payment Verification"}),(0,d.jsxs)("p",{style:{margin:0,color:"#0369A1",fontSize:"13px"},children:["Please provide at least ONE of the following as proof of your bank transfer:",(0,d.jsx)("br",{}),"\u2022 Transaction ID/Reference Number from your bank",(0,d.jsx)("br",{}),"\u2022 Screenshot/Photo of the transfer receipt"]})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Transaction ID / Reference Number *"}),(0,d.jsx)(U,{type:"text",value:ue.transactionId,onChange:e=>je({...ue,transactionId:e.target.value}),placeholder:"Enter transaction ID or reference number"}),(0,d.jsx)(V,{children:"Required if no receipt is uploaded"})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Upload Receipt (Optional) *"}),(0,d.jsx)(U,{type:"file",accept:"image/*,.pdf",onChange:e=>{var n;const t=(null===(n=e.target.files)||void 0===n?void 0:n[0])||null;je({...ue,receiptFile:t})}}),(0,d.jsx)(V,{children:"Upload bank transfer receipt if no transaction ID is provided"}),ue.receiptFile&&(0,d.jsxs)("div",{style:{marginTop:"8px",padding:"8px",background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"4px",fontSize:"14px",color:"#0369A1"},children:["File selected: ",ue.receiptFile.name]})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Payment Notes"}),(0,d.jsx)(W,{value:ue.notes,onChange:e=>je({...ue,notes:e.target.value}),placeholder:"Add any additional notes about this payment",rows:3})]})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(j,{variant:"secondary",onClick:()=>oe(!1),children:"Cancel"}),(0,d.jsx)(j,{variant:"primary",onClick:()=>{ce&&(ue.transactionId||ue.receiptFile?(oe(!1),setTimeout(()=>{de(!0)},100)):alert("Please provide either a Transaction ID/Reference Number OR upload a payment receipt."))},disabled:!ue.transactionId&&!ue.receiptFile,children:"Record Payment"})]})]})}),ae&&ce&&pe&&(0,d.jsx)(P,{onClick:()=>ie(!1),children:(0,d.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,d.jsxs)(R,{children:[(0,d.jsxs)(M,{children:["Edit Invoice - ",ce.invoiceNumber]}),(0,d.jsx)(z,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,d.jsxs)($,{children:[(0,d.jsxs)(L,{children:[(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Amount (RM)"}),(0,d.jsx)(U,{type:"number",value:pe.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,r=n+t;he({...pe,amount:e.target.value,tax:t.toFixed(2),total:r.toFixed(2)})}})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Due Date"}),(0,d.jsx)(U,{type:"date",value:pe.dueDate,onChange:e=>he({...pe,dueDate:e.target.value})})]})]}),(0,d.jsxs)(_,{children:[(0,d.jsx)(q,{children:"Status"}),(0,d.jsxs)(J,{value:pe.status,onChange:e=>he({...pe,status:e.target.value}),children:[(0,d.jsx)("option",{value:"draft",children:"Draft"}),(0,d.jsx)("option",{value:"sent",children:"Sent"}),(0,d.jsx)("option",{value:"paid",children:"Paid"}),(0,d.jsx)("option",{value:"overdue",children:"Overdue"}),(0,d.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,d.jsxs)(Y,{children:[(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Subtotal:"}),(0,d.jsxs)("span",{children:["RM ",parseFloat(pe.amount||0).toFixed(2)]})]}),(0,d.jsxs)(G,{children:[(0,d.jsx)("span",{children:"Tax (6%):"}),(0,d.jsxs)("span",{children:["RM ",parseFloat(pe.tax||0).toFixed(2)]})]}),(0,d.jsxs)(G,{highlight:!0,children:[(0,d.jsx)("span",{children:"Total:"}),(0,d.jsx)("span",{children:(0,d.jsxs)("strong",{children:["RM ",parseFloat(pe.total||0).toFixed(2)]})})]})]})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(j,{variant:"secondary",onClick:()=>ie(!1),children:"Cancel"}),(0,d.jsx)(j,{variant:"primary",onClick:()=>{if(!ce||!pe)return;const e={...ce,amount:parseFloat(pe.amount),tax:parseFloat(pe.tax),total:parseFloat(pe.total),dueDate:pe.dueDate,status:pe.status,items:pe.items};t(n.map(n=>n.id===ce.id?e:n)),ie(!1),xe(null),he(null),alert("Invoice updated successfully!")},children:"Save Changes"})]})]})})]})]})})}}}]);