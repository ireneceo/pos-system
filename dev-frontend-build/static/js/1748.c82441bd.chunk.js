"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1748],{1748:(e,t,i)=>{i.r(t),i.d(t,{default:()=>Q});var r=i(8819),n=i(9950),o=i(4752),s=i(4492),l=i(9037),a=i(2674),d=i(2488),c=i(2420),x=i(9610),p=i(4021),h=i(6038),m=i(2924),u=i(8012),g=i(4414);const y=o.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,j=o.Ay.button`
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
`,f=o.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,v=o.Ay.div`
  flex: 0 0 400px;
  max-width: 400px;
  position: relative;
`,w=o.Ay.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${r.w.colors.text.secondary};
  font-size: 16px;
  pointer-events: none;
`,b=(0,o.Ay)(d.DO)`
  padding-left: 44px;
`,A=o.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid ${r.w.colors.border};
  overflow: hidden;
`,C=o.Ay.div`
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

  /* 정렬 규칙: Tier 가운데, 숫자는 우측, 액션은 우측 */
  & > span:nth-child(3) { text-align: center; } /* Tier */
  & > span:nth-child(4) { text-align: right; } /* Points */
  & > span:nth-child(5) { text-align: right; } /* Orders */
  & > span:nth-child(6) { text-align: right; } /* Total Spent */
  & > span:nth-child(7) { text-align: right; } /* Actions */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`,F=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr 120px 100px 100px 120px 150px 40px;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #F6F9FC;
  align-items: center;
  transition: all 0.2s;
  cursor: ${e=>e.clickable?"pointer":"default"};

  /* 정렬 규칙: Tier 가운데, 숫자는 우측, 액션은 우측 */
  & > *:nth-child(3) { text-align: center; justify-self: center; } /* Tier (LoyaltyBadge) */
  & > *:nth-child(4) { text-align: right; } /* Points */
  & > *:nth-child(5) { text-align: right; } /* Orders */
  & > *:nth-child(6) { text-align: right; } /* Total Spent */
  & > *:nth-child(7) { justify-self: end; } /* Actions */

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
`,S=o.Ay.div`
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
`,k=o.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
`,D=o.Ay.div`
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
`,O=o.Ay.div`
  flex: 1;
`,B=o.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`,$=o.Ay.div`
  font-size: 12px;
  color: ${r.w.colors.text.muted};
`,z=o.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.tier){case"VIP":return"#FEF3C7";case"Gold":return"#FDE68A";case"Silver":return"#F3F4F6";default:return"#DBEAFE"}}};
  color: ${e=>{switch(e.tier){case"VIP":return"#92400E";case"Gold":return"#D97706";case"Silver":return"#6B7280";default:return"#1E40AF"}}};
`,T=o.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,I=o.Ay.div`
  display: flex;
  gap: 8px;
`,E=o.Ay.button`
  padding: 6px 12px;
  font-size: 12px;
  color: #6B7C93;
  background: none;
  border: 1px solid ${r.w.colors.border};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${r.w.colors.backgroundAlt};
    color: #0A2540;
    border-color: #C7D2FE;
  }
