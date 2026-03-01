"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6529],{2488:(e,t,n)=>{n.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});n(9950);var i=n(4752),o=n(4414);const a=i.Ay.div`
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
`,l=e=>{let{children:t,className:n,style:i,...r}=e;return(0,o.jsx)(a,{className:n,style:i,...r,children:t})},d=e=>{let{placeholder:t="Search...",...n}=e;return(0,o.jsx)(r,{placeholder:t,...n})},c=e=>{let{children:t,...n}=e;return(0,o.jsx)(s,{...n,children:t})}},2597:(e,t,n)=>{n.d(t,{Ex:()=>c,oz:()=>d,tU:()=>l});n(9950);var i=n(4752),o=n(4414);const a=i.Ay.div`
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
`,r=i.Ay.button`
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
`,s=i.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:n,style:i}=e;return(0,o.jsx)(a,{className:n,style:i,children:t})},d=e=>{let{active:t,onClick:n,children:i,className:a}=e;return(0,o.jsx)(r,{active:t,onClick:n,className:a,children:i})},c=e=>{let{count:t,variant:n="default",showZero:i=!1}=e;return 0!==t||i?(0,o.jsx)(s,{variant:n,children:t}):null}},6529:(e,t,n)=>{n.r(t),n.d(t,{default:()=>W});var i=n(9950),o=n(4752),a=n(4492),r=n(6038),s=n(9018),l=n(1367),d=n(4728),c=n(6649),p=n(2488),x=n(2597),u=n(5612),h=n(1052),g=n.n(h),m=n(4414);const v=o.Ay.div`
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
`,y=o.Ay.div`
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
`,f=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,b=o.Ay.button`
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
`,j=o.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #0A2540;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,w=(0,o.Ay)(d.SC)``,A=o.Ay.div``,F=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,k=o.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,C=(0,o.Ay)(d.Wh)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`,S=o.Ay.button`
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

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    padding: 6px 12px;\n\n    &:hover {\n      background: #4B45C6;\n    }\n  ":"success"===e.variant?"\n    background: #10B981;\n    color: white;\n    border-color: #10B981;\n    padding: 6px 12px;\n\n    &:hover {\n      background: #059669;\n    }\n  ":"danger"===e.variant?"\n    background: #EF4444;\n    color: white;\n    border-color: #EF4444;\n    padding: 6px 12px;\n\n    &:hover {\n      background: #DC2626;\n    }\n  ":"email"===e.variant?"\n    background: white;\n    color: #3B82F6;\n    border-color: #3B82F6;\n\n    &:hover {\n      background: #EFF6FF;\n    }\n  ":"\n    background: white;\n    color: #374151;\n    border-color: #D1D5DB;\n\n    &:hover {\n      background: #F9FAFB;\n      border-color: #9CA3AF;\n    }\n  "}
`,z=o.Ay.div`
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
  padding: 20px;
`,E=o.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,D=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
`,$=o.Ay.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,I=o.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #0A2540;
  }
`,_=o.Ay.div`
  padding: 24px;
`,N=o.Ay.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
  border-radius: 0 0 12px 12px;
`,T=(o.Ay.div`
  background: white;
  padding: 40px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`,o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #E6EBF1;
`,o.Ay.img`
  max-width: 180px;
  max-height: 60px;
  object-fit: contain;
`,o.Ay.h1`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  text-align: right;
`,o.Ay.div`
  text-align: right;
  margin-top: 8px;
`,o.Ay.p`
  margin: 4px 0;
  font-size: 13px;
  color: #6B7280;
`,o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
`,o.Ay.div``,o.Ay.h3`
  font-size: 11px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`,o.Ay.p`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,o.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 2px 0;
`,o.Ay.table`
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
    border-bottom: 1px solid #E6EBF1;
  }

  th:last-child,
  td:last-child {
    text-align: right;
  }

  td {
    padding: 16px;
    font-size: 14px;
    color: #0A2540;
    border-bottom: 1px solid #E6EBF1;
  }
`,o.Ay.div`
  display: flex;
  justify-content: flex-end;
`,o.Ay.div`
  width: 280px;
`,o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,o.Ay.span`
  font-size: ${e=>e.highlight?"16px":"14px"};
  color: ${e=>e.highlight?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.highlight?"600":"400"};
`,o.Ay.span`
  font-size: ${e=>e.highlight?"20px":"14px"};
  font-weight: ${e=>e.highlight?"700":"500"};
  color: #0A2540;
`,o.Ay.div`
  margin-bottom: 16px;
