"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9134],{2488:(e,t,r)=>{r.d(t,{DO:()=>p,Jt:()=>x,Qn:()=>c});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,a=i.Ay.input`
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
`,s=i.Ay.div`
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
`,d=i.Ay.button`
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
`,l=i.Ay.select`
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
`,c=e=>{let{children:t,className:r,style:i,...a}=e;return(0,n.jsx)(o,{className:r,style:i,...a,children:t})},p=e=>{let{placeholder:t="Search...",value:r,onChange:i,style:o,...l}=e;return(0,n.jsxs)(s,{style:o,children:[(0,n.jsx)(a,{placeholder:t,value:r,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...l}),r&&(0,n.jsx)(d,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:t,...r}=e;return(0,n.jsx)(l,{...r,children:t})}},2597:(e,t,r)=>{r.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});r(9950);var i=r(4752),n=r(4414);const o=i.Ay.div`
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
`,a=i.Ay.button`
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
`,s=i.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:t,className:r,style:i}=e;return(0,n.jsx)(o,{className:r,style:i,children:t})},l=e=>{let{active:t,onClick:r,children:i,className:o}=e;return(0,n.jsx)(a,{active:t,onClick:r,className:o,children:i})},c=e=>{let{count:t,variant:r="default",showZero:i=!1}=e;return 0!==t||i?(0,n.jsx)(s,{variant:r,children:t}):null}},2653:(e,t,r)=>{r.d(t,{M:()=>o});var i=r(9950),n=r(4492);function o(e){const[t,r]=(0,n.ok)(),o=(0,i.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,i.useState)(o());return[a,(0,i.useCallback)(e=>{s(e),r({tab:e})},[r])]}},3705:(e,t,r)=>{r.d(t,{cc:()=>n});var i=r(4752);const n=i.Ay.button`
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
`;i.Ay.select`
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
`,i.Ay.input`
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
`,i.Ay.div`
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
`},4877:(e,t,r)=>{r.d(t,{A:()=>v});var i=r(9950),n=r(4752),o=r(4414);const a=n.Ay.div`
  margin-bottom: 16px;
`,s=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,d=n.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,l=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,c=n.Ay.div`
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
`,p=n.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,x=n.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,u=n.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,h=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=n.Ay.label`
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
`,m=n.Ay.button`
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
`,b=n.Ay.input`
  display: none;
`,y=n.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,f=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",v=e=>{let{value:t,onChange:r,label:n="Logo Upload",helpText:v="Upload an image for your logo",maxSize:j=2,previewSize:w=150,showRemoveButton:F=!0,changeButtonText:C="Change Image",removeButtonText:k="Remove Image",imageAltText:A="Uploaded"}=e;const[E,B]=(0,i.useState)(!1),[_,S]=(0,i.useState)(!1),z=(0,i.useRef)(null),$=(0,i.useRef)(null),D=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*j*1024)return void alert(`Image size should be less than ${j}MB`);S(!0);const t=new FileReader;t.onload=async e=>{var t;const i=new Image;i.onload=async()=>{const e=document.createElement("canvas"),t=e.getContext("2d");if(!t)return void S(!1);const n=1200;let o=i.width,a=i.height;(o>n||a>n)&&(o>a?(a=a/o*n,o=n):(o=o/a*n,a=n)),e.width=o,e.height=a,t.drawImage(i,0,0,o,a);const s=e.toDataURL("image/jpeg",.85),d=await(async e=>{try{const t=localStorage.getItem("auth_token"),r=await fetch(`${f()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),i=await r.json();return i.success?i.data.original:(console.error("Image upload failed:",i.message),null)}catch(t){return console.error("Image upload error:",t),null}})(s);S(!1),d?r(d):alert("Failed to upload image. Please try again.")},i.src=null===(t=e.target)||void 0===t?void 0:t.result},t.readAsDataURL(e)},L=e=>{if(_)return;const t=e.target.files;t&&t.length>0&&D(t[0]),e.target.value=""};return(0,o.jsxs)(a,{children:[n&&(0,o.jsx)(s,{children:n}),v&&(0,o.jsx)(d,{children:v}),(0,o.jsxs)(l,{children:[(0,o.jsx)(c,{ref:$,isDragging:E,hasImage:!!t,isUploading:_,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),_||B(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===$.current&&B(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),B(!1),_)return;const t=e.dataTransfer.files;t&&t.length>0&&D(t[0])},onClick:()=>{var e;t||_||(null===(e=z.current)||void 0===e||e.click())},children:_?(0,o.jsxs)(p,{children:[(0,o.jsx)(y,{}),(0,o.jsx)(x,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,o.jsx)("img",{src:(T=t,T?T.startsWith("http")?T:T.startsWith("/uploads/")?`${f()}${T}`:T:""),alt:A}):(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{children:E?"Drop image here":"Drag & drop or click to upload"}),(0,o.jsxs)(u,{children:["PNG, JPG, GIF up to ",j,"MB"]})]})}),t&&!_&&(0,o.jsxs)(h,{children:[(0,o.jsxs)(g,{disabled:_,children:[C,(0,o.jsx)("input",{ref:z,type:"file",accept:"image/*",onChange:L,disabled:_})]}),F&&(0,o.jsx)(m,{onClick:()=>{r("")},disabled:_,children:k})]})]}),!t&&!_&&(0,o.jsx)(b,{ref:z,type:"file",accept:"image/*",onChange:L})]});var T}},7617:(e,t,r)=>{r.d(t,{A:()=>x});r(9950);var i=r(4752),n=r(9610),o=r(4414);const a=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=i.Ay.p`
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
`,p=i.Ay.button`
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
`,x=e=>{let{isOpen:t,title:r,message:i,onConfirm:x,onCancel:u,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return t?(0,o.jsx)(n.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,o.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(s,{children:[(0,o.jsx)(d,{children:r}),(0,o.jsx)(l,{children:i})]}),(0,o.jsxs)(c,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:u,children:g}),(0,o.jsx)(p,{variant:"primary",type:m,onClick:x,children:h})]})]})}):null}},9134:(e,t,r)=>{r.r(t),r.d(t,{default:()=>ze});var i=r(9950),n=r(8409),o=r(2597),a=r(2653),s=r(1367),d=r(4752),l=r(2853),c=r(3705),p=r(2488),x=r(9610),u=r(4877),h=r(7617),g=r(9194),m=r(4414);const b=d.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,y=d.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>e.isActive?1:.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,f=d.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`,v=d.Ay.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${e=>e.src?`url(${e.src}) center/cover`:"#F3F4F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 28px;
`,j=d.Ay.div`
  flex: 1;
  min-width: 0;
`,w=d.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,F=d.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,C=d.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,k=d.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,A=d.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,E=d.Ay.span`
  color: #6B7280;
`,B=d.Ay.span`
  color: #0A2540;
  font-weight: 500;
`,_=d.Ay.span`
  color: #059669;
  font-weight: 600;
  font-size: 16px;
`,S=d.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,z=d.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${e=>"danger"===e.variant?"#FEE2E2":"#E6EBF1"};
  background: ${e=>"danger"===e.variant?"#FEF2F2":"#F9FAFB"};
  color: ${e=>"danger"===e.variant?"#DC2626":"#374151"};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${e=>"danger"===e.variant?"#FEE2E2":"#F3F4F6"};
    border-color: ${e=>"danger"===e.variant?"#FECACA":"#D1D5DB"};
  }
