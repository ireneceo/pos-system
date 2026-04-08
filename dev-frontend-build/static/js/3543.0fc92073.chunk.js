"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3543],{3543:(e,n,t)=>{t.r(n),t.d(n,{default:()=>ne});var r=t(9950),a=t(4752),i=t(8409),o=t(1367),s=t(6910),l=t(6038),d=t(4021),c=t(7617),p=t(5030),u=t(4414);const x=a.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,h=a.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,m=a.Ay.div`
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
`,g=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,y=a.Ay.div`
  display: flex;
  gap: 12px;
`,f=a.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: white;\n    color: #374151;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      border-color: #635BFF;\n    }\n  "}
`,b=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,v=a.Ay.div`
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
`,F=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,w=a.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,A=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 24px;
`,C=a.Ay.div`
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
`,k=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,E=a.Ay.div`
  flex: 1;
`,S=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,B=a.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":default:return"#F3F4F6";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"cancelled":return"#DC2626";default:return"#6B7280"}}};
`,P=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
`,$=a.Ay.div``,z=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
`,R=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,T=a.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
`,M=a.Ay.div`
  margin: 16px 0;
  padding: 12px;
  background: ${e=>"self"===e.model?"#FEF3C7":"#E0F2FE"};
  border-radius: 8px;
  border: 1px solid ${e=>"self"===e.model?"#F59E0B":"#0EA5E9"};
`,D=a.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,_=a.Ay.div`
  font-size: 14px;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
