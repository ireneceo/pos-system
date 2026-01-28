"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7121],{1840:(e,i,t)=>{t.d(i,{ff:()=>o});function n(){const e=window.location.hostname;return e.includes("orderhere.center")?"production":e.includes("orderhere.wor-pro.com")?"staging":e.includes("github.dev")?"codespace":"localhost"===e||"127.0.0.1"===e?"local-development":"unknown"}console.log("\ud83c\udf0d Environment Detection:"),console.log("  - Hostname:",window.location.hostname),console.log("  - Protocol:",window.location.protocol),console.log("  - Origin:",window.location.origin),console.log("  - Environment Name:",n()),console.log("  - API URL:",""),console.log("  - NODE_ENV:","production");const r="";n();async function o(e){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const t=`${r}${e}`,n=localStorage.getItem("auth_token"),o={credentials:"include",headers:{"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...i.headers},...i},a=await fetch(t,o);if(!a.ok){const e=await a.json().catch(()=>({message:"Network error"}));throw new Error(e.message||`HTTP error! status: ${a.status}`)}return a.json()}},2488:(e,i,t)=>{t.d(i,{DO:()=>l,Jt:()=>c,Qn:()=>d});t(9950);var n=t(4752),r=t(4414);const o=n.Ay.div`
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
`,d=e=>{let{children:i,className:t,style:n,...a}=e;return(0,r.jsx)(o,{className:t,style:n,...a,children:i})},l=e=>{let{placeholder:i="Search...",...t}=e;return(0,r.jsx)(a,{placeholder:i,...t})},c=e=>{let{children:i,...t}=e;return(0,r.jsx)(s,{...t,children:i})}},3705:(e,i,t)=>{t.d(i,{cc:()=>r});var n=t(4752);const r=n.Ay.button`
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
`},4021:(e,i,t)=>{t.d(i,{i1:()=>a});var n=t(9950),r=t(1367),o=t(6038);const a=()=>{const{user:e}=(0,r.As)(),[i,t]=(0,n.useState)("RM"),[a,s]=(0,n.useState)(Object.keys(o.DL)),[d,l]=(0,n.useState)(!0),[c,p]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const i=window.location.pathname.split("/"),n=i.indexOf("restaurant");let r=n>=0?i[n+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),i=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(i.ok){var o;const e=await i.json(),n=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";t(n)}else t("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),p("Failed to load currency settings"),t("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:i,supportedCurrencies:a,loading:d,error:c}}},4877:(e,i,t)=>{t.d(i,{A:()=>f});var n=t(9950),r=t(4752),o=t(4414);const a=r.Ay.div`
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
`,p=r.Ay.div`
  text-align: center;
  padding: 20px;
  pointer-events: none;
`,x=r.Ay.p`
  color: #6B7280;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`,g=r.Ay.p`
  color: #9CA3AF;
  font-size: 12px;
`,u=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,h=r.Ay.label`
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
`,f=e=>{let{value:i,onChange:t,label:r="Logo Upload",helpText:f="Upload an image for your logo",maxSize:v=2,previewSize:j=150,showRemoveButton:b=!0,changeButtonText:F="Change Image",removeButtonText:k="Remove Image",imageAltText:w="Uploaded"}=e;const[A,C]=(0,n.useState)(!1),_=(0,n.useRef)(null),E=(0,n.useRef)(null),B=e=>{if(!e.type.startsWith("image/"))return void alert("Please upload an image file");if(e.size>1024*v*1024)return void alert(`Image size should be less than ${v}MB`);const i=new FileReader;i.onload=e=>{var i;const n=new Image;n.onload=()=>{const e=document.createElement("canvas"),i=e.getContext("2d");if(!i)return;const r=800;let o=n.width,a=n.height;(o>r||a>r)&&(o>a?(a=a/o*r,o=r):(o=o/a*r,a=r)),e.width=o,e.height=a,i.drawImage(n,0,0,o,a);const s=e.toDataURL("image/jpeg",.85);t(s)},n.src=null===(i=e.target)||void 0===i?void 0:i.result},i.readAsDataURL(e)},z=e=>{const i=e.target.files;i&&i.length>0&&B(i[0])};return(0,o.jsxs)(a,{children:[r&&(0,o.jsx)(s,{children:r}),f&&(0,o.jsx)(d,{children:f}),(0,o.jsxs)(l,{children:[(0,o.jsx)(c,{ref:E,isDragging:A,hasImage:!!i,onDragEnter:e=>{e.preventDefault(),e.stopPropagation(),C(!0)},onDragLeave:e=>{e.preventDefault(),e.stopPropagation(),e.currentTarget===E.current&&C(!1)},onDragOver:e=>{e.preventDefault(),e.stopPropagation()},onDrop:e=>{e.preventDefault(),e.stopPropagation(),C(!1);const i=e.dataTransfer.files;i&&i.length>0&&B(i[0])},onClick:()=>{var e;i||(null===(e=_.current)||void 0===e||e.click())},children:i?(0,o.jsx)("img",{src:i,alt:w}):(0,o.jsxs)(p,{children:[(0,o.jsx)(x,{children:A?"Drop image here":"Drag & drop or click to upload"}),(0,o.jsxs)(g,{children:["PNG, JPG, GIF up to ",v,"MB"]})]})}),i&&(0,o.jsxs)(u,{children:[(0,o.jsxs)(h,{children:[F,(0,o.jsx)("input",{ref:_,type:"file",accept:"image/*",onChange:z})]}),b&&(0,o.jsx)(m,{onClick:()=>{t("")},children:k})]})]}),!i&&(0,o.jsx)(y,{ref:_,type:"file",accept:"image/*",onChange:z})]})}},7121:(e,i,t)=>{t.r(i),t.d(i,{default:()=>Di});var n=t(9950),r=t(4752),o=t(4492),a=t(3310),s=t(2674),d=t(1367),l=t(3705),c=t(2488),p=t(9610),x=t(4877),g=t(4021),u=t(6038),h=t(1840),m=t(4414);const y=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,f=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${e=>!1!==e.isActive?1:.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,v=r.Ay.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
`,j=r.Ay.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`,b=r.Ay.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
`,F=r.Ay.div`
  flex: 1;
  min-width: 0;
`,k=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,w=r.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
`,A=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,C=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 16px 0;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 8px;
`,_=r.Ay.div``,E=r.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,B=r.Ay.div`
  font-size: 16px;
  font-weight: 700;
  color: #0A2540;
`,z=r.Ay.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`,S=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
`,D=r.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 6px;
`,I=r.Ay.span`
  display: inline-block;
  padding: 2px 8px;
  background: #F3F4F6;
  color: #4B5563;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`,R=r.Ay.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #6B7280;
  margin: 8px 0;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
`,$=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    color: #9CA3AF;
  }

  strong {
    color: #374151;
    font-weight: 600;
  }
`,T=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin: 8px 0;
  padding: 8px;
  background: #FEFCE8;
  border-radius: 6px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`,L=r.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,P=r.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${e=>{switch(e.variant){case"primary":return"\n          background: #635BFF;\n          color: white;\n          border: 1px solid #635BFF;\n          &:hover {\n            background: #4F46E5;\n            transform: translateY(-1px);\n          }\n        ";case"danger":return"\n          background: #FEF2F2;\n          border: 1px solid #EF4444;\n          color: #EF4444;\n          &:hover {\n            background: #FEE2E2;\n            transform: translateY(-1px);\n          }\n        ";default:return"\n          background: #F6F9FC;\n          border: 1px solid #E6EBF1;\n          color: #6B7280;\n          &:hover {\n            border-color: #635BFF;\n            color: #635BFF;\n            background: #F4F3FF;\n            transform: translateY(-1px);\n          }\n        "}}}
`,N=r.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,O=r.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,U=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,q=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,M=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 8px 0;
`,Q=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,Y=r.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  padding: 8px 0;
  margin-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;

  span {
    font-size: 13px;
    font-weight: 600;
    color: #6B7280;
  }

  @media (max-width: 768px) {
    display: none;
  }
`,Z=r.Ay.div`
  display: grid;
  grid-template-columns: 3fr 1fr 0.7fr 2fr 40px;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,J=r.Ay.button`
  background: #FEE2E2;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  width: 38px;
  height: 38px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 18px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #FCA5A5;
  }
`,W=r.Ay.button`
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
  margin-bottom: 16px;

  &:hover {
    background: #E0E7FF;
  }
`,H=r.Ay.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #E5E7EB;
`,X=r.Ay.div`
  font-size: 14px;
  color: #6B7280;
  font-weight: 600;
`,V=r.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`,G=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,K=(r.Ay.div`
  font-size: 14px;
  color: #0A2540;
  padding: 8px 0;
  min-height: 20px;
`,r.Ay.div`
  margin-bottom: 20px;
`,r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`,r.Ay.div``,r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  font-weight: 500;
`,r.Ay.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  white-space: pre-wrap;
`,r.Ay.div`
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  overflow: hidden;
`,r.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 8px;
  padding: 10px 12px;
  background: #F3F4F6;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
`,r.Ay.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid #E5E7EB;
  font-size: 14px;
  color: #374151;

  &:first-of-type {
    border-top: none;
  }
`,r.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
`),ee=r.Ay.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`,ie=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`,te=r.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`,ne=r.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  line-height: 1;

  &:hover {
    color: #0A2540;
  }
`,re=r.Ay.div`
  padding: 24px;
`,oe=r.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 12px;
`,ae=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,se=r.Ay.span`
  font-size: 20px;
`,de=r.Ay.span`
  font-size: 14px;
  color: #6B7280;
`,le=r.Ay.span`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
`,ce=r.Ay.div`
  margin-bottom: 24px;
`,pe=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #E5E7EB;
`,xe=r.Ay.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`,ge=r.Ay.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,ue=r.Ay.span`
  font-size: 15px;
  color: #0A2540;
`,he=r.Ay.span`
  font-size: 15px;
  font-weight: 600;
  color: #635BFF;
`,me=r.Ay.p`
  font-size: 15px;
  color: #4B5563;
  line-height: 1.8;
  margin: 0;
  white-space: pre-wrap;
`,ye=r.Ay.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.8;
  white-space: pre-wrap;
`,fe=e=>{let{onCountChange:i,categoryRefreshKey:t}=e;const{user:r}=(0,d.As)(),{defaultCurrency:o}=(0,g.i1)(),[a,s]=(0,n.useState)("RM"),[fe,ve]=(0,n.useState)([]),[je,be]=(0,n.useState)([]),[Fe,ke]=(0,n.useState)([]),[we,Ae]=(0,n.useState)(!0),[Ce,_e]=(0,n.useState)(""),[Ee,Be]=(0,n.useState)("all"),[ze,Se]=(0,n.useState)(!1),[De,Ie]=(0,n.useState)(null),[Re,$e]=(0,n.useState)(!1),[Te,Le]=(0,n.useState)(!1),[Pe,Ne]=(0,n.useState)(null),[Oe,Ue]=(0,n.useState)({name:"",description:"",category_id:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),[qe,Me]=(0,n.useState)([]),[Qe,Ye]=(0,n.useState)(!1),Ze=null===r||void 0===r?void 0:r.brand_id;(0,n.useEffect)(()=>{o&&s(o)},[o]);const Je=(0,n.useCallback)(async()=>{if(Ze)try{Ae(!0);const[t,n,r]=await Promise.all([(0,h.ff)("/api/product-recipes"),(0,h.ff)("/api/product-ingredients"),(0,h.ff)("/api/product-recipe-categories")]);var e;if(t.success)ve(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0);n.success&&be((n.data||[]).filter(e=>e.is_active)),r.success&&ke(r.data||[])}catch(t){console.error("Failed to fetch data:",t)}finally{Ae(!1)}},[Ze,i]);(0,n.useEffect)(()=>{Je()},[Je]),(0,n.useEffect)(()=>{t&&We()},[t]);const We=async()=>{try{const e=await(0,h.ff)("/api/product-recipe-categories");e.success&&ke(e.data||[])}catch(e){console.error("Failed to fetch categories:",e)}},He=function(e){var i,t,n,r;(Ye(arguments.length>1&&void 0!==arguments[1]&&arguments[1]),e)?(Ie(e),Ue({name:e.name,description:e.description||"",category_id:(null===(i=e.category_id)||void 0===i?void 0:i.toString())||"",emoji:e.emoji||"",image:e.image||"",prep_time:(null===(t=e.prep_time)||void 0===t?void 0:t.toString())||"",cook_time:(null===(n=e.cook_time)||void 0===n?void 0:n.toString())||"",instructions_summary:e.instructions_summary||"",instructions_detail:e.instructions_detail||"",suggested_price:(null===(r=e.suggested_price)||void 0===r?void 0:r.toString())||""}),e.recipeIngredients?Me(e.recipeIngredients.map(e=>({ingredient_id:e.ingredient_id,quantity:e.quantity.toString(),unit:e.unit,notes:e.notes||""}))):Me([])):(Ie(null),Ue({name:"",description:"",category_id:"",emoji:"",image:"",prep_time:"",cook_time:"",instructions_summary:"",instructions_detail:"",suggested_price:""}),Me([]));Se(!0)},Xe=()=>{Le(!1),Ne(null)},Ve=(e,i,t)=>{const n=[...qe];if(n[e]={...n[e],[i]:t},"ingredient_id"===i){const i=je.find(e=>e.id===parseInt(t));i&&(n[e].unit=i.unit)}Me(n)},Ge=fe.filter(e=>{var i,t;const n=e.name.toLowerCase().includes(Ce.toLowerCase())||(null===(i=e.code)||void 0===i?void 0:i.toLowerCase().includes(Ce.toLowerCase())),r="all"===Ee||(null===(t=e.category_id)||void 0===t?void 0:t.toString())===Ee;return n&&r});return we?(0,m.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(q,{children:[(0,m.jsx)("div",{children:(0,m.jsxs)(M,{children:["Product Recipes (",fe.length,")"]})}),(0,m.jsx)(l.cc,{variant:"primary",onClick:()=>He(),children:"Add Recipe"})]}),(0,m.jsxs)(c.Qn,{children:[(0,m.jsx)(c.DO,{type:"text",placeholder:"Search recipes...",value:Ce,onChange:e=>_e(e.target.value)}),(0,m.jsxs)(c.Jt,{value:Ee,onChange:e=>Be(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Categories"}),Fe.map(e=>(0,m.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),0===Ge.length?(0,m.jsxs)(N,{children:[(0,m.jsx)(O,{children:"No recipes found"}),(0,m.jsx)(U,{children:"Create product recipes to track ingredient costs and manage production."}),(0,m.jsx)(l.cc,{variant:"primary",onClick:()=>He(),children:"Add First Recipe"})]}):(0,m.jsx)(y,{children:Ge.map(e=>{var i,t;return(0,m.jsxs)(f,{isActive:e.is_active,onClick:()=>He(e,!0),children:[(0,m.jsxs)(v,{children:[e.image_url?(0,m.jsx)(b,{src:e.image_url,alt:e.name}):(0,m.jsx)(j,{children:e.emoji||(null===(i=e.category)||void 0===i?void 0:i.emoji)||"\ud83d\udccb"}),(0,m.jsxs)(F,{children:[(0,m.jsx)(k,{children:e.name}),(0,m.jsx)(w,{children:(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized"})]})]}),e.description&&(0,m.jsx)(A,{children:e.description}),(0,m.jsxs)(C,{children:[(0,m.jsxs)(_,{children:[(0,m.jsx)(E,{children:"Ingredient Cost"}),(0,m.jsx)(B,{children:(0,u.vv)(e.total_ingredient_cost||0,a)})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(E,{children:"Suggested Price"}),(0,m.jsx)(B,{children:e.suggested_price?(0,u.vv)(e.suggested_price,a):"-"})]})]}),(e.prep_time||e.cook_time)&&(0,m.jsxs)(R,{children:[e.prep_time&&(0,m.jsxs)($,{children:[(0,m.jsx)("span",{children:"Prep:"}),(0,m.jsxs)("strong",{children:[e.prep_time," min"]})]}),e.cook_time&&(0,m.jsxs)($,{children:[(0,m.jsx)("span",{children:"Cook:"}),(0,m.jsxs)("strong",{children:[e.cook_time," min"]})]}),e.prep_time&&e.cook_time&&(0,m.jsxs)($,{children:[(0,m.jsx)("span",{children:"Total:"}),(0,m.jsxs)("strong",{children:[e.prep_time+e.cook_time," min"]})]})]}),e.instructions_summary&&(0,m.jsx)(T,{children:e.instructions_summary}),e.recipeIngredients&&e.recipeIngredients.length>0&&(0,m.jsxs)(z,{children:[(0,m.jsxs)(S,{children:[e.recipeIngredients.length," ingredient",e.recipeIngredients.length>1?"s":""]}),(0,m.jsxs)(D,{children:[e.recipeIngredients.slice(0,4).map((e,i)=>{var t;return(0,m.jsx)(I,{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`},i)}),e.recipeIngredients.length>4&&(0,m.jsxs)(I,{children:["+",e.recipeIngredients.length-4," more"]})]})]}),(0,m.jsxs)(L,{onClick:e=>e.stopPropagation(),children:[(0,m.jsx)(P,{onClick:()=>(e=>{Ne(e),Le(!0)})(e),children:"Recipe"}),(0,m.jsx)(P,{variant:"primary",onClick:()=>He(e),children:"Edit"}),(0,m.jsx)(P,{variant:"danger",onClick:()=>(async e=>{if(confirm(`Are you sure you want to delete "${e.name}"?`))try{const i=await(0,h.ff)(`/api/product-recipes/${e.id}`,{method:"DELETE"});i.success?Je():alert(i.error||"Failed to delete recipe")}catch(i){console.error("Failed to delete recipe:",i),alert("Failed to delete recipe")}})(e),children:"Delete"})]})]},e.id)})}),(0,m.jsxs)(p.aF,{isOpen:ze,onClose:()=>Se(!1),title:Qe?"Recipe Details":De?"Edit Recipe":"Add Recipe",size:"large",children:[(0,m.jsxs)(p.gE,{children:[(0,m.jsxs)(p.lR,{children:["Recipe Name ",!Qe&&"*"]}),(0,m.jsx)(p.ZQ,{value:Oe.name,onChange:e=>Ue({...Oe,name:e.target.value}),placeholder:"e.g., Grilled Chicken",disabled:Qe})]}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"},children:[(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Category"}),(0,m.jsxs)(p.FX,{value:Oe.category_id,onChange:e=>Ue({...Oe,category_id:e.target.value}),disabled:Qe,children:[(0,m.jsx)("option",{value:"",children:"Select Category"}),Fe.map(e=>(0,m.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]}),(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Emoji"}),(0,m.jsx)(p.ZQ,{value:Oe.emoji,onChange:e=>Ue({...Oe,emoji:e.target.value}),placeholder:"e.g., \ud83c\udf57",disabled:Qe})]})]}),!Qe&&(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Recipe Image"}),(0,m.jsx)(x.A,{value:Oe.image,onChange:e=>Ue({...Oe,image:e}),label:"Drop recipe image here or click to upload"})]}),(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Description"}),(0,m.jsx)(p.Lz,{value:Oe.description,onChange:e=>Ue({...Oe,description:e.target.value}),placeholder:"Brief description of the recipe",rows:2,disabled:Qe})]}),(0,m.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"16px"},children:[(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Prep Time (min)"}),(0,m.jsx)(p.ZQ,{type:"number",min:"0",value:Oe.prep_time,onChange:e=>Ue({...Oe,prep_time:e.target.value}),disabled:Qe})]}),(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Cook Time (min)"}),(0,m.jsx)(p.ZQ,{type:"number",min:"0",value:Oe.cook_time,onChange:e=>Ue({...Oe,cook_time:e.target.value}),disabled:Qe})]}),(0,m.jsxs)(p.gE,{children:[(0,m.jsxs)(p.lR,{children:["Suggested Price (",a,")"]}),(0,m.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",value:Oe.suggested_price,onChange:e=>Ue({...Oe,suggested_price:e.target.value}),disabled:Qe})]})]}),(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Recipe Summary"}),(0,m.jsx)(p.Lz,{value:Oe.instructions_summary,onChange:e=>Ue({...Oe,instructions_summary:e.target.value}),placeholder:"Brief summary for list display (e.g., Pan-fried chicken with garlic sauce)",rows:2,disabled:Qe})]}),(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Detailed Instructions"}),(0,m.jsx)(p.Lz,{value:Oe.instructions_detail,onChange:e=>Ue({...Oe,instructions_detail:e.target.value}),placeholder:"Step-by-step cooking instructions...\n1. Prepare ingredients...\n2. Heat the pan...\n3. ...",rows:6,disabled:Qe})]}),(0,m.jsx)(M,{children:"Ingredients"}),!Qe&&(0,m.jsx)(W,{onClick:()=>{Me([...qe,{ingredient_id:0,quantity:"",unit:"",notes:""}])},children:"Add Ingredient"}),qe.length>0&&(0,m.jsxs)(Q,{children:[(0,m.jsxs)(Y,{children:[(0,m.jsx)("span",{children:"Ingredient"}),(0,m.jsx)("span",{children:"Quantity"}),(0,m.jsx)("span",{children:"Unit"}),(0,m.jsx)("span",{children:"Notes"}),!Qe&&(0,m.jsx)("span",{})]}),qe.map((e,i)=>(0,m.jsxs)(Z,{style:Qe?{gridTemplateColumns:"3fr 1fr 0.7fr 2fr"}:void 0,children:[(0,m.jsxs)(p.FX,{value:e.ingredient_id||"",onChange:e=>Ve(i,"ingredient_id",parseInt(e.target.value)),disabled:Qe,children:[(0,m.jsx)("option",{value:"",children:"Select Ingredient"}),je.map(e=>{const i=e.unit_cost/(e.base_quantity||1);return(0,m.jsxs)("option",{value:e.id,children:[e.name," (",(0,u.Qn)(a)," ",i.toFixed(2),"/",e.unit,")"]},e.id)})]}),(0,m.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",placeholder:"Qty",value:e.quantity,onChange:e=>Ve(i,"quantity",e.target.value),disabled:Qe}),(0,m.jsx)(p.ZQ,{value:e.unit,onChange:e=>Ve(i,"unit",e.target.value),placeholder:"Unit",disabled:Qe}),(0,m.jsx)(p.ZQ,{value:e.notes,onChange:e=>Ve(i,"notes",e.target.value),placeholder:"Notes",disabled:Qe}),!Qe&&(0,m.jsx)(J,{onClick:()=>(e=>{Me(qe.filter((i,t)=>t!==e))})(i),children:"\xd7"})]},i))]}),(0,m.jsxs)(H,{children:[(0,m.jsx)(X,{children:"Total Ingredient Cost"}),(0,m.jsx)(V,{children:(0,u.vv)(qe.reduce((e,i)=>{const t=je.find(e=>e.id===i.ingredient_id);if(t&&i.quantity){const n=t.base_quantity||1;return e+t.unit_cost/n*parseFloat(i.quantity)}return e},0),a)})]}),(0,m.jsxs)(G,{children:[(0,m.jsx)(p.yl,{variant:"secondary",onClick:()=>Se(!1),children:Qe?"Close":"Cancel"}),!Qe&&(0,m.jsx)(p.yl,{variant:"primary",onClick:async()=>{if(Oe.name.trim())try{$e(!0);const e={name:Oe.name,description:Oe.description||null,category_id:Oe.category_id?parseInt(Oe.category_id):null,emoji:Oe.emoji||null,image:Oe.image||null,prep_time:Oe.prep_time?parseInt(Oe.prep_time):null,cook_time:Oe.cook_time?parseInt(Oe.cook_time):null,instructions_summary:Oe.instructions_summary||null,instructions_detail:Oe.instructions_detail||null,suggested_price:Oe.suggested_price?parseFloat(Oe.suggested_price):null,ingredients:qe.filter(e=>e.ingredient_id&&e.quantity).map(e=>({ingredient_id:e.ingredient_id,quantity:parseFloat(e.quantity),unit:e.unit,notes:e.notes||null}))},i=De?`/api/product-recipes/${De.id}`:"/api/product-recipes",t=De?"PUT":"POST",n=await(0,h.ff)(i,{method:t,body:JSON.stringify(e)});n.success?(Se(!1),Je()):alert(n.error||"Failed to save recipe")}catch(e){console.error("Failed to save recipe:",e),alert("Failed to save recipe")}finally{$e(!1)}else alert("Recipe name is required")},disabled:Re,children:Re?"Saving...":"Save Recipe"})]})]}),Te&&Pe&&(0,m.jsx)(K,{onClick:Xe,children:(0,m.jsxs)(ee,{onClick:e=>e.stopPropagation(),children:[(0,m.jsxs)(ie,{children:[(0,m.jsx)(te,{children:Pe.name}),(0,m.jsx)(ne,{onClick:Xe,children:"\xd7"})]}),(0,m.jsxs)(re,{children:[(Pe.prep_time||Pe.cook_time)&&(0,m.jsxs)(oe,{children:[Pe.prep_time&&(0,m.jsxs)(ae,{children:[(0,m.jsx)(se,{children:"\u23f1"}),(0,m.jsx)(de,{children:"Prep:"}),(0,m.jsxs)(le,{children:[Pe.prep_time," min"]})]}),Pe.cook_time&&(0,m.jsxs)(ae,{children:[(0,m.jsx)(se,{children:"\ud83d\udd25"}),(0,m.jsx)(de,{children:"Cook:"}),(0,m.jsxs)(le,{children:[Pe.cook_time," min"]})]})]}),Pe.recipeIngredients&&Pe.recipeIngredients.length>0&&(0,m.jsxs)(ce,{children:[(0,m.jsx)(pe,{children:"Ingredients"}),(0,m.jsx)(xe,{children:Pe.recipeIngredients.map((e,i)=>{var t;return(0,m.jsxs)(ge,{children:[(0,m.jsx)(ue,{children:(null===(t=e.ingredient)||void 0===t?void 0:t.name)||`Ingredient #${e.ingredient_id}`}),(0,m.jsxs)(he,{children:[Number(e.quantity).toFixed(2)," ",e.unit]})]},i)})})]}),Pe.instructions_summary&&(0,m.jsxs)(ce,{children:[(0,m.jsx)(pe,{children:"Summary"}),(0,m.jsx)(me,{children:Pe.instructions_summary})]}),Pe.instructions_detail&&(0,m.jsxs)(ce,{children:[(0,m.jsx)(pe,{children:"Detailed Instructions"}),(0,m.jsx)(ye,{children:Pe.instructions_detail})]})]})]})})]})};var ve=t(7617);const je=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,be=r.Ay.div`
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
`,Fe=r.Ay.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
`,ke=r.Ay.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`,we=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,Ae=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,Ce=r.Ay.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,_e=(r.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  background: #D1FAE5;
  color: #065F46;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`,r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-top: 12px;
`),Ee=r.Ay.span`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`,Be=r.Ay.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
`,ze=r.Ay.input`
  opacity: 0;
  width: 0;
  height: 0;
`,Se=r.Ay.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #E6EBF1;
  transition: 0.3s;
  border-radius: 22px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }

  ${ze}:checked + & {
    background-color: #635BFF;
  }

  ${ze}:checked + &:before {
    transform: translateX(22px);
  }
`,De=r.Ay.div`
  margin: 12px 0;
`,Ie=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`,Re=r.Ay.span`
  font-size: 12px;
  color: #6B7280;
`,$e=r.Ay.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,Te=r.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`,Le=r.Ay.button`
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
`,Pe=r.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`,Ne=r.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,Oe=r.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,Ue=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,qe=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,Me=r.Ay.div`
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
`,Qe=r.Ay.div`
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`,Ye=r.Ay.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>"out"===e.status?"#FEE2E2":"low"===e.status?"#FEF3C7":"#ECFDF5"};
  color: ${e=>"out"===e.status?"#DC2626":"low"===e.status?"#D97706":"#059669"};
`,Ze=e=>{let{onCountChange:i,categoryRefreshKey:t}=e;const{defaultCurrency:r}=(0,g.i1)(),[o,a]=(0,n.useState)("RM"),[s,d]=(0,n.useState)([]),[x,y]=(0,n.useState)([]),[f,v]=(0,n.useState)(!0),[j,b]=(0,n.useState)(""),[F,k]=(0,n.useState)("all"),[w,A]=(0,n.useState)(!1),[C,_]=(0,n.useState)(null),[E,B]=(0,n.useState)(!1),[z,S]=(0,n.useState)({isOpen:!1,ingredientId:null,ingredientName:""}),[D,I]=(0,n.useState)({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0});(0,n.useEffect)(()=>{r&&a(r)},[r]);const R=(0,n.useCallback)(async()=>{try{v(!0);const[t,n]=await Promise.all([(0,h.ff)("/api/product-ingredients"),(0,h.ff)("/api/product-ingredient-categories")]);var e;if(t.success)d(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0);n.success&&y(n.data||[])}catch(t){console.error("Failed to fetch data:",t)}finally{v(!1)}},[i]);(0,n.useEffect)(()=>{R()},[R,t]);const $=e=>{var i;e?(_(e),I({name:e.name,category_id:(null===(i=e.category_id)||void 0===i?void 0:i.toString())||"",image_url:e.image_url||"",unit:e.unit,base_quantity:e.base_quantity.toString(),unit_cost:e.unit_cost.toString(),supplier_name:e.supplier_name||"",min_stock:e.min_stock.toString(),min_order:e.min_order.toString(),current_stock:e.current_stock.toString(),track_stock:e.track_stock})):(_(null),I({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0}));A(!0)},T=()=>{A(!1),_(null),I({name:"",category_id:"",image_url:"",unit:"",base_quantity:"1",unit_cost:"0",supplier_name:"",min_stock:"0",min_order:"0",current_stock:"0",track_stock:!0})},L=e=>e.track_stock?e.current_stock<=0?"out":e.current_stock<=e.min_stock?"low":"normal":"normal",P=s.filter(e=>{var i;const t=e.name.toLowerCase().includes(j.toLowerCase())||e.code.toLowerCase().includes(j.toLowerCase()),n="all"===F||(null===(i=e.category_id)||void 0===i?void 0:i.toString())===F;return t&&n}),N=[{id:"all",name:"All Categories"},...x.map(e=>({id:e.id.toString(),name:e.name}))];return f?(0,m.jsx)(Ne,{children:(0,m.jsx)(Oe,{children:"Loading..."})}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(qe,{children:[(0,m.jsxs)(c.Qn,{style:{marginBottom:0,flex:1},children:[(0,m.jsx)(c.DO,{type:"text",placeholder:"Search ingredients...",value:j,onChange:e=>b(e.target.value)}),(0,m.jsx)(c.Jt,{value:F,onChange:e=>k(e.target.value),children:N.map(e=>(0,m.jsx)("option",{value:e.id,children:e.name},e.id))})]}),(0,m.jsx)(l.cc,{variant:"primary",onClick:()=>$(),style:{whiteSpace:"nowrap"},children:"New Ingredient"})]}),0===P.length?(0,m.jsxs)(Ne,{children:[(0,m.jsx)(Oe,{children:"No ingredients found"}),(0,m.jsx)(Ue,{children:j||"all"!==F?"Try adjusting your filters":"Add ingredients to use in your product recipes"}),!j&&"all"===F&&(0,m.jsx)(l.cc,{variant:"primary",onClick:()=>$(),children:"Create First Ingredient"})]}):(0,m.jsx)(je,{children:P.map(e=>{var i,t;return(0,m.jsxs)(be,{isActive:e.is_active,children:[e.image_url&&(0,m.jsx)(Fe,{children:(0,m.jsx)(ke,{src:e.image_url,alt:e.name})}),(0,m.jsx)(we,{children:(0,m.jsxs)("div",{children:[(0,m.jsx)(Ae,{children:e.name}),(0,m.jsxs)(Ce,{children:[null===(i=e.category)||void 0===i?void 0:i.emoji," ",(null===(t=e.category)||void 0===t?void 0:t.name)||"Uncategorized"]})]})}),(0,m.jsxs)(De,{children:[(0,m.jsxs)(Ie,{children:[(0,m.jsx)(Re,{children:"Unit Cost"}),(0,m.jsx)($e,{children:(0,u.vv)(Number(e.unit_cost),o)})]}),(0,m.jsxs)(Ie,{children:[(0,m.jsx)(Re,{children:"Base Qty / Unit"}),(0,m.jsxs)($e,{children:[Number(e.base_quantity||1)," ",e.unit]})]}),e.supplier_name&&(0,m.jsxs)(Ie,{children:[(0,m.jsx)(Re,{children:"Supplier"}),(0,m.jsx)($e,{children:e.supplier_name})]}),e.code&&(0,m.jsxs)(Ie,{children:[(0,m.jsx)(Re,{children:"Code"}),(0,m.jsx)($e,{children:e.code})]}),e.track_stock&&(0,m.jsxs)(Ie,{children:[(0,m.jsx)(Re,{children:"Stock"}),(0,m.jsxs)(Ye,{status:L(e),children:[e.current_stock," ",e.unit]})]})]}),(0,m.jsxs)(_e,{children:[(0,m.jsx)(Ee,{children:"Track in Inventory"}),(0,m.jsxs)(Be,{children:[(0,m.jsx)(ze,{type:"checkbox",checked:e.track_stock||!1,onChange:i=>{i.stopPropagation(),(async(e,i)=>{try{const t=await(0,h.ff)(`/api/product-ingredients/${e.id}`,{method:"PUT",body:JSON.stringify({name:e.name,category_id:e.category_id,image_url:e.image_url,unit:e.unit,base_quantity:e.base_quantity,unit_cost:e.unit_cost,supplier_name:e.supplier_name,min_stock:e.min_stock,min_order:e.min_order,current_stock:e.current_stock,is_active:e.is_active,track_stock:i})});t.success?d(t=>t.map(t=>t.id===e.id?{...t,track_stock:i}:t)):alert(t.error||"Failed to update track stock")}catch(t){console.error("Failed to toggle track stock:",t)}})(e,i.target.checked)}}),(0,m.jsx)(Se,{})]})]}),(0,m.jsxs)(Te,{children:[(0,m.jsx)(Le,{variant:"secondary",onClick:()=>$(e),children:"Edit"}),(0,m.jsx)(Le,{variant:"danger",onClick:()=>(e=>{S({isOpen:!0,ingredientId:e.id,ingredientName:e.name})})(e),children:"Delete"})]})]},e.id)})}),(0,m.jsx)(p.aF,{isOpen:w,onClose:T,title:C?"Edit Ingredient":"New Ingredient",size:"medium",children:(0,m.jsxs)("form",{onSubmit:e=>{e.preventDefault(),(async()=>{if(D.name.trim()&&D.unit.trim())try{B(!0);const e=C?`/api/product-ingredients/${C.id}`:"/api/product-ingredients",i=C?"PUT":"POST",t=await(0,h.ff)(e,{method:i,body:JSON.stringify({name:D.name,category_id:D.category_id?parseInt(D.category_id):null,image_url:D.image_url||null,unit:D.unit,base_quantity:parseFloat(D.base_quantity)||1,unit_cost:parseFloat(D.unit_cost)||0,supplier_name:D.supplier_name||null,min_stock:parseFloat(D.min_stock)||0,min_order:parseFloat(D.min_order)||0,current_stock:parseFloat(D.current_stock)||0,track_stock:D.track_stock})});t.success?(T(),R()):alert(t.error||"Failed to save ingredient")}catch(e){console.error("Failed to save ingredient:",e),alert("Failed to save ingredient")}finally{B(!1)}else alert("Name and Unit are required")})()},style:{display:"flex",flexDirection:"column",gap:"20px"},children:[(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Image"}),(0,m.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{var i;const t=null===(i=e.target.files)||void 0===i?void 0:i[0];if(t){const e=new FileReader;e.onloadend=()=>{I({...D,image_url:e.result})},e.readAsDataURL(t)}},style:{display:"none"},id:"ingredient-image-upload"}),(0,m.jsx)(Me,{onClick:()=>{var e;return null===(e=document.getElementById("ingredient-image-upload"))||void 0===e?void 0:e.click()},children:D.image_url?(0,m.jsx)("img",{src:D.image_url,alt:"Ingredient"}):(0,m.jsx)(Qe,{children:"Click to upload image"})})]}),(0,m.jsxs)(p.fh,{children:[(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Ingredient Name *"}),(0,m.jsx)(p.ZQ,{type:"text",value:D.name,onChange:e=>I({...D,name:e.target.value}),placeholder:"e.g., Chicken Breast",required:!0})]}),(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Category"}),(0,m.jsxs)(p.FX,{value:D.category_id,onChange:e=>I({...D,category_id:e.target.value}),children:[(0,m.jsx)("option",{value:"",children:"Select category..."}),x.map(e=>(0,m.jsxs)("option",{value:e.id,children:[e.emoji," ",e.name]},e.id))]})]})]}),(0,m.jsxs)(p.fh,{children:[(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Base Quantity *"}),(0,m.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0.01",value:D.base_quantity,onChange:e=>I({...D,base_quantity:e.target.value}),placeholder:"1",required:!0})]}),(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Unit *"}),(0,m.jsxs)(p.FX,{value:D.unit,onChange:e=>I({...D,unit:e.target.value}),required:!0,children:[(0,m.jsx)("option",{value:"",children:"Select unit..."}),(0,m.jsx)("option",{value:"kg",children:"kg"}),(0,m.jsx)("option",{value:"g",children:"g"}),(0,m.jsx)("option",{value:"L",children:"L"}),(0,m.jsx)("option",{value:"ml",children:"ml"}),(0,m.jsx)("option",{value:"piece",children:"piece"}),(0,m.jsx)("option",{value:"pack",children:"pack"}),(0,m.jsx)("option",{value:"can",children:"can"}),(0,m.jsx)("option",{value:"bottle",children:"bottle"})]})]})]}),(0,m.jsxs)(p.fh,{children:[(0,m.jsxs)(p.gE,{children:[(0,m.jsxs)(p.lR,{children:["Unit Cost (",o,") *"]}),(0,m.jsx)(p.ZQ,{type:"number",step:"0.01",min:"0",value:D.unit_cost,onChange:e=>I({...D,unit_cost:e.target.value}),placeholder:"0.00",required:!0})]}),(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Supplier"}),(0,m.jsx)(p.ZQ,{type:"text",value:D.supplier_name,onChange:e=>I({...D,supplier_name:e.target.value}),placeholder:"Supplier name"})]})]}),(0,m.jsxs)(Pe,{children:[(0,m.jsx)(p.yl,{type:"button",variant:"secondary",onClick:T,children:"Cancel"}),(0,m.jsx)(p.yl,{type:"submit",variant:"primary",disabled:E,children:E?"Saving...":C?"Update Ingredient":"Create Ingredient"})]})]})}),(0,m.jsx)(ve.A,{isOpen:z.isOpen,title:"Delete Ingredient",message:`Are you sure you want to delete "${z.ingredientName}"? This action cannot be undone.`,onConfirm:async()=>{if(z.ingredientId)try{const e=await(0,h.ff)(`/api/product-ingredients/${z.ingredientId}`,{method:"DELETE"});e.success?R():alert(e.error||"Failed to delete ingredient")}catch(e){console.error("Failed to delete ingredient:",e),alert("Failed to delete ingredient")}finally{S({isOpen:!1,ingredientId:null,ingredientName:""})}},onCancel:()=>{S({isOpen:!1,ingredientId:null,ingredientName:""})},confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},Je=r.Ay.div`
  padding: 24px 0;
`,We=r.Ay.div`
  display: grid;
  gap: 12px;
`,He=r.Ay.div`
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
`,Xe=r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,Ve=r.Ay.div`
  flex: 1;
`,Ge=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,Ke=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,ei=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,ii=r.Ay.div`
  display: flex;
  gap: 8px;
`,ti=r.Ay.button`
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
`,ni=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ri=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,oi=r.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,ai=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,si=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,di=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,li=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,ci=r.Ay.button`
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
`,pi=e=>{let{onCountChange:i,onCategoryChange:t}=e;const[r,o]=(0,n.useState)([]),[a,d]=(0,n.useState)(!0),[c,x]=(0,n.useState)(!1),[g,u]=(0,n.useState)(null),[y,f]=(0,n.useState)(!1),[v,j]=(0,n.useState)(!1),[b,F]=(0,n.useState)(null),[k,w]=(0,n.useState)({name:"",emoji:"",description:""}),A=(0,n.useCallback)(async()=>{try{d(!0);const t=await(0,h.ff)("/api/product-recipe-categories");var e;if(t.success)o(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{d(!1)}},[i]);(0,n.useEffect)(()=>{A()},[A]);const C=e=>{e?(u(e),w({name:e.name,emoji:e.emoji||"",description:e.description||""})):(u(null),w({name:"",emoji:"",description:""})),x(!0)},_=()=>{x(!1),u(null),w({name:"",emoji:"",description:""})},E=async e=>{if(e.preventDefault(),k.name.trim())try{f(!0);const e=g?`/api/product-recipe-categories/${g.id}`:"/api/product-recipe-categories",i=g?"PUT":"POST",n=await(0,h.ff)(e,{method:i,body:JSON.stringify({name:k.name.trim(),emoji:k.emoji||null,description:k.description.trim()||null})});n.success?(_(),A(),null===t||void 0===t||t()):alert(n.error||"Failed to save category")}catch(i){console.error("Failed to save category:",i),alert("Failed to save category")}finally{f(!1)}},B=async(e,i)=>{const t="up"===i?e-1:e+1;if(t<0||t>=r.length)return;const n=[...r];[n[e],n[t]]=[n[t],n[e]];const o=n.map((e,i)=>({id:e.id,display_order:i}));try{await(0,h.ff)("/api/product-recipe-categories/reorder",{method:"PUT",body:JSON.stringify({orders:o})}),A()}catch(a){console.error("Failed to reorder:",a)}};return a?(0,m.jsx)(Je,{children:(0,m.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,m.jsxs)(Je,{children:[(0,m.jsxs)(si,{children:[(0,m.jsx)(di,{children:"Recipe Categories"}),(0,m.jsx)(l.cc,{variant:"primary",onClick:()=>C(),children:"Add Category"})]}),0===r.length?(0,m.jsxs)(ri,{children:[(0,m.jsx)(oi,{children:"No categories yet"}),(0,m.jsx)(ai,{children:"Create categories to organize your product recipes"}),(0,m.jsx)(l.cc,{variant:"primary",onClick:()=>C(),children:"Add First Category"})]}):(0,m.jsx)(We,{children:r.map((e,i)=>(0,m.jsxs)(He,{isActive:e.is_active,children:[(0,m.jsx)(s.Xd,{onMoveUp:()=>B(i,"up"),onMoveDown:()=>B(i,"down"),disableUp:0===i,disableDown:i===r.length-1}),e.emoji&&(0,m.jsx)(Xe,{children:e.emoji}),(0,m.jsxs)(Ve,{children:[(0,m.jsx)(Ge,{children:e.name}),(0,m.jsxs)(Ke,{children:[(0,m.jsxs)("span",{children:[e.recipe_count||0," recipes"]}),(0,m.jsx)(ni,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,m.jsx)(ei,{children:e.description})]}),(0,m.jsxs)(ii,{children:[(0,m.jsx)(ti,{onClick:()=>C(e),title:"Edit",children:(0,m.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,m.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,m.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,m.jsx)(ti,{onClick:()=>(async e=>{try{(await(0,h.ff)(`/api/product-recipe-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&A()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,m.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,m.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,m.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,m.jsx)(ti,{onClick:()=>(e=>{F(e),j(!0)})(e),title:"Delete",disabled:(e.recipe_count||0)>0,children:(0,m.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,m.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,m.jsx)(p.aF,{isOpen:c,onClose:_,title:(g?"Edit":"New")+" Recipe Category",size:"medium",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(p.yl,{variant:"secondary",onClick:_,children:"Cancel"}),(0,m.jsx)(p.yl,{variant:"primary",onClick:E,disabled:!k.name.trim()||y,children:y?"Saving...":g?"Update":"Create"})]}),children:(0,m.jsxs)("form",{onSubmit:E,children:[(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Category Name *"}),(0,m.jsx)(p.ZQ,{type:"text",value:k.name,onChange:e=>w({...k,name:e.target.value}),placeholder:"e.g., Main Dishes",autoFocus:!0,required:!0})]}),(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Icon"}),(0,m.jsx)(li,{children:["\ud83c\udf54","\ud83c\udf55","\ud83c\udf57","\ud83e\udd57","\ud83c\udf5c","\ud83c\udf5d","\ud83c\udf64","\ud83e\udd58","\ud83c\udf5b","\ud83c\udf72","\u2615","\ud83e\udd64","\ud83e\uddc3","\ud83c\udf75","\ud83e\uddcb","\ud83c\udf7a","\ud83c\udf77","\ud83e\udd43","\ud83c\udf79","\ud83c\udf78","\ud83c\udf70","\ud83e\uddc1","\ud83c\udf6a","\ud83c\udf69","\ud83c\udf68","\ud83c\udf67","\ud83c\udf66","\ud83c\udf6e","\ud83c\udf6d","\ud83c\udf6b","\ud83e\udd50","\ud83e\udd56","\ud83c\udf5e","\ud83e\udd68","\ud83e\udd6f","\ud83e\uddc7","\ud83e\udd5e","\ud83c\udf73","\ud83e\udd5a","\ud83e\uddc8","\ud83c\udf71","\ud83c\udf59","\ud83c\udf58","\ud83c\udf63","\ud83c\udf65","\ud83c\udf61","\ud83c\udf62","\ud83c\udf60","\ud83e\udd5f","\ud83e\udd60","\ud83c\udf2e","\ud83c\udf2f","\ud83e\udd59","\ud83e\uded4","\ud83e\udd6a","\ud83c\udf2d","\ud83c\udf5f","\ud83e\uded3","\ud83e\udd53","\ud83e\uddc6"].map(e=>(0,m.jsx)(ci,{selected:k.emoji===e,onClick:()=>w({...k,emoji:e}),type:"button",children:e},e))})]}),(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Description"}),(0,m.jsx)(p.Lz,{value:k.description,onChange:e=>w({...k,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,m.jsx)(ve.A,{isOpen:v,onCancel:()=>{j(!1),F(null)},onConfirm:async()=>{if(b)try{const e=await(0,h.ff)(`/api/product-recipe-categories/${b.id}`,{method:"DELETE"});e.success?(j(!1),F(null),A(),null===t||void 0===t||t()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:b?`Are you sure you want to delete "${b.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},xi=r.Ay.div`
  padding: 24px 0;
`,gi=r.Ay.div`
  display: grid;
  gap: 12px;
`,ui=r.Ay.div`
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
`,hi=r.Ay.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`,mi=r.Ay.div`
  flex: 1;
`,yi=r.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,fi=r.Ay.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`,vi=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`,ji=r.Ay.div`
  display: flex;
  gap: 8px;
`,bi=r.Ay.button`
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
`,Fi=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,ki=r.Ay.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`,wi=r.Ay.h4`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`,Ai=r.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
`,Ci=r.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`,_i=r.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`,Ei=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`,Bi=r.Ay.button`
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
`,zi=e=>{let{onCountChange:i,onCategoryChange:t}=e;const[r,o]=(0,n.useState)([]),[a,d]=(0,n.useState)(!0),[c,x]=(0,n.useState)(!1),[g,u]=(0,n.useState)(null),[y,f]=(0,n.useState)(!1),[v,j]=(0,n.useState)(!1),[b,F]=(0,n.useState)(null),[k,w]=(0,n.useState)({name:"",emoji:"",description:""}),A=(0,n.useCallback)(async()=>{try{d(!0);const t=await(0,h.ff)("/api/product-ingredient-categories");var e;if(t.success)o(t.data||[]),null===i||void 0===i||i((null===(e=t.data)||void 0===e?void 0:e.length)||0)}catch(t){console.error("Failed to fetch categories:",t)}finally{d(!1)}},[i]);(0,n.useEffect)(()=>{A()},[A]);const C=e=>{e?(u(e),w({name:e.name,emoji:e.emoji||"",description:e.description||""})):(u(null),w({name:"",emoji:"",description:""})),x(!0)},_=()=>{x(!1),u(null),w({name:"",emoji:"",description:""})},E=async e=>{if(e.preventDefault(),k.name.trim())try{f(!0);const e=g?`/api/product-ingredient-categories/${g.id}`:"/api/product-ingredient-categories",i=g?"PUT":"POST",n=await(0,h.ff)(e,{method:i,body:JSON.stringify({name:k.name.trim(),emoji:k.emoji||null,description:k.description.trim()||null})});n.success?(_(),A(),null===t||void 0===t||t()):alert(n.error||"Failed to save category")}catch(i){console.error("Failed to save category:",i),alert("Failed to save category")}finally{f(!1)}},B=async(e,i)=>{const t="up"===i?e-1:e+1;if(t<0||t>=r.length)return;const n=[...r];[n[e],n[t]]=[n[t],n[e]];const o=n.map((e,i)=>({id:e.id,display_order:i}));try{await(0,h.ff)("/api/product-ingredient-categories/reorder",{method:"PUT",body:JSON.stringify({orders:o})}),A()}catch(a){console.error("Failed to reorder:",a)}};return a?(0,m.jsx)(xi,{children:(0,m.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})}):(0,m.jsxs)(xi,{children:[(0,m.jsxs)(Ci,{children:[(0,m.jsx)(_i,{children:"Ingredient Categories"}),(0,m.jsx)(l.cc,{variant:"primary",onClick:()=>C(),children:"Add Category"})]}),0===r.length?(0,m.jsxs)(ki,{children:[(0,m.jsx)(wi,{children:"No categories yet"}),(0,m.jsx)(Ai,{children:"Create categories to organize your ingredients"}),(0,m.jsx)(l.cc,{variant:"primary",onClick:()=>C(),children:"Add First Category"})]}):(0,m.jsx)(gi,{children:r.map((e,i)=>(0,m.jsxs)(ui,{isActive:e.is_active,children:[(0,m.jsx)(s.Xd,{onMoveUp:()=>B(i,"up"),onMoveDown:()=>B(i,"down"),disableUp:0===i,disableDown:i===r.length-1}),e.emoji&&(0,m.jsx)(hi,{children:e.emoji}),(0,m.jsxs)(mi,{children:[(0,m.jsx)(yi,{children:e.name}),(0,m.jsxs)(fi,{children:[(0,m.jsxs)("span",{children:[e.ingredient_count||0," ingredients"]}),(0,m.jsx)(Fi,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]}),e.description&&(0,m.jsx)(vi,{children:e.description})]}),(0,m.jsxs)(ji,{children:[(0,m.jsx)(bi,{onClick:()=>C(e),title:"Edit",children:(0,m.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",children:[(0,m.jsx)("path",{d:"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),(0,m.jsx)("path",{d:"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]})}),(0,m.jsx)(bi,{onClick:()=>(async e=>{try{(await(0,h.ff)(`/api/product-ingredient-categories/${e.id}`,{method:"PUT",body:JSON.stringify({...e,is_active:!e.is_active})})).success&&A()}catch(i){console.error("Failed to toggle category:",i)}})(e),title:e.is_active?"Deactivate":"Activate",children:(0,m.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:e.is_active?(0,m.jsx)("path",{d:"M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}):(0,m.jsx)("path",{d:"M5 13l4 4L19 7",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,m.jsx)(bi,{onClick:()=>(e=>{F(e),j(!0)})(e),title:"Delete",disabled:(e.ingredient_count||0)>0,children:(0,m.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",children:(0,m.jsx)("path",{d:"M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]})]},e.id))}),(0,m.jsx)(p.aF,{isOpen:c,onClose:_,title:(g?"Edit":"New")+" Ingredient Category",size:"medium",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(p.yl,{variant:"secondary",onClick:_,children:"Cancel"}),(0,m.jsx)(p.yl,{variant:"primary",onClick:E,disabled:!k.name.trim()||y,children:y?"Saving...":g?"Update":"Create"})]}),children:(0,m.jsxs)("form",{onSubmit:E,children:[(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Category Name *"}),(0,m.jsx)(p.ZQ,{type:"text",value:k.name,onChange:e=>w({...k,name:e.target.value}),placeholder:"e.g., Proteins",autoFocus:!0,required:!0})]}),(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Icon"}),(0,m.jsx)(Ei,{children:["\ud83e\udd69","\ud83c\udf56","\ud83e\udd53","\ud83c\udf57","\ud83e\udd90","\ud83e\udd9e","\ud83e\udd80","\ud83d\udc1f","\ud83e\udd5a","\ud83e\uddc0","\ud83e\udd6c","\ud83e\udd66","\ud83e\udd55","\ud83e\uddc5","\ud83e\uddc4","\ud83e\udd54","\ud83c\udf45","\ud83e\udd52","\ud83c\udf36\ufe0f","\ud83e\uded1","\ud83c\udf4e","\ud83c\udf4a","\ud83c\udf4b","\ud83c\udf47","\ud83c\udf53","\ud83e\uded0","\ud83e\udd5d","\ud83c\udf4c","\ud83e\udd6d","\ud83c\udf4d","\ud83e\uddc8","\ud83e\udd5b","\ud83e\uddc2","\ud83c\udf6f","\ud83e\uded2","\ud83e\udd5c","\ud83c\udf30","\ud83c\udf5a","\ud83c\udf5d","\ud83e\udd6b","\ud83e\uddca","\ud83d\udca7","\ud83c\udf76","\ud83e\uded7","\ud83e\uddf4","\ud83e\uddf9","\ud83e\uddfd","\ud83d\udce6","\ud83c\udff7\ufe0f","\ud83d\udd16"].map(e=>(0,m.jsx)(Bi,{selected:k.emoji===e,onClick:()=>w({...k,emoji:e}),type:"button",children:e},e))})]}),(0,m.jsxs)(p.gE,{children:[(0,m.jsx)(p.lR,{children:"Description"}),(0,m.jsx)(p.Lz,{value:k.description,onChange:e=>w({...k,description:e.target.value}),placeholder:"Brief description of this category...",rows:3})]})]})}),(0,m.jsx)(ve.A,{isOpen:v,onCancel:()=>{j(!1),F(null)},onConfirm:async()=>{if(b)try{const e=await(0,h.ff)(`/api/product-ingredient-categories/${b.id}`,{method:"DELETE"});e.success?(j(!1),F(null),A(),null===t||void 0===t||t()):alert(e.error||"Failed to delete category")}catch(e){console.error("Failed to delete category:",e),alert("Failed to delete category")}},title:"Delete Category",message:b?`Are you sure you want to delete "${b.name}"? This action cannot be undone.`:"",confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})},Si=r.Ay.span`
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
`,Di=()=>{const{user:e}=(0,d.As)(),[i,t]=(0,o.ok)(),[r,l]=(0,n.useState)(0),[c,p]=(0,n.useState)(0),[x,g]=(0,n.useState)(0),[u,h]=(0,n.useState)(0),[y,f]=(0,n.useState)(0),[v,j]=(0,n.useState)(0),b=i.get("tab")||"recipes",F=null===e||void 0===e?void 0:e.brand_id,k=e=>{t({tab:e})};return F?(0,m.jsx)(a.A,{children:(0,m.jsxs)(s.mc,{children:[(0,m.jsx)(s.Y9,{children:(0,m.jsx)(s.hE,{children:"Product Recipes"})}),(0,m.jsxs)(s.UC,{children:[(0,m.jsxs)(s.j,{children:[(0,m.jsxs)(s.oz,{active:"recipes"===b,onClick:()=>k("recipes"),children:["Recipes",(0,m.jsx)(Si,{children:r})]}),(0,m.jsxs)(s.oz,{active:"ingredients"===b,onClick:()=>k("ingredients"),children:["Ingredients",(0,m.jsx)(Si,{children:c})]}),(0,m.jsxs)(s.oz,{active:"recipe-categories"===b,onClick:()=>k("recipe-categories"),children:["Recipe Categories",(0,m.jsx)(Si,{children:x})]}),(0,m.jsxs)(s.oz,{active:"ingredient-categories"===b,onClick:()=>k("ingredient-categories"),children:["Ingredient Categories",(0,m.jsx)(Si,{children:u})]})]}),(0,m.jsx)("div",{style:{display:"recipes"===b?"block":"none"},children:(0,m.jsx)(fe,{onCountChange:l,categoryRefreshKey:v})}),(0,m.jsx)("div",{style:{display:"ingredients"===b?"block":"none"},children:(0,m.jsx)(Ze,{onCountChange:p,categoryRefreshKey:y})}),(0,m.jsx)("div",{style:{display:"recipe-categories"===b?"block":"none"},children:(0,m.jsx)(pi,{onCountChange:g,onCategoryChange:()=>j(e=>e+1)})}),(0,m.jsx)("div",{style:{display:"ingredient-categories"===b?"block":"none"},children:(0,m.jsx)(zi,{onCountChange:h,onCategoryChange:()=>f(e=>e+1)})})]})]})}):(0,m.jsx)(a.A,{children:(0,m.jsxs)(s.mc,{children:[(0,m.jsx)(s.Y9,{children:(0,m.jsx)(s.hE,{children:"Product Recipes"})}),(0,m.jsx)(s.UC,{children:(0,m.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Brand not found. Please log in with a brand account."})})]})})}},7617:(e,i,t)=>{t.d(i,{A:()=>x});t(9950);var n=t(4752),r=t(9610),o=t(4414);const a=n.Ay.div`
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
`,x=e=>{let{isOpen:i,title:t,message:n,onConfirm:x,onCancel:g,confirmText:u="Confirm",cancelText:h="Cancel",type:m="warning"}=e;return i?(0,o.jsx)(r.mH,{onClick:e=>{e.target===e.currentTarget&&g()},children:(0,o.jsxs)(a,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(s,{children:[(0,o.jsx)(d,{children:t}),(0,o.jsx)(l,{children:n})]}),(0,o.jsxs)(c,{children:[(0,o.jsx)(p,{variant:"secondary",onClick:g,children:h}),(0,o.jsx)(p,{variant:"primary",type:m,onClick:x,children:u})]})]})}):null}}}]);