`,$=d.Ay.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,D=d.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 20px 0;
`,L=d.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`,T=d.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: ${e=>e.color||"#E5E7EB"};
  color: #374151;
  border-radius: 4px;
  font-size: 11px;
`,q=(0,d.Ay)(T)`
  background: #DBEAFE;
  color: #1E40AF;
`,O=(0,d.Ay)(T)`
  background: #E5E7EB;
  color: #374151;
`,P=d.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
`,R=d.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`,M=d.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    border-color: #635BFF;
  }

  input:checked + span {
    color: #635BFF;
    font-weight: 500;
  }
`,N=e=>{let{brands:t,onCountChange:r,categoryRefreshKey:n,optionRefreshKey:o}=e;const[a,s]=(0,i.useState)([]),[d,T]=(0,i.useState)([]),[N,U]=(0,i.useState)([]),[I,G]=(0,i.useState)([]),[W,Q]=(0,i.useState)(!0),[Z,J]=(0,i.useState)(""),[Y,H]=(0,i.useState)("all"),[K,V]=(0,i.useState)("all"),[X,ee]=(0,i.useState)(!1),[te,re]=(0,i.useState)(null),[ie,ne]=(0,i.useState)(!1),[oe,ae]=(0,i.useState)(null),[se,de]=(0,i.useState)({name:"",description:"",sku:"",unit:"",base_quantity:"1",unit_price:"",min_order_quantity:"1",category_id:"",image_url:"",is_active:!0,product_recipe_id:null,brand_ids:[],option_group_ids:[]}),[le,ce]=(0,i.useState)(null),[pe,xe]=(0,i.useState)(!1),ue=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]),he=(0,i.useCallback)(async()=>{try{const e=ue(),t=await fetch("/api/brand-products",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&(s(i.data),r(i.data.length))}catch(e){console.error("Failed to fetch products:",e)}},[ue,r]),ge=(0,i.useCallback)(async()=>{try{const e=ue(),t=await fetch("/api/brand-product-categories",{headers:{Authorization:`Bearer ${e}`}}),r=await t.json();r.success&&T(r.data)}catch(e){console.error("Failed to fetch categories:",e)}},[ue]),me=(0,i.useCallback)(async()=>{try{const e=ue(),t=await fetch("/api/brand-product-option-groups",{headers:{Authorization:`Bearer ${e}`}}),r=await t.json();r.success&&U(r.data)}catch(e){console.error("Failed to fetch option groups:",e)}},[ue]),be=(0,i.useCallback)(async()=>{try{const e=ue(),t=await fetch("/api/product-recipes",{headers:{Authorization:`Bearer ${e}`}}),r=await t.json();r.success&&G(r.data||[])}catch(e){console.error("Failed to fetch product recipes:",e)}},[ue]);(0,i.useEffect)(()=>{(async()=>{Q(!0),await Promise.all([he(),ge(),me(),be()]),Q(!1)})()},[he,ge,me,be]),(0,i.useEffect)(()=>{void 0!==n&&ge()},[n,ge]),(0,i.useEffect)(()=>{void 0!==o&&me()},[o,me]);const ye=e=>{var t,r,i;e?(re(e),de({name:e.name,description:e.description||"",sku:e.sku||"",unit:e.unit||"",base_quantity:(e.base_quantity||1).toString(),unit_price:e.unit_price.toString(),min_order_quantity:e.min_order_quantity.toString(),category_id:(null===(t=e.category_id)||void 0===t?void 0:t.toString())||"",image_url:e.image_url||"",is_active:e.is_active,product_recipe_id:e.product_recipe_id||null,brand_ids:(null===(r=e.brands)||void 0===r?void 0:r.map(e=>e.id))||[],option_group_ids:(null===(i=e.optionGroups)||void 0===i?void 0:i.map(e=>e.id))||[]})):(re(null),de({name:"",description:"",sku:"",unit:"",base_quantity:"1",unit_price:"",min_order_quantity:"1",category_id:d.length>0?d[0].id.toString():"",image_url:"",is_active:!0,product_recipe_id:null,brand_ids:[],option_group_ids:[]}));ee(!0)},fe=()=>{ee(!1),re(null),ce(null)},ve=a.filter(e=>{var t,r;const i=e.name.toLowerCase().includes(Z.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(Z.toLowerCase()),n="all"===Y||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===Y,o="all"===K||(null===(r=e.brands)||void 0===r?void 0:r.some(e=>e.id.toString()===K));return i&&n&&o});return W?(0,m.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading products..."}):(0,m.jsxs)("div",{children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,m.jsxs)(p.Qn,{style:{marginBottom:0},children:[(0,m.jsx)(p.DO,{type:"text",placeholder:"Search products...",value:Z,onChange:e=>J(e.target.value)}),(0,m.jsxs)(p.Jt,{value:Y,onChange:e=>H(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Categories"}),d.map(e=>(0,m.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]}),(0,m.jsxs)(p.Jt,{value:K,onChange:e=>V(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Brands"}),t.map(e=>(0,m.jsx)("option",{value:e.id.toString(),children:e.name},e.id))]})]}),(0,m.jsx)(c.cc,{onClick:()=>ye(),style:{flexShrink:0},children:"Add Product"})]}),0===ve.length?(0,m.jsxs)(l.pp,{children:[(0,m.jsx)($,{children:Z||"all"!==Y||"all"!==K?"No products found":"No products yet"}),(0,m.jsx)(D,{children:Z||"all"!==Y||"all"!==K?"Try adjusting your search or filter criteria.":"Start by adding your first product."}),!Z&&"all"===Y&&"all"===K&&(0,m.jsx)(c.cc,{onClick:()=>ye(),children:"Add Product"})]}):(0,m.jsx)(b,{children:ve.map(e=>(0,m.jsxs)(y,{isActive:e.is_active,onClick:()=>ye(e),children:[(0,m.jsxs)(f,{children:[(0,m.jsx)(v,{src:e.image_url,children:!e.image_url&&"\ud83d\udce6"}),(0,m.jsxs)(j,{children:[(0,m.jsx)(w,{children:e.name}),e.sku&&(0,m.jsxs)(F,{children:["SKU: ",e.sku]}),e.category&&(0,m.jsxs)(C,{children:[e.category.emoji," ",e.category.name]})]})]}),(0,m.jsxs)(k,{children:[(0,m.jsxs)(A,{children:[(0,m.jsx)(E,{children:"Unit Price"}),(0,m.jsxs)(_,{children:["RM ",(Number(e.unit_price)||0).toFixed(2)]})]}),e.unit&&(0,m.jsxs)(A,{children:[(0,m.jsx)(E,{children:"Unit"}),(0,m.jsx)(B,{children:e.unit})]}),(0,m.jsxs)(A,{children:[(0,m.jsx)(E,{children:"Min Order"}),(0,m.jsx)(B,{children:e.min_order_quantity})]})]}),e.brands&&e.brands.length>0&&(0,m.jsx)(L,{children:e.brands.map(e=>(0,m.jsx)(q,{children:e.name},e.id))}),e.optionGroups&&e.optionGroups.length>0&&(0,m.jsx)(L,{children:e.optionGroups.map(e=>(0,m.jsx)(O,{children:e.name},e.id))}),(0,m.jsxs)(S,{onClick:e=>e.stopPropagation(),children:[(0,m.jsx)(z,{onClick:()=>ye(e),children:"Edit"}),(0,m.jsx)(z,{variant:"danger",onClick:t=>((e,t)=>{t.stopPropagation(),ae(e),ne(!0)})(e,t),children:"Delete"})]})]},e.id))}),X&&(0,m.jsx)(x.aF,{isOpen:X,onClose:fe,title:te?"Edit Product":"Add Product",maxWidth:"700px",children:(0,m.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),!pe)if(ce(null),se.name.trim())if(se.unit){xe(!0);try{const e=ue(),t=te?"PUT":"POST",r=te?`/api/brand-products/${te.id}`:"/api/brand-products",i=await fetch(r,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:se.name.trim(),description:se.description.trim()||null,sku:se.sku.trim()||null,unit:se.unit||null,base_quantity:parseFloat(se.base_quantity)||1,unit_price:parseFloat(se.unit_price)||0,min_order_quantity:parseInt(se.min_order_quantity)||1,category_id:se.category_id?parseInt(se.category_id):null,image_url:se.image_url||null,is_active:se.is_active,product_recipe_id:se.product_recipe_id,brand_ids:se.brand_ids,option_group_ids:se.option_group_ids})}),n=await i.json();n.success?(fe(),he()):ce(n.error||"Failed to save product")}catch(t){console.error("Failed to save product:",t),ce("Failed to save product. Please try again.")}finally{xe(!1)}}else ce("Unit is required");else ce("Product name is required")},children:[(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Name *"}),(0,m.jsx)(x.ZQ,{type:"text",value:se.name,onChange:e=>de({...se,name:e.target.value}),placeholder:"Product name",required:!0})]}),(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"SKU"}),(0,m.jsx)(x.ZQ,{type:"text",value:se.sku,onChange:e=>de({...se,sku:e.target.value}),placeholder:"Product code"})]})]}),(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Category"}),(0,m.jsxs)(x.FX,{value:se.category_id,onChange:e=>de({...se,category_id:e.target.value}),children:[(0,m.jsx)("option",{value:"",children:"No category"}),d.map(e=>(0,m.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]})]}),(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Description"}),(0,m.jsx)(x.Lz,{value:se.description,onChange:e=>de({...se,description:e.target.value}),placeholder:"Product description",rows:2})]}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Unit Price (RM) *"}),(0,m.jsx)(x.ZQ,{type:"number",step:"0.01",min:"0",value:se.unit_price,onChange:e=>de({...se,unit_price:e.target.value}),placeholder:"0.00",required:!0})]}),(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Base Qty *"}),(0,m.jsx)(x.ZQ,{type:"number",step:"0.01",min:"0.01",value:se.base_quantity,onChange:e=>de({...se,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Unit *"}),(0,m.jsxs)(x.FX,{value:se.unit,onChange:e=>de({...se,unit:e.target.value}),required:!0,children:[(0,m.jsx)("option",{value:"",children:"Select unit"}),[{value:"kg",label:"kg"},{value:"g",label:"g"},{value:"L",label:"L"},{value:"ml",label:"ml"},{value:"piece",label:"piece"},{value:"pack",label:"pack"},{value:"can",label:"can"},{value:"bottle",label:"bottle"}].map(e=>(0,m.jsx)("option",{value:e.value,children:e.label},e.value))]})]}),(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Min Order Qty"}),(0,m.jsx)(x.ZQ,{type:"number",min:"1",value:se.min_order_quantity,onChange:e=>de({...se,min_order_quantity:e.target.value})})]})]}),(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Product Image"}),(0,m.jsx)(u.A,{value:se.image_url,onChange:e=>de({...se,image_url:e||""}),label:"",helpText:"Upload a product image (max 2MB)"})]}),(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Linked Brands"}),(0,m.jsx)(R,{children:t.map(e=>(0,m.jsxs)(M,{children:[(0,m.jsx)("input",{type:"checkbox",checked:se.brand_ids.includes(e.id),onChange:()=>{return t=e.id,void de(e=>({...e,brand_ids:e.brand_ids.includes(t)?e.brand_ids.filter(e=>e!==t):[...e.brand_ids,t]}));var t}}),(0,m.jsx)("span",{children:e.name})]},e.id))})]}),(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Option Groups"}),N.length>0?(0,m.jsx)(R,{children:N.map(e=>(0,m.jsxs)(M,{children:[(0,m.jsx)("input",{type:"checkbox",checked:se.option_group_ids.includes(e.id),onChange:()=>{return t=e.id,void de(e=>({...e,option_group_ids:e.option_group_ids.includes(t)?e.option_group_ids.filter(e=>e!==t):[...e.option_group_ids,t]}));var t}}),(0,m.jsxs)("span",{children:[e.name," ",e.is_required?"(Required)":""]})]},e.id))}):(0,m.jsx)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px",color:"#6B7280",fontSize:"13px"},children:"No option groups available. Create option groups in the Options tab first."})]}),(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Linked Product Recipe"}),(0,m.jsx)(g.A,{options:I.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:se.product_recipe_id,onChange:e=>de({...se,product_recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No product recipes found"})]}),(0,m.jsx)(x.gE,{style:{marginBottom:0},children:(0,m.jsxs)(P,{children:[(0,m.jsx)("input",{type:"checkbox",checked:se.is_active,onChange:e=>de({...se,is_active:e.target.checked})}),"Active"]})}),(0,m.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,m.jsx)(x.yl,{type:"button",onClick:fe,disabled:pe,children:"Cancel"}),(0,m.jsx)(x.yl,{type:"submit",variant:"primary",disabled:pe,children:pe?"Saving...":te?"Update":"Create"})]}),le&&(0,m.jsx)("div",{style:{marginTop:"16px",padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:le})]})}),(0,m.jsx)(h.A,{isOpen:ie,onCancel:()=>{ne(!1),ae(null)},onConfirm:async()=>{if(oe)try{const e=ue(),t=await fetch(`/api/brand-products/${oe.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),r=await t.json();r.success?(ne(!1),ae(null),he()):alert(r.error||"Failed to delete product")}catch(e){console.error("Failed to delete product:",e),alert("Failed to delete product")}},title:"Delete Product",message:`Are you sure you want to delete "${null===oe||void 0===oe?void 0:oe.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},U=d.Ay.div`
  margin-top: 24px;
