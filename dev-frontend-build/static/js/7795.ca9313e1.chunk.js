"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7795],{2488:(e,t,r)=>{r.d(t,{DO:()=>c,Jt:()=>x,Qn:()=>d});var i=r(8819),n=(r(9950),r(4752)),a=r(4414);const s=n.Ay.div`
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
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${i.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
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
`,l=n.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${i.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${i.w.colors.primary};
    box-shadow: 0 0 0 3px ${i.w.colors.primaryLight};
  }

  &:disabled {
    background: ${i.w.colors.surfaceHover};
    color: ${i.w.colors.text.muted};
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
`,d=e=>{let{children:t,className:r,style:i,...n}=e;return(0,a.jsx)(s,{className:r,style:i,...n,children:t})},c=e=>{let{placeholder:t="Search...",...r}=e;return(0,a.jsx)(o,{placeholder:t,...r})},x=e=>{let{children:t,...r}=e;return(0,a.jsx)(l,{...r,children:t})}},4021:(e,t,r)=>{r.d(t,{i1:()=>s});var i=r(9950),n=r(1367),a=r(6038);const s=()=>{const{user:e}=(0,n.As)(),[t,r]=(0,i.useState)("RM"),[s,o]=(0,i.useState)(Object.keys(a.DL)),[l,d]=(0,i.useState)(!0),[c,x]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),i=t.indexOf("restaurant");let n=i>=0?t[i+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),i=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";r(i)}else r("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),x("Failed to load currency settings"),r("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:l,error:c}}},7795:(e,t,r)=>{r.r(t),r.d(t,{default:()=>A});var i=r(8819),n=r(9950),a=r(4752),s=r(2488),o=r(2674),l=r(4021),d=r(6038),c=r(4414);const x=a.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,h=a.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid ${i.w.colors.border};
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
`,p=a.Ay.div`
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
`,u=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=a.Ay.div`
  padding: 32px;
`,g=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid ${i.w.colors.border};
  overflow: hidden;
`,w=a.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,v=a.Ay.thead`
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
`,f=a.Ay.th`
  padding: 16px 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  /* 정렬 규칙: 숫자는 우측, 상태/등급은 가운데 */
  &:nth-child(4) { text-align: right; } /* Orders */
  &:nth-child(5) { text-align: right; } /* Total Spent */
  &:nth-child(6) { text-align: center; } /* Status */
  &:nth-child(7) { text-align: center; } /* Tier */
  &:nth-child(8) { text-align: right; } /* Points */
`,b=a.Ay.td`
  padding: 16px 12px;
  font-size: 14px;
  color: #374151;

  /* 정렬 규칙: 숫자는 우측, 상태/등급은 가운데 */
  &:nth-child(4) { text-align: right; } /* Orders */
  &:nth-child(5) { text-align: right; } /* Total Spent */
  &:nth-child(6) { text-align: center; } /* Status */
  &:nth-child(7) { text-align: center; } /* Tier */
  &:nth-child(8) { text-align: right; } /* Points */
`,y=a.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#DEF7EC";case"inactive":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#065F46";case"inactive":return"#991B1B";default:return"#374151"}}};
`,F=a.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${e=>{switch(e.tier){case"platinum":return"#ECFDF5";case"gold":return"#FFFBEB";case"silver":return"#F8FAFC";case"bronze":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.tier){case"platinum":return"#065F46";case"gold":return"#92400E";case"silver":return"#475569";case"bronze":return"#991B1B";default:return"#374151"}}};
`,S=a.Ay.div`
  text-align: center;
  padding: 40px 20px;
  color: #6B7C93;
  font-size: 14px;
`,A=()=>{const[e,t]=(0,n.useState)([]),[r,i]=(0,n.useState)(!0),[a,A]=(0,n.useState)(""),[C,B]=(0,n.useState)("all"),[k,_]=(0,n.useState)("all"),[z,$]=(0,n.useState)("all"),{defaultCurrency:O}=(0,l.i1)(),[D,L]=(0,n.useState)("RM");(0,n.useEffect)(()=>{O&&L(O)},[O]),(0,n.useEffect)(()=>{(async()=>{try{i(!0);const e=1,r=await fetch(`/api/customers/${e}`),n=await r.json();if(n.success){const e=(n.data||n).map(e=>{var t;return{id:e.customer.id,name:e.customer.name,phone:e.customer.phone,email:e.customer.email||"",restaurant:"",registeredDate:e.first_order_at?new Date(e.first_order_at).toISOString().split("T")[0]:"",lastVisit:e.last_order_at?new Date(e.last_order_at).toISOString().split("T")[0]:"",totalOrders:e.total_orders||0,totalSpent:parseFloat(e.total_spent||0),status:e.last_order_at&&new Date(e.last_order_at)>new Date(Date.now()-2592e6)?"active":"inactive",tier:(null===(t=e.loyalty_tier)||void 0===t?void 0:t.toLowerCase())||"bronze",points:e.points||0}});console.log("ManagerCustomersPage - Loaded customers from API:",e.length),t(e)}else console.error("ManagerCustomersPage - Failed to load customers:",n.error),t([])}catch(e){console.error("ManagerCustomersPage - Error loading customers:",e),t([])}finally{i(!1)}})()},[]);const E=e.filter(e=>{const t=e.name.toLowerCase().includes(a.toLowerCase())||e.email.toLowerCase().includes(a.toLowerCase())||e.phone.includes(a),r="all"===C||e.status===C,i="all"===k||e.tier===k,n="all"===z||e.restaurant===z;return t&&r&&i&&n}),T=e.length,M=e.filter(e=>"active"===e.status).length,I=e.reduce((e,t)=>e+t.totalSpent,0),R=e.length>0?I/e.reduce((e,t)=>e+t.totalOrders,0):0;return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)(x,{children:[(0,c.jsx)(h,{children:(0,c.jsx)(p,{children:(0,c.jsx)(u,{children:"Customer Management"})})}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(o.MD,{children:[(0,c.jsxs)(o.hI,{children:[(0,c.jsx)(o.Os,{children:T}),(0,c.jsx)(o.v0,{children:"Total Customers"})]}),(0,c.jsxs)(o.hI,{children:[(0,c.jsx)(o.Os,{children:M}),(0,c.jsx)(o.v0,{children:"Active Customers"})]}),(0,c.jsxs)(o.hI,{children:[(0,c.jsx)(o.Os,{children:(0,d.vv)(I,D)}),(0,c.jsx)(o.v0,{children:"Total Revenue"})]}),(0,c.jsxs)(o.hI,{children:[(0,c.jsx)(o.Os,{children:(0,d.vv)(R,D)}),(0,c.jsx)(o.v0,{children:"Avg Order Value"})]})]}),(0,c.jsxs)(s.Qn,{children:[(0,c.jsx)(s.DO,{type:"text",placeholder:"Search customers...",value:a,onChange:e=>A(e.target.value)}),(0,c.jsxs)(s.Jt,{value:C,onChange:e=>B(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,c.jsxs)(s.Jt,{value:k,onChange:e=>_(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Tiers"}),(0,c.jsx)("option",{value:"platinum",children:"Platinum"}),(0,c.jsx)("option",{value:"gold",children:"Gold"}),(0,c.jsx)("option",{value:"silver",children:"Silver"}),(0,c.jsx)("option",{value:"bronze",children:"Bronze"})]}),(0,c.jsxs)(s.Jt,{value:z,onChange:e=>$(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Restaurants"}),(0,c.jsx)("option",{value:"Korean BBQ House",children:"Korean BBQ House"}),(0,c.jsx)("option",{value:"Nasi Lemak Wangi",children:"Nasi Lemak Wangi"}),(0,c.jsx)("option",{value:"Seoul Garden BBQ",children:"Seoul Garden BBQ"})]})]}),(0,c.jsx)(g,{children:r?(0,c.jsx)(S,{children:"Loading customers..."}):(0,c.jsxs)(w,{children:[(0,c.jsx)(v,{children:(0,c.jsxs)(j,{children:[(0,c.jsx)(f,{children:"Customer"}),(0,c.jsx)(f,{children:"Contact"}),(0,c.jsx)(f,{children:"Restaurant"}),(0,c.jsx)(f,{children:"Orders"}),(0,c.jsx)(f,{children:"Total Spent"}),(0,c.jsx)(f,{children:"Status"}),(0,c.jsx)(f,{children:"Tier"}),(0,c.jsx)(f,{children:"Points"})]})}),(0,c.jsx)("tbody",{children:E.map(e=>(0,c.jsxs)(j,{children:[(0,c.jsx)(b,{children:(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{style:{fontWeight:"600",marginBottom:"4px"},children:e.name}),(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Joined: ",new Date(e.registeredDate).toLocaleDateString()]})]})}),(0,c.jsx)(b,{children:(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{style:{marginBottom:"4px"},children:e.phone}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.email})]})}),(0,c.jsx)(b,{children:e.restaurant}),(0,c.jsx)(b,{children:e.totalOrders}),(0,c.jsx)(b,{children:(0,d.vv)(e.totalSpent,D)}),(0,c.jsx)(b,{children:(0,c.jsx)(y,{status:e.status,children:e.status})}),(0,c.jsx)(b,{children:(0,c.jsx)(F,{tier:e.tier,children:e.tier})}),(0,c.jsx)(b,{children:e.points.toLocaleString()})]},e.id))})]})})]})]})})}}}]);