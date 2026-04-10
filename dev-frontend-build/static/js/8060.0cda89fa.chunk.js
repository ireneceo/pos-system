"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8060],{3705:(e,r,n)=>{n.d(r,{cc:()=>i});var s=n(4752);const i=s.Ay.button`
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
`;s.Ay.select`
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
`,s.Ay.input`
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
`,s.Ay.div`
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
`},7617:(e,r,n)=>{n.d(r,{A:()=>u});n(9950);var s=n(7119),i=n(4752),a=n(9610),t=n(4414);const l=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,o=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,p=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=i.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,c=i.Ay.div`
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
`,u=e=>{let{isOpen:r,title:n,message:i,onConfirm:u,onCancel:h,confirmText:g="Confirm",cancelText:m="Cancel",type:j="warning"}=e;return r?s.createPortal((0,t.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,t.jsxs)(l,{onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)(o,{children:[(0,t.jsx)(p,{children:n}),(0,t.jsx)(d,{children:i})]}),(0,t.jsxs)(c,{children:[(0,t.jsx)(x,{variant:"secondary",onClick:h,children:m}),(0,t.jsx)(x,{variant:"primary",type:j,onClick:u,children:g})]})]})}),document.body):null}},8060:(e,r,n)=>{n.r(r),n.d(r,{default:()=>T});var s=n(9950),i=n(4752),a=n(2853),t=n(8409),l=n(3705),o=n(2488),p=n(1367),d=n(9610),c=n(7617),x=n(5030),u=n(9955),h=n(4414);const g=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,m=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,j=i.Ay.div`
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
`,b=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,y=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,v=i.Ay.span`
  font-size: 12px;
  color: #6B7280;
  margin-left: 8px;
`,f=(i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,i.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4F46E5;
`,i.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
`,i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: ${e=>e.active?"#ECFDF5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
  margin-left: 8px;
`),w=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`,C=i.Ay.div`
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
`,F=i.Ay.button`
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
`,k=i.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,E=i.Ay.p`
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
`,B=i.Ay.div`
  margin-bottom: 32px;
`,P=i.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,$=(i.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
`,i.Ay.label`
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
`,i.Ay.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`,i.Ay.div`
  position: relative;
  display: inline-flex;
`,i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`),z=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,S=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,D=i.Ay.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,L=i.Ay.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`,O=i.Ay.hr`
  border: none;
  border-top: 1px solid #E6EBF1;
  margin: 4px 0;
