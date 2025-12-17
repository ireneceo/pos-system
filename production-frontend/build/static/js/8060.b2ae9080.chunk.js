"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8060],{2488:(e,r,n)=>{n.d(r,{DO:()=>d,Jt:()=>p,Qn:()=>l});n(9950);var a=n(4752),t=n(4414);const i=a.Ay.div`
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
`,s=a.Ay.select`
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
`,l=e=>{let{children:r,className:n,style:a,...o}=e;return(0,t.jsx)(i,{className:n,style:a,...o,children:r})},d=e=>{let{placeholder:r="Search...",...n}=e;return(0,t.jsx)(o,{placeholder:r,...n})},p=e=>{let{children:r,...n}=e;return(0,t.jsx)(s,{...n,children:r})}},3705:(e,r,n)=>{n.d(r,{cc:()=>t});var a=n(4752);const t=a.Ay.button`
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
`},7617:(e,r,n)=>{n.d(r,{A:()=>x});n(9950);var a=n(4752),t=n(9610),i=n(4414);const o=a.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=a.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=a.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=a.Ay.p`
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
`,x=e=>{let{isOpen:r,title:n,message:a,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:m="Cancel",type:g="warning"}=e;return r?(0,i.jsx)(t.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,i.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(s,{children:[(0,i.jsx)(l,{children:n}),(0,i.jsx)(d,{children:a})]}),(0,i.jsxs)(p,{children:[(0,i.jsx)(c,{variant:"secondary",onClick:h,children:m}),(0,i.jsx)(c,{variant:"primary",type:g,onClick:x,children:u})]})]})}):null}},8060:(e,r,n)=>{n.r(r),n.d(r,{default:()=>S});var a=n(9950),t=n(4752),i=n(3310),o=n(7492),s=n(3705),l=n(2488),d=n(1367),p=n(9610),c=n(7617),x=n(4414);const h=t.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,u=t.Ay.select`
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
`,m=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,g=t.Ay.div`
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
`,b=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,y=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,f=t.Ay.span`
  font-size: 12px;
  color: #6B7280;
  margin-left: 8px;
`,v=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
`,j=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
  margin-left: 8px;
`,w=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`,C=t.Ay.div`
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
`,A=t.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
`,E=t.Ay.button`
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
`,F=t.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,k=t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,B=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,_=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,$=t.Ay.div`
  margin-bottom: 32px;
