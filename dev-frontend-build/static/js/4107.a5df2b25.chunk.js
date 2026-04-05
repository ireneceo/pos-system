"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4107],{4021:(e,n,t)=>{t.d(n,{i1:()=>s});var a=t(9950),r=t(1367),i=t(6038);const s=()=>{const{user:e}=(0,r.As)(),[n,t]=(0,a.useState)("RM"),[s]=(0,a.useState)(Object.keys(i.DL)),[o,l]=(0,a.useState)(!0),[d,c]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),a=n.indexOf("restaurant");let r=a>=0?n[a+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),a=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"MYR";t(a)}else t("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),c("Failed to load currency settings"),t("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:o,error:d}}},4107:(e,n,t)=>{t.r(n),t.d(n,{default:()=>_});var a=t(9950),r=t(4752),i=t(1367),s=t(6910),o=t(6038),l=t(4021),d=t(7617),c=t(8409),p=t(4414);const x=r.Ay.div`
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
`,g=r.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=r.Ay.div`
  display: flex;
  gap: 12px;
`,j=r.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"success"===e.variant?"\n    background: #10B981;\n    color: white;\n\n    &:hover {\n      background: #059669;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,v=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=r.Ay.div`
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
`,C=r.Ay.input`
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
`,A=r.Ay.div``,S=r.Ay.div`
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
`,B=r.Ay.button`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"success"===e.variant?"\n    background: #10B981;\n    color: white;\n    border-color: #10B981;\n\n    &:hover {\n      background: #059669;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,E=(0,r.Ay)(c.AA)`
  max-width: 160px;

  @media (max-width: 1024px) {
    max-width: none;
  }
`,I=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,T=r.Ay.div`
  margin-bottom: 20px;
`,M=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,z=r.Ay.input`
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
`,N=r.Ay.select`
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
`,R=r.Ay.textarea`
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
`,P=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,$=r.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,O=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  
  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,_=()=>{var e;const{user:n}=(0,i.As)(),[t,r]=(0,a.useState)([]),[_,L]=(0,a.useState)(""),[U,W]=(0,a.useState)("all"),[q,Y]=(0,a.useState)("all"),[J,H]=(0,a.useState)(!1),{defaultCurrency:V}=(0,l.i1)(),[G,Q]=(0,a.useState)("RM");(0,a.useEffect)(()=>{V&&Q(V)},[V]);const[K,X]=(0,a.useState)(!1),[Z,ee]=(0,a.useState)(!1),[ne,te]=(0,a.useState)(!1),[ae,re]=(0,a.useState)(!1),[ie,se]=(0,a.useState)(null),[oe,le]=(0,a.useState)(null),[de,ce]=(0,a.useState)([]),[pe,xe]=(0,a.useState)(!1),[ue,he]=(0,a.useState)({paymentMethod:"",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptImage:""}),[ge,me]=(0,a.useState)({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"}),[je,ve]=(0,a.useState)(!1),[ye,be]=(0,a.useState)(null),[fe,Fe]=(0,a.useState)(""),[Ce,we]=(0,a.useState)(""),Ae=async()=>{try{const e=(null===n||void 0===n?void 0:n.managerId)||(null===n||void 0===n?void 0:n.id)||"2",t=await fetch(`${s.JR}/api/invoices/manager/${e}`);if(t.ok){const e=await t.json();r(e)}else console.error("Failed to fetch invoices from API"),r([])}catch(e){console.error("Failed to fetch invoices:",e),r([])}};(0,a.useEffect)(()=>{n&&Ae()},[n]);const Se=t.filter(e=>{var n;const t=e.restaurantName.toLowerCase().includes(_.toLowerCase())||e.invoiceNumber.toLowerCase().includes(_.toLowerCase())||(null===(n=e.restaurantManager)||void 0===n?void 0:n.toLowerCase().includes(_.toLowerCase()||"")),a="all"===U||e.status===U,r="all"===q||e.issueDate.includes(q);return t&&a&&r}),De=t.length,ke=t.filter(e=>"paid"===e.status).length,Be=t.filter(e=>"overdue"===e.status).length,Ee=t.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),Ie=e=>new Date(e).toLocaleDateString("en-MY"),Te=async e=>{se(e),he({paymentMethod:"",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptImage:""}),we(""),await(async(e,n,t)=>{xe(!0);try{let a=`/api/admin/payment-settings/available/${e}`;"brand"===n&&t?a=`/api/brands/${t}/payment-settings/available/${e}`:"foodcourt"===n&&t&&(a=`/api/foodcourts/${t}/payment-settings/available/${e}`);const r=localStorage.getItem("auth_token"),i=await fetch(a,{headers:{Authorization:`Bearer ${r}`}});if(i.ok){const e=await i.json();ce(e.methods||[]),e.methods&&e.methods.length>0&&he(n=>({...n,paymentMethod:e.methods[0].id}))}else ce([])}catch(a){console.error("Error fetching payment methods:",a),ce([])}finally{xe(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId),te(!0)},Me=e=>{(e=>{be(e),Fe("overdue"),ve(!0)})(e)};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(g,{children:"Restaurant Invoice Management"}),(0,p.jsxs)(m,{children:[(0,p.jsx)(j,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalInvoices:t.length,summary:{totalAmount:t.reduce((e,n)=>e+n.total,0),paidInvoices:t.filter(e=>"paid"===e.status).length,overdueInvoices:t.filter(e=>"overdue"===e.status).length,draftInvoices:t.filter(e=>"draft"===e.status).length,paidAmount:t.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),outstandingAmount:t.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0)},statusBreakdown:{draft:t.filter(e=>"draft"===e.status).length,sent:t.filter(e=>"sent"===e.status).length,paid:t.filter(e=>"paid"===e.status).length,overdue:t.filter(e=>"overdue"===e.status).length,cancelled:t.filter(e=>"cancelled"===e.status).length},invoices:t.map(e=>({invoiceNumber:e.invoiceNumber,restaurantName:e.restaurantName,restaurantManager:e.restaurantManager,issueDate:e.issueDate,dueDate:e.dueDate,paidDate:e.paidDate||"N/A",status:e.status,amount:e.amount,tax:e.tax,total:e.total,billingPeriod:e.billingPeriod,planType:e.planType}))},n=JSON.stringify(e,null,2),a=new Blob([n],{type:"application/json"}),r=URL.createObjectURL(a),i=document.createElement("a");i.href=r,i.download=`restaurant-invoices-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(r)},children:"Export"}),(0,p.jsx)(j,{variant:"primary",onClick:()=>{H(!0)},children:"Create Invoice"})]})]}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(v,{children:[(0,p.jsxs)(y,{color:"#059669",children:[(0,p.jsx)(b,{children:De}),(0,p.jsx)(f,{children:"Total Invoices"})]}),(0,p.jsxs)(y,{color:"#2563EB",children:[(0,p.jsx)(b,{children:ke}),(0,p.jsx)(f,{children:"Paid Invoices"})]}),(0,p.jsxs)(y,{color:"#DC2626",children:[(0,p.jsx)(b,{children:Be}),(0,p.jsx)(f,{children:"Overdue Invoices"})]}),(0,p.jsxs)(y,{color:"#7C3AED",children:[(0,p.jsx)(b,{children:(0,o.vv)(Ee)}),(0,p.jsx)(f,{children:"Total Revenue"})]})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(C,{type:"text",placeholder:"Search by invoice number, restaurant, or plan type...",value:_,onChange:e=>L(e.target.value)}),(0,p.jsxs)(w,{value:U,onChange:e=>W(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"draft",children:"Draft"}),(0,p.jsx)("option",{value:"sent",children:"Sent"}),(0,p.jsx)("option",{value:"paid",children:"Paid"}),(0,p.jsx)("option",{value:"overdue",children:"Overdue"}),(0,p.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,p.jsxs)(w,{value:q,onChange:e=>Y(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Months"}),(0,p.jsx)("option",{value:"2025-01",children:"January 2025"}),(0,p.jsx)("option",{value:"2024-12",children:"December 2024"}),(0,p.jsx)("option",{value:"2024-11",children:"November 2024"})]})]}),(0,p.jsx)(c.an,{children:0===Se.length?(0,p.jsxs)(c.ys,{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No invoices found"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or create a new invoice"})]}):(0,p.jsxs)(c.bQ,{children:[(0,p.jsx)(c.B_,{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)(c.gU,{align:"left",children:"Invoice"}),(0,p.jsx)(c.gU,{align:"left",children:"Restaurant"}),(0,p.jsx)(c.gU,{align:"center",children:"Issue Date"}),(0,p.jsx)(c.gU,{align:"center",children:"Due Date"}),(0,p.jsx)(c.gU,{align:"center",children:"Status"}),(0,p.jsx)(c.gU,{align:"right",children:"Amount"}),(0,p.jsx)(c.gU,{align:"right",children:"Total"}),(0,p.jsx)(c.gU,{align:"left",children:"Actions"})]})}),(0,p.jsx)("tbody",{children:Se.map(e=>(0,p.jsxs)(c.J2,{children:[(0,p.jsx)(c.Bv,{"data-label":"Invoice",align:"left",children:(0,p.jsxs)(A,{children:[(0,p.jsx)(S,{children:e.invoiceNumber}),(0,p.jsx)(D,{children:e.planType})]})}),(0,p.jsx)(c.Bv,{"data-label":"Restaurant",align:"left",children:(0,p.jsxs)(A,{children:[(0,p.jsx)(S,{children:e.restaurantName}),(0,p.jsx)(D,{children:e.restaurantManager})]})}),(0,p.jsx)(c.Bv,{"data-label":"Issue Date",align:"center",children:Ie(e.issueDate)}),(0,p.jsx)(c.Bv,{"data-label":"Due Date",align:"center",children:Ie(e.dueDate)}),(0,p.jsx)(c.Bv,{"data-label":"Status",align:"center",children:(0,p.jsx)(k,{status:e.status,children:e.status})}),(0,p.jsx)(c.Bv,{"data-label":"Amount",align:"right",children:(0,p.jsx)(c.DM,{children:(0,o.vv)(e.amount)})}),(0,p.jsx)(c.Bv,{"data-label":"Total",align:"right",children:(0,p.jsx)(c.DM,{highlight:!0,children:0===Number(e.total)?(0,p.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,o.vv)(e.total)})}),(0,p.jsx)(c.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{variant:"primary",onClick:()=>(e=>{se(e),X(!0)})(e),children:"View"}),"draft"===e.status&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(B,{onClick:()=>(e=>{se(e),le({amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,items:e.items}),ee(!0)})(e),children:"Edit"}),(0,p.jsx)(B,{onClick:()=>(e=>{be(e),Fe("send"),ve(!0)})(e),children:"Send"})]}),("sent"===e.status||"pending_payment"===e.status||"overdue"===e.status)&&(0,p.jsxs)(p.Fragment,{children:[Number(e.total)>0&&(0,p.jsx)(B,{variant:"success",onClick:()=>Te(e),children:"Pay Now"}),0===Number(e.total)&&(0,p.jsx)(B,{variant:"success",onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/invoices/${e.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{}},body:JSON.stringify({status:"paid",paid_amount:0,payment_notes:"Free invoice - confirmed by recipient"})})).ok&&Ae()}catch(n){console.error("Failed to confirm free invoice:",n)}})(e),children:"Confirm"}),"sent"===e.status&&(0,p.jsx)(B,{onClick:()=>Me(e),children:"Mark Overdue"})]}),"paid"===e.status&&(0,p.jsx)(B,{onClick:()=>window.print(),children:"Print Receipt"})]})})]},e.id))})]})}),J&&(0,p.jsxs)(c.aF,{isOpen:!0,onClose:()=>H(!1),title:"Create New Invoice",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j,{variant:"secondary",onClick:()=>H(!1),children:" Cancel "}),(0,p.jsx)(j,{variant:"primary",onClick:()=>{if(!ge.restaurantName||!ge.amount||!ge.dueDate)return void we("Please fill in all required fields.");const e=`INV-${(new Date).getFullYear()}-M${String(t.length+1).padStart(3,"0")}`,n=parseFloat(ge.amount),a=.06*n,i=n+a,s={id:`invoice-${Date.now()}`,invoiceNumber:e,restaurantId:ge.restaurantId||`rest-${Date.now()}`,restaurantName:ge.restaurantName,restaurantManager:ge.restaurantManager,issueDate:(new Date).toISOString().split("T")[0],dueDate:ge.dueDate,status:"draft",amount:n,tax:a,total:i,items:[{description:ge.description||`${ge.planType} Subscription`,quantity:1,unitPrice:n,total:n}],billingPeriod:(new Date).toISOString().slice(0,7),planType:ge.planType};r([s,...t]),H(!1),me({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"})},disabled:!ge.restaurantName||!ge.amount||!ge.dueDate,children:" Create Invoice "})]}),children:[(0,p.jsxs)(I,{children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Restaurant Name *"}),(0,p.jsx)(z,{type:"text",value:ge.restaurantName,onChange:e=>me({...ge,restaurantName:e.target.value}),placeholder:"Enter restaurant name",required:!0})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Restaurant Manager"}),(0,p.jsx)(z,{type:"text",value:ge.restaurantManager,onChange:e=>me({...ge,restaurantManager:e.target.value}),placeholder:"Enter manager name"})]})]}),(0,p.jsxs)(I,{children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Amount (RM) *"}),(0,p.jsx)(z,{type:"number",step:"0.01",min:"0",value:ge.amount,onChange:e=>me({...ge,amount:e.target.value}),placeholder:"0.00",required:!0}),(0,p.jsx)(P,{children:"Tax (6%) will be calculated automatically"})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Due Date *"}),(0,p.jsx)(z,{type:"date",value:ge.dueDate,onChange:e=>me({...ge,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,p.jsx)(I,{children:(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Plan Type"}),(0,p.jsxs)(N,{value:ge.planType,onChange:e=>me({...ge,planType:e.target.value}),children:[(0,p.jsx)("option",{value:"Basic Plan",children:"Basic Plan"}),(0,p.jsx)("option",{value:"Professional Plan",children:"Professional Plan"}),(0,p.jsx)("option",{value:"Enterprise Plan",children:"Enterprise Plan"})]})]})}),(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Description"}),(0,p.jsx)(R,{value:ge.description,onChange:e=>me({...ge,description:e.target.value}),placeholder:"Enter invoice description (optional)",rows:3})]}),ge.amount&&(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Subtotal:"}),(0,p.jsx)("span",{children:(0,o.vv)(parseFloat(ge.amount||"0"),G)})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Tax (6%):"}),(0,p.jsx)("span",{children:(0,o.vv)(.06*parseFloat(ge.amount||"0"),G)})]}),(0,p.jsxs)(O,{highlight:!0,children:[(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:"Total:"})}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,o.vv)(1.06*parseFloat(ge.amount||"0"),G)})})]})]})]}),K&&ie&&(0,p.jsxs)(c.aF,{isOpen:!0,onClose:()=>X(!1),title:`Invoice Details - ${ie.invoiceNumber}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j,{variant:"secondary",onClick:()=>X(!1),children:" Close "}),(0,p.jsx)(j,{variant:"primary",onClick:()=>window.print(),children:" Print Invoice "})]}),children:[(0,p.jsxs)(I,{children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Invoice Number"}),(0,p.jsx)("div",{children:ie.invoiceNumber})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Status"}),(0,p.jsx)(k,{status:ie.status,children:ie.status})]})]}),(0,p.jsxs)(I,{children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Restaurant"}),(0,p.jsx)("div",{children:ie.restaurantName})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Manager"}),(0,p.jsx)("div",{children:ie.restaurantManager})]})]}),(0,p.jsxs)(I,{children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Issue Date"}),(0,p.jsx)("div",{children:ie.issueDate})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Due Date"}),(0,p.jsx)("div",{children:ie.dueDate})]})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Items"}),ie.items.map((e,n)=>(0,p.jsxs)("div",{style:{padding:"8px",background:"#F8FAFC",borderRadius:"4px",marginBottom:"8px"},children:[e.description," - ",(0,o.vv)(e.total,G)]},n))]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Subtotal:"}),(0,p.jsx)("span",{children:(0,o.vv)(ie.subtotalBeforeDiscount||ie.amount,G)})]}),ie.discountAmount&&ie.discountAmount>0&&(0,p.jsxs)(O,{children:[(0,p.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===ie.discountType?` (${ie.discountValue}%)`:"",":"]}),(0,p.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(ie.discountAmount,G)]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Tax (6%):"}),(0,p.jsx)("span",{children:(0,o.vv)(ie.tax,G)})]}),(0,p.jsxs)(O,{highlight:!0,children:[(0,p.jsx)("span",{children:"Total:"}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,o.vv)(ie.total,G)})})]})]})]}),ae&&ie&&(0,p.jsx)(c.aF,{isOpen:!0,onClose:()=>{re(!1),setTimeout(()=>{te(!0)},100)},title:"Confirm Payment",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j,{variant:"secondary",onClick:()=>{re(!1),setTimeout(()=>{te(!0)},100)},children:" Cancel "}),(0,p.jsx)(j,{variant:"primary",onClick:async()=>{if(ie)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${ie.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:ue.paymentMethod,transaction_id:ue.transactionId,notes:ue.notes,receipt_url:ue.receiptImage||null})});if(!t.ok){const e=await t.json();return void we(e.error||e.message||"Failed to submit payment")}{const t=(null===n||void 0===n?void 0:n.managerId)||(null===n||void 0===n?void 0:n.id)||"2",a=await fetch(`${s.JR}/api/invoices/manager/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();r(e)}}te(!1),re(!1),se(null),he({paymentMethod:"",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptImage:""})}catch(e){console.error("Payment processing error:",e),we("Error processing payment. Please try again.")}},children:" Confirm Payment "})]}),children:(0,p.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,p.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"8px",margin:0},children:"Confirm Payment"}),(0,p.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"24px",margin:"8px 0 24px 0"},children:"Are you sure you want to process this payment?"}),(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Invoice:"}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:ie.invoiceNumber})})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Restaurant:"}),(0,p.jsx)("span",{children:ie.restaurantName})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Payment Amount:"}),(0,p.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,o.vv)(ie.total,G)})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Payment Date:"}),(0,p.jsx)("span",{children:ue.paymentDate})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Method:"}),(0,p.jsx)("span",{children:(null===(e=de.find(e=>e.id===ue.paymentMethod))||void 0===e?void 0:e.name)||ue.paymentMethod})]})]}),(0,p.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px",fontSize:"13px",color:"#0369A1"},children:"Warning: This action will mark the invoice as PAID and cannot be easily undone."})]})}),ne&&ie&&(0,p.jsxs)(c.aF,{isOpen:!0,onClose:()=>te(!1),title:`Submit Payment - ${ie.invoiceNumber}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j,{variant:"secondary",onClick:()=>te(!1),children:" Cancel "}),(0,p.jsx)(j,{variant:"success",onClick:()=>{ie&&(ue.paymentMethod?"stripe"===ue.paymentMethod||"paypal"===ue.paymentMethod||ue.transactionId||ue.receiptImage?(te(!1),setTimeout(()=>{re(!0)},100)):we("Please provide either a Transaction ID/Reference Number OR upload a payment receipt."):we("Please select a payment method."))},disabled:!ue.paymentMethod||0===de.length,children:" Submit Payment "})]}),children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Invoice Details"}),(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Restaurant:"}),(0,p.jsx)("span",{children:ie.restaurantName})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Due Date:"}),(0,p.jsx)("span",{children:Ie(ie.dueDate)})]}),(0,p.jsxs)(O,{highlight:!0,children:[(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:"Amount Due:"})}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,o.vv)(ie.total,ie.currency)})})]})]})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Payment Method"}),pe?(0,p.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#6B7280",fontSize:"14px"},children:"Loading payment methods..."}):0===de.length?(0,p.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#EF4444",fontSize:"14px",background:"#FEF2F2",borderRadius:"8px"},children:"No payment methods configured by the invoice issuer."}):(0,p.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(100px, 1fr))",gap:"8px"},children:de.map(e=>{const n=ue.paymentMethod===e.id;return(0,p.jsxs)("div",{onClick:()=>{he(n=>({...n,paymentMethod:e.id})),we("")},style:{padding:"12px 8px",border:"1px solid "+(n?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",textAlign:"center",background:n?"rgba(99,91,255,0.1)":"white",transition:"all 0.15s"},children:[(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:n?"#635BFF":"#374151"},children:e.name}),(0,p.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"2px"},children:e.description})]},e.id)})})]}),"bank_transfer"===ue.paymentMethod&&(()=>{const e=de.find(e=>"bank_transfer"===e.id);return e?(0,p.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",margin:"8px 0"},children:(0,p.jsxs)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:[(0,p.jsx)("strong",{children:"Bank:"})," ",e.bankName,(0,p.jsx)("br",{}),(0,p.jsx)("strong",{children:"Account:"})," ",e.accountNumber,(0,p.jsx)("br",{}),(0,p.jsx)("strong",{children:"Name:"})," ",e.accountName]})}):null})(),"qr_payment"===ue.paymentMethod&&(()=>{const e=de.find(e=>"qr_payment"===e.id);return e?(0,p.jsxs)("div",{style:{textAlign:"center",margin:"8px 0"},children:[(0,p.jsx)("img",{src:e.qrImage,alt:"QR Payment",style:{maxWidth:"200px",borderRadius:"8px"}}),e.qrDescription&&(0,p.jsx)("p",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:e.qrDescription})]}):null})(),ue.paymentMethod&&"stripe"!==ue.paymentMethod&&"paypal"!==ue.paymentMethod&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Transaction ID / Reference Number"}),(0,p.jsx)(z,{type:"text",value:ue.transactionId,onChange:e=>he({...ue,transactionId:e.target.value}),placeholder:"Enter transaction ID or reference number"})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Notes (Optional)"}),(0,p.jsx)("textarea",{placeholder:"Any additional information about the payment...",value:ue.notes,onChange:e=>he(n=>({...n,notes:e.target.value})),style:{width:"100%",boxSizing:"border-box",padding:"8px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",minHeight:"60px",resize:"vertical",fontFamily:"inherit"}})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Payment Receipt Image"}),(0,p.jsx)("div",{style:{border:"2px dashed #E6EBF1",borderRadius:"8px",padding:"20px",textAlign:"center",background:ue.receiptImage?"#F0FDF4":"#FAFBFC",cursor:"pointer",position:"relative"},children:ue.receiptImage?(0,p.jsxs)("div",{children:[(0,p.jsx)("img",{src:ue.receiptImage,alt:"Payment Receipt",style:{maxWidth:"100%",maxHeight:"200px",borderRadius:"8px",marginBottom:"12px"}}),(0,p.jsx)("div",{children:(0,p.jsx)("button",{type:"button",onClick:()=>he(e=>({...e,receiptImage:""})),style:{background:"#EF4444",color:"white",border:"none",padding:"8px 16px",borderRadius:"6px",cursor:"pointer",fontSize:"13px"},children:"Remove Image"})})]}):(0,p.jsxs)("label",{style:{cursor:"pointer",display:"block"},children:[(0,p.jsx)("input",{type:"file",accept:"image/*",onChange:async e=>{var n;const t=null===(n=e.target.files)||void 0===n?void 0:n[0];if(!t||!t.type.startsWith("image/"))return;if(t.size>10485760)return;const a=new FileReader;a.onload=e=>{he(n=>{var t;return{...n,receiptImage:null===(t=e.target)||void 0===t?void 0:t.result}})},a.readAsDataURL(t)},style:{display:"none"}}),(0,p.jsxs)("div",{style:{color:"#6B7280",fontSize:"14px"},children:[(0,p.jsx)("div",{style:{fontSize:"24px",marginBottom:"8px"},children:"+"}),(0,p.jsx)("div",{children:"Click to upload payment receipt"}),(0,p.jsx)("div",{style:{fontSize:"12px",marginTop:"4px"},children:"Supports JPG, PNG (max 5MB)"})]})]})})]})]}),Ce&&(0,p.jsx)("div",{style:{padding:"10px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",fontSize:"13px",color:"#DC2626",marginTop:"8px"},children:Ce})]}),Z&&ie&&oe&&(0,p.jsxs)(c.aF,{isOpen:!0,onClose:()=>ee(!1),title:`Edit Invoice - ${ie.invoiceNumber}`,footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j,{variant:"secondary",onClick:()=>ee(!1),children:" Cancel "}),(0,p.jsx)(j,{variant:"primary",onClick:()=>{if(!ie||!oe)return;const e={...ie,amount:parseFloat(oe.amount),tax:parseFloat(oe.tax),total:parseFloat(oe.total),dueDate:oe.dueDate,status:oe.status,items:oe.items};r(t.map(n=>n.id===ie.id?e:n)),ee(!1),se(null),le(null)},children:" Save Changes "})]}),children:[(0,p.jsxs)(I,{children:[(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Amount (RM)"}),(0,p.jsx)(z,{type:"number",value:oe.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,a=n+t;le({...oe,amount:e.target.value,tax:t.toFixed(2),total:a.toFixed(2)})}})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Due Date"}),(0,p.jsx)(z,{type:"date",value:oe.dueDate,onChange:e=>le({...oe,dueDate:e.target.value})})]})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(M,{children:"Status"}),(0,p.jsxs)(N,{value:oe.status,onChange:e=>le({...oe,status:e.target.value}),children:[(0,p.jsx)("option",{value:"draft",children:"Draft"}),(0,p.jsx)("option",{value:"sent",children:"Sent"}),(0,p.jsx)("option",{value:"paid",children:"Paid"}),(0,p.jsx)("option",{value:"overdue",children:"Overdue"}),(0,p.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Subtotal:"}),(0,p.jsx)("span",{children:(0,o.vv)(parseFloat(oe.amount||0),G)})]}),ie&&ie.discountAmount&&ie.discountAmount>0&&(0,p.jsxs)(O,{children:[(0,p.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===ie.discountType?` (${ie.discountValue}%)`:"",":"]}),(0,p.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(ie.discountAmount,G)]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)("span",{children:"Tax (6%):"}),(0,p.jsx)("span",{children:(0,o.vv)(parseFloat(oe.tax||0),G)})]}),(0,p.jsxs)(O,{highlight:!0,children:[(0,p.jsx)("span",{children:"Total:"}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,o.vv)(parseFloat(oe.total||0),G)})})]})]})]})]})]}),Ce&&(0,p.jsxs)("div",{style:{position:"fixed",bottom:24,right:24,zIndex:9999,background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:8,padding:"12px 20px",color:"#DC2626",fontSize:14,fontWeight:500,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",display:"flex",alignItems:"center",gap:12},children:[(0,p.jsx)("span",{children:Ce}),(0,p.jsx)("button",{onClick:()=>we(""),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontWeight:700,fontSize:16},children:"x"})]}),(0,p.jsx)(d.A,{isOpen:je,title:"send"===fe?"Send Invoice":"Mark as Overdue",message:"send"===fe?`Send invoice ${null===ye||void 0===ye?void 0:ye.invoiceNumber} to ${null===ye||void 0===ye?void 0:ye.restaurantName}?`:`Mark invoice ${null===ye||void 0===ye?void 0:ye.invoiceNumber} as overdue?`,onConfirm:()=>{ye&&(ve(!1),"send"===fe?r(t.map(e=>e.id===ye.id?{...e,status:"sent"}:e)):"overdue"===fe&&r(t.map(e=>e.id===ye.id?{...e,status:"overdue"}:e)),be(null),Fe(""))},onCancel:()=>{ve(!1),be(null),Fe("")},confirmText:"send"===fe?"Send":"Mark Overdue",cancelText:"Cancel",type:"send"===fe?"info":"warning"})]})}},7617:(e,n,t)=>{t.d(n,{A:()=>u});t(9950);var a=t(7119),r=t(4752),i=t(9610),s=t(4414);const o=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,l=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=r.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=r.Ay.div`
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
`,u=e=>{let{isOpen:n,title:t,message:r,onConfirm:u,onCancel:h,confirmText:g="Confirm",cancelText:m="Cancel",type:j="warning"}=e;return n?a.createPortal((0,s.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,s.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(l,{children:[(0,s.jsx)(d,{children:t}),(0,s.jsx)(c,{children:r})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(x,{variant:"secondary",onClick:h,children:m}),(0,s.jsx)(x,{variant:"primary",type:j,onClick:u,children:g})]})]})}),document.body):null}}}]);