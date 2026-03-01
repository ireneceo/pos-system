"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3377],{3377:(e,r,n)=>{n.r(r),n.d(r,{default:()=>q});var t=n(8819),a=n(9950),o=n(4752),i=n(8012),s=n(2674),l=n(9610),d=n(4877),c=n(1367),p=n(4414);const h=o.Ay.div`
  min-height: 100vh;
`,x=o.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,g=o.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${t.w.colors.border};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,u=o.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${t.w.colors.secondary};
  margin-bottom: 8px;
`,m=o.Ay.p`
  color: ${t.w.colors.text.secondary};
  font-size: 14px;
  margin-bottom: 20px;
`,b=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${t.w.colors.text.dark};
  margin-bottom: 8px;
`,y=o.Ay.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
  }
`,j=o.Ay.div`
  padding: 12px 16px;
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  background: white;
  cursor: pointer;
  min-height: 46px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  &:hover {
    border-color: ${t.w.colors.primary};
  }
`,f=o.Ay.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`,v=o.Ay.span`
  color: ${t.w.colors.text.placeholder};
`,w=o.Ay.div`
  background: white;
  border: 1px solid ${t.w.colors.border};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`,k=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,C=o.Ay.div``,A=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,F=o.Ay.div`
  font-size: 13px;
  color: ${t.w.colors.text.secondary};
  margin-top: 2px;
