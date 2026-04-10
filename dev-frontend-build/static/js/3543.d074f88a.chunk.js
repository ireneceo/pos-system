"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3543],{3543:(e,n,t)=>{t.r(n),t.d(n,{default:()=>te});var r=t(9950),a=t(4752),i=t(8409),o=t(1367),s=t(6910),l=t(6038),d=t(4021),c=t(7617),p=t(5030),u=t(9955),x=t(4414);const h=a.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,m=a.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,g=a.Ay.div`
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
`,y=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,f=a.Ay.div`
  display: flex;
  gap: 12px;
`,b=a.Ay.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: white;\n    color: #374151;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      border-color: #635BFF;\n    }\n  "}
`,v=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,j=a.Ay.div`
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
`,F=a.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,w=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,A=a.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,C=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 24px;
`,k=a.Ay.div`
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
`,E=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,S=a.Ay.div`
  flex: 1;
`,B=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,P=a.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":default:return"#F3F4F6";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"cancelled":return"#DC2626";default:return"#6B7280"}}};
`,$=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
`,z=a.Ay.div``,R=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
`,T=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,M=a.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
`,D=a.Ay.div`
  margin: 16px 0;
  padding: 12px;
  background: ${e=>"self"===e.model?"#FEF3C7":"#E0F2FE"};
  border-radius: 8px;
  border: 1px solid ${e=>"self"===e.model?"#F59E0B":"#0EA5E9"};
`,_=a.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,O=a.Ay.div`
  font-size: 14px;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
