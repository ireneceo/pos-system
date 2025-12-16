"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3543],{3543:(e,n,r)=>{r.r(n),r.d(n,{default:()=>te});var i=r(9950),t=r(4752),a=r(3310),s=r(1367),o=r(6910),l=r(6038),d=r(4414);const c=t.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,p=t.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=t.Ay.div`
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
`,h=t.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=t.Ay.div`
  display: flex;
  gap: 12px;
`,m=t.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: white;\n    color: #374151;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      border-color: #635BFF;\n    }\n  "}
`,g=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,y=t.Ay.div`
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
`,f=t.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,b=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=t.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,v=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 24px;
`,F=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`,A=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,w=t.Ay.div`
  flex: 1;
`,C=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,k=t.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":default:return"#F3F4F6";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"cancelled":return"#DC2626";default:return"#6B7280"}}};
`,E=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
`,B=t.Ay.div``,S=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
`,M=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,P=t.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
`,z=t.Ay.div`
  margin: 16px 0;
  padding: 12px;
  background: ${e=>"self"===e.model?"#FEF3C7":"#E0F2FE"};
  border-radius: 8px;
  border: 1px solid ${e=>"self"===e.model?"#F59E0B":"#0EA5E9"};
`,$=t.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,R=t.Ay.div`
  font-size: 14px;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
`,D=t.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,T=t.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"warning"===e.variant?"\n    background: transparent;\n    color: #D97706;\n    border-color: #FCD34D;\n    \n    &:hover {\n      background: #FEF3C7;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,U=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,L=t.Ay.div``,O=t.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,N=t.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #374151;
`,I=t.Ay.div`
  display: ${e=>e.show?"flex":"none"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
`,J=t.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`,Y=t.Ay.div`
  margin-bottom: 24px;
`,V=t.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,_=t.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,q=t.Ay.div`
  margin-bottom: 20px;
`,G=t.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`,H=t.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #CBD5E1;
  }
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,K=t.Ay.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,Q=t.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #635BFF;
    background: #F8F9FF;
  }
  
  input:checked + & {
    border-color: #635BFF;
    background: #F8F9FF;
  }
`,W=t.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
`,X=t.Ay.div`
  padding: 16px;
  border: 2px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.selected?"#F8F9FF":"white"};
  
  &:hover {
    border-color: #635BFF;
  }
`,Z=t.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin-bottom: 4px;
`,ee=t.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
  margin-bottom: 8px;
`,ne=t.Ay.ul`
  font-size: 12px;
  color: #6B7280;
  margin: 0;
  padding-left: 20px;
