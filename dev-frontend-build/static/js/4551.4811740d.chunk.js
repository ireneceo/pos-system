"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[4551],{2435:(e,n,t)=>{t.d(n,{FS:()=>o});const o=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},4551:(e,n,t)=>{t.r(n),t.d(n,{default:()=>f});var o=t(9950),i=t(4752),r=t(2435),a=t(8666),s=t(5370),d=t(4414);const l=i.Ay.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`,c=i.Ay.div`
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
`,p=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`,u=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`,x=i.Ay.div`
  margin-bottom: 20px;
`,m=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,g=i.Ay.input`
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
`,y=i.Ay.textarea`
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
`,v=i.Ay.select`
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
`,j=i.Ay.div`
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
`,b=i.Ay.img`
  max-width: 200px;
  max-height: 100px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  object-fit: contain;
`,f=()=>{var e,n;const[t,i]=(0,o.useState)(""),[f,A]=(0,o.useState)(null),[C,w]=(0,o.useState)({companyName:"",address:"",city:"",state:"",postalCode:"",country:"MY",phone:"",whatsapp:"",email:"",website:"",taxNumber:"",registrationNumber:"",brandLogo:"",companyLogo:"",businessHours:{weekdays:"9:00 AM - 6:00 PM (GMT+8)",weekend:"Closed"}}),S=o.useRef(C);S.current=C,(0,o.useEffect)(()=>{F()},[]);const F=async()=>{try{const e=await fetch("/api/admin/settings");if(e.ok){const n=await e.json();w(n),A(n)}else console.error("Failed to load settings:",e.status)}catch(e){console.error("Error loading settings:",e)}},k=async()=>{i("");if(!(await fetch("/api/admin/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(S.current)})).ok)throw new Error("Failed to save settings");window.dispatchEvent(new Event("brandLogoUpdated")),A(S.current)},z=(e,n)=>{w(t=>({...t,[e]:n}))},E=(e,n)=>{w(t=>({...t,businessHours:{...t.businessHours,[e]:n}}))},B=e=>{var n;const t=null===(n=e.target.files)||void 0===n?void 0:n[0];t&&N(t,"company")},N=(e,n)=>{if(i(""),!e.type.startsWith("image/"))return void i("Please upload an image file (PNG, JPG, etc.)");if(e.size>2097152)return void i("File size must be less than 2MB");const t=new FileReader;t.onload=e=>{var t;const o=null===(t=e.target)||void 0===t?void 0:t.result;w(e=>({...e,["brand"===n?"brandLogo":"companyLogo"]:o})),i("")},t.readAsDataURL(e)};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(l,{children:[(0,d.jsx)(c,{children:(0,d.jsx)(u,{children:"Company Information"})}),(0,d.jsxs)(p,{children:[(0,d.jsx)(h,{children:(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Company Logo"}),(0,d.jsx)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"12px",lineHeight:"1.5"},children:"Used on invoices and documents"}),(0,d.jsx)(s.A,{onSave:k,type:"image",children:(0,d.jsx)(j,{onClick:()=>{var e;return null===(e=document.getElementById("company-logo-input"))||void 0===e?void 0:e.click()},onChange:B,children:C.companyLogo?(0,d.jsx)(b,{src:C.companyLogo,alt:"Company Logo"}):(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#6B7280",fontWeight:500,marginBottom:"8px"},children:"Click to upload"}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#9CA3AF"},children:"PNG or JPG (Max 2MB)"})]})})}),(0,d.jsx)("input",{id:"company-logo-input",type:"file",accept:"image/*",style:{display:"none"},onChange:B}),t&&(0,d.jsx)("div",{style:{fontSize:"13px",color:"#EF4444",marginTop:"8px"},children:t})]})}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Company Name *"}),(0,d.jsx)(s.A,{onSave:k,children:(0,d.jsx)(g,{type:"text",value:C.companyName,onChange:e=>z("companyName",e.target.value),placeholder:"Enter company name",required:!0})})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Registration Number"}),(0,d.jsx)(s.A,{onSave:k,children:(0,d.jsx)(g,{type:"text",value:C.registrationNumber,onChange:e=>z("registrationNumber",e.target.value),placeholder:"ROC/SSM Number"})})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Address *"}),(0,d.jsx)(s.A,{onSave:k,children:(0,d.jsx)(y,{value:C.address,onChange:e=>z("address",e.target.value),placeholder:"Enter complete address",rows:3,required:!0})})]}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"City *"}),(0,d.jsx)(s.A,{onSave:k,children:(0,d.jsx)(g,{type:"text",value:C.city,onChange:e=>z("city",e.target.value),placeholder:"Enter city",required:!0})})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"State *"}),(0,d.jsx)(s.A,{onSave:k,children:(0,d.jsx)(g,{type:"text",value:C.state,onChange:e=>z("state",e.target.value),placeholder:"Enter state",required:!0})})]})]}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Postal Code *"}),(0,d.jsx)(s.A,{onSave:k,children:(0,d.jsx)(g,{type:"text",value:C.postalCode,onChange:e=>z("postalCode",e.target.value),placeholder:"Enter postal code",required:!0})})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Country *"}),(0,d.jsx)(s.A,{onSave:k,type:"select",children:(0,d.jsx)(v,{value:C.country,onChange:e=>z("country",e.target.value),required:!0,children:r.FS.map(e=>(0,d.jsx)("option",{value:e.code,children:e.name},e.code))})})]})]}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Phone Number *"}),(0,d.jsx)(s.A,{onSave:k,children:(0,d.jsx)(a.A,{value:C.phone,onChange:e=>z("phone",e),defaultCountry:C.country})})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"WhatsApp"}),(0,d.jsx)(s.A,{onSave:k,children:(0,d.jsx)(a.A,{value:C.whatsapp,onChange:e=>z("whatsapp",e),defaultCountry:C.country})}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:"For Contact page and customer communication"})]})]}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Email Address *"}),(0,d.jsx)(s.A,{onSave:k,children:(0,d.jsx)(g,{type:"email",value:C.email,onChange:e=>z("email",e.target.value),placeholder:"admin@company.com",required:!0})})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Website"}),(0,d.jsx)(s.A,{onSave:k,children:(0,d.jsx)(g,{type:"url",value:C.website,onChange:e=>z("website",e.target.value),placeholder:"www.company.com"})})]})]}),(0,d.jsx)(h,{children:(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Tax Number"}),(0,d.jsx)(s.A,{onSave:k,children:(0,d.jsx)(g,{type:"text",value:C.taxNumber,onChange:e=>z("taxNumber",e.target.value),placeholder:"GST/SST Registration Number"})})]})}),(0,d.jsxs)(h,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Business Hours (Weekdays)"}),(0,d.jsx)(s.A,{onSave:k,children:(0,d.jsx)(g,{type:"text",value:(null===(e=C.businessHours)||void 0===e?void 0:e.weekdays)||"",onChange:e=>E("weekdays",e.target.value),placeholder:"e.g., 9:00 AM - 6:00 PM (GMT+8)"})})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(m,{children:"Business Hours (Weekend)"}),(0,d.jsx)(s.A,{onSave:k,children:(0,d.jsx)(g,{type:"text",value:(null===(n=C.businessHours)||void 0===n?void 0:n.weekend)||"",onChange:e=>E("weekend",e.target.value),placeholder:"e.g., Closed or 10:00 AM - 2:00 PM"})})]})]})]})]})})}},5370:(e,n,t)=>{t.d(n,{A:()=>b});var o=t(9950),i=t(4752),r=t(4414);const a=i.i7`
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
`,s=i.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,d=i.i7`
  to { transform: rotate(360deg); }
