"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1513],{1513:(e,a,n)=>{n.r(a),n.d(a,{default:()=>f});var t=n(9950),o=n(4752),i=n(2435),r=n(8666),s=n(4877),l=n(5370),d=n(4414);const c=[{value:"Asia/Kuala_Lumpur",label:"Malaysia (GMT+8)"},{value:"Asia/Singapore",label:"Singapore (GMT+8)"},{value:"Asia/Bangkok",label:"Thailand (GMT+7)"},{value:"Asia/Jakarta",label:"Indonesia - Jakarta (GMT+7)"},{value:"Asia/Ho_Chi_Minh",label:"Vietnam (GMT+7)"},{value:"Asia/Manila",label:"Philippines (GMT+8)"},{value:"Asia/Tokyo",label:"Japan (GMT+9)"},{value:"Asia/Seoul",label:"South Korea (GMT+9)"},{value:"Asia/Shanghai",label:"China (GMT+8)"},{value:"Asia/Hong_Kong",label:"Hong Kong (GMT+8)"},{value:"Asia/Taipei",label:"Taiwan (GMT+8)"},{value:"Asia/Dubai",label:"UAE (GMT+4)"},{value:"Europe/London",label:"UK (GMT+0/+1)"},{value:"America/New_York",label:"US Eastern (GMT-5/-4)"},{value:"America/Los_Angeles",label:"US Pacific (GMT-8/-7)"},{value:"Australia/Sydney",label:"Australia - Sydney (GMT+10/+11)"}],p=o.Ay.div`
  background: #FAFBFC;
  min-height: 100vh;
`,h=o.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,u=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,g=o.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,x=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  margin-bottom: 24px;
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
`,v=o.Ay.div`
  grid-column: ${e=>e.fullWidth?"span 2":"span 1"};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`,b=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;

  span {
    color: #DC2626;
    margin-left: 2px;
  }
`,j=o.Ay.input`
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

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
  }
