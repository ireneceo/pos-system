"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4107],{4021:(e,n,t)=>{t.d(n,{i1:()=>s});var a=t(9950),r=t(1367),i=t(6038);const s=()=>{const{user:e}=(0,r.As)(),[n,t]=(0,a.useState)("RM"),[s,o]=(0,a.useState)(Object.keys(i.DL)),[l,d]=(0,a.useState)(!0),[c,x]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),a=n.indexOf("restaurant");let r=a>=0?n[a+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),a=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";t(a)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),x("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:l,error:c}}},4107:(e,n,t)=>{t.r(n),t.d(n,{default:()=>V});var a=t(9950),r=t(4752),i=t(1367),s=t(6910),o=t(6038),l=t(4021),d=t(7960),c=t(4414);const x=r.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,p=r.Ay.div`
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
`,u=r.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=r.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,j=r.Ay.div`
  display: flex;
  gap: 12px;
`,g=r.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,m=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,v=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,b=r.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,y=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=r.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,F=r.Ay.input`
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
`,w=r.Ay.select`
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
`,A=r.Ay.div``,C=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,D=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,k=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"paid":return"#ECFDF5";case"sent":return"#DBEAFE";case"draft":default:return"#F3F4F6";case"overdue":return"#FEE2E2";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"paid":return"#059669";case"sent":return"#1E40AF";case"draft":default:return"#6B7280";case"overdue":case"cancelled":return"#DC2626"}}};
`,S=r.Ay.button`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,E=(0,r.Ay)(d.AA)`
  max-width: 160px;

  @media (max-width: 1024px) {
    max-width: none;
  }
`,I=r.Ay.div`
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
`,B=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
`,T=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,N=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,P=r.Ay.button`
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
`,M=r.Ay.div`
  padding: 0 24px 24px 24px;
  max-height: 400px;
  overflow-y: auto;
`,R=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
`,z=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,$=r.Ay.div`
  margin-bottom: 20px;
`,O=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,_=r.Ay.input`
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
`,U=r.Ay.select`
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
`,L=r.Ay.textarea`
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
`,q=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,W=r.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,J=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  
  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,V=()=>{const{user:e}=(0,i.As)(),[n,t]=(0,a.useState)([]),[r,V]=(0,a.useState)(""),[Y,Q]=(0,a.useState)("all"),[G,H]=(0,a.useState)("all"),[K,X]=(0,a.useState)(!1),{defaultCurrency:Z}=(0,l.i1)(),[ee,ne]=(0,a.useState)("RM");(0,a.useEffect)(()=>{Z&&ne(Z)},[Z]);const[te,ae]=(0,a.useState)(!1),[re,ie]=(0,a.useState)(!1),[se,oe]=(0,a.useState)(!1),[le,de]=(0,a.useState)(!1),[ce,xe]=(0,a.useState)(null),[pe,ue]=(0,a.useState)(null),[he,je]=(0,a.useState)({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),[ge,me]=(0,a.useState)({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"});(0,a.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",a=await fetch(`${s.JR}/api/invoices/manager/${n}`);if(a.ok){const e=await a.json();t(e)}else console.error("Failed to fetch invoices from API"),t([])}catch(n){console.error("Failed to fetch invoices:",n),t([])}})()},[e]);const ve=n.filter(e=>{var n;const t=e.restaurantName.toLowerCase().includes(r.toLowerCase())||e.invoiceNumber.toLowerCase().includes(r.toLowerCase())||(null===(n=e.restaurantManager)||void 0===n?void 0:n.toLowerCase().includes(r.toLowerCase()||"")),a="all"===Y||e.status===Y,i="all"===G||e.issueDate.includes(G);return t&&a&&i}),be=n.length,ye=n.filter(e=>"paid"===e.status).length,fe=n.filter(e=>"overdue"===e.status).length,Fe=n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),we=e=>new Date(e).toLocaleDateString("en-MY"),Ae=e=>{xe(e),je({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),oe(!0)};return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(x,{children:[(0,c.jsxs)(p,{children:[(0,c.jsx)(h,{children:"Restaurant Invoice Management"}),(0,c.jsxs)(j,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalInvoices:n.length,summary:{totalAmount:n.reduce((e,n)=>e+n.total,0),paidInvoices:n.filter(e=>"paid"===e.status).length,overdueInvoices:n.filter(e=>"overdue"===e.status).length,draftInvoices:n.filter(e=>"draft"===e.status).length,paidAmount:n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),outstandingAmount:n.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0)},statusBreakdown:{draft:n.filter(e=>"draft"===e.status).length,sent:n.filter(e=>"sent"===e.status).length,paid:n.filter(e=>"paid"===e.status).length,overdue:n.filter(e=>"overdue"===e.status).length,cancelled:n.filter(e=>"cancelled"===e.status).length},invoices:n.map(e=>({invoiceNumber:e.invoiceNumber,restaurantName:e.restaurantName,restaurantManager:e.restaurantManager,issueDate:e.issueDate,dueDate:e.dueDate,paidDate:e.paidDate||"N/A",status:e.status,amount:e.amount,tax:e.tax,total:e.total,billingPeriod:e.billingPeriod,planType:e.planType}))},t=JSON.stringify(e,null,2),a=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(a),i=document.createElement("a");i.href=r,i.download=`restaurant-invoices-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)},children:"Export"}),(0,c.jsx)(g,{variant:"primary",onClick:()=>{X(!0)},children:"Create Invoice"})]})]}),(0,c.jsxs)(u,{children:[(0,c.jsxs)(m,{children:[(0,c.jsxs)(v,{color:"#059669",children:[(0,c.jsx)(b,{children:be}),(0,c.jsx)(y,{children:"Total Invoices"})]}),(0,c.jsxs)(v,{color:"#2563EB",children:[(0,c.jsx)(b,{children:ye}),(0,c.jsx)(y,{children:"Paid Invoices"})]}),(0,c.jsxs)(v,{color:"#DC2626",children:[(0,c.jsx)(b,{children:fe}),(0,c.jsx)(y,{children:"Overdue Invoices"})]}),(0,c.jsxs)(v,{color:"#7C3AED",children:[(0,c.jsx)(b,{children:(0,o.vv)(Fe)}),(0,c.jsx)(y,{children:"Total Revenue"})]})]}),(0,c.jsxs)(f,{children:[(0,c.jsx)(F,{type:"text",placeholder:"Search by invoice number, restaurant, or plan type...",value:r,onChange:e=>V(e.target.value)}),(0,c.jsxs)(w,{value:Y,onChange:e=>Q(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"draft",children:"Draft"}),(0,c.jsx)("option",{value:"sent",children:"Sent"}),(0,c.jsx)("option",{value:"paid",children:"Paid"}),(0,c.jsx)("option",{value:"overdue",children:"Overdue"}),(0,c.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,c.jsxs)(w,{value:G,onChange:e=>H(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Months"}),(0,c.jsx)("option",{value:"2025-01",children:"January 2025"}),(0,c.jsx)("option",{value:"2024-12",children:"December 2024"}),(0,c.jsx)("option",{value:"2024-11",children:"November 2024"})]})]}),(0,c.jsx)(d.an,{children:0===ve.length?(0,c.jsxs)(d.ys,{children:[(0,c.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No invoices found"}),(0,c.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or create a new invoice"})]}):(0,c.jsxs)(d.bQ,{children:[(0,c.jsx)(d.B_,{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)(d.gU,{children:"Invoice"}),(0,c.jsx)(d.gU,{children:"Restaurant"}),(0,c.jsx)(d.gU,{children:"Issue Date"}),(0,c.jsx)(d.gU,{children:"Due Date"}),(0,c.jsx)(d.gU,{children:"Status"}),(0,c.jsx)(d.gU,{align:"right",children:"Amount"}),(0,c.jsx)(d.gU,{align:"right",children:"Total"}),(0,c.jsx)(d.gU,{children:"Actions"})]})}),(0,c.jsx)("tbody",{children:ve.map(e=>(0,c.jsxs)(d.J2,{children:[(0,c.jsx)(d.Bv,{"data-label":"Invoice",children:(0,c.jsxs)(A,{children:[(0,c.jsx)(C,{children:e.invoiceNumber}),(0,c.jsx)(D,{children:e.planType})]})}),(0,c.jsx)(d.Bv,{"data-label":"Restaurant",children:(0,c.jsxs)(A,{children:[(0,c.jsx)(C,{children:e.restaurantName}),(0,c.jsx)(D,{children:e.restaurantManager})]})}),(0,c.jsx)(d.Bv,{"data-label":"Issue Date",align:"center",children:we(e.issueDate)}),(0,c.jsx)(d.Bv,{"data-label":"Due Date",align:"center",children:we(e.dueDate)}),(0,c.jsx)(d.Bv,{"data-label":"Status",align:"center",children:(0,c.jsx)(k,{status:e.status,children:e.status})}),(0,c.jsx)(d.Bv,{"data-label":"Amount",align:"right",children:(0,c.jsx)(d.DM,{children:(0,o.vv)(e.amount)})}),(0,c.jsx)(d.Bv,{"data-label":"Total",align:"right",children:(0,c.jsx)(d.DM,{highlight:!0,children:0===e.total?(0,c.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,o.vv)(e.total)})}),(0,c.jsx)(d.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,c.jsxs)(E,{children:[(0,c.jsx)(S,{variant:"primary",onClick:()=>(e=>{xe(e),ae(!0)})(e),children:"View"}),"draft"===e.status&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(S,{onClick:()=>(e=>{xe(e),ue({amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,items:e.items}),ie(!0)})(e),children:"Edit"}),(0,c.jsx)(S,{onClick:()=>(e=>{window.confirm(`Send invoice ${e.invoiceNumber} to ${e.restaurantName}?`)&&(t(n.map(n=>n.id===e.id?{...n,status:"sent"}:n)),alert(`Invoice ${e.invoiceNumber} has been sent to ${e.restaurantName}`))})(e),children:"Send"})]}),"sent"===e.status&&(0,c.jsxs)(c.Fragment,{children:[e.total>0&&(0,c.jsx)(S,{variant:"primary",onClick:()=>Ae(e),children:"Pay Now"}),(0,c.jsx)(S,{onClick:()=>(e=>{window.confirm(`Mark invoice ${e.invoiceNumber} as overdue?`)&&(t(n.map(n=>n.id===e.id?{...n,status:"overdue"}:n)),alert(`Invoice ${e.invoiceNumber} marked as overdue`))})(e),children:"Mark Overdue"})]}),"overdue"===e.status&&e.total>0&&(0,c.jsx)(S,{variant:"primary",onClick:()=>Ae(e),children:"Pay Now"}),"paid"===e.status&&(0,c.jsx)(S,{onClick:()=>window.print(),children:"Print Receipt"})]})})]},e.id))})]})}),K&&(0,c.jsx)(I,{onClick:()=>X(!1),children:(0,c.jsxs)(B,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(N,{children:"Create New Invoice"}),(0,c.jsx)(P,{onClick:()=>X(!1),children:"\xd7"})]}),(0,c.jsxs)(M,{children:[(0,c.jsxs)(z,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Restaurant Name *"}),(0,c.jsx)(_,{type:"text",value:ge.restaurantName,onChange:e=>me({...ge,restaurantName:e.target.value}),placeholder:"Enter restaurant name",required:!0})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Restaurant Manager"}),(0,c.jsx)(_,{type:"text",value:ge.restaurantManager,onChange:e=>me({...ge,restaurantManager:e.target.value}),placeholder:"Enter manager name"})]})]}),(0,c.jsxs)(z,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Amount (RM) *"}),(0,c.jsx)(_,{type:"number",step:"0.01",min:"0",value:ge.amount,onChange:e=>me({...ge,amount:e.target.value}),placeholder:"0.00",required:!0}),(0,c.jsx)(q,{children:"Tax (6%) will be calculated automatically"})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Due Date *"}),(0,c.jsx)(_,{type:"date",value:ge.dueDate,onChange:e=>me({...ge,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,c.jsx)(z,{children:(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Plan Type"}),(0,c.jsxs)(U,{value:ge.planType,onChange:e=>me({...ge,planType:e.target.value}),children:[(0,c.jsx)("option",{value:"Basic Plan",children:"Basic Plan"}),(0,c.jsx)("option",{value:"Professional Plan",children:"Professional Plan"}),(0,c.jsx)("option",{value:"Enterprise Plan",children:"Enterprise Plan"})]})]})}),(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Description"}),(0,c.jsx)(L,{value:ge.description,onChange:e=>me({...ge,description:e.target.value}),placeholder:"Enter invoice description (optional)",rows:3})]}),ge.amount&&(0,c.jsxs)(W,{children:[(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Subtotal:"}),(0,c.jsx)("span",{children:(0,o.vv)(parseFloat(ge.amount||"0"),ee)})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Tax (6%):"}),(0,c.jsx)("span",{children:(0,o.vv)(.06*parseFloat(ge.amount||"0"),ee)})]}),(0,c.jsxs)(J,{highlight:!0,children:[(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:"Total:"})}),(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:(0,o.vv)(1.06*parseFloat(ge.amount||"0"),ee)})})]})]})]}),(0,c.jsxs)(R,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>X(!1),children:"Cancel"}),(0,c.jsx)(g,{variant:"primary",onClick:()=>{if(!ge.restaurantName||!ge.amount||!ge.dueDate)return void alert("Please fill in all required fields.");const e=`INV-${(new Date).getFullYear()}-M${String(n.length+1).padStart(3,"0")}`,a=parseFloat(ge.amount),r=.06*a,i=a+r,s={id:`invoice-${Date.now()}`,invoiceNumber:e,restaurantId:ge.restaurantId||`rest-${Date.now()}`,restaurantName:ge.restaurantName,restaurantManager:ge.restaurantManager,issueDate:(new Date).toISOString().split("T")[0],dueDate:ge.dueDate,status:"draft",amount:a,tax:r,total:i,items:[{description:ge.description||`${ge.planType} Subscription`,quantity:1,unitPrice:a,total:a}],billingPeriod:(new Date).toISOString().slice(0,7),planType:ge.planType};t([s,...n]),X(!1),me({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"}),alert("Invoice created successfully!")},disabled:!ge.restaurantName||!ge.amount||!ge.dueDate,children:"Create Invoice"})]})]})}),te&&ce&&(0,c.jsx)(I,{onClick:()=>ae(!1),children:(0,c.jsxs)(B,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(T,{children:[(0,c.jsxs)(N,{children:["Invoice Details - ",ce.invoiceNumber]}),(0,c.jsx)(P,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,c.jsxs)(M,{children:[(0,c.jsxs)(z,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Invoice Number"}),(0,c.jsx)("div",{children:ce.invoiceNumber})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Status"}),(0,c.jsx)(k,{status:ce.status,children:ce.status})]})]}),(0,c.jsxs)(z,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Restaurant"}),(0,c.jsx)("div",{children:ce.restaurantName})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Manager"}),(0,c.jsx)("div",{children:ce.restaurantManager})]})]}),(0,c.jsxs)(z,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Issue Date"}),(0,c.jsx)("div",{children:ce.issueDate})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Due Date"}),(0,c.jsx)("div",{children:ce.dueDate})]})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Items"}),ce.items.map((e,n)=>(0,c.jsxs)("div",{style:{padding:"8px",background:"#F8FAFC",borderRadius:"4px",marginBottom:"8px"},children:[e.description," - ",(0,o.vv)(e.total,ee)]},n))]}),(0,c.jsxs)(W,{children:[(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Subtotal:"}),(0,c.jsx)("span",{children:(0,o.vv)(ce.subtotalBeforeDiscount||ce.amount,ee)})]}),ce.discountAmount&&ce.discountAmount>0&&(0,c.jsxs)(J,{children:[(0,c.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===ce.discountType?` (${ce.discountValue}%)`:"",":"]}),(0,c.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(ce.discountAmount,ee)]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Tax (6%):"}),(0,c.jsx)("span",{children:(0,o.vv)(ce.tax,ee)})]}),(0,c.jsxs)(J,{highlight:!0,children:[(0,c.jsx)("span",{children:"Total:"}),(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:(0,o.vv)(ce.total,ee)})})]})]})]}),(0,c.jsxs)(R,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>ae(!1),children:"Close"}),(0,c.jsx)(g,{variant:"primary",onClick:()=>window.print(),children:"Print Invoice"})]})]})}),le&&ce&&(0,c.jsx)(I,{onClick:()=>{de(!1),setTimeout(()=>{oe(!0)},100)},children:(0,c.jsxs)(B,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(T,{children:[(0,c.jsx)(N,{children:"Confirm Payment"}),(0,c.jsx)(P,{onClick:()=>{de(!1),setTimeout(()=>{oe(!0)},100)},children:"\xd7"})]}),(0,c.jsx)(M,{children:(0,c.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,c.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"8px",margin:0},children:"Confirm Payment"}),(0,c.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"24px",margin:"8px 0 24px 0"},children:"Are you sure you want to process this payment?"}),(0,c.jsxs)(W,{children:[(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Invoice:"}),(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:ce.invoiceNumber})})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Restaurant:"}),(0,c.jsx)("span",{children:ce.restaurantName})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Payment Amount:"}),(0,c.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,o.vv)(ce.total,ee)})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Payment Date:"}),(0,c.jsx)("span",{children:he.paymentDate})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Method:"}),(0,c.jsx)("span",{children:"Bank Transfer"})]})]}),(0,c.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px",fontSize:"13px",color:"#0369A1"},children:"Warning: This action will mark the invoice as PAID and cannot be easily undone."})]})}),(0,c.jsxs)(R,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>{de(!1),setTimeout(()=>{oe(!0)},100)},children:"Cancel"}),(0,c.jsx)(g,{variant:"primary",onClick:async()=>{if(ce)try{const e=await fetch(`${s.JR}/api/invoices/${ce.id}/payment`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({payment_method:he.paymentMethod,transaction_id:he.transactionId,payment_date:he.paymentDate,notes:he.notes,receipt_url:he.receiptFile?"uploaded_receipt_url":null})});if(!e.ok)throw new Error("API call failed");{await e.json();const a={...ce,status:"paid",paidDate:he.paymentDate};t(n.map(e=>e.id===ce.id?a:e))}oe(!1),de(!1),xe(null),je({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null})}catch(e){console.error("Payment processing error:",e),alert("Error processing payment. Please try again.")}},children:"Confirm Payment"})]})]})}),se&&ce&&(0,c.jsx)(I,{onClick:()=>oe(!1),children:(0,c.jsxs)(B,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(T,{children:[(0,c.jsxs)(N,{children:["Record Payment - ",ce.invoiceNumber]}),(0,c.jsx)(P,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,c.jsxs)(M,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Invoice Details"}),(0,c.jsxs)(W,{children:[(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Restaurant:"}),(0,c.jsx)("span",{children:ce.restaurantName})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Manager:"}),(0,c.jsx)("span",{children:ce.restaurantManager})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Due Date:"}),(0,c.jsx)("span",{children:we(ce.dueDate)})]}),(0,c.jsxs)(J,{highlight:!0,children:[(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:"Amount Due:"})}),(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:(0,o.vv)(ce.total)})})]})]})]}),(0,c.jsxs)(z,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Payment Method"}),(0,c.jsx)("div",{style:{padding:"12px 16px",background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",color:"#374151"},children:"Bank Transfer"})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Payment Date *"}),(0,c.jsx)(_,{type:"date",value:he.paymentDate,onChange:e=>je({...he,paymentDate:e.target.value}),required:!0,max:(new Date).toISOString().split("T")[0]})]})]}),(0,c.jsxs)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",margin:"16px 0"},children:[(0,c.jsx)("p",{style:{margin:"0 0 8px 0",color:"#0369A1",fontSize:"14px",fontWeight:"600"},children:"Bank Transfer Payment Verification"}),(0,c.jsxs)("p",{style:{margin:0,color:"#0369A1",fontSize:"13px"},children:["Please provide at least ONE of the following as proof of your bank transfer:",(0,c.jsx)("br",{}),"\u2022 Transaction ID/Reference Number from your bank",(0,c.jsx)("br",{}),"\u2022 Screenshot/Photo of the transfer receipt"]})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Transaction ID / Reference Number *"}),(0,c.jsx)(_,{type:"text",value:he.transactionId,onChange:e=>je({...he,transactionId:e.target.value}),placeholder:"Enter transaction ID or reference number"}),(0,c.jsx)(q,{children:"Required if no receipt is uploaded"})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Upload Receipt (Optional) *"}),(0,c.jsx)(_,{type:"file",accept:"image/*,.pdf",onChange:e=>{var n;const t=(null===(n=e.target.files)||void 0===n?void 0:n[0])||null;je({...he,receiptFile:t})}}),(0,c.jsx)(q,{children:"Upload bank transfer receipt if no transaction ID is provided"}),he.receiptFile&&(0,c.jsxs)("div",{style:{marginTop:"8px",padding:"8px",background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"4px",fontSize:"14px",color:"#0369A1"},children:["File selected: ",he.receiptFile.name]})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Payment Notes"}),(0,c.jsx)(L,{value:he.notes,onChange:e=>je({...he,notes:e.target.value}),placeholder:"Add any additional notes about this payment",rows:3})]})]}),(0,c.jsxs)(R,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>oe(!1),children:"Cancel"}),(0,c.jsx)(g,{variant:"primary",onClick:()=>{ce&&(he.transactionId||he.receiptFile?(oe(!1),setTimeout(()=>{de(!0)},100)):alert("Please provide either a Transaction ID/Reference Number OR upload a payment receipt."))},disabled:!he.transactionId&&!he.receiptFile,children:"Record Payment"})]})]})}),re&&ce&&pe&&(0,c.jsx)(I,{onClick:()=>ie(!1),children:(0,c.jsxs)(B,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(T,{children:[(0,c.jsxs)(N,{children:["Edit Invoice - ",ce.invoiceNumber]}),(0,c.jsx)(P,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,c.jsxs)(M,{children:[(0,c.jsxs)(z,{children:[(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Amount (RM)"}),(0,c.jsx)(_,{type:"number",value:pe.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,a=n+t;ue({...pe,amount:e.target.value,tax:t.toFixed(2),total:a.toFixed(2)})}})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Due Date"}),(0,c.jsx)(_,{type:"date",value:pe.dueDate,onChange:e=>ue({...pe,dueDate:e.target.value})})]})]}),(0,c.jsxs)($,{children:[(0,c.jsx)(O,{children:"Status"}),(0,c.jsxs)(U,{value:pe.status,onChange:e=>ue({...pe,status:e.target.value}),children:[(0,c.jsx)("option",{value:"draft",children:"Draft"}),(0,c.jsx)("option",{value:"sent",children:"Sent"}),(0,c.jsx)("option",{value:"paid",children:"Paid"}),(0,c.jsx)("option",{value:"overdue",children:"Overdue"}),(0,c.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,c.jsxs)(W,{children:[(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Subtotal:"}),(0,c.jsx)("span",{children:(0,o.vv)(parseFloat(pe.amount||0),ee)})]}),ce&&ce.discountAmount&&ce.discountAmount>0&&(0,c.jsxs)(J,{children:[(0,c.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===ce.discountType?` (${ce.discountValue}%)`:"",":"]}),(0,c.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(ce.discountAmount,ee)]})]}),(0,c.jsxs)(J,{children:[(0,c.jsx)("span",{children:"Tax (6%):"}),(0,c.jsx)("span",{children:(0,o.vv)(parseFloat(pe.tax||0),ee)})]}),(0,c.jsxs)(J,{highlight:!0,children:[(0,c.jsx)("span",{children:"Total:"}),(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:(0,o.vv)(parseFloat(pe.total||0),ee)})})]})]})]}),(0,c.jsxs)(R,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>ie(!1),children:"Cancel"}),(0,c.jsx)(g,{variant:"primary",onClick:()=>{if(!ce||!pe)return;const e={...ce,amount:parseFloat(pe.amount),tax:parseFloat(pe.tax),total:parseFloat(pe.total),dueDate:pe.dueDate,status:pe.status,items:pe.items};t(n.map(n=>n.id===ce.id?e:n)),ie(!1),xe(null),ue(null),alert("Invoice updated successfully!")},children:"Save Changes"})]})]})})]})]})})}}}]);