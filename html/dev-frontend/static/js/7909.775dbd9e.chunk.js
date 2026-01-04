"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7909],{2435:(e,a,n)=>{n.d(a,{FS:()=>o});const o=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},4669:(e,a,n)=>{n.d(a,{A:()=>b});var o=n(9950),t=n(4752),r=n(4414);const i=t.Ay.div`
  /* Container styling - spacing handled by parent */
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
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  position: relative;

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
`,x=t.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,g=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,m=t.Ay.label`
  padding: 8px 16px;
  border: 1px solid #635BFF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
  text-align: center;

  &:hover {
    background: #635BFF;
    color: white;
  }

  input {
    display: none;
  }
`,u=t.Ay.button`
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
`,b=e=>{let{value:a,onChange:n,label:t="Logo Upload",helpText:b="Upload an image for your logo",maxSize:j=2,previewSize:f=150,showRemoveButton:v=!0,changeButtonText:C="Change Image",removeButtonText:A="Remove Image",imageAltText:k="Uploaded"}=e;const[w,F]=(0,o.useState)(!1),N=(0,o.useRef)(null),z=(0,o.useRef)(null),B=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*j*1024)return void alert(`Image size should be less than ${j}MB`);const a=new FileReader;a.onload=e=>{var a;const o=new Image;o.onload=()=>{const e=document.createElement("canvas"),a=e.getContext("2d");if(!a)return;const t=800;let r=o.width,i=o.height;(r>t||i>t)&&(r>i?(i=i/r*t,r=t):(r=r/i*t,i=t)),e.width=r,e.height=i,a.drawImage(o,0,0,r,i);const s=e.toDataURL("image/jpeg",.85);n(s)},o.src=null===(a=e.target)||void 0===a?void 0:a.result},a.readAsDataURL(e)},S=e=>{const a=e.target.files;a&&a.length>0&&B(a[0])};return(0,r.jsxs)(i,{children:[t&&(0,r.jsx)(s,{children:t}),b&&(0,r.jsx)(l,{children:b}),(0,r.jsxs)(d,{children:[(0,r.jsx)(c,{ref:z,isDragging:w,hasImage:!!a,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),F(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===z.current&&F(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),F(!1);const a=e.dataTransfer.files;a&&a.length>0&&B(a[0])},onClick:()=>{var e;a||(null===(e=N.current)||void 0===e||e.click())},children:a?(0,r.jsx)("img",{src:a,alt:k}):(0,r.jsxs)(p,{children:[(0,r.jsx)(h,{children:w?"Drop image here":"Drag & drop or click to upload"}),(0,r.jsxs)(x,{children:["PNG, JPG, GIF up to ",j,"MB"]})]})}),a&&(0,r.jsxs)(g,{children:[(0,r.jsxs)(m,{children:[C,(0,r.jsx)("input",{ref:N,type:"file",accept:"image/*",onChange:S})]}),v&&(0,r.jsx)(u,{onClick:()=>{n("")},children:A})]})]}),!a&&(0,r.jsx)(y,{ref:N,type:"file",accept:"image/*",onChange:S})]})}},7909:(e,a,n)=>{n.r(a),n.d(a,{default:()=>A});var o=n(9950),t=n(4752),r=n(3310),i=n(2435),s=n(2874),l=n(4669),d=n(4414);const c=t.Ay.div`
  background: #FAFBFC;
  min-height: 100vh;
