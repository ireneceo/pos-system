"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5008],{2488:(e,n,a)=>{a.d(n,{DO:()=>p,Jt:()=>x,Qn:()=>c});a(9950);var i=a(4752),t=a(4414);const r=i.Ay.div`
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
`,l=i.Ay.input`
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
`,s=i.Ay.div`
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
`,d=i.Ay.button`
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
`,c=e=>{let{children:n,className:a,style:i,...l}=e;return(0,t.jsx)(r,{className:a,style:i,...l,children:n})},p=e=>{let{placeholder:n="Search...",value:a,onChange:i,style:r,...o}=e;return(0,t.jsxs)(s,{style:r,children:[(0,t.jsx)(l,{placeholder:n,value:a,onChange:i,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:a?"36px":"16px"},...o}),a&&(0,t.jsx)(d,{type:"button",onClick:()=>null===i||void 0===i?void 0:i({target:{value:""}}),"aria-label":"Clear search",children:(0,t.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,t.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,t.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:n,...a}=e;return(0,t.jsx)(o,{...a,children:n})}},5008:(e,n,a)=>{a.r(n),a.d(n,{default:()=>G});var i=a(9950),t=a(4752),r=a(2488),l=a(6038),s=a(4414);const d=t.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,o=t.Ay.div`
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
`,c=t.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,p=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,x=t.Ay.div`
  display: flex;
  gap: 12px;
`,h=t.Ay.button`
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
`,u=t.Ay.div`
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
`,g=t.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,y=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,f=t.Ay.div`
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
`,v=t.Ay.div`
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
`,b=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,w=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,A=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,F=t.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"self"===e.type?"#ECFDF5":"#DBEAFE"};
  color: ${e=>"self"===e.type?"#059669":"#1E40AF"};
`,C=t.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.plan){case"enterprise":return"#EDE9FE";case"professional":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.plan){case"enterprise":return"#7C3AED";case"professional":return"#1E40AF";default:return"#6B7280"}}};
`,S=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #059669;
`,k=t.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":default:return"#F3F4F6";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"cancelled":return"#DC2626";default:return"#6B7280"}}};
`,P=t.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,E=t.Ay.div`
  width: 100px;
  height: 6px;
  background: #F3F4F6;
  border-radius: 3px;
  overflow: hidden;
`,M=t.Ay.div`
  height: 100%;
  width: ${e=>e.percentage}%;
  background: ${e=>e.percentage>90?"#DC2626":e.percentage>75?"#D97706":"#059669"};
  transition: width 0.3s ease;
`,D=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,B=t.Ay.div`
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
`,N=t.Ay.button`
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
`,z=t.Ay.div`
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
  margin: auto 0;
`,T=t.Ay.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  margin: auto 0;
`,R=t.Ay.div`
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
`,L=t.Ay.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #0A2540;
  }
`,I=t.Ay.div`
  padding: 24px;
`,O=t.Ay.div`
  margin-bottom: 16px;
`,$=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,U=t.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,J=t.Ay.ul`
  margin: 0;
  padding-left: 16px;
  font-size: 14px;
  color: #0A2540;
  
  li {
    margin-bottom: 4px;
  }
`,Y=t.Ay.div`
  margin-bottom: 20px;
