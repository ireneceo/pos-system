"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4551],{2435:(e,n,t)=>{t.d(n,{FS:()=>i});const i=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},4551:(e,n,t)=>{t.r(n),t.d(n,{default:()=>A});var i=t(9950),o=t(4752),a=t(2435),r=t(8666),s=t(5370),d=t(5030),l=t(4414);const c=o.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,p=o.Ay.div`
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
`,u=o.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`,m=o.Ay.div`
  margin-bottom: 20px;
`,g=o.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,y=o.Ay.input`
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
`,v=o.Ay.textarea`
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
`,j=o.Ay.select`
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
`,b=o.Ay.div`
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
`,f=o.Ay.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  object-fit: contain;
`,A=()=>{var e,n;const{t:t}=(0,d.Bd)("admin"),[o,A]=(0,i.useState)(""),[C,w]=(0,i.useState)(null),[S,F]=(0,i.useState)({companyName:"",address:"",city:"",state:"",postalCode:"",country:"MY",phone:"",whatsapp:"",email:"",website:"",taxNumber:"",registrationNumber:"",brandLogo:"",companyLogo:"",businessHours:{weekdays:"9:00 AM - 6:00 PM (GMT+8)",weekend:"Closed"}}),k=i.useRef(S);k.current=S,(0,i.useEffect)(()=>{z()},[]);const z=async()=>{try{const e=await fetch("/api/admin/settings");if(e.ok){const n=await e.json();F(n),w(n)}else console.error("Failed to load settings:",e.status)}catch(e){console.error("Error loading settings:",e)}},E=async()=>{A("");if(!(await fetch("/api/admin/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(k.current)})).ok)throw new Error("Failed to save settings");window.dispatchEvent(new Event("brandLogoUpdated")),w(k.current)},B=(e,n)=>{F(t=>({...t,[e]:n}))},N=(e,n)=>{F(t=>({...t,businessHours:{...t.businessHours,[e]:n}}))},P=e=>{var n;const t=null===(n=e.target.files)||void 0===n?void 0:n[0];t&&T(t,"company")},T=(e,n)=>{if(A(""),!e.type.startsWith("image/"))return void A("Please upload an image file (PNG, JPG, etc.)");if(e.size>2097152)return void A("File size must be less than 2MB");const t=new FileReader;t.onload=e=>{var t;const i=null===(t=e.target)||void 0===t?void 0:t.result;F(e=>({...e,["brand"===n?"brandLogo":"companyLogo"]:i})),A("")},t.readAsDataURL(e)};return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(c,{children:[(0,l.jsx)(p,{children:(0,l.jsx)(h,{children:t("admin:adminSettingsPage.companyInformation")})}),(0,l.jsxs)(u,{children:[(0,l.jsx)(x,{children:(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:t("admin:adminSettingsPage.companyLogo")}),(0,l.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"12px",lineHeight:"1.5"},children:"Used on invoices and documents"}),(0,l.jsx)(s.A,{onSave:E,type:"image",children:(0,l.jsx)(b,{onClick:()=>{var e;return null===(e=document.getElementById("company-logo-input"))||void 0===e?void 0:e.click()},onChange:P,children:S.companyLogo?(0,l.jsx)(f,{src:S.companyLogo,alt:"Company Logo"}):(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload"}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})})}),(0,l.jsx)("input",{id:"company-logo-input",type:"file",accept:"image/*",style:{display:"none"},onChange:P}),o&&(0,l.jsx)("div",{style:{fontSize:"13px",color:"#EF4444",marginTop:"8px"},children:o})]})}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:"Company Name *"}),(0,l.jsx)(s.A,{onSave:E,children:(0,l.jsx)(y,{type:"text",value:S.companyName,onChange:e=>B("companyName",e.target.value),placeholder:"Enter company name",required:!0})})]}),(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:t("admin:adminSettingsPage.registrationNumber")}),(0,l.jsx)(s.A,{onSave:E,children:(0,l.jsx)(y,{type:"text",value:S.registrationNumber,onChange:e=>B("registrationNumber",e.target.value),placeholder:"ROC/SSM Number"})})]})]}),(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:"Address *"}),(0,l.jsx)(s.A,{onSave:E,children:(0,l.jsx)(v,{value:S.address,onChange:e=>B("address",e.target.value),placeholder:"Enter complete address",rows:3,required:!0})})]}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:"City *"}),(0,l.jsx)(s.A,{onSave:E,children:(0,l.jsx)(y,{type:"text",value:S.city,onChange:e=>B("city",e.target.value),placeholder:"Enter city",required:!0})})]}),(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:"State *"}),(0,l.jsx)(s.A,{onSave:E,children:(0,l.jsx)(y,{type:"text",value:S.state,onChange:e=>B("state",e.target.value),placeholder:"Enter state",required:!0})})]})]}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:"Postal Code *"}),(0,l.jsx)(s.A,{onSave:E,children:(0,l.jsx)(y,{type:"text",value:S.postalCode,onChange:e=>B("postalCode",e.target.value),placeholder:"Enter postal code",required:!0})})]}),(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:"Country *"}),(0,l.jsx)(s.A,{onSave:E,type:"select",children:(0,l.jsx)(j,{value:S.country,onChange:e=>B("country",e.target.value),required:!0,children:a.FS.map(e=>(0,l.jsx)("option",{value:e.code,children:e.name},e.code))})})]})]}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:"Phone Number *"}),(0,l.jsx)(s.A,{onSave:E,children:(0,l.jsx)(r.A,{value:S.phone,onChange:e=>B("phone",e),defaultCountry:S.country})})]}),(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:t("admin:adminSettingsPage.whatsapp")}),(0,l.jsx)(s.A,{onSave:E,children:(0,l.jsx)(r.A,{value:S.whatsapp,onChange:e=>B("whatsapp",e),defaultCountry:S.country})}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"For Contact page and customer communication"})]})]}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:"Email Address *"}),(0,l.jsx)(s.A,{onSave:E,children:(0,l.jsx)(y,{type:"email",value:S.email,onChange:e=>B("email",e.target.value),placeholder:"admin@company.com",required:!0})})]}),(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:t("admin:adminSettingsPage.website")}),(0,l.jsx)(s.A,{onSave:E,children:(0,l.jsx)(y,{type:"url",value:S.website,onChange:e=>B("website",e.target.value),placeholder:"www.company.com"})})]})]}),(0,l.jsx)(x,{children:(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:t("admin:adminSettingsPage.taxNumber")}),(0,l.jsx)(s.A,{onSave:E,children:(0,l.jsx)(y,{type:"text",value:S.taxNumber,onChange:e=>B("taxNumber",e.target.value),placeholder:"GST/SST Registration Number"})})]})}),(0,l.jsxs)(x,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:t("admin:adminSettingsPage.businessHoursWeekdays")}),(0,l.jsx)(s.A,{onSave:E,children:(0,l.jsx)(y,{type:"text",value:(null===(e=S.businessHours)||void 0===e?void 0:e.weekdays)||"",onChange:e=>N("weekdays",e.target.value),placeholder:"e.g., 9:00 AM - 6:00 PM (GMT+8)"})})]}),(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:t("admin:adminSettingsPage.businessHoursWeekend")}),(0,l.jsx)(s.A,{onSave:E,children:(0,l.jsx)(y,{type:"text",value:(null===(n=S.businessHours)||void 0===n?void 0:n.weekend)||"",onChange:e=>N("weekend",e.target.value),placeholder:"e.g., Closed or 10:00 AM - 2:00 PM"})})]})]})]})]})})}},5370:(e,n,t)=>{t.d(n,{A:()=>b});var i=t(9950),o=t(4752),a=t(4414);const r=o.i7`
  from { opacity: 0; }
  to { opacity: 1; }
