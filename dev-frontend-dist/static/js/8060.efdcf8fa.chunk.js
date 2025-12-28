"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8060],{2488:(e,n,r)=>{r.d(n,{DO:()=>l,Jt:()=>c,Qn:()=>d});r(9950);var a=r(4752),i=r(4414);const t=a.Ay.div`
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
`,s=a.Ay.input`
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
`,o=a.Ay.select`
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
`,d=e=>{let{children:n,className:r,style:a,...s}=e;return(0,i.jsx)(t,{className:r,style:a,...s,children:n})},l=e=>{let{placeholder:n="Search...",...r}=e;return(0,i.jsx)(s,{placeholder:n,...r})},c=e=>{let{children:n,...r}=e;return(0,i.jsx)(o,{...r,children:n})}},3705:(e,n,r)=>{r.d(n,{cc:()=>i});var a=r(4752);const i=a.Ay.button`
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
`;a.Ay.select`
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
`,a.Ay.input`
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
`,a.Ay.div`
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
`},7617:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var a=r(4752),i=r(9610),t=r(4414);const s=a.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,o=a.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=a.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,l=a.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=a.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=a.Ay.button`
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
`,x=e=>{let{isOpen:n,title:r,message:a,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:m="Cancel",type:g="warning"}=e;return n?(0,t.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,t.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)(o,{children:[(0,t.jsx)(d,{children:r}),(0,t.jsx)(l,{children:a})]}),(0,t.jsxs)(c,{children:[(0,t.jsx)(p,{variant:"secondary",onClick:h,children:m}),(0,t.jsx)(p,{variant:"primary",type:g,onClick:x,children:u})]})]})}):null}},8060:(e,n,r)=>{r.r(n),r.d(n,{default:()=>R});var a=r(9950),i=r(4752),t=r(3310),s=r(7492),o=r(3705),d=r(2488),l=r(1367),c=r(9610),p=r(7617),x=r(4414);const h=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,u=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
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
  ${e=>e.readOnly&&"\n    background: #F9FAFB;\n    border: 1px dashed #D1D5DB;\n  "}

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,g=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,b=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,y=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
  margin-left: 8px;
`,f=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,j=i.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4F46E5;
`,v=i.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
`,w=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
  margin-left: 8px;
`,C=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`,F=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #6B7280;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`,A=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
`,E=i.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid ${e=>"danger"===e.variant?"#FEE2E2":"#E6EBF1"};
  background: ${e=>"danger"===e.variant?"#FEF2F2":"white"};
  color: ${e=>"danger"===e.variant?"#DC2626":"#4B5563"};

  &:hover {
    background: ${e=>"danger"===e.variant?"#FEE2E2":"#F9FAFB"};
    border-color: ${e=>"danger"===e.variant?"#FECACA":"#D1D5DB"};
  }
`,k=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,B=i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,_=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,$=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,z=i.Ay.div`
  margin-bottom: 32px;
`,S=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,D=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
`,N=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
  }

  input:checked + & {
    border-color: #635BFF;
    background: #EEF2FF;
  }
`,L=i.Ay.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`,O=i.Ay.div`
  position: relative;
  display: inline-flex;
