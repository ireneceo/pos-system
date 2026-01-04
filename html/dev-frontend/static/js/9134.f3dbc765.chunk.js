"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9134],{2488:(e,r,t)=>{t.d(r,{DO:()=>l,Jt:()=>c,Qn:()=>d});t(9950);var n=t(4752),i=t(4414);const o=n.Ay.div`
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
`,d=e=>{let{children:r,className:t,style:n,...a}=e;return(0,i.jsx)(o,{className:t,style:n,...a,children:r})},l=e=>{let{placeholder:r="Search...",...t}=e;return(0,i.jsx)(a,{placeholder:r,...t})},c=e=>{let{children:r,...t}=e;return(0,i.jsx)(s,{...t,children:r})}},3705:(e,r,t)=>{t.d(r,{cc:()=>i});var n=t(4752);const i=n.Ay.button`
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
`},4669:(e,r,t)=>{t.d(r,{A:()=>b});var n=t(9950),i=t(4752),o=t(4414);const a=i.Ay.div`
  /* Container styling - spacing handled by parent */
`,s=i.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,d=i.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,l=i.Ay.div`
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
`,p=i.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,x=i.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,u=i.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,h=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,g=i.Ay.label`
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
`,b=e=>{let{value:r,onChange:t,label:i="Logo Upload",helpText:b="Upload an image for your logo",maxSize:j=2,previewSize:f=150,showRemoveButton:v=!0,changeButtonText:w="Change Image",removeButtonText:F="Remove Image",imageAltText:C="Uploaded"}=e;const[A,k]=(0,n.useState)(!1),_=(0,n.useRef)(null),E=(0,n.useRef)(null),B=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*j*1024)return void alert(`Image size should be less than ${j}MB`);const r=new FileReader;r.onload=e=>{var r;const n=new Image;n.onload=()=>{const e=document.createElement("canvas"),r=e.getContext("2d");if(!r)return;const i=800;let o=n.width,a=n.height;(o>i||a>i)&&(o>a?(a=a/o*i,o=i):(o=o/a*i,a=i)),e.width=o,e.height=a,r.drawImage(n,0,0,o,a);const s=e.toDataURL("image/jpeg",.85);t(s)},n.src=null===(r=e.target)||void 0===r?void 0:r.result},r.readAsDataURL(e)},z=e=>{const r=e.target.files;r&&r.length>0&&B(r[0])};return(0,o.jsxs)(a,{children:[i&&(0,o.jsx)(s,{children:i}),b&&(0,o.jsx)(d,{children:b}),(0,o.jsxs)(l,{children:[(0,o.jsx)(c,{ref:E,isDragging:A,hasImage:!!r,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),k(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===E.current&&k(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),k(!1);const r=e.dataTransfer.files;r&&r.length>0&&B(r[0])},onClick:()=>{var e;r||(null===(e=_.current)||void 0===e||e.click())},children:r?(0,o.jsx)("img",{src:r,alt:C}):(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{children:A?"Drop image here":"Drag & drop or click to upload"}),(0,o.jsxs)(u,{children:["PNG, JPG, GIF up to ",j,"MB"]})]})}),r&&(0,o.jsxs)(h,{children:[(0,o.jsxs)(g,{children:[w,(0,o.jsx)("input",{ref:_,type:"file",accept:"image/*",onChange:z})]}),v&&(0,o.jsx)(m,{onClick:()=>{t("")},children:F})]})]}),!r&&(0,o.jsx)(y,{ref:_,type:"file",accept:"image/*",onChange:z})]})}},7617:(e,r,t)=>{t.d(r,{A:()=>x});t(9950);var n=t(4752),i=t(9610),o=t(4414);const a=n.Ay.div`
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
`,x=e=>{let{isOpen:r,title:t,message:n,onConfirm:x,onCancel:u,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return r?(0,o.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,o.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(s,{children:[(0,o.jsx)(d,{children:t}),(0,o.jsx)(l,{children:n})]}),(0,o.jsxs)(c,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:u,children:g}),(0,o.jsx)(p,{variant:"primary",type:m,onClick:x,children:h})]})]})}):null}},9134:(e,r,t)=>{t.r(r),t.d(r,{default:()=>$e});var n=t(9950),i=t(4752),o=t(4492),a=t(3310),s=t(7492),d=t(1367),l=t(3705),c=t(2488),p=t(9610),x=t(4669),u=t(7617),h=t(4414);const g=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,m=i.Ay.div`
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
`,y=i.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`,b=i.Ay.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${e=>e.src?`url(${e.src}) center/cover`:"#F3F4F6"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 28px;
`,j=i.Ay.div`
  flex: 1;
  min-width: 0;
`,f=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,v=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`,w=i.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,F=i.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,C=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,A=i.Ay.span`
  color: #6B7280;
`,k=i.Ay.span`
  color: #0A2540;
  font-weight: 500;
`,_=i.Ay.span`
  color: #059669;
  font-weight: 600;
  font-size: 16px;
`,E=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,B=i.Ay.button`
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
`,z=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  margin-top: 24px;
`,S=i.Ay.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,D=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 20px 0;
`,$=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`,q=i.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: ${e=>e.color||"#E5E7EB"};
  color: #374151;
  border-radius: 4px;
  font-size: 11px;
`,T=(0,i.Ay)(q)`
  background: #DBEAFE;
  color: #1E40AF;
`,P=(0,i.Ay)(q)`
  background: #E5E7EB;
  color: #374151;
`,R=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
`,O=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`,L=i.Ay.label`
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
`,M=e=>{let{brands:r,onCountChange:t,categoryRefreshKey:i,optionRefreshKey:o}=e;const[a,s]=(0,n.useState)([]),[d,q]=(0,n.useState)([]),[M,N]=(0,n.useState)([]),[U,I]=(0,n.useState)(!0),[G,Q]=(0,n.useState)(""),[J,Y]=(0,n.useState)("all"),[W,K]=(0,n.useState)("all"),[Z,H]=(0,n.useState)(!1),[V,X]=(0,n.useState)(null),[ee,re]=(0,n.useState)(!1),[te,ne]=(0,n.useState)(null),[ie,oe]=(0,n.useState)({name:"",description:"",sku:"",unit:"",base_quantity:"1",unit_price:"",min_order_quantity:"1",category_id:"",image_url:"",is_active:!0,sync_to_ingredients:!0,brand_ids:[],option_group_ids:[]}),[ae,se]=(0,n.useState)(null),[de,le]=(0,n.useState)(!1),ce=(0,n.useCallback)(()=>localStorage.getItem("auth_token"),[]),pe=(0,n.useCallback)(async()=>{try{const e=ce(),r=await fetch("/api/brand-products",{headers:{Authorization:`Bearer ${e}`}}),n=await r.json();n.success&&(s(n.data),t(n.data.length))}catch(e){console.error("Failed to fetch products:",e)}},[ce,t]),xe=(0,n.useCallback)(async()=>{try{const e=ce(),r=await fetch("/api/brand-product-categories",{headers:{Authorization:`Bearer ${e}`}}),t=await r.json();t.success&&q(t.data)}catch(e){console.error("Failed to fetch categories:",e)}},[ce]),ue=(0,n.useCallback)(async()=>{try{const e=ce(),r=await fetch("/api/brand-product-option-groups",{headers:{Authorization:`Bearer ${e}`}}),t=await r.json();t.success&&N(t.data)}catch(e){console.error("Failed to fetch option groups:",e)}},[ce]);(0,n.useEffect)(()=>{(async()=>{I(!0),await Promise.all([pe(),xe(),ue()]),I(!1)})()},[pe,xe,ue]),(0,n.useEffect)(()=>{void 0!==i&&xe()},[i,xe]),(0,n.useEffect)(()=>{void 0!==o&&ue()},[o,ue]);const he=e=>{var r,t,n;e?(X(e),oe({name:e.name,description:e.description||"",sku:e.sku||"",unit:e.unit||"",base_quantity:(e.base_quantity||1).toString(),unit_price:e.unit_price.toString(),min_order_quantity:e.min_order_quantity.toString(),category_id:(null===(r=e.category_id)||void 0===r?void 0:r.toString())||"",image_url:e.image_url||"",is_active:e.is_active,sync_to_ingredients:!1!==e.sync_to_ingredients,brand_ids:(null===(t=e.brands)||void 0===t?void 0:t.map(e=>e.id))||[],option_group_ids:(null===(n=e.optionGroups)||void 0===n?void 0:n.map(e=>e.id))||[]})):(X(null),oe({name:"",description:"",sku:"",unit:"",base_quantity:"1",unit_price:"",min_order_quantity:"1",category_id:d.length>0?d[0].id.toString():"",image_url:"",is_active:!0,sync_to_ingredients:!0,brand_ids:[],option_group_ids:[]}));H(!0)},ge=()=>{H(!1),X(null),se(null)},me=a.filter(e=>{var r,t;const n=e.name.toLowerCase().includes(G.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(G.toLowerCase()),i="all"===J||(null===(r=e.category_id)||void 0===r?void 0:r.toString())===J,o="all"===W||(null===(t=e.brands)||void 0===t?void 0:t.some(e=>e.id.toString()===W));return n&&i&&o});return U?(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading products..."}):(0,h.jsxs)("div",{children:[(0,h.jsxs)(c.Qn,{children:[(0,h.jsx)(c.DO,{type:"text",placeholder:"Search products...",value:G,onChange:e=>Q(e.target.value)}),(0,h.jsxs)(c.Jt,{value:J,onChange:e=>Y(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Categories"}),d.map(e=>(0,h.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]}),(0,h.jsxs)(c.Jt,{value:W,onChange:e=>K(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Brands"}),r.map(e=>(0,h.jsx)("option",{value:e.id.toString(),children:e.name},e.id))]}),(0,h.jsx)(l.cc,{onClick:()=>he(),children:"Add Product"})]}),0===me.length?(0,h.jsxs)(z,{children:[(0,h.jsx)(S,{children:G||"all"!==J||"all"!==W?"No products found":"No products yet"}),(0,h.jsx)(D,{children:G||"all"!==J||"all"!==W?"Try adjusting your search or filter criteria.":"Start by adding your first product."}),!G&&"all"===J&&"all"===W&&(0,h.jsx)(l.cc,{onClick:()=>he(),children:"Add Product"})]}):(0,h.jsx)(g,{children:me.map(e=>(0,h.jsxs)(m,{isActive:e.is_active,onClick:()=>he(e),children:[(0,h.jsxs)(y,{children:[(0,h.jsx)(b,{src:e.image_url,children:!e.image_url&&"\ud83d\udce6"}),(0,h.jsxs)(j,{children:[(0,h.jsx)(f,{children:e.name}),e.sku&&(0,h.jsxs)(v,{children:["SKU: ",e.sku]}),e.category&&(0,h.jsxs)(w,{children:[e.category.emoji," ",e.category.name]})]})]}),(0,h.jsxs)(F,{children:[(0,h.jsxs)(C,{children:[(0,h.jsx)(A,{children:"Unit Price"}),(0,h.jsxs)(_,{children:["RM ",(Number(e.unit_price)||0).toFixed(2)]})]}),e.unit&&(0,h.jsxs)(C,{children:[(0,h.jsx)(A,{children:"Unit"}),(0,h.jsx)(k,{children:e.unit})]}),(0,h.jsxs)(C,{children:[(0,h.jsx)(A,{children:"Min Order"}),(0,h.jsx)(k,{children:e.min_order_quantity})]})]}),e.brands&&e.brands.length>0&&(0,h.jsx)($,{children:e.brands.map(e=>(0,h.jsx)(T,{children:e.name},e.id))}),e.optionGroups&&e.optionGroups.length>0&&(0,h.jsx)($,{children:e.optionGroups.map(e=>(0,h.jsx)(P,{children:e.name},e.id))}),(0,h.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,h.jsx)(B,{onClick:()=>he(e),children:"Edit"}),(0,h.jsx)(B,{variant:"danger",onClick:r=>((e,r)=>{r.stopPropagation(),ne(e),re(!0)})(e,r),children:"Delete"})]})]},e.id))}),Z&&(0,h.jsx)(p.aF,{isOpen:Z,onClose:ge,title:V?"Edit Product":"Add Product",maxWidth:"700px",children:(0,h.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),!de)if(se(null),ie.name.trim())if(ie.unit){le(!0);try{const e=ce(),r=V?"PUT":"POST",t=V?`/api/brand-products/${V.id}`:"/api/brand-products",n=await fetch(t,{method:r,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:ie.name.trim(),description:ie.description.trim()||null,sku:ie.sku.trim()||null,unit:ie.unit||null,base_quantity:parseFloat(ie.base_quantity)||1,unit_price:parseFloat(ie.unit_price)||0,min_order_quantity:parseInt(ie.min_order_quantity)||1,category_id:ie.category_id?parseInt(ie.category_id):null,image_url:ie.image_url||null,is_active:ie.is_active,sync_to_ingredients:ie.sync_to_ingredients,brand_ids:ie.brand_ids,option_group_ids:ie.option_group_ids})}),i=await n.json();i.success?(ge(),pe()):se(i.error||"Failed to save product")}catch(r){console.error("Failed to save product:",r),se("Failed to save product. Please try again.")}finally{le(!1)}}else se("Unit is required");else se("Product name is required")},children:[(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Name *"}),(0,h.jsx)(p.ZQ,{type:"text",value:ie.name,onChange:e=>oe({...ie,name:e.target.value}),placeholder:"Product name",required:!0})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"SKU"}),(0,h.jsx)(p.ZQ,{type:"text",value:ie.sku,onChange:e=>oe({...ie,sku:e.target.value}),placeholder:"Product code"})]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Category"}),(0,h.jsxs)(p.FX,{value:ie.category_id,onChange:e=>oe({...ie,category_id:e.target.value}),children:[(0,h.jsx)("option",{value:"",children:"No category"}),d.map(e=>(0,h.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)(p.Lz,{value:ie.description,onChange:e=>oe({...ie,description:e.target.value}),placeholder:"Product description",rows:2})]}),(0,h.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Unit Price (RM) *"}),(0,h.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",value:ie.unit_price,onChange:e=>oe({...ie,unit_price:e.target.value}),placeholder:"0.00",required:!0})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Base Qty *"}),(0,h.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0.01",value:ie.base_quantity,onChange:e=>oe({...ie,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Unit *"}),(0,h.jsxs)(p.FX,{value:ie.unit,onChange:e=>oe({...ie,unit:e.target.value}),required:!0,children:[(0,h.jsx)("option",{value:"",children:"Select unit"}),[{value:"kg",label:"kg"},{value:"g",label:"g"},{value:"L",label:"L"},{value:"ml",label:"ml"},{value:"piece",label:"piece"},{value:"pack",label:"pack"},{value:"can",label:"can"},{value:"bottle",label:"bottle"}].map(e=>(0,h.jsx)("option",{value:e.value,children:e.label},e.value))]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Min Order Qty"}),(0,h.jsx)(p.ZQ,{type:"number",min:"1",value:ie.min_order_quantity,onChange:e=>oe({...ie,min_order_quantity:e.target.value})})]})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Product Image"}),(0,h.jsx)(x.A,{value:ie.image_url,onChange:e=>oe({...ie,image_url:e||""}),label:"",helpText:"Upload a product image (max 2MB)"})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Linked Brands"}),(0,h.jsx)(O,{children:r.map(e=>(0,h.jsxs)(L,{children:[(0,h.jsx)("input",{type:"checkbox",checked:ie.brand_ids.includes(e.id),onChange:()=>{return r=e.id,void oe(e=>({...e,brand_ids:e.brand_ids.includes(r)?e.brand_ids.filter(e=>e!==r):[...e.brand_ids,r]}));var r}}),(0,h.jsx)("span",{children:e.name})]},e.id))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Option Groups"}),M.length>0?(0,h.jsx)(O,{children:M.map(e=>(0,h.jsxs)(L,{children:[(0,h.jsx)("input",{type:"checkbox",checked:ie.option_group_ids.includes(e.id),onChange:()=>{return r=e.id,void oe(e=>({...e,option_group_ids:e.option_group_ids.includes(r)?e.option_group_ids.filter(e=>e!==r):[...e.option_group_ids,r]}));var r}}),(0,h.jsxs)("span",{children:[e.name," ",e.is_required?"(Required)":""]})]},e.id))}):(0,h.jsx)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px",color:"#6B7280",fontSize:"13px"},children:"No option groups available. Create option groups in the Options tab first."})]}),(0,h.jsxs)("div",{style:{display:"flex",gap:"24px"},children:[(0,h.jsx)(p.gE,{style:{marginBottom:0},children:(0,h.jsxs)(R,{children:[(0,h.jsx)("input",{type:"checkbox",checked:ie.is_active,onChange:e=>oe({...ie,is_active:e.target.checked})}),"Active"]})}),(0,h.jsx)(p.gE,{style:{marginBottom:0},children:(0,h.jsxs)(R,{children:[(0,h.jsx)("input",{type:"checkbox",checked:ie.sync_to_ingredients,onChange:e=>oe({...ie,sync_to_ingredients:e.target.checked})}),"Sync to Recipe Ingredients"]})})]}),(0,h.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,h.jsx)(p.yl,{type:"button",onClick:ge,disabled:de,children:"Cancel"}),(0,h.jsx)(p.yl,{type:"submit",variant:"primary",disabled:de,children:de?"Saving...":V?"Update":"Create"})]}),ae&&(0,h.jsx)("div",{style:{marginTop:"16px",padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:ae})]})}),(0,h.jsx)(u.A,{isOpen:ee,onCancel:()=>{re(!1),ne(null)},onConfirm:async()=>{if(te)try{const e=ce(),r=await fetch(`/api/brand-products/${te.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await r.json();t.success?(re(!1),ne(null),pe()):alert(t.error||"Failed to delete product")}catch(e){console.error("Failed to delete product:",e),alert("Failed to delete product")}},title:"Delete Product",message:`Are you sure you want to delete "${null===te||void 0===te?void 0:te.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},N=i.Ay.div`
  margin-top: 24px;
