"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1513],{1513:(e,a,n)=>{n.r(a),n.d(a,{default:()=>k});var o=n(9950),t=n(4752),i=n(3310),r=n(2435),s=n(8666),l=n(4877),d=n(4414);const c=[{value:"Asia/Kuala_Lumpur",label:"Malaysia (GMT+8)"},{value:"Asia/Singapore",label:"Singapore (GMT+8)"},{value:"Asia/Bangkok",label:"Thailand (GMT+7)"},{value:"Asia/Jakarta",label:"Indonesia - Jakarta (GMT+7)"},{value:"Asia/Ho_Chi_Minh",label:"Vietnam (GMT+7)"},{value:"Asia/Manila",label:"Philippines (GMT+8)"},{value:"Asia/Tokyo",label:"Japan (GMT+9)"},{value:"Asia/Seoul",label:"South Korea (GMT+9)"},{value:"Asia/Shanghai",label:"China (GMT+8)"},{value:"Asia/Hong_Kong",label:"Hong Kong (GMT+8)"},{value:"Asia/Taipei",label:"Taiwan (GMT+8)"},{value:"Asia/Dubai",label:"UAE (GMT+4)"},{value:"Europe/London",label:"UK (GMT+0/+1)"},{value:"America/New_York",label:"US Eastern (GMT-5/-4)"},{value:"America/Los_Angeles",label:"US Pacific (GMT-8/-7)"},{value:"Australia/Sydney",label:"Australia - Sydney (GMT+10/+11)"}],p=t.Ay.div`
  background: #FAFBFC;
  min-height: 100vh;
`,h=t.Ay.div`
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
`,g=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,u=t.Ay.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: ${e=>e.hasChanges?"#635BFF":"#E6EBF1"};
  color: ${e=>e.hasChanges?"white":"#8898AA"};

  &:hover {
    background: ${e=>e.hasChanges?"#5A51E6":"#E6EBF1"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`,x=t.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,m=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  margin-bottom: 24px;
`,y=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #F3F4F6;
`,b=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,v=t.Ay.div`
  grid-column: ${e=>e.fullWidth?"span 2":"span 1"};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`,j=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;

  span {
    color: #DC2626;
    margin-left: 2px;
  }
`,A=t.Ay.input`
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
`,f=t.Ay.select`
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
`,C=t.Ay.div`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  background: ${e=>"success"===e.type?"#ECFDF5":"#FEF2F2"};
  color: ${e=>"success"===e.type?"#059669":"#DC2626"};
  font-size: 14px;
