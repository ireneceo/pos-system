"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[3543],{3543:(e,n,r)=>{r.r(n),r.d(n,{default:()=>ae});var t=r(9950),i=r(4752),a=r(1367),o=r(6910),s=r(6038),l=r(4021),d=r(7617),c=r(4414);const p=i.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,x=i.Ay.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`,h=i.Ay.div`
  position: sticky;
  top: 0;
  z-index: 100;
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
`,u=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`,m=i.Ay.div`
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
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n      transform: translateY(-1px);\n    }\n  ":"\n    background: white;\n    color: #374151;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      border-color: #635BFF;\n    }\n  "}
`,y=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,f=i.Ay.div`
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
`,b=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,j=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,v=i.Ay.div`
  font-size: 12px;
  color: ${e=>e.positive?"#059669":"#DC2626"};
  font-weight: 500;
  margin-top: 4px;
`,F=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 24px;
`,w=i.Ay.div`
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
`,A=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,C=i.Ay.div`
  flex: 1;
`,k=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`,E=i.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#FEF3C7";case"expired":return"#FEE2E2";case"suspended":default:return"#F3F4F6";case"cancelled":return"#FEF2F2"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#D97706";case"expired":case"cancelled":return"#DC2626";default:return"#6B7280"}}};
`,S=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
`,B=i.Ay.div``,z=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
`,$=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 2px;
`,P=i.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
`,T=i.Ay.div`
  margin: 16px 0;
  padding: 12px;
  background: ${e=>"self"===e.model?"#FEF3C7":"#E0F2FE"};
  border-radius: 8px;
  border: 1px solid ${e=>"self"===e.model?"#F59E0B":"#0EA5E9"};
`,D=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`,M=i.Ay.div`
  font-size: 14px;
  color: ${e=>"self"===e.model?"#92400E":"#0C4A6E"};
`,R=i.Ay.div`
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
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    border-color: #635BFF;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"danger"===e.variant?"\n    background: transparent;\n    color: #DC2626;\n    border-color: #FCA5A5;\n    \n    &:hover {\n      background: #FEE2E2;\n    }\n  ":"warning"===e.variant?"\n    background: transparent;\n    color: #D97706;\n    border-color: #FCD34D;\n    \n    &:hover {\n      background: #FEF3C7;\n    }\n  ":"\n    background: transparent;\n    color: #6B7280;\n    border-color: #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,U=i.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
`,L=i.Ay.div``,I=i.Ay.div`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`,N=i.Ay.div`
  font-size: 13px;
  font-weight: 500;
  color: #374151;
`,J=i.Ay.div`
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
`,_=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`,Y=i.Ay.div`
  margin-bottom: 24px;
