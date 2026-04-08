"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1513],{1513:(e,o,n)=>{n.r(o),n.d(o,{default:()=>C});var a=n(9950),t=n(4752),i=n(2435),r=n(8666),s=n(4877),l=n(5370),c=n(5030),d=n(4414);const p=[{value:"Asia/Kuala_Lumpur",label:"Malaysia (GMT+8)"},{value:"Asia/Singapore",label:"Singapore (GMT+8)"},{value:"Asia/Bangkok",label:"Thailand (GMT+7)"},{value:"Asia/Jakarta",label:"Indonesia - Jakarta (GMT+7)"},{value:"Asia/Ho_Chi_Minh",label:"Vietnam (GMT+7)"},{value:"Asia/Manila",label:"Philippines (GMT+8)"},{value:"Asia/Tokyo",label:"Japan (GMT+9)"},{value:"Asia/Seoul",label:"South Korea (GMT+9)"},{value:"Asia/Shanghai",label:"China (GMT+8)"},{value:"Asia/Hong_Kong",label:"Hong Kong (GMT+8)"},{value:"Asia/Taipei",label:"Taiwan (GMT+8)"},{value:"Asia/Dubai",label:"UAE (GMT+4)"},{value:"Europe/London",label:"UK (GMT+0/+1)"},{value:"America/New_York",label:"US Eastern (GMT-5/-4)"},{value:"America/Los_Angeles",label:"US Pacific (GMT-8/-7)"},{value:"Australia/Sydney",label:"Australia - Sydney (GMT+10/+11)"}],m=t.Ay.div`
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
`,h=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,g=t.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,x=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  margin-bottom: 24px;
`,y=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #F3F4F6;
`,f=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,j=t.Ay.div`
  grid-column: ${e=>e.fullWidth?"span 2":"span 1"};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`,v=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;

  span {
    color: #DC2626;
    margin-left: 2px;
  }
`,b=t.Ay.input`
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
`,A=t.Ay.select`
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
`,C=()=>{const{t:e}=(0,c.Bd)("common"),[o,n]=(0,a.useState)({companyName:"",registrationNo:"",tradeName:"",address:"",city:"",state:"",postalCode:"",country:"MY",phone:"",email:"",website:"",taxNo:"",bankName:"",bankAccount:"",bankAccountName:"",logoUrl:"",operationSettings:{openingTime:"09:00",closingTime:"22:00",timeZone:"Asia/Kuala_Lumpur"}});(0,a.useEffect)(()=>{t()},[]);const t=async()=>{try{const t=localStorage.getItem("auth_token"),i=await fetch("/api/foodcourts/company-info",{headers:{Authorization:`Bearer ${t}`}});if(i.ok){const t=await i.json();var e,o,a;if(t)n({companyName:t.company_name||t.name||"",registrationNo:t.registration_no||"",tradeName:t.trade_name||"",address:t.address||"",city:t.city||"",state:t.state||"",postalCode:t.postal_code||"",country:t.country||"MY",phone:t.phone||"",email:t.email||"",website:t.website||"",taxNo:t.tax_no||"",bankName:t.bank_name||"",bankAccount:t.bank_account||"",bankAccountName:t.bank_account_name||"",logoUrl:t.logo_url||"",operationSettings:{openingTime:(null===(e=t.operation_settings)||void 0===e?void 0:e.openingTime)||"09:00",closingTime:(null===(o=t.operation_settings)||void 0===o?void 0:o.closingTime)||"22:00",timeZone:(null===(a=t.operation_settings)||void 0===a?void 0:a.timeZone)||"Asia/Kuala_Lumpur"}})}}catch(t){console.error("Error fetching company info:",t)}},C=(e,o)=>{n(n=>({...n,[e]:o}))},S=(e,o)=>{n(n=>({...n,operationSettings:{...n.operationSettings,[e]:o}}))},k=async()=>{const e=localStorage.getItem("auth_token");if(!(await fetch("/api/foodcourts/company-info",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({company_name:o.companyName,registration_no:o.registrationNo,trade_name:o.tradeName,address:o.address,city:o.city,state:o.state,postal_code:o.postalCode,country:o.country,phone:o.phone,email:o.email,website:o.website,tax_no:o.taxNo,bank_name:o.bankName,bank_account:o.bankAccount,bank_account_name:o.bankAccountName,logo_url:o.logoUrl,operation_settings:o.operationSettings})})).ok)throw new Error("Failed to save")};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(m,{children:[(0,d.jsx)(u,{children:(0,d.jsx)(h,{children:e("common:foodcourtCompanyInfoPage.companyInformation")})}),(0,d.jsxs)(g,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(y,{children:e("common:foodcourtCompanyInfoPage.basicInformation")}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(j,{children:[(0,d.jsxs)(v,{children:[e("common:foodcourtCompanyInfoPage.companyName"),(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"text",value:o.companyName,onChange:e=>C("companyName",e.target.value),placeholder:"Enter company name"})})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:e("common:foodcourtCompanyInfoPage.registrationNo")}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"text",value:o.registrationNo,onChange:e=>C("registrationNo",e.target.value),placeholder:"e.g., 202001234567"})})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:e("common:foodcourtCompanyInfoPage.tradeName")}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"text",value:o.tradeName,onChange:e=>C("tradeName",e.target.value),placeholder:"Trading as..."})})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:e("common:foodcourtCompanyInfoPage.taxNoSstgst")}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"text",value:o.taxNo,onChange:e=>C("taxNo",e.target.value),placeholder:"e.g., W10-1234-56789012"})})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(y,{children:e("common:foodcourtCompanyInfoPage.address")}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(j,{fullWidth:!0,children:[(0,d.jsxs)(v,{children:[e("common:foodcourtCompanyInfoPage.streetAddress"),(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"text",value:o.address,onChange:e=>C("address",e.target.value),placeholder:"Enter street address"})})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:e("common:foodcourtCompanyInfoPage.city")}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"text",value:o.city,onChange:e=>C("city",e.target.value),placeholder:"e.g., Kuala Lumpur"})})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:e("common:foodcourtCompanyInfoPage.state")}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"text",value:o.state,onChange:e=>C("state",e.target.value),placeholder:"e.g., Wilayah Persekutuan"})})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:e("common:foodcourtCompanyInfoPage.postalCode")}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"text",value:o.postalCode,onChange:e=>C("postalCode",e.target.value),placeholder:"e.g., 50000"})})]}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(v,{children:[e("common:foodcourtCompanyInfoPage.country"),(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(l.A,{onSave:k,type:"select",children:(0,d.jsx)(A,{value:o.country,onChange:e=>C("country",e.target.value),children:i.FS.map(e=>(0,d.jsx)("option",{value:e.code,children:e.name},e.code))})})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(y,{children:e("common:foodcourtCompanyInfoPage.contactInformation")}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(j,{children:[(0,d.jsxs)(v,{children:[e("common:foodcourtCompanyInfoPage.phone"),(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(r.A,{value:o.phone,onChange:e=>C("phone",e),defaultCountry:o.country})})]}),(0,d.jsxs)(j,{children:[(0,d.jsxs)(v,{children:[e("common:foodcourtCompanyInfoPage.email"),(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"email",value:o.email,onChange:e=>C("email",e.target.value),placeholder:"company@example.com"})})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:e("common:foodcourtCompanyInfoPage.website")}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"url",value:o.website,onChange:e=>C("website",e.target.value),placeholder:"https://www.example.com"})})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(y,{children:e("common:foodcourtCompanyInfoPage.bankingInformation")}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:e("common:foodcourtCompanyInfoPage.bankName")}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"text",value:o.bankName,onChange:e=>C("bankName",e.target.value),placeholder:"e.g., Maybank"})})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:e("common:foodcourtCompanyInfoPage.accountNumber")}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"text",value:o.bankAccount,onChange:e=>C("bankAccount",e.target.value),placeholder:"e.g., 1234567890"})})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:e("common:foodcourtCompanyInfoPage.accountName")}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"text",value:o.bankAccountName,onChange:e=>C("bankAccountName",e.target.value),placeholder:"Account holder name"})})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(y,{children:e("common:foodcourtCompanyInfoPage.operationSettings")}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:e("common:foodcourtCompanyInfoPage.openingTime")}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"time",value:o.operationSettings.openingTime,onChange:e=>S("openingTime",e.target.value)})})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:e("common:foodcourtCompanyInfoPage.closingTime")}),(0,d.jsx)(l.A,{onSave:k,children:(0,d.jsx)(b,{type:"time",value:o.operationSettings.closingTime,onChange:e=>S("closingTime",e.target.value)})})]}),(0,d.jsxs)(j,{children:[(0,d.jsx)(v,{children:e("common:foodcourtCompanyInfoPage.timezone")}),(0,d.jsx)(l.A,{onSave:k,type:"select",children:(0,d.jsx)(A,{value:o.operationSettings.timeZone,onChange:e=>S("timeZone",e.target.value),children:p.map(e=>(0,d.jsx)("option",{value:e.value,children:e.label},e.value))})})]})]})]}),(0,d.jsxs)(x,{children:[(0,d.jsx)(y,{children:e("common:foodcourtCompanyInfoPage.companyLogo")}),(0,d.jsx)(l.A,{onSave:k,type:"image",children:(0,d.jsx)(s.A,{value:o.logoUrl,onChange:e=>C("logoUrl",e),imageAltText:"Company Logo"})})]})]})]})})}},2435:(e,o,n)=>{n.d(o,{FS:()=>a});const a=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},5370:(e,o,n)=>{n.d(o,{A:()=>v});var a=n(9950),t=n(4752),i=n(4414);const r=t.i7`
  from { opacity: 0; }
  to { opacity: 1; }
`,s=t.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,l=t.i7`
  to { transform: rotate(360deg); }
`,c=t.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,d=t.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?t.AH`${s} 0.3s ease forwards`:t.AH`${r} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=t.Ay.div`
  ${d}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,m=t.Ay.div`
  ${d}
  position: absolute;
  right: -6px;
  top: -6px;
`,u=t.Ay.div`
  ${d}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,h=t.Ay.div`
  ${d}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,g=t.Ay.div`
  ${d}
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
`,f=t.Ay.span`
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
`,j=(0,a.forwardRef)((e,o)=>{let{children:n,onSave:t,type:r="input",debounceMs:s=2e3,style:l}=e;const[d,j]=(0,a.useState)("idle"),[v,b]=(0,a.useState)(!1),A=(0,a.useRef)(null),C=(0,a.useRef)(null),S=(0,a.useRef)(null),k=(0,a.useRef)(!0),T=(0,a.useRef)(t);T.current=t;const w=(0,a.useCallback)(()=>{A.current&&clearTimeout(A.current),C.current&&clearTimeout(C.current),S.current&&clearTimeout(S.current)},[]),N=2e3!==s?s:"toggle"===r||"select"===r||"list"===r||"image"===r?300:s,_=(0,a.useCallback)(()=>{w(),b(!1),j("saving"),A.current=setTimeout(async()=>{if(k.current)try{if(await T.current(),!k.current)return;j("saved"),C.current=setTimeout(()=>{k.current&&(b(!0),S.current=setTimeout(()=>{k.current&&(j("idle"),b(!1))},300))},2e3)}catch{if(!k.current)return;j("error"),C.current=setTimeout(()=>{k.current&&(b(!0),S.current=setTimeout(()=>{k.current&&(j("idle"),b(!1))},300))},4e3)}},N)},[N,w]);(0,a.useImperativeHandle)(o,()=>({triggerSave:_}),[_]),(0,a.useEffect)(()=>(k.current=!0,()=>{k.current=!1,w()}),[w]);const I=a.Children.map(n,e=>{if(!a.isValidElement(e))return e;const o=e.props.onChange;return"function"!==typeof o?e:a.cloneElement(e,{onChange:function(){o(...arguments),_()}})}),P="saving"===d?(0,i.jsx)(y,{}):"saved"===d?(0,i.jsx)(x,{children:"\u2713"}):"error"===d?(0,i.jsx)(f,{children:"!"}):null,M="select"===r?m:"toggle"===r?u:"image"===r?h:"list"===r?g:p;return(0,i.jsxs)(c,{$type:r,style:l,children:[I,"idle"!==d&&(0,i.jsx)(M,{$fading:v,children:P})]})});j.displayName="AutoSaveField";const v=j}}]);