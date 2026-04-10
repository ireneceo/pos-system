"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1268],{1268:(e,n,a)=>{a.r(n),a.d(n,{default:()=>C});var r=a(9950),t=a(4492),d=a(4752),s=a(2853),i=a(8409),l=a(7617),o=a(8666),c=a(5030),h=a(9955),p=a(4414);const x=d.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>"active"===e.status?"#ECFDF5":"#FEE2E2"};
  color: ${e=>"active"===e.status?"#059669":"#DC2626"};
`,b=d.Ay.span`
  color: #635BFF;
  cursor: pointer;
  text-decoration: underline;
  font-weight: 600;

  &:hover {
    color: #5A51E6;
  }
`,u=d.Ay.div`
  color: #DC2626;
  font-size: 14px;
  margin-top: 12px;
  padding: 12px;
  background: #FEF2F2;
  border: 1px solid #FEE2E2;
  border-radius: 8px;
`,g=d.Ay.div`
  margin-bottom: 20px;
`,j=d.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;
`,m=d.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  font-size: 14px;
  color: #0A2540;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`,v=d.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,y=d.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,f=d.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,B=[{value:"RM",label:"RM - Malaysian Ringgit"},{value:"USD",label:"USD - US Dollar"},{value:"SGD",label:"SGD - Singapore Dollar"},{value:"JPY",label:"JPY - Japanese Yen"},{value:"THB",label:"THB - Thai Baht"},{value:"KRW",label:"KRW - Korean Won"},{value:"EUR",label:"EUR - Euro"},{value:"GBP",label:"GBP - British Pound"}],C=()=>{const{t:e}=(0,c.Bd)("brand"),n=(0,t.Zp)(),[a,d]=(0,r.useState)({totalBrands:0,activeBrands:0,totalStores:0,activeManagers:0}),[C,w]=(0,r.useState)([]),[M,E]=(0,r.useState)(!1),[A,F]=(0,r.useState)(!1),[S,k]=(0,r.useState)(null),[R,$]=(0,r.useState)(!1),[D,T]=(0,r.useState)({name:"",code:"",description:"",email:"",phone:"",address:"",website:"",currency:"RM"}),[z,I]=(0,r.useState)(!0),[O,N]=(0,r.useState)("");(0,r.useEffect)(()=>{P()},[]);const P=async()=>{try{I(!0);const e=(0,h.c4)(),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();w(e);const a=e.reduce((e,n)=>{var a;return e+((null===(a=n.restaurants)||void 0===a?void 0:a.length)||0)},0),r=e.filter(e=>"active"===e.status).length;d({totalBrands:e.length,activeBrands:r,totalStores:a,activeManagers:e.length})}else console.error("Failed to fetch brands")}catch(O){console.error("Error fetching brands:",O)}finally{I(!1)}},U=()=>{$(!1),k(null),N(""),T({name:"",code:"",description:"",email:"",phone:"",address:"",website:"",currency:"RM"}),E(!0)};return(0,p.jsx)(p.Fragment,{children:(0,p.jsxs)(i.mc,{children:[(0,p.jsxs)(i.Y9,{children:[(0,p.jsx)(i.hE,{children:e("brand:brandManagement.brands")}),(0,p.jsxs)(i.ex,{children:[(0,p.jsx)(i.$n,{variant:"secondary",children:e("brand:brandManagement.export")}),(0,p.jsx)(i.$n,{variant:"primary",onClick:U,children:e("brand:brandManagement.addBrand")})]})]}),(0,p.jsxs)(i.UC,{children:[(0,p.jsxs)(i.MD,{children:[(0,p.jsxs)(i.hI,{color:"#635BFF",children:[(0,p.jsx)(i.Os,{children:a.totalBrands}),(0,p.jsx)(i.v0,{children:e("brand:brandManagement.totalBrands")}),(0,p.jsxs)(i.d1,{children:[a.activeBrands," active"]})]}),(0,p.jsxs)(i.hI,{color:"#10B981",children:[(0,p.jsx)(i.Os,{children:a.activeBrands}),(0,p.jsx)(i.v0,{children:e("brand:brandManagement.activeBrands")}),(0,p.jsx)(i.d1,{children:e("brand:brandManagement.currentlyOperating")})]}),(0,p.jsxs)(i.hI,{color:"#F59E0B",children:[(0,p.jsx)(i.Os,{children:a.totalStores}),(0,p.jsx)(i.v0,{children:e("brand:brandManagement.totalStores")}),(0,p.jsx)(i.d1,{children:e("brand:brandManagement.acrossAllBrands")})]}),(0,p.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,p.jsx)(i.Os,{children:a.activeManagers}),(0,p.jsx)(i.v0,{children:e("brand:brandManagement.brandManagers")}),(0,p.jsx)(i.d1,{children:e("brand:brandManagement.assignedManagers")})]})]}),z?(0,p.jsx)(s.pp,{children:(0,p.jsx)("p",{children:e("brand:brandManagement.loadingBrands")})}):0===C.length?(0,p.jsxs)(s.pp,{children:[(0,p.jsx)("h3",{children:e("brand:brandManagement.noBrandsFound")}),(0,p.jsx)("p",{children:e("brand:brandManagement.createYourFirstBrandToGetStarted")}),(0,p.jsx)(i.$n,{variant:"primary",onClick:U,children:e("brand:brandManagement.addBrand")})]}):(0,p.jsxs)(i.XI,{children:[(0,p.jsxs)(i.A0,{columns:"2fr 2fr 1fr 1fr 1fr 120px",children:[(0,p.jsx)("span",{className:"col-info",children:e("brand:brandManagement.brand")}),(0,p.jsx)("span",{children:e("brand:brandManagement.description")}),(0,p.jsx)("span",{children:e("brand:brandManagement.restaurants")}),(0,p.jsx)("span",{children:e("brand:brandManagement.status")}),(0,p.jsx)("span",{children:e("brand:brandManagement.contact")}),(0,p.jsx)("span",{className:"col-action",children:e("brand:brandManagement.actions")})]}),C.map(e=>{var a;return(0,p.jsxs)(i.Hj,{columns:"2fr 2fr 1fr 1fr 1fr 120px",children:[(0,p.jsxs)(v,{className:"col-info",children:[(0,p.jsx)(y,{children:e.name}),(0,p.jsx)(f,{children:e.code})]}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.description||"-"}),(0,p.jsx)("div",{children:(0,p.jsxs)(b,{onClick:()=>(e=>{n(`/pos/manager/restaurants?brandId=${e.id}&brandName=${encodeURIComponent(e.name)}`)})(e),children:[(null===(a=e.restaurants)||void 0===a?void 0:a.length)||0," stores"]})}),(0,p.jsx)("div",{children:(0,p.jsx)(x,{status:e.status,children:"active"===e.status?"Active":"Inactive"})}),(0,p.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.email||e.phone||"-"}),(0,p.jsxs)(i.wr,{children:[(0,p.jsx)(i.K0,{variant:"edit",onClick:()=>(e=>{$(!0),k(e),N(""),T({name:e.name,code:e.code,description:e.description||"",email:e.email||"",phone:e.phone||"",address:e.address||"",website:e.website||"",currency:e.currency||"MYR"}),E(!0)})(e),title:"Edit",children:"Edit"}),(0,p.jsx)(i.K0,{variant:"delete",onClick:()=>(e=>{k(e),F(!0)})(e),title:"Delete",children:"\u2715"})]})]},e.id)})]}),(0,p.jsx)(i.aF,{isOpen:M,onClose:()=>E(!1),title:R?"Edit Brand":"Add New Brand",children:(0,p.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),N("");try{const e=(0,h.c4)();if(R&&S){const n=await fetch(`/api/brands/${S.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify(D)});if(n.ok)E(!1),P();else{const e=await n.json();N(e.error||"Failed to update brand")}}else{const n=await fetch("/api/brands",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({...D,status:"active"})});if(n.ok)E(!1),P();else{const e=await n.json();N(e.error||"Failed to create brand")}}}catch(O){console.error("Error saving brand:",O),N("Failed to save brand. Please try again.")}},children:[(0,p.jsxs)(g,{children:[(0,p.jsx)(i.lR,{children:"Brand Name *"}),(0,p.jsx)(i.ZQ,{type:"text",value:D.name,onChange:e=>T(n=>({...n,name:e.target.value})),placeholder:"e.g., K-DINE Korean Restaurant",required:!0})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(i.lR,{children:"Brand Code *"}),(0,p.jsx)(i.ZQ,{type:"text",value:D.code,onChange:e=>T(n=>({...n,code:e.target.value})),placeholder:"e.g., KDINE",required:!0})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(i.lR,{children:e("brand:brandManagement.description")}),(0,p.jsx)(i.ZQ,{type:"text",value:D.description,onChange:e=>T(n=>({...n,description:e.target.value})),placeholder:"Brief description of the brand"})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(i.lR,{children:e("brand:brandManagement.email")}),(0,p.jsx)(i.ZQ,{type:"email",value:D.email,onChange:e=>T(n=>({...n,email:e.target.value})),placeholder:"contact@brand.com"})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(i.lR,{children:e("brand:brandManagement.phone")}),(0,p.jsx)(o.A,{value:D.phone,onChange:e=>T(n=>({...n,phone:e}))})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(i.lR,{children:e("brand:brandManagement.address")}),(0,p.jsx)(i.ZQ,{type:"text",value:D.address,onChange:e=>T(n=>({...n,address:e.target.value})),placeholder:"Street address"})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(i.lR,{children:e("brand:brandManagement.website")}),(0,p.jsx)(i.ZQ,{type:"url",value:D.website,onChange:e=>T(n=>({...n,website:e.target.value})),placeholder:"https://www.brand.com"})]}),(0,p.jsxs)(g,{children:[(0,p.jsx)(i.lR,{children:"Currency *"}),(0,p.jsx)(m,{value:D.currency,onChange:e=>T(n=>({...n,currency:e.target.value})),required:!0,children:B.map(e=>(0,p.jsx)("option",{value:e.value,children:e.label},e.value))})]}),O&&(0,p.jsx)(u,{children:O}),(0,p.jsxs)(j,{children:[(0,p.jsx)(i.$n,{type:"button",variant:"secondary",onClick:()=>E(!1),children:"Cancel"}),(0,p.jsx)(i.$n,{type:"submit",variant:"primary",children:R?"Update Brand":"Create Brand"})]})]})}),(0,p.jsx)(l.A,{isOpen:A,title:"Delete Brand",message:`Are you sure you want to delete '${null===S||void 0===S?void 0:S.name}' brand? This action cannot be undone.`,onConfirm:async()=>{if(S){try{const e=(0,h.c4)();(await fetch(`/api/brands/${S.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&P()}catch(O){console.error("Error deleting brand:",O)}F(!1)}},onCancel:()=>F(!1),confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})]})})}},7617:(e,n,a)=>{a.d(n,{A:()=>x});a(9950);var r=a(7119),t=a(4752),d=a(9610),s=a(4414);const i=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,l=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,o=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,h=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=t.Ay.button`
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
`,x=e=>{let{isOpen:n,title:a,message:t,onConfirm:x,onCancel:b,confirmText:u="Confirm",cancelText:g="Cancel",type:j="warning"}=e;return n?r.createPortal((0,s.jsx)(d.mH,{onClick:e=>{e.target===e.currentTarget&&b()},style:{zIndex:1100},children:(0,s.jsxs)(i,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(l,{children:[(0,s.jsx)(o,{children:a}),(0,s.jsx)(c,{children:t})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)(p,{variant:"secondary",onClick:b,children:g}),(0,s.jsx)(p,{variant:"primary",type:j,onClick:x,children:u})]})]})}),document.body):null}}}]);