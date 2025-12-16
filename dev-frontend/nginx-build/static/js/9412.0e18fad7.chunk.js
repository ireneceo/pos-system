"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9412],{2488:(e,i,r)=>{r.d(i,{DO:()=>l,Jt:()=>c,Qn:()=>d});r(9950);var n=r(4752),t=r(4414);const a=n.Ay.div`
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
`,o=n.Ay.input`
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
`,s=n.Ay.select`
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
`,d=e=>{let{children:i,className:r,style:n,...o}=e;return(0,t.jsx)(a,{className:r,style:n,...o,children:i})},l=e=>{let{placeholder:i="Search...",...r}=e;return(0,t.jsx)(o,{placeholder:i,...r})},c=e=>{let{children:i,...r}=e;return(0,t.jsx)(s,{...r,children:i})}},3705:(e,i,r)=>{r.d(i,{cc:()=>t});var n=r(4752);const t=n.Ay.button`
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
`},4669:(e,i,r)=>{r.d(i,{A:()=>v});var n=r(9950),t=r(4752),a=r(4414);const o=t.Ay.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E6EBF1;
`,s=t.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,d=t.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,l=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,c=t.Ay.div`
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
`,p=t.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,x=t.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,g=t.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,u=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,h=t.Ay.label`
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
`,v=e=>{let{value:i,onChange:r,label:t="Logo Upload",helpText:v="Upload an image for your logo",maxSize:f=2,previewSize:b=150,showRemoveButton:j=!0,changeButtonText:F="Change Image",removeButtonText:A="Remove Image",imageAltText:w="Uploaded"}=e;const[C,k]=(0,n.useState)(!1),_=(0,n.useRef)(null),B=(0,n.useRef)(null),E=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*f*1024)return void alert(`Image size should be less than ${f}MB`);const i=new FileReader;i.onload=e=>{var i;const n=new Image;n.onload=()=>{const e=document.createElement("canvas"),i=e.getContext("2d");if(!i)return;const t=800;let a=n.width,o=n.height;(a>t||o>t)&&(a>o?(o=o/a*t,a=t):(a=a/o*t,o=t)),e.width=a,e.height=o,i.drawImage(n,0,0,a,o);const s=e.toDataURL("image/jpeg",.85);r(s)},n.src=null===(i=e.target)||void 0===i?void 0:i.result},i.readAsDataURL(e)},$=e=>{const i=e.target.files;i&&i.length>0&&E(i[0])};return(0,a.jsxs)(o,{children:[t&&(0,a.jsx)(s,{children:t}),v&&(0,a.jsx)(d,{children:v}),(0,a.jsxs)(l,{children:[(0,a.jsx)(c,{ref:B,isDragging:C,hasImage:!!i,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),k(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===B.current&&k(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),k(!1);const i=e.dataTransfer.files;i&&i.length>0&&E(i[0])},onClick:()=>{var e;i||(null===(e=_.current)||void 0===e||e.click())},children:i?(0,a.jsx)("img",{src:i,alt:w}):(0,a.jsxs)(p,{children:[(0,a.jsx)(x,{children:C?"Drop image here":"Drag & drop or click to upload"}),(0,a.jsxs)(g,{children:["PNG, JPG, GIF up to ",f,"MB"]})]})}),i&&(0,a.jsxs)(u,{children:[(0,a.jsxs)(h,{children:[F,(0,a.jsx)("input",{ref:_,type:"file",accept:"image/*",onChange:$})]}),j&&(0,a.jsx)(m,{onClick:()=>{r("")},children:A})]})]}),!i&&(0,a.jsx)(y,{ref:_,type:"file",accept:"image/*",onChange:$})]})}},7617:(e,i,r)=>{r.d(i,{A:()=>x});r(9950);var n=r(4752),t=r(9610),a=r(4414);const o=n.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=n.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=n.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=n.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=n.Ay.button`
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
`,x=e=>{let{isOpen:i,title:r,message:n,onConfirm:x,onCancel:g,confirmText:u="Confirm",cancelText:h="Cancel",type:m="warning"}=e;return i?(0,a.jsx)(t.mH,{onClick:e=>{e.target===e.currentTarget&&g()},children:(0,a.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(d,{children:r}),(0,a.jsx)(l,{children:n})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:g,children:h}),(0,a.jsx)(p,{variant:"primary",type:m,onClick:x,children:u})]})]})}):null}},9412:(e,i,r)=>{r.r(i),r.d(i,{default:()=>Gi});var n=r(9950),t=r(4752),a=r(4492),o=r(3310),s=r(7492),d=r(1367),l=r(3705),c=r(2488),p=r(9610),x=r(4669),g=r(7617),u=r(4414);const h=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,m=t.Ay.div`
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
`,y=t.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,v=(t.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,t.Ay.div`
  flex: 1;
  min-width: 0;
`),f=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,b=t.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=t.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  background: #FEF3C7;
  color: #92400E;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`,F=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,A=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,w=t.Ay.div``,C=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,k=t.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,_=t.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,B=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,E=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,$=t.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,z=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  padding: 10px;
  background: #FAFAFA;
  border-radius: 8px;
  font-size: 12px;
  color: #6B7280;
`,S=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;
`,I=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
  padding: 8px;
  background: #FFFBEB;
  border-radius: 6px;
  border-left: 3px solid #F59E0B;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,D=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`,R=t.Ay.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`,T=t.Ay.div`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,N=t.Ay.div`
  font-size: 80px;
  line-height: 1;
`,M=t.Ay.div`
  flex: 1;
`,O=t.Ay.h2`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,L=t.Ay.span`
  display: inline-block;
  padding: 6px 12px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
`,P=t.Ay.p`
  font-size: 15px;
  color: #6B7280;
  margin: 16px 0 0 0;
  line-height: 1.6;
`,U=t.Ay.div`
  padding: 20px;
  background: #F8FAFC;
  border-radius: 12px;
`,q=t.Ay.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`,Q=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
`,G=t.Ay.div`
  text-align: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
`,Y=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,Z=t.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
`,J=t.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`,W=t.Ay.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #E6EBF1;
  }

  th {
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
  }

  td {
    font-size: 14px;
    color: #374151;
  }

  tr:last-child td {
    border-bottom: none;
  }
`,H=t.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background: #635BFF;
  color: white;
  border-radius: 8px;
  margin-top: 12px;
  font-weight: 600;
`,K=t.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,V=t.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F6F9FC;\n          border: 1px solid #E6EBF1;\n          color: #6B7280;\n          &:hover {\n            border-color: #635BFF;\n            color: #635BFF;\n            background: #F4F3FF;\n            transform: translateY(-1px);\n          }\n        "}}}

  &:active {
    transform: translateY(0);
  }
`,X=t.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,ee=t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,ie=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,re=t.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`,ne=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,te=t.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,ae=t.Ay.div`
  display: flex;
  align-items: flex-end;
  padding-top: 22px;
`,oe=t.Ay.button`
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 16px;
  line-height: 1;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #FCA5A5;
  }
`,se=t.Ay.button`
  background: #F0F4FF;
  color: #635BFF;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;

  &:hover {
    background: #E0E7FF;
  }
`,de=t.Ay.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,le=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,ce=t.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #635BFF;
`,pe=t.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,xe=t.Ay.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`,ge=t.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`,ue=t.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
`,he=t.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;

  &:hover {
    color: #5A51E6;
  }
