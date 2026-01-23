"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3377],{3377:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Q});var r=t(9950),a=t(4752),i=t(3310),o=t(8012),s=t(2674),l=t(9610),d=t(4877),c=t(1367),p=t(4414);const x=a.Ay.div`
  min-height: 100vh;
`,h=a.Ay.div`
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
`,u=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,m=a.Ay.p`
  color: #6B7C93;
  font-size: 14px;
  margin-bottom: 20px;
`,b=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,y=a.Ay.div`
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
`,k=a.Ay.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`,w=a.Ay.span`
  color: #9CA3AF;
`,C=a.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`,A=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,F=a.Ay.div``,S=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,B=a.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-top: 2px;
`,E=a.Ay.label`
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
`,D=a.Ay.span`
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
`,P=a.Ay.div`
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
`,I=a.Ay.p`
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
`,_=a.Ay.input`
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
`,$=a.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,U={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},tax:{enabled:!0,rate:6,name:"Tax"}},Q=()=>{var e,n,t,a,Q,K;const{user:M}=(0,c.As)(),O=null===M||void 0===M?void 0:M.brand_id,[G,L]=(0,r.useState)({}),[J,W]=(0,r.useState)([]),[H,V]=(0,r.useState)([]),[Y,X]=(0,r.useState)("USD"),[Z,ee]=(0,r.useState)(!1),[ne,te]=(0,r.useState)([]),[re,ae]=(0,r.useState)(U),[ie,oe]=(0,r.useState)(""),[se,le]=(0,r.useState)(!0),[de,ce]=(0,r.useState)(!1),[pe,xe]=(0,r.useState)(null),[he,ge]=(0,r.useState)(!1);(0,r.useEffect)(()=>{ue()},[]),(0,r.useEffect)(()=>{J.length>0&&!ie&&oe(J[0])},[J,ie]);const ue=async()=>{if(!O)return console.error("No brand ID available"),void le(!1);try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[n,t,r]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch(`/api/brands/${O}/payment-settings`,{headers:e})]);if(n.ok){const e=await n.json();e.success&&e.currencies&&L(e.currencies)}if(t.ok){const e=await t.json();if(e.success&&e.data){const n=e.data.map(e=>e.code);V(n)}}if(r.ok){const e=await r.json();console.log("Brand payment settings loaded:",e);const n=e.data||e;n.supported_currencies&&Array.isArray(n.supported_currencies)&&(W(n.supported_currencies),n.supported_currencies.length>0&&(oe(n.supported_currencies[0]),X(n.supported_currencies[0]))),n.payment_settings&&Object.keys(n.payment_settings).length>0&&ae({...U,...n.payment_settings,bankTransfer:n.payment_settings.bankTransfer||{},qrPayment:n.payment_settings.qrPayment||{}})}}catch(e){console.error("Error loading settings:",e)}finally{le(!1)}},me=(e,n)=>{ae(t=>({...t,stripe:{...t.stripe,[e]:n}})),ge(!0)},be=(e,n)=>{ae(t=>({...t,paypal:{...t.paypal,[e]:n}})),ge(!0)},ye=(e,n,t)=>{ae(r=>({...r,bankTransfer:{...r.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...r.bankTransfer[e],[n]:t}}})),ge(!0)},je=(e,n,t)=>{ae(r=>({...r,qrPayment:{...r.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...r.qrPayment[e],[n]:t}}})),ge(!0)},fe=e=>re.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},ve=e=>re.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""};return se?(0,p.jsx)(i.A,{children:(0,p.jsxs)(x,{children:[(0,p.jsx)(o.Ay,{title:"Payment Settings"}),(0,p.jsx)(h,{children:(0,p.jsx)("p",{children:"Loading..."})})]})}):(0,p.jsxs)(i.A,{children:[(0,p.jsxs)(x,{children:[(0,p.jsx)(o.Ay,{title:"Payment Settings"}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Tax Settings"}),(0,p.jsx)(m,{children:"Configure tax rate for invoices. This tax will be applied to all invoices you generate."}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"Enable Tax"}),(0,p.jsx)(B,{children:"Apply tax to invoices"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(T,{type:"checkbox",checked:null===(e=null===(n=re.tax)||void 0===n?void 0:n.enabled)||void 0===e||e,onChange:e=>{ae(n=>({...n,tax:{...n.tax,enabled:e.target.checked}})),ge(!0)}}),(0,p.jsx)(D,{})]})]}),(null===(t=re.tax)||void 0===t?void 0:t.enabled)&&(0,p.jsx)(P,{children:(0,p.jsxs)(b,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Tax Name"}),(0,p.jsx)(z,{type:"text",value:(null===(a=re.tax)||void 0===a?void 0:a.name)||"Tax",onChange:e=>{ae(n=>({...n,tax:{...n.tax,name:e.target.value}})),ge(!0)},placeholder:"e.g., VAT, GST, Sales Tax"}),(0,p.jsx)(I,{children:"Name displayed on invoices (e.g., VAT, GST, Sales Tax)"})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Tax Rate (%)"}),(0,p.jsx)(z,{type:"number",min:"0",max:"100",step:"0.01",value:null!==(Q=null===(K=re.tax)||void 0===K?void 0:K.rate)&&void 0!==Q?Q:6,onChange:e=>{ae(n=>({...n,tax:{...n.tax,rate:parseFloat(e.target.value)||0}})),ge(!0)},placeholder:"6"}),(0,p.jsx)(I,{children:"Percentage to add to subtotal (e.g., 6 for 6%)"})]})]})})]})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Currency Settings"}),(0,p.jsx)(m,{children:"Configure supported currencies for subscription plans and invoices."}),(0,p.jsxs)(b,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Default Currency"}),(0,p.jsx)(f,{value:Y,onChange:e=>{return n=e.target.value,X(n),void ge(!0);var n},children:J.map(e=>{var n,t;return(0,p.jsxs)("option",{value:e,children:[null===(n=G[e])||void 0===n?void 0:n.symbol," ",e," - ",null===(t=G[e])||void 0===t?void 0:t.name]},e)})}),(0,p.jsx)(I,{children:"Used as default for new subscriptions and invoices"})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Supported Currencies"}),(0,p.jsx)(v,{onClick:()=>{te(J),ee(!0)},children:J.length>0?J.map(e=>{var n;return(0,p.jsxs)(k,{children:[null===(n=G[e])||void 0===n?void 0:n.symbol," ",e]},e)}):(0,p.jsx)(w,{children:"Click to select currencies"})}),(0,p.jsx)(I,{children:"Currencies available for pricing plans and invoices"})]})]})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Online Payment"}),(0,p.jsx)(m,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"Stripe"}),(0,p.jsx)(B,{children:"Credit/Debit Card payments"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(T,{type:"checkbox",checked:re.stripe.enabled,onChange:e=>me("enabled",e.target.checked)}),(0,p.jsx)(D,{})]})]}),re.stripe.enabled&&(0,p.jsxs)(P,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Publishable Key"}),(0,p.jsx)(z,{type:"text",placeholder:"pk_live_...",value:re.stripe.publishableKey,onChange:e=>me("publishableKey",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Secret Key"}),(0,p.jsx)(z,{type:"password",placeholder:"sk_live_...",value:re.stripe.secretKey,onChange:e=>me("secretKey",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Webhook Secret"}),(0,p.jsx)(z,{type:"password",placeholder:"whsec_...",value:re.stripe.webhookSecret,onChange:e=>me("webhookSecret",e.target.value)})]}),(0,p.jsx)(y,{children:(0,p.jsxs)(N,{children:[(0,p.jsx)(_,{type:"checkbox",checked:re.stripe.autoCharge,onChange:e=>me("autoCharge",e.target.checked)}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"PayPal"}),(0,p.jsx)(B,{children:"PayPal account or card"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(T,{type:"checkbox",checked:re.paypal.enabled,onChange:e=>be("enabled",e.target.checked)}),(0,p.jsx)(D,{})]})]}),re.paypal.enabled&&(0,p.jsxs)(P,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Client ID"}),(0,p.jsx)(z,{type:"text",placeholder:"Enter PayPal Client ID",value:re.paypal.clientId,onChange:e=>be("clientId",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Client Secret"}),(0,p.jsx)(z,{type:"password",placeholder:"Enter PayPal Client Secret",value:re.paypal.clientSecret,onChange:e=>be("clientSecret",e.target.value)})]})]})]})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Manual Payment"}),(0,p.jsx)(m,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===J.length?(0,p.jsx)($,{children:"No currencies configured. Please add supported currencies above first."}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(R,{children:J.map(e=>{var n;return(0,p.jsxs)(q,{active:ie===e,onClick:()=>oe(e),children:[null===(n=G[e])||void 0===n?void 0:n.symbol," ",e]},e)})}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(S,{children:["Bank Transfer (",ie,")"]}),(0,p.jsx)(B,{children:"Manual transfer with receipt upload"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(T,{type:"checkbox",checked:fe(ie).enabled,onChange:e=>ye(ie,"enabled",e.target.checked)}),(0,p.jsx)(D,{})]})]}),fe(ie).enabled&&(0,p.jsxs)(P,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Bank Name"}),(0,p.jsx)(z,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:fe(ie).bankName,onChange:e=>ye(ie,"bankName",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Account Number"}),(0,p.jsx)(z,{type:"text",placeholder:"Enter bank account number",value:fe(ie).accountNumber,onChange:e=>ye(ie,"accountNumber",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Account Name"}),(0,p.jsx)(z,{type:"text",placeholder:"Enter account holder name",value:fe(ie).accountName,onChange:e=>ye(ie,"accountName",e.target.value)})]})]})]}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(S,{children:["QR Payment (",ie,")"]}),(0,p.jsx)(B,{children:"Scan QR code to pay (DuitNow, KakaoPay, etc.)"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(T,{type:"checkbox",checked:ve(ie).enabled,onChange:e=>je(ie,"enabled",e.target.checked)}),(0,p.jsx)(D,{})]})]}),ve(ie).enabled&&(0,p.jsxs)(P,{children:[(0,p.jsx)(d.A,{value:ve(ie).qrImage,onChange:e=>je(ie,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${ie} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,p.jsxs)(y,{style:{marginTop:"16px"},children:[(0,p.jsx)(j,{children:"Description"}),(0,p.jsx)(z,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:ve(ie).qrDescription,onChange:e=>je(ie,"qrDescription",e.target.value)}),(0,p.jsx)(I,{children:"Short description shown below the QR code"})]})]})]})]})]}),(0,p.jsx)(s.He,{children:(0,p.jsxs)(s.r6,{children:[pe&&(0,p.jsx)(s.Mo,{type:pe.type,children:pe.message}),(0,p.jsx)(s.yY,{onClick:async()=>{if(he&&O){ce(!0),xe(null);try{const e=localStorage.getItem("auth_token");console.log("Saving brand payment settings:",JSON.stringify(re,null,2));const n=await fetch(`/api/brands/${O}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_settings:re})}),t=await n.json();if(console.log("Server response:",n.status,t),!n.ok)throw new Error(t.error||t.details||"Failed to save");xe({type:"success",message:"Payment settings saved successfully!"}),ge(!1)}catch(e){console.error("Error saving:",e),xe({type:"error",message:`Failed to save payment settings: ${e instanceof Error?e.message:"Unknown error"}`})}finally{ce(!1)}}else console.log("No changes to save or no brand ID")},disabled:de||!he,children:de?"Saving...":he?"Save Changes":"Saved"})]})})]})]}),(0,p.jsxs)(l.aF,{isOpen:Z,onClose:()=>ee(!1),title:"Select Supported Currencies",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l.yl,{variant:"secondary",onClick:()=>ee(!1),children:"Cancel"}),(0,p.jsxs)(l.yl,{variant:"primary",onClick:async()=>{if(O)try{const e=localStorage.getItem("auth_token");if(!(await fetch(`/api/brands/${O}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({supported_currencies:ne})})).ok)throw new Error("Failed to update currencies");W(ne),ee(!1),xe({type:"success",message:"Supported currencies updated"}),setTimeout(()=>xe(null),3e3),!ne.includes(Y)&&ne.length>0&&X(ne[0]),ne.length>0&&!ne.includes(ie)&&oe(ne[0])}catch(e){console.error("Error updating supported currencies:",e),xe({type:"error",message:"Failed to update currencies"})}},disabled:0===ne.length,children:["Save (",ne.length," selected)"]})]}),children:[(0,p.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select from the currencies enabled by System Administrator."}),0===H.length?(0,p.jsx)("p",{style:{color:"#DC2626",padding:"16px",background:"#FEF2F2",borderRadius:"8px"},children:"No currencies have been configured by System Administrator yet."}):(0,p.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:H.map(e=>{const n=G[e];return n?(0,p.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(ne.includes(e)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:ne.includes(e)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,p.jsx)("input",{type:"checkbox",checked:ne.includes(e),onChange:()=>(e=>{te(n=>n.includes(e)?n.filter(n=>n!==e):[...n,e])})(e),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{style:{fontWeight:500},children:[n.symbol," ",e]}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:n.name})]})]},e):null})})]})]})}},4877:(e,n,t)=>{t.d(n,{A:()=>y});var r=t(9950),a=t(4752),i=t(4414);const o=a.Ay.div`
  margin-bottom: 16px;
`,s=a.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=a.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,c=a.Ay.div`
  width: ${e=>e.hasImage?"150px":"100%"};
  height: 150px;
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  position: relative;

  &:hover {
    border-color: ${e=>e.hasImage?"#CBD5E1":"#635BFF"};
    background: ${e=>e.hasImage?"#F8FAFC":"rgba(99, 91, 255, 0.03)"};
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`,p=a.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,x=a.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,h=a.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,g=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,u=a.Ay.label`
  padding: 8px 16px;
  border: 1px solid #635BFF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
  text-align: center;

  &:hover {
    background: #635BFF;
    color: white;
  }

  input {
    display: none;
  }
`,m=a.Ay.button`
  padding: 8px 16px;
  border: 1px solid #DC2626;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #DC2626;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`,b=a.Ay.input`
  display: none;
`,y=e=>{let{value:n,onChange:t,label:a="Logo Upload",helpText:y="Upload an image for your logo",maxSize:j=2,previewSize:f=150,showRemoveButton:v=!0,changeButtonText:k="Change Image",removeButtonText:w="Remove Image",imageAltText:C="Uploaded"}=e;const[A,F]=(0,r.useState)(!1),S=(0,r.useRef)(null),B=(0,r.useRef)(null),E=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*j*1024)return void alert(`Image size should be less than ${j}MB`);const n=new FileReader;n.onload=e=>{var n;const r=new Image;r.onload=()=>{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return;const a=800;let i=r.width,o=r.height;(i>a||o>a)&&(i>o?(o=o/i*a,i=a):(i=i/o*a,o=a)),e.width=i,e.height=o,n.drawImage(r,0,0,i,o);const s=e.toDataURL("image/jpeg",.85);t(s)},r.src=null===(n=e.target)||void 0===n?void 0:n.result},n.readAsDataURL(e)},T=e=>{const n=e.target.files;n&&n.length>0&&E(n[0])};return(0,i.jsxs)(o,{children:[a&&(0,i.jsx)(s,{children:a}),y&&(0,i.jsx)(l,{children:y}),(0,i.jsxs)(d,{children:[(0,i.jsx)(c,{ref:B,isDragging:A,hasImage:!!n,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),F(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===B.current&&F(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),F(!1);const n=e.dataTransfer.files;n&&n.length>0&&E(n[0])},onClick:()=>{var e;n||(null===(e=S.current)||void 0===e||e.click())},children:n?(0,i.jsx)("img",{src:n,alt:C}):(0,i.jsxs)(p,{children:[(0,i.jsx)(x,{children:A?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(h,{children:["PNG, JPG, GIF up to ",j,"MB"]})]})}),n&&(0,i.jsxs)(g,{children:[(0,i.jsxs)(u,{children:[k,(0,i.jsx)("input",{ref:S,type:"file",accept:"image/*",onChange:T})]}),v&&(0,i.jsx)(m,{onClick:()=>{t("")},children:w})]})]}),!n&&(0,i.jsx)(b,{ref:S,type:"file",accept:"image/*",onChange:T})]})}},8012:(e,n,t)=>{t.d(n,{Ay:()=>l});t(9950);var r=t(4752),a=t(4414);const i=r.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,o=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,s=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,l=e=>{let{title:n,children:t}=e;return(0,a.jsxs)(i,{children:[(0,a.jsx)(o,{children:n}),t&&(0,a.jsx)(s,{children:t})]})}}}]);