`,L=a.Ay.div`
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
`,I=a.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,N=a.Ay.div``,Y=a.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,J=a.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #374151;
`,W=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,V=a.Ay.div`
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
`,q=a.Ay.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,G=a.Ay.label`
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
`,te=()=>{const{t:e}=(0,p.Bd)("admin"),{user:n}=(0,o.As)(),[t,a]=(0,r.useState)([]),{defaultCurrency:te}=(0,d.i1)(),[re,ae]=(0,r.useState)("RM");(0,r.useEffect)(()=>{te&&ae(te)},[te]),(0,r.useEffect)(()=>{n&&(async()=>{try{const e=(null===n||void 0===n?void 0:n.managerId)||(null===n||void 0===n?void 0:n.id)||"2",t=await fetch(`${s.JR}/api/restaurants/subscriptions/manager/${e}`);if(t.ok){const e=(await t.json()).map(e=>({...e,features:ie(e.planType)}));a(e)}else console.error("Failed to fetch subscriptions")}catch(e){console.error("Error fetching subscriptions:",e)}})()},[n]);const ie=e=>{switch(e){case"basic":return["Up to 1k Orders/month","Basic Analytics","Community Support"];case"professional":return["Up to 10k Orders/month","Standard Analytics","Email Support","Staff Management"];case"enterprise":return["Unlimited Orders","Advanced Analytics","Priority Support","Custom Branding"];default:return[]}},oe=t.filter(e=>"active"===e.status).length,se=t.filter(e=>"manager"===e.paymentModel&&"active"===e.status).reduce((e,n)=>e+("monthly"===n.billingCycle?n.monthlyFee:n.annualFee/12),0),le=t.filter(e=>"self"===e.paymentModel).length,[de,ce]=(t.filter(e=>"trial"===e.status).length,(0,r.useState)(!1)),[pe,ue]=(0,r.useState)(!1),[xe,he]=(0,r.useState)(null),[me,ge]=(0,r.useState)([]);(0,r.useEffect)(()=>{console.log("\ud83c\udf7d\ufe0f availableRestaurants state changed:",me)},[me]);const[ye,fe]=(0,r.useState)(""),[be,ve]=(0,r.useState)("basic"),[je,Fe]=(0,r.useState)("monthly"),[we,Ae]=(0,r.useState)([]),[Ce,ke]=(0,r.useState)("manager"),[Ee,Se]=(0,r.useState)(!1),[Be,Pe]=(0,r.useState)(""),[$e,ze]=(0,r.useState)(""),[Re,Te]=(0,r.useState)("");(0,r.useEffect)(()=>{n&&((async()=>{try{const e=(null===n||void 0===n?void 0:n.managerId)||(null===n||void 0===n?void 0:n.id)||"2";console.log("\ud83d\udd0d Fetching available restaurants for manager:",e);const t=await fetch(`${s.JR}/api/restaurants/available/${e}`);if(console.log("\ud83d\udce1 Response status:",t.status),t.ok){const e=await t.json();console.log("\ud83d\udce6 Available restaurants data:",e),ge(e)}else console.error("Failed to fetch available restaurants"),ge([])}catch(e){console.error("Error fetching available restaurants:",e),ge([])}})(),(async()=>{try{const e=await fetch("/api/plans");if(e.ok){const n=(await e.json()).filter(e=>"restaurant"===e.plan_target&&e.is_active);Ae(n)}}catch(e){console.error("Error fetching plans:",e)}})())},[n]);return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(g,{children:[(0,x.jsx)(y,{children:e("admin:subscriptionsPage.subscriptions")}),(0,x.jsxs)(f,{children:[(0,x.jsx)(b,{variant:"secondary",onClick:()=>{(new Date).toISOString(),null===n||void 0===n||n.name,t.length,t.map(e=>({restaurantName:e.restaurantName,location:e.location,planType:e.planType,status:e.status,paymentModel:e.paymentModel,billingCycle:e.billingCycle,monthlyFee:e.monthlyFee,annualFee:e.annualFee,startDate:e.startDate,nextPayment:e.nextPayment,currentOrders:e.currentOrders,orderLimit:-1===e.orderLimit?"Unlimited":e.orderLimit}));const e=t.map(e=>[e.restaurantName,e.location,e.planType,e.status,e.paymentModel,e.billingCycle,e.monthlyFee,e.annualFee,e.startDate,e.nextPayment,e.currentOrders,-1===e.orderLimit?"Unlimited":e.orderLimit]),r=[["Restaurant","Location","Plan","Status","Payment Model","Billing Cycle","Monthly Fee","Annual Fee","Start Date","Next Payment","Current Orders","Order Limit"].join(","),...e.map(e=>e.join(","))].join("\n"),a=new Blob([r],{type:"text/csv"}),i=URL.createObjectURL(a),o=document.createElement("a");o.href=i,o.download=`subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(i)},children:e("admin:subscriptionsPage.exportData")}),(0,x.jsx)(b,{variant:"primary",onClick:()=>ce(!0),children:e("admin:subscriptionsPage.addSubscription")})]})]}),(0,x.jsxs)(m,{children:[(0,x.jsxs)(v,{children:[(0,x.jsxs)(j,{color:"#059669",children:[(0,x.jsx)(F,{children:t.length}),(0,x.jsx)(w,{children:e("admin:subscriptionsPage.totalRestaurants")}),(0,x.jsx)(A,{positive:!0,children:e("admin:subscriptionsPage.underYourManagement")})]}),(0,x.jsxs)(j,{color:"#2563EB",children:[(0,x.jsx)(F,{children:oe}),(0,x.jsx)(w,{children:e("admin:subscriptionsPage.activeSubscriptions")}),(0,x.jsxs)(A,{positive:!0,children:[Math.round(oe/t.length*100),"% operational"]})]}),(0,x.jsxs)(j,{color:"#7C3AED",children:[(0,x.jsx)(F,{children:(0,l.vv)(se)}),(0,x.jsx)(w,{children:e("admin:subscriptionsPage.yourMonthlyPayment")}),(0,x.jsx)(A,{positive:!0,children:e("admin:subscriptionsPage.managerpaidRestaurantsOnly")})]}),(0,x.jsxs)(j,{color:"#D97706",children:[(0,x.jsx)(F,{children:le}),(0,x.jsx)(w,{children:e("admin:subscriptionsPage.selfpayingRestaurants")}),(0,x.jsx)(A,{positive:!0,children:e("admin:subscriptionsPage.directBillingToRestaurant")})]})]}),(0,x.jsx)(C,{children:t.map(n=>(0,x.jsxs)(k,{children:[(0,x.jsxs)(E,{children:[(0,x.jsx)(S,{children:(0,x.jsxs)(B,{children:[n.restaurantName," ",n.currency&&(0,x.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:n.currency})]})}),(0,x.jsx)(P,{status:n.status,children:n.status})]}),(0,x.jsxs)($,{children:[(0,x.jsxs)(z,{children:[(0,x.jsx)(R,{children:n.planType}),(0,x.jsx)(T,{children:"monthly"===n.billingCycle?"Monthly billing":"Annual billing"})]}),(0,x.jsxs)(M,{children:[n.discountType&&"none"!==n.discountType&&(n.discountValue||0)>0?(0,x.jsxs)("div",{style:{textAlign:"right"},children:[(0,x.jsx)("div",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"12px",fontWeight:400},children:(0,l.vv)("monthly"===n.billingCycle?n.monthlyFee:n.annualFee)}),(0,x.jsx)("div",{style:{color:"#15803D"},children:(0,l.vv)(("monthly"===n.billingCycle?n.monthlyFee:n.annualFee)*("percentage"===n.discountType?1-(n.discountValue||0)/100:1)-("fixed"===n.discountType&&n.discountValue||0))})]}):(0,x.jsx)(x.Fragment,{children:(0,l.vv)("monthly"===n.billingCycle?n.monthlyFee:n.annualFee)}),"annual"===n.billingCycle&&(0,x.jsx)("span",{style:{fontSize:"12px",color:"#6B7280"},children:"/year"})]})]}),(0,x.jsxs)(D,{model:n.paymentModel,children:[(0,x.jsx)(_,{model:n.paymentModel,children:"self"===n.paymentModel?"Self-Paying":"Manager-Paid"}),(0,x.jsx)(O,{model:n.paymentModel,children:"self"===n.paymentModel?"Restaurant pays directly":"You handle payment for this restaurant"})]}),(0,x.jsxs)(I,{children:[(0,x.jsxs)(N,{children:[(0,x.jsx)(Y,{children:e("admin:subscriptionsPage.startDate")}),(0,x.jsx)(J,{children:n.startDate})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)(Y,{children:e("admin:subscriptionsPage.nextPayment")}),(0,x.jsx)(J,{children:n.nextPayment})]})]}),(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{variant:"primary",onClick:()=>window.open(`/manager/reports?restaurant=${n.restaurantId}`,"_blank"),children:"View Reports"}),(0,x.jsxs)(U,{variant:"warning",onClick:()=>{const e="self"===n.paymentModel?"manager":"self";(async(e,n)=>{const r=e.replace("sub-",""),i="manager"===n?"brand_manager":"restaurant";try{const o=(0,u.c4)();if(!(await fetch(`${s.JR}/api/restaurants/${r}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({payment_model:i})})).ok)throw new Error("Failed to update payment model");(await fetch(`${s.JR}/api/invoices/update-payer/${r}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${o}`},body:JSON.stringify({payment_model:i})})).ok||console.warn("Failed to update invoice payers, but restaurant payment model was updated"),a(t.map(t=>t.id===e?{...t,paymentModel:n,payerId:"manager"===n?t.managerId:t.restaurantId,payerName:"manager"===n?t.managerName:"Restaurant Owner"}:t))}catch(o){console.error("Error switching payment model:",o),Te("Failed to switch payment model. Please try again.")}})(n.id,e)},children:["Switch to ","self"===n.paymentModel?"Manager-Pay":"Self-Pay"]}),(0,x.jsx)(U,{onClick:()=>(e=>{he(e),ve(e.planType),ue(!0)})(n),children:"enterprise"===n.planType?"Change Plan":"Upgrade/Downgrade"}),"cancelled"!==n.status&&(0,x.jsx)(U,{variant:"danger",onClick:()=>{return e=n.id,t=n.restaurantName,Pe(e),ze(t),void Se(!0);var e,t},children:"Cancel Subscription"})]})]},n.id))})]})]}),de&&(0,x.jsxs)(i.aF,{isOpen:!0,onClose:()=>ce(!1),title:"Add New Subscription",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(b,{variant:"secondary",onClick:()=>ce(!1),children:e("admin:subscriptionsPage.cancel")}),(0,x.jsx)(b,{variant:"primary",onClick:async()=>{if(ye)try{const e=(null===n||void 0===n?void 0:n.managerId)||(null===n||void 0===n?void 0:n.id)||"2",t=await fetch(`${s.JR}/api/restaurants/subscriptions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({restaurantId:ye,managerId:e,planType:be,billingCycle:je,paymentModel:Ce})});if(t.ok){await t.json();const n=await fetch(`${s.JR}/api/restaurants/subscriptions/manager/${e}`);if(n.ok){const e=(await n.json()).map(e=>({...e,features:ie(e.planType)}));a(e)}const r=await fetch(`${s.JR}/api/restaurants/available/${e}`);if(r.ok){const e=await r.json();ge(e)}ce(!1),fe(""),ve("basic"),Fe("monthly"),ke("manager")}else{const e=await t.json();Te(`Failed to add subscription: ${e.error}`)}}catch(e){console.error("Error adding subscription:",e),Te("Error adding subscription. Please try again.")}else Te("Please select a restaurant")},children:e("admin:subscriptionsPage.addSubscription")})]}),children:[(0,x.jsx)(W,{style:{marginBottom:"20px"},children:e("admin:subscriptionsPage.connectARestaurantToASubscriptionPlan")}),(0,x.jsxs)(V,{children:[(0,x.jsx)(H,{children:e("admin:subscriptionsPage.selectRestaurant")}),(0,x.jsxs)(K,{value:ye,onChange:e=>fe(e.target.value),children:[(0,x.jsx)("option",{value:"",children:e("admin:subscriptionsPage.chooseARestaurant")}),me.map(e=>(0,x.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)(H,{children:e("admin:subscriptionsPage.selectPlan")}),(0,x.jsx)(q,{children:we.filter(e=>"restaurant"===e.plan_target&&e.is_active).map(e=>{var n;return(0,x.jsxs)(X,{selected:be===e.name,onClick:()=>ve(e.name),children:[(0,x.jsx)(Z,{children:e.display_name}),(0,x.jsxs)(ee,{children:[(0,l.m9)(e,(0,l.Wh)(re)),"/month"]}),(0,x.jsxs)(ne,{children:[(0,x.jsxs)("li",{children:[-1===e.order_limit?"Unlimited":`Up to ${null===(n=e.order_limit)||void 0===n?void 0:n.toLocaleString()}`," orders/month"]}),(0,x.jsxs)("li",{children:[-1===e.staff_limit?"Unlimited":`${e.staff_limit}`," staff accounts"]}),Array.isArray(e.features)&&e.features.slice(0,2).map((e,n)=>(0,x.jsx)("li",{children:e},n))]})]},e.id)})})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)(H,{children:e("admin:subscriptionsPage.billingCycle")}),(0,x.jsxs)(q,{children:[(0,x.jsxs)(G,{children:[(0,x.jsx)(Q,{type:"radio",name:"billing",checked:"monthly"===je,onChange:()=>Fe("monthly")}),"Monthly Billing"]}),(0,x.jsxs)(G,{children:[(0,x.jsx)(Q,{type:"radio",name:"billing",checked:"annual"===je,onChange:()=>Fe("annual")}),"Annual Billing"]})]})]}),(0,x.jsxs)(V,{children:[(0,x.jsx)(H,{children:e("admin:subscriptionsPage.paymentModel")}),(0,x.jsxs)(q,{children:[(0,x.jsxs)(G,{children:[(0,x.jsx)(Q,{type:"radio",name:"payment",checked:"manager"===Ce,onChange:()=>ke("manager")}),"Manager Pays (You handle payment)"]}),(0,x.jsxs)(G,{children:[(0,x.jsx)(Q,{type:"radio",name:"payment",checked:"self"===Ce,onChange:()=>ke("self")}),"Restaurant Self-Pay"]})]})]})]}),pe&&(0,x.jsxs)(i.aF,{isOpen:!0,onClose:()=>ue(!1),title:"Change Subscription Plan",footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(b,{variant:"secondary",onClick:()=>ue(!1),children:e("admin:subscriptionsPage.cancel")}),(0,x.jsx)(b,{variant:"primary",onClick:()=>{if(!xe)return;const e=we.find(e=>{var n;return e.name===be||(null===(n=e.display_name)||void 0===n?void 0:n.toLowerCase().includes(be))}),n=(0,l.Wh)(xe.currency||re||"MYR"),r=e?(0,l.jL)(e,n,"monthly"):0,i=e?(0,l.jL)(e,n,"annual"):0,o=(null===e||void 0===e?void 0:e.order_limit)||-1;a(t.map(e=>e.id===xe.id?{...e,planType:be,monthlyFee:r,annualFee:i,orderLimit:o,nextPayment:new Date(Date.now()+2592e6).toISOString().split("T")[0]}:e)),ue(!1),he(null)},disabled:(null===xe||void 0===xe?void 0:xe.planType)===be,children:e("admin:subscriptionsPage.confirmChange")})]}),children:[(0,x.jsxs)(W,{style:{marginBottom:"20px"},children:[null===xe||void 0===xe?void 0:xe.restaurantName," - Current: ",null===xe||void 0===xe?void 0:xe.planType]}),(0,x.jsxs)(V,{children:[(0,x.jsx)(H,{children:e("admin:subscriptionsPage.selectNewPlan")}),(0,x.jsx)(q,{children:we.filter(e=>"restaurant"===e.plan_target&&e.is_active).map(e=>{var n;return(0,x.jsxs)(X,{selected:be===e.name,onClick:()=>ve(e.name),children:[(0,x.jsx)(Z,{children:e.display_name}),(0,x.jsxs)(ee,{children:[(0,l.m9)(e,(0,l.Wh)(re)),"/month"]}),(0,x.jsxs)(ne,{children:[(0,x.jsxs)("li",{children:[-1===e.order_limit?"Unlimited":`Up to ${null===(n=e.order_limit)||void 0===n?void 0:n.toLocaleString()}`," orders/month"]}),(0,x.jsxs)("li",{children:[-1===e.staff_limit?"Unlimited":`${e.staff_limit}`," staff accounts"]}),Array.isArray(e.features)&&e.features.slice(0,2).map((e,n)=>(0,x.jsx)("li",{children:e},n))]})]},e.id)})})]}),(0,x.jsxs)("div",{style:{padding:"16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,x.jsx)("strong",{style:{color:"#92400E"},children:"Important:"}),(0,x.jsxs)("p",{style:{color:"#92400E",fontSize:"14px",margin:"4px 0 0 0"},children:["Plan changes will take effect from the next billing cycle.",(null===xe||void 0===xe?void 0:xe.planType)===be&&" (No change selected)"]})]})]}),Re&&(0,x.jsxs)("div",{style:{position:"fixed",bottom:24,right:24,zIndex:9999,background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:8,padding:"12px 20px",color:"#DC2626",fontSize:14,fontWeight:500,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",display:"flex",alignItems:"center",gap:12},children:[(0,x.jsx)("span",{children:Re}),(0,x.jsx)("button",{onClick:()=>Te(""),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontWeight:700,fontSize:16},children:"x"})]}),(0,x.jsx)(c.A,{isOpen:Ee,title:"Cancel Subscription",message:`Are you sure you want to cancel the subscription for ${$e}? This action will end the subscription at the current billing cycle, disable access to premium features, and cannot be undone.`,onConfirm:()=>{Se(!1),a(t.map(e=>e.id===Be?{...e,status:"cancelled"}:e)),Pe(""),ze("")},onCancel:()=>{Se(!1),Pe(""),ze("")},confirmText:"Cancel Subscription",cancelText:"Keep Subscription",type:"danger"})]})}},4021:(e,n,t)=>{t.d(n,{i1:()=>s});var r=t(9950),a=t(1367),i=t(6038),o=t(9955);const s=()=>{const{user:e}=(0,a.As)(),[n,t]=(0,r.useState)("RM"),[s]=(0,r.useState)(Object.keys(i.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let a=r>=0?n[r+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return t("RM"),void d(!1);try{const e=(0,o.c4)(),n=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"MYR";t(r)}else t("MYR")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),t("MYR")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:l,error:c}}},7617:(e,n,t)=>{t.d(n,{A:()=>x});t(9950);var r=t(7119),a=t(4752),i=t(9610),o=t(4414);const s=a.Ay.div`
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