`,R=()=>{const{user:e}=(0,l.As)(),n=(null===e||void 0===e?void 0:e.restaurant_id)||(null===e||void 0===e?void 0:e.restaurantId),[r,i]=(0,a.useState)([]),[R,I]=(0,a.useState)([]),[T,Q]=(0,a.useState)([]),[Z,P]=(0,a.useState)(!0),[Y,M]=(0,a.useState)(""),[U,W]=(0,a.useState)(null),[H,J]=(0,a.useState)(!1),[q,G]=(0,a.useState)({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]}),[V,K]=(0,a.useState)({isOpen:!1,supplierId:null,supplierName:""}),X="Restaurant Admin"===(null===e||void 0===e?void 0:e.role),ee="Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role),ne=(0,a.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,a.useEffect)(()=>{ee?(re(),ae()):X&&n?ie():P(!1)},[ee,X,n]);const re=async()=>{try{const e=ne(),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();Q(e)}}catch(e){console.error("Error fetching brands:",e)}},ae=async()=>{const e=ne();P(!0);try{const n=await fetch("/api/suppliers",{headers:{Authorization:`Bearer ${e}`}}),r=await n.json();r.success&&i(r.data)}catch(n){console.error("Failed to fetch suppliers:",n)}finally{P(!1)}},ie=async()=>{const e=ne();P(!0);try{const r=await fetch(`/api/restaurants/${n}/all-suppliers`,{headers:{Authorization:`Bearer ${e}`}}),a=await r.json();a.success&&(i(a.data.own_suppliers||[]),I(a.data.brand_suppliers||[]))}catch(r){console.error("Failed to fetch suppliers:",r)}finally{P(!1)}},te=e=>{var n;e?(W(e),G({code:e.code||"",name:e.name,contact_name:e.contact_name||"",phone:e.phone||"",email:e.email||"",address:e.address||"",business_number:e.business_number||"",bank_name:e.bank_name||"",bank_account:e.bank_account||"",payment_terms:e.payment_terms||"",notes:e.notes||"",brand_ids:(null===(n=e.connectedBrands)||void 0===n?void 0:n.map(e=>e.id))||[]})):(W(null),G({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]}));J(!0)},se=()=>{J(!1),W(null),G({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]})},oe=e=>{G(n=>({...n,brand_ids:n.brand_ids.includes(e)?n.brand_ids.filter(n=>n!==e):[...n.brand_ids,e]}))},de=async e=>{if(e.preventDefault(),q.name.trim())try{const e=ne();let r="";const a=U?"PUT":"POST";if(ee?r=U?`/api/suppliers/${U.id}`:"/api/suppliers":X&&n&&(r=U?`/api/restaurants/${n}/suppliers/${U.id}`:`/api/restaurants/${n}/suppliers`),!r)return;const i=await fetch(r,{method:a,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(q)}),t=await i.json();t.success?(se(),ee?ae():ie()):alert(t.error||"Failed to save")}catch(r){console.error("Failed to save supplier:",r),alert("Failed to save")}},le=r.filter(e=>e.name.toLowerCase().includes(Y.toLowerCase())||e.code&&e.code.toLowerCase().includes(Y.toLowerCase())||e.contact_name&&e.contact_name.toLowerCase().includes(Y.toLowerCase())),ce=R.filter(e=>e.name.toLowerCase().includes(Y.toLowerCase())||e.code&&e.code.toLowerCase().includes(Y.toLowerCase())||e.contact_name&&e.contact_name.toLowerCase().includes(Y.toLowerCase())),pe=function(e){let n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,x.jsxs)(m,{isActive:e.is_active,readOnly:n,onClick:()=>!n&&te(e),children:[(0,x.jsxs)(g,{children:[(0,x.jsx)("div",{children:(0,x.jsxs)(b,{children:[e.name,e.code&&(0,x.jsxs)(y,{children:["(",e.code,")"]})]})}),(0,x.jsx)("div",{style:{display:"flex",alignItems:"center"},children:!n&&(0,x.jsx)(w,{active:e.is_active,children:e.is_active?"Active":"Inactive"})})]}),ee&&(0,x.jsx)(f,{children:e.connectedBrands&&e.connectedBrands.length>0?e.connectedBrands.map(e=>(0,x.jsx)(j,{children:e.name},e.id)):(0,x.jsx)(v,{children:"No brand connected"})}),(0,x.jsxs)(C,{children:[e.contact_name&&(0,x.jsxs)(F,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),(0,x.jsx)("circle",{cx:"12",cy:"7",r:"4"})]}),e.contact_name]}),e.phone&&(0,x.jsxs)(F,{children:[(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})}),e.phone]}),e.email&&(0,x.jsxs)(F,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,x.jsx)("polyline",{points:"22,6 12,13 2,6"})]}),e.email]}),e.payment_terms&&(0,x.jsxs)(F,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("rect",{x:"1",y:"4",width:"22",height:"16",rx:"2",ry:"2"}),(0,x.jsx)("line",{x1:"1",y1:"10",x2:"23",y2:"10"})]}),e.payment_terms]})]}),!n&&(0,x.jsxs)(A,{onClick:e=>e.stopPropagation(),children:[(0,x.jsx)(E,{onClick:()=>te(e),children:"Edit"}),(0,x.jsx)(E,{variant:"danger",onClick:()=>K({isOpen:!0,supplierId:e.id,supplierName:e.name}),children:"Delete"})]})]},e.id)};return!Z||r.length||R.length?(0,x.jsx)(t.A,{children:(0,x.jsxs)(s.mc,{children:[(0,x.jsxs)(s.Y9,{children:[(0,x.jsx)(s.hE,{children:"Suppliers"}),(0,x.jsx)(h,{children:(0,x.jsx)(o.cc,{variant:"primary",onClick:()=>te(),children:"Add Supplier"})})]}),(0,x.jsxs)(s.UC,{children:[(0,x.jsx)($,{children:(0,x.jsx)(d.Qn,{style:{marginBottom:0,flex:1},children:(0,x.jsx)(d.DO,{type:"text",placeholder:"Search suppliers...",value:Y,onChange:e=>M(e.target.value)})})}),X&&ce.length>0&&(0,x.jsxs)(z,{children:[(0,x.jsx)(S,{children:"Brand Suppliers (Read Only)"}),(0,x.jsx)(u,{children:ce.map(e=>pe(e,!0))})]}),0===r.length&&0===R.length?(0,x.jsxs)(k,{children:[(0,x.jsx)(B,{children:"No suppliers yet"}),(0,x.jsxs)(_,{children:["Add suppliers to manage your ingredient sources.",ee&&" You can connect suppliers to multiple brands."]}),(0,x.jsx)(o.cc,{variant:"primary",onClick:()=>te(),children:"Add Supplier"})]}):0!==le.length||X?(0,x.jsxs)(x.Fragment,{children:[X&&le.length>0&&(0,x.jsx)(S,{children:"My Suppliers"}),(0,x.jsx)(u,{children:le.map(e=>{return pe(e,(n=e,X&&"brand"===n.owner_type));var n})})]}):(0,x.jsxs)(k,{children:[(0,x.jsx)(B,{children:"No suppliers found"}),(0,x.jsx)(_,{children:Y?"Try adjusting your search":"Add your first supplier"})]})]}),(0,x.jsx)(c.aF,{isOpen:H,onClose:se,title:U?"Edit Supplier":"New Supplier",size:"large",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c.yl,{variant:"secondary",onClick:se,children:"Cancel"}),(0,x.jsx)(c.yl,{variant:"primary",onClick:de,disabled:!q.name.trim(),children:U?"Update":"Create"})]}),children:(0,x.jsxs)("form",{onSubmit:de,children:[(0,x.jsxs)(c.fh,{children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Supplier Name *"}),(0,x.jsx)(c.ZQ,{type:"text",value:q.name,onChange:e=>G({...q,name:e.target.value}),placeholder:"Company name",required:!0})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Code"}),(0,x.jsx)(c.ZQ,{type:"text",value:q.code,onChange:e=>G({...q,code:e.target.value}),placeholder:"Internal code"})]})]}),ee&&T.length>0&&(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Connect to Brands"}),(0,x.jsx)(D,{children:T.map(e=>(0,x.jsxs)(O,{children:[(0,x.jsx)(L,{type:"checkbox",id:`brand-${e.id}`,checked:q.brand_ids.includes(e.id),onChange:()=>oe(e.id)}),(0,x.jsxs)(N,{htmlFor:`brand-${e.id}`,style:{borderColor:q.brand_ids.includes(e.id)?"#635BFF":"#E5E7EB",background:q.brand_ids.includes(e.id)?"#EEF2FF":"white"},children:[(0,x.jsx)("input",{type:"checkbox",checked:q.brand_ids.includes(e.id),onChange:()=>oe(e.id),style:{accentColor:"#635BFF"}}),e.name]})]},e.id))})]}),(0,x.jsxs)(c.fh,{children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Contact Person"}),(0,x.jsx)(c.ZQ,{type:"text",value:q.contact_name,onChange:e=>G({...q,contact_name:e.target.value}),placeholder:"Contact name"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Phone"}),(0,x.jsx)(c.ZQ,{type:"text",value:q.phone,onChange:e=>G({...q,phone:e.target.value}),placeholder:"Phone number"})]})]}),(0,x.jsxs)(c.fh,{children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Email"}),(0,x.jsx)(c.ZQ,{type:"email",value:q.email,onChange:e=>G({...q,email:e.target.value}),placeholder:"Email address"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Business Number"}),(0,x.jsx)(c.ZQ,{type:"text",value:q.business_number,onChange:e=>G({...q,business_number:e.target.value}),placeholder:"Business registration number"})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Address"}),(0,x.jsx)(c.ZQ,{type:"text",value:q.address,onChange:e=>G({...q,address:e.target.value}),placeholder:"Full address"})]}),(0,x.jsx)(c.fh,{children:(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Payment Terms"}),(0,x.jsx)(c.ZQ,{type:"text",value:q.payment_terms,onChange:e=>G({...q,payment_terms:e.target.value}),placeholder:"e.g., Net 30, COD"})]})}),(0,x.jsxs)(c.fh,{children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Bank Name"}),(0,x.jsx)(c.ZQ,{type:"text",value:q.bank_name,onChange:e=>G({...q,bank_name:e.target.value}),placeholder:"Bank name"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Bank Account"}),(0,x.jsx)(c.ZQ,{type:"text",value:q.bank_account,onChange:e=>G({...q,bank_account:e.target.value}),placeholder:"Account number"})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Notes"}),(0,x.jsx)(c.Lz,{value:q.notes,onChange:e=>G({...q,notes:e.target.value}),placeholder:"Additional notes...",rows:3})]})]})}),(0,x.jsx)(p.A,{isOpen:V.isOpen,onCancel:()=>K({isOpen:!1,supplierId:null,supplierName:""}),onConfirm:async()=>{if(V.supplierId)try{const e=ne();let r="";if(ee?r=`/api/suppliers/${V.supplierId}`:X&&n&&(r=`/api/restaurants/${n}/suppliers/${V.supplierId}`),!r)return;const a=await fetch(r,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await a.json();i.success?(K({isOpen:!1,supplierId:null,supplierName:""}),ee?ae():ie()):alert(i.error||"Failed to delete")}catch(e){console.error("Failed to delete supplier:",e),alert("Failed to delete")}},title:"Delete Supplier",message:`Are you sure you want to delete "${V.supplierName}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}):(0,x.jsx)(t.A,{children:(0,x.jsxs)(s.mc,{children:[(0,x.jsx)(s.Y9,{children:(0,x.jsx)(s.hE,{children:"Suppliers"})}),(0,x.jsx)(s.UC,{children:(0,x.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})})}}}]);