`,U=i.Ay.div`
  display: grid;
  gap: 12px;
`,I=i.Ay.div`
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
`,G=i.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,Q=i.Ay.div`
  flex: 1;
`,J=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Y=i.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,W=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,K=i.Ay.div`
  display: flex;
  gap: 8px;
`,Z=i.Ay.button`
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
`,H=i.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,V=i.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,X=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,ee=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,re=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,te=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ne=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,ie=i.Ay.button`
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
`,oe=e=>{let{onCountChange:r,onCategoryChange:t}=e;const[i,o]=(0,n.useState)([]),[a,d]=(0,n.useState)(!0),[c,x]=(0,n.useState)(!1),[g,m]=(0,n.useState)(null),[y,b]=(0,n.useState)(!1),[j,f]=(0,n.useState)(null),[v,w]=(0,n.useState)({name:"",emoji:"",description:""}),F=(0,n.useCallback)(()=>localStorage.getItem("auth_token"),[]),C=(0,n.useCallback)(async()=>{try{const e=F(),t=await fetch("/api/brand-product-categories",{headers:{Authorization:`Bearer ${e}`}}),n=await t.json();n.success&&(o(n.data),r(n.data.length))}catch(e){console.error("Failed to fetch categories:",e)}finally{d(!1)}},[F,r]);(0,n.useEffect)(()=>{d(!0),C()},[C]);const A=e=>{e?(m(e),w({name:e.name,emoji:e.emoji||"",description:e.description||""})):(m(null),w({name:"",emoji:"",description:""})),x(!0)},k=()=>{x(!1),m(null),w({name:"",emoji:"",description:""})},_=async(e,r)=>{try{const t=F(),n=await fetch(`/api/brand-product-categories/${e}/reorder`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({direction:r})}),i=await n.json();i.success?C():alert(i.error||"Failed to reorder")}catch(t){console.error("Failed to reorder category:",t)}};return a?(0,h.jsx)(N,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading categories..."})}):(0,h.jsxs)(N,{children:[(0,h.jsxs)(ee,{children:[(0,h.jsx)(re,{children:"Product Categories"}),(0,h.jsx)(l.cc,{onClick:()=>A(),children:"Add Category"})]}),0===i.length?(0,h.jsxs)(H,{children:[(0,h.jsx)(V,{children:"No categories yet"}),(0,h.jsx)(X,{children:"Create your first product category to organize your products."}),(0,h.jsx)(l.cc,{onClick:()=>A(),children:"Add Category"})]}):(0,h.jsx)(U,{children:i.map((e,r)=>(0,h.jsxs)(I,{isActive:e.is_active,children:[(0,h.jsx)(s.Xd,{onMoveUp:()=>_(e.id,"up"),onMoveDown:()=>_(e.id,"down"),disableUp:0===r,disableDown:r===i.length-1}),(0,h.jsx)(G,{children:e.emoji||"\ud83d\udce6"}),(0,h.jsxs)(Q,{children:[(0,h.jsx)(J,{children:e.name}),(0,h.jsxs)(Y,{children:[(0,h.jsxs)("span",{children:[e.product_count||0," products"]}),(0,h.jsx)(te,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,h.jsx)(W,{children:e.description})]}),(0,h.jsxs)(K,{children:[(0,h.jsx)(Z,{onClick:()=>A(e),title:"Edit",children:(0,h.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,h.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"}),(0,h.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,h.jsx)(Z,{onClick:()=>(e=>{f(e),b(!0)})(e),title:"Delete",children:(0,h.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,h.jsx)("path",{d:"M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"}),(0,h.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),(0,h.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17"})]})})]})]},e.id))}),c&&(0,h.jsx)(p.aF,{isOpen:c,onClose:k,title:g?"Edit Category":"Add Category",children:(0,h.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),v.name.trim())try{const e=F(),r=g?"PUT":"POST",n=g?`/api/brand-product-categories/${g.id}`:"/api/brand-product-categories",i=await fetch(n,{method:r,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:v.name.trim(),emoji:v.emoji||null,description:v.description.trim()||null})}),o=await i.json();o.success?(k(),C(),null===t||void 0===t||t()):alert(o.error||"Failed to save")}catch(r){console.error("Failed to save category:",r),alert("Failed to save")}},children:[(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Name *"}),(0,h.jsx)(p.ZQ,{type:"text",value:v.name,onChange:e=>w({...v,name:e.target.value}),placeholder:"Category name",required:!0})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Emoji"}),(0,h.jsx)(ne,{children:["\ud83d\udce6","\ud83e\udd6b","\ud83e\uddc2","\ud83c\udf3e","\ud83e\udd5b","\ud83e\uddc8","\ud83e\udd5a","\ud83c\udf56","\ud83e\udd69","\ud83c\udf57","\ud83d\udc1f","\ud83e\udd90","\ud83e\udd91","\ud83e\udd6c","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83c\udf36\ufe0f","\ud83c\udf4b","\ud83c\udf4a","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd65","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf6f","\ud83e\uded2","\ud83e\uddca","\ud83c\udf76","\ud83e\uded9","\ud83e\uddf4","\ud83e\uddc3","\ud83c\udf75","\u2615","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd64","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf6b","\ud83c\udf6c","\ud83c\udf6d","\ud83e\uddc7","\ud83e\udd50","\ud83c\udf5e"].map(e=>(0,h.jsx)(ie,{type:"button",selected:v.emoji===e,onClick:()=>w({...v,emoji:e}),children:e},e))})]}),(0,h.jsxs)(p.gE,{children:[(0,h.jsx)(p.lR,{children:"Description"}),(0,h.jsx)(p.Lz,{value:v.description,onChange:e=>w({...v,description:e.target.value}),placeholder:"Category description (optional)",rows:3})]}),(0,h.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,h.jsx)(p.yl,{type:"button",onClick:k,children:"Cancel"}),(0,h.jsx)(p.yl,{type:"submit",variant:"primary",children:g?"Update":"Create"})]})]})}),(0,h.jsx)(u.A,{isOpen:y,onCancel:()=>{b(!1),f(null)},onConfirm:async()=>{if(j)try{const e=F(),r=await fetch(`/api/brand-product-categories/${j.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),n=await r.json();n.success?(b(!1),f(null),C(),null===t||void 0===t||t()):alert(n.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:`Are you sure you want to delete "${null===j||void 0===j?void 0:j.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},ae=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 20px;
`,se=i.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  width: 300px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,de=i.Ay.button`
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
`,le=i.Ay.div`
  display: grid;
  gap: 16px;
`,ce=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,pe=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,xe=i.Ay.div`
  flex: 1;
`,ue=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,he=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,ge=i.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>"required"===e.type?"\n    background: #FEE2E2;\n    color: #DC2626;\n  ":"\n    background: #E0F2FE;\n    color: #0369A1;\n  "}
`,me=i.Ay.div`
  display: flex;
  gap: 8px;
