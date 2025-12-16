"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4269],{4269:(e,r,t)=>{t.r(r),t.d(r,{default:()=>b});var i=t(9950),n=t(4752),o=t(3310),s=t(3832),a=t(9610),l=t(7492),d=t(4414);const c=n.Ay.form`
  /* No additional styling - uses Content background */
`,p=n.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,u=n.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,g=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`,h=n.Ay.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`,x=n.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,m=n.Ay.input`
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
`,y=n.Ay.textarea`
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
`,f=n.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin-top: 8px;
`,j=n.Ay.div`
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
`,v=n.Ay.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  object-fit: contain;
`,b=()=>{const[e,r]=(0,i.useState)({site_name:"",favicon_url:"",brand_logo:"",seo_title:"",seo_description:"",seo_keywords:"",og_image_url:""}),[t,n]=(0,i.useState)(null),[b,_]=(0,i.useState)(!0),[S,F]=(0,i.useState)(!1),[C,k]=(0,i.useState)(""),[w,B]=(0,i.useState)(""),[E,A]=(0,i.useState)(!1),[z,D]=(0,i.useState)(!1),[O,P]=(0,i.useState)(!1),[T,G]=(0,i.useState)(!1),[I,M]=(0,i.useState)(!1),[N,L]=(0,i.useState)({}),[J,R]=(0,i.useState)([]),[U,W]=(0,i.useState)("MYR"),[Y,H]=(0,i.useState)(!1),[$,q]=(0,i.useState)([]);(0,i.useEffect)(()=>{Q(),K()},[]),(0,i.useEffect)(()=>{if(t){const r=JSON.stringify(e)!==JSON.stringify(t);A(r),r&&z&&D(!1)}},[e,t,z]);const K=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const r=await e.json();r.success&&r.currencies&&(L(r.currencies),r.defaultCurrency&&W(r.defaultCurrency))}const r=await fetch("/api/currencies/supported");if(r.ok){const e=await r.json();e.success&&e.data&&R(e.data.map(e=>e.code))}}catch(e){console.error("Error fetching currency settings:",e)}},V=async e=>{try{const r=localStorage.getItem("auth_token");(await fetch("/api/currencies/default",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({defaultCurrency:e})})).ok&&(W(e),k("Default currency updated successfully"),setTimeout(()=>k(""),3e3))}catch(r){console.error("Error updating default currency:",r),B("Failed to update default currency")}},Q=async()=>{try{const e=await fetch("/api/site-settings");if(e.ok){const t=await e.json(),i={site_name:t.site_name||"",favicon_url:t.favicon_url||"",brand_logo:t.brand_logo||"",seo_title:t.seo_title||"",seo_description:t.seo_description||"",seo_keywords:t.seo_keywords||"",og_image_url:t.og_image_url||""};r(i),n(i),A(!1),D(!1)}}catch(e){console.error("Error fetching settings:",e),B("Failed to load settings")}finally{_(!1)}},X=e=>{const{name:t,value:i}=e.target;r(e=>({...e,[t]:i}))},Z=(e,t)=>{if(!e.type.startsWith("image/"))return void B("Please upload an image file (PNG, JPG, etc.)");if(e.size>2097152)return void B("File size must be less than 2MB");const i=new FileReader;i.onload=e=>{var i;const n=null===(i=e.target)||void 0===i?void 0:i.result;r(e=>({...e,[t]:n})),B("")},i.readAsDataURL(e)},ee=(e,r)=>{var t;const i=null===(t=e.target.files)||void 0===t?void 0:t[0];i&&Z(i,r)},re=(e,r)=>{e.preventDefault(),r(!0)},te=(e,r)=>{e.preventDefault(),r(!1)},ie=(e,r,t)=>{var i;e.preventDefault(),t(!1);const n=null===(i=e.dataTransfer.files)||void 0===i?void 0:i[0];n&&Z(n,r)},ne=e=>{let r=document.querySelector("link[rel~='icon']");r||(r=document.createElement("link"),r.rel="icon",document.head.appendChild(r)),r.href=e};return b?(0,d.jsx)(o.A,{children:(0,d.jsxs)(s.mc,{children:[(0,d.jsx)(s.Y9,{children:(0,d.jsx)(s.hE,{children:"Site Settings"})}),(0,d.jsx)(s.UC,{children:(0,d.jsx)("p",{children:"Loading..."})})]})}):(0,d.jsxs)(o.A,{children:[(0,d.jsxs)(s.mc,{children:[(0,d.jsx)(s.Y9,{children:(0,d.jsx)(s.hE,{children:"Site Settings"})}),(0,d.jsx)(s.UC,{children:(0,d.jsxs)(c,{onSubmit:async r=>{r.preventDefault(),F(!0),k(""),B("");try{const r=localStorage.getItem("auth_token"),t=await fetch("/api/site-settings",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify(e)});if(t.ok)k("Site settings saved successfully! SEO tags will be updated on next page load."),n(e),A(!1),D(!0),e.brand_logo&&window.dispatchEvent(new Event("brandLogoUpdated")),e.seo_title&&(document.title=e.seo_title),e.favicon_url&&ne(e.favicon_url);else{const e=await t.json();B(e.error||"Failed to save settings")}}catch(t){console.error("Error saving settings:",t),B("An error occurred while saving settings")}finally{F(!1)}},children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(u,{children:"Basic Settings"}),(0,d.jsx)(g,{children:(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{htmlFor:"site_name",children:"Site Name"}),(0,d.jsx)(m,{type:"text",id:"site_name",name:"site_name",value:e.site_name,onChange:X,placeholder:"Purple Here POS"}),(0,d.jsx)(f,{children:"The name of your site/solution"})]})}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{children:"Favicon"}),(0,d.jsx)(j,{isDragging:O,onClick:()=>{var e;return null===(e=document.getElementById("favicon-input"))||void 0===e?void 0:e.click()},onDragOver:e=>re(e,P),onDragLeave:e=>te(e,P),onDrop:e=>ie(e,"favicon_url",P),children:e.favicon_url?(0,d.jsx)(v,{src:e.favicon_url,alt:"Favicon"}):(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG, JPG, or SVG (Max 2MB)"})]})}),(0,d.jsx)("input",{id:"favicon-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>ee(e,"favicon_url")}),(0,d.jsx)(f,{children:"16x16 or 32x32 px recommended"})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{children:"Brand Logo"}),(0,d.jsx)(j,{isDragging:T,onClick:()=>{var e;return null===(e=document.getElementById("brand-logo-input"))||void 0===e?void 0:e.click()},onDragOver:e=>re(e,G),onDragLeave:e=>te(e,G),onDrop:e=>ie(e,"brand_logo",G),children:e.brand_logo?(0,d.jsx)(v,{src:e.brand_logo,alt:"Brand Logo"}):(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,d.jsx)("input",{id:"brand-logo-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>ee(e,"brand_logo")}),(0,d.jsx)(f,{children:"Will appear in sidebar and login page"})]})]})]}),(0,d.jsxs)(p,{children:[(0,d.jsx)(u,{children:"SEO Settings"}),(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{htmlFor:"seo_title",children:"SEO Title"}),(0,d.jsx)(m,{type:"text",id:"seo_title",name:"seo_title",value:e.seo_title,onChange:X,placeholder:"Purple Here - Restaurant POS System",maxLength:60}),(0,d.jsx)(f,{children:"Page title for search engines (50-60 characters recommended)"})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{htmlFor:"seo_description",children:"SEO Description"}),(0,d.jsx)(y,{id:"seo_description",name:"seo_description",value:e.seo_description,onChange:X,placeholder:"Complete restaurant management solution with POS, ordering, and analytics",maxLength:160}),(0,d.jsx)(f,{children:"Meta description for search engines (150-160 characters recommended)"})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{htmlFor:"seo_keywords",children:"SEO Keywords"}),(0,d.jsx)(m,{type:"text",id:"seo_keywords",name:"seo_keywords",value:e.seo_keywords,onChange:X,placeholder:"restaurant pos, food ordering, restaurant management, pos system"}),(0,d.jsx)(f,{children:"Comma-separated keywords for search engines"})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{children:"Open Graph Image"}),(0,d.jsx)(j,{isDragging:I,onClick:()=>{var e;return null===(e=document.getElementById("og-image-input"))||void 0===e?void 0:e.click()},onDragOver:e=>re(e,M),onDragLeave:e=>te(e,M),onDrop:e=>ie(e,"og_image_url",M),children:e.og_image_url?(0,d.jsx)(v,{src:e.og_image_url,alt:"OG Image"}):(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})}),(0,d.jsx)("input",{id:"og-image-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>ee(e,"og_image_url")}),(0,d.jsx)(f,{children:"Image for social media sharing (1200x630 px recommended)"})]})]}),(0,d.jsxs)(p,{children:[(0,d.jsx)(u,{children:"Currency Settings"}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{children:"Default Currency"}),(0,d.jsx)("select",{value:U,onChange:e=>V(e.target.value),style:{width:"100%",padding:"12px 16px",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",backgroundColor:"white"},children:J.map(e=>{var r,t;return(0,d.jsxs)("option",{value:e,children:[null===(r=N[e])||void 0===r?void 0:r.symbol," ",e," - ",null===(t=N[e])||void 0===t?void 0:t.name]},e)})}),(0,d.jsx)(f,{children:"Used as default for new subscriptions and invoices"})]}),(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{children:"Supported Currencies"}),(0,d.jsx)("div",{onClick:()=>{q(J),H(!0)},style:{padding:"12px 16px",border:"1px solid #E6EBF1",borderRadius:"8px",background:"white",cursor:"pointer",minHeight:"46px",display:"flex",alignItems:"center",flexWrap:"wrap",gap:"8px"},children:J.length>0?J.map(e=>{var r;return(0,d.jsxs)("span",{style:{background:"#F3F4F6",padding:"4px 10px",borderRadius:"4px",fontSize:"13px",fontWeight:500},children:[null===(r=N[e])||void 0===r?void 0:r.symbol," ",e]},e)}):(0,d.jsx)("span",{style:{color:"#9CA3AF"},children:"Click to select currencies"})}),(0,d.jsx)(f,{children:"Currencies available for pricing plans and invoices"})]})]})]}),(0,d.jsxs)(l.He,{children:[(0,d.jsxs)(l.r6,{children:[(0,d.jsx)(l.yY,{type:"button",variant:"secondary",onClick:Q,disabled:!E,children:"Reset Changes"}),(0,d.jsx)(l.yY,{type:"submit",disabled:!E||S,children:E?S?"Saving...":"Save Changes":"Saved"})]}),z&&!E&&(0,d.jsx)(l.Mo,{type:"success",children:C||"Your settings have been successfully updated."}),w&&(0,d.jsx)(l.Mo,{type:"error",children:w})]})]})})]}),(0,d.jsxs)(a.aF,{isOpen:Y,onClose:()=>H(!1),title:"Select Supported Currencies",size:"medium",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a.yl,{variant:"secondary",onClick:()=>H(!1),children:"Cancel"}),(0,d.jsxs)(a.yl,{variant:"primary",onClick:async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/currencies/supported",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currencies:$})});if(r.ok)R($),H(!1),k("Supported currencies updated successfully"),setTimeout(()=>k(""),3e3),!$.includes(U)&&$.length>0&&await V($[0]);else{const e=await r.json();console.error("Failed to update currencies:",e),B(e.error||"Failed to update supported currencies")}}catch(e){console.error("Error updating supported currencies:",e),B("Failed to update supported currencies")}},disabled:0===$.length,children:["Save (",$.length," selected)"]})]}),children:[(0,d.jsx)("p",{style:{color:"#6B7280",marginBottom:"16px"},children:"Select the currencies you want to support for subscription plans and invoices."}),(0,d.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"8px",maxHeight:"400px",overflowY:"auto"},children:Object.entries(N).map(e=>{let[r,t]=e;return(0,d.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid "+($.includes(r)?"#635BFF":"#E6EBF1"),borderRadius:"8px",cursor:"pointer",background:$.includes(r)?"#F0F0FF":"white",transition:"all 0.2s"},children:[(0,d.jsx)("input",{type:"checkbox",checked:$.includes(r),onChange:()=>(e=>{q(r=>r.includes(e)?r.filter(r=>r!==e):[...r,e])})(r),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,d.jsxs)("div",{children:[(0,d.jsxs)("div",{style:{fontWeight:500},children:[t.symbol," ",r]}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:t.name})]})]},r)})})]})]})}}}]);