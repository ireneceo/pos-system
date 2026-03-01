"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4269],{4269:(e,i,n)=>{n.r(i),n.d(i,{default:()=>f});var o=n(9950),a=n(4752),t=n(3832),r=n(8409),s=n(4414);const l=a.Ay.form`
  /* No additional styling - uses Content background */
`,d=a.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,c=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,u=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`,g=a.Ay.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`,p=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,h=a.Ay.input`
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

  &::placeholder {
    color: #9CA3AF;
  }
`,x=a.Ay.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,m=a.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin-top: 8px;
`,v=a.Ay.div`
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.isDragging?"#F0F4FF":"white"};
  min-height: 120px;
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
`,y=[{label:"Malaysia (UTC+8)",value:"Asia/Kuala_Lumpur"},{label:"Singapore (UTC+8)",value:"Asia/Singapore"},{label:"South Korea (UTC+9)",value:"Asia/Seoul"},{label:"Japan (UTC+9)",value:"Asia/Tokyo"},{label:"China (UTC+8)",value:"Asia/Shanghai"},{label:"Thailand (UTC+7)",value:"Asia/Bangkok"},{label:"Vietnam (UTC+7)",value:"Asia/Ho_Chi_Minh"},{label:"Philippines (UTC+8)",value:"Asia/Manila"},{label:"Indonesia - Jakarta (UTC+7)",value:"Asia/Jakarta"},{label:"India (UTC+5:30)",value:"Asia/Kolkata"},{label:"Australia - Sydney (UTC+10/+11)",value:"Australia/Sydney"},{label:"United States - New York (UTC-5/-4)",value:"America/New_York"},{label:"United States - Los Angeles (UTC-8/-7)",value:"America/Los_Angeles"},{label:"United States - Chicago (UTC-6/-5)",value:"America/Chicago"},{label:"United Kingdom (UTC+0/+1)",value:"Europe/London"},{label:"Germany (UTC+1/+2)",value:"Europe/Berlin"},{label:"France (UTC+1/+2)",value:"Europe/Paris"},{label:"Dubai (UTC+4)",value:"Asia/Dubai"},{label:"Hong Kong (UTC+8)",value:"Asia/Hong_Kong"},{label:"Taiwan (UTC+8)",value:"Asia/Taipei"}],f=()=>{const[e,i]=(0,o.useState)({site_name:"",favicon_url:"",brand_logo:"",seo_title:"",seo_description:"",seo_keywords:"",og_image_url:"",timezone:"Asia/Kuala_Lumpur"}),[n,a]=(0,o.useState)(null),[f,j]=(0,o.useState)(!0),[_,S]=(0,o.useState)(!1),[C,A]=(0,o.useState)(""),[F,k]=(0,o.useState)(""),[w,E]=(0,o.useState)(!1),[T,z]=(0,o.useState)(!1),[B,U]=(0,o.useState)(!1),[D,P]=(0,o.useState)(!1),[L,O]=(0,o.useState)(!1),[M,G]=(0,o.useState)({}),[N,J]=(0,o.useState)([]),[I,K]=(0,o.useState)("RM"),[Y,H]=(0,o.useState)(!1),[R,W]=(0,o.useState)([]);(0,o.useEffect)(()=>{V(),$()},[]),(0,o.useEffect)(()=>{if(n){const i=JSON.stringify(e)!==JSON.stringify(n);E(i),i&&T&&z(!1)}},[e,n,T]);const $=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const i=await e.json();i.success&&i.currencies&&(G(i.currencies),i.defaultCurrency&&K(i.defaultCurrency))}const i=await fetch("/api/currencies/supported");if(i.ok){const e=await i.json();e.success&&e.data&&J(e.data.map(e=>e.code))}}catch(e){console.error("Error fetching currency settings:",e)}},V=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const n=await e.json(),o={site_name:n.site_name||"",favicon_url:n.favicon_url||"",brand_logo:n.brand_logo||"",seo_title:n.seo_title||"",seo_description:n.seo_description||"",seo_keywords:n.seo_keywords||"",og_image_url:n.og_image_url||"",timezone:n.timezone||"Asia/Kuala_Lumpur"};i(o),a(o),E(!1),z(!1)}}catch(e){console.error("Error fetching settings:",e),k("Failed to load settings")}finally{j(!1)}},q=e=>{const{name:n,value:o}=e.target;i(e=>({...e,[n]:o}))},Z=(e,n)=>{if(!e.type.startsWith("image/"))return void k("Please upload an image file (PNG, JPG, etc.)");if(e.size>2097152)return void k("File size must be less than 2MB");const o=new FileReader;o.onload=e=>{var o;const a=null===(o=e.target)||void 0===o?void 0:o.result;i(e=>({...e,[n]:a})),k("")},o.readAsDataURL(e)},Q=(e,i)=>{var n;const o=null===(n=e.target.files)||void 0===n?void 0:n[0];o&&Z(o,i)},X=(e,i)=>{e.preventDefault(),i(!0)},ee=(e,i)=>{e.preventDefault(),i(!1)},ie=(e,i,n)=>{var o;e.preventDefault(),n(!1);const a=null===(o=e.dataTransfer.files)||void 0===o?void 0:o[0];a&&Z(a,i)},ne=e=>{let i=document.querySelector("link[rel~='icon']");i||(i=document.createElement("link"),i.rel="icon",document.head.appendChild(i)),i.href=e};return f?(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(t.mc,{children:[(0,s.jsx)(t.Y9,{children:(0,s.jsx)(t.hE,{children:"Site Settings"})}),(0,s.jsx)(t.UC,{children:(0,s.jsx)("p",{children:"Loading..."})})]})}):(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(t.mc,{children:[(0,s.jsx)(t.Y9,{children:(0,s.jsx)(t.hE,{children:"Site Settings"})}),(0,s.jsx)(t.UC,{children:(0,s.jsxs)(l,{onSubmit:async i=>{i.preventDefault(),S(!0),A(""),k("");try{const i=localStorage.getItem("auth_token"),n=await fetch("/api/site-settings",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(e)});if(n.ok)A("Site settings saved successfully! SEO tags will be updated on next page load."),a(e),E(!1),z(!0),e.brand_logo&&window.dispatchEvent(new Event("brandLogoUpdated")),e.seo_title&&(document.title=e.seo_title),e.favicon_url&&ne(e.favicon_url);else{const e=await n.json();k(e.error||"Failed to save settings")}}catch(n){console.error("Error saving settings:",n),k("An error occurred while saving settings")}finally{S(!1)}},children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(c,{children:"Basic Settings"}),(0,s.jsx)(u,{children:(0,s.jsxs)(g,{children:[(0,s.jsx)(p,{htmlFor:"site_name",children:"Site Name"}),(0,s.jsx)(h,{type:"text",id:"site_name",name:"site_name",value:e.site_name,onChange:q,placeholder:"Purple Here POS"}),(0,s.jsx)(m,{children:"The name of your site/solution"})]})}),(0,s.jsxs)(u,{children:[(0,s.jsxs)(g,{children:[(0,s.jsx)(p,{children:"Favicon"}),(0,s.jsx)(v,{isDragging:B,onClick:()=>{var e;return null===(e=document.getElementById("favicon-input"))||void 0===e?void 0:e.click()},onDragOver:e=>X(e,U),onDragLeave:e=>ee(e,U),onDrop:e=>ie(e,"favicon_url",U),children:e.favicon_url?(0,s.jsx)(b,{src:e.favicon_url,alt:"Favicon"}):(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,s.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG, JPG, or SVG (Max 2MB)"})]})}),(0,s.jsx)("input",{id:"favicon-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>Q(e,"favicon_url")}),(0,s.jsx)(m,{children:"16x16 or 32x32 px recommended"})]}),(0,s.jsxs)(g,{children:[(0,s.jsx)(p,{children:"Brand Logo"}),(0,s.jsx)(v,{isDragging:D,onClick:()=>{var e;return null===(e=document.getElementById("brand-logo-input"))||void 0===e?void 0:e.click()},onDragOver:e=>X(e,P),onDragLeave:e=>ee(e,P),onDrop:e=>ie(e,"brand_logo",P),children:e.brand_logo?(0,s.jsx)(b,{src:e.brand_logo,alt:"Brand Logo"}):(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,s.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,s.jsx)("input",{id:"brand-logo-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>Q(e,"brand_logo")}),(0,s.jsx)(m,{children:"Will appear in sidebar and login page"})]})]})]}),(0,s.jsxs)(d,{children:[(0,s.jsx)(c,{children:"System Timezone"}),(0,s.jsx)(u,{children:(0,s.jsxs)(g,{children:[(0,s.jsx)(p,{htmlFor:"timezone",children:"Timezone"}),(0,s.jsx)("select",{id:"timezone",value:e.timezone,onChange:e=>i(i=>({...i,timezone:e.target.value})),style:{width:"100%",padding:"12px 16px",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",background:"white",cursor:"pointer",boxSizing:"border-box"},children:y.map(e=>(0,s.jsx)("option",{value:e.value,children:e.label},e.value))}),(0,s.jsxs)(m,{children:["All system dates/times (dashboards, reports, invoices) will use this timezone. Current time: ",(new Date).toLocaleString("en-US",{timeZone:e.timezone,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0,year:"numeric",month:"short",day:"numeric"})]})]})})]}),(0,s.jsxs)(d,{children:[(0,s.jsx)(c,{children:"SEO Settings"}),(0,s.jsxs)(g,{children:[(0,s.jsx)(p,{htmlFor:"seo_title",children:"SEO Title"}),(0,s.jsx)(h,{type:"text",id:"seo_title",name:"seo_title",value:e.seo_title,onChange:q,placeholder:"Purple Here - Restaurant POS System",maxLength:60}),(0,s.jsx)(m,{children:"Page title for search engines (50-60 characters recommended)"})]}),(0,s.jsxs)(g,{children:[(0,s.jsx)(p,{htmlFor:"seo_description",children:"SEO Description"}),(0,s.jsx)(x,{id:"seo_description",name:"seo_description",value:e.seo_description,onChange:q,placeholder:"Complete restaurant management solution with POS, ordering, and analytics",maxLength:160}),(0,s.jsx)(m,{children:"Meta description for search engines (150-160 characters recommended)"})]}),(0,s.jsxs)(g,{children:[(0,s.jsx)(p,{htmlFor:"seo_keywords",children:"SEO Keywords"}),(0,s.jsx)(h,{type:"text",id:"seo_keywords",name:"seo_keywords",value:e.seo_keywords,onChange:q,placeholder:"restaurant pos, food ordering, restaurant management, pos system"}),(0,s.jsx)(m,{children:"Comma-separated keywords for search engines"})]}),(0,s.jsxs)(g,{children:[(0,s.jsx)(p,{children:"Open Graph Image"}),(0,s.jsx)(v,{isDragging:L,onClick:()=>{var e;return null===(e=document.getElementById("og-image-input"))||void 0===e?void 0:e.click()},onDragOver:e=>X(e,O),onDragLeave:e=>ee(e,O),onDrop:e=>ie(e,"og_image_url",O),children:e.og_image_url?(0,s.jsx)(b,{src:e.og_image_url,alt:"OG Image"}):(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,s.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,s.jsx)("input",{id:"og-image-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>Q(e,"og_image_url")}),(0,s.jsx)(m,{children:"Image for social media sharing (1200x630 px recommended)"})]})]}),(0,s.jsxs)(r.He,{children:[(0,s.jsxs)(r.r6,{children:[(0,s.jsx)(r.yY,{type:"button",variant:"secondary",onClick:V,disabled:!w,children:"Reset Changes"}),(0,s.jsx)(r.yY,{type:"submit",disabled:!w||_,children:w?_?"Saving...":"Save Changes":"Saved"})]}),T&&!w&&(0,s.jsx)(r.Mo,{type:"success",children:C||"Your settings have been successfully updated."}),F&&(0,s.jsx)(r.Mo,{type:"error",children:F})]})]})})]})})}}}]);