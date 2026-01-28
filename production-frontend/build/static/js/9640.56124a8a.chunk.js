"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9640],{4877:(e,n,t)=>{t.d(n,{A:()=>y});var r=t(9950),a=t(4752),i=t(4414);const o=a.Ay.div`
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
`,c=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,d=a.Ay.div`
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
`,y=e=>{let{value:n,onChange:t,label:a="Logo Upload",helpText:y="Upload an image for your logo",maxSize:j=2,previewSize:f=150,showRemoveButton:v=!0,changeButtonText:C="Change Image",removeButtonText:k="Remove Image",imageAltText:w="Uploaded"}=e;const[A,F]=(0,r.useState)(!1),S=(0,r.useRef)(null),B=(0,r.useRef)(null),E=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*j*1024)return void alert(`Image size should be less than ${j}MB`);const n=new FileReader;n.onload=e=>{var n;const r=new Image;r.onload=()=>{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return;const a=800;let i=r.width,o=r.height;(i>a||o>a)&&(i>o?(o=o/i*a,i=a):(i=i/o*a,o=a)),e.width=i,e.height=o,n.drawImage(r,0,0,i,o);const s=e.toDataURL("image/jpeg",.85);t(s)},r.src=null===(n=e.target)||void 0===n?void 0:n.result},n.readAsDataURL(e)},P=e=>{const n=e.target.files;n&&n.length>0&&E(n[0])};return(0,i.jsxs)(o,{children:[a&&(0,i.jsx)(s,{children:a}),y&&(0,i.jsx)(l,{children:y}),(0,i.jsxs)(c,{children:[(0,i.jsx)(d,{ref:B,isDragging:A,hasImage:!!n,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),F(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===B.current&&F(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),F(!1);const n=e.dataTransfer.files;n&&n.length>0&&E(n[0])},onClick:()=>{var e;n||(null===(e=S.current)||void 0===e||e.click())},children:n?(0,i.jsx)("img",{src:n,alt:w}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:A?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(x,{children:["PNG, JPG, GIF up to ",j,"MB"]})]})}),n&&(0,i.jsxs)(g,{children:[(0,i.jsxs)(u,{children:[C,(0,i.jsx)("input",{ref:S,type:"file",accept:"image/*",onChange:P})]}),v&&(0,i.jsx)(m,{onClick:()=>{t("")},children:k})]})]}),!n&&(0,i.jsx)(b,{ref:S,type:"file",accept:"image/*",onChange:P})]})}},8012:(e,n,t)=>{t.d(n,{Ay:()=>l});t(9950);var r=t(4752),a=t(4414);const i=r.Ay.div`
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
`,l=e=>{let{title:n,children:t}=e;return(0,a.jsxs)(i,{children:[(0,a.jsx)(o,{children:n}),t&&(0,a.jsx)(s,{children:t})]})}},9640:(e,n,t)=>{t.r(n),t.d(n,{default:()=>O});var r=t(9950),a=t(4752),i=t(3310),o=t(8012),s=t(2674),l=t(9610),c=t(4877),d=t(4414);const p=a.Ay.div`
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
`,A=a.Ay.div``,F=a.Ay.div`
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
`,T=a.Ay.input`
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
`,N=a.Ay.input`
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
`,U={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]},O=()=>{const[e,n]=(0,r.useState)({}),[t,a]=(0,r.useState)([]),[O,Q]=(0,r.useState)("USD"),[K,_]=(0,r.useState)(!1),[M,J]=(0,r.useState)([]),[L,G]=(0,r.useState)(U),[W,Y]=(0,r.useState)(""),[H,X]=(0,r.useState)(!0),[V,Z]=(0,r.useState)(!1),[ee,ne]=(0,r.useState)(null),[te,re]=(0,r.useState)(!1);(0,r.useEffect)(()=>{ae()},[]),(0,r.useEffect)(()=>{t.length>0&&!W&&Y(t[0])},[t,W]);const ae=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[t,r,i]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch("/api/admin/payment-settings",{headers:e})]);if(t.ok){const e=await t.json();e.success&&e.currencies&&(n(e.currencies),e.defaultCurrency&&Q(e.defaultCurrency))}if(r.ok){const e=await r.json();if(e.success&&e.data){const n=e.data.map(e=>e.code);a(n),n.length>0&&Y(n[0])}}if(i.ok){const e=await i.json();e&&Object.keys(e).length>0&&G({...U,...e,bankTransfer:e.bankTransfer||{},qrPayment:e.qrPayment||{}})}}catch(e){console.error("Error loading settings:",e)}finally{X(!1)}},ie=async e=>{try{const n=localStorage.getItem("auth_token");(await fetch("/api/currencies/default",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({defaultCurrency:e})})).ok&&(Q(e),ne({type:"success",message:"Default currency updated"}),setTimeout(()=>ne(null),3e3))}catch(n){console.error("Error updating default currency:",n),ne({type:"error",message:"Failed to update default currency"})}},oe=(e,n)=>{G(t=>({...t,stripe:{...t.stripe,[e]:n}})),re(!0)},se=(e,n)=>{G(t=>({...t,paypal:{...t.paypal,[e]:n}})),re(!0)},le=(e,n,t)=>{G(r=>({...r,bankTransfer:{...r.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...r.bankTransfer[e],[n]:t}}})),re(!0)},ce=(e,n,t)=>{G(r=>({...r,qrPayment:{...r.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...r.qrPayment[e],[n]:t}}})),re(!0)},de=e=>L.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},pe=e=>L.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""};return H?(0,d.jsx)(i.A,{children:(0,d.jsxs)(p,{children:[(0,d.jsx)(o.Ay,{title:"Payment Settings"}),(0,d.jsx)(h,{children:(0,d.jsx)("p",{children:"Loading..."})})]})}):(0,d.jsxs)(i.A,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(o.Ay,{title:"Payment Settings"}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(g,{children:"Additional Charges"}),(0,d.jsx)(u,{children:"Configure additional charges for invoices. These will be applied to all invoices you generate. You can set up to 3 custom charge items (e.g., Tax, Service Charge, Processing Fee)."}),[0,1,2].map(e=>{var n;const t=(null===(n=L.additionalCharges)||void 0===n?void 0:n[e])||{enabled:!1,name:"",rate:0};return(0,d.jsxs)(k,{style:{marginBottom:"16px"},children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(A,{children:[(0,d.jsxs)(F,{children:["Charge Item ",e+1]}),(0,d.jsx)(S,{children:t.enabled&&t.name?`${t.name} (${t.rate}%)`:"Not configured"})]}),(0,d.jsxs)(B,{children:[(0,d.jsx)(E,{type:"checkbox",checked:t.enabled,onChange:n=>{const t=[...L.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],enabled:n.target.checked},G(e=>({...e,additionalCharges:t})),re(!0)}}),(0,d.jsx)(P,{})]})]}),t.enabled&&(0,d.jsx)(D,{children:(0,d.jsxs)(m,{children:[(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{children:"Item Name"}),(0,d.jsx)(T,{type:"text",value:t.name,onChange:n=>{const t=[...L.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],name:n.target.value},G(e=>({...e,additionalCharges:t})),re(!0)},placeholder:"e.g., Tax, Service Charge, Processing Fee"}),(0,d.jsx)(z,{children:"Name displayed on invoices"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{children:"Rate (%)"}),(0,d.jsx)(T,{type:"number",min:"0",max:"100",step:"0.01",value:t.rate,onChange:n=>{const t=[...L.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],rate:parseFloat(n.target.value)||0},G(e=>({...e,additionalCharges:t})),re(!0)},placeholder:"0"}),(0,d.jsx)(z,{children:"Percentage to add to subtotal"})]})]})})]},e)})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(g,{children:"Currency Settings"}),(0,d.jsx)(u,{children:"Configure supported currencies for subscription plans and invoices."}),(0,d.jsxs)(m,{children:[(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{children:"Default Currency"}),(0,d.jsx)(j,{value:O,onChange:e=>ie(e.target.value),children:t.map(n=>{var t,r;return(0,d.jsxs)("option",{value:n,children:[null===(t=e[n])||void 0===t?void 0:t.symbol," ",n," - ",null===(r=e[n])||void 0===r?void 0:r.name]},n)})}),(0,d.jsx)(z,{children:"Used as default for new subscriptions and invoices"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{children:"Supported Currencies"}),(0,d.jsx)(f,{onClick:()=>{J(t),_(!0)},children:t.length>0?t.map(n=>{var t;return(0,d.jsxs)(v,{children:[null===(t=e[n])||void 0===t?void 0:t.symbol," ",n]},n)}):(0,d.jsx)(C,{children:"Click to select currencies"})}),(0,d.jsx)(z,{children:"Currencies available for pricing plans and invoices"})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(g,{children:"Online Payment"}),(0,d.jsx)(u,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,d.jsxs)(k,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:"Stripe"}),(0,d.jsx)(S,{children:"Credit/Debit Card payments"})]}),(0,d.jsxs)(B,{children:[(0,d.jsx)(E,{type:"checkbox",checked:L.stripe.enabled,onChange:e=>oe("enabled",e.target.checked)}),(0,d.jsx)(P,{})]})]}),L.stripe.enabled&&(0,d.jsxs)(D,{children:[(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{children:"Publishable Key"}),(0,d.jsx)(T,{type:"text",placeholder:"pk_live_...",value:L.stripe.publishableKey,onChange:e=>oe("publishableKey",e.target.value)})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{children:"Secret Key"}),(0,d.jsx)(T,{type:"password",placeholder:"sk_live_...",value:L.stripe.secretKey,onChange:e=>oe("secretKey",e.target.value)})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{children:"Webhook Secret"}),(0,d.jsx)(T,{type:"password",placeholder:"whsec_...",value:L.stripe.webhookSecret,onChange:e=>oe("webhookSecret",e.target.value)})]}),(0,d.jsx)(b,{children:(0,d.jsxs)(I,{children:[(0,d.jsx)(N,{type:"checkbox",checked:L.stripe.autoCharge,onChange:e=>oe("autoCharge",e.target.checked)}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,d.jsxs)(k,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(A,{children:[(0,d.jsx)(F,{children:"PayPal"}),(0,d.jsx)(S,{children:"PayPal account or card"})]}),(0,d.jsxs)(B,{children:[(0,d.jsx)(E,{type:"checkbox",checked:L.paypal.enabled,onChange:e=>se("enabled",e.target.checked)}),(0,d.jsx)(P,{})]})]}),L.paypal.enabled&&(0,d.jsxs)(D,{children:[(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{children:"Client ID"}),(0,d.jsx)(T,{type:"text",placeholder:"Enter PayPal Client ID",value:L.paypal.clientId,onChange:e=>se("clientId",e.target.value)})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{children:"Client Secret"}),(0,d.jsx)(T,{type:"password",placeholder:"Enter PayPal Client Secret",value:L.paypal.clientSecret,onChange:e=>se("clientSecret",e.target.value)})]})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(g,{children:"Manual Payment"}),(0,d.jsx)(u,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===t.length?(0,d.jsx)($,{children:"No currencies configured. Please add supported currencies above first."}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(R,{children:t.map(n=>{var t;return(0,d.jsxs)(q,{active:W===n,onClick:()=>Y(n),children:[null===(t=e[n])||void 0===t?void 0:t.symbol," ",n]},n)})}),(0,d.jsxs)(k,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(A,{children:[(0,d.jsxs)(F,{children:["Bank Transfer (",W,")"]}),(0,d.jsx)(S,{children:"Manual transfer with receipt upload"})]}),(0,d.jsxs)(B,{children:[(0,d.jsx)(E,{type:"checkbox",checked:de(W).enabled,onChange:e=>le(W,"enabled",e.target.checked)}),(0,d.jsx)(P,{})]})]}),de(W).enabled&&(0,d.jsxs)(D,{children:[(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{children:"Bank Name"}),(0,d.jsx)(T,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:de(W).bankName,onChange:e=>le(W,"bankName",e.target.value)})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{children:"Account Number"}),(0,d.jsx)(T,{type:"text",placeholder:"Enter bank account number",value:de(W).accountNumber,onChange:e=>le(W,"accountNumber",e.target.value)})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(y,{children:"Account Name"}),(0,d.jsx)(T,{type:"text",placeholder:"Enter account holder name",value:de(W).accountName,onChange:e=>le(W,"accountName",e.target.value)})]})]})]}),(0,d.jsxs)(k,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(A,{children:[(0,d.jsxs)(F,{children:["QR Payment (",W,")"]}),(0,d.jsx)(S,{children:"Scan QR code to pay (DuitNow, KakaoPay, etc.)"})]}),(0,d.jsxs)(B,{children:[(0,d.jsx)(E,{type:"checkbox",checked:pe(W).enabled,onChange:e=>ce(W,"enabled",e.target.checked)}),(0,d.jsx)(P,{})]})]}),pe(W).enabled&&(0,d.jsxs)(D,{children:[(0,d.jsx)(c.A,{value:pe(W).qrImage,onChange:e=>ce(W,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${W} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,d.jsxs)(b,{style:{marginTop:"16px"},children:[(0,d.jsx)(y,{children:"Description"}),(0,d.jsx)(T,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:pe(W).qrDescription,onChange:e=>ce(W,"qrDescription",e.target.value)}),(0,d.jsx)(z,{children:"Short description shown below the QR code"})]})]})]})]})]}),(0,d.jsx)(s.He,{children:(0,d.jsxs)(s.r6,{children:[ee&&(0,d.jsx)(s.Mo,{type:ee.type,children:ee.message}),(0,d.jsx)(s.yY,{onClick:async()=>{if(te){Z(!0),ne(null);try{const e=localStorage.getItem("auth_token");console.log("Saving payment settings:",JSON.stringify(L,null,2));const n=await fetch("/api/admin/payment-settings",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(L)}),t=await n.json();if(console.log("Server response:",n.status,t),!n.ok)throw new Error(t.error||t.details||"Failed to save");ne({type:"success",message:"Payment settings saved successfully!"}),re(!1)}catch(e){console.error("Error saving:",e),ne({type:"error",message:`Failed to save payment settings: ${e instanceof Error?e.message:"Unknown error"}`})}finally{Z(!1)}}else console.log("No changes to save")},disabled:V||!te,children:V?"Saving...":te?"Save Changes":"Saved"})]})})]})]}),(0,d.jsxs)(l.aF,{isOpen:K,onClose:()=>_(!1),title:"Select Supported Currencies",size:"medium",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.yl,{variant:"secondary",onClick:()=>_(!1),children:"Cancel"}),(0,d.jsxs)(l.yl,{variant:"primary",onClick:async()=>{try{const e=localStorage.getItem("auth_token");(await fetch("/api/currencies/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currencies:M})})).ok&&(a(M),_(!1),ne({type:"success",message:"Supported currencies updated"}),setTimeout(()=>ne(null),3e3),!M.includes(O)&&M.length>0&&await ie(M[0]),M.length>0&&!M.includes(W)&&Y(M[0]))}catch(e){console.error("Error updating supported currencies:",e),ne({type:"error",message:"Failed to update currencies"})}},disabled:0===M.length,children:["Save (",M.length," selected)"]})]}),children:[(0,d.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the currencies you want to support for subscription plans and invoices."}),(0,d.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(e).map(e=>{let[n,t]=e;return(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(M.includes(n)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:M.includes(n)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,d.jsx)("input",{type:"checkbox",checked:M.includes(n),onChange:()=>(e=>{J(n=>n.includes(e)?n.filter(n=>n!==e):[...n,e])})(n),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{style:{fontWeight:500},children:[t.symbol," ",n]}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:t.name})]})]},n)})})]})]})}}}]);