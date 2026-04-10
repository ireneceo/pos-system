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
`,b=(0,r.forwardRef)((e,t)=>{let{children:n,onSave:o,type:i="input",debounceMs:s=2e3,style:c}=e;const[l,b]=(0,r.useState)("idle"),[j,v]=(0,r.useState)(!1),S=(0,r.useRef)(null),A=(0,r.useRef)(null),P=(0,r.useRef)(null),k=(0,r.useRef)(!0),C=(0,r.useRef)(o);C.current=o;const w=(0,r.useCallback)(()=>{S.current&&clearTimeout(S.current),A.current&&clearTimeout(A.current),P.current&&clearTimeout(P.current)},[]),F=2e3!==s?s:"toggle"===i||"select"===i||"list"===i||"image"===i?300:s,T=(0,r.useCallback)(()=>{w(),v(!1),b("saving"),S.current=setTimeout(async()=>{if(k.current)try{if(await C.current(),!k.current)return;b("saved"),A.current=setTimeout(()=>{k.current&&(v(!0),P.current=setTimeout(()=>{k.current&&(b("idle"),v(!1))},300))},2e3)}catch{if(!k.current)return;b("error"),A.current=setTimeout(()=>{k.current&&(v(!0),P.current=setTimeout(()=>{k.current&&(b("idle"),v(!1))},300))},4e3)}},F)},[F,w]);(0,r.useImperativeHandle)(t,()=>({triggerSave:T}),[T]),(0,r.useEffect)(()=>(k.current=!0,()=>{k.current=!1,w()}),[w]);const E=r.Children.map(n,e=>{if(!r.isValidElement(e))return e;const t=e.props.onChange;return"function"!==typeof t?e:r.cloneElement(e,{onChange:function(){t(...arguments),T()}})}),B="saving"===l?(0,a.jsx)(m,{}):"saved"===l?(0,a.jsx)(y,{children:"\u2713"}):"error"===l?(0,a.jsx)(f,{children:"!"}):null,$="select"===i?u:"toggle"===i?h:"image"===i?x:"list"===i?g:p;return(0,a.jsxs)(d,{$type:i,style:c,children:[E,"idle"!==l&&(0,a.jsx)($,{$fading:j,children:B})]})});b.displayName="AutoSaveField";const j=b},9133:(e,t,n)=>{n.r(t),n.d(t,{default:()=>K});var r=n(9950),o=n(4752),a=n(8012),i=n(2597),s=n(9610),c=n(4877),d=n(1367),l=n(5370),p=n(5030),u=n(9955),h=n(4414);const x=o.Ay.div`
  min-height: 100vh;
`,g=o.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,y=o.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,m=o.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,f=o.Ay.p`
  color: #6B7C93;
  font-size: 14px;
  margin-bottom: 20px;
`,b=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,j=o.Ay.div`
  margin-bottom: 16px;
