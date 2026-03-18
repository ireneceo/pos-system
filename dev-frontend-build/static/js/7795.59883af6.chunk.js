"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7795],{2488:(e,t,i)=>{i.d(t,{DO:()=>x,Jt:()=>h,Qn:()=>c});i(9950);var r=i(4752),n=i(4414);const a=r.Ay.div`
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
`,o=r.Ay.div`
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
`,c=e=>{let{children:t,className:i,style:r,...s}=e;return(0,n.jsx)(a,{className:i,style:r,...s,children:t})},x=e=>{let{placeholder:t="Search...",value:i,onChange:r,style:a,...d}=e;return(0,n.jsxs)(o,{style:a,children:[(0,n.jsx)(s,{placeholder:t,value:i,onChange:r,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:i?"36px":"16px"},...d}),i&&(0,n.jsx)(l,{type:"button",onClick:()=>null===r||void 0===r?void 0:r({target:{value:""}}),"aria-label":"Clear search",children:(0,n.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,n.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,n.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},h=e=>{let{children:t,...i}=e;return(0,n.jsx)(d,{...i,children:t})}},4021:(e,t,i)=>{i.d(t,{i1:()=>s});var r=i(9950),n=i(1367),a=i(6038);const s=()=>{const{user:e}=(0,n.As)(),[t,i]=(0,r.useState)("RM"),[s]=(0,r.useState)(Object.keys(a.DL)),[o,l]=(0,r.useState)(!0),[d,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const t=window.location.pathname.split("/"),r=t.indexOf("restaurant");let n=r>=0?t[r+1]:null;if(!n&&null!==e&&void 0!==e&&e.restaurant_id&&(n=e.restaurant_id.toString()),!n)return i("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),t=await fetch(`/api/restaurants/${n}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(t.ok){var a;const e=await t.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"MYR";i(r)}else i("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),c("Failed to load currency settings"),i("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:t,supportedCurrencies:s,loading:o,error:d}}},7795:(e,t,i)=>{i.r(t),i.d(t,{default:()=>C});var r=i(9950),n=i(4752),a=i(2488),s=i(8409),o=i(4021),l=i(6038),d=i(4414);const c=n.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,x=n.Ay.div`
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
`,h=n.Ay.div`
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
`,p=n.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=n.Ay.div`
  padding: 32px;
`,m=n.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,g=n.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,w=n.Ay.thead`
  border-bottom: 2px solid #E6EBF1;
`,v=n.Ay.tr`
  border-bottom: 1px solid #F1F5F9;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,j=n.Ay.th`
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
`,f=n.Ay.td`
  padding: 16px 12px;
  font-size: 14px;
  color: #374151;

  /* 정렬 규칙: 숫자는 우측, 상태/등급은 가운데 */
  &:nth-child(4) { text-align: right; } /* Orders */
  &:nth-child(5) { text-align: right; } /* Total Spent */
  &:nth-child(6) { text-align: center; } /* Status */
  &:nth-child(7) { text-align: center; } /* Tier */
  &:nth-child(8) { text-align: right; } /* Points */
`,y=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"inactive":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"inactive":return"#DC2626";default:return"#374151"}}};
`,b=n.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${e=>{switch(e.tier){case"platinum":return"#ECFDF5";case"gold":return"#FFFBEB";case"silver":return"#F8FAFC";case"bronze":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.tier){case"platinum":return"#065F46";case"gold":return"#92400E";case"silver":return"#475569";case"bronze":return"#991B1B";default:return"#374151"}}};
`,F=n.Ay.div`
  text-align: center;
  padding: 40px 20px;
  color: #6B7C93;
  font-size: 14px;
`,C=()=>{const[e,t]=(0,r.useState)([]),[i,n]=(0,r.useState)(!0),[C,A]=(0,r.useState)(""),[S,B]=(0,r.useState)("all"),[k,E]=(0,r.useState)("all"),[_,z]=(0,r.useState)("all"),{defaultCurrency:O}=(0,o.i1)(),[D,L]=(0,r.useState)("RM");(0,r.useEffect)(()=>{O&&L(O)},[O]),(0,r.useEffect)(()=>{(async()=>{try{n(!0);const e=1,i=await fetch(`/api/customers/${e}`),r=await i.json();if(r.success){const e=(r.data||r).map(e=>{var t;return{id:e.customer.id,name:e.customer.name,phone:e.customer.phone,email:e.customer.email||"",restaurant:"",registeredDate:e.first_order_at?new Date(e.first_order_at).toISOString().split("T")[0]:"",lastVisit:e.last_order_at?new Date(e.last_order_at).toISOString().split("T")[0]:"",totalOrders:e.total_orders||0,totalSpent:parseFloat(e.total_spent||0),status:e.last_order_at&&new Date(e.last_order_at)>new Date(Date.now()-2592e6)?"active":"inactive",tier:(null===(t=e.loyalty_tier)||void 0===t?void 0:t.toLowerCase())||"bronze",points:e.points||0}});console.log("ManagerCustomersPage - Loaded customers from API:",e.length),t(e)}else console.error("ManagerCustomersPage - Failed to load customers:",r.error),t([])}catch(e){console.error("ManagerCustomersPage - Error loading customers:",e),t([])}finally{n(!1)}})()},[]);const T=e.filter(e=>{const t=e.name.toLowerCase().includes(C.toLowerCase())||e.email.toLowerCase().includes(C.toLowerCase())||e.phone.includes(C),i="all"===S||e.status===S,r="all"===k||e.tier===k,n="all"===_||e.restaurant===_;return t&&i&&r&&n}),M=e.length,R=e.filter(e=>"active"===e.status).length,I=e.reduce((e,t)=>e+t.totalSpent,0),P=e.length>0?I/e.reduce((e,t)=>e+t.totalOrders,0):0;return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsx)(x,{children:(0,d.jsx)(h,{children:(0,d.jsx)(p,{children:"Customer Management"})})}),(0,d.jsxs)(u,{children:[(0,d.jsxs)(s.MD,{children:[(0,d.jsxs)(s.hI,{children:[(0,d.jsx)(s.Os,{children:M}),(0,d.jsx)(s.v0,{children:"Total Customers"})]}),(0,d.jsxs)(s.hI,{children:[(0,d.jsx)(s.Os,{children:R}),(0,d.jsx)(s.v0,{children:"Active Customers"})]}),(0,d.jsxs)(s.hI,{children:[(0,d.jsx)(s.Os,{children:(0,l.vv)(I,D)}),(0,d.jsx)(s.v0,{children:"Total Revenue"})]}),(0,d.jsxs)(s.hI,{children:[(0,d.jsx)(s.Os,{children:(0,l.vv)(P,D)}),(0,d.jsx)(s.v0,{children:"Avg Order Value"})]})]}),(0,d.jsxs)(a.Qn,{children:[(0,d.jsxs)(a.Jt,{value:S,onChange:e=>B(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,d.jsxs)(a.Jt,{value:k,onChange:e=>E(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Tiers"}),(0,d.jsx)("option",{value:"platinum",children:"Platinum"}),(0,d.jsx)("option",{value:"gold",children:"Gold"}),(0,d.jsx)("option",{value:"silver",children:"Silver"}),(0,d.jsx)("option",{value:"bronze",children:"Bronze"})]}),(0,d.jsxs)(a.Jt,{value:_,onChange:e=>z(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Restaurants"}),(0,d.jsx)("option",{value:"Korean BBQ House",children:"Korean BBQ House"}),(0,d.jsx)("option",{value:"Nasi Lemak Wangi",children:"Nasi Lemak Wangi"}),(0,d.jsx)("option",{value:"Seoul Garden BBQ",children:"Seoul Garden BBQ"})]}),(0,d.jsx)(a.DO,{type:"text",placeholder:"Search customers...",value:C,onChange:e=>A(e.target.value)})]}),(0,d.jsx)(m,{children:i?(0,d.jsx)(F,{children:"Loading customers..."}):(0,d.jsxs)(g,{children:[(0,d.jsx)(w,{children:(0,d.jsxs)(v,{children:[(0,d.jsx)(j,{children:"Customer"}),(0,d.jsx)(j,{children:"Contact"}),(0,d.jsx)(j,{children:"Restaurant"}),(0,d.jsx)(j,{children:"Orders"}),(0,d.jsx)(j,{children:"Total Spent"}),(0,d.jsx)(j,{children:"Status"}),(0,d.jsx)(j,{children:"Tier"}),(0,d.jsx)(j,{children:"Points"})]})}),(0,d.jsx)("tbody",{children:T.map(e=>(0,d.jsxs)(v,{children:[(0,d.jsx)(f,{children:(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontWeight:"600",marginBottom:"4px"},children:e.name}),(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Joined: ",new Date(e.registeredDate).toLocaleDateString()]})]})}),(0,d.jsx)(f,{children:(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{marginBottom:"4px"},children:e.phone}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.email})]})}),(0,d.jsx)(f,{children:e.restaurant}),(0,d.jsx)(f,{children:e.totalOrders}),(0,d.jsx)(f,{children:(0,l.vv)(e.totalSpent,D)}),(0,d.jsx)(f,{children:(0,d.jsx)(y,{status:e.status,children:e.status})}),(0,d.jsx)(f,{children:(0,d.jsx)(b,{tier:e.tier,children:e.tier})}),(0,d.jsx)(f,{children:e.points.toLocaleString()})]},e.id))})]})})]})]})})}}}]);