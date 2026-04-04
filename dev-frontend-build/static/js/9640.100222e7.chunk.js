"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9640],{4877:(e,t,r)=>{r.d(t,{A:()=>f});var n=r(9950),a=r(4752),i=r(4414);const o=a.Ay.div`
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
`,j=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",f=e=>{let{value:t,onChange:r,label:a="Logo Upload",helpText:f="Upload an image for your logo",maxSize:v=2,previewSize:k=150,showRemoveButton:C=!0,changeButtonText:w="Change Image",removeButtonText:F="Remove Image",imageAltText:A="Uploaded"}=e;const[S,B]=(0,n.useState)(!1),[E,P]=(0,n.useState)(!1),T=(0,n.useRef)(null),z=(0,n.useRef)(null),D=async e=>{try{const t=localStorage.getItem("auth_token"),r=await fetch(`${j()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),n=await r.json();return n.success?n.data.original:(console.error("Image upload failed:",n.message),null)}catch(t){return console.error("Image upload error:",t),null}},I=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);if(P(!0),"image/svg+xml"===e.type){const t=new FileReader;return t.onload=async e=>{var t;const n=null===(t=e.target)||void 0===t?void 0:t.result,a=await D(n);P(!1),a?r(a):alert("Failed to upload image. Please try again.")},void t.readAsDataURL(e)}const t=new FileReader;t.onload=async t=>{var n;const a=new Image;a.onload=async()=>{const t=document.createElement("canvas"),n=t.getContext("2d");if(!n)return void P(!1);const i=1200;let o=a.width,s=a.height;(o>i||s>i)&&(o>s?(s=s/o*i,o=i):(o=o/s*i,s=i)),t.width=o,t.height=s,n.drawImage(a,0,0,o,s);const l="image/png"===e.type?t.toDataURL("image/png"):t.toDataURL("image/jpeg",.85),c=await D(l);P(!1),c?r(c):alert("Failed to upload image. Please try again.")},a.src=null===(n=t.target)||void 0===n?void 0:n.result},t.readAsDataURL(e)},N=e=>{if(E)return;const t=e.target.files;t&&t.length>0&&I(t[0]),e.target.value=""};return(0,i.jsxs)(o,{children:[a&&(0,i.jsx)(s,{children:a}),f&&(0,i.jsx)(l,{children:f}),(0,i.jsxs)(c,{children:[(0,i.jsx)(d,{ref:z,isDragging:S,hasImage:!!t,isUploading:E,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),E||B(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===z.current&&B(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),B(!1),E)return;const t=e.dataTransfer.files;t&&t.length>0&&I(t[0])},onClick:()=>{var e;t||E||(null===(e=T.current)||void 0===e||e.click())},children:E?(0,i.jsxs)(p,{children:[(0,i.jsx)(b,{}),(0,i.jsx)(h,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,i.jsx)("img",{src:($=t,$?$.startsWith("http")?$:$.startsWith("/uploads/")?`${j()}${$}`:$:""),alt:A}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:S?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(x,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),t&&!E&&(0,i.jsxs)(u,{children:[(0,i.jsxs)(g,{disabled:E,children:[w,(0,i.jsx)("input",{ref:T,type:"file",accept:"image/*",onChange:N,disabled:E})]}),C&&(0,i.jsx)(m,{onClick:()=>{r("")},disabled:E,children:F})]})]}),!t&&!E&&(0,i.jsx)(y,{ref:T,type:"file",accept:"image/*",onChange:N})]});var $}},8012:(e,t,r)=>{r.d(t,{Ay:()=>l});r(9950);var n=r(4752),a=r(4414);const i=n.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px 16px;
    height: auto;
    min-height: 48px;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`,o=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,s=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,l=e=>{let{title:t,children:r}=e;return(0,a.jsxs)(i,{children:[(0,a.jsx)(o,{children:t}),r&&(0,a.jsx)(s,{children:r})]})}},9640:(e,t,r)=>{r.r(t),r.d(t,{default:()=>q});var n=r(9950),a=r(4752),i=r(8012),o=r(8409),s=r(9610),l=r(4877),c=r(4414);const d=a.Ay.div`
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
`,u=a.Ay.p`
  color: #6B7C93;
  font-size: 14px;
  margin-bottom: 20px;
`,g=a.Ay.div`
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
`,w=a.Ay.div``,F=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,A=a.Ay.div`
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
`,z=a.Ay.p`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,D=a.Ay.label`
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
`,U={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:{}},q=()=>{const[e,t]=(0,n.useState)({}),[r,a]=(0,n.useState)([]),[q,O]=(0,n.useState)("MYR"),[_,Q]=(0,n.useState)(!1),[K,M]=(0,n.useState)([]),[J,L]=(0,n.useState)({}),[W,Y]=(0,n.useState)([]),[G,H]=(0,n.useState)(!1),[V,X]=(0,n.useState)([]),[Z,ee]=(0,n.useState)(U),[te,re]=(0,n.useState)(""),[ne,ae]=(0,n.useState)(!0),[ie,oe]=(0,n.useState)(!1),[se,le]=(0,n.useState)(null),[ce,de]=(0,n.useState)(!1);(0,n.useEffect)(()=>{pe()},[]),(0,n.useEffect)(()=>{r.length>0&&!te&&re(r[0])},[r,te]);const pe=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[r,n,i,o,s]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch("/api/admin/payment-settings",{headers:e}),fetch("/api/currencies/countries/config"),fetch("/api/currencies/countries/supported")]);if(r.ok){const e=await r.json();e.success&&e.currencies&&(t(e.currencies),e.defaultCurrency&&O(e.defaultCurrency))}if(n.ok){const e=await n.json();if(e.success&&e.data){const t=e.data.map(e=>e.code);a(t),t.length>0&&re(t[0])}}if(i.ok){const e=await i.json();if(e&&Object.keys(e).length>0){let t=e.additionalCharges||{};Array.isArray(t)&&(t={}),ee({...U,...e,bankTransfer:e.bankTransfer||{},qrPayment:e.qrPayment||{},additionalCharges:t})}}if(o.ok){const e=await o.json();if(e.success&&e.data){const t={};e.data.forEach(e=>{t[e.code]={name:e.name,currency:e.currency,flag:e.flag}}),L(t)}}if(s.ok){const e=await s.json();e.success&&e.data&&Y(e.data.map(e=>e.code))}}catch(e){console.error("Error loading settings:",e)}finally{ae(!1)}},he=async e=>{try{const t=localStorage.getItem("auth_token");(await fetch("/api/currencies/default",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({defaultCurrency:e})})).ok&&(O(e),le({type:"success",message:"Default currency updated"}),setTimeout(()=>le(null),3e3))}catch(t){console.error("Error updating default currency:",t),le({type:"error",message:"Failed to update default currency"})}},xe=(e,t)=>{ee(r=>({...r,stripe:{...r.stripe,[e]:t}})),de(!0)},ue=(e,t)=>{ee(r=>({...r,paypal:{...r.paypal,[e]:t}})),de(!0)},ge=(e,t,r)=>{ee(n=>({...n,bankTransfer:{...n.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...n.bankTransfer[e],[t]:r}}})),de(!0)},me=(e,t,r)=>{ee(n=>({...n,qrPayment:{...n.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...n.qrPayment[e],[t]:r}}})),de(!0)},ye=e=>Z.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},be=e=>Z.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""},je=[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}],fe=e=>Z.additionalCharges[e]||je,ve=(e,t,r,n)=>{const a=[...fe(e)];a[t]={...a[t],[r]:n},ee(t=>({...t,additionalCharges:{...t.additionalCharges,[e]:a}})),de(!0)};return ne?(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(d,{children:[(0,c.jsx)(i.Ay,{title:"Payment Settings"}),(0,c.jsx)(p,{children:(0,c.jsx)("p",{children:"Loading..."})})]})}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(d,{children:[(0,c.jsx)(i.Ay,{title:"Payment Settings"}),(0,c.jsxs)(p,{children:[(0,c.jsxs)(h,{children:[(0,c.jsx)(x,{children:"Currency Settings"}),(0,c.jsx)(u,{children:"Configure supported currencies for subscription plans and invoices."}),(0,c.jsxs)(g,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Default Currency"}),(0,c.jsx)(b,{value:q,onChange:e=>he(e.target.value),children:r.map(t=>{var r,n;return(0,c.jsxs)("option",{value:t,children:[null===(r=e[t])||void 0===r?void 0:r.symbol," ",t," - ",null===(n=e[t])||void 0===n?void 0:n.name]},t)})}),(0,c.jsx)(z,{children:"Used as default for new subscriptions and invoices"})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Supported Currencies"}),(0,c.jsx)(j,{onClick:()=>{M(r),Q(!0)},children:r.length>0?r.map(t=>{var r;return(0,c.jsxs)(f,{children:[null===(r=e[t])||void 0===r?void 0:r.symbol," ",t]},t)}):(0,c.jsx)(v,{children:"Click to select currencies"})}),(0,c.jsx)(z,{children:"Currencies available for pricing plans and invoices"})]})]}),(0,c.jsx)(g,{children:(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Supported Countries"}),(0,c.jsx)(j,{onClick:()=>{X(W),H(!0)},children:W.length>0?W.map(e=>{var t,r;return(0,c.jsxs)(f,{children:[null===(t=J[e])||void 0===t?void 0:t.flag," ",(null===(r=J[e])||void 0===r?void 0:r.name)||e]},e)}):(0,c.jsx)(v,{children:"Click to select countries"})}),(0,c.jsx)(z,{children:"Countries where hardware products are available for sale"})]})})]}),(0,c.jsxs)(h,{children:[(0,c.jsx)(x,{children:"Online Payment"}),(0,c.jsx)(u,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,c.jsxs)(k,{children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(w,{children:[(0,c.jsx)(F,{children:"Stripe"}),(0,c.jsx)(A,{children:"Credit/Debit Card payments"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(B,{type:"checkbox",checked:Z.stripe.enabled,onChange:e=>xe("enabled",e.target.checked)}),(0,c.jsx)(E,{})]})]}),Z.stripe.enabled&&(0,c.jsxs)(P,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Publishable Key"}),(0,c.jsx)(T,{type:"text",placeholder:"pk_live_...",value:Z.stripe.publishableKey,onChange:e=>xe("publishableKey",e.target.value)})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Secret Key"}),(0,c.jsx)(T,{type:"password",placeholder:"sk_live_...",value:Z.stripe.secretKey,onChange:e=>xe("secretKey",e.target.value)})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Webhook Secret"}),(0,c.jsx)(T,{type:"password",placeholder:"whsec_...",value:Z.stripe.webhookSecret,onChange:e=>xe("webhookSecret",e.target.value)})]}),(0,c.jsx)(m,{children:(0,c.jsxs)(D,{children:[(0,c.jsx)(I,{type:"checkbox",checked:Z.stripe.autoCharge,onChange:e=>xe("autoCharge",e.target.checked)}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,c.jsxs)(k,{children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(w,{children:[(0,c.jsx)(F,{children:"PayPal"}),(0,c.jsx)(A,{children:"PayPal account or card"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(B,{type:"checkbox",checked:Z.paypal.enabled,onChange:e=>ue("enabled",e.target.checked)}),(0,c.jsx)(E,{})]})]}),Z.paypal.enabled&&(0,c.jsxs)(P,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Client ID"}),(0,c.jsx)(T,{type:"text",placeholder:"Enter PayPal Client ID",value:Z.paypal.clientId,onChange:e=>ue("clientId",e.target.value)})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Client Secret"}),(0,c.jsx)(T,{type:"password",placeholder:"Enter PayPal Client Secret",value:Z.paypal.clientSecret,onChange:e=>ue("clientSecret",e.target.value)})]})]})]})]}),(0,c.jsxs)(h,{children:[(0,c.jsx)(x,{children:"Manual Payment"}),(0,c.jsx)(u,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===r.length?(0,c.jsx)(R,{children:"No currencies configured. Please add supported currencies above first."}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(N,{children:r.map(t=>{var r;return(0,c.jsxs)($,{active:te===t,onClick:()=>re(t),children:[null===(r=e[t])||void 0===r?void 0:r.symbol," ",t]},t)})}),(0,c.jsxs)(k,{children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(w,{children:[(0,c.jsxs)(F,{children:["Bank Transfer (",te,")"]}),(0,c.jsx)(A,{children:"Manual transfer with receipt upload"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(B,{type:"checkbox",checked:ye(te).enabled,onChange:e=>ge(te,"enabled",e.target.checked)}),(0,c.jsx)(E,{})]})]}),ye(te).enabled&&(0,c.jsxs)(P,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Bank Name"}),(0,c.jsx)(T,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:ye(te).bankName,onChange:e=>ge(te,"bankName",e.target.value)})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Account Number"}),(0,c.jsx)(T,{type:"text",placeholder:"Enter bank account number",value:ye(te).accountNumber,onChange:e=>ge(te,"accountNumber",e.target.value)})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Account Name"}),(0,c.jsx)(T,{type:"text",placeholder:"Enter account holder name",value:ye(te).accountName,onChange:e=>ge(te,"accountName",e.target.value)})]})]})]}),(0,c.jsxs)(k,{children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(w,{children:[(0,c.jsxs)(F,{children:["QR Payment (",te,")"]}),(0,c.jsx)(A,{children:"Scan QR code to pay (DuitNow, KakaoPay, etc.)"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(B,{type:"checkbox",checked:be(te).enabled,onChange:e=>me(te,"enabled",e.target.checked)}),(0,c.jsx)(E,{})]})]}),be(te).enabled&&(0,c.jsxs)(P,{children:[(0,c.jsx)(l.A,{value:be(te).qrImage,onChange:e=>me(te,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${te} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,c.jsxs)(m,{style:{marginTop:"16px"},children:[(0,c.jsx)(y,{children:"Description"}),(0,c.jsx)(T,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:be(te).qrDescription,onChange:e=>me(te,"qrDescription",e.target.value)}),(0,c.jsx)(z,{children:"Short description shown below the QR code"})]})]})]}),(0,c.jsxs)(x,{style:{fontSize:"15px",marginTop:"24px",marginBottom:"8px"},children:["Additional Charges (",te,")"]}),(0,c.jsxs)(u,{style:{marginBottom:"12px"},children:["Configure tax, service charge, etc. for ",te," invoices. Up to 3 items."]}),[0,1,2].map(e=>{const t=fe(te)[e]||{enabled:!1,name:"",rate:0};return(0,c.jsxs)(k,{style:{marginBottom:"12px"},children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(w,{children:[(0,c.jsxs)(F,{children:["Charge Item ",e+1]}),(0,c.jsx)(A,{children:t.enabled&&t.name?`${t.name} (${t.rate}%)`:"Not configured"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(B,{type:"checkbox",checked:t.enabled,onChange:t=>ve(te,e,"enabled",t.target.checked)}),(0,c.jsx)(E,{})]})]}),t.enabled&&(0,c.jsx)(P,{children:(0,c.jsxs)(g,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Item Name"}),(0,c.jsx)(T,{type:"text",value:t.name,onChange:t=>ve(te,e,"name",t.target.value),placeholder:"e.g., SST, VAT, Service Charge"}),(0,c.jsx)(z,{children:"Name displayed on invoices"})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Rate (%)"}),(0,c.jsx)(T,{type:"number",min:"0",max:"100",step:"0.01",value:t.rate,onChange:t=>ve(te,e,"rate",parseFloat(t.target.value)||0),placeholder:"0"}),(0,c.jsx)(z,{children:"Percentage to add to subtotal"})]})]})})]},`charge-${te}-${e}`)})]})]}),(0,c.jsx)(o.He,{children:(0,c.jsxs)(o.r6,{children:[se&&(0,c.jsx)(o.Mo,{type:se.type,children:se.message}),(0,c.jsx)(o.yY,{onClick:async()=>{if(ce){oe(!0),le(null);try{const e=localStorage.getItem("auth_token");console.log("Saving payment settings:",JSON.stringify(Z,null,2));const t=await fetch("/api/admin/payment-settings",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(Z)}),r=await t.json();if(console.log("Server response:",t.status,r),!t.ok)throw new Error(r.error||r.details||"Failed to save");le({type:"success",message:"Payment settings saved successfully!"}),de(!1)}catch(e){console.error("Error saving:",e),le({type:"error",message:`Failed to save payment settings: ${e instanceof Error?e.message:"Unknown error"}`})}finally{oe(!1)}}else console.log("No changes to save")},disabled:ie||!ce,children:ie?"Saving...":ce?"Save Changes":"Saved"})]})})]})]}),(0,c.jsxs)(s.aF,{isOpen:_,onClose:()=>Q(!1),title:"Select Supported Currencies",size:"medium",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s.yl,{variant:"secondary",onClick:()=>Q(!1),children:"Cancel"}),(0,c.jsxs)(s.yl,{variant:"primary",onClick:async()=>{try{const e=localStorage.getItem("auth_token");(await fetch("/api/currencies/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currencies:K})})).ok&&(a(K),Q(!1),le({type:"success",message:"Supported currencies updated"}),setTimeout(()=>le(null),3e3),!K.includes(q)&&K.length>0&&await he(K[0]),K.length>0&&!K.includes(te)&&re(K[0]))}catch(e){console.error("Error updating supported currencies:",e),le({type:"error",message:"Failed to update currencies"})}},disabled:0===K.length,children:["Save (",K.length," selected)"]})]}),children:[(0,c.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the currencies you want to support for subscription plans and invoices."}),(0,c.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(e).map(e=>{let[t,r]=e;return(0,c.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(K.includes(t)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:K.includes(t)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,c.jsx)("input",{type:"checkbox",checked:K.includes(t),onChange:()=>(e=>{M(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(t),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{style:{fontWeight:500},children:[r.symbol," ",t]}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:r.name})]})]},t)})})]}),(0,c.jsxs)(s.aF,{isOpen:G,onClose:()=>H(!1),title:"Select Supported Countries",size:"medium",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(s.yl,{variant:"secondary",onClick:()=>H(!1),children:"Cancel"}),(0,c.jsxs)(s.yl,{variant:"primary",onClick:async()=>{try{const e=localStorage.getItem("auth_token");(await fetch("/api/currencies/countries/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({countries:V})})).ok&&(Y(V),H(!1),le({type:"success",message:"Supported countries updated"}),setTimeout(()=>le(null),3e3))}catch(e){console.error("Error updating supported countries:",e),le({type:"error",message:"Failed to update supported countries"})}},disabled:0===V.length,children:["Save (",V.length," selected)"]})]}),children:[(0,c.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the countries where you sell hardware products. These will be shown on the Packages page and available in product settings."}),(0,c.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(J).map(e=>{let[t,r]=e;return(0,c.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(V.includes(t)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:V.includes(t)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,c.jsx)("input",{type:"checkbox",checked:V.includes(t),onChange:()=>(e=>{X(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(t),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{style:{fontWeight:500},children:[r.flag," ",r.name]}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:r.currency})]})]},t)})})]})]})}}}]);