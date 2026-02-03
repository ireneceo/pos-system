"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4107],{4021:(e,n,t)=>{t.d(n,{i1:()=>s});var a=t(9950),r=t(1367),i=t(6038);const s=()=>{const{user:e}=(0,r.As)(),[n,t]=(0,a.useState)("RM"),[s,o]=(0,a.useState)(Object.keys(i.DL)),[l,d]=(0,a.useState)(!0),[c,x]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),a=n.indexOf("restaurant");let r=a>=0?n[a+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),a=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";t(a)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),x("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:l,error:c}}},4107:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Y});var a=t(9950),r=t(4752),i=t(3310),s=t(1367),o=t(6910),l=t(6038),d=t(4021),c=t(2674),x=t(4414);const p=r.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,u=r.Ay.div`
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
`,h=r.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=r.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=r.Ay.div`
  display: flex;
  gap: 12px;
`,v=r.Ay.button`
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
`,b=r.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,y=r.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,f=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=r.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,w=r.Ay.input`
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
`,C=r.Ay.select`
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
`,D=r.Ay.div``,A=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,k=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,S=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"paid":return"#ECFDF5";case"sent":return"#DBEAFE";case"draft":default:return"#F3F4F6";case"overdue":return"#FEE2E2";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"paid":return"#059669";case"sent":return"#1E40AF";case"draft":default:return"#6B7280";case"overdue":case"cancelled":return"#DC2626"}}};
`,E=r.Ay.button`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,I=(0,r.Ay)(c.AA)`
  max-width: 160px;

  @media (max-width: 1024px) {
    max-width: none;
  }
`,B=r.Ay.div`
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
`,N=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
`,P=r.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,T=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,M=r.Ay.button`
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
`,R=r.Ay.div`
  padding: 0 24px 24px 24px;
  max-height: 400px;
  overflow-y: auto;
`,z=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
`,$=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,O=r.Ay.div`
  margin-bottom: 20px;
`,_=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,U=r.Ay.input`
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
`,L=r.Ay.select`
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
`,q=r.Ay.textarea`
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
`,J=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,W=r.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,V=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  
  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,Y=()=>{const{user:e}=(0,s.As)(),[n,t]=(0,a.useState)([]),[r,Y]=(0,a.useState)(""),[Q,G]=(0,a.useState)("all"),[H,K]=(0,a.useState)("all"),[X,Z]=(0,a.useState)(!1),{defaultCurrency:ee}=(0,d.i1)(),[ne,te]=(0,a.useState)("RM");(0,a.useEffect)(()=>{ee&&te(ee)},[ee]);const[ae,re]=(0,a.useState)(!1),[ie,se]=(0,a.useState)(!1),[oe,le]=(0,a.useState)(!1),[de,ce]=(0,a.useState)(!1),[xe,pe]=(0,a.useState)(null),[ue,he]=(0,a.useState)(null),[je,ge]=(0,a.useState)({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),[ve,me]=(0,a.useState)({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"});(0,a.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",a=await fetch(`${o.JR}/api/invoices/manager/${n}`);if(a.ok){const e=await a.json();t(e)}else console.error("Failed to fetch invoices from API"),t([])}catch(n){console.error("Failed to fetch invoices:",n),t([])}})()},[e]);const be=n.filter(e=>{var n;const t=e.restaurantName.toLowerCase().includes(r.toLowerCase())||e.invoiceNumber.toLowerCase().includes(r.toLowerCase())||(null===(n=e.restaurantManager)||void 0===n?void 0:n.toLowerCase().includes(r.toLowerCase()||"")),a="all"===Q||e.status===Q,i="all"===H||e.issueDate.includes(H);return t&&a&&i}),ye=n.length,fe=n.filter(e=>"paid"===e.status).length,Fe=n.filter(e=>"overdue"===e.status).length,we=n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),Ce=e=>new Date(e).toLocaleDateString("en-MY"),De=e=>{pe(e),ge({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),le(!0)};return(0,x.jsx)(i.A,{children:(0,x.jsxs)(p,{children:[(0,x.jsxs)(u,{children:[(0,x.jsx)(j,{children:"Restaurant Invoice Management"}),(0,x.jsxs)(g,{children:[(0,x.jsx)(v,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalInvoices:n.length,summary:{totalAmount:n.reduce((e,n)=>e+n.total,0),paidInvoices:n.filter(e=>"paid"===e.status).length,overdueInvoices:n.filter(e=>"overdue"===e.status).length,draftInvoices:n.filter(e=>"draft"===e.status).length,paidAmount:n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),outstandingAmount:n.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0)},statusBreakdown:{draft:n.filter(e=>"draft"===e.status).length,sent:n.filter(e=>"sent"===e.status).length,paid:n.filter(e=>"paid"===e.status).length,overdue:n.filter(e=>"overdue"===e.status).length,cancelled:n.filter(e=>"cancelled"===e.status).length},invoices:n.map(e=>({invoiceNumber:e.invoiceNumber,restaurantName:e.restaurantName,restaurantManager:e.restaurantManager,issueDate:e.issueDate,dueDate:e.dueDate,paidDate:e.paidDate||"N/A",status:e.status,amount:e.amount,tax:e.tax,total:e.total,billingPeriod:e.billingPeriod,planType:e.planType}))},t=JSON.stringify(e,null,2),a=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(a),i=document.createElement("a");i.href=r,i.download=`restaurant-invoices-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)},children:"Export"}),(0,x.jsx)(v,{variant:"primary",onClick:()=>{Z(!0)},children:"Create Invoice"})]})]}),(0,x.jsxs)(h,{children:[(0,x.jsxs)(m,{children:[(0,x.jsxs)(b,{color:"#059669",children:[(0,x.jsx)(y,{children:ye}),(0,x.jsx)(f,{children:"Total Invoices"})]}),(0,x.jsxs)(b,{color:"#2563EB",children:[(0,x.jsx)(y,{children:fe}),(0,x.jsx)(f,{children:"Paid Invoices"})]}),(0,x.jsxs)(b,{color:"#DC2626",children:[(0,x.jsx)(y,{children:Fe}),(0,x.jsx)(f,{children:"Overdue Invoices"})]}),(0,x.jsxs)(b,{color:"#7C3AED",children:[(0,x.jsx)(y,{children:(0,l.vv)(we)}),(0,x.jsx)(f,{children:"Total Revenue"})]})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(w,{type:"text",placeholder:"Search by invoice number, restaurant, or plan type...",value:r,onChange:e=>Y(e.target.value)}),(0,x.jsxs)(C,{value:Q,onChange:e=>G(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"draft",children:"Draft"}),(0,x.jsx)("option",{value:"sent",children:"Sent"}),(0,x.jsx)("option",{value:"paid",children:"Paid"}),(0,x.jsx)("option",{value:"overdue",children:"Overdue"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,x.jsxs)(C,{value:H,onChange:e=>K(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Months"}),(0,x.jsx)("option",{value:"2025-01",children:"January 2025"}),(0,x.jsx)("option",{value:"2024-12",children:"December 2024"}),(0,x.jsx)("option",{value:"2024-11",children:"November 2024"})]})]}),(0,x.jsx)(c.an,{children:0===be.length?(0,x.jsxs)(c.ys,{children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No invoices found"}),(0,x.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or create a new invoice"})]}):(0,x.jsxs)(c.bQ,{children:[(0,x.jsx)(c.B_,{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)(c.gU,{children:"Invoice"}),(0,x.jsx)(c.gU,{children:"Restaurant"}),(0,x.jsx)(c.gU,{children:"Issue Date"}),(0,x.jsx)(c.gU,{children:"Due Date"}),(0,x.jsx)(c.gU,{children:"Status"}),(0,x.jsx)(c.gU,{align:"right",children:"Amount"}),(0,x.jsx)(c.gU,{align:"right",children:"Total"}),(0,x.jsx)(c.gU,{children:"Actions"})]})}),(0,x.jsx)("tbody",{children:be.map(e=>(0,x.jsxs)(c.J2,{children:[(0,x.jsx)(c.Bv,{"data-label":"Invoice",children:(0,x.jsxs)(D,{children:[(0,x.jsx)(A,{children:e.invoiceNumber}),(0,x.jsx)(k,{children:e.planType})]})}),(0,x.jsx)(c.Bv,{"data-label":"Restaurant",children:(0,x.jsxs)(D,{children:[(0,x.jsx)(A,{children:e.restaurantName}),(0,x.jsx)(k,{children:e.restaurantManager})]})}),(0,x.jsx)(c.Bv,{"data-label":"Issue Date",align:"center",children:Ce(e.issueDate)}),(0,x.jsx)(c.Bv,{"data-label":"Due Date",align:"center",children:Ce(e.dueDate)}),(0,x.jsx)(c.Bv,{"data-label":"Status",align:"center",children:(0,x.jsx)(S,{status:e.status,children:e.status})}),(0,x.jsx)(c.Bv,{"data-label":"Amount",align:"right",children:(0,x.jsx)(c.DM,{children:(0,l.vv)(e.amount)})}),(0,x.jsx)(c.Bv,{"data-label":"Total",align:"right",children:(0,x.jsx)(c.DM,{highlight:!0,children:(0,l.vv)(e.total)})}),(0,x.jsx)(c.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,x.jsxs)(I,{children:[(0,x.jsx)(E,{variant:"primary",onClick:()=>(e=>{pe(e),re(!0)})(e),children:"View"}),"draft"===e.status&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(E,{onClick:()=>(e=>{pe(e),he({amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,items:e.items}),se(!0)})(e),children:"Edit"}),(0,x.jsx)(E,{onClick:()=>(e=>{window.confirm(`Send invoice ${e.invoiceNumber} to ${e.restaurantName}?`)&&(t(n.map(n=>n.id===e.id?{...n,status:"sent"}:n)),alert(`Invoice ${e.invoiceNumber} has been sent to ${e.restaurantName}`))})(e),children:"Send"})]}),"sent"===e.status&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(E,{variant:"primary",onClick:()=>De(e),children:"Pay Now"}),(0,x.jsx)(E,{onClick:()=>(e=>{window.confirm(`Mark invoice ${e.invoiceNumber} as overdue?`)&&(t(n.map(n=>n.id===e.id?{...n,status:"overdue"}:n)),alert(`Invoice ${e.invoiceNumber} marked as overdue`))})(e),children:"Mark Overdue"})]}),"overdue"===e.status&&(0,x.jsx)(E,{variant:"primary",onClick:()=>De(e),children:"Pay Now"}),"paid"===e.status&&(0,x.jsx)(E,{onClick:()=>window.print(),children:"Print Receipt"})]})})]},e.id))})]})}),X&&(0,x.jsx)(B,{onClick:()=>Z(!1),children:(0,x.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(P,{children:[(0,x.jsx)(T,{children:"Create New Invoice"}),(0,x.jsx)(M,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,x.jsxs)(R,{children:[(0,x.jsxs)($,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Restaurant Name *"}),(0,x.jsx)(U,{type:"text",value:ve.restaurantName,onChange:e=>me({...ve,restaurantName:e.target.value}),placeholder:"Enter restaurant name",required:!0})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Restaurant Manager"}),(0,x.jsx)(U,{type:"text",value:ve.restaurantManager,onChange:e=>me({...ve,restaurantManager:e.target.value}),placeholder:"Enter manager name"})]})]}),(0,x.jsxs)($,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Amount (RM) *"}),(0,x.jsx)(U,{type:"number",step:"0.01",min:"0",value:ve.amount,onChange:e=>me({...ve,amount:e.target.value}),placeholder:"0.00",required:!0}),(0,x.jsx)(J,{children:"Tax (6%) will be calculated automatically"})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Due Date *"}),(0,x.jsx)(U,{type:"date",value:ve.dueDate,onChange:e=>me({...ve,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,x.jsx)($,{children:(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Plan Type"}),(0,x.jsxs)(L,{value:ve.planType,onChange:e=>me({...ve,planType:e.target.value}),children:[(0,x.jsx)("option",{value:"Basic Plan",children:"Basic Plan"}),(0,x.jsx)("option",{value:"Professional Plan",children:"Professional Plan"}),(0,x.jsx)("option",{value:"Enterprise Plan",children:"Enterprise Plan"})]})]})}),(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Description"}),(0,x.jsx)(q,{value:ve.description,onChange:e=>me({...ve,description:e.target.value}),placeholder:"Enter invoice description (optional)",rows:3})]}),ve.amount&&(0,x.jsxs)(W,{children:[(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Subtotal:"}),(0,x.jsx)("span",{children:(0,l.vv)(parseFloat(ve.amount||"0"),ne)})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Tax (6%):"}),(0,x.jsx)("span",{children:(0,l.vv)(.06*parseFloat(ve.amount||"0"),ne)})]}),(0,x.jsxs)(V,{highlight:!0,children:[(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:"Total:"})}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:(0,l.vv)(1.06*parseFloat(ve.amount||"0"),ne)})})]})]})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(v,{variant:"secondary",onClick:()=>Z(!1),children:"Cancel"}),(0,x.jsx)(v,{variant:"primary",onClick:()=>{if(!ve.restaurantName||!ve.amount||!ve.dueDate)return void alert("Please fill in all required fields.");const e=`INV-${(new Date).getFullYear()}-M${String(n.length+1).padStart(3,"0")}`,a=parseFloat(ve.amount),r=.06*a,i=a+r,s={id:`invoice-${Date.now()}`,invoiceNumber:e,restaurantId:ve.restaurantId||`rest-${Date.now()}`,restaurantName:ve.restaurantName,restaurantManager:ve.restaurantManager,issueDate:(new Date).toISOString().split("T")[0],dueDate:ve.dueDate,status:"draft",amount:a,tax:r,total:i,items:[{description:ve.description||`${ve.planType} Subscription`,quantity:1,unitPrice:a,total:a}],billingPeriod:(new Date).toISOString().slice(0,7),planType:ve.planType};t([s,...n]),Z(!1),me({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"}),alert("Invoice created successfully!")},disabled:!ve.restaurantName||!ve.amount||!ve.dueDate,children:"Create Invoice"})]})]})}),ae&&xe&&(0,x.jsx)(B,{onClick:()=>re(!1),children:(0,x.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(P,{children:[(0,x.jsxs)(T,{children:["Invoice Details - ",xe.invoiceNumber]}),(0,x.jsx)(M,{onClick:()=>re(!1),children:"\xd7"})]}),(0,x.jsxs)(R,{children:[(0,x.jsxs)($,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Invoice Number"}),(0,x.jsx)("div",{children:xe.invoiceNumber})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Status"}),(0,x.jsx)(S,{status:xe.status,children:xe.status})]})]}),(0,x.jsxs)($,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Restaurant"}),(0,x.jsx)("div",{children:xe.restaurantName})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Manager"}),(0,x.jsx)("div",{children:xe.restaurantManager})]})]}),(0,x.jsxs)($,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Issue Date"}),(0,x.jsx)("div",{children:xe.issueDate})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Due Date"}),(0,x.jsx)("div",{children:xe.dueDate})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Items"}),xe.items.map((e,n)=>(0,x.jsxs)("div",{style:{padding:"8px",background:"#F8FAFC",borderRadius:"4px",marginBottom:"8px"},children:[e.description," - ",(0,l.vv)(e.total,ne)]},n))]}),(0,x.jsxs)(W,{children:[(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Subtotal:"}),(0,x.jsx)("span",{children:(0,l.vv)(xe.amount,ne)})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Tax (6%):"}),(0,x.jsx)("span",{children:(0,l.vv)(xe.tax,ne)})]}),(0,x.jsxs)(V,{highlight:!0,children:[(0,x.jsx)("span",{children:"Total:"}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:(0,l.vv)(xe.total,ne)})})]})]})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(v,{variant:"secondary",onClick:()=>re(!1),children:"Close"}),(0,x.jsx)(v,{variant:"primary",onClick:()=>window.print(),children:"Print Invoice"})]})]})}),de&&xe&&(0,x.jsx)(B,{onClick:()=>{ce(!1),setTimeout(()=>{le(!0)},100)},children:(0,x.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(P,{children:[(0,x.jsx)(T,{children:"Confirm Payment"}),(0,x.jsx)(M,{onClick:()=>{ce(!1),setTimeout(()=>{le(!0)},100)},children:"\xd7"})]}),(0,x.jsx)(R,{children:(0,x.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,x.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"8px",margin:0},children:"Confirm Payment"}),(0,x.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"24px",margin:"8px 0 24px 0"},children:"Are you sure you want to process this payment?"}),(0,x.jsxs)(W,{children:[(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Invoice:"}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:xe.invoiceNumber})})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Restaurant:"}),(0,x.jsx)("span",{children:xe.restaurantName})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Payment Amount:"}),(0,x.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,l.vv)(xe.total,ne)})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Payment Date:"}),(0,x.jsx)("span",{children:je.paymentDate})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Method:"}),(0,x.jsx)("span",{children:"Bank Transfer"})]})]}),(0,x.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px",fontSize:"13px",color:"#0369A1"},children:"Warning: This action will mark the invoice as PAID and cannot be easily undone."})]})}),(0,x.jsxs)(z,{children:[(0,x.jsx)(v,{variant:"secondary",onClick:()=>{ce(!1),setTimeout(()=>{le(!0)},100)},children:"Cancel"}),(0,x.jsx)(v,{variant:"primary",onClick:async()=>{if(xe)try{const e=await fetch(`${o.JR}/api/invoices/${xe.id}/payment`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({payment_method:je.paymentMethod,transaction_id:je.transactionId,payment_date:je.paymentDate,notes:je.notes,receipt_url:je.receiptFile?"uploaded_receipt_url":null})});if(!e.ok)throw new Error("API call failed");{await e.json();const a={...xe,status:"paid",paidDate:je.paymentDate};t(n.map(e=>e.id===xe.id?a:e))}le(!1),ce(!1),pe(null),ge({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null})}catch(e){console.error("Payment processing error:",e),alert("Error processing payment. Please try again.")}},children:"Confirm Payment"})]})]})}),oe&&xe&&(0,x.jsx)(B,{onClick:()=>le(!1),children:(0,x.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(P,{children:[(0,x.jsxs)(T,{children:["Record Payment - ",xe.invoiceNumber]}),(0,x.jsx)(M,{onClick:()=>le(!1),children:"\xd7"})]}),(0,x.jsxs)(R,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Invoice Details"}),(0,x.jsxs)(W,{children:[(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Restaurant:"}),(0,x.jsx)("span",{children:xe.restaurantName})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Manager:"}),(0,x.jsx)("span",{children:xe.restaurantManager})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Due Date:"}),(0,x.jsx)("span",{children:Ce(xe.dueDate)})]}),(0,x.jsxs)(V,{highlight:!0,children:[(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:"Amount Due:"})}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:(0,l.vv)(xe.total)})})]})]})]}),(0,x.jsxs)($,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Payment Method"}),(0,x.jsx)("div",{style:{padding:"12px 16px",background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",color:"#374151"},children:"Bank Transfer"})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Payment Date *"}),(0,x.jsx)(U,{type:"date",value:je.paymentDate,onChange:e=>ge({...je,paymentDate:e.target.value}),required:!0,max:(new Date).toISOString().split("T")[0]})]})]}),(0,x.jsxs)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",margin:"16px 0"},children:[(0,x.jsx)("p",{style:{margin:"0 0 8px 0",color:"#0369A1",fontSize:"14px",fontWeight:"600"},children:"Bank Transfer Payment Verification"}),(0,x.jsxs)("p",{style:{margin:0,color:"#0369A1",fontSize:"13px"},children:["Please provide at least ONE of the following as proof of your bank transfer:",(0,x.jsx)("br",{}),"\u2022 Transaction ID/Reference Number from your bank",(0,x.jsx)("br",{}),"\u2022 Screenshot/Photo of the transfer receipt"]})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Transaction ID / Reference Number *"}),(0,x.jsx)(U,{type:"text",value:je.transactionId,onChange:e=>ge({...je,transactionId:e.target.value}),placeholder:"Enter transaction ID or reference number"}),(0,x.jsx)(J,{children:"Required if no receipt is uploaded"})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Upload Receipt (Optional) *"}),(0,x.jsx)(U,{type:"file",accept:"image/*,.pdf",onChange:e=>{var n;const t=(null===(n=e.target.files)||void 0===n?void 0:n[0])||null;ge({...je,receiptFile:t})}}),(0,x.jsx)(J,{children:"Upload bank transfer receipt if no transaction ID is provided"}),je.receiptFile&&(0,x.jsxs)("div",{style:{marginTop:"8px",padding:"8px",background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"4px",fontSize:"14px",color:"#0369A1"},children:["File selected: ",je.receiptFile.name]})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Payment Notes"}),(0,x.jsx)(q,{value:je.notes,onChange:e=>ge({...je,notes:e.target.value}),placeholder:"Add any additional notes about this payment",rows:3})]})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(v,{variant:"secondary",onClick:()=>le(!1),children:"Cancel"}),(0,x.jsx)(v,{variant:"primary",onClick:()=>{xe&&(je.transactionId||je.receiptFile?(le(!1),setTimeout(()=>{ce(!0)},100)):alert("Please provide either a Transaction ID/Reference Number OR upload a payment receipt."))},disabled:!je.transactionId&&!je.receiptFile,children:"Record Payment"})]})]})}),ie&&xe&&ue&&(0,x.jsx)(B,{onClick:()=>se(!1),children:(0,x.jsxs)(N,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(P,{children:[(0,x.jsxs)(T,{children:["Edit Invoice - ",xe.invoiceNumber]}),(0,x.jsx)(M,{onClick:()=>se(!1),children:"\xd7"})]}),(0,x.jsxs)(R,{children:[(0,x.jsxs)($,{children:[(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Amount (RM)"}),(0,x.jsx)(U,{type:"number",value:ue.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,a=n+t;he({...ue,amount:e.target.value,tax:t.toFixed(2),total:a.toFixed(2)})}})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Due Date"}),(0,x.jsx)(U,{type:"date",value:ue.dueDate,onChange:e=>he({...ue,dueDate:e.target.value})})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsx)(_,{children:"Status"}),(0,x.jsxs)(L,{value:ue.status,onChange:e=>he({...ue,status:e.target.value}),children:[(0,x.jsx)("option",{value:"draft",children:"Draft"}),(0,x.jsx)("option",{value:"sent",children:"Sent"}),(0,x.jsx)("option",{value:"paid",children:"Paid"}),(0,x.jsx)("option",{value:"overdue",children:"Overdue"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,x.jsxs)(W,{children:[(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Subtotal:"}),(0,x.jsx)("span",{children:(0,l.vv)(parseFloat(ue.amount||0),ne)})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Tax (6%):"}),(0,x.jsx)("span",{children:(0,l.vv)(parseFloat(ue.tax||0),ne)})]}),(0,x.jsxs)(V,{highlight:!0,children:[(0,x.jsx)("span",{children:"Total:"}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:(0,l.vv)(parseFloat(ue.total||0),ne)})})]})]})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(v,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,x.jsx)(v,{variant:"primary",onClick:()=>{if(!xe||!ue)return;const e={...xe,amount:parseFloat(ue.amount),tax:parseFloat(ue.tax),total:parseFloat(ue.total),dueDate:ue.dueDate,status:ue.status,items:ue.items};t(n.map(n=>n.id===xe.id?e:n)),se(!1),pe(null),he(null),alert("Invoice updated successfully!")},children:"Save Changes"})]})]})})]})]})})}}}]);