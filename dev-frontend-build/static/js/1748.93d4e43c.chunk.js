"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1748],{1748:(e,t,s)=>{s.r(t),s.d(t,{default:()=>G});var r=s(9950),i=s(4752),n=s(2853),o=s(4492),l=s(5837),a=s(8409),c=s(2488),d=s(2420),p=s(9610),x=s(4021),h=s(6038),u=s(2924),m=s(8012),g=s(5030),j=s(9955),y=s(4414);const v=i.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,f=i.Ay.button`
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
`,b=i.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,F=i.Ay.div`
  flex: 0 0 400px;
  max-width: 400px;
  position: relative;
`,w=i.Ay.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
  pointer-events: none;
`,C=(0,i.Ay)(c.DO)`
  padding-left: 44px;
`,A=i.Ay.div`
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
`,B=i.Ay.div`
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
`,P=i.Ay.div`
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
`,D=i.Ay.div`
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
`,z=i.Ay.div`
  flex: 1;
  min-width: 0;
`,E=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,O=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,I=i.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.tier){case"VIP":return"#FEF3C7";case"Gold":return"#FDE68A";case"Silver":return"#F3F4F6";default:return"#DBEAFE"}}};
  color: ${e=>{switch(e.tier){case"VIP":return"#92400E";case"Gold":return"#D97706";case"Silver":return"#6B7280";default:return"#1E40AF"}}};
`,T=i.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,$=i.Ay.div`
  display: flex;
  gap: 8px;
