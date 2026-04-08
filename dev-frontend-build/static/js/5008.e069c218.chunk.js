"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[5008],{5008:(e,a,n)=>{n.r(a),n.d(a,{default:()=>Y});var t=n(9950),r=n(4752),i=n(8409),s=n(2488),l=n(6038),o=n(5030),d=n(4414);const c=r.Ay.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`,p=r.Ay.div`
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
`,u=r.Ay.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=r.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=r.Ay.div`
  display: flex;
  gap: 12px;
`,h=r.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-2px);\n      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n      border-color: #CBD5E1;\n    }\n  "}
`,g=r.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=r.Ay.div`
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
`,j=r.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,b=r.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,f=r.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`,v=r.Ay.div`
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
`,S=r.Ay.div`
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
`,P=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,F=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`,w=r.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,C=r.Ay.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  display: inline-block;
  background: ${e=>"self"===e.type?"#ECFDF5":"#DBEAFE"};
  color: ${e=>"self"===e.type?"#059669":"#1E40AF"};
`,A=r.Ay.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  display: inline-block;
  background: ${e=>{switch(e.plan){case"enterprise":return"#EDE9FE";case"professional":return"#DBEAFE";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.plan){case"enterprise":return"#7C3AED";case"professional":return"#1E40AF";default:return"#6B7280"}}};
`,k=r.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #059669;
`,D=r.Ay.span`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":default:return"#F3F4F6";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"cancelled":return"#DC2626";default:return"#6B7280"}}};
`,E=r.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,B=r.Ay.div`
  width: 100px;
  height: 6px;
  background: #F3F4F6;
  border-radius: 3px;
  overflow: hidden;
`,T=r.Ay.div`
  height: 100%;
  width: ${e=>e.percentage}%;
  background: ${e=>e.percentage>90?"#DC2626":e.percentage>75?"#D97706":"#059669"};
  transition: width 0.3s ease;
`,M=r.Ay.div`
  font-size: 11px;
  color: #6B7280;
`,O=r.Ay.div`
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
`,N=r.Ay.button`
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
`,R=r.Ay.div`
  margin-bottom: 16px;
`,L=r.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,z=r.Ay.div`
  font-size: 14px;
  color: #0A2540;
`,I=r.Ay.ul`
  margin: 0;
  padding-left: 16px;
  font-size: 14px;
  color: #0A2540;
  
  li {
    margin-bottom: 4px;
  }
`,$=r.Ay.div`
  margin-bottom: 20px;
