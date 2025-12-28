"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5008],{2488:(e,n,a)=>{a.d(n,{DO:()=>o,Jt:()=>c,Qn:()=>d});a(9950);var r=a(4752),t=a(4414);const i=r.Ay.div`
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
`,l=r.Ay.input`
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
`,s=r.Ay.select`
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
`,d=e=>{let{children:n,className:a,style:r,...l}=e;return(0,t.jsx)(i,{className:a,style:r,...l,children:n})},o=e=>{let{placeholder:n="Search...",...a}=e;return(0,t.jsx)(l,{placeholder:n,...a})},c=e=>{let{children:n,...a}=e;return(0,t.jsx)(s,{...a,children:n})}},5008:(e,n,a)=>{a.r(n),a.d(n,{default:()=>K});var r=a(9950),t=a(4752),i=a(3310),l=a(2488),s=a(6038),d=a(4414);const o=t.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,c=t.Ay.div`
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
`,p=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=t.Ay.div`
  display: flex;
  gap: 12px;
`,u=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,m=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,g=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`,y=t.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,j=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,v=t.Ay.div`
  display: grid;
  grid-template-columns: 2.5fr 1.5fr 1fr 1fr 1fr 1fr 180px;
  gap: 16px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 1200px) {
    grid-template-columns: 2fr 1fr 1fr 150px;
    & > span:nth-child(3),
    & > span:nth-child(4),
    & > span:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 120px;
    & > span:not(:first-child):not(:last-child) {
      display: none;
    }
  }
`,b=t.Ay.div`
  display: grid;
  grid-template-columns: 2.5fr 1.5fr 1fr 1fr 1fr 1fr 180px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 1200px) {
    grid-template-columns: 2fr 1fr 1fr 150px;
    & > div:nth-child(3),
    & > div:nth-child(4),
    & > div:nth-child(5) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 120px;
    & > div:not(:first-child):not(:last-child) {
      display: none;
    }
    padding: 16px;
  }
`,w=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,A=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,F=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,C=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"self"===e.type?"#ECFDF5":"#DBEAFE"};
  color: ${e=>"self"===e.type?"#059669":"#1E40AF"};
`,S=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.plan){case"enterprise":return"#EDE9FE";case"professional":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.plan){case"enterprise":return"#7C3AED";case"professional":return"#1E40AF";default:return"#6B7280"}}};
`,k=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #059669;
`,P=t.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":default:return"#F3F4F6";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"cancelled":return"#DC2626";default:return"#6B7280"}}};
`,E=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,M=t.Ay.div`
  width: 100px;
  height: 6px;
  background: #F3F4F6;
  border-radius: 3px;
  overflow: hidden;
`,D=t.Ay.div`
  height: 100%;
  width: ${e=>e.percentage}%;
  background: ${e=>e.percentage>90?"#DC2626":e.percentage>75?"#D97706":"#059669"};
  transition: width 0.3s ease;
`,B=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,N=t.Ay.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;

  @media (max-width: 1200px) {
    gap: 4px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }
`,z=t.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  color: #6B7280;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    background: #F4F3FF;
  }

  &:last-child {
    margin-right: 0;
  }
`,T=t.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`,R=t.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
`,L=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
  
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #0A2540;
    margin: 0;
  }
