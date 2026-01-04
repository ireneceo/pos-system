"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4551],{2435:(e,n,o)=>{o.d(n,{FS:()=>t});const t=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},4551:(e,n,o)=>{o.r(n),o.d(n,{default:()=>C});var t=o(9950),i=o(4752),a=o(3310),r=o(7492),s=o(2435),d=o(2874),l=o(4414);const c=i.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,p=i.Ay.div`
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
`,h=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`,m=i.Ay.div`
  margin-bottom: 20px;
`,u=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,y=i.Ay.input`
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
`,b=i.Ay.textarea`
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
`,j=i.Ay.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,v=i.Ay.div`
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
`,f=i.Ay.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  object-fit: contain;
`,C=()=>{const[e,n]=(0,t.useState)(!1),[o,i]=(0,t.useState)(""),[,]=(0,t.useState)(!1),[C,F]=(0,t.useState)(""),[w,A]=(0,t.useState)(!1),[S,z]=(0,t.useState)(!1),[E,k]=(0,t.useState)(null),[N,B]=(0,t.useState)({companyName:"",address:"",city:"",state:"",postalCode:"",country:"MY",phone:"",email:"",website:"",taxNumber:"",registrationNumber:"",brandLogo:"",companyLogo:""});(0,t.useEffect)(()=>{P()},[]);const P=async()=>{try{const e=await fetch("/api/admin/settings");if(e.ok){const n=await e.json();B(n),k(n)}else console.error("Failed to load settings:",e.status)}catch(e){console.error("Error loading settings:",e)}},L=(e,n)=>{B(o=>({...o,[e]:n})),w||(A(!0),z(!1))};(0,t.useEffect)(()=>{if(E){const e=JSON.stringify(N)!==JSON.stringify(E);A(e),e&&S&&z(!1)}},[N,E,S]);const M=(e,n)=>{if(F(""),!e.type.startsWith("image/"))return void F("Please upload an image file (PNG, JPG, etc.)");if(e.size>2097152)return void F("File size must be less than 2MB");const o=new FileReader;o.onload=e=>{var o;const t=null===(o=e.target)||void 0===o?void 0:o.result;B(e=>({...e,["brand"===n?"brandLogo":"companyLogo"]:t})),F(""),w||(A(!0),z(!1))},o.readAsDataURL(e)};return(0,l.jsx)(a.A,{children:(0,l.jsxs)(c,{children:[(0,l.jsx)(p,{children:(0,l.jsx)(x,{children:"Company Information"})}),(0,l.jsxs)(h,{children:[(0,l.jsx)(g,{children:(0,l.jsxs)(m,{children:[(0,l.jsx)(u,{children:"Company Logo"}),(0,l.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"12px",lineHeight:"1.5"},children:"Used on invoices and documents"}),(0,l.jsx)(v,{onClick:()=>{var e;return null===(e=document.getElementById("company-logo-input"))||void 0===e?void 0:e.click()},children:N.companyLogo?(0,l.jsx)(f,{src:N.companyLogo,alt:"Company Logo"}):(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload"}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,l.jsx)("input",{id:"company-logo-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>{var n;const o=null===(n=e.target.files)||void 0===n?void 0:n[0];o&&M(o,"company")}})]})}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(u,{children:"Company Name *"}),(0,l.jsx)(y,{type:"text",value:N.companyName,onChange:e=>L("companyName",e.target.value),placeholder:"Enter company name",required:!0})]}),(0,l.jsxs)(m,{children:[(0,l.jsx)(u,{children:"Registration Number"}),(0,l.jsx)(y,{type:"text",value:N.registrationNumber,onChange:e=>L("registrationNumber",e.target.value),placeholder:"ROC/SSM Number"})]})]}),(0,l.jsxs)(m,{children:[(0,l.jsx)(u,{children:"Address *"}),(0,l.jsx)(b,{value:N.address,onChange:e=>L("address",e.target.value),placeholder:"Enter complete address",rows:3,required:!0})]}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(u,{children:"City *"}),(0,l.jsx)(y,{type:"text",value:N.city,onChange:e=>L("city",e.target.value),placeholder:"Enter city",required:!0})]}),(0,l.jsxs)(m,{children:[(0,l.jsx)(u,{children:"State *"}),(0,l.jsx)(y,{type:"text",value:N.state,onChange:e=>L("state",e.target.value),placeholder:"Enter state",required:!0})]})]}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(u,{children:"Postal Code *"}),(0,l.jsx)(y,{type:"text",value:N.postalCode,onChange:e=>L("postalCode",e.target.value),placeholder:"Enter postal code",required:!0})]}),(0,l.jsxs)(m,{children:[(0,l.jsx)(u,{children:"Country *"}),(0,l.jsx)(j,{value:N.country,onChange:e=>L("country",e.target.value),required:!0,children:s.FS.map(e=>(0,l.jsx)("option",{value:e.code,children:e.name},e.code))})]})]}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(u,{children:"Phone Number *"}),(0,l.jsx)(d.A,{value:N.phone,onChange:e=>L("phone",e),defaultCountry:N.country})]}),(0,l.jsxs)(m,{children:[(0,l.jsx)(u,{children:"Email Address *"}),(0,l.jsx)(y,{type:"email",value:N.email,onChange:e=>L("email",e.target.value),placeholder:"admin@company.com",required:!0})]})]}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(u,{children:"Website"}),(0,l.jsx)(y,{type:"url",value:N.website,onChange:e=>L("website",e.target.value),placeholder:"www.company.com"})]}),(0,l.jsxs)(m,{children:[(0,l.jsx)(u,{children:"Tax Number"}),(0,l.jsx)(y,{type:"text",value:N.taxNumber,onChange:e=>L("taxNumber",e.target.value),placeholder:"GST/SST Registration Number"})]})]}),(0,l.jsxs)(r.He,{children:[(0,l.jsxs)(r.r6,{children:[(0,l.jsx)(r.yY,{type:"button",variant:"secondary",onClick:()=>{E&&(B(E),A(!1),z(!1),F(""),i(""))},disabled:!w,children:"Reset Changes"}),(0,l.jsx)(r.yY,{type:"button",onClick:async()=>{if(w){n(!0),F(""),i("");try{if(!(await fetch("/api/admin/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(N)})).ok)throw new Error("Failed to save settings");window.dispatchEvent(new Event("brandLogoUpdated")),k(N),A(!1),z(!0),i("Settings saved successfully!")}catch(e){console.error("Error saving settings to API:",e),F("Failed to save settings. Please try again.")}finally{n(!1)}}},disabled:!w||e,children:w?e?"Saving...":"Save Changes":"Saved"})]}),S&&!w&&(0,l.jsx)(r.Mo,{type:"success",children:o||"Your settings have been successfully updated."}),C&&(0,l.jsx)(r.Mo,{type:"error",children:C})]})]})]})})}}}]);