"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9640],{4877:(e,t,r)=>{r.d(t,{A:()=>j});var n=r(9950),a=r(4752),i=r(4414);const o=a.Ay.div`
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
`,f=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",j=e=>{let{value:t,onChange:r,label:a="Logo Upload",helpText:j="Upload an image for your logo",maxSize:v=2,previewSize:w=150,showRemoveButton:C=!0,changeButtonText:k="Change Image",removeButtonText:A="Remove Image",imageAltText:F="Uploaded"}=e;const[S,B]=(0,n.useState)(!1),[E,T]=(0,n.useState)(!1),$=(0,n.useRef)(null),P=(0,n.useRef)(null),z=async e=>{try{const t=localStorage.getItem("auth_token"),r=await fetch(`${f()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),n=await r.json();return n.success?n.data.original:(console.error("Image upload failed:",n.message),null)}catch(t){return console.error("Image upload error:",t),null}},D=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);if(T(!0),"image/svg+xml"===e.type){const t=new FileReader;return t.onload=async e=>{var t;const n=null===(t=e.target)||void 0===t?void 0:t.result,a=await z(n);T(!1),a?r(a):alert("Failed to upload image. Please try again.")},void t.readAsDataURL(e)}const t=new FileReader;t.onload=async t=>{var n;const a=new Image;a.onload=async()=>{const t=document.createElement("canvas"),n=t.getContext("2d");if(!n)return void T(!1);const i=1200;let o=a.width,s=a.height;(o>i||s>i)&&(o>s?(s=s/o*i,o=i):(o=o/s*i,s=i)),t.width=o,t.height=s,n.drawImage(a,0,0,o,s);const l="image/png"===e.type?t.toDataURL("image/png"):t.toDataURL("image/jpeg",.85),c=await z(l);T(!1),c?r(c):alert("Failed to upload image. Please try again.")},a.src=null===(n=t.target)||void 0===n?void 0:n.result},t.readAsDataURL(e)},I=e=>{if(E)return;const t=e.target.files;t&&t.length>0&&D(t[0]),e.target.value=""};return(0,i.jsxs)(o,{children:[a&&(0,i.jsx)(s,{children:a}),j&&(0,i.jsx)(l,{children:j}),(0,i.jsxs)(c,{children:[(0,i.jsx)(d,{ref:P,isDragging:S,hasImage:!!t,isUploading:E,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),E||B(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===P.current&&B(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),B(!1),E)return;const t=e.dataTransfer.files;t&&t.length>0&&D(t[0])},onClick:()=>{var e;t||E||(null===(e=$.current)||void 0===e||e.click())},children:E?(0,i.jsxs)(p,{children:[(0,i.jsx)(b,{}),(0,i.jsx)(h,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,i.jsx)("img",{src:(R=t,R?R.startsWith("http")?R:R.startsWith("/uploads/")?`${f()}${R}`:R:""),alt:F}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:S?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(x,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),t&&!E&&(0,i.jsxs)(u,{children:[(0,i.jsxs)(g,{disabled:E,children:[k,(0,i.jsx)("input",{ref:$,type:"file",accept:"image/*",onChange:I,disabled:E})]}),C&&(0,i.jsx)(m,{onClick:()=>{r("")},disabled:E,children:A})]})]}),!t&&!E&&(0,i.jsx)(y,{ref:$,type:"file",accept:"image/*",onChange:I})]});var R}},5370:(e,t,r)=>{r.d(t,{A:()=>j});var n=r(9950),a=r(4752),i=r(4414);const o=a.i7`
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
`,f=(0,n.forwardRef)((e,t)=>{let{children:r,onSave:a,type:o="input",debounceMs:s=2e3,style:l}=e;const[d,f]=(0,n.useState)("idle"),[j,v]=(0,n.useState)(!1),w=(0,n.useRef)(null),C=(0,n.useRef)(null),k=(0,n.useRef)(null),A=(0,n.useRef)(!0),F=(0,n.useRef)(a);F.current=a;const S=(0,n.useCallback)(()=>{w.current&&clearTimeout(w.current),C.current&&clearTimeout(C.current),k.current&&clearTimeout(k.current)},[]),B=2e3!==s?s:"toggle"===o||"select"===o||"list"===o||"image"===o?300:s,E=(0,n.useCallback)(()=>{S(),v(!1),w.current=setTimeout(async()=>{if(A.current){f("saving");try{if(await F.current(),!A.current)return;f("saved"),C.current=setTimeout(()=>{A.current&&(v(!0),k.current=setTimeout(()=>{A.current&&(f("idle"),v(!1))},300))},2e3)}catch{if(!A.current)return;f("error"),C.current=setTimeout(()=>{A.current&&(v(!0),k.current=setTimeout(()=>{A.current&&(f("idle"),v(!1))},300))},4e3)}}},B)},[B,S]);(0,n.useImperativeHandle)(t,()=>({triggerSave:E}),[E]),(0,n.useEffect)(()=>(A.current=!0,()=>{A.current=!1,S()}),[S]);const T=n.Children.map(r,e=>{if(!n.isValidElement(e))return e;const t=e.props.onChange;return"function"!==typeof t?e:n.cloneElement(e,{onChange:function(){t(...arguments),E()}})}),$="saving"===d?(0,i.jsx)(y,{}):"saved"===d?(0,i.jsx)(m,{children:"\u2713"}):"error"===d?(0,i.jsx)(b,{children:"!"}):null,P="select"===o?h:"toggle"===o?x:"image"===o?u:"list"===o?g:p;return(0,i.jsxs)(c,{$type:o,style:l,children:[T,"idle"!==d&&(0,i.jsx)(P,{$fading:j,children:$})]})});f.displayName="AutoSaveField";const j=f},8012:(e,t,r)=>{r.d(t,{Ay:()=>l});r(9950);var n=r(4752),a=r(4414);const i=n.Ay.div`
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
`,l=e=>{let{title:t,children:r}=e;return(0,a.jsxs)(i,{children:[(0,a.jsx)(o,{children:t}),r&&(0,a.jsx)(s,{children:r})]})}},9640:(e,t,r)=>{r.r(t),r.d(t,{default:()=>q});var n=r(9950),a=r(4752),i=r(8012),o=r(9610),s=r(4877),l=r(5370),c=r(4414);const d=a.Ay.div`
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
`,j=a.Ay.span`
  background: #F3F4F6;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
`,v=a.Ay.span`
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
`,k=a.Ay.div``,A=a.Ay.div`
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
`,T=a.Ay.div`
  border-top: 1px solid #E6EBF1;
  margin-top: 16px;
  padding-top: 16px;
`,$=a.Ay.input`
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
`,P=a.Ay.p`
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
`,D=a.Ay.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`,I=a.Ay.div`
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
`,N=a.Ay.div`
  background: #FEF3C7;
  border: 1px solid #F59E0B;
  border-radius: 8px;
  padding: 16px;
  color: #92400E;
`,U={stripe:{enabled:!1,publishableKey:"",secretKey:"",webhookSecret:"",autoCharge:!1},paypal:{enabled:!1,clientId:"",clientSecret:""},bankTransfer:{},qrPayment:{},additionalCharges:{}},q=()=>{const[e,t]=(0,n.useState)({}),[r,a]=(0,n.useState)([]),[q,O]=(0,n.useState)("MYR"),[_,Q]=(0,n.useState)(!1),[K,M]=(0,n.useState)([]),[L,H]=(0,n.useState)({}),[J,W]=(0,n.useState)([]),[Y,G]=(0,n.useState)(!1),[V,X]=(0,n.useState)([]),[Z,ee]=(0,n.useState)(U),te=(0,n.useRef)(U),[re,ne]=(0,n.useState)(""),[ae,ie]=(0,n.useState)(!0);(0,n.useEffect)(()=>{oe()},[]),(0,n.useEffect)(()=>{r.length>0&&!re&&ne(r[0])},[r,re]);const oe=async()=>{try{const e={Authorization:`Bearer ${localStorage.getItem("auth_token")}`},[r,n,i,o,s]=await Promise.all([fetch("/api/currencies/config"),fetch("/api/currencies/supported"),fetch("/api/admin/payment-settings",{headers:e}),fetch("/api/currencies/countries/config"),fetch("/api/currencies/countries/supported")]);if(r.ok){const e=await r.json();e.success&&e.currencies&&(t(e.currencies),e.defaultCurrency&&O(e.defaultCurrency))}if(n.ok){const e=await n.json();if(e.success&&e.data){const t=e.data.map(e=>e.code);a(t),t.length>0&&ne(t[0])}}if(i.ok){const e=await i.json();if(e&&Object.keys(e).length>0){let t=e.additionalCharges||{};Array.isArray(t)&&(t={});const r={...U,...e,bankTransfer:e.bankTransfer||{},qrPayment:e.qrPayment||{},additionalCharges:t};te.current=r,ee(r)}}if(o.ok){const e=await o.json();if(e.success&&e.data){const t={};e.data.forEach(e=>{t[e.code]={name:e.name,currency:e.currency,flag:e.flag}}),H(t)}}if(s.ok){const e=await s.json();e.success&&e.data&&W(e.data.map(e=>e.code))}}catch(e){console.error("Error loading settings:",e)}finally{ie(!1)}},se=async e=>{try{const t=localStorage.getItem("auth_token");(await fetch("/api/currencies/default",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({defaultCurrency:e})})).ok&&O(e)}catch(t){console.error("Error updating default currency:",t)}},le=e=>{ee(t=>{const r=e(t);return te.current=r,r})},ce=(e,t)=>{le(r=>({...r,stripe:{...r.stripe,[e]:t}}))},de=(e,t)=>{le(r=>({...r,paypal:{...r.paypal,[e]:t}}))},pe=(e,t,r)=>{le(n=>({...n,bankTransfer:{...n.bankTransfer,[e]:{enabled:!1,bankName:"",accountNumber:"",accountName:"",...n.bankTransfer[e],[t]:r}}}))},he=(e,t,r)=>{le(n=>({...n,qrPayment:{...n.qrPayment,[e]:{enabled:!1,qrImage:"",qrDescription:"",...n.qrPayment[e],[t]:r}}}))},xe=e=>Z.bankTransfer[e]||{enabled:!1,bankName:"",accountNumber:"",accountName:""},ue=e=>Z.qrPayment[e]||{enabled:!1,qrImage:"",qrDescription:""},ge=[{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0},{enabled:!1,name:"",rate:0}],me=(e,t,r,n)=>{le(a=>{const i=[...a.additionalCharges[e]||ge];return i[t]={...i[t],[r]:n},{...a,additionalCharges:{...a.additionalCharges,[e]:i}}})},ye=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/admin/payment-settings",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(te.current)}),r=await t.json();if(!t.ok)throw new Error(r.error||r.details||"Failed to save")}catch(e){throw console.error("Error saving payment settings:",e),e}};return ae?(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(d,{children:[(0,c.jsx)(i.Ay,{title:"Payment Settings"}),(0,c.jsx)(p,{children:(0,c.jsx)("p",{children:"Loading..."})})]})}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(d,{children:[(0,c.jsx)(i.Ay,{title:"Payment Settings"}),(0,c.jsxs)(p,{children:[(0,c.jsxs)(h,{children:[(0,c.jsx)(x,{children:"Currency Settings"}),(0,c.jsx)(u,{children:"Configure supported currencies for subscription plans and invoices."}),(0,c.jsxs)(g,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Default Currency"}),(0,c.jsx)(b,{value:q,onChange:e=>se(e.target.value),children:r.map(t=>{var r,n;return(0,c.jsxs)("option",{value:t,children:[null===(r=e[t])||void 0===r?void 0:r.symbol," ",t," - ",null===(n=e[t])||void 0===n?void 0:n.name]},t)})}),(0,c.jsx)(P,{children:"Used as default for new subscriptions and invoices"})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Supported Currencies"}),(0,c.jsx)(f,{onClick:()=>{M(r),Q(!0)},children:r.length>0?r.map(t=>{var r;return(0,c.jsxs)(j,{children:[null===(r=e[t])||void 0===r?void 0:r.symbol," ",t]},t)}):(0,c.jsx)(v,{children:"Click to select currencies"})}),(0,c.jsx)(P,{children:"Currencies available for pricing plans and invoices"})]})]}),(0,c.jsx)(g,{children:(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Supported Countries"}),(0,c.jsx)(f,{onClick:()=>{X(J),G(!0)},children:J.length>0?J.map(e=>{var t,r;return(0,c.jsxs)(j,{children:[null===(t=L[e])||void 0===t?void 0:t.flag," ",(null===(r=L[e])||void 0===r?void 0:r.name)||e]},e)}):(0,c.jsx)(v,{children:"Click to select countries"})}),(0,c.jsx)(P,{children:"Countries where hardware products are available for sale"})]})})]}),(0,c.jsxs)(h,{children:[(0,c.jsx)(x,{children:"Online Payment"}),(0,c.jsx)(u,{children:"Configure online payment gateways. These settings apply to all currencies."}),(0,c.jsxs)(w,{children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(k,{children:[(0,c.jsx)(A,{children:"Stripe"}),(0,c.jsx)(F,{children:"Credit/Debit Card payments"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(B,{type:"checkbox",checked:Z.stripe.enabled,onChange:e=>{ce("enabled",e.target.checked),setTimeout(ye,0)}}),(0,c.jsx)(E,{})]})]}),Z.stripe.enabled&&(0,c.jsxs)(T,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Publishable Key"}),(0,c.jsx)(l.A,{onSave:ye,children:(0,c.jsx)($,{type:"text",placeholder:"pk_live_...",value:Z.stripe.publishableKey,onChange:e=>ce("publishableKey",e.target.value)})})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Secret Key"}),(0,c.jsx)(l.A,{onSave:ye,children:(0,c.jsx)($,{type:"password",placeholder:"sk_live_...",value:Z.stripe.secretKey,onChange:e=>ce("secretKey",e.target.value)})})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Webhook Secret"}),(0,c.jsx)(l.A,{onSave:ye,children:(0,c.jsx)($,{type:"password",placeholder:"whsec_...",value:Z.stripe.webhookSecret,onChange:e=>ce("webhookSecret",e.target.value)})})]}),(0,c.jsx)(m,{children:(0,c.jsxs)(z,{children:[(0,c.jsx)(D,{type:"checkbox",checked:Z.stripe.autoCharge,onChange:e=>{ce("autoCharge",e.target.checked),setTimeout(ye,0)}}),"Enable auto-charge for subscription renewals"]})})]})]}),(0,c.jsxs)(w,{children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(k,{children:[(0,c.jsx)(A,{children:"PayPal"}),(0,c.jsx)(F,{children:"PayPal account or card"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(B,{type:"checkbox",checked:Z.paypal.enabled,onChange:e=>{de("enabled",e.target.checked),setTimeout(ye,0)}}),(0,c.jsx)(E,{})]})]}),Z.paypal.enabled&&(0,c.jsxs)(T,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Client ID"}),(0,c.jsx)(l.A,{onSave:ye,children:(0,c.jsx)($,{type:"text",placeholder:"Enter PayPal Client ID",value:Z.paypal.clientId,onChange:e=>de("clientId",e.target.value)})})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Client Secret"}),(0,c.jsx)(l.A,{onSave:ye,children:(0,c.jsx)($,{type:"password",placeholder:"Enter PayPal Client Secret",value:Z.paypal.clientSecret,onChange:e=>de("clientSecret",e.target.value)})})]})]})]})]}),(0,c.jsxs)(h,{children:[(0,c.jsx)(x,{children:"Manual Payment"}),(0,c.jsx)(u,{children:"Configure bank transfer and QR payment for each currency. Different currencies require different bank accounts and QR codes."}),0===r.length?(0,c.jsx)(N,{children:"No currencies configured. Please add supported currencies above first."}):(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(I,{children:r.map(t=>{var r;return(0,c.jsxs)(R,{active:re===t,onClick:()=>ne(t),children:[null===(r=e[t])||void 0===r?void 0:r.symbol," ",t]},t)})}),(0,c.jsxs)(w,{children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(k,{children:[(0,c.jsxs)(A,{children:["Bank Transfer (",re,")"]}),(0,c.jsx)(F,{children:"Manual transfer with receipt upload"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(B,{type:"checkbox",checked:xe(re).enabled,onChange:e=>{pe(re,"enabled",e.target.checked),setTimeout(ye,0)}}),(0,c.jsx)(E,{})]})]}),xe(re).enabled&&(0,c.jsxs)(T,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Bank Name"}),(0,c.jsx)(l.A,{onSave:ye,children:(0,c.jsx)($,{type:"text",placeholder:"e.g., Maybank, CIMB, Shinhan Bank",value:xe(re).bankName,onChange:e=>pe(re,"bankName",e.target.value)})})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Account Number"}),(0,c.jsx)(l.A,{onSave:ye,children:(0,c.jsx)($,{type:"text",placeholder:"Enter bank account number",value:xe(re).accountNumber,onChange:e=>pe(re,"accountNumber",e.target.value)})})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Account Name"}),(0,c.jsx)(l.A,{onSave:ye,children:(0,c.jsx)($,{type:"text",placeholder:"Enter account holder name",value:xe(re).accountName,onChange:e=>pe(re,"accountName",e.target.value)})})]})]})]}),(0,c.jsxs)(w,{children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(k,{children:[(0,c.jsxs)(A,{children:["QR Payment (",re,")"]}),(0,c.jsx)(F,{children:"Scan QR code to pay (DuitNow, KakaoPay, etc.)"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(B,{type:"checkbox",checked:ue(re).enabled,onChange:e=>{he(re,"enabled",e.target.checked),setTimeout(ye,0)}}),(0,c.jsx)(E,{})]})]}),ue(re).enabled&&(0,c.jsxs)(T,{children:[(0,c.jsx)(s.A,{value:ue(re).qrImage,onChange:e=>he(re,"qrImage",e),label:"QR Code Image",helpText:`Upload QR code for ${re} payments`,changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"Payment QR Code"}),(0,c.jsxs)(m,{style:{marginTop:"16px"},children:[(0,c.jsx)(y,{children:"Description"}),(0,c.jsx)(l.A,{onSave:ye,children:(0,c.jsx)($,{type:"text",placeholder:"e.g., Scan to pay via DuitNow",value:ue(re).qrDescription,onChange:e=>he(re,"qrDescription",e.target.value)})}),(0,c.jsx)(P,{children:"Short description shown below the QR code"})]})]})]}),(0,c.jsxs)(x,{style:{fontSize:"15px",marginTop:"24px",marginBottom:"8px"},children:["Additional Charges (",re,")"]}),(0,c.jsxs)(u,{style:{marginBottom:"12px"},children:["Configure tax, service charge, etc. for ",re," invoices. Up to 3 items."]}),[0,1,2].map(e=>{const t=(r=re,Z.additionalCharges[r]||ge)[e]||{enabled:!1,name:"",rate:0};var r;return(0,c.jsxs)(w,{style:{marginBottom:"12px"},children:[(0,c.jsxs)(C,{children:[(0,c.jsxs)(k,{children:[(0,c.jsxs)(A,{children:["Charge Item ",e+1]}),(0,c.jsx)(F,{children:t.enabled&&t.name?`${t.name} (${t.rate}%)`:"Not configured"})]}),(0,c.jsxs)(S,{children:[(0,c.jsx)(B,{type:"checkbox",checked:t.enabled,onChange:t=>{me(re,e,"enabled",t.target.checked),setTimeout(ye,0)}}),(0,c.jsx)(E,{})]})]}),t.enabled&&(0,c.jsx)(T,{children:(0,c.jsxs)(g,{children:[(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Item Name"}),(0,c.jsx)(l.A,{onSave:ye,children:(0,c.jsx)($,{type:"text",value:t.name,onChange:t=>me(re,e,"name",t.target.value),placeholder:"e.g., SST, VAT, Service Charge"})}),(0,c.jsx)(P,{children:"Name displayed on invoices"})]}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{children:"Rate (%)"}),(0,c.jsx)(l.A,{onSave:ye,children:(0,c.jsx)($,{type:"number",min:"0",max:"100",step:"0.01",value:t.rate,onChange:t=>me(re,e,"rate",parseFloat(t.target.value)||0),placeholder:"0"})}),(0,c.jsx)(P,{children:"Percentage to add to subtotal"})]})]})})]},`charge-${re}-${e}`)})]})]})]})]}),(0,c.jsxs)(o.aF,{isOpen:_,onClose:()=>Q(!1),title:"Select Supported Currencies",size:"medium",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o.yl,{variant:"secondary",onClick:()=>Q(!1),children:"Cancel"}),(0,c.jsxs)(o.yl,{variant:"primary",onClick:async()=>{try{const e=localStorage.getItem("auth_token");(await fetch("/api/currencies/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currencies:K})})).ok&&(a(K),Q(!1),!K.includes(q)&&K.length>0&&await se(K[0]),K.length>0&&!K.includes(re)&&ne(K[0]))}catch(e){console.error("Error updating supported currencies:",e)}},disabled:0===K.length,children:["Save (",K.length," selected)"]})]}),children:[(0,c.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the currencies you want to support for subscription plans and invoices."}),(0,c.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(e).map(e=>{let[t,r]=e;return(0,c.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(K.includes(t)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:K.includes(t)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,c.jsx)("input",{type:"checkbox",checked:K.includes(t),onChange:()=>(e=>{M(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(t),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{style:{fontWeight:500},children:[r.symbol," ",t]}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:r.name})]})]},t)})})]}),(0,c.jsxs)(o.aF,{isOpen:Y,onClose:()=>G(!1),title:"Select Supported Countries",size:"medium",footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o.yl,{variant:"secondary",onClick:()=>G(!1),children:"Cancel"}),(0,c.jsxs)(o.yl,{variant:"primary",onClick:async()=>{try{const e=localStorage.getItem("auth_token");(await fetch("/api/currencies/countries/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({countries:V})})).ok&&(W(V),G(!1))}catch(e){console.error("Error updating supported countries:",e)}},disabled:0===V.length,children:["Save (",V.length," selected)"]})]}),children:[(0,c.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the countries where you sell hardware products. These will be shown on the Packages page and available in product settings."}),(0,c.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(L).map(e=>{let[t,r]=e;return(0,c.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+(V.includes(t)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:V.includes(t)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,c.jsx)("input",{type:"checkbox",checked:V.includes(t),onChange:()=>(e=>{X(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])})(t),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{style:{fontWeight:500},children:[r.flag," ",r.name]}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:r.currency})]})]},t)})})]})]})}}}]);