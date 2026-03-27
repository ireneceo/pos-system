"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1231],{251:(e,t,r)=>{r.d(t,{_W:()=>n,jr:()=>o,zQ:()=>i});const n=[{value:"kg",label:"kg (kilogram)",category:"weight",baseUnit:"g",multiplier:1e3},{value:"g",label:"g (gram)",category:"weight",baseUnit:"g",multiplier:1},{value:"mg",label:"mg (milligram)",category:"weight",baseUnit:"g",multiplier:.001},{value:"L",label:"L (liter)",category:"volume",baseUnit:"ml",multiplier:1e3},{value:"ml",label:"ml (milliliter)",category:"volume",baseUnit:"ml",multiplier:1},{value:"piece",label:"piece",category:"count",baseUnit:"piece",multiplier:1},{value:"pack",label:"pack",category:"count",baseUnit:"pack",multiplier:1},{value:"box",label:"box",category:"count",baseUnit:"box",multiplier:1},{value:"can",label:"can",category:"count",baseUnit:"can",multiplier:1},{value:"bottle",label:"bottle",category:"count",baseUnit:"bottle",multiplier:1},{value:"bag",label:"bag",category:"count",baseUnit:"bag",multiplier:1},{value:"portion",label:"portion",category:"serving",baseUnit:"portion",multiplier:1},{value:"serving",label:"serving",category:"serving",baseUnit:"serving",multiplier:1},{value:"tbsp",label:"tbsp (tablespoon)",category:"cooking",baseUnit:"ml",multiplier:15},{value:"tsp",label:"tsp (teaspoon)",category:"cooking",baseUnit:"ml",multiplier:5},{value:"cup",label:"cup",category:"cooking",baseUnit:"ml",multiplier:240}],a=(n.map(e=>e.value),n.filter(e=>"weight"===e.category),n.filter(e=>"volume"===e.category),n.filter(e=>"count"===e.category),n.filter(e=>"serving"===e.category),n.filter(e=>"cooking"===e.category),e=>n.find(t=>t.value===e)),o=(e,t,r,n)=>{if(t===n)return e*r;const o=((e,t,r)=>{if(t===r)return e;const n=a(t),o=a(r);return n&&o?n.baseUnit!==o.baseUnit?null:e*n.multiplier/o.multiplier:null})(r,n,t);return null===o?(console.warn(`Cannot convert ${n} to ${t}`),null):e*o},i=(e,t,r)=>t<=0?{cost:e,unit:r}:{cost:e/t,unit:r}},2488:(e,t,r)=>{r.d(t,{DO:()=>c,Jt:()=>u,Qn:()=>p});r(9950);var n=r(4752),a=r(4414);const o=n.Ay.div`
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
`,l=n.Ay.div`
  position: relative;
  display: inline-flex;
  flex: 1;
  min-width: 180px;
  max-width: 300px;

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
`,s=n.Ay.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #9CA3AF;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.15s;

  &:hover {
    color: #374151;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`,d=n.Ay.select`
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
`,p=e=>{let{children:t,className:r,style:n,...i}=e;return(0,a.jsx)(o,{className:r,style:n,...i,children:t})},c=e=>{let{placeholder:t="Search...",value:r,onChange:n,style:o,...d}=e;return(0,a.jsxs)(l,{style:o,children:[(0,a.jsx)(i,{placeholder:t,value:r,onChange:n,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...d}),r&&(0,a.jsx)(s,{type:"button",onClick:()=>null===n||void 0===n?void 0:n({target:{value:""}}),"aria-label":"Clear search",children:(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,a.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},u=e=>{let{children:t,...r}=e;return(0,a.jsx)(d,{...r,children:t})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>p,oz:()=>d,tU:()=>s});r(9950);var n=r(4752),a=r(4414);const o=n.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,i=n.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,l=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,s=e=>{let{children:t,className:r,style:n}=e;return(0,a.jsx)(o,{className:r,style:n,children:t})},d=e=>{let{active:t,onClick:r,children:n,className:o}=e;return(0,a.jsx)(i,{active:t,onClick:r,className:o,children:n})},p=e=>{let{count:t,variant:r="default",showZero:n=!1}=e;return 0!==t||n?(0,a.jsx)(l,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>o});var n=r(9950),a=r(4492);function o(e){const[t,r]=(0,a.ok)(),o=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[i,l]=(0,n.useState)(o());return[i,(0,n.useCallback)(e=>{l(e),r({tab:e})},[r])]}},3705:(e,t,r)=>{r.d(t,{cc:()=>a});var n=r(4752);const a=n.Ay.button`
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

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #EF4444;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

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
`},4021:(e,t,r)=>{r.d(t,{i1:()=>i});var n=r(9950),a=r(1367),o=r(6038);const i=()=>{const{user:e}=(0,a.As)(),[t,r]=(0,n.useState)("RM"),[i]=(0,n.useState)(Object.keys(o.DL)),[l,s]=(0,n.useState)(!0),[d,p]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let a=n>=0?t[n+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return r("RM"),void s(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),n=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"MYR";r(n)}else r("MYR")}catch(i){console.error("Failed to fetch restaurant currency:",i),p("Failed to load currency settings"),r("MYR")}finally{s(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:i,loading:l,error:d}}},4877:(e,t,r)=>{r.d(t,{A:()=>f});var n=r(9950),a=r(4752),o=r(4414);const i=a.Ay.div`
  margin-bottom: 16px;
`,l=a.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,s=a.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,d=a.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,p=a.Ay.div`
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
`,c=a.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,u=a.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,x=a.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,g=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,h=a.Ay.label`
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
`,b=a.Ay.button`
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
`,m=a.Ay.input`
  display: none;
`,v=a.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,w=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",f=e=>{let{value:t,onChange:r,label:a="Logo Upload",helpText:f="Upload an image for your logo",maxSize:y=2,previewSize:F=150,showRemoveButton:k=!0,changeButtonText:A="Change Image",removeButtonText:C="Remove Image",imageAltText:B="Uploaded"}=e;const[j,E]=(0,n.useState)(!1),[$,D]=(0,n.useState)(!1),z=(0,n.useRef)(null),U=(0,n.useRef)(null),S=async e=>{try{const t=localStorage.getItem("auth_token"),r=await fetch(`${w()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),n=await r.json();return n.success?n.data.original:(console.error("Image upload failed:",n.message),null)}catch(t){return console.error("Image upload error:",t),null}},L=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*y*1024)return void alert(`Image size should be less than ${y}MB`);if(D(!0),"image/svg+xml"===e.type){const t=new FileReader;return t.onload=async e=>{var t;const n=null===(t=e.target)||void 0===t?void 0:t.result,a=await S(n);D(!1),a?r(a):alert("Failed to upload image. Please try again.")},void t.readAsDataURL(e)}const t=new FileReader;t.onload=async t=>{var n;const a=new Image;a.onload=async()=>{const t=document.createElement("canvas"),n=t.getContext("2d");if(!n)return void D(!1);const o=1200;let i=a.width,l=a.height;(i>o||l>o)&&(i>l?(l=l/i*o,i=o):(i=i/l*o,l=o)),t.width=i,t.height=l,n.drawImage(a,0,0,i,l);const s="image/png"===e.type?t.toDataURL("image/png"):t.toDataURL("image/jpeg",.85),d=await S(s);D(!1),d?r(d):alert("Failed to upload image. Please try again.")},a.src=null===(n=t.target)||void 0===n?void 0:n.result},t.readAsDataURL(e)},R=e=>{if($)return;const t=e.target.files;t&&t.length>0&&L(t[0]),e.target.value=""};return(0,o.jsxs)(i,{children:[a&&(0,o.jsx)(l,{children:a}),f&&(0,o.jsx)(s,{children:f}),(0,o.jsxs)(d,{children:[(0,o.jsx)(p,{ref:U,isDragging:j,hasImage:!!t,isUploading:$,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),$||E(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===U.current&&E(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),E(!1),$)return;const t=e.dataTransfer.files;t&&t.length>0&&L(t[0])},onClick:()=>{var e;t||$||(null===(e=z.current)||void 0===e||e.click())},children:$?(0,o.jsxs)(c,{children:[(0,o.jsx)(v,{}),(0,o.jsx)(u,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,o.jsx)("img",{src:(I=t,I?I.startsWith("http")?I:I.startsWith("/uploads/")?`${w()}${I}`:I:""),alt:B}):(0,o.jsxs)(c,{children:[(0,o.jsx)(u,{children:j?"Drop image here":"Drag & drop or click to upload"}),(0,o.jsxs)(x,{children:["PNG, JPG, GIF up to ",y,"MB"]})]})}),t&&!$&&(0,o.jsxs)(g,{children:[(0,o.jsxs)(h,{disabled:$,children:[A,(0,o.jsx)("input",{ref:z,type:"file",accept:"image/*",onChange:R,disabled:$})]}),k&&(0,o.jsx)(b,{onClick:()=>{r("")},disabled:$,children:C})]})]}),!t&&!$&&(0,o.jsx)(m,{ref:z,type:"file",accept:"image/*",onChange:R})]});var I}},7617:(e,t,r)=>{r.d(t,{A:()=>x});r(9950);var n=r(7119),a=r(4752),o=r(9610),i=r(4414);const l=a.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,s=a.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=a.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,p=a.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,c=a.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=a.Ay.button`
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
`,x=e=>{let{isOpen:t,title:r,message:a,onConfirm:x,onCancel:g,confirmText:h="Confirm",cancelText:b="Cancel",type:m="warning"}=e;return t?n.createPortal((0,i.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&g()},style:{zIndex:1100},children:(0,i.jsxs)(l,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(s,{children:[(0,i.jsx)(d,{children:r}),(0,i.jsx)(p,{children:a})]}),(0,i.jsxs)(c,{children:[(0,i.jsx)(u,{variant:"secondary",onClick:g,children:b}),(0,i.jsx)(u,{variant:"primary",type:m,onClick:x,children:h})]})]})}),document.body):null}},9194:(e,t,r)=>{r.d(t,{A:()=>b});var n=r(9950),a=r(4752),o=r(4414);const i=a.Ay.div`
  position: relative;
  width: 100%;
`,l=a.Ay.div`
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
`,s=a.Ay.input`
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
`,d=a.Ay.button`
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
`,p=a.Ay.div`
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
`,c=a.Ay.div`
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
`,u=a.Ay.div`
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
`,g=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,h=a.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,b=e=>{let{options:t,value:r,onChange:a,placeholder:b="Select...",disabled:m=!1,allowClear:v=!0,noOptionsMessage:w="No options found"}=e;const[f,y]=(0,n.useState)(!1),[F,k]=(0,n.useState)(""),[A,C]=(0,n.useState)(-1),B=(0,n.useRef)(null),j=(0,n.useRef)(null),E=t.find(e=>e.value===r),$=t.filter(e=>e.label.toLowerCase().includes(F.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(F.toLowerCase()));(0,n.useEffect)(()=>{const e=e=>{B.current&&!B.current.contains(e.target)&&(y(!1),k(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,n.useEffect)(()=>{f||(k(""),C(-1))},[f]);const D=e=>{a(e.value),y(!1),k("")},z=f?F:(null===E||void 0===E?void 0:E.label)||"";return(0,o.jsxs)(i,{ref:B,children:[(0,o.jsxs)(l,{isOpen:f,disabled:m,onClick:()=>{var e;m||(y(!0),null===(e=j.current)||void 0===e||e.focus())},children:[(0,o.jsx)(s,{ref:j,type:"text",value:z,onChange:e=>{k(e.target.value),C(0),f||y(!0)},onKeyDown:e=>{if(!m)switch(e.key){case"ArrowDown":e.preventDefault(),f?C(e=>e<$.length-1?e+1:e):y(!0);break;case"ArrowUp":e.preventDefault(),C(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),f&&A>=0&&$[A]?D($[A]):f||y(!0);break;case"Escape":y(!1),k("")}},placeholder:b,disabled:m}),v&&r&&!m&&(0,o.jsx)(d,{onClick:e=>{e.stopPropagation(),a(null),k("")},type:"button",children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,o.jsx)(p,{isOpen:f,children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,o.jsx)(c,{isOpen:f,children:$.length>0?$.map((e,t)=>(0,o.jsxs)(u,{isSelected:e.value===r,isHighlighted:t===A,onClick:()=>D(e),onMouseEnter:()=>C(t),children:[(0,o.jsx)(x,{children:e.label}),e.subLabel&&(0,o.jsx)(g,{children:e.subLabel})]},e.value)):(0,o.jsx)(h,{children:w})})]})}}}]);