`,U=r.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 8px;
`,J=r.Ay.textarea`
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
`,Y=()=>{const{t:e}=(0,o.Bd)("admin"),[a,n]=(0,t.useState)([]),[r,Y]=(0,t.useState)(""),[q,Q]=(0,t.useState)("all"),[G,H]=(0,t.useState)("all"),[K,V]=(0,t.useState)("all"),[W,X]=(0,t.useState)(null),[Z,_]=(0,t.useState)(!1),[ee,ae]=(0,t.useState)(!1),[ne,te]=(0,t.useState)(!1),[re,ie]=(0,t.useState)(!1),[se,le]=(0,t.useState)(!1),[oe,de]=(0,t.useState)(""),[ce,pe]=(0,t.useState)(""),[ue,xe]=(0,t.useState)(""),[me,he]=(0,t.useState)({name:"",managerId:"",managerName:"",planType:"basic",paymentModel:"self",billingCycle:"monthly"});(0,t.useEffect)(()=>{n([])},[]);const ge=a.filter(e=>{const a=e.restaurantName.toLowerCase().includes(r.toLowerCase())||e.managerName.toLowerCase().includes(r.toLowerCase()),n="all"===q||e.status===q,t="all"===G||e.planType===G,i="all"===K||e.paymentModel===K;return a&&n&&t&&i}),ye=a.length,je=a.filter(e=>"active"===e.status).length,be=a.filter(e=>"trial"===e.status).length,fe=a.filter(e=>"self"===e.paymentModel).length,ve=a.filter(e=>"active"===e.status).reduce((e,a)=>e+("monthly"===a.billingCycle?a.monthlyFee:a.annualFee/12),0),Se=e=>-1===e?"Unlimited":e.toLocaleString();return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(c,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(x,{children:e("admin:restaurantSubscriptionsPage.restaurantSubscriptions")}),(0,d.jsxs)(m,{children:[(0,d.jsx)(h,{variant:"secondary",onClick:()=>{const e=[["Restaurant Name","Manager","Plan","Status","Monthly Fee","Payment Model","Usage","Last Payment","Next Payment"].join(","),...ge.map(e=>[`"${e.restaurantName}"`,`"${e.managerName}"`,e.planType,e.status,`RM ${e.monthlyFee}`,"self"===e.paymentModel?"Self-Paying":"Manager-Paid",e.orderLimit>0?`${e.usagePercentage}%`:"Unlimited",e.lastPayment,e.nextPayment].join(","))].join("\n"),a=new Blob([e],{type:"text/csv"}),n=URL.createObjectURL(a),t=document.createElement("a");t.href=n,t.download=`restaurant-subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(t),t.click(),document.body.removeChild(t),URL.revokeObjectURL(n)},children:e("admin:restaurantSubscriptionsPage.exportReport")}),(0,d.jsx)(h,{variant:"primary",onClick:()=>{he({name:"",managerId:"",managerName:"",planType:"basic",paymentModel:"self",billingCycle:"monthly"}),le(!0)},children:e("admin:restaurantSubscriptionsPage.addRestaurant")})]})]}),(0,d.jsxs)(u,{children:[(0,d.jsxs)(g,{children:[(0,d.jsxs)(y,{color:"#059669",children:[(0,d.jsx)(j,{children:ye}),(0,d.jsx)(b,{children:e("admin:restaurantSubscriptionsPage.totalRestaurants")})]}),(0,d.jsxs)(y,{color:"#2563EB",children:[(0,d.jsx)(j,{children:je}),(0,d.jsx)(b,{children:e("admin:restaurantSubscriptionsPage.activeSubscriptions")})]}),(0,d.jsxs)(y,{color:"#D97706",children:[(0,d.jsx)(j,{children:be}),(0,d.jsx)(b,{children:e("admin:restaurantSubscriptionsPage.trialSubscriptions")})]}),(0,d.jsxs)(y,{color:"#7C3AED",children:[(0,d.jsx)(j,{children:fe}),(0,d.jsx)(b,{children:e("admin:restaurantSubscriptionsPage.selfpaying")})]}),(0,d.jsxs)(y,{color:"#DC2626",children:[(0,d.jsx)(j,{children:(0,l.vv)(ve)}),(0,d.jsx)(b,{children:e("admin:restaurantSubscriptionsPage.monthlyRevenue")})]})]}),(0,d.jsxs)(s.Qn,{children:[(0,d.jsxs)(s.Jt,{value:q,onChange:e=>Q(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:e("admin:restaurantSubscriptionsPage.allStatus")}),(0,d.jsx)("option",{value:"active",children:e("admin:restaurantSubscriptionsPage.active")}),(0,d.jsx)("option",{value:"trial",children:e("admin:restaurantSubscriptionsPage.trial")}),(0,d.jsx)("option",{value:"expired",children:e("admin:restaurantSubscriptionsPage.expired")}),(0,d.jsx)("option",{value:"suspended",children:e("admin:restaurantSubscriptionsPage.suspended")}),(0,d.jsx)("option",{value:"cancelled",children:e("admin:restaurantSubscriptionsPage.cancelled")})]}),(0,d.jsxs)(s.Jt,{value:G,onChange:e=>H(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:e("admin:restaurantSubscriptionsPage.allPlans")}),(0,d.jsx)("option",{value:"basic",children:e("admin:restaurantSubscriptionsPage.basic")}),(0,d.jsx)("option",{value:"professional",children:e("admin:restaurantSubscriptionsPage.professional")}),(0,d.jsx)("option",{value:"enterprise",children:e("admin:restaurantSubscriptionsPage.enterprise")})]}),(0,d.jsxs)(s.Jt,{value:K,onChange:e=>V(e.target.value),children:[(0,d.jsx)("option",{value:"all",children:e("admin:restaurantSubscriptionsPage.allPaymentTypes")}),(0,d.jsx)("option",{value:"self",children:e("admin:restaurantSubscriptionsPage.selfpaying")}),(0,d.jsx)("option",{value:"manager",children:e("admin:restaurantSubscriptionsPage.managerpaid")})]}),(0,d.jsx)(s.DO,{type:"text",placeholder:"Search restaurants or managers...",value:r,onChange:e=>Y(e.target.value)})]}),(0,d.jsxs)(f,{children:[(0,d.jsxs)(v,{children:[(0,d.jsx)("span",{children:e("admin:restaurantSubscriptionsPage.restaurant")}),(0,d.jsx)("span",{children:e("admin:restaurantSubscriptionsPage.manager")}),(0,d.jsx)("span",{children:e("admin:restaurantSubscriptionsPage.plan")}),(0,d.jsx)("span",{children:e("admin:restaurantSubscriptionsPage.price")}),(0,d.jsx)("span",{children:e("admin:restaurantSubscriptionsPage.status")}),(0,d.jsx)("span",{children:e("admin:restaurantSubscriptionsPage.usage")}),(0,d.jsx)("span",{children:e("admin:restaurantSubscriptionsPage.actions")})]}),ge.map(e=>(0,d.jsxs)(S,{children:[(0,d.jsxs)(P,{children:[(0,d.jsx)(F,{children:e.restaurantName}),(0,d.jsxs)(w,{children:[(0,d.jsx)(C,{type:e.paymentModel,children:"self"===e.paymentModel?"Self":"Manager"}),e.payerName]})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("div",{style:{fontSize:"14px",color:"#0A2540"},children:e.managerName}),(0,d.jsx)("div",{style:{fontSize:"12px",color:"#6B7280"},children:e.managerId})]}),(0,d.jsx)(A,{plan:e.planType,children:e.planType}),(0,d.jsxs)(k,{children:[(0,l.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee),(0,d.jsxs)("div",{style:{fontSize:"11px",color:"#6B7280"},children:["/","monthly"===e.billingCycle?"month":"year"]})]}),(0,d.jsx)(D,{status:e.status,children:e.status}),(0,d.jsxs)(E,{children:[(0,d.jsx)(B,{children:(0,d.jsx)(T,{percentage:e.usagePercentage})}),(0,d.jsxs)(M,{children:[e.currentOrders.toLocaleString()," / ",Se(e.orderLimit)]})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(N,{onClick:()=>(e=>{X(e),_(!0)})(e),children:"Details"}),"active"===e.status||"trial"===e.status?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(N,{onClick:()=>(e=>{X(e),de(e.planType),ae(!0)})(e),children:"Plan"}),(0,d.jsx)(N,{onClick:()=>(e=>{X(e),xe(""),ie(!0)})(e),children:"Suspend"})]}):(0,d.jsx)(N,{onClick:()=>{return a=e.id,n(e=>e.map(e=>e.id===a?{...e,status:"active",updatedAt:(new Date).toISOString().split("T")[0]}:e)),void alert("Subscription reactivated successfully!");var a},disabled:"cancelled"===e.status,children:"Reactivate"})]})]},e.id)),0===ge.length&&(0,d.jsx)("div",{style:{padding:"60px 20px",textAlign:"center",color:"#6B7280"},children:"No subscriptions found"})]}),Z&&W&&(0,d.jsxs)(i.aF,{isOpen:!0,onClose:()=>_(!1),title:"Subscription Details",footer:(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(h,{variant:"secondary",onClick:()=>_(!1),children:e("admin:restaurantSubscriptionsPage.close")})}),children:[(0,d.jsxs)(R,{children:[(0,d.jsx)(L,{children:e("admin:restaurantSubscriptionsPage.restaurant")}),(0,d.jsx)(z,{children:W.restaurantName})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(L,{children:e("admin:restaurantSubscriptionsPage.manager")}),(0,d.jsx)(z,{children:W.managerName})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(L,{children:e("admin:restaurantSubscriptionsPage.plan")}),(0,d.jsx)(z,{children:W.planType})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(L,{children:e("admin:restaurantSubscriptionsPage.status")}),(0,d.jsx)(D,{status:W.status,children:W.status})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(L,{children:e("admin:restaurantSubscriptionsPage.pricing")}),(0,d.jsxs)(z,{children:[(0,l.vv)("monthly"===W.billingCycle?W.monthlyFee:W.annualFee),"/",W.billingCycle]})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(L,{children:e("admin:restaurantSubscriptionsPage.orderUsage")}),(0,d.jsxs)(z,{children:[W.currentOrders.toLocaleString()," / ",Se(W.orderLimit),W.orderLimit>0&&` (${W.usagePercentage}%)`]})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(L,{children:e("admin:restaurantSubscriptionsPage.paymentModel")}),(0,d.jsxs)(z,{children:[(0,d.jsx)(C,{type:W.paymentModel,children:"self"===W.paymentModel?"Self-Paying":"Manager-Paid"}),(0,d.jsxs)("div",{style:{fontSize:"12px",color:"#6B7280",marginTop:"4px"},children:["Paid by: ",W.payerName]})]})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(L,{children:e("admin:restaurantSubscriptionsPage.features")}),(0,d.jsx)(I,{children:W.features.map((e,a)=>(0,d.jsx)("li",{children:e},a))})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(L,{children:e("admin:restaurantSubscriptionsPage.subscriptionPeriod")}),(0,d.jsxs)(z,{children:[W.startDate," to ",W.endDate]})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(L,{children:e("admin:restaurantSubscriptionsPage.lastPayment")}),(0,d.jsx)(z,{children:W.lastPayment})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(L,{children:e("admin:restaurantSubscriptionsPage.nextPayment")}),(0,d.jsx)(z,{children:W.nextPayment})]}),(0,d.jsxs)(R,{children:[(0,d.jsx)(L,{children:e("admin:restaurantSubscriptionsPage.autoRenew")}),(0,d.jsx)(z,{children:W.autoRenew?"Yes":"No"})]})]}),ee&&W&&(0,d.jsx)(i.aF,{isOpen:!0,onClose:()=>ae(!1),title:"Change Plan",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(h,{variant:"secondary",onClick:()=>ae(!1),children:e("admin:restaurantSubscriptionsPage.cancel")}),(0,d.jsx)(h,{variant:"primary",onClick:()=>{if(!W)return;const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}}[oe];n(a=>a.map(a=>a.id===W.id?{...a,planType:oe,monthlyFee:e.monthly,annualFee:e.annual,orderLimit:e.orderLimit,updatedAt:(new Date).toISOString().split("T")[0]}:a)),ae(!1),alert("Plan changed successfully!")},children:e("admin:restaurantSubscriptionsPage.changePlan")})]}),children:(0,d.jsxs)($,{children:[(0,d.jsxs)(U,{children:["Current Plan: ",W.planType]}),(0,d.jsx)(U,{children:"Select New Plan:"}),(0,d.jsxs)(s.Jt,{value:oe,onChange:e=>de(e.target.value),children:[(0,d.jsx)("option",{value:"basic",children:e("admin:restaurantSubscriptionsPage.basicRm29monthUpTo1kOrders")}),(0,d.jsx)("option",{value:"professional",children:e("admin:restaurantSubscriptionsPage.professionalRm99monthUpTo10kOrders")}),(0,d.jsx)("option",{value:"enterprise",children:e("admin:restaurantSubscriptionsPage.enterpriseRm199monthUnlimitedOrders")})]})]})}),ne&&W&&(0,d.jsx)(i.aF,{isOpen:!0,onClose:()=>te(!1),title:"Switch Payment Method",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(h,{variant:"secondary",onClick:()=>te(!1),children:e("admin:restaurantSubscriptionsPage.cancel")}),(0,d.jsx)(h,{variant:"primary",onClick:()=>{W&&(n(e=>e.map(e=>e.id===W.id?{...e,paymentModel:ce,updatedAt:(new Date).toISOString().split("T")[0]}:e)),te(!1),alert("Payment method updated successfully!"))},children:e("admin:restaurantSubscriptionsPage.updatePayment")})]}),children:(0,d.jsxs)($,{children:[(0,d.jsxs)(U,{children:["Current: ","self"===W.paymentModel?"Self-Paying":"Manager-Paid"]}),(0,d.jsx)(U,{children:"Select New Payment Method:"}),(0,d.jsxs)(s.Jt,{value:ce,onChange:e=>pe(e.target.value),children:[(0,d.jsx)("option",{value:"self",children:e("admin:restaurantSubscriptionsPage.selfpayingRestaurantPaysDirectly")}),(0,d.jsx)("option",{value:"manager",children:e("admin:restaurantSubscriptionsPage.managerpaidManagerPaysOnBehalf")})]})]})}),re&&W&&(0,d.jsxs)(i.aF,{isOpen:!0,onClose:()=>ie(!1),title:"Suspend Subscription",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(h,{variant:"secondary",onClick:()=>ie(!1),children:e("admin:restaurantSubscriptionsPage.cancel")}),(0,d.jsx)(h,{variant:"primary",onClick:()=>{W&&ue&&(n(e=>e.map(e=>e.id===W.id?{...e,status:"suspended",updatedAt:(new Date).toISOString().split("T")[0]}:e)),ie(!1),alert("Subscription suspended successfully!"))},disabled:!ue.trim(),style:{background:ue.trim()?"#DC2626":"#9CA3AF"},children:e("admin:restaurantSubscriptionsPage.suspendSubscription")})]}),children:[(0,d.jsxs)($,{children:[(0,d.jsxs)(U,{children:["Restaurant: ",W.restaurantName]}),(0,d.jsx)(U,{children:"Suspension Reason:"}),(0,d.jsx)(J,{value:ue,onChange:e=>xe(e.target.value),placeholder:"Enter reason for suspension...",rows:4})]}),(0,d.jsx)("div",{style:{color:"#DC2626",fontSize:"14px",marginTop:"8px"},children:"This will immediately stop all services for this restaurant."})]}),se&&(0,d.jsxs)(i.aF,{isOpen:!0,onClose:()=>le(!1),title:"Add New Restaurant",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(h,{variant:"secondary",onClick:()=>le(!1),children:e("admin:restaurantSubscriptionsPage.cancel")}),(0,d.jsx)(h,{variant:"primary",onClick:()=>{if(!me.name||!me.managerName)return void alert("Please fill in all required fields");const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}}[me.planType],a={id:`sub-rest-${Date.now()}`,restaurantId:`rest-${Date.now()}`,restaurantName:me.name,managerId:me.managerId||`mgr-${Date.now()}`,managerName:me.managerName,planType:me.planType,status:"trial",startDate:(new Date).toISOString().split("T")[0],endDate:new Date(Date.now()+2592e6).toISOString().split("T")[0],monthlyFee:e.monthly,annualFee:e.annual,billingCycle:me.billingCycle,orderLimit:e.orderLimit,currentOrders:0,usagePercentage:0,paymentModel:me.paymentModel,payerId:"self"===me.paymentModel?`rest-${Date.now()}`:me.managerId,payerName:"self"===me.paymentModel?me.name:me.managerName,features:1e3===e.orderLimit?["Up to 1k orders/month","Basic analytics","Email support"]:1e4===e.orderLimit?["Up to 10k orders/month","Advanced analytics","Priority support"]:["Unlimited orders","Custom analytics","24/7 support","Multi-location"],lastPayment:"-",nextPayment:new Date(Date.now()+2592e6).toISOString().split("T")[0],autoRenew:!1,createdAt:(new Date).toISOString().split("T")[0],updatedAt:(new Date).toISOString().split("T")[0]};n(e=>[a,...e]),le(!1),alert("Restaurant added successfully with 30-day trial!")},disabled:!me.name||!me.managerName,children:e("admin:restaurantSubscriptionsPage.addRestaurant")})]}),children:[(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Restaurant Name *"}),(0,d.jsx)(s.DO,{value:me.name,onChange:e=>he(a=>({...a,name:e.target.value})),placeholder:"Enter restaurant name..."})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:"Manager Name *"}),(0,d.jsx)(s.DO,{value:me.managerName,onChange:e=>he(a=>({...a,managerName:e.target.value})),placeholder:"Enter manager name..."})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:e("admin:restaurantSubscriptionsPage.managerIdOptional")}),(0,d.jsx)(s.DO,{value:me.managerId,onChange:e=>he(a=>({...a,managerId:e.target.value})),placeholder:"Auto-generated if empty"})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:e("admin:restaurantSubscriptionsPage.initialPlan")}),(0,d.jsxs)(s.Jt,{value:me.planType,onChange:e=>he(a=>({...a,planType:e.target.value})),children:[(0,d.jsx)("option",{value:"basic",children:e("admin:restaurantSubscriptionsPage.basicRm29monthUpTo1kOrders")}),(0,d.jsx)("option",{value:"professional",children:e("admin:restaurantSubscriptionsPage.professionalRm99monthUpTo10kOrders")}),(0,d.jsx)("option",{value:"enterprise",children:e("admin:restaurantSubscriptionsPage.enterpriseRm199monthUnlimitedOrders")})]})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:e("admin:restaurantSubscriptionsPage.paymentModel")}),(0,d.jsxs)(s.Jt,{value:me.paymentModel,onChange:e=>he(a=>({...a,paymentModel:e.target.value})),children:[(0,d.jsx)("option",{value:"self",children:e("admin:restaurantSubscriptionsPage.selfpayingRestaurantPaysDirectly")}),(0,d.jsx)("option",{value:"manager",children:e("admin:restaurantSubscriptionsPage.managerpaidManagerPaysOnBehalf")})]})]}),(0,d.jsxs)($,{children:[(0,d.jsx)(U,{children:e("admin:restaurantSubscriptionsPage.billingCycle")}),(0,d.jsxs)(s.Jt,{value:me.billingCycle,onChange:e=>he(a=>({...a,billingCycle:e.target.value})),children:[(0,d.jsx)("option",{value:"monthly",children:e("admin:restaurantSubscriptionsPage.monthly")}),(0,d.jsx)("option",{value:"annual",children:e("admin:restaurantSubscriptionsPage.annual")})]})]}),(0,d.jsx)("div",{style:{color:"#059669",fontSize:"14px",padding:"12px",background:"#ECFDF5",borderRadius:"8px",marginTop:"16px"},children:"New restaurants start with a 30-day free trial period"})]})]})]})})}}}]);