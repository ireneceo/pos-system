"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4107],{4021:(e,n,t)=>{t.d(n,{i1:()=>i});var a=t(9950),r=t(1367),s=t(6038);const i=()=>{const{user:e}=(0,r.As)(),[n,t]=(0,a.useState)("RM"),[i,l]=(0,a.useState)(Object.keys(s.DL)),[o,d]=(0,a.useState)(!0),[c,u]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),a=n.indexOf("restaurant");let r=a>=0?n[a+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var s;const e=await n.json(),a=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";t(a)}else t("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),u("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:i,loading:o,error:c}}},4107:(e,n,t)=>{t.r(n),t.d(n,{default:()=>P});var a=t(8819),r=t(9950),s=t(4752),i=t(1367),l=t(6910),o=t(6038),d=t(4021),c=t(2674),u=t(4414);const x=s.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,h=s.Ay.div`
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
`,p=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=s.Ay.div`
  display: flex;
  gap: 12px;
`,m=s.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":`\n    background: white;\n    color: #6B7280;\n    border: 1px solid ${a.w.colors.border};\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  `}
`,v=s.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=s.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,f=s.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: ${a.w.colors.secondary};
  margin-bottom: 4px;
`,b=s.Ay.div`
  font-size: 13px;
  color: ${a.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,w=s.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,D=s.Ay.input`
  flex: 1;
  min-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${a.w.colors.border};
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
    box-shadow: 0 0 0 3px ${a.w.colors.primaryLight};
  }
`,C=s.Ay.select`
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
`,F=s.Ay.div``,k=s.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=s.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,S=s.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"paid":return"#ECFDF5";case"sent":return"#DBEAFE";case"draft":default:return"#F3F4F6";case"overdue":return"#FEE2E2";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"paid":return"#059669";case"sent":return"#1E40AF";case"draft":default:return"#6B7280";case"overdue":case"cancelled":return"#DC2626"}}};
`,E=s.Ay.button`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?`\n    background: ${a.w.colors.primary};\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  `:"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":`\n    background: transparent;\n    color: ${a.w.colors.text.muted};\n    border-color: ${a.w.colors.border};\n    \n    &:hover {\n      background: ${a.w.colors.surfaceHover};\n      color: #0A2540;\n    }\n  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    pointer-events: none;
  }
`,I=(0,s.Ay)(c.AA)`
  max-width: 160px;

  @media (max-width: 1024px) {
    max-width: none;
  }
