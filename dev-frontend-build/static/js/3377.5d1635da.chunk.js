"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3377],{3377:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Q});var r=t(9950),a=t(4752),i=t(8012),s=t(2597),o=t(9610),d=t(4877),l=t(1367),c=t(5370),p=t(5030),h=t(4414);const u=a.Ay.div`
  min-height: 100vh;
`,x=a.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,g=a.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,b=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,y=a.Ay.p`
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
`,j=a.Ay.div`
  margin-bottom: 16px;
`,f=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,v=a.Ay.select`
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
`,S=a.Ay.div`
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
`,A=a.Ay.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`,k=a.Ay.span`
  color: #9CA3AF;
`,P=a.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`,C=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,w=a.Ay.div``,F=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,T=a.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-top: 2px;
`,E=a.Ay.label`
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
`,$=a.Ay.span`
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
`,N=a.Ay.div`
  border-top: 1px solid #E6EBF1;
  margin-top: 16px;
  padding-top: 16px;
`,_=a.Ay.input`
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
`,I=a.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
`,R=a.Ay.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`,q=a.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,D={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:{}},Q=()=>{const{t:e}=(0,p.Bd)("brand"),{user:n}=(0,l.As)(),t=null===n||void 0===n?void 0:n.brand_id,[a,Q]=(0,r.useState)({}),[K,O]=(0,r.useState)([]),[U,H]=(0,r.useState)([]),[M,Y]=(0,r.useState)("MYR"),[J,V]=(0,r.useState)(!1),[W,X]=(0,r.useState)([]),[G,L]=(0,r.useState)(D),Z=(0,r.useRef)(D),[ee,ne]=(0,r.useState)(""),[te,re]=(0,r.useState)(!0);(0,r.useEffect)(()=>{ae()},[]),(0,r.useEffect)(()=>{K.length>0&&!ee&&ne(K[0])},[K,ee]);const ae=async()=>{if(!t)return console.error("No brand ID available"),void re(!1);try{const n={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[r,a,i]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch(`/api/brands/${t}/payment-settings`,{headers:n})]);if(r.ok){const e=await r.json();e.success&&e.currencies&&Q(e.currencies)}let s=[];if(a.ok){const e=await a.json();e.success&&e.data&&(s=e.data.map(e=>e.code),H(s))}if(i.ok){const n=await i.json();console.log("Brand payment settings loaded:",n);const t=n.data||n;if(t.supported_currencies&&Array.isArray(t.supported_currencies)){const n=s.length>0?t.supported_currencies.filter(e=>s.includes(e)):t.supported_currencies;if(O(n),n.length>0){var e;ne(n[0]);const r=null===(e=t.payment_settings)||void 0===e?void 0:e.defaultCurrency;r&&n.includes(r)?Y(r):Y(n[0])}}if(t.payment_settings&&Object.keys(t.payment_settings).length>0){let e=t.payment_settings.additionalCharges||{};Array.isArray(e)&&(e={});const n={...D,...t.payment_settings,bankTransfer:t.payment_settings.bankTransfer||{},qrPayment:t.payment_settings.qrPayment||{},additionalCharges:e};Z.current=n,L(n)}}}catch(n){console.error("Error loading settings:",n)}finally{re(!1)}},ie=e=>{L(n=>{const t=e(n);return Z.current=t,t})},se=(e,n)=>{ie(t=>({...t,stripe:{...t.stripe,[e]:n}}))},oe=(e,n)=>{ie(t=>({...t,paypal:{...t.paypal,[e]:n}}))},de=(e,n,t)=>{ie(r=>({...r,bankTransfer:{...r.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...r.bankTransfer[e],[n]:t}}}))},le=(e,n,t)=>{ie(r=>({...r,qrPayment:{...r.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...r.qrPayment[e],[n]:t}}}))},ce=e=>G.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},pe=e=>G.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""},he=[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}],ue=(e,n,t,r)=>{ie(a=>{const i=[...a.additionalCharges[e]||he];return i[n]={...i[n],[t]:r},{...a,additionalCharges:{...a.additionalCharges,[e]:i}}})},xe=async()=>{if(t)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/brands/${t}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_settings:{...Z.current,defaultCurrency:M}})}),r=await n.json();if(!n.ok)throw new Error(r.error||r.details||"Failed to save")}catch(e){throw console.error("Error saving brand payment settings:",e),e}};return te?(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(u,{children:[(0,h.jsx)(i.Ay,{title:"Payment Settings"}),(0,h.jsx)(x,{children:(0,h.jsx)("p",{children:e("brand:brandPaymentSettingsPage.loading")})})]})}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(u,{children:[(0,h.jsx)(i.Ay,{title:"Payment Settings"}),(0,h.jsxs)(x,{children:[(0,h.jsxs)(g,{children:[(0,h.jsx)(b,{children:e("brand:brandPaymentSettingsPage.currencySettings")}),(0,h.jsx)(y,{children:"Configure supported currencies for subscription plans and invoices."}),(0,h.jsxs)(m,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{children:e("brand:brandPaymentSettingsPage.defaultCurrency")}),(0,h.jsx)(c.A,{type:"select",onSave:xe,children:(0,h.jsx)(v,{value:M,onChange:e=>{return n=e.target.value,void Y(n);var n},children:K.map(e=>{var n,t;return(0,h.jsxs)("option",{value:e,children:[null===(n=a[e])||void 0===n?void 0:n.symbol," ",e," - ",null===(t=a[e])||void 0===t?void 0:t.name]},e)})})}),(0,h.jsx)(z,{children:e("brand:brandPaymentSettingsPage.usedAsDefaultForNewSubscriptionsAndInvoices")})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{children:e("brand:brandPaymentSettingsPage.supportedCurrencies")}),(0,h.jsx)(S,{onClick:()=>{X(K),V(!0)},children:K.length>0?K.map(e=>{var n;return(0,h.jsxs)(A,{children:[null===(n=a[e])||void 0===n?void 0:n.symbol," ",e]},e)}):(0,h.jsx)(k,{children:e("brand:brandPaymentSettingsPage.clickToSelectCurrencies")})}),(0,h.jsx)(z,{children:e("brand:brandPaymentSettingsPage.currenciesAvailableForPricingPlansAndInvoices")})]})]})]}),(0,h.jsxs)(g,{children:[(0,h.jsx)(b,{children:e("brand:brandPaymentSettingsPage.onlinePayment")}),(0,h.jsx)(y,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,h.jsxs)(P,{children:[(0,h.jsxs)(C,{children:[(0,h.jsxs)(w,{children:[(0,h.jsx)(F,{children:e("brand:brandPaymentSettingsPage.stripe")}),(0,h.jsx)(T,{children:e("brand:brandPaymentSettingsPage.creditdebitCardPayments")})]}),(0,h.jsxs)(E,{children:[(0,h.jsx)(B,{type:"checkbox",checked:G.stripe.enabled,onChange:e=>{se("enabled",e.target.checked),setTimeout(xe,0)}}),(0,h.jsx)($,{})]})]}),G.stripe.enabled&&(0,h.jsxs)(N,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{children:e("brand:brandPaymentSettingsPage.publishableKey")}),(0,h.jsx)(c.A,{onSave:xe,children:(0,h.jsx)(_,{type:"text",placeholder:"pk_live_...",value:G.stripe.publishableKey,onChange:e=>se("publishableKey",e.target.value)})})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{children:e("brand:brandPaymentSettingsPage.secretKey")}),(0,h.jsx)(c.A,{onSave:xe,children:(0,h.jsx)(_,{type:"password",placeholder:"sk_live_...",value:G.stripe.secretKey,onChange:e=>se("secretKey",e.target.value)})})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{children:e("brand:brandPaymentSettingsPage.webhookSecret")}),(0,h.jsx)(c.A,{onSave:xe,children:(0,h.jsx)(_,{type:"password",placeholder:"whsec_...",value:G.stripe.webhookSecret,onChange:e=>se("webhookSecret",e.target.value)})})]}),(0,h.jsx)(j,{children:(0,h.jsxs)(I,{children:[(0,h.jsx)(R,{type:"checkbox",checked:G.stripe.autoCharge,onChange:e=>{se("autoCharge",e.target.checked),setTimeout(xe,0)}}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,h.jsxs)(P,{children:[(0,h.jsxs)(C,{children:[(0,h.jsxs)(w,{children:[(0,h.jsx)(F,{children:e("brand:brandPaymentSettingsPage.paypal")}),(0,h.jsx)(T,{children:e("brand:brandPaymentSettingsPage.paypalAccountOrCard")})]}),(0,h.jsxs)(E,{children:[(0,h.jsx)(B,{type:"checkbox",checked:G.paypal.enabled,onChange:e=>{oe("enabled",e.target.checked),setTimeout(xe,0)}}),(0,h.jsx)($,{})]})]}),G.paypal.enabled&&(0,h.jsxs)(N,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{children:e("brand:brandPaymentSettingsPage.clientId")}),(0,h.jsx)(c.A,{onSave:xe,children:(0,h.jsx)(_,{type:"text",placeholder:"Enter PayPal Client ID",value:G.paypal.clientId,onChange:e=>oe("clientId",e.target.value)})})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{children:e("brand:brandPaymentSettingsPage.clientSecret")}),(0,h.jsx)(c.A,{onSave:xe,children:(0,h.jsx)(_,{type:"password",placeholder:"Enter PayPal Client Secret",value:G.paypal.clientSecret,onChange:e=>oe("clientSecret",e.target.value)})})]})]})]})]}),(0,h.jsxs)(g,{children:[(0,h.jsx)(b,{children:e("brand:brandPaymentSettingsPage.manualPayment")}),(0,h.jsx)(y,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===K.length?(0,h.jsx)(q,{children:"No currencies configured. Please add supported currencies above first."}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s.tU,{children:K.map(e=>{var n;return(0,h.jsxs)(s.oz,{active:ee===e,onClick:()=>ne(e),children:[null===(n=a[e])||void 0===n?void 0:n.symbol," ",e]},e)})}),(0,h.jsxs)(P,{children:[(0,h.jsxs)(C,{children:[(0,h.jsxs)(w,{children:[(0,h.jsxs)(F,{children:["Bank Transfer (",ee,")"]}),(0,h.jsx)(T,{children:e("brand:brandPaymentSettingsPage.manualTransferWithReceiptUpload")})]}),(0,h.jsxs)(E,{children:[(0,h.jsx)(B,{type:"checkbox",checked:ce(ee).enabled,onChange:e=>{de(ee,"enabled",e.target.checked),setTimeout(xe,0)}}),(0,h.jsx)($,{})]})]}),ce(ee).enabled&&(0,h.jsxs)(N,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{children:e("brand:brandPaymentSettingsPage.bankName")}),(0,h.jsx)(c.A,{onSave:xe,children:(0,h.jsx)(_,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:ce(ee).bankName,onChange:e=>de(ee,"bankName",e.target.value)})})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{children:e("brand:brandPaymentSettingsPage.accountNumber")}),(0,h.jsx)(c.A,{onSave:xe,children:(0,h.jsx)(_,{type:"text",placeholder:"Enter bank account number",value:ce(ee).accountNumber,onChange:e=>de(ee,"accountNumber",e.target.value)})})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{children:e("brand:brandPaymentSettingsPage.accountName")}),(0,h.jsx)(c.A,{onSave:xe,children:(0,h.jsx)(_,{type:"text",placeholder:"Enter account holder name",value:ce(ee).accountName,onChange:e=>de(ee,"accountName",e.target.value)})})]})]})]}),(0,h.jsxs)(P,{children:[(0,h.jsxs)(C,{children:[(0,h.jsxs)(w,{children:[(0,h.jsxs)(F,{children:["QR Payment (",ee,")"]}),(0,h.jsx)(T,{children:e("brand:brandPaymentSettingsPage.scanQrCodeToPayDuitnowKakaopayEtc")})]}),(0,h.jsxs)(E,{children:[(0,h.jsx)(B,{type:"checkbox",checked:pe(ee).enabled,onChange:e=>{le(ee,"enabled",e.target.checked),setTimeout(xe,0)}}),(0,h.jsx)($,{})]})]}),pe(ee).enabled&&(0,h.jsxs)(N,{children:[(0,h.jsx)(d.A,{value:pe(ee).qrImage,onChange:e=>le(ee,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${ee} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,h.jsxs)(j,{style:{marginTop:"16px"},children:[(0,h.jsx)(f,{children:e("brand:brandPaymentSettingsPage.description")}),(0,h.jsx)(c.A,{onSave:xe,children:(0,h.jsx)(_,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:pe(ee).qrDescription,onChange:e=>le(ee,"qrDescription",e.target.value)})}),(0,h.jsx)(z,{children:e("brand:brandPaymentSettingsPage.shortDescriptionShownBelowTheQrCode")})]})]})]}),(0,h.jsxs)(b,{style:{fontSize:"15px",marginTop:"24px",marginBottom:"8px"},children:["Additional Charges (",ee,")"]}),(0,h.jsxs)(y,{style:{marginBottom:"12px"},children:["Configure tax, service charge, etc. for ",ee," invoices. Up to 3 items."]}),[0,1,2].map(n=>{const t=(r=ee,G.additionalCharges[r]||he)[n]||{enabled:!1,name:"",rate:0};var r;return(0,h.jsxs)(P,{style:{marginBottom:"12px"},children:[(0,h.jsxs)(C,{children:[(0,h.jsxs)(w,{children:[(0,h.jsxs)(F,{children:["Charge Item ",n+1]}),(0,h.jsx)(T,{children:t.enabled&&t.name?`${t.name} (${t.rate}%)`:"Not configured"})]}),(0,h.jsxs)(E,{children:[(0,h.jsx)(B,{type:"checkbox",checked:t.enabled,onChange:e=>{ue(ee,n,"enabled",e.target.checked),setTimeout(xe,0)}}),(0,h.jsx)($,{})]})]}),t.enabled&&(0,h.jsx)(N,{children:(0,h.jsxs)(m,{children:[(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{children:e("brand:brandPaymentSettingsPage.itemName")}),(0,h.jsx)(c.A,{onSave:xe,children:(0,h.jsx)(_,{type:"text",value:t.name,onChange:e=>ue(ee,n,"name",e.target.value),placeholder:"e.g., SST, VAT, Service Charge"})}),(0,h.jsx)(z,{children:e("brand:brandPaymentSettingsPage.nameDisplayedOnInvoices")})]}),(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{children:"Rate (%)"}),(0,h.jsx)(c.A,{onSave:xe,children:(0,h.jsx)(_,{type:"number",min:"0",max:"100",step:"0.01",value:t.rate,onChange:e=>ue(ee,n,"rate",parseFloat(e.target.value)||0),placeholder:"0"})}),(0,h.jsx)(z,{children:e("brand:brandPaymentSettingsPage.percentageToAddToSubtotal")})]})]})})]},`charge-${ee}-${n}`)})]})]})]})]}),(0,h.jsxs)(o.aF,{isOpen:J,onClose:()=>V(!1),title:"Select Supported Currencies",size:"medium",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(o.yl,{variant:"secondary",onClick:()=>V(!1),children:"Cancel"}),(0,h.jsxs)(o.yl,{variant:"primary",onClick:async()=>{if(t)try{const e=localStorage.getItem("auth_token");if(!(await fetch(`/api/brands/${t}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({supported_currencies:W})})).ok)throw new Error("Failed to update currencies");O(W),V(!1),!W.includes(M)&&W.length>0&&Y(W[0]),W.length>0&&!W.includes(ee)&&ne(W[0])}catch(e){console.error("Error updating supported currencies:",e)}},disabled:0===W.length,children:["Save (",W.length," selected)"]})]}),children:[(0,h.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select from the currencies enabled by System Administrator."}),0===U.length?(0,h.jsx)("p",{style:{color:"#DC2626",padding:"16px",background:"#FEF2F2",borderRadius:"8px"},children:"No currencies have been configured by System Administrator yet."}):(0,h.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:U.map(e=>{const n=a[e];return n?(0,h.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(W.includes(e)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:W.includes(e)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,h.jsx)("input",{type:"checkbox",checked:W.includes(e),onChange:()=>(e=>{X(n=>n.includes(e)?n.filter(n=>n!==e):[...n,e])})(e),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,h.jsxs)("div",{children:[(0,h.jsxs)("div",{style:{fontWeight:500},children:[n.symbol," ",e]}),(0,h.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:n.name})]})]},e):null})})]})]})}},5370:(e,n,t)=>{t.d(n,{A:()=>f});var r=t(9950),a=t(4752),i=t(4414);const s=a.i7`
  from { opacity: 0; }
  to { opacity: 1; }
`,o=a.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,d=a.i7`
  to { transform: rotate(360deg); }
`,l=a.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,c=a.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?a.AH`${o} 0.3s ease forwards`:a.AH`${s} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=a.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,h=a.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,u=a.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,x=a.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,g=a.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,b=a.Ay.span`
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
  animation: ${d} 0.6s linear infinite;
`,m=a.Ay.span`
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
`,j=(0,r.forwardRef)((e,n)=>{let{children:t,onSave:a,type:s="input",debounceMs:o=2e3,style:d}=e;const[c,j]=(0,r.useState)("idle"),[f,v]=(0,r.useState)(!1),S=(0,r.useRef)(null),A=(0,r.useRef)(null),k=(0,r.useRef)(null),P=(0,r.useRef)(!0),C=(0,r.useRef)(a);C.current=a;const w=(0,r.useCallback)(()=>{S.current&&clearTimeout(S.current),A.current&&clearTimeout(A.current),k.current&&clearTimeout(k.current)},[]),F=2e3!==o?o:"toggle"===s||"select"===s||"list"===s||"image"===s?300:o,T=(0,r.useCallback)(()=>{w(),v(!1),j("saving"),S.current=setTimeout(async()=>{if(P.current)try{if(await C.current(),!P.current)return;j("saved"),A.current=setTimeout(()=>{P.current&&(v(!0),k.current=setTimeout(()=>{P.current&&(j("idle"),v(!1))},300))},2e3)}catch{if(!P.current)return;j("error"),A.current=setTimeout(()=>{P.current&&(v(!0),k.current=setTimeout(()=>{P.current&&(j("idle"),v(!1))},300))},4e3)}},F)},[F,w]);(0,r.useImperativeHandle)(n,()=>({triggerSave:T}),[T]),(0,r.useEffect)(()=>(P.current=!0,()=>{P.current=!1,w()}),[w]);const E=r.Children.map(t,e=>{if(!r.isValidElement(e))return e;const n=e.props.onChange;return"function"!==typeof n?e:r.cloneElement(e,{onChange:function(){n(...arguments),T()}})}),B="saving"===c?(0,i.jsx)(y,{}):"saved"===c?(0,i.jsx)(b,{children:"\u2713"}):"error"===c?(0,i.jsx)(m,{children:"!"}):null,$="select"===s?h:"toggle"===s?u:"image"===s?x:"list"===s?g:p;return(0,i.jsxs)(l,{$type:s,style:d,children:[E,"idle"!==c&&(0,i.jsx)($,{$fading:f,children:B})]})});j.displayName="AutoSaveField";const f=j}}]);