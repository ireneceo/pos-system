"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5008],{2488:(e,n,r)=>{r.d(n,{DO:()=>c,Jt:()=>p,Qn:()=>o});var a=r(8819),t=(r(9950),r(4752)),i=r(4414);const l=t.Ay.div`
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
`,s=t.Ay.input`
  flex: 1;
  min-width: 180px;
  max-width: 300px;
  padding: 12px 16px;
  border: 1px solid ${a.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: ${a.w.colors.text.placeholder};
  }

  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
    box-shadow: 0 0 0 3px ${a.w.colors.primaryLight};
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
`,d=t.Ay.select`
  padding: 12px 16px;
  border: 1px solid ${a.w.colors.border};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;
  max-width: 180px;
  flex-shrink: 0;

  &:focus {
    outline: none;
    border-color: ${a.w.colors.primary};
    box-shadow: 0 0 0 3px ${a.w.colors.primaryLight};
  }

  &:disabled {
    background: ${a.w.colors.surfaceHover};
    color: ${a.w.colors.text.muted};
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
`,o=e=>{let{children:n,className:r,style:a,...t}=e;return(0,i.jsx)(l,{className:r,style:a,...t,children:n})},c=e=>{let{placeholder:n="Search...",...r}=e;return(0,i.jsx)(s,{placeholder:n,...r})},p=e=>{let{children:n,...r}=e;return(0,i.jsx)(d,{...r,children:n})}},5008:(e,n,r)=>{r.r(n),r.d(n,{default:()=>U});var a=r(8819),t=r(9950),i=r(4752),l=r(2488),s=r(6038),d=r(2674),o=r(4414);const c=i.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
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
`,x=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=i.Ay.div`
  display: flex;
  gap: 12px;
`,u=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":`\n    background: white;\n    color: #6B7280;\n    border: 1px solid ${a.w.colors.border};\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  `}
`,g=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,j=i.Ay.div`
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
`,y=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: ${a.w.colors.secondary};
  margin-bottom: 4px;
`,f=i.Ay.div`
  font-size: 13px;
  color: ${a.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,w=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${a.w.colors.border};
  overflow: hidden;
`,v=i.Ay.div`
  display: grid;
  grid-template-columns: 2.5fr 1.5fr 1fr 1fr 1fr 1fr 180px;
  gap: 16px;
  padding: 16px 24px;
  background: ${a.w.colors.surfaceHover};
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: ${a.w.colors.text.muted};
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
`,b=i.Ay.div`
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
`,C=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,S=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,A=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,F=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"self"===e.type?"#ECFDF5":"#DBEAFE"};
  color: ${e=>"self"===e.type?"#059669":"#1E40AF"};
