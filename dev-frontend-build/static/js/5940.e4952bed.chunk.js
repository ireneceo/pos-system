"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5940],{512:(e,n,t)=>{t.d(n,{x:()=>E,A:()=>R});var i=t(9950),o=t(4752),a=t(5030),r=t(4414);const s=["Su","Mo","Tu","We","Th","Fr","Sa"],d=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[n,t,i]=e.split("-").map(Number);return new Date(n,t-1,i)},c=(e,n)=>e.getFullYear()===n.getFullYear()&&e.getMonth()===n.getMonth()&&e.getDate()===n.getDate(),p=(e,n)=>new Date(e,n).toLocaleDateString("en-US",{month:"long",year:"numeric"}),x=o.Ay.div`
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
`,u=o.Ay.div`
  display: flex;
  gap: 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,g=o.Ay.div`
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
`,m=o.Ay.div``,v=o.Ay.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`,y=o.Ay.button`
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
`,f=o.Ay.div`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 0;
  }
`,b=o.Ay.div`
  @media (max-width: 768px) {
    display: none;
  }
`,j=o.Ay.div`
  width: 252px;

  @media (max-width: 768px) {
    width: 100%;
  }
`,w=o.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,F=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`,k=o.Ay.div`
  text-align: center;
  font-size: 12px;
  color: #9CA3AF;
  font-weight: 500;
  height: 28px;
  line-height: 28px;
`,B=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`,S=o.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,I=o.Ay.div`
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
`,A=e=>{let{startDate:n,endDate:t,onRangeSelect:o,onClose:A,isOpen:C}=e;const{t:E}=(0,a.Bd)("common"),$=new Date,[D,P]=(0,i.useState)($.getMonth()),[z,_]=(0,i.useState)($.getFullYear()),[R,T]=(0,i.useState)(null),[N,M]=(0,i.useState)(null),[W,Y]=(0,i.useState)(null),[U,L]=(0,i.useState)("start"),H=(0,i.useRef)(null);(0,i.useEffect)(()=>{n&&T(l(n)),t&&M(l(t))},[n,t]),(0,i.useEffect)(()=>{C&&L("start")},[C]),(0,i.useEffect)(()=>{const e=e=>{H.current&&!H.current.contains(e.target)&&A()};return C&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[C,A]);const O=(0,i.useCallback)(()=>{0===D?(P(11),_(e=>e-1)):P(e=>e-1)},[D]),q=(0,i.useCallback)(()=>{11===D?(P(0),_(e=>e+1)):P(e=>e+1)},[D]),V=(e,n)=>{const t=((e,n)=>new Date(e,n+1,0).getDate())(e,n),i=((e,n)=>new Date(e,n,1).getDay())(e,n),a=[];for(let o=0;o<i;o++)a.push(null);for(let o=1;o<=t;o++)a.push(new Date(e,n,o));return(0,r.jsxs)(j,{children:[(0,r.jsx)(w,{children:p(e,n)}),(0,r.jsx)(F,{children:s.map(e=>(0,r.jsx)(k,{children:e},e))}),(0,r.jsx)(B,{children:a.map((e,n)=>{if(!e)return(0,r.jsx)(S,{},`e-${n}`);const{isStart:t,isEnd:i,isInRange:a,isHoverEnd:s}=(e=>{const n=R&&c(e,R),t=N&&c(e,N),i="end"===U&&W?W:N;let o=!1;if(R&&i){const[n,t]=R<=i?[R,i]:[i,R];o=((e,n,t)=>{const i=e.getTime();return i>n.getTime()&&i<t.getTime()})(e,n,t)}return{isStart:n,isEnd:t,isInRange:o,isHoverEnd:"end"===U&&W&&c(e,W)}})(e),l=c(e,$);return(0,r.jsx)(I,{$isStart:!!t,$isEnd:!!i,$isInRange:a,$isHoverEnd:!!s,$isToday:l,onClick:()=>(e=>{if("start"===U)T(e),M(null),L("end");else{let n=R,t=e;t<n&&([n,t]=[t,n]),T(n),M(t),L("start"),o(d(n),d(t)),setTimeout(A,200)}})(e),onMouseEnter:()=>Y(e),onMouseLeave:()=>Y(null),children:e.getDate()},e.getTime())})})]})},J=11===D?0:D+1,G=11===D?z+1:z,Q=e=>{const n=new Date;let t;const i=n;switch(e){case"this_week":t=new Date(n),t.setDate(n.getDate()-n.getDay());break;case"this_month":t=new Date(n.getFullYear(),n.getMonth(),1);break;case"this_year":t=new Date(n.getFullYear(),0,1);break;default:return}T(t),M(i),L("start"),o(d(t),d(i)),setTimeout(A,150)};return C?(0,r.jsx)(x,{ref:H,children:(0,r.jsxs)(u,{children:[(0,r.jsxs)(g,{children:[(0,r.jsx)(h,{onClick:()=>Q("this_week"),children:"This Week"}),(0,r.jsx)(h,{onClick:()=>Q("this_month"),children:"This Month"}),(0,r.jsx)(h,{onClick:()=>Q("this_year"),children:"This Year"})]}),(0,r.jsxs)(m,{children:[(0,r.jsxs)(v,{children:[(0,r.jsx)(y,{onClick:O,"aria-label":"Previous month",children:(0,r.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,r.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,r.jsx)(y,{onClick:q,"aria-label":"Next month",children:(0,r.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,r.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,r.jsxs)(f,{children:[V(z,D),(0,r.jsx)(b,{children:V(G,J)})]})]})]})}):null},C=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,E=(e,n)=>{const t=(e=>{if(!e)return new Date;try{const n=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[t,i,o]=n.split("-").map(Number);return new Date(t,i-1,o)}catch{return new Date}})(n);let i=new Date(t);const o=new Date(t);switch(e){case"today":break;case"yesterday":i.setDate(t.getDate()-1),o.setDate(t.getDate()-1);break;case"week":i.setDate(t.getDate()-6);break;case"month":i.setDate(t.getDate()-29);break;case"year":i.setDate(t.getDate()-364);break;case"all":i=new Date(2020,0,1)}return{start:C(i),end:C(o)}},$=o.Ay.div`
  margin-bottom: 24px;
