"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3377],{3377:(e,n,t)=>{t.r(n),t.d(n,{default:()=>U});var r=t(9950),a=t(4752),i=t(8012),o=t(2674),s=t(9610),l=t(4877),d=t(1367),c=t(4414);const p=a.Ay.div`
  min-height: 100vh;
`,h=a.Ay.div`
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
`,u=a.Ay.p`
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
`,b=a.Ay.div`
  margin-bottom: 16px;
`,y=a.Ay.label`
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
`,C=a.Ay.span`
  color: #9CA3AF;
`,k=a.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`,w=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,F=a.Ay.div``,A=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,S=a.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-top: 2px;
`,B=a.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`,E=a.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #635BFF;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`,P=a.Ay.span`
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
`,D=a.Ay.div`
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
`,z=a.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
`,N=a.Ay.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`,$=a.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid #E6EBF1;
  padding-bottom: 0;
  overflow-x: auto;
`,_=a.Ay.button`
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
`,R=a.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,q={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]},U=()=>{const{user:e}=(0,d.As)(),n=null===e||void 0===e?void 0:e.brand_id,[t,a]=(0,r.useState)({}),[U,Q]=(0,r.useState)([]),[K,O]=(0,r.useState)([]),[M,J]=(0,r.useState)("USD"),[L,W]=(0,r.useState)(!1),[G,Y]=(0,r.useState)([]),[H,X]=(0,r.useState)(q),[V,Z]=(0,r.useState)(""),[ee,ne]=(0,r.useState)(!0),[te,re]=(0,r.useState)(!1),[ae,ie]=(0,r.useState)(null),[oe,se]=(0,r.useState)(!1);(0,r.useEffect)(()=>{le()},[]),(0,r.useEffect)(()=>{U.length>0&&!V&&Z(U[0])},[U,V]);const le=async()=>{if(!n)return console.error("No brand ID available"),void ne(!1);try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[t,r,i]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch(`/api/brands/${n}/payment-settings`,{headers:e})]);if(t.ok){const e=await t.json();e.success&&e.currencies&&a(e.currencies)}if(r.ok){const e=await r.json();if(e.success&&e.data){const n=e.data.map(e=>e.code);O(n)}}if(i.ok){const e=await i.json();console.log("Brand payment settings loaded:",e);const n=e.data||e;n.supported_currencies&&Array.isArray(n.supported_currencies)&&(Q(n.supported_currencies),n.supported_currencies.length>0&&(Z(n.supported_currencies[0]),J(n.supported_currencies[0]))),n.payment_settings&&Object.keys(n.payment_settings).length>0&&X({...q,...n.payment_settings,bankTransfer:n.payment_settings.bankTransfer||{},qrPayment:n.payment_settings.qrPayment||{}})}}catch(e){console.error("Error loading settings:",e)}finally{ne(!1)}},de=(e,n)=>{X(t=>({...t,stripe:{...t.stripe,[e]:n}})),se(!0)},ce=(e,n)=>{X(t=>({...t,paypal:{...t.paypal,[e]:n}})),se(!0)},pe=(e,n,t)=>{X(r=>({...r,bankTransfer:{...r.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...r.bankTransfer[e],[n]:t}}})),se(!0)},he=(e,n,t)=>{X(r=>({...r,qrPayment:{...r.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...r.qrPayment[e],[n]:t}}})),se(!0)},xe=e=>H.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},ge=e=>H.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""};return ee?(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(p,{children:[(0,c.jsx)(i.Ay,{title:"Payment Settings"}),(0,c.jsx)(h,{children:(0,c.jsx)("p",{children:"Loading..."})})]})}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(p,{children:[(0,c.jsx)(i.Ay,{title:"Payment Settings"}),(0,c.jsxs)(h,{children:[(0,c.jsxs)(x,{children:[(0,c.jsx)(g,{children:"Additional Charges"}),(0,c.jsx)(u,{children:"Configure additional charges for invoices. These will be applied to all invoices you generate. You can set up to 3 custom charge items (e.g., Tax, Service Charge, Processing Fee)."}),[0,1,2].map(e=>{var n;const t=(null===(n=H.additionalCharges)||void 0===n?void 0:n[e])||{enabled:!1,name:"",rate:0};return(0,c.jsxs)(k,{style:{marginBottom:"16px"},children:[(0,c.jsxs)(w,{children:[(0,c.jsxs)(F,{children:[(0,c.jsxs)(A,{children:["Charge Item ",e+1]}),(0,c.jsx)(S,{children:t.enabled&&t.name?`${t.name} (${t.rate}%)`:"Not configured"})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(E,{type:"checkbox",checked:t.enabled,onChange:n=>{const t=[...H.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],enabled:n.target.checked},X(e=>({...e,additionalCharges:t})),se(!0)}}),(0,c.jsx)(P,{})]})]}),t.enabled&&(0,c.jsx)(D,{children:(0,c.jsxs)(m,{children:[(0,c.jsxs)(b,{children:[(0,c.jsx)(y,{children:"Item Name"}),(0,c.jsx)(I,{type:"text",value:t.name,onChange:n=>{const t=[...H.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],name:n.target.value},X(e=>({...e,additionalCharges:t})),se(!0)},placeholder:"e.g., Tax, Service Charge, Processing Fee"}),(0,c.jsx)(T,{children:"Name displayed on invoices"})]}),(0,c.jsxs)(b,{children:[(0,c.jsx)(y,{children:"Rate (%)"}),(0,c.jsx)(I,{type:"number",min:"0",max:"100",step:"0.01",value:t.rate,onChange:n=>{const t=[...H.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],rate:parseFloat(n.target.value)||0},X(e=>({...e,additionalCharges:t})),se(!0)},placeholder:"0"}),(0,c.jsx)(T,{children:"Percentage to add to subtotal"})]})]})})]},e)})]}),(0,c.jsxs)(x,{children:[(0,c.jsx)(g,{children:"Currency Settings"}),(0,c.jsx)(u,{children:"Configure supported currencies for subscription plans and invoices."}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(b,{children:[(0,c.jsx)(y,{children:"Default Currency"}),(0,c.jsx)(j,{value:M,onChange:e=>{return n=e.target.value,J(n),void se(!0);var n},children:U.map(e=>{var n,r;return(0,c.jsxs)("option",{value:e,children:[null===(n=t[e])||void 0===n?void 0:n.symbol," ",e," - ",null===(r=t[e])||void 0===r?void 0:r.name]},e)})}),(0,c.jsx)(T,{children:"Used as default for new subscriptions and invoices"})]}),(0,c.jsxs)(b,{children:[(0,c.jsx)(y,{children:"Supported Currencies"}),(0,c.jsx)(f,{onClick:()=>{Y(U),W(!0)},children:U.length>0?U.map(e=>{var n;return(0,c.jsxs)(v,{children:[null===(n=t[e])||void 0===n?void 0:n.symbol," ",e]},e)}):(0,c.jsx)(C,{children:"Click to select currencies"})}),(0,c.jsx)(T,{children:"Currencies available for pricing plans and invoices"})]})]})]}),(0,c.jsxs)(x,{children:[(0,c.jsx)(g,{children:"Online Payment"}),(0,c.jsx)(u,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,c.jsxs)(k,{children:[(0,c.jsxs)(w,{children:[(0,c.jsxs)(F,{children:[(0,c.jsx)(A,{children:"Stripe"}),(0,c.jsx)(S,{children:"Credit/Debit Card payments"})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(E,{type:"checkbox",checked:H.stripe.enabled,onChange:e=>de("enabled",e.target.checked)}),(0,c.jsx)(P,{})]})]}),H.stripe.enabled&&(0,c.jsxs)(D,{children:[(0,c.jsxs)(b,{children:[(0,c.jsx)(y,{children:"Publishable Key"}),(0,c.jsx)(I,{type:"text",placeholder:"pk_live_...",value:H.stripe.publishableKey,onChange:e=>de("publishableKey",e.target.value)})]}),(0,c.jsxs)(b,{children:[(0,c.jsx)(y,{children:"Secret Key"}),(0,c.jsx)(I,{type:"password",placeholder:"sk_live_...",value:H.stripe.secretKey,onChange:e=>de("secretKey",e.target.value)})]}),(0,c.jsxs)(b,{children:[(0,c.jsx)(y,{children:"Webhook Secret"}),(0,c.jsx)(I,{type:"password",placeholder:"whsec_...",value:H.stripe.webhookSecret,onChange:e=>de("webhookSecret",e.target.value)})]}),(0,c.jsx)(b,{children:(0,c.jsxs)(z,{children:[(0,c.jsx)(N,{type:"checkbox",checked:H.stripe.autoCharge,onChange:e=>de("autoCharge",e.target.checked)}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,c.jsxs)(k,{children:[(0,c.jsxs)(w,{children:[(0,c.jsxs)(F,{children:[(0,c.jsx)(A,{children:"PayPal"}),(0,c.jsx)(S,{children:"PayPal account or card"})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(E,{type:"checkbox",checked:H.paypal.enabled,onChange:e=>ce("enabled",e.target.checked)}),(0,c.jsx)(P,{})]})]}),H.paypal.enabled&&(0,c.jsxs)(D,{children:[(0,c.jsxs)(b,{children:[(0,c.jsx)(y,{children:"Client ID"}),(0,c.jsx)(I,{type:"text",placeholder:"Enter PayPal Client ID",value:H.paypal.clientId,onChange:e=>ce("clientId",e.target.value)})]}),(0,c.jsxs)(b,{children:[(0,c.jsx)(y,{children:"Client Secret"}),(0,c.jsx)(I,{type:"password",placeholder:"Enter PayPal Client Secret",value:H.paypal.clientSecret,onChange:e=>ce("clientSecret",e.target.value)})]})]})]})]}),(0,c.jsxs)(x,{children:[(0,c.jsx)(g,{children:"Manual Payment"}),(0,c.jsx)(u,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===U.length?(0,c.jsx)(R,{children:"No currencies configured. Please add supported currencies above first."}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)($,{children:U.map(e=>{var n;return(0,c.jsxs)(_,{active:V===e,onClick:()=>Z(e),children:[null===(n=t[e])||void 0===n?void 0:n.symbol," ",e]},e)})}),(0,c.jsxs)(k,{children:[(0,c.jsxs)(w,{children:[(0,c.jsxs)(F,{children:[(0,c.jsxs)(A,{children:["Bank Transfer (",V,")"]}),(0,c.jsx)(S,{children:"Manual transfer with receipt upload"})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(E,{type:"checkbox",checked:xe(V).enabled,onChange:e=>pe(V,"enabled",e.target.checked)}),(0,c.jsx)(P,{})]})]}),xe(V).enabled&&(0,c.jsxs)(D,{children:[(0,c.jsxs)(b,{children:[(0,c.jsx)(y,{children:"Bank Name"}),(0,c.jsx)(I,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:xe(V).bankName,onChange:e=>pe(V,"bankName",e.target.value)})]}),(0,c.jsxs)(b,{children:[(0,c.jsx)(y,{children:"Account Number"}),(0,c.jsx)(I,{type:"text",placeholder:"Enter bank account number",value:xe(V).accountNumber,onChange:e=>pe(V,"accountNumber",e.target.value)})]}),(0,c.jsxs)(b,{children:[(0,c.jsx)(y,{children:"Account Name"}),(0,c.jsx)(I,{type:"text",placeholder:"Enter account holder name",value:xe(V).accountName,onChange:e=>pe(V,"accountName",e.target.value)})]})]})]}),(0,c.jsxs)(k,{children:[(0,c.jsxs)(w,{children:[(0,c.jsxs)(F,{children:[(0,c.jsxs)(A,{children:["QR Payment (",V,")"]}),(0,c.jsx)(S,{children:"Scan QR code to pay (DuitNow, KakaoPay, etc.)"})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(E,{type:"checkbox",checked:ge(V).enabled,onChange:e=>he(V,"enabled",e.target.checked)}),(0,c.jsx)(P,{})]})]}),ge(V).enabled&&(0,c.jsxs)(D,{children:[(0,c.jsx)(l.A,{value:ge(V).qrImage,onChange:e=>he(V,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${V} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,c.jsxs)(b,{style:{marginTop:"16px"},children:[(0,c.jsx)(y,{children:"Description"}),(0,c.jsx)(I,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:ge(V).qrDescription,onChange:e=>he(V,"qrDescription",e.target.value)}),(0,c.jsx)(T,{children:"Short description shown below the QR code"})]})]})]})]})]}),(0,c.jsx)(o.He,{children:(0,c.jsxs)(o.r6,{children:[ae&&(0,c.jsx)(o.Mo,{type:ae.type,children:ae.message}),(0,c.jsx)(o.yY,{onClick:async()=>{if(oe&&n){re(!0),ie(null);try{const e=localStorage.getItem("auth_token");console.log("Saving brand payment settings:",JSON.stringify(H,null,2));const t=await fetch(`/api/brands/${n}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_settings:H})}),r=await t.json();if(console.log("Server response:",t.status,r),!t.ok)throw new Error(r.error||r.details||"Failed to save");ie({type:"success",message:"Payment settings saved successfully!"}),se(!1)}catch(e){console.error("Error saving:",e),ie({type:"error",message:`Failed to save payment settings: ${e instanceof Error?e.message:"Unknown error"}`})}finally{re(!1)}}else console.log("No changes to save or no brand ID")},disabled:te||!oe,children:te?"Saving...":oe?"Save Changes":"Saved"})]})})]})]}),(0,c.jsxs)(s.aF,{isOpen:L,onClose:()=>W(!1),title:"Select Supported Currencies",size:"medium",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s.yl,{variant:"secondary",onClick:()=>W(!1),children:"Cancel"}),(0,c.jsxs)(s.yl,{variant:"primary",onClick:async()=>{if(n)try{const e=localStorage.getItem("auth_token");if(!(await fetch(`/api/brands/${n}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({supported_currencies:G})})).ok)throw new Error("Failed to update currencies");Q(G),W(!1),ie({type:"success",message:"Supported currencies updated"}),setTimeout(()=>ie(null),3e3),!G.includes(M)&&G.length>0&&J(G[0]),G.length>0&&!G.includes(V)&&Z(G[0])}catch(e){console.error("Error updating supported currencies:",e),ie({type:"error",message:"Failed to update currencies"})}},disabled:0===G.length,children:["Save (",G.length," selected)"]})]}),children:[(0,c.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select from the currencies enabled by System Administrator."}),0===K.length?(0,c.jsx)("p",{style:{color:"#DC2626",padding:"16px",background:"#FEF2F2",borderRadius:"8px"},children:"No currencies have been configured by System Administrator yet."}):(0,c.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:K.map(e=>{const n=t[e];return n?(0,c.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(G.includes(e)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:G.includes(e)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,c.jsx)("input",{type:"checkbox",checked:G.includes(e),onChange:()=>(e=>{Y(n=>n.includes(e)?n.filter(n=>n!==e):[...n,e])})(e),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{style:{fontWeight:500},children:[n.symbol," ",e]}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:n.name})]})]},e):null})})]})]})}},4877:(e,n,t)=>{t.d(n,{A:()=>f});var r=t(9950),a=t(4752),i=t(4414);const o=a.Ay.div`
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
`,j=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",f=e=>{let{value:n,onChange:t,label:a="Logo Upload",helpText:f="Upload an image for your logo",maxSize:v=2,previewSize:C=150,showRemoveButton:k=!0,changeButtonText:w="Change Image",removeButtonText:F="Remove Image",imageAltText:A="Uploaded"}=e;const[S,B]=(0,r.useState)(!1),[E,P]=(0,r.useState)(!1),D=(0,r.useRef)(null),I=(0,r.useRef)(null),T=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);P(!0);const n=new FileReader;n.onload=async e=>{var n;const r=new Image;r.onload=async()=>{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return void P(!1);const a=1200;let i=r.width,o=r.height;(i>a||o>a)&&(i>o?(o=o/i*a,i=a):(i=i/o*a,o=a)),e.width=i,e.height=o,n.drawImage(r,0,0,i,o);const s=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const n=localStorage.getItem("auth_token"),t=await fetch(`${j()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({image:e})}),r=await t.json();return r.success?r.data.original:(console.error("Image upload failed:",r.message),null)}catch(n){return console.error("Image upload error:",n),null}})(s);P(!1),l?t(l):alert("Failed to upload image. Please try again.")},r.src=null===(n=e.target)||void 0===n?void 0:n.result},n.readAsDataURL(e)},z=e=>{if(E)return;const n=e.target.files;n&&n.length>0&&T(n[0]),e.target.value=""};return(0,i.jsxs)(o,{children:[a&&(0,i.jsx)(s,{children:a}),f&&(0,i.jsx)(l,{children:f}),(0,i.jsxs)(d,{children:[(0,i.jsx)(c,{ref:I,isDragging:S,hasImage:!!n,isUploading:E,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),E||B(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===I.current&&B(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),B(!1),E)return;const n=e.dataTransfer.files;n&&n.length>0&&T(n[0])},onClick:()=>{var e;n||E||(null===(e=D.current)||void 0===e||e.click())},children:E?(0,i.jsxs)(p,{children:[(0,i.jsx)(y,{}),(0,i.jsx)(h,{style:{marginTop:"12px"},children:"Uploading..."})]}):n?(0,i.jsx)("img",{src:(N=n,N?N.startsWith("http")?N:N.startsWith("/uploads/")?`${j()}${N}`:N:""),alt:A}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:S?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(x,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),n&&!E&&(0,i.jsxs)(g,{children:[(0,i.jsxs)(u,{disabled:E,children:[w,(0,i.jsx)("input",{ref:D,type:"file",accept:"image/*",onChange:z,disabled:E})]}),k&&(0,i.jsx)(m,{onClick:()=>{t("")},disabled:E,children:F})]})]}),!n&&!E&&(0,i.jsx)(b,{ref:D,type:"file",accept:"image/*",onChange:z})]});var N}},8012:(e,n,t)=>{t.d(n,{Ay:()=>l});t(9950);var r=t(4752),a=t(4414);const i=r.Ay.div`
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