"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4269],{4269:(e,i,n)=>{n.r(i),n.d(i,{default:()=>j});var o=n(9950),a=n(4752),t=n(3310),r=n(3832),s=n(2674),l=n(4414);const d=a.Ay.form`
  /* No additional styling - uses Content background */
`,c=a.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,u=a.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,g=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`,p=a.Ay.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`,h=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,x=a.Ay.input`
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
`,m=a.Ay.textarea`
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
`,v=a.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin-top: 8px;
`,b=a.Ay.div`
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
`,y=a.Ay.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  object-fit: contain;
`,f=[{label:"Malaysia (UTC+8)",value:"Asia/Kuala_Lumpur"},{label:"Singapore (UTC+8)",value:"Asia/Singapore"},{label:"South Korea (UTC+9)",value:"Asia/Seoul"},{label:"Japan (UTC+9)",value:"Asia/Tokyo"},{label:"China (UTC+8)",value:"Asia/Shanghai"},{label:"Thailand (UTC+7)",value:"Asia/Bangkok"},{label:"Vietnam (UTC+7)",value:"Asia/Ho_Chi_Minh"},{label:"Philippines (UTC+8)",value:"Asia/Manila"},{label:"Indonesia - Jakarta (UTC+7)",value:"Asia/Jakarta"},{label:"India (UTC+5:30)",value:"Asia/Kolkata"},{label:"Australia - Sydney (UTC+10/+11)",value:"Australia/Sydney"},{label:"United States - New York (UTC-5/-4)",value:"America/New_York"},{label:"United States - Los Angeles (UTC-8/-7)",value:"America/Los_Angeles"},{label:"United States - Chicago (UTC-6/-5)",value:"America/Chicago"},{label:"United Kingdom (UTC+0/+1)",value:"Europe/London"},{label:"Germany (UTC+1/+2)",value:"Europe/Berlin"},{label:"France (UTC+1/+2)",value:"Europe/Paris"},{label:"Dubai (UTC+4)",value:"Asia/Dubai"},{label:"Hong Kong (UTC+8)",value:"Asia/Hong_Kong"},{label:"Taiwan (UTC+8)",value:"Asia/Taipei"}],j=()=>{const[e,i]=(0,o.useState)({site_name:"",favicon_url:"",brand_logo:"",seo_title:"",seo_description:"",seo_keywords:"",og_image_url:"",timezone:"Asia/Kuala_Lumpur"}),[n,a]=(0,o.useState)(null),[j,_]=(0,o.useState)(!0),[S,C]=(0,o.useState)(!1),[A,k]=(0,o.useState)(""),[w,F]=(0,o.useState)(""),[E,T]=(0,o.useState)(!1),[z,B]=(0,o.useState)(!1),[U,D]=(0,o.useState)(!1),[P,L]=(0,o.useState)(!1),[O,M]=(0,o.useState)(!1),[G,N]=(0,o.useState)({}),[J,I]=(0,o.useState)([]),[K,Y]=(0,o.useState)("RM"),[H,R]=(0,o.useState)(!1),[W,$]=(0,o.useState)([]);(0,o.useEffect)(()=>{q(),V()},[]),(0,o.useEffect)(()=>{if(n){const i=JSON.stringify(e)!==JSON.stringify(n);T(i),i&&z&&B(!1)}},[e,n,z]);const V=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const i=await e.json();i.success&&i.currencies&&(N(i.currencies),i.defaultCurrency&&Y(i.defaultCurrency))}const i=await fetch("/api/currencies/supported");if(i.ok){const e=await i.json();e.success&&e.data&&I(e.data.map(e=>e.code))}}catch(e){console.error("Error fetching currency settings:",e)}},q=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const n=await e.json(),o={site_name:n.site_name||"",favicon_url:n.favicon_url||"",brand_logo:n.brand_logo||"",seo_title:n.seo_title||"",seo_description:n.seo_description||"",seo_keywords:n.seo_keywords||"",og_image_url:n.og_image_url||"",timezone:n.timezone||"Asia/Kuala_Lumpur"};i(o),a(o),T(!1),B(!1)}}catch(e){console.error("Error fetching settings:",e),F("Failed to load settings")}finally{_(!1)}},Z=e=>{const{name:n,value:o}=e.target;i(e=>({...e,[n]:o}))},Q=(e,n)=>{if(!e.type.startsWith("image/"))return void F("Please upload an image file (PNG, JPG, etc.)");if(e.size>2097152)return void F("File size must be less than 2MB");const o=new FileReader;o.onload=e=>{var o;const a=null===(o=e.target)||void 0===o?void 0:o.result;i(e=>({...e,[n]:a})),F("")},o.readAsDataURL(e)},X=(e,i)=>{var n;const o=null===(n=e.target.files)||void 0===n?void 0:n[0];o&&Q(o,i)},ee=(e,i)=>{e.preventDefault(),i(!0)},ie=(e,i)=>{e.preventDefault(),i(!1)},ne=(e,i,n)=>{var o;e.preventDefault(),n(!1);const a=null===(o=e.dataTransfer.files)||void 0===o?void 0:o[0];a&&Q(a,i)},oe=e=>{let i=document.querySelector("link[rel~='icon']");i||(i=document.createElement("link"),i.rel="icon",document.head.appendChild(i)),i.href=e};return j?(0,l.jsx)(t.A,{children:(0,l.jsxs)(r.mc,{children:[(0,l.jsx)(r.Y9,{children:(0,l.jsx)(r.hE,{children:"Site Settings"})}),(0,l.jsx)(r.UC,{children:(0,l.jsx)("p",{children:"Loading..."})})]})}):(0,l.jsx)(t.A,{children:(0,l.jsxs)(r.mc,{children:[(0,l.jsx)(r.Y9,{children:(0,l.jsx)(r.hE,{children:"Site Settings"})}),(0,l.jsx)(r.UC,{children:(0,l.jsxs)(d,{onSubmit:async i=>{i.preventDefault(),C(!0),k(""),F("");try{const i=localStorage.getItem("auth_token"),n=await fetch("/api/site-settings",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(e)});if(n.ok)k("Site settings saved successfully! SEO tags will be updated on next page load."),a(e),T(!1),B(!0),e.brand_logo&&window.dispatchEvent(new Event("brandLogoUpdated")),e.seo_title&&(document.title=e.seo_title),e.favicon_url&&oe(e.favicon_url);else{const e=await n.json();F(e.error||"Failed to save settings")}}catch(n){console.error("Error saving settings:",n),F("An error occurred while saving settings")}finally{C(!1)}},children:[(0,l.jsxs)(c,{children:[(0,l.jsx)(u,{children:"Basic Settings"}),(0,l.jsx)(g,{children:(0,l.jsxs)(p,{children:[(0,l.jsx)(h,{htmlFor:"site_name",children:"Site Name"}),(0,l.jsx)(x,{type:"text",id:"site_name",name:"site_name",value:e.site_name,onChange:Z,placeholder:"Purple Here POS"}),(0,l.jsx)(v,{children:"The name of your site/solution"})]})}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)(h,{children:"Favicon"}),(0,l.jsx)(b,{isDragging:U,onClick:()=>{var e;return null===(e=document.getElementById("favicon-input"))||void 0===e?void 0:e.click()},onDragOver:e=>ee(e,D),onDragLeave:e=>ie(e,D),onDrop:e=>ne(e,"favicon_url",D),children:e.favicon_url?(0,l.jsx)(y,{src:e.favicon_url,alt:"Favicon"}):(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG, JPG, or SVG (Max 2MB)"})]})}),(0,l.jsx)("input",{id:"favicon-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>X(e,"favicon_url")}),(0,l.jsx)(v,{children:"16x16 or 32x32 px recommended"})]}),(0,l.jsxs)(p,{children:[(0,l.jsx)(h,{children:"Brand Logo"}),(0,l.jsx)(b,{isDragging:P,onClick:()=>{var e;return null===(e=document.getElementById("brand-logo-input"))||void 0===e?void 0:e.click()},onDragOver:e=>ee(e,L),onDragLeave:e=>ie(e,L),onDrop:e=>ne(e,"brand_logo",L),children:e.brand_logo?(0,l.jsx)(y,{src:e.brand_logo,alt:"Brand Logo"}):(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,l.jsx)("input",{id:"brand-logo-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>X(e,"brand_logo")}),(0,l.jsx)(v,{children:"Will appear in sidebar and login page"})]})]})]}),(0,l.jsxs)(c,{children:[(0,l.jsx)(u,{children:"System Timezone"}),(0,l.jsx)(g,{children:(0,l.jsxs)(p,{children:[(0,l.jsx)(h,{htmlFor:"timezone",children:"Timezone"}),(0,l.jsx)("select",{id:"timezone",value:e.timezone,onChange:e=>i(i=>({...i,timezone:e.target.value})),style:{width:"100%",padding:"12px 16px",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",background:"white",cursor:"pointer",boxSizing:"border-box"},children:f.map(e=>(0,l.jsx)("option",{value:e.value,children:e.label},e.value))}),(0,l.jsxs)(v,{children:["All system dates/times (dashboards, reports, invoices) will use this timezone. Current time: ",(new Date).toLocaleString("en-US",{timeZone:e.timezone,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0,year:"numeric",month:"short",day:"numeric"})]})]})})]}),(0,l.jsxs)(c,{children:[(0,l.jsx)(u,{children:"SEO Settings"}),(0,l.jsxs)(p,{children:[(0,l.jsx)(h,{htmlFor:"seo_title",children:"SEO Title"}),(0,l.jsx)(x,{type:"text",id:"seo_title",name:"seo_title",value:e.seo_title,onChange:Z,placeholder:"Purple Here - Restaurant POS System",maxLength:60}),(0,l.jsx)(v,{children:"Page title for search engines (50-60 characters recommended)"})]}),(0,l.jsxs)(p,{children:[(0,l.jsx)(h,{htmlFor:"seo_description",children:"SEO Description"}),(0,l.jsx)(m,{id:"seo_description",name:"seo_description",value:e.seo_description,onChange:Z,placeholder:"Complete restaurant management solution with POS, ordering, and analytics",maxLength:160}),(0,l.jsx)(v,{children:"Meta description for search engines (150-160 characters recommended)"})]}),(0,l.jsxs)(p,{children:[(0,l.jsx)(h,{htmlFor:"seo_keywords",children:"SEO Keywords"}),(0,l.jsx)(x,{type:"text",id:"seo_keywords",name:"seo_keywords",value:e.seo_keywords,onChange:Z,placeholder:"restaurant pos, food ordering, restaurant management, pos system"}),(0,l.jsx)(v,{children:"Comma-separated keywords for search engines"})]}),(0,l.jsxs)(p,{children:[(0,l.jsx)(h,{children:"Open Graph Image"}),(0,l.jsx)(b,{isDragging:O,onClick:()=>{var e;return null===(e=document.getElementById("og-image-input"))||void 0===e?void 0:e.click()},onDragOver:e=>ee(e,M),onDragLeave:e=>ie(e,M),onDrop:e=>ne(e,"og_image_url",M),children:e.og_image_url?(0,l.jsx)(y,{src:e.og_image_url,alt:"OG Image"}):(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,l.jsx)("input",{id:"og-image-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>X(e,"og_image_url")}),(0,l.jsx)(v,{children:"Image for social media sharing (1200x630 px recommended)"})]})]}),(0,l.jsxs)(s.He,{children:[(0,l.jsxs)(s.r6,{children:[(0,l.jsx)(s.yY,{type:"button",variant:"secondary",onClick:q,disabled:!E,children:"Reset Changes"}),(0,l.jsx)(s.yY,{type:"submit",disabled:!E||S,children:E?S?"Saving...":"Save Changes":"Saved"})]}),z&&!E&&(0,l.jsx)(s.Mo,{type:"success",children:A||"Your settings have been successfully updated."}),w&&(0,l.jsx)(s.Mo,{type:"error",children:w})]})]})})]})})}}}]);