`,p=t.Ay.div`
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
`,h=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,x=t.Ay.button`
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
`,g=t.Ay.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  margin-bottom: 24px;
`,u=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #F3F4F6;
`,y=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,b=t.Ay.div`
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
`,f=t.Ay.input`
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
`,v=t.Ay.select`
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
`,A=()=>{const[e,a]=(0,o.useState)(!1),[n,t]=(0,o.useState)(!1),[A,k]=(0,o.useState)(null),[w,F]=(0,o.useState)({companyName:"",registrationNo:"",tradeName:"",address:"",city:"",state:"",postalCode:"",country:"MY",phone:"",email:"",website:"",taxNo:"",bankName:"",bankAccount:"",bankAccountName:"",logoUrl:""});(0,o.useEffect)(()=>{N()},[]);const N=async()=>{try{const e=localStorage.getItem("auth_token"),a=await fetch("/api/brands/company-info",{headers:{Authorization:`Bearer ${e}`}});if(a.ok){const e=await a.json();e&&F({companyName:e.company_name||e.name||"",registrationNo:e.registration_no||"",tradeName:e.trade_name||"",address:e.address||"",city:e.city||"",state:e.state||"",postalCode:e.postal_code||"",country:e.country||"MY",phone:e.phone||"",email:e.email||"",website:e.website||"",taxNo:e.tax_no||"",bankName:e.bank_name||"",bankAccount:e.bank_account||"",bankAccountName:e.bank_account_name||"",logoUrl:e.logo_url||""})}}catch(e){console.error("Error fetching company info:",e)}},z=(e,n)=>{F(a=>({...a,[e]:n})),a(!0),k(null)};return(0,d.jsx)(r.A,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(h,{children:"Company Information"}),(0,d.jsx)(x,{hasChanges:e,onClick:async()=>{t(!0),k(null);try{const e=localStorage.getItem("auth_token");if(!(await fetch("/api/brands/company-info",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({company_name:w.companyName,registration_no:w.registrationNo,trade_name:w.tradeName,address:w.address,city:w.city,state:w.state,postal_code:w.postalCode,country:w.country,phone:w.phone,email:w.email,website:w.website,tax_no:w.taxNo,bank_name:w.bankName,bank_account:w.bankAccount,bank_account_name:w.bankAccountName,logo_url:w.logoUrl})})).ok)throw new Error("Failed to save");k({type:"success",text:"Company information saved successfully!"}),a(!1)}catch(e){k({type:"error",text:"Failed to save company information. Please try again."})}finally{t(!1)}},disabled:!e||n,children:n?"Saving...":"Save Changes"})]}),(0,d.jsxs)(g,{children:[A&&(0,d.jsx)(C,{type:A.type,children:A.text}),(0,d.jsxs)(m,{children:[(0,d.jsx)(u,{children:"Basic Information"}),(0,d.jsxs)(y,{children:[(0,d.jsxs)(b,{children:[(0,d.jsxs)(j,{children:["Company Name ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(f,{type:"text",value:w.companyName,onChange:e=>z("companyName",e.target.value),placeholder:"Enter company name"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Registration No."}),(0,d.jsx)(f,{type:"text",value:w.registrationNo,onChange:e=>z("registrationNo",e.target.value),placeholder:"e.g., 202001234567"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Trade Name"}),(0,d.jsx)(f,{type:"text",value:w.tradeName,onChange:e=>z("tradeName",e.target.value),placeholder:"Trading as..."})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Tax No. (SST/GST)"}),(0,d.jsx)(f,{type:"text",value:w.taxNo,onChange:e=>z("taxNo",e.target.value),placeholder:"e.g., W10-1234-56789012"})]})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(u,{children:"Address"}),(0,d.jsxs)(y,{children:[(0,d.jsxs)(b,{fullWidth:!0,children:[(0,d.jsxs)(j,{children:["Street Address ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(f,{type:"text",value:w.address,onChange:e=>z("address",e.target.value),placeholder:"Enter street address"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"City"}),(0,d.jsx)(f,{type:"text",value:w.city,onChange:e=>z("city",e.target.value),placeholder:"e.g., Kuala Lumpur"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"State"}),(0,d.jsx)(f,{type:"text",value:w.state,onChange:e=>z("state",e.target.value),placeholder:"e.g., Wilayah Persekutuan"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Postal Code"}),(0,d.jsx)(f,{type:"text",value:w.postalCode,onChange:e=>z("postalCode",e.target.value),placeholder:"e.g., 50000"})]}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(j,{children:["Country ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(v,{value:w.country,onChange:e=>z("country",e.target.value),children:i.FS.map(e=>(0,d.jsx)("option",{value:e.code,children:e.name},e.code))})]})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(u,{children:"Contact Information"}),(0,d.jsxs)(y,{children:[(0,d.jsxs)(b,{children:[(0,d.jsxs)(j,{children:["Phone ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(s.A,{value:w.phone,onChange:e=>z("phone",e),defaultCountry:w.country})]}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(j,{children:["Email ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(f,{type:"email",value:w.email,onChange:e=>z("email",e.target.value),placeholder:"company@example.com"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Website"}),(0,d.jsx)(f,{type:"url",value:w.website,onChange:e=>z("website",e.target.value),placeholder:"https://www.example.com"})]})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(u,{children:"Banking Information"}),(0,d.jsxs)(y,{children:[(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Bank Name"}),(0,d.jsx)(f,{type:"text",value:w.bankName,onChange:e=>z("bankName",e.target.value),placeholder:"e.g., Maybank"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Account Number"}),(0,d.jsx)(f,{type:"text",value:w.bankAccount,onChange:e=>z("bankAccount",e.target.value),placeholder:"e.g., 1234567890"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Account Name"}),(0,d.jsx)(f,{type:"text",value:w.bankAccountName,onChange:e=>z("bankAccountName",e.target.value),placeholder:"Account holder name"})]})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(u,{children:"Company Logo"}),(0,d.jsx)(l.A,{value:w.logoUrl,onChange:e=>z("logoUrl",e),imageAltText:"Company Logo"})]})]})]})})}}}]);