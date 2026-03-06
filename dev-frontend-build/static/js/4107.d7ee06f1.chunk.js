"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4107],{4021:(e,n,t)=>{t.d(n,{i1:()=>s});var r=t(9950),a=t(1367),i=t(6038);const s=()=>{const{user:e}=(0,a.As)(),[n,t]=(0,r.useState)("RM"),[s]=(0,r.useState)(Object.keys(i.DL)),[o,l]=(0,r.useState)(!0),[d,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let a=r>=0?n[r+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";t(r)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),c("Failed to load currency settings"),t("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:o,error:d}}},4107:(e,n,t)=>{t.r(n),t.d(n,{default:()=>V});var r=t(9950),a=t(4752),i=t(1367),s=t(6910),o=t(6038),l=t(4021),d=t(7617),c=t(8409),p=t(4414);const x=a.Ay.div`
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
`,g=a.Ay.h1`
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
`,w=a.Ay.div``,k=a.Ay.div`
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
`,M=a.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 24px;
`,z=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,N=a.Ay.button`
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
`,P=a.Ay.div`
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
`,$=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,O=a.Ay.div`
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
`,q=a.Ay.textarea`
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
`,W=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,J=a.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,Y=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  
  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,V=()=>{var e;const{user:n}=(0,i.As)(),[t,a]=(0,r.useState)([]),[V,Q]=(0,r.useState)(""),[H,G]=(0,r.useState)("all"),[K,X]=(0,r.useState)("all"),[Z,ee]=(0,r.useState)(!1),{defaultCurrency:ne}=(0,l.i1)(),[te,re]=(0,r.useState)("RM");(0,r.useEffect)(()=>{ne&&re(ne)},[ne]);const[ae,ie]=(0,r.useState)(!1),[se,oe]=(0,r.useState)(!1),[le,de]=(0,r.useState)(!1),[ce,pe]=(0,r.useState)(!1),[xe,ue]=(0,r.useState)(null),[he,ge]=(0,r.useState)(null),[je,me]=(0,r.useState)([]),[ve,ye]=(0,r.useState)(!1),[be,fe]=(0,r.useState)({paymentMethod:"",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),[Fe,Ce]=(0,r.useState)({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"}),[Ae,we]=(0,r.useState)(!1),[ke,De]=(0,r.useState)(null),[Se,Ee]=(0,r.useState)(""),[Be,Ie]=(0,r.useState)("");(0,r.useEffect)(()=>{n&&(async()=>{try{const e=(null===n||void 0===n?void 0:n.managerId)||(null===n||void 0===n?void 0:n.id)||"2",t=await fetch(`${s.JR}/api/invoices/manager/${e}`);if(t.ok){const e=await t.json();a(e)}else console.error("Failed to fetch invoices from API"),a([])}catch(e){console.error("Failed to fetch invoices:",e),a([])}})()},[n]);const Te=t.filter(e=>{var n;const t=e.restaurantName.toLowerCase().includes(V.toLowerCase())||e.invoiceNumber.toLowerCase().includes(V.toLowerCase())||(null===(n=e.restaurantManager)||void 0===n?void 0:n.toLowerCase().includes(V.toLowerCase()||"")),r="all"===H||e.status===H,a="all"===K||e.issueDate.includes(K);return t&&r&&a}),Me=t.length,ze=t.filter(e=>"paid"===e.status).length,Ne=t.filter(e=>"overdue"===e.status).length,Pe=t.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),Re=e=>new Date(e).toLocaleDateString("en-MY"),$e=async e=>{ue(e),fe({paymentMethod:"",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null}),Ie(""),await(async(e,n,t)=>{ye(!0);try{let r=`/api/admin/payment-settings/available/${e}`;"brand"===n&&t?r=`/api/brands/${t}/payment-settings/available/${e}`:"foodcourt"===n&&t&&(r=`/api/foodcourts/${t}/payment-settings/available/${e}`);const a=localStorage.getItem("auth_token"),i=await fetch(r,{headers:{Authorization:`Bearer ${a}`}});if(i.ok){const e=await i.json();me(e.methods||[]),e.methods&&e.methods.length>0&&fe(n=>({...n,paymentMethod:e.methods[0].id}))}else me([])}catch(r){console.error("Error fetching payment methods:",r),me([])}finally{ye(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId),de(!0)},Oe=e=>{(e=>{De(e),Ee("overdue"),we(!0)})(e)};return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(g,{children:"Restaurant Invoice Management"}),(0,p.jsxs)(j,{children:[(0,p.jsx)(m,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalInvoices:t.length,summary:{totalAmount:t.reduce((e,n)=>e+n.total,0),paidInvoices:t.filter(e=>"paid"===e.status).length,overdueInvoices:t.filter(e=>"overdue"===e.status).length,draftInvoices:t.filter(e=>"draft"===e.status).length,paidAmount:t.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),outstandingAmount:t.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0)},statusBreakdown:{draft:t.filter(e=>"draft"===e.status).length,sent:t.filter(e=>"sent"===e.status).length,paid:t.filter(e=>"paid"===e.status).length,overdue:t.filter(e=>"overdue"===e.status).length,cancelled:t.filter(e=>"cancelled"===e.status).length},invoices:t.map(e=>({invoiceNumber:e.invoiceNumber,restaurantName:e.restaurantName,restaurantManager:e.restaurantManager,issueDate:e.issueDate,dueDate:e.dueDate,paidDate:e.paidDate||"N/A",status:e.status,amount:e.amount,tax:e.tax,total:e.total,billingPeriod:e.billingPeriod,planType:e.planType}))},n=JSON.stringify(e,null,2),r=new Blob([n],{type:"application/json"}),a=URL.createObjectURL(r),i=document.createElement("a");i.href=a,i.download=`restaurant-invoices-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a)},children:"Export"}),(0,p.jsx)(m,{variant:"primary",onClick:()=>{ee(!0)},children:"Create Invoice"})]})]}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(v,{children:[(0,p.jsxs)(y,{color:"#059669",children:[(0,p.jsx)(b,{children:Me}),(0,p.jsx)(f,{children:"Total Invoices"})]}),(0,p.jsxs)(y,{color:"#2563EB",children:[(0,p.jsx)(b,{children:ze}),(0,p.jsx)(f,{children:"Paid Invoices"})]}),(0,p.jsxs)(y,{color:"#DC2626",children:[(0,p.jsx)(b,{children:Ne}),(0,p.jsx)(f,{children:"Overdue Invoices"})]}),(0,p.jsxs)(y,{color:"#7C3AED",children:[(0,p.jsx)(b,{children:(0,o.vv)(Pe)}),(0,p.jsx)(f,{children:"Total Revenue"})]})]}),(0,p.jsxs)(F,{children:[(0,p.jsx)(C,{type:"text",placeholder:"Search by invoice number, restaurant, or plan type...",value:V,onChange:e=>Q(e.target.value)}),(0,p.jsxs)(A,{value:H,onChange:e=>G(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"draft",children:"Draft"}),(0,p.jsx)("option",{value:"sent",children:"Sent"}),(0,p.jsx)("option",{value:"paid",children:"Paid"}),(0,p.jsx)("option",{value:"overdue",children:"Overdue"}),(0,p.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,p.jsxs)(A,{value:K,onChange:e=>X(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Months"}),(0,p.jsx)("option",{value:"2025-01",children:"January 2025"}),(0,p.jsx)("option",{value:"2024-12",children:"December 2024"}),(0,p.jsx)("option",{value:"2024-11",children:"November 2024"})]})]}),(0,p.jsx)(c.an,{children:0===Te.length?(0,p.jsxs)(c.ys,{children:[(0,p.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",marginBottom:"8px"},children:"No invoices found"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:"Try adjusting your filters or create a new invoice"})]}):(0,p.jsxs)(c.bQ,{children:[(0,p.jsx)(c.B_,{children:(0,p.jsxs)("tr",{children:[(0,p.jsx)(c.gU,{children:"Invoice"}),(0,p.jsx)(c.gU,{children:"Restaurant"}),(0,p.jsx)(c.gU,{children:"Issue Date"}),(0,p.jsx)(c.gU,{children:"Due Date"}),(0,p.jsx)(c.gU,{children:"Status"}),(0,p.jsx)(c.gU,{align:"right",children:"Amount"}),(0,p.jsx)(c.gU,{align:"right",children:"Total"}),(0,p.jsx)(c.gU,{children:"Actions"})]})}),(0,p.jsx)("tbody",{children:Te.map(e=>(0,p.jsxs)(c.J2,{children:[(0,p.jsx)(c.Bv,{"data-label":"Invoice",children:(0,p.jsxs)(w,{children:[(0,p.jsx)(k,{children:e.invoiceNumber}),(0,p.jsx)(D,{children:e.planType})]})}),(0,p.jsx)(c.Bv,{"data-label":"Restaurant",children:(0,p.jsxs)(w,{children:[(0,p.jsx)(k,{children:e.restaurantName}),(0,p.jsx)(D,{children:e.restaurantManager})]})}),(0,p.jsx)(c.Bv,{"data-label":"Issue Date",align:"center",children:Re(e.issueDate)}),(0,p.jsx)(c.Bv,{"data-label":"Due Date",align:"center",children:Re(e.dueDate)}),(0,p.jsx)(c.Bv,{"data-label":"Status",align:"center",children:(0,p.jsx)(S,{status:e.status,children:e.status})}),(0,p.jsx)(c.Bv,{"data-label":"Amount",align:"right",children:(0,p.jsx)(c.DM,{children:(0,o.vv)(e.amount)})}),(0,p.jsx)(c.Bv,{"data-label":"Total",align:"right",children:(0,p.jsx)(c.DM,{highlight:!0,children:0===e.total?(0,p.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,o.vv)(e.total)})}),(0,p.jsx)(c.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,p.jsxs)(B,{children:[(0,p.jsx)(E,{variant:"primary",onClick:()=>(e=>{ue(e),ie(!0)})(e),children:"View"}),"draft"===e.status&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(E,{onClick:()=>(e=>{ue(e),ge({amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,items:e.items}),oe(!0)})(e),children:"Edit"}),(0,p.jsx)(E,{onClick:()=>(e=>{De(e),Ee("send"),we(!0)})(e),children:"Send"})]}),"sent"===e.status&&(0,p.jsxs)(p.Fragment,{children:[e.total>0&&(0,p.jsx)(E,{variant:"primary",onClick:()=>$e(e),children:"Pay Now"}),(0,p.jsx)(E,{onClick:()=>Oe(e),children:"Mark Overdue"})]}),"overdue"===e.status&&e.total>0&&(0,p.jsx)(E,{variant:"primary",onClick:()=>$e(e),children:"Pay Now"}),"paid"===e.status&&(0,p.jsx)(E,{onClick:()=>window.print(),children:"Print Receipt"})]})})]},e.id))})]})}),Z&&(0,p.jsx)(I,{onClick:()=>ee(!1),children:(0,p.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Create New Invoice"}),(0,p.jsx)(N,{onClick:()=>ee(!1),children:"\xd7"})]}),(0,p.jsxs)(P,{children:[(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Restaurant Name *"}),(0,p.jsx)(U,{type:"text",value:Fe.restaurantName,onChange:e=>Ce({...Fe,restaurantName:e.target.value}),placeholder:"Enter restaurant name",required:!0})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Restaurant Manager"}),(0,p.jsx)(U,{type:"text",value:Fe.restaurantManager,onChange:e=>Ce({...Fe,restaurantManager:e.target.value}),placeholder:"Enter manager name"})]})]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Amount (RM) *"}),(0,p.jsx)(U,{type:"number",step:"0.01",min:"0",value:Fe.amount,onChange:e=>Ce({...Fe,amount:e.target.value}),placeholder:"0.00",required:!0}),(0,p.jsx)(W,{children:"Tax (6%) will be calculated automatically"})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Due Date *"}),(0,p.jsx)(U,{type:"date",value:Fe.dueDate,onChange:e=>Ce({...Fe,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,p.jsx)($,{children:(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Plan Type"}),(0,p.jsxs)(L,{value:Fe.planType,onChange:e=>Ce({...Fe,planType:e.target.value}),children:[(0,p.jsx)("option",{value:"Basic Plan",children:"Basic Plan"}),(0,p.jsx)("option",{value:"Professional Plan",children:"Professional Plan"}),(0,p.jsx)("option",{value:"Enterprise Plan",children:"Enterprise Plan"})]})]})}),(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Description"}),(0,p.jsx)(q,{value:Fe.description,onChange:e=>Ce({...Fe,description:e.target.value}),placeholder:"Enter invoice description (optional)",rows:3})]}),Fe.amount&&(0,p.jsxs)(J,{children:[(0,p.jsxs)(Y,{children:[(0,p.jsx)("span",{children:"Subtotal:"}),(0,p.jsx)("span",{children:(0,o.vv)(parseFloat(Fe.amount||"0"),te)})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)("span",{children:"Tax (6%):"}),(0,p.jsx)("span",{children:(0,o.vv)(.06*parseFloat(Fe.amount||"0"),te)})]}),(0,p.jsxs)(Y,{highlight:!0,children:[(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:"Total:"})}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,o.vv)(1.06*parseFloat(Fe.amount||"0"),te)})})]})]})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(m,{variant:"secondary",onClick:()=>ee(!1),children:"Cancel"}),(0,p.jsx)(m,{variant:"primary",onClick:()=>{if(!Fe.restaurantName||!Fe.amount||!Fe.dueDate)return void Ie("Please fill in all required fields.");const e=`INV-${(new Date).getFullYear()}-M${String(t.length+1).padStart(3,"0")}`,n=parseFloat(Fe.amount),r=.06*n,i=n+r,s={id:`invoice-${Date.now()}`,invoiceNumber:e,restaurantId:Fe.restaurantId||`rest-${Date.now()}`,restaurantName:Fe.restaurantName,restaurantManager:Fe.restaurantManager,issueDate:(new Date).toISOString().split("T")[0],dueDate:Fe.dueDate,status:"draft",amount:n,tax:r,total:i,items:[{description:Fe.description||`${Fe.planType} Subscription`,quantity:1,unitPrice:n,total:n}],billingPeriod:(new Date).toISOString().slice(0,7),planType:Fe.planType};a([s,...t]),ee(!1),Ce({restaurantId:"",restaurantName:"",restaurantManager:"",amount:"",description:"",dueDate:"",planType:"professional"})},disabled:!Fe.restaurantName||!Fe.amount||!Fe.dueDate,children:"Create Invoice"})]})]})}),ae&&xe&&(0,p.jsx)(I,{onClick:()=>ie(!1),children:(0,p.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(M,{children:[(0,p.jsxs)(z,{children:["Invoice Details - ",xe.invoiceNumber]}),(0,p.jsx)(N,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,p.jsxs)(P,{children:[(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Invoice Number"}),(0,p.jsx)("div",{children:xe.invoiceNumber})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Status"}),(0,p.jsx)(S,{status:xe.status,children:xe.status})]})]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Restaurant"}),(0,p.jsx)("div",{children:xe.restaurantName})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Manager"}),(0,p.jsx)("div",{children:xe.restaurantManager})]})]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Issue Date"}),(0,p.jsx)("div",{children:xe.issueDate})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Due Date"}),(0,p.jsx)("div",{children:xe.dueDate})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Items"}),xe.items.map((e,n)=>(0,p.jsxs)("div",{style:{padding:"8px",background:"#F8FAFC",borderRadius:"4px",marginBottom:"8px"},children:[e.description," - ",(0,o.vv)(e.total,te)]},n))]}),(0,p.jsxs)(J,{children:[(0,p.jsxs)(Y,{children:[(0,p.jsx)("span",{children:"Subtotal:"}),(0,p.jsx)("span",{children:(0,o.vv)(xe.subtotalBeforeDiscount||xe.amount,te)})]}),xe.discountAmount&&xe.discountAmount>0&&(0,p.jsxs)(Y,{children:[(0,p.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===xe.discountType?` (${xe.discountValue}%)`:"",":"]}),(0,p.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(xe.discountAmount,te)]})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)("span",{children:"Tax (6%):"}),(0,p.jsx)("span",{children:(0,o.vv)(xe.tax,te)})]}),(0,p.jsxs)(Y,{highlight:!0,children:[(0,p.jsx)("span",{children:"Total:"}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,o.vv)(xe.total,te)})})]})]})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(m,{variant:"secondary",onClick:()=>ie(!1),children:"Close"}),(0,p.jsx)(m,{variant:"primary",onClick:()=>window.print(),children:"Print Invoice"})]})]})}),ce&&xe&&(0,p.jsx)(I,{onClick:()=>{pe(!1),setTimeout(()=>{de(!0)},100)},children:(0,p.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(M,{children:[(0,p.jsx)(z,{children:"Confirm Payment"}),(0,p.jsx)(N,{onClick:()=>{pe(!1),setTimeout(()=>{de(!0)},100)},children:"\xd7"})]}),(0,p.jsx)(P,{children:(0,p.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,p.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"8px",margin:0},children:"Confirm Payment"}),(0,p.jsx)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"24px",margin:"8px 0 24px 0"},children:"Are you sure you want to process this payment?"}),(0,p.jsxs)(J,{children:[(0,p.jsxs)(Y,{children:[(0,p.jsx)("span",{children:"Invoice:"}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:xe.invoiceNumber})})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)("span",{children:"Restaurant:"}),(0,p.jsx)("span",{children:xe.restaurantName})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)("span",{children:"Payment Amount:"}),(0,p.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,o.vv)(xe.total,te)})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)("span",{children:"Payment Date:"}),(0,p.jsx)("span",{children:be.paymentDate})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)("span",{children:"Method:"}),(0,p.jsx)("span",{children:(null===(e=je.find(e=>e.id===be.paymentMethod))||void 0===e?void 0:e.name)||be.paymentMethod})]})]}),(0,p.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",marginTop:"16px",fontSize:"13px",color:"#0369A1"},children:"Warning: This action will mark the invoice as PAID and cannot be easily undone."})]})}),(0,p.jsxs)(R,{children:[(0,p.jsx)(m,{variant:"secondary",onClick:()=>{pe(!1),setTimeout(()=>{de(!0)},100)},children:"Cancel"}),(0,p.jsx)(m,{variant:"primary",onClick:async()=>{if(xe)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${xe.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:be.paymentMethod,transaction_id:be.transactionId,notes:be.notes,receipt_url:be.receiptFile?"uploaded_receipt_url":null})});if(!t.ok){const e=await t.json();return void Ie(e.error||e.message||"Failed to submit payment")}{const t=(null===n||void 0===n?void 0:n.managerId)||(null===n||void 0===n?void 0:n.id)||"2",r=await fetch(`${s.JR}/api/invoices/manager/${t}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();a(e)}}de(!1),pe(!1),ue(null),fe({paymentMethod:"",transactionId:"",paymentDate:(new Date).toISOString().split("T")[0],notes:"",receiptFile:null})}catch(e){console.error("Payment processing error:",e),Ie("Error processing payment. Please try again.")}},children:"Confirm Payment"})]})]})}),le&&xe&&(0,p.jsx)(I,{onClick:()=>de(!1),children:(0,p.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(M,{children:[(0,p.jsxs)(z,{children:["Submit Payment - ",xe.invoiceNumber]}),(0,p.jsx)(N,{onClick:()=>de(!1),children:"\xd7"})]}),(0,p.jsxs)(P,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Invoice Details"}),(0,p.jsxs)(J,{children:[(0,p.jsxs)(Y,{children:[(0,p.jsx)("span",{children:"Restaurant:"}),(0,p.jsx)("span",{children:xe.restaurantName})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)("span",{children:"Due Date:"}),(0,p.jsx)("span",{children:Re(xe.dueDate)})]}),(0,p.jsxs)(Y,{highlight:!0,children:[(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:"Amount Due:"})}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,o.vv)(xe.total,xe.currency)})})]})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Payment Method"}),ve?(0,p.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#6B7280",fontSize:"14px"},children:"Loading payment methods..."}):0===je.length?(0,p.jsx)("div",{style:{padding:"16px",textAlign:"center",color:"#EF4444",fontSize:"14px",background:"#FEF2F2",borderRadius:"8px"},children:"No payment methods configured by the invoice issuer."}):(0,p.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(100px, 1fr))",gap:"8px"},children:je.map(e=>{const n=be.paymentMethod===e.id;return(0,p.jsxs)("div",{onClick:()=>{fe(n=>({...n,paymentMethod:e.id})),Ie("")},style:{padding:"12px 8px",border:"1px solid "+(n?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",textAlign:"center",background:n?"rgba(99,91,255,0.1)":"white",transition:"all 0.15s"},children:[(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:n?"#635BFF":"#374151"},children:e.name}),(0,p.jsx)("div",{style:{fontSize:"11px",color:"#6B7280",marginTop:"2px"},children:e.description})]},e.id)})})]}),"bank_transfer"===be.paymentMethod&&(()=>{const e=je.find(e=>"bank_transfer"===e.id);return e?(0,p.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"8px",padding:"12px",margin:"8px 0"},children:(0,p.jsxs)("p",{style:{margin:0,fontSize:"13px",color:"#0369A1"},children:[(0,p.jsx)("strong",{children:"Bank:"})," ",e.bankName,(0,p.jsx)("br",{}),(0,p.jsx)("strong",{children:"Account:"})," ",e.accountNumber,(0,p.jsx)("br",{}),(0,p.jsx)("strong",{children:"Name:"})," ",e.accountName]})}):null})(),"qr_payment"===be.paymentMethod&&(()=>{const e=je.find(e=>"qr_payment"===e.id);return e?(0,p.jsxs)("div",{style:{textAlign:"center",margin:"8px 0"},children:[(0,p.jsx)("img",{src:e.qrImage,alt:"QR Payment",style:{maxWidth:"200px",borderRadius:"8px"}}),e.qrDescription&&(0,p.jsx)("p",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:e.qrDescription})]}):null})(),be.paymentMethod&&"stripe"!==be.paymentMethod&&"paypal"!==be.paymentMethod&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Transaction ID / Reference Number"}),(0,p.jsx)(U,{type:"text",value:be.transactionId,onChange:e=>fe({...be,transactionId:e.target.value}),placeholder:"Enter transaction ID or reference number"})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Upload Receipt"}),(0,p.jsx)(U,{type:"file",accept:"image/*,.pdf",onChange:e=>{var n;const t=(null===(n=e.target.files)||void 0===n?void 0:n[0])||null;fe({...be,receiptFile:t})}}),(0,p.jsx)(W,{children:"Upload bank transfer receipt if no transaction ID is provided"}),be.receiptFile&&(0,p.jsxs)("div",{style:{marginTop:"8px",padding:"8px",background:"#F0F9FF",border:"1px solid #0EA5E9",borderRadius:"4px",fontSize:"14px",color:"#0369A1"},children:["File selected: ",be.receiptFile.name]})]})]}),Be&&(0,p.jsx)("div",{style:{padding:"10px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",fontSize:"13px",color:"#DC2626",marginTop:"8px"},children:Be})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(m,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,p.jsx)(m,{variant:"primary",onClick:()=>{xe&&(be.paymentMethod?"stripe"===be.paymentMethod||"paypal"===be.paymentMethod||be.transactionId||be.receiptFile?(de(!1),setTimeout(()=>{pe(!0)},100)):Ie("Please provide either a Transaction ID/Reference Number OR upload a payment receipt."):Ie("Please select a payment method."))},disabled:!be.paymentMethod||0===je.length,children:"Submit Payment"})]})]})}),se&&xe&&he&&(0,p.jsx)(I,{onClick:()=>oe(!1),children:(0,p.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(M,{children:[(0,p.jsxs)(z,{children:["Edit Invoice - ",xe.invoiceNumber]}),(0,p.jsx)(N,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,p.jsxs)(P,{children:[(0,p.jsxs)($,{children:[(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Amount (RM)"}),(0,p.jsx)(U,{type:"number",value:he.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,r=n+t;ge({...he,amount:e.target.value,tax:t.toFixed(2),total:r.toFixed(2)})}})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Due Date"}),(0,p.jsx)(U,{type:"date",value:he.dueDate,onChange:e=>ge({...he,dueDate:e.target.value})})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(_,{children:"Status"}),(0,p.jsxs)(L,{value:he.status,onChange:e=>ge({...he,status:e.target.value}),children:[(0,p.jsx)("option",{value:"draft",children:"Draft"}),(0,p.jsx)("option",{value:"sent",children:"Sent"}),(0,p.jsx)("option",{value:"paid",children:"Paid"}),(0,p.jsx)("option",{value:"overdue",children:"Overdue"}),(0,p.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,p.jsxs)(J,{children:[(0,p.jsxs)(Y,{children:[(0,p.jsx)("span",{children:"Subtotal:"}),(0,p.jsx)("span",{children:(0,o.vv)(parseFloat(he.amount||0),te)})]}),xe&&xe.discountAmount&&xe.discountAmount>0&&(0,p.jsxs)(Y,{children:[(0,p.jsxs)("span",{style:{color:"#059669"},children:["Discount","percentage"===xe.discountType?` (${xe.discountValue}%)`:"",":"]}),(0,p.jsxs)("span",{style:{color:"#059669"},children:["-",(0,o.vv)(xe.discountAmount,te)]})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)("span",{children:"Tax (6%):"}),(0,p.jsx)("span",{children:(0,o.vv)(parseFloat(he.tax||0),te)})]}),(0,p.jsxs)(Y,{highlight:!0,children:[(0,p.jsx)("span",{children:"Total:"}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,o.vv)(parseFloat(he.total||0),te)})})]})]})]}),(0,p.jsxs)(R,{children:[(0,p.jsx)(m,{variant:"secondary",onClick:()=>oe(!1),children:"Cancel"}),(0,p.jsx)(m,{variant:"primary",onClick:()=>{if(!xe||!he)return;const e={...xe,amount:parseFloat(he.amount),tax:parseFloat(he.tax),total:parseFloat(he.total),dueDate:he.dueDate,status:he.status,items:he.items};a(t.map(n=>n.id===xe.id?e:n)),oe(!1),ue(null),ge(null)},children:"Save Changes"})]})]})})]})]}),Be&&(0,p.jsxs)("div",{style:{position:"fixed",bottom:24,right:24,zIndex:9999,background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:8,padding:"12px 20px",color:"#DC2626",fontSize:14,fontWeight:500,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",display:"flex",alignItems:"center",gap:12},children:[(0,p.jsx)("span",{children:Be}),(0,p.jsx)("button",{onClick:()=>Ie(""),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontWeight:700,fontSize:16},children:"x"})]}),(0,p.jsx)(d.A,{isOpen:Ae,title:"send"===Se?"Send Invoice":"Mark as Overdue",message:"send"===Se?`Send invoice ${null===ke||void 0===ke?void 0:ke.invoiceNumber} to ${null===ke||void 0===ke?void 0:ke.restaurantName}?`:`Mark invoice ${null===ke||void 0===ke?void 0:ke.invoiceNumber} as overdue?`,onConfirm:()=>{ke&&(we(!1),"send"===Se?a(t.map(e=>e.id===ke.id?{...e,status:"sent"}:e)):"overdue"===Se&&a(t.map(e=>e.id===ke.id?{...e,status:"overdue"}:e)),De(null),Ee(""))},onCancel:()=>{we(!1),De(null),Ee("")},confirmText:"send"===Se?"Send":"Mark Overdue",cancelText:"Cancel",type:"send"===Se?"info":"warning"})]})}},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var r=t(4752),a=t(9610),i=t(4414);const s=r.Ay.div`
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
`,p=r.Ay.button`
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
`,x=e=>{let{isOpen:n,title:t,message:r,onConfirm:x,onCancel:u,confirmText:h="Confirm",cancelText:g="Cancel",type:j="warning"}=e;return n?(0,i.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,i.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(o,{children:[(0,i.jsx)(l,{children:t}),(0,i.jsx)(d,{children:r})]}),(0,i.jsxs)(c,{children:[(0,i.jsx)(p,{variant:"secondary",onClick:u,children:g}),(0,i.jsx)(p,{variant:"primary",type:j,onClick:x,children:h})]})]})}):null}}}]);