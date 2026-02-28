"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3543],{3543:(e,n,t)=>{t.r(n),t.d(n,{default:()=>ae});var r=t(9950),a=t(4752),i=t(1367),o=t(6910),s=t(6038),l=t(4021),d=t(4414);const c=a.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,p=a.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=a.Ay.div`
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
`,x=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,u=a.Ay.div`
  display: flex;
  gap: 12px;
`,m=a.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: white;\n    color: #374151;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      border-color: #635BFF;\n    }\n  "}
`,y=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,g=a.Ay.div`
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
`,f=a.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,b=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,j=a.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,v=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 24px;
`,F=a.Ay.div`
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
`,w=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,A=a.Ay.div`
  flex: 1;
`,C=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,k=a.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":default:return"#F3F4F6";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"cancelled":return"#DC2626";default:return"#6B7280"}}};
`,E=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
`,S=a.Ay.div``,B=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
`,P=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,$=a.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
`,z=a.Ay.div`
  margin: 16px 0;
  padding: 12px;
  background: ${e=>"self"===e.model?"#FEF3C7":"#E0F2FE"};
  border-radius: 8px;
  border: 1px solid ${e=>"self"===e.model?"#F59E0B":"#0EA5E9"};
`,M=a.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,T=a.Ay.div`
  font-size: 14px;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
`,D=a.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,R=a.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"warning"===e.variant?"\n    background: transparent;\n    color: #D97706;\n    border-color: #FCD34D;\n    \n    &:hover {\n      background: #FEF3C7;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,U=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,O=a.Ay.div``,L=a.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,N=a.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #374151;
`,I=a.Ay.div`
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
`,J=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`,_=a.Ay.div`
  margin-bottom: 24px;
`,Y=a.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,V=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,W=a.Ay.div`
  margin-bottom: 20px;
`,q=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`,G=a.Ay.select`
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
`,H=a.Ay.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,K=a.Ay.label`
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
`,Q=a.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
`,X=a.Ay.div`
  padding: 16px;
  border: 2px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.selected?"#F8F9FF":"white"};
  
  &:hover {
    border-color: #635BFF;
  }
`,Z=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin-bottom: 4px;
`,ee=a.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
  margin-bottom: 8px;
`,ne=a.Ay.ul`
  font-size: 12px;
  color: #6B7280;
  margin: 0;
  padding-left: 20px;