`),P=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`,R=o.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,M=o.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,W=()=>{const{operationSettings:e}=(0,s.Pj)(),{user:t}=(0,l.As)(),{restaurantId:n}=(0,a.g)(),[o,d]=(0,a.ok)(),h=n?parseInt(n):null===t||void 0===t?void 0:t.restaurant_id,[W,Y]=(0,i.useState)([]),[U,L]=(0,i.useState)([]),[O,H]=(0,i.useState)(""),[q,Q]=(0,i.useState)("all"),[G,J]=(0,i.useState)(!1),[V,Z]=(0,i.useState)(()=>{const e=new Date;return{start:"2000-01-01",end:(t=e,`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`)};var t}),[K,X]=(0,i.useState)(!1),[ee,te]=(0,i.useState)(null),[ne,ie]=(0,i.useState)(!1),[oe,ae]=(0,i.useState)([]),[re,se]=(0,i.useState)(!1),[le,de]=(0,i.useState)({paymentMethod:"",transactionId:"",receiptImage:""}),[ce,pe]=(0,i.useState)(!1),[xe,ue]=(0,i.useState)(""),[he,ge]=(0,i.useState)(null),[me,ve]=(0,i.useState)({}),ye=o.get("tab")||"all",fe=e=>{d({tab:e})},be=e=>{Q(e),J(!1);const t=new Date;let n=new Date,i=new Date;const o=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"week":n.setDate(t.getDate()-t.getDay());break;case"month":n=new Date(t.getFullYear(),t.getMonth(),1),i=new Date(t.getFullYear(),t.getMonth()+1,0);break;case"year":n=new Date(t.getFullYear(),0,1),i=new Date(t.getFullYear(),11,31);break;case"all":n=new Date(2e3,0,1)}Z({start:o(n),end:o(i)})},je=(e,t)=>{J(!0),Z(n=>({...n,[e]:t}))},we=async()=>{try{const e=localStorage.getItem("auth_token"),n=h||(null===t||void 0===t?void 0:t.restaurant_id);if(!e||!n)return;const i=await fetch(`/api/invoices/restaurant/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){const e=await i.json(),t=(e.data||e||[]).map(e=>{var t,n;return{id:(null===(t=e.id)||void 0===t?void 0:t.toString())||"",invoiceNumber:e.invoice_number||"",issueDate:e.issued_at||e.issue_date||"",dueDate:e.due_date||"",paidDate:e.paid_at||e.paid_date||"",status:e.status||"",currency:e.currency||"MYR",amount:parseFloat(e.subtotal||e.amount||0),tax:parseFloat(e.tax_amount||e.tax||0),total:parseFloat(e.total_amount||e.total||0),items:e.items||[],billingPeriod:e.billing_period_start&&e.billing_period_end?`${Fe(e.billing_period_start)} - ${Fe(e.billing_period_end)}`:"",planType:e.category_display_name||e.plan_type||"Service",paymentMethod:e.payment_method||"",transactionId:e.transaction_id||"",receiptUrl:e.receipt_url||"",hasPaymentInfo:!!e.transaction_id||!!e.receipt_url,type:e.type||"manual",payerType:e.payer_type||"restaurant",payerId:(null===(n=e.payer_id)||void 0===n?void 0:n.toString())||"",invoiceCategory:e.invoice_category||"",categoryDisplayName:e.category_display_name||"",issuerType:e.issuer_type||e.issuerType||"system_admin",issuerId:e.issuer_id||e.issuerId||null,issuerName:e.issuer_name||e.issuerName||"",issuerInfo:e.issuerInfo||e.issuer_info||null,payerInfo:e.payerInfo||e.payer_info||null}});Y(t)}}catch(e){console.error("Error fetching all invoices:",e)}},Ae=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void L([]);const t=await fetch("/api/invoices/to-pay",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();L(e)}else L([])}catch(e){console.error("Error fetching invoices to pay:",e),L([])}};(0,i.useEffect)(()=>{we(),Ae(),(async()=>{if(h)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${h}/company-info`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();e.success&&e.data&&ge({companyName:e.data.company_name||"",address:e.data.address||"",city:e.data.city||"",state:e.data.state||"",postalCode:e.data.postal_code||"",country:e.data.country||"",phone:e.data.phone||"",email:e.data.email||"",website:e.data.website||"",taxNumber:e.data.tax_number||"",registrationNumber:e.data.registration_number||"",companyLogo:e.data.logo_url||"",bankName:e.data.bank_name||"",bankAccount:e.data.bank_account||"",bankAccountName:e.data.bank_account_name||"",swiftCode:e.data.swift_code||""})}}catch(e){console.error("Error fetching company settings:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const t=await e.json();t.success&&t.currencies&&ve(t.currencies)}}catch(e){console.error("Error fetching currency config:",e)}})()},[h,null===t||void 0===t?void 0:t.restaurant_id]);const Fe=e=>{if(!e)return"-";return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})},Be=e=>(e=>{if("pending_payment"!==e.status)return!1;const t=new Date;return new Date(e.dueDate)<t})(e)?"overdue":e.status,ke=e=>({draft:"Draft",pending_payment:"Pending",payment_submitted:"Confirming",paid:"Paid",overdue:"Overdue",cancelled:"Cancelled"}[e]||e),Ce=e=>e.filter(e=>{var t,n,i,o;const a=O.toLowerCase(),r=!O||(null===(t=e.invoiceNumber)||void 0===t?void 0:t.toLowerCase().includes(a))||(null===(n=e.issuerName)||void 0===n?void 0:n.toLowerCase().includes(a))||(null===(i=e.status)||void 0===i?void 0:i.toLowerCase().includes(a))||(null===(o=e.categoryDisplayName)||void 0===o?void 0:o.toLowerCase().includes(a)),s=new Date(e.issueDate),l=new Date(V.start),d=new Date(V.end);d.setHours(23,59,59,999);return r&&(s>=l&&s<=d)}),Se=Ce(W),ze=Ce(U),Ee={total:W.length,pending:W.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length,confirming:W.filter(e=>"payment_submitted"===e.status).length,paid:W.filter(e=>"paid"===e.status).length,totalAmount:W.reduce((e,t)=>e+(t.total||0),0),pendingAmount:W.filter(e=>"pending_payment"===e.status||"overdue"===e.status).reduce((e,t)=>e+(t.total||0),0)},De=async e=>{te(e),ue(""),de({paymentMethod:"",transactionId:"",receiptImage:""}),await(async(e,t,n)=>{se(!0);try{let i=`/api/admin/payment-settings/available/${e}`;"brand"===t&&n?i=`/api/brands/${n}/payment-settings/available/${e}`:"foodcourt"===t&&n&&(i=`/api/foodcourts/${n}/payment-settings/available/${e}`);const o=await fetch(i);if(o.ok){const e=await o.json();ae(e.methods||[]),e.methods&&e.methods.length>0&&de(t=>({...t,paymentMethod:e.methods[0].id}))}}catch(i){console.error("Error fetching payment methods:",i)}finally{se(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId),ie(!0)},$e=async e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(!n)return;if(n.size>5242880)return void ue("Image size must be less than 5MB");const i=new FileReader;i.onload=()=>{de(e=>({...e,receiptImage:i.result}))},i.readAsDataURL(n)},Ie=e=>{const t=e.issuerInfo,n=e.payerInfo||(he?{name:he.companyName,address:he.address,city:he.city,state:he.state,postalCode:he.postalCode,country:he.country,phone:he.phone,email:he.email,taxId:he.taxNumber,businessRegistration:he.registrationNumber}:null);return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${null!==t&&void 0!==t&&t.logoUrl?`<img src="${t.logoUrl}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name" style="${null!==t&&void 0!==t&&t.logoUrl?"font-size: 14px;":""}">${(null===t||void 0===t?void 0:t.name)||e.issuerName||"Issuer"}</div>\n                <div class="company-details">\n                    ${null!==t&&void 0!==t&&t.address?`${t.address}<br>`:""}\n                    ${[null===t||void 0===t?void 0:t.city,null===t||void 0===t?void 0:t.state,null===t||void 0===t?void 0:t.postalCode].filter(Boolean).join(", ")}${null!==t&&void 0!==t&&t.city||null!==t&&void 0!==t&&t.state||null!==t&&void 0!==t&&t.postalCode?"<br>":""}\n                    ${null!==t&&void 0!==t&&t.country?`${t.country}<br>`:""}\n                    ${null!==t&&void 0!==t&&t.phone?`Tel: ${t.phone}<br>`:""}\n                    ${null!==t&&void 0!==t&&t.email?`Email: ${t.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${(null===n||void 0===n?void 0:n.name)||(null===he||void 0===he?void 0:he.companyName)||"Your Company"}</div>\n                ${null!==n&&void 0!==n&&n.address||null!==he&&void 0!==he&&he.address?`<div class="customer-details">${(null===n||void 0===n?void 0:n.address)||(null===he||void 0===he?void 0:he.address)}</div>`:""}\n                ${[(null===n||void 0===n?void 0:n.city)||(null===he||void 0===he?void 0:he.city),(null===n||void 0===n?void 0:n.state)||(null===he||void 0===he?void 0:he.state),(null===n||void 0===n?void 0:n.postalCode)||(null===he||void 0===he?void 0:he.postalCode)].filter(Boolean).length>0?`<div class="customer-details">${[(null===n||void 0===n?void 0:n.city)||(null===he||void 0===he?void 0:he.city),(null===n||void 0===n?void 0:n.state)||(null===he||void 0===he?void 0:he.state),(null===n||void 0===n?void 0:n.postalCode)||(null===he||void 0===he?void 0:he.postalCode)].filter(Boolean).join(", ")}</div>`:""}\n                ${null!==n&&void 0!==n&&n.country||null!==he&&void 0!==he&&he.country?`<div class="customer-details">${(null===n||void 0===n?void 0:n.country)||(null===he||void 0===he?void 0:he.country)}</div>`:""}\n                ${null!==n&&void 0!==n&&n.email||null!==he&&void 0!==he&&he.email?`<div class="customer-details">${(null===n||void 0===n?void 0:n.email)||(null===he||void 0===he?void 0:he.email)}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${Fe(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${Fe(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${Fe(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items&&e.items.length>0?e.items.map(t=>`\n                    <tr>\n                        <td>${t.description}</td>\n                        <td class="text-center">${t.quantity}</td>\n                        <td class="text-right">${(0,r.vv)(t.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,r.vv)(t.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join(""):`\n                    <tr>\n                        <td>${e.categoryDisplayName||e.planType||"Service"}</td>\n                        <td class="text-center">1</td>\n                        <td class="text-right">${(0,r.vv)(e.amount,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,r.vv)(e.amount,e.currency||"MYR")}</td>\n                    </tr>\n                    `}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,r.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${(e.additionalCharges||[]).map(t=>`\n                <div class="summary-row tax">\n                    <span>${t.name} (${t.rate}%):</span>\n                    <span>${(0,r.vv)(t.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${0===e.total?'<span style="color: #10B981; font-weight: 600;">Free</span>':(0,r.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${null!==t&&void 0!==t&&t.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${t.bankName}<br>\n                <strong>Account Name:</strong> ${t.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${t.bankAccount||"-"}\n                ${t.swiftCode?`<br><strong>SWIFT Code:</strong> ${t.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${null!==t&&void 0!==t&&t.taxId||null!==t&&void 0!==t&&t.businessRegistration?`\n        <div class="registration-info">\n            ${t.businessRegistration?`Reg No: ${t.businessRegistration}`:""}\n            ${t.businessRegistration&&t.taxId?" | ":""}\n            ${t.taxId?`Tax No: ${t.taxId}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},_e=async e=>{try{var t;const n=Ie(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const o=i.contentDocument||(null===(t=i.contentWindow)||void 0===t?void 0:t.document);if(!o)throw document.body.removeChild(i),new Error("Could not access iframe document");o.open(),o.write(n),o.close(),await new Promise(async e=>{try{var t;null!==(t=o.fonts)&&void 0!==t&&t.ready&&await o.fonts.ready}catch{}const n=o.querySelectorAll("img");await Promise.all(Array.from(n).map(e=>e.complete?Promise.resolve():new Promise(t=>{e.onload=t,e.onerror=t}))),setTimeout(e,100)});const a=await g()(o.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const r=a.toDataURL("image/png"),s=new u.Ay({orientation:"portrait",unit:"mm",format:"a4"}),l=210,d=a.height*l/a.width;s.addImage(r,"PNG",0,0,l,d),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(n){console.error("Error generating PDF:",n)}},Ne=e=>{const t=Ie(e),n=window.open("","_blank","width=800,height=600");n&&(n.document.write(t),n.document.close(),setTimeout(()=>{n.print()},250))},Te=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,m.jsx)(c.an,{children:(0,m.jsxs)(c.bQ,{children:[(0,m.jsx)(c.B_,{children:(0,m.jsxs)("tr",{children:[(0,m.jsx)(c.gU,{children:"Invoice"}),(0,m.jsx)(c.gU,{children:"Issuer"}),(0,m.jsx)(c.gU,{align:"center",children:"Period"}),(0,m.jsx)(c.gU,{align:"center",children:"Issued"}),(0,m.jsx)(c.gU,{align:"center",children:"Due"}),(0,m.jsx)(c.gU,{align:"center",children:"Status"}),(0,m.jsx)(c.gU,{align:"right",children:"Amount"}),(0,m.jsx)(c.gU,{align:"right",children:"Total"}),(0,m.jsx)(c.gU,{align:"center",children:"Actions"})]})}),(0,m.jsx)("tbody",{children:e.length>0?e.map(e=>(0,m.jsxs)(c.J2,{children:[(0,m.jsx)(c.Bv,{"data-label":"Invoice",children:(0,m.jsxs)(A,{children:[(0,m.jsxs)(F,{children:[e.invoiceNumber,"automatic"===e.type&&(0,m.jsx)(k,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,m.jsx)(B,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,m.jsx)(c.Bv,{"data-label":"Issuer",children:(0,m.jsx)(A,{children:(0,m.jsx)(F,{children:e.issuerName||("system_admin"===e.issuerType?"System Admin":"brand"===e.issuerType?"Brand":"Foodcourt")})})}),(0,m.jsx)(c.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,m.jsx)(c.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:Fe(e.issueDate)}),(0,m.jsx)(c.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:Fe(e.dueDate)}),(0,m.jsx)(c.Bv,{"data-label":"Status",align:"center",children:(0,m.jsx)(C,{status:Be(e),children:ke(Be(e))})}),(0,m.jsx)(c.Bv,{"data-label":"Amount",align:"right",children:(0,m.jsx)(c.DM,{children:(0,r.vv)(e.amount,e.currency||"MYR")})}),(0,m.jsx)(c.Bv,{"data-label":"Total",align:"right",children:(0,m.jsx)(c.DM,{highlight:!0,children:0===e.total?(0,m.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,r.vv)(e.total,e.currency||"MYR")})}),(0,m.jsx)(c.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,m.jsxs)(c.wr,{children:[(0,m.jsx)(S,{variant:"primary",onClick:()=>(e=>{te(e),X(!0)})(e),children:"View"}),t&&("pending_payment"===e.status||"overdue"===e.status)&&e.total>0&&(0,m.jsx)(S,{variant:"success",onClick:()=>De(e),children:"Pay"}),(0,m.jsx)(S,{onClick:()=>_e(e),title:"Download PDF",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,m.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,m.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,m.jsx)(S,{onClick:()=>Ne(e),title:"Print Invoice",children:(0,m.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,m.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,m.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,m.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})})]},e.id)):(0,m.jsx)(c.J2,{children:(0,m.jsx)(c.Bv,{colSpan:9,children:(0,m.jsx)(c.ys,{children:"No invoices found"})})})})]})})};return(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(c.mc,{children:[(0,m.jsx)(c.Y9,{children:(0,m.jsx)(c.hE,{children:"Invoices"})}),(0,m.jsxs)(c.UC,{children:[(0,m.jsxs)(c.MD,{children:[(0,m.jsxs)(c.hI,{children:[(0,m.jsx)(c.Os,{children:Ee.total}),(0,m.jsx)(c.v0,{children:"Total Invoices"})]}),(0,m.jsxs)(c.hI,{color:"#F59E0B",children:[(0,m.jsx)(c.Os,{children:Ee.pending}),(0,m.jsx)(c.v0,{children:"To Pay"}),(0,m.jsx)(c.d1,{children:(0,r.vv)(Ee.pendingAmount,(null===e||void 0===e?void 0:e.currency)||"MYR")})]}),(0,m.jsxs)(c.hI,{color:"#3B82F6",children:[(0,m.jsx)(c.Os,{children:Ee.confirming}),(0,m.jsx)(c.v0,{children:"Confirming"})]}),(0,m.jsxs)(c.hI,{color:"#10B981",children:[(0,m.jsx)(c.Os,{children:Ee.paid}),(0,m.jsx)(c.v0,{children:"Paid"})]})]}),(0,m.jsxs)(x.tU,{children:[(0,m.jsxs)(x.oz,{active:"all"===ye,onClick:()=>fe("all"),children:["All Invoices",(0,m.jsx)(x.Ex,{count:W.length})]}),(0,m.jsxs)(x.oz,{active:"to_pay"===ye,onClick:()=>fe("to_pay"),children:["Invoices to Pay",(0,m.jsx)(x.Ex,{count:U.filter(e=>"pending_payment"===e.status||"overdue"===e.status||"payment_submitted"===e.status).length,variant:"warning"})]})]}),(0,m.jsx)(v,{children:(0,m.jsxs)(y,{children:[(0,m.jsx)(p.DO,{placeholder:"Search invoice, issuer, status...",value:O,onChange:e=>H(e.target.value)}),(0,m.jsxs)(f,{children:[(0,m.jsx)(b,{active:"week"===q&&!G,onClick:()=>be("week"),children:"Week"}),(0,m.jsx)(b,{active:"month"===q&&!G,onClick:()=>be("month"),children:"Month"}),(0,m.jsx)(b,{active:"year"===q&&!G,onClick:()=>be("year"),children:"Year"}),(0,m.jsx)(b,{active:"all"===q&&!G,onClick:()=>be("all"),children:"All"}),(0,m.jsx)(j,{type:"date",value:V.start,onChange:e=>je("start",e.target.value)}),(0,m.jsx)(j,{type:"date",value:V.end,onChange:e=>je("end",e.target.value)})]})]})}),"all"===ye&&Te(Se,!0),"to_pay"===ye&&Te(ze,!0)]}),K&&ee&&(()=>{const e=ee.issuerInfo,t=ee.payerInfo||(he?{name:he.companyName,address:he.address,city:he.city,state:he.state,postalCode:he.postalCode,country:he.country,phone:he.phone,email:he.email,taxId:he.taxNumber,businessRegistration:he.registrationNumber}:null);return(0,m.jsx)(z,{onClick:()=>X(!1),children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,m.jsxs)(D,{children:[(0,m.jsx)($,{children:"Invoice Details"}),(0,m.jsx)(I,{onClick:()=>X(!1),children:"\xd7"})]}),(0,m.jsxs)(_,{children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,m.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===e||void 0===e?void 0:e.logoUrl)&&(0,m.jsx)("img",{src:e.logoUrl,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,m.jsx)("div",{style:{fontSize:null!==e&&void 0!==e&&e.logoUrl?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===e||void 0===e?void 0:e.name)||ee.issuerName||"Issuer"}),(0,m.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===e||void 0===e?void 0:e.address)&&(0,m.jsx)("div",{children:e.address}),((null===e||void 0===e?void 0:e.city)||(null===e||void 0===e?void 0:e.state)||(null===e||void 0===e?void 0:e.postalCode))&&(0,m.jsx)("div",{children:[null===e||void 0===e?void 0:e.city,null===e||void 0===e?void 0:e.state,null===e||void 0===e?void 0:e.postalCode].filter(Boolean).join(", ")}),(null===e||void 0===e?void 0:e.country)&&(0,m.jsx)("div",{children:e.country}),(null===e||void 0===e?void 0:e.phone)&&(0,m.jsxs)("div",{children:["Tel: ",e.phone]}),(null===e||void 0===e?void 0:e.email)&&(0,m.jsxs)("div",{children:["Email: ",e.email]})]})]}),(0,m.jsxs)("div",{style:{textAlign:"right"},children:[(0,m.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,m.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:ee.invoiceNumber}),(0,m.jsx)(C,{status:ee.status,style:{marginTop:"8px"},children:ke(ee.status)})]})]}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,m.jsxs)("div",{style:{flex:1},children:[(0,m.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,m.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:(null===t||void 0===t?void 0:t.name)||(null===he||void 0===he?void 0:he.companyName)||"Your Company"}),((null===t||void 0===t?void 0:t.address)||(null===he||void 0===he?void 0:he.address))&&(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:(null===t||void 0===t?void 0:t.address)||(null===he||void 0===he?void 0:he.address)}),((null===t||void 0===t?void 0:t.city)||(null===t||void 0===t?void 0:t.state)||(null===t||void 0===t?void 0:t.postalCode)||(null===he||void 0===he?void 0:he.city))&&(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:[(null===t||void 0===t?void 0:t.city)||(null===he||void 0===he?void 0:he.city),(null===t||void 0===t?void 0:t.state)||(null===he||void 0===he?void 0:he.state),(null===t||void 0===t?void 0:t.postalCode)||(null===he||void 0===he?void 0:he.postalCode)].filter(Boolean).join(", ")}),((null===t||void 0===t?void 0:t.country)||(null===he||void 0===he?void 0:he.country))&&(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:(null===t||void 0===t?void 0:t.country)||(null===he||void 0===he?void 0:he.country)}),((null===t||void 0===t?void 0:t.email)||(null===he||void 0===he?void 0:he.email))&&(0,m.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:(null===t||void 0===t?void 0:t.email)||(null===he||void 0===he?void 0:he.email)})]}),(0,m.jsxs)("div",{style:{textAlign:"right"},children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,m.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ee.billingPeriod||"-"})]}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,m.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Fe(ee.issueDate)})]}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,m.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Fe(ee.dueDate)})]}),ee.paidDate&&(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,m.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,m.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Fe(ee.paidDate)})]})]})]}),(0,m.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,m.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,m.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,m.jsx)("thead",{children:(0,m.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,m.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,m.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,m.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,m.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,m.jsx)("tbody",{children:ee.items&&ee.items.length>0?ee.items.map((e,t)=>(0,m.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,m.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,m.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,m.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(e.unitPrice,ee.currency||"MYR")}),(0,m.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(e.total,ee.currency||"MYR")})]},t)):(0,m.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,m.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:ee.categoryDisplayName||ee.planType||"Service"}),(0,m.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:"1"}),(0,m.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(ee.amount,ee.currency||"MYR")}),(0,m.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(ee.amount,ee.currency||"MYR")})]})})]})]}),(0,m.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,m.jsxs)("div",{style:{width:"280px"},children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#6B7280"},children:[(0,m.jsx)("span",{children:"Subtotal:"}),(0,m.jsx)("span",{children:(0,r.vv)(ee.subtotalBeforeDiscount||ee.amount,ee.currency||"MYR")})]}),ee.discountType&&"none"!==ee.discountType&&ee.discountAmount>0&&(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#15803D"},children:[(0,m.jsxs)("span",{children:["Discount","percentage"===ee.discountType?` (${ee.discountValue}%)`:"",":"]}),(0,m.jsxs)("span",{children:["-",(0,r.vv)(ee.discountAmount,ee.currency||"MYR")]})]}),ee.tax>0&&(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#6B7280"},children:[(0,m.jsx)("span",{children:"Tax:"}),(0,m.jsx)("span",{children:(0,r.vv)(ee.tax,ee.currency||"MYR")})]}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"16px",fontWeight:"700",color:"#0A2540",background:"#F8FAFC",borderRadius:"6px",marginTop:"8px"},children:[(0,m.jsx)("span",{children:"Total:"}),(0,m.jsx)("span",{children:(0,r.vv)(ee.total,ee.currency||"MYR")})]})]})}),(null===e||void 0===e?void 0:e.bankName)&&(0,m.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,m.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,m.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,m.jsxs)("div",{children:[(0,m.jsx)("strong",{children:"Bank:"})," ",e.bankName]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("strong",{children:"Account Name:"})," ",e.bankAccountName||"-"]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("strong",{children:"Account Number:"})," ",e.bankAccount||"-"]}),e.swiftCode&&(0,m.jsxs)("div",{children:[(0,m.jsx)("strong",{children:"SWIFT Code:"})," ",e.swiftCode]})]})]}),((null===e||void 0===e?void 0:e.taxId)||(null===e||void 0===e?void 0:e.businessRegistration))&&(0,m.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===e||void 0===e?void 0:e.businessRegistration)&&(0,m.jsxs)("span",{children:["Reg No: ",e.businessRegistration]}),(null===e||void 0===e?void 0:e.businessRegistration)&&(null===e||void 0===e?void 0:e.taxId)&&(0,m.jsx)("span",{children:" | "}),(null===e||void 0===e?void 0:e.taxId)&&(0,m.jsxs)("span",{children:["Tax No: ",e.taxId]})]})]}),(0,m.jsxs)(N,{children:[("pending_payment"===ee.status||"overdue"===ee.status)&&ee.total>0&&(0,m.jsx)(w,{variant:"success",onClick:()=>{X(!1),De(ee)},children:"Pay Now"}),(0,m.jsx)(w,{onClick:()=>_e(ee),children:"Download PDF"}),(0,m.jsx)(w,{onClick:()=>Ne(ee),children:"Print"}),(0,m.jsx)(w,{variant:"secondary",onClick:()=>X(!1),children:"Close"})]})]})})})(),ne&&ee&&(0,m.jsx)(z,{onClick:()=>ie(!1),children:(0,m.jsxs)(E,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,m.jsxs)(D,{children:[(0,m.jsx)($,{children:"Submit Payment"}),(0,m.jsx)(I,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,m.jsxs)(_,{children:[(0,m.jsxs)("div",{style:{marginBottom:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,m.jsxs)("p",{style:{margin:"0 0 8px 0",fontSize:"14px",color:"#6B7280"},children:["Invoice: ",(0,m.jsx)("strong",{children:ee.invoiceNumber})]}),(0,m.jsx)("p",{style:{margin:"0",fontSize:"20px",fontWeight:"700",color:"#0A2540"},children:(0,r.vv)(ee.total,ee.currency)})]}),re?(0,m.jsx)("div",{style:{textAlign:"center",padding:"20px",color:"#6B7280"},children:"Loading payment methods..."}):0===oe.length?(0,m.jsxs)("div",{style:{padding:"20px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,m.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#92400E",fontSize:"15px"},children:"Payment Not Available"}),(0,m.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:[(0,m.jsx)("strong",{children:ee.issuerName||("brand"===ee.issuerType?"Brand":"foodcourt"===ee.issuerType?"Foodcourt":"System Admin")})," has not configured payment methods for ",(0,m.jsx)("strong",{children:ee.currency||"MYR"})," yet. Please contact the invoice issuer to set up payment options."]})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:"Payment Method *"}),(0,m.jsx)(M,{value:le.paymentMethod,onChange:e=>de(t=>({...t,paymentMethod:e.target.value})),children:oe.map(e=>(0,m.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(()=>{const e=oe.find(e=>e.id===le.paymentMethod);return e?(0,m.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px"},children:["bank_transfer"===e.id&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:"Bank Transfer Details"}),(0,m.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,m.jsxs)("p",{style:{margin:"0"},children:[(0,m.jsx)("strong",{children:"Bank:"})," ",e.bankName]}),(0,m.jsxs)("p",{style:{margin:"0"},children:[(0,m.jsx)("strong",{children:"Account Number:"})," ",e.accountNumber]}),(0,m.jsxs)("p",{style:{margin:"0"},children:[(0,m.jsx)("strong",{children:"Account Name:"})," ",e.accountName]})]})]}),"qr_payment"===e.id&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:"QR Payment"}),e.qrImage&&(0,m.jsx)("div",{style:{textAlign:"center",marginBottom:"12px"},children:(0,m.jsx)("img",{src:e.qrImage,alt:"Payment QR Code",style:{maxWidth:"200px",maxHeight:"200px",border:"1px solid #E5E7EB",borderRadius:"8px"}})}),e.qrDescription&&(0,m.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#6B7280",textAlign:"center"},children:e.qrDescription})]}),"stripe"===e.id&&(0,m.jsx)("p",{style:{margin:0,fontSize:"14px",color:"#1E40AF"},children:"Pay securely with your credit/debit card via Stripe."}),"paypal"===e.id&&(0,m.jsx)("p",{style:{margin:0,fontSize:"14px",color:"#1E40AF"},children:"Pay with your PayPal account or card."})]}):null})()]}),oe.length>0&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px",fontSize:"13px",color:"#92400E",display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,m.jsx)("span",{style:{fontWeight:"600",flexShrink:0},children:"*"}),(0,m.jsxs)("span",{children:["Please provide either a ",(0,m.jsx)("strong",{children:"Transaction ID / Reference Number"})," or upload a ",(0,m.jsx)("strong",{children:"Payment Receipt Image"})," to submit your payment."]})]}),(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:"Transaction ID / Reference Number"}),(0,m.jsx)(R,{type:"text",placeholder:"Enter transaction ID or reference number",value:le.transactionId,onChange:e=>de(t=>({...t,transactionId:e.target.value}))})]}),(()=>{const e=oe.find(e=>e.id===le.paymentMethod);return!e||"bank_transfer"!==e.id&&"qr_payment"!==e.id?null:(0,m.jsxs)(T,{children:[(0,m.jsx)(P,{children:"Payment Receipt Image"}),(0,m.jsxs)("div",{style:{border:"2px dashed #E6EBF1",borderRadius:"8px",padding:"20px",textAlign:"center",cursor:"pointer",transition:"border-color 0.2s"},children:[le.receiptImage?(0,m.jsxs)("div",{children:[(0,m.jsx)("img",{src:le.receiptImage,alt:"Receipt",style:{maxWidth:"200px",maxHeight:"200px",marginBottom:"8px",borderRadius:"8px"}}),(0,m.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:"Click to change image"})]}):(0,m.jsxs)("div",{children:[(0,m.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"#9CA3AF",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",style:{margin:"0 auto 8px"},children:[(0,m.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),(0,m.jsx)("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),(0,m.jsx)("polyline",{points:"21,15 16,10 5,21"})]}),(0,m.jsx)("p",{style:{margin:"0",fontSize:"14px",color:"#6B7280"},children:"Click to upload receipt image"}),(0,m.jsx)("p",{style:{margin:"4px 0 0 0",fontSize:"12px",color:"#9CA3AF"},children:"Max 5MB, JPG/PNG"})]}),(0,m.jsx)("input",{type:"file",accept:"image/*",onChange:$e,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0,cursor:"pointer"}})]})]})})()]}),xe&&(0,m.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",borderRadius:"6px",marginTop:"16px"},children:(0,m.jsx)("p",{style:{margin:0,color:"#DC2626",fontSize:"13px"},children:xe})})]}),(0,m.jsxs)(N,{children:[(0,m.jsx)(w,{variant:"secondary",onClick:()=>ie(!1),children:"Cancel"}),(0,m.jsx)(w,{variant:"success",onClick:async()=>{if(ee)if(le.transactionId||le.receiptImage){pe(!0),ue("");try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${ee.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:le.paymentMethod,transaction_id:le.transactionId,receipt_url:le.receiptImage||null})});if(t.ok)ie(!1),de({paymentMethod:"",transactionId:"",receiptImage:""}),await we(),await Ae();else{const e=await t.json();ue(e.error||e.message||"Failed to submit payment")}}catch(e){console.error("Error submitting payment:",e),ue("Network error. Please check your connection and try again.")}finally{pe(!1)}}else ue("Please provide either a Transaction ID or upload a Receipt Image")},disabled:ce||0===oe.length,children:ce?"Submitting...":"Submit Payment"})]})]})})]})})}}}]);