`,P=o.Ay.button`
  padding: 6px;
  background: #F6F9FC;
  border: 1px solid ${r.w.colors.border};
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
`,M=o.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: ${r.w.colors.text.secondary};
  display: inline-block;
  line-height: 1;
`,L=o.Ay.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7C93;
`,N=o.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,R=o.Ay.div`
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
`,V=o.Ay.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,J=o.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
`,W=o.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,G=o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,_=o.Ay.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,Y=o.Ay.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`,Q=()=>{const{restaurantId:e}=(0,s.g)(),{customers:t,searchCustomers:i,setShowCustomerModal:r,setCustomerModalMode:o,updateCustomer:Q,reloadCustomers:U}=(0,l.c)(),[H,q]=(0,n.useState)(""),[K,X]=(0,n.useState)("all"),[Z,ee]=(0,n.useState)("all"),[te,ie]=(0,n.useState)("name"),[re,ne]=(0,n.useState)([]),[oe,se]=(0,n.useState)(null),[le,ae]=(0,n.useState)(!1),[de,ce]=(0,n.useState)(!1),[xe,pe]=(0,n.useState)(null),[he,me]=(0,n.useState)(!1),{defaultCurrency:ue}=(0,p.i1)(),[ge,ye]=(0,n.useState)("RM");(0,n.useEffect)(()=>{e&&U(e)},[e,U]),(0,n.useEffect)(()=>{ue&&ye(ue)},[ue]),(0,n.useEffect)(()=>{let e=H?i(H):t;if("all"!==K&&(e=e.filter(e=>e.loyaltyTier===K)),"all"!==Z){const t="active"===Z;e=e.filter(e=>e.isActive===t)}e.sort((e,t)=>{switch(te){case"name":return e.name.localeCompare(t.name);case"joinDate":return new Date(t.joinDate).getTime()-new Date(e.joinDate).getTime();case"totalSpent":return t.totalSpent-e.totalSpent;case"totalOrders":return t.totalOrders-e.totalOrders;case"points":return t.points-e.points;default:return 0}}),ne(e)},[t,H,K,Z,te,i]);const je={totalCustomers:t.length,activeCustomers:t.filter(e=>e.isActive).length,vipCustomers:t.filter(e=>"VIP"===e.loyaltyTier).length,averageOrders:t.length>0?Math.round(t.reduce((e,t)=>e+t.totalOrders,0)/t.length):0},fe=e=>{se(e),ae(!0)},ve=e=>{pe(e),ce(!0)},we=()=>{o("register"),r(!0)},be=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),Ae=e=>e.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(y,{children:[(0,g.jsx)(u.Ay,{title:"Customers",children:(0,g.jsx)(j,{onClick:we,variant:"primary",children:"Add Customer"})}),(0,g.jsxs)(f,{children:[(0,g.jsxs)(d.Qn,{children:[(0,g.jsxs)(v,{children:[(0,g.jsx)(w,{children:"\ud83d\udd0d"}),(0,g.jsx)(b,{type:"text",placeholder:"Search customers by name, phone, or email...",value:H,onChange:e=>q(e.target.value)})]}),(0,g.jsxs)(d.Jt,{value:K,onChange:e=>X(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Tiers"}),(0,g.jsx)("option",{value:"Bronze",children:"Bronze"}),(0,g.jsx)("option",{value:"Silver",children:"Silver"}),(0,g.jsx)("option",{value:"Gold",children:"Gold"}),(0,g.jsx)("option",{value:"VIP",children:"VIP"})]}),(0,g.jsxs)(d.Jt,{value:Z,onChange:e=>ee(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Status"}),(0,g.jsx)("option",{value:"active",children:"Active"}),(0,g.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,g.jsxs)(d.Jt,{value:te,onChange:e=>ie(e.target.value),children:[(0,g.jsx)("option",{value:"name",children:"Sort by Name"}),(0,g.jsx)("option",{value:"joinDate",children:"Sort by Join Date"}),(0,g.jsx)("option",{value:"totalSpent",children:"Sort by Total Spent"}),(0,g.jsx)("option",{value:"totalOrders",children:"Sort by Orders"}),(0,g.jsx)("option",{value:"points",children:"Sort by Points"})]})]}),(0,g.jsxs)(a.MD,{children:[(0,g.jsxs)(a.hI,{color:"#635BFF",children:[(0,g.jsx)(a.v0,{children:"Total Customers"}),(0,g.jsx)(a.Os,{children:je.totalCustomers})]}),(0,g.jsxs)(a.hI,{color:"#10B981",children:[(0,g.jsx)(a.v0,{children:"Active Customers"}),(0,g.jsx)(a.Os,{children:je.activeCustomers})]}),(0,g.jsxs)(a.hI,{color:"#F59E0B",children:[(0,g.jsx)(a.v0,{children:"VIP Members"}),(0,g.jsx)(a.Os,{children:je.vipCustomers})]}),(0,g.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,g.jsx)(a.v0,{children:"Avg Orders per Customer"}),(0,g.jsx)(a.Os,{children:je.averageOrders})]})]}),(0,g.jsxs)(A,{children:[(0,g.jsxs)(C,{className:"desktop-only",children:[(0,g.jsx)("span",{children:"Customer"}),(0,g.jsx)("span",{children:"Contact"}),(0,g.jsx)("span",{children:"Tier"}),(0,g.jsx)("span",{children:"Points"}),(0,g.jsx)("span",{children:"Orders"}),(0,g.jsx)("span",{children:"Total Spent"}),(0,g.jsx)("span",{children:"Actions"}),(0,g.jsx)("span",{})]}),0===re.length?(0,g.jsxs)(L,{children:[(0,g.jsx)(N,{children:H||"all"!==K||"all"!==Z?"No customers found with the current filters":"No customers registered yet"}),(0,g.jsx)(j,{variant:"primary",onClick:we,children:"Add First Customer"})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{className:"desktop-only",children:re.map(e=>(0,g.jsxs)(F,{clickable:!0,onClick:()=>fe(e),children:[(0,g.jsxs)(k,{children:[(0,g.jsx)(D,{tier:e.loyaltyTier,children:Ae(e.name)}),(0,g.jsxs)(O,{children:[(0,g.jsx)(B,{children:e.name}),(0,g.jsxs)($,{children:["Joined ",be(e.joinDate),e.lastOrderDate&&` \u2022 Last order ${be(e.lastOrderDate)}`]})]})]}),(0,g.jsxs)("div",{children:[(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:(0,m.FI)(e.phone)}),e.email&&(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px"},children:e.email})]}),(0,g.jsx)(z,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#1F2937"},children:e.points.toLocaleString()}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:e.totalOrders}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#059669"},children:(0,h.vv)(e.totalSpent,ge)}),(0,g.jsxs)(I,{onClick:e=>e.stopPropagation(),children:[(0,g.jsx)(E,{onClick:()=>fe(e),children:"View"}),(0,g.jsx)(E,{onClick:()=>(async e=>{await Q(e.id,{isActive:!e.isActive})})(e),children:e.isActive?"Deactivate":"Activate"})]}),(0,g.jsx)(P,{onClick:t=>{t.stopPropagation(),ve(e)},title:"Delete customer",children:(0,g.jsx)(M,{children:"\u2715"})})]},e.id))}),(0,g.jsx)("div",{className:"mobile-only",children:re.map(e=>(0,g.jsxs)(S,{onClick:()=>fe(e),children:[(0,g.jsxs)(k,{style:{marginBottom:"12px"},children:[(0,g.jsx)(D,{tier:e.loyaltyTier,children:Ae(e.name)}),(0,g.jsxs)(O,{children:[(0,g.jsx)(B,{children:e.name}),(0,g.jsx)($,{children:(0,m.FI)(e.phone)})]}),(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,g.jsx)(P,{onClick:t=>{t.stopPropagation(),ve(e)},title:"Delete customer",style:{marginBottom:"4px"},children:(0,g.jsx)(M,{children:"\u2715"})}),(0,g.jsx)(z,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,g.jsx)(T,{active:e.isActive,children:e.isActive?"Active":"Inactive"})]})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#6B7280"},children:[(0,g.jsxs)("span",{children:[e.points," pts"]}),(0,g.jsxs)("span",{children:[e.totalOrders," orders"]}),(0,g.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,h.vv)(e.totalSpent,ge)})]})]},e.id))})]})]})]}),(0,g.jsx)(R,{isOpen:le,onClick:()=>ae(!1),children:(0,g.jsxs)(a.$m,{onClick:e=>e.stopPropagation(),children:[(0,g.jsxs)(a.rQ,{children:[(0,g.jsx)(a.wt,{children:"Customer Details"}),(0,g.jsx)(a.Jn,{onClick:()=>ae(!1),children:"\xd7"})]}),oe&&(0,g.jsxs)(a.cw,{children:[(0,g.jsx)(V,{children:(0,g.jsxs)(k,{style:{marginBottom:"16px"},children:[(0,g.jsx)(D,{tier:oe.loyaltyTier,children:Ae(oe.name)}),(0,g.jsxs)(O,{children:[(0,g.jsx)(B,{style:{fontSize:"18px",marginBottom:"4px"},children:oe.name}),(0,g.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,g.jsx)(z,{tier:oe.loyaltyTier,children:oe.loyaltyTier}),(0,g.jsx)(T,{active:oe.isActive,children:oe.isActive?"Active":"Inactive"})]})]})]})}),(0,g.jsxs)(V,{children:[(0,g.jsx)(J,{children:"Contact Information"}),(0,g.jsxs)(W,{children:[(0,g.jsxs)(G,{children:[(0,g.jsx)(_,{children:"Phone Number"}),(0,g.jsx)(Y,{children:(0,m.FI)(oe.phone)})]}),(0,g.jsxs)(G,{children:[(0,g.jsx)(_,{children:"Email Address"}),(0,g.jsx)(Y,{children:oe.email||"Not provided"})]})]})]}),(0,g.jsxs)(V,{children:[(0,g.jsx)(J,{children:"Account Statistics"}),(0,g.jsxs)(W,{children:[(0,g.jsxs)(G,{children:[(0,g.jsx)(_,{children:"Member Since"}),(0,g.jsx)(Y,{children:be(oe.joinDate)})]}),(0,g.jsxs)(G,{children:[(0,g.jsx)(_,{children:"Last Order"}),(0,g.jsx)(Y,{children:oe.lastOrderDate?be(oe.lastOrderDate):"No orders yet"})]}),(0,g.jsxs)(G,{children:[(0,g.jsx)(_,{children:"Total Orders"}),(0,g.jsxs)(Y,{children:[oe.totalOrders," orders"]})]}),(0,g.jsxs)(G,{children:[(0,g.jsx)(_,{children:"Total Spent"}),(0,g.jsx)(Y,{children:(0,h.vv)(oe.totalSpent,ge)})]}),(0,g.jsxs)(G,{children:[(0,g.jsx)(_,{children:"Loyalty Points"}),(0,g.jsxs)(Y,{children:[oe.points.toLocaleString()," points"]})]}),(0,g.jsxs)(G,{children:[(0,g.jsx)(_,{children:"Average Order Value"}),(0,g.jsx)(Y,{children:(0,h.vv)(oe.totalOrders>0?oe.totalSpent/oe.totalOrders:0,ge)})]})]})]}),oe.favoriteItems.length>0&&(0,g.jsxs)(V,{children:[(0,g.jsx)(J,{children:"Favorite Items"}),(0,g.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:oe.favoriteItems.map((e,t)=>(0,g.jsx)("span",{style:{padding:"4px 8px",background:"#F3F4F6",borderRadius:"6px",fontSize:"12px",color:"#6B7280"},children:e},t))})]}),(0,g.jsxs)(V,{children:[(0,g.jsx)(J,{children:"Recent Activity"}),(0,g.jsx)("div",{style:{color:"#6B7280",fontSize:"14px",fontStyle:"italic"},children:"Order history integration coming soon..."})]})]})]})}),(0,g.jsx)(c.A,{}),(0,g.jsx)(x.Ay,{isOpen:de,onClose:()=>!he&&ce(!1),title:"Delete Customer",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(x.yl,{variant:"secondary",onClick:()=>ce(!1),disabled:he,children:"Cancel"}),(0,g.jsx)(x.yl,{variant:"danger",onClick:async()=>{if(xe){me(!0);try{const e=await fetch(`/api/customers/${xe.id}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}),t=await e.json();e.ok?window.location.reload():alert(t.message||"Failed to delete customer")}catch(e){console.error("Delete customer error:",e),alert("Failed to delete customer")}finally{me(!1),ce(!1),pe(null)}}},disabled:he,children:he?"Deleting...":"Delete"})]}),children:(0,g.jsxs)("div",{children:[(0,g.jsxs)("p",{style:{marginBottom:"16px",color:"#1F2937"},children:["Are you sure you want to delete ",(0,g.jsx)("strong",{children:null===xe||void 0===xe?void 0:xe.name}),"?"]}),(0,g.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"This will permanently remove the customer and all their data from the system. This action cannot be undone."})]})})]}),(0,g.jsx)("style",{children:"\n        @media (max-width: 768px) {\n          .desktop-only { display: none !important; }\n        }\n        @media (min-width: 769px) {\n          .mobile-only { display: none !important; }\n        }\n      "})]})}},2488:(e,t,i)=>{i.d(t,{DO:()=>c,Jt:()=>x,Qn:()=>d});var r=i(8819),n=(i(9950),i(4752)),o=i(4414);const s=n.Ay.div`
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
`,l=n.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${r.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px ${r.w.colors.primaryLight};
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
`,a=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${r.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${r.w.colors.primary};
    box-shadow: 0 0 0 3px ${r.w.colors.primaryLight};
  }

  &:disabled {
    background: ${r.w.colors.surfaceHover};
    color: ${r.w.colors.text.muted};
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
`,d=e=>{let{children:t,className:i,style:r,...n}=e;return(0,o.jsx)(s,{className:i,style:r,...n,children:t})},c=e=>{let{placeholder:t="Search...",...i}=e;return(0,o.jsx)(l,{placeholder:t,...i})},x=e=>{let{children:t,...i}=e;return(0,o.jsx)(a,{...i,children:t})}},4021:(e,t,i)=>{i.d(t,{i1:()=>s});var r=i(9950),n=i(1367),o=i(6038);const s=()=>{const{user:e}=(0,n.As)(),[t,i]=(0,r.useState)("RM"),[s,l]=(0,r.useState)(Object.keys(o.DL)),[a,d]=(0,r.useState)(!0),[c,x]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let n=r>=0?t[r+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return i("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var o;const e=await t.json(),r=e.currency||(null===(o=e.operation_settings)||void 0===o?void 0:o.currency)||"RM";i(r)}else i("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),x("Failed to load currency settings"),i("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:a,error:c}}},8012:(e,t,i)=>{i.d(t,{Ay:()=>d});var r=i(8819),n=(i(9950),i(4752)),o=i(4414);const s=n.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${r.w.colors.border};
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
`,l=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${r.w.colors.secondary};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    flex: 1;
    min-width: 0;
  }
`,a=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`,d=e=>{let{title:t,children:i}=e;return(0,o.jsxs)(s,{children:[(0,o.jsx)(l,{children:t}),i&&(0,o.jsx)(a,{children:i})]})}}}]);