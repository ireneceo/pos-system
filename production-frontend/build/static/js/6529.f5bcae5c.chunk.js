"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6529],{2488:(n,e,t)=>{t.d(e,{DO:()=>l,Jt:()=>p,Qn:()=>d});t(9950);var i=t(4752),o=t(4414);const a=i.Ay.div`
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
`,d=n=>{let{children:e,className:t,style:i,...r}=n;return(0,o.jsx)(a,{className:t,style:i,...r,children:e})},l=n=>{let{placeholder:e="Search...",...t}=n;return(0,o.jsx)(r,{placeholder:e,...t})},p=n=>{let{children:e,...t}=n;return(0,o.jsx)(s,{...t,children:e})}},6529:(n,e,t)=>{t.r(e),t.d(e,{default:()=>N});var i=t(9950),o=t(4492),a=t(4752),r=t(3310),s=t(2488),d=t(1367),l=t(9610),p=t(6038),c=t(5612),x=t(1052),u=t.n(x),g=t(4414);const h=a.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,m=a.Ay.div`
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
`,v=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,b=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,f=a.Ay.div`
  display: grid;
  gap: 20px;
`,y=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`,w=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,F=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,j=a.Ay.span`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${n=>{switch(n.status){case"pending_payment":return"#FEF3C7";case"payment_submitted":return"#DBEAFE";case"paid":return"#ECFDF5";case"overdue":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${n=>{switch(n.status){case"pending_payment":return"#D97706";case"payment_submitted":return"#1E40AF";case"paid":return"#059669";case"overdue":return"#DC2626";default:return"#6B7280"}}};
`,k=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`,B=a.Ay.div``,A=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,$=a.Ay.div`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`,S=a.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`,D=a.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
    padding-top: 8px;
    border-top: 1px solid #E6EBF1;
    font-weight: 600;
  }
`,E=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`,z=a.Ay.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${n=>"danger"===n.variant?"\n    background: #DC2626;\n    color: white;\n\n    &:hover {\n      background: #B91C1C;\n    }\n  ":"primary"===n.variant?"\n    background: #635BFF;\n    color: white;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n\n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`,C=a.Ay.div`
  border: 2px dashed ${n=>n.isDragging?"#635BFF":"#E6EBF1"};
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  background: ${n=>n.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    background: rgba(99, 91, 255, 0.03);
  }
`,P=a.Ay.div`
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
`,I=a.Ay.button`
  padding: 12px 16px;
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid ${n=>n.active?"#635BFF":"#E6EBF1"};
  background: ${n=>n.active?"rgba(99, 91, 255, 0.1)":"white"};
  color: ${n=>n.active?"#635BFF":"#374151"};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    border-color: ${n=>n.active?"#635BFF":"#D1D5DB"};
    background: ${n=>n.active?"rgba(99, 91, 255, 0.1)":"#F9FAFB"};
  }
