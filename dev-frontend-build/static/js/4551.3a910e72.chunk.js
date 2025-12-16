"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4551],{4551:(e,t,n)=>{n.r(t),n.d(t,{default:()=>j});var i=n(9950),a=n(4752),r=n(3310),o=n(7492),s=n(4414);const d=a.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,l=a.Ay.div`
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
`,c=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`,h=a.Ay.div`
  margin-bottom: 20px;
`,g=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,u=a.Ay.input`
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
`,m=a.Ay.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,y=a.Ay.div`
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.isDragging?"#F0F4FF":"white"};
  min-height: 148px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #635BFF;
    background: #F8FAFC;
  }

  ${e=>e.isDragging&&"\n    border-color: #635BFF;\n    background: #F0F4FF;\n  "}
`,b=a.Ay.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  object-fit: contain;
`,j=()=>{const[e,t]=(0,i.useState)(!1),[n,a]=(0,i.useState)(""),[,]=(0,i.useState)(!1),[j,v]=(0,i.useState)(""),[f,C]=(0,i.useState)(!1),[w,F]=(0,i.useState)(!1),[E,S]=(0,i.useState)(null),[A,N]=(0,i.useState)({companyName:"",address:"",city:"",state:"",postalCode:"",country:"Malaysia",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",brandLogo:"",companyLogo:""});(0,i.useEffect)(()=>{k()},[]);const k=async()=>{try{const e=await fetch("/api/admin/settings");if(e.ok){const t=await e.json();N(t),S(t)}else console.error("Failed to load settings:",e.status)}catch(e){console.error("Error loading settings:",e)}},B=(e,t)=>{N(n=>({...n,[e]:t})),f||(C(!0),F(!1))};(0,i.useEffect)(()=>{if(E){const e=JSON.stringify(A)!==JSON.stringify(E);C(e),e&&w&&F(!1)}},[A,E,w]);const z=(e,t)=>{if(v(""),!e.type.startsWith("image/"))return void v("Please upload an image file (PNG, JPG, etc.)");if(e.size>2097152)return void v("File size must be less than 2MB");const n=new FileReader;n.onload=e=>{var n;const i=null===(n=e.target)||void 0===n?void 0:n.result;N(e=>({...e,["brand"===t?"brandLogo":"companyLogo"]:i})),v(""),f||(C(!0),F(!1))},n.readAsDataURL(e)};return(0,s.jsx)(r.A,{children:(0,s.jsxs)(d,{children:[(0,s.jsx)(l,{children:(0,s.jsx)(p,{children:"Company Information"})}),(0,s.jsxs)(c,{children:[(0,s.jsx)(x,{children:(0,s.jsxs)(h,{children:[(0,s.jsx)(g,{children:"Company Logo"}),(0,s.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"12px",lineHeight:"1.5"},children:"Used on invoices and documents"}),(0,s.jsx)(y,{onClick:()=>{var e;return null===(e=document.getElementById("company-logo-input"))||void 0===e?void 0:e.click()},children:A.companyLogo?(0,s.jsx)(b,{src:A.companyLogo,alt:"Company Logo"}):(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload"}),(0,s.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,s.jsx)("input",{id:"company-logo-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>{var t;const n=null===(t=e.target.files)||void 0===t?void 0:t[0];n&&z(n,"company")}})]})}),(0,s.jsxs)(x,{children:[(0,s.jsxs)(h,{children:[(0,s.jsx)(g,{children:"Company Name *"}),(0,s.jsx)(u,{type:"text",value:A.companyName,onChange:e=>B("companyName",e.target.value),placeholder:"Enter company name",required:!0})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)(g,{children:"Registration Number"}),(0,s.jsx)(u,{type:"text",value:A.registrationNumber,onChange:e=>B("registrationNumber",e.target.value),placeholder:"ROC/SSM Number"})]})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)(g,{children:"Address *"}),(0,s.jsx)(m,{value:A.address,onChange:e=>B("address",e.target.value),placeholder:"Enter complete address",rows:3,required:!0})]}),(0,s.jsxs)(x,{children:[(0,s.jsxs)(h,{children:[(0,s.jsx)(g,{children:"City *"}),(0,s.jsx)(u,{type:"text",value:A.city,onChange:e=>B("city",e.target.value),placeholder:"Enter city",required:!0})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)(g,{children:"State *"}),(0,s.jsx)(u,{type:"text",value:A.state,onChange:e=>B("state",e.target.value),placeholder:"Enter state",required:!0})]})]}),(0,s.jsxs)(x,{children:[(0,s.jsxs)(h,{children:[(0,s.jsx)(g,{children:"Postal Code *"}),(0,s.jsx)(u,{type:"text",value:A.postalCode,onChange:e=>B("postalCode",e.target.value),placeholder:"Enter postal code",required:!0})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)(g,{children:"Country *"}),(0,s.jsx)(u,{type:"text",value:A.country,onChange:e=>B("country",e.target.value),placeholder:"Enter country",required:!0})]})]}),(0,s.jsxs)(x,{children:[(0,s.jsxs)(h,{children:[(0,s.jsx)(g,{children:"Phone Number *"}),(0,s.jsx)(u,{type:"tel",value:A.phone,onChange:e=>B("phone",e.target.value),placeholder:"+60 3-1234 5678",required:!0})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)(g,{children:"Email Address *"}),(0,s.jsx)(u,{type:"email",value:A.email,onChange:e=>B("email",e.target.value),placeholder:"admin@company.com",required:!0})]})]}),(0,s.jsxs)(x,{children:[(0,s.jsxs)(h,{children:[(0,s.jsx)(g,{children:"Website"}),(0,s.jsx)(u,{type:"url",value:A.website,onChange:e=>B("website",e.target.value),placeholder:"www.company.com"})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)(g,{children:"Tax Number"}),(0,s.jsx)(u,{type:"text",value:A.taxNumber,onChange:e=>B("taxNumber",e.target.value),placeholder:"GST/SST Registration Number"})]})]}),(0,s.jsxs)(o.He,{children:[(0,s.jsxs)(o.r6,{children:[(0,s.jsx)(o.yY,{type:"button",variant:"secondary",onClick:()=>{E&&(N(E),C(!1),F(!1),v(""),a(""))},disabled:!f,children:"Reset Changes"}),(0,s.jsx)(o.yY,{type:"button",onClick:async()=>{if(f){t(!0),v(""),a("");try{if(!(await fetch("/api/admin/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(A)})).ok)throw new Error("Failed to save settings");window.dispatchEvent(new Event("brandLogoUpdated")),S(A),C(!1),F(!0),a("Settings saved successfully!")}catch(e){console.error("Error saving settings to API:",e),v("Failed to save settings. Please try again.")}finally{t(!1)}}},disabled:!f||e,children:f?e?"Saving...":"Save Changes":"Saved"})]}),w&&!f&&(0,s.jsx)(o.Mo,{type:"success",children:n||"Your settings have been successfully updated."}),j&&(0,s.jsx)(o.Mo,{type:"error",children:j})]})]})]})})}}}]);