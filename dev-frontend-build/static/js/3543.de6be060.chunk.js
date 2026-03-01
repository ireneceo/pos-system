"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3543],{3543:(e,n,r)=>{r.r(n),r.d(n,{default:()=>Z});var t=r(8819),a=r(9950),i=r(4752),o=r(1367),s=r(6910),l=r(6038),d=r(4021),c=r(2674),p=r(4414);const h=i.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,u=i.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,x=i.Ay.div`
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
`,m=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,y=i.Ay.div`
  display: flex;
  gap: 12px;
`,g=i.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?`\n    background: ${t.w.colors.primary};\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  `:`\n    background: white;\n    color: #374151;\n    border: 1px solid ${t.w.colors.border};\n    \n    &:hover {\n      background: #F8FAFC;\n      border-color: #635BFF;\n    }\n  `}
`,f=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,b=i.Ay.div`
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
`,j=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,v=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=i.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,w=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 24px;
`,A=i.Ay.div`
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
`,C=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,k=i.Ay.div`
  flex: 1;
`,E=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,S=i.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":default:return"#F3F4F6";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"cancelled":return"#DC2626";default:return"#6B7280"}}};
`,$=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
`,B=i.Ay.div``,P=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
`,M=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,R=i.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
`,z=i.Ay.div`
  margin: 16px 0;
  padding: 12px;
  background: ${e=>"self"===e.model?"#FEF3C7":"#E0F2FE"};
  border-radius: 8px;
  border: 1px solid ${e=>"self"===e.model?"#F59E0B":"#0EA5E9"};
`,T=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,D=i.Ay.div`
  font-size: 14px;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
`,U=i.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,O=i.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?`\n    background: ${t.w.colors.primary};\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  `:"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"warning"===e.variant?"\n    background: transparent;\n    color: #D97706;\n    border-color: #FCD34D;\n    \n    &:hover {\n      background: #FEF3C7;\n    }\n  ":`\n    background: transparent;\n    color: ${t.w.colors.text.muted};\n    border-color: ${t.w.colors.border};\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  `}
`,L=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,N=i.Ay.div``,I=i.Ay.div`
  font-size: 11px;
  color: ${t.w.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,J=i.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: ${t.w.colors.text.dark};
`,_=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,Y=i.Ay.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${t.w.colors.border};
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
    border-color: ${t.w.colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`,V=i.Ay.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,H=i.Ay.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${t.w.colors.primary};
    background: #F8F9FF;
  }
  
  input:checked + & {
    border-color: ${t.w.colors.primary};
    background: #F8F9FF;
  }
