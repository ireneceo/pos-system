"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7795],{2488:(e,t,r)=>{r.d(t,{DO:()=>l,Jt:()=>c,Qn:()=>d});r(9950);var a=r(4752),i=r(4414);const n=a.Ay.div`
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
`,s=a.Ay.input`
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
`,o=a.Ay.select`
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
`,d=e=>{let{children:t,className:r,style:a,...s}=e;return(0,i.jsx)(n,{className:r,style:a,...s,children:t})},l=e=>{let{placeholder:t="Search...",...r}=e;return(0,i.jsx)(s,{placeholder:t,...r})},c=e=>{let{children:t,...r}=e;return(0,i.jsx)(o,{...r,children:t})}},4021:(e,t,r)=>{r.d(t,{i1:()=>n});var a=r(9950),i=r(1367);r(6038);const n=()=>{const{user:e}=(0,i.As)(),[t,r]=(0,a.useState)("USD"),[n,s]=(0,a.useState)(["USD"]),[o,d]=(0,a.useState)(!0),[l,c]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{if(null===e||void 0===e||!e.brand_id)return r("USD"),s(["USD","MYR","KRW"]),void d(!1);try{const t=localStorage.getItem("token"),a=await fetch(`/api/currencies/brands/${e.brand_id}`,{headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"}});if(a.ok){const e=await a.json();e.success&&e.data&&(r(e.data.default_currency||"USD"),s(e.data.supported_currencies||["USD"]))}else r("USD"),s(["USD","MYR","KRW"])}catch(t){console.error("Failed to fetch brand currency:",t),c("Failed to load currency settings"),r("USD"),s(["USD","MYR","KRW"])}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.brand_id]),{defaultCurrency:t,supportedCurrencies:n,loading:o,error:l}}},7795:(e,t,r)=>{r.r(t),r.d(t,{default:()=>A});var a=r(9950),i=r(4752),n=r(3310),s=r(2488),o=r(7492),d=r(4021),l=r(6038),c=r(4414);const x=i.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,p=i.Ay.div`
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
`,h=i.Ay.div`
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
`,u=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=i.Ay.div`
  padding: 32px;
`,g=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,j=i.Ay.table`
  width: 100%;
  border-collapse: collapse;
`,v=i.Ay.thead`
  border-bottom: 2px solid #E6EBF1;
