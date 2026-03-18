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
`,l=e=>{let{title:n,children:r}=e;return(0,t.jsxs)(a,{children:[(0,t.jsx)(o,{children:n}),r&&(0,t.jsx)(s,{children:r})]})}},9968:(e,n,r)=>{r.r(n),r.d(n,{default:()=>Fe});var i=r(9950),t=r(4752),a=r(5781),o=r(1367),s=r(9610),l=r(2597),d=r(2653),c=r(8666),p=r(8012),x=r(6038),u=r(4414);const h=t.Ay.div`
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
`,f=t.Ay.div`
  font-size: 16px;
  color: #6B7280;
`,y=t.Ay.span`
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
`,B=t.Ay.div`
  background: ${e=>"warning"===e.variant?"#FEF3C7":"#EFF6FF"};
  border: 1px solid ${e=>"warning"===e.variant?"#FDE68A":"#BFDBFE"};
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  font-size: 13px;
  color: ${e=>"warning"===e.variant?"#92400E":"#1E40AF"};
  line-height: 1.5;
`,S=t.Ay.button`
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
`,k=t.Ay.button`
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
`,P=t.Ay.div`
  border: 2px solid ${e=>e.isCurrent?"#635BFF":e.isSelected?"#10B981":"#E6EBF1"};
  border-radius: 12px;
  padding: 20px;
  position: relative;
  cursor: ${e=>e.isCurrent?"default":"pointer"};
  background: ${e=>e.isCurrent?"#F8F7FF":"white"};
  transition: border-color 0.15s;

  &:hover {
    border-color: ${e=>(e.isCurrent,"#635BFF")};
  }
`,D=t.Ay.div`
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
`,U=t.Ay.div`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 4px;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #6B7280;
  }
`,N=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  padding: 3px 0;
`,T=t.Ay.div`
  font-size: 12px;
  font-weight: 500;
  color: ${e=>"upgrade"===e.type?"#059669":"#D97706"};
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
`,I=t.Ay.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
`,R=t.Ay.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`,M=t.Ay.button`
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
`,L=t.Ay.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: ${e=>e.bold?"15px":"14px"};
  font-weight: ${e=>e.bold?"600":"400"};
  color: ${e=>e.highlight?"#059669":"#1F2937"};
`,G=t.Ay.hr`
  border: none;
  border-top: 1px dashed #D1D5DB;
  margin: 8px 0;
`,Y=t.Ay.div`
  font-size: 13px;
  color: #059669;
  padding: 3px 0;
`,W=t.Ay.div`
  font-size: 13px;
  color: #D97706;
  padding: 3px 0;
`,q=t.Ay.div`
  font-size: 13px;
  color: #6B7280;
  padding: 3px 0;
  display: flex;
  justify-content: space-between;
