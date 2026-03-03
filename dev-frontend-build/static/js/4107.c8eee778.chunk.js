"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4107],{4021:(e,n,t)=>{t.d(n,{i1:()=>s});var r=t(9950),a=t(1367),i=t(6038);const s=()=>{const{user:e}=(0,a.As)(),[n,t]=(0,r.useState)("RM"),[s,o]=(0,r.useState)(Object.keys(i.DL)),[l,d]=(0,r.useState)(!0),[c,x]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let a=r>=0?n[r+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";t(r)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),x("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:l,error:c}}},4107:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Y});var r=t(9950),a=t(4752),i=t(1367),s=t(6910),o=t(6038),l=t(4021),d=t(7617),c=t(8409),x=t(4414);const p=a.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,u=a.Ay.div`
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
`,h=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,j=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=a.Ay.div`
  display: flex;
  gap: 12px;
`,m=a.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,v=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,b=a.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,f=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=a.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,C=a.Ay.input`
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
`,A=a.Ay.div``,k=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,D=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,S=a.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"paid":return"#ECFDF5";case"sent":return"#DBEAFE";case"draft":default:return"#F3F4F6";case"overdue":return"#FEE2E2";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"paid":return"#059669";case"sent":return"#1E40AF";case"draft":default:return"#6B7280";case"overdue":case"cancelled":return"#DC2626"}}};
`,E=a.Ay.button`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,B=(0,a.Ay)(c.AA)`
  max-width: 160px;

  @media (max-width: 1024px) {
    max-width: none;
  }
`,I=a.Ay.div`
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
`,P=a.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,N=a.Ay.h3`
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
`,M=a.Ay.div`
  padding: 0 24px 24px 24px;
  max-height: 400px;
  overflow-y: auto;
`,R=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
`,O=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,$=a.Ay.div`
  margin-bottom: 20px;
`,_=a.Ay.label`
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
`,L=a.Ay.select`
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
`,q=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,J=a.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,V=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  
  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,Y=()=>{const{user:e}=(0,i.As)(),[n,t]=(0,r.useState)([]),[a,Y]=(0,r.useState)(""),[H,Q]=(0,r.useState)("all"),[G,K]=(0,r.useState)("all"),[X,Z]=(0,r.useState)(!1),{defaultCurrency:ee}=(0,l.i1)(),[ne,te]=(0,r.useState)("RM");(0,r.useEffect)(()=>{ee&&te(ee)},[ee]);const[re,ae]=(0,r.useState)(!1),[ie,se]=(0,r.useState)(!1),[oe,le]=(0,r.useState)(!1),[de,ce]=(0,r.useState)(!1),[xe,pe]=(0,r.useState)(null),[ue,he]=(0,r.useState)(null),[je,ge]=(0,r.useState)({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),[me,ve]=(0,r.useState)({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"}),[ye,be]=(0,r.useState)(!1),[fe,Fe]=(0,r.useState)(null),[Ce,we]=(0,r.useState)(""),[Ae,ke]=(0,r.useState)("");(0,r.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",r=await fetch(`${s.JR}/api/invoices/manager/${n}`);if(r.ok){const e=await r.json();t(e)}else console.error("Failed to fetch invoices from API"),t([])}catch(n){console.error("Failed to fetch invoices:",n),t([])}})()},[e]);const De=n.filter(e=>{var n;const t=e.restaurantName.toLowerCase().includes(a.toLowerCase())||e.invoiceNumber.toLowerCase().includes(a.toLowerCase())||(null===(n=e.restaurantManager)||void 0===n?void 0:n.toLowerCase().includes(a.toLowerCase()||"")),r="all"===H||e.status===H,i="all"===G||e.issueDate.includes(G);return t&&r&&i}),Se=n.length,Ee=n.filter(e=>"paid"===e.status).length,Be=n.filter(e=>"overdue"===e.status).length,Ie=n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),Te=e=>new Date(e).toLocaleDateString("en-MY"),Pe=e=>{pe(e),ge({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),le(!0)},Ne=e=>{(e=>{Fe(e),we("overdue"),be(!0)})(e)};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(p,{children:[(0,x.jsxs)(u,{children:[(0,x.jsx)(j,{children:"Restaurant Invoice Management"}),(0,x.jsxs)(g,{children:[(0,x.jsx)(m,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalInvoices:n.length,summary:{totalAmount:n.reduce((e,n)=>e+n.total,0),paidInvoices:n.filter(e=>"paid"===e.status).length,overdueInvoices:n.filter(e=>"overdue"===e.status).length,draftInvoices:n.filter(e=>"draft"===e.status).length,paidAmount:n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),outstandingAmount:n.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0)},statusBreakdown:{draft:n.filter(e=>"draft"===e.status).length,sent:n.filter(e=>"sent"===e.status).length,paid:n.filter(e=>"paid"===e.status).length,overdue:n.filter(e=>"overdue"===e.status).length,cancelled:n.filter(e=>"cancelled"===e.status).length},invoices:n.map(e=>({invoiceNumber:e.invoiceNumber,restaurantName:e.restaurantName,restaurantManager:e.restaurantManager,issueDate:e.issueDate,dueDate:e.dueDate,paidDate:e.paidDate||"N/A",status:e.status,amount:e.amount,tax:e.tax,total:e.total,billingPeriod:e.billingPeriod,planType:e.planType}))},t=JSON.stringify(e,null,2),r=new Blob([t],{type:"application/json"}),a=URL.createObjectURL(r),i=document.createElement("a");i.href=a,i.download=`restaurant-invoices-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a)},children:"Export"}),(0,x.jsx)(m,{variant:"primary",onClick:()=>{Z(!0)},children:"Create Invoice"})]})]}),(0,x.jsxs)(h,{children:[(0,x.jsxs)(v,{children:[(0,x.jsxs)(y,{color:"#059669",children:[(0,x.jsx)(b,{children:Se}),(0,x.jsx)(f,{children:"Total Invoices"})]}),(0,x.jsxs)(y,{color:"#2563EB",children:[(0,x.jsx)(b,{children:Ee}),(0,x.jsx)(f,{children:"Paid Invoices"})]}),(0,x.jsxs)(y,{color:"#DC2626",children:[(0,x.jsx)(b,{children:Be}),(0,x.jsx)(f,{children:"Overdue Invoices"})]}),(0,x.jsxs)(y,{color:"#7C3AED",children:[(0,x.jsx)(b,{children:(0,o.vv)(Ie)}),(0,x.jsx)(f,{children:"Total Revenue"})]})]}),(0,x.jsxs)(F,{children:[(0,x.jsx)(C,{type:"text",placeholder:"Search by invoice number, restaurant, or plan type...",value:a,onChange:e=>Y(e.target.value)}),(0,x.jsxs)(w,{value:H,onChange:e=>Q(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"draft",children:"Draft"}),(0,x.jsx)("option",{value:"sent",children:"Sent"}),(0,x.jsx)("option",{value:"paid",children:"Paid"}),(0,x.jsx)("option",{value:"overdue",children:"Overdue"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,x.jsxs)(w,{value:G,onChange:e=>K(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Months"}),(0,x.jsx)("option",{value:"2025-01",children:"January 2025"}),(0,x.jsx)("option",{value:"2024-12",children:"December 2024"}),(0,x.jsx)("option",{value:"2024-11",children:"November 2024"})]})]}),(0,x.jsx)(c.an,{children:0===De.length?(0,x.jsxs)(c.ys,{children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No invoices found"}),(0,x.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or create a new invoice"})]}):(0,x.jsxs)(c.bQ,{children:[(0,x.jsx)(c.B_,{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)(c.gU,{children:"Invoice"}),(0,x.jsx)(c.gU,{children:"Restaurant"}),(0,x.jsx)(c.gU,{children:"Issue Date"}),(0,x.jsx)(c.gU,{children:"Due Date"}),(0,x.jsx)(c.gU,{children:"Status"}),(0,x.jsx)(c.gU,{align:"right",children:"Amount"}),(0,x.jsx)(c.gU,{align:"right",children:"Total"}),(0,x.jsx)(c.gU,{children:"Actions"})]})}),(0,x.jsx)("tbody",{children:De.map(e=>(0,x.jsxs)(c.J2,{children:[(0,x.jsx)(c.Bv,{"data-label":"Invoice",children:(0,x.jsxs)(A,{children:[(0,x.jsx)(k,{children:e.invoiceNumber}),(0,x.jsx)(D,{children:e.planType})]})}),(0,x.jsx)(c.Bv,{"data-label":"Restaurant",children:(0,x.jsxs)(A,{children:[(0,x.jsx)(k,{children:e.restaurantName}),(0,x.jsx)(D,{children:e.restaurantManager})]})}),(0,x.jsx)(c.Bv,{"data-label":"Issue Date",align:"center",children:Te(e.issueDate)}),(0,x.jsx)(c.Bv,{"data-label":"Due Date",align:"center",children:Te(e.dueDate)}),(0,x.jsx)(c.Bv,{"data-label":"Status",align:"center",children:(0,x.jsx)(S,{status:e.status,children:e.status})}),(0,x.jsx)(c.Bv,{"data-label":"Amount",align:"right",children:(0,x.jsx)(c.DM,{children:(0,o.vv)(e.amount)})}),(0,x.jsx)(c.Bv,{"data-label":"Total",align:"right",children:(0,x.jsx)(c.DM,{highlight:!0,children:0===e.total?(0,x.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,o.vv)(e.total)})}),(0,x.jsx)(c.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,x.jsxs)(B,{children:[(0,x.jsx)(E,{variant:"primary",onClick:()=>(e=>{pe(e),ae(!0)})(e),children:"View"}),"draft"===e.status&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(E,{onClick:()=>(e=>{pe(e),he({amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,items:e.items}),se(!0)})(e),children:"Edit"}),(0,x.jsx)(E,{onClick:()=>(e=>{Fe(e),we("send"),be(!0)})(e),children:"Send"})]}),"sent"===e.status&&(0,x.jsxs)(x.Fragment,{children:[e.total>0&&(0,x.jsx)(E,{variant:"primary",onClick:()=>Pe(e),children:"Pay Now"}),(0,x.jsx)(E,{onClick:()=>Ne(e),children:"Mark Overdue"})]}),"overdue"===e.status&&e.total>0&&(0,x.jsx)(E,{variant:"primary",onClick:()=>Pe(e),children:"Pay Now"}),"paid"===e.status&&(0,x.jsx)(E,{onClick:()=>window.print(),children:"Print Receipt"})]})})]},e.id))})]})}),X&&(0,x.jsx)(I,{onClick:()=>Z(!1),children:(0,x.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(P,{children:[(0,x.jsx)(N,{children:"Create New Invoice"}),(0,x.jsx)(z,{onClick:()=>Z(!1),children:"\xd7"})]}),(0,x.jsxs)(M,{children:[(0,x.jsxs)(O,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Restaurant Name *"}),(0,x.jsx)(U,{type:"text",value:me.restaurantName,onChange:e=>ve({...me,restaurantName:e.target.value}),placeholder:"Enter restaurant name",required:!0})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Restaurant Manager"}),(0,x.jsx)(U,{type:"text",value:me.restaurantManager,onChange:e=>ve({...me,restaurantManager:e.target.value}),placeholder:"Enter manager name"})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Amount (RM) *"}),(0,x.jsx)(U,{type:"number",step:"0.01",min:"0",value:me.amount,onChange:e=>ve({...me,amount:e.target.value}),placeholder:"0.00",required:!0}),(0,x.jsx)(q,{children:"Tax (6%) will be calculated automatically"})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Due Date *"}),(0,x.jsx)(U,{type:"date",value:me.dueDate,onChange:e=>ve({...me,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,x.jsx)(O,{children:(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Plan Type"}),(0,x.jsxs)(L,{value:me.planType,onChange:e=>ve({...me,planType:e.target.value}),children:[(0,x.jsx)("option",{value:"Basic Plan",children:"Basic Plan"}),(0,x.jsx)("option",{value:"Professional Plan",children:"Professional Plan"}),(0,x.jsx)("option",{value:"Enterprise Plan",children:"Enterprise Plan"})]})]})}),(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Description"}),(0,x.jsx)(W,{value:me.description,onChange:e=>ve({...me,description:e.target.value}),placeholder:"Enter invoice description (optional)",rows:3})]}),me.amount&&(0,x.jsxs)(J,{children:[(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Subtotal:"}),(0,x.jsx)("span",{children:(0,o.vv)(parseFloat(me.amount||"0"),ne)})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Tax (6%):"}),(0,x.jsx)("span",{children:(0,o.vv)(.06*parseFloat(me.amount||"0"),ne)})]}),(0,x.jsxs)(V,{highlight:!0,children:[(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:"Total:"})}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:(0,o.vv)(1.06*parseFloat(me.amount||"0"),ne)})})]})]})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(m,{variant:"secondary",onClick:()=>Z(!1),children:"Cancel"}),(0,x.jsx)(m,{variant:"primary",onClick:()=>{if(!me.restaurantName||!me.amount||!me.dueDate)return void ke("Please fill in all required fields.");const e=`INV-${(new Date).getFullYear()}-M${String(n.length+1).padStart(3,"0")}`,r=parseFloat(me.amount),a=.06*r,i=r+a,s={id:`invoice-${Date.now()}`,invoiceNumber:e,restaurantId:me.restaurantId||`rest-${Date.now()}`,restaurantName:me.restaurantName,restaurantManager:me.restaurantManager,issueDate:(new Date).toISOString().split("T")[0],dueDate:me.dueDate,status:"draft",amount:r,tax:a,total:i,items:[{description:me.description||`${me.planType} Subscription`,quantity:1,unitPrice:r,total:r}],billingPeriod:(new Date).toISOString().slice(0,7),planType:me.planType};t([s,...n]),Z(!1),ve({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"})},disabled:!me.restaurantName||!me.amount||!me.dueDate,children:"Create Invoice"})]})]})}),re&&xe&&(0,x.jsx)(I,{onClick:()=>ae(!1),children:(0,x.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(P,{children:[(0,x.jsxs)(N,{children:["Invoice Details - ",xe.invoiceNumber]}),(0,x.jsx)(z,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,x.jsxs)(M,{children:[(0,x.jsxs)(O,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Invoice Number"}),(0,x.jsx)("div",{children:xe.invoiceNumber})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Status"}),(0,x.jsx)(S,{status:xe.status,children:xe.status})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Restaurant"}),(0,x.jsx)("div",{children:xe.restaurantName})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Manager"}),(0,x.jsx)("div",{children:xe.restaurantManager})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Issue Date"}),(0,x.jsx)("div",{children:xe.issueDate})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Due Date"}),(0,x.jsx)("div",{children:xe.dueDate})]})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Items"}),xe.items.map((e,n)=>(0,x.jsxs)("div",{style:{padding:"8px",background:"#F8FAFC",borderRadius:"4px",marginBottom:"8px"},children:[e.description," - ",(0,o.vv)(e.total,ne)]},n))]}),(0,x.jsxs)(J,{children:[(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Subtotal:"}),(0,x.jsx)("span",{children:(0,o.vv)(xe.subtotalBeforeDiscount||xe.amount,ne)})]}),xe.discountAmount&&xe.discountAmount>0&&(0,x.jsxs)(V,{children:[(0,x.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===xe.discountType?` (${xe.discountValue}%)`:"",":"]}),(0,x.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(xe.discountAmount,ne)]})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Tax (6%):"}),(0,x.jsx)("span",{children:(0,o.vv)(xe.tax,ne)})]}),(0,x.jsxs)(V,{highlight:!0,children:[(0,x.jsx)("span",{children:"Total:"}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:(0,o.vv)(xe.total,ne)})})]})]})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(m,{variant:"secondary",onClick:()=>ae(!1),children:"Close"}),(0,x.jsx)(m,{variant:"primary",onClick:()=>window.print(),children:"Print Invoice"})]})]})}),de&&xe&&(0,x.jsx)(I,{onClick:()=>{ce(!1),setTimeout(()=>{le(!0)},100)},children:(0,x.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(P,{children:[(0,x.jsx)(N,{children:"Confirm Payment"}),(0,x.jsx)(z,{onClick:()=>{ce(!1),setTimeout(()=>{le(!0)},100)},children:"\xd7"})]}),(0,x.jsx)(M,{children:(0,x.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,x.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"8px",margin:0},children:"Confirm Payment"}),(0,x.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"24px",margin:"8px 0 24px 0"},children:"Are you sure you want to process this payment?"}),(0,x.jsxs)(J,{children:[(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Invoice:"}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:xe.invoiceNumber})})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Restaurant:"}),(0,x.jsx)("span",{children:xe.restaurantName})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Payment Amount:"}),(0,x.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,o.vv)(xe.total,ne)})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Payment Date:"}),(0,x.jsx)("span",{children:je.paymentDate})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Method:"}),(0,x.jsx)("span",{children:"Bank Transfer"})]})]}),(0,x.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px",fontSize:"13px",color:"#0369A1"},children:"Warning: This action will mark the invoice as PAID and cannot be easily undone."})]})}),(0,x.jsxs)(R,{children:[(0,x.jsx)(m,{variant:"secondary",onClick:()=>{ce(!1),setTimeout(()=>{le(!0)},100)},children:"Cancel"}),(0,x.jsx)(m,{variant:"primary",onClick:async()=>{if(xe)try{const e=await fetch(`${s.JR}/api/invoices/${xe.id}/payment`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({payment_method:je.paymentMethod,transaction_id:je.transactionId,payment_date:je.paymentDate,notes:je.notes,receipt_url:je.receiptFile?"uploaded_receipt_url":null})});if(!e.ok)throw new Error("API call failed");{await e.json();const r={...xe,status:"paid",paidDate:je.paymentDate};t(n.map(e=>e.id===xe.id?r:e))}le(!1),ce(!1),pe(null),ge({paymentMethod:"bank_transfer",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null})}catch(e){console.error("Payment processing error:",e),ke("Error processing payment. Please try again.")}},children:"Confirm Payment"})]})]})}),oe&&xe&&(0,x.jsx)(I,{onClick:()=>le(!1),children:(0,x.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(P,{children:[(0,x.jsxs)(N,{children:["Record Payment - ",xe.invoiceNumber]}),(0,x.jsx)(z,{onClick:()=>le(!1),children:"\xd7"})]}),(0,x.jsxs)(M,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Invoice Details"}),(0,x.jsxs)(J,{children:[(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Restaurant:"}),(0,x.jsx)("span",{children:xe.restaurantName})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Manager:"}),(0,x.jsx)("span",{children:xe.restaurantManager})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Due Date:"}),(0,x.jsx)("span",{children:Te(xe.dueDate)})]}),(0,x.jsxs)(V,{highlight:!0,children:[(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:"Amount Due:"})}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:(0,o.vv)(xe.total)})})]})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Payment Method"}),(0,x.jsx)("div",{style:{padding:"12px 16px",background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",color:"#374151"},children:"Bank Transfer"})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Payment Date *"}),(0,x.jsx)(U,{type:"date",value:je.paymentDate,onChange:e=>ge({...je,paymentDate:e.target.value}),required:!0,max:(new Date).toISOString().split("T")[0]})]})]}),(0,x.jsxs)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",margin:"16px 0"},children:[(0,x.jsx)("p",{style:{margin:"0 0 8px 0",color:"#0369A1",fontSize:"14px",fontWeight:"600"},children:"Bank Transfer Payment Verification"}),(0,x.jsxs)("p",{style:{margin:0,color:"#0369A1",fontSize:"13px"},children:["Please provide at least ONE of the following as proof of your bank transfer:",(0,x.jsx)("br",{}),"\u2022 Transaction ID/Reference Number from your bank",(0,x.jsx)("br",{}),"\u2022 Screenshot/Photo of the transfer receipt"]})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Transaction ID / Reference Number *"}),(0,x.jsx)(U,{type:"text",value:je.transactionId,onChange:e=>ge({...je,transactionId:e.target.value}),placeholder:"Enter transaction ID or reference number"}),(0,x.jsx)(q,{children:"Required if no receipt is uploaded"})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Upload Receipt (Optional) *"}),(0,x.jsx)(U,{type:"file",accept:"image/*,.pdf",onChange:e=>{var n;const t=(null===(n=e.target.files)||void 0===n?void 0:n[0])||null;ge({...je,receiptFile:t})}}),(0,x.jsx)(q,{children:"Upload bank transfer receipt if no transaction ID is provided"}),je.receiptFile&&(0,x.jsxs)("div",{style:{marginTop:"8px",padding:"8px",background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"4px",fontSize:"14px",color:"#0369A1"},children:["File selected: ",je.receiptFile.name]})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Payment Notes"}),(0,x.jsx)(W,{value:je.notes,onChange:e=>ge({...je,notes:e.target.value}),placeholder:"Add any additional notes about this payment",rows:3})]})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(m,{variant:"secondary",onClick:()=>le(!1),children:"Cancel"}),(0,x.jsx)(m,{variant:"primary",onClick:()=>{xe&&(je.transactionId||je.receiptFile?(le(!1),setTimeout(()=>{ce(!0)},100)):ke("Please provide either a Transaction ID/Reference Number OR upload a payment receipt."))},disabled:!je.transactionId&&!je.receiptFile,children:"Record Payment"})]})]})}),ie&&xe&&ue&&(0,x.jsx)(I,{onClick:()=>se(!1),children:(0,x.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,x.jsxs)(P,{children:[(0,x.jsxs)(N,{children:["Edit Invoice - ",xe.invoiceNumber]}),(0,x.jsx)(z,{onClick:()=>se(!1),children:"\xd7"})]}),(0,x.jsxs)(M,{children:[(0,x.jsxs)(O,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Amount (RM)"}),(0,x.jsx)(U,{type:"number",value:ue.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,r=n+t;he({...ue,amount:e.target.value,tax:t.toFixed(2),total:r.toFixed(2)})}})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Due Date"}),(0,x.jsx)(U,{type:"date",value:ue.dueDate,onChange:e=>he({...ue,dueDate:e.target.value})})]})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(_,{children:"Status"}),(0,x.jsxs)(L,{value:ue.status,onChange:e=>he({...ue,status:e.target.value}),children:[(0,x.jsx)("option",{value:"draft",children:"Draft"}),(0,x.jsx)("option",{value:"sent",children:"Sent"}),(0,x.jsx)("option",{value:"paid",children:"Paid"}),(0,x.jsx)("option",{value:"overdue",children:"Overdue"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,x.jsxs)(J,{children:[(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Subtotal:"}),(0,x.jsx)("span",{children:(0,o.vv)(parseFloat(ue.amount||0),ne)})]}),xe&&xe.discountAmount&&xe.discountAmount>0&&(0,x.jsxs)(V,{children:[(0,x.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===xe.discountType?` (${xe.discountValue}%)`:"",":"]}),(0,x.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(xe.discountAmount,ne)]})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)("span",{children:"Tax (6%):"}),(0,x.jsx)("span",{children:(0,o.vv)(parseFloat(ue.tax||0),ne)})]}),(0,x.jsxs)(V,{highlight:!0,children:[(0,x.jsx)("span",{children:"Total:"}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:(0,o.vv)(parseFloat(ue.total||0),ne)})})]})]})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(m,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,x.jsx)(m,{variant:"primary",onClick:()=>{if(!xe||!ue)return;const e={...xe,amount:parseFloat(ue.amount),tax:parseFloat(ue.tax),total:parseFloat(ue.total),dueDate:ue.dueDate,status:ue.status,items:ue.items};t(n.map(n=>n.id===xe.id?e:n)),se(!1),pe(null),he(null)},children:"Save Changes"})]})]})})]})]}),Ae&&(0,x.jsxs)("div",{style:{position:"fixed",bottom:24,right:24,zIndex:9999,background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:8,padding:"12px 20px",color:"#DC2626",fontSize:14,fontWeight:500,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",display:"flex",alignItems:"center",gap:12},children:[(0,x.jsx)("span",{children:Ae}),(0,x.jsx)("button",{onClick:()=>ke(""),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontWeight:700,fontSize:16},children:"x"})]}),(0,x.jsx)(d.A,{isOpen:ye,title:"send"===Ce?"Send Invoice":"Mark as Overdue",message:"send"===Ce?`Send invoice ${null===fe||void 0===fe?void 0:fe.invoiceNumber} to ${null===fe||void 0===fe?void 0:fe.restaurantName}?`:`Mark invoice ${null===fe||void 0===fe?void 0:fe.invoiceNumber} as overdue?`,onConfirm:()=>{fe&&(be(!1),"send"===Ce?t(n.map(e=>e.id===fe.id?{...e,status:"sent"}:e)):"overdue"===Ce&&t(n.map(e=>e.id===fe.id?{...e,status:"overdue"}:e)),Fe(null),we(""))},onCancel:()=>{be(!1),Fe(null),we("")},confirmText:"send"===Ce?"Send":"Mark Overdue",cancelText:"Cancel",type:"send"===Ce?"info":"warning"})]})}},7617:(e,n,t)=>{t.d(n,{A:()=>p});t(9950);var r=t(4752),a=t(9610),i=t(4414);const s=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,o=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=r.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=r.Ay.button`
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
`,p=e=>{let{isOpen:n,title:t,message:r,onConfirm:p,onCancel:u,confirmText:h="Confirm",cancelText:j="Cancel",type:g="warning"}=e;return n?(0,i.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,i.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(o,{children:[(0,i.jsx)(l,{children:t}),(0,i.jsx)(d,{children:r})]}),(0,i.jsxs)(c,{children:[(0,i.jsx)(x,{variant:"secondary",onClick:u,children:j}),(0,i.jsx)(x,{variant:"primary",type:g,onClick:p,children:h})]})]})}):null}}}]);