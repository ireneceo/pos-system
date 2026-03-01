"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9134],{2488:(e,r,t)=>{t.d(r,{DO:()=>c,Jt:()=>p,Qn:()=>l});var o=t(8819),i=(t(9950),t(4752)),n=t(4414);const a=i.Ay.div`
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
`,s=i.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${o.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${o.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: 0 0 0 3px ${o.w.colors.primaryLight};
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
`,d=i.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${o.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: 0 0 0 3px ${o.w.colors.primaryLight};
  }

  &:disabled {
    background: ${o.w.colors.surfaceHover};
    color: ${o.w.colors.text.muted};
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
`,l=e=>{let{children:r,className:t,style:o,...i}=e;return(0,n.jsx)(a,{className:t,style:o,...i,children:r})},c=e=>{let{placeholder:r="Search...",...t}=e;return(0,n.jsx)(s,{placeholder:r,...t})},p=e=>{let{children:r,...t}=e;return(0,n.jsx)(d,{...t,children:r})}},3705:(e,r,t)=>{t.d(r,{cc:()=>n.$n});var o=t(8819),i=t(4752),n=t(8829);i.Ay.select`
  padding: ${o.w.components.form.inputPadding};
  border: 1px solid ${o.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${o.w.typography.fontSize.sm};
  background: ${o.w.colors.surface};
  color: ${o.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: ${o.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${o.w.colors.borderHover};
  }
`,i.Ay.input`
  padding: ${o.w.components.form.inputPadding};
  border: 1px solid ${o.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${o.w.typography.fontSize.sm};
  background: ${o.w.colors.surface};
  color: ${o.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${o.w.colors.primary};
    box-shadow: ${o.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${o.w.colors.borderHover};
  }
`,i.Ay.div`
  background: ${o.w.colors.surface};
  border-radius: ${o.w.borderRadius.md};
  border: 1px solid ${o.w.colors.borderLight};
  padding: ${o.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${o.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${o.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${o.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4877:(e,r,t)=>{t.d(r,{A:()=>v});var o=t(8819),i=t(9950),n=t(4752),a=t(4414);const s=n.Ay.div`
  margin-bottom: 16px;
`,d=n.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,l=n.Ay.p`
  font-size: 12px;
  color: #8898AA;
  margin-top: 4px;
  margin-bottom: 16px;
`,c=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 24px;
`,p=n.Ay.div`
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
`,x=n.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,u=n.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,h=n.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,g=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,m=n.Ay.label`
  padding: 8px 16px;
  border: 1px solid ${o.w.colors.primary};
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
`,y=n.Ay.button`
  padding: 8px 16px;
  border: 1px solid ${o.w.colors.danger};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${o.w.colors.danger};
  background: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #DC2626;
    color: white;
  }
`,b=n.Ay.input`
  display: none;
`,f=n.Ay.div`
  width: 24px;
  height: 24px;
  border: 3px solid #E5E7EB;
  border-top-color: #635BFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`,j=()=>"localhost"===window.location.hostname?"http://localhost:3000":"dev.purplehere.com"===window.location.hostname?"https://dev.purplehere.com":"https://purplehere.com",v=e=>{let{value:r,onChange:t,label:o="Logo Upload",helpText:n="Upload an image for your logo",maxSize:v=2,previewSize:w=150,showRemoveButton:k=!0,changeButtonText:A="Change Image",removeButtonText:F="Remove Image",imageAltText:C="Uploaded"}=e;const[_,$]=(0,i.useState)(!1),[E,B]=(0,i.useState)(!1),S=(0,i.useRef)(null),z=(0,i.useRef)(null),D=async e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);B(!0);const r=new FileReader;r.onload=async e=>{var r;const o=new Image;o.onload=async()=>{const e=document.createElement("canvas"),r=e.getContext("2d");if(!r)return void B(!1);const i=1200;let n=o.width,a=o.height;(n>i||a>i)&&(n>a?(a=a/n*i,n=i):(n=n/a*i,a=i)),e.width=n,e.height=a,r.drawImage(o,0,0,n,a);const s=e.toDataURL("image/jpeg",.85),d=await(async e=>{try{const r=localStorage.getItem("auth_token"),t=await fetch(`${j()}/api/upload/image`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({image:e})}),o=await t.json();return o.success?o.data.original:(console.error("Image upload failed:",o.message),null)}catch(r){return console.error("Image upload error:",r),null}})(s);B(!1),d?t(d):alert("Failed to upload image. Please try again.")},o.src=null===(r=e.target)||void 0===r?void 0:r.result},r.readAsDataURL(e)},L=e=>{if(E)return;const r=e.target.files;r&&r.length>0&&D(r[0]),e.target.value=""};return(0,a.jsxs)(s,{children:[o&&(0,a.jsx)(d,{children:o}),n&&(0,a.jsx)(l,{children:n}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{ref:z,isDragging:_,hasImage:!!r,isUploading:E,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),E||$(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===z.current&&$(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{if(e.preventDefault(),e.stopPropagation(),$(!1),E)return;const r=e.dataTransfer.files;r&&r.length>0&&D(r[0])},onClick:()=>{var e;r||E||(null===(e=S.current)||void 0===e||e.click())},children:E?(0,a.jsxs)(x,{children:[(0,a.jsx)(f,{}),(0,a.jsx)(u,{style:{marginTop:"12px"},children:"Uploading..."})]}):r?(0,a.jsx)("img",{src:(P=r,P?P.startsWith("http")?P:P.startsWith("/uploads/")?`${j()}${P}`:P:""),alt:C}):(0,a.jsxs)(x,{children:[(0,a.jsx)(u,{children:_?"Drop image here":"Drag & drop or click to upload"}),(0,a.jsxs)(h,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),r&&!E&&(0,a.jsxs)(g,{children:[(0,a.jsxs)(m,{disabled:E,children:[A,(0,a.jsx)("input",{ref:S,type:"file",accept:"image/*",onChange:L,disabled:E})]}),k&&(0,a.jsx)(y,{onClick:()=>{t("")},disabled:E,children:F})]})]}),!r&&!E&&(0,a.jsx)(b,{ref:S,type:"file",accept:"image/*",onChange:L})]});var P}},7617:(e,r,t)=>{t.d(r,{A:()=>u});var o=t(8819),i=(t(9950),t(4752)),n=t(9610),a=t(4414);const s=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,d=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid ${o.w.colors.border};
`,l=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,p=i.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=i.Ay.button`
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
`,u=e=>{let{isOpen:r,title:t,message:o,onConfirm:i,onCancel:u,confirmText:h="Confirm",cancelText:g="Cancel",type:m="warning"}=e;return r?(0,a.jsx)(n.mH,{onClick:e=>{e.target===e.currentTarget&&u()},children:(0,a.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(d,{children:[(0,a.jsx)(l,{children:t}),(0,a.jsx)(c,{children:o})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)(x,{variant:"secondary",onClick:u,children:g}),(0,a.jsx)(x,{variant:"primary",type:m,onClick:i,children:h})]})]})}):null}},9134:(e,r,t)=>{t.r(r),t.d(r,{default:()=>De});var o=t(9950),i=t(4752),n=t(4492),a=t(2674),s=t(1367),d=t(8819),l=t(3705),c=t(2488),p=t(9610),x=t(4877),u=t(7617),h=t(9194),g=t(4414);const m=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`,y=i.Ay.div`
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
`,b=i.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`,f=i.Ay.div`
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
`,v=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${d.w.colors.secondary};
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,w=i.Ay.div`
  font-size: 12px;
  color: ${d.w.colors.text.muted};
  margin-bottom: 4px;
`,k=i.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`,A=i.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${d.w.colors.border};
`,F=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`,C=i.Ay.span`
  color: #6B7280;
`,_=i.Ay.span`
  color: #0A2540;
  font-weight: 500;
`,$=i.Ay.span`
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
`,S=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  margin-top: 24px;
`,z=i.Ay.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,D=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 20px 0;
`,L=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 8px;
`,P=i.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: ${e=>e.color||"#E5E7EB"};
  color: ${d.w.colors.text.dark};
  border-radius: 4px;
  font-size: 11px;
`,T=(0,i.Ay)(P)`
  background: #DBEAFE;
  color: #1E40AF;
`,q=(0,i.Ay)(P)`
  background: ${d.w.colors.borderLight};
  color: ${d.w.colors.text.dark};
`,O=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
`,R=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`,M=i.Ay.label`
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
    border-color: ${d.w.colors.primary};
  }

  input:checked + span {
    color: #635BFF;
    font-weight: 500;
  }
`,U=e=>{let{brands:r,onCountChange:t,categoryRefreshKey:i,optionRefreshKey:n}=e;const[a,s]=(0,o.useState)([]),[d,P]=(0,o.useState)([]),[U,N]=(0,o.useState)([]),[I,G]=(0,o.useState)([]),[H,W]=(0,o.useState)(!0),[Q,J]=(0,o.useState)(""),[K,Y]=(0,o.useState)("all"),[Z,V]=(0,o.useState)("all"),[X,ee]=(0,o.useState)(!1),[re,te]=(0,o.useState)(null),[oe,ie]=(0,o.useState)(!1),[ne,ae]=(0,o.useState)(null),[se,de]=(0,o.useState)({name:"",description:"",sku:"",unit:"",base_quantity:"1",unit_price:"",min_order_quantity:"1",category_id:"",image_url:"",is_active:!0,product_recipe_id:null,brand_ids:[],option_group_ids:[]}),[le,ce]=(0,o.useState)(null),[pe,xe]=(0,o.useState)(!1),ue=(0,o.useCallback)(()=>localStorage.getItem("auth_token"),[]),he=(0,o.useCallback)(async()=>{try{const e=ue(),r=await fetch("/api/brand-products",{headers:{Authorization:`Bearer ${e}`}}),o=await r.json();o.success&&(s(o.data),t(o.data.length))}catch(e){console.error("Failed to fetch products:",e)}},[ue,t]),ge=(0,o.useCallback)(async()=>{try{const e=ue(),r=await fetch("/api/brand-product-categories",{headers:{Authorization:`Bearer ${e}`}}),t=await r.json();t.success&&P(t.data)}catch(e){console.error("Failed to fetch categories:",e)}},[ue]),me=(0,o.useCallback)(async()=>{try{const e=ue(),r=await fetch("/api/brand-product-option-groups",{headers:{Authorization:`Bearer ${e}`}}),t=await r.json();t.success&&N(t.data)}catch(e){console.error("Failed to fetch option groups:",e)}},[ue]),ye=(0,o.useCallback)(async()=>{try{const e=ue(),r=await fetch("/api/product-recipes",{headers:{Authorization:`Bearer ${e}`}}),t=await r.json();t.success&&G(t.data||[])}catch(e){console.error("Failed to fetch product recipes:",e)}},[ue]);(0,o.useEffect)(()=>{(async()=>{W(!0),await Promise.all([he(),ge(),me(),ye()]),W(!1)})()},[he,ge,me,ye]),(0,o.useEffect)(()=>{void 0!==i&&ge()},[i,ge]),(0,o.useEffect)(()=>{void 0!==n&&me()},[n,me]);const be=e=>{var r,t,o;e?(te(e),de({name:e.name,description:e.description||"",sku:e.sku||"",unit:e.unit||"",base_quantity:(e.base_quantity||1).toString(),unit_price:e.unit_price.toString(),min_order_quantity:e.min_order_quantity.toString(),category_id:(null===(r=e.category_id)||void 0===r?void 0:r.toString())||"",image_url:e.image_url||"",is_active:e.is_active,product_recipe_id:e.product_recipe_id||null,brand_ids:(null===(t=e.brands)||void 0===t?void 0:t.map(e=>e.id))||[],option_group_ids:(null===(o=e.optionGroups)||void 0===o?void 0:o.map(e=>e.id))||[]})):(te(null),de({name:"",description:"",sku:"",unit:"",base_quantity:"1",unit_price:"",min_order_quantity:"1",category_id:d.length>0?d[0].id.toString():"",image_url:"",is_active:!0,product_recipe_id:null,brand_ids:[],option_group_ids:[]}));ee(!0)},fe=()=>{ee(!1),te(null),ce(null)},je=a.filter(e=>{var r,t;const o=e.name.toLowerCase().includes(Q.toLowerCase())||e.sku&&e.sku.toLowerCase().includes(Q.toLowerCase()),i="all"===K||(null===(r=e.category_id)||void 0===r?void 0:r.toString())===K,n="all"===Z||(null===(t=e.brands)||void 0===t?void 0:t.some(e=>e.id.toString()===Z));return o&&i&&n});return H?(0,g.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading products..."}):(0,g.jsxs)("div",{children:[(0,g.jsxs)(c.Qn,{children:[(0,g.jsx)(c.DO,{type:"text",placeholder:"Search products...",value:Q,onChange:e=>J(e.target.value)}),(0,g.jsxs)(c.Jt,{value:K,onChange:e=>Y(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Categories"}),d.map(e=>(0,g.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]}),(0,g.jsxs)(c.Jt,{value:Z,onChange:e=>V(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Brands"}),r.map(e=>(0,g.jsx)("option",{value:e.id.toString(),children:e.name},e.id))]}),(0,g.jsx)(l.cc,{onClick:()=>be(),children:"Add Product"})]}),0===je.length?(0,g.jsxs)(S,{children:[(0,g.jsx)(z,{children:Q||"all"!==K||"all"!==Z?"No products found":"No products yet"}),(0,g.jsx)(D,{children:Q||"all"!==K||"all"!==Z?"Try adjusting your search or filter criteria.":"Start by adding your first product."}),!Q&&"all"===K&&"all"===Z&&(0,g.jsx)(l.cc,{onClick:()=>be(),children:"Add Product"})]}):(0,g.jsx)(m,{children:je.map(e=>(0,g.jsxs)(y,{isActive:e.is_active,onClick:()=>be(e),children:[(0,g.jsxs)(b,{children:[(0,g.jsx)(f,{src:e.image_url,children:!e.image_url&&"\ud83d\udce6"}),(0,g.jsxs)(j,{children:[(0,g.jsx)(v,{children:e.name}),e.sku&&(0,g.jsxs)(w,{children:["SKU: ",e.sku]}),e.category&&(0,g.jsxs)(k,{children:[e.category.emoji," ",e.category.name]})]})]}),(0,g.jsxs)(A,{children:[(0,g.jsxs)(F,{children:[(0,g.jsx)(C,{children:"Unit Price"}),(0,g.jsxs)($,{children:["RM ",(Number(e.unit_price)||0).toFixed(2)]})]}),e.unit&&(0,g.jsxs)(F,{children:[(0,g.jsx)(C,{children:"Unit"}),(0,g.jsx)(_,{children:e.unit})]}),(0,g.jsxs)(F,{children:[(0,g.jsx)(C,{children:"Min Order"}),(0,g.jsx)(_,{children:e.min_order_quantity})]})]}),e.brands&&e.brands.length>0&&(0,g.jsx)(L,{children:e.brands.map(e=>(0,g.jsx)(T,{children:e.name},e.id))}),e.optionGroups&&e.optionGroups.length>0&&(0,g.jsx)(L,{children:e.optionGroups.map(e=>(0,g.jsx)(q,{children:e.name},e.id))}),(0,g.jsxs)(E,{onClick:e=>e.stopPropagation(),children:[(0,g.jsx)(B,{onClick:()=>be(e),children:"Edit"}),(0,g.jsx)(B,{variant:"danger",onClick:r=>((e,r)=>{r.stopPropagation(),ae(e),ie(!0)})(e,r),children:"Delete"})]})]},e.id))}),X&&(0,g.jsx)(p.aF,{isOpen:X,onClose:fe,title:re?"Edit Product":"Add Product",maxWidth:"700px",children:(0,g.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),!pe)if(ce(null),se.name.trim())if(se.unit){xe(!0);try{const e=ue(),r=re?"PUT":"POST",t=re?`/api/brand-products/${re.id}`:"/api/brand-products",o=await fetch(t,{method:r,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:se.name.trim(),description:se.description.trim()||null,sku:se.sku.trim()||null,unit:se.unit||null,base_quantity:parseFloat(se.base_quantity)||1,unit_price:parseFloat(se.unit_price)||0,min_order_quantity:parseInt(se.min_order_quantity)||1,category_id:se.category_id?parseInt(se.category_id):null,image_url:se.image_url||null,is_active:se.is_active,product_recipe_id:se.product_recipe_id,brand_ids:se.brand_ids,option_group_ids:se.option_group_ids})}),i=await o.json();i.success?(fe(),he()):ce(i.error||"Failed to save product")}catch(r){console.error("Failed to save product:",r),ce("Failed to save product. Please try again.")}finally{xe(!1)}}else ce("Unit is required");else ce("Product name is required")},children:[(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Name *"}),(0,g.jsx)(p.ZQ,{type:"text",value:se.name,onChange:e=>de({...se,name:e.target.value}),placeholder:"Product name",required:!0})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"SKU"}),(0,g.jsx)(p.ZQ,{type:"text",value:se.sku,onChange:e=>de({...se,sku:e.target.value}),placeholder:"Product code"})]})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Category"}),(0,g.jsxs)(p.FX,{value:se.category_id,onChange:e=>de({...se,category_id:e.target.value}),children:[(0,g.jsx)("option",{value:"",children:"No category"}),d.map(e=>(0,g.jsxs)("option",{value:e.id.toString(),children:[e.emoji," ",e.name]},e.id))]})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Description"}),(0,g.jsx)(p.Lz,{value:se.description,onChange:e=>de({...se,description:e.target.value}),placeholder:"Product description",rows:2})]}),(0,g.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"16px"},children:[(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Unit Price (RM) *"}),(0,g.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",value:se.unit_price,onChange:e=>de({...se,unit_price:e.target.value}),placeholder:"0.00",required:!0})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Base Qty *"}),(0,g.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0.01",value:se.base_quantity,onChange:e=>de({...se,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Unit *"}),(0,g.jsxs)(p.FX,{value:se.unit,onChange:e=>de({...se,unit:e.target.value}),required:!0,children:[(0,g.jsx)("option",{value:"",children:"Select unit"}),[{value:"kg",label:"kg"},{value:"g",label:"g"},{value:"L",label:"L"},{value:"ml",label:"ml"},{value:"piece",label:"piece"},{value:"pack",label:"pack"},{value:"can",label:"can"},{value:"bottle",label:"bottle"}].map(e=>(0,g.jsx)("option",{value:e.value,children:e.label},e.value))]})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Min Order Qty"}),(0,g.jsx)(p.ZQ,{type:"number",min:"1",value:se.min_order_quantity,onChange:e=>de({...se,min_order_quantity:e.target.value})})]})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Product Image"}),(0,g.jsx)(x.A,{value:se.image_url,onChange:e=>de({...se,image_url:e||""}),label:"",helpText:"Upload a product image (max 2MB)"})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Linked Brands"}),(0,g.jsx)(R,{children:r.map(e=>(0,g.jsxs)(M,{children:[(0,g.jsx)("input",{type:"checkbox",checked:se.brand_ids.includes(e.id),onChange:()=>{return r=e.id,void de(e=>({...e,brand_ids:e.brand_ids.includes(r)?e.brand_ids.filter(e=>e!==r):[...e.brand_ids,r]}));var r}}),(0,g.jsx)("span",{children:e.name})]},e.id))})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Option Groups"}),U.length>0?(0,g.jsx)(R,{children:U.map(e=>(0,g.jsxs)(M,{children:[(0,g.jsx)("input",{type:"checkbox",checked:se.option_group_ids.includes(e.id),onChange:()=>{return r=e.id,void de(e=>({...e,option_group_ids:e.option_group_ids.includes(r)?e.option_group_ids.filter(e=>e!==r):[...e.option_group_ids,r]}));var r}}),(0,g.jsxs)("span",{children:[e.name," ",e.is_required?"(Required)":""]})]},e.id))}):(0,g.jsx)("div",{style:{padding:"12px",background:"#F9FAFB",borderRadius:"8px",color:"#6B7280",fontSize:"13px"},children:"No option groups available. Create option groups in the Options tab first."})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Linked Product Recipe"}),(0,g.jsx)(h.A,{options:I.map(e=>({value:e.id,label:e.name,subLabel:`Cost: RM ${Number(e.total_ingredient_cost||0).toFixed(2)}`})),value:se.product_recipe_id,onChange:e=>de({...se,product_recipe_id:e}),placeholder:"Search or select recipe...",allowClear:!0,noOptionsMessage:"No product recipes found"})]}),(0,g.jsx)(p.gE,{style:{marginBottom:0},children:(0,g.jsxs)(O,{children:[(0,g.jsx)("input",{type:"checkbox",checked:se.is_active,onChange:e=>de({...se,is_active:e.target.checked})}),"Active"]})}),(0,g.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,g.jsx)(p.yl,{type:"button",onClick:fe,disabled:pe,children:"Cancel"}),(0,g.jsx)(p.yl,{type:"submit",variant:"primary",disabled:pe,children:pe?"Saving...":re?"Update":"Create"})]}),le&&(0,g.jsx)("div",{style:{marginTop:"16px",padding:"12px 16px",background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:"8px",color:"#DC2626",fontSize:"14px"},children:le})]})}),(0,g.jsx)(u.A,{isOpen:oe,onCancel:()=>{ie(!1),ae(null)},onConfirm:async()=>{if(ne)try{const e=ue(),r=await fetch(`/api/brand-products/${ne.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await r.json();t.success?(ie(!1),ae(null),he()):alert(t.error||"Failed to delete product")}catch(e){console.error("Failed to delete product:",e),alert("Failed to delete product")}},title:"Delete Product",message:`Are you sure you want to delete "${null===ne||void 0===ne?void 0:ne.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},N=i.Ay.div`
  margin-top: 24px;
