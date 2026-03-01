"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1268],{1268:(e,r,n)=>{n.r(r),n.d(r,{default:()=>f});var a=n(8819),t=n(9950),s=n(4492),i=n(4752),o=n(2674),l=n(7617),d=n(8666),c=n(4414);i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 4px 0 0;
`;const h=i.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>"active"===e.status?"#ECFDF5":"#FEE2E2"};
  color: ${e=>"active"===e.status?"#059669":"#DC2626"};
`,x=i.Ay.span`
  color: #635BFF;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 600;

  &:hover {
    color: #5A51E6;
  }
`,p=i.Ay.div`
  color: #DC2626;
  font-size: 14px;
  margin-top: 12px;
  padding: 12px;
  background: #FEF2F2;
  border: 1px solid #FEE2E2;
  border-radius: 8px;
`,u=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;
`,j=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,g=i.Ay.div`
  font-weight: 600;
  color: ${a.w.colors.secondary};
`,v=i.Ay.div`
  font-size: 12px;
  color: ${a.w.colors.text.muted};
`,y=i.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #0A2540;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    margin-bottom: 20px;
  }
`,m=[{value:"RM",label:"RM - Malaysian Ringgit"},{value:"USD",label:"USD - US Dollar"},{value:"SGD",label:"SGD - Singapore Dollar"},{value:"JPY",label:"JPY - Japanese Yen"},{value:"THB",label:"THB - Thai Baht"},{value:"KRW",label:"KRW - Korean Won"},{value:"EUR",label:"EUR - Euro"},{value:"GBP",label:"GBP - British Pound"}],f=()=>{const e=(0,s.Zp)(),[r,n]=(0,t.useState)({totalBrands:0,activeBrands:0,totalStores:0,activeManagers:0}),[a,i]=(0,t.useState)([]),[f,b]=(0,t.useState)(!1),[C,B]=(0,t.useState)(!1),[w,E]=(0,t.useState)(null),[A,S]=(0,t.useState)(!1),[F,k]=(0,t.useState)({name:"",code:"",description:"",email:"",phone:"",address:"",website:"",currency:"RM"}),[$,R]=(0,t.useState)(!0),[D,T]=(0,t.useState)("");(0,t.useEffect)(()=>{z()},[]);const z=async()=>{try{R(!0);const e=localStorage.getItem("auth_token"),r=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json();i(e);const a=e.reduce((e,r)=>{var n;return e+((null===(n=r.restaurants)||void 0===n?void 0:n.length)||0)},0),t=e.filter(e=>"active"===e.status).length;n({totalBrands:e.length,activeBrands:t,totalStores:a,activeManagers:e.length})}else console.error("Failed to fetch brands")}catch(D){console.error("Error fetching brands:",D)}finally{R(!1)}},I=()=>{S(!1),E(null),T(""),k({name:"",code:"",description:"",email:"",phone:"",address:"",website:"",currency:"RM"}),b(!0)};return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(o.mc,{children:[(0,c.jsxs)(o.Y9,{children:[(0,c.jsx)(o.hE,{children:"Brands"}),(0,c.jsxs)(o.ex,{children:[(0,c.jsx)(o.$n,{variant:"secondary",children:"Export"}),(0,c.jsx)(o.$n,{variant:"primary",onClick:I,children:"Add Brand"})]})]}),(0,c.jsxs)(o.UC,{children:[(0,c.jsxs)(o.MD,{children:[(0,c.jsxs)(o.hI,{color:"#635BFF",children:[(0,c.jsx)(o.Os,{children:r.totalBrands}),(0,c.jsx)(o.v0,{children:"Total Brands"}),(0,c.jsxs)(o.d1,{children:[r.activeBrands," active"]})]}),(0,c.jsxs)(o.hI,{color:"#10B981",children:[(0,c.jsx)(o.Os,{children:r.activeBrands}),(0,c.jsx)(o.v0,{children:"Active Brands"}),(0,c.jsx)(o.d1,{children:"Currently operating"})]}),(0,c.jsxs)(o.hI,{color:"#F59E0B",children:[(0,c.jsx)(o.Os,{children:r.totalStores}),(0,c.jsx)(o.v0,{children:"Total Stores"}),(0,c.jsx)(o.d1,{children:"Across all brands"})]}),(0,c.jsxs)(o.hI,{color:"#8B5CF6",children:[(0,c.jsx)(o.Os,{children:r.activeManagers}),(0,c.jsx)(o.v0,{children:"Brand Managers"}),(0,c.jsx)(o.d1,{children:"Assigned managers"})]})]}),$?(0,c.jsx)(y,{children:(0,c.jsx)("p",{children:"Loading brands..."})}):0===a.length?(0,c.jsxs)(y,{children:[(0,c.jsx)("h3",{children:"No Brands Found"}),(0,c.jsx)("p",{children:"Create your first brand to get started."}),(0,c.jsx)(o.$n,{variant:"primary",onClick:I,children:"Add Brand"})]}):(0,c.jsxs)(o.XI,{children:[(0,c.jsxs)(o.A0,{columns:"2fr 1fr 1fr 1fr 1fr 120px",children:[(0,c.jsx)("span",{children:"Brand"}),(0,c.jsx)("span",{children:"Owner"}),(0,c.jsx)("span",{children:"Restaurants"}),(0,c.jsx)("span",{children:"Status"}),(0,c.jsx)("span",{children:"Contact"}),(0,c.jsx)("span",{children:"Actions"})]}),a.map(r=>{var n,a;return(0,c.jsxs)(o.Hj,{columns:"2fr 1fr 1fr 1fr 1fr 120px",children:[(0,c.jsxs)(j,{children:[(0,c.jsx)(g,{children:r.name}),(0,c.jsx)(v,{children:r.code})]}),(0,c.jsx)("div",{children:(null===(n=r.owner)||void 0===n?void 0:n.full_name)||"N/A"}),(0,c.jsx)("div",{children:(0,c.jsxs)(x,{onClick:()=>(r=>{e(`/pos/manager/restaurants?brandId=${r.id}&brandName=${encodeURIComponent(r.name)}`)})(r),children:[(null===(a=r.restaurants)||void 0===a?void 0:a.length)||0," stores"]})}),(0,c.jsx)("div",{children:(0,c.jsx)(h,{status:r.status,children:"active"===r.status?"Active":"Inactive"})}),(0,c.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:r.email||r.phone||"-"}),(0,c.jsxs)(o.wr,{children:[(0,c.jsx)(o.K0,{variant:"edit",onClick:()=>(e=>{S(!0),E(e),T(""),k({name:e.name,code:e.code,description:e.description||"",email:e.email||"",phone:e.phone||"",address:e.address||"",website:e.website||"",currency:e.currency||"RM"}),b(!0)})(r),title:"Edit",children:"Edit"}),(0,c.jsx)(o.K0,{variant:"delete",onClick:()=>(e=>{E(e),B(!0)})(r),title:"Delete",children:"\u2715"})]})]},r.id)})]}),(0,c.jsx)(o.aF,{isOpen:f,onClose:()=>b(!1),title:A?"Edit Brand":"Add New Brand",children:(0,c.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),T("");try{const e=localStorage.getItem("auth_token");if(A&&w){const r=await fetch(`/api/brands/${w.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(F)});if(r.ok)b(!1),z();else{const e=await r.json();T(e.error||"Failed to update brand")}}else{const r=await fetch("/api/brands",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({...F,status:"active"})});if(r.ok)b(!1),z();else{const e=await r.json();T(e.error||"Failed to create brand")}}}catch(D){console.error("Error saving brand:",D),T("Failed to save brand. Please try again.")}},children:[(0,c.jsxs)(o.gE,{children:[(0,c.jsx)(o.lR,{children:"Brand Name *"}),(0,c.jsx)(o.ZQ,{type:"text",value:F.name,onChange:e=>k(r=>({...r,name:e.target.value})),placeholder:"e.g., K-DINE Korean Restaurant",required:!0})]}),(0,c.jsxs)(o.gE,{children:[(0,c.jsx)(o.lR,{children:"Brand Code *"}),(0,c.jsx)(o.ZQ,{type:"text",value:F.code,onChange:e=>k(r=>({...r,code:e.target.value})),placeholder:"e.g., KDINE",required:!0})]}),(0,c.jsxs)(o.gE,{children:[(0,c.jsx)(o.lR,{children:"Description"}),(0,c.jsx)(o.ZQ,{type:"text",value:F.description,onChange:e=>k(r=>({...r,description:e.target.value})),placeholder:"Brief description of the brand"})]}),(0,c.jsxs)(o.gE,{children:[(0,c.jsx)(o.lR,{children:"Email"}),(0,c.jsx)(o.ZQ,{type:"email",value:F.email,onChange:e=>k(r=>({...r,email:e.target.value})),placeholder:"contact@brand.com"})]}),(0,c.jsxs)(o.gE,{children:[(0,c.jsx)(o.lR,{children:"Phone"}),(0,c.jsx)(d.A,{value:F.phone,onChange:e=>k(r=>({...r,phone:e}))})]}),(0,c.jsxs)(o.gE,{children:[(0,c.jsx)(o.lR,{children:"Address"}),(0,c.jsx)(o.ZQ,{type:"text",value:F.address,onChange:e=>k(r=>({...r,address:e.target.value})),placeholder:"Street address"})]}),(0,c.jsxs)(o.gE,{children:[(0,c.jsx)(o.lR,{children:"Website"}),(0,c.jsx)(o.ZQ,{type:"url",value:F.website,onChange:e=>k(r=>({...r,website:e.target.value})),placeholder:"https://www.brand.com"})]}),(0,c.jsxs)(o.gE,{children:[(0,c.jsx)(o.lR,{children:"Currency *"}),(0,c.jsx)(o.FX,{value:F.currency,onChange:e=>k(r=>({...r,currency:e.target.value})),required:!0,children:m.map(e=>(0,c.jsx)("option",{value:e.value,children:e.label},e.value))})]}),D&&(0,c.jsx)(p,{children:D}),(0,c.jsxs)(u,{children:[(0,c.jsx)(o.$n,{type:"button",variant:"secondary",onClick:()=>b(!1),children:"Cancel"}),(0,c.jsx)(o.$n,{type:"submit",variant:"primary",children:A?"Update Brand":"Create Brand"})]})]})}),(0,c.jsx)(l.A,{isOpen:C,title:"Delete Brand",message:`Are you sure you want to delete '${null===w||void 0===w?void 0:w.name}' brand? This action cannot be undone.`,onConfirm:async()=>{if(w){try{const e=localStorage.getItem("auth_token");(await fetch(`/api/brands/${w.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&z()}catch(D){console.error("Error deleting brand:",D)}B(!1)}},onCancel:()=>B(!1),confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})]})})}},7617:(e,r,n)=>{n.d(r,{A:()=>p});var a=n(8819),t=(n(9950),n(4752)),s=n(9610),i=n(4414);const o=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,l=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid ${a.w.colors.border};
`,d=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,h=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,x=t.Ay.button`
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
`,p=e=>{let{isOpen:r,title:n,message:a,onConfirm:t,onCancel:p,confirmText:u="Confirm",cancelText:j="Cancel",type:g="warning"}=e;return r?(0,i.jsx)(s.mH,{onClick:e=>{e.target===e.currentTarget&&p()},children:(0,i.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(l,{children:[(0,i.jsx)(d,{children:n}),(0,i.jsx)(c,{children:a})]}),(0,i.jsxs)(h,{children:[(0,i.jsx)(x,{variant:"secondary",onClick:p,children:j}),(0,i.jsx)(x,{variant:"primary",type:g,onClick:t,children:u})]})]})}):null}}}]);