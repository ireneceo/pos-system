"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7283],{2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var i=t(4752),a=t(4414);const r=i.Ay.div`
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
`,s=i.Ay.input`
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
`,o=i.Ay.select`
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
`,l=e=>{let{children:n,className:t,style:i,...s}=e;return(0,a.jsx)(r,{className:t,style:i,...s,children:n})},d=e=>{let{placeholder:n="Search...",...t}=e;return(0,a.jsx)(s,{placeholder:n,...t})},c=e=>{let{children:n,...t}=e;return(0,a.jsx)(o,{...t,children:n})}},7283:(e,n,t)=>{t.r(n),t.d(n,{default:()=>U});var i=t(9950),a=t(4752),r=t(3310),s=t(6038),o=t(9018),l=t(4728),d=t(7492),c=t(2488),p=t(4414);const x=(0,a.Ay)(l.SC)``,h=a.Ay.div``,u=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,m=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,g=a.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 10px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
  vertical-align: middle;
`,v=(0,a.Ay)(l.Wh)``,y=a.Ay.div`
  font-weight: ${e=>e.highlight?"700":"500"};
  color: #374151;
`,j=a.Ay.button`
  padding: 6px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    padding: 6px 12px;\n    min-width: auto;\n\n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    padding: 6px 12px;\n    min-width: auto;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"email"===e.variant?"\n    background: #F3F4F6;\n    color: #6B7280;\n    border-color: #E5E7EB;\n\n    &:hover {\n      background: #E5E7EB;\n      color: #374151;\n    }\n  ":"cancel"===e.variant?"\n    background: #F6F9FC;\n    color: #6B7C93;\n    border-color: #E6EBF1;\n\n    &:hover {\n      background: #E6EBF1;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    padding: 6px 12px;\n    min-width: auto;\n\n    &:hover {\n      border-color: #635BFF;\n      color: #635BFF;\n      background: #F4F3FF;\n    }\n  "}
`,f=a.Ay.button`
  padding: 6px;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`,b=a.Ay.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,w=a.Ay.div`
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
`,C=a.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,F=a.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`,k=a.Ay.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,S=a.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #F3F4F6;
    color: #374151;
  }
`,N=a.Ay.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
`,D=a.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  flex-shrink: 0;
`,A=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`,E=a.Ay.div`
  margin-bottom: 20px;
