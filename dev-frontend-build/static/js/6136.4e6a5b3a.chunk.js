"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6136],{2435:(e,a,n)=>{n.d(a,{FS:()=>o});const o=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},4877:(e,a,n)=>{n.d(a,{A:()=>v});var o=n(9950),t=n(4752),i=n(4414);const r=t.Ay.div`
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
`,x=t.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,u=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=t.Ay.label`
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
`,b=t.Ay.input`
  display: none;
`,j=t.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,y=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",v=e=>{let{value:a,onChange:n,label:t="Logo Upload",helpText:v="Upload an image for your logo",maxSize:f=2,previewSize:k=150,showRemoveButton:A=!0,changeButtonText:C="Change Image",removeButtonText:w="Remove Image",imageAltText:B="Uploaded"}=e;const[F,N]=(0,o.useState)(!1),[S,z]=(0,o.useState)(!1),I=(0,o.useRef)(null),P=(0,o.useRef)(null),E=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*f*1024)return void alert(`Image size should be less than ${f}MB`);z(!0);const a=new FileReader;a.onload=async e=>{var a;const o=new Image;o.onload=async()=>{const e=document.createElement("canvas"),a=e.getContext("2d");if(!a)return void z(!1);const t=1200;let i=o.width,r=o.height;(i>t||r>t)&&(i>r?(r=r/i*t,i=t):(i=i/r*t,r=t)),e.width=i,e.height=r,a.drawImage(o,0,0,i,r);const s=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const a=localStorage.getItem("auth_token"),n=await fetch(`${y()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({image:e})}),o=await n.json();return o.success?o.data.original:(console.error("Image upload failed:",o.message),null)}catch(a){return console.error("Image upload error:",a),null}})(s);z(!1),l?n(l):alert("Failed to upload image. Please try again.")},o.src=null===(a=e.target)||void 0===a?void 0:a.result},a.readAsDataURL(e)},$=e=>{if(S)return;const a=e.target.files;a&&a.length>0&&E(a[0]),e.target.value=""};return(0,i.jsxs)(r,{children:[t&&(0,i.jsx)(s,{children:t}),v&&(0,i.jsx)(l,{children:v}),(0,i.jsxs)(d,{children:[(0,i.jsx)(c,{ref:P,isDragging:F,hasImage:!!a,isUploading:S,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),S||N(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===P.current&&N(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),N(!1),S)return;const a=e.dataTransfer.files;a&&a.length>0&&E(a[0])},onClick:()=>{var e;a||S||(null===(e=I.current)||void 0===e||e.click())},children:S?(0,i.jsxs)(p,{children:[(0,i.jsx)(j,{}),(0,i.jsx)(h,{style:{marginTop:"12px"},children:"Uploading..."})]}):a?(0,i.jsx)("img",{src:(_=a,_?_.startsWith("http")?_:_.startsWith("/uploads/")?`${y()}${_}`:_:""),alt:B}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:F?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(x,{children:["PNG, JPG, GIF up to ",f,"MB"]})]})}),a&&!S&&(0,i.jsxs)(u,{children:[(0,i.jsxs)(g,{disabled:S,children:[C,(0,i.jsx)("input",{ref:I,type:"file",accept:"image/*",onChange:$,disabled:S})]}),A&&(0,i.jsx)(m,{onClick:()=>{n("")},disabled:S,children:w})]})]}),!a&&!S&&(0,i.jsx)(b,{ref:I,type:"file",accept:"image/*",onChange:$})]});var _}},6136:(e,a,n)=>{n.r(a),n.d(a,{default:()=>A});var o=n(9950),t=n(4752),i=n(1367),r=n(4877),s=n(8666),l=n(2435),d=n(4414);const c=t.Ay.div`
  background: #FAFBFC;
  min-height: 100vh;
`,p=t.Ay.div`
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
`,h=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
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
    transform: ${e=>e.hasChanges?"translateY(-2px)":"none"};
    box-shadow: ${e=>e.hasChanges?"0 4px 12px rgba(99, 91, 255, 0.3)":"none"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`,u=t.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,g=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=t.Ay.h2`
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
`,j=t.Ay.div`
  grid-column: ${e=>e.fullWidth?"span 2":"span 1"};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`,y=t.Ay.label`
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
`,v=t.Ay.input`
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
`,f=t.Ay.select`
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
`,k=t.Ay.div`
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
`,A=()=>{const{user:e}=(0,i.As)(),[a,n]=(0,o.useState)({id:"",companyName:"",registrationNo:"",tradeName:"",address:"",city:"",state:"",postcode:"",country:"MY",phone:"",email:"",website:"",taxNo:"",bankName:"",bankAccount:"",bankAccountName:"",logoUrl:"",updatedAt:"",updatedBy:""}),[t,A]=(0,o.useState)(a),[C,w]=(0,o.useState)(!1);(0,o.useEffect)(()=>{B()},[]),(0,o.useEffect)(()=>{const e=JSON.stringify(a)!==JSON.stringify(t);w(e)},[a,t]);const B=async()=>{try{if(null!==e&&void 0!==e&&e.restaurantId){const o=await fetch(`/api/restaurants/${e.restaurantId}`);if(o.ok){var a;const e=await o.json(),t=e.data||e,i={id:(null===(a=t.id)||void 0===a?void 0:a.toString())||"",companyName:t.name||"",registrationNo:t.business_registration||"",tradeName:t.trade_name||"",address:t.address||"",city:t.city||"",state:t.state||"",postcode:t.postal_code||"",country:t.country||"MY",phone:t.phone||"",email:t.email||"",website:t.website||"",taxNo:t.tax_id||"",bankName:t.bank_name||"",bankAccount:t.bank_account||"",bankAccountName:t.bank_account_name||"",logoUrl:t.logo_url||"",updatedAt:t.updatedAt||"",updatedBy:t.updated_by||""};n(i),A(i)}}}catch(o){console.error("Failed to load company information:",o)}},F=(e,a)=>{n(n=>({...n,[e]:a}))};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(h,{children:"Company Information"}),(0,d.jsx)(x,{hasChanges:C,onClick:async()=>{try{if(null!==e&&void 0!==e&&e.restaurantId){(await fetch(`/api/restaurants/${e.restaurantId}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a.companyName,business_registration:a.registrationNo,trade_name:a.tradeName,address:a.address,city:a.city,state:a.state,postal_code:a.postcode,country:a.country,phone:a.phone,email:a.email,website:a.website,tax_id:a.taxNo,bank_name:a.bankName,bank_account:a.bankAccount,bank_account_name:a.bankAccountName,logo_url:a.logoUrl})})).ok?(A(a),w(!1),alert("Company information saved successfully!")):alert("Failed to save company information.")}}catch(n){console.error("Save error:",n),alert("An error occurred while saving.")}},disabled:!C,children:"Save Changes"})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(k,{children:(0,d.jsx)("p",{children:"Manage your restaurant's official business information. This information will be used for invoicing, legal documents, and official communications."})}),(0,d.jsxs)(g,{children:[(0,d.jsx)(m,{children:"Basic Information"}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(j,{children:[(0,d.jsxs)(y,{children:["Company Name ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(v,{type:"text",value:a.companyName,onChange:e=>F("companyName",e.target.value),placeholder:"Legal entity name"})]}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(y,{children:["Registration Number ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(v,{type:"text",value:a.registrationNo,onChange:e=>F("registrationNo",e.target.value),placeholder:"e.g., 202401234567"})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(y,{children:"Trade Name / Brand Name"}),(0,d.jsx)(v,{type:"text",value:a.tradeName||"",onChange:e=>F("tradeName",e.target.value),placeholder:"e.g., ABC Kitchen & Grill"})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(y,{children:"Tax Number (SST/GST)"}),(0,d.jsx)(v,{type:"text",value:a.taxNo||"",onChange:e=>F("taxNo",e.target.value),placeholder:"e.g., W10-1234-56789012"})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(y,{children:"Website"}),(0,d.jsx)(v,{type:"url",value:a.website||"",onChange:e=>F("website",e.target.value),placeholder:"www.example.com"})]})]})]}),(0,d.jsxs)(g,{children:[(0,d.jsx)(m,{children:"Contact Information"}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(j,{fullWidth:!0,children:[(0,d.jsxs)(y,{children:["Address ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(v,{type:"text",value:a.address,onChange:e=>F("address",e.target.value),placeholder:"Street address"})]}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(y,{children:["City ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(v,{type:"text",value:a.city,onChange:e=>F("city",e.target.value),placeholder:"e.g., Kuala Lumpur"})]}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(y,{children:["State ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsxs)(f,{value:a.state,onChange:e=>F("state",e.target.value),children:[(0,d.jsx)("option",{value:"",children:"Select State"}),(0,d.jsx)("option",{value:"Wilayah Persekutuan",children:"Wilayah Persekutuan"}),(0,d.jsx)("option",{value:"Selangor",children:"Selangor"}),(0,d.jsx)("option",{value:"Penang",children:"Penang"}),(0,d.jsx)("option",{value:"Johor",children:"Johor"}),(0,d.jsx)("option",{value:"Perak",children:"Perak"}),(0,d.jsx)("option",{value:"Kedah",children:"Kedah"}),(0,d.jsx)("option",{value:"Kelantan",children:"Kelantan"}),(0,d.jsx)("option",{value:"Melaka",children:"Melaka"}),(0,d.jsx)("option",{value:"Negeri Sembilan",children:"Negeri Sembilan"}),(0,d.jsx)("option",{value:"Pahang",children:"Pahang"}),(0,d.jsx)("option",{value:"Perlis",children:"Perlis"}),(0,d.jsx)("option",{value:"Sabah",children:"Sabah"}),(0,d.jsx)("option",{value:"Sarawak",children:"Sarawak"}),(0,d.jsx)("option",{value:"Terengganu",children:"Terengganu"})]})]}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(y,{children:["Postcode ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(v,{type:"text",value:a.postcode,onChange:e=>F("postcode",e.target.value),placeholder:"e.g., 50250"})]}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(y,{children:["Country ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(f,{value:a.country,onChange:e=>F("country",e.target.value),children:l.FS.map(e=>(0,d.jsx)("option",{value:e.code,children:e.name},e.code))})]}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(y,{children:["Phone ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(s.A,{value:a.phone,onChange:e=>F("phone",e),defaultCountry:a.country})]}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(y,{children:["Email ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(v,{type:"email",value:a.email,onChange:e=>F("email",e.target.value),placeholder:"contact@example.com"})]})]})]}),(0,d.jsxs)(g,{children:[(0,d.jsx)(m,{children:"Banking Information"}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(j,{children:[(0,d.jsx)(y,{children:"Bank Name"}),(0,d.jsxs)(f,{value:a.bankName||"",onChange:e=>F("bankName",e.target.value),children:[(0,d.jsx)("option",{value:"",children:"Select Bank"}),(0,d.jsx)("option",{value:"Maybank",children:"Maybank"}),(0,d.jsx)("option",{value:"CIMB Bank",children:"CIMB Bank"}),(0,d.jsx)("option",{value:"Public Bank",children:"Public Bank"}),(0,d.jsx)("option",{value:"RHB Bank",children:"RHB Bank"}),(0,d.jsx)("option",{value:"Hong Leong Bank",children:"Hong Leong Bank"}),(0,d.jsx)("option",{value:"AmBank",children:"AmBank"}),(0,d.jsx)("option",{value:"UOB",children:"UOB"}),(0,d.jsx)("option",{value:"OCBC Bank",children:"OCBC Bank"}),(0,d.jsx)("option",{value:"HSBC",children:"HSBC"}),(0,d.jsx)("option",{value:"Standard Chartered",children:"Standard Chartered"}),(0,d.jsx)("option",{value:"Bank Islam",children:"Bank Islam"}),(0,d.jsx)("option",{value:"Bank Rakyat",children:"Bank Rakyat"})]})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(y,{children:"Account Number"}),(0,d.jsx)(v,{type:"text",value:a.bankAccount||"",onChange:e=>F("bankAccount",e.target.value),placeholder:"e.g., 514123456789"})]}),(0,d.jsxs)(j,{fullWidth:!0,children:[(0,d.jsx)(y,{children:"Account Name"}),(0,d.jsx)(v,{type:"text",value:a.bankAccountName||"",onChange:e=>F("bankAccountName",e.target.value),placeholder:"Account holder name (must match company name)"})]})]})]}),(0,d.jsxs)(g,{children:[(0,d.jsx)(m,{children:"Company Logo"}),(0,d.jsx)(r.A,{value:a.logoUrl||"",onChange:e=>{n(a=>({...a,logoUrl:e}))},label:"",helpText:"Upload your company logo for use in invoices and official documents"})]})]})]})})}}}]);