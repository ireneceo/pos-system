"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8060],{2488:(e,n,r)=>{r.d(n,{DO:()=>c,Jt:()=>x,Qn:()=>p});r(9950);var a=r(4752),i=r(4414);const t=a.Ay.div`
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
`,o=a.Ay.input`
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
`,s=a.Ay.div`
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
`,d=a.Ay.button`
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
`,l=a.Ay.select`
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
`,p=e=>{let{children:n,className:r,style:a,...o}=e;return(0,i.jsx)(t,{className:r,style:a,...o,children:n})},c=e=>{let{placeholder:n="Search...",value:r,onChange:a,style:t,...l}=e;return(0,i.jsxs)(s,{style:t,children:[(0,i.jsx)(o,{placeholder:n,value:r,onChange:a,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...l}),r&&(0,i.jsx)(d,{type:"button",onClick:()=>null===a||void 0===a?void 0:a({target:{value:""}}),"aria-label":"Clear search",children:(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,i.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:n,...r}=e;return(0,i.jsx)(l,{...r,children:n})}},3705:(e,n,r)=>{r.d(n,{cc:()=>i});var a=r(4752);const i=a.Ay.button`
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
`},7617:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var a=r(4752),i=r(9610),t=r(4414);const o=a.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=a.Ay.div`
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
`,p=a.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,c=a.Ay.button`
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
`,x=e=>{let{isOpen:n,title:r,message:a,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:m="Cancel",type:g="warning"}=e;return n?(0,t.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,t.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)(s,{children:[(0,t.jsx)(d,{children:r}),(0,t.jsx)(l,{children:a})]}),(0,t.jsxs)(p,{children:[(0,t.jsx)(c,{variant:"secondary",onClick:h,children:m}),(0,t.jsx)(c,{variant:"primary",type:g,onClick:x,children:u})]})]})}):null}},8060:(e,n,r)=>{r.r(n),r.d(n,{default:()=>O});var a=r(9950),i=r(4752),t=r(2853),o=r(8409),s=r(3705),d=r(2488),l=r(1367),p=r(9610),c=r(7617),x=r(4414);const h=i.Ay.div`
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
`,w=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,f=i.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4F46E5;
`,j=i.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
`,v=i.Ay.span`
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
`,k=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
`,A=i.Ay.button`
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
`,E=i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,B=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,_=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,$=i.Ay.div`
  margin-bottom: 32px;
`,z=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,S=i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
`,D=i.Ay.label`
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
`,N=i.Ay.div`
  position: relative;
  display: inline-flex;
