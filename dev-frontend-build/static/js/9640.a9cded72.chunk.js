"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9640],{5370:(e,n,t)=>{t.d(n,{A:()=>f});var r=t(9950),a=t(4752),i=t(4414);const s=a.i7`
  from { opacity: 0; }
  to { opacity: 1; }
`,o=a.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,c=a.i7`
  to { transform: rotate(360deg); }
`,l=a.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,d=a.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?a.AH`${o} 0.3s ease forwards`:a.AH`${s} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=a.Ay.div`
  ${d}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,h=a.Ay.div`
  ${d}
  position: absolute;
  right: -6px;
  top: -6px;
`,u=a.Ay.div`
  ${d}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,x=a.Ay.div`
  ${d}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,g=a.Ay.div`
  ${d}
  position: absolute;
  right: -8px;
  top: -8px;
`,m=a.Ay.span`
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
`,y=a.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${c} 0.6s linear infinite;
`,b=a.Ay.span`
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
`,j=(0,r.forwardRef)((e,n)=>{let{children:t,onSave:a,type:s="input",debounceMs:o=2e3,style:c}=e;const[d,j]=(0,r.useState)("idle"),[f,v]=(0,r.useState)(!1),S=(0,r.useRef)(null),C=(0,r.useRef)(null),k=(0,r.useRef)(null),A=(0,r.useRef)(!0),w=(0,r.useRef)(a);w.current=a;const F=(0,r.useCallback)(()=>{S.current&&clearTimeout(S.current),C.current&&clearTimeout(C.current),k.current&&clearTimeout(k.current)},[]),P=2e3!==o?o:"toggle"===s||"select"===s||"list"===s||"image"===s?300:o,T=(0,r.useCallback)(()=>{F(),v(!1),j("saving"),S.current=setTimeout(async()=>{if(A.current)try{if(await w.current(),!A.current)return;j("saved"),C.current=setTimeout(()=>{A.current&&(v(!0),k.current=setTimeout(()=>{A.current&&(j("idle"),v(!1))},300))},2e3)}catch{if(!A.current)return;j("error"),C.current=setTimeout(()=>{A.current&&(v(!0),k.current=setTimeout(()=>{A.current&&(j("idle"),v(!1))},300))},4e3)}},P)},[P,F]);(0,r.useImperativeHandle)(n,()=>({triggerSave:T}),[T]),(0,r.useEffect)(()=>(A.current=!0,()=>{A.current=!1,F()}),[F]);const B=r.Children.map(t,e=>{if(!r.isValidElement(e))return e;const n=e.props.onChange;return"function"!==typeof n?e:r.cloneElement(e,{onChange:function(){n(...arguments),T()}})}),E="saving"===d?(0,i.jsx)(y,{}):"saved"===d?(0,i.jsx)(m,{children:"\u2713"}):"error"===d?(0,i.jsx)(b,{children:"!"}):null,$="select"===s?h:"toggle"===s?u:"image"===s?x:"list"===s?g:p;return(0,i.jsxs)(l,{$type:s,style:c,children:[B,"idle"!==d&&(0,i.jsx)($,{$fading:f,children:E})]})});j.displayName="AutoSaveField";const f=j},9640:(e,n,t)=>{t.r(n),t.d(n,{default:()=>K});var r=t(9950),a=t(4752),i=t(8012),s=t(9610),o=t(4877),c=t(5370),l=t(5030),d=t(9955),p=t(4414);const h=a.Ay.div`
  min-height: 100vh;
`,u=a.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,x=a.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,g=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,m=a.Ay.p`
  color: #6B7C93;
  font-size: 14px;
  margin-bottom: 20px;
`,y=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,b=a.Ay.div`
  margin-bottom: 16px;
`,j=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,f=a.Ay.select`
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
`,v=a.Ay.div`
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
`,S=a.Ay.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`,C=a.Ay.span`
  color: #9CA3AF;
`,k=a.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`,A=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,w=a.Ay.div``,F=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,P=a.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-top: 2px;
`,T=a.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`,B=a.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #635BFF;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`,E=a.Ay.span`
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
`,$=a.Ay.div`
  border-top: 1px solid #E6EBF1;
  margin-top: 16px;
  padding-top: 16px;
`,z=a.Ay.input`
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
`,N=a.Ay.p`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,R=a.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
`,I=a.Ay.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`,q=a.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid #E6EBF1;
  padding-bottom: 0;
  overflow-x: auto;
`,D=a.Ay.button`
  padding: 10px 16px;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  border-bottom: 2px solid ${e=>e.active?"#635BFF":"transparent"};
  margin-bottom: -1px;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    color: #635BFF;
  }
