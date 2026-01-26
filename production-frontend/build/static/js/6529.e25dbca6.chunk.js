"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6529],{2488:(e,t,i)=>{i.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>d});i(9950);var n=i(4752),r=i(4414);const a=n.Ay.div`
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
`,o=n.Ay.input`
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
`,s=n.Ay.select`
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
`,d=e=>{let{children:t,className:i,style:n,...o}=e;return(0,r.jsx)(a,{className:i,style:n,...o,children:t})},l=e=>{let{placeholder:t="Search...",...i}=e;return(0,r.jsx)(o,{placeholder:t,...i})},c=e=>{let{children:t,...i}=e;return(0,r.jsx)(s,{...i,children:t})}},2597:(e,t,i)=>{i.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});i(9950);var n=i(4752),r=i(4414);const a=n.Ay.div`
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
`,o=n.Ay.button`
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
`,s=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:t,className:i,style:n}=e;return(0,r.jsx)(a,{className:i,style:n,children:t})},l=e=>{let{active:t,onClick:i,children:n,className:a}=e;return(0,r.jsx)(o,{active:t,onClick:i,className:a,children:n})},c=e=>{let{count:t,variant:i="default",showZero:n=!1}=e;return 0!==t||n?(0,r.jsx)(s,{variant:i,children:t}):null}},6529:(e,t,i)=>{i.r(t),i.d(t,{default:()=>re});var n=i(9950),r=i(4752),a=i(4492),o=i(3310),s=i(6038),d=i(9018),l=i(1367),c=i(4728),p=i(2674),x=i(2488),h=i(2597),u=i(5612),g=i(1052),m=i.n(g),y=i(4414);const v=r.Ay.div`
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
`,j=r.Ay.div`
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
`,b=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`,f=r.Ay.button`
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
`,w=r.Ay.input`
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
`,k=(0,r.Ay)(c.SC)``,F=r.Ay.div``,A=r.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,C=r.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,S=(0,r.Ay)(c.Wh)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`,_=r.Ay.button`
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
`,D=r.Ay.div`
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
`,I=r.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`,E=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
`,z=r.Ay.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,N=r.Ay.button`
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
`,P=r.Ay.div`
  padding: 24px;
`,M=r.Ay.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
  border-radius: 0 0 12px 12px;
`,R=r.Ay.div`
  background: white;
  padding: 40px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`,$=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #E6EBF1;
`,T=r.Ay.img`
  max-width: 180px;
  max-height: 60px;
  object-fit: contain;
`,Y=r.Ay.h1`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  text-align: right;
`,U=r.Ay.div`
  text-align: right;
  margin-top: 8px;
`,L=r.Ay.p`
  margin: 4px 0;
  font-size: 13px;
  color: #6B7280;
`,W=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
`,O=r.Ay.div``,q=r.Ay.h3`
  font-size: 11px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`,H=r.Ay.p`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,J=r.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin: 2px 0;
`,Q=r.Ay.table`
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
`,G=r.Ay.div`
  display: flex;
  justify-content: flex-end;
`,V=r.Ay.div`
  width: 280px;
`,Z=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${e=>e.highlight?"\n    border-top: 1px solid #E6EBF1;\n    margin-top: 8px;\n    padding-top: 16px;\n    font-size: 16px;\n  ":""}
`,K=r.Ay.span`
  font-size: ${e=>e.highlight?"16px":"14px"};
  color: ${e=>e.highlight?"#0A2540":"#6B7280"};
  font-weight: ${e=>e.highlight?"600":"400"};
`,X=r.Ay.span`
  font-size: ${e=>e.highlight?"20px":"14px"};
  font-weight: ${e=>e.highlight?"700":"500"};
  color: #0A2540;
`,ee=r.Ay.div`
  margin-bottom: 16px;
