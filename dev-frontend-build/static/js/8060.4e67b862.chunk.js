"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8060],{2488:(e,n,r)=>{r.d(n,{DO:()=>p,Jt:()=>x,Qn:()=>c});r(9950);var i=r(4752),a=r(4414);const t=i.Ay.div`
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
`,o=i.Ay.div`
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
`,l=i.Ay.button`
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
`,d=i.Ay.select`
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
`,c=e=>{let{children:n,className:r,style:i,...s}=e;return(0,a.jsx)(t,{className:r,style:i,...s,children:n})},p=e=>{let{placeholder:n="Search...",value:r,onChange:i,style:t,...d}=e;return(0,a.jsxs)(o,{style:t,children:[(0,a.jsx)(s,{placeholder:n,value:r,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:r?"36px":"16px"},...d}),r&&(0,a.jsx)(l,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,a.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,a.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,a.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:n,...r}=e;return(0,a.jsx)(d,{...r,children:n})}},3705:(e,n,r)=>{r.d(n,{cc:()=>a});var i=r(4752);const a=i.Ay.button`
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
`},7617:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var i=r(4752),a=r(9610),t=r(4414);const s=i.Ay.div`
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
`,l=i.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=i.Ay.p`
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
`,x=e=>{let{isOpen:n,title:r,message:i,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:m="Cancel",type:g="warning"}=e;return n?(0,t.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,t.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)(o,{children:[(0,t.jsx)(l,{children:r}),(0,t.jsx)(d,{children:i})]}),(0,t.jsxs)(c,{children:[(0,t.jsx)(p,{variant:"secondary",onClick:h,children:m}),(0,t.jsx)(p,{variant:"primary",type:g,onClick:x,children:u})]})]})}):null}},8060:(e,n,r)=>{r.r(n),r.d(n,{default:()=>N});var i=r(9950),a=r(4752),t=r(2853),s=r(8409),o=r(3705),l=r(2488),d=r(1367),c=r(9610),p=r(7617),x=r(4414);const h=a.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,u=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,m=a.Ay.div`
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
`,g=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,j=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,b=a.Ay.span`
  font-size: 12px;
  color: #6B7280;
  margin-left: 8px;
`,y=(a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,a.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4F46E5;
`,a.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
`,a.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: ${e=>e.active?"#ECFDF5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
  margin-left: 8px;
`),f=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`,v=a.Ay.div`
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
`,w=a.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
`,C=a.Ay.button`
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
`,A=a.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,k=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`,F=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,E=a.Ay.div`
  margin-bottom: 32px;
`,B=a.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,_=(a.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
`,a.Ay.label`
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
`,a.Ay.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`,a.Ay.div`
  position: relative;
  display: inline-flex;
`,a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`),z=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,$=a.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,S=a.Ay.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,D=a.Ay.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`,L=a.Ay.hr`
  border: none;
  border-top: 1px solid #E6EBF1;
  margin: 4px 0;
