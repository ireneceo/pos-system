"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6136],{4669:(e,a,n)=>{n.d(a,{A:()=>b});var o=n(9950),t=n(4752),i=n(4414);const r=t.Ay.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
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
`,j=t.Ay.input`
  display: none;
`,b=e=>{let{value:a,onChange:n,label:t="Logo Upload",helpText:b="Upload an image for your logo",maxSize:v=2,previewSize:y=150,showRemoveButton:f=!0,changeButtonText:k="Change Image",removeButtonText:A="Remove Image",imageAltText:C="Uploaded"}=e;const[B,w]=(0,o.useState)(!1),F=(0,o.useRef)(null),N=(0,o.useRef)(null),S=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);const a=new FileReader;a.onload=e=>{var a;const o=new Image;o.onload=()=>{const e=document.createElement("canvas"),a=e.getContext("2d");if(!a)return;const t=800;let i=o.width,r=o.height;(i>t||r>t)&&(i>r?(r=r/i*t,i=t):(i=i/r*t,r=t)),e.width=i,e.height=r,a.drawImage(o,0,0,i,r);const s=e.toDataURL("image/jpeg",.85);n(s)},o.src=null===(a=e.target)||void 0===a?void 0:a.result},a.readAsDataURL(e)},I=e=>{const a=e.target.files;a&&a.length>0&&S(a[0])};return(0,i.jsxs)(r,{children:[t&&(0,i.jsx)(s,{children:t}),b&&(0,i.jsx)(l,{children:b}),(0,i.jsxs)(d,{children:[(0,i.jsx)(c,{ref:N,isDragging:B,hasImage:!!a,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),w(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===N.current&&w(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),w(!1);const a=e.dataTransfer.files;a&&a.length>0&&S(a[0])},onClick:()=>{var e;a||(null===(e=F.current)||void 0===e||e.click())},children:a?(0,i.jsx)("img",{src:a,alt:C}):(0,i.jsxs)(p,{children:[(0,i.jsx)(h,{children:B?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(x,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),a&&(0,i.jsxs)(u,{children:[(0,i.jsxs)(g,{children:[k,(0,i.jsx)("input",{ref:F,type:"file",accept:"image/*",onChange:I})]}),f&&(0,i.jsx)(m,{onClick:()=>{n("")},children:A})]})]}),!a&&(0,i.jsx)(j,{ref:F,type:"file",accept:"image/*",onChange:I})]})}},6136:(e,a,n)=>{n.r(a),n.d(a,{default:()=>k});var o=n(9950),t=n(4752),i=n(3310),r=n(1367),s=n(4669),l=n(4414);const d=t.Ay.div`
  background: #FAFBFC;
  min-height: 100vh;
`,c=t.Ay.div`
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
`,p=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=t.Ay.button`
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
`,x=t.Ay.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,u=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #F3F4F6;
`,m=t.Ay.div`
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
`,b=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;

  span {
    color: #DC2626;
    margin-left: 2px;
  }