`,f=i.Ay.tr`
  border-bottom: 1px solid #F1F5F9;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`,w=i.Ay.th`
  padding: 16px 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,b=i.Ay.td`
  padding: 16px 12px;
  font-size: 14px;
  color: #374151;
`,F=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#DEF7EC";case"inactive":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#065F46";case"inactive":return"#991B1B";default:return"#374151"}}};
`,y=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${e=>{switch(e.tier){case"platinum":return"#ECFDF5";case"gold":return"#FFFBEB";case"silver":return"#F8FAFC";case"bronze":return"#FEF2F2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.tier){case"platinum":return"#065F46";case"gold":return"#92400E";case"silver":return"#475569";case"bronze":return"#991B1B";default:return"#374151"}}};
`,S=i.Ay.div`
  text-align: center;
  padding: 40px 20px;
  color: #6B7C93;
  font-size: 14px;
`,A=()=>{const[e,t]=(0,a.useState)([]),[r,i]=(0,a.useState)(!0),[A,B]=(0,a.useState)(""),[C,D]=(0,a.useState)("all"),[k,E]=(0,a.useState)("all"),[_,z]=(0,a.useState)("all"),{defaultCurrency:O}=(0,d.i1)(),[L,R]=(0,a.useState)("MYR");(0,a.useEffect)(()=>{O&&R(O)},[O]),(0,a.useEffect)(()=>{(async()=>{try{i(!0);const e=1,r=await fetch(`/api/customers/${e}`),a=await r.json();if(a.success){const e=(a.data||a).map(e=>{var t;return{id:e.customer.id,name:e.customer.name,phone:e.customer.phone,email:e.customer.email||"",restaurant:"",registeredDate:e.first_order_at?new Date(e.first_order_at).toISOString().split("T")[0]:"",lastVisit:e.last_order_at?new Date(e.last_order_at).toISOString().split("T")[0]:"",totalOrders:e.total_orders||0,totalSpent:parseFloat(e.total_spent||0),status:e.last_order_at&&new Date(e.last_order_at)>new Date(Date.now()-2592e6)?"active":"inactive",tier:(null===(t=e.loyalty_tier)||void 0===t?void 0:t.toLowerCase())||"bronze",points:e.points||0}});console.log("ManagerCustomersPage - Loaded customers from API:",e.length),t(e)}else console.error("ManagerCustomersPage - Failed to load customers:",a.error),t([])}catch(e){console.error("ManagerCustomersPage - Error loading customers:",e),t([])}finally{i(!1)}})()},[]);const U=e.filter(e=>{const t=e.name.toLowerCase().includes(A.toLowerCase())||e.email.toLowerCase().includes(A.toLowerCase())||e.phone.includes(A),r="all"===C||e.status===C,a="all"===k||e.tier===k,i="all"===_||e.restaurant===_;return t&&r&&a&&i}),I=e.length,M=e.filter(e=>"active"===e.status).length,T=e.reduce((e,t)=>e+t.totalSpent,0),$=e.length>0?T/e.reduce((e,t)=>e+t.totalOrders,0):0;return(0,c.jsx)(n.A,{children:(0,c.jsxs)(x,{children:[(0,c.jsx)(p,{children:(0,c.jsx)(h,{children:(0,c.jsx)(u,{children:"Customer Management"})})}),(0,c.jsxs)(m,{children:[(0,c.jsxs)(o.MD,{children:[(0,c.jsxs)(o.hI,{children:[(0,c.jsx)(o.Os,{children:I}),(0,c.jsx)(o.v0,{children:"Total Customers"})]}),(0,c.jsxs)(o.hI,{children:[(0,c.jsx)(o.Os,{children:M}),(0,c.jsx)(o.v0,{children:"Active Customers"})]}),(0,c.jsxs)(o.hI,{children:[(0,c.jsx)(o.Os,{children:(0,l.vv)(T,L)}),(0,c.jsx)(o.v0,{children:"Total Revenue"})]}),(0,c.jsxs)(o.hI,{children:[(0,c.jsx)(o.Os,{children:(0,l.vv)($,L)}),(0,c.jsx)(o.v0,{children:"Avg Order Value"})]})]}),(0,c.jsxs)(s.Qn,{children:[(0,c.jsx)(s.DO,{type:"text",placeholder:"Search customers...",value:A,onChange:e=>B(e.target.value)}),(0,c.jsxs)(s.Jt,{value:C,onChange:e=>D(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Status"}),(0,c.jsx)("option",{value:"active",children:"Active"}),(0,c.jsx)("option",{value:"inactive",children:"Inactive"})]}),(0,c.jsxs)(s.Jt,{value:k,onChange:e=>E(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Tiers"}),(0,c.jsx)("option",{value:"platinum",children:"Platinum"}),(0,c.jsx)("option",{value:"gold",children:"Gold"}),(0,c.jsx)("option",{value:"silver",children:"Silver"}),(0,c.jsx)("option",{value:"bronze",children:"Bronze"})]}),(0,c.jsxs)(s.Jt,{value:_,onChange:e=>z(e.target.value),children:[(0,c.jsx)("option",{value:"all",children:"All Restaurants"}),(0,c.jsx)("option",{value:"Korean BBQ House",children:"Korean BBQ House"}),(0,c.jsx)("option",{value:"Nasi Lemak Wangi",children:"Nasi Lemak Wangi"}),(0,c.jsx)("option",{value:"Seoul Garden BBQ",children:"Seoul Garden BBQ"})]})]}),(0,c.jsx)(g,{children:r?(0,c.jsx)(S,{children:"Loading customers..."}):(0,c.jsxs)(j,{children:[(0,c.jsx)(v,{children:(0,c.jsxs)(f,{children:[(0,c.jsx)(w,{children:"Customer"}),(0,c.jsx)(w,{children:"Contact"}),(0,c.jsx)(w,{children:"Restaurant"}),(0,c.jsx)(w,{children:"Orders"}),(0,c.jsx)(w,{children:"Total Spent"}),(0,c.jsx)(w,{children:"Status"}),(0,c.jsx)(w,{children:"Tier"}),(0,c.jsx)(w,{children:"Points"})]})}),(0,c.jsx)("tbody",{children:U.map(e=>(0,c.jsxs)(f,{children:[(0,c.jsx)(b,{children:(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{style:{fontWeight:"600",marginBottom:"4px"},children:e.name}),(0,c.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280"},children:["Joined: ",new Date(e.registeredDate).toLocaleDateString()]})]})}),(0,c.jsx)(b,{children:(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{style:{marginBottom:"4px"},children:e.phone}),(0,c.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.email})]})}),(0,c.jsx)(b,{children:e.restaurant}),(0,c.jsx)(b,{children:e.totalOrders}),(0,c.jsx)(b,{children:(0,l.vv)(e.totalSpent,L)}),(0,c.jsx)(b,{children:(0,c.jsx)(F,{status:e.status,children:e.status})}),(0,c.jsx)(b,{children:(0,c.jsx)(y,{tier:e.tier,children:e.tier})}),(0,c.jsx)(b,{children:e.points.toLocaleString()})]},e.id))})]})})]})]})})}}}]);