`,I=i.Ay.div`
  display: grid;
  gap: 12px;
`,G=i.Ay.div`
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
`,H=i.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,W=i.Ay.div`
  flex: 1;
`,Q=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,J=i.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: ${d.w.colors.text.muted};
`,K=i.Ay.div`
  font-size: 13px;
  color: ${d.w.colors.text.muted};
  margin-top: 4px;
`,Y=i.Ay.div`
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
    border-color: ${d.w.colors.primary};
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
    color: ${d.w.colors.text.muted};
    transition: color 0.15s;
  }
`,V=i.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,X=i.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ee=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,re=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,te=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,oe=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ie=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,ne=i.Ay.button`
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
`,ae=e=>{let{onCountChange:r,onCategoryChange:t}=e;const[i,n]=(0,o.useState)([]),[s,d]=(0,o.useState)(!0),[c,x]=(0,o.useState)(!1),[h,m]=(0,o.useState)(null),[y,b]=(0,o.useState)(!1),[f,j]=(0,o.useState)(null),[v,w]=(0,o.useState)({name:"",emoji:"",description:""}),k=(0,o.useCallback)(()=>localStorage.getItem("auth_token"),[]),A=(0,o.useCallback)(async()=>{try{const e=k(),t=await fetch("/api/brand-product-categories",{headers:{Authorization:`Bearer ${e}`}}),o=await t.json();o.success&&(n(o.data),r(o.data.length))}catch(e){console.error("Failed to fetch categories:",e)}finally{d(!1)}},[k,r]);(0,o.useEffect)(()=>{d(!0),A()},[A]);const F=e=>{e?(m(e),w({name:e.name,emoji:e.emoji||"",description:e.description||""})):(m(null),w({name:"",emoji:"",description:""})),x(!0)},C=()=>{x(!1),m(null),w({name:"",emoji:"",description:""})},_=async(e,r)=>{try{const t=k(),o=await fetch(`/api/brand-product-categories/${e}/reorder`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({direction:r})}),i=await o.json();i.success?A():alert(i.error||"Failed to reorder")}catch(t){console.error("Failed to reorder category:",t)}};return s?(0,g.jsx)(N,{children:(0,g.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading categories..."})}):(0,g.jsxs)(N,{children:[(0,g.jsxs)(re,{children:[(0,g.jsx)(te,{children:"Product Categories"}),(0,g.jsx)(l.cc,{onClick:()=>F(),children:"Add Category"})]}),0===i.length?(0,g.jsxs)(V,{children:[(0,g.jsx)(X,{children:"No categories yet"}),(0,g.jsx)(ee,{children:"Create your first product category to organize your products."}),(0,g.jsx)(l.cc,{onClick:()=>F(),children:"Add Category"})]}):(0,g.jsx)(I,{children:i.map((e,r)=>(0,g.jsxs)(G,{isActive:e.is_active,children:[(0,g.jsx)(a.Xd,{onMoveUp:()=>_(e.id,"up"),onMoveDown:()=>_(e.id,"down"),disableUp:0===r,disableDown:r===i.length-1}),(0,g.jsx)(H,{children:e.emoji||"\ud83d\udce6"}),(0,g.jsxs)(W,{children:[(0,g.jsx)(Q,{children:e.name}),(0,g.jsxs)(J,{children:[(0,g.jsxs)("span",{children:[e.product_count||0," products"]}),(0,g.jsx)(oe,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,g.jsx)(K,{children:e.description})]}),(0,g.jsxs)(Y,{children:[(0,g.jsx)(Z,{onClick:()=>F(e),title:"Edit",children:(0,g.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,g.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"}),(0,g.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"})]})}),(0,g.jsx)(Z,{onClick:()=>(e=>{j(e),b(!0)})(e),title:"Delete",children:(0,g.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,g.jsx)("path",{d:"M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"}),(0,g.jsx)("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),(0,g.jsx)("line",{x1:"14",y1:"11",x2:"14",y2:"17"})]})})]})]},e.id))}),c&&(0,g.jsx)(p.aF,{isOpen:c,onClose:C,title:h?"Edit Category":"Add Category",children:(0,g.jsxs)("form",{onSubmit:async e=>{if(e.preventDefault(),v.name.trim())try{const e=k(),r=h?"PUT":"POST",o=h?`/api/brand-product-categories/${h.id}`:"/api/brand-product-categories",i=await fetch(o,{method:r,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({name:v.name.trim(),emoji:v.emoji||null,description:v.description.trim()||null})}),n=await i.json();n.success?(C(),A(),null===t||void 0===t||t()):alert(n.error||"Failed to save")}catch(r){console.error("Failed to save category:",r),alert("Failed to save")}},children:[(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Name *"}),(0,g.jsx)(p.ZQ,{type:"text",value:v.name,onChange:e=>w({...v,name:e.target.value}),placeholder:"Category name",required:!0})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Emoji"}),(0,g.jsx)(ie,{children:["\ud83d\udce6","\ud83e\udd6b","\ud83e\uddc2","\ud83c\udf3e","\ud83e\udd5b","\ud83e\uddc8","\ud83e\udd5a","\ud83c\udf56","\ud83e\udd69","\ud83c\udf57","\ud83d\udc1f","\ud83e\udd90","\ud83e\udd91","\ud83e\udd6c","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83c\udf36\ufe0f","\ud83c\udf4b","\ud83c\udf4a","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd65","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf6f","\ud83e\uded2","\ud83e\uddca","\ud83c\udf76","\ud83e\uded9","\ud83e\uddf4","\ud83e\uddc3","\ud83c\udf75","\u2615","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd64","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf6b","\ud83c\udf6c","\ud83c\udf6d","\ud83e\uddc7","\ud83e\udd50","\ud83c\udf5e"].map(e=>(0,g.jsx)(ne,{type:"button",selected:v.emoji===e,onClick:()=>w({...v,emoji:e}),children:e},e))})]}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(p.lR,{children:"Description"}),(0,g.jsx)(p.Lz,{value:v.description,onChange:e=>w({...v,description:e.target.value}),placeholder:"Category description (optional)",rows:3})]}),(0,g.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,g.jsx)(p.yl,{type:"button",onClick:C,children:"Cancel"}),(0,g.jsx)(p.yl,{type:"submit",variant:"primary",children:h?"Update":"Create"})]})]})}),(0,g.jsx)(u.A,{isOpen:y,onCancel:()=>{b(!1),j(null)},onConfirm:async()=>{if(f)try{const e=k(),r=await fetch(`/api/brand-product-categories/${f.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),o=await r.json();o.success?(b(!1),j(null),A(),null===t||void 0===t||t()):alert(o.error||"Failed to delete")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete")}},title:"Delete Category",message:`Are you sure you want to delete "${null===f||void 0===f?void 0:f.name}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel"})]})},se=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 20px;
`,de=i.Ay.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  width: 300px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,le=i.Ay.button`
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
`,ce=i.Ay.div`
  display: grid;
  gap: 16px;