`,me=t.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,ye=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,ve=e=>{var i,r;let{brandId:t,restaurantId:a,onCountChange:o,categoryRefreshKey:s}=e;const{user:ve}=(0,d.As)(),fe=a||(null===ve||void 0===ve?void 0:ve.restaurant_id)||(null===ve||void 0===ve?void 0:ve.restaurantId),[be,je]=(0,n.useState)([]),[Fe,Ae]=(0,n.useState)([]),[we,Ce]=(0,n.useState)([]),[ke,_e]=(0,n.useState)(!0),[Be,Ee]=(0,n.useState)(""),[$e,ze]=(0,n.useState)("all"),[Se,Ie]=(0,n.useState)(null),[De,Re]=(0,n.useState)(!1),[Te,Ne]=(0,n.useState)({name:"",description:"",category:"",recipe_category_id:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),[Me,Oe]=(0,n.useState)([]),[Le,Pe]=(0,n.useState)(""),[Ue,qe]=(0,n.useState)([]),[Qe,Ge]=(0,n.useState)({isOpen:!1,recipeId:null,recipeName:""}),[Ye,Ze]=(0,n.useState)(null),[Je,We]=(0,n.useState)(!1),He="Restaurant Admin"===(null===ve||void 0===ve?void 0:ve.role),Ke=e=>He&&"brand"===e.owner_type,Ve=(0,n.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,n.useEffect)(()=>{(async()=>{if(!t&&!fe)return;_e(!0);const e=Ve(),i="Brand General"===(null===ve||void 0===ve?void 0:ve.role)||"Brand Manager"===(null===ve||void 0===ve?void 0:ve.role);try{var r,n,a;const d=[];let l="",c="",p="";i&&t?(l=`/api/brands/${t}/recipes`,c=`/api/brands/${t}/ingredients`,p=`/api/brands/${t}/recipe-categories`):He&&fe&&(l=`/api/restaurants/${fe}/recipes`,c=`/api/restaurants/${fe}/ingredients`,p=`/api/restaurants/${fe}/recipe-categories`),l&&(d.push(fetch(l,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(c,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(p,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())),He&&fe&&d.push(fetch(`/api/restaurants/${fe}/brand-recipes`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(`/api/restaurants/${fe}/brand-ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())));const x=await Promise.all(d);if(null!==(r=x[0])&&void 0!==r&&r.success){var o;let e=Array.isArray(x[0].data)?x[0].data:[];He&&null!==(o=x[3])&&void 0!==o&&o.success&&Array.isArray(x[3].data)&&(e=[...x[3].data,...e]),je(e)}if(null!==(n=x[1])&&void 0!==n&&n.success){var s;let e=Array.isArray(x[1].data)?x[1].data:[];He&&null!==(s=x[4])&&void 0!==s&&s.success&&Array.isArray(x[4].data)&&(e=[...x[4].data,...e]),Ae(e)}if(null!==(a=x[2])&&void 0!==a&&a.success)if(Array.isArray(x[2].data))Ce(x[2].data.filter(e=>e.is_active));else{const e=[...x[2].data.own_categories||[],...x[2].data.brand_categories||[]].filter(e=>e.is_active);Ce(e)}}catch(d){console.error("Failed to fetch data:",d)}finally{_e(!1)}})()},[t,fe,null===ve||void 0===ve?void 0:ve.role,Ve,He]),(0,n.useEffect)(()=>{s&&(t||fe)&&Xe()},[s]);const Xe=async()=>{try{let e="";if("Brand General"===(null===ve||void 0===ve?void 0:ve.role)||"Brand Manager"===(null===ve||void 0===ve?void 0:ve.role)?t&&(e=`/api/brands/${t}/recipe-categories`):"Restaurant Admin"===(null===ve||void 0===ve?void 0:ve.role)&&fe&&(e=`/api/restaurants/${fe}/recipe-categories`),!e)return;const i=localStorage.getItem("auth_token"),r=await fetch(e,{headers:{Authorization:`Bearer ${i}`}}),n=await r.json();if(n.success)if(Array.isArray(n.data))Ce(n.data.filter(e=>e.is_active));else{const e=[...n.data.own_categories||[],...n.data.brand_categories||[]].filter(e=>e.is_active);Ce(e)}}catch(e){console.error("Failed to fetch recipe categories:",e)}},ei=function(e){let i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];var r,n,t,a,o;(Ze(null),We(i),e)?(Ie(e),Ne({name:e.name,description:e.description||"",category:e.category,recipe_category_id:(null===(r=e.recipe_category_id)||void 0===r?void 0:r.toString())||"",image:e.image||"",prep_time:(null===(n=e.prep_time)||void 0===n?void 0:n.toString())||"",cook_time:(null===(t=e.cook_time)||void 0===t?void 0:t.toString())||"",instructions:e.instructions||"",suggested_price:(null===(a=e.suggested_price)||void 0===a?void 0:a.toString())||""}),Oe(e.category?e.category.split(",").map(e=>e.trim()):[]),qe((null===(o=e.recipeIngredients)||void 0===o?void 0:o.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""})))||[])):(Ie(null),Ne({name:"",description:"",category:"",recipe_category_id:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),Oe([]),qe([]));Re(!0)},ii=()=>{Re(!1),Ie(null),We(!1),Ze(null),Ne({name:"",description:"",category:"",recipe_category_id:"",image:"",prep_time:"",cook_time:"",instructions:"",suggested_price:""}),qe([]),Oe([]),Pe("")},ri=(e,i,r)=>{const n=[...Ue];if("ingredient_id"===i){const t=Fe.find(e=>e.id===r);n[e]=t?{...n[e],ingredient_id:r,unit:t.unit}:{...n[e],[i]:r}}else n[e]={...n[e],[i]:r};qe(n)},ni=()=>Ue.reduce((e,i)=>{const r=Fe.find(e=>e.id===i.ingredient_id);return r&&i.quantity?e+parseFloat(i.quantity)*parseFloat(r.unit_cost.toString()):e},0),ti=be.filter(e=>{var i;const r=e.name.toLowerCase().includes(Be.toLowerCase()),n="all"===$e||(null===(i=e.recipe_category_id)||void 0===i?void 0:i.toString())===$e||e.category===$e;return r&&n}),ai=[{id:"all",name:"All Categories"},...we.map(e=>({id:e.id.toString(),name:e.name}))];return(0,n.useEffect)(()=>{o(be.length)},[be.length,o]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(ye,{children:[(0,u.jsxs)(c.Qn,{style:{marginBottom:0,flex:1},children:[(0,u.jsx)(c.DO,{type:"text",placeholder:"Search recipes...",value:Be,onChange:e=>Ee(e.target.value)}),(0,u.jsx)(c.Jt,{value:$e,onChange:e=>ze(e.target.value),children:ai.map(e=>(0,u.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,u.jsx)(l.cc,{variant:"primary",onClick:()=>ei(null),style:{whiteSpace:"nowrap"},children:"+ New Recipe"})]}),ke?(0,u.jsx)(X,{children:(0,u.jsx)(ee,{children:"Loading..."})}):0===ti.length?(0,u.jsxs)(X,{children:[(0,u.jsx)(ee,{children:"No recipes found"}),(0,u.jsx)(ie,{children:Be||"all"!==$e?"Try adjusting your filters":"Create your first recipe to get started"}),!Be&&"all"===$e&&(0,u.jsx)(l.cc,{variant:"primary",onClick:()=>ei(null),children:"+ Create First Recipe"})]}):(0,u.jsx)(h,{children:ti.map(e=>{var i,r,n;return(0,u.jsxs)(m,{isActive:e.is_active,onClick:()=>ei(e,!0),children:[e.image&&(0,u.jsx)("div",{style:{width:"100%",height:"180px",borderRadius:"8px 8px 0 0",overflow:"hidden",marginBottom:"16px"},children:(0,u.jsx)("img",{src:e.image,alt:e.name,style:{width:"100%",height:"100%",objectFit:"cover"}})}),(0,u.jsx)(y,{children:(0,u.jsxs)(v,{children:[(0,u.jsxs)(f,{children:[e.name,He&&"brand"===e.owner_type&&(0,u.jsx)(j,{children:"Brand"})]}),(0,u.jsxs)(b,{children:[null===(i=e.recipeCategory)||void 0===i?void 0:i.emoji," ",(null===(r=e.recipeCategory)||void 0===r?void 0:r.name)||e.category||"Uncategorized"]})]})}),e.description&&(0,u.jsx)(F,{children:e.description}),(0,u.jsxs)(A,{children:[(0,u.jsxs)(w,{children:[(0,u.jsx)(C,{children:"Cost"}),(0,u.jsxs)(k,{children:["RM ",Number(e.total_ingredient_cost||0).toFixed(2)]})]}),(0,u.jsxs)(w,{children:[(0,u.jsx)(C,{children:"Suggested"}),(0,u.jsxs)(k,{children:["RM ",Number(e.suggested_price||0).toFixed(2)]})]})]}),(e.prep_time||e.cook_time)&&(0,u.jsxs)(z,{children:[e.prep_time&&(0,u.jsxs)(S,{children:[(0,u.jsx)("span",{children:"Prep:"}),(0,u.jsxs)("strong",{children:[e.prep_time," min"]})]}),e.cook_time&&(0,u.jsxs)(S,{children:[(0,u.jsx)("span",{children:"Cook:"}),(0,u.jsxs)("strong",{children:[e.cook_time," min"]})]}),e.prep_time&&e.cook_time&&(0,u.jsxs)(S,{children:[(0,u.jsx)("span",{children:"Total:"}),(0,u.jsxs)("strong",{children:[e.prep_time+e.cook_time," min"]})]})]}),e.instructions&&(0,u.jsx)(I,{children:e.instructions}),(0,u.jsxs)(_,{children:[(0,u.jsxs)(B,{children:[(null===(n=e.recipeIngredients)||void 0===n?void 0:n.length)||0," ingredients"]}),e.recipeIngredients&&e.recipeIngredients.length>0&&(0,u.jsxs)(E,{children:[e.recipeIngredients.slice(0,5).map((e,i)=>{var r;return(0,u.jsx)($,{children:(null===(r=e.ingredient)||void 0===r?void 0:r.name)||`Ingredient #${e.ingredient_id}`},i)}),e.recipeIngredients.length>5&&(0,u.jsxs)($,{style:{background:"#E0E7FF",color:"#4F46E5"},children:["+",e.recipeIngredients.length-5," more"]})]})]}),(0,u.jsxs)(K,{onClick:e=>e.stopPropagation(),children:[(0,u.jsx)(V,{variant:"secondary",onClick:()=>ei(e,!0),children:"View"}),!Ke(e)&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(V,{variant:"primary",onClick:()=>ei(e,!1),children:"Edit"}),(0,u.jsx)(V,{variant:"danger",onClick:()=>(e=>{Ge({isOpen:!0,recipeId:e.id,recipeName:e.name})})(e),children:"Delete"})]})]})]},e.id)})}),(0,u.jsx)(p.aF,{isOpen:De,onClose:ii,title:Je?"Recipe Details":Se?"Edit Recipe":"New Recipe",size:Je?"large":"medium",children:Je&&Se?(0,u.jsxs)(D,{children:[(0,u.jsxs)(R,{children:[(0,u.jsx)(T,{children:Te.image?(0,u.jsx)("img",{src:Te.image,alt:Te.name}):(0,u.jsx)(N,{children:Se.emoji||"\ud83c\udf7d\ufe0f"})}),(0,u.jsxs)(M,{children:[(0,u.jsx)(O,{children:Te.name}),(0,u.jsxs)(L,{children:[null===(i=Se.recipeCategory)||void 0===i?void 0:i.emoji," ",(null===(r=Se.recipeCategory)||void 0===r?void 0:r.name)||Te.category||"Uncategorized"]}),Te.description&&(0,u.jsx)(P,{children:Te.description})]})]}),(0,u.jsxs)(U,{children:[(0,u.jsx)(q,{children:"Cost & Time"}),(0,u.jsxs)(Q,{children:[(0,u.jsxs)(G,{children:[(0,u.jsx)(Y,{children:"Ingredient Cost"}),(0,u.jsxs)(Z,{children:["RM ",Number(Se.total_ingredient_cost||0).toFixed(2)]})]}),(0,u.jsxs)(G,{children:[(0,u.jsx)(Y,{children:"Suggested Price"}),(0,u.jsxs)(Z,{children:["RM ",Number(Te.suggested_price||0).toFixed(2)]})]}),Te.prep_time&&(0,u.jsxs)(G,{children:[(0,u.jsx)(Y,{children:"Prep Time"}),(0,u.jsxs)(Z,{children:[Te.prep_time," min"]})]}),Te.cook_time&&(0,u.jsxs)(G,{children:[(0,u.jsx)(Y,{children:"Cook Time"}),(0,u.jsxs)(Z,{children:[Te.cook_time," min"]})]}),Te.prep_time&&Te.cook_time&&(0,u.jsxs)(G,{children:[(0,u.jsx)(Y,{children:"Total Time"}),(0,u.jsxs)(Z,{children:[parseInt(Te.prep_time)+parseInt(Te.cook_time)," min"]})]})]})]}),Ue.length>0&&(0,u.jsxs)(U,{children:[(0,u.jsxs)(q,{children:["Ingredients (",Ue.length,")"]}),(0,u.jsxs)(W,{children:[(0,u.jsx)("thead",{children:(0,u.jsxs)("tr",{children:[(0,u.jsx)("th",{children:"Ingredient"}),(0,u.jsx)("th",{children:"Quantity"}),(0,u.jsx)("th",{children:"Unit Cost"}),(0,u.jsx)("th",{children:"Subtotal"})]})}),(0,u.jsx)("tbody",{children:Ue.map((e,i)=>{const r=Fe.find(i=>i.id===e.ingredient_id),n=parseFloat(e.quantity)*((null===r||void 0===r?void 0:r.unit_cost)||0);return(0,u.jsxs)("tr",{children:[(0,u.jsx)("td",{children:(0,u.jsx)("strong",{children:(null===r||void 0===r?void 0:r.name)||`Ingredient #${e.ingredient_id}`})}),(0,u.jsxs)("td",{children:[e.quantity," ",e.unit]}),(0,u.jsxs)("td",{children:["RM ",Number((null===r||void 0===r?void 0:r.unit_cost)||0).toFixed(2),"/",null===r||void 0===r?void 0:r.unit]}),(0,u.jsxs)("td",{children:["RM ",n.toFixed(2)]})]},i)})})]}),(0,u.jsxs)(H,{children:[(0,u.jsx)("span",{children:"Total Ingredient Cost"}),(0,u.jsxs)("span",{children:["RM ",ni().toFixed(2)]})]})]}),Te.instructions&&(0,u.jsxs)(U,{children:[(0,u.jsx)(q,{children:"Cooking Instructions"}),(0,u.jsx)(J,{children:Te.instructions})]}),(0,u.jsxs)(pe,{children:[(0,u.jsx)(p.yl,{type:"button",variant:"secondary",onClick:ii,children:"Close"}),!Ke(Se)&&(0,u.jsx)(p.yl,{type:"button",variant:"primary",onClick:()=>We(!1),children:"Edit"})]})]}):(0,u.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),Ze(null),Te.name)try{let e="";const i=Se?"PUT":"POST";"Brand General"===(null===ve||void 0===ve?void 0:ve.role)||"Brand Manager"===(null===ve||void 0===ve?void 0:ve.role)?e=Se?`/api/brands/${t}/recipes/${Se.id}`:`/api/brands/${t}/recipes`:"Restaurant Admin"===(null===ve||void 0===ve?void 0:ve.role)&&(e=Se?`/api/restaurants/${fe}/recipes/${Se.id}`:`/api/restaurants/${fe}/recipes`);const r=localStorage.getItem("auth_token"),n=await fetch(e,{method:i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({...Te,category:Me.length>0?Me.join(", "):"",recipe_category_id:Te.recipe_category_id?parseInt(Te.recipe_category_id):null,suggested_price:parseFloat(Te.suggested_price)||0,ingredients:Ue.map(e=>({ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,notes:e.notes}))})}),a=await n.json();a.success?(ii(),(async()=>{try{_e(!0);const e=localStorage.getItem("auth_token");if("Brand General"===(null===ve||void 0===ve?void 0:ve.role)||"Brand Manager"===(null===ve||void 0===ve?void 0:ve.role)){if(t){const i=await fetch(`/api/brands/${t}/recipes`,{headers:{Authorization:`Bearer ${e}`}}),r=await i.json();r.success&&je(r.data)}}else if("Restaurant Admin"===(null===ve||void 0===ve?void 0:ve.role)&&fe){const[i,r]=await Promise.all([fetch(`/api/restaurants/${fe}/recipes`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(`/api/restaurants/${fe}/brand-recipes`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())]);let n=[];r.success&&Array.isArray(r.data)&&(n=[...r.data]),i.success&&Array.isArray(i.data)&&(n=[...n,...i.data]),je(n)}}catch(e){console.error("Failed to fetch recipes:",e)}finally{_e(!1)}})()):Ze(a.error||"\ub808\uc2dc\ud53c \uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4")}catch(i){console.error("Failed to save recipe:",i)}else Ze("\ub808\uc2dc\ud53c \uc774\ub984\uc740 \ud544\uc218\uc785\ub2c8\ub2e4")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Recipe Name *"}),(0,u.jsx)(p.ZQ,{type:"text",value:Te.name,onChange:e=>Ne({...Te,name:e.target.value}),placeholder:"e.g., Nasi Lemak Special",required:!0})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Category"}),(0,u.jsxs)(p.FX,{value:Te.recipe_category_id,onChange:e=>Ne({...Te,recipe_category_id:e.target.value}),children:[(0,u.jsx)("option",{value:"",children:"Select category..."}),we.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Recipe Image"}),(0,u.jsx)(x.A,{value:Te.image,onChange:e=>Ne({...Te,image:e}),label:"Drop recipe image here or click to upload"})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Tags (Press Enter to add)"}),(0,u.jsx)(me,{type:"text",value:Le,onChange:e=>Pe(e.target.value),onKeyDown:e=>{"Enter"===e.key&&Le.trim()&&(e.preventDefault(),Me.includes(Le.trim())||Oe([...Me,Le.trim()]),Pe(""))},placeholder:"e.g., Main Dish, Spicy, Popular"}),Me.length>0&&(0,u.jsx)(ge,{children:Me.map(e=>(0,u.jsxs)(ue,{children:[e,(0,u.jsx)(he,{type:"button",onClick:()=>{return i=e,void Oe(Me.filter(e=>e!==i));var i},children:"\xd7"})]},e))})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Suggested Price (RM)"}),(0,u.jsx)(p.ZQ,{type:"number",step:"0.01",value:Te.suggested_price,onChange:e=>Ne({...Te,suggested_price:e.target.value}),placeholder:"0.00"})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Description"}),(0,u.jsx)(p.Lz,{value:Te.description,onChange:e=>Ne({...Te,description:e.target.value}),placeholder:"Brief description of the recipe..."})]}),(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Prep Time (minutes)"}),(0,u.jsx)(p.ZQ,{type:"number",value:Te.prep_time,onChange:e=>Ne({...Te,prep_time:e.target.value}),placeholder:"e.g., 15"})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Cook Time (minutes)"}),(0,u.jsx)(p.ZQ,{type:"number",value:Te.cook_time,onChange:e=>Ne({...Te,cook_time:e.target.value}),placeholder:"e.g., 30"})]})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Cooking Instructions"}),(0,u.jsx)(p.Lz,{value:Te.instructions,onChange:e=>Ne({...Te,instructions:e.target.value}),placeholder:"Step-by-step cooking instructions...",rows:6})]}),(0,u.jsxs)("div",{children:[(0,u.jsx)(re,{children:"Ingredients"}),(0,u.jsx)(ne,{children:Ue.map((e,i)=>(0,u.jsxs)(te,{children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Ingredient"}),(0,u.jsxs)(p.FX,{value:e.ingredient_id,onChange:e=>ri(i,"ingredient_id",parseInt(e.target.value)),required:!0,children:[(0,u.jsx)("option",{value:0,children:"Select ingredient..."}),Fe.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.name," (RM ",Number(e.unit_cost).toFixed(2),"/",e.unit,")"]},e.id))]})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Quantity"}),(0,u.jsx)(p.ZQ,{type:"number",step:"0.01",value:e.quantity,onChange:e=>ri(i,"quantity",e.target.value),placeholder:"0",required:!0})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Unit"}),(0,u.jsx)(p.ZQ,{type:"text",value:e.unit,readOnly:!0,disabled:!0,style:{background:"#F3F4F6",cursor:"not-allowed"}})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Notes"}),(0,u.jsx)(p.ZQ,{type:"text",value:e.notes,onChange:e=>ri(i,"notes",e.target.value),placeholder:"Optional"})]}),(0,u.jsx)(ae,{children:(0,u.jsx)(oe,{type:"button",onClick:()=>(e=>{qe(Ue.filter((i,r)=>r!==e))})(i),children:"\xd7"})})]},i))}),(0,u.jsx)(se,{type:"button",onClick:()=>{qe([...Ue,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"+ Add Ingredient"}),Ue.length>0&&(0,u.jsxs)(de,{children:[(0,u.jsx)(le,{children:"Total Ingredient Cost"}),(0,u.jsxs)(ce,{children:["RM ",ni().toFixed(2)]})]})]}),Ye&&(0,u.jsx)(xe,{children:Ye}),(0,u.jsxs)(pe,{children:[(0,u.jsx)(p.yl,{type:"button",variant:"secondary",onClick:ii,children:"Cancel"}),(0,u.jsx)(p.yl,{type:"submit",variant:"primary",children:Se?"Update Recipe":"Create Recipe"})]})]})}),(0,u.jsx)(g.A,{isOpen:Qe.isOpen,title:"Delete Recipe",message:`Are you sure you want to delete "${Qe.recipeName}"? This action cannot be undone.`,onConfirm:async()=>{if(Qe.recipeId)try{const e=Ve();let i="";"Brand General"===(null===ve||void 0===ve?void 0:ve.role)||"Brand Manager"===(null===ve||void 0===ve?void 0:ve.role)?i=`/api/brands/${t}/recipes/${Qe.recipeId}`:"Restaurant Admin"===(null===ve||void 0===ve?void 0:ve.role)&&(i=`/api/restaurants/${fe}/recipes/${Qe.recipeId}`);const r=await fetch(i,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),n=await r.json();n.success?je(e=>e.filter(e=>e.id!==Qe.recipeId)):console.error("Delete failed:",n.error)}catch(e){console.error("Failed to delete recipe:",e)}finally{Ge({isOpen:!1,recipeId:null,recipeName:""})}},onCancel:()=>{Ge({isOpen:!1,recipeId:null,recipeName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},fe=t.Ay.div`
  position: relative;
  width: 100%;
