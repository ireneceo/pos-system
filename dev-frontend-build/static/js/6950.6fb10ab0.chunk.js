"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6950],{2488:(e,n,t)=>{t.d(n,{DO:()=>l,Jt:()=>c,Qn:()=>d});t(9950);var r=t(4752),i=t(4414);const a=r.Ay.div`
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
`,d=e=>{let{children:n,className:t,style:r,...s}=e;return(0,i.jsx)(a,{className:t,style:r,...s,children:n})},l=e=>{let{placeholder:n="Search...",...t}=e;return(0,i.jsx)(s,{placeholder:n,...t})},c=e=>{let{children:n,...t}=e;return(0,i.jsx)(o,{...t,children:n})}},4021:(e,n,t)=>{t.d(n,{i1:()=>s});var r=t(9950),i=t(1367),a=t(6038);const s=()=>{const{user:e}=(0,i.As)(),[n,t]=(0,r.useState)("RM"),[s,o]=(0,r.useState)(Object.keys(a.DL)),[d,l]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let i=r>=0?n[r+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return t("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var a;const e=await n.json(),r=e.currency||(null===(a=e.operation_settings)||void 0===a?void 0:a.currency)||"RM";t(r)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),t("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:d,error:c}}},6950:(e,n,t)=>{t.r(n),t.d(n,{default:()=>xe});var r=t(9950),i=t(4752),a=t(3310),s=t(1367),o=t(6910),d=t(6038),l=t(4021),c=t(2488),p=t(2674),x=t(4414);const h=i.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,u=i.Ay.div`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`,g=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
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
  @media (max-width: 768px) { font-size: 20px; }
`,j=i.Ay.div`
  display: flex;
  gap: 12px;
`,v=i.Ay.button`
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  ${e=>"primary"===e.variant?"\n    background: #635BFF; color: white;\n    &:hover { background: #5A51E6; transform: translateY(-1px); }\n  ":"success"===e.variant?"\n    background: #059669; color: white;\n    &:hover { background: #047857; transform: translateY(-1px); }\n  ":"\n    background: white; color: #374151; border: 1px solid #E6EBF1;\n    &:hover { background: #F8FAFC; border-color: #635BFF; }\n  "}
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,b=i.Ay.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 2px solid #E6EBF1;
`,y=i.Ay.button`
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  color: ${e=>e.active?"#635BFF":"#6B7280"};
  background: none;
  border: none;
  border-bottom: 2px solid ${e=>e.active?"#635BFF":"transparent"};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { color: #635BFF; }
`,f=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,w=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); transform: translateY(-2px); }
`,A=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,F=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,_=i.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,E=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  gap: 24px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,k=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); border-color: #635BFF; }
`,C=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,B=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
`,S=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,z=i.Ay.span`
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  ${e=>{switch(e.variant){case"green":return"background: #ECFDF5; color: #059669;";case"yellow":return"background: #FEF3C7; color: #D97706;";case"red":return"background: #FEE2E2; color: #DC2626;";case"blue":return"background: #DBEAFE; color: #2563EB;";case"purple":return"background: #EDE9FE; color: #7C3AED;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,D=i.Ay.div`
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  margin-bottom: 16px;
`,M=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,R=i.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #6B7280;
  padding: 4px 0;
  & + & { border-top: 1px solid #E6EBF1; }
`,T=i.Ay.span`
  color: #6B7280;
`,P=i.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,N=i.Ay.div`
  padding: 16px;
  background: #F0FDF4;
  border-radius: 8px;
  border: 1px solid #BBF7D0;
  margin-bottom: 16px;
`,$=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,O=i.Ay.div`
  font-size: 22px;
  font-weight: 700;
  color: #059669;
`,I=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,L=i.Ay.div`
  padding: 16px;
  background: #FFF7ED;
  border-radius: 8px;
  border: 1px solid #FED7AA;
  margin-bottom: 16px;
`,U=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #C2410C;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,G=i.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 4px 0;
  color: #6B7280;
`,W=i.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 700;
  padding-top: 8px;
  margin-top: 8px;
  border-top: 2px solid #FDBA74;
  color: #C2410C;
`,J=i.Ay.div`
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Y=i.Ay.div``,H=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,Q=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,X=i.Ay.div`
  padding: 12px 16px;
  background: #F9FAFB;
  border: 1px dashed #D1D5DB;
  border-radius: 8px;
  text-align: center;
  color: #9CA3AF;
  font-size: 14px;
  margin-bottom: 16px;
`,q=i.Ay.div`
  text-align: center;
  padding: 60px 40px;
  color: #9CA3AF;
`,K=i.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,V=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`,Z=i.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,ee=i.Ay.div`
  display: ${e=>e.show?"flex":"none"};
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 0;
`,ne=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 560px;
  width: 90%;
  flex-shrink: 0;
`,te=i.Ay.h2`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,re=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,ie=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,ae=i.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,se=(0,i.Ay)(p.A0)`
  @media (max-width: 1200px) {
    & > span:nth-child(5),
    & > span:nth-child(6) {
      display: none;
    }
  }
  @media (max-width: 900px) {
    & > span:nth-child(3),
    & > span:nth-child(4),
    & > span:nth-child(5),
    & > span:nth-child(6) {
      display: none;
    }
  }
`,oe=(0,i.Ay)(p.Hj)`
  @media (max-width: 1200px) {
    & > div:nth-child(5),
    & > div:nth-child(6) {
      display: none;
    }
  }
  @media (max-width: 900px) {
    & > div:nth-child(3),
    & > div:nth-child(4),
    & > div:nth-child(5),
    & > div:nth-child(6) {
      display: none;
    }
  }
`,de=i.Ay.div`
  font-weight: 600;
  color: #0A2540;
  font-size: 14px;
`,le=i.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 2px;
`,ce=i.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  ${e=>{switch(e.planType){case"basic":default:return"background: #F3F4F6; color: #374151;";case"professional":return"background: #EDE9FE; color: #7C3AED;";case"enterprise":return"background: #FEF3C7; color: #92400E;"}}}
`,pe=i.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  ${e=>{switch(e.status){case"active":return"background: #ECFDF5; color: #059669;";case"trial":return"background: #DBEAFE; color: #2563EB;";case"expired":return"background: #FEE2E2; color: #DC2626;";case"suspended":return"background: #FEF3C7; color: #D97706;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,xe=()=>{const{user:e}=(0,s.As)(),{defaultCurrency:n}=(0,l.i1)(),[t,i]=(0,r.useState)(null),[xe,he]=(0,r.useState)("brand_plans"),[ue,ge]=(0,r.useState)(!0),[me,je]=(0,r.useState)(!1),[ve,be]=(0,r.useState)([]),[ye,fe]=(0,r.useState)(!1),[we,Ae]=(0,r.useState)(null),[Fe,_e]=(0,r.useState)(!1),[Ee,ke]=(0,r.useState)([]),[Ce,Be]=(0,r.useState)(!1),[Se,ze]=(0,r.useState)(""),[De,Me]=(0,r.useState)("all"),[Re,Te]=(0,r.useState)("all"),[Pe,Ne]=(0,r.useState)(""),$e=localStorage.getItem("auth_token");(0,r.useEffect)(()=>{null!==e&&void 0!==e&&e.brand_id&&i(Number(e.brand_id))},[e]);const Oe=(0,r.useCallback)(async()=>{if(t){ge(!0);try{const e=await fetch(`${o.JR}/api/brands/${t}/subscriptions`,{headers:{Authorization:`Bearer ${$e}`}});if(e.ok){const n=await e.json();be(n.data||[])}}catch(e){console.error("Error fetching brand subscriptions:",e)}finally{ge(!1)}}},[t,$e]);(0,r.useEffect)(()=>{Oe()},[Oe]);const Ie=(0,r.useCallback)(async()=>{if($e){Be(!0);try{const e=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${$e}`}});if(e.ok){const n=await e.json(),t=(Array.isArray(n)?n:[]).map(e=>{var n,t;const r=(null===(n=e.plan_type)||void 0===n?void 0:n.toLowerCase().replace(" plan",""))||"basic";let i="active";return"trial"===e.status?i="trial":"inactive"===e.status||"suspended"===e.status?i="suspended":"expired"===e.status?i="expired":"cancelled"===e.status&&(i="cancelled"),{id:null===(t=e.id)||void 0===t?void 0:t.toString(),restaurantName:e.name||"Unknown",adminName:e.admin_name||e.managerName||"-",location:e.address||"-",planType:r,status:i,monthlyFee:parseFloat(e.plan_amount)||29,paymentModel:e.payment_model||"restaurant",startDate:e.subscription_start?new Date(e.subscription_start).toISOString().split("T")[0]:"-",endDate:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:"-",autoRenew:"active"===e.status}});ke(t)}}catch(e){console.error("Error fetching POS subscriptions:",e)}finally{Be(!1)}}},[$e]);(0,r.useEffect)(()=>{"pos_subscriptions"===xe&&Ie()},[xe,Ie]);const Le=ve.length,Ue=ve.filter(e=>null!==e.plan).length,Ge=ve.reduce((e,n)=>{var t;return e+((null===(t=n.current_month)||void 0===t?void 0:t.revenue)||0)},0),We=ve.reduce((e,n)=>{var t,r;return e+((null===(t=n.current_month)||void 0===t||null===(r=t.estimated_charges)||void 0===r?void 0:r.totalAmount)||0)},0),Je=n||"MYR",Ye=e=>{switch(e){case"paid":return"green";case"pending_payment":return"yellow";case"payment_submitted":return"blue";case"overdue":return"red";default:return"gray"}},He=Ee.filter(e=>{const n=e.restaurantName.toLowerCase().includes(Se.toLowerCase())||e.adminName.toLowerCase().includes(Se.toLowerCase())||e.location.toLowerCase().includes(Se.toLowerCase()),t="all"===De||e.status===De,r="all"===Re||e.paymentModel===Re;return n&&t&&r}),Qe=Ee.filter(e=>"active"===e.status).length,Xe=Ee.filter(e=>"trial"===e.status).length,qe=Ee.filter(e=>"active"===e.status||"trial"===e.status).reduce((e,n)=>e+n.monthlyFee,0),Ke=e=>e?new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"-";return(0,x.jsxs)(a.A,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(g,{children:[(0,x.jsx)(m,{children:"Subscriptions"}),(0,x.jsx)(j,{children:"brand_plans"===xe&&(0,x.jsx)(v,{variant:"success",onClick:()=>fe(!0),disabled:0===Ue,children:"Generate Invoices"})})]}),(0,x.jsxs)(u,{children:[(0,x.jsxs)(b,{children:[(0,x.jsxs)(y,{active:"brand_plans"===xe,onClick:()=>he("brand_plans"),children:["Brand Plans (",Ue,")"]}),(0,x.jsxs)(y,{active:"pos_subscriptions"===xe,onClick:()=>he("pos_subscriptions"),children:["POS Subscriptions (",Le,")"]})]}),"brand_plans"===xe&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(f,{children:[(0,x.jsxs)(w,{color:"#059669",children:[(0,x.jsx)(A,{children:Le}),(0,x.jsx)(F,{children:"Brand Restaurants"}),(0,x.jsxs)(_,{children:[Ue," with plans assigned"]})]}),(0,x.jsxs)(w,{color:"#2563EB",children:[(0,x.jsx)(A,{children:(0,d.vv)(Ge,Je)}),(0,x.jsx)(F,{children:"This Month Revenue"}),(0,x.jsx)(_,{children:"All brand restaurants combined"})]}),(0,x.jsxs)(w,{color:"#7C3AED",children:[(0,x.jsx)(A,{children:(0,d.vv)(We,Je)}),(0,x.jsx)(F,{children:"Estimated Charges"}),(0,x.jsx)(_,{children:"Based on current month revenue"})]}),(0,x.jsxs)(w,{color:"#D97706",children:[(0,x.jsx)(A,{children:ve.filter(e=>{var n;return"pending_payment"===(null===(n=e.latest_invoice)||void 0===n?void 0:n.status)}).length}),(0,x.jsx)(F,{children:"Pending Invoices"}),(0,x.jsx)(_,{children:"Awaiting payment"})]})]}),ue?(0,x.jsx)(ae,{children:"Loading subscription data..."}):0===ve.length?(0,x.jsxs)(q,{children:[(0,x.jsx)(K,{children:"\ud83d\udccb"}),(0,x.jsx)(V,{children:"No Restaurants"}),(0,x.jsx)(Z,{children:"No restaurants are assigned to this brand yet."})]}):(0,x.jsx)(E,{children:ve.map(e=>(0,x.jsxs)(k,{children:[(0,x.jsxs)(C,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(B,{children:e.restaurant_name}),(0,x.jsx)(S,{children:e.restaurant_email||"No email"})]}),(0,x.jsx)(z,{variant:"active"===e.restaurant_status?"green":"gray",children:e.restaurant_status})]}),e.plan?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(D,{children:[(0,x.jsx)(M,{children:e.plan.name}),parseFloat(e.plan.subscription_fee)>0&&(0,x.jsxs)(R,{children:[(0,x.jsx)(T,{children:"Subscription Fee"}),(0,x.jsxs)(P,{children:[(0,d.vv)(parseFloat(e.plan.subscription_fee),Je),"/mo"]})]}),parseFloat(e.plan.revenue_percentage)>0&&(0,x.jsxs)(R,{children:[(0,x.jsx)(T,{children:"Revenue Royalty"}),(0,x.jsxs)(P,{children:[e.plan.revenue_percentage,"%"]})]}),"none"!==e.plan.rent_type&&(0,x.jsxs)(R,{children:[(0,x.jsx)(T,{children:"Rent Type"}),(0,x.jsx)(P,{style:{textTransform:"capitalize"},children:e.plan.rent_type})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(T,{children:"Billing"}),(0,x.jsxs)(P,{style:{textTransform:"capitalize"},children:[e.plan.billing_cycle," ",e.plan.auto_generate?"(Auto)":"(Manual)"]})]}),(0,x.jsxs)(R,{children:[(0,x.jsx)(T,{children:"Active Since"}),(0,x.jsx)(P,{children:Ke(e.plan.activation_date)})]})]}),(0,x.jsxs)(N,{children:[(0,x.jsx)($,{children:"Current Month Revenue"}),(0,x.jsx)(O,{children:(0,d.vv)(e.current_month.revenue,Je)}),(0,x.jsxs)(I,{children:[e.current_month.order_count," completed orders"]})]}),e.current_month.estimated_charges&&e.current_month.estimated_charges.items.length>0&&(0,x.jsxs)(L,{children:[(0,x.jsx)(U,{children:"Estimated Charges (This Month)"}),e.current_month.estimated_charges.items.map((e,n)=>(0,x.jsxs)(G,{children:[(0,x.jsx)("span",{children:"subscription_fee"===e.item_type?"Subscription Fee":"revenue_percentage"===e.item_type?"Revenue Royalty":"Rent"}),(0,x.jsx)("span",{children:(0,d.vv)(e.calculated_amount,Je)})]},n)),e.current_month.estimated_charges.taxAmount>0&&(0,x.jsxs)(G,{children:[(0,x.jsx)("span",{children:"Tax"}),(0,x.jsx)("span",{children:(0,d.vv)(e.current_month.estimated_charges.taxAmount,Je)})]}),(0,x.jsxs)(W,{children:[(0,x.jsx)("span",{children:"Total"}),(0,x.jsx)("span",{children:(0,d.vv)(e.current_month.estimated_charges.totalAmount,Je)})]})]})]}):(0,x.jsx)(X,{children:"No brand plan assigned - Go to Plans page to assign"}),e.latest_invoice&&(0,x.jsxs)(J,{children:[(0,x.jsxs)(Y,{children:[(0,x.jsx)(H,{children:e.latest_invoice.invoice_number}),(0,x.jsxs)(Q,{children:[Ke(e.latest_invoice.billing_period_start)," ~ ",Ke(e.latest_invoice.billing_period_end)]})]}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,x.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:(0,d.vv)(parseFloat(e.latest_invoice.total_amount),Je)}),(0,x.jsx)(z,{variant:Ye(e.latest_invoice.status),children:e.latest_invoice.status.replace(/_/g," ")})]})]})]},e.restaurant_id))})]}),"pos_subscriptions"===xe&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(f,{children:[(0,x.jsxs)(w,{color:"#635BFF",children:[(0,x.jsx)(A,{children:Ee.length}),(0,x.jsx)(F,{children:"Total Restaurants"}),(0,x.jsxs)(_,{children:[Qe," active, ",Xe," trial"]})]}),(0,x.jsxs)(w,{color:"#059669",children:[(0,x.jsx)(A,{children:Qe}),(0,x.jsx)(F,{children:"Active Subscriptions"})]}),(0,x.jsxs)(w,{color:"#2563EB",children:[(0,x.jsx)(A,{children:(0,d.vv)(qe,Je)}),(0,x.jsx)(F,{children:"Monthly POS Fees"}),(0,x.jsx)(_,{children:"Active + Trial combined"})]}),(0,x.jsxs)(w,{color:"#D97706",children:[(0,x.jsx)(A,{children:Ee.filter(e=>"brand_manager"===e.paymentModel).length}),(0,x.jsx)(F,{children:"Paid by Manager"}),(0,x.jsxs)(_,{children:[Ee.filter(e=>"restaurant"===e.paymentModel).length," paid by restaurant"]})]})]}),(0,x.jsxs)(c.Qn,{children:[(0,x.jsx)(c.DO,{placeholder:"Search restaurants...",value:Se,onChange:e=>ze(e.target.value)}),(0,x.jsxs)(c.Jt,{value:De,onChange:e=>Me(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"trial",children:"Trial"}),(0,x.jsx)("option",{value:"expired",children:"Expired"}),(0,x.jsx)("option",{value:"suspended",children:"Suspended"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,x.jsxs)(c.Jt,{value:Re,onChange:e=>Te(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Payment"}),(0,x.jsx)("option",{value:"brand_manager",children:"Paid by Manager"}),(0,x.jsx)("option",{value:"restaurant",children:"Paid by Restaurant"})]})]}),Ce?(0,x.jsx)(ae,{children:"Loading POS subscription data..."}):0===Ee.length?(0,x.jsxs)(q,{children:[(0,x.jsx)(K,{children:"\ud83d\udce6"}),(0,x.jsx)(V,{children:"No POS Subscriptions"}),(0,x.jsx)(Z,{children:"No restaurants are assigned to this brand yet."})]}):(0,x.jsxs)(p.XI,{children:[(0,x.jsxs)(se,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr",children:[(0,x.jsx)("span",{children:"Restaurant"}),(0,x.jsx)("span",{children:"Plan"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{children:"Monthly Fee"}),(0,x.jsx)("span",{children:"Paid By"}),(0,x.jsx)("span",{children:"Expires"})]}),He.map(e=>(0,x.jsx)(oe,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr",children:(0,x.jsxs)(p.Np,{children:[(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Restaurant"}),(0,x.jsxs)("div",{children:[(0,x.jsx)(de,{children:e.restaurantName}),(0,x.jsxs)(le,{children:[e.adminName," \xb7 ",e.location]})]})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Plan"}),(0,x.jsx)(ce,{planType:e.planType,children:e.planType.charAt(0).toUpperCase()+e.planType.slice(1)})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Status"}),(0,x.jsx)(pe,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Monthly Fee"}),(0,d.vv)(e.monthlyFee,Je)]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Paid By"}),(0,x.jsx)("span",{style:{display:"inline-flex",padding:"4px 8px",borderRadius:"6px",fontSize:"12px",fontWeight:500,background:"brand_manager"===e.paymentModel?"#EDE9FE":"#F3F4F6",color:"brand_manager"===e.paymentModel?"#7C3AED":"#6B7280"},children:"brand_manager"===e.paymentModel?"Manager":"Restaurant"})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Expires"}),(()=>{if("-"===e.endDate)return(0,x.jsx)("span",{style:{color:"#9CA3AF"},children:"-"});const n=new Date,t=new Date(e.endDate),r=Math.ceil((t.getTime()-n.getTime())/864e5);return r<0?(0,x.jsx)("span",{style:{color:"#DC2626",fontWeight:500},children:"Expired"}):r<=7?(0,x.jsxs)("span",{style:{color:"#F59E0B",fontWeight:500},children:[r,"d"]}):r<=30?(0,x.jsxs)("span",{style:{color:"#10B981",fontWeight:500},children:[r,"d"]}):(0,x.jsxs)("span",{style:{color:"#6B7280"},children:[r,"d"]})})()]})]})},e.id))]})]})]})]}),(0,x.jsx)(ee,{show:ye,children:(0,x.jsxs)(ne,{children:[(0,x.jsx)(te,{children:"Generate Brand Invoices"}),(0,x.jsx)(re,{children:"This will generate invoices for the previous month based on each restaurant's assigned plan and actual revenue."}),(0,x.jsxs)("div",{style:{padding:"16px",background:"#F0FDF4",borderRadius:"8px",marginBottom:"16px"},children:[(0,x.jsx)("div",{style:{fontSize:"13px",color:"#059669",fontWeight:600,marginBottom:"8px"},children:"Summary"}),(0,x.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:[(0,x.jsxs)("div",{children:[Ue," restaurant(s) with active brand plans"]}),(0,x.jsx)("div",{children:"Invoices for auto-generate plans will be created"}),(0,x.jsx)("div",{children:"Duplicate invoices will be automatically skipped"})]})]}),(0,x.jsx)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px"},children:(0,x.jsx)("div",{style:{fontSize:"13px",color:"#92400E"},children:"Revenue-based charges (royalty %, rent %) are calculated from completed orders in the billing period."})}),Pe&&(0,x.jsx)("div",{style:{padding:"10px 16px",marginTop:"12px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px"},children:Pe}),(0,x.jsxs)(ie,{children:[(0,x.jsx)(v,{variant:"secondary",onClick:()=>{fe(!1),Ne("")},children:"Cancel"}),(0,x.jsx)(v,{variant:"success",onClick:()=>{Ne(""),(async()=>{if(t){je(!0);try{const e=await fetch(`${o.JR}/api/brands/${t}/generate-invoices`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${$e}`},body:JSON.stringify({})});if(e.ok){const n=await e.json();Ae(n.data),fe(!1),_e(!0),Oe()}else{const n=await e.json().catch(()=>({message:"Unknown error"}));Ne(`Failed: ${n.message}`)}}catch(e){console.error("Error generating invoices:",e),Ne("Failed to generate invoices")}finally{je(!1)}}})()},disabled:me,children:me?"Generating...":"Generate Now"})]})]})}),(0,x.jsx)(ee,{show:Fe,children:(0,x.jsxs)(ne,{children:[(0,x.jsx)(te,{children:"Invoice Generation Complete"}),we&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(re,{children:["Period: ",we.period.start," ~ ",we.period.end]}),(0,x.jsxs)(f,{style:{marginBottom:"16px"},children:[(0,x.jsxs)(w,{color:"#059669",children:[(0,x.jsx)(A,{children:we.generated}),(0,x.jsx)(F,{children:"Generated"})]}),(0,x.jsxs)(w,{color:"#D97706",children:[(0,x.jsx)(A,{children:we.skipped}),(0,x.jsx)(F,{children:"Skipped"})]})]}),(0,x.jsx)("div",{style:{maxHeight:"300px",overflowY:"auto"},children:we.results.map((e,n)=>(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #F3F4F6",fontSize:"13px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.restaurant}),e.invoice_number&&(0,x.jsxs)("div",{style:{color:"#6B7280",fontSize:"12px"},children:[e.invoice_number," - ",(0,d.vv)(e.amount||0,Je)]}),e.reason&&(0,x.jsx)("div",{style:{color:"#9CA3AF",fontSize:"12px"},children:e.reason})]}),(0,x.jsx)(z,{variant:"generated"===e.status?"green":"yellow",children:e.status})]},n))})]}),(0,x.jsx)(ie,{children:(0,x.jsx)(v,{variant:"primary",onClick:()=>_e(!1),style:{flex:1},children:"Close"})})]})})]})}}}]);