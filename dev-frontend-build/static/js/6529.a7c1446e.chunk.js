"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6529],{2488:(e,t,n)=>{n.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});n(9950);var i=n(4752),o=n(4414);const a=i.Ay.div`
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
`,s=i.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

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
`,d=i.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,l=i.Ay.select`
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
`,c=e=>{let{children:t,className:n,style:i,...r}=e;return(0,o.jsx)(a,{className:n,style:i,...r,children:t})},p=e=>{let{placeholder:t="Search...",value:n,onChange:i,style:a,...l}=e;return(0,o.jsxs)(s,{style:a,children:[(0,o.jsx)(r,{placeholder:t,value:n,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:n?"36px":"16px"},...l}),n&&(0,o.jsx)(d,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,o.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,o.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,o.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...n}=e;return(0,o.jsx)(l,{...n,children:t})}},2597:(e,t,n)=>{n.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});n(9950);var i=n(4752),o=n(4414);const a=i.Ay.div`
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
`,d=e=>{let{children:t,className:n,style:i}=e;return(0,o.jsx)(a,{className:n,style:i,children:t})},l=e=>{let{active:t,onClick:n,children:i,className:a}=e;return(0,o.jsx)(r,{active:t,onClick:n,className:a,children:i})},c=e=>{let{count:t,variant:n="default",showZero:i=!1}=e;return 0!==t||i?(0,o.jsx)(s,{variant:n,children:t}):null}},4757:(e,t,n)=>{n.d(t,{A:()=>g});var i=n(9950),o=n(7202),a=n(1627),r=n(4752),s=n(9246),d=n(4414);const l=e=>{let{onSuccess:t,onError:n}=e;const o=(0,a.t2)(),r=(0,a.HH)(),[s,l]=(0,i.useState)(!1),[u,h]=(0,i.useState)("");return(0,d.jsxs)(c,{onSubmit:async e=>{if(e.preventDefault(),!o||!r)return;l(!0),h("");const{error:i}=await o.confirmPayment({elements:r,confirmParams:{return_url:`${window.location.origin}/pos/invoices`},redirect:"if_required"});i?(h(i.message||"Payment failed"),n(i.message||"Payment failed"),l(!1)):t()},children:[(0,d.jsx)(a.He,{}),(0,d.jsx)(p,{type:"submit",disabled:!o||s,children:s?"Processing...":"Pay Now"}),u&&(0,d.jsx)(x,{children:u})]})},c=r.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,p=r.Ay.button`
  width: 100%;
  padding: 12px;
  background: #635BFF;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #4B45C6;
  }

  &:disabled {
    background: #A5B4FC;
    cursor: not-allowed;
  }
`,x=r.Ay.div`
  color: #DC2626;
  font-size: 14px;
  text-align: center;
`,u=r.Ay.div`
  padding: 24px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,h=r.Ay.div`
  padding: 16px;
  background: #FEF2F2;
  color: #DC2626;
  border: 1px solid #FECACA;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`,g=e=>{let{invoiceId:t,onSuccess:n,onError:r}=e;const[c,p]=(0,i.useState)(null),[x,g]=(0,i.useState)(""),[m,v]=(0,i.useState)(!0),[y,f]=(0,i.useState)("");return(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await s.A.post(`/api/invoices/${t}/create-payment-intent`,{},{headers:{Authorization:`Bearer ${e}`}});if(n.data.success){const{clientSecret:e,publishableKey:t}=n.data;if(!t)throw new Error("Stripe publishable key not configured");p((0,o.c)(t)),g(e)}}catch(i){var e,n;const t=(null===(e=i.response)||void 0===e||null===(n=e.data)||void 0===n?void 0:n.error)||i.message||"Failed to initialize payment";f(t),r(t)}finally{v(!1)}})()},[t]),m?(0,d.jsx)(u,{children:"Initializing payment..."}):y?(0,d.jsx)(h,{children:y}):x&&c?(0,d.jsx)(a.S8,{stripe:c,options:{clientSecret:x,appearance:{theme:"stripe",variables:{colorPrimary:"#635BFF",borderRadius:"8px"}}},children:(0,d.jsx)(l,{onSuccess:n,onError:r})}):(0,d.jsx)(h,{children:"Payment initialization failed. Please try again."})}},6529:(e,t,n)=>{n.r(t),n.d(t,{default:()=>U});var i=n(9950),o=n(4752),a=n(4492),r=n(6038),s=n(9018),d=n(1367),l=n(4728),c=n(8409),p=n(2488),x=n(2597),u=n(5612),h=n(4757),g=n(1052),m=n.n(g),v=n(8654),y=n(4414);const f=o.Ay.div`
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
`,b=o.Ay.div`
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
`,j=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,w=o.Ay.button`
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
`,F=o.Ay.div`
  position: relative;
  display: inline-block;
`,k=o.Ay.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: ${e=>e.active?"#F0EEFF":"#FFFFFF"};
  color: ${e=>e.active?"#635BFF":"#374151"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  &:hover { border-color: #635BFF; background: #F8F7FF; }
  svg { width: 16px; height: 16px; flex-shrink: 0; }
`,B=(0,o.Ay)(l.SC)``,A=o.Ay.div``,C=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,S=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,E=o.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,$=(0,o.Ay)(l.Wh)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`,D=o.Ay.button`
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
`,I=o.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,_=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
`,N=o.Ay.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,T=o.Ay.button`
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
`,R=o.Ay.div`
  padding: 24px;
`,P=o.Ay.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
  border-radius: 0 0 12px 12px;
`,M=o.Ay.div`
  margin-bottom: 16px;
`,W=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`,Y=o.Ay.input`
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
`,U=()=>{const{operationSettings:e}=(0,s.Pj)(),{user:t}=(0,d.As)(),{restaurantId:n}=(0,a.g)(),[o,l]=(0,a.ok)(),g=n?parseInt(n):null===t||void 0===t?void 0:t.restaurant_id,[U,L]=(0,i.useState)([]),[H,O]=(0,i.useState)([]),[q,Q]=(0,i.useState)(""),[G,J]=(0,i.useState)("all"),[V,K]=(0,i.useState)(!1),[Z,X]=(0,i.useState)(!1),[ee,te]=(0,i.useState)(()=>{const e=new Date;return{start:"2020-01-01",end:(t=e,`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`)};var t}),[ne,ie]=(0,i.useState)(!1),[oe,ae]=(0,i.useState)(null),[re,se]=(0,i.useState)(!1),[de,le]=(0,i.useState)([]),[ce,pe]=(0,i.useState)(!1),[xe,ue]=(0,i.useState)({paymentMethod:"",transactionId:"",receiptImage:""}),[he,ge]=(0,i.useState)(!1),[me,ve]=(0,i.useState)(""),[ye,fe]=(0,i.useState)(null),[,be]=(0,i.useState)({}),je=o.get("tab")||"all",we=e=>{l({tab:e})},Fe=e=>{J(e),K(!1);const t=new Date;let n=new Date,i=new Date;const o=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"week":n.setDate(t.getDate()-6);break;case"month":n.setDate(t.getDate()-29);break;case"year":n.setDate(t.getDate()-364);break;case"all":n=new Date(2020,0,1)}te({start:o(n),end:o(i)})},ke=async()=>{try{const e=localStorage.getItem("auth_token"),n=g||(null===t||void 0===t?void 0:t.restaurant_id);if(!e||!n)return;const i=await fetch(`/api/invoices/restaurant/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){const e=await i.json(),t=(e.data||e||[]).map(e=>{var t,n;return{id:(null===(t=e.id)||void 0===t?void 0:t.toString())||"",invoiceNumber:e.invoice_number||"",issueDate:e.issued_at||e.issue_date||"",dueDate:e.due_date||"",paidDate:e.paid_at||e.paid_date||"",status:e.status||"",currency:e.currency||"MYR",amount:parseFloat(e.subtotal||e.amount||0),tax:parseFloat(e.tax_amount||e.tax||0),total:parseFloat(e.total_amount||e.total||0),items:e.items||[],billingPeriod:e.billing_period_start&&e.billing_period_end?`${Ae(e.billing_period_start)} - ${Ae(e.billing_period_end)}`:"",planType:e.category_display_name||e.plan_type||"Service",paymentMethod:e.payment_method||"",transactionId:e.transaction_id||"",receiptUrl:e.receipt_url||"",hasPaymentInfo:!!e.transaction_id||!!e.receipt_url,type:e.type||"manual",payerType:e.payer_type||"restaurant",payerId:(null===(n=e.payer_id)||void 0===n?void 0:n.toString())||"",invoiceCategory:e.invoice_category||"",categoryDisplayName:e.category_display_name||"",issuerType:e.issuer_type||e.issuerType||"system_admin",issuerId:e.issuer_id||e.issuerId||null,issuerName:e.issuer_name||e.issuerName||"",issuerInfo:e.issuerInfo||e.issuer_info||null,payerInfo:e.payerInfo||e.payer_info||null}});L(t)}}catch(e){console.error("Error fetching all invoices:",e)}},Be=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void O([]);const t=await fetch("/api/invoices/to-pay",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();O(e)}else O([])}catch(e){console.error("Error fetching invoices to pay:",e),O([])}};(0,i.useEffect)(()=>{ke(),Be(),(async()=>{if(g)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${g}/company-info`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();e.success&&e.data&&fe({companyName:e.data.company_name||"",address:e.data.address||"",city:e.data.city||"",state:e.data.state||"",postalCode:e.data.postal_code||"",country:e.data.country||"",phone:e.data.phone||"",email:e.data.email||"",website:e.data.website||"",taxNumber:e.data.tax_number||"",registrationNumber:e.data.registration_number||"",companyLogo:e.data.logo_url||"",bankName:e.data.bank_name||"",bankAccount:e.data.bank_account||"",bankAccountName:e.data.bank_account_name||"",swiftCode:e.data.swift_code||""})}}catch(e){console.error("Error fetching company settings:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const t=await e.json();t.success&&t.currencies&&be(t.currencies)}}catch(e){console.error("Error fetching currency config:",e)}})()},[g,null===t||void 0===t?void 0:t.restaurant_id]);const Ae=e=>{if(!e)return"-";return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})},Ce=e=>(e=>{if("pending_payment"!==e.status)return!1;const t=new Date;return new Date(e.dueDate)<t})(e)?"overdue":e.status,Se=e=>({draft:"Draft",pending_payment:"Pending",payment_submitted:"Confirming",paid:"Paid",overdue:"Overdue",cancelled:"Cancelled"}[e]||e),Ee=e=>e.filter(e=>{var t,n,i,o;const a=q.toLowerCase(),r=!q||(null===(t=e.invoiceNumber)||void 0===t?void 0:t.toLowerCase().includes(a))||(null===(n=e.issuerName)||void 0===n?void 0:n.toLowerCase().includes(a))||(null===(i=e.status)||void 0===i?void 0:i.toLowerCase().includes(a))||(null===(o=e.categoryDisplayName)||void 0===o?void 0:o.toLowerCase().includes(a)),s=new Date(e.issueDate),d=new Date(ee.start),l=new Date(ee.end);l.setHours(23,59,59,999);return r&&(s>=d&&s<=l)}),$e=Ee(U),De=Ee(H),ze={total:U.length,pending:U.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length,confirming:U.filter(e=>"payment_submitted"===e.status).length,paid:U.filter(e=>"paid"===e.status).length,totalAmount:U.reduce((e,t)=>e+(t.total||0),0),pendingAmount:U.filter(e=>"pending_payment"===e.status||"overdue"===e.status).reduce((e,t)=>e+(t.total||0),0)},Ie=async e=>{ae(e),ve(""),ue({paymentMethod:"",transactionId:"",receiptImage:""}),await(async(e,t,n)=>{pe(!0);try{let i=`/api/admin/payment-settings/available/${e}`;"brand"===t&&n?i=`/api/brands/${n}/payment-settings/available/${e}`:"foodcourt"===t&&n&&(i=`/api/foodcourts/${n}/payment-settings/available/${e}`);const o=localStorage.getItem("auth_token"),a=await fetch(i,{headers:{Authorization:`Bearer ${o}`}});if(a.ok){const e=await a.json();le(e.methods||[]),e.methods&&e.methods.length>0&&ue(t=>({...t,paymentMethod:e.methods[0].id}))}}catch(i){console.error("Error fetching payment methods:",i)}finally{pe(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId),se(!0)},_e=e=>{const t=e.issuerInfo,n=e.payerInfo||(ye?{name:ye.companyName,address:ye.address,city:ye.city,state:ye.state,postalCode:ye.postalCode,country:ye.country,phone:ye.phone,email:ye.email,taxId:ye.taxNumber,businessRegistration:ye.registrationNumber}:null);return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${null!==t&&void 0!==t&&t.logoUrl?`<img src="${t.logoUrl}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name" style="${null!==t&&void 0!==t&&t.logoUrl?"font-size: 14px;":""}">${(null===t||void 0===t?void 0:t.name)||e.issuerName||"Issuer"}</div>\n                <div class="company-details">\n                    ${null!==t&&void 0!==t&&t.address?`${t.address}<br>`:""}\n                    ${[null===t||void 0===t?void 0:t.city,null===t||void 0===t?void 0:t.state,null===t||void 0===t?void 0:t.postalCode].filter(Boolean).join(", ")}${null!==t&&void 0!==t&&t.city||null!==t&&void 0!==t&&t.state||null!==t&&void 0!==t&&t.postalCode?"<br>":""}\n                    ${null!==t&&void 0!==t&&t.country?`${t.country}<br>`:""}\n                    ${null!==t&&void 0!==t&&t.phone?`Tel: ${t.phone}<br>`:""}\n                    ${null!==t&&void 0!==t&&t.email?`Email: ${t.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">INVOICE</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">Bill To</div>\n                <div class="customer-name">${(null===n||void 0===n?void 0:n.name)||(null===ye||void 0===ye?void 0:ye.companyName)||"Your Company"}</div>\n                ${null!==n&&void 0!==n&&n.address||null!==ye&&void 0!==ye&&ye.address?`<div class="customer-details">${(null===n||void 0===n?void 0:n.address)||(null===ye||void 0===ye?void 0:ye.address)}</div>`:""}\n                ${[(null===n||void 0===n?void 0:n.city)||(null===ye||void 0===ye?void 0:ye.city),(null===n||void 0===n?void 0:n.state)||(null===ye||void 0===ye?void 0:ye.state),(null===n||void 0===n?void 0:n.postalCode)||(null===ye||void 0===ye?void 0:ye.postalCode)].filter(Boolean).length>0?`<div class="customer-details">${[(null===n||void 0===n?void 0:n.city)||(null===ye||void 0===ye?void 0:ye.city),(null===n||void 0===n?void 0:n.state)||(null===ye||void 0===ye?void 0:ye.state),(null===n||void 0===n?void 0:n.postalCode)||(null===ye||void 0===ye?void 0:ye.postalCode)].filter(Boolean).join(", ")}</div>`:""}\n                ${null!==n&&void 0!==n&&n.country||null!==ye&&void 0!==ye&&ye.country?`<div class="customer-details">${(null===n||void 0===n?void 0:n.country)||(null===ye||void 0===ye?void 0:ye.country)}</div>`:""}\n                ${null!==n&&void 0!==n&&n.email||null!==ye&&void 0!==ye&&ye.email?`<div class="customer-details">${(null===n||void 0===n?void 0:n.email)||(null===ye||void 0===ye?void 0:ye.email)}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${Ae(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${Ae(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${Ae(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">Items</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>Description</th>\n                        <th class="text-center">Qty</th>\n                        <th class="text-right">Unit Price</th>\n                        <th class="text-right">Amount</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items&&e.items.length>0?e.items.map(t=>`\n                    <tr>\n                        <td>${t.description}</td>\n                        <td class="text-center">${t.quantity}</td>\n                        <td class="text-right">${(0,r.vv)(t.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,r.vv)(t.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join(""):`\n                    <tr>\n                        <td>${e.categoryDisplayName||e.planType||"Service"}</td>\n                        <td class="text-center">1</td>\n                        <td class="text-right">${(0,r.vv)(e.amount,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,r.vv)(e.amount,e.currency||"MYR")}</td>\n                    </tr>\n                    `}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,r.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${(e.additionalCharges||[]).map(t=>`\n                <div class="summary-row tax">\n                    <span>${t.name} (${t.rate}%):</span>\n                    <span>${(0,r.vv)(t.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${0===e.total?'<span style="color: #10B981; font-weight: 600;">Free</span>':(0,r.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${null!==t&&void 0!==t&&t.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">Payment Details</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${t.bankName}<br>\n                <strong>Account Name:</strong> ${t.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${t.bankAccount||"-"}\n                ${t.swiftCode?`<br><strong>SWIFT Code:</strong> ${t.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${null!==t&&void 0!==t&&t.taxId||null!==t&&void 0!==t&&t.businessRegistration?`\n        <div class="registration-info">\n            ${t.businessRegistration?`Reg No: ${t.businessRegistration}`:""}\n            ${t.businessRegistration&&t.taxId?" | ":""}\n            ${t.taxId?`Tax No: ${t.taxId}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">Thank you for your business!</div>\n            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>\n        </div>\n    </div>\n</body>\n</html>`},Ne=async e=>{try{var t;const n=_e(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const o=i.contentDocument||(null===(t=i.contentWindow)||void 0===t?void 0:t.document);if(!o)throw document.body.removeChild(i),new Error("Could not access iframe document");o.open(),o.write(n),o.close(),await new Promise(async e=>{try{var t;null!==(t=o.fonts)&&void 0!==t&&t.ready&&await o.fonts.ready}catch{}const n=o.querySelectorAll("img");await Promise.all(Array.from(n).map(e=>e.complete?Promise.resolve():new Promise(t=>{e.onload=t,e.onerror=t}))),setTimeout(e,100)});const a=await m()(o.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const r=a.toDataURL("image/png"),s=new u.Ay({orientation:"portrait",unit:"mm",format:"a4"}),d=210,l=a.height*d/a.width;s.addImage(r,"PNG",0,0,d,l),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(n){console.error("Error generating PDF:",n)}},Te=e=>{const t=_e(e),n=window.open("","_blank","width=800,height=600");n&&(n.document.write(t),n.document.close(),setTimeout(()=>{n.print()},250))},Re=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,y.jsx)(c.an,{children:(0,y.jsxs)(c.bQ,{children:[(0,y.jsx)(c.B_,{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(c.gU,{children:"Invoice"}),(0,y.jsx)(c.gU,{children:"Issuer"}),(0,y.jsx)(c.gU,{align:"center",children:"Period"}),(0,y.jsx)(c.gU,{align:"center",children:"Issued"}),(0,y.jsx)(c.gU,{align:"center",children:"Due"}),(0,y.jsx)(c.gU,{align:"center",children:"Status"}),(0,y.jsx)(c.gU,{align:"right",children:"Amount"}),(0,y.jsx)(c.gU,{align:"right",children:"Total"}),(0,y.jsx)(c.gU,{align:"center",children:"Actions"})]})}),(0,y.jsx)("tbody",{children:e.length>0?e.map(e=>(0,y.jsxs)(c.J2,{children:[(0,y.jsx)(c.Bv,{"data-label":"Invoice",children:(0,y.jsxs)(A,{children:[(0,y.jsxs)(C,{children:[e.invoiceNumber,"automatic"===e.type&&(0,y.jsx)(E,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,y.jsx)(S,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,y.jsx)(c.Bv,{"data-label":"Issuer",children:(0,y.jsx)(A,{children:(0,y.jsx)(C,{children:e.issuerName||("system_admin"===e.issuerType?"System Admin":"brand"===e.issuerType?"Brand":"Foodcourt")})})}),(0,y.jsx)(c.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,y.jsx)(c.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:Ae(e.issueDate)}),(0,y.jsx)(c.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:Ae(e.dueDate)}),(0,y.jsx)(c.Bv,{"data-label":"Status",align:"center",children:(0,y.jsx)($,{status:Ce(e),children:Se(Ce(e))})}),(0,y.jsx)(c.Bv,{"data-label":"Amount",align:"right",children:(0,y.jsx)(c.DM,{children:(0,r.vv)(e.amount,e.currency||"MYR")})}),(0,y.jsx)(c.Bv,{"data-label":"Total",align:"right",children:(0,y.jsx)(c.DM,{highlight:!0,children:0===e.total?(0,y.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:"Free"}):(0,r.vv)(e.total,e.currency||"MYR")})}),(0,y.jsx)(c.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,y.jsxs)(c.wr,{children:[(0,y.jsx)(D,{variant:"primary",onClick:()=>(e=>{ae(e),ie(!0)})(e),children:"View"}),t&&("pending_payment"===e.status||"overdue"===e.status)&&e.total>0&&(0,y.jsx)(D,{variant:"success",onClick:()=>Ie(e),children:"Pay"}),(0,y.jsx)(D,{onClick:()=>Ne(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(D,{onClick:()=>Te(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})})]},e.id)):(0,y.jsx)(c.J2,{children:(0,y.jsx)(c.Bv,{colSpan:9,children:(0,y.jsx)(c.ys,{children:"No invoices found"})})})})]})})};return(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)(c.mc,{children:[(0,y.jsx)(c.Y9,{children:(0,y.jsx)(c.hE,{children:"Invoices"})}),(0,y.jsxs)(c.UC,{children:[(0,y.jsxs)(c.MD,{children:[(0,y.jsxs)(c.hI,{children:[(0,y.jsx)(c.Os,{children:ze.total}),(0,y.jsx)(c.v0,{children:"Total Invoices"})]}),(0,y.jsxs)(c.hI,{color:"#F59E0B",children:[(0,y.jsx)(c.Os,{children:ze.pending}),(0,y.jsx)(c.v0,{children:"To Pay"}),(0,y.jsx)(c.d1,{children:(0,r.vv)(ze.pendingAmount,(null===e||void 0===e?void 0:e.currency)||"MYR")})]}),(0,y.jsxs)(c.hI,{color:"#3B82F6",children:[(0,y.jsx)(c.Os,{children:ze.confirming}),(0,y.jsx)(c.v0,{children:"Confirming"})]}),(0,y.jsxs)(c.hI,{color:"#10B981",children:[(0,y.jsx)(c.Os,{children:ze.paid}),(0,y.jsx)(c.v0,{children:"Paid"})]})]}),(0,y.jsxs)(x.tU,{children:[(0,y.jsxs)(x.oz,{active:"all"===je,onClick:()=>we("all"),children:["All Invoices",(0,y.jsx)(x.Ex,{count:U.length})]}),(0,y.jsxs)(x.oz,{active:"to_pay"===je,onClick:()=>we("to_pay"),children:["Invoices to Pay",(0,y.jsx)(x.Ex,{count:H.filter(e=>"pending_payment"===e.status||"overdue"===e.status||"payment_submitted"===e.status).length,variant:"warning"})]})]}),(0,y.jsx)(f,{children:(0,y.jsxs)(b,{children:[(0,y.jsxs)(j,{children:[(0,y.jsx)(w,{active:"week"===G&&!V,onClick:()=>Fe("week"),children:"Week"}),(0,y.jsx)(w,{active:"month"===G&&!V,onClick:()=>Fe("month"),children:"Month"}),(0,y.jsx)(w,{active:"year"===G&&!V,onClick:()=>Fe("year"),children:"Year"}),(0,y.jsx)(w,{active:"all"===G&&!V,onClick:()=>Fe("all"),children:"All"}),(0,y.jsxs)(F,{children:[(0,y.jsxs)(k,{active:V,onClick:()=>X(!Z),children:[(0,y.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,y.jsx)("path",{d:"M16 2v4M8 2v4"}),(0,y.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),V&&ee.start&&ee.end?`${ee.start} ~ ${ee.end}`:"Custom Range"]}),(0,y.jsx)(v.A,{isOpen:Z,startDate:ee.start,endDate:ee.end,onRangeSelect:(e,t)=>{K(!0),te({start:e,end:t}),X(!1)},onClose:()=>X(!1)})]})]}),(0,y.jsx)(p.DO,{placeholder:"Search invoice, issuer, status...",value:q,onChange:e=>Q(e.target.value)})]})}),"all"===je&&Re($e,!0),"to_pay"===je&&Re(De,!0)]}),ne&&oe&&(()=>{const e=oe.issuerInfo,t=oe.payerInfo||(ye?{name:ye.companyName,address:ye.address,city:ye.city,state:ye.state,postalCode:ye.postalCode,country:ye.country,phone:ye.phone,email:ye.email,taxId:ye.taxNumber,businessRegistration:ye.registrationNumber}:null);return(0,y.jsx)(z,{onClick:()=>ie(!1),children:(0,y.jsxs)(I,{onClick:e=>e.stopPropagation(),style:{maxWidth:"800px"},children:[(0,y.jsxs)(_,{children:[(0,y.jsx)(N,{children:"Invoice Details"}),(0,y.jsx)(T,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,y.jsxs)(R,{children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,y.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===e||void 0===e?void 0:e.logoUrl)&&(0,y.jsx)("img",{src:e.logoUrl,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,y.jsx)("div",{style:{fontSize:null!==e&&void 0!==e&&e.logoUrl?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===e||void 0===e?void 0:e.name)||oe.issuerName||"Issuer"}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===e||void 0===e?void 0:e.address)&&(0,y.jsx)("div",{children:e.address}),((null===e||void 0===e?void 0:e.city)||(null===e||void 0===e?void 0:e.state)||(null===e||void 0===e?void 0:e.postalCode))&&(0,y.jsx)("div",{children:[null===e||void 0===e?void 0:e.city,null===e||void 0===e?void 0:e.state,null===e||void 0===e?void 0:e.postalCode].filter(Boolean).join(", ")}),(null===e||void 0===e?void 0:e.country)&&(0,y.jsx)("div",{children:e.country}),(null===e||void 0===e?void 0:e.phone)&&(0,y.jsxs)("div",{children:["Tel: ",e.phone]}),(null===e||void 0===e?void 0:e.email)&&(0,y.jsxs)("div",{children:["Email: ",e.email]})]})]}),(0,y.jsxs)("div",{style:{textAlign:"right"},children:[(0,y.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:"INVOICE"}),(0,y.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:oe.invoiceNumber}),(0,y.jsx)($,{status:oe.status,style:{marginTop:"8px"},children:Se(oe.status)})]})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,y.jsxs)("div",{style:{flex:1},children:[(0,y.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Bill To"}),(0,y.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:(null===t||void 0===t?void 0:t.name)||(null===ye||void 0===ye?void 0:ye.companyName)||"Your Company"}),((null===t||void 0===t?void 0:t.address)||(null===ye||void 0===ye?void 0:ye.address))&&(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:(null===t||void 0===t?void 0:t.address)||(null===ye||void 0===ye?void 0:ye.address)}),((null===t||void 0===t?void 0:t.city)||(null===t||void 0===t?void 0:t.state)||(null===t||void 0===t?void 0:t.postalCode)||(null===ye||void 0===ye?void 0:ye.city))&&(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:[(null===t||void 0===t?void 0:t.city)||(null===ye||void 0===ye?void 0:ye.city),(null===t||void 0===t?void 0:t.state)||(null===ye||void 0===ye?void 0:ye.state),(null===t||void 0===t?void 0:t.postalCode)||(null===ye||void 0===ye?void 0:ye.postalCode)].filter(Boolean).join(", ")}),((null===t||void 0===t?void 0:t.country)||(null===ye||void 0===ye?void 0:ye.country))&&(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:(null===t||void 0===t?void 0:t.country)||(null===ye||void 0===ye?void 0:ye.country)}),((null===t||void 0===t?void 0:t.email)||(null===ye||void 0===ye?void 0:ye.email))&&(0,y.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:(null===t||void 0===t?void 0:t.email)||(null===ye||void 0===ye?void 0:ye.email)})]}),(0,y.jsxs)("div",{style:{textAlign:"right"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:oe.billingPeriod||"-"})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ae(oe.issueDate)})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ae(oe.dueDate)})]}),oe.paidDate&&(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,y.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,y.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:Ae(oe.paidDate)})]})]})]}),(0,y.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,y.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:"Items"}),(0,y.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,y.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Description"}),(0,y.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Qty"}),(0,y.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Unit Price"}),(0,y.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:"Amount"})]})}),(0,y.jsx)("tbody",{children:oe.items&&oe.items.length>0?oe.items.map((e,t)=>(0,y.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(e.unitPrice,oe.currency||"MYR")}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(e.total,oe.currency||"MYR")})]},t)):(0,y.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:oe.categoryDisplayName||oe.planType||"Service"}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:"1"}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(oe.amount,oe.currency||"MYR")}),(0,y.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(oe.amount,oe.currency||"MYR")})]})})]})]}),(0,y.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,y.jsxs)("div",{style:{width:"280px"},children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#6B7280"},children:[(0,y.jsx)("span",{children:"Subtotal:"}),(0,y.jsx)("span",{children:(0,r.vv)(oe.subtotalBeforeDiscount||oe.amount,oe.currency||"MYR")})]}),oe.discountType&&"none"!==oe.discountType&&oe.discountAmount>0&&(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#15803D"},children:[(0,y.jsxs)("span",{children:["Discount","percentage"===oe.discountType?` (${oe.discountValue}%)`:"",":"]}),(0,y.jsxs)("span",{children:["-",(0,r.vv)(oe.discountAmount,oe.currency||"MYR")]})]}),oe.tax>0&&(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#6B7280"},children:[(0,y.jsx)("span",{children:"Tax:"}),(0,y.jsx)("span",{children:(0,r.vv)(oe.tax,oe.currency||"MYR")})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"16px",fontWeight:"700",color:"#0A2540",background:"#F8FAFC",borderRadius:"6px",marginTop:"8px"},children:[(0,y.jsx)("span",{children:"Total:"}),(0,y.jsx)("span",{children:(0,r.vv)(oe.total,oe.currency||"MYR")})]})]})}),(null===e||void 0===e?void 0:e.bankName)&&(0,y.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,y.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:"Payment Details"}),(0,y.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("strong",{children:"Bank:"})," ",e.bankName]}),(0,y.jsxs)("div",{children:[(0,y.jsx)("strong",{children:"Account Name:"})," ",e.bankAccountName||"-"]}),(0,y.jsxs)("div",{children:[(0,y.jsx)("strong",{children:"Account Number:"})," ",e.bankAccount||"-"]}),e.swiftCode&&(0,y.jsxs)("div",{children:[(0,y.jsx)("strong",{children:"SWIFT Code:"})," ",e.swiftCode]})]})]}),((null===e||void 0===e?void 0:e.taxId)||(null===e||void 0===e?void 0:e.businessRegistration))&&(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===e||void 0===e?void 0:e.businessRegistration)&&(0,y.jsxs)("span",{children:["Reg No: ",e.businessRegistration]}),(null===e||void 0===e?void 0:e.businessRegistration)&&(null===e||void 0===e?void 0:e.taxId)&&(0,y.jsx)("span",{children:" | "}),(null===e||void 0===e?void 0:e.taxId)&&(0,y.jsxs)("span",{children:["Tax No: ",e.taxId]})]})]}),(0,y.jsxs)(P,{children:[("pending_payment"===oe.status||"overdue"===oe.status)&&oe.total>0&&(0,y.jsx)(B,{variant:"success",onClick:()=>{ie(!1),Ie(oe)},children:"Pay Now"}),(0,y.jsx)(B,{onClick:()=>Ne(oe),children:"Download PDF"}),(0,y.jsx)(B,{onClick:()=>Te(oe),children:"Print"}),(0,y.jsx)(B,{variant:"secondary",onClick:()=>ie(!1),children:"Close"})]})]})})})(),re&&oe&&(0,y.jsx)(z,{onClick:()=>se(!1),children:(0,y.jsxs)(I,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,y.jsxs)(_,{children:[(0,y.jsx)(N,{children:"Submit Payment"}),(0,y.jsx)(T,{onClick:()=>se(!1),children:"\xd7"})]}),(0,y.jsxs)(R,{children:[(0,y.jsxs)("div",{style:{marginBottom:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,y.jsxs)("p",{style:{margin:"0 0 8px 0",fontSize:"14px",color:"#6B7280"},children:["Invoice: ",(0,y.jsx)("strong",{children:oe.invoiceNumber})]}),(0,y.jsx)("p",{style:{margin:"0",fontSize:"20px",fontWeight:"700",color:"#0A2540"},children:(0,r.vv)(oe.total,oe.currency)})]}),ce?(0,y.jsx)("div",{style:{textAlign:"center",padding:"20px",color:"#6B7280"},children:"Loading payment methods..."}):0===de.length?(0,y.jsxs)("div",{style:{padding:"20px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,y.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#92400E",fontSize:"15px"},children:"Payment Not Available"}),(0,y.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:[(0,y.jsx)("strong",{children:oe.issuerName||("brand"===oe.issuerType?"Brand":"foodcourt"===oe.issuerType?"Foodcourt":"System Admin")})," has not configured payment methods for ",(0,y.jsx)("strong",{children:oe.currency||"MYR"})," yet. Please contact the invoice issuer to set up payment options."]})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,y.jsx)(W,{children:"Payment Method *"}),(0,y.jsx)("div",{style:{display:"grid",gridTemplateColumns:`repeat(${Math.min(de.length,3)}, 1fr)`,gap:"10px",marginTop:"8px"},children:de.map(e=>(0,y.jsxs)("button",{onClick:()=>{ue(t=>({...t,paymentMethod:e.id})),ve("")},style:{display:"flex",flexDirection:"column",alignItems:"center",padding:"14px 8px",border:"2px solid "+(xe.paymentMethod===e.id?"#635BFF":"#E5E7EB"),borderRadius:"8px",background:xe.paymentMethod===e.id?"#F5F3FF":"white",cursor:"pointer",transition:"all 0.2s"},children:[(0,y.jsx)("span",{style:{fontSize:"22px",marginBottom:"6px"},children:"stripe"===e.id?"\ud83d\udcb3":"paypal"===e.id?"\ud83c\udd7f\ufe0f":"qr_payment"===e.id?"\ud83d\udcf1":"\ud83c\udfe6"}),(0,y.jsx)("span",{style:{fontSize:"13px",fontWeight:"500",color:"#374151"},children:e.name})]},e.id))})]}),"stripe"===xe.paymentMethod&&oe&&(0,y.jsx)(h.A,{invoiceId:oe.id,onSuccess:()=>{se(!1),ue({paymentMethod:"",transactionId:"",receiptImage:""}),ke(),Be()},onError:()=>{}}),"bank_transfer"===xe.paymentMethod&&(()=>{const e=de.find(e=>"bank_transfer"===e.id);return e?(0,y.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",fontSize:"14px",lineHeight:"1.8"},children:[(0,y.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:"Bank Transfer Details"}),(0,y.jsxs)("p",{style:{margin:"0"},children:[(0,y.jsx)("strong",{children:"Bank:"})," ",e.bankName]}),(0,y.jsxs)("p",{style:{margin:"0"},children:[(0,y.jsx)("strong",{children:"Account Number:"})," ",e.accountNumber]}),(0,y.jsxs)("p",{style:{margin:"0"},children:[(0,y.jsx)("strong",{children:"Account Name:"})," ",e.accountName]})]}):null})(),"qr_payment"===xe.paymentMethod&&(()=>{const e=de.find(e=>"qr_payment"===e.id);return e?(0,y.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",textAlign:"center"},children:[(0,y.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:"QR Payment"}),e.qrImage&&(0,y.jsx)("img",{src:e.qrImage,alt:"Payment QR Code",style:{maxWidth:"200px",maxHeight:"200px",border:"1px solid #E5E7EB",borderRadius:"8px"}}),e.qrDescription&&(0,y.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:e.qrDescription})]}):null})(),xe.paymentMethod&&"stripe"!==xe.paymentMethod&&"paypal"!==xe.paymentMethod&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px",fontSize:"13px",color:"#92400E",display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,y.jsx)("span",{style:{fontWeight:"600",flexShrink:0},children:"*"}),(0,y.jsxs)("span",{children:["Please provide either a ",(0,y.jsx)("strong",{children:"Transaction ID / Reference Number"})," or upload a ",(0,y.jsx)("strong",{children:"Payment Receipt Image"})," to submit your payment."]})]}),(0,y.jsxs)(M,{children:[(0,y.jsx)(W,{children:"Transaction ID / Reference Number"}),(0,y.jsx)(Y,{type:"text",placeholder:"Enter transaction ID or reference number",value:xe.transactionId,onChange:e=>ue(t=>({...t,transactionId:e.target.value}))})]}),(0,y.jsxs)(M,{children:[(0,y.jsx)(W,{children:"Payment Receipt Image"}),(0,y.jsxs)("div",{style:{border:"2px dashed #E6EBF1",borderRadius:"8px",padding:"20px",textAlign:"center",cursor:"pointer",position:"relative"},children:[xe.receiptImage?(0,y.jsxs)("div",{children:[(0,y.jsx)("img",{src:xe.receiptImage,alt:"Receipt",style:{maxWidth:"200px",maxHeight:"200px",marginBottom:"8px",borderRadius:"8px"}}),(0,y.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:"Click to change image"})]}):(0,y.jsxs)("div",{children:[(0,y.jsx)("p",{style:{margin:"0",fontSize:"14px",color:"#6B7280"},children:"Click to upload receipt image"}),(0,y.jsx)("p",{style:{margin:"4px 0 0 0",fontSize:"12px",color:"#9CA3AF"},children:"Max 5MB, JPG/PNG"})]}),(0,y.jsx)("input",{type:"file",accept:"image/*",onChange:async e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(!n)return;if(n.size>5242880)return void ve("Image size must be less than 5MB");const i=new FileReader;i.onload=()=>{ue(e=>({...e,receiptImage:i.result}))},i.readAsDataURL(n)},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0,cursor:"pointer"}})]})]})]})]}),me&&(0,y.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",borderRadius:"6px",marginTop:"16px"},children:(0,y.jsx)("p",{style:{margin:0,color:"#DC2626",fontSize:"13px"},children:me})})]}),(0,y.jsxs)(P,{children:[(0,y.jsx)(B,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),xe.paymentMethod&&"stripe"!==xe.paymentMethod&&"paypal"!==xe.paymentMethod&&(0,y.jsx)(B,{variant:"success",onClick:async()=>{if(oe)if(xe.transactionId||xe.receiptImage){ge(!0),ve("");try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${oe.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:xe.paymentMethod,transaction_id:xe.transactionId,receipt_url:xe.receiptImage||null})});if(t.ok)se(!1),ue({paymentMethod:"",transactionId:"",receiptImage:""}),await ke(),await Be();else{const e=await t.json();ve(e.error||e.message||"Failed to submit payment")}}catch(e){console.error("Error submitting payment:",e),ve("Network error. Please check your connection and try again.")}finally{ge(!1)}}else ve("Please provide either a Transaction ID or upload a Receipt Image")},disabled:he||0===de.length,children:he?"Submitting...":"Submit Payment"})]})]})})]})})}},8654:(e,t,n)=>{n.d(t,{A:()=>C});var i=n(9950),o=n(4752),a=n(4414);const r=["Su","Mo","Tu","We","Th","Fr","Sa"],s=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,d=e=>{if(!e)return null;const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)},l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),c=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),p=o.Ay.div`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 1000;
  background: #FFFFFF;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
  padding: 20px 24px;
  animation: fadeIn 0.15s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
    padding: 20px 16px;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.2s ease-out;

    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
  }
`,x=o.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,u=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 1px solid #E6EBF1;
  min-width: 120px;

  @media (max-width: 768px) {
    flex-direction: row;
    border-right: none;
    border-bottom: 1px solid #E6EBF1;
    padding-right: 0;
    margin-right: 0;
    padding-bottom: 12px;
    margin-bottom: 16px;
    min-width: 0;
    gap: 4px;
  }
`,h=o.Ay.button`
  padding: 8px 12px;
  text-align: left;
  background: transparent;
  color: #374151;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.12s;
  white-space: nowrap;

  &:hover {
    background: #F3F4F6;
  }

  @media (max-width: 768px) {
    flex: 1;
    text-align: center;
    padding: 8px 10px;
    background: #F6F9FC;
    border-radius: 8px;
  }
`,g=o.Ay.div``,m=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,v=o.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #6B7280;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #F3F4F6;
  }
`,y=o.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,f=o.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,b=o.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,j=o.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,w=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,F=o.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,k=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,B=o.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,A=o.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.12s, color 0.12s;
  position: relative;
  user-select: none;

  color: ${e=>e.$isStart||e.$isEnd?"#FFFFFF":e.$isInRange?"#635BFF":"#374151"};
  background: ${e=>e.$isStart||e.$isEnd?"#635BFF":e.$isInRange?"#F0EEFF":"transparent"};
  font-weight: ${e=>e.$isStart||e.$isEnd||e.$isToday?700:400};

  ${e=>e.$isToday&&!e.$isStart&&!e.$isEnd&&"\n    &::after {\n      content: '';\n      position: absolute;\n      bottom: 4px;\n      width: 4px;\n      height: 4px;\n      border-radius: 50%;\n      background: #635BFF;\n    }\n  "}

  ${e=>e.$isHoverEnd&&!e.$isStart&&!e.$isEnd&&"\n    background: #E8E5FF;\n    color: #635BFF;\n  "}

  &:hover {
    ${e=>!e.$isStart&&!e.$isEnd&&`\n      background: ${e.$isInRange?"#E8E5FF":"#F3F4F6"};\n    `}
  }
`,C=e=>{let{startDate:t,endDate:n,onRangeSelect:o,onClose:C,isOpen:S}=e;const E=new Date,[$,D]=(0,i.useState)(E.getMonth()),[z,I]=(0,i.useState)(E.getFullYear()),[_,N]=(0,i.useState)(null),[T,R]=(0,i.useState)(null),[P,M]=(0,i.useState)(null),[W,Y]=(0,i.useState)("start"),U=(0,i.useRef)(null);(0,i.useEffect)(()=>{t&&N(d(t)),n&&R(d(n))},[t,n]),(0,i.useEffect)(()=>{S&&Y("start")},[S]),(0,i.useEffect)(()=>{const e=e=>{U.current&&!U.current.contains(e.target)&&C()};return S&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[S,C]);const L=(0,i.useCallback)(()=>{0===$?(D(11),I(e=>e-1)):D(e=>e-1)},[$]),H=(0,i.useCallback)(()=>{11===$?(D(0),I(e=>e+1)):D(e=>e+1)},[$]),O=(e,t)=>{const n=((e,t)=>new Date(e,t+1,0).getDate())(e,t),i=((e,t)=>new Date(e,t,1).getDay())(e,t),d=[];for(let o=0;o<i;o++)d.push(null);for(let o=1;o<=n;o++)d.push(new Date(e,t,o));return(0,a.jsxs)(b,{children:[(0,a.jsx)(j,{children:c(e,t)}),(0,a.jsx)(w,{children:r.map(e=>(0,a.jsx)(F,{children:e},e))}),(0,a.jsx)(k,{children:d.map((e,t)=>{if(!e)return(0,a.jsx)(B,{},`e-${t}`);const{isStart:n,isEnd:i,isInRange:r,isHoverEnd:d}=(e=>{const t=_&&l(e,_),n=T&&l(e,T),i="end"===W&&P?P:T;let o=!1;if(_&&i){const[t,n]=_<=i?[_,i]:[i,_];o=((e,t,n)=>{const i=e.getTime();return i>t.getTime()&&i<n.getTime()})(e,t,n)}return{isStart:t,isEnd:n,isInRange:o,isHoverEnd:"end"===W&&P&&l(e,P)}})(e),c=l(e,E);return(0,a.jsx)(A,{$isStart:!!n,$isEnd:!!i,$isInRange:r,$isHoverEnd:!!d,$isToday:c,onClick:()=>(e=>{if("start"===W)N(e),R(null),Y("end");else{let t=_,n=e;n<t&&([t,n]=[n,t]),N(t),R(n),Y("start"),o(s(t),s(n)),setTimeout(C,200)}})(e),onMouseEnter:()=>M(e),onMouseLeave:()=>M(null),children:e.getDate()},e.getTime())})})]})},q=11===$?0:$+1,Q=11===$?z+1:z,G=e=>{const t=new Date;let n;const i=t;switch(e){case"this_week":n=new Date(t),n.setDate(t.getDate()-t.getDay());break;case"this_month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":n=new Date(t.getFullYear(),0,1);break;default:return}N(n),R(i),Y("start"),o(s(n),s(i)),setTimeout(C,150)};return S?(0,a.jsx)(p,{ref:U,children:(0,a.jsxs)(x,{children:[(0,a.jsxs)(u,{children:[(0,a.jsx)(h,{onClick:()=>G("this_week"),children:"This Week"}),(0,a.jsx)(h,{onClick:()=>G("this_month"),children:"This Month"}),(0,a.jsx)(h,{onClick:()=>G("this_year"),children:"This Year"})]}),(0,a.jsxs)(g,{children:[(0,a.jsxs)(m,{children:[(0,a.jsx)(v,{onClick:L,"aria-label":"Previous month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,a.jsx)(v,{onClick:H,"aria-label":"Next month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,a.jsxs)(y,{children:[O(z,$),(0,a.jsx)(f,{children:O(Q,q)})]})]})]})}):null}}}]);