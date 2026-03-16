"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7592],{2653:(e,n,r)=>{r.d(n,{M:()=>o});var t=r(9950),i=r(4492);function o(e){const[n,r]=(0,i.ok)(),o=(0,t.useCallback)(()=>n.get("tab")||e,[n,e]),[a,s]=(0,t.useState)(o());return[a,(0,t.useCallback)(e=>{s(e),r({tab:e})},[r])]}},3705:(e,n,r)=>{r.d(n,{cc:()=>i});var t=r(4752);const i=t.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #DC2626;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;t.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,t.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,t.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${e=>e.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4877:(e,n,r)=>{r.d(n,{A:()=>v});var t=r(9950),i=r(4752),o=r(4414);const a=i.Ay.div`
  margin-bottom: 16px;
`,s=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=i.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,c=i.Ay.div`
  width: ${e=>e.hasImage?"150px":"100%"};
  height: 150px;
  border: 2px dashed ${e=>e.isDragging?"#635BFF":"#CBD5E1"};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${e=>e.isDragging?"rgba(99, 91, 255, 0.05)":"#F8FAFC"};
  cursor: ${e=>e.isUploading?"wait":"pointer"};
  transition: all 0.2s;
  overflow: hidden;
  position: relative;
  opacity: ${e=>e.isUploading?.7:1};

  &:hover {
    border-color: ${e=>e.hasImage?"#CBD5E1":"#635BFF"};
    background: ${e=>e.hasImage?"#F8FAFC":"rgba(99, 91, 255, 0.03)"};
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`,p=i.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,g=i.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,x=i.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,h=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,u=i.Ay.label`
  padding: 8px 16px;
  border: 1px solid #635BFF;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #635BFF;
  cursor: ${e=>e.disabled?"wait":"pointer"};
  transition: all 0.2s;
  display: inline-block;
  text-align: center;
  opacity: ${e=>e.disabled?.5:1};

  &:hover {
    background: ${e=>e.disabled?"transparent":"#635BFF"};
    color: ${e=>e.disabled?"#635BFF":"white"};
  }

  input {
    display: none;
  }
`,m=i.Ay.button`
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
`,y=i.Ay.input`
  display: none;
`,b=i.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,j=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",v=e=>{let{value:n,onChange:r,label:i="Logo Upload",helpText:v="Upload an image for your logo",maxSize:f=2,previewSize:C=150,showRemoveButton:w=!0,changeButtonText:k="Change Image",removeButtonText:_="Remove Image",imageAltText:F="Uploaded"}=e;const[B,S]=(0,t.useState)(!1),[A,P]=(0,t.useState)(!1),T=(0,t.useRef)(null),z=(0,t.useRef)(null),R=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*f*1024)return void alert(`Image size should be less than ${f}MB`);P(!0);const n=new FileReader;n.onload=async e=>{var n;const t=new Image;t.onload=async()=>{const e=document.createElement("canvas"),n=e.getContext("2d");if(!n)return void P(!1);const i=1200;let o=t.width,a=t.height;(o>i||a>i)&&(o>a?(a=a/o*i,o=i):(o=o/a*i,a=i)),e.width=o,e.height=a,n.drawImage(t,0,0,o,a);const s=e.toDataURL("image/jpeg",.85),l=await(async e=>{try{const n=localStorage.getItem("auth_token"),r=await fetch(`${j()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({image:e})}),t=await r.json();return t.success?t.data.original:(console.error("Image upload failed:",t.message),null)}catch(n){return console.error("Image upload error:",n),null}})(s);P(!1),l?r(l):alert("Failed to upload image. Please try again.")},t.src=null===(n=e.target)||void 0===n?void 0:n.result},n.readAsDataURL(e)},E=e=>{if(A)return;const n=e.target.files;n&&n.length>0&&R(n[0]),e.target.value=""};return(0,o.jsxs)(a,{children:[i&&(0,o.jsx)(s,{children:i}),v&&(0,o.jsx)(l,{children:v}),(0,o.jsxs)(d,{children:[(0,o.jsx)(c,{ref:z,isDragging:B,hasImage:!!n,isUploading:A,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),A||S(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===z.current&&S(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),S(!1),A)return;const n=e.dataTransfer.files;n&&n.length>0&&R(n[0])},onClick:()=>{var e;n||A||(null===(e=T.current)||void 0===e||e.click())},children:A?(0,o.jsxs)(p,{children:[(0,o.jsx)(b,{}),(0,o.jsx)(g,{style:{marginTop:"12px"},children:"Uploading..."})]}):n?(0,o.jsx)("img",{src:(I=n,I?I.startsWith("http")?I:I.startsWith("/uploads/")?`${j()}${I}`:I:""),alt:F}):(0,o.jsxs)(p,{children:[(0,o.jsx)(g,{children:B?"Drop image here":"Drag & drop or click to upload"}),(0,o.jsxs)(x,{children:["PNG, JPG, GIF up to ",f,"MB"]})]})}),n&&!A&&(0,o.jsxs)(h,{children:[(0,o.jsxs)(u,{disabled:A,children:[k,(0,o.jsx)("input",{ref:T,type:"file",accept:"image/*",onChange:E,disabled:A})]}),w&&(0,o.jsx)(m,{onClick:()=>{r("")},disabled:A,children:_})]})]}),!n&&!A&&(0,o.jsx)(y,{ref:T,type:"file",accept:"image/*",onChange:E})]});var I}},7592:(e,n,r)=>{r.r(n),r.d(n,{default:()=>H});var t=r(9950),i=r(4752),o=r(9163),a=r(8409),s=r(1367),l=r(9018),d=r(8930),c=r(755),p=r(3705),g=r(4877),x=r(8666),h=r(8012),u=r(2653),m=r(5863),y=r(6038),b=r(4414);const j=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,v=i.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  background: #635BFF;
  color: white;

  &:hover {
    background: #5A51E6;
    transform: translateY(-1px);
  }

  &:disabled {
    background: #635BFF;
    color: white;
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`,f=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  background: #635BFF;
  color: white;
  
  &:hover {
    background: #5A51E6;
  }
  
  &:disabled {
    background: #E6EBF1;
    color: #8898AA;
    cursor: not-allowed;
  }
`,C=i.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,w=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,k=i.Ay.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  box-sizing: border-box;
`,_=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 20px;
`,F=i.Ay.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,B=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,S=i.Ay.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #C7D2FE;
  }

  &:disabled {
    background: #F6F9FC;
    color: #8898AA;
    cursor: not-allowed;
  }
`,A=i.Ay.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  transition: all 0.15s;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #C7D2FE;
  }
`,P=i.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`,T=i.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
`,z=i.Ay.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`,R=i.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
`,E=i.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E6EBF1;
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  ${R}:checked + & {
    background-color: #635BFF;
  }

  ${R}:focus + & {
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  ${R}:checked + &:before {
    transform: translateX(24px);
  }
`,I=i.Ay.hr`
  border: none;
  border-top: 1px solid #F6F9FC;
  margin: 20px 0;
`,D=i.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
`,N=i.Ay.div`
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 12px;

  ${e=>"success"===e.type?"\n    background: #ECFDF5;\n    color: #059669;\n    border: 1px solid #A7F3D0;\n  ":"\n    background: #FEF2F2;\n    color: #DC2626;\n    border: 1px solid #FECACA;\n  "}
`,M=i.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
`,$=i.Ay.div`
  background: #F6F9FC;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`,O=(0,i.Ay)(S)`
  width: 100px;
  display: inline-block;
  margin-right: 8px;

  @media (max-width: 480px) {
    width: 80px;
    margin-right: 4px;
  }
`,L=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 20px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
  }
`,U=i.Ay.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  transition: all 0.15s;
  
  &:hover {
    border-color: #C7D2FE;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`,W=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,q=i.Ay.div`
  margin: 12px 0;
  display: flex;
  justify-content: center;
`,G=i.Ay.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 8px;
`,K=i.Ay.button`
  padding: 4px 10px;
  font-size: 12px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;
  color: #6B7C93;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }
`,Q=[{code:"MY",name:"Malaysia",timezone:"Asia/Kuala_Lumpur"},{code:"SG",name:"Singapore",timezone:"Asia/Singapore"},{code:"KR",name:"South Korea",timezone:"Asia/Seoul"},{code:"JP",name:"Japan",timezone:"Asia/Tokyo"},{code:"CN",name:"China",timezone:"Asia/Shanghai"},{code:"TH",name:"Thailand",timezone:"Asia/Bangkok"},{code:"VN",name:"Vietnam",timezone:"Asia/Ho_Chi_Minh"},{code:"PH",name:"Philippines",timezone:"Asia/Manila"},{code:"ID",name:"Indonesia",timezone:"Asia/Jakarta"},{code:"IN",name:"India",timezone:"Asia/Kolkata"},{code:"AU",name:"Australia",timezone:"Australia/Sydney"},{code:"US",name:"United States",timezone:"America/New_York"},{code:"GB",name:"United Kingdom",timezone:"Europe/London"}],J={is_active:!0,points_per_currency:1,points_to_currency:100,min_points_to_use:100,max_points_per_order_percent:50,silver_threshold:500,gold_threshold:2e3,vip_threshold:5e3,bronze_bonus_rate:1,silver_bonus_rate:1.2,gold_bonus_rate:1.5,vip_bonus_rate:2,bronze_discount_percent:0,silver_discount_percent:0,gold_discount_percent:5,vip_discount_percent:10,points_expiry_days:0,welcome_points:0},H=()=>{var e,n,r,i,H,V,Y,Z,X,ee,ne,re,te;const{user:ie}=(0,s.As)(),{updateSettings:oe}=(0,l.Pj)(),{categories:ae}=(0,d.b)(),{setTheme:se,resetTheme:le,isDefaultTheme:de}=(0,c.e)(),ce=["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"].includes((null===ie||void 0===ie?void 0:ie.role)||"")?"company":"store",[pe,ge]=(0,u.M)(ce),[xe,he]=(0,t.useState)(!1),[ue,me]=(0,t.useState)(null),[ye,be]=(0,t.useState)(null),[je,ve]=(0,t.useState)([]),[fe,Ce]=(0,t.useState)({billPrinter:{enabled:!1,name:"",autoPrint:!1},kitchenPrinter:{enabled:!1,name:"",autoPrint:!1,printPerItem:!1}}),[we,ke]=(0,t.useState)(()=>{const e=localStorage.getItem("printerMode");return"browser"===e||"rawbt"===e?e:"rawbt"}),[_e,Fe]=(0,t.useState)(!0),Be=()=>{const e={store:{name:"FOODCOURT CENTRAL",businessRegistration:"000123456789",phone:"+60 3-1234-5678",email:"contact@foodcourt.com",address:"123 Main Street, City Center",city:"Kuala Lumpur",state:"Wilayah Persekutuan",postalCode:"50000",country:"MY",gstRegNo:"000123456789",logo:""},operations:{openingTime:"09:00",closingTime:"22:00",timeZone:"Asia/Kuala_Lumpur",orderNumberReset:"daily",defaultPreparationTime:15,taxEnabled:!0,taxRate:6,serviceChargeEnabled:!1,serviceChargeRate:10,currency:"RM",cashRounding:.05,roundingApplyTo:"cash_only",pagerSystem:{enabled:!1,totalPagers:50},takeawayPricing:{enabled:!1,pricingType:"per-item",perItemCharge:.5,categoryCharges:{food:1,beverage:.5,dessert:.5,other:.5}},deliveryPricing:{enabled:!1,minimumOrder:0,freeAbove:999999,zones:[]},loyaltyTiers:{enabled:!0,bronze:{minOrders:0,minSpent:0},silver:{minOrders:5,minSpent:500},gold:{minOrders:15,minSpent:1500},vip:{minOrders:30,minSpent:3e3}},orderTypes:{dineIn:!0,takeaway:!0,pickup:!1,delivery:!1},breakTimes:[]}},n=localStorage.getItem("storeSettings");if(n)try{var r,t,i,o,a,s,l,d,c,p,g,x,h;const u=JSON.parse(n);return{store:{...e.store,...u.store||{}},operations:{...e.operations,...u.operations||{},pagerSystem:{...e.operations.pagerSystem,...u.operations&&u.operations.pagerSystem||{}},takeawayPricing:{...e.operations.takeawayPricing,...u.operations&&u.operations.takeawayPricing||{},categoryCharges:{...e.operations.takeawayPricing.categoryCharges,...(null===(r=u.operations)||void 0===r||null===(t=r.takeawayPricing)||void 0===t?void 0:t.categoryCharges)||{}}},deliveryPricing:{...e.operations.deliveryPricing,...u.operations&&u.operations.deliveryPricing||{},zones:(null===(i=u.operations)||void 0===i||null===(o=i.deliveryPricing)||void 0===o?void 0:o.zones)||e.operations.deliveryPricing.zones},loyaltyTiers:{...e.operations.loyaltyTiers,...u.operations&&u.operations.loyaltyTiers||{},bronze:{...e.operations.loyaltyTiers.bronze,...(null===(a=u.operations)||void 0===a||null===(s=a.loyaltyTiers)||void 0===s?void 0:s.bronze)||{}},silver:{...e.operations.loyaltyTiers.silver,...(null===(l=u.operations)||void 0===l||null===(d=l.loyaltyTiers)||void 0===d?void 0:d.silver)||{}},gold:{...e.operations.loyaltyTiers.gold,...(null===(c=u.operations)||void 0===c||null===(p=c.loyaltyTiers)||void 0===p?void 0:p.gold)||{}},vip:{...e.operations.loyaltyTiers.vip,...(null===(g=u.operations)||void 0===g||null===(x=g.loyaltyTiers)||void 0===x?void 0:x.vip)||{}}},orderTypes:{...e.operations.orderTypes,...u.operations&&u.operations.orderTypes||{}},breakTimes:(null===(h=u.operations)||void 0===h?void 0:h.breakTimes)||e.operations.breakTimes}}}catch(u){console.error("Failed to parse localStorage storeSettings:",u)}return e},[Se,Ae]=(0,t.useState)(Be().store),[Pe,Te]=(0,t.useState)(Be().operations),[ze,Re]=(0,t.useState)({brand_id:null,brand_name:null}),Ee=Be().operations,[Ie,De]=(0,t.useState)({currency:Ee.currency||"RM",cashRounding:null!==Ee.cashRounding&&void 0!==Ee.cashRounding?Ee.cashRounding:null,roundingApplyTo:Ee.roundingApplyTo||"cash_only"}),[Ne,Me]=(0,t.useState)({name:"Food Court Management Corp",businessRegistration:"202301234567",phone:"+60 3-2123-4567",email:"admin@foodcourtmanagement.com",address:"123 Business District",city:"Kuala Lumpur",state:"Wilayah Persekutuan",postalCode:"50450",website:"www.foodcourtmanagement.com",logo:"",taxId:"90-1234567",industry:"Food Service Management"}),[$e,Oe]=(0,t.useState)({brands:[{id:"1",name:"Local Delights",description:"Traditional Malaysian cuisine",logo:"",primaryColor:"#635BFF",secondaryColor:"#F8FAFC",accentColor:"#5A51E6",isActive:!0,restaurantCount:3,restaurants:[{id:"rest-001",name:"Local Delights",branchName:"KLCC Branch",location:"KLCC"},{id:"rest-002",name:"Local Delights",branchName:"Pavilion Branch",location:"Pavilion KL"},{id:"rest-003",name:"Local Delights",branchName:"Mid Valley Branch",location:"Mid Valley"}]},{id:"2",name:"International Fusion",description:"Global flavors and modern cuisine",logo:"",primaryColor:"#059669",secondaryColor:"#ECFDF5",accentColor:"#047857",isActive:!0,restaurantCount:2,restaurants:[{id:"rest-004",name:"International Fusion",branchName:"Sunway Branch",location:"Sunway Pyramid"},{id:"rest-005",name:"International Fusion",branchName:"IOI Branch",location:"IOI City Mall"}]},{id:"3",name:"Quick Bites",description:"Fast casual dining experience",logo:"",primaryColor:"#DC2626",secondaryColor:"#FEF2F2",accentColor:"#B91C1C",isActive:!1,restaurantCount:1,restaurants:[{id:"rest-006",name:"Quick Bites",branchName:"One Utama Branch",location:"One Utama"}]}]}),[Le,Ue]=(0,t.useState)(""),[We,qe]=(0,t.useState)({enableTableNumbers:!0,tableNumberRequired:!1,tablePrefix:"T",totalTables:20,qrCodeBaseUrl:window.location.origin}),[Ge,Ke]=(0,t.useState)([]),[Qe,Je]=(0,t.useState)([]),[He,Ve]=(0,t.useState)(!1),[Ye,Ze]=(0,t.useState)(J),[Xe,en]=(0,t.useState)(!1),[nn,rn]=(0,t.useState)([]);(0,t.useEffect)(()=>{(async()=>{try{const e=localStorage.getItem("auth_token"),n=await fetch("/api/currencies/supported",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();e.success&&Array.isArray(e.data)&&rn(e.data.map(e=>e.code||e))}}catch(e){console.error("Failed to fetch supported currencies:",e)}})()},[]),(0,t.useEffect)(()=>{(async()=>{if(null!==ie&&void 0!==ie&&ie.restaurantId)try{const i=await fetch(`/api/restaurants/${ie.restaurantId}`);if(i.ok){var e,n;const o=await i.json(),a=o.data||o;if(console.log("\ud83d\udd0d RAW API Response for restaurant:",{currency:a.currency,cash_rounding:a.cash_rounding,rounding_apply_to:a.rounding_apply_to,raw_cash_rounding_type:typeof a.cash_rounding}),Ae({name:a.name||"",businessRegistration:a.business_registration||"",phone:a.phone||"",email:a.email||"",address:a.address||"",city:a.city||"",state:a.state||"",postalCode:a.postal_code||"",country:a.country||"MY",gstRegNo:a.tax_id||"",logo:a.logo_url||""}),Re({brand_id:a.brand_id||null,brand_name:(null===(e=a.brand)||void 0===e?void 0:e.name)||null}),a.slug&&Ue(a.slug),a.payment_settings){console.log("\u2705 Loading payment settings from DB:",JSON.stringify(a.payment_settings).substring(0,200)),be(a.payment_settings);const e=a.payment_settings._order,n=Object.keys(a.payment_settings).filter(e=>"_order"!==e);if(e&&Array.isArray(e)){const r=[...e.filter(e=>n.includes(e))];n.forEach(e=>{r.includes(e)||r.push(e)}),ve(r)}else ve(n);console.log("\u2705 Loaded payment methods:",Object.keys(a.payment_settings))}else console.log("\u26a0\ufe0f  No payment settings found in DB, using default values");const s=Be().operations,l=a.operation_settings?{...s,...a.operation_settings,pagerSystem:{...s.pagerSystem,...a.operation_settings.pagerSystem||{}},takeawayPricing:{...s.takeawayPricing,...a.operation_settings.takeawayPricing||{},categoryCharges:{...s.takeawayPricing.categoryCharges,...a.operation_settings.takeawayPricing&&a.operation_settings.takeawayPricing.categoryCharges||{}}},deliveryPricing:{...s.deliveryPricing,...a.operation_settings.deliveryPricing||{},zones:(null===(n=a.operation_settings.deliveryPricing)||void 0===n?void 0:n.zones)||[]},loyaltyTiers:{...s.loyaltyTiers,...a.operation_settings.loyaltyTiers||{},bronze:{...s.loyaltyTiers.bronze,...a.operation_settings.loyaltyTiers&&a.operation_settings.loyaltyTiers.bronze||{}},silver:{...s.loyaltyTiers.silver,...a.operation_settings.loyaltyTiers&&a.operation_settings.loyaltyTiers.silver||{}},gold:{...s.loyaltyTiers.gold,...a.operation_settings.loyaltyTiers&&a.operation_settings.loyaltyTiers.gold||{}},vip:{...s.loyaltyTiers.vip,...a.operation_settings.loyaltyTiers&&a.operation_settings.loyaltyTiers.vip||{}}},orderTypes:{...s.orderTypes,...a.operation_settings.orderTypes||{}},breakTimes:a.operation_settings.breakTimes||s.breakTimes}:s,d=a.currency||"RM",c=null!==a.cash_rounding&&void 0!==a.cash_rounding?parseFloat(a.cash_rounding):null,p=a.rounding_apply_to||"cash_only",g={...l,currency:d,cashRounding:c,roundingApplyTo:p};var r,t;if(console.log("\u2705 Loading currency from DB:",{currency:d,cashRounding:c,roundingApplyTo:p,raw_cash_rounding:a.cash_rounding}),console.log("\u2705 Final operation settings with currency:",g),Te(g),De({currency:d,cashRounding:null!==a.cash_rounding&&void 0!==a.cash_rounding?parseFloat(a.cash_rounding):null,roundingApplyTo:p}),a.table_settings)console.log("\u2705 Loading table settings from DB:",a.table_settings),qe({enableTableNumbers:null===(r=a.table_settings.enableTableNumbers)||void 0===r||r,tableNumberRequired:null!==(t=a.table_settings.tableNumberRequired)&&void 0!==t&&t,tablePrefix:a.table_settings.tablePrefix||"T",totalTables:a.table_settings.totalTables||20,qrCodeBaseUrl:a.table_settings.qrCodeBaseUrl||window.location.origin})}}catch(i){console.error("Failed to load store data:",i)}})()},[null===ie||void 0===ie?void 0:ie.restaurantId]),(0,t.useEffect)(()=>{"managers"===pe&&(async()=>{if(null!==ie&&void 0!==ie&&ie.restaurantId){Ve(!0);try{const e=await fetch(`/api/restaurants/${ie.restaurantId}`);if(e.ok){const n=await e.json(),r=n.data||n;r.managers&&Array.isArray(r.managers)&&Je(r.managers.map(e=>({id:e.id.toString(),name:e.name||e.full_name||e.username,email:e.email,role:e.role,company:e.company||"",phone:e.phone||"",isPrimary:e.isPrimary||!1})))}}catch(e){console.error("Failed to load managers:",e)}finally{Ve(!1)}}})()},[pe,null===ie||void 0===ie?void 0:ie.restaurantId]),(0,t.useEffect)(()=>{(async()=>{if(null!==ie&&void 0!==ie&&ie.restaurantId){Fe(!0);try{const g=localStorage.getItem("auth_token"),x=await fetch(`/api/restaurants/${ie.restaurantId}`,{headers:{Authorization:`Bearer ${g}`,"Content-Type":"application/json"}});if(x.ok){const g=await x.json();if(g.printer_settings){var e,n,r,t,i,o,a,s,l,d,c,p;const x=g.printer_settings,h=x.printerMode||"rawbt";ke(h),(0,m.aH)(h),Ce({billPrinter:{enabled:null!==(e=null===(n=x.billPrinter)||void 0===n?void 0:n.enabled)&&void 0!==e&&e,name:(null===(r=x.billPrinter)||void 0===r?void 0:r.name)||"",autoPrint:null!==(t=null===(i=x.billPrinter)||void 0===i?void 0:i.autoPrint)&&void 0!==t&&t},kitchenPrinter:{enabled:null!==(o=null===(a=x.kitchenPrinter)||void 0===a?void 0:a.enabled)&&void 0!==o&&o,name:(null===(s=x.kitchenPrinter)||void 0===s?void 0:s.name)||"",autoPrint:null!==(l=null===(d=x.kitchenPrinter)||void 0===d?void 0:d.autoPrint)&&void 0!==l&&l,printPerItem:null!==(c=null===(p=x.kitchenPrinter)||void 0===p?void 0:p.printPerItem)&&void 0!==c&&c}}),localStorage.setItem("printerMode",h),localStorage.setItem("printerSettings",JSON.stringify({billPrinter:x.billPrinter||{enabled:!1,name:"",autoPrint:!1},kitchenPrinter:x.kitchenPrinter||{enabled:!1,name:"",autoPrint:!1,printPerItem:!1}}))}}}catch(g){console.error("Failed to load printer settings from DB:",g);const e=localStorage.getItem("printerSettings");if(e)try{const n=JSON.parse(e);Ce(e=>({billPrinter:{...e.billPrinter,...n.billPrinter},kitchenPrinter:{...e.kitchenPrinter,...n.kitchenPrinter}}))}catch(x){console.error("Failed to parse printer settings:",x)}ke((0,m.Ii)())}finally{Fe(!1)}}})()},[null===ie||void 0===ie?void 0:ie.restaurantId]),(0,t.useEffect)(()=>{"membership"===pe&&(async()=>{if(null!==ie&&void 0!==ie&&ie.restaurantId){en(!0);try{const n=localStorage.getItem("auth_token"),r=await fetch(`/api/membership/settings/${ie.restaurantId}`,{headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"}});if(r.ok){const n=await r.json();var e;n.success&&n.data&&Ze({is_active:null===(e=n.data.is_active)||void 0===e||e,points_per_currency:parseFloat(n.data.points_per_currency)||1,points_to_currency:parseFloat(n.data.points_to_currency)||100,min_points_to_use:n.data.min_points_to_use||100,max_points_per_order_percent:parseFloat(n.data.max_points_per_order_percent)||50,silver_threshold:parseFloat(n.data.silver_threshold)||500,gold_threshold:parseFloat(n.data.gold_threshold)||2e3,vip_threshold:parseFloat(n.data.vip_threshold)||5e3,bronze_bonus_rate:parseFloat(n.data.bronze_bonus_rate)||1,silver_bonus_rate:parseFloat(n.data.silver_bonus_rate)||1.2,gold_bonus_rate:parseFloat(n.data.gold_bonus_rate)||1.5,vip_bonus_rate:parseFloat(n.data.vip_bonus_rate)||2,bronze_discount_percent:parseFloat(n.data.bronze_discount_percent)||0,silver_discount_percent:parseFloat(n.data.silver_discount_percent)||0,gold_discount_percent:parseFloat(n.data.gold_discount_percent)||5,vip_discount_percent:parseFloat(n.data.vip_discount_percent)||10,points_expiry_days:n.data.points_expiry_days||0,welcome_points:n.data.welcome_points||0})}}catch(n){console.error("Failed to load membership settings:",n)}finally{en(!1)}}})()},[pe,null===ie||void 0===ie?void 0:ie.restaurantId]),(0,t.useEffect)(()=>{const e=localStorage.getItem("tableSettings");if(e){const n=JSON.parse(e);qe(n)}},[]),(0,t.useEffect)(()=>{if(!Le)return;const e=[];for(let n=1;n<=We.totalTables;n++){const r=`${We.tablePrefix}${String(n).padStart(3,"0")}`,t=`${We.qrCodeBaseUrl}/mobile/${Le}?table=${r}`;e.push({id:`table-${n}`,number:n,qrCode:t,isActive:!0})}Ke(e)},[Le,We.totalTables,We.tablePrefix,We.qrCodeBaseUrl]);const tn=(e,n,r)=>{be(t=>{const i=t[e];let o=[...i.availableIn||[]];return r?o.includes(n)||o.push(n):o=o.filter(e=>e!==n),{...t,[e]:{...i,availableIn:o,enabled:o.length>0}}}),he(!0)},on=(e,n,r)=>{be(t=>({...t,[e]:{...t[e],[n]:r}})),he(!0)},an=(e,n,r)=>{be(t=>({...t,[e]:{...t[e],config:{...t[e].config,[n]:r}}})),he(!0)},sn=(e,n)=>{ve(r=>{const t=r.indexOf(e);if(-1===t)return r;const i="up"===n?t-1:t+1;if(i<0||i>=r.length)return r;const o=[...r];return[o[t],o[i]]=[o[i],o[t]],o}),he(!0)},ln=async()=>{console.log("\ud83d\udd04 handleSave called"),console.log("\ud83d\udcca user?.restaurantId:",null===ie||void 0===ie?void 0:ie.restaurantId);try{const e={store:Se,operations:Pe};if(localStorage.setItem("storeSettings",JSON.stringify(e)),localStorage.setItem("tableSettings",JSON.stringify(We)),localStorage.setItem("tables",JSON.stringify(Ge)),window.dispatchEvent(new Event("storage")),console.log("\u2705 localStorage saved"),null!==ie&&void 0!==ie&&ie.restaurantId){console.log("\ud83d\udce4 Preparing PUT request to /api/restaurants/"+ie.restaurantId);const e={};ye&&(Object.keys(ye).forEach(n=>{"_order"!==n&&(e[n]=ye[n])}),e._order=je);const n={name:Se.name,business_registration:Se.businessRegistration,phone:Se.phone,email:Se.email,address:Se.address,city:Se.city,state:Se.state,postal_code:Se.postalCode,country:Se.country,tax_id:Se.gstRegNo,logo_url:Se.logo,payment_settings:e,operation_settings:Pe,table_settings:We,currency:Ie.currency,cash_rounding:Ie.cashRounding,rounding_apply_to:Ie.roundingApplyTo};console.log("\ud83d\udce6 Request body (first 500 chars):",JSON.stringify(n).substring(0,500)),console.log("\ud83d\udcb3 Payment settings being saved:",JSON.stringify(ye).substring(0,300)),console.log("\u2699\ufe0f Operation settings being saved:",JSON.stringify(Pe)),console.log("\ud83d\udcb0 Currency settings being saved:",{currency:Ie.currency,cashRounding:Ie.cashRounding,roundingApplyTo:Ie.roundingApplyTo});const r=localStorage.getItem("auth_token");console.log("\ud83d\udd11 Auth token length:",(null===r||void 0===r?void 0:r.length)||0),console.log("\ud83d\udc64 User restaurantId:",ie.restaurantId),console.log("\ud83d\udce1 Sending PUT request to:",`/api/store/settings?restaurantId=${ie.restaurantId}`);const t=await fetch(`/api/store/settings?restaurantId=${ie.restaurantId}&_t=${Date.now()}`,{method:"PUT",credentials:"include",headers:{"Content-Type":"application/json","Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",...r?{Authorization:`Bearer ${r}`}:{}},body:JSON.stringify(n)});if(console.log("\ud83d\udce8 Response received:",t.status,t.statusText),console.log("\ud83d\udce8 Response headers:",Object.fromEntries(t.headers.entries())),!t.ok){const e=await t.text();return console.error("\u274c Failed to save store info to database. Status:",t.status,"Error:",e),console.error("\u274c Full error response:",e),me({type:"error",message:`Failed to save settings to database (${t.status}: ${t.statusText})`}),void setTimeout(()=>{me(null)},8e3)}const i=await t.json();console.log("\u2705 Database save successful:",i),console.log("\ud83d\udd04 Updating StoreContext with new operation settings"),oe({store:Se,operations:{...Pe,currency:Ie.currency,cashRounding:Ie.cashRounding||.05,roundingApplyTo:Ie.roundingApplyTo}}),console.log("\ud83d\udd04 Reloading settings from DB to verify...");const o=await fetch(`/api/restaurants/${ie.restaurantId}`);if(o.ok){const e=await o.json(),n=e.data||e;n.payment_settings?(console.log("\u2705 Verified payment settings from DB:",JSON.stringify(n.payment_settings).substring(0,200)),be(n.payment_settings)):console.log("\u26a0\ufe0f  Payment settings not found in DB after save!"),console.log("\u2705 Verified currency settings from DB:",{currency:n.currency,cash_rounding:n.cash_rounding,rounding_apply_to:n.rounding_apply_to}),De({currency:n.currency||"RM",cashRounding:null!==n.cash_rounding&&void 0!==n.cash_rounding?parseFloat(n.cash_rounding):null,roundingApplyTo:n.rounding_apply_to||"cash_only"})}}else console.log("\u26a0\ufe0f  No restaurantId found, skipping database save");he(!1),me(null),console.log("\u2705 Save completed successfully")}catch(e){console.error("\u274c Error saving settings:",e),me({type:"error",message:"Failed to save settings"}),setTimeout(()=>{me(null)},8e3)}};return(0,b.jsx)(b.Fragment,{children:(0,b.jsxs)(j,{children:[(0,b.jsx)(h.Ay,{title:"Store Settings"}),(0,b.jsxs)(C,{children:[(0,b.jsx)(a.j,{children:["Foodcourt General","Brand General","Foodcourt Manager","Brand Manager"].includes((null===ie||void 0===ie?void 0:ie.role)||"")?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(a.oz,{active:"company"===pe,onClick:()=>ge("company"),children:"Company Info"}),(0,b.jsx)(a.oz,{active:"brands"===pe,onClick:()=>ge("brands"),children:"Brand Management"}),(0,b.jsx)(a.oz,{active:"billing"===pe,onClick:()=>ge("billing"),children:"Billing & Subscriptions"})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(a.oz,{active:"store"===pe,onClick:()=>ge("store"),children:"Store Info"}),(0,b.jsx)(a.oz,{active:"operations"===pe,onClick:()=>ge("operations"),children:"Operations"}),(0,b.jsx)(a.oz,{active:"payment"===pe,onClick:()=>ge("payment"),children:"Payment Methods"}),(0,b.jsx)(a.oz,{active:"printer"===pe,onClick:()=>ge("printer"),children:"Printer"}),(0,b.jsx)(a.oz,{active:"managers"===pe,onClick:()=>ge("managers"),children:"Managers"}),(0,b.jsx)(a.oz,{active:"membership"===pe,onClick:()=>ge("membership"),children:"Membership"})]})}),"payment"===pe&&(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Payment Methods"}),(0,b.jsx)("p",{style:{color:"#6B7C93",marginBottom:"24px",fontSize:"14px"},children:"Configure payment methods for POS Terminal and Mobile Order"}),ye?je.map((e,n)=>{var r,t,i,o,s,l,d,c;const p=ye[e];return p&&"_order"!==e?(0,b.jsxs)($,{children:[(0,b.jsx)("div",{style:{marginBottom:p.enabled?"16px":"0"},children:(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:p.enabled?"16px":"0",flexWrap:"wrap",gap:"8px"},children:[(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,b.jsx)(a.Xd,{onMoveUp:()=>sn(e,"up"),onMoveDown:()=>sn(e,"down"),disableUp:0===n,disableDown:n===je.length-1}),(0,b.jsx)(T,{children:p.label})]}),(0,b.jsxs)("div",{style:{display:"flex",gap:"16px",alignItems:"center"},children:[!["counter","online"].includes(e)&&(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,b.jsx)("span",{style:{fontSize:"13px",fontWeight:"500",color:null!==(r=p.availableIn)&&void 0!==r&&r.includes("pos")?"#0A2540":"#6B7C93",whiteSpace:"nowrap"},children:"POS"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:(null===(t=p.availableIn)||void 0===t?void 0:t.includes("pos"))||!1,onChange:n=>tn(e,"pos",n.target.checked)}),(0,b.jsx)(E,{})]})]}),!["cash","card","staffMeal"].includes(e)&&(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,b.jsx)("span",{style:{fontSize:"13px",fontWeight:"500",color:null!==(i=p.availableIn)&&void 0!==i&&i.includes("mobile")?"#0A2540":"#6B7C93",whiteSpace:"nowrap"},children:"Mobile"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:(null===(o=p.availableIn)||void 0===o?void 0:o.includes("mobile"))||!1,onChange:n=>tn(e,"mobile",n.target.checked)}),(0,b.jsx)(E,{})]})]})]})]})}),"ewallet"===e&&p.enabled&&(0,b.jsx)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:(0,b.jsx)(g.A,{value:p.qrImage||"",onChange:n=>on(e,"qrImage",n),label:"E-Wallet QR Code",helpText:"Upload your e-wallet QR code image for customers to scan and make payment (TNG, GrabPay, Boost, etc.)",changeButtonText:"Change QR Code",removeButtonText:"Remove QR Code",imageAltText:"E-Wallet QR Code"})}),"bankTransfer"===e&&p.enabled&&(0,b.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Bank Name"}),(0,b.jsx)(S,{type:"text",placeholder:"e.g., Maybank, CIMB, Public Bank",value:p.bankName||"",onChange:n=>on(e,"bankName",n.target.value)})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Account Number"}),(0,b.jsx)(S,{type:"text",placeholder:"Enter Bank Account Number",value:p.accountNumber||"",onChange:n=>on(e,"accountNumber",n.target.value)})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Account Name"}),(0,b.jsx)(S,{type:"text",placeholder:"Enter Account Holder Name",value:p.accountName||"",onChange:n=>on(e,"accountName",n.target.value)})]})]}),"staffMeal"===e&&p.enabled&&(0,b.jsx)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:(0,b.jsx)("div",{style:{fontSize:"13px",color:"#6B7C93",lineHeight:"1.5"},children:"Staff meals are recorded at full price but excluded from revenue reports. Use this in POS when processing staff meals to keep accurate records."})}),"online"===e&&p.enabled&&(0,b.jsxs)("div",{style:{borderTop:"1px solid #E6EBF1",paddingTop:"16px"},children:[(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Payment Provider"}),(0,b.jsxs)(A,{value:p.provider||"stripe",onChange:n=>on(e,"provider",n.target.value),children:[(0,b.jsx)("option",{value:"stripe",children:"Stripe"}),(0,b.jsx)("option",{value:"paypal",children:"PayPal"}),(0,b.jsx)("option",{value:"both",children:"Both Stripe & PayPal"})]})]}),("stripe"===p.provider||"both"===p.provider)&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Stripe Public Key"}),(0,b.jsx)(S,{type:"text",placeholder:"pk_live_...",value:(null===(s=p.config)||void 0===s?void 0:s.stripePublicKey)||"",onChange:n=>an(e,"stripePublicKey",n.target.value)})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Stripe Secret Key"}),(0,b.jsx)(S,{type:"password",placeholder:"sk_live_...",value:(null===(l=p.config)||void 0===l?void 0:l.stripeSecretKey)||"",onChange:n=>an(e,"stripeSecretKey",n.target.value)})]})]}),("paypal"===p.provider||"both"===p.provider)&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"PayPal Client ID"}),(0,b.jsx)(S,{type:"text",placeholder:"Enter PayPal Client ID",value:(null===(d=p.config)||void 0===d?void 0:d.paypalClientId)||"",onChange:n=>an(e,"paypalClientId",n.target.value)})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"PayPal Client Secret"}),(0,b.jsx)(S,{type:"password",placeholder:"Enter PayPal Client Secret",value:(null===(c=p.config)||void 0===c?void 0:c.paypalClientSecret)||"",onChange:n=>an(e,"paypalClientSecret",n.target.value)})]})]})]})]},e):null}):(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"Loading payment settings..."}),ye&&(0,b.jsxs)(M,{children:[(0,b.jsx)(v,{onClick:ln,disabled:!xe,children:xe?"Save Changes":"Saved"}),ue&&(0,b.jsx)(N,{type:ue.type,children:ue.message})]})]}),"company"===pe&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(w,{children:[(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Company Information"}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Company Name"}),(0,b.jsx)(S,{type:"text",value:Ne.name,onChange:e=>{Me(n=>({...n,name:e.target.value})),he(!0)},placeholder:"Food Court Management Corp"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Business Registration"}),(0,b.jsx)(S,{type:"text",value:Ne.businessRegistration,onChange:e=>{Me(n=>({...n,businessRegistration:e.target.value})),he(!0)},placeholder:"202301234567"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Tax ID"}),(0,b.jsx)(S,{type:"text",value:Ne.taxId,onChange:e=>{Me(n=>({...n,taxId:e.target.value})),he(!0)},placeholder:"90-1234567"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Industry"}),(0,b.jsx)(S,{type:"text",value:Ne.industry,onChange:e=>{Me(n=>({...n,industry:e.target.value})),he(!0)},placeholder:"Food Service Management"})]}),(0,b.jsx)(g.A,{value:Ne.logo,onChange:e=>{Me(n=>({...n,logo:e})),he(!0)},label:"Company Logo",helpText:"Upload your company logo for branding and official documents",changeButtonText:"Change Logo",removeButtonText:"Remove Logo",imageAltText:"Company Logo"})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Contact Information"}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Phone Number"}),(0,b.jsx)(S,{type:"text",value:Ne.phone,onChange:e=>{Me(n=>({...n,phone:e.target.value})),he(!0)},placeholder:"+60 3-2123-4567"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Email Address"}),(0,b.jsx)(S,{type:"email",value:Ne.email,onChange:e=>{Me(n=>({...n,email:e.target.value})),he(!0)},placeholder:"admin@foodcourtmanagement.com"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Website"}),(0,b.jsx)(S,{type:"url",value:Ne.website,onChange:e=>{Me(n=>({...n,website:e.target.value})),he(!0)},placeholder:"www.foodcourtmanagement.com"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Address"}),(0,b.jsx)(S,{type:"text",value:Ne.address,onChange:e=>{Me(n=>({...n,address:e.target.value})),he(!0)},placeholder:"123 Business District"})]})]})]}),(0,b.jsxs)(M,{children:[(0,b.jsx)(v,{onClick:ln,disabled:!xe,children:xe?"Save Changes":"Saved"}),ue&&(0,b.jsx)(N,{type:ue.type,children:ue.message})]})]}),"brands"===pe&&(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{style:{marginBottom:"24px"},children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[(0,b.jsx)("h3",{style:{margin:0,fontSize:"18px",fontWeight:"600",color:"#0A2540"},children:"Brand Management"}),(0,b.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[!de&&"Restaurant Admin"===(null===ie||void 0===ie?void 0:ie.role)&&(0,b.jsx)(p.cc,{variant:"outline",size:"small",onClick:le,children:"Reset Theme"}),"Restaurant Admin"===(null===ie||void 0===ie?void 0:ie.role)?(0,b.jsx)(p.cc,{onClick:()=>alert("Add Brand functionality coming soon"),children:"Add Brand"}):(0,b.jsx)(f,{onClick:()=>alert("Add Brand functionality coming soon"),children:"Add Brand"})]})]}),!de&&"Restaurant Admin"===(null===ie||void 0===ie?void 0:ie.role)&&(0,b.jsx)("div",{style:{background:"rgba(196, 181, 253, 0.2)",border:"1px solid var(--brand-primary, #8B5CF6)",borderRadius:"8px",padding:"12px 16px",fontSize:"14px",color:"var(--brand-primary, #8B5CF6)"},children:"\ud83c\udfa8 Theme preview is active. Changes will apply to restaurant management pages."})]}),$e.brands.map(e=>(0,b.jsxs)(k,{style:{marginBottom:"24px"},children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,b.jsx)(_,{children:e.name}),(0,b.jsx)("span",{style:{padding:"4px 8px",borderRadius:"4px",fontSize:"12px",fontWeight:"500",background:e.isActive?"#ECFDF5":"#FEF2F2",color:e.isActive?"#059669":"#DC2626"},children:e.isActive?"Active":"Inactive"}),(0,b.jsxs)("span",{style:{padding:"4px 8px",borderRadius:"4px",fontSize:"12px",fontWeight:"500",background:"#F3F4F6",color:"#6B7280"},children:[e.restaurantCount," Restaurant",1!==e.restaurantCount?"s":""]})]}),(0,b.jsx)("div",{style:{display:"flex",gap:"8px"},children:"Restaurant Admin"===(null===ie||void 0===ie?void 0:ie.role)?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(p.cc,{variant:"outline",size:"small",onClick:()=>se({primaryColor:e.primaryColor,secondaryColor:e.secondaryColor,accentColor:e.accentColor,logo:e.logo}),children:"Preview Theme"}),(0,b.jsx)(p.cc,{size:"small",children:"Edit"})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(f,{onClick:()=>se({primaryColor:e.primaryColor,secondaryColor:e.secondaryColor,accentColor:e.accentColor,logo:e.logo}),children:"Preview Theme"}),(0,b.jsx)(f,{children:"Edit"})]})})]}),(0,b.jsx)("p",{style:{color:"#6B7280",marginBottom:"20px",fontSize:"14px"},children:e.description}),(0,b.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px",marginBottom:"20px"},children:[(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Primary Color"}),(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,b.jsx)("input",{type:"color",value:e.primaryColor,style:{width:"40px",height:"40px",border:"none",borderRadius:"8px",cursor:"pointer"},onChange:n=>{const r=$e.brands.map(r=>r.id===e.id?{...r,primaryColor:n.target.value}:r);Oe({brands:r}),he(!0)}}),(0,b.jsx)(S,{value:e.primaryColor,style:{width:"100px"},readOnly:!0})]})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Secondary Color"}),(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,b.jsx)("input",{type:"color",value:e.secondaryColor,style:{width:"40px",height:"40px",border:"none",borderRadius:"8px",cursor:"pointer"},onChange:n=>{const r=$e.brands.map(r=>r.id===e.id?{...r,secondaryColor:n.target.value}:r);Oe({brands:r}),he(!0)}}),(0,b.jsx)(S,{value:e.secondaryColor,style:{width:"100px"},readOnly:!0})]})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Accent Color"}),(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,b.jsx)("input",{type:"color",value:e.accentColor,style:{width:"40px",height:"40px",border:"none",borderRadius:"8px",cursor:"pointer"},onChange:n=>{const r=$e.brands.map(r=>r.id===e.id?{...r,accentColor:n.target.value}:r);Oe({brands:r}),he(!0)}}),(0,b.jsx)(S,{value:e.accentColor,style:{width:"100px"},readOnly:!0})]})]})]}),(0,b.jsx)(g.A,{value:e.logo,onChange:n=>{const r=$e.brands.map(r=>r.id===e.id?{...r,logo:n}:r);Oe({brands:r}),he(!0)},label:"Brand Logo",helpText:`Upload logo for ${e.name} brand`,changeButtonText:"Change Brand Logo",removeButtonText:"Remove Brand Logo",imageAltText:"Brand Logo"}),(0,b.jsxs)("div",{children:[(0,b.jsxs)(B,{children:["Connected Restaurants (",e.restaurants.length,")"]}),(0,b.jsx)("div",{style:{background:"#F8FAFC",borderRadius:"8px",padding:"16px"},children:e.restaurants.length>0?(0,b.jsx)("div",{style:{display:"grid",gap:"8px"},children:e.restaurants.map(n=>(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",background:"white",borderRadius:"6px",border:`2px solid ${e.primaryColor}20`},children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{style:{fontWeight:"600",fontSize:"14px",color:"#0A2540"},children:n.name}),(0,b.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280"},children:[n.branchName," \u2022 ",n.location]})]}),(0,b.jsx)("div",{style:{width:"12px",height:"12px",borderRadius:"50%",background:e.primaryColor}})]},n.id))}):(0,b.jsx)("p",{style:{color:"#6B7280",textAlign:"center",margin:"20px 0"},children:"No restaurants connected to this brand"})})]})]},e.id)),(0,b.jsxs)(M,{children:[(0,b.jsx)(v,{onClick:ln,disabled:!xe,children:xe?"Save Changes":"Saved"}),ue&&(0,b.jsx)(N,{type:ue.type,children:ue.message})]})]}),"billing"===pe&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(w,{children:[(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Subscription Overview"}),(0,b.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[(0,b.jsx)("span",{style:{fontWeight:"500"},children:"Current Plan"}),(0,b.jsx)("span",{style:{padding:"4px 12px",background:"#ECFDF5",color:"#059669",borderRadius:"6px",fontSize:"14px",fontWeight:"600"},children:"Enterprise"})]}),(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[(0,b.jsx)("span",{style:{color:"#6B7280"},children:"Monthly Fee"}),(0,b.jsx)("span",{style:{fontWeight:"600"},children:"RM 299.00"})]}),(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"},children:[(0,b.jsx)("span",{style:{color:"#6B7280"},children:"Next Billing Date"}),(0,b.jsx)("span",{children:"January 15, 2025"})]}),(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,b.jsx)("span",{style:{color:"#6B7280"},children:"Active Restaurants"}),(0,b.jsx)("span",{children:"12 / 15"})]})]}),(0,b.jsx)(f,{onClick:()=>alert("Billing management functionality coming soon"),children:"Manage Billing"})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Usage Statistics"}),(0,b.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"},children:[(0,b.jsx)("span",{style:{color:"#6B7280"},children:"Total Orders (This Month)"}),(0,b.jsx)("span",{style:{fontWeight:"600",fontSize:"18px"},children:"8,945"})]}),(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"},children:[(0,b.jsx)("span",{style:{color:"#6B7280"},children:"Total Revenue (This Month)"}),(0,b.jsx)("span",{style:{fontWeight:"600",fontSize:"18px"},children:"RM 145,230"})]}),(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"},children:[(0,b.jsx)("span",{style:{color:"#6B7280"},children:"Active Staff Members"}),(0,b.jsx)("span",{style:{fontWeight:"600"},children:"87"})]}),(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,b.jsx)("span",{style:{color:"#6B7280"},children:"Storage Used"}),(0,b.jsx)("span",{style:{fontWeight:"600"},children:"2.4 GB / 10 GB"})]})]})]})]}),(0,b.jsxs)(M,{children:[(0,b.jsx)(v,{onClick:ln,disabled:!xe,children:xe?"Save Changes":"Saved"}),ue&&(0,b.jsx)(N,{type:ue.type,children:ue.message})]})]}),"store"===pe&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(w,{children:[(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Basic Information"}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Store Name"}),(0,b.jsx)(S,{type:"text",value:Se.name,onChange:e=>{Ae(n=>({...n,name:e.target.value})),he(!0)},placeholder:"FOODCOURT CENTRAL"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Business Registration"}),(0,b.jsx)(S,{type:"text",value:Se.businessRegistration,onChange:e=>{Ae(n=>({...n,businessRegistration:e.target.value})),he(!0)},placeholder:"123456789"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Tax No"}),(0,b.jsx)(S,{type:"text",value:Se.gstRegNo,onChange:e=>{Ae(n=>({...n,gstRegNo:e.target.value})),he(!0)},placeholder:"Enter tax registration number (optional)"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Phone Number"}),(0,b.jsx)(x.A,{value:Se.phone,onChange:e=>{Ae(n=>({...n,phone:e})),he(!0)},defaultCountry:Se.country})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Email"}),(0,b.jsx)(S,{type:"email",value:Se.email,onChange:e=>{Ae(n=>({...n,email:e.target.value})),he(!0)},placeholder:"contact@foodcourt.com"})]}),(0,b.jsx)(g.A,{value:Se.logo,onChange:e=>{Ae(n=>({...n,logo:e})),he(!0)},label:"Brand Logo",helpText:"Upload your restaurant's brand logo for use in mobile orders and customer displays",changeButtonText:"Change Logo",removeButtonText:"Remove Logo",imageAltText:"Brand Logo"})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Location"}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Address"}),(0,b.jsx)(S,{type:"text",value:Se.address,onChange:e=>{Ae(n=>({...n,address:e.target.value})),he(!0)},placeholder:"123 Main Street, City Center"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"City"}),(0,b.jsx)(S,{type:"text",value:Se.city,onChange:e=>{Ae(n=>({...n,city:e.target.value})),he(!0)},placeholder:"Kuala Lumpur"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"State"}),(0,b.jsx)(S,{type:"text",value:Se.state,onChange:e=>{Ae(n=>({...n,state:e.target.value})),he(!0)},placeholder:"Wilayah Persekutuan"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Postal Code"}),(0,b.jsx)(S,{type:"text",value:Se.postalCode,onChange:e=>{Ae(n=>({...n,postalCode:e.target.value})),he(!0)},placeholder:"50000"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Country"}),(0,b.jsx)(A,{value:Se.country,onChange:e=>{const n=e.target.value;Ae(e=>({...e,country:n}));const r=Q.find(e=>e.code===n);r&&Te(e=>({...e,timeZone:r.timezone})),he(!0)},children:Q.map(e=>(0,b.jsx)("option",{value:e.code,children:e.name},e.code))})]})]})]}),ze.brand_id&&(0,b.jsxs)(k,{style:{marginTop:"24px"},children:[(0,b.jsx)(_,{children:"Brand"}),(0,b.jsx)(F,{children:(0,b.jsx)("div",{style:{padding:"10px 12px",background:"#F6F9FC",borderRadius:"6px",fontSize:"14px",color:"#0A2540",border:"1px solid #E6EBF1"},children:ze.brand_name||"-"})})]}),(0,b.jsxs)(M,{children:[(0,b.jsx)(v,{onClick:ln,disabled:!xe,children:xe?"Save Changes":"Saved"}),ue&&(0,b.jsx)(N,{type:ue.type,children:ue.message})]})]}),"operations"===pe&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(w,{children:[(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Operating Hours"}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Opening Time"}),(0,b.jsx)(S,{type:"time",value:Pe.openingTime,onChange:e=>{Te(n=>({...n,openingTime:e.target.value})),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Closing Time"}),(0,b.jsx)(S,{type:"time",value:Pe.closingTime,onChange:e=>{Te(n=>({...n,closingTime:e.target.value})),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Time Zone"}),(0,b.jsxs)(A,{value:Pe.timeZone,onChange:e=>{Te(n=>({...n,timeZone:e.target.value})),he(!0)},children:[(0,b.jsx)("option",{value:"Asia/Kuala_Lumpur",children:"Asia/Kuala_Lumpur (GMT+8)"}),(0,b.jsx)("option",{value:"Asia/Singapore",children:"Asia/Singapore (GMT+8)"}),(0,b.jsx)("option",{value:"Asia/Jakarta",children:"Asia/Jakarta (GMT+7)"})]})]})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Order Types"}),(0,b.jsx)("p",{style:{color:"#6B7C93",marginBottom:"16px",fontSize:"14px"},children:"Enable or disable order types for mobile ordering"}),(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Dine In"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:null===(e=null===(n=Pe.orderTypes)||void 0===n?void 0:n.dineIn)||void 0===e||e,onChange:e=>{Te(n=>({...n,orderTypes:{...n.orderTypes,dineIn:e.target.checked}})),he(!0)}}),(0,b.jsx)(E,{})]})]}),(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Takeaway"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:null===(r=null===(i=Pe.orderTypes)||void 0===i?void 0:i.takeaway)||void 0===r||r,onChange:e=>{Te(n=>({...n,orderTypes:{...n.orderTypes,takeaway:e.target.checked}})),he(!0)}}),(0,b.jsx)(E,{})]})]}),(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Pre-order Pickup"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:null!==(H=null===(V=Pe.orderTypes)||void 0===V?void 0:V.pickup)&&void 0!==H&&H,onChange:e=>{Te(n=>({...n,orderTypes:{...n.orderTypes,pickup:e.target.checked}})),he(!0)}}),(0,b.jsx)(E,{})]})]}),(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Delivery"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:null!==(Y=null===(Z=Pe.orderTypes)||void 0===Z?void 0:Z.delivery)&&void 0!==Y&&Y,onChange:e=>{Te(n=>({...n,orderTypes:{...n.orderTypes,delivery:e.target.checked}})),he(!0)}}),(0,b.jsx)(E,{})]})]})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Break Times"}),(0,b.jsx)("p",{style:{color:"#6B7C93",marginBottom:"16px",fontSize:"14px"},children:"Set break times when orders cannot be picked up"}),(Pe.breakTimes||[]).map((e,n)=>(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px",padding:"12px",background:"#F8FAFC",borderRadius:"8px"},children:[(0,b.jsx)(S,{type:"time",value:e.start,onChange:e=>{const r=[...Pe.breakTimes];r[n]={...r[n],start:e.target.value},Te(e=>({...e,breakTimes:r})),he(!0)},style:{flex:1}}),(0,b.jsx)("span",{style:{color:"#6B7C93"},children:"to"}),(0,b.jsx)(S,{type:"time",value:e.end,onChange:e=>{const r=[...Pe.breakTimes];r[n]={...r[n],end:e.target.value},Te(e=>({...e,breakTimes:r})),he(!0)},style:{flex:1}}),(0,b.jsx)("button",{onClick:()=>{const e=Pe.breakTimes.filter((e,r)=>r!==n);Te(n=>({...n,breakTimes:e})),he(!0)},style:{padding:"8px 12px",background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"14px"},children:"Delete"})]},e.id)),(0,b.jsx)("button",{onClick:()=>{const e={id:Date.now().toString(),start:"14:00",end:"15:00"};Te(n=>({...n,breakTimes:[...n.breakTimes||[],e]})),he(!0)},style:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 16px",background:"white",color:"#635BFF",border:"1px dashed #635BFF",borderRadius:"8px",cursor:"pointer",fontSize:"14px",width:"100%",justifyContent:"center"},children:"Add Break Time"})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Order Settings"}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Order Number Reset"}),(0,b.jsxs)(A,{value:Pe.orderNumberReset,onChange:e=>{Te(n=>({...n,orderNumberReset:e.target.value})),he(!0)},children:[(0,b.jsx)("option",{value:"daily",children:"Daily"}),(0,b.jsx)("option",{value:"weekly",children:"Weekly"}),(0,b.jsx)("option",{value:"monthly",children:"Monthly"}),(0,b.jsx)("option",{value:"never",children:"Never"})]})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Default Preparation Time"}),(0,b.jsx)(O,{type:"number",value:Pe.defaultPreparationTime,onChange:e=>{Te(n=>({...n,defaultPreparationTime:Number(e.target.value)})),he(!0)}}),(0,b.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:"minutes"})]})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Tax Settings"}),(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Enable Tax"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:Pe.taxEnabled,onChange:e=>{Te(n=>({...n,taxEnabled:e.target.checked})),he(!0)}}),(0,b.jsx)(E,{})]})]}),Pe.taxEnabled&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(I,{}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Tax Rate (%)"}),(0,b.jsx)(O,{type:"number",step:"0.01",min:"0",max:"100",value:Pe.taxRate,onChange:e=>{Te(n=>({...n,taxRate:Number(e.target.value)})),he(!0)}}),(0,b.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:"%"})]})]})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Service Charge Settings"}),(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Enable Service Charge"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:Pe.serviceChargeEnabled,onChange:e=>{Te(n=>({...n,serviceChargeEnabled:e.target.checked})),he(!0)}}),(0,b.jsx)(E,{})]})]}),Pe.serviceChargeEnabled&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(I,{}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Service Charge Rate (%)"}),(0,b.jsx)(O,{type:"number",step:"0.01",min:"0",max:"100",value:Pe.serviceChargeRate,onChange:e=>{Te(n=>({...n,serviceChargeRate:Number(e.target.value)})),he(!0)}}),(0,b.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:"%"})]})]})]}),(0,b.jsxs)(k,{style:{gridColumn:"1 / -1"},children:[(0,b.jsx)(_,{children:"Currency & Rounding Settings"}),(0,b.jsx)("p",{style:{color:"#6B7C93",marginBottom:"24px",fontSize:"14px"},children:"Configure currency and cash rounding for payments"}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Currency"}),(0,b.jsx)(A,{value:Ie.currency,onChange:e=>{De(n=>({...n,currency:e.target.value})),he(!0)},children:(()=>{const e={MYR:"Malaysian Ringgit (RM)",RM:"Malaysian Ringgit (RM)",USD:"US Dollar ($)",SGD:"Singapore Dollar (S$)",JPY:"Japanese Yen (\xa5)",THB:"Thai Baht (\u0e3f)",KRW:"Korean Won (\u20a9)",EUR:"Euro (\u20ac)",GBP:"British Pound (\xa3)",AUD:"Australian Dollar (A$)",CNY:"Chinese Yuan (\xa5)",INR:"Indian Rupee (\u20b9)",PHP:"Philippine Peso (\u20b1)",VND:"Vietnamese Dong (\u20ab)",IDR:"Indonesian Rupiah (Rp)",TWD:"Taiwan Dollar (NT$)",HKD:"Hong Kong Dollar (HK$)"},n=nn.length>0?nn:Object.keys(e),r=new Set;return n.map(n=>{const t="MYR"===n?"RM":n;return r.has(t)?null:(r.add(t),(0,b.jsx)("option",{value:t,children:e[n]||n},t))})})()})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Cash Rounding"}),(0,b.jsxs)(A,{value:null!==Ie.cashRounding?Ie.cashRounding.toFixed(2):"",onChange:e=>{const n=e.target.value?parseFloat(e.target.value):null;De(e=>({...e,cashRounding:n})),he(!0)},children:[(0,b.jsx)("option",{value:"",children:"Disabled (No Rounding)"}),(0,b.jsx)("option",{value:"0.05",children:"0.05 (5 sen/cent)"}),(0,b.jsx)("option",{value:"0.10",children:"0.10 (10 sen/cent)"}),(0,b.jsx)("option",{value:"0.50",children:"0.50 (50 sen/cent)"}),(0,b.jsx)("option",{value:"1.00",children:"1.00 (1 dollar/ringgit)"})]}),(0,b.jsx)(D,{children:"Round total amount to nearest value (e.g., RM 12.52 \u2192 RM 12.50 with 0.05 rounding)"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Apply Rounding To"}),(0,b.jsxs)(A,{value:Ie.roundingApplyTo,onChange:e=>{De(n=>({...n,roundingApplyTo:e.target.value})),he(!0)},disabled:!Ie.cashRounding,children:[(0,b.jsx)("option",{value:"cash_only",children:"Cash Payments Only"}),(0,b.jsx)("option",{value:"all",children:"All Payments"})]}),(0,b.jsx)(D,{children:"Choose whether to apply rounding to cash only or all payment methods"})]})]}),(0,b.jsxs)(k,{style:{gridColumn:"1 / -1"},children:[(0,b.jsx)(_,{children:"Takeaway Pricing Settings"}),(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Enable Takeaway Charges"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:Pe.takeawayPricing.enabled,onChange:e=>{Te(n=>({...n,takeawayPricing:{...n.takeawayPricing,enabled:e.target.checked}})),he(!0)}}),(0,b.jsx)(E,{})]})]}),Pe.takeawayPricing.enabled&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(I,{}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Pricing Type"}),(0,b.jsxs)(A,{value:Pe.takeawayPricing.pricingType,onChange:e=>{Te(n=>({...n,takeawayPricing:{...n.takeawayPricing,pricingType:e.target.value}})),he(!0)},children:[(0,b.jsx)("option",{value:"per-item",children:"Per Item (Fixed charge per item)"}),(0,b.jsx)("option",{value:"per-category",children:"Per Category (Different charges by category)"})]})]}),"per-item"===Pe.takeawayPricing.pricingType?(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Charge Per Item"}),(0,b.jsx)(O,{type:"number",step:"0.10",value:Pe.takeawayPricing.perItemCharge,onChange:e=>{Te(n=>({...n,takeawayPricing:{...n.takeawayPricing,perItemCharge:Number(e.target.value)}})),he(!0)}}),(0,b.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:(0,y.Qn)(Ie.currency)}),(0,b.jsx)(D,{children:"This amount will be added to each item for takeaway orders"})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(B,{style:{marginBottom:"16px"},children:"Category Charges"}),(0,b.jsx)(w,{children:ae.map(e=>(0,b.jsxs)(F,{children:[(0,b.jsxs)(B,{children:[e.emoji," ",e.name]}),(0,b.jsx)(O,{type:"number",step:"0.10",value:Pe.takeawayPricing.categoryCharges[e.id.toLowerCase()]||0,onChange:n=>{Te(r=>({...r,takeawayPricing:{...r.takeawayPricing,categoryCharges:{...r.takeawayPricing.categoryCharges,[e.id.toLowerCase()]:Number(n.target.value)}}})),he(!0)}}),(0,b.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:(0,y.Qn)(Ie.currency)})]},e.id))}),(0,b.jsx)(D,{children:"These amounts will be added to items based on their category for takeaway orders"})]})]})]}),(0,b.jsxs)(k,{style:{gridColumn:"1 / -1"},children:[(0,b.jsx)(_,{children:"Delivery Pricing Settings"}),(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Enable Delivery Service"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:(null===(X=Pe.deliveryPricing)||void 0===X?void 0:X.enabled)||!1,onChange:e=>{Te(n=>({...n,deliveryPricing:{...n.deliveryPricing,enabled:e.target.checked}})),he(!0)}}),(0,b.jsx)(E,{})]})]}),(null===(ee=Pe.deliveryPricing)||void 0===ee?void 0:ee.enabled)&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(I,{}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Minimum Order Amount"}),(0,b.jsx)(O,{type:"number",step:"1.00",value:Pe.deliveryPricing.minimumOrder,onChange:e=>{Te(n=>({...n,deliveryPricing:{...n.deliveryPricing,minimumOrder:Number(e.target.value)}})),he(!0)}}),(0,b.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:(0,y.Qn)(Ie.currency)}),(0,b.jsx)(D,{children:"Minimum subtotal required for delivery orders (0 = no minimum)"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Free Delivery Above"}),(0,b.jsx)(O,{type:"number",step:"1.00",value:Pe.deliveryPricing.freeAbove,onChange:e=>{Te(n=>({...n,deliveryPricing:{...n.deliveryPricing,freeAbove:Number(e.target.value)}})),he(!0)}}),(0,b.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:(0,y.Qn)(Ie.currency)}),(0,b.jsx)(D,{children:"Waive delivery fee if order subtotal exceeds this amount (999999 = never free)"})]}),(0,b.jsx)(I,{}),(0,b.jsx)(B,{style:{marginBottom:"16px"},children:"Delivery Zones"}),(0,b.jsx)(D,{style:{marginBottom:"16px"},children:"Configure delivery zones and their corresponding fees"}),(Pe.deliveryPricing.zones||[]).map((e,n)=>(0,b.jsxs)("div",{style:{background:"#FAFBFC",padding:"16px",borderRadius:"8px",marginBottom:"12px",border:"1px solid #E6EBF1"},children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"},children:[(0,b.jsxs)(B,{style:{margin:0},children:["Zone ",n+1]}),(0,b.jsx)("button",{onClick:()=>{const e=[...Pe.deliveryPricing.zones||[]];e.splice(n,1),Te(n=>({...n,deliveryPricing:{...n.deliveryPricing,zones:e}})),he(!0)},style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontSize:"14px",padding:"4px 8px"},children:"Remove"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Zone Name"}),(0,b.jsx)(S,{type:"text",placeholder:"e.g., Zone A (City Center)",value:e.name,onChange:e=>{const r=[...Pe.deliveryPricing.zones||[]];r[n]={...r[n],name:e.target.value},Te(e=>({...e,deliveryPricing:{...e.deliveryPricing,zones:r}})),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Description"}),(0,b.jsx)(S,{type:"text",placeholder:"e.g., 3km radius",value:e.description,onChange:e=>{const r=[...Pe.deliveryPricing.zones||[]];r[n]={...r[n],description:e.target.value},Te(e=>({...e,deliveryPricing:{...e.deliveryPricing,zones:r}})),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Delivery Fee"}),(0,b.jsx)(O,{type:"number",step:"0.50",value:e.fee,onChange:e=>{const r=[...Pe.deliveryPricing.zones||[]];r[n]={...r[n],fee:Number(e.target.value)},Te(e=>({...e,deliveryPricing:{...e.deliveryPricing,zones:r}})),he(!0)}}),(0,b.jsx)("span",{style:{color:"#6B7C93",fontSize:"14px"},children:(0,y.Qn)(Ie.currency)})]})]},n)),(0,b.jsx)("button",{onClick:()=>{const e=[...Pe.deliveryPricing.zones||[]];e.push({id:`zone-${Date.now()}`,name:"",description:"",fee:0}),Te(n=>({...n,deliveryPricing:{...n.deliveryPricing,zones:e}})),he(!0)},style:{width:"100%",padding:"12px",background:"#F0F4FF",border:"1px dashed #635BFF",borderRadius:"8px",color:"#635BFF",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.2s"},children:"Add Delivery Zone"})]})]}),(0,b.jsxs)(k,{style:{gridColumn:"1 / -1"},children:[(0,b.jsx)(_,{children:"Pager System Settings"}),(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Enable Pager System"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:(null===Pe||void 0===Pe||null===(ne=Pe.pagerSystem)||void 0===ne?void 0:ne.enabled)||!1,onChange:e=>{Te(n=>{var r;return{...n,pagerSystem:{enabled:e.target.checked,totalPagers:(null===n||void 0===n||null===(r=n.pagerSystem)||void 0===r?void 0:r.totalPagers)||50}}}),he(!0)}}),(0,b.jsx)(E,{})]})]}),(null===Pe||void 0===Pe||null===(re=Pe.pagerSystem)||void 0===re?void 0:re.enabled)&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(I,{}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Total Number of Pagers"}),(0,b.jsx)(S,{type:"number",min:"1",max:"999",value:(null===Pe||void 0===Pe||null===(te=Pe.pagerSystem)||void 0===te?void 0:te.totalPagers)||50,onChange:e=>{Te(n=>{var r;return{...n,pagerSystem:{enabled:(null===n||void 0===n||null===(r=n.pagerSystem)||void 0===r?void 0:r.enabled)||!1,totalPagers:Number(e.target.value)}}}),he(!0)}})]}),(0,b.jsx)(D,{children:"Set the total number of pager devices available in your restaurant. The POS Terminal will allow staff to assign pager numbers to orders."})]})]}),(0,b.jsxs)(k,{style:{gridColumn:"1 / -1"},children:[(0,b.jsx)(_,{children:"Table Management"}),(0,b.jsx)("p",{style:{color:"#6B7C93",marginBottom:"20px",fontSize:"14px"},children:"Configure table numbers, QR codes, and customer seating options for your restaurant."}),(0,b.jsxs)(w,{children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)(F,{children:[(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Enable Table Numbers"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:We.enableTableNumbers,onChange:e=>{qe({...We,enableTableNumbers:e.target.checked}),he(!0)}}),(0,b.jsx)(E,{})]})]}),(0,b.jsx)(D,{children:"Allow customers to select table numbers when ordering"})]}),(0,b.jsxs)(F,{children:[(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Table Number Required"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:We.tableNumberRequired,onChange:e=>{qe({...We,tableNumberRequired:e.target.checked}),he(!0)},disabled:!We.enableTableNumbers}),(0,b.jsx)(E,{})]})]}),(0,b.jsx)(D,{children:"Make table number selection mandatory for dine-in orders"})]})]}),(0,b.jsxs)("div",{children:[(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Table Prefix"}),(0,b.jsx)(S,{type:"text",value:We.tablePrefix,onChange:e=>{qe({...We,tablePrefix:e.target.value}),he(!0)},placeholder:"e.g., T, TABLE"}),(0,b.jsx)(D,{children:"Prefix for table numbers (e.g., T001, TABLE001)"})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Number of Tables"}),(0,b.jsx)(S,{type:"number",value:We.totalTables,onChange:e=>{qe({...We,totalTables:parseInt(e.target.value)||1}),he(!0)},min:"1",max:"999"})]})]})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"QR Code Base URL"}),(0,b.jsx)(S,{type:"text",value:We.qrCodeBaseUrl,onChange:e=>{qe({...We,qrCodeBaseUrl:e.target.value}),he(!0)},placeholder:"https://yourdomain.com"}),(0,b.jsx)(D,{children:"Base URL for QR codes (usually your domain)"})]}),(0,b.jsx)("button",{onClick:()=>{if(!Le)return void console.error("Restaurant slug not available for QR code generation");const e=[];for(let n=1;n<=We.totalTables;n++){const r=`${We.tablePrefix}${String(n).padStart(3,"0")}`,t=`${We.qrCodeBaseUrl}/mobile/${Le}?table=${r}`;e.push({id:`table-${n}`,number:n,qrCode:t,isActive:!0})}Ke(e),he(!0)},style:{padding:"10px 20px",background:"#E6EBF1",color:"#0A2540",border:"none",borderRadius:"6px",fontSize:"14px",fontWeight:"500",cursor:"pointer",transition:"all 0.15s",marginTop:"16px"},onMouseEnter:e=>{e.currentTarget.style.background="#D1D5DB"},onMouseLeave:e=>{e.currentTarget.style.background="#E6EBF1"},children:"Generate QR Codes"}),(0,b.jsx)(I,{}),(0,b.jsxs)("div",{style:{marginTop:"24px"},children:[(0,b.jsx)("h4",{style:{fontSize:"16px",fontWeight:"600",color:"#0A2540",marginBottom:"16px"},children:"Table QR Codes"}),(0,b.jsx)(L,{children:Ge.map(e=>{const n=`${We.tablePrefix}${String(e.number).padStart(3,"0")}`;return(0,b.jsxs)(U,{children:[(0,b.jsx)(W,{children:n}),(0,b.jsxs)(q,{children:[(0,b.jsx)(o.X,{id:`qr-${e.id}`,value:e.qrCode,size:100,level:"H",includeMargin:!0,style:{display:"none"}}),(0,b.jsx)(o.h,{id:`qr-svg-${e.id}`,value:e.qrCode,size:100,level:"H",includeMargin:!0})]}),(0,b.jsxs)(G,{children:[(0,b.jsx)(K,{onClick:()=>(e=>{const n=`${We.tablePrefix}${String(e.number).padStart(3,"0")}`,r=Se.name||"Restaurant",t=document.getElementById(`qr-svg-${e.id}`);if(t){const e=t.cloneNode(!0),i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.setAttribute("xmlns","http://www.w3.org/2000/svg"),i.setAttribute("width","300"),i.setAttribute("height","350"),i.setAttribute("viewBox","0 0 300 350");const o=document.createElementNS("http://www.w3.org/2000/svg","rect");o.setAttribute("width","300"),o.setAttribute("height","350"),o.setAttribute("fill","white"),i.appendChild(o);const a=document.createElementNS("http://www.w3.org/2000/svg","text");a.setAttribute("x","150"),a.setAttribute("y","30"),a.setAttribute("text-anchor","middle"),a.setAttribute("font-family","Arial, sans-serif"),a.setAttribute("font-size","16"),a.setAttribute("font-weight","600"),a.setAttribute("fill","#0A2540"),a.textContent=r,i.appendChild(a);const s=document.createElementNS("http://www.w3.org/2000/svg","text");s.setAttribute("x","150"),s.setAttribute("y","60"),s.setAttribute("text-anchor","middle"),s.setAttribute("font-family","Arial, sans-serif"),s.setAttribute("font-size","28"),s.setAttribute("font-weight","bold"),s.setAttribute("fill","#0A2540"),s.textContent=n,i.appendChild(s);const l=document.createElementNS("http://www.w3.org/2000/svg","g");l.setAttribute("transform","translate(50, 80)"),e.setAttribute("width","200"),e.setAttribute("height","200"),l.appendChild(e),i.appendChild(l);const d=(new XMLSerializer).serializeToString(i),c=new Blob([d],{type:"image/svg+xml"}),p=URL.createObjectURL(c),g=document.createElement("a");g.download=`${n}-qr.svg`,g.href=p,g.click(),URL.revokeObjectURL(p)}})(e),title:"Download SVG (recommended for print)",children:"SVG"}),(0,b.jsx)(K,{onClick:()=>(e=>{const n=`${We.tablePrefix}${String(e.number).padStart(3,"0")}`,r=document.getElementById(`qr-${e.id}`);if(r){const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return;const i=20,o=50,a=r.width||100;e.width=a+2*i,e.height=a+2*i+o,t.fillStyle="white",t.fillRect(0,0,e.width,e.height),t.fillStyle="#0A2540",t.font="bold 28px Arial, sans-serif",t.textAlign="center",t.textBaseline="middle",t.fillText(n,e.width/2,i+o/2),t.drawImage(r,i,i+o);const s=e.toDataURL("image/png"),l=document.createElement("a");l.download=`${n}-qr.png`,l.href=s,l.click()}})(e),title:"Download PNG",children:"PNG"}),(0,b.jsx)(K,{onClick:()=>(e=>{const n=`${We.tablePrefix}${String(e.number).padStart(3,"0")}`,r=Se.name||"Restaurant",t=document.getElementById(`qr-svg-${e.id}`);if(t){const e=(new XMLSerializer).serializeToString(t),i=window.open("","_blank");i&&(i.document.write(`\n          <!DOCTYPE html>\n          <html>\n          <head>\n            <title>Print QR - ${n}</title>\n            <style>\n              body {\n                margin: 0;\n                padding: 20px;\n                display: flex;\n                flex-direction: column;\n                align-items: center;\n                justify-content: center;\n                min-height: 100vh;\n                font-family: Arial, sans-serif;\n              }\n              .store-name {\n                font-size: 18px;\n                font-weight: 600;\n                color: #0A2540;\n                margin-bottom: 8px;\n              }\n              .table-number {\n                font-size: 32px;\n                font-weight: bold;\n                color: #0A2540;\n                margin-bottom: 16px;\n              }\n              .qr-container {\n                padding: 20px;\n                background: white;\n              }\n              .qr-container svg {\n                width: 200px;\n                height: 200px;\n              }\n              @media print {\n                body { padding: 0; }\n                .qr-container svg {\n                  width: 250px;\n                  height: 250px;\n                }\n              }\n            </style>\n          </head>\n          <body>\n            <div class="store-name">${r}</div>\n            <div class="table-number">${n}</div>\n            <div class="qr-container">${e}</div>\n            <script>\n              window.onload = function() {\n                window.print();\n                window.onafterprint = function() { window.close(); };\n              };\n            <\/script>\n          </body>\n          </html>\n        `),i.document.close())}})(e),children:"Print"})]})]},e.id)})})]})]})]}),(0,b.jsxs)(M,{children:[(0,b.jsx)(v,{onClick:ln,disabled:!xe,children:xe?"Save Changes":"Saved"}),ue&&(0,b.jsx)(N,{type:ue.type,children:ue.message})]})]}),"printer"===pe&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(k,{style:{marginBottom:"24px"},children:[(0,b.jsx)(_,{children:"Printer Mode"}),(0,b.jsx)("p",{style:{color:"#6B7C93",marginBottom:"20px",fontSize:"14px"},children:"Select how to connect to your thermal printer"}),_e?(0,b.jsx)("div",{style:{padding:"20px",textAlign:"center",color:"#6B7C93"},children:"Loading printer settings..."}):(0,b.jsxs)("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[(0,b.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"12px 16px",border:"rawbt"===we?"2px solid #635BFF":"1px solid #E2E8F0",borderRadius:"8px",cursor:"pointer",background:"rawbt"===we?"#F5F3FF":"#fff",flex:"1",minWidth:"150px"},children:[(0,b.jsx)("input",{type:"radio",name:"printerMode",value:"rawbt",checked:"rawbt"===we,onChange:()=>{ke("rawbt"),(0,m.aH)("rawbt")},style:{accentColor:"#635BFF"}}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{style:{fontWeight:500,color:"#1F2937"},children:"RawBT (Android)"}),(0,b.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:"For Android tablets with RawBT app"})]})]}),(0,b.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"12px 16px",border:"browser"===we?"2px solid #635BFF":"1px solid #E2E8F0",borderRadius:"8px",cursor:"pointer",background:"browser"===we?"#F5F3FF":"#fff",flex:"1",minWidth:"150px"},children:[(0,b.jsx)("input",{type:"radio",name:"printerMode",value:"browser",checked:"browser"===we,onChange:()=>{ke("browser"),(0,m.aH)("browser")},style:{accentColor:"#635BFF"}}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{style:{fontWeight:500,color:"#1F2937"},children:"Browser Print (PC)"}),(0,b.jsx)("div",{style:{fontSize:"12px",color:"#6B7C93"},children:"For Windows/Mac computers"})]})]})]})]}),"rawbt"===we&&!_e&&(0,b.jsxs)(w,{children:[(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Bill Printer"}),(0,b.jsx)("p",{style:{color:"#6B7C93",marginBottom:"20px",fontSize:"14px"},children:"Configure receipt printer for customer bills"}),(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Enable Bill Printer"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:fe.billPrinter.enabled,onChange:e=>Ce(n=>({...n,billPrinter:{...n.billPrinter,enabled:e.target.checked}}))}),(0,b.jsx)(E,{})]})]}),fe.billPrinter.enabled&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(F,{style:{marginTop:"20px"},children:[(0,b.jsx)(B,{children:"Printer Address"}),(0,b.jsx)(S,{type:"text",value:fe.billPrinter.name,onChange:e=>Ce(n=>({...n,billPrinter:{...n.billPrinter,name:e.target.value}})),placeholder:"e.g., PT-210, InnerPrinter"}),(0,b.jsxs)("p",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px",lineHeight:"1.5"},children:["Enter the printer name as shown in RawBT app",(0,b.jsx)("br",{}),"(WiFi/Bluetooth printers must be configured in RawBT first)",(0,b.jsx)("br",{}),"Leave empty to use RawBT's default printer"]})]}),(0,b.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"10px",marginTop:"16px",cursor:"pointer"},children:[(0,b.jsx)("input",{type:"checkbox",checked:fe.billPrinter.autoPrint,onChange:e=>Ce(n=>({...n,billPrinter:{...n.billPrinter,autoPrint:e.target.checked}})),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,b.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-print after payment"})]})]})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Kitchen Printer"}),(0,b.jsx)("p",{style:{color:"#6B7C93",marginBottom:"20px",fontSize:"14px"},children:"Configure printer for kitchen order tickets"}),(0,b.jsxs)(P,{children:[(0,b.jsx)(T,{children:"Enable Kitchen Printer"}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:fe.kitchenPrinter.enabled,onChange:e=>Ce(n=>({...n,kitchenPrinter:{...n.kitchenPrinter,enabled:e.target.checked}}))}),(0,b.jsx)(E,{})]})]}),fe.kitchenPrinter.enabled&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(F,{style:{marginTop:"20px"},children:[(0,b.jsx)(B,{children:"Printer Address"}),(0,b.jsx)(S,{type:"text",value:fe.kitchenPrinter.name,onChange:e=>Ce(n=>({...n,kitchenPrinter:{...n.kitchenPrinter,name:e.target.value}})),placeholder:"e.g., Kitchen-Printer, PT-210"}),(0,b.jsxs)("p",{style:{fontSize:"12px",color:"#6B7C93",marginTop:"4px",lineHeight:"1.5"},children:["Enter the printer name as shown in RawBT app",(0,b.jsx)("br",{}),"(WiFi/Bluetooth printers must be configured in RawBT first)",(0,b.jsx)("br",{}),"Leave empty to use RawBT's default printer"]})]}),(0,b.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"10px",marginTop:"16px",cursor:"pointer"},children:[(0,b.jsx)("input",{type:"checkbox",checked:fe.kitchenPrinter.autoPrint,onChange:e=>Ce(n=>({...n,kitchenPrinter:{...n.kitchenPrinter,autoPrint:e.target.checked}})),style:{width:"18px",height:"18px",accentColor:"#635BFF"}}),(0,b.jsx)("span",{style:{fontSize:"14px",color:"#374151"},children:"Auto-print on new order"})]})]})]})]}),!_e&&(0,b.jsxs)(k,{style:{marginTop:"24px"},children:[(0,b.jsx)(_,{children:"Kitchen Ticket Options"}),(0,b.jsx)("p",{style:{color:"#6B7C93",marginBottom:"20px",fontSize:"14px"},children:"Configure how kitchen order tickets are printed"}),(0,b.jsxs)(P,{children:[(0,b.jsxs)("div",{style:{flex:1},children:[(0,b.jsx)(T,{style:{marginBottom:"4px"},children:"Print separate ticket for each item"}),(0,b.jsx)("p",{style:{fontSize:"12px",color:"#6B7C93",margin:0},children:"When enabled, each menu item will print on a separate ticket instead of one combined ticket per order"})]}),(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:fe.kitchenPrinter.printPerItem||!1,onChange:e=>Ce(n=>({...n,kitchenPrinter:{...n.kitchenPrinter,printPerItem:e.target.checked}}))}),(0,b.jsx)(E,{})]})]})]}),(0,b.jsxs)(M,{style:{marginTop:"24px"},children:[(0,b.jsx)(v,{onClick:async()=>{if(null===ie||void 0===ie||!ie.restaurantId)return me({type:"error",message:"No restaurant ID found"}),void setTimeout(()=>me(null),3e3);try{const e=localStorage.getItem("auth_token"),n={printerMode:we,billPrinter:fe.billPrinter,kitchenPrinter:fe.kitchenPrinter};(await fetch(`/api/restaurants/${ie.restaurantId}`,{method:"PUT",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({printer_settings:n})})).ok?(localStorage.setItem("printerMode",we),localStorage.setItem("printerSettings",JSON.stringify(fe)),me({type:"success",message:"Printer settings saved!"})):me({type:"error",message:"Failed to save settings"})}catch(e){console.error("Failed to save printer settings:",e),me({type:"error",message:"Failed to save settings"})}setTimeout(()=>me(null),3e3)},children:"Save Printer Settings"}),ue&&(0,b.jsx)(N,{type:ue.type,children:ue.message})]})]}),"managers"===pe&&(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"8px",padding:"16px",marginBottom:"24px"},children:(0,b.jsx)("p",{style:{margin:0,fontSize:"14px",color:"#075985",lineHeight:"1.5"},children:"View all managers connected to this restaurant. Managers can assist with operations, reporting, and business management."})}),He?(0,b.jsx)(k,{children:(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"Loading managers..."})}):0===Qe.length?(0,b.jsx)(k,{children:(0,b.jsxs)("div",{style:{textAlign:"center",padding:"40px"},children:[(0,b.jsx)("h3",{style:{fontSize:"18px",fontWeight:"600",color:"#0A2540",marginBottom:"8px"},children:"No Managers Connected"}),(0,b.jsx)("p",{style:{color:"#6B7C93",fontSize:"14px"},children:"No managers are currently assigned to this restaurant."})]})}):(0,b.jsx)(w,{children:Qe.map(e=>{const n=(e=>{switch(e){case"Foodcourt General":return{bg:"#ECFDF5",color:"#059669",border:"#A7F3D0"};case"Brand General":return{bg:"#F0F9FF",color:"#0284C7",border:"#BAE6FD"};case"Foodcourt Manager":return{bg:"#FEF3C7",color:"#D97706",border:"#FDE68A"};case"Brand Manager":return{bg:"#FAE8FF",color:"#A855F7",border:"#E9D5FF"};default:return{bg:"#F3F4F6",color:"#6B7280",border:"#E5E7EB"}}})(e.role);return(0,b.jsx)(k,{children:(0,b.jsxs)("div",{style:{display:"flex",alignItems:"flex-start",gap:"16px"},children:[(0,b.jsx)("div",{style:{width:"56px",height:"56px",borderRadius:"50%",background:"linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"24px",fontWeight:"600",flexShrink:0},children:e.name.charAt(0).toUpperCase()}),(0,b.jsxs)("div",{style:{flex:1,minWidth:0},children:[(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"},children:[(0,b.jsx)("h4",{style:{margin:0,fontSize:"16px",fontWeight:"600",color:"#0A2540"},children:e.name}),e.isPrimary&&(0,b.jsx)("span",{style:{padding:"2px 8px",borderRadius:"12px",fontSize:"11px",fontWeight:"600",background:"#FEF3C7",color:"#D97706",border:"1px solid #FDE68A"},children:"PRIMARY"})]}),(0,b.jsx)("p",{style:{margin:"0 0 4px 0",fontSize:"14px",color:"#6B7C93",wordBreak:"break-all"},children:e.email}),e.company&&(0,b.jsx)("p",{style:{margin:"0 0 4px 0",fontSize:"14px",color:"#6B7C93"},children:e.company}),e.phone&&(0,b.jsx)("p",{style:{margin:"0 0 8px 0",fontSize:"14px",color:"#6B7C93"},children:e.phone}),(0,b.jsx)("div",{style:{display:"inline-flex",alignItems:"center",padding:"4px 12px",borderRadius:"6px",fontSize:"13px",fontWeight:"500",background:n.bg,color:n.color,border:`1px solid ${n.border}`},children:e.role})]})]})},e.id)})}),(0,b.jsxs)(M,{children:[(0,b.jsx)(v,{onClick:ln,disabled:!xe,children:xe?"Save Changes":"Saved"}),ue&&(0,b.jsx)(N,{type:ue.type,children:ue.message})]})]}),"membership"===pe&&(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{style:{background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"8px",padding:"16px",marginBottom:"24px"},children:(0,b.jsx)("p",{style:{margin:0,fontSize:"14px",color:"#075985",lineHeight:"1.5"},children:"Configure membership and loyalty point settings for your customers. Points are earned on purchases and can be redeemed for discounts."})}),Xe?(0,b.jsx)(k,{children:(0,b.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7C93"},children:"Loading membership settings..."})}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(w,{children:[(0,b.jsxs)(k,{children:[(0,b.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[(0,b.jsx)(_,{style:{marginBottom:0},children:"Points Settings"}),(0,b.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,b.jsxs)(z,{children:[(0,b.jsx)(R,{type:"checkbox",checked:Ye.is_active,onChange:e=>{Ze({...Ye,is_active:e.target.checked}),he(!0)}}),(0,b.jsx)(E,{})]}),(0,b.jsx)("span",{style:{fontSize:"14px",fontWeight:"500",color:Ye.is_active?"#635BFF":"#6B7C93"},children:Ye.is_active?"Active":"Inactive"})]})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Earn Rate (%)"}),(0,b.jsx)("p",{style:{margin:"0 0 8px 0",fontSize:"12px",color:"#8898AA"},children:"Percentage of order value earned as points value"}),(0,b.jsx)(S,{type:"number",step:"0.1",min:"0",max:"100",value:Ye.points_per_currency&&Ye.points_to_currency?(Ye.points_per_currency/Ye.points_to_currency*100).toFixed(1):1,onChange:e=>{const n=(parseFloat(e.target.value)||0)*Ye.points_to_currency/100;Ze({...Ye,points_per_currency:n}),he(!0)}}),(0,b.jsxs)("p",{style:{margin:"8px 0 0 0",fontSize:"11px",color:"#6B7C93"},children:["e.g., ",(Ye.points_per_currency/Ye.points_to_currency*100).toFixed(1),"% earn rate:",(0,y.Qn)(Ie.currency)," 100 spent = ",Math.round(100*Ye.points_per_currency)," points = ",(0,y.Qn)(Ie.currency)," ",(100*Ye.points_per_currency/Ye.points_to_currency).toFixed(2)," value"]})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Points Value"}),(0,b.jsxs)("p",{style:{margin:"0 0 8px 0",fontSize:"12px",color:"#8898AA"},children:["How many points equal ",(0,y.Qn)(Ie.currency)," 1 when redeeming"]}),(0,b.jsx)(S,{type:"number",step:"1",min:"1",value:Ye.points_to_currency,onChange:e=>{Ze({...Ye,points_to_currency:parseFloat(e.target.value)||100}),he(!0)}}),(0,b.jsxs)("p",{style:{margin:"8px 0 0 0",fontSize:"11px",color:"#6B7C93"},children:[Ye.points_to_currency," points = ",(0,y.Qn)(Ie.currency)," 1"]})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Minimum Points to Use"}),(0,b.jsx)("p",{style:{margin:"0 0 8px 0",fontSize:"12px",color:"#8898AA"},children:"Minimum points required before customer can redeem"}),(0,b.jsx)(S,{type:"number",step:"1",min:"0",value:Ye.min_points_to_use,onChange:e=>{Ze({...Ye,min_points_to_use:parseInt(e.target.value)||0}),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Max Points Per Order (%)"}),(0,b.jsx)("p",{style:{margin:"0 0 8px 0",fontSize:"12px",color:"#8898AA"},children:"Maximum percentage of order that can be paid with points"}),(0,b.jsx)(S,{type:"number",step:"1",min:"0",max:"100",value:Ye.max_points_per_order_percent,onChange:e=>{Ze({...Ye,max_points_per_order_percent:parseFloat(e.target.value)||0}),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Points Expiry (Days)"}),(0,b.jsx)("p",{style:{margin:"0 0 8px 0",fontSize:"12px",color:"#8898AA"},children:"Number of days until points expire (0 = never)"}),(0,b.jsx)(S,{type:"number",step:"1",min:"0",value:Ye.points_expiry_days,onChange:e=>{Ze({...Ye,points_expiry_days:parseInt(e.target.value)||0}),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Welcome Points"}),(0,b.jsx)("p",{style:{margin:"0 0 8px 0",fontSize:"12px",color:"#8898AA"},children:"Points given to new members on registration"}),(0,b.jsx)(S,{type:"number",step:"1",min:"0",value:Ye.welcome_points,onChange:e=>{Ze({...Ye,welcome_points:parseInt(e.target.value)||0}),he(!0)}})]})]}),(0,b.jsxs)(k,{children:[(0,b.jsx)(_,{children:"Tier Thresholds"}),(0,b.jsx)("p",{style:{margin:"0 0 16px 0",fontSize:"12px",color:"#8898AA"},children:"Total spending required to reach each tier"}),(0,b.jsxs)(F,{children:[(0,b.jsxs)(B,{children:["Silver Threshold (",(0,y.Qn)(Ie.currency),")"]}),(0,b.jsx)(S,{type:"number",step:"100",min:"0",value:Ye.silver_threshold,onChange:e=>{Ze({...Ye,silver_threshold:parseFloat(e.target.value)||0}),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsxs)(B,{children:["Gold Threshold (",(0,y.Qn)(Ie.currency),")"]}),(0,b.jsx)(S,{type:"number",step:"100",min:"0",value:Ye.gold_threshold,onChange:e=>{Ze({...Ye,gold_threshold:parseFloat(e.target.value)||0}),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsxs)(B,{children:["VIP Threshold (",(0,y.Qn)(Ie.currency),")"]}),(0,b.jsx)(S,{type:"number",step:"100",min:"0",value:Ye.vip_threshold,onChange:e=>{Ze({...Ye,vip_threshold:parseFloat(e.target.value)||0}),he(!0)}})]}),(0,b.jsx)(_,{style:{marginTop:"24px"},children:"Bonus Rates"}),(0,b.jsx)("p",{style:{margin:"0 0 16px 0",fontSize:"12px",color:"#8898AA"},children:"Point earning multiplier for each tier"}),(0,b.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Bronze (x)"}),(0,b.jsx)(S,{type:"number",step:"0.1",min:"1",value:Ye.bronze_bonus_rate,onChange:e=>{Ze({...Ye,bronze_bonus_rate:parseFloat(e.target.value)||1}),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Silver (x)"}),(0,b.jsx)(S,{type:"number",step:"0.1",min:"1",value:Ye.silver_bonus_rate,onChange:e=>{Ze({...Ye,silver_bonus_rate:parseFloat(e.target.value)||1}),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Gold (x)"}),(0,b.jsx)(S,{type:"number",step:"0.1",min:"1",value:Ye.gold_bonus_rate,onChange:e=>{Ze({...Ye,gold_bonus_rate:parseFloat(e.target.value)||1}),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"VIP (x)"}),(0,b.jsx)(S,{type:"number",step:"0.1",min:"1",value:Ye.vip_bonus_rate,onChange:e=>{Ze({...Ye,vip_bonus_rate:parseFloat(e.target.value)||1}),he(!0)}})]})]}),(0,b.jsx)(_,{style:{marginTop:"24px"},children:"Tier Discounts (%)"}),(0,b.jsx)("p",{style:{margin:"0 0 16px 0",fontSize:"12px",color:"#8898AA"},children:"Automatic discount for each tier"}),(0,b.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"},children:[(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Bronze (%)"}),(0,b.jsx)(S,{type:"number",step:"1",min:"0",max:"100",value:Ye.bronze_discount_percent,onChange:e=>{Ze({...Ye,bronze_discount_percent:parseFloat(e.target.value)||0}),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Silver (%)"}),(0,b.jsx)(S,{type:"number",step:"1",min:"0",max:"100",value:Ye.silver_discount_percent,onChange:e=>{Ze({...Ye,silver_discount_percent:parseFloat(e.target.value)||0}),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"Gold (%)"}),(0,b.jsx)(S,{type:"number",step:"1",min:"0",max:"100",value:Ye.gold_discount_percent,onChange:e=>{Ze({...Ye,gold_discount_percent:parseFloat(e.target.value)||0}),he(!0)}})]}),(0,b.jsxs)(F,{children:[(0,b.jsx)(B,{children:"VIP (%)"}),(0,b.jsx)(S,{type:"number",step:"1",min:"0",max:"100",value:Ye.vip_discount_percent,onChange:e=>{Ze({...Ye,vip_discount_percent:parseFloat(e.target.value)||0}),he(!0)}})]})]})]})]}),(0,b.jsxs)(k,{style:{marginTop:"24px",background:"#F8FAFC",border:"1px solid #E2E8F0"},children:[(0,b.jsx)(_,{style:{fontSize:"14px",color:"#64748B"},children:"Point System Policy Reference"}),(0,b.jsxs)("div",{style:{fontSize:"13px",color:"#64748B",lineHeight:"1.8"},children:[(0,b.jsx)("p",{style:{marginBottom:"12px",fontWeight:"500",color:"#475569"},children:"These are the system rules that cannot be changed:"}),(0,b.jsxs)("ul",{style:{margin:0,paddingLeft:"20px"},children:[(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Point Earning:"}),' Points are earned when an order status changes to "Completed"']}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Point Calculation:"})," (Order Amount) \xd7 (Earn Rate %) \xd7 (Tier Bonus Rate)"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Setting Changes:"})," New settings apply to orders placed after the change"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Existing Points:"})," Previously earned points are not affected by setting changes"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Point Redemption:"})," Points can only be redeemed up to the maximum % of order total"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Tier Calculation:"})," Customer tier is based on total spending at your restaurant"]}),(0,b.jsxs)("li",{children:[(0,b.jsx)("strong",{children:"Point Expiry:"})," Expired points are automatically deducted (if expiry is set)"]})]}),(0,b.jsxs)("p",{style:{marginTop:"12px",fontSize:"12px",color:"#94A3B8"},children:["Current setting: ",(Ye.points_per_currency/Ye.points_to_currency*100).toFixed(1),"% earn rate (",Ye.points_to_currency," points = ",(0,y.Qn)(Ie.currency)," 1)"]})]})]}),(0,b.jsxs)(M,{children:[(0,b.jsx)(v,{onClick:async()=>{if(null!==ie&&void 0!==ie&&ie.restaurantId)try{const e=localStorage.getItem("auth_token");if(!(await fetch(`/api/membership/settings/${ie.restaurantId}`,{method:"PUT",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify(Ye)})).ok)throw new Error("Failed to save membership settings");he(!1),me(null)}catch(e){console.error("Failed to save membership settings:",e),me({type:"error",message:"Failed to save membership settings"}),setTimeout(()=>{me(null)},8e3)}},disabled:!xe,children:xe?"Save Changes":"Saved"}),ue&&(0,b.jsx)(N,{type:ue.type,children:ue.message})]})]})]})]})]})})}},8012:(e,n,r)=>{r.d(n,{Ay:()=>l});r(9950);var t=r(4752),i=r(4414);const o=t.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px 16px;
    height: auto;
    min-height: 48px;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`,a=t.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,s=t.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,l=e=>{let{title:n,children:r}=e;return(0,i.jsxs)(o,{children:[(0,i.jsx)(a,{children:n}),r&&(0,i.jsx)(s,{children:r})]})}}}]);