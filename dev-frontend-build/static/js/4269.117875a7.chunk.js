"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4269],{4269:(e,i,t)=>{t.r(i),t.d(i,{default:()=>j});var n=t(9950),r=t(4752),a=t(3832),o=t(5370),s=t(5030),l=t(4414);const d=r.Ay.form`
  /* No additional styling - uses Content background */
`,c=r.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,u=r.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,g=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`,p=r.Ay.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`,m=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,h=r.Ay.input`
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
`,x=r.Ay.textarea`
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
`,f=r.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin-top: 8px;
`,v=r.Ay.div`
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
`,y=r.Ay.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  object-fit: contain;
`,b=[{label:"Malaysia (UTC+8)",value:"Asia/Kuala_Lumpur"},{label:"Singapore (UTC+8)",value:"Asia/Singapore"},{label:"South Korea (UTC+9)",value:"Asia/Seoul"},{label:"Japan (UTC+9)",value:"Asia/Tokyo"},{label:"China (UTC+8)",value:"Asia/Shanghai"},{label:"Thailand (UTC+7)",value:"Asia/Bangkok"},{label:"Vietnam (UTC+7)",value:"Asia/Ho_Chi_Minh"},{label:"Philippines (UTC+8)",value:"Asia/Manila"},{label:"Indonesia - Jakarta (UTC+7)",value:"Asia/Jakarta"},{label:"India (UTC+5:30)",value:"Asia/Kolkata"},{label:"Australia - Sydney (UTC+10/+11)",value:"Australia/Sydney"},{label:"United States - New York (UTC-5/-4)",value:"America/New_York"},{label:"United States - Los Angeles (UTC-8/-7)",value:"America/Los_Angeles"},{label:"United States - Chicago (UTC-6/-5)",value:"America/Chicago"},{label:"United Kingdom (UTC+0/+1)",value:"Europe/London"},{label:"Germany (UTC+1/+2)",value:"Europe/Berlin"},{label:"France (UTC+1/+2)",value:"Europe/Paris"},{label:"Dubai (UTC+4)",value:"Asia/Dubai"},{label:"Hong Kong (UTC+8)",value:"Asia/Hong_Kong"},{label:"Taiwan (UTC+8)",value:"Asia/Taipei"}],j=()=>{const{t:e}=(0,s.Bd)("admin"),[i,t]=(0,n.useState)({site_name:"",favicon_url:"",brand_logo:"",seo_title:"",seo_description:"",seo_keywords:"",og_image_url:"",timezone:"Asia/Kuala_Lumpur"}),[r,j]=(0,n.useState)(!0),[S,A]=(0,n.useState)(""),[_,C]=(0,n.useState)(!1),[w,F]=(0,n.useState)(!1),[k,T]=(0,n.useState)(!1),[,P]=(0,n.useState)({}),[,E]=(0,n.useState)([]),[,z]=(0,n.useState)("RM"),B=(0,n.useRef)(null),U=(0,n.useRef)(null),D=(0,n.useRef)(null),$=(0,n.useRef)(i);$.current=i,(0,n.useEffect)(()=>{L(),R()},[]);const R=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const i=await e.json();i.success&&i.currencies&&(P(i.currencies),i.defaultCurrency&&z(i.defaultCurrency))}const i=await fetch("/api/currencies/supported");if(i.ok){const e=await i.json();e.success&&e.data&&E(e.data.map(e=>e.code))}}catch(e){console.error("Error fetching currency settings:",e)}},L=async()=>{try{const e=await fetch("/api/site-settings?include=images");if(e.ok){const i=await e.json(),n={site_name:i.site_name||"",favicon_url:i.favicon_url||"",brand_logo:i.brand_logo||"",seo_title:i.seo_title||"",seo_description:i.seo_description||"",seo_keywords:i.seo_keywords||"",og_image_url:i.og_image_url||"",timezone:i.timezone||"Asia/Kuala_Lumpur"};t(n)}}catch(e){console.error("Error fetching settings:",e),A("Failed to load settings")}finally{j(!1)}},M=async()=>{A("");const e=localStorage.getItem("auth_token"),i=await fetch("/api/site-settings",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify($.current)});if(!i.ok){const e=await i.json();throw new Error(e.error||"Failed to save settings")}$.current.brand_logo&&window.dispatchEvent(new Event("brandLogoUpdated")),$.current.seo_title&&(document.title=$.current.seo_title),$.current.favicon_url&&J($.current.favicon_url)},G=e=>{const{name:i,value:n}=e.target;t(e=>({...e,[i]:n}))},N=(e,i,n)=>{if(!e.type.startsWith("image/"))return void A("Please upload an image file (PNG, JPG, etc.)");if(e.size>2097152)return void A("File size must be less than 2MB");const r=new FileReader;r.onload=e=>{var r;const a=null===(r=e.target)||void 0===r?void 0:r.result;t(e=>({...e,[i]:a})),A(""),setTimeout(()=>{var e;return null===(e=n.current)||void 0===e?void 0:e.triggerSave()},0)},r.readAsDataURL(e)},I=(e,i,t)=>{var n;const r=null===(n=e.target.files)||void 0===n?void 0:n[0];r&&N(r,i,t)},K=(e,i)=>{e.preventDefault(),i(!0)},H=(e,i)=>{e.preventDefault(),i(!1)},O=(e,i,t,n)=>{var r;e.preventDefault(),t(!1);const a=null===(r=e.dataTransfer.files)||void 0===r?void 0:r[0];a&&N(a,i,n)},J=e=>{let i=document.querySelector("link[rel~='icon']");i||(i=document.createElement("link"),i.rel="icon",document.head.appendChild(i)),i.href=e};return r?(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(a.mc,{children:[(0,l.jsx)(a.Y9,{children:(0,l.jsx)(a.hE,{children:e("admin:siteSettingsPage.siteSettings")})}),(0,l.jsx)(a.UC,{children:(0,l.jsx)("p",{children:e("admin:siteSettingsPage.loading")})})]})}):(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(a.mc,{children:[(0,l.jsx)(a.Y9,{children:(0,l.jsx)(a.hE,{children:e("admin:siteSettingsPage.siteSettings")})}),(0,l.jsx)(a.UC,{children:(0,l.jsxs)(d,{onSubmit:e=>e.preventDefault(),children:[(0,l.jsxs)(c,{children:[(0,l.jsx)(u,{children:e("admin:siteSettingsPage.basicSettings")}),(0,l.jsx)(g,{children:(0,l.jsxs)(p,{children:[(0,l.jsx)(m,{htmlFor:"site_name",children:e("admin:siteSettingsPage.siteName")}),(0,l.jsx)(o.A,{onSave:M,children:(0,l.jsx)(h,{type:"text",id:"site_name",name:"site_name",value:i.site_name,onChange:G,placeholder:"Purple Here POS"})}),(0,l.jsx)(f,{children:e("admin:siteSettingsPage.theNameOfYourSitesolution")})]})}),(0,l.jsxs)(g,{children:[(0,l.jsxs)(p,{children:[(0,l.jsx)(m,{children:e("admin:siteSettingsPage.favicon")}),(0,l.jsx)(o.A,{ref:B,onSave:M,type:"image",children:(0,l.jsx)(v,{isDragging:_,onClick:()=>{var e;return null===(e=document.getElementById("favicon-input"))||void 0===e?void 0:e.click()},onDragOver:e=>K(e,C),onDragLeave:e=>H(e,C),onDrop:e=>O(e,"favicon_url",C,B),children:i.favicon_url?(0,l.jsx)(y,{src:i.favicon_url,alt:"Favicon"}):(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG, JPG, or SVG (Max 2MB)"})]})})}),(0,l.jsx)("input",{id:"favicon-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>I(e,"favicon_url",B)}),(0,l.jsx)(f,{children:"16x16 or 32x32 px recommended"})]}),(0,l.jsxs)(p,{children:[(0,l.jsx)(m,{children:e("admin:siteSettingsPage.brandLogo")}),(0,l.jsx)(o.A,{ref:U,onSave:M,type:"image",children:(0,l.jsx)(v,{isDragging:w,onClick:()=>{var e;return null===(e=document.getElementById("brand-logo-input"))||void 0===e?void 0:e.click()},onDragOver:e=>K(e,F),onDragLeave:e=>H(e,F),onDrop:e=>O(e,"brand_logo",F,U),children:i.brand_logo?(0,l.jsx)(y,{src:i.brand_logo,alt:"Brand Logo"}):(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})})}),(0,l.jsx)("input",{id:"brand-logo-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>I(e,"brand_logo",U)}),(0,l.jsx)(f,{children:e("admin:siteSettingsPage.willAppearInSidebarAndLoginPage")})]})]})]}),(0,l.jsxs)(c,{children:[(0,l.jsx)(u,{children:e("admin:siteSettingsPage.systemTimezone")}),(0,l.jsx)(g,{children:(0,l.jsxs)(p,{children:[(0,l.jsx)(m,{htmlFor:"timezone",children:e("admin:siteSettingsPage.timezone")}),(0,l.jsx)(o.A,{onSave:M,type:"select",children:(0,l.jsx)("select",{id:"timezone",value:i.timezone,onChange:e=>t(i=>({...i,timezone:e.target.value})),style:{width:"100%",padding:"12px 16px",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",background:"white",cursor:"pointer",boxSizing:"border-box"},children:b.map(e=>(0,l.jsx)("option",{value:e.value,children:e.label},e.value))})}),(0,l.jsxs)(f,{children:["All system dates/times (dashboards, reports, invoices) will use this timezone. Current time: ",(new Date).toLocaleString("en-US",{timeZone:i.timezone,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0,year:"numeric",month:"short",day:"numeric"})]})]})})]}),(0,l.jsxs)(c,{children:[(0,l.jsx)(u,{children:e("admin:siteSettingsPage.seoSettings")}),(0,l.jsxs)(p,{children:[(0,l.jsx)(m,{htmlFor:"seo_title",children:e("admin:siteSettingsPage.seoTitle")}),(0,l.jsx)(o.A,{onSave:M,children:(0,l.jsx)(h,{type:"text",id:"seo_title",name:"seo_title",value:i.seo_title,onChange:G,placeholder:"Purple Here - Restaurant POS System",maxLength:60})}),(0,l.jsx)(f,{children:e("admin:siteSettingsPage.pageTitleForSearchEngines5060CharactersRecommended")})]}),(0,l.jsxs)(p,{children:[(0,l.jsx)(m,{htmlFor:"seo_description",children:e("admin:siteSettingsPage.seoDescription")}),(0,l.jsx)(o.A,{onSave:M,children:(0,l.jsx)(x,{id:"seo_description",name:"seo_description",value:i.seo_description,onChange:G,placeholder:"Complete restaurant management solution with POS, ordering, and analytics",maxLength:160})}),(0,l.jsx)(f,{children:e("admin:siteSettingsPage.metaDescriptionForSearchEngines150160CharactersRecommended")})]}),(0,l.jsxs)(p,{children:[(0,l.jsx)(m,{htmlFor:"seo_keywords",children:e("admin:siteSettingsPage.seoKeywords")}),(0,l.jsx)(o.A,{onSave:M,children:(0,l.jsx)(h,{type:"text",id:"seo_keywords",name:"seo_keywords",value:i.seo_keywords,onChange:G,placeholder:"restaurant pos, food ordering, restaurant management, pos system"})}),(0,l.jsx)(f,{children:e("admin:siteSettingsPage.commaseparatedKeywordsForSearchEngines")})]}),(0,l.jsxs)(p,{children:[(0,l.jsx)(m,{children:e("admin:siteSettingsPage.openGraphImage")}),(0,l.jsx)(o.A,{ref:D,onSave:M,type:"image",children:(0,l.jsx)(v,{isDragging:k,onClick:()=>{var e;return null===(e=document.getElementById("og-image-input"))||void 0===e?void 0:e.click()},onDragOver:e=>K(e,T),onDragLeave:e=>H(e,T),onDrop:e=>O(e,"og_image_url",T,D),children:i.og_image_url?(0,l.jsx)(y,{src:i.og_image_url,alt:"OG Image"}):(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})})}),(0,l.jsx)("input",{id:"og-image-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>I(e,"og_image_url",D)}),(0,l.jsx)(f,{children:e("admin:siteSettingsPage.imageForSocialMediaSharing1200x630PxRecommended")})]})]}),S&&(0,l.jsx)("div",{style:{fontSize:"13px",color:"#EF4444",marginTop:"16px"},children:S})]})})]})})}},5370:(e,i,t)=>{t.d(i,{A:()=>b});var n=t(9950),r=t(4752),a=t(4414);const o=r.i7`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`,s=r.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,l=r.i7`
  to { transform: rotate(360deg); }