`,k=()=>{const[e,a]=(0,o.useState)(!1),[n,t]=(0,o.useState)(!1),[k,w]=(0,o.useState)(null),[F,T]=(0,o.useState)({companyName:"",registrationNo:"",tradeName:"",address:"",city:"",state:"",postalCode:"",country:"MY",phone:"",email:"",website:"",taxNo:"",bankName:"",bankAccount:"",bankAccountName:"",logoUrl:"",operationSettings:{openingTime:"09:00",closingTime:"22:00",timeZone:"Asia/Kuala_Lumpur"}});(0,o.useEffect)(()=>{S()},[]);const S=async()=>{try{const o=localStorage.getItem("auth_token"),t=await fetch("/api/foodcourts/company-info",{headers:{Authorization:`Bearer ${o}`}});if(t.ok){const o=await t.json();var e,a,n;if(o)T({companyName:o.company_name||o.name||"",registrationNo:o.registration_no||"",tradeName:o.trade_name||"",address:o.address||"",city:o.city||"",state:o.state||"",postalCode:o.postal_code||"",country:o.country||"MY",phone:o.phone||"",email:o.email||"",website:o.website||"",taxNo:o.tax_no||"",bankName:o.bank_name||"",bankAccount:o.bank_account||"",bankAccountName:o.bank_account_name||"",logoUrl:o.logo_url||"",operationSettings:{openingTime:(null===(e=o.operation_settings)||void 0===e?void 0:e.openingTime)||"09:00",closingTime:(null===(a=o.operation_settings)||void 0===a?void 0:a.closingTime)||"22:00",timeZone:(null===(n=o.operation_settings)||void 0===n?void 0:n.timeZone)||"Asia/Kuala_Lumpur"}})}}catch(o){console.error("Error fetching company info:",o)}},N=(e,n)=>{T(a=>({...a,[e]:n})),a(!0),w(null)},_=(e,n)=>{T(a=>({...a,operationSettings:{...a.operationSettings,[e]:n}})),a(!0),w(null)};return(0,d.jsx)(i.A,{children:(0,d.jsxs)(p,{children:[(0,d.jsxs)(h,{children:[(0,d.jsx)(g,{children:"Company Information"}),(0,d.jsx)(u,{hasChanges:e,onClick:async()=>{t(!0),w(null);try{const e=localStorage.getItem("auth_token");if(!(await fetch("/api/foodcourts/company-info",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({company_name:F.companyName,registration_no:F.registrationNo,trade_name:F.tradeName,address:F.address,city:F.city,state:F.state,postal_code:F.postalCode,country:F.country,phone:F.phone,email:F.email,website:F.website,tax_no:F.taxNo,bank_name:F.bankName,bank_account:F.bankAccount,bank_account_name:F.bankAccountName,logo_url:F.logoUrl,operation_settings:F.operationSettings})})).ok)throw new Error("Failed to save");w({type:"success",text:"Company information saved successfully!"}),a(!1)}catch(e){w({type:"error",text:"Failed to save company information. Please try again."})}finally{t(!1)}},disabled:!e||n,children:n?"Saving...":"Save Changes"})]}),(0,d.jsxs)(x,{children:[k&&(0,d.jsx)(C,{type:k.type,children:k.text}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Basic Information"}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(v,{children:[(0,d.jsxs)(j,{children:["Company Name ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(A,{type:"text",value:F.companyName,onChange:e=>N("companyName",e.target.value),placeholder:"Enter company name"})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"Registration No."}),(0,d.jsx)(A,{type:"text",value:F.registrationNo,onChange:e=>N("registrationNo",e.target.value),placeholder:"e.g., 202001234567"})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"Trade Name"}),(0,d.jsx)(A,{type:"text",value:F.tradeName,onChange:e=>N("tradeName",e.target.value),placeholder:"Trading as..."})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"Tax No. (SST/GST)"}),(0,d.jsx)(A,{type:"text",value:F.taxNo,onChange:e=>N("taxNo",e.target.value),placeholder:"e.g., W10-1234-56789012"})]})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Address"}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(v,{fullWidth:!0,children:[(0,d.jsxs)(j,{children:["Street Address ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(A,{type:"text",value:F.address,onChange:e=>N("address",e.target.value),placeholder:"Enter street address"})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"City"}),(0,d.jsx)(A,{type:"text",value:F.city,onChange:e=>N("city",e.target.value),placeholder:"e.g., Kuala Lumpur"})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"State"}),(0,d.jsx)(A,{type:"text",value:F.state,onChange:e=>N("state",e.target.value),placeholder:"e.g., Wilayah Persekutuan"})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"Postal Code"}),(0,d.jsx)(A,{type:"text",value:F.postalCode,onChange:e=>N("postalCode",e.target.value),placeholder:"e.g., 50000"})]}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(j,{children:["Country ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(f,{value:F.country,onChange:e=>N("country",e.target.value),children:r.FS.map(e=>(0,d.jsx)("option",{value:e.code,children:e.name},e.code))})]})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Contact Information"}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(v,{children:[(0,d.jsxs)(j,{children:["Phone ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(s.A,{value:F.phone,onChange:e=>N("phone",e),defaultCountry:F.country})]}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(j,{children:["Email ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(A,{type:"email",value:F.email,onChange:e=>N("email",e.target.value),placeholder:"company@example.com"})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"Website"}),(0,d.jsx)(A,{type:"url",value:F.website,onChange:e=>N("website",e.target.value),placeholder:"https://www.example.com"})]})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Banking Information"}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"Bank Name"}),(0,d.jsx)(A,{type:"text",value:F.bankName,onChange:e=>N("bankName",e.target.value),placeholder:"e.g., Maybank"})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"Account Number"}),(0,d.jsx)(A,{type:"text",value:F.bankAccount,onChange:e=>N("bankAccount",e.target.value),placeholder:"e.g., 1234567890"})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"Account Name"}),(0,d.jsx)(A,{type:"text",value:F.bankAccountName,onChange:e=>N("bankAccountName",e.target.value),placeholder:"Account holder name"})]})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Operation Settings"}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"Opening Time"}),(0,d.jsx)(A,{type:"time",value:F.operationSettings.openingTime,onChange:e=>_("openingTime",e.target.value)})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"Closing Time"}),(0,d.jsx)(A,{type:"time",value:F.operationSettings.closingTime,onChange:e=>_("closingTime",e.target.value)})]}),(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"Timezone"}),(0,d.jsx)(f,{value:F.operationSettings.timeZone,onChange:e=>_("timeZone",e.target.value),children:c.map(e=>(0,d.jsx)("option",{value:e.value,children:e.label},e.value))})]})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Company Logo"}),(0,d.jsx)(l.A,{value:F.logoUrl,onChange:e=>N("logoUrl",e),imageAltText:"Company Logo"})]})]})]})})}},2435:(e,a,n)=>{n.d(a,{FS:()=>o});const o=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},4877:(e,a,n)=>{n.d(a,{A:()=>j});var o=n(9950),t=n(4752),i=n(4414);const r=t.Ay.div`
  margin-bottom: 16px;
