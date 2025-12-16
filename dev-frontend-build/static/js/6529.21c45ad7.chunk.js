"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6529],{2488:(e,n,t)=>{t.d(n,{DO:()=>l,Jt:()=>p,Qn:()=>d});t(9950);var i=t(4752),o=t(4414);const a=i.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,r=i.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,s=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,d=e=>{let{children:n,className:t,style:i,...r}=e;return(0,o.jsx)(a,{className:t,style:i,...r,children:n})},l=e=>{let{placeholder:n="Search...",...t}=e;return(0,o.jsx)(r,{placeholder:n,...t})},p=e=>{let{children:n,...t}=e;return(0,o.jsx)(s,{...t,children:n})}},6529:(e,n,t)=>{t.r(n),t.d(n,{default:()=>P});var i=t(9950),o=t(4752),a=t(3310),r=t(2488),s=t(1367),d=t(9610),l=t(6038),p=t(4414);const c=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,x=o.Ay.div`
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
`,u=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=o.Ay.div`
  display: grid;
  gap: 20px;
`,m=o.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,b=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,v=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,f=o.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"pending_payment":return"#FEF3C7";case"payment_submitted":return"#DBEAFE";case"paid":return"#ECFDF5";case"overdue":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"pending_payment":return"#D97706";case"payment_submitted":return"#1E40AF";case"paid":return"#059669";case"overdue":return"#DC2626";default:return"#6B7280"}}};
`,y=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`,w=o.Ay.div``,F=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=o.Ay.div`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,B=o.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,k=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
    padding-top: 8px;
    border-top: 1px solid #E6EBF1;
    font-weight: 600;
  }
`,A=o.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,S=o.Ay.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${e=>"danger"===e.variant?"\n    background: #DC2626;\n    color: white;\n\n    &:hover {\n      background: #B91C1C;\n    }\n  ":"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,D=o.Ay.div`
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#E6EBF1"};
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    background: rgba(99, 91, 255, 0.03);
  }
