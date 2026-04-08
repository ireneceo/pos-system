"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9133],{5370:(e,t,n)=>{n.d(t,{A:()=>j});var r=n(9950),o=n(4752),a=n(4414);const i=o.i7`
  from { opacity: 0; }
  to { opacity: 1; }
`,s=o.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,c=o.i7`
  to { transform: rotate(360deg); }
`,d=o.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,l=o.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?o.AH`${s} 0.3s ease forwards`:o.AH`${i} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=o.Ay.div`
  ${l}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,u=o.Ay.div`
  ${l}
  position: absolute;
  right: -6px;
  top: -6px;
`,h=o.Ay.div`
  ${l}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,x=o.Ay.div`
  ${l}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,g=o.Ay.div`
  ${l}
  position: absolute;
  right: -8px;
  top: -8px;
`,y=o.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #D1FAE5;
  color: #065F46;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 13px;
  font-weight: 700;
`,m=o.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${c} 0.6s linear infinite;
`,f=o.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #EF4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: 700;
`,b=(0,r.forwardRef)((e,t)=>{let{children:n,onSave:o,type:i="input",debounceMs:s=2e3,style:c}=e;const[l,b]=(0,r.useState)("idle"),[j,v]=(0,r.useState)(!1),S=(0,r.useRef)(null),A=(0,r.useRef)(null),k=(0,r.useRef)(null),P=(0,r.useRef)(!0),C=(0,r.useRef)(o);C.current=o;const w=(0,r.useCallback)(()=>{S.current&&clearTimeout(S.current),A.current&&clearTimeout(A.current),k.current&&clearTimeout(k.current)},[]),F=2e3!==s?s:"toggle"===i||"select"===i||"list"===i||"image"===i?300:s,T=(0,r.useCallback)(()=>{w(),v(!1),b("saving"),S.current=setTimeout(async()=>{if(P.current)try{if(await C.current(),!P.current)return;b("saved"),A.current=setTimeout(()=>{P.current&&(v(!0),k.current=setTimeout(()=>{P.current&&(b("idle"),v(!1))},300))},2e3)}catch{if(!P.current)return;b("error"),A.current=setTimeout(()=>{P.current&&(v(!0),k.current=setTimeout(()=>{P.current&&(b("idle"),v(!1))},300))},4e3)}},F)},[F,w]);(0,r.useImperativeHandle)(t,()=>({triggerSave:T}),[T]),(0,r.useEffect)(()=>(P.current=!0,()=>{P.current=!1,w()}),[w]);const E=r.Children.map(n,e=>{if(!r.isValidElement(e))return e;const t=e.props.onChange;return"function"!==typeof t?e:r.cloneElement(e,{onChange:function(){t(...arguments),T()}})}),B="saving"===l?(0,a.jsx)(m,{}):"saved"===l?(0,a.jsx)(y,{children:"\u2713"}):"error"===l?(0,a.jsx)(f,{children:"!"}):null,$="select"===i?u:"toggle"===i?h:"image"===i?x:"list"===i?g:p;return(0,a.jsxs)(d,{$type:i,style:c,children:[E,"idle"!==l&&(0,a.jsx)($,{$fading:j,children:B})]})});b.displayName="AutoSaveField";const j=b},9133:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Q});var r=n(9950),o=n(4752),a=n(8012),i=n(2597),s=n(9610),c=n(4877),d=n(1367),l=n(5370),p=n(5030),u=n(4414);const h=o.Ay.div`
  min-height: 100vh;
`,x=o.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,g=o.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,y=o.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,m=o.Ay.p`
  color: #6B7C93;
  font-size: 14px;
  margin-bottom: 20px;
`,f=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,b=o.Ay.div`
  margin-bottom: 16px;
`,j=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,v=o.Ay.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,S=o.Ay.div`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  min-height: 46px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  &:hover {
    border-color: #635BFF;
  }
`,A=o.Ay.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`,k=o.Ay.span`
  color: #9CA3AF;
`,P=o.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`,C=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,w=o.Ay.div``,F=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,T=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-top: 2px;
`,E=o.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`,B=o.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #635BFF;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`,$=o.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E6EBF1;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
`,N=o.Ay.div`
  border-top: 1px solid #E6EBF1;
  margin-top: 16px;
  padding-top: 16px;