`,te=a.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,re=a.Ay.button`
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,ae=()=>{const{user:e}=(0,i.As)(),[n,t]=(0,r.useState)([]),{defaultCurrency:a}=(0,l.i1)(),[ae,ie]=(0,r.useState)("RM");(0,r.useEffect)(()=>{a&&ie(a)},[a]),(0,r.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",r=await fetch(`${o.JR}/api/restaurants/subscriptions/manager/${n}`);if(r.ok){const e=(await r.json()).map(e=>({...e,features:oe(e.planType)}));t(e)}else console.error("Failed to fetch subscriptions")}catch(n){console.error("Error fetching subscriptions:",n)}})()},[e]);const oe=e=>{switch(e){case"basic":return["Up to 1k Orders/month","Basic Analytics","Community Support"];case"professional":return["Up to 10k Orders/month","Standard Analytics","Email Support","Staff Management"];case"enterprise":return["Unlimited Orders","Advanced Analytics","Priority Support","Custom Branding"];default:return[]}},se=n.filter(e=>"active"===e.status).length,le=n.filter(e=>"manager"===e.paymentModel&&"active"===e.status).reduce((e,n)=>e+("monthly"===n.billingCycle?n.monthlyFee:n.annualFee/12),0),de=n.filter(e=>"self"===e.paymentModel).length,[ce,pe]=(n.filter(e=>"trial"===e.status).length,(0,r.useState)(!1)),[he,xe]=(0,r.useState)(!1),[ue,me]=(0,r.useState)(null),[ye,ge]=(0,r.useState)([]);(0,r.useEffect)(()=>{console.log("\ud83c\udf7d\ufe0f availableRestaurants state changed:",ye)},[ye]);const[fe,be]=(0,r.useState)(""),[je,ve]=(0,r.useState)("basic"),[Fe,we]=(0,r.useState)("monthly"),[Ae,Ce]=(0,r.useState)("manager");(0,r.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2";console.log("\ud83d\udd0d Fetching available restaurants for manager:",n);const t=await fetch(`${o.JR}/api/restaurants/available/${n}`);if(console.log("\ud83d\udce1 Response status:",t.status),t.ok){const e=await t.json();console.log("\ud83d\udce6 Available restaurants data:",e),ge(e)}else console.error("Failed to fetch available restaurants"),ge([])}catch(n){console.error("Error fetching available restaurants:",n),ge([])}})()},[e]);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(c,{children:[(0,d.jsxs)(h,{children:[(0,d.jsx)(x,{children:"Subscriptions"}),(0,d.jsxs)(u,{children:[(0,d.jsx)(m,{variant:"secondary",onClick:()=>{(new Date).toISOString(),null===e||void 0===e||e.name,n.length,n.map(e=>({restaurantName:e.restaurantName,location:e.location,planType:e.planType,status:e.status,paymentModel:e.paymentModel,billingCycle:e.billingCycle,monthlyFee:e.monthlyFee,annualFee:e.annualFee,startDate:e.startDate,nextPayment:e.nextPayment,currentOrders:e.currentOrders,orderLimit:-1===e.orderLimit?"Unlimited":e.orderLimit}));const t=n.map(e=>[e.restaurantName,e.location,e.planType,e.status,e.paymentModel,e.billingCycle,e.monthlyFee,e.annualFee,e.startDate,e.nextPayment,e.currentOrders,-1===e.orderLimit?"Unlimited":e.orderLimit]),r=[["Restaurant","Location","Plan","Status","Payment Model","Billing Cycle","Monthly Fee","Annual Fee","Start Date","Next Payment","Current Orders","Order Limit"].join(","),...t.map(e=>e.join(","))].join("\n"),a=new Blob([r],{type:"text/csv"}),i=URL.createObjectURL(a),o=document.createElement("a");o.href=i,o.download=`subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i),alert("Subscription data exported successfully!")},children:"Export Data"}),(0,d.jsx)(m,{variant:"primary",onClick:()=>pe(!0),children:"Add Subscription"})]})]}),(0,d.jsxs)(p,{children:[(0,d.jsxs)(y,{children:[(0,d.jsxs)(g,{color:"#059669",children:[(0,d.jsx)(f,{children:n.length}),(0,d.jsx)(b,{children:"Total Restaurants"}),(0,d.jsx)(j,{positive:!0,children:"Under your management"})]}),(0,d.jsxs)(g,{color:"#2563EB",children:[(0,d.jsx)(f,{children:se}),(0,d.jsx)(b,{children:"Active Subscriptions"}),(0,d.jsxs)(j,{positive:!0,children:[Math.round(se/n.length*100),"% operational"]})]}),(0,d.jsxs)(g,{color:"#7C3AED",children:[(0,d.jsx)(f,{children:(0,s.vv)(le)}),(0,d.jsx)(b,{children:"Your Monthly Payment"}),(0,d.jsx)(j,{positive:!0,children:"Manager-paid restaurants only"})]}),(0,d.jsxs)(g,{color:"#D97706",children:[(0,d.jsx)(f,{children:de}),(0,d.jsx)(b,{children:"Self-Paying Restaurants"}),(0,d.jsx)(j,{positive:!0,children:"Direct billing to restaurant"})]})]}),(0,d.jsx)(v,{children:n.map(e=>(0,d.jsxs)(F,{children:[(0,d.jsxs)(w,{children:[(0,d.jsx)(A,{children:(0,d.jsx)(C,{children:e.restaurantName})}),(0,d.jsx)(k,{status:e.status,children:e.status})]}),(0,d.jsxs)(E,{children:[(0,d.jsxs)(S,{children:[(0,d.jsx)(B,{children:e.planType}),(0,d.jsx)(P,{children:"monthly"===e.billingCycle?"Monthly billing":"Annual billing"})]}),(0,d.jsxs)($,{children:[e.discountType&&"none"!==e.discountType&&(e.discountValue||0)>0?(0,d.jsxs)("div",{style:{textAlign:"right"},children:[(0,d.jsx)("div",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"12px",fontWeight:400},children:(0,s.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee)}),(0,d.jsx)("div",{style:{color:"#15803D"},children:(0,s.vv)(("monthly"===e.billingCycle?e.monthlyFee:e.annualFee)*("percentage"===e.discountType?1-(e.discountValue||0)/100:1)-("fixed"===e.discountType&&e.discountValue||0))})]}):(0,d.jsx)(d.Fragment,{children:(0,s.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee)}),"annual"===e.billingCycle&&(0,d.jsx)("span",{style:{fontSize:"12px",color:"#6B7280"},children:"/year"})]})]}),(0,d.jsxs)(z,{model:e.paymentModel,children:[(0,d.jsx)(M,{model:e.paymentModel,children:"self"===e.paymentModel?"Self-Paying":"Manager-Paid"}),(0,d.jsx)(T,{model:e.paymentModel,children:"self"===e.paymentModel?"Restaurant pays directly":"You handle payment for this restaurant"})]}),(0,d.jsxs)(U,{children:[(0,d.jsxs)(O,{children:[(0,d.jsx)(L,{children:"Start Date"}),(0,d.jsx)(N,{children:e.startDate})]}),(0,d.jsxs)(O,{children:[(0,d.jsx)(L,{children:"Next Payment"}),(0,d.jsx)(N,{children:e.nextPayment})]})]}),(0,d.jsxs)(D,{children:[(0,d.jsx)(R,{variant:"primary",onClick:()=>window.open(`/manager/reports?restaurant=${e.restaurantId}`,"_blank"),children:"View Reports"}),(0,d.jsxs)(R,{variant:"warning",onClick:()=>{const r="self"===e.paymentModel?"manager":"self";(async(e,r)=>{const a=e.replace("sub-",""),i="manager"===r?"brand_manager":"restaurant";try{const s=localStorage.getItem("auth_token");if(!(await fetch(`${o.JR}/api/restaurants/${a}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({payment_model:i})})).ok)throw new Error("Failed to update payment model");(await fetch(`${o.JR}/api/invoices/update-payer/${a}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({payment_model:i})})).ok||console.warn("Failed to update invoice payers, but restaurant payment model was updated"),t(n.map(n=>n.id===e?{...n,paymentModel:r,payerId:"manager"===r?n.managerId:n.restaurantId,payerName:"manager"===r?n.managerName:"Restaurant Owner"}:n)),alert(`Payment model switched to ${"manager"===r?"Manager-Pay":"Self-Pay"} successfully!`)}catch(s){console.error("Error switching payment model:",s),alert("Failed to switch payment model. Please try again.")}})(e.id,r)},children:["Switch to ","self"===e.paymentModel?"Manager-Pay":"Self-Pay"]}),(0,d.jsx)(R,{onClick:()=>(e=>{me(e),ve(e.planType),xe(!0)})(e),children:"enterprise"===e.planType?"Change Plan":"Upgrade/Downgrade"}),"cancelled"!==e.status&&(0,d.jsx)(R,{variant:"danger",onClick:()=>{return r=e.id,a=e.restaurantName,void(window.confirm(`Are you sure you want to cancel the subscription for ${a}?\n\nThis action will:\n\u2022 End the subscription at the current billing cycle\n\u2022 Disable access to premium features\n\u2022 Cannot be undone`)&&(t(n.map(e=>e.id===r?{...e,status:"cancelled"}:e)),alert("Subscription has been cancelled. The restaurant will maintain access until the end of the current billing period.")));var r,a},children:"Cancel Subscription"})]})]},e.id))})]})]}),(0,d.jsx)(I,{show:ce,children:(0,d.jsxs)(J,{children:[(0,d.jsxs)(_,{children:[(0,d.jsx)(Y,{children:"Add New Subscription"}),(0,d.jsx)(V,{children:"Connect a restaurant to a subscription plan"})]}),(0,d.jsxs)(W,{children:[(0,d.jsx)(q,{children:"Select Restaurant"}),(0,d.jsxs)(G,{value:fe,onChange:e=>be(e.target.value),children:[(0,d.jsx)("option",{value:"",children:"Choose a restaurant..."}),ye.map(e=>(0,d.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]})]}),(0,d.jsxs)(W,{children:[(0,d.jsx)(q,{children:"Select Plan"}),(0,d.jsxs)(H,{children:[(0,d.jsxs)(X,{selected:"basic"===je,onClick:()=>ve("basic"),children:[(0,d.jsx)(Z,{children:"Basic"}),(0,d.jsxs)(ee,{children:[(0,s.vv)(29,ae),"/month"]}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("li",{children:"Up to 1,000 orders/month"}),(0,d.jsx)("li",{children:"Basic analytics"}),(0,d.jsx)("li",{children:"5 staff accounts"})]})]}),(0,d.jsxs)(X,{selected:"professional"===je,onClick:()=>ve("professional"),children:[(0,d.jsx)(Z,{children:"Professional"}),(0,d.jsxs)(ee,{children:[(0,s.vv)(99,ae),"/month"]}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("li",{children:"Up to 10,000 orders/month"}),(0,d.jsx)("li",{children:"Advanced analytics"}),(0,d.jsx)("li",{children:"Unlimited staff accounts"})]})]}),(0,d.jsxs)(X,{selected:"enterprise"===je,onClick:()=>ve("enterprise"),children:[(0,d.jsx)(Z,{children:"Enterprise"}),(0,d.jsxs)(ee,{children:[(0,s.vv)(199,ae),"/month"]}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("li",{children:"Unlimited orders"}),(0,d.jsx)("li",{children:"Custom analytics"}),(0,d.jsx)("li",{children:"Priority support"})]})]})]})]}),(0,d.jsxs)(W,{children:[(0,d.jsx)(q,{children:"Billing Cycle"}),(0,d.jsxs)(H,{children:[(0,d.jsxs)(K,{children:[(0,d.jsx)(Q,{type:"radio",name:"billing",checked:"monthly"===Fe,onChange:()=>we("monthly")}),"Monthly Billing"]}),(0,d.jsxs)(K,{children:[(0,d.jsx)(Q,{type:"radio",name:"billing",checked:"annual"===Fe,onChange:()=>we("annual")}),"Annual Billing (Save 17%)"]})]})]}),(0,d.jsxs)(W,{children:[(0,d.jsx)(q,{children:"Payment Model"}),(0,d.jsxs)(H,{children:[(0,d.jsxs)(K,{children:[(0,d.jsx)(Q,{type:"radio",name:"payment",checked:"manager"===Ae,onChange:()=>Ce("manager")}),"Manager Pays (You handle payment)"]}),(0,d.jsxs)(K,{children:[(0,d.jsx)(Q,{type:"radio",name:"payment",checked:"self"===Ae,onChange:()=>Ce("self")}),"Restaurant Self-Pay"]})]})]}),(0,d.jsxs)(te,{children:[(0,d.jsx)(re,{variant:"secondary",onClick:()=>pe(!1),children:"Cancel"}),(0,d.jsx)(re,{variant:"primary",onClick:async()=>{if(fe)try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",r=await fetch(`${o.JR}/api/restaurants/subscriptions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({restaurantId:fe,managerId:n,planType:je,billingCycle:Fe,paymentModel:Ae})});if(r.ok){await r.json();const e=await fetch(`${o.JR}/api/restaurants/subscriptions/manager/${n}`);if(e.ok){const n=(await e.json()).map(e=>({...e,features:oe(e.planType)}));t(n)}const a=await fetch(`${o.JR}/api/restaurants/available/${n}`);if(a.ok){const e=await a.json();ge(e)}pe(!1),be(""),ve("basic"),we("monthly"),Ce("manager"),alert("Subscription added successfully!")}else{const e=await r.json();alert(`Failed to add subscription: ${e.error}`)}}catch(n){console.error("Error adding subscription:",n),alert("Error adding subscription. Please try again.")}else alert("Please select a restaurant")},children:"Add Subscription"})]})]})}),(0,d.jsx)(I,{show:he,children:(0,d.jsxs)(J,{children:[(0,d.jsxs)(_,{children:[(0,d.jsx)(Y,{children:"Change Subscription Plan"}),(0,d.jsxs)(V,{children:[null===ue||void 0===ue?void 0:ue.restaurantName," - Current: ",null===ue||void 0===ue?void 0:ue.planType]})]}),(0,d.jsxs)(W,{children:[(0,d.jsx)(q,{children:"Select New Plan"}),(0,d.jsxs)(H,{children:[(0,d.jsxs)(X,{selected:"basic"===je,onClick:()=>ve("basic"),children:[(0,d.jsx)(Z,{children:"Basic"}),(0,d.jsxs)(ee,{children:[(0,s.vv)(29,ae),"/month"]}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("li",{children:"Up to 1,000 orders/month"}),(0,d.jsx)("li",{children:"Basic analytics"}),(0,d.jsx)("li",{children:"5 staff accounts"})]})]}),(0,d.jsxs)(X,{selected:"professional"===je,onClick:()=>ve("professional"),children:[(0,d.jsx)(Z,{children:"Professional"}),(0,d.jsxs)(ee,{children:[(0,s.vv)(99,ae),"/month"]}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("li",{children:"Up to 10,000 orders/month"}),(0,d.jsx)("li",{children:"Advanced analytics"}),(0,d.jsx)("li",{children:"Unlimited staff accounts"})]})]}),(0,d.jsxs)(X,{selected:"enterprise"===je,onClick:()=>ve("enterprise"),children:[(0,d.jsx)(Z,{children:"Enterprise"}),(0,d.jsxs)(ee,{children:[(0,s.vv)(199,ae),"/month"]}),(0,d.jsxs)(ne,{children:[(0,d.jsx)("li",{children:"Unlimited orders"}),(0,d.jsx)("li",{children:"Custom analytics"}),(0,d.jsx)("li",{children:"Priority support"})]})]})]})]}),(0,d.jsxs)("div",{style:{padding:"16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,d.jsx)("strong",{style:{color:"#92400E"},children:"Important:"}),(0,d.jsxs)("p",{style:{color:"#92400E",fontSize:"14px",margin:"4px 0 0 0"},children:["Plan changes will take effect from the next billing cycle.",(null===ue||void 0===ue?void 0:ue.planType)===je&&" (No change selected)"]})]}),(0,d.jsxs)(te,{children:[(0,d.jsx)(re,{variant:"secondary",onClick:()=>xe(!1),children:"Cancel"}),(0,d.jsx)(re,{variant:"primary",onClick:()=>{if(!ue)return;const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}};t(n.map(n=>n.id===ue.id?{...n,planType:je,monthlyFee:e[je].monthly,annualFee:e[je].annual,orderLimit:e[je].orderLimit,nextPayment:new Date(Date.now()+2592e6).toISOString().split("T")[0]}:n)),xe(!1),me(null),alert(`Plan updated to ${je}. Changes will be applied from next billing cycle.`)},disabled:(null===ue||void 0===ue?void 0:ue.planType)===je,children:"Confirm Change"})]})]})})]})}},4021:(e,n,t)=>{t.d(n,{i1:()=>o});var r=t(9950),a=t(1367),i=t(6038);const o=()=>{const{user:e}=(0,a.As)(),[n,t]=(0,r.useState)("RM"),[o,s]=(0,r.useState)(Object.keys(i.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let a=r>=0?n[r+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";t(r)}else t("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),p("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:o,loading:l,error:c}}}}]);