`,E=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      height: 3px;
    }

    &::-webkit-scrollbar-track {
      background: #F8FAFC;
    }

    &::-webkit-scrollbar-thumb {
      background: #CBD5E1;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #94A3B8;
    }
  }
`,z=o.Ay.button`
  padding: 12px 16px;
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"rgba(99, 91, 255, 0.1)":"white"};
  color: ${e=>e.active?"#635BFF":"#374151"};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    border-color: ${e=>e.active?"#635BFF":"#D1D5DB"};
    background: ${e=>e.active?"rgba(99, 91, 255, 0.1)":"#F9FAFB"};
  }
`,$=e=>{switch(e){case"pending_payment":return"Pending";case"payment_submitted":return"Verifying";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";default:return e}},P=()=>{const{user:e}=(0,s.As)(),[n,t]=(0,i.useState)([]),[o,P]=(0,i.useState)("all"),[C,_]=(0,i.useState)(null),[T,I]=(0,i.useState)(!1),[N,R]=(0,i.useState)(null),[O,M]=(0,i.useState)(""),[W,L]=(0,i.useState)(!0),[U,Q]=(0,i.useState)(!1),[J,Y]=(0,i.useState)("receipt"),[G,H]=(0,i.useState)(""),[Z,V]=(0,i.useState)("");(0,i.useEffect)(()=>{X()},[e]);const X=async()=>{if(console.log("\ud83d\udd0d fetchInvoices called, user:",e),console.log("\ud83d\udd0d user.restaurantId:",null===e||void 0===e?void 0:e.restaurantId),console.log("\ud83d\udd0d user.role:",null===e||void 0===e?void 0:e.role),console.log("\ud83d\udd0d user.name:",null===e||void 0===e?void 0:e.name),null===e||void 0===e||!e.restaurantId)return console.error("\u274c No restaurantId found in user. User must be assigned to a restaurant."),console.log("\u274c Current user object:",JSON.stringify(e,null,2)),void L(!1);try{L(!0),console.log("\u2705 Fetching invoices for restaurant:",e.restaurantId);const n=localStorage.getItem("auth_token"),i=await fetch(`/api/invoices/restaurant/${e.restaurantId}`,{headers:{Authorization:"Bearer "+n}}),o=await i.json();if(console.log("\ud83d\udce5 Invoice API response:",{status:i.status,dataLength:Array.isArray(o)?o.length:"not array"}),console.log("\ud83d\udce5 Raw invoice data:",o),i.ok){const e=o.map((e,n)=>{console.log(`\ud83d\udcdd Transforming invoice ${n+1}:`,{id:e.id,invoice_number:e.invoice_number,status:e.status,statusEmpty:""===e.status,statusNull:null===e.status,statusUndefined:void 0===e.status});const t=e.status&&""!==e.status.trim()?e.status.trim():"pending_payment";return{id:e.id.toString(),invoiceNumber:e.invoice_number,planType:e.plan_type||"Subscription Plan",billingPeriod:`${new Date(e.billing_period_start).toLocaleDateString("en-US",{month:"long",year:"numeric"})}`,amount:parseFloat(e.total_amount)-.06*parseFloat(e.total_amount),tax:.06*parseFloat(e.total_amount),total:parseFloat(e.total_amount),status:t,issueDate:new Date(e.issued_at||e.createdAt).toISOString().split("T")[0],dueDate:new Date(e.due_date).toISOString().split("T")[0],paidDate:e.paid_at?new Date(e.paid_at).toISOString().split("T")[0]:void 0}});console.log("\u2705 Transformed invoices:",e),console.log(`\u2705 Total invoices: ${e.length}`),t(e)}else console.error("\u274c Failed to fetch invoices:",o)}catch(n){console.error("\u274c Exception while fetching invoices:",n)}finally{L(!1)}},K=n.filter(e=>"all"===o||e.status===o),q=(n,t)=>{const i=(new Date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});return`\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Invoice ${n.invoiceNumber}</title>\n  <style>\n    @media print {\n      @page { margin: 20mm; }\n      body { margin: 0; }\n    }\n    * { box-sizing: border-box; }\n    body {\n      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;\n      line-height: 1.6;\n      color: #0A2540;\n      max-width: 800px;\n      margin: 0 auto;\n      padding: 40px 20px;\n    }\n    .invoice-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: start;\n      margin-bottom: 40px;\n      padding-bottom: 20px;\n      border-bottom: 2px solid #635BFF;\n    }\n    .company-info h1 {\n      margin: 0 0 10px 0;\n      font-size: 28px;\n      color: #635BFF;\n    }\n    .company-info p {\n      margin: 4px 0;\n      font-size: 14px;\n      color: #6B7280;\n    }\n    .invoice-meta {\n      text-align: right;\n    }\n    .invoice-number {\n      font-size: 24px;\n      font-weight: 700;\n      color: #0A2540;\n      margin-bottom: 10px;\n    }\n    .invoice-meta p {\n      margin: 4px 0;\n      font-size: 14px;\n      color: #6B7280;\n    }\n    .bill-to {\n      margin-bottom: 40px;\n    }\n    .bill-to h3 {\n      margin: 0 0 12px 0;\n      font-size: 14px;\n      font-weight: 600;\n      color: #6B7280;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n    .bill-to p {\n      margin: 4px 0;\n      font-size: 15px;\n      color: #0A2540;\n    }\n    .bill-to strong {\n      font-size: 16px;\n      font-weight: 600;\n    }\n    table {\n      width: 100%;\n      border-collapse: collapse;\n      margin-bottom: 30px;\n    }\n    thead {\n      background: #F8FAFC;\n    }\n    th {\n      padding: 14px 12px;\n      text-align: left;\n      font-size: 12px;\n      font-weight: 600;\n      color: #6B7280;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n      border-bottom: 2px solid #E6EBF1;\n    }\n    th:last-child, td:last-child {\n      text-align: right;\n    }\n    td {\n      padding: 16px 12px;\n      font-size: 14px;\n      color: #374151;\n      border-bottom: 1px solid #F3F4F6;\n    }\n    tbody tr:hover {\n      background: #F9FAFB;\n    }\n    .totals {\n      margin-left: auto;\n      width: 300px;\n      margin-top: 20px;\n    }\n    .totals-row {\n      display: flex;\n      justify-content: space-between;\n      padding: 10px 0;\n      font-size: 14px;\n    }\n    .totals-row.subtotal {\n      color: #6B7280;\n    }\n    .totals-row.tax {\n      color: #6B7280;\n      padding-bottom: 12px;\n      border-bottom: 1px solid #E6EBF1;\n    }\n    .totals-row.total {\n      font-size: 18px;\n      font-weight: 700;\n      color: #0A2540;\n      padding-top: 12px;\n    }\n    .footer {\n      margin-top: 60px;\n      padding-top: 20px;\n      border-top: 1px solid #E6EBF1;\n      text-align: center;\n      font-size: 12px;\n      color: #9CA3AF;\n    }\n    .status-badge {\n      display: inline-block;\n      padding: 4px 12px;\n      border-radius: 6px;\n      font-size: 12px;\n      font-weight: 600;\n      text-transform: uppercase;\n    }\n    .status-pending {\n      background: #FEF3C7;\n      color: #92400E;\n    }\n    .status-paid {\n      background: #D1FAE5;\n      color: #065F46;\n    }\n    .status-overdue {\n      background: #FEE2E2;\n      color: #991B1B;\n    }\n    @media print {\n      .no-print { display: none; }\n    }\n  </style>\n</head>\n<body>\n  <div class="invoice-header">\n    <div class="company-info">\n      <h1>${(null===t||void 0===t?void 0:t.companyName)||"Purple Here Center"}</h1>\n      <p>${(null===t||void 0===t?void 0:t.address)||""}</p>\n      ${null!==t&&void 0!==t&&t.city&&null!==t&&void 0!==t&&t.state?`<p>${t.city}, ${t.state} ${t.postalCode||""}</p>`:""}\n      ${null!==t&&void 0!==t&&t.phone?`<p>Phone: ${t.phone}</p>`:""}\n      <p>Email: ${(null===t||void 0===t?void 0:t.email)||"support@orderhere.center"}</p>\n      ${null!==t&&void 0!==t&&t.taxNumber?`<p>Tax ID: ${t.taxNumber}</p>`:""}\n    </div>\n    <div class="invoice-meta">\n      <div class="invoice-number">${n.invoiceNumber}</div>\n      <p><strong>Issue Date:</strong> ${n.issueDate}</p>\n      <p><strong>Due Date:</strong> ${n.dueDate}</p>\n      ${n.paidDate?`<p><strong>Paid Date:</strong> ${n.paidDate}</p>`:""}\n      <p><span class="status-badge status-${"paid"===n.status?"paid":"overdue"===n.status?"overdue":"pending"}">\n        ${"pending_payment"===n.status?"Pending":"paid"===n.status?"Paid":"overdue"===n.status?"Overdue":n.status}\n      </span></p>\n    </div>\n  </div>\n\n  <div class="bill-to">\n    <h3>Bill To</h3>\n    <p><strong>${(null===e||void 0===e?void 0:e.restaurantName)||"Restaurant"}</strong></p>\n    <p>Plan: ${n.planType}</p>\n    <p>Period: ${n.billingPeriod}</p>\n  </div>\n\n  <table>\n    <thead>\n      <tr>\n        <th>Description</th>\n        <th style="width: 100px;">Quantity</th>\n        <th style="width: 120px;">Unit Price</th>\n        <th style="width: 120px;">Amount</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>\n          <strong>${n.planType} - Monthly Subscription</strong><br>\n          <span style="font-size: 12px; color: #6B7280;">Billing Period: ${n.billingPeriod}</span>\n        </td>\n        <td>1</td>\n        <td>RM ${n.amount.toFixed(2)}</td>\n        <td>RM ${n.amount.toFixed(2)}</td>\n      </tr>\n    </tbody>\n  </table>\n\n  <div class="totals">\n    <div class="totals-row subtotal">\n      <span>Subtotal:</span>\n      <span>RM ${n.amount.toFixed(2)}</span>\n    </div>\n    <div class="totals-row tax">\n      <span>Tax (6%):</span>\n      <span>RM ${n.tax.toFixed(2)}</span>\n    </div>\n    <div class="totals-row total">\n      <span>Total Amount:</span>\n      <span>RM ${n.total.toFixed(2)}</span>\n    </div>\n  </div>\n\n  <div class="footer">\n    <p>Thank you for your business!</p>\n    <p>This is a computer-generated invoice. Generated on ${i}</p>\n  </div>\n\n  <div class="no-print" style="margin-top: 40px; text-align: center;">\n    <button onclick="window.print()" style="padding: 12px 24px; background: #635BFF; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">\n      Print Invoice\n    </button>\n    <button onclick="window.close()" style="padding: 12px 24px; background: white; color: #6B7280; border: 1px solid #E6EBF1; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; margin-left: 12px;">\n      Close\n    </button>\n  </div>\n</body>\n</html>\n    `},ee=n.filter(e=>"pending_payment"===e.status||"payment_submitted"===e.status).length,ne=n.filter(e=>"paid"===e.status).length,te=n.filter(e=>"overdue"===e.status).length,ie=n.filter(e=>"pending_payment"===e.status||"overdue"===e.status).reduce((e,n)=>e+n.total,0);return(0,p.jsx)(a.A,{children:(0,p.jsxs)(c,{children:[(0,p.jsx)(x,{children:(0,p.jsx)(g,{children:"Invoices"})}),(0,p.jsxs)(u,{children:[(0,p.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"20px",marginBottom:"32px"},children:[(0,p.jsxs)("div",{style:{background:"white",padding:"20px",borderRadius:"12px",border:"1px solid #E6EBF1",borderLeft:"4px solid #D97706"},children:[(0,p.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#0A2540"},children:ee}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Pending"})]}),(0,p.jsxs)("div",{style:{background:"white",padding:"20px",borderRadius:"12px",border:"1px solid #E6EBF1",borderLeft:"4px solid #635BFF"},children:[(0,p.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#0A2540"},children:ne}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Paid"})]}),(0,p.jsxs)("div",{style:{background:"white",padding:"20px",borderRadius:"12px",border:"1px solid #E6EBF1",borderLeft:"4px solid #DC2626"},children:[(0,p.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#0A2540"},children:te}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Overdue"})]}),(0,p.jsxs)("div",{style:{background:"white",padding:"20px",borderRadius:"12px",border:"1px solid #E6EBF1",borderLeft:"4px solid #8B5CF6"},children:[(0,p.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#0A2540"},children:(0,l.vv)(ie)}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Outstanding"})]})]}),(0,p.jsx)(r.Qn,{children:(0,p.jsxs)(r.Jt,{value:o,onChange:e=>P(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Invoices"}),(0,p.jsx)("option",{value:"pending_payment",children:"Pending"}),(0,p.jsx)("option",{value:"payment_submitted",children:"Verifying"}),(0,p.jsx)("option",{value:"paid",children:"Paid"}),(0,p.jsx)("option",{value:"overdue",children:"Overdue"})]})}),W&&(0,p.jsx)("div",{style:{textAlign:"center",padding:"60px",color:"#6B7280"},children:"Loading invoices..."}),!W&&!(null!==e&&void 0!==e&&e.restaurantId)&&(0,p.jsxs)("div",{style:{textAlign:"center",padding:"60px"},children:[(0,p.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"10px"},children:"No Restaurant Assigned"}),(0,p.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"Your account is not assigned to a restaurant. Please contact your system administrator."})]}),!W&&(null===e||void 0===e?void 0:e.restaurantId)&&0===K.length&&(0,p.jsxs)("div",{style:{textAlign:"center",padding:"60px"},children:[(0,p.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"10px"},children:"No Invoices Found"}),(0,p.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"Your restaurant doesn't have any invoices yet."})]}),!W&&K.length>0&&(0,p.jsx)(h,{children:K.map(e=>(0,p.jsxs)(m,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(v,{children:e.invoiceNumber}),(0,p.jsx)(f,{status:e.status,children:$(e.status)})]}),(0,p.jsxs)(y,{children:[(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{children:"Plan"}),(0,p.jsx)(j,{children:e.planType})]}),(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{children:"Billing Period"}),(0,p.jsx)(j,{children:e.billingPeriod})]}),(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{children:"Issue Date"}),(0,p.jsx)(j,{children:e.issueDate})]}),(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{children:"Due Date"}),(0,p.jsx)(j,{children:e.dueDate})]}),e.paidDate&&(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{children:"Paid Date"}),(0,p.jsx)(j,{children:e.paidDate})]})]}),(0,p.jsxs)(B,{children:[(0,p.jsxs)(k,{children:[(0,p.jsx)("span",{children:"Subtotal:"}),(0,p.jsx)("span",{children:(0,l.vv)(e.amount)})]}),(0,p.jsxs)(k,{children:[(0,p.jsx)("span",{children:"Tax (6%):"}),(0,p.jsx)("span",{children:(0,l.vv)(e.tax)})]}),(0,p.jsxs)(k,{children:[(0,p.jsx)("span",{children:"Total:"}),(0,p.jsx)("span",{children:(0,l.vv)(e.total)})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsx)(S,{variant:"secondary",onClick:()=>(async e=>{try{const n=localStorage.getItem("auth_token");if(!(await fetch(`/api/invoices/${e.id}`,{headers:{Authorization:"Bearer "+n}})).ok)return void alert("Failed to load invoice details");const t=await fetch("/api/invoice-settings");let i=null;if(t.ok){const e=await t.json();i=e.data||e}const o=q(e,i),a=window.open("","_blank");a&&(a.document.write(o),a.document.close())}catch(n){console.error("Error downloading invoice:",n),alert("Failed to download invoice. Please try again.")}})(e),children:"Invoice"}),("pending_payment"===e.status||"overdue"===e.status)&&(0,p.jsx)(S,{variant:"overdue"===e.status?"danger":"primary",onClick:()=>(e=>{_(e),I(!0)})(e),children:"overdue"===e.status?"Pay Now":"Mark as Paid"}),"payment_submitted"===e.status&&(0,p.jsx)("div",{style:{fontSize:"13px",color:"#635BFF",fontStyle:"italic",fontWeight:"500"},children:"Payment verification in progress..."})]})]},e.id))}),T&&C&&(0,p.jsxs)(d.Ay,{isOpen:T,onClose:()=>{I(!1),R(null),H(""),V(""),Y("receipt")},title:"Submit Payment Proof",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(d.yl,{variant:"secondary",onClick:()=>I(!1),children:"Cancel"}),(0,p.jsx)(d.yl,{variant:"primary",onClick:async()=>{if(C)if("receipt"!==J||N)if("bank"!==J||G&&Z)try{const e={payment_method:"bank_transfer",transaction_id:"bank"===J?Z:`TXN-${Date.now()}`,payment_date:(new Date).toISOString(),notes:"bank"===J?`Bank: ${G}\nTransaction ID: ${Z}\n${O}`:O,receipt_url:N?`receipt-${C.id}-${Date.now()}.pdf`:null},n=localStorage.getItem("auth_token");(await fetch(`/api/invoices/${C.id}/payment`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+n},body:JSON.stringify(e)})).ok?(I(!1),R(null),M(""),H(""),V(""),Y("receipt"),_(null),alert("Payment submitted successfully! The invoice issuer will verify your payment within 24 hours."),X()):alert("Failed to submit payment. Please try again.")}catch(e){console.error("Payment submission error:",e),alert("Failed to submit payment. Please try again.")}else alert("Please provide bank name and transaction ID");else alert("Please upload a receipt file");else alert("No invoice selected")},disabled:"receipt"===J?!N:!G||!Z,children:"Submit Payment"})]}),children:[(0,p.jsxs)("div",{style:{background:"rgba(99, 91, 255, 0.08)",padding:"16px",borderRadius:"8px",marginBottom:"20px",border:"1px solid rgba(99, 91, 255, 0.2)"},children:[(0,p.jsxs)("h4",{style:{margin:"0 0 8px 0",color:"#635BFF",fontWeight:"600"},children:["Invoice: ",C.invoiceNumber]}),(0,p.jsxs)("p",{style:{margin:"0",fontSize:"14px",color:"#0A2540",fontWeight:"500"},children:["Total Amount: ",(0,l.vv)(C.total)]})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(z,{active:"receipt"===J,onClick:()=>Y("receipt"),children:"Upload Receipt"}),(0,p.jsx)(z,{active:"bank"===J,onClick:()=>Y("bank"),children:"Bank Transfer Info"})]}),"receipt"===J?(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(d.lR,{children:"Payment Receipt *"}),(0,p.jsx)(D,{isDragging:U,onDragOver:e=>{e.preventDefault(),Q(!0)},onDragLeave:e=>{e.preventDefault(),Q(!1)},onDrop:e=>{e.preventDefault(),Q(!1);const n=e.dataTransfer.files;if(n&&n[0]){const e=n[0];e.type.startsWith("image/")||"application/pdf"===e.type?R(e):alert("Please upload an image or PDF file")}},onClick:()=>{var e;return null===(e=document.getElementById("file-input"))||void 0===e?void 0:e.click()},children:N?(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginBottom:"4px"},children:N.name}),(0,p.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(N.size/1024).toFixed(2)," KB"]}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#635BFF",marginTop:"8px",cursor:"pointer"},children:"Click or drag to replace"})]}):(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:"Drag & drop your receipt here"}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px"},children:"or click to browse files"}),(0,p.jsx)("div",{style:{fontSize:"11px",color:"#9CA3AF"},children:"Accepted: JPG, PNG, PDF (Max 5MB)"})]})}),(0,p.jsx)("input",{id:"file-input",type:"file",accept:"image/*,.pdf",onChange:e=>{var n;return R((null===(n=e.target.files)||void 0===n?void 0:n[0])||null)},style:{display:"none"}})]})}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(d.lR,{children:"Bank Name *"}),(0,p.jsx)(d.ZQ,{type:"text",value:G,onChange:e=>H(e.target.value),placeholder:"e.g., Maybank, CIMB, Public Bank..."})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(d.lR,{children:"Transaction ID / Reference Number *"}),(0,p.jsx)(d.ZQ,{type:"text",value:Z,onChange:e=>V(e.target.value),placeholder:"e.g., TXN123456789"})]})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(d.lR,{children:"Additional Notes (optional)"}),(0,p.jsx)(d.ZQ,{as:"textarea",value:O,onChange:e=>M(e.target.value),placeholder:"Add any additional payment details...",rows:3,style:{minHeight:"80px",resize:"vertical"}})]}),(0,p.jsx)("div",{style:{background:"rgba(99, 91, 255, 0.08)",padding:"12px",borderRadius:"6px",fontSize:"13px",color:"#635BFF",border:"1px solid rgba(99, 91, 255, 0.2)"},children:"Info: Your payment will be verified within 24 hours after submission."})]})]})]})})}}}]);