`,I=t.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #0A2540;
  }
`,O=t.Ay.div`
  padding: 24px;
`,$=t.Ay.div`
  margin-bottom: 16px;
`,U=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,J=t.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,Y=t.Ay.ul`
  margin: 0;
  padding-left: 16px;
  font-size: 14px;
  color: #0A2540;
  
  li {
    margin-bottom: 4px;
  }
`,Q=t.Ay.div`
  margin-bottom: 20px;
`,q=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,G=t.Ay.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,H=t.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,K=()=>{const[e,n]=(0,r.useState)([]),[a,t]=(0,r.useState)(""),[K,V]=(0,r.useState)("all"),[W,X]=(0,r.useState)("all"),[Z,_]=(0,r.useState)("all"),[ee,ne]=(0,r.useState)(null),[ae,re]=(0,r.useState)(!1),[te,ie]=(0,r.useState)(!1),[le,se]=(0,r.useState)(!1),[de,oe]=(0,r.useState)(!1),[ce,pe]=(0,r.useState)(!1),[xe,he]=(0,r.useState)(""),[ue,me]=(0,r.useState)(""),[ge,ye]=(0,r.useState)(""),[je,fe]=(0,r.useState)({name:"",managerId:"",managerName:"",planType:"basic",paymentModel:"self",billingCycle:"monthly"});(0,r.useEffect)(()=>{n([])},[]);const ve=e.filter(e=>{const n=e.restaurantName.toLowerCase().includes(a.toLowerCase())||e.managerName.toLowerCase().includes(a.toLowerCase()),r="all"===K||e.status===K,t="all"===W||e.planType===W,i="all"===Z||e.paymentModel===Z;return n&&r&&t&&i}),be=e.length,we=e.filter(e=>"active"===e.status).length,Ae=e.filter(e=>"trial"===e.status).length,Fe=e.filter(e=>"self"===e.paymentModel).length,Ce=e.filter(e=>"active"===e.status).reduce((e,n)=>e+("monthly"===n.billingCycle?n.monthlyFee:n.annualFee/12),0),Se=e=>-1===e?"Unlimited":e.toLocaleString();return(0,d.jsx)(i.A,{children:(0,d.jsxs)(o,{children:[(0,d.jsxs)(c,{children:[(0,d.jsx)(x,{children:"Restaurant Subscriptions"}),(0,d.jsxs)(h,{children:[(0,d.jsx)(u,{variant:"secondary",onClick:()=>{const e=[["Restaurant Name","Manager","Plan","Status","Monthly Fee","Payment Model","Usage","Last Payment","Next Payment"].join(","),...ve.map(e=>[`"${e.restaurantName}"`,`"${e.managerName}"`,e.planType,e.status,`RM ${e.monthlyFee}`,"self"===e.paymentModel?"Self-Paying":"Manager-Paid",e.orderLimit>0?`${e.usagePercentage}%`:"Unlimited",e.lastPayment,e.nextPayment].join(","))].join("\n"),n=new Blob([e],{type:"text/csv"}),a=URL.createObjectURL(n),r=document.createElement("a");r.href=a,r.download=`restaurant-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(a)},children:"Export Report"}),(0,d.jsx)(u,{variant:"primary",onClick:()=>{fe({name:"",managerId:"",managerName:"",planType:"basic",paymentModel:"self",billingCycle:"monthly"}),pe(!0)},children:"Add Restaurant"})]})]}),(0,d.jsxs)(p,{children:[(0,d.jsxs)(m,{children:[(0,d.jsxs)(g,{color:"#059669",children:[(0,d.jsx)(y,{children:be}),(0,d.jsx)(j,{children:"Total Restaurants"})]}),(0,d.jsxs)(g,{color:"#2563EB",children:[(0,d.jsx)(y,{children:we}),(0,d.jsx)(j,{children:"Active Subscriptions"})]}),(0,d.jsxs)(g,{color:"#D97706",children:[(0,d.jsx)(y,{children:Ae}),(0,d.jsx)(j,{children:"Trial Subscriptions"})]}),(0,d.jsxs)(g,{color:"#7C3AED",children:[(0,d.jsx)(y,{children:Fe}),(0,d.jsx)(j,{children:"Self-Paying"})]}),(0,d.jsxs)(g,{color:"#DC2626",children:[(0,d.jsx)(y,{children:(0,s.vv)(Ce)}),(0,d.jsx)(j,{children:"Monthly Revenue"})]})]}),(0,d.jsxs)(l.Qn,{children:[(0,d.jsx)(l.DO,{type:"text",placeholder:"Search restaurants or managers...",value:a,onChange:e=>t(e.target.value)}),(0,d.jsxs)(l.Jt,{value:K,onChange:e=>V(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"trial",children:"Trial"}),(0,d.jsx)("option",{value:"expired",children:"Expired"}),(0,d.jsx)("option",{value:"suspended",children:"Suspended"}),(0,d.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,d.jsxs)(l.Jt,{value:W,onChange:e=>X(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Plans"}),(0,d.jsx)("option",{value:"basic",children:"Basic"}),(0,d.jsx)("option",{value:"professional",children:"Professional"}),(0,d.jsx)("option",{value:"enterprise",children:"Enterprise"})]}),(0,d.jsxs)(l.Jt,{value:Z,onChange:e=>_(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Payment Types"}),(0,d.jsx)("option",{value:"self",children:"Self-Paying"}),(0,d.jsx)("option",{value:"manager",children:"Manager-Paid"})]})]}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(v,{children:[(0,d.jsx)("span",{children:"Restaurant"}),(0,d.jsx)("span",{children:"Manager"}),(0,d.jsx)("span",{children:"Plan"}),(0,d.jsx)("span",{children:"Price"}),(0,d.jsx)("span",{children:"Status"}),(0,d.jsx)("span",{children:"Usage"}),(0,d.jsx)("span",{children:"Actions"})]}),ve.map(e=>(0,d.jsxs)(b,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(A,{children:e.restaurantName}),(0,d.jsxs)(F,{children:[(0,d.jsx)(C,{type:e.paymentModel,children:"self"===e.paymentModel?"Self":"Manager"}),e.payerName]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:e.managerName}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.managerId})]}),(0,d.jsx)(S,{plan:e.planType,children:e.planType}),(0,d.jsxs)(k,{children:[(0,s.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee),(0,d.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:["/","monthly"===e.billingCycle?"month":"year"]})]}),(0,d.jsx)(P,{status:e.status,children:e.status}),(0,d.jsxs)(E,{children:[(0,d.jsx)(M,{children:(0,d.jsx)(D,{percentage:e.usagePercentage})}),(0,d.jsxs)(B,{children:[e.currentOrders.toLocaleString()," / ",Se(e.orderLimit)]})]}),(0,d.jsxs)(N,{children:[(0,d.jsx)(z,{onClick:()=>(e=>{ne(e),re(!0)})(e),children:"Details"}),"active"===e.status||"trial"===e.status?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(z,{onClick:()=>(e=>{ne(e),he(e.planType),ie(!0)})(e),children:"Plan"}),(0,d.jsx)(z,{onClick:()=>(e=>{ne(e),ye(""),oe(!0)})(e),children:"Suspend"})]}):(0,d.jsx)(z,{onClick:()=>{return a=e.id,n(e=>e.map(e=>e.id===a?{...e,status:"active",updatedAt:(new Date).toISOString().split("T")[0]}:e)),void alert("Subscription reactivated successfully!");var a},disabled:"cancelled"===e.status,children:"Reactivate"})]})]},e.id)),0===ve.length&&(0,d.jsx)("div",{style:{padding:"60px 20px",textAlign:"center",color:"#6B7280"},children:"No subscriptions found"})]}),ae&&ee&&(0,d.jsx)(T,{children:(0,d.jsxs)(R,{children:[(0,d.jsxs)(L,{children:[(0,d.jsx)("h2",{children:"Subscription Details"}),(0,d.jsx)(I,{onClick:()=>re(!1),children:"\xd7"})]}),(0,d.jsxs)(O,{children:[(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Restaurant"}),(0,d.jsx)(J,{children:ee.restaurantName})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Manager"}),(0,d.jsx)(J,{children:ee.managerName})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Plan"}),(0,d.jsx)(J,{children:ee.planType})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Status"}),(0,d.jsx)(P,{status:ee.status,children:ee.status})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Pricing"}),(0,d.jsxs)(J,{children:[(0,s.vv)("monthly"===ee.billingCycle?ee.monthlyFee:ee.annualFee),"/",ee.billingCycle]})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Order Usage"}),(0,d.jsxs)(J,{children:[ee.currentOrders.toLocaleString()," / ",Se(ee.orderLimit),ee.orderLimit>0&&` (${ee.usagePercentage}%)`]})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Payment Model"}),(0,d.jsxs)(J,{children:[(0,d.jsx)(C,{type:ee.paymentModel,children:"self"===ee.paymentModel?"Self-Paying":"Manager-Paid"}),(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ",ee.payerName]})]})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Features"}),(0,d.jsx)(Y,{children:ee.features.map((e,n)=>(0,d.jsx)("li",{children:e},n))})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Subscription Period"}),(0,d.jsxs)(J,{children:[ee.startDate," to ",ee.endDate]})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Last Payment"}),(0,d.jsx)(J,{children:ee.lastPayment})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Next Payment"}),(0,d.jsx)(J,{children:ee.nextPayment})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Auto Renew"}),(0,d.jsx)(J,{children:ee.autoRenew?"Yes":"No"})]})]})]})}),te&&ee&&(0,d.jsx)(T,{children:(0,d.jsxs)(R,{children:[(0,d.jsxs)(L,{children:[(0,d.jsx)("h2",{children:"Change Plan"}),(0,d.jsx)(I,{onClick:()=>ie(!1),children:"\xd7"})]}),(0,d.jsxs)(O,{children:[(0,d.jsxs)(Q,{children:[(0,d.jsxs)(q,{children:["Current Plan: ",ee.planType]}),(0,d.jsx)(q,{children:"Select New Plan:"}),(0,d.jsxs)(l.Jt,{value:xe,onChange:e=>he(e.target.value),children:[(0,d.jsx)("option",{value:"basic",children:"Basic - RM 29/month (Up to 1k orders)"}),(0,d.jsx)("option",{value:"professional",children:"Professional - RM 99/month (Up to 10k orders)"}),(0,d.jsx)("option",{value:"enterprise",children:"Enterprise - RM 199/month (Unlimited orders)"})]})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(u,{variant:"secondary",onClick:()=>ie(!1),children:"Cancel"}),(0,d.jsx)(u,{variant:"primary",onClick:()=>{if(!ee)return;const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}}[xe];n(n=>n.map(n=>n.id===ee.id?{...n,planType:xe,monthlyFee:e.monthly,annualFee:e.annual,orderLimit:e.orderLimit,updatedAt:(new Date).toISOString().split("T")[0]}:n)),ie(!1),alert("Plan changed successfully!")},children:"Change Plan"})]})]})]})}),le&&ee&&(0,d.jsx)(T,{children:(0,d.jsxs)(R,{children:[(0,d.jsxs)(L,{children:[(0,d.jsx)("h2",{children:"Switch Payment Method"}),(0,d.jsx)(I,{onClick:()=>se(!1),children:"\xd7"})]}),(0,d.jsxs)(O,{children:[(0,d.jsxs)(Q,{children:[(0,d.jsxs)(q,{children:["Current: ","self"===ee.paymentModel?"Self-Paying":"Manager-Paid"]}),(0,d.jsx)(q,{children:"Select New Payment Method:"}),(0,d.jsxs)(l.Jt,{value:ue,onChange:e=>me(e.target.value),children:[(0,d.jsx)("option",{value:"self",children:"Self-Paying (Restaurant pays directly)"}),(0,d.jsx)("option",{value:"manager",children:"Manager-Paid (Manager pays on behalf)"})]})]}),(0,d.jsxs)(H,{children:[(0,d.jsx)(u,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,d.jsx)(u,{variant:"primary",onClick:()=>{ee&&(n(e=>e.map(e=>e.id===ee.id?{...e,paymentModel:ue,updatedAt:(new Date).toISOString().split("T")[0]}:e)),se(!1),alert("Payment method updated successfully!"))},children:"Update Payment"})]})]})]})}),de&&ee&&(0,d.jsx)(T,{children:(0,d.jsxs)(R,{children:[(0,d.jsxs)(L,{children:[(0,d.jsx)("h2",{children:"Suspend Subscription"}),(0,d.jsx)(I,{onClick:()=>oe(!1),children:"\xd7"})]}),(0,d.jsxs)(O,{children:[(0,d.jsxs)(Q,{children:[(0,d.jsxs)(q,{children:["Restaurant: ",ee.restaurantName]}),(0,d.jsx)(q,{children:"Suspension Reason:"}),(0,d.jsx)(G,{value:ge,onChange:e=>ye(e.target.value),placeholder:"Enter reason for suspension...",rows:4})]}),(0,d.jsx)("div",{style:{color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:"\u26a0\ufe0f This will immediately stop all services for this restaurant."}),(0,d.jsxs)(H,{children:[(0,d.jsx)(u,{variant:"secondary",onClick:()=>oe(!1),children:"Cancel"}),(0,d.jsx)(u,{variant:"primary",onClick:()=>{ee&&ge&&(n(e=>e.map(e=>e.id===ee.id?{...e,status:"suspended",updatedAt:(new Date).toISOString().split("T")[0]}:e)),oe(!1),alert("Subscription suspended successfully!"))},disabled:!ge.trim(),style:{background:ge.trim()?"#DC2626":"#9CA3AF"},children:"Suspend Subscription"})]})]})]})}),ce&&(0,d.jsx)(T,{children:(0,d.jsxs)(R,{children:[(0,d.jsxs)(L,{children:[(0,d.jsx)("h2",{children:"Add New Restaurant"}),(0,d.jsx)(I,{onClick:()=>pe(!1),children:"\xd7"})]}),(0,d.jsxs)(O,{children:[(0,d.jsxs)(Q,{children:[(0,d.jsx)(q,{children:"Restaurant Name *"}),(0,d.jsx)(l.DO,{value:je.name,onChange:e=>fe(n=>({...n,name:e.target.value})),placeholder:"Enter restaurant name..."})]}),(0,d.jsxs)(Q,{children:[(0,d.jsx)(q,{children:"Manager Name *"}),(0,d.jsx)(l.DO,{value:je.managerName,onChange:e=>fe(n=>({...n,managerName:e.target.value})),placeholder:"Enter manager name..."})]}),(0,d.jsxs)(Q,{children:[(0,d.jsx)(q,{children:"Manager ID (optional)"}),(0,d.jsx)(l.DO,{value:je.managerId,onChange:e=>fe(n=>({...n,managerId:e.target.value})),placeholder:"Auto-generated if empty"})]}),(0,d.jsxs)(Q,{children:[(0,d.jsx)(q,{children:"Initial Plan"}),(0,d.jsxs)(l.Jt,{value:je.planType,onChange:e=>fe(n=>({...n,planType:e.target.value})),children:[(0,d.jsx)("option",{value:"basic",children:"Basic - RM 29/month (Up to 1k orders)"}),(0,d.jsx)("option",{value:"professional",children:"Professional - RM 99/month (Up to 10k orders)"}),(0,d.jsx)("option",{value:"enterprise",children:"Enterprise - RM 199/month (Unlimited orders)"})]})]}),(0,d.jsxs)(Q,{children:[(0,d.jsx)(q,{children:"Payment Model"}),(0,d.jsxs)(l.Jt,{value:je.paymentModel,onChange:e=>fe(n=>({...n,paymentModel:e.target.value})),children:[(0,d.jsx)("option",{value:"self",children:"Self-Paying (Restaurant pays directly)"}),(0,d.jsx)("option",{value:"manager",children:"Manager-Paid (Manager pays on behalf)"})]})]}),(0,d.jsxs)(Q,{children:[(0,d.jsx)(q,{children:"Billing Cycle"}),(0,d.jsxs)(l.Jt,{value:je.billingCycle,onChange:e=>fe(n=>({...n,billingCycle:e.target.value})),children:[(0,d.jsx)("option",{value:"monthly",children:"Monthly"}),(0,d.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,d.jsx)("div",{style:{color:"#059669",fontSize:"14px",padding:"12px",background:"#ECFDF5",borderRadius:"8px",marginTop:"16px"},children:"\u2705 New restaurants start with a 30-day free trial period"}),(0,d.jsxs)(H,{children:[(0,d.jsx)(u,{variant:"secondary",onClick:()=>pe(!1),children:"Cancel"}),(0,d.jsx)(u,{variant:"primary",onClick:()=>{if(!je.name||!je.managerName)return void alert("Please fill in all required fields");const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}}[je.planType],a={id:`sub-rest-${Date.now()}`,restaurantId:`rest-${Date.now()}`,restaurantName:je.name,managerId:je.managerId||`mgr-${Date.now()}`,managerName:je.managerName,planType:je.planType,status:"trial",startDate:(new Date).toISOString().split("T")[0],endDate:new Date(Date.now()+2592e6).toISOString().split("T")[0],monthlyFee:e.monthly,annualFee:e.annual,billingCycle:je.billingCycle,orderLimit:e.orderLimit,currentOrders:0,usagePercentage:0,paymentModel:je.paymentModel,payerId:"self"===je.paymentModel?`rest-${Date.now()}`:je.managerId,payerName:"self"===je.paymentModel?je.name:je.managerName,features:1e3===e.orderLimit?["Up to 1k orders/month","Basic analytics","Email support"]:1e4===e.orderLimit?["Up to 10k orders/month","Advanced analytics","Priority support"]:["Unlimited orders","Custom analytics","24/7 support","Multi-location"],lastPayment:"-",nextPayment:new Date(Date.now()+2592e6).toISOString().split("T")[0],autoRenew:!1,createdAt:(new Date).toISOString().split("T")[0],updatedAt:(new Date).toISOString().split("T")[0]};n(e=>[a,...e]),pe(!1),alert("Restaurant added successfully with 30-day trial!")},disabled:!je.name||!je.managerName,children:"Add Restaurant"})]})]})]})})]})]})})}}}]);