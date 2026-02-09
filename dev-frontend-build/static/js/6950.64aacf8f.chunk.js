"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6950],{4021:(e,n,r)=>{r.d(n,{i1:()=>a});var t=r(9950),i=r(1367),s=r(6038);const a=()=>{const{user:e}=(0,i.As)(),[n,r]=(0,t.useState)("RM"),[a,o]=(0,t.useState)(Object.keys(s.DL)),[d,l]=(0,t.useState)(!0),[c,p]=(0,t.useState)(null);return(0,t.useEffect)(()=>{(async()=>{const n=window.location.pathname.split("/"),t=n.indexOf("restaurant");let i=t>=0?n[t+1]:null;if(!i&&null!==e&&void 0!==e&&e.restaurant_id&&(i=e.restaurant_id.toString()),!i)return r("RM"),void l(!1);try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/restaurants/${i}`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(n.ok){var s;const e=await n.json(),t=e.currency||(null===(s=e.operation_settings)||void 0===s?void 0:s.currency)||"RM";r(t)}else r("RM")}catch(a){console.error("Failed to fetch restaurant currency:",a),p("Failed to load currency settings"),r("RM")}finally{l(!1)}})()},[null===e||void 0===e?void 0:e.restaurant_id]),{defaultCurrency:n,supportedCurrencies:a,loading:d,error:c}}},6950:(e,n,r)=>{r.r(n),r.d(n,{default:()=>ie});var t=r(9950),i=r(4752),s=r(3310),a=r(1367),o=r(6910),d=r(6038),l=r(4021),c=r(4414);const p=i.Ay.div`
  min-height: 100vh;
  background: #FAFBFC;
`,x=i.Ay.div`
  padding: 32px;
  @media (max-width: 768px) { padding: 20px; }
`,h=i.Ay.div`
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
`,u=i.Ay.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;
  @media (max-width: 768px) { font-size: 20px; }
`,g=i.Ay.div`
  display: flex;
  gap: 12px;
`,m=i.Ay.button`
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
`,v=i.Ay.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 2px solid #E6EBF1;
`,b=i.Ay.button`
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
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); transform: translateY(-2px); }
`,j=i.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`,A=i.Ay.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,F=i.Ay.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-top: 4px;
`,_=i.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  gap: 24px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,w=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  &:hover { box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); transform: translateY(-2px); border-color: #635BFF; }
`,B=i.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`,k=i.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
`,E=i.Ay.div`
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
`,C=i.Ay.div`
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  margin-bottom: 16px;
`,S=i.Ay.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`,D=i.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #6B7280;
  padding: 4px 0;
  & + & { border-top: 1px solid #E6EBF1; }
`,R=i.Ay.span`
  color: #6B7280;
`,$=i.Ay.span`
  font-weight: 600;
  color: #0A2540;
`,T=i.Ay.div`
  padding: 16px;
  background: #F0FDF4;
  border-radius: 8px;
  border: 1px solid #BBF7D0;
  margin-bottom: 16px;
`,M=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,P=i.Ay.div`
  font-size: 22px;
  font-weight: 700;
  color: #059669;
`,I=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`,O=i.Ay.div`
  padding: 16px;
  background: #FFF7ED;
  border-radius: 8px;
  border: 1px solid #FED7AA;
  margin-bottom: 16px;
`,G=i.Ay.div`
  font-size: 12px;
  font-weight: 600;
  color: #C2410C;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`,N=i.Ay.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 4px 0;
  color: #6B7280;
`,Y=i.Ay.div`
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
`,L=i.Ay.div``,W=i.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`,H=i.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,U=i.Ay.div`
  padding: 12px 16px;
  background: #F9FAFB;
  border: 1px dashed #D1D5DB;
  border-radius: 8px;
  text-align: center;
  color: #9CA3AF;
  font-size: 14px;
  margin-bottom: 16px;
`,V=i.Ay.div`
  text-align: center;
  padding: 60px 40px;
  color: #9CA3AF;
`,q=i.Ay.div`
  font-size: 48px;
  margin-bottom: 16px;
`,K=i.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 8px;
`,Q=i.Ay.div`
  font-size: 14px;
  color: #9CA3AF;
