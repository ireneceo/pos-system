"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7909],{2435:(e,a,o)=>{o.d(a,{FS:()=>n});const n=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur",phoneCode:"+60"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore",phoneCode:"+65"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul",phoneCode:"+82"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo",phoneCode:"+81"},{code:"CN",name:"China",timezone:"Asia/Shanghai",phoneCode:"+86"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok",phoneCode:"+66"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh",phoneCode:"+84"},{code:"PH",name:"Philippines",timezone:"Asia/Manila",phoneCode:"+63"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta",phoneCode:"+62"},{code:"IN",name:"India",timezone:"Asia/Kolkata",phoneCode:"+91"},{code:"AU",name:"Australia",timezone:"Australia/Sydney",phoneCode:"+61"},{code:"US",name:"United States",timezone:"America/New_York",phoneCode:"+1"},{code:"GB",name:"United Kingdom",timezone:"Europe/London",phoneCode:"+44"}]},4669:(e,a,o)=>{o.d(a,{A:()=>v});var n=o(9950),t=o(4752),i=o(4414);const r=t.Ay.div`
  margin-bottom: 16px;
`,s=t.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=t.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,p=t.Ay.div`
  width: ${e=>e.hasImage?"150px":"100%"};
  height: 150px;
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  position: relative;

  &:hover {
    border-color: ${e=>e.hasImage?"#CBD5E1":"#635BFF"};
    background: ${e=>e.hasImage?"#F8FAFC":"rgba(99, 91, 255, 0.03)"};
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`,c=t.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,h=t.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,g=t.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,x=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,u=t.Ay.label`
  padding: 8px 16px;
  border: 1px solid #635BFF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-block;
  text-align: center;

  &:hover {
    background: #635BFF;
    color: white;
  }

  input {
    display: none;
  }
`,m=t.Ay.button`
  padding: 8px 16px;
  border: 1px solid #DC2626;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #DC2626;
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`,y=t.Ay.input`
  display: none;
`,v=e=>{let{value:a,onChange:o,label:t="Logo Upload",helpText:v="Upload an image for your logo",maxSize:b=2,previewSize:j=150,showRemoveButton:f=!0,changeButtonText:A="Change Image",removeButtonText:C="Remove Image",imageAltText:w="Uploaded"}=e;const[T,F]=(0,n.useState)(!1),S=(0,n.useRef)(null),k=(0,n.useRef)(null),z=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*b*1024)return void alert(`Image size should be less than ${b}MB`);const a=new FileReader;a.onload=e=>{var a;const n=new Image;n.onload=()=>{const e=document.createElement("canvas"),a=e.getContext("2d");if(!a)return;const t=800;let i=n.width,r=n.height;(i>t||r>t)&&(i>r?(r=r/i*t,i=t):(i=i/r*t,r=t)),e.width=i,e.height=r,a.drawImage(n,0,0,i,r);const s=e.toDataURL("image/jpeg",.85);o(s)},n.src=null===(a=e.target)||void 0===a?void 0:a.result},a.readAsDataURL(e)},B=e=>{const a=e.target.files;a&&a.length>0&&z(a[0])};return(0,i.jsxs)(r,{children:[t&&(0,i.jsx)(s,{children:t}),v&&(0,i.jsx)(l,{children:v}),(0,i.jsxs)(d,{children:[(0,i.jsx)(p,{ref:k,isDragging:T,hasImage:!!a,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),F(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===k.current&&F(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),F(!1);const a=e.dataTransfer.files;a&&a.length>0&&z(a[0])},onClick:()=>{var e;a||(null===(e=S.current)||void 0===e||e.click())},children:a?(0,i.jsx)("img",{src:a,alt:w}):(0,i.jsxs)(c,{children:[(0,i.jsx)(h,{children:T?"Drop image here":"Drag & drop or click to upload"}),(0,i.jsxs)(g,{children:["PNG, JPG, GIF up to ",b,"MB"]})]})}),a&&(0,i.jsxs)(x,{children:[(0,i.jsxs)(u,{children:[A,(0,i.jsx)("input",{ref:S,type:"file",accept:"image/*",onChange:B})]}),f&&(0,i.jsx)(m,{onClick:()=>{o("")},children:C})]})]}),!a&&(0,i.jsx)(y,{ref:S,type:"file",accept:"image/*",onChange:B})]})}},7909:(e,a,o)=>{o.r(a),o.d(a,{default:()=>w});var n=o(9950),t=o(4752),i=o(3310),r=o(2435),s=o(2874),l=o(4669),d=o(4414);const p=[{value:"Asia/Kuala_Lumpur",label:"Malaysia (GMT+8)"},{value:"Asia/Singapore",label:"Singapore (GMT+8)"},{value:"Asia/Bangkok",label:"Thailand (GMT+7)"},{value:"Asia/Jakarta",label:"Indonesia - Jakarta (GMT+7)"},{value:"Asia/Ho_Chi_Minh",label:"Vietnam (GMT+7)"},{value:"Asia/Manila",label:"Philippines (GMT+8)"},{value:"Asia/Tokyo",label:"Japan (GMT+9)"},{value:"Asia/Seoul",label:"South Korea (GMT+9)"},{value:"Asia/Shanghai",label:"China (GMT+8)"},{value:"Asia/Hong_Kong",label:"Hong Kong (GMT+8)"},{value:"Asia/Taipei",label:"Taiwan (GMT+8)"},{value:"Asia/Dubai",label:"UAE (GMT+4)"},{value:"Europe/London",label:"UK (GMT+0/+1)"},{value:"America/New_York",label:"US Eastern (GMT-5/-4)"},{value:"America/Los_Angeles",label:"US Pacific (GMT-8/-7)"},{value:"Australia/Sydney",label:"Australia - Sydney (GMT+10/+11)"}],c=t.Ay.div`
  background: #FAFBFC;
  min-height: 100vh;
`,h=t.Ay.div`
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
`,x=t.Ay.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: ${e=>e.hasChanges?"#635BFF":"#E6EBF1"};
  color: ${e=>e.hasChanges?"white":"#8898AA"};

  &:hover {
    background: ${e=>e.hasChanges?"#5A51E6":"#E6EBF1"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`,u=t.Ay.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,m=t.Ay.div`
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
`,v=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,b=t.Ay.div`
  grid-column: ${e=>e.fullWidth?"span 2":"span 1"};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`,j=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;

  span {
    color: #DC2626;
    margin-left: 2px;
  }
`,f=t.Ay.input`
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
`,C=t.Ay.div`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  background: ${e=>"success"===e.type?"#ECFDF5":"#FEF2F2"};
  color: ${e=>"success"===e.type?"#059669":"#DC2626"};
  font-size: 14px;
`,w=()=>{const[e,a]=(0,n.useState)(!1),[o,t]=(0,n.useState)(!1),[w,T]=(0,n.useState)(null),[F,S]=(0,n.useState)({companyName:"",registrationNo:"",tradeName:"",address:"",city:"",state:"",postalCode:"",country:"MY",phone:"",email:"",website:"",taxNo:"",logoUrl:"",operationSettings:{openingTime:"09:00",closingTime:"22:00",timeZone:"Asia/Kuala_Lumpur"}});(0,n.useEffect)(()=>{k()},[]);const k=async()=>{try{const n=localStorage.getItem("auth_token"),t=await fetch("/api/brands/company-info",{headers:{Authorization:`Bearer ${n}`}});if(t.ok){const n=await t.json();var e,a,o;if(n)S({companyName:n.company_name||n.name||"",registrationNo:n.registration_no||"",tradeName:n.trade_name||"",address:n.address||"",city:n.city||"",state:n.state||"",postalCode:n.postal_code||"",country:n.country||"MY",phone:n.phone||"",email:n.email||"",website:n.website||"",taxNo:n.tax_no||"",logoUrl:n.logo_url||"",operationSettings:{openingTime:(null===(e=n.operation_settings)||void 0===e?void 0:e.openingTime)||"09:00",closingTime:(null===(a=n.operation_settings)||void 0===a?void 0:a.closingTime)||"22:00",timeZone:(null===(o=n.operation_settings)||void 0===o?void 0:o.timeZone)||"Asia/Kuala_Lumpur"}})}}catch(n){console.error("Error fetching company info:",n)}},z=(e,o)=>{S(a=>({...a,[e]:o})),a(!0),T(null)},B=(e,o)=>{S(a=>({...a,operationSettings:{...a.operationSettings,[e]:o}})),a(!0),T(null)};return(0,d.jsx)(i.A,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(h,{children:[(0,d.jsx)(g,{children:"Company Information"}),(0,d.jsx)(x,{hasChanges:e,onClick:async()=>{t(!0),T(null);try{const e=localStorage.getItem("auth_token");if(!(await fetch("/api/brands/company-info",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({company_name:F.companyName,registration_no:F.registrationNo,trade_name:F.tradeName,address:F.address,city:F.city,state:F.state,postal_code:F.postalCode,country:F.country,phone:F.phone,email:F.email,website:F.website,tax_no:F.taxNo,logo_url:F.logoUrl,operation_settings:F.operationSettings})})).ok)throw new Error("Failed to save");T({type:"success",text:"Company information saved successfully!"}),a(!1)}catch(e){T({type:"error",text:"Failed to save company information. Please try again."})}finally{t(!1)}},disabled:!e||o,children:o?"Saving...":"Save Changes"})]}),(0,d.jsxs)(u,{children:[w&&(0,d.jsx)(C,{type:w.type,children:w.text}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Basic Information"}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(b,{children:[(0,d.jsxs)(j,{children:["Company Name ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(f,{type:"text",value:F.companyName,onChange:e=>z("companyName",e.target.value),placeholder:"Enter company name"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Registration No."}),(0,d.jsx)(f,{type:"text",value:F.registrationNo,onChange:e=>z("registrationNo",e.target.value),placeholder:"e.g., 202001234567"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Trade Name"}),(0,d.jsx)(f,{type:"text",value:F.tradeName,onChange:e=>z("tradeName",e.target.value),placeholder:"Trading as..."})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Tax No. (SST/GST)"}),(0,d.jsx)(f,{type:"text",value:F.taxNo,onChange:e=>z("taxNo",e.target.value),placeholder:"e.g., W10-1234-56789012"})]})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Address"}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(b,{fullWidth:!0,children:[(0,d.jsxs)(j,{children:["Street Address ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(f,{type:"text",value:F.address,onChange:e=>z("address",e.target.value),placeholder:"Enter street address"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"City"}),(0,d.jsx)(f,{type:"text",value:F.city,onChange:e=>z("city",e.target.value),placeholder:"e.g., Kuala Lumpur"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"State"}),(0,d.jsx)(f,{type:"text",value:F.state,onChange:e=>z("state",e.target.value),placeholder:"e.g., Wilayah Persekutuan"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Postal Code"}),(0,d.jsx)(f,{type:"text",value:F.postalCode,onChange:e=>z("postalCode",e.target.value),placeholder:"e.g., 50000"})]}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(j,{children:["Country ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(A,{value:F.country,onChange:e=>z("country",e.target.value),children:r.FS.map(e=>(0,d.jsx)("option",{value:e.code,children:e.name},e.code))})]})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Contact Information"}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(b,{children:[(0,d.jsxs)(j,{children:["Phone ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(s.A,{value:F.phone,onChange:e=>z("phone",e),defaultCountry:F.country})]}),(0,d.jsxs)(b,{children:[(0,d.jsxs)(j,{children:["Email ",(0,d.jsx)("span",{children:"*"})]}),(0,d.jsx)(f,{type:"email",value:F.email,onChange:e=>z("email",e.target.value),placeholder:"company@example.com"})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Website"}),(0,d.jsx)(f,{type:"url",value:F.website,onChange:e=>z("website",e.target.value),placeholder:"https://www.example.com"})]})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Operation Settings"}),(0,d.jsxs)(v,{children:[(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Opening Time"}),(0,d.jsx)(f,{type:"time",value:F.operationSettings.openingTime,onChange:e=>B("openingTime",e.target.value)})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Closing Time"}),(0,d.jsx)(f,{type:"time",value:F.operationSettings.closingTime,onChange:e=>B("closingTime",e.target.value)})]}),(0,d.jsxs)(b,{children:[(0,d.jsx)(j,{children:"Timezone"}),(0,d.jsx)(A,{value:F.operationSettings.timeZone,onChange:e=>B("timeZone",e.target.value),children:p.map(e=>(0,d.jsx)("option",{value:e.value,children:e.label},e.value))})]})]})]}),(0,d.jsxs)(m,{children:[(0,d.jsx)(y,{children:"Company Logo"}),(0,d.jsx)(l.A,{value:F.logoUrl,onChange:e=>z("logoUrl",e),imageAltText:"Company Logo"})]})]})]})})}}}]);