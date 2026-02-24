"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6950],{2488:(e,n,t)=>{t.d(n,{DO:()=>d,Jt:()=>c,Qn:()=>l});t(9950);var r=t(4752),a=t(4414);const i=r.Ay.div`
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
`,l=e=>{let{children:n,className:t,style:r,...s}=e;return(0,a.jsx)(i,{className:t,style:r,...s,children:n})},d=e=>{let{placeholder:n="Search...",...t}=e;return(0,a.jsx)(s,{placeholder:n,...t})},c=e=>{let{children:n,...t}=e;return(0,a.jsx)(o,{...t,children:n})}},4021:(e,n,t)=>{t.d(n,{i1:()=>s});var r=t(9950),a=t(1367),i=t(6038);const s=()=>{const{user:e}=(0,a.As)(),[n,t]=(0,r.useState)("RM"),[s,o]=(0,r.useState)(Object.keys(i.DL)),[l,d]=(0,r.useState)(!0),[c,p]=(0,r.useState)(null);return(0,r.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),r=n.indexOf("restaurant");let a=r>=0?n[r+1]:null;if(!a&&null!==e&&void 0!==e&&e.restaurant_id&&(a=e.restaurant_id.toString()),!a)return t("RM"),void d(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${a}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var i;const e=await n.json(),r=e.currency||(null===(i=e.operation_settings)||void 0===i?void 0:i.currency)||"RM";t(r)}else t("RM")}catch(s){console.error("Failed to fetch restaurant currency:",s),p("Failed to load currency settings"),t("RM")}finally{d(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:s,loading:l,error:c}}},6950:(e,n,t)=>{t.r(n),t.d(n,{default:()=>xe});var r=t(9950),a=t(4752),i=t(3310),s=t(1367),o=t(6910),l=t(6038),d=t(4021),c=t(2488),p=t(2674),x=t(4414);const h=a.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,u=a.Ay.div`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`,m=a.Ay.div`
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
`,g=a.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
  @media (max-width: 768px) { font-size: 20px; }
`,v=a.Ay.div`
  display: flex;
  gap: 12px;
`,j=a.Ay.button`
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
`,y=a.Ay.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 2px solid #E6EBF1;
`,b=a.Ay.button`
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
`,f=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`,w=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${e=>e.color||"#635BFF"};
  transition: all 0.2s;
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); transform: translateY(-2px); }
`,F=a.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,A=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,_=a.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,C=a.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  gap: 24px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,E=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); border-color: #635BFF; }
`,k=a.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,B=a.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
`,S=a.Ay.div`
  font-size: 13px;
  color: #6B7280;
