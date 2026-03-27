"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1748],{1748:(e,t,i)=>{i.r(t),i.d(t,{default:()=>Y});var n=i(9950),r=i(4752),s=i(2853),o=i(4492),l=i(9037),a=i(8409),d=i(2488),c=i(2420),x=i(9610),p=i(4021),h=i(6038),m=i(2924),u=i(8012),g=i(4414);const y=r.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,j=r.Ay.button`
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
`,v=r.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,f=r.Ay.div`
  flex: 0 0 400px;
  max-width: 400px;
  position: relative;
`,w=r.Ay.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
  pointer-events: none;
`,b=(0,r.Ay)(d.DO)`
  padding-left: 44px;
`,F=r.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  overflow-x: auto;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    overflow: visible;
  }
`,A=r.Ay.div`
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
`,C=r.Ay.div`
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
`,S=r.Ay.div`
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
`,B=r.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`,k=r.Ay.div`
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
`,z=r.Ay.div`
  flex: 1;
  min-width: 0;
`,D=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,E=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,O=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.tier){case"VIP":return"#FEF3C7";case"Gold":return"#FDE68A";case"Silver":return"#F3F4F6";default:return"#DBEAFE"}}};
  color: ${e=>{switch(e.tier){case"VIP":return"#92400E";case"Gold":return"#D97706";case"Silver":return"#6B7280";default:return"#1E40AF"}}};