`,s=t.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=t.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,c=t.Ay.div`
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
`,p=t.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,h=t.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,g=t.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,u=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,x=t.Ay.label`
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
`,m=t.Ay.button`
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
`,y=t.Ay.input`
  display: none;
`,b=t.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,v=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",j=e=>{let{value:a,onChange:n,label:t="Logo Upload",helpText:j="Upload an image for your logo",maxSize:A=2,previewSize:f=150,showRemoveButton:C=!0,changeButtonText:k="Change Image",removeButtonText:w="Remove Image",imageAltText:F="Uploaded"}=e;const[T,S]=(0,o.useState)(!1),[N,_]=(0,o.useState)(!1),B=(0,o.useRef)(null),z=(0,o.useRef)(null),E=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*A*1024)return void alert(`Image size should be less than ${A}MB`);_(!0);const a=new FileReader;a.onload=async e=>{var a;const o=new Image;o.onload=async()=>{const e=document.createElement("canvas"),a=e.getContext("2d");if(!a)return void _(!1);const t=1200;let i=o.width,r=o.height;(i>t||r>t)&&(i>r?(r=r/i*t,i=t):(i=i/r*t,r=t)),e.width=i,e.height=r,a.drawImage(o,0,0,i,r);const s=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const a=localStorage.getItem("auth_token"),n=await fetch(`${v()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({image:e})}),o=await n.json();return o.success?o.data.original:(console.error("Image upload failed:",o.message),null)}catch(a){return console.error("Image upload error:",a),null}})(s);_(!1),l?n(l):alert("Failed to upload image. Please try again.")},o.src=null===(a=e.target)||void 0===a?void 0:a.result},a.readAsDataURL(e)},M=e=>{if(N)return;const a=e.target.files;a&&a.length>0&&E(a[0]),e.target.value=""};return(0,i.jsxs)(r,{children:[t&&(0,i.jsx)(s,{children:t}),j&&(0,i.jsx)(l,{children:j}),(0,i.jsxs)(d,{children:[(0,i.jsx)(c,{ref:z,isDragging:T,hasImage:!!a,isUploading:N,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),N||S(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===z.current&&S(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),S(!1),N)return;const a=e.dataTransfer.files;a&&a.length>0&&E(a[0])},onClick:()=>{var e;a||N||(null===(e=B.current)||void 0===e||e.click())},children:N?(0,i.jsxs)(p,{children:[(0,i.jsx)(b,{}),(0,i.jsx)(h,{style:{marginTop:"12px"},children:"Uploading..."})]}):a?(0,i.jsx)("img",{src:(D=a,D?D.startsWith("http")?D:D.startsWith("/uploads/")?`${v()}${D}`:D:""),alt:F}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:T?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(g,{children:["PNG, JPG, GIF up to ",A,"MB"]})]})}),a&&!N&&(0,i.jsxs)(u,{children:[(0,i.jsxs)(x,{disabled:N,children:[k,(0,i.jsx)("input",{ref:B,type:"file",accept:"image/*",onChange:M,disabled:N})]}),C&&(0,i.jsx)(m,{onClick:()=>{n("")},disabled:N,children:w})]})]}),!a&&!N&&(0,i.jsx)(y,{ref:B,type:"file",accept:"image/*",onChange:M})]});var D}}}]);