`,be=t.Ay.div`
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
`,je=t.Ay.input`
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
`,Fe=t.Ay.button`
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
`,Ae=t.Ay.div`
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
`,we=t.Ay.div`
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
`,Ce=t.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.isSelected?"#F0F4FF":e.isHighlighted?"#F9FAFB":"white"};
  color: ${e=>e.isSelected?"#635BFF":"#0A2540"};
  font-weight: ${e=>e.isSelected?"500":"400"};
  transition: background 0.15s;

  &:hover {
    background: ${e=>e.isSelected?"#F0F4FF":"#F9FAFB"};
  }
`,ke=t.Ay.div`
  font-size: 14px;
`,_e=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,Be=t.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,Ee=e=>{let{options:i,value:r,onChange:t,placeholder:a="Select...",disabled:o=!1,allowClear:s=!0,noOptionsMessage:d="No options found"}=e;const[l,c]=(0,n.useState)(!1),[p,x]=(0,n.useState)(""),[g,h]=(0,n.useState)(-1),m=(0,n.useRef)(null),y=(0,n.useRef)(null),v=i.find(e=>e.value===r),f=i.filter(e=>e.label.toLowerCase().includes(p.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(p.toLowerCase()));(0,n.useEffect)(()=>{const e=e=>{m.current&&!m.current.contains(e.target)&&(c(!1),x(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,n.useEffect)(()=>{l||(x(""),h(-1))},[l]);const b=e=>{t(e.value),c(!1),x("")},j=l?p:(null===v||void 0===v?void 0:v.label)||"";return(0,u.jsxs)(fe,{ref:m,children:[(0,u.jsxs)(be,{isOpen:l,disabled:o,onClick:()=>{var e;o||(c(!0),null===(e=y.current)||void 0===e||e.focus())},children:[(0,u.jsx)(je,{ref:y,type:"text",value:j,onChange:e=>{x(e.target.value),h(0),l||c(!0)},onKeyDown:e=>{if(!o)switch(e.key){case"ArrowDown":e.preventDefault(),l?h(e=>e<f.length-1?e+1:e):c(!0);break;case"ArrowUp":e.preventDefault(),h(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),l&&g>=0&&f[g]?b(f[g]):l||c(!0);break;case"Escape":c(!1),x("")}},placeholder:a,disabled:o}),s&&r&&!o&&(0,u.jsx)(Fe,{onClick:e=>{e.stopPropagation(),t(null),x("")},type:"button",children:(0,u.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,u.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,u.jsx)(Ae,{isOpen:l,children:(0,u.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,u.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,u.jsx)(we,{isOpen:l,children:f.length>0?f.map((e,i)=>(0,u.jsxs)(Ce,{isSelected:e.value===r,isHighlighted:i===g,onClick:()=>b(e),onMouseEnter:()=>h(i),children:[(0,u.jsx)(ke,{children:e.label}),e.subLabel&&(0,u.jsx)(_e,{children:e.subLabel})]},e.value)):(0,u.jsx)(Be,{children:d})})]})},$e=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,ze=t.Ay.div`
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
`,Se=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,Ie=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,De=t.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,Re=t.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  background: #FEF3C7;
  color: #92400E;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`,Te=t.Ay.div`
  margin: 12px 0;
`,Ne=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,Me=t.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,Oe=t.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,Le=t.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,Pe=t.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F6F9FC;\n          border: 1px solid #E6EBF1;\n          color: #6B7280;\n          &:hover {\n            border-color: #635BFF;\n            color: #635BFF;\n            background: #F4F3FF;\n            transform: translateY(-1px);\n          }\n        "}}}

  &:active {
    transform: translateY(0);
  }
`,Ue=t.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,qe=t.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,Qe=t.Ay.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
`,Ge=t.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,Ye=(t.Ay.div`
  color: #9CA3AF;
  font-size: 12px;
`,t.Ay.div`
  width: 100%;
  height: 150px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  background: #F9FAFB;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`),Ze=t.Ay.div`
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`,Je=t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,We=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,He=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,Ke=e=>{let{brandId:i,restaurantId:r,onCountChange:t,categoryRefreshKey:a}=e;const{user:o}=(0,d.As)(),s=r||(null===o||void 0===o?void 0:o.restaurant_id)||(null===o||void 0===o?void 0:o.restaurantId),[x,h]=(0,n.useState)([]),[m,y]=(0,n.useState)([]),[v,f]=(0,n.useState)(!0),[b,j]=(0,n.useState)(""),[F,A]=(0,n.useState)("all"),[w,C]=(0,n.useState)(null),[k,_]=(0,n.useState)(!1),[B,E]=(0,n.useState)({code:"",name:"",image_url:"",ingredient_category_id:"",unit:"",base_quantity:"1",unit_cost:"",supplier_id:"",min_stock:"0"}),[$,z]=(0,n.useState)([]),[S,I]=(0,n.useState)({isOpen:!1,ingredientId:null,ingredientName:""}),D="Restaurant Admin"===(null===o||void 0===o?void 0:o.role),R=(0,n.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,n.useEffect)(()=>{(async()=>{if(!i&&!s)return;f(!0);const e=R(),r="Brand General"===(null===o||void 0===o?void 0:o.role)||"Brand Manager"===(null===o||void 0===o?void 0:o.role);try{var n,t,a;const o=[];let l="",c="",p="";r&&i?(l=`/api/brands/${i}/ingredients`,c=`/api/brands/${i}/ingredient-categories`,p=`/api/brands/${i}/suppliers`):D&&s&&(l=`/api/restaurants/${s}/ingredients`,c=`/api/restaurants/${s}/ingredient-categories`,p=`/api/restaurants/${s}/all-suppliers`),l&&(o.push(fetch(l,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(c,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(p,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())),D&&s&&o.push(fetch(`/api/restaurants/${s}/brand-ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())));const x=await Promise.all(o);if(null!==(n=x[0])&&void 0!==n&&n.success){var d;let e=Array.isArray(x[0].data)?x[0].data:[];D&&null!==(d=x[3])&&void 0!==d&&d.success&&Array.isArray(x[3].data)&&(e=[...x[3].data,...e]),h(e)}if(null!==(t=x[1])&&void 0!==t&&t.success)if(Array.isArray(x[1].data))y(x[1].data.filter(e=>e.is_active));else{const e=[...x[1].data.own_categories||[],...x[1].data.brand_categories||[]].filter(e=>e.is_active);y(e)}if(null!==(a=x[2])&&void 0!==a&&a.success)if(Array.isArray(x[2].data))z(x[2].data.filter(e=>e.is_active));else{const e=[...x[2].data.brand_suppliers||[],...x[2].data.own_suppliers||[]].filter(e=>e.is_active);z(e)}}catch(l){console.error("Failed to fetch data:",l)}finally{f(!1)}})()},[i,s,null===o||void 0===o?void 0:o.role,R,D]),(0,n.useEffect)(()=>{a&&(i||s)&&T()},[a]);const T=async()=>{try{let e="";if("Brand General"===(null===o||void 0===o?void 0:o.role)||"Brand Manager"===(null===o||void 0===o?void 0:o.role)?i&&(e=`/api/brands/${i}/ingredient-categories`):"Restaurant Admin"===(null===o||void 0===o?void 0:o.role)&&s&&(e=`/api/restaurants/${s}/ingredient-categories`),!e)return;const r=R(),n=await fetch(e,{headers:{Authorization:`Bearer ${r}`}}),t=await n.json();if(t.success)if(Array.isArray(t.data))y(t.data.filter(e=>e.is_active));else{const e=[...t.data.own_categories||[],...t.data.brand_categories||[]].filter(e=>e.is_active);y(e)}}catch(e){console.error("Failed to fetch ingredient categories:",e)}},N=e=>{var i,r,n;e?(C(e),E({code:e.code||"",name:e.name,image_url:e.image_url||"",ingredient_category_id:(null===(i=e.ingredient_category_id)||void 0===i?void 0:i.toString())||"",unit:e.unit,base_quantity:(null===(r=e.base_quantity)||void 0===r?void 0:r.toString())||"1",unit_cost:e.unit_cost.toString(),supplier_id:e.supplier_id||"",min_stock:(null===(n=e.min_stock)||void 0===n?void 0:n.toString())||"0"})):(C(null),E({code:"",name:"",image_url:"",ingredient_category_id:"",unit:"",base_quantity:"1",unit_cost:"",supplier_id:"",min_stock:"0"}));_(!0)},M=()=>{_(!1),C(null),E({code:"",name:"",image_url:"",ingredient_category_id:"",unit:"",base_quantity:"1",unit_cost:"",supplier_id:"",min_stock:"0"})},O=x.filter(e=>{var i;const r=e.name.toLowerCase().includes(b.toLowerCase()),n="all"===F||(null===(i=e.ingredient_category_id)||void 0===i?void 0:i.toString())===F;return r&&n}),L=[{id:"all",name:"All Categories"},...m.map(e=>({id:e.id.toString(),name:e.name}))];return(0,n.useEffect)(()=>{t(x.length)},[x.length,t]),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(He,{children:[(0,u.jsxs)(c.Qn,{style:{marginBottom:0,flex:1},children:[(0,u.jsx)(c.DO,{type:"text",placeholder:"Search ingredients...",value:b,onChange:e=>j(e.target.value)}),(0,u.jsx)(c.Jt,{value:F,onChange:e=>A(e.target.value),children:L.map(e=>(0,u.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,u.jsx)(l.cc,{variant:"primary",onClick:()=>N(null),style:{whiteSpace:"nowrap"},children:"+ New Ingredient"})]}),v?(0,u.jsx)(qe,{children:(0,u.jsx)(Je,{children:"Loading..."})}):0===O.length?(0,u.jsxs)(qe,{children:[(0,u.jsx)(Je,{children:"No ingredients found"}),(0,u.jsx)(We,{children:b||"all"!==F?"Try adjusting your filters":"Create your first ingredient to get started"}),!b&&"all"===F&&(0,u.jsx)(l.cc,{variant:"primary",onClick:()=>N(null),children:"+ Create First Ingredient"})]}):(0,u.jsx)($e,{children:O.map(e=>{var i,r,n,t,a;return(0,u.jsxs)(ze,{isActive:e.is_active,children:[e.image_url&&(0,u.jsx)(Qe,{children:(0,u.jsx)(Ge,{src:e.image_url,alt:e.name})}),(0,u.jsx)(Se,{children:(0,u.jsxs)("div",{children:[(0,u.jsxs)(Ie,{children:[e.name,D&&"brand"===e.owner_type&&(0,u.jsx)(Re,{children:"Brand"})]}),(0,u.jsxs)(De,{children:[null===(i=e.ingredientCategory)||void 0===i?void 0:i.emoji," ",(null===(r=e.ingredientCategory)||void 0===r?void 0:r.name)||"Uncategorized"]})]})}),(0,u.jsxs)(Te,{children:[(0,u.jsxs)(Ne,{children:[(0,u.jsx)(Me,{children:"Unit Cost"}),(0,u.jsxs)(Oe,{children:["RM ",Number(e.unit_cost).toFixed(2)]})]}),(0,u.jsxs)(Ne,{children:[(0,u.jsx)(Me,{children:"Base Qty / Unit"}),(0,u.jsxs)(Oe,{children:[Number(e.base_quantity||1)," ",e.unit]})]}),((null===(n=e.supplier)||void 0===n?void 0:n.name)||e.supplier_name)&&(0,u.jsxs)(Ne,{children:[(0,u.jsx)(Me,{children:"Supplier"}),(0,u.jsx)(Oe,{children:(null===(t=e.supplier)||void 0===t?void 0:t.name)||e.supplier_name})]}),e.code&&(0,u.jsxs)(Ne,{children:[(0,u.jsx)(Me,{children:"Code"}),(0,u.jsx)(Oe,{children:e.code})]})]}),(a=e,!(D&&"brand"===a.owner_type)&&(0,u.jsxs)(Le,{children:[(0,u.jsx)(Pe,{variant:"secondary",onClick:()=>N(e),children:"Edit"}),(0,u.jsx)(Pe,{variant:"danger",onClick:()=>(e=>{I({isOpen:!0,ingredientId:e.id,ingredientName:e.name})})(e),children:"Delete"})]}))]},e.id)})}),(0,u.jsx)(p.aF,{isOpen:k,onClose:M,title:w?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,u.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),B.name&&B.ingredient_category_id&&B.unit&&B.unit_cost)try{let e="";const r=w?"PUT":"POST";"Brand General"===(null===o||void 0===o?void 0:o.role)||"Brand Manager"===(null===o||void 0===o?void 0:o.role)?e=w?`/api/brands/${i}/ingredients/${w.id}`:`/api/brands/${i}/ingredients`:"Restaurant Admin"===(null===o||void 0===o?void 0:o.role)&&(e=w?`/api/restaurants/${s}/ingredients/${w.id}`:`/api/restaurants/${s}/ingredients`);const n=localStorage.getItem("auth_token"),t=await fetch(e,{method:r,headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},body:JSON.stringify({...B,ingredient_category_id:B.ingredient_category_id?parseInt(B.ingredient_category_id):null,supplier_id:B.supplier_id?Number(B.supplier_id):null,base_quantity:parseFloat(B.base_quantity)||1,unit_cost:parseFloat(B.unit_cost),min_stock:parseInt(B.min_stock)||0})}),a=await t.json();a.success?(M(),(async()=>{try{const e=R();if("Brand General"===(null===o||void 0===o?void 0:o.role)||"Brand Manager"===(null===o||void 0===o?void 0:o.role)){if(i){const r=await fetch(`/api/brands/${i}/ingredients`,{headers:{Authorization:`Bearer ${e}`}}),n=await r.json();n.success&&h(n.data)}}else if("Restaurant Admin"===(null===o||void 0===o?void 0:o.role)&&s){const[i,r]=await Promise.all([fetch(`/api/restaurants/${s}/ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json()),fetch(`/api/restaurants/${s}/brand-ingredients`,{headers:{Authorization:`Bearer ${e}`}}).then(e=>e.json())]);let n=[];r.success&&Array.isArray(r.data)&&(n=[...r.data]),i.success&&Array.isArray(i.data)&&(n=[...n,...i.data]),h(n)}}catch(e){console.error("Failed to fetch ingredients:",e)}})()):alert(a.error||"\uc7ac\ub8cc \uc800\uc7a5 \uc2e4\ud328")}catch(r){console.error("Failed to save ingredient:",r)}else alert("Please fill in all required fields")},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Image"}),(0,u.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{var i;const r=null===(i=e.target.files)||void 0===i?void 0:i[0];if(r){const e=new FileReader;e.onloadend=()=>{E({...B,image_url:e.result})},e.readAsDataURL(r)}},style:{display:"none"},id:"ingredient-image-upload"}),(0,u.jsx)(Ye,{onClick:()=>{var e;return null===(e=document.getElementById("ingredient-image-upload"))||void 0===e?void 0:e.click()},children:B.image_url?(0,u.jsx)("img",{src:B.image_url,alt:"Ingredient"}):(0,u.jsx)(Ze,{children:"Click to upload image"})})]}),(0,u.jsxs)(p.fh,{children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Ingredient Name *"}),(0,u.jsx)(p.ZQ,{type:"text",value:B.name,onChange:e=>E({...B,name:e.target.value}),placeholder:"e.g., Rice",required:!0})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Code"}),(0,u.jsx)(p.ZQ,{type:"text",value:B.code,onChange:e=>E({...B,code:e.target.value}),placeholder:"ING-001"})]})]}),(0,u.jsxs)(p.fh,{children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Category *"}),(0,u.jsxs)(p.FX,{value:B.ingredient_category_id,onChange:e=>E({...B,ingredient_category_id:e.target.value}),required:!0,children:[(0,u.jsx)("option",{value:"",children:"Select category..."}),m.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Supplier"}),(0,u.jsx)(Ee,{options:$.map(e=>({value:e.id,label:e.name,subLabel:"brand"===e.owner_type?"Brand":void 0})),value:B.supplier_id||null,onChange:e=>E({...B,supplier_id:e||""}),placeholder:"Select supplier...",noOptionsMessage:"No suppliers found"})]})]}),(0,u.jsxs)(p.fh,{children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Base Quantity *"}),(0,u.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0.01",value:B.base_quantity,onChange:e=>E({...B,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Unit *"}),(0,u.jsxs)(p.FX,{value:B.unit,onChange:e=>E({...B,unit:e.target.value}),required:!0,children:[(0,u.jsx)("option",{value:"",children:"Select unit..."}),(0,u.jsx)("option",{value:"kg",children:"kg"}),(0,u.jsx)("option",{value:"g",children:"g"}),(0,u.jsx)("option",{value:"L",children:"L"}),(0,u.jsx)("option",{value:"ml",children:"ml"}),(0,u.jsx)("option",{value:"piece",children:"piece"}),(0,u.jsx)("option",{value:"pack",children:"pack"}),(0,u.jsx)("option",{value:"can",children:"can"}),(0,u.jsx)("option",{value:"bottle",children:"bottle"})]})]})]}),(0,u.jsxs)(p.fh,{children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Unit Cost (RM) *"}),(0,u.jsx)(p.ZQ,{type:"number",step:"0.01",value:B.unit_cost,onChange:e=>E({...B,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Minimum Stock"}),(0,u.jsx)(p.ZQ,{type:"number",value:B.min_stock,onChange:e=>E({...B,min_stock:e.target.value}),placeholder:"0"})]})]}),(0,u.jsxs)(Ue,{children:[(0,u.jsx)(p.yl,{type:"button",variant:"secondary",onClick:M,children:"Cancel"}),(0,u.jsx)(p.yl,{type:"submit",variant:"primary",children:w?"Update Ingredient":"Create Ingredient"})]})]})}),(0,u.jsx)(g.A,{isOpen:S.isOpen,title:"Delete Ingredient",message:`Are you sure you want to delete "${S.ingredientName}"? This action cannot be undone.`,onConfirm:async()=>{if(S.ingredientId)try{let e="";"Brand General"===(null===o||void 0===o?void 0:o.role)||"Brand Manager"===(null===o||void 0===o?void 0:o.role)?e=`/api/brands/${i}/ingredients/${S.ingredientId}`:"Restaurant Admin"===(null===o||void 0===o?void 0:o.role)&&(e=`/api/restaurants/${s}/ingredients/${S.ingredientId}`);const r=R(),n=await fetch(e,{method:"DELETE",headers:{Authorization:`Bearer ${r}`}}),t=await n.json();t.success?h(e=>e.filter(e=>e.id!==S.ingredientId)):console.error("Delete failed:",t.error)}catch(e){console.error("Failed to delete ingredient:",e)}finally{I({isOpen:!1,ingredientId:null,ingredientName:""})}},onCancel:()=>{I({isOpen:!1,ingredientId:null,ingredientName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},Ve=t.Ay.div`
  padding: 24px 0;
`,Xe=t.Ay.div`
  display: grid;
  gap: 12px;
`,ei=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${e=>!1!==e.isActive?1:.6};
  ${e=>e.readOnly&&"\n    background: #F9FAFB;\n    border: 1px dashed #D1D5DB;\n  "}

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,ii=t.Ay.div`
  flex: 1;
`,ri=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,ni=t.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,ti=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,ai=t.Ay.div`
  display: flex;
  gap: 8px;
`,oi=t.Ay.button`
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
`,si=t.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,di=t.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,li=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,ci=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,pi=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,xi=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  margin-left: 8px;
`,gi=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ui=t.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,hi=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,mi=t.Ay.button`
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
`,yi=t.Ay.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #FFFBEB;
  border-radius: 12px;
  border: 1px solid #FDE68A;
`,vi=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #92400E;
  font-weight: 500;
`,fi=e=>{let{brandId:i,restaurantId:r,onCountChange:t,onCategoryChange:a}=e;const{user:o}=(0,d.As)(),c=r||(null===o||void 0===o?void 0:o.restaurant_id)||(null===o||void 0===o?void 0:o.restaurantId),[x,h]=(0,n.useState)([]),[m,y]=(0,n.useState)([]),[v,f]=(0,n.useState)(!0),[b,j]=(0,n.useState)(!1),[F,A]=(0,n.useState)(null),[w,C]=(0,n.useState)(!1),[k,_]=(0,n.useState)(null),[B,E]=(0,n.useState)({name:"",emoji:"",description:""}),$="Restaurant Admin"===(null===o||void 0===o?void 0:o.role),z="Brand General"===(null===o||void 0===o?void 0:o.role)||"Brand Manager"===(null===o||void 0===o?void 0:o.role),S=(0,n.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,n.useEffect)(()=>{(async()=>{f(!0);const e=S();try{if(z&&i){const r=await fetch(`/api/brands/${i}/recipe-categories`,{headers:{Authorization:`Bearer ${e}`}}),n=await r.json();n.success&&(h(n.data),t(n.data.length))}else if($&&c){const i=await fetch(`/api/restaurants/${c}/recipe-categories`,{headers:{Authorization:`Bearer ${e}`}}),a=await i.json();var r,n;if(a.success)h(a.data.own_categories||[]),y(a.data.brand_categories||[]),t(((null===(r=a.data.own_categories)||void 0===r?void 0:r.length)||0)+((null===(n=a.data.brand_categories)||void 0===n?void 0:n.length)||0))}}catch(a){console.error("Failed to fetch data:",a)}finally{f(!1)}})()},[i,c,z,$,S,t]);const I=async()=>{try{const n=S();if(z&&i){const e=await fetch(`/api/brands/${i}/recipe-categories`,{headers:{Authorization:`Bearer ${n}`}}),r=await e.json();r.success&&(h(r.data),t(r.data.length))}else if($&&c){const i=await fetch(`/api/restaurants/${c}/recipe-categories`,{headers:{Authorization:`Bearer ${n}`}}),a=await i.json();var e,r;if(a.success)h(a.data.own_categories||[]),y(a.data.brand_categories||[]),t(((null===(e=a.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(r=a.data.brand_categories)||void 0===r?void 0:r.length)||0))}}catch(n){console.error("Failed to fetch categories:",n)}},D=e=>{e?(A(e),E({name:e.name,emoji:e.emoji||"",description:e.description||""})):(A(null),E({name:"",emoji:"",description:""})),j(!0)},R=()=>{j(!1),A(null),E({name:"",emoji:"",description:""})},T=async e=>{if(e.preventDefault(),B.name.trim())try{const e=localStorage.getItem("auth_token");let r="";const n=F?"PUT":"POST";if(z&&i?r=F?`/api/brands/${i}/recipe-categories/${F.id}`:`/api/brands/${i}/recipe-categories`:$&&c&&(r=F?`/api/restaurants/${c}/recipe-categories/${F.id}`:`/api/restaurants/${c}/recipe-categories`),!r)return;const t=await fetch(r,{method:n,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:B.name.trim(),emoji:B.emoji||null,description:B.description.trim()||null})}),o=await t.json();o.success?(R(),I(),null===a||void 0===a||a()):alert(o.error||"Failed to save")}catch(r){console.error("Failed to save category:",r),alert("Failed to save")}},N=async(e,r)=>{const n="up"===r?e-1:e+1;if(n<0||n>=x.length)return;const t=[...x];[t[e],t[n]]=[t[n],t[e]];const a=t.map((e,i)=>({id:e.id,display_order:i}));try{const e=localStorage.getItem("auth_token");let r="";if(z&&i?r=`/api/brands/${i}/recipe-categories/reorder`:$&&c&&(r=`/api/restaurants/${c}/recipe-categories/reorder`),!r)return;await fetch(r,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:a})}),I()}catch(o){console.error("Failed to reorder:",o)}},M=function(e,i,r){let n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,u.jsxs)(ei,{isActive:e.is_active,readOnly:n,children:[!n&&(0,u.jsx)(s.Xd,{onMoveUp:()=>N(i,"up"),onMoveDown:()=>N(i,"down"),disableUp:0===i,disableDown:i===r.length-1}),e.emoji&&(0,u.jsx)(ui,{children:e.emoji}),(0,u.jsxs)(ii,{children:[(0,u.jsxs)(ri,{children:[e.name,n&&(0,u.jsx)(xi,{children:"Brand"})]}),(0,u.jsxs)(ni,{children:[(0,u.jsxs)("span",{children:[e.recipe_count||0," recipes"]}),!n&&(0,u.jsx)(gi,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,u.jsx)(ti,{children:e.description})]}),!n&&(0,u.jsxs)(ai,{children:[(0,u.jsx)(oi,{onClick:()=>D(e),title:"Edit",children:(0,u.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,u.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,u.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,u.jsx)(oi,{onClick:()=>(e=>{_(e),C(!0)})(e),title:"Delete",children:(0,u.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,u.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return v?(0,u.jsx)(Ve,{children:(0,u.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,u.jsxs)(Ve,{children:[(0,u.jsxs)(ci,{children:[(0,u.jsx)(pi,{children:"Recipe Categories"}),(0,u.jsx)(l.cc,{variant:"primary",onClick:()=>D(),children:"Add Category"})]}),$&&m.length>0&&(0,u.jsxs)(yi,{children:[(0,u.jsx)(vi,{children:"Brand Categories (Read Only)"}),(0,u.jsx)(Xe,{children:m.map((e,i)=>M(e,i,m,!0))})]}),0===x.length?(0,u.jsxs)(si,{children:[(0,u.jsx)(di,{children:"No recipe categories yet"}),(0,u.jsx)(li,{children:"Create categories to organize your recipes"}),(0,u.jsx)(l.cc,{variant:"primary",onClick:()=>D(),children:"Add Category"})]}):(0,u.jsx)(Xe,{children:x.map((e,i)=>{return M(e,i,x,(r=e,$&&"brand"===r.owner_type));var r})}),(0,u.jsx)(p.aF,{isOpen:b,onClose:R,title:(F?"Edit":"New")+" Recipe Category",size:"medium",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(p.yl,{variant:"secondary",onClick:R,children:"Cancel"}),(0,u.jsx)(p.yl,{variant:"primary",onClick:T,disabled:!B.name.trim(),children:F?"Update":"Create"})]}),children:(0,u.jsxs)("form",{onSubmit:T,children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Category Name *"}),(0,u.jsx)(p.ZQ,{type:"text",value:B.name,onChange:e=>E({...B,name:e.target.value}),placeholder:"e.g., Main Dishes",autoFocus:!0,required:!0})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Icon"}),(0,u.jsx)(hi,{children:["\ud83c\udf54","\ud83c\udf55","\ud83c\udf57","\ud83e\udd57","\ud83c\udf5c","\ud83c\udf5d","\ud83c\udf64","\ud83e\udd58","\ud83c\udf5b","\ud83c\udf72","\u2615","\ud83e\udd64","\ud83e\uddc3","\ud83c\udf75","\ud83e\uddcb","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd43","\ud83c\udf79","\ud83c\udf78","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf68","\ud83c\udf67","\ud83c\udf66","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6b","\ud83e\udd50","\ud83e\udd56","\ud83c\udf5e","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf71","\ud83c\udf59","\ud83c\udf58","\ud83c\udf63","\ud83c\udf65","\ud83c\udf61","\ud83c\udf62","\ud83c\udf60","\ud83e\udd5f","\ud83e\udd60","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf5f","\ud83e\uded3","\ud83e\udd53","\ud83e\uddc6"].map(e=>(0,u.jsx)(mi,{selected:B.emoji===e,onClick:()=>E({...B,emoji:e}),type:"button",children:e},e))})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Description"}),(0,u.jsx)(p.Lz,{value:B.description,onChange:e=>E({...B,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,u.jsx)(g.A,{isOpen:w,onCancel:()=>{C(!1),_(null)},onConfirm:async()=>{if(k)try{const e=localStorage.getItem("auth_token");let r="";if(z&&i?r=`/api/brands/${i}/recipe-categories/${k.id}`:$&&c&&(r=`/api/restaurants/${c}/recipe-categories/${k.id}`),!r)return;const n=await fetch(r,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(C(!1),_(null),I(),null===a||void 0===a||a()):alert(t.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:k?`Are you sure you want to delete "${k.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},bi=t.Ay.div`
  padding: 24px 0;
`,ji=t.Ay.div`
  display: grid;
  gap: 12px;
`,Fi=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${e=>!1!==e.isActive?1:.6};
  ${e=>e.readOnly&&"\n    background: #F9FAFB;\n    border: 1px dashed #D1D5DB;\n  "}

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,Ai=t.Ay.div`
  flex: 1;
`,wi=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Ci=t.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,ki=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,_i=t.Ay.div`
  display: flex;
  gap: 8px;
`,Bi=t.Ay.button`
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
`,Ei=t.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,$i=t.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,zi=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,Si=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,Ii=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,Di=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
  margin-left: 8px;
`,Ri=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,Ti=t.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,Ni=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,Mi=t.Ay.button`
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
`,Oi=t.Ay.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #FFFBEB;
  border-radius: 12px;
  border: 1px solid #FDE68A;
`,Li=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
  color: #92400E;
  font-weight: 500;
`,Pi=e=>{let{brandId:i,restaurantId:r,onCountChange:t,onCategoryChange:a}=e;const{user:o}=(0,d.As)(),c=r||(null===o||void 0===o?void 0:o.restaurant_id)||(null===o||void 0===o?void 0:o.restaurantId),[x,h]=(0,n.useState)([]),[m,y]=(0,n.useState)([]),[v,f]=(0,n.useState)(!0),[b,j]=(0,n.useState)(!1),[F,A]=(0,n.useState)(null),[w,C]=(0,n.useState)(!1),[k,_]=(0,n.useState)(null),[B,E]=(0,n.useState)({name:"",emoji:"",description:""}),$="Restaurant Admin"===(null===o||void 0===o?void 0:o.role),z="Brand General"===(null===o||void 0===o?void 0:o.role)||"Brand Manager"===(null===o||void 0===o?void 0:o.role),S=(0,n.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,n.useEffect)(()=>{(async()=>{f(!0);const e=S();try{if(z&&i){const r=await fetch(`/api/brands/${i}/ingredient-categories`,{headers:{Authorization:`Bearer ${e}`}}),n=await r.json();n.success&&(h(n.data),t(n.data.length))}else if($&&c){const i=await fetch(`/api/restaurants/${c}/ingredient-categories`,{headers:{Authorization:`Bearer ${e}`}}),a=await i.json();var r,n;if(a.success)h(a.data.own_categories||[]),y(a.data.brand_categories||[]),t(((null===(r=a.data.own_categories)||void 0===r?void 0:r.length)||0)+((null===(n=a.data.brand_categories)||void 0===n?void 0:n.length)||0))}}catch(a){console.error("Failed to fetch data:",a)}finally{f(!1)}})()},[i,c,z,$,S,t]);const I=async()=>{try{const n=S();if(z&&i){const e=await fetch(`/api/brands/${i}/ingredient-categories`,{headers:{Authorization:`Bearer ${n}`}}),r=await e.json();r.success&&(h(r.data),t(r.data.length))}else if($&&c){const i=await fetch(`/api/restaurants/${c}/ingredient-categories`,{headers:{Authorization:`Bearer ${n}`}}),a=await i.json();var e,r;if(a.success)h(a.data.own_categories||[]),y(a.data.brand_categories||[]),t(((null===(e=a.data.own_categories)||void 0===e?void 0:e.length)||0)+((null===(r=a.data.brand_categories)||void 0===r?void 0:r.length)||0))}}catch(n){console.error("Failed to fetch categories:",n)}},D=e=>{e?(A(e),E({name:e.name,emoji:e.emoji||"",description:e.description||""})):(A(null),E({name:"",emoji:"",description:""})),j(!0)},R=()=>{j(!1),A(null),E({name:"",emoji:"",description:""})},T=async e=>{if(e.preventDefault(),B.name.trim())try{const e=localStorage.getItem("auth_token");let r="";const n=F?"PUT":"POST";if(z&&i?r=F?`/api/brands/${i}/ingredient-categories/${F.id}`:`/api/brands/${i}/ingredient-categories`:$&&c&&(r=F?`/api/restaurants/${c}/ingredient-categories/${F.id}`:`/api/restaurants/${c}/ingredient-categories`),!r)return;const t=await fetch(r,{method:n,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:B.name.trim(),emoji:B.emoji||null,description:B.description.trim()||null})}),o=await t.json();o.success?(R(),I(),null===a||void 0===a||a()):alert(o.error||"Failed to save")}catch(r){console.error("Failed to save category:",r),alert("Failed to save")}},N=async(e,r)=>{const n="up"===r?e-1:e+1;if(n<0||n>=x.length)return;const t=[...x];[t[e],t[n]]=[t[n],t[e]];const a=t.map((e,i)=>({id:e.id,display_order:i}));try{const e=localStorage.getItem("auth_token");let r="";if(z&&i?r=`/api/brands/${i}/ingredient-categories/reorder`:$&&c&&(r=`/api/restaurants/${c}/ingredient-categories/reorder`),!r)return;await fetch(r,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({orders:a})}),I()}catch(o){console.error("Failed to reorder:",o)}},M=function(e,i,r){let n=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return(0,u.jsxs)(Fi,{isActive:e.is_active,readOnly:n,children:[!n&&(0,u.jsx)(s.Xd,{onMoveUp:()=>N(i,"up"),onMoveDown:()=>N(i,"down"),disableUp:0===i,disableDown:i===r.length-1}),e.emoji&&(0,u.jsx)(Ti,{children:e.emoji}),(0,u.jsxs)(Ai,{children:[(0,u.jsxs)(wi,{children:[e.name,n&&(0,u.jsx)(Di,{children:"Brand"})]}),(0,u.jsxs)(Ci,{children:[(0,u.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),!n&&(0,u.jsx)(Ri,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,u.jsx)(ki,{children:e.description})]}),!n&&(0,u.jsxs)(_i,{children:[(0,u.jsx)(Bi,{onClick:()=>D(e),title:"Edit",children:(0,u.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,u.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,u.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,u.jsx)(Bi,{onClick:()=>(e=>{_(e),C(!0)})(e),title:"Delete",children:(0,u.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,u.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id)};return v?(0,u.jsx)(bi,{children:(0,u.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,u.jsxs)(bi,{children:[(0,u.jsxs)(Si,{children:[(0,u.jsx)(Ii,{children:"Ingredient Categories"}),(0,u.jsx)(l.cc,{variant:"primary",onClick:()=>D(),children:"Add Category"})]}),$&&m.length>0&&(0,u.jsxs)(Oi,{children:[(0,u.jsx)(Li,{children:"Brand Categories (Read Only)"}),(0,u.jsx)(ji,{children:m.map((e,i)=>M(e,i,m,!0))})]}),0===x.length?(0,u.jsxs)(Ei,{children:[(0,u.jsx)($i,{children:"No ingredient categories yet"}),(0,u.jsx)(zi,{children:"Create categories to organize your ingredients"}),(0,u.jsx)(l.cc,{variant:"primary",onClick:()=>D(),children:"Add Category"})]}):(0,u.jsx)(ji,{children:x.map((e,i)=>{return M(e,i,x,(r=e,$&&"brand"===r.owner_type));var r})}),(0,u.jsx)(p.aF,{isOpen:b,onClose:R,title:(F?"Edit":"New")+" Ingredient Category",size:"medium",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(p.yl,{variant:"secondary",onClick:R,children:"Cancel"}),(0,u.jsx)(p.yl,{variant:"primary",onClick:T,disabled:!B.name.trim(),children:F?"Update":"Create"})]}),children:(0,u.jsxs)("form",{onSubmit:T,children:[(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Category Name *"}),(0,u.jsx)(p.ZQ,{type:"text",value:B.name,onChange:e=>E({...B,name:e.target.value}),placeholder:"e.g., Vegetables",autoFocus:!0,required:!0})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Icon"}),(0,u.jsx)(Ni,{children:["\ud83e\udd6c","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83c\udf36\ufe0f","\ud83e\udd52","\ud83c\udf3d","\ud83e\udd66","\ud83c\udf56","\ud83e\udd69","\ud83c\udf57","\ud83e\udd53","\ud83c\udf64","\ud83e\udd90","\ud83e\udd91","\ud83d\udc1f","\ud83e\udd9e","\ud83e\udd80","\ud83e\udd5b","\ud83e\uddc0","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf76","\ud83e\uddc2","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf6f","\ud83c\udf3e","\ud83c\udf5a","\ud83c\udf5e","\ud83e\udd56","\ud83e\udd50","\ud83e\uddc1","\ud83c\udf70","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf6b","\ud83c\udf4b","\ud83c\udf4a","\ud83c\udf4e","\ud83c\udf50","\ud83c\udf4c","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83c\udf51","\ud83e\udd6d","\ud83e\uddca","\ud83d\udca7","\ud83e\uded9","\ud83c\udf7e","\ud83e\udd6b","\ud83e\uddf4","\ud83c\udf75","\u2615","\ud83e\uddc3","\ud83e\udd64"].map(e=>(0,u.jsx)(Mi,{selected:B.emoji===e,onClick:()=>E({...B,emoji:e}),type:"button",children:e},e))})]}),(0,u.jsxs)(p.gE,{children:[(0,u.jsx)(p.lR,{children:"Description"}),(0,u.jsx)(p.Lz,{value:B.description,onChange:e=>E({...B,description:e.target.value}),placeholder:"Brief description of this category..."})]})]})}),(0,u.jsx)(g.A,{isOpen:w,onCancel:()=>{C(!1),_(null)},onConfirm:async()=>{if(k)try{const e=localStorage.getItem("auth_token");let r="";if(z&&i?r=`/api/brands/${i}/ingredient-categories/${k.id}`:$&&c&&(r=`/api/restaurants/${c}/ingredient-categories/${k.id}`),!r)return;const n=await fetch(r,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await n.json();t.success?(C(!1),_(null),I(),null===a||void 0===a||a()):alert(t.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:k?`Are you sure you want to delete "${k.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},Ui=t.Ay.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  margin-left: 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
`,qi=t.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,Qi=t.Ay.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  cursor: pointer;
  min-width: 200px;

  &:hover {
    border-color: #CBD5E1;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,Gi=()=>{const{user:e}=(0,d.As)(),{restaurantId:i}=(0,a.g)(),[r,t]=(0,a.ok)(),[l,c]=(0,n.useState)(0),[p,x]=(0,n.useState)(0),[g,h]=(0,n.useState)(0),[m,y]=(0,n.useState)(0),[v,f]=(0,n.useState)([]),[b,j]=(0,n.useState)(!0),[F,A]=(0,n.useState)(0),[w,C]=(0,n.useState)(0),k=r.get("tab")||"recipes",_=r.get("brandId"),B=_?Number(_):v.length>0?v[0].id:null;(0,n.useEffect)(()=>{e&&"Brand General"===e.role?E():j(!1)},[e]);const E=async()=>{try{const e=localStorage.getItem("auth_token"),i=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json();f(e),e.length>0&&!_&&t({tab:k,brandId:String(e[0].id)})}}catch(e){console.error("Error fetching brands:",e)}finally{j(!1)}},$=e=>{const i={tab:e};B&&(i.brandId=String(B)),t(i)};return b?(0,u.jsx)(o.A,{children:(0,u.jsxs)(s.mc,{children:[(0,u.jsx)(s.Y9,{children:(0,u.jsx)(s.hE,{children:"Recipes"})}),(0,u.jsx)(s.UC,{children:(0,u.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})}):"Brand General"===(null===e||void 0===e?void 0:e.role)&&0===v.length?(0,u.jsx)(o.A,{children:(0,u.jsxs)(s.mc,{children:[(0,u.jsx)(s.Y9,{children:(0,u.jsx)(s.hE,{children:"Recipes"})}),(0,u.jsx)(s.UC,{children:(0,u.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"No brands found. Please create a brand first."})})]})}):(0,u.jsx)(o.A,{children:(0,u.jsxs)(s.mc,{children:[(0,u.jsxs)(s.Y9,{children:[(0,u.jsx)(s.hE,{children:"Recipes"}),"Brand General"===(null===e||void 0===e?void 0:e.role)&&v.length>0&&(0,u.jsx)(qi,{children:(0,u.jsx)(Qi,{value:B||"",onChange:e=>{return i=Number(e.target.value),void t({tab:k,brandId:String(i)});var i},children:v.map(e=>(0,u.jsx)("option",{value:e.id,children:e.name},e.id))})})]}),(0,u.jsxs)(s.UC,{children:[(0,u.jsxs)(s.j,{children:[(0,u.jsxs)(s.oz,{active:"recipes"===k,onClick:()=>$("recipes"),children:["Recipes",(0,u.jsx)(Ui,{children:l})]}),(0,u.jsxs)(s.oz,{active:"ingredients"===k,onClick:()=>$("ingredients"),children:["Ingredients",(0,u.jsx)(Ui,{children:p})]}),(0,u.jsxs)(s.oz,{active:"recipe-categories"===k,onClick:()=>$("recipe-categories"),children:["Recipe Categories",(0,u.jsx)(Ui,{children:g})]}),(0,u.jsxs)(s.oz,{active:"ingredient-categories"===k,onClick:()=>$("ingredient-categories"),children:["Ingredient Categories",(0,u.jsx)(Ui,{children:m})]})]}),(B||"Brand General"!==(null===e||void 0===e?void 0:e.role))&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("div",{style:{display:"recipes"===k?"block":"none"},children:(0,u.jsx)(ve,{brandId:B,restaurantId:i?Number(i):null,onCountChange:c,categoryRefreshKey:F})}),(0,u.jsx)("div",{style:{display:"ingredients"===k?"block":"none"},children:(0,u.jsx)(Ke,{brandId:B,restaurantId:i?Number(i):null,onCountChange:x,categoryRefreshKey:w})}),(0,u.jsx)("div",{style:{display:"recipe-categories"===k?"block":"none"},children:(0,u.jsx)(fi,{brandId:B,restaurantId:i?Number(i):null,onCountChange:h,onCategoryChange:()=>A(e=>e+1)})}),(0,u.jsx)("div",{style:{display:"ingredient-categories"===k?"block":"none"},children:(0,u.jsx)(Pi,{brandId:B,restaurantId:i?Number(i):null,onCountChange:y,onCategoryChange:()=>C(e=>e+1)})})]})]})]})})}}}]);