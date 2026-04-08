"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6529],{512:(e,t,n)=>{n.d(t,{x:()=>$,A:()=>R});var i=n(9950),o=n(4752),s=n(5030),a=n(4414);const r=["Su","Mo","Tu","We","Th","Fr","Sa"],d=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,l=e=>{if(!e)return null;const[t,n,i]=e.split("-").map(Number);return new Date(t,n-1,i)},c=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate(),p=(e,t)=>new Date(e,t).toLocaleDateString("en-US",{month:"long",year:"numeric"}),u=o.Ay.div`
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
`,F=o.Ay.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
`,w=o.Ay.div`
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
`,C=o.Ay.div`
  aspect-ratio: 1;
  min-width: 36px;
`,S=o.Ay.div`
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
`,A=e=>{let{startDate:t,endDate:n,onRangeSelect:o,onClose:A,isOpen:E}=e;const{t:$}=(0,s.Bd)("common"),D=new Date,[P,z]=(0,i.useState)(D.getMonth()),[I,_]=(0,i.useState)(D.getFullYear()),[R,T]=(0,i.useState)(null),[N,M]=(0,i.useState)(null),[Y,W]=(0,i.useState)(null),[U,L]=(0,i.useState)("start"),H=(0,i.useRef)(null);(0,i.useEffect)(()=>{t&&T(l(t)),n&&M(l(n))},[t,n]),(0,i.useEffect)(()=>{E&&L("start")},[E]),(0,i.useEffect)(()=>{const e=e=>{H.current&&!H.current.contains(e.target)&&A()};return E&&document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[E,A]);const O=(0,i.useCallback)(()=>{0===P?(z(11),_(e=>e-1)):z(e=>e-1)},[P]),q=(0,i.useCallback)(()=>{11===P?(z(0),_(e=>e+1)):z(e=>e+1)},[P]),V=(e,t)=>{const n=((e,t)=>new Date(e,t+1,0).getDate())(e,t),i=((e,t)=>new Date(e,t,1).getDay())(e,t),s=[];for(let o=0;o<i;o++)s.push(null);for(let o=1;o<=n;o++)s.push(new Date(e,t,o));return(0,a.jsxs)(j,{children:[(0,a.jsx)(F,{children:p(e,t)}),(0,a.jsx)(w,{children:r.map(e=>(0,a.jsx)(k,{children:e},e))}),(0,a.jsx)(B,{children:s.map((e,t)=>{if(!e)return(0,a.jsx)(C,{},`e-${t}`);const{isStart:n,isEnd:i,isInRange:s,isHoverEnd:r}=(e=>{const t=R&&c(e,R),n=N&&c(e,N),i="end"===U&&Y?Y:N;let o=!1;if(R&&i){const[t,n]=R<=i?[R,i]:[i,R];o=((e,t,n)=>{const i=e.getTime();return i>t.getTime()&&i<n.getTime()})(e,t,n)}return{isStart:t,isEnd:n,isInRange:o,isHoverEnd:"end"===U&&Y&&c(e,Y)}})(e),l=c(e,D);return(0,a.jsx)(S,{$isStart:!!n,$isEnd:!!i,$isInRange:s,$isHoverEnd:!!r,$isToday:l,onClick:()=>(e=>{if("start"===U)T(e),M(null),L("end");else{let t=R,n=e;n<t&&([t,n]=[n,t]),T(t),M(n),L("start"),o(d(t),d(n)),setTimeout(A,200)}})(e),onMouseEnter:()=>W(e),onMouseLeave:()=>W(null),children:e.getDate()},e.getTime())})})]})},J=11===P?0:P+1,G=11===P?I+1:I,Q=e=>{const t=new Date;let n;const i=t;switch(e){case"this_week":n=new Date(t),n.setDate(t.getDate()-t.getDay());break;case"this_month":n=new Date(t.getFullYear(),t.getMonth(),1);break;case"this_year":n=new Date(t.getFullYear(),0,1);break;default:return}T(n),M(i),L("start"),o(d(n),d(i)),setTimeout(A,150)};return E?(0,a.jsx)(u,{ref:H,children:(0,a.jsxs)(x,{children:[(0,a.jsxs)(g,{children:[(0,a.jsx)(h,{onClick:()=>Q("this_week"),children:"This Week"}),(0,a.jsx)(h,{onClick:()=>Q("this_month"),children:"This Month"}),(0,a.jsx)(h,{onClick:()=>Q("this_year"),children:"This Year"})]}),(0,a.jsxs)(m,{children:[(0,a.jsxs)(v,{children:[(0,a.jsx)(y,{onClick:O,"aria-label":"Previous month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"15 18 9 12 15 6"})})}),(0,a.jsx)(y,{onClick:q,"aria-label":"Next month",children:(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:(0,a.jsx)("polyline",{points:"9 6 15 12 9 18"})})})]}),(0,a.jsxs)(f,{children:[V(I,P),(0,a.jsx)(b,{children:V(G,J)})]})]})]})}):null},E=e=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`,$=(e,t)=>{const n=(e=>{if(!e)return new Date;try{const t=new Intl.DateTimeFormat("en-CA",{timeZone:e,year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date),[n,i,o]=t.split("-").map(Number);return new Date(n,i-1,o)}catch{return new Date}})(t);let i=new Date(n);const o=new Date(n);switch(e){case"today":break;case"yesterday":i.setDate(n.getDate()-1),o.setDate(n.getDate()-1);break;case"week":i.setDate(n.getDate()-6);break;case"month":i.setDate(n.getDate()-29);break;case"year":i.setDate(n.getDate()-364);break;case"all":i=new Date(2020,0,1)}return{start:E(i),end:E(o)}},D=o.Ay.div`
  margin-bottom: 24px;
`,P=o.Ay.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 6px;
  }
`,z=o.Ay.button`
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
`,I=o.Ay.div`
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
`,R=e=>{let{activePeriod:t,dateRange:n,isCustomDateRange:o,onPeriodChange:r,onCalendarRangeSelect:d,includeToday:l=!1,children:c}=e;const{t:p}=(0,s.Bd)("common"),[u,x]=(0,i.useState)(!1),g=l?["today","yesterday","week","month","year","all"]:["week","month","year","all"],h={today:"Today",yesterday:"Yesterday",week:"Week",month:"Month",year:"Year",all:"All"};return(0,a.jsx)(D,{children:(0,a.jsxs)(P,{children:[g.map(e=>(0,a.jsx)(z,{active:t===e&&!o,onClick:()=>r(e),children:h[e]},e)),(0,a.jsxs)(I,{children:[(0,a.jsxs)(_,{active:o,onClick:()=>x(!u),children:[(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),(0,a.jsx)("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),(0,a.jsx)("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),(0,a.jsx)("line",{x1:"3",y1:"10",x2:"21",y2:"10"})]}),n.start&&n.end?`${n.start} ~ ${n.end}`:"Custom Range"]}),(0,a.jsx)(A,{isOpen:u,startDate:n.start,endDate:n.end,onRangeSelect:(e,t)=>{d(e,t),x(!1)},onClose:()=>x(!1)})]}),c]})})}},4757:(e,t,n)=>{n.d(t,{A:()=>h});var i=n(9950),o=n(7202),s=n(1627),a=n(4752),r=n(9246),d=n(4414);const l=e=>{let{onSuccess:t,onError:n}=e;const o=(0,s.t2)(),a=(0,s.HH)(),[r,l]=(0,i.useState)(!1),[x,g]=(0,i.useState)("");return(0,d.jsxs)(c,{onSubmit:async e=>{if(e.preventDefault(),!o||!a)return;l(!0),g("");const{error:i}=await o.confirmPayment({elements:a,confirmParams:{return_url:`${window.location.origin}/pos/invoices`},redirect:"if_required"});i?(g(i.message||"Payment failed"),n(i.message||"Payment failed"),l(!1)):t()},children:[(0,d.jsx)(s.He,{}),(0,d.jsx)(p,{type:"submit",disabled:!o||r,children:r?"Processing...":"Pay Now"}),x&&(0,d.jsx)(u,{children:x})]})},c=a.Ay.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,p=a.Ay.button`
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
`,u=a.Ay.div`
  color: #DC2626;
  font-size: 14px;
  text-align: center;
`,x=a.Ay.div`
  padding: 24px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,g=a.Ay.div`
  padding: 16px;
  background: #FEF2F2;
  color: #DC2626;
  border: 1px solid #FECACA;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
`,h=e=>{let{invoiceId:t,onSuccess:n,onError:a}=e;const[c,p]=(0,i.useState)(null),[u,h]=(0,i.useState)(""),[m,v]=(0,i.useState)(!0),[y,f]=(0,i.useState)("");return(0,i.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await r.A.post(`/api/invoices/${t}/create-payment-intent`,{},{headers:{Authorization:`Bearer ${e}`}});if(n.data.success){const{clientSecret:e,publishableKey:t}=n.data;if(!t)throw new Error("Stripe publishable key not configured");p((0,o.c)(t)),h(e)}}catch(i){var e,n;const t=(null===(e=i.response)||void 0===e||null===(n=e.data)||void 0===n?void 0:n.error)||i.message||"Failed to initialize payment";f(t),a(t)}finally{v(!1)}})()},[t]),m?(0,d.jsx)(x,{children:"Initializing payment..."}):y?(0,d.jsx)(g,{children:y}):u&&c?(0,d.jsx)(s.S8,{stripe:c,options:{clientSecret:u,appearance:{theme:"stripe",variables:{colorPrimary:"#635BFF",borderRadius:"8px"}}},children:(0,d.jsx)(l,{onSuccess:n,onError:a})}):(0,d.jsx)(g,{children:"Payment initialization failed. Please try again."})}},6529:(e,t,n)=>{n.r(t),n.d(t,{default:()=>$});var i=n(9950),o=n(4752),s=n(4492),a=n(6038),r=n(9018),d=n(1367),l=n(4728),c=n(8409),p=n(2488),u=n(2597),x=n(5612),g=n(4757),h=n(1052),m=n.n(h),v=n(512),y=n(5030),f=n(4414);const b=(0,o.Ay)(l.SC)``,j=o.Ay.div``,F=o.Ay.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,w=o.Ay.div`
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
`,B=(0,o.Ay)(l.Wh)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`,C=o.Ay.button`
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
`,A=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`,E=o.Ay.input`
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
`,$=()=>{const{t:e}=(0,y.Bd)("settings"),{operationSettings:t}=(0,r.Pj)(),{user:n}=(0,d.As)(),{restaurantId:o}=(0,s.g)(),[l,h]=(0,s.ok)(),$=o?parseInt(o):null===n||void 0===n?void 0:n.restaurant_id,[D,P]=(0,i.useState)([]),[z,I]=(0,i.useState)([]),[_,R]=(0,i.useState)(""),[T,N]=(0,i.useState)("month"),[M,Y]=(0,i.useState)(!1),[W,U]=(0,i.useState)(()=>(0,v.x)("month")),[L,H]=(0,i.useState)(!1),[O,q]=(0,i.useState)(null),[V,J]=(0,i.useState)(!1),[G,Q]=(0,i.useState)([]),[K,Z]=(0,i.useState)(!1),[X,ee]=(0,i.useState)(null),[te,ne]=(0,i.useState)({paymentMethod:"",transactionId:"",receiptImage:"",notes:""}),[ie,oe]=(0,i.useState)(!1),[se,ae]=(0,i.useState)(""),[re,de]=(0,i.useState)(null),[,le]=(0,i.useState)({}),ce=l.get("tab")||"all",pe=e=>{h({tab:e})},ue=async()=>{try{const e=localStorage.getItem("auth_token"),t=$||(null===n||void 0===n?void 0:n.restaurant_id);if(!e||!t)return;const i=await fetch(`/api/invoices/restaurant/${t}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){const e=await i.json(),t=(e.data||e||[]).map(e=>{var t,n;return{id:(null===(t=e.id)||void 0===t?void 0:t.toString())||"",invoiceNumber:e.invoice_number||"",issueDate:e.issued_at||e.issue_date||"",dueDate:e.due_date||"",paidDate:e.paid_at||e.paid_date||"",status:e.status||"",currency:e.currency||"MYR",amount:parseFloat(e.subtotal||e.amount||0),tax:parseFloat(e.tax_amount||e.tax||0),total:parseFloat(e.total_amount||e.total||0),items:e.items||[],billingPeriod:e.billing_period_start&&e.billing_period_end?`${ge(e.billing_period_start)} - ${ge(e.billing_period_end)}`:"",planType:e.category_display_name||e.plan_type||"Service",paymentMethod:e.payment_method||"",transactionId:e.transaction_id||"",receiptUrl:e.receipt_url||"",hasPaymentInfo:!!e.transaction_id||!!e.receipt_url,type:e.type||"manual",payerType:e.payer_type||"restaurant",payerId:(null===(n=e.payer_id)||void 0===n?void 0:n.toString())||"",invoiceCategory:e.invoice_category||"",categoryDisplayName:e.category_display_name||"",issuerType:e.issuer_type||e.issuerType||"system_admin",issuerId:e.issuer_id||e.issuerId||null,issuerName:e.issuer_name||e.issuerName||"",issuerInfo:e.issuerInfo||e.issuer_info||null,payerInfo:e.payerInfo||e.payer_info||null,discountType:e.discount_type||e.discountType||"none",discountValue:parseFloat(e.discount_value||e.discountValue||0),discountAmount:parseFloat(e.discount_amount||e.discountAmount||0),discountReason:e.discount_reason||e.discountReason||null,subtotalBeforeDiscount:parseFloat(e.subtotal||e.subtotalBeforeDiscount||0)||void 0,additionalCharges:e.additional_charges||e.additionalCharges||[]}});P(t)}}catch(e){console.error("Error fetching all invoices:",e)}},xe=async()=>{try{const e=localStorage.getItem("auth_token");if(!e)return void I([]);const t=await fetch("/api/invoices/to-pay",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();I(e)}else I([])}catch(e){console.error("Error fetching invoices to pay:",e),I([])}};(0,i.useEffect)(()=>{ue(),xe(),(async()=>{if($)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${$}/company-info`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){const e=await t.json();e.success&&e.data&&de({companyName:e.data.company_name||"",address:e.data.address||"",city:e.data.city||"",state:e.data.state||"",postalCode:e.data.postal_code||"",country:e.data.country||"",phone:e.data.phone||"",email:e.data.email||"",website:e.data.website||"",taxNumber:e.data.tax_number||"",registrationNumber:e.data.registration_number||"",companyLogo:e.data.logo_url||"",bankName:e.data.bank_name||"",bankAccount:e.data.bank_account||"",bankAccountName:e.data.bank_account_name||"",swiftCode:e.data.swift_code||""})}}catch(e){console.error("Error fetching company settings:",e)}})(),(async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const t=await e.json();t.success&&t.currencies&&le(t.currencies)}}catch(e){console.error("Error fetching currency config:",e)}})()},[$,null===n||void 0===n?void 0:n.restaurant_id]);const ge=e=>{if(!e)return"-";return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})},he=e=>(e=>{if("pending_payment"!==e.status)return!1;const t=new Date;return new Date(e.dueDate)<t})(e)?"overdue":e.status,me=e=>({draft:"Draft",pending_payment:"Pending",payment_submitted:"Confirming",paid:"Paid",overdue:"Overdue",cancelled:"Cancelled"}[e]||e),ve=e=>e.filter(e=>{var t,n,i,o;const s=_.toLowerCase(),a=!_||(null===(t=e.invoiceNumber)||void 0===t?void 0:t.toLowerCase().includes(s))||(null===(n=e.issuerName)||void 0===n?void 0:n.toLowerCase().includes(s))||(null===(i=e.status)||void 0===i?void 0:i.toLowerCase().includes(s))||(null===(o=e.categoryDisplayName)||void 0===o?void 0:o.toLowerCase().includes(s)),r=new Date(e.issueDate),d=new Date(W.start),l=new Date(W.end);l.setHours(23,59,59,999);return a&&(r>=d&&r<=l)}),ye=ve(D),fe=ve(z),be={total:D.length,pending:D.filter(e=>"pending_payment"===e.status||"overdue"===e.status).length,confirming:D.filter(e=>"payment_submitted"===e.status).length,paid:D.filter(e=>"paid"===e.status).length,totalAmount:D.reduce((e,t)=>e+(t.total||0),0),pendingAmount:D.filter(e=>"pending_payment"===e.status||"overdue"===e.status).reduce((e,t)=>e+(t.total||0),0)},je=async e=>{if(!X){ee(e.id);try{const t=localStorage.getItem("auth_token");(await fetch(`/api/invoices/${e.id}/status`,{method:"PATCH",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer ${t}`}:{}},body:JSON.stringify({status:"paid",paid_amount:0,payment_notes:"Free invoice - confirmed by recipient"})})).ok&&(await ue(),H(!1))}catch(t){console.error("Failed to confirm free invoice:",t)}finally{ee(null)}}},Fe=async e=>{q(e),ae(""),ne({paymentMethod:"",transactionId:"",receiptImage:"",notes:""}),await(async(e,t,n)=>{Z(!0);try{let i=`/api/admin/payment-settings/available/${e}`;"brand"===t&&n?i=`/api/brands/${n}/payment-settings/available/${e}`:"foodcourt"===t&&n&&(i=`/api/foodcourts/${n}/payment-settings/available/${e}`);const o=localStorage.getItem("auth_token"),s=await fetch(i,{headers:{Authorization:`Bearer ${o}`}});if(s.ok){const e=await s.json();Q(e.methods||[]),e.methods&&e.methods.length>0&&ne(t=>({...t,paymentMethod:e.methods[0].id}))}}catch(i){console.error("Error fetching payment methods:",i)}finally{Z(!1)}})(e.currency||"MYR",e.issuerType,e.issuerId),J(!0)},we=e=>{const t=e.issuerInfo,n=e.payerInfo||(re?{name:re.companyName,address:re.address,city:re.city,state:re.state,postalCode:re.postalCode,country:re.country,phone:re.phone,email:re.email,taxId:re.taxNumber,businessRegistration:re.registrationNumber}:null);return`<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <title>Invoice ${e.invoiceNumber}</title>\n    <style>\n        * { margin: 0; padding: 0; box-sizing: border-box; }\n        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }\n        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }\n        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }\n        .logo-section { flex: 1; max-width: 400px; }\n        .company-logo { max-height: 60px; margin-bottom: 10px; }\n        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }\n        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }\n        .invoice-title { text-align: right; }\n        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }\n        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }\n        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }\n        .status-paid { background: #ECFDF5; color: #059669; }\n        .status-pending { background: #FEF3C7; color: #D97706; }\n        .status-submitted { background: #DBEAFE; color: #1E40AF; }\n        .status-overdue { background: #FEE2E2; color: #DC2626; }\n        .status-cancelled { background: #FEF2F2; color: #DC2626; }\n        .status-draft { background: #F3F4F6; color: #6B7280; }\n\n        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }\n        .bill-to-section { flex: 1; }\n        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }\n        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }\n        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }\n\n        .dates-section { text-align: right; }\n        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }\n        .date-label { color: #6B7280; }\n        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }\n\n        .items-section { margin-bottom: 24px; }\n        .items-table { width: 100%; border-collapse: collapse; }\n        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }\n        .items-table th.text-center { text-align: center; }\n        .items-table th.text-right { text-align: right; }\n        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }\n        .items-table td.text-center { text-align: center; }\n        .items-table td.text-right { text-align: right; }\n\n        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }\n        .summary-box { width: 280px; }\n        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }\n        .summary-row.subtotal { color: #6B7280; }\n        .summary-row.tax { color: #6B7280; }\n        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }\n\n        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }\n        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }\n        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }\n\n        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }\n\n        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }\n        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }\n\n        @media print {\n            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }\n            .invoice-container { padding: 20px; }\n            .no-print { display: none !important; }\n        }\n    </style>\n</head>\n<body>\n    <div class="invoice-container">\n        <div class="header">\n            <div class="logo-section">\n                ${null!==t&&void 0!==t&&t.logoUrl?`<img src="${t.logoUrl}" alt="Company Logo" class="company-logo">`:""}\n                <div class="company-name" style="${null!==t&&void 0!==t&&t.logoUrl?"font-size: 14px;":""}">${(null===t||void 0===t?void 0:t.name)||e.issuerName||"Issuer"}</div>\n                <div class="company-details">\n                    ${null!==t&&void 0!==t&&t.address?`${t.address}<br>`:""}\n                    ${[null===t||void 0===t?void 0:t.city,null===t||void 0===t?void 0:t.state,null===t||void 0===t?void 0:t.postalCode].filter(Boolean).join(", ")}${null!==t&&void 0!==t&&t.city||null!==t&&void 0!==t&&t.state||null!==t&&void 0!==t&&t.postalCode?"<br>":""}\n                    ${null!==t&&void 0!==t&&t.country?`${t.country}<br>`:""}\n                    ${null!==t&&void 0!==t&&t.phone?`Tel: ${t.phone}<br>`:""}\n                    ${null!==t&&void 0!==t&&t.email?`Email: ${t.email}`:""}\n                </div>\n            </div>\n            <div class="invoice-title">\n                <div class="invoice-label">{t('settings:invoicesPage.invoice')}</div>\n                <div class="invoice-number">${e.invoiceNumber}</div>\n                <span class="invoice-status ${(e=>{switch(e){case"paid":return"status-paid";case"pending_payment":default:return"status-pending";case"payment_submitted":return"status-submitted";case"overdue":return"status-overdue";case"cancelled":return"status-cancelled";case"draft":return"status-draft"}})(e.status)}">${(e=>{switch(e){case"paid":return"PAID";case"pending_payment":return"PENDING PAYMENT";case"payment_submitted":return"PAYMENT SUBMITTED";case"overdue":return"OVERDUE";case"cancelled":return"CANCELLED";case"draft":return"DRAFT";default:return"PENDING"}})(e.status)}</span>\n            </div>\n        </div>\n\n        <div class="billing-info">\n            <div class="bill-to-section">\n                <div class="section-label">{t('settings:invoicesPage.billTo')}</div>\n                <div class="customer-name">${(null===n||void 0===n?void 0:n.name)||(null===re||void 0===re?void 0:re.companyName)||"Your Company"}</div>\n                ${null!==n&&void 0!==n&&n.address||null!==re&&void 0!==re&&re.address?`<div class="customer-details">${(null===n||void 0===n?void 0:n.address)||(null===re||void 0===re?void 0:re.address)}</div>`:""}\n                ${[(null===n||void 0===n?void 0:n.city)||(null===re||void 0===re?void 0:re.city),(null===n||void 0===n?void 0:n.state)||(null===re||void 0===re?void 0:re.state),(null===n||void 0===n?void 0:n.postalCode)||(null===re||void 0===re?void 0:re.postalCode)].filter(Boolean).length>0?`<div class="customer-details">${[(null===n||void 0===n?void 0:n.city)||(null===re||void 0===re?void 0:re.city),(null===n||void 0===n?void 0:n.state)||(null===re||void 0===re?void 0:re.state),(null===n||void 0===n?void 0:n.postalCode)||(null===re||void 0===re?void 0:re.postalCode)].filter(Boolean).join(", ")}</div>`:""}\n                ${null!==n&&void 0!==n&&n.country||null!==re&&void 0!==re&&re.country?`<div class="customer-details">${(null===n||void 0===n?void 0:n.country)||(null===re||void 0===re?void 0:re.country)}</div>`:""}\n                ${null!==n&&void 0!==n&&n.email||null!==re&&void 0!==re&&re.email?`<div class="customer-details">${(null===n||void 0===n?void 0:n.email)||(null===re||void 0===re?void 0:re.email)}</div>`:""}\n            </div>\n            <div class="dates-section">\n                <div class="date-row">\n                    <span class="date-label">Billing Period:</span>\n                    <span class="date-value">${e.billingPeriod||"-"}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Issue Date:</span>\n                    <span class="date-value">${ge(e.issueDate)}</span>\n                </div>\n                <div class="date-row">\n                    <span class="date-label">Due Date:</span>\n                    <span class="date-value">${ge(e.dueDate)}</span>\n                </div>\n                ${e.paidDate?`\n                <div class="date-row">\n                    <span class="date-label">Paid Date:</span>\n                    <span class="date-value">${ge(e.paidDate)}</span>\n                </div>\n                `:""}\n            </div>\n        </div>\n\n        <div class="items-section">\n            <div class="section-label">{t('settings:invoicesPage.items')}</div>\n            <table class="items-table">\n                <thead>\n                    <tr>\n                        <th>{t('settings:invoicesPage.description')}</th>\n                        <th class="text-center">{t('settings:invoicesPage.qty')}</th>\n                        <th class="text-right">{t('settings:invoicesPage.unitPrice')}</th>\n                        <th class="text-right">{t('settings:invoicesPage.amount')}</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${e.items&&e.items.length>0?e.items.map(t=>`\n                    <tr>\n                        <td>${t.description}</td>\n                        <td class="text-center">${t.quantity}</td>\n                        <td class="text-right">${(0,a.vv)(t.unitPrice,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,a.vv)(t.total,e.currency||"MYR")}</td>\n                    </tr>\n                    `).join(""):`\n                    <tr>\n                        <td>${e.categoryDisplayName||e.planType||"Service"}</td>\n                        <td class="text-center">1</td>\n                        <td class="text-right">${(0,a.vv)(e.amount,e.currency||"MYR")}</td>\n                        <td class="text-right">${(0,a.vv)(e.amount,e.currency||"MYR")}</td>\n                    </tr>\n                    `}\n                </tbody>\n            </table>\n        </div>\n\n        <div class="summary-section">\n            <div class="summary-box">\n                <div class="summary-row subtotal">\n                    <span>Subtotal:</span>\n                    <span>${(0,a.vv)(e.amount,e.currency||"MYR")}</span>\n                </div>\n                ${e.discountType&&"none"!==e.discountType&&e.discountAmount>0?`\n                <div class="summary-row tax" style="color: #15803D;">\n                    <span>Discount${"percentage"===e.discountType?` (${e.discountValue}%)`:""}:</span>\n                    <span>-${(0,a.vv)(e.discountAmount,e.currency||"MYR")}</span>\n                </div>\n                `:""}\n                ${(e.additionalCharges||[]).map(t=>`\n                <div class="summary-row tax">\n                    <span>${t.name} (${t.rate}%):</span>\n                    <span>${(0,a.vv)(t.amount,e.currency||"MYR")}</span>\n                </div>\n                `).join("")}\n                <div class="summary-row total">\n                    <span>Total:</span>\n                    <span>${0===Number(e.total)?'<span style="color: #10B981; font-weight: 600;">Free</span>':(0,a.vv)(e.total,e.currency||"MYR")}</span>\n                </div>\n            </div>\n        </div>\n\n        ${null!==t&&void 0!==t&&t.bankName?`\n        <div class="bank-section">\n            <div class="bank-title">{t('settings:invoicesPage.paymentDetails')}</div>\n            <div class="bank-details">\n                <strong>Bank:</strong> ${t.bankName}<br>\n                <strong>Account Name:</strong> ${t.bankAccountName||"-"}<br>\n                <strong>Account Number:</strong> ${t.bankAccount||"-"}\n                ${t.swiftCode?`<br><strong>SWIFT Code:</strong> ${t.swiftCode}`:""}\n            </div>\n        </div>\n        `:""}\n\n        ${null!==t&&void 0!==t&&t.taxId||null!==t&&void 0!==t&&t.businessRegistration?`\n        <div class="registration-info">\n            ${t.businessRegistration?`Reg No: ${t.businessRegistration}`:""}\n            ${t.businessRegistration&&t.taxId?" | ":""}\n            ${t.taxId?`Tax No: ${t.taxId}`:""}\n        </div>\n        `:""}\n\n        <div class="footer">\n            <div class="footer-text">{t('settings:invoicesPage.thankYouForYourBusiness')}</div>\n            <div class="footer-text">{t('settings:invoicesPage.thisIsAComputergeneratedInvoiceAndDoesNotRequireASignature')}</div>\n        </div>\n    </div>\n</body>\n</html>`},ke=async e=>{try{var t;const n=we(e),i=document.createElement("iframe");i.style.position="fixed",i.style.left="-10000px",i.style.top="-10000px",i.style.width="800px",i.style.height="1200px",i.style.visibility="hidden",i.style.pointerEvents="none",document.body.appendChild(i);const o=i.contentDocument||(null===(t=i.contentWindow)||void 0===t?void 0:t.document);if(!o)throw document.body.removeChild(i),new Error("Could not access iframe document");o.open(),o.write(n),o.close(),await new Promise(async e=>{try{var t;null!==(t=o.fonts)&&void 0!==t&&t.ready&&await o.fonts.ready}catch{}const n=o.querySelectorAll("img");await Promise.all(Array.from(n).map(e=>e.complete?Promise.resolve():new Promise(t=>{e.onload=t,e.onerror=t}))),setTimeout(e,100)});const s=await m()(o.body,{scale:2,useCORS:!0,logging:!1,backgroundColor:"#ffffff",windowWidth:800,windowHeight:1200});document.body.removeChild(i);const a=s.toDataURL("image/png"),r=new x.default({orientation:"portrait",unit:"mm",format:"a4"}),d=210,l=s.height*d/s.width;r.addImage(a,"PNG",0,0,d,l),r.save(`Invoice-${e.invoiceNumber}.pdf`)}catch(n){console.error("Error generating PDF:",n)}},Be=e=>{const t=we(e),n=window.open("","_blank","width=800,height=600");n&&(n.document.write(t),n.document.close(),setTimeout(()=>{n.print()},250))},Ce=function(t){let n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,f.jsx)(c.an,{children:(0,f.jsxs)(c.bQ,{children:[(0,f.jsx)(c.B_,{children:(0,f.jsxs)("tr",{children:[(0,f.jsx)(c.gU,{align:"left",children:e("settings:invoicesPage.invoice")}),(0,f.jsx)(c.gU,{align:"left",children:e("settings:invoicesPage.issuer")}),(0,f.jsx)(c.gU,{align:"center",children:e("settings:invoicesPage.period")}),(0,f.jsx)(c.gU,{align:"center",children:e("settings:invoicesPage.issued")}),(0,f.jsx)(c.gU,{align:"center",children:e("settings:invoicesPage.due")}),(0,f.jsx)(c.gU,{align:"center",children:e("settings:invoicesPage.status")}),(0,f.jsx)(c.gU,{align:"right",children:e("settings:invoicesPage.amount")}),(0,f.jsx)(c.gU,{align:"right",children:e("settings:invoicesPage.total")}),(0,f.jsx)(c.gU,{align:"left",children:e("settings:invoicesPage.actions")})]})}),(0,f.jsx)("tbody",{children:t.length>0?t.map(t=>(0,f.jsxs)(c.J2,{children:[(0,f.jsx)(c.Bv,{"data-label":"Invoice",align:"left",children:(0,f.jsxs)(j,{children:[(0,f.jsxs)(F,{children:[t.invoiceNumber,"automatic"===t.type&&(0,f.jsx)(k,{style:{marginLeft:"6px"},children:e("settings:invoicesPage.auto")})]}),(0,f.jsx)(w,{children:t.categoryDisplayName||t.planType||"Service"})]})}),(0,f.jsx)(c.Bv,{"data-label":"Issuer",align:"left",children:(0,f.jsx)(j,{children:(0,f.jsx)(F,{children:t.issuerName||("system_admin"===t.issuerType?"System Admin":"brand"===t.issuerType?"Brand":"Foodcourt")})})}),(0,f.jsx)(c.Bv,{"data-label":"Period",align:"center",style:{fontSize:"12px"},children:t.billingPeriod||"-"}),(0,f.jsx)(c.Bv,{"data-label":"Issued",align:"center",style:{fontSize:"13px"},children:ge(t.issueDate)}),(0,f.jsx)(c.Bv,{"data-label":"Due",align:"center",style:{fontSize:"13px"},children:ge(t.dueDate)}),(0,f.jsx)(c.Bv,{"data-label":"Status",align:"center",children:(0,f.jsx)(B,{status:he(t),children:me(he(t))})}),(0,f.jsx)(c.Bv,{"data-label":"Amount",align:"right",children:(0,f.jsx)(c.DM,{children:(0,a.vv)(t.amount,t.currency||"MYR")})}),(0,f.jsx)(c.Bv,{"data-label":"Total",align:"right",children:(0,f.jsx)(c.DM,{highlight:!0,children:0===Number(t.total)?(0,f.jsx)("span",{style:{color:"#10B981",fontWeight:600},children:e("settings:invoicesPage.free")}):(0,a.vv)(t.total,t.currency||"MYR")})}),(0,f.jsx)(c.Bv,{"data-label":"",mobileFullWidth:!0,children:(0,f.jsxs)(c.wr,{children:[(0,f.jsx)(C,{variant:"primary",onClick:()=>(e=>{q(e),H(!0)})(t),children:"View"}),n&&("sent"===t.status||"pending_payment"===t.status||"overdue"===t.status)&&Number(t.total)>0&&(0,f.jsx)(C,{variant:"success",onClick:()=>Fe(t),children:"Pay"}),n&&("sent"===t.status||"pending_payment"===t.status||"overdue"===t.status)&&0===Number(t.total)&&(0,f.jsx)(C,{variant:"success",onClick:()=>je(t),disabled:X===t.id,children:X===t.id?"Confirming...":"Confirm"}),(0,f.jsx)(C,{onClick:()=>ke(t),title:"Download PDF",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),(0,f.jsx)("polyline",{points:"7,10 12,15 17,10"}),(0,f.jsx)("line",{x1:"12",y1:"15",x2:"12",y2:"3"})]})}),(0,f.jsx)(C,{onClick:()=>Be(t),title:"Print Invoice",children:(0,f.jsxs)("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,f.jsx)("polyline",{points:"6,9 6,2 18,2 18,9"}),(0,f.jsx)("path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"}),(0,f.jsx)("rect",{x:"6",y:"14",width:"12",height:"8"})]})})]})})]},t.id)):(0,f.jsx)(c.J2,{children:(0,f.jsx)(c.Bv,{colSpan:9,children:(0,f.jsx)(c.ys,{children:e("settings:invoicesPage.noInvoicesFound")})})})})]})})};return(0,f.jsx)(f.Fragment,{children:(0,f.jsxs)(c.mc,{children:[(0,f.jsx)(c.Y9,{children:(0,f.jsx)(c.hE,{children:e("settings:invoicesPage.invoices")})}),(0,f.jsxs)(c.UC,{children:[(0,f.jsxs)(c.MD,{children:[(0,f.jsxs)(c.hI,{children:[(0,f.jsx)(c.Os,{children:be.total}),(0,f.jsx)(c.v0,{children:e("settings:invoicesPage.totalInvoices")})]}),(0,f.jsxs)(c.hI,{color:"#F59E0B",children:[(0,f.jsx)(c.Os,{children:be.pending}),(0,f.jsx)(c.v0,{children:e("settings:invoicesPage.toPay")}),(0,f.jsx)(c.d1,{children:(0,a.vv)(be.pendingAmount,(null===t||void 0===t?void 0:t.currency)||"MYR")})]}),(0,f.jsxs)(c.hI,{color:"#3B82F6",children:[(0,f.jsx)(c.Os,{children:be.confirming}),(0,f.jsx)(c.v0,{children:e("settings:invoicesPage.confirming")})]}),(0,f.jsxs)(c.hI,{color:"#10B981",children:[(0,f.jsx)(c.Os,{children:be.paid}),(0,f.jsx)(c.v0,{children:e("settings:invoicesPage.paid")})]})]}),(0,f.jsxs)(u.tU,{children:[(0,f.jsxs)(u.oz,{active:"all"===ce,onClick:()=>pe("all"),children:["All Invoices",(0,f.jsx)(u.Ex,{count:D.length})]}),(0,f.jsxs)(u.oz,{active:"to_pay"===ce,onClick:()=>pe("to_pay"),children:["Invoices to Pay",(0,f.jsx)(u.Ex,{count:z.filter(e=>"pending_payment"===e.status||"overdue"===e.status||"payment_submitted"===e.status).length,variant:"warning"})]})]}),(0,f.jsx)(v.A,{activePeriod:T,dateRange:W,isCustomDateRange:M,onPeriodChange:e=>{N(e),Y(!1),U((0,v.x)(e))},onCalendarRangeSelect:(e,t)=>{Y(!0),N("all"),U({start:e,end:t})},children:(0,f.jsx)(p.DO,{placeholder:"Search invoice, issuer, status...",value:_,onChange:e=>R(e.target.value)})}),"all"===ce&&Ce(ye,!0),"to_pay"===ce&&Ce(fe,!0)]}),L&&O&&(()=>{const t=O.issuerInfo,n=O.payerInfo||(re?{name:re.companyName,address:re.address,city:re.city,state:re.state,postalCode:re.postalCode,country:re.country,phone:re.phone,email:re.email,taxId:re.taxNumber,businessRegistration:re.registrationNumber}:null);return(0,f.jsxs)(c.aF,{isOpen:!0,onClose:()=>H(!1),title:"Invoice Details",size:"large",footer:(0,f.jsxs)(f.Fragment,{children:[("sent"===O.status||"pending_payment"===O.status||"overdue"===O.status)&&Number(O.total)>0&&(0,f.jsx)(b,{variant:"success",onClick:()=>{H(!1),Fe(O)},children:"Pay Now"}),("sent"===O.status||"pending_payment"===O.status||"overdue"===O.status)&&0===Number(O.total)&&(0,f.jsx)(b,{variant:"success",onClick:()=>je(O),disabled:!!X,children:X?"Confirming...":"Confirm"}),(0,f.jsx)(b,{onClick:()=>ke(O),children:"Download PDF"}),(0,f.jsx)(b,{onClick:()=>Be(O),children:"Print"}),(0,f.jsx)(b,{variant:"secondary",onClick:()=>H(!1),children:"Close"})]}),children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px",paddingBottom:"24px",borderBottom:"2px solid #E5E7EB"},children:[(0,f.jsxs)("div",{style:{flex:"0 0 55%"},children:[(null===t||void 0===t?void 0:t.logoUrl)&&(0,f.jsx)("img",{src:t.logoUrl,alt:"Company Logo",style:{maxHeight:"60px",marginBottom:"8px"}}),(0,f.jsx)("div",{style:{fontSize:null!==t&&void 0!==t&&t.logoUrl?"16px":"20px",fontWeight:"700",color:"#0A2540",marginBottom:"8px"},children:(null===t||void 0===t?void 0:t.name)||O.issuerName||"Issuer"}),(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",lineHeight:"1.6"},children:[(null===t||void 0===t?void 0:t.address)&&(0,f.jsx)("div",{children:t.address}),((null===t||void 0===t?void 0:t.city)||(null===t||void 0===t?void 0:t.state)||(null===t||void 0===t?void 0:t.postalCode))&&(0,f.jsx)("div",{children:[null===t||void 0===t?void 0:t.city,null===t||void 0===t?void 0:t.state,null===t||void 0===t?void 0:t.postalCode].filter(Boolean).join(", ")}),(null===t||void 0===t?void 0:t.country)&&(0,f.jsx)("div",{children:t.country}),(null===t||void 0===t?void 0:t.phone)&&(0,f.jsxs)("div",{children:["Tel: ",t.phone]}),(null===t||void 0===t?void 0:t.email)&&(0,f.jsxs)("div",{children:["Email: ",t.email]})]})]}),(0,f.jsxs)("div",{style:{textAlign:"right"},children:[(0,f.jsx)("div",{style:{fontSize:"24px",fontWeight:"700",color:"#635BFF",marginBottom:"8px"},children:e("settings:invoicesPage.invoice")}),(0,f.jsx)("div",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:O.invoiceNumber}),(0,f.jsx)(B,{status:O.status,style:{marginTop:"8px"},children:me(O.status)})]})]}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"24px"},children:[(0,f.jsxs)("div",{style:{flex:1},children:[(0,f.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:e("settings:invoicesPage.billTo")}),(0,f.jsx)("div",{style:{fontSize:"15px",fontWeight:"600",color:"#0A2540"},children:(null===n||void 0===n?void 0:n.name)||(null===re||void 0===re?void 0:re.companyName)||"Your Company"}),((null===n||void 0===n?void 0:n.address)||(null===re||void 0===re?void 0:re.address))&&(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"4px"},children:(null===n||void 0===n?void 0:n.address)||(null===re||void 0===re?void 0:re.address)}),((null===n||void 0===n?void 0:n.city)||(null===n||void 0===n?void 0:n.state)||(null===n||void 0===n?void 0:n.postalCode)||(null===re||void 0===re?void 0:re.city))&&(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:[(null===n||void 0===n?void 0:n.city)||(null===re||void 0===re?void 0:re.city),(null===n||void 0===n?void 0:n.state)||(null===re||void 0===re?void 0:re.state),(null===n||void 0===n?void 0:n.postalCode)||(null===re||void 0===re?void 0:re.postalCode)].filter(Boolean).join(", ")}),((null===n||void 0===n?void 0:n.country)||(null===re||void 0===re?void 0:re.country))&&(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:(null===n||void 0===n?void 0:n.country)||(null===re||void 0===re?void 0:re.country)}),((null===n||void 0===n?void 0:n.email)||(null===re||void 0===re?void 0:re.email))&&(0,f.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"2px"},children:(null===n||void 0===n?void 0:n.email)||(null===re||void 0===re?void 0:re.email)})]}),(0,f.jsxs)("div",{style:{textAlign:"right"},children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Billing Period:"}),(0,f.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:O.billingPeriod||"-"})]}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Issue Date:"}),(0,f.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ge(O.issueDate)})]}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Due Date:"}),(0,f.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ge(O.dueDate)})]}),O.paidDate&&(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginBottom:"6px",fontSize:"13px"},children:[(0,f.jsx)("span",{style:{color:"#6B7280"},children:"Paid Date:"}),(0,f.jsx)("span",{style:{color:"#0A2540",fontWeight:"500",minWidth:"140px"},children:ge(O.paidDate)})]})]})]}),(0,f.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,f.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"12px",textTransform:"uppercase"},children:e("settings:invoicesPage.items")}),(0,f.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,f.jsx)("thead",{children:(0,f.jsxs)("tr",{style:{borderBottom:"2px solid #E5E7EB"},children:[(0,f.jsx)("th",{style:{textAlign:"left",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:e("settings:invoicesPage.description")}),(0,f.jsx)("th",{style:{textAlign:"center",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:e("settings:invoicesPage.qty")}),(0,f.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:e("settings:invoicesPage.unitPrice")}),(0,f.jsx)("th",{style:{textAlign:"right",padding:"12px 8px",fontSize:"12px",fontWeight:"600",color:"#6B7280"},children:e("settings:invoicesPage.amount")})]})}),(0,f.jsx)("tbody",{children:O.items&&O.items.length>0?O.items.map((e,t)=>(0,f.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,f.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:e.description}),(0,f.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:e.quantity}),(0,f.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,a.vv)(e.unitPrice,O.currency||"MYR")}),(0,f.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,a.vv)(e.total,O.currency||"MYR")})]},t)):(0,f.jsxs)("tr",{style:{borderBottom:"1px solid #F3F4F6"},children:[(0,f.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151"},children:O.categoryDisplayName||O.planType||"Service"}),(0,f.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"center"},children:"1"}),(0,f.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,a.vv)(O.amount,O.currency||"MYR")}),(0,f.jsx)("td",{style:{padding:"12px 8px",fontSize:"14px",color:"#374151",textAlign:"right"},children:(0,a.vv)(O.amount,O.currency||"MYR")})]})})]})]}),(0,f.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"24px"},children:(0,f.jsxs)("div",{style:{width:"280px"},children:[(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#6B7280"},children:[(0,f.jsx)("span",{children:"Subtotal:"}),(0,f.jsx)("span",{children:(0,a.vv)(O.subtotalBeforeDiscount||O.amount,O.currency||"MYR")})]}),O.discountType&&"none"!==O.discountType&&O.discountAmount>0&&(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#15803D"},children:[(0,f.jsxs)("span",{children:["Discount","percentage"===O.discountType?` (${O.discountValue}%)`:"",":"]}),(0,f.jsxs)("span",{children:["-",(0,a.vv)(O.discountAmount,O.currency||"MYR")]})]}),(O.additionalCharges||[]).map((e,t)=>(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#6B7280"},children:[(0,f.jsxs)("span",{children:[e.name," (",e.rate,"%):"]}),(0,f.jsx)("span",{children:(0,a.vv)(e.amount,O.currency||"MYR")})]},t)),0===(O.additionalCharges||[]).length&&O.tax>0&&(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"14px",color:"#6B7280"},children:[(0,f.jsx)("span",{children:"Tax:"}),(0,f.jsx)("span",{children:(0,a.vv)(O.tax,O.currency||"MYR")})]}),(0,f.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",padding:"8px 12px",fontSize:"16px",fontWeight:"700",color:"#0A2540",background:"#F8FAFC",borderRadius:"6px",marginTop:"8px"},children:[(0,f.jsx)("span",{children:"Total:"}),(0,f.jsx)("span",{children:(0,a.vv)(O.total,O.currency||"MYR")})]})]})}),(null===t||void 0===t?void 0:t.bankName)&&(0,f.jsxs)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px",marginBottom:"16px"},children:[(0,f.jsx)("div",{style:{fontSize:"12px",fontWeight:"600",color:"#6B7280",marginBottom:"8px",textTransform:"uppercase"},children:e("settings:invoicesPage.paymentDetails")}),(0,f.jsxs)("div",{style:{fontSize:"13px",color:"#374151",lineHeight:"1.6"},children:[(0,f.jsxs)("div",{children:[(0,f.jsx)("strong",{children:"Bank:"})," ",t.bankName]}),(0,f.jsxs)("div",{children:[(0,f.jsx)("strong",{children:"Account Name:"})," ",t.bankAccountName||"-"]}),(0,f.jsxs)("div",{children:[(0,f.jsx)("strong",{children:"Account Number:"})," ",t.bankAccount||"-"]}),t.swiftCode&&(0,f.jsxs)("div",{children:[(0,f.jsx)("strong",{children:"SWIFT Code:"})," ",t.swiftCode]})]})]}),((null===t||void 0===t?void 0:t.taxId)||(null===t||void 0===t?void 0:t.businessRegistration))&&(0,f.jsxs)("div",{style:{fontSize:"12px",color:"#9CA3AF",textAlign:"center",marginTop:"16px"},children:[(null===t||void 0===t?void 0:t.businessRegistration)&&(0,f.jsxs)("span",{children:["Reg No: ",t.businessRegistration]}),(null===t||void 0===t?void 0:t.businessRegistration)&&(null===t||void 0===t?void 0:t.taxId)&&(0,f.jsx)("span",{children:" | "}),(null===t||void 0===t?void 0:t.taxId)&&(0,f.jsxs)("span",{children:["Tax No: ",t.taxId]})]})]})})(),V&&O&&(0,f.jsxs)(c.aF,{isOpen:!0,onClose:()=>J(!1),title:"Submit Payment",footer:(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(b,{variant:"secondary",onClick:()=>J(!1),children:"Cancel"}),te.paymentMethod&&"stripe"!==te.paymentMethod&&"paypal"!==te.paymentMethod&&(0,f.jsx)(b,{variant:"success",onClick:async()=>{if(O)if(te.transactionId||te.receiptImage){oe(!0),ae("");try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/invoices/${O.id}/submit-payment`,{method:"POST",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({payment_method:te.paymentMethod,transaction_id:te.transactionId,notes:te.notes||null,receipt_url:te.receiptImage||null})});if(t.ok)J(!1),ne({paymentMethod:"",transactionId:"",receiptImage:"",notes:""}),await ue(),await xe(),window.dispatchEvent(new Event("refreshBadgeCounts"));else{const e=await t.json();ae(e.error||e.message||"Failed to submit payment")}}catch(e){console.error("Error submitting payment:",e),ae("Network error. Please check your connection and try again.")}finally{oe(!1)}}else ae("Please provide either a Transaction ID or upload a Receipt Image")},disabled:ie||0===G.length,children:ie?"Submitting...":"Submit Payment"})]}),children:[(0,f.jsxs)("div",{style:{marginBottom:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,f.jsxs)("p",{style:{margin:"0 0 8px 0",fontSize:"14px",color:"#6B7280"},children:["Invoice: ",(0,f.jsx)("strong",{children:O.invoiceNumber})]}),(0,f.jsx)("p",{style:{margin:"0",fontSize:"20px",fontWeight:"700",color:"#0A2540"},children:(0,a.vv)(O.total,O.currency)})]}),K?(0,f.jsx)("div",{style:{textAlign:"center",padding:"20px",color:"#6B7280"},children:e("settings:invoicesPage.loadingPaymentMethods")}):0===G.length?(0,f.jsxs)("div",{style:{padding:"20px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,f.jsx)("p",{style:{margin:"0 0 8px 0",fontWeight:"600",color:"#92400E",fontSize:"15px"},children:"Payment Not Available"}),(0,f.jsxs)("p",{style:{margin:0,color:"#92400E",fontSize:"14px",lineHeight:"1.5"},children:[(0,f.jsx)("strong",{children:O.issuerName||("brand"===O.issuerType?"Brand":"foodcourt"===O.issuerType?"Foodcourt":"System Admin")})," has not configured payment methods for ",(0,f.jsx)("strong",{children:(0,a.Qn)(O.currency||"MYR")})," yet. Please contact the invoice issuer to set up payment options."]})]}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{style:{marginBottom:"20px"},children:[(0,f.jsx)(A,{children:"Payment Method *"}),(0,f.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(100px, 1fr))",gap:"8px",marginTop:"8px"},children:G.map(e=>{const t=te.paymentMethod===e.id;return(0,f.jsx)("button",{onClick:()=>{ne(t=>({...t,paymentMethod:e.id})),ae("")},style:{padding:"12px 16px",minHeight:"44px",borderRadius:"8px",border:"1px solid "+(t?"#635BFF":"#E6EBF1"),background:t?"rgba(99, 91, 255, 0.1)":"white",color:t?"#635BFF":"#374151",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.15s",textAlign:"center"},children:e.name},e.id)})})]}),"stripe"===te.paymentMethod&&O&&(0,f.jsx)(g.A,{invoiceId:O.id,onSuccess:()=>{J(!1),ne({paymentMethod:"",transactionId:"",receiptImage:"",notes:""}),ue(),xe(),window.dispatchEvent(new Event("refreshBadgeCounts"))},onError:()=>{}}),"bank_transfer"===te.paymentMethod&&(()=>{const t=G.find(e=>"bank_transfer"===e.id);return t?(0,f.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",fontSize:"14px",lineHeight:"1.8"},children:[(0,f.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:e("settings:invoicesPage.bankTransferDetails")}),(0,f.jsxs)("p",{style:{margin:"0"},children:[(0,f.jsx)("strong",{children:"Bank:"})," ",t.bankName]}),(0,f.jsxs)("p",{style:{margin:"0"},children:[(0,f.jsx)("strong",{children:"Account Number:"})," ",t.accountNumber]}),(0,f.jsxs)("p",{style:{margin:"0"},children:[(0,f.jsx)("strong",{children:"Account Name:"})," ",t.accountName]})]}):null})(),"qr_payment"===te.paymentMethod&&(()=>{const t=G.find(e=>"qr_payment"===e.id);return t?(0,f.jsxs)("div",{style:{padding:"16px",background:"#EFF6FF",borderRadius:"8px",marginBottom:"16px",textAlign:"center"},children:[(0,f.jsx)("h4",{style:{margin:"0 0 12px 0",fontSize:"14px",fontWeight:"600",color:"#1E40AF"},children:e("settings:invoicesPage.qrPayment")}),t.qrImage&&(0,f.jsx)("img",{src:t.qrImage,alt:"Payment QR Code",style:{maxWidth:"200px",maxHeight:"200px",border:"1px solid #E5E7EB",borderRadius:"8px"}}),t.qrDescription&&(0,f.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:t.qrDescription})]}):null})(),te.paymentMethod&&"stripe"!==te.paymentMethod&&"paypal"!==te.paymentMethod&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px",fontSize:"13px",color:"#92400E",display:"flex",alignItems:"flex-start",gap:"8px"},children:[(0,f.jsx)("span",{style:{fontWeight:"600",flexShrink:0},children:"*"}),(0,f.jsxs)("span",{children:[e("settings:invoicesPage.pleaseProvideEitherA"),(0,f.jsx)("strong",{children:e("settings:invoicesPage.transactionIdReferenceNumber")})," or upload a ",(0,f.jsx)("strong",{children:e("settings:invoicesPage.paymentReceiptImage")})," to submit your payment."]})]}),(0,f.jsxs)(S,{children:[(0,f.jsx)(A,{children:e("settings:invoicesPage.transactionIdReferenceNumber")}),(0,f.jsx)(E,{type:"text",placeholder:"Enter transaction ID or reference number",value:te.transactionId,onChange:e=>ne(t=>({...t,transactionId:e.target.value}))})]}),(0,f.jsxs)(S,{children:[(0,f.jsx)(A,{children:e("settings:invoicesPage.notesOptional")}),(0,f.jsx)("textarea",{placeholder:"Any additional information about the payment...",value:te.notes,onChange:e=>ne(t=>({...t,notes:e.target.value})),style:{width:"100%",boxSizing:"border-box",padding:"8px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"14px",minHeight:"60px",resize:"vertical",fontFamily:"inherit"}})]}),(0,f.jsxs)(S,{children:[(0,f.jsx)(A,{children:e("settings:invoicesPage.paymentReceiptImage")}),(0,f.jsxs)("div",{style:{border:"2px dashed #E6EBF1",borderRadius:"8px",padding:"20px",textAlign:"center",cursor:"pointer",position:"relative"},children:[te.receiptImage?(0,f.jsxs)("div",{children:[(0,f.jsx)("img",{src:te.receiptImage,alt:"Receipt",style:{maxWidth:"200px",maxHeight:"200px",marginBottom:"8px",borderRadius:"8px"}}),(0,f.jsx)("p",{style:{margin:"8px 0 0 0",fontSize:"13px",color:"#6B7280"},children:e("settings:invoicesPage.clickToChangeImage")})]}):(0,f.jsxs)("div",{children:[(0,f.jsx)("p",{style:{margin:"0",fontSize:"14px",color:"#6B7280"},children:e("settings:invoicesPage.clickToUploadReceiptImage")}),(0,f.jsx)("p",{style:{margin:"4px 0 0 0",fontSize:"12px",color:"#9CA3AF"},children:e("settings:invoicesPage.max5mbJpgpng")})]}),(0,f.jsx)("input",{type:"file",accept:"image/*",onChange:async e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];if(!n)return;if(n.size>5242880)return void ae("Image size must be less than 5MB");const i=new FileReader;i.onload=()=>{ne(e=>({...e,receiptImage:i.result}))},i.readAsDataURL(n)},style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",opacity:0,cursor:"pointer"}})]})]})]})]}),se&&(0,f.jsx)("div",{style:{padding:"12px",background:"#FEE2E2",borderRadius:"6px",marginTop:"16px"},children:(0,f.jsx)("p",{style:{margin:0,color:"#DC2626",fontSize:"13px"},children:se})})]})]})})}}}]);