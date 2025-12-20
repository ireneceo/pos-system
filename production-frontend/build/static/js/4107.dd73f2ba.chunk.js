"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4107],{4021:(e,n,t)=>{t.d(n,{i1:()=>i});var r=t(9950),a=t(1367);t(6038);const i=()=>{const{user:e}=(0,a.As)(),[n,t]=(0,r.useState)("USD"),[i,s]=(0,r.useState)(["USD"]),[o,l]=(0,r.useState)(!0),[d,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{if(null===e||void 0===e||!e.brand_id)return t("USD"),s(["USD","MYR","KRW"]),void l(!1);try{const n=localStorage.getItem("token"),r=await fetch(`/api/currencies/brands/${e.brand_id}`,{headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"}});if(r.ok){const e=await r.json();e.success&&e.data&&(t(e.data.default_currency||"USD"),s(e.data.supported_currencies||["USD"]))}else t("USD"),s(["USD","MYR","KRW"])}catch(n){console.error("Failed to fetch brand currency:",n),c("Failed to load currency settings"),t("USD"),s(["USD","MYR","KRW"])}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.brand_id]),{defaultCurrency:n,supportedCurrencies:i,loading:o,error:d}}},4107:(e,n,t)=>{t.r(n),t.d(n,{default:()=>H});var r=t(9950),a=t(4752),i=t(3310),s=t(1367),o=t(6910),l=t(6038),d=t(4021),c=t(4414);const p=a.Ay.div`
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
`,u=a.Ay.div`
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
`,j=a.Ay.div`
  display: flex;
  gap: 12px;
`,g=a.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,m=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,v=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,f=a.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,b=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,y=a.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,F=a.Ay.input`
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
`,w=a.Ay.select`
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
`,C=a.Ay.div``,D=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,A=a.Ay.div`
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
`,S=a.Ay.div`
  font-weight: ${e=>e.highlight?"700":"500"};
  color: ${e=>e.highlight?"#059669":"#374151"};
`,E=a.Ay.div`
  display: flex;
  gap: 8px;
`,I=a.Ay.button`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,B=a.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,N=a.Ay.div`
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
`,P=a.Ay.div`
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
`,T=a.Ay.div`
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
`,R=a.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
`,z=a.Ay.div`
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
`,$=a.Ay.button`
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
`,O=a.Ay.div`
  padding: 0 24px 24px 24px;
  max-height: 400px;
  overflow-y: auto;
`,U=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
`,_=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,L=a.Ay.div`
  margin-bottom: 20px;
`,W=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,q=a.Ay.input`
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
`,Y=a.Ay.select`
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
`,J=a.Ay.textarea`
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
`,K=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,V=a.Ay.div`
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
`,H=()=>{const{user:e}=(0,s.As)(),[n,t]=(0,r.useState)([]),[a,H]=(0,r.useState)(""),[Q,X]=(0,r.useState)("all"),[Z,ee]=(0,r.useState)("all"),[ne,te]=(0,r.useState)(!1),{defaultCurrency:re}=(0,d.i1)(),[ae,ie]=(0,r.useState)("MYR");(0,r.useEffect)(()=>{re&&ie(re)},[re]);const[se,oe]=(0,r.useState)(!1),[le,de]=(0,r.useState)(!1),[ce,pe]=(0,r.useState)(!1),[xe,ue]=(0,r.useState)(!1),[he,je]=(0,r.useState)(null),[ge,me]=(0,r.useState)(null),[ve,fe]=(0,r.useState)({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),[be,ye]=(0,r.useState)({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"});(0,r.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",r=await fetch(`${o.JR}/api/invoices/manager/${n}`);if(r.ok){const e=await r.json();t(e)}else console.error("Failed to fetch invoices from API"),t([])}catch(n){console.error("Failed to fetch invoices:",n),t([])}})()},[e]);const Fe=n.filter(e=>{var n;const t=e.restaurantName.toLowerCase().includes(a.toLowerCase())||e.invoiceNumber.toLowerCase().includes(a.toLowerCase())||(null===(n=e.restaurantManager)||void 0===n?void 0:n.toLowerCase().includes(a.toLowerCase()||"")),r="all"===Q||e.status===Q,i="all"===Z||e.issueDate.includes(Z);return t&&r&&i}),we=n.length,Ce=n.filter(e=>"paid"===e.status).length,De=n.filter(e=>"overdue"===e.status).length,Ae=n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),ke=e=>new Date(e).toLocaleDateString("en-MY"),Se=e=>{je(e),fe({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),pe(!0)};return(0,c.jsx)(i.A,{children:(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:[(0,c.jsx)(h,{children:"Restaurant Invoice Management"}),(0,c.jsxs)(j,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalInvoices:n.length,summary:{totalAmount:n.reduce((e,n)=>e+n.total,0),paidInvoices:n.filter(e=>"paid"===e.status).length,overdueInvoices:n.filter(e=>"overdue"===e.status).length,draftInvoices:n.filter(e=>"draft"===e.status).length,paidAmount:n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),outstandingAmount:n.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0)},statusBreakdown:{draft:n.filter(e=>"draft"===e.status).length,sent:n.filter(e=>"sent"===e.status).length,paid:n.filter(e=>"paid"===e.status).length,overdue:n.filter(e=>"overdue"===e.status).length,cancelled:n.filter(e=>"cancelled"===e.status).length},invoices:n.map(e=>({invoiceNumber:e.invoiceNumber,restaurantName:e.restaurantName,restaurantManager:e.restaurantManager,issueDate:e.issueDate,dueDate:e.dueDate,paidDate:e.paidDate||"N/A",status:e.status,amount:e.amount,tax:e.tax,total:e.total,billingPeriod:e.billingPeriod,planType:e.planType}))},t=JSON.stringify(e,null,2),r=new Blob([t],{type:"application/json"}),a=URL.createObjectURL(r),i=document.createElement("a");i.href=a,i.download=`restaurant-invoices-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a)},children:"Export"}),(0,c.jsx)(g,{variant:"primary",onClick:()=>{te(!0)},children:"Create Invoice"})]})]}),(0,c.jsxs)(u,{children:[(0,c.jsxs)(m,{children:[(0,c.jsxs)(v,{color:"#059669",children:[(0,c.jsx)(f,{children:we}),(0,c.jsx)(b,{children:"Total Invoices"})]}),(0,c.jsxs)(v,{color:"#2563EB",children:[(0,c.jsx)(f,{children:Ce}),(0,c.jsx)(b,{children:"Paid Invoices"})]}),(0,c.jsxs)(v,{color:"#DC2626",children:[(0,c.jsx)(f,{children:De}),(0,c.jsx)(b,{children:"Overdue Invoices"})]}),(0,c.jsxs)(v,{color:"#7C3AED",children:[(0,c.jsx)(f,{children:(0,l.vv)(Ae)}),(0,c.jsx)(b,{children:"Total Revenue"})]})]}),(0,c.jsxs)(y,{children:[(0,c.jsx)(F,{type:"text",placeholder:"Search by invoice number, restaurant, or plan type...",value:a,onChange:e=>H(e.target.value)}),(0,c.jsxs)(w,{value:Q,onChange:e=>X(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"draft",children:"Draft"}),(0,c.jsx)("option",{value:"sent",children:"Sent"}),(0,c.jsx)("option",{value:"paid",children:"Paid"}),(0,c.jsx)("option",{value:"overdue",children:"Overdue"}),(0,c.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,c.jsxs)(w,{value:Z,onChange:e=>ee(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Months"}),(0,c.jsx)("option",{value:"2025-01",children:"January 2025"}),(0,c.jsx)("option",{value:"2024-12",children:"December 2024"}),(0,c.jsx)("option",{value:"2024-11",children:"November 2024"})]})]}),(0,c.jsxs)(B,{children:[(0,c.jsxs)(N,{children:[(0,c.jsx)("span",{children:"Invoice"}),(0,c.jsx)("span",{children:"Restaurant"}),(0,c.jsx)("span",{children:"Issue Date"}),(0,c.jsx)("span",{children:"Due Date"}),(0,c.jsx)("span",{children:"Status"}),(0,c.jsx)("span",{children:"Amount"}),(0,c.jsx)("span",{children:"Total"}),(0,c.jsx)("span",{children:"Actions"})]}),0===Fe.length?(0,c.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6B7280"},children:[(0,c.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No invoices found"}),(0,c.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or create a new invoice"})]}):Fe.map(e=>(0,c.jsxs)(P,{children:[(0,c.jsxs)(C,{children:[(0,c.jsx)(D,{children:e.invoiceNumber}),(0,c.jsx)(A,{children:e.planType})]}),(0,c.jsxs)(C,{children:[(0,c.jsx)(D,{children:e.restaurantName}),(0,c.jsx)(A,{children:e.restaurantManager})]}),(0,c.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:ke(e.issueDate)}),(0,c.jsx)("div",{style:{fontSize:"14px",color:"#374151"},children:ke(e.dueDate)}),(0,c.jsx)(k,{status:e.status,children:e.status}),(0,c.jsx)(S,{children:(0,l.vv)(e.amount)}),(0,c.jsx)(S,{highlight:!0,children:(0,l.vv)(e.total)}),(0,c.jsxs)(E,{children:[(0,c.jsx)(I,{variant:"primary",onClick:()=>(e=>{je(e),oe(!0)})(e),children:"View"}),"draft"===e.status&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(I,{onClick:()=>(e=>{je(e),me({amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,items:e.items}),de(!0)})(e),children:"Edit"}),(0,c.jsx)(I,{onClick:()=>(e=>{window.confirm(`Send invoice ${e.invoiceNumber} to ${e.restaurantName}?`)&&(t(n.map(n=>n.id===e.id?{...n,status:"sent"}:n)),alert(`Invoice ${e.invoiceNumber} has been sent to ${e.restaurantName}`))})(e),children:"Send"})]}),"sent"===e.status&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(I,{variant:"primary",onClick:()=>Se(e),children:"Pay Now"}),(0,c.jsx)(I,{onClick:()=>(e=>{window.confirm(`Mark invoice ${e.invoiceNumber} as overdue?`)&&(t(n.map(n=>n.id===e.id?{...n,status:"overdue"}:n)),alert(`Invoice ${e.invoiceNumber} marked as overdue`))})(e),children:"Mark Overdue"})]}),"overdue"===e.status&&(0,c.jsx)(I,{variant:"primary",onClick:()=>Se(e),children:"Pay Now"}),"paid"===e.status&&(0,c.jsx)(I,{onClick:()=>window.print(),children:"Print Receipt"})]})]},e.id))]}),ne&&(0,c.jsx)(T,{onClick:()=>te(!1),children:(0,c.jsxs)(R,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(z,{children:[(0,c.jsx)(M,{children:"Create New Invoice"}),(0,c.jsx)($,{onClick:()=>te(!1),children:"\xd7"})]}),(0,c.jsxs)(O,{children:[(0,c.jsxs)(_,{children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Restaurant Name *"}),(0,c.jsx)(q,{type:"text",value:be.restaurantName,onChange:e=>ye({...be,restaurantName:e.target.value}),placeholder:"Enter restaurant name",required:!0})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Restaurant Manager"}),(0,c.jsx)(q,{type:"text",value:be.restaurantManager,onChange:e=>ye({...be,restaurantManager:e.target.value}),placeholder:"Enter manager name"})]})]}),(0,c.jsxs)(_,{children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Amount (RM) *"}),(0,c.jsx)(q,{type:"number",step:"0.01",min:"0",value:be.amount,onChange:e=>ye({...be,amount:e.target.value}),placeholder:"0.00",required:!0}),(0,c.jsx)(K,{children:"Tax (6%) will be calculated automatically"})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Due Date *"}),(0,c.jsx)(q,{type:"date",value:be.dueDate,onChange:e=>ye({...be,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,c.jsx)(_,{children:(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Plan Type"}),(0,c.jsxs)(Y,{value:be.planType,onChange:e=>ye({...be,planType:e.target.value}),children:[(0,c.jsx)("option",{value:"Basic Plan",children:"Basic Plan"}),(0,c.jsx)("option",{value:"Professional Plan",children:"Professional Plan"}),(0,c.jsx)("option",{value:"Enterprise Plan",children:"Enterprise Plan"})]})]})}),(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Description"}),(0,c.jsx)(J,{value:be.description,onChange:e=>ye({...be,description:e.target.value}),placeholder:"Enter invoice description (optional)",rows:3})]}),be.amount&&(0,c.jsxs)(V,{children:[(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Subtotal:"}),(0,c.jsx)("span",{children:(0,l.vv)(parseFloat(be.amount||"0"),ae)})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Tax (6%):"}),(0,c.jsx)("span",{children:(0,l.vv)(.06*parseFloat(be.amount||"0"),ae)})]}),(0,c.jsxs)(G,{highlight:!0,children:[(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:"Total:"})}),(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:(0,l.vv)(1.06*parseFloat(be.amount||"0"),ae)})})]})]})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>te(!1),children:"Cancel"}),(0,c.jsx)(g,{variant:"primary",onClick:()=>{if(!be.restaurantName||!be.amount||!be.dueDate)return void alert("Please fill in all required fields.");const e=`INV-${(new Date).getFullYear()}-M${String(n.length+1).padStart(3,"0")}`,r=parseFloat(be.amount),a=.06*r,i=r+a,s={id:`invoice-${Date.now()}`,invoiceNumber:e,restaurantId:be.restaurantId||`rest-${Date.now()}`,restaurantName:be.restaurantName,restaurantManager:be.restaurantManager,issueDate:(new Date).toISOString().split("T")[0],dueDate:be.dueDate,status:"draft",amount:r,tax:a,total:i,items:[{description:be.description||`${be.planType} Subscription`,quantity:1,unitPrice:r,total:r}],billingPeriod:(new Date).toISOString().slice(0,7),planType:be.planType};t([s,...n]),te(!1),ye({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"}),alert("Invoice created successfully!")},disabled:!be.restaurantName||!be.amount||!be.dueDate,children:"Create Invoice"})]})]})}),se&&he&&(0,c.jsx)(T,{onClick:()=>oe(!1),children:(0,c.jsxs)(R,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(z,{children:[(0,c.jsxs)(M,{children:["Invoice Details - ",he.invoiceNumber]}),(0,c.jsx)($,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,c.jsxs)(O,{children:[(0,c.jsxs)(_,{children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Invoice Number"}),(0,c.jsx)("div",{children:he.invoiceNumber})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Status"}),(0,c.jsx)(k,{status:he.status,children:he.status})]})]}),(0,c.jsxs)(_,{children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Restaurant"}),(0,c.jsx)("div",{children:he.restaurantName})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Manager"}),(0,c.jsx)("div",{children:he.restaurantManager})]})]}),(0,c.jsxs)(_,{children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Issue Date"}),(0,c.jsx)("div",{children:he.issueDate})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Due Date"}),(0,c.jsx)("div",{children:he.dueDate})]})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Items"}),he.items.map((e,n)=>(0,c.jsxs)("div",{style:{padding:"8px",background:"#F8FAFC",borderRadius:"4px",marginBottom:"8px"},children:[e.description," - ",(0,l.vv)(e.total,ae)]},n))]}),(0,c.jsxs)(V,{children:[(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Subtotal:"}),(0,c.jsx)("span",{children:(0,l.vv)(he.amount,ae)})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Tax (6%):"}),(0,c.jsx)("span",{children:(0,l.vv)(he.tax,ae)})]}),(0,c.jsxs)(G,{highlight:!0,children:[(0,c.jsx)("span",{children:"Total:"}),(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:(0,l.vv)(he.total,ae)})})]})]})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>oe(!1),children:"Close"}),(0,c.jsx)(g,{variant:"primary",onClick:()=>window.print(),children:"Print Invoice"})]})]})}),xe&&he&&(0,c.jsx)(T,{onClick:()=>{ue(!1),setTimeout(()=>{pe(!0)},100)},children:(0,c.jsxs)(R,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(z,{children:[(0,c.jsx)(M,{children:"Confirm Payment"}),(0,c.jsx)($,{onClick:()=>{ue(!1),setTimeout(()=>{pe(!0)},100)},children:"\xd7"})]}),(0,c.jsx)(O,{children:(0,c.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,c.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"8px",margin:0},children:"Confirm Payment"}),(0,c.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"24px",margin:"8px 0 24px 0"},children:"Are you sure you want to process this payment?"}),(0,c.jsxs)(V,{children:[(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Invoice:"}),(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:he.invoiceNumber})})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Restaurant:"}),(0,c.jsx)("span",{children:he.restaurantName})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Payment Amount:"}),(0,c.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,l.vv)(he.total,ae)})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Payment Date:"}),(0,c.jsx)("span",{children:ve.paymentDate})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Method:"}),(0,c.jsx)("span",{children:"Bank Transfer"})]})]}),(0,c.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px",fontSize:"13px",color:"#0369A1"},children:"Warning: This action will mark the invoice as PAID and cannot be easily undone."})]})}),(0,c.jsxs)(U,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>{ue(!1),setTimeout(()=>{pe(!0)},100)},children:"Cancel"}),(0,c.jsx)(g,{variant:"primary",onClick:async()=>{if(he)try{const e=await fetch(`${o.JR}/api/invoices/${he.id}/payment`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({payment_method:ve.paymentMethod,transaction_id:ve.transactionId,payment_date:ve.paymentDate,notes:ve.notes,receipt_url:ve.receiptFile?"uploaded_receipt_url":null})});if(!e.ok)throw new Error("API call failed");{await e.json();const r={...he,status:"paid",paidDate:ve.paymentDate};t(n.map(e=>e.id===he.id?r:e))}pe(!1),ue(!1),je(null),fe({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null})}catch(e){console.error("Payment processing error:",e),alert("Error processing payment. Please try again.")}},children:"Confirm Payment"})]})]})}),ce&&he&&(0,c.jsx)(T,{onClick:()=>pe(!1),children:(0,c.jsxs)(R,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(z,{children:[(0,c.jsxs)(M,{children:["Record Payment - ",he.invoiceNumber]}),(0,c.jsx)($,{onClick:()=>pe(!1),children:"\xd7"})]}),(0,c.jsxs)(O,{children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Invoice Details"}),(0,c.jsxs)(V,{children:[(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Restaurant:"}),(0,c.jsx)("span",{children:he.restaurantName})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Manager:"}),(0,c.jsx)("span",{children:he.restaurantManager})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Due Date:"}),(0,c.jsx)("span",{children:ke(he.dueDate)})]}),(0,c.jsxs)(G,{highlight:!0,children:[(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:"Amount Due:"})}),(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:(0,l.vv)(he.total)})})]})]})]}),(0,c.jsxs)(_,{children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Payment Method"}),(0,c.jsx)("div",{style:{padding:"12px 16px",background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",color:"#374151"},children:"Bank Transfer"})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Payment Date *"}),(0,c.jsx)(q,{type:"date",value:ve.paymentDate,onChange:e=>fe({...ve,paymentDate:e.target.value}),required:!0,max:(new Date).toISOString().split("T")[0]})]})]}),(0,c.jsxs)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",margin:"16px 0"},children:[(0,c.jsx)("p",{style:{margin:"0 0 8px 0",color:"#0369A1",fontSize:"14px",fontWeight:"600"},children:"Bank Transfer Payment Verification"}),(0,c.jsxs)("p",{style:{margin:0,color:"#0369A1",fontSize:"13px"},children:["Please provide at least ONE of the following as proof of your bank transfer:",(0,c.jsx)("br",{}),"\u2022 Transaction ID/Reference Number from your bank",(0,c.jsx)("br",{}),"\u2022 Screenshot/Photo of the transfer receipt"]})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Transaction ID / Reference Number *"}),(0,c.jsx)(q,{type:"text",value:ve.transactionId,onChange:e=>fe({...ve,transactionId:e.target.value}),placeholder:"Enter transaction ID or reference number"}),(0,c.jsx)(K,{children:"Required if no receipt is uploaded"})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Upload Receipt (Optional) *"}),(0,c.jsx)(q,{type:"file",accept:"image/*,.pdf",onChange:e=>{var n;const t=(null===(n=e.target.files)||void 0===n?void 0:n[0])||null;fe({...ve,receiptFile:t})}}),(0,c.jsx)(K,{children:"Upload bank transfer receipt if no transaction ID is provided"}),ve.receiptFile&&(0,c.jsxs)("div",{style:{marginTop:"8px",padding:"8px",background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"4px",fontSize:"14px",color:"#0369A1"},children:["File selected: ",ve.receiptFile.name]})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Payment Notes"}),(0,c.jsx)(J,{value:ve.notes,onChange:e=>fe({...ve,notes:e.target.value}),placeholder:"Add any additional notes about this payment",rows:3})]})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>pe(!1),children:"Cancel"}),(0,c.jsx)(g,{variant:"primary",onClick:()=>{he&&(ve.transactionId||ve.receiptFile?(pe(!1),setTimeout(()=>{ue(!0)},100)):alert("Please provide either a Transaction ID/Reference Number OR upload a payment receipt."))},disabled:!ve.transactionId&&!ve.receiptFile,children:"Record Payment"})]})]})}),le&&he&&ge&&(0,c.jsx)(T,{onClick:()=>de(!1),children:(0,c.jsxs)(R,{onClick:e=>e.stopPropagation(),children:[(0,c.jsxs)(z,{children:[(0,c.jsxs)(M,{children:["Edit Invoice - ",he.invoiceNumber]}),(0,c.jsx)($,{onClick:()=>de(!1),children:"\xd7"})]}),(0,c.jsxs)(O,{children:[(0,c.jsxs)(_,{children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Amount (RM)"}),(0,c.jsx)(q,{type:"number",value:ge.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,r=n+t;me({...ge,amount:e.target.value,tax:t.toFixed(2),total:r.toFixed(2)})}})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Due Date"}),(0,c.jsx)(q,{type:"date",value:ge.dueDate,onChange:e=>me({...ge,dueDate:e.target.value})})]})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:"Status"}),(0,c.jsxs)(Y,{value:ge.status,onChange:e=>me({...ge,status:e.target.value}),children:[(0,c.jsx)("option",{value:"draft",children:"Draft"}),(0,c.jsx)("option",{value:"sent",children:"Sent"}),(0,c.jsx)("option",{value:"paid",children:"Paid"}),(0,c.jsx)("option",{value:"overdue",children:"Overdue"}),(0,c.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,c.jsxs)(V,{children:[(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Subtotal:"}),(0,c.jsx)("span",{children:(0,l.vv)(parseFloat(ge.amount||0),ae)})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)("span",{children:"Tax (6%):"}),(0,c.jsx)("span",{children:(0,l.vv)(parseFloat(ge.tax||0),ae)})]}),(0,c.jsxs)(G,{highlight:!0,children:[(0,c.jsx)("span",{children:"Total:"}),(0,c.jsx)("span",{children:(0,c.jsx)("strong",{children:(0,l.vv)(parseFloat(ge.total||0),ae)})})]})]})]}),(0,c.jsxs)(U,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,c.jsx)(g,{variant:"primary",onClick:()=>{if(!he||!ge)return;const e={...he,amount:parseFloat(ge.amount),tax:parseFloat(ge.tax),total:parseFloat(ge.total),dueDate:ge.dueDate,status:ge.status,items:ge.items};t(n.map(n=>n.id===he.id?e:n)),de(!1),je(null),me(null),alert("Invoice updated successfully!")},children:"Save Changes"})]})]})})]})]})})}}}]);