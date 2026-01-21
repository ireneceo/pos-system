"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4269],{4269:(e,t,o)=>{o.r(t),o.d(t,{default:()=>j});var n=o(9950),i=o(4752),r=o(3310),s=o(3832),a=o(7492),l=o(4414);const d=i.Ay.form`
  /* No additional styling - uses Content background */
`,c=i.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,g=i.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,p=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`,h=i.Ay.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`,u=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,x=i.Ay.input`
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
`,m=i.Ay.textarea`
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
`,f=i.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin-top: 8px;
`,y=i.Ay.div`
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
`,v=i.Ay.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  object-fit: contain;
`,j=()=>{const[e,t]=(0,n.useState)({site_name:"",favicon_url:"",brand_logo:"",seo_title:"",seo_description:"",seo_keywords:"",og_image_url:""}),[o,i]=(0,n.useState)(null),[j,b]=(0,n.useState)(!0),[_,S]=(0,n.useState)(!1),[F,w]=(0,n.useState)(""),[k,C]=(0,n.useState)(""),[A,E]=(0,n.useState)(!1),[B,D]=(0,n.useState)(!1),[z,O]=(0,n.useState)(!1),[P,G]=(0,n.useState)(!1),[M,L]=(0,n.useState)(!1),[N,I]=(0,n.useState)({}),[J,R]=(0,n.useState)([]),[T,U]=(0,n.useState)("RM"),[W,Y]=(0,n.useState)(!1),[H,$]=(0,n.useState)([]);(0,n.useEffect)(()=>{K(),q()},[]),(0,n.useEffect)(()=>{if(o){const t=JSON.stringify(e)!==JSON.stringify(o);E(t),t&&B&&D(!1)}},[e,o,B]);const q=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const t=await e.json();t.success&&t.currencies&&(I(t.currencies),t.defaultCurrency&&U(t.defaultCurrency))}const t=await fetch("/api/currencies/supported");if(t.ok){const e=await t.json();e.success&&e.data&&R(e.data.map(e=>e.code))}}catch(e){console.error("Error fetching currency settings:",e)}},K=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const o=await e.json(),n={site_name:o.site_name||"",favicon_url:o.favicon_url||"",brand_logo:o.brand_logo||"",seo_title:o.seo_title||"",seo_description:o.seo_description||"",seo_keywords:o.seo_keywords||"",og_image_url:o.og_image_url||""};t(n),i(n),E(!1),D(!1)}}catch(e){console.error("Error fetching settings:",e),C("Failed to load settings")}finally{b(!1)}},V=e=>{const{name:o,value:n}=e.target;t(e=>({...e,[o]:n}))},Q=(e,o)=>{if(!e.type.startsWith("image/"))return void C("Please upload an image file (PNG, JPG, etc.)");if(e.size>2097152)return void C("File size must be less than 2MB");const n=new FileReader;n.onload=e=>{var n;const i=null===(n=e.target)||void 0===n?void 0:n.result;t(e=>({...e,[o]:i})),C("")},n.readAsDataURL(e)},X=(e,t)=>{var o;const n=null===(o=e.target.files)||void 0===o?void 0:o[0];n&&Q(n,t)},Z=(e,t)=>{e.preventDefault(),t(!0)},ee=(e,t)=>{e.preventDefault(),t(!1)},te=(e,t,o)=>{var n;e.preventDefault(),o(!1);const i=null===(n=e.dataTransfer.files)||void 0===n?void 0:n[0];i&&Q(i,t)},oe=e=>{let t=document.querySelector("link[rel~='icon']");t||(t=document.createElement("link"),t.rel="icon",document.head.appendChild(t)),t.href=e};return j?(0,l.jsx)(r.A,{children:(0,l.jsxs)(s.mc,{children:[(0,l.jsx)(s.Y9,{children:(0,l.jsx)(s.hE,{children:"Site Settings"})}),(0,l.jsx)(s.UC,{children:(0,l.jsx)("p",{children:"Loading..."})})]})}):(0,l.jsx)(r.A,{children:(0,l.jsxs)(s.mc,{children:[(0,l.jsx)(s.Y9,{children:(0,l.jsx)(s.hE,{children:"Site Settings"})}),(0,l.jsx)(s.UC,{children:(0,l.jsxs)(d,{onSubmit:async t=>{t.preventDefault(),S(!0),w(""),C("");try{const t=localStorage.getItem("auth_token"),o=await fetch("/api/site-settings",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify(e)});if(o.ok)w("Site settings saved successfully! SEO tags will be updated on next page load."),i(e),E(!1),D(!0),e.brand_logo&&window.dispatchEvent(new Event("brandLogoUpdated")),e.seo_title&&(document.title=e.seo_title),e.favicon_url&&oe(e.favicon_url);else{const e=await o.json();C(e.error||"Failed to save settings")}}catch(o){console.error("Error saving settings:",o),C("An error occurred while saving settings")}finally{S(!1)}},children:[(0,l.jsxs)(c,{children:[(0,l.jsx)(g,{children:"Basic Settings"}),(0,l.jsx)(p,{children:(0,l.jsxs)(h,{children:[(0,l.jsx)(u,{htmlFor:"site_name",children:"Site Name"}),(0,l.jsx)(x,{type:"text",id:"site_name",name:"site_name",value:e.site_name,onChange:V,placeholder:"Purple Here POS"}),(0,l.jsx)(f,{children:"The name of your site/solution"})]})}),(0,l.jsxs)(p,{children:[(0,l.jsxs)(h,{children:[(0,l.jsx)(u,{children:"Favicon"}),(0,l.jsx)(y,{isDragging:z,onClick:()=>{var e;return null===(e=document.getElementById("favicon-input"))||void 0===e?void 0:e.click()},onDragOver:e=>Z(e,O),onDragLeave:e=>ee(e,O),onDrop:e=>te(e,"favicon_url",O),children:e.favicon_url?(0,l.jsx)(v,{src:e.favicon_url,alt:"Favicon"}):(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG, JPG, or SVG (Max 2MB)"})]})}),(0,l.jsx)("input",{id:"favicon-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>X(e,"favicon_url")}),(0,l.jsx)(f,{children:"16x16 or 32x32 px recommended"})]}),(0,l.jsxs)(h,{children:[(0,l.jsx)(u,{children:"Brand Logo"}),(0,l.jsx)(y,{isDragging:P,onClick:()=>{var e;return null===(e=document.getElementById("brand-logo-input"))||void 0===e?void 0:e.click()},onDragOver:e=>Z(e,G),onDragLeave:e=>ee(e,G),onDrop:e=>te(e,"brand_logo",G),children:e.brand_logo?(0,l.jsx)(v,{src:e.brand_logo,alt:"Brand Logo"}):(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,l.jsx)("input",{id:"brand-logo-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>X(e,"brand_logo")}),(0,l.jsx)(f,{children:"Will appear in sidebar and login page"})]})]})]}),(0,l.jsxs)(c,{children:[(0,l.jsx)(g,{children:"SEO Settings"}),(0,l.jsxs)(h,{children:[(0,l.jsx)(u,{htmlFor:"seo_title",children:"SEO Title"}),(0,l.jsx)(x,{type:"text",id:"seo_title",name:"seo_title",value:e.seo_title,onChange:V,placeholder:"Purple Here - Restaurant POS System",maxLength:60}),(0,l.jsx)(f,{children:"Page title for search engines (50-60 characters recommended)"})]}),(0,l.jsxs)(h,{children:[(0,l.jsx)(u,{htmlFor:"seo_description",children:"SEO Description"}),(0,l.jsx)(m,{id:"seo_description",name:"seo_description",value:e.seo_description,onChange:V,placeholder:"Complete restaurant management solution with POS, ordering, and analytics",maxLength:160}),(0,l.jsx)(f,{children:"Meta description for search engines (150-160 characters recommended)"})]}),(0,l.jsxs)(h,{children:[(0,l.jsx)(u,{htmlFor:"seo_keywords",children:"SEO Keywords"}),(0,l.jsx)(x,{type:"text",id:"seo_keywords",name:"seo_keywords",value:e.seo_keywords,onChange:V,placeholder:"restaurant pos, food ordering, restaurant management, pos system"}),(0,l.jsx)(f,{children:"Comma-separated keywords for search engines"})]}),(0,l.jsxs)(h,{children:[(0,l.jsx)(u,{children:"Open Graph Image"}),(0,l.jsx)(y,{isDragging:M,onClick:()=>{var e;return null===(e=document.getElementById("og-image-input"))||void 0===e?void 0:e.click()},onDragOver:e=>Z(e,L),onDragLeave:e=>ee(e,L),onDrop:e=>te(e,"og_image_url",L),children:e.og_image_url?(0,l.jsx)(v,{src:e.og_image_url,alt:"OG Image"}):(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,l.jsx)("input",{id:"og-image-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>X(e,"og_image_url")}),(0,l.jsx)(f,{children:"Image for social media sharing (1200x630 px recommended)"})]})]}),(0,l.jsxs)(a.He,{children:[(0,l.jsxs)(a.r6,{children:[(0,l.jsx)(a.yY,{type:"button",variant:"secondary",onClick:K,disabled:!A,children:"Reset Changes"}),(0,l.jsx)(a.yY,{type:"submit",disabled:!A||_,children:A?_?"Saving...":"Save Changes":"Saved"})]}),B&&!A&&(0,l.jsx)(a.Mo,{type:"success",children:F||"Your settings have been successfully updated."}),k&&(0,l.jsx)(a.Mo,{type:"error",children:k})]})]})})]})})}}}]);