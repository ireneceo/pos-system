"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3377],{3377:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Q});var r=t(9950),a=t(4752),i=t(3310),s=t(8012),o=t(2674),l=t(9610),d=t(4877),c=t(1367),p=t(4414);const h=a.Ay.div`
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
`,C=a.Ay.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`,k=a.Ay.span`
  color: #9CA3AF;
`,w=a.Ay.div`
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
`,I=a.Ay.input`
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
`,T=a.Ay.p`
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
`,$=a.Ay.button`
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
`,q=a.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,U={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]},Q=()=>{const{user:e}=(0,c.As)(),n=null===e||void 0===e?void 0:e.brand_id,[t,a]=(0,r.useState)({}),[Q,K]=(0,r.useState)([]),[M,O]=(0,r.useState)([]),[L,J]=(0,r.useState)("USD"),[G,W]=(0,r.useState)(!1),[Y,H]=(0,r.useState)([]),[X,V]=(0,r.useState)(U),[Z,ee]=(0,r.useState)(""),[ne,te]=(0,r.useState)(!0),[re,ae]=(0,r.useState)(!1),[ie,se]=(0,r.useState)(null),[oe,le]=(0,r.useState)(!1);(0,r.useEffect)(()=>{de()},[]),(0,r.useEffect)(()=>{Q.length>0&&!Z&&ee(Q[0])},[Q,Z]);const de=async()=>{if(!n)return console.error("No brand ID available"),void te(!1);try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[t,r,i]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch(`/api/brands/${n}/payment-settings`,{headers:e})]);if(t.ok){const e=await t.json();e.success&&e.currencies&&a(e.currencies)}if(r.ok){const e=await r.json();if(e.success&&e.data){const n=e.data.map(e=>e.code);O(n)}}if(i.ok){const e=await i.json();console.log("Brand payment settings loaded:",e);const n=e.data||e;n.supported_currencies&&Array.isArray(n.supported_currencies)&&(K(n.supported_currencies),n.supported_currencies.length>0&&(ee(n.supported_currencies[0]),J(n.supported_currencies[0]))),n.payment_settings&&Object.keys(n.payment_settings).length>0&&V({...U,...n.payment_settings,bankTransfer:n.payment_settings.bankTransfer||{},qrPayment:n.payment_settings.qrPayment||{}})}}catch(e){console.error("Error loading settings:",e)}finally{te(!1)}},ce=(e,n)=>{V(t=>({...t,stripe:{...t.stripe,[e]:n}})),le(!0)},pe=(e,n)=>{V(t=>({...t,paypal:{...t.paypal,[e]:n}})),le(!0)},he=(e,n,t)=>{V(r=>({...r,bankTransfer:{...r.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...r.bankTransfer[e],[n]:t}}})),le(!0)},xe=(e,n,t)=>{V(r=>({...r,qrPayment:{...r.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...r.qrPayment[e],[n]:t}}})),le(!0)},ge=e=>X.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},ue=e=>X.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""};return ne?(0,p.jsx)(i.A,{children:(0,p.jsxs)(h,{children:[(0,p.jsx)(s.Ay,{title:"Payment Settings"}),(0,p.jsx)(x,{children:(0,p.jsx)("p",{children:"Loading..."})})]})}):(0,p.jsxs)(i.A,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(s.Ay,{title:"Payment Settings"}),(0,p.jsxs)(x,{children:[(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Additional Charges"}),(0,p.jsx)(m,{children:"Configure additional charges for invoices. These will be applied to all invoices you generate. You can set up to 3 custom charge items (e.g., Tax, Service Charge, Processing Fee)."}),[0,1,2].map(e=>{var n;const t=(null===(n=X.additionalCharges)||void 0===n?void 0:n[e])||{enabled:!1,name:"",rate:0};return(0,p.jsxs)(w,{style:{marginBottom:"16px"},children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(S,{children:["Charge Item ",e+1]}),(0,p.jsx)(B,{children:t.enabled&&t.name?`${t.name} (${t.rate}%)`:"Not configured"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(P,{type:"checkbox",checked:t.enabled,onChange:n=>{const t=[...X.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],enabled:n.target.checked},V(e=>({...e,additionalCharges:t})),le(!0)}}),(0,p.jsx)(D,{})]})]}),t.enabled&&(0,p.jsx)(z,{children:(0,p.jsxs)(b,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Item Name"}),(0,p.jsx)(I,{type:"text",value:t.name,onChange:n=>{const t=[...X.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],name:n.target.value},V(e=>({...e,additionalCharges:t})),le(!0)},placeholder:"e.g., Tax, Service Charge, Processing Fee"}),(0,p.jsx)(T,{children:"Name displayed on invoices"})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Rate (%)"}),(0,p.jsx)(I,{type:"number",min:"0",max:"100",step:"0.01",value:t.rate,onChange:n=>{const t=[...X.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],rate:parseFloat(n.target.value)||0},V(e=>({...e,additionalCharges:t})),le(!0)},placeholder:"0"}),(0,p.jsx)(T,{children:"Percentage to add to subtotal"})]})]})})]},e)})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Currency Settings"}),(0,p.jsx)(m,{children:"Configure supported currencies for subscription plans and invoices."}),(0,p.jsxs)(b,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Default Currency"}),(0,p.jsx)(f,{value:L,onChange:e=>{return n=e.target.value,J(n),void le(!0);var n},children:Q.map(e=>{var n,r;return(0,p.jsxs)("option",{value:e,children:[null===(n=t[e])||void 0===n?void 0:n.symbol," ",e," - ",null===(r=t[e])||void 0===r?void 0:r.name]},e)})}),(0,p.jsx)(T,{children:"Used as default for new subscriptions and invoices"})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Supported Currencies"}),(0,p.jsx)(v,{onClick:()=>{H(Q),W(!0)},children:Q.length>0?Q.map(e=>{var n;return(0,p.jsxs)(C,{children:[null===(n=t[e])||void 0===n?void 0:n.symbol," ",e]},e)}):(0,p.jsx)(k,{children:"Click to select currencies"})}),(0,p.jsx)(T,{children:"Currencies available for pricing plans and invoices"})]})]})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Online Payment"}),(0,p.jsx)(m,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"Stripe"}),(0,p.jsx)(B,{children:"Credit/Debit Card payments"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(P,{type:"checkbox",checked:X.stripe.enabled,onChange:e=>ce("enabled",e.target.checked)}),(0,p.jsx)(D,{})]})]}),X.stripe.enabled&&(0,p.jsxs)(z,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Publishable Key"}),(0,p.jsx)(I,{type:"text",placeholder:"pk_live_...",value:X.stripe.publishableKey,onChange:e=>ce("publishableKey",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Secret Key"}),(0,p.jsx)(I,{type:"password",placeholder:"sk_live_...",value:X.stripe.secretKey,onChange:e=>ce("secretKey",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Webhook Secret"}),(0,p.jsx)(I,{type:"password",placeholder:"whsec_...",value:X.stripe.webhookSecret,onChange:e=>ce("webhookSecret",e.target.value)})]}),(0,p.jsx)(y,{children:(0,p.jsxs)(N,{children:[(0,p.jsx)(_,{type:"checkbox",checked:X.stripe.autoCharge,onChange:e=>ce("autoCharge",e.target.checked)}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"PayPal"}),(0,p.jsx)(B,{children:"PayPal account or card"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(P,{type:"checkbox",checked:X.paypal.enabled,onChange:e=>pe("enabled",e.target.checked)}),(0,p.jsx)(D,{})]})]}),X.paypal.enabled&&(0,p.jsxs)(z,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Client ID"}),(0,p.jsx)(I,{type:"text",placeholder:"Enter PayPal Client ID",value:X.paypal.clientId,onChange:e=>pe("clientId",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Client Secret"}),(0,p.jsx)(I,{type:"password",placeholder:"Enter PayPal Client Secret",value:X.paypal.clientSecret,onChange:e=>pe("clientSecret",e.target.value)})]})]})]})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Manual Payment"}),(0,p.jsx)(m,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===Q.length?(0,p.jsx)(q,{children:"No currencies configured. Please add supported currencies above first."}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(R,{children:Q.map(e=>{var n;return(0,p.jsxs)($,{active:Z===e,onClick:()=>ee(e),children:[null===(n=t[e])||void 0===n?void 0:n.symbol," ",e]},e)})}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(S,{children:["Bank Transfer (",Z,")"]}),(0,p.jsx)(B,{children:"Manual transfer with receipt upload"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(P,{type:"checkbox",checked:ge(Z).enabled,onChange:e=>he(Z,"enabled",e.target.checked)}),(0,p.jsx)(D,{})]})]}),ge(Z).enabled&&(0,p.jsxs)(z,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Bank Name"}),(0,p.jsx)(I,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:ge(Z).bankName,onChange:e=>he(Z,"bankName",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Account Number"}),(0,p.jsx)(I,{type:"text",placeholder:"Enter bank account number",value:ge(Z).accountNumber,onChange:e=>he(Z,"accountNumber",e.target.value)})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(j,{children:"Account Name"}),(0,p.jsx)(I,{type:"text",placeholder:"Enter account holder name",value:ge(Z).accountName,onChange:e=>he(Z,"accountName",e.target.value)})]})]})]}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(A,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(S,{children:["QR Payment (",Z,")"]}),(0,p.jsx)(B,{children:"Scan QR code to pay (DuitNow, KakaoPay, etc.)"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)(P,{type:"checkbox",checked:ue(Z).enabled,onChange:e=>xe(Z,"enabled",e.target.checked)}),(0,p.jsx)(D,{})]})]}),ue(Z).enabled&&(0,p.jsxs)(z,{children:[(0,p.jsx)(d.A,{value:ue(Z).qrImage,onChange:e=>xe(Z,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${Z} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,p.jsxs)(y,{style:{marginTop:"16px"},children:[(0,p.jsx)(j,{children:"Description"}),(0,p.jsx)(I,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:ue(Z).qrDescription,onChange:e=>xe(Z,"qrDescription",e.target.value)}),(0,p.jsx)(T,{children:"Short description shown below the QR code"})]})]})]})]})]}),(0,p.jsx)(o.He,{children:(0,p.jsxs)(o.r6,{children:[ie&&(0,p.jsx)(o.Mo,{type:ie.type,children:ie.message}),(0,p.jsx)(o.yY,{onClick:async()=>{if(oe&&n){ae(!0),se(null);try{const e=localStorage.getItem("auth_token");console.log("Saving brand payment settings:",JSON.stringify(X,null,2));const t=await fetch(`/api/brands/${n}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_settings:X})}),r=await t.json();if(console.log("Server response:",t.status,r),!t.ok)throw new Error(r.error||r.details||"Failed to save");se({type:"success",message:"Payment settings saved successfully!"}),le(!1)}catch(e){console.error("Error saving:",e),se({type:"error",message:`Failed to save payment settings: ${e instanceof Error?e.message:"Unknown error"}`})}finally{ae(!1)}}else console.log("No changes to save or no brand ID")},disabled:re||!oe,children:re?"Saving...":oe?"Save Changes":"Saved"})]})})]})]}),(0,p.jsxs)(l.aF,{isOpen:G,onClose:()=>W(!1),title:"Select Supported Currencies",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l.yl,{variant:"secondary",onClick:()=>W(!1),children:"Cancel"}),(0,p.jsxs)(l.yl,{variant:"primary",onClick:async()=>{if(n)try{const e=localStorage.getItem("auth_token");if(!(await fetch(`/api/brands/${n}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({supported_currencies:Y})})).ok)throw new Error("Failed to update currencies");K(Y),W(!1),se({type:"success",message:"Supported currencies updated"}),setTimeout(()=>se(null),3e3),!Y.includes(L)&&Y.length>0&&J(Y[0]),Y.length>0&&!Y.includes(Z)&&ee(Y[0])}catch(e){console.error("Error updating supported currencies:",e),se({type:"error",message:"Failed to update currencies"})}},disabled:0===Y.length,children:["Save (",Y.length," selected)"]})]}),children:[(0,p.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select from the currencies enabled by System Administrator."}),0===M.length?(0,p.jsx)("p",{style:{color:"#DC2626",padding:"16px",background:"#FEF2F2",borderRadius:"8px"},children:"No currencies have been configured by System Administrator yet."}):(0,p.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:M.map(e=>{const n=t[e];return n?(0,p.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(Y.includes(e)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:Y.includes(e)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,p.jsx)("input",{type:"checkbox",checked:Y.includes(e),onChange:()=>(e=>{H(n=>n.includes(e)?n.filter(n=>n!==e):[...n,e])})(e),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{style:{fontWeight:500},children:[n.symbol," ",e]}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:n.name})]})]},e):null})})]})]})}},4877:(e,n,t)=>{t.d(n,{A:()=>y});var r=t(9950),a=t(4752),i=t(4414);const s=a.Ay.div`
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
`,y=e=>{let{value:n,onChange:t,label:a="Logo Upload",helpText:y="Upload an image for your logo",maxSize:j=2,previewSize:f=150,showRemoveButton:v=!0,changeButtonText:C="Change Image",removeButtonText:k="Remove Image",imageAltText:w="Uploaded"}=e;const[A,F]=(0,r.useState)(!1),S=(0,r.useRef)(null),B=(0,r.useRef)(null),E=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*j*1024)return void alert(`Image size should be less than ${j}MB`);const n=new FileReader;n.onload=e=>{var n;const r=new Image;r.onload=()=>{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return;const a=800;let i=r.width,s=r.height;(i>a||s>a)&&(i>s?(s=s/i*a,i=a):(i=i/s*a,s=a)),e.width=i,e.height=s,n.drawImage(r,0,0,i,s);const o=e.toDataURL("image/jpeg",.85);t(o)},r.src=null===(n=e.target)||void 0===n?void 0:n.result},n.readAsDataURL(e)},P=e=>{const n=e.target.files;n&&n.length>0&&E(n[0])};return(0,i.jsxs)(s,{children:[a&&(0,i.jsx)(o,{children:a}),y&&(0,i.jsx)(l,{children:y}),(0,i.jsxs)(d,{children:[(0,i.jsx)(c,{ref:B,isDragging:A,hasImage:!!n,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),F(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===B.current&&F(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),F(!1);const n=e.dataTransfer.files;n&&n.length>0&&E(n[0])},onClick:()=>{var e;n||(null===(e=S.current)||void 0===e||e.click())},children:n?(0,i.jsx)("img",{src:n,alt:w}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:A?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(x,{children:["PNG, JPG, GIF up to ",j,"MB"]})]})}),n&&(0,i.jsxs)(g,{children:[(0,i.jsxs)(u,{children:[C,(0,i.jsx)("input",{ref:S,type:"file",accept:"image/*",onChange:P})]}),v&&(0,i.jsx)(m,{onClick:()=>{t("")},children:k})]})]}),!n&&(0,i.jsx)(b,{ref:S,type:"file",accept:"image/*",onChange:P})]})}},8012:(e,n,t)=>{t.d(n,{Ay:()=>l});t(9950);var r=t(4752),a=t(4414);const i=r.Ay.div`
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