`,A=o.Ay.select`
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
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,f=()=>{const[e,a]=(0,t.useState)({companyName:"",registrationNo:"",tradeName:"",address:"",city:"",state:"",postalCode:"",country:"MY",phone:"",email:"",website:"",taxNo:"",bankName:"",bankAccount:"",bankAccountName:"",logoUrl:"",operationSettings:{openingTime:"09:00",closingTime:"22:00",timeZone:"Asia/Kuala_Lumpur"}});(0,t.useEffect)(()=>{n()},[]);const n=async()=>{try{const o=localStorage.getItem("auth_token"),i=await fetch("/api/foodcourts/company-info",{headers:{Authorization:`Bearer ${o}`}});if(i.ok){const o=await i.json();var e,n,t;if(o)a({companyName:o.company_name||o.name||"",registrationNo:o.registration_no||"",tradeName:o.trade_name||"",address:o.address||"",city:o.city||"",state:o.state||"",postalCode:o.postal_code||"",country:o.country||"MY",phone:o.phone||"",email:o.email||"",website:o.website||"",taxNo:o.tax_no||"",bankName:o.bank_name||"",bankAccount:o.bank_account||"",bankAccountName:o.bank_account_name||"",logoUrl:o.logo_url||"",operationSettings:{openingTime:(null===(e=o.operation_settings)||void 0===e?void 0:e.openingTime)||"09:00",closingTime:(null===(n=o.operation_settings)||void 0===n?void 0:n.closingTime)||"22:00",timeZone:(null===(t=o.operation_settings)||void 0===t?void 0:t.timeZone)||"Asia/Kuala_Lumpur"}})}}catch(o){console.error("Error fetching company info:",o)}},o=(e,n)=>{a(a=>({...a,[e]:n}))},f=(e,n)=>{a(a=>({...a,operationSettings:{...a.operationSettings,[e]:n}}))},C=async()=>{const a=localStorage.getItem("auth_token");if(!(await fetch("/api/foodcourts/company-info",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({company_name:e.companyName,registration_no:e.registrationNo,trade_name:e.tradeName,address:e.address,city:e.city,state:e.state,postal_code:e.postalCode,country:e.country,phone:e.phone,email:e.email,website:e.website,tax_no:e.taxNo,bank_name:e.bankName,bank_account:e.bankAccount,bank_account_name:e.bankAccountName,logo_url:e.logoUrl,operation_settings:e.operationSettings})})).ok)throw new Error("Failed to save")};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(p,{children:[(0,d.jsx)(h,{children:(0,d.jsx)(u,{children:"Company Information"})}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Basic Information"}),(0,d.jsxs)(y,{children:[(0,d.jsxs)(v,{children:[(0,d.jsxs)(b,{children:["Company Name ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"text",value:e.companyName,onChange:e=>o("companyName",e.target.value),placeholder:"Enter company name"})})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Registration No."}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"text",value:e.registrationNo,onChange:e=>o("registrationNo",e.target.value),placeholder:"e.g., 202001234567"})})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Trade Name"}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"text",value:e.tradeName,onChange:e=>o("tradeName",e.target.value),placeholder:"Trading as..."})})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Tax No. (SST/GST)"}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"text",value:e.taxNo,onChange:e=>o("taxNo",e.target.value),placeholder:"e.g., W10-1234-56789012"})})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Address"}),(0,d.jsxs)(y,{children:[(0,d.jsxs)(v,{fullWidth:!0,children:[(0,d.jsxs)(b,{children:["Street Address ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"text",value:e.address,onChange:e=>o("address",e.target.value),placeholder:"Enter street address"})})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"City"}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"text",value:e.city,onChange:e=>o("city",e.target.value),placeholder:"e.g., Kuala Lumpur"})})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"State"}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"text",value:e.state,onChange:e=>o("state",e.target.value),placeholder:"e.g., Wilayah Persekutuan"})})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Postal Code"}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"text",value:e.postalCode,onChange:e=>o("postalCode",e.target.value),placeholder:"e.g., 50000"})})]}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(b,{children:["Country ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(l.A,{onSave:C,type:"select",children:(0,d.jsx)(A,{value:e.country,onChange:e=>o("country",e.target.value),children:i.FS.map(e=>(0,d.jsx)("option",{value:e.code,children:e.name},e.code))})})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Contact Information"}),(0,d.jsxs)(y,{children:[(0,d.jsxs)(v,{children:[(0,d.jsxs)(b,{children:["Phone ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(r.A,{value:e.phone,onChange:e=>o("phone",e),defaultCountry:e.country})})]}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(b,{children:["Email ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"email",value:e.email,onChange:e=>o("email",e.target.value),placeholder:"company@example.com"})})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Website"}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"url",value:e.website,onChange:e=>o("website",e.target.value),placeholder:"https://www.example.com"})})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Banking Information"}),(0,d.jsxs)(y,{children:[(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Bank Name"}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"text",value:e.bankName,onChange:e=>o("bankName",e.target.value),placeholder:"e.g., Maybank"})})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Account Number"}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"text",value:e.bankAccount,onChange:e=>o("bankAccount",e.target.value),placeholder:"e.g., 1234567890"})})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Account Name"}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"text",value:e.bankAccountName,onChange:e=>o("bankAccountName",e.target.value),placeholder:"Account holder name"})})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Operation Settings"}),(0,d.jsxs)(y,{children:[(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Opening Time"}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"time",value:e.operationSettings.openingTime,onChange:e=>f("openingTime",e.target.value)})})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Closing Time"}),(0,d.jsx)(l.A,{onSave:C,children:(0,d.jsx)(j,{type:"time",value:e.operationSettings.closingTime,onChange:e=>f("closingTime",e.target.value)})})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(b,{children:"Timezone"}),(0,d.jsx)(l.A,{onSave:C,type:"select",children:(0,d.jsx)(A,{value:e.operationSettings.timeZone,onChange:e=>f("timeZone",e.target.value),children:c.map(e=>(0,d.jsx)("option",{value:e.value,children:e.label},e.value))})})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Company Logo"}),(0,d.jsx)(l.A,{onSave:C,type:"image",children:(0,d.jsx)(s.A,{value:e.logoUrl,onChange:e=>o("logoUrl",e),imageAltText:"Company Logo"})})]})]})]})})}},2435:(e,a,n)=>{n.d(a,{FS:()=>t});const t=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},4877:(e,a,n)=>{n.d(a,{A:()=>j});var t=n(9950),o=n(4752),i=n(4414);const r=o.Ay.div`
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
`,g=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,x=o.Ay.label`
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
`,v=o.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,b=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",j=e=>{let{value:a,onChange:n,label:o="Logo Upload",helpText:j="Upload an image for your logo",maxSize:A=2,previewSize:f=150,showRemoveButton:C=!0,changeButtonText:w="Change Image",removeButtonText:k="Remove Image",imageAltText:S="Uploaded"}=e;const[T,F]=(0,t.useState)(!1),[N,_]=(0,t.useState)(!1),z=(0,t.useRef)(null),B=(0,t.useRef)(null),$=async e=>{try{const a=localStorage.getItem("auth_token"),n=await fetch(`${b()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({image:e})}),t=await n.json();return t.success?t.data.original:(console.error("Image upload failed:",t.message),null)}catch(a){return console.error("Image upload error:",a),null}},E=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*A*1024)return void alert(`Image size should be less than ${A}MB`);if(_(!0),"image/svg+xml"===e.type){const a=new FileReader;return a.onload=async e=>{var a;const t=null===(a=e.target)||void 0===a?void 0:a.result,o=await $(t);_(!1),o?n(o):alert("Failed to upload image. Please try again.")},void a.readAsDataURL(e)}const a=new FileReader;a.onload=async a=>{var t;const o=new Image;o.onload=async()=>{const a=document.createElement("canvas"),t=a.getContext("2d");if(!t)return void _(!1);const i=1200;let r=o.width,s=o.height;(r>i||s>i)&&(r>s?(s=s/r*i,r=i):(r=r/s*i,s=i)),a.width=r,a.height=s,t.drawImage(o,0,0,r,s);const l="image/png"===e.type?a.toDataURL("image/png"):a.toDataURL("image/jpeg",.85),d=await $(l);_(!1),d?n(d):alert("Failed to upload image. Please try again.")},o.src=null===(t=a.target)||void 0===t?void 0:t.result},a.readAsDataURL(e)},M=e=>{if(N)return;const a=e.target.files;a&&a.length>0&&E(a[0]),e.target.value=""};return(0,i.jsxs)(r,{children:[o&&(0,i.jsx)(s,{children:o}),j&&(0,i.jsx)(l,{children:j}),(0,i.jsxs)(d,{children:[(0,i.jsx)(c,{ref:B,isDragging:T,hasImage:!!a,isUploading:N,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),N||F(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===B.current&&F(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),F(!1),N)return;const a=e.dataTransfer.files;a&&a.length>0&&E(a[0])},onClick:()=>{var e;a||N||(null===(e=z.current)||void 0===e||e.click())},children:N?(0,i.jsxs)(p,{children:[(0,i.jsx)(v,{}),(0,i.jsx)(h,{style:{marginTop:"12px"},children:"Uploading..."})]}):a?(0,i.jsx)("img",{src:(D=a,D?D.startsWith("http")?D:D.startsWith("/uploads/")?`${b()}${D}`:D:""),alt:S}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:T?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(u,{children:["PNG, JPG, GIF up to ",A,"MB"]})]})}),a&&!N&&(0,i.jsxs)(g,{children:[(0,i.jsxs)(x,{disabled:N,children:[w,(0,i.jsx)("input",{ref:z,type:"file",accept:"image/*",onChange:M,disabled:N})]}),C&&(0,i.jsx)(m,{onClick:()=>{n("")},disabled:N,children:k})]})]}),!a&&!N&&(0,i.jsx)(y,{ref:z,type:"file",accept:"image/*",onChange:M})]});var D}},5370:(e,a,n)=>{n.d(a,{A:()=>j});var t=n(9950),o=n(4752),i=n(4414);const r=o.i7`
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
`,g=o.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,x=o.Ay.div`
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
`,v=o.Ay.span`
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
`,b=(0,t.forwardRef)((e,a)=>{let{children:n,onSave:o,type:r="input",debounceMs:s=2e3,style:l}=e;const[c,b]=(0,t.useState)("idle"),[j,A]=(0,t.useState)(!1),f=(0,t.useRef)(null),C=(0,t.useRef)(null),w=(0,t.useRef)(null),k=(0,t.useRef)(!0),S=(0,t.useRef)(o);S.current=o;const T=(0,t.useCallback)(()=>{f.current&&clearTimeout(f.current),C.current&&clearTimeout(C.current),w.current&&clearTimeout(w.current)},[]),F=2e3!==s?s:"toggle"===r||"select"===r||"list"===r||"image"===r?300:s,N=(0,t.useCallback)(()=>{T(),A(!1),f.current=setTimeout(async()=>{if(k.current){b("saving");try{if(await S.current(),!k.current)return;b("saved"),C.current=setTimeout(()=>{k.current&&(A(!0),w.current=setTimeout(()=>{k.current&&(b("idle"),A(!1))},300))},2e3)}catch{if(!k.current)return;b("error"),C.current=setTimeout(()=>{k.current&&(A(!0),w.current=setTimeout(()=>{k.current&&(b("idle"),A(!1))},300))},4e3)}}},F)},[F,T]);(0,t.useImperativeHandle)(a,()=>({triggerSave:N}),[N]),(0,t.useEffect)(()=>(k.current=!0,()=>{k.current=!1,T()}),[T]);const _=t.Children.map(n,e=>{if(!t.isValidElement(e))return e;const a=e.props.onChange;return"function"!==typeof a?e:t.cloneElement(e,{onChange:function(){a(...arguments),N()}})}),z="saving"===c?(0,i.jsx)(y,{}):"saved"===c?(0,i.jsx)(m,{children:"\u2713"}):"error"===c?(0,i.jsx)(v,{children:"!"}):null,B="select"===r?h:"toggle"===r?u:"image"===r?g:"list"===r?x:p;return(0,i.jsxs)(d,{$type:r,style:l,children:[_,"idle"!==c&&(0,i.jsx)(B,{$fading:j,children:z})]})});b.displayName="AutoSaveField";const j=b}}]);