`,T=()=>{const{t:e}=(0,x.Bd)("suppliers"),{user:r}=(0,p.As)(),n=(null===r||void 0===r?void 0:r.restaurant_id)||(null===r||void 0===r?void 0:r.restaurantId),[i,T]=(0,s.useState)([]),[N,I]=(0,s.useState)([]),[R,Q]=(0,s.useState)([]),[Z,Y]=(0,s.useState)(!0),[M,U]=(0,s.useState)(""),[W,H]=(0,s.useState)(null),[J,V]=(0,s.useState)(!1),[q,G]=(0,s.useState)(!1),[K,X]=(0,s.useState)(null),[ee,re]=(0,s.useState)({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]}),[ne,se]=(0,s.useState)({isOpen:!1,supplierId:null,supplierName:""}),ie="Restaurant Admin"===(null===r||void 0===r?void 0:r.role),ae="Brand General"===(null===r||void 0===r?void 0:r.role)||"Brand Manager"===(null===r||void 0===r?void 0:r.role),te=(0,s.useCallback)(()=>(0,u.c4)(),[]);(0,s.useEffect)(()=>{ae?(le(),oe()):ie&&n?pe():Y(!1)},[ae,ie,n]);const le=async()=>{try{const e=te(),r=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();Q(e)}}catch(e){console.error("Error fetching brands:",e)}},oe=async()=>{const e=te();Y(!0);try{const r=await fetch("/api/suppliers",{headers:{Authorization:`Bearer ${e}`}}),n=await r.json();n.success&&T(n.data)}catch(r){console.error("Failed to fetch suppliers:",r)}finally{Y(!1)}},pe=async()=>{const e=te();Y(!0);try{const r=await fetch(`/api/restaurants/${n}/all-suppliers`,{headers:{Authorization:`Bearer ${e}`}}),s=await r.json();s.success&&(T(s.data.own_suppliers||[]),I(s.data.brand_suppliers||[]))}catch(r){console.error("Failed to fetch suppliers:",r)}finally{Y(!1)}},de=e=>{var r;e?(H(e),re({code:e.code||"",name:e.name,contact_name:e.contact_name||"",phone:e.phone||"",email:e.email||"",address:e.address||"",business_number:e.business_number||"",bank_name:e.bank_name||"",bank_account:e.bank_account||"",payment_terms:e.payment_terms||"",notes:e.notes||"",brand_ids:(null===(r=e.connectedBrands)||void 0===r?void 0:r.map(e=>e.id))||[]})):(H(null),re({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]}));V(!0)},ce=()=>{V(!1),H(null),re({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]})},xe=e=>{X(e),G(!0)},ue=async e=>{if(e.preventDefault(),ee.name.trim())try{const e=te();let r="";const s=W?"PUT":"POST";if(ae?r=W?`/api/suppliers/${W.id}`:"/api/suppliers":ie&&n&&(r=W?`/api/restaurants/${n}/suppliers/${W.id}`:`/api/restaurants/${n}/suppliers`),!r)return;const i=await fetch(r,{method:s,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(ee)}),a=await i.json();a.success?(ce(),ae?oe():pe()):alert(a.error||"Failed to save")}catch(r){console.error("Failed to save supplier:",r),alert("Failed to save")}},he=i.filter(e=>e.name.toLowerCase().includes(M.toLowerCase())||e.code&&e.code.toLowerCase().includes(M.toLowerCase())||e.contact_name&&e.contact_name.toLowerCase().includes(M.toLowerCase())),ge=N.filter(e=>e.name.toLowerCase().includes(M.toLowerCase())||e.code&&e.code.toLowerCase().includes(M.toLowerCase())||e.contact_name&&e.contact_name.toLowerCase().includes(M.toLowerCase())),me=function(r){let s=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,h.jsxs)(j,{isActive:r.is_active,readOnly:s,onClick:()=>s?xe(r):de(r),children:[(0,h.jsxs)(b,{children:[(0,h.jsx)("div",{children:(0,h.jsxs)(y,{children:[r.name,r.code&&(0,h.jsxs)(v,{children:["(",r.code,")"]})]})}),(0,h.jsx)("div",{style:{display:"flex",alignItems:"center"},children:!s&&(0,h.jsx)(f,{active:r.is_active,children:r.is_active?"Active":"Inactive"})})]}),(0,h.jsxs)(w,{children:[r.contact_name&&(0,h.jsxs)(C,{children:[(0,h.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,h.jsx)("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),(0,h.jsx)("circle",{cx:"12",cy:"7",r:"4"})]}),r.contact_name]}),r.phone&&(0,h.jsxs)(C,{children:[(0,h.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,h.jsx)("path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})}),r.phone]}),r.email&&(0,h.jsxs)(C,{children:[(0,h.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,h.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,h.jsx)("polyline",{points:"22,6 12,13 2,6"})]}),r.email]}),r.payment_terms&&(0,h.jsxs)(C,{children:[(0,h.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,h.jsx)("rect",{x:"1",y:"4",width:"22",height:"16",rx:"2",ry:"2"}),(0,h.jsx)("line",{x1:"1",y1:"10",x2:"23",y2:"10"})]}),r.payment_terms]})]}),(0,h.jsxs)(A,{onClick:e=>e.stopPropagation(),children:[(0,h.jsx)(F,{onClick:()=>xe(r),children:e("suppliers:suppliersPage.view")}),!s&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(F,{onClick:()=>(async e=>{try{const r=(0,u.c4)();let s="";if(ae?s=`/api/suppliers/${e.id}`:ie&&n&&(s=`/api/restaurants/${n}/suppliers/${e.id}`),!s)return;(await fetch(s,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({is_active:!e.is_active})})).ok&&(ae?oe():pe())}catch(r){console.error("Toggle active error:",r)}})(r),title:r.is_active?"Deactivate":"Activate",style:{color:r.is_active?"#10B981":"#9CA3AF"},children:(0,h.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:r.is_active?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),(0,h.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]}):(0,h.jsx)("circle",{cx:"12",cy:"12",r:"10"})})}),(0,h.jsx)(F,{onClick:()=>de(r),children:e("suppliers:suppliersPage.edit")}),(0,h.jsx)(F,{variant:"danger",onClick:()=>se({isOpen:!0,supplierId:r.id,supplierName:r.name}),children:"Delete"})]})]})]},r.id)};return!Z||i.length||N.length?(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(t.mc,{children:[(0,h.jsxs)(t.Y9,{children:[(0,h.jsx)(t.hE,{children:e("suppliers:suppliersPage.suppliers")}),(0,h.jsx)(g,{children:(0,h.jsx)(l.cc,{variant:"primary",onClick:()=>de(),children:"Add Supplier"})})]}),(0,h.jsxs)(t.UC,{children:[(0,h.jsx)(_,{children:(0,h.jsx)(o.Qn,{style:{marginBottom:0,flex:1},children:(0,h.jsx)(o.DO,{type:"text",placeholder:"Search suppliers...",value:M,onChange:e=>U(e.target.value)})})}),ie&&ge.length>0&&(0,h.jsxs)(B,{children:[(0,h.jsx)(P,{children:e("suppliers:suppliersPage.brandSuppliersReadOnly")}),(0,h.jsx)(m,{children:ge.map(e=>me(e,!0))})]}),0===i.length&&0===N.length?(0,h.jsxs)(a.pp,{children:[(0,h.jsx)(k,{children:e("suppliers:suppliersPage.noSuppliersYet")}),(0,h.jsxs)(E,{children:["Add suppliers to manage your ingredient sources.",ae&&" You can connect suppliers to multiple brands."]}),(0,h.jsx)(l.cc,{variant:"primary",onClick:()=>de(),children:"Add Supplier"})]}):0!==he.length||ie?(0,h.jsxs)(h.Fragment,{children:[ie&&he.length>0&&(0,h.jsx)(P,{children:e("suppliers:suppliersPage.mySuppliers")}),(0,h.jsx)(m,{children:he.map(e=>{return me(e,(r=e,ie&&"brand"===r.owner_type));var r})})]}):(0,h.jsxs)(a.pp,{children:[(0,h.jsx)(k,{children:e("suppliers:suppliersPage.noSuppliersFound")}),(0,h.jsx)(E,{children:M?"Try adjusting your search":"Add your first supplier"})]})]}),(0,h.jsx)(d.aF,{isOpen:J,onClose:ce,title:W?"Edit Supplier":"New Supplier",size:"large",footer:(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(d.yl,{variant:"secondary",onClick:ce,children:e("suppliers:suppliersPage.cancel")}),(0,h.jsx)(d.yl,{variant:"primary",onClick:ue,disabled:!ee.name.trim(),children:W?"Update":"Create"})]}),children:(0,h.jsxs)("form",{onSubmit:ue,children:[(0,h.jsxs)(d.fh,{children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:"Supplier Name *"}),(0,h.jsx)(d.ZQ,{type:"text",value:ee.name,onChange:e=>re({...ee,name:e.target.value}),placeholder:"Company name",required:!0})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:e("suppliers:suppliersPage.code")}),(0,h.jsx)(d.ZQ,{type:"text",value:ee.code,onChange:e=>re({...ee,code:e.target.value}),placeholder:"Internal code"})]})]}),(0,h.jsxs)(d.fh,{children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:e("suppliers:suppliersPage.contactPerson")}),(0,h.jsx)(d.ZQ,{type:"text",value:ee.contact_name,onChange:e=>re({...ee,contact_name:e.target.value}),placeholder:"Contact name"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:e("suppliers:suppliersPage.phone")}),(0,h.jsx)(d.ZQ,{type:"text",value:ee.phone,onChange:e=>re({...ee,phone:e.target.value}),placeholder:"Phone number"})]})]}),(0,h.jsxs)(d.fh,{children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:e("suppliers:suppliersPage.email")}),(0,h.jsx)(d.ZQ,{type:"email",value:ee.email,onChange:e=>re({...ee,email:e.target.value}),placeholder:"Email address"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:e("suppliers:suppliersPage.businessNumber")}),(0,h.jsx)(d.ZQ,{type:"text",value:ee.business_number,onChange:e=>re({...ee,business_number:e.target.value}),placeholder:"Business registration number"})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:e("suppliers:suppliersPage.address")}),(0,h.jsx)(d.ZQ,{type:"text",value:ee.address,onChange:e=>re({...ee,address:e.target.value}),placeholder:"Full address"})]}),(0,h.jsx)(d.fh,{children:(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:e("suppliers:suppliersPage.paymentTerms")}),(0,h.jsx)(d.ZQ,{type:"text",value:ee.payment_terms,onChange:e=>re({...ee,payment_terms:e.target.value}),placeholder:"e.g., Net 30, COD"})]})}),(0,h.jsxs)(d.fh,{children:[(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:e("suppliers:suppliersPage.bankName")}),(0,h.jsx)(d.ZQ,{type:"text",value:ee.bank_name,onChange:e=>re({...ee,bank_name:e.target.value}),placeholder:"Bank name"})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:e("suppliers:suppliersPage.bankAccount")}),(0,h.jsx)(d.ZQ,{type:"text",value:ee.bank_account,onChange:e=>re({...ee,bank_account:e.target.value}),placeholder:"Account number"})]})]}),(0,h.jsxs)(d.gE,{children:[(0,h.jsx)(d.lR,{children:e("suppliers:suppliersPage.notes")}),(0,h.jsx)(d.Lz,{value:ee.notes,onChange:e=>re({...ee,notes:e.target.value}),placeholder:"Additional notes...",rows:3})]})]})}),(0,h.jsx)(d.aF,{isOpen:q,onClose:()=>{G(!1),X(null)},title:"Supplier Details",size:"large",footer:(0,h.jsx)(d.yl,{variant:"secondary",onClick:()=>{G(!1),X(null)},children:e("suppliers:suppliersPage.close")}),children:K&&(0,h.jsxs)($,{children:[(0,h.jsxs)(z,{children:[(0,h.jsxs)(S,{children:[(0,h.jsx)(D,{children:e("suppliers:suppliersPage.supplierName")}),(0,h.jsx)(L,{children:K.name})]}),(0,h.jsxs)(S,{children:[(0,h.jsx)(D,{children:e("suppliers:suppliersPage.code")}),(0,h.jsx)(L,{children:K.code||"-"})]})]}),(0,h.jsx)(O,{}),(0,h.jsxs)(z,{children:[(0,h.jsxs)(S,{children:[(0,h.jsx)(D,{children:e("suppliers:suppliersPage.contactPerson")}),(0,h.jsx)(L,{children:K.contact_name||"-"})]}),(0,h.jsxs)(S,{children:[(0,h.jsx)(D,{children:e("suppliers:suppliersPage.phone")}),(0,h.jsx)(L,{children:K.phone||"-"})]})]}),(0,h.jsxs)(z,{children:[(0,h.jsxs)(S,{children:[(0,h.jsx)(D,{children:e("suppliers:suppliersPage.email")}),(0,h.jsx)(L,{children:K.email||"-"})]}),(0,h.jsxs)(S,{children:[(0,h.jsx)(D,{children:e("suppliers:suppliersPage.businessNumber")}),(0,h.jsx)(L,{children:K.business_number||"-"})]})]}),(0,h.jsx)(O,{}),(0,h.jsxs)(S,{children:[(0,h.jsx)(D,{children:e("suppliers:suppliersPage.address")}),(0,h.jsx)(L,{children:K.address||"-"})]}),(0,h.jsxs)(z,{children:[(0,h.jsxs)(S,{children:[(0,h.jsx)(D,{children:e("suppliers:suppliersPage.paymentTerms")}),(0,h.jsx)(L,{children:K.payment_terms||"-"})]}),(0,h.jsxs)(S,{children:[(0,h.jsx)(D,{children:e("suppliers:suppliersPage.status")}),(0,h.jsx)(L,{children:(0,h.jsx)(f,{active:K.is_active,style:{marginLeft:0},children:K.is_active?"Active":"Inactive"})})]})]}),(0,h.jsx)(O,{}),(0,h.jsxs)(z,{children:[(0,h.jsxs)(S,{children:[(0,h.jsx)(D,{children:e("suppliers:suppliersPage.bankName")}),(0,h.jsx)(L,{children:K.bank_name||"-"})]}),(0,h.jsxs)(S,{children:[(0,h.jsx)(D,{children:e("suppliers:suppliersPage.bankAccount")}),(0,h.jsx)(L,{children:K.bank_account||"-"})]})]}),K.notes&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(O,{}),(0,h.jsxs)(S,{children:[(0,h.jsx)(D,{children:e("suppliers:suppliersPage.notes")}),(0,h.jsx)(L,{style:{whiteSpace:"pre-wrap"},children:K.notes})]})]})]})}),(0,h.jsx)(c.A,{isOpen:ne.isOpen,onCancel:()=>se({isOpen:!1,supplierId:null,supplierName:""}),onConfirm:async()=>{if(ne.supplierId)try{const e=te();let r="";if(ae?r=`/api/suppliers/${ne.supplierId}`:ie&&n&&(r=`/api/restaurants/${n}/suppliers/${ne.supplierId}`),!r)return;const s=await fetch(r,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await s.json();i.success?(se({isOpen:!1,supplierId:null,supplierName:""}),ae?oe():pe()):alert(i.error||"Failed to delete")}catch(e){console.error("Failed to delete supplier:",e),alert("Failed to delete")}},title:"Delete Supplier",message:`Are you sure you want to delete "${ne.supplierName}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}):(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(t.mc,{children:[(0,h.jsx)(t.Y9,{children:(0,h.jsx)(t.hE,{children:e("suppliers:suppliersPage.suppliers")})}),(0,h.jsx)(t.UC,{children:(0,h.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})})}}}]);