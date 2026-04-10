"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7909],{2435:(e,n,a)=>{a.d(n,{FS:()=>o});const o=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},5370:(e,n,a)=>{a.d(n,{A:()=>v});var o=a(9950),t=a(4752),i=a(4414);const r=t.i7`
  from { opacity: 0; }
  to { opacity: 1; }
`,s=t.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,l=t.i7`
  to { transform: rotate(360deg); }
`,d=t.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,c=t.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?t.AH`${s} 0.3s ease forwards`:t.AH`${r} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=t.Ay.div`
  ${c}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,m=t.Ay.div`
  ${c}
  position: absolute;
  right: -6px;
  top: -6px;
`,h=t.Ay.div`
  ${c}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,u=t.Ay.div`
  ${c}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,g=t.Ay.div`
  ${c}
  position: absolute;
  right: -8px;
  top: -8px;
`,x=t.Ay.span`
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
`,y=t.Ay.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #E6EBF1;
  border-top-color: #8898AA;
  border-radius: 50%;
  animation: ${l} 0.6s linear infinite;
`,b=t.Ay.span`
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
`,j=(0,o.forwardRef)((e,n)=>{let{children:a,onSave:t,type:r="input",debounceMs:s=2e3,style:l}=e;const[c,j]=(0,o.useState)("idle"),[v,f]=(0,o.useState)(!1),A=(0,o.useRef)(null),C=(0,o.useRef)(null),S=(0,o.useRef)(null),T=(0,o.useRef)(!0),w=(0,o.useRef)(t);w.current=t;const N=(0,o.useCallback)(()=>{A.current&&clearTimeout(A.current),C.current&&clearTimeout(C.current),S.current&&clearTimeout(S.current)},[]),k=2e3!==s?s:"toggle"===r||"select"===r||"list"===r||"image"===r?300:s,I=(0,o.useCallback)(()=>{N(),f(!1),j("saving"),A.current=setTimeout(async()=>{if(T.current)try{if(await w.current(),!T.current)return;j("saved"),C.current=setTimeout(()=>{T.current&&(f(!0),S.current=setTimeout(()=>{T.current&&(j("idle"),f(!1))},300))},2e3)}catch{if(!T.current)return;j("error"),C.current=setTimeout(()=>{T.current&&(f(!0),S.current=setTimeout(()=>{T.current&&(j("idle"),f(!1))},300))},4e3)}},k)},[k,N]);(0,o.useImperativeHandle)(n,()=>({triggerSave:I}),[I]),(0,o.useEffect)(()=>(T.current=!0,()=>{T.current=!1,N()}),[N]);const P=o.Children.map(a,e=>{if(!o.isValidElement(e))return e;const n=e.props.onChange;return"function"!==typeof n?e:o.cloneElement(e,{onChange:function(){n(...arguments),I()}})}),_="saving"===c?(0,i.jsx)(y,{}):"saved"===c?(0,i.jsx)(x,{children:"\u2713"}):"error"===c?(0,i.jsx)(b,{children:"!"}):null,F="select"===r?m:"toggle"===r?h:"image"===r?u:"list"===r?g:p;return(0,i.jsxs)(d,{$type:r,style:l,children:[P,"idle"!==c&&(0,i.jsx)(F,{$fading:v,children:_})]})});j.displayName="AutoSaveField";const v=j},7909:(e,n,a)=>{a.r(n),a.d(n,{default:()=>S});var o=a(9950),t=a(4752),i=a(2435),r=a(8666),s=a(4877),l=a(5370),d=a(5030),c=a(9955),p=a(4414);const m=[{value:"Asia/Kuala_Lumpur",label:"Malaysia (GMT+8)"},{value:"Asia/Singapore",label:"Singapore (GMT+8)"},{value:"Asia/Bangkok",label:"Thailand (GMT+7)"},{value:"Asia/Jakarta",label:"Indonesia - Jakarta (GMT+7)"},{value:"Asia/Ho_Chi_Minh",label:"Vietnam (GMT+7)"},{value:"Asia/Manila",label:"Philippines (GMT+8)"},{value:"Asia/Tokyo",label:"Japan (GMT+9)"},{value:"Asia/Seoul",label:"South Korea (GMT+9)"},{value:"Asia/Shanghai",label:"China (GMT+8)"},{value:"Asia/Hong_Kong",label:"Hong Kong (GMT+8)"},{value:"Asia/Taipei",label:"Taiwan (GMT+8)"},{value:"Asia/Dubai",label:"UAE (GMT+4)"},{value:"Europe/London",label:"UK (GMT+0/+1)"},{value:"America/New_York",label:"US Eastern (GMT-5/-4)"},{value:"America/Los_Angeles",label:"US Pacific (GMT-8/-7)"},{value:"Australia/Sydney",label:"Australia - Sydney (GMT+10/+11)"}],h=t.Ay.div`
  background: #FAFBFC;
  min-height: 100vh;
`,u=t.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,g=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,x=t.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,y=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  margin-bottom: 24px;
`,b=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #F3F4F6;
`,j=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,v=t.Ay.div`
  grid-column: ${e=>e.fullWidth?"span 2":"span 1"};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`,f=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;

  span {
    color: #DC2626;
    margin-left: 2px;
  }
`,A=t.Ay.input`
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

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
  }
