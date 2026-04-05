"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9968],{2597:(e,n,r)=>{r.d(n,{Ex:()=>c,oz:()=>d,tU:()=>l});r(9950);var i=r(4752),t=r(4414);const a=i.Ay.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`,o=i.Ay.button`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${e=>e.active?"#635BFF":"#6B7C93"};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${e=>e.active?"#635BFF":"transparent"};
    transition: all 0.15s;
  }
`,s=i.Ay.span`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  background: ${e=>{switch(e.variant){case"danger":return"#DC2626";case"warning":return"#F59E0B";default:return"#E6EBF1"}}};
  color: ${e=>{switch(e.variant){case"danger":case"warning":return"white";default:return"#6B7C93"}}};
`,l=e=>{let{children:n,className:r,style:i}=e;return(0,t.jsx)(a,{className:r,style:i,children:n})},d=e=>{let{active:n,onClick:r,children:i,className:a}=e;return(0,t.jsx)(o,{active:n,onClick:r,className:a,children:i})},c=e=>{let{count:n,variant:r="default",showZero:i=!1}=e;return 0!==n||i?(0,t.jsx)(s,{variant:r,children:n}):null}},2653:(e,n,r)=>{r.d(n,{M:()=>a});var i=r(9950),t=r(4492);function a(e){const[n,r]=(0,t.ok)(),a=(0,i.useCallback)(()=>n.get("tab")||e,[n,e]),[o,s]=(0,i.useState)(a());return[o,(0,i.useCallback)(e=>{s(e),r({tab:e})},[r])]}},8012:(e,n,r)=>{r.d(n,{Ay:()=>l});r(9950);var i=r(4752),t=r(4414);const a=i.Ay.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 12px 16px;
    height: auto;
    min-height: 48px;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }
`,o=i.Ay.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 18px;
    white-space: nowrap;
    flex-shrink: 0;
  }
