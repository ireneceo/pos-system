"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9134],{2488:(e,t,i)=>{i.d(t,{DO:()=>p,Jt:()=>u,Qn:()=>c});i(9950);var n=i(4752),r=i(4414);const o=n.Ay.div`
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
`,a=n.Ay.input`
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
`,s=n.Ay.div`
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
`,d=n.Ay.button`
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
`,c=e=>{let{children:t,className:i,style:n,...a}=e;return(0,r.jsx)(o,{className:i,style:n,...a,children:t})},p=e=>{let{placeholder:t="Search...",value:i,onChange:n,style:o,...l}=e;return(0,r.jsxs)(s,{style:o,children:[(0,r.jsx)(a,{placeholder:t,value:i,onChange:n,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:i?"36px":"16px"},...l}),i&&(0,r.jsx)(d,{type:"button",onClick:()=>null===n||void 0===n?void 0:n({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},u=e=>{let{children:t,...i}=e;return(0,r.jsx)(l,{...i,children:t})}},2597:(e,t,i)=>{i.d(t,{Ex:()=>c,oz:()=>l,tU:()=>d});i(9950);var n=i(4752),r=i(4414);const o=n.Ay.div`
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
`,a=n.Ay.button`
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
`,s=n.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,d=e=>{let{children:t,className:i,style:n}=e;return(0,r.jsx)(o,{className:i,style:n,children:t})},l=e=>{let{active:t,onClick:i,children:n,className:o}=e;return(0,r.jsx)(a,{active:t,onClick:i,className:o,children:n})},c=e=>{let{count:t,variant:i="default",showZero:n=!1}=e;return 0!==t||n?(0,r.jsx)(s,{variant:i,children:t}):null}},2653:(e,t,i)=>{i.d(t,{M:()=>o});var n=i(9950),r=i(4492);function o(e){const[t,i]=(0,r.ok)(),o=(0,n.useCallback)(()=>t.get("tab")||e,[t,e]),[a,s]=(0,n.useState)(o());return[a,(0,n.useCallback)(e=>{s(e),i({tab:e})},[i])]}},3705:(e,t,i)=>{i.d(t,{cc:()=>r});var n=i(4752);const r=n.Ay.button`
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
`},4877:(e,t,i)=>{i.d(t,{A:()=>v});var n=i(9950),r=i(4752),o=i(4414);const a=r.Ay.div`
  margin-bottom: 16px;
`,s=r.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,d=r.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,l=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,c=r.Ay.div`
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
`,p=r.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,u=r.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,x=r.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,h=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=r.Ay.label`
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
`,m=r.Ay.button`
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
`,y=r.Ay.input`
  display: none;
`,b=r.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,f=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",v=e=>{let{value:t,onChange:i,label:r="Logo Upload",helpText:v="Upload an image for your logo",maxSize:j=2,previewSize:w=150,showRemoveButton:F=!0,changeButtonText:_="Change Image",removeButtonText:k="Remove Image",imageAltText:C="Uploaded"}=e;const[A,E]=(0,n.useState)(!1),[B,S]=(0,n.useState)(!1),z=(0,n.useRef)(null),$=(0,n.useRef)(null),D=async e=>{try{const t=localStorage.getItem("auth_token"),i=await fetch(`${f()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({image:e})}),n=await i.json();return n.success?n.data.original:(console.error("Image upload failed:",n.message),null)}catch(t){return console.error("Image upload error:",t),null}},q=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*j*1024)return void alert(`Image size should be less than ${j}MB`);if(S(!0),"image/svg+xml"===e.type){const t=new FileReader;return t.onload=async e=>{var t;const n=null===(t=e.target)||void 0===t?void 0:t.result,r=await D(n);S(!1),r?i(r):alert("Failed to upload image. Please try again.")},void t.readAsDataURL(e)}const t=new FileReader;t.onload=async t=>{var n;const r=new Image;r.onload=async()=>{const t=document.createElement("canvas"),n=t.getContext("2d");if(!n)return void S(!1);const o=1200;let a=r.width,s=r.height;(a>o||s>o)&&(a>s?(s=s/a*o,a=o):(a=a/s*o,s=o)),t.width=a,t.height=s,n.drawImage(r,0,0,a,s);const d="image/png"===e.type?t.toDataURL("image/png"):t.toDataURL("image/jpeg",.85),l=await D(d);S(!1),l?i(l):alert("Failed to upload image. Please try again.")},r.src=null===(n=t.target)||void 0===n?void 0:n.result},t.readAsDataURL(e)},R=e=>{if(B)return;const t=e.target.files;t&&t.length>0&&q(t[0]),e.target.value=""};return(0,o.jsxs)(a,{children:[r&&(0,o.jsx)(s,{children:r}),v&&(0,o.jsx)(d,{children:v}),(0,o.jsxs)(l,{children:[(0,o.jsx)(c,{ref:$,isDragging:A,hasImage:!!t,isUploading:B,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),B||E(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===$.current&&E(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),E(!1),B)return;const t=e.dataTransfer.files;t&&t.length>0&&q(t[0])},onClick:()=>{var e;t||B||(null===(e=z.current)||void 0===e||e.click())},children:B?(0,o.jsxs)(p,{children:[(0,o.jsx)(b,{}),(0,o.jsx)(u,{style:{marginTop:"12px"},children:"Uploading..."})]}):t?(0,o.jsx)("img",{src:(L=t,L?L.startsWith("http")?L:L.startsWith("/uploads/")?`${f()}${L}`:L:""),alt:C}):(0,o.jsxs)(p,{children:[(0,o.jsx)(u,{children:A?"Drop image here":"Drag & drop or click to upload"}),(0,o.jsxs)(x,{children:["PNG, JPG, GIF up to ",j,"MB"]})]})}),t&&!B&&(0,o.jsxs)(h,{children:[(0,o.jsxs)(g,{disabled:B,children:[_,(0,o.jsx)("input",{ref:z,type:"file",accept:"image/*",onChange:R,disabled:B})]}),F&&(0,o.jsx)(m,{onClick:()=>{i("")},disabled:B,children:k})]})]}),!t&&!B&&(0,o.jsx)(y,{ref:z,type:"file",accept:"image/*",onChange:R})]});var L}},7617:(e,t,i)=>{i.d(t,{A:()=>x});i(9950);var n=i(7119),r=i(4752),o=i(9610),a=i(4414);const s=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,d=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=r.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=r.Ay.button`
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
`,x=e=>{let{isOpen:t,title:i,message:r,onConfirm:x,onCancel:h,confirmText:g="Confirm",cancelText:m="Cancel",type:y="warning"}=e;return t?n.createPortal((0,a.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(d,{children:[(0,a.jsx)(l,{children:i}),(0,a.jsx)(c,{children:r})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(u,{variant:"secondary",onClick:h,children:m}),(0,a.jsx)(u,{variant:"primary",type:y,onClick:x,children:g})]})]})}),document.body):null}},9134:(e,t,i)=>{i.r(t),i.d(t,{default:()=>$e});var n=i(9950),r=i(8409),o=i(2597),a=i(2653),s=i(1367),d=i(4752),l=i(2853),c=i(3705),p=i(2488),u=i(9610),x=i(4877),h=i(7617),g=i(9194),m=i(4414);const y=d.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,b=d.Ay.div`
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
`,_=d.Ay.div`
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
`,C=d.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,A=d.Ay.span`
  color: #6B7280;
`,E=d.Ay.span`
  color: #0A2540;
  font-weight: 500;
`,B=d.Ay.span`
  color: #059669;
  font-weight: 600;
  font-size: 16px;
`,S=d.Ay.div`
  flex: 1;
  min-height: 12px;
`,z=d.Ay.div`
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,$=d.Ay.button`
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
`,D=d.Ay.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,q=d.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 20px 0;
`,R=d.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`,L=d.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: ${e=>e.color||"#E5E7EB"};
  color: #374151;
  border-radius: 4px;
  font-size: 11px;
`,I=(0,d.Ay)(L)`
  background: #DBEAFE;
  color: #1E40AF;
`,P=(0,d.Ay)(L)`
  background: #E5E7EB;
  color: #374151;
`,T=d.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #667eea;
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 6px;
`,O=d.Ay.div`
  font-size: 11px;
  color: #667eea;
  margin-top: 4px;
  line-height: 1.4;
`,M=d.Ay.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
  background: #F9FAFB;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #F3F4F6; border-color: #D1D5DB; }
`,N=d.Ay.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${e=>e.isActive?"#D1FAE5":"#FEE2E2"};
  background: ${e=>e.isActive?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.isActive?"#059669":"#DC2626"};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${e=>e.isActive?"#D1FAE5":"#FEE2E2"};
  }