`,v=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,S=o.Ay.select`
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
`,A=o.Ay.div`
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
`,P=o.Ay.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`,k=o.Ay.span`
  color: #9CA3AF;
`,C=o.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`,w=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,F=o.Ay.div``,T=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,E=o.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-top: 2px;
`,B=o.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`,$=o.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #635BFF;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`,N=o.Ay.span`
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
`,z=o.Ay.div`
  border-top: 1px solid #E6EBF1;
  margin-top: 16px;
  padding-top: 16px;
`,R=o.Ay.input`
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
`,_=o.Ay.p`
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
`,q=o.Ay.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`,D=o.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,Q={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:{}},K=()=>{const{t:e}=(0,p.Bd)("foodcourt"),{user:t}=(0,d.As)(),n=null===t||void 0===t?void 0:t.foodcourt_id,[o,K]=(0,r.useState)({}),[O,U]=(0,r.useState)([]),[H,M]=(0,r.useState)([]),[Y,J]=(0,r.useState)("MYR"),[V,W]=(0,r.useState)(!1),[X,G]=(0,r.useState)([]),[L,Z]=(0,r.useState)(Q),ee=(0,r.useRef)(Q),[te,ne]=(0,r.useState)(""),[re,oe]=(0,r.useState)(!0);(0,r.useEffect)(()=>{ae()},[]),(0,r.useEffect)(()=>{O.length>0&&!te&&ne(O[0])},[O,te]);const ae=async()=>{if(!n)return console.error("No foodcourt ID available"),void oe(!1);try{const t={Authorization:`Bearer ${(0,u.c4)()}`},[r,o,a]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch(`/api/foodcourts/${n}/payment-settings`,{headers:t})]);if(r.ok){const e=await r.json();e.success&&e.currencies&&K(e.currencies)}let i=[];if(o.ok){const e=await o.json();e.success&&e.data&&(i=e.data.map(e=>e.code),M(i))}if(a.ok){const t=await a.json();console.log("Foodcourt payment settings loaded:",t);const n=t.data||t;if(n.supported_currencies&&Array.isArray(n.supported_currencies)){const t=i.length>0?n.supported_currencies.filter(e=>i.includes(e)):n.supported_currencies;if(U(t),t.length>0){var e;ne(t[0]);const r=null===(e=n.payment_settings)||void 0===e?void 0:e.defaultCurrency;r&&t.includes(r)?J(r):J(t[0])}}if(n.payment_settings&&Object.keys(n.payment_settings).length>0){let e=n.payment_settings.additionalCharges||{};Array.isArray(e)&&(e={});const t={...Q,...n.payment_settings,bankTransfer:n.payment_settings.bankTransfer||{},qrPayment:n.payment_settings.qrPayment||{},additionalCharges:e};ee.current=t,Z(t)}}}catch(t){console.error("Error loading settings:",t)}finally{oe(!1)}},ie=e=>{Z(t=>{const n=e(t);return ee.current=n,n})},se=(e,t)=>{ie(n=>({...n,stripe:{...n.stripe,[e]:t}}))},ce=(e,t)=>{ie(n=>({...n,paypal:{...n.paypal,[e]:t}}))},de=(e,t,n)=>{ie(r=>({...r,bankTransfer:{...r.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...r.bankTransfer[e],[t]:n}}}))},le=(e,t,n)=>{ie(r=>({...r,qrPayment:{...r.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...r.qrPayment[e],[t]:n}}}))},pe=e=>L.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},ue=e=>L.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""},he=[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}],xe=(e,t,n,r)=>{ie(o=>{const a=[...o.additionalCharges[e]||he];return a[t]={...a[t],[n]:r},{...o,additionalCharges:{...o.additionalCharges,[e]:a}}})},ge=async()=>{if(n)try{const e=(0,u.c4)(),t=await fetch(`/api/foodcourts/${n}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_settings:{...ee.current,defaultCurrency:Y}})}),r=await t.json();if(!t.ok)throw new Error(r.error||r.details||"Failed to save")}catch(e){throw console.error("Error saving foodcourt payment settings:",e),e}};return re?(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(x,{children:[(0,h.jsx)(a.Ay,{title:"Payment Settings"}),(0,h.jsx)(g,{children:(0,h.jsx)("p",{children:e("foodcourt:foodcourtPaymentSettingsPage.loading")})})]})}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(x,{children:[(0,h.jsx)(a.Ay,{title:"Payment Settings"}),(0,h.jsxs)(g,{children:[(0,h.jsxs)(y,{children:[(0,h.jsx)(m,{children:e("foodcourt:foodcourtPaymentSettingsPage.currencySettings")}),(0,h.jsx)(f,{children:"Configure supported currencies for subscription plans and invoices."}),(0,h.jsxs)(b,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:e("foodcourt:foodcourtPaymentSettingsPage.defaultCurrency")}),(0,h.jsx)(l.A,{type:"select",onSave:ge,children:(0,h.jsx)(S,{value:Y,onChange:e=>{return t=e.target.value,void J(t);var t},children:O.map(e=>{var t,n;return(0,h.jsxs)("option",{value:e,children:[null===(t=o[e])||void 0===t?void 0:t.symbol," ",e," - ",null===(n=o[e])||void 0===n?void 0:n.name]},e)})})}),(0,h.jsx)(_,{children:e("foodcourt:foodcourtPaymentSettingsPage.usedAsDefaultForNewSubscriptionsAndInvoices")})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:e("foodcourt:foodcourtPaymentSettingsPage.supportedCurrencies")}),(0,h.jsx)(A,{onClick:()=>{G(O),W(!0)},children:O.length>0?O.map(e=>{var t;return(0,h.jsxs)(P,{children:[null===(t=o[e])||void 0===t?void 0:t.symbol," ",e]},e)}):(0,h.jsx)(k,{children:e("foodcourt:foodcourtPaymentSettingsPage.clickToSelectCurrencies")})}),(0,h.jsx)(_,{children:e("foodcourt:foodcourtPaymentSettingsPage.currenciesAvailableForPricingPlansAndInvoices")})]})]})]}),(0,h.jsxs)(y,{children:[(0,h.jsx)(m,{children:e("foodcourt:foodcourtPaymentSettingsPage.onlinePayment")}),(0,h.jsx)(f,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,h.jsxs)(C,{children:[(0,h.jsxs)(w,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)(T,{children:e("foodcourt:foodcourtPaymentSettingsPage.stripe")}),(0,h.jsx)(E,{children:e("foodcourt:foodcourtPaymentSettingsPage.creditdebitCardPayments")})]}),(0,h.jsxs)(B,{children:[(0,h.jsx)($,{type:"checkbox",checked:L.stripe.enabled,onChange:e=>{se("enabled",e.target.checked),setTimeout(ge,0)}}),(0,h.jsx)(N,{})]})]}),L.stripe.enabled&&(0,h.jsxs)(z,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:e("foodcourt:foodcourtPaymentSettingsPage.publishableKey")}),(0,h.jsx)(l.A,{onSave:ge,children:(0,h.jsx)(R,{type:"text",placeholder:"pk_live_...",value:L.stripe.publishableKey,onChange:e=>se("publishableKey",e.target.value)})})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:e("foodcourt:foodcourtPaymentSettingsPage.secretKey")}),(0,h.jsx)(l.A,{onSave:ge,children:(0,h.jsx)(R,{type:"password",placeholder:"sk_live_...",value:L.stripe.secretKey,onChange:e=>se("secretKey",e.target.value)})})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:e("foodcourt:foodcourtPaymentSettingsPage.webhookSecret")}),(0,h.jsx)(l.A,{onSave:ge,children:(0,h.jsx)(R,{type:"password",placeholder:"whsec_...",value:L.stripe.webhookSecret,onChange:e=>se("webhookSecret",e.target.value)})})]}),(0,h.jsx)(j,{children:(0,h.jsxs)(I,{children:[(0,h.jsx)(q,{type:"checkbox",checked:L.stripe.autoCharge,onChange:e=>{se("autoCharge",e.target.checked),setTimeout(ge,0)}}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,h.jsxs)(C,{children:[(0,h.jsxs)(w,{children:[(0,h.jsxs)(F,{children:[(0,h.jsx)(T,{children:e("foodcourt:foodcourtPaymentSettingsPage.paypal")}),(0,h.jsx)(E,{children:e("foodcourt:foodcourtPaymentSettingsPage.paypalAccountOrCard")})]}),(0,h.jsxs)(B,{children:[(0,h.jsx)($,{type:"checkbox",checked:L.paypal.enabled,onChange:e=>{ce("enabled",e.target.checked),setTimeout(ge,0)}}),(0,h.jsx)(N,{})]})]}),L.paypal.enabled&&(0,h.jsxs)(z,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:e("foodcourt:foodcourtPaymentSettingsPage.clientId")}),(0,h.jsx)(l.A,{onSave:ge,children:(0,h.jsx)(R,{type:"text",placeholder:"Enter PayPal Client ID",value:L.paypal.clientId,onChange:e=>ce("clientId",e.target.value)})})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:e("foodcourt:foodcourtPaymentSettingsPage.clientSecret")}),(0,h.jsx)(l.A,{onSave:ge,children:(0,h.jsx)(R,{type:"password",placeholder:"Enter PayPal Client Secret",value:L.paypal.clientSecret,onChange:e=>ce("clientSecret",e.target.value)})})]})]})]})]}),(0,h.jsxs)(y,{children:[(0,h.jsx)(m,{children:e("foodcourt:foodcourtPaymentSettingsPage.manualPayment")}),(0,h.jsx)(f,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===O.length?(0,h.jsx)(D,{children:"No currencies configured. Please add supported currencies above first."}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(i.tU,{children:O.map(e=>{var t;return(0,h.jsxs)(i.oz,{active:te===e,onClick:()=>ne(e),children:[null===(t=o[e])||void 0===t?void 0:t.symbol," ",e]},e)})}),(0,h.jsxs)(C,{children:[(0,h.jsxs)(w,{children:[(0,h.jsxs)(F,{children:[(0,h.jsxs)(T,{children:["Bank Transfer (",te,")"]}),(0,h.jsx)(E,{children:e("foodcourt:foodcourtPaymentSettingsPage.manualTransferWithReceiptUpload")})]}),(0,h.jsxs)(B,{children:[(0,h.jsx)($,{type:"checkbox",checked:pe(te).enabled,onChange:e=>{de(te,"enabled",e.target.checked),setTimeout(ge,0)}}),(0,h.jsx)(N,{})]})]}),pe(te).enabled&&(0,h.jsxs)(z,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:e("foodcourt:foodcourtPaymentSettingsPage.bankName")}),(0,h.jsx)(l.A,{onSave:ge,children:(0,h.jsx)(R,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:pe(te).bankName,onChange:e=>de(te,"bankName",e.target.value)})})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:e("foodcourt:foodcourtPaymentSettingsPage.accountNumber")}),(0,h.jsx)(l.A,{onSave:ge,children:(0,h.jsx)(R,{type:"text",placeholder:"Enter bank account number",value:pe(te).accountNumber,onChange:e=>de(te,"accountNumber",e.target.value)})})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:e("foodcourt:foodcourtPaymentSettingsPage.accountName")}),(0,h.jsx)(l.A,{onSave:ge,children:(0,h.jsx)(R,{type:"text",placeholder:"Enter account holder name",value:pe(te).accountName,onChange:e=>de(te,"accountName",e.target.value)})})]})]})]}),(0,h.jsxs)(C,{children:[(0,h.jsxs)(w,{children:[(0,h.jsxs)(F,{children:[(0,h.jsxs)(T,{children:["QR Payment (",te,")"]}),(0,h.jsx)(E,{children:e("foodcourt:foodcourtPaymentSettingsPage.scanQrCodeToPayDuitnowKakaopayEtc")})]}),(0,h.jsxs)(B,{children:[(0,h.jsx)($,{type:"checkbox",checked:ue(te).enabled,onChange:e=>{le(te,"enabled",e.target.checked),setTimeout(ge,0)}}),(0,h.jsx)(N,{})]})]}),ue(te).enabled&&(0,h.jsxs)(z,{children:[(0,h.jsx)(c.A,{value:ue(te).qrImage,onChange:e=>le(te,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${te} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,h.jsxs)(j,{style:{marginTop:"16px"},children:[(0,h.jsx)(v,{children:e("foodcourt:foodcourtPaymentSettingsPage.description")}),(0,h.jsx)(l.A,{onSave:ge,children:(0,h.jsx)(R,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:ue(te).qrDescription,onChange:e=>le(te,"qrDescription",e.target.value)})}),(0,h.jsx)(_,{children:e("foodcourt:foodcourtPaymentSettingsPage.shortDescriptionShownBelowTheQrCode")})]})]})]}),(0,h.jsxs)(m,{style:{fontSize:"15px",marginTop:"24px",marginBottom:"8px"},children:["Additional Charges (",te,")"]}),(0,h.jsxs)(f,{style:{marginBottom:"12px"},children:["Configure tax, service charge, etc. for ",te," invoices. Up to 3 items."]}),[0,1,2].map(t=>{const n=(r=te,L.additionalCharges[r]||he)[t]||{enabled:!1,name:"",rate:0};var r;return(0,h.jsxs)(C,{style:{marginBottom:"12px"},children:[(0,h.jsxs)(w,{children:[(0,h.jsxs)(F,{children:[(0,h.jsxs)(T,{children:["Charge Item ",t+1]}),(0,h.jsx)(E,{children:n.enabled&&n.name?`${n.name} (${n.rate}%)`:"Not configured"})]}),(0,h.jsxs)(B,{children:[(0,h.jsx)($,{type:"checkbox",checked:n.enabled,onChange:e=>{xe(te,t,"enabled",e.target.checked),setTimeout(ge,0)}}),(0,h.jsx)(N,{})]})]}),n.enabled&&(0,h.jsx)(z,{children:(0,h.jsxs)(b,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:e("foodcourt:foodcourtPaymentSettingsPage.itemName")}),(0,h.jsx)(l.A,{onSave:ge,children:(0,h.jsx)(R,{type:"text",value:n.name,onChange:e=>xe(te,t,"name",e.target.value),placeholder:"e.g., SST, VAT, Service Charge"})}),(0,h.jsx)(_,{children:e("foodcourt:foodcourtPaymentSettingsPage.nameDisplayedOnInvoices")})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(v,{children:"Rate (%)"}),(0,h.jsx)(l.A,{onSave:ge,children:(0,h.jsx)(R,{type:"number",min:"0",max:"100",step:"0.01",value:n.rate,onChange:e=>xe(te,t,"rate",parseFloat(e.target.value)||0),placeholder:"0"})}),(0,h.jsx)(_,{children:e("foodcourt:foodcourtPaymentSettingsPage.percentageToAddToSubtotal")})]})]})})]},`charge-${te}-${t}`)})]})]})]})]}),(0,h.jsxs)(s.aF,{isOpen:V,onClose:()=>W(!1),title:"Select Supported Currencies",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s.yl,{variant:"secondary",onClick:()=>W(!1),children:"Cancel"}),(0,h.jsxs)(s.yl,{variant:"primary",onClick:async()=>{if(n)try{const e=(0,u.c4)();if(!(await fetch(`/api/foodcourts/${n}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({supported_currencies:X})})).ok)throw new Error("Failed to update currencies");U(X),W(!1),!X.includes(Y)&&X.length>0&&J(X[0]),X.length>0&&!X.includes(te)&&ne(X[0])}catch(e){console.error("Error updating supported currencies:",e)}},disabled:0===X.length,children:["Save (",X.length," selected)"]})]}),children:[(0,h.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select from the currencies enabled by System Administrator."}),0===H.length?(0,h.jsx)("p",{style:{color:"#DC2626",padding:"16px",background:"#FEF2F2",borderRadius:"8px"},children:"No currencies have been configured by System Administrator yet."}):(0,h.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:H.map(e=>{const t=o[e];return t?(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(X.includes(e)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:X.includes(e)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,h.jsx)("input",{type:"checkbox",checked:X.includes(e),onChange:()=>(e=>{G(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(e),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,h.jsxs)("div",{children:[(0,h.jsxs)("div",{style:{fontWeight:500},children:[t.symbol," ",e]}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:t.name})]})]},e):null})})]})]})}}}]);