"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4107],{4021:(e,n,t)=>{t.d(n,{i1:()=>s});var a=t(9950),i=t(1367),r=t(6038);const s=()=>{const{user:e}=(0,i.As)(),[n,t]=(0,a.useState)("RM"),[s]=(0,a.useState)(Object.keys(r.DL)),[o,d]=(0,a.useState)(!0),[l,c]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),a=n.indexOf("restaurant");let i=a>=0?n[a+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var r;const e=await n.json(),a=e.currency||(null===(r=e.operation_settings)||void 0===r?void 0:r.currency)||"MYR";t(a)}else t("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),c("Failed to load currency settings"),t("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:o,error:l}}},4107:(e,n,t)=>{t.r(n),t.d(n,{default:()=>_});var a=t(9950),i=t(4752),r=t(1367),s=t(6910),o=t(6038),d=t(4021),l=t(7617),c=t(8409),p=t(4414);const x=i.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,u=i.Ay.div`
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
`,h=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=i.Ay.div`
  display: flex;
  gap: 12px;
`,v=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"success"===e.variant?"\n    background: #10B981;\n    color: white;\n\n    &:hover {\n      background: #059669;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,j=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`,b=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,f=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`,w=i.Ay.input`
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
`,C=i.Ay.select`
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
`,A=i.Ay.div``,P=i.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,k=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,S=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"paid":return"#ECFDF5";case"sent":return"#DBEAFE";case"draft":default:return"#F3F4F6";case"overdue":return"#FEE2E2";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"paid":return"#059669";case"sent":return"#1E40AF";case"draft":default:return"#6B7280";case"overdue":case"cancelled":return"#DC2626"}}};
`,D=i.Ay.button`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"success"===e.variant?"\n    background: #10B981;\n    color: white;\n    border-color: #10B981;\n\n    &:hover {\n      background: #059669;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,B=(0,i.Ay)(c.AA)`
  max-width: 160px;

  @media (max-width: 1024px) {
    max-width: none;
  }
`,E=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,I=i.Ay.div`
  margin-bottom: 20px;
`,z=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,T=i.Ay.input`
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
`,M=i.Ay.select`
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
`,N=i.Ay.textarea`
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
`,R=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,$=i.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,O=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  
  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,_=()=>{var e;const{t:n}=useTranslation("admin"),{user:t}=(0,r.As)(),[i,_]=(0,a.useState)([]),[U,L]=(0,a.useState)(""),[W,q]=(0,a.useState)("all"),[Y,J]=(0,a.useState)("all"),[H,V]=(0,a.useState)(!1),{defaultCurrency:Q}=(0,d.i1)(),[G,K]=(0,a.useState)("RM");(0,a.useEffect)(()=>{Q&&K(Q)},[Q]);const[X,Z]=(0,a.useState)(!1),[ee,ne]=(0,a.useState)(!1),[te,ae]=(0,a.useState)(!1),[ie,re]=(0,a.useState)(!1),[se,oe]=(0,a.useState)(null),[de,le]=(0,a.useState)(null),[ce,pe]=(0,a.useState)([]),[xe,ue]=(0,a.useState)(!1),[he,ge]=(0,a.useState)({paymentMethod:"",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptImage:""}),[me,ve]=(0,a.useState)({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"}),[je,ye]=(0,a.useState)(!1),[be,fe]=(0,a.useState)(null),[Fe,we]=(0,a.useState)(""),[Ce,Ae]=(0,a.useState)(""),Pe=async()=>{try{const e=(null===t||void 0===t?void 0:t.managerId)||(null===t||void 0===t?void 0:t.id)||"2",n=await fetch(`${s.JR}/api/invoices/manager/${e}`);if(n.ok){const e=await n.json();_(e)}else console.error("Failed to fetch invoices from API"),_([])}catch(e){console.error("Failed to fetch invoices:",e),_([])}};(0,a.useEffect)(()=>{t&&Pe()},[t]);const ke=i.filter(e=>{var n;const t=e.restaurantName.toLowerCase().includes(U.toLowerCase())||e.invoiceNumber.toLowerCase().includes(U.toLowerCase())||(null===(n=e.restaurantManager)||void 0===n?void 0:n.toLowerCase().includes(U.toLowerCase()||"")),a="all"===W||e.status===W,i="all"===Y||e.issueDate.includes(Y);return t&&a&&i}),Se=i.length,De=i.filter(e=>"paid"===e.status).length,Be=i.filter(e=>"overdue"===e.status).length,Ee=i.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),Ie=e=>new Date(e).toLocaleDateString("en-MY"),ze=async e=>{oe(e),ge({paymentMethod:"",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptImage:""}),Ae(""),await(async(e,n,t)=>{ue(!0);try{let a=`/api/admin/payment-settings/available/${e}`;"brand"===n&&t?a=`/api/brands/${t}/payment-settings/available/${e}`:"foodcourt"===n&&t&&(a=`/api/foodcourts/${t}/payment-settings/available/${e}`);const i=localStorage.getItem("auth_token"),r=await fetch(a,{headers:{Authorization:`Bearer ${i}`}});if(r.ok){const e=await r.json();pe(e.methods||[]),e.methods&&e.methods.length>0&&ge(n=>({...n,paymentMethod:e.methods[0].id}))}else pe([])}catch(a){console.error("Error fetching payment methods:",a),pe([])}finally{ue(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId),ae(!0)},Te=e=>{(e=>{fe(e),we("overdue"),ye(!0)})(e)};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(g,{children:n("admin:invoicesPage.restaurantInvoiceManagement")}),(0,p.jsxs)(m,{children:[(0,p.jsx)(v,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalInvoices:i.length,summary:{totalAmount:i.reduce((e,n)=>e+n.total,0),paidInvoices:i.filter(e=>"paid"===e.status).length,overdueInvoices:i.filter(e=>"overdue"===e.status).length,draftInvoices:i.filter(e=>"draft"===e.status).length,paidAmount:i.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),outstandingAmount:i.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0)},statusBreakdown:{draft:i.filter(e=>"draft"===e.status).length,sent:i.filter(e=>"sent"===e.status).length,paid:i.filter(e=>"paid"===e.status).length,overdue:i.filter(e=>"overdue"===e.status).length,cancelled:i.filter(e=>"cancelled"===e.status).length},invoices:i.map(e=>({invoiceNumber:e.invoiceNumber,restaurantName:e.restaurantName,restaurantManager:e.restaurantManager,issueDate:e.issueDate,dueDate:e.dueDate,paidDate:e.paidDate||"N/A",status:e.status,amount:e.amount,tax:e.tax,total:e.total,billingPeriod:e.billingPeriod,planType:e.planType}))},n=JSON.stringify(e,null,2),t=new Blob([n],{type:"application/json"}),a=URL.createObjectURL(t),r=document.createElement("a");r.href=a,r.download=`restaurant-invoices-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(a)},children:n("admin:invoicesPage.export")}),(0,p.jsx)(v,{variant:"primary",onClick:()=>{V(!0)},children:n("admin:invoicesPage.createInvoice")})]})]}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(j,{children:[(0,p.jsxs)(y,{color:"#059669",children:[(0,p.jsx)(b,{children:Se}),(0,p.jsx)(f,{children:n("admin:invoicesPage.totalInvoices")})]}),(0,p.jsxs)(y,{color:"#2563EB",children:[(0,p.jsx)(b,{children:De}),(0,p.jsx)(f,{children:n("admin:invoicesPage.paidInvoices")})]}),(0,p.jsxs)(y,{color:"#DC2626",children:[(0,p.jsx)(b,{children:Be}),(0,p.jsx)(f,{children:n("admin:invoicesPage.overdueInvoices")})]}),(0,p.jsxs)(y,{color:"#7C3AED",children:[(0,p.jsx)(b,{children:(0,o.vv)(Ee)}),(0,p.jsx)(f,{children:n("admin:invoicesPage.totalRevenue")})]})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(w,{type:"text",placeholder:"Search by invoice number, restaurant, or plan type...",value:U,onChange:e=>L(e.target.value)}),(0,p.jsxs)(C,{value:W,onChange:e=>q(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:n("admin:invoicesPage.allStatus")}),(0,p.jsx)("option",{value:"draft",children:n("admin:invoicesPage.draft")}),(0,p.jsx)("option",{value:"sent",children:n("admin:invoicesPage.sent")}),(0,p.jsx)("option",{value:"paid",children:n("admin:invoicesPage.paid")}),(0,p.jsx)("option",{value:"overdue",children:n("admin:invoicesPage.overdue")}),(0,p.jsx)("option",{value:"cancelled",children:n("admin:invoicesPage.cancelled")})]}),(0,p.jsxs)(C,{value:Y,onChange:e=>J(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:n("admin:invoicesPage.allMonths")}),(0,p.jsx)("option",{value:"2025-01",children:n("admin:invoicesPage.january2025")}),(0,p.jsx)("option",{value:"2024-12",children:n("admin:invoicesPage.december2024")}),(0,p.jsx)("option",{value:"2024-11",children:n("admin:invoicesPage.november2024")})]})]}),(0,p.jsx)(c.an,{children:0===ke.length?(0,p.jsxs)(c.ys,{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No invoices found"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or create a new invoice"})]}):(0,p.jsxs)(c.bQ,{children:[(0,p.jsx)(c.B_,{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)(c.gU,{align:"left",children:n("admin:invoicesPage.invoice")}),(0,p.jsx)(c.gU,{align:"left",children:n("admin:invoicesPage.restaurant")}),(0,p.jsx)(c.gU,{align:"center",children:n("admin:invoicesPage.issueDate")}),(0,p.jsx)(c.gU,{align:"center",children:n("admin:invoicesPage.dueDate")}),(0,p.jsx)(c.gU,{align:"center",children:n("admin:invoicesPage.status")}),(0,p.jsx)(c.gU,{align:"right",children:n("admin:invoicesPage.amount")}),(0,p.jsx)(c.gU,{align:"right",children:n("admin:invoicesPage.total")}),(0,p.jsx)(c.gU,{align:"left",children:n("admin:invoicesPage.actions")})]})}),(0,p.jsx)("tbody",{children:ke.map(e=>(0,p.jsxs)(c.J2,{children:[(0,p.jsx)(c.Bv,{"data-label":"Invoice",align:"left",children:(0,p.jsxs)(A,{children:[(0,p.jsx)(P,{children:e.invoiceNumber}),(0,p.jsx)(k,{children:e.planType})]})}),(0,p.jsx)(c.Bv,{"data-label":"Restaurant",align:"left",children:(0,p.jsxs)(A,{children:[(0,p.jsx)(P,{children:e.restaurantName}),(0,p.jsx)(k,{children:e.restaurantManager})]})}),(0,p.jsx)(c.Bv,{"data-label":"Issue Date",align:"center",children:Ie(e.issueDate)}),(0,p.jsx)(c.Bv,{"data-label":"Due Date",align:"center",children:Ie(e.dueDate)}),(0,p.jsx)(c.Bv,{"data-label":"Status",align:"center",children:(0,p.jsx)(S,{status:e.status,children:e.status})}),(0,p.jsx)(c.Bv,{"data-label":"Amount",align:"right",children:(0,p.jsx)(c.DM,{children:(0,o.vv)(e.amount)})}),(0,p.jsx)(c.Bv,{"data-label":"Total",align:"right",children:(0,p.jsx)(c.DM,{highlight:!0,children:0===Number(e.total)?(0,p.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:n("admin:invoicesPage.free")}):(0,o.vv)(e.total)})}),(0,p.jsx)(c.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,p.jsxs)(B,{children:[(0,p.jsx)(D,{variant:"primary",onClick:()=>(e=>{oe(e),Z(!0)})(e),children:n("admin:invoicesPage.view")}),"draft"===e.status&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(D,{onClick:()=>(e=>{oe(e),le({amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,items:e.items}),ne(!0)})(e),children:n("admin:invoicesPage.edit")}),(0,p.jsx)(D,{onClick:()=>(e=>{fe(e),we("send"),ye(!0)})(e),children:n("admin:invoicesPage.send")})]}),("sent"===e.status||"pending_payment"===e.status||"overdue"===e.status)&&(0,p.jsxs)(p.Fragment,{children:[Number(e.total)>0&&(0,p.jsx)(D,{variant:"success",onClick:()=>ze(e),children:n("admin:invoicesPage.payNow")}),0===Number(e.total)&&(0,p.jsx)(D,{variant:"success",onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/invoices/${e.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{}},body:JSON.stringify({status:"paid",paid_amount:0,payment_notes:"Free invoice - confirmed by recipient"})})).ok&&Pe()}catch(n){console.error("Failed to confirm free invoice:",n)}})(e),children:n("admin:invoicesPage.confirm")}),"sent"===e.status&&(0,p.jsx)(D,{onClick:()=>Te(e),children:n("admin:invoicesPage.markOverdue")})]}),"paid"===e.status&&(0,p.jsx)(D,{onClick:()=>window.print(),children:n("admin:invoicesPage.printReceipt")})]})})]},e.id))})]})}),H&&(0,p.jsxs)(c.aF,{isOpen:!0,onClose:()=>V(!1),title:"Create New Invoice",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(v,{variant:"secondary",onClick:()=>V(!1),children:" Cancel "}),(0,p.jsx)(v,{variant:"primary",onClick:()=>{if(!me.restaurantName||!me.amount||!me.dueDate)return void Ae("Please fill in all required fields.");const e=`INV-${(new Date).getFullYear()}-M${String(i.length+1).padStart(3,"0")}`,n=parseFloat(me.amount),t=.06*n,a=n+t,r={id:`invoice-${Date.now()}`,invoiceNumber:e,restaurantId:me.restaurantId||`rest-${Date.now()}`,restaurantName:me.restaurantName,restaurantManager:me.restaurantManager,issueDate:(new Date).toISOString().split("T")[0],dueDate:me.dueDate,status:"draft",amount:n,tax:t,total:a,items:[{description:me.description||`${me.planType} Subscription`,quantity:1,unitPrice:n,total:n}],billingPeriod:(new Date).toISOString().slice(0,7),planType:me.planType};_([r,...i]),V(!1),ve({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"})},disabled:!me.restaurantName||!me.amount||!me.dueDate,children:" Create Invoice "})]}),children:[(0,p.jsxs)(E,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:"Restaurant Name *"}),(0,p.jsx)(T,{type:"text",value:me.restaurantName,onChange:e=>ve({...me,restaurantName:e.target.value}),placeholder:"Enter restaurant name",required:!0})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.restaurantManager")}),(0,p.jsx)(T,{type:"text",value:me.restaurantManager,onChange:e=>ve({...me,restaurantManager:e.target.value}),placeholder:"Enter manager name"})]})]}),(0,p.jsxs)(E,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:"Amount (RM) *"}),(0,p.jsx)(T,{type:"number",step:"0.01",min:"0",value:me.amount,onChange:e=>ve({...me,amount:e.target.value}),placeholder:"0.00",required:!0}),(0,p.jsx)(R,{children:"Tax (6%) will be calculated automatically"})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:"Due Date *"}),(0,p.jsx)(T,{type:"date",value:me.dueDate,onChange:e=>ve({...me,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,p.jsx)(E,{children:(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.planType")}),(0,p.jsxs)(M,{value:me.planType,onChange:e=>ve({...me,planType:e.target.value}),children:[(0,p.jsx)("option",{value:"Basic Plan",children:n("admin:invoicesPage.basicPlan")}),(0,p.jsx)("option",{value:"Professional Plan",children:n("admin:invoicesPage.professionalPlan")}),(0,p.jsx)("option",{value:"Enterprise Plan",children:n("admin:invoicesPage.enterprisePlan")})]})]})}),(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.description")}),(0,p.jsx)(N,{value:me.description,onChange:e=>ve({...me,description:e.target.value}),placeholder:"Enter invoice description (optional)",rows:3})]}),me.amount&&(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Subtotal:"}),(0,p.jsx)("span",{children:(0,o.vv)(parseFloat(me.amount||"0"),G)})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Tax (6%):"}),(0,p.jsx)("span",{children:(0,o.vv)(.06*parseFloat(me.amount||"0"),G)})]}),(0,p.jsxs)(O,{highlight:!0,children:[(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:"Total:"})}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,o.vv)(1.06*parseFloat(me.amount||"0"),G)})})]})]})]}),X&&se&&(0,p.jsxs)(c.aF,{isOpen:!0,onClose:()=>Z(!1),title:`Invoice Details - ${se.invoiceNumber}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(v,{variant:"secondary",onClick:()=>Z(!1),children:" Close "}),(0,p.jsx)(v,{variant:"primary",onClick:()=>window.print(),children:" Print Invoice "})]}),children:[(0,p.jsxs)(E,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.invoiceNumber")}),(0,p.jsx)("div",{children:se.invoiceNumber})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.status")}),(0,p.jsx)(S,{status:se.status,children:se.status})]})]}),(0,p.jsxs)(E,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.restaurant")}),(0,p.jsx)("div",{children:se.restaurantName})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.manager")}),(0,p.jsx)("div",{children:se.restaurantManager})]})]}),(0,p.jsxs)(E,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.issueDate")}),(0,p.jsx)("div",{children:se.issueDate})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.dueDate")}),(0,p.jsx)("div",{children:se.dueDate})]})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.items")}),se.items.map((e,n)=>(0,p.jsxs)("div",{style:{padding:"8px",background:"#F8FAFC",borderRadius:"4px",marginBottom:"8px"},children:[e.description," - ",(0,o.vv)(e.total,G)]},n))]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Subtotal:"}),(0,p.jsx)("span",{children:(0,o.vv)(se.subtotalBeforeDiscount||se.amount,G)})]}),se.discountAmount&&se.discountAmount>0&&(0,p.jsxs)(O,{children:[(0,p.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===se.discountType?` (${se.discountValue}%)`:"",":"]}),(0,p.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(se.discountAmount,G)]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Tax (6%):"}),(0,p.jsx)("span",{children:(0,o.vv)(se.tax,G)})]}),(0,p.jsxs)(O,{highlight:!0,children:[(0,p.jsx)("span",{children:"Total:"}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,o.vv)(se.total,G)})})]})]})]}),ie&&se&&(0,p.jsx)(c.aF,{isOpen:!0,onClose:()=>{re(!1),setTimeout(()=>{ae(!0)},100)},title:"Confirm Payment",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(v,{variant:"secondary",onClick:()=>{re(!1),setTimeout(()=>{ae(!0)},100)},children:" Cancel "}),(0,p.jsx)(v,{variant:"primary",onClick:async()=>{if(se)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${se.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:he.paymentMethod,transaction_id:he.transactionId,notes:he.notes,receipt_url:he.receiptImage||null})});if(!n.ok){const e=await n.json();return void Ae(e.error||e.message||"Failed to submit payment")}{const n=(null===t||void 0===t?void 0:t.managerId)||(null===t||void 0===t?void 0:t.id)||"2",a=await fetch(`${s.JR}/api/invoices/manager/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();_(e)}}ae(!1),re(!1),oe(null),ge({paymentMethod:"",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptImage:""})}catch(e){console.error("Payment processing error:",e),Ae("Error processing payment. Please try again.")}},children:" Confirm Payment "})]}),children:(0,p.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,p.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"8px",margin:0},children:"Confirm Payment"}),(0,p.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"24px",margin:"8px 0 24px 0"},children:"Are you sure you want to process this payment?"}),(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Invoice:"}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:se.invoiceNumber})})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Restaurant:"}),(0,p.jsx)("span",{children:se.restaurantName})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Payment Amount:"}),(0,p.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,o.vv)(se.total,G)})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Payment Date:"}),(0,p.jsx)("span",{children:he.paymentDate})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Method:"}),(0,p.jsx)("span",{children:(null===(e=ce.find(e=>e.id===he.paymentMethod))||void 0===e?void 0:e.name)||he.paymentMethod})]})]}),(0,p.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px",fontSize:"13px",color:"#0369A1"},children:"Warning: This action will mark the invoice as PAID and cannot be easily undone."})]})}),te&&se&&(0,p.jsxs)(c.aF,{isOpen:!0,onClose:()=>ae(!1),title:`Submit Payment - ${se.invoiceNumber}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(v,{variant:"secondary",onClick:()=>ae(!1),children:" Cancel "}),(0,p.jsx)(v,{variant:"success",onClick:()=>{se&&(he.paymentMethod?"stripe"===he.paymentMethod||"paypal"===he.paymentMethod||he.transactionId||he.receiptImage?(ae(!1),setTimeout(()=>{re(!0)},100)):Ae("Please provide either a Transaction ID/Reference Number OR upload a payment receipt."):Ae("Please select a payment method."))},disabled:!he.paymentMethod||0===ce.length,children:" Submit Payment "})]}),children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.invoiceDetails")}),(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Restaurant:"}),(0,p.jsx)("span",{children:se.restaurantName})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Due Date:"}),(0,p.jsx)("span",{children:Ie(se.dueDate)})]}),(0,p.jsxs)(O,{highlight:!0,children:[(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:"Amount Due:"})}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,o.vv)(se.total,se.currency)})})]})]})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.paymentMethod")}),xe?(0,p.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#6B7280",fontSize:"14px"},children:n("admin:invoicesPage.loadingPaymentMethods")}):0===ce.length?(0,p.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#EF4444",fontSize:"14px",background:"#FEF2F2",borderRadius:"8px"},children:"No payment methods configured by the invoice issuer."}):(0,p.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(100px, 1fr))",gap:"8px"},children:ce.map(e=>{const n=he.paymentMethod===e.id;return(0,p.jsxs)("div",{onClick:()=>{ge(n=>({...n,paymentMethod:e.id})),Ae("")},style:{padding:"12px 8px",border:"1px solid "+(n?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",textAlign:"center",background:n?"rgba(99,91,255,0.1)":"white",transition:"all 0.15s"},children:[(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:n?"#635BFF":"#374151"},children:e.name}),(0,p.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"2px"},children:e.description})]},e.id)})})]}),"bank_transfer"===he.paymentMethod&&(()=>{const e=ce.find(e=>"bank_transfer"===e.id);return e?(0,p.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",margin:"8px 0"},children:(0,p.jsxs)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:[(0,p.jsx)("strong",{children:"Bank:"})," ",e.bankName,(0,p.jsx)("br",{}),(0,p.jsx)("strong",{children:"Account:"})," ",e.accountNumber,(0,p.jsx)("br",{}),(0,p.jsx)("strong",{children:"Name:"})," ",e.accountName]})}):null})(),"qr_payment"===he.paymentMethod&&(()=>{const e=ce.find(e=>"qr_payment"===e.id);return e?(0,p.jsxs)("div",{style:{textAlign:"center",margin:"8px 0"},children:[(0,p.jsx)("img",{src:e.qrImage,alt:"QR Payment",style:{maxWidth:"200px",borderRadius:"8px"}}),e.qrDescription&&(0,p.jsx)("p",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:e.qrDescription})]}):null})(),he.paymentMethod&&"stripe"!==he.paymentMethod&&"paypal"!==he.paymentMethod&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.transactionIdReferenceNumber")}),(0,p.jsx)(T,{type:"text",value:he.transactionId,onChange:e=>ge({...he,transactionId:e.target.value}),placeholder:"Enter transaction ID or reference number"})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.notesOptional")}),(0,p.jsx)("textarea",{placeholder:"Any additional information about the payment...",value:he.notes,onChange:e=>ge(n=>({...n,notes:e.target.value})),style:{width:"100%",boxSizing:"border-box",padding:"8px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",minHeight:"60px",resize:"vertical",fontFamily:"inherit"}})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.paymentReceiptImage")}),(0,p.jsx)("div",{style:{border:"2px dashed #E6EBF1",borderRadius:"8px",padding:"20px",textAlign:"center",background:he.receiptImage?"#F0FDF4":"#FAFBFC",cursor:"pointer",position:"relative"},children:he.receiptImage?(0,p.jsxs)("div",{children:[(0,p.jsx)("img",{src:he.receiptImage,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"200px",borderRadius:"8px",marginBottom:"12px"}}),(0,p.jsx)("div",{children:(0,p.jsx)("button",{type:"button",onClick:()=>ge(e=>({...e,receiptImage:""})),style:{background:"#EF4444",color:"white",border:"none",padding:"8px 16px",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:n("admin:invoicesPage.removeImage")})})]}):(0,p.jsxs)("label",{style:{cursor:"pointer",display:"block"},children:[(0,p.jsx)("input",{type:"file",accept:"image/*",onChange:async e=>{var n;const t=null===(n=e.target.files)||void 0===n?void 0:n[0];if(!t||!t.type.startsWith("image/"))return;if(t.size>10485760)return;const a=new FileReader;a.onload=e=>{ge(n=>{var t;return{...n,receiptImage:null===(t=e.target)||void 0===t?void 0:t.result}})},a.readAsDataURL(t)},style:{display:"none"}}),(0,p.jsxs)("div",{style:{color:"#6B7280",fontSize:"14px"},children:[(0,p.jsx)("div",{style:{fontSize:"24px",marginBottom:"8px"},children:"+"}),(0,p.jsx)("div",{children:n("admin:invoicesPage.clickToUploadPaymentReceipt")}),(0,p.jsx)("div",{style:{fontSize:"12px",marginTop:"4px"},children:n("admin:invoicesPage.supportsJpgPngMax5mb")})]})]})})]})]}),Ce&&(0,p.jsx)("div",{style:{padding:"10px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",fontSize:"13px",color:"#DC2626",marginTop:"8px"},children:Ce})]}),ee&&se&&de&&(0,p.jsxs)(c.aF,{isOpen:!0,onClose:()=>ne(!1),title:`Edit Invoice - ${se.invoiceNumber}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(v,{variant:"secondary",onClick:()=>ne(!1),children:" Cancel "}),(0,p.jsx)(v,{variant:"primary",onClick:()=>{if(!se||!de)return;const e={...se,amount:parseFloat(de.amount),tax:parseFloat(de.tax),total:parseFloat(de.total),dueDate:de.dueDate,status:de.status,items:de.items};_(i.map(n=>n.id===se.id?e:n)),ne(!1),oe(null),le(null)},children:" Save Changes "})]}),children:[(0,p.jsxs)(E,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.amountRm")}),(0,p.jsx)(T,{type:"number",value:de.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,a=n+t;le({...de,amount:e.target.value,tax:t.toFixed(2),total:a.toFixed(2)})}})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.dueDate")}),(0,p.jsx)(T,{type:"date",value:de.dueDate,onChange:e=>le({...de,dueDate:e.target.value})})]})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(z,{children:n("admin:invoicesPage.status")}),(0,p.jsxs)(M,{value:de.status,onChange:e=>le({...de,status:e.target.value}),children:[(0,p.jsx)("option",{value:"draft",children:n("admin:invoicesPage.draft")}),(0,p.jsx)("option",{value:"sent",children:n("admin:invoicesPage.sent")}),(0,p.jsx)("option",{value:"paid",children:n("admin:invoicesPage.paid")}),(0,p.jsx)("option",{value:"overdue",children:n("admin:invoicesPage.overdue")}),(0,p.jsx)("option",{value:"cancelled",children:n("admin:invoicesPage.cancelled")})]})]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Subtotal:"}),(0,p.jsx)("span",{children:(0,o.vv)(parseFloat(de.amount||0),G)})]}),se&&se.discountAmount&&se.discountAmount>0&&(0,p.jsxs)(O,{children:[(0,p.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===se.discountType?` (${se.discountValue}%)`:"",":"]}),(0,p.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(se.discountAmount,G)]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Tax (6%):"}),(0,p.jsx)("span",{children:(0,o.vv)(parseFloat(de.tax||0),G)})]}),(0,p.jsxs)(O,{highlight:!0,children:[(0,p.jsx)("span",{children:"Total:"}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,o.vv)(parseFloat(de.total||0),G)})})]})]})]})]})]}),Ce&&(0,p.jsxs)("div",{style:{position:"fixed",bottom:24,right:24,zIndex:9999,background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:8,padding:"12px 20px",color:"#DC2626",fontSize:14,fontWeight:500,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",display:"flex",alignItems:"center",gap:12},children:[(0,p.jsx)("span",{children:Ce}),(0,p.jsx)("button",{onClick:()=>Ae(""),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontWeight:700,fontSize:16},children:"x"})]}),(0,p.jsx)(l.A,{isOpen:je,title:"send"===Fe?"Send Invoice":"Mark as Overdue",message:"send"===Fe?`Send invoice ${null===be||void 0===be?void 0:be.invoiceNumber} to ${null===be||void 0===be?void 0:be.restaurantName}?`:`Mark invoice ${null===be||void 0===be?void 0:be.invoiceNumber} as overdue?`,onConfirm:()=>{be&&(ye(!1),"send"===Fe?_(i.map(e=>e.id===be.id?{...e,status:"sent"}:e)):"overdue"===Fe&&_(i.map(e=>e.id===be.id?{...e,status:"overdue"}:e)),fe(null),we(""))},onCancel:()=>{ye(!1),fe(null),we("")},confirmText:"send"===Fe?"Send":"Mark Overdue",cancelText:"Cancel",type:"send"===Fe?"info":"warning"})]})}},7617:(e,n,t)=>{t.d(n,{A:()=>u});t(9950);var a=t(7119),i=t(4752),r=t(9610),s=t(4414);const o=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=i.Ay.button`
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
`,u=e=>{let{isOpen:n,title:t,message:i,onConfirm:u,onCancel:h,confirmText:g="Confirm",cancelText:m="Cancel",type:v="warning"}=e;return n?a.createPortal((0,s.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,s.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(l,{children:t}),(0,s.jsx)(c,{children:i})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(x,{variant:"secondary",onClick:h,children:m}),(0,s.jsx)(x,{variant:"primary",type:v,onClick:u,children:g})]})]})}),document.body):null}}}]);