"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1748],{1748:(e,t,i)=>{i.r(t),i.d(t,{default:()=>Z});var r=i(9950),n=i(4752),s=i(3310),o=i(9037),a=i(7492),l=i(2488),d=i(2420),c=i(9610),p=i(4021),x=i(6038),h=i(2924),m=i(4414);const u=n.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,g=n.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`,y=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`,j=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 16px;
`,f=n.Ay.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};
  
  &:hover {
    background: ${e=>"primary"===e.variant?"#5A51E6":"#F6F9FC"};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,v=n.Ay.main`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`,b=n.Ay.div`
  flex: 1;
  min-width: 300px;
  position: relative;
`,w=n.Ay.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
  pointer-events: none;
`,F=(0,n.Ay)(l.DO)`
  padding-left: 44px;
`,A=n.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,C=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr 120px 100px 100px 120px 150px 40px;
  gap: 16px;
  padding: 16px 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`,S=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr 120px 100px 100px 120px 150px 40px;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #F6F9FC;
  align-items: center;
  transition: all 0.2s;
  cursor: ${e=>e.clickable?"pointer":"default"};

  &:hover {
    background: ${e=>e.clickable?"#F8FAFC":"transparent"};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px;
  }
`,k=n.Ay.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    background: white;
    border-radius: 8px;
    border: 1px solid #E6EBF1;
    padding: 16px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
  }