`,I=d.Ay.div`
  display: grid;
  gap: 12px;
`,G=d.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${e=>!1!==e.isActive?1:.6};

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,W=d.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,Q=d.Ay.div`
  flex: 1;
`,Z=d.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,J=d.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,Y=d.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,H=d.Ay.div`
  display: flex;
  gap: 8px;
`,K=d.Ay.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
    transform: translateY(-1px);

    svg {
      color: #635BFF;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
    transition: color 0.15s;
  }
`,V=d.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,X=d.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,ee=d.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,te=d.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,re=d.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ie=d.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,ne=d.Ay.button`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: ${e=>e.selected?"#E5E7EB":"white"};
  border: 1px solid ${e=>e.selected?"#9CA3AF":"#E5E7EB"};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${e=>e.selected?"#E5E7EB":"#F3F4F6"};
  }
`,oe=e=>{let{onCountChange:t,onCategoryChange:r}=e;const[o,a]=(0,i.useState)([]),[s,d]=(0,i.useState)(!0),[p,u]=(0,i.useState)(!1),[g,b]=(0,i.useState)(null),[y,f]=(0,i.useState)(!1),[v,j]=(0,i.useState)(null),[w,F]=(0,i.useState)({name:"",emoji:"",description:""}),C=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]),k=(0,i.useCallback)(async()=>{try{const e=C(),r=await fetch("/api/brand-product-categories",{headers:{Authorization:`Bearer ${e}`}}),i=await r.json();i.success&&(a(i.data),t(i.data.length))}catch(e){console.error("Failed to fetch categories:",e)}finally{d(!1)}},[C,t]);(0,i.useEffect)(()=>{d(!0),k()},[k]);const A=e=>{e?(b(e),F({name:e.name,emoji:e.emoji||"",description:e.description||""})):(b(null),F({name:"",emoji:"",description:""})),u(!0)},E=()=>{u(!1),b(null),F({name:"",emoji:"",description:""})},B=async(e,t)=>{try{const r=C(),i=await fetch(`/api/brand-product-categories/${e}/reorder`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({direction:t})}),n=await i.json();n.success?k():alert(n.error||"Failed to reorder")}catch(r){console.error("Failed to reorder category:",r)}};return s?(0,m.jsx)(U,{children:(0,m.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading categories..."})}):(0,m.jsxs)(U,{children:[(0,m.jsxs)(ee,{children:[(0,m.jsx)(te,{children:"Product Categories"}),(0,m.jsx)(c.cc,{onClick:()=>A(),children:"Add Category"})]}),0===o.length?(0,m.jsxs)(l.pp,{children:[(0,m.jsx)(V,{children:"No categories yet"}),(0,m.jsx)(X,{children:"Create your first product category to organize your products."}),(0,m.jsx)(c.cc,{onClick:()=>A(),children:"Add Category"})]}):(0,m.jsx)(I,{children:o.map((e,t)=>(0,m.jsxs)(G,{isActive:e.is_active,children:[(0,m.jsx)(n.Xd,{onMoveUp:()=>B(e.id,"up"),onMoveDown:()=>B(e.id,"down"),disableUp:0===t,disableDown:t===o.length-1}),(0,m.jsx)(W,{children:e.emoji||"\ud83d\udce6"}),(0,m.jsxs)(Q,{children:[(0,m.jsx)(Z,{children:e.name}),(0,m.jsxs)(J,{children:[(0,m.jsxs)("span",{children:[e.product_count||0," products"]}),(0,m.jsx)(re,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,m.jsx)(Y,{children:e.description})]}),(0,m.jsxs)(H,{children:[(0,m.jsx)(K,{onClick:()=>A(e),title:"Edit",children:(0,m.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,m.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"}),(0,m.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,m.jsx)(K,{onClick:()=>(e=>{j(e),f(!0)})(e),title:"Delete",children:(0,m.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,m.jsx)("path",{d:"M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"}),(0,m.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),(0,m.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17"})]})})]})]},e.id))}),p&&(0,m.jsx)(x.aF,{isOpen:p,onClose:E,title:g?"Edit Category":"Add Category",children:(0,m.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),w.name.trim())try{const e=C(),t=g?"PUT":"POST",i=g?`/api/brand-product-categories/${g.id}`:"/api/brand-product-categories",n=await fetch(i,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:w.name.trim(),emoji:w.emoji||null,description:w.description.trim()||null})}),o=await n.json();o.success?(E(),k(),null===r||void 0===r||r()):alert(o.error||"Failed to save")}catch(t){console.error("Failed to save category:",t),alert("Failed to save")}},children:[(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Name *"}),(0,m.jsx)(x.ZQ,{type:"text",value:w.name,onChange:e=>F({...w,name:e.target.value}),placeholder:"Category name",required:!0})]}),(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Emoji"}),(0,m.jsx)(ie,{children:["\ud83d\udce6","\ud83e\udd6b","\ud83e\uddc2","\ud83c\udf3e","\ud83e\udd5b","\ud83e\uddc8","\ud83e\udd5a","\ud83c\udf56","\ud83e\udd69","\ud83c\udf57","\ud83d\udc1f","\ud83e\udd90","\ud83e\udd91","\ud83e\udd6c","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83c\udf36\ufe0f","\ud83c\udf4b","\ud83c\udf4a","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd65","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf6f","\ud83e\uded2","\ud83e\uddca","\ud83c\udf76","\ud83e\uded9","\ud83e\uddf4","\ud83e\uddc3","\ud83c\udf75","\u2615","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd64","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf6b","\ud83c\udf6c","\ud83c\udf6d","\ud83e\uddc7","\ud83e\udd50","\ud83c\udf5e"].map(e=>(0,m.jsx)(ne,{type:"button",selected:w.emoji===e,onClick:()=>F({...w,emoji:e}),children:e},e))})]}),(0,m.jsxs)(x.gE,{children:[(0,m.jsx)(x.lR,{children:"Description"}),(0,m.jsx)(x.Lz,{value:w.description,onChange:e=>F({...w,description:e.target.value}),placeholder:"Category description (optional)",rows:3})]}),(0,m.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,m.jsx)(x.yl,{type:"button",onClick:E,children:"Cancel"}),(0,m.jsx)(x.yl,{type:"submit",variant:"primary",children:g?"Update":"Create"})]})]})}),(0,m.jsx)(h.A,{isOpen:y,onCancel:()=>{f(!1),j(null)},onConfirm:async()=>{if(v)try{const e=C(),t=await fetch(`/api/brand-product-categories/${v.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success?(f(!1),j(null),k(),null===r||void 0===r||r()):alert(i.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:`Are you sure you want to delete "${null===v||void 0===v?void 0:v.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},ae=d.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 20px;
`,se=d.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  width: 300px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,de=d.Ay.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  ${e=>{switch(e.variant){case"danger":return"\n          background: #EF4444;\n          color: white;\n          &:hover { background: #DC2626; }\n        ";case"secondary":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E5E7EB;\n          &:hover { background: #F9FAFB; }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n          &:hover { background: #5246ED; }\n        "}}}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,le=d.Ay.div`
  display: grid;
  gap: 16px;
`,ce=d.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,pe=d.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,xe=d.Ay.div`
  flex: 1;
`,ue=d.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,he=d.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,ge=d.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>"required"===e.type?"\n    background: #FEE2E2;\n    color: #DC2626;\n  ":"\n    background: #E0F2FE;\n    color: #0369A1;\n  "}
`,me=d.Ay.div`
  display: flex;
  gap: 8px;
`,be=d.Ay.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }

  svg {
    width: 16px;
    height: 16px;
    color: #6B7280;
  }