`,ye=i.Ay.button`
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
`,be=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,je=i.Ay.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`,fe=i.Ay.span`
  margin-left: 6px;
  color: #6B7280;
  font-size: 12px;
`,ve=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,we=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Fe=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,Ce=i.Ay.div`
  margin-bottom: 20px;
`,Ae=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`,ke=i.Ay.input`
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
`,_e=i.Ay.div`
  display: flex;
  gap: 16px;
`,Ee=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
`,Be=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,ze=i.Ay.button`
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
`,Se=e=>{let{onCountChange:r}=e;const[t,i]=(0,n.useState)([]),[o,a]=(0,n.useState)(!0),[s,d]=(0,n.useState)(""),[l,c]=(0,n.useState)(!1),[x,u]=(0,n.useState)(!1),[g,m]=(0,n.useState)(null),[y,b]=(0,n.useState)(null),[j,f]=(0,n.useState)({name:"",is_required:!1,options:[]}),[v,w]=(0,n.useState)({name:"",price_adjustment:0}),F=(0,n.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/brand-product-option-groups",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&(i(e.data),r(e.data.length))}}catch(e){console.error("Error fetching option groups:",e)}finally{a(!1)}},[r]);(0,n.useEffect)(()=>{F()},[F]);const C=e=>{e?(m(e),f({name:e.name,is_required:e.is_required,options:e.options.map(e=>({...e}))})):(m(null),f({name:"",is_required:!1,options:[]})),c(!0)},A=()=>{c(!1),m(null),f({name:"",is_required:!1,options:[]}),w({name:"",price_adjustment:0})},k=t.filter(e=>e.name.toLowerCase().includes(s.toLowerCase()));return o?(0,h.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7280"},children:"Loading..."}):(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(ae,{children:[(0,h.jsx)(se,{type:"text",placeholder:"Search option groups...",value:s,onChange:e=>d(e.target.value)}),(0,h.jsx)(de,{onClick:()=>C(),children:"Add Option Group"})]}),0===k.length?(0,h.jsxs)(ve,{children:[(0,h.jsx)(we,{children:"No option groups yet"}),(0,h.jsx)(Fe,{children:"Create option groups to add customizable options to your products"}),(0,h.jsx)(de,{onClick:()=>C(),children:"Add Option Group"})]}):(0,h.jsx)(le,{children:k.map(e=>(0,h.jsxs)(ce,{children:[(0,h.jsxs)(pe,{children:[(0,h.jsxs)(xe,{children:[(0,h.jsx)(ue,{children:e.name}),(0,h.jsxs)(he,{children:[(0,h.jsx)(ge,{type:e.is_required?"required":"optional",children:e.is_required?"Required":"Optional"}),(0,h.jsxs)("span",{style:{fontSize:"13px",color:"#6B7280"},children:[e.options.length," options"]})]})]}),(0,h.jsxs)(me,{children:[(0,h.jsx)(ye,{onClick:()=>C(e),children:(0,h.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,h.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,h.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,h.jsx)(ye,{onClick:()=>{return r=e.id,b(r),void u(!0);var r},children:(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,h.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,h.jsx)(be,{children:e.options.map((e,r)=>(0,h.jsxs)(je,{children:[e.name,0!==e.price_adjustment&&(0,h.jsxs)(fe,{children:[Number(e.price_adjustment)>0?"+":"","RM ",(Number(e.price_adjustment)||0).toFixed(2)]})]},r))})]},e.id))}),(0,h.jsxs)(p.aF,{isOpen:l,onClose:A,title:g?"Edit Option Group":"New Option Group",children:[(0,h.jsxs)(Ce,{children:[(0,h.jsx)(Ae,{children:"Group Name"}),(0,h.jsx)(ke,{type:"text",value:j.name,onChange:e=>f({...j,name:e.target.value}),placeholder:"e.g., Size, Grade, Packaging"})]}),(0,h.jsx)(Ce,{children:(0,h.jsx)(_e,{children:(0,h.jsxs)(Ee,{children:[(0,h.jsx)("input",{type:"checkbox",checked:j.is_required,onChange:e=>f({...j,is_required:e.target.checked})}),"Required Selection"]})})}),(0,h.jsxs)(Ce,{children:[(0,h.jsx)(Ae,{children:"Options"}),(0,h.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"12px"},children:[(0,h.jsx)(ke,{type:"text",value:v.name,onChange:e=>w({...v,name:e.target.value}),placeholder:"Option name",style:{flex:2}}),(0,h.jsx)(ke,{type:"number",value:v.price_adjustment,onChange:e=>w({...v,price_adjustment:parseFloat(e.target.value)||0}),placeholder:"Price adj.",step:"0.50",style:{flex:1}}),(0,h.jsx)(de,{type:"button",variant:"secondary",onClick:()=>{if(!v.name.trim())return;const e=isNaN(v.price_adjustment)?0:v.price_adjustment;f(r=>({...r,options:[...r.options,{name:v.name.trim(),price_adjustment:e}]})),w({name:"",price_adjustment:0})},disabled:!v.name.trim(),children:"Add"})]}),j.options.map((e,r)=>(0,h.jsxs)(Be,{children:[(0,h.jsxs)("div",{style:{flex:1},children:[(0,h.jsx)("strong",{children:e.name}),0!==e.price_adjustment&&(0,h.jsxs)("span",{style:{marginLeft:"8px",color:"#6B7280"},children:["(",Number(e.price_adjustment)>0?"+":"","RM ",(Number(e.price_adjustment)||0).toFixed(2),")"]})]}),(0,h.jsx)(ze,{onClick:()=>{return e=r,void f(r=>({...r,options:r.options.filter((r,t)=>t!==e)}));var e},children:"x"})]},r))]}),(0,h.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,h.jsx)(de,{type:"button",variant:"secondary",onClick:A,children:"Cancel"}),(0,h.jsx)(de,{type:"button",onClick:async()=>{if(j.name.trim()&&0!==j.options.length)try{const e=localStorage.getItem("auth_token"),r=g?`/api/brand-product-option-groups/${g.id}`:"/api/brand-product-option-groups",t=g?"PUT":"POST";(await fetch(r,{method:t,headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:j.name,is_required:j.is_required,options:j.options})})).ok&&(F(),A())}catch(e){console.error("Error saving option group:",e)}},disabled:!j.name.trim()||0===j.options.length,children:g?"Update":"Create"})]})]}),(0,h.jsxs)(p.aF,{isOpen:x,onClose:()=>u(!1),title:"Delete Option Group",children:[(0,h.jsx)("p",{children:"Are you sure you want to delete this option group? This action cannot be undone."}),(0,h.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,h.jsx)(de,{type:"button",variant:"secondary",onClick:()=>u(!1),children:"Cancel"}),(0,h.jsx)(de,{type:"button",variant:"danger",onClick:async()=>{if(y)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/brand-product-option-groups/${y}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(r.ok)F();else{const e=await r.json();alert(e.error||"Failed to delete option group")}}catch(e){console.error("Error deleting option group:",e)}finally{u(!1),b(null)}},children:"Delete"})]})]})]})},De=i.Ay.span`
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
`,$e=()=>{const{user:e}=(0,d.As)(),[r,t]=(0,o.ok)(),[i,l]=(0,n.useState)(0),[c,p]=(0,n.useState)(0),[x,u]=(0,n.useState)(0),[g,m]=(0,n.useState)([]),[y,b]=(0,n.useState)(!0),[j,f]=(0,n.useState)(0),[v,w]=(0,n.useState)(0),F=r.get("tab")||"products";(0,n.useEffect)(()=>{!e||"Brand General"!==e.role&&"Brand Manager"!==e.role?b(!1):C()},[e]);const C=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();m(e)}}catch(e){console.error("Error fetching brands:",e)}finally{b(!1)}},A=e=>{t({tab:e})};return y?(0,h.jsx)(a.A,{children:(0,h.jsxs)(s.mc,{children:[(0,h.jsx)(s.Y9,{children:(0,h.jsx)(s.hE,{children:"Product Management"})}),(0,h.jsx)(s.UC,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})}):(0,h.jsx)(a.A,{children:(0,h.jsxs)(s.mc,{children:[(0,h.jsx)(s.Y9,{children:(0,h.jsx)(s.hE,{children:"Product Management"})}),(0,h.jsxs)(s.UC,{children:[(0,h.jsxs)(s.j,{children:[(0,h.jsxs)(s.oz,{active:"products"===F,onClick:()=>A("products"),children:["Products",(0,h.jsx)(De,{children:i})]}),(0,h.jsxs)(s.oz,{active:"categories"===F,onClick:()=>A("categories"),children:["Categories",(0,h.jsx)(De,{children:c})]}),(0,h.jsxs)(s.oz,{active:"options"===F,onClick:()=>A("options"),children:["Options",(0,h.jsx)(De,{children:x})]})]}),(0,h.jsx)("div",{style:{display:"products"===F?"block":"none"},children:(0,h.jsx)(M,{brands:g,onCountChange:l,categoryRefreshKey:j,optionRefreshKey:v})}),(0,h.jsx)("div",{style:{display:"categories"===F?"block":"none"},children:(0,h.jsx)(oe,{onCountChange:p,onCategoryChange:()=>f(e=>e+1)})}),(0,h.jsx)("div",{style:{display:"options"===F?"block":"none"},children:(0,h.jsx)(Se,{onCountChange:u})})]})]})})}}}]);