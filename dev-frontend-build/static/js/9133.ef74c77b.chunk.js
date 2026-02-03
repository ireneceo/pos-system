"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9133],{4877:(e,t,n)=>{n.d(t,{A:()=>f});var r=n(9950),a=n(4752),i=n(4414);const o=a.Ay.div`
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
`,u=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=a.Ay.label`
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
`,j=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",f=e=>{let{value:t,onChange:n,label:a="Logo Upload",helpText:f="Upload an image for your logo",maxSize:v=2,previewSize:k=150,showRemoveButton:w=!0,changeButtonText:C="Change Image",removeButtonText:A="Remove Image",imageAltText:F="Uploaded"}=e;const[S,B]=(0,r.useState)(!1),[T,E]=(0,r.useState)(!1),P=(0,r.useRef)(null),D=(0,r.useRef)(null),z=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);E(!0);const t=new FileReader;t.onload=async e=>{var t;const r=new Image;r.onload=async()=>{const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return void E(!1);const a=1200;let i=r.width,o=r.height;(i>a||o>a)&&(i>o?(o=o/i*a,i=a):(i=i/o*a,o=a)),e.width=i,e.height=o,t.drawImage(r,0,0,i,o);const s=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const t=localStorage.getItem("auth_token"),n=await fetch(`${j()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),r=await n.json();return r.success?r.data.original:(console.error("Image upload failed:",r.message),null)}catch(t){return console.error("Image upload error:",t),null}})(s);E(!1),l?n(l):alert("Failed to upload image. Please try again.")},r.src=null===(t=e.target)||void 0===t?void 0:t.result},t.readAsDataURL(e)},I=e=>{if(T)return;const t=e.target.files;t&&t.length>0&&z(t[0]),e.target.value=""};return(0,i.jsxs)(o,{children:[a&&(0,i.jsx)(s,{children:a}),f&&(0,i.jsx)(l,{children:f}),(0,i.jsxs)(d,{children:[(0,i.jsx)(c,{ref:D,isDragging:S,hasImage:!!t,isUploading:T,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),T||B(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===D.current&&B(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),B(!1),T)return;const t=e.dataTransfer.files;t&&t.length>0&&z(t[0])},onClick:()=>{var e;t||T||(null===(e=P.current)||void 0===e||e.click())},children:T?(0,i.jsxs)(p,{children:[(0,i.jsx)(b,{}),(0,i.jsx)(h,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,i.jsx)("img",{src:(N=t,N?N.startsWith("http")?N:N.startsWith("/uploads/")?`${j()}${N}`:N:""),alt:F}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:S?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(x,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),t&&!T&&(0,i.jsxs)(u,{children:[(0,i.jsxs)(g,{disabled:T,children:[C,(0,i.jsx)("input",{ref:P,type:"file",accept:"image/*",onChange:I,disabled:T})]}),w&&(0,i.jsx)(m,{onClick:()=>{n("")},disabled:T,children:A})]})]}),!t&&!T&&(0,i.jsx)(y,{ref:P,type:"file",accept:"image/*",onChange:I})]});var N}},8012:(e,t,n)=>{n.d(t,{Ay:()=>l});n(9950);var r=n(4752),a=n(4414);const i=r.Ay.div`
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
`,l=e=>{let{title:t,children:n}=e;return(0,a.jsxs)(i,{children:[(0,a.jsx)(o,{children:t}),n&&(0,a.jsx)(s,{children:n})]})}},9133:(e,t,n)=>{n.r(t),n.d(t,{default:()=>O});var r=n(9950),a=n(4752),i=n(3310),o=n(8012),s=n(2674),l=n(9610),d=n(4877),c=n(4414);const p=a.Ay.div`
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
`,u=a.Ay.h2`
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
`,k=a.Ay.span`
  color: #9CA3AF;
`,w=a.Ay.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`,C=a.Ay.div`
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
`,D=a.Ay.input`
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
`,$=a.Ay.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  border-bottom: 1px solid #E6EBF1;
  padding-bottom: 0;
  overflow-x: auto;
`,R=a.Ay.button`
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
`,U={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},tax:{enabled:!0,rate:6,name:"Tax"}},O=()=>{var e,t,n,a,O,Q;const[_,K]=(0,r.useState)({}),[M,J]=(0,r.useState)([]),[G,L]=(0,r.useState)("USD"),[W,H]=(0,r.useState)(!1),[V,Y]=(0,r.useState)([]),[X,Z]=(0,r.useState)(U),[ee,te]=(0,r.useState)(""),[ne,re]=(0,r.useState)(!0),[ae,ie]=(0,r.useState)(!1),[oe,se]=(0,r.useState)(null),[le,de]=(0,r.useState)(!1);(0,r.useEffect)(()=>{ce()},[]),(0,r.useEffect)(()=>{M.length>0&&!ee&&te(M[0])},[M,ee]);const ce=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[t,n,r]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch("/api/admin/payment-settings",{headers:e})]);if(t.ok){const e=await t.json();e.success&&e.currencies&&(K(e.currencies),e.defaultCurrency&&L(e.defaultCurrency))}if(n.ok){const e=await n.json();if(e.success&&e.data){const t=e.data.map(e=>e.code);J(t),t.length>0&&te(t[0])}}if(r.ok){const e=await r.json();e&&Object.keys(e).length>0&&Z({...U,...e,bankTransfer:e.bankTransfer||{},qrPayment:e.qrPayment||{}})}}catch(e){console.error("Error loading settings:",e)}finally{re(!1)}},pe=async e=>{try{const t=localStorage.getItem("auth_token");(await fetch("/api/currencies/default",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({defaultCurrency:e})})).ok&&(L(e),se({type:"success",message:"Default currency updated"}),setTimeout(()=>se(null),3e3))}catch(t){console.error("Error updating default currency:",t),se({type:"error",message:"Failed to update default currency"})}},he=(e,t)=>{Z(n=>({...n,stripe:{...n.stripe,[e]:t}})),de(!0)},xe=(e,t)=>{Z(n=>({...n,paypal:{...n.paypal,[e]:t}})),de(!0)},ue=(e,t,n)=>{Z(r=>({...r,bankTransfer:{...r.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...r.bankTransfer[e],[t]:n}}})),de(!0)},ge=(e,t,n)=>{Z(r=>({...r,qrPayment:{...r.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...r.qrPayment[e],[t]:n}}})),de(!0)},me=e=>X.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},ye=e=>X.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""};return ne?(0,c.jsx)(i.A,{children:(0,c.jsxs)(p,{children:[(0,c.jsx)(o.Ay,{title:"Payment Settings"}),(0,c.jsx)(h,{children:(0,c.jsx)("p",{children:"Loading..."})})]})}):(0,c.jsxs)(i.A,{children:[(0,c.jsxs)(p,{children:[(0,c.jsx)(o.Ay,{title:"Payment Settings"}),(0,c.jsxs)(h,{children:[(0,c.jsxs)(x,{children:[(0,c.jsx)(u,{children:"Tax Settings"}),(0,c.jsx)(g,{children:"Configure tax rate for invoices. This tax will be applied to all invoices you generate."}),(0,c.jsxs)(w,{children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(A,{children:[(0,c.jsx)(F,{children:"Enable Tax"}),(0,c.jsx)(S,{children:"Apply tax to invoices"})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(T,{type:"checkbox",checked:null===(e=null===(t=X.tax)||void 0===t?void 0:t.enabled)||void 0===e||e,onChange:e=>{Z(t=>({...t,tax:{...t.tax,enabled:e.target.checked}})),de(!0)}}),(0,c.jsx)(E,{})]})]}),(null===(n=X.tax)||void 0===n?void 0:n.enabled)&&(0,c.jsx)(P,{children:(0,c.jsxs)(m,{children:[(0,c.jsxs)(y,{children:[(0,c.jsx)(b,{children:"Tax Name"}),(0,c.jsx)(D,{type:"text",value:(null===(a=X.tax)||void 0===a?void 0:a.name)||"Tax",onChange:e=>{Z(t=>({...t,tax:{...t.tax,name:e.target.value}})),de(!0)},placeholder:"e.g., VAT, GST, Sales Tax"}),(0,c.jsx)(z,{children:"Name displayed on invoices (e.g., VAT, GST, Sales Tax)"})]}),(0,c.jsxs)(y,{children:[(0,c.jsx)(b,{children:"Tax Rate (%)"}),(0,c.jsx)(D,{type:"number",min:"0",max:"100",step:"0.01",value:null!==(O=null===(Q=X.tax)||void 0===Q?void 0:Q.rate)&&void 0!==O?O:6,onChange:e=>{Z(t=>({...t,tax:{...t.tax,rate:parseFloat(e.target.value)||0}})),de(!0)},placeholder:"6"}),(0,c.jsx)(z,{children:"Percentage to add to subtotal (e.g., 6 for 6%)"})]})]})})]})]}),(0,c.jsxs)(x,{children:[(0,c.jsx)(u,{children:"Currency Settings"}),(0,c.jsx)(g,{children:"Configure supported currencies for subscription plans and invoices."}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(y,{children:[(0,c.jsx)(b,{children:"Default Currency"}),(0,c.jsx)(j,{value:G,onChange:e=>pe(e.target.value),children:M.map(e=>{var t,n;return(0,c.jsxs)("option",{value:e,children:[null===(t=_[e])||void 0===t?void 0:t.symbol," ",e," - ",null===(n=_[e])||void 0===n?void 0:n.name]},e)})}),(0,c.jsx)(z,{children:"Used as default for new subscriptions and invoices"})]}),(0,c.jsxs)(y,{children:[(0,c.jsx)(b,{children:"Supported Currencies"}),(0,c.jsx)(f,{onClick:()=>{Y(M),H(!0)},children:M.length>0?M.map(e=>{var t;return(0,c.jsxs)(v,{children:[null===(t=_[e])||void 0===t?void 0:t.symbol," ",e]},e)}):(0,c.jsx)(k,{children:"Click to select currencies"})}),(0,c.jsx)(z,{children:"Currencies available for pricing plans and invoices"})]})]})]}),(0,c.jsxs)(x,{children:[(0,c.jsx)(u,{children:"Online Payment"}),(0,c.jsx)(g,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,c.jsxs)(w,{children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(A,{children:[(0,c.jsx)(F,{children:"Stripe"}),(0,c.jsx)(S,{children:"Credit/Debit Card payments"})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(T,{type:"checkbox",checked:X.stripe.enabled,onChange:e=>he("enabled",e.target.checked)}),(0,c.jsx)(E,{})]})]}),X.stripe.enabled&&(0,c.jsxs)(P,{children:[(0,c.jsxs)(y,{children:[(0,c.jsx)(b,{children:"Publishable Key"}),(0,c.jsx)(D,{type:"text",placeholder:"pk_live_...",value:X.stripe.publishableKey,onChange:e=>he("publishableKey",e.target.value)})]}),(0,c.jsxs)(y,{children:[(0,c.jsx)(b,{children:"Secret Key"}),(0,c.jsx)(D,{type:"password",placeholder:"sk_live_...",value:X.stripe.secretKey,onChange:e=>he("secretKey",e.target.value)})]}),(0,c.jsxs)(y,{children:[(0,c.jsx)(b,{children:"Webhook Secret"}),(0,c.jsx)(D,{type:"password",placeholder:"whsec_...",value:X.stripe.webhookSecret,onChange:e=>he("webhookSecret",e.target.value)})]}),(0,c.jsx)(y,{children:(0,c.jsxs)(I,{children:[(0,c.jsx)(N,{type:"checkbox",checked:X.stripe.autoCharge,onChange:e=>he("autoCharge",e.target.checked)}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,c.jsxs)(w,{children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(A,{children:[(0,c.jsx)(F,{children:"PayPal"}),(0,c.jsx)(S,{children:"PayPal account or card"})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(T,{type:"checkbox",checked:X.paypal.enabled,onChange:e=>xe("enabled",e.target.checked)}),(0,c.jsx)(E,{})]})]}),X.paypal.enabled&&(0,c.jsxs)(P,{children:[(0,c.jsxs)(y,{children:[(0,c.jsx)(b,{children:"Client ID"}),(0,c.jsx)(D,{type:"text",placeholder:"Enter PayPal Client ID",value:X.paypal.clientId,onChange:e=>xe("clientId",e.target.value)})]}),(0,c.jsxs)(y,{children:[(0,c.jsx)(b,{children:"Client Secret"}),(0,c.jsx)(D,{type:"password",placeholder:"Enter PayPal Client Secret",value:X.paypal.clientSecret,onChange:e=>xe("clientSecret",e.target.value)})]})]})]})]}),(0,c.jsxs)(x,{children:[(0,c.jsx)(u,{children:"Manual Payment"}),(0,c.jsx)(g,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===M.length?(0,c.jsx)(q,{children:"No currencies configured. Please add supported currencies above first."}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)($,{children:M.map(e=>{var t;return(0,c.jsxs)(R,{active:ee===e,onClick:()=>te(e),children:[null===(t=_[e])||void 0===t?void 0:t.symbol," ",e]},e)})}),(0,c.jsxs)(w,{children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(A,{children:[(0,c.jsxs)(F,{children:["Bank Transfer (",ee,")"]}),(0,c.jsx)(S,{children:"Manual transfer with receipt upload"})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(T,{type:"checkbox",checked:me(ee).enabled,onChange:e=>ue(ee,"enabled",e.target.checked)}),(0,c.jsx)(E,{})]})]}),me(ee).enabled&&(0,c.jsxs)(P,{children:[(0,c.jsxs)(y,{children:[(0,c.jsx)(b,{children:"Bank Name"}),(0,c.jsx)(D,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:me(ee).bankName,onChange:e=>ue(ee,"bankName",e.target.value)})]}),(0,c.jsxs)(y,{children:[(0,c.jsx)(b,{children:"Account Number"}),(0,c.jsx)(D,{type:"text",placeholder:"Enter bank account number",value:me(ee).accountNumber,onChange:e=>ue(ee,"accountNumber",e.target.value)})]}),(0,c.jsxs)(y,{children:[(0,c.jsx)(b,{children:"Account Name"}),(0,c.jsx)(D,{type:"text",placeholder:"Enter account holder name",value:me(ee).accountName,onChange:e=>ue(ee,"accountName",e.target.value)})]})]})]}),(0,c.jsxs)(w,{children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(A,{children:[(0,c.jsxs)(F,{children:["QR Payment (",ee,")"]}),(0,c.jsx)(S,{children:"Scan QR code to pay (DuitNow, KakaoPay, etc.)"})]}),(0,c.jsxs)(B,{children:[(0,c.jsx)(T,{type:"checkbox",checked:ye(ee).enabled,onChange:e=>ge(ee,"enabled",e.target.checked)}),(0,c.jsx)(E,{})]})]}),ye(ee).enabled&&(0,c.jsxs)(P,{children:[(0,c.jsx)(d.A,{value:ye(ee).qrImage,onChange:e=>ge(ee,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${ee} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,c.jsxs)(y,{style:{marginTop:"16px"},children:[(0,c.jsx)(b,{children:"Description"}),(0,c.jsx)(D,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:ye(ee).qrDescription,onChange:e=>ge(ee,"qrDescription",e.target.value)}),(0,c.jsx)(z,{children:"Short description shown below the QR code"})]})]})]})]})]}),(0,c.jsx)(s.He,{children:(0,c.jsxs)(s.r6,{children:[oe&&(0,c.jsx)(s.Mo,{type:oe.type,children:oe.message}),(0,c.jsx)(s.yY,{onClick:async()=>{if(le){ie(!0),se(null);try{const e=localStorage.getItem("auth_token");console.log("Saving payment settings:",JSON.stringify(X,null,2));const t=await fetch("/api/admin/payment-settings",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(X)}),n=await t.json();if(console.log("Server response:",t.status,n),!t.ok)throw new Error(n.error||n.details||"Failed to save");se({type:"success",message:"Payment settings saved successfully!"}),de(!1)}catch(e){console.error("Error saving:",e),se({type:"error",message:`Failed to save payment settings: ${e instanceof Error?e.message:"Unknown error"}`})}finally{ie(!1)}}else console.log("No changes to save")},disabled:ae||!le,children:ae?"Saving...":le?"Save Changes":"Saved"})]})})]})]}),(0,c.jsxs)(l.aF,{isOpen:W,onClose:()=>H(!1),title:"Select Supported Currencies",size:"medium",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.yl,{variant:"secondary",onClick:()=>H(!1),children:"Cancel"}),(0,c.jsxs)(l.yl,{variant:"primary",onClick:async()=>{try{const e=localStorage.getItem("auth_token");(await fetch("/api/currencies/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currencies:V})})).ok&&(J(V),H(!1),se({type:"success",message:"Supported currencies updated"}),setTimeout(()=>se(null),3e3),!V.includes(G)&&V.length>0&&await pe(V[0]),V.length>0&&!V.includes(ee)&&te(V[0]))}catch(e){console.error("Error updating supported currencies:",e),se({type:"error",message:"Failed to update currencies"})}},disabled:0===V.length,children:["Save (",V.length," selected)"]})]}),children:[(0,c.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the currencies you want to support for subscription plans and invoices."}),(0,c.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(_).map(e=>{let[t,n]=e;return(0,c.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(V.includes(t)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:V.includes(t)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,c.jsx)("input",{type:"checkbox",checked:V.includes(t),onChange:()=>(e=>{Y(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(t),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{style:{fontWeight:500},children:[n.symbol," ",t]}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:n.name})]})]},t)})})]})]})}}}]);