`,D=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,P=o.Ay.button`
  padding: 8px 16px;
  background: ${e=>e.active?"#635BFF":"#FFFFFF"};
  color: ${e=>e.active?"#FFFFFF":"#6B7C93"};
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>e.active?"#5A51E6":"#F8FAFC"};
    border-color: ${e=>e.active?"#5A51E6":"#CBD5E1"};
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`,z=o.Ay.div`
  position: relative;
  display: inline-block;
`,_=o.Ay.button`
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

  &:hover {
    border-color: #635BFF;
    background: #F8F7FF;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
    gap: 6px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 6px 10px;
    gap: 6px;
  }
`,R=e=>{let{activePeriod:n,dateRange:t,isCustomDateRange:o,onPeriodChange:s,onCalendarRangeSelect:d,includeToday:l=!1,children:c}=e;const{t:p}=(0,a.Bd)("common"),[x,u]=(0,i.useState)(!1),g=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],h={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,r.jsx)($,{children:(0,r.jsxs)(D,{children:[g.map(e=>(0,r.jsx)(P,{active:n===e&&!o,onClick:()=>s(e),children:h[e]},e)),(0,r.jsxs)(z,{children:[(0,r.jsxs)(_,{active:o,onClick:()=>u(!x),children:[(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,r.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,r.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,r.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),t.start&&t.end?`${t.start} ~ ${t.end}`:"Custom Range"]}),(0,r.jsx)(A,{isOpen:x,startDate:t.start,endDate:t.end,onRangeSelect:(e,n)=>{d(e,n),u(!1)},onClose:()=>u(!1)})]}),c]})})}},4757:(e,n,t)=>{t.d(n,{A:()=>h});var i=t(9950),o=t(7202),a=t(1627),r=t(4752),s=t(9246),d=t(4414);const l=e=>{let{onSuccess:n,onError:t}=e;const o=(0,a.t2)(),r=(0,a.HH)(),[s,l]=(0,i.useState)(!1),[u,g]=(0,i.useState)("");return(0,d.jsxs)(c,{onSubmit:async e=>{if(e.preventDefault(),!o||!r)return;l(!0),g("");const{error:i}=await o.confirmPayment({elements:r,confirmParams:{return_url:`${window.location.origin}/pos/invoices`},redirect:"if_required"});i?(g(i.message||"Payment failed"),t(i.message||"Payment failed"),l(!1)):n()},children:[(0,d.jsx)(a.He,{}),(0,d.jsx)(p,{type:"submit",disabled:!o||s,children:s?"Processing...":"Pay Now"}),u&&(0,d.jsx)(x,{children:u})]})},c=r.Ay.form`
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
`,g=r.Ay.div`
  padding: 16px;
  background: #FEF2F2;
  color: #DC2626;
  border: 1px solid #FECACA;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`,h=e=>{let{invoiceId:n,onSuccess:t,onError:r}=e;const[c,p]=(0,i.useState)(null),[x,h]=(0,i.useState)(""),[m,v]=(0,i.useState)(!0),[y,f]=(0,i.useState)("");return(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),t=await s.A.post(`/api/invoices/${n}/create-payment-intent`,{},{headers:{Authorization:`Bearer ${e}`}});if(t.data.success){const{clientSecret:e,publishableKey:n}=t.data;if(!n)throw new Error("Stripe publishable key not configured");p((0,o.c)(n)),h(e)}}catch(i){var e,t;const n=(null===(e=i.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.error)||i.message||"Failed to initialize payment";f(n),r(n)}finally{v(!1)}})()},[n]),m?(0,d.jsx)(u,{children:"Initializing payment..."}):y?(0,d.jsx)(g,{children:y}):x&&c?(0,d.jsx)(a.S8,{stripe:c,options:{clientSecret:x,appearance:{theme:"stripe",variables:{colorPrimary:"#635BFF",borderRadius:"8px"}}},children:(0,d.jsx)(l,{onSuccess:t,onError:r})}):(0,d.jsx)(g,{children:"Payment initialization failed. Please try again."})}},5940:(e,n,t)=>{t.r(n),t.d(n,{default:()=>C});var i=t(9950),o=t(4752),a=t(4492),r=t(6038),s=t(4728),d=t(8409),l=t(2488),c=t(2597),p=t(5612),x=t(1052),u=t.n(x),g=t(4757),h=t(512),m=t(5030),v=t(4414);const y=o.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #0A2540;
  background: white;
  min-width: 180px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,f=(0,o.Ay)(s.SC)``,b=o.Ay.div``,j=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,w=o.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,F=o.Ay.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`,k=(0,o.Ay)(s.Wh)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`,B=o.Ay.button`
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

  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    padding: 6px 12px;\n\n    &:hover {\n      background: #4B45C6;\n    }\n  ":"success"===e.variant?"\n    background: #10B981;\n    color: white;\n    border-color: #10B981;\n    padding: 6px 12px;\n\n    &:hover {\n      background: #059669;\n    }\n  ":"danger"===e.variant?"\n    background: #FEF2F2;\n    color: #EF4444;\n    border-color: #EF4444;\n    padding: 6px 12px;\n\n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"email"===e.variant?"\n    background: white;\n    color: #3B82F6;\n    border-color: #3B82F6;\n\n    &:hover {\n      background: #EFF6FF;\n    }\n  ":"\n    background: white;\n    color: #374151;\n    border-color: #D1D5DB;\n\n    &:hover {\n      background: #F9FAFB;\n      border-color: #9CA3AF;\n    }\n  "}
`,S=o.Ay.div`
  margin-bottom: 16px;
`,I=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`,A=o.Ay.input`
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
`,C=()=>{const{t:e}=(0,m.Bd)("owner"),[n,t]=(0,a.ok)(),[o,s]=(0,i.useState)([]),[x,C]=(0,i.useState)([]),[E,$]=(0,i.useState)([]),[D,P]=(0,i.useState)(""),[z,_]=(0,i.useState)(""),[R,T]=(0,i.useState)("month"),[N,M]=(0,i.useState)(!1),[W,Y]=(0,i.useState)(()=>(0,h.x)("month")),[U,L]=(0,i.useState)(!1),[H,O]=(0,i.useState)(null),[q,V]=(0,i.useState)(!1),[J,G]=(0,i.useState)([]),[Q,K]=(0,i.useState)(!1),[Z,X]=(0,i.useState)({paymentMethod:"",transactionId:"",receiptImage:"",notes:""}),[ee,ne]=(0,i.useState)(!1),[te,ie]=(0,i.useState)(""),oe=n.get("tab")||"all",ae=e=>{t({tab:e})},re=e=>{var n,t;return{id:(null===(n=e.id)||void 0===n?void 0:n.toString())||"",invoiceNumber:e.invoice_number||"",issueDate:e.issued_at||e.issue_date||"",dueDate:e.due_date||"",paidDate:e.paid_at||e.paid_date||"",status:e.status||"",currency:e.currency||"MYR",amount:parseFloat(e.subtotal||e.amount||0),tax:parseFloat(e.tax_amount||e.tax||0),total:parseFloat(e.total_amount||e.total||0),items:e.items||[],billingPeriod:e.billing_period_start&&e.billing_period_end?`${le(e.billing_period_start)} - ${le(e.billing_period_end)}`:"",planType:e.category_display_name||e.plan_type||"Service",paymentMethod:e.payment_method||"",transactionId:e.transaction_id||"",receiptUrl:e.receipt_url||"",hasPaymentInfo:!!e.transaction_id||!!e.receipt_url,type:e.type||"manual",payerType:e.payer_type||"restaurant",payerId:(null===(t=e.payer_id)||void 0===t?void 0:t.toString())||"",invoiceCategory:e.invoice_category||"",categoryDisplayName:e.category_display_name||"",issuerType:e.issuer_type||e.issuerType||"system_admin",issuerId:e.issuer_id||e.issuerId||null,issuerName:e.issuer_name||e.issuerName||"",restaurantId:e.restaurant_id,restaurantName:e.restaurant_name||"",issuerInfo:e.issuerInfo||e.issuer_info||null,payerInfo:e.payerInfo||e.payer_info||null,discountType:e.discount_type||e.discountType||"none",discountValue:parseFloat(e.discount_value||e.discountValue||0),discountAmount:parseFloat(e.discount_amount||e.discountAmount||0),discountReason:e.discount_reason||e.discountReason||null,subtotalBeforeDiscount:parseFloat(e.subtotal||e.subtotalBeforeDiscount||0)||void 0,additionalCharges:e.additional_charges||e.additionalCharges||[]}},se=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return;const n=new URLSearchParams;D&&n.append("restaurant_id",D);const t=await fetch(`/api/owner/invoices?${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();if(e.success){const n=(e.data||[]).map(re);s(n),e.restaurants&&$(e.restaurants)}}}catch(e){console.error("Error fetching all invoices:",e)}},de=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void C([]);const n=new URLSearchParams;D&&n.append("restaurant_id",D);const t=await fetch(`/api/owner/invoices/to-pay?${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();e.success&&C((e.data||[]).map(re))}else C([])}catch(e){console.error("Error fetching invoices to pay:",e),C([])}};(0,i.useEffect)(()=>{se(),de()},[D]);const le=e=>{if(!e)return"-";return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})},ce=e=>(e=>{if("pending_payment"!==e.status)return!1;const n=new Date;return new Date(e.dueDate)<n})(e)?"overdue":e.status,pe=e=>({draft:"Draft",pending_payment:"Pending",payment_submitted:"Confirming",paid:"Paid",overdue:"Overdue",cancelled:"Cancelled"}[e]||e),xe=e=>e.filter(e=>{var n,t,i,o,a;const r=z.toLowerCase(),s=!z||(null===(n=e.invoiceNumber)||void 0===n?void 0:n.toLowerCase().includes(r))||(null===(t=e.issuerName)||void 0===t?void 0:t.toLowerCase().includes(r))||(null===(i=e.restaurantName)||void 0===i?void 0:i.toLowerCase().includes(r))||(null===(o=e.status)||void 0===o?void 0:o.toLowerCase().includes(r))||(null===(a=e.categoryDisplayName)||void 0===a?void 0:a.toLowerCase().includes(r)),d=new Date(e.issueDate),l=new Date(W.start),c=new Date(W.end);c.setHours(23,59,59,999);return s&&(d>=l&&d<=c)}),ue=xe(o),ge=xe(x),he={total:o.length,pending:o.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length,confirming:o.filter(e=>"payment_submitted"===e.status).length,paid:o.filter(e=>"paid"===e.status).length,totalAmount:o.reduce((e,n)=>e+(n.total||0),0),pendingAmount:o.filter(e=>"pending_payment"===e.status||"overdue"===e.status).reduce((e,n)=>e+(n.total||0),0)},me=async e=>{try{const n=localStorage.getItem("auth_token");(await fetch(`/api/invoices/${e.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{}},body:JSON.stringify({status:"paid",paid_amount:0,payment_notes:"Free invoice - confirmed by recipient"})})).ok&&se()}catch(n){console.error("Failed to confirm free invoice:",n)}},ve=async e=>{O(e),ie(""),X({paymentMethod:"",transactionId:"",receiptImage:"",notes:""}),await(async(e,n,t)=>{K(!0);try{let i=`/api/admin/payment-settings/available/${e}`;"brand"===n&&t?i=`/api/brands/${t}/payment-settings/available/${e}`:"foodcourt"===n&&t&&(i=`/api/foodcourts/${t}/payment-settings/available/${e}`);const o=localStorage.getItem("auth_token"),a=await fetch(i,{headers:{Authorization:`Bearer ${o}`}});if(a.ok){const e=await a.json();G(e.methods||[]),e.methods&&e.methods.length>0&&X(n=>({...n,paymentMethod:e.methods[0].id}))}}catch(i){console.error("Error fetching payment methods:",i)}finally{K(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId),V(!0)},ye=e=>{const n=e.issuerInfo,t=e.payerInfo;return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${null!==n&&void 0!==n&&n.logoUrl?`<img src="${n.logoUrl}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name" style="${null!==n&&void 0!==n&&n.logoUrl?"font-size: 14px;":""}">${(null===n||void 0===n?void 0:n.name)||e.issuerName||"Issuer"}</div>\n                <div class="company-details">\n                    ${null!==n&&void 0!==n&&n.address?`${n.address}<br>`:""}\n                    ${[null===n||void 0===n?void 0:n.city,null===n||void 0===n?void 0:n.state,null===n||void 0===n?void 0:n.postalCode].filter(Boolean).join(", ")}${null!==n&&void 0!==n&&n.city||null!==n&&void 0!==n&&n.state||null!==n&&void 0!==n&&n.postalCode?"<br>":""}\n                    ${null!==n&&void 0!==n&&n.country?`${n.country}<br>`:""}\n                    ${null!==n&&void 0!==n&&n.phone?`Tel: ${n.phone}<br>`:""}\n                    ${null!==n&&void 0!==n&&n.email?`Email: ${n.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">{t('owner:ownerInvoicesPage.invoice')}</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">{t('owner:ownerInvoicesPage.billTo')}</div>\n                <div class="customer-name">${(null===t||void 0===t?void 0:t.name)||e.restaurantName||"Restaurant"}</div>\n                ${null!==t&&void 0!==t&&t.address?`<div class="customer-details">${t.address}</div>`:""}\n                ${[null===t||void 0===t?void 0:t.city,null===t||void 0===t?void 0:t.state,null===t||void 0===t?void 0:t.postalCode].filter(Boolean).length>0?`<div class="customer-details">${[null===t||void 0===t?void 0:t.city,null===t||void 0===t?void 0:t.state,null===t||void 0===t?void 0:t.postalCode].filter(Boolean).join(", ")}</div>`:""}\n                ${null!==t&&void 0!==t&&t.country?`<div class="customer-details">${t.country}</div>`:""}\n                ${null!==t&&void 0!==t&&t.email?`<div class="customer-details">${t.email}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${le(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${le(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${le(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">{t('owner:ownerInvoicesPage.items')}</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>{t('owner:ownerInvoicesPage.description')}</th>\n                        <th class="text-center">{t('owner:ownerInvoicesPage.qty')}</th>\n                        <th class="text-right">{t('owner:ownerInvoicesPage.unitPrice')}</th>\n                        <th class="text-right">{t('owner:ownerInvoicesPage.amount')}</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items&&e.items.length>0?e.items.map(n=>`\n                    <tr>\n                        <td>${n.description}</td>\n                        <td class="text-center">${n.quantity}</td>\n                        <td class="text-right">${(0,r.vv)(n.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,r.vv)(n.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join(""):`\n                    <tr>\n                        <td>${e.categoryDisplayName||e.planType||"Service"}</td>\n                        <td class="text-center">1</td>\n                        <td class="text-right">${(0,r.vv)(e.amount,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,r.vv)(e.amount,e.currency||"MYR")}</td>\n                    </tr>\n                    `}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,r.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${e.discountType&&"none"!==e.discountType&&e.discountAmount>0?`\n                <div class="summary-row tax" style="color: #15803D;">\n                    <span>Discount${"percentage"===e.discountType?` (${e.discountValue}%)`:""}:</span>\n                    <span>-${(0,r.vv)(e.discountAmount,e.currency||"MYR")}</span>\n                </div>\n                `:""}\n                ${(e.additionalCharges||[]).map(n=>`\n                <div class="summary-row tax">\n                    <span>${n.name} (${n.rate}%):</span>\n                    <span>${(0,r.vv)(n.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${(0,r.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${null!==n&&void 0!==n&&n.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">{t('owner:ownerInvoicesPage.paymentDetails')}</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${n.bankName}<br>\n                <strong>Account Name:</strong> ${n.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${n.bankAccount||"-"}\n                ${n.swiftCode?`<br><strong>SWIFT Code:</strong> ${n.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${null!==n&&void 0!==n&&n.taxId||null!==n&&void 0!==n&&n.businessRegistration?`\n        <div class="registration-info">\n            ${n.businessRegistration?`Reg No: ${n.businessRegistration}`:""}\n            ${n.businessRegistration&&n.taxId?" | ":""}\n            ${n.taxId?`Tax No: ${n.taxId}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">{t('owner:ownerInvoicesPage.thankYouForYourBusiness')}</div>\n            <div class="footer-text">{t('owner:ownerInvoicesPage.thisIsAComputergeneratedInvoiceAndDoesNotRequireASignature')}</div>\n        </div>\n    </div>\n</body>\n</html>`},fe=async e=>{try{var n;const t=ye(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const o=i.contentDocument||(null===(n=i.contentWindow)||void 0===n?void 0:n.document);if(!o)throw document.body.removeChild(i),new Error("Could not access iframe document");o.open(),o.write(t),o.close(),await new Promise(async e=>{try{var n;null!==(n=o.fonts)&&void 0!==n&&n.ready&&await o.fonts.ready}catch{}const t=o.querySelectorAll("img");await Promise.all(Array.from(t).map(e=>e.complete?Promise.resolve():new Promise(n=>{e.onload=n,e.onerror=n}))),setTimeout(e,100)});const a=await u()(o.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const r=a.toDataURL("image/png"),s=new p.default({orientation:"portrait",unit:"mm",format:"a4"}),d=210,l=a.height*d/a.width;s.addImage(r,"PNG",0,0,d,l),s.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(t){console.error("Error generating PDF:",t)}},be=e=>{const n=ye(e),t=window.open("","_blank","width=800,height=600");t&&(t.document.write(n),t.document.close(),setTimeout(()=>{t.print()},250))},je=function(n){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,v.jsx)(d.an,{children:(0,v.jsxs)(d.bQ,{children:[(0,v.jsx)(d.B_,{children:(0,v.jsxs)("tr",{children:[(0,v.jsx)(d.gU,{align:"left",children:e("owner:ownerInvoicesPage.invoice")}),(0,v.jsx)(d.gU,{align:"left",children:e("owner:ownerInvoicesPage.restaurant")}),(0,v.jsx)(d.gU,{align:"left",children:e("owner:ownerInvoicesPage.issuer")}),(0,v.jsx)(d.gU,{align:"center",children:e("owner:ownerInvoicesPage.period")}),(0,v.jsx)(d.gU,{align:"center",children:e("owner:ownerInvoicesPage.issued")}),(0,v.jsx)(d.gU,{align:"center",children:e("owner:ownerInvoicesPage.due")}),(0,v.jsx)(d.gU,{align:"center",children:e("owner:ownerInvoicesPage.status")}),(0,v.jsx)(d.gU,{align:"right",children:e("owner:ownerInvoicesPage.amount")}),(0,v.jsx)(d.gU,{align:"right",children:e("owner:ownerInvoicesPage.total")}),(0,v.jsx)(d.gU,{align:"left",children:e("owner:ownerInvoicesPage.actions")})]})}),(0,v.jsx)("tbody",{children:n.length>0?n.map(n=>(0,v.jsxs)(d.J2,{children:[(0,v.jsx)(d.Bv,{"data-label":"Invoice",align:"left",children:(0,v.jsxs)(b,{children:[(0,v.jsxs)(j,{children:[n.invoiceNumber,"automatic"===n.type&&(0,v.jsx)(F,{style:{marginLeft:"6px"},children:e("owner:ownerInvoicesPage.auto")})]}),(0,v.jsx)(w,{children:n.categoryDisplayName||n.planType||"Service"})]})}),(0,v.jsx)(d.Bv,{"data-label":"Restaurant",align:"left",children:(0,v.jsx)("span",{style:{fontSize:"13px",fontWeight:500,color:"#0A2540"},children:n.restaurantName||"-"})}),(0,v.jsx)(d.Bv,{"data-label":"Issuer",align:"left",children:(0,v.jsx)(b,{children:(0,v.jsx)(j,{children:n.issuerName||("system_admin"===n.issuerType?"System Admin":"brand"===n.issuerType?"Brand":"Foodcourt")})})}),(0,v.jsx)(d.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:n.billingPeriod||"-"}),(0,v.jsx)(d.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:le(n.issueDate)}),(0,v.jsx)(d.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:le(n.dueDate)}),(0,v.jsx)(d.Bv,{"data-label":"Status",align:"center",children:(0,v.jsx)(k,{status:ce(n),children:pe(ce(n))})}),(0,v.jsx)(d.Bv,{"data-label":"Amount",align:"right",children:(0,v.jsx)(d.DM,{children:(0,r.vv)(n.amount,n.currency||"MYR")})}),(0,v.jsx)(d.Bv,{"data-label":"Total",align:"right",children:(0,v.jsx)(d.DM,{highlight:!0,children:0===Number(n.total)?(0,v.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:e("owner:ownerInvoicesPage.free")}):(0,r.vv)(n.total,n.currency||"MYR")})}),(0,v.jsx)(d.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,v.jsxs)(d.wr,{children:[(0,v.jsx)(B,{variant:"primary",onClick:()=>(e=>{O(e),L(!0)})(n),children:"View"}),t&&("sent"===n.status||"pending_payment"===n.status||"overdue"===n.status)&&Number(n.total)>0&&(0,v.jsx)(B,{variant:"success",onClick:()=>ve(n),children:"Pay"}),t&&("sent"===n.status||"pending_payment"===n.status||"overdue"===n.status)&&0===Number(n.total)&&(0,v.jsx)(B,{variant:"success",onClick:()=>me(n),children:"Confirm"}),(0,v.jsx)(B,{onClick:()=>fe(n),title:"Download PDF",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,v.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,v.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,v.jsx)(B,{onClick:()=>be(n),title:"Print Invoice",children:(0,v.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,v.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,v.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,v.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})})]},n.id)):(0,v.jsx)(d.J2,{children:(0,v.jsx)(d.Bv,{colSpan:10,children:(0,v.jsx)(d.ys,{children:e("owner:ownerInvoicesPage.noInvoicesFound")})})})})]})})};return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(d.mc,{children:[(0,v.jsx)(d.Y9,{children:(0,v.jsx)(d.hE,{children:e("owner:ownerInvoicesPage.invoices")})}),(0,v.jsxs)(d.UC,{children:[(0,v.jsxs)(d.MD,{children:[(0,v.jsxs)(d.hI,{children:[(0,v.jsx)(d.Os,{children:he.total}),(0,v.jsx)(d.v0,{children:e("owner:ownerInvoicesPage.totalInvoices")})]}),(0,v.jsxs)(d.hI,{color:"#F59E0B",children:[(0,v.jsx)(d.Os,{children:he.pending}),(0,v.jsx)(d.v0,{children:e("owner:ownerInvoicesPage.toPay")}),(0,v.jsx)(d.d1,{children:(0,r.vv)(he.pendingAmount,"MYR")})]}),(0,v.jsxs)(d.hI,{color:"#3B82F6",children:[(0,v.jsx)(d.Os,{children:he.confirming}),(0,v.jsx)(d.v0,{children:e("owner:ownerInvoicesPage.confirming")})]}),(0,v.jsxs)(d.hI,{color:"#10B981",children:[(0,v.jsx)(d.Os,{children:he.paid}),(0,v.jsx)(d.v0,{children:e("owner:ownerInvoicesPage.paid")})]})]}),(0,v.jsxs)(c.tU,{children:[(0,v.jsxs)(c.oz,{active:"all"===oe,onClick:()=>ae("all"),children:["All Invoices",(0,v.jsx)(c.Ex,{count:o.length})]}),(0,v.jsxs)(c.oz,{active:"to_pay"===oe,onClick:()=>ae("to_pay"),children:["Invoices to Pay",(0,v.jsx)(c.Ex,{count:x.filter(e=>"pending_payment"===e.status||"overdue"===e.status||"payment_submitted"===e.status).length,variant:"warning"})]})]}),(0,v.jsxs)(h.A,{activePeriod:R,dateRange:W,isCustomDateRange:N,onPeriodChange:e=>{T(e),M(!1),Y((0,h.x)(e))},onCalendarRangeSelect:(e,n)=>{M(!0),T("all"),Y({start:e,end:n})},children:[(0,v.jsxs)(y,{value:D,onChange:e=>P(e.target.value),children:[(0,v.jsx)("option",{value:"",children:e("owner:ownerInvoicesPage.allRestaurants")}),E.map(e=>(0,v.jsx)("option",{value:e.id,children:e.name},e.id))]}),(0,v.jsx)(l.DO,{placeholder:"Search invoice, issuer, restaurant...",value:z,onChange:e=>_(e.target.value)})]}),"all"===oe&&je(ue,!0),"to_pay"===oe&&je(ge,!0)]}),U&&H&&(()=>{const n=H.issuerInfo,t=H.payerInfo;return(0,v.jsxs)(d.aF,{isOpen:!0,onClose:()=>L(!1),title:"Invoice Details",size:"large",footer:(0,v.jsxs)(v.Fragment,{children:[("sent"===H.status||"pending_payment"===H.status||"overdue"===H.status)&&Number(H.total)>0&&(0,v.jsx)(f,{variant:"success",onClick:()=>{L(!1),ve(H)},children:" Pay Now "}),("sent"===H.status||"pending_payment"===H.status||"overdue"===H.status)&&0===Number(H.total)&&(0,v.jsx)(f,{variant:"success",onClick:()=>{L(!1),me(H)},children:" Confirm "})," ",(0,v.jsx)(f,{onClick:()=>fe(H),children:" Download PDF "}),(0,v.jsx)(f,{onClick:()=>be(H),children:" Print "}),(0,v.jsx)(f,{variant:"secondary",onClick:()=>L(!1),children:" Close "})]}),children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===n||void 0===n?void 0:n.logoUrl)&&(0,v.jsx)("img",{src:n.logoUrl,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,v.jsx)("div",{style:{fontSize:null!==n&&void 0!==n&&n.logoUrl?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===n||void 0===n?void 0:n.name)||H.issuerName||"Issuer"}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===n||void 0===n?void 0:n.address)&&(0,v.jsx)("div",{children:n.address}),((null===n||void 0===n?void 0:n.city)||(null===n||void 0===n?void 0:n.state)||(null===n||void 0===n?void 0:n.postalCode))&&(0,v.jsx)("div",{children:[null===n||void 0===n?void 0:n.city,null===n||void 0===n?void 0:n.state,null===n||void 0===n?void 0:n.postalCode].filter(Boolean).join(", ")}),(null===n||void 0===n?void 0:n.country)&&(0,v.jsx)("div",{children:n.country}),(null===n||void 0===n?void 0:n.phone)&&(0,v.jsxs)("div",{children:["Tel: ",n.phone]}),(null===n||void 0===n?void 0:n.email)&&(0,v.jsxs)("div",{children:["Email: ",n.email]})]})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:e("owner:ownerInvoicesPage.invoice")}),(0,v.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:H.invoiceNumber}),(0,v.jsx)(k,{status:H.status,style:{marginTop:"8px"},children:pe(H.status)})]})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,v.jsxs)("div",{style:{flex:1},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:e("owner:ownerInvoicesPage.billTo")}),(0,v.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:(null===t||void 0===t?void 0:t.name)||H.restaurantName||"Restaurant"}),(null===t||void 0===t?void 0:t.address)&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:t.address}),((null===t||void 0===t?void 0:t.city)||(null===t||void 0===t?void 0:t.state)||(null===t||void 0===t?void 0:t.postalCode))&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:[null===t||void 0===t?void 0:t.city,null===t||void 0===t?void 0:t.state,null===t||void 0===t?void 0:t.postalCode].filter(Boolean).join(", ")}),(null===t||void 0===t?void 0:t.country)&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:t.country}),(null===t||void 0===t?void 0:t.email)&&(0,v.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:t.email})]}),(0,v.jsxs)("div",{style:{textAlign:"right"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:H.billingPeriod||"-"})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:le(H.issueDate)})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:le(H.dueDate)})]}),H.paidDate&&(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,v.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,v.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:le(H.paidDate)})]})]})]}),H.restaurantName&&(0,v.jsxs)("div",{style:{padding:"12px 16px",background:"#F0F0FF",borderRadius:"8px",marginBottom:"24px",fontSize:"13px",color:"#635BFF"},children:[(0,v.jsx)("strong",{children:"Restaurant:"})," ",H.restaurantName]}),(0,v.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:e("owner:ownerInvoicesPage.items")}),(0,v.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,v.jsx)("thead",{children:(0,v.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,v.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:e("owner:ownerInvoicesPage.description")}),(0,v.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:e("owner:ownerInvoicesPage.qty")}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:e("owner:ownerInvoicesPage.unitPrice")}),(0,v.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:e("owner:ownerInvoicesPage.amount")})]})}),(0,v.jsx)("tbody",{children:H.items&&H.items.length>0?H.items.map((e,n)=>(0,v.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(e.unitPrice,H.currency||"MYR")}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(e.total,H.currency||"MYR")})]},n)):(0,v.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:H.categoryDisplayName||H.planType||"Service"}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:"1"}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(H.amount,H.currency||"MYR")}),(0,v.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,r.vv)(H.amount,H.currency||"MYR")})]})})]})]}),(0,v.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,v.jsxs)("div",{style:{width:"280px"},children:[(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#6B7280"},children:[(0,v.jsx)("span",{children:"Subtotal:"}),(0,v.jsx)("span",{children:(0,r.vv)(H.subtotalBeforeDiscount||H.amount,H.currency||"MYR")})]}),H.discountType&&"none"!==H.discountType&&H.discountAmount>0&&(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#15803D"},children:[(0,v.jsxs)("span",{children:["Discount","percentage"===H.discountType?` (${H.discountValue}%)`:"",":"]}),(0,v.jsxs)("span",{children:["-",(0,r.vv)(H.discountAmount,H.currency||"MYR")]})]}),(H.additionalCharges||[]).map((e,n)=>(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#6B7280"},children:[(0,v.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,v.jsx)("span",{children:(0,r.vv)(e.amount,H.currency||"MYR")})]},n)),0===(H.additionalCharges||[]).length&&H.tax>0&&(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#6B7280"},children:[(0,v.jsx)("span",{children:"Tax:"}),(0,v.jsx)("span",{children:(0,r.vv)(H.tax,H.currency||"MYR")})]}),(0,v.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"16px",fontWeight:"700",color:"#0A2540",background:"#F8FAFC",borderRadius:"6px",marginTop:"8px"},children:[(0,v.jsx)("span",{children:"Total:"}),(0,v.jsx)("span",{children:(0,r.vv)(H.total,H.currency||"MYR")})]})]})}),(null===n||void 0===n?void 0:n.bankName)&&(0,v.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,v.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:e("owner:ownerInvoicesPage.paymentDetails")}),(0,v.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Bank:"})," ",n.bankName]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Name:"})," ",n.bankAccountName||"-"]}),(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"Account Number:"})," ",n.bankAccount||"-"]}),n.swiftCode&&(0,v.jsxs)("div",{children:[(0,v.jsx)("strong",{children:"SWIFT Code:"})," ",n.swiftCode]})]})]}),((null===n||void 0===n?void 0:n.taxId)||(null===n||void 0===n?void 0:n.businessRegistration))&&(0,v.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===n||void 0===n?void 0:n.businessRegistration)&&(0,v.jsxs)("span",{children:["Reg No: ",n.businessRegistration]}),(null===n||void 0===n?void 0:n.businessRegistration)&&(null===n||void 0===n?void 0:n.taxId)&&(0,v.jsx)("span",{children:" | "}),(null===n||void 0===n?void 0:n.taxId)&&(0,v.jsxs)("span",{children:["Tax No: ",n.taxId]})]})]})})(),q&&H&&(0,v.jsxs)(d.aF,{isOpen:!0,onClose:()=>V(!1),title:"Submit Payment",footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(f,{variant:"secondary",onClick:()=>V(!1),children:" Cancel "})," ",Z.paymentMethod&&"stripe"!==Z.paymentMethod&&"paypal"!==Z.paymentMethod&&(0,v.jsxs)(f,{variant:"success",onClick:async()=>{if(H)if(Z.transactionId||Z.receiptImage){ne(!0),ie("");try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/invoices/${H.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:Z.paymentMethod,transaction_id:Z.transactionId,notes:Z.notes||null,receipt_url:Z.receiptImage||null})});if(n.ok)V(!1),X({paymentMethod:"",transactionId:"",receiptImage:"",notes:""}),await se(),await de(),window.dispatchEvent(new Event("refreshBadgeCounts"));else{const e=await n.json();ie(e.error||e.message||"Failed to submit payment")}}catch(e){console.error("Error submitting payment:",e),ie("Network error. Please check your connection and try again.")}finally{ne(!1)}}else ie("Please provide either a Transaction ID or upload a Receipt Image")},disabled:ee||0===J.length,children:[" ",ee?"Submitting...":"Submit Payment"," "]})]}),children:[(0,v.jsxs)("div",{style:{marginBottom:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,v.jsxs)("p",{style:{margin:"0 0 4px 0",fontSize:"13px",color:"#6B7280"},children:[H.restaurantName&&(0,v.jsxs)("span",{children:[H.restaurantName," \xb7 "]}),"Invoice: ",(0,v.jsx)("strong",{children:H.invoiceNumber})]}),(0,v.jsx)("p",{style:{margin:"0",fontSize:"20px",fontWeight:"700",color:"#0A2540"},children:(0,r.vv)(H.total,H.currency)})]}),Q?(0,v.jsx)("div",{style:{textAlign:"center",padding:"20px",color:"#6B7280"},children:e("owner:ownerInvoicesPage.loadingPaymentMethods")}):0===J.length?(0,v.jsxs)("div",{style:{padding:"20px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,v.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#92400E",fontSize:"15px"},children:e("owner:ownerInvoicesPage.paymentNotAvailable")}),(0,v.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:[(0,v.jsx)("strong",{children:H.issuerName||("brand"===H.issuerType?"Brand":"foodcourt"===H.issuerType?"Foodcourt":"System Admin")})," has not configured payment methods for ",(0,v.jsx)("strong",{children:H.currency||"MYR"})," yet. Please contact the invoice issuer to set up payment options."]})]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,v.jsx)(I,{children:"Payment Method *"}),(0,v.jsx)("div",{style:{display:"grid",gridTemplateColumns:`repeat(${Math.min(J.length,3)}, 1fr)`,gap:"10px",marginTop:"8px"},children:J.map(e=>(0,v.jsx)("button",{onClick:()=>{X(n=>({...n,paymentMethod:e.id})),ie("")},style:{padding:"12px 16px",minHeight:"44px",borderRadius:"8px",border:"1px solid "+(Z.paymentMethod===e.id?"#635BFF":"#E6EBF1"),background:Z.paymentMethod===e.id?"rgba(99, 91, 255, 0.1)":"white",color:Z.paymentMethod===e.id?"#635BFF":"#374151",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.15s",textAlign:"center"},children:e.name},e.id))})]}),"stripe"===Z.paymentMethod&&H&&(0,v.jsx)(g.A,{invoiceId:H.id,onSuccess:()=>{V(!1),X({paymentMethod:"",transactionId:"",receiptImage:"",notes:""}),se(),de(),window.dispatchEvent(new Event("refreshBadgeCounts"))},onError:()=>{}}),"bank_transfer"===Z.paymentMethod&&(()=>{const n=J.find(e=>"bank_transfer"===e.id);return n?(0,v.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",fontSize:"14px",lineHeight:"1.8"},children:[(0,v.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:e("owner:ownerInvoicesPage.bankTransferDetails")}),(0,v.jsxs)("p",{style:{margin:"0"},children:[(0,v.jsx)("strong",{children:"Bank:"})," ",n.bankName]}),(0,v.jsxs)("p",{style:{margin:"0"},children:[(0,v.jsx)("strong",{children:"Account Number:"})," ",n.accountNumber]}),(0,v.jsxs)("p",{style:{margin:"0"},children:[(0,v.jsx)("strong",{children:"Account Name:"})," ",n.accountName]})]}):null})(),"qr_payment"===Z.paymentMethod&&(()=>{const n=J.find(e=>"qr_payment"===e.id);return n?(0,v.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",textAlign:"center"},children:[(0,v.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:e("owner:ownerInvoicesPage.qrPayment")}),n.qrImage&&(0,v.jsx)("img",{src:n.qrImage,alt:"Payment QR Code",style:{maxWidth:"200px",maxHeight:"200px",border:"1px solid #E5E7EB",borderRadius:"8px"}}),n.qrDescription&&(0,v.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:n.qrDescription})]}):null})(),Z.paymentMethod&&"stripe"!==Z.paymentMethod&&"paypal"!==Z.paymentMethod&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px",fontSize:"13px",color:"#92400E",display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,v.jsx)("span",{style:{fontWeight:"600",flexShrink:0},children:"*"}),(0,v.jsxs)("span",{children:[e("owner:ownerInvoicesPage.pleaseProvideEitherA"),(0,v.jsx)("strong",{children:e("owner:ownerInvoicesPage.transactionIdReferenceNumber")})," or upload a ",(0,v.jsx)("strong",{children:e("owner:ownerInvoicesPage.paymentReceiptImage")})," to submit your payment."]})]}),(0,v.jsxs)(S,{children:[(0,v.jsx)(I,{children:e("owner:ownerInvoicesPage.transactionIdReferenceNumber")}),(0,v.jsx)(A,{type:"text",placeholder:"Enter transaction ID or reference number",value:Z.transactionId,onChange:e=>X(n=>({...n,transactionId:e.target.value}))})]}),(0,v.jsxs)(S,{children:[(0,v.jsx)(I,{children:e("owner:ownerInvoicesPage.notesOptional")}),(0,v.jsx)("textarea",{placeholder:"Any additional information about the payment...",value:Z.notes,onChange:e=>X(n=>({...n,notes:e.target.value})),style:{width:"100%",boxSizing:"border-box",padding:"8px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",minHeight:"60px",resize:"vertical",fontFamily:"inherit"}})]}),(0,v.jsxs)(S,{children:[(0,v.jsx)(I,{children:e("owner:ownerInvoicesPage.paymentReceiptImage")}),(0,v.jsxs)("div",{style:{border:"2px dashed #E6EBF1",borderRadius:"8px",padding:"20px",textAlign:"center",cursor:"pointer",position:"relative"},children:[Z.receiptImage?(0,v.jsxs)("div",{children:[(0,v.jsx)("img",{src:Z.receiptImage,alt:"Receipt",style:{maxWidth:"200px",maxHeight:"200px",marginBottom:"8px",borderRadius:"8px"}}),(0,v.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:e("owner:ownerInvoicesPage.clickToChangeImage")})]}):(0,v.jsxs)("div",{children:[(0,v.jsx)("p",{style:{margin:"0",fontSize:"14px",color:"#6B7280"},children:e("owner:ownerInvoicesPage.clickToUploadReceiptImage")}),(0,v.jsx)("p",{style:{margin:"4px 0 0 0",fontSize:"12px",color:"#9CA3AF"},children:e("owner:ownerInvoicesPage.max5mbJpgpng")})]}),(0,v.jsx)("input",{type:"file",accept:"image/*",onChange:async e=>{var n;const t=null===(n=e.target.files)||void 0===n?void 0:n[0];if(!t)return;if(t.size>5242880)return void ie("Image size must be less than 5MB");const i=new FileReader;i.onload=()=>{X(e=>({...e,receiptImage:i.result}))},i.readAsDataURL(t)},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0,cursor:"pointer"}})]})]})]})]}),te&&(0,v.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",borderRadius:"6px",marginTop:"16px"},children:(0,v.jsx)("p",{style:{margin:0,color:"#DC2626",fontSize:"13px"},children:te})})]})]})})}}}]);