`,te=r.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`,ie=r.Ay.input`
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
`,ne=r.Ay.select`
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
`,re=()=>{const{operationSettings:e,restaurantId:t}=(0,d.Pj)(),{user:i}=(0,l.As)(),[r,c]=(0,a.ok)(),[g,re]=(0,n.useState)([]),[ae,oe]=(0,n.useState)([]),[se,de]=(0,n.useState)(""),[le,ce]=(0,n.useState)("month"),[pe,xe]=(0,n.useState)(!1),[he,ue]=(0,n.useState)(()=>{const e=new Date,t=new Date(e.getFullYear(),e.getMonth(),1),i=new Date(e.getFullYear(),e.getMonth()+1,0),n=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;return{start:n(t),end:n(i)}}),[ge,me]=(0,n.useState)(!1),[ye,ve]=(0,n.useState)(null),[je,be]=(0,n.useState)(!1),[fe,we]=(0,n.useState)([]),[ke,Fe]=(0,n.useState)(!1),[Ae,Be]=(0,n.useState)({paymentMethod:"",transactionId:"",receiptImage:""}),[Ce,Se]=(0,n.useState)(!1),[_e,De]=(0,n.useState)(""),[Ie,Ee]=(0,n.useState)(null),[ze,Ne]=(0,n.useState)({}),Pe=r.get("tab")||"all",Me=e=>{c({tab:e})},Re=e=>{ce(e),xe(!1);const t=new Date;let i=new Date,n=new Date;const r=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`;switch(e){case"week":i.setDate(t.getDate()-t.getDay());break;case"month":i=new Date(t.getFullYear(),t.getMonth(),1),n=new Date(t.getFullYear(),t.getMonth()+1,0);break;case"year":i=new Date(t.getFullYear(),0,1),n=new Date(t.getFullYear(),11,31);break;case"all":i=new Date(2e3,0,1)}ue({start:r(i),end:r(n)})},$e=(e,t)=>{xe(!0),ue(i=>({...i,[e]:t}))},Te=async()=>{try{const e=localStorage.getItem("auth_token"),n=t||(null===i||void 0===i?void 0:i.restaurant_id);if(!e||!n)return;const r=await fetch(`/api/invoices/restaurant/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){const e=await r.json(),t=(e.data||e||[]).map(e=>{var t,i;return{id:(null===(t=e.id)||void 0===t?void 0:t.toString())||"",invoiceNumber:e.invoice_number||"",issueDate:e.issued_at||e.issue_date||"",dueDate:e.due_date||"",paidDate:e.paid_at||e.paid_date||"",status:e.status||"",currency:e.currency||"MYR",amount:parseFloat(e.subtotal||e.amount||0),tax:parseFloat(e.tax_amount||e.tax||0),total:parseFloat(e.total_amount||e.total||0),items:e.items||[],billingPeriod:e.billing_period_start&&e.billing_period_end?`${Ue(e.billing_period_start)} - ${Ue(e.billing_period_end)}`:"",planType:e.category_display_name||e.plan_type||"Service",paymentMethod:e.payment_method||"",transactionId:e.transaction_id||"",receiptUrl:e.receipt_url||"",hasPaymentInfo:!!e.transaction_id||!!e.receipt_url,type:e.type||"manual",payerType:e.payer_type||"restaurant",payerId:(null===(i=e.payer_id)||void 0===i?void 0:i.toString())||"",invoiceCategory:e.invoice_category||"",categoryDisplayName:e.category_display_name||"",issuerType:e.issuer_type||"system_admin",issuerName:e.issuer_name||"",issuerInfo:e.issuer_info||null,payerInfo:e.payer_info||null}});re(t)}}catch(e){console.error("Error fetching all invoices:",e)}},Ye=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void oe([]);const t=await fetch("/api/invoices/to-pay",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();oe(e)}else oe([])}catch(e){console.error("Error fetching invoices to pay:",e),oe([])}};(0,n.useEffect)(()=>{Te(),Ye(),(async()=>{if(t)try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${t}/company-info`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){const e=await i.json();e.success&&e.data&&Ee({companyName:e.data.company_name||"",address:e.data.address||"",city:e.data.city||"",state:e.data.state||"",postalCode:e.data.postal_code||"",country:e.data.country||"",phone:e.data.phone||"",email:e.data.email||"",website:e.data.website||"",taxNumber:e.data.tax_number||"",registrationNumber:e.data.registration_number||"",companyLogo:e.data.logo_url||"",bankName:e.data.bank_name||"",bankAccount:e.data.bank_account||"",bankAccountName:e.data.bank_account_name||"",swiftCode:e.data.swift_code||""})}}catch(e){console.error("Error fetching company settings:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const t=await e.json();t.success&&t.currencies&&Ne(t.currencies)}}catch(e){console.error("Error fetching currency config:",e)}})()},[t,null===i||void 0===i?void 0:i.restaurant_id]);const Ue=e=>{if(!e)return"-";return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})},Le=e=>e.filter(e=>{var t,i,n,r;const a=se.toLowerCase(),o=!se||(null===(t=e.invoiceNumber)||void 0===t?void 0:t.toLowerCase().includes(a))||(null===(i=e.issuerName)||void 0===i?void 0:i.toLowerCase().includes(a))||(null===(n=e.status)||void 0===n?void 0:n.toLowerCase().includes(a))||(null===(r=e.categoryDisplayName)||void 0===r?void 0:r.toLowerCase().includes(a)),s=new Date(e.issueDate),d=new Date(he.start),l=new Date(he.end);l.setHours(23,59,59,999);return o&&(s>=d&&s<=l)}),We=Le(g),Oe=Le(ae),qe={total:g.length,pending:g.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length,confirming:g.filter(e=>"payment_submitted"===e.status).length,paid:g.filter(e=>"paid"===e.status).length,totalAmount:g.reduce((e,t)=>e+(t.total||0),0),pendingAmount:g.filter(e=>"pending_payment"===e.status||"overdue"===e.status).reduce((e,t)=>e+(t.total||0),0)},He=async e=>{ve(e),De(""),Be({paymentMethod:"",transactionId:"",receiptImage:""}),await(async e=>{Fe(!0);try{const t=await fetch(`/api/admin/payment-settings/available/${e}`);if(t.ok){const e=await t.json();we(e.methods||[]),e.methods&&e.methods.length>0&&Be(t=>({...t,paymentMethod:e.methods[0].id}))}}catch(t){console.error("Error fetching payment methods:",t)}finally{Fe(!1)}})(e.currency||"MYR"),be(!0)},Je=async e=>{var t;const i=null===(t=e.target.files)||void 0===t?void 0:t[0];if(!i)return;if(i.size>5242880)return void De("Image size must be less than 5MB");const n=new FileReader;n.onload=()=>{Be(e=>({...e,receiptImage:n.result}))},n.readAsDataURL(i)},Qe=async e=>{const t=document.getElementById("invoice-preview-pdf");if(!t)return ve(e),me(!0),void setTimeout(()=>Qe(e),500);try{const i=await m()(t,{scale:2}),n=i.toDataURL("image/png"),r=new u.Ay("p","mm","a4"),a=r.internal.pageSize.getWidth(),o=i.height*a/i.width;r.addImage(n,"PNG",0,0,a,o),r.save(`invoice-${e.invoiceNumber}.pdf`)}catch(i){console.error("Error generating PDF:",i)}},Ge=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,y.jsx)(p.an,{children:(0,y.jsxs)(p.bQ,{children:[(0,y.jsx)(p.B_,{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)(p.gU,{children:"Invoice"}),(0,y.jsx)(p.gU,{children:"Issuer"}),(0,y.jsx)(p.gU,{align:"center",children:"Period"}),(0,y.jsx)(p.gU,{align:"center",children:"Issued"}),(0,y.jsx)(p.gU,{align:"center",children:"Due"}),(0,y.jsx)(p.gU,{align:"center",children:"Status"}),(0,y.jsx)(p.gU,{align:"right",children:"Amount"}),(0,y.jsx)(p.gU,{align:"right",children:"Total"}),(0,y.jsx)(p.gU,{align:"center",children:"Actions"})]})}),(0,y.jsx)("tbody",{children:e.length>0?e.map(e=>{return(0,y.jsxs)(p.J2,{children:[(0,y.jsx)(p.Bv,{"data-label":"Invoice",children:(0,y.jsxs)(F,{children:[(0,y.jsxs)(A,{children:[e.invoiceNumber,"automatic"===e.type&&(0,y.jsx)(C,{style:{marginLeft:"6px"},children:"AUTO"})]}),(0,y.jsx)(B,{children:e.categoryDisplayName||e.planType||"Service"})]})}),(0,y.jsx)(p.Bv,{"data-label":"Issuer",children:(0,y.jsx)(F,{children:(0,y.jsx)(A,{children:e.issuerName||("system_admin"===e.issuerType?"System Admin":"brand"===e.issuerType?"Brand":"Foodcourt")})})}),(0,y.jsx)(p.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:e.billingPeriod||"-"}),(0,y.jsx)(p.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:Ue(e.issueDate)}),(0,y.jsx)(p.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:Ue(e.dueDate)}),(0,y.jsx)(p.Bv,{"data-label":"Status",align:"center",children:(0,y.jsx)(S,{status:e.status,children:(i=e.status,{draft:"Draft",pending_payment:"Pending",payment_submitted:"Confirming",paid:"Paid",overdue:"Overdue",cancelled:"Cancelled"}[i]||i)})}),(0,y.jsx)(p.Bv,{"data-label":"Amount",align:"right",children:(0,y.jsx)(p.DM,{children:(0,s.vv)(e.amount,e.currency||"MYR")})}),(0,y.jsx)(p.Bv,{"data-label":"Total",align:"right",children:(0,y.jsx)(p.DM,{highlight:!0,children:(0,s.vv)(e.total,e.currency||"MYR")})}),(0,y.jsx)(p.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,y.jsxs)(p.wr,{children:[(0,y.jsx)(_,{variant:"primary",onClick:()=>(e=>{ve(e),me(!0)})(e),children:"View"}),t&&("pending_payment"===e.status||"overdue"===e.status)&&(0,y.jsx)(_,{variant:"success",onClick:()=>He(e),children:"Pay"}),(0,y.jsx)(_,{onClick:()=>Qe(e),title:"Download PDF",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,y.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,y.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,y.jsx)(_,{onClick:()=>(e=>{ve(e),me(!0),setTimeout(()=>{window.print()},500)})(e),title:"Print Invoice",children:(0,y.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,y.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,y.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,y.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})})]},e.id);var i}):(0,y.jsx)(p.J2,{children:(0,y.jsx)(p.Bv,{colSpan:9,children:(0,y.jsx)(p.ys,{children:"No invoices found"})})})})]})})};return(0,y.jsx)(o.A,{children:(0,y.jsxs)(p.mc,{children:[(0,y.jsx)(p.Y9,{children:(0,y.jsx)(p.hE,{children:"Invoices"})}),(0,y.jsxs)(p.UC,{children:[(0,y.jsxs)(p.MD,{children:[(0,y.jsxs)(p.hI,{children:[(0,y.jsx)(p.Os,{children:qe.total}),(0,y.jsx)(p.v0,{children:"Total Invoices"})]}),(0,y.jsxs)(p.hI,{variant:"warning",children:[(0,y.jsx)(p.Os,{children:qe.pending}),(0,y.jsx)(p.v0,{children:"To Pay"}),(0,y.jsx)(p.d1,{children:(0,s.vv)(qe.pendingAmount,(null===e||void 0===e?void 0:e.defaultCurrency)||"MYR")})]}),(0,y.jsxs)(p.hI,{variant:"info",children:[(0,y.jsx)(p.Os,{children:qe.confirming}),(0,y.jsx)(p.v0,{children:"Confirming"})]}),(0,y.jsxs)(p.hI,{variant:"success",children:[(0,y.jsx)(p.Os,{children:qe.paid}),(0,y.jsx)(p.v0,{children:"Paid"})]})]}),(0,y.jsxs)(h.tU,{children:[(0,y.jsxs)(h.oz,{active:"all"===Pe,onClick:()=>Me("all"),children:["All Invoices",(0,y.jsx)(h.Ex,{count:g.length})]}),(0,y.jsxs)(h.oz,{active:"to_pay"===Pe,onClick:()=>Me("to_pay"),children:["Invoices to Pay",(0,y.jsx)(h.Ex,{count:ae.filter(e=>"pending_payment"===e.status||"overdue"===e.status||"payment_submitted"===e.status).length,variant:"warning"})]})]}),(0,y.jsx)(v,{children:(0,y.jsxs)(j,{children:[(0,y.jsx)(x.DO,{placeholder:"Search invoice, issuer, status...",value:se,onChange:e=>de(e.target.value)}),(0,y.jsxs)(b,{children:[(0,y.jsx)(f,{active:"week"===le&&!pe,onClick:()=>Re("week"),children:"Week"}),(0,y.jsx)(f,{active:"month"===le&&!pe,onClick:()=>Re("month"),children:"Month"}),(0,y.jsx)(f,{active:"year"===le&&!pe,onClick:()=>Re("year"),children:"Year"}),(0,y.jsx)(f,{active:"all"===le&&!pe,onClick:()=>Re("all"),children:"All"}),(0,y.jsx)(w,{type:"date",value:he.start,onChange:e=>$e("start",e.target.value)}),(0,y.jsx)(w,{type:"date",value:he.end,onChange:e=>$e("end",e.target.value)})]})]})}),"all"===Pe&&Ge(We,!0),"to_pay"===Pe&&Ge(Oe,!0)]}),ge&&ye&&(0,y.jsx)(D,{onClick:()=>me(!1),children:(0,y.jsxs)(I,{onClick:e=>e.stopPropagation(),style:{maxWidth:"900px"},children:[(0,y.jsxs)(E,{children:[(0,y.jsxs)(z,{children:["Invoice ",ye.invoiceNumber]}),(0,y.jsx)(N,{onClick:()=>me(!1),children:"\xd7"})]}),(0,y.jsx)(P,{children:(e=>{const t=e.issuerInfo,i=e.payerInfo||(Ie?{name:Ie.companyName,address:Ie.address,city:Ie.city,state:Ie.state,postalCode:Ie.postalCode,country:Ie.country,phone:Ie.phone,email:Ie.email,taxId:Ie.taxNumber,businessRegistration:Ie.registrationNumber}:null);return(0,y.jsxs)(R,{id:"invoice-preview-pdf",children:[(0,y.jsxs)($,{children:[(0,y.jsx)("div",{children:null!==t&&void 0!==t&&t.logoUrl?(0,y.jsx)(T,{src:t.logoUrl,alt:"Company Logo"}):(0,y.jsx)(H,{style:{fontSize:"24px"},children:(null===t||void 0===t?void 0:t.name)||"Company Name"})}),(0,y.jsxs)("div",{children:[(0,y.jsx)(Y,{children:"INVOICE"}),(0,y.jsxs)(U,{children:[(0,y.jsx)(L,{children:(0,y.jsx)("strong",{children:e.invoiceNumber})}),(0,y.jsxs)(L,{children:["Issue Date: ",Ue(e.issueDate)]}),(0,y.jsxs)(L,{children:["Due Date: ",Ue(e.dueDate)]})]})]})]}),(0,y.jsxs)(W,{children:[(0,y.jsxs)(O,{children:[(0,y.jsx)(q,{children:"From"}),(0,y.jsx)(H,{children:(null===t||void 0===t?void 0:t.name)||e.issuerName||"Issuer"}),(null===t||void 0===t?void 0:t.address)&&(0,y.jsx)(J,{children:t.address}),((null===t||void 0===t?void 0:t.city)||(null===t||void 0===t?void 0:t.state)||(null===t||void 0===t?void 0:t.postalCode))&&(0,y.jsx)(J,{children:[t.city,t.state,t.postalCode].filter(Boolean).join(", ")}),(null===t||void 0===t?void 0:t.country)&&(0,y.jsx)(J,{children:t.country}),(null===t||void 0===t?void 0:t.email)&&(0,y.jsx)(J,{children:t.email}),(null===t||void 0===t?void 0:t.phone)&&(0,y.jsx)(J,{children:t.phone}),(null===t||void 0===t?void 0:t.taxId)&&(0,y.jsxs)(J,{children:["Tax ID: ",t.taxId]})]}),(0,y.jsxs)(O,{children:[(0,y.jsx)(q,{children:"Bill To"}),(0,y.jsx)(H,{children:(null===i||void 0===i?void 0:i.name)||(null===Ie||void 0===Ie?void 0:Ie.companyName)||"Customer"}),((null===i||void 0===i?void 0:i.address)||(null===Ie||void 0===Ie?void 0:Ie.address))&&(0,y.jsx)(J,{children:(null===i||void 0===i?void 0:i.address)||(null===Ie||void 0===Ie?void 0:Ie.address)}),((null===i||void 0===i?void 0:i.city)||(null===i||void 0===i?void 0:i.state)||(null===i||void 0===i?void 0:i.postalCode)||(null===Ie||void 0===Ie?void 0:Ie.city))&&(0,y.jsx)(J,{children:[(null===i||void 0===i?void 0:i.city)||(null===Ie||void 0===Ie?void 0:Ie.city),(null===i||void 0===i?void 0:i.state)||(null===Ie||void 0===Ie?void 0:Ie.state),(null===i||void 0===i?void 0:i.postalCode)||(null===Ie||void 0===Ie?void 0:Ie.postalCode)].filter(Boolean).join(", ")}),((null===i||void 0===i?void 0:i.country)||(null===Ie||void 0===Ie?void 0:Ie.country))&&(0,y.jsx)(J,{children:(null===i||void 0===i?void 0:i.country)||(null===Ie||void 0===Ie?void 0:Ie.country)}),((null===i||void 0===i?void 0:i.email)||(null===Ie||void 0===Ie?void 0:Ie.email))&&(0,y.jsx)(J,{children:(null===i||void 0===i?void 0:i.email)||(null===Ie||void 0===Ie?void 0:Ie.email)}),((null===i||void 0===i?void 0:i.phone)||(null===Ie||void 0===Ie?void 0:Ie.phone))&&(0,y.jsx)(J,{children:(null===i||void 0===i?void 0:i.phone)||(null===Ie||void 0===Ie?void 0:Ie.phone)})]})]}),(0,y.jsxs)(Q,{children:[(0,y.jsx)("thead",{children:(0,y.jsxs)("tr",{children:[(0,y.jsx)("th",{children:"Description"}),(0,y.jsx)("th",{children:"Qty"}),(0,y.jsx)("th",{children:"Unit Price"}),(0,y.jsx)("th",{children:"Amount"})]})}),(0,y.jsx)("tbody",{children:e.items&&e.items.length>0?e.items.map((t,i)=>(0,y.jsxs)("tr",{children:[(0,y.jsx)("td",{children:t.description}),(0,y.jsx)("td",{children:t.quantity}),(0,y.jsx)("td",{children:(0,s.vv)(t.unitPrice,e.currency||"MYR")}),(0,y.jsx)("td",{children:(0,s.vv)(t.total,e.currency||"MYR")})]},i)):(0,y.jsxs)("tr",{children:[(0,y.jsx)("td",{children:e.categoryDisplayName||e.planType||"Service"}),(0,y.jsx)("td",{children:"1"}),(0,y.jsx)("td",{children:(0,s.vv)(e.amount,e.currency||"MYR")}),(0,y.jsx)("td",{children:(0,s.vv)(e.amount,e.currency||"MYR")})]})})]}),(0,y.jsx)(G,{children:(0,y.jsxs)(V,{children:[(0,y.jsxs)(Z,{children:[(0,y.jsx)(K,{children:"Subtotal"}),(0,y.jsx)(X,{children:(0,s.vv)(e.amount,e.currency||"MYR")})]}),e.tax>0&&(0,y.jsxs)(Z,{children:[(0,y.jsx)(K,{children:"Tax"}),(0,y.jsx)(X,{children:(0,s.vv)(e.tax,e.currency||"MYR")})]}),(0,y.jsxs)(Z,{highlight:!0,children:[(0,y.jsx)(K,{highlight:!0,children:"Total"}),(0,y.jsx)(X,{highlight:!0,children:(0,s.vv)(e.total,e.currency||"MYR")})]})]})})]})})(ye)}),(0,y.jsxs)(M,{children:[("pending_payment"===ye.status||"overdue"===ye.status)&&(0,y.jsx)(k,{variant:"success",onClick:()=>{me(!1),He(ye)},children:"Pay Now"}),(0,y.jsx)(k,{onClick:()=>Qe(ye),children:"Download PDF"}),(0,y.jsx)(k,{variant:"secondary",onClick:()=>me(!1),children:"Close"})]})]})}),je&&ye&&(0,y.jsx)(D,{onClick:()=>be(!1),children:(0,y.jsxs)(I,{onClick:e=>e.stopPropagation(),style:{maxWidth:"600px"},children:[(0,y.jsxs)(E,{children:[(0,y.jsx)(z,{children:"Submit Payment"}),(0,y.jsx)(N,{onClick:()=>be(!1),children:"\xd7"})]}),(0,y.jsxs)(P,{children:[(0,y.jsxs)("div",{style:{marginBottom:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,y.jsxs)("p",{style:{margin:"0 0 8px 0",fontSize:"14px",color:"#6B7280"},children:["Invoice: ",(0,y.jsx)("strong",{children:ye.invoiceNumber})]}),(0,y.jsx)("p",{style:{margin:"0",fontSize:"20px",fontWeight:"700",color:"#0A2540"},children:(0,s.vv)(ye.total,ye.currency)})]}),ke?(0,y.jsx)("div",{style:{textAlign:"center",padding:"20px",color:"#6B7280"},children:"Loading payment methods..."}):0===fe.length?(0,y.jsx)("div",{style:{padding:"16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:(0,y.jsxs)("p",{style:{margin:0,color:"#92400E"},children:["No payment methods configured for ",ye.currency,". Please contact the administrator."]})}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(ee,{children:[(0,y.jsx)(te,{children:"Payment Method *"}),(0,y.jsx)(ne,{value:Ae.paymentMethod,onChange:e=>Be(t=>({...t,paymentMethod:e.target.value})),children:fe.map(e=>(0,y.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(()=>{const e=fe.find(e=>e.id===Ae.paymentMethod);return e?(0,y.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px"},children:["bank_transfer"===e.id&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:"Bank Transfer Details"}),(0,y.jsxs)("div",{style:{fontSize:"14px",lineHeight:"1.8"},children:[(0,y.jsxs)("p",{style:{margin:"0"},children:[(0,y.jsx)("strong",{children:"Bank:"})," ",e.bankName]}),(0,y.jsxs)("p",{style:{margin:"0"},children:[(0,y.jsx)("strong",{children:"Account Number:"})," ",e.accountNumber]}),(0,y.jsxs)("p",{style:{margin:"0"},children:[(0,y.jsx)("strong",{children:"Account Name:"})," ",e.accountName]})]})]}),"qr_payment"===e.id&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:"QR Payment"}),e.qrImage&&(0,y.jsx)("div",{style:{textAlign:"center",marginBottom:"12px"},children:(0,y.jsx)("img",{src:e.qrImage,alt:"Payment QR Code",style:{maxWidth:"200px",maxHeight:"200px",border:"1px solid #E5E7EB",borderRadius:"8px"}})}),e.qrDescription&&(0,y.jsx)("p",{style:{margin:0,fontSize:"13px",color:"#6B7280",textAlign:"center"},children:e.qrDescription})]}),"stripe"===e.id&&(0,y.jsx)("p",{style:{margin:0,fontSize:"14px",color:"#1E40AF"},children:"Pay securely with your credit/debit card via Stripe."}),"paypal"===e.id&&(0,y.jsx)("p",{style:{margin:0,fontSize:"14px",color:"#1E40AF"},children:"Pay with your PayPal account or card."})]}):null})()]}),(0,y.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px",fontSize:"13px",color:"#92400E",display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,y.jsx)("span",{style:{fontWeight:"600",flexShrink:0},children:"*"}),(0,y.jsxs)("span",{children:["Please provide either a ",(0,y.jsx)("strong",{children:"Transaction ID / Reference Number"})," or upload a ",(0,y.jsx)("strong",{children:"Payment Receipt Image"})," to submit your payment."]})]}),(0,y.jsxs)(ee,{children:[(0,y.jsx)(te,{children:"Transaction ID / Reference Number"}),(0,y.jsx)(ie,{type:"text",placeholder:"Enter transaction ID or reference number",value:Ae.transactionId,onChange:e=>Be(t=>({...t,transactionId:e.target.value}))})]}),(()=>{const e=fe.find(e=>e.id===Ae.paymentMethod);return!e||"bank_transfer"!==e.id&&"qr_payment"!==e.id?null:(0,y.jsxs)(ee,{children:[(0,y.jsx)(te,{children:"Payment Receipt Image"}),(0,y.jsxs)("div",{style:{border:"2px dashed #E6EBF1",borderRadius:"8px",padding:"20px",textAlign:"center",cursor:"pointer",transition:"border-color 0.2s"},children:[Ae.receiptImage?(0,y.jsxs)("div",{children:[(0,y.jsx)("img",{src:Ae.receiptImage,alt:"Receipt",style:{maxWidth:"200px",maxHeight:"200px",marginBottom:"8px",borderRadius:"8px"}}),(0,y.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:"Click to change image"})]}):(0,y.jsxs)("div",{children:[(0,y.jsxs)("svg",{width:"40",height:"40",viewBox:"0 0 24 24",fill:"none",stroke:"#9CA3AF",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",style:{margin:"0 auto 8px"},children:[(0,y.jsx)("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"}),(0,y.jsx)("circle",{cx:"8.5",cy:"8.5",r:"1.5"}),(0,y.jsx)("polyline",{points:"21,15 16,10 5,21"})]}),(0,y.jsx)("p",{style:{margin:"0",fontSize:"14px",color:"#6B7280"},children:"Click to upload receipt image"}),(0,y.jsx)("p",{style:{margin:"4px 0 0 0",fontSize:"12px",color:"#9CA3AF"},children:"Max 5MB, JPG/PNG"})]}),(0,y.jsx)("input",{type:"file",accept:"image/*",onChange:Je,style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0,cursor:"pointer"}})]})]})})(),_e&&(0,y.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",borderRadius:"6px",marginTop:"16px"},children:(0,y.jsx)("p",{style:{margin:0,color:"#DC2626",fontSize:"13px"},children:_e})})]}),(0,y.jsxs)(M,{children:[(0,y.jsx)(k,{variant:"secondary",onClick:()=>be(!1),children:"Cancel"}),(0,y.jsx)(k,{variant:"success",onClick:async()=>{if(ye)if(Ae.transactionId||Ae.receiptImage){Se(!0),De("");try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${ye.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({paymentMethod:Ae.paymentMethod,transactionId:Ae.transactionId,receiptUrl:Ae.receiptImage})});if(t.ok)be(!1),Be({paymentMethod:"",transactionId:"",receiptImage:""}),await Te(),await Ye();else{const e=await t.json();De(e.error||e.message||"Failed to submit payment")}}catch(e){console.error("Error submitting payment:",e),De("Network error. Please check your connection and try again.")}finally{Se(!1)}}else De("Please provide either a Transaction ID or upload a Receipt Image")},disabled:Ce||0===fe.length,children:Ce?"Submitting...":"Submit Payment"})]})]})})]})})}}}]);