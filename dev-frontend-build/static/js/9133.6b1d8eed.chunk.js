"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9133],{2597:(e,t,r)=>{r.d(t,{Ex:()=>d,oz:()=>c,tU:()=>l});r(9950);var n=r(4752),a=r(4414);const i=n.Ay.div`
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
`,o=n.Ay.button`
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
`,s=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:t,className:r,style:n}=e;return(0,a.jsx)(i,{className:r,style:n,children:t})},c=e=>{let{active:t,onClick:r,children:n,className:i}=e;return(0,a.jsx)(o,{active:t,onClick:r,className:i,children:n})},d=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,a.jsx)(s,{variant:r,children:t}):null}},4877:(e,t,r)=>{r.d(t,{A:()=>j});var n=r(9950),a=r(4752),i=r(4414);const o=a.Ay.div`
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
`,f=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",j=e=>{let{value:t,onChange:r,label:a="Logo Upload",helpText:j="Upload an image for your logo",maxSize:v=2,previewSize:w=150,showRemoveButton:A=!0,changeButtonText:k="Change Image",removeButtonText:C="Remove Image",imageAltText:F="Uploaded"}=e;const[S,B]=(0,n.useState)(!1),[E,$]=(0,n.useState)(!1),T=(0,n.useRef)(null),D=(0,n.useRef)(null),P=async e=>{try{const t=localStorage.getItem("auth_token"),r=await fetch(`${f()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),n=await r.json();return n.success?n.data.original:(console.error("Image upload failed:",n.message),null)}catch(t){return console.error("Image upload error:",t),null}},z=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);if($(!0),"image/svg+xml"===e.type){const t=new FileReader;return t.onload=async e=>{var t;const n=null===(t=e.target)||void 0===t?void 0:t.result,a=await P(n);$(!1),a?r(a):alert("Failed to upload image. Please try again.")},void t.readAsDataURL(e)}const t=new FileReader;t.onload=async t=>{var n;const a=new Image;a.onload=async()=>{const t=document.createElement("canvas"),n=t.getContext("2d");if(!n)return void $(!1);const i=1200;let o=a.width,s=a.height;(o>i||s>i)&&(o>s?(s=s/o*i,o=i):(o=o/s*i,s=i)),t.width=o,t.height=s,n.drawImage(a,0,0,o,s);const l="image/png"===e.type?t.toDataURL("image/png"):t.toDataURL("image/jpeg",.85),c=await P(l);$(!1),c?r(c):alert("Failed to upload image. Please try again.")},a.src=null===(n=t.target)||void 0===n?void 0:n.result},t.readAsDataURL(e)},I=e=>{if(E)return;const t=e.target.files;t&&t.length>0&&z(t[0]),e.target.value=""};return(0,i.jsxs)(o,{children:[a&&(0,i.jsx)(s,{children:a}),j&&(0,i.jsx)(l,{children:j}),(0,i.jsxs)(c,{children:[(0,i.jsx)(d,{ref:D,isDragging:S,hasImage:!!t,isUploading:E,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),E||B(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===D.current&&B(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),B(!1),E)return;const t=e.dataTransfer.files;t&&t.length>0&&z(t[0])},onClick:()=>{var e;t||E||(null===(e=T.current)||void 0===e||e.click())},children:E?(0,i.jsxs)(p,{children:[(0,i.jsx)(b,{}),(0,i.jsx)(h,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,i.jsx)("img",{src:(N=t,N?N.startsWith("http")?N:N.startsWith("/uploads/")?`${f()}${N}`:N:""),alt:F}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:S?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(x,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),t&&!E&&(0,i.jsxs)(u,{children:[(0,i.jsxs)(g,{disabled:E,children:[k,(0,i.jsx)("input",{ref:T,type:"file",accept:"image/*",onChange:I,disabled:E})]}),A&&(0,i.jsx)(m,{onClick:()=>{r("")},disabled:E,children:C})]})]}),!t&&!E&&(0,i.jsx)(y,{ref:T,type:"file",accept:"image/*",onChange:I})]});var N}},5370:(e,t,r)=>{r.d(t,{A:()=>j});var n=r(9950),a=r(4752),i=r(4414);const o=a.i7`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`,s=a.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,l=a.i7`
  to { transform: rotate(360deg); }
`,c=a.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,d=a.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?a.AH`${s} 0.3s ease forwards`:a.AH`${o} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=a.Ay.div`
  ${d}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,h=a.Ay.div`
  ${d}
  position: absolute;
  right: -6px;
  top: -6px;
`,x=a.Ay.div`
  ${d}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,u=a.Ay.div`
  ${d}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,g=a.Ay.div`
  ${d}
  position: absolute;
  right: -8px;
  top: -8px;
`,m=a.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #D1FAE5;
  color: #065F46;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 13px;
  font-weight: 700;
`,y=a.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${l} 0.6s linear infinite;
`,b=a.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #EF4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: 700;
`,f=(0,n.forwardRef)((e,t)=>{let{children:r,onSave:a,type:o="input",debounceMs:s=2e3,style:l}=e;const[d,f]=(0,n.useState)("idle"),[j,v]=(0,n.useState)(!1),w=(0,n.useRef)(null),A=(0,n.useRef)(null),k=(0,n.useRef)(null),C=(0,n.useRef)(!0),F=(0,n.useRef)(a);F.current=a;const S=(0,n.useCallback)(()=>{w.current&&clearTimeout(w.current),A.current&&clearTimeout(A.current),k.current&&clearTimeout(k.current)},[]),B=2e3!==s?s:"toggle"===o||"select"===o||"list"===o||"image"===o?300:s,E=(0,n.useCallback)(()=>{S(),v(!1),w.current=setTimeout(async()=>{if(C.current){f("saving");try{if(await F.current(),!C.current)return;f("saved"),A.current=setTimeout(()=>{C.current&&(v(!0),k.current=setTimeout(()=>{C.current&&(f("idle"),v(!1))},300))},2e3)}catch{if(!C.current)return;f("error"),A.current=setTimeout(()=>{C.current&&(v(!0),k.current=setTimeout(()=>{C.current&&(f("idle"),v(!1))},300))},4e3)}}},B)},[B,S]);(0,n.useImperativeHandle)(t,()=>({triggerSave:E}),[E]),(0,n.useEffect)(()=>(C.current=!0,()=>{C.current=!1,S()}),[S]);const $=n.Children.map(r,e=>{if(!n.isValidElement(e))return e;const t=e.props.onChange;return"function"!==typeof t?e:n.cloneElement(e,{onChange:function(){t(...arguments),E()}})}),T="saving"===d?(0,i.jsx)(y,{}):"saved"===d?(0,i.jsx)(m,{children:"\u2713"}):"error"===d?(0,i.jsx)(b,{children:"!"}):null,D="select"===o?h:"toggle"===o?x:"image"===o?u:"list"===o?g:p;return(0,i.jsxs)(c,{$type:o,style:l,children:[$,"idle"!==d&&(0,i.jsx)(D,{$fading:j,children:T})]})});f.displayName="AutoSaveField";const j=f},8012:(e,t,r)=>{r.d(t,{Ay:()=>l});r(9950);var n=r(4752),a=r(4414);const i=n.Ay.div`
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
`,l=e=>{let{title:t,children:r}=e;return(0,a.jsxs)(i,{children:[(0,a.jsx)(o,{children:t}),r&&(0,a.jsx)(s,{children:r})]})}},9133:(e,t,r)=>{r.r(t),r.d(t,{default:()=>U});var n=r(9950),a=r(4752),i=r(8012),o=r(2597),s=r(9610),l=r(4877),c=r(1367),d=r(5370),p=r(4414);const h=a.Ay.div`
  min-height: 100vh;
`,x=a.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,u=a.Ay.div`
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
`,m=a.Ay.p`
  color: #6B7C93;
  font-size: 14px;
  margin-bottom: 20px;
`,y=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,b=a.Ay.div`
  margin-bottom: 16px;
`,f=a.Ay.label`
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
`,w=a.Ay.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`,A=a.Ay.span`
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
`,$=a.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #635BFF;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`,T=a.Ay.span`
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
`,P=a.Ay.input`
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
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,_={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:{}},U=()=>{const{user:e}=(0,c.As)(),t=null===e||void 0===e?void 0:e.foodcourt_id,[r,a]=(0,n.useState)({}),[U,q]=(0,n.useState)([]),[Q,K]=(0,n.useState)([]),[M,O]=(0,n.useState)("MYR"),[L,H]=(0,n.useState)(!1),[W,J]=(0,n.useState)([]),[Y,G]=(0,n.useState)(_),V=(0,n.useRef)(_),[X,Z]=(0,n.useState)(""),[ee,te]=(0,n.useState)(!0);(0,n.useEffect)(()=>{re()},[]),(0,n.useEffect)(()=>{U.length>0&&!X&&Z(U[0])},[U,X]);const re=async()=>{if(!t)return console.error("No foodcourt ID available"),void te(!1);try{const r={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[n,i,o]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch(`/api/foodcourts/${t}/payment-settings`,{headers:r})]);if(n.ok){const e=await n.json();e.success&&e.currencies&&a(e.currencies)}let s=[];if(i.ok){const e=await i.json();e.success&&e.data&&(s=e.data.map(e=>e.code),K(s))}if(o.ok){const t=await o.json();console.log("Foodcourt payment settings loaded:",t);const r=t.data||t;if(r.supported_currencies&&Array.isArray(r.supported_currencies)){const t=s.length>0?r.supported_currencies.filter(e=>s.includes(e)):r.supported_currencies;if(q(t),t.length>0){var e;Z(t[0]);const n=null===(e=r.payment_settings)||void 0===e?void 0:e.defaultCurrency;n&&t.includes(n)?O(n):O(t[0])}}if(r.payment_settings&&Object.keys(r.payment_settings).length>0){let e=r.payment_settings.additionalCharges||{};Array.isArray(e)&&(e={});const t={..._,...r.payment_settings,bankTransfer:r.payment_settings.bankTransfer||{},qrPayment:r.payment_settings.qrPayment||{},additionalCharges:e};V.current=t,G(t)}}}catch(r){console.error("Error loading settings:",r)}finally{te(!1)}},ne=e=>{G(t=>{const r=e(t);return V.current=r,r})},ae=(e,t)=>{ne(r=>({...r,stripe:{...r.stripe,[e]:t}}))},ie=(e,t)=>{ne(r=>({...r,paypal:{...r.paypal,[e]:t}}))},oe=(e,t,r)=>{ne(n=>({...n,bankTransfer:{...n.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...n.bankTransfer[e],[t]:r}}}))},se=(e,t,r)=>{ne(n=>({...n,qrPayment:{...n.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...n.qrPayment[e],[t]:r}}}))},le=e=>Y.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},ce=e=>Y.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""},de=[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}],pe=(e,t,r,n)=>{ne(a=>{const i=[...a.additionalCharges[e]||de];return i[t]={...i[t],[r]:n},{...a,additionalCharges:{...a.additionalCharges,[e]:i}}})},he=async()=>{if(t)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/foodcourts/${t}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({payment_settings:{...V.current,defaultCurrency:M}})}),n=await r.json();if(!r.ok)throw new Error(n.error||n.details||"Failed to save")}catch(e){throw console.error("Error saving foodcourt payment settings:",e),e}};return ee?(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(h,{children:[(0,p.jsx)(i.Ay,{title:"Payment Settings"}),(0,p.jsx)(x,{children:(0,p.jsx)("p",{children:"Loading..."})})]})}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(i.Ay,{title:"Payment Settings"}),(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(g,{children:"Currency Settings"}),(0,p.jsx)(m,{children:"Configure supported currencies for subscription plans and invoices."}),(0,p.jsxs)(y,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(f,{children:"Default Currency"}),(0,p.jsx)(d.A,{type:"select",onSave:he,children:(0,p.jsx)(j,{value:M,onChange:e=>{return t=e.target.value,void O(t);var t},children:U.map(e=>{var t,n;return(0,p.jsxs)("option",{value:e,children:[null===(t=r[e])||void 0===t?void 0:t.symbol," ",e," - ",null===(n=r[e])||void 0===n?void 0:n.name]},e)})})}),(0,p.jsx)(z,{children:"Used as default for new subscriptions and invoices"})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(f,{children:"Supported Currencies"}),(0,p.jsx)(v,{onClick:()=>{J(U),H(!0)},children:U.length>0?U.map(e=>{var t;return(0,p.jsxs)(w,{children:[null===(t=r[e])||void 0===t?void 0:t.symbol," ",e]},e)}):(0,p.jsx)(A,{children:"Click to select currencies"})}),(0,p.jsx)(z,{children:"Currencies available for pricing plans and invoices"})]})]})]}),(0,p.jsxs)(u,{children:[(0,p.jsx)(g,{children:"Online Payment"}),(0,p.jsx)(m,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,p.jsxs)(k,{children:[(0,p.jsxs)(C,{children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"Stripe"}),(0,p.jsx)(B,{children:"Credit/Debit Card payments"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)($,{type:"checkbox",checked:Y.stripe.enabled,onChange:e=>{ae("enabled",e.target.checked),setTimeout(he,0)}}),(0,p.jsx)(T,{})]})]}),Y.stripe.enabled&&(0,p.jsxs)(D,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(f,{children:"Publishable Key"}),(0,p.jsx)(d.A,{onSave:he,children:(0,p.jsx)(P,{type:"text",placeholder:"pk_live_...",value:Y.stripe.publishableKey,onChange:e=>ae("publishableKey",e.target.value)})})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(f,{children:"Secret Key"}),(0,p.jsx)(d.A,{onSave:he,children:(0,p.jsx)(P,{type:"password",placeholder:"sk_live_...",value:Y.stripe.secretKey,onChange:e=>ae("secretKey",e.target.value)})})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(f,{children:"Webhook Secret"}),(0,p.jsx)(d.A,{onSave:he,children:(0,p.jsx)(P,{type:"password",placeholder:"whsec_...",value:Y.stripe.webhookSecret,onChange:e=>ae("webhookSecret",e.target.value)})})]}),(0,p.jsx)(b,{children:(0,p.jsxs)(I,{children:[(0,p.jsx)(N,{type:"checkbox",checked:Y.stripe.autoCharge,onChange:e=>{ae("autoCharge",e.target.checked),setTimeout(he,0)}}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,p.jsxs)(k,{children:[(0,p.jsxs)(C,{children:[(0,p.jsxs)(F,{children:[(0,p.jsx)(S,{children:"PayPal"}),(0,p.jsx)(B,{children:"PayPal account or card"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)($,{type:"checkbox",checked:Y.paypal.enabled,onChange:e=>{ie("enabled",e.target.checked),setTimeout(he,0)}}),(0,p.jsx)(T,{})]})]}),Y.paypal.enabled&&(0,p.jsxs)(D,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(f,{children:"Client ID"}),(0,p.jsx)(d.A,{onSave:he,children:(0,p.jsx)(P,{type:"text",placeholder:"Enter PayPal Client ID",value:Y.paypal.clientId,onChange:e=>ie("clientId",e.target.value)})})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(f,{children:"Client Secret"}),(0,p.jsx)(d.A,{onSave:he,children:(0,p.jsx)(P,{type:"password",placeholder:"Enter PayPal Client Secret",value:Y.paypal.clientSecret,onChange:e=>ie("clientSecret",e.target.value)})})]})]})]})]}),(0,p.jsxs)(u,{children:[(0,p.jsx)(g,{children:"Manual Payment"}),(0,p.jsx)(m,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===U.length?(0,p.jsx)(R,{children:"No currencies configured. Please add supported currencies above first."}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(o.tU,{children:U.map(e=>{var t;return(0,p.jsxs)(o.oz,{active:X===e,onClick:()=>Z(e),children:[null===(t=r[e])||void 0===t?void 0:t.symbol," ",e]},e)})}),(0,p.jsxs)(k,{children:[(0,p.jsxs)(C,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(S,{children:["Bank Transfer (",X,")"]}),(0,p.jsx)(B,{children:"Manual transfer with receipt upload"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)($,{type:"checkbox",checked:le(X).enabled,onChange:e=>{oe(X,"enabled",e.target.checked),setTimeout(he,0)}}),(0,p.jsx)(T,{})]})]}),le(X).enabled&&(0,p.jsxs)(D,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(f,{children:"Bank Name"}),(0,p.jsx)(d.A,{onSave:he,children:(0,p.jsx)(P,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:le(X).bankName,onChange:e=>oe(X,"bankName",e.target.value)})})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(f,{children:"Account Number"}),(0,p.jsx)(d.A,{onSave:he,children:(0,p.jsx)(P,{type:"text",placeholder:"Enter bank account number",value:le(X).accountNumber,onChange:e=>oe(X,"accountNumber",e.target.value)})})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(f,{children:"Account Name"}),(0,p.jsx)(d.A,{onSave:he,children:(0,p.jsx)(P,{type:"text",placeholder:"Enter account holder name",value:le(X).accountName,onChange:e=>oe(X,"accountName",e.target.value)})})]})]})]}),(0,p.jsxs)(k,{children:[(0,p.jsxs)(C,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(S,{children:["QR Payment (",X,")"]}),(0,p.jsx)(B,{children:"Scan QR code to pay (DuitNow, KakaoPay, etc.)"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)($,{type:"checkbox",checked:ce(X).enabled,onChange:e=>{se(X,"enabled",e.target.checked),setTimeout(he,0)}}),(0,p.jsx)(T,{})]})]}),ce(X).enabled&&(0,p.jsxs)(D,{children:[(0,p.jsx)(l.A,{value:ce(X).qrImage,onChange:e=>se(X,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${X} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,p.jsxs)(b,{style:{marginTop:"16px"},children:[(0,p.jsx)(f,{children:"Description"}),(0,p.jsx)(d.A,{onSave:he,children:(0,p.jsx)(P,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:ce(X).qrDescription,onChange:e=>se(X,"qrDescription",e.target.value)})}),(0,p.jsx)(z,{children:"Short description shown below the QR code"})]})]})]}),(0,p.jsxs)(g,{style:{fontSize:"15px",marginTop:"24px",marginBottom:"8px"},children:["Additional Charges (",X,")"]}),(0,p.jsxs)(m,{style:{marginBottom:"12px"},children:["Configure tax, service charge, etc. for ",X," invoices. Up to 3 items."]}),[0,1,2].map(e=>{const t=(r=X,Y.additionalCharges[r]||de)[e]||{enabled:!1,name:"",rate:0};var r;return(0,p.jsxs)(k,{style:{marginBottom:"12px"},children:[(0,p.jsxs)(C,{children:[(0,p.jsxs)(F,{children:[(0,p.jsxs)(S,{children:["Charge Item ",e+1]}),(0,p.jsx)(B,{children:t.enabled&&t.name?`${t.name} (${t.rate}%)`:"Not configured"})]}),(0,p.jsxs)(E,{children:[(0,p.jsx)($,{type:"checkbox",checked:t.enabled,onChange:t=>{pe(X,e,"enabled",t.target.checked),setTimeout(he,0)}}),(0,p.jsx)(T,{})]})]}),t.enabled&&(0,p.jsx)(D,{children:(0,p.jsxs)(y,{children:[(0,p.jsxs)(b,{children:[(0,p.jsx)(f,{children:"Item Name"}),(0,p.jsx)(d.A,{onSave:he,children:(0,p.jsx)(P,{type:"text",value:t.name,onChange:t=>pe(X,e,"name",t.target.value),placeholder:"e.g., SST, VAT, Service Charge"})}),(0,p.jsx)(z,{children:"Name displayed on invoices"})]}),(0,p.jsxs)(b,{children:[(0,p.jsx)(f,{children:"Rate (%)"}),(0,p.jsx)(d.A,{onSave:he,children:(0,p.jsx)(P,{type:"number",min:"0",max:"100",step:"0.01",value:t.rate,onChange:t=>pe(X,e,"rate",parseFloat(t.target.value)||0),placeholder:"0"})}),(0,p.jsx)(z,{children:"Percentage to add to subtotal"})]})]})})]},`charge-${X}-${e}`)})]})]})]})]}),(0,p.jsxs)(s.aF,{isOpen:L,onClose:()=>H(!1),title:"Select Supported Currencies",size:"medium",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(s.yl,{variant:"secondary",onClick:()=>H(!1),children:"Cancel"}),(0,p.jsxs)(s.yl,{variant:"primary",onClick:async()=>{if(t)try{const e=localStorage.getItem("auth_token");if(!(await fetch(`/api/foodcourts/${t}/payment-settings`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({supported_currencies:W})})).ok)throw new Error("Failed to update currencies");q(W),H(!1),!W.includes(M)&&W.length>0&&O(W[0]),W.length>0&&!W.includes(X)&&Z(W[0])}catch(e){console.error("Error updating supported currencies:",e)}},disabled:0===W.length,children:["Save (",W.length," selected)"]})]}),children:[(0,p.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select from the currencies enabled by System Administrator."}),0===Q.length?(0,p.jsx)("p",{style:{color:"#DC2626",padding:"16px",background:"#FEF2F2",borderRadius:"8px"},children:"No currencies have been configured by System Administrator yet."}):(0,p.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Q.map(e=>{const t=r[e];return t?(0,p.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(W.includes(e)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:W.includes(e)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,p.jsx)("input",{type:"checkbox",checked:W.includes(e),onChange:()=>(e=>{J(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(e),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,p.jsxs)("div",{children:[(0,p.jsxs)("div",{style:{fontWeight:500},children:[t.symbol," ",e]}),(0,p.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:t.name})]})]},e):null})})]})]})}}}]);