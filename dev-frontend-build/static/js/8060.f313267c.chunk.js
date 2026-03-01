"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8060],{2488:(e,r,n)=>{n.d(r,{DO:()=>c,Jt:()=>p,Qn:()=>l});var a=n(8819),i=(n(9950),n(4752)),o=n(4414);const t=i.Ay.div`
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
  border: 1px solid ${a.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${a.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
    box-shadow: 0 0 0 3px ${a.w.colors.primaryLight};
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
  border: 1px solid ${a.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
    box-shadow: 0 0 0 3px ${a.w.colors.primaryLight};
  }

  &:disabled {
    background: ${a.w.colors.surfaceHover};
    color: ${a.w.colors.text.muted};
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
`,l=e=>{let{children:r,className:n,style:a,...i}=e;return(0,o.jsx)(t,{className:n,style:a,...i,children:r})},c=e=>{let{placeholder:r="Search...",...n}=e;return(0,o.jsx)(s,{placeholder:r,...n})},p=e=>{let{children:r,...n}=e;return(0,o.jsx)(d,{...n,children:r})}},3705:(e,r,n)=>{n.d(r,{cc:()=>o.$n});var a=n(8819),i=n(4752),o=n(8829);i.Ay.select`
  padding: ${a.w.components.form.inputPadding};
  border: 1px solid ${a.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${a.w.typography.fontSize.sm};
  background: ${a.w.colors.surface};
  color: ${a.w.colors.text.dark};
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
    box-shadow: ${a.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${a.w.colors.borderHover};
  }
`,i.Ay.input`
  padding: ${a.w.components.form.inputPadding};
  border: 1px solid ${a.w.colors.borderLight};
  border-radius: 6px;
  font-size: ${a.w.typography.fontSize.sm};
  background: ${a.w.colors.surface};
  color: ${a.w.colors.text.dark};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
    box-shadow: ${a.w.components.form.focusShadow};
  }

  &:hover {
    border-color: ${a.w.colors.borderHover};
  }
`,i.Ay.div`
  background: ${a.w.colors.surface};
  border-radius: ${a.w.borderRadius.md};
  border: 1px solid ${a.w.colors.borderLight};
  padding: ${a.w.spacing.md};
  transition: all 0.2s ease;

  ${e=>e.accent&&`\n    border-color: ${a.w.colors.primary};\n    box-shadow: 0 4px 6px -1px ${a.w.colors.primaryLight};\n  `}

  &:hover {
    border-color: ${a.w.colors.borderHover};
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},7617:(e,r,n)=>{n.d(r,{A:()=>h});var a=n(8819),i=(n(9950),n(4752)),o=n(9610),t=n(4414);const s=i.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,d=i.Ay.div`
  padding: 24px;
  border-bottom: 1px solid ${a.w.colors.border};
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
`,h=e=>{let{isOpen:r,title:n,message:a,onConfirm:i,onCancel:h,confirmText:u="Confirm",cancelText:m="Cancel",type:g="warning"}=e;return r?(0,t.jsx)(o.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,t.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)(d,{children:[(0,t.jsx)(l,{children:n}),(0,t.jsx)(c,{children:a})]}),(0,t.jsxs)(p,{children:[(0,t.jsx)(x,{variant:"secondary",onClick:h,children:m}),(0,t.jsx)(x,{variant:"primary",type:g,onClick:i,children:u})]})]})}):null}},8060:(e,r,n)=>{n.r(r),n.d(r,{default:()=>R});var a=n(8819),i=n(9950),o=n(4752),t=n(2674),s=n(3705),d=n(2488),l=n(1367),c=n(9610),p=n(7617),x=n(4414);const h=o.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
`,u=o.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`,m=o.Ay.div`
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
`,g=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`,b=o.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`,y=o.Ay.span`
  font-size: 12px;
  color: #6B7280;
  margin-left: 8px;
`,w=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`,f=o.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4F46E5;
`,j=o.Ay.span`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  background: #FEF3C7;
  color: #92400E;
`,v=o.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: ${e=>e.active?"#D1FAE5":"#FEE2E2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
  margin-left: 8px;
`,C=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`,k=o.Ay.div`
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
`,A=o.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
`,$=o.Ay.button`
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
`,_=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
`,F=o.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,E=o.Ay.p`
  font-size: 14px;
  color: ${a.w.colors.text.muted};
  margin-bottom: 24px;
`,B=o.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`,z=o.Ay.div`
  margin-bottom: 32px;
`,S=o.Ay.h4`
  font-size: 14px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`,L=o.Ay.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  border: 1px solid ${a.w.colors.borderLight};
`,D=o.Ay.label`
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
    border-color: ${a.w.colors.primary};
  }

  input:checked + & {
    border-color: #635BFF;
    background: #EEF2FF;
  }
`,N=o.Ay.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`,O=o.Ay.div`
  position: relative;
  display: inline-flex;
`,R=()=>{const{user:e}=(0,l.As)(),r=(null===e||void 0===e?void 0:e.restaurant_id)||(null===e||void 0===e?void 0:e.restaurantId),[n,a]=(0,i.useState)([]),[o,R]=(0,i.useState)([]),[T,I]=(0,i.useState)([]),[Q,P]=(0,i.useState)(!0),[Z,H]=(0,i.useState)(""),[M,Y]=(0,i.useState)(null),[U,W]=(0,i.useState)(!1),[J,q]=(0,i.useState)({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]}),[G,V]=(0,i.useState)({isOpen:!1,supplierId:null,supplierName:""}),K="Restaurant Admin"===(null===e||void 0===e?void 0:e.role),X="Brand General"===(null===e||void 0===e?void 0:e.role)||"Brand Manager"===(null===e||void 0===e?void 0:e.role),ee=(0,i.useCallback)(()=>localStorage.getItem("auth_token"),[]);(0,i.useEffect)(()=>{X?(re(),ne()):K&&r?ae():P(!1)},[X,K,r]);const re=async()=>{try{const e=ee(),r=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();I(e)}}catch(e){console.error("Error fetching brands:",e)}},ne=async()=>{const e=ee();P(!0);try{const r=await fetch("/api/suppliers",{headers:{Authorization:`Bearer ${e}`}}),n=await r.json();n.success&&a(n.data)}catch(r){console.error("Failed to fetch suppliers:",r)}finally{P(!1)}},ae=async()=>{const e=ee();P(!0);try{const n=await fetch(`/api/restaurants/${r}/all-suppliers`,{headers:{Authorization:`Bearer ${e}`}}),i=await n.json();i.success&&(a(i.data.own_suppliers||[]),R(i.data.brand_suppliers||[]))}catch(n){console.error("Failed to fetch suppliers:",n)}finally{P(!1)}},ie=e=>{var r;e?(Y(e),q({code:e.code||"",name:e.name,contact_name:e.contact_name||"",phone:e.phone||"",email:e.email||"",address:e.address||"",business_number:e.business_number||"",bank_name:e.bank_name||"",bank_account:e.bank_account||"",payment_terms:e.payment_terms||"",notes:e.notes||"",brand_ids:(null===(r=e.connectedBrands)||void 0===r?void 0:r.map(e=>e.id))||[]})):(Y(null),q({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]}));W(!0)},oe=()=>{W(!1),Y(null),q({code:"",name:"",contact_name:"",phone:"",email:"",address:"",business_number:"",bank_name:"",bank_account:"",payment_terms:"",notes:"",brand_ids:[]})},te=e=>{q(r=>({...r,brand_ids:r.brand_ids.includes(e)?r.brand_ids.filter(r=>r!==e):[...r.brand_ids,e]}))},se=async e=>{if(e.preventDefault(),J.name.trim())try{const e=ee();let n="";const a=M?"PUT":"POST";if(X?n=M?`/api/suppliers/${M.id}`:"/api/suppliers":K&&r&&(n=M?`/api/restaurants/${r}/suppliers/${M.id}`:`/api/restaurants/${r}/suppliers`),!n)return;const i=await fetch(n,{method:a,headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(J)}),o=await i.json();o.success?(oe(),X?ne():ae()):alert(o.error||"Failed to save")}catch(n){console.error("Failed to save supplier:",n),alert("Failed to save")}},de=n.filter(e=>e.name.toLowerCase().includes(Z.toLowerCase())||e.code&&e.code.toLowerCase().includes(Z.toLowerCase())||e.contact_name&&e.contact_name.toLowerCase().includes(Z.toLowerCase())),le=o.filter(e=>e.name.toLowerCase().includes(Z.toLowerCase())||e.code&&e.code.toLowerCase().includes(Z.toLowerCase())||e.contact_name&&e.contact_name.toLowerCase().includes(Z.toLowerCase())),ce=function(e){let r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return(0,x.jsxs)(m,{isActive:e.is_active,readOnly:r,onClick:()=>!r&&ie(e),children:[(0,x.jsxs)(g,{children:[(0,x.jsx)("div",{children:(0,x.jsxs)(b,{children:[e.name,e.code&&(0,x.jsxs)(y,{children:["(",e.code,")"]})]})}),(0,x.jsx)("div",{style:{display:"flex",alignItems:"center"},children:!r&&(0,x.jsx)(v,{active:e.is_active,children:e.is_active?"Active":"Inactive"})})]}),X&&(0,x.jsx)(w,{children:e.connectedBrands&&e.connectedBrands.length>0?e.connectedBrands.map(e=>(0,x.jsx)(f,{children:e.name},e.id)):(0,x.jsx)(j,{children:"No brand connected"})}),(0,x.jsxs)(C,{children:[e.contact_name&&(0,x.jsxs)(k,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),(0,x.jsx)("circle",{cx:"12",cy:"7",r:"4"})]}),e.contact_name]}),e.phone&&(0,x.jsxs)(k,{children:[(0,x.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:(0,x.jsx)("path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"})}),e.phone]}),e.email&&(0,x.jsxs)(k,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("path",{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"}),(0,x.jsx)("polyline",{points:"22,6 12,13 2,6"})]}),e.email]}),e.payment_terms&&(0,x.jsxs)(k,{children:[(0,x.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,x.jsx)("rect",{x:"1",y:"4",width:"22",height:"16",rx:"2",ry:"2"}),(0,x.jsx)("line",{x1:"1",y1:"10",x2:"23",y2:"10"})]}),e.payment_terms]})]}),!r&&(0,x.jsxs)(A,{onClick:e=>e.stopPropagation(),children:[(0,x.jsx)($,{onClick:()=>ie(e),children:"Edit"}),(0,x.jsx)($,{variant:"danger",onClick:()=>V({isOpen:!0,supplierId:e.id,supplierName:e.name}),children:"Delete"})]})]},e.id)};return!Q||n.length||o.length?(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(t.mc,{children:[(0,x.jsxs)(t.Y9,{children:[(0,x.jsx)(t.hE,{children:"Suppliers"}),(0,x.jsx)(h,{children:(0,x.jsx)(s.cc,{variant:"primary",onClick:()=>ie(),children:"Add Supplier"})})]}),(0,x.jsxs)(t.UC,{children:[(0,x.jsx)(B,{children:(0,x.jsx)(d.Qn,{style:{marginBottom:0,flex:1},children:(0,x.jsx)(d.DO,{type:"text",placeholder:"Search suppliers...",value:Z,onChange:e=>H(e.target.value)})})}),K&&le.length>0&&(0,x.jsxs)(z,{children:[(0,x.jsx)(S,{children:"Brand Suppliers (Read Only)"}),(0,x.jsx)(u,{children:le.map(e=>ce(e,!0))})]}),0===n.length&&0===o.length?(0,x.jsxs)(_,{children:[(0,x.jsx)(F,{children:"No suppliers yet"}),(0,x.jsxs)(E,{children:["Add suppliers to manage your ingredient sources.",X&&" You can connect suppliers to multiple brands."]}),(0,x.jsx)(s.cc,{variant:"primary",onClick:()=>ie(),children:"Add Supplier"})]}):0!==de.length||K?(0,x.jsxs)(x.Fragment,{children:[K&&de.length>0&&(0,x.jsx)(S,{children:"My Suppliers"}),(0,x.jsx)(u,{children:de.map(e=>{return ce(e,(r=e,K&&"brand"===r.owner_type));var r})})]}):(0,x.jsxs)(_,{children:[(0,x.jsx)(F,{children:"No suppliers found"}),(0,x.jsx)(E,{children:Z?"Try adjusting your search":"Add your first supplier"})]})]}),(0,x.jsx)(c.aF,{isOpen:U,onClose:oe,title:M?"Edit Supplier":"New Supplier",size:"large",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c.yl,{variant:"secondary",onClick:oe,children:"Cancel"}),(0,x.jsx)(c.yl,{variant:"primary",onClick:se,disabled:!J.name.trim(),children:M?"Update":"Create"})]}),children:(0,x.jsxs)("form",{onSubmit:se,children:[(0,x.jsxs)(c.fh,{children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Supplier Name *"}),(0,x.jsx)(c.ZQ,{type:"text",value:J.name,onChange:e=>q({...J,name:e.target.value}),placeholder:"Company name",required:!0})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Code"}),(0,x.jsx)(c.ZQ,{type:"text",value:J.code,onChange:e=>q({...J,code:e.target.value}),placeholder:"Internal code"})]})]}),X&&T.length>0&&(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Connect to Brands"}),(0,x.jsx)(L,{children:T.map(e=>(0,x.jsxs)(O,{children:[(0,x.jsx)(N,{type:"checkbox",id:`brand-${e.id}`,checked:J.brand_ids.includes(e.id),onChange:()=>te(e.id)}),(0,x.jsxs)(D,{htmlFor:`brand-${e.id}`,style:{borderColor:J.brand_ids.includes(e.id)?"#635BFF":"#E5E7EB",background:J.brand_ids.includes(e.id)?"#EEF2FF":"white"},children:[(0,x.jsx)("input",{type:"checkbox",checked:J.brand_ids.includes(e.id),onChange:()=>te(e.id),style:{accentColor:"#635BFF"}}),e.name]})]},e.id))})]}),(0,x.jsxs)(c.fh,{children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Contact Person"}),(0,x.jsx)(c.ZQ,{type:"text",value:J.contact_name,onChange:e=>q({...J,contact_name:e.target.value}),placeholder:"Contact name"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Phone"}),(0,x.jsx)(c.ZQ,{type:"text",value:J.phone,onChange:e=>q({...J,phone:e.target.value}),placeholder:"Phone number"})]})]}),(0,x.jsxs)(c.fh,{children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Email"}),(0,x.jsx)(c.ZQ,{type:"email",value:J.email,onChange:e=>q({...J,email:e.target.value}),placeholder:"Email address"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Business Number"}),(0,x.jsx)(c.ZQ,{type:"text",value:J.business_number,onChange:e=>q({...J,business_number:e.target.value}),placeholder:"Business registration number"})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Address"}),(0,x.jsx)(c.ZQ,{type:"text",value:J.address,onChange:e=>q({...J,address:e.target.value}),placeholder:"Full address"})]}),(0,x.jsx)(c.fh,{children:(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Payment Terms"}),(0,x.jsx)(c.ZQ,{type:"text",value:J.payment_terms,onChange:e=>q({...J,payment_terms:e.target.value}),placeholder:"e.g., Net 30, COD"})]})}),(0,x.jsxs)(c.fh,{children:[(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Bank Name"}),(0,x.jsx)(c.ZQ,{type:"text",value:J.bank_name,onChange:e=>q({...J,bank_name:e.target.value}),placeholder:"Bank name"})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Bank Account"}),(0,x.jsx)(c.ZQ,{type:"text",value:J.bank_account,onChange:e=>q({...J,bank_account:e.target.value}),placeholder:"Account number"})]})]}),(0,x.jsxs)(c.gE,{children:[(0,x.jsx)(c.lR,{children:"Notes"}),(0,x.jsx)(c.Lz,{value:J.notes,onChange:e=>q({...J,notes:e.target.value}),placeholder:"Additional notes...",rows:3})]})]})}),(0,x.jsx)(p.A,{isOpen:G.isOpen,onCancel:()=>V({isOpen:!1,supplierId:null,supplierName:""}),onConfirm:async()=>{if(G.supplierId)try{const e=ee();let n="";if(X?n=`/api/suppliers/${G.supplierId}`:K&&r&&(n=`/api/restaurants/${r}/suppliers/${G.supplierId}`),!n)return;const a=await fetch(n,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}}),i=await a.json();i.success?(V({isOpen:!1,supplierId:null,supplierName:""}),X?ne():ae()):alert(i.error||"Failed to delete")}catch(e){console.error("Failed to delete supplier:",e),alert("Failed to delete")}},title:"Delete Supplier",message:`Are you sure you want to delete "${G.supplierName}"? This action cannot be undone.`,confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})}):(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(t.mc,{children:[(0,x.jsx)(t.Y9,{children:(0,x.jsx)(t.hE,{children:"Suppliers"})}),(0,x.jsx)(t.UC,{children:(0,x.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:"Loading..."})})]})})}}}]);