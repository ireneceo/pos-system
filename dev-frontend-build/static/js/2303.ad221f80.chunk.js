"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2303],{251:(e,o,r)=>{r.d(o,{_W:()=>t,jr:()=>a,zQ:()=>n});const t=[{value:"kg",label:"kg (kilogram)",category:"weight",baseUnit:"g",multiplier:1e3},{value:"g",label:"g (gram)",category:"weight",baseUnit:"g",multiplier:1},{value:"mg",label:"mg (milligram)",category:"weight",baseUnit:"g",multiplier:.001},{value:"L",label:"L (liter)",category:"volume",baseUnit:"ml",multiplier:1e3},{value:"ml",label:"ml (milliliter)",category:"volume",baseUnit:"ml",multiplier:1},{value:"piece",label:"piece",category:"count",baseUnit:"piece",multiplier:1},{value:"pack",label:"pack",category:"count",baseUnit:"pack",multiplier:1},{value:"box",label:"box",category:"count",baseUnit:"box",multiplier:1},{value:"can",label:"can",category:"count",baseUnit:"can",multiplier:1},{value:"bottle",label:"bottle",category:"count",baseUnit:"bottle",multiplier:1},{value:"bag",label:"bag",category:"count",baseUnit:"bag",multiplier:1},{value:"portion",label:"portion",category:"serving",baseUnit:"portion",multiplier:1},{value:"serving",label:"serving",category:"serving",baseUnit:"serving",multiplier:1},{value:"tbsp",label:"tbsp (tablespoon)",category:"cooking",baseUnit:"ml",multiplier:15},{value:"tsp",label:"tsp (teaspoon)",category:"cooking",baseUnit:"ml",multiplier:5},{value:"cup",label:"cup",category:"cooking",baseUnit:"ml",multiplier:240}],i=(t.map(e=>e.value),t.filter(e=>"weight"===e.category),t.filter(e=>"volume"===e.category),t.filter(e=>"count"===e.category),t.filter(e=>"serving"===e.category),t.filter(e=>"cooking"===e.category),e=>t.find(o=>o.value===e)),a=(e,o,r,t)=>{if(o===t)return e*r;const a=((e,o,r)=>{if(o===r)return e;const t=i(o),a=i(r);return t&&a?t.baseUnit!==a.baseUnit?null:e*t.multiplier/a.multiplier:null})(r,t,o);return null===a?(console.warn(`Cannot convert ${t} to ${o}`),null):e*a},n=(e,o,r)=>o<=0?{cost:e,unit:r}:{cost:e/o,unit:r}},2488:(e,o,r)=>{r.d(o,{DO:()=>p,Jt:()=>c,Qn:()=>d});var t=r(8819),i=(r(9950),r(4752)),a=r(4414);const n=i.Ay.div`
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
`,l=i.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${t.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: 0 0 0 3px ${t.w.colors.primaryLight};
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
`,s=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${t.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: 0 0 0 3px ${t.w.colors.primaryLight};
  }

  &:disabled {
    background: ${t.w.colors.surfaceHover};
    color: ${t.w.colors.text.muted};
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
`,d=e=>{let{children:o,className:r,style:t,...i}=e;return(0,a.jsx)(n,{className:r,style:t,...i,children:o})},p=e=>{let{placeholder:o="Search...",...r}=e;return(0,a.jsx)(l,{placeholder:o,...r})},c=e=>{let{children:o,...r}=e;return(0,a.jsx)(s,{...r,children:o})}},3705:(e,o,r)=>{r.d(o,{cc:()=>a.$n});var t=r(8819),i=r(4752),a=r(8829);i.Ay.select`
  padding: ${t.w.components.form.inputPadding};
  border: 1px solid ${t.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${t.w.typography.fontSize.sm};
  background: ${t.w.colors.surface};
  color: ${t.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: ${t.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${t.w.colors.borderHover};
  }
`,i.Ay.input`
  padding: ${t.w.components.form.inputPadding};
  border: 1px solid ${t.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${t.w.typography.fontSize.sm};
  background: ${t.w.colors.surface};
  color: ${t.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${t.w.colors.primary};
    box-shadow: ${t.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${t.w.colors.borderHover};
  }
`,i.Ay.div`
  background: ${t.w.colors.surface};
  border-radius: ${t.w.borderRadius.md};
  border: 1px solid ${t.w.colors.borderLight};
  padding: ${t.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${t.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${t.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${t.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4021:(e,o,r)=>{r.d(o,{i1:()=>n});var t=r(9950),i=r(1367),a=r(6038);const n=()=>{const{user:e}=(0,i.As)(),[o,r]=(0,t.useState)("RM"),[n,l]=(0,t.useState)(Object.keys(a.DL)),[s,d]=(0,t.useState)(!0),[p,c]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const o=window.location.pathname.split("/"),t=o.indexOf("restaurant");let i=t>=0?o[t+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),o=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(o.ok){var a;const e=await o.json(),t=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";r(t)}else r("RM")}catch(n){console.error("Failed to fetch restaurant currency:",n),c("Failed to load currency settings"),r("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:o,supportedCurrencies:n,loading:s,error:p}}},4877:(e,o,r)=>{r.d(o,{A:()=>v});var t=r(8819),i=r(9950),a=r(4752),n=r(4414);const l=a.Ay.div`
  margin-bottom: 16px;
`,s=a.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,d=a.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,p=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,c=a.Ay.div`
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
`,u=a.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,g=a.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,x=a.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,h=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,m=a.Ay.label`
  padding: 8px 16px;
  border: 1px solid ${t.w.colors.primary};
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
`,b=a.Ay.button`
  padding: 8px 16px;
  border: 1px solid ${t.w.colors.danger};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${t.w.colors.danger};
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`,w=a.Ay.input`
  display: none;
`,f=a.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,y=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",v=e=>{let{value:o,onChange:r,label:t="Logo Upload",helpText:a="Upload an image for your logo",maxSize:v=2,previewSize:$=150,showRemoveButton:k=!0,changeButtonText:A="Change Image",removeButtonText:F="Remove Image",imageAltText:j="Uploaded"}=e;const[C,B]=(0,i.useState)(!1),[D,z]=(0,i.useState)(!1),E=(0,i.useRef)(null),U=(0,i.useRef)(null),S=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);z(!0);const o=new FileReader;o.onload=async e=>{var o;const t=new Image;t.onload=async()=>{const e=document.createElement("canvas"),o=e.getContext("2d");if(!o)return void z(!1);const i=1200;let a=t.width,n=t.height;(a>i||n>i)&&(a>n?(n=n/a*i,a=i):(a=a/n*i,n=i)),e.width=a,e.height=n,o.drawImage(t,0,0,a,n);const l=e.toDataURL("image/jpeg",.85),s=await(async e=>{try{const o=localStorage.getItem("auth_token"),r=await fetch(`${y()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({image:e})}),t=await r.json();return t.success?t.data.original:(console.error("Image upload failed:",t.message),null)}catch(o){return console.error("Image upload error:",o),null}})(l);z(!1),s?r(s):alert("Failed to upload image. Please try again.")},t.src=null===(o=e.target)||void 0===o?void 0:o.result},o.readAsDataURL(e)},L=e=>{if(D)return;const o=e.target.files;o&&o.length>0&&S(o[0]),e.target.value=""};return(0,n.jsxs)(l,{children:[t&&(0,n.jsx)(s,{children:t}),a&&(0,n.jsx)(d,{children:a}),(0,n.jsxs)(p,{children:[(0,n.jsx)(c,{ref:U,isDragging:C,hasImage:!!o,isUploading:D,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),D||B(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===U.current&&B(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),B(!1),D)return;const o=e.dataTransfer.files;o&&o.length>0&&S(o[0])},onClick:()=>{var e;o||D||(null===(e=E.current)||void 0===e||e.click())},children:D?(0,n.jsxs)(u,{children:[(0,n.jsx)(f,{}),(0,n.jsx)(g,{style:{marginTop:"12px"},children:"Uploading..."})]}):o?(0,n.jsx)("img",{src:(O=o,O?O.startsWith("http")?O:O.startsWith("/uploads/")?`${y()}${O}`:O:""),alt:j}):(0,n.jsxs)(u,{children:[(0,n.jsx)(g,{children:C?"Drop image here":"Drag & drop or click to upload"}),(0,n.jsxs)(x,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),o&&!D&&(0,n.jsxs)(h,{children:[(0,n.jsxs)(m,{disabled:D,children:[A,(0,n.jsx)("input",{ref:E,type:"file",accept:"image/*",onChange:L,disabled:D})]}),k&&(0,n.jsx)(b,{onClick:()=>{r("")},disabled:D,children:F})]})]}),!o&&!D&&(0,n.jsx)(w,{ref:E,type:"file",accept:"image/*",onChange:L})]});var O}},7617:(e,o,r)=>{r.d(o,{A:()=>g});var t=r(8819),i=(r(9950),r(4752)),a=r(9610),n=r(4414);const l=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid ${t.w.colors.border};
`,d=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,p=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=i.Ay.button`
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
`,g=e=>{let{isOpen:o,title:r,message:t,onConfirm:i,onCancel:g,confirmText:x="Confirm",cancelText:h="Cancel",type:m="warning"}=e;return o?(0,n.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&g()},children:(0,n.jsxs)(l,{onClick:e=>e.stopPropagation(),children:[(0,n.jsxs)(s,{children:[(0,n.jsx)(d,{children:r}),(0,n.jsx)(p,{children:t})]}),(0,n.jsxs)(c,{children:[(0,n.jsx)(u,{variant:"secondary",onClick:g,children:h}),(0,n.jsx)(u,{variant:"primary",type:m,onClick:i,children:x})]})]})}):null}},9194:(e,o,r)=>{r.d(o,{A:()=>b});var t=r(8819),i=r(9950),a=r(4752),n=r(4414);const l=a.Ay.div`
  position: relative;
  width: 100%;
`,s=a.Ay.div`
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
`,d=a.Ay.input`
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
`,p=a.Ay.button`
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
`,c=a.Ay.div`
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
`,u=a.Ay.div`
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
`,g=a.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.isSelected?"#F0F4FF":e.isHighlighted?"#F9FAFB":"white"};
  color: ${e=>e.isSelected?"#635BFF":"#0A2540"};
  font-weight: ${e=>e.isSelected?"500":"400"};
  transition: background 0.15s;

  &:hover {
    background: ${e=>e.isSelected?"#F0F4FF":"#F9FAFB"};
  }
`,x=a.Ay.div`
  font-size: 14px;
`,h=a.Ay.div`
  font-size: 12px;
  color: ${t.w.colors.text.muted};
  margin-top: 2px;
`,m=a.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,b=e=>{let{options:o,value:r,onChange:t,placeholder:a="Select...",disabled:b=!1,allowClear:w=!0,noOptionsMessage:f="No options found"}=e;const[y,v]=(0,i.useState)(!1),[$,k]=(0,i.useState)(""),[A,F]=(0,i.useState)(-1),j=(0,i.useRef)(null),C=(0,i.useRef)(null),B=o.find(e=>e.value===r),D=o.filter(e=>e.label.toLowerCase().includes($.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes($.toLowerCase()));(0,i.useEffect)(()=>{const e=e=>{j.current&&!j.current.contains(e.target)&&(v(!1),k(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,i.useEffect)(()=>{y||(k(""),F(-1))},[y]);const z=e=>{t(e.value),v(!1),k("")},E=y?$:(null===B||void 0===B?void 0:B.label)||"";return(0,n.jsxs)(l,{ref:j,children:[(0,n.jsxs)(s,{isOpen:y,disabled:b,onClick:()=>{var e;b||(v(!0),null===(e=C.current)||void 0===e||e.focus())},children:[(0,n.jsx)(d,{ref:C,type:"text",value:E,onChange:e=>{k(e.target.value),F(0),y||v(!0)},onKeyDown:e=>{if(!b)switch(e.key){case"ArrowDown":e.preventDefault(),y?F(e=>e<D.length-1?e+1:e):v(!0);break;case"ArrowUp":e.preventDefault(),F(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),y&&A>=0&&D[A]?z(D[A]):y||v(!0);break;case"Escape":v(!1),k("")}},placeholder:a,disabled:b}),w&&r&&!b&&(0,n.jsx)(p,{onClick:e=>{e.stopPropagation(),t(null),k("")},type:"button",children:(0,n.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,n.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,n.jsx)(c,{isOpen:y,children:(0,n.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,n.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,n.jsx)(u,{isOpen:y,children:D.length>0?D.map((e,o)=>(0,n.jsxs)(g,{isSelected:e.value===r,isHighlighted:o===A,onClick:()=>z(e),onMouseEnter:()=>F(o),children:[(0,n.jsx)(x,{children:e.label}),e.subLabel&&(0,n.jsx)(h,{children:e.subLabel})]},e.value)):(0,n.jsx)(m,{children:f})})]})}}}]);