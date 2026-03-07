"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5008],{2488:(e,n,a)=>{a.d(n,{DO:()=>c,Jt:()=>x,Qn:()=>p});a(9950);var t=a(4752),i=a(4414);const r=t.Ay.div`
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
`,l=t.Ay.input`
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
`,s=t.Ay.div`
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
`,d=t.Ay.button`
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
`,o=t.Ay.select`
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
`,p=e=>{let{children:n,className:a,style:t,...l}=e;return(0,i.jsx)(r,{className:a,style:t,...l,children:n})},c=e=>{let{placeholder:n="Search...",value:a,onChange:t,style:r,...o}=e;return(0,i.jsxs)(s,{style:r,children:[(0,i.jsx)(l,{placeholder:n,value:a,onChange:t,style:{width:"100%",minWidth:0,maxWidth:"none",paddingRight:a?"36px":"16px"},...o}),a&&(0,i.jsx)(d,{type:"button",onClick:()=>null===t||void 0===t?void 0:t({target:{value:""}}),"aria-label":"Clear search",children:(0,i.jsxs)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[(0,i.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,i.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]})},x=e=>{let{children:n,...a}=e;return(0,i.jsx)(o,{...a,children:n})}},5008:(e,n,a)=>{a.r(n),a.d(n,{default:()=>J});var t=a(9950),i=a(4752),r=a(8409),l=a(2488),s=a(6038),d=a(4414);const o=i.Ay.div`
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
`,c=i.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,h=i.Ay.div`
  display: flex;
  gap: 12px;
`,m=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,u=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,g=i.Ay.div`
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
  color: #0A2540;
  margin-bottom: 4px;
`,j=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=i.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,v=i.Ay.div`
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
`,w=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,F=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,C=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,A=i.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>"self"===e.type?"#ECFDF5":"#DBEAFE"};
  color: ${e=>"self"===e.type?"#059669":"#1E40AF"};
`,S=i.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.plan){case"enterprise":return"#EDE9FE";case"professional":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.plan){case"enterprise":return"#7C3AED";case"professional":return"#1E40AF";default:return"#6B7280"}}};
`,k=i.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #059669;
`,P=i.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":default:return"#F3F4F6";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"cancelled":return"#DC2626";default:return"#6B7280"}}};
`,E=i.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,M=i.Ay.div`
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
`,B=i.Ay.div`
  font-size: 11px;
  color: #6B7280;
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
`,R=i.Ay.div`
  margin-bottom: 16px;
`,z=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,L=i.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,O=i.Ay.ul`
  margin: 0;
  padding-left: 16px;
  font-size: 14px;
  color: #0A2540;
  
  li {
    margin-bottom: 4px;
  }
`,I=i.Ay.div`
  margin-bottom: 20px;