`,v=t.Ay.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    cursor: not-allowed;
  }
`,y=t.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,f=t.Ay.div`
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
`,k=()=>{const{user:e}=(0,r.As)(),[a,n]=(0,o.useState)({id:"",companyName:"",registrationNo:"",tradeName:"",address:"",city:"",state:"",postcode:"",country:"Malaysia",phone:"",email:"",website:"",taxNo:"",bankName:"",bankAccount:"",bankAccountName:"",logoUrl:"",updatedAt:"",updatedBy:""}),[t,k]=(0,o.useState)(a),[A,C]=(0,o.useState)(!1);(0,o.useEffect)(()=>{B()},[]),(0,o.useEffect)(()=>{const e=JSON.stringify(a)!==JSON.stringify(t);C(e)},[a,t]);const B=async()=>{try{if(null!==e&&void 0!==e&&e.restaurantId){const o=await fetch(`/api/restaurants/${e.restaurantId}`);if(o.ok){var a;const e=await o.json(),t=e.data||e,i={id:(null===(a=t.id)||void 0===a?void 0:a.toString())||"",companyName:t.name||"",registrationNo:t.business_registration||"",tradeName:t.trade_name||"",address:t.address||"",city:t.city||"",state:t.state||"",postcode:t.postal_code||"",country:t.country||"Malaysia",phone:t.phone||"",email:t.email||"",website:t.website||"",taxNo:t.tax_id||"",bankName:t.bank_name||"",bankAccount:t.bank_account||"",bankAccountName:t.bank_account_name||"",logoUrl:t.logo_url||"",updatedAt:t.updatedAt||"",updatedBy:t.updated_by||""};n(i),k(i)}}}catch(o){console.error("Failed to load company information:",o)}},w=(e,a)=>{n(n=>({...n,[e]:a}))};return(0,l.jsx)(i.A,{children:(0,l.jsxs)(d,{children:[(0,l.jsxs)(c,{children:[(0,l.jsx)(p,{children:"Company Information"}),(0,l.jsx)(h,{hasChanges:A,onClick:async()=>{try{if(null!==e&&void 0!==e&&e.restaurantId){(await fetch(`/api/restaurants/${e.restaurantId}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:a.companyName,business_registration:a.registrationNo,trade_name:a.tradeName,address:a.address,city:a.city,state:a.state,postal_code:a.postcode,country:a.country,phone:a.phone,email:a.email,website:a.website,tax_id:a.taxNo,bank_name:a.bankName,bank_account:a.bankAccount,bank_account_name:a.bankAccountName,logo_url:a.logoUrl})})).ok?(k(a),C(!1),alert("Company information saved successfully!")):alert("Failed to save company information.")}}catch(n){console.error("Save error:",n),alert("An error occurred while saving.")}},disabled:!A,children:"Save Changes"})]}),(0,l.jsxs)(x,{children:[(0,l.jsx)(f,{children:(0,l.jsx)("p",{children:"Manage your restaurant's official business information. This information will be used for invoicing, legal documents, and official communications."})}),(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{children:"Basic Information"}),(0,l.jsxs)(m,{children:[(0,l.jsxs)(j,{children:[(0,l.jsxs)(b,{children:["Company Name ",(0,l.jsx)("span",{children:"*"})]}),(0,l.jsx)(v,{type:"text",value:a.companyName,onChange:e=>w("companyName",e.target.value),placeholder:"Legal entity name"})]}),(0,l.jsxs)(j,{children:[(0,l.jsxs)(b,{children:["Registration Number ",(0,l.jsx)("span",{children:"*"})]}),(0,l.jsx)(v,{type:"text",value:a.registrationNo,onChange:e=>w("registrationNo",e.target.value),placeholder:"e.g., 202401234567"})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(b,{children:"Trade Name / Brand Name"}),(0,l.jsx)(v,{type:"text",value:a.tradeName||"",onChange:e=>w("tradeName",e.target.value),placeholder:"e.g., ABC Kitchen & Grill"})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(b,{children:"Tax Number (SST/GST)"}),(0,l.jsx)(v,{type:"text",value:a.taxNo||"",onChange:e=>w("taxNo",e.target.value),placeholder:"e.g., W10-1234-56789012"})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(b,{children:"Website"}),(0,l.jsx)(v,{type:"url",value:a.website||"",onChange:e=>w("website",e.target.value),placeholder:"www.example.com"})]})]})]}),(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{children:"Contact Information"}),(0,l.jsxs)(m,{children:[(0,l.jsxs)(j,{fullWidth:!0,children:[(0,l.jsxs)(b,{children:["Address ",(0,l.jsx)("span",{children:"*"})]}),(0,l.jsx)(v,{type:"text",value:a.address,onChange:e=>w("address",e.target.value),placeholder:"Street address"})]}),(0,l.jsxs)(j,{children:[(0,l.jsxs)(b,{children:["City ",(0,l.jsx)("span",{children:"*"})]}),(0,l.jsx)(v,{type:"text",value:a.city,onChange:e=>w("city",e.target.value),placeholder:"e.g., Kuala Lumpur"})]}),(0,l.jsxs)(j,{children:[(0,l.jsxs)(b,{children:["State ",(0,l.jsx)("span",{children:"*"})]}),(0,l.jsxs)(y,{value:a.state,onChange:e=>w("state",e.target.value),children:[(0,l.jsx)("option",{value:"",children:"Select State"}),(0,l.jsx)("option",{value:"Wilayah Persekutuan",children:"Wilayah Persekutuan"}),(0,l.jsx)("option",{value:"Selangor",children:"Selangor"}),(0,l.jsx)("option",{value:"Penang",children:"Penang"}),(0,l.jsx)("option",{value:"Johor",children:"Johor"}),(0,l.jsx)("option",{value:"Perak",children:"Perak"}),(0,l.jsx)("option",{value:"Kedah",children:"Kedah"}),(0,l.jsx)("option",{value:"Kelantan",children:"Kelantan"}),(0,l.jsx)("option",{value:"Melaka",children:"Melaka"}),(0,l.jsx)("option",{value:"Negeri Sembilan",children:"Negeri Sembilan"}),(0,l.jsx)("option",{value:"Pahang",children:"Pahang"}),(0,l.jsx)("option",{value:"Perlis",children:"Perlis"}),(0,l.jsx)("option",{value:"Sabah",children:"Sabah"}),(0,l.jsx)("option",{value:"Sarawak",children:"Sarawak"}),(0,l.jsx)("option",{value:"Terengganu",children:"Terengganu"})]})]}),(0,l.jsxs)(j,{children:[(0,l.jsxs)(b,{children:["Postcode ",(0,l.jsx)("span",{children:"*"})]}),(0,l.jsx)(v,{type:"text",value:a.postcode,onChange:e=>w("postcode",e.target.value),placeholder:"e.g., 50250"})]}),(0,l.jsxs)(j,{children:[(0,l.jsxs)(b,{children:["Country ",(0,l.jsx)("span",{children:"*"})]}),(0,l.jsxs)(y,{value:a.country,onChange:e=>w("country",e.target.value),children:[(0,l.jsx)("option",{value:"Malaysia",children:"Malaysia"}),(0,l.jsx)("option",{value:"Singapore",children:"Singapore"}),(0,l.jsx)("option",{value:"Thailand",children:"Thailand"}),(0,l.jsx)("option",{value:"Indonesia",children:"Indonesia"})]})]}),(0,l.jsxs)(j,{children:[(0,l.jsxs)(b,{children:["Phone ",(0,l.jsx)("span",{children:"*"})]}),(0,l.jsx)(v,{type:"tel",value:a.phone,onChange:e=>w("phone",e.target.value),placeholder:"+60 3-1234 5678"})]}),(0,l.jsxs)(j,{children:[(0,l.jsxs)(b,{children:["Email ",(0,l.jsx)("span",{children:"*"})]}),(0,l.jsx)(v,{type:"email",value:a.email,onChange:e=>w("email",e.target.value),placeholder:"contact@example.com"})]})]})]}),(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{children:"Banking Information"}),(0,l.jsxs)(m,{children:[(0,l.jsxs)(j,{children:[(0,l.jsx)(b,{children:"Bank Name"}),(0,l.jsxs)(y,{value:a.bankName||"",onChange:e=>w("bankName",e.target.value),children:[(0,l.jsx)("option",{value:"",children:"Select Bank"}),(0,l.jsx)("option",{value:"Maybank",children:"Maybank"}),(0,l.jsx)("option",{value:"CIMB Bank",children:"CIMB Bank"}),(0,l.jsx)("option",{value:"Public Bank",children:"Public Bank"}),(0,l.jsx)("option",{value:"RHB Bank",children:"RHB Bank"}),(0,l.jsx)("option",{value:"Hong Leong Bank",children:"Hong Leong Bank"}),(0,l.jsx)("option",{value:"AmBank",children:"AmBank"}),(0,l.jsx)("option",{value:"UOB",children:"UOB"}),(0,l.jsx)("option",{value:"OCBC Bank",children:"OCBC Bank"}),(0,l.jsx)("option",{value:"HSBC",children:"HSBC"}),(0,l.jsx)("option",{value:"Standard Chartered",children:"Standard Chartered"}),(0,l.jsx)("option",{value:"Bank Islam",children:"Bank Islam"}),(0,l.jsx)("option",{value:"Bank Rakyat",children:"Bank Rakyat"})]})]}),(0,l.jsxs)(j,{children:[(0,l.jsx)(b,{children:"Account Number"}),(0,l.jsx)(v,{type:"text",value:a.bankAccount||"",onChange:e=>w("bankAccount",e.target.value),placeholder:"e.g., 514123456789"})]}),(0,l.jsxs)(j,{fullWidth:!0,children:[(0,l.jsx)(b,{children:"Account Name"}),(0,l.jsx)(v,{type:"text",value:a.bankAccountName||"",onChange:e=>w("bankAccountName",e.target.value),placeholder:"Account holder name (must match company name)"})]})]})]}),(0,l.jsxs)(u,{children:[(0,l.jsx)(g,{children:"Company Logo"}),(0,l.jsx)(s.A,{value:a.logoUrl||"",onChange:e=>{n(a=>({...a,logoUrl:e}))},label:"",helpText:"Upload your company logo for use in invoices and official documents"})]})]})]})})}}}]);