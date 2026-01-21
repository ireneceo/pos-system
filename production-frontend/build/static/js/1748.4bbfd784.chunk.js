"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1748],{1748:(e,t,i)=>{i.r(t),i.d(t,{default:()=>X});var r=i(9950),n=i(4752),o=i(4492),s=i(3310),a=i(9037),l=i(7492),d=i(2488),c=i(2420),p=i(9610),x=i(4021),h=i(6038),m=i(2924),u=i(4732),g=i(4414);const y=n.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,j=n.Ay.button`
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
`,f=n.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,v=n.Ay.div`
  flex: 0 0 400px;
  max-width: 400px;
  position: relative;
`,b=n.Ay.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
  pointer-events: none;
`,w=(0,n.Ay)(d.DO)`
  padding-left: 44px;
`,F=n.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,A=n.Ay.div`
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
`,C=n.Ay.div`
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
`,S=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,B=n.Ay.div`
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
`,E=n.Ay.div`
  flex: 1;
`,z=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`,D=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,O=n.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.tier){case"VIP":return"#FEF3C7";case"Gold":return"#FDE68A";case"Silver":return"#F3F4F6";default:return"#DBEAFE"}}};
  color: ${e=>{switch(e.tier){case"VIP":return"#92400E";case"Gold":return"#D97706";case"Silver":return"#6B7280";default:return"#1E40AF"}}};
`,I=n.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,T=n.Ay.div`
  display: flex;
  gap: 8px;
`,$=n.Ay.button`
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
`,M=n.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,N=n.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7C93;
`,L=n.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,R=n.Ay.div`
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
`,V=n.Ay.div`
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
`,J=n.Ay.div`
  padding: 24px 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F1F5F9;
  margin-bottom: 0;
