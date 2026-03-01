"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4269],{4269:(e,i,o)=>{o.r(i),o.d(i,{default:()=>f});var n=o(8819),a=o(9950),t=o(4752),r=o(3832),s=o(9610),l=o(2674),d=o(4414);const c=t.Ay.form`
  /* No additional styling - uses Content background */
`,u=t.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid ${n.w.colors.border};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,g=t.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: ${n.w.colors.secondary};
  margin-bottom: 16px;
`,h=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,p=t.Ay.input`
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

  &::placeholder {
    color: ${n.w.colors.text.placeholder};
  }
`,x=t.Ay.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${n.w.colors.border};
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
`,m=t.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin-top: 8px;
`,v=t.Ay.div`
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
    border-color: ${n.w.colors.primary};
    background: #F8FAFC;
  }

  ${e=>e.isDragging&&"\n    border-color: #635BFF;\n    background: #F0F4FF;\n  "}
`,b=t.Ay.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  object-fit: contain;
`,y=[{label:"Malaysia (UTC+8)",value:"Asia/Kuala_Lumpur"},{label:"Singapore (UTC+8)",value:"Asia/Singapore"},{label:"South Korea (UTC+9)",value:"Asia/Seoul"},{label:"Japan (UTC+9)",value:"Asia/Tokyo"},{label:"China (UTC+8)",value:"Asia/Shanghai"},{label:"Thailand (UTC+7)",value:"Asia/Bangkok"},{label:"Vietnam (UTC+7)",value:"Asia/Ho_Chi_Minh"},{label:"Philippines (UTC+8)",value:"Asia/Manila"},{label:"Indonesia - Jakarta (UTC+7)",value:"Asia/Jakarta"},{label:"India (UTC+5:30)",value:"Asia/Kolkata"},{label:"Australia - Sydney (UTC+10/+11)",value:"Australia/Sydney"},{label:"United States - New York (UTC-5/-4)",value:"America/New_York"},{label:"United States - Los Angeles (UTC-8/-7)",value:"America/Los_Angeles"},{label:"United States - Chicago (UTC-6/-5)",value:"America/Chicago"},{label:"United Kingdom (UTC+0/+1)",value:"Europe/London"},{label:"Germany (UTC+1/+2)",value:"Europe/Berlin"},{label:"France (UTC+1/+2)",value:"Europe/Paris"},{label:"Dubai (UTC+4)",value:"Asia/Dubai"},{label:"Hong Kong (UTC+8)",value:"Asia/Hong_Kong"},{label:"Taiwan (UTC+8)",value:"Asia/Taipei"}],f=()=>{const[e,i]=(0,a.useState)({site_name:"",favicon_url:"",brand_logo:"",seo_title:"",seo_description:"",seo_keywords:"",og_image_url:"",timezone:"Asia/Kuala_Lumpur"}),[o,n]=(0,a.useState)(null),[t,f]=(0,a.useState)(!0),[j,_]=(0,a.useState)(!1),[S,C]=(0,a.useState)(""),[w,A]=(0,a.useState)(""),[k,F]=(0,a.useState)(!1),[E,T]=(0,a.useState)(!1),[z,U]=(0,a.useState)(!1),[B,D]=(0,a.useState)(!1),[L,P]=(0,a.useState)(!1),[O,M]=(0,a.useState)({}),[G,N]=(0,a.useState)([]),[$,J]=(0,a.useState)("RM"),[I,K]=(0,a.useState)(!1),[Y,H]=(0,a.useState)([]);(0,a.useEffect)(()=>{W(),R()},[]),(0,a.useEffect)(()=>{if(o){const i=JSON.stringify(e)!==JSON.stringify(o);F(i),i&&E&&T(!1)}},[e,o,E]);const R=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const i=await e.json();i.success&&i.currencies&&(M(i.currencies),i.defaultCurrency&&J(i.defaultCurrency))}const i=await fetch("/api/currencies/supported");if(i.ok){const e=await i.json();e.success&&e.data&&N(e.data.map(e=>e.code))}}catch(e){console.error("Error fetching currency settings:",e)}},W=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const o=await e.json(),a={site_name:o.site_name||"",favicon_url:o.favicon_url||"",brand_logo:o.brand_logo||"",seo_title:o.seo_title||"",seo_description:o.seo_description||"",seo_keywords:o.seo_keywords||"",og_image_url:o.og_image_url||"",timezone:o.timezone||"Asia/Kuala_Lumpur"};i(a),n(a),F(!1),T(!1)}}catch(e){console.error("Error fetching settings:",e),A("Failed to load settings")}finally{f(!1)}},V=e=>{const{name:o,value:n}=e.target;i(e=>({...e,[o]:n}))},q=(e,o)=>{if(!e.type.startsWith("image/"))return void A("Please upload an image file (PNG, JPG, etc.)");if(e.size>2097152)return void A("File size must be less than 2MB");const n=new FileReader;n.onload=e=>{var n;const a=null===(n=e.target)||void 0===n?void 0:n.result;i(e=>({...e,[o]:a})),A("")},n.readAsDataURL(e)},Z=(e,i)=>{var o;const n=null===(o=e.target.files)||void 0===o?void 0:o[0];n&&q(n,i)},Q=(e,i)=>{e.preventDefault(),i(!0)},X=(e,i)=>{e.preventDefault(),i(!1)},ee=(e,i,o)=>{var n;e.preventDefault(),o(!1);const a=null===(n=e.dataTransfer.files)||void 0===n?void 0:n[0];a&&q(a,i)},ie=e=>{let i=document.querySelector("link[rel~='icon']");i||(i=document.createElement("link"),i.rel="icon",document.head.appendChild(i)),i.href=e};return t?(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(r.mc,{children:[(0,d.jsx)(r.Y9,{children:(0,d.jsx)(r.hE,{children:"Site Settings"})}),(0,d.jsx)(r.UC,{children:(0,d.jsx)("p",{children:"Loading..."})})]})}):(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(r.mc,{children:[(0,d.jsx)(r.Y9,{children:(0,d.jsx)(r.hE,{children:"Site Settings"})}),(0,d.jsx)(r.UC,{children:(0,d.jsxs)(c,{onSubmit:async i=>{i.preventDefault(),_(!0),C(""),A("");try{const i=localStorage.getItem("auth_token"),o=await fetch("/api/site-settings",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify(e)});if(o.ok)C("Site settings saved successfully! SEO tags will be updated on next page load."),n(e),F(!1),T(!0),e.brand_logo&&window.dispatchEvent(new Event("brandLogoUpdated")),e.seo_title&&(document.title=e.seo_title),e.favicon_url&&ie(e.favicon_url);else{const e=await o.json();A(e.error||"Failed to save settings")}}catch(o){console.error("Error saving settings:",o),A("An error occurred while saving settings")}finally{_(!1)}},children:[(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"Basic Settings"}),(0,d.jsx)(s.fh,{children:(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(h,{htmlFor:"site_name",children:"Site Name"}),(0,d.jsx)(p,{type:"text",id:"site_name",name:"site_name",value:e.site_name,onChange:V,placeholder:"Purple Here POS"}),(0,d.jsx)(m,{children:"The name of your site/solution"})]})}),(0,d.jsxs)(s.fh,{children:[(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(h,{children:"Favicon"}),(0,d.jsx)(v,{isDragging:z,onClick:()=>{var e;return null===(e=document.getElementById("favicon-input"))||void 0===e?void 0:e.click()},onDragOver:e=>Q(e,U),onDragLeave:e=>X(e,U),onDrop:e=>ee(e,"favicon_url",U),children:e.favicon_url?(0,d.jsx)(b,{src:e.favicon_url,alt:"Favicon"}):(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG, JPG, or SVG (Max 2MB)"})]})}),(0,d.jsx)("input",{id:"favicon-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>Z(e,"favicon_url")}),(0,d.jsx)(m,{children:"16x16 or 32x32 px recommended"})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(h,{children:"Brand Logo"}),(0,d.jsx)(v,{isDragging:B,onClick:()=>{var e;return null===(e=document.getElementById("brand-logo-input"))||void 0===e?void 0:e.click()},onDragOver:e=>Q(e,D),onDragLeave:e=>X(e,D),onDrop:e=>ee(e,"brand_logo",D),children:e.brand_logo?(0,d.jsx)(b,{src:e.brand_logo,alt:"Brand Logo"}):(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,d.jsx)("input",{id:"brand-logo-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>Z(e,"brand_logo")}),(0,d.jsx)(m,{children:"Will appear in sidebar and login page"})]})]})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"System Timezone"}),(0,d.jsx)(s.fh,{children:(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(h,{htmlFor:"timezone",children:"Timezone"}),(0,d.jsx)("select",{id:"timezone",value:e.timezone,onChange:e=>i(i=>({...i,timezone:e.target.value})),style:{width:"100%",padding:"12px 16px",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",background:"white",cursor:"pointer",boxSizing:"border-box"},children:y.map(e=>(0,d.jsx)("option",{value:e.value,children:e.label},e.value))}),(0,d.jsxs)(m,{children:["All system dates/times (dashboards, reports, invoices) will use this timezone. Current time: ",(new Date).toLocaleString("en-US",{timeZone:e.timezone,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0,year:"numeric",month:"short",day:"numeric"})]})]})})]}),(0,d.jsxs)(u,{children:[(0,d.jsx)(g,{children:"SEO Settings"}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(h,{htmlFor:"seo_title",children:"SEO Title"}),(0,d.jsx)(p,{type:"text",id:"seo_title",name:"seo_title",value:e.seo_title,onChange:V,placeholder:"Purple Here - Restaurant POS System",maxLength:60}),(0,d.jsx)(m,{children:"Page title for search engines (50-60 characters recommended)"})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(h,{htmlFor:"seo_description",children:"SEO Description"}),(0,d.jsx)(x,{id:"seo_description",name:"seo_description",value:e.seo_description,onChange:V,placeholder:"Complete restaurant management solution with POS, ordering, and analytics",maxLength:160}),(0,d.jsx)(m,{children:"Meta description for search engines (150-160 characters recommended)"})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(h,{htmlFor:"seo_keywords",children:"SEO Keywords"}),(0,d.jsx)(p,{type:"text",id:"seo_keywords",name:"seo_keywords",value:e.seo_keywords,onChange:V,placeholder:"restaurant pos, food ordering, restaurant management, pos system"}),(0,d.jsx)(m,{children:"Comma-separated keywords for search engines"})]}),(0,d.jsxs)(s.gE,{children:[(0,d.jsx)(h,{children:"Open Graph Image"}),(0,d.jsx)(v,{isDragging:L,onClick:()=>{var e;return null===(e=document.getElementById("og-image-input"))||void 0===e?void 0:e.click()},onDragOver:e=>Q(e,P),onDragLeave:e=>X(e,P),onDrop:e=>ee(e,"og_image_url",P),children:e.og_image_url?(0,d.jsx)(b,{src:e.og_image_url,alt:"OG Image"}):(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,d.jsx)("input",{id:"og-image-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>Z(e,"og_image_url")}),(0,d.jsx)(m,{children:"Image for social media sharing (1200x630 px recommended)"})]})]}),(0,d.jsxs)(l.He,{children:[(0,d.jsxs)(l.r6,{children:[(0,d.jsx)(l.yY,{type:"button",variant:"secondary",onClick:W,disabled:!k,children:"Reset Changes"}),(0,d.jsx)(l.yY,{type:"submit",disabled:!k||j,children:k?j?"Saving...":"Save Changes":"Saved"})]}),E&&!k&&(0,d.jsx)(l.Mo,{type:"success",children:S||"Your settings have been successfully updated."}),w&&(0,d.jsx)(l.Mo,{type:"error",children:w})]})]})})]})})}}}]);