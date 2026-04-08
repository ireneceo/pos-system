"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1748],{1748:(e,t,s)=>{s.r(t),s.d(t,{default:()=>J});var r=s(9950),i=s(4752),n=s(2853),o=s(4492),l=s(9037),a=s(8409),c=s(2488),d=s(2420),p=s(9610),x=s(4021),h=s(6038),u=s(2924),m=s(8012),g=s(5030),j=s(4414);const y=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,v=i.Ay.button`
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
`,f=i.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,b=i.Ay.div`
  flex: 0 0 400px;
  max-width: 400px;
  position: relative;
`,F=i.Ay.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
  pointer-events: none;
`,w=(0,i.Ay)(c.DO)`
  padding-left: 44px;
`,C=i.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  overflow-x: auto;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    overflow: visible;
  }
`,S=i.Ay.div`
  display: grid;
  grid-template-columns: minmax(180px, 2fr) minmax(140px, 1.5fr) 80px 80px 70px 100px 100px 140px 36px;
  gap: 12px;
  padding: 14px 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  align-items: center;

  & > span:nth-child(3) { text-align: center; }
  & > span:nth-child(4) { text-align: right; }
  & > span:nth-child(5) { text-align: right; }
  & > span:nth-child(6) { text-align: right; }
  & > span:nth-child(7) { text-align: center; }
  & > span:nth-child(8) { text-align: right; }

  @media (max-width: 768px) {
    display: none;
  }
`,A=i.Ay.div`
  display: grid;
  grid-template-columns: minmax(180px, 2fr) minmax(140px, 1.5fr) 80px 80px 70px 100px 100px 140px 36px;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid #F6F9FC;
  align-items: center;
  transition: all 0.2s;
  cursor: ${e=>e.clickable?"pointer":"default"};

  & > *:nth-child(3) { text-align: center; justify-self: center; }
  & > *:nth-child(4) { text-align: right; }
  & > *:nth-child(5) { text-align: right; }
  & > *:nth-child(6) { text-align: right; }
  & > *:nth-child(7) { text-align: center; justify-self: center; }
  & > *:nth-child(8) { justify-self: end; }

  &:hover {
    background: ${e=>e.clickable?"#F8FAFC":"transparent"};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`,B=i.Ay.div`
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
`,P=i.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`,k=i.Ay.div`
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
`,D=i.Ay.div`
  flex: 1;
  min-width: 0;
`,z=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,E=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,O=i.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.tier){case"VIP":return"#FEF3C7";case"Gold":return"#FDE68A";case"Silver":return"#F3F4F6";default:return"#DBEAFE"}}};
  color: ${e=>{switch(e.tier){case"VIP":return"#92400E";case"Gold":return"#D97706";case"Silver":return"#6B7280";default:return"#1E40AF"}}};
`,I=i.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,T=i.Ay.div`
  display: flex;
  gap: 8px;