`,U=d.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
`,W=d.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`,G=d.Ay.label`
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
`,Q=e=>{let{brands:t,onCountChange:i,categoryRefreshKey:r,optionRefreshKey:o}=e;const[a,s]=(0,n.useState)([]),[d,L]=(0,n.useState)([]),[Q,Z]=(0,n.useState)([]),[Y,J]=(0,n.useState)([]),[H,K]=(0,n.useState)(!0),[V,X]=(0,n.useState)(""),[ee,te]=(0,n.useState)("all"),[ie,ne]=(0,n.useState)("all"),[re,oe]=(0,n.useState)(!1),[ae,se]=(0,n.useState)(null),[de,le]=(0,n.useState)(!1),[ce,pe]=(0,n.useState)(null),[ue,xe]=(0,n.useState)({name:"",description:"",sku:"",unit:"",base_quantity:"1",unit_price:"",min_order_quantity:"1",category_id:"",image_url:"",emoji:"",is_active:!0,is_set_menu:!1,set_items:[],set_display_order:"0",product_recipe_id:null,brand_ids:[],option_group_ids:[]}),[he,ge]=(0,n.useState)(""),[me,ye]=(0,n.useState)(null),[be,fe]=(0,n.useState)(!1),[ve,je]=(0,n.useState)([]),[we,Fe]=(0,n.useState)([]),_e=(0,n.useCallback)(()=>localStorage.getItem("auth_token"),[]),ke=(0,n.useCallback)(async()=>{try{const e=_e(),t=await fetch("/api/brand-products",{headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success&&(s(n.data),i(n.data.length))}catch(e){console.error("Failed to fetch products:",e)}},[_e,i]),Ce=(0,n.useCallback)(async()=>{try{const e=_e(),t=await fetch("/api/brand-product-categories",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&L(i.data)}catch(e){console.error("Failed to fetch categories:",e)}},[_e]),Ae=(0,n.useCallback)(async()=>{try{const e=_e(),t=await fetch("/api/brand-product-option-groups",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&Z(i.data)}catch(e){console.error("Failed to fetch option groups:",e)}},[_e]),Ee=(0,n.useCallback)(async()=>{try{const e=_e(),t=await fetch("/api/product-recipes",{headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success&&J(i.data||[])}catch(e){console.error("Failed to fetch product recipes:",e)}},[_e]);(0,n.useEffect)(()=>{(async()=>{K(!0),await Promise.all([ke(),Ce(),Ae(),Ee()]);try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/product-ingredients",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();Fe((e.data||e||[]).map(e=>({id:e.id,name:e.name,unit:e.unit,unit_cost:Number(e.unit_cost||0)})))}}catch(e){console.error("Failed to fetch product ingredients:",e)}K(!1)})()},[ke,Ce,Ae,Ee]),(0,n.useEffect)(()=>{void 0!==r&&Ce()},[r,Ce]),(0,n.useEffect)(()=>{void 0!==o&&Ae()},[o,Ae]);const Be=e=>{var t,i,n,r,o,a,s;if(e)if(se(e),xe({name:e.name,description:e.description||"",sku:e.sku||"",unit:e.unit||"",base_quantity:(e.base_quantity||1).toString(),unit_price:e.unit_price.toString(),min_order_quantity:e.min_order_quantity.toString(),category_id:(null===(t=e.category_id)||void 0===t?void 0:t.toString())||"",image_url:e.image_url||"",emoji:e.emoji||"",is_active:e.is_active,is_set_menu:e.is_set_menu||!1,set_items:e.set_items||[],set_display_order:(e.set_display_order||0).toString(),product_recipe_id:e.product_recipe_id&&null!==(i=e.productRecipe)&&void 0!==i&&null!==(n=i.name)&&void 0!==n&&n.endsWith("(auto)")?null:e.product_recipe_id||null,brand_ids:(null===(r=e.brands)||void 0===r?void 0:r.map(e=>e.id))||[],option_group_ids:(null===(o=e.optionGroups)||void 0===o?void 0:o.map(e=>e.id))||[]}),e.product_recipe_id&&null!==(a=e.productRecipe)&&void 0!==a&&null!==(s=a.name)&&void 0!==s&&s.endsWith("(auto)")){const t=localStorage.getItem("auth_token");fetch(`/api/product-recipes/${e.product_recipe_id}`,{headers:{Authorization:`Bearer ${t}`}}).then(e=>e.json()).then(e=>{const t=e.data||e,i=(null===t||void 0===t?void 0:t.recipeIngredients)||(null===t||void 0===t?void 0:t.ProductRecipeIngredients)||[];je(i.map(e=>{var t,i,n;return{ingredient_id:e.ingredient_id,name:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||"",quantity:parseFloat(e.quantity),unit:e.unit||(null===(i=e.ingredient)||void 0===i?void 0:i.unit)||"",unit_cost:parseFloat((null===(n=e.ingredient)||void 0===n?void 0:n.unit_cost)||0)}}))}).catch(()=>je([]))}else je([]);else se(null),xe({name:"",description:"",sku:"",unit:"",base_quantity:"1",unit_price:"",min_order_quantity:"1",category_id:d.length>0?d[0].id.toString():"",image_url:"",emoji:"",is_active:!0,is_set_menu:!1,set_items:[],set_display_order:"0",product_recipe_id:null,brand_ids:[],option_group_ids:[]}),je([]);ge(""),oe(!0)},Se=()=>{oe(!1),se(null),ye(null)},ze=(e,t)=>{xe(i=>({...i,set_items:i.set_items.map(i=>{if(i.productId===e){const e=Math.max(1,i.quantity+t);return{...i,quantity:e}}return i})}))},$e=a.filter(e=>{var t,i;const n=e.name.toLowerCase().includes(V.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(V.toLowerCase()),r="all"===ee||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===ee,o="all"===ie||(null===(i=e.brands)||void 0===i?void 0:i.some(e=>e.id.toString()===ie));return n&&r&&o});return H?(0,m.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading products..."}):(0,m.jsxs)("div",{children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,m.jsxs)(p.Qn,{style:{marginBottom:0},children:[(0,m.jsx)(p.DO,{type:"text",placeholder:"Search products...",value:V,onChange:e=>X(e.target.value)}),(0,m.jsxs)(p.Jt,{value:ee,onChange:e=>te(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Categories"}),d.map(e=>(0,m.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]}),(0,m.jsxs)(p.Jt,{value:ie,onChange:e=>ne(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Brands"}),t.map(e=>(0,m.jsx)("option",{value:e.id.toString(),children:e.name},e.id))]})]}),(0,m.jsx)(c.cc,{onClick:()=>Be(),style:{flexShrink:0},children:"Add Product"})]}),0===$e.length?(0,m.jsxs)(l.pp,{children:[(0,m.jsx)(D,{children:V||"all"!==ee||"all"!==ie?"No products found":"No products yet"}),(0,m.jsx)(q,{children:V||"all"!==ee||"all"!==ie?"Try adjusting your search or filter criteria.":"Start by adding your first product."}),!V&&"all"===ee&&"all"===ie&&(0,m.jsx)(c.cc,{onClick:()=>Be(),children:"Add Product"})]}):(0,m.jsx)(y,{children:$e.map(e=>(0,m.jsxs)(b,{isActive:e.is_active,onClick:()=>Be(e),children:[(0,m.jsxs)(f,{children:[(0,m.jsx)(v,{src:e.image_url,children:!e.image_url&&(e.emoji||"\ud83d\udce6")}),(0,m.jsxs)(j,{children:[(0,m.jsxs)(w,{children:[e.name,e.is_set_menu&&(0,m.jsx)(T,{children:"SET"})]}),e.sku&&(0,m.jsxs)(F,{children:["SKU: ",e.sku]}),e.category&&(0,m.jsxs)(_,{children:[e.category.emoji," ",e.category.name]}),e.is_set_menu&&e.set_items&&e.set_items.length>0&&(0,m.jsxs)(O,{children:["Set: ",e.set_items.map(e=>`${e.name} x${e.quantity}`).join(", ")]})]})]}),(0,m.jsxs)(k,{children:[(0,m.jsxs)(C,{children:[(0,m.jsx)(A,{children:"Unit Price"}),(0,m.jsxs)(B,{children:["RM ",(Number(e.unit_price)||0).toFixed(2)]})]}),e.unit&&(0,m.jsxs)(C,{children:[(0,m.jsx)(A,{children:"Unit"}),(0,m.jsx)(E,{children:e.unit})]}),(0,m.jsxs)(C,{children:[(0,m.jsx)(A,{children:"Min Order"}),(0,m.jsx)(E,{children:e.min_order_quantity})]})]}),e.brands&&e.brands.length>0&&(0,m.jsx)(R,{children:e.brands.map(e=>(0,m.jsx)(I,{children:e.name},e.id))}),e.optionGroups&&e.optionGroups.length>0&&(0,m.jsx)(R,{children:e.optionGroups.map(e=>(0,m.jsx)(P,{children:e.name},e.id))}),(0,m.jsx)(S,{}),(0,m.jsxs)(z,{onClick:e=>e.stopPropagation(),children:[(0,m.jsx)($,{onClick:()=>Be(e),children:"Edit"}),(0,m.jsx)(M,{onClick:t=>(async(e,t)=>{t.stopPropagation();try{const t=_e(),i=await fetch(`/api/brand-products/${e.id}/copy`,{method:"POST",headers:{Authorization:`Bearer ${t}`}}),n=await i.json();n.success?ke():alert(n.error||n.message||"Failed to copy product")}catch(i){console.error("Failed to copy product:",i)}})(e,t),children:"Copy"}),(0,m.jsx)(N,{isActive:e.is_active,onClick:t=>(async(e,t)=>{t.stopPropagation();try{const t=_e(),i=await fetch(`/api/brand-products/${e.id}/toggle-active`,{method:"PUT",headers:{Authorization:`Bearer ${t}`}});(await i.json()).success&&ke()}catch(i){console.error("Failed to toggle product:",i)}})(e,t),children:e.is_active?"Active":"Inactive"}),(0,m.jsx)($,{variant:"danger",onClick:t=>((e,t)=>{t.stopPropagation(),pe(e),le(!0)})(e,t),children:"Delete"})]})]},e.id))}),re&&(0,m.jsx)(u.aF,{isOpen:re,onClose:Se,title:ae?"Edit Product":"Add Product",maxWidth:"700px",children:(0,m.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),!be)if(ye(null),ue.name.trim())if(ue.unit){fe(!0);try{const e=_e(),t=ae?"PUT":"POST",i=ae?`/api/brand-products/${ae.id}`:"/api/brand-products",n=await fetch(i,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:ue.name.trim(),description:ue.description.trim()||null,sku:ue.sku.trim()||null,unit:ue.unit||null,base_quantity:parseFloat(ue.base_quantity)||1,unit_price:parseFloat(ue.unit_price)||0,min_order_quantity:parseInt(ue.min_order_quantity)||1,category_id:ue.category_id?parseInt(ue.category_id):null,image_url:ue.image_url||null,emoji:ue.emoji||null,is_active:ue.is_active,is_set_menu:ue.is_set_menu,set_items:ue.is_set_menu?ue.set_items:null,set_display_order:parseInt(ue.set_display_order)||0,product_recipe_id:ue.product_recipe_id,brand_ids:ue.brand_ids,option_group_ids:ue.option_group_ids,directIngredients:ue.product_recipe_id?void 0:ve})}),r=await n.json();r.success?(Se(),ke()):ye(r.error||"Failed to save product")}catch(t){console.error("Failed to save product:",t),ye("Failed to save product. Please try again.")}finally{fe(!1)}}else ye("Unit is required");else ye("Product name is required")},children:[(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Name *"}),(0,m.jsx)(u.ZQ,{type:"text",value:ue.name,onChange:e=>xe({...ue,name:e.target.value}),placeholder:"Product name",required:!0})]}),(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"SKU"}),(0,m.jsx)(u.ZQ,{type:"text",value:ue.sku,onChange:e=>xe({...ue,sku:e.target.value}),placeholder:"Product code"})]})]}),(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Category"}),(0,m.jsxs)(u.FX,{value:ue.category_id,onChange:e=>xe({...ue,category_id:e.target.value}),children:[(0,m.jsx)("option",{value:"",children:"No category"}),d.map(e=>(0,m.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]})]}),(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Description"}),(0,m.jsx)(u.Lz,{value:ue.description,onChange:e=>xe({...ue,description:e.target.value}),placeholder:"Product description",rows:2})]}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Unit Price (RM) *"}),(0,m.jsx)(u.ZQ,{type:"number",step:"0.01",min:"0",value:ue.unit_price,onChange:e=>xe({...ue,unit_price:e.target.value}),placeholder:"0.00",required:!0})]}),(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Base Qty *"}),(0,m.jsx)(u.ZQ,{type:"number",step:"0.01",min:"0.01",value:ue.base_quantity,onChange:e=>xe({...ue,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Unit *"}),(0,m.jsxs)(u.FX,{value:ue.unit,onChange:e=>xe({...ue,unit:e.target.value}),required:!0,children:[(0,m.jsx)("option",{value:"",children:"Select unit"}),[{value:"kg",label:"kg"},{value:"g",label:"g"},{value:"L",label:"L"},{value:"ml",label:"ml"},{value:"piece",label:"piece"},{value:"pack",label:"pack"},{value:"can",label:"can"},{value:"bottle",label:"bottle"}].map(e=>(0,m.jsx)("option",{value:e.value,children:e.label},e.value))]})]}),(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Min Order Qty"}),(0,m.jsx)(u.ZQ,{type:"number",min:"1",value:ue.min_order_quantity,onChange:e=>xe({...ue,min_order_quantity:e.target.value})})]})]}),(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Product Image"}),(0,m.jsx)(x.A,{value:ue.image_url,onChange:e=>xe({...ue,image_url:e||""}),label:"",helpText:"Upload a product image (max 2MB)"})]}),(0,m.jsx)(u.gE,{children:(0,m.jsxs)(U,{children:[(0,m.jsx)("input",{type:"checkbox",checked:ue.is_set_menu,onChange:e=>xe({...ue,is_set_menu:e.target.checked,set_items:e.target.checked?ue.set_items:[]})}),"Set Menu (bundle multiple products)"]})}),ue.is_set_menu&&(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Set Items *"}),ue.set_items.length>0&&(0,m.jsx)("div",{style:{marginBottom:"12px"},children:ue.set_items.map(e=>(0,m.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 12px",background:"#F9FAFB",borderRadius:"6px",marginBottom:"4px"},children:[(0,m.jsx)("span",{style:{flex:1,fontSize:"14px"},children:e.name}),(0,m.jsx)("button",{type:"button",onClick:()=>ze(e.productId,-1),style:{width:"28px",height:"28px",border:"1px solid #D1D5DB",borderRadius:"4px",background:"white",cursor:"pointer"},children:"-"}),(0,m.jsx)("span",{style:{minWidth:"24px",textAlign:"center",fontWeight:600},children:e.quantity}),(0,m.jsx)("button",{type:"button",onClick:()=>ze(e.productId,1),style:{width:"28px",height:"28px",border:"1px solid #D1D5DB",borderRadius:"4px",background:"white",cursor:"pointer"},children:"+"}),(0,m.jsx)("button",{type:"button",onClick:()=>{return t=e.productId,void xe(e=>({...e,set_items:e.set_items.filter(e=>e.productId!==t)}));var t},style:{color:"#DC2626",background:"none",border:"none",cursor:"pointer",fontSize:"16px"},children:"x"})]},e.productId))}),(0,m.jsx)(u.ZQ,{type:"text",placeholder:"Search products to add...",value:he,onChange:e=>ge(e.target.value),style:{marginBottom:"8px"}}),(0,m.jsx)("div",{style:{maxHeight:"200px",overflowY:"auto",background:"#F9FAFB",borderRadius:"8px",padding:"8px"},children:a.filter(e=>!e.is_set_menu&&(!ae||e.id!==ae.id)).filter(e=>!he||e.name.toLowerCase().includes(he.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(he.toLowerCase())).map(e=>(0,m.jsxs)("div",{onClick:()=>(e=>{const t=a.find(t=>t.id===e);if(!t||t.is_set_menu)return;const i=ue.set_items.find(t=>t.productId===e);xe(i?t=>({...t,set_items:t.set_items.map(t=>t.productId===e?{...t,quantity:t.quantity+1}:t)}):i=>({...i,set_items:[...i.set_items,{productId:e,name:t.name,quantity:1}]}))})(e.id),style:{padding:"8px 12px",cursor:"pointer",borderRadius:"6px",marginBottom:"2px",background:ue.set_items.some(t=>t.productId===e.id)?"#EEF2FF":"white",border:"1px solid #E5E7EB",fontSize:"13px",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,m.jsxs)("span",{children:[e.emoji||"\ud83d\udce6"," ",e.sku?`${e.sku} `:"",e.name]}),(0,m.jsxs)("span",{style:{color:"#6B7280"},children:["RM ",(Number(e.unit_price)||0).toFixed(2)]})]},e.id))})]}),(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Linked Brands"}),(0,m.jsx)(W,{children:t.map(e=>(0,m.jsxs)(G,{children:[(0,m.jsx)("input",{type:"checkbox",checked:ue.brand_ids.includes(e.id),onChange:()=>{return t=e.id,void xe(e=>({...e,brand_ids:e.brand_ids.includes(t)?e.brand_ids.filter(e=>e!==t):[...e.brand_ids,t]}));var t}}),(0,m.jsx)("span",{children:e.name})]},e.id))})]}),(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Option Groups"}),Q.length>0?(0,m.jsx)(W,{children:Q.map(e=>(0,m.jsxs)(G,{children:[(0,m.jsx)("input",{type:"checkbox",checked:ue.option_group_ids.includes(e.id),onChange:()=>{return t=e.id,void xe(e=>({...e,option_group_ids:e.option_group_ids.includes(t)?e.option_group_ids.filter(e=>e!==t):[...e.option_group_ids,t]}));var t}}),(0,m.jsxs)("span",{children:[e.name," ",e.is_required?"(Required)":""]})]},e.id))}):(0,m.jsx)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px",color:"#6B7280",fontSize:"13px"},children:"No option groups available. Create option groups in the Options tab first."})]}),0===ve.length&&(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Linked Product Recipe"}),(0,m.jsx)(g.A,{options:Y.filter(e=>{var t;return!(null!==(t=e.name)&&void 0!==t&&t.endsWith("(auto)"))}).map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:ue.product_recipe_id,onChange:e=>xe({...ue,product_recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No product recipes found"})]}),!ue.product_recipe_id&&(0,m.jsxs)(u.gE,{children:[(0,m.jsxs)(u.lR,{children:["Ingredients (direct) ",ve.length>0&&(0,m.jsxs)("span",{style:{fontSize:"11px",color:"#6B7280",fontWeight:400},children:["Cost: RM ",ve.reduce((e,t)=>e+t.unit_cost*t.quantity,0).toFixed(2)]})]}),ve.map((e,t)=>(0,m.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center",marginBottom:"6px",fontSize:"13px",background:"#F9FAFB",padding:"8px 12px",borderRadius:"6px"},children:[(0,m.jsx)("span",{style:{flex:1},children:e.name}),(0,m.jsx)("input",{type:"number",value:e.quantity,min:"0.01",step:"0.01",style:{width:"60px",textAlign:"center",border:"1px solid #E6EBF1",borderRadius:"4px",padding:"2px 4px",fontSize:"13px"},onChange:e=>je(i=>i.map((i,n)=>n===t?{...i,quantity:parseFloat(e.target.value)||0}:i))}),(0,m.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",width:"30px"},children:e.unit}),(0,m.jsxs)("span",{style:{width:"70px",textAlign:"right",color:"#6B7280",fontSize:"12px"},children:["RM ",(e.unit_cost*e.quantity).toFixed(2)]}),(0,m.jsx)("button",{type:"button",onClick:()=>je(e=>e.filter((e,i)=>i!==t)),style:{background:"none",border:"none",color:"#EF4444",cursor:"pointer",fontSize:"16px",padding:"0 4px"},children:"x"})]},t)),(0,m.jsx)(g.A,{options:we.filter(e=>!ve.some(t=>t.ingredient_id===e.id)).map(e=>({value:e.id,label:e.name,subLabel:`${e.unit} / RM ${Number(e.unit_cost||0).toFixed(2)}`})),value:null,onChange:e=>{if(e){const t=we.find(t=>t.id===e);t&&je(e=>[...e,{ingredient_id:t.id,name:t.name,quantity:1,unit:t.unit,unit_cost:Number(t.unit_cost||0)}])}},placeholder:"+ Add ingredient...",allowClear:!1,noOptionsMessage:"No ingredients available"})]}),(0,m.jsx)(u.gE,{style:{marginBottom:0},children:(0,m.jsxs)(U,{children:[(0,m.jsx)("input",{type:"checkbox",checked:ue.is_active,onChange:e=>xe({...ue,is_active:e.target.checked})}),"Active"]})}),(0,m.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,m.jsx)(u.yl,{type:"button",onClick:Se,disabled:be,children:"Cancel"}),(0,m.jsx)(u.yl,{type:"submit",variant:"primary",disabled:be,children:be?"Saving...":ae?"Update":"Create"})]}),me&&(0,m.jsx)("div",{style:{marginTop:"16px",padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:me})]})}),(0,m.jsx)(h.A,{isOpen:de,onCancel:()=>{le(!1),pe(null)},onConfirm:async()=>{if(ce)try{const e=_e(),t=await fetch(`/api/brand-products/${ce.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await t.json();i.success?(le(!1),pe(null),ke()):alert(i.error||"Failed to delete product")}catch(e){console.error("Failed to delete product:",e),alert("Failed to delete product")}},title:"Delete Product",message:`Are you sure you want to delete "${null===ce||void 0===ce?void 0:ce.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},Z=d.Ay.div`
  margin-top: 24px;