`,B=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,E=n.Ay.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: white;
  background: ${e=>{switch(e.tier){case"VIP":return"linear-gradient(135deg, #FFD700 0%, #FFA500 100%)";case"Gold":return"linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)";case"Silver":return"linear-gradient(135deg, #C0C0C0 0%, #808080 100%)";default:return"linear-gradient(135deg, #6B7280 0%, #4B5563 100%)"}}};
`,D=n.Ay.div`
  flex: 1;
`,z=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`,O=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,I=n.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.tier){case"VIP":return"#FEF3C7";case"Gold":return"#FDE68A";case"Silver":return"#F3F4F6";default:return"#DBEAFE"}}};
  color: ${e=>{switch(e.tier){case"VIP":return"#92400E";case"Gold":return"#D97706";case"Silver":return"#6B7280";default:return"#1E40AF"}}};
`,T=n.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,$=n.Ay.div`
  display: flex;
  gap: 8px;
`,M=n.Ay.button`
  padding: 6px 12px;
  font-size: 12px;
  color: #6B7C93;
  background: none;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #F6F9FC;
    color: #0A2540;
    border-color: #C7D2FE;
  }
`,P=n.Ay.button`
  padding: 6px;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 6px;
    min-width: 30px;
    min-height: 30px;
  }
`,N=n.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,L=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7C93;
`,R=n.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,V=n.Ay.div`
  display: ${e=>e.isOpen?"flex":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,J=n.Ay.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  overflow: auto;
  animation: slideUp 0.3s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  
  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,W=n.Ay.div`
  padding: 24px 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F1F5F9;
  margin-bottom: 0;
`,Y=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`,G=n.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #64748B;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: #F1F5F9;
    color: #475569;
  }
`,U=n.Ay.div`
  padding: 24px;
`,_=n.Ay.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,Q=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
`,q=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,H=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,K=n.Ay.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,X=n.Ay.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`,Z=()=>{const{customers:e,searchCustomers:t,setShowCustomerModal:i,setCustomerModalMode:n,updateCustomer:Z}=(0,o.c)(),[ee,te]=(0,r.useState)(""),[ie,re]=(0,r.useState)("all"),[ne,se]=(0,r.useState)("all"),[oe,ae]=(0,r.useState)("name"),[le,de]=(0,r.useState)([]),[ce,pe]=(0,r.useState)(null),[xe,he]=(0,r.useState)(!1),[me,ue]=(0,r.useState)(!1),[ge,ye]=(0,r.useState)(null),[je,fe]=(0,r.useState)(!1),{defaultCurrency:ve}=(0,p.i1)(),[be,we]=(0,r.useState)("RM");(0,r.useEffect)(()=>{ve&&we(ve)},[ve]),(0,r.useEffect)(()=>{let i=ee?t(ee):e;if("all"!==ie&&(i=i.filter(e=>e.loyaltyTier===ie)),"all"!==ne){const e="active"===ne;i=i.filter(t=>t.isActive===e)}i.sort((e,t)=>{switch(oe){case"name":return e.name.localeCompare(t.name);case"joinDate":return new Date(t.joinDate).getTime()-new Date(e.joinDate).getTime();case"totalSpent":return t.totalSpent-e.totalSpent;case"totalOrders":return t.totalOrders-e.totalOrders;case"points":return t.points-e.points;default:return 0}}),de(i)},[e,ee,ie,ne,oe,t]);const Fe={totalCustomers:e.length,activeCustomers:e.filter(e=>e.isActive).length,vipCustomers:e.filter(e=>"VIP"===e.loyaltyTier).length,averageOrders:e.length>0?Math.round(e.reduce((e,t)=>e+t.totalOrders,0)/e.length):0},Ae=e=>{pe(e),he(!0)},Ce=e=>{ye(e),ue(!0)},Se=()=>{n("register"),i(!0)},ke=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),Be=e=>e.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2);return(0,m.jsxs)(s.A,{children:[(0,m.jsxs)(u,{children:[(0,m.jsxs)(g,{children:[(0,m.jsx)(y,{children:"Customers"}),(0,m.jsx)(j,{children:(0,m.jsx)(f,{onClick:Se,variant:"primary",children:"+ Add Customer"})})]}),(0,m.jsxs)(v,{children:[(0,m.jsxs)(l.Qn,{children:[(0,m.jsxs)(b,{children:[(0,m.jsx)(w,{children:"\ud83d\udd0d"}),(0,m.jsx)(F,{type:"text",placeholder:"Search customers by name, phone, or email...",value:ee,onChange:e=>te(e.target.value)})]}),(0,m.jsxs)(l.Jt,{value:ie,onChange:e=>re(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Tiers"}),(0,m.jsx)("option",{value:"Bronze",children:"Bronze"}),(0,m.jsx)("option",{value:"Silver",children:"Silver"}),(0,m.jsx)("option",{value:"Gold",children:"Gold"}),(0,m.jsx)("option",{value:"VIP",children:"VIP"})]}),(0,m.jsxs)(l.Jt,{value:ne,onChange:e=>se(e.target.value),children:[(0,m.jsx)("option",{value:"all",children:"All Status"}),(0,m.jsx)("option",{value:"active",children:"Active"}),(0,m.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,m.jsxs)(l.Jt,{value:oe,onChange:e=>ae(e.target.value),children:[(0,m.jsx)("option",{value:"name",children:"Sort by Name"}),(0,m.jsx)("option",{value:"joinDate",children:"Sort by Join Date"}),(0,m.jsx)("option",{value:"totalSpent",children:"Sort by Total Spent"}),(0,m.jsx)("option",{value:"totalOrders",children:"Sort by Orders"}),(0,m.jsx)("option",{value:"points",children:"Sort by Points"})]})]}),(0,m.jsxs)(a.MD,{children:[(0,m.jsxs)(a.hI,{children:[(0,m.jsx)(a.v0,{children:"Total Customers"}),(0,m.jsx)(a.Os,{children:Fe.totalCustomers})]}),(0,m.jsxs)(a.hI,{children:[(0,m.jsx)(a.v0,{children:"Active Customers"}),(0,m.jsx)(a.Os,{children:Fe.activeCustomers})]}),(0,m.jsxs)(a.hI,{children:[(0,m.jsx)(a.v0,{children:"VIP Members"}),(0,m.jsx)(a.Os,{children:Fe.vipCustomers})]}),(0,m.jsxs)(a.hI,{children:[(0,m.jsx)(a.v0,{children:"Avg Orders per Customer"}),(0,m.jsx)(a.Os,{children:Fe.averageOrders})]})]}),(0,m.jsxs)(A,{children:[(0,m.jsxs)(C,{className:"desktop-only",children:[(0,m.jsx)("span",{children:"Customer"}),(0,m.jsx)("span",{children:"Contact"}),(0,m.jsx)("span",{children:"Tier"}),(0,m.jsx)("span",{children:"Points"}),(0,m.jsx)("span",{children:"Orders"}),(0,m.jsx)("span",{children:"Total Spent"}),(0,m.jsx)("span",{children:"Actions"}),(0,m.jsx)("span",{})]}),0===le.length?(0,m.jsxs)(L,{children:[(0,m.jsx)(R,{children:ee||"all"!==ie||"all"!==ne?"No customers found with the current filters":"No customers registered yet"}),(0,m.jsx)(f,{variant:"primary",onClick:Se,children:"Add First Customer"})]}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{className:"desktop-only",children:le.map(e=>(0,m.jsxs)(S,{clickable:!0,onClick:()=>Ae(e),children:[(0,m.jsxs)(B,{children:[(0,m.jsx)(E,{tier:e.loyaltyTier,children:Be(e.name)}),(0,m.jsxs)(D,{children:[(0,m.jsx)(z,{children:e.name}),(0,m.jsxs)(O,{children:["Joined ",ke(e.joinDate),e.lastOrderDate&&` \u2022 Last order ${ke(e.lastOrderDate)}`]})]})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:(0,h.FI)(e.phone)}),e.email&&(0,m.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:e.email})]}),(0,m.jsx)(I,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,m.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#1F2937"},children:e.points.toLocaleString()}),(0,m.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:e.totalOrders}),(0,m.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#059669"},children:(0,x.vv)(e.totalSpent,be)}),(0,m.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,m.jsx)(M,{onClick:()=>Ae(e),children:"View Details"}),(0,m.jsx)(M,{onClick:()=>(async e=>{await Z(e.id,{isActive:!e.isActive})})(e),children:e.isActive?"Deactivate":"Activate"})]}),(0,m.jsx)(P,{onClick:t=>{t.stopPropagation(),Ce(e)},title:"Delete customer",children:(0,m.jsx)(N,{children:"\u2715"})})]},e.id))}),(0,m.jsx)("div",{className:"mobile-only",children:le.map(e=>(0,m.jsxs)(k,{onClick:()=>Ae(e),children:[(0,m.jsxs)(B,{style:{marginBottom:"12px"},children:[(0,m.jsx)(E,{tier:e.loyaltyTier,children:Be(e.name)}),(0,m.jsxs)(D,{children:[(0,m.jsx)(z,{children:e.name}),(0,m.jsx)(O,{children:(0,h.FI)(e.phone)})]}),(0,m.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,m.jsx)(P,{onClick:t=>{t.stopPropagation(),Ce(e)},title:"Delete customer",style:{marginBottom:"4px"},children:(0,m.jsx)(N,{children:"\u2715"})}),(0,m.jsx)(I,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,m.jsx)(T,{active:e.isActive,children:e.isActive?"Active":"Inactive"})]})]}),(0,m.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#6B7280"},children:[(0,m.jsxs)("span",{children:[e.points," pts"]}),(0,m.jsxs)("span",{children:[e.totalOrders," orders"]}),(0,m.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,x.vv)(e.totalSpent,be)})]})]},e.id))})]})]})]}),(0,m.jsx)(V,{isOpen:xe,children:(0,m.jsxs)(J,{children:[(0,m.jsxs)(W,{children:[(0,m.jsx)(Y,{children:"Customer Details"}),(0,m.jsx)(G,{onClick:()=>he(!1),children:"\xd7"})]}),ce&&(0,m.jsxs)(U,{children:[(0,m.jsx)(_,{children:(0,m.jsxs)(B,{style:{marginBottom:"16px"},children:[(0,m.jsx)(E,{tier:ce.loyaltyTier,children:Be(ce.name)}),(0,m.jsxs)(D,{children:[(0,m.jsx)(z,{style:{fontSize:"18px",marginBottom:"4px"},children:ce.name}),(0,m.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,m.jsx)(I,{tier:ce.loyaltyTier,children:ce.loyaltyTier}),(0,m.jsx)(T,{active:ce.isActive,children:ce.isActive?"Active":"Inactive"})]})]})]})}),(0,m.jsxs)(_,{children:[(0,m.jsx)(Q,{children:"Contact Information"}),(0,m.jsxs)(q,{children:[(0,m.jsxs)(H,{children:[(0,m.jsx)(K,{children:"Phone Number"}),(0,m.jsx)(X,{children:(0,h.FI)(ce.phone)})]}),(0,m.jsxs)(H,{children:[(0,m.jsx)(K,{children:"Email Address"}),(0,m.jsx)(X,{children:ce.email||"Not provided"})]})]})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(Q,{children:"Account Statistics"}),(0,m.jsxs)(q,{children:[(0,m.jsxs)(H,{children:[(0,m.jsx)(K,{children:"Member Since"}),(0,m.jsx)(X,{children:ke(ce.joinDate)})]}),(0,m.jsxs)(H,{children:[(0,m.jsx)(K,{children:"Last Order"}),(0,m.jsx)(X,{children:ce.lastOrderDate?ke(ce.lastOrderDate):"No orders yet"})]}),(0,m.jsxs)(H,{children:[(0,m.jsx)(K,{children:"Total Orders"}),(0,m.jsxs)(X,{children:[ce.totalOrders," orders"]})]}),(0,m.jsxs)(H,{children:[(0,m.jsx)(K,{children:"Total Spent"}),(0,m.jsx)(X,{children:(0,x.vv)(ce.totalSpent,be)})]}),(0,m.jsxs)(H,{children:[(0,m.jsx)(K,{children:"Loyalty Points"}),(0,m.jsxs)(X,{children:[ce.points.toLocaleString()," points"]})]}),(0,m.jsxs)(H,{children:[(0,m.jsx)(K,{children:"Average Order Value"}),(0,m.jsx)(X,{children:(0,x.vv)(ce.totalOrders>0?ce.totalSpent/ce.totalOrders:0,be)})]})]})]}),ce.favoriteItems.length>0&&(0,m.jsxs)(_,{children:[(0,m.jsx)(Q,{children:"Favorite Items"}),(0,m.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:ce.favoriteItems.map((e,t)=>(0,m.jsx)("span",{style:{padding:"4px 8px",background:"#F3F4F6",borderRadius:"6px",fontSize:"12px",color:"#6B7280"},children:e},t))})]}),(0,m.jsxs)(_,{children:[(0,m.jsx)(Q,{children:"Recent Activity"}),(0,m.jsx)("div",{style:{color:"#6B7280",fontSize:"14px",fontStyle:"italic"},children:"Order history integration coming soon..."})]})]})]})}),(0,m.jsx)(d.A,{}),(0,m.jsx)(c.Ay,{isOpen:me,onClose:()=>!je&&ue(!1),title:"Delete Customer",footer:(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(c.yl,{variant:"secondary",onClick:()=>ue(!1),disabled:je,children:"Cancel"}),(0,m.jsx)(c.yl,{variant:"danger",onClick:async()=>{if(ge){fe(!0);try{const e=await fetch(`/api/customers/${ge.id}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}),t=await e.json();e.ok?window.location.reload():alert(t.message||"Failed to delete customer")}catch(e){console.error("Delete customer error:",e),alert("Failed to delete customer")}finally{fe(!1),ue(!1),ye(null)}}},disabled:je,children:je?"Deleting...":"Delete"})]}),children:(0,m.jsxs)("div",{children:[(0,m.jsxs)("p",{style:{marginBottom:"16px",color:"#1F2937"},children:["Are you sure you want to delete ",(0,m.jsx)("strong",{children:null===ge||void 0===ge?void 0:ge.name}),"?"]}),(0,m.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"This will permanently remove the customer and all their data from the system. This action cannot be undone."})]})})]}),(0,m.jsx)("style",{children:"\n        @media (max-width: 768px) {\n          .desktop-only { display: none !important; }\n        }\n        @media (min-width: 769px) {\n          .mobile-only { display: none !important; }\n        }\n      "})]})}},2488:(e,t,i)=>{i.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});i(9950);var r=i(4752),n=i(4414);const s=r.Ay.div`
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
`,o=r.Ay.input`
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
`,a=r.Ay.select`
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
`,l=e=>{let{children:t,className:i,style:r,...o}=e;return(0,n.jsx)(s,{className:i,style:r,...o,children:t})},d=e=>{let{placeholder:t="Search...",...i}=e;return(0,n.jsx)(o,{placeholder:t,...i})},c=e=>{let{children:t,...i}=e;return(0,n.jsx)(a,{...i,children:t})}},4021:(e,t,i)=>{i.d(t,{i1:()=>o});var r=i(9950),n=i(1367),s=i(6038);const o=()=>{const{user:e}=(0,n.As)(),[t,i]=(0,r.useState)("RM"),[o,a]=(0,r.useState)(Object.keys(s.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let n=r>=0?t[r+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return i("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),r=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";i(r)}else i("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),i("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:l,error:c}}}}]);