`,_=o.Ay.input`
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

  &::placeholder {
    color: #9CA3AF;
  }
`,z=o.Ay.p`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,I=o.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
`,R=o.Ay.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`,q=o.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,D={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:{}},Q=()=>{const{t:e}=(0,p.Bd)("foodcourt"),{user:t}=(0,d.As)(),n=null===t||void 0===t?void 0:t.foodcourt_id,[o,Q]=(0,r.useState)({}),[K,O]=(0,r.useState)([]),[U,H]=(0,r.useState)([]),[M,Y]=(0,r.useState)("MYR"),[J,V]=(0,r.useState)(!1),[W,X]=(0,r.useState)([]),[G,L]=(0,r.useState)(D),Z=(0,r.useRef)(D),[ee,te]=(0,r.useState)(""),[ne,re]=(0,r.useState)(!0);(0,r.useEffect)(()=>{oe()},[]),(0,r.useEffect)(()=>{K.length>0&&!ee&&te(K[0])},[K,ee]);const oe=async()=>{if(!n)return console.error("No foodcourt ID available"),void re(!1);try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[r,o,a]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch(`/api/foodcourts/${n}/payment-settings`,{headers:t})]);if(r.ok){const e=await r.json();e.success&&e.currencies&&Q(e.currencies)}let i=[];if(o.ok){const e=await o.json();e.success&&e.data&&(i=e.data.map(e=>e.code),H(i))}if(a.ok){const t=await a.json();console.log("Foodcourt payment settings loaded:",t);const n=t.data||t;if(n.supported_currencies&&Array.isArray(n.supported_currencies)){const t=i.length>0?n.supported_currencies.filter(e=>i.includes(e)):n.supported_currencies;if(O(t),t.length>0){var e;te(t[0]);const r=null===(e=n.payment_settings)||void 0===e?void 0:e.defaultCurrency;r&&t.includes(r)?Y(r):Y(t[0])}}if(n.payment_settings&&Object.keys(n.payment_settings).length>0){let e=n.payment_settings.additionalCharges||{};Array.isArray(e)&&(e={});const t={...D,...n.payment_settings,bankTransfer:n.payment_settings.bankTransfer||{},qrPayment:n.payment_settings.qrPayment||{},additionalCharges:e};Z.current=t,L(t)}}}catch(t){console.error("Error loading settings:",t)}finally{re(!1)}},ae=e=>{L(t=>{const n=e(t);return Z.current=n,n})},ie=(e,t)=>{ae(n=>({...n,stripe:{...n.stripe,[e]:t}}))},se=(e,t)=>{ae(n=>({...n,paypal:{...n.paypal,[e]:t}}))},ce=(e,t,n)=>{ae(r=>({...r,bankTransfer:{...r.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...r.bankTransfer[e],[t]:n}}}))},de=(e,t,n)=>{ae(r=>({...r,qrPayment:{...r.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...r.qrPayment[e],[t]:n}}}))},le=e=>G.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},pe=e=>G.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""},ue=[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}],he=(e,t,n,r)=>{ae(o=>{const a=[...o.additionalCharges[e]||ue];return a[t]={...a[t],[n]:r},{...o,additionalCharges:{...o.additionalCharges,[e]:a}}})},xe=async()=>{if(n)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/foodcourts/${n}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_settings:{...Z.current,defaultCurrency:M}})}),r=await t.json();if(!t.ok)throw new Error(r.error||r.details||"Failed to save")}catch(e){throw console.error("Error saving foodcourt payment settings:",e),e}};return ne?(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(h,{children:[(0,u.jsx)(a.Ay,{title:"Payment Settings"}),(0,u.jsx)(x,{children:(0,u.jsx)("p",{children:e("foodcourt:foodcourtPaymentSettingsPage.loading")})})]})}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(h,{children:[(0,u.jsx)(a.Ay,{title:"Payment Settings"}),(0,u.jsxs)(x,{children:[(0,u.jsxs)(g,{children:[(0,u.jsx)(y,{children:e("foodcourt:foodcourtPaymentSettingsPage.currencySettings")}),(0,u.jsx)(m,{children:"Configure supported currencies for subscription plans and invoices."}),(0,u.jsxs)(f,{children:[(0,u.jsxs)(b,{children:[(0,u.jsx)(j,{children:e("foodcourt:foodcourtPaymentSettingsPage.defaultCurrency")}),(0,u.jsx)(l.A,{type:"select",onSave:xe,children:(0,u.jsx)(v,{value:M,onChange:e=>{return t=e.target.value,void Y(t);var t},children:K.map(e=>{var t,n;return(0,u.jsxs)("option",{value:e,children:[null===(t=o[e])||void 0===t?void 0:t.symbol," ",e," - ",null===(n=o[e])||void 0===n?void 0:n.name]},e)})})}),(0,u.jsx)(z,{children:e("foodcourt:foodcourtPaymentSettingsPage.usedAsDefaultForNewSubscriptionsAndInvoices")})]}),(0,u.jsxs)(b,{children:[(0,u.jsx)(j,{children:e("foodcourt:foodcourtPaymentSettingsPage.supportedCurrencies")}),(0,u.jsx)(S,{onClick:()=>{X(K),V(!0)},children:K.length>0?K.map(e=>{var t;return(0,u.jsxs)(A,{children:[null===(t=o[e])||void 0===t?void 0:t.symbol," ",e]},e)}):(0,u.jsx)(k,{children:e("foodcourt:foodcourtPaymentSettingsPage.clickToSelectCurrencies")})}),(0,u.jsx)(z,{children:e("foodcourt:foodcourtPaymentSettingsPage.currenciesAvailableForPricingPlansAndInvoices")})]})]})]}),(0,u.jsxs)(g,{children:[(0,u.jsx)(y,{children:e("foodcourt:foodcourtPaymentSettingsPage.onlinePayment")}),(0,u.jsx)(m,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,u.jsxs)(P,{children:[(0,u.jsxs)(C,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:e("foodcourt:foodcourtPaymentSettingsPage.stripe")}),(0,u.jsx)(T,{children:e("foodcourt:foodcourtPaymentSettingsPage.creditdebitCardPayments")})]}),(0,u.jsxs)(E,{children:[(0,u.jsx)(B,{type:"checkbox",checked:G.stripe.enabled,onChange:e=>{ie("enabled",e.target.checked),setTimeout(xe,0)}}),(0,u.jsx)($,{})]})]}),G.stripe.enabled&&(0,u.jsxs)(N,{children:[(0,u.jsxs)(b,{children:[(0,u.jsx)(j,{children:e("foodcourt:foodcourtPaymentSettingsPage.publishableKey")}),(0,u.jsx)(l.A,{onSave:xe,children:(0,u.jsx)(_,{type:"text",placeholder:"pk_live_...",value:G.stripe.publishableKey,onChange:e=>ie("publishableKey",e.target.value)})})]}),(0,u.jsxs)(b,{children:[(0,u.jsx)(j,{children:e("foodcourt:foodcourtPaymentSettingsPage.secretKey")}),(0,u.jsx)(l.A,{onSave:xe,children:(0,u.jsx)(_,{type:"password",placeholder:"sk_live_...",value:G.stripe.secretKey,onChange:e=>ie("secretKey",e.target.value)})})]}),(0,u.jsxs)(b,{children:[(0,u.jsx)(j,{children:e("foodcourt:foodcourtPaymentSettingsPage.webhookSecret")}),(0,u.jsx)(l.A,{onSave:xe,children:(0,u.jsx)(_,{type:"password",placeholder:"whsec_...",value:G.stripe.webhookSecret,onChange:e=>ie("webhookSecret",e.target.value)})})]}),(0,u.jsx)(b,{children:(0,u.jsxs)(I,{children:[(0,u.jsx)(R,{type:"checkbox",checked:G.stripe.autoCharge,onChange:e=>{ie("autoCharge",e.target.checked),setTimeout(xe,0)}}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,u.jsxs)(P,{children:[(0,u.jsxs)(C,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(F,{children:e("foodcourt:foodcourtPaymentSettingsPage.paypal")}),(0,u.jsx)(T,{children:e("foodcourt:foodcourtPaymentSettingsPage.paypalAccountOrCard")})]}),(0,u.jsxs)(E,{children:[(0,u.jsx)(B,{type:"checkbox",checked:G.paypal.enabled,onChange:e=>{se("enabled",e.target.checked),setTimeout(xe,0)}}),(0,u.jsx)($,{})]})]}),G.paypal.enabled&&(0,u.jsxs)(N,{children:[(0,u.jsxs)(b,{children:[(0,u.jsx)(j,{children:e("foodcourt:foodcourtPaymentSettingsPage.clientId")}),(0,u.jsx)(l.A,{onSave:xe,children:(0,u.jsx)(_,{type:"text",placeholder:"Enter PayPal Client ID",value:G.paypal.clientId,onChange:e=>se("clientId",e.target.value)})})]}),(0,u.jsxs)(b,{children:[(0,u.jsx)(j,{children:e("foodcourt:foodcourtPaymentSettingsPage.clientSecret")}),(0,u.jsx)(l.A,{onSave:xe,children:(0,u.jsx)(_,{type:"password",placeholder:"Enter PayPal Client Secret",value:G.paypal.clientSecret,onChange:e=>se("clientSecret",e.target.value)})})]})]})]})]}),(0,u.jsxs)(g,{children:[(0,u.jsx)(y,{children:e("foodcourt:foodcourtPaymentSettingsPage.manualPayment")}),(0,u.jsx)(m,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===K.length?(0,u.jsx)(q,{children:"No currencies configured. Please add supported currencies above first."}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(i.tU,{children:K.map(e=>{var t;return(0,u.jsxs)(i.oz,{active:ee===e,onClick:()=>te(e),children:[null===(t=o[e])||void 0===t?void 0:t.symbol," ",e]},e)})}),(0,u.jsxs)(P,{children:[(0,u.jsxs)(C,{children:[(0,u.jsxs)(w,{children:[(0,u.jsxs)(F,{children:["Bank Transfer (",ee,")"]}),(0,u.jsx)(T,{children:e("foodcourt:foodcourtPaymentSettingsPage.manualTransferWithReceiptUpload")})]}),(0,u.jsxs)(E,{children:[(0,u.jsx)(B,{type:"checkbox",checked:le(ee).enabled,onChange:e=>{ce(ee,"enabled",e.target.checked),setTimeout(xe,0)}}),(0,u.jsx)($,{})]})]}),le(ee).enabled&&(0,u.jsxs)(N,{children:[(0,u.jsxs)(b,{children:[(0,u.jsx)(j,{children:e("foodcourt:foodcourtPaymentSettingsPage.bankName")}),(0,u.jsx)(l.A,{onSave:xe,children:(0,u.jsx)(_,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:le(ee).bankName,onChange:e=>ce(ee,"bankName",e.target.value)})})]}),(0,u.jsxs)(b,{children:[(0,u.jsx)(j,{children:e("foodcourt:foodcourtPaymentSettingsPage.accountNumber")}),(0,u.jsx)(l.A,{onSave:xe,children:(0,u.jsx)(_,{type:"text",placeholder:"Enter bank account number",value:le(ee).accountNumber,onChange:e=>ce(ee,"accountNumber",e.target.value)})})]}),(0,u.jsxs)(b,{children:[(0,u.jsx)(j,{children:e("foodcourt:foodcourtPaymentSettingsPage.accountName")}),(0,u.jsx)(l.A,{onSave:xe,children:(0,u.jsx)(_,{type:"text",placeholder:"Enter account holder name",value:le(ee).accountName,onChange:e=>ce(ee,"accountName",e.target.value)})})]})]})]}),(0,u.jsxs)(P,{children:[(0,u.jsxs)(C,{children:[(0,u.jsxs)(w,{children:[(0,u.jsxs)(F,{children:["QR Payment (",ee,")"]}),(0,u.jsx)(T,{children:e("foodcourt:foodcourtPaymentSettingsPage.scanQrCodeToPayDuitnowKakaopayEtc")})]}),(0,u.jsxs)(E,{children:[(0,u.jsx)(B,{type:"checkbox",checked:pe(ee).enabled,onChange:e=>{de(ee,"enabled",e.target.checked),setTimeout(xe,0)}}),(0,u.jsx)($,{})]})]}),pe(ee).enabled&&(0,u.jsxs)(N,{children:[(0,u.jsx)(c.A,{value:pe(ee).qrImage,onChange:e=>de(ee,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${ee} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,u.jsxs)(b,{style:{marginTop:"16px"},children:[(0,u.jsx)(j,{children:e("foodcourt:foodcourtPaymentSettingsPage.description")}),(0,u.jsx)(l.A,{onSave:xe,children:(0,u.jsx)(_,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:pe(ee).qrDescription,onChange:e=>de(ee,"qrDescription",e.target.value)})}),(0,u.jsx)(z,{children:e("foodcourt:foodcourtPaymentSettingsPage.shortDescriptionShownBelowTheQrCode")})]})]})]}),(0,u.jsxs)(y,{style:{fontSize:"15px",marginTop:"24px",marginBottom:"8px"},children:["Additional Charges (",ee,")"]}),(0,u.jsxs)(m,{style:{marginBottom:"12px"},children:["Configure tax, service charge, etc. for ",ee," invoices. Up to 3 items."]}),[0,1,2].map(t=>{const n=(r=ee,G.additionalCharges[r]||ue)[t]||{enabled:!1,name:"",rate:0};var r;return(0,u.jsxs)(P,{style:{marginBottom:"12px"},children:[(0,u.jsxs)(C,{children:[(0,u.jsxs)(w,{children:[(0,u.jsxs)(F,{children:["Charge Item ",t+1]}),(0,u.jsx)(T,{children:n.enabled&&n.name?`${n.name} (${n.rate}%)`:"Not configured"})]}),(0,u.jsxs)(E,{children:[(0,u.jsx)(B,{type:"checkbox",checked:n.enabled,onChange:e=>{he(ee,t,"enabled",e.target.checked),setTimeout(xe,0)}}),(0,u.jsx)($,{})]})]}),n.enabled&&(0,u.jsx)(N,{children:(0,u.jsxs)(f,{children:[(0,u.jsxs)(b,{children:[(0,u.jsx)(j,{children:e("foodcourt:foodcourtPaymentSettingsPage.itemName")}),(0,u.jsx)(l.A,{onSave:xe,children:(0,u.jsx)(_,{type:"text",value:n.name,onChange:e=>he(ee,t,"name",e.target.value),placeholder:"e.g., SST, VAT, Service Charge"})}),(0,u.jsx)(z,{children:e("foodcourt:foodcourtPaymentSettingsPage.nameDisplayedOnInvoices")})]}),(0,u.jsxs)(b,{children:[(0,u.jsx)(j,{children:"Rate (%)"}),(0,u.jsx)(l.A,{onSave:xe,children:(0,u.jsx)(_,{type:"number",min:"0",max:"100",step:"0.01",value:n.rate,onChange:e=>he(ee,t,"rate",parseFloat(e.target.value)||0),placeholder:"0"})}),(0,u.jsx)(z,{children:e("foodcourt:foodcourtPaymentSettingsPage.percentageToAddToSubtotal")})]})]})})]},`charge-${ee}-${t}`)})]})]})]})]}),(0,u.jsxs)(s.aF,{isOpen:J,onClose:()=>V(!1),title:"Select Supported Currencies",size:"medium",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>V(!1),children:"Cancel"}),(0,u.jsxs)(s.yl,{variant:"primary",onClick:async()=>{if(n)try{const e=localStorage.getItem("auth_token");if(!(await fetch(`/api/foodcourts/${n}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({supported_currencies:W})})).ok)throw new Error("Failed to update currencies");O(W),V(!1),!W.includes(M)&&W.length>0&&Y(W[0]),W.length>0&&!W.includes(ee)&&te(W[0])}catch(e){console.error("Error updating supported currencies:",e)}},disabled:0===W.length,children:["Save (",W.length," selected)"]})]}),children:[(0,u.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select from the currencies enabled by System Administrator."}),0===U.length?(0,u.jsx)("p",{style:{color:"#DC2626",padding:"16px",background:"#FEF2F2",borderRadius:"8px"},children:"No currencies have been configured by System Administrator yet."}):(0,u.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:U.map(e=>{const t=o[e];return t?(0,u.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(W.includes(e)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:W.includes(e)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,u.jsx)("input",{type:"checkbox",checked:W.includes(e),onChange:()=>(e=>{X(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(e),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,u.jsxs)("div",{children:[(0,u.jsxs)("div",{style:{fontWeight:500},children:[t.symbol," ",e]}),(0,u.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:t.name})]})]},e):null})})]})]})}}}]);