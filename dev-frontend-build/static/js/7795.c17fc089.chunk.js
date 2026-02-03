"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7795],{2488:(e,t,r)=>{r.d(t,{DO:()=>d,Jt:()=>c,Qn:()=>o});r(9950);var i=r(4752),n=r(4414);const a=i.Ay.div`
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
`,l=i.Ay.select`
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
`,o=e=>{let{children:t,className:r,style:i,...s}=e;return(0,n.jsx)(a,{className:r,style:i,...s,children:t})},d=e=>{let{placeholder:t="Search...",...r}=e;return(0,n.jsx)(s,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,n.jsx)(l,{...r,children:t})}},4021:(e,t,r)=>{r.d(t,{i1:()=>s});var i=r(9950),n=r(1367),a=r(6038);const s=()=>{const{user:e}=(0,n.As)(),[t,r]=(0,i.useState)("RM"),[s,l]=(0,i.useState)(Object.keys(a.DL)),[o,d]=(0,i.useState)(!0),[c,x]=(0,i.useState)(null);return(0,i.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),i=t.indexOf("restaurant");let n=i>=0?t[i+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),i=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";r(i)}else r("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),x("Failed to load currency settings"),r("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:o,error:c}}},7795:(e,t,r)=>{r.r(t),r.d(t,{default:()=>A});var i=r(9950),n=r(4752),a=r(3310),s=r(2488),l=r(2674),o=r(4021),d=r(6038),c=r(4414);const x=n.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,h=n.Ay.div`
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
`,p=n.Ay.div`
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
`,u=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=n.Ay.div`
  padding: 32px;
`,m=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,v=n.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,j=n.Ay.thead`
  border-bottom: 2px solid #E6EBF1;
`,w=n.Ay.tr`
  border-bottom: 1px solid #F1F5F9;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,f=n.Ay.th`
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
`,b=n.Ay.td`
  padding: 16px 12px;
  font-size: 14px;
  color: #374151;

  /* 정렬 규칙: 숫자는 우측, 상태/등급은 가운데 */
  &:nth-child(4) { text-align: right; } /* Orders */
  &:nth-child(5) { text-align: right; } /* Total Spent */
  &:nth-child(6) { text-align: center; } /* Status */
  &:nth-child(7) { text-align: center; } /* Tier */
  &:nth-child(8) { text-align: right; } /* Points */
`,F=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#DEF7EC";case"inactive":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#065F46";case"inactive":return"#991B1B";default:return"#374151"}}};
`,y=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${e=>{switch(e.tier){case"platinum":return"#ECFDF5";case"gold":return"#FFFBEB";case"silver":return"#F8FAFC";case"bronze":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.tier){case"platinum":return"#065F46";case"gold":return"#92400E";case"silver":return"#475569";case"bronze":return"#991B1B";default:return"#374151"}}};
`,S=n.Ay.div`
  text-align: center;
  padding: 40px 20px;
  color: #6B7C93;
  font-size: 14px;
