"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9640],{4877:(e,t,n)=>{n.d(t,{A:()=>f});var r=n(9950),a=n(4752),i=n(4414);const o=a.Ay.div`
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
`,y=a.Ay.input`
  display: none;
`,b=a.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,j=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",f=e=>{let{value:t,onChange:n,label:a="Logo Upload",helpText:f="Upload an image for your logo",maxSize:v=2,previewSize:k=150,showRemoveButton:C=!0,changeButtonText:w="Change Image",removeButtonText:A="Remove Image",imageAltText:F="Uploaded"}=e;const[S,B]=(0,r.useState)(!1),[E,P]=(0,r.useState)(!1),T=(0,r.useRef)(null),D=(0,r.useRef)(null),z=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);P(!0);const t=new FileReader;t.onload=async e=>{var t;const r=new Image;r.onload=async()=>{const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return void P(!1);const a=1200;let i=r.width,o=r.height;(i>a||o>a)&&(i>o?(o=o/i*a,i=a):(i=i/o*a,o=a)),e.width=i,e.height=o,t.drawImage(r,0,0,i,o);const s=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const t=localStorage.getItem("auth_token"),n=await fetch(`${j()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),r=await n.json();return r.success?r.data.original:(console.error("Image upload failed:",r.message),null)}catch(t){return console.error("Image upload error:",t),null}})(s);P(!1),l?n(l):alert("Failed to upload image. Please try again.")},r.src=null===(t=e.target)||void 0===t?void 0:t.result},t.readAsDataURL(e)},I=e=>{if(E)return;const t=e.target.files;t&&t.length>0&&z(t[0]),e.target.value=""};return(0,i.jsxs)(o,{children:[a&&(0,i.jsx)(s,{children:a}),f&&(0,i.jsx)(l,{children:f}),(0,i.jsxs)(d,{children:[(0,i.jsx)(c,{ref:D,isDragging:S,hasImage:!!t,isUploading:E,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),E||B(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===D.current&&B(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),B(!1),E)return;const t=e.dataTransfer.files;t&&t.length>0&&z(t[0])},onClick:()=>{var e;t||E||(null===(e=T.current)||void 0===e||e.click())},children:E?(0,i.jsxs)(p,{children:[(0,i.jsx)(b,{}),(0,i.jsx)(h,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,i.jsx)("img",{src:(N=t,N?N.startsWith("http")?N:N.startsWith("/uploads/")?`${j()}${N}`:N:""),alt:F}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:S?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(x,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),t&&!E&&(0,i.jsxs)(g,{children:[(0,i.jsxs)(u,{disabled:E,children:[w,(0,i.jsx)("input",{ref:T,type:"file",accept:"image/*",onChange:I,disabled:E})]}),C&&(0,i.jsx)(m,{onClick:()=>{n("")},disabled:E,children:A})]})]}),!t&&!E&&(0,i.jsx)(y,{ref:T,type:"file",accept:"image/*",onChange:I})]});var N}},8012:(e,t,n)=>{n.d(t,{Ay:()=>l});n(9950);var r=n(4752),a=n(4414);const i=r.Ay.div`
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
`,l=e=>{let{title:t,children:n}=e;return(0,a.jsxs)(i,{children:[(0,a.jsx)(o,{children:t}),n&&(0,a.jsx)(s,{children:n})]})}},9640:(e,t,n)=>{n.r(t),n.d(t,{default:()=>U});var r=n(9950),a=n(4752),i=n(8012),o=n(8409),s=n(9610),l=n(4877),d=n(4414);const c=a.Ay.div`
  min-height: 100vh;
`,p=a.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,h=a.Ay.div`
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
`,u=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,m=a.Ay.div`
  margin-bottom: 16px;
`,y=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,b=a.Ay.select`
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
`,j=a.Ay.div`
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
`,f=a.Ay.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`,v=a.Ay.span`
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
`,w=a.Ay.div``,A=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,F=a.Ay.div`
  font-size: 13px;
  color: #6B7C93;
  margin-top: 2px;
`,S=a.Ay.label`
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
`,P=a.Ay.div`
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
`,D=a.Ay.p`
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
`,I=a.Ay.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`,N=a.Ay.div`
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
`,R=a.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,q={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:{}},U=()=>{const[e,t]=(0,r.useState)({}),[n,a]=(0,r.useState)([]),[U,O]=(0,r.useState)("USD"),[Q,_]=(0,r.useState)(!1),[K,M]=(0,r.useState)([]),[J,L]=(0,r.useState)(q),[W,G]=(0,r.useState)(""),[H,Y]=(0,r.useState)(!0),[V,X]=(0,r.useState)(!1),[Z,ee]=(0,r.useState)(null),[te,ne]=(0,r.useState)(!1);(0,r.useEffect)(()=>{re()},[]),(0,r.useEffect)(()=>{n.length>0&&!W&&G(n[0])},[n,W]);const re=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[n,r,i]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch("/api/admin/payment-settings",{headers:e})]);if(n.ok){const e=await n.json();e.success&&e.currencies&&(t(e.currencies),e.defaultCurrency&&O(e.defaultCurrency))}if(r.ok){const e=await r.json();if(e.success&&e.data){const t=e.data.map(e=>e.code);a(t),t.length>0&&G(t[0])}}if(i.ok){const e=await i.json();if(e&&Object.keys(e).length>0){let t=e.additionalCharges||{};Array.isArray(t)&&(t={}),L({...q,...e,bankTransfer:e.bankTransfer||{},qrPayment:e.qrPayment||{},additionalCharges:t})}}}catch(e){console.error("Error loading settings:",e)}finally{Y(!1)}},ae=async e=>{try{const t=localStorage.getItem("auth_token");(await fetch("/api/currencies/default",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({defaultCurrency:e})})).ok&&(O(e),ee({type:"success",message:"Default currency updated"}),setTimeout(()=>ee(null),3e3))}catch(t){console.error("Error updating default currency:",t),ee({type:"error",message:"Failed to update default currency"})}},ie=(e,t)=>{L(n=>({...n,stripe:{...n.stripe,[e]:t}})),ne(!0)},oe=(e,t)=>{L(n=>({...n,paypal:{...n.paypal,[e]:t}})),ne(!0)},se=(e,t,n)=>{L(r=>({...r,bankTransfer:{...r.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...r.bankTransfer[e],[t]:n}}})),ne(!0)},le=(e,t,n)=>{L(r=>({...r,qrPayment:{...r.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...r.qrPayment[e],[t]:n}}})),ne(!0)},de=e=>J.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},ce=e=>J.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""},pe=[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}],he=e=>J.additionalCharges[e]||pe,xe=(e,t,n,r)=>{const a=[...he(e)];a[t]={...a[t],[n]:r},L(t=>({...t,additionalCharges:{...t.additionalCharges,[e]:a}})),ne(!0)};return H?(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsx)(i.Ay,{title:"Payment Settings"}),(0,d.jsx)(p,{children:(0,d.jsx)("p",{children:"Loading..."})})]})}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(i.Ay,{title:"Payment Settings"}),(0,d.jsxs)(p,{children:[(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{children:"Currency Settings"}),(0,d.jsx)(g,{children:"Configure supported currencies for subscription plans and invoices."}),(0,d.jsxs)(u,{children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Default Currency"}),(0,d.jsx)(b,{value:U,onChange:e=>ae(e.target.value),children:n.map(t=>{var n,r;return(0,d.jsxs)("option",{value:t,children:[null===(n=e[t])||void 0===n?void 0:n.symbol," ",t," - ",null===(r=e[t])||void 0===r?void 0:r.name]},t)})}),(0,d.jsx)(D,{children:"Used as default for new subscriptions and invoices"})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Supported Currencies"}),(0,d.jsx)(j,{onClick:()=>{M(n),_(!0)},children:n.length>0?n.map(t=>{var n;return(0,d.jsxs)(f,{children:[null===(n=e[t])||void 0===n?void 0:n.symbol," ",t]},t)}):(0,d.jsx)(v,{children:"Click to select currencies"})}),(0,d.jsx)(D,{children:"Currencies available for pricing plans and invoices"})]})]})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{children:"Online Payment"}),(0,d.jsx)(g,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(A,{children:"Stripe"}),(0,d.jsx)(F,{children:"Credit/Debit Card payments"})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(B,{type:"checkbox",checked:J.stripe.enabled,onChange:e=>ie("enabled",e.target.checked)}),(0,d.jsx)(E,{})]})]}),J.stripe.enabled&&(0,d.jsxs)(P,{children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Publishable Key"}),(0,d.jsx)(T,{type:"text",placeholder:"pk_live_...",value:J.stripe.publishableKey,onChange:e=>ie("publishableKey",e.target.value)})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Secret Key"}),(0,d.jsx)(T,{type:"password",placeholder:"sk_live_...",value:J.stripe.secretKey,onChange:e=>ie("secretKey",e.target.value)})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Webhook Secret"}),(0,d.jsx)(T,{type:"password",placeholder:"whsec_...",value:J.stripe.webhookSecret,onChange:e=>ie("webhookSecret",e.target.value)})]}),(0,d.jsx)(m,{children:(0,d.jsxs)(z,{children:[(0,d.jsx)(I,{type:"checkbox",checked:J.stripe.autoCharge,onChange:e=>ie("autoCharge",e.target.checked)}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(A,{children:"PayPal"}),(0,d.jsx)(F,{children:"PayPal account or card"})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(B,{type:"checkbox",checked:J.paypal.enabled,onChange:e=>oe("enabled",e.target.checked)}),(0,d.jsx)(E,{})]})]}),J.paypal.enabled&&(0,d.jsxs)(P,{children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Client ID"}),(0,d.jsx)(T,{type:"text",placeholder:"Enter PayPal Client ID",value:J.paypal.clientId,onChange:e=>oe("clientId",e.target.value)})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Client Secret"}),(0,d.jsx)(T,{type:"password",placeholder:"Enter PayPal Client Secret",value:J.paypal.clientSecret,onChange:e=>oe("clientSecret",e.target.value)})]})]})]})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{children:"Manual Payment"}),(0,d.jsx)(g,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===n.length?(0,d.jsx)(R,{children:"No currencies configured. Please add supported currencies above first."}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(N,{children:n.map(t=>{var n;return(0,d.jsxs)($,{active:W===t,onClick:()=>G(t),children:[null===(n=e[t])||void 0===n?void 0:n.symbol," ",t]},t)})}),(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(A,{children:["Bank Transfer (",W,")"]}),(0,d.jsx)(F,{children:"Manual transfer with receipt upload"})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(B,{type:"checkbox",checked:de(W).enabled,onChange:e=>se(W,"enabled",e.target.checked)}),(0,d.jsx)(E,{})]})]}),de(W).enabled&&(0,d.jsxs)(P,{children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Bank Name"}),(0,d.jsx)(T,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:de(W).bankName,onChange:e=>se(W,"bankName",e.target.value)})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Account Number"}),(0,d.jsx)(T,{type:"text",placeholder:"Enter bank account number",value:de(W).accountNumber,onChange:e=>se(W,"accountNumber",e.target.value)})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Account Name"}),(0,d.jsx)(T,{type:"text",placeholder:"Enter account holder name",value:de(W).accountName,onChange:e=>se(W,"accountName",e.target.value)})]})]})]}),(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(A,{children:["QR Payment (",W,")"]}),(0,d.jsx)(F,{children:"Scan QR code to pay (DuitNow, KakaoPay, etc.)"})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(B,{type:"checkbox",checked:ce(W).enabled,onChange:e=>le(W,"enabled",e.target.checked)}),(0,d.jsx)(E,{})]})]}),ce(W).enabled&&(0,d.jsxs)(P,{children:[(0,d.jsx)(l.A,{value:ce(W).qrImage,onChange:e=>le(W,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${W} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,d.jsxs)(m,{style:{marginTop:"16px"},children:[(0,d.jsx)(y,{children:"Description"}),(0,d.jsx)(T,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:ce(W).qrDescription,onChange:e=>le(W,"qrDescription",e.target.value)}),(0,d.jsx)(D,{children:"Short description shown below the QR code"})]})]})]}),(0,d.jsxs)(x,{style:{fontSize:"15px",marginTop:"24px",marginBottom:"8px"},children:["Additional Charges (",W,")"]}),(0,d.jsxs)(g,{style:{marginBottom:"12px"},children:["Configure tax, service charge, etc. for ",W," invoices. Up to 3 items."]}),[0,1,2].map(e=>{const t=he(W)[e]||{enabled:!1,name:"",rate:0};return(0,d.jsxs)(k,{style:{marginBottom:"12px"},children:[(0,d.jsxs)(C,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(A,{children:["Charge Item ",e+1]}),(0,d.jsx)(F,{children:t.enabled&&t.name?`${t.name} (${t.rate}%)`:"Not configured"})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(B,{type:"checkbox",checked:t.enabled,onChange:t=>xe(W,e,"enabled",t.target.checked)}),(0,d.jsx)(E,{})]})]}),t.enabled&&(0,d.jsx)(P,{children:(0,d.jsxs)(u,{children:[(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Item Name"}),(0,d.jsx)(T,{type:"text",value:t.name,onChange:t=>xe(W,e,"name",t.target.value),placeholder:"e.g., SST, VAT, Service Charge"}),(0,d.jsx)(D,{children:"Name displayed on invoices"})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Rate (%)"}),(0,d.jsx)(T,{type:"number",min:"0",max:"100",step:"0.01",value:t.rate,onChange:t=>xe(W,e,"rate",parseFloat(t.target.value)||0),placeholder:"0"}),(0,d.jsx)(D,{children:"Percentage to add to subtotal"})]})]})})]},`charge-${W}-${e}`)})]})]}),(0,d.jsx)(o.He,{children:(0,d.jsxs)(o.r6,{children:[Z&&(0,d.jsx)(o.Mo,{type:Z.type,children:Z.message}),(0,d.jsx)(o.yY,{onClick:async()=>{if(te){X(!0),ee(null);try{const e=localStorage.getItem("auth_token");console.log("Saving payment settings:",JSON.stringify(J,null,2));const t=await fetch("/api/admin/payment-settings",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(J)}),n=await t.json();if(console.log("Server response:",t.status,n),!t.ok)throw new Error(n.error||n.details||"Failed to save");ee({type:"success",message:"Payment settings saved successfully!"}),ne(!1)}catch(e){console.error("Error saving:",e),ee({type:"error",message:`Failed to save payment settings: ${e instanceof Error?e.message:"Unknown error"}`})}finally{X(!1)}}else console.log("No changes to save")},disabled:V||!te,children:V?"Saving...":te?"Save Changes":"Saved"})]})})]})]}),(0,d.jsxs)(s.aF,{isOpen:Q,onClose:()=>_(!1),title:"Select Supported Currencies",size:"medium",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(s.yl,{variant:"secondary",onClick:()=>_(!1),children:"Cancel"}),(0,d.jsxs)(s.yl,{variant:"primary",onClick:async()=>{try{const e=localStorage.getItem("auth_token");(await fetch("/api/currencies/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currencies:K})})).ok&&(a(K),_(!1),ee({type:"success",message:"Supported currencies updated"}),setTimeout(()=>ee(null),3e3),!K.includes(U)&&K.length>0&&await ae(K[0]),K.length>0&&!K.includes(W)&&G(K[0]))}catch(e){console.error("Error updating supported currencies:",e),ee({type:"error",message:"Failed to update currencies"})}},disabled:0===K.length,children:["Save (",K.length," selected)"]})]}),children:[(0,d.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the currencies you want to support for subscription plans and invoices."}),(0,d.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(e).map(e=>{let[t,n]=e;return(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(K.includes(t)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:K.includes(t)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,d.jsx)("input",{type:"checkbox",checked:K.includes(t),onChange:()=>(e=>{M(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(t),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{style:{fontWeight:500},children:[n.symbol," ",t]}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:n.name})]})]},t)})})]})]})}}}]);