"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9640],{4877:(e,r,t)=>{t.d(r,{A:()=>v});var n=t(8819),a=t(9950),o=t(4752),i=t(4414);const s=o.Ay.div`
  margin-bottom: 16px;
`,l=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,c=o.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=o.Ay.div`
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
  border: 1px solid ${n.w.colors.primary};
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
  border: 1px solid ${n.w.colors.danger};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${n.w.colors.danger};
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
`,f=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",v=e=>{let{value:r,onChange:t,label:n="Logo Upload",helpText:o="Upload an image for your logo",maxSize:v=2,previewSize:w=150,showRemoveButton:k=!0,changeButtonText:C="Change Image",removeButtonText:A="Remove Image",imageAltText:F="Uploaded"}=e;const[S,$]=(0,a.useState)(!1),[B,E]=(0,a.useState)(!1),P=(0,a.useRef)(null),T=(0,a.useRef)(null),D=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);E(!0);const r=new FileReader;r.onload=async e=>{var r;const n=new Image;n.onload=async()=>{const e=document.createElement("canvas"),r=e.getContext("2d");if(!r)return void E(!1);const a=1200;let o=n.width,i=n.height;(o>a||i>a)&&(o>i?(i=i/o*a,o=a):(o=o/i*a,i=a)),e.width=o,e.height=i,r.drawImage(n,0,0,o,i);const s=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const r=localStorage.getItem("auth_token"),t=await fetch(`${f()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({image:e})}),n=await t.json();return n.success?n.data.original:(console.error("Image upload failed:",n.message),null)}catch(r){return console.error("Image upload error:",r),null}})(s);E(!1),l?t(l):alert("Failed to upload image. Please try again.")},n.src=null===(r=e.target)||void 0===r?void 0:r.result},r.readAsDataURL(e)},z=e=>{if(B)return;const r=e.target.files;r&&r.length>0&&D(r[0]),e.target.value=""};return(0,i.jsxs)(s,{children:[n&&(0,i.jsx)(l,{children:n}),o&&(0,i.jsx)(c,{children:o}),(0,i.jsxs)(d,{children:[(0,i.jsx)(p,{ref:T,isDragging:S,hasImage:!!r,isUploading:B,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),B||$(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===T.current&&$(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),$(!1),B)return;const r=e.dataTransfer.files;r&&r.length>0&&D(r[0])},onClick:()=>{var e;r||B||(null===(e=P.current)||void 0===e||e.click())},children:B?(0,i.jsxs)(h,{children:[(0,i.jsx)(j,{}),(0,i.jsx)(x,{style:{marginTop:"12px"},children:"Uploading..."})]}):r?(0,i.jsx)("img",{src:(I=r,I?I.startsWith("http")?I:I.startsWith("/uploads/")?`${f()}${I}`:I:""),alt:F}):(0,i.jsxs)(h,{children:[(0,i.jsx)(x,{children:S?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(g,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),r&&!B&&(0,i.jsxs)(u,{children:[(0,i.jsxs)(m,{disabled:B,children:[C,(0,i.jsx)("input",{ref:P,type:"file",accept:"image/*",onChange:z,disabled:B})]}),k&&(0,i.jsx)(b,{onClick:()=>{t("")},disabled:B,children:A})]})]}),!r&&!B&&(0,i.jsx)(y,{ref:P,type:"file",accept:"image/*",onChange:z})]});var I}},8012:(e,r,t)=>{t.d(r,{Ay:()=>c});var n=t(8819),a=(t(9950),t(4752)),o=t(4414);const i=a.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${n.w.colors.border};
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
  color: ${n.w.colors.secondary};
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
`,c=e=>{let{title:r,children:t}=e;return(0,o.jsxs)(i,{children:[(0,o.jsx)(s,{children:r}),t&&(0,o.jsx)(l,{children:t})]})}},9640:(e,r,t)=>{t.r(r),t.d(r,{default:()=>q});var n=t(8819),a=t(9950),o=t(4752),i=t(8012),s=t(2674),l=t(9610),c=t(4877),d=t(4414);const p=o.Ay.div`
  min-height: 100vh;
`,h=o.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,x=o.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${n.w.colors.border};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,g=o.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${n.w.colors.secondary};
  margin-bottom: 8px;
`,u=o.Ay.p`
  color: ${n.w.colors.text.secondary};
  font-size: 14px;
  margin-bottom: 20px;
`,m=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${n.w.colors.text.dark};
  margin-bottom: 8px;
`,b=o.Ay.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
  }
`,y=o.Ay.div`
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  background: white;
  cursor: pointer;
  min-height: 46px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  &:hover {
    border-color: ${n.w.colors.primary};
  }
`,j=o.Ay.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`,f=o.Ay.span`
  color: ${n.w.colors.text.placeholder};
`,v=o.Ay.div`
  background: white;
  border: 1px solid ${n.w.colors.border};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
`,w=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,k=o.Ay.div``,C=o.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,A=o.Ay.div`
  font-size: 13px;
  color: ${n.w.colors.text.secondary};
  margin-top: 2px;
`,F=o.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`,S=o.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${n.w.colors.primary};
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`,$=o.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${n.w.colors.border};
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
  border-top: 1px solid ${n.w.colors.border};
  margin-top: 16px;
  padding-top: 16px;
`,E=o.Ay.input`
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
`,P=o.Ay.p`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,T=o.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
`,D=o.Ay.input`
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
`,I=o.Ay.button`
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
`,N=o.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,R={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]},q=()=>{const[e,r]=(0,a.useState)({}),[t,n]=(0,a.useState)([]),[o,q]=(0,a.useState)("USD"),[U,O]=(0,a.useState)(!1),[Q,_]=(0,a.useState)([]),[K,M]=(0,a.useState)(R),[J,L]=(0,a.useState)(""),[W,G]=(0,a.useState)(!0),[Y,H]=(0,a.useState)(!1),[X,V]=(0,a.useState)(null),[Z,ee]=(0,a.useState)(!1);(0,a.useEffect)(()=>{re()},[]),(0,a.useEffect)(()=>{t.length>0&&!J&&L(t[0])},[t,J]);const re=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[t,a,o]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch("/api/admin/payment-settings",{headers:e})]);if(t.ok){const e=await t.json();e.success&&e.currencies&&(r(e.currencies),e.defaultCurrency&&q(e.defaultCurrency))}if(a.ok){const e=await a.json();if(e.success&&e.data){const r=e.data.map(e=>e.code);n(r),r.length>0&&L(r[0])}}if(o.ok){const e=await o.json();e&&Object.keys(e).length>0&&M({...R,...e,bankTransfer:e.bankTransfer||{},qrPayment:e.qrPayment||{}})}}catch(e){console.error("Error loading settings:",e)}finally{G(!1)}},te=async e=>{try{const r=localStorage.getItem("auth_token");(await fetch("/api/currencies/default",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({defaultCurrency:e})})).ok&&(q(e),V({type:"success",message:"Default currency updated"}),setTimeout(()=>V(null),3e3))}catch(r){console.error("Error updating default currency:",r),V({type:"error",message:"Failed to update default currency"})}},ne=(e,r)=>{M(t=>({...t,stripe:{...t.stripe,[e]:r}})),ee(!0)},ae=(e,r)=>{M(t=>({...t,paypal:{...t.paypal,[e]:r}})),ee(!0)},oe=(e,r,t)=>{M(n=>({...n,bankTransfer:{...n.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...n.bankTransfer[e],[r]:t}}})),ee(!0)},ie=(e,r,t)=>{M(n=>({...n,qrPayment:{...n.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...n.qrPayment[e],[r]:t}}})),ee(!0)},se=e=>K.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},le=e=>K.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""};return W?(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(p,{children:[(0,d.jsx)(i.Ay,{title:"Payment Settings"}),(0,d.jsx)(h,{children:(0,d.jsx)("p",{children:"Loading..."})})]})}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(i.Ay,{title:"Payment Settings"}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(g,{children:"Additional Charges"}),(0,d.jsx)(u,{children:"Configure additional charges for invoices. These will be applied to all invoices you generate. You can set up to 3 custom charge items (e.g., Tax, Service Charge, Processing Fee)."}),[0,1,2].map(e=>{var r;const t=(null===(r=K.additionalCharges)||void 0===r?void 0:r[e])||{enabled:!1,name:"",rate:0};return(0,d.jsxs)(v,{style:{marginBottom:"16px"},children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:["Charge Item ",e+1]}),(0,d.jsx)(A,{children:t.enabled&&t.name?`${t.name} (${t.rate}%)`:"Not configured"})]}),(0,d.jsxs)(F,{children:[(0,d.jsx)(S,{type:"checkbox",checked:t.enabled,onChange:r=>{const t=[...K.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],enabled:r.target.checked},M(e=>({...e,additionalCharges:t})),ee(!0)}}),(0,d.jsx)($,{})]})]}),t.enabled&&(0,d.jsx)(B,{children:(0,d.jsxs)(s.fh,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(m,{children:"Item Name"}),(0,d.jsx)(E,{type:"text",value:t.name,onChange:r=>{const t=[...K.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],name:r.target.value},M(e=>({...e,additionalCharges:t})),ee(!0)},placeholder:"e.g., Tax, Service Charge, Processing Fee"}),(0,d.jsx)(P,{children:"Name displayed on invoices"})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(m,{children:"Rate (%)"}),(0,d.jsx)(E,{type:"number",min:"0",max:"100",step:"0.01",value:t.rate,onChange:r=>{const t=[...K.additionalCharges||[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}]];t[e]={...t[e],rate:parseFloat(r.target.value)||0},M(e=>({...e,additionalCharges:t})),ee(!0)},placeholder:"0"}),(0,d.jsx)(P,{children:"Percentage to add to subtotal"})]})]})})]},e)})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(g,{children:"Currency Settings"}),(0,d.jsx)(u,{children:"Configure supported currencies for subscription plans and invoices."}),(0,d.jsxs)(s.fh,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(m,{children:"Default Currency"}),(0,d.jsx)(b,{value:o,onChange:e=>te(e.target.value),children:t.map(r=>{var t,n;return(0,d.jsxs)("option",{value:r,children:[null===(t=e[r])||void 0===t?void 0:t.symbol," ",r," - ",null===(n=e[r])||void 0===n?void 0:n.name]},r)})}),(0,d.jsx)(P,{children:"Used as default for new subscriptions and invoices"})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(m,{children:"Supported Currencies"}),(0,d.jsx)(y,{onClick:()=>{_(t),O(!0)},children:t.length>0?t.map(r=>{var t;return(0,d.jsxs)(j,{children:[null===(t=e[r])||void 0===t?void 0:t.symbol," ",r]},r)}):(0,d.jsx)(f,{children:"Click to select currencies"})}),(0,d.jsx)(P,{children:"Currencies available for pricing plans and invoices"})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(g,{children:"Online Payment"}),(0,d.jsx)(u,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(C,{children:"Stripe"}),(0,d.jsx)(A,{children:"Credit/Debit Card payments"})]}),(0,d.jsxs)(F,{children:[(0,d.jsx)(S,{type:"checkbox",checked:K.stripe.enabled,onChange:e=>ne("enabled",e.target.checked)}),(0,d.jsx)($,{})]})]}),K.stripe.enabled&&(0,d.jsxs)(B,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(m,{children:"Publishable Key"}),(0,d.jsx)(E,{type:"text",placeholder:"pk_live_...",value:K.stripe.publishableKey,onChange:e=>ne("publishableKey",e.target.value)})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(m,{children:"Secret Key"}),(0,d.jsx)(E,{type:"password",placeholder:"sk_live_...",value:K.stripe.secretKey,onChange:e=>ne("secretKey",e.target.value)})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(m,{children:"Webhook Secret"}),(0,d.jsx)(E,{type:"password",placeholder:"whsec_...",value:K.stripe.webhookSecret,onChange:e=>ne("webhookSecret",e.target.value)})]}),(0,d.jsx)(s.gE,{children:(0,d.jsxs)(T,{children:[(0,d.jsx)(D,{type:"checkbox",checked:K.stripe.autoCharge,onChange:e=>ne("autoCharge",e.target.checked)}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(C,{children:"PayPal"}),(0,d.jsx)(A,{children:"PayPal account or card"})]}),(0,d.jsxs)(F,{children:[(0,d.jsx)(S,{type:"checkbox",checked:K.paypal.enabled,onChange:e=>ae("enabled",e.target.checked)}),(0,d.jsx)($,{})]})]}),K.paypal.enabled&&(0,d.jsxs)(B,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(m,{children:"Client ID"}),(0,d.jsx)(E,{type:"text",placeholder:"Enter PayPal Client ID",value:K.paypal.clientId,onChange:e=>ae("clientId",e.target.value)})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(m,{children:"Client Secret"}),(0,d.jsx)(E,{type:"password",placeholder:"Enter PayPal Client Secret",value:K.paypal.clientSecret,onChange:e=>ae("clientSecret",e.target.value)})]})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(g,{children:"Manual Payment"}),(0,d.jsx)(u,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===t.length?(0,d.jsx)(N,{children:"No currencies configured. Please add supported currencies above first."}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(z,{children:t.map(r=>{var t;return(0,d.jsxs)(I,{active:J===r,onClick:()=>L(r),children:[null===(t=e[r])||void 0===t?void 0:t.symbol," ",r]},r)})}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:["Bank Transfer (",J,")"]}),(0,d.jsx)(A,{children:"Manual transfer with receipt upload"})]}),(0,d.jsxs)(F,{children:[(0,d.jsx)(S,{type:"checkbox",checked:se(J).enabled,onChange:e=>oe(J,"enabled",e.target.checked)}),(0,d.jsx)($,{})]})]}),se(J).enabled&&(0,d.jsxs)(B,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(m,{children:"Bank Name"}),(0,d.jsx)(E,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:se(J).bankName,onChange:e=>oe(J,"bankName",e.target.value)})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(m,{children:"Account Number"}),(0,d.jsx)(E,{type:"text",placeholder:"Enter bank account number",value:se(J).accountNumber,onChange:e=>oe(J,"accountNumber",e.target.value)})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(m,{children:"Account Name"}),(0,d.jsx)(E,{type:"text",placeholder:"Enter account holder name",value:se(J).accountName,onChange:e=>oe(J,"accountName",e.target.value)})]})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:["QR Payment (",J,")"]}),(0,d.jsx)(A,{children:"Scan QR code to pay (DuitNow, KakaoPay, etc.)"})]}),(0,d.jsxs)(F,{children:[(0,d.jsx)(S,{type:"checkbox",checked:le(J).enabled,onChange:e=>ie(J,"enabled",e.target.checked)}),(0,d.jsx)($,{})]})]}),le(J).enabled&&(0,d.jsxs)(B,{children:[(0,d.jsx)(c.A,{value:le(J).qrImage,onChange:e=>ie(J,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${J} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,d.jsxs)(s.gE,{style:{marginTop:"16px"},children:[(0,d.jsx)(m,{children:"Description"}),(0,d.jsx)(E,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:le(J).qrDescription,onChange:e=>ie(J,"qrDescription",e.target.value)}),(0,d.jsx)(P,{children:"Short description shown below the QR code"})]})]})]})]})]}),(0,d.jsx)(s.He,{children:(0,d.jsxs)(s.r6,{children:[X&&(0,d.jsx)(s.Mo,{type:X.type,children:X.message}),(0,d.jsx)(s.yY,{onClick:async()=>{if(Z){H(!0),V(null);try{const e=localStorage.getItem("auth_token");console.log("Saving payment settings:",JSON.stringify(K,null,2));const r=await fetch("/api/admin/payment-settings",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(K)}),t=await r.json();if(console.log("Server response:",r.status,t),!r.ok)throw new Error(t.error||t.details||"Failed to save");V({type:"success",message:"Payment settings saved successfully!"}),ee(!1)}catch(e){console.error("Error saving:",e),V({type:"error",message:`Failed to save payment settings: ${e instanceof Error?e.message:"Unknown error"}`})}finally{H(!1)}}else console.log("No changes to save")},disabled:Y||!Z,children:Y?"Saving...":Z?"Save Changes":"Saved"})]})})]})]}),(0,d.jsxs)(l.aF,{isOpen:U,onClose:()=>O(!1),title:"Select Supported Currencies",size:"medium",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.yl,{variant:"secondary",onClick:()=>O(!1),children:"Cancel"}),(0,d.jsxs)(l.yl,{variant:"primary",onClick:async()=>{try{const e=localStorage.getItem("auth_token");(await fetch("/api/currencies/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currencies:Q})})).ok&&(n(Q),O(!1),V({type:"success",message:"Supported currencies updated"}),setTimeout(()=>V(null),3e3),!Q.includes(o)&&Q.length>0&&await te(Q[0]),Q.length>0&&!Q.includes(J)&&L(Q[0]))}catch(e){console.error("Error updating supported currencies:",e),V({type:"error",message:"Failed to update currencies"})}},disabled:0===Q.length,children:["Save (",Q.length," selected)"]})]}),children:[(0,d.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the currencies you want to support for subscription plans and invoices."}),(0,d.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(e).map(e=>{let[r,t]=e;return(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(Q.includes(r)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:Q.includes(r)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,d.jsx)("input",{type:"checkbox",checked:Q.includes(r),onChange:()=>(e=>{_(r=>r.includes(e)?r.filter(r=>r!==e):[...r,e])})(r),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{style:{fontWeight:500},children:[t.symbol," ",r]}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:t.name})]})]},r)})})]})]})}}}]);