`,X=i.Ay.div`
  display: ${e=>e.show?"flex":"none"};
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 0;
`,Z=i.Ay.div`
  background: white;
  border-radius: 12px;
  padding: 32px;
  max-width: 560px;
  width: 90%;
  flex-shrink: 0;
`,ee=i.Ay.h2`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`,ne=i.Ay.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 24px 0;
`,re=i.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`,te=i.Ay.div`
  text-align: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`,ie=()=>{const{user:e}=(0,a.As)(),{defaultCurrency:n}=(0,l.i1)(),[r,i]=(0,t.useState)(null),[ie,se]=(0,t.useState)("brand_plans"),[ae,oe]=(0,t.useState)(!0),[de,le]=(0,t.useState)(!1),[ce,pe]=(0,t.useState)([]),[xe,he]=(0,t.useState)(!1),[ue,ge]=(0,t.useState)(null),[me,ve]=(0,t.useState)(!1),be=localStorage.getItem("auth_token");(0,t.useEffect)(()=>{null!==e&&void 0!==e&&e.brand_id&&i(Number(e.brand_id))},[e]);const ye=(0,t.useCallback)(async()=>{if(r){oe(!0);try{const e=await fetch(`${o.JR}/api/brands/${r}/subscriptions`,{headers:{Authorization:`Bearer ${be}`}});if(e.ok){const n=await e.json();pe(n.data||[])}}catch(e){console.error("Error fetching brand subscriptions:",e)}finally{oe(!1)}}},[r,be]);(0,t.useEffect)(()=>{ye()},[ye]);const fe=ce.length,je=ce.filter(e=>null!==e.plan).length,Ae=ce.reduce((e,n)=>{var r;return e+((null===(r=n.current_month)||void 0===r?void 0:r.revenue)||0)},0),Fe=ce.reduce((e,n)=>{var r,t;return e+((null===(r=n.current_month)||void 0===r||null===(t=r.estimated_charges)||void 0===t?void 0:t.totalAmount)||0)},0),_e=n||"MYR",we=e=>{switch(e){case"paid":return"green";case"pending_payment":return"yellow";case"payment_submitted":return"blue";case"overdue":return"red";default:return"gray"}},Be=e=>e?new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}):"-";return(0,c.jsxs)(s.A,{children:[(0,c.jsxs)(p,{children:[(0,c.jsxs)(h,{children:[(0,c.jsx)(u,{children:"Subscriptions & Billing"}),(0,c.jsx)(g,{children:"brand_plans"===ie&&(0,c.jsx)(m,{variant:"success",onClick:()=>he(!0),disabled:0===je,children:"Generate Invoices"})})]}),(0,c.jsxs)(x,{children:[(0,c.jsxs)(v,{children:[(0,c.jsxs)(b,{active:"brand_plans"===ie,onClick:()=>se("brand_plans"),children:["Brand Plans (",je,")"]}),(0,c.jsxs)(b,{active:"pos_subscriptions"===ie,onClick:()=>se("pos_subscriptions"),children:["POS Subscriptions (",fe,")"]})]}),"brand_plans"===ie&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(y,{children:[(0,c.jsxs)(f,{color:"#059669",children:[(0,c.jsx)(j,{children:fe}),(0,c.jsx)(A,{children:"Brand Restaurants"}),(0,c.jsxs)(F,{children:[je," with plans assigned"]})]}),(0,c.jsxs)(f,{color:"#2563EB",children:[(0,c.jsx)(j,{children:(0,d.vv)(Ae,_e)}),(0,c.jsx)(A,{children:"This Month Revenue"}),(0,c.jsx)(F,{children:"All brand restaurants combined"})]}),(0,c.jsxs)(f,{color:"#7C3AED",children:[(0,c.jsx)(j,{children:(0,d.vv)(Fe,_e)}),(0,c.jsx)(A,{children:"Estimated Charges"}),(0,c.jsx)(F,{children:"Based on current month revenue"})]}),(0,c.jsxs)(f,{color:"#D97706",children:[(0,c.jsx)(j,{children:ce.filter(e=>{var n;return"pending_payment"===(null===(n=e.latest_invoice)||void 0===n?void 0:n.status)}).length}),(0,c.jsx)(A,{children:"Pending Invoices"}),(0,c.jsx)(F,{children:"Awaiting payment"})]})]}),ae?(0,c.jsx)(te,{children:"Loading subscription data..."}):0===ce.length?(0,c.jsxs)(V,{children:[(0,c.jsx)(q,{children:"\ud83d\udccb"}),(0,c.jsx)(K,{children:"No Restaurants"}),(0,c.jsx)(Q,{children:"No restaurants are assigned to this brand yet."})]}):(0,c.jsx)(_,{children:ce.map(e=>(0,c.jsxs)(w,{children:[(0,c.jsxs)(B,{children:[(0,c.jsxs)("div",{children:[(0,c.jsx)(k,{children:e.restaurant_name}),(0,c.jsx)(E,{children:e.restaurant_email||"No email"})]}),(0,c.jsx)(z,{variant:"active"===e.restaurant_status?"green":"gray",children:e.restaurant_status})]}),e.plan?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(C,{children:[(0,c.jsx)(S,{children:e.plan.name}),parseFloat(e.plan.subscription_fee)>0&&(0,c.jsxs)(D,{children:[(0,c.jsx)(R,{children:"Subscription Fee"}),(0,c.jsxs)($,{children:[(0,d.vv)(parseFloat(e.plan.subscription_fee),_e),"/mo"]})]}),parseFloat(e.plan.revenue_percentage)>0&&(0,c.jsxs)(D,{children:[(0,c.jsx)(R,{children:"Revenue Royalty"}),(0,c.jsxs)($,{children:[e.plan.revenue_percentage,"%"]})]}),"none"!==e.plan.rent_type&&(0,c.jsxs)(D,{children:[(0,c.jsx)(R,{children:"Rent Type"}),(0,c.jsx)($,{style:{textTransform:"capitalize"},children:e.plan.rent_type})]}),(0,c.jsxs)(D,{children:[(0,c.jsx)(R,{children:"Billing"}),(0,c.jsxs)($,{style:{textTransform:"capitalize"},children:[e.plan.billing_cycle," ",e.plan.auto_generate?"(Auto)":"(Manual)"]})]}),(0,c.jsxs)(D,{children:[(0,c.jsx)(R,{children:"Active Since"}),(0,c.jsx)($,{children:Be(e.plan.activation_date)})]})]}),(0,c.jsxs)(T,{children:[(0,c.jsx)(M,{children:"Current Month Revenue"}),(0,c.jsx)(P,{children:(0,d.vv)(e.current_month.revenue,_e)}),(0,c.jsxs)(I,{children:[e.current_month.order_count," completed orders"]})]}),e.current_month.estimated_charges&&e.current_month.estimated_charges.items.length>0&&(0,c.jsxs)(O,{children:[(0,c.jsx)(G,{children:"Estimated Charges (This Month)"}),e.current_month.estimated_charges.items.map((e,n)=>(0,c.jsxs)(N,{children:[(0,c.jsx)("span",{children:"subscription_fee"===e.item_type?"Subscription Fee":"revenue_percentage"===e.item_type?"Revenue Royalty":"Rent"}),(0,c.jsx)("span",{children:(0,d.vv)(e.calculated_amount,_e)})]},n)),e.current_month.estimated_charges.taxAmount>0&&(0,c.jsxs)(N,{children:[(0,c.jsx)("span",{children:"Tax"}),(0,c.jsx)("span",{children:(0,d.vv)(e.current_month.estimated_charges.taxAmount,_e)})]}),(0,c.jsxs)(Y,{children:[(0,c.jsx)("span",{children:"Total"}),(0,c.jsx)("span",{children:(0,d.vv)(e.current_month.estimated_charges.totalAmount,_e)})]})]})]}):(0,c.jsx)(U,{children:"No brand plan assigned - Go to Plans page to assign"}),e.latest_invoice&&(0,c.jsxs)(J,{children:[(0,c.jsxs)(L,{children:[(0,c.jsx)(W,{children:e.latest_invoice.invoice_number}),(0,c.jsxs)(H,{children:[Be(e.latest_invoice.billing_period_start)," ~ ",Be(e.latest_invoice.billing_period_end)]})]}),(0,c.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[(0,c.jsx)("span",{style:{fontWeight:600,color:"#0A2540"},children:(0,d.vv)(parseFloat(e.latest_invoice.total_amount),_e)}),(0,c.jsx)(z,{variant:we(e.latest_invoice.status),children:e.latest_invoice.status.replace(/_/g," ")})]})]})]},e.restaurant_id))})]}),"pos_subscriptions"===ie&&(0,c.jsxs)(V,{children:[(0,c.jsx)(q,{children:"\ud83d\udce6"}),(0,c.jsx)(K,{children:"POS Subscriptions"}),(0,c.jsxs)(Q,{children:["POS subscription plans (Basic, Professional, Enterprise) are managed by System Admin.",(0,c.jsx)("br",{}),"View your restaurants' POS subscription status in the Restaurants page."]})]})]})]}),(0,c.jsx)(X,{show:xe,children:(0,c.jsxs)(Z,{children:[(0,c.jsx)(ee,{children:"Generate Brand Invoices"}),(0,c.jsx)(ne,{children:"This will generate invoices for the previous month based on each restaurant's assigned plan and actual revenue."}),(0,c.jsxs)("div",{style:{padding:"16px",background:"#F0FDF4",borderRadius:"8px",marginBottom:"16px"},children:[(0,c.jsx)("div",{style:{fontSize:"13px",color:"#059669",fontWeight:600,marginBottom:"8px"},children:"Summary"}),(0,c.jsxs)("div",{style:{fontSize:"14px",color:"#374151"},children:[(0,c.jsxs)("div",{children:[je," restaurant(s) with active brand plans"]}),(0,c.jsx)("div",{children:"Invoices for auto-generate plans will be created"}),(0,c.jsx)("div",{children:"Duplicate invoices will be automatically skipped"})]})]}),(0,c.jsx)("div",{style:{padding:"12px 16px",background:"#FEF3C7",borderRadius:"8px"},children:(0,c.jsx)("div",{style:{fontSize:"13px",color:"#92400E"},children:"Revenue-based charges (royalty %, rent %) are calculated from completed orders in the billing period."})}),(0,c.jsxs)(re,{children:[(0,c.jsx)(m,{variant:"secondary",onClick:()=>he(!1),children:"Cancel"}),(0,c.jsx)(m,{variant:"success",onClick:async()=>{if(r){le(!0);try{const e=await fetch(`${o.JR}/api/brands/${r}/generate-invoices`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${be}`},body:JSON.stringify({})});if(e.ok){const n=await e.json();ge(n.data),he(!1),ve(!0),ye()}else{const n=await e.json();alert(`Failed: ${n.message}`)}}catch(e){console.error("Error generating invoices:",e),alert("Failed to generate invoices")}finally{le(!1)}}},disabled:de,children:de?"Generating...":"Generate Now"})]})]})}),(0,c.jsx)(X,{show:me,children:(0,c.jsxs)(Z,{children:[(0,c.jsx)(ee,{children:"Invoice Generation Complete"}),ue&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(ne,{children:["Period: ",ue.period.start," ~ ",ue.period.end]}),(0,c.jsxs)(y,{style:{marginBottom:"16px"},children:[(0,c.jsxs)(f,{color:"#059669",children:[(0,c.jsx)(j,{children:ue.generated}),(0,c.jsx)(A,{children:"Generated"})]}),(0,c.jsxs)(f,{color:"#D97706",children:[(0,c.jsx)(j,{children:ue.skipped}),(0,c.jsx)(A,{children:"Skipped"})]})]}),(0,c.jsx)("div",{style:{maxHeight:"300px",overflowY:"auto"},children:ue.results.map((e,n)=>(0,c.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #F3F4F6",fontSize:"13px"},children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{style:{fontWeight:600,color:"#0A2540"},children:e.restaurant}),e.invoice_number&&(0,c.jsxs)("div",{style:{color:"#6B7280",fontSize:"12px"},children:[e.invoice_number," - ",(0,d.vv)(e.amount||0,_e)]}),e.reason&&(0,c.jsx)("div",{style:{color:"#9CA3AF",fontSize:"12px"},children:e.reason})]}),(0,c.jsx)(z,{variant:"generated"===e.status?"green":"yellow",children:e.status})]},n))})]}),(0,c.jsx)(re,{children:(0,c.jsx)(m,{variant:"primary",onClick:()=>ve(!1),style:{flex:1},children:"Close"})})]})})]})}}}]);