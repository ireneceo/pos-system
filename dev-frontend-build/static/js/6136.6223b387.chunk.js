"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6136],{2435:(e,n,a)=>{a.d(n,{FS:()=>t});const t=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},5370:(e,n,a)=>{a.d(n,{A:()=>b});var t=a(9950),o=a(4752),i=a(4414);const s=o.i7`
  from { opacity: 0; }
  to { opacity: 1; }
`,r=o.i7`
  from { opacity: 1; }
  to { opacity: 0; }
`,l=o.i7`
  to { transform: rotate(360deg); }
`,c=o.Ay.div`
  position: relative;
  ${e=>"input"===e.$type||"select"===e.$type||"image"===e.$type?"width: 100%;":""}
`,d=o.AH`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${e=>e.$fading?o.AH`${r} 0.3s ease forwards`:o.AH`${s} 0.2s ease`};
  pointer-events: none;
  z-index: 2;
`,p=o.Ay.div`
  ${d}
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
`,m=o.Ay.div`
  ${d}
  position: absolute;
  right: -6px;
  top: -6px;
`,g=o.Ay.div`
  ${d}
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
`,h=o.Ay.div`
  ${d}
  position: absolute;
  right: 12px;
  bottom: 12px;
`,u=o.Ay.div`
  ${d}
  position: absolute;
  right: -8px;
  top: -8px;
`,x=o.Ay.span`
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
  animation: ${l} 0.6s linear infinite;
`,f=o.Ay.span`
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
`,j=(0,t.forwardRef)((e,n)=>{let{children:a,onSave:o,type:s="input",debounceMs:r=2e3,style:l}=e;const[d,j]=(0,t.useState)("idle"),[b,v]=(0,t.useState)(!1),A=(0,t.useRef)(null),k=(0,t.useRef)(null),I=(0,t.useRef)(null),P=(0,t.useRef)(!0),w=(0,t.useRef)(o);w.current=o;const C=(0,t.useCallback)(()=>{A.current&&clearTimeout(A.current),k.current&&clearTimeout(k.current),I.current&&clearTimeout(I.current)},[]),S=2e3!==r?r:"toggle"===s||"select"===s||"list"===s||"image"===s?300:r,N=(0,t.useCallback)(()=>{C(),v(!1),j("saving"),A.current=setTimeout(async()=>{if(P.current)try{if(await w.current(),!P.current)return;j("saved"),k.current=setTimeout(()=>{P.current&&(v(!0),I.current=setTimeout(()=>{P.current&&(j("idle"),v(!1))},300))},2e3)}catch{if(!P.current)return;j("error"),k.current=setTimeout(()=>{P.current&&(v(!0),I.current=setTimeout(()=>{P.current&&(j("idle"),v(!1))},300))},4e3)}},S)},[S,C]);(0,t.useImperativeHandle)(n,()=>({triggerSave:N}),[N]),(0,t.useEffect)(()=>(P.current=!0,()=>{P.current=!1,C()}),[C]);const B=t.Children.map(a,e=>{if(!t.isValidElement(e))return e;const n=e.props.onChange;return"function"!==typeof n?e:t.cloneElement(e,{onChange:function(){n(...arguments),N()}})}),F="saving"===d?(0,i.jsx)(y,{}):"saved"===d?(0,i.jsx)(x,{children:"\u2713"}):"error"===d?(0,i.jsx)(f,{children:"!"}):null,z="select"===s?m:"toggle"===s?g:"image"===s?h:"list"===s?u:p;return(0,i.jsxs)(c,{$type:s,style:l,children:[B,"idle"!==d&&(0,i.jsx)(z,{$fading:b,children:F})]})});j.displayName="AutoSaveField";const b=j},6136:(e,n,a)=>{a.r(n),a.d(n,{default:()=>I});var t=a(9950),o=a(4752),i=a(1367),s=a(4877),r=a(8666),l=a(2435),c=a(5370),d=a(5030),p=a(4414);const m=o.Ay.div`
  background: #FAFBFC;
  min-height: 100vh;