`,z=t.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,S=()=>{const{user:e}=(0,d.As)(),r=(null===e||void 0===e?void 0:e.restaurant_id)||(null===e||void 0===e?void 0:e.restaurantId),[n,t]=(0,a.useState)([]),[S,D]=(0,a.useState)([]),[L,N]=(0,a.useState)([]),[O,I]=(0,a.useState)(null),[T,R]=(0,a.useState)(!0),[Q,Z]=(0,a.useState)(""),[P,Y]=(0,a.useState)(null),[M,U]=(0,a.useState)(!1),[W,H]=(0,a.useState)({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_info:"",payment_terms:"",notes:""}),[J,q]=(0,a.useState)({isOpen:!1,supplierId:null,supplierName:""}),G="Restaurant Admin"===(null===e||void 0===e?void 0:e.role),V="Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role),K=(0,a.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,a.useEffect)(()=>{V?X():R(!1)},[V]),(0,a.useEffect)(()=>{(V&&O||G&&r)&&ee()},[O,r,V,G]);const X=async()=>{try{const e=K(),r=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();N(e),e.length>0&&I(e[0].id)}}catch(e){console.error("Error fetching brands:",e)}finally{R(!1)}},ee=async()=>{const e=K();R(!0);try{if(V&&O){const r=await fetch(`/api/brands/${O}/suppliers`,{headers:{Authorization:`Bearer ${e}`}}),n=await r.json();n.success&&t(n.data)}else if(G&&r){const n=await fetch(`/api/restaurants/${r}/all-suppliers`,{headers:{Authorization:`Bearer ${e}`}}),a=await n.json();a.success&&(t(a.data.own_suppliers||[]),D(a.data.brand_suppliers||[]))}}catch(n){console.error("Failed to fetch suppliers:",n)}finally{R(!1)}},re=e=>{e?(Y(e),H({code:e.code||"",name:e.name,contact_name:e.contact_name||"",phone:e.phone||"",email:e.email||"",address:e.address||"",business_number:e.business_number||"",bank_info:e.bank_info||"",payment_terms:e.payment_terms||"",notes:e.notes||""})):(Y(null),H({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_info:"",payment_terms:"",notes:""})),U(!0)},ne=()=>{U(!1),Y(null),H({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_info:"",payment_terms:"",notes:""})},ae=async e=>{if(e.preventDefault(),W.name.trim())try{const e=K();let n="";const a=P?"PUT":"POST";if(V&&O?n=P?`/api/brands/${O}/suppliers/${P.id}`:`/api/brands/${O}/suppliers`:G&&r&&(n=P?`/api/restaurants/${r}/suppliers/${P.id}`:`/api/restaurants/${r}/suppliers`),!n)return;const t=await fetch(n,{method:a,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(W)}),i=await t.json();i.success?(ne(),ee()):alert(i.error||"Failed to save")}catch(n){console.error("Failed to save supplier:",n),alert("Failed to save")}},te=n.filter(e=>e.name.toLowerCase().includes(Q.toLowerCase())||e.code&&e.code.toLowerCase().includes(Q.toLowerCase())||e.contact_name&&e.contact_name.toLowerCase().includes(Q.toLowerCase())),ie=S.filter(e=>e.name.toLowerCase().includes(Q.toLowerCase())||e.code&&e.code.toLowerCase().includes(Q.toLowerCase())||e.contact_name&&e.contact_name.toLowerCase().includes(Q.toLowerCase())),oe=function(e){let r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,x.jsxs)(g,{isActive:e.is_active,readOnly:r,onClick:()=>!r&&re(e),children:[(0,x.jsxs)(b,{children:[(0,x.jsx)("div",{children:(0,x.jsxs)(y,{children:[e.name,e.code&&(0,x.jsxs)(f,{children:["(",e.code,")"]})]})}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[r&&(0,x.jsx)(v,{children:"Brand"}),!r&&(0,x.jsx)(j,{active:e.is_active,children:e.is_active?"Active":"Inactive"})]})]}),(0,x.jsxs)(w,{children:[e.contact_name&&(0,x.jsxs)(C,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),(0,x.jsx)("circle",{cx:"12",cy:"7",r:"4"})]}),e.contact_name]}),e.phone&&(0,x.jsxs)(C,{children:[(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})}),e.phone]}),e.email&&(0,x.jsxs)(C,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,x.jsx)("polyline",{points:"22,6 12,13 2,6"})]}),e.email]}),e.payment_terms&&(0,x.jsxs)(C,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("rect",{x:"1",y:"4",width:"22",height:"16",rx:"2",ry:"2"}),(0,x.jsx)("line",{x1:"1",y1:"10",x2:"23",y2:"10"})]}),e.payment_terms]})]}),!r&&(0,x.jsxs)(A,{onClick:e=>e.stopPropagation(),children:[(0,x.jsx)(E,{onClick:()=>re(e),children:"Edit"}),(0,x.jsx)(E,{variant:"danger",onClick:()=>q({isOpen:!0,supplierId:e.id,supplierName:e.name}),children:"Delete"})]})]},e.id)};return!T||n.length||S.length?(0,x.jsx)(i.A,{children:(0,x.jsxs)(o.mc,{children:[(0,x.jsxs)(o.Y9,{children:[(0,x.jsx)(o.hE,{children:"Suppliers"}),V&&L.length>0&&(0,x.jsx)(h,{children:(0,x.jsx)(u,{value:O||"",onChange:e=>I(Number(e.target.value)),children:L.map(e=>(0,x.jsx)("option",{value:e.id,children:e.name},e.id))})})]}),(0,x.jsxs)(o.UC,{children:[(0,x.jsxs)(_,{children:[(0,x.jsx)(l.Qn,{style:{marginBottom:0,flex:1},children:(0,x.jsx)(l.DO,{type:"text",placeholder:"Search suppliers...",value:Q,onChange:e=>Z(e.target.value)})}),(0,x.jsx)(s.cc,{variant:"primary",onClick:()=>re(),children:"Add Supplier"})]}),G&&ie.length>0&&(0,x.jsxs)($,{children:[(0,x.jsx)(z,{children:"Brand Suppliers (Read Only)"}),(0,x.jsx)(m,{children:ie.map(e=>oe(e,!0))})]}),0===n.length&&0===S.length?(0,x.jsxs)(F,{children:[(0,x.jsx)(k,{children:"No suppliers yet"}),(0,x.jsx)(B,{children:"Add suppliers to manage your ingredient sources"}),(0,x.jsx)(s.cc,{variant:"primary",onClick:()=>re(),children:"Add Supplier"})]}):0!==te.length||G?(0,x.jsxs)(x.Fragment,{children:[G&&te.length>0&&(0,x.jsx)(z,{children:"My Suppliers"}),(0,x.jsx)(m,{children:te.map(e=>{return oe(e,(r=e,G&&"brand"===r.owner_type));var r})})]}):(0,x.jsxs)(F,{children:[(0,x.jsx)(k,{children:"No suppliers found"}),(0,x.jsx)(B,{children:Q?"Try adjusting your search":"Add your first supplier"})]})]}),(0,x.jsx)(p.aF,{isOpen:M,onClose:ne,title:P?"Edit Supplier":"New Supplier",size:"large",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(p.yl,{variant:"secondary",onClick:ne,children:"Cancel"}),(0,x.jsx)(p.yl,{variant:"primary",onClick:ae,disabled:!W.name.trim(),children:P?"Update":"Create"})]}),children:(0,x.jsxs)("form",{onSubmit:ae,children:[(0,x.jsxs)(p.fh,{children:[(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Supplier Name *"}),(0,x.jsx)(p.ZQ,{type:"text",value:W.name,onChange:e=>H({...W,name:e.target.value}),placeholder:"Company name",required:!0})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Code"}),(0,x.jsx)(p.ZQ,{type:"text",value:W.code,onChange:e=>H({...W,code:e.target.value}),placeholder:"Internal code"})]})]}),(0,x.jsxs)(p.fh,{children:[(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Contact Person"}),(0,x.jsx)(p.ZQ,{type:"text",value:W.contact_name,onChange:e=>H({...W,contact_name:e.target.value}),placeholder:"Contact name"})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Phone"}),(0,x.jsx)(p.ZQ,{type:"text",value:W.phone,onChange:e=>H({...W,phone:e.target.value}),placeholder:"Phone number"})]})]}),(0,x.jsxs)(p.fh,{children:[(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Email"}),(0,x.jsx)(p.ZQ,{type:"email",value:W.email,onChange:e=>H({...W,email:e.target.value}),placeholder:"Email address"})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Business Number"}),(0,x.jsx)(p.ZQ,{type:"text",value:W.business_number,onChange:e=>H({...W,business_number:e.target.value}),placeholder:"Business registration number"})]})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Address"}),(0,x.jsx)(p.ZQ,{type:"text",value:W.address,onChange:e=>H({...W,address:e.target.value}),placeholder:"Full address"})]}),(0,x.jsxs)(p.fh,{children:[(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Payment Terms"}),(0,x.jsx)(p.ZQ,{type:"text",value:W.payment_terms,onChange:e=>H({...W,payment_terms:e.target.value}),placeholder:"e.g., Net 30, COD"})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Bank Info"}),(0,x.jsx)(p.ZQ,{type:"text",value:W.bank_info,onChange:e=>H({...W,bank_info:e.target.value}),placeholder:"Bank account details"})]})]}),(0,x.jsxs)(p.gE,{children:[(0,x.jsx)(p.lR,{children:"Notes"}),(0,x.jsx)(p.Lz,{value:W.notes,onChange:e=>H({...W,notes:e.target.value}),placeholder:"Additional notes...",rows:3})]})]})}),(0,x.jsx)(c.A,{isOpen:J.isOpen,onCancel:()=>q({isOpen:!1,supplierId:null,supplierName:""}),onConfirm:async()=>{if(J.supplierId)try{const e=K();let n="";if(V&&O?n=`/api/brands/${O}/suppliers/${J.supplierId}`:G&&r&&(n=`/api/restaurants/${r}/suppliers/${J.supplierId}`),!n)return;const a=await fetch(n,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),t=await a.json();t.success?(q({isOpen:!1,supplierId:null,supplierName:""}),ee()):alert(t.error||"Failed to delete")}catch(e){console.error("Failed to delete supplier:",e),alert("Failed to delete")}},title:"Delete Supplier",message:`Are you sure you want to delete "${J.supplierName}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}):(0,x.jsx)(i.A,{children:(0,x.jsxs)(o.mc,{children:[(0,x.jsx)(o.Y9,{children:(0,x.jsx)(o.hE,{children:"Suppliers"})}),(0,x.jsx)(o.UC,{children:(0,x.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})})}}}]);