`,l=i.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,c=i.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?i.AH`${s} 0.3s ease forwards`:i.AH`${a} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=i.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,u=i.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,h=i.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,x=i.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,m=i.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,g=i.Ay.span`
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
`,y=i.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${d} 0.6s linear infinite;
`,v=i.Ay.span`
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
`,j=(0,o.forwardRef)((e,n)=>{let{children:t,onSave:i,type:a="input",debounceMs:s=2e3,style:d}=e;const[c,j]=(0,o.useState)("idle"),[b,f]=(0,o.useState)(!1),A=(0,o.useRef)(null),C=(0,o.useRef)(null),w=(0,o.useRef)(null),S=(0,o.useRef)(!0),F=(0,o.useRef)(i);F.current=i;const k=(0,o.useCallback)(()=>{A.current&&clearTimeout(A.current),C.current&&clearTimeout(C.current),w.current&&clearTimeout(w.current)},[]),z=2e3!==s?s:"toggle"===a||"select"===a||"list"===a||"image"===a?300:s,E=(0,o.useCallback)(()=>{k(),f(!1),A.current=setTimeout(async()=>{if(S.current){j("saving");try{if(await F.current(),!S.current)return;j("saved"),C.current=setTimeout(()=>{S.current&&(f(!0),w.current=setTimeout(()=>{S.current&&(j("idle"),f(!1))},300))},2e3)}catch{if(!S.current)return;j("error"),C.current=setTimeout(()=>{S.current&&(f(!0),w.current=setTimeout(()=>{S.current&&(j("idle"),f(!1))},300))},4e3)}}},z)},[z,k]);(0,o.useImperativeHandle)(n,()=>({triggerSave:E}),[E]),(0,o.useEffect)(()=>(S.current=!0,()=>{S.current=!1,k()}),[k]);const B=o.Children.map(t,e=>{if(!o.isValidElement(e))return e;const n=e.props.onChange;return"function"!==typeof n?e:o.cloneElement(e,{onChange:function(){n(...arguments),E()}})}),N="saving"===c?(0,r.jsx)(y,{}):"saved"===c?(0,r.jsx)(g,{children:"\u2713"}):"error"===c?(0,r.jsx)(v,{children:"!"}):null,T="select"===a?u:"toggle"===a?h:"image"===a?x:"list"===a?m:p;return(0,r.jsxs)(l,{$type:a,style:d,children:[B,"idle"!==c&&(0,r.jsx)(T,{$fading:b,children:N})]})});j.displayName="AutoSaveField";const b=j}}]);