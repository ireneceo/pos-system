"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4551],{2435:(e,n,o)=>{o.d(n,{FS:()=>t});const t=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},4551:(e,n,o)=>{o.r(n),o.d(n,{default:()=>C});var t=o(9950),a=o(4752),i=o(2674),s=o(2435),r=o(8666),d=o(4414);const l=a.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,c=a.Ay.div`
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
`,p=a.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=a.Ay.h1`
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
`,u=a.Ay.div`
  margin-bottom: 20px;
`,g=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,m=a.Ay.input`
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
`,y=a.Ay.textarea`
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
`,b=a.Ay.select`
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
`,j=a.Ay.div`
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
`,v=a.Ay.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  object-fit: contain;
`,C=()=>{var e,n;const[o,a]=(0,t.useState)(!1),[C,f]=(0,t.useState)(""),[,]=(0,t.useState)(!1),[w,A]=(0,t.useState)(""),[F,S]=(0,t.useState)(!1),[k,z]=(0,t.useState)(!1),[E,B]=(0,t.useState)(null),[N,M]=(0,t.useState)({companyName:"",address:"",city:"",state:"",postalCode:"",country:"MY",phone:"",whatsapp:"",email:"",website:"",taxNumber:"",registrationNumber:"",brandLogo:"",companyLogo:"",businessHours:{weekdays:"9:00 AM - 6:00 PM (GMT+8)",weekend:"Closed"}});(0,t.useEffect)(()=>{P()},[]);const P=async()=>{try{const e=await fetch("/api/admin/settings");if(e.ok){const n=await e.json();M(n),B(n)}else console.error("Failed to load settings:",e.status)}catch(e){console.error("Error loading settings:",e)}},H=(e,n)=>{M(o=>({...o,[e]:n})),F||(S(!0),z(!1))};(0,t.useEffect)(()=>{if(E){const e=JSON.stringify(N)!==JSON.stringify(E);S(e),e&&k&&z(!1)}},[N,E,k]);const L=(e,n)=>{if(A(""),!e.type.startsWith("image/"))return void A("Please upload an image file (PNG, JPG, etc.)");if(e.size>2097152)return void A("File size must be less than 2MB");const o=new FileReader;o.onload=e=>{var o;const t=null===(o=e.target)||void 0===o?void 0:o.result;M(e=>({...e,["brand"===n?"brandLogo":"companyLogo"]:t})),A(""),F||(S(!0),z(!1))},o.readAsDataURL(e)};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(l,{children:[(0,d.jsx)(c,{children:(0,d.jsx)(h,{children:"Company Information"})}),(0,d.jsxs)(p,{children:[(0,d.jsx)(x,{children:(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"Company Logo"}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"12px",lineHeight:"1.5"},children:"Used on invoices and documents"}),(0,d.jsx)(j,{onClick:()=>{var e;return null===(e=document.getElementById("company-logo-input"))||void 0===e?void 0:e.click()},children:N.companyLogo?(0,d.jsx)(v,{src:N.companyLogo,alt:"Company Logo"}):(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload"}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,d.jsx)("input",{id:"company-logo-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>{var n;const o=null===(n=e.target.files)||void 0===n?void 0:n[0];o&&L(o,"company")}})]})}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"Company Name *"}),(0,d.jsx)(m,{type:"text",value:N.companyName,onChange:e=>H("companyName",e.target.value),placeholder:"Enter company name",required:!0})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"Registration Number"}),(0,d.jsx)(m,{type:"text",value:N.registrationNumber,onChange:e=>H("registrationNumber",e.target.value),placeholder:"ROC/SSM Number"})]})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"Address *"}),(0,d.jsx)(y,{value:N.address,onChange:e=>H("address",e.target.value),placeholder:"Enter complete address",rows:3,required:!0})]}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"City *"}),(0,d.jsx)(m,{type:"text",value:N.city,onChange:e=>H("city",e.target.value),placeholder:"Enter city",required:!0})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"State *"}),(0,d.jsx)(m,{type:"text",value:N.state,onChange:e=>H("state",e.target.value),placeholder:"Enter state",required:!0})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"Postal Code *"}),(0,d.jsx)(m,{type:"text",value:N.postalCode,onChange:e=>H("postalCode",e.target.value),placeholder:"Enter postal code",required:!0})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"Country *"}),(0,d.jsx)(b,{value:N.country,onChange:e=>H("country",e.target.value),required:!0,children:s.FS.map(e=>(0,d.jsx)("option",{value:e.code,children:e.name},e.code))})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"Phone Number *"}),(0,d.jsx)(r.A,{value:N.phone,onChange:e=>H("phone",e),defaultCountry:N.country})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"WhatsApp"}),(0,d.jsx)(r.A,{value:N.whatsapp,onChange:e=>H("whatsapp",e),defaultCountry:N.country}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"For Contact page and customer communication"})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"Email Address *"}),(0,d.jsx)(m,{type:"email",value:N.email,onChange:e=>H("email",e.target.value),placeholder:"admin@company.com",required:!0})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"Website"}),(0,d.jsx)(m,{type:"url",value:N.website,onChange:e=>H("website",e.target.value),placeholder:"www.company.com"})]})]}),(0,d.jsx)(x,{children:(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"Tax Number"}),(0,d.jsx)(m,{type:"text",value:N.taxNumber,onChange:e=>H("taxNumber",e.target.value),placeholder:"GST/SST Registration Number"})]})}),(0,d.jsxs)(x,{children:[(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"Business Hours (Weekdays)"}),(0,d.jsx)(m,{type:"text",value:(null===(e=N.businessHours)||void 0===e?void 0:e.weekdays)||"",onChange:e=>M(n=>({...n,businessHours:{...n.businessHours,weekdays:e.target.value}})),placeholder:"e.g., 9:00 AM - 6:00 PM (GMT+8)"})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"Business Hours (Weekend)"}),(0,d.jsx)(m,{type:"text",value:(null===(n=N.businessHours)||void 0===n?void 0:n.weekend)||"",onChange:e=>M(n=>({...n,businessHours:{...n.businessHours,weekend:e.target.value}})),placeholder:"e.g., Closed or 10:00 AM - 2:00 PM"})]})]}),(0,d.jsxs)(i.He,{children:[(0,d.jsxs)(i.r6,{children:[(0,d.jsx)(i.yY,{type:"button",variant:"secondary",onClick:()=>{E&&(M(E),S(!1),z(!1),A(""),f(""))},disabled:!F,children:"Reset Changes"}),(0,d.jsx)(i.yY,{type:"button",onClick:async()=>{if(F){a(!0),A(""),f("");try{if(!(await fetch("/api/admin/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(N)})).ok)throw new Error("Failed to save settings");window.dispatchEvent(new Event("brandLogoUpdated")),B(N),S(!1),z(!0),f("Settings saved successfully!")}catch(e){console.error("Error saving settings to API:",e),A("Failed to save settings. Please try again.")}finally{a(!1)}}},disabled:!F||o,children:F?o?"Saving...":"Save Changes":"Saved"})]}),k&&!F&&(0,d.jsx)(i.Mo,{type:"success",children:C||"Your settings have been successfully updated."}),w&&(0,d.jsx)(i.Mo,{type:"error",children:w})]})]})]})})}}}]);