`,ye=d.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,fe=d.Ay.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`,ve=d.Ay.span`
  margin-left: 6px;
  color: #6B7280;
  font-size: 12px;
`,je=d.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,we=d.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,Fe=d.Ay.div`
  margin-bottom: 20px;
`,Ce=d.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,ke=d.Ay.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Ae=d.Ay.div`
  display: flex;
  gap: 16px;
`,Ee=d.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
`,Be=d.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,_e=d.Ay.button`
  background: #FEE2E2;
  color: #DC2626;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #FECACA;
  }
`,Se=e=>{let{onCountChange:t}=e;const[r,n]=(0,i.useState)([]),[o,a]=(0,i.useState)(!0),[s,d]=(0,i.useState)(""),[c,p]=(0,i.useState)(!1),[u,h]=(0,i.useState)(!1),[g,b]=(0,i.useState)(null),[y,f]=(0,i.useState)(null),[v,j]=(0,i.useState)({name:"",is_required:!1,options:[]}),[w,F]=(0,i.useState)({name:"",price_adjustment:0}),C=(0,i.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/brand-product-option-groups",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();e.success&&(n(e.data),t(e.data.length))}}catch(e){console.error("Error fetching option groups:",e)}finally{a(!1)}},[t]);(0,i.useEffect)(()=>{C()},[C]);const k=e=>{e?(b(e),j({name:e.name,is_required:e.is_required,options:e.options.map(e=>({...e}))})):(b(null),j({name:"",is_required:!1,options:[]})),p(!0)},A=()=>{p(!1),b(null),j({name:"",is_required:!1,options:[]}),F({name:"",price_adjustment:0})},E=r.filter(e=>e.name.toLowerCase().includes(s.toLowerCase()));return o?(0,m.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7280"},children:"Loading..."}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(ae,{children:[(0,m.jsx)(se,{type:"text",placeholder:"Search option groups...",value:s,onChange:e=>d(e.target.value)}),(0,m.jsx)(de,{onClick:()=>k(),children:"Add Option Group"})]}),0===E.length?(0,m.jsxs)(l.pp,{children:[(0,m.jsx)(je,{children:"No option groups yet"}),(0,m.jsx)(we,{children:"Create option groups to add customizable options to your products"}),(0,m.jsx)(de,{onClick:()=>k(),children:"Add Option Group"})]}):(0,m.jsx)(le,{children:E.map(e=>(0,m.jsxs)(ce,{children:[(0,m.jsxs)(pe,{children:[(0,m.jsxs)(xe,{children:[(0,m.jsx)(ue,{children:e.name}),(0,m.jsxs)(he,{children:[(0,m.jsx)(ge,{type:e.is_required?"required":"optional",children:e.is_required?"Required":"Optional"}),(0,m.jsxs)("span",{style:{fontSize:"13px",color:"#6B7280"},children:[e.options.length," options"]})]})]}),(0,m.jsxs)(me,{children:[(0,m.jsx)(be,{onClick:()=>k(e),children:(0,m.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,m.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,m.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,m.jsx)(be,{onClick:()=>{return t=e.id,f(t),void h(!0);var t},children:(0,m.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,m.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,m.jsx)(ye,{children:e.options.map((e,t)=>(0,m.jsxs)(fe,{children:[e.name,0!==e.price_adjustment&&(0,m.jsxs)(ve,{children:[Number(e.price_adjustment)>0?"+":"","RM ",(Number(e.price_adjustment)||0).toFixed(2)]})]},t))})]},e.id))}),(0,m.jsxs)(x.aF,{isOpen:c,onClose:A,title:g?"Edit Option Group":"New Option Group",children:[(0,m.jsxs)(Fe,{children:[(0,m.jsx)(Ce,{children:"Group Name"}),(0,m.jsx)(ke,{type:"text",value:v.name,onChange:e=>j({...v,name:e.target.value}),placeholder:"e.g., Size, Grade, Packaging"})]}),(0,m.jsx)(Fe,{children:(0,m.jsx)(Ae,{children:(0,m.jsxs)(Ee,{children:[(0,m.jsx)("input",{type:"checkbox",checked:v.is_required,onChange:e=>j({...v,is_required:e.target.checked})}),"Required Selection"]})})}),(0,m.jsxs)(Fe,{children:[(0,m.jsx)(Ce,{children:"Options"}),(0,m.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"12px"},children:[(0,m.jsx)(ke,{type:"text",value:w.name,onChange:e=>F({...w,name:e.target.value}),placeholder:"Option name",style:{flex:2}}),(0,m.jsx)(ke,{type:"number",value:w.price_adjustment,onChange:e=>F({...w,price_adjustment:parseFloat(e.target.value)||0}),placeholder:"Price adj.",step:"0.50",style:{flex:1}}),(0,m.jsx)(de,{type:"button",variant:"secondary",onClick:()=>{if(!w.name.trim())return;const e=isNaN(w.price_adjustment)?0:w.price_adjustment;j(t=>({...t,options:[...t.options,{name:w.name.trim(),price_adjustment:e}]})),F({name:"",price_adjustment:0})},disabled:!w.name.trim(),children:"Add"})]}),v.options.map((e,t)=>(0,m.jsxs)(Be,{children:[(0,m.jsxs)("div",{style:{flex:1},children:[(0,m.jsx)("strong",{children:e.name}),0!==e.price_adjustment&&(0,m.jsxs)("span",{style:{marginLeft:"8px",color:"#6B7280"},children:["(",Number(e.price_adjustment)>0?"+":"","RM ",(Number(e.price_adjustment)||0).toFixed(2),")"]})]}),(0,m.jsx)(_e,{onClick:()=>{return e=t,void j(t=>({...t,options:t.options.filter((t,r)=>r!==e)}));var e},children:"x"})]},t))]}),(0,m.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,m.jsx)(de,{type:"button",variant:"secondary",onClick:A,children:"Cancel"}),(0,m.jsx)(de,{type:"button",onClick:async()=>{if(v.name.trim()&&0!==v.options.length)try{const e=localStorage.getItem("auth_token"),t=g?`/api/brand-product-option-groups/${g.id}`:"/api/brand-product-option-groups",r=g?"PUT":"POST";(await fetch(t,{method:r,headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:v.name,is_required:v.is_required,options:v.options})})).ok&&(C(),A())}catch(e){console.error("Error saving option group:",e)}},disabled:!v.name.trim()||0===v.options.length,children:g?"Update":"Create"})]})]}),(0,m.jsxs)(x.aF,{isOpen:u,onClose:()=>h(!1),title:"Delete Option Group",children:[(0,m.jsx)("p",{children:"Are you sure you want to delete this option group? This action cannot be undone."}),(0,m.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,m.jsx)(de,{type:"button",variant:"secondary",onClick:()=>h(!1),children:"Cancel"}),(0,m.jsx)(de,{type:"button",variant:"danger",onClick:async()=>{if(y)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/brand-product-option-groups/${y}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(t.ok)C();else{const e=await t.json();alert(e.error||"Failed to delete option group")}}catch(e){console.error("Error deleting option group:",e)}finally{h(!1),f(null)}},children:"Delete"})]})]})]})},ze=()=>{const{user:e}=(0,s.As)(),[t,r]=(0,a.M)("products"),[d,l]=(0,i.useState)(0),[c,p]=(0,i.useState)(0),[x,u]=(0,i.useState)(0),[h,g]=(0,i.useState)([]),[b,y]=(0,i.useState)(!0),[f,v]=(0,i.useState)(0),[j]=(0,i.useState)(0);(0,i.useEffect)(()=>{!e||"Brand General"!==e.role&&"Brand Manager"!==e.role?y(!1):w()},[e]);const w=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();g(e)}}catch(e){console.error("Error fetching brands:",e)}finally{y(!1)}};return b?(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(n.mc,{children:[(0,m.jsx)(n.Y9,{children:(0,m.jsx)(n.hE,{children:"Product Management"})}),(0,m.jsx)(n.UC,{children:(0,m.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})}):(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(n.mc,{children:[(0,m.jsx)(n.Y9,{children:(0,m.jsx)(n.hE,{children:"Product Management"})}),(0,m.jsxs)(n.UC,{children:[(0,m.jsxs)(o.tU,{children:[(0,m.jsxs)(o.oz,{active:"products"===t,onClick:()=>r("products"),children:["Products",(0,m.jsx)(o.Ex,{count:d,showZero:!0})]}),(0,m.jsxs)(o.oz,{active:"categories"===t,onClick:()=>r("categories"),children:["Categories",(0,m.jsx)(o.Ex,{count:c,showZero:!0})]}),(0,m.jsxs)(o.oz,{active:"options"===t,onClick:()=>r("options"),children:["Options",(0,m.jsx)(o.Ex,{count:x,showZero:!0})]})]}),(0,m.jsx)("div",{style:{display:"products"===t?"block":"none"},children:(0,m.jsx)(N,{brands:h,onCountChange:l,categoryRefreshKey:f,optionRefreshKey:j})}),(0,m.jsx)("div",{style:{display:"categories"===t?"block":"none"},children:(0,m.jsx)(oe,{onCountChange:p,onCategoryChange:()=>v(e=>e+1)})}),(0,m.jsx)("div",{style:{display:"options"===t?"block":"none"},children:(0,m.jsx)(Se,{onCountChange:u})})]})]})})}},9194:(e,t,r)=>{r.d(t,{A:()=>m});var i=r(9950),n=r(4752),o=r(4414);const a=n.Ay.div`
  position: relative;
  width: 100%;
