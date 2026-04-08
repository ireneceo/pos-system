"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9640],{5370:(e,t,n)=>{n.d(t,{A:()=>f});var r=n(9950),a=n(4752),i=n(4414);const s=a.i7`
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
`,j=(0,r.forwardRef)((e,t)=>{let{children:n,onSave:a,type:s="input",debounceMs:o=2e3,style:c}=e;const[d,j]=(0,r.useState)("idle"),[f,v]=(0,r.useState)(!1),S=(0,r.useRef)(null),k=(0,r.useRef)(null),C=(0,r.useRef)(null),A=(0,r.useRef)(!0),w=(0,r.useRef)(a);w.current=a;const F=(0,r.useCallback)(()=>{S.current&&clearTimeout(S.current),k.current&&clearTimeout(k.current),C.current&&clearTimeout(C.current)},[]),P=2e3!==o?o:"toggle"===s||"select"===s||"list"===s||"image"===s?300:o,T=(0,r.useCallback)(()=>{F(),v(!1),j("saving"),S.current=setTimeout(async()=>{if(A.current)try{if(await w.current(),!A.current)return;j("saved"),k.current=setTimeout(()=>{A.current&&(v(!0),C.current=setTimeout(()=>{A.current&&(j("idle"),v(!1))},300))},2e3)}catch{if(!A.current)return;j("error"),k.current=setTimeout(()=>{A.current&&(v(!0),C.current=setTimeout(()=>{A.current&&(j("idle"),v(!1))},300))},4e3)}},P)},[P,F]);(0,r.useImperativeHandle)(t,()=>({triggerSave:T}),[T]),(0,r.useEffect)(()=>(A.current=!0,()=>{A.current=!1,F()}),[F]);const B=r.Children.map(n,e=>{if(!r.isValidElement(e))return e;const t=e.props.onChange;return"function"!==typeof t?e:r.cloneElement(e,{onChange:function(){t(...arguments),T()}})}),E="saving"===d?(0,i.jsx)(y,{}):"saved"===d?(0,i.jsx)(m,{children:"\u2713"}):"error"===d?(0,i.jsx)(b,{children:"!"}):null,$="select"===s?h:"toggle"===s?u:"image"===s?x:"list"===s?g:p;return(0,i.jsxs)(l,{$type:s,style:c,children:[B,"idle"!==d&&(0,i.jsx)($,{$fading:f,children:E})]})});j.displayName="AutoSaveField";const f=j},9640:(e,t,n)=>{n.r(t),n.d(t,{default:()=>Q});var r=n(9950),a=n(4752),i=n(8012),s=n(9610),o=n(4877),c=n(5370),l=n(5030),d=n(4414);const p=a.Ay.div`
  min-height: 100vh;
`,h=a.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,u=a.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,x=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,g=a.Ay.p`
  color: #6B7C93;
  font-size: 14px;
  margin-bottom: 20px;
`,m=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,y=a.Ay.div`
  margin-bottom: 16px;