`,re=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,ie=t.Ay.button`
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,te=()=>{const{user:e}=(0,s.As)(),[n,r]=(0,i.useState)([]);(0,i.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",i=await fetch(`${o.JR}/api/restaurants/subscriptions/manager/${n}`);if(i.ok){const e=(await i.json()).map(e=>({...e,features:t(e.planType)}));r(e)}else console.error("Failed to fetch subscriptions")}catch(n){console.error("Error fetching subscriptions:",n)}})()},[e]);const t=e=>{switch(e){case"basic":return["Up to 1k Orders/month","Basic Analytics","Community Support"];case"professional":return["Up to 10k Orders/month","Standard Analytics","Email Support","Staff Management"];case"enterprise":return["Unlimited Orders","Advanced Analytics","Priority Support","Custom Branding"];default:return[]}},te=n.filter(e=>"active"===e.status).length,ae=n.filter(e=>"manager"===e.paymentModel&&"active"===e.status).reduce((e,n)=>e+("monthly"===n.billingCycle?n.monthlyFee:n.annualFee/12),0),se=n.filter(e=>"self"===e.paymentModel).length,[oe,le]=(n.filter(e=>"trial"===e.status).length,(0,i.useState)(!1)),[de,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(null),[he,ue]=(0,i.useState)([]);(0,i.useEffect)(()=>{console.log("\ud83c\udf7d\ufe0f availableRestaurants state changed:",he)},[he]);const[me,ge]=(0,i.useState)(""),[ye,fe]=(0,i.useState)("basic"),[be,je]=(0,i.useState)("monthly"),[ve,Fe]=(0,i.useState)("manager");(0,i.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2";console.log("\ud83d\udd0d Fetching available restaurants for manager:",n);const r=await fetch(`${o.JR}/api/restaurants/available/${n}`);if(console.log("\ud83d\udce1 Response status:",r.status),r.ok){const e=await r.json();console.log("\ud83d\udce6 Available restaurants data:",e),ue(e)}else console.error("Failed to fetch available restaurants"),ue([])}catch(n){console.error("Error fetching available restaurants:",n),ue([])}})()},[e]);return(0,d.jsxs)(a.A,{children:[(0,d.jsxs)(c,{children:[(0,d.jsxs)(x,{children:[(0,d.jsx)(h,{children:"Subscriptions"}),(0,d.jsxs)(u,{children:[(0,d.jsx)(m,{variant:"secondary",onClick:()=>{(new Date).toISOString(),null===e||void 0===e||e.name,n.length,n.map(e=>({restaurantName:e.restaurantName,location:e.location,planType:e.planType,status:e.status,paymentModel:e.paymentModel,billingCycle:e.billingCycle,monthlyFee:e.monthlyFee,annualFee:e.annualFee,startDate:e.startDate,nextPayment:e.nextPayment,currentOrders:e.currentOrders,orderLimit:-1===e.orderLimit?"Unlimited":e.orderLimit}));const r=n.map(e=>[e.restaurantName,e.location,e.planType,e.status,e.paymentModel,e.billingCycle,e.monthlyFee,e.annualFee,e.startDate,e.nextPayment,e.currentOrders,-1===e.orderLimit?"Unlimited":e.orderLimit]),i=[["Restaurant","Location","Plan","Status","Payment Model","Billing Cycle","Monthly Fee","Annual Fee","Start Date","Next Payment","Current Orders","Order Limit"].join(","),...r.map(e=>e.join(","))].join("\n"),t=new Blob([i],{type:"text/csv"}),a=URL.createObjectURL(t),s=document.createElement("a");s.href=a,s.download=`subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(a),alert("Subscription data exported successfully!")},children:"Export Data"}),(0,d.jsx)(m,{variant:"primary",onClick:()=>le(!0),children:"Add Subscription"})]})]}),(0,d.jsxs)(p,{children:[(0,d.jsxs)(g,{children:[(0,d.jsxs)(y,{color:"#059669",children:[(0,d.jsx)(f,{children:n.length}),(0,d.jsx)(b,{children:"Total Restaurants"}),(0,d.jsx)(j,{positive:!0,children:"Under your management"})]}),(0,d.jsxs)(y,{color:"#2563EB",children:[(0,d.jsx)(f,{children:te}),(0,d.jsx)(b,{children:"Active Subscriptions"}),(0,d.jsxs)(j,{positive:!0,children:[Math.round(te/n.length*100),"% operational"]})]}),(0,d.jsxs)(y,{color:"#7C3AED",children:[(0,d.jsx)(f,{children:(0,l.vv)(ae)}),(0,d.jsx)(b,{children:"Your Monthly Payment"}),(0,d.jsx)(j,{positive:!0,children:"Manager-paid restaurants only"})]}),(0,d.jsxs)(y,{color:"#D97706",children:[(0,d.jsx)(f,{children:se}),(0,d.jsx)(b,{children:"Self-Paying Restaurants"}),(0,d.jsx)(j,{positive:!0,children:"Direct billing to restaurant"})]})]}),(0,d.jsx)(v,{children:n.map(e=>(0,d.jsxs)(F,{children:[(0,d.jsxs)(A,{children:[(0,d.jsx)(w,{children:(0,d.jsx)(C,{children:e.restaurantName})}),(0,d.jsx)(k,{status:e.status,children:e.status})]}),(0,d.jsxs)(E,{children:[(0,d.jsxs)(B,{children:[(0,d.jsx)(S,{children:e.planType}),(0,d.jsx)(M,{children:"monthly"===e.billingCycle?"Monthly billing":"Annual billing"})]}),(0,d.jsxs)(P,{children:[(0,l.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee),"annual"===e.billingCycle&&(0,d.jsx)("span",{style:{fontSize:"12px",color:"#6B7280"},children:"/year"})]})]}),(0,d.jsxs)(z,{model:e.paymentModel,children:[(0,d.jsx)($,{model:e.paymentModel,children:"self"===e.paymentModel?"Self-Paying":"Manager-Paid"}),(0,d.jsx)(R,{model:e.paymentModel,children:"self"===e.paymentModel?"Restaurant pays directly":"You handle payment for this restaurant"})]}),(0,d.jsxs)(U,{children:[(0,d.jsxs)(L,{children:[(0,d.jsx)(O,{children:"Start Date"}),(0,d.jsx)(N,{children:e.startDate})]}),(0,d.jsxs)(L,{children:[(0,d.jsx)(O,{children:"Next Payment"}),(0,d.jsx)(N,{children:e.nextPayment})]})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)(T,{variant:"primary",onClick:()=>window.open(`/manager/reports?restaurant=${e.restaurantId}`,"_blank"),children:"View Reports"}),(0,d.jsxs)(T,{variant:"warning",onClick:()=>{const i="self"===e.paymentModel?"manager":"self";((e,i)=>{r(n.map(n=>n.id===e?{...n,paymentModel:i,payerId:"manager"===i?n.managerId:`${n.restaurantId}-owner`,payerName:"manager"===i?n.managerName:"Restaurant Owner"}:n))})(e.id,i)},children:["Switch to ","self"===e.paymentModel?"Manager-Pay":"Self-Pay"]}),(0,d.jsx)(T,{onClick:()=>(e=>{xe(e),fe(e.planType),ce(!0)})(e),children:"enterprise"===e.planType?"Change Plan":"Upgrade/Downgrade"}),"cancelled"!==e.status&&(0,d.jsx)(T,{variant:"danger",onClick:()=>{return i=e.id,t=e.restaurantName,void(window.confirm(`Are you sure you want to cancel the subscription for ${t}?\n\nThis action will:\n\u2022 End the subscription at the current billing cycle\n\u2022 Disable access to premium features\n\u2022 Cannot be undone`)&&(r(n.map(e=>e.id===i?{...e,status:"cancelled"}:e)),alert("Subscription has been cancelled. The restaurant will maintain access until the end of the current billing period.")));var i,t},children:"Cancel Subscription"})]})]},e.id))})]})]}),(0,d.jsx)(I,{show:oe,children:(0,d.jsxs)(J,{children:[(0,d.jsxs)(Y,{children:[(0,d.jsx)(V,{children:"Add New Subscription"}),(0,d.jsx)(_,{children:"Connect a restaurant to a subscription plan"})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(G,{children:"Select Restaurant"}),(0,d.jsxs)(H,{value:me,onChange:e=>ge(e.target.value),children:[(0,d.jsx)("option",{value:"",children:"Choose a restaurant..."}),he.map(e=>(0,d.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(G,{children:"Select Plan"}),(0,d.jsxs)(K,{children:[(0,d.jsxs)(X,{selected:"basic"===ye,onClick:()=>fe("basic"),children:[(0,d.jsx)(Z,{children:"Basic"}),(0,d.jsx)(ee,{children:"RM 29/month"}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("li",{children:"Up to 1,000 orders/month"}),(0,d.jsx)("li",{children:"Basic analytics"}),(0,d.jsx)("li",{children:"5 staff accounts"})]})]}),(0,d.jsxs)(X,{selected:"professional"===ye,onClick:()=>fe("professional"),children:[(0,d.jsx)(Z,{children:"Professional"}),(0,d.jsx)(ee,{children:"RM 99/month"}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("li",{children:"Up to 10,000 orders/month"}),(0,d.jsx)("li",{children:"Advanced analytics"}),(0,d.jsx)("li",{children:"Unlimited staff accounts"})]})]}),(0,d.jsxs)(X,{selected:"enterprise"===ye,onClick:()=>fe("enterprise"),children:[(0,d.jsx)(Z,{children:"Enterprise"}),(0,d.jsx)(ee,{children:"RM 199/month"}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("li",{children:"Unlimited orders"}),(0,d.jsx)("li",{children:"Custom analytics"}),(0,d.jsx)("li",{children:"Priority support"})]})]})]})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(G,{children:"Billing Cycle"}),(0,d.jsxs)(K,{children:[(0,d.jsxs)(Q,{children:[(0,d.jsx)(W,{type:"radio",name:"billing",checked:"monthly"===be,onChange:()=>je("monthly")}),"Monthly Billing"]}),(0,d.jsxs)(Q,{children:[(0,d.jsx)(W,{type:"radio",name:"billing",checked:"annual"===be,onChange:()=>je("annual")}),"Annual Billing (Save 17%)"]})]})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(G,{children:"Payment Model"}),(0,d.jsxs)(K,{children:[(0,d.jsxs)(Q,{children:[(0,d.jsx)(W,{type:"radio",name:"payment",checked:"manager"===ve,onChange:()=>Fe("manager")}),"Manager Pays (You handle payment)"]}),(0,d.jsxs)(Q,{children:[(0,d.jsx)(W,{type:"radio",name:"payment",checked:"self"===ve,onChange:()=>Fe("self")}),"Restaurant Self-Pay"]})]})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(ie,{variant:"secondary",onClick:()=>le(!1),children:"Cancel"}),(0,d.jsx)(ie,{variant:"primary",onClick:async()=>{if(me)try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",i=await fetch(`${o.JR}/api/restaurants/subscriptions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({restaurantId:me,managerId:n,planType:ye,billingCycle:be,paymentModel:ve})});if(i.ok){await i.json();const e=await fetch(`${o.JR}/api/restaurants/subscriptions/manager/${n}`);if(e.ok){const n=(await e.json()).map(e=>({...e,features:t(e.planType)}));r(n)}const a=await fetch(`${o.JR}/api/restaurants/available/${n}`);if(a.ok){const e=await a.json();ue(e)}le(!1),ge(""),fe("basic"),je("monthly"),Fe("manager"),alert("Subscription added successfully!")}else{const e=await i.json();alert(`Failed to add subscription: ${e.error}`)}}catch(n){console.error("Error adding subscription:",n),alert("Error adding subscription. Please try again.")}else alert("Please select a restaurant")},children:"Add Subscription"})]})]})}),(0,d.jsx)(I,{show:de,children:(0,d.jsxs)(J,{children:[(0,d.jsxs)(Y,{children:[(0,d.jsx)(V,{children:"Change Subscription Plan"}),(0,d.jsxs)(_,{children:[null===pe||void 0===pe?void 0:pe.restaurantName," - Current: ",null===pe||void 0===pe?void 0:pe.planType]})]}),(0,d.jsxs)(q,{children:[(0,d.jsx)(G,{children:"Select New Plan"}),(0,d.jsxs)(K,{children:[(0,d.jsxs)(X,{selected:"basic"===ye,onClick:()=>fe("basic"),children:[(0,d.jsx)(Z,{children:"Basic"}),(0,d.jsx)(ee,{children:"RM 29/month"}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("li",{children:"Up to 1,000 orders/month"}),(0,d.jsx)("li",{children:"Basic analytics"}),(0,d.jsx)("li",{children:"5 staff accounts"})]})]}),(0,d.jsxs)(X,{selected:"professional"===ye,onClick:()=>fe("professional"),children:[(0,d.jsx)(Z,{children:"Professional"}),(0,d.jsx)(ee,{children:"RM 99/month"}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("li",{children:"Up to 10,000 orders/month"}),(0,d.jsx)("li",{children:"Advanced analytics"}),(0,d.jsx)("li",{children:"Unlimited staff accounts"})]})]}),(0,d.jsxs)(X,{selected:"enterprise"===ye,onClick:()=>fe("enterprise"),children:[(0,d.jsx)(Z,{children:"Enterprise"}),(0,d.jsx)(ee,{children:"RM 199/month"}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("li",{children:"Unlimited orders"}),(0,d.jsx)("li",{children:"Custom analytics"}),(0,d.jsx)("li",{children:"Priority support"})]})]})]})]}),(0,d.jsxs)("div",{style:{padding:"16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,d.jsx)("strong",{style:{color:"#92400E"},children:"Important:"}),(0,d.jsxs)("p",{style:{color:"#92400E",fontSize:"14px",margin:"4px 0 0 0"},children:["Plan changes will take effect from the next billing cycle.",(null===pe||void 0===pe?void 0:pe.planType)===ye&&" (No change selected)"]})]}),(0,d.jsxs)(re,{children:[(0,d.jsx)(ie,{variant:"secondary",onClick:()=>ce(!1),children:"Cancel"}),(0,d.jsx)(ie,{variant:"primary",onClick:()=>{if(!pe)return;const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}};r(n.map(n=>n.id===pe.id?{...n,planType:ye,monthlyFee:e[ye].monthly,annualFee:e[ye].annual,orderLimit:e[ye].orderLimit,nextPayment:new Date(Date.now()+2592e6).toISOString().split("T")[0]}:n)),ce(!1),xe(null),alert(`Plan updated to ${ye}. Changes will be applied from next billing cycle.`)},disabled:(null===pe||void 0===pe?void 0:pe.planType)===ye,children:"Confirm Change"})]})]})})]})}}}]);