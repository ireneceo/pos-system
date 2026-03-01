"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7909],{2435:(e,a,o)=>{o.d(a,{FS:()=>n});const n=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},4877:(e,a,o)=>{o.d(a,{A:()=>f});var n=o(8819),t=o(9950),i=o(4752),r=o(4414);const s=i.Ay.div`
  margin-bottom: 16px;
`,l=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,d=i.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,p=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,c=i.Ay.div`
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
`,g=i.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,h=i.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,x=i.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,u=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,m=i.Ay.label`
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
`,y=i.Ay.button`
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
`,b=i.Ay.input`
  display: none;
`,v=i.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,j=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",f=e=>{let{value:a,onChange:o,label:n="Logo Upload",helpText:i="Upload an image for your logo",maxSize:f=2,previewSize:A=150,showRemoveButton:C=!0,changeButtonText:w="Change Image",removeButtonText:T="Remove Image",imageAltText:S="Uploaded"}=e;const[F,k]=(0,t.useState)(!1),[E,z]=(0,t.useState)(!1),B=(0,t.useRef)(null),N=(0,t.useRef)(null),_=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*f*1024)return void alert(`Image size should be less than ${f}MB`);z(!0);const a=new FileReader;a.onload=async e=>{var a;const n=new Image;n.onload=async()=>{const e=document.createElement("canvas"),a=e.getContext("2d");if(!a)return void z(!1);const t=1200;let i=n.width,r=n.height;(i>t||r>t)&&(i>r?(r=r/i*t,i=t):(i=i/r*t,r=t)),e.width=i,e.height=r,a.drawImage(n,0,0,i,r);const s=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const a=localStorage.getItem("auth_token"),o=await fetch(`${j()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({image:e})}),n=await o.json();return n.success?n.data.original:(console.error("Image upload failed:",n.message),null)}catch(a){return console.error("Image upload error:",a),null}})(s);z(!1),l?o(l):alert("Failed to upload image. Please try again.")},n.src=null===(a=e.target)||void 0===a?void 0:a.result},a.readAsDataURL(e)},$=e=>{if(E)return;const a=e.target.files;a&&a.length>0&&_(a[0]),e.target.value=""};return(0,r.jsxs)(s,{children:[n&&(0,r.jsx)(l,{children:n}),i&&(0,r.jsx)(d,{children:i}),(0,r.jsxs)(p,{children:[(0,r.jsx)(c,{ref:N,isDragging:F,hasImage:!!a,isUploading:E,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),E||k(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===N.current&&k(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),k(!1),E)return;const a=e.dataTransfer.files;a&&a.length>0&&_(a[0])},onClick:()=>{var e;a||E||(null===(e=B.current)||void 0===e||e.click())},children:E?(0,r.jsxs)(g,{children:[(0,r.jsx)(v,{}),(0,r.jsx)(h,{style:{marginTop:"12px"},children:"Uploading..."})]}):a?(0,r.jsx)("img",{src:(M=a,M?M.startsWith("http")?M:M.startsWith("/uploads/")?`${j()}${M}`:M:""),alt:S}):(0,r.jsxs)(g,{children:[(0,r.jsx)(h,{children:F?"Drop image here":"Drag & drop or click to upload"}),(0,r.jsxs)(x,{children:["PNG, JPG, GIF up to ",f,"MB"]})]})}),a&&!E&&(0,r.jsxs)(u,{children:[(0,r.jsxs)(m,{disabled:E,children:[w,(0,r.jsx)("input",{ref:B,type:"file",accept:"image/*",onChange:$,disabled:E})]}),C&&(0,r.jsx)(y,{onClick:()=>{o("")},disabled:E,children:T})]})]}),!a&&!E&&(0,r.jsx)(b,{ref:B,type:"file",accept:"image/*",onChange:$})]});var M}},7909:(e,a,o)=>{o.r(a),o.d(a,{default:()=>w});var n=o(8819),t=o(9950),i=o(4752),r=o(2435),s=o(8666),l=o(4877),d=o(2674),p=o(4414);const c=[{value:"Asia/Kuala_Lumpur",label:"Malaysia (GMT+8)"},{value:"Asia/Singapore",label:"Singapore (GMT+8)"},{value:"Asia/Bangkok",label:"Thailand (GMT+7)"},{value:"Asia/Jakarta",label:"Indonesia - Jakarta (GMT+7)"},{value:"Asia/Ho_Chi_Minh",label:"Vietnam (GMT+7)"},{value:"Asia/Manila",label:"Philippines (GMT+8)"},{value:"Asia/Tokyo",label:"Japan (GMT+9)"},{value:"Asia/Seoul",label:"South Korea (GMT+9)"},{value:"Asia/Shanghai",label:"China (GMT+8)"},{value:"Asia/Hong_Kong",label:"Hong Kong (GMT+8)"},{value:"Asia/Taipei",label:"Taiwan (GMT+8)"},{value:"Asia/Dubai",label:"UAE (GMT+4)"},{value:"Europe/London",label:"UK (GMT+0/+1)"},{value:"America/New_York",label:"US Eastern (GMT-5/-4)"},{value:"America/Los_Angeles",label:"US Pacific (GMT-8/-7)"},{value:"Australia/Sydney",label:"Australia - Sydney (GMT+10/+11)"}],g=i.Ay.div`
  background: #FAFBFC;
  min-height: 100vh;
`,h=i.Ay.div`
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
`,x=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,u=i.Ay.button`
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
`,m=i.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,y=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${n.w.colors.border};
  padding: 32px;
  margin-bottom: 24px;
`,b=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #F3F4F6;
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,j=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;

  span {
    color: #DC2626;
    margin-left: 2px;
  }
`,f=i.Ay.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${n.w.colors.primary};
    box-shadow: 0 0 0 3px ${n.w.colors.primaryLight};
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
  }
