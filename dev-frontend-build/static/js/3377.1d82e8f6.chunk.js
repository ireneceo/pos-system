"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3377],{2597:(e,n,t)=>{t.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});t(9950);var r=t(4752),a=t(4414);const i=r.Ay.div`
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
`,s=r.Ay.button`
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
`,o=r.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:n,className:t,style:r}=e;return(0,a.jsx)(i,{className:t,style:r,children:n})},d=e=>{let{active:n,onClick:t,children:r,className:i}=e;return(0,a.jsx)(s,{active:n,onClick:t,className:i,children:r})},c=e=>{let{count:n,variant:t="default",showZero:r=!1}=e;return 0!==n||r?(0,a.jsx)(o,{variant:t,children:n}):null}},3377:(e,n,t)=>{t.r(n),t.d(n,{default:()=>U});var r=t(9950),a=t(4752),i=t(8012),s=t(8409),o=t(2597),l=t(9610),d=t(4877),c=t(1367),p=t(4414);const h=a.Ay.div`
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
`,F=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,A=a.Ay.div``,B=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,S=a.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-top: 2px;
`,E=a.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`,P=a.Ay.input`
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
`,z=a.Ay.div`
  border-top: 1px solid #E6EBF1;
  margin-top: 16px;
  padding-top: 16px;
