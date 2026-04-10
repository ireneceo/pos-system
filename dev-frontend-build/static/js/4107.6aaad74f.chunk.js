"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4107],{4021:(e,n,i)=>{i.d(n,{i1:()=>o});var t=i(9950),a=i(1367),r=i(6038),s=i(9955);const o=()=>{const{user:e}=(0,a.As)(),[n,i]=(0,t.useState)("RM"),[o]=(0,t.useState)(Object.keys(r.DL)),[d,l]=(0,t.useState)(!0),[c,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),t=n.indexOf("restaurant");let a=t>=0?n[t+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return i("RM"),void l(!1);try{const e=(0,s.c4)(),n=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var r;const e=await n.json(),t=e.currency||(null===(r=e.operation_settings)||void 0===r?void 0:r.currency)||"MYR";i(t)}else i("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),i("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:o,loading:d,error:c}}},4107:(e,n,i)=>{i.r(n),i.d(n,{default:()=>U});var t=i(9950),a=i(4752),r=i(1367),s=i(6910),o=i(6038),d=i(4021),l=i(7617),c=i(9955),p=i(8409),x=i(4414);const u=a.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,h=a.Ay.div`
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
`,g=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,v=a.Ay.div`
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

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"success"===e.variant?"\n    background: #10B981;\n    color: white;\n\n    &:hover {\n      background: #059669;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,y=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,b=a.Ay.div`
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
`,F=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,w=a.Ay.div`
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
`,A=a.Ay.select`
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
`,P=a.Ay.div``,k=a.Ay.div`
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
`,B=a.Ay.button`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"success"===e.variant?"\n    background: #10B981;\n    color: white;\n    border-color: #10B981;\n\n    &:hover {\n      background: #059669;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,E=(0,a.Ay)(p.AA)`
  max-width: 160px;

  @media (max-width: 1024px) {
    max-width: none;
  }
`,I=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,z=a.Ay.div`
  margin-bottom: 20px;
`,T=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,M=a.Ay.input`
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
`,N=a.Ay.select`
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
`,R=a.Ay.textarea`
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
`,$=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,O=a.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,_=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  
  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,U=()=>{var e;const{t:n}=useTranslation("admin"),{user:i}=(0,r.As)(),[a,U]=(0,t.useState)([]),[L,W]=(0,t.useState)(""),[q,Y]=(0,t.useState)("all"),[J,H]=(0,t.useState)("all"),[V,Q]=(0,t.useState)(!1),{defaultCurrency:G}=(0,d.i1)(),[K,X]=(0,t.useState)("RM");(0,t.useEffect)(()=>{G&&X(G)},[G]);const[Z,ee]=(0,t.useState)(!1),[ne,ie]=(0,t.useState)(!1),[te,ae]=(0,t.useState)(!1),[re,se]=(0,t.useState)(!1),[oe,de]=(0,t.useState)(null),[le,ce]=(0,t.useState)(null),[pe,xe]=(0,t.useState)([]),[ue,he]=(0,t.useState)(!1),[ge,me]=(0,t.useState)({paymentMethod:"",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptImage:""}),[ve,je]=(0,t.useState)({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"}),[ye,be]=(0,t.useState)(!1),[fe,Fe]=(0,t.useState)(null),[we,Ce]=(0,t.useState)(""),[Ae,Pe]=(0,t.useState)(""),ke=async()=>{try{const e=(null===i||void 0===i?void 0:i.managerId)||(null===i||void 0===i?void 0:i.id)||"2",n=await fetch(`${s.JR}/api/invoices/manager/${e}`);if(n.ok){const e=await n.json();U(e)}else console.error("Failed to fetch invoices from API"),U([])}catch(e){console.error("Failed to fetch invoices:",e),U([])}};(0,t.useEffect)(()=>{i&&ke()},[i]);const De=a.filter(e=>{var n;const i=e.restaurantName.toLowerCase().includes(L.toLowerCase())||e.invoiceNumber.toLowerCase().includes(L.toLowerCase())||(null===(n=e.restaurantManager)||void 0===n?void 0:n.toLowerCase().includes(L.toLowerCase()||"")),t="all"===q||e.status===q,a="all"===J||e.issueDate.includes(J);return i&&t&&a}),Se=a.length,Be=a.filter(e=>"paid"===e.status).length,Ee=a.filter(e=>"overdue"===e.status).length,Ie=a.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),ze=e=>new Date(e).toLocaleDateString("en-MY"),Te=async e=>{de(e),me({paymentMethod:"",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptImage:""}),Pe(""),await(async(e,n,i)=>{he(!0);try{let t=`/api/admin/payment-settings/available/${e}`;"brand"===n&&i?t=`/api/brands/${i}/payment-settings/available/${e}`:"foodcourt"===n&&i&&(t=`/api/foodcourts/${i}/payment-settings/available/${e}`);const a=(0,c.c4)(),r=await fetch(t,{headers:{Authorization:`Bearer ${a}`}});if(r.ok){const e=await r.json();xe(e.methods||[]),e.methods&&e.methods.length>0&&me(n=>({...n,paymentMethod:e.methods[0].id}))}else xe([])}catch(t){console.error("Error fetching payment methods:",t),xe([])}finally{he(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId),ae(!0)},Me=e=>{(e=>{Fe(e),Ce("overdue"),be(!0)})(e)};return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(u,{children:[(0,x.jsxs)(h,{children:[(0,x.jsx)(m,{children:n("admin:invoicesPage.restaurantInvoiceManagement")}),(0,x.jsxs)(v,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalInvoices:a.length,summary:{totalAmount:a.reduce((e,n)=>e+n.total,0),paidInvoices:a.filter(e=>"paid"===e.status).length,overdueInvoices:a.filter(e=>"overdue"===e.status).length,draftInvoices:a.filter(e=>"draft"===e.status).length,paidAmount:a.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),outstandingAmount:a.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0)},statusBreakdown:{draft:a.filter(e=>"draft"===e.status).length,sent:a.filter(e=>"sent"===e.status).length,paid:a.filter(e=>"paid"===e.status).length,overdue:a.filter(e=>"overdue"===e.status).length,cancelled:a.filter(e=>"cancelled"===e.status).length},invoices:a.map(e=>({invoiceNumber:e.invoiceNumber,restaurantName:e.restaurantName,restaurantManager:e.restaurantManager,issueDate:e.issueDate,dueDate:e.dueDate,paidDate:e.paidDate||"N/A",status:e.status,amount:e.amount,tax:e.tax,total:e.total,billingPeriod:e.billingPeriod,planType:e.planType}))},n=JSON.stringify(e,null,2),i=new Blob([n],{type:"application/json"}),t=URL.createObjectURL(i),r=document.createElement("a");r.href=t,r.download=`restaurant-invoices-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(t)},children:n("admin:invoicesPage.export")}),(0,x.jsx)(j,{variant:"primary",onClick:()=>{Q(!0)},children:n("admin:invoicesPage.createInvoice")})]})]}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(y,{children:[(0,x.jsxs)(b,{color:"#059669",children:[(0,x.jsx)(f,{children:Se}),(0,x.jsx)(F,{children:n("admin:invoicesPage.totalInvoices")})]}),(0,x.jsxs)(b,{color:"#2563EB",children:[(0,x.jsx)(f,{children:Be}),(0,x.jsx)(F,{children:n("admin:invoicesPage.paidInvoices")})]}),(0,x.jsxs)(b,{color:"#DC2626",children:[(0,x.jsx)(f,{children:Ee}),(0,x.jsx)(F,{children:n("admin:invoicesPage.overdueInvoices")})]}),(0,x.jsxs)(b,{color:"#7C3AED",children:[(0,x.jsx)(f,{children:(0,o.vv)(Ie)}),(0,x.jsx)(F,{children:n("admin:invoicesPage.totalRevenue")})]})]}),(0,x.jsxs)(w,{children:[(0,x.jsx)(C,{type:"text",placeholder:"Search by invoice number, restaurant, or plan type...",value:L,onChange:e=>W(e.target.value)}),(0,x.jsxs)(A,{value:q,onChange:e=>Y(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:n("admin:invoicesPage.allStatus")}),(0,x.jsx)("option",{value:"draft",children:n("admin:invoicesPage.draft")}),(0,x.jsx)("option",{value:"sent",children:n("admin:invoicesPage.sent")}),(0,x.jsx)("option",{value:"paid",children:n("admin:invoicesPage.paid")}),(0,x.jsx)("option",{value:"overdue",children:n("admin:invoicesPage.overdue")}),(0,x.jsx)("option",{value:"cancelled",children:n("admin:invoicesPage.cancelled")})]}),(0,x.jsxs)(A,{value:J,onChange:e=>H(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:n("admin:invoicesPage.allMonths")}),(0,x.jsx)("option",{value:"2025-01",children:n("admin:invoicesPage.january2025")}),(0,x.jsx)("option",{value:"2024-12",children:n("admin:invoicesPage.december2024")}),(0,x.jsx)("option",{value:"2024-11",children:n("admin:invoicesPage.november2024")})]})]}),(0,x.jsx)(p.an,{children:0===De.length?(0,x.jsxs)(p.ys,{children:[(0,x.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No invoices found"}),(0,x.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or create a new invoice"})]}):(0,x.jsxs)(p.bQ,{children:[(0,x.jsx)(p.B_,{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)(p.gU,{align:"left",children:n("admin:invoicesPage.invoice")}),(0,x.jsx)(p.gU,{align:"left",children:n("admin:invoicesPage.restaurant")}),(0,x.jsx)(p.gU,{align:"center",children:n("admin:invoicesPage.issueDate")}),(0,x.jsx)(p.gU,{align:"center",children:n("admin:invoicesPage.dueDate")}),(0,x.jsx)(p.gU,{align:"center",children:n("admin:invoicesPage.status")}),(0,x.jsx)(p.gU,{align:"right",children:n("admin:invoicesPage.amount")}),(0,x.jsx)(p.gU,{align:"right",children:n("admin:invoicesPage.total")}),(0,x.jsx)(p.gU,{align:"left",children:n("admin:invoicesPage.actions")})]})}),(0,x.jsx)("tbody",{children:De.map(e=>(0,x.jsxs)(p.J2,{children:[(0,x.jsx)(p.Bv,{"data-label":"Invoice",align:"left",children:(0,x.jsxs)(P,{children:[(0,x.jsx)(k,{children:e.invoiceNumber}),(0,x.jsx)(D,{children:e.planType})]})}),(0,x.jsx)(p.Bv,{"data-label":"Restaurant",align:"left",children:(0,x.jsxs)(P,{children:[(0,x.jsx)(k,{children:e.restaurantName}),(0,x.jsx)(D,{children:e.restaurantManager})]})}),(0,x.jsx)(p.Bv,{"data-label":"Issue Date",align:"center",children:ze(e.issueDate)}),(0,x.jsx)(p.Bv,{"data-label":"Due Date",align:"center",children:ze(e.dueDate)}),(0,x.jsx)(p.Bv,{"data-label":"Status",align:"center",children:(0,x.jsx)(S,{status:e.status,children:e.status})}),(0,x.jsx)(p.Bv,{"data-label":"Amount",align:"right",children:(0,x.jsx)(p.DM,{children:(0,o.vv)(e.amount)})}),(0,x.jsx)(p.Bv,{"data-label":"Total",align:"right",children:(0,x.jsx)(p.DM,{highlight:!0,children:0===Number(e.total)?(0,x.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:n("admin:invoicesPage.free")}):(0,o.vv)(e.total)})}),(0,x.jsx)(p.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,x.jsxs)(E,{children:[(0,x.jsx)(B,{variant:"primary",onClick:()=>(e=>{de(e),ee(!0)})(e),children:n("admin:invoicesPage.view")}),"draft"===e.status&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(B,{onClick:()=>(e=>{de(e),ce({amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,items:e.items}),ie(!0)})(e),children:n("admin:invoicesPage.edit")}),(0,x.jsx)(B,{onClick:()=>(e=>{Fe(e),Ce("send"),be(!0)})(e),children:n("admin:invoicesPage.send")})]}),("sent"===e.status||"pending_payment"===e.status||"overdue"===e.status)&&(0,x.jsxs)(x.Fragment,{children:[Number(e.total)>0&&(0,x.jsx)(B,{variant:"success",onClick:()=>Te(e),children:n("admin:invoicesPage.payNow")}),0===Number(e.total)&&(0,x.jsx)(B,{variant:"success",onClick:()=>(async e=>{try{const n=(0,c.c4)();(await fetch(`/api/invoices/${e.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{}},body:JSON.stringify({status:"paid",paid_amount:0,payment_notes:"Free invoice - confirmed by recipient"})})).ok&&ke()}catch(n){console.error("Failed to confirm free invoice:",n)}})(e),children:n("admin:invoicesPage.confirm")}),"sent"===e.status&&(0,x.jsx)(B,{onClick:()=>Me(e),children:n("admin:invoicesPage.markOverdue")})]}),"paid"===e.status&&(0,x.jsx)(B,{onClick:()=>window.print(),children:n("admin:invoicesPage.printReceipt")})]})})]},e.id))})]})}),V&&(0,x.jsxs)(p.aF,{isOpen:!0,onClose:()=>Q(!1),title:"Create New Invoice",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>Q(!1),children:" Cancel "}),(0,x.jsx)(j,{variant:"primary",onClick:()=>{if(!ve.restaurantName||!ve.amount||!ve.dueDate)return void Pe("Please fill in all required fields.");const e=`INV-${(new Date).getFullYear()}-M${String(a.length+1).padStart(3,"0")}`,n=parseFloat(ve.amount),i=.06*n,t=n+i,r={id:`invoice-${Date.now()}`,invoiceNumber:e,restaurantId:ve.restaurantId||`rest-${Date.now()}`,restaurantName:ve.restaurantName,restaurantManager:ve.restaurantManager,issueDate:(new Date).toISOString().split("T")[0],dueDate:ve.dueDate,status:"draft",amount:n,tax:i,total:t,items:[{description:ve.description||`${ve.planType} Subscription`,quantity:1,unitPrice:n,total:n}],billingPeriod:(new Date).toISOString().slice(0,7),planType:ve.planType};U([r,...a]),Q(!1),je({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"})},disabled:!ve.restaurantName||!ve.amount||!ve.dueDate,children:" Create Invoice "})]}),children:[(0,x.jsxs)(I,{children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:"Restaurant Name *"}),(0,x.jsx)(M,{type:"text",value:ve.restaurantName,onChange:e=>je({...ve,restaurantName:e.target.value}),placeholder:"Enter restaurant name",required:!0})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.restaurantManager")}),(0,x.jsx)(M,{type:"text",value:ve.restaurantManager,onChange:e=>je({...ve,restaurantManager:e.target.value}),placeholder:"Enter manager name"})]})]}),(0,x.jsxs)(I,{children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:"Amount (RM) *"}),(0,x.jsx)(M,{type:"number",step:"0.01",min:"0",value:ve.amount,onChange:e=>je({...ve,amount:e.target.value}),placeholder:"0.00",required:!0}),(0,x.jsx)($,{children:"Tax (6%) will be calculated automatically"})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:"Due Date *"}),(0,x.jsx)(M,{type:"date",value:ve.dueDate,onChange:e=>je({...ve,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,x.jsx)(I,{children:(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.planType")}),(0,x.jsxs)(N,{value:ve.planType,onChange:e=>je({...ve,planType:e.target.value}),children:[(0,x.jsx)("option",{value:"Basic Plan",children:n("admin:invoicesPage.basicPlan")}),(0,x.jsx)("option",{value:"Professional Plan",children:n("admin:invoicesPage.professionalPlan")}),(0,x.jsx)("option",{value:"Enterprise Plan",children:n("admin:invoicesPage.enterprisePlan")})]})]})}),(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.description")}),(0,x.jsx)(R,{value:ve.description,onChange:e=>je({...ve,description:e.target.value}),placeholder:"Enter invoice description (optional)",rows:3})]}),ve.amount&&(0,x.jsxs)(O,{children:[(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Subtotal:"}),(0,x.jsx)("span",{children:(0,o.vv)(parseFloat(ve.amount||"0"),K)})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Tax (6%):"}),(0,x.jsx)("span",{children:(0,o.vv)(.06*parseFloat(ve.amount||"0"),K)})]}),(0,x.jsxs)(_,{highlight:!0,children:[(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:"Total:"})}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:(0,o.vv)(1.06*parseFloat(ve.amount||"0"),K)})})]})]})]}),Z&&oe&&(0,x.jsxs)(p.aF,{isOpen:!0,onClose:()=>ee(!1),title:`Invoice Details - ${oe.invoiceNumber}`,footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>ee(!1),children:" Close "}),(0,x.jsx)(j,{variant:"primary",onClick:()=>window.print(),children:" Print Invoice "})]}),children:[(0,x.jsxs)(I,{children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.invoiceNumber")}),(0,x.jsx)("div",{children:oe.invoiceNumber})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.status")}),(0,x.jsx)(S,{status:oe.status,children:oe.status})]})]}),(0,x.jsxs)(I,{children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.restaurant")}),(0,x.jsx)("div",{children:oe.restaurantName})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.manager")}),(0,x.jsx)("div",{children:oe.restaurantManager})]})]}),(0,x.jsxs)(I,{children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.issueDate")}),(0,x.jsx)("div",{children:oe.issueDate})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.dueDate")}),(0,x.jsx)("div",{children:oe.dueDate})]})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.items")}),oe.items.map((e,n)=>(0,x.jsxs)("div",{style:{padding:"8px",background:"#F8FAFC",borderRadius:"4px",marginBottom:"8px"},children:[e.description," - ",(0,o.vv)(e.total,K)]},n))]}),(0,x.jsxs)(O,{children:[(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Subtotal:"}),(0,x.jsx)("span",{children:(0,o.vv)(oe.subtotalBeforeDiscount||oe.amount,K)})]}),oe.discountAmount&&oe.discountAmount>0&&(0,x.jsxs)(_,{children:[(0,x.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===oe.discountType?` (${oe.discountValue}%)`:"",":"]}),(0,x.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(oe.discountAmount,K)]})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Tax (6%):"}),(0,x.jsx)("span",{children:(0,o.vv)(oe.tax,K)})]}),(0,x.jsxs)(_,{highlight:!0,children:[(0,x.jsx)("span",{children:"Total:"}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:(0,o.vv)(oe.total,K)})})]})]})]}),re&&oe&&(0,x.jsx)(p.aF,{isOpen:!0,onClose:()=>{se(!1),setTimeout(()=>{ae(!0)},100)},title:"Confirm Payment",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>{se(!1),setTimeout(()=>{ae(!0)},100)},children:" Cancel "}),(0,x.jsx)(j,{variant:"primary",onClick:async()=>{if(oe)try{const e=(0,c.c4)(),n=await fetch(`/api/invoices/${oe.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:ge.paymentMethod,transaction_id:ge.transactionId,notes:ge.notes,receipt_url:ge.receiptImage||null})});if(!n.ok){const e=await n.json();return void Pe(e.error||e.message||"Failed to submit payment")}{const n=(null===i||void 0===i?void 0:i.managerId)||(null===i||void 0===i?void 0:i.id)||"2",t=await fetch(`${s.JR}/api/invoices/manager/${n}`,{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();U(e)}}ae(!1),se(!1),de(null),me({paymentMethod:"",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptImage:""})}catch(e){console.error("Payment processing error:",e),Pe("Error processing payment. Please try again.")}},children:" Confirm Payment "})]}),children:(0,x.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,x.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"8px",margin:0},children:"Confirm Payment"}),(0,x.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"24px",margin:"8px 0 24px 0"},children:"Are you sure you want to process this payment?"}),(0,x.jsxs)(O,{children:[(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Invoice:"}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:oe.invoiceNumber})})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Restaurant:"}),(0,x.jsx)("span",{children:oe.restaurantName})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Payment Amount:"}),(0,x.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,o.vv)(oe.total,K)})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Payment Date:"}),(0,x.jsx)("span",{children:ge.paymentDate})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Method:"}),(0,x.jsx)("span",{children:(null===(e=pe.find(e=>e.id===ge.paymentMethod))||void 0===e?void 0:e.name)||ge.paymentMethod})]})]}),(0,x.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px",fontSize:"13px",color:"#0369A1"},children:"Warning: This action will mark the invoice as PAID and cannot be easily undone."})]})}),te&&oe&&(0,x.jsxs)(p.aF,{isOpen:!0,onClose:()=>ae(!1),title:`Submit Payment - ${oe.invoiceNumber}`,footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>ae(!1),children:" Cancel "}),(0,x.jsx)(j,{variant:"success",onClick:()=>{oe&&(ge.paymentMethod?"stripe"===ge.paymentMethod||"paypal"===ge.paymentMethod||ge.transactionId||ge.receiptImage?(ae(!1),setTimeout(()=>{se(!0)},100)):Pe("Please provide either a Transaction ID/Reference Number OR upload a payment receipt."):Pe("Please select a payment method."))},disabled:!ge.paymentMethod||0===pe.length,children:" Submit Payment "})]}),children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.invoiceDetails")}),(0,x.jsxs)(O,{children:[(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Restaurant:"}),(0,x.jsx)("span",{children:oe.restaurantName})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Due Date:"}),(0,x.jsx)("span",{children:ze(oe.dueDate)})]}),(0,x.jsxs)(_,{highlight:!0,children:[(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:"Amount Due:"})}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:(0,o.vv)(oe.total,oe.currency)})})]})]})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.paymentMethod")}),ue?(0,x.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#6B7280",fontSize:"14px"},children:n("admin:invoicesPage.loadingPaymentMethods")}):0===pe.length?(0,x.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#EF4444",fontSize:"14px",background:"#FEF2F2",borderRadius:"8px"},children:"No payment methods configured by the invoice issuer."}):(0,x.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(100px, 1fr))",gap:"8px"},children:pe.map(e=>{const n=ge.paymentMethod===e.id;return(0,x.jsxs)("div",{onClick:()=>{me(n=>({...n,paymentMethod:e.id})),Pe("")},style:{padding:"12px 8px",border:"1px solid "+(n?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",textAlign:"center",background:n?"rgba(99,91,255,0.1)":"white",transition:"all 0.15s"},children:[(0,x.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:n?"#635BFF":"#374151"},children:e.name}),(0,x.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"2px"},children:e.description})]},e.id)})})]}),"bank_transfer"===ge.paymentMethod&&(()=>{const e=pe.find(e=>"bank_transfer"===e.id);return e?(0,x.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",margin:"8px 0"},children:(0,x.jsxs)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:[(0,x.jsx)("strong",{children:"Bank:"})," ",e.bankName,(0,x.jsx)("br",{}),(0,x.jsx)("strong",{children:"Account:"})," ",e.accountNumber,(0,x.jsx)("br",{}),(0,x.jsx)("strong",{children:"Name:"})," ",e.accountName]})}):null})(),"qr_payment"===ge.paymentMethod&&(()=>{const e=pe.find(e=>"qr_payment"===e.id);return e?(0,x.jsxs)("div",{style:{textAlign:"center",margin:"8px 0"},children:[(0,x.jsx)("img",{src:e.qrImage,alt:"QR Payment",style:{maxWidth:"200px",borderRadius:"8px"}}),e.qrDescription&&(0,x.jsx)("p",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:e.qrDescription})]}):null})(),ge.paymentMethod&&"stripe"!==ge.paymentMethod&&"paypal"!==ge.paymentMethod&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.transactionIdReferenceNumber")}),(0,x.jsx)(M,{type:"text",value:ge.transactionId,onChange:e=>me({...ge,transactionId:e.target.value}),placeholder:"Enter transaction ID or reference number"})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.notesOptional")}),(0,x.jsx)("textarea",{placeholder:"Any additional information about the payment...",value:ge.notes,onChange:e=>me(n=>({...n,notes:e.target.value})),style:{width:"100%",boxSizing:"border-box",padding:"8px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",minHeight:"60px",resize:"vertical",fontFamily:"inherit"}})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.paymentReceiptImage")}),(0,x.jsx)("div",{style:{border:"2px dashed #E6EBF1",borderRadius:"8px",padding:"20px",textAlign:"center",background:ge.receiptImage?"#F0FDF4":"#FAFBFC",cursor:"pointer",position:"relative"},children:ge.receiptImage?(0,x.jsxs)("div",{children:[(0,x.jsx)("img",{src:ge.receiptImage,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"200px",borderRadius:"8px",marginBottom:"12px"}}),(0,x.jsx)("div",{children:(0,x.jsx)("button",{type:"button",onClick:()=>me(e=>({...e,receiptImage:""})),style:{background:"#EF4444",color:"white",border:"none",padding:"8px 16px",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:n("admin:invoicesPage.removeImage")})})]}):(0,x.jsxs)("label",{style:{cursor:"pointer",display:"block"},children:[(0,x.jsx)("input",{type:"file",accept:"image/*",onChange:async e=>{var n;const i=null===(n=e.target.files)||void 0===n?void 0:n[0];if(!i||!i.type.startsWith("image/"))return;if(i.size>10485760)return;const t=new FileReader;t.onload=e=>{me(n=>{var i;return{...n,receiptImage:null===(i=e.target)||void 0===i?void 0:i.result}})},t.readAsDataURL(i)},style:{display:"none"}}),(0,x.jsxs)("div",{style:{color:"#6B7280",fontSize:"14px"},children:[(0,x.jsx)("div",{style:{fontSize:"24px",marginBottom:"8px"},children:"+"}),(0,x.jsx)("div",{children:n("admin:invoicesPage.clickToUploadPaymentReceipt")}),(0,x.jsx)("div",{style:{fontSize:"12px",marginTop:"4px"},children:n("admin:invoicesPage.supportsJpgPngMax5mb")})]})]})})]})]}),Ae&&(0,x.jsx)("div",{style:{padding:"10px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",fontSize:"13px",color:"#DC2626",marginTop:"8px"},children:Ae})]}),ne&&oe&&le&&(0,x.jsxs)(p.aF,{isOpen:!0,onClose:()=>ie(!1),title:`Edit Invoice - ${oe.invoiceNumber}`,footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>ie(!1),children:" Cancel "}),(0,x.jsx)(j,{variant:"primary",onClick:()=>{if(!oe||!le)return;const e={...oe,amount:parseFloat(le.amount),tax:parseFloat(le.tax),total:parseFloat(le.total),dueDate:le.dueDate,status:le.status,items:le.items};U(a.map(n=>n.id===oe.id?e:n)),ie(!1),de(null),ce(null)},children:" Save Changes "})]}),children:[(0,x.jsxs)(I,{children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.amountRm")}),(0,x.jsx)(M,{type:"number",value:le.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,i=.06*n,t=n+i;ce({...le,amount:e.target.value,tax:i.toFixed(2),total:t.toFixed(2)})}})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.dueDate")}),(0,x.jsx)(M,{type:"date",value:le.dueDate,onChange:e=>ce({...le,dueDate:e.target.value})})]})]}),(0,x.jsxs)(z,{children:[(0,x.jsx)(T,{children:n("admin:invoicesPage.status")}),(0,x.jsxs)(N,{value:le.status,onChange:e=>ce({...le,status:e.target.value}),children:[(0,x.jsx)("option",{value:"draft",children:n("admin:invoicesPage.draft")}),(0,x.jsx)("option",{value:"sent",children:n("admin:invoicesPage.sent")}),(0,x.jsx)("option",{value:"paid",children:n("admin:invoicesPage.paid")}),(0,x.jsx)("option",{value:"overdue",children:n("admin:invoicesPage.overdue")}),(0,x.jsx)("option",{value:"cancelled",children:n("admin:invoicesPage.cancelled")})]})]}),(0,x.jsxs)(O,{children:[(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Subtotal:"}),(0,x.jsx)("span",{children:(0,o.vv)(parseFloat(le.amount||0),K)})]}),oe&&oe.discountAmount&&oe.discountAmount>0&&(0,x.jsxs)(_,{children:[(0,x.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===oe.discountType?` (${oe.discountValue}%)`:"",":"]}),(0,x.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(oe.discountAmount,K)]})]}),(0,x.jsxs)(_,{children:[(0,x.jsx)("span",{children:"Tax (6%):"}),(0,x.jsx)("span",{children:(0,o.vv)(parseFloat(le.tax||0),K)})]}),(0,x.jsxs)(_,{highlight:!0,children:[(0,x.jsx)("span",{children:"Total:"}),(0,x.jsx)("span",{children:(0,x.jsx)("strong",{children:(0,o.vv)(parseFloat(le.total||0),K)})})]})]})]})]})]}),Ae&&(0,x.jsxs)("div",{style:{position:"fixed",bottom:24,right:24,zIndex:9999,background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:8,padding:"12px 20px",color:"#DC2626",fontSize:14,fontWeight:500,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",display:"flex",alignItems:"center",gap:12},children:[(0,x.jsx)("span",{children:Ae}),(0,x.jsx)("button",{onClick:()=>Pe(""),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontWeight:700,fontSize:16},children:"x"})]}),(0,x.jsx)(l.A,{isOpen:ye,title:"send"===we?"Send Invoice":"Mark as Overdue",message:"send"===we?`Send invoice ${null===fe||void 0===fe?void 0:fe.invoiceNumber} to ${null===fe||void 0===fe?void 0:fe.restaurantName}?`:`Mark invoice ${null===fe||void 0===fe?void 0:fe.invoiceNumber} as overdue?`,onConfirm:()=>{fe&&(be(!1),"send"===we?U(a.map(e=>e.id===fe.id?{...e,status:"sent"}:e)):"overdue"===we&&U(a.map(e=>e.id===fe.id?{...e,status:"overdue"}:e)),Fe(null),Ce(""))},onCancel:()=>{be(!1),Fe(null),Ce("")},confirmText:"send"===we?"Send":"Mark Overdue",cancelText:"Cancel",type:"send"===we?"info":"warning"})]})}},7617:(e,n,i)=>{i.d(n,{A:()=>u});i(9950);var t=i(7119),a=i(4752),r=i(9610),s=i(4414);const o=a.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=a.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=a.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=a.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=a.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=a.Ay.button`
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
`,u=e=>{let{isOpen:n,title:i,message:a,onConfirm:u,onCancel:h,confirmText:g="Confirm",cancelText:m="Cancel",type:v="warning"}=e;return n?t.createPortal((0,s.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,s.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(l,{children:i}),(0,s.jsx)(c,{children:a})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(x,{variant:"secondary",onClick:h,children:m}),(0,s.jsx)(x,{variant:"primary",type:v,onClick:u,children:g})]})]})}),document.body):null}}}]);