`,H=t.Ay.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #6B7280;
  font-size: 14px;
`;function J(e){return e?new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}):"-"}function Z(e){return-1===e?"Unlimited":String(e)}const V=()=>{var e,n,r,t,a,l;const{user:d}=(0,o.As)(),[c,p]=(0,i.useState)(null),[V,K]=(0,i.useState)(!0),[Q,X]=(0,i.useState)(null),ee=()=>{const e=null===d||void 0===d?void 0:d.role,n=(null===d||void 0===d?void 0:d.restaurantId)||(null===d||void 0===d?void 0:d.restaurant_id);return"Restaurant Admin"===e&&n?`/restaurant/${n}/invoices`:"Brand General"===e?"/pos/brand/invoices":"Foodcourt General"===e?"/pos/foodcourt/invoices":"Restaurant Owner"===e?"/pos/owner/invoices":"/pos/profile"},[ne,re]=(0,i.useState)(!1),[ie,te]=(0,i.useState)(null),[ae,oe]=(0,i.useState)("monthly"),[se,le]=(0,i.useState)(!1),[de,ce]=(0,i.useState)(!1),[pe,xe]=(0,i.useState)(!1),[ue,he]=(0,i.useState)(!1),[ge,me]=(0,i.useState)(null),[fe,ye]=(0,i.useState)(!1),[ve,je]=(0,i.useState)(null),[be,we]=(0,i.useState)([]),Fe=localStorage.getItem("auth_token"),Ae=(0,i.useCallback)(async()=>{try{K(!0);const e=await fetch("/api/subscriptions/my-plan",{headers:{Authorization:`Bearer ${Fe}`}}),n=await e.json();n.success?(p(n),oe(n.current.billing_cycle||"monthly")):X(n.message||"Failed to load subscription data")}catch{X("Failed to load subscription data")}finally{K(!1)}},[Fe]);(0,i.useEffect)(()=>{Ae()},[Ae]);const Ce=async()=>{if(ie&&c){ye(!0),je(null);try{const e=await fetch("/api/subscriptions/change-plan",{method:"POST",headers:{Authorization:`Bearer ${Fe}`,"Content-Type":"application/json"},body:JSON.stringify({new_plan_id:ie.id,new_billing_cycle:ae})}),n=await e.json();n.success?(me(n),le(!1),he(!0),Ae()):(n.exceeded&&we(n.exceeded),je(n.message||"Failed to change plan"))}catch{je("Network error. Please try again.")}finally{ye(!1)}}};if(V)return(0,u.jsx)(H,{children:"Loading subscription data..."});if(Q||!c)return(0,u.jsx)(B,{variant:"warning",children:Q||"Failed to load subscription data."});const{current:_e,pending_change:Be,available_plans:Se}=c,ke=(e,n)=>{const r=e.currency_prices[_e.currency];return r?"annual"===n?r.annual:r.monthly:"annual"===n?e.annual_price:e.monthly_price},Ee=(e,n)=>{var r,i,t;if(e.is_current&&n===_e.billing_cycle)return null;if(e.is_current&&n!==_e.billing_cycle)return"cycle_change";const a=null!==(r=null===(i=Se.find(e=>e.is_current))||void 0===i?void 0:i.sort_order)&&void 0!==r?r:0;return(null!==(t=e.sort_order)&&void 0!==t?t:0)>a?"upgrade":"downgrade"};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(h,{children:[(0,u.jsxs)(g,{children:[(0,u.jsxs)("div",{children:[(0,u.jsx)(m,{children:_e.plan_type}),(0,u.jsxs)(f,{children:[(0,x.vv)(_e.plan_amount,_e.currency)," / ","annual"===_e.billing_cycle?"year":"month",_e.discount_type&&"none"!==_e.discount_type&&_e.discount_value&&(0,u.jsxs)(u.Fragment,{children:[" ",(0,u.jsx)(y,{children:"(discount applied by administrator)"})]})]})]}),_e.can_change&&(0,u.jsx)(S,{onClick:()=>{re(!0),je(null)},children:"Change Plan"})]}),(0,u.jsxs)(v,{children:[(0,u.jsxs)(j,{children:[(0,u.jsx)(b,{children:"Status"}),(0,u.jsx)(F,{status:_e.status,children:"active"===_e.status?"\u25cf Active":"trial"===_e.status?"\u25cf Trial":_e.status.charAt(0).toUpperCase()+_e.status.slice(1)})]}),(0,u.jsxs)(j,{children:[(0,u.jsx)(b,{children:"Billing Cycle"}),(0,u.jsx)(w,{children:"annual"===_e.billing_cycle?"Annual":"Monthly"})]}),(0,u.jsxs)(j,{children:[(0,u.jsx)(b,{children:"Current Period"}),(0,u.jsxs)(w,{children:[J(_e.subscription_start)," \u2013 ",J(_e.subscription_end)]})]}),(0,u.jsxs)(j,{children:[(0,u.jsx)(b,{children:"Next Billing"}),(0,u.jsx)(w,{children:J(_e.next_billing_date)})]})]}),Be&&(0,u.jsxs)(A,{children:[(0,u.jsx)(C,{children:"\u23f3 Scheduled Change"}),(0,u.jsxs)(_,{children:[(0,u.jsx)("strong",{children:"New Plan:"})," ",Be.plan_type," (",(0,x.vv)(Be.plan_amount,_e.currency),"/","annual"===Be.billing_cycle?"year":"month",")",(0,u.jsx)("br",{}),(0,u.jsx)("strong",{children:"Effective:"})," ",J(Be.effective_date)," (next billing date)",(0,u.jsx)("br",{}),(0,u.jsx)("br",{}),"Your current features remain available until the change takes effect."]}),(0,u.jsx)(k,{onClick:()=>ce(!0),children:"Cancel Change"})]}),!_e.can_change&&_e.change_blocked_reason&&(0,u.jsxs)(B,{variant:"overdue"===_e.status||"suspended"===_e.status?"warning":"info",children:[_e.change_blocked_reason,("overdue"===_e.status||"suspended"===_e.status)&&(0,u.jsx)("div",{style:{marginTop:"8px"},children:(0,u.jsx)(E,{onClick:()=>window.location.href=ee(),children:"Go to Invoices \u2192"})})]})]}),(0,u.jsxs)(s.aF,{isOpen:ne,onClose:()=>re(!1),title:"Change Your Plan",size:"large",footer:(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>re(!1),children:"Close"}),children:[(0,u.jsxs)(R,{children:[(0,u.jsx)("span",{style:{fontSize:"14px",color:"#6B7280"},children:"Billing:"}),(0,u.jsx)(M,{active:"monthly"===ae,disabled:!1,onClick:()=>oe("monthly"),children:"Monthly"}),(0,u.jsx)(M,{active:"annual"===ae,disabled:"annual"===_e.billing_cycle,onClick:()=>{"annual"!==_e.billing_cycle&&oe("annual")},children:"Annual"}),"annual"===_e.billing_cycle&&(0,u.jsx)("span",{style:{fontSize:"12px",color:"#9CA3AF"},children:"Monthly not available for annual plans"})]}),(0,u.jsx)(z,{children:Se.map(e=>{const n=ke(e,ae),r=Ee(e,ae),i=e.is_current&&ae===_e.billing_cycle;return(0,u.jsxs)(P,{isCurrent:i,onClick:()=>!i&&(e=>{if(e.is_current&&ae===(null===c||void 0===c?void 0:c.current.billing_cycle))return;if(te(e),je(null),we([]),"annual"===(null===c||void 0===c?void 0:c.current.billing_cycle)&&"monthly"===ae)return xe(!0),void re(!1);le(!0),re(!1)})(e),children:[i&&(0,u.jsx)(D,{children:"Current"}),(0,u.jsx)($,{children:e.display_name}),(0,u.jsxs)(U,{children:[(0,x.vv)(n,_e.currency)," ",(0,u.jsxs)("span",{children:["/ ","annual"===ae?"year":"month"]})]}),(0,u.jsxs)("div",{style:{marginTop:"12px"},children:[(0,u.jsxs)(N,{children:[Z(e.limits.orders)," orders/month"]}),(0,u.jsxs)(N,{children:[Z(e.limits.menu_items)," menu items"]}),(0,u.jsxs)(N,{children:[Z(e.limits.staff)," staff"]})]}),!i&&r&&(0,u.jsxs)(T,{type:r,children:["upgrade"===r&&(0,u.jsxs)(u.Fragment,{children:["\u2191 Upgrade ",e.proration_estimate&&"trial"!==_e.status?(0,u.jsxs)(I,{children:[(0,x.vv)(e.proration_estimate.net_amount,_e.currency)," due now"]}):null]}),"downgrade"===r&&(0,u.jsx)(u.Fragment,{children:"\u2193 Downgrade \u2014 from next billing"}),"cycle_change"===r&&(0,u.jsx)(u.Fragment,{children:"Billing cycle change \u2014 from next billing"})]})]},e.id)})})]}),ie&&se&&"upgrade"===Ee(ie,ae)&&(0,u.jsxs)(s.aF,{isOpen:se,onClose:()=>le(!1),title:(_e.status,`Upgrade to ${ie.display_name}`),footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>{le(!1),re(!0)},children:"Back"}),(0,u.jsx)(s.yl,{variant:"primary",onClick:Ce,disabled:fe,children:fe?"Processing...":"Confirm Upgrade"})]}),children:["trial"===_e.status?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("p",{style:{color:"#6B7280",fontSize:"14px"},children:["You're currently on a free trial (",_e.plan_type,")."]}),(0,u.jsxs)(O,{children:[(0,u.jsxs)(Y,{children:["\u2713 ",ie.display_name," features available immediately"]}),(0,u.jsx)(Y,{children:"\u2713 No charge during your trial period"}),(0,u.jsxs)(Y,{children:["\u2713 First invoice (",(0,x.vv)(ke(ie,ae),_e.currency),"/","annual"===ae?"year":"month",") after trial ends on ",J(_e.subscription_end)]})]})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(O,{children:[(0,u.jsxs)(L,{children:[(0,u.jsx)("span",{children:"Current"}),(0,u.jsxs)("span",{children:[_e.plan_type," \u2014 ",(0,x.vv)(_e.plan_amount,_e.currency),"/","annual"===_e.billing_cycle?"yr":"mo"]})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)("span",{children:"New"}),(0,u.jsxs)("span",{children:[ie.display_name," \u2014 ",(0,x.vv)(ke(ie,ae),_e.currency),"/","annual"===ae?"yr":"mo"]})]}),ie.proration_estimate&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(G,{}),(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"4px"},children:["Prorated charge for remaining period (",ie.proration_estimate.remaining_days," days)"]}),(0,u.jsxs)(L,{children:[(0,u.jsx)("span",{children:"New plan cost"}),(0,u.jsx)("span",{children:(0,x.vv)(ie.proration_estimate.charge,_e.currency)})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)("span",{children:"Current plan credit"}),(0,u.jsxs)("span",{children:["-",(0,x.vv)(ie.proration_estimate.credit,_e.currency)]})]}),(0,u.jsx)(G,{}),(0,u.jsxs)(L,{bold:!0,children:[(0,u.jsx)("span",{children:"Prorated amount"}),(0,u.jsx)("span",{children:(0,x.vv)(ie.proration_estimate.net_amount,_e.currency)})]})]})]}),(0,u.jsx)(Y,{children:"\u2713 New features available immediately"}),(0,u.jsxs)(Y,{children:["\u2713 Invoice due by ",J(_e.next_billing_date)," (next billing date)"]}),(0,u.jsxs)(Y,{children:["\u2713 Next regular billing: ",J(_e.next_billing_date)," at ",(0,x.vv)(ke(ie,ae),_e.currency),"/","annual"===ae?"yr":"mo"]})]}),ve&&(0,u.jsx)("div",{style:{marginTop:"12px",padding:"10px 14px",background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"13px"},children:ve})]}),ie&&se&&("downgrade"===Ee(ie,ae)||"cycle_change"===Ee(ie,ae))&&(0,u.jsxs)(s.aF,{isOpen:se,onClose:()=>le(!1),title:"cycle_change"===Ee(ie,ae)?`Change to ${"annual"===ae?"Annual":"Monthly"} Billing`:`Downgrade to ${ie.display_name}`,footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>{le(!1),re(!0)},children:"Back"}),(0,u.jsx)(s.yl,{variant:"primary",onClick:Ce,disabled:fe,children:fe?"Processing...":"cycle_change"===Ee(ie,ae)?"Confirm Change":"Confirm Downgrade"})]}),children:[(0,u.jsxs)(O,{children:[(0,u.jsxs)(L,{children:[(0,u.jsx)("span",{children:"Current"}),(0,u.jsxs)("span",{children:[_e.plan_type," \u2014 ",(0,x.vv)(_e.plan_amount,_e.currency),"/","annual"===_e.billing_cycle?"yr":"mo"]})]}),(0,u.jsxs)(L,{children:[(0,u.jsx)("span",{children:"New"}),(0,u.jsxs)("span",{children:[ie.display_name," \u2014 ",(0,x.vv)(ke(ie,ae),_e.currency),"/","annual"===ae?"yr":"mo"]})]})]}),(0,u.jsxs)(W,{children:["\u26a0 Effective from ",J(_e.next_billing_date)," (next billing date)"]}),"downgrade"===Ee(ie,ae)&&(0,u.jsxs)("div",{style:{marginTop:"12px"},children:[(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:["\u2022 Current features available until ",J(_e.next_billing_date)]}),(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginBottom:"8px"},children:["\u2022 After ",J(_e.next_billing_date),":"]}),(0,u.jsxs)("div",{style:{paddingLeft:"16px"},children:[(0,u.jsxs)(q,{children:[(0,u.jsx)("span",{children:"Orders"}),(0,u.jsxs)("span",{children:[Z(null!==(e=null===c||void 0===c||null===(n=c.available_plans.find(e=>e.is_current))||void 0===n?void 0:n.limits.orders)&&void 0!==e?e:-1)," \u2192 ",Z(ie.limits.orders),"/month"]})]}),(0,u.jsxs)(q,{children:[(0,u.jsx)("span",{children:"Menu items"}),(0,u.jsxs)("span",{children:[Z(null!==(r=null===c||void 0===c||null===(t=c.available_plans.find(e=>e.is_current))||void 0===t?void 0:t.limits.menu_items)&&void 0!==r?r:-1)," \u2192 ",Z(ie.limits.menu_items)]})]}),(0,u.jsxs)(q,{children:[(0,u.jsx)("span",{children:"Staff"}),(0,u.jsxs)("span",{children:[Z(null!==(a=null===c||void 0===c||null===(l=c.available_plans.find(e=>e.is_current))||void 0===l?void 0:l.limits.staff)&&void 0!==a?a:-1)," \u2192 ",Z(ie.limits.staff)]})]})]}),(0,u.jsxs)("div",{style:{fontSize:"13px",color:"#6B7280",marginTop:"8px"},children:["\u2022 You can cancel this change anytime before ",J(_e.next_billing_date)]})]}),ve&&(0,u.jsxs)("div",{style:{marginTop:"12px",padding:"10px 14px",background:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"13px"},children:[ve,be.length>0&&(0,u.jsx)("ul",{style:{margin:"8px 0 0 0",paddingLeft:"18px"},children:be.map((e,n)=>(0,u.jsx)("li",{children:e},n))})]})]}),(0,u.jsx)(s.aF,{isOpen:de,onClose:()=>ce(!1),title:"Cancel Scheduled Change?",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>ce(!1),children:"Keep Scheduled Change"}),(0,u.jsx)(s.yl,{variant:"primary",onClick:async()=>{try{ye(!0);const e=await fetch("/api/subscriptions/change-plan",{method:"DELETE",headers:{Authorization:`Bearer ${Fe}`}});(await e.json()).success&&(ce(!1),Ae())}catch{}finally{ye(!1)}},disabled:fe,children:fe?"Cancelling...":"Cancel Change"})]}),children:(0,u.jsxs)("p",{style:{fontSize:"14px",color:"#374151"},children:["Your current plan (",_e.plan_type,", ",(0,x.vv)(_e.plan_amount,_e.currency),"/","annual"===_e.billing_cycle?"year":"month",") will continue without changes."]})}),(0,u.jsxs)(s.aF,{isOpen:pe,onClose:()=>xe(!1),title:"Annual to Monthly",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>{xe(!1),window.location.href=(()=>{const e=null===d||void 0===d?void 0:d.role,n=(null===d||void 0===d?void 0:d.restaurantId)||(null===d||void 0===d?void 0:d.restaurant_id);return"Restaurant Admin"===e&&n?`/restaurant/${n}/support`:"Brand General"===e?"/pos/brand/general/system-inquiry":"Foodcourt General"===e?"/pos/foodcourt/general/system-inquiry":"Restaurant Owner"===e?"/pos/owner/system-inquiry":"/pos/profile"})()},children:"Contact Support"}),(0,u.jsx)(s.yl,{onClick:()=>xe(!1),children:"Close"})]}),children:[(0,u.jsx)("p",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.6"},children:"Annual plans cannot be switched to monthly billing directly."}),(0,u.jsx)("p",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.6",marginTop:"12px"},children:"To change to monthly billing:"}),(0,u.jsxs)("ol",{style:{fontSize:"14px",color:"#374151",lineHeight:"1.8",paddingLeft:"20px"},children:[(0,u.jsx)("li",{children:"Contact support to request a full refund for the remaining annual period"}),(0,u.jsx)("li",{children:"Once refunded, subscribe to a monthly plan"})]})]}),(0,u.jsx)(s.aF,{isOpen:ue,onClose:()=>he(!1),title:"upgrade"===(null===ge||void 0===ge?void 0:ge.change_type)?"Plan Upgraded":"Change Scheduled",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>he(!1),children:"Close"}),(null===ge||void 0===ge?void 0:ge.proration_invoice)&&(0,u.jsx)(s.yl,{variant:"primary",onClick:()=>{he(!1),window.location.href=ee()},children:"Go to Invoices"})]}),children:"upgrade"===(null===ge||void 0===ge?void 0:ge.change_type)?(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(Y,{children:["\u2713 Plan upgraded to ",ge.new_plan]}),(0,u.jsx)(Y,{children:"\u2713 New features are now available"}),ge.proration_invoice&&(0,u.jsxs)("div",{style:{marginTop:"12px",padding:"12px 16px",background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:"8px",fontSize:"13px",color:"#1E40AF"},children:["A prorated invoice of ",(0,x.vv)(ge.proration_invoice.amount,c.current.currency)," has been created (due by ",J(ge.proration_invoice.due_date),")."]})]}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)(Y,{children:["\u2713 ",null===ge||void 0===ge?void 0:ge.message]}),(0,u.jsx)("div",{style:{marginTop:"8px",fontSize:"13px",color:"#6B7280"},children:"Your current features remain available until the change takes effect."})]})})]})},K=t.Ay.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`,Q=t.Ay.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`,X=t.Ay.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 20px 0;
`,ee=t.Ay.div`
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
`,ne=t.Ay.div`
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`,ue=t.Ay.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`,he=t.Ay.div`
  font-size: 24px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`,ge=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`,me=t.Ay.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`,fe=t.Ay.button`
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
`,ye=t.Ay.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,ve=t.Ay.div`
  padding: 16px 12px;
  border: 2px solid ${e=>e.active?"#635BFF":"#E5E7EB"};
  border-radius: 8px;
  text-align: center;
  background: ${e=>e.active?"rgba(99, 91, 255, 0.05)":"white"};
  transition: all 0.2s;
`,je=t.Ay.div`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
`,be=t.Ay.div`
  font-size: 12px;
  color: #6B7280;
`,we=t.Ay.div`
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
`,Fe=()=>{const{currentStaff:e,updateStaff:n,isLoggedIn:r}=(0,a.g)(),{user:t,isAuthenticated:x,updateUser:h,isLoading:g}=(0,o.As)(),[m,f]=(0,d.M)("profile"),[y,v]=(0,i.useState)({name:"",email:"",phone:"",department:"",company_name:""}),[j,b]=(0,i.useState)({currentPassword:"",newPassword:"",confirmPassword:""}),[w,F]=(0,i.useState)(""),[A,C]=(0,i.useState)(!1),_=(e,n)=>{v(r=>({...r,[e]:n})),B||(S(!0),$(!1))},[B,S]=(0,i.useState)(!1),[k,E]=(0,i.useState)(!1),[z,P]=(0,i.useState)(null),[D,$]=(0,i.useState)(!1),[U,N]=(0,i.useState)(null),[T,I]=(0,i.useState)(!0);(0,i.useEffect)(()=>{(async()=>{if(console.log("\ud83d\udd04 Starting user data fetch..."),console.log("\ud83d\udd04 authUser:",t),console.log("\ud83d\udd04 authUser.id:",null===t||void 0===t?void 0:t.id),null!==t&&void 0!==t&&t.id)try{console.log("\ud83d\udd04 Fetching user from API, ID:",t.id);const e=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${t.id}`,{headers:{Authorization:`Bearer ${e}`}});if(!n.ok)throw new Error("Failed to fetch user");const r=await n.json(),i=r.data||r;console.log(" Fetched user:",i),N(i)}catch(e){console.error("\u274c Failed to load user from database:",e)}else console.log(" No authUser ID available");I(!1)})()},[null===t||void 0===t?void 0:t.id]);const R=(0,i.useMemo)(()=>{const e=U||t;return e?{id:e.id,name:(null===U||void 0===U?void 0:U.full_name)||(null===U||void 0===U?void 0:U.name)||(null===t||void 0===t?void 0:t.name)||(null===t||void 0===t?void 0:t.full_name)||"Unknown",email:e.email,phone:e.phone||"",username:(null===U||void 0===U?void 0:U.username)||e.email,role:e.role,department:(null===U||void 0===U?void 0:U.department)||(null===U||void 0===U?void 0:U.position)||("System Admin"===e.role?"System Administration":"Administration"),company_name:(null===U||void 0===U?void 0:U.company_name)||("System Admin"===e.role?"Purple Here Technologies Sdn Bhd":""),joinDate:(null===U||void 0===U?void 0:U.createdAt)||(new Date).toISOString(),lastLogin:(new Date).toISOString(),schedule:{monday:{active:!0,start:"09:00",end:"17:00"},tuesday:{active:!0,start:"09:00",end:"17:00"},wednesday:{active:!0,start:"09:00",end:"17:00"},thursday:{active:!0,start:"09:00",end:"17:00"},friday:{active:!0,start:"09:00",end:"17:00"},saturday:{active:!1,start:"09:00",end:"17:00"},sunday:{active:!1,start:"09:00",end:"17:00"}},totalShifts:0,totalSales:0,performance:{efficiency:100,customerRating:5,ordersProcessed:0}}:null},[U,t]);(0,i.useEffect)(()=>{U&&(console.log("\ud83d\udc64 Profile Page - DB User Data:",{full_name:U.full_name,username:U.username,email:U.email,role:U.role,department:U.department,position:U.position,createdAt:U.createdAt,updatedAt:U.updatedAt}),console.log("\ud83d\udc64 Profile Page - Current User:",R))},[U]);const[M,O]=(0,i.useState)(!1);(0,i.useEffect)(()=>{if(U&&!M){console.log("\ud83d\udd25 Initializing formData from dbUser:",U);const e={name:U.full_name||U.name||"",email:U.email||"",phone:U.phone||"",department:U.department||U.position||"",company_name:U.company_name||""};console.log("\ud83d\udd25 New formData from DB:",e),v(e),S(!1),O(!0)}else if(R&&""===y.name&&!U){console.log("\ud83d\udd25 Initializing formData from authUser (fallback):",R);const e={name:R.name||"",email:R.email||"",phone:R.phone||"",department:R.department||"",company_name:R.company_name||""};v(e),S(!1)}},[U,R,M]),(0,i.useEffect)(()=>{if(R){const e=y.name!==R.name||y.email!==R.email||y.phone!==R.phone||y.department!==(R.department||"")||y.company_name!==(R.company_name||"");S(e),e&&D&&$(!1)}},[y,R,D]);const L=e=>{"System Admin"===(null===R||void 0===R?void 0:R.role)&&"performance"===e?f("profile"):f(e)};(0,i.useEffect)(()=>{const e=e=>{if(B)return e.preventDefault(),e.returnValue="",""};return window.addEventListener("beforeunload",e),()=>window.removeEventListener("beforeunload",e)},[B]);const G=(e,n,r)=>{P(i=>({...i,[e]:{...i[e],[n]:r}}))};return g||T?(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(K,{children:[(0,u.jsx)(p.Ay,{title:"My Profile"}),(0,u.jsx)(Q,{children:(0,u.jsx)(se,{children:(0,u.jsx)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:(0,u.jsx)("div",{children:"Loading profile..."})})})})]})}):x&&R?(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(K,{children:[(0,u.jsx)(p.Ay,{title:"My Profile"}),(0,u.jsxs)(Q,{children:[(0,u.jsxs)(ee,{children:[(0,u.jsx)(ne,{role:R.role,children:(e=>{if(!e)return"?";const n=e.trim().split(" ").filter(e=>e.length>0);return 0===n.length?"?":1===n.length?n[0].substring(0,2).toUpperCase():n.slice(0,2).map(e=>e[0]).join("").toUpperCase()})(R.name)}),(0,u.jsxs)(re,{children:[(0,u.jsxs)(ie,{children:[R.name," ",U&&(0,u.jsx)("span",{style:{fontSize:"12px",color:"#10B981",fontWeight:"normal"},children:"\u2713 DB"})]}),(0,u.jsxs)(te,{children:[(0,u.jsx)(ae,{role:R.role,children:R.role}),(0,u.jsx)("span",{style:{fontSize:"14px",color:"#6B7280",textTransform:"capitalize"},children:R.department})]}),(0,u.jsxs)(oe,{children:["Member since ",(Y=R.joinDate,new Date(Y).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}))," \u2022 Last login ",(e=>{if(!e)return"Never";const n=new Date(e),r=(new Date).getTime()-n.getTime(),i=Math.floor(r/36e5);if(i<1)return"Just now";if(i<24)return`${i}h ago`;return`${Math.floor(i/24)}d ago`})(R.lastLogin),U&&(0,u.jsxs)("span",{style:{fontSize:"11px",color:"#10B981",marginLeft:"8px"},children:["\u2022 Database ID: ",U.id]})]})]})]}),(0,u.jsxs)(l.tU,{children:[(0,u.jsx)(l.oz,{active:"profile"===m,onClick:()=>L("profile"),children:"Personal Information"}),["Restaurant Admin","Brand General","Foodcourt General","Restaurant Owner"].includes(R.role)&&!(null!==U&&void 0!==U&&U.is_demo)&&(0,u.jsx)(l.oz,{active:"subscription"===m,onClick:()=>L("subscription"),children:"Subscription"}),(0,u.jsx)(l.oz,{active:"schedule"===m,onClick:()=>L("schedule"),children:"Work Schedule"}),"System Admin"!==R.role&&(0,u.jsx)(l.oz,{active:"performance"===m,onClick:()=>L("performance"),children:"Performance"}),(0,u.jsx)(l.oz,{active:"security"===m,onClick:()=>L("security"),children:"Change Password"})]}),"profile"===m&&(0,u.jsx)(se,{children:(0,u.jsxs)("div",{children:[(0,u.jsxs)(le,{children:[(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Full Name"}),(0,u.jsx)(pe,{type:"text",value:y.name||"",onChange:e=>{console.log("\ud83d\udd25 Name input onChange:",e.target.value),_("name",e.target.value)},placeholder:"Enter full name"})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Role"}),(0,u.jsx)(pe,{type:"text",value:R.role,disabled:!0})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Email Address"}),(0,u.jsx)(pe,{type:"email",value:y.email||"",onChange:e=>_("email",e.target.value),placeholder:"Enter email address"})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Username"}),(0,u.jsx)(pe,{type:"text",value:R.username,disabled:!0})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Phone Number"}),(0,u.jsx)(c.A,{value:y.phone||"",onChange:e=>_("phone",e)})]}),"System Admin"===R.role&&(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Company Name"}),(0,u.jsx)(pe,{type:"text",value:y.company_name||"",onChange:e=>_("company_name",e.target.value),placeholder:"Enter company name"})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Department"}),(0,u.jsx)(pe,{type:"text",value:y.department||"",onChange:e=>_("department",e.target.value),placeholder:"Enter department"})]})]}),(0,u.jsxs)(me,{children:[(0,u.jsx)(fe,{type:"button",onClick:()=>{R&&(v({name:R.name,email:R.email,phone:R.phone,department:R.department||"",company_name:R.company_name||""}),S(!1),$(!1))},disabled:!B,children:"Reset"}),(0,u.jsx)(fe,{type:"button",variant:"primary",disabled:!B,onClick:async e=>{if(e.preventDefault(),console.log("\ud83d\udd25 handleSubmit called"),console.log("\ud83d\udd25 currentUser:",R),console.log("\ud83d\udd25 hasChanges:",B),console.log("\ud83d\udd25 formData:",y),console.log("\ud83d\udd25 dbUser:",U),console.log("\ud83d\udd25 authUser:",t),R&&B)try{if(console.log("\ud83d\udd25 Saving profile data..."),U&&null!==t&&void 0!==t&&t.id){console.log("\ud83d\udd25 Updating database user with ID:",t.id);const e=localStorage.getItem("auth_token"),n=await fetch(`/api/users/${t.id}`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},body:JSON.stringify({full_name:y.name,email:y.email,phone:y.phone,department:y.department,company_name:y.company_name})});if(!n.ok)throw console.error("\u274c Database update failed:",n.status),new Error("Failed to update user in database");const r=await n.json();console.log("\u2705 Database update result:",r);const i=await fetch(`/api/users/${t.id}`,{headers:{Authorization:`Bearer ${e}`}});if(i.ok){const e=await i.json(),n=e.data||e;console.log("\ud83d\udd25 Reloaded user data:",n),N(n)}h({name:y.name,email:y.email}),S(!1),$(!0),console.log("\u2705 Profile save completed")}else console.error("\u274c No database user or authUser ID available"),alert("Failed to save profile. Please check database connection.")}catch(n){console.error("\u274c Failed to update profile:",n),alert("Failed to save profile: "+n.message)}else console.log("\u274c Early return: no currentUser or no changes")},children:"Save Changes"})]}),(0,u.jsx)(we,{show:D&&!B,children:"Your profile has been successfully updated."})]})}),"subscription"===m&&(0,u.jsx)(V,{}),"schedule"===m&&(0,u.jsxs)(se,{children:[(0,u.jsx)("div",{style:{display:"flex",justifyContent:"flex-end",alignItems:"center",marginBottom:"20px"},children:("System Admin"===(null===R||void 0===R?void 0:R.role)||"manager"===(null===R||void 0===R?void 0:R.role))&&(0,u.jsx)(fe,{variant:"primary",style:{flex:"none",padding:"10px 16px",fontSize:"14px",minWidth:"120px"},onClick:()=>{R&&(P({...R.schedule}),E(!0))},children:"Edit Schedule"})}),"System Admin"!==(null===R||void 0===R?void 0:R.role)&&"manager"!==(null===R||void 0===R?void 0:R.role)&&(0,u.jsx)("div",{style:{background:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"8px",padding:"12px 16px",marginBottom:"20px",fontSize:"14px",color:"#6B7280"},children:"\u2139\ufe0f Work schedules are managed by administrators and managers. Contact your manager to make changes."}),(0,u.jsx)(ye,{children:Object.entries(R.schedule).map(e=>{let[n,r]=e;return(0,u.jsxs)(ve,{active:r.active,children:[(0,u.jsx)(je,{children:n}),(0,u.jsx)(be,{children:r.active?`${r.start} - ${r.end}`:"Off"})]},n)})})]}),"performance"===m&&(0,u.jsxs)(se,{children:[(0,u.jsx)(X,{children:"Performance Statistics"}),(0,u.jsxs)(xe,{children:[(0,u.jsxs)(ue,{children:[(0,u.jsx)(he,{children:R.totalShifts}),(0,u.jsx)(ge,{children:"Total Shifts"})]}),(0,u.jsxs)(ue,{children:[(0,u.jsxs)(he,{children:["RM ",R.totalSales.toLocaleString()]}),(0,u.jsx)(ge,{children:"Total Sales"})]}),(0,u.jsxs)(ue,{children:[(0,u.jsxs)(he,{children:[R.performance.efficiency,"%"]}),(0,u.jsx)(ge,{children:"Efficiency"})]}),(0,u.jsxs)(ue,{children:[(0,u.jsx)(he,{children:R.performance.customerRating.toFixed(1)}),(0,u.jsx)(ge,{children:"Customer Rating"})]}),(0,u.jsxs)(ue,{children:[(0,u.jsx)(he,{children:R.performance.ordersProcessed.toLocaleString()}),(0,u.jsx)(ge,{children:"Orders Processed"})]}),(0,u.jsxs)(ue,{children:[(0,u.jsx)(he,{children:R.performance.ordersProcessed>0?(R.totalSales/R.performance.ordersProcessed).toFixed(2):"0.00"}),(0,u.jsx)(ge,{children:"Avg Order Value"})]})]})]}),"security"===m&&(0,u.jsx)(se,{children:(0,u.jsxs)("div",{children:[(0,u.jsxs)("div",{style:{padding:"12px 16px",backgroundColor:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:"6px",color:"#0C4A6E",fontSize:"13px",marginBottom:"20px",lineHeight:"1.5"},children:[(0,u.jsx)("strong",{children:"Password Requirements:"}),(0,u.jsxs)("ul",{style:{margin:"6px 0 0 0",paddingLeft:"18px"},children:[(0,u.jsx)("li",{children:"At least 8 characters"}),(0,u.jsx)("li",{children:"At least one lowercase letter (a-z)"}),(0,u.jsx)("li",{children:"At least one uppercase letter (A-Z)"}),(0,u.jsx)("li",{children:"At least one number (0-9)"})]})]}),(0,u.jsxs)(le,{children:[(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Current Password"}),(0,u.jsx)(pe,{type:"password",value:j.currentPassword,onChange:e=>b({...j,currentPassword:e.target.value}),placeholder:"Enter current password"})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"New Password"}),(0,u.jsx)(pe,{type:"password",value:j.newPassword,onChange:e=>b({...j,newPassword:e.target.value}),placeholder:"Min 8 chars, uppercase + lowercase + number"})]}),(0,u.jsxs)(de,{children:[(0,u.jsx)(ce,{children:"Confirm New Password"}),(0,u.jsx)(pe,{type:"password",value:j.confirmPassword,onChange:e=>b({...j,confirmPassword:e.target.value}),placeholder:"Confirm new password"})]})]}),w&&(0,u.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#FEE2E2",border:"1px solid #FCA5A5",borderRadius:"6px",color:"#991B1B",fontSize:"14px",marginTop:"20px"},children:w}),A&&(0,u.jsx)("div",{style:{padding:"12px 16px",backgroundColor:"#ECFDF5",border:"1px solid #10B981",borderRadius:"6px",color:"#047857",fontSize:"14px",marginTop:"20px"},children:"Password changed successfully!"}),(0,u.jsx)(me,{children:(0,u.jsx)(fe,{variant:"primary",onClick:async()=>{if(F(""),C(!1),j.currentPassword&&j.newPassword&&j.confirmPassword)if(j.newPassword.length<8)F("Password must be at least 8 characters long");else if(/[a-z]/.test(j.newPassword))if(/[A-Z]/.test(j.newPassword))if(/[0-9]/.test(j.newPassword))if(j.newPassword===j.confirmPassword)if(j.currentPassword!==j.newPassword)try{const e=await fetch(`/api/users/${null===R||void 0===R?void 0:R.id}/password`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({currentPassword:j.currentPassword,newPassword:j.newPassword})});if(!e.ok){const n=await e.json();return void F(n.error||"Failed to change password")}C(!0),b({currentPassword:"",newPassword:"",confirmPassword:""}),setTimeout(()=>{C(!1)},5e3)}catch(e){console.error("Error changing password:",e),F("An error occurred while changing password")}else F("New password must be different from current password");else F("New passwords do not match");else F("Password must contain at least one number");else F("Password must contain at least one uppercase letter");else F("Password must contain at least one lowercase letter");else F("All fields are required")},children:"Change Password"})})]})})]}),(0,u.jsx)(s.aF,{isOpen:k,onClose:()=>E(!1),title:"Edit Schedule",footer:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.yl,{variant:"secondary",onClick:()=>E(!1),children:"Cancel"}),(0,u.jsx)(s.yl,{onClick:async()=>{R&&z&&(e&&await n(e.id,{schedule:z}),E(!1),P(null))},children:"Save Schedule"})]}),children:z&&(0,u.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Object.entries(z).map(e=>{let[n,r]=e;return(0,u.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"100px 1fr",alignItems:"center",gap:"12px",padding:"8px 0",borderBottom:"1px solid #F3F4F6"},children:[(0,u.jsx)("div",{style:{fontWeight:"500",textTransform:"capitalize",fontSize:"14px",color:"#374151"},children:n}),(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[(0,u.jsxs)("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer",fontSize:"14px",minWidth:"80px"},children:[(0,u.jsx)("input",{type:"checkbox",checked:r.active,onChange:e=>G(n,"active",e.target.checked),style:{cursor:"pointer"}}),(0,u.jsx)("span",{style:{color:r.active?"#059669":"#6B7280"},children:r.active?"Active":"Off"})]}),r.active&&(0,u.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[(0,u.jsx)("input",{type:"time",value:r.start,onChange:e=>G(n,"start",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}}),(0,u.jsx)("span",{style:{color:"#9CA3AF",fontSize:"14px"},children:"-"}),(0,u.jsx)("input",{type:"time",value:r.end,onChange:e=>G(n,"end",e.target.value),style:{padding:"6px 8px",border:"1px solid #D1D5DB",borderRadius:"6px",fontSize:"14px",width:"100px"}})]})]})]},n)})})})]})}):(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(K,{children:[(0,u.jsx)(p.Ay,{title:"My Profile"}),(0,u.jsx)(Q,{children:(0,u.jsx)(se,{children:(0,u.jsxs)("div",{style:{textAlign:"center",padding:"40px",color:"#6B7280"},children:[(0,u.jsx)("div",{style:{fontSize:"18px",marginBottom:"8px"},children:"Please log in to view your profile"}),(0,u.jsx)("div",{style:{fontSize:"14px"},children:"You need to be logged in to access this page."})]})})})]})});var Y}}}]);