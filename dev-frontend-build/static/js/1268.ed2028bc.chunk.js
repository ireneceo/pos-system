"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1268],{1268:(e,n,a)=>{a.r(n),a.d(n,{default:()=>B});var r=a(9950),t=a(4492),d=a(4752),s=a(2853),i=a(8409),o=a(7617),l=a(8666),c=a(5030),h=a(4414);const p=d.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${e=>"active"===e.status?"#ECFDF5":"#FEE2E2"};
  color: ${e=>"active"===e.status?"#059669":"#DC2626"};
`,x=d.Ay.span`
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
`,b=d.Ay.div`
  margin-bottom: 20px;
`,g=d.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;
`,j=d.Ay.select`
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
`,m=d.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,v=d.Ay.div`
  font-weight: 600;
  color: #0A2540;
`,y=d.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,f=[{value:"RM",label:"RM - Malaysian Ringgit"},{value:"USD",label:"USD - US Dollar"},{value:"SGD",label:"SGD - Singapore Dollar"},{value:"JPY",label:"JPY - Japanese Yen"},{value:"THB",label:"THB - Thai Baht"},{value:"KRW",label:"KRW - Korean Won"},{value:"EUR",label:"EUR - Euro"},{value:"GBP",label:"GBP - British Pound"}],B=()=>{const{t:e}=(0,c.Bd)("brand"),n=(0,t.Zp)(),[a,d]=(0,r.useState)({totalBrands:0,activeBrands:0,totalStores:0,activeManagers:0}),[B,C]=(0,r.useState)([]),[w,M]=(0,r.useState)(!1),[E,A]=(0,r.useState)(!1),[F,S]=(0,r.useState)(null),[k,R]=(0,r.useState)(!1),[$,D]=(0,r.useState)({name:"",code:"",description:"",email:"",phone:"",address:"",website:"",currency:"RM"}),[T,z]=(0,r.useState)(!0),[I,O]=(0,r.useState)("");(0,r.useEffect)(()=>{N()},[]);const N=async()=>{try{z(!0);const e=localStorage.getItem("auth_token"),n=await fetch("/api/brands",{headers:{Authorization:`Bearer ${e}`}});if(n.ok){const e=await n.json();C(e);const a=e.reduce((e,n)=>{var a;return e+((null===(a=n.restaurants)||void 0===a?void 0:a.length)||0)},0),r=e.filter(e=>"active"===e.status).length;d({totalBrands:e.length,activeBrands:r,totalStores:a,activeManagers:e.length})}else console.error("Failed to fetch brands")}catch(I){console.error("Error fetching brands:",I)}finally{z(!1)}},P=()=>{R(!1),S(null),O(""),D({name:"",code:"",description:"",email:"",phone:"",address:"",website:"",currency:"RM"}),M(!0)};return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)(i.mc,{children:[(0,h.jsxs)(i.Y9,{children:[(0,h.jsx)(i.hE,{children:e("brand:brandManagement.brands")}),(0,h.jsxs)(i.ex,{children:[(0,h.jsx)(i.$n,{variant:"secondary",children:e("brand:brandManagement.export")}),(0,h.jsx)(i.$n,{variant:"primary",onClick:P,children:e("brand:brandManagement.addBrand")})]})]}),(0,h.jsxs)(i.UC,{children:[(0,h.jsxs)(i.MD,{children:[(0,h.jsxs)(i.hI,{color:"#635BFF",children:[(0,h.jsx)(i.Os,{children:a.totalBrands}),(0,h.jsx)(i.v0,{children:e("brand:brandManagement.totalBrands")}),(0,h.jsxs)(i.d1,{children:[a.activeBrands," active"]})]}),(0,h.jsxs)(i.hI,{color:"#10B981",children:[(0,h.jsx)(i.Os,{children:a.activeBrands}),(0,h.jsx)(i.v0,{children:e("brand:brandManagement.activeBrands")}),(0,h.jsx)(i.d1,{children:e("brand:brandManagement.currentlyOperating")})]}),(0,h.jsxs)(i.hI,{color:"#F59E0B",children:[(0,h.jsx)(i.Os,{children:a.totalStores}),(0,h.jsx)(i.v0,{children:e("brand:brandManagement.totalStores")}),(0,h.jsx)(i.d1,{children:e("brand:brandManagement.acrossAllBrands")})]}),(0,h.jsxs)(i.hI,{color:"#8B5CF6",children:[(0,h.jsx)(i.Os,{children:a.activeManagers}),(0,h.jsx)(i.v0,{children:e("brand:brandManagement.brandManagers")}),(0,h.jsx)(i.d1,{children:e("brand:brandManagement.assignedManagers")})]})]}),T?(0,h.jsx)(s.pp,{children:(0,h.jsx)("p",{children:e("brand:brandManagement.loadingBrands")})}):0===B.length?(0,h.jsxs)(s.pp,{children:[(0,h.jsx)("h3",{children:e("brand:brandManagement.noBrandsFound")}),(0,h.jsx)("p",{children:e("brand:brandManagement.createYourFirstBrandToGetStarted")}),(0,h.jsx)(i.$n,{variant:"primary",onClick:P,children:e("brand:brandManagement.addBrand")})]}):(0,h.jsxs)(i.XI,{children:[(0,h.jsxs)(i.A0,{columns:"2fr 2fr 1fr 1fr 1fr 120px",children:[(0,h.jsx)("span",{className:"col-info",children:e("brand:brandManagement.brand")}),(0,h.jsx)("span",{children:e("brand:brandManagement.description")}),(0,h.jsx)("span",{children:e("brand:brandManagement.restaurants")}),(0,h.jsx)("span",{children:e("brand:brandManagement.status")}),(0,h.jsx)("span",{children:e("brand:brandManagement.contact")}),(0,h.jsx)("span",{className:"col-action",children:e("brand:brandManagement.actions")})]}),B.map(e=>{var a;return(0,h.jsxs)(i.Hj,{columns:"2fr 2fr 1fr 1fr 1fr 120px",children:[(0,h.jsxs)(m,{className:"col-info",children:[(0,h.jsx)(v,{children:e.name}),(0,h.jsx)(y,{children:e.code})]}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.description||"-"}),(0,h.jsx)("div",{children:(0,h.jsxs)(x,{onClick:()=>(e=>{n(`/pos/manager/restaurants?brandId=${e.id}&brandName=${encodeURIComponent(e.name)}`)})(e),children:[(null===(a=e.restaurants)||void 0===a?void 0:a.length)||0," stores"]})}),(0,h.jsx)("div",{children:(0,h.jsx)(p,{status:e.status,children:"active"===e.status?"Active":"Inactive"})}),(0,h.jsx)("div",{style:{fontSize:"13px",color:"#6B7280"},children:e.email||e.phone||"-"}),(0,h.jsxs)(i.wr,{children:[(0,h.jsx)(i.K0,{variant:"edit",onClick:()=>(e=>{R(!0),S(e),O(""),D({name:e.name,code:e.code,description:e.description||"",email:e.email||"",phone:e.phone||"",address:e.address||"",website:e.website||"",currency:e.currency||"MYR"}),M(!0)})(e),title:"Edit",children:"Edit"}),(0,h.jsx)(i.K0,{variant:"delete",onClick:()=>(e=>{S(e),A(!0)})(e),title:"Delete",children:"\u2715"})]})]},e.id)})]}),(0,h.jsx)(i.aF,{isOpen:w,onClose:()=>M(!1),title:k?"Edit Brand":"Add New Brand",children:(0,h.jsxs)("form",{onSubmit:async e=>{e.preventDefault(),O("");try{const e=localStorage.getItem("auth_token");if(k&&F){const n=await fetch(`/api/brands/${F.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify($)});if(n.ok)M(!1),N();else{const e=await n.json();O(e.error||"Failed to update brand")}}else{const n=await fetch("/api/brands",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({...$,status:"active"})});if(n.ok)M(!1),N();else{const e=await n.json();O(e.error||"Failed to create brand")}}}catch(I){console.error("Error saving brand:",I),O("Failed to save brand. Please try again.")}},children:[(0,h.jsxs)(b,{children:[(0,h.jsx)(i.lR,{children:"Brand Name *"}),(0,h.jsx)(i.ZQ,{type:"text",value:$.name,onChange:e=>D(n=>({...n,name:e.target.value})),placeholder:"e.g., K-DINE Korean Restaurant",required:!0})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(i.lR,{children:"Brand Code *"}),(0,h.jsx)(i.ZQ,{type:"text",value:$.code,onChange:e=>D(n=>({...n,code:e.target.value})),placeholder:"e.g., KDINE",required:!0})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(i.lR,{children:e("brand:brandManagement.description")}),(0,h.jsx)(i.ZQ,{type:"text",value:$.description,onChange:e=>D(n=>({...n,description:e.target.value})),placeholder:"Brief description of the brand"})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(i.lR,{children:e("brand:brandManagement.email")}),(0,h.jsx)(i.ZQ,{type:"email",value:$.email,onChange:e=>D(n=>({...n,email:e.target.value})),placeholder:"contact@brand.com"})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(i.lR,{children:e("brand:brandManagement.phone")}),(0,h.jsx)(l.A,{value:$.phone,onChange:e=>D(n=>({...n,phone:e}))})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(i.lR,{children:e("brand:brandManagement.address")}),(0,h.jsx)(i.ZQ,{type:"text",value:$.address,onChange:e=>D(n=>({...n,address:e.target.value})),placeholder:"Street address"})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(i.lR,{children:e("brand:brandManagement.website")}),(0,h.jsx)(i.ZQ,{type:"url",value:$.website,onChange:e=>D(n=>({...n,website:e.target.value})),placeholder:"https://www.brand.com"})]}),(0,h.jsxs)(b,{children:[(0,h.jsx)(i.lR,{children:"Currency *"}),(0,h.jsx)(j,{value:$.currency,onChange:e=>D(n=>({...n,currency:e.target.value})),required:!0,children:f.map(e=>(0,h.jsx)("option",{value:e.value,children:e.label},e.value))})]}),I&&(0,h.jsx)(u,{children:I}),(0,h.jsxs)(g,{children:[(0,h.jsx)(i.$n,{type:"button",variant:"secondary",onClick:()=>M(!1),children:"Cancel"}),(0,h.jsx)(i.$n,{type:"submit",variant:"primary",children:k?"Update Brand":"Create Brand"})]})]})}),(0,h.jsx)(o.A,{isOpen:E,title:"Delete Brand",message:`Are you sure you want to delete '${null===F||void 0===F?void 0:F.name}' brand? This action cannot be undone.`,onConfirm:async()=>{if(F){try{const e=localStorage.getItem("auth_token");(await fetch(`/api/brands/${F.id}`,{method:"DELETE",headers:{Authorization:`Bearer ${e}`}})).ok&&N()}catch(I){console.error("Error deleting brand:",I)}A(!1)}},onCancel:()=>A(!1),confirmText:"Delete",cancelText:"Cancel",type:"danger"})]})]})})}},7617:(e,n,a)=>{a.d(n,{A:()=>x});a(9950);var r=a(7119),t=a(4752),d=a(9610),s=a(4414);const i=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,o=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=t.Ay.h2`
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
`,x=e=>{let{isOpen:n,title:a,message:t,onConfirm:x,onCancel:u,confirmText:b="Confirm",cancelText:g="Cancel",type:j="warning"}=e;return n?r.createPortal((0,s.jsx)(d.mH,{onClick:e=>{e.target===e.currentTarget&&u()},style:{zIndex:1100},children:(0,s.jsxs)(i,{onClick:e=>e.stopPropagation(),children:[(0,s.jsxs)(o,{children:[(0,s.jsx)(l,{children:a}),(0,s.jsx)(c,{children:t})]}),(0,s.jsxs)(h,{children:[(0,s.jsx)(p,{variant:"secondary",onClick:u,children:g}),(0,s.jsx)(p,{variant:"primary",type:j,onClick:x,children:b})]})]})}),document.body):null}}}]);