`,$=i.Ay.button`
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
`,_=i.Ay.button`
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
`,W=i.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,M=i.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,L=i.Ay.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,U=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
`,R=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,N=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,V=i.Ay.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,Y=i.Ay.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`,J=()=>{const{t:e}=(0,g.Bd)("customers"),{restaurantId:t}=(0,o.g)(),{customers:s,searchCustomers:i,setShowCustomerModal:J,setCustomerModalMode:G,updateCustomer:H,reloadCustomers:Q}=(0,l.c)(),[q,K]=(0,r.useState)(""),[X,Z]=(0,r.useState)("all"),[ee,te]=(0,r.useState)("all"),[se,re]=(0,r.useState)("name"),[ie,ne]=(0,r.useState)([]),[oe,le]=(0,r.useState)(null),[ae,ce]=(0,r.useState)(!1),[de,pe]=(0,r.useState)(!1),[xe,he]=(0,r.useState)(null),[ue,me]=(0,r.useState)(!1),[ge,je]=(0,r.useState)(null),[ye,ve]=(0,r.useState)(!1),{defaultCurrency:fe}=(0,x.i1)(),[be,Fe]=(0,r.useState)("RM");(0,r.useEffect)(()=>{t&&Q(t)},[t,Q]),(0,r.useEffect)(()=>{fe&&Fe(fe)},[fe]),(0,r.useEffect)(()=>{let e=q?i(q):s;if("all"!==X&&(e=e.filter(e=>e.loyaltyTier===X)),"all"!==ee){const t="active"===ee;e=e.filter(e=>e.isActive===t)}e.sort((e,t)=>{switch(se){case"name":return e.name.localeCompare(t.name);case"joinDate":return new Date(t.joinDate).getTime()-new Date(e.joinDate).getTime();case"totalSpent":return t.totalSpent-e.totalSpent;case"totalOrders":return t.totalOrders-e.totalOrders;case"points":return t.points-e.points;default:return 0}}),ne(e)},[s,q,X,ee,se,i]);const we={totalCustomers:s.length,activeCustomers:s.filter(e=>e.isActive).length,vipCustomers:s.filter(e=>"VIP"===e.loyaltyTier).length,averageOrders:s.length>0?Math.round(s.reduce((e,t)=>e+t.totalOrders,0)/s.length):0},Ce=async e=>{le(e),ce(!0),je(null),ve(!0);try{const s=localStorage.getItem("auth_token"),r=await fetch(`/api/coupons/customer/${e.id}?restaurant_id=${t}`,{headers:{Authorization:`Bearer ${s}`}}),i=await r.json();i.success&&je(i.data)}catch{}ve(!1)},Se=e=>{he(e),pe(!0)},Ae=()=>{G("register"),J(!0)},Be=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),Pe=e=>e.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2);return(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(y,{children:[(0,j.jsx)(m.Ay,{title:"Customers",children:(0,j.jsx)(v,{onClick:Ae,variant:"primary",children:"Add Customer"})}),(0,j.jsxs)(f,{children:[(0,j.jsxs)(c.Qn,{children:[(0,j.jsxs)(c.Jt,{value:X,onChange:e=>Z(e.target.value),children:[(0,j.jsx)("option",{value:"all",children:e("customers:customersPage.allTiers")}),(0,j.jsx)("option",{value:"Bronze",children:e("customers:customersPage.bronze")}),(0,j.jsx)("option",{value:"Silver",children:e("customers:customersPage.silver")}),(0,j.jsx)("option",{value:"Gold",children:e("customers:customersPage.gold")}),(0,j.jsx)("option",{value:"VIP",children:e("customers:customersPage.vip")})]}),(0,j.jsxs)(c.Jt,{value:ee,onChange:e=>te(e.target.value),children:[(0,j.jsx)("option",{value:"all",children:e("customers:customersPage.allStatus")}),(0,j.jsx)("option",{value:"active",children:e("customers:customersPage.active")}),(0,j.jsx)("option",{value:"inactive",children:e("customers:customersPage.inactive")})]}),(0,j.jsxs)(c.Jt,{value:se,onChange:e=>re(e.target.value),children:[(0,j.jsx)("option",{value:"name",children:e("customers:customersPage.sortByName")}),(0,j.jsx)("option",{value:"joinDate",children:e("customers:customersPage.sortByJoinDate")}),(0,j.jsx)("option",{value:"totalSpent",children:e("customers:customersPage.sortByTotalSpent")}),(0,j.jsx)("option",{value:"totalOrders",children:e("customers:customersPage.sortByOrders")}),(0,j.jsx)("option",{value:"points",children:e("customers:customersPage.sortByPoints")})]}),(0,j.jsxs)(b,{children:[(0,j.jsx)(F,{children:"\ud83d\udd0d"}),(0,j.jsx)(w,{type:"text",placeholder:"Search customers by name, phone, or email...",value:q,onChange:e=>K(e.target.value)})]})]}),(0,j.jsxs)(a.MD,{children:[(0,j.jsxs)(a.hI,{color:"#635BFF",children:[(0,j.jsx)(a.v0,{children:e("customers:customersPage.totalCustomers")}),(0,j.jsx)(a.Os,{children:we.totalCustomers})]}),(0,j.jsxs)(a.hI,{color:"#10B981",children:[(0,j.jsx)(a.v0,{children:e("customers:customersPage.activeCustomers")}),(0,j.jsx)(a.Os,{children:we.activeCustomers})]}),(0,j.jsxs)(a.hI,{color:"#F59E0B",children:[(0,j.jsx)(a.v0,{children:e("customers:customersPage.vipMembers")}),(0,j.jsx)(a.Os,{children:we.vipCustomers})]}),(0,j.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,j.jsx)(a.v0,{children:e("customers:customersPage.avgOrdersPerCustomer")}),(0,j.jsx)(a.Os,{children:we.averageOrders})]})]}),(0,j.jsxs)(C,{children:[(0,j.jsxs)(S,{style:{minWidth:"960px"},children:[(0,j.jsx)("span",{children:e("customers:customersPage.customer")}),(0,j.jsx)("span",{children:e("customers:customersPage.contact")}),(0,j.jsx)("span",{children:e("customers:customersPage.tier")}),(0,j.jsx)("span",{children:e("customers:customersPage.points")}),(0,j.jsx)("span",{children:e("customers:customersPage.orders")}),(0,j.jsx)("span",{children:e("customers:customersPage.totalSpent")}),(0,j.jsx)("span",{children:e("customers:customersPage.coupons")}),(0,j.jsx)("span",{children:e("customers:customersPage.actions")}),(0,j.jsx)("span",{})]}),0===ie.length?(0,j.jsxs)(n.pp,{children:[(0,j.jsx)(M,{children:q||"all"!==X||"all"!==ee?"No customers found with the current filters":"No customers registered yet"}),(0,j.jsx)(v,{variant:"primary",onClick:Ae,children:"Add First Customer"})]}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)("div",{className:"desktop-only",style:{minWidth:"960px"},children:ie.map(e=>(0,j.jsxs)(A,{clickable:!0,onClick:()=>Ce(e),children:[(0,j.jsxs)(P,{children:[(0,j.jsx)(k,{tier:e.loyaltyTier,children:Pe(e.name)}),(0,j.jsxs)(D,{children:[(0,j.jsx)(z,{children:e.name}),(0,j.jsxs)(E,{children:["Joined ",Be(e.joinDate),e.lastOrderDate&&` \u2022 Last order ${Be(e.lastOrderDate)}`]})]})]}),(0,j.jsxs)("div",{style:{minWidth:0},children:[(0,j.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937",whiteSpace:"nowrap"},children:(0,u.FI)(e.phone)}),e.email&&(0,j.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.email})]}),(0,j.jsx)(O,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,j.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#1F2937"},children:e.points.toLocaleString()}),(0,j.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:e.totalOrders}),(0,j.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#059669"},children:(0,h.vv)(e.totalSpent,be)}),(0,j.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93",lineHeight:"1.5"},children:[e.couponsAvailable>0&&(0,j.jsxs)("div",{style:{color:"#059669",fontWeight:500},children:[e.couponsAvailable," available"]}),e.couponsUsed>0&&(0,j.jsxs)("div",{children:[e.couponsUsed," used"]}),0===e.couponsAvailable&&0===e.couponsUsed&&(0,j.jsx)("div",{children:"\u2014"})]}),(0,j.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,j.jsx)($,{onClick:()=>Ce(e),children:"View"}),(0,j.jsx)($,{onClick:()=>(async e=>{await H(e.id,{isActive:!e.isActive})})(e),children:e.isActive?"Deactivate":"Activate"})]}),(0,j.jsx)(_,{onClick:t=>{t.stopPropagation(),Se(e)},title:"Delete customer",children:(0,j.jsx)(W,{children:"\u2715"})})]},e.id))}),(0,j.jsx)("div",{className:"mobile-only",children:ie.map(e=>(0,j.jsxs)(B,{onClick:()=>Ce(e),children:[(0,j.jsxs)(P,{style:{marginBottom:"12px"},children:[(0,j.jsx)(k,{tier:e.loyaltyTier,children:Pe(e.name)}),(0,j.jsxs)(D,{children:[(0,j.jsx)(z,{children:e.name}),(0,j.jsx)(E,{children:(0,u.FI)(e.phone)})]}),(0,j.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,j.jsx)(_,{onClick:t=>{t.stopPropagation(),Se(e)},title:"Delete customer",style:{marginBottom:"4px"},children:(0,j.jsx)(W,{children:"\u2715"})}),(0,j.jsx)(O,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,j.jsx)(I,{active:e.isActive,children:e.isActive?"Active":"Inactive"})]})]}),(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#6B7280"},children:[(0,j.jsxs)("span",{children:[e.points," pts"]}),(0,j.jsxs)("span",{children:[e.totalOrders," orders"]}),(0,j.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,h.vv)(e.totalSpent,be)})]}),(e.couponsAvailable>0||e.couponsUsed>0)&&(0,j.jsxs)("div",{style:{display:"flex",gap:"8px",marginTop:"8px",fontSize:"12px"},children:[e.couponsAvailable>0&&(0,j.jsxs)("span",{style:{color:"#059669",fontWeight:500},children:[e.couponsAvailable," coupons available"]}),e.couponsUsed>0&&(0,j.jsxs)("span",{style:{color:"#6B7280"},children:[e.couponsUsed," used"]})]})]},e.id))})]})]})]}),ae&&(0,j.jsx)(p.Ay,{isOpen:!0,onClose:()=>ce(!1),title:"Customer Details",children:oe&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(L,{children:(0,j.jsxs)(P,{style:{marginBottom:"16px"},children:[(0,j.jsx)(k,{tier:oe.loyaltyTier,children:Pe(oe.name)}),(0,j.jsxs)(D,{children:[(0,j.jsx)(z,{style:{fontSize:"18px",marginBottom:"4px"},children:oe.name}),(0,j.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,j.jsx)(O,{tier:oe.loyaltyTier,children:oe.loyaltyTier}),(0,j.jsx)(I,{active:oe.isActive,children:oe.isActive?"Active":"Inactive"})]})]})]})}),(0,j.jsxs)(L,{children:[(0,j.jsx)(U,{children:e("customers:customersPage.contactInformation")}),(0,j.jsxs)(R,{children:[(0,j.jsxs)(N,{children:[(0,j.jsx)(V,{children:e("customers:customersPage.phoneNumber")}),(0,j.jsx)(Y,{children:(0,u.FI)(oe.phone)})]}),(0,j.jsxs)(N,{children:[(0,j.jsx)(V,{children:e("customers:customersPage.emailAddress")}),(0,j.jsx)(Y,{children:oe.email||"Not provided"})]})]})]}),(0,j.jsxs)(L,{children:[(0,j.jsx)(U,{children:e("customers:customersPage.accountStatistics")}),(0,j.jsxs)(R,{children:[(0,j.jsxs)(N,{children:[(0,j.jsx)(V,{children:e("customers:customersPage.memberSince")}),(0,j.jsx)(Y,{children:Be(oe.joinDate)})]}),(0,j.jsxs)(N,{children:[(0,j.jsx)(V,{children:e("customers:customersPage.lastOrder")}),(0,j.jsx)(Y,{children:oe.lastOrderDate?Be(oe.lastOrderDate):"No orders yet"})]}),(0,j.jsxs)(N,{children:[(0,j.jsx)(V,{children:e("customers:customersPage.totalOrders")}),(0,j.jsxs)(Y,{children:[oe.totalOrders," orders"]})]}),(0,j.jsxs)(N,{children:[(0,j.jsx)(V,{children:e("customers:customersPage.totalSpent")}),(0,j.jsx)(Y,{children:(0,h.vv)(oe.totalSpent,be)})]}),(0,j.jsxs)(N,{children:[(0,j.jsx)(V,{children:e("customers:customersPage.loyaltyPoints")}),(0,j.jsxs)(Y,{children:[oe.points.toLocaleString()," points"]})]}),(0,j.jsxs)(N,{children:[(0,j.jsx)(V,{children:e("customers:customersPage.averageOrderValue")}),(0,j.jsx)(Y,{children:(0,h.vv)(oe.totalOrders>0?oe.totalSpent/oe.totalOrders:0,be)})]})]})]}),oe.favoriteItems.length>0&&(0,j.jsxs)(L,{children:[(0,j.jsx)(U,{children:e("customers:customersPage.favoriteItems")}),(0,j.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:oe.favoriteItems.map((e,t)=>(0,j.jsx)("span",{style:{padding:"4px 8px",background:"#F3F4F6",borderRadius:"6px",fontSize:"12px",color:"#6B7280"},children:e},t))})]}),(0,j.jsxs)(L,{children:[(0,j.jsx)(U,{children:e("customers:customersPage.coupons")}),ye?(0,j.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:e("customers:customersPage.loading")}):ge?(0,j.jsxs)(j.Fragment,{children:[ge.available.length>0&&(0,j.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,j.jsxs)("div",{style:{fontSize:"13px",fontWeight:600,color:"#059669",marginBottom:"8px"},children:["Available (",ge.available.length,")"]}),(0,j.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:ge.available.map(e=>(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px"},children:[(0,j.jsxs)("div",{children:[(0,j.jsx)("span",{style:{fontSize:"14px",fontWeight:700,color:"#059669",fontFamily:"monospace",letterSpacing:"0.5px"},children:e.code}),e.name&&(0,j.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:e.name})]}),(0,j.jsxs)("div",{style:{textAlign:"right"},children:[(0,j.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#1F2937"},children:"percentage"===e.type?`${e.value}% off`:(0,h.vv)(e.value,be)+" off"}),e.min_order>0&&(0,j.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:["Min. ",(0,h.vv)(e.min_order,be)]}),e.per_user_limit&&(0,j.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:[e.my_usage,"/",e.per_user_limit," used"]}),e.valid_until&&(0,j.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:["Until ",new Date(e.valid_until).toLocaleDateString()]})]})]},e.id))})]}),ge.history.length>0&&(0,j.jsxs)("div",{children:[(0,j.jsxs)("div",{style:{fontSize:"13px",fontWeight:600,color:"#6B7280",marginBottom:"8px"},children:["Used (",ge.history.length,")"]}),(0,j.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:ge.history.map((e,t)=>(0,j.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 14px",background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"13px"},children:[(0,j.jsxs)("div",{children:[(0,j.jsx)("span",{style:{fontWeight:600,fontFamily:"monospace"},children:e.code}),(0,j.jsxs)("span",{style:{color:"#6B7280",marginLeft:"8px"},children:["#",e.order_number]})]}),(0,j.jsxs)("div",{style:{textAlign:"right"},children:[(0,j.jsxs)("span",{style:{fontWeight:600,color:"#DC2626"},children:["-",(0,h.vv)(e.discount,be)]}),(0,j.jsx)("span",{style:{color:"#9CA3AF",marginLeft:"8px",fontSize:"12px"},children:new Date(e.used_at).toLocaleDateString()})]})]},t))})]}),0===ge.available.length&&0===ge.history.length&&(0,j.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:e("customers:customersPage.noCouponsAvailableOrUsed")})]}):(0,j.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:e("customers:customersPage.noCouponData")})]})]})}),(0,j.jsx)(d.A,{}),(0,j.jsx)(p.Ay,{isOpen:de,onClose:()=>!ue&&pe(!1),title:"Delete Customer",footer:(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(p.yl,{variant:"secondary",onClick:()=>pe(!1),disabled:ue,children:"Cancel"}),(0,j.jsx)(p.yl,{variant:"danger",onClick:async()=>{if(xe){me(!0);try{const e=await fetch(`/api/customers/${xe.id}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}),t=await e.json();e.ok?window.location.reload():alert(t.message||"Failed to delete customer")}catch(e){console.error("Delete customer error:",e),alert("Failed to delete customer")}finally{me(!1),pe(!1),he(null)}}},disabled:ue,children:ue?"Deleting...":"Delete"})]}),children:(0,j.jsxs)("div",{children:[(0,j.jsxs)("p",{style:{marginBottom:"16px",color:"#1F2937"},children:["Are you sure you want to delete ",(0,j.jsx)("strong",{children:null===xe||void 0===xe?void 0:xe.name}),"?"]}),(0,j.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"This will permanently remove the customer and all their data from the system. This action cannot be undone."})]})})]}),(0,j.jsx)("style",{children:"\n        @media (max-width: 768px) {\n          .desktop-only { display: none !important; }\n        }\n        @media (min-width: 769px) {\n          .mobile-only { display: none !important; }\n        }\n      "})]})}},4021:(e,t,s)=>{s.d(t,{i1:()=>o});var r=s(9950),i=s(1367),n=s(6038);const o=()=>{const{user:e}=(0,i.As)(),[t,s]=(0,r.useState)("RM"),[o]=(0,r.useState)(Object.keys(n.DL)),[l,a]=(0,r.useState)(!0),[c,d]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return s("RM"),void a(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var n;const e=await t.json(),r=e.currency||(null===(n=e.operation_settings)||void 0===n?void 0:n.currency)||"MYR";s(r)}else s("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),d("Failed to load currency settings"),s("MYR")}finally{a(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:l,error:c}}}}]);