`,z=a.Ay.span`
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  ${e=>{switch(e.variant){case"green":return"background: #ECFDF5; color: #059669;";case"yellow":return"background: #FEF3C7; color: #D97706;";case"red":return"background: #FEE2E2; color: #DC2626;";case"blue":return"background: #DBEAFE; color: #2563EB;";case"purple":return"background: #EDE9FE; color: #7C3AED;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,D=a.Ay.div`
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  margin-bottom: 16px;
`,R=a.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,M=a.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #6B7280;
  padding: 4px 0;
  & + & { border-top: 1px solid #E6EBF1; }
`,P=a.Ay.span`
  color: #6B7280;
`,T=a.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,$=a.Ay.div`
  padding: 16px;
  background: #F0FDF4;
  border-radius: 8px;
  border: 1px solid #BBF7D0;
  margin-bottom: 16px;
`,N=a.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,L=a.Ay.div`
  font-size: 22px;
  font-weight: 700;
  color: #059669;
`,O=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,I=a.Ay.div`
  padding: 16px;
  background: #FFF7ED;
  border-radius: 8px;
  border: 1px solid #FED7AA;
  margin-bottom: 16px;
`,U=a.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #C2410C;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,W=a.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 4px 0;
  color: #6B7280;
`,G=a.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 700;
  padding-top: 8px;
  margin-top: 8px;
  border-top: 2px solid #FDBA74;
  color: #C2410C;
`,J=a.Ay.div`
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`,Y=a.Ay.div``,Q=a.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,H=a.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,X=a.Ay.div`
  padding: 12px 16px;
  background: #F9FAFB;
  border: 1px dashed #D1D5DB;
  border-radius: 8px;
  text-align: center;
  color: #9CA3AF;
  font-size: 14px;
  margin-bottom: 16px;
`,q=a.Ay.div`
  text-align: center;
  padding: 60px 40px;
  color: #9CA3AF;
`,K=a.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,V=a.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`,Z=a.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,ee=a.Ay.div`
  display: ${e=>e.show?"flex":"none"};
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 0;
`,ne=a.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 560px;
  width: 90%;
  flex-shrink: 0;
`,te=a.Ay.h2`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,re=a.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,ae=a.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,ie=a.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,se=(0,a.Ay)(p.A0)`
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
`,oe=(0,a.Ay)(p.Hj)`
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
`,le=a.Ay.div`
  font-weight: 600;
  color: #0A2540;
  font-size: 14px;
`,de=a.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 2px;
`,ce=a.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  ${e=>{switch(e.planType){case"basic":default:return"background: #F3F4F6; color: #374151;";case"professional":return"background: #EDE9FE; color: #7C3AED;";case"enterprise":return"background: #FEF3C7; color: #92400E;"}}}
`,pe=a.Ay.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  ${e=>{switch(e.status){case"active":return"background: #ECFDF5; color: #059669;";case"trial":return"background: #DBEAFE; color: #2563EB;";case"expired":return"background: #FEE2E2; color: #DC2626;";case"suspended":return"background: #FEF3C7; color: #D97706;";default:return"background: #F3F4F6; color: #6B7280;"}}}
`,xe=()=>{const{user:e}=(0,s.As)(),{defaultCurrency:n}=(0,d.i1)(),[t,a]=(0,r.useState)(null),[xe,he]=(0,r.useState)("brand_plans"),[ue,me]=(0,r.useState)(!0),[ge,ve]=(0,r.useState)(!1),[je,ye]=(0,r.useState)([]),[be,fe]=(0,r.useState)(!1),[we,Fe]=(0,r.useState)(null),[Ae,_e]=(0,r.useState)(!1),[Ce,Ee]=(0,r.useState)([]),[ke,Be]=(0,r.useState)(!1),[Se,ze]=(0,r.useState)(""),[De,Re]=(0,r.useState)("all"),[Me,Pe]=(0,r.useState)("all"),[Te,$e]=(0,r.useState)(""),[Ne,Le]=(0,r.useState)(""),[Oe,Ie]=(0,r.useState)("all"),Ue=localStorage.getItem("auth_token");(0,r.useEffect)(()=>{null!==e&&void 0!==e&&e.brand_id&&a(Number(e.brand_id))},[e]);const We=(0,r.useCallback)(async()=>{if(t){me(!0);try{const e=await fetch(`${o.JR}/api/brands/${t}/subscriptions`,{headers:{Authorization:`Bearer ${Ue}`}});if(e.ok){const n=await e.json();ye(n.data||[])}}catch(e){console.error("Error fetching brand subscriptions:",e)}finally{me(!1)}}},[t,Ue]);(0,r.useEffect)(()=>{We()},[We]);const Ge=(0,r.useCallback)(async()=>{if(Ue){Be(!0);try{const e=await fetch("/api/restaurants",{headers:{Authorization:`Bearer ${Ue}`}});if(e.ok){const n=await e.json(),t=(Array.isArray(n)?n:[]).map(e=>{var n,t;const r=(null===(n=e.plan_type)||void 0===n?void 0:n.toLowerCase().replace(" plan",""))||"basic";let a="active";return"trial"===e.status?a="trial":"inactive"===e.status||"suspended"===e.status?a="suspended":"expired"===e.status?a="expired":"cancelled"===e.status&&(a="cancelled"),{id:null===(t=e.id)||void 0===t?void 0:t.toString(),restaurantName:e.name||"Unknown",adminName:e.admin_name||e.managerName||"-",location:e.address||"-",planType:r,status:a,monthlyFee:parseFloat(e.plan_amount)||29,paymentModel:e.payment_model||"restaurant",startDate:e.subscription_start?new Date(e.subscription_start).toISOString().split("T")[0]:"-",endDate:e.subscription_end?new Date(e.subscription_end).toISOString().split("T")[0]:"-",autoRenew:"active"===e.status}});Ee(t)}}catch(e){console.error("Error fetching POS subscriptions:",e)}finally{Be(!1)}}},[Ue]);(0,r.useEffect)(()=>{"pos_subscriptions"===xe&&Ge()},[xe,Ge]);const Je=je.length,Ye=je.filter(e=>null!==e.plan).length,Qe=je.reduce((e,n)=>{var t;return e+((null===(t=n.current_month)||void 0===t?void 0:t.revenue)||0)},0),He=je.reduce((e,n)=>{var t,r;return e+((null===(t=n.current_month)||void 0===t||null===(r=t.estimated_charges)||void 0===r?void 0:r.totalAmount)||0)},0),Xe=n||"MYR",qe=e=>{switch(e){case"paid":return"green";case"pending_payment":return"yellow";case"payment_submitted":return"blue";case"overdue":return"red";default:return"gray"}},Ke=Ce.filter(e=>{const n=e.restaurantName.toLowerCase().includes(Se.toLowerCase())||e.adminName.toLowerCase().includes(Se.toLowerCase())||e.location.toLowerCase().includes(Se.toLowerCase()),t="all"===De||e.status===De,r="all"===Me||e.paymentModel===Me;return n&&t&&r}),Ve=Ce.filter(e=>"active"===e.status).length,Ze=Ce.filter(e=>"trial"===e.status).length,en=Ce.filter(e=>"active"===e.status||"trial"===e.status).reduce((e,n)=>e+n.monthlyFee,0),nn=je.filter(e=>{var n;const t=e.restaurant_name.toLowerCase().includes(Ne.toLowerCase())||(e.restaurant_email||"").toLowerCase().includes(Ne.toLowerCase())||((null===(n=e.plan)||void 0===n?void 0:n.name)||"").toLowerCase().includes(Ne.toLowerCase()),r="all"===Oe||"with_plan"===Oe&&null!==e.plan||"no_plan"===Oe&&null===e.plan;return t&&r}),tn=e=>e?new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"-";return(0,x.jsxs)(i.A,{children:[(0,x.jsxs)(h,{children:[(0,x.jsxs)(m,{children:[(0,x.jsx)(g,{children:"Subscriptions"}),(0,x.jsxs)(v,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>{let e="";if("brand_plans"===xe){const n=["Restaurant","Email","Status","Plan","Subscription Fee","Revenue %","Rent Type","Billing","Monthly Revenue","Estimated Charges","Latest Invoice","Invoice Status"],t=(Ne||"all"!==Oe?nn:je).map(e=>{var n,t,r,a,i,s,o,l,d;return[`"${e.restaurant_name}"`,`"${e.restaurant_email||""}"`,e.restaurant_status,`"${(null===(n=e.plan)||void 0===n?void 0:n.name)||"No Plan"}"`,e.plan?parseFloat(e.plan.subscription_fee).toFixed(2):"0",e.plan?e.plan.revenue_percentage:"0",(null===(t=e.plan)||void 0===t?void 0:t.rent_type)||"none",(null===(r=e.plan)||void 0===r?void 0:r.billing_cycle)||"-",((null===(a=e.current_month)||void 0===a?void 0:a.revenue)||0).toFixed(2),((null===(i=e.current_month)||void 0===i||null===(s=i.estimated_charges)||void 0===s?void 0:s.totalAmount)||0).toFixed(2),(null===(o=e.latest_invoice)||void 0===o?void 0:o.invoice_number)||"-",(null===(l=e.latest_invoice)||void 0===l||null===(d=l.status)||void 0===d?void 0:d.replace(/_/g," "))||"-"]});e=[n.join(","),...t.map(e=>e.join(","))].join("\n")}else{const n=["Restaurant","Admin","Location","Plan","Status","Monthly Fee","Paid By","Start Date","End Date"],t=(Se||"all"!==De||"all"!==Me?Ke:Ce).map(e=>[`"${e.restaurantName}"`,`"${e.adminName}"`,`"${e.location}"`,e.planType,e.status,e.monthlyFee.toFixed(2),"brand_manager"===e.paymentModel?"Manager":"Restaurant",e.startDate,e.endDate]);e=[n.join(","),...t.map(e=>e.join(","))].join("\n")}const n=new Blob([e],{type:"text/csv;charset=utf-8;"}),t=document.createElement("a");t.href=URL.createObjectURL(n),t.download=`brand-${xe}-${(new Date).toISOString().split("T")[0]}.csv`,t.click(),URL.revokeObjectURL(t.href)},children:"Export"}),"brand_plans"===xe&&(0,x.jsx)(j,{variant:"success",onClick:()=>fe(!0),disabled:0===Ye,children:"Generate Invoices"})]})]}),(0,x.jsxs)(u,{children:[(0,x.jsxs)(y,{children:[(0,x.jsxs)(b,{active:"brand_plans"===xe,onClick:()=>he("brand_plans"),children:["Brand Plans (",Ye,")"]}),(0,x.jsxs)(b,{active:"pos_subscriptions"===xe,onClick:()=>he("pos_subscriptions"),children:["POS Subscriptions (",Je,")"]})]}),"brand_plans"===xe&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(f,{children:[(0,x.jsxs)(w,{color:"#059669",children:[(0,x.jsx)(F,{children:Je}),(0,x.jsx)(A,{children:"Brand Restaurants"}),(0,x.jsxs)(_,{children:[Ye," with plans assigned"]})]}),(0,x.jsxs)(w,{color:"#2563EB",children:[(0,x.jsx)(F,{children:(0,l.vv)(Qe,Xe)}),(0,x.jsx)(A,{children:"This Month Revenue"}),(0,x.jsx)(_,{children:"All brand restaurants combined"})]}),(0,x.jsxs)(w,{color:"#7C3AED",children:[(0,x.jsx)(F,{children:(0,l.vv)(He,Xe)}),(0,x.jsx)(A,{children:"Estimated Charges"}),(0,x.jsx)(_,{children:"Based on current month revenue"})]}),(0,x.jsxs)(w,{color:"#D97706",children:[(0,x.jsx)(F,{children:je.filter(e=>{var n;return"pending_payment"===(null===(n=e.latest_invoice)||void 0===n?void 0:n.status)}).length}),(0,x.jsx)(A,{children:"Pending Invoices"}),(0,x.jsx)(_,{children:"Awaiting payment"})]})]}),(0,x.jsxs)(c.Qn,{children:[(0,x.jsx)(c.DO,{placeholder:"Search restaurants, plans...",value:Ne,onChange:e=>Le(e.target.value)}),(0,x.jsxs)(c.Jt,{value:Oe,onChange:e=>Ie(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Restaurants"}),(0,x.jsx)("option",{value:"with_plan",children:"With Plan"}),(0,x.jsx)("option",{value:"no_plan",children:"No Plan"})]})]}),ue?(0,x.jsx)(ie,{children:"Loading subscription data..."}):0===nn.length?(0,x.jsxs)(q,{children:[(0,x.jsx)(K,{children:"\ud83d\udccb"}),(0,x.jsx)(V,{children:0===je.length?"No Restaurants":"No Results"}),(0,x.jsx)(Z,{children:0===je.length?"No restaurants are assigned to this brand yet.":"No restaurants match your search criteria."})]}):(0,x.jsx)(C,{children:nn.map(e=>(0,x.jsxs)(E,{children:[(0,x.jsxs)(k,{children:[(0,x.jsxs)("div",{children:[(0,x.jsx)(B,{children:e.restaurant_name}),(0,x.jsx)(S,{children:e.restaurant_email||"No email"})]}),(0,x.jsx)(z,{variant:"active"===e.restaurant_status?"green":"gray",children:e.restaurant_status})]}),e.plan?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(D,{children:[(0,x.jsx)(R,{children:e.plan.name}),parseFloat(e.plan.subscription_fee)>0&&(0,x.jsxs)(M,{children:[(0,x.jsx)(P,{children:"Subscription Fee"}),(0,x.jsxs)(T,{children:[(0,l.vv)(parseFloat(e.plan.subscription_fee),Xe),"/mo"]})]}),parseFloat(e.plan.revenue_percentage)>0&&(0,x.jsxs)(M,{children:[(0,x.jsx)(P,{children:"Revenue Royalty"}),(0,x.jsxs)(T,{children:[e.plan.revenue_percentage,"%"]})]}),"none"!==e.plan.rent_type&&(0,x.jsxs)(M,{children:[(0,x.jsx)(P,{children:"Rent Type"}),(0,x.jsx)(T,{style:{textTransform:"capitalize"},children:e.plan.rent_type})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(P,{children:"Billing"}),(0,x.jsxs)(T,{style:{textTransform:"capitalize"},children:[e.plan.billing_cycle," ",e.plan.auto_generate?"(Auto)":"(Manual)"]})]}),(0,x.jsxs)(M,{children:[(0,x.jsx)(P,{children:"Active Since"}),(0,x.jsx)(T,{children:tn(e.plan.activation_date)})]})]}),(0,x.jsxs)($,{children:[(0,x.jsx)(N,{children:"Current Month Revenue"}),(0,x.jsx)(L,{children:(0,l.vv)(e.current_month.revenue,Xe)}),(0,x.jsxs)(O,{children:[e.current_month.order_count," completed orders"]})]}),e.current_month.estimated_charges&&e.current_month.estimated_charges.items.length>0&&(0,x.jsxs)(I,{children:[(0,x.jsx)(U,{children:"Estimated Charges (This Month)"}),e.current_month.estimated_charges.items.map((e,n)=>(0,x.jsxs)(W,{children:[(0,x.jsx)("span",{children:"subscription_fee"===e.item_type?"Subscription Fee":"revenue_percentage"===e.item_type?"Revenue Royalty":"Rent"}),(0,x.jsx)("span",{children:(0,l.vv)(e.calculated_amount,Xe)})]},n)),e.current_month.estimated_charges.taxAmount>0&&(0,x.jsxs)(W,{children:[(0,x.jsx)("span",{children:"Tax"}),(0,x.jsx)("span",{children:(0,l.vv)(e.current_month.estimated_charges.taxAmount,Xe)})]}),(0,x.jsxs)(G,{children:[(0,x.jsx)("span",{children:"Total"}),(0,x.jsx)("span",{children:(0,l.vv)(e.current_month.estimated_charges.totalAmount,Xe)})]})]})]}):(0,x.jsx)(X,{children:"No brand plan assigned - Go to Plans page to assign"}),e.latest_invoice&&(0,x.jsxs)(J,{children:[(0,x.jsxs)(Y,{children:[(0,x.jsx)(Q,{children:e.latest_invoice.invoice_number}),(0,x.jsxs)(H,{children:[tn(e.latest_invoice.billing_period_start)," ~ ",tn(e.latest_invoice.billing_period_end)]})]}),(0,x.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,x.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:(0,l.vv)(parseFloat(e.latest_invoice.total_amount),Xe)}),(0,x.jsx)(z,{variant:qe(e.latest_invoice.status),children:e.latest_invoice.status.replace(/_/g," ")})]})]})]},e.restaurant_id))})]}),"pos_subscriptions"===xe&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(f,{children:[(0,x.jsxs)(w,{color:"#635BFF",children:[(0,x.jsx)(F,{children:Ce.length}),(0,x.jsx)(A,{children:"Total Restaurants"}),(0,x.jsxs)(_,{children:[Ve," active, ",Ze," trial"]})]}),(0,x.jsxs)(w,{color:"#059669",children:[(0,x.jsx)(F,{children:Ve}),(0,x.jsx)(A,{children:"Active Subscriptions"})]}),(0,x.jsxs)(w,{color:"#2563EB",children:[(0,x.jsx)(F,{children:(0,l.vv)(en,Xe)}),(0,x.jsx)(A,{children:"Monthly POS Fees"}),(0,x.jsx)(_,{children:"Active + Trial combined"})]}),(0,x.jsxs)(w,{color:"#D97706",children:[(0,x.jsx)(F,{children:Ce.filter(e=>"brand_manager"===e.paymentModel).length}),(0,x.jsx)(A,{children:"Paid by Manager"}),(0,x.jsxs)(_,{children:[Ce.filter(e=>"restaurant"===e.paymentModel).length," paid by restaurant"]})]})]}),(0,x.jsxs)(c.Qn,{children:[(0,x.jsx)(c.DO,{placeholder:"Search restaurants...",value:Se,onChange:e=>ze(e.target.value)}),(0,x.jsxs)(c.Jt,{value:De,onChange:e=>Re(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Status"}),(0,x.jsx)("option",{value:"active",children:"Active"}),(0,x.jsx)("option",{value:"trial",children:"Trial"}),(0,x.jsx)("option",{value:"expired",children:"Expired"}),(0,x.jsx)("option",{value:"suspended",children:"Suspended"}),(0,x.jsx)("option",{value:"cancelled",children:"Cancelled"})]}),(0,x.jsxs)(c.Jt,{value:Me,onChange:e=>Pe(e.target.value),children:[(0,x.jsx)("option",{value:"all",children:"All Payment"}),(0,x.jsx)("option",{value:"brand_manager",children:"Paid by Manager"}),(0,x.jsx)("option",{value:"restaurant",children:"Paid by Restaurant"})]})]}),ke?(0,x.jsx)(ie,{children:"Loading POS subscription data..."}):0===Ce.length?(0,x.jsxs)(q,{children:[(0,x.jsx)(K,{children:"\ud83d\udce6"}),(0,x.jsx)(V,{children:"No POS Subscriptions"}),(0,x.jsx)(Z,{children:"No restaurants are assigned to this brand yet."})]}):(0,x.jsxs)(p.XI,{children:[(0,x.jsxs)(se,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr",children:[(0,x.jsx)("span",{children:"Restaurant"}),(0,x.jsx)("span",{children:"Plan"}),(0,x.jsx)("span",{children:"Status"}),(0,x.jsx)("span",{children:"Monthly Fee"}),(0,x.jsx)("span",{children:"Paid By"}),(0,x.jsx)("span",{children:"Expires"})]}),Ke.map(e=>(0,x.jsx)(oe,{columns:"2.5fr 1fr 1fr 1fr 1fr 1fr",children:(0,x.jsxs)(p.Np,{children:[(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Restaurant"}),(0,x.jsxs)("div",{children:[(0,x.jsx)(le,{children:e.restaurantName}),(0,x.jsxs)(de,{children:[e.adminName," \xb7 ",e.location]})]})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Plan"}),(0,x.jsx)(ce,{planType:e.planType,children:e.planType.charAt(0).toUpperCase()+e.planType.slice(1)})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Status"}),(0,x.jsx)(pe,{status:e.status,children:e.status.charAt(0).toUpperCase()+e.status.slice(1)})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Monthly Fee"}),(0,l.vv)(e.monthlyFee,Xe)]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Paid By"}),(0,x.jsx)("span",{style:{display:"inline-flex",padding:"4px 8px",borderRadius:"6px",fontSize:"12px",fontWeight:500,background:"brand_manager"===e.paymentModel?"#EDE9FE":"#F3F4F6",color:"brand_manager"===e.paymentModel?"#7C3AED":"#6B7280"},children:"brand_manager"===e.paymentModel?"Manager":"Restaurant"})]}),(0,x.jsxs)(p.Uj,{children:[(0,x.jsx)(p.PM,{children:"Expires"}),(()=>{if("-"===e.endDate)return(0,x.jsx)("span",{style:{color:"#9CA3AF"},children:"-"});const n=new Date,t=new Date(e.endDate),r=Math.ceil((t.getTime()-n.getTime())/864e5);return r<0?(0,x.jsx)("span",{style:{color:"#DC2626",fontWeight:500},children:"Expired"}):r<=7?(0,x.jsxs)("span",{style:{color:"#F59E0B",fontWeight:500},children:[r,"d"]}):r<=30?(0,x.jsxs)("span",{style:{color:"#10B981",fontWeight:500},children:[r,"d"]}):(0,x.jsxs)("span",{style:{color:"#6B7280"},children:[r,"d"]})})()]})]})},e.id))]})]})]})]}),(0,x.jsx)(ee,{show:be,children:(0,x.jsxs)(ne,{children:[(0,x.jsx)(te,{children:"Generate Brand Invoices"}),(0,x.jsx)(re,{children:"This will generate invoices for the previous month based on each restaurant's assigned plan and actual revenue."}),(0,x.jsxs)("div",{style:{padding:"16px",background:"#F0FDF4",borderRadius:"8px",marginBottom:"16px"},children:[(0,x.jsx)("div",{style:{fontSize:"13px",color:"#059669",fontWeight:600,marginBottom:"8px"},children:"Summary"}),(0,x.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:[(0,x.jsxs)("div",{children:[Ye," restaurant(s) with active brand plans"]}),(0,x.jsx)("div",{children:"Invoices for auto-generate plans will be created"}),(0,x.jsx)("div",{children:"Duplicate invoices will be automatically skipped"})]})]}),(0,x.jsx)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px"},children:(0,x.jsx)("div",{style:{fontSize:"13px",color:"#92400E"},children:"Revenue-based charges (royalty %, rent %) are calculated from completed orders in the billing period."})}),Te&&(0,x.jsx)("div",{style:{padding:"10px 16px",marginTop:"12px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"8px",color:"#DC2626",fontSize:"13px"},children:Te}),(0,x.jsxs)(ae,{children:[(0,x.jsx)(j,{variant:"secondary",onClick:()=>{fe(!1),$e("")},children:"Cancel"}),(0,x.jsx)(j,{variant:"success",onClick:()=>{$e(""),(async()=>{if(t){ve(!0);try{const e=await fetch(`${o.JR}/api/brands/${t}/generate-invoices`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${Ue}`},body:JSON.stringify({})});if(e.ok){const n=await e.json();Fe(n.data),fe(!1),_e(!0),We()}else{const n=await e.json().catch(()=>({message:"Unknown error"}));$e(`Failed: ${n.message}`)}}catch(e){console.error("Error generating invoices:",e),$e("Failed to generate invoices")}finally{ve(!1)}}})()},disabled:ge,children:ge?"Generating...":"Generate Now"})]})]})}),(0,x.jsx)(ee,{show:Ae,children:(0,x.jsxs)(ne,{children:[(0,x.jsx)(te,{children:"Invoice Generation Complete"}),we&&(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(re,{children:["Period: ",we.period.start," ~ ",we.period.end]}),(0,x.jsxs)(f,{style:{marginBottom:"16px"},children:[(0,x.jsxs)(w,{color:"#059669",children:[(0,x.jsx)(F,{children:we.generated}),(0,x.jsx)(A,{children:"Generated"})]}),(0,x.jsxs)(w,{color:"#D97706",children:[(0,x.jsx)(F,{children:we.skipped}),(0,x.jsx)(A,{children:"Skipped"})]})]}),(0,x.jsx)("div",{style:{maxHeight:"300px",overflowY:"auto"},children:we.results.map((e,n)=>(0,x.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #F3F4F6",fontSize:"13px"},children:[(0,x.jsxs)("div",{children:[(0,x.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.restaurant}),e.invoice_number&&(0,x.jsxs)("div",{style:{color:"#6B7280",fontSize:"12px"},children:[e.invoice_number," - ",(0,l.vv)(e.amount||0,Xe)]}),e.reason&&(0,x.jsx)("div",{style:{color:"#9CA3AF",fontSize:"12px"},children:e.reason})]}),(0,x.jsx)(z,{variant:"generated"===e.status?"green":"yellow",children:e.status})]},n))})]}),(0,x.jsx)(ae,{children:(0,x.jsx)(j,{variant:"primary",onClick:()=>_e(!1),style:{flex:1},children:"Close"})})]})})]})}}}]);