`,b=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,j=a.Ay.select`
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
`,f=a.Ay.div`
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
`,v=a.Ay.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`,S=a.Ay.span`
  color: #9CA3AF;
`,k=a.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`,C=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,A=a.Ay.div``,w=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,F=a.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-top: 2px;
`,P=a.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`,T=a.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #635BFF;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`,B=a.Ay.span`
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
`,E=a.Ay.div`
  border-top: 1px solid #E6EBF1;
  margin-top: 16px;
  padding-top: 16px;
`,$=a.Ay.input`
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
`,z=a.Ay.p`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,N=a.Ay.label`
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
`,R=a.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid #E6EBF1;
  padding-bottom: 0;
  overflow-x: auto;
`,q=a.Ay.button`
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
`,D=a.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,O={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:{}},Q=()=>{const{t:e}=(0,l.Bd)("admin"),[t,n]=(0,r.useState)({}),[a,Q]=(0,r.useState)([]),[_,K]=(0,r.useState)("MYR"),[H,U]=(0,r.useState)(!1),[Y,J]=(0,r.useState)([]),[M,W]=(0,r.useState)({}),[V,X]=(0,r.useState)([]),[G,L]=(0,r.useState)(!1),[Z,ee]=(0,r.useState)([]),[te,ne]=(0,r.useState)(O),re=(0,r.useRef)(O),[ae,ie]=(0,r.useState)(""),[se,oe]=(0,r.useState)(!0);(0,r.useEffect)(()=>{ce()},[]),(0,r.useEffect)(()=>{a.length>0&&!ae&&ie(a[0])},[a,ae]);const ce=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[t,r,a,i,s]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch("/api/admin/payment-settings",{headers:e}),fetch("/api/currencies/countries/config"),fetch("/api/currencies/countries/supported")]);if(t.ok){const e=await t.json();e.success&&e.currencies&&(n(e.currencies),e.defaultCurrency&&K(e.defaultCurrency))}if(r.ok){const e=await r.json();if(e.success&&e.data){const t=e.data.map(e=>e.code);Q(t),t.length>0&&ie(t[0])}}if(a.ok){const e=await a.json();if(e&&Object.keys(e).length>0){let t=e.additionalCharges||{};Array.isArray(t)&&(t={});const n={...O,...e,bankTransfer:e.bankTransfer||{},qrPayment:e.qrPayment||{},additionalCharges:t};re.current=n,ne(n)}}if(i.ok){const e=await i.json();if(e.success&&e.data){const t={};e.data.forEach(e=>{t[e.code]={name:e.name,currency:e.currency,flag:e.flag}}),W(t)}}if(s.ok){const e=await s.json();e.success&&e.data&&X(e.data.map(e=>e.code))}}catch(e){console.error("Error loading settings:",e)}finally{oe(!1)}},le=async e=>{try{const t=localStorage.getItem("auth_token");(await fetch("/api/currencies/default",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({defaultCurrency:e})})).ok&&K(e)}catch(t){console.error("Error updating default currency:",t)}},de=e=>{ne(t=>{const n=e(t);return re.current=n,n})},pe=(e,t)=>{de(n=>({...n,stripe:{...n.stripe,[e]:t}}))},he=(e,t)=>{de(n=>({...n,paypal:{...n.paypal,[e]:t}}))},ue=(e,t,n)=>{de(r=>({...r,bankTransfer:{...r.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...r.bankTransfer[e],[t]:n}}}))},xe=(e,t,n)=>{de(r=>({...r,qrPayment:{...r.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...r.qrPayment[e],[t]:n}}}))},ge=e=>te.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},me=e=>te.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""},ye=[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}],be=(e,t,n,r)=>{de(a=>{const i=[...a.additionalCharges[e]||ye];return i[t]={...i[t],[n]:r},{...a,additionalCharges:{...a.additionalCharges,[e]:i}}})},je=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/admin/payment-settings",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(re.current)}),n=await t.json();if(!t.ok)throw new Error(n.error||n.details||"Failed to save")}catch(e){throw console.error("Error saving payment settings:",e),e}};return se?(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(p,{children:[(0,d.jsx)(i.Ay,{title:"Payment Settings"}),(0,d.jsx)(h,{children:(0,d.jsx)("p",{children:e("admin:paymentSettingsPage.loading")})})]})}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(i.Ay,{title:"Payment Settings"}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(u,{children:[(0,d.jsx)(x,{children:e("admin:paymentSettingsPage.currencySettings")}),(0,d.jsx)(g,{children:"Configure supported currencies for subscription plans and invoices."}),(0,d.jsxs)(m,{children:[(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:e("admin:paymentSettingsPage.defaultCurrency")}),(0,d.jsx)(j,{value:_,onChange:e=>le(e.target.value),children:a.map(e=>{var n,r;return(0,d.jsxs)("option",{value:e,children:[null===(n=t[e])||void 0===n?void 0:n.symbol," ",e," - ",null===(r=t[e])||void 0===r?void 0:r.name]},e)})}),(0,d.jsx)(z,{children:e("admin:paymentSettingsPage.usedAsDefaultForNewSubscriptionsAndInvoices")})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:e("admin:paymentSettingsPage.supportedCurrencies")}),(0,d.jsx)(f,{onClick:()=>{J(a),U(!0)},children:a.length>0?a.map(e=>{var n;return(0,d.jsxs)(v,{children:[null===(n=t[e])||void 0===n?void 0:n.symbol," ",e]},e)}):(0,d.jsx)(S,{children:e("admin:paymentSettingsPage.clickToSelectCurrencies")})}),(0,d.jsx)(z,{children:e("admin:paymentSettingsPage.currenciesAvailableForPricingPlansAndInvoices")})]})]}),(0,d.jsx)(m,{children:(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:e("admin:paymentSettingsPage.supportedCountries")}),(0,d.jsx)(f,{onClick:()=>{ee(V),L(!0)},children:V.length>0?V.map(e=>{var t,n;return(0,d.jsxs)(v,{children:[null===(t=M[e])||void 0===t?void 0:t.flag," ",(null===(n=M[e])||void 0===n?void 0:n.name)||e]},e)}):(0,d.jsx)(S,{children:e("admin:paymentSettingsPage.clickToSelectCountries")})}),(0,d.jsx)(z,{children:e("admin:paymentSettingsPage.countriesWhereHardwareProductsAreAvailableForSale")})]})})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(x,{children:e("admin:paymentSettingsPage.onlinePayment")}),(0,d.jsx)(g,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:[(0,d.jsxs)(A,{children:[(0,d.jsx)(w,{children:e("admin:paymentSettingsPage.stripe")}),(0,d.jsx)(F,{children:e("admin:paymentSettingsPage.creditdebitCardPayments")})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)(T,{type:"checkbox",checked:te.stripe.enabled,onChange:e=>{pe("enabled",e.target.checked),setTimeout(je,0)}}),(0,d.jsx)(B,{})]})]}),te.stripe.enabled&&(0,d.jsxs)(E,{children:[(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:e("admin:paymentSettingsPage.publishableKey")}),(0,d.jsx)(c.A,{onSave:je,children:(0,d.jsx)($,{type:"text",placeholder:"pk_live_...",value:te.stripe.publishableKey,onChange:e=>pe("publishableKey",e.target.value)})})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:e("admin:paymentSettingsPage.secretKey")}),(0,d.jsx)(c.A,{onSave:je,children:(0,d.jsx)($,{type:"password",placeholder:"sk_live_...",value:te.stripe.secretKey,onChange:e=>pe("secretKey",e.target.value)})})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:e("admin:paymentSettingsPage.webhookSecret")}),(0,d.jsx)(c.A,{onSave:je,children:(0,d.jsx)($,{type:"password",placeholder:"whsec_...",value:te.stripe.webhookSecret,onChange:e=>pe("webhookSecret",e.target.value)})})]}),(0,d.jsx)(y,{children:(0,d.jsxs)(N,{children:[(0,d.jsx)(I,{type:"checkbox",checked:te.stripe.autoCharge,onChange:e=>{pe("autoCharge",e.target.checked),setTimeout(je,0)}}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:[(0,d.jsxs)(A,{children:[(0,d.jsx)(w,{children:e("admin:paymentSettingsPage.paypal")}),(0,d.jsx)(F,{children:e("admin:paymentSettingsPage.paypalAccountOrCard")})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)(T,{type:"checkbox",checked:te.paypal.enabled,onChange:e=>{he("enabled",e.target.checked),setTimeout(je,0)}}),(0,d.jsx)(B,{})]})]}),te.paypal.enabled&&(0,d.jsxs)(E,{children:[(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:e("admin:paymentSettingsPage.clientId")}),(0,d.jsx)(c.A,{onSave:je,children:(0,d.jsx)($,{type:"text",placeholder:"Enter PayPal Client ID",value:te.paypal.clientId,onChange:e=>he("clientId",e.target.value)})})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:e("admin:paymentSettingsPage.clientSecret")}),(0,d.jsx)(c.A,{onSave:je,children:(0,d.jsx)($,{type:"password",placeholder:"Enter PayPal Client Secret",value:te.paypal.clientSecret,onChange:e=>he("clientSecret",e.target.value)})})]})]})]})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(x,{children:e("admin:paymentSettingsPage.manualPayment")}),(0,d.jsx)(g,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===a.length?(0,d.jsx)(D,{children:"No currencies configured. Please add supported currencies above first."}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(R,{children:a.map(e=>{var n;return(0,d.jsxs)(q,{active:ae===e,onClick:()=>ie(e),children:[null===(n=t[e])||void 0===n?void 0:n.symbol," ",e]},e)})}),(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:[(0,d.jsxs)(A,{children:[(0,d.jsxs)(w,{children:["Bank Transfer (",ae,")"]}),(0,d.jsx)(F,{children:e("admin:paymentSettingsPage.manualTransferWithReceiptUpload")})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)(T,{type:"checkbox",checked:ge(ae).enabled,onChange:e=>{ue(ae,"enabled",e.target.checked),setTimeout(je,0)}}),(0,d.jsx)(B,{})]})]}),ge(ae).enabled&&(0,d.jsxs)(E,{children:[(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:e("admin:paymentSettingsPage.bankName")}),(0,d.jsx)(c.A,{onSave:je,children:(0,d.jsx)($,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:ge(ae).bankName,onChange:e=>ue(ae,"bankName",e.target.value)})})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:e("admin:paymentSettingsPage.accountNumber")}),(0,d.jsx)(c.A,{onSave:je,children:(0,d.jsx)($,{type:"text",placeholder:"Enter bank account number",value:ge(ae).accountNumber,onChange:e=>ue(ae,"accountNumber",e.target.value)})})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:e("admin:paymentSettingsPage.accountName")}),(0,d.jsx)(c.A,{onSave:je,children:(0,d.jsx)($,{type:"text",placeholder:"Enter account holder name",value:ge(ae).accountName,onChange:e=>ue(ae,"accountName",e.target.value)})})]})]})]}),(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:[(0,d.jsxs)(A,{children:[(0,d.jsxs)(w,{children:["QR Payment (",ae,")"]}),(0,d.jsx)(F,{children:e("admin:paymentSettingsPage.scanQrCodeToPayDuitnowKakaopayEtc")})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)(T,{type:"checkbox",checked:me(ae).enabled,onChange:e=>{xe(ae,"enabled",e.target.checked),setTimeout(je,0)}}),(0,d.jsx)(B,{})]})]}),me(ae).enabled&&(0,d.jsxs)(E,{children:[(0,d.jsx)(o.A,{value:me(ae).qrImage,onChange:e=>xe(ae,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${ae} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,d.jsxs)(y,{style:{marginTop:"16px"},children:[(0,d.jsx)(b,{children:e("admin:paymentSettingsPage.description")}),(0,d.jsx)(c.A,{onSave:je,children:(0,d.jsx)($,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:me(ae).qrDescription,onChange:e=>xe(ae,"qrDescription",e.target.value)})}),(0,d.jsx)(z,{children:e("admin:paymentSettingsPage.shortDescriptionShownBelowTheQrCode")})]})]})]}),(0,d.jsxs)(x,{style:{fontSize:"15px",marginTop:"24px",marginBottom:"8px"},children:["Additional Charges (",ae,")"]}),(0,d.jsxs)(g,{style:{marginBottom:"12px"},children:["Configure tax, service charge, etc. for ",ae," invoices. Up to 3 items."]}),[0,1,2].map(t=>{const n=(r=ae,te.additionalCharges[r]||ye)[t]||{enabled:!1,name:"",rate:0};var r;return(0,d.jsxs)(k,{style:{marginBottom:"12px"},children:[(0,d.jsxs)(C,{children:[(0,d.jsxs)(A,{children:[(0,d.jsxs)(w,{children:["Charge Item ",t+1]}),(0,d.jsx)(F,{children:n.enabled&&n.name?`${n.name} (${n.rate}%)`:"Not configured"})]}),(0,d.jsxs)(P,{children:[(0,d.jsx)(T,{type:"checkbox",checked:n.enabled,onChange:e=>{be(ae,t,"enabled",e.target.checked),setTimeout(je,0)}}),(0,d.jsx)(B,{})]})]}),n.enabled&&(0,d.jsx)(E,{children:(0,d.jsxs)(m,{children:[(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:e("admin:paymentSettingsPage.itemName")}),(0,d.jsx)(c.A,{onSave:je,children:(0,d.jsx)($,{type:"text",value:n.name,onChange:e=>be(ae,t,"name",e.target.value),placeholder:"e.g., SST, VAT, Service Charge"})}),(0,d.jsx)(z,{children:e("admin:paymentSettingsPage.nameDisplayedOnInvoices")})]}),(0,d.jsxs)(y,{children:[(0,d.jsx)(b,{children:"Rate (%)"}),(0,d.jsx)(c.A,{onSave:je,children:(0,d.jsx)($,{type:"number",min:"0",max:"100",step:"0.01",value:n.rate,onChange:e=>be(ae,t,"rate",parseFloat(e.target.value)||0),placeholder:"0"})}),(0,d.jsx)(z,{children:e("admin:paymentSettingsPage.percentageToAddToSubtotal")})]})]})})]},`charge-${ae}-${t}`)})]})]})]})]}),(0,d.jsxs)(s.aF,{isOpen:H,onClose:()=>U(!1),title:"Select Supported Currencies",size:"medium",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(s.yl,{variant:"secondary",onClick:()=>U(!1),children:"Cancel"}),(0,d.jsxs)(s.yl,{variant:"primary",onClick:async()=>{try{const e=localStorage.getItem("auth_token");(await fetch("/api/currencies/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currencies:Y})})).ok&&(Q(Y),U(!1),!Y.includes(_)&&Y.length>0&&await le(Y[0]),Y.length>0&&!Y.includes(ae)&&ie(Y[0]))}catch(e){console.error("Error updating supported currencies:",e)}},disabled:0===Y.length,children:["Save (",Y.length," selected)"]})]}),children:[(0,d.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the currencies you want to support for subscription plans and invoices."}),(0,d.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(t).map(e=>{let[t,n]=e;return(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(Y.includes(t)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:Y.includes(t)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,d.jsx)("input",{type:"checkbox",checked:Y.includes(t),onChange:()=>(e=>{J(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(t),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{style:{fontWeight:500},children:[n.symbol," ",t]}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:n.name})]})]},t)})})]}),(0,d.jsxs)(s.aF,{isOpen:G,onClose:()=>L(!1),title:"Select Supported Countries",size:"medium",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(s.yl,{variant:"secondary",onClick:()=>L(!1),children:"Cancel"}),(0,d.jsxs)(s.yl,{variant:"primary",onClick:async()=>{try{const e=localStorage.getItem("auth_token");(await fetch("/api/currencies/countries/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({countries:Z})})).ok&&(X(Z),L(!1))}catch(e){console.error("Error updating supported countries:",e)}},disabled:0===Z.length,children:["Save (",Z.length," selected)"]})]}),children:[(0,d.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the countries where you sell hardware products. These will be shown on the Packages page and available in product settings."}),(0,d.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(M).map(e=>{let[t,n]=e;return(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(Z.includes(t)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:Z.includes(t)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,d.jsx)("input",{type:"checkbox",checked:Z.includes(t),onChange:()=>(e=>{ee(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(t),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{style:{fontWeight:500},children:[n.flag," ",n.name]}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:n.currency})]})]},t)})})]})]})}}}]);