`,A=()=>{const[e,t]=(0,i.useState)([]),[r,n]=(0,i.useState)(!0),[A,B]=(0,i.useState)(""),[C,k]=(0,i.useState)("all"),[E,_]=(0,i.useState)("all"),[z,O]=(0,i.useState)("all"),{defaultCurrency:D}=(0,o.i1)(),[T,L]=(0,i.useState)("RM");(0,i.useEffect)(()=>{D&&L(D)},[D]),(0,i.useEffect)(()=>{(async()=>{try{n(!0);const e=1,r=await fetch(`/api/customers/${e}`),i=await r.json();if(i.success){const e=(i.data||i).map(e=>{var t;return{id:e.customer.id,name:e.customer.name,phone:e.customer.phone,email:e.customer.email||"",restaurant:"",registeredDate:e.first_order_at?new Date(e.first_order_at).toISOString().split("T")[0]:"",lastVisit:e.last_order_at?new Date(e.last_order_at).toISOString().split("T")[0]:"",totalOrders:e.total_orders||0,totalSpent:parseFloat(e.total_spent||0),status:e.last_order_at&&new Date(e.last_order_at)>new Date(Date.now()-2592e6)?"active":"inactive",tier:(null===(t=e.loyalty_tier)||void 0===t?void 0:t.toLowerCase())||"bronze",points:e.points||0}});console.log("ManagerCustomersPage - Loaded customers from API:",e.length),t(e)}else console.error("ManagerCustomersPage - Failed to load customers:",i.error),t([])}catch(e){console.error("ManagerCustomersPage - Error loading customers:",e),t([])}finally{n(!1)}})()},[]);const M=e.filter(e=>{const t=e.name.toLowerCase().includes(A.toLowerCase())||e.email.toLowerCase().includes(A.toLowerCase())||e.phone.includes(A),r="all"===C||e.status===C,i="all"===E||e.tier===E,n="all"===z||e.restaurant===z;return t&&r&&i&&n}),I=e.length,R=e.filter(e=>"active"===e.status).length,P=e.reduce((e,t)=>e+t.totalSpent,0),$=e.length>0?P/e.reduce((e,t)=>e+t.totalOrders,0):0;return(0,c.jsx)(a.A,{children:(0,c.jsxs)(x,{children:[(0,c.jsx)(h,{children:(0,c.jsx)(p,{children:(0,c.jsx)(u,{children:"Customer Management"})})}),(0,c.jsxs)(g,{children:[(0,c.jsxs)(l.MD,{children:[(0,c.jsxs)(l.hI,{children:[(0,c.jsx)(l.Os,{children:I}),(0,c.jsx)(l.v0,{children:"Total Customers"})]}),(0,c.jsxs)(l.hI,{children:[(0,c.jsx)(l.Os,{children:R}),(0,c.jsx)(l.v0,{children:"Active Customers"})]}),(0,c.jsxs)(l.hI,{children:[(0,c.jsx)(l.Os,{children:(0,d.vv)(P,T)}),(0,c.jsx)(l.v0,{children:"Total Revenue"})]}),(0,c.jsxs)(l.hI,{children:[(0,c.jsx)(l.Os,{children:(0,d.vv)($,T)}),(0,c.jsx)(l.v0,{children:"Avg Order Value"})]})]}),(0,c.jsxs)(s.Qn,{children:[(0,c.jsx)(s.DO,{type:"text",placeholder:"Search customers...",value:A,onChange:e=>B(e.target.value)}),(0,c.jsxs)(s.Jt,{value:C,onChange:e=>k(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,c.jsxs)(s.Jt,{value:E,onChange:e=>_(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Tiers"}),(0,c.jsx)("option",{value:"platinum",children:"Platinum"}),(0,c.jsx)("option",{value:"gold",children:"Gold"}),(0,c.jsx)("option",{value:"silver",children:"Silver"}),(0,c.jsx)("option",{value:"bronze",children:"Bronze"})]}),(0,c.jsxs)(s.Jt,{value:z,onChange:e=>O(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Restaurants"}),(0,c.jsx)("option",{value:"Korean BBQ House",children:"Korean BBQ House"}),(0,c.jsx)("option",{value:"Nasi Lemak Wangi",children:"Nasi Lemak Wangi"}),(0,c.jsx)("option",{value:"Seoul Garden BBQ",children:"Seoul Garden BBQ"})]})]}),(0,c.jsx)(m,{children:r?(0,c.jsx)(S,{children:"Loading customers..."}):(0,c.jsxs)(v,{children:[(0,c.jsx)(j,{children:(0,c.jsxs)(w,{children:[(0,c.jsx)(f,{children:"Customer"}),(0,c.jsx)(f,{children:"Contact"}),(0,c.jsx)(f,{children:"Restaurant"}),(0,c.jsx)(f,{children:"Orders"}),(0,c.jsx)(f,{children:"Total Spent"}),(0,c.jsx)(f,{children:"Status"}),(0,c.jsx)(f,{children:"Tier"}),(0,c.jsx)(f,{children:"Points"})]})}),(0,c.jsx)("tbody",{children:M.map(e=>(0,c.jsxs)(w,{children:[(0,c.jsx)(b,{children:(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{style:{fontWeight:"600",marginBottom:"4px"},children:e.name}),(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Joined: ",new Date(e.registeredDate).toLocaleDateString()]})]})}),(0,c.jsx)(b,{children:(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{style:{marginBottom:"4px"},children:e.phone}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.email})]})}),(0,c.jsx)(b,{children:e.restaurant}),(0,c.jsx)(b,{children:e.totalOrders}),(0,c.jsx)(b,{children:(0,d.vv)(e.totalSpent,T)}),(0,c.jsx)(b,{children:(0,c.jsx)(F,{status:e.status,children:e.status})}),(0,c.jsx)(b,{children:(0,c.jsx)(y,{tier:e.tier,children:e.tier})}),(0,c.jsx)(b,{children:e.points.toLocaleString()})]},e.id))})]})})]})]})})}}}]);