`,C=t.Ay.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,S=()=>{const{t:e}=(0,d.Bd)("common"),[n,a]=(0,o.useState)({companyName:"",registrationNo:"",tradeName:"",address:"",city:"",state:"",postalCode:"",country:"MY",phone:"",email:"",website:"",taxNo:"",logoUrl:"",operationSettings:{openingTime:"09:00",closingTime:"22:00",timeZone:"Asia/Kuala_Lumpur"}});(0,o.useEffect)(()=>{t()},[]);const t=async()=>{try{const t=(0,c.c4)(),i=await fetch("/api/brands/company-info",{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const t=await i.json();var e,n,o;if(t)a({companyName:t.company_name||t.name||"",registrationNo:t.registration_no||"",tradeName:t.trade_name||"",address:t.address||"",city:t.city||"",state:t.state||"",postalCode:t.postal_code||"",country:t.country||"MY",phone:t.phone||"",email:t.email||"",website:t.website||"",taxNo:t.tax_no||"",logoUrl:t.logo_url||"",operationSettings:{openingTime:(null===(e=t.operation_settings)||void 0===e?void 0:e.openingTime)||"09:00",closingTime:(null===(n=t.operation_settings)||void 0===n?void 0:n.closingTime)||"22:00",timeZone:(null===(o=t.operation_settings)||void 0===o?void 0:o.timeZone)||"Asia/Kuala_Lumpur"}})}}catch(t){console.error("Error fetching company info:",t)}},S=(e,n)=>{a(a=>({...a,[e]:n}))},T=(e,n)=>{a(a=>({...a,operationSettings:{...a.operationSettings,[e]:n}}))},w=async()=>{const e=(0,c.c4)();if(!(await fetch("/api/brands/company-info",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({company_name:n.companyName,registration_no:n.registrationNo,trade_name:n.tradeName,address:n.address,city:n.city,state:n.state,postal_code:n.postalCode,country:n.country,phone:n.phone,email:n.email,website:n.website,tax_no:n.taxNo,logo_url:n.logoUrl,operation_settings:n.operationSettings})})).ok)throw new Error("Failed to save")};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(h,{children:[(0,p.jsx)(u,{children:(0,p.jsx)(g,{children:e("common:brandCompanyInfoPage.companyInformation")})}),(0,p.jsxs)(x,{children:[(0,p.jsxs)(y,{children:[(0,p.jsx)(b,{children:e("common:brandCompanyInfoPage.basicInformation")}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(v,{children:[(0,p.jsxs)(f,{children:[e("common:brandCompanyInfoPage.companyName"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(l.A,{onSave:w,children:(0,p.jsx)(A,{type:"text",value:n.companyName,onChange:e=>S("companyName",e.target.value),placeholder:"Enter company name"})})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(f,{children:e("common:brandCompanyInfoPage.registrationNo")}),(0,p.jsx)(l.A,{onSave:w,children:(0,p.jsx)(A,{type:"text",value:n.registrationNo,onChange:e=>S("registrationNo",e.target.value),placeholder:"e.g., 202001234567"})})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(f,{children:e("common:brandCompanyInfoPage.tradeName")}),(0,p.jsx)(l.A,{onSave:w,children:(0,p.jsx)(A,{type:"text",value:n.tradeName,onChange:e=>S("tradeName",e.target.value),placeholder:"Trading as..."})})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(f,{children:e("common:brandCompanyInfoPage.taxNoSstgst")}),(0,p.jsx)(l.A,{onSave:w,children:(0,p.jsx)(A,{type:"text",value:n.taxNo,onChange:e=>S("taxNo",e.target.value),placeholder:"e.g., W10-1234-56789012"})})]})]})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(b,{children:e("common:brandCompanyInfoPage.address")}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(v,{fullWidth:!0,children:[(0,p.jsxs)(f,{children:[e("common:brandCompanyInfoPage.streetAddress"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(l.A,{onSave:w,children:(0,p.jsx)(A,{type:"text",value:n.address,onChange:e=>S("address",e.target.value),placeholder:"Enter street address"})})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(f,{children:e("common:brandCompanyInfoPage.city")}),(0,p.jsx)(l.A,{onSave:w,children:(0,p.jsx)(A,{type:"text",value:n.city,onChange:e=>S("city",e.target.value),placeholder:"e.g., Kuala Lumpur"})})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(f,{children:e("common:brandCompanyInfoPage.state")}),(0,p.jsx)(l.A,{onSave:w,children:(0,p.jsx)(A,{type:"text",value:n.state,onChange:e=>S("state",e.target.value),placeholder:"e.g., Wilayah Persekutuan"})})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(f,{children:e("common:brandCompanyInfoPage.postalCode")}),(0,p.jsx)(l.A,{onSave:w,children:(0,p.jsx)(A,{type:"text",value:n.postalCode,onChange:e=>S("postalCode",e.target.value),placeholder:"e.g., 50000"})})]}),(0,p.jsxs)(v,{children:[(0,p.jsxs)(f,{children:[e("common:brandCompanyInfoPage.country"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(l.A,{onSave:w,type:"select",children:(0,p.jsx)(C,{value:n.country,onChange:e=>S("country",e.target.value),children:i.FS.map(e=>(0,p.jsx)("option",{value:e.code,children:e.name},e.code))})})]})]})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(b,{children:e("common:brandCompanyInfoPage.contactInformation")}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(v,{children:[(0,p.jsxs)(f,{children:[e("common:brandCompanyInfoPage.phone"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(l.A,{onSave:w,children:(0,p.jsx)(r.A,{value:n.phone,onChange:e=>S("phone",e),defaultCountry:n.country})})]}),(0,p.jsxs)(v,{children:[(0,p.jsxs)(f,{children:[e("common:brandCompanyInfoPage.email"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(l.A,{onSave:w,children:(0,p.jsx)(A,{type:"email",value:n.email,onChange:e=>S("email",e.target.value),placeholder:"company@example.com"})})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(f,{children:e("common:brandCompanyInfoPage.website")}),(0,p.jsx)(l.A,{onSave:w,children:(0,p.jsx)(A,{type:"url",value:n.website,onChange:e=>S("website",e.target.value),placeholder:"https://www.example.com"})})]})]})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(b,{children:e("common:brandCompanyInfoPage.operationSettings")}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(v,{children:[(0,p.jsx)(f,{children:e("common:brandCompanyInfoPage.openingTime")}),(0,p.jsx)(l.A,{onSave:w,children:(0,p.jsx)(A,{type:"time",value:n.operationSettings.openingTime,onChange:e=>T("openingTime",e.target.value)})})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(f,{children:e("common:brandCompanyInfoPage.closingTime")}),(0,p.jsx)(l.A,{onSave:w,children:(0,p.jsx)(A,{type:"time",value:n.operationSettings.closingTime,onChange:e=>T("closingTime",e.target.value)})})]}),(0,p.jsxs)(v,{children:[(0,p.jsx)(f,{children:e("common:brandCompanyInfoPage.timezone")}),(0,p.jsx)(l.A,{onSave:w,type:"select",children:(0,p.jsx)(C,{value:n.operationSettings.timeZone,onChange:e=>T("timeZone",e.target.value),children:m.map(e=>(0,p.jsx)("option",{value:e.value,children:e.label},e.value))})})]})]})]}),(0,p.jsxs)(y,{children:[(0,p.jsx)(b,{children:e("common:brandCompanyInfoPage.companyLogo")}),(0,p.jsx)(l.A,{onSave:w,type:"image",children:(0,p.jsx)(s.A,{value:n.logoUrl,onChange:e=>S("logoUrl",e),imageAltText:"Company Logo"})})]})]})]})})}}}]);