`,R=s.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,T=s.Ay.div`
  background: #F8FAFC;
  border: 1px solid ${a.w.colors.border};
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,N=s.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  
  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,P=()=>{const{user:e}=(0,i.As)(),[n,t]=(0,r.useState)([]),[a,s]=(0,r.useState)(""),[P,$]=(0,r.useState)("all"),[B,M]=(0,r.useState)("all"),[z,O]=(0,r.useState)(!1),{defaultCurrency:L}=(0,d.i1)(),[Q,_]=(0,r.useState)("RM");(0,r.useEffect)(()=>{L&&_(L)},[L]);const[U,J]=(0,r.useState)(!1),[Z,q]=(0,r.useState)(!1),[W,H]=(0,r.useState)(!1),[V,Y]=(0,r.useState)(!1),[X,G]=(0,r.useState)(null),[K,ee]=(0,r.useState)(null),[ne,te]=(0,r.useState)({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),[ae,re]=(0,r.useState)({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"});(0,r.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",a=await fetch(`${l.JR}/api/invoices/manager/${n}`);if(a.ok){const e=await a.json();t(e)}else console.error("Failed to fetch invoices from API"),t([])}catch(n){console.error("Failed to fetch invoices:",n),t([])}})()},[e]);const se=n.filter(e=>{var n;const t=e.restaurantName.toLowerCase().includes(a.toLowerCase())||e.invoiceNumber.toLowerCase().includes(a.toLowerCase())||(null===(n=e.restaurantManager)||void 0===n?void 0:n.toLowerCase().includes(a.toLowerCase()||"")),r="all"===P||e.status===P,s="all"===B||e.issueDate.includes(B);return t&&r&&s}),ie=n.length,le=n.filter(e=>"paid"===e.status).length,oe=n.filter(e=>"overdue"===e.status).length,de=n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),ce=e=>new Date(e).toLocaleDateString("en-MY"),ue=e=>{G(e),te({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),H(!0)};return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(x,{children:[(0,u.jsxs)(h,{children:[(0,u.jsx)(j,{children:"Restaurant Invoice Management"}),(0,u.jsxs)(g,{children:[(0,u.jsx)(m,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalInvoices:n.length,summary:{totalAmount:n.reduce((e,n)=>e+n.total,0),paidInvoices:n.filter(e=>"paid"===e.status).length,overdueInvoices:n.filter(e=>"overdue"===e.status).length,draftInvoices:n.filter(e=>"draft"===e.status).length,paidAmount:n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),outstandingAmount:n.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0)},statusBreakdown:{draft:n.filter(e=>"draft"===e.status).length,sent:n.filter(e=>"sent"===e.status).length,paid:n.filter(e=>"paid"===e.status).length,overdue:n.filter(e=>"overdue"===e.status).length,cancelled:n.filter(e=>"cancelled"===e.status).length},invoices:n.map(e=>({invoiceNumber:e.invoiceNumber,restaurantName:e.restaurantName,restaurantManager:e.restaurantManager,issueDate:e.issueDate,dueDate:e.dueDate,paidDate:e.paidDate||"N/A",status:e.status,amount:e.amount,tax:e.tax,total:e.total,billingPeriod:e.billingPeriod,planType:e.planType}))},t=JSON.stringify(e,null,2),a=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(a),s=document.createElement("a");s.href=r,s.download=`restaurant-invoices-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(r)},children:"Export"}),(0,u.jsx)(m,{variant:"primary",onClick:()=>{O(!0)},children:"Create Invoice"})]})]}),(0,u.jsxs)(p,{children:[(0,u.jsxs)(v,{children:[(0,u.jsxs)(y,{color:"#059669",children:[(0,u.jsx)(f,{children:ie}),(0,u.jsx)(b,{children:"Total Invoices"})]}),(0,u.jsxs)(y,{color:"#2563EB",children:[(0,u.jsx)(f,{children:le}),(0,u.jsx)(b,{children:"Paid Invoices"})]}),(0,u.jsxs)(y,{color:"#DC2626",children:[(0,u.jsx)(f,{children:oe}),(0,u.jsx)(b,{children:"Overdue Invoices"})]}),(0,u.jsxs)(y,{color:"#7C3AED",children:[(0,u.jsx)(f,{children:(0,o.vv)(de)}),(0,u.jsx)(b,{children:"Total Revenue"})]})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(D,{type:"text",placeholder:"Search by invoice number, restaurant, or plan type...",value:a,onChange:e=>s(e.target.value)}),(0,u.jsxs)(C,{value:P,onChange:e=>$(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Status"}),(0,u.jsx)("option",{value:"draft",children:"Draft"}),(0,u.jsx)("option",{value:"sent",children:"Sent"}),(0,u.jsx)("option",{value:"paid",children:"Paid"}),(0,u.jsx)("option",{value:"overdue",children:"Overdue"}),(0,u.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,u.jsxs)(C,{value:B,onChange:e=>M(e.target.value),children:[(0,u.jsx)("option",{value:"all",children:"All Months"}),(0,u.jsx)("option",{value:"2025-01",children:"January 2025"}),(0,u.jsx)("option",{value:"2024-12",children:"December 2024"}),(0,u.jsx)("option",{value:"2024-11",children:"November 2024"})]})]}),(0,u.jsx)(c.an,{children:0===se.length?(0,u.jsxs)(c.ys,{children:[(0,u.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No invoices found"}),(0,u.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or create a new invoice"})]}):(0,u.jsxs)(c.bQ,{children:[(0,u.jsx)(c.B_,{children:(0,u.jsxs)("tr",{children:[(0,u.jsx)(c.gU,{children:"Invoice"}),(0,u.jsx)(c.gU,{children:"Restaurant"}),(0,u.jsx)(c.gU,{children:"Issue Date"}),(0,u.jsx)(c.gU,{children:"Due Date"}),(0,u.jsx)(c.gU,{children:"Status"}),(0,u.jsx)(c.gU,{align:"right",children:"Amount"}),(0,u.jsx)(c.gU,{align:"right",children:"Total"}),(0,u.jsx)(c.gU,{children:"Actions"})]})}),(0,u.jsx)("tbody",{children:se.map(e=>(0,u.jsxs)(c.J2,{children:[(0,u.jsx)(c.Bv,{"data-label":"Invoice",children:(0,u.jsxs)(F,{children:[(0,u.jsx)(k,{children:e.invoiceNumber}),(0,u.jsx)(A,{children:e.planType})]})}),(0,u.jsx)(c.Bv,{"data-label":"Restaurant",children:(0,u.jsxs)(F,{children:[(0,u.jsx)(k,{children:e.restaurantName}),(0,u.jsx)(A,{children:e.restaurantManager})]})}),(0,u.jsx)(c.Bv,{"data-label":"Issue Date",align:"center",children:ce(e.issueDate)}),(0,u.jsx)(c.Bv,{"data-label":"Due Date",align:"center",children:ce(e.dueDate)}),(0,u.jsx)(c.Bv,{"data-label":"Status",align:"center",children:(0,u.jsx)(S,{status:e.status,children:e.status})}),(0,u.jsx)(c.Bv,{"data-label":"Amount",align:"right",children:(0,u.jsx)(c.DM,{children:(0,o.vv)(e.amount)})}),(0,u.jsx)(c.Bv,{"data-label":"Total",align:"right",children:(0,u.jsx)(c.DM,{highlight:!0,children:0===e.total?(0,u.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,o.vv)(e.total)})}),(0,u.jsx)(c.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,u.jsxs)(I,{children:[(0,u.jsx)(E,{variant:"primary",onClick:()=>(e=>{G(e),J(!0)})(e),children:"View"}),"draft"===e.status&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(E,{onClick:()=>(e=>{G(e),ee({amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,items:e.items}),q(!0)})(e),children:"Edit"}),(0,u.jsx)(E,{onClick:()=>(e=>{window.confirm(`Send invoice ${e.invoiceNumber} to ${e.restaurantName}?`)&&(t(n.map(n=>n.id===e.id?{...n,status:"sent"}:n)),alert(`Invoice ${e.invoiceNumber} has been sent to ${e.restaurantName}`))})(e),children:"Send"})]}),"sent"===e.status&&(0,u.jsxs)(u.Fragment,{children:[e.total>0&&(0,u.jsx)(E,{variant:"primary",onClick:()=>ue(e),children:"Pay Now"}),(0,u.jsx)(E,{onClick:()=>(e=>{window.confirm(`Mark invoice ${e.invoiceNumber} as overdue?`)&&(t(n.map(n=>n.id===e.id?{...n,status:"overdue"}:n)),alert(`Invoice ${e.invoiceNumber} marked as overdue`))})(e),children:"Mark Overdue"})]}),"overdue"===e.status&&e.total>0&&(0,u.jsx)(E,{variant:"primary",onClick:()=>ue(e),children:"Pay Now"}),"paid"===e.status&&(0,u.jsx)(E,{onClick:()=>window.print(),children:"Print Receipt"})]})})]},e.id))})]})}),z&&(0,u.jsx)(c.mH,{onClick:()=>O(!1),children:(0,u.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(c.rQ,{children:[(0,u.jsx)(c.wt,{children:"Create New Invoice"}),(0,u.jsx)(c.Jn,{onClick:()=>O(!1),children:"\xd7"})]}),(0,u.jsxs)(c.cw,{children:[(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Restaurant Name *"}),(0,u.jsx)(c.ZQ,{type:"text",value:ae.restaurantName,onChange:e=>re({...ae,restaurantName:e.target.value}),placeholder:"Enter restaurant name",required:!0})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Restaurant Manager"}),(0,u.jsx)(c.ZQ,{type:"text",value:ae.restaurantManager,onChange:e=>re({...ae,restaurantManager:e.target.value}),placeholder:"Enter manager name"})]})]}),(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Amount (RM) *"}),(0,u.jsx)(c.ZQ,{type:"number",step:"0.01",min:"0",value:ae.amount,onChange:e=>re({...ae,amount:e.target.value}),placeholder:"0.00",required:!0}),(0,u.jsx)(R,{children:"Tax (6%) will be calculated automatically"})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Due Date *"}),(0,u.jsx)(c.ZQ,{type:"date",value:ae.dueDate,onChange:e=>re({...ae,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,u.jsx)(c.fh,{children:(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Plan Type"}),(0,u.jsxs)(c.FX,{value:ae.planType,onChange:e=>re({...ae,planType:e.target.value}),children:[(0,u.jsx)("option",{value:"Basic Plan",children:"Basic Plan"}),(0,u.jsx)("option",{value:"Professional Plan",children:"Professional Plan"}),(0,u.jsx)("option",{value:"Enterprise Plan",children:"Enterprise Plan"})]})]})}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Description"}),(0,u.jsx)(c.Lz,{value:ae.description,onChange:e=>re({...ae,description:e.target.value}),placeholder:"Enter invoice description (optional)",rows:3})]}),ae.amount&&(0,u.jsxs)(T,{children:[(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Subtotal:"}),(0,u.jsx)("span",{children:(0,o.vv)(parseFloat(ae.amount||"0"),Q)})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Tax (6%):"}),(0,u.jsx)("span",{children:(0,o.vv)(.06*parseFloat(ae.amount||"0"),Q)})]}),(0,u.jsxs)(N,{highlight:!0,children:[(0,u.jsx)("span",{children:(0,u.jsx)("strong",{children:"Total:"})}),(0,u.jsx)("span",{children:(0,u.jsx)("strong",{children:(0,o.vv)(1.06*parseFloat(ae.amount||"0"),Q)})})]})]})]}),(0,u.jsxs)(c.jl,{children:[(0,u.jsx)(m,{variant:"secondary",onClick:()=>O(!1),children:"Cancel"}),(0,u.jsx)(m,{variant:"primary",onClick:()=>{if(!ae.restaurantName||!ae.amount||!ae.dueDate)return void alert("Please fill in all required fields.");const e=`INV-${(new Date).getFullYear()}-M${String(n.length+1).padStart(3,"0")}`,a=parseFloat(ae.amount),r=.06*a,s=a+r,i={id:`invoice-${Date.now()}`,invoiceNumber:e,restaurantId:ae.restaurantId||`rest-${Date.now()}`,restaurantName:ae.restaurantName,restaurantManager:ae.restaurantManager,issueDate:(new Date).toISOString().split("T")[0],dueDate:ae.dueDate,status:"draft",amount:a,tax:r,total:s,items:[{description:ae.description||`${ae.planType} Subscription`,quantity:1,unitPrice:a,total:a}],billingPeriod:(new Date).toISOString().slice(0,7),planType:ae.planType};t([i,...n]),O(!1),re({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"}),alert("Invoice created successfully!")},disabled:!ae.restaurantName||!ae.amount||!ae.dueDate,children:"Create Invoice"})]})]})}),U&&X&&(0,u.jsx)(c.mH,{onClick:()=>J(!1),children:(0,u.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(c.rQ,{children:[(0,u.jsxs)(c.wt,{children:["Invoice Details - ",X.invoiceNumber]}),(0,u.jsx)(c.Jn,{onClick:()=>J(!1),children:"\xd7"})]}),(0,u.jsxs)(c.cw,{children:[(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Invoice Number"}),(0,u.jsx)("div",{children:X.invoiceNumber})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Status"}),(0,u.jsx)(S,{status:X.status,children:X.status})]})]}),(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Restaurant"}),(0,u.jsx)("div",{children:X.restaurantName})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Manager"}),(0,u.jsx)("div",{children:X.restaurantManager})]})]}),(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Issue Date"}),(0,u.jsx)("div",{children:X.issueDate})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Due Date"}),(0,u.jsx)("div",{children:X.dueDate})]})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Items"}),X.items.map((e,n)=>(0,u.jsxs)("div",{style:{padding:"8px",background:"#F8FAFC",borderRadius:"4px",marginBottom:"8px"},children:[e.description," - ",(0,o.vv)(e.total,Q)]},n))]}),(0,u.jsxs)(T,{children:[(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Subtotal:"}),(0,u.jsx)("span",{children:(0,o.vv)(X.subtotalBeforeDiscount||X.amount,Q)})]}),X.discountAmount&&X.discountAmount>0&&(0,u.jsxs)(N,{children:[(0,u.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===X.discountType?` (${X.discountValue}%)`:"",":"]}),(0,u.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(X.discountAmount,Q)]})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Tax (6%):"}),(0,u.jsx)("span",{children:(0,o.vv)(X.tax,Q)})]}),(0,u.jsxs)(N,{highlight:!0,children:[(0,u.jsx)("span",{children:"Total:"}),(0,u.jsx)("span",{children:(0,u.jsx)("strong",{children:(0,o.vv)(X.total,Q)})})]})]})]}),(0,u.jsxs)(c.jl,{children:[(0,u.jsx)(m,{variant:"secondary",onClick:()=>J(!1),children:"Close"}),(0,u.jsx)(m,{variant:"primary",onClick:()=>window.print(),children:"Print Invoice"})]})]})}),V&&X&&(0,u.jsx)(c.mH,{onClick:()=>{Y(!1),setTimeout(()=>{H(!0)},100)},children:(0,u.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(c.rQ,{children:[(0,u.jsx)(c.wt,{children:"Confirm Payment"}),(0,u.jsx)(c.Jn,{onClick:()=>{Y(!1),setTimeout(()=>{H(!0)},100)},children:"\xd7"})]}),(0,u.jsx)(c.cw,{children:(0,u.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,u.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"8px",margin:0},children:"Confirm Payment"}),(0,u.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"24px",margin:"8px 0 24px 0"},children:"Are you sure you want to process this payment?"}),(0,u.jsxs)(T,{children:[(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Invoice:"}),(0,u.jsx)("span",{children:(0,u.jsx)("strong",{children:X.invoiceNumber})})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Restaurant:"}),(0,u.jsx)("span",{children:X.restaurantName})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Payment Amount:"}),(0,u.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,o.vv)(X.total,Q)})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Payment Date:"}),(0,u.jsx)("span",{children:ne.paymentDate})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Method:"}),(0,u.jsx)("span",{children:"Bank Transfer"})]})]}),(0,u.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px",fontSize:"13px",color:"#0369A1"},children:"Warning: This action will mark the invoice as PAID and cannot be easily undone."})]})}),(0,u.jsxs)(c.jl,{children:[(0,u.jsx)(m,{variant:"secondary",onClick:()=>{Y(!1),setTimeout(()=>{H(!0)},100)},children:"Cancel"}),(0,u.jsx)(m,{variant:"primary",onClick:async()=>{if(X)try{const e=await fetch(`${l.JR}/api/invoices/${X.id}/payment`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({payment_method:ne.paymentMethod,transaction_id:ne.transactionId,payment_date:ne.paymentDate,notes:ne.notes,receipt_url:ne.receiptFile?"uploaded_receipt_url":null})});if(!e.ok)throw new Error("API call failed");{await e.json();const a={...X,status:"paid",paidDate:ne.paymentDate};t(n.map(e=>e.id===X.id?a:e))}H(!1),Y(!1),G(null),te({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null})}catch(e){console.error("Payment processing error:",e),alert("Error processing payment. Please try again.")}},children:"Confirm Payment"})]})]})}),W&&X&&(0,u.jsx)(c.mH,{onClick:()=>H(!1),children:(0,u.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(c.rQ,{children:[(0,u.jsxs)(c.wt,{children:["Record Payment - ",X.invoiceNumber]}),(0,u.jsx)(c.Jn,{onClick:()=>H(!1),children:"\xd7"})]}),(0,u.jsxs)(c.cw,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Invoice Details"}),(0,u.jsxs)(T,{children:[(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Restaurant:"}),(0,u.jsx)("span",{children:X.restaurantName})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Manager:"}),(0,u.jsx)("span",{children:X.restaurantManager})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Due Date:"}),(0,u.jsx)("span",{children:ce(X.dueDate)})]}),(0,u.jsxs)(N,{highlight:!0,children:[(0,u.jsx)("span",{children:(0,u.jsx)("strong",{children:"Amount Due:"})}),(0,u.jsx)("span",{children:(0,u.jsx)("strong",{children:(0,o.vv)(X.total)})})]})]})]}),(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Payment Method"}),(0,u.jsx)("div",{style:{padding:"12px 16px",background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",color:"#374151"},children:"Bank Transfer"})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Payment Date *"}),(0,u.jsx)(c.ZQ,{type:"date",value:ne.paymentDate,onChange:e=>te({...ne,paymentDate:e.target.value}),required:!0,max:(new Date).toISOString().split("T")[0]})]})]}),(0,u.jsxs)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",margin:"16px 0"},children:[(0,u.jsx)("p",{style:{margin:"0 0 8px 0",color:"#0369A1",fontSize:"14px",fontWeight:"600"},children:"Bank Transfer Payment Verification"}),(0,u.jsxs)("p",{style:{margin:0,color:"#0369A1",fontSize:"13px"},children:["Please provide at least ONE of the following as proof of your bank transfer:",(0,u.jsx)("br",{}),"\u2022 Transaction ID/Reference Number from your bank",(0,u.jsx)("br",{}),"\u2022 Screenshot/Photo of the transfer receipt"]})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Transaction ID / Reference Number *"}),(0,u.jsx)(c.ZQ,{type:"text",value:ne.transactionId,onChange:e=>te({...ne,transactionId:e.target.value}),placeholder:"Enter transaction ID or reference number"}),(0,u.jsx)(R,{children:"Required if no receipt is uploaded"})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Upload Receipt (Optional) *"}),(0,u.jsx)(c.ZQ,{type:"file",accept:"image/*,.pdf",onChange:e=>{var n;const t=(null===(n=e.target.files)||void 0===n?void 0:n[0])||null;te({...ne,receiptFile:t})}}),(0,u.jsx)(R,{children:"Upload bank transfer receipt if no transaction ID is provided"}),ne.receiptFile&&(0,u.jsxs)("div",{style:{marginTop:"8px",padding:"8px",background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"4px",fontSize:"14px",color:"#0369A1"},children:["File selected: ",ne.receiptFile.name]})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Payment Notes"}),(0,u.jsx)(c.Lz,{value:ne.notes,onChange:e=>te({...ne,notes:e.target.value}),placeholder:"Add any additional notes about this payment",rows:3})]})]}),(0,u.jsxs)(c.jl,{children:[(0,u.jsx)(m,{variant:"secondary",onClick:()=>H(!1),children:"Cancel"}),(0,u.jsx)(m,{variant:"primary",onClick:()=>{X&&(ne.transactionId||ne.receiptFile?(H(!1),setTimeout(()=>{Y(!0)},100)):alert("Please provide either a Transaction ID/Reference Number OR upload a payment receipt."))},disabled:!ne.transactionId&&!ne.receiptFile,children:"Record Payment"})]})]})}),Z&&X&&K&&(0,u.jsx)(c.mH,{onClick:()=>q(!1),children:(0,u.jsxs)(c.$m,{onClick:e=>e.stopPropagation(),children:[(0,u.jsxs)(c.rQ,{children:[(0,u.jsxs)(c.wt,{children:["Edit Invoice - ",X.invoiceNumber]}),(0,u.jsx)(c.Jn,{onClick:()=>q(!1),children:"\xd7"})]}),(0,u.jsxs)(c.cw,{children:[(0,u.jsxs)(c.fh,{children:[(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Amount (RM)"}),(0,u.jsx)(c.ZQ,{type:"number",value:K.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,a=n+t;ee({...K,amount:e.target.value,tax:t.toFixed(2),total:a.toFixed(2)})}})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Due Date"}),(0,u.jsx)(c.ZQ,{type:"date",value:K.dueDate,onChange:e=>ee({...K,dueDate:e.target.value})})]})]}),(0,u.jsxs)(c.gE,{children:[(0,u.jsx)(c.lR,{children:"Status"}),(0,u.jsxs)(c.FX,{value:K.status,onChange:e=>ee({...K,status:e.target.value}),children:[(0,u.jsx)("option",{value:"draft",children:"Draft"}),(0,u.jsx)("option",{value:"sent",children:"Sent"}),(0,u.jsx)("option",{value:"paid",children:"Paid"}),(0,u.jsx)("option",{value:"overdue",children:"Overdue"}),(0,u.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,u.jsxs)(T,{children:[(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Subtotal:"}),(0,u.jsx)("span",{children:(0,o.vv)(parseFloat(K.amount||0),Q)})]}),X&&X.discountAmount&&X.discountAmount>0&&(0,u.jsxs)(N,{children:[(0,u.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===X.discountType?` (${X.discountValue}%)`:"",":"]}),(0,u.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(X.discountAmount,Q)]})]}),(0,u.jsxs)(N,{children:[(0,u.jsx)("span",{children:"Tax (6%):"}),(0,u.jsx)("span",{children:(0,o.vv)(parseFloat(K.tax||0),Q)})]}),(0,u.jsxs)(N,{highlight:!0,children:[(0,u.jsx)("span",{children:"Total:"}),(0,u.jsx)("span",{children:(0,u.jsx)("strong",{children:(0,o.vv)(parseFloat(K.total||0),Q)})})]})]})]}),(0,u.jsxs)(c.jl,{children:[(0,u.jsx)(m,{variant:"secondary",onClick:()=>q(!1),children:"Cancel"}),(0,u.jsx)(m,{variant:"primary",onClick:()=>{if(!X||!K)return;const e={...X,amount:parseFloat(K.amount),tax:parseFloat(K.tax),total:parseFloat(K.total),dueDate:K.dueDate,status:K.status,items:K.items};t(n.map(n=>n.id===X.id?e:n)),q(!1),G(null),ee(null),alert("Invoice updated successfully!")},disabled:!(null!==K&&void 0!==K&&K.amount)||!(null!==K&&void 0!==K&&K.dueDate),children:"Save Changes"})]})]})})]})]})})}}}]);