`,O=a.Ay.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`,L=a.Ay.button`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"warning"===e.variant?"\n    background: transparent;\n    color: #D97706;\n    border-color: #FCD34D;\n    \n    &:hover {\n      background: #FEF3C7;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,I=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,U=a.Ay.div``,N=a.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,Y=a.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #374151;
`,J=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,W=a.Ay.div`
  margin-bottom: 20px;
`,V=a.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`,H=a.Ay.select`
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
`,K=a.Ay.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,q=a.Ay.label`
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
`,G=a.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
`,Q=a.Ay.div`
  padding: 16px;
  border: 2px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.selected?"#F8F9FF":"white"};
  
  &:hover {
    border-color: #635BFF;
  }
`,X=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin-bottom: 4px;
`,Z=a.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
  margin-bottom: 8px;
`,ee=a.Ay.ul`
  font-size: 12px;
  color: #6B7280;
  margin: 0;
  padding-left: 20px;
`,ne=()=>{const{t:e}=(0,p.Bd)("admin"),{user:n}=(0,o.As)(),[t,a]=(0,r.useState)([]),{defaultCurrency:ne}=(0,d.i1)(),[te,re]=(0,r.useState)("RM");(0,r.useEffect)(()=>{ne&&re(ne)},[ne]),(0,r.useEffect)(()=>{n&&(async()=>{try{const e=(null===n||void 0===n?void 0:n.managerId)||(null===n||void 0===n?void 0:n.id)||"2",t=await fetch(`${s.JR}/api/restaurants/subscriptions/manager/${e}`);if(t.ok){const e=(await t.json()).map(e=>({...e,features:ae(e.planType)}));a(e)}else console.error("Failed to fetch subscriptions")}catch(e){console.error("Error fetching subscriptions:",e)}})()},[n]);const ae=e=>{switch(e){case"basic":return["Up to 1k Orders/month","Basic Analytics","Community Support"];case"professional":return["Up to 10k Orders/month","Standard Analytics","Email Support","Staff Management"];case"enterprise":return["Unlimited Orders","Advanced Analytics","Priority Support","Custom Branding"];default:return[]}},ie=t.filter(e=>"active"===e.status).length,oe=t.filter(e=>"manager"===e.paymentModel&&"active"===e.status).reduce((e,n)=>e+("monthly"===n.billingCycle?n.monthlyFee:n.annualFee/12),0),se=t.filter(e=>"self"===e.paymentModel).length,[le,de]=(t.filter(e=>"trial"===e.status).length,(0,r.useState)(!1)),[ce,pe]=(0,r.useState)(!1),[ue,xe]=(0,r.useState)(null),[he,me]=(0,r.useState)([]);(0,r.useEffect)(()=>{console.log("\ud83c\udf7d\ufe0f availableRestaurants state changed:",he)},[he]);const[ge,ye]=(0,r.useState)(""),[fe,be]=(0,r.useState)("basic"),[ve,je]=(0,r.useState)("monthly"),[Fe,we]=(0,r.useState)([]),[Ae,Ce]=(0,r.useState)("manager"),[ke,Ee]=(0,r.useState)(!1),[Se,Be]=(0,r.useState)(""),[Pe,$e]=(0,r.useState)(""),[ze,Re]=(0,r.useState)("");(0,r.useEffect)(()=>{n&&((async()=>{try{const e=(null===n||void 0===n?void 0:n.managerId)||(null===n||void 0===n?void 0:n.id)||"2";console.log("\ud83d\udd0d Fetching available restaurants for manager:",e);const t=await fetch(`${s.JR}/api/restaurants/available/${e}`);if(console.log("\ud83d\udce1 Response status:",t.status),t.ok){const e=await t.json();console.log("\ud83d\udce6 Available restaurants data:",e),me(e)}else console.error("Failed to fetch available restaurants"),me([])}catch(e){console.error("Error fetching available restaurants:",e),me([])}})(),(async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);we(n)}}catch(e){console.error("Error fetching plans:",e)}})())},[n]);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(x,{children:[(0,u.jsxs)(m,{children:[(0,u.jsx)(g,{children:e("admin:subscriptionsPage.subscriptions")}),(0,u.jsxs)(y,{children:[(0,u.jsx)(f,{variant:"secondary",onClick:()=>{(new Date).toISOString(),null===n||void 0===n||n.name,t.length,t.map(e=>({restaurantName:e.restaurantName,location:e.location,planType:e.planType,status:e.status,paymentModel:e.paymentModel,billingCycle:e.billingCycle,monthlyFee:e.monthlyFee,annualFee:e.annualFee,startDate:e.startDate,nextPayment:e.nextPayment,currentOrders:e.currentOrders,orderLimit:-1===e.orderLimit?"Unlimited":e.orderLimit}));const e=t.map(e=>[e.restaurantName,e.location,e.planType,e.status,e.paymentModel,e.billingCycle,e.monthlyFee,e.annualFee,e.startDate,e.nextPayment,e.currentOrders,-1===e.orderLimit?"Unlimited":e.orderLimit]),r=[["Restaurant","Location","Plan","Status","Payment Model","Billing Cycle","Monthly Fee","Annual Fee","Start Date","Next Payment","Current Orders","Order Limit"].join(","),...e.map(e=>e.join(","))].join("\n"),a=new Blob([r],{type:"text/csv"}),i=URL.createObjectURL(a),o=document.createElement("a");o.href=i,o.download=`subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},children:e("admin:subscriptionsPage.exportData")}),(0,u.jsx)(f,{variant:"primary",onClick:()=>de(!0),children:e("admin:subscriptionsPage.addSubscription")})]})]}),(0,u.jsxs)(h,{children:[(0,u.jsxs)(b,{children:[(0,u.jsxs)(v,{color:"#059669",children:[(0,u.jsx)(j,{children:t.length}),(0,u.jsx)(F,{children:e("admin:subscriptionsPage.totalRestaurants")}),(0,u.jsx)(w,{positive:!0,children:e("admin:subscriptionsPage.underYourManagement")})]}),(0,u.jsxs)(v,{color:"#2563EB",children:[(0,u.jsx)(j,{children:ie}),(0,u.jsx)(F,{children:e("admin:subscriptionsPage.activeSubscriptions")}),(0,u.jsxs)(w,{positive:!0,children:[Math.round(ie/t.length*100),"% operational"]})]}),(0,u.jsxs)(v,{color:"#7C3AED",children:[(0,u.jsx)(j,{children:(0,l.vv)(oe)}),(0,u.jsx)(F,{children:e("admin:subscriptionsPage.yourMonthlyPayment")}),(0,u.jsx)(w,{positive:!0,children:e("admin:subscriptionsPage.managerpaidRestaurantsOnly")})]}),(0,u.jsxs)(v,{color:"#D97706",children:[(0,u.jsx)(j,{children:se}),(0,u.jsx)(F,{children:e("admin:subscriptionsPage.selfpayingRestaurants")}),(0,u.jsx)(w,{positive:!0,children:e("admin:subscriptionsPage.directBillingToRestaurant")})]})]}),(0,u.jsx)(A,{children:t.map(n=>(0,u.jsxs)(C,{children:[(0,u.jsxs)(k,{children:[(0,u.jsx)(E,{children:(0,u.jsxs)(S,{children:[n.restaurantName," ",n.currency&&(0,u.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:n.currency})]})}),(0,u.jsx)(B,{status:n.status,children:n.status})]}),(0,u.jsxs)(P,{children:[(0,u.jsxs)($,{children:[(0,u.jsx)(z,{children:n.planType}),(0,u.jsx)(R,{children:"monthly"===n.billingCycle?"Monthly billing":"Annual billing"})]}),(0,u.jsxs)(T,{children:[n.discountType&&"none"!==n.discountType&&(n.discountValue||0)>0?(0,u.jsxs)("div",{style:{textAlign:"right"},children:[(0,u.jsx)("div",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"12px",fontWeight:400},children:(0,l.vv)("monthly"===n.billingCycle?n.monthlyFee:n.annualFee)}),(0,u.jsx)("div",{style:{color:"#15803D"},children:(0,l.vv)(("monthly"===n.billingCycle?n.monthlyFee:n.annualFee)*("percentage"===n.discountType?1-(n.discountValue||0)/100:1)-("fixed"===n.discountType&&n.discountValue||0))})]}):(0,u.jsx)(u.Fragment,{children:(0,l.vv)("monthly"===n.billingCycle?n.monthlyFee:n.annualFee)}),"annual"===n.billingCycle&&(0,u.jsx)("span",{style:{fontSize:"12px",color:"#6B7280"},children:"/year"})]})]}),(0,u.jsxs)(M,{model:n.paymentModel,children:[(0,u.jsx)(D,{model:n.paymentModel,children:"self"===n.paymentModel?"Self-Paying":"Manager-Paid"}),(0,u.jsx)(_,{model:n.paymentModel,children:"self"===n.paymentModel?"Restaurant pays directly":"You handle payment for this restaurant"})]}),(0,u.jsxs)(I,{children:[(0,u.jsxs)(U,{children:[(0,u.jsx)(N,{children:e("admin:subscriptionsPage.startDate")}),(0,u.jsx)(Y,{children:n.startDate})]}),(0,u.jsxs)(U,{children:[(0,u.jsx)(N,{children:e("admin:subscriptionsPage.nextPayment")}),(0,u.jsx)(Y,{children:n.nextPayment})]})]}),(0,u.jsxs)(O,{children:[(0,u.jsx)(L,{variant:"primary",onClick:()=>window.open(`/manager/reports?restaurant=${n.restaurantId}`,"_blank"),children:"View Reports"}),(0,u.jsxs)(L,{variant:"warning",onClick:()=>{const e="self"===n.paymentModel?"manager":"self";(async(e,n)=>{const r=e.replace("sub-",""),i="manager"===n?"brand_manager":"restaurant";try{const o=localStorage.getItem("auth_token");if(!(await fetch(`${s.JR}/api/restaurants/${r}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({payment_model:i})})).ok)throw new Error("Failed to update payment model");(await fetch(`${s.JR}/api/invoices/update-payer/${r}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({payment_model:i})})).ok||console.warn("Failed to update invoice payers, but restaurant payment model was updated"),a(t.map(t=>t.id===e?{...t,paymentModel:n,payerId:"manager"===n?t.managerId:t.restaurantId,payerName:"manager"===n?t.managerName:"Restaurant Owner"}:t))}catch(o){console.error("Error switching payment model:",o),Re("Failed to switch payment model. Please try again.")}})(n.id,e)},children:["Switch to ","self"===n.paymentModel?"Manager-Pay":"Self-Pay"]}),(0,u.jsx)(L,{onClick:()=>(e=>{xe(e),be(e.planType),pe(!0)})(n),children:"enterprise"===n.planType?"Change Plan":"Upgrade/Downgrade"}),"cancelled"!==n.status&&(0,u.jsx)(L,{variant:"danger",onClick:()=>{return e=n.id,t=n.restaurantName,Be(e),$e(t),void Ee(!0);var e,t},children:"Cancel Subscription"})]})]},n.id))})]})]}),le&&(0,u.jsxs)(i.aF,{isOpen:!0,onClose:()=>de(!1),title:"Add New Subscription",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(f,{variant:"secondary",onClick:()=>de(!1),children:e("admin:subscriptionsPage.cancel")}),(0,u.jsx)(f,{variant:"primary",onClick:async()=>{if(ge)try{const e=(null===n||void 0===n?void 0:n.managerId)||(null===n||void 0===n?void 0:n.id)||"2",t=await fetch(`${s.JR}/api/restaurants/subscriptions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({restaurantId:ge,managerId:e,planType:fe,billingCycle:ve,paymentModel:Ae})});if(t.ok){await t.json();const n=await fetch(`${s.JR}/api/restaurants/subscriptions/manager/${e}`);if(n.ok){const e=(await n.json()).map(e=>({...e,features:ae(e.planType)}));a(e)}const r=await fetch(`${s.JR}/api/restaurants/available/${e}`);if(r.ok){const e=await r.json();me(e)}de(!1),ye(""),be("basic"),je("monthly"),Ce("manager")}else{const e=await t.json();Re(`Failed to add subscription: ${e.error}`)}}catch(e){console.error("Error adding subscription:",e),Re("Error adding subscription. Please try again.")}else Re("Please select a restaurant")},children:e("admin:subscriptionsPage.addSubscription")})]}),children:[(0,u.jsx)(J,{style:{marginBottom:"20px"},children:e("admin:subscriptionsPage.connectARestaurantToASubscriptionPlan")}),(0,u.jsxs)(W,{children:[(0,u.jsx)(V,{children:e("admin:subscriptionsPage.selectRestaurant")}),(0,u.jsxs)(H,{value:ge,onChange:e=>ye(e.target.value),children:[(0,u.jsx)("option",{value:"",children:e("admin:subscriptionsPage.chooseARestaurant")}),he.map(e=>(0,u.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(V,{children:e("admin:subscriptionsPage.selectPlan")}),(0,u.jsx)(K,{children:Fe.filter(e=>"restaurant"===e.plan_target&&e.is_active).map(e=>{var n;return(0,u.jsxs)(Q,{selected:fe===e.name,onClick:()=>be(e.name),children:[(0,u.jsx)(X,{children:e.display_name}),(0,u.jsxs)(Z,{children:[(0,l.m9)(e,(0,l.Wh)(te)),"/month"]}),(0,u.jsxs)(ee,{children:[(0,u.jsxs)("li",{children:[-1===e.order_limit?"Unlimited":`Up to ${null===(n=e.order_limit)||void 0===n?void 0:n.toLocaleString()}`," orders/month"]}),(0,u.jsxs)("li",{children:[-1===e.staff_limit?"Unlimited":`${e.staff_limit}`," staff accounts"]}),Array.isArray(e.features)&&e.features.slice(0,2).map((e,n)=>(0,u.jsx)("li",{children:e},n))]})]},e.id)})})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(V,{children:e("admin:subscriptionsPage.billingCycle")}),(0,u.jsxs)(K,{children:[(0,u.jsxs)(q,{children:[(0,u.jsx)(G,{type:"radio",name:"billing",checked:"monthly"===ve,onChange:()=>je("monthly")}),"Monthly Billing"]}),(0,u.jsxs)(q,{children:[(0,u.jsx)(G,{type:"radio",name:"billing",checked:"annual"===ve,onChange:()=>je("annual")}),"Annual Billing"]})]})]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(V,{children:e("admin:subscriptionsPage.paymentModel")}),(0,u.jsxs)(K,{children:[(0,u.jsxs)(q,{children:[(0,u.jsx)(G,{type:"radio",name:"payment",checked:"manager"===Ae,onChange:()=>Ce("manager")}),"Manager Pays (You handle payment)"]}),(0,u.jsxs)(q,{children:[(0,u.jsx)(G,{type:"radio",name:"payment",checked:"self"===Ae,onChange:()=>Ce("self")}),"Restaurant Self-Pay"]})]})]})]}),ce&&(0,u.jsxs)(i.aF,{isOpen:!0,onClose:()=>pe(!1),title:"Change Subscription Plan",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(f,{variant:"secondary",onClick:()=>pe(!1),children:e("admin:subscriptionsPage.cancel")}),(0,u.jsx)(f,{variant:"primary",onClick:()=>{if(!ue)return;const e=Fe.find(e=>{var n;return e.name===fe||(null===(n=e.display_name)||void 0===n?void 0:n.toLowerCase().includes(fe))}),n=(0,l.Wh)(ue.currency||te||"MYR"),r=e?(0,l.jL)(e,n,"monthly"):0,i=e?(0,l.jL)(e,n,"annual"):0,o=(null===e||void 0===e?void 0:e.order_limit)||-1;a(t.map(e=>e.id===ue.id?{...e,planType:fe,monthlyFee:r,annualFee:i,orderLimit:o,nextPayment:new Date(Date.now()+2592e6).toISOString().split("T")[0]}:e)),pe(!1),xe(null)},disabled:(null===ue||void 0===ue?void 0:ue.planType)===fe,children:e("admin:subscriptionsPage.confirmChange")})]}),children:[(0,u.jsxs)(J,{style:{marginBottom:"20px"},children:[null===ue||void 0===ue?void 0:ue.restaurantName," - Current: ",null===ue||void 0===ue?void 0:ue.planType]}),(0,u.jsxs)(W,{children:[(0,u.jsx)(V,{children:e("admin:subscriptionsPage.selectNewPlan")}),(0,u.jsx)(K,{children:Fe.filter(e=>"restaurant"===e.plan_target&&e.is_active).map(e=>{var n;return(0,u.jsxs)(Q,{selected:fe===e.name,onClick:()=>be(e.name),children:[(0,u.jsx)(X,{children:e.display_name}),(0,u.jsxs)(Z,{children:[(0,l.m9)(e,(0,l.Wh)(te)),"/month"]}),(0,u.jsxs)(ee,{children:[(0,u.jsxs)("li",{children:[-1===e.order_limit?"Unlimited":`Up to ${null===(n=e.order_limit)||void 0===n?void 0:n.toLocaleString()}`," orders/month"]}),(0,u.jsxs)("li",{children:[-1===e.staff_limit?"Unlimited":`${e.staff_limit}`," staff accounts"]}),Array.isArray(e.features)&&e.features.slice(0,2).map((e,n)=>(0,u.jsx)("li",{children:e},n))]})]},e.id)})})]}),(0,u.jsxs)("div",{style:{padding:"16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,u.jsx)("strong",{style:{color:"#92400E"},children:"Important:"}),(0,u.jsxs)("p",{style:{color:"#92400E",fontSize:"14px",margin:"4px 0 0 0"},children:["Plan changes will take effect from the next billing cycle.",(null===ue||void 0===ue?void 0:ue.planType)===fe&&" (No change selected)"]})]})]}),ze&&(0,u.jsxs)("div",{style:{position:"fixed",bottom:24,right:24,zIndex:9999,background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:8,padding:"12px 20px",color:"#DC2626",fontSize:14,fontWeight:500,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",display:"flex",alignItems:"center",gap:12},children:[(0,u.jsx)("span",{children:ze}),(0,u.jsx)("button",{onClick:()=>Re(""),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontWeight:700,fontSize:16},children:"x"})]}),(0,u.jsx)(c.A,{isOpen:ke,title:"Cancel Subscription",message:`Are you sure you want to cancel the subscription for ${Pe}? This action will end the subscription at the current billing cycle, disable access to premium features, and cannot be undone.`,onConfirm:()=>{Ee(!1),a(t.map(e=>e.id===Se?{...e,status:"cancelled"}:e)),Be(""),$e("")},onCancel:()=>{Ee(!1),Be(""),$e("")},confirmText:"Cancel Subscription",cancelText:"Keep Subscription",type:"danger"})]})}},4021:(e,n,t)=>{t.d(n,{i1:()=>o});var r=t(9950),a=t(1367),i=t(6038);const o=()=>{const{user:e}=(0,a.As)(),[n,t]=(0,r.useState)("RM"),[o]=(0,r.useState)(Object.keys(i.DL)),[s,l]=(0,r.useState)(!0),[d,c]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let a=r>=0?n[r+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"MYR";t(r)}else t("MYR")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),t("MYR")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:o,loading:s,error:d}}},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var r=t(7119),a=t(4752),i=t(9610),o=t(4414);const s=a.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`,l=a.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,d=a.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,c=a.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`,p=a.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,u=a.Ay.button`
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
`,x=e=>{let{isOpen:n,title:t,message:a,onConfirm:x,onCancel:h,confirmText:m="Confirm",cancelText:g="Cancel",type:y="warning"}=e;return n?r.createPortal((0,o.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&h()},style:{zIndex:1100},children:(0,o.jsxs)(s,{onClick:e=>e.stopPropagation(),children:[(0,o.jsxs)(l,{children:[(0,o.jsx)(d,{children:t}),(0,o.jsx)(c,{children:a})]}),(0,o.jsxs)(p,{children:[(0,o.jsx)(u,{variant:"secondary",onClick:h,children:g}),(0,o.jsx)(u,{variant:"primary",type:y,onClick:x,children:m})]})]})}),document.body):null}}}]);