`,I=r.Ay.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>e.active?"#ECFDF5":"#FEF2F2"};
  color: ${e=>e.active?"#059669":"#DC2626"};
`,T=r.Ay.div`
  display: flex;
  gap: 8px;
`,W=r.Ay.button`
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
`,$=r.Ay.button`
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
`,_=r.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,L=r.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,M=r.Ay.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,P=r.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
`,N=r.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,R=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,U=r.Ay.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,V=r.Ay.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`,Y=()=>{const{restaurantId:e}=(0,o.g)(),{customers:t,searchCustomers:i,setShowCustomerModal:r,setCustomerModalMode:Y,updateCustomer:J,reloadCustomers:G}=(0,l.c)(),[Q,H]=(0,n.useState)(""),[q,K]=(0,n.useState)("all"),[X,Z]=(0,n.useState)("all"),[ee,te]=(0,n.useState)("name"),[ie,ne]=(0,n.useState)([]),[re,se]=(0,n.useState)(null),[oe,le]=(0,n.useState)(!1),[ae,de]=(0,n.useState)(!1),[ce,xe]=(0,n.useState)(null),[pe,he]=(0,n.useState)(!1),[me,ue]=(0,n.useState)(null),[ge,ye]=(0,n.useState)(!1),{defaultCurrency:je}=(0,p.i1)(),[ve,fe]=(0,n.useState)("RM");(0,n.useEffect)(()=>{e&&G(e)},[e,G]),(0,n.useEffect)(()=>{je&&fe(je)},[je]),(0,n.useEffect)(()=>{let e=Q?i(Q):t;if("all"!==q&&(e=e.filter(e=>e.loyaltyTier===q)),"all"!==X){const t="active"===X;e=e.filter(e=>e.isActive===t)}e.sort((e,t)=>{switch(ee){case"name":return e.name.localeCompare(t.name);case"joinDate":return new Date(t.joinDate).getTime()-new Date(e.joinDate).getTime();case"totalSpent":return t.totalSpent-e.totalSpent;case"totalOrders":return t.totalOrders-e.totalOrders;case"points":return t.points-e.points;default:return 0}}),ne(e)},[t,Q,q,X,ee,i]);const we={totalCustomers:t.length,activeCustomers:t.filter(e=>e.isActive).length,vipCustomers:t.filter(e=>"VIP"===e.loyaltyTier).length,averageOrders:t.length>0?Math.round(t.reduce((e,t)=>e+t.totalOrders,0)/t.length):0},be=async t=>{se(t),le(!0),ue(null),ye(!0);try{const i=localStorage.getItem("auth_token"),n=await fetch(`/api/coupons/customer/${t.id}?restaurant_id=${e}`,{headers:{Authorization:`Bearer ${i}`}}),r=await n.json();r.success&&ue(r.data)}catch{}ye(!1)},Fe=e=>{xe(e),de(!0)},Ae=()=>{Y("register"),r(!0)},Ce=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),Se=e=>e.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(y,{children:[(0,g.jsx)(u.Ay,{title:"Customers",children:(0,g.jsx)(j,{onClick:Ae,variant:"primary",children:"Add Customer"})}),(0,g.jsxs)(v,{children:[(0,g.jsxs)(d.Qn,{children:[(0,g.jsxs)(d.Jt,{value:q,onChange:e=>K(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Tiers"}),(0,g.jsx)("option",{value:"Bronze",children:"Bronze"}),(0,g.jsx)("option",{value:"Silver",children:"Silver"}),(0,g.jsx)("option",{value:"Gold",children:"Gold"}),(0,g.jsx)("option",{value:"VIP",children:"VIP"})]}),(0,g.jsxs)(d.Jt,{value:X,onChange:e=>Z(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Status"}),(0,g.jsx)("option",{value:"active",children:"Active"}),(0,g.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,g.jsxs)(d.Jt,{value:ee,onChange:e=>te(e.target.value),children:[(0,g.jsx)("option",{value:"name",children:"Sort by Name"}),(0,g.jsx)("option",{value:"joinDate",children:"Sort by Join Date"}),(0,g.jsx)("option",{value:"totalSpent",children:"Sort by Total Spent"}),(0,g.jsx)("option",{value:"totalOrders",children:"Sort by Orders"}),(0,g.jsx)("option",{value:"points",children:"Sort by Points"})]}),(0,g.jsxs)(f,{children:[(0,g.jsx)(w,{children:"\ud83d\udd0d"}),(0,g.jsx)(b,{type:"text",placeholder:"Search customers by name, phone, or email...",value:Q,onChange:e=>H(e.target.value)})]})]}),(0,g.jsxs)(a.MD,{children:[(0,g.jsxs)(a.hI,{color:"#635BFF",children:[(0,g.jsx)(a.v0,{children:"Total Customers"}),(0,g.jsx)(a.Os,{children:we.totalCustomers})]}),(0,g.jsxs)(a.hI,{color:"#10B981",children:[(0,g.jsx)(a.v0,{children:"Active Customers"}),(0,g.jsx)(a.Os,{children:we.activeCustomers})]}),(0,g.jsxs)(a.hI,{color:"#F59E0B",children:[(0,g.jsx)(a.v0,{children:"VIP Members"}),(0,g.jsx)(a.Os,{children:we.vipCustomers})]}),(0,g.jsxs)(a.hI,{color:"#8B5CF6",children:[(0,g.jsx)(a.v0,{children:"Avg Orders per Customer"}),(0,g.jsx)(a.Os,{children:we.averageOrders})]})]}),(0,g.jsxs)(F,{children:[(0,g.jsxs)(A,{style:{minWidth:"960px"},children:[(0,g.jsx)("span",{children:"Customer"}),(0,g.jsx)("span",{children:"Contact"}),(0,g.jsx)("span",{children:"Tier"}),(0,g.jsx)("span",{children:"Points"}),(0,g.jsx)("span",{children:"Orders"}),(0,g.jsx)("span",{children:"Total Spent"}),(0,g.jsx)("span",{children:"Coupons"}),(0,g.jsx)("span",{children:"Actions"}),(0,g.jsx)("span",{})]}),0===ie.length?(0,g.jsxs)(s.pp,{children:[(0,g.jsx)(L,{children:Q||"all"!==q||"all"!==X?"No customers found with the current filters":"No customers registered yet"}),(0,g.jsx)(j,{variant:"primary",onClick:Ae,children:"Add First Customer"})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{className:"desktop-only",style:{minWidth:"960px"},children:ie.map(e=>(0,g.jsxs)(C,{clickable:!0,onClick:()=>be(e),children:[(0,g.jsxs)(B,{children:[(0,g.jsx)(k,{tier:e.loyaltyTier,children:Se(e.name)}),(0,g.jsxs)(z,{children:[(0,g.jsx)(D,{children:e.name}),(0,g.jsxs)(E,{children:["Joined ",Ce(e.joinDate),e.lastOrderDate&&` \u2022 Last order ${Ce(e.lastOrderDate)}`]})]})]}),(0,g.jsxs)("div",{style:{minWidth:0},children:[(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937",whiteSpace:"nowrap"},children:(0,m.FI)(e.phone)}),e.email&&(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.email})]}),(0,g.jsx)(O,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#1F2937"},children:e.points.toLocaleString()}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:e.totalOrders}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#059669"},children:(0,h.vv)(e.totalSpent,ve)}),(0,g.jsxs)("div",{style:{fontSize:"12px",color:"#6B7C93",lineHeight:"1.5"},children:[e.couponsAvailable>0&&(0,g.jsxs)("div",{style:{color:"#059669",fontWeight:500},children:[e.couponsAvailable," available"]}),e.couponsUsed>0&&(0,g.jsxs)("div",{children:[e.couponsUsed," used"]}),0===e.couponsAvailable&&0===e.couponsUsed&&(0,g.jsx)("div",{children:"\u2014"})]}),(0,g.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,g.jsx)(W,{onClick:()=>be(e),children:"View"}),(0,g.jsx)(W,{onClick:()=>(async e=>{await J(e.id,{isActive:!e.isActive})})(e),children:e.isActive?"Deactivate":"Activate"})]}),(0,g.jsx)($,{onClick:t=>{t.stopPropagation(),Fe(e)},title:"Delete customer",children:(0,g.jsx)(_,{children:"\u2715"})})]},e.id))}),(0,g.jsx)("div",{className:"mobile-only",children:ie.map(e=>(0,g.jsxs)(S,{onClick:()=>be(e),children:[(0,g.jsxs)(B,{style:{marginBottom:"12px"},children:[(0,g.jsx)(k,{tier:e.loyaltyTier,children:Se(e.name)}),(0,g.jsxs)(z,{children:[(0,g.jsx)(D,{children:e.name}),(0,g.jsx)(E,{children:(0,m.FI)(e.phone)})]}),(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,g.jsx)($,{onClick:t=>{t.stopPropagation(),Fe(e)},title:"Delete customer",style:{marginBottom:"4px"},children:(0,g.jsx)(_,{children:"\u2715"})}),(0,g.jsx)(O,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,g.jsx)(I,{active:e.isActive,children:e.isActive?"Active":"Inactive"})]})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#6B7280"},children:[(0,g.jsxs)("span",{children:[e.points," pts"]}),(0,g.jsxs)("span",{children:[e.totalOrders," orders"]}),(0,g.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,h.vv)(e.totalSpent,ve)})]}),(e.couponsAvailable>0||e.couponsUsed>0)&&(0,g.jsxs)("div",{style:{display:"flex",gap:"8px",marginTop:"8px",fontSize:"12px"},children:[e.couponsAvailable>0&&(0,g.jsxs)("span",{style:{color:"#059669",fontWeight:500},children:[e.couponsAvailable," coupons available"]}),e.couponsUsed>0&&(0,g.jsxs)("span",{style:{color:"#6B7280"},children:[e.couponsUsed," used"]})]})]},e.id))})]})]})]}),oe&&(0,g.jsx)(x.Ay,{isOpen:!0,onClose:()=>le(!1),title:"Customer Details",children:re&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(M,{children:(0,g.jsxs)(B,{style:{marginBottom:"16px"},children:[(0,g.jsx)(k,{tier:re.loyaltyTier,children:Se(re.name)}),(0,g.jsxs)(z,{children:[(0,g.jsx)(D,{style:{fontSize:"18px",marginBottom:"4px"},children:re.name}),(0,g.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,g.jsx)(O,{tier:re.loyaltyTier,children:re.loyaltyTier}),(0,g.jsx)(I,{active:re.isActive,children:re.isActive?"Active":"Inactive"})]})]})]})}),(0,g.jsxs)(M,{children:[(0,g.jsx)(P,{children:"Contact Information"}),(0,g.jsxs)(N,{children:[(0,g.jsxs)(R,{children:[(0,g.jsx)(U,{children:"Phone Number"}),(0,g.jsx)(V,{children:(0,m.FI)(re.phone)})]}),(0,g.jsxs)(R,{children:[(0,g.jsx)(U,{children:"Email Address"}),(0,g.jsx)(V,{children:re.email||"Not provided"})]})]})]}),(0,g.jsxs)(M,{children:[(0,g.jsx)(P,{children:"Account Statistics"}),(0,g.jsxs)(N,{children:[(0,g.jsxs)(R,{children:[(0,g.jsx)(U,{children:"Member Since"}),(0,g.jsx)(V,{children:Ce(re.joinDate)})]}),(0,g.jsxs)(R,{children:[(0,g.jsx)(U,{children:"Last Order"}),(0,g.jsx)(V,{children:re.lastOrderDate?Ce(re.lastOrderDate):"No orders yet"})]}),(0,g.jsxs)(R,{children:[(0,g.jsx)(U,{children:"Total Orders"}),(0,g.jsxs)(V,{children:[re.totalOrders," orders"]})]}),(0,g.jsxs)(R,{children:[(0,g.jsx)(U,{children:"Total Spent"}),(0,g.jsx)(V,{children:(0,h.vv)(re.totalSpent,ve)})]}),(0,g.jsxs)(R,{children:[(0,g.jsx)(U,{children:"Loyalty Points"}),(0,g.jsxs)(V,{children:[re.points.toLocaleString()," points"]})]}),(0,g.jsxs)(R,{children:[(0,g.jsx)(U,{children:"Average Order Value"}),(0,g.jsx)(V,{children:(0,h.vv)(re.totalOrders>0?re.totalSpent/re.totalOrders:0,ve)})]})]})]}),re.favoriteItems.length>0&&(0,g.jsxs)(M,{children:[(0,g.jsx)(P,{children:"Favorite Items"}),(0,g.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:re.favoriteItems.map((e,t)=>(0,g.jsx)("span",{style:{padding:"4px 8px",background:"#F3F4F6",borderRadius:"6px",fontSize:"12px",color:"#6B7280"},children:e},t))})]}),(0,g.jsxs)(M,{children:[(0,g.jsx)(P,{children:"Coupons"}),ge?(0,g.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:"Loading..."}):me?(0,g.jsxs)(g.Fragment,{children:[me.available.length>0&&(0,g.jsxs)("div",{style:{marginBottom:"16px"},children:[(0,g.jsxs)("div",{style:{fontSize:"13px",fontWeight:600,color:"#059669",marginBottom:"8px"},children:["Available (",me.available.length,")"]}),(0,g.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:me.available.map(e=>(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:"8px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("span",{style:{fontSize:"14px",fontWeight:700,color:"#059669",fontFamily:"monospace",letterSpacing:"0.5px"},children:e.code}),e.name&&(0,g.jsx)("span",{style:{fontSize:"12px",color:"#6B7280",marginLeft:"8px"},children:e.name})]}),(0,g.jsxs)("div",{style:{textAlign:"right"},children:[(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:600,color:"#1F2937"},children:"percentage"===e.type?`${e.value}% off`:(0,h.vv)(e.value,ve)+" off"}),e.min_order>0&&(0,g.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:["Min. ",(0,h.vv)(e.min_order,ve)]}),e.per_user_limit&&(0,g.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:[e.my_usage,"/",e.per_user_limit," used"]}),e.valid_until&&(0,g.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:["Until ",new Date(e.valid_until).toLocaleDateString()]})]})]},e.id))})]}),me.history.length>0&&(0,g.jsxs)("div",{children:[(0,g.jsxs)("div",{style:{fontSize:"13px",fontWeight:600,color:"#6B7280",marginBottom:"8px"},children:["Used (",me.history.length,")"]}),(0,g.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:me.history.map((e,t)=>(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 14px",background:"#F8FAFC",border:"1px solid #E6EBF1",borderRadius:"8px",fontSize:"13px"},children:[(0,g.jsxs)("div",{children:[(0,g.jsx)("span",{style:{fontWeight:600,fontFamily:"monospace"},children:e.code}),(0,g.jsxs)("span",{style:{color:"#6B7280",marginLeft:"8px"},children:["#",e.order_number]})]}),(0,g.jsxs)("div",{style:{textAlign:"right"},children:[(0,g.jsxs)("span",{style:{fontWeight:600,color:"#DC2626"},children:["-",(0,h.vv)(e.discount,ve)]}),(0,g.jsx)("span",{style:{color:"#9CA3AF",marginLeft:"8px",fontSize:"12px"},children:new Date(e.used_at).toLocaleDateString()})]})]},t))})]}),0===me.available.length&&0===me.history.length&&(0,g.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:"No coupons available or used"})]}):(0,g.jsx)("div",{style:{color:"#6B7280",fontSize:"14px"},children:"No coupon data"})]})]})}),(0,g.jsx)(c.A,{}),(0,g.jsx)(x.Ay,{isOpen:ae,onClose:()=>!pe&&de(!1),title:"Delete Customer",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(x.yl,{variant:"secondary",onClick:()=>de(!1),disabled:pe,children:"Cancel"}),(0,g.jsx)(x.yl,{variant:"danger",onClick:async()=>{if(ce){he(!0);try{const e=await fetch(`/api/customers/${ce.id}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}),t=await e.json();e.ok?window.location.reload():alert(t.message||"Failed to delete customer")}catch(e){console.error("Delete customer error:",e),alert("Failed to delete customer")}finally{he(!1),de(!1),xe(null)}}},disabled:pe,children:pe?"Deleting...":"Delete"})]}),children:(0,g.jsxs)("div",{children:[(0,g.jsxs)("p",{style:{marginBottom:"16px",color:"#1F2937"},children:["Are you sure you want to delete ",(0,g.jsx)("strong",{children:null===ce||void 0===ce?void 0:ce.name}),"?"]}),(0,g.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"This will permanently remove the customer and all their data from the system. This action cannot be undone."})]})})]}),(0,g.jsx)("style",{children:"\n        @media (max-width: 768px) {\n          .desktop-only { display: none !important; }\n        }\n        @media (min-width: 769px) {\n          .mobile-only { display: none !important; }\n        }\n      "})]})}},2488:(e,t,i)=>{i.d(t,{DO:()=>x,Jt:()=>p,Qn:()=>c});i(9950);var n=i(4752),r=i(4414);const s=n.Ay.div`
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
`,o=n.Ay.input`
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
`,l=n.Ay.div`
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
`,a=n.Ay.button`
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
`,d=n.Ay.select`
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
`,c=e=>{let{children:t,className:i,style:n,...o}=e;return(0,r.jsx)(s,{className:i,style:n,...o,children:t})},x=e=>{let{placeholder:t="Search...",value:i,onChange:n,style:s,...d}=e;return(0,r.jsxs)(l,{style:s,children:[(0,r.jsx)(o,{placeholder:t,value:i,onChange:n,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:i?"36px":"16px"},...d}),i&&(0,r.jsx)(a,{type:"button",onClick:()=>null===n||void 0===n?void 0:n({target:{value:""}}),"aria-label":"Clear search",children:(0,r.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,r.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,r.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},p=e=>{let{children:t,...i}=e;return(0,r.jsx)(d,{...i,children:t})}},4021:(e,t,i)=>{i.d(t,{i1:()=>o});var n=i(9950),r=i(1367),s=i(6038);const o=()=>{const{user:e}=(0,r.As)(),[t,i]=(0,n.useState)("RM"),[o]=(0,n.useState)(Object.keys(s.DL)),[l,a]=(0,n.useState)(!0),[d,c]=(0,n.useState)(null);return(0,n.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),n=t.indexOf("restaurant");let r=n>=0?t[n+1]:null;if(!r&&null!==e&&void 0!==e&&e.restaurant_id&&(r=e.restaurant_id.toString()),!r)return i("RM"),void a(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${r}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),n=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"MYR";i(n)}else i("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),i("MYR")}finally{a(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:l,error:d}}},8012:(e,t,i)=>{i.d(t,{Ay:()=>a});i(9950);var n=i(4752),r=i(4414);const s=n.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px 16px;
    height: auto;
    min-height: 48px;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`,o=n.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,l=n.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,a=e=>{let{title:t,children:i}=e;return(0,r.jsxs)(s,{children:[(0,r.jsx)(o,{children:t}),i&&(0,r.jsx)(l,{children:i})]})}}}]);