`,W=n.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`,Y=n.Ay.button`
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
`,G=n.Ay.div`
  padding: 24px;
`,U=n.Ay.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,_=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
`,Q=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,q=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,H=n.Ay.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,K=n.Ay.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`,X=()=>{const{restaurantId:e}=(0,o.g)(),{customers:t,searchCustomers:i,setShowCustomerModal:n,setCustomerModalMode:X,updateCustomer:Z,reloadCustomers:ee}=(0,a.c)(),[te,ie]=(0,r.useState)(""),[re,ne]=(0,r.useState)("all"),[oe,se]=(0,r.useState)("all"),[ae,le]=(0,r.useState)("name"),[de,ce]=(0,r.useState)([]),[pe,xe]=(0,r.useState)(null),[he,me]=(0,r.useState)(!1),[ue,ge]=(0,r.useState)(!1),[ye,je]=(0,r.useState)(null),[fe,ve]=(0,r.useState)(!1),{defaultCurrency:be}=(0,x.i1)(),[we,Fe]=(0,r.useState)("RM");(0,r.useEffect)(()=>{e&&ee(e)},[e,ee]),(0,r.useEffect)(()=>{be&&Fe(be)},[be]),(0,r.useEffect)(()=>{let e=te?i(te):t;if("all"!==re&&(e=e.filter(e=>e.loyaltyTier===re)),"all"!==oe){const t="active"===oe;e=e.filter(e=>e.isActive===t)}e.sort((e,t)=>{switch(ae){case"name":return e.name.localeCompare(t.name);case"joinDate":return new Date(t.joinDate).getTime()-new Date(e.joinDate).getTime();case"totalSpent":return t.totalSpent-e.totalSpent;case"totalOrders":return t.totalOrders-e.totalOrders;case"points":return t.points-e.points;default:return 0}}),ce(e)},[t,te,re,oe,ae,i]);const Ae={totalCustomers:t.length,activeCustomers:t.filter(e=>e.isActive).length,vipCustomers:t.filter(e=>"VIP"===e.loyaltyTier).length,averageOrders:t.length>0?Math.round(t.reduce((e,t)=>e+t.totalOrders,0)/t.length):0},Ce=e=>{xe(e),me(!0)},ke=e=>{je(e),ge(!0)},Se=()=>{X("register"),n(!0)},Be=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),Ee=e=>e.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2);return(0,g.jsxs)(s.A,{children:[(0,g.jsxs)(y,{children:[(0,g.jsx)(u.Ay,{title:"Customers",children:(0,g.jsx)(j,{onClick:Se,variant:"primary",children:"+ Add Customer"})}),(0,g.jsxs)(f,{children:[(0,g.jsxs)(d.Qn,{children:[(0,g.jsxs)(v,{children:[(0,g.jsx)(b,{children:"\ud83d\udd0d"}),(0,g.jsx)(w,{type:"text",placeholder:"Search customers by name, phone, or email...",value:te,onChange:e=>ie(e.target.value)})]}),(0,g.jsxs)(d.Jt,{value:re,onChange:e=>ne(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Tiers"}),(0,g.jsx)("option",{value:"Bronze",children:"Bronze"}),(0,g.jsx)("option",{value:"Silver",children:"Silver"}),(0,g.jsx)("option",{value:"Gold",children:"Gold"}),(0,g.jsx)("option",{value:"VIP",children:"VIP"})]}),(0,g.jsxs)(d.Jt,{value:oe,onChange:e=>se(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Status"}),(0,g.jsx)("option",{value:"active",children:"Active"}),(0,g.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,g.jsxs)(d.Jt,{value:ae,onChange:e=>le(e.target.value),children:[(0,g.jsx)("option",{value:"name",children:"Sort by Name"}),(0,g.jsx)("option",{value:"joinDate",children:"Sort by Join Date"}),(0,g.jsx)("option",{value:"totalSpent",children:"Sort by Total Spent"}),(0,g.jsx)("option",{value:"totalOrders",children:"Sort by Orders"}),(0,g.jsx)("option",{value:"points",children:"Sort by Points"})]})]}),(0,g.jsxs)(l.MD,{children:[(0,g.jsxs)(l.hI,{color:"#635BFF",children:[(0,g.jsx)(l.v0,{children:"Total Customers"}),(0,g.jsx)(l.Os,{children:Ae.totalCustomers})]}),(0,g.jsxs)(l.hI,{color:"#10B981",children:[(0,g.jsx)(l.v0,{children:"Active Customers"}),(0,g.jsx)(l.Os,{children:Ae.activeCustomers})]}),(0,g.jsxs)(l.hI,{color:"#F59E0B",children:[(0,g.jsx)(l.v0,{children:"VIP Members"}),(0,g.jsx)(l.Os,{children:Ae.vipCustomers})]}),(0,g.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,g.jsx)(l.v0,{children:"Avg Orders per Customer"}),(0,g.jsx)(l.Os,{children:Ae.averageOrders})]})]}),(0,g.jsxs)(F,{children:[(0,g.jsxs)(A,{className:"desktop-only",children:[(0,g.jsx)("span",{children:"Customer"}),(0,g.jsx)("span",{children:"Contact"}),(0,g.jsx)("span",{children:"Tier"}),(0,g.jsx)("span",{children:"Points"}),(0,g.jsx)("span",{children:"Orders"}),(0,g.jsx)("span",{children:"Total Spent"}),(0,g.jsx)("span",{children:"Actions"}),(0,g.jsx)("span",{})]}),0===de.length?(0,g.jsxs)(N,{children:[(0,g.jsx)(L,{children:te||"all"!==re||"all"!==oe?"No customers found with the current filters":"No customers registered yet"}),(0,g.jsx)(j,{variant:"primary",onClick:Se,children:"Add First Customer"})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{className:"desktop-only",children:de.map(e=>(0,g.jsxs)(C,{clickable:!0,onClick:()=>Ce(e),children:[(0,g.jsxs)(S,{children:[(0,g.jsx)(B,{tier:e.loyaltyTier,children:Ee(e.name)}),(0,g.jsxs)(E,{children:[(0,g.jsx)(z,{children:e.name}),(0,g.jsxs)(D,{children:["Joined ",Be(e.joinDate),e.lastOrderDate&&` \u2022 Last order ${Be(e.lastOrderDate)}`]})]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:(0,m.FI)(e.phone)}),e.email&&(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:e.email})]}),(0,g.jsx)(O,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#1F2937"},children:e.points.toLocaleString()}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:e.totalOrders}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#059669"},children:(0,h.vv)(e.totalSpent,we)}),(0,g.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,g.jsx)($,{onClick:()=>Ce(e),children:"View"}),(0,g.jsx)($,{onClick:()=>(async e=>{await Z(e.id,{isActive:!e.isActive})})(e),children:e.isActive?"Deactivate":"Activate"})]}),(0,g.jsx)(P,{onClick:t=>{t.stopPropagation(),ke(e)},title:"Delete customer",children:(0,g.jsx)(M,{children:"\u2715"})})]},e.id))}),(0,g.jsx)("div",{className:"mobile-only",children:de.map(e=>(0,g.jsxs)(k,{onClick:()=>Ce(e),children:[(0,g.jsxs)(S,{style:{marginBottom:"12px"},children:[(0,g.jsx)(B,{tier:e.loyaltyTier,children:Ee(e.name)}),(0,g.jsxs)(E,{children:[(0,g.jsx)(z,{children:e.name}),(0,g.jsx)(D,{children:(0,m.FI)(e.phone)})]}),(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,g.jsx)(P,{onClick:t=>{t.stopPropagation(),ke(e)},title:"Delete customer",style:{marginBottom:"4px"},children:(0,g.jsx)(M,{children:"\u2715"})}),(0,g.jsx)(O,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,g.jsx)(I,{active:e.isActive,children:e.isActive?"Active":"Inactive"})]})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#6B7280"},children:[(0,g.jsxs)("span",{children:[e.points," pts"]}),(0,g.jsxs)("span",{children:[e.totalOrders," orders"]}),(0,g.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,h.vv)(e.totalSpent,we)})]})]},e.id))})]})]})]}),(0,g.jsx)(R,{isOpen:he,onClick:()=>me(!1),children:(0,g.jsxs)(V,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(J,{children:[(0,g.jsx)(W,{children:"Customer Details"}),(0,g.jsx)(Y,{onClick:()=>me(!1),children:"\xd7"})]}),pe&&(0,g.jsxs)(G,{children:[(0,g.jsx)(U,{children:(0,g.jsxs)(S,{style:{marginBottom:"16px"},children:[(0,g.jsx)(B,{tier:pe.loyaltyTier,children:Ee(pe.name)}),(0,g.jsxs)(E,{children:[(0,g.jsx)(z,{style:{fontSize:"18px",marginBottom:"4px"},children:pe.name}),(0,g.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,g.jsx)(O,{tier:pe.loyaltyTier,children:pe.loyaltyTier}),(0,g.jsx)(I,{active:pe.isActive,children:pe.isActive?"Active":"Inactive"})]})]})]})}),(0,g.jsxs)(U,{children:[(0,g.jsx)(_,{children:"Contact Information"}),(0,g.jsxs)(Q,{children:[(0,g.jsxs)(q,{children:[(0,g.jsx)(H,{children:"Phone Number"}),(0,g.jsx)(K,{children:(0,m.FI)(pe.phone)})]}),(0,g.jsxs)(q,{children:[(0,g.jsx)(H,{children:"Email Address"}),(0,g.jsx)(K,{children:pe.email||"Not provided"})]})]})]}),(0,g.jsxs)(U,{children:[(0,g.jsx)(_,{children:"Account Statistics"}),(0,g.jsxs)(Q,{children:[(0,g.jsxs)(q,{children:[(0,g.jsx)(H,{children:"Member Since"}),(0,g.jsx)(K,{children:Be(pe.joinDate)})]}),(0,g.jsxs)(q,{children:[(0,g.jsx)(H,{children:"Last Order"}),(0,g.jsx)(K,{children:pe.lastOrderDate?Be(pe.lastOrderDate):"No orders yet"})]}),(0,g.jsxs)(q,{children:[(0,g.jsx)(H,{children:"Total Orders"}),(0,g.jsxs)(K,{children:[pe.totalOrders," orders"]})]}),(0,g.jsxs)(q,{children:[(0,g.jsx)(H,{children:"Total Spent"}),(0,g.jsx)(K,{children:(0,h.vv)(pe.totalSpent,we)})]}),(0,g.jsxs)(q,{children:[(0,g.jsx)(H,{children:"Loyalty Points"}),(0,g.jsxs)(K,{children:[pe.points.toLocaleString()," points"]})]}),(0,g.jsxs)(q,{children:[(0,g.jsx)(H,{children:"Average Order Value"}),(0,g.jsx)(K,{children:(0,h.vv)(pe.totalOrders>0?pe.totalSpent/pe.totalOrders:0,we)})]})]})]}),pe.favoriteItems.length>0&&(0,g.jsxs)(U,{children:[(0,g.jsx)(_,{children:"Favorite Items"}),(0,g.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:pe.favoriteItems.map((e,t)=>(0,g.jsx)("span",{style:{padding:"4px 8px",background:"#F3F4F6",borderRadius:"6px",fontSize:"12px",color:"#6B7280"},children:e},t))})]}),(0,g.jsxs)(U,{children:[(0,g.jsx)(_,{children:"Recent Activity"}),(0,g.jsx)("div",{style:{color:"#6B7280",fontSize:"14px",fontStyle:"italic"},children:"Order history integration coming soon..."})]})]})]})}),(0,g.jsx)(c.A,{}),(0,g.jsx)(p.Ay,{isOpen:ue,onClose:()=>!fe&&ge(!1),title:"Delete Customer",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(p.yl,{variant:"secondary",onClick:()=>ge(!1),disabled:fe,children:"Cancel"}),(0,g.jsx)(p.yl,{variant:"danger",onClick:async()=>{if(ye){ve(!0);try{const e=await fetch(`/api/customers/${ye.id}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}),t=await e.json();e.ok?window.location.reload():alert(t.message||"Failed to delete customer")}catch(e){console.error("Delete customer error:",e),alert("Failed to delete customer")}finally{ve(!1),ge(!1),je(null)}}},disabled:fe,children:fe?"Deleting...":"Delete"})]}),children:(0,g.jsxs)("div",{children:[(0,g.jsxs)("p",{style:{marginBottom:"16px",color:"#1F2937"},children:["Are you sure you want to delete ",(0,g.jsx)("strong",{children:null===ye||void 0===ye?void 0:ye.name}),"?"]}),(0,g.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"This will permanently remove the customer and all their data from the system. This action cannot be undone."})]})})]}),(0,g.jsx)("style",{children:"\n        @media (max-width: 768px) {\n          .desktop-only { display: none !important; }\n        }\n        @media (min-width: 769px) {\n          .mobile-only { display: none !important; }\n        }\n      "})]})}},2488:(e,t,i)=>{i.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>l});i(9950);var r=i(4752),n=i(4414);const o=r.Ay.div`
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
`,s=r.Ay.input`
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
`,l=e=>{let{children:t,className:i,style:r,...s}=e;return(0,n.jsx)(o,{className:i,style:r,...s,children:t})},d=e=>{let{placeholder:t="Search...",...i}=e;return(0,n.jsx)(s,{placeholder:t,...i})},c=e=>{let{children:t,...i}=e;return(0,n.jsx)(a,{...i,children:t})}},4021:(e,t,i)=>{i.d(t,{i1:()=>s});var r=i(9950),n=i(1367),o=i(6038);const s=()=>{const{user:e}=(0,n.As)(),[t,i]=(0,r.useState)("RM"),[s,a]=(0,r.useState)(Object.keys(o.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let n=r>=0?t[r+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return i("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";i(r)}else i("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),i("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:l,error:c}}},4732:(e,t,i)=>{i.d(t,{Ay:()=>l});i(9950);var r=i(4752),n=i(4414);const o=r.Ay.div`
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
`,s=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,a=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,l=e=>{let{title:t,children:i}=e;return(0,n.jsxs)(o,{children:[(0,n.jsx)(s,{children:t}),i&&(0,n.jsx)(a,{children:i})]})}}}]);