`,W=i.Ay.button`
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
`,M=i.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,L=i.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,U=i.Ay.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,R=i.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
`,N=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,V=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Y=i.Ay.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,J=i.Ay.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`,G=()=>{const{t:e}=(0,g.Bd)("customers"),{restaurantId:t}=(0,o.g)(),{customers:s,searchCustomers:i,setShowCustomerModal:G,setCustomerModalMode:H,updateCustomer:Q,reloadCustomers:q}=(0,l.c)(),[K,X]=(0,r.useState)(""),[Z,ee]=(0,r.useState)("all"),[te,se]=(0,r.useState)("all"),[re,ie]=(0,r.useState)("name"),[ne,oe]=(0,r.useState)([]),[le,ae]=(0,r.useState)(null),[ce,de]=(0,r.useState)(!1),[pe,xe]=(0,r.useState)(!1),[he,ue]=(0,r.useState)(null),[me,ge]=(0,r.useState)(!1),[je,ye]=(0,r.useState)(null),[ve,fe]=(0,r.useState)(!1),{defaultCurrency:be}=(0,x.i1)(),[Fe,we]=(0,r.useState)("RM");(0,r.useEffect)(()=>{t&&q(t)},[t,q]),(0,r.useEffect)(()=>{be&&we(be)},[be]),(0,r.useEffect)(()=>{let e=K?i(K):s;if("all"!==Z&&(e=e.filter(e=>e.loyaltyTier===Z)),"all"!==te){const t="active"===te;e=e.filter(e=>e.isActive===t)}e.sort((e,t)=>{switch(re){case"name":return e.name.localeCompare(t.name);case"joinDate":return new Date(t.joinDate).getTime()-new Date(e.joinDate).getTime();case"totalSpent":return t.totalSpent-e.totalSpent;case"totalOrders":return t.totalOrders-e.totalOrders;case"points":return t.points-e.points;default:return 0}}),oe(e)},[s,K,Z,te,re,i]);const Ce={totalCustomers:s.length,activeCustomers:s.filter(e=>e.isActive).length,vipCustomers:s.filter(e=>"VIP"===e.loyaltyTier).length,averageOrders:s.length>0?Math.round(s.reduce((e,t)=>e+t.totalOrders,0)/s.length):0},Ae=async e=>{ae(e),de(!0),ye(null),fe(!0);try{const s=(0,j.c4)(),r=await fetch(`/api/coupons/customer/${e.id}?restaurant_id=${t}`,{headers:{Authorization:`Bearer ${s}`}}),i=await r.json();i.success&&ye(i.data)}catch{}fe(!1)},Se=e=>{ue(e),xe(!0)},Be=()=>{H("register"),G(!0)},Pe=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),De=e=>e.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2);return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(v,{children:[(0,y.jsx)(m.Ay,{title:"Customers",children:(0,y.jsx)(f,{onClick:Be,variant:"primary",children:"Add Customer"})}),(0,y.jsxs)(b,{children:[(0,y.jsxs)(c.Qn,{children:[(0,y.jsxs)(c.Jt,{value:Z,onChange:e=>ee(e.target.value),children:[(0,y.jsx)("option",{value:"all",children:e("customers:customersPage.allTiers")}),(0,y.jsx)("option",{value:"Bronze",children:e("customers:customersPage.bronze")}),(0,y.jsx)("option",{value:"Silver",children:e("customers:customersPage.silver")}),(0,y.jsx)("option",{value:"Gold",children:e("customers:customersPage.gold")}),(0,y.jsx)("option",{value:"VIP",children:e("customers:customersPage.vip")})]}),(0,y.jsxs)(c.Jt,{value:te,onChange:e=>se(e.target.value),children:[(0,y.jsx)("option",{value:"all",children:e("customers:customersPage.allStatus")}),(0,y.jsx)("option",{value:"active",children:e("customers:customersPage.active")}),(0,y.jsx)("option",{value:"inactive",children:e("customers:customersPage.inactive")})]}),(0,y.jsxs)(c.Jt,{value:re,onChange:e=>ie(e.target.value),children:[(0,y.jsx)("option",{value:"name",children:e("customers:customersPage.sortByName")}),(0,y.jsx)("option",{value:"joinDate",children:e("customers:customersPage.sortByJoinDate")}),(0,y.jsx)("option",{value:"totalSpent",children:e("customers:customersPage.sortByTotalSpent")}),(0,y.jsx)("option",{value:"totalOrders",children:e("customers:customersPage.sortByOrders")}),(0,y.jsx)("option",{value:"points",children:e("customers:customersPage.sortByPoints")})]}),(0,y.jsxs)(F,{children:[(0,y.jsx)(w,{children:"\ud83d\udd0d"}),(0,y.jsx)(C,{type:"text",placeholder:"Search customers by name, phone, or email...",value:K,onChange:e=>X(e.target.value)})]})]}),(0,y.jsxs)(a.MD,{children:[(0,y.jsxs)(a.hI,{color:"#635BFF",children:[(0,y.jsx)(a.v0,{children:e("customers:customersPage.totalCustomers")}),(0,y.jsx)(a.Os,{children:Ce.totalCustomers})]}),(0,y.jsxs)(a.hI,{color:"#10B981",children:[(0,y.jsx)(a.v0,{children:e("customers:customersPage.activeCustomers")}),(0,y.jsx)(a.Os,{children:Ce.activeCustomers})]}),(0,y.jsxs)(a.hI,{color:"#F59E0B",children:[(0,y.jsx)(a.v0,{children:e("customers:customersPage.vipMembers")}),(0,y.jsx)(a.Os,{children:Ce.vipCustomers})]}),(0,y.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,y.jsx)(a.v0,{children:e("customers:customersPage.avgOrdersPerCustomer")}),(0,y.jsx)(a.Os,{children:Ce.averageOrders})]})]}),(0,y.jsxs)(A,{children:[(0,y.jsxs)(S,{style:{minWidth:"960px"},children:[(0,y.jsx)("span",{children:e("customers:customersPage.customer")}),(0,y.jsx)("span",{children:e("customers:customersPage.contact")}),(0,y.jsx)("span",{children:e("customers:customersPage.tier")}),(0,y.jsx)("span",{children:e("customers:customersPage.points")}),(0,y.jsx)("span",{children:e("customers:customersPage.orders")}),(0,y.jsx)("span",{children:e("customers:customersPage.totalSpent")}),(0,y.jsx)("span",{children:e("customers:customersPage.coupons")}),(0,y.jsx)("span",{children:e("customers:customersPage.actions")}),(0,y.jsx)("span",{})]}),0===ne.length?(0,y.jsxs)(n.pp,{children:[(0,y.jsx)(L,{children:K||"all"!==Z||"all"!==te?"No customers found with the current filters":"No customers registered yet"}),(0,y.jsx)(f,{variant:"primary",onClick:Be,children:"Add First Customer"})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)("div",{className:"desktop-only",style:{minWidth:"960px"},children:ne.map(e=>(0,y.jsxs)(B,{clickable:!0,onClick:()=>Ae(e),children:[(0,y.jsxs)(D,{children:[(0,y.jsx)(k,{tier:e.loyaltyTier,children:De(e.name)}),(0,y.jsxs)(z,{children:[(0,y.jsx)(E,{children:e.name}),(0,y.jsxs)(O,{children:["Joined ",Pe(e.joinDate),e.lastOrderDate&&` \u2022 Last order ${Pe(e.lastOrderDate)}`]})]})]}),(0,y.jsxs)("div",{style:{minWidth:0},children:[(0,y.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937",whiteSpace:"nowrap"},children:(0,u.FI)(e.phone)}),e.email&&(0,y.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.email})]}),(0,y.jsx)(I,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,y.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#1F2937"},children:e.points.toLocaleString()}),(0,y.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:e.totalOrders}),(0,y.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#059669"},children:(0,h.vv)(e.totalSpent,Fe)}),(0,y.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93",lineHeight:"1.5"},children:[e.couponsAvailable>0&&(0,y.jsxs)("div",{style:{color:"#059669",fontWeight:500},children:[e.couponsAvailable," available"]}),e.couponsUsed>0&&(0,y.jsxs)("div",{children:[e.couponsUsed," used"]}),0===e.couponsAvailable&&0===e.couponsUsed&&(0,y.jsx)("div",{children:"\u2014"})]}),(0,y.jsxs)($,{onClick:e=>e.stopPropagation(),children:[(0,y.jsx)(W,{onClick:()=>Ae(e),children:"View"}),(0,y.jsx)(W,{onClick:()=>(async e=>{await Q(e.id,{isActive:!e.isActive})})(e),children:e.isActive?"Deactivate":"Activate"})]}),(0,y.jsx)(_,{onClick:t=>{t.stopPropagation(),Se(e)},title:"Delete customer",children:(0,y.jsx)(M,{children:"\u2715"})})]},e.id))}),(0,y.jsx)("div",{className:"mobile-only",children:ne.map(e=>(0,y.jsxs)(P,{onClick:()=>Ae(e),children:[(0,y.jsxs)(D,{style:{marginBottom:"12px"},children:[(0,y.jsx)(k,{tier:e.loyaltyTier,children:De(e.name)}),(0,y.jsxs)(z,{children:[(0,y.jsx)(E,{children:e.name}),(0,y.jsx)(O,{children:(0,u.FI)(e.phone)})]}),(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,y.jsx)(_,{onClick:t=>{t.stopPropagation(),Se(e)},title:"Delete customer",style:{marginBottom:"4px"},children:(0,y.jsx)(M,{children:"\u2715"})}),(0,y.jsx)(I,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,y.jsx)(T,{active:e.isActive,children:e.isActive?"Active":"Inactive"})]})]}),(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#6B7280"},children:[(0,y.jsxs)("span",{children:[e.points," pts"]}),(0,y.jsxs)("span",{children:[e.totalOrders," orders"]}),(0,y.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,h.vv)(e.totalSpent,Fe)})]}),(e.couponsAvailable>0||e.couponsUsed>0)&&(0,y.jsxs)("div",{style:{display:"flex",gap:"8px",marginTop:"8px",fontSize:"12px"},children:[e.couponsAvailable>0&&(0,y.jsxs)("span",{style:{color:"#059669",fontWeight:500},children:[e.couponsAvailable," coupons available"]}),e.couponsUsed>0&&(0,y.jsxs)("span",{style:{color:"#6B7280"},children:[e.couponsUsed," used"]})]})]},e.id))})]})]})]}),ce&&(0,y.jsx)(p.Ay,{isOpen:!0,onClose:()=>de(!1),title:"Customer Details",children:le&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(U,{children:(0,y.jsxs)(D,{style:{marginBottom:"16px"},children:[(0,y.jsx)(k,{tier:le.loyaltyTier,children:De(le.name)}),(0,y.jsxs)(z,{children:[(0,y.jsx)(E,{style:{fontSize:"18px",marginBottom:"4px"},children:le.name}),(0,y.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,y.jsx)(I,{tier:le.loyaltyTier,children:le.loyaltyTier}),(0,y.jsx)(T,{active:le.isActive,children:le.isActive?"Active":"Inactive"})]})]})]})}),(0,y.jsxs)(U,{children:[(0,y.jsx)(R,{children:e("customers:customersPage.contactInformation")}),(0,y.jsxs)(N,{children:[(0,y.jsxs)(V,{children:[(0,y.jsx)(Y,{children:e("customers:customersPage.phoneNumber")}),(0,y.jsx)(J,{children:(0,u.FI)(le.phone)})]}),(0,y.jsxs)(V,{children:[(0,y.jsx)(Y,{children:e("customers:customersPage.emailAddress")}),(0,y.jsx)(J,{children:le.email||"Not provided"})]})]})]}),(0,y.jsxs)(U,{children:[(0,y.jsx)(R,{children:e("customers:customersPage.accountStatistics")}),(0,y.jsxs)(N,{children:[(0,y.jsxs)(V,{children:[(0,y.jsx)(Y,{children:e("customers:customersPage.memberSince")}),(0,y.jsx)(J,{children:Pe(le.joinDate)})]}),(0,y.jsxs)(V,{children:[(0,y.jsx)(Y,{children:e("customers:customersPage.lastOrder")}),(0,y.jsx)(J,{children:le.lastOrderDate?Pe(le.lastOrderDate):"No orders yet"})]}),(0,y.jsxs)(V,{children:[(0,y.jsx)(Y,{children:e("customers:customersPage.totalOrders")}),(0,y.jsxs)(J,{children:[le.totalOrders," orders"]})]}),(0,y.jsxs)(V,{children:[(0,y.jsx)(Y,{children:e("customers:customersPage.totalSpent")}),(0,y.jsx)(J,{children:(0,h.vv)(le.totalSpent,Fe)})]}),(0,y.jsxs)(V,{children:[(0,y.jsx)(Y,{children:e("customers:customersPage.loyaltyPoints")}),(0,y.jsxs)(J,{children:[le.points.toLocaleString()," points"]})]}),(0,y.jsxs)(V,{children:[(0,y.jsx)(Y,{children:e("customers:customersPage.averageOrderValue")}),(0,y.jsx)(J,{children:(0,h.vv)(le.totalOrders>0?le.totalSpent/le.totalOrders:0,Fe)})]})]})]}),le.favoriteItems.length>0&&(0,y.jsxs)(U,{children:[(0,y.jsx)(R,{children:e("customers:customersPage.favoriteItems")}),(0,y.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:le.favoriteItems.map((e,t)=>(0,y.jsx)("span",{style:{padding:"4px 8px",background:"#F3F4F6",borderRadius:"6px",fontSize:"12px",color:"#6B7280"},children:e},t))})]}),(0,y.jsxs)(U,{children:[(0,y.jsx)(R,{children:e("customers:customersPage.coupons")}),ve?(0,y.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:e("customers:customersPage.loading")}):je?(0,y.jsxs)(y.Fragment,{children:[je.available.length>0&&(0,y.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,y.jsxs)("div",{style:{fontSize:"13px",fontWeight:600,color:"#059669",marginBottom:"8px"},children:["Available (",je.available.length,")"]}),(0,y.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:je.available.map(e=>(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("span",{style:{fontSize:"14px",fontWeight:700,color:"#059669",fontFamily:"monospace",letterSpacing:"0.5px"},children:e.code}),e.name&&(0,y.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:e.name})]}),(0,y.jsxs)("div",{style:{textAlign:"right"},children:[(0,y.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#1F2937"},children:"percentage"===e.type?`${e.value}% off`:(0,h.vv)(e.value,Fe)+" off"}),e.min_order>0&&(0,y.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:["Min. ",(0,h.vv)(e.min_order,Fe)]}),e.per_user_limit&&(0,y.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:[e.my_usage,"/",e.per_user_limit," used"]}),e.valid_until&&(0,y.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:["Until ",new Date(e.valid_until).toLocaleDateString()]})]})]},e.id))})]}),je.history.length>0&&(0,y.jsxs)("div",{children:[(0,y.jsxs)("div",{style:{fontSize:"13px",fontWeight:600,color:"#6B7280",marginBottom:"8px"},children:["Used (",je.history.length,")"]}),(0,y.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:je.history.map((e,t)=>(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 14px",background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"13px"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("span",{style:{fontWeight:600,fontFamily:"monospace"},children:e.code}),(0,y.jsxs)("span",{style:{color:"#6B7280",marginLeft:"8px"},children:["#",e.order_number]})]}),(0,y.jsxs)("div",{style:{textAlign:"right"},children:[(0,y.jsxs)("span",{style:{fontWeight:600,color:"#DC2626"},children:["-",(0,h.vv)(e.discount,Fe)]}),(0,y.jsx)("span",{style:{color:"#9CA3AF",marginLeft:"8px",fontSize:"12px"},children:new Date(e.used_at).toLocaleDateString()})]})]},t))})]}),0===je.available.length&&0===je.history.length&&(0,y.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:e("customers:customersPage.noCouponsAvailableOrUsed")})]}):(0,y.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:e("customers:customersPage.noCouponData")})]})]})}),(0,y.jsx)(d.A,{}),(0,y.jsx)(p.Ay,{isOpen:pe,onClose:()=>!me&&xe(!1),title:"Delete Customer",footer:(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(p.yl,{variant:"secondary",onClick:()=>xe(!1),disabled:me,children:"Cancel"}),(0,y.jsx)(p.yl,{variant:"danger",onClick:async()=>{if(he){ge(!0);try{const e=await fetch(`/api/customers/${he.id}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}),t=await e.json();e.ok?window.location.reload():alert(t.message||"Failed to delete customer")}catch(e){console.error("Delete customer error:",e),alert("Failed to delete customer")}finally{ge(!1),xe(!1),ue(null)}}},disabled:me,children:me?"Deleting...":"Delete"})]}),children:(0,y.jsxs)("div",{children:[(0,y.jsxs)("p",{style:{marginBottom:"16px",color:"#1F2937"},children:["Are you sure you want to delete ",(0,y.jsx)("strong",{children:null===he||void 0===he?void 0:he.name}),"?"]}),(0,y.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"This will permanently remove the customer and all their data from the system. This action cannot be undone."})]})})]}),(0,y.jsx)("style",{children:"\n        @media (max-width: 768px) {\n          .desktop-only { display: none !important; }\n        }\n        @media (min-width: 769px) {\n          .mobile-only { display: none !important; }\n        }\n      "})]})}},4021:(e,t,s)=>{s.d(t,{i1:()=>l});var r=s(9950),i=s(1367),n=s(6038),o=s(9955);const l=()=>{const{user:e}=(0,i.As)(),[t,s]=(0,r.useState)("RM"),[l]=(0,r.useState)(Object.keys(n.DL)),[a,c]=(0,r.useState)(!0),[d,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let i=r>=0?t[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return s("RM"),void c(!1);try{const e=(0,o.c4)(),t=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var n;const e=await t.json(),r=e.currency||(null===(n=e.operation_settings)||void 0===n?void 0:n.currency)||"MYR";s(r)}else s("MYR")}catch(l){console.error("Failed to fetch restaurant currency:",l),p("Failed to load currency settings"),s("MYR")}finally{c(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:l,loading:a,error:d}}}}]);