`,Q=i.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
`,W=i.Ay.div`
  padding: 16px;
  border: 2px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.selected?"#F8F9FF":"white"};
  
  &:hover {
    border-color: #635BFF;
  }
`,q=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin-bottom: 4px;
`,G=i.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
  margin-bottom: 8px;
`,K=i.Ay.ul`
  font-size: 12px;
  color: #6B7280;
  margin: 0;
  padding-left: 20px;
`,X=i.Ay.button`
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,Z=()=>{const{user:e}=(0,o.As)(),[n,r]=(0,a.useState)([]),{defaultCurrency:t}=(0,d.i1)(),[i,Z]=(0,a.useState)("RM");(0,a.useEffect)(()=>{t&&Z(t)},[t]),(0,a.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",t=await fetch(`${s.JR}/api/restaurants/subscriptions/manager/${n}`);if(t.ok){const e=(await t.json()).map(e=>({...e,features:ee(e.planType)}));r(e)}else console.error("Failed to fetch subscriptions")}catch(n){console.error("Error fetching subscriptions:",n)}})()},[e]);const ee=e=>{switch(e){case"basic":return["Up to 1k Orders/month","Basic Analytics","Community Support"];case"professional":return["Up to 10k Orders/month","Standard Analytics","Email Support","Staff Management"];case"enterprise":return["Unlimited Orders","Advanced Analytics","Priority Support","Custom Branding"];default:return[]}},ne=n.filter(e=>"active"===e.status).length,re=n.filter(e=>"manager"===e.paymentModel&&"active"===e.status).reduce((e,n)=>e+("monthly"===n.billingCycle?n.monthlyFee:n.annualFee/12),0),te=n.filter(e=>"self"===e.paymentModel).length,[ae,ie]=(n.filter(e=>"trial"===e.status).length,(0,a.useState)(!1)),[oe,se]=(0,a.useState)(!1),[le,de]=(0,a.useState)(null),[ce,pe]=(0,a.useState)([]);(0,a.useEffect)(()=>{console.log("\ud83c\udf7d\ufe0f availableRestaurants state changed:",ce)},[ce]);const[he,ue]=(0,a.useState)(""),[xe,me]=(0,a.useState)("basic"),[ye,ge]=(0,a.useState)("monthly"),[fe,be]=(0,a.useState)("manager");(0,a.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2";console.log("\ud83d\udd0d Fetching available restaurants for manager:",n);const r=await fetch(`${s.JR}/api/restaurants/available/${n}`);if(console.log("\ud83d\udce1 Response status:",r.status),r.ok){const e=await r.json();console.log("\ud83d\udce6 Available restaurants data:",e),pe(e)}else console.error("Failed to fetch available restaurants"),pe([])}catch(n){console.error("Error fetching available restaurants:",n),pe([])}})()},[e]);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(h,{children:[(0,p.jsxs)(x,{children:[(0,p.jsx)(m,{children:"Subscriptions"}),(0,p.jsxs)(y,{children:[(0,p.jsx)(g,{variant:"secondary",onClick:()=>{(new Date).toISOString(),null===e||void 0===e||e.name,n.length,n.map(e=>({restaurantName:e.restaurantName,location:e.location,planType:e.planType,status:e.status,paymentModel:e.paymentModel,billingCycle:e.billingCycle,monthlyFee:e.monthlyFee,annualFee:e.annualFee,startDate:e.startDate,nextPayment:e.nextPayment,currentOrders:e.currentOrders,orderLimit:-1===e.orderLimit?"Unlimited":e.orderLimit}));const r=n.map(e=>[e.restaurantName,e.location,e.planType,e.status,e.paymentModel,e.billingCycle,e.monthlyFee,e.annualFee,e.startDate,e.nextPayment,e.currentOrders,-1===e.orderLimit?"Unlimited":e.orderLimit]),t=[["Restaurant","Location","Plan","Status","Payment Model","Billing Cycle","Monthly Fee","Annual Fee","Start Date","Next Payment","Current Orders","Order Limit"].join(","),...r.map(e=>e.join(","))].join("\n"),a=new Blob([t],{type:"text/csv"}),i=URL.createObjectURL(a),o=document.createElement("a");o.href=i,o.download=`subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i),alert("Subscription data exported successfully!")},children:"Export Data"}),(0,p.jsx)(g,{variant:"primary",onClick:()=>ie(!0),children:"Add Subscription"})]})]}),(0,p.jsxs)(u,{children:[(0,p.jsxs)(f,{children:[(0,p.jsxs)(b,{color:"#059669",children:[(0,p.jsx)(j,{children:n.length}),(0,p.jsx)(v,{children:"Total Restaurants"}),(0,p.jsx)(F,{positive:!0,children:"Under your management"})]}),(0,p.jsxs)(b,{color:"#2563EB",children:[(0,p.jsx)(j,{children:ne}),(0,p.jsx)(v,{children:"Active Subscriptions"}),(0,p.jsxs)(F,{positive:!0,children:[Math.round(ne/n.length*100),"% operational"]})]}),(0,p.jsxs)(b,{color:"#7C3AED",children:[(0,p.jsx)(j,{children:(0,l.vv)(re)}),(0,p.jsx)(v,{children:"Your Monthly Payment"}),(0,p.jsx)(F,{positive:!0,children:"Manager-paid restaurants only"})]}),(0,p.jsxs)(b,{color:"#D97706",children:[(0,p.jsx)(j,{children:te}),(0,p.jsx)(v,{children:"Self-Paying Restaurants"}),(0,p.jsx)(F,{positive:!0,children:"Direct billing to restaurant"})]})]}),(0,p.jsx)(w,{children:n.map(e=>(0,p.jsxs)(A,{children:[(0,p.jsxs)(C,{children:[(0,p.jsx)(k,{children:(0,p.jsx)(E,{children:e.restaurantName})}),(0,p.jsx)(S,{status:e.status,children:e.status})]}),(0,p.jsxs)($,{children:[(0,p.jsxs)(B,{children:[(0,p.jsx)(P,{children:e.planType}),(0,p.jsx)(M,{children:"monthly"===e.billingCycle?"Monthly billing":"Annual billing"})]}),(0,p.jsxs)(R,{children:[e.discountType&&"none"!==e.discountType&&(e.discountValue||0)>0?(0,p.jsxs)("div",{style:{textAlign:"right"},children:[(0,p.jsx)("div",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"12px",fontWeight:400},children:(0,l.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee)}),(0,p.jsx)("div",{style:{color:"#15803D"},children:(0,l.vv)(("monthly"===e.billingCycle?e.monthlyFee:e.annualFee)*("percentage"===e.discountType?1-(e.discountValue||0)/100:1)-("fixed"===e.discountType&&e.discountValue||0))})]}):(0,p.jsx)(p.Fragment,{children:(0,l.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee)}),"annual"===e.billingCycle&&(0,p.jsx)("span",{style:{fontSize:"12px",color:"#6B7280"},children:"/year"})]})]}),(0,p.jsxs)(z,{model:e.paymentModel,children:[(0,p.jsx)(T,{model:e.paymentModel,children:"self"===e.paymentModel?"Self-Paying":"Manager-Paid"}),(0,p.jsx)(D,{model:e.paymentModel,children:"self"===e.paymentModel?"Restaurant pays directly":"You handle payment for this restaurant"})]}),(0,p.jsxs)(L,{children:[(0,p.jsxs)(N,{children:[(0,p.jsx)(I,{children:"Start Date"}),(0,p.jsx)(J,{children:e.startDate})]}),(0,p.jsxs)(N,{children:[(0,p.jsx)(I,{children:"Next Payment"}),(0,p.jsx)(J,{children:e.nextPayment})]})]}),(0,p.jsxs)(U,{children:[(0,p.jsx)(O,{variant:"primary",onClick:()=>window.open(`/manager/reports?restaurant=${e.restaurantId}`,"_blank"),children:"View Reports"}),(0,p.jsxs)(O,{variant:"warning",onClick:()=>{const t="self"===e.paymentModel?"manager":"self";(async(e,t)=>{const a=e.replace("sub-",""),i="manager"===t?"brand_manager":"restaurant";try{const o=localStorage.getItem("auth_token");if(!(await fetch(`${s.JR}/api/restaurants/${a}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({payment_model:i})})).ok)throw new Error("Failed to update payment model");(await fetch(`${s.JR}/api/invoices/update-payer/${a}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({payment_model:i})})).ok||console.warn("Failed to update invoice payers, but restaurant payment model was updated"),r(n.map(n=>n.id===e?{...n,paymentModel:t,payerId:"manager"===t?n.managerId:n.restaurantId,payerName:"manager"===t?n.managerName:"Restaurant Owner"}:n)),alert(`Payment model switched to ${"manager"===t?"Manager-Pay":"Self-Pay"} successfully!`)}catch(o){console.error("Error switching payment model:",o),alert("Failed to switch payment model. Please try again.")}})(e.id,t)},children:["Switch to ","self"===e.paymentModel?"Manager-Pay":"Self-Pay"]}),(0,p.jsx)(O,{onClick:()=>(e=>{de(e),me(e.planType),se(!0)})(e),children:"enterprise"===e.planType?"Change Plan":"Upgrade/Downgrade"}),"cancelled"!==e.status&&(0,p.jsx)(O,{variant:"danger",onClick:()=>{return t=e.id,a=e.restaurantName,void(window.confirm(`Are you sure you want to cancel the subscription for ${a}?\n\nThis action will:\n\u2022 End the subscription at the current billing cycle\n\u2022 Disable access to premium features\n\u2022 Cannot be undone`)&&(r(n.map(e=>e.id===t?{...e,status:"cancelled"}:e)),alert("Subscription has been cancelled. The restaurant will maintain access until the end of the current billing period.")));var t,a},children:"Cancel Subscription"})]})]},e.id))})]})]}),(0,p.jsx)(c.mH,{show:ae,children:(0,p.jsxs)(c.$m,{children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:"Add New Subscription"}),(0,p.jsx)(_,{children:"Connect a restaurant to a subscription plan"})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Select Restaurant"}),(0,p.jsxs)(Y,{value:he,onChange:e=>ue(e.target.value),children:[(0,p.jsx)("option",{value:"",children:"Choose a restaurant..."}),ce.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Select Plan"}),(0,p.jsxs)(V,{children:[(0,p.jsxs)(W,{selected:"basic"===xe,onClick:()=>me("basic"),children:[(0,p.jsx)(q,{children:"Basic"}),(0,p.jsxs)(G,{children:[(0,l.vv)(29,i),"/month"]}),(0,p.jsxs)(K,{children:[(0,p.jsx)("li",{children:"Up to 1,000 orders/month"}),(0,p.jsx)("li",{children:"Basic analytics"}),(0,p.jsx)("li",{children:"5 staff accounts"})]})]}),(0,p.jsxs)(W,{selected:"professional"===xe,onClick:()=>me("professional"),children:[(0,p.jsx)(q,{children:"Professional"}),(0,p.jsxs)(G,{children:[(0,l.vv)(99,i),"/month"]}),(0,p.jsxs)(K,{children:[(0,p.jsx)("li",{children:"Up to 10,000 orders/month"}),(0,p.jsx)("li",{children:"Advanced analytics"}),(0,p.jsx)("li",{children:"Unlimited staff accounts"})]})]}),(0,p.jsxs)(W,{selected:"enterprise"===xe,onClick:()=>me("enterprise"),children:[(0,p.jsx)(q,{children:"Enterprise"}),(0,p.jsxs)(G,{children:[(0,l.vv)(199,i),"/month"]}),(0,p.jsxs)(K,{children:[(0,p.jsx)("li",{children:"Unlimited orders"}),(0,p.jsx)("li",{children:"Custom analytics"}),(0,p.jsx)("li",{children:"Priority support"})]})]})]})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Billing Cycle"}),(0,p.jsxs)(V,{children:[(0,p.jsxs)(H,{children:[(0,p.jsx)(Q,{type:"radio",name:"billing",checked:"monthly"===ye,onChange:()=>ge("monthly")}),"Monthly Billing"]}),(0,p.jsxs)(H,{children:[(0,p.jsx)(Q,{type:"radio",name:"billing",checked:"annual"===ye,onChange:()=>ge("annual")}),"Annual Billing (Save 17%)"]})]})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Payment Model"}),(0,p.jsxs)(V,{children:[(0,p.jsxs)(H,{children:[(0,p.jsx)(Q,{type:"radio",name:"payment",checked:"manager"===fe,onChange:()=>be("manager")}),"Manager Pays (You handle payment)"]}),(0,p.jsxs)(H,{children:[(0,p.jsx)(Q,{type:"radio",name:"payment",checked:"self"===fe,onChange:()=>be("self")}),"Restaurant Self-Pay"]})]})]}),(0,p.jsxs)(c.jl,{children:[(0,p.jsx)(X,{variant:"secondary",onClick:()=>ie(!1),children:"Cancel"}),(0,p.jsx)(X,{variant:"primary",onClick:async()=>{if(he)try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",t=await fetch(`${s.JR}/api/restaurants/subscriptions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({restaurantId:he,managerId:n,planType:xe,billingCycle:ye,paymentModel:fe})});if(t.ok){await t.json();const e=await fetch(`${s.JR}/api/restaurants/subscriptions/manager/${n}`);if(e.ok){const n=(await e.json()).map(e=>({...e,features:ee(e.planType)}));r(n)}const a=await fetch(`${s.JR}/api/restaurants/available/${n}`);if(a.ok){const e=await a.json();pe(e)}ie(!1),ue(""),me("basic"),ge("monthly"),be("manager"),alert("Subscription added successfully!")}else{const e=await t.json();alert(`Failed to add subscription: ${e.error}`)}}catch(n){console.error("Error adding subscription:",n),alert("Error adding subscription. Please try again.")}else alert("Please select a restaurant")},children:"Add Subscription"})]})]})}),(0,p.jsx)(c.mH,{show:oe,children:(0,p.jsxs)(c.$m,{children:[(0,p.jsxs)(c.rQ,{children:[(0,p.jsx)(c.wt,{children:"Change Subscription Plan"}),(0,p.jsxs)(_,{children:[null===le||void 0===le?void 0:le.restaurantName," - Current: ",null===le||void 0===le?void 0:le.planType]})]}),(0,p.jsxs)(c.gE,{children:[(0,p.jsx)(c.lR,{children:"Select New Plan"}),(0,p.jsxs)(V,{children:[(0,p.jsxs)(W,{selected:"basic"===xe,onClick:()=>me("basic"),children:[(0,p.jsx)(q,{children:"Basic"}),(0,p.jsxs)(G,{children:[(0,l.vv)(29,i),"/month"]}),(0,p.jsxs)(K,{children:[(0,p.jsx)("li",{children:"Up to 1,000 orders/month"}),(0,p.jsx)("li",{children:"Basic analytics"}),(0,p.jsx)("li",{children:"5 staff accounts"})]})]}),(0,p.jsxs)(W,{selected:"professional"===xe,onClick:()=>me("professional"),children:[(0,p.jsx)(q,{children:"Professional"}),(0,p.jsxs)(G,{children:[(0,l.vv)(99,i),"/month"]}),(0,p.jsxs)(K,{children:[(0,p.jsx)("li",{children:"Up to 10,000 orders/month"}),(0,p.jsx)("li",{children:"Advanced analytics"}),(0,p.jsx)("li",{children:"Unlimited staff accounts"})]})]}),(0,p.jsxs)(W,{selected:"enterprise"===xe,onClick:()=>me("enterprise"),children:[(0,p.jsx)(q,{children:"Enterprise"}),(0,p.jsxs)(G,{children:[(0,l.vv)(199,i),"/month"]}),(0,p.jsxs)(K,{children:[(0,p.jsx)("li",{children:"Unlimited orders"}),(0,p.jsx)("li",{children:"Custom analytics"}),(0,p.jsx)("li",{children:"Priority support"})]})]})]})]}),(0,p.jsxs)("div",{style:{padding:"16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,p.jsx)("strong",{style:{color:"#92400E"},children:"Important:"}),(0,p.jsxs)("p",{style:{color:"#92400E",fontSize:"14px",margin:"4px 0 0 0"},children:["Plan changes will take effect from the next billing cycle.",(null===le||void 0===le?void 0:le.planType)===xe&&" (No change selected)"]})]}),(0,p.jsxs)(c.jl,{children:[(0,p.jsx)(X,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,p.jsx)(X,{variant:"primary",onClick:()=>{if(!le)return;const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}};r(n.map(n=>n.id===le.id?{...n,planType:xe,monthlyFee:e[xe].monthly,annualFee:e[xe].annual,orderLimit:e[xe].orderLimit,nextPayment:new Date(Date.now()+2592e6).toISOString().split("T")[0]}:n)),se(!1),de(null),alert(`Plan updated to ${xe}. Changes will be applied from next billing cycle.`)},disabled:(null===le||void 0===le?void 0:le.planType)===xe,children:"Confirm Change"})]})]})})]})}},4021:(e,n,r)=>{r.d(n,{i1:()=>o});var t=r(9950),a=r(1367),i=r(6038);const o=()=>{const{user:e}=(0,a.As)(),[n,r]=(0,t.useState)("RM"),[o,s]=(0,t.useState)(Object.keys(i.DL)),[l,d]=(0,t.useState)(!0),[c,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),t=n.indexOf("restaurant");let a=t>=0?n[t+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return r("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),t=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";r(t)}else r("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),r("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:o,loading:l,error:c}}}}]);