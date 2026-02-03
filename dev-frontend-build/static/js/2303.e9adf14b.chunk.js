"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2303],{251:(e,r,t)=>{t.d(r,{_W:()=>n,jr:()=>a,zQ:()=>i});const n=[{value:"kg",label:"kg (kilogram)",category:"weight",baseUnit:"g",multiplier:1e3},{value:"g",label:"g (gram)",category:"weight",baseUnit:"g",multiplier:1},{value:"mg",label:"mg (milligram)",category:"weight",baseUnit:"g",multiplier:.001},{value:"L",label:"L (liter)",category:"volume",baseUnit:"ml",multiplier:1e3},{value:"ml",label:"ml (milliliter)",category:"volume",baseUnit:"ml",multiplier:1},{value:"piece",label:"piece",category:"count",baseUnit:"piece",multiplier:1},{value:"pack",label:"pack",category:"count",baseUnit:"pack",multiplier:1},{value:"box",label:"box",category:"count",baseUnit:"box",multiplier:1},{value:"can",label:"can",category:"count",baseUnit:"can",multiplier:1},{value:"bottle",label:"bottle",category:"count",baseUnit:"bottle",multiplier:1},{value:"bag",label:"bag",category:"count",baseUnit:"bag",multiplier:1},{value:"portion",label:"portion",category:"serving",baseUnit:"portion",multiplier:1},{value:"serving",label:"serving",category:"serving",baseUnit:"serving",multiplier:1},{value:"tbsp",label:"tbsp (tablespoon)",category:"cooking",baseUnit:"ml",multiplier:15},{value:"tsp",label:"tsp (teaspoon)",category:"cooking",baseUnit:"ml",multiplier:5},{value:"cup",label:"cup",category:"cooking",baseUnit:"ml",multiplier:240}],o=(n.map(e=>e.value),n.filter(e=>"weight"===e.category),n.filter(e=>"volume"===e.category),n.filter(e=>"count"===e.category),n.filter(e=>"serving"===e.category),n.filter(e=>"cooking"===e.category),e=>n.find(r=>r.value===e)),a=(e,r,t,n)=>{if(r===n)return e*t;const a=((e,r,t)=>{if(r===t)return e;const n=o(r),a=o(t);return n&&a?n.baseUnit!==a.baseUnit?null:e*n.multiplier/a.multiplier:null})(t,n,r);return null===a?(console.warn(`Cannot convert ${n} to ${r}`),null):e*a},i=(e,r,t)=>r<=0?{cost:e,unit:t}:{cost:e/r,unit:t}},2488:(e,r,t)=>{t.d(r,{DO:()=>d,Jt:()=>p,Qn:()=>s});t(9950);var n=t(4752),o=t(4414);const a=n.Ay.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  /* Transparent background - sits directly on page background */
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 1024px) {
    gap: 12px;
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`,i=n.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 150px;
    max-width: 250px;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    max-width: 200px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`,l=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F8FAFC;
    color: #6B7280;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    min-width: 120px;
    max-width: 150px;
    padding: 10px 12px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    min-width: 110px;
    max-width: 140px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    padding: 12px 16px;
    font-size: 14px;
  }
`,s=e=>{let{children:r,className:t,style:n,...i}=e;return(0,o.jsx)(a,{className:t,style:n,...i,children:r})},d=e=>{let{placeholder:r="Search...",...t}=e;return(0,o.jsx)(i,{placeholder:r,...t})},p=e=>{let{children:r,...t}=e;return(0,o.jsx)(l,{...t,children:r})}},3705:(e,r,t)=>{t.d(r,{cc:()=>o});var n=t(4752);const o=n.Ay.button`
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
`;n.Ay.select`
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
`,n.Ay.input`
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
`,n.Ay.div`
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
`},4021:(e,r,t)=>{t.d(r,{i1:()=>i});var n=t(9950),o=t(1367),a=t(6038);const i=()=>{const{user:e}=(0,o.As)(),[r,t]=(0,n.useState)("RM"),[i,l]=(0,n.useState)(Object.keys(a.DL)),[s,d]=(0,n.useState)(!0),[p,c]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const r=window.location.pathname.split("/"),n=r.indexOf("restaurant");let o=n>=0?r[n+1]:null;if(!o&&null!==e&&void 0!==e&&e.restaurant_id&&(o=e.restaurant_id.toString()),!o)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/restaurants/${o}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(r.ok){var a;const e=await r.json(),n=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";t(n)}else t("RM")}catch(i){console.error("Failed to fetch restaurant currency:",i),c("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:r,supportedCurrencies:i,loading:s,error:p}}},4877:(e,r,t)=>{t.d(r,{A:()=>w});var n=t(9950),o=t(4752),a=t(4414);const i=o.Ay.div`
  margin-bottom: 16px;