`,N=a.Ay.input`
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
`,T=a.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
`,$=a.Ay.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`,_=a.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,R={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]},U=()=>{const{user:e}=(0,c.As)(),n=null===e||void 0===e?void 0:e.brand_id,[t,a]=(0,r.useState)({}),[U,q]=(0,r.useState)([]),[Q,K]=(0,r.useState)([]),[O,M]=(0,r.useState)("USD"),[J,L]=(0,r.useState)(!1),[W,G]=(0,r.useState)([]),[Y,H]=(0,r.useState)(R),[X,Z]=(0,r.useState)(""),[V,ee]=(0,r.useState)(!0),[ne,te]=(0,r.useState)(!1),[re,ae]=(0,r.useState)(null),[ie,se]=(0,r.useState)(!1);(0,r.useEffect)(()=>{oe()},[]),(0,r.useEffect)(()=>{U.length>0&&!X&&Z(U[0])},[U,X]);const oe=async()=>{if(!n)return console.error("No brand ID available"),void ee(!1);try{const t={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[r,i,s]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch(`/api/brands/${n}/payment-settings`,{headers:t})]);if(r.ok){const e=await r.json();e.success&&e.currencies&&a(e.currencies)}let o=[];if(i.ok){const e=await i.json();e.success&&e.data&&(o=e.data.map(e=>e.code),K(o))}if(s.ok){const n=await s.json();console.log("Brand payment settings loaded:",n);const t=n.data||n;if(t.supported_currencies&&Array.isArray(t.supported_currencies)){const n=o.length>0?t.supported_currencies.filter(e=>o.includes(e)):t.supported_currencies;if(q(n),n.length>0){var e;Z(n[0]);const r=null===(e=t.payment_settings)||void 0===e?void 0:e.defaultCurrency;r&&n.includes(r)?M(r):M(n[0])}}t.payment_settings&&Object.keys(t.payment_settings).length>0&&H({...R,...t.payment_settings,bankTransfer:t.payment_settings.bankTransfer||{},qrPayment:t.payment_settings.qrPayment||{}})}}catch(t){console.error("Error loading settings:",t)}finally{ee(!1)}},le=(e,n)=>{H(t=>({...t,stripe:{...t.stripe,[e]:n}})),se(!0)},de=(e,n)=>{H(t=>({...t,paypal:{...t.paypal,[e]:n}})),se(!0)},ce=(e,n,t)=>{H(r=>({...r,bankTransfer:{...r.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...r.bankTransfer[e],[n]:t}}})),se(!0)},pe=(e,n,t)=>{H(r=>({...r,qrPayment:{...r.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...r.qrPayment[e],[n]:t}}})),se(!0)},he=e=>Y.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},xe=e=>Y.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""};return V?(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(h,{children:[(0,p.jsx)(i.Ay,{title:"Payment Settings"}),(0,p.jsx)(x,{children:(0,p.jsx)("p",{children:"Loading..."})})]})}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(i.Ay,{title:"Payment Settings"}),(0,p.jsxs)(x,{children:[(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Additional Charges"}),(0,p.jsx)(m,{children:"Configure additional charges for invoices. These will be applied to all invoices you generate. You can set up to 3 custom charge items (e.g., Tax, Service Charge, Processing Fee)."}),[0,1,2].map(e=>{var n;const t=(null===(n=Y.additionalCharges)||void 0===n?void 0:n[e])||{enabled:!1,name:"",rate:0};return(0,p.jsxs)(C,{style:{marginBottom:"16px"},children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(B,{children:["Charge Item ",e+1]}),(0,p.jsx)(S,{children:t.enabled&&t.name?`${t.name} (${t.rate}%)`:"Not configured"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(P,{type:"checkbox",checked:t.enabled,onChange:n=>{const t=[...Y.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],enabled:n.target.checked},H(e=>({...e,additionalCharges:t})),se(!0)}}),(0,p.jsx)(D,{})]})]}),t.enabled&&(0,p.jsx)(z,{children:(0,p.jsxs)(b,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Item Name"}),(0,p.jsx)(N,{type:"text",value:t.name,onChange:n=>{const t=[...Y.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],name:n.target.value},H(e=>({...e,additionalCharges:t})),se(!0)},placeholder:"e.g., Tax, Service Charge, Processing Fee"}),(0,p.jsx)(I,{children:"Name displayed on invoices"})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Rate (%)"}),(0,p.jsx)(N,{type:"number",min:"0",max:"100",step:"0.01",value:t.rate,onChange:n=>{const t=[...Y.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],rate:parseFloat(n.target.value)||0},H(e=>({...e,additionalCharges:t})),se(!0)},placeholder:"0"}),(0,p.jsx)(I,{children:"Percentage to add to subtotal"})]})]})})]},e)})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Currency Settings"}),(0,p.jsx)(m,{children:"Configure supported currencies for subscription plans and invoices."}),(0,p.jsxs)(b,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Default Currency"}),(0,p.jsx)(f,{value:O,onChange:e=>{return n=e.target.value,M(n),void se(!0);var n},children:U.map(e=>{var n,r;return(0,p.jsxs)("option",{value:e,children:[null===(n=t[e])||void 0===n?void 0:n.symbol," ",e," - ",null===(r=t[e])||void 0===r?void 0:r.name]},e)})}),(0,p.jsx)(I,{children:"Used as default for new subscriptions and invoices"})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Supported Currencies"}),(0,p.jsx)(v,{onClick:()=>{G(U),L(!0)},children:U.length>0?U.map(e=>{var n;return(0,p.jsxs)(k,{children:[null===(n=t[e])||void 0===n?void 0:n.symbol," ",e]},e)}):(0,p.jsx)(w,{children:"Click to select currencies"})}),(0,p.jsx)(I,{children:"Currencies available for pricing plans and invoices"})]})]})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Online Payment"}),(0,p.jsx)(m,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(A,{children:[(0,p.jsx)(B,{children:"Stripe"}),(0,p.jsx)(S,{children:"Credit/Debit Card payments"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(P,{type:"checkbox",checked:Y.stripe.enabled,onChange:e=>le("enabled",e.target.checked)}),(0,p.jsx)(D,{})]})]}),Y.stripe.enabled&&(0,p.jsxs)(z,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Publishable Key"}),(0,p.jsx)(N,{type:"text",placeholder:"pk_live_...",value:Y.stripe.publishableKey,onChange:e=>le("publishableKey",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Secret Key"}),(0,p.jsx)(N,{type:"password",placeholder:"sk_live_...",value:Y.stripe.secretKey,onChange:e=>le("secretKey",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Webhook Secret"}),(0,p.jsx)(N,{type:"password",placeholder:"whsec_...",value:Y.stripe.webhookSecret,onChange:e=>le("webhookSecret",e.target.value)})]}),(0,p.jsx)(y,{children:(0,p.jsxs)(T,{children:[(0,p.jsx)($,{type:"checkbox",checked:Y.stripe.autoCharge,onChange:e=>le("autoCharge",e.target.checked)}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(A,{children:[(0,p.jsx)(B,{children:"PayPal"}),(0,p.jsx)(S,{children:"PayPal account or card"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(P,{type:"checkbox",checked:Y.paypal.enabled,onChange:e=>de("enabled",e.target.checked)}),(0,p.jsx)(D,{})]})]}),Y.paypal.enabled&&(0,p.jsxs)(z,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Client ID"}),(0,p.jsx)(N,{type:"text",placeholder:"Enter PayPal Client ID",value:Y.paypal.clientId,onChange:e=>de("clientId",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Client Secret"}),(0,p.jsx)(N,{type:"password",placeholder:"Enter PayPal Client Secret",value:Y.paypal.clientSecret,onChange:e=>de("clientSecret",e.target.value)})]})]})]})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Manual Payment"}),(0,p.jsx)(m,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===U.length?(0,p.jsx)(_,{children:"No currencies configured. Please add supported currencies above first."}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o.tU,{children:U.map(e=>{var n;return(0,p.jsxs)(o.oz,{active:X===e,onClick:()=>Z(e),children:[null===(n=t[e])||void 0===n?void 0:n.symbol," ",e]},e)})}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(B,{children:["Bank Transfer (",X,")"]}),(0,p.jsx)(S,{children:"Manual transfer with receipt upload"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(P,{type:"checkbox",checked:he(X).enabled,onChange:e=>ce(X,"enabled",e.target.checked)}),(0,p.jsx)(D,{})]})]}),he(X).enabled&&(0,p.jsxs)(z,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Bank Name"}),(0,p.jsx)(N,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:he(X).bankName,onChange:e=>ce(X,"bankName",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Account Number"}),(0,p.jsx)(N,{type:"text",placeholder:"Enter bank account number",value:he(X).accountNumber,onChange:e=>ce(X,"accountNumber",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Account Name"}),(0,p.jsx)(N,{type:"text",placeholder:"Enter account holder name",value:he(X).accountName,onChange:e=>ce(X,"accountName",e.target.value)})]})]})]}),(0,p.jsxs)(C,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(B,{children:["QR Payment (",X,")"]}),(0,p.jsx)(S,{children:"Scan QR code to pay (DuitNow, KakaoPay, etc.)"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(P,{type:"checkbox",checked:xe(X).enabled,onChange:e=>pe(X,"enabled",e.target.checked)}),(0,p.jsx)(D,{})]})]}),xe(X).enabled&&(0,p.jsxs)(z,{children:[(0,p.jsx)(d.A,{value:xe(X).qrImage,onChange:e=>pe(X,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${X} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,p.jsxs)(y,{style:{marginTop:"16px"},children:[(0,p.jsx)(j,{children:"Description"}),(0,p.jsx)(N,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:xe(X).qrDescription,onChange:e=>pe(X,"qrDescription",e.target.value)}),(0,p.jsx)(I,{children:"Short description shown below the QR code"})]})]})]})]})]}),(0,p.jsx)(s.He,{children:(0,p.jsxs)(s.r6,{children:[re&&(0,p.jsx)(s.Mo,{type:re.type,children:re.message}),(0,p.jsx)(s.yY,{onClick:async()=>{if(ie&&n){te(!0),ae(null);try{const e=localStorage.getItem("auth_token");console.log("Saving brand payment settings:",JSON.stringify(Y,null,2));const t=await fetch(`/api/brands/${n}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_settings:Y})}),r=await t.json();if(console.log("Server response:",t.status,r),!t.ok)throw new Error(r.error||r.details||"Failed to save");ae({type:"success",message:"Payment settings saved successfully!"}),se(!1)}catch(e){console.error("Error saving:",e),ae({type:"error",message:`Failed to save payment settings: ${e instanceof Error?e.message:"Unknown error"}`})}finally{te(!1)}}else console.log("No changes to save or no brand ID")},disabled:ne||!ie,children:ne?"Saving...":ie?"Save Changes":"Saved"})]})})]})]}),(0,p.jsxs)(l.aF,{isOpen:J,onClose:()=>L(!1),title:"Select Supported Currencies",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l.yl,{variant:"secondary",onClick:()=>L(!1),children:"Cancel"}),(0,p.jsxs)(l.yl,{variant:"primary",onClick:async()=>{if(n)try{const e=localStorage.getItem("auth_token");if(!(await fetch(`/api/brands/${n}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({supported_currencies:W})})).ok)throw new Error("Failed to update currencies");q(W),L(!1),ae({type:"success",message:"Supported currencies updated"}),setTimeout(()=>ae(null),3e3),!W.includes(O)&&W.length>0&&M(W[0]),W.length>0&&!W.includes(X)&&Z(W[0])}catch(e){console.error("Error updating supported currencies:",e),ae({type:"error",message:"Failed to update currencies"})}},disabled:0===W.length,children:["Save (",W.length," selected)"]})]}),children:[(0,p.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select from the currencies enabled by System Administrator."}),0===Q.length?(0,p.jsx)("p",{style:{color:"#DC2626",padding:"16px",background:"#FEF2F2",borderRadius:"8px"},children:"No currencies have been configured by System Administrator yet."}):(0,p.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Q.map(e=>{const n=t[e];return n?(0,p.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(W.includes(e)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:W.includes(e)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,p.jsx)("input",{type:"checkbox",checked:W.includes(e),onChange:()=>(e=>{G(n=>n.includes(e)?n.filter(n=>n!==e):[...n,e])})(e),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{style:{fontWeight:500},children:[n.symbol," ",e]}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:n.name})]})]},e):null})})]})]})}},4877:(e,n,t)=>{t.d(n,{A:()=>f});var r=t(9950),a=t(4752),i=t(4414);const s=a.Ay.div`
  margin-bottom: 16px;
`,o=a.Ay.label`
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
  cursor: ${e=>e.isUploading?"wait":"pointer"};
  transition: all 0.2s;
  overflow: hidden;
  position: relative;
  opacity: ${e=>e.isUploading?.7:1};

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
`,h=a.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,x=a.Ay.p`
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
  cursor: ${e=>e.disabled?"wait":"pointer"};
  transition: all 0.2s;
  display: inline-block;
  text-align: center;
  opacity: ${e=>e.disabled?.5:1};

  &:hover {
    background: ${e=>e.disabled?"transparent":"#635BFF"};
    color: ${e=>e.disabled?"#635BFF":"white"};
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
`,y=a.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,j=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",f=e=>{let{value:n,onChange:t,label:a="Logo Upload",helpText:f="Upload an image for your logo",maxSize:v=2,previewSize:k=150,showRemoveButton:w=!0,changeButtonText:C="Change Image",removeButtonText:F="Remove Image",imageAltText:A="Uploaded"}=e;const[B,S]=(0,r.useState)(!1),[E,P]=(0,r.useState)(!1),D=(0,r.useRef)(null),z=(0,r.useRef)(null),N=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);P(!0);const n=new FileReader;n.onload=async e=>{var n;const r=new Image;r.onload=async()=>{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return void P(!1);const a=1200;let i=r.width,s=r.height;(i>a||s>a)&&(i>s?(s=s/i*a,i=a):(i=i/s*a,s=a)),e.width=i,e.height=s,n.drawImage(r,0,0,i,s);const o=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const n=localStorage.getItem("auth_token"),t=await fetch(`${j()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({image:e})}),r=await t.json();return r.success?r.data.original:(console.error("Image upload failed:",r.message),null)}catch(n){return console.error("Image upload error:",n),null}})(o);P(!1),l?t(l):alert("Failed to upload image. Please try again.")},r.src=null===(n=e.target)||void 0===n?void 0:n.result},n.readAsDataURL(e)},I=e=>{if(E)return;const n=e.target.files;n&&n.length>0&&N(n[0]),e.target.value=""};return(0,i.jsxs)(s,{children:[a&&(0,i.jsx)(o,{children:a}),f&&(0,i.jsx)(l,{children:f}),(0,i.jsxs)(d,{children:[(0,i.jsx)(c,{ref:z,isDragging:B,hasImage:!!n,isUploading:E,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),E||S(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===z.current&&S(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),S(!1),E)return;const n=e.dataTransfer.files;n&&n.length>0&&N(n[0])},onClick:()=>{var e;n||E||(null===(e=D.current)||void 0===e||e.click())},children:E?(0,i.jsxs)(p,{children:[(0,i.jsx)(y,{}),(0,i.jsx)(h,{style:{marginTop:"12px"},children:"Uploading..."})]}):n?(0,i.jsx)("img",{src:(T=n,T?T.startsWith("http")?T:T.startsWith("/uploads/")?`${j()}${T}`:T:""),alt:A}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:B?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(x,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),n&&!E&&(0,i.jsxs)(g,{children:[(0,i.jsxs)(u,{disabled:E,children:[C,(0,i.jsx)("input",{ref:D,type:"file",accept:"image/*",onChange:I,disabled:E})]}),w&&(0,i.jsx)(m,{onClick:()=>{t("")},disabled:E,children:F})]})]}),!n&&!E&&(0,i.jsx)(b,{ref:D,type:"file",accept:"image/*",onChange:I})]});var T}},8012:(e,n,t)=>{t.d(n,{Ay:()=>l});t(9950);var r=t(4752),a=t(4414);const i=r.Ay.div`
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
`,s=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,o=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,l=e=>{let{title:n,children:t}=e;return(0,a.jsxs)(i,{children:[(0,a.jsx)(s,{children:n}),t&&(0,a.jsx)(o,{children:t})]})}}}]);