`,s=o.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,d=o.i7`
  to { transform: rotate(360deg); }
`,l=o.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,c=o.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?o.AH`${s} 0.3s ease forwards`:o.AH`${r} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=o.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,u=o.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,h=o.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,x=o.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,m=o.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,g=o.Ay.span`
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
`,y=o.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${d} 0.6s linear infinite;
`,v=o.Ay.span`
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
`,j=(0,i.forwardRef)((e,n)=>{let{children:t,onSave:o,type:r="input",debounceMs:s=2e3,style:d}=e;const[c,j]=(0,i.useState)("idle"),[b,f]=(0,i.useState)(!1),A=(0,i.useRef)(null),C=(0,i.useRef)(null),w=(0,i.useRef)(null),S=(0,i.useRef)(!0),F=(0,i.useRef)(o);F.current=o;const k=(0,i.useCallback)(()=>{A.current&&clearTimeout(A.current),C.current&&clearTimeout(C.current),w.current&&clearTimeout(w.current)},[]),z=2e3!==s?s:"toggle"===r||"select"===r||"list"===r||"image"===r?300:s,E=(0,i.useCallback)(()=>{k(),f(!1),j("saving"),A.current=setTimeout(async()=>{if(S.current)try{if(await F.current(),!S.current)return;j("saved"),C.current=setTimeout(()=>{S.current&&(f(!0),w.current=setTimeout(()=>{S.current&&(j("idle"),f(!1))},300))},2e3)}catch{if(!S.current)return;j("error"),C.current=setTimeout(()=>{S.current&&(f(!0),w.current=setTimeout(()=>{S.current&&(j("idle"),f(!1))},300))},4e3)}},z)},[z,k]);(0,i.useImperativeHandle)(n,()=>({triggerSave:E}),[E]),(0,i.useEffect)(()=>(S.current=!0,()=>{S.current=!1,k()}),[k]);const B=i.Children.map(t,e=>{if(!i.isValidElement(e))return e;const n=e.props.onChange;return"function"!==typeof n?e:i.cloneElement(e,{onChange:function(){n(...arguments),E()}})}),N="saving"===c?(0,a.jsx)(y,{}):"saved"===c?(0,a.jsx)(g,{children:"\u2713"}):"error"===c?(0,a.jsx)(v,{children:"!"}):null,P="select"===r?u:"toggle"===r?h:"image"===r?x:"list"===r?m:p;return(0,a.jsxs)(l,{$type:r,style:d,children:[B,"idle"!==c&&(0,a.jsx)(P,{$fading:b,children:N})]})});j.displayName="AutoSaveField";const b=j}}]);