`,V=i.Ay.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,W=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
`,H=i.Ay.div`
  margin-bottom: 20px;
`,K=i.Ay.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`,q=i.Ay.select`
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
`,G=i.Ay.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`,Q=i.Ay.label`
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
`,X=i.Ay.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
`,Z=i.Ay.div`
  padding: 16px;
  border: 2px solid ${e=>e.selected?"#635BFF":"#E6EBF1"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${e=>e.selected?"#F8F9FF":"white"};
  
  &:hover {
    border-color: #635BFF;
  }
`,ee=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  text-transform: capitalize;
  margin-bottom: 4px;
`,ne=i.Ay.div`
  font-size: 20px;
  font-weight: 700;
  color: #059669;
  margin-bottom: 8px;
`,re=i.Ay.ul`
  font-size: 12px;
  color: #6B7280;
  margin: 0;
  padding-left: 20px;
`,te=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,ie=i.Ay.button`
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  
  ${e=>"primary"===e.variant?"\n    background: #635BFF;\n    color: white;\n    \n    &:hover {\n      background: #5A51E6;\n    }\n  ":"\n    background: white;\n    color: #6B7280;\n    border: 1px solid #E6EBF1;\n    \n    &:hover {\n      background: #F8FAFC;\n      color: #0A2540;\n    }\n  "}
`,ae=()=>{const{user:e}=(0,a.As)(),[n,r]=(0,t.useState)([]),{defaultCurrency:i}=(0,l.i1)(),[ae,oe]=(0,t.useState)("RM");(0,t.useEffect)(()=>{i&&oe(i)},[i]),(0,t.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",t=await fetch(`${o.JR}/api/restaurants/subscriptions/manager/${n}`);if(t.ok){const e=(await t.json()).map(e=>({...e,features:se(e.planType)}));r(e)}else console.error("Failed to fetch subscriptions")}catch(n){console.error("Error fetching subscriptions:",n)}})()},[e]);const se=e=>{switch(e){case"basic":return["Up to 1k Orders/month","Basic Analytics","Community Support"];case"professional":return["Up to 10k Orders/month","Standard Analytics","Email Support","Staff Management"];case"enterprise":return["Unlimited Orders","Advanced Analytics","Priority Support","Custom Branding"];default:return[]}},le=n.filter(e=>"active"===e.status).length,de=n.filter(e=>"manager"===e.paymentModel&&"active"===e.status).reduce((e,n)=>e+("monthly"===n.billingCycle?n.monthlyFee:n.annualFee/12),0),ce=n.filter(e=>"self"===e.paymentModel).length,[pe,xe]=(n.filter(e=>"trial"===e.status).length,(0,t.useState)(!1)),[he,ue]=(0,t.useState)(!1),[me,ge]=(0,t.useState)(null),[ye,fe]=(0,t.useState)([]);(0,t.useEffect)(()=>{console.log("\ud83c\udf7d\ufe0f availableRestaurants state changed:",ye)},[ye]);const[be,je]=(0,t.useState)(""),[ve,Fe]=(0,t.useState)("basic"),[we,Ae]=(0,t.useState)("monthly"),[Ce,ke]=(0,t.useState)("manager"),[Ee,Se]=(0,t.useState)(!1),[Be,ze]=(0,t.useState)(""),[$e,Pe]=(0,t.useState)(""),[Te,De]=(0,t.useState)("");(0,t.useEffect)(()=>{e&&(async()=>{try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2";console.log("\ud83d\udd0d Fetching available restaurants for manager:",n);const r=await fetch(`${o.JR}/api/restaurants/available/${n}`);if(console.log("\ud83d\udce1 Response status:",r.status),r.ok){const e=await r.json();console.log("\ud83d\udce6 Available restaurants data:",e),fe(e)}else console.error("Failed to fetch available restaurants"),fe([])}catch(n){console.error("Error fetching available restaurants:",n),fe([])}})()},[e]);return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(p,{children:[(0,c.jsxs)(h,{children:[(0,c.jsx)(u,{children:"Subscriptions"}),(0,c.jsxs)(m,{children:[(0,c.jsx)(g,{variant:"secondary",onClick:()=>{(new Date).toISOString(),null===e||void 0===e||e.name,n.length,n.map(e=>({restaurantName:e.restaurantName,location:e.location,planType:e.planType,status:e.status,paymentModel:e.paymentModel,billingCycle:e.billingCycle,monthlyFee:e.monthlyFee,annualFee:e.annualFee,startDate:e.startDate,nextPayment:e.nextPayment,currentOrders:e.currentOrders,orderLimit:-1===e.orderLimit?"Unlimited":e.orderLimit}));const r=n.map(e=>[e.restaurantName,e.location,e.planType,e.status,e.paymentModel,e.billingCycle,e.monthlyFee,e.annualFee,e.startDate,e.nextPayment,e.currentOrders,-1===e.orderLimit?"Unlimited":e.orderLimit]),t=[["Restaurant","Location","Plan","Status","Payment Model","Billing Cycle","Monthly Fee","Annual Fee","Start Date","Next Payment","Current Orders","Order Limit"].join(","),...r.map(e=>e.join(","))].join("\n"),i=new Blob([t],{type:"text/csv"}),a=URL.createObjectURL(i),o=document.createElement("a");o.href=a,o.download=`subscriptions-${(new Date).toISOString().split("T")[0]}.csv`,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(a)},children:"Export Data"}),(0,c.jsx)(g,{variant:"primary",onClick:()=>xe(!0),children:"Add Subscription"})]})]}),(0,c.jsxs)(x,{children:[(0,c.jsxs)(y,{children:[(0,c.jsxs)(f,{color:"#059669",children:[(0,c.jsx)(b,{children:n.length}),(0,c.jsx)(j,{children:"Total Restaurants"}),(0,c.jsx)(v,{positive:!0,children:"Under your management"})]}),(0,c.jsxs)(f,{color:"#2563EB",children:[(0,c.jsx)(b,{children:le}),(0,c.jsx)(j,{children:"Active Subscriptions"}),(0,c.jsxs)(v,{positive:!0,children:[Math.round(le/n.length*100),"% operational"]})]}),(0,c.jsxs)(f,{color:"#7C3AED",children:[(0,c.jsx)(b,{children:(0,s.vv)(de)}),(0,c.jsx)(j,{children:"Your Monthly Payment"}),(0,c.jsx)(v,{positive:!0,children:"Manager-paid restaurants only"})]}),(0,c.jsxs)(f,{color:"#D97706",children:[(0,c.jsx)(b,{children:ce}),(0,c.jsx)(j,{children:"Self-Paying Restaurants"}),(0,c.jsx)(v,{positive:!0,children:"Direct billing to restaurant"})]})]}),(0,c.jsx)(F,{children:n.map(e=>(0,c.jsxs)(w,{children:[(0,c.jsxs)(A,{children:[(0,c.jsx)(C,{children:(0,c.jsxs)(k,{children:[e.restaurantName," ",e.currency&&(0,c.jsx)("span",{style:{fontSize:"11px",fontWeight:500,color:"#635BFF",background:"#F0EDFF",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",verticalAlign:"middle"},children:e.currency})]})}),(0,c.jsx)(E,{status:e.status,children:e.status})]}),(0,c.jsxs)(S,{children:[(0,c.jsxs)(B,{children:[(0,c.jsx)(z,{children:e.planType}),(0,c.jsx)($,{children:"monthly"===e.billingCycle?"Monthly billing":"Annual billing"})]}),(0,c.jsxs)(P,{children:[e.discountType&&"none"!==e.discountType&&(e.discountValue||0)>0?(0,c.jsxs)("div",{style:{textAlign:"right"},children:[(0,c.jsx)("div",{style:{textDecoration:"line-through",color:"#9CA3AF",fontSize:"12px",fontWeight:400},children:(0,s.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee)}),(0,c.jsx)("div",{style:{color:"#15803D"},children:(0,s.vv)(("monthly"===e.billingCycle?e.monthlyFee:e.annualFee)*("percentage"===e.discountType?1-(e.discountValue||0)/100:1)-("fixed"===e.discountType&&e.discountValue||0))})]}):(0,c.jsx)(c.Fragment,{children:(0,s.vv)("monthly"===e.billingCycle?e.monthlyFee:e.annualFee)}),"annual"===e.billingCycle&&(0,c.jsx)("span",{style:{fontSize:"12px",color:"#6B7280"},children:"/year"})]})]}),(0,c.jsxs)(T,{model:e.paymentModel,children:[(0,c.jsx)(D,{model:e.paymentModel,children:"self"===e.paymentModel?"Self-Paying":"Manager-Paid"}),(0,c.jsx)(M,{model:e.paymentModel,children:"self"===e.paymentModel?"Restaurant pays directly":"You handle payment for this restaurant"})]}),(0,c.jsxs)(U,{children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(I,{children:"Start Date"}),(0,c.jsx)(N,{children:e.startDate})]}),(0,c.jsxs)(L,{children:[(0,c.jsx)(I,{children:"Next Payment"}),(0,c.jsx)(N,{children:e.nextPayment})]})]}),(0,c.jsxs)(R,{children:[(0,c.jsx)(O,{variant:"primary",onClick:()=>window.open(`/manager/reports?restaurant=${e.restaurantId}`,"_blank"),children:"View Reports"}),(0,c.jsxs)(O,{variant:"warning",onClick:()=>{const t="self"===e.paymentModel?"manager":"self";(async(e,t)=>{const i=e.replace("sub-",""),a="manager"===t?"brand_manager":"restaurant";try{const s=localStorage.getItem("auth_token");if(!(await fetch(`${o.JR}/api/restaurants/${i}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({payment_model:a})})).ok)throw new Error("Failed to update payment model");(await fetch(`${o.JR}/api/invoices/update-payer/${i}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({payment_model:a})})).ok||console.warn("Failed to update invoice payers, but restaurant payment model was updated"),r(n.map(n=>n.id===e?{...n,paymentModel:t,payerId:"manager"===t?n.managerId:n.restaurantId,payerName:"manager"===t?n.managerName:"Restaurant Owner"}:n))}catch(s){console.error("Error switching payment model:",s),De("Failed to switch payment model. Please try again.")}})(e.id,t)},children:["Switch to ","self"===e.paymentModel?"Manager-Pay":"Self-Pay"]}),(0,c.jsx)(O,{onClick:()=>(e=>{ge(e),Fe(e.planType),ue(!0)})(e),children:"enterprise"===e.planType?"Change Plan":"Upgrade/Downgrade"}),"cancelled"!==e.status&&(0,c.jsx)(O,{variant:"danger",onClick:()=>{return n=e.id,r=e.restaurantName,ze(n),Pe(r),void Se(!0);var n,r},children:"Cancel Subscription"})]})]},e.id))})]})]}),(0,c.jsx)(J,{show:pe,children:(0,c.jsxs)(_,{children:[(0,c.jsxs)(Y,{children:[(0,c.jsx)(V,{children:"Add New Subscription"}),(0,c.jsx)(W,{children:"Connect a restaurant to a subscription plan"})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Select Restaurant"}),(0,c.jsxs)(q,{value:be,onChange:e=>je(e.target.value),children:[(0,c.jsx)("option",{value:"",children:"Choose a restaurant..."}),ye.map(e=>(0,c.jsxs)("option",{value:e.id,children:[e.name," - ",e.location]},e.id))]})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Select Plan"}),(0,c.jsxs)(G,{children:[(0,c.jsxs)(Z,{selected:"basic"===ve,onClick:()=>Fe("basic"),children:[(0,c.jsx)(ee,{children:"Basic"}),(0,c.jsxs)(ne,{children:[(0,s.vv)(29,ae),"/month"]}),(0,c.jsxs)(re,{children:[(0,c.jsx)("li",{children:"Up to 1,000 orders/month"}),(0,c.jsx)("li",{children:"Basic analytics"}),(0,c.jsx)("li",{children:"5 staff accounts"})]})]}),(0,c.jsxs)(Z,{selected:"professional"===ve,onClick:()=>Fe("professional"),children:[(0,c.jsx)(ee,{children:"Professional"}),(0,c.jsxs)(ne,{children:[(0,s.vv)(99,ae),"/month"]}),(0,c.jsxs)(re,{children:[(0,c.jsx)("li",{children:"Up to 10,000 orders/month"}),(0,c.jsx)("li",{children:"Advanced analytics"}),(0,c.jsx)("li",{children:"Unlimited staff accounts"})]})]}),(0,c.jsxs)(Z,{selected:"enterprise"===ve,onClick:()=>Fe("enterprise"),children:[(0,c.jsx)(ee,{children:"Enterprise"}),(0,c.jsxs)(ne,{children:[(0,s.vv)(199,ae),"/month"]}),(0,c.jsxs)(re,{children:[(0,c.jsx)("li",{children:"Unlimited orders"}),(0,c.jsx)("li",{children:"Custom analytics"}),(0,c.jsx)("li",{children:"Priority support"})]})]})]})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Billing Cycle"}),(0,c.jsxs)(G,{children:[(0,c.jsxs)(Q,{children:[(0,c.jsx)(X,{type:"radio",name:"billing",checked:"monthly"===we,onChange:()=>Ae("monthly")}),"Monthly Billing"]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(X,{type:"radio",name:"billing",checked:"annual"===we,onChange:()=>Ae("annual")}),"Annual Billing (Save 17%)"]})]})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Payment Model"}),(0,c.jsxs)(G,{children:[(0,c.jsxs)(Q,{children:[(0,c.jsx)(X,{type:"radio",name:"payment",checked:"manager"===Ce,onChange:()=>ke("manager")}),"Manager Pays (You handle payment)"]}),(0,c.jsxs)(Q,{children:[(0,c.jsx)(X,{type:"radio",name:"payment",checked:"self"===Ce,onChange:()=>ke("self")}),"Restaurant Self-Pay"]})]})]}),(0,c.jsxs)(te,{children:[(0,c.jsx)(ie,{variant:"secondary",onClick:()=>xe(!1),children:"Cancel"}),(0,c.jsx)(ie,{variant:"primary",onClick:async()=>{if(be)try{const n=(null===e||void 0===e?void 0:e.managerId)||(null===e||void 0===e?void 0:e.id)||"2",t=await fetch(`${o.JR}/api/restaurants/subscriptions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({restaurantId:be,managerId:n,planType:ve,billingCycle:we,paymentModel:Ce})});if(t.ok){await t.json();const e=await fetch(`${o.JR}/api/restaurants/subscriptions/manager/${n}`);if(e.ok){const n=(await e.json()).map(e=>({...e,features:se(e.planType)}));r(n)}const i=await fetch(`${o.JR}/api/restaurants/available/${n}`);if(i.ok){const e=await i.json();fe(e)}xe(!1),je(""),Fe("basic"),Ae("monthly"),ke("manager")}else{const e=await t.json();De(`Failed to add subscription: ${e.error}`)}}catch(n){console.error("Error adding subscription:",n),De("Error adding subscription. Please try again.")}else De("Please select a restaurant")},children:"Add Subscription"})]})]})}),(0,c.jsx)(J,{show:he,children:(0,c.jsxs)(_,{children:[(0,c.jsxs)(Y,{children:[(0,c.jsx)(V,{children:"Change Subscription Plan"}),(0,c.jsxs)(W,{children:[null===me||void 0===me?void 0:me.restaurantName," - Current: ",null===me||void 0===me?void 0:me.planType]})]}),(0,c.jsxs)(H,{children:[(0,c.jsx)(K,{children:"Select New Plan"}),(0,c.jsxs)(G,{children:[(0,c.jsxs)(Z,{selected:"basic"===ve,onClick:()=>Fe("basic"),children:[(0,c.jsx)(ee,{children:"Basic"}),(0,c.jsxs)(ne,{children:[(0,s.vv)(29,ae),"/month"]}),(0,c.jsxs)(re,{children:[(0,c.jsx)("li",{children:"Up to 1,000 orders/month"}),(0,c.jsx)("li",{children:"Basic analytics"}),(0,c.jsx)("li",{children:"5 staff accounts"})]})]}),(0,c.jsxs)(Z,{selected:"professional"===ve,onClick:()=>Fe("professional"),children:[(0,c.jsx)(ee,{children:"Professional"}),(0,c.jsxs)(ne,{children:[(0,s.vv)(99,ae),"/month"]}),(0,c.jsxs)(re,{children:[(0,c.jsx)("li",{children:"Up to 10,000 orders/month"}),(0,c.jsx)("li",{children:"Advanced analytics"}),(0,c.jsx)("li",{children:"Unlimited staff accounts"})]})]}),(0,c.jsxs)(Z,{selected:"enterprise"===ve,onClick:()=>Fe("enterprise"),children:[(0,c.jsx)(ee,{children:"Enterprise"}),(0,c.jsxs)(ne,{children:[(0,s.vv)(199,ae),"/month"]}),(0,c.jsxs)(re,{children:[(0,c.jsx)("li",{children:"Unlimited orders"}),(0,c.jsx)("li",{children:"Custom analytics"}),(0,c.jsx)("li",{children:"Priority support"})]})]})]})]}),(0,c.jsxs)("div",{style:{padding:"16px",background:"#FEF3C7",borderRadius:"8px",marginBottom:"16px"},children:[(0,c.jsx)("strong",{style:{color:"#92400E"},children:"Important:"}),(0,c.jsxs)("p",{style:{color:"#92400E",fontSize:"14px",margin:"4px 0 0 0"},children:["Plan changes will take effect from the next billing cycle.",(null===me||void 0===me?void 0:me.planType)===ve&&" (No change selected)"]})]}),(0,c.jsxs)(te,{children:[(0,c.jsx)(ie,{variant:"secondary",onClick:()=>ue(!1),children:"Cancel"}),(0,c.jsx)(ie,{variant:"primary",onClick:()=>{if(!me)return;const e={basic:{monthly:29,annual:290,orderLimit:1e3},professional:{monthly:99,annual:990,orderLimit:1e4},enterprise:{monthly:199,annual:2190,orderLimit:-1}};r(n.map(n=>n.id===me.id?{...n,planType:ve,monthlyFee:e[ve].monthly,annualFee:e[ve].annual,orderLimit:e[ve].orderLimit,nextPayment:new Date(Date.now()+2592e6).toISOString().split("T")[0]}:n)),ue(!1),ge(null)},disabled:(null===me||void 0===me?void 0:me.planType)===ve,children:"Confirm Change"})]})]})}),Te&&(0,c.jsxs)("div",{style:{position:"fixed",bottom:24,right:24,zIndex:9999,background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:8,padding:"12px 20px",color:"#DC2626",fontSize:14,fontWeight:500,boxShadow:"0 4px 12px rgba(0,0,0,0.1)",display:"flex",alignItems:"center",gap:12},children:[(0,c.jsx)("span",{children:Te}),(0,c.jsx)("button",{onClick:()=>De(""),style:{background:"none",border:"none",color:"#DC2626",cursor:"pointer",fontWeight:700,fontSize:16},children:"x"})]}),(0,c.jsx)(d.A,{isOpen:Ee,title:"Cancel Subscription",message:`Are you sure you want to cancel the subscription for ${$e}? This action will end the subscription at the current billing cycle, disable access to premium features, and cannot be undone.`,onConfirm:()=>{Se(!1),r(n.map(e=>e.id===Be?{...e,status:"cancelled"}:e)),ze(""),Pe("")},onCancel:()=>{Se(!1),ze(""),Pe("")},confirmText:"Cancel Subscription",cancelText:"Keep Subscription",type:"danger"})]})}},4021:(e,n,r)=>{r.d(n,{i1:()=>o});var t=r(9950),i=r(1367),a=r(6038);const o=()=>{const{user:e}=(0,i.As)(),[n,r]=(0,t.useState)("RM"),[o]=(0,t.useState)(Object.keys(a.DL)),[s,l]=(0,t.useState)(!0),[d,c]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),t=n.indexOf("restaurant");let i=t>=0?n[t+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return r("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var a;const e=await n.json(),t=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";r(t)}else r("RM")}catch(o){console.error("Failed to fetch restaurant currency:",o),c("Failed to load currency settings"),r("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:o,loading:s,error:d}}},7617:(e,n,r)=>{r.d(n,{A:()=>x});r(9950);var t=r(4752),i=r(9610),a=r(4414);const o=t.Ay.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
`,s=t.Ay.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
`,l=t.Ay.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`,d=t.Ay.p`
  font-size: 14px;
  color: #6B7C93;
  line-height: 1.5;
  margin: 0;
`,c=t.Ay.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`,p=t.Ay.button`
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
`,x=e=>{let{isOpen:n,title:r,message:t,onConfirm:x,onCancel:h,confirmText:u="Confirm",cancelText:m="Cancel",type:g="warning"}=e;return n?(0,a.jsx)(i.mH,{onClick:e=>{e.target===e.currentTarget&&h()},children:(0,a.jsxs)(o,{onClick:e=>e.stopPropagation(),children:[(0,a.jsxs)(s,{children:[(0,a.jsx)(l,{children:r}),(0,a.jsx)(d,{children:t})]}),(0,a.jsxs)(c,{children:[(0,a.jsx)(p,{variant:"secondary",onClick:h,children:m}),(0,a.jsx)(p,{variant:"primary",type:g,onClick:x,children:u})]})]})}):null}}}]);