`,pe=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`,xe=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,ue=i.Ay.div`
  flex: 1;
`,he=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ge=i.Ay.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,me=i.Ay.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${e=>"required"===e.type?`\n    background: ${d.w.colors.status.errorLightAlt};\n    color: ${d.w.colors.danger};\n  `:"\n    background: #E0F2FE;\n    color: #0369A1;\n  "}
`,ye=i.Ay.div`
  display: flex;
  gap: 8px;
`,be=i.Ay.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid ${d.w.colors.borderLight};
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
    color: ${d.w.colors.text.muted};
  }
`,fe=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`,je=i.Ay.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: ${d.w.colors.surfaceMuted};
  border-radius: 6px;
  font-size: 13px;
  color: ${d.w.colors.text.dark};
`,ve=i.Ay.span`
  margin-left: 6px;
  color: ${d.w.colors.text.muted};
  font-size: 12px;
`,we=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,ke=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Ae=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,Fe=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${d.w.colors.text.dark};
  margin-bottom: 8px;
`,Ce=i.Ay.input`
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
`,$e=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
`,Ee=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,Be=i.Ay.button`
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
`,Se=e=>{let{onCountChange:r}=e;const[t,i]=(0,o.useState)([]),[n,a]=(0,o.useState)(!0),[s,d]=(0,o.useState)(""),[l,c]=(0,o.useState)(!1),[x,u]=(0,o.useState)(!1),[h,m]=(0,o.useState)(null),[y,b]=(0,o.useState)(null),[f,j]=(0,o.useState)({name:"",is_required:!1,options:[]}),[v,w]=(0,o.useState)({name:"",price_adjustment:0}),k=(0,o.useCallback)(async()=>{try{const e=localStorage.getItem("auth_token"),t=await fetch("/api/brand-product-option-groups",{headers:{Authorization:`Bearer ${e}`}});if(t.ok){const e=await t.json();e.success&&(i(e.data),r(e.data.length))}}catch(e){console.error("Error fetching option groups:",e)}finally{a(!1)}},[r]);(0,o.useEffect)(()=>{k()},[k]);const A=e=>{e?(m(e),j({name:e.name,is_required:e.is_required,options:e.options.map(e=>({...e}))})):(m(null),j({name:"",is_required:!1,options:[]})),c(!0)},F=()=>{c(!1),m(null),j({name:"",is_required:!1,options:[]}),w({name:"",price_adjustment:0})},C=t.filter(e=>e.name.toLowerCase().includes(s.toLowerCase()));return n?(0,g.jsx)("div",{style:{padding:"40px",textAlign:"center",color:"#6B7280"},children:"Loading..."}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(se,{children:[(0,g.jsx)(de,{type:"text",placeholder:"Search option groups...",value:s,onChange:e=>d(e.target.value)}),(0,g.jsx)(le,{onClick:()=>A(),children:"Add Option Group"})]}),0===C.length?(0,g.jsxs)(we,{children:[(0,g.jsx)(ke,{children:"No option groups yet"}),(0,g.jsx)(Ae,{children:"Create option groups to add customizable options to your products"}),(0,g.jsx)(le,{onClick:()=>A(),children:"Add Option Group"})]}):(0,g.jsx)(ce,{children:C.map(e=>(0,g.jsxs)(pe,{children:[(0,g.jsxs)(xe,{children:[(0,g.jsxs)(ue,{children:[(0,g.jsx)(he,{children:e.name}),(0,g.jsxs)(ge,{children:[(0,g.jsx)(me,{type:e.is_required?"required":"optional",children:e.is_required?"Required":"Optional"}),(0,g.jsxs)("span",{style:{fontSize:"13px",color:"#6B7280"},children:[e.options.length," options"]})]})]}),(0,g.jsxs)(ye,{children:[(0,g.jsx)(be,{onClick:()=>A(e),children:(0,g.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,g.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,g.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,g.jsx)(be,{onClick:()=>{return r=e.id,b(r),void u(!0);var r},children:(0,g.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,g.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]}),(0,g.jsx)(fe,{children:e.options.map((e,r)=>(0,g.jsxs)(je,{children:[e.name,0!==e.price_adjustment&&(0,g.jsxs)(ve,{children:[Number(e.price_adjustment)>0?"+":"","RM ",(Number(e.price_adjustment)||0).toFixed(2)]})]},r))})]},e.id))}),(0,g.jsxs)(p.aF,{isOpen:l,onClose:F,title:h?"Edit Option Group":"New Option Group",children:[(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(Fe,{children:"Group Name"}),(0,g.jsx)(Ce,{type:"text",value:f.name,onChange:e=>j({...f,name:e.target.value}),placeholder:"e.g., Size, Grade, Packaging"})]}),(0,g.jsx)(p.gE,{children:(0,g.jsx)(_e,{children:(0,g.jsxs)($e,{children:[(0,g.jsx)("input",{type:"checkbox",checked:f.is_required,onChange:e=>j({...f,is_required:e.target.checked})}),"Required Selection"]})})}),(0,g.jsxs)(p.gE,{children:[(0,g.jsx)(Fe,{children:"Options"}),(0,g.jsxs)("div",{style:{display:"flex",gap:"8px",marginBottom:"12px"},children:[(0,g.jsx)(Ce,{type:"text",value:v.name,onChange:e=>w({...v,name:e.target.value}),placeholder:"Option name",style:{flex:2}}),(0,g.jsx)(Ce,{type:"number",value:v.price_adjustment,onChange:e=>w({...v,price_adjustment:parseFloat(e.target.value)||0}),placeholder:"Price adj.",step:"0.50",style:{flex:1}}),(0,g.jsx)(le,{type:"button",variant:"secondary",onClick:()=>{if(!v.name.trim())return;const e=isNaN(v.price_adjustment)?0:v.price_adjustment;j(r=>({...r,options:[...r.options,{name:v.name.trim(),price_adjustment:e}]})),w({name:"",price_adjustment:0})},disabled:!v.name.trim(),children:"Add"})]}),f.options.map((e,r)=>(0,g.jsxs)(Ee,{children:[(0,g.jsxs)("div",{style:{flex:1},children:[(0,g.jsx)("strong",{children:e.name}),0!==e.price_adjustment&&(0,g.jsxs)("span",{style:{marginLeft:"8px",color:"#6B7280"},children:["(",Number(e.price_adjustment)>0?"+":"","RM ",(Number(e.price_adjustment)||0).toFixed(2),")"]})]}),(0,g.jsx)(Be,{onClick:()=>{return e=r,void j(r=>({...r,options:r.options.filter((r,t)=>t!==e)}));var e},children:"x"})]},r))]}),(0,g.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,g.jsx)(le,{type:"button",variant:"secondary",onClick:F,children:"Cancel"}),(0,g.jsx)(le,{type:"button",onClick:async()=>{if(f.name.trim()&&0!==f.options.length)try{const e=localStorage.getItem("auth_token"),r=h?`/api/brand-product-option-groups/${h.id}`:"/api/brand-product-option-groups",t=h?"PUT":"POST";(await fetch(r,{method:t,headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"},body:JSON.stringify({name:f.name,is_required:f.is_required,options:f.options})})).ok&&(k(),F())}catch(e){console.error("Error saving option group:",e)}},disabled:!f.name.trim()||0===f.options.length,children:h?"Update":"Create"})]})]}),(0,g.jsxs)(p.aF,{isOpen:x,onClose:()=>u(!1),title:"Delete Option Group",children:[(0,g.jsx)("p",{children:"Are you sure you want to delete this option group? This action cannot be undone."}),(0,g.jsxs)("div",{style:{display:"flex",gap:"12px",justifyContent:"flex-end",marginTop:"24px"},children:[(0,g.jsx)(le,{type:"button",variant:"secondary",onClick:()=>u(!1),children:"Cancel"}),(0,g.jsx)(le,{type:"button",variant:"danger",onClick:async()=>{if(y)try{const e=localStorage.getItem("auth_token"),r=await fetch(`/api/brand-product-option-groups/${y}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}});if(r.ok)k();else{const e=await r.json();alert(e.error||"Failed to delete option group")}}catch(e){console.error("Error deleting option group:",e)}finally{u(!1),b(null)}},children:"Delete"})]})]})]})},ze=i.Ay.span`
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
`,De=()=>{const{user:e}=(0,s.As)(),[r,t]=(0,n.ok)(),[i,d]=(0,o.useState)(0),[l,c]=(0,o.useState)(0),[p,x]=(0,o.useState)(0),[u,h]=(0,o.useState)([]),[m,y]=(0,o.useState)(!0),[b,f]=(0,o.useState)(0),[j,v]=(0,o.useState)(0),w=r.get("tab")||"products";(0,o.useEffect)(()=>{!e||"Brand General"!==e.role&&"Brand Manager"!==e.role?y(!1):k()},[e]);const k=async()=>{try{const e=localStorage.getItem("auth_token"),r=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();h(e)}}catch(e){console.error("Error fetching brands:",e)}finally{y(!1)}},A=e=>{t({tab:e})};return m?(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(a.mc,{children:[(0,g.jsx)(a.Y9,{children:(0,g.jsx)(a.hE,{children:"Product Management"})}),(0,g.jsx)(a.UC,{children:(0,g.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})}):(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(a.mc,{children:[(0,g.jsx)(a.Y9,{children:(0,g.jsx)(a.hE,{children:"Product Management"})}),(0,g.jsxs)(a.UC,{children:[(0,g.jsxs)(a.j,{children:[(0,g.jsxs)(a.oz,{active:"products"===w,onClick:()=>A("products"),children:["Products",(0,g.jsx)(ze,{children:i})]}),(0,g.jsxs)(a.oz,{active:"categories"===w,onClick:()=>A("categories"),children:["Categories",(0,g.jsx)(ze,{children:l})]}),(0,g.jsxs)(a.oz,{active:"options"===w,onClick:()=>A("options"),children:["Options",(0,g.jsx)(ze,{children:p})]})]}),(0,g.jsx)("div",{style:{display:"products"===w?"block":"none"},children:(0,g.jsx)(U,{brands:u,onCountChange:d,categoryRefreshKey:b,optionRefreshKey:j})}),(0,g.jsx)("div",{style:{display:"categories"===w?"block":"none"},children:(0,g.jsx)(ae,{onCountChange:c,onCategoryChange:()=>f(e=>e+1)})}),(0,g.jsx)("div",{style:{display:"options"===w?"block":"none"},children:(0,g.jsx)(Se,{onCountChange:x})})]})]})})}},9194:(e,r,t)=>{t.d(r,{A:()=>y});var o=t(8819),i=t(9950),n=t(4752),a=t(4414);const s=n.Ay.div`
  position: relative;
  width: 100%;
`,d=n.Ay.div`
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
`,l=n.Ay.input`
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
`,c=n.Ay.button`
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
`,p=n.Ay.div`
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
`,x=n.Ay.div`
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
`,u=n.Ay.div`
  padding: 10px 12px;
  cursor: pointer;
  background: ${e=>e.isSelected?"#F0F4FF":e.isHighlighted?"#F9FAFB":"white"};
  color: ${e=>e.isSelected?"#635BFF":"#0A2540"};
  font-weight: ${e=>e.isSelected?"500":"400"};
  transition: background 0.15s;

  &:hover {
    background: ${e=>e.isSelected?"#F0F4FF":"#F9FAFB"};
  }
`,h=n.Ay.div`
  font-size: 14px;
`,g=n.Ay.div`
  font-size: 12px;
  color: ${o.w.colors.text.muted};
  margin-top: 2px;
`,m=n.Ay.div`
  padding: 12px;
  text-align: center;
  color: #6B7280;
  font-size: 14px;
`,y=e=>{let{options:r,value:t,onChange:o,placeholder:n="Select...",disabled:y=!1,allowClear:b=!0,noOptionsMessage:f="No options found"}=e;const[j,v]=(0,i.useState)(!1),[w,k]=(0,i.useState)(""),[A,F]=(0,i.useState)(-1),C=(0,i.useRef)(null),_=(0,i.useRef)(null),$=r.find(e=>e.value===t),E=r.filter(e=>e.label.toLowerCase().includes(w.toLowerCase())||e.subLabel&&e.subLabel.toLowerCase().includes(w.toLowerCase()));(0,i.useEffect)(()=>{const e=e=>{C.current&&!C.current.contains(e.target)&&(v(!1),k(""))};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[]),(0,i.useEffect)(()=>{j||(k(""),F(-1))},[j]);const B=e=>{o(e.value),v(!1),k("")},S=j?w:(null===$||void 0===$?void 0:$.label)||"";return(0,a.jsxs)(s,{ref:C,children:[(0,a.jsxs)(d,{isOpen:j,disabled:y,onClick:()=>{var e;y||(v(!0),null===(e=_.current)||void 0===e||e.focus())},children:[(0,a.jsx)(l,{ref:_,type:"text",value:S,onChange:e=>{k(e.target.value),F(0),j||v(!0)},onKeyDown:e=>{if(!y)switch(e.key){case"ArrowDown":e.preventDefault(),j?F(e=>e<E.length-1?e+1:e):v(!0);break;case"ArrowUp":e.preventDefault(),F(e=>e>0?e-1:0);break;case"Enter":e.preventDefault(),j&&A>=0&&E[A]?B(E[A]):j||v(!0);break;case"Escape":v(!1),k("")}},placeholder:n,disabled:y}),b&&t&&!y&&(0,a.jsx)(c,{onClick:e=>{e.stopPropagation(),o(null),k("")},type:"button",children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,a.jsx)("path",{d:"M18 6L6 18M6 6l12 12"})})}),(0,a.jsx)(p,{isOpen:j,children:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,a.jsx)("path",{d:"M6 9l6 6 6-6"})})})]}),(0,a.jsx)(x,{isOpen:j,children:E.length>0?E.map((e,r)=>(0,a.jsxs)(u,{isSelected:e.value===t,isHighlighted:r===A,onClick:()=>B(e),onMouseEnter:()=>F(r),children:[(0,a.jsx)(h,{children:e.label}),e.subLabel&&(0,a.jsx)(g,{children:e.subLabel})]},e.value)):(0,a.jsx)(m,{children:f})})]})}}}]);