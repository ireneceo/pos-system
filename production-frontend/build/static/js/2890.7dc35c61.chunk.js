"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2890],{2890:(e,n,r)=>{r.r(n),r.d(n,{default:()=>ie});var t=r(9950),a=r(4752),i=r(3310),o=r(1367),s=r(6910),l=r(6038),d=r(4021),c=r(4414);const p=a.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,h=a.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=a.Ay.div`
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
  display: flex;
  gap: 12px;
`,y=a.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: white;\n    color: #374151;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      border-color: #635BFF;\n    }\n  "}
`,g=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,f=a.Ay.div`
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
`,b=a.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,j=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=a.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,F=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 24px;
`,w=a.Ay.div`
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
`,A=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,C=a.Ay.div`
  flex: 1;
`,k=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,E=a.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":default:return"#F3F4F6";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"cancelled":return"#DC2626";default:return"#6B7280"}}};
`,S=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
`,B=a.Ay.div``,P=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
`,$=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,M=a.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
`,z=a.Ay.div`
  margin: 16px 0;
  padding: 12px;
  background: ${e=>"self"===e.model?"#FEF3C7":"#E0F2FE"};
  border-radius: 8px;
  border: 1px solid ${e=>"self"===e.model?"#F59E0B":"#0EA5E9"};
`,R=a.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,D=a.Ay.div`
  font-size: 14px;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
`,T=a.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,U=a.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"warning"===e.variant?"\n    background: transparent;\n    color: #D97706;\n    border-color: #FCD34D;\n    \n    &:hover {\n      background: #FEF3C7;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,O=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,L=a.Ay.div``,N=a.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,I=a.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #374151;
`,J=a.Ay.div`
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
`,_=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`,Y=a.Ay.div`
  margin-bottom: 24px;
`,V=a.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,q=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,G=a.Ay.div`
  margin-bottom: 20px;
`,H=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`,K=a.Ay.select`
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
`,Q=a.Ay.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,W=a.Ay.label`
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
`,X=a.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
`,Z=a.Ay.div`
  padding: 16px;
  border: 2px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.selected?"#F8F9FF":"white"};
  
  &:hover {
    border-color: #635BFF;
  }
`,ee=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin-bottom: 4px;
`,ne=a.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
  margin-bottom: 8px;
`,re=a.Ay.ul`
  font-size: 12px;
  color: #6B7280;
  margin: 0;
  padding-left: 20px;