`,l=o.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=o.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,p=o.Ay.div`
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
`,c=o.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,u=o.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,x=o.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,g=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,h=o.Ay.label`
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
`,b=o.Ay.button`
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
`,m=o.Ay.input`
  display: none;
`,f=o.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,v=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",w=e=>{let{value:r,onChange:t,label:o="Logo Upload",helpText:w="Upload an image for your logo",maxSize:y=2,previewSize:F=150,showRemoveButton:k=!0,changeButtonText:A="Change Image",removeButtonText:C="Remove Image",imageAltText:B="Uploaded"}=e;const[j,E]=(0,n.useState)(!1),[$,D]=(0,n.useState)(!1),z=(0,n.useRef)(null),U=(0,n.useRef)(null),S=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*y*1024)return void alert(`Image size should be less than ${y}MB`);D(!0);const r=new FileReader;r.onload=async e=>{var r;const n=new Image;n.onload=async()=>{const e=document.createElement("canvas"),r=e.getContext("2d");if(!r)return void D(!1);const o=1200;let a=n.width,i=n.height;(a>o||i>o)&&(a>i?(i=i/a*o,a=o):(a=a/i*o,i=o)),e.width=a,e.height=i,r.drawImage(n,0,0,a,i);const l=e.toDataURL("image/jpeg",.85),s=await(async e=>{try{const r=localStorage.getItem("auth_token"),t=await fetch(`${v()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({image:e})}),n=await t.json();return n.success?n.data.original:(console.error("Image upload failed:",n.message),null)}catch(r){return console.error("Image upload error:",r),null}})(l);D(!1),s?t(s):alert("Failed to upload image. Please try again.")},n.src=null===(r=e.target)||void 0===r?void 0:r.result},r.readAsDataURL(e)},L=e=>{if($)return;const r=e.target.files;r&&r.length>0&&S(r[0]),e.target.value=""};return(0,a.jsxs)(i,{children:[o&&(0,a.jsx)(l,{children:o}),w&&(0,a.jsx)(s,{children:w}),(0,a.jsxs)(d,{children:[(0,a.jsx)(p,{ref:U,isDragging:j,hasImage:!!r,isUploading:$,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),$||E(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===U.current&&E(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),E(!1),$)return;const r=e.dataTransfer.files;r&&r.length>0&&S(r[0])},onClick:()=>{var e;r||$||(null===(e=z.current)||void 0===e||e.click())},children:$?(0,a.jsxs)(c,{children:[(0,a.jsx)(f,{}),(0,a.jsx)(u,{style:{marginTop:"12px"},children:"Uploading..."})]}):r?(0,a.jsx)("img",{src:(I=r,I?I.startsWith("http")?I:I.startsWith("/uploads/")?`${v()}${I}`:I:""),alt:B}):(0,a.jsxs)(c,{children:[(0,a.jsx)(u,{children:j?"Drop image here":"Drag & drop or click to upload"}),(0,a.jsxs)(x,{children:["PNG, JPG, GIF up to ",y,"MB"]})]})}),r&&!$&&(0,a.jsxs)(g,{children:[(0,a.jsxs)(h,{disabled:$,children:[A,(0,a.jsx)("input",{ref:z,type:"file",accept:"image/*",onChange:L,disabled:$})]}),k&&(0,a.jsx)(b,{onClick:()=>{t("")},disabled:$,children:C})]})]}),!r&&!$&&(0,a.jsx)(m,{ref:z,type:"file",accept:"image/*",onChange:L})]});var I}},7617:(e,r,t)=>{t.d(r,{A:()=>u});t(9950);var n=t(4752),o=t(9610),a=t(4414);const i=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,l=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,s=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=n.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,p=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,c=n.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,u=e=>{let{isOpen:r,title:t,message:n,onConfirm:u,onCancel:x,confirmText:g="Confirm",cancelText:h="Cancel",type:b="warning"}=e;return r?(0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&x()},children:(0,a.jsxs)(i,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(l,{children:[(0,a.jsx)(s,{children:t}),(0,a.jsx)(d,{children:n})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(c,{variant:"secondary",onClick:x,children:h}),(0,a.jsx)(c,{variant:"primary",type:b,onClick:u,children:g})]})]})}):null}},9194:(e,r,t)=>{t.d(r,{A:()=>b});var n=t(9950),o=t(4752),a=t(4414);const i=o.Ay.div`
  position: relative;
  width: 100%;
`,l=o.Ay.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid ${e=>e.isOpen?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  background: ${e=>e.disabled?"#F9FAFB":"white"};
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  transition: all 0.2s;

  &:hover {
    border-color: ${e=>e.disabled?"#E6EBF1":"#635BFF"};
  }

  ${e=>e.isOpen&&"\n    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);\n  "}
`,s=o.Ay.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  color: ${e=>e.disabled?"#9CA3AF":"#0A2540"};
  cursor: ${e=>e.disabled?"not-allowed":"text"};

  &::placeholder {
    color: #9CA3AF;
  }
`,d=o.Ay.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  background: #E5E7EB;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 8px;
  transition: background 0.2s;

  &:hover {
    background: #D1D5DB;
  }

  svg {
    width: 12px;
    height: 12px;
    color: #6B7280;
  }
`,p=o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  transform: ${e=>e.isOpen?"rotate(180deg)":"rotate(0deg)"};

  svg {
    width: 16px;
    height: 16px;
    color: #6B7280;
  }
`,c=o.Ay.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 240px;
  overflow-y: auto;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: ${e=>e.isOpen?"block":"none"};
`,u=o.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.isSelected?"#F0F4FF":e.isHighlighted?"#F9FAFB":"white"};
  color: ${e=>e.isSelected?"#635BFF":"#0A2540"};
  font-weight: ${e=>e.isSelected?"500":"400"};
  transition: background 0.15s;

  &:hover {
    background: ${e=>e.isSelected?"#F0F4FF":"#F9FAFB"};
  }
`,x=o.Ay.div`
  font-size: 14px;
`,g=o.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,h=o.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,b=e=>{let{options:r,value:t,onChange:o,placeholder:b="Select...",disabled:m=!1,allowClear:f=!0,noOptionsMessage:v="No options found"}=e;const[w,y]=(0,n.useState)(!1),[F,k]=(0,n.useState)(""),[A,C]=(0,n.useState)(-1),B=(0,n.useRef)(null),j=(0,n.useRef)(null),E=r.find(e=>e.value===t),$=r.filter(e=>e.label.toLowerCase().includes(F.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(F.toLowerCase()));(0,n.useEffect)(()=>{const e=e=>{B.current&&!B.current.contains(e.target)&&(y(!1),k(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,n.useEffect)(()=>{w||(k(""),C(-1))},[w]);const D=e=>{o(e.value),y(!1),k("")},z=w?F:(null===E||void 0===E?void 0:E.label)||"";return(0,a.jsxs)(i,{ref:B,children:[(0,a.jsxs)(l,{isOpen:w,disabled:m,onClick:()=>{var e;m||(y(!0),null===(e=j.current)||void 0===e||e.focus())},children:[(0,a.jsx)(s,{ref:j,type:"text",value:z,onChange:e=>{k(e.target.value),C(0),w||y(!0)},onKeyDown:e=>{if(!m)switch(e.key){case"ArrowDown":e.preventDefault(),w?C(e=>e<$.length-1?e+1:e):y(!0);break;case"ArrowUp":e.preventDefault(),C(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),w&&A>=0&&$[A]?D($[A]):w||y(!0);break;case"Escape":y(!1),k("")}},placeholder:b,disabled:m}),f&&t&&!m&&(0,a.jsx)(d,{onClick:e=>{e.stopPropagation(),o(null),k("")},type:"button",children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,a.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,a.jsx)(p,{isOpen:w,children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,a.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,a.jsx)(c,{isOpen:w,children:$.length>0?$.map((e,r)=>(0,a.jsxs)(u,{isSelected:e.value===t,isHighlighted:r===A,onClick:()=>D(e),onMouseEnter:()=>C(r),children:[(0,a.jsx)(x,{children:e.label}),e.subLabel&&(0,a.jsx)(g,{children:e.subLabel})]},e.value)):(0,a.jsx)(h,{children:v})})]})}}}]);