`,g=o.Ay.div`
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
`,h=o.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=o.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,x=o.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,y=o.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #F3F4F6;
`,f=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,j=o.Ay.div`
  grid-column: ${e=>e.fullWidth?"span 2":"span 1"};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`,b=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 8px;

  span {
    color: #DC2626;
    margin-left: 2px;
  }
`,v=o.Ay.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,A=o.Ay.select`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }
`,k=o.Ay.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;

  p {
    margin: 0;
    font-size: 14px;
    color: #075985;
    line-height: 1.5;
  }
`,I=()=>{const{t:e}=(0,d.Bd)("settings"),{user:n}=(0,i.As)(),[a,o]=(0,t.useState)({id:"",companyName:"",registrationNo:"",tradeName:"",address:"",city:"",state:"",postcode:"",country:"MY",phone:"",email:"",website:"",taxNo:"",bankName:"",bankAccount:"",bankAccountName:"",logoUrl:"",updatedAt:"",updatedBy:""});(0,t.useEffect)(()=>{I()},[]);const I=async()=>{try{const a=localStorage.getItem("auth_token");if(null!==n&&void 0!==n&&n.restaurantId){const t=await fetch(`/api/restaurants/${n.restaurantId}`,{headers:a?{Authorization:`Bearer ${a}`}:{}});if(t.ok){var e;const n=await t.json(),a=n.data||n,i={id:(null===(e=a.id)||void 0===e?void 0:e.toString())||"",companyName:a.name||"",registrationNo:a.business_registration||"",tradeName:a.trade_name||"",address:a.address||"",city:a.city||"",state:a.state||"",postcode:a.postal_code||"",country:a.country||"MY",phone:a.phone||"",email:a.email||"",website:a.website||"",taxNo:a.tax_id||"",bankName:a.bank_name||"",bankAccount:a.bank_account||"",bankAccountName:a.bank_account_name||"",logoUrl:a.logo_url||"",updatedAt:a.updatedAt||"",updatedBy:a.updated_by||""};o(i)}}}catch(a){console.error("Failed to load company information:",a)}},P=(e,n)=>{o(a=>({...a,[e]:n}))},w=async()=>{const e=localStorage.getItem("auth_token");if(null===n||void 0===n||!n.restaurantId)return;const t=await fetch(`/api/restaurants/${n.restaurantId}`,{method:"PUT",headers:{"Content-Type":"application/json",...e?{Authorization:`Bearer ${e}`}:{}},body:JSON.stringify({name:a.companyName,business_registration:a.registrationNo,trade_name:a.tradeName,address:a.address,city:a.city,state:a.state,postal_code:a.postcode,country:a.country,phone:a.phone,email:a.email,website:a.website,tax_id:a.taxNo,bank_name:a.bankName,bank_account:a.bankAccount,bank_account_name:a.bankAccountName,logo_url:a.logoUrl})});if(!t.ok){const e=await t.json().catch(()=>null);throw new Error((null===e||void 0===e?void 0:e.message)||t.statusText)}};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(m,{children:[(0,p.jsx)(g,{children:(0,p.jsx)(h,{children:e("settings:companyInformationPage.companyInformation")})}),(0,p.jsxs)(u,{children:[(0,p.jsx)(k,{children:(0,p.jsx)("p",{children:"Manage your restaurant's official business information. This information will be used for invoicing, legal documents, and official communications."})}),(0,p.jsxs)(x,{children:[(0,p.jsx)(y,{children:e("settings:companyInformationPage.basicInformation")}),(0,p.jsxs)(f,{children:[(0,p.jsxs)(j,{children:[(0,p.jsxs)(b,{children:[e("settings:companyInformationPage.companyName"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(c.A,{onSave:w,children:(0,p.jsx)(v,{type:"text",value:a.companyName,onChange:e=>P("companyName",e.target.value),placeholder:"Legal entity name"})})]}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(b,{children:[e("settings:companyInformationPage.registrationNumber"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(c.A,{onSave:w,children:(0,p.jsx)(v,{type:"text",value:a.registrationNo,onChange:e=>P("registrationNo",e.target.value),placeholder:"e.g., 202401234567"})})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)(b,{children:e("settings:companyInformationPage.tradeNameBrandName")}),(0,p.jsx)(c.A,{onSave:w,children:(0,p.jsx)(v,{type:"text",value:a.tradeName||"",onChange:e=>P("tradeName",e.target.value),placeholder:"e.g., ABC Kitchen & Grill"})})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)(b,{children:e("settings:companyInformationPage.taxNumberSstgst")}),(0,p.jsx)(c.A,{onSave:w,children:(0,p.jsx)(v,{type:"text",value:a.taxNo||"",onChange:e=>P("taxNo",e.target.value),placeholder:"e.g., W10-1234-56789012"})})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)(b,{children:e("settings:companyInformationPage.website")}),(0,p.jsx)(c.A,{onSave:w,children:(0,p.jsx)(v,{type:"url",value:a.website||"",onChange:e=>P("website",e.target.value),placeholder:"www.example.com"})})]})]})]}),(0,p.jsxs)(x,{children:[(0,p.jsx)(y,{children:e("settings:companyInformationPage.contactInformation")}),(0,p.jsxs)(f,{children:[(0,p.jsxs)(j,{fullWidth:!0,children:[(0,p.jsxs)(b,{children:[e("settings:companyInformationPage.address"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(c.A,{onSave:w,children:(0,p.jsx)(v,{type:"text",value:a.address,onChange:e=>P("address",e.target.value),placeholder:"Street address"})})]}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(b,{children:[e("settings:companyInformationPage.city"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(c.A,{onSave:w,children:(0,p.jsx)(v,{type:"text",value:a.city,onChange:e=>P("city",e.target.value),placeholder:"e.g., Kuala Lumpur"})})]}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(b,{children:[e("settings:companyInformationPage.state"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(c.A,{onSave:w,type:"select",children:(0,p.jsxs)(A,{value:a.state,onChange:e=>P("state",e.target.value),children:[(0,p.jsx)("option",{value:"",children:e("settings:companyInformationPage.selectState")}),(0,p.jsx)("option",{value:"Wilayah Persekutuan",children:e("settings:companyInformationPage.wilayahPersekutuan")}),(0,p.jsx)("option",{value:"Selangor",children:e("settings:companyInformationPage.selangor")}),(0,p.jsx)("option",{value:"Penang",children:e("settings:companyInformationPage.penang")}),(0,p.jsx)("option",{value:"Johor",children:e("settings:companyInformationPage.johor")}),(0,p.jsx)("option",{value:"Perak",children:e("settings:companyInformationPage.perak")}),(0,p.jsx)("option",{value:"Kedah",children:e("settings:companyInformationPage.kedah")}),(0,p.jsx)("option",{value:"Kelantan",children:e("settings:companyInformationPage.kelantan")}),(0,p.jsx)("option",{value:"Melaka",children:e("settings:companyInformationPage.melaka")}),(0,p.jsx)("option",{value:"Negeri Sembilan",children:e("settings:companyInformationPage.negeriSembilan")}),(0,p.jsx)("option",{value:"Pahang",children:e("settings:companyInformationPage.pahang")}),(0,p.jsx)("option",{value:"Perlis",children:e("settings:companyInformationPage.perlis")}),(0,p.jsx)("option",{value:"Sabah",children:e("settings:companyInformationPage.sabah")}),(0,p.jsx)("option",{value:"Sarawak",children:e("settings:companyInformationPage.sarawak")}),(0,p.jsx)("option",{value:"Terengganu",children:e("settings:companyInformationPage.terengganu")})]})})]}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(b,{children:[e("settings:companyInformationPage.postcode"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(c.A,{onSave:w,children:(0,p.jsx)(v,{type:"text",value:a.postcode,onChange:e=>P("postcode",e.target.value),placeholder:"e.g., 50250"})})]}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(b,{children:[e("settings:companyInformationPage.country"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(c.A,{onSave:w,type:"select",children:(0,p.jsx)(A,{value:a.country,onChange:e=>P("country",e.target.value),children:l.FS.map(e=>(0,p.jsx)("option",{value:e.code,children:e.name},e.code))})})]}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(b,{children:[e("settings:companyInformationPage.phone"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(c.A,{onSave:w,children:(0,p.jsx)(r.A,{value:a.phone,onChange:e=>P("phone",e),defaultCountry:a.country})})]}),(0,p.jsxs)(j,{children:[(0,p.jsxs)(b,{children:[e("settings:companyInformationPage.email"),(0,p.jsx)("span",{children:"*"})]}),(0,p.jsx)(c.A,{onSave:w,children:(0,p.jsx)(v,{type:"email",value:a.email,onChange:e=>P("email",e.target.value),placeholder:"contact@example.com"})})]})]})]}),(0,p.jsxs)(x,{children:[(0,p.jsx)(y,{children:e("settings:companyInformationPage.bankingInformation")}),(0,p.jsxs)(f,{children:[(0,p.jsxs)(j,{children:[(0,p.jsx)(b,{children:e("settings:companyInformationPage.bankName")}),(0,p.jsx)(c.A,{onSave:w,type:"select",children:(0,p.jsxs)(A,{value:a.bankName||"",onChange:e=>P("bankName",e.target.value),children:[(0,p.jsx)("option",{value:"",children:e("settings:companyInformationPage.selectBank")}),(0,p.jsx)("option",{value:"Maybank",children:e("settings:companyInformationPage.maybank")}),(0,p.jsx)("option",{value:"CIMB Bank",children:e("settings:companyInformationPage.cimbBank")}),(0,p.jsx)("option",{value:"Public Bank",children:e("settings:companyInformationPage.publicBank")}),(0,p.jsx)("option",{value:"RHB Bank",children:e("settings:companyInformationPage.rhbBank")}),(0,p.jsx)("option",{value:"Hong Leong Bank",children:e("settings:companyInformationPage.hongLeongBank")}),(0,p.jsx)("option",{value:"AmBank",children:e("settings:companyInformationPage.ambank")}),(0,p.jsx)("option",{value:"UOB",children:e("settings:companyInformationPage.uob")}),(0,p.jsx)("option",{value:"OCBC Bank",children:e("settings:companyInformationPage.ocbcBank")}),(0,p.jsx)("option",{value:"HSBC",children:e("settings:companyInformationPage.hsbc")}),(0,p.jsx)("option",{value:"Standard Chartered",children:e("settings:companyInformationPage.standardChartered")}),(0,p.jsx)("option",{value:"Bank Islam",children:e("settings:companyInformationPage.bankIslam")}),(0,p.jsx)("option",{value:"Bank Rakyat",children:e("settings:companyInformationPage.bankRakyat")})]})})]}),(0,p.jsxs)(j,{children:[(0,p.jsx)(b,{children:e("settings:companyInformationPage.accountNumber")}),(0,p.jsx)(c.A,{onSave:w,children:(0,p.jsx)(v,{type:"text",value:a.bankAccount||"",onChange:e=>P("bankAccount",e.target.value),placeholder:"e.g., 514123456789"})})]}),(0,p.jsxs)(j,{fullWidth:!0,children:[(0,p.jsx)(b,{children:e("settings:companyInformationPage.accountName")}),(0,p.jsx)(c.A,{onSave:w,children:(0,p.jsx)(v,{type:"text",value:a.bankAccountName||"",onChange:e=>P("bankAccountName",e.target.value),placeholder:"Account holder name (must match company name)"})})]})]})]}),(0,p.jsxs)(x,{children:[(0,p.jsx)(y,{children:e("settings:companyInformationPage.companyLogo")}),(0,p.jsx)(c.A,{onSave:w,type:"image",children:(0,p.jsx)(s.A,{value:a.logoUrl||"",onChange:e=>{o(n=>({...n,logoUrl:e}))},label:"",helpText:"Upload your company logo for use in invoices and official documents"})})]})]})]})})}}}]);