`,$=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,U=i.Ay.textarea`
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
`,J=()=>{const[e,n]=(0,t.useState)([]),[a,i]=(0,t.useState)(""),[J,Y]=(0,t.useState)("all"),[W,Q]=(0,t.useState)("all"),[q,G]=(0,t.useState)("all"),[H,K]=(0,t.useState)(null),[V,X]=(0,t.useState)(!1),[Z,_]=(0,t.useState)(!1),[ee,ne]=(0,t.useState)(!1),[ae,te]=(0,t.useState)(!1),[ie,re]=(0,t.useState)(!1),[le,se]=(0,t.useState)(""),[de,oe]=(0,t.useState)(""),[pe,ce]=(0,t.useState)(""),[xe,he]=(0,t.useState)({name:"",managerId:"",managerName:"",planType:"basic",paymentModel:"self",billingCycle:"monthly"});(0,t.useEffect)(()=>{n([])},[]);const me=e.filter(e=>{const n=e.restaurantName.toLowerCase().includes(a.toLowerCase())||e.managerName.toLowerCase().includes(a.toLowerCase()),t="all"===J||e.status===J,i="all"===W||e.planType===W,r="all"===q||e.paymentModel===q;return n&&t&&i&&r}),ue=e.length,ge=e.filter(e=>"active"===e.status).length,ye=e.filter(e=>"trial"===e.status).length,je=e.filter(e=>"self"===e.paymentModel).length,fe=e.filter(e=>"active"===e.status).reduce((e,n)=>e+("monthly"===n.billingCycle?n.monthlyFee:n.annualFee/12),0),ve=e=>-1===e?"Unlimited":e.toLocaleString();return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(o,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(x,{children:"Restaurant Subscriptions"}),(0,d.jsxs)(h,{children:[(0,d.jsx)(m,{variant:"secondary",onClick:()=>{const e=[["Restaurant Name","Manager","Plan","Status","Monthly Fee","Payment Model","Usage","Last Payment","Next Payment"].join(","),...me.map(e=>[`"${e.restaurantName}"`,`"${e.managerName}"`,e.planType,e.status,`RM ${e.monthlyFee}`,"self"===e.paymentModel?"Self-Paying":"Manager-Paid",e.orderLimit>0?`${e.usagePercentage}%`:"Unlimited",e.lastPayment,e.nextPayment].join(","))].join("\n"),n=new Blob([e],{type:"text/csv"}),a=URL.createObjectURL(n),t=document.createElement("a");t.href=a,t.download=`restaurant-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(a)},children:"Export Report"}),(0,d.jsx)(m,{variant:"primary",onClick:()=>{he({name:"",managerId:"",managerName:"",planType:"basic",paymentModel:"self",billingCycle:"monthly"}),re(!0)},children:"Add Restaurant"})]})]}),(0,d.jsxs)(c,{children:[(0,d.jsxs)(u,{children:[(0,d.jsxs)(g,{color:"#059669",children:[(0,d.jsx)(y,{children:ue}),(0,d.jsx)(j,{children:"Total Restaurants"})]}),(0,d.jsxs)(g,{color:"#2563EB",children:[(0,d.jsx)(y,{children:ge}),(0,d.jsx)(j,{children:"Active Subscriptions"})]}),(0,d.jsxs)(g,{color:"#D97706",children:[(0,d.jsx)(y,{children:ye}),(0,d.jsx)(j,{children:"Trial Subscriptions"})]}),(0,d.jsxs)(g,{color:"#7C3AED",children:[(0,d.jsx)(y,{children:je}),(0,d.jsx)(j,{children:"Self-Paying"})]}),(0,d.jsxs)(g,{color:"#DC2626",children:[(0,d.jsx)(y,{children:(0,s.vv)(fe)}),(0,d.jsx)(j,{children:"Monthly Revenue"})]})]}),(0,d.jsxs)(l.Qn,{children:[(0,d.jsxs)(l.Jt,{value:J,onChange:e=>Y(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Status"}),(0,d.jsx)("option",{value:"active",children:"Active"}),(0,d.jsx)("option",{value:"trial",children:"Trial"}),(0,d.jsx)("option",{value:"expired",children:"Expired"}),(0,d.jsx)("option",{value:"suspended",children:"Suspended"}),(0,d.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,d.jsxs)(l.Jt,{value:W,onChange:e=>Q(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Plans"}),(0,d.jsx)("option",{value:"basic",children:"Basic"}),(0,d.jsx)("option",{value:"professional",children:"Professional"}),(0,d.jsx)("option",{value:"enterprise",children:"Enterprise"})]}),(0,d.jsxs)(l.Jt,{value:q,onChange:e=>G(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:"All Payment Types"}),(0,d.jsx)("option",{value:"self",children:"Self-Paying"}),(0,d.jsx)("option",{value:"manager",children:"Manager-Paid"})]}),(0,d.jsx)(l.DO,{type:"text",placeholder:"Search restaurants or managers...",value:a,onChange:e=>i(e.target.value)})]}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(v,{children:[(0,d.jsx)("span",{children:"Restaurant"}),(0,d.jsx)("span",{children:"Manager"}),(0,d.jsx)("span",{children:"Plan"}),(0,d.jsx)("span",{children:"Price"}),(0,d.jsx)("span",{children:"Status"}),(0,d.jsx)("span",{children:"Usage"}),(0,d.jsx)("span",{children:"Actions"})]}),me.map(e=>(0,d.jsxs)(b,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(F,{children:e.restaurantName}),(0,d.jsxs)(C,{children:[(0,d.jsx)(A,{type:e.paymentModel,children:"self"===e.paymentModel?"Self":"Manager"}),e.payerName]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:e.managerName}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.managerId})]}),(0,d.jsx)(S,{plan:e.planType,children:e.planType}),(0,d.jsxs)(k,{children:[(0,s.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee),(0,d.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:["/","monthly"===e.billingCycle?"month":"year"]})]}),(0,d.jsx)(P,{status:e.status,children:e.status}),(0,d.jsxs)(E,{children:[(0,d.jsx)(M,{children:(0,d.jsx)(D,{percentage:e.usagePercentage})}),(0,d.jsxs)(B,{children:[e.currentOrders.toLocaleString()," / ",ve(e.orderLimit)]})]}),(0,d.jsxs)(N,{children:[(0,d.jsx)(T,{onClick:()=>(e=>{K(e),X(!0)})(e),children:"Details"}),"active"===e.status||"trial"===e.status?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(T,{onClick:()=>(e=>{K(e),se(e.planType),_(!0)})(e),children:"Plan"}),(0,d.jsx)(T,{onClick:()=>(e=>{K(e),ce(""),te(!0)})(e),children:"Suspend"})]}):(0,d.jsx)(T,{onClick:()=>{return a=e.id,n(e=>e.map(e=>e.id===a?{...e,status:"active",updatedAt:(new Date).toISOString().split("T")[0]}:e)),void alert("Subscription reactivated successfully!");var a},disabled:"cancelled"===e.status,children:"Reactivate"})]})]},e.id)),0===me.length&&(0,d.jsx)("div",{style:{padding:"60px 20px",textAlign:"center",color:"#6B7280"},children:"No subscriptions found"})]}),V&&H&&(0,d.jsxs)(r.aF,{isOpen:!0,onClose:()=>X(!1),title:"Subscription Details",children:[(0,d.jsxs)(R,{children:[(0,d.jsx)(z,{children:"Restaurant"}),(0,d.jsx)(L,{children:H.restaurantName})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(z,{children:"Manager"}),(0,d.jsx)(L,{children:H.managerName})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(z,{children:"Plan"}),(0,d.jsx)(L,{children:H.planType})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(z,{children:"Status"}),(0,d.jsx)(P,{status:H.status,children:H.status})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(z,{children:"Pricing"}),(0,d.jsxs)(L,{children:[(0,s.vv)("monthly"===H.billingCycle?H.monthlyFee:H.annualFee),"/",H.billingCycle]})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(z,{children:"Order Usage"}),(0,d.jsxs)(L,{children:[H.currentOrders.toLocaleString()," / ",ve(H.orderLimit),H.orderLimit>0&&` (${H.usagePercentage}%)`]})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(z,{children:"Payment Model"}),(0,d.jsxs)(L,{children:[(0,d.jsx)(A,{type:H.paymentModel,children:"self"===H.paymentModel?"Self-Paying":"Manager-Paid"}),(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ",H.payerName]})]})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(z,{children:"Features"}),(0,d.jsx)(O,{children:H.features.map((e,n)=>(0,d.jsx)("li",{children:e},n))})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(z,{children:"Subscription Period"}),(0,d.jsxs)(L,{children:[H.startDate," to ",H.endDate]})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(z,{children:"Last Payment"}),(0,d.jsx)(L,{children:H.lastPayment})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(z,{children:"Next Payment"}),(0,d.jsx)(L,{children:H.nextPayment})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(z,{children:"Auto Renew"}),(0,d.jsx)(L,{children:H.autoRenew?"Yes":"No"})]})]}),Z&&H&&(0,d.jsx)(r.aF,{isOpen:!0,onClose:()=>_(!1),title:"Change Plan",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m,{variant:"secondary",onClick:()=>_(!1),children:"Cancel"}),(0,d.jsx)(m,{variant:"primary",onClick:()=>{if(!H)return;const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}}[le];n(n=>n.map(n=>n.id===H.id?{...n,planType:le,monthlyFee:e.monthly,annualFee:e.annual,orderLimit:e.orderLimit,updatedAt:(new Date).toISOString().split("T")[0]}:n)),_(!1),alert("Plan changed successfully!")},children:"Change Plan"})]}),children:(0,d.jsxs)(I,{children:[(0,d.jsxs)($,{children:["Current Plan: ",H.planType]}),(0,d.jsx)($,{children:"Select New Plan:"}),(0,d.jsxs)(l.Jt,{value:le,onChange:e=>se(e.target.value),children:[(0,d.jsx)("option",{value:"basic",children:"Basic - RM 29/month (Up to 1k orders)"}),(0,d.jsx)("option",{value:"professional",children:"Professional - RM 99/month (Up to 10k orders)"}),(0,d.jsx)("option",{value:"enterprise",children:"Enterprise - RM 199/month (Unlimited orders)"})]})]})}),ee&&H&&(0,d.jsx)(r.aF,{isOpen:!0,onClose:()=>ne(!1),title:"Switch Payment Method",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m,{variant:"secondary",onClick:()=>ne(!1),children:"Cancel"}),(0,d.jsx)(m,{variant:"primary",onClick:()=>{H&&(n(e=>e.map(e=>e.id===H.id?{...e,paymentModel:de,updatedAt:(new Date).toISOString().split("T")[0]}:e)),ne(!1),alert("Payment method updated successfully!"))},children:"Update Payment"})]}),children:(0,d.jsxs)(I,{children:[(0,d.jsxs)($,{children:["Current: ","self"===H.paymentModel?"Self-Paying":"Manager-Paid"]}),(0,d.jsx)($,{children:"Select New Payment Method:"}),(0,d.jsxs)(l.Jt,{value:de,onChange:e=>oe(e.target.value),children:[(0,d.jsx)("option",{value:"self",children:"Self-Paying (Restaurant pays directly)"}),(0,d.jsx)("option",{value:"manager",children:"Manager-Paid (Manager pays on behalf)"})]})]})}),ae&&H&&(0,d.jsxs)(r.aF,{isOpen:!0,onClose:()=>te(!1),title:"Suspend Subscription",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m,{variant:"secondary",onClick:()=>te(!1),children:"Cancel"}),(0,d.jsx)(m,{variant:"primary",onClick:()=>{H&&pe&&(n(e=>e.map(e=>e.id===H.id?{...e,status:"suspended",updatedAt:(new Date).toISOString().split("T")[0]}:e)),te(!1),alert("Subscription suspended successfully!"))},disabled:!pe.trim(),style:{background:pe.trim()?"#DC2626":"#9CA3AF"},children:"Suspend Subscription"})]}),children:[(0,d.jsxs)(I,{children:[(0,d.jsxs)($,{children:["Restaurant: ",H.restaurantName]}),(0,d.jsx)($,{children:"Suspension Reason:"}),(0,d.jsx)(U,{value:pe,onChange:e=>ce(e.target.value),placeholder:"Enter reason for suspension...",rows:4})]}),(0,d.jsx)("div",{style:{color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:"This will immediately stop all services for this restaurant."})]}),ie&&(0,d.jsxs)(r.aF,{isOpen:!0,onClose:()=>re(!1),title:"Add New Restaurant",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m,{variant:"secondary",onClick:()=>re(!1),children:"Cancel"}),(0,d.jsx)(m,{variant:"primary",onClick:()=>{if(!xe.name||!xe.managerName)return void alert("Please fill in all required fields");const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}}[xe.planType],a={id:`sub-rest-${Date.now()}`,restaurantId:`rest-${Date.now()}`,restaurantName:xe.name,managerId:xe.managerId||`mgr-${Date.now()}`,managerName:xe.managerName,planType:xe.planType,status:"trial",startDate:(new Date).toISOString().split("T")[0],endDate:new Date(Date.now()+2592e6).toISOString().split("T")[0],monthlyFee:e.monthly,annualFee:e.annual,billingCycle:xe.billingCycle,orderLimit:e.orderLimit,currentOrders:0,usagePercentage:0,paymentModel:xe.paymentModel,payerId:"self"===xe.paymentModel?`rest-${Date.now()}`:xe.managerId,payerName:"self"===xe.paymentModel?xe.name:xe.managerName,features:1e3===e.orderLimit?["Up to 1k orders/month","Basic analytics","Email support"]:1e4===e.orderLimit?["Up to 10k orders/month","Advanced analytics","Priority support"]:["Unlimited orders","Custom analytics","24/7 support","Multi-location"],lastPayment:"-",nextPayment:new Date(Date.now()+2592e6).toISOString().split("T")[0],autoRenew:!1,createdAt:(new Date).toISOString().split("T")[0],updatedAt:(new Date).toISOString().split("T")[0]};n(e=>[a,...e]),re(!1),alert("Restaurant added successfully with 30-day trial!")},disabled:!xe.name||!xe.managerName,children:"Add Restaurant"})]}),children:[(0,d.jsxs)(I,{children:[(0,d.jsx)($,{children:"Restaurant Name *"}),(0,d.jsx)(l.DO,{value:xe.name,onChange:e=>he(n=>({...n,name:e.target.value})),placeholder:"Enter restaurant name..."})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)($,{children:"Manager Name *"}),(0,d.jsx)(l.DO,{value:xe.managerName,onChange:e=>he(n=>({...n,managerName:e.target.value})),placeholder:"Enter manager name..."})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)($,{children:"Manager ID (optional)"}),(0,d.jsx)(l.DO,{value:xe.managerId,onChange:e=>he(n=>({...n,managerId:e.target.value})),placeholder:"Auto-generated if empty"})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)($,{children:"Initial Plan"}),(0,d.jsxs)(l.Jt,{value:xe.planType,onChange:e=>he(n=>({...n,planType:e.target.value})),children:[(0,d.jsx)("option",{value:"basic",children:"Basic - RM 29/month (Up to 1k orders)"}),(0,d.jsx)("option",{value:"professional",children:"Professional - RM 99/month (Up to 10k orders)"}),(0,d.jsx)("option",{value:"enterprise",children:"Enterprise - RM 199/month (Unlimited orders)"})]})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)($,{children:"Payment Model"}),(0,d.jsxs)(l.Jt,{value:xe.paymentModel,onChange:e=>he(n=>({...n,paymentModel:e.target.value})),children:[(0,d.jsx)("option",{value:"self",children:"Self-Paying (Restaurant pays directly)"}),(0,d.jsx)("option",{value:"manager",children:"Manager-Paid (Manager pays on behalf)"})]})]}),(0,d.jsxs)(I,{children:[(0,d.jsx)($,{children:"Billing Cycle"}),(0,d.jsxs)(l.Jt,{value:xe.billingCycle,onChange:e=>he(n=>({...n,billingCycle:e.target.value})),children:[(0,d.jsx)("option",{value:"monthly",children:"Monthly"}),(0,d.jsx)("option",{value:"annual",children:"Annual (10% discount)"})]})]}),(0,d.jsx)("div",{style:{color:"#059669",fontSize:"14px",padding:"12px",background:"#ECFDF5",borderRadius:"8px",marginTop:"16px"},children:"New restaurants start with a 30-day free trial period"})]})]})]})})}}}]);