`,S=o.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`,$=o.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${t.w.colors.primary};
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`,E=o.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${t.w.colors.border};
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
`,B=o.Ay.div`
  border-top: 1px solid ${t.w.colors.border};
  margin-top: 16px;
  padding-top: 16px;
`,P=o.Ay.input`
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
`,D=o.Ay.p`
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
`,T=o.Ay.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`,z=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid #E6EBF1;
  padding-bottom: 0;
  overflow-x: auto;
`,N=o.Ay.button`
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
`,_=o.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,R={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]},q=()=>{const{user:e}=(0,c.As)(),r=null===e||void 0===e?void 0:e.brand_id,[n,t]=(0,a.useState)({}),[o,q]=(0,a.useState)([]),[U,Q]=(0,a.useState)([]),[K,O]=(0,a.useState)("USD"),[M,J]=(0,a.useState)(!1),[L,W]=(0,a.useState)([]),[G,Y]=(0,a.useState)(R),[H,X]=(0,a.useState)(""),[V,Z]=(0,a.useState)(!0),[ee,re]=(0,a.useState)(!1),[ne,te]=(0,a.useState)(null),[ae,oe]=(0,a.useState)(!1);(0,a.useEffect)(()=>{ie()},[]),(0,a.useEffect)(()=>{o.length>0&&!H&&X(o[0])},[o,H]);const ie=async()=>{if(!r)return console.error("No brand ID available"),void Z(!1);try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[n,a,o]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch(`/api/brands/${r}/payment-settings`,{headers:e})]);if(n.ok){const e=await n.json();e.success&&e.currencies&&t(e.currencies)}if(a.ok){const e=await a.json();if(e.success&&e.data){const r=e.data.map(e=>e.code);Q(r)}}if(o.ok){const e=await o.json();console.log("Brand payment settings loaded:",e);const r=e.data||e;r.supported_currencies&&Array.isArray(r.supported_currencies)&&(q(r.supported_currencies),r.supported_currencies.length>0&&(X(r.supported_currencies[0]),O(r.supported_currencies[0]))),r.payment_settings&&Object.keys(r.payment_settings).length>0&&Y({...R,...r.payment_settings,bankTransfer:r.payment_settings.bankTransfer||{},qrPayment:r.payment_settings.qrPayment||{}})}}catch(e){console.error("Error loading settings:",e)}finally{Z(!1)}},se=(e,r)=>{Y(n=>({...n,stripe:{...n.stripe,[e]:r}})),oe(!0)},le=(e,r)=>{Y(n=>({...n,paypal:{...n.paypal,[e]:r}})),oe(!0)},de=(e,r,n)=>{Y(t=>({...t,bankTransfer:{...t.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...t.bankTransfer[e],[r]:n}}})),oe(!0)},ce=(e,r,n)=>{Y(t=>({...t,qrPayment:{...t.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...t.qrPayment[e],[r]:n}}})),oe(!0)},pe=e=>G.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},he=e=>G.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""};return V?(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(h,{children:[(0,p.jsx)(i.Ay,{title:"Payment Settings"}),(0,p.jsx)(x,{children:(0,p.jsx)("p",{children:"Loading..."})})]})}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(i.Ay,{title:"Payment Settings"}),(0,p.jsxs)(x,{children:[(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Additional Charges"}),(0,p.jsx)(m,{children:"Configure additional charges for invoices. These will be applied to all invoices you generate. You can set up to 3 custom charge items (e.g., Tax, Service Charge, Processing Fee)."}),[0,1,2].map(e=>{var r;const n=(null===(r=G.additionalCharges)||void 0===r?void 0:r[e])||{enabled:!1,name:"",rate:0};return(0,p.jsxs)(w,{style:{marginBottom:"16px"},children:[(0,p.jsxs)(k,{children:[(0,p.jsxs)(C,{children:[(0,p.jsxs)(A,{children:["Charge Item ",e+1]}),(0,p.jsx)(F,{children:n.enabled&&n.name?`${n.name} (${n.rate}%)`:"Not configured"})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)($,{type:"checkbox",checked:n.enabled,onChange:r=>{const n=[...G.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];n[e]={...n[e],enabled:r.target.checked},Y(e=>({...e,additionalCharges:n})),oe(!0)}}),(0,p.jsx)(E,{})]})]}),n.enabled&&(0,p.jsx)(B,{children:(0,p.jsxs)(s.fh,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(b,{children:"Item Name"}),(0,p.jsx)(P,{type:"text",value:n.name,onChange:r=>{const n=[...G.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];n[e]={...n[e],name:r.target.value},Y(e=>({...e,additionalCharges:n})),oe(!0)},placeholder:"e.g., Tax, Service Charge, Processing Fee"}),(0,p.jsx)(D,{children:"Name displayed on invoices"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(b,{children:"Rate (%)"}),(0,p.jsx)(P,{type:"number",min:"0",max:"100",step:"0.01",value:n.rate,onChange:r=>{const n=[...G.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];n[e]={...n[e],rate:parseFloat(r.target.value)||0},Y(e=>({...e,additionalCharges:n})),oe(!0)},placeholder:"0"}),(0,p.jsx)(D,{children:"Percentage to add to subtotal"})]})]})})]},e)})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Currency Settings"}),(0,p.jsx)(m,{children:"Configure supported currencies for subscription plans and invoices."}),(0,p.jsxs)(s.fh,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(b,{children:"Default Currency"}),(0,p.jsx)(y,{value:K,onChange:e=>{return r=e.target.value,O(r),void oe(!0);var r},children:o.map(e=>{var r,t;return(0,p.jsxs)("option",{value:e,children:[null===(r=n[e])||void 0===r?void 0:r.symbol," ",e," - ",null===(t=n[e])||void 0===t?void 0:t.name]},e)})}),(0,p.jsx)(D,{children:"Used as default for new subscriptions and invoices"})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(b,{children:"Supported Currencies"}),(0,p.jsx)(j,{onClick:()=>{W(o),J(!0)},children:o.length>0?o.map(e=>{var r;return(0,p.jsxs)(f,{children:[null===(r=n[e])||void 0===r?void 0:r.symbol," ",e]},e)}):(0,p.jsx)(v,{children:"Click to select currencies"})}),(0,p.jsx)(D,{children:"Currencies available for pricing plans and invoices"})]})]})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Online Payment"}),(0,p.jsx)(m,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(k,{children:[(0,p.jsxs)(C,{children:[(0,p.jsx)(A,{children:"Stripe"}),(0,p.jsx)(F,{children:"Credit/Debit Card payments"})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)($,{type:"checkbox",checked:G.stripe.enabled,onChange:e=>se("enabled",e.target.checked)}),(0,p.jsx)(E,{})]})]}),G.stripe.enabled&&(0,p.jsxs)(B,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(b,{children:"Publishable Key"}),(0,p.jsx)(P,{type:"text",placeholder:"pk_live_...",value:G.stripe.publishableKey,onChange:e=>se("publishableKey",e.target.value)})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(b,{children:"Secret Key"}),(0,p.jsx)(P,{type:"password",placeholder:"sk_live_...",value:G.stripe.secretKey,onChange:e=>se("secretKey",e.target.value)})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(b,{children:"Webhook Secret"}),(0,p.jsx)(P,{type:"password",placeholder:"whsec_...",value:G.stripe.webhookSecret,onChange:e=>se("webhookSecret",e.target.value)})]}),(0,p.jsx)(s.gE,{children:(0,p.jsxs)(I,{children:[(0,p.jsx)(T,{type:"checkbox",checked:G.stripe.autoCharge,onChange:e=>se("autoCharge",e.target.checked)}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(k,{children:[(0,p.jsxs)(C,{children:[(0,p.jsx)(A,{children:"PayPal"}),(0,p.jsx)(F,{children:"PayPal account or card"})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)($,{type:"checkbox",checked:G.paypal.enabled,onChange:e=>le("enabled",e.target.checked)}),(0,p.jsx)(E,{})]})]}),G.paypal.enabled&&(0,p.jsxs)(B,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(b,{children:"Client ID"}),(0,p.jsx)(P,{type:"text",placeholder:"Enter PayPal Client ID",value:G.paypal.clientId,onChange:e=>le("clientId",e.target.value)})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(b,{children:"Client Secret"}),(0,p.jsx)(P,{type:"password",placeholder:"Enter PayPal Client Secret",value:G.paypal.clientSecret,onChange:e=>le("clientSecret",e.target.value)})]})]})]})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(u,{children:"Manual Payment"}),(0,p.jsx)(m,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===o.length?(0,p.jsx)(_,{children:"No currencies configured. Please add supported currencies above first."}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(z,{children:o.map(e=>{var r;return(0,p.jsxs)(N,{active:H===e,onClick:()=>X(e),children:[null===(r=n[e])||void 0===r?void 0:r.symbol," ",e]},e)})}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(k,{children:[(0,p.jsxs)(C,{children:[(0,p.jsxs)(A,{children:["Bank Transfer (",H,")"]}),(0,p.jsx)(F,{children:"Manual transfer with receipt upload"})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)($,{type:"checkbox",checked:pe(H).enabled,onChange:e=>de(H,"enabled",e.target.checked)}),(0,p.jsx)(E,{})]})]}),pe(H).enabled&&(0,p.jsxs)(B,{children:[(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(b,{children:"Bank Name"}),(0,p.jsx)(P,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:pe(H).bankName,onChange:e=>de(H,"bankName",e.target.value)})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(b,{children:"Account Number"}),(0,p.jsx)(P,{type:"text",placeholder:"Enter bank account number",value:pe(H).accountNumber,onChange:e=>de(H,"accountNumber",e.target.value)})]}),(0,p.jsxs)(s.gE,{children:[(0,p.jsx)(b,{children:"Account Name"}),(0,p.jsx)(P,{type:"text",placeholder:"Enter account holder name",value:pe(H).accountName,onChange:e=>de(H,"accountName",e.target.value)})]})]})]}),(0,p.jsxs)(w,{children:[(0,p.jsxs)(k,{children:[(0,p.jsxs)(C,{children:[(0,p.jsxs)(A,{children:["QR Payment (",H,")"]}),(0,p.jsx)(F,{children:"Scan QR code to pay (DuitNow, KakaoPay, etc.)"})]}),(0,p.jsxs)(S,{children:[(0,p.jsx)($,{type:"checkbox",checked:he(H).enabled,onChange:e=>ce(H,"enabled",e.target.checked)}),(0,p.jsx)(E,{})]})]}),he(H).enabled&&(0,p.jsxs)(B,{children:[(0,p.jsx)(d.A,{value:he(H).qrImage,onChange:e=>ce(H,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${H} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,p.jsxs)(s.gE,{style:{marginTop:"16px"},children:[(0,p.jsx)(b,{children:"Description"}),(0,p.jsx)(P,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:he(H).qrDescription,onChange:e=>ce(H,"qrDescription",e.target.value)}),(0,p.jsx)(D,{children:"Short description shown below the QR code"})]})]})]})]})]}),(0,p.jsx)(s.He,{children:(0,p.jsxs)(s.r6,{children:[ne&&(0,p.jsx)(s.Mo,{type:ne.type,children:ne.message}),(0,p.jsx)(s.yY,{onClick:async()=>{if(ae&&r){re(!0),te(null);try{const e=localStorage.getItem("auth_token");console.log("Saving brand payment settings:",JSON.stringify(G,null,2));const n=await fetch(`/api/brands/${r}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_settings:G})}),t=await n.json();if(console.log("Server response:",n.status,t),!n.ok)throw new Error(t.error||t.details||"Failed to save");te({type:"success",message:"Payment settings saved successfully!"}),oe(!1)}catch(e){console.error("Error saving:",e),te({type:"error",message:`Failed to save payment settings: ${e instanceof Error?e.message:"Unknown error"}`})}finally{re(!1)}}else console.log("No changes to save or no brand ID")},disabled:ee||!ae,children:ee?"Saving...":ae?"Save Changes":"Saved"})]})})]})]}),(0,p.jsxs)(l.aF,{isOpen:M,onClose:()=>J(!1),title:"Select Supported Currencies",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l.yl,{variant:"secondary",onClick:()=>J(!1),children:"Cancel"}),(0,p.jsxs)(l.yl,{variant:"primary",onClick:async()=>{if(r)try{const e=localStorage.getItem("auth_token");if(!(await fetch(`/api/brands/${r}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({supported_currencies:L})})).ok)throw new Error("Failed to update currencies");q(L),J(!1),te({type:"success",message:"Supported currencies updated"}),setTimeout(()=>te(null),3e3),!L.includes(K)&&L.length>0&&O(L[0]),L.length>0&&!L.includes(H)&&X(L[0])}catch(e){console.error("Error updating supported currencies:",e),te({type:"error",message:"Failed to update currencies"})}},disabled:0===L.length,children:["Save (",L.length," selected)"]})]}),children:[(0,p.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select from the currencies enabled by System Administrator."}),0===U.length?(0,p.jsx)("p",{style:{color:"#DC2626",padding:"16px",background:"#FEF2F2",borderRadius:"8px"},children:"No currencies have been configured by System Administrator yet."}):(0,p.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:U.map(e=>{const r=n[e];return r?(0,p.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(L.includes(e)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:L.includes(e)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,p.jsx)("input",{type:"checkbox",checked:L.includes(e),onChange:()=>(e=>{W(r=>r.includes(e)?r.filter(r=>r!==e):[...r,e])})(e),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{style:{fontWeight:500},children:[r.symbol," ",e]}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:r.name})]})]},e):null})})]})]})}},4877:(e,r,n)=>{n.d(r,{A:()=>v});var t=n(8819),a=n(9950),o=n(4752),i=n(4414);const s=o.Ay.div`
  margin-bottom: 16px;
`,l=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,d=o.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,c=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,p=o.Ay.div`
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
`,h=o.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,x=o.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,g=o.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,u=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,m=o.Ay.label`
  padding: 8px 16px;
  border: 1px solid ${t.w.colors.primary};
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
`,b=o.Ay.button`
  padding: 8px 16px;
  border: 1px solid ${t.w.colors.danger};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${t.w.colors.danger};
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`,y=o.Ay.input`
  display: none;
`,j=o.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,f=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",v=e=>{let{value:r,onChange:n,label:t="Logo Upload",helpText:o="Upload an image for your logo",maxSize:v=2,previewSize:w=150,showRemoveButton:k=!0,changeButtonText:C="Change Image",removeButtonText:A="Remove Image",imageAltText:F="Uploaded"}=e;const[S,$]=(0,a.useState)(!1),[E,B]=(0,a.useState)(!1),P=(0,a.useRef)(null),D=(0,a.useRef)(null),I=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);B(!0);const r=new FileReader;r.onload=async e=>{var r;const t=new Image;t.onload=async()=>{const e=document.createElement("canvas"),r=e.getContext("2d");if(!r)return void B(!1);const a=1200;let o=t.width,i=t.height;(o>a||i>a)&&(o>i?(i=i/o*a,o=a):(o=o/i*a,i=a)),e.width=o,e.height=i,r.drawImage(t,0,0,o,i);const s=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const r=localStorage.getItem("auth_token"),n=await fetch(`${f()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({image:e})}),t=await n.json();return t.success?t.data.original:(console.error("Image upload failed:",t.message),null)}catch(r){return console.error("Image upload error:",r),null}})(s);B(!1),l?n(l):alert("Failed to upload image. Please try again.")},t.src=null===(r=e.target)||void 0===r?void 0:r.result},r.readAsDataURL(e)},T=e=>{if(E)return;const r=e.target.files;r&&r.length>0&&I(r[0]),e.target.value=""};return(0,i.jsxs)(s,{children:[t&&(0,i.jsx)(l,{children:t}),o&&(0,i.jsx)(d,{children:o}),(0,i.jsxs)(c,{children:[(0,i.jsx)(p,{ref:D,isDragging:S,hasImage:!!r,isUploading:E,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),E||$(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===D.current&&$(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),$(!1),E)return;const r=e.dataTransfer.files;r&&r.length>0&&I(r[0])},onClick:()=>{var e;r||E||(null===(e=P.current)||void 0===e||e.click())},children:E?(0,i.jsxs)(h,{children:[(0,i.jsx)(j,{}),(0,i.jsx)(x,{style:{marginTop:"12px"},children:"Uploading..."})]}):r?(0,i.jsx)("img",{src:(z=r,z?z.startsWith("http")?z:z.startsWith("/uploads/")?`${f()}${z}`:z:""),alt:F}):(0,i.jsxs)(h,{children:[(0,i.jsx)(x,{children:S?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(g,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),r&&!E&&(0,i.jsxs)(u,{children:[(0,i.jsxs)(m,{disabled:E,children:[C,(0,i.jsx)("input",{ref:P,type:"file",accept:"image/*",onChange:T,disabled:E})]}),k&&(0,i.jsx)(b,{onClick:()=>{n("")},disabled:E,children:A})]})]}),!r&&!E&&(0,i.jsx)(y,{ref:P,type:"file",accept:"image/*",onChange:T})]});var z}},8012:(e,r,n)=>{n.d(r,{Ay:()=>d});var t=n(8819),a=(n(9950),n(4752)),o=n(4414);const i=a.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${t.w.colors.border};
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
`,s=a.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${t.w.colors.secondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,l=a.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,d=e=>{let{title:r,children:n}=e;return(0,o.jsxs)(i,{children:[(0,o.jsx)(s,{children:r}),n&&(0,o.jsx)(l,{children:n})]})}}}]);