`,W=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,Q=t.Ay.textarea`
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
`,q=t.Ay.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`,G=()=>{const[e,n]=(0,i.useState)([]),[a,t]=(0,i.useState)(""),[G,H]=(0,i.useState)("all"),[K,V]=(0,i.useState)("all"),[X,Z]=(0,i.useState)("all"),[_,ee]=(0,i.useState)(null),[ne,ae]=(0,i.useState)(!1),[ie,te]=(0,i.useState)(!1),[re,le]=(0,i.useState)(!1),[se,de]=(0,i.useState)(!1),[oe,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(""),[he,me]=(0,i.useState)(""),[ue,ge]=(0,i.useState)(""),[ye,je]=(0,i.useState)({name:"",managerId:"",managerName:"",planType:"basic",paymentModel:"self",billingCycle:"monthly"});(0,i.useEffect)(()=>{n([])},[]);const fe=e.filter(e=>{const n=e.restaurantName.toLowerCase().includes(a.toLowerCase())||e.managerName.toLowerCase().includes(a.toLowerCase()),i="all"===G||e.status===G,t="all"===K||e.planType===K,r="all"===X||e.paymentModel===X;return n&&i&&t&&r}),ve=e.length,be=e.filter(e=>"active"===e.status).length,we=e.filter(e=>"trial"===e.status).length,Ae=e.filter(e=>"self"===e.paymentModel).length,Fe=e.filter(e=>"active"===e.status).reduce((e,n)=>e+("monthly"===n.billingCycle?n.monthlyFee:n.annualFee/12),0),Ce=e=>-1===e?"Unlimited":e.toLocaleString();return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(d,{children:[(0,s.jsxs)(o,{children:[(0,s.jsx)(p,{children:"Restaurant Subscriptions"}),(0,s.jsxs)(x,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:()=>{const e=[["Restaurant Name","Manager","Plan","Status","Monthly Fee","Payment Model","Usage","Last Payment","Next Payment"].join(","),...fe.map(e=>[`"${e.restaurantName}"`,`"${e.managerName}"`,e.planType,e.status,`RM ${e.monthlyFee}`,"self"===e.paymentModel?"Self-Paying":"Manager-Paid",e.orderLimit>0?`${e.usagePercentage}%`:"Unlimited",e.lastPayment,e.nextPayment].join(","))].join("\n"),n=new Blob([e],{type:"text/csv"}),a=URL.createObjectURL(n),i=document.createElement("a");i.href=a,i.download=`restaurant-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(a)},children:"Export Report"}),(0,s.jsx)(h,{variant:"primary",onClick:()=>{je({name:"",managerId:"",managerName:"",planType:"basic",paymentModel:"self",billingCycle:"monthly"}),ce(!0)},children:"Add Restaurant"})]})]}),(0,s.jsxs)(c,{children:[(0,s.jsxs)(m,{children:[(0,s.jsxs)(u,{color:"#059669",children:[(0,s.jsx)(g,{children:ve}),(0,s.jsx)(y,{children:"Total Restaurants"})]}),(0,s.jsxs)(u,{color:"#2563EB",children:[(0,s.jsx)(g,{children:be}),(0,s.jsx)(y,{children:"Active Subscriptions"})]}),(0,s.jsxs)(u,{color:"#D97706",children:[(0,s.jsx)(g,{children:we}),(0,s.jsx)(y,{children:"Trial Subscriptions"})]}),(0,s.jsxs)(u,{color:"#7C3AED",children:[(0,s.jsx)(g,{children:Ae}),(0,s.jsx)(y,{children:"Self-Paying"})]}),(0,s.jsxs)(u,{color:"#DC2626",children:[(0,s.jsx)(g,{children:(0,l.vv)(Fe)}),(0,s.jsx)(y,{children:"Monthly Revenue"})]})]}),(0,s.jsxs)(r.Qn,{children:[(0,s.jsxs)(r.Jt,{value:G,onChange:e=>H(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Status"}),(0,s.jsx)("option",{value:"active",children:"Active"}),(0,s.jsx)("option",{value:"trial",children:"Trial"}),(0,s.jsx)("option",{value:"expired",children:"Expired"}),(0,s.jsx)("option",{value:"suspended",children:"Suspended"}),(0,s.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,s.jsxs)(r.Jt,{value:K,onChange:e=>V(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Plans"}),(0,s.jsx)("option",{value:"basic",children:"Basic"}),(0,s.jsx)("option",{value:"professional",children:"Professional"}),(0,s.jsx)("option",{value:"enterprise",children:"Enterprise"})]}),(0,s.jsxs)(r.Jt,{value:X,onChange:e=>Z(e.target.value),children:[(0,s.jsx)("option",{value:"all",children:"All Payment Types"}),(0,s.jsx)("option",{value:"self",children:"Self-Paying"}),(0,s.jsx)("option",{value:"manager",children:"Manager-Paid"})]}),(0,s.jsx)(r.DO,{type:"text",placeholder:"Search restaurants or managers...",value:a,onChange:e=>t(e.target.value)})]}),(0,s.jsxs)(j,{children:[(0,s.jsxs)(f,{children:[(0,s.jsx)("span",{children:"Restaurant"}),(0,s.jsx)("span",{children:"Manager"}),(0,s.jsx)("span",{children:"Plan"}),(0,s.jsx)("span",{children:"Price"}),(0,s.jsx)("span",{children:"Status"}),(0,s.jsx)("span",{children:"Usage"}),(0,s.jsx)("span",{children:"Actions"})]}),fe.map(e=>(0,s.jsxs)(v,{children:[(0,s.jsxs)(b,{children:[(0,s.jsx)(w,{children:e.restaurantName}),(0,s.jsxs)(A,{children:[(0,s.jsx)(F,{type:e.paymentModel,children:"self"===e.paymentModel?"Self":"Manager"}),e.payerName]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:e.managerName}),(0,s.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.managerId})]}),(0,s.jsx)(C,{plan:e.planType,children:e.planType}),(0,s.jsxs)(S,{children:[(0,l.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee),(0,s.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:["/","monthly"===e.billingCycle?"month":"year"]})]}),(0,s.jsx)(k,{status:e.status,children:e.status}),(0,s.jsxs)(P,{children:[(0,s.jsx)(E,{children:(0,s.jsx)(M,{percentage:e.usagePercentage})}),(0,s.jsxs)(D,{children:[e.currentOrders.toLocaleString()," / ",Ce(e.orderLimit)]})]}),(0,s.jsxs)(B,{children:[(0,s.jsx)(N,{onClick:()=>(e=>{ee(e),ae(!0)})(e),children:"Details"}),"active"===e.status||"trial"===e.status?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(N,{onClick:()=>(e=>{ee(e),xe(e.planType),te(!0)})(e),children:"Plan"}),(0,s.jsx)(N,{onClick:()=>(e=>{ee(e),ge(""),de(!0)})(e),children:"Suspend"})]}):(0,s.jsx)(N,{onClick:()=>{return a=e.id,n(e=>e.map(e=>e.id===a?{...e,status:"active",updatedAt:(new Date).toISOString().split("T")[0]}:e)),void alert("Subscription reactivated successfully!");var a},disabled:"cancelled"===e.status,children:"Reactivate"})]})]},e.id)),0===fe.length&&(0,s.jsx)("div",{style:{padding:"60px 20px",textAlign:"center",color:"#6B7280"},children:"No subscriptions found"})]}),ne&&_&&(0,s.jsx)(z,{children:(0,s.jsxs)(T,{children:[(0,s.jsxs)(R,{children:[(0,s.jsx)("h2",{children:"Subscription Details"}),(0,s.jsx)(L,{onClick:()=>ae(!1),children:"\xd7"})]}),(0,s.jsxs)(I,{children:[(0,s.jsxs)(O,{children:[(0,s.jsx)($,{children:"Restaurant"}),(0,s.jsx)(U,{children:_.restaurantName})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)($,{children:"Manager"}),(0,s.jsx)(U,{children:_.managerName})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)($,{children:"Plan"}),(0,s.jsx)(U,{children:_.planType})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)($,{children:"Status"}),(0,s.jsx)(k,{status:_.status,children:_.status})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)($,{children:"Pricing"}),(0,s.jsxs)(U,{children:[(0,l.vv)("monthly"===_.billingCycle?_.monthlyFee:_.annualFee),"/",_.billingCycle]})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)($,{children:"Order Usage"}),(0,s.jsxs)(U,{children:[_.currentOrders.toLocaleString()," / ",Ce(_.orderLimit),_.orderLimit>0&&` (${_.usagePercentage}%)`]})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)($,{children:"Payment Model"}),(0,s.jsxs)(U,{children:[(0,s.jsx)(F,{type:_.paymentModel,children:"self"===_.paymentModel?"Self-Paying":"Manager-Paid"}),(0,s.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ",_.payerName]})]})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)($,{children:"Features"}),(0,s.jsx)(J,{children:_.features.map((e,n)=>(0,s.jsx)("li",{children:e},n))})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)($,{children:"Subscription Period"}),(0,s.jsxs)(U,{children:[_.startDate," to ",_.endDate]})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)($,{children:"Last Payment"}),(0,s.jsx)(U,{children:_.lastPayment})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)($,{children:"Next Payment"}),(0,s.jsx)(U,{children:_.nextPayment})]}),(0,s.jsxs)(O,{children:[(0,s.jsx)($,{children:"Auto Renew"}),(0,s.jsx)(U,{children:_.autoRenew?"Yes":"No"})]})]})]})}),ie&&_&&(0,s.jsx)(z,{children:(0,s.jsxs)(T,{children:[(0,s.jsxs)(R,{children:[(0,s.jsx)("h2",{children:"Change Plan"}),(0,s.jsx)(L,{onClick:()=>te(!1),children:"\xd7"})]}),(0,s.jsxs)(I,{children:[(0,s.jsxs)(Y,{children:[(0,s.jsxs)(W,{children:["Current Plan: ",_.planType]}),(0,s.jsx)(W,{children:"Select New Plan:"}),(0,s.jsxs)(r.Jt,{value:pe,onChange:e=>xe(e.target.value),children:[(0,s.jsx)("option",{value:"basic",children:"Basic - RM 29/month (Up to 1k orders)"}),(0,s.jsx)("option",{value:"professional",children:"Professional - RM 99/month (Up to 10k orders)"}),(0,s.jsx)("option",{value:"enterprise",children:"Enterprise - RM 199/month (Unlimited orders)"})]})]}),(0,s.jsxs)(q,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:()=>te(!1),children:"Cancel"}),(0,s.jsx)(h,{variant:"primary",onClick:()=>{if(!_)return;const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}}[pe];n(n=>n.map(n=>n.id===_.id?{...n,planType:pe,monthlyFee:e.monthly,annualFee:e.annual,orderLimit:e.orderLimit,updatedAt:(new Date).toISOString().split("T")[0]}:n)),te(!1),alert("Plan changed successfully!")},children:"Change Plan"})]})]})]})}),re&&_&&(0,s.jsx)(z,{children:(0,s.jsxs)(T,{children:[(0,s.jsxs)(R,{children:[(0,s.jsx)("h2",{children:"Switch Payment Method"}),(0,s.jsx)(L,{onClick:()=>le(!1),children:"\xd7"})]}),(0,s.jsxs)(I,{children:[(0,s.jsxs)(Y,{children:[(0,s.jsxs)(W,{children:["Current: ","self"===_.paymentModel?"Self-Paying":"Manager-Paid"]}),(0,s.jsx)(W,{children:"Select New Payment Method:"}),(0,s.jsxs)(r.Jt,{value:he,onChange:e=>me(e.target.value),children:[(0,s.jsx)("option",{value:"self",children:"Self-Paying (Restaurant pays directly)"}),(0,s.jsx)("option",{value:"manager",children:"Manager-Paid (Manager pays on behalf)"})]})]}),(0,s.jsxs)(q,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:()=>le(!1),children:"Cancel"}),(0,s.jsx)(h,{variant:"primary",onClick:()=>{_&&(n(e=>e.map(e=>e.id===_.id?{...e,paymentModel:he,updatedAt:(new Date).toISOString().split("T")[0]}:e)),le(!1),alert("Payment method updated successfully!"))},children:"Update Payment"})]})]})]})}),se&&_&&(0,s.jsx)(z,{children:(0,s.jsxs)(T,{children:[(0,s.jsxs)(R,{children:[(0,s.jsx)("h2",{children:"Suspend Subscription"}),(0,s.jsx)(L,{onClick:()=>de(!1),children:"\xd7"})]}),(0,s.jsxs)(I,{children:[(0,s.jsxs)(Y,{children:[(0,s.jsxs)(W,{children:["Restaurant: ",_.restaurantName]}),(0,s.jsx)(W,{children:"Suspension Reason:"}),(0,s.jsx)(Q,{value:ue,onChange:e=>ge(e.target.value),placeholder:"Enter reason for suspension...",rows:4})]}),(0,s.jsx)("div",{style:{color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:"\u26a0\ufe0f This will immediately stop all services for this restaurant."}),(0,s.jsxs)(q,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,s.jsx)(h,{variant:"primary",onClick:()=>{_&&ue&&(n(e=>e.map(e=>e.id===_.id?{...e,status:"suspended",updatedAt:(new Date).toISOString().split("T")[0]}:e)),de(!1),alert("Subscription suspended successfully!"))},disabled:!ue.trim(),style:{background:ue.trim()?"#DC2626":"#9CA3AF"},children:"Suspend Subscription"})]})]})]})}),oe&&(0,s.jsx)(z,{children:(0,s.jsxs)(T,{children:[(0,s.jsxs)(R,{children:[(0,s.jsx)("h2",{children:"Add New Restaurant"}),(0,s.jsx)(L,{onClick:()=>ce(!1),children:"\xd7"})]}),(0,s.jsxs)(I,{children:[(0,s.jsxs)(Y,{children:[(0,s.jsx)(W,{children:"Restaurant Name *"}),(0,s.jsx)(r.DO,{value:ye.name,onChange:e=>je(n=>({...n,name:e.target.value})),placeholder:"Enter restaurant name..."})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(W,{children:"Manager Name *"}),(0,s.jsx)(r.DO,{value:ye.managerName,onChange:e=>je(n=>({...n,managerName:e.target.value})),placeholder:"Enter manager name..."})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(W,{children:"Manager ID (optional)"}),(0,s.jsx)(r.DO,{value:ye.managerId,onChange:e=>je(n=>({...n,managerId:e.target.value})),placeholder:"Auto-generated if empty"})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(W,{children:"Initial Plan"}),(0,s.jsxs)(r.Jt,{value:ye.planType,onChange:e=>je(n=>({...n,planType:e.target.value})),children:[(0,s.jsx)("option",{value:"basic",children:"Basic - RM 29/month (Up to 1k orders)"}),(0,s.jsx)("option",{value:"professional",children:"Professional - RM 99/month (Up to 10k orders)"}),(0,s.jsx)("option",{value:"enterprise",children:"Enterprise - RM 199/month (Unlimited orders)"})]})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(W,{children:"Payment Model"}),(0,s.jsxs)(r.Jt,{value:ye.paymentModel,onChange:e=>je(n=>({...n,paymentModel:e.target.value})),children:[(0,s.jsx)("option",{value:"self",children:"Self-Paying (Restaurant pays directly)"}),(0,s.jsx)("option",{value:"manager",children:"Manager-Paid (Manager pays on behalf)"})]})]}),(0,s.jsxs)(Y,{children:[(0,s.jsx)(W,{children:"Billing Cycle"}),(0,s.jsxs)(r.Jt,{value:ye.billingCycle,onChange:e=>je(n=>({...n,billingCycle:e.target.value})),children:[(0,s.jsx)("option",{value:"monthly",children:"Monthly"}),(0,s.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,s.jsx)("div",{style:{color:"#059669",fontSize:"14px",padding:"12px",background:"#ECFDF5",borderRadius:"8px",marginTop:"16px"},children:"\u2705 New restaurants start with a 30-day free trial period"}),(0,s.jsxs)(q,{children:[(0,s.jsx)(h,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,s.jsx)(h,{variant:"primary",onClick:()=>{if(!ye.name||!ye.managerName)return void alert("Please fill in all required fields");const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}}[ye.planType],a={id:`sub-rest-${Date.now()}`,restaurantId:`rest-${Date.now()}`,restaurantName:ye.name,managerId:ye.managerId||`mgr-${Date.now()}`,managerName:ye.managerName,planType:ye.planType,status:"trial",startDate:(new Date).toISOString().split("T")[0],endDate:new Date(Date.now()+2592e6).toISOString().split("T")[0],monthlyFee:e.monthly,annualFee:e.annual,billingCycle:ye.billingCycle,orderLimit:e.orderLimit,currentOrders:0,usagePercentage:0,paymentModel:ye.paymentModel,payerId:"self"===ye.paymentModel?`rest-${Date.now()}`:ye.managerId,payerName:"self"===ye.paymentModel?ye.name:ye.managerName,features:1e3===e.orderLimit?["Up to 1k orders/month","Basic analytics","Email support"]:1e4===e.orderLimit?["Up to 10k orders/month","Advanced analytics","Priority support"]:["Unlimited orders","Custom analytics","24/7 support","Multi-location"],lastPayment:"-",nextPayment:new Date(Date.now()+2592e6).toISOString().split("T")[0],autoRenew:!1,createdAt:(new Date).toISOString().split("T")[0],updatedAt:(new Date).toISOString().split("T")[0]};n(e=>[a,...e]),ce(!1),alert("Restaurant added successfully with 30-day trial!")},disabled:!ye.name||!ye.managerName,children:"Add Restaurant"})]})]})]})})]})]})})}}}]);