`,O=a.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,Q={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:{}},K=()=>{const{t:e}=(0,l.Bd)("admin"),[n,t]=(0,r.useState)({}),[a,K]=(0,r.useState)([]),[H,U]=(0,r.useState)("MYR"),[Y,_]=(0,r.useState)(!1),[J,M]=(0,r.useState)([]),[W,V]=(0,r.useState)({}),[X,G]=(0,r.useState)([]),[L,Z]=(0,r.useState)(!1),[ee,ne]=(0,r.useState)([]),[te,re]=(0,r.useState)(Q),ae=(0,r.useRef)(Q),[ie,se]=(0,r.useState)(""),[oe,ce]=(0,r.useState)(!0);(0,r.useEffect)(()=>{le()},[]),(0,r.useEffect)(()=>{a.length>0&&!ie&&se(a[0])},[a,ie]);const le=async()=>{try{const e={Authorization:`Bearer ${(0,d.c4)()}`},[n,r,a,i,s]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch("/api/admin/payment-settings",{headers:e}),fetch("/api/currencies/countries/config"),fetch("/api/currencies/countries/supported")]);if(n.ok){const e=await n.json();e.success&&e.currencies&&(t(e.currencies),e.defaultCurrency&&U(e.defaultCurrency))}if(r.ok){const e=await r.json();if(e.success&&e.data){const n=e.data.map(e=>e.code);K(n),n.length>0&&se(n[0])}}if(a.ok){const e=await a.json();if(e&&Object.keys(e).length>0){let n=e.additionalCharges||{};Array.isArray(n)&&(n={});const t={...Q,...e,bankTransfer:e.bankTransfer||{},qrPayment:e.qrPayment||{},additionalCharges:n};ae.current=t,re(t)}}if(i.ok){const e=await i.json();if(e.success&&e.data){const n={};e.data.forEach(e=>{n[e.code]={name:e.name,currency:e.currency,flag:e.flag}}),V(n)}}if(s.ok){const e=await s.json();e.success&&e.data&&G(e.data.map(e=>e.code))}}catch(e){console.error("Error loading settings:",e)}finally{ce(!1)}},de=async e=>{try{const n=(0,d.c4)();(await fetch("/api/currencies/default",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({defaultCurrency:e})})).ok&&U(e)}catch(n){console.error("Error updating default currency:",n)}},pe=e=>{re(n=>{const t=e(n);return ae.current=t,t})},he=(e,n)=>{pe(t=>({...t,stripe:{...t.stripe,[e]:n}}))},ue=(e,n)=>{pe(t=>({...t,paypal:{...t.paypal,[e]:n}}))},xe=(e,n,t)=>{pe(r=>({...r,bankTransfer:{...r.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...r.bankTransfer[e],[n]:t}}}))},ge=(e,n,t)=>{pe(r=>({...r,qrPayment:{...r.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...r.qrPayment[e],[n]:t}}}))},me=e=>te.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},ye=e=>te.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""},be=[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}],je=(e,n,t,r)=>{pe(a=>{const i=[...a.additionalCharges[e]||be];return i[n]={...i[n],[t]:r},{...a,additionalCharges:{...a.additionalCharges,[e]:i}}})},fe=async()=>{try{const e=(0,d.c4)(),n=await fetch("/api/admin/payment-settings",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(ae.current)}),t=await n.json();if(!n.ok)throw new Error(t.error||t.details||"Failed to save")}catch(e){throw console.error("Error saving payment settings:",e),e}};return oe?(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(h,{children:[(0,p.jsx)(i.Ay,{title:"Payment Settings"}),(0,p.jsx)(u,{children:(0,p.jsx)("p",{children:e("admin:paymentSettingsPage.loading")})})]})}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(i.Ay,{title:"Payment Settings"}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(x,{children:[(0,p.jsx)(g,{children:e("admin:paymentSettingsPage.currencySettings")}),(0,p.jsx)(m,{children:"Configure supported currencies for subscription plans and invoices."}),(0,p.jsxs)(y,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(j,{children:e("admin:paymentSettingsPage.defaultCurrency")}),(0,p.jsx)(f,{value:H,onChange:e=>de(e.target.value),children:a.map(e=>{var t,r;return(0,p.jsxs)("option",{value:e,children:[null===(t=n[e])||void 0===t?void 0:t.symbol," ",e," - ",null===(r=n[e])||void 0===r?void 0:r.name]},e)})}),(0,p.jsx)(N,{children:e("admin:paymentSettingsPage.usedAsDefaultForNewSubscriptionsAndInvoices")})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(j,{children:e("admin:paymentSettingsPage.supportedCurrencies")}),(0,p.jsx)(v,{onClick:()=>{M(a),_(!0)},children:a.length>0?a.map(e=>{var t;return(0,p.jsxs)(S,{children:[null===(t=n[e])||void 0===t?void 0:t.symbol," ",e]},e)}):(0,p.jsx)(C,{children:e("admin:paymentSettingsPage.clickToSelectCurrencies")})}),(0,p.jsx)(N,{children:e("admin:paymentSettingsPage.currenciesAvailableForPricingPlansAndInvoices")})]})]}),(0,p.jsx)(y,{children:(0,p.jsxs)(b,{children:[(0,p.jsx)(j,{children:e("admin:paymentSettingsPage.supportedCountries")}),(0,p.jsx)(v,{onClick:()=>{ne(X),Z(!0)},children:X.length>0?X.map(e=>{var n,t;return(0,p.jsxs)(S,{children:[null===(n=W[e])||void 0===n?void 0:n.flag," ",(null===(t=W[e])||void 0===t?void 0:t.name)||e]},e)}):(0,p.jsx)(C,{children:e("admin:paymentSettingsPage.clickToSelectCountries")})}),(0,p.jsx)(N,{children:e("admin:paymentSettingsPage.countriesWhereHardwareProductsAreAvailableForSale")})]})})]}),(0,p.jsxs)(x,{children:[(0,p.jsx)(g,{children:e("admin:paymentSettingsPage.onlinePayment")}),(0,p.jsx)(m,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,p.jsxs)(k,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{children:e("admin:paymentSettingsPage.stripe")}),(0,p.jsx)(P,{children:e("admin:paymentSettingsPage.creditdebitCardPayments")})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(B,{type:"checkbox",checked:te.stripe.enabled,onChange:e=>{he("enabled",e.target.checked),setTimeout(fe,0)}}),(0,p.jsx)(E,{})]})]}),te.stripe.enabled&&(0,p.jsxs)($,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(j,{children:e("admin:paymentSettingsPage.publishableKey")}),(0,p.jsx)(c.A,{onSave:fe,children:(0,p.jsx)(z,{type:"text",placeholder:"pk_live_...",value:te.stripe.publishableKey,onChange:e=>he("publishableKey",e.target.value)})})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(j,{children:e("admin:paymentSettingsPage.secretKey")}),(0,p.jsx)(c.A,{onSave:fe,children:(0,p.jsx)(z,{type:"password",placeholder:"sk_live_...",value:te.stripe.secretKey,onChange:e=>he("secretKey",e.target.value)})})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(j,{children:e("admin:paymentSettingsPage.webhookSecret")}),(0,p.jsx)(c.A,{onSave:fe,children:(0,p.jsx)(z,{type:"password",placeholder:"whsec_...",value:te.stripe.webhookSecret,onChange:e=>he("webhookSecret",e.target.value)})})]}),(0,p.jsx)(b,{children:(0,p.jsxs)(R,{children:[(0,p.jsx)(I,{type:"checkbox",checked:te.stripe.autoCharge,onChange:e=>{he("autoCharge",e.target.checked),setTimeout(fe,0)}}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,p.jsxs)(k,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(w,{children:[(0,p.jsx)(F,{children:e("admin:paymentSettingsPage.paypal")}),(0,p.jsx)(P,{children:e("admin:paymentSettingsPage.paypalAccountOrCard")})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(B,{type:"checkbox",checked:te.paypal.enabled,onChange:e=>{ue("enabled",e.target.checked),setTimeout(fe,0)}}),(0,p.jsx)(E,{})]})]}),te.paypal.enabled&&(0,p.jsxs)($,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(j,{children:e("admin:paymentSettingsPage.clientId")}),(0,p.jsx)(c.A,{onSave:fe,children:(0,p.jsx)(z,{type:"text",placeholder:"Enter PayPal Client ID",value:te.paypal.clientId,onChange:e=>ue("clientId",e.target.value)})})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(j,{children:e("admin:paymentSettingsPage.clientSecret")}),(0,p.jsx)(c.A,{onSave:fe,children:(0,p.jsx)(z,{type:"password",placeholder:"Enter PayPal Client Secret",value:te.paypal.clientSecret,onChange:e=>ue("clientSecret",e.target.value)})})]})]})]})]}),(0,p.jsxs)(x,{children:[(0,p.jsx)(g,{children:e("admin:paymentSettingsPage.manualPayment")}),(0,p.jsx)(m,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===a.length?(0,p.jsx)(O,{children:"No currencies configured. Please add supported currencies above first."}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(q,{children:a.map(e=>{var t;return(0,p.jsxs)(D,{active:ie===e,onClick:()=>se(e),children:[null===(t=n[e])||void 0===t?void 0:t.symbol," ",e]},e)})}),(0,p.jsxs)(k,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(w,{children:[(0,p.jsxs)(F,{children:["Bank Transfer (",ie,")"]}),(0,p.jsx)(P,{children:e("admin:paymentSettingsPage.manualTransferWithReceiptUpload")})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(B,{type:"checkbox",checked:me(ie).enabled,onChange:e=>{xe(ie,"enabled",e.target.checked),setTimeout(fe,0)}}),(0,p.jsx)(E,{})]})]}),me(ie).enabled&&(0,p.jsxs)($,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(j,{children:e("admin:paymentSettingsPage.bankName")}),(0,p.jsx)(c.A,{onSave:fe,children:(0,p.jsx)(z,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:me(ie).bankName,onChange:e=>xe(ie,"bankName",e.target.value)})})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(j,{children:e("admin:paymentSettingsPage.accountNumber")}),(0,p.jsx)(c.A,{onSave:fe,children:(0,p.jsx)(z,{type:"text",placeholder:"Enter bank account number",value:me(ie).accountNumber,onChange:e=>xe(ie,"accountNumber",e.target.value)})})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(j,{children:e("admin:paymentSettingsPage.accountName")}),(0,p.jsx)(c.A,{onSave:fe,children:(0,p.jsx)(z,{type:"text",placeholder:"Enter account holder name",value:me(ie).accountName,onChange:e=>xe(ie,"accountName",e.target.value)})})]})]})]}),(0,p.jsxs)(k,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(w,{children:[(0,p.jsxs)(F,{children:["QR Payment (",ie,")"]}),(0,p.jsx)(P,{children:e("admin:paymentSettingsPage.scanQrCodeToPayDuitnowKakaopayEtc")})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(B,{type:"checkbox",checked:ye(ie).enabled,onChange:e=>{ge(ie,"enabled",e.target.checked),setTimeout(fe,0)}}),(0,p.jsx)(E,{})]})]}),ye(ie).enabled&&(0,p.jsxs)($,{children:[(0,p.jsx)(o.A,{value:ye(ie).qrImage,onChange:e=>ge(ie,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${ie} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,p.jsxs)(b,{style:{marginTop:"16px"},children:[(0,p.jsx)(j,{children:e("admin:paymentSettingsPage.description")}),(0,p.jsx)(c.A,{onSave:fe,children:(0,p.jsx)(z,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:ye(ie).qrDescription,onChange:e=>ge(ie,"qrDescription",e.target.value)})}),(0,p.jsx)(N,{children:e("admin:paymentSettingsPage.shortDescriptionShownBelowTheQrCode")})]})]})]}),(0,p.jsxs)(g,{style:{fontSize:"15px",marginTop:"24px",marginBottom:"8px"},children:["Additional Charges (",ie,")"]}),(0,p.jsxs)(m,{style:{marginBottom:"12px"},children:["Configure tax, service charge, etc. for ",ie," invoices. Up to 3 items."]}),[0,1,2].map(n=>{const t=(r=ie,te.additionalCharges[r]||be)[n]||{enabled:!1,name:"",rate:0};var r;return(0,p.jsxs)(k,{style:{marginBottom:"12px"},children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(w,{children:[(0,p.jsxs)(F,{children:["Charge Item ",n+1]}),(0,p.jsx)(P,{children:t.enabled&&t.name?`${t.name} (${t.rate}%)`:"Not configured"})]}),(0,p.jsxs)(T,{children:[(0,p.jsx)(B,{type:"checkbox",checked:t.enabled,onChange:e=>{je(ie,n,"enabled",e.target.checked),setTimeout(fe,0)}}),(0,p.jsx)(E,{})]})]}),t.enabled&&(0,p.jsx)($,{children:(0,p.jsxs)(y,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(j,{children:e("admin:paymentSettingsPage.itemName")}),(0,p.jsx)(c.A,{onSave:fe,children:(0,p.jsx)(z,{type:"text",value:t.name,onChange:e=>je(ie,n,"name",e.target.value),placeholder:"e.g., SST, VAT, Service Charge"})}),(0,p.jsx)(N,{children:e("admin:paymentSettingsPage.nameDisplayedOnInvoices")})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(j,{children:"Rate (%)"}),(0,p.jsx)(c.A,{onSave:fe,children:(0,p.jsx)(z,{type:"number",min:"0",max:"100",step:"0.01",value:t.rate,onChange:e=>je(ie,n,"rate",parseFloat(e.target.value)||0),placeholder:"0"})}),(0,p.jsx)(N,{children:e("admin:paymentSettingsPage.percentageToAddToSubtotal")})]})]})})]},`charge-${ie}-${n}`)})]})]})]})]}),(0,p.jsxs)(s.aF,{isOpen:Y,onClose:()=>_(!1),title:"Select Supported Currencies",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s.yl,{variant:"secondary",onClick:()=>_(!1),children:"Cancel"}),(0,p.jsxs)(s.yl,{variant:"primary",onClick:async()=>{try{const e=(0,d.c4)();(await fetch("/api/currencies/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currencies:J})})).ok&&(K(J),_(!1),!J.includes(H)&&J.length>0&&await de(J[0]),J.length>0&&!J.includes(ie)&&se(J[0]))}catch(e){console.error("Error updating supported currencies:",e)}},disabled:0===J.length,children:["Save (",J.length," selected)"]})]}),children:[(0,p.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the currencies you want to support for subscription plans and invoices."}),(0,p.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(n).map(e=>{let[n,t]=e;return(0,p.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(J.includes(n)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:J.includes(n)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,p.jsx)("input",{type:"checkbox",checked:J.includes(n),onChange:()=>(e=>{M(n=>n.includes(e)?n.filter(n=>n!==e):[...n,e])})(n),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{style:{fontWeight:500},children:[t.symbol," ",n]}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:t.name})]})]},n)})})]}),(0,p.jsxs)(s.aF,{isOpen:L,onClose:()=>Z(!1),title:"Select Supported Countries",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s.yl,{variant:"secondary",onClick:()=>Z(!1),children:"Cancel"}),(0,p.jsxs)(s.yl,{variant:"primary",onClick:async()=>{try{const e=(0,d.c4)();(await fetch("/api/currencies/countries/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({countries:ee})})).ok&&(G(ee),Z(!1))}catch(e){console.error("Error updating supported countries:",e)}},disabled:0===ee.length,children:["Save (",ee.length," selected)"]})]}),children:[(0,p.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the countries where you sell hardware products. These will be shown on the Packages page and available in product settings."}),(0,p.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(W).map(e=>{let[n,t]=e;return(0,p.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(ee.includes(n)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:ee.includes(n)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,p.jsx)("input",{type:"checkbox",checked:ee.includes(n),onChange:()=>(e=>{ne(n=>n.includes(e)?n.filter(n=>n!==e):[...n,e])})(n),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{style:{fontWeight:500},children:[t.flag," ",t.name]}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:t.currency})]})]},n)})})]})]})}}}]);