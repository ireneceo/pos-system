"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[1748],{1748:(e,t,i)=>{i.r(t),i.d(t,{default:()=>G});var r=i(9950),n=i(4752),s=i(2853),o=i(4492),a=i(9037),l=i(8409),d=i(2488),c=i(2420),x=i(9610),p=i(4021),h=i(6038),m=i(2924),u=i(8012),g=i(4414);const y=n.Ay.div`
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
`,w=n.Ay.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
  pointer-events: none;
`,b=(0,n.Ay)(d.DO)`
  padding-left: 44px;
`,F=n.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  overflow-x: auto;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    overflow: visible;
  }
`,A=n.Ay.div`
  display: grid;
  grid-template-columns: minmax(180px, 2fr) minmax(140px, 1.5fr) 80px 80px 70px 100px 140px 36px;
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
  & > span:nth-child(7) { text-align: right; }

  @media (max-width: 768px) {
    display: none;
  }
`,C=n.Ay.div`
  display: grid;
  grid-template-columns: minmax(180px, 2fr) minmax(140px, 1.5fr) 80px 80px 70px 100px 140px 36px;
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
  & > *:nth-child(7) { justify-self: end; }

  &:hover {
    background: ${e=>e.clickable?"#F8FAFC":"transparent"};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`,S=n.Ay.div`
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
`,k=n.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
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
  min-width: 0;
`,D=n.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,O=n.Ay.div`
  font-size: 12px;
  color: #6B7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,z=n.Ay.span`
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
`,M=n.Ay.button`
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
`,P=n.Ay.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`,W=n.Ay.p`
  font-size: 16px;
  margin-bottom: 24px;
`,L=n.Ay.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`,N=n.Ay.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
`,R=n.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,V=n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,Y=n.Ay.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,J=n.Ay.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`,G=()=>{const{restaurantId:e}=(0,o.g)(),{customers:t,searchCustomers:i,setShowCustomerModal:n,setCustomerModalMode:G,updateCustomer:_,reloadCustomers:U}=(0,a.c)(),[Q,q]=(0,r.useState)(""),[H,K]=(0,r.useState)("all"),[X,Z]=(0,r.useState)("all"),[ee,te]=(0,r.useState)("name"),[ie,re]=(0,r.useState)([]),[ne,se]=(0,r.useState)(null),[oe,ae]=(0,r.useState)(!1),[le,de]=(0,r.useState)(!1),[ce,xe]=(0,r.useState)(null),[pe,he]=(0,r.useState)(!1),{defaultCurrency:me}=(0,p.i1)(),[ue,ge]=(0,r.useState)("RM");(0,r.useEffect)(()=>{e&&U(e)},[e,U]),(0,r.useEffect)(()=>{me&&ge(me)},[me]),(0,r.useEffect)(()=>{let e=Q?i(Q):t;if("all"!==H&&(e=e.filter(e=>e.loyaltyTier===H)),"all"!==X){const t="active"===X;e=e.filter(e=>e.isActive===t)}e.sort((e,t)=>{switch(ee){case"name":return e.name.localeCompare(t.name);case"joinDate":return new Date(t.joinDate).getTime()-new Date(e.joinDate).getTime();case"totalSpent":return t.totalSpent-e.totalSpent;case"totalOrders":return t.totalOrders-e.totalOrders;case"points":return t.points-e.points;default:return 0}}),re(e)},[t,Q,H,X,ee,i]);const ye={totalCustomers:t.length,activeCustomers:t.filter(e=>e.isActive).length,vipCustomers:t.filter(e=>"VIP"===e.loyaltyTier).length,averageOrders:t.length>0?Math.round(t.reduce((e,t)=>e+t.totalOrders,0)/t.length):0},je=e=>{se(e),ae(!0)},fe=e=>{xe(e),de(!0)},ve=()=>{G("register"),n(!0)},we=e=>new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),be=e=>e.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsxs)(y,{children:[(0,g.jsx)(u.Ay,{title:"Customers",children:(0,g.jsx)(j,{onClick:ve,variant:"primary",children:"Add Customer"})}),(0,g.jsxs)(f,{children:[(0,g.jsxs)(d.Qn,{children:[(0,g.jsxs)(d.Jt,{value:H,onChange:e=>K(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Tiers"}),(0,g.jsx)("option",{value:"Bronze",children:"Bronze"}),(0,g.jsx)("option",{value:"Silver",children:"Silver"}),(0,g.jsx)("option",{value:"Gold",children:"Gold"}),(0,g.jsx)("option",{value:"VIP",children:"VIP"})]}),(0,g.jsxs)(d.Jt,{value:X,onChange:e=>Z(e.target.value),children:[(0,g.jsx)("option",{value:"all",children:"All Status"}),(0,g.jsx)("option",{value:"active",children:"Active"}),(0,g.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,g.jsxs)(d.Jt,{value:ee,onChange:e=>te(e.target.value),children:[(0,g.jsx)("option",{value:"name",children:"Sort by Name"}),(0,g.jsx)("option",{value:"joinDate",children:"Sort by Join Date"}),(0,g.jsx)("option",{value:"totalSpent",children:"Sort by Total Spent"}),(0,g.jsx)("option",{value:"totalOrders",children:"Sort by Orders"}),(0,g.jsx)("option",{value:"points",children:"Sort by Points"})]}),(0,g.jsxs)(v,{children:[(0,g.jsx)(w,{children:"\ud83d\udd0d"}),(0,g.jsx)(b,{type:"text",placeholder:"Search customers by name, phone, or email...",value:Q,onChange:e=>q(e.target.value)})]})]}),(0,g.jsxs)(l.MD,{children:[(0,g.jsxs)(l.hI,{color:"#635BFF",children:[(0,g.jsx)(l.v0,{children:"Total Customers"}),(0,g.jsx)(l.Os,{children:ye.totalCustomers})]}),(0,g.jsxs)(l.hI,{color:"#10B981",children:[(0,g.jsx)(l.v0,{children:"Active Customers"}),(0,g.jsx)(l.Os,{children:ye.activeCustomers})]}),(0,g.jsxs)(l.hI,{color:"#F59E0B",children:[(0,g.jsx)(l.v0,{children:"VIP Members"}),(0,g.jsx)(l.Os,{children:ye.vipCustomers})]}),(0,g.jsxs)(l.hI,{color:"#8B5CF6",children:[(0,g.jsx)(l.v0,{children:"Avg Orders per Customer"}),(0,g.jsx)(l.Os,{children:ye.averageOrders})]})]}),(0,g.jsxs)(F,{children:[(0,g.jsxs)(A,{style:{minWidth:"860px"},children:[(0,g.jsx)("span",{children:"Customer"}),(0,g.jsx)("span",{children:"Contact"}),(0,g.jsx)("span",{children:"Tier"}),(0,g.jsx)("span",{children:"Points"}),(0,g.jsx)("span",{children:"Orders"}),(0,g.jsx)("span",{children:"Total Spent"}),(0,g.jsx)("span",{children:"Actions"}),(0,g.jsx)("span",{})]}),0===ie.length?(0,g.jsxs)(s.pp,{children:[(0,g.jsx)(W,{children:Q||"all"!==H||"all"!==X?"No customers found with the current filters":"No customers registered yet"}),(0,g.jsx)(j,{variant:"primary",onClick:ve,children:"Add First Customer"})]}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{className:"desktop-only",style:{minWidth:"860px"},children:ie.map(e=>(0,g.jsxs)(C,{clickable:!0,onClick:()=>je(e),children:[(0,g.jsxs)(k,{children:[(0,g.jsx)(B,{tier:e.loyaltyTier,children:be(e.name)}),(0,g.jsxs)(E,{children:[(0,g.jsx)(D,{children:e.name}),(0,g.jsxs)(O,{children:["Joined ",we(e.joinDate),e.lastOrderDate&&` \u2022 Last order ${we(e.lastOrderDate)}`]})]})]}),(0,g.jsxs)("div",{style:{minWidth:0},children:[(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937",whiteSpace:"nowrap"},children:(0,m.FI)(e.phone)}),e.email&&(0,g.jsx)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.email})]}),(0,g.jsx)(z,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#1F2937"},children:e.points.toLocaleString()}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"500",color:"#1F2937"},children:e.totalOrders}),(0,g.jsx)("div",{style:{fontSize:"14px",fontWeight:"600",color:"#059669"},children:(0,h.vv)(e.totalSpent,ue)}),(0,g.jsxs)(T,{onClick:e=>e.stopPropagation(),children:[(0,g.jsx)($,{onClick:()=>je(e),children:"View"}),(0,g.jsx)($,{onClick:()=>(async e=>{await _(e.id,{isActive:!e.isActive})})(e),children:e.isActive?"Deactivate":"Activate"})]}),(0,g.jsx)(M,{onClick:t=>{t.stopPropagation(),fe(e)},title:"Delete customer",children:(0,g.jsx)(P,{children:"\u2715"})})]},e.id))}),(0,g.jsx)("div",{className:"mobile-only",children:ie.map(e=>(0,g.jsxs)(S,{onClick:()=>je(e),children:[(0,g.jsxs)(k,{style:{marginBottom:"12px"},children:[(0,g.jsx)(B,{tier:e.loyaltyTier,children:be(e.name)}),(0,g.jsxs)(E,{children:[(0,g.jsx)(D,{children:e.name}),(0,g.jsx)(O,{children:(0,m.FI)(e.phone)})]}),(0,g.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"4px"},children:[(0,g.jsx)(M,{onClick:t=>{t.stopPropagation(),fe(e)},title:"Delete customer",style:{marginBottom:"4px"},children:(0,g.jsx)(P,{children:"\u2715"})}),(0,g.jsx)(z,{tier:e.loyaltyTier,children:e.loyaltyTier}),(0,g.jsx)(I,{active:e.isActive,children:e.isActive?"Active":"Inactive"})]})]}),(0,g.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"13px",color:"#6B7280"},children:[(0,g.jsxs)("span",{children:[e.points," pts"]}),(0,g.jsxs)("span",{children:[e.totalOrders," orders"]}),(0,g.jsx)("span",{style:{color:"#059669",fontWeight:"600"},children:(0,h.vv)(e.totalSpent,ue)})]})]},e.id))})]})]})]}),oe&&(0,g.jsx)(x.Ay,{isOpen:!0,onClose:()=>ae(!1),title:"Customer Details",children:ne&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(L,{children:(0,g.jsxs)(k,{style:{marginBottom:"16px"},children:[(0,g.jsx)(B,{tier:ne.loyaltyTier,children:be(ne.name)}),(0,g.jsxs)(E,{children:[(0,g.jsx)(D,{style:{fontSize:"18px",marginBottom:"4px"},children:ne.name}),(0,g.jsxs)("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[(0,g.jsx)(z,{tier:ne.loyaltyTier,children:ne.loyaltyTier}),(0,g.jsx)(I,{active:ne.isActive,children:ne.isActive?"Active":"Inactive"})]})]})]})}),(0,g.jsxs)(L,{children:[(0,g.jsx)(N,{children:"Contact Information"}),(0,g.jsxs)(R,{children:[(0,g.jsxs)(V,{children:[(0,g.jsx)(Y,{children:"Phone Number"}),(0,g.jsx)(J,{children:(0,m.FI)(ne.phone)})]}),(0,g.jsxs)(V,{children:[(0,g.jsx)(Y,{children:"Email Address"}),(0,g.jsx)(J,{children:ne.email||"Not provided"})]})]})]}),(0,g.jsxs)(L,{children:[(0,g.jsx)(N,{children:"Account Statistics"}),(0,g.jsxs)(R,{children:[(0,g.jsxs)(V,{children:[(0,g.jsx)(Y,{children:"Member Since"}),(0,g.jsx)(J,{children:we(ne.joinDate)})]}),(0,g.jsxs)(V,{children:[(0,g.jsx)(Y,{children:"Last Order"}),(0,g.jsx)(J,{children:ne.lastOrderDate?we(ne.lastOrderDate):"No orders yet"})]}),(0,g.jsxs)(V,{children:[(0,g.jsx)(Y,{children:"Total Orders"}),(0,g.jsxs)(J,{children:[ne.totalOrders," orders"]})]}),(0,g.jsxs)(V,{children:[(0,g.jsx)(Y,{children:"Total Spent"}),(0,g.jsx)(J,{children:(0,h.vv)(ne.totalSpent,ue)})]}),(0,g.jsxs)(V,{children:[(0,g.jsx)(Y,{children:"Loyalty Points"}),(0,g.jsxs)(J,{children:[ne.points.toLocaleString()," points"]})]}),(0,g.jsxs)(V,{children:[(0,g.jsx)(Y,{children:"Average Order Value"}),(0,g.jsx)(J,{children:(0,h.vv)(ne.totalOrders>0?ne.totalSpent/ne.totalOrders:0,ue)})]})]})]}),ne.favoriteItems.length>0&&(0,g.jsxs)(L,{children:[(0,g.jsx)(N,{children:"Favorite Items"}),(0,g.jsx)("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:ne.favoriteItems.map((e,t)=>(0,g.jsx)("span",{style:{padding:"4px 8px",background:"#F3F4F6",borderRadius:"6px",fontSize:"12px",color:"#6B7280"},children:e},t))})]}),(0,g.jsxs)(L,{children:[(0,g.jsx)(N,{children:"Recent Activity"}),(0,g.jsx)("div",{style:{color:"#6B7280",fontSize:"14px",fontStyle:"italic"},children:"Order history integration coming soon..."})]})]})}),(0,g.jsx)(c.A,{}),(0,g.jsx)(x.Ay,{isOpen:le,onClose:()=>!pe&&de(!1),title:"Delete Customer",footer:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(x.yl,{variant:"secondary",onClick:()=>de(!1),disabled:pe,children:"Cancel"}),(0,g.jsx)(x.yl,{variant:"danger",onClick:async()=>{if(ce){he(!0);try{const e=await fetch(`/api/customers/${ce.id}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}),t=await e.json();e.ok?window.location.reload():alert(t.message||"Failed to delete customer")}catch(e){console.error("Delete customer error:",e),alert("Failed to delete customer")}finally{he(!1),de(!1),xe(null)}}},disabled:pe,children:pe?"Deleting...":"Delete"})]}),children:(0,g.jsxs)("div",{children:[(0,g.jsxs)("p",{style:{marginBottom:"16px",color:"#1F2937"},children:["Are you sure you want to delete ",(0,g.jsx)("strong",{children:null===ce||void 0===ce?void 0:ce.name}),"?"]}),(0,g.jsx)("p",{style:{color:"#6B7280",fontSize:"14px"},children:"This will permanently remove the customer and all their data from the system. This action cannot be undone."})]})})]}),(0,g.jsx)("style",{children:"\n        @media (max-width: 768px) {\n          .desktop-only { display: none !important; }\n        }\n        @media (min-width: 769px) {\n          .mobile-only { display: none !important; }\n        }\n      "})]})}},2488:(e,t,i)=>{i.d(t,{DO:()=>x,Jt:()=>p,Qn:()=>c});i(9950);var r=i(4752),n=i(4414);const s=r.Ay.div`
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
`,a=r.Ay.div`
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
`,l=r.Ay.button`
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
`,d=r.Ay.select`
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
`,c=e=>{let{children:t,className:i,style:r,...o}=e;return(0,n.jsx)(s,{className:i,style:r,...o,children:t})},x=e=>{let{placeholder:t="Search...",value:i,onChange:r,style:s,...d}=e;return(0,n.jsxs)(a,{style:s,children:[(0,n.jsx)(o,{placeholder:t,value:i,onChange:r,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:i?"36px":"16px"},...d}),i&&(0,n.jsx)(l,{type:"button",onClick:()=>null===r||void 0===r?void 0:r({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},p=e=>{let{children:t,...i}=e;return(0,n.jsx)(d,{...i,children:t})}},4021:(e,t,i)=>{i.d(t,{i1:()=>o});var r=i(9950),n=i(1367),s=i(6038);const o=()=>{const{user:e}=(0,n.As)(),[t,i]=(0,r.useState)("RM"),[o]=(0,r.useState)(Object.keys(s.DL)),[a,l]=(0,r.useState)(!0),[d,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let n=r>=0?t[r+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return i("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var s;const e=await t.json(),r=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"MYR";i(r)}else i("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),i("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:o,loading:a,error:d}}},8012:(e,t,i)=>{i.d(t,{Ay:()=>l});i(9950);var r=i(4752),n=i(4414);const s=r.Ay.div`
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
`,o=r.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,a=r.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,l=e=>{let{title:t,children:i}=e;return(0,n.jsxs)(s,{children:[(0,n.jsx)(o,{children:t}),i&&(0,n.jsx)(a,{children:i})]})}}}]);