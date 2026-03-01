"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6529],{2488:(e,t,n)=>{n.d(t,{DO:()=>c,Jt:()=>p,Qn:()=>d});var i=n(8819),o=(n(9950),n(4752)),a=n(4414);const s=o.Ay.div`
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
`,r=o.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${i.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
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
`,l=o.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }

  &:disabled {
    background: ${i.w.colors.surfaceHover};
    color: ${i.w.colors.text.muted};
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
`,d=e=>{let{children:t,className:n,style:i,...o}=e;return(0,a.jsx)(s,{className:n,style:i,...o,children:t})},c=e=>{let{placeholder:t="Search...",...n}=e;return(0,a.jsx)(r,{placeholder:t,...n})},p=e=>{let{children:t,...n}=e;return(0,a.jsx)(l,{...n,children:t})}},2597:(e,t,n)=>{n.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});n(9950);var i=n(4752),o=n(4414);const a=i.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
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
`,s=i.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,r=i.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:n,style:i}=e;return(0,o.jsx)(a,{className:n,style:i,children:t})},d=e=>{let{active:t,onClick:n,children:i,className:a}=e;return(0,o.jsx)(s,{active:t,onClick:n,className:a,children:i})},c=e=>{let{count:t,variant:n="default",showZero:i=!1}=e;return 0!==t||i?(0,o.jsx)(r,{variant:n,children:t}):null}},6529:(e,t,n)=>{n.r(t),n.d(t,{default:()=>D});var i=n(8819),o=n(9950),a=n(4752),s=n(4492),r=n(6038),l=n(9018),d=n(1367),c=n(4728),p=n(2674),x=n(2488),u=n(2597),h=n(5612),m=n(1052),g=n.n(m),v=n(4414);const y=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`,f=a.Ay.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,b=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,j=a.Ay.button`
  padding: 8px 16px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"#635BFF":"white"};
  color: ${e=>e.active?"white":"#0A2540"};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    background: ${e=>e.active?"#635BFF":"#F7F7FF"};
  }
`,w=a.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: ${i.w.colors.secondary};

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,k=(0,a.Ay)(c.SC)``,A=a.Ay.div``,F=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,$=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,B=a.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,C=(0,a.Ay)(c.Wh)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`,S=a.Ay.button`
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

  ${e=>"primary"===e.variant?`\n    background: ${i.w.colors.primary};\n    color: white;\n    border-color: #635BFF;\n    padding: 6px 12px;\n\n    &:hover {\n      background: #4B45C6;\n    }\n  `:"success"===e.variant?`\n    background: ${i.w.colors.status.successAlt2};\n    color: white;\n    border-color: #10B981;\n    padding: 6px 12px;\n\n    &:hover {\n      background: #059669;\n    }\n  `:"danger"===e.variant?"\n    background: #EF4444;\n    color: white;\n    border-color: #EF4444;\n    padding: 6px 12px;\n\n    &:hover {\n      background: #DC2626;\n    }\n  ":"email"===e.variant?"\n    background: white;\n    color: #3B82F6;\n    border-color: #3B82F6;\n\n    &:hover {\n      background: #EFF6FF;\n    }\n  ":"\n    background: white;\n    color: #374151;\n    border-color: #D1D5DB;\n\n    &:hover {\n      background: #F9FAFB;\n      border-color: #9CA3AF;\n    }\n  "}