`,T=n=>{switch(n){case"pending_payment":return"Pending";case"payment_submitted":return"Verifying";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";default:return n}},N=()=>{const{user:n}=(0,d.As)(),{restaurantId:e}=(0,o.g)(),[t,a]=(0,i.useState)([]),[x,N]=(0,i.useState)("all"),[_,R]=(0,i.useState)(null),[O,L]=(0,i.useState)(!1),[M,W]=(0,i.useState)(null),[Y,U]=(0,i.useState)(""),[Q,G]=(0,i.useState)(!0),[J,H]=(0,i.useState)(!1),[Z,V]=(0,i.useState)("receipt"),[X,K]=(0,i.useState)(""),[q,nn]=(0,i.useState)(""),en=e||(null===n||void 0===n?void 0:n.restaurantId);(0,i.useEffect)(()=>{tn()},[en]);const tn=async()=>{if(console.log("\ud83d\udd0d fetchInvoices called"),console.log("\ud83d\udd0d urlRestaurantId:",e),console.log("\ud83d\udd0d user.restaurantId:",null===n||void 0===n?void 0:n.restaurantId),console.log("\ud83d\udd0d effective restaurantId:",en),!en)return console.error("\u274c No restaurantId found. Check URL parameter or user assignment."),void G(!1);try{G(!0),console.log("\u2705 Fetching invoices for restaurant:",en);const n=localStorage.getItem("auth_token"),e=await fetch(`/api/invoices/restaurant/${en}`,{headers:{Authorization:"Bearer "+n}}),t=await e.json();if(console.log("\ud83d\udce5 Invoice API response:",{status:e.status,dataLength:Array.isArray(t)?t.length:"not array"}),console.log("\ud83d\udce5 Raw invoice data:",t),e.ok){const n=t.map((n,e)=>{console.log(`\ud83d\udcdd Transforming invoice ${e+1}:`,{id:n.id,invoice_number:n.invoice_number,status:n.status,statusEmpty:""===n.status,statusNull:null===n.status,statusUndefined:void 0===n.status});const t=n.status&&""!==n.status.trim()?n.status.trim():"pending_payment";return{id:n.id.toString(),invoiceNumber:n.invoice_number,planType:n.plan_type||"Subscription Plan",billingPeriod:`${new Date(n.billing_period_start).toLocaleDateString("en-US",{month:"long",year:"numeric"})}`,amount:parseFloat(n.total_amount)-.06*parseFloat(n.total_amount),tax:.06*parseFloat(n.total_amount),total:parseFloat(n.total_amount),currency:n.currency||"MYR",status:t,issueDate:new Date(n.issued_at||n.createdAt).toISOString().split("T")[0],dueDate:new Date(n.due_date).toISOString().split("T")[0],paidDate:n.paid_at?new Date(n.paid_at).toISOString().split("T")[0]:void 0}});console.log("\u2705 Transformed invoices:",n),console.log(`\u2705 Total invoices: ${n.length}`),a(n)}else console.error("\u274c Failed to fetch invoices:",t)}catch(t){console.error("\u274c Exception while fetching invoices:",t)}finally{G(!1)}},on=t.filter(n=>"all"===x||n.status===x),an=(e,t)=>{const i=(new Date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"});return`\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8">\n  <title>Invoice ${e.invoiceNumber}</title>\n  <style>\n    @media print {\n      @page { margin: 20mm; }\n      body { margin: 0; }\n    }\n    * { box-sizing: border-box; }\n    body {\n      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;\n      line-height: 1.6;\n      color: #0A2540;\n      max-width: 800px;\n      margin: 0 auto;\n      padding: 40px 20px;\n    }\n    .invoice-header {\n      display: flex;\n      justify-content: space-between;\n      align-items: start;\n      margin-bottom: 40px;\n      padding-bottom: 20px;\n      border-bottom: 2px solid #635BFF;\n    }\n    .company-info h1 {\n      margin: 0 0 10px 0;\n      font-size: 28px;\n      color: #635BFF;\n    }\n    .company-info p {\n      margin: 4px 0;\n      font-size: 14px;\n      color: #6B7280;\n    }\n    .invoice-meta {\n      text-align: right;\n    }\n    .invoice-number {\n      font-size: 24px;\n      font-weight: 700;\n      color: #0A2540;\n      margin-bottom: 10px;\n    }\n    .invoice-meta p {\n      margin: 4px 0;\n      font-size: 14px;\n      color: #6B7280;\n    }\n    .billing-info {\n      display: flex;\n      justify-content: space-between;\n      margin-bottom: 40px;\n    }\n    .bill-to {\n      flex: 1;\n    }\n    .bill-to h3 {\n      margin: 0 0 12px 0;\n      font-size: 14px;\n      font-weight: 600;\n      color: #6B7280;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n    }\n    .bill-to p {\n      margin: 4px 0;\n      font-size: 15px;\n      color: #0A2540;\n    }\n    .bill-to strong {\n      font-size: 16px;\n      font-weight: 600;\n    }\n    .dates-info {\n      text-align: right;\n    }\n    .date-row {\n      display: flex;\n      justify-content: flex-end;\n      gap: 8px;\n      margin-bottom: 6px;\n      font-size: 13px;\n    }\n    .date-row .label {\n      color: #6B7280;\n    }\n    .date-row .value {\n      color: #0A2540;\n      font-weight: 500;\n      min-width: 140px;\n    }\n    table {\n      width: 100%;\n      border-collapse: collapse;\n      margin-bottom: 30px;\n    }\n    thead {\n      background: #F8FAFC;\n    }\n    th {\n      padding: 14px 12px;\n      text-align: left;\n      font-size: 12px;\n      font-weight: 600;\n      color: #6B7280;\n      text-transform: uppercase;\n      letter-spacing: 0.5px;\n      border-bottom: 2px solid #E6EBF1;\n    }\n    th:last-child, td:last-child {\n      text-align: right;\n    }\n    td {\n      padding: 16px 12px;\n      font-size: 14px;\n      color: #374151;\n      border-bottom: 1px solid #F3F4F6;\n    }\n    tbody tr:hover {\n      background: #F9FAFB;\n    }\n    .totals {\n      margin-left: auto;\n      width: 300px;\n      margin-top: 20px;\n    }\n    .totals-row {\n      display: flex;\n      justify-content: space-between;\n      padding: 10px 0;\n      font-size: 14px;\n    }\n    .totals-row.subtotal {\n      color: #6B7280;\n    }\n    .totals-row.tax {\n      color: #6B7280;\n      padding-bottom: 12px;\n      border-bottom: 1px solid #E6EBF1;\n    }\n    .totals-row.total {\n      font-size: 18px;\n      font-weight: 700;\n      color: #0A2540;\n      padding-top: 12px;\n    }\n    .footer {\n      margin-top: 60px;\n      padding-top: 20px;\n      border-top: 1px solid #E6EBF1;\n      text-align: center;\n      font-size: 12px;\n      color: #9CA3AF;\n    }\n    .status-badge {\n      display: inline-block;\n      padding: 4px 12px;\n      border-radius: 6px;\n      font-size: 12px;\n      font-weight: 600;\n      text-transform: uppercase;\n    }\n    .status-pending {\n      background: #FEF3C7;\n      color: #92400E;\n    }\n    .status-paid {\n      background: #D1FAE5;\n      color: #065F46;\n    }\n    .status-overdue {\n      background: #FEE2E2;\n      color: #991B1B;\n    }\n    @media print {\n      .no-print { display: none; }\n    }\n  </style>\n</head>\n<body>\n  <div class="invoice-header">\n    <div class="company-info">\n      ${null!==t&&void 0!==t&&t.companyLogo?`<img src="${t.companyLogo}" alt="Company Logo" style="max-height: 60px; margin-bottom: 8px;">`:""}\n      <h1>${(null===t||void 0===t?void 0:t.companyName)||"Company Name"}</h1>\n      <p>${(null===t||void 0===t?void 0:t.address)||""}</p>\n      ${null!==t&&void 0!==t&&t.city||null!==t&&void 0!==t&&t.state||null!==t&&void 0!==t&&t.postalCode?`<p>${[null===t||void 0===t?void 0:t.city,null===t||void 0===t?void 0:t.state,null===t||void 0===t?void 0:t.postalCode].filter(Boolean).join(", ")}</p>`:""}\n      ${null!==t&&void 0!==t&&t.country?`<p>${t.country}</p>`:""}\n      ${null!==t&&void 0!==t&&t.phone?`<p>Phone: ${t.phone}</p>`:""}\n      ${null!==t&&void 0!==t&&t.email?`<p>Email: ${t.email}</p>`:""}\n      ${null!==t&&void 0!==t&&t.taxNumber?`<p>Tax ID: ${t.taxNumber}</p>`:""}\n      ${null!==t&&void 0!==t&&t.registrationNumber?`<p>Reg No: ${t.registrationNumber}</p>`:""}\n    </div>\n    <div class="invoice-meta">\n      <div class="invoice-number">${e.invoiceNumber}</div>\n      <p><span class="status-badge status-${"paid"===e.status?"paid":"overdue"===e.status?"overdue":"pending"}">\n        ${"pending_payment"===e.status?"Pending":"paid"===e.status?"Paid":"overdue"===e.status?"Overdue":e.status}\n      </span></p>\n    </div>\n  </div>\n\n  <div class="billing-info">\n    <div class="bill-to">\n      <h3>Bill To</h3>\n      <p><strong>${(null===n||void 0===n?void 0:n.restaurantName)||"Restaurant"}</strong></p>\n      <p>Plan: ${e.planType}</p>\n    </div>\n    <div class="dates-info">\n      <div class="date-row">\n        <span class="label">Billing Period:</span>\n        <span class="value">${e.billingPeriod}</span>\n      </div>\n      <div class="date-row">\n        <span class="label">Issue Date:</span>\n        <span class="value">${e.issueDate}</span>\n      </div>\n      <div class="date-row">\n        <span class="label">Due Date:</span>\n        <span class="value">${e.dueDate}</span>\n      </div>\n      ${e.paidDate?`\n      <div class="date-row">\n        <span class="label">Paid Date:</span>\n        <span class="value">${e.paidDate}</span>\n      </div>\n      `:""}\n    </div>\n  </div>\n\n  <table>\n    <thead>\n      <tr>\n        <th>Description</th>\n        <th style="width: 100px;">Quantity</th>\n        <th style="width: 120px;">Unit Price</th>\n        <th style="width: 120px;">Amount</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>\n          <strong>${e.planType} - Monthly Subscription</strong><br>\n          <span style="font-size: 12px; color: #6B7280;">Billing Period: ${e.billingPeriod}</span>\n        </td>\n        <td>1</td>\n        <td>${e.currency||"MYR"} ${e.amount.toFixed(2)}</td>\n        <td>${e.currency||"MYR"} ${e.amount.toFixed(2)}</td>\n      </tr>\n    </tbody>\n  </table>\n\n  <div class="totals">\n    <div class="totals-row subtotal">\n      <span>Subtotal:</span>\n      <span>${e.currency||"MYR"} ${e.amount.toFixed(2)}</span>\n    </div>\n    <div class="totals-row tax">\n      <span>Tax (6%):</span>\n      <span>${e.currency||"MYR"} ${e.tax.toFixed(2)}</span>\n    </div>\n    <div class="totals-row total">\n      <span>Total Amount:</span>\n      <span>${e.currency||"MYR"} ${e.total.toFixed(2)}</span>\n    </div>\n  </div>\n\n  ${null!==t&&void 0!==t&&t.bankName?`\n  <div style="margin-top: 30px; padding: 15px; background: #F8FAFC; border-radius: 8px;">\n    <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #0A2540;">Payment Details</h3>\n    <p style="margin: 4px 0; font-size: 13px;"><strong>Bank:</strong> ${t.bankName}</p>\n    ${null!==t&&void 0!==t&&t.bankAccountName?`<p style="margin: 4px 0; font-size: 13px;"><strong>Account Name:</strong> ${t.bankAccountName}</p>`:""}\n    ${null!==t&&void 0!==t&&t.bankAccount?`<p style="margin: 4px 0; font-size: 13px;"><strong>Account Number:</strong> ${t.bankAccount}</p>`:""}\n  </div>\n  `:""}\n\n  <div class="footer">\n    <p>Thank you for your business!</p>\n    <p>This is a computer-generated invoice. Generated on ${i}</p>\n  </div>\n\n  <div class="no-print" style="margin-top: 40px; text-align: center;">\n    <button onclick="window.print()" style="padding: 12px 24px; background: #635BFF; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">\n      Print Invoice\n    </button>\n    <button onclick="window.close()" style="padding: 12px 24px; background: white; color: #6B7280; border: 1px solid #E6EBF1; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; margin-left: 12px;">\n      Close\n    </button>\n  </div>\n</body>\n</html>\n    `},rn=t.filter(n=>"pending_payment"===n.status||"payment_submitted"===n.status).length,sn=t.filter(n=>"paid"===n.status).length,dn=t.filter(n=>"overdue"===n.status).length,ln=t.filter(n=>"pending_payment"===n.status||"overdue"===n.status).reduce((n,e)=>n+e.total,0);return(0,g.jsx)(r.A,{children:(0,g.jsxs)(h,{children:[(0,g.jsx)(m,{children:(0,g.jsx)(b,{children:"Invoices"})}),(0,g.jsxs)(v,{children:[(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"20px",marginBottom:"32px"},children:[(0,g.jsxs)("div",{style:{background:"white",padding:"20px",borderRadius:"12px",border:"1px solid #E6EBF1",borderLeft:"4px solid #D97706"},children:[(0,g.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#0A2540"},children:rn}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Pending"})]}),(0,g.jsxs)("div",{style:{background:"white",padding:"20px",borderRadius:"12px",border:"1px solid #E6EBF1",borderLeft:"4px solid #635BFF"},children:[(0,g.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#0A2540"},children:sn}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Paid"})]}),(0,g.jsxs)("div",{style:{background:"white",padding:"20px",borderRadius:"12px",border:"1px solid #E6EBF1",borderLeft:"4px solid #DC2626"},children:[(0,g.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#0A2540"},children:dn}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Overdue"})]}),(0,g.jsxs)("div",{style:{background:"white",padding:"20px",borderRadius:"12px",border:"1px solid #E6EBF1",borderLeft:"4px solid #8B5CF6"},children:[(0,g.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#0A2540"},children:(0,p.vv)(ln)}),(0,g.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.5px"},children:"Outstanding"})]})]}),(0,g.jsx)(s.Qn,{children:(0,g.jsxs)(s.Jt,{value:x,onChange:n=>N(n.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Invoices"}),(0,g.jsx)("option",{value:"pending_payment",children:"Pending"}),(0,g.jsx)("option",{value:"payment_submitted",children:"Verifying"}),(0,g.jsx)("option",{value:"paid",children:"Paid"}),(0,g.jsx)("option",{value:"overdue",children:"Overdue"})]})}),Q&&(0,g.jsx)("div",{style:{textAlign:"center",padding:"60px",color:"#6B7280"},children:"Loading invoices..."}),!Q&&!(null!==n&&void 0!==n&&n.restaurantId)&&(0,g.jsxs)("div",{style:{textAlign:"center",padding:"60px"},children:[(0,g.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"10px"},children:"No Restaurant Assigned"}),(0,g.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"Your account is not assigned to a restaurant. Please contact your system administrator."})]}),!Q&&(null===n||void 0===n?void 0:n.restaurantId)&&0===on.length&&(0,g.jsxs)("div",{style:{textAlign:"center",padding:"60px"},children:[(0,g.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"10px"},children:"No Invoices Found"}),(0,g.jsx)("div",{style:{fontSize:"14px",color:"#6B7280"},children:"Your restaurant doesn't have any invoices yet."})]}),!Q&&on.length>0&&(0,g.jsx)(f,{children:on.map(n=>(0,g.jsxs)(y,{children:[(0,g.jsxs)(w,{children:[(0,g.jsx)(F,{children:n.invoiceNumber}),(0,g.jsx)(j,{status:n.status,children:T(n.status)})]}),(0,g.jsxs)(k,{children:[(0,g.jsxs)(B,{children:[(0,g.jsx)(A,{children:"Plan"}),(0,g.jsx)($,{children:n.planType})]}),(0,g.jsxs)(B,{children:[(0,g.jsx)(A,{children:"Billing Period"}),(0,g.jsx)($,{children:n.billingPeriod})]}),(0,g.jsxs)(B,{children:[(0,g.jsx)(A,{children:"Issue Date"}),(0,g.jsx)($,{children:n.issueDate})]}),(0,g.jsxs)(B,{children:[(0,g.jsx)(A,{children:"Due Date"}),(0,g.jsx)($,{children:n.dueDate})]}),n.paidDate&&(0,g.jsxs)(B,{children:[(0,g.jsx)(A,{children:"Paid Date"}),(0,g.jsx)($,{children:n.paidDate})]})]}),(0,g.jsxs)(S,{children:[(0,g.jsxs)(D,{children:[(0,g.jsx)("span",{children:"Subtotal:"}),(0,g.jsx)("span",{children:(0,p.vv)(n.amount)})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)("span",{children:"Tax (6%):"}),(0,g.jsx)("span",{children:(0,p.vv)(n.tax)})]}),(0,g.jsxs)(D,{children:[(0,g.jsx)("span",{children:"Total:"}),(0,g.jsx)("span",{children:(0,p.vv)(n.total)})]})]}),(0,g.jsxs)(E,{children:[(0,g.jsx)(z,{variant:"secondary",onClick:()=>(async n=>{try{var e;const t=localStorage.getItem("auth_token");if(!(await fetch(`/api/invoices/${n.id}`,{headers:{Authorization:"Bearer "+t}})).ok)return void alert("Failed to load invoice details");const i=n.currency||"MYR",o=await fetch(`/api/invoices/invoice-settings?currency=${i}`,{headers:{Authorization:"Bearer "+t}});let a=null;if(o.ok){const n=await o.json();a=n.data||n}const r=an(n,a),s=document.createElement("iframe");s.style.position="fixed",s.style.left="-10000px",s.style.top="-10000px",s.style.width="800px",s.style.height="1200px",s.style.visibility="hidden",s.style.pointerEvents="none",document.body.appendChild(s);const d=s.contentDocument||(null===(e=s.contentWindow)||void 0===e?void 0:e.document);if(!d)throw document.body.removeChild(s),new Error("Could not access iframe document");d.open(),d.write(r),d.close(),await new Promise(n=>setTimeout(n,150));const l=await u()(d.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(s);const p=l.toDataURL("image/png"),x=new c.Ay({orientation:"portrait",unit:"mm",format:"a4"}),g=210,h=l.height*g/l.width;x.addImage(p,"PNG",0,0,g,h),x.save(`Invoice-${n.invoiceNumber}.pdf`)}catch(t){console.error("Error downloading invoice:",t),alert("Failed to download invoice. Please try again.")}})(n),children:"Invoice"}),("pending_payment"===n.status||"overdue"===n.status)&&(0,g.jsx)(z,{variant:"overdue"===n.status?"danger":"primary",onClick:()=>(n=>{R(n),L(!0)})(n),children:"overdue"===n.status?"Pay Now":"Mark as Paid"}),"payment_submitted"===n.status&&(0,g.jsx)("div",{style:{fontSize:"13px",color:"#635BFF",fontStyle:"italic",fontWeight:"500"},children:"Payment verification in progress..."})]})]},n.id))}),O&&_&&(0,g.jsxs)(l.Ay,{isOpen:O,onClose:()=>{L(!1),W(null),K(""),nn(""),V("receipt")},title:"Submit Payment Proof",size:"medium",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(l.yl,{variant:"secondary",onClick:()=>L(!1),children:"Cancel"}),(0,g.jsx)(l.yl,{variant:"primary",onClick:async()=>{if(_)if("receipt"!==Z||M)if("bank"!==Z||X&&q)try{const n={payment_method:"bank_transfer",transaction_id:"bank"===Z?q:`TXN-${Date.now()}`,payment_date:(new Date).toISOString(),notes:"bank"===Z?`Bank: ${X}\nTransaction ID: ${q}\n${Y}`:Y,receipt_url:M?`receipt-${_.id}-${Date.now()}.pdf`:null},e=localStorage.getItem("auth_token");(await fetch(`/api/invoices/${_.id}/payment`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+e},body:JSON.stringify(n)})).ok?(L(!1),W(null),U(""),K(""),nn(""),V("receipt"),R(null),alert("Payment submitted successfully! The invoice issuer will verify your payment within 24 hours."),tn()):alert("Failed to submit payment. Please try again.")}catch(n){console.error("Payment submission error:",n),alert("Failed to submit payment. Please try again.")}else alert("Please provide bank name and transaction ID");else alert("Please upload a receipt file");else alert("No invoice selected")},disabled:"receipt"===Z?!M:!X||!q,children:"Submit Payment"})]}),children:[(0,g.jsxs)("div",{style:{background:"rgba(99, 91, 255, 0.08)",padding:"16px",borderRadius:"8px",marginBottom:"20px",border:"1px solid rgba(99, 91, 255, 0.2)"},children:[(0,g.jsxs)("h4",{style:{margin:"0 0 8px 0",color:"#635BFF",fontWeight:"600"},children:["Invoice: ",_.invoiceNumber]}),(0,g.jsxs)("p",{style:{margin:"0",fontSize:"14px",color:"#0A2540",fontWeight:"500"},children:["Total Amount: ",(0,p.vv)(_.total)]})]}),(0,g.jsxs)(P,{children:[(0,g.jsx)(I,{active:"receipt"===Z,onClick:()=>V("receipt"),children:"Upload Receipt"}),(0,g.jsx)(I,{active:"bank"===Z,onClick:()=>V("bank"),children:"Bank Transfer Info"})]}),"receipt"===Z?(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(l.gE,{children:[(0,g.jsx)(l.lR,{children:"Payment Receipt *"}),(0,g.jsx)(C,{isDragging:J,onDragOver:n=>{n.preventDefault(),H(!0)},onDragLeave:n=>{n.preventDefault(),H(!1)},onDrop:n=>{n.preventDefault(),H(!1);const e=n.dataTransfer.files;if(e&&e[0]){const n=e[0];n.type.startsWith("image/")||"application/pdf"===n.type?W(n):alert("Please upload an image or PDF file")}},onClick:()=>{var n;return null===(n=document.getElementById("file-input"))||void 0===n?void 0:n.click()},children:M?(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#635BFF",marginBottom:"4px"},children:M.name}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:[(M.size/1024).toFixed(2)," KB"]}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#635BFF",marginTop:"8px",cursor:"pointer"},children:"Click or drag to replace"})]}):(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#0A2540",marginBottom:"4px"},children:"Drag & drop your receipt here"}),(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginBottom:"8px"},children:"or click to browse files"}),(0,g.jsx)("div",{style:{fontSize:"11px",color:"#9CA3AF"},children:"Accepted: JPG, PNG, PDF (Max 5MB)"})]})}),(0,g.jsx)("input",{id:"file-input",type:"file",accept:"image/*,.pdf",onChange:n=>{var e;return W((null===(e=n.target.files)||void 0===e?void 0:e[0])||null)},style:{display:"none"}})]})}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(l.gE,{children:[(0,g.jsx)(l.lR,{children:"Bank Name *"}),(0,g.jsx)(l.ZQ,{type:"text",value:X,onChange:n=>K(n.target.value),placeholder:"e.g., Maybank, CIMB, Public Bank..."})]}),(0,g.jsxs)(l.gE,{children:[(0,g.jsx)(l.lR,{children:"Transaction ID / Reference Number *"}),(0,g.jsx)(l.ZQ,{type:"text",value:q,onChange:n=>nn(n.target.value),placeholder:"e.g., TXN123456789"})]})]}),(0,g.jsxs)(l.gE,{children:[(0,g.jsx)(l.lR,{children:"Additional Notes (optional)"}),(0,g.jsx)(l.ZQ,{as:"textarea",value:Y,onChange:n=>U(n.target.value),placeholder:"Add any additional payment details...",rows:3,style:{minHeight:"80px",resize:"vertical"}})]}),(0,g.jsx)("div",{style:{background:"rgba(99, 91, 255, 0.08)",padding:"12px",borderRadius:"6px",fontSize:"13px",color:"#635BFF",border:"1px solid rgba(99, 91, 255, 0.2)"},children:"Info: Your payment will be verified within 24 hours after submission."})]})]})]})})}}}]);