`,k=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.plan){case"enterprise":return"#EDE9FE";case"professional":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.plan){case"enterprise":return"#7C3AED";case"professional":return"#1E40AF";default:return"#6B7280"}}};
`,P=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #059669;
`,E=i.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":default:return"#F3F4F6";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"cancelled":return"#DC2626";default:return"#6B7280"}}};
`,M=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,$=i.Ay.div`
  width: 100px;
  height: 6px;
  background: #F3F4F6;
  border-radius: 3px;
  overflow: hidden;
`,D=i.Ay.div`
  height: 100%;
  width: ${e=>e.percentage}%;
  background: ${e=>e.percentage>90?"#DC2626":e.percentage>75?"#D97706":"#059669"};
  transition: width 0.3s ease;
`,R=i.Ay.div`
  font-size: 11px;
  color: ${a.w.colors.text.muted};
`,N=i.Ay.div`
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
`,T=i.Ay.button`
  padding: 6px 12px;
  background: transparent;
  border: 1px solid ${a.w.colors.border};
  border-radius: 6px;
  color: ${a.w.colors.text.muted};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 8px;

  &:hover {
    border-color: ${a.w.colors.primary};
    color: ${a.w.colors.primary};
    background: #F4F3FF;
  }

  &:last-child {
    margin-right: 0;
  }
`,L=i.Ay.div`
  margin-bottom: 16px;
`,z=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,B=i.Ay.div`
  font-size: 14px;
  color: ${a.w.colors.secondary};
`,I=i.Ay.ul`
  margin: 0;
  padding-left: 16px;
  font-size: 14px;
  color: #0A2540;
  
  li {
    margin-bottom: 4px;
  }
`,O=i.Ay.textarea`
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
`,U=()=>{const[e,n]=(0,t.useState)([]),[r,a]=(0,t.useState)(""),[i,U]=(0,t.useState)("all"),[J,H]=(0,t.useState)("all"),[Q,Y]=(0,t.useState)("all"),[q,G]=(0,t.useState)(null),[K,V]=(0,t.useState)(!1),[W,X]=(0,t.useState)(!1),[Z,_]=(0,t.useState)(!1),[ee,ne]=(0,t.useState)(!1),[re,ae]=(0,t.useState)(!1),[te,ie]=(0,t.useState)(""),[le,se]=(0,t.useState)(""),[de,oe]=(0,t.useState)(""),[ce,pe]=(0,t.useState)({name:"",managerId:"",managerName:"",planType:"basic",paymentModel:"self",billingCycle:"monthly"});(0,t.useEffect)(()=>{n([])},[]);const xe=e.filter(e=>{const n=e.restaurantName.toLowerCase().includes(r.toLowerCase())||e.managerName.toLowerCase().includes(r.toLowerCase()),a="all"===i||e.status===i,t="all"===J||e.planType===J,l="all"===Q||e.paymentModel===Q;return n&&a&&t&&l}),he=e.length,me=e.filter(e=>"active"===e.status).length,ue=e.filter(e=>"trial"===e.status).length,ge=e.filter(e=>"self"===e.paymentModel).length,je=e.filter(e=>"active"===e.status).reduce((e,n)=>e+("monthly"===n.billingCycle?n.monthlyFee:n.annualFee/12),0),ye=e=>-1===e?"Unlimited":e.toLocaleString();return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(c,{children:[(0,o.jsxs)(p,{children:[(0,o.jsx)(h,{children:"Restaurant Subscriptions"}),(0,o.jsxs)(m,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:()=>{const e=[["Restaurant Name","Manager","Plan","Status","Monthly Fee","Payment Model","Usage","Last Payment","Next Payment"].join(","),...xe.map(e=>[`"${e.restaurantName}"`,`"${e.managerName}"`,e.planType,e.status,`RM ${e.monthlyFee}`,"self"===e.paymentModel?"Self-Paying":"Manager-Paid",e.orderLimit>0?`${e.usagePercentage}%`:"Unlimited",e.lastPayment,e.nextPayment].join(","))].join("\n"),n=new Blob([e],{type:"text/csv"}),r=URL.createObjectURL(n),a=document.createElement("a");a.href=r,a.download=`restaurant-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(r)},children:"Export Report"}),(0,o.jsx)(u,{variant:"primary",onClick:()=>{pe({name:"",managerId:"",managerName:"",planType:"basic",paymentModel:"self",billingCycle:"monthly"}),ae(!0)},children:"Add Restaurant"})]})]}),(0,o.jsxs)(x,{children:[(0,o.jsxs)(g,{children:[(0,o.jsxs)(j,{color:"#059669",children:[(0,o.jsx)(y,{children:he}),(0,o.jsx)(f,{children:"Total Restaurants"})]}),(0,o.jsxs)(j,{color:"#2563EB",children:[(0,o.jsx)(y,{children:me}),(0,o.jsx)(f,{children:"Active Subscriptions"})]}),(0,o.jsxs)(j,{color:"#D97706",children:[(0,o.jsx)(y,{children:ue}),(0,o.jsx)(f,{children:"Trial Subscriptions"})]}),(0,o.jsxs)(j,{color:"#7C3AED",children:[(0,o.jsx)(y,{children:ge}),(0,o.jsx)(f,{children:"Self-Paying"})]}),(0,o.jsxs)(j,{color:"#DC2626",children:[(0,o.jsx)(y,{children:(0,s.vv)(je)}),(0,o.jsx)(f,{children:"Monthly Revenue"})]})]}),(0,o.jsxs)(l.Qn,{children:[(0,o.jsx)(l.DO,{type:"text",placeholder:"Search restaurants or managers...",value:r,onChange:e=>a(e.target.value)}),(0,o.jsxs)(l.Jt,{value:i,onChange:e=>U(e.target.value),children:[(0,o.jsx)("option",{value:"all",children:"All Status"}),(0,o.jsx)("option",{value:"active",children:"Active"}),(0,o.jsx)("option",{value:"trial",children:"Trial"}),(0,o.jsx)("option",{value:"expired",children:"Expired"}),(0,o.jsx)("option",{value:"suspended",children:"Suspended"}),(0,o.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,o.jsxs)(l.Jt,{value:J,onChange:e=>H(e.target.value),children:[(0,o.jsx)("option",{value:"all",children:"All Plans"}),(0,o.jsx)("option",{value:"basic",children:"Basic"}),(0,o.jsx)("option",{value:"professional",children:"Professional"}),(0,o.jsx)("option",{value:"enterprise",children:"Enterprise"})]}),(0,o.jsxs)(l.Jt,{value:Q,onChange:e=>Y(e.target.value),children:[(0,o.jsx)("option",{value:"all",children:"All Payment Types"}),(0,o.jsx)("option",{value:"self",children:"Self-Paying"}),(0,o.jsx)("option",{value:"manager",children:"Manager-Paid"})]})]}),(0,o.jsxs)(w,{children:[(0,o.jsxs)(v,{children:[(0,o.jsx)("span",{children:"Restaurant"}),(0,o.jsx)("span",{children:"Manager"}),(0,o.jsx)("span",{children:"Plan"}),(0,o.jsx)("span",{children:"Price"}),(0,o.jsx)("span",{children:"Status"}),(0,o.jsx)("span",{children:"Usage"}),(0,o.jsx)("span",{children:"Actions"})]}),xe.map(e=>(0,o.jsxs)(b,{children:[(0,o.jsxs)(C,{children:[(0,o.jsx)(S,{children:e.restaurantName}),(0,o.jsxs)(A,{children:[(0,o.jsx)(F,{type:e.paymentModel,children:"self"===e.paymentModel?"Self":"Manager"}),e.payerName]})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:e.managerName}),(0,o.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.managerId})]}),(0,o.jsx)(k,{plan:e.planType,children:e.planType}),(0,o.jsxs)(P,{children:[(0,s.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee),(0,o.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:["/","monthly"===e.billingCycle?"month":"year"]})]}),(0,o.jsx)(E,{status:e.status,children:e.status}),(0,o.jsxs)(M,{children:[(0,o.jsx)($,{children:(0,o.jsx)(D,{percentage:e.usagePercentage})}),(0,o.jsxs)(R,{children:[e.currentOrders.toLocaleString()," / ",ye(e.orderLimit)]})]}),(0,o.jsxs)(N,{children:[(0,o.jsx)(T,{onClick:()=>(e=>{G(e),V(!0)})(e),children:"Details"}),"active"===e.status||"trial"===e.status?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(T,{onClick:()=>(e=>{G(e),ie(e.planType),X(!0)})(e),children:"Plan"}),(0,o.jsx)(T,{onClick:()=>(e=>{G(e),oe(""),ne(!0)})(e),children:"Suspend"})]}):(0,o.jsx)(T,{onClick:()=>{return r=e.id,n(e=>e.map(e=>e.id===r?{...e,status:"active",updatedAt:(new Date).toISOString().split("T")[0]}:e)),void alert("Subscription reactivated successfully!");var r},disabled:"cancelled"===e.status,children:"Reactivate"})]})]},e.id)),0===xe.length&&(0,o.jsx)("div",{style:{padding:"60px 20px",textAlign:"center",color:"#6B7280"},children:"No subscriptions found"})]}),K&&q&&(0,o.jsx)(d.mH,{children:(0,o.jsxs)(d.$m,{children:[(0,o.jsxs)(d.rQ,{children:[(0,o.jsx)("h2",{children:"Subscription Details"}),(0,o.jsx)(d.Jn,{onClick:()=>V(!1),children:"\xd7"})]}),(0,o.jsxs)(d.cw,{children:[(0,o.jsxs)(L,{children:[(0,o.jsx)(z,{children:"Restaurant"}),(0,o.jsx)(B,{children:q.restaurantName})]}),(0,o.jsxs)(L,{children:[(0,o.jsx)(z,{children:"Manager"}),(0,o.jsx)(B,{children:q.managerName})]}),(0,o.jsxs)(L,{children:[(0,o.jsx)(z,{children:"Plan"}),(0,o.jsx)(B,{children:q.planType})]}),(0,o.jsxs)(L,{children:[(0,o.jsx)(z,{children:"Status"}),(0,o.jsx)(E,{status:q.status,children:q.status})]}),(0,o.jsxs)(L,{children:[(0,o.jsx)(z,{children:"Pricing"}),(0,o.jsxs)(B,{children:[(0,s.vv)("monthly"===q.billingCycle?q.monthlyFee:q.annualFee),"/",q.billingCycle]})]}),(0,o.jsxs)(L,{children:[(0,o.jsx)(z,{children:"Order Usage"}),(0,o.jsxs)(B,{children:[q.currentOrders.toLocaleString()," / ",ye(q.orderLimit),q.orderLimit>0&&` (${q.usagePercentage}%)`]})]}),(0,o.jsxs)(L,{children:[(0,o.jsx)(z,{children:"Payment Model"}),(0,o.jsxs)(B,{children:[(0,o.jsx)(F,{type:q.paymentModel,children:"self"===q.paymentModel?"Self-Paying":"Manager-Paid"}),(0,o.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ",q.payerName]})]})]}),(0,o.jsxs)(L,{children:[(0,o.jsx)(z,{children:"Features"}),(0,o.jsx)(I,{children:q.features.map((e,n)=>(0,o.jsx)("li",{children:e},n))})]}),(0,o.jsxs)(L,{children:[(0,o.jsx)(z,{children:"Subscription Period"}),(0,o.jsxs)(B,{children:[q.startDate," to ",q.endDate]})]}),(0,o.jsxs)(L,{children:[(0,o.jsx)(z,{children:"Last Payment"}),(0,o.jsx)(B,{children:q.lastPayment})]}),(0,o.jsxs)(L,{children:[(0,o.jsx)(z,{children:"Next Payment"}),(0,o.jsx)(B,{children:q.nextPayment})]}),(0,o.jsxs)(L,{children:[(0,o.jsx)(z,{children:"Auto Renew"}),(0,o.jsx)(B,{children:q.autoRenew?"Yes":"No"})]})]})]})}),W&&q&&(0,o.jsx)(d.mH,{children:(0,o.jsxs)(d.$m,{children:[(0,o.jsxs)(d.rQ,{children:[(0,o.jsx)("h2",{children:"Change Plan"}),(0,o.jsx)(d.Jn,{onClick:()=>X(!1),children:"\xd7"})]}),(0,o.jsxs)(d.cw,{children:[(0,o.jsxs)(d.gE,{children:[(0,o.jsxs)(d.lR,{children:["Current Plan: ",q.planType]}),(0,o.jsx)(d.lR,{children:"Select New Plan:"}),(0,o.jsxs)(l.Jt,{value:te,onChange:e=>ie(e.target.value),children:[(0,o.jsx)("option",{value:"basic",children:"Basic - RM 29/month (Up to 1k orders)"}),(0,o.jsx)("option",{value:"professional",children:"Professional - RM 99/month (Up to 10k orders)"}),(0,o.jsx)("option",{value:"enterprise",children:"Enterprise - RM 199/month (Unlimited orders)"})]})]}),(0,o.jsxs)(d.jl,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:()=>X(!1),children:"Cancel"}),(0,o.jsx)(u,{variant:"primary",onClick:()=>{if(!q)return;const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}}[te];n(n=>n.map(n=>n.id===q.id?{...n,planType:te,monthlyFee:e.monthly,annualFee:e.annual,orderLimit:e.orderLimit,updatedAt:(new Date).toISOString().split("T")[0]}:n)),X(!1),alert("Plan changed successfully!")},children:"Change Plan"})]})]})]})}),Z&&q&&(0,o.jsx)(d.mH,{children:(0,o.jsxs)(d.$m,{children:[(0,o.jsxs)(d.rQ,{children:[(0,o.jsx)("h2",{children:"Switch Payment Method"}),(0,o.jsx)(d.Jn,{onClick:()=>_(!1),children:"\xd7"})]}),(0,o.jsxs)(d.cw,{children:[(0,o.jsxs)(d.gE,{children:[(0,o.jsxs)(d.lR,{children:["Current: ","self"===q.paymentModel?"Self-Paying":"Manager-Paid"]}),(0,o.jsx)(d.lR,{children:"Select New Payment Method:"}),(0,o.jsxs)(l.Jt,{value:le,onChange:e=>se(e.target.value),children:[(0,o.jsx)("option",{value:"self",children:"Self-Paying (Restaurant pays directly)"}),(0,o.jsx)("option",{value:"manager",children:"Manager-Paid (Manager pays on behalf)"})]})]}),(0,o.jsxs)(d.jl,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:()=>_(!1),children:"Cancel"}),(0,o.jsx)(u,{variant:"primary",onClick:()=>{q&&(n(e=>e.map(e=>e.id===q.id?{...e,paymentModel:le,updatedAt:(new Date).toISOString().split("T")[0]}:e)),_(!1),alert("Payment method updated successfully!"))},children:"Update Payment"})]})]})]})}),ee&&q&&(0,o.jsx)(d.mH,{children:(0,o.jsxs)(d.$m,{children:[(0,o.jsxs)(d.rQ,{children:[(0,o.jsx)("h2",{children:"Suspend Subscription"}),(0,o.jsx)(d.Jn,{onClick:()=>ne(!1),children:"\xd7"})]}),(0,o.jsxs)(d.cw,{children:[(0,o.jsxs)(d.gE,{children:[(0,o.jsxs)(d.lR,{children:["Restaurant: ",q.restaurantName]}),(0,o.jsx)(d.lR,{children:"Suspension Reason:"}),(0,o.jsx)(O,{value:de,onChange:e=>oe(e.target.value),placeholder:"Enter reason for suspension...",rows:4})]}),(0,o.jsx)("div",{style:{color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:"\u26a0\ufe0f This will immediately stop all services for this restaurant."}),(0,o.jsxs)(d.jl,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:()=>ne(!1),children:"Cancel"}),(0,o.jsx)(u,{variant:"primary",onClick:()=>{q&&de&&(n(e=>e.map(e=>e.id===q.id?{...e,status:"suspended",updatedAt:(new Date).toISOString().split("T")[0]}:e)),ne(!1),alert("Subscription suspended successfully!"))},disabled:!de.trim(),style:{background:de.trim()?"#DC2626":"#9CA3AF"},children:"Suspend Subscription"})]})]})]})}),re&&(0,o.jsx)(d.mH,{children:(0,o.jsxs)(d.$m,{children:[(0,o.jsxs)(d.rQ,{children:[(0,o.jsx)("h2",{children:"Add New Restaurant"}),(0,o.jsx)(d.Jn,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,o.jsxs)(d.cw,{children:[(0,o.jsxs)(d.gE,{children:[(0,o.jsx)(d.lR,{children:"Restaurant Name *"}),(0,o.jsx)(l.DO,{value:ce.name,onChange:e=>pe(n=>({...n,name:e.target.value})),placeholder:"Enter restaurant name..."})]}),(0,o.jsxs)(d.gE,{children:[(0,o.jsx)(d.lR,{children:"Manager Name *"}),(0,o.jsx)(l.DO,{value:ce.managerName,onChange:e=>pe(n=>({...n,managerName:e.target.value})),placeholder:"Enter manager name..."})]}),(0,o.jsxs)(d.gE,{children:[(0,o.jsx)(d.lR,{children:"Manager ID (optional)"}),(0,o.jsx)(l.DO,{value:ce.managerId,onChange:e=>pe(n=>({...n,managerId:e.target.value})),placeholder:"Auto-generated if empty"})]}),(0,o.jsxs)(d.gE,{children:[(0,o.jsx)(d.lR,{children:"Initial Plan"}),(0,o.jsxs)(l.Jt,{value:ce.planType,onChange:e=>pe(n=>({...n,planType:e.target.value})),children:[(0,o.jsx)("option",{value:"basic",children:"Basic - RM 29/month (Up to 1k orders)"}),(0,o.jsx)("option",{value:"professional",children:"Professional - RM 99/month (Up to 10k orders)"}),(0,o.jsx)("option",{value:"enterprise",children:"Enterprise - RM 199/month (Unlimited orders)"})]})]}),(0,o.jsxs)(d.gE,{children:[(0,o.jsx)(d.lR,{children:"Payment Model"}),(0,o.jsxs)(l.Jt,{value:ce.paymentModel,onChange:e=>pe(n=>({...n,paymentModel:e.target.value})),children:[(0,o.jsx)("option",{value:"self",children:"Self-Paying (Restaurant pays directly)"}),(0,o.jsx)("option",{value:"manager",children:"Manager-Paid (Manager pays on behalf)"})]})]}),(0,o.jsxs)(d.gE,{children:[(0,o.jsx)(d.lR,{children:"Billing Cycle"}),(0,o.jsxs)(l.Jt,{value:ce.billingCycle,onChange:e=>pe(n=>({...n,billingCycle:e.target.value})),children:[(0,o.jsx)("option",{value:"monthly",children:"Monthly"}),(0,o.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,o.jsx)("div",{style:{color:"#059669",fontSize:"14px",padding:"12px",background:"#ECFDF5",borderRadius:"8px",marginTop:"16px"},children:"\u2705 New restaurants start with a 30-day free trial period"}),(0,o.jsxs)(d.jl,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:()=>ae(!1),children:"Cancel"}),(0,o.jsx)(u,{variant:"primary",onClick:()=>{if(!ce.name||!ce.managerName)return void alert("Please fill in all required fields");const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}}[ce.planType],r={id:`sub-rest-${Date.now()}`,restaurantId:`rest-${Date.now()}`,restaurantName:ce.name,managerId:ce.managerId||`mgr-${Date.now()}`,managerName:ce.managerName,planType:ce.planType,status:"trial",startDate:(new Date).toISOString().split("T")[0],endDate:new Date(Date.now()+2592e6).toISOString().split("T")[0],monthlyFee:e.monthly,annualFee:e.annual,billingCycle:ce.billingCycle,orderLimit:e.orderLimit,currentOrders:0,usagePercentage:0,paymentModel:ce.paymentModel,payerId:"self"===ce.paymentModel?`rest-${Date.now()}`:ce.managerId,payerName:"self"===ce.paymentModel?ce.name:ce.managerName,features:1e3===e.orderLimit?["Up to 1k orders/month","Basic analytics","Email support"]:1e4===e.orderLimit?["Up to 10k orders/month","Advanced analytics","Priority support"]:["Unlimited orders","Custom analytics","24/7 support","Multi-location"],lastPayment:"-",nextPayment:new Date(Date.now()+2592e6).toISOString().split("T")[0],autoRenew:!1,createdAt:(new Date).toISOString().split("T")[0],updatedAt:(new Date).toISOString().split("T")[0]};n(e=>[r,...e]),ae(!1),alert("Restaurant added successfully with 30-day trial!")},disabled:!ce.name||!ce.managerName,children:"Add Restaurant"})]})]})]})})]})]})})}}}]);