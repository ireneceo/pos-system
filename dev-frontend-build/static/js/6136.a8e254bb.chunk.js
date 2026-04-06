"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6136],{2435:(e,a,n)=>{n.d(a,{FS:()=>t});const t=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},4877:(e,a,n)=>{n.d(a,{A:()=>b});var t=n(9950),o=n(4752),i=n(4414);const r=o.Ay.div`
  margin-bottom: 16px;
`,s=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=o.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,c=o.Ay.div`
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
`,p=o.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,h=o.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,u=o.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,x=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=o.Ay.label`
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
`,m=o.Ay.button`
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
`,v=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",b=e=>{let{value:a,onChange:n,label:o="Logo Upload",helpText:b="Upload an image for your logo",maxSize:f=2,previewSize:A=150,showRemoveButton:k=!0,changeButtonText:w="Change Image",removeButtonText:C="Remove Image",imageAltText:B="Uploaded"}=e;const[S,F]=(0,t.useState)(!1),[N,z]=(0,t.useState)(!1),$=(0,t.useRef)(null),I=(0,t.useRef)(null),T=async e=>{try{const a=localStorage.getItem("auth_token"),n=await fetch(`${v()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({image:e})}),t=await n.json();return t.success?t.data.original:(console.error("Image upload failed:",t.message),null)}catch(a){return console.error("Image upload error:",a),null}},P=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*f*1024)return void alert(`Image size should be less than ${f}MB`);if(z(!0),"image/svg+xml"===e.type){const a=new FileReader;return a.onload=async e=>{var a;const t=null===(a=e.target)||void 0===a?void 0:a.result,o=await T(t);z(!1),o?n(o):alert("Failed to upload image. Please try again.")},void a.readAsDataURL(e)}const a=new FileReader;a.onload=async a=>{var t;const o=new Image;o.onload=async()=>{const a=document.createElement("canvas"),t=a.getContext("2d");if(!t)return void z(!1);const i=1200;let r=o.width,s=o.height;(r>i||s>i)&&(r>s?(s=s/r*i,r=i):(r=r/s*i,s=i)),a.width=r,a.height=s,t.drawImage(o,0,0,r,s);const l="image/png"===e.type?a.toDataURL("image/png"):a.toDataURL("image/jpeg",.85),d=await T(l);z(!1),d?n(d):alert("Failed to upload image. Please try again.")},o.src=null===(t=a.target)||void 0===t?void 0:t.result},a.readAsDataURL(e)},E=e=>{if(N)return;const a=e.target.files;a&&a.length>0&&P(a[0]),e.target.value=""};return(0,i.jsxs)(r,{children:[o&&(0,i.jsx)(s,{children:o}),b&&(0,i.jsx)(l,{children:b}),(0,i.jsxs)(d,{children:[(0,i.jsx)(c,{ref:I,isDragging:S,hasImage:!!a,isUploading:N,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),N||F(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===I.current&&F(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),F(!1),N)return;const a=e.dataTransfer.files;a&&a.length>0&&P(a[0])},onClick:()=>{var e;a||N||(null===(e=$.current)||void 0===e||e.click())},children:N?(0,i.jsxs)(p,{children:[(0,i.jsx)(j,{}),(0,i.jsx)(h,{style:{marginTop:"12px"},children:"Uploading..."})]}):a?(0,i.jsx)("img",{src:(D=a,D?D.startsWith("http")?D:D.startsWith("/uploads/")?`${v()}${D}`:D:""),alt:B}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:S?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(u,{children:["PNG, JPG, GIF up to ",f,"MB"]})]})}),a&&!N&&(0,i.jsxs)(x,{children:[(0,i.jsxs)(g,{disabled:N,children:[w,(0,i.jsx)("input",{ref:$,type:"file",accept:"image/*",onChange:E,disabled:N})]}),k&&(0,i.jsx)(m,{onClick:()=>{n("")},disabled:N,children:C})]})]}),!a&&!N&&(0,i.jsx)(y,{ref:$,type:"file",accept:"image/*",onChange:E})]});var D}},5370:(e,a,n)=>{n.d(a,{A:()=>b});var t=n(9950),o=n(4752),i=n(4414);const r=o.i7`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`,s=o.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,l=o.i7`
  to { transform: rotate(360deg); }
`,d=o.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,c=o.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?o.AH`${s} 0.3s ease forwards`:o.AH`${r} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=o.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,h=o.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,u=o.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,x=o.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,g=o.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,m=o.Ay.span`
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
`,y=o.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${l} 0.6s linear infinite;
`,j=o.Ay.span`
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
`,v=(0,t.forwardRef)((e,a)=>{let{children:n,onSave:o,type:r="input",debounceMs:s=2e3,style:l}=e;const[c,v]=(0,t.useState)("idle"),[b,f]=(0,t.useState)(!1),A=(0,t.useRef)(null),k=(0,t.useRef)(null),w=(0,t.useRef)(null),C=(0,t.useRef)(!0),B=(0,t.useRef)(o);B.current=o;const S=(0,t.useCallback)(()=>{A.current&&clearTimeout(A.current),k.current&&clearTimeout(k.current),w.current&&clearTimeout(w.current)},[]),F=2e3!==s?s:"toggle"===r||"select"===r||"list"===r||"image"===r?300:s,N=(0,t.useCallback)(()=>{S(),f(!1),A.current=setTimeout(async()=>{if(C.current){v("saving");try{if(await B.current(),!C.current)return;v("saved"),k.current=setTimeout(()=>{C.current&&(f(!0),w.current=setTimeout(()=>{C.current&&(v("idle"),f(!1))},300))},2e3)}catch{if(!C.current)return;v("error"),k.current=setTimeout(()=>{C.current&&(f(!0),w.current=setTimeout(()=>{C.current&&(v("idle"),f(!1))},300))},4e3)}}},F)},[F,S]);(0,t.useImperativeHandle)(a,()=>({triggerSave:N}),[N]),(0,t.useEffect)(()=>(C.current=!0,()=>{C.current=!1,S()}),[S]);const z=t.Children.map(n,e=>{if(!t.isValidElement(e))return e;const a=e.props.onChange;return"function"!==typeof a?e:t.cloneElement(e,{onChange:function(){a(...arguments),N()}})}),$="saving"===c?(0,i.jsx)(y,{}):"saved"===c?(0,i.jsx)(m,{children:"\u2713"}):"error"===c?(0,i.jsx)(j,{children:"!"}):null,I="select"===r?h:"toggle"===r?u:"image"===r?x:"list"===r?g:p;return(0,i.jsxs)(d,{$type:r,style:l,children:[z,"idle"!==c&&(0,i.jsx)(I,{$fading:b,children:$})]})});v.displayName="AutoSaveField";const b=v},6136:(e,a,n)=>{n.r(a),n.d(a,{default:()=>k});var t=n(9950),o=n(4752),i=n(1367),r=n(4877),s=n(8666),l=n(2435),d=n(5370),c=n(4414);const p=o.Ay.div`
  background: #FAFBFC;
  min-height: 100vh;
`,h=o.Ay.div`
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
`,u=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=o.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,g=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #F3F4F6;
`,y=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,j=o.Ay.div`
  grid-column: ${e=>e.fullWidth?"span 2":"span 1"};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`,v=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 8px;

  span {
    color: #DC2626;
    margin-left: 2px;
  }
`,b=o.Ay.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,f=o.Ay.select`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }
`,A=o.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;

  p {
    margin: 0;
    font-size: 14px;
    color: #075985;
    line-height: 1.5;
  }
`,k=()=>{const{user:e}=(0,i.As)(),[a,n]=(0,t.useState)({id:"",companyName:"",registrationNo:"",tradeName:"",address:"",city:"",state:"",postcode:"",country:"MY",phone:"",email:"",website:"",taxNo:"",bankName:"",bankAccount:"",bankAccountName:"",logoUrl:"",updatedAt:"",updatedBy:""});(0,t.useEffect)(()=>{o()},[]);const o=async()=>{try{const t=localStorage.getItem("auth_token");if(null!==e&&void 0!==e&&e.restaurantId){const o=await fetch(`/api/restaurants/${e.restaurantId}`,{headers:t?{Authorization:`Bearer ${t}`}:{}});if(o.ok){var a;const e=await o.json(),t=e.data||e,i={id:(null===(a=t.id)||void 0===a?void 0:a.toString())||"",companyName:t.name||"",registrationNo:t.business_registration||"",tradeName:t.trade_name||"",address:t.address||"",city:t.city||"",state:t.state||"",postcode:t.postal_code||"",country:t.country||"MY",phone:t.phone||"",email:t.email||"",website:t.website||"",taxNo:t.tax_id||"",bankName:t.bank_name||"",bankAccount:t.bank_account||"",bankAccountName:t.bank_account_name||"",logoUrl:t.logo_url||"",updatedAt:t.updatedAt||"",updatedBy:t.updated_by||""};n(i)}}}catch(t){console.error("Failed to load company information:",t)}},k=(e,a)=>{n(n=>({...n,[e]:a}))},w=async()=>{const n=localStorage.getItem("auth_token");if(null===e||void 0===e||!e.restaurantId)return;const t=await fetch(`/api/restaurants/${e.restaurantId}`,{method:"PUT",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{}},body:JSON.stringify({name:a.companyName,business_registration:a.registrationNo,trade_name:a.tradeName,address:a.address,city:a.city,state:a.state,postal_code:a.postcode,country:a.country,phone:a.phone,email:a.email,website:a.website,tax_id:a.taxNo,bank_name:a.bankName,bank_account:a.bankAccount,bank_account_name:a.bankAccountName,logo_url:a.logoUrl})});if(!t.ok){const e=await t.json().catch(()=>null);throw new Error((null===e||void 0===e?void 0:e.message)||t.statusText)}};return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(p,{children:[(0,c.jsx)(h,{children:(0,c.jsx)(u,{children:"Company Information"})}),(0,c.jsxs)(x,{children:[(0,c.jsx)(A,{children:(0,c.jsx)("p",{children:"Manage your restaurant's official business information. This information will be used for invoicing, legal documents, and official communications."})}),(0,c.jsxs)(g,{children:[(0,c.jsx)(m,{children:"Basic Information"}),(0,c.jsxs)(y,{children:[(0,c.jsxs)(j,{children:[(0,c.jsxs)(v,{children:["Company Name ",(0,c.jsx)("span",{children:"*"})]}),(0,c.jsx)(d.A,{onSave:w,children:(0,c.jsx)(b,{type:"text",value:a.companyName,onChange:e=>k("companyName",e.target.value),placeholder:"Legal entity name"})})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(v,{children:["Registration Number ",(0,c.jsx)("span",{children:"*"})]}),(0,c.jsx)(d.A,{onSave:w,children:(0,c.jsx)(b,{type:"text",value:a.registrationNo,onChange:e=>k("registrationNo",e.target.value),placeholder:"e.g., 202401234567"})})]}),(0,c.jsxs)(j,{children:[(0,c.jsx)(v,{children:"Trade Name / Brand Name"}),(0,c.jsx)(d.A,{onSave:w,children:(0,c.jsx)(b,{type:"text",value:a.tradeName||"",onChange:e=>k("tradeName",e.target.value),placeholder:"e.g., ABC Kitchen & Grill"})})]}),(0,c.jsxs)(j,{children:[(0,c.jsx)(v,{children:"Tax Number (SST/GST)"}),(0,c.jsx)(d.A,{onSave:w,children:(0,c.jsx)(b,{type:"text",value:a.taxNo||"",onChange:e=>k("taxNo",e.target.value),placeholder:"e.g., W10-1234-56789012"})})]}),(0,c.jsxs)(j,{children:[(0,c.jsx)(v,{children:"Website"}),(0,c.jsx)(d.A,{onSave:w,children:(0,c.jsx)(b,{type:"url",value:a.website||"",onChange:e=>k("website",e.target.value),placeholder:"www.example.com"})})]})]})]}),(0,c.jsxs)(g,{children:[(0,c.jsx)(m,{children:"Contact Information"}),(0,c.jsxs)(y,{children:[(0,c.jsxs)(j,{fullWidth:!0,children:[(0,c.jsxs)(v,{children:["Address ",(0,c.jsx)("span",{children:"*"})]}),(0,c.jsx)(d.A,{onSave:w,children:(0,c.jsx)(b,{type:"text",value:a.address,onChange:e=>k("address",e.target.value),placeholder:"Street address"})})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(v,{children:["City ",(0,c.jsx)("span",{children:"*"})]}),(0,c.jsx)(d.A,{onSave:w,children:(0,c.jsx)(b,{type:"text",value:a.city,onChange:e=>k("city",e.target.value),placeholder:"e.g., Kuala Lumpur"})})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(v,{children:["State ",(0,c.jsx)("span",{children:"*"})]}),(0,c.jsx)(d.A,{onSave:w,type:"select",children:(0,c.jsxs)(f,{value:a.state,onChange:e=>k("state",e.target.value),children:[(0,c.jsx)("option",{value:"",children:"Select State"}),(0,c.jsx)("option",{value:"Wilayah Persekutuan",children:"Wilayah Persekutuan"}),(0,c.jsx)("option",{value:"Selangor",children:"Selangor"}),(0,c.jsx)("option",{value:"Penang",children:"Penang"}),(0,c.jsx)("option",{value:"Johor",children:"Johor"}),(0,c.jsx)("option",{value:"Perak",children:"Perak"}),(0,c.jsx)("option",{value:"Kedah",children:"Kedah"}),(0,c.jsx)("option",{value:"Kelantan",children:"Kelantan"}),(0,c.jsx)("option",{value:"Melaka",children:"Melaka"}),(0,c.jsx)("option",{value:"Negeri Sembilan",children:"Negeri Sembilan"}),(0,c.jsx)("option",{value:"Pahang",children:"Pahang"}),(0,c.jsx)("option",{value:"Perlis",children:"Perlis"}),(0,c.jsx)("option",{value:"Sabah",children:"Sabah"}),(0,c.jsx)("option",{value:"Sarawak",children:"Sarawak"}),(0,c.jsx)("option",{value:"Terengganu",children:"Terengganu"})]})})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(v,{children:["Postcode ",(0,c.jsx)("span",{children:"*"})]}),(0,c.jsx)(d.A,{onSave:w,children:(0,c.jsx)(b,{type:"text",value:a.postcode,onChange:e=>k("postcode",e.target.value),placeholder:"e.g., 50250"})})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(v,{children:["Country ",(0,c.jsx)("span",{children:"*"})]}),(0,c.jsx)(d.A,{onSave:w,type:"select",children:(0,c.jsx)(f,{value:a.country,onChange:e=>k("country",e.target.value),children:l.FS.map(e=>(0,c.jsx)("option",{value:e.code,children:e.name},e.code))})})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(v,{children:["Phone ",(0,c.jsx)("span",{children:"*"})]}),(0,c.jsx)(d.A,{onSave:w,children:(0,c.jsx)(s.A,{value:a.phone,onChange:e=>k("phone",e),defaultCountry:a.country})})]}),(0,c.jsxs)(j,{children:[(0,c.jsxs)(v,{children:["Email ",(0,c.jsx)("span",{children:"*"})]}),(0,c.jsx)(d.A,{onSave:w,children:(0,c.jsx)(b,{type:"email",value:a.email,onChange:e=>k("email",e.target.value),placeholder:"contact@example.com"})})]})]})]}),(0,c.jsxs)(g,{children:[(0,c.jsx)(m,{children:"Banking Information"}),(0,c.jsxs)(y,{children:[(0,c.jsxs)(j,{children:[(0,c.jsx)(v,{children:"Bank Name"}),(0,c.jsx)(d.A,{onSave:w,type:"select",children:(0,c.jsxs)(f,{value:a.bankName||"",onChange:e=>k("bankName",e.target.value),children:[(0,c.jsx)("option",{value:"",children:"Select Bank"}),(0,c.jsx)("option",{value:"Maybank",children:"Maybank"}),(0,c.jsx)("option",{value:"CIMB Bank",children:"CIMB Bank"}),(0,c.jsx)("option",{value:"Public Bank",children:"Public Bank"}),(0,c.jsx)("option",{value:"RHB Bank",children:"RHB Bank"}),(0,c.jsx)("option",{value:"Hong Leong Bank",children:"Hong Leong Bank"}),(0,c.jsx)("option",{value:"AmBank",children:"AmBank"}),(0,c.jsx)("option",{value:"UOB",children:"UOB"}),(0,c.jsx)("option",{value:"OCBC Bank",children:"OCBC Bank"}),(0,c.jsx)("option",{value:"HSBC",children:"HSBC"}),(0,c.jsx)("option",{value:"Standard Chartered",children:"Standard Chartered"}),(0,c.jsx)("option",{value:"Bank Islam",children:"Bank Islam"}),(0,c.jsx)("option",{value:"Bank Rakyat",children:"Bank Rakyat"})]})})]}),(0,c.jsxs)(j,{children:[(0,c.jsx)(v,{children:"Account Number"}),(0,c.jsx)(d.A,{onSave:w,children:(0,c.jsx)(b,{type:"text",value:a.bankAccount||"",onChange:e=>k("bankAccount",e.target.value),placeholder:"e.g., 514123456789"})})]}),(0,c.jsxs)(j,{fullWidth:!0,children:[(0,c.jsx)(v,{children:"Account Name"}),(0,c.jsx)(d.A,{onSave:w,children:(0,c.jsx)(b,{type:"text",value:a.bankAccountName||"",onChange:e=>k("bankAccountName",e.target.value),placeholder:"Account holder name (must match company name)"})})]})]})]}),(0,c.jsxs)(g,{children:[(0,c.jsx)(m,{children:"Company Logo"}),(0,c.jsx)(d.A,{onSave:w,type:"image",children:(0,c.jsx)(r.A,{value:a.logoUrl||"",onChange:e=>{n(a=>({...a,logoUrl:e}))},label:"",helpText:"Upload your company logo for use in invoices and official documents"})})]})]})]})})}}}]);