`,s=n.Ay.div`
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
`,d=n.Ay.input`
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
`,l=n.Ay.button`
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
`,c=n.Ay.div`
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
`,p=n.Ay.div`
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
`,x=n.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.isSelected?"#F0F4FF":e.isHighlighted?"#F9FAFB":"white"};
  color: ${e=>e.isSelected?"#635BFF":"#0A2540"};
  font-weight: ${e=>e.isSelected?"500":"400"};
  transition: background 0.15s;

  &:hover {
    background: ${e=>e.isSelected?"#F0F4FF":"#F9FAFB"};
  }
`,u=n.Ay.div`
  font-size: 14px;
`,h=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,g=n.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,m=e=>{let{options:t,value:r,onChange:n,placeholder:m="Select...",disabled:b=!1,allowClear:y=!0,noOptionsMessage:f="No options found"}=e;const[v,j]=(0,i.useState)(!1),[w,F]=(0,i.useState)(""),[C,k]=(0,i.useState)(-1),A=(0,i.useRef)(null),E=(0,i.useRef)(null),B=t.find(e=>e.value===r),_=t.filter(e=>e.label.toLowerCase().includes(w.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(w.toLowerCase()));(0,i.useEffect)(()=>{const e=e=>{A.current&&!A.current.contains(e.target)&&(j(!1),F(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,i.useEffect)(()=>{v||(F(""),k(-1))},[v]);const S=e=>{n(e.value),j(!1),F("")},z=v?w:(null===B||void 0===B?void 0:B.label)||"";return(0,o.jsxs)(a,{ref:A,children:[(0,o.jsxs)(s,{isOpen:v,disabled:b,onClick:()=>{var e;b||(j(!0),null===(e=E.current)||void 0===e||e.focus())},children:[(0,o.jsx)(d,{ref:E,type:"text",value:z,onChange:e=>{F(e.target.value),k(0),v||j(!0)},onKeyDown:e=>{if(!b)switch(e.key){case"ArrowDown":e.preventDefault(),v?k(e=>e<_.length-1?e+1:e):j(!0);break;case"ArrowUp":e.preventDefault(),k(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),v&&C>=0&&_[C]?S(_[C]):v||j(!0);break;case"Escape":j(!1),F("")}},placeholder:m,disabled:b}),y&&r&&!b&&(0,o.jsx)(l,{onClick:e=>{e.stopPropagation(),n(null),F("")},type:"button",children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,o.jsx)(c,{isOpen:v,children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,o.jsx)(p,{isOpen:v,children:_.length>0?_.map((e,t)=>(0,o.jsxs)(x,{isSelected:e.value===r,isHighlighted:t===C,onClick:()=>S(e),onMouseEnter:()=>k(t),children:[(0,o.jsx)(u,{children:e.label}),e.subLabel&&(0,o.jsx)(h,{children:e.subLabel})]},e.value)):(0,o.jsx)(g,{children:f})})]})}}}]);