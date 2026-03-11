"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3543],{3543:(e,n,t)=>{t.r(n),t.d(n,{default:()=>ee});var r=t(9950),a=t(4752),i=t(8409),o=t(1367),s=t(6910),l=t(6038),d=t(4021),c=t(7617),p=t(4414);const x=a.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,h=a.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,u=a.Ay.div`
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
`,m=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,g=a.Ay.div`
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
`,f=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,b=a.Ay.div`
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
`,j=a.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,v=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=a.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,C=a.Ay.div`
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
`,k=a.Ay.div`
  flex: 1;
`,E=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,S=a.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":default:return"#F3F4F6";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"cancelled":return"#DC2626";default:return"#6B7280"}}};
`,B=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
`,z=a.Ay.div``,$=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
`,P=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,T=a.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
`,D=a.Ay.div`
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
`,R=a.Ay.div`
  font-size: 14px;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
`,O=a.Ay.div`
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
`,L=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,I=a.Ay.div``,N=a.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,_=a.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #374151;
`,J=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,Y=a.Ay.div`
  margin-bottom: 20px;
`,V=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`,W=a.Ay.select`
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
`,q=a.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
`,G=a.Ay.div`
  padding: 16px;
  border: 2px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.selected?"#F8F9FF":"white"};
  
  &:hover {
    border-color: #635BFF;
  }
`,Q=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin-bottom: 4px;
`,X=a.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
  margin-bottom: 8px;
`,Z=a.Ay.ul`
  font-size: 12px;
  color: #6B7280;
  margin: 0;
  padding-left: 20px;
`,ee=()=>{const{user:e}=(0,o.As)(),[n,t]=(0,r.useState)([]),{defaultCurrency:a}=(0,d.i1)(),[ee,ne]=(0,r.useState)("RM");(0,r.useEffect)(()=>{a&&ne(a)},[a]),(0,r.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",r=await fetch(`${s.JR}/api/restaurants/subscriptions/manager/${n}`);if(r.ok){const e=(await r.json()).map(e=>({...e,features:te(e.planType)}));t(e)}else console.error("Failed to fetch subscriptions")}catch(n){console.error("Error fetching subscriptions:",n)}})()},[e]);const te=e=>{switch(e){case"basic":return["Up to 1k Orders/month","Basic Analytics","Community Support"];case"professional":return["Up to 10k Orders/month","Standard Analytics","Email Support","Staff Management"];case"enterprise":return["Unlimited Orders","Advanced Analytics","Priority Support","Custom Branding"];default:return[]}},re=n.filter(e=>"active"===e.status).length,ae=n.filter(e=>"manager"===e.paymentModel&&"active"===e.status).reduce((e,n)=>e+("monthly"===n.billingCycle?n.monthlyFee:n.annualFee/12),0),ie=n.filter(e=>"self"===e.paymentModel).length,[oe,se]=(n.filter(e=>"trial"===e.status).length,(0,r.useState)(!1)),[le,de]=(0,r.useState)(!1),[ce,pe]=(0,r.useState)(null),[xe,he]=(0,r.useState)([]);(0,r.useEffect)(()=>{console.log("\ud83c\udf7d\ufe0f availableRestaurants state changed:",xe)},[xe]);const[ue,me]=(0,r.useState)(""),[ge,ye]=(0,r.useState)("basic"),[fe,be]=(0,r.useState)("monthly"),[je,ve]=(0,r.useState)([]),[Fe,Ce]=(0,r.useState)("manager"),[we,Ae]=(0,r.useState)(!1),[ke,Ee]=(0,r.useState)(""),[Se,Be]=(0,r.useState)(""),[ze,$e]=(0,r.useState)("");(0,r.useEffect)(()=>{e&&((async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2";console.log("\ud83d\udd0d Fetching available restaurants for manager:",n);const t=await fetch(`${s.JR}/api/restaurants/available/${n}`);if(console.log("\ud83d\udce1 Response status:",t.status),t.ok){const e=await t.json();console.log("\ud83d\udce6 Available restaurants data:",e),he(e)}else console.error("Failed to fetch available restaurants"),he([])}catch(n){console.error("Error fetching available restaurants:",n),he([])}})(),(async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);ve(n)}}catch(e){console.error("Error fetching plans:",e)}})())},[e]);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(x,{children:[(0,p.jsxs)(u,{children:[(0,p.jsx)(m,{children:"Subscriptions"}),(0,p.jsxs)(g,{children:[(0,p.jsx)(y,{variant:"secondary",onClick:()=>{(new Date).toISOString(),null===e||void 0===e||e.name,n.length,n.map(e=>({restaurantName:e.restaurantName,location:e.location,planType:e.planType,status:e.status,paymentModel:e.paymentModel,billingCycle:e.billingCycle,monthlyFee:e.monthlyFee,annualFee:e.annualFee,startDate:e.startDate,nextPayment:e.nextPayment,currentOrders:e.currentOrders,orderLimit:-1===e.orderLimit?"Unlimited":e.orderLimit}));const t=n.map(e=>[e.restaurantName,e.location,e.planType,e.status,e.paymentModel,e.billingCycle,e.monthlyFee,e.annualFee,e.startDate,e.nextPayment,e.currentOrders,-1===e.orderLimit?"Unlimited":e.orderLimit]),r=[["Restaurant","Location","Plan","Status","Payment Model","Billing Cycle","Monthly Fee","Annual Fee","Start Date","Next Payment","Current Orders","Order Limit"].join(","),...t.map(e=>e.join(","))].join("\n"),a=new Blob([r],{type:"text/csv"}),i=URL.createObjectURL(a),o=document.createElement("a");o.href=i,o.download=`subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},children:"Export Data"}),(0,p.jsx)(y,{variant:"primary",onClick:()=>se(!0),children:"Add Subscription"})]})]}),(0,p.jsxs)(h,{children:[(0,p.jsxs)(f,{children:[(0,p.jsxs)(b,{color:"#059669",children:[(0,p.jsx)(j,{children:n.length}),(0,p.jsx)(v,{children:"Total Restaurants"}),(0,p.jsx)(F,{positive:!0,children:"Under your management"})]}),(0,p.jsxs)(b,{color:"#2563EB",children:[(0,p.jsx)(j,{children:re}),(0,p.jsx)(v,{children:"Active Subscriptions"}),(0,p.jsxs)(F,{positive:!0,children:[Math.round(re/n.length*100),"% operational"]})]}),(0,p.jsxs)(b,{color:"#7C3AED",children:[(0,p.jsx)(j,{children:(0,l.vv)(ae)}),(0,p.jsx)(v,{children:"Your Monthly Payment"}),(0,p.jsx)(F,{positive:!0,children:"Manager-paid restaurants only"})]}),(0,p.jsxs)(b,{color:"#D97706",children:[(0,p.jsx)(j,{children:ie}),(0,p.jsx)(v,{children:"Self-Paying Restaurants"}),(0,p.jsx)(F,{positive:!0,children:"Direct billing to restaurant"})]})]}),(0,p.jsx)(C,{children:n.map(e=>(0,p.jsxs)(w,{children:[(0,p.jsxs)(A,{children:[(0,p.jsx)(k,{children:(0,p.jsxs)(E,{children:[e.restaurantName," ",e.currency&&(0,p.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:e.currency})]})}),(0,p.jsx)(S,{status:e.status,children:e.status})]}),(0,p.jsxs)(B,{children:[(0,p.jsxs)(z,{children:[(0,p.jsx)($,{children:e.planType}),(0,p.jsx)(P,{children:"monthly"===e.billingCycle?"Monthly billing":"Annual billing"})]}),(0,p.jsxs)(T,{children:[e.discountType&&"none"!==e.discountType&&(e.discountValue||0)>0?(0,p.jsxs)("div",{style:{textAlign:"right"},children:[(0,p.jsx)("div",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"12px",fontWeight:400},children:(0,l.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee)}),(0,p.jsx)("div",{style:{color:"#15803D"},children:(0,l.vv)(("monthly"===e.billingCycle?e.monthlyFee:e.annualFee)*("percentage"===e.discountType?1-(e.discountValue||0)/100:1)-("fixed"===e.discountType&&e.discountValue||0))})]}):(0,p.jsx)(p.Fragment,{children:(0,l.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee)}),"annual"===e.billingCycle&&(0,p.jsx)("span",{style:{fontSize:"12px",color:"#6B7280"},children:"/year"})]})]}),(0,p.jsxs)(D,{model:e.paymentModel,children:[(0,p.jsx)(M,{model:e.paymentModel,children:"self"===e.paymentModel?"Self-Paying":"Manager-Paid"}),(0,p.jsx)(R,{model:e.paymentModel,children:"self"===e.paymentModel?"Restaurant pays directly":"You handle payment for this restaurant"})]}),(0,p.jsxs)(L,{children:[(0,p.jsxs)(I,{children:[(0,p.jsx)(N,{children:"Start Date"}),(0,p.jsx)(_,{children:e.startDate})]}),(0,p.jsxs)(I,{children:[(0,p.jsx)(N,{children:"Next Payment"}),(0,p.jsx)(_,{children:e.nextPayment})]})]}),(0,p.jsxs)(O,{children:[(0,p.jsx)(U,{variant:"primary",onClick:()=>window.open(`/manager/reports?restaurant=${e.restaurantId}`,"_blank"),children:"View Reports"}),(0,p.jsxs)(U,{variant:"warning",onClick:()=>{const r="self"===e.paymentModel?"manager":"self";(async(e,r)=>{const a=e.replace("sub-",""),i="manager"===r?"brand_manager":"restaurant";try{const o=localStorage.getItem("auth_token");if(!(await fetch(`${s.JR}/api/restaurants/${a}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({payment_model:i})})).ok)throw new Error("Failed to update payment model");(await fetch(`${s.JR}/api/invoices/update-payer/${a}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({payment_model:i})})).ok||console.warn("Failed to update invoice payers, but restaurant payment model was updated"),t(n.map(n=>n.id===e?{...n,paymentModel:r,payerId:"manager"===r?n.managerId:n.restaurantId,payerName:"manager"===r?n.managerName:"Restaurant Owner"}:n))}catch(o){console.error("Error switching payment model:",o),$e("Failed to switch payment model. Please try again.")}})(e.id,r)},children:["Switch to ","self"===e.paymentModel?"Manager-Pay":"Self-Pay"]}),(0,p.jsx)(U,{onClick:()=>(e=>{pe(e),ye(e.planType),de(!0)})(e),children:"enterprise"===e.planType?"Change Plan":"Upgrade/Downgrade"}),"cancelled"!==e.status&&(0,p.jsx)(U,{variant:"danger",onClick:()=>{return n=e.id,t=e.restaurantName,Ee(n),Be(t),void Ae(!0);var n,t},children:"Cancel Subscription"})]})]},e.id))})]})]}),oe&&(0,p.jsxs)(i.aF,{isOpen:!0,onClose:()=>se(!1),title:"Add New Subscription",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(y,{variant:"secondary",onClick:()=>se(!1),children:"Cancel"}),(0,p.jsx)(y,{variant:"primary",onClick:async()=>{if(ue)try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",r=await fetch(`${s.JR}/api/restaurants/subscriptions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({restaurantId:ue,managerId:n,planType:ge,billingCycle:fe,paymentModel:Fe})});if(r.ok){await r.json();const e=await fetch(`${s.JR}/api/restaurants/subscriptions/manager/${n}`);if(e.ok){const n=(await e.json()).map(e=>({...e,features:te(e.planType)}));t(n)}const a=await fetch(`${s.JR}/api/restaurants/available/${n}`);if(a.ok){const e=await a.json();he(e)}se(!1),me(""),ye("basic"),be("monthly"),Ce("manager")}else{const e=await r.json();$e(`Failed to add subscription: ${e.error}`)}}catch(n){console.error("Error adding subscription:",n),$e("Error adding subscription. Please try again.")}else $e("Please select a restaurant")},children:"Add Subscription"})]}),children:[(0,p.jsx)(J,{style:{marginBottom:"20px"},children:"Connect a restaurant to a subscription plan"}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(V,{children:"Select Restaurant"}),(0,p.jsxs)(W,{value:ue,onChange:e=>me(e.target.value),children:[(0,p.jsx)("option",{value:"",children:"Choose a restaurant..."}),xe.map(e=>(0,p.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(V,{children:"Select Plan"}),(0,p.jsxs)(H,{children:[(0,p.jsxs)(G,{selected:"basic"===ge,onClick:()=>ye("basic"),children:[(0,p.jsx)(Q,{children:"Basic"}),(0,p.jsxs)(X,{children:[(0,l.vv)(29,ee),"/month"]}),(0,p.jsxs)(Z,{children:[(0,p.jsx)("li",{children:"Up to 1,000 orders/month"}),(0,p.jsx)("li",{children:"Basic analytics"}),(0,p.jsx)("li",{children:"5 staff accounts"})]})]}),(0,p.jsxs)(G,{selected:"professional"===ge,onClick:()=>ye("professional"),children:[(0,p.jsx)(Q,{children:"Professional"}),(0,p.jsxs)(X,{children:[(0,l.vv)(99,ee),"/month"]}),(0,p.jsxs)(Z,{children:[(0,p.jsx)("li",{children:"Up to 10,000 orders/month"}),(0,p.jsx)("li",{children:"Advanced analytics"}),(0,p.jsx)("li",{children:"Unlimited staff accounts"})]})]}),(0,p.jsxs)(G,{selected:"enterprise"===ge,onClick:()=>ye("enterprise"),children:[(0,p.jsx)(Q,{children:"Enterprise"}),(0,p.jsxs)(X,{children:[(0,l.vv)(199,ee),"/month"]}),(0,p.jsxs)(Z,{children:[(0,p.jsx)("li",{children:"Unlimited orders"}),(0,p.jsx)("li",{children:"Custom analytics"}),(0,p.jsx)("li",{children:"Priority support"})]})]})]})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(V,{children:"Billing Cycle"}),(0,p.jsxs)(H,{children:[(0,p.jsxs)(K,{children:[(0,p.jsx)(q,{type:"radio",name:"billing",checked:"monthly"===fe,onChange:()=>be("monthly")}),"Monthly Billing"]}),(0,p.jsxs)(K,{children:[(0,p.jsx)(q,{type:"radio",name:"billing",checked:"annual"===fe,onChange:()=>be("annual")}),"Annual Billing (Save 17%)"]})]})]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(V,{children:"Payment Model"}),(0,p.jsxs)(H,{children:[(0,p.jsxs)(K,{children:[(0,p.jsx)(q,{type:"radio",name:"payment",checked:"manager"===Fe,onChange:()=>Ce("manager")}),"Manager Pays (You handle payment)"]}),(0,p.jsxs)(K,{children:[(0,p.jsx)(q,{type:"radio",name:"payment",checked:"self"===Fe,onChange:()=>Ce("self")}),"Restaurant Self-Pay"]})]})]})]}),le&&(0,p.jsxs)(i.aF,{isOpen:!0,onClose:()=>de(!1),title:"Change Subscription Plan",footer:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(y,{variant:"secondary",onClick:()=>de(!1),children:"Cancel"}),(0,p.jsx)(y,{variant:"primary",onClick:()=>{if(!ce)return;const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}};t(n.map(n=>n.id===ce.id?{...n,planType:ge,monthlyFee:e[ge].monthly,annualFee:e[ge].annual,orderLimit:e[ge].orderLimit,nextPayment:new Date(Date.now()+2592e6).toISOString().split("T")[0]}:n)),de(!1),pe(null)},disabled:(null===ce||void 0===ce?void 0:ce.planType)===ge,children:"Confirm Change"})]}),children:[(0,p.jsxs)(J,{style:{marginBottom:"20px"},children:[null===ce||void 0===ce?void 0:ce.restaurantName," - Current: ",null===ce||void 0===ce?void 0:ce.planType]}),(0,p.jsxs)(Y,{children:[(0,p.jsx)(V,{children:"Select New Plan"}),(0,p.jsxs)(H,{children:[(0,p.jsxs)(G,{selected:"basic"===ge,onClick:()=>ye("basic"),children:[(0,p.jsx)(Q,{children:"Basic"}),(0,p.jsxs)(X,{children:[(0,l.vv)(29,ee),"/month"]}),(0,p.jsxs)(Z,{children:[(0,p.jsx)("li",{children:"Up to 1,000 orders/month"}),(0,p.jsx)("li",{children:"Basic analytics"}),(0,p.jsx)("li",{children:"5 staff accounts"})]})]}),(0,p.jsxs)(G,{selected:"professional"===ge,onClick:()=>ye("professional"),children:[(0,p.jsx)(Q,{children:"Professional"}),(0,p.jsxs)(X,{children:[(0,l.vv)(99,ee),"/month"]}),(0,p.jsxs)(Z,{children:[(0,p.jsx)("li",{children:"Up to 10,000 orders/month"}),(0,p.jsx)("li",{children:"Advanced analytics"}),(0,p.jsx)("li",{children:"Unlimited staff accounts"})]})]}),(0,p.jsxs)(G,{selected:"enterprise"===ge,onClick:()=>ye("enterprise"),children:[(0,p.jsx)(Q,{children:"Enterprise"}),(0,p.jsxs)(X,{children:[(0,l.vv)(199,ee),"/month"]}),(0,p.jsxs)(Z,{children:[(0,p.jsx)("li",{children:"Unlimited orders"}),(0,p.jsx)("li",{children:"Custom analytics"}),(0,p.jsx)("li",{children:"Priority support"})]})]})]})]}),(0,p.jsxs)("div",{style:{padding:"16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,p.jsx)("strong",{style:{color:"#92400E"},children:"Important:"}),(0,p.jsxs)("p",{style:{color:"#92400E",fontSize:"14px",margin:"4px 0 0 0"},children:["Plan changes will take effect from the next billing cycle.",(null===ce||void 0===ce?void 0:ce.planType)===ge&&" (No change selected)"]})]})]}),ze&&(0,p.jsxs)("div",{style:{position:"fixed",bottom:24,right:24,zIndex:9999,background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:8,padding:"12px 20px",color:"#DC2626",fontSize:14,fontWeight:500,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",display:"flex",alignItems:"center",gap:12},children:[(0,p.jsx)("span",{children:ze}),(0,p.jsx)("button",{onClick:()=>$e(""),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontWeight:700,fontSize:16},children:"x"})]}),(0,p.jsx)(c.A,{isOpen:we,title:"Cancel Subscription",message:`Are you sure you want to cancel the subscription for ${Se}? This action will end the subscription at the current billing cycle, disable access to premium features, and cannot be undone.`,onConfirm:()=>{Ae(!1),t(n.map(e=>e.id===ke?{...e,status:"cancelled"}:e)),Ee(""),Be("")},onCancel:()=>{Ae(!1),Ee(""),Be("")},confirmText:"Cancel Subscription",cancelText:"Keep Subscription",type:"danger"})]})}},4021:(e,n,t)=>{t.d(n,{i1:()=>o});var r=t(9950),a=t(1367),i=t(6038);const o=()=>{const{user:e}=(0,a.As)(),[n,t]=(0,r.useState)("RM"),[o]=(0,r.useState)(Object.keys(i.DL)),[s,l]=(0,r.useState)(!0),[d,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let a=r>=0?n[r+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";t(r)}else t("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),t("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:o,loading:s,error:d}}},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var r=t(4752),a=t(9610),i=t(4414);const o=r.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,s=r.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=r.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=r.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=r.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=r.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E6EBF1"};
  background: ${e=>"primary"===e.variant?"danger"===e.type?"#DC2626":"warning"===e.type?"#D97706":"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7C93"};

  &:hover {
    background: ${e=>"primary"===e.variant?"danger"===e.type?"#B91C1C":"warning"===e.type?"#B45309":"#5A51E6":"#F8FAFC"};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,x=e=>{let{isOpen:n,title:t,message:r,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:m="Cancel",type:g="warning"}=e;return n?(0,i.jsx)(a.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,i.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,i.jsxs)(s,{children:[(0,i.jsx)(l,{children:t}),(0,i.jsx)(d,{children:r})]}),(0,i.jsxs)(c,{children:[(0,i.jsx)(p,{variant:"secondary",onClick:h,children:m}),(0,i.jsx)(p,{variant:"primary",type:g,onClick:x,children:u})]})]})}):null}}}]);