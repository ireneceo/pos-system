"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7795],{2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>x,Qn:()=>l});r(9950);var i=r(4752),a=r(4414);const n=i.Ay.div`
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
`,s=i.Ay.input`
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
`,o=i.Ay.select`
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
`,l=e=>{let{children:t,className:r,style:i,...s}=e;return(0,a.jsx)(n,{className:r,style:i,...s,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,a.jsx)(s,{placeholder:t,...r})},x=e=>{let{children:t,...r}=e;return(0,a.jsx)(o,{...r,children:t})}},7795:(e,t,r)=>{r.r(t),r.d(t,{default:()=>y});var i=r(9950),a=r(4752),n=r(3310),s=r(2488),o=r(7492),l=r(4414);const d=a.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,x=a.Ay.div`
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
`,c=a.Ay.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`,p=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=a.Ay.div`
  padding: 32px;
`,u=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,m=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,g=a.Ay.thead`
  border-bottom: 2px solid #E6EBF1;
`,j=a.Ay.tr`
  border-bottom: 1px solid #F1F5F9;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,w=a.Ay.th`
  padding: 16px 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=a.Ay.td`
  padding: 16px 12px;
  font-size: 14px;
  color: #374151;
`,f=a.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#DEF7EC";case"inactive":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#065F46";case"inactive":return"#991B1B";default:return"#374151"}}};
`,b=a.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${e=>{switch(e.tier){case"platinum":return"#ECFDF5";case"gold":return"#FFFBEB";case"silver":return"#F8FAFC";case"bronze":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.tier){case"platinum":return"#065F46";case"gold":return"#92400E";case"silver":return"#475569";case"bronze":return"#991B1B";default:return"#374151"}}};
`,F=a.Ay.div`
  text-align: center;
  padding: 40px 20px;
  color: #6B7C93;
  font-size: 14px;
`,y=()=>{const[e,t]=(0,i.useState)([]),[r,a]=(0,i.useState)(!0),[y,A]=(0,i.useState)(""),[B,C]=(0,i.useState)("all"),[S,k]=(0,i.useState)("all"),[E,z]=(0,i.useState)("all");(0,i.useEffect)(()=>{(async()=>{try{a(!0);const e=1,r=await fetch(`/api/customers/${e}`),i=await r.json();if(i.success){const e=(i.data||i).map(e=>{var t;return{id:e.customer.id,name:e.customer.name,phone:e.customer.phone,email:e.customer.email||"",restaurant:"",registeredDate:e.first_order_at?new Date(e.first_order_at).toISOString().split("T")[0]:"",lastVisit:e.last_order_at?new Date(e.last_order_at).toISOString().split("T")[0]:"",totalOrders:e.total_orders||0,totalSpent:parseFloat(e.total_spent||0),status:e.last_order_at&&new Date(e.last_order_at)>new Date(Date.now()-2592e6)?"active":"inactive",tier:(null===(t=e.loyalty_tier)||void 0===t?void 0:t.toLowerCase())||"bronze",points:e.points||0}});console.log("ManagerCustomersPage - Loaded customers from API:",e.length),t(e)}else console.error("ManagerCustomersPage - Failed to load customers:",i.error),t([])}catch(e){console.error("ManagerCustomersPage - Error loading customers:",e),t([])}finally{a(!1)}})()},[]);const _=e.filter(e=>{const t=e.name.toLowerCase().includes(y.toLowerCase())||e.email.toLowerCase().includes(y.toLowerCase())||e.phone.includes(y),r="all"===B||e.status===B,i="all"===S||e.tier===S,a="all"===E||e.restaurant===E;return t&&r&&i&&a}),D=e.length,L=e.filter(e=>"active"===e.status).length,O=e.reduce((e,t)=>e+t.totalSpent,0),I=e.length>0?O/e.reduce((e,t)=>e+t.totalOrders,0):0;return(0,l.jsx)(n.A,{children:(0,l.jsxs)(d,{children:[(0,l.jsx)(x,{children:(0,l.jsx)(c,{children:(0,l.jsx)(p,{children:"Customer Management"})})}),(0,l.jsxs)(h,{children:[(0,l.jsxs)(o.MD,{children:[(0,l.jsxs)(o.hI,{children:[(0,l.jsx)(o.Os,{children:D}),(0,l.jsx)(o.v0,{children:"Total Customers"})]}),(0,l.jsxs)(o.hI,{children:[(0,l.jsx)(o.Os,{children:L}),(0,l.jsx)(o.v0,{children:"Active Customers"})]}),(0,l.jsxs)(o.hI,{children:[(0,l.jsxs)(o.Os,{children:["RM ",O.toLocaleString()]}),(0,l.jsx)(o.v0,{children:"Total Revenue"})]}),(0,l.jsxs)(o.hI,{children:[(0,l.jsxs)(o.Os,{children:["RM ",I.toFixed(2)]}),(0,l.jsx)(o.v0,{children:"Avg Order Value"})]})]}),(0,l.jsxs)(s.Qn,{children:[(0,l.jsx)(s.DO,{type:"text",placeholder:"Search customers...",value:y,onChange:e=>A(e.target.value)}),(0,l.jsxs)(s.Jt,{value:B,onChange:e=>C(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Status"}),(0,l.jsx)("option",{value:"active",children:"Active"}),(0,l.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,l.jsxs)(s.Jt,{value:S,onChange:e=>k(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Tiers"}),(0,l.jsx)("option",{value:"platinum",children:"Platinum"}),(0,l.jsx)("option",{value:"gold",children:"Gold"}),(0,l.jsx)("option",{value:"silver",children:"Silver"}),(0,l.jsx)("option",{value:"bronze",children:"Bronze"})]}),(0,l.jsxs)(s.Jt,{value:E,onChange:e=>z(e.target.value),children:[(0,l.jsx)("option",{value:"all",children:"All Restaurants"}),(0,l.jsx)("option",{value:"Korean BBQ House",children:"Korean BBQ House"}),(0,l.jsx)("option",{value:"Nasi Lemak Wangi",children:"Nasi Lemak Wangi"}),(0,l.jsx)("option",{value:"Seoul Garden BBQ",children:"Seoul Garden BBQ"})]})]}),(0,l.jsx)(u,{children:r?(0,l.jsx)(F,{children:"Loading customers..."}):(0,l.jsxs)(m,{children:[(0,l.jsx)(g,{children:(0,l.jsxs)(j,{children:[(0,l.jsx)(w,{children:"Customer"}),(0,l.jsx)(w,{children:"Contact"}),(0,l.jsx)(w,{children:"Restaurant"}),(0,l.jsx)(w,{children:"Orders"}),(0,l.jsx)(w,{children:"Total Spent"}),(0,l.jsx)(w,{children:"Status"}),(0,l.jsx)(w,{children:"Tier"}),(0,l.jsx)(w,{children:"Points"})]})}),(0,l.jsx)("tbody",{children:_.map(e=>(0,l.jsxs)(j,{children:[(0,l.jsx)(v,{children:(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{fontWeight:"600",marginBottom:"4px"},children:e.name}),(0,l.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Joined: ",new Date(e.registeredDate).toLocaleDateString()]})]})}),(0,l.jsx)(v,{children:(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{style:{marginBottom:"4px"},children:e.phone}),(0,l.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.email})]})}),(0,l.jsx)(v,{children:e.restaurant}),(0,l.jsx)(v,{children:e.totalOrders}),(0,l.jsxs)(v,{children:["RM ",e.totalSpent.toLocaleString()]}),(0,l.jsx)(v,{children:(0,l.jsx)(f,{status:e.status,children:e.status})}),(0,l.jsx)(v,{children:(0,l.jsx)(b,{tier:e.tier,children:e.tier})}),(0,l.jsx)(v,{children:e.points.toLocaleString()})]},e.id))})]})})]})]})})}}}]);