`,s=i.Ay.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`,l=e=>{let{title:n,children:r}=e;return(0,t.jsxs)(a,{children:[(0,t.jsx)(o,{children:n}),r&&(0,t.jsx)(s,{children:r})]})}},9968:(e,n,r)=>{r.r(n),r.d(n,{default:()=>ve});var i=r(9950),t=r(4752),a=r(5781),o=r(1367),s=r(9610),l=r(2597),d=r(2653),c=r(8666),p=r(8012),x=r(6038),u=r(4414);const h=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`,g=t.Ay.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`,m=t.Ay.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`,y=t.Ay.div`
  font-size: 16px;
  color: #6B7280;
`,f=t.Ay.span`
  font-size: 13px;
  color: #059669;
  font-style: italic;
`,v=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,j=t.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F9FAFB;
  border-radius: 8px;
`,b=t.Ay.span`
  font-size: 13px;
  color: #6B7280;
`,w=t.Ay.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`,F=t.Ay.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"active":return"#ECFDF5";case"trial":return"#EFF6FF";case"overdue":return"#FEF3C7";case"suspended":return"#FEE2E2";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.status){case"active":return"#059669";case"trial":return"#2563EB";case"overdue":return"#D97706";case"suspended":return"#DC2626";default:return"#6B7280"}}};
`,A=t.Ay.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`,C=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`,_=t.Ay.div`
  font-size: 13px;
  color: #78350F;
  line-height: 1.5;
`,k=t.Ay.div`
  background: ${e=>"warning"===e.variant?"#FEF3C7":"#EFF6FF"};
  border: 1px solid ${e=>"warning"===e.variant?"#FDE68A":"#BFDBFE"};
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  font-size: 13px;
  color: ${e=>"warning"===e.variant?"#92400E":"#1E40AF"};
  line-height: 1.5;
`,B=t.Ay.button`
  padding: 10px 20px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;

  &:hover { background: #5046E5; }
  &:disabled { background: #D1D5DB; cursor: not-allowed; }
`,S=t.Ay.button`
  padding: 6px 14px;
  background: white;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 12px;

  &:hover { background: #FEE2E2; }
`,E=t.Ay.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;

  &:hover { color: #5046E5; }
`,z=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 16px;
`,D=t.Ay.div`
  border: 2px solid ${e=>e.isCurrent?"#635BFF":e.isSelected?"#10B981":"#E6EBF1"};
  border-radius: 12px;
  padding: 20px;
  position: relative;
  cursor: ${e=>e.isCurrent?"default":"pointer"};
  background: ${e=>e.isCurrent?"#F8F7FF":"white"};
  transition: border-color 0.15s;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: ${e=>(e.isCurrent,"#635BFF")};
  }
`,P=t.Ay.div`
  position: absolute;
  top: -10px;
  right: 16px;
  background: #635BFF;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 10px;
`,$=t.Ay.div`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`,I=t.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 4px;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #6B7280;
  }
`,M=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  padding: 3px 0;
`,T=t.Ay.div`
  flex: 1;
  min-height: 12px;
`,N=t.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: ${e=>"upgrade"===e.type?"#059669":"#D97706"};
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
`,R=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,U=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`,L=t.Ay.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${e=>e.active?"#635BFF":"#E6EBF1"};
  background: ${e=>e.active?"#F8F7FF":"white"};
  color: ${e=>e.disabled?"#D1D5DB":e.active?"#635BFF":"#6B7280"};
  font-size: 14px;
  font-weight: 500;
  cursor: ${e=>e.disabled?"not-allowed":"pointer"};
  opacity: ${e=>e.disabled?.5:1};
`,O=t.Ay.div`
  background: #F9FAFB;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 20px;
  margin: 16px 0;
`,G=t.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: ${e=>e.bold?"15px":"14px"};
  font-weight: ${e=>e.bold?"600":"400"};
  color: ${e=>e.highlight?"#059669":"#1F2937"};
`,W=t.Ay.hr`
  border: none;
  border-top: 1px dashed #D1D5DB;
  margin: 8px 0;
`,Y=t.Ay.div`
  font-size: 13px;
  color: #059669;
  padding: 3px 0;
`,q=t.Ay.div`
  font-size: 13px;
  color: #D97706;
  padding: 3px 0;
`,H=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  padding: 3px 0;
  display: flex;
  justify-content: space-between;
`,J=t.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`;function Z(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"-"}function K(e){return-1===e?"Unlimited":String(e)}const V=()=>{var e,n,r,t,a,l;const{user:d}=(0,o.As)(),[c,p]=(0,i.useState)(null),[V,Q]=(0,i.useState)(!0),[X,ee]=(0,i.useState)(null),ne=()=>{const e=null===d||void 0===d?void 0:d.role,n=(null===d||void 0===d?void 0:d.restaurantId)||(null===d||void 0===d?void 0:d.restaurant_id);return"Restaurant Admin"===e&&n?`/restaurant/${n}/invoices`:"Brand General"===e?"/pos/brand/invoices":"Foodcourt General"===e?"/pos/foodcourt/invoices":"Restaurant Owner"===e?"/pos/owner/invoices":"/pos/profile"},[re,ie]=(0,i.useState)(!1),[te,ae]=(0,i.useState)(null),[oe,se]=(0,i.useState)("monthly"),[le,de]=(0,i.useState)(!1),[ce,pe]=(0,i.useState)(!1),[xe,ue]=(0,i.useState)(!1),[he,ge]=(0,i.useState)(!1),[me,ye]=(0,i.useState)(null),[fe,ve]=(0,i.useState)(!1),[je,be]=(0,i.useState)(null),[we,Fe]=(0,i.useState)([]),Ae=localStorage.getItem("auth_token"),Ce=(0,i.useCallback)(async()=>{try{Q(!0);const e=await fetch("/api/subscriptions/my-plan",{headers:{Authorization:`Bearer ${Ae}`}}),n=await e.json();n.success?(p(n),se(n.current.billing_cycle||"monthly")):ee(n.message||"Failed to load subscription data")}catch{ee("Failed to load subscription data")}finally{Q(!1)}},[Ae]);(0,i.useEffect)(()=>{Ce()},[Ce]);const _e=async()=>{if(te&&c){ve(!0),be(null);try{const e=await fetch("/api/subscriptions/change-plan",{method:"POST",headers:{Authorization:`Bearer ${Ae}`,"Content-Type":"application/json"},body:JSON.stringify({new_plan_id:te.id,new_billing_cycle:oe})}),n=await e.json();n.success?(ye(n),de(!1),ge(!0),Ce()):(n.exceeded&&Fe(n.exceeded),be(n.message||"Failed to change plan"))}catch{be("Network error. Please try again.")}finally{ve(!1)}}};if(V)return(0,u.jsx)(J,{children:"Loading subscription data..."});if(X||!c)return(0,u.jsx)(k,{variant:"warning",children:X||"Failed to load subscription data."});const{current:ke,pending_change:Be,available_plans:Se}=c,Ee=(e,n)=>{const r=e.currency_prices[ke.currency];return r?"annual"===n?r.annual:r.monthly:"annual"===n?e.annual_price:e.monthly_price},ze=(e,n)=>{var r,i,t;if(e.is_current&&n===ke.billing_cycle)return null;if(e.is_current&&n!==ke.billing_cycle)return"cycle_change";const a=null!==(r=null===(i=Se.find(e=>e.is_current))||void 0===i?void 0:i.sort_order)&&void 0!==r?r:0;return(null!==(t=e.sort_order)&&void 0!==t?t:0)>a?"upgrade":"downgrade"};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(h,{children:[(0,u.jsxs)(g,{children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(m,{children:ke.plan_type}),(0,u.jsxs)(y,{children:[(0,x.vv)(ke.plan_amount,ke.currency)," / ","annual"===ke.billing_cycle?"year":"month",ke.discount_type&&"none"!==ke.discount_type&&ke.discount_value&&(0,u.jsxs)(u.Fragment,{children:[" ",(0,u.jsx)(f,{children:"(discount applied by administrator)"})]})]})]}),ke.can_change&&(0,u.jsx)(B,{onClick:()=>{ie(!0),be(null)},children:"Change Plan"})]}),(0,u.jsxs)(v,{children:[(0,u.jsxs)(j,{children:[(0,u.jsx)(b,{children:"Status"}),(0,u.jsx)(F,{status:ke.status,children:"active"===ke.status?"\u25cf Active":"trial"===ke.status?"\u25cf Trial":ke.status.charAt(0).toUpperCase()+ke.status.slice(1)})]}),(0,u.jsxs)(j,{children:[(0,u.jsx)(b,{children:"Billing Cycle"}),(0,u.jsx)(w,{children:"annual"===ke.billing_cycle?"Annual":"Monthly"})]}),(0,u.jsxs)(j,{children:[(0,u.jsx)(b,{children:"Current Period"}),(0,u.jsxs)(w,{children:[Z(ke.subscription_start)," \u2013 ",Z(ke.subscription_end)]})]}),(0,u.jsxs)(j,{children:[(0,u.jsx)(b,{children:"Next Billing"}),(0,u.jsx)(w,{children:Z(ke.next_billing_date)})]})]}),Be&&(0,u.jsxs)(A,{children:[(0,u.jsx)(C,{children:"\u23f3 Scheduled Change"}),(0,u.jsxs)(_,{children:[(0,u.jsx)("strong",{children:"New Plan:"})," ",Be.plan_type," (",(0,x.vv)(Be.plan_amount,ke.currency),"/","annual"===Be.billing_cycle?"year":"month",")",(0,u.jsx)("br",{}),(0,u.jsx)("strong",{children:"Effective:"})," ",Z(Be.effective_date)," (next billing date)",(0,u.jsx)("br",{}),(0,u.jsx)("br",{}),"Your current features remain available until the change takes effect."]}),(0,u.jsx)(S,{onClick:()=>pe(!0),children:"Cancel Change"})]}),!ke.can_change&&ke.change_blocked_reason&&(0,u.jsxs)(k,{variant:"overdue"===ke.status||"suspended"===ke.status?"warning":"info",children:[ke.change_blocked_reason,("overdue"===ke.status||"suspended"===ke.status)&&(0,u.jsx)("div",{style:{marginTop:"8px"},children:(0,u.jsx)(E,{onClick:()=>window.location.href=ne(),children:"Go to Invoices \u2192"})})]})]}),(0,u.jsxs)(s.aF,{isOpen:re,onClose:()=>ie(!1),title:"Change Your Plan",size:"large",footer:(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>ie(!1),children:"Close"}),children:[(0,u.jsxs)(U,{children:[(0,u.jsx)("span",{style:{fontSize:"14px",color:"#6B7280"},children:"Billing:"}),(0,u.jsx)(L,{active:"monthly"===oe,disabled:!1,onClick:()=>se("monthly"),children:"Monthly"}),(0,u.jsx)(L,{active:"annual"===oe,disabled:"annual"===ke.billing_cycle,onClick:()=>{"annual"!==ke.billing_cycle&&se("annual")},children:"Annual"}),"annual"===ke.billing_cycle&&(0,u.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:"Monthly not available for annual plans"})]}),(0,u.jsx)(z,{children:Se.map(e=>{const n=Ee(e,oe),r=ze(e,oe),i=e.is_current&&oe===ke.billing_cycle;return(0,u.jsxs)(D,{isCurrent:i,onClick:()=>!i&&(e=>{if(e.is_current&&oe===(null===c||void 0===c?void 0:c.current.billing_cycle))return;if(ae(e),be(null),Fe([]),"annual"===(null===c||void 0===c?void 0:c.current.billing_cycle)&&"monthly"===oe)return ue(!0),void ie(!1);de(!0),ie(!1)})(e),children:[i&&(0,u.jsx)(P,{children:"Current"}),(0,u.jsx)($,{children:e.display_name}),(0,u.jsxs)(I,{children:[(0,x.vv)(n,ke.currency)," ",(0,u.jsxs)("span",{children:["/ ","annual"===oe?"year":"month"]})]}),(0,u.jsxs)("div",{style:{marginTop:"12px"},children:[(0,u.jsxs)(M,{children:[K(e.limits.orders)," orders/month"]}),(0,u.jsxs)(M,{children:[K(e.limits.menu_items)," menu items"]}),(0,u.jsxs)(M,{children:[K(e.limits.staff)," staff"]})]}),(0,u.jsx)(T,{}),!i&&r&&(0,u.jsxs)(N,{type:r,children:["upgrade"===r&&(0,u.jsxs)(u.Fragment,{children:["\u2191 Upgrade ",e.proration_estimate&&"trial"!==ke.status?(0,u.jsxs)(R,{children:[(0,x.vv)(e.proration_estimate.net_amount,ke.currency)," due now"]}):null]}),"downgrade"===r&&(0,u.jsx)(u.Fragment,{children:"\u2193 Downgrade \u2014 from next billing"}),"cycle_change"===r&&(0,u.jsx)(u.Fragment,{children:"Billing cycle change \u2014 from next billing"})]})]},e.id)})})]}),te&&le&&"upgrade"===ze(te,oe)&&(0,u.jsxs)(s.aF,{isOpen:le,onClose:()=>de(!1),title:(ke.status,`Upgrade to ${te.display_name}`),footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>{de(!1),ie(!0)},children:"Back"}),(0,u.jsx)(s.yl,{variant:"primary",onClick:_e,disabled:fe,children:fe?"Processing...":"Confirm Upgrade"})]}),children:["trial"===ke.status?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("p",{style:{color:"#6B7280",fontSize:"14px"},children:["You're currently on a free trial (",ke.plan_type,")."]}),(0,u.jsxs)(O,{children:[(0,u.jsxs)(Y,{children:["\u2713 ",te.display_name," features available immediately"]}),(0,u.jsx)(Y,{children:"\u2713 No charge during your trial period"}),(0,u.jsxs)(Y,{children:["\u2713 First invoice (",(0,x.vv)(Ee(te,oe),ke.currency),"/","annual"===oe?"year":"month",") after trial ends on ",Z(ke.subscription_end)]})]})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(O,{children:[(0,u.jsxs)(G,{children:[(0,u.jsx)("span",{children:"Current"}),(0,u.jsxs)("span",{children:[ke.plan_type," \u2014 ",(0,x.vv)(ke.plan_amount,ke.currency),"/","annual"===ke.billing_cycle?"yr":"mo"]})]}),(0,u.jsxs)(G,{children:[(0,u.jsx)("span",{children:"New"}),(0,u.jsxs)("span",{children:[te.display_name," \u2014 ",(0,x.vv)(Ee(te,oe),ke.currency),"/","annual"===oe?"yr":"mo"]})]}),te.proration_estimate&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(W,{}),(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"4px"},children:["Prorated charge for remaining period (",te.proration_estimate.remaining_days," days)"]}),(0,u.jsxs)(G,{children:[(0,u.jsx)("span",{children:"New plan cost"}),(0,u.jsx)("span",{children:(0,x.vv)(te.proration_estimate.charge,ke.currency)})]}),(0,u.jsxs)(G,{children:[(0,u.jsx)("span",{children:"Current plan credit"}),(0,u.jsxs)("span",{children:["-",(0,x.vv)(te.proration_estimate.credit,ke.currency)]})]}),(0,u.jsx)(W,{}),(0,u.jsxs)(G,{bold:!0,children:[(0,u.jsx)("span",{children:"Prorated amount"}),(0,u.jsx)("span",{children:(0,x.vv)(te.proration_estimate.net_amount,ke.currency)})]})]})]}),(0,u.jsx)(Y,{children:"\u2713 New features available immediately"}),(0,u.jsxs)(Y,{children:["\u2713 Invoice due by ",Z(ke.next_billing_date)," (next billing date)"]}),(0,u.jsxs)(Y,{children:["\u2713 Next regular billing: ",Z(ke.next_billing_date)," at ",(0,x.vv)(Ee(te,oe),ke.currency),"/","annual"===oe?"yr":"mo"]})]}),je&&(0,u.jsx)("div",{style:{marginTop:"12px",padding:"10px 14px",background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"13px"},children:je})]}),te&&le&&("downgrade"===ze(te,oe)||"cycle_change"===ze(te,oe))&&(0,u.jsxs)(s.aF,{isOpen:le,onClose:()=>de(!1),title:"cycle_change"===ze(te,oe)?`Change to ${"annual"===oe?"Annual":"Monthly"} Billing`:`Downgrade to ${te.display_name}`,footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>{de(!1),ie(!0)},children:"Back"}),(0,u.jsx)(s.yl,{variant:"primary",onClick:_e,disabled:fe,children:fe?"Processing...":"cycle_change"===ze(te,oe)?"Confirm Change":"Confirm Downgrade"})]}),children:[(0,u.jsxs)(O,{children:[(0,u.jsxs)(G,{children:[(0,u.jsx)("span",{children:"Current"}),(0,u.jsxs)("span",{children:[ke.plan_type," \u2014 ",(0,x.vv)(ke.plan_amount,ke.currency),"/","annual"===ke.billing_cycle?"yr":"mo"]})]}),(0,u.jsxs)(G,{children:[(0,u.jsx)("span",{children:"New"}),(0,u.jsxs)("span",{children:[te.display_name," \u2014 ",(0,x.vv)(Ee(te,oe),ke.currency),"/","annual"===oe?"yr":"mo"]})]})]}),(0,u.jsxs)(q,{children:["\u26a0 Effective from ",Z(ke.next_billing_date)," (next billing date)"]}),"downgrade"===ze(te,oe)&&(0,u.jsxs)("div",{style:{marginTop:"12px"},children:[(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:["\u2022 Current features available until ",Z(ke.next_billing_date)]}),(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:["\u2022 After ",Z(ke.next_billing_date),":"]}),(0,u.jsxs)("div",{style:{paddingLeft:"16px"},children:[(0,u.jsxs)(H,{children:[(0,u.jsx)("span",{children:"Orders"}),(0,u.jsxs)("span",{children:[K(null!==(e=null===c||void 0===c||null===(n=c.available_plans.find(e=>e.is_current))||void 0===n?void 0:n.limits.orders)&&void 0!==e?e:-1)," \u2192 ",K(te.limits.orders),"/month"]})]}),(0,u.jsxs)(H,{children:[(0,u.jsx)("span",{children:"Menu items"}),(0,u.jsxs)("span",{children:[K(null!==(r=null===c||void 0===c||null===(t=c.available_plans.find(e=>e.is_current))||void 0===t?void 0:t.limits.menu_items)&&void 0!==r?r:-1)," \u2192 ",K(te.limits.menu_items)]})]}),(0,u.jsxs)(H,{children:[(0,u.jsx)("span",{children:"Staff"}),(0,u.jsxs)("span",{children:[K(null!==(a=null===c||void 0===c||null===(l=c.available_plans.find(e=>e.is_current))||void 0===l?void 0:l.limits.staff)&&void 0!==a?a:-1)," \u2192 ",K(te.limits.staff)]})]})]}),(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:["\u2022 You can cancel this change anytime before ",Z(ke.next_billing_date)]})]}),je&&(0,u.jsxs)("div",{style:{marginTop:"12px",padding:"10px 14px",background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"13px"},children:[je,we.length>0&&(0,u.jsx)("ul",{style:{margin:"8px 0 0 0",paddingLeft:"18px"},children:we.map((e,n)=>(0,u.jsx)("li",{children:e},n))})]})]}),(0,u.jsx)(s.aF,{isOpen:ce,onClose:()=>pe(!1),title:"Cancel Scheduled Change?",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>pe(!1),children:"Keep Scheduled Change"}),(0,u.jsx)(s.yl,{variant:"primary",onClick:async()=>{try{ve(!0);const e=await fetch("/api/subscriptions/change-plan",{method:"DELETE",headers:{Authorization:`Bearer ${Ae}`}});(await e.json()).success&&(pe(!1),Ce())}catch{}finally{ve(!1)}},disabled:fe,children:fe?"Cancelling...":"Cancel Change"})]}),children:(0,u.jsxs)("p",{style:{fontSize:"14px",color:"#374151"},children:["Your current plan (",ke.plan_type,", ",(0,x.vv)(ke.plan_amount,ke.currency),"/","annual"===ke.billing_cycle?"year":"month",") will continue without changes."]})}),(0,u.jsxs)(s.aF,{isOpen:xe,onClose:()=>ue(!1),title:"Annual to Monthly",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>{ue(!1),window.location.href=(()=>{const e=null===d||void 0===d?void 0:d.role,n=(null===d||void 0===d?void 0:d.restaurantId)||(null===d||void 0===d?void 0:d.restaurant_id);return"Restaurant Admin"===e&&n?`/restaurant/${n}/support`:"Brand General"===e?"/pos/brand/general/system-inquiry":"Foodcourt General"===e?"/pos/foodcourt/general/system-inquiry":"Restaurant Owner"===e?"/pos/owner/system-inquiry":"/pos/profile"})()},children:"Contact Support"}),(0,u.jsx)(s.yl,{onClick:()=>ue(!1),children:"Close"})]}),children:[(0,u.jsx)("p",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.6"},children:"Annual plans cannot be switched to monthly billing directly."}),(0,u.jsx)("p",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.6",marginTop:"12px"},children:"To change to monthly billing:"}),(0,u.jsxs)("ol",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.8",paddingLeft:"20px"},children:[(0,u.jsx)("li",{children:"Contact support to request a full refund for the remaining annual period"}),(0,u.jsx)("li",{children:"Once refunded, subscribe to a monthly plan"})]})]}),(0,u.jsx)(s.aF,{isOpen:he,onClose:()=>ge(!1),title:"upgrade"===(null===me||void 0===me?void 0:me.change_type)?"Plan Upgraded":"Change Scheduled",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>ge(!1),children:"Close"}),(null===me||void 0===me?void 0:me.proration_invoice)&&(0,u.jsx)(s.yl,{variant:"primary",onClick:()=>{ge(!1),window.location.href=ne()},children:"Go to Invoices"})]}),children:"upgrade"===(null===me||void 0===me?void 0:me.change_type)?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(Y,{children:["\u2713 Plan upgraded to ",me.new_plan]}),(0,u.jsx)(Y,{children:"\u2713 New features are now available"}),me.proration_invoice&&(0,u.jsxs)("div",{style:{marginTop:"12px",padding:"12px 16px",background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:"8px",fontSize:"13px",color:"#1E40AF"},children:["A prorated invoice of ",(0,x.vv)(me.proration_invoice.amount,c.current.currency)," has been created (due by ",Z(me.proration_invoice.due_date),")."]})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(Y,{children:["\u2713 ",null===me||void 0===me?void 0:me.message]}),(0,u.jsx)("div",{style:{marginTop:"8px",fontSize:"13px",color:"#6B7280"},children:"Your current features remain available until the change takes effect."})]})})]})},Q=t.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,X=t.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,ee=(t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`,t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }
`),ne=t.Ay.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 24px;
  color: white;
  flex-shrink: 0;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,re=t.Ay.div`
  flex: 1;
`,ie=t.Ay.div`
  font-size: 28px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`,te=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`,ae=t.Ay.span`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  background: ${e=>{switch(e.role){case"System Admin":case"Brand General":case"Brand Manager":return"#FEE2E2";case"Foodcourt General":return"#FED7AA";case"Foodcourt Manager":case"Staff":return"#FEF3C7";case"Restaurant Admin":return"#ECFDF5";default:return"#F3F4F6"}}};
  color: ${e=>{switch(e.role){case"System Admin":case"Brand General":return"#DC2626";case"Foodcourt General":return"#EA580C";case"Foodcourt Manager":return"#F59E0B";case"Brand Manager":return"#EF4444";case"Restaurant Admin":return"#059669";case"Staff":return"#D97706";default:return"#6B7280"}}};
`,oe=t.Ay.div`
  font-size: 14px;
  color: #6B7280;
`,se=t.Ay.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 32px;
`,le=t.Ay.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,de=t.Ay.div`
  margin-bottom: 20px;
`,ce=t.Ay.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
`,pe=t.Ay.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:disabled {
    background: #F9FAFB;
    color: #6B7280;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`,xe=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,ue=t.Ay.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: ${e=>"primary"===e.variant?"none":"1px solid #E5E7EB"};
  background: ${e=>"primary"===e.variant?"#635BFF":"white"};
  color: ${e=>"primary"===e.variant?"white":"#6B7280"};
  
  &:hover {
    background: ${e=>"primary"===e.variant?"#5A51E6":"#F9FAFB"};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`,he=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,ge=t.Ay.div`
  padding: 16px 12px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  border-radius: 8px;
  text-align: center;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.05)":"white"};
  transition: all 0.2s;
`,me=t.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
`,ye=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,fe=t.Ay.div`
  min-height: 40px;
  margin-top: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${e=>e.show?1:0};
  visibility: ${e=>e.show?"visible":"hidden"};
  transition: opacity 0.3s, visibility 0.3s;
  background: linear-gradient(135deg, #E0F2FE 0%, #DBEAFE 100%);
  color: #0369A1;
  border: 1px solid #BAE6FD;

  &::before {
    content: '✓';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #0369A1;
    color: white;
    font-size: 12px;
    flex-shrink: 0;
  }
`,ve=()=>{const{currentStaff:e,updateStaff:n,isLoggedIn:r}=(0,a.g)(),{user:t,isAuthenticated:x,updateUser:h,isLoading:g}=(0,o.As)(),[m,y]=(0,d.M)("profile"),[f,v]=(0,i.useState)({name:"",email:"",phone:"",department:"",company_name:""}),[j,b]=(0,i.useState)({currentPassword:"",newPassword:"",confirmPassword:""}),[w,F]=(0,i.useState)(""),[A,C]=(0,i.useState)(!1),[_,k]=(0,i.useState)(!1),[B,S]=(0,i.useState)(!1),[E,z]=(0,i.useState)(!1),D=(e,n)=>{v(r=>({...r,[e]:n})),P||($(!0),W(!1)),T("saving"),I.current&&clearTimeout(I.current),I.current=setTimeout(()=>{N.current&&N.current()},2e3)},[P,$]=(0,i.useState)(!1),I=(0,i.useRef)(null),[M,T]=(0,i.useState)("idle"),N=(0,i.useRef)(null),[R,U]=(0,i.useState)(!1),[L,O]=(0,i.useState)(null),[G,W]=(0,i.useState)(!1),[Y,q]=(0,i.useState)(!1),[H,J]=(0,i.useState)(null),[Z,K]=(0,i.useState)(!0);(0,i.useEffect)(()=>{(async()=>{if(console.log("\ud83d\udd04 Starting user data fetch..."),console.log("\ud83d\udd04 authUser:",t),console.log("\ud83d\udd04 authUser.id:",null===t||void 0===t?void 0:t.id),null!==t&&void 0!==t&&t.id)try{console.log("\ud83d\udd04 Fetching user from API, ID:",t.id);const e=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${t.id}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)throw new Error("Failed to fetch user");const r=await n.json(),i=r.data||r;console.log(" Fetched user:",i),J(i)}catch(e){console.error("\u274c Failed to load user from database:",e)}else console.log(" No authUser ID available");K(!1)})()},[null===t||void 0===t?void 0:t.id]);const ve=(0,i.useMemo)(()=>{const e=H||t;return e?{id:e.id,name:(null===H||void 0===H?void 0:H.full_name)||(null===H||void 0===H?void 0:H.name)||(null===t||void 0===t?void 0:t.name)||(null===t||void 0===t?void 0:t.full_name)||"Unknown",email:e.email,phone:e.phone||"",username:(null===H||void 0===H?void 0:H.username)||e.email,role:e.role,department:(null===H||void 0===H?void 0:H.department)||(null===H||void 0===H?void 0:H.position)||("System Admin"===e.role?"System Administration":"Administration"),company_name:(null===H||void 0===H?void 0:H.company_name)||("System Admin"===e.role?"Purple Here Technologies Sdn Bhd":""),joinDate:(null===H||void 0===H?void 0:H.createdAt)||(new Date).toISOString(),lastLogin:(new Date).toISOString(),schedule:{monday:{active:!0,start:"09:00",end:"17:00"},tuesday:{active:!0,start:"09:00",end:"17:00"},wednesday:{active:!0,start:"09:00",end:"17:00"},thursday:{active:!0,start:"09:00",end:"17:00"},friday:{active:!0,start:"09:00",end:"17:00"},saturday:{active:!1,start:"09:00",end:"17:00"},sunday:{active:!1,start:"09:00",end:"17:00"}}}:null},[H,t]);(0,i.useEffect)(()=>{H&&(console.log("\ud83d\udc64 Profile Page - DB User Data:",{full_name:H.full_name,username:H.username,email:H.email,role:H.role,department:H.department,position:H.position,createdAt:H.createdAt,updatedAt:H.updatedAt}),console.log("\ud83d\udc64 Profile Page - Current User:",ve))},[H]);const[je,be]=(0,i.useState)(!1);(0,i.useEffect)(()=>{if(H&&!je){console.log("\ud83d\udd25 Initializing formData from dbUser:",H);const e={name:H.full_name||H.name||"",email:H.email||"",phone:H.phone||"",department:H.department||H.position||"",company_name:H.company_name||""};console.log("\ud83d\udd25 New formData from DB:",e),v(e),$(!1),be(!0)}else if(ve&&""===f.name&&!H){console.log("\ud83d\udd25 Initializing formData from authUser (fallback):",ve);const e={name:ve.name||"",email:ve.email||"",phone:ve.phone||"",department:ve.department||"",company_name:ve.company_name||""};v(e),$(!1)}},[H,ve,je]),(0,i.useEffect)(()=>{if(ve){const e=f.name!==ve.name||f.email!==ve.email||f.phone!==ve.phone||f.department!==(ve.department||"")||f.company_name!==(ve.company_name||"");$(e),e&&G&&W(!1)}},[f,ve,G]);const we=e=>{y(e)},Fe=async e=>{if(e.preventDefault(),console.log("\ud83d\udd25 handleSubmit called"),console.log("\ud83d\udd25 currentUser:",ve),console.log("\ud83d\udd25 hasChanges:",P),console.log("\ud83d\udd25 formData:",f),console.log("\ud83d\udd25 dbUser:",H),console.log("\ud83d\udd25 authUser:",t),ve&&P&&!Y)try{if(q(!0),W(!1),H&&null!==t&&void 0!==t&&t.id){const e=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:f.name,email:f.email,phone:f.phone,department:f.department,company_name:f.company_name})});if(!n.ok){const e=await n.json().catch(()=>null);throw new Error((null===e||void 0===e?void 0:e.message)||(null===e||void 0===e?void 0:e.error)||"Failed to update profile")}const r=await fetch(`/api/users/${t.id}`,{headers:{Authorization:`Bearer ${e}`}});if(r.ok){const e=await r.json(),n=e.data||e;J(n),v({name:n.full_name||"",email:n.email||"",phone:n.phone||"",department:n.department||"",company_name:n.company_name||""}),be(!0)}h({name:f.name,email:f.email}),$(!1),W(!0),setTimeout(()=>W(!1),3e3)}}catch(n){console.error("Failed to update profile:",n),W(!1),v(e=>({...e})),window.alert(n.message||"Failed to save profile")}finally{q(!1)}};N.current=async()=>{try{const e={preventDefault:()=>{}};await Fe(e),T("saved")}catch(e){T("idle")}},(0,i.useEffect)(()=>{const e=e=>{if(P)return e.preventDefault(),e.returnValue="",""};return window.addEventListener("beforeunload",e),()=>window.removeEventListener("beforeunload",e)},[P]);const Ae=(e,n,r)=>{O(i=>({...i,[e]:{...i[e],[n]:r}}))};return g||Z?(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(Q,{children:[(0,u.jsx)(p.Ay,{title:"My Profile"}),(0,u.jsx)(X,{children:(0,u.jsx)(se,{children:(0,u.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:(0,u.jsx)("div",{children:"Loading profile..."})})})})]})}):x&&ve?(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(Q,{children:[(0,u.jsx)(p.Ay,{title:"My Profile"}),(0,u.jsxs)(X,{children:[(0,u.jsxs)(ee,{children:[(0,u.jsx)(ne,{role:ve.role,children:(e=>{if(!e)return"?";const n=e.trim().split(" ").filter(e=>e.length>0);return 0===n.length?"?":1===n.length?n[0].substring(0,2).toUpperCase():n.slice(0,2).map(e=>e[0]).join("").toUpperCase()})(ve.name)}),(0,u.jsxs)(re,{children:[(0,u.jsxs)(ie,{children:[ve.name," ",H&&(0,u.jsx)("span",{style:{fontSize:"12px",color:"#10B981",fontWeight:"normal"},children:"\u2713 DB"})]}),(0,u.jsxs)(te,{children:[(0,u.jsx)(ae,{role:ve.role,children:ve.role}),(0,u.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",textTransform:"capitalize"},children:ve.department})]}),(0,u.jsxs)(oe,{children:["Member since ",(Ce=ve.joinDate,new Date(Ce).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))," \u2022 Last login ",(e=>{if(!e)return"Never";const n=new Date(e),r=(new Date).getTime()-n.getTime(),i=Math.floor(r/36e5);if(i<1)return"Just now";if(i<24)return`${i}h ago`;return`${Math.floor(i/24)}d ago`})(ve.lastLogin),H&&(0,u.jsxs)("span",{style:{fontSize:"11px",color:"#10B981",marginLeft:"8px"},children:["\u2022 Database ID: ",H.id]})]})]})]}),(0,u.jsxs)(l.tU,{children:[(0,u.jsx)(l.oz,{active:"profile"===m,onClick:()=>we("profile"),children:"Personal Information"}),["Restaurant Admin","Brand General","Foodcourt General","Restaurant Owner"].includes(ve.role)&&!(null!==H&&void 0!==H&&H.is_demo)&&(0,u.jsx)(l.oz,{active:"subscription"===m,onClick:()=>we("subscription"),children:"Subscription"}),(0,u.jsx)(l.oz,{active:"schedule"===m,onClick:()=>we("schedule"),children:"Work Schedule"}),(0,u.jsx)(l.oz,{active:"security"===m,onClick:()=>we("security"),children:"Change Password"})]}),"profile"===m&&(0,u.jsx)(se,{children:(0,u.jsxs)("div",{children:[(0,u.jsxs)(le,{children:[(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Full Name"}),(0,u.jsx)(pe,{type:"text",value:f.name||"",onChange:e=>{console.log("\ud83d\udd25 Name input onChange:",e.target.value),D("name",e.target.value)},placeholder:"Enter full name"})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Role"}),(0,u.jsx)(pe,{type:"text",value:ve.role,disabled:!0})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Email Address"}),(0,u.jsx)(pe,{type:"email",value:f.email||"",onChange:e=>D("email",e.target.value),placeholder:"Enter email address"})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Username"}),(0,u.jsx)(pe,{type:"text",value:ve.username,disabled:!0})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Phone Number"}),(0,u.jsx)(c.A,{value:f.phone||"",onChange:e=>D("phone",e)})]}),"System Admin"===ve.role&&(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Company Name"}),(0,u.jsx)(pe,{type:"text",value:f.company_name||"",onChange:e=>D("company_name",e.target.value),placeholder:"Enter company name"})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Department"}),(0,u.jsx)(pe,{type:"text",value:f.department||"",onChange:e=>D("department",e.target.value),placeholder:"Enter department"})]})]}),(0,u.jsxs)(xe,{children:[(0,u.jsx)(ue,{type:"button",onClick:()=>{ve&&(v({name:ve.name,email:ve.email,phone:ve.phone,department:ve.department||"",company_name:ve.company_name||""}),$(!1),W(!1),T("idle"),I.current&&clearTimeout(I.current))},disabled:!P||Y,children:"Reset"}),(0,u.jsx)(ue,{type:"button",variant:"primary",disabled:"saving"===M||"saved"===M||!P||Y,onClick:Fe,children:Y||"saving"===M?"Saving...":"saved"===M?"\u2713 Saved":"Save Changes"})]}),(0,u.jsx)(fe,{show:G,children:"Profile updated successfully."})]})}),"subscription"===m&&(0,u.jsx)(V,{}),"schedule"===m&&(0,u.jsxs)(se,{children:[(0,u.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",marginBottom:"20px"},children:("System Admin"===(null===ve||void 0===ve?void 0:ve.role)||"manager"===(null===ve||void 0===ve?void 0:ve.role))&&(0,u.jsx)(ue,{variant:"primary",style:{flex:"none",padding:"10px 16px",fontSize:"14px",minWidth:"120px"},onClick:()=>{ve&&(O({...ve.schedule}),U(!0))},children:"Edit Schedule"})}),"System Admin"!==(null===ve||void 0===ve?void 0:ve.role)&&"manager"!==(null===ve||void 0===ve?void 0:ve.role)&&(0,u.jsx)("div",{style:{background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"8px",padding:"12px 16px",marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"\u2139\ufe0f Work schedules are managed by administrators and managers. Contact your manager to make changes."}),(0,u.jsx)(he,{children:Object.entries(ve.schedule).map(e=>{let[n,r]=e;return(0,u.jsxs)(ge,{active:r.active,children:[(0,u.jsx)(me,{children:n}),(0,u.jsx)(ye,{children:r.active?`${r.start} - ${r.end}`:"Off"})]},n)})})]}),"security"===m&&(0,u.jsx)(se,{children:(0,u.jsxs)("div",{children:[(0,u.jsxs)("div",{style:{padding:"12px 16px",backgroundColor:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"6px",color:"#0C4A6E",fontSize:"13px",marginBottom:"20px",lineHeight:"1.5"},children:[(0,u.jsx)("strong",{children:"Password Requirements:"}),(0,u.jsxs)("ul",{style:{margin:"6px 0 0 0",paddingLeft:"18px"},children:[(0,u.jsx)("li",{children:"At least 8 characters"}),(0,u.jsx)("li",{children:"At least one lowercase letter (a-z)"}),(0,u.jsx)("li",{children:"At least one uppercase letter (A-Z)"}),(0,u.jsx)("li",{children:"At least one number (0-9)"})]})]}),(0,u.jsxs)(le,{children:[(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Current Password"}),(0,u.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[(0,u.jsx)(pe,{type:_?"text":"password",value:j.currentPassword,onChange:e=>b({...j,currentPassword:e.target.value}),placeholder:"Enter current password",style:{paddingRight:"42px"}}),(0,u.jsx)("button",{type:"button",onClick:()=>k(!_),tabIndex:-1,style:{position:"absolute",right:"14px",background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",alignItems:"center",color:"#9CA3AF"},children:(0,u.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{width:"20px",height:"20px"},children:_?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),(0,u.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,u.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})})]})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"New Password"}),(0,u.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[(0,u.jsx)(pe,{type:B?"text":"password",value:j.newPassword,onChange:e=>b({...j,newPassword:e.target.value}),placeholder:"Min 8 chars, uppercase + lowercase + number",style:{paddingRight:"42px"}}),(0,u.jsx)("button",{type:"button",onClick:()=>S(!B),tabIndex:-1,style:{position:"absolute",right:"14px",background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",alignItems:"center",color:"#9CA3AF"},children:(0,u.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{width:"20px",height:"20px"},children:B?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),(0,u.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,u.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})})]})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Confirm New Password"}),(0,u.jsxs)("div",{style:{position:"relative",display:"flex",alignItems:"center"},children:[(0,u.jsx)(pe,{type:E?"text":"password",value:j.confirmPassword,onChange:e=>b({...j,confirmPassword:e.target.value}),placeholder:"Confirm new password",style:{paddingRight:"42px"}}),(0,u.jsx)("button",{type:"button",onClick:()=>z(!E),tabIndex:-1,style:{position:"absolute",right:"14px",background:"none",border:"none",cursor:"pointer",padding:"4px",display:"flex",alignItems:"center",color:"#9CA3AF"},children:(0,u.jsx)("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",style:{width:"20px",height:"20px"},children:E?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("path",{d:"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"}),(0,u.jsx)("line",{x1:"1",y1:"1",x2:"23",y2:"23"})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,u.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})})]})]})]}),w&&(0,u.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"14px",marginTop:"20px"},children:w}),A&&(0,u.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#ECFDF5",border:"1px solid #10B981",borderRadius:"6px",color:"#047857",fontSize:"14px",marginTop:"20px"},children:"Password changed successfully!"}),(0,u.jsx)(xe,{children:(0,u.jsx)(ue,{variant:"primary",onClick:async()=>{if(F(""),C(!1),j.currentPassword&&j.newPassword&&j.confirmPassword)if(j.newPassword.length<8)F("Password must be at least 8 characters long");else if(/[a-z]/.test(j.newPassword))if(/[A-Z]/.test(j.newPassword))if(/[0-9]/.test(j.newPassword))if(j.newPassword===j.confirmPassword)if(j.currentPassword!==j.newPassword)try{const e=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${null===ve||void 0===ve?void 0:ve.id}/password`,{method:"PATCH",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({currentPassword:j.currentPassword,newPassword:j.newPassword})});if(!n.ok){const e=await n.json();return void F(e.error||"Failed to change password")}C(!0),b({currentPassword:"",newPassword:"",confirmPassword:""}),setTimeout(()=>{C(!1)},5e3)}catch(e){console.error("Error changing password:",e),F("An error occurred while changing password")}else F("New password must be different from current password");else F("New passwords do not match");else F("Password must contain at least one number");else F("Password must contain at least one uppercase letter");else F("Password must contain at least one lowercase letter");else F("All fields are required")},children:"Change Password"})})]})})]}),(0,u.jsx)(s.aF,{isOpen:R,onClose:()=>U(!1),title:"Edit Schedule",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>U(!1),children:"Cancel"}),(0,u.jsx)(s.yl,{onClick:async()=>{ve&&L&&(e&&await n(e.id,{schedule:L}),U(!1),O(null))},children:"Save Schedule"})]}),children:L&&(0,u.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Object.entries(L).map(e=>{let[n,r]=e;return(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100px 1fr",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid #F3F4F6"},children:[(0,u.jsx)("div",{style:{fontWeight:"500",textTransform:"capitalize",fontSize:"14px",color:"#374151"},children:n}),(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[(0,u.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"14px",minWidth:"80px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:r.active,onChange:e=>Ae(n,"active",e.target.checked),style:{cursor:"pointer"}}),(0,u.jsx)("span",{style:{color:r.active?"#059669":"#6B7280"},children:r.active?"Active":"Off"})]}),r.active&&(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"time",value:r.start,onChange:e=>Ae(n,"start",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}}),(0,u.jsx)("span",{style:{color:"#9CA3AF",fontSize:"14px"},children:"-"}),(0,u.jsx)("input",{type:"time",value:r.end,onChange:e=>Ae(n,"end",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}})]})]})]},n)})})})]})}):(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(Q,{children:[(0,u.jsx)(p.Ay,{title:"My Profile"}),(0,u.jsx)(X,{children:(0,u.jsx)(se,{children:(0,u.jsxs)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:[(0,u.jsx)("div",{style:{fontSize:"18px",marginBottom:"8px"},children:"Please log in to view your profile"}),(0,u.jsx)("div",{style:{fontSize:"14px"},children:"You need to be logged in to access this page."})]})})})]})});var Ce}}}]);