`,Y=d.Ay.div`
  display: grid;
  gap: 12px;
`,J=d.Ay.div`
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
`,H=d.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,K=d.Ay.div`
  flex: 1;
`,V=d.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,X=d.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,ee=d.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,te=d.Ay.div`
  display: flex;
  gap: 8px;
`,ie=d.Ay.button`
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
`,ne=d.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,re=d.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,oe=d.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ae=d.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,se=d.Ay.button`
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
`,de=e=>{let{onCountChange:t,onCategoryChange:i}=e;const[o,a]=(0,n.useState)([]),[s,d]=(0,n.useState)(!0),[p,x]=(0,n.useState)(!1),[g,y]=(0,n.useState)(null),[b,f]=(0,n.useState)(!1),[v,j]=(0,n.useState)(null),[w,F]=(0,n.useState)({name:"",emoji:"",description:""}),_=(0,n.useCallback)(()=>localStorage.getItem("auth_token"),[]),k=(0,n.useCallback)(async()=>{try{const e=_(),i=await fetch("/api/brand-product-categories",{headers:{Authorization:`Bearer ${e}`}}),n=await i.json();n.success&&(a(n.data),t(n.data.length))}catch(e){console.error("Failed to fetch categories:",e)}finally{d(!1)}},[_,t]);(0,n.useEffect)(()=>{d(!0),k()},[k]);const C=e=>{e?(y(e),F({name:e.name,emoji:e.emoji||"",description:e.description||""})):(y(null),F({name:"",emoji:"",description:""})),x(!0)},A=()=>{x(!1),y(null),F({name:"",emoji:"",description:""})},E=async(e,t)=>{try{const i=_(),n=await fetch(`/api/brand-product-categories/${e}/reorder`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({direction:t})}),r=await n.json();r.success?k():alert(r.error||"Failed to reorder")}catch(i){console.error("Failed to reorder category:",i)}};return s?(0,m.jsx)(Z,{children:(0,m.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading categories..."})}):(0,m.jsxs)(Z,{children:[(0,m.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",marginBottom:"16px"},children:(0,m.jsx)(c.cc,{onClick:()=>C(),children:"Add Category"})}),0===o.length?(0,m.jsxs)(l.pp,{children:[(0,m.jsx)(ne,{children:"No categories yet"}),(0,m.jsx)(re,{children:"Create your first product category to organize your products."}),(0,m.jsx)(c.cc,{onClick:()=>C(),children:"Add Category"})]}):(0,m.jsx)(Y,{children:o.map((e,t)=>(0,m.jsxs)(J,{isActive:e.is_active,children:[(0,m.jsx)(r.Xd,{onMoveUp:()=>E(e.id,"up"),onMoveDown:()=>E(e.id,"down"),disableUp:0===t,disableDown:t===o.length-1}),(0,m.jsx)(H,{children:e.emoji||"\ud83d\udce6"}),(0,m.jsxs)(K,{children:[(0,m.jsx)(V,{children:e.name}),(0,m.jsxs)(X,{children:[(0,m.jsxs)("span",{children:[e.product_count||0," products"]}),(0,m.jsx)(oe,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,m.jsx)(ee,{children:e.description})]}),(0,m.jsxs)(te,{children:[(0,m.jsx)(ie,{onClick:()=>C(e),title:"Edit",children:(0,m.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,m.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"}),(0,m.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,m.jsx)(ie,{onClick:()=>(e=>{j(e),f(!0)})(e),title:"Delete",children:(0,m.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,m.jsx)("path",{d:"M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"}),(0,m.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),(0,m.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17"})]})})]})]},e.id))}),p&&(0,m.jsx)(u.aF,{isOpen:p,onClose:A,title:g?"Edit Category":"Add Category",children:(0,m.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),w.name.trim())try{const e=_(),t=g?"PUT":"POST",n=g?`/api/brand-product-categories/${g.id}`:"/api/brand-product-categories",r=await fetch(n,{method:t,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:w.name.trim(),emoji:w.emoji||null,description:w.description.trim()||null})}),o=await r.json();o.success?(A(),k(),null===i||void 0===i||i()):alert(o.error||"Failed to save")}catch(t){console.error("Failed to save category:",t),alert("Failed to save")}},children:[(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Name *"}),(0,m.jsx)(u.ZQ,{type:"text",value:w.name,onChange:e=>F({...w,name:e.target.value}),placeholder:"Category name",required:!0})]}),(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Emoji"}),(0,m.jsx)(ae,{children:["\ud83d\udce6","\ud83e\udd6b","\ud83e\uddc2","\ud83c\udf3e","\ud83e\udd5b","\ud83e\uddc8","\ud83e\udd5a","\ud83c\udf56","\ud83e\udd69","\ud83c\udf57","\ud83d\udc1f","\ud83e\udd90","\ud83e\udd91","\ud83e\udd6c","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83c\udf36\ufe0f","\ud83c\udf4b","\ud83c\udf4a","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd65","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf6f","\ud83e\uded2","\ud83e\uddca","\ud83c\udf76","\ud83e\uded9","\ud83e\uddf4","\ud83e\uddc3","\ud83c\udf75","\u2615","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd64","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf6b","\ud83c\udf6c","\ud83c\udf6d","\ud83e\uddc7","\ud83e\udd50","\ud83c\udf5e"].map(e=>(0,m.jsx)(se,{type:"button",selected:w.emoji===e,onClick:()=>F({...w,emoji:e}),children:e},e))})]}),(0,m.jsxs)(u.gE,{children:[(0,m.jsx)(u.lR,{children:"Description"}),(0,m.jsx)(u.Lz,{value:w.description,onChange:e=>F({...w,description:e.target.value}),placeholder:"Category description (optional)",rows:3})]}),(0,m.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,m.jsx)(u.yl,{type:"button",onClick:A,children:"Cancel"}),(0,m.jsx)(u.yl,{type:"submit",variant:"primary",children:g?"Update":"Create"})]})]})}),(0,m.jsx)(h.A,{isOpen:b,onCancel:()=>{f(!1),j(null)},onConfirm:async()=>{if(v)try{const e=_(),t=await fetch(`/api/brand-product-categories/${v.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success?(f(!1),j(null),k(),null===i||void 0===i||i()):alert(n.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:`Are you sure you want to delete "${null===v||void 0===v?void 0:v.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},le=d.Ay.button`
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

  ${e=>{switch(e.variant){case"danger":return"\n          background: #EF4444;\n          color: white;\n          &:hover { background: #EF4444; }\n        ";case"secondary":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E5E7EB;\n          &:hover { background: #F9FAFB; }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n          &:hover { background: #5246ED; }\n        "}}}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ce=d.Ay.div`
  display: grid;
  gap: 16px;
`,pe=d.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,ue=d.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,xe=d.Ay.div`
  flex: 1;
`,he=d.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ge=d.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,me=d.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>"required"===e.type?"\n    background: #FEE2E2;\n    color: #DC2626;\n  ":"\n    background: #E0F2FE;\n    color: #0369A1;\n  "}
`,ye=d.Ay.div`
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
`,fe=d.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,ve=d.Ay.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`,je=d.Ay.span`
  margin-left: 6px;
  color: #6B7280;
  font-size: 12px;
`,we=d.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Fe=d.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,_e=d.Ay.div`
  margin-bottom: 20px;
`,ke=d.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,Ce=d.Ay.input`
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
`,Se=d.Ay.button`
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
`,ze=e=>{let{onCountChange:t}=e;const[i,r]=(0,n.useState)([]),[o,a]=(0,n.useState)(!0),[s,d]=(0,n.useState)(""),[x,h]=(0,n.useState)(!1),[g,y]=(0,n.useState)(!1),[b,f]=(0,n.useState)(null),[v,j]=(0,n.useState)(null),[w,F]=(0,n.useState)({name:"",is_required:!1,options:[]}),[_,k]=(0,n.useState)({name:"",price_adjustment:0,ingredient_id:null,ingredient_quantity:1}),[C,A]=(0,n.useState)([]),E=(0,n.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch("/api/brand-product-option-groups",{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();e.success&&(r(e.data),t(e.data.length))}}catch(e){console.error("Error fetching option groups:",e)}finally{a(!1)}},[t]);(0,n.useEffect)(()=>{E();const e=localStorage.getItem("auth_token");fetch("/api/product-ingredients",{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()).then(e=>A((e.data||e||[]).map(e=>({id:e.id,name:e.name,unit:e.unit,unit_cost:Number(e.unit_cost||0)})))).catch(()=>{})},[E]);const B=e=>{e?(f(e),F({name:e.name,is_required:e.is_required,options:e.options.map(e=>({...e}))})):(f(null),F({name:"",is_required:!1,options:[]})),h(!0)},S=()=>{h(!1),f(null),F({name:"",is_required:!1,options:[]}),k({name:"",price_adjustment:0})},z=i.filter(e=>e.name.toLowerCase().includes(s.toLowerCase()));return o?(0,m.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7280"},children:"Loading..."}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"24px"},children:[(0,m.jsx)(p.Qn,{style:{marginBottom:0},children:(0,m.jsx)(p.DO,{type:"text",placeholder:"Search option groups...",value:s,onChange:e=>d(e.target.value)})}),(0,m.jsx)(c.cc,{onClick:()=>B(),style:{flexShrink:0},children:"Add Option Group"})]}),0===z.length?(0,m.jsxs)(l.pp,{children:[(0,m.jsx)(we,{children:"No option groups yet"}),(0,m.jsx)(Fe,{children:"Create option groups to add customizable options to your products"}),(0,m.jsx)(le,{onClick:()=>B(),children:"Add Option Group"})]}):(0,m.jsx)(ce,{children:z.map(e=>(0,m.jsxs)(pe,{children:[(0,m.jsxs)(ue,{children:[(0,m.jsxs)(xe,{children:[(0,m.jsx)(he,{children:e.name}),(0,m.jsxs)(ge,{children:[(0,m.jsx)(me,{type:e.is_required?"required":"optional",children:e.is_required?"Required":"Optional"}),(0,m.jsxs)("span",{style:{fontSize:"13px",color:"#6B7280"},children:[e.options.length," options"]})]})]}),(0,m.jsxs)(ye,{children:[(0,m.jsx)(be,{onClick:()=>B(e),children:(0,m.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,m.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,m.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,m.jsx)(be,{onClick:()=>{return t=e.id,j(t),void y(!0);var t},children:(0,m.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,m.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,m.jsx)(fe,{children:e.options.map((e,t)=>(0,m.jsxs)(ve,{children:[e.name,0!==e.price_adjustment&&(0,m.jsxs)(je,{children:[Number(e.price_adjustment)>0?"+":"","RM ",(Number(e.price_adjustment)||0).toFixed(2)]})]},t))})]},e.id))}),(0,m.jsxs)(u.aF,{isOpen:x,onClose:S,title:b?"Edit Option Group":"New Option Group",children:[(0,m.jsxs)(_e,{children:[(0,m.jsx)(ke,{children:"Group Name"}),(0,m.jsx)(Ce,{type:"text",value:w.name,onChange:e=>F({...w,name:e.target.value}),placeholder:"e.g., Size, Grade, Packaging"})]}),(0,m.jsx)(_e,{children:(0,m.jsx)(Ae,{children:(0,m.jsxs)(Ee,{children:[(0,m.jsx)("input",{type:"checkbox",checked:w.is_required,onChange:e=>F({...w,is_required:e.target.checked})}),"Required Selection"]})})}),(0,m.jsxs)(_e,{children:[(0,m.jsx)(ke,{children:"Options"}),(0,m.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"12px"},children:[(0,m.jsx)(Ce,{type:"text",value:_.name,onChange:e=>k({..._,name:e.target.value}),placeholder:"Option name",style:{flex:2}}),(0,m.jsx)(Ce,{type:"number",value:_.price_adjustment,onChange:e=>k({..._,price_adjustment:parseFloat(e.target.value)||0}),placeholder:"Price adj.",step:"0.50",style:{flex:1}}),(0,m.jsx)(le,{type:"button",variant:"secondary",onClick:()=>{if(!_.name.trim())return;const e=isNaN(_.price_adjustment)?0:_.price_adjustment,t=_.ingredient_id?C.find(e=>e.id===_.ingredient_id):null;F(i=>({...i,options:[...i.options,{name:_.name.trim(),price_adjustment:e,ingredient_id:_.ingredient_id||null,ingredient_quantity:_.ingredient_quantity||1,ingredient_name:(null===t||void 0===t?void 0:t.name)||null,ingredient_unit:(null===t||void 0===t?void 0:t.unit)||null}]})),k({name:"",price_adjustment:0,ingredient_id:null,ingredient_quantity:1})},disabled:!_.name.trim(),children:"Add"})]}),(0,m.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"12px"},children:[(0,m.jsxs)("select",{value:_.ingredient_id||"",onChange:e=>k({..._,ingredient_id:e.target.value?Number(e.target.value):null}),style:{flex:2,padding:"8px 12px",border:"1px solid #E6EBF1",borderRadius:"6px",fontSize:"13px",color:_.ingredient_id?"#0A2540":"#9CA3AF"},children:[(0,m.jsx)("option",{value:"",children:"Linked ingredient (optional)"}),C.map(e=>(0,m.jsxs)("option",{value:e.id,children:[e.name," (",e.unit,")"]},e.id))]}),_.ingredient_id&&(0,m.jsx)(Ce,{type:"number",value:_.ingredient_quantity||1,onChange:e=>k({..._,ingredient_quantity:parseFloat(e.target.value)||1}),placeholder:"Qty",step:"0.01",min:"0.01",style:{flex:1}})]}),w.options.map((e,t)=>(0,m.jsxs)(Be,{children:[(0,m.jsxs)("div",{style:{flex:1},children:[(0,m.jsx)("strong",{children:e.name}),0!==e.price_adjustment&&(0,m.jsxs)("span",{style:{marginLeft:"8px",color:"#6B7280"},children:["(",Number(e.price_adjustment)>0?"+":"","RM ",(Number(e.price_adjustment)||0).toFixed(2),")"]}),e.ingredient_name&&(0,m.jsxs)("span",{style:{fontSize:"11px",color:"#6B7280",marginLeft:"8px"},children:["\u2192 ",e.ingredient_name," ",e.ingredient_quantity,e.ingredient_unit]})]}),(0,m.jsx)(Se,{onClick:()=>{return e=t,void F(t=>({...t,options:t.options.filter((t,i)=>i!==e)}));var e},children:"x"})]},t))]}),(0,m.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,m.jsx)(le,{type:"button",variant:"secondary",onClick:S,children:"Cancel"}),(0,m.jsx)(le,{type:"button",onClick:async()=>{if(w.name.trim()&&0!==w.options.length)try{const e=localStorage.getItem("auth_token"),t=b?`/api/brand-product-option-groups/${b.id}`:"/api/brand-product-option-groups",i=b?"PUT":"POST";(await fetch(t,{method:i,headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:w.name,is_required:w.is_required,options:w.options})})).ok&&(E(),S())}catch(e){console.error("Error saving option group:",e)}},disabled:!w.name.trim()||0===w.options.length,children:b?"Update":"Create"})]})]}),(0,m.jsxs)(u.aF,{isOpen:g,onClose:()=>y(!1),title:"Delete Option Group",children:[(0,m.jsx)("p",{children:"Are you sure you want to delete this option group? This action cannot be undone."}),(0,m.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,m.jsx)(le,{type:"button",variant:"secondary",onClick:()=>y(!1),children:"Cancel"}),(0,m.jsx)(le,{type:"button",variant:"danger",onClick:async()=>{if(v)try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/brand-product-option-groups/${v}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(t.ok)E();else{const e=await t.json();alert(e.error||"Failed to delete option group")}}catch(e){console.error("Error deleting option group:",e)}finally{y(!1),j(null)}},children:"Delete"})]})]})]})},$e=()=>{const{user:e}=(0,s.As)(),[t,i]=(0,a.M)("products"),[d,l]=(0,n.useState)(0),[c,p]=(0,n.useState)(0),[u,x]=(0,n.useState)(0),[h,g]=(0,n.useState)([]),[y,b]=(0,n.useState)(!0),[f,v]=(0,n.useState)(0),[j]=(0,n.useState)(0);(0,n.useEffect)(()=>{!e||"Brand General"!==e.role&&"Brand Manager"!==e.role?b(!1):w()},[e]);const w=async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();g(e)}}catch(e){console.error("Error fetching brands:",e)}finally{b(!1)}};return y?(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(r.mc,{children:[(0,m.jsx)(r.Y9,{children:(0,m.jsx)(r.hE,{children:"Product Management"})}),(0,m.jsx)(r.UC,{children:(0,m.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})}):(0,m.jsx)(m.Fragment,{children:(0,m.jsxs)(r.mc,{children:[(0,m.jsx)(r.Y9,{children:(0,m.jsx)(r.hE,{children:"Product Management"})}),(0,m.jsxs)(r.UC,{children:[(0,m.jsxs)(o.tU,{children:[(0,m.jsxs)(o.oz,{active:"products"===t,onClick:()=>i("products"),children:["Products",(0,m.jsx)(o.Ex,{count:d,showZero:!0})]}),(0,m.jsxs)(o.oz,{active:"categories"===t,onClick:()=>i("categories"),children:["Categories",(0,m.jsx)(o.Ex,{count:c,showZero:!0})]}),(0,m.jsxs)(o.oz,{active:"options"===t,onClick:()=>i("options"),children:["Options",(0,m.jsx)(o.Ex,{count:u,showZero:!0})]})]}),(0,m.jsx)("div",{style:{display:"products"===t?"block":"none"},children:(0,m.jsx)(Q,{brands:h,onCountChange:l,categoryRefreshKey:f,optionRefreshKey:j})}),(0,m.jsx)("div",{style:{display:"categories"===t?"block":"none"},children:(0,m.jsx)(de,{onCountChange:p,onCategoryChange:()=>v(e=>e+1)})}),(0,m.jsx)("div",{style:{display:"options"===t?"block":"none"},children:(0,m.jsx)(ze,{onCountChange:x})})]})]})})}},9194:(e,t,i)=>{i.d(t,{A:()=>m});var n=i(9950),r=i(4752),o=i(4414);const a=r.Ay.div`
  position: relative;
  width: 100%;
`,s=r.Ay.div`
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
`,d=r.Ay.input`
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
`,l=r.Ay.button`
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
`,c=r.Ay.div`
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
`,p=r.Ay.div`
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
`,u=r.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.isSelected?"#F0F4FF":e.isHighlighted?"#F9FAFB":"white"};
  color: ${e=>e.isSelected?"#635BFF":"#0A2540"};
  font-weight: ${e=>e.isSelected?"500":"400"};
  transition: background 0.15s;

  &:hover {
    background: ${e=>e.isSelected?"#F0F4FF":"#F9FAFB"};
  }
`,x=r.Ay.div`
  font-size: 14px;
`,h=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,g=r.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,m=e=>{let{options:t,value:i,onChange:r,placeholder:m="Select...",disabled:y=!1,allowClear:b=!0,noOptionsMessage:f="No options found"}=e;const[v,j]=(0,n.useState)(!1),[w,F]=(0,n.useState)(""),[_,k]=(0,n.useState)(-1),C=(0,n.useRef)(null),A=(0,n.useRef)(null),E=t.find(e=>e.value===i),B=t.filter(e=>e.label.toLowerCase().includes(w.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(w.toLowerCase()));(0,n.useEffect)(()=>{const e=e=>{C.current&&!C.current.contains(e.target)&&(j(!1),F(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,n.useEffect)(()=>{v||(F(""),k(-1))},[v]);const S=e=>{r(e.value),j(!1),F("")},z=v?w:(null===E||void 0===E?void 0:E.label)||"";return(0,o.jsxs)(a,{ref:C,children:[(0,o.jsxs)(s,{isOpen:v,disabled:y,onClick:()=>{var e;y||(j(!0),null===(e=A.current)||void 0===e||e.focus())},children:[(0,o.jsx)(d,{ref:A,type:"text",value:z,onChange:e=>{F(e.target.value),k(0),v||j(!0)},onKeyDown:e=>{if(!y)switch(e.key){case"ArrowDown":e.preventDefault(),v?k(e=>e<B.length-1?e+1:e):j(!0);break;case"ArrowUp":e.preventDefault(),k(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),v&&_>=0&&B[_]?S(B[_]):v||j(!0);break;case"Escape":j(!1),F("")}},placeholder:m,disabled:y}),b&&i&&!y&&(0,o.jsx)(l,{onClick:e=>{e.stopPropagation(),r(null),F("")},type:"button",children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,o.jsx)(c,{isOpen:v,children:(0,o.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,o.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,o.jsx)(p,{isOpen:v,children:B.length>0?B.map((e,t)=>(0,o.jsxs)(u,{isSelected:e.value===i,isHighlighted:t===_,onClick:()=>S(e),onMouseEnter:()=>k(t),children:[(0,o.jsx)(x,{children:e.label}),e.subLabel&&(0,o.jsx)(h,{children:e.subLabel})]},e.value)):(0,o.jsx)(g,{children:f})})]})}}}]);