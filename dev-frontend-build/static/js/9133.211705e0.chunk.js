"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9133],{4877:(e,t,r)=>{r.d(t,{A:()=>v});var n=r(8819),a=r(9950),o=r(4752),i=r(4414);const s=o.Ay.div`
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
`,y=o.Ay.label`
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
`,m=o.Ay.button`
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
`,b=o.Ay.input`
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
`,f=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",v=e=>{let{value:t,onChange:r,label:n="Logo Upload",helpText:o="Upload an image for your logo",maxSize:v=2,previewSize:w=150,showRemoveButton:k=!0,changeButtonText:C="Change Image",removeButtonText:A="Remove Image",imageAltText:S="Uploaded"}=e;const[F,T]=(0,a.useState)(!1),[E,$]=(0,a.useState)(!1),B=(0,a.useRef)(null),P=(0,a.useRef)(null),D=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);$(!0);const t=new FileReader;t.onload=async e=>{var t;const n=new Image;n.onload=async()=>{const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return void $(!1);const a=1200;let o=n.width,i=n.height;(o>a||i>a)&&(o>i?(i=i/o*a,o=a):(o=o/i*a,i=a)),e.width=o,e.height=i,t.drawImage(n,0,0,o,i);const s=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const t=localStorage.getItem("auth_token"),r=await fetch(`${f()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),n=await r.json();return n.success?n.data.original:(console.error("Image upload failed:",n.message),null)}catch(t){return console.error("Image upload error:",t),null}})(s);$(!1),l?r(l):alert("Failed to upload image. Please try again.")},n.src=null===(t=e.target)||void 0===t?void 0:t.result},t.readAsDataURL(e)},z=e=>{if(E)return;const t=e.target.files;t&&t.length>0&&D(t[0]),e.target.value=""};return(0,i.jsxs)(s,{children:[n&&(0,i.jsx)(l,{children:n}),o&&(0,i.jsx)(c,{children:o}),(0,i.jsxs)(d,{children:[(0,i.jsx)(p,{ref:P,isDragging:F,hasImage:!!t,isUploading:E,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),E||T(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===P.current&&T(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),T(!1),E)return;const t=e.dataTransfer.files;t&&t.length>0&&D(t[0])},onClick:()=>{var e;t||E||(null===(e=B.current)||void 0===e||e.click())},children:E?(0,i.jsxs)(h,{children:[(0,i.jsx)(j,{}),(0,i.jsx)(x,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,i.jsx)("img",{src:(I=t,I?I.startsWith("http")?I:I.startsWith("/uploads/")?`${f()}${I}`:I:""),alt:S}):(0,i.jsxs)(h,{children:[(0,i.jsx)(x,{children:F?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(g,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),t&&!E&&(0,i.jsxs)(u,{children:[(0,i.jsxs)(y,{disabled:E,children:[C,(0,i.jsx)("input",{ref:B,type:"file",accept:"image/*",onChange:z,disabled:E})]}),k&&(0,i.jsx)(m,{onClick:()=>{r("")},disabled:E,children:A})]})]}),!t&&!E&&(0,i.jsx)(b,{ref:B,type:"file",accept:"image/*",onChange:z})]});var I}},8012:(e,t,r)=>{r.d(t,{Ay:()=>c});var n=r(8819),a=(r(9950),r(4752)),o=r(4414);const i=a.Ay.div`
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
`,c=e=>{let{title:t,children:r}=e;return(0,o.jsxs)(i,{children:[(0,o.jsx)(s,{children:t}),r&&(0,o.jsx)(l,{children:r})]})}},9133:(e,t,r)=>{r.r(t),r.d(t,{default:()=>q});var n=r(8819),a=r(9950),o=r(4752),i=r(8012),s=r(2674),l=r(9610),c=r(4877),d=r(4414);const p=o.Ay.div`
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
`,y=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${n.w.colors.text.dark};
  margin-bottom: 8px;
`,m=o.Ay.select`
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
`,b=o.Ay.div`
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
`,S=o.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`,F=o.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${n.w.colors.primary};
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`,T=o.Ay.span`
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
`,E=o.Ay.div`
  border-top: 1px solid ${n.w.colors.border};
  margin-top: 16px;
  padding-top: 16px;
`,$=o.Ay.input`
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
`,B=o.Ay.p`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 4px;
`,P=o.Ay.label`
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
`,R={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},tax:{enabled:!0,rate:6,name:"Tax"}},q=()=>{var e,t,r,n,o,q;const[U,O]=(0,a.useState)({}),[Q,_]=(0,a.useState)([]),[K,M]=(0,a.useState)("USD"),[J,G]=(0,a.useState)(!1),[L,W]=(0,a.useState)([]),[H,V]=(0,a.useState)(R),[Y,X]=(0,a.useState)(""),[Z,ee]=(0,a.useState)(!0),[te,re]=(0,a.useState)(!1),[ne,ae]=(0,a.useState)(null),[oe,ie]=(0,a.useState)(!1);(0,a.useEffect)(()=>{se()},[]),(0,a.useEffect)(()=>{Q.length>0&&!Y&&X(Q[0])},[Q,Y]);const se=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[t,r,n]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch("/api/admin/payment-settings",{headers:e})]);if(t.ok){const e=await t.json();e.success&&e.currencies&&(O(e.currencies),e.defaultCurrency&&M(e.defaultCurrency))}if(r.ok){const e=await r.json();if(e.success&&e.data){const t=e.data.map(e=>e.code);_(t),t.length>0&&X(t[0])}}if(n.ok){const e=await n.json();e&&Object.keys(e).length>0&&V({...R,...e,bankTransfer:e.bankTransfer||{},qrPayment:e.qrPayment||{}})}}catch(e){console.error("Error loading settings:",e)}finally{ee(!1)}},le=async e=>{try{const t=localStorage.getItem("auth_token");(await fetch("/api/currencies/default",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({defaultCurrency:e})})).ok&&(M(e),ae({type:"success",message:"Default currency updated"}),setTimeout(()=>ae(null),3e3))}catch(t){console.error("Error updating default currency:",t),ae({type:"error",message:"Failed to update default currency"})}},ce=(e,t)=>{V(r=>({...r,stripe:{...r.stripe,[e]:t}})),ie(!0)},de=(e,t)=>{V(r=>({...r,paypal:{...r.paypal,[e]:t}})),ie(!0)},pe=(e,t,r)=>{V(n=>({...n,bankTransfer:{...n.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...n.bankTransfer[e],[t]:r}}})),ie(!0)},he=(e,t,r)=>{V(n=>({...n,qrPayment:{...n.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...n.qrPayment[e],[t]:r}}})),ie(!0)},xe=e=>H.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},ge=e=>H.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""};return Z?(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(p,{children:[(0,d.jsx)(i.Ay,{title:"Payment Settings"}),(0,d.jsx)(h,{children:(0,d.jsx)("p",{children:"Loading..."})})]})}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(i.Ay,{title:"Payment Settings"}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(g,{children:"Tax Settings"}),(0,d.jsx)(u,{children:"Configure tax rate for invoices. This tax will be applied to all invoices you generate."}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(C,{children:"Enable Tax"}),(0,d.jsx)(A,{children:"Apply tax to invoices"})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(F,{type:"checkbox",checked:null===(e=null===(t=H.tax)||void 0===t?void 0:t.enabled)||void 0===e||e,onChange:e=>{V(t=>({...t,tax:{...t.tax,enabled:e.target.checked}})),ie(!0)}}),(0,d.jsx)(T,{})]})]}),(null===(r=H.tax)||void 0===r?void 0:r.enabled)&&(0,d.jsx)(E,{children:(0,d.jsxs)(s.fh,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(y,{children:"Tax Name"}),(0,d.jsx)($,{type:"text",value:(null===(n=H.tax)||void 0===n?void 0:n.name)||"Tax",onChange:e=>{V(t=>({...t,tax:{...t.tax,name:e.target.value}})),ie(!0)},placeholder:"e.g., VAT, GST, Sales Tax"}),(0,d.jsx)(B,{children:"Name displayed on invoices (e.g., VAT, GST, Sales Tax)"})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(y,{children:"Tax Rate (%)"}),(0,d.jsx)($,{type:"number",min:"0",max:"100",step:"0.01",value:null!==(o=null===(q=H.tax)||void 0===q?void 0:q.rate)&&void 0!==o?o:6,onChange:e=>{V(t=>({...t,tax:{...t.tax,rate:parseFloat(e.target.value)||0}})),ie(!0)},placeholder:"6"}),(0,d.jsx)(B,{children:"Percentage to add to subtotal (e.g., 6 for 6%)"})]})]})})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(g,{children:"Currency Settings"}),(0,d.jsx)(u,{children:"Configure supported currencies for subscription plans and invoices."}),(0,d.jsxs)(s.fh,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(y,{children:"Default Currency"}),(0,d.jsx)(m,{value:K,onChange:e=>le(e.target.value),children:Q.map(e=>{var t,r;return(0,d.jsxs)("option",{value:e,children:[null===(t=U[e])||void 0===t?void 0:t.symbol," ",e," - ",null===(r=U[e])||void 0===r?void 0:r.name]},e)})}),(0,d.jsx)(B,{children:"Used as default for new subscriptions and invoices"})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(y,{children:"Supported Currencies"}),(0,d.jsx)(b,{onClick:()=>{W(Q),G(!0)},children:Q.length>0?Q.map(e=>{var t;return(0,d.jsxs)(j,{children:[null===(t=U[e])||void 0===t?void 0:t.symbol," ",e]},e)}):(0,d.jsx)(f,{children:"Click to select currencies"})}),(0,d.jsx)(B,{children:"Currencies available for pricing plans and invoices"})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(g,{children:"Online Payment"}),(0,d.jsx)(u,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(C,{children:"Stripe"}),(0,d.jsx)(A,{children:"Credit/Debit Card payments"})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(F,{type:"checkbox",checked:H.stripe.enabled,onChange:e=>ce("enabled",e.target.checked)}),(0,d.jsx)(T,{})]})]}),H.stripe.enabled&&(0,d.jsxs)(E,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(y,{children:"Publishable Key"}),(0,d.jsx)($,{type:"text",placeholder:"pk_live_...",value:H.stripe.publishableKey,onChange:e=>ce("publishableKey",e.target.value)})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(y,{children:"Secret Key"}),(0,d.jsx)($,{type:"password",placeholder:"sk_live_...",value:H.stripe.secretKey,onChange:e=>ce("secretKey",e.target.value)})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(y,{children:"Webhook Secret"}),(0,d.jsx)($,{type:"password",placeholder:"whsec_...",value:H.stripe.webhookSecret,onChange:e=>ce("webhookSecret",e.target.value)})]}),(0,d.jsx)(s.gE,{children:(0,d.jsxs)(P,{children:[(0,d.jsx)(D,{type:"checkbox",checked:H.stripe.autoCharge,onChange:e=>ce("autoCharge",e.target.checked)}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(k,{children:[(0,d.jsx)(C,{children:"PayPal"}),(0,d.jsx)(A,{children:"PayPal account or card"})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(F,{type:"checkbox",checked:H.paypal.enabled,onChange:e=>de("enabled",e.target.checked)}),(0,d.jsx)(T,{})]})]}),H.paypal.enabled&&(0,d.jsxs)(E,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(y,{children:"Client ID"}),(0,d.jsx)($,{type:"text",placeholder:"Enter PayPal Client ID",value:H.paypal.clientId,onChange:e=>de("clientId",e.target.value)})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(y,{children:"Client Secret"}),(0,d.jsx)($,{type:"password",placeholder:"Enter PayPal Client Secret",value:H.paypal.clientSecret,onChange:e=>de("clientSecret",e.target.value)})]})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(g,{children:"Manual Payment"}),(0,d.jsx)(u,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===Q.length?(0,d.jsx)(N,{children:"No currencies configured. Please add supported currencies above first."}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(z,{children:Q.map(e=>{var t;return(0,d.jsxs)(I,{active:Y===e,onClick:()=>X(e),children:[null===(t=U[e])||void 0===t?void 0:t.symbol," ",e]},e)})}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:["Bank Transfer (",Y,")"]}),(0,d.jsx)(A,{children:"Manual transfer with receipt upload"})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(F,{type:"checkbox",checked:xe(Y).enabled,onChange:e=>pe(Y,"enabled",e.target.checked)}),(0,d.jsx)(T,{})]})]}),xe(Y).enabled&&(0,d.jsxs)(E,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(y,{children:"Bank Name"}),(0,d.jsx)($,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:xe(Y).bankName,onChange:e=>pe(Y,"bankName",e.target.value)})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(y,{children:"Account Number"}),(0,d.jsx)($,{type:"text",placeholder:"Enter bank account number",value:xe(Y).accountNumber,onChange:e=>pe(Y,"accountNumber",e.target.value)})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(y,{children:"Account Name"}),(0,d.jsx)($,{type:"text",placeholder:"Enter account holder name",value:xe(Y).accountName,onChange:e=>pe(Y,"accountName",e.target.value)})]})]})]}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(w,{children:[(0,d.jsxs)(k,{children:[(0,d.jsxs)(C,{children:["QR Payment (",Y,")"]}),(0,d.jsx)(A,{children:"Scan QR code to pay (DuitNow, KakaoPay, etc.)"})]}),(0,d.jsxs)(S,{children:[(0,d.jsx)(F,{type:"checkbox",checked:ge(Y).enabled,onChange:e=>he(Y,"enabled",e.target.checked)}),(0,d.jsx)(T,{})]})]}),ge(Y).enabled&&(0,d.jsxs)(E,{children:[(0,d.jsx)(c.A,{value:ge(Y).qrImage,onChange:e=>he(Y,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${Y} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,d.jsxs)(s.gE,{style:{marginTop:"16px"},children:[(0,d.jsx)(y,{children:"Description"}),(0,d.jsx)($,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:ge(Y).qrDescription,onChange:e=>he(Y,"qrDescription",e.target.value)}),(0,d.jsx)(B,{children:"Short description shown below the QR code"})]})]})]})]})]}),(0,d.jsx)(s.He,{children:(0,d.jsxs)(s.r6,{children:[ne&&(0,d.jsx)(s.Mo,{type:ne.type,children:ne.message}),(0,d.jsx)(s.yY,{onClick:async()=>{if(oe){re(!0),ae(null);try{const e=localStorage.getItem("auth_token");console.log("Saving payment settings:",JSON.stringify(H,null,2));const t=await fetch("/api/admin/payment-settings",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(H)}),r=await t.json();if(console.log("Server response:",t.status,r),!t.ok)throw new Error(r.error||r.details||"Failed to save");ae({type:"success",message:"Payment settings saved successfully!"}),ie(!1)}catch(e){console.error("Error saving:",e),ae({type:"error",message:`Failed to save payment settings: ${e instanceof Error?e.message:"Unknown error"}`})}finally{re(!1)}}else console.log("No changes to save")},disabled:te||!oe,children:te?"Saving...":oe?"Save Changes":"Saved"})]})})]})]}),(0,d.jsxs)(l.aF,{isOpen:J,onClose:()=>G(!1),title:"Select Supported Currencies",size:"medium",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.yl,{variant:"secondary",onClick:()=>G(!1),children:"Cancel"}),(0,d.jsxs)(l.yl,{variant:"primary",onClick:async()=>{try{const e=localStorage.getItem("auth_token");(await fetch("/api/currencies/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currencies:L})})).ok&&(_(L),G(!1),ae({type:"success",message:"Supported currencies updated"}),setTimeout(()=>ae(null),3e3),!L.includes(K)&&L.length>0&&await le(L[0]),L.length>0&&!L.includes(Y)&&X(L[0]))}catch(e){console.error("Error updating supported currencies:",e),ae({type:"error",message:"Failed to update currencies"})}},disabled:0===L.length,children:["Save (",L.length," selected)"]})]}),children:[(0,d.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the currencies you want to support for subscription plans and invoices."}),(0,d.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(U).map(e=>{let[t,r]=e;return(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(L.includes(t)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:L.includes(t)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,d.jsx)("input",{type:"checkbox",checked:L.includes(t),onChange:()=>(e=>{W(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(t),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{style:{fontWeight:500},children:[r.symbol," ",t]}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:r.name})]})]},t)})})]})]})}}}]);