`,N=()=>{const{user:e}=(0,d.As)(),n=(null===e||void 0===e?void 0:e.restaurant_id)||(null===e||void 0===e?void 0:e.restaurantId),[r,a]=(0,i.useState)([]),[N,O]=(0,i.useState)([]),[T,I]=(0,i.useState)([]),[R,P]=(0,i.useState)(!0),[Q,Z]=(0,i.useState)(""),[W,Y]=(0,i.useState)(null),[M,U]=(0,i.useState)(!1),[H,J]=(0,i.useState)(!1),[V,q]=(0,i.useState)(null),[G,K]=(0,i.useState)({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]}),[X,ee]=(0,i.useState)({isOpen:!1,supplierId:null,supplierName:""}),ne="Restaurant Admin"===(null===e||void 0===e?void 0:e.role),re="Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role),ie=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,i.useEffect)(()=>{re?(ae(),te()):ne&&n?se():P(!1)},[re,ne,n]);const ae=async()=>{try{const e=ie(),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();I(e)}}catch(e){console.error("Error fetching brands:",e)}},te=async()=>{const e=ie();P(!0);try{const n=await fetch("/api/suppliers",{headers:{Authorization:`Bearer ${e}`}}),r=await n.json();r.success&&a(r.data)}catch(n){console.error("Failed to fetch suppliers:",n)}finally{P(!1)}},se=async()=>{const e=ie();P(!0);try{const r=await fetch(`/api/restaurants/${n}/all-suppliers`,{headers:{Authorization:`Bearer ${e}`}}),i=await r.json();i.success&&(a(i.data.own_suppliers||[]),O(i.data.brand_suppliers||[]))}catch(r){console.error("Failed to fetch suppliers:",r)}finally{P(!1)}},oe=e=>{var n;e?(Y(e),K({code:e.code||"",name:e.name,contact_name:e.contact_name||"",phone:e.phone||"",email:e.email||"",address:e.address||"",business_number:e.business_number||"",bank_name:e.bank_name||"",bank_account:e.bank_account||"",payment_terms:e.payment_terms||"",notes:e.notes||"",brand_ids:(null===(n=e.connectedBrands)||void 0===n?void 0:n.map(e=>e.id))||[]})):(Y(null),K({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]}));U(!0)},le=()=>{U(!1),Y(null),K({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]})},de=e=>{q(e),J(!0)},ce=async e=>{if(e.preventDefault(),G.name.trim())try{const e=ie();let r="";const i=W?"PUT":"POST";if(re?r=W?`/api/suppliers/${W.id}`:"/api/suppliers":ne&&n&&(r=W?`/api/restaurants/${n}/suppliers/${W.id}`:`/api/restaurants/${n}/suppliers`),!r)return;const a=await fetch(r,{method:i,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(G)}),t=await a.json();t.success?(le(),re?te():se()):alert(t.error||"Failed to save")}catch(r){console.error("Failed to save supplier:",r),alert("Failed to save")}},pe=r.filter(e=>e.name.toLowerCase().includes(Q.toLowerCase())||e.code&&e.code.toLowerCase().includes(Q.toLowerCase())||e.contact_name&&e.contact_name.toLowerCase().includes(Q.toLowerCase())),xe=N.filter(e=>e.name.toLowerCase().includes(Q.toLowerCase())||e.code&&e.code.toLowerCase().includes(Q.toLowerCase())||e.contact_name&&e.contact_name.toLowerCase().includes(Q.toLowerCase())),he=function(e){let r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,x.jsxs)(m,{isActive:e.is_active,readOnly:r,onClick:()=>r?de(e):oe(e),children:[(0,x.jsxs)(g,{children:[(0,x.jsx)("div",{children:(0,x.jsxs)(j,{children:[e.name,e.code&&(0,x.jsxs)(b,{children:["(",e.code,")"]})]})}),(0,x.jsx)("div",{style:{display:"flex",alignItems:"center"},children:!r&&(0,x.jsx)(y,{active:e.is_active,children:e.is_active?"Active":"Inactive"})})]}),(0,x.jsxs)(f,{children:[e.contact_name&&(0,x.jsxs)(v,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),(0,x.jsx)("circle",{cx:"12",cy:"7",r:"4"})]}),e.contact_name]}),e.phone&&(0,x.jsxs)(v,{children:[(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})}),e.phone]}),e.email&&(0,x.jsxs)(v,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,x.jsx)("polyline",{points:"22,6 12,13 2,6"})]}),e.email]}),e.payment_terms&&(0,x.jsxs)(v,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("rect",{x:"1",y:"4",width:"22",height:"16",rx:"2",ry:"2"}),(0,x.jsx)("line",{x1:"1",y1:"10",x2:"23",y2:"10"})]}),e.payment_terms]})]}),(0,x.jsxs)(w,{onClick:e=>e.stopPropagation(),children:[(0,x.jsx)(C,{onClick:()=>de(e),children:"View"}),!r&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(C,{onClick:()=>(async e=>{try{const r=localStorage.getItem("auth_token");let i="";if(re&&selectedBrand?i=`/api/brands/${selectedBrand}/suppliers/${e.id}`:ne&&n&&(i=`/api/restaurants/${n}/suppliers/${e.id}`),!i)return;(await fetch(i,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({is_active:!e.is_active})})).ok&&(re?te():se())}catch(r){console.error("Toggle active error:",r)}})(e),title:e.is_active?"Deactivate":"Activate",style:{color:e.is_active?"#10B981":"#9CA3AF"},children:(0,x.jsx)("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.is_active?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),(0,x.jsx)("polyline",{points:"22 4 12 14.01 9 11.01"})]}):(0,x.jsx)("circle",{cx:"12",cy:"12",r:"10"})})}),(0,x.jsx)(C,{onClick:()=>oe(e),children:"Edit"}),(0,x.jsx)(C,{variant:"danger",onClick:()=>ee({isOpen:!0,supplierId:e.id,supplierName:e.name}),children:"Delete"})]})]})]},e.id)};return!R||r.length||N.length?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(s.mc,{children:[(0,x.jsxs)(s.Y9,{children:[(0,x.jsx)(s.hE,{children:"Suppliers"}),(0,x.jsx)(h,{children:(0,x.jsx)(o.cc,{variant:"primary",onClick:()=>oe(),children:"Add Supplier"})})]}),(0,x.jsxs)(s.UC,{children:[(0,x.jsx)(F,{children:(0,x.jsx)(l.Qn,{style:{marginBottom:0,flex:1},children:(0,x.jsx)(l.DO,{type:"text",placeholder:"Search suppliers...",value:Q,onChange:e=>Z(e.target.value)})})}),ne&&xe.length>0&&(0,x.jsxs)(E,{children:[(0,x.jsx)(B,{children:"Brand Suppliers (Read Only)"}),(0,x.jsx)(u,{children:xe.map(e=>he(e,!0))})]}),0===r.length&&0===N.length?(0,x.jsxs)(t.pp,{children:[(0,x.jsx)(A,{children:"No suppliers yet"}),(0,x.jsxs)(k,{children:["Add suppliers to manage your ingredient sources.",re&&" You can connect suppliers to multiple brands."]}),(0,x.jsx)(o.cc,{variant:"primary",onClick:()=>oe(),children:"Add Supplier"})]}):0!==pe.length||ne?(0,x.jsxs)(x.Fragment,{children:[ne&&pe.length>0&&(0,x.jsx)(B,{children:"My Suppliers"}),(0,x.jsx)(u,{children:pe.map(e=>{return he(e,(n=e,ne&&"brand"===n.owner_type));var n})})]}):(0,x.jsxs)(t.pp,{children:[(0,x.jsx)(A,{children:"No suppliers found"}),(0,x.jsx)(k,{children:Q?"Try adjusting your search":"Add your first supplier"})]})]}),(0,x.jsx)(c.aF,{isOpen:M,onClose:le,title:W?"Edit Supplier":"New Supplier",size:"large",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c.yl,{variant:"secondary",onClick:le,children:"Cancel"}),(0,x.jsx)(c.yl,{variant:"primary",onClick:ce,disabled:!G.name.trim(),children:W?"Update":"Create"})]}),children:(0,x.jsxs)("form",{onSubmit:ce,children:[(0,x.jsxs)(c.fh,{children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Supplier Name *"}),(0,x.jsx)(c.ZQ,{type:"text",value:G.name,onChange:e=>K({...G,name:e.target.value}),placeholder:"Company name",required:!0})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Code"}),(0,x.jsx)(c.ZQ,{type:"text",value:G.code,onChange:e=>K({...G,code:e.target.value}),placeholder:"Internal code"})]})]}),(0,x.jsxs)(c.fh,{children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Contact Person"}),(0,x.jsx)(c.ZQ,{type:"text",value:G.contact_name,onChange:e=>K({...G,contact_name:e.target.value}),placeholder:"Contact name"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Phone"}),(0,x.jsx)(c.ZQ,{type:"text",value:G.phone,onChange:e=>K({...G,phone:e.target.value}),placeholder:"Phone number"})]})]}),(0,x.jsxs)(c.fh,{children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Email"}),(0,x.jsx)(c.ZQ,{type:"email",value:G.email,onChange:e=>K({...G,email:e.target.value}),placeholder:"Email address"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Business Number"}),(0,x.jsx)(c.ZQ,{type:"text",value:G.business_number,onChange:e=>K({...G,business_number:e.target.value}),placeholder:"Business registration number"})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Address"}),(0,x.jsx)(c.ZQ,{type:"text",value:G.address,onChange:e=>K({...G,address:e.target.value}),placeholder:"Full address"})]}),(0,x.jsx)(c.fh,{children:(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Payment Terms"}),(0,x.jsx)(c.ZQ,{type:"text",value:G.payment_terms,onChange:e=>K({...G,payment_terms:e.target.value}),placeholder:"e.g., Net 30, COD"})]})}),(0,x.jsxs)(c.fh,{children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Bank Name"}),(0,x.jsx)(c.ZQ,{type:"text",value:G.bank_name,onChange:e=>K({...G,bank_name:e.target.value}),placeholder:"Bank name"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Bank Account"}),(0,x.jsx)(c.ZQ,{type:"text",value:G.bank_account,onChange:e=>K({...G,bank_account:e.target.value}),placeholder:"Account number"})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Notes"}),(0,x.jsx)(c.Lz,{value:G.notes,onChange:e=>K({...G,notes:e.target.value}),placeholder:"Additional notes...",rows:3})]})]})}),(0,x.jsx)(c.aF,{isOpen:H,onClose:()=>{J(!1),q(null)},title:"Supplier Details",size:"large",footer:(0,x.jsx)(c.yl,{variant:"secondary",onClick:()=>{J(!1),q(null)},children:"Close"}),children:V&&(0,x.jsxs)(_,{children:[(0,x.jsxs)(z,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"Supplier Name"}),(0,x.jsx)(D,{children:V.name})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"Code"}),(0,x.jsx)(D,{children:V.code||"-"})]})]}),(0,x.jsx)(L,{}),(0,x.jsxs)(z,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"Contact Person"}),(0,x.jsx)(D,{children:V.contact_name||"-"})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"Phone"}),(0,x.jsx)(D,{children:V.phone||"-"})]})]}),(0,x.jsxs)(z,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"Email"}),(0,x.jsx)(D,{children:V.email||"-"})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"Business Number"}),(0,x.jsx)(D,{children:V.business_number||"-"})]})]}),(0,x.jsx)(L,{}),(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"Address"}),(0,x.jsx)(D,{children:V.address||"-"})]}),(0,x.jsxs)(z,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"Payment Terms"}),(0,x.jsx)(D,{children:V.payment_terms||"-"})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"Status"}),(0,x.jsx)(D,{children:(0,x.jsx)(y,{active:V.is_active,style:{marginLeft:0},children:V.is_active?"Active":"Inactive"})})]})]}),(0,x.jsx)(L,{}),(0,x.jsxs)(z,{children:[(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"Bank Name"}),(0,x.jsx)(D,{children:V.bank_name||"-"})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"Bank Account"}),(0,x.jsx)(D,{children:V.bank_account||"-"})]})]}),V.notes&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(L,{}),(0,x.jsxs)($,{children:[(0,x.jsx)(S,{children:"Notes"}),(0,x.jsx)(D,{style:{whiteSpace:"pre-wrap"},children:V.notes})]})]})]})}),(0,x.jsx)(p.A,{isOpen:X.isOpen,onCancel:()=>ee({isOpen:!1,supplierId:null,supplierName:""}),onConfirm:async()=>{if(X.supplierId)try{const e=ie();let r="";if(re?r=`/api/suppliers/${X.supplierId}`:ne&&n&&(r=`/api/restaurants/${n}/suppliers/${X.supplierId}`),!r)return;const i=await fetch(r,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),a=await i.json();a.success?(ee({isOpen:!1,supplierId:null,supplierName:""}),re?te():se()):alert(a.error||"Failed to delete")}catch(e){console.error("Failed to delete supplier:",e),alert("Failed to delete")}},title:"Delete Supplier",message:`Are you sure you want to delete "${X.supplierName}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}):(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(s.mc,{children:[(0,x.jsx)(s.Y9,{children:(0,x.jsx)(s.hE,{children:"Suppliers"})}),(0,x.jsx)(s.UC,{children:(0,x.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})})}}}]);