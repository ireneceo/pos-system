"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[2890],{2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var r=t(4752),a=t(4414);const i=r.Ay.div`
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
`,s=r.Ay.input`
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
`,o=r.Ay.select`
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
`,l=e=>{let{children:n,className:t,style:r,...s}=e;return(0,a.jsx)(i,{className:t,style:r,...s,children:n})},d=e=>{let{placeholder:n="Search...",...t}=e;return(0,a.jsx)(s,{placeholder:n,...t})},c=e=>{let{children:n,...t}=e;return(0,a.jsx)(o,{...t,children:n})}},2890:(e,n,t)=>{t.r(n),t.d(n,{default:()=>ee});var r=t(9950),a=t(4752),i=t(3310),s=t(1367),o=t(6910),l=t(6038),d=t(4021),c=t(3705),p=t(2488),x=t(2674),h=t(4414);const u=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  gap: 24px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,g=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); border-color: #EA580C; }
`,m=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,v=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
`,j=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,f=a.Ay.span`
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  ${e=>{switch(e.variant){case"green":return"background: #ECFDF5; color: #059669;";case"yellow":return"background: #FEF3C7; color: #D97706;";case"red":return"background: #FEE2E2; color: #DC2626;";case"blue":return"background: #DBEAFE; color: #2563EB;";case"purple":return"background: #EDE9FE; color: #7C3AED;";case"orange":return"background: #FFEDD5; color: #EA580C;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,y=a.Ay.div`
  padding: 16px;
  background: #FFF7ED;
  border-radius: 8px;
  margin-bottom: 16px;
`,b=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,w=a.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #6B7280;
  padding: 4px 0;
  & + & { border-top: 1px solid #FED7AA; }
`,F=a.Ay.span`
  color: #6B7280;
`,A=a.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,_=a.Ay.div`
  padding: 16px;
  background: #F0FDF4;
  border-radius: 8px;
  border: 1px solid #BBF7D0;
  margin-bottom: 16px;
`,C=a.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,E=a.Ay.div`
  font-size: 22px;
  font-weight: 700;
  color: #059669;
`,k=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,S=a.Ay.div`
  padding: 16px;
  background: #FFF7ED;
  border-radius: 8px;
  border: 1px solid #FED7AA;
  margin-bottom: 16px;
`,B=a.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #C2410C;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,D=a.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 4px 0;
  color: #6B7280;
`,z=a.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 700;
  padding-top: 8px;
  margin-top: 8px;
  border-top: 2px solid #FDBA74;
  color: #C2410C;
`,M=a.Ay.div`
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,T=a.Ay.div``,P=a.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,R=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,O=a.Ay.div`
  padding: 12px 16px;
  background: #F9FAFB;
  border: 1px dashed #D1D5DB;
  border-radius: 8px;
  text-align: center;
  color: #9CA3AF;
  font-size: 14px;
  margin-bottom: 16px;
`,$=a.Ay.div`
  text-align: center;
  padding: 60px 40px;
  color: #9CA3AF;
`,I=a.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,N=a.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`,L=a.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,U=a.Ay.div`
  display: ${e=>e.show?"flex":"none"};
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 0;
`,W=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 560px;
  width: 90%;
  flex-shrink: 0;
`,G=a.Ay.h2`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,J=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,Y=a.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,Q=a.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,H=(0,a.Ay)(x.A0)`
  @media (max-width: 1200px) {
    & > span:nth-child(5), & > span:nth-child(6) { display: none; }
  }
  @media (max-width: 900px) {
    & > span:nth-child(3), & > span:nth-child(4), & > span:nth-child(5), & > span:nth-child(6) { display: none; }
  }
`,X=(0,a.Ay)(x.Hj)`
  @media (max-width: 1200px) {
    & > div:nth-child(5), & > div:nth-child(6) { display: none; }
  }
  @media (max-width: 900px) {
    & > div:nth-child(3), & > div:nth-child(4), & > div:nth-child(5), & > div:nth-child(6) { display: none; }
  }
`,q=a.Ay.div`
  font-weight: 600; color: #0A2540; font-size: 14px;
`,K=a.Ay.div`
  font-size: 12px; color: #9CA3AF; margin-top: 2px;
`,V=a.Ay.span`
  display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; text-transform: capitalize;
  ${e=>{switch(e.planType){case"basic":default:return"background: #F3F4F6; color: #374151;";case"professional":return"background: #EDE9FE; color: #7C3AED;";case"enterprise":return"background: #FEF3C7; color: #92400E;"}}}
`,Z=a.Ay.span`
  display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600;
  ${e=>{switch(e.status){case"active":return"background: #ECFDF5; color: #059669;";case"trial":return"background: #DBEAFE; color: #2563EB;";case"expired":return"background: #FEE2E2; color: #DC2626;";case"suspended":return"background: #FEF3C7; color: #D97706;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,ee=()=>{const{user:e}=(0,s.As)(),{defaultCurrency:n}=(0,d.i1)(),[t,a]=(0,r.useState)(null),[ee,ne]=(0,r.useState)("foodcourt_plans"),[te,re]=(0,r.useState)(!0),[ae,ie]=(0,r.useState)(!1),[se,oe]=(0,r.useState)([]),[le,de]=(0,r.useState)(!1),[ce,pe]=(0,r.useState)(null),[xe,he]=(0,r.useState)(!1),[ue,ge]=(0,r.useState)([]),[me,ve]=(0,r.useState)(!1),[je,fe]=(0,r.useState)(""),[ye,be]=(0,r.useState)("all"),[we,Fe]=(0,r.useState)("all"),[Ae,_e]=(0,r.useState)(""),[Ce,Ee]=(0,r.useState)(""),[ke,Se]=(0,r.useState)("all"),Be=localStorage.getItem("auth_token");(0,r.useEffect)(()=>{null!==e&&void 0!==e&&e.foodcourt_id&&a(Number(e.foodcourt_id))},[e]);const De=(0,r.useCallback)(async()=>{if(t){re(!0);try{const e=await fetch(`${o.JR}/api/foodcourts/${t}/subscriptions`,{headers:{Authorization:`Bearer ${Be}`}});if(e.ok){const n=await e.json();oe(n.data||[])}}catch(e){console.error("Error fetching foodcourt subscriptions:",e)}finally{re(!1)}}},[t,Be]);(0,r.useEffect)(()=>{De()},[De]);const ze=(0,r.useCallback)(async()=>{if(Be){ve(!0);try{const e=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${Be}`}});if(e.ok){const n=await e.json(),t=(Array.isArray(n)?n:[]).map(e=>{var n,t;const r=(null===(n=e.plan_type)||void 0===n?void 0:n.toLowerCase().replace(" plan",""))||"basic";let a="active";return"trial"===e.status?a="trial":"inactive"===e.status||"suspended"===e.status?a="suspended":"expired"===e.status?a="expired":"cancelled"===e.status&&(a="cancelled"),{id:null===(t=e.id)||void 0===t?void 0:t.toString(),restaurantName:e.name||"Unknown",adminName:e.admin_name||e.managerName||"-",location:e.address||"-",planType:r,status:a,monthlyFee:parseFloat(e.plan_amount)||29,paymentModel:e.payment_model||"restaurant",startDate:e.subscription_start?new Date(e.subscription_start).toISOString().split("T")[0]:"-",endDate:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:"-",autoRenew:"active"===e.status}});ge(t)}}catch(e){console.error("Error fetching POS subscriptions:",e)}finally{ve(!1)}}},[Be]);(0,r.useEffect)(()=>{"pos_subscriptions"===ee&&ze()},[ee,ze]);const Me=se.length,Te=se.filter(e=>null!==e.plan).length,Pe=se.reduce((e,n)=>{var t;return e+((null===(t=n.current_month)||void 0===t?void 0:t.revenue)||0)},0),Re=se.reduce((e,n)=>{var t,r;return e+((null===(t=n.current_month)||void 0===t||null===(r=t.estimated_charges)||void 0===r?void 0:r.totalAmount)||0)},0),Oe=n||"MYR",$e=e=>{switch(e){case"paid":return"green";case"pending_payment":return"yellow";case"payment_submitted":return"blue";case"overdue":return"red";default:return"gray"}},Ie=ue.filter(e=>{const n=e.restaurantName.toLowerCase().includes(je.toLowerCase())||e.adminName.toLowerCase().includes(je.toLowerCase()),t="all"===ye||e.status===ye,r="all"===we||e.paymentModel===we;return n&&t&&r}),Ne=ue.filter(e=>"active"===e.status).length,Le=ue.filter(e=>"trial"===e.status).length,Ue=ue.filter(e=>"active"===e.status||"trial"===e.status).reduce((e,n)=>e+n.monthlyFee,0),We=se.filter(e=>{var n;const t=e.restaurant_name.toLowerCase().includes(Ce.toLowerCase())||(e.restaurant_email||"").toLowerCase().includes(Ce.toLowerCase())||((null===(n=e.plan)||void 0===n?void 0:n.name)||"").toLowerCase().includes(Ce.toLowerCase()),r="all"===ke||"with_plan"===ke&&null!==e.plan||"no_plan"===ke&&null===e.plan;return t&&r}),Ge=e=>e?new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"-";return(0,h.jsxs)(i.A,{children:[(0,h.jsxs)(x.mc,{children:[(0,h.jsxs)(x.Y9,{children:[(0,h.jsx)(x.hE,{children:"Subscriptions"}),(0,h.jsxs)(x.ex,{children:[(0,h.jsx)(c.cc,{variant:"outline",onClick:()=>{let e="";if("foodcourt_plans"===ee){const n=["Tenant","Email","Status","Plan","Management Fee","Revenue %","Rent Type","Billing","Monthly Revenue","Estimated Charges","Latest Invoice","Invoice Status"],t=(Ce||"all"!==ke?We:se).map(e=>{var n,t,r,a,i,s,o,l,d;return[`"${e.restaurant_name}"`,`"${e.restaurant_email||""}"`,e.restaurant_status,`"${(null===(n=e.plan)||void 0===n?void 0:n.name)||"No Plan"}"`,e.plan?parseFloat(e.plan.subscription_fee).toFixed(2):"0",e.plan?e.plan.revenue_percentage:"0",(null===(t=e.plan)||void 0===t?void 0:t.rent_type)||"none",(null===(r=e.plan)||void 0===r?void 0:r.billing_cycle)||"-",((null===(a=e.current_month)||void 0===a?void 0:a.revenue)||0).toFixed(2),((null===(i=e.current_month)||void 0===i||null===(s=i.estimated_charges)||void 0===s?void 0:s.totalAmount)||0).toFixed(2),(null===(o=e.latest_invoice)||void 0===o?void 0:o.invoice_number)||"-",(null===(l=e.latest_invoice)||void 0===l||null===(d=l.status)||void 0===d?void 0:d.replace(/_/g," "))||"-"]});e=[n.join(","),...t.map(e=>e.join(","))].join("\n")}else{const n=["Tenant","Admin","Location","Plan","Status","Monthly Fee","Paid By","Start Date","End Date"],t=(je||"all"!==ye||"all"!==we?Ie:ue).map(e=>[`"${e.restaurantName}"`,`"${e.adminName}"`,`"${e.location}"`,e.planType,e.status,e.monthlyFee.toFixed(2),"foodcourt_manager"===e.paymentModel?"Manager":"Tenant",e.startDate,e.endDate]);e=[n.join(","),...t.map(e=>e.join(","))].join("\n")}const n=new Blob([e],{type:"text/csv;charset=utf-8;"}),t=document.createElement("a");t.href=URL.createObjectURL(n),t.download=`foodcourt-${ee}-${(new Date).toISOString().split("T")[0]}.csv`,t.click(),URL.revokeObjectURL(t.href)},children:"Export"}),"foodcourt_plans"===ee&&(0,h.jsx)(c.cc,{variant:"primary",style:{background:"#059669"},onClick:()=>de(!0),disabled:0===Te,children:"Generate Invoices"})]})]}),(0,h.jsxs)(x.UC,{children:[(0,h.jsxs)(x.j,{children:[(0,h.jsxs)(x.oz,{active:"foodcourt_plans"===ee,onClick:()=>ne("foodcourt_plans"),children:["Foodcourt Plans (",Te,")"]}),(0,h.jsxs)(x.oz,{active:"pos_subscriptions"===ee,onClick:()=>ne("pos_subscriptions"),children:["POS Subscriptions (",Me,")"]})]}),"foodcourt_plans"===ee&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(x.MD,{children:[(0,h.jsxs)(x.hI,{color:"#059669",children:[(0,h.jsx)(x.Os,{children:Me}),(0,h.jsx)(x.v0,{children:"Foodcourt Tenants"}),(0,h.jsxs)(x.d1,{children:[Te," with plans assigned"]})]}),(0,h.jsxs)(x.hI,{color:"#2563EB",children:[(0,h.jsx)(x.Os,{children:(0,l.vv)(Pe,Oe)}),(0,h.jsx)(x.v0,{children:"This Month Revenue"}),(0,h.jsx)(x.d1,{children:"All tenants combined"})]}),(0,h.jsxs)(x.hI,{color:"#EA580C",children:[(0,h.jsx)(x.Os,{children:(0,l.vv)(Re,Oe)}),(0,h.jsx)(x.v0,{children:"Estimated Charges"}),(0,h.jsx)(x.d1,{children:"Based on current month revenue"})]}),(0,h.jsxs)(x.hI,{color:"#D97706",children:[(0,h.jsx)(x.Os,{children:se.filter(e=>{var n;return"pending_payment"===(null===(n=e.latest_invoice)||void 0===n?void 0:n.status)}).length}),(0,h.jsx)(x.v0,{children:"Pending Invoices"}),(0,h.jsx)(x.d1,{children:"Awaiting payment"})]})]}),(0,h.jsxs)(p.Qn,{children:[(0,h.jsx)(p.DO,{placeholder:"Search tenants, plans...",value:Ce,onChange:e=>Ee(e.target.value)}),(0,h.jsxs)(p.Jt,{value:ke,onChange:e=>Se(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Tenants"}),(0,h.jsx)("option",{value:"with_plan",children:"With Plan"}),(0,h.jsx)("option",{value:"no_plan",children:"No Plan"})]})]}),te?(0,h.jsx)(Q,{children:"Loading subscription data..."}):0===We.length?(0,h.jsxs)($,{children:[(0,h.jsx)(I,{children:"\ud83c\udfea"}),(0,h.jsx)(N,{children:0===se.length?"No Tenants":"No Results"}),(0,h.jsx)(L,{children:0===se.length?"No restaurants are assigned to this foodcourt yet.":"No tenants match your search criteria."})]}):(0,h.jsx)(u,{children:We.map(e=>(0,h.jsxs)(g,{children:[(0,h.jsxs)(m,{children:[(0,h.jsxs)("div",{children:[(0,h.jsx)(v,{children:e.restaurant_name}),(0,h.jsx)(j,{children:e.restaurant_email||"No email"})]}),(0,h.jsx)(f,{variant:"active"===e.restaurant_status?"green":"gray",children:e.restaurant_status})]}),e.plan?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(y,{children:[(0,h.jsx)(b,{children:e.plan.name}),parseFloat(e.plan.subscription_fee)>0&&(0,h.jsxs)(w,{children:[(0,h.jsx)(F,{children:"Management Fee"}),(0,h.jsxs)(A,{children:[(0,l.vv)(parseFloat(e.plan.subscription_fee),Oe),"/mo"]})]}),parseFloat(e.plan.revenue_percentage)>0&&(0,h.jsxs)(w,{children:[(0,h.jsx)(F,{children:"Revenue Share"}),(0,h.jsxs)(A,{children:[e.plan.revenue_percentage,"%"]})]}),"none"!==e.plan.rent_type&&(0,h.jsxs)(w,{children:[(0,h.jsx)(F,{children:"Rent Type"}),(0,h.jsx)(A,{style:{textTransform:"capitalize"},children:e.plan.rent_type})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(F,{children:"Billing"}),(0,h.jsxs)(A,{style:{textTransform:"capitalize"},children:[e.plan.billing_cycle," ",e.plan.auto_generate?"(Auto)":"(Manual)"]})]}),(0,h.jsxs)(w,{children:[(0,h.jsx)(F,{children:"Active Since"}),(0,h.jsx)(A,{children:Ge(e.plan.activation_date)})]})]}),(0,h.jsxs)(_,{children:[(0,h.jsx)(C,{children:"Current Month Revenue"}),(0,h.jsx)(E,{children:(0,l.vv)(e.current_month.revenue,Oe)}),(0,h.jsxs)(k,{children:[e.current_month.order_count," completed orders"]})]}),e.current_month.estimated_charges&&e.current_month.estimated_charges.items.length>0&&(0,h.jsxs)(S,{children:[(0,h.jsx)(B,{children:"Estimated Charges (This Month)"}),e.current_month.estimated_charges.items.map((e,n)=>(0,h.jsxs)(D,{children:[(0,h.jsx)("span",{children:"subscription_fee"===e.item_type?"Management Fee":"revenue_percentage"===e.item_type?"Revenue Share":"Rent"}),(0,h.jsx)("span",{children:(0,l.vv)(e.calculated_amount,Oe)})]},n)),e.current_month.estimated_charges.taxAmount>0&&(0,h.jsxs)(D,{children:[(0,h.jsx)("span",{children:"Tax"}),(0,h.jsx)("span",{children:(0,l.vv)(e.current_month.estimated_charges.taxAmount,Oe)})]}),(0,h.jsxs)(z,{children:[(0,h.jsx)("span",{children:"Total"}),(0,h.jsx)("span",{children:(0,l.vv)(e.current_month.estimated_charges.totalAmount,Oe)})]})]})]}):(0,h.jsx)(O,{children:"No foodcourt plan assigned - Go to Plans page to assign"}),e.latest_invoice&&(0,h.jsxs)(M,{children:[(0,h.jsxs)(T,{children:[(0,h.jsx)(P,{children:e.latest_invoice.invoice_number}),(0,h.jsxs)(R,{children:[Ge(e.latest_invoice.billing_period_start)," ~ ",Ge(e.latest_invoice.billing_period_end)]})]}),(0,h.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,h.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:(0,l.vv)(parseFloat(e.latest_invoice.total_amount),Oe)}),(0,h.jsx)(f,{variant:$e(e.latest_invoice.status),children:e.latest_invoice.status.replace(/_/g," ")})]})]})]},e.restaurant_id))})]}),"pos_subscriptions"===ee&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(x.MD,{children:[(0,h.jsxs)(x.hI,{color:"#059669",children:[(0,h.jsx)(x.Os,{children:ue.length}),(0,h.jsx)(x.v0,{children:"Total Tenants"}),(0,h.jsxs)(x.d1,{children:[Ne," active, ",Le," trial"]})]}),(0,h.jsxs)(x.hI,{color:"#2563EB",children:[(0,h.jsx)(x.Os,{children:Ne}),(0,h.jsx)(x.v0,{children:"Active Subscriptions"})]}),(0,h.jsxs)(x.hI,{color:"#7C3AED",children:[(0,h.jsx)(x.Os,{children:(0,l.vv)(Ue,Oe)}),(0,h.jsx)(x.v0,{children:"Monthly POS Fees"}),(0,h.jsx)(x.d1,{children:"Active + Trial combined"})]}),(0,h.jsxs)(x.hI,{color:"#D97706",children:[(0,h.jsx)(x.Os,{children:ue.filter(e=>"foodcourt_manager"===e.paymentModel).length}),(0,h.jsx)(x.v0,{children:"Paid by Manager"}),(0,h.jsxs)(x.d1,{children:[ue.filter(e=>"restaurant"===e.paymentModel).length," paid by tenant"]})]})]}),(0,h.jsxs)(p.Qn,{children:[(0,h.jsx)(p.DO,{placeholder:"Search tenants...",value:je,onChange:e=>fe(e.target.value)}),(0,h.jsxs)(p.Jt,{value:ye,onChange:e=>be(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Status"}),(0,h.jsx)("option",{value:"active",children:"Active"}),(0,h.jsx)("option",{value:"trial",children:"Trial"}),(0,h.jsx)("option",{value:"expired",children:"Expired"}),(0,h.jsx)("option",{value:"suspended",children:"Suspended"}),(0,h.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,h.jsxs)(p.Jt,{value:we,onChange:e=>Fe(e.target.value),children:[(0,h.jsx)("option",{value:"all",children:"All Payment"}),(0,h.jsx)("option",{value:"foodcourt_manager",children:"Paid by Manager"}),(0,h.jsx)("option",{value:"restaurant",children:"Paid by Tenant"})]})]}),me?(0,h.jsx)(Q,{children:"Loading POS subscription data..."}):0===ue.length?(0,h.jsxs)($,{children:[(0,h.jsx)(I,{children:"\ud83d\udce6"}),(0,h.jsx)(N,{children:"No POS Subscriptions"}),(0,h.jsx)(L,{children:"No tenants are assigned to this foodcourt yet."})]}):(0,h.jsxs)(x.XI,{children:[(0,h.jsxs)(H,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr",children:[(0,h.jsx)("span",{children:"Tenant"}),(0,h.jsx)("span",{children:"Plan"}),(0,h.jsx)("span",{children:"Status"}),(0,h.jsx)("span",{children:"Monthly Fee"}),(0,h.jsx)("span",{children:"Paid By"}),(0,h.jsx)("span",{children:"Expires"})]}),Ie.map(e=>(0,h.jsx)(X,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr",children:(0,h.jsxs)(x.Np,{children:[(0,h.jsxs)(x.Uj,{children:[(0,h.jsx)(x.PM,{children:"Tenant"}),(0,h.jsxs)("div",{children:[(0,h.jsx)(q,{children:e.restaurantName}),(0,h.jsxs)(K,{children:[e.adminName," \xb7 ",e.location]})]})]}),(0,h.jsxs)(x.Uj,{children:[(0,h.jsx)(x.PM,{children:"Plan"}),(0,h.jsx)(V,{planType:e.planType,children:e.planType.charAt(0).toUpperCase()+e.planType.slice(1)})]}),(0,h.jsxs)(x.Uj,{children:[(0,h.jsx)(x.PM,{children:"Status"}),(0,h.jsx)(Z,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})]}),(0,h.jsxs)(x.Uj,{children:[(0,h.jsx)(x.PM,{children:"Monthly Fee"}),(0,l.vv)(e.monthlyFee,Oe)]}),(0,h.jsxs)(x.Uj,{children:[(0,h.jsx)(x.PM,{children:"Paid By"}),(0,h.jsx)("span",{style:{display:"inline-flex",padding:"4px 8px",borderRadius:"6px",fontSize:"12px",fontWeight:500,background:"foodcourt_manager"===e.paymentModel?"#ECFDF5":"#F3F4F6",color:"foodcourt_manager"===e.paymentModel?"#059669":"#6B7280"},children:"foodcourt_manager"===e.paymentModel?"Manager":"Tenant"})]}),(0,h.jsxs)(x.Uj,{children:[(0,h.jsx)(x.PM,{children:"Expires"}),(()=>{if("-"===e.endDate)return(0,h.jsx)("span",{style:{color:"#9CA3AF"},children:"-"});const n=new Date,t=new Date(e.endDate),r=Math.ceil((t.getTime()-n.getTime())/864e5);return r<0?(0,h.jsx)("span",{style:{color:"#DC2626",fontWeight:500},children:"Expired"}):r<=7?(0,h.jsxs)("span",{style:{color:"#F59E0B",fontWeight:500},children:[r,"d"]}):r<=30?(0,h.jsxs)("span",{style:{color:"#10B981",fontWeight:500},children:[r,"d"]}):(0,h.jsxs)("span",{style:{color:"#6B7280"},children:[r,"d"]})})()]})]})},e.id))]})]})]})]}),(0,h.jsx)(U,{show:le,children:(0,h.jsxs)(W,{children:[(0,h.jsx)(G,{children:"Generate Foodcourt Invoices"}),(0,h.jsx)(J,{children:"This will generate invoices for the previous month based on each tenant's assigned plan and actual revenue."}),(0,h.jsxs)("div",{style:{padding:"16px",background:"#F0FDF4",borderRadius:"8px",marginBottom:"16px"},children:[(0,h.jsx)("div",{style:{fontSize:"13px",color:"#059669",fontWeight:600,marginBottom:"8px"},children:"Summary"}),(0,h.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:[(0,h.jsxs)("div",{children:[Te," tenant(s) with active foodcourt plans"]}),(0,h.jsx)("div",{children:"Invoices for auto-generate plans will be created"}),(0,h.jsx)("div",{children:"Duplicate invoices will be automatically skipped"})]})]}),(0,h.jsx)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px"},children:(0,h.jsx)("div",{style:{fontSize:"13px",color:"#92400E"},children:"Revenue-based charges (revenue share %, rent %) are calculated from completed orders in the billing period."})}),Ae&&(0,h.jsx)("div",{style:{padding:"10px 16px",marginTop:"12px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px"},children:Ae}),(0,h.jsxs)(Y,{children:[(0,h.jsx)(c.cc,{variant:"secondary",onClick:()=>{de(!1),_e("")},children:"Cancel"}),(0,h.jsx)(c.cc,{variant:"primary",style:{background:"#059669"},onClick:()=>{_e(""),(async()=>{if(t){ie(!0);try{const e=await fetch(`${o.JR}/api/foodcourts/${t}/generate-invoices`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Be}`},body:JSON.stringify({})});if(e.ok){const n=await e.json();pe(n.data),de(!1),he(!0),De()}else{const n=await e.json().catch(()=>({message:"Unknown error"}));_e(`Failed: ${n.message}`)}}catch(e){console.error("Error generating invoices:",e),_e("Failed to generate invoices")}finally{ie(!1)}}})()},disabled:ae,children:ae?"Generating...":"Generate Now"})]})]})}),(0,h.jsx)(U,{show:xe,children:(0,h.jsxs)(W,{children:[(0,h.jsx)(G,{children:"Invoice Generation Complete"}),ce&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(J,{children:["Period: ",ce.period.start," ~ ",ce.period.end]}),(0,h.jsxs)(x.MD,{style:{marginBottom:"16px"},children:[(0,h.jsxs)(x.hI,{color:"#059669",children:[(0,h.jsx)(x.Os,{children:ce.generated}),(0,h.jsx)(x.v0,{children:"Generated"})]}),(0,h.jsxs)(x.hI,{color:"#D97706",children:[(0,h.jsx)(x.Os,{children:ce.skipped}),(0,h.jsx)(x.v0,{children:"Skipped"})]})]}),(0,h.jsx)("div",{style:{maxHeight:"300px",overflowY:"auto"},children:ce.results.map((e,n)=>(0,h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #F3F4F6",fontSize:"13px"},children:[(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.restaurant}),e.invoice_number&&(0,h.jsxs)("div",{style:{color:"#6B7280",fontSize:"12px"},children:[e.invoice_number," - ",(0,l.vv)(e.amount||0,Oe)]}),e.reason&&(0,h.jsx)("div",{style:{color:"#9CA3AF",fontSize:"12px"},children:e.reason})]}),(0,h.jsx)(f,{variant:"generated"===e.status?"green":"yellow",children:e.status})]},n))})]}),(0,h.jsx)(Y,{children:(0,h.jsx)(c.cc,{variant:"primary",onClick:()=>he(!1),style:{flex:1},children:"Close"})})]})})]})}},3705:(e,n,t)=>{t.d(n,{cc:()=>a});var r=t(4752);const a=r.Ay.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${e=>{switch(e.size){case"small":return"8px 16px";case"large":return"16px 28px";default:return"12px 20px"}}};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  ${e=>{switch(e.variant){case"secondary":case"outline":case"cancel":return"\n          background: white;\n          color: #6B7280;\n          border: 1px solid #E6EBF1;\n\n          &:hover {\n            background: #F8FAFC;\n            color: #0A2540;\n            border-color: #CBD5E1;\n          }\n        ";case"danger":return"\n          background: #DC2626;\n          color: white;\n\n          &:hover {\n            background: #B91C1C;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);\n          }\n        ";case"danger-outline":return"\n          background: white;\n          color: #DC2626;\n          border: 1px solid #DC2626;\n\n          &:hover {\n            background: #FEF2F2;\n            color: #B91C1C;\n            border-color: #B91C1C;\n          }\n        ";default:return"\n          background: #635BFF;\n          color: white;\n\n          &:hover {\n            background: #5A51E6;\n            transform: translateY(-2px);\n            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);\n          }\n        "}}}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  /* Icon styling */
  svg {
    width: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
    height: ${e=>{switch(e.size){case"small":return"14px";case"large":return"20px";default:return"16px"}}};
  }
`;r.Ay.select`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,r.Ay.input`
  padding: 8px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #374151;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--brand-primary, #8B5CF6);
    box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
  }

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
  }
`,r.Ay.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  padding: 16px;
  transition: all 0.2s ease;

  ${e=>e.accent&&"\n    border-color: var(--brand-primary, #8B5CF6);\n    box-shadow: 0 4px 6px -1px rgba(196, 181, 253, 0.2);\n  "}

  &:hover {
    border-color: var(--brand-secondary, #A78BFA);
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
  }
`},4021:(e,n,t)=>{t.d(n,{i1:()=>s});var r=t(9950),a=t(1367),i=t(6038);const s=()=>{const{user:e}=(0,a.As)(),[n,t]=(0,r.useState)("RM"),[s,o]=(0,r.useState)(Object.keys(i.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let a=r>=0?n[r+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";t(r)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:l,error:c}}}}]);