`,B=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,I=a.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,T=a.Ay.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,P=a.Ay.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,$=a.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`,L=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,z=(0,a.Ay)(d.A0)`
  @media (max-width: 1400px) {
    & > span:nth-child(3),
    & > span:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > span:nth-child(5),
    & > span:nth-child(6),
    & > span:nth-child(7) {
      display: none;
    }
  }
`,M=(0,a.Ay)(d.Hj)`
  @media (max-width: 1400px) {
    & > div:nth-child(3),
    & > div:nth-child(4) {
      display: none;
    }
  }

  @media (max-width: 1024px) {
    & > div:nth-child(5),
    & > div:nth-child(6),
    & > div:nth-child(7) {
      display: none;
    }
  }
`,U=()=>{const{operationSettings:e}=(0,o.Pj)(),[n,t]=(0,i.useState)([]),[a,l]=(0,i.useState)(""),[U,O]=(0,i.useState)("all"),[R,_]=(0,i.useState)("all"),[W,H]=(0,i.useState)("all"),[J,Y]=(0,i.useState)(!1),[q,G]=(0,i.useState)(!1),[K,V]=(0,i.useState)(!1),[Q,X]=(0,i.useState)(!1),[Z,ee]=(0,i.useState)(!1),[ne,te]=(0,i.useState)(!1),[ie,ae]=(0,i.useState)(!1),[re,se]=(0,i.useState)(!1),[oe,le]=(0,i.useState)(!1),[de,ce]=(0,i.useState)(""),[pe,xe]=(0,i.useState)(null),[he,ue]=(0,i.useState)(null),[me,ge]=(0,i.useState)(""),[ve,ye]=(0,i.useState)({managers:[],restaurants:[]}),[je,fe]=(0,i.useState)(!1),[be,we]=(0,i.useState)(null),[Ce,Fe]=(0,i.useState)([]),[ke,Se]=(0,i.useState)([]),[,Ne]=(0,i.useState)([]),[De,Ae]=(0,i.useState)({managers:[],restaurants:[]}),[Ee,Be]=(0,i.useState)(""),[Ie,Te]=(0,i.useState)(!1),[Pe,$e]=(0,i.useState)(null),[Le,ze]=(0,i.useState)(null),[Me,Ue]=(0,i.useState)({}),[Oe,Re]=(0,i.useState)({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:""}),_e=async()=>{try{const e=await fetch("/api/invoices");if(e.ok){const n=await e.json();console.log("Fetched invoices:",n),t(n)}else console.error("Failed to fetch invoices"),t([])}catch(e){console.error("Error fetching invoices:",e),t([])}};(0,i.useEffect)(()=>{_e(),He(),Je(),Ye(),Ke(),We()},[]);const We=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const n=await e.json();n.success&&n.currencies&&Ue(n.currencies)}}catch(e){console.error("Error fetching currency config:",e)}},He=async()=>{try{const e=await fetch("/api/users?role=Manager");if(e.ok){const n=(await e.json()).map(e=>({id:e.id.toString(),fullName:e.full_name||e.username,email:e.email,role:e.role,companyName:e.company_name||"Unknown Company"}));Fe(n)}else console.error("Failed to fetch managers"),Fe([])}catch(e){console.error("Error fetching managers:",e),Fe([])}},Je=async()=>{try{const e=await fetch("/api/restaurants");if(e.ok){const n=await e.json();console.log("Fetched restaurants:",n);const t=n.map(e=>{var n,t;return{id:e.id.toString(),name:e.name,manager_id:(null===(n=e.manager_id)||void 0===n?void 0:n.toString())||(null===(t=e.managerId)||void 0===t?void 0:t.toString())||"",status:e.status,address:e.address||""}});Se(t),console.log("Transformed restaurants:",t)}else console.error("Failed to fetch restaurants"),Se([])}catch(e){console.error("Error fetching restaurants:",e),Se([])}},Ye=async()=>{try{const e=await fetch("/api/subscriptions");if(e.ok){const n=await e.json();Ne(n)}else console.warn("Subscription API not available"),Ne([])}catch(e){console.error("Error fetching subscriptions:",e),Ne([])}},qe=(e,n)=>{if(we({type:e,data:n}),ge("manager"===e?n.fullName:n.name),fe(!1),"manager"===e){const e=n;ue({...he,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=Ce.find(n=>n.id===e.manager_id);ue({...he,managerId:(null===t||void 0===t?void 0:t.id)||"",managerName:(null===t||void 0===t?void 0:t.fullName)||"",companyName:(null===t||void 0===t?void 0:t.companyName)||"",restaurantId:e.id,restaurantName:e.name})}},Ge=(e,n)=>{if($e({type:e,data:n}),Te(!1),Be("manager"===e?n.fullName:n.name),"manager"===e){const e=n;Re({...Oe,managerId:e.id,managerName:e.fullName,companyName:e.companyName||"",restaurantId:"",restaurantName:""})}else{const e=n,t=Ce.find(n=>n.id===e.manager_id);Re({...Oe,restaurantId:e.id,restaurantName:e.name,managerId:e.manager_id,managerName:t?t.fullName:"",companyName:e.name})}},Ke=async()=>{try{const n=await fetch("/api/admin/settings");if(n.ok){const e=await n.json();ze(e)}else{const n=localStorage.getItem("adminSettings");let t="";if(n)try{const e=JSON.parse(n);t=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}ze({companyName:"Purple Here POS",address:"Level 12, Menara UOA Bangsar",city:"Kuala Lumpur",state:"Federal Territory",postalCode:"59200",country:"Malaysia",phone:"+60 3-2266 8888",email:"admin@orderhere.my",website:"www.orderhere.my",taxNumber:"001234567890",registrationNumber:"ROC 202301234567",companyLogo:t})}}catch(n){console.error("Error fetching company settings:",n);const t=localStorage.getItem("adminSettings");let i="";if(t)try{const e=JSON.parse(t);i=e.companyLogo||e.logo||""}catch(e){console.error("Error parsing adminSettings:",e)}ze({companyName:"OrderHere POS System",address:"Level 12, Menara UOA Bangsar",city:"Kuala Lumpur",state:"Federal Territory",postalCode:"59200",country:"Malaysia",phone:"+60 3-2266 8888",email:"admin@orderhere.my",website:"www.orderhere.my",taxNumber:"001234567890",registrationNumber:"ROC 202301234567",companyLogo:i})}},Ve=e=>{if(!Le)return ce("Company settings not loaded. Please try again."),void le(!0);const n=`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: Arial, sans-serif; font-size: 12px; line-height: 1.4; color: #333; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 20px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; border-bottom: 2px solid #635BFF; padding-bottom: 20px; }\n        .logo-section { flex: 1; }\n        .company-name { font-size: 24px; font-weight: bold; color: #0A2540; margin-bottom: 5px; }\n        .company-details { color: #6B7280; line-height: 1.6; }\n        .invoice-title { flex: 1; text-align: right; }\n        .invoice-number { font-size: 28px; font-weight: bold; color: #635BFF; margin-bottom: 5px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 4px; font-size: 10px; font-weight: bold; text-transform: uppercase; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-sent { background: #DBEAFE; color: #1E40AF; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 30px; }\n        .billing-section { flex: 1; }\n        .billing-title { font-weight: bold; color: #0A2540; margin-bottom: 10px; font-size: 14px; }\n        .billing-details { color: #6B7280; line-height: 1.6; }\n        .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }\n        .invoice-table th { background: #F8FAFC; padding: 12px; text-align: left; font-weight: bold; color: #0A2540; border-bottom: 1px solid #E6EBF1; }\n        .invoice-table td { padding: 12px; border-bottom: 1px solid #F3F4F6; }\n        .item-description { font-weight: 500; color: #0A2540; }\n        .text-right { text-align: right; }\n        .totals-section { margin-left: auto; width: 300px; }\n        .total-row { display: flex; justify-content: space-between; padding: 8px 0; }\n        .total-row.subtotal, .total-row.tax { color: #6B7280; }\n        .total-row.final { font-weight: bold; font-size: 16px; color: #0A2540; border-top: 2px solid #635BFF; padding-top: 12px; margin-top: 8px; }\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E6EBF1; text-align: center; color: #6B7280; font-size: 11px; }\n        .payment-terms { margin-top: 30px; padding: 15px; background: #F8FAFC; border-radius: 6px; }\n        .payment-terms h4 { color: #0A2540; margin-bottom: 8px; }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${Le.companyLogo?`<img src="${Le.companyLogo}" alt="Company Logo" style="max-height: 60px; margin-bottom: 10px;">`:""}\n                <div class="company-name">${Le.companyName}</div>\n                <div class="company-details">\n                    ${Le.address}<br>\n                    ${Le.city}, ${Le.state} ${Le.postalCode}<br>\n                    ${Le.country}<br>\n                    Phone: ${Le.phone}<br>\n                    Email: ${Le.email}\n                    ${Le.website?`<br>Web: ${Le.website}`:""}\n                    ${Le.taxNumber?`<br>Tax No: ${Le.taxNumber}`:""}\n                    ${Le.registrationNumber?`<br>Reg No: ${Le.registrationNumber}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-number">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status status-${e.status}">${e.status}</span>\n            </div>\n        </div>\n        \n        <div class="billing-info">\n            <div class="billing-section">\n                <div class="billing-title">Bill To:</div>\n                <div class="billing-details">\n                    <strong>${e.customerName||e.managerName||"Customer"}</strong><br>\n                    ${e.companyName&&e.companyName!==e.customerName?`${e.companyName}<br>`:""}\n                    ${e.customerAddress?e.customerAddress.split("\n").join("<br>"):""}\n                </div>\n            </div>\n            <div class="billing-section" style="text-align: right;">\n                <div class="billing-title">Invoice Details:</div>\n                <div class="billing-details">\n                    <strong>Issue Date:</strong> ${sn(e.issueDate)}<br>\n                    <strong>Due Date:</strong> ${sn(e.dueDate)}<br>\n                    ${e.paidDate?`<strong>Paid Date:</strong> ${sn(e.paidDate)}<br>`:""}\n                    <strong>Billing Period:</strong> ${e.billingPeriod}<br>\n                    <strong>Plan Type:</strong> ${e.planType}\n                </div>\n            </div>\n        </div>\n        \n        <table class="invoice-table">\n            <thead>\n                <tr>\n                    <th>Description</th>\n                    <th class="text-right">Quantity</th>\n                    <th class="text-right">Unit Price</th>\n                    <th class="text-right">Total</th>\n                </tr>\n            </thead>\n            <tbody>\n                ${e.items.map(n=>`\n                    <tr>\n                        <td class="item-description">${n.description}</td>\n                        <td class="text-right">${n.quantity}</td>\n                        <td class="text-right">${(0,s.vv)(n.unitPrice,e.currency||"USD")}</td>\n                        <td class="text-right">${(0,s.vv)(n.total,e.currency||"USD")}</td>\n                    </tr>\n                `).join("")}\n            </tbody>\n        </table>\n\n        <div class="totals-section">\n            <div class="total-row subtotal">\n                <span>Subtotal:</span>\n                <span>${(0,s.vv)(e.amount,e.currency||"USD")}</span>\n            </div>\n            <div class="total-row tax">\n                <span>Tax (6%):</span>\n                <span>${(0,s.vv)(e.tax,e.currency||"USD")}</span>\n            </div>\n            <div class="total-row final">\n                <span>Total Amount:</span>\n                <span>${(0,s.vv)(e.total,e.currency||"USD")}</span>\n            </div>\n        </div>\n        \n        <div class="payment-terms">\n            <h4>Payment Terms & Conditions:</h4>\n            <p>\u2022 Payment is due within 30 days of invoice date<br>\n            \u2022 Late payments may incur additional charges<br>\n            \u2022 Please reference invoice number ${e.invoiceNumber} when making payment<br>\n            \u2022 For any queries, please contact us at ${Le.email}</p>\n        </div>\n        \n        <div class="footer">\n            <p>Thank you for your business!</p>\n            <p>This is a computer-generated invoice and does not require a signature.</p>\n        </div>\n    </div>\n</body>\n</html>`,t=new Blob([n],{type:"text/html"}),i=URL.createObjectURL(t),a=document.createElement("a");a.href=i,a.download=`Invoice-${e.invoiceNumber}.html`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)},Qe=()=>{Re({managerId:"",managerName:"",companyName:"",restaurantId:"",restaurantName:"",amount:"",tax:"0",total:"0",description:"",dueDate:"",planType:"professional",billingCycle:"monthly",invoiceCategory:"service",customDescription:"",serviceDescription:""}),$e(null),Be(""),Te(!1)},Xe=n.map(e=>{const n=new Date(e.issueDate);return`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`}),Ze=Array.from(new Set(Xe)).sort().reverse(),en=n.filter(e=>{const n=e.companyName.toLowerCase().includes(a.toLowerCase())||e.invoiceNumber.toLowerCase().includes(a.toLowerCase())||e.managerName.toLowerCase().includes(a.toLowerCase()),t="all"===U||e.status===U||"pending_payment"===U&&(""===e.status||!e.status),i="all"===R||e.type===R;let r=!0;if("all"!==W){const n=new Date(e.issueDate);r=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}`===W}return n&&t&&i&&r}),nn=n.length,tn=n.filter(e=>"paid"===e.status).length,an=n.filter(e=>"overdue"===e.status).length,rn=n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),sn=e=>new Date(e).toLocaleDateString("en-MY"),on=e=>{switch(e){case"draft":return"Draft";case"pending_payment":return"Pending";case"payment_submitted":return"Payment Submitted";case"paid":return"Paid";case"overdue":return"Overdue";case"cancelled":return"Cancelled";case"":case null:case void 0:return"Pending";default:return e}},ln=e=>{switch(e){case"restaurant":default:return"Restaurant Admin";case"foodcourt_manager":return"Foodcourt General";case"brand_manager":return"Brand General"}},dn=e=>{var n,t;if(xe(e),ue({managerId:e.managerId,managerName:e.managerName,companyName:e.companyName||"",restaurantId:e.restaurantId||"",restaurantName:e.restaurantName||"",amount:e.amount.toString(),tax:e.tax.toString(),total:e.total.toString(),dueDate:e.dueDate,status:e.status,planType:e.planType,billingCycle:"monthly",description:(null===(n=e.items)||void 0===n||null===(t=n[0])||void 0===t?void 0:t.description)||"",payerType:e.payerType||"restaurant",payerId:e.payerId||"",items:e.items}),e.restaurantId){const n=ke.find(n=>n.id===e.restaurantId);n&&(we({type:"restaurant",data:n}),ge(n.name))}else if(e.managerId){const n=Ce.find(n=>n.id===e.managerId);n&&(we({type:"manager",data:n}),ge(n.fullName))}V(!0)},cn=e=>{xe(e),te(!0)},pn=e=>{xe(e),se(!0)};return(0,p.jsx)(r.A,{children:(0,p.jsxs)(d.mc,{children:[(0,p.jsxs)(d.Y9,{children:[(0,p.jsx)(d.hE,{children:"Invoices"}),(0,p.jsxs)(d.ex,{children:[(0,p.jsx)(x,{variant:"secondary",onClick:()=>{const e={exportDate:(new Date).toISOString(),totalInvoices:n.length,summary:{totalAmount:n.reduce((e,n)=>e+n.total,0),paidInvoices:n.filter(e=>"paid"===e.status).length,overdueInvoices:n.filter(e=>"overdue"===e.status).length,draftInvoices:n.filter(e=>"draft"===e.status).length,paidAmount:n.filter(e=>"paid"===e.status).reduce((e,n)=>e+n.total,0),outstandingAmount:n.filter(e=>"paid"!==e.status&&"cancelled"!==e.status).reduce((e,n)=>e+n.total,0)},statusBreakdown:{draft:n.filter(e=>"draft"===e.status).length,pending_payment:n.filter(e=>"pending_payment"===e.status).length,paid:n.filter(e=>"paid"===e.status).length,overdue:n.filter(e=>"overdue"===e.status).length,cancelled:n.filter(e=>"cancelled"===e.status).length},invoices:n.map(e=>({invoiceNumber:e.invoiceNumber,managerName:e.managerName,companyName:e.companyName,issueDate:e.issueDate,dueDate:e.dueDate,paidDate:e.paidDate||"N/A",status:e.status,amount:e.amount,tax:e.tax,total:e.total,billingPeriod:e.billingPeriod,planType:e.planType}))},t=JSON.stringify(e,null,2),i=new Blob([t],{type:"application/json"}),a=URL.createObjectURL(i),r=document.createElement("a");r.href=a,r.download=`invoices-export-${(new Date).toISOString().split("T")[0]}.json`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(a)},children:"Export"}),(0,p.jsx)(x,{variant:"secondary",onClick:async()=>{try{const e=await fetch("/api/invoices/generate-for-subscriptions",{method:"POST",headers:{"Content-Type":"application/json"}});if(e.ok){const n=await e.json();await _e(),ce(`Successfully generated ${n.generated} subscription invoices!`),le(!0)}else{const n=await e.json();ce(`Failed to generate subscription invoices: ${n.error||"Unknown error"}`),le(!0)}}catch(e){console.error("Error generating subscription invoices:",e),ce("Error generating subscription invoices. Please try again."),le(!0)}},children:"Generate Subscription Invoices"}),(0,p.jsx)(x,{variant:"primary",onClick:()=>{Qe(),Y(!0)},children:"Create Invoice"})]})]}),(0,p.jsxs)(d.UC,{children:[(0,p.jsxs)(d.MD,{children:[(0,p.jsxs)(d.hI,{color:"#059669",children:[(0,p.jsx)(d.Os,{children:nn}),(0,p.jsx)(d.v0,{children:"Total Invoices"}),(0,p.jsx)(d.d1,{children:"All invoice records"})]}),(0,p.jsxs)(d.hI,{color:"#2563EB",children:[(0,p.jsx)(d.Os,{children:tn}),(0,p.jsx)(d.v0,{children:"Paid Invoices"}),(0,p.jsxs)(d.d1,{children:[nn>0?Math.round(tn/nn*100):0,"% completed"]})]}),(0,p.jsxs)(d.hI,{color:"#DC2626",children:[(0,p.jsx)(d.Os,{children:an}),(0,p.jsx)(d.v0,{children:"Overdue Invoices"}),(0,p.jsx)(d.d1,{children:"Requires attention"})]}),(0,p.jsxs)(d.hI,{color:"#7C3AED",children:[(0,p.jsx)(d.Os,{children:(0,s.vv)(rn)}),(0,p.jsx)(d.v0,{children:"Total Revenue"}),(0,p.jsx)(d.d1,{children:"From paid invoices"})]})]}),(0,p.jsxs)(c.Qn,{children:[(0,p.jsx)(c.DO,{placeholder:"Search by invoice #, company, restaurant...",value:a,onChange:e=>l(e.target.value)}),(0,p.jsxs)(c.Jt,{value:U,onChange:e=>O(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Status"}),(0,p.jsx)("option",{value:"draft",children:"Draft"}),(0,p.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,p.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,p.jsx)("option",{value:"paid",children:"Paid"}),(0,p.jsx)("option",{value:"overdue",children:"Overdue"}),(0,p.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,p.jsxs)(c.Jt,{value:R,onChange:e=>_(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Types"}),(0,p.jsx)("option",{value:"automatic",children:"Automatic"}),(0,p.jsx)("option",{value:"manual",children:"Manual"})]}),(0,p.jsxs)(c.Jt,{value:W,onChange:e=>H(e.target.value),children:[(0,p.jsx)("option",{value:"all",children:"All Months"}),Ze.map(e=>{const[n,t]=e.split("-"),i=["January","February","March","April","May","June","July","August","September","October","November","December"][parseInt(t)-1];return(0,p.jsxs)("option",{value:e,children:[i," ",n]},e)})]})]}),(0,p.jsxs)(d.XI,{children:[(0,p.jsxs)(z,{columns:"2fr 2fr 1fr 1fr 1fr 1fr 1fr 200px",children:[(0,p.jsx)("span",{children:"Invoice"}),(0,p.jsx)("span",{children:"Customer"}),(0,p.jsx)("span",{children:"Plan/Item"}),(0,p.jsx)("span",{children:"Due Date"}),(0,p.jsx)("span",{children:"Status"}),(0,p.jsx)("span",{children:"Amount"}),(0,p.jsx)("span",{children:"Total"}),(0,p.jsx)("span",{children:"Actions"})]}),en.map(e=>(0,p.jsxs)(M,{columns:"2fr 2fr 1fr 1fr 1fr 1fr 1fr 200px",children:[(0,p.jsxs)(d.Np,{children:[(0,p.jsxs)(d.Uj,{children:[(0,p.jsx)(d.PM,{children:"Invoice"}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(u,{children:[e.invoiceNumber,"automatic"===e.type&&(0,p.jsx)(g,{children:"AUTO"})]}),(0,p.jsxs)(m,{children:["Issued: ",sn(e.issueDate)]})]})]}),(0,p.jsxs)(d.Uj,{children:[(0,p.jsx)(d.PM,{children:"Customer"}),(0,p.jsxs)(h,{children:[(0,p.jsx)(u,{children:e.customerName||e.restaurantName||"Unknown"}),(0,p.jsx)(m,{children:ln(e.payerType||"restaurant")})]})]}),(0,p.jsxs)(d.Uj,{children:[(0,p.jsx)(d.PM,{children:"Plan/Item"}),(0,p.jsx)("div",{children:e.categoryDisplayName||e.planType||"Service"})]}),(0,p.jsxs)(d.Uj,{children:[(0,p.jsx)(d.PM,{children:"Due Date"}),(0,p.jsx)("div",{children:sn(e.dueDate)})]}),(0,p.jsxs)(d.Uj,{children:[(0,p.jsx)(d.PM,{children:"Status"}),(0,p.jsx)("div",{children:(0,p.jsx)(v,{status:e.status,children:on(e.status)})})]}),(0,p.jsxs)(d.Uj,{children:[(0,p.jsx)(d.PM,{children:"Amount"}),(0,p.jsx)(y,{children:(0,s.vv)(e.amount,e.currency||"USD")})]}),(0,p.jsxs)(d.Uj,{children:[(0,p.jsx)(d.PM,{children:"Total"}),(0,p.jsx)(y,{highlight:!0,children:(0,s.vv)(e.total,e.currency||"USD")})]})]}),(0,p.jsxs)(d.wr,{children:[(0,p.jsx)(j,{variant:"primary",onClick:()=>(e=>{xe(e),G(!0)})(e),children:"View"}),"draft"===e.status&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j,{onClick:()=>dn(e),children:"Edit"}),(0,p.jsx)(j,{onClick:()=>(e=>{xe(e),ee(!0)})(e),children:"Send"})]}),("pending_payment"===e.status||""===e.status||!e.status)&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j,{onClick:()=>dn(e),children:"Edit"}),(0,p.jsx)(j,{onClick:()=>Ve(e),title:"Download Invoice",children:(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,p.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,p.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,p.jsx)(j,{variant:"email",onClick:()=>cn(e),title:"Send Invoice",children:(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,p.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,p.jsx)(f,{onClick:()=>pn(e),title:"Delete Invoice",children:(0,p.jsx)(b,{children:"\xd7"})})]}),"payment_submitted"===e.status&&(0,p.jsxs)(p.Fragment,{children:[e.hasPaymentInfo&&(0,p.jsx)(j,{variant:"primary",onClick:()=>(e=>{xe(e),X(!0)})(e),children:"Confirm"}),(0,p.jsx)(j,{onClick:()=>dn(e),children:"Edit"}),(0,p.jsx)(j,{onClick:()=>Ve(e),title:"Download Invoice",children:(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,p.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,p.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,p.jsx)(j,{variant:"email",onClick:()=>cn(e),title:"Resend Invoice",children:(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,p.jsx)("polyline",{points:"22,6 12,13 2,6"})]})})]}),"overdue"===e.status&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(j,{onClick:()=>dn(e),children:"Edit"}),(0,p.jsx)(j,{onClick:()=>Ve(e),title:"Download Invoice",children:(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,p.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,p.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,p.jsx)(j,{variant:"email",onClick:()=>cn(e),title:"Resend Invoice",children:(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,p.jsx)("polyline",{points:"22,6 12,13 2,6"})]})}),(0,p.jsx)(f,{onClick:()=>pn(e),title:"Delete Invoice",children:(0,p.jsx)(b,{children:"\xd7"})})]}),"paid"===e.status&&(0,p.jsx)(j,{variant:"primary",onClick:()=>Ve(e),children:"Download PDF"}),"cancelled"===e.status&&(0,p.jsx)(j,{onClick:()=>Ve(e),title:"Download Invoice",children:(0,p.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,p.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,p.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,p.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})})]})]},e.id)),0===en.length&&(0,p.jsxs)(d.pp,{children:[(0,p.jsx)("div",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"8px"},children:"No Invoices Found"}),(0,p.jsx)("div",{style:{fontSize:"14px"},children:0===n.length?"Create your first invoice to get started":"Try adjusting your filters"})]})]}),J&&(0,p.jsx)(w,{onClick:e=>{e.target===e.currentTarget&&(Y(!1),Qe())},children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(k,{children:"Create Invoice"}),(0,p.jsx)(S,{onClick:()=>{Y(!1),Qe()},children:"\xd7"})]}),(0,p.jsxs)(N,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Search Manager or Restaurant *"}),(0,p.jsxs)("div",{style:{position:"relative"},children:[(0,p.jsx)(I,{type:"text",value:Ee,onChange:e=>(e=>{if(Be(e),Te(!0),e.length<2)return void Ae({managers:[],restaurants:[]});console.log("Searching with query:",e),console.log("Available managers:",Ce),console.log("Available restaurants:",ke);const n=Ce.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=ke.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));console.log("Filtered managers:",n),console.log("Filtered restaurants:",t),Ae({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>Te(!0),onBlur:()=>setTimeout(()=>Te(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),Ie&&(De.managers.length>0||De.restaurants.length>0)&&(0,p.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[De.managers.length>0&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),De.managers.map(e=>(0,p.jsxs)("div",{onClick:()=>Ge("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,p.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),De.restaurants.length>0&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),De.restaurants.map(e=>{const n=Ce.find(n=>n.id===e.manager_id);return(0,p.jsxs)("div",{onClick:()=>Ge("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,p.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:["Manager: ",(null===n||void 0===n?void 0:n.fullName)||"Unknown"]})]},e.id)})]})]})]}),Pe&&(0,p.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===Pe.type?Pe.data.fullName:Pe.data.name}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===Pe.type?`${Pe.data.companyName} \u2022 Manager`:`${Pe.data.address||"No address"} \u2022 Restaurant`})]}),(0,p.jsx)("button",{onClick:()=>{$e(null),Be("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"18px",lineHeight:"1",padding:"4px"},title:"Remove selection",children:"\xd7"})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Amount (RM) *"}),(0,p.jsx)(I,{type:"number",step:"0.01",min:"0",value:Oe.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,i=n+t;Re({...Oe,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})},placeholder:"0.00",required:!0})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Due Date *"}),(0,p.jsx)(I,{type:"date",value:Oe.dueDate,onChange:e=>Re({...Oe,dueDate:e.target.value}),required:!0,min:(new Date).toISOString().split("T")[0]})]})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Invoice Category"}),(0,p.jsxs)(P,{value:Oe.invoiceCategory||"service",onChange:e=>Re({...Oe,invoiceCategory:e.target.value}),children:[(0,p.jsx)("option",{value:"service",children:"Service"}),(0,p.jsx)("option",{value:"consulting",children:"Consulting"}),(0,p.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===Oe.invoiceCategory&&(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Plan/Item"}),(0,p.jsx)(T,{value:Oe.customDescription||"",onChange:e=>Re({...Oe,customDescription:e.target.value}),rows:3})]}),("service"===(Oe.invoiceCategory||"service")||"consulting"===Oe.invoiceCategory)&&(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Plan/Item"}),(0,p.jsx)(T,{value:Oe.serviceDescription||"",onChange:e=>Re({...Oe,serviceDescription:e.target.value}),rows:3})]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(L,{children:[(0,p.jsx)("span",{children:"Subtotal:"}),(0,p.jsx)("span",{children:(0,s.vv)(parseFloat(Oe.amount||"0"),e.currency)})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)("span",{children:"Tax (6%):"}),(0,p.jsx)("span",{children:(0,s.vv)(parseFloat(Oe.tax||"0"),e.currency)})]}),(0,p.jsxs)(L,{highlight:!0,children:[(0,p.jsx)("span",{children:"Total:"}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,s.vv)(parseFloat(Oe.total||"0"),e.currency)})})]})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(x,{variant:"secondary",onClick:()=>{Y(!1),Qe()},children:"Cancel"}),(0,p.jsx)(x,{variant:"primary",onClick:async()=>{if(Pe&&Oe.amount&&Oe.dueDate)try{const e=parseFloat(Oe.amount),n=parseFloat(Oe.tax),t=parseFloat(Oe.total),i=new Date;i.setDate(1);const a=new Date;a.setMonth(a.getMonth()+1),a.setDate(0);let r="";r="others"===Oe.invoiceCategory?Oe.customDescription||"":Oe.serviceDescription||"";let s="",o="",l="",d="";if("restaurant"===Pe.type){const e=Pe.data;s=e.name,d=e.name,l=e.name;const n=[];e.address&&n.push(e.address),e.phone&&n.push(`Phone: ${e.phone}`),e.email&&n.push(`Email: ${e.email}`),o=n.join("\n")}else if("manager"===Pe.type){const e=Pe.data;s=e.fullName,l=e.companyName||e.fullName;const n=[];e.companyName&&n.push(e.companyName),e.email&&n.push(`Email: ${e.email}`),o=n.join("\n")}const c={restaurant_id:"restaurant"===Pe.type?Pe.data.id:null,manager_id:"manager"===Pe.type?Pe.data.id:null,customer_name:s,customer_address:o,company_name:l,restaurant_name:d,type:"manual",billing_period_start:i.toISOString(),billing_period_end:a.toISOString(),due_date:new Date(Oe.dueDate).toISOString(),total_amount:t,status:"draft",notes:r,issued_by:1,issued_at:(new Date).toISOString()},p=[{item_type:Oe.invoiceCategory,description:r,calculation_method:"fixed",fixed_amount:e,calculated_amount:e,tax_rate:6,tax_amount:n,total_amount:t}],x=await fetch("/api/invoices",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({invoice_data:c,items:p})});if(x.ok)await _e(),Y(!1),Qe();else{const e=await x.json();alert(`Failed to create invoice: ${e.error||"Unknown error"}`)}}catch(e){console.error("Error creating invoice:",e),alert("Error creating invoice. Please try again.")}else alert("Please select a manager/restaurant, enter amount, and set due date.")},disabled:!Pe||!Oe.amount||!Oe.dueDate,children:"Create Invoice"})]})]})}),q&&pe&&(0,p.jsx)(w,{onClick:()=>G(!1),children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(k,{children:["Invoice Details - ",pe.invoiceNumber]}),(0,p.jsx)(S,{onClick:()=>G(!1),children:"\xd7"})]}),(0,p.jsxs)(N,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Invoice Number"}),(0,p.jsx)("div",{children:pe.invoiceNumber})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Status"}),(0,p.jsx)(v,{status:pe.status,children:on(pe.status)})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Customer"}),(0,p.jsx)("div",{children:pe.customerName})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Address"}),(0,p.jsx)("div",{children:pe.customerAddress})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Customer"}),(0,p.jsx)("div",{children:ln(pe.payerType||"restaurant")})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Restaurant"}),(0,p.jsx)("div",{children:pe.restaurantName})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Issue Date"}),(0,p.jsx)("div",{children:pe.issueDate})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Due Date"}),(0,p.jsx)("div",{children:pe.dueDate})]})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Items"}),pe.items.map((e,n)=>(0,p.jsxs)("div",{style:{padding:"8px",background:"#F8FAFC",borderRadius:"4px",marginBottom:"8px"},children:[e.description," - ",(0,s.vv)(e.total,pe.currency||"USD")]},n))]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(L,{children:[(0,p.jsx)("span",{children:"Subtotal:"}),(0,p.jsx)("span",{children:(0,s.vv)(pe.amount,pe.currency||"USD")})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)("span",{children:"Tax (6%):"}),(0,p.jsx)("span",{children:(0,s.vv)(pe.tax,pe.currency||"USD")})]}),(0,p.jsxs)(L,{highlight:!0,children:[(0,p.jsx)("span",{children:"Total:"}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,s.vv)(pe.total,pe.currency||"USD")})})]})]})]})]})}),Q&&pe&&(0,p.jsx)(w,{onClick:()=>X(!1),children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(k,{children:["Confirm Payment - ",pe.invoiceNumber]}),(0,p.jsx)(S,{onClick:()=>X(!1),children:"\xd7"})]}),(0,p.jsxs)(N,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Payment Confirmation"}),(0,p.jsxs)($,{children:[(0,p.jsxs)(L,{children:[(0,p.jsx)("span",{children:"Manager:"}),(0,p.jsx)("span",{children:pe.managerName})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)("span",{children:"Company:"}),(0,p.jsx)("span",{children:pe.companyName})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)("span",{children:"Invoice Number:"}),(0,p.jsx)("span",{children:pe.invoiceNumber})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)("span",{children:"Due Date:"}),(0,p.jsx)("span",{children:sn(pe.dueDate)})]}),(0,p.jsxs)(L,{highlight:!0,children:[(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:"Payment Amount:"})}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,s.vv)(pe.total,pe.currency||"USD")})})]})]})]}),(0,p.jsx)("div",{style:{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"8px",padding:"16px",margin:"16px 0"},children:(0,p.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px"},children:[(0,p.jsx)("strong",{children:"\u26a0\ufe0f Confirm Payment Receipt"}),(0,p.jsx)("br",{}),'Only mark this invoice as paid if you have received and verified the payment from the manager. This action will update the invoice status to "Paid" and cannot be easily undone.']})}),(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Confirmation Details"}),(0,p.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.6",color:"#374151",background:"#F8FAFC",padding:"12px",borderRadius:"6px"},children:["\u2022 Payment Date: ",(new Date).toLocaleDateString("en-MY"),(0,p.jsx)("br",{}),"\u2022 Status Change: ",pe.status," \u2192 Paid",(0,p.jsx)("br",{}),"\u2022 This will update the invoice status immediately"]})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(x,{variant:"secondary",onClick:()=>X(!1),children:"Cancel"}),(0,p.jsx)(x,{variant:"primary",onClick:async()=>{if(pe)try{const e=await fetch(`/api/invoices/${pe.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"paid",paid_at:(new Date).toISOString()})});if(e.ok)await _e(),X(!1),xe(null);else{const n=await e.json();alert(`Failed to update payment status: ${n.error||"Unknown error"}`)}}catch(e){console.error("Error updating payment status:",e),alert("Error updating payment status. Please try again.")}},children:"Confirm Payment Received"})]})]})}),K&&pe&&he&&(0,p.jsx)(w,{onClick:()=>V(!1),children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(k,{children:["Edit Invoice - ",pe.invoiceNumber]}),(0,p.jsx)(S,{onClick:()=>V(!1),children:"\xd7"})]}),(0,p.jsxs)(N,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Search Manager or Restaurant *"}),(0,p.jsxs)("div",{style:{position:"relative"},children:[(0,p.jsx)(I,{type:"text",value:me,onChange:e=>(e=>{if(ge(e),fe(!0),e.length<2)return void ye({managers:[],restaurants:[]});const n=Ce.filter(n=>n.fullName&&n.fullName.toLowerCase().includes(e.toLowerCase())||n.companyName&&n.companyName.toLowerCase().includes(e.toLowerCase())),t=ke.filter(n=>n.name&&n.name.toLowerCase().includes(e.toLowerCase()));ye({managers:n.slice(0,5),restaurants:t.slice(0,5)})})(e.target.value),onFocus:()=>fe(!0),onBlur:()=>setTimeout(()=>fe(!1),200),placeholder:"Type to search for managers or restaurants",required:!0}),je&&(ve.managers.length>0||ve.restaurants.length>0)&&(0,p.jsxs)("div",{style:{position:"absolute",top:"100%",left:0,right:0,background:"white",border:"1px solid #E6EBF1",borderRadius:"8px",maxHeight:"300px",overflowY:"auto",zIndex:1e3,boxShadow:"0 4px 12px rgba(0, 0, 0, 0.1)"},children:[ve.managers.length>0&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"MANAGERS"}),ve.managers.map(e=>(0,p.jsxs)("div",{onClick:()=>qe("manager",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,p.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.fullName}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.companyName||e.email})]},e.id))]}),ve.restaurants.length>0&&(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{padding:"8px 12px",background:"#F8FAFC",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"RESTAURANTS"}),ve.restaurants.map(e=>{const n=Ce.find(n=>n.id===e.manager_id);return(0,p.jsxs)("div",{onClick:()=>qe("restaurant",e),style:{padding:"12px",cursor:"pointer",borderBottom:"1px solid #F3F4F6",transition:"background 0.2s"},onMouseEnter:e=>e.currentTarget.style.background="#F8FAFC",onMouseLeave:e=>e.currentTarget.style.background="white",children:[(0,p.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:e.name}),(0,p.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n?`Manager: ${n.fullName}`:"No manager assigned"," \u2022 ",e.address||"No address"]})]},e.id)})]})]})]}),be&&(0,p.jsxs)("div",{style:{marginTop:"8px",padding:"12px",background:"#F0F7FF",border:"1px solid #B3D9FF",borderRadius:"8px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("div",{style:{fontWeight:"500",color:"#0A2540"},children:"manager"===be.type?be.data.fullName:be.data.name}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:"manager"===be.type?`${be.data.companyName} \u2022 Manager`:`${be.data.address||"No address"} \u2022 Restaurant`})]}),(0,p.jsx)("button",{onClick:()=>{we(null),ge("")},style:{background:"none",border:"none",color:"#6B7280",cursor:"pointer",fontSize:"16px",padding:"4px"},children:"\xd7"})]})]}),(0,p.jsxs)(A,{children:[(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Amount (RM)"}),(0,p.jsx)(I,{type:"number",value:he.amount,onChange:e=>{const n=parseFloat(e.target.value)||0,t=.06*n,i=n+t;ue({...he,amount:e.target.value,tax:t.toFixed(2),total:i.toFixed(2)})}})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Due Date"}),(0,p.jsx)(I,{type:"date",value:he.dueDate,onChange:e=>ue({...he,dueDate:e.target.value})})]})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Status"}),(0,p.jsxs)(P,{value:he.status,onChange:e=>ue({...he,status:e.target.value}),children:[(0,p.jsx)("option",{value:"draft",children:"Draft"}),(0,p.jsx)("option",{value:"pending_payment",children:"Pending Payment"}),(0,p.jsx)("option",{value:"payment_submitted",children:"Payment Submitted"}),(0,p.jsx)("option",{value:"paid",children:"Paid"}),(0,p.jsx)("option",{value:"overdue",children:"Overdue"}),(0,p.jsx)("option",{value:"cancelled",children:"Cancelled"})]})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Invoice Category"}),(0,p.jsxs)(P,{value:he.invoiceCategory||"service",onChange:e=>ue({...he,invoiceCategory:e.target.value}),children:[(0,p.jsx)("option",{value:"service",children:"Service"}),(0,p.jsx)("option",{value:"consulting",children:"Consulting"}),(0,p.jsx)("option",{value:"others",children:"Others"})]})]}),"others"===he.invoiceCategory&&(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Plan/Item"}),(0,p.jsx)(T,{value:he.customDescription||"",onChange:e=>ue({...he,customDescription:e.target.value}),rows:3})]}),("service"===(he.invoiceCategory||"service")||"consulting"===he.invoiceCategory)&&(0,p.jsxs)(E,{children:[(0,p.jsx)(B,{children:"Plan/Item"}),(0,p.jsx)(T,{value:he.serviceDescription||"",onChange:e=>ue({...he,serviceDescription:e.target.value}),rows:3})]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(L,{children:[(0,p.jsx)("span",{children:"Subtotal:"}),(0,p.jsx)("span",{children:(0,s.vv)(parseFloat(he.amount||"0"),he.currency||"USD")})]}),(0,p.jsxs)(L,{children:[(0,p.jsx)("span",{children:"Tax (6%):"}),(0,p.jsx)("span",{children:(0,s.vv)(parseFloat(he.tax||"0"),he.currency||"USD")})]}),(0,p.jsxs)(L,{highlight:!0,children:[(0,p.jsx)("span",{children:"Total:"}),(0,p.jsx)("span",{children:(0,p.jsx)("strong",{children:(0,s.vv)(parseFloat(he.total||"0"),he.currency||"USD")})})]})]})]}),(0,p.jsxs)(D,{children:[(0,p.jsx)(x,{variant:"secondary",onClick:()=>V(!1),children:"Cancel"}),(0,p.jsx)(x,{variant:"primary",onClick:async()=>{if(pe&&he)try{const e=await fetch(`/api/invoices/${pe.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({amount:parseFloat(he.amount),tax:parseFloat(he.tax),total:parseFloat(he.total),dueDate:he.dueDate,status:he.status,payerType:he.payerType,payerId:he.payerId,items:he.items})});if(e.ok){const e={...pe,amount:parseFloat(he.amount),tax:parseFloat(he.tax),total:parseFloat(he.total),dueDate:he.dueDate,status:he.status,payerType:he.payerType,payerId:he.payerId,items:he.items};t(n.map(n=>n.id===pe.id?e:n)),V(!1),xe(null),ue(null),ce("Invoice updated successfully!"),le(!0)}else{const n=await e.json();ce(`Failed to update invoice: ${n.error||"Unknown error"}`),le(!0)}}catch(e){console.error("Error updating invoice:",e),ce("Error updating invoice. Please try again."),le(!0)}},children:"Save Changes"})]})]})}),Z&&pe&&(0,p.jsx)(w,{onClick:()=>ee(!1),children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(k,{children:"Send Invoice"}),(0,p.jsx)(S,{onClick:()=>ee(!1),children:"\xd7"})]}),(0,p.jsx)(N,{children:(0,p.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,p.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Send Invoice to Manager"}),(0,p.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to send invoice ",(0,p.jsx)("strong",{children:pe.invoiceNumber})," to ",(0,p.jsx)("strong",{children:pe.managerName}),"?"]}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,p.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,p.jsx)("span",{style:{fontWeight:"500"},children:pe.invoiceNumber})]}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,p.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,p.jsx)("span",{style:{fontWeight:"500"},children:pe.managerName})]}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,p.jsx)("span",{style:{color:"#6B7280"},children:"Company:"}),(0,p.jsx)("span",{style:{fontWeight:"500"},children:pe.companyName})]}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,p.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,p.jsx)("span",{style:{fontWeight:"600",color:"#059669"},children:(0,s.vv)(pe.total,pe.currency||"USD")})]})]})]})}),(0,p.jsxs)(D,{children:[(0,p.jsx)(x,{variant:"secondary",onClick:()=>ee(!1),children:"Cancel"}),(0,p.jsx)(x,{variant:"primary",onClick:async()=>{if(pe)try{const e=await fetch(`/api/invoices/${pe.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"pending_payment"})});if(e.ok)await _e(),ee(!1),xe(null);else{const n=await e.json();alert(`Failed to send invoice: ${n.error||"Unknown error"}`)}}catch(e){console.error("Error sending invoice:",e),alert("Error sending invoice. Please try again.")}},children:"Send Invoice"})]})]})}),ne&&pe&&(0,p.jsx)(w,{onClick:()=>te(!1),children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(k,{children:"Resend Invoice"}),(0,p.jsx)(S,{onClick:()=>te(!1),children:"\xd7"})]}),(0,p.jsx)(N,{children:(0,p.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,p.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Resend Invoice"}),(0,p.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Resend invoice ",(0,p.jsx)("strong",{children:pe.invoiceNumber})," to ",(0,p.jsx)("strong",{children:pe.managerName}),"?"]}),(0,p.jsx)("div",{style:{background:"#FEF3C7",padding:"12px",borderRadius:"6px",border:"1px solid #F59E0B",fontSize:"13px",color:"#92400E"},children:"\u2139\ufe0f This will send another copy of the invoice to the manager's email."})]})}),(0,p.jsxs)(D,{children:[(0,p.jsx)(x,{variant:"secondary",onClick:()=>te(!1),children:"Cancel"}),(0,p.jsx)(x,{variant:"primary",onClick:()=>{pe&&(te(!1),xe(null))},children:"Resend Invoice"})]})]})}),ie&&pe&&(0,p.jsx)(w,{onClick:()=>ae(!1),children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(k,{children:"Cancel Invoice"}),(0,p.jsx)(S,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,p.jsx)(N,{children:(0,p.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,p.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Cancel Invoice"}),(0,p.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",marginBottom:"20px",lineHeight:"1.6"},children:["Are you sure you want to cancel invoice ",(0,p.jsx)("strong",{children:pe.invoiceNumber}),"?"]}),(0,p.jsxs)("div",{style:{background:"#FEE2E2",padding:"16px",borderRadius:"8px",border:"1px solid #FCA5A5",marginBottom:"16px"},children:[(0,p.jsx)("p",{style:{margin:0,color:"#991B1B",fontSize:"14px",fontWeight:"500"},children:(0,p.jsx)("strong",{children:"\u26a0\ufe0f This action cannot be undone"})}),(0,p.jsx)("p",{style:{margin:"8px 0 0 0",color:"#7F1D1D",fontSize:"13px"},children:"The invoice will be marked as cancelled and cannot be sent or processed for payment."})]}),(0,p.jsxs)("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"8px",border:"1px solid #E6EBF1"},children:[(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,p.jsx)("span",{style:{color:"#6B7280"},children:"Invoice:"}),(0,p.jsx)("span",{style:{fontWeight:"500"},children:pe.invoiceNumber})]}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"8px"},children:[(0,p.jsx)("span",{style:{color:"#6B7280"},children:"Manager:"}),(0,p.jsx)("span",{style:{fontWeight:"500"},children:pe.managerName})]}),(0,p.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,p.jsx)("span",{style:{color:"#6B7280"},children:"Amount:"}),(0,p.jsx)("span",{style:{fontWeight:"600",color:"#DC2626"},children:(0,s.vv)(pe.total,pe.currency||"USD")})]})]})]})}),(0,p.jsxs)(D,{children:[(0,p.jsx)(x,{variant:"secondary",onClick:()=>ae(!1),children:"Keep Invoice"}),(0,p.jsx)(x,{variant:"primary",onClick:async()=>{if(pe)try{const e=await fetch(`/api/invoices/${pe.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:"cancelled"})});if(e.ok)await _e(),ae(!1),xe(null);else{const n=await e.json();alert(`Failed to cancel invoice: ${n.error||"Unknown error"}`)}}catch(e){console.error("Error cancelling invoice:",e),alert("Error cancelling invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Cancel Invoice"})]})]})}),re&&pe&&(0,p.jsx)(w,{onClick:()=>se(!1),children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(k,{children:"Delete Invoice"}),(0,p.jsx)(S,{onClick:()=>se(!1),children:"\xd7"})]}),(0,p.jsx)(N,{children:(0,p.jsxs)("div",{style:{textAlign:"center",padding:"20px 0"},children:[(0,p.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"12px"},children:"Delete Invoice"}),(0,p.jsxs)("p",{style:{fontSize:"14px",color:"#6B7280",lineHeight:"1.5"},children:["Are you sure you want to permanently delete invoice ",(0,p.jsxs)("strong",{children:["#",pe.invoiceNumber]}),"?",(0,p.jsx)("br",{}),"This action cannot be undone."]})]})}),(0,p.jsxs)(D,{children:[(0,p.jsx)(x,{variant:"secondary",onClick:()=>se(!1),children:"Keep Invoice"}),(0,p.jsx)(x,{variant:"primary",onClick:async()=>{if(pe)try{const e=await fetch(`/api/invoices/${pe.id}`,{method:"DELETE",headers:{"Content-Type":"application/json"}});if(e.ok)await _e(),se(!1),xe(null);else{const n=await e.json();alert(`Failed to delete invoice: ${n.error||"Unknown error"}`)}}catch(e){console.error("Error deleting invoice:",e),alert("Error deleting invoice. Please try again.")}},style:{background:"#DC2626",borderColor:"#DC2626"},children:"Delete Invoice"})]})]})}),oe&&(0,p.jsx)(w,{onClick:()=>le(!1),children:(0,p.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(k,{children:"Success"}),(0,p.jsx)(S,{onClick:()=>le(!1),children:"\xd7"})]}),(0,p.jsx)(N,{children:(0,p.jsx)("div",{style:{textAlign:"center",padding:"20px 0"},children:(0,p.jsx)("p",{style:{fontSize:"16px",color:"#0A2540",marginBottom:"8px",fontWeight:"500"},children:de})})}),(0,p.jsx)(D,{children:(0,p.jsx)(x,{variant:"primary",onClick:()=>le(!1),children:"OK"})})]})})]})]})})}}}]);