`,d=r.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,c=r.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?r.AH`${s} 0.3s ease forwards`:r.AH`${o} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,u=r.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,g=r.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,p=r.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,m=r.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,h=r.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,x=r.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #D1FAE5;
  color: #065F46;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 13px;
  font-weight: 700;
`,f=r.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${l} 0.6s linear infinite;
`,v=r.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #EF4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  font-weight: 700;
`,y=(0,n.forwardRef)((e,i)=>{let{children:t,onSave:r,type:o="input",debounceMs:s=2e3,style:l}=e;const[c,y]=(0,n.useState)("idle"),[b,j]=(0,n.useState)(!1),S=(0,n.useRef)(null),A=(0,n.useRef)(null),_=(0,n.useRef)(null),C=(0,n.useRef)(!0),w=(0,n.useRef)(r);w.current=r;const F=(0,n.useCallback)(()=>{S.current&&clearTimeout(S.current),A.current&&clearTimeout(A.current),_.current&&clearTimeout(_.current)},[]),k=2e3!==s?s:"toggle"===o||"select"===o||"list"===o||"image"===o?300:s,T=(0,n.useCallback)(()=>{F(),j(!1),S.current=setTimeout(async()=>{if(C.current){y("saving");try{if(await w.current(),!C.current)return;y("saved"),A.current=setTimeout(()=>{C.current&&(j(!0),_.current=setTimeout(()=>{C.current&&(y("idle"),j(!1))},300))},2e3)}catch{if(!C.current)return;y("error"),A.current=setTimeout(()=>{C.current&&(j(!0),_.current=setTimeout(()=>{C.current&&(y("idle"),j(!1))},300))},4e3)}}},k)},[k,F]);(0,n.useImperativeHandle)(i,()=>({triggerSave:T}),[T]),(0,n.useEffect)(()=>(C.current=!0,()=>{C.current=!1,F()}),[F]);const P=n.Children.map(t,e=>{if(!n.isValidElement(e))return e;const i=e.props.onChange;return"function"!==typeof i?e:n.cloneElement(e,{onChange:function(){i(...arguments),T()}})}),E="saving"===c?(0,a.jsx)(f,{}):"saved"===c?(0,a.jsx)(x,{children:"\u2713"}):"error"===c?(0,a.jsx)(v,{children:"!"}):null,z="select"===o?g:"toggle"===o?p:"image"===o?m:"list"===o?h:u;return(0,a.jsxs)(d,{$type:o,style:l,children:[P,"idle"!==c&&(0,a.jsx)(z,{$fading:b,children:E})]})});y.displayName="AutoSaveField";const b=y}}]);