"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3377],{3377:(e,n,t)=>{t.r(n),t.d(n,{default:()=>K});var r=t(9950),a=t(4752),i=t(8012),s=t(2597),o=t(9610),d=t(4877),c=t(1367),l=t(5370),p=t(5030),h=t(9955),x=t(4414);const u=a.Ay.div`
  min-height: 100vh;
`,g=a.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,b=a.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,y=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,m=a.Ay.p`
  color: #6B7C93;
  font-size: 14px;
  margin-bottom: 20px;
`,j=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,f=a.Ay.div`
  margin-bottom: 16px;
`,v=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,S=a.Ay.select`
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
`,A=a.Ay.div`
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
`,P=a.Ay.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`,k=a.Ay.span`
  color: #9CA3AF;
`,C=a.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`,w=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,F=a.Ay.div``,T=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,E=a.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-top: 2px;
`,B=a.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`,$=a.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #635BFF;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`,N=a.Ay.span`
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
`,z=a.Ay.div`
  border-top: 1px solid #E6EBF1;
  margin-top: 16px;
  padding-top: 16px;
`,R=a.Ay.input`
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
`,_=a.Ay.p`
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
`,q=a.Ay.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`,D=a.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,Q={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:{}},K=()=>{const{t:e}=(0,p.Bd)("brand"),{user:n}=(0,c.As)(),t=null===n||void 0===n?void 0:n.brand_id,[a,K]=(0,r.useState)({}),[O,U]=(0,r.useState)([]),[H,M]=(0,r.useState)([]),[Y,J]=(0,r.useState)("MYR"),[V,W]=(0,r.useState)(!1),[X,G]=(0,r.useState)([]),[L,Z]=(0,r.useState)(Q),ee=(0,r.useRef)(Q),[ne,te]=(0,r.useState)(""),[re,ae]=(0,r.useState)(!0);(0,r.useEffect)(()=>{ie()},[]),(0,r.useEffect)(()=>{O.length>0&&!ne&&te(O[0])},[O,ne]);const ie=async()=>{if(!t)return console.error("No brand ID available"),void ae(!1);try{const n={Authorization:`Bearer ${(0,h.c4)()}`},[r,a,i]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch(`/api/brands/${t}/payment-settings`,{headers:n})]);if(r.ok){const e=await r.json();e.success&&e.currencies&&K(e.currencies)}let s=[];if(a.ok){const e=await a.json();e.success&&e.data&&(s=e.data.map(e=>e.code),M(s))}if(i.ok){const n=await i.json();console.log("Brand payment settings loaded:",n);const t=n.data||n;if(t.supported_currencies&&Array.isArray(t.supported_currencies)){const n=s.length>0?t.supported_currencies.filter(e=>s.includes(e)):t.supported_currencies;if(U(n),n.length>0){var e;te(n[0]);const r=null===(e=t.payment_settings)||void 0===e?void 0:e.defaultCurrency;r&&n.includes(r)?J(r):J(n[0])}}if(t.payment_settings&&Object.keys(t.payment_settings).length>0){let e=t.payment_settings.additionalCharges||{};Array.isArray(e)&&(e={});const n={...Q,...t.payment_settings,bankTransfer:t.payment_settings.bankTransfer||{},qrPayment:t.payment_settings.qrPayment||{},additionalCharges:e};ee.current=n,Z(n)}}}catch(n){console.error("Error loading settings:",n)}finally{ae(!1)}},se=e=>{Z(n=>{const t=e(n);return ee.current=t,t})},oe=(e,n)=>{se(t=>({...t,stripe:{...t.stripe,[e]:n}}))},de=(e,n)=>{se(t=>({...t,paypal:{...t.paypal,[e]:n}}))},ce=(e,n,t)=>{se(r=>({...r,bankTransfer:{...r.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...r.bankTransfer[e],[n]:t}}}))},le=(e,n,t)=>{se(r=>({...r,qrPayment:{...r.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...r.qrPayment[e],[n]:t}}}))},pe=e=>L.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},he=e=>L.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""},xe=[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}],ue=(e,n,t,r)=>{se(a=>{const i=[...a.additionalCharges[e]||xe];return i[n]={...i[n],[t]:r},{...a,additionalCharges:{...a.additionalCharges,[e]:i}}})},ge=async()=>{if(t)try{const e=(0,h.c4)(),n=await fetch(`/api/brands/${t}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_settings:{...ee.current,defaultCurrency:Y}})}),r=await n.json();if(!n.ok)throw new Error(r.error||r.details||"Failed to save")}catch(e){throw console.error("Error saving brand payment settings:",e),e}};return re?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(u,{children:[(0,x.jsx)(i.Ay,{title:"Payment Settings"}),(0,x.jsx)(g,{children:(0,x.jsx)("p",{children:e("brand:brandPaymentSettingsPage.loading")})})]})}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(u,{children:[(0,x.jsx)(i.Ay,{title:"Payment Settings"}),(0,x.jsxs)(g,{children:[(0,x.jsxs)(b,{children:[(0,x.jsx)(y,{children:e("brand:brandPaymentSettingsPage.currencySettings")}),(0,x.jsx)(m,{children:"Configure supported currencies for subscription plans and invoices."}),(0,x.jsxs)(j,{children:[(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{children:e("brand:brandPaymentSettingsPage.defaultCurrency")}),(0,x.jsx)(l.A,{type:"select",onSave:ge,children:(0,x.jsx)(S,{value:Y,onChange:e=>{return n=e.target.value,void J(n);var n},children:O.map(e=>{var n,t;return(0,x.jsxs)("option",{value:e,children:[null===(n=a[e])||void 0===n?void 0:n.symbol," ",e," - ",null===(t=a[e])||void 0===t?void 0:t.name]},e)})})}),(0,x.jsx)(_,{children:e("brand:brandPaymentSettingsPage.usedAsDefaultForNewSubscriptionsAndInvoices")})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{children:e("brand:brandPaymentSettingsPage.supportedCurrencies")}),(0,x.jsx)(A,{onClick:()=>{G(O),W(!0)},children:O.length>0?O.map(e=>{var n;return(0,x.jsxs)(P,{children:[null===(n=a[e])||void 0===n?void 0:n.symbol," ",e]},e)}):(0,x.jsx)(k,{children:e("brand:brandPaymentSettingsPage.clickToSelectCurrencies")})}),(0,x.jsx)(_,{children:e("brand:brandPaymentSettingsPage.currenciesAvailableForPricingPlansAndInvoices")})]})]})]}),(0,x.jsxs)(b,{children:[(0,x.jsx)(y,{children:e("brand:brandPaymentSettingsPage.onlinePayment")}),(0,x.jsx)(m,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,x.jsxs)(C,{children:[(0,x.jsxs)(w,{children:[(0,x.jsxs)(F,{children:[(0,x.jsx)(T,{children:e("brand:brandPaymentSettingsPage.stripe")}),(0,x.jsx)(E,{children:e("brand:brandPaymentSettingsPage.creditdebitCardPayments")})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)($,{type:"checkbox",checked:L.stripe.enabled,onChange:e=>{oe("enabled",e.target.checked),setTimeout(ge,0)}}),(0,x.jsx)(N,{})]})]}),L.stripe.enabled&&(0,x.jsxs)(z,{children:[(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{children:e("brand:brandPaymentSettingsPage.publishableKey")}),(0,x.jsx)(l.A,{onSave:ge,children:(0,x.jsx)(R,{type:"text",placeholder:"pk_live_...",value:L.stripe.publishableKey,onChange:e=>oe("publishableKey",e.target.value)})})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{children:e("brand:brandPaymentSettingsPage.secretKey")}),(0,x.jsx)(l.A,{onSave:ge,children:(0,x.jsx)(R,{type:"password",placeholder:"sk_live_...",value:L.stripe.secretKey,onChange:e=>oe("secretKey",e.target.value)})})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{children:e("brand:brandPaymentSettingsPage.webhookSecret")}),(0,x.jsx)(l.A,{onSave:ge,children:(0,x.jsx)(R,{type:"password",placeholder:"whsec_...",value:L.stripe.webhookSecret,onChange:e=>oe("webhookSecret",e.target.value)})})]}),(0,x.jsx)(f,{children:(0,x.jsxs)(I,{children:[(0,x.jsx)(q,{type:"checkbox",checked:L.stripe.autoCharge,onChange:e=>{oe("autoCharge",e.target.checked),setTimeout(ge,0)}}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,x.jsxs)(C,{children:[(0,x.jsxs)(w,{children:[(0,x.jsxs)(F,{children:[(0,x.jsx)(T,{children:e("brand:brandPaymentSettingsPage.paypal")}),(0,x.jsx)(E,{children:e("brand:brandPaymentSettingsPage.paypalAccountOrCard")})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)($,{type:"checkbox",checked:L.paypal.enabled,onChange:e=>{de("enabled",e.target.checked),setTimeout(ge,0)}}),(0,x.jsx)(N,{})]})]}),L.paypal.enabled&&(0,x.jsxs)(z,{children:[(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{children:e("brand:brandPaymentSettingsPage.clientId")}),(0,x.jsx)(l.A,{onSave:ge,children:(0,x.jsx)(R,{type:"text",placeholder:"Enter PayPal Client ID",value:L.paypal.clientId,onChange:e=>de("clientId",e.target.value)})})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{children:e("brand:brandPaymentSettingsPage.clientSecret")}),(0,x.jsx)(l.A,{onSave:ge,children:(0,x.jsx)(R,{type:"password",placeholder:"Enter PayPal Client Secret",value:L.paypal.clientSecret,onChange:e=>de("clientSecret",e.target.value)})})]})]})]})]}),(0,x.jsxs)(b,{children:[(0,x.jsx)(y,{children:e("brand:brandPaymentSettingsPage.manualPayment")}),(0,x.jsx)(m,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===O.length?(0,x.jsx)(D,{children:"No currencies configured. Please add supported currencies above first."}):(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(s.tU,{children:O.map(e=>{var n;return(0,x.jsxs)(s.oz,{active:ne===e,onClick:()=>te(e),children:[null===(n=a[e])||void 0===n?void 0:n.symbol," ",e]},e)})}),(0,x.jsxs)(C,{children:[(0,x.jsxs)(w,{children:[(0,x.jsxs)(F,{children:[(0,x.jsxs)(T,{children:["Bank Transfer (",ne,")"]}),(0,x.jsx)(E,{children:e("brand:brandPaymentSettingsPage.manualTransferWithReceiptUpload")})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)($,{type:"checkbox",checked:pe(ne).enabled,onChange:e=>{ce(ne,"enabled",e.target.checked),setTimeout(ge,0)}}),(0,x.jsx)(N,{})]})]}),pe(ne).enabled&&(0,x.jsxs)(z,{children:[(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{children:e("brand:brandPaymentSettingsPage.bankName")}),(0,x.jsx)(l.A,{onSave:ge,children:(0,x.jsx)(R,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:pe(ne).bankName,onChange:e=>ce(ne,"bankName",e.target.value)})})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{children:e("brand:brandPaymentSettingsPage.accountNumber")}),(0,x.jsx)(l.A,{onSave:ge,children:(0,x.jsx)(R,{type:"text",placeholder:"Enter bank account number",value:pe(ne).accountNumber,onChange:e=>ce(ne,"accountNumber",e.target.value)})})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{children:e("brand:brandPaymentSettingsPage.accountName")}),(0,x.jsx)(l.A,{onSave:ge,children:(0,x.jsx)(R,{type:"text",placeholder:"Enter account holder name",value:pe(ne).accountName,onChange:e=>ce(ne,"accountName",e.target.value)})})]})]})]}),(0,x.jsxs)(C,{children:[(0,x.jsxs)(w,{children:[(0,x.jsxs)(F,{children:[(0,x.jsxs)(T,{children:["QR Payment (",ne,")"]}),(0,x.jsx)(E,{children:e("brand:brandPaymentSettingsPage.scanQrCodeToPayDuitnowKakaopayEtc")})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)($,{type:"checkbox",checked:he(ne).enabled,onChange:e=>{le(ne,"enabled",e.target.checked),setTimeout(ge,0)}}),(0,x.jsx)(N,{})]})]}),he(ne).enabled&&(0,x.jsxs)(z,{children:[(0,x.jsx)(d.A,{value:he(ne).qrImage,onChange:e=>le(ne,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${ne} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,x.jsxs)(f,{style:{marginTop:"16px"},children:[(0,x.jsx)(v,{children:e("brand:brandPaymentSettingsPage.description")}),(0,x.jsx)(l.A,{onSave:ge,children:(0,x.jsx)(R,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:he(ne).qrDescription,onChange:e=>le(ne,"qrDescription",e.target.value)})}),(0,x.jsx)(_,{children:e("brand:brandPaymentSettingsPage.shortDescriptionShownBelowTheQrCode")})]})]})]}),(0,x.jsxs)(y,{style:{fontSize:"15px",marginTop:"24px",marginBottom:"8px"},children:["Additional Charges (",ne,")"]}),(0,x.jsxs)(m,{style:{marginBottom:"12px"},children:["Configure tax, service charge, etc. for ",ne," invoices. Up to 3 items."]}),[0,1,2].map(n=>{const t=(r=ne,L.additionalCharges[r]||xe)[n]||{enabled:!1,name:"",rate:0};var r;return(0,x.jsxs)(C,{style:{marginBottom:"12px"},children:[(0,x.jsxs)(w,{children:[(0,x.jsxs)(F,{children:[(0,x.jsxs)(T,{children:["Charge Item ",n+1]}),(0,x.jsx)(E,{children:t.enabled&&t.name?`${t.name} (${t.rate}%)`:"Not configured"})]}),(0,x.jsxs)(B,{children:[(0,x.jsx)($,{type:"checkbox",checked:t.enabled,onChange:e=>{ue(ne,n,"enabled",e.target.checked),setTimeout(ge,0)}}),(0,x.jsx)(N,{})]})]}),t.enabled&&(0,x.jsx)(z,{children:(0,x.jsxs)(j,{children:[(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{children:e("brand:brandPaymentSettingsPage.itemName")}),(0,x.jsx)(l.A,{onSave:ge,children:(0,x.jsx)(R,{type:"text",value:t.name,onChange:e=>ue(ne,n,"name",e.target.value),placeholder:"e.g., SST, VAT, Service Charge"})}),(0,x.jsx)(_,{children:e("brand:brandPaymentSettingsPage.nameDisplayedOnInvoices")})]}),(0,x.jsxs)(f,{children:[(0,x.jsx)(v,{children:"Rate (%)"}),(0,x.jsx)(l.A,{onSave:ge,children:(0,x.jsx)(R,{type:"number",min:"0",max:"100",step:"0.01",value:t.rate,onChange:e=>ue(ne,n,"rate",parseFloat(e.target.value)||0),placeholder:"0"})}),(0,x.jsx)(_,{children:e("brand:brandPaymentSettingsPage.percentageToAddToSubtotal")})]})]})})]},`charge-${ne}-${n}`)})]})]})]})]}),(0,x.jsxs)(o.aF,{isOpen:V,onClose:()=>W(!1),title:"Select Supported Currencies",size:"medium",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(o.yl,{variant:"secondary",onClick:()=>W(!1),children:"Cancel"}),(0,x.jsxs)(o.yl,{variant:"primary",onClick:async()=>{if(t)try{const e=(0,h.c4)();if(!(await fetch(`/api/brands/${t}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({supported_currencies:X})})).ok)throw new Error("Failed to update currencies");U(X),W(!1),!X.includes(Y)&&X.length>0&&J(X[0]),X.length>0&&!X.includes(ne)&&te(X[0])}catch(e){console.error("Error updating supported currencies:",e)}},disabled:0===X.length,children:["Save (",X.length," selected)"]})]}),children:[(0,x.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select from the currencies enabled by System Administrator."}),0===H.length?(0,x.jsx)("p",{style:{color:"#DC2626",padding:"16px",background:"#FEF2F2",borderRadius:"8px"},children:"No currencies have been configured by System Administrator yet."}):(0,x.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:H.map(e=>{const n=a[e];return n?(0,x.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(X.includes(e)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:X.includes(e)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,x.jsx)("input",{type:"checkbox",checked:X.includes(e),onChange:()=>(e=>{G(n=>n.includes(e)?n.filter(n=>n!==e):[...n,e])})(e),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,x.jsxs)("div",{children:[(0,x.jsxs)("div",{style:{fontWeight:500},children:[n.symbol," ",e]}),(0,x.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:n.name})]})]},e):null})})]})]})}},5370:(e,n,t)=>{t.d(n,{A:()=>f});var r=t(9950),a=t(4752),i=t(4414);const s=a.i7`
  from { opacity: 0; }
  to { opacity: 1; }
`,o=a.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,d=a.i7`
  to { transform: rotate(360deg); }
`,c=a.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,l=a.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?a.AH`${o} 0.3s ease forwards`:a.AH`${s} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=a.Ay.div`
  ${l}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,h=a.Ay.div`
  ${l}
  position: absolute;
  right: -6px;
  top: -6px;
`,x=a.Ay.div`
  ${l}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,u=a.Ay.div`
  ${l}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,g=a.Ay.div`
  ${l}
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
`,j=(0,r.forwardRef)((e,n)=>{let{children:t,onSave:a,type:s="input",debounceMs:o=2e3,style:d}=e;const[l,j]=(0,r.useState)("idle"),[f,v]=(0,r.useState)(!1),S=(0,r.useRef)(null),A=(0,r.useRef)(null),P=(0,r.useRef)(null),k=(0,r.useRef)(!0),C=(0,r.useRef)(a);C.current=a;const w=(0,r.useCallback)(()=>{S.current&&clearTimeout(S.current),A.current&&clearTimeout(A.current),P.current&&clearTimeout(P.current)},[]),F=2e3!==o?o:"toggle"===s||"select"===s||"list"===s||"image"===s?300:o,T=(0,r.useCallback)(()=>{w(),v(!1),j("saving"),S.current=setTimeout(async()=>{if(k.current)try{if(await C.current(),!k.current)return;j("saved"),A.current=setTimeout(()=>{k.current&&(v(!0),P.current=setTimeout(()=>{k.current&&(j("idle"),v(!1))},300))},2e3)}catch{if(!k.current)return;j("error"),A.current=setTimeout(()=>{k.current&&(v(!0),P.current=setTimeout(()=>{k.current&&(j("idle"),v(!1))},300))},4e3)}},F)},[F,w]);(0,r.useImperativeHandle)(n,()=>({triggerSave:T}),[T]),(0,r.useEffect)(()=>(k.current=!0,()=>{k.current=!1,w()}),[w]);const E=r.Children.map(t,e=>{if(!r.isValidElement(e))return e;const n=e.props.onChange;return"function"!==typeof n?e:r.cloneElement(e,{onChange:function(){n(...arguments),T()}})}),B="saving"===l?(0,i.jsx)(y,{}):"saved"===l?(0,i.jsx)(b,{children:"\u2713"}):"error"===l?(0,i.jsx)(m,{children:"!"}):null,$="select"===s?h:"toggle"===s?x:"image"===s?u:"list"===s?g:p;return(0,i.jsxs)(c,{$type:s,style:d,children:[E,"idle"!==l&&(0,i.jsx)($,{$fading:f,children:B})]})});j.displayName="AutoSaveField";const f=j}}]);