`,A=i.Ay.select`
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
`,C=i.Ay.div`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  background: ${e=>"success"===e.type?"#ECFDF5":"#FEF2F2"};
  color: ${e=>"success"===e.type?"#059669":"#DC2626"};
  font-size: 14px;
`,w=()=>{const[e,a]=(0,t.useState)(!1),[o,n]=(0,t.useState)(!1),[i,w]=(0,t.useState)(null),[T,S]=(0,t.useState)({companyName:"",registrationNo:"",tradeName:"",address:"",city:"",state:"",postalCode:"",country:"MY",phone:"",email:"",website:"",taxNo:"",logoUrl:"",operationSettings:{openingTime:"09:00",closingTime:"22:00",timeZone:"Asia/Kuala_Lumpur"}});(0,t.useEffect)(()=>{F()},[]);const F=async()=>{try{const n=localStorage.getItem("auth_token"),t=await fetch("/api/brands/company-info",{headers:{Authorization:`Bearer ${n}`}});if(t.ok){const n=await t.json();var e,a,o;if(n)S({companyName:n.company_name||n.name||"",registrationNo:n.registration_no||"",tradeName:n.trade_name||"",address:n.address||"",city:n.city||"",state:n.state||"",postalCode:n.postal_code||"",country:n.country||"MY",phone:n.phone||"",email:n.email||"",website:n.website||"",taxNo:n.tax_no||"",logoUrl:n.logo_url||"",operationSettings:{openingTime:(null===(e=n.operation_settings)||void 0===e?void 0:e.openingTime)||"09:00",closingTime:(null===(a=n.operation_settings)||void 0===a?void 0:a.closingTime)||"22:00",timeZone:(null===(o=n.operation_settings)||void 0===o?void 0:o.timeZone)||"Asia/Kuala_Lumpur"}})}}catch(n){console.error("Error fetching company info:",n)}},k=(e,o)=>{S(a=>({...a,[e]:o})),a(!0),w(null)},E=(e,o)=>{S(a=>({...a,operationSettings:{...a.operationSettings,[e]:o}})),a(!0),w(null)};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(g,{children:[(0,p.jsxs)(h,{children:[(0,p.jsx)(x,{children:"Company Information"}),(0,p.jsx)(u,{hasChanges:e,onClick:async()=>{n(!0),w(null);try{const e=localStorage.getItem("auth_token");if(!(await fetch("/api/brands/company-info",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({company_name:T.companyName,registration_no:T.registrationNo,trade_name:T.tradeName,address:T.address,city:T.city,state:T.state,postal_code:T.postalCode,country:T.country,phone:T.phone,email:T.email,website:T.website,tax_no:T.taxNo,logo_url:T.logoUrl,operation_settings:T.operationSettings})})).ok)throw new Error("Failed to save");w({type:"success",text:"Company information saved successfully!"}),a(!1)}catch(e){w({type:"error",text:"Failed to save company information. Please try again."})}finally{n(!1)}},disabled:!e||o,children:o?"Saving...":"Save Changes"})]}),(0,p.jsxs)(m,{children:[i&&(0,p.jsx)(C,{type:i.type,children:i.text}),(0,p.jsxs)(y,{children:[(0,p.jsx)(b,{children:"Basic Information"}),(0,p.jsxs)(v,{children:[(0,p.jsxs)(d.gE,{children:[(0,p.jsxs)(j,{children:["Company Name ",(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(f,{type:"text",value:T.companyName,onChange:e=>k("companyName",e.target.value),placeholder:"Enter company name"})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(j,{children:"Registration No."}),(0,p.jsx)(f,{type:"text",value:T.registrationNo,onChange:e=>k("registrationNo",e.target.value),placeholder:"e.g., 202001234567"})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(j,{children:"Trade Name"}),(0,p.jsx)(f,{type:"text",value:T.tradeName,onChange:e=>k("tradeName",e.target.value),placeholder:"Trading as..."})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(j,{children:"Tax No. (SST/GST)"}),(0,p.jsx)(f,{type:"text",value:T.taxNo,onChange:e=>k("taxNo",e.target.value),placeholder:"e.g., W10-1234-56789012"})]})]})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(b,{children:"Address"}),(0,p.jsxs)(v,{children:[(0,p.jsxs)(d.gE,{fullWidth:!0,children:[(0,p.jsxs)(j,{children:["Street Address ",(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(f,{type:"text",value:T.address,onChange:e=>k("address",e.target.value),placeholder:"Enter street address"})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(j,{children:"City"}),(0,p.jsx)(f,{type:"text",value:T.city,onChange:e=>k("city",e.target.value),placeholder:"e.g., Kuala Lumpur"})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(j,{children:"State"}),(0,p.jsx)(f,{type:"text",value:T.state,onChange:e=>k("state",e.target.value),placeholder:"e.g., Wilayah Persekutuan"})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(j,{children:"Postal Code"}),(0,p.jsx)(f,{type:"text",value:T.postalCode,onChange:e=>k("postalCode",e.target.value),placeholder:"e.g., 50000"})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsxs)(j,{children:["Country ",(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(A,{value:T.country,onChange:e=>k("country",e.target.value),children:r.FS.map(e=>(0,p.jsx)("option",{value:e.code,children:e.name},e.code))})]})]})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(b,{children:"Contact Information"}),(0,p.jsxs)(v,{children:[(0,p.jsxs)(d.gE,{children:[(0,p.jsxs)(j,{children:["Phone ",(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(s.A,{value:T.phone,onChange:e=>k("phone",e),defaultCountry:T.country})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsxs)(j,{children:["Email ",(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(f,{type:"email",value:T.email,onChange:e=>k("email",e.target.value),placeholder:"company@example.com"})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(j,{children:"Website"}),(0,p.jsx)(f,{type:"url",value:T.website,onChange:e=>k("website",e.target.value),placeholder:"https://www.example.com"})]})]})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(b,{children:"Operation Settings"}),(0,p.jsxs)(v,{children:[(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(j,{children:"Opening Time"}),(0,p.jsx)(f,{type:"time",value:T.operationSettings.openingTime,onChange:e=>E("openingTime",e.target.value)})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(j,{children:"Closing Time"}),(0,p.jsx)(f,{type:"time",value:T.operationSettings.closingTime,onChange:e=>E("closingTime",e.target.value)})]}),(0,p.jsxs)(d.gE,{children:[(0,p.jsx)(j,{children:"Timezone"}),(0,p.jsx)(A,{value:T.operationSettings.timeZone,onChange:e=>E("timeZone",e.target.value),children:c.map(e=>(0,p.jsx)("option",{value:e.value,children:e.label},e.value))})]})]})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(b,{children:"Company Logo"}),(0,p.jsx)(l.A,{value:T.logoUrl,onChange:e=>k("logoUrl",e),imageAltText:"Company Logo"})]})]})]})})}}}]);