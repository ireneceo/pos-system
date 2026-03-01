"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4551],{2435:(e,n,a)=>{a.d(n,{FS:()=>o});const o=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},4551:(e,n,a)=>{a.r(n),a.d(n,{default:()=>m});var o=a(8819),t=a(9950),s=a(4752),i=a(2674),r=a(2435),d=a(8666),l=a(4414);const c=s.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,h=s.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${o.w.colors.border};
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
`,p=s.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,u=s.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=s.Ay.div`
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
    border-color: ${o.w.colors.primary};
    background: #F8FAFC;
  }

  ${e=>e.isDragging&&"\n    border-color: #635BFF;\n    background: #F0F4FF;\n  "}
`,x=s.Ay.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  object-fit: contain;
`,m=()=>{var e,n;const[a,o]=(0,t.useState)(!1),[s,m]=(0,t.useState)(""),[,]=(0,t.useState)(!1),[y,j]=(0,t.useState)(""),[v,C]=(0,t.useState)(!1),[b,f]=(0,t.useState)(!1),[w,S]=(0,t.useState)(null),[A,E]=(0,t.useState)({companyName:"",address:"",city:"",state:"",postalCode:"",country:"MY",phone:"",whatsapp:"",email:"",website:"",taxNumber:"",registrationNumber:"",brandLogo:"",companyLogo:"",businessHours:{weekdays:"9:00 AM - 6:00 PM (GMT+8)",weekend:"Closed"}});(0,t.useEffect)(()=>{k()},[]);const k=async()=>{try{const e=await fetch("/api/admin/settings");if(e.ok){const n=await e.json();E(n),S(n)}else console.error("Failed to load settings:",e.status)}catch(e){console.error("Error loading settings:",e)}},F=(e,n)=>{E(a=>({...a,[e]:n})),v||(C(!0),f(!1))};(0,t.useEffect)(()=>{if(w){const e=JSON.stringify(A)!==JSON.stringify(w);C(e),e&&b&&f(!1)}},[A,w,b]);const N=(e,n)=>{if(j(""),!e.type.startsWith("image/"))return void j("Please upload an image file (PNG, JPG, etc.)");if(e.size>2097152)return void j("File size must be less than 2MB");const a=new FileReader;a.onload=e=>{var a;const o=null===(a=e.target)||void 0===a?void 0:a.result;E(e=>({...e,["brand"===n?"brandLogo":"companyLogo"]:o})),j(""),v||(C(!0),f(!1))},a.readAsDataURL(e)};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(c,{children:[(0,l.jsx)(h,{children:(0,l.jsx)(u,{children:"Company Information"})}),(0,l.jsxs)(p,{children:[(0,l.jsx)(i.fh,{children:(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Company Logo"}),(0,l.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"12px",lineHeight:"1.5"},children:"Used on invoices and documents"}),(0,l.jsx)(g,{onClick:()=>{var e;return null===(e=document.getElementById("company-logo-input"))||void 0===e?void 0:e.click()},children:A.companyLogo?(0,l.jsx)(x,{src:A.companyLogo,alt:"Company Logo"}):(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload"}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,l.jsx)("input",{id:"company-logo-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>{var n;const a=null===(n=e.target.files)||void 0===n?void 0:n[0];a&&N(a,"company")}})]})}),(0,l.jsxs)(i.fh,{children:[(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Company Name *"}),(0,l.jsx)(i.ZQ,{type:"text",value:A.companyName,onChange:e=>F("companyName",e.target.value),placeholder:"Enter company name",required:!0})]}),(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Registration Number"}),(0,l.jsx)(i.ZQ,{type:"text",value:A.registrationNumber,onChange:e=>F("registrationNumber",e.target.value),placeholder:"ROC/SSM Number"})]})]}),(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Address *"}),(0,l.jsx)(i.Lz,{value:A.address,onChange:e=>F("address",e.target.value),placeholder:"Enter complete address",rows:3,required:!0})]}),(0,l.jsxs)(i.fh,{children:[(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"City *"}),(0,l.jsx)(i.ZQ,{type:"text",value:A.city,onChange:e=>F("city",e.target.value),placeholder:"Enter city",required:!0})]}),(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"State *"}),(0,l.jsx)(i.ZQ,{type:"text",value:A.state,onChange:e=>F("state",e.target.value),placeholder:"Enter state",required:!0})]})]}),(0,l.jsxs)(i.fh,{children:[(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Postal Code *"}),(0,l.jsx)(i.ZQ,{type:"text",value:A.postalCode,onChange:e=>F("postalCode",e.target.value),placeholder:"Enter postal code",required:!0})]}),(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Country *"}),(0,l.jsx)(i.FX,{value:A.country,onChange:e=>F("country",e.target.value),required:!0,children:r.FS.map(e=>(0,l.jsx)("option",{value:e.code,children:e.name},e.code))})]})]}),(0,l.jsxs)(i.fh,{children:[(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Phone Number *"}),(0,l.jsx)(d.A,{value:A.phone,onChange:e=>F("phone",e),defaultCountry:A.country})]}),(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"WhatsApp"}),(0,l.jsx)(d.A,{value:A.whatsapp,onChange:e=>F("whatsapp",e),defaultCountry:A.country}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"For Contact page and customer communication"})]})]}),(0,l.jsxs)(i.fh,{children:[(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Email Address *"}),(0,l.jsx)(i.ZQ,{type:"email",value:A.email,onChange:e=>F("email",e.target.value),placeholder:"admin@company.com",required:!0})]}),(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Website"}),(0,l.jsx)(i.ZQ,{type:"url",value:A.website,onChange:e=>F("website",e.target.value),placeholder:"www.company.com"})]})]}),(0,l.jsx)(i.fh,{children:(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Tax Number"}),(0,l.jsx)(i.ZQ,{type:"text",value:A.taxNumber,onChange:e=>F("taxNumber",e.target.value),placeholder:"GST/SST Registration Number"})]})}),(0,l.jsxs)(i.fh,{children:[(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Business Hours (Weekdays)"}),(0,l.jsx)(i.ZQ,{type:"text",value:(null===(e=A.businessHours)||void 0===e?void 0:e.weekdays)||"",onChange:e=>E(n=>({...n,businessHours:{...n.businessHours,weekdays:e.target.value}})),placeholder:"e.g., 9:00 AM - 6:00 PM (GMT+8)"})]}),(0,l.jsxs)(i.gE,{children:[(0,l.jsx)(i.lR,{children:"Business Hours (Weekend)"}),(0,l.jsx)(i.ZQ,{type:"text",value:(null===(n=A.businessHours)||void 0===n?void 0:n.weekend)||"",onChange:e=>E(n=>({...n,businessHours:{...n.businessHours,weekend:e.target.value}})),placeholder:"e.g., Closed or 10:00 AM - 2:00 PM"})]})]}),(0,l.jsxs)(i.He,{children:[(0,l.jsxs)(i.r6,{children:[(0,l.jsx)(i.yY,{type:"button",variant:"secondary",onClick:()=>{w&&(E(w),C(!1),f(!1),j(""),m(""))},disabled:!v,children:"Reset Changes"}),(0,l.jsx)(i.yY,{type:"button",onClick:async()=>{if(v){o(!0),j(""),m("");try{if(!(await fetch("/api/admin/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(A)})).ok)throw new Error("Failed to save settings");window.dispatchEvent(new Event("brandLogoUpdated")),S(A),C(!1),f(!0),m("Settings saved successfully!")}catch(e){console.error("Error saving settings to API:",e),j("Failed to save settings. Please try again.")}finally{o(!1)}}},disabled:!v||a,children:v?a?"Saving...":"Save Changes":"Saved"})]}),b&&!v&&(0,l.jsx)(i.Mo,{type:"success",children:s||"Your settings have been successfully updated."}),y&&(0,l.jsx)(i.Mo,{type:"error",children:y})]})]})]})})}}}]);