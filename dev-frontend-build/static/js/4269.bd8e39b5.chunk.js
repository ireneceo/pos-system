"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4269],{4269:(e,i,t)=>{t.r(i),t.d(i,{default:()=>b});var n=t(9950),r=t(4752),o=t(3832),a=t(5370),s=t(4414);const l=r.Ay.form`
  /* No additional styling - uses Content background */
`,d=r.Ay.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`,c=r.Ay.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`,u=r.Ay.div`
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
`,g=r.Ay.label`
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
`,m=r.Ay.p`
  font-size: 13px;
  color: #6B7280;
  margin-top: 8px;
`,f=r.Ay.div`
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
`,v=r.Ay.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  object-fit: contain;
`,y=[{label:"Malaysia (UTC+8)",value:"Asia/Kuala_Lumpur"},{label:"Singapore (UTC+8)",value:"Asia/Singapore"},{label:"South Korea (UTC+9)",value:"Asia/Seoul"},{label:"Japan (UTC+9)",value:"Asia/Tokyo"},{label:"China (UTC+8)",value:"Asia/Shanghai"},{label:"Thailand (UTC+7)",value:"Asia/Bangkok"},{label:"Vietnam (UTC+7)",value:"Asia/Ho_Chi_Minh"},{label:"Philippines (UTC+8)",value:"Asia/Manila"},{label:"Indonesia - Jakarta (UTC+7)",value:"Asia/Jakarta"},{label:"India (UTC+5:30)",value:"Asia/Kolkata"},{label:"Australia - Sydney (UTC+10/+11)",value:"Australia/Sydney"},{label:"United States - New York (UTC-5/-4)",value:"America/New_York"},{label:"United States - Los Angeles (UTC-8/-7)",value:"America/Los_Angeles"},{label:"United States - Chicago (UTC-6/-5)",value:"America/Chicago"},{label:"United Kingdom (UTC+0/+1)",value:"Europe/London"},{label:"Germany (UTC+1/+2)",value:"Europe/Berlin"},{label:"France (UTC+1/+2)",value:"Europe/Paris"},{label:"Dubai (UTC+4)",value:"Asia/Dubai"},{label:"Hong Kong (UTC+8)",value:"Asia/Hong_Kong"},{label:"Taiwan (UTC+8)",value:"Asia/Taipei"}],b=()=>{const[e,i]=(0,n.useState)({site_name:"",favicon_url:"",brand_logo:"",seo_title:"",seo_description:"",seo_keywords:"",og_image_url:"",timezone:"Asia/Kuala_Lumpur"}),[t,r]=(0,n.useState)(!0),[b,j]=(0,n.useState)(""),[A,_]=(0,n.useState)(!1),[S,C]=(0,n.useState)(!1),[w,F]=(0,n.useState)(!1),[,k]=(0,n.useState)({}),[,T]=(0,n.useState)([]),[,E]=(0,n.useState)("RM"),z=(0,n.useRef)(null),B=(0,n.useRef)(null),U=(0,n.useRef)(null),D=(0,n.useRef)(e);D.current=e,(0,n.useEffect)(()=>{P(),$()},[]);const $=async()=>{try{const e=await fetch("/api/currencies/config");if(e.ok){const i=await e.json();i.success&&i.currencies&&(k(i.currencies),i.defaultCurrency&&E(i.defaultCurrency))}const i=await fetch("/api/currencies/supported");if(i.ok){const e=await i.json();e.success&&e.data&&T(e.data.map(e=>e.code))}}catch(e){console.error("Error fetching currency settings:",e)}},P=async()=>{try{const e=await fetch("/api/site-settings?include=images");if(e.ok){const t=await e.json(),n={site_name:t.site_name||"",favicon_url:t.favicon_url||"",brand_logo:t.brand_logo||"",seo_title:t.seo_title||"",seo_description:t.seo_description||"",seo_keywords:t.seo_keywords||"",og_image_url:t.og_image_url||"",timezone:t.timezone||"Asia/Kuala_Lumpur"};i(n)}}catch(e){console.error("Error fetching settings:",e),j("Failed to load settings")}finally{r(!1)}},L=async()=>{j("");const e=localStorage.getItem("auth_token"),i=await fetch("/api/site-settings",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(D.current)});if(!i.ok){const e=await i.json();throw new Error(e.error||"Failed to save settings")}D.current.brand_logo&&window.dispatchEvent(new Event("brandLogoUpdated")),D.current.seo_title&&(document.title=D.current.seo_title),D.current.favicon_url&&H(D.current.favicon_url)},R=e=>{const{name:t,value:n}=e.target;i(e=>({...e,[t]:n}))},M=(e,t,n)=>{if(!e.type.startsWith("image/"))return void j("Please upload an image file (PNG, JPG, etc.)");if(e.size>2097152)return void j("File size must be less than 2MB");const r=new FileReader;r.onload=e=>{var r;const o=null===(r=e.target)||void 0===r?void 0:r.result;i(e=>({...e,[t]:o})),j(""),setTimeout(()=>{var e;return null===(e=n.current)||void 0===e?void 0:e.triggerSave()},0)},r.readAsDataURL(e)},O=(e,i,t)=>{var n;const r=null===(n=e.target.files)||void 0===n?void 0:n[0];r&&M(r,i,t)},G=(e,i)=>{e.preventDefault(),i(!0)},I=(e,i)=>{e.preventDefault(),i(!1)},N=(e,i,t,n)=>{var r;e.preventDefault(),t(!1);const o=null===(r=e.dataTransfer.files)||void 0===r?void 0:r[0];o&&M(o,i,n)},H=e=>{let i=document.querySelector("link[rel~='icon']");i||(i=document.createElement("link"),i.rel="icon",document.head.appendChild(i)),i.href=e};return t?(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(o.mc,{children:[(0,s.jsx)(o.Y9,{children:(0,s.jsx)(o.hE,{children:"Site Settings"})}),(0,s.jsx)(o.UC,{children:(0,s.jsx)("p",{children:"Loading..."})})]})}):(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(o.mc,{children:[(0,s.jsx)(o.Y9,{children:(0,s.jsx)(o.hE,{children:"Site Settings"})}),(0,s.jsx)(o.UC,{children:(0,s.jsxs)(l,{onSubmit:e=>e.preventDefault(),children:[(0,s.jsxs)(d,{children:[(0,s.jsx)(c,{children:"Basic Settings"}),(0,s.jsx)(u,{children:(0,s.jsxs)(p,{children:[(0,s.jsx)(g,{htmlFor:"site_name",children:"Site Name"}),(0,s.jsx)(a.A,{onSave:L,children:(0,s.jsx)(h,{type:"text",id:"site_name",name:"site_name",value:e.site_name,onChange:R,placeholder:"Purple Here POS"})}),(0,s.jsx)(m,{children:"The name of your site/solution"})]})}),(0,s.jsxs)(u,{children:[(0,s.jsxs)(p,{children:[(0,s.jsx)(g,{children:"Favicon"}),(0,s.jsx)(a.A,{ref:z,onSave:L,type:"image",children:(0,s.jsx)(f,{isDragging:A,onClick:()=>{var e;return null===(e=document.getElementById("favicon-input"))||void 0===e?void 0:e.click()},onDragOver:e=>G(e,_),onDragLeave:e=>I(e,_),onDrop:e=>N(e,"favicon_url",_,z),children:e.favicon_url?(0,s.jsx)(v,{src:e.favicon_url,alt:"Favicon"}):(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,s.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG, JPG, or SVG (Max 2MB)"})]})})}),(0,s.jsx)("input",{id:"favicon-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>O(e,"favicon_url",z)}),(0,s.jsx)(m,{children:"16x16 or 32x32 px recommended"})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(g,{children:"Brand Logo"}),(0,s.jsx)(a.A,{ref:B,onSave:L,type:"image",children:(0,s.jsx)(f,{isDragging:S,onClick:()=>{var e;return null===(e=document.getElementById("brand-logo-input"))||void 0===e?void 0:e.click()},onDragOver:e=>G(e,C),onDragLeave:e=>I(e,C),onDrop:e=>N(e,"brand_logo",C,B),children:e.brand_logo?(0,s.jsx)(v,{src:e.brand_logo,alt:"Brand Logo"}):(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,s.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})})}),(0,s.jsx)("input",{id:"brand-logo-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>O(e,"brand_logo",B)}),(0,s.jsx)(m,{children:"Will appear in sidebar and login page"})]})]})]}),(0,s.jsxs)(d,{children:[(0,s.jsx)(c,{children:"System Timezone"}),(0,s.jsx)(u,{children:(0,s.jsxs)(p,{children:[(0,s.jsx)(g,{htmlFor:"timezone",children:"Timezone"}),(0,s.jsx)(a.A,{onSave:L,type:"select",children:(0,s.jsx)("select",{id:"timezone",value:e.timezone,onChange:e=>i(i=>({...i,timezone:e.target.value})),style:{width:"100%",padding:"12px 16px",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"14px",background:"white",cursor:"pointer",boxSizing:"border-box"},children:y.map(e=>(0,s.jsx)("option",{value:e.value,children:e.label},e.value))})}),(0,s.jsxs)(m,{children:["All system dates/times (dashboards, reports, invoices) will use this timezone. Current time: ",(new Date).toLocaleString("en-US",{timeZone:e.timezone,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0,year:"numeric",month:"short",day:"numeric"})]})]})})]}),(0,s.jsxs)(d,{children:[(0,s.jsx)(c,{children:"SEO Settings"}),(0,s.jsxs)(p,{children:[(0,s.jsx)(g,{htmlFor:"seo_title",children:"SEO Title"}),(0,s.jsx)(a.A,{onSave:L,children:(0,s.jsx)(h,{type:"text",id:"seo_title",name:"seo_title",value:e.seo_title,onChange:R,placeholder:"Purple Here - Restaurant POS System",maxLength:60})}),(0,s.jsx)(m,{children:"Page title for search engines (50-60 characters recommended)"})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(g,{htmlFor:"seo_description",children:"SEO Description"}),(0,s.jsx)(a.A,{onSave:L,children:(0,s.jsx)(x,{id:"seo_description",name:"seo_description",value:e.seo_description,onChange:R,placeholder:"Complete restaurant management solution with POS, ordering, and analytics",maxLength:160})}),(0,s.jsx)(m,{children:"Meta description for search engines (150-160 characters recommended)"})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(g,{htmlFor:"seo_keywords",children:"SEO Keywords"}),(0,s.jsx)(a.A,{onSave:L,children:(0,s.jsx)(h,{type:"text",id:"seo_keywords",name:"seo_keywords",value:e.seo_keywords,onChange:R,placeholder:"restaurant pos, food ordering, restaurant management, pos system"})}),(0,s.jsx)(m,{children:"Comma-separated keywords for search engines"})]}),(0,s.jsxs)(p,{children:[(0,s.jsx)(g,{children:"Open Graph Image"}),(0,s.jsx)(a.A,{ref:U,onSave:L,type:"image",children:(0,s.jsx)(f,{isDragging:w,onClick:()=>{var e;return null===(e=document.getElementById("og-image-input"))||void 0===e?void 0:e.click()},onDragOver:e=>G(e,F),onDragLeave:e=>I(e,F),onDrop:e=>N(e,"og_image_url",F,U),children:e.og_image_url?(0,s.jsx)(v,{src:e.og_image_url,alt:"OG Image"}):(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload or drag and drop"}),(0,s.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})})}),(0,s.jsx)("input",{id:"og-image-input",type:"file",accept:"image/*",style:{display:"none"},onChange:e=>O(e,"og_image_url",U)}),(0,s.jsx)(m,{children:"Image for social media sharing (1200x630 px recommended)"})]})]}),b&&(0,s.jsx)("div",{style:{fontSize:"13px",color:"#EF4444",marginTop:"16px"},children:b})]})})]})})}},5370:(e,i,t)=>{t.d(i,{A:()=>b});var n=t(9950),r=t(4752),o=t(4414);const a=r.i7`
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
  animation: ${e=>e.$fading?r.AH`${s} 0.3s ease forwards`:r.AH`${a} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,u=r.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,p=r.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,g=r.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,h=r.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,x=r.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,m=r.Ay.span`
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
`,y=(0,n.forwardRef)((e,i)=>{let{children:t,onSave:r,type:a="input",debounceMs:s=2e3,style:l}=e;const[c,y]=(0,n.useState)("idle"),[b,j]=(0,n.useState)(!1),A=(0,n.useRef)(null),_=(0,n.useRef)(null),S=(0,n.useRef)(null),C=(0,n.useRef)(!0),w=(0,n.useRef)(r);w.current=r;const F=(0,n.useCallback)(()=>{A.current&&clearTimeout(A.current),_.current&&clearTimeout(_.current),S.current&&clearTimeout(S.current)},[]),k=2e3!==s?s:"toggle"===a||"select"===a||"list"===a||"image"===a?300:s,T=(0,n.useCallback)(()=>{F(),j(!1),A.current=setTimeout(async()=>{if(C.current){y("saving");try{if(await w.current(),!C.current)return;y("saved"),_.current=setTimeout(()=>{C.current&&(j(!0),S.current=setTimeout(()=>{C.current&&(y("idle"),j(!1))},300))},2e3)}catch{if(!C.current)return;y("error"),_.current=setTimeout(()=>{C.current&&(j(!0),S.current=setTimeout(()=>{C.current&&(y("idle"),j(!1))},300))},4e3)}}},k)},[k,F]);(0,n.useImperativeHandle)(i,()=>({triggerSave:T}),[T]),(0,n.useEffect)(()=>(C.current=!0,()=>{C.current=!1,F()}),[F]);const E=n.Children.map(t,e=>{if(!n.isValidElement(e))return e;const i=e.props.onChange;return"function"!==typeof i?e:n.cloneElement(e,{onChange:function(){i(...arguments),T()}})}),z="saving"===c?(0,o.jsx)(f,{}):"saved"===c?(0,o.jsx)(m,{children:"\u2713"}):"error"===c?(0,o.jsx)(v,{children:"!"}):null,B="select"===a?p:"toggle"===a?g:"image"===a?h:"list"===a?x:u;return(0,o.jsxs)(d,{$type:a,style:l,children:[E,"idle"!==c&&(0,o.jsx)(B,{$fading:b,children:z})]})});y.displayName="AutoSaveField";const b=y}}]);