`,te=a.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,ae=a.Ay.button`
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,ie=()=>{const{user:e}=(0,o.As)(),[n,r]=(0,t.useState)([]),{defaultCurrency:a}=(0,d.i1)(),[ie,oe]=(0,t.useState)("RM");(0,t.useEffect)(()=>{a&&oe(a)},[a]),(0,t.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",t=await fetch(`${s.JR}/api/restaurants/subscriptions/manager/${n}`);if(t.ok){const e=(await t.json()).map(e=>({...e,features:se(e.planType)}));r(e)}else console.error("Failed to fetch subscriptions")}catch(n){console.error("Error fetching subscriptions:",n)}})()},[e]);const se=e=>{switch(e){case"basic":return["Up to 1k Orders/month","Basic Analytics","Community Support"];case"professional":return["Up to 10k Orders/month","Standard Analytics","Email Support","Staff Management"];case"enterprise":return["Unlimited Orders","Advanced Analytics","Priority Support","Custom Branding"];default:return[]}},le=n.filter(e=>"active"===e.status).length,de=n.filter(e=>"manager"===e.paymentModel&&"active"===e.status).reduce((e,n)=>e+("monthly"===n.billingCycle?n.monthlyFee:n.annualFee/12),0),ce=n.filter(e=>"self"===e.paymentModel).length,[pe,he]=(n.filter(e=>"trial"===e.status).length,(0,t.useState)(!1)),[xe,ue]=(0,t.useState)(!1),[me,ye]=(0,t.useState)(null),[ge,fe]=(0,t.useState)([]);(0,t.useEffect)(()=>{console.log("\ud83c\udf7d\ufe0f availableRestaurants state changed:",ge)},[ge]);const[be,je]=(0,t.useState)(""),[ve,Fe]=(0,t.useState)("basic"),[we,Ae]=(0,t.useState)("monthly"),[Ce,ke]=(0,t.useState)("manager");(0,t.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2";console.log("\ud83d\udd0d Fetching available restaurants for manager:",n);const r=await fetch(`${s.JR}/api/restaurants/available/${n}`);if(console.log("\ud83d\udce1 Response status:",r.status),r.ok){const e=await r.json();console.log("\ud83d\udce6 Available restaurants data:",e),fe(e)}else console.error("Failed to fetch available restaurants"),fe([])}catch(n){console.error("Error fetching available restaurants:",n),fe([])}})()},[e]);return(0,c.jsxs)(i.A,{children:[(0,c.jsxs)(p,{children:[(0,c.jsxs)(x,{children:[(0,c.jsx)(u,{children:"Subscriptions"}),(0,c.jsxs)(m,{children:[(0,c.jsx)(y,{variant:"secondary",onClick:()=>{(new Date).toISOString(),null===e||void 0===e||e.name,n.length,n.map(e=>({restaurantName:e.restaurantName,location:e.location,planType:e.planType,status:e.status,paymentModel:e.paymentModel,billingCycle:e.billingCycle,monthlyFee:e.monthlyFee,annualFee:e.annualFee,startDate:e.startDate,nextPayment:e.nextPayment,currentOrders:e.currentOrders,orderLimit:-1===e.orderLimit?"Unlimited":e.orderLimit}));const r=n.map(e=>[e.restaurantName,e.location,e.planType,e.status,e.paymentModel,e.billingCycle,e.monthlyFee,e.annualFee,e.startDate,e.nextPayment,e.currentOrders,-1===e.orderLimit?"Unlimited":e.orderLimit]),t=[["Restaurant","Location","Plan","Status","Payment Model","Billing Cycle","Monthly Fee","Annual Fee","Start Date","Next Payment","Current Orders","Order Limit"].join(","),...r.map(e=>e.join(","))].join("\n"),a=new Blob([t],{type:"text/csv"}),i=URL.createObjectURL(a),o=document.createElement("a");o.href=i,o.download=`subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i),alert("Subscription data exported successfully!")},children:"Export Data"}),(0,c.jsx)(y,{variant:"primary",onClick:()=>he(!0),children:"Add Subscription"})]})]}),(0,c.jsxs)(h,{children:[(0,c.jsxs)(g,{children:[(0,c.jsxs)(f,{color:"#059669",children:[(0,c.jsx)(b,{children:n.length}),(0,c.jsx)(j,{children:"Total Restaurants"}),(0,c.jsx)(v,{positive:!0,children:"Under your management"})]}),(0,c.jsxs)(f,{color:"#2563EB",children:[(0,c.jsx)(b,{children:le}),(0,c.jsx)(j,{children:"Active Subscriptions"}),(0,c.jsxs)(v,{positive:!0,children:[Math.round(le/n.length*100),"% operational"]})]}),(0,c.jsxs)(f,{color:"#7C3AED",children:[(0,c.jsx)(b,{children:(0,l.vv)(de)}),(0,c.jsx)(j,{children:"Your Monthly Payment"}),(0,c.jsx)(v,{positive:!0,children:"Manager-paid restaurants only"})]}),(0,c.jsxs)(f,{color:"#D97706",children:[(0,c.jsx)(b,{children:ce}),(0,c.jsx)(j,{children:"Self-Paying Restaurants"}),(0,c.jsx)(v,{positive:!0,children:"Direct billing to restaurant"})]})]}),(0,c.jsx)(F,{children:n.map(e=>(0,c.jsxs)(w,{children:[(0,c.jsxs)(A,{children:[(0,c.jsx)(C,{children:(0,c.jsx)(k,{children:e.restaurantName})}),(0,c.jsx)(E,{status:e.status,children:e.status})]}),(0,c.jsxs)(S,{children:[(0,c.jsxs)(B,{children:[(0,c.jsx)(P,{children:e.planType}),(0,c.jsx)($,{children:"monthly"===e.billingCycle?"Monthly billing":"Annual billing"})]}),(0,c.jsxs)(M,{children:[(0,l.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee),"annual"===e.billingCycle&&(0,c.jsx)("span",{style:{fontSize:"12px",color:"#6B7280"},children:"/year"})]})]}),(0,c.jsxs)(z,{model:e.paymentModel,children:[(0,c.jsx)(R,{model:e.paymentModel,children:"self"===e.paymentModel?"Self-Paying":"Manager-Paid"}),(0,c.jsx)(D,{model:e.paymentModel,children:"self"===e.paymentModel?"Restaurant pays directly":"You handle payment for this restaurant"})]}),(0,c.jsxs)(O,{children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(N,{children:"Start Date"}),(0,c.jsx)(I,{children:e.startDate})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(N,{children:"Next Payment"}),(0,c.jsx)(I,{children:e.nextPayment})]})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(U,{variant:"primary",onClick:()=>window.open(`/manager/reports?restaurant=${e.restaurantId}`,"_blank"),children:"View Reports"}),(0,c.jsxs)(U,{variant:"warning",onClick:()=>{const t="self"===e.paymentModel?"manager":"self";(async(e,t)=>{const a=e.replace("sub-",""),i="manager"===t?"brand_manager":"restaurant";try{const o=localStorage.getItem("auth_token");if(!(await fetch(`${s.JR}/api/restaurants/${a}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({payment_model:i})})).ok)throw new Error("Failed to update payment model");(await fetch(`${s.JR}/api/invoices/update-payer/${a}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({payment_model:i})})).ok||console.warn("Failed to update invoice payers, but restaurant payment model was updated"),r(n.map(n=>n.id===e?{...n,paymentModel:t,payerId:"manager"===t?n.managerId:n.restaurantId,payerName:"manager"===t?n.managerName:"Restaurant Owner"}:n)),alert(`Payment model switched to ${"manager"===t?"Manager-Pay":"Self-Pay"} successfully!`)}catch(o){console.error("Error switching payment model:",o),alert("Failed to switch payment model. Please try again.")}})(e.id,t)},children:["Switch to ","self"===e.paymentModel?"Manager-Pay":"Self-Pay"]}),(0,c.jsx)(U,{onClick:()=>(e=>{ye(e),Fe(e.planType),ue(!0)})(e),children:"enterprise"===e.planType?"Change Plan":"Upgrade/Downgrade"}),"cancelled"!==e.status&&(0,c.jsx)(U,{variant:"danger",onClick:()=>{return t=e.id,a=e.restaurantName,void(window.confirm(`Are you sure you want to cancel the subscription for ${a}?\n\nThis action will:\n\u2022 End the subscription at the current billing cycle\n\u2022 Disable access to premium features\n\u2022 Cannot be undone`)&&(r(n.map(e=>e.id===t?{...e,status:"cancelled"}:e)),alert("Subscription has been cancelled. The restaurant will maintain access until the end of the current billing period.")));var t,a},children:"Cancel Subscription"})]})]},e.id))})]})]}),(0,c.jsx)(J,{show:pe,children:(0,c.jsxs)(_,{children:[(0,c.jsxs)(Y,{children:[(0,c.jsx)(V,{children:"Add New Subscription"}),(0,c.jsx)(q,{children:"Connect a restaurant to a subscription plan"})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)(H,{children:"Select Restaurant"}),(0,c.jsxs)(K,{value:be,onChange:e=>je(e.target.value),children:[(0,c.jsx)("option",{value:"",children:"Choose a restaurant..."}),ge.map(e=>(0,c.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)(H,{children:"Select Plan"}),(0,c.jsxs)(Q,{children:[(0,c.jsxs)(Z,{selected:"basic"===ve,onClick:()=>Fe("basic"),children:[(0,c.jsx)(ee,{children:"Basic"}),(0,c.jsxs)(ne,{children:[(0,l.vv)(29,ie),"/month"]}),(0,c.jsxs)(re,{children:[(0,c.jsx)("li",{children:"Up to 1,000 orders/month"}),(0,c.jsx)("li",{children:"Basic analytics"}),(0,c.jsx)("li",{children:"5 staff accounts"})]})]}),(0,c.jsxs)(Z,{selected:"professional"===ve,onClick:()=>Fe("professional"),children:[(0,c.jsx)(ee,{children:"Professional"}),(0,c.jsxs)(ne,{children:[(0,l.vv)(99,ie),"/month"]}),(0,c.jsxs)(re,{children:[(0,c.jsx)("li",{children:"Up to 10,000 orders/month"}),(0,c.jsx)("li",{children:"Advanced analytics"}),(0,c.jsx)("li",{children:"Unlimited staff accounts"})]})]}),(0,c.jsxs)(Z,{selected:"enterprise"===ve,onClick:()=>Fe("enterprise"),children:[(0,c.jsx)(ee,{children:"Enterprise"}),(0,c.jsxs)(ne,{children:[(0,l.vv)(199,ie),"/month"]}),(0,c.jsxs)(re,{children:[(0,c.jsx)("li",{children:"Unlimited orders"}),(0,c.jsx)("li",{children:"Custom analytics"}),(0,c.jsx)("li",{children:"Priority support"})]})]})]})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)(H,{children:"Billing Cycle"}),(0,c.jsxs)(Q,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(X,{type:"radio",name:"billing",checked:"monthly"===we,onChange:()=>Ae("monthly")}),"Monthly Billing"]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(X,{type:"radio",name:"billing",checked:"annual"===we,onChange:()=>Ae("annual")}),"Annual Billing (Save 17%)"]})]})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)(H,{children:"Payment Model"}),(0,c.jsxs)(Q,{children:[(0,c.jsxs)(W,{children:[(0,c.jsx)(X,{type:"radio",name:"payment",checked:"manager"===Ce,onChange:()=>ke("manager")}),"Manager Pays (You handle payment)"]}),(0,c.jsxs)(W,{children:[(0,c.jsx)(X,{type:"radio",name:"payment",checked:"self"===Ce,onChange:()=>ke("self")}),"Restaurant Self-Pay"]})]})]}),(0,c.jsxs)(te,{children:[(0,c.jsx)(ae,{variant:"secondary",onClick:()=>he(!1),children:"Cancel"}),(0,c.jsx)(ae,{variant:"primary",onClick:async()=>{if(be)try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",t=await fetch(`${s.JR}/api/restaurants/subscriptions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({restaurantId:be,managerId:n,planType:ve,billingCycle:we,paymentModel:Ce})});if(t.ok){await t.json();const e=await fetch(`${s.JR}/api/restaurants/subscriptions/manager/${n}`);if(e.ok){const n=(await e.json()).map(e=>({...e,features:se(e.planType)}));r(n)}const a=await fetch(`${s.JR}/api/restaurants/available/${n}`);if(a.ok){const e=await a.json();fe(e)}he(!1),je(""),Fe("basic"),Ae("monthly"),ke("manager"),alert("Subscription added successfully!")}else{const e=await t.json();alert(`Failed to add subscription: ${e.error}`)}}catch(n){console.error("Error adding subscription:",n),alert("Error adding subscription. Please try again.")}else alert("Please select a restaurant")},children:"Add Subscription"})]})]})}),(0,c.jsx)(J,{show:xe,children:(0,c.jsxs)(_,{children:[(0,c.jsxs)(Y,{children:[(0,c.jsx)(V,{children:"Change Subscription Plan"}),(0,c.jsxs)(q,{children:[null===me||void 0===me?void 0:me.restaurantName," - Current: ",null===me||void 0===me?void 0:me.planType]})]}),(0,c.jsxs)(G,{children:[(0,c.jsx)(H,{children:"Select New Plan"}),(0,c.jsxs)(Q,{children:[(0,c.jsxs)(Z,{selected:"basic"===ve,onClick:()=>Fe("basic"),children:[(0,c.jsx)(ee,{children:"Basic"}),(0,c.jsxs)(ne,{children:[(0,l.vv)(29,ie),"/month"]}),(0,c.jsxs)(re,{children:[(0,c.jsx)("li",{children:"Up to 1,000 orders/month"}),(0,c.jsx)("li",{children:"Basic analytics"}),(0,c.jsx)("li",{children:"5 staff accounts"})]})]}),(0,c.jsxs)(Z,{selected:"professional"===ve,onClick:()=>Fe("professional"),children:[(0,c.jsx)(ee,{children:"Professional"}),(0,c.jsxs)(ne,{children:[(0,l.vv)(99,ie),"/month"]}),(0,c.jsxs)(re,{children:[(0,c.jsx)("li",{children:"Up to 10,000 orders/month"}),(0,c.jsx)("li",{children:"Advanced analytics"}),(0,c.jsx)("li",{children:"Unlimited staff accounts"})]})]}),(0,c.jsxs)(Z,{selected:"enterprise"===ve,onClick:()=>Fe("enterprise"),children:[(0,c.jsx)(ee,{children:"Enterprise"}),(0,c.jsxs)(ne,{children:[(0,l.vv)(199,ie),"/month"]}),(0,c.jsxs)(re,{children:[(0,c.jsx)("li",{children:"Unlimited orders"}),(0,c.jsx)("li",{children:"Custom analytics"}),(0,c.jsx)("li",{children:"Priority support"})]})]})]})]}),(0,c.jsxs)("div",{style:{padding:"16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,c.jsx)("strong",{style:{color:"#92400E"},children:"Important:"}),(0,c.jsxs)("p",{style:{color:"#92400E",fontSize:"14px",margin:"4px 0 0 0"},children:["Plan changes will take effect from the next billing cycle.",(null===me||void 0===me?void 0:me.planType)===ve&&" (No change selected)"]})]}),(0,c.jsxs)(te,{children:[(0,c.jsx)(ae,{variant:"secondary",onClick:()=>ue(!1),children:"Cancel"}),(0,c.jsx)(ae,{variant:"primary",onClick:()=>{if(!me)return;const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}};r(n.map(n=>n.id===me.id?{...n,planType:ve,monthlyFee:e[ve].monthly,annualFee:e[ve].annual,orderLimit:e[ve].orderLimit,nextPayment:new Date(Date.now()+2592e6).toISOString().split("T")[0]}:n)),ue(!1),ye(null),alert(`Plan updated to ${ve}. Changes will be applied from next billing cycle.`)},disabled:(null===me||void 0===me?void 0:me.planType)===ve,children:"Confirm Change"})]})]})})]})}},4021:(e,n,r)=>{r.d(n,{i1:()=>o});var t=r(9950),a=r(1367),i=r(6038);const o=()=>{const{user:e}=(0,a.As)(),[n,r]=(0,t.useState)("RM"),[o,s]=(0,t.useState)(Object.keys(i.DL)),[l,d]=(0,t.useState)(!0),[c,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),t=n.indexOf("restaurant");let a=t>=0?n[t+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),t=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";r(t)}else r("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),r("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:o,loading:l,error:c}}}}]);