`,D=(a.Ay.div`
  background: white;
  padding: 40px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`,a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid ${i.w.colors.border};
`,a.Ay.img`
  max-width: 180px;
  max-height: 60px;
  object-fit: contain;
`,a.Ay.h1`
  font-size: 32px;
  font-weight: 700;
  color: ${i.w.colors.secondary};
  margin: 0;
  text-align: right;
`,a.Ay.div`
  text-align: right;
  margin-top: 8px;
`,a.Ay.p`
  margin: 4px 0;
  font-size: 13px;
  color: ${i.w.colors.text.muted};
`,a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
`,a.Ay.div``,a.Ay.h3`
  font-size: 11px;
  font-weight: 600;
  color: ${i.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`,a.Ay.p`
  font-size: 16px;
  font-weight: 600;
  color: ${i.w.colors.secondary};
  margin: 0 0 8px 0;
`,a.Ay.p`
  font-size: 13px;
  color: ${i.w.colors.text.muted};
  margin: 2px 0;
`,a.Ay.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;

  th {
    background: #F8FAFC;
    padding: 12px 16px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid ${i.w.colors.border};
  }

  th:last-child,
  td:last-child {
    text-align: right;
  }

  td {
    padding: 16px;
    font-size: 14px;
    color: #0A2540;
    border-bottom: 1px solid ${i.w.colors.border};
  }
`,a.Ay.div`
  display: flex;
  justify-content: flex-end;
`,a.Ay.div`
  width: 280px;
`,a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,a.Ay.span`
  font-size: ${e=>e.highlight?"16px":"14px"};
  color: ${e=>e.highlight?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.highlight?"600":"400"};
`,a.Ay.span`
  font-size: ${e=>e.highlight?"20px":"14px"};
  font-weight: ${e=>e.highlight?"700":"500"};
  color: #0A2540;
`,()=>{const{operationSettings:e}=(0,l.Pj)(),{user:t}=(0,d.As)(),{restaurantId:n}=(0,s.g)(),[a,c]=(0,s.ok)(),m=n?parseInt(n):null===t||void 0===t?void 0:t.restaurant_id,[D,z]=(0,o.useState)([]),[I,E]=(0,o.useState)([]),[_,N]=(0,o.useState)(""),[T,P]=(0,o.useState)("all"),[R,M]=(0,o.useState)(!1),[W,Y]=(0,o.useState)(()=>{const e=new Date;return{start:"2000-01-01",end:(t=e,`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`)};var t}),[U,L]=(0,o.useState)(!1),[H,O]=(0,o.useState)(null),[q,Q]=(0,o.useState)(!1),[J,V]=(0,o.useState)([]),[G,Z]=(0,o.useState)(!1),[X,K]=(0,o.useState)({paymentMethod:"",transactionId:"",receiptImage:""}),[ee,te]=(0,o.useState)(!1),[ne,ie]=(0,o.useState)(""),[oe,ae]=(0,o.useState)(null),[se,re]=(0,o.useState)({}),le=a.get("tab")||"all",de=e=>{c({tab:e})},ce=e=>{P(e),M(!1);const t=new Date;let n=new Date,i=new Date;const o=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"week":n.setDate(t.getDate()-t.getDay());break;case"month":n=new Date(t.getFullYear(),t.getMonth(),1),i=new Date(t.getFullYear(),t.getMonth()+1,0);break;case"year":n=new Date(t.getFullYear(),0,1),i=new Date(t.getFullYear(),11,31);break;case"all":n=new Date(2e3,0,1)}Y({start:o(n),end:o(i)})},pe=(e,t)=>{M(!0),Y(n=>({...n,[e]:t}))},xe=async()=>{try{const e=localStorage.getItem("auth_token"),n=m||(null===t||void 0===t?void 0:t.restaurant_id);if(!e||!n)return;const i=await fetch(`/api/invoices/restaurant/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){const e=await i.json(),t=(e.data||e||[]).map(e=>{var t,n;return{id:(null===(t=e.id)||void 0===t?void 0:t.toString())||"",invoiceNumber:e.invoice_number||"",issueDate:e.issued_at||e.issue_date||"",dueDate:e.due_date||"",paidDate:e.paid_at||e.paid_date||"",status:e.status||"",currency:e.currency||"MYR",amount:parseFloat(e.subtotal||e.amount||0),tax:parseFloat(e.tax_amount||e.tax||0),total:parseFloat(e.total_amount||e.total||0),items:e.items||[],billingPeriod:e.billing_period_start&&e.billing_period_end?`${he(e.billing_period_start)} - ${he(e.billing_period_end)}`:"",planType:e.category_display_name||e.plan_type||"Service",paymentMethod:e.payment_method||"",transactionId:e.transaction_id||"",receiptUrl:e.receipt_url||"",hasPaymentInfo:!!e.transaction_id||!!e.receipt_url,type:e.type||"manual",payerType:e.payer_type||"restaurant",payerId:(null===(n=e.payer_id)||void 0===n?void 0:n.toString())||"",invoiceCategory:e.invoice_category||"",categoryDisplayName:e.category_display_name||"",issuerType:e.issuer_type||e.issuerType||"system_admin",issuerId:e.issuer_id||e.issuerId||null,issuerName:e.issuer_name||e.issuerName||"",issuerInfo:e.issuerInfo||e.issuer_info||null,payerInfo:e.payerInfo||e.payer_info||null}});z(t)}}catch(e){console.error("Error fetching all invoices:",e)}},ue=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void E([]);const t=await fetch("/api/invoices/to-pay",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();E(e)}else E([])}catch(e){console.error("Error fetching invoices to pay:",e),E([])}};(0,o.useEffect)(()=>{xe(),ue(),(async()=>{if(m)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${m}/company-info`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();e.success&&e.data&&ae({companyName:e.data.company_name||"",address:e.data.address||"",city:e.data.city||"",state:e.data.state||"",postalCode:e.data.postal_code||"",country:e.data.country||"",phone:e.data.phone||"",email:e.data.email||"",website:e.data.website||"",taxNumber:e.data.tax_number||"",registrationNumber:e.data.registration_number||"",companyLogo:e.data.logo_url||"",bankName:e.data.bank_name||"",bankAccount:e.data.bank_account||"",bankAccountName:e.data.bank_account_name||"",swiftCode:e.data.swift_code||""})}}catch(e){console.error("Error fetching company settings:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const t=await e.json();t.success&&t.currencies&&re(t.currencies)}}catch(e){console.error("Error fetching currency config:",e)}})()},[m,null===t||void 0===t?void 0:t.restaurant_id]);const he=e=>{if(!e)return"-";return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})},me=e=>(e=>{if("pending_payment"!==e.status)return!1;const t=new Date;return new Date(e.dueDate)<t})(e)?"overdue":e.status,ge=e=>({draft:"Draft",pending_payment:"Pending",payment_submitted:"Confirming",paid:"Paid",overdue:"Overdue",cancelled:"Cancelled"}[e]||e),ve=e=>e.filter(e=>{var t,n,i,o;const a=_.toLowerCase(),s=!_||(null===(t=e.invoiceNumber)||void 0===t?void 0:t.toLowerCase().includes(a))||(null===(n=e.issuerName)||void 0===n?void 0:n.toLowerCase().includes(a))||(null===(i=e.status)||void 0===i?void 0:i.toLowerCase().includes(a))||(null===(o=e.categoryDisplayName)||void 0===o?void 0:o.toLowerCase().includes(a)),r=new Date(e.issueDate),l=new Date(W.start),d=new Date(W.end);d.setHours(23,59,59,999);return s&&(r>=l&&r<=d)}),ye=ve(D),fe=ve(I),be={total:D.length,pending:D.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length,confirming:D.filter(e=>"payment_submitted"===e.status).length,paid:D.filter(e=>"paid"===e.status).length,totalAmount:D.reduce((e,t)=>e+(t.total||0),0),pendingAmount:D.filter(e=>"pending_payment"===e.status||"overdue"===e.status).reduce((e,t)=>e+(t.total||0),0)},je=async e=>{O(e),ie(""),K({paymentMethod:"",transactionId:"",receiptImage:""}),await(async(e,t,n)=>{Z(!0);try{let i=`/api/admin/payment-settings/available/${e}`;"brand"===t&&n?i=`/api/brands/${n}/payment-settings/available/${e}`:"foodcourt"===t&&n&&(i=`/api/foodcourts/${n}/payment-settings/available/${e}`);const o=await fetch(i);if(o.ok){const e=await o.json();V(e.methods||[]),e.methods&&e.methods.length>0&&K(t=>({...t,paymentMethod:e.methods[0].id}))}}catch(i){console.error("Error fetching payment methods:",i)}finally{Z(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId),Q(!0)},we=async e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(!n)return;if(n.size>5242880)return void ie("Image size must be less than 5MB");const i=new FileReader;i.onload=()=>{K(e=>({...e,receiptImage:i.result}))},i.readAsDataURL(n)},ke=e=>{const t=e.issuerInfo,n=e.payerInfo||(oe?{name:oe.companyName,address:oe.address,city:oe.city,state:oe.state,postalCode:oe.postalCode,country:oe.country,phone:oe.phone,email:oe.email,taxId:oe.taxNumber,businessRegistration:oe.registrationNumber}:null);return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid ${i.w.colors.borderLight}; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: ${i.w.colors.secondary}; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: ${i.w.colors.text.muted}; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: ${i.w.colors.secondary}; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: ${i.w.colors.text.muted}; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: ${i.w.colors.text.muted}; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: ${i.w.colors.secondary}; }\n        .customer-details { font-size: 13px; color: ${i.w.colors.text.muted}; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: ${i.w.colors.text.muted}; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: ${i.w.colors.text.muted}; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: ${i.w.colors.text.muted}; }\n        .summary-row.tax { color: ${i.w.colors.text.muted}; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${null!==t&&void 0!==t&&t.logoUrl?`<img src="${t.logoUrl}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name" style="${null!==t&&void 0!==t&&t.logoUrl?"font-size: 14px;":""}">${(null===t||void 0===t?void 0:t.name)||e.issuerName||"Issuer"}</div>\n                <div class="company-details">\n                    ${null!==t&&void 0!==t&&t.address?`${t.address}<br>`:""}\n                    ${[null===t||void 0===t?void 0:t.city,null===t||void 0===t?void 0:t.state,null===t||void 0===t?void 0:t.postalCode].filter(Boolean).join(", ")}${null!==t&&void 0!==t&&t.city||null!==t&&void 0!==t&&t.state||null!==t&&void 0!==t&&t.postalCode?"<br>":""}\n                    ${null!==t&&void 0!==t&&t.country?`${t.country}<br>`:""}\n                    ${null!==t&&void 0!==t&&t.phone?`Tel: ${t.phone}<br>`:""}\n                    ${null!==t&&void 0!==t&&t.email?`Email: ${t.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${(null===n||void 0===n?void 0:n.name)||(null===oe||void 0===oe?void 0:oe.companyName)||"Your Company"}</div>\n                ${null!==n&&void 0!==n&&n.address||null!==oe&&void 0!==oe&&oe.address?`<div class="customer-details">${(null===n||void 0===n?void 0:n.address)||(null===oe||void 0===oe?void 0:oe.address)}</div>`:""}\n                ${[(null===n||void 0===n?void 0:n.city)||(null===oe||void 0===oe?void 0:oe.city),(null===n||void 0===n?void 0:n.state)||(null===oe||void 0===oe?void 0:oe.state),(null===n||void 0===n?void 0:n.postalCode)||(null===oe||void 0===oe?void 0:oe.postalCode)].filter(Boolean).length>0?`<div class="customer-details">${[(null===n||void 0===n?void 0:n.city)||(null===oe||void 0===oe?void 0:oe.city),(null===n||void 0===n?void 0:n.state)||(null===oe||void 0===oe?void 0:oe.state),(null===n||void 0===n?void 0:n.postalCode)||(null===oe||void 0===oe?void 0:oe.postalCode)].filter(Boolean).join(", ")}</div>`:""}\n                ${null!==n&&void 0!==n&&n.country||null!==oe&&void 0!==oe&&oe.country?`<div class="customer-details">${(null===n||void 0===n?void 0:n.country)||(null===oe||void 0===oe?void 0:oe.country)}</div>`:""}\n                ${null!==n&&void 0!==n&&n.email||null!==oe&&void 0!==oe&&oe.email?`<div class="customer-details">${(null===n||void 0===n?void 0:n.email)||(null===oe||void 0===oe?void 0:oe.email)}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${he(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${he(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${he(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items&&e.items.length>0?e.items.map(t=>`\n                    <tr>\n                        <td>${t.description}</td>\n                        <td class="text-center">${t.quantity}</td>\n                        <td class="text-right">${(0,r.vv)(t.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,r.vv)(t.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join(""):`\n                    <tr>\n                        <td>${e.categoryDisplayName||e.planType||"Service"}</td>\n                        <td class="text-center">1</td>\n                        <td class="text-right">${(0,r.vv)(e.amount,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,r.vv)(e.amount,e.currency||"MYR")}</td>\n                    </tr>\n                    `}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,r.vv)(e.subtotalBeforeDiscount||e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${e.discountType&&"none"!==e.discountType&&e.discountAmount>0?`\n                <div class="summary-row tax" style="color: #15803D;">\n                    <span>Discount${"percentage"===e.discountType?` (${e.discountValue}%)`:""}:</span>\n                    <span>-${(0,r.vv)(e.discountAmount,e.currency||"MYR")}</span>\n                </div>\n                `:""}\n                ${(e.additionalCharges||[]).map(t=>`\n                <div class="summary-row tax">\n                    <span>${t.name} (${t.rate}%):</span>\n                    <span>${(0,r.vv)(t.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${0===e.total?'<span style="color: #10B981; font-weight: 600;">Free</span>':(0,r.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${null!==t&&void 0!==t&&t.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${t.bankName}<br>\n                <strong>Account Name:</strong> ${t.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${t.bankAccount||"-"}\n                ${t.swiftCode?`<br><strong>SWIFT Code:</strong> ${t.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${null!==t&&void 0!==t&&t.taxId||null!==t&&void 0!==t&&t.businessRegistration?`\n        <div class="registration-info">\n            ${t.businessRegistration?`Reg No: ${t.businessRegistration}`:""}\n            ${t.businessRegistration&&t.taxId?" | ":""}\n            ${t.taxId?`Tax No: ${t.taxId}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},Ae=async e=>{try{var t;const n=ke(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const o=i.contentDocument||(null===(t=i.contentWindow)||void 0===t?void 0:t.document);if(!o)throw document.body.removeChild(i),new Error("Could not access iframe document");o.open(),o.write(n),o.close(),await new Promise(async e=>{try{var t;null!==(t=o.fonts)&&void 0!==t&&t.ready&&await o.fonts.ready}catch{}const n=o.querySelectorAll("img");await Promise.all(Array.from(n).map(e=>e.complete?Promise.resolve():new Promise(t=>{e.onload=t,e.onerror=t}))),setTimeout(e,100)});const a=await g()(o.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const s=a.toDataURL("image/png"),r=new h.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=a.height*l/a.width;r.addImage(s,"PNG",0,0,l,d),r.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(n){console.error("Error generating PDF:",n)}},Fe=e=>{const t=ke(e),n=window.open("","_blank","width=800,height=600");n&&(n.document.write(t),n.document.close(),setTimeout(()=>{n.print()},250))},$e=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,v.jsx)(p.an,{children:(0,v.jsxs)(p.bQ,{children:[(0,v.jsx)(p.B_,{children:(0,v.jsxs)("tr",{children:[(0,v.jsx)(p.gU,{children:"Invoice"}),(0,v.jsx)(p.gU,{children:"Issuer"}),(0,v.jsx)(p.gU,{align:"center",children:"Period"}),(0,v.jsx)(p.gU,{align:"center",children:"Issued"}),(0,v.jsx)(p.gU,{align:"center",children:"Due"}),(0,v.jsx)(p.gU,{align:"center",children:"Status"}),(0,v.jsx)(p.gU,{align:"right",children:"Amount"}),(0,v.jsx)(p.gU,{align:"right",children:"Total"}),(0,v.jsx)(p.gU,{align:"center",children:"Actions"})]})}),(0,v.jsx)("tbody",{children:e.length>0?e.map(e=>(0,v.jsxs)(p.J2,{children:[(0,v.jsx)(p.Bv,{"data-label":"Invoice",children:(0,v.jsxs)(A,{children:[(0,v.jsxs)(F,{children:[e.invoiceNumber,"automatic"===e.type&&(0,v.jsx)(B,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,v.jsx)($,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,v.jsx)(p.Bv,{"data-label":"Issuer",children:(0,v.jsx)(A,{children:(0,v.jsx)(F,{children:e.issuerName||("system_admin"===e.issuerType?"System Admin":"brand"===e.issuerType?"Brand":"Foodcourt")})})}),(0,v.jsx)(p.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,v.jsx)(p.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:he(e.issueDate)}),(0,v.jsx)(p.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:he(e.dueDate)}),(0,v.jsx)(p.Bv,{"data-label":"Status",align:"center",children:(0,v.jsx)(C,{status:me(e),children:ge(me(e))})}),(0,v.jsx)(p.Bv,{"data-label":"Amount",align:"right",children:(0,v.jsx)(p.DM,{children:(0,r.vv)(e.amount,e.currency||"MYR")})}),(0,v.jsx)(p.Bv,{"data-label":"Total",align:"right",children:(0,v.jsx)(p.DM,{highlight:!0,children:0===e.total?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,r.vv)(e.total,e.currency||"MYR")})}),(0,v.jsx)(p.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,v.jsxs)(p.wr,{children:[(0,v.jsx)(S,{variant:"primary",onClick:()=>(e=>{O(e),L(!0)})(e),children:"View"}),t&&("pending_payment"===e.status||"overdue"===e.status)&&e.total>0&&(0,v.jsx)(S,{variant:"success",onClick:()=>je(e),children:"Pay"}),(0,v.jsx)(S,{onClick:()=>Ae(e),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(S,{onClick:()=>Fe(e),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})})]},e.id)):(0,v.jsx)(p.J2,{children:(0,v.jsx)(p.Bv,{colSpan:9,children:(0,v.jsx)(p.ys,{children:"No invoices found"})})})})]})})};return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(p.mc,{children:[(0,v.jsx)(p.Y9,{children:(0,v.jsx)(p.hE,{children:"Invoices"})}),(0,v.jsxs)(p.UC,{children:[(0,v.jsxs)(p.MD,{children:[(0,v.jsxs)(p.hI,{children:[(0,v.jsx)(p.Os,{children:be.total}),(0,v.jsx)(p.v0,{children:"Total Invoices"})]}),(0,v.jsxs)(p.hI,{color:"#F59E0B",children:[(0,v.jsx)(p.Os,{children:be.pending}),(0,v.jsx)(p.v0,{children:"To Pay"}),(0,v.jsx)(p.d1,{children:(0,r.vv)(be.pendingAmount,(null===e||void 0===e?void 0:e.currency)||"MYR")})]}),(0,v.jsxs)(p.hI,{color:"#3B82F6",children:[(0,v.jsx)(p.Os,{children:be.confirming}),(0,v.jsx)(p.v0,{children:"Confirming"})]}),(0,v.jsxs)(p.hI,{color:"#10B981",children:[(0,v.jsx)(p.Os,{children:be.paid}),(0,v.jsx)(p.v0,{children:"Paid"})]})]}),(0,v.jsxs)(u.tU,{children:[(0,v.jsxs)(u.oz,{active:"all"===le,onClick:()=>de("all"),children:["All Invoices",(0,v.jsx)(u.Ex,{count:D.length})]}),(0,v.jsxs)(u.oz,{active:"to_pay"===le,onClick:()=>de("to_pay"),children:["Invoices to Pay",(0,v.jsx)(u.Ex,{count:I.filter(e=>"pending_payment"===e.status||"overdue"===e.status||"payment_submitted"===e.status).length,variant:"warning"})]})]}),(0,v.jsx)(y,{children:(0,v.jsxs)(f,{children:[(0,v.jsx)(x.DO,{placeholder:"Search invoice, issuer, status...",value:_,onChange:e=>N(e.target.value)}),(0,v.jsxs)(b,{children:[(0,v.jsx)(j,{active:"week"===T&&!R,onClick:()=>ce("week"),children:"Week"}),(0,v.jsx)(j,{active:"month"===T&&!R,onClick:()=>ce("month"),children:"Month"}),(0,v.jsx)(j,{active:"year"===T&&!R,onClick:()=>ce("year"),children:"Year"}),(0,v.jsx)(j,{active:"all"===T&&!R,onClick:()=>ce("all"),children:"All"}),(0,v.jsx)(w,{type:"date",value:W.start,onChange:e=>pe("start",e.target.value)}),(0,v.jsx)(w,{type:"date",value:W.end,onChange:e=>pe("end",e.target.value)})]})]})}),"all"===le&&$e(ye,!0),"to_pay"===le&&$e(fe,!0)]}),U&&H&&(()=>{const e=H.issuerInfo,t=H.payerInfo||(oe?{name:oe.companyName,address:oe.address,city:oe.city,state:oe.state,postalCode:oe.postalCode,country:oe.country,phone:oe.phone,email:oe.email,taxId:oe.taxNumber,businessRegistration:oe.registrationNumber}:null);return(0,v.jsx)(p.mH,{onClick:()=>L(!1),children:(0,v.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,v.jsxs)(p.rQ,{children:[(0,v.jsx)(p.wt,{children:"Invoice Details"}),(0,v.jsx)(p.Jn,{onClick:()=>L(!1),children:"\xd7"})]}),(0,v.jsxs)(p.cw,{children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===e||void 0===e?void 0:e.logoUrl)&&(0,v.jsx)("img",{src:e.logoUrl,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,v.jsx)("div",{style:{fontSize:null!==e&&void 0!==e&&e.logoUrl?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===e||void 0===e?void 0:e.name)||H.issuerName||"Issuer"}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===e||void 0===e?void 0:e.address)&&(0,v.jsx)("div",{children:e.address}),((null===e||void 0===e?void 0:e.city)||(null===e||void 0===e?void 0:e.state)||(null===e||void 0===e?void 0:e.postalCode))&&(0,v.jsx)("div",{children:[null===e||void 0===e?void 0:e.city,null===e||void 0===e?void 0:e.state,null===e||void 0===e?void 0:e.postalCode].filter(Boolean).join(", ")}),(null===e||void 0===e?void 0:e.country)&&(0,v.jsx)("div",{children:e.country}),(null===e||void 0===e?void 0:e.phone)&&(0,v.jsxs)("div",{children:["Tel: ",e.phone]}),(null===e||void 0===e?void 0:e.email)&&(0,v.jsxs)("div",{children:["Email: ",e.email]})]})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,v.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:H.invoiceNumber}),(0,v.jsx)(C,{status:H.status,style:{marginTop:"8px"},children:ge(H.status)})]})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,v.jsxs)("div",{style:{flex:1},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,v.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:(null===t||void 0===t?void 0:t.name)||(null===oe||void 0===oe?void 0:oe.companyName)||"Your Company"}),((null===t||void 0===t?void 0:t.address)||(null===oe||void 0===oe?void 0:oe.address))&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:(null===t||void 0===t?void 0:t.address)||(null===oe||void 0===oe?void 0:oe.address)}),((null===t||void 0===t?void 0:t.city)||(null===t||void 0===t?void 0:t.state)||(null===t||void 0===t?void 0:t.postalCode)||(null===oe||void 0===oe?void 0:oe.city))&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:[(null===t||void 0===t?void 0:t.city)||(null===oe||void 0===oe?void 0:oe.city),(null===t||void 0===t?void 0:t.state)||(null===oe||void 0===oe?void 0:oe.state),(null===t||void 0===t?void 0:t.postalCode)||(null===oe||void 0===oe?void 0:oe.postalCode)].filter(Boolean).join(", ")}),((null===t||void 0===t?void 0:t.country)||(null===oe||void 0===oe?void 0:oe.country))&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:(null===t||void 0===t?void 0:t.country)||(null===oe||void 0===oe?void 0:oe.country)}),((null===t||void 0===t?void 0:t.email)||(null===oe||void 0===oe?void 0:oe.email))&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:(null===t||void 0===t?void 0:t.email)||(null===oe||void 0===oe?void 0:oe.email)})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:H.billingPeriod||"-"})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:he(H.issueDate)})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:he(H.dueDate)})]}),H.paidDate&&(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:he(H.paidDate)})]})]})]}),(0,v.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,v.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,v.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,v.jsx)("tbody",{children:H.items&&H.items.length>0?H.items.map((e,t)=>(0,v.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(e.unitPrice,H.currency||"MYR")}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(e.total,H.currency||"MYR")})]},t)):(0,v.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:H.categoryDisplayName||H.planType||"Service"}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:"1"}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(H.amount,H.currency||"MYR")}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(H.amount,H.currency||"MYR")})]})})]})]}),(0,v.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,v.jsxs)("div",{style:{width:"280px"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#6B7280"},children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:(0,r.vv)(H.subtotalBeforeDiscount||H.amount,H.currency||"MYR")})]}),H.discountType&&"none"!==H.discountType&&H.discountAmount>0&&(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#15803D"},children:[(0,v.jsxs)("span",{children:["Discount","percentage"===H.discountType?` (${H.discountValue}%)`:"",":"]}),(0,v.jsxs)("span",{children:["-",(0,r.vv)(H.discountAmount,H.currency||"MYR")]})]}),H.tax>0&&(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#6B7280"},children:[(0,v.jsx)("span",{children:"Tax:"}),(0,v.jsx)("span",{children:(0,r.vv)(H.tax,H.currency||"MYR")})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"16px",fontWeight:"700",color:"#0A2540",background:"#F8FAFC",borderRadius:"6px",marginTop:"8px"},children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,r.vv)(H.total,H.currency||"MYR")})]})]})}),(null===e||void 0===e?void 0:e.bankName)&&(0,v.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Bank:"})," ",e.bankName]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Name:"})," ",e.bankAccountName||"-"]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Number:"})," ",e.bankAccount||"-"]}),e.swiftCode&&(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"SWIFT Code:"})," ",e.swiftCode]})]})]}),((null===e||void 0===e?void 0:e.taxId)||(null===e||void 0===e?void 0:e.businessRegistration))&&(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===e||void 0===e?void 0:e.businessRegistration)&&(0,v.jsxs)("span",{children:["Reg No: ",e.businessRegistration]}),(null===e||void 0===e?void 0:e.businessRegistration)&&(null===e||void 0===e?void 0:e.taxId)&&(0,v.jsx)("span",{children:" | "}),(null===e||void 0===e?void 0:e.taxId)&&(0,v.jsxs)("span",{children:["Tax No: ",e.taxId]})]})]}),(0,v.jsxs)(p.jl,{children:[("pending_payment"===H.status||"overdue"===H.status)&&H.total>0&&(0,v.jsx)(k,{variant:"success",onClick:()=>{L(!1),je(H)},children:"Pay Now"}),(0,v.jsx)(k,{onClick:()=>Ae(H),children:"Download PDF"}),(0,v.jsx)(k,{onClick:()=>Fe(H),children:"Print"}),(0,v.jsx)(k,{variant:"secondary",onClick:()=>L(!1),children:"Close"})]})]})})})(),q&&H&&(0,v.jsx)(p.mH,{onClick:()=>Q(!1),children:(0,v.jsxs)(p.$m,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,v.jsxs)(p.rQ,{children:[(0,v.jsx)(p.wt,{children:"Submit Payment"}),(0,v.jsx)(p.Jn,{onClick:()=>Q(!1),children:"\xd7"})]}),(0,v.jsxs)(p.cw,{children:[(0,v.jsxs)("div",{style:{marginBottom:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,v.jsxs)("p",{style:{margin:"0 0 8px 0",fontSize:"14px",color:"#6B7280"},children:["Invoice: ",(0,v.jsx)("strong",{children:H.invoiceNumber})]}),(0,v.jsx)("p",{style:{margin:"0",fontSize:"20px",fontWeight:"700",color:"#0A2540"},children:(0,r.vv)(H.total,H.currency)})]}),G?(0,v.jsx)("div",{style:{textAlign:"center",padding:"20px",color:"#6B7280"},children:"Loading payment methods..."}):0===J.length?(0,v.jsxs)("div",{style:{padding:"20px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,v.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#92400E",fontSize:"15px"},children:"Payment Not Available"}),(0,v.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:[(0,v.jsx)("strong",{children:H.issuerName||("brand"===H.issuerType?"Brand":"foodcourt"===H.issuerType?"Foodcourt":"System Admin")})," has not configured payment methods for ",(0,v.jsx)("strong",{children:H.currency||"MYR"})," yet. Please contact the invoice issuer to set up payment options."]})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(p.gE,{children:[(0,v.jsx)(p.lR,{children:"Payment Method *"}),(0,v.jsx)(p.FX,{value:X.paymentMethod,onChange:e=>K(t=>({...t,paymentMethod:e.target.value})),children:J.map(e=>(0,v.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(()=>{const e=J.find(e=>e.id===X.paymentMethod);return e?(0,v.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px"},children:["bank_transfer"===e.id&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:"Bank Transfer Details"}),(0,v.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,v.jsxs)("p",{style:{margin:"0"},children:[(0,v.jsx)("strong",{children:"Bank:"})," ",e.bankName]}),(0,v.jsxs)("p",{style:{margin:"0"},children:[(0,v.jsx)("strong",{children:"Account Number:"})," ",e.accountNumber]}),(0,v.jsxs)("p",{style:{margin:"0"},children:[(0,v.jsx)("strong",{children:"Account Name:"})," ",e.accountName]})]})]}),"qr_payment"===e.id&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:"QR Payment"}),e.qrImage&&(0,v.jsx)("div",{style:{textAlign:"center",marginBottom:"12px"},children:(0,v.jsx)("img",{src:e.qrImage,alt:"Payment QR Code",style:{maxWidth:"200px",maxHeight:"200px",border:"1px solid #E5E7EB",borderRadius:"8px"}})}),e.qrDescription&&(0,v.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#6B7280",textAlign:"center"},children:e.qrDescription})]}),"stripe"===e.id&&(0,v.jsx)("p",{style:{margin:0,fontSize:"14px",color:"#1E40AF"},children:"Pay securely with your credit/debit card via Stripe."}),"paypal"===e.id&&(0,v.jsx)("p",{style:{margin:0,fontSize:"14px",color:"#1E40AF"},children:"Pay with your PayPal account or card."})]}):null})()]}),J.length>0&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px",fontSize:"13px",color:"#92400E",display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,v.jsx)("span",{style:{fontWeight:"600",flexShrink:0},children:"*"}),(0,v.jsxs)("span",{children:["Please provide either a ",(0,v.jsx)("strong",{children:"Transaction ID / Reference Number"})," or upload a ",(0,v.jsx)("strong",{children:"Payment Receipt Image"})," to submit your payment."]})]}),(0,v.jsxs)(p.gE,{children:[(0,v.jsx)(p.lR,{children:"Transaction ID / Reference Number"}),(0,v.jsx)(p.ZQ,{type:"text",placeholder:"Enter transaction ID or reference number",value:X.transactionId,onChange:e=>K(t=>({...t,transactionId:e.target.value}))})]}),(()=>{const e=J.find(e=>e.id===X.paymentMethod);return!e||"bank_transfer"!==e.id&&"qr_payment"!==e.id?null:(0,v.jsxs)(p.gE,{children:[(0,v.jsx)(p.lR,{children:"Payment Receipt Image"}),(0,v.jsxs)("div",{style:{border:"2px dashed #E6EBF1",borderRadius:"8px",padding:"20px",textAlign:"center",cursor:"pointer",transition:"border-color 0.2s"},children:[X.receiptImage?(0,v.jsxs)("div",{children:[(0,v.jsx)("img",{src:X.receiptImage,alt:"Receipt",style:{maxWidth:"200px",maxHeight:"200px",marginBottom:"8px",borderRadius:"8px"}}),(0,v.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:"Click to change image"})]}):(0,v.jsxs)("div",{children:[(0,v.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"#9CA3AF",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",style:{margin:"0 auto 8px"},children:[(0,v.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),(0,v.jsx)("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),(0,v.jsx)("polyline",{points:"21,15 16,10 5,21"})]}),(0,v.jsx)("p",{style:{margin:"0",fontSize:"14px",color:"#6B7280"},children:"Click to upload receipt image"}),(0,v.jsx)("p",{style:{margin:"4px 0 0 0",fontSize:"12px",color:"#9CA3AF"},children:"Max 5MB, JPG/PNG"})]}),(0,v.jsx)("input",{type:"file",accept:"image/*",onChange:we,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0,cursor:"pointer"}})]})]})})()]}),ne&&(0,v.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",borderRadius:"6px",marginTop:"16px"},children:(0,v.jsx)("p",{style:{margin:0,color:"#DC2626",fontSize:"13px"},children:ne})})]}),(0,v.jsxs)(p.jl,{children:[(0,v.jsx)(k,{variant:"secondary",onClick:()=>Q(!1),children:"Cancel"}),(0,v.jsx)(k,{variant:"success",onClick:async()=>{if(H)if(X.transactionId||X.receiptImage){te(!0),ie("");try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${H.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:X.paymentMethod,transaction_id:X.transactionId,receipt_url:X.receiptImage||null})});if(t.ok)Q(!1),K({paymentMethod:"",transactionId:"",receiptImage:""}),await xe(),await ue();else{const e=await t.json();ie(e.error||e.message||"Failed to submit payment")}}catch(e){console.error("Error submitting payment:",e),ie("Network error. Please check your connection and try again.")}finally{te(!1)}}else ie("Please provide either a Transaction ID or upload a Receipt Image")},disabled:ee||0===J.length,children:ee?"Submitting...":"Submit Payment"})]})]})})]})})})}}]);