`,O=()=>{const{user:e}=(0,l.As)(),n=(null===e||void 0===e?void 0:e.restaurant_id)||(null===e||void 0===e?void 0:e.restaurantId),[r,i]=(0,a.useState)([]),[O,R]=(0,a.useState)([]),[I,T]=(0,a.useState)([]),[Q,Z]=(0,a.useState)(!0),[P,Y]=(0,a.useState)(""),[W,M]=(0,a.useState)(null),[U,H]=(0,a.useState)(!1),[J,q]=(0,a.useState)({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]}),[G,V]=(0,a.useState)({isOpen:!1,supplierId:null,supplierName:""}),K="Restaurant Admin"===(null===e||void 0===e?void 0:e.role),X="Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role),ee=(0,a.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,a.useEffect)(()=>{X?(ne(),re()):K&&n?ae():Z(!1)},[X,K,n]);const ne=async()=>{try{const e=ee(),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();T(e)}}catch(e){console.error("Error fetching brands:",e)}},re=async()=>{const e=ee();Z(!0);try{const n=await fetch("/api/suppliers",{headers:{Authorization:`Bearer ${e}`}}),r=await n.json();r.success&&i(r.data)}catch(n){console.error("Failed to fetch suppliers:",n)}finally{Z(!1)}},ae=async()=>{const e=ee();Z(!0);try{const r=await fetch(`/api/restaurants/${n}/all-suppliers`,{headers:{Authorization:`Bearer ${e}`}}),a=await r.json();a.success&&(i(a.data.own_suppliers||[]),R(a.data.brand_suppliers||[]))}catch(r){console.error("Failed to fetch suppliers:",r)}finally{Z(!1)}},ie=e=>{var n;e?(M(e),q({code:e.code||"",name:e.name,contact_name:e.contact_name||"",phone:e.phone||"",email:e.email||"",address:e.address||"",business_number:e.business_number||"",bank_name:e.bank_name||"",bank_account:e.bank_account||"",payment_terms:e.payment_terms||"",notes:e.notes||"",brand_ids:(null===(n=e.connectedBrands)||void 0===n?void 0:n.map(e=>e.id))||[]})):(M(null),q({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]}));H(!0)},te=()=>{H(!1),M(null),q({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]})},oe=e=>{q(n=>({...n,brand_ids:n.brand_ids.includes(e)?n.brand_ids.filter(n=>n!==e):[...n.brand_ids,e]}))},se=async e=>{if(e.preventDefault(),J.name.trim())try{const e=ee();let r="";const a=W?"PUT":"POST";if(X?r=W?`/api/suppliers/${W.id}`:"/api/suppliers":K&&n&&(r=W?`/api/restaurants/${n}/suppliers/${W.id}`:`/api/restaurants/${n}/suppliers`),!r)return;const i=await fetch(r,{method:a,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(J)}),t=await i.json();t.success?(te(),X?re():ae()):alert(t.error||"Failed to save")}catch(r){console.error("Failed to save supplier:",r),alert("Failed to save")}},de=r.filter(e=>e.name.toLowerCase().includes(P.toLowerCase())||e.code&&e.code.toLowerCase().includes(P.toLowerCase())||e.contact_name&&e.contact_name.toLowerCase().includes(P.toLowerCase())),le=O.filter(e=>e.name.toLowerCase().includes(P.toLowerCase())||e.code&&e.code.toLowerCase().includes(P.toLowerCase())||e.contact_name&&e.contact_name.toLowerCase().includes(P.toLowerCase())),pe=function(e){let n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,x.jsxs)(m,{isActive:e.is_active,readOnly:n,onClick:()=>!n&&ie(e),children:[(0,x.jsxs)(g,{children:[(0,x.jsx)("div",{children:(0,x.jsxs)(b,{children:[e.name,e.code&&(0,x.jsxs)(y,{children:["(",e.code,")"]})]})}),(0,x.jsx)("div",{style:{display:"flex",alignItems:"center"},children:!n&&(0,x.jsx)(v,{active:e.is_active,children:e.is_active?"Active":"Inactive"})})]}),X&&(0,x.jsx)(w,{children:e.connectedBrands&&e.connectedBrands.length>0?e.connectedBrands.map(e=>(0,x.jsx)(f,{children:e.name},e.id)):(0,x.jsx)(j,{children:"No brand connected"})}),(0,x.jsxs)(C,{children:[e.contact_name&&(0,x.jsxs)(F,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),(0,x.jsx)("circle",{cx:"12",cy:"7",r:"4"})]}),e.contact_name]}),e.phone&&(0,x.jsxs)(F,{children:[(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})}),e.phone]}),e.email&&(0,x.jsxs)(F,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,x.jsx)("polyline",{points:"22,6 12,13 2,6"})]}),e.email]}),e.payment_terms&&(0,x.jsxs)(F,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("rect",{x:"1",y:"4",width:"22",height:"16",rx:"2",ry:"2"}),(0,x.jsx)("line",{x1:"1",y1:"10",x2:"23",y2:"10"})]}),e.payment_terms]})]}),!n&&(0,x.jsxs)(k,{onClick:e=>e.stopPropagation(),children:[(0,x.jsx)(A,{onClick:()=>ie(e),children:"Edit"}),(0,x.jsx)(A,{variant:"danger",onClick:()=>V({isOpen:!0,supplierId:e.id,supplierName:e.name}),children:"Delete"})]})]},e.id)};return!Q||r.length||O.length?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(o.mc,{children:[(0,x.jsxs)(o.Y9,{children:[(0,x.jsx)(o.hE,{children:"Suppliers"}),(0,x.jsx)(h,{children:(0,x.jsx)(s.cc,{variant:"primary",onClick:()=>ie(),children:"Add Supplier"})})]}),(0,x.jsxs)(o.UC,{children:[(0,x.jsx)(_,{children:(0,x.jsx)(d.Qn,{style:{marginBottom:0,flex:1},children:(0,x.jsx)(d.DO,{type:"text",placeholder:"Search suppliers...",value:P,onChange:e=>Y(e.target.value)})})}),K&&le.length>0&&(0,x.jsxs)($,{children:[(0,x.jsx)(z,{children:"Brand Suppliers (Read Only)"}),(0,x.jsx)(u,{children:le.map(e=>pe(e,!0))})]}),0===r.length&&0===O.length?(0,x.jsxs)(t.pp,{children:[(0,x.jsx)(E,{children:"No suppliers yet"}),(0,x.jsxs)(B,{children:["Add suppliers to manage your ingredient sources.",X&&" You can connect suppliers to multiple brands."]}),(0,x.jsx)(s.cc,{variant:"primary",onClick:()=>ie(),children:"Add Supplier"})]}):0!==de.length||K?(0,x.jsxs)(x.Fragment,{children:[K&&de.length>0&&(0,x.jsx)(z,{children:"My Suppliers"}),(0,x.jsx)(u,{children:de.map(e=>{return pe(e,(n=e,K&&"brand"===n.owner_type));var n})})]}):(0,x.jsxs)(t.pp,{children:[(0,x.jsx)(E,{children:"No suppliers found"}),(0,x.jsx)(B,{children:P?"Try adjusting your search":"Add your first supplier"})]})]}),(0,x.jsx)(p.aF,{isOpen:U,onClose:te,title:W?"Edit Supplier":"New Supplier",size:"large",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(p.yl,{variant:"secondary",onClick:te,children:"Cancel"}),(0,x.jsx)(p.yl,{variant:"primary",onClick:se,disabled:!J.name.trim(),children:W?"Update":"Create"})]}),children:(0,x.jsxs)("form",{onSubmit:se,children:[(0,x.jsxs)(p.fh,{children:[(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Supplier Name *"}),(0,x.jsx)(p.ZQ,{type:"text",value:J.name,onChange:e=>q({...J,name:e.target.value}),placeholder:"Company name",required:!0})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Code"}),(0,x.jsx)(p.ZQ,{type:"text",value:J.code,onChange:e=>q({...J,code:e.target.value}),placeholder:"Internal code"})]})]}),X&&I.length>0&&(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Connect to Brands"}),(0,x.jsx)(S,{children:I.map(e=>(0,x.jsxs)(N,{children:[(0,x.jsx)(L,{type:"checkbox",id:`brand-${e.id}`,checked:J.brand_ids.includes(e.id),onChange:()=>oe(e.id)}),(0,x.jsxs)(D,{htmlFor:`brand-${e.id}`,style:{borderColor:J.brand_ids.includes(e.id)?"#635BFF":"#E5E7EB",background:J.brand_ids.includes(e.id)?"#EEF2FF":"white"},children:[(0,x.jsx)("input",{type:"checkbox",checked:J.brand_ids.includes(e.id),onChange:()=>oe(e.id),style:{accentColor:"#635BFF"}}),e.name]})]},e.id))})]}),(0,x.jsxs)(p.fh,{children:[(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Contact Person"}),(0,x.jsx)(p.ZQ,{type:"text",value:J.contact_name,onChange:e=>q({...J,contact_name:e.target.value}),placeholder:"Contact name"})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Phone"}),(0,x.jsx)(p.ZQ,{type:"text",value:J.phone,onChange:e=>q({...J,phone:e.target.value}),placeholder:"Phone number"})]})]}),(0,x.jsxs)(p.fh,{children:[(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Email"}),(0,x.jsx)(p.ZQ,{type:"email",value:J.email,onChange:e=>q({...J,email:e.target.value}),placeholder:"Email address"})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Business Number"}),(0,x.jsx)(p.ZQ,{type:"text",value:J.business_number,onChange:e=>q({...J,business_number:e.target.value}),placeholder:"Business registration number"})]})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Address"}),(0,x.jsx)(p.ZQ,{type:"text",value:J.address,onChange:e=>q({...J,address:e.target.value}),placeholder:"Full address"})]}),(0,x.jsx)(p.fh,{children:(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Payment Terms"}),(0,x.jsx)(p.ZQ,{type:"text",value:J.payment_terms,onChange:e=>q({...J,payment_terms:e.target.value}),placeholder:"e.g., Net 30, COD"})]})}),(0,x.jsxs)(p.fh,{children:[(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Bank Name"}),(0,x.jsx)(p.ZQ,{type:"text",value:J.bank_name,onChange:e=>q({...J,bank_name:e.target.value}),placeholder:"Bank name"})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Bank Account"}),(0,x.jsx)(p.ZQ,{type:"text",value:J.bank_account,onChange:e=>q({...J,bank_account:e.target.value}),placeholder:"Account number"})]})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Notes"}),(0,x.jsx)(p.Lz,{value:J.notes,onChange:e=>q({...J,notes:e.target.value}),placeholder:"Additional notes...",rows:3})]})]})}),(0,x.jsx)(c.A,{isOpen:G.isOpen,onCancel:()=>V({isOpen:!1,supplierId:null,supplierName:""}),onConfirm:async()=>{if(G.supplierId)try{const e=ee();let r="";if(X?r=`/api/suppliers/${G.supplierId}`:K&&n&&(r=`/api/restaurants/${n}/suppliers/${G.supplierId}`),!r)return;const a=await fetch(r,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await a.json();i.success?(V({isOpen:!1,supplierId:null,supplierName:""}),X?re():ae()):alert(i.error||"Failed to delete")}catch(e){console.error("Failed to delete supplier:",e),alert("Failed to delete")}},title:"Delete Supplier",message:`Are you sure you want to delete "${G.supplierName}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}):(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(o.mc,{children:[(0,x.jsx)(o.Y9,{children:(0,x.jsx)